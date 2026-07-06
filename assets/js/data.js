/* =====================================================================
   DATA.js — alt statisk indhold for siden.
   Rediger her for at ændre program, madplan, attraktioner og
   start-pakkelisten. Family-koderne bruges overalt:
     ML = Mette & Lars      GC = Gitte & Chresten
     CM = Camilla & Morten  LA = Lisbeth & Anders
   ===================================================================== */

const TRIP = {
  title: 'Sommerferie i Norge',
  year: '2026',
  place: 'Sirdal Mountain Lodge',
  dates: '22.–29. juli 2026',
  people: 16,
  startISO: '2026-07-22T15:00:00',
  address: '99 Slettekvæven, 4443 Sinnes',
  // Sinnes, Sirdal (Agder) — bruges til vejr-API og kort
  lat: 59.056,
  lon: 6.874,
  yrUrl: 'https://www.yr.no/en/forecast/daily-table/1-17249/Norway/Agder/Sirdal/Sinnes',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sirdal+Mountain+Lodge+Slettekv%C3%A6ven+Sinnes'
};

/* De fire familier — farve + kode + navn */
const FAMILIES = [
  { code: 'ML', initial: 'M', name: 'Mette & Lars',      city: 'Søllerød',            colorVar: '--fam-ml' },
  { code: 'GC', initial: 'G', name: 'Gitte & Chresten',  city: 'Grejs',               colorVar: '--fam-gc' },
  { code: 'CM', initial: 'C', name: 'Camilla & Morten',  city: 'Hadsten',             colorVar: '--fam-cm' },
  { code: 'LA', initial: 'L', name: 'Lisbeth & Anders',  city: 'Hjørring · Fødselaren', colorVar: '--fam-la' }
];

const FAMILY_MEMBERS = [
  { code: 'LA', members: ['Lisbeth (mormor)', 'Anders'] },
  { code: 'GC', members: ['Gitte', 'Chresten', { name: 'Hans', child: true }, { name: 'Esther', child: true }, { name: 'Emil', child: true }] },
  { code: 'CM', members: ['Camilla', 'Morten', { name: 'Agnete', child: true }, { name: 'Peter', child: true }] },
  { code: 'ML', members: ['Mette', 'Lars', { name: 'William', child: true }, { name: 'Frederik', child: true }, { name: 'Carl', child: true }] }
];

/* --------------------------- PROGRAM --------------------------- */
const DAYS = [
  {
    date: '2026-07-22', weekday: 'Ons', day: 22, month: 'JUL',
    title: 'Ankomst & afslapning', subtitle: 'Vi falder til på hytten',
    activities: [
      { time: 'Fra kl. 15', title: 'Indtjek på Sirdal Mountain Lodge', desc: 'Find værelser, pak ud, og udforsk hytten. Husk: sengetøj og håndklæder skal redes op.', tags: ['praktisk'] },
      { time: 'Eftermiddag', title: 'Indkøb i nærmeste købmand', desc: 'Et hold tager til den lokale dagligvarebutik (Joker Sinnes eller Coop i Tonstad) og fylder op med friske varer.', tags: ['praktisk'] },
      { time: 'Aften', title: 'Velkomst-aftensmad: Tacos', desc: 'Klassiker når 16 sultne familiemedlemmer skal mættes. Børnene kan selv vælge fyld.', tags: ['mad'] },
      { time: 'Sent', title: 'Aftengåtur og snak på terrassen', desc: 'Solnedgangen står på ca. 22:30 om sommeren i Sirdal — perfekt til en stille rundtur.', tags: ['hygge'] }
    ]
  },
  {
    date: '2026-07-23', weekday: 'Tor', day: 23, month: 'JUL',
    title: 'På opdagelse lokalt', subtitle: 'Vi udforsker området nær hytten',
    activities: [
      { time: 'Formiddag', title: 'Vandretur i Sinnes-området', desc: 'Kort, familievenlig tur med udsigt over Sirdalsvatnet. Se <a href="https://www.sirdalsferie.no/" target="_blank" rel="noopener">Sirdalsferie</a> for ruteforslag.', tags: ['vandring', 'sol'] },
      { time: 'Frokost', title: 'Madpakke i det fri', desc: 'Vi spiser på en stor flad sten med udsigt — kun naturen som restaurant.', tags: ['mad'] },
      { time: 'Eftermiddag', title: 'Disc-golf, mini-golf eller fjellgolf', desc: 'Familier kan splitte sig op. <a href="https://www.sirdalsferie.no/aktiviteter" target="_blank" rel="noopener">Sirdal har flere baner</a> — fjellgolfen ved Tjørholmfjellet er en oplevelse.', tags: ['aktivitet'] },
      { time: 'Aften', title: 'Grillaften: Kyllingespyd & pølser', desc: 'Familie 1 har madansvar. Sommersalat, focaccia og brændt majskolbe på siden.', tags: ['mad'] }
    ]
  },
  {
    date: '2026-07-24', weekday: 'Fre', day: 24, month: 'JUL',
    title: 'Lysefjorden', subtitle: 'Den store sejltur',
    activities: [
      { time: 'Morgen', title: 'Tidlig morgenmad', desc: 'Vi spiser tidligt for at nå færgen til Lysefjorden.', tags: ['mad'] },
      { time: 'Formiddag', title: 'Kør til Lauvvik eller Forsand', desc: '~1 time fra hytten. Her starter fjordcruiserne.', tags: ['kørsel'] },
      { time: '11–14', title: 'Fjordcruise på Lysefjorden', desc: 'En af verdens smukkeste fjorde — tæt på Preikestolen fra vandet. Se priser hos <a href="https://www.rodne.no/en/lysefjorden-cruise-2/" target="_blank" rel="noopener">Rødne Fjord Cruise</a>.', tags: ['oplevelse', 'sol'] },
      { time: 'Eftermiddag', title: 'Bad i fjorden', desc: 'Stop ved en lille bugt undervejs hjem. Iskoldt — men friskt!', tags: ['bad'] },
      { time: 'Aften', title: 'Aftensmad: Lasagne med salat', desc: 'Familie 2 har madansvar. Stor portion til alle 16, med hvidløgsbrød og grov salat.', tags: ['mad'] }
    ]
  },
  {
    date: '2026-07-25', weekday: 'Lør', day: 25, month: 'JUL',
    title: 'Predikestolen', subtitle: 'Den ikoniske vandring (for dem der vil)',
    activities: [
      { time: 'Tidlig morgen', title: 'Afgang for vandregruppen', desc: 'De vandrelystne kører til Preikestolen Fjellstue. Ca. 1t 45min fra hytten.', tags: ['kørsel', 'vandring'] },
      { time: '8–14', title: 'Vandring til Preikestolen', desc: '8 km t/r, ca. 4 timer, 500m stigning. Børn fra 8-9 år kan klare det. <a href="https://www.visitnorway.no/reisemal/fjord-norge/lysefjorden/preikestolen/" target="_blank" rel="noopener">Info hos VisitNorway</a>.', tags: ['vandring', 'sol'] },
      { time: 'Hele dagen', title: 'Alternativ: Hyggedag på hytten', desc: 'For dem der bliver hjemme: bad i Sirdalsvatnet, brætspil, læsning og en lang frokost.', tags: ['hygge'] },
      { time: 'Aften', title: 'Aftensmad: Fiskefrikadeller m. persillesovs', desc: 'Familie 3 har madansvar. Dansk klassiker med nye kartofler og rugbrød.', tags: ['mad'] }
    ]
  },
  {
    date: '2026-07-26', weekday: 'Søn', day: 26, month: 'JUL',
    title: 'Stavanger', subtitle: 'Bytur med oljemuseum',
    activities: [
      { time: 'Formiddag', title: 'Kør til Stavanger', desc: '~1½ time. Park i centrum og gå i Gamle Stavanger med de hvide træhuse.', tags: ['kørsel'] },
      { time: 'Frokost', title: 'Frokost i Stavanger', desc: 'Børnevenlig café eller fish & chips ved havnen.', tags: ['mad'] },
      { time: 'Eftermiddag', title: 'Norsk Oljemuseum', desc: 'Interaktivt og spændende for både børn og voksne. <a href="https://www.norskolje.museum.no/en/" target="_blank" rel="noopener">norskolje.museum.no</a>.', tags: ['indendørs', 'kultur'] },
      { time: 'Sen eftermiddag', title: 'Slik & is på vejen hjem', desc: 'Stop ved en købmand og forsyn dig med norsk slik.', tags: ['hygge'] },
      { time: 'Aften', title: 'Restaurant-aften 🍽', desc: 'Vi spiser ude — find et sted i Stavanger eller en lokal restaurant i Sirdal.', tags: ['mad'] }
    ]
  },
  {
    date: '2026-07-27', weekday: 'Man', day: 27, month: 'JUL',
    title: 'Kjeragbolten & Lysevegen', subtitle: 'Eventyrlystens dag',
    activities: [
      { time: 'Tidlig', title: 'Afgang mod Kjerag', desc: 'Kør Lysevegen — én af Norges mest spektakulære veje med 27 hårnålesving. Ca. 1½t.', tags: ['kørsel'] },
      { time: 'Formiddag', title: 'Vandring til Kjeragbolten', desc: 'Den berømte sten 1000m over fjorden. 11 km t/r, krævende. <a href="https://www.visitnorway.no/listings/kjeragbolten/19737/" target="_blank" rel="noopener">Info hos VisitNorway</a>.', tags: ['vandring', 'krævende'] },
      { time: 'Alternativ', title: 'Køretur på Lysevegen', desc: 'For dem der ikke vandrer: køreturen alene er en oplevelse. Stop ved Øygardstølen.', tags: ['kørsel'] },
      { time: 'Aften', title: 'Aftensmad: Pasta carbonara', desc: 'Familie 1 har madansvar (2. aften). Hurtig og mættende med bacon, parmesan og frisk peber.', tags: ['mad'] }
    ]
  },
  {
    date: '2026-07-28', weekday: 'Tir', day: 28, month: 'JUL',
    title: 'Roligere dag & afslutning', subtitle: 'Vi nyder det sidste',
    activities: [
      { time: 'Formiddag', title: 'Lifttur ved Tjørholmfjellet', desc: 'Tag liften op og nyd udsigten — eller gå turen, hvis benene stadig vil.', tags: ['aktivitet'] },
      { time: 'Frokost', title: 'Picnic ved Dorgefossen', desc: 'Spektakulært vandfald. Tag madpakker med og spis på klipperne.', tags: ['oplevelse'] },
      { time: 'Eftermiddag', title: 'Fiskeri eller Vandpark', desc: 'Fisk i Sirdalsvatnet, eller tag til <a href="https://www.sirdalbadeland.no/" target="_blank" rel="noopener">Sirdal Badeland</a> hvis vejret er gråt.', tags: ['aktivitet', 'regn'] },
      { time: 'Aften', title: 'Aftensmad: Burgers & pommes frites', desc: 'Familie 2 har madansvar (2. aften). Hjemmelavede burgers, coleslaw og sennepsmajo.', tags: ['mad'] },
      { time: 'Sent', title: 'Sidste aften: spil, fortællinger & afsked', desc: 'Hitster, Bezzerwisser, Wii — og en sidste tur ud at se på stjernerne.', tags: ['hygge'] }
    ]
  },
  {
    date: '2026-07-29', weekday: 'Ons', day: 29, month: 'JUL',
    title: 'Hjemrejse', subtitle: 'Farvel til fjeldene',
    activities: [
      { time: 'Morgen', title: 'Morgenmad sammen', desc: 'Alle hjælper. Vi spiser det sidste af det vi har.', tags: ['mad'] },
      { time: 'Inden kl. 11', title: 'Udtjek senest kl. 11:00', desc: 'Pak bilen, ryd hytten, gør rent — alle hjælper hinanden.', tags: ['praktisk'] },
      { time: 'Hjem', title: 'God tur hjem', desc: 'Tak for en uge i de norske fjelde 🇳🇴', tags: ['afsked'] }
    ]
  }
];

/* --------------------------- MADPLAN --------------------------- */
const MEALS = [
  { date: '22. jul', day: 'Ons', breakfast: '—', breakfastChef: 'På vejen', dinner: 'Velkomst-tacos', dinnerChef: 'Fællesindsats' },
  { date: '23. jul', day: 'Tor', breakfast: 'Klassisk morgenmad', breakfastChef: 'Mette & Morten', dinner: 'Grillaften: Kyllingespyd & pølser', dinnerChef: 'Familie 1' },
  { date: '24. jul', day: 'Fre', breakfast: 'Klassisk morgenmad', breakfastChef: 'Lars & Gitte', dinner: 'Lasagne m. salat & hvidløgsbrød', dinnerChef: 'Familie 2' },
  { date: '25. jul', day: 'Lør', breakfast: 'Klassisk morgenmad', breakfastChef: 'Camilla & Chresten', dinner: 'Fiskefrikadeller m. persillesovs', dinnerChef: 'Familie 3' },
  { date: '26. jul', day: 'Søn', breakfast: 'Klassisk morgenmad', breakfastChef: 'Lars & Camilla', dinner: 'Restaurant-aften ude 🍽', dinnerChef: 'Ude' },
  { date: '27. jul', day: 'Man', breakfast: 'Klassisk morgenmad', breakfastChef: 'Mette & Chresten', dinner: 'Pasta carbonara', dinnerChef: 'Familie 1' },
  { date: '28. jul', day: 'Tir', breakfast: 'Klassisk morgenmad', breakfastChef: 'Gitte & Morten', dinner: 'Hjemmelavede burgers & fries', dinnerChef: 'Familie 2' },
  { date: '29. jul', day: 'Ons', breakfast: 'Fælles morgenmad', breakfastChef: 'Alle', dinner: 'Hjemme 🏡', dinnerChef: '—' }
];

/* --------------------------- ATTRAKTIONER --------------------------- */
const ATTRACTIONS = [
  { name: 'Preikestolen', art: 'art-rock', diff: 'medium', diffLabel: 'Mellem', desc: 'Den ikoniske 604m høje klippe over Lysefjorden.', meta: [['⏱', '4-5 timer t/r'], ['📏', '8 km'], ['⬆', '500m']], link: 'https://www.visitnorway.no/reisemal/fjord-norge/lysefjorden/preikestolen/' },
  { name: 'Kjeragbolten', art: 'art-mountain', diff: 'hard', diffLabel: 'Krævende', desc: 'Sten klemt mellem to klipper 1000m over fjorden.', meta: [['⏱', '6-10 timer'], ['📏', '11 km'], ['⬆', '800m']], link: 'https://www.visitnorway.no/listings/kjeragbolten/19737/' },
  { name: 'Lysefjorden Cruise', art: 'art-fjord', diff: 'easy', diffLabel: 'Let', desc: 'Sejlads forbi vandfald, klippevægge og Preikestolen fra vandet.', meta: [['⏱', '2-3 timer'], ['⛴', 'Fra Lauvvik'], ['👶', 'Familievenlig']], link: 'https://www.rodne.no/en/lysefjorden-cruise-2/' },
  { name: 'Norsk Oljemuseum', art: 'art-city', diff: 'easy', diffLabel: 'Indendørs', desc: 'Interaktivt museum i Stavanger om Norges oliehistorie.', meta: [['⏱', '2-3 timer'], ['📍', 'Stavanger'], ['☔', 'God i regn']], link: 'https://www.norskolje.museum.no/' },
  { name: 'Lysevegen', art: 'art-mountain', diff: 'easy', diffLabel: 'Køretur', desc: '27 hårnålesving op fra fjorden. Stop ved Øygardstølen.', meta: [['⏱', '1-2 timer'], ['🚗', 'Køretur'], ['📷', 'Fotostop']], link: 'https://www.visitnorway.no/listings/lysevegen/213907/' },
  { name: 'Stavanger', art: 'art-city', diff: 'easy', diffLabel: 'Bytur', desc: 'Hyggelig by med "Gamle Stavanger" — hvide træhuse og cafeer.', meta: [['⏱', '½ dag'], ['🚗', '1½ time'], ['🍦', 'Cafeer']], link: 'https://www.visitnorway.no/reisemal/fjord-norge/stavanger/' },
  { name: 'Dorgefossen', art: 'art-water', diff: 'easy', diffLabel: 'Let', desc: 'Spektakulært vandfald nær Sirdal. Perfekt picnic-spot.', meta: [['⏱', '1 time'], ['📷', 'Fotospot'], ['🥪', 'Picnic']], link: 'https://www.sirdalsferie.no/' },
  { name: 'Tjørholmfjellet', art: 'art-forest', diff: 'easy', diffLabel: 'Let', desc: 'Lifttur op til toppen for udsigt. Fjellgolf og disc-golf.', meta: [['⏱', '2-3 timer'], ['🚡', 'Lifttur'], ['⛳', 'Disc-golf']], link: 'https://www.sirdalsferie.no/' },
  { name: 'Sirdal Badeland', art: 'art-water', diff: 'easy', diffLabel: 'Familie', desc: 'Indendørs vandpark med rutsjebaner — redningsplan i regnvejr.', meta: [['☔', 'Indendørs'], ['👨‍👩‍👧', 'Børnevenlig'], ['🏊', 'Bassiner']], link: 'https://www.sirdalbadeland.no/' }
];

/* --------------------------- PAKKELISTE (start-data) ---------------------------
   Transskriberet fra Excel. assigned = liste af familie-koder der tager tingen med.
   qty = antal (valgfrit). note = bemærkning. Familien kan redigere alt i app'en.
   ------------------------------------------------------------------------------ */
const NOTE_START = 'Kun til en start — kan købes løbende deroppe';

const PACKING_SEED = [
  // Morgenmad
  { cat: 'Morgenmad', name: 'A38',            assigned: ['GC'], note: NOTE_START },
  { cat: 'Morgenmad', name: 'Æg',             assigned: ['GC'], note: NOTE_START },
  { cat: 'Morgenmad', name: 'Corn flakes',    assigned: ['ML'], note: '' },
  { cat: 'Morgenmad', name: 'Gær',            assigned: ['GC'], note: '' },
  { cat: 'Morgenmad', name: 'Havregryn',      assigned: ['ML'], note: '' },
  { cat: 'Morgenmad', name: 'Kaffe',          assigned: ['GC'], note: '' },
  { cat: 'Morgenmad', name: 'Mælk',           assigned: [],     note: NOTE_START },
  { cat: 'Morgenmad', name: 'Marmelade',      assigned: ['ML'], note: '' },
  { cat: 'Morgenmad', name: 'Mel',            assigned: ['ML'], note: '' },
  { cat: 'Morgenmad', name: 'Mysli',          assigned: [],     note: '' },
  { cat: 'Morgenmad', name: 'Nutella',        assigned: ['ML'], note: '' },
  { cat: 'Morgenmad', name: 'Ost',            assigned: ['GC'], note: NOTE_START },
  { cat: 'Morgenmad', name: 'Pålægschokolade',assigned: [],     note: '' },
  { cat: 'Morgenmad', name: 'Peanutbutter',   assigned: ['GC'], note: '' },
  { cat: 'Morgenmad', name: 'Smør',           assigned: ['GC'], note: NOTE_START },
  { cat: 'Morgenmad', name: 'Te',             assigned: ['ML'], note: '' },
  { cat: 'Morgenmad', name: 'Smøreost m. urter', assigned: ['GC'], note: '' },
  // Frokost
  { cat: 'Frokost', name: 'Agurker',      assigned: [],     note: '' },
  { cat: 'Frokost', name: 'Grøntsager',   assigned: [],     note: '' },
  { cat: 'Frokost', name: 'Hotdogbrød',   assigned: ['ML'], note: '' },
  { cat: 'Frokost', name: 'Hotdogpølser', assigned: ['GC'], note: '' },
  { cat: 'Frokost', name: 'Hummus',       assigned: ['GC'], note: '' },
  { cat: 'Frokost', name: 'Karrysalat',   assigned: [],     note: '' },
  { cat: 'Frokost', name: 'Ketchup',      assigned: ['GC'], note: '' },
  { cat: 'Frokost', name: 'Leverpostej',  assigned: [],     note: '' },
  { cat: 'Frokost', name: 'Makrel',       assigned: ['GC'], note: '' },
  { cat: 'Frokost', name: 'Mayo',         assigned: ['ML'], note: '' },
  { cat: 'Frokost', name: 'Remoulade',    assigned: ['ML'], note: '' },
  { cat: 'Frokost', name: 'Ristede løg',  assigned: ['ML'], note: '' },
  { cat: 'Frokost', name: 'Roastbeef',    assigned: [],     note: '' },
  // Husholdning (eksempler — udbyg selv)
  { cat: 'Husholdning', name: 'Opvasketabs',   assigned: [], note: '' },
  { cat: 'Husholdning', name: 'Køkkenrulle',   assigned: [], note: '' },
  { cat: 'Husholdning', name: 'Toiletpapir',   assigned: [], note: '' },
  { cat: 'Husholdning', name: 'Skraldeposer',  assigned: [], note: '' },
  { cat: 'Husholdning', name: 'Håndsæbe',       assigned: [], note: '' }
];

const PACKING_CATEGORIES = ['Morgenmad', 'Frokost', 'Aftensmad', 'Snacks', 'Drikkevarer', 'Husholdning', 'Andet'];

/* --------------------------- EKSTRA / GREJ (start-data) --------------------------- */
const GEAR_SEED = [
  { name: 'Højttaler (Bluetooth)', by: '', note: '' },
  { name: 'Brætspil', by: '', note: 'Fx Bezzerwisser, Hitster' },
  { name: 'Snittekniv', by: '', note: '' },
  { name: 'Fiskegrej', by: '', note: 'Hvis man har' },
  { name: 'Kortspil', by: '', note: '' }
];
