const translations = {
  en: {
    title:'Photographs & Notes', skip:'Skip to content', photographs:'Photographs & notes', about:'About', journeys:'Journeys', gallery:'Gallery', heroLocation:'Peru · South America', explorePhotos:'Explore the photographs',
    aboutTitle:'A personal<br><em>collection.</em>', aboutCopy:'Travel photographs and notes,<br>collected in one place.', introSoon:'Introduction coming soon.', exploreJourneys:'Explore the journeys', theJourneys:'The journeys', journeysTitle:'Selected <em>journeys</em>', fromArchive:'From the photo archive', photoArchive:'The photo archive', galleryTitle:'A closer <em>look</em>', galleryHint:'Select a photograph to view it full size.', backTop:'Back to top', close:'Close', notesSoon:'Travel notes coming soon.', notesPlaceholder:'This collection begins with photographs. Written notes will be added here.', viewPhotos:'View the photographs', previous:'Previous', next:'Next', all:'All countries', openJournal:'Open journal', photoCollection:'A collection of photographs', viewPhoto:'View photograph', enlarge:'Enlarge photograph', count:(n)=>`${n} ${n===1?'photograph':'photographs'}`, countriesCount:(n)=>`${n} countries`, language:'Language', mainNav:'Main navigation', filter:'Filter photographs by country', closeJournal:'Close journal', closePhoto:'Close photograph', southAmerica:'South America', northAmerica:'North America', asia:'Asia',
    peru:'Peru', bolivia:'Bolivia', argentina:'Argentina', brazil:'Brazil', usa:'United States', vietnam:'Vietnam',
    machu:'Machu Picchu beneath a cloudy sky', valley:'Rocky mountains above a town in Peru', city:'A traveler overlooking a city in Peru', ruins:'A town and stone ruins below the mountains', stars:'A star-filled sky reflected on the salt flats', sunset:'Sunset reflected on the salt flats', falls:'Waterfalls surrounded by green forest', coast:'A coastal mountain seen from a cable car', nyc:'Bright billboards above a rainy city street', street:'A street vendor and motorbikes in Vietnam'
  },
  es: {
    title:'Fotografías y notas', skip:'Saltar al contenido', photographs:'Fotografías y notas', about:'Acerca de', journeys:'Viajes', gallery:'Galería', heroLocation:'Perú · Sudamérica', explorePhotos:'Explorar las fotografías',
    aboutTitle:'Una colección<br><em>personal.</em>', aboutCopy:'Fotografías y notas de viaje,<br>reunidas en un solo lugar.', introSoon:'Pronto, una presentación.', exploreJourneys:'Explorar los viajes', theJourneys:'Los viajes', journeysTitle:'Viajes <em>seleccionados</em>', fromArchive:'Del archivo fotográfico', photoArchive:'El archivo fotográfico', galleryTitle:'Una mirada más <em>cercana</em>', galleryHint:'Selecciona una fotografía para ampliarla.', backTop:'Volver arriba', close:'Cerrar', notesSoon:'Las notas de viaje estarán disponibles pronto.', notesPlaceholder:'Esta colección empieza con fotografías. Aquí se añadirán las notas de viaje.', viewPhotos:'Ver las fotografías', previous:'Anterior', next:'Siguiente', all:'Todos los países', openJournal:'Abrir diario', photoCollection:'Una colección de fotografías', viewPhoto:'Ver fotografía', enlarge:'Ampliar fotografía', count:(n)=>`${n} ${n===1?'fotografía':'fotografías'}`, countriesCount:(n)=>`${n} países`, language:'Idioma', mainNav:'Navegación principal', filter:'Filtrar fotografías por país', closeJournal:'Cerrar diario', closePhoto:'Cerrar fotografía', southAmerica:'Sudamérica', northAmerica:'Norteamérica', asia:'Asia',
    peru:'Perú', bolivia:'Bolivia', argentina:'Argentina', brazil:'Brasil', usa:'Estados Unidos', vietnam:'Vietnam',
    machu:'Machu Picchu bajo un cielo nublado', valley:'Montañas rocosas sobre un pueblo de Perú', city:'Una viajera contempla una ciudad de Perú', ruins:'Un pueblo y ruinas de piedra al pie de las montañas', stars:'Un cielo estrellado reflejado en el salar', sunset:'El atardecer reflejado en el salar', falls:'Cascadas rodeadas de un bosque verde', coast:'Una montaña costera vista desde un teleférico', nyc:'Carteles luminosos sobre una calle lluviosa', street:'Una vendedora y motocicletas en una calle de Vietnam'
  },
  pt: {
    title:'Fotografias e anotações', skip:'Ir para o conteúdo', photographs:'Fotografias e anotações', about:'Sobre', journeys:'Viagens', gallery:'Galeria', heroLocation:'Peru · América do Sul', explorePhotos:'Explorar as fotografias',
    aboutTitle:'Uma coleção<br><em>pessoal.</em>', aboutCopy:'Fotografias e anotações de viagem,<br>reunidas em um só lugar.', introSoon:'Apresentação em breve.', exploreJourneys:'Explorar as viagens', theJourneys:'As viagens', journeysTitle:'Viagens <em>selecionadas</em>', fromArchive:'Do arquivo fotográfico', photoArchive:'O arquivo fotográfico', galleryTitle:'Um olhar mais <em>próximo</em>', galleryHint:'Selecione uma fotografia para ampliá-la.', backTop:'Voltar ao topo', close:'Fechar', notesSoon:'Relatos de viagem em breve.', notesPlaceholder:'Esta coleção começa com fotografias. As anotações de viagem serão adicionadas aqui.', viewPhotos:'Ver as fotografias', previous:'Anterior', next:'Próxima', all:'Todos os países', openJournal:'Abrir diário', photoCollection:'Uma coleção de fotografias', viewPhoto:'Ver fotografia', enlarge:'Ampliar fotografia', count:(n)=>`${n} ${n===1?'fotografia':'fotografias'}`, countriesCount:(n)=>`${n} países`, language:'Idioma', mainNav:'Navegação principal', filter:'Filtrar fotografias por país', closeJournal:'Fechar diário', closePhoto:'Fechar fotografia', southAmerica:'América do Sul', northAmerica:'América do Norte', asia:'Ásia',
    peru:'Peru', bolivia:'Bolívia', argentina:'Argentina', brazil:'Brasil', usa:'Estados Unidos', vietnam:'Vietnã',
    machu:'Machu Picchu sob um céu nublado', valley:'Montanhas rochosas acima de uma cidade no Peru', city:'Uma viajante observa uma cidade no Peru', ruins:'Uma cidade e ruínas de pedra ao pé das montanhas', stars:'Um céu estrelado refletido no salar', sunset:'O pôr do sol refletido no salar', falls:'Cachoeiras cercadas por uma floresta verde', coast:'Uma montanha à beira-mar vista de um teleférico', nyc:'Painéis luminosos sobre uma rua chuvosa', street:'Uma vendedora e motocicletas em uma rua no Vietnã'
  }
};
Object.assign(translations.en, {
  cities:'Cities', allCities:'All cities', citiesIntro:'Five cities, five photo collections.', exploreCities:'Explore 5 cities', backCities:'Back to United States cities', allUSPhotos:'View all United States photographs', cityFilter:'Filter photographs by city',
  newYork:'New York', boston:'Boston', chicago:'Chicago', cincinnati:'Cincinnati', washingtonDC:'Washington, D.C.',
  bostonHarbor:'A traveler beside the waterfront in Boston', bostonArt:'A sculpture in front of a large gallery window', chicagoFountain:'A fountain and city buildings in Chicago', cincinnatiShop:'A carousel horse inside a candy shop', cincinnatiRain:'Umbrellas on a rainy street in Cincinnati', dcWaterfront:'A traveler beside the water in Washington, D.C.', dcMonument:'A traveler in front of the Washington Monument'
});
Object.assign(translations.es, {
  cities:'Ciudades', allCities:'Todas las ciudades', citiesIntro:'Cinco ciudades, cinco colecciones de fotografías.', exploreCities:'Explorar 5 ciudades', backCities:'Volver a las ciudades de Estados Unidos', allUSPhotos:'Ver todas las fotografías de Estados Unidos', cityFilter:'Filtrar fotografías por ciudad',
  newYork:'Nueva York', boston:'Boston', chicago:'Chicago', cincinnati:'Cincinnati', washingtonDC:'Washington D. C.',
  bostonHarbor:'Una viajera junto al puerto de Boston', bostonArt:'Una escultura frente a una gran ventana de una galería', chicagoFountain:'Una fuente y edificios de Chicago', cincinnatiShop:'Un caballo de carrusel en una tienda de dulces', cincinnatiRain:'Paraguas en una calle lluviosa de Cincinnati', dcWaterfront:'Una viajera junto al agua en Washington D. C.', dcMonument:'Una viajera frente al Monumento a Washington'
});
Object.assign(translations.pt, {
  cities:'Cidades', allCities:'Todas as cidades', citiesIntro:'Cinco cidades, cinco coleções de fotografias.', exploreCities:'Explorar 5 cidades', backCities:'Voltar às cidades dos Estados Unidos', allUSPhotos:'Ver todas as fotografias dos Estados Unidos', cityFilter:'Filtrar fotografias por cidade',
  newYork:'Nova York', boston:'Boston', chicago:'Chicago', cincinnati:'Cincinnati', washingtonDC:'Washington, D.C.',
  bostonHarbor:'Uma viajante à beira do porto de Boston', bostonArt:'Uma escultura diante de uma grande janela de uma galeria', chicagoFountain:'Uma fonte e edifícios de Chicago', cincinnatiShop:'Um cavalo de carrossel em uma loja de doces', cincinnatiRain:'Guarda-chuvas em uma rua chuvosa de Cincinnati', dcWaterfront:'Uma viajante à beira da água em Washington, D.C.', dcMonument:'Uma viajante em frente ao Monumento a Washington'
});
const usCities = [
  {id:'new-york',name:'newYork',state:'New York',cover:'assets/web/usa-1.jpg',alt:'nyc',position:'50% 35%'},
  {id:'boston',name:'boston',state:'Massachusetts',cover:'assets/web/boston-3.jpg',alt:'bostonHarbor'},
  {id:'chicago',name:'chicago',state:'Illinois',cover:'assets/web/chicago-extra-3.jpg',alt:'chicagoFountain'},
  {id:'cincinnati',name:'cincinnati',state:'Ohio',cover:'assets/web/cincinnati-2.jpg',alt:'cincinnatiShop'},
  {id:'washington-dc',name:'washingtonDC',state:'District of Columbia',cover:'assets/web/washington-dc-1.jpg',alt:'dcWaterfront'}
];
const countries = [
  {id:'peru',region:'southAmerica',cover:'assets/web/photo-4.jpg',alt:'machu'},
  {id:'bolivia',region:'southAmerica',cover:'assets/web/uyuni-1.jpg',alt:'stars'},
  {id:'argentina',region:'southAmerica',cover:'assets/web/argentina-1.jpg',alt:'falls'},
  {id:'brazil',region:'southAmerica',cover:'assets/web/brazil-3.jpg',alt:'coast'},
  {id:'usa',region:'northAmerica',cover:'assets/web/usa-1.jpg',alt:'nyc'},
  {id:'vietnam',region:'asia',cover:'assets/web/vietnam-3.jpg',alt:'street'}
];
const photos = [
  {country:'peru',src:'assets/web/photo-4-full.jpg',preview:'assets/web/photo-4.jpg',alt:'machu'},
  {country:'bolivia',src:'assets/web/uyuni-1.jpg',preview:'assets/web/uyuni-1.jpg',alt:'stars',position:'50% 55%'},
  {country:'argentina',src:'assets/web/argentina-1.jpg',preview:'assets/web/argentina-1.jpg',alt:'falls'},
  {country:'brazil',src:'assets/web/brazil-3.jpg',preview:'assets/web/brazil-3.jpg',alt:'coast'},
  {country:'bolivia',src:'assets/web/uyuni-2.jpg',preview:'assets/web/uyuni-2.jpg',alt:'sunset',panorama:true},
  {country:'usa',city:'new-york',src:'assets/web/usa-1.jpg',preview:'assets/web/usa-1.jpg',alt:'nyc',position:'50% 35%'},
  {country:'vietnam',src:'assets/web/vietnam-3.jpg',preview:'assets/web/vietnam-3.jpg',alt:'street'},
  {country:'peru',src:'assets/web/photo-2-full.jpg',preview:'assets/web/photo-2.jpg',alt:'valley'},
  {country:'peru',src:'assets/web/photo-5-full.jpg',preview:'assets/web/photo-5.jpg',alt:'city'},
  {country:'peru',src:'assets/web/photo-3-full.jpg',preview:'assets/web/photo-3.jpg',alt:'ruins'},
  {country:'usa',city:'boston',src:'assets/web/boston-3.jpg',preview:'assets/web/boston-3.jpg',alt:'bostonHarbor'},
  {country:'usa',city:'boston',src:'assets/web/boston-extra-1.jpg',preview:'assets/web/boston-extra-1.jpg',alt:'bostonArt'},
  {country:'usa',city:'chicago',src:'assets/web/chicago-extra-3.jpg',preview:'assets/web/chicago-extra-3.jpg',alt:'chicagoFountain'},
  {country:'usa',city:'cincinnati',src:'assets/web/cincinnati-2.jpg',preview:'assets/web/cincinnati-2.jpg',alt:'cincinnatiShop'},
  {country:'usa',city:'cincinnati',src:'assets/web/cincinnati-3.jpg',preview:'assets/web/cincinnati-3.jpg',alt:'cincinnatiRain'},
  {country:'usa',city:'washington-dc',src:'assets/web/washington-dc-1.jpg',preview:'assets/web/washington-dc-1.jpg',alt:'dcWaterfront'},
  {country:'usa',city:'washington-dc',src:'assets/web/washington-dc-2.jpg',preview:'assets/web/washington-dc-2.jpg',alt:'dcMonument'}
];
let language = 'en';
try { const saved=localStorage.getItem('bylunime-language'); if (Object.hasOwn(translations,saved)) language=saved; } catch {}
let selectedCountry='all';
let selectedCity='all';
let journalCity=null;
let journalCountry='peru';
let currentPhoto=0;
let visiblePhotos=photos;
const journal=document.querySelector('#journal-dialog');
const lightbox=document.querySelector('#lightbox');
const largePhoto=document.querySelector('#large-photo');
const countryMenu=document.querySelector('#country-menu');
const journeysToggle=document.querySelector('#journeys-toggle');
const languageToggle=document.querySelector('#language-toggle');
const languageMenu=document.querySelector('#language-menu');
const languageNames={en:'English',es:'Español',pt:'Português'};
function closeLanguageMenu(){languageMenu.hidden=true;languageToggle.setAttribute('aria-expanded','false');}
const t=(key)=>translations[language][key];
function openDialog(dialog) { dialog.showModal(); document.body.classList.add('modal-open'); }
function closeMenu(){ countryMenu.hidden=true; journeysToggle.setAttribute('aria-expanded','false'); }
function updateJournal(){
  const country=countries.find(c=>c.id===journalCountry);
  const city=usCities.find(c=>c.id===journalCity);
  document.querySelector('#journal-dialog-title').textContent=city?t(city.name):t(country.id);
  document.querySelector('#journal-region').textContent=city?`${city.state} · ${t('usa')}`:t(country.region);
  document.querySelector('#journal-back').hidden=!city;
  const image=journal.querySelector('.journal-cover'); image.src=city?city.cover:country.cover; image.alt=t(city?city.alt:country.alt);
}
function openUSCities(){
  document.querySelector('#united-states').hidden=false;
  closeMenu();closeLanguageMenu();
  if(location.hash!=='#united-states')history.pushState(null,'','#united-states');
  document.querySelector('#us-title').focus({preventScroll:true});
  document.querySelector('#united-states').scrollIntoView({behavior:'instant',block:'start'});
}
function openJournal(country){
  if(country==='usa'){openUSCities();return;}
  journalCountry=country;journalCity=null;updateJournal();closeMenu();openDialog(journal);
}
function openCity(city){journalCountry='usa';journalCity=city;updateJournal();openDialog(journal);}
function renderUSCities(){
  const grid=document.querySelector('#us-city-grid');grid.replaceChildren();
  usCities.forEach(city=>{
    const button=document.createElement('button');button.className='city-card';button.dataset.city=city.id;button.setAttribute('aria-haspopup','dialog');
    const count=photos.filter(photo=>photo.city===city.id).length;
    button.innerHTML=`<div class="city-cover"><img src="${city.cover}" alt="${t(city.alt)}" loading="lazy"${city.position?` style="object-position:${city.position}"`:''}></div><div class="city-caption"><p class="city-state">${city.state}</p><h3>${t(city.name)}</h3><div class="city-card-bottom"><span>${t('count')(count)}</span><span class="text-link">${t('openJournal')}</span></div></div>`;
    button.addEventListener('click',()=>openCity(city.id));grid.append(button);
  });
}
function renderCityFilters(){
  document.querySelector('#city-filter-bar').hidden=selectedCountry!=='usa';
  const root=document.querySelector('#city-filters');root.replaceChildren();
  [{id:'all',name:'allCities'},...usCities].forEach(city=>{
    const button=document.createElement('button');button.textContent=t(city.name);button.dataset.city=city.id;
    button.setAttribute('aria-pressed',String(selectedCity===city.id));
    button.addEventListener('click',()=>{
      selectedCity=city.id;root.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.city===selectedCity)));renderGallery();
    });root.append(button);
  });
}
function renderJourneys(){
  const grid=document.querySelector('#journey-grid');grid.replaceChildren();countryMenu.replaceChildren();
  countries.forEach(country=>{
    const button=document.createElement('button');button.className='journey';if(country.id!=='usa')button.setAttribute('aria-haspopup','dialog');
    button.innerHTML=`<div class="journey-image"><img src="${country.cover}" alt="${t(country.alt)}" loading="lazy"><span class="journey-label">${t(country.region)}</span></div><div class="journey-caption"><div><h3>${t(country.id)}</h3><p>${t('photoCollection')}</p></div><span class="text-link">${t(country.id==='usa'?'exploreCities':'openJournal')}</span></div>`;
    button.addEventListener('click',()=>openJournal(country.id));grid.append(button);
    const menuButton=document.createElement('button');menuButton.textContent=t(country.id);menuButton.addEventListener('click',()=>openJournal(country.id));countryMenu.append(menuButton);
  });
}
function renderFilters(){
  const root=document.querySelector('#country-filters');root.replaceChildren();
  ['all',...countries.map(c=>c.id)].forEach(id=>{
    const button=document.createElement('button');button.textContent=t(id);button.dataset.country=id;
    button.setAttribute('aria-pressed',String(selectedCountry===id));
    button.addEventListener('click',()=>{
      selectedCountry=id;selectedCity='all';renderCityFilters();
      root.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.country===id)));
      renderGallery();
    });root.append(button);
  });
}
function renderGallery(){
  visiblePhotos=photos.filter(photo=>(selectedCountry==='all'||photo.country===selectedCountry)&&(selectedCountry!=='usa'||selectedCity==='all'||photo.city===selectedCity));
  const grid=document.querySelector('#photo-grid');grid.replaceChildren();
  visiblePhotos.forEach((photo,i)=>{
    const button=document.createElement('button');
    button.className=`photo ${photo.panorama?'panorama':((selectedCountry==='all'&&i%6===0)||visiblePhotos.length===1?'wide':'')}`;
    button.setAttribute('aria-label',`${t('enlarge')}: ${t(photo.alt)}`);
    button.innerHTML=`<img src="${photo.preview}" alt="${t(photo.alt)}" loading="lazy"${photo.position?` style="object-position:${photo.position}"`:''}><span>${t('viewPhoto')}</span>`;
    button.addEventListener('click',()=>{showPhoto(i);openDialog(lightbox);});grid.append(button);
  });
  const city=usCities.find(c=>c.id===selectedCity);
  const galleryLabel=selectedCountry==='all'?t('countriesCount')(countries.length):(selectedCountry==='usa'&&city?`${t('usa')} · ${t(city.name)}`:t(selectedCountry));
  document.querySelector('#gallery-count').textContent=`${galleryLabel} · ${t('count')(visiblePhotos.length)}`;
}
function showPhoto(index){
  currentPhoto=(index+visiblePhotos.length)%visiblePhotos.length;const photo=visiblePhotos[currentPhoto];
  largePhoto.onerror=()=>{largePhoto.onerror=null;largePhoto.src=photo.preview;};largePhoto.src=photo.src;largePhoto.alt=t(photo.alt);
  document.querySelector('#photo-caption').textContent=t(photo.alt);
  document.querySelector('#photo-count').textContent=`${currentPhoto+1} / ${visiblePhotos.length}`;
  const city=usCities.find(c=>c.id===photo.city);
  document.querySelector('#lightbox-country').textContent=city?`${t(city.name)} · ${t('usa')}`:t(photo.country);
}
function applyLanguage(next){
  language=next;document.documentElement.lang=language==='pt'?'pt-BR':language;document.title=`bylunime — ${t('title')}`;
  document.querySelector('meta[name="description"]').content=t('aboutCopy').replace('<br>',' ');
  document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n));
  // Only these fixed, locally authored translations contain markup.
  document.querySelectorAll('[data-i18n-html]').forEach(el=>el.innerHTML=t(el.dataset.i18nHtml));
  document.querySelectorAll('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===language)));
  document.querySelector('.language-switch').setAttribute('aria-label',t('language'));
  document.querySelector('#current-language').textContent=language.toUpperCase();
  languageToggle.setAttribute('aria-label',`${t('language')}: ${languageNames[language]}`);
  document.querySelector('.hero nav').setAttribute('aria-label',t('mainNav'));
  document.querySelector('#country-filters').setAttribute('aria-label',t('filter'));
  document.querySelector('#city-filters').setAttribute('aria-label',t('cityFilter'));
  journal.querySelector('[data-close]').setAttribute('aria-label',t('closeJournal'));
  lightbox.querySelector('[data-close]').setAttribute('aria-label',t('closePhoto'));
  document.querySelector('.hero-photo').alt=t('machu');document.querySelector('.about-photo img').alt=t('city');
  closeMenu();renderJourneys();renderUSCities();renderFilters();renderCityFilters();renderGallery();updateJournal();if(lightbox.open)showPhoto(currentPhoto);
  try {localStorage.setItem('bylunime-language',language);} catch {}
}
journeysToggle.addEventListener('click',()=>{countryMenu.hidden=!countryMenu.hidden;journeysToggle.setAttribute('aria-expanded',String(!countryMenu.hidden));});
document.addEventListener('click',event=>{if(!event.target.closest('.journeys-menu'))closeMenu();if(!event.target.closest('.language-switch'))closeLanguageMenu();});
languageToggle.addEventListener('click',()=>{const open=languageMenu.hidden;closeMenu();languageMenu.hidden=!open;languageToggle.setAttribute('aria-expanded',String(open));});
document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>{applyLanguage(button.dataset.lang);closeLanguageMenu();languageToggle.focus();}));
document.querySelector('#previous-photo').addEventListener('click',()=>showPhoto(currentPhoto-1));
document.querySelector('#next-photo').addEventListener('click',()=>showPhoto(currentPhoto+1));
document.querySelectorAll('dialog').forEach(dialog=>{
  dialog.querySelector('[data-close]').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
  dialog.addEventListener('click',event=>{if(event.target===dialog&&dialog!==lightbox)dialog.close();});
});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&!languageMenu.hidden){closeLanguageMenu();languageToggle.focus();}
  if(event.key==='Escape'&&!countryMenu.hidden){closeMenu();journeysToggle.focus();}
  if(!lightbox.open)return;
  if(event.key==='ArrowLeft'){event.preventDefault();showPhoto(currentPhoto-1);}
  if(event.key==='ArrowRight'){event.preventDefault();showPhoto(currentPhoto+1);}
});
document.querySelector('#journal-gallery').addEventListener('click',()=>{
  selectedCountry=journalCountry;selectedCity=journalCity||'all';journal.close();renderFilters();renderCityFilters();renderGallery();
  document.querySelector('#photo-grid button').focus({preventScroll:true});
  document.querySelector('#gallery').scrollIntoView({behavior:'instant',block:'start'});
});
document.querySelector('#journal-back').addEventListener('click',()=>{journal.close();openUSCities();});
document.querySelector('#all-us-photos').addEventListener('click',()=>{
  selectedCountry='usa';selectedCity='all';renderFilters();renderCityFilters();renderGallery();
  location.hash='gallery';document.querySelector('#photo-grid button').focus({preventScroll:true});
});
window.addEventListener('hashchange',()=>{if(location.hash==='#united-states')document.querySelector('#united-states').hidden=false;});
applyLanguage(language);
if(location.hash==='#united-states')openUSCities();
