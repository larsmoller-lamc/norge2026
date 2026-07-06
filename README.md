# Sirdal 2026 🏔

Familie-webapp til sommerferien i Norge — Sirdal Mountain Lodge, 22.–29. juli 2026.

Indeholder: forside med nedtælling, live vejr fra Sinnes, dag-for-dag program, madplan, "hvem tager hvad med"-liste, grej-sektion, attraktioner, holdet og praktisk info med kort.

---

## 1. Sådan lægger I det på GitHub Pages (gratis hjemmeside)

1. Opret en gratis konto på [github.com](https://github.com) hvis I ikke har en.
2. Klik **New repository**. Giv den fx navnet `sirdal-2026`. Sæt den til **Public**. Opret.
3. På repo-siden: **Add file → Upload files**. Træk **alle** filer og mapper fra denne pakke ind (husk `index.html`, hele `assets`-mappen, `config.js` og den skjulte `.nojekyll`). Klik **Commit changes**.
4. Gå til **Settings → Pages**.
5. Under *Build and deployment* → *Source*: vælg **Deploy from a branch**. Vælg branch **main** og mappe **/(root)**. Klik **Save**.
6. Vent 1–2 minutter. Siden ligger nu på:
   `https://DIT-BRUGERNAVN.github.io/sirdal-2026/`
7. Del linket med familien. Færdig 🎉

> Vil I have et pænere navn uden mappe (fx `https://ditnavn.github.io/`), så kald repo'et præcis `DIT-BRUGERNAVN.github.io`.

---

## 2. Vejret (YR / MET Norway)

Vejr-sektionen henter data automatisk — **ingen opsætning nødvendig.**

- Primær kilde er **MET Norway / YR** (`api.met.no`) — samme institut som yr.no.
- Hvis en browser blokerer YR, skifter appen automatisk til **Open-Meteo** (samme slags data, bygget til browsere). Man mærker det ikke.
- Der linkes altid til den fulde 10-døgns udsigt på **yr.no** for Sinnes.
- Koordinater og YR-link ligger i `assets/js/data.js` (feltet `TRIP`), hvis I vil justere stedet.

---

## 3. Delt liste med Firebase (valgfri, men anbefales)

**Uden opsætning:** pakkelisten og grej gemmes lokalt i hver telefon/computer. Det virker fint — men jeres ændringer ses **kun på jeres egen enhed**.

**Med Firebase:** alle 16 ser og redigerer den **samme** liste i realtid. Sådan slår I det til (gratis, ca. 5–10 min, én gang):

1. Gå til [console.firebase.google.com](https://console.firebase.google.com) og log ind med en Google-konto.
2. **Add project** → giv det et navn (fx `sirdal-2026`) → opret (Analytics kan slås fra).
3. I venstremenuen: **Build → Realtime Database → Create Database**.
   - Vælg lokation **Europe-west1** (Belgien).
   - Start i **test mode** (så alle kan læse/skrive). *Se note om sikkerhed nederst.*
4. Klik tandhjulet ⚙ → **Project settings** → scroll ned til **Your apps** → klik web-ikonet `</>`.
   - Giv app'en et navn, registrér. I får nu et **firebaseConfig**-objekt.
5. Åbn filen `config.js`, og erstat `firebase: null` med jeres værdier — brug `config.example.js` som skabelon. Sørg for at `databaseURL` er med (den ender på `...firebasedatabase.app`).
6. Upload den opdaterede `config.js` til GitHub igen. Genindlæs siden — der står nu **"🔗 Delt synk aktiv"** under overskriften på Medbring-sektionen.

**Sikkerhedsnote:** *test mode* gør databasen åben for alle, der kender linket. Til en privat familieliste er det oftest fint (ingen følsomme data). Vil I lukke den til, kan I i Realtime Database → **Rules** sætte en simpel regel, eller sætte en udløbsdato. Firebase-nøglerne i `config.js` er ikke hemmelige — de identificerer bare projektet.

---

## 4. Rediger indhold

Alt tekstindhold ligger i **`assets/js/data.js`**:

- `TRIP` — dato, adresse, koordinater, YR-link, kort-link
- `FAMILIES` / `FAMILY_MEMBERS` — de fire familier og deres medlemmer
- `DAYS` — dag-for-dag programmet
- `MEALS` — madplanen
- `ATTRACTIONS` — udflugtsmål
- `PACKING_SEED` — start-pakkelisten (transskriberet fra Excel)
- `PACKING_CATEGORIES` — kategorierne i pakkelisten
- `GEAR_SEED` — start-grej

> Bemærk: Pakkeliste og grej gemmes i databasen/lokalt efter første indlæsning. Ændrer I `PACKING_SEED` senere, slår det kun igennem for nye brugere (eller hvis databasen tømmes).

---

## Filstruktur

```
sirdal-2026/
├── index.html
├── config.js            ← delt synk til/fra (Firebase)
├── config.example.js    ← skabelon til config.js
├── .nojekyll            ← nødvendig for at GitHub Pages viser assets korrekt
├── README.md
└── assets/
    ├── css/styles.css
    ├── img/hytte.jpg
    └── js/
        ├── data.js       ← alt indhold redigeres her
        ├── store.js      ← lagring (lokal + Firebase)
        ├── weather.js    ← vejr (YR + Open-Meteo)
        ├── packing.js    ← "hvem tager hvad med"
        ├── gear.js       ← grej-sektion
        └── app.js        ← binder det hele sammen
```

Vejrdata: © MET Norway (YR) / Open-Meteo. Kort: Google Maps.
