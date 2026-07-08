/* =====================================================================
   data.js — alt statisk indhold til Sirdal-siden
   (program, madplan, attraktioner, familier, medbring-liste)
   Rediger her hvis noget skal ændres.
   ===================================================================== */

/* De fire familier. Koden (ML/GC/CM/LA) bruges i medbring-listen. */
window.FAMILIES = [
  { code: 'LA', icon: 'fi-1', initial: 'L', name: 'Lisbeth & Anders', location: 'Hjørring · Fødselaren',
    members: ['Lisbeth (mormor)', 'Anders'] },
  { code: 'GC', icon: 'fi-2', initial: 'G', name: 'Gitte & Chresten', location: 'Grejs',
    members: ['Gitte', 'Chresten', { name: 'Hans', child: true }, { name: 'Esther', child: true }, { name: 'Emil', child: true }] },
  { code: 'CM', icon: 'fi-3', initial: 'C', name: 'Camilla & Morten', location: 'Hadsten',
    members: ['Camilla', 'Morten', { name: 'Agnete', child: true }, { name: 'Peter', child: true }] },
  { code: 'ML', icon: 'fi-4', initial: 'M', name: 'Mette & Lars', location: 'Søllerød',
    members: ['Mette', 'Lars', { name: 'William', child: true }, { name: 'Frederik', child: true }, { name: 'Carl', child: true }] }
];

window.DAYS = [
  {
    date: '2026-07-22', weekday: 'Ons', day: 22, month: 'JUL',
    title: 'Ankomst & afslapning',
    subtitle: 'Vi falder til på hytten',
    activities: [
      { time: 'Fra kl. 15', title: 'Indtjek på Sirdal Mountain Lodge', desc: 'Find værelser, pak ud, og udforsk hytten. Husk: sengetøj og håndklæder skal redes op.', tags: ['praktisk'] },
      { time: 'Eftermiddag', title: 'Indkøb i nærmeste købmand', desc: 'Et hold tager til den lokale dagligvarebutik (Joker Sinnes eller Coop i Tonstad) og fylder op med friske varer.', tags: ['praktisk'] },
      { time: 'Aften', title: 'Velkomst-aftensmad: Tacos', desc: 'Klassiker når 16 sultne familiemedlemmer skal mættes. Børnene kan selv vælge fyld.', tags: ['mad'] },
      { time: 'Sent', title: 'Aftengåtur og snak på terrassen', desc: 'Solnedgangen står på ca. 22:30 om sommeren i Sirdal — perfekt til en stille rundtur.', tags: ['hygge'] }
    ]
  },
  {
    date: '2026-07-23', weekday: 'Tor', day: 23, month: 'JUL',
    title: 'Let dag lokalt',
    subtitle: 'Vandfald, klatrepark og kano',
    activities: [
      { time: 'Formiddag', title: 'Kort vandring til Dorgefossen', desc: 'Spektakulært vandfald i en dyb kløft, ca. 30 min fra hytten. Kort gåtur fra p-plads til udsigtsplatform. Picnicborde og "Håvardsteinen" — en 3.200 kg sten som en stærk sirdøl angiveligt løftede med håndkraft.', tags: ['vandring', 'sol'] },
      { time: 'Frokost', title: 'Madpakke på klipperne', desc: 'Vi spiser ved Dorgefossen med udsigt til vandfaldet — kun naturen som restaurant.', tags: ['mad'] },
      { time: 'Eftermiddag', title: 'Sirdal Fjellpark: split-op', desc: 'Aktivitetscentret ved Tjørholmfjellet — klatrepark, mountain carts, frisbee-golf eller kano/SUP på søen. Familierne kan splitte op efter humør. Ca. 10 min fra hytten.', tags: ['aktivitet'] },
      { time: 'Aften', title: 'Grillaften: Ørred eller laks + pølser', desc: 'Mette & Lars har madansvar. Fisken pakkes ind i folie med citron, dild og smør — pølser og hjemmebagt focaccia på siden. Nye kartofler og sommersalat.', tags: ['mad'] }
    ]
  },
  {
    date: '2026-07-24', weekday: 'Fre', day: 24, month: 'JUL',
    title: 'Lysefjorden',
    subtitle: 'Den store sejltur',
    activities: [
      { time: 'Morgen', title: 'Tidlig morgenmad', desc: 'Vi spiser tidligt for at nå cruiset fra Stavanger.', tags: ['mad'] },
      { time: 'Formiddag', title: 'Kør til Stavanger', desc: '~1½ time. Rødne Fjord Cruise afgår fra Strandkaien i centrum.', tags: ['kørsel'] },
      { time: '11–14', title: 'Fjordcruise på Lysefjorden', desc: 'Sejlads på eldrevet katamaran forbi Fantahålå (fredløseshule), Hengjanefossen-vandfaldet og Preikestolen set fra vandet. 3-3½ timer. <a href="https://rodne.no/en/fjord-experiences/stavanger/fjordcruise-lysefjord-preikestolen/" target="_blank" rel="noopener">Rødne Fjord Cruise</a>.', tags: ['oplevelse', 'sol'] },
      { time: 'Eftermiddag', title: 'Slik-stop på vejen hjem', desc: 'Forsyn dig med norsk slik i en Joker eller Coop — det er bare bedre end det danske.', tags: ['hygge'] },
      { time: 'Aften', title: 'Aftensmad: Norske "kjøttkaker" i brun sovs', desc: 'Camilla & Morten har madansvar. Norges svar på frikadeller — hakket oksekød med muskatnød, serveret med brun sovs, kogte kartofler og tyttebærsyltetøj. Klassisk norsk husmandskost.', tags: ['mad'] }
    ]
  },
  {
    date: '2026-07-25', weekday: 'Lør', day: 25, month: 'JUL',
    title: 'Preikestolen',
    subtitle: 'Den ikoniske vandring (for dem der vil)',
    activities: [
      { time: 'Tidlig morgen', title: 'Afgang for vandregruppen', desc: 'De vandrelystne kører til Preikestolen Basecamp (parkering, 250 NOK/dag). Ca. 1t 45min fra hytten. Start tidligt for at undgå de værste menneskemængder.', tags: ['kørsel', 'vandring'] },
      { time: '8–14', title: 'Vandring til Preikestolen', desc: '8 km t/r, ca. 4 timer. 500m stigning på godt tilrettelagt sherpa-sti med trin. Børn fra 5-6 år kan klare det med gode sko. <a href="https://www.visitnorway.com/places-to-go/fjord-norway/ryfylke/the-lysefjord-area/hiking-to-preikestolen/" target="_blank" rel="noopener">Info hos VisitNorway</a>.', tags: ['vandring', 'sol'] },
      { time: 'Hele dagen', title: 'Alternativ: Hyggedag på hytten', desc: 'For dem der bliver hjemme: bad i Sinnes vandpark (5 min væk), brætspil på terrassen, læsning og en god lang frokost. Turen til Preikestolen er ikke for alle — og en dovendag i fjeldet er også en oplevelse.', tags: ['hygge'] },
      { time: 'Aften', title: 'Restaurant-aften ude 🍽', desc: 'Vi spiser ude — vandregruppen kan tage en tidlig middag i Stavanger på vejen hjem, eller vi mødes alle 16 i Sirdal. Sinnes Fjellstue eller Slottet er lokale muligheder med god udsigt.', tags: ['mad'] }
    ]
  },
  {
    date: '2026-07-26', weekday: 'Søn', day: 26, month: 'JUL',
    title: 'Stavanger',
    subtitle: 'Bytur med oljemuseum',
    activities: [
      { time: 'Formiddag', title: 'Kør til Stavanger', desc: '~1½ time. Park i centrum og gå rundt i Gamle Stavanger — 173 fredede hvide træhuse fra 1700-tallet og brostensgader.', tags: ['kørsel'] },
      { time: 'Frokost', title: 'Frokost ved havnen', desc: 'Fish &amp; chips ved fiskemarkedet, eller børnevenlig café i Øvre Holmegate ("Fargegata") med regnbue-facader.', tags: ['mad'] },
      { time: 'Eftermiddag', title: 'Norsk Oljemuseum', desc: 'Interaktivt museum — bygningen ligner selv en boreplatform. Rutsjebane, katastrofe-rum og klatre-platform for børnene. Voksne 180 NOK, børn 4-16 år 60 NOK, familie 420 NOK. <a href="https://www.norskolje.museum.no/en/" target="_blank" rel="noopener">norskolje.museum.no</a>.', tags: ['indendørs', 'kultur'] },
      { time: 'Sen eftermiddag', title: 'Kør tilbage til hytten', desc: 'Stop evt. ved en Coop og fyld op med aftensmad-ingredienser.', tags: ['kørsel'] },
      { time: 'Aften', title: 'Aftensmad: Pasta carbonara', desc: 'Gitte & Chresten har madansvar. Ægte italiensk carbonara med guanciale (eller bacon), pecorino, æggeblomme og masser af friskkværnet peber. Grov salat og hvidløgsbrød ved siden. Nemt at lave i store portioner efter en lang dag.', tags: ['mad'] }
    ]
  },
  {
    date: '2026-07-27', weekday: 'Man', day: 27, month: 'JUL',
    title: 'Mixet fjelddag',
    subtitle: 'Køretur, top og adrenalin',
    activities: [
      { time: 'Formiddag', title: 'Lysevegen — scenic drive', desc: '27 hårnålesving og 900m højdeforskel mellem Sirdal og Lysebotn. Én af Norges mest spektakulære bjergveje. Stop ved Øygardstølen ("Ørneredet") for panoramaudsigten. Ca. 1 time hver vej.', tags: ['kørsel', 'sol'] },
      { time: 'Alternativ', title: 'Kjeragbolten for de vandreivrige', desc: 'De hårdføre kan tage vandringen — 11 km t/r, 5-7 timer, tre stejle klatrepartier med kæder. Startsted er Øygardstølen. Ikke for højdeforskrækkede. <a href="https://kjerag.info/" target="_blank" rel="noopener">kjerag.info</a>.', tags: ['vandring', 'krævende'] },
      { time: 'Eftermiddag', title: 'Røseknuten fra Tjørhomfjellet', desc: 'For dem der bliver hjemme: familievenlig topvandring — tag stoleliften op, gå til Røseknuten, og få udsigt til de fjelde vi så fra Lysefjorden fredag. 2-3 timer.', tags: ['vandring'] },
      { time: 'Aften', title: 'Aftensmad: Rensdyrgryde', desc: 'Camilla & Morten har madansvar. Norsk fjeldklassiker med rensdyrkød (kan købes i Tonstad), champignoner, tyttebær og fløde. Serveres med kartoffelmos og syltede tyttebær. Nordisk komfort-mad i sin fineste form.', tags: ['mad'] }
    ]
  },
  {
    date: '2026-07-28', weekday: 'Tir', day: 28, month: 'JUL',
    title: 'Bufferdag & afslutning',
    subtitle: 'Vi nyder det sidste — vejret bestemmer',
    activities: [
      { time: 'Formiddag', title: 'Vejret bestemmer', desc: 'Sol: Sinnes vandpark (5 min væk — gratis udendørs vandpark i Sinnesvatnet med klatrevæg og "matte"), eller kano på Sirdalsvatnet. Regn: Tonstadbadet — indendørs badeanlæg med tre bassiner, sauna og steambadstu, 25 min væk.', tags: ['aktivitet'] },
      { time: 'Frokost', title: 'Frokost på hytten', desc: 'Vi rydder op i køleskabet — brug det der er tilbage af pålæg, ost og brød.', tags: ['mad'] },
      { time: 'Eftermiddag', title: 'Ekstra tur eller Flekkefjord', desc: 'For dem med gnist tilbage: Flekkefjord med Hollenderbyen (charmerende hvide træhuse fra 1500-tallet og over 30 gadekunst-værker, 1 time væk). Ellers: en dovendag på terrassen med bog og kaffe.', tags: ['aktivitet'] },
      { time: 'Aften', title: 'Aftensmad: Hjemmelavede burgers & fries', desc: 'Mette & Lars har madansvar. Store, saftige burgers med coleslaw, syltede løg og sennepsmajo. Hjemmelavede pommes frites i ovnen. Børnene jubler.', tags: ['mad'] },
      { time: 'Sent', title: 'Sidste aften: spil, fortællinger &amp; afsked', desc: 'Hitster, Bezzerwisser, Wii — og en sidste tur ud at se på stjernerne. Solnedgang ca. 22:30.', tags: ['hygge'] }
    ]
  },
  {
    date: '2026-07-29', weekday: 'Ons', day: 29, month: 'JUL',
    title: 'Hjemrejse',
    subtitle: 'Farvel til fjeldene',
    activities: [
      { time: 'Morgen', title: 'Morgenmad sammen', desc: 'Alle hjælper. Vi spiser det sidste af det vi har.', tags: ['mad'] },
      { time: 'Inden kl. 11', title: 'Udtjek senest kl. 11:00', desc: 'Pak bilen, ryd hytten, gør rent — alle hjælper hinanden.', tags: ['praktisk'] },
      { time: 'Hjem', title: 'God tur hjem', desc: 'Tak for en uge i de norske fjelde 🇳🇴', tags: ['afsked'] }
    ]
  }
];

window.MEALS = [
  { date: '22. jul', day: 'Ons', breakfast: '—', breakfastChef: 'På vejen', dinner: 'Velkomst-tacos', dinnerChef: 'Mette & Lars' },
  { date: '23. jul', day: 'Tor', breakfast: 'Klassisk morgenmad', breakfastChef: 'Mette & Morten', dinner: 'Grillaften: Ørred el. laks og pølser', dinnerChef: 'Gitte & Chresten' },
  { date: '24. jul', day: 'Fre', breakfast: 'Klassisk morgenmad', breakfastChef: 'Lars & Gitte', dinner: 'Norske "frikadeller" i brun sovs', dinnerChef: 'Camilla & Morten' },
  { date: '25. jul', day: 'Lør', breakfast: 'Klassisk morgenmad', breakfastChef: 'Camilla & Chresten', dinner: 'Restaurant-aften ude 🍽', dinnerChef: 'Ude' },
  { date: '26. jul', day: 'Søn', breakfast: 'Klassisk morgenmad', breakfastChef: 'Lars & Camilla', dinner: 'Pasta carbonara', dinnerChef: 'Gitte & Chresten' },
  { date: '27. jul', day: 'Man', breakfast: 'Klassisk morgenmad', breakfastChef: 'Mette & Chresten', dinner: 'Rensdyrgryde', dinnerChef: 'Camilla & Morten' },
  { date: '28. jul', day: 'Tir', breakfast: 'Klassisk morgenmad', breakfastChef: 'Gitte & Morten', dinner: 'Hjemmelavede burgers & fries', dinnerChef: 'Mette & Lars' },
  { date: '29. jul', day: 'Ons', breakfast: 'Fælles morgenmad', breakfastChef: 'Alle', dinner: 'Hjemme 🏡', dinnerChef: '—' }
];

/* Alle links tjekket og verificeret juli 2026. Ture inkluderer både dem der
   er på ugens program og ekstra forslag, hvis nogen vil supplere. */
window.ATTRACTIONS = [

  /* ============ VANDRING ============ */

  { name: 'Preikestolen', art: 'art-rock', diff: 'medium', diffLabel: 'Mellem',
    desc: 'Den ikoniske 604m høje klippe over Lysefjorden — en af verdens mest spektakulære udsigter. Godt tilrettelagt sherpa-sti med trin. Børn fra 5-6 år kan klare det med gode sko.',
    meta: [['⏱', '4 timer t/r'], ['📏', '8 km'], ['⬆', '500m stigning'], ['🚗', '1t 45min']],
    link: 'https://www.visitnorway.com/places-to-go/fjord-norway/ryfylke/the-lysefjord-area/hiking-to-preikestolen/' },

  { name: 'Røseknuten fra Tjørhomfjellet', art: 'art-mountain', diff: 'easy', diffLabel: 'Let',
    desc: 'Familievenlig topvandring, oplagt at kombinere med stoleliften op. På toppen har man udsigt til de fjelde, man senere ser fra Lysefjorden. Grusvej og markerede stier.',
    meta: [['⏱', '2-3 timer'], ['🚡', 'Lifttur op'], ['⬆', 'Moderat stigning'], ['🚗', '15 min']],
    link: 'https://hoytlavt.no/sirdal/en/activities/other-activities/' },

  { name: 'Dorgefossen', art: 'art-water', diff: 'easy', diffLabel: 'Let',
    desc: 'Imponerende vandfald i en dyb kløft. Kort gåtur fra p-plads til udsigtsplatform. Picnicborde, sti ned til kløftens kant og "Håvardsteinen" — en 3.200 kg sten som en stærk mand fra Sirdal angiveligt løftede med håndkraft.',
    meta: [['⏱', '½-1 time'], ['📷', 'Fotospot'], ['🥪', 'Picnicborde'], ['🚗', '30 min']],
    link: 'https://www.fjordnorway.com/en/see-and-do/dorgefoss-waterfall' },

  { name: 'Kjeragbolten', art: 'art-mountain', diff: 'hard', diffLabel: 'Krævende',
    desc: 'Den berømte sten klemt mellem to klipper 1.000m over Lysefjorden. Krævende vandring med tre stejle klatrepartier med kæder. Ikke for dem der er bange for højder eller små børn. Sæson: juni-september.',
    meta: [['⏱', '5-7 timer'], ['📏', '11 km'], ['⬆', '800m stigning'], ['🚗', '1 time']],
    link: 'https://kjerag.info/' },

  /* ============ SEJLADS & VAND ============ */

  { name: 'Lysefjord-cruise (Rødne)', art: 'art-fjord', diff: 'easy', diffLabel: 'Familie',
    desc: 'Sejlads på eldrevet katamaran fra Stavanger gennem Lysefjorden. Passerer Fantahålå (fredløseshule), Hengjanefossen-vandfaldet (så tæt at man mærker sprayen) og Preikestolen set fra vandet. Waffles og kaffe ombord.',
    meta: [['⏱', '3-3½ timer'], ['⛴', 'Fra Stavanger'], ['👶', 'Familievenlig'], ['⚡', 'Elektrisk båd']],
    link: 'https://rodne.no/en/fjord-experiences/stavanger/fjordcruise-lysefjord-preikestolen/' },

  { name: 'Kano & SUP på Sirdalsvatnet', art: 'art-water', diff: 'easy', diffLabel: 'Aktivitet',
    desc: 'Sirdal Fjellpark udlejer kanoer (3-4 personer pr. kano — perfekt til familier) og SUP-boards direkte ved klatreparken. En rolig eftermiddag på det spejlblanke fjeldvand.',
    meta: [['⏱', '1-3 timer'], ['🛶', 'Udlejning'], ['👨‍👩‍👧', 'Alle aldre'], ['🚗', '10 min']],
    link: 'https://hoytlavt.no/sirdal/en/activities/other-activities/' },

  { name: 'Sinnes vandpark', art: 'art-water', diff: 'easy', diffLabel: 'Familie',
    desc: 'Gratis udendørs vandpark i Sinnesvatnet lige ved Sinnes Fjellstue — 5 min fra hytten. To elementer: en klatrevæg og en "matte". Parker på modsatte side af vejen mod Ålsheia. Bading på eget ansvar.',
    meta: [['🆓', 'Gratis'], ['🏊', 'Udendørs'], ['👶', 'Børnevenlig'], ['🚗', '5 min']],
    link: 'https://visitsirdal365.no/opplevelser/aktiviteter/badeplasser' },

  /* ============ BY ============ */

  { name: 'Stavanger', art: 'art-city', diff: 'easy', diffLabel: 'Bytur',
    desc: 'Gamle Stavanger med 173 fredede, hvide træhuse og brostensgader. Farvegade (Fargegata) med regnbue-facader, fiskemarked ved havnen og masser af cafeer. Combine med Norsk Oljemuseum for en hel dag.',
    meta: [['⏱', '½-1 dag'], ['🚗', '1½ time'], ['🍦', 'Cafeer & shopping']],
    link: 'https://www.visitnorway.com/places-to-go/fjord-norway/the-stavanger-region/' },

  { name: 'Norsk Oljemuseum', art: 'art-city', diff: 'easy', diffLabel: 'Indendørs',
    desc: 'Interaktivt museum i Stavanger om Norges oliehistorie — bygningen ligner selv en boreplatform. Rutsjebane, katastrofe-rum og en klatre-platform for børnene. God plan B i regnvejr. Voksne 180 NOK, børn 4-16 år 60 NOK, familie 420 NOK.',
    meta: [['⏱', '2-3 timer'], ['📍', 'Stavanger'], ['☔', 'God i regnvejr'], ['🎫', 'Familiebillet 420 NOK']],
    link: 'https://www.norskolje.museum.no/en/' },

  { name: 'Flekkefjord & Hollenderbyen', art: 'art-city', diff: 'easy', diffLabel: 'Bytur',
    desc: 'Overset lille kystby med charmerende "Hollenderbyen" — hvide træhuse fra 1500-1700-tallet, brostensgader, over 30 gadekunst-værker og Grand Hotell fra 1897. Kortere tur end Stavanger, mere autentisk stemning.',
    meta: [['⏱', '½ dag'], ['🚗', '1 time'], ['🎨', 'Gadekunst']],
    link: 'https://www.visitnorway.com/places-to-go/southern-norway/flekkefjord/' },

  /* ============ AKTIVITETER (SIRDAL FJELLPARK) ============ */

  { name: 'Høyt & Lavt klatrepark', art: 'art-forest', diff: 'medium', diffLabel: 'Aktivitet',
    desc: 'Klatrepark ved Tjørhomfjellet: 7 baner, 58 forhindringer og 7 ziplines — den længste over 200 meter. Farve-inddelt efter sværhed (orange fra 80 cm, blå fra 140 cm). Alle jeres børn kan være med på et niveau.',
    meta: [['⏱', '2-3 timer'], ['🧗', 'Klatring'], ['👶', 'Fra 80 cm'], ['🚗', '10 min']],
    link: 'https://hoytlavt.no/sirdal/en/' },

  { name: 'Mountain Cart', art: 'art-mountain', diff: 'easy', diffLabel: 'Aktivitet',
    desc: 'Trehjulede off-road-vogne med bremser på begge baghjul. Kør ned ad 700m specialbanen. Alene fra 140 cm eller 12 år — mindre børn må køre med en voksen. Ren adrenalin på moderat niveau.',
    meta: [['⏱', '1-2 timer'], ['🛞', 'Vogntur'], ['👶', 'Fra 140 cm'], ['🚗', '10 min']],
    link: 'https://hoytlavt.no/sirdal/en/activities/other-activities/' },

  { name: 'Tjørhomfjellet (stolelift)', art: 'art-mountain', diff: 'easy', diffLabel: 'Familie',
    desc: 'Områdets eneste stolelift tager jer op på 928 m. Bare turen op er en oplevelse — panorama over hele Sirdal. Kombiner med kaffe i Sirdal Lodge nedenunder eller en let vandring til Røseknuten på toppen.',
    meta: [['⏱', '1-2 timer'], ['🚡', 'Lifttur'], ['📷', 'Panorama'], ['🚗', '10 min']],
    link: 'https://sirdalfjellpark.no/en/' },

  { name: 'Frisbee-golf & fjellgolf', art: 'art-forest', diff: 'easy', diffLabel: 'Aktivitet',
    desc: 'Gratis 9-huls frisbee-golf-bane ved bunden af stoleliften — hvis I ikke selv har frisbees, kan de lejes hos Sirdal Lodge-restauranten. Der er også en 9-huls fjellgolf-bane i området.',
    meta: [['⏱', '1-2 timer'], ['⛳', '9 huller'], ['🆓', 'Gratis m. egen frisbee'], ['🚗', '10 min']],
    link: 'https://hoytlavt.no/sirdal/en/activities/other-activities/' },

  /* ============ KØRSEL & UDFLUGT ============ */

  { name: 'Lysevegen', art: 'art-mountain', diff: 'easy', diffLabel: 'Køretur',
    desc: '27 hårnålesving og 900m højdeforskel mellem Lysebotn og Sirdal — én af Norges mest spektakulære bjergveje. Stop ved Øygardstølen ("Ørneredet") for panoramaudsigten. Kan kombineres med Kjerag-vandring eller bare som scenic drive.',
    meta: [['⏱', '1-2 timer'], ['🚗', 'Køretur'], ['📷', '27 hårnåle'], ['🌄', 'Åben maj-okt']],
    link: 'https://www.fjordnorway.com/en/see-and-do/lysevegen-road' },

  /* ============ REGNVEJRS-PLAN B ============ */

  { name: 'Tonstadbadet', art: 'art-water', diff: 'easy', diffLabel: 'Indendørs',
    desc: 'Indendørs badeanlæg i Tonstad med tre bassiner: sportsbassin (28°C, 12,5m med vippe og 3m stupetårn), velværebassin (33°C med modstrøm, massage og boblebad) og lærings-/plaskebassin. Sauna og steambadstu. Perfekt regnvejrs-plan B.',
    meta: [['☔', 'Indendørs'], ['🏊', '3 bassiner'], ['🧖', 'Sauna + steam'], ['🚗', '25 min']],
    link: 'https://www.sirdal.kommune.no/tjenester/kultur-idrett-og-fritid/tonstadbadet-og-sinnesbadet/tonstadbadet' }

];

/* =====================================================================
   MEDBRING-LISTE — seedet fra Excel-arket "Medbringes".
   Hver linje: id (unik), cat (kategori), name, samt evt. "pre" = de
   familier der allerede var sat i Excel, og "note".
   "pre" bliver kun brugt FØRSTE gang siden åbnes (som udgangspunkt).
   Bagefter styres alt af de valg I laver i selve appen.
   ===================================================================== */
window.BRING_ITEMS = [
  // --- Morgenmad ---
  { id: 'm-a38',        cat: 'Morgenmad', name: 'A38' },
  { id: 'm-aeg',        cat: 'Morgenmad', name: 'Æg' },
  { id: 'm-cornflakes', cat: 'Morgenmad', name: 'Corn flakes' },
  { id: 'm-gaer',       cat: 'Morgenmad', name: 'Gær' },
  { id: 'm-havregryn',  cat: 'Morgenmad', name: 'Havregryn' },
  { id: 'm-kaffe',      cat: 'Morgenmad', name: 'Kaffe' },
  { id: 'm-maelk',      cat: 'Morgenmad', name: 'Mælk' },
  { id: 'm-marmelade',  cat: 'Morgenmad', name: 'Marmelade' },
  { id: 'm-mel',        cat: 'Morgenmad', name: 'Mel' },
  { id: 'm-mysli',      cat: 'Morgenmad', name: 'Mysli' },
  { id: 'm-nutella',    cat: 'Morgenmad', name: 'Nutella' },
  { id: 'm-ost',        cat: 'Morgenmad', name: 'Ost' },
  { id: 'm-paalaegschok', cat: 'Morgenmad', name: 'Pålægschokolade' },
  { id: 'm-peanutbutter', cat: 'Morgenmad', name: 'Peanutbutter' },
  { id: 'm-smoer',      cat: 'Morgenmad', name: 'Smør' },
  { id: 'm-te',         cat: 'Morgenmad', name: 'Te' },

  // --- Frokost ---
  { id: 'f-agurker',    cat: 'Frokost', name: 'Agurker' },
  { id: 'f-groentsager',cat: 'Frokost', name: 'Grøntsager' },
  { id: 'f-hotdogbroed',cat: 'Frokost', name: 'Hotdogbrød' },
  { id: 'f-hotdogpoels',cat: 'Frokost', name: 'Hotdogpølser' },
  { id: 'f-hummus',     cat: 'Frokost', name: 'Hummus' },
  { id: 'f-karrysalat', cat: 'Frokost', name: 'Karrysalat' },
  { id: 'f-ketchup',    cat: 'Frokost', name: 'Ketchup' },
  { id: 'f-leverpostej',cat: 'Frokost', name: 'Leverpostej' },
  { id: 'f-makrel',     cat: 'Frokost', name: 'Makrel' },
  { id: 'f-mayo',       cat: 'Frokost', name: 'Mayo' },
  { id: 'f-remoulade',  cat: 'Frokost', name: 'Remoulade' },
  { id: 'f-ristedeloeg',cat: 'Frokost', name: 'Ristede løg' },
  { id: 'f-roastbeef',  cat: 'Frokost', name: 'Roastbeef' },
  { id: 'f-roedbeder',  cat: 'Frokost', name: 'Rødbeder' },
  { id: 'f-rugbroed',   cat: 'Frokost', name: 'Rugbrød' },
  { id: 'f-sennep',     cat: 'Frokost', name: 'Sennep' },
  { id: 'f-sild',       cat: 'Frokost', name: 'Sild' },
  { id: 'f-spegepoelse',cat: 'Frokost', name: 'Spegepølse' },

  // --- Diverse ---
  { id: 'd-affaldsposer', cat: 'Diverse', name: 'Affaldsposer' },
  { id: 'd-aperitif',     cat: 'Diverse', name: 'Aperitif' },
  { id: 'd-bagepapir',    cat: 'Diverse', name: 'Bagepapir' },
  { id: 'd-chips',        cat: 'Diverse', name: 'Chips' },
  { id: 'd-chokolade',    cat: 'Diverse', name: 'Chokolade' },
  { id: 'd-cola',         cat: 'Diverse', name: 'Cola' },
  { id: 'd-drikkevarer',  cat: 'Diverse', name: 'Drikkevarer' },
  { id: 'd-film',         cat: 'Diverse', name: 'Film' },
  { id: 'd-frugt',        cat: 'Diverse', name: 'Frugt' },
  { id: 'd-haandsaebe',   cat: 'Diverse', name: 'Håndsæbe' },
  { id: 'd-juice',        cat: 'Diverse', name: 'Juice?' },
  { id: 'd-kaffefiltre',  cat: 'Diverse', name: 'Kaffefiltre' },
  { id: 'd-kakao',        cat: 'Diverse', name: 'Kakao' },
  { id: 'd-knaekbroed',   cat: 'Diverse', name: 'Knækbrød' },
  { id: 'd-koekkenrulle', cat: 'Diverse', name: 'Køkkenrulle' },
  { id: 'd-lys',          cat: 'Diverse', name: 'Lys' },
  { id: 'd-olie',         cat: 'Diverse', name: 'Olie' },
  { id: 'd-opvaskemiddel',cat: 'Diverse', name: 'Opvaskemiddel' },
  { id: 'd-opvasketabs',  cat: 'Diverse', name: 'Opvasketabs' },
  { id: 'd-plastikposer', cat: 'Diverse', name: 'Plastikposer' },
  { id: 'd-saft',         cat: 'Diverse', name: 'Saft' },
  { id: 'd-saltpeber',    cat: 'Diverse', name: 'Salt og peber' },
  { id: 'd-slik',         cat: 'Diverse', name: 'Slik' },
  { id: 'd-taendstikker', cat: 'Diverse', name: 'Tændstikker' },
  { id: 'd-toiletpapir',  cat: 'Diverse', name: 'Toiletpapir' },

  // --- Praktisk ---
  { id: 'p-karklude',    cat: 'Praktisk', name: '3 karklude', note: 'Tag 3 stk med hver, så der er nyt til hver dag' },
  { id: 'p-viskestykker',cat: 'Praktisk', name: '3 viskestykker', note: 'Tag 3 stk med hver, så der er nyt til hver dag' }
];

window.BRING_CATEGORIES = ['Morgenmad', 'Frokost', 'Diverse', 'Praktisk'];

/* =====================================================================
   FÆLLES TING — seedet fra Excel-arket "Ekstra".
   Frie ting man tager med: brætspil, højttaler, snittekniv osv.
   Disse indsættes kun første gang; derefter kan alle tilføje/redigere.
   ===================================================================== */
window.CUSTOM_SEED = [
  { name: 'Hitster', family: 'ML' },
  { name: 'Bezzerwisser', family: 'ML' },
  { name: 'Whiskey fra den finske julemand', family: 'CM' },
  { name: 'Nogle spil (udfyldes senere hvilke)', family: 'CM' },
  { name: 'Wii (med HDMI-kabel)', family: 'LA' }
];
