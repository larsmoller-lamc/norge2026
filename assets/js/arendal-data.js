/* =====================================================================
   arendal-data.js — Data for turen Holte → Oslo → Arendal → Sinnes
   Version: 2026-07-13-v1
   ===================================================================== */

window.TRIP_DAYS = [
  {
    date: '2026-07-20',
    weekday: 'Man', day: '20', month: 'juli',
    title: 'Holte → Oslo → Arendal',
    subtitle: 'Tidlig afgang, færge, sightseeing i Oslo og aftensmad ved havnen i Arendal.',
    activities: [
      {
        time: '05:45',
        title: 'Afgang fra Holte',
        desc: 'Arnevangen 35, 2840 Holte. Sørg for pas, snacks til bilen og drengenes iPad-oplader klar. Tank før færgen, det er billigere i DK.'
      },
      {
        time: '06:30',
        title: 'Færge Helsingør → Helsingborg',
        desc: 'Ca. 20 minutters overfart. Tag morgenmad ombord — ScandLines har god buffet, eller nøjes med kaffe og noget fra bagerposen hjemmefra.'
      },
      {
        time: '07:00',
        title: 'Op gennem Sverige',
        desc: 'E6 hele vejen op. Ca. 5,5 times kørsel til Oslo med et par pauser. Anbefalet stop: rasteplads ved Ljungby eller Halmstad.',
        tags: ['bilkørsel']
      },
      {
        time: '13:00',
        title: 'Ankomst Oslo — frokost',
        desc: 'Parker på Aker Brygge (P-hus) og gå ud på kajen. Frokost på en af havneterrasserne — Lofoten Fiskerestaurant eller Beach Club Aker Brygge.',
        tags: ['frokost']
      },
      {
        time: '14:00',
        title: 'Sightseeing: Operaen &amp; havnen',
        desc: 'Gå ud på Operaens tag (gratis, spektakulær udsigt), kig forbi Munch-museet og Astrup Fearnley (hvis der er tid). Alt indenfor gåafstand af havnen.',
        tags: ['sol']
      },
      {
        time: '15:30',
        title: 'Videre mod Arendal',
        desc: 'E18 sydpå langs kysten. Ca. 3,5 time. Overvej et hurtigt stop ved Tvedestrand eller Kragerø hvis I har tid — begge er små hvide skærgårdsbyer værd at kigge på.',
        tags: ['bilkørsel']
      },
      {
        time: '19:00',
        title: 'Ankomst Clarion Hotel Tyholmen',
        desc: 'Teaterplassen 2. Parker i Tyholmen P-hus lige overfor (~150 m). Tjek ind, læg tasker på værelserne.'
      },
      {
        time: '20:00',
        title: 'Aftensmad',
        desc: 'Hotellets restaurant Kokken &amp; Kunsten har god mad med havudsigt. Alternativt en tur ned til Pollen — der er 5–6 restauranter på række med udeserveringen ud over vandet.',
        tags: ['aftensmad']
      },
      {
        time: '21:30',
        title: 'Gåtur i Tyholmen (valgfrit)',
        desc: 'Slentre gennem Norges bedst bevarede træbybydel — de gule og hvide huse fra 1700-tallet lige uden for hotellet. Perfekt afterdinner-tur, når solen står lavt.'
      }
    ]
  },

  {
    date: '2026-07-21',
    weekday: 'Tir', day: '21', month: 'juli',
    title: 'En dag i Arendal',
    subtitle: 'Fløyheia, Merdø, badning og sightseeing i den gamle bydel.',
    activities: [
      {
        time: '08:30',
        title: 'Morgenmad på hotellet',
        desc: 'Clarion har fin buffet. Sæt jer ude hvis vejret er med jer.'
      },
      {
        time: '10:00',
        title: 'Fløyheia — glaselevatoren',
        desc: 'Gratis glaselevator gemt inde i klippen bag biblioteket, som fører op til udsigtspunktet over hele byen og skærgården. Kort tur, stort billede-øjeblik.',
        tags: ['sol', 'gåtur']
      },
      {
        time: '11:00',
        title: 'Klöckers Hus &amp; Tyholmen',
        desc: 'Lille bymuseum med bl.a. Guinness-rekorden i skibe-i-flasker (40 kr). Gå bagefter en runde i den gamle bydel — de smalle brostensgader og skibsredergårdene.',
        tags: ['museum']
      },
      {
        time: '12:30',
        title: 'Frokost ved Pollen',
        desc: 'Hurtig frokost ved havnen — pizza, fish &amp; chips eller nordisk bistro. Godt at være mæt inden bådturen.',
        tags: ['frokost']
      },
      {
        time: '13:30',
        title: 'Bådtur til Merdø',
        desc: 'Skærgårdsbåden går fra Pollen (~20 min ude). Bilfri ø med hvide huse, badebugter, sti hele vejen rundt og en lille café. Perfekt for drengene at bade.',
        tags: ['sol', 'badning']
      },
      {
        time: '16:30',
        title: 'Tilbage til byen — badning',
        desc: 'Enten Løkholmen (byens nye badeanlæg med sand, vippetårn, brusere — 2,5 km øst) eller direkte tilbage og hvil på hotellet.',
        tags: ['badning']
      },
      {
        time: '19:00',
        title: 'Aftensmad',
        desc: 'Prøv Kastellet eller Blom Restaurant &amp; Bar for en pænere aften — begge har havudsigt. For noget mere afslappet: fish &amp; chips på Kanalplassen.',
        tags: ['aftensmad']
      },
      {
        time: '21:00',
        title: '(Voksen-option) Fløyheia i solnedgang',
        desc: 'Elevatoren er åben til kl. 22. Perfekt lille tur uden børnene — udsigten er magisk når solen står lavt. Byen ligger som en juvel under jer.',
        tags: ['sol', 'voksne']
      }
    ]
  },

  {
    date: '2026-07-22',
    weekday: 'Ons', day: '22', month: 'juli',
    title: 'Arendal → Sinnes',
    subtitle: 'Kystvejen vestpå med stop undervejs. Ankomst Sirdal ved 16-tiden.',
    activities: [
      {
        time: '08:30',
        title: 'Morgenmad &amp; tjek ud',
        desc: 'Sidste morgenmad på Clarion. Tjek ud senest kl. 11 — men vi kan roligt komme afsted lidt før.'
      },
      {
        time: '09:30',
        title: 'Afgang mod Sinnes',
        desc: 'Ca. 3,5 times kørsel direkte, men vi tager det med ro og har tid til to-tre stop undervejs.',
        tags: ['bilkørsel']
      },
      {
        time: '11:00',
        title: 'Stop: Kristiansand — Nupenparken',
        desc: 'Kort stop midtvejs. Nupenparken ligger nede ved havnen med skulpturer, cherry blossoms og udsigt over havet. Ben strækkes, drengene løber lidt.',
        tags: ['gåtur']
      },
      {
        time: '12:30',
        title: 'Frokost i Mandal',
        desc: 'En lille perle — Norges sydligste rigtige by. Frokost i gamlebyen eller ved Risøbank (gammelt drivhus, café, tæt på stranden). Kort omvej på 20 min fra hovedvejen.',
        tags: ['frokost']
      },
      {
        time: '14:00',
        title: 'Stop: Lindesnes Fyr (kort visit)',
        desc: 'Norges sydligste punkt. Vi behøver ikke gå den lange klippetur — bare hurtigt op til fyret, kigge ud over havet, tage billeder. 20 min omvej fra hovedvejen.',
        tags: ['sol', 'sightseeing']
      },
      {
        time: '15:00',
        title: 'Sidste stræk mod Sirdal',
        desc: 'Op gennem Farsund/Flekkefjord-området og ind i Sirdal. Landskabet skifter fra kyst til fjeld — hold øje med de første renser.',
        tags: ['bilkørsel']
      },
      {
        time: '16:00',
        title: 'Ankomst Sirdal Mountain Lodge',
        desc: 'Vi mødes med de andre familier. Check-in fra kl. 15, så vi er på tid. Velkomstsmørrebrød og krammere.',
        tags: ['ankomst']
      }
    ]
  }
];


window.ATTRACTIONS = [
  {
    name: 'Tyholmen — gamle bydel',
    art: 'street',
    diff: 'easy',
    diffLabel: 'Gåtur',
    desc: 'Norges bedst bevarede træbybydel lige uden for hotellet. Smalle brostensgader, skibsredergårde og 1700-tallets træhuse. En times slentretur.',
    meta: [['🚶', 'Fra hotel: 0 m'], ['⏱', '30–60 min'], ['🎯', 'Alle aldre']],
    link: 'https://www.visitsorlandet.com/arendal/'
  },
  {
    name: 'Fløyheia — glaselevatoren',
    art: 'city',
    diff: 'easy',
    diffLabel: 'Nemt',
    desc: 'Gratis glaselevator gemt bag biblioteket, som fører op til byens bedste udsigtspunkt. Åben 06–22.',
    meta: [['🚶', 'Fra hotel: 350 m'], ['⏱', '20 min'], ['💰', 'Gratis']],
    link: 'https://www.visitnorway.no/reisemal/sorlandet/arendal/listings-arendal/glassheisen-til-panoramautsikt-p%C3%A5-fl%C3%B8yheia-i-arendal/216606/'
  },
  {
    name: 'Merdø',
    art: 'fjord',
    diff: 'easy',
    diffLabel: 'Familie',
    desc: 'Lille bilfri skærgårdsø med badebugter, hvide skibsredergårde, gåsti hele vejen rundt og en lille café. Skærgårdsbåden går fra Pollen — ca. 20 min sejlads.',
    meta: [['⛴', 'Bådtur ~20 min'], ['⏱', 'Halv dag'], ['🏖', 'Badning']],
    link: 'https://www.visitsorlandet.com/arendal/merdo/'
  },
  {
    name: 'Klöckers Hus',
    art: 'museum',
    diff: 'easy',
    diffLabel: 'Museum',
    desc: 'Lille bymuseum midt på Tyholmen med bl.a. Guinness-rekorden i skibe-i-flasker. Sjovt kortvarigt besøg. Kun åbent tir/tors/fre/lør.',
    meta: [['🚶', 'Fra hotel: 100 m'], ['💰', '40 NOK'], ['⏱', '30–45 min']],
    link: 'https://www.klockershus.com/'
  },
  {
    name: 'Sandvigen Fort',
    art: 'rock',
    diff: 'medium',
    diffLabel: 'Vandring',
    desc: 'Tysk 2. verdenskrigs-fæstningsanlæg på Hisøy med storslået udsigt over skærgården. Frit tilgængeligt hele døgnet. Disc golf-bane på området.',
    meta: [['🚗', '10 min vestpå'], ['⏱', '1–2 timer'], ['💰', 'Gratis']],
    link: 'https://www.sandvigenfort.no/'
  },
  {
    name: 'KUBEN museum',
    art: 'museum',
    diff: 'easy',
    diffLabel: 'Museum',
    desc: 'Regionens store kulturhistoriske museum. Udstillinger om Arendals bankkrak i 1886 og Sørlandets rolle i slavehandelen. Fin café med indre gårdhave.',
    meta: [['🚶', 'Fra hotel: 1,5 km'], ['⏱', '1–2 timer'], ['🎫', 'Billet']],
    link: 'http://www.kubenarendal.no/'
  },
  {
    name: 'Rådhuset på Tyholmen',
    art: 'street',
    diff: 'easy',
    diffLabel: 'Se udefra',
    desc: 'Nordens største bevarede trærådhus fra 1815. Ligger 200 meter fra hotellet — smukt at kigge på både i dagslys og med aftenlys.',
    meta: [['🚶', 'Fra hotel: 200 m'], ['⏱', '10 min']],
    link: 'https://www.visitsorlandet.com/arendal/'
  }
];


window.PARKING = [
  {
    name: 'Tyholmen P-hus',
    badge: 'T',
    recommended: true,
    desc: '~150 m fra hotellet — bogstaveligt talt lige over vejen. Førstevalget hvis I bor på Clarion. Nummerpladelæsning, betaling ved udkørsel.',
    link: 'https://www.google.com/maps/search/?api=1&query=Tyholmen+P-hus+Arendal'
  },
  {
    name: 'Pollen P-hus',
    badge: 'P',
    recommended: false,
    desc: 'Sprænget ind i klippen ved Pollen-bassinet. Automatisk nummerpladeregistrering. God hvis I skal ind i selve bykernen omkring Pollen.',
    link: 'https://www.google.com/maps/search/?api=1&query=Pollen+P-hus+Arendal'
  },
  {
    name: 'P-hus Vest (under Alti)',
    badge: 'V',
    recommended: false,
    desc: 'Under Alti-centret. Stort, sjældent fyldt, godt hvis I skal handle. Ca. 400 m til hotellet.',
    link: 'https://www.google.com/maps/search/?api=1&query=P-hus+Vest+Alti+Arendal'
  },
  {
    name: 'Torvet P-hus',
    badge: 'To',
    recommended: false,
    desc: 'Bedst hvis I skal op til torvet og den øvre bydel. Lidt længere fra hotellet.',
    link: 'https://www.google.com/maps/search/?api=1&query=Torvet+p-hus+Arendal'
  }
];


window.BEACHES = [
  {
    name: 'Løkholmen',
    distance: '~2,5 km',
    type: 'Byens badeanlæg',
    desc: 'Nyt badeanlæg med skalsand, vippetårn, brusere, toiletter og stor P-plads. Familievenligt, lavvandet i den ene ende. Bedste bud tæt på hotellet.',
    link: 'https://www.google.com/maps/search/?api=1&query=L%C3%B8kholmen+Arendal'
  },
  {
    name: 'Stølsviga',
    distance: '~4 km',
    type: 'Saltvand · Hisøy',
    desc: 'Roligt friluftsområde med saltvand, beachvolley og toiletter. Godt hvis Løkholmen er fyldt.',
    link: 'https://www.google.com/maps/search/?api=1&query=St%C3%B8lsviga+friluftsomr%C3%A5de+Arendal'
  },
  {
    name: 'Sørsvannet',
    distance: '~7 km',
    type: 'Ferskvand · lokalfavorit',
    desc: 'Skjult skovsø vest for byen med klippespring, sandbund og typisk varmere vand end havet. Lokalbefolkningens favorit.',
    link: 'https://www.google.com/maps/search/?api=1&query=S%C3%B8rsvannet+Arendal'
  },
  {
    name: 'Storesand (Fevik)',
    distance: '~13 km',
    type: 'Sandstrand · dagstur',
    desc: 'Regionens fineste sandstrand med krystalklart vand og familievibe. Værd at køre efter på en varm dag. Isbåden med Hennig-Olsen kommer forbi.',
    link: 'https://www.google.com/maps/search/?api=1&query=Storesand+Fevik+Arendal'
  }
];


window.CREW = [
  { name: 'Lars', role: 'Chaufføren', icon: 'ci-lars', initial: 'L' },
  { name: 'Mette', role: 'Rutekoordinator', icon: 'ci-mette', initial: 'M' },
  { name: 'Carl', role: 'Storebror', icon: 'ci-carl', initial: 'C' },
  { name: 'Frederik', role: 'Mellembror', icon: 'ci-frederik', initial: 'F' },
  { name: 'William', role: 'Lillebror', icon: 'ci-william', initial: 'W' }
];
