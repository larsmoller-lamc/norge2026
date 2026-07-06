# Sirdal 2026 🏔️

Familie-webapp til turen til **Sirdal Mountain Lodge**, 22.–29. juli 2026.
Program, live vejr, madplan, "hvem tager hvad med"-liste og fælles ting – alt samlet ét sted, bygget til mobilen.

---

## 1. Læg siden på nettet (GitHub Pages)

Siden er lavet som helt almindelige filer og kan ligge gratis på GitHub Pages.

1. Opret en (gratis) konto på **github.com**, hvis du ikke har en.
2. Klik **New repository**. Giv den fx navnet `sirdal-2026`. Vælg **Public**. Klik **Create repository**.
3. På repo-siden: klik **Add file → Upload files**.
4. Træk **hele indholdet** af denne mappe ind (altså `index.html`, `config.js`, `.nojekyll` og hele `assets`-mappen). Vigtigt: læg filerne direkte i repoet – ikke inde i en undermappe.
5. Klik **Commit changes**.
6. Gå til **Settings → Pages** (i menuen til venstre).
7. Under **Build and deployment → Source** vælg **Deploy from a branch**.
8. Vælg branch **main** og mappe **/ (root)**. Klik **Save**.
9. Vent 1–2 minutter. Øverst på Pages-siden dukker adressen op, fx:
   `https://ditbrugernavn.github.io/sirdal-2026/`
10. Del linket med familien. Færdig! 🎉

> **Tip:** Filen `.nojekyll` skal med i uploadet. Den sikrer, at GitHub ikke roder med `assets`-mappen. Den er tom – det er meningen.

Vil I opdatere noget senere, uploader I bare den ændrede fil samme sted igen (**Add file → Upload files**).

---

## 2. Delt liste for hele familien (valgfrit, men anbefalet)

Som standard gemmes "hvem tager hvad med"-listen **kun på din egen telefon** (i browserens hukommelse). Det virker fint, men de andre ser ikke dine markeringer.

Vil I have, at **alle 16 ser og redigerer den samme liste live**, opsætter I en gratis Firebase-database. Det tager ca. 5 minutter og koster ingenting til vores brug.

1. Gå til **console.firebase.google.com** og log ind med en Google-konto.
2. Klik **Create a project** (eller "Tilføj projekt"). Giv det et navn, fx `sirdal-2026`. Du kan slå Google Analytics fra – det er ikke nødvendigt.
3. Når projektet er klar: i venstremenuen vælg **Build → Realtime Database**.
4. Klik **Create Database**. Vælg lokation **Europe** (fx `europe-west1`). Vælg **Start in test mode** (så alle i familien kan skrive – det er fint til vores brug). Klik **Enable**.
5. Gå nu til **Project settings** (tandhjulet øverst) **→ General**.
6. Rul ned til **Your apps** og klik web-ikonet **`</>`**. Giv appen et kaldenavn, fx `sirdal`. Klik **Register app**.
7. Du får nu vist en `firebaseConfig` med en række nøgler. Kopiér værdierne.
8. Åbn filen **`config.js`** i dette projekt og indsæt værdierne i `firebase`-afsnittet. Se `config.example.js` for, hvordan det ser ud udfyldt.
9. Gem, og upload den opdaterede `config.js` til GitHub igen.

Når `apiKey`, `databaseURL` og `projectId` er udfyldt, skifter siden automatisk over til delt tilstand. Øverst i medbring-sektionen står der så **"Delt liste – alle ser det samme"** i stedet for **"Kun på denne enhed"**.

> **Om test mode:** databasen står åben nogle uger og skal så "fornyes" i Firebase-konsollen. Da turen er overstået inden da, er det ikke noget problem. Vil I have den til at holde længere, kan I forlænge datoen under **Realtime Database → Rules**.

---

## 3. Vejret

Vejret hentes automatisk og opdateres, hver gang siden åbnes. Data kommer fra **MET Norway** (det er samme grundlag som YR bruger) via **Open-Meteo**, der er gratis og ikke kræver nogen nøgle eller opsætning – det virker bare.

Der er også en knap **"Se vejret på YR →"**, som åbner den fulde, detaljerede YR-side for Sinnes. Vil I skifte punktet, kan I rette `location` og `yrUrl` i `config.js`.

*Vejrdata leveret af MET Norway / Open-Meteo.*

---

## 4. Ret i indholdet

Næsten alt tekstindhold ligger samlet i **`assets/js/data.js`** – I kan roligt rette direkte i den:

- **`FAMILIES`** – de fire familier og deres medlemmer.
- **`DAYS`** – dagsprogrammet (én blok pr. dag med aktiviteter).
- **`MEALS`** – madplanen.
- **`ATTRACTIONS`** – ture og oplevelser.
- **`BRING_ITEMS`** – standardvarerne i medbring-listen (leverpostej, opvasketabs osv.).
- **`CUSTOM_SEED`** – de "fælles ting", der er skrevet på fra start.

Ret teksten mellem anførselstegnene, gem, og upload filen til GitHub igen. Undgå at fjerne kommaer og krøllede parenteser – ellers går siden i stå.

> **Bemærk:** ændrer I i `BRING_ITEMS`, gælder de nye standardvarer kun for enheder, der ikke allerede har hentet listen. Bruger I den delte Firebase-liste, kan I i stedet tilføje varer direkte i appen.

---

## Filoversigt

```
index.html            – selve siden
config.js             – jeres indstillinger (placering, YR-link, Firebase)
config.example.js     – eksempel på udfyldt Firebase-opsætning
.nojekyll             – teknisk fil til GitHub Pages (lad den være)
assets/
  css/styles.css      – alt design
  js/data.js          – indhold: familier, program, mad, varer …
  js/config? …        – (config ligger i roden)
  js/store.js         – gemmer data (lokalt eller delt via Firebase)
  js/weather.js       – henter vejret
  js/app.js           – bygger program, vejr, mad, familier, nedtælling
  js/bring.js         – medbring-listen og fælles ting
  img/hytte.jpg       – forsidebilledet
```

God tur til fjelds! 🇳🇴
