/* =====================================================================
   config.js — indstillinger I selv kan ændre
   ===================================================================== */

window.APP_CONFIG = {

  /* Hyttens placering — bruges til vejr-prognosen (Open-Meteo/YR-data).
     Standard er Sinnes/Sirdal. Ret hvis I vil have et andet punkt. */
  location: {
    name: 'Sinnes, Sirdal',
    lat: 58.9297,
    lon: 6.7407
  },

  /* Link til den fulde YR-side for stedet (vises som knap i vejr-sektionen).  */
  yrUrl: 'https://www.yr.no/en/forecast/daily-table/1-17249/Norway/Agder/Sirdal/Sinnes',

  /* -------------------------------------------------------------------
     DELT LISTE (valgfrit, men anbefalet for hele familien)
     -------------------------------------------------------------------
     Uden Firebase gemmes "hvem tager hvad med" kun på DIN egen enhed.
     Vil I have, at alle 16 ser og redigerer den SAMME liste live, så
     opret et gratis Firebase-projekt og indsæt nøglerne herunder.
     Trin-for-trin guide står i README.md.

     Lad felterne stå tomme ("") hvis I ikke bruger Firebase — så virker
     siden helt fint lokalt på hver enhed. */
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
