"""Publish image copies from one private Drive folder. Credentials stay in memory."""

import argparse
import hashlib
import io
import json
import os
from pathlib import Path
import re
import shutil
import sys
import tempfile
import warnings

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
API = "https://www.googleapis.com/drive/v3/files"
FOLDER_MIME = "application/vnd.google-apps.folder"
IMAGE_MIMES = {"image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"}
COUNTRIES = {
    "peru": "peru", "bolivia": "bolivia", "argentina": "argentina",
    "brazil": "brazil", "united-states": "usa", "usa": "usa", "vietnam": "vietnam",
}
CITIES = {name: name for name in ("new-york", "boston", "chicago", "cincinnati", "washington-dc")}
CITIES["washington-d-c"] = "washington-dc"
MAX_FILE_BYTES = 50 * 1024 * 1024
MAX_TOTAL_BYTES = 1024 * 1024 * 1024
MAX_FILES = 1000
Image.MAX_IMAGE_PIXELS = 60_000_000
warnings.simplefilter("error", Image.DecompressionBombWarning)


class SyncError(Exception):
    """An error safe to show in a public workflow log."""


def slug(name):
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def valid_id(value):
    if not isinstance(value, str) or not re.fullmatch(r"[A-Za-z0-9_-]+", value):
        raise SyncError("The selected Drive folder or file has an invalid identifier.")
    return value


class DriveClient:
    def __init__(self, session):
        self.session = session

    def metadata(self, file_id):
        response = self.session.get(
            f"{API}/{valid_id(file_id)}",
            params={"fields": "mimeType,trashed", "supportsAllDrives": "true"}, timeout=60,
        )
        try:
            if response.status_code != 200:
                raise SyncError("Cannot read the selected Drive folder. Check the folder ID and viewer permission.")
            return response.json()
        finally:
            response.close()

    def children(self, folder_id):
        params = {
            "q": f"'{valid_id(folder_id)}' in parents and trashed = false",
            "fields": "nextPageToken,incompleteSearch,files(id,name,mimeType,size)",
            "pageSize": 1000, "supportsAllDrives": "true", "includeItemsFromAllDrives": "true",
        }
        files = []
        seen_tokens = set()
        while True:
            response = self.session.get(API, params=params, timeout=60)
            try:
                if response.status_code != 200:
                    raise SyncError("Cannot list a photo folder. Check Drive API access and viewer permission.")
                data = response.json()
            finally:
                response.close()
            if data.get("incompleteSearch"):
                raise SyncError("Drive returned an incomplete list. The previous website has been kept.")
            files.extend(data.get("files", []))
            if len(files) > MAX_FILES:
                raise SyncError("A folder exceeds the 1,000-item publication limit.")
            token = data.get("nextPageToken")
            if not token:
                return sorted(files, key=lambda item: (item["name"].casefold(), item["id"]))
            if token in seen_tokens:
                raise SyncError("Drive returned a repeated page. The previous website has been kept.")
            seen_tokens.add(token)
            params["pageToken"] = token

    def download(self, file_id):
        response = self.session.get(
            f"{API}/{valid_id(file_id)}", params={"alt": "media", "supportsAllDrives": "true"},
            timeout=120, stream=True,
        )
        try:
            if response.status_code != 200:
                raise SyncError("A photograph could not be downloaded. The previous website has been kept.")
            buffer = io.BytesIO()
            for chunk in response.iter_content(1024 * 1024):
                if buffer.tell() + len(chunk) > MAX_FILE_BYTES:
                    raise SyncError("A photograph exceeds the 50 MB publication limit.")
                buffer.write(chunk)
            return buffer.getvalue()
        finally:
            response.close()


def selected_files(client, root_id):
    """Only named country folders and named USA city folders can be published.

    Shortcuts and files in the root are ignored, so a shortcut cannot widen access.
    """
    result = []
    seen_countries = set()
    for folder in client.children(root_id):
        country = COUNTRIES.get(slug(folder["name"]))
        if folder["mimeType"] != FOLDER_MIME or not country:
            continue
        if country in seen_countries:
            raise SyncError("Two folders map to the same country. Keep one folder for each country.")
        seen_countries.add(country)
        seen_cities = set()
        for item in client.children(folder["id"]):
            if item["mimeType"] in IMAGE_MIMES:
                result.append((country, None, item))
            elif country == "usa" and item["mimeType"] == FOLDER_MIME:
                city = CITIES.get(slug(item["name"]))
                if city:
                    if city in seen_cities:
                        raise SyncError("Two folders map to the same city. Keep one folder for each city.")
                    seen_cities.add(city)
                    for photo in client.children(item["id"]):
                        if photo["mimeType"] in IMAGE_MIMES:
                            result.append((country, city, photo))
    if not result:
        raise SyncError("No supported photographs were found. Nothing has been published.")
    if len(result) > MAX_FILES:
        raise SyncError("The collection exceeds the 1,000-photo publication limit.")
    return result


def image_copies(raw, destination):
    """Re-encode pixels, discarding EXIF, GPS, original names, and other metadata."""
    digest = hashlib.sha256(raw).hexdigest()[:24]
    paths = {}
    with Image.open(io.BytesIO(raw)) as source:
        image = ImageOps.exif_transpose(source)
        if image.mode in ("RGBA", "LA") or "transparency" in image.info:
            rgba = image.convert("RGBA")
            rgb = Image.new("RGB", rgba.size, "white")
            rgb.paste(rgba, mask=rgba.getchannel("A"))
        else:
            rgb = image.convert("RGB")
        width, height = rgb.size
        for label, maximum, quality in (("preview", 1400, 84), ("full", 2400, 90)):
            resized = rgb.copy()
            resized.thumbnail((maximum, maximum), Image.Resampling.LANCZOS)
            # A new pixel-only image prevents source EXIF/ICC/XMP from being copied.
            clean = Image.new("RGB", resized.size)
            clean.paste(resized)
            relative = f"assets/photos/{digest}-{label}.jpg"
            clean.save(destination / relative, "JPEG", quality=quality, optimize=True)
            paths[label] = relative
    return paths, width > height * 2


def publishable_site(client, root_id, output, source_root=ROOT):
    if output.exists():
        raise SyncError("The output folder already exists. Choose a fresh build folder.")
    metadata = client.metadata(root_id)
    if metadata.get("mimeType") != FOLDER_MIME or metadata.get("trashed"):
        raise SyncError("The selected Drive item must be an active folder.")
    selected = selected_files(client, root_id)
    captions = json.loads((source_root / "photo-captions.json").read_text())
    lookup = {(p["country"], p.get("city"), p["name"]): p for p in captions}
    output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="journal-build-", dir=output.parent) as temporary:
        staging = Path(temporary) / "site"
        (staging / "assets/photos").mkdir(parents=True)
        photos = []
        total = 0
        for country, city, item in selected:
            if int(item.get("size", 0)) > MAX_FILE_BYTES:
                raise SyncError("A photograph exceeds the 50 MB publication limit.")
            raw = client.download(item["id"])
            total += len(raw)
            if total > MAX_TOTAL_BYTES:
                raise SyncError("The collection exceeds the 1 GB processing limit.")
            paths, panorama = image_copies(raw, staging)
            caption = lookup.get((country, city, item["name"]), {})
            photo = {"country": country, "src": paths["full"], "preview": paths["preview"],
                     "alt": caption.get("alt", "travelPhoto")}
            if city:
                photo["city"] = city
            if caption.get("position"):
                photo["position"] = caption["position"]
            if panorama:
                photo["panorama"] = True
            photos.append(photo)
        # Explicit allowlist: never copy .git, .local, configuration, credentials, or originals.
        for name in ("index.html", "styles.css", "script.js"):
            shutil.copyfile(source_root / name, staging / name)
        hero = next((p for p in photos if p["alt"] == "machu"), photos[0])
        about = next((p for p in photos if p["country"] == "peru" and p["alt"] == "city"), photos[0])
        north = next((p for p in photos if p["country"] == "usa" and p["alt"] == "nyc"),
                     next((p for p in photos if p["country"] == "usa"), hero))
        html = (staging / "index.html").read_text()
        html = html.replace('src="assets/web/hero.jpg"', f'src="{hero["src"]}"')
        html = html.replace('src="assets/web/photo-5.jpg"', f'src="{about["preview"]}"')
        html = html.replace('src="assets/web/usa-1.jpg"', f'src="{north["src"]}"')
        (staging / "index.html").write_text(html)
        manifest = json.dumps({"photos": photos}, ensure_ascii=True, separators=(",", ":"))
        (staging / "photo-manifest.js").write_text(f"window.JOURNAL_PHOTO_LIBRARY = {manifest};\n")
        (staging / ".nojekyll").touch()
        # Only complete builds become deployable; any error keeps the live release untouched.
        staging.rename(output)
    return len(photos)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=ROOT / "_site")
    args = parser.parse_args()
    try:
        raw_secret = os.environ.pop("DRIVE_SERVICE_ACCOUNT_JSON", "")
        root_id = os.environ.pop("DRIVE_PHOTO_FOLDER_ID", "")
        if not raw_secret or not root_id:
            raise SyncError("Add both GitHub secrets: DRIVE_SERVICE_ACCOUNT_JSON and DRIVE_PHOTO_FOLDER_ID.")
        info = json.loads(raw_secret)
        if info.get("type") != "service_account" or info.get("token_uri") != "https://oauth2.googleapis.com/token":
            raise SyncError("Use the JSON key for the dedicated Google service account, not an API key.")
        from google.oauth2 import service_account
        from google.auth.transport.requests import AuthorizedSession
        from requests.adapters import HTTPAdapter
        from urllib3.util.retry import Retry
        from pillow_heif import register_heif_opener
        register_heif_opener()
        credentials = service_account.Credentials.from_service_account_info(
            info, scopes=["https://www.googleapis.com/auth/drive.readonly"],
        )
        del raw_secret, info
        with AuthorizedSession(credentials) as session:
            retry = Retry(total=3, backoff_factor=1, status_forcelist=[429, 500, 502, 503, 504],
                          allowed_methods=["GET"], raise_on_status=False)
            session.mount("https://", HTTPAdapter(max_retries=retry))
            count = publishable_site(DriveClient(session), valid_id(root_id), args.output.resolve())
        print(f"Prepared {count} photographs. Only website files and resized image copies will be uploaded.")
        return 0
    except SyncError as error:
        print(f"Photo update stopped: {error}", file=sys.stderr)
    except Exception:
        # Never dump credentials, request URLs, Drive metadata, or raw exception traces to public logs.
        print("Photo update stopped. Check service-account access, secrets, and supported image formats. The live release is unchanged.", file=sys.stderr)
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
