/* =====================================================================
   config.example.js — EKSEMPEL på en udfyldt konfiguration
   ---------------------------------------------------------------------
   Dette er KUN et eksempel, der viser, hvordan felterne ser ud, når
   Firebase er sat op (så alle 16 deler den SAMME liste live).

   Sådan bruger I den:
     1. Åbn jeres rigtige "config.js".
     2. Kopiér jeres egne Firebase-nøgler ind (fra Firebase-konsollen).
     3. Gem. Siden skifter automatisk fra "kun på min telefon"
        til "delt med hele familien".

   Lad felterne stå tomme i config.js, hvis I IKKE vil bruge Firebase —
   så gemmes listen bare lokalt på hver enhed, og alt virker fint.

   Guiden trin-for-trin står i README.md.
   ===================================================================== */

window.APP_CONFIG = {

  location: {
    name: 'Sinnes, Sirdal',
    lat: 58.906,
    lon: 6.850
  },

  yrUrl: 'https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/2-3138888/Norge/Rogaland/Sirdal/Sinnes',

  /* --- EKSEMPEL på udfyldte Firebase-nøgler (jeres egne ser anderledes ud) --- */
  firebase: {
    apiKey: "AIzaSyD-EKSEMPEL-erstat-med-jeres-egen-noegle",
    authDomain: "sirdal-2026.firebaseapp.com",
    databaseURL: "https://sirdal-2026-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "sirdal-2026",
    storageBucket: "sirdal-2026.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890"
  }
};
