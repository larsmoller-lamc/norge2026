/* =====================================================================
   store.js — delt tilstand for medbring-liste og fælles ting.
   Bruger Firebase hvis det er sat op i config.js, ellers localStorage.
   ===================================================================== */
(function () {
  var LS_KEY = 'sirdal2026_state_v1';
  var listeners = [];
  var state = { bring: {}, custom: {}, meta: {} };
  var mode = 'local';
  var fbRef = null;
  var applyingRemote = false;

  function emit() { listeners.forEach(function (fn) { fn(state, mode); }); }

  /* Firebase gemmer et JS-array som objekt og fjerner tomme pladser.
     Vi bruger derfor et OBJEKT for custom (id -> item), og eksponerer
     en array-udgave via customList() til UI'et. */
  function customList() {
    var arr = [];
    for (var k in state.custom) if (state.custom.hasOwnProperty(k)) arr.push(state.custom[k]);
    arr.sort(function (a, b) { return (a.id || '').localeCompare(b.id || ''); });
    return arr;
  }

  function loadLocal() {
    try {
      var raw = localStorage.getItem(LS_KEY);
      var s = raw ? JSON.parse(raw) : {};
      state = { bring: s.bring || {}, custom: s.custom || {}, meta: s.meta || {} };
      if (Array.isArray(state.custom)) {
        var obj = {}; state.custom.forEach(function (c) { if (c && c.id) obj[c.id] = c; });
        state.custom = obj;
      }
    } catch (e) { state = { bring: {}, custom: {}, meta: {} }; }
  }
  function saveLocal() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) {}
  }

  function loadScript(src) {
    return new Promise(function (res, rej) {
      var s = document.createElement('script');
      s.src = src; s.async = true;
      s.onload = res; s.onerror = function () { rej(new Error('kunne ikke hente ' + src)); };
      document.head.appendChild(s);
    });
  }

  function validFbConfig(cfg) {
    return cfg && cfg.apiKey && cfg.databaseURL && cfg.projectId;
  }

  function initFirebase(cfg) {
    return loadScript('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js')
      .then(function () { return loadScript('https://www.gstatic.com/firebasejs/10.12.2/firebase-database-compat.js'); })
      .then(function () {
        firebase.initializeApp(cfg);
        fbRef = firebase.database().ref('sirdal2026');
        mode = 'firebase';
        fbRef.on('value', function (snap) {
          var val = snap.val() || {};
          applyingRemote = true;
          var c = val.custom || {};
          if (Array.isArray(c)) { var obj = {}; c.forEach(function (x) { if (x && x.id) obj[x.id] = x; }); c = obj; }
          state = { bring: val.bring || {}, custom: c, meta: val.meta || {} };
          applyingRemote = false;
          emit();
        });
      });
  }

  /* Delvis skrivning — undgår at overskrive hele state. */
  function updatePath(path, value) {
    if (mode === 'firebase' && fbRef) {
      if (applyingRemote) return;
      fbRef.child(path).set(value);
    } else {
      var parts = path.split('/'); var obj = state;
      for (var i = 0; i < parts.length - 1; i++) {
        if (!obj[parts[i]]) obj[parts[i]] = {};
        obj = obj[parts[i]];
      }
      obj[parts[parts.length - 1]] = value;
      saveLocal();
      emit();
    }
  }
  function removePath(path) {
    if (mode === 'firebase' && fbRef) {
      if (applyingRemote) return;
      fbRef.child(path).remove();
    } else {
      var parts = path.split('/'); var obj = state;
      for (var i = 0; i < parts.length - 1; i++) { if (!obj[parts[i]]) return; obj = obj[parts[i]]; }
      delete obj[parts[parts.length - 1]];
      saveLocal();
      emit();
    }
  }

  var Store = {
    init: function () {
      loadLocal();
      emit();
      var cfg = window.APP_CONFIG && window.APP_CONFIG.firebase;
      if (validFbConfig(cfg)) {
        return initFirebase(cfg)
          .then(function () { return mode; })
          .catch(function (err) {
            console.warn('Firebase kunne ikke starte — bruger lokal lagring.', err);
            mode = 'local';
            return mode;
          });
      }
      return Promise.resolve(mode);
    },

    /* Der seedes IKKE længere automatisk. Standard-varer står i
       BRING_ITEMS (vises altid) og deres familie-markeringer gemmes
       kun, hvis nogen aktivt sætter et flueben. */

    getState: function () { return state; },
    getMode: function () { return mode; },
    customList: customList,
    subscribe: function (fn) { listeners.push(fn); return function () { listeners = listeners.filter(function (x) { return x !== fn; }); }; },

    getItem: function (id) { return state.bring[id] || { done: false }; },

    toggleBring: function (id, fam) {
      var e = state.bring[id] || { done: false };
      updatePath('bring/' + id + '/' + fam, !e[fam]);
    },
    toggleDone: function (id) {
      var e = state.bring[id] || { done: false };
      updatePath('bring/' + id + '/done', !e.done);
    },

    addCustom: function (item) {
      var id = 'c' + Date.now() + Math.floor(Math.random() * 1000);
      item.id = id;
      item.family = item.family || '';
      item.note = item.note || '';
      updatePath('custom/' + id, item);
    },
    updateCustom: function (id, patch) {
      var it = state.custom[id]; if (!it) return;
      var merged = {}; for (var k in it) merged[k] = it[k];
      for (var k2 in patch) merged[k2] = patch[k2];
      updatePath('custom/' + id, merged);
    },
    removeCustom: function (id) {
      removePath('custom/' + id);
    },

    exportJSON: function () { return JSON.stringify(state, null, 2); },
    importJSON: function (json) {
      try {
        var d = JSON.parse(json);
        var c = d.custom || {};
        if (Array.isArray(c)) { var obj = {}; c.forEach(function (x) { if (x && x.id) obj[x.id] = x; }); c = obj; }
        state = { bring: d.bring || {}, custom: c, meta: d.meta || {} };
        if (mode === 'firebase' && fbRef) { fbRef.set(state); } else { saveLocal(); emit(); }
        return true;
      } catch (e) { return false; }
    },
    resetAll: function () {
      state = { bring: {}, custom: {}, meta: {} };
      if (mode === 'firebase' && fbRef) { fbRef.set(state); } else { saveLocal(); emit(); }
    }
  };

  window.Store = Store;
})();
