/* =====================================================================
   config.js — indstillinger I selv kan ændre
   ===================================================================== */

window.APP_CONFIG = {

  /* Hyttens placering — bruges til vejr-prognosen (Open-Meteo/YR-data).
     Standard er Sinnes/Sirdal. Ret hvis I vil have et andet punkt. */
  location: {
    name: 'Sinnes, Sirdal',
    lat: 58.906,
    lon: 6.850
  },

  /* Link til den fulde YR-side for stedet (vises som knap i vejr-sektionen). */
  yrUrl: 'https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/2-3138888/Norge/Rogaland/Sirdal/Sinnes',

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
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  }
};
