/* =====================================================================
   STORE.js — datalag for pakkeliste og grej.

   To tilstande:
   1) LOKAL (standard): gemmer i browserens localStorage. Virker med det
      samme, men data deles IKKE mellem telefoner/personer.
   2) DELT (valgfri): hvis Firebase er sat op i config.js, synkroniseres
      alt i realtid mellem alle i familien.

   API (samme uanset tilstand):
     Store.init(onReady)
     Store.get(collection)                -> array
     Store.set(collection, array)         -> gemmer hele listen
     Store.subscribe(collection, cb)      -> kaldes ved ændringer
   collection er 'packing' eller 'gear'.
   ===================================================================== */

const Store = (function () {
  const LOCAL_KEYS = { packing: 'sirdal_packing_v1', gear: 'sirdal_gear_v1' };
  let mode = 'local';
  let db = null;
  const listeners = { packing: [], gear: [] };
  const cache = { packing: [], gear: [] };

  /* ---------- LOKAL ---------- */
  function localLoad(coll) {
    try {
      const raw = localStorage.getItem(LOCAL_KEYS[coll]);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }
  function localSave(coll, arr) {
    try { localStorage.setItem(LOCAL_KEYS[coll], JSON.stringify(arr)); } catch (e) {}
  }

  /* ---------- FIREBASE ---------- */
  function firebaseAvailable() {
    return typeof window !== 'undefined'
      && window.APP_CONFIG && window.APP_CONFIG.firebase
      && typeof firebase !== 'undefined';
  }

  function initFirebase() {
    firebase.initializeApp(window.APP_CONFIG.firebase);
    db = firebase.database();
    mode = 'shared';
    ['packing', 'gear'].forEach(function (coll) {
      db.ref(coll).on('value', function (snap) {
        const val = snap.val();
        cache[coll] = Array.isArray(val) ? val : (val ? Object.values(val) : []);
        listeners[coll].forEach(function (cb) { cb(cache[coll]); });
      });
    });
  }

  /* ---------- PUBLIC ---------- */
  function init(onReady) {
    // Seed defaults into cache
    cache.packing = localLoad('packing') || seedPacking();
    cache.gear = localLoad('gear') || seedGear();

    if (firebaseAvailable()) {
      try {
        initFirebase();
        // Hvis den delte database er tom, skub seed derop én gang
        db.ref('packing').once('value').then(function (snap) {
          if (!snap.exists()) db.ref('packing').set(cache.packing);
        });
        db.ref('gear').once('value').then(function (snap) {
          if (!snap.exists()) db.ref('gear').set(cache.gear);
        });
      } catch (e) {
        console.warn('Firebase-init fejlede, bruger lokal lagring:', e);
        mode = 'local';
      }
    }
    if (onReady) onReady(mode);
  }

  function seedPacking() {
    return PACKING_SEED.map(function (it, i) {
      return { id: 'p' + i + '_' + Date.now().toString(36), cat: it.cat, name: it.name, qty: it.qty || '', assigned: it.assigned.slice(), note: it.note || '', done: false };
    });
  }
  function seedGear() {
    return GEAR_SEED.map(function (it, i) {
      return { id: 'g' + i + '_' + Date.now().toString(36), name: it.name, by: it.by || '', note: it.note || '', done: false };
    });
  }

  function get(coll) { return cache[coll].slice(); }

  function set(coll, arr) {
    cache[coll] = arr;
    if (mode === 'shared' && db) {
      db.ref(coll).set(arr);       // udløser 'value' som opdaterer alle
    } else {
      localSave(coll, arr);
      listeners[coll].forEach(function (cb) { cb(arr); });
    }
  }

  function subscribe(coll, cb) {
    listeners[coll].push(cb);
    cb(cache[coll]);               // giv nuværende data med det samme
  }

  function getMode() { return mode; }

  return { init: init, get: get, set: set, subscribe: subscribe, getMode: getMode };
})();
