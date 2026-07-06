/* =====================================================================
   CONFIG.js
   Som standard er delt synk SLÅET FRA — appen gemmer på hver enkelt enhed.

   Vil I have, at alle 16 kan se og redigere den SAMME liste i realtid,
   så følg opskriften i README.md ("Delt liste med Firebase") og indsæt
   jeres Firebase-nøgler i firebase-objektet nedenfor.
   ===================================================================== */

window.APP_CONFIG = {

  location: {
    name: 'Sinnes, Sirdal',
    lat: 58.906,
    lon: 6.850
  },

  yrUrl: 'https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/2-3138888/Norge/Rogaland/Sirdal/Sinnes',

  firebase: {
    apiKey: "AIzaSyCgbP4u08tBeNhjIW7HbNEh_WcQYexWxZ8",
    authDomain: "sirdal-2026.firebaseapp.com",
    databaseURL: "https://sirdal-2026-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "sirdal-2026",
    storageBucket: "sirdal-2026.firebasestorage.app",
    messagingSenderId: "969584723708",
    appId: "1:969584723708:web:54166b35ffe3595ed6b979"
  }
};
