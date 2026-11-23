import importlib.util
import io
import json
from pathlib import Path
import tempfile
import unittest

from PIL import Image

spec = importlib.util.spec_from_file_location("sync", Path(__file__).with_name("sync_drive_photos.py"))
sync = importlib.util.module_from_spec(spec)
spec.loader.exec_module(sync)


def image_bytes():
    image = Image.new("RGB", (2600, 1700), "navy")
    exif = Image.Exif()
    exif[270] = "private source metadata"
    exif[274] = 6
    output = io.BytesIO()
    image.save(output, "JPEG", exif=exif)
    return output.getvalue()


def item(identifier, name, mime=sync.FOLDER_MIME):
    return {"id": identifier, "name": name, "mimeType": mime}


class FakeDrive:
    def __init__(self, fail=False):
        self.fail = fail
        self.downloaded = []
        self.tree = {
            "root": [item("peru-folder", "Peru"), item("usa-folder", "United States"),
                     item("unselected", "Personal"), item("root-photo", "not-selected.jpg", "image/jpeg")],
            "peru-folder": [item("peru-photo", "photo-4.jpg", "image/jpeg"),
                            item("shortcut", "secret-link", "application/vnd.google-apps.shortcut")],
            "usa-folder": [item("boston-folder", "Boston"), item("unknown-city", "Unselected city")],
            "boston-folder": [item("boston-photo", "new-photo.jpg", "image/jpeg")],
        }

    def metadata(self, identifier):
        return {"mimeType": sync.FOLDER_MIME, "trashed": False}

    def children(self, identifier):
        # Unknown folders must not even be traversed.
        return self.tree[identifier]

    def download(self, identifier):
        self.downloaded.append(identifier)
        if self.fail:
            raise sync.SyncError("Test download failed.")
        return image_bytes()


class Response:
    status_code = 200

    def __init__(self, data):
        self.data = data

    def json(self):
        return self.data

    def close(self):
        pass


class Session:
    def __init__(self, pages):
        self.pages = iter(pages)
        self.requests = []

    def get(self, url, **kwargs):
        self.requests.append((url, dict(kwargs.get("params", {}))))
        return Response(next(self.pages))


class PhotoPublishingTests(unittest.TestCase):
    def test_only_selected_folders_are_read(self):
        selected = sync.selected_files(FakeDrive(), "root")
        self.assertEqual([(country, city) for country, city, _ in selected],
                         [("peru", None), ("usa", "boston")])

    def test_pagination_and_incomplete_results(self):
        session = Session([{"files": [item("a", "Peru")], "nextPageToken": "second"},
                           {"files": [item("b", "Brazil")]}])
        self.assertEqual(len(sync.DriveClient(session).children("root")), 2)
        self.assertEqual(session.requests[1][1]["pageToken"], "second")
        incomplete = Session([{"files": [], "incompleteSearch": True}])
        with self.assertRaises(sync.SyncError):
            sync.DriveClient(incomplete).children("root")

    def test_repeated_page_fails_instead_of_partial_publish(self):
        session = Session([{"files": [], "nextPageToken": "repeat"},
                           {"files": [], "nextPageToken": "repeat"}])
        with self.assertRaises(sync.SyncError):
            sync.DriveClient(session).children("root")

    def test_build_excludes_private_files_and_strips_image_metadata(self):
        with tempfile.TemporaryDirectory() as temporary:
            output = Path(temporary) / "site"
            count = sync.publishable_site(FakeDrive(), "root", output)
            self.assertEqual(count, 2)
            top_level = {path.name for path in output.iterdir()}
            self.assertEqual(top_level, {"index.html", "styles.css", "script.js",
                                         "photo-manifest.js", "assets", ".nojekyll"})
            manifest_text = (output / "photo-manifest.js").read_text()
            manifest = json.loads(manifest_text.split(" = ", 1)[1].removesuffix(";\n"))
            for private in ("peru-photo", "boston-photo", "photo-4.jpg", "new-photo.jpg",
                            "googleapis.com", "private_key", "DRIVE_SERVICE_ACCOUNT_JSON"):
                self.assertNotIn(private, manifest_text)
            self.assertEqual(manifest["photos"][0]["alt"], "machu")
            self.assertEqual(manifest["photos"][1]["alt"], "travelPhoto")
            self.assertNotIn('src="assets/web/', (output / "index.html").read_text())
            for photo in manifest["photos"]:
                for key, maximum in (("preview", 1400), ("src", 2400)):
                    with Image.open(output / photo[key]) as image:
                        self.assertFalse(image.getexif())
                        self.assertNotIn("xmp", image.info)
                        self.assertLessEqual(max(image.size), maximum)
                        # EXIF orientation was applied before metadata was removed.
                        self.assertLess(image.width, image.height)

    def test_failed_or_empty_sync_creates_no_publishable_output(self):
        with tempfile.TemporaryDirectory() as temporary:
            output = Path(temporary) / "site"
            with self.assertRaises(sync.SyncError):
                sync.publishable_site(FakeDrive(fail=True), "root", output)
            self.assertFalse(output.exists())
            drive = FakeDrive()
            drive.tree["root"] = []
            with self.assertRaises(sync.SyncError):
                sync.publishable_site(drive, "root", output)
            self.assertFalse(output.exists())

    def test_existing_output_is_never_replaced_on_error(self):
        with tempfile.TemporaryDirectory() as temporary:
            output = Path(temporary) / "site"
            output.mkdir()
            (output / "previous.txt").write_text("keep")
            with self.assertRaises(sync.SyncError):
                sync.publishable_site(FakeDrive(), "root", output)
            self.assertEqual((output / "previous.txt").read_text(), "keep")


if __name__ == "__main__":
    unittest.main()
