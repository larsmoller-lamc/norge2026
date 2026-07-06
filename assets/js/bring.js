/* =====================================================================
   bring.js — interaktiv medbring-liste (til/fra pr. familie, filtrering,
   sortering, samlet liste) + frie "fælles ting".
   Bruger window.Store til at gemme/dele data.
   ===================================================================== */
(function () {
  var $ = function (s) { return document.querySelector(s); };
  var el = function (t, c, h) { var e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; };

  var FAMS = window.FAMILIES;                       // [{code, name, initial, icon}]
  var FAM_BY_CODE = {}; FAMS.forEach(function (f) { FAM_BY_CODE[f.code] = f; });
  var CODES = FAMS.map(function (f) { return f.code; }); // ['LA','GC','CM','ML']

  var filter = { cat: 'Alle', fam: 'Alle', sort: 'Kategori', q: '', hideDone: false };
  var customFam = '';   // valgt familie i "tilføj"-formular ('' = Fælles)
  var newItemCat = 'Diverse';  // valgt kategori i "tilføj ny ting"-formular

  function esc(s) { return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  /* ---------- SYNC BADGE ---------- */
  function renderSyncBadge(mode) {
    var b = $('#syncBadge'); if (!b) return;
    if (mode === 'firebase') {
      b.className = 'sync-badge firebase';
      b.innerHTML = '<span class="sync-dot"></span> Delt live med hele familien';
    } else {
      b.className = 'sync-badge local';
      b.innerHTML = '<span class="sync-dot"></span> Gemmes kun på denne enhed — se “Del listen” nederst';
    }
  }

  /* ---------- SUMMARY ---------- */
  function renderSummary(state) {
    var box = $('#bringSummary'); if (!box) return;
    var counts = {}; CODES.forEach(function (c) { counts[c] = 0; });
    Store.bringItems().forEach(function (it) {
      var e = state.bring[it.id] || {};
      CODES.forEach(function (c) { if (e[c]) counts[c]++; });
    });
    box.innerHTML = FAMS.map(function (f) {
      return '<div class="bring-summary-cell">'
        + '<div class="bring-summary-icon ' + f.icon + '">' + f.initial + '</div>'
        + '<div class="bring-summary-info"><div class="bring-summary-count">' + counts[f.code] + '</div>'
        + '<div class="bring-summary-label">' + f.name + '</div></div></div>';
    }).join('');
  }

  /* ---------- CONTROLS ---------- */
  function buildControls() {
    var wrap = $('#bringControls'); if (!wrap || wrap.dataset.built) return;
    wrap.dataset.built = '1';

    /* --- Tilføj ny ting --- */
    var addWrap = el('div', 'bring-add');

    var addLabel = el('div', 'bring-add-label', 'Mangler der noget på listen? Tilføj det her:');
    addWrap.appendChild(addLabel);

    var addRow = el('div', 'bring-add-row');
    var addInput = el('input', 'bring-add-input');
    addInput.type = 'text';
    addInput.placeholder = 'Fx “Solcreme”, “Termokande”, “Grillspyd”…';
    addRow.appendChild(addInput);
    addWrap.appendChild(addRow);

    var catPicker = el('div', 'bring-add-cats');
    window.BRING_CATEGORIES.forEach(function (c) {
      var b = el('button', 'bring-add-cat' + (c === newItemCat ? ' on' : ''), c);
      b.type = 'button';
      b.onclick = function () {
        newItemCat = c;
        catPicker.querySelectorAll('.bring-add-cat').forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on');
      };
      catPicker.appendChild(b);
    });

    var addBtn = el('button', 'btn btn-primary bring-add-btn', '+ Tilføj');
    addBtn.type = 'button';
    addBtn.onclick = function () {
      var v = addInput.value.trim();
      if (!v) { addInput.focus(); return; }
      Store.addBringItem(v, newItemCat);
      addInput.value = '';
      addInput.focus();
    };
    addInput.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter') { ev.preventDefault(); addBtn.click(); }
    });

    var addControls = el('div', 'bring-add-controls');
    addControls.appendChild(catPicker);
    addControls.appendChild(addBtn);
    addWrap.appendChild(addControls);

    wrap.appendChild(addWrap);

    /* --- Søgning --- */
    var search = el('input', 'bring-search');
    search.type = 'search'; search.placeholder = '🔍 Søg efter en ting…';
    search.oninput = function () { filter.q = this.value.toLowerCase(); renderList(Store.getState()); };
    wrap.appendChild(search);

    // kategori-chips
    var catRow = el('div', 'bring-filter-row');
    ['Alle'].concat(window.BRING_CATEGORIES).forEach(function (c) {
      var chip = el('button', 'chip' + (c === filter.cat ? ' active' : ''), c);
      chip.onclick = function () {
        filter.cat = c;
        catRow.querySelectorAll('.chip').forEach(function (x) { x.classList.remove('active'); });
        chip.classList.add('active');
        renderList(Store.getState());
      };
      catRow.appendChild(chip);
    });
    wrap.appendChild(catRow);

    // familie-filter + sortering + skjul færdige
    var row2 = el('div', 'bring-filter-row');

    var famSel = el('select', 'bring-select');
    famSel.innerHTML = '<option value="Alle">👪 Alle familier</option>'
      + FAMS.map(function (f) { return '<option value="' + f.code + '">' + f.name + '</option>'; }).join('')
      + '<option value="none">⚠️ Ikke tildelt endnu</option>';
    famSel.onchange = function () { filter.fam = this.value; renderList(Store.getState()); };
    row2.appendChild(famSel);

    var sortSel = el('select', 'bring-select');
    sortSel.innerHTML = '<option value="Kategori">Sortér: Kategori</option>'
      + '<option value="Navn">Sortér: Navn (A–Å)</option>'
      + '<option value="Mangler">Sortér: Mangler ansvarlig først</option>';
    sortSel.onchange = function () { filter.sort = this.value; renderList(Store.getState()); };
    row2.appendChild(sortSel);

    var doneBtn = el('button', 'chip', 'Skjul klarede');
    doneBtn.onclick = function () { filter.hideDone = !filter.hideDone; doneBtn.classList.toggle('active', filter.hideDone); renderList(Store.getState()); };
    row2.appendChild(doneBtn);

    wrap.appendChild(row2);
  }

  /* ---------- LIST ---------- */
  function matches(it, state) {
    var e = state.bring[it.id] || {};
    if (filter.cat !== 'Alle' && it.cat !== filter.cat) return false;
    if (filter.q && it.name.toLowerCase().indexOf(filter.q) === -1) return false;
    if (filter.hideDone && e.done) return false;
    if (filter.fam === 'none') {
      var any = CODES.some(function (c) { return e[c]; });
      if (any) return false;
    } else if (filter.fam !== 'Alle') {
      if (!e[filter.fam]) return false;
    }
    return true;
  }

  function itemRow(it, state) {
    var e = state.bring[it.id] || {};
    var row = el('div', 'bring-item' + (e.done ? ' done' : ''));
    var fams = CODES.map(function (c) {
      return '<button class="fam-toggle ' + c + (e[c] ? ' on ' + c : '') + '" data-item="' + it.id + '" data-fam="' + c + '" title="' + FAM_BY_CODE[c].name + '">' + FAM_BY_CODE[c].initial + '</button>';
    }).join('');
    var delBtn = it.userAdded
      ? '<button class="bring-item-del" data-del-item="' + it.id + '" title="Fjern ' + esc(it.name) + '">✕</button>'
      : '';
    var nameHtml = esc(it.name)
      + (it.userAdded ? ' <span class="bring-item-badge">tilføjet</span>' : '')
      + (it.note ? '<div class="bring-item-note">' + esc(it.note) + '</div>' : '');
    row.innerHTML = '<div class="bring-item-top">'
      + '<button class="bring-check' + (e.done ? ' on' : '') + '" data-done="' + it.id + '" title="Marker som klaret/købt"></button>'
      + '<div class="bring-item-name">' + nameHtml + '</div>'
      + '<div class="bring-fams">' + fams + '</div>'
      + delBtn
      + '</div>';
    return row;
  }

  function renderList(state) {
    var box = $('#bringList'); if (!box) return;
    box.innerHTML = '';

    var items = Store.bringItems().filter(function (it) { return matches(it, state); });

    if (!items.length) {
      box.appendChild(el('div', 'bring-empty', 'Ingen ting matcher filteret 🤷'));
      wireList();
      return;
    }

    if (filter.sort === 'Kategori') {
      window.BRING_CATEGORIES.forEach(function (cat) {
        var inCat = items.filter(function (it) { return it.cat === cat; });
        if (!inCat.length) return;
        var group = el('div', 'bring-catgroup');
        group.appendChild(el('div', 'bring-catgroup-title', cat + ' <span class="cnt">' + inCat.length + '</span>'));
        inCat.forEach(function (it) { group.appendChild(itemRow(it, state)); });
        box.appendChild(group);
      });
    } else {
      var sorted = items.slice();
      if (filter.sort === 'Navn') {
        sorted.sort(function (a, b) { return a.name.localeCompare(b.name, 'da'); });
      } else if (filter.sort === 'Mangler') {
        var unassigned = function (it) { var e = state.bring[it.id] || {}; return CODES.some(function (c) { return e[c]; }) ? 1 : 0; };
        sorted.sort(function (a, b) { return unassigned(a) - unassigned(b) || a.name.localeCompare(b.name, 'da'); });
      }
      var flat = el('div', 'bring-catgroup');
      sorted.forEach(function (it) { flat.appendChild(itemRow(it, state)); });
      box.appendChild(flat);
    }
    wireList();
  }

  function wireList() {
    document.querySelectorAll('.fam-toggle[data-item]').forEach(function (btn) {
      btn.onclick = function () { Store.toggleBring(btn.dataset.item, btn.dataset.fam); };
    });
    document.querySelectorAll('.bring-check[data-done]').forEach(function (btn) {
      btn.onclick = function () { Store.toggleDone(btn.dataset.done); };
    });
    document.querySelectorAll('.bring-item-del[data-del-item]').forEach(function (btn) {
      btn.onclick = function () {
        if (confirm('Fjern denne ting fra listen?')) {
          Store.removeBringItem(btn.dataset.delItem);
        }
      };
    });
  }

  /* Legend er fjernet — familie-cirklerne har allerede initialer + tooltip. */
  function buildLegend() { /* no-op */ }

  /* ---------- TOOLS (del / eksport / print) ---------- */
  function buildTools() {
    var t = $('#bringTools'); if (!t || t.dataset.built) return;
    t.dataset.built = '1';

    var copyBtn = el('button', 'btn btn-primary', '📋 Kopiér samlet liste');
    copyBtn.onclick = function () { copyList(Store.getState()); };

    var exportBtn = el('button', 'btn btn-ghost', '⬇️ Gem backup (.json)');
    exportBtn.onclick = function () {
      var blob = new Blob([Store.exportJSON()], { type: 'application/json' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'sirdal-liste.json';
      a.click();
    };

    var importInput = el('input'); importInput.type = 'file'; importInput.accept = '.json'; importInput.style.display = 'none';
    importInput.onchange = function () {
      var file = this.files[0]; if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        if (Store.importJSON(reader.result)) { alert('Listen er indlæst ✔'); }
        else { alert('Kunne ikke læse filen 😕'); }
      };
      reader.readAsText(file);
    };
    var importBtn = el('button', 'btn btn-ghost', '⬆️ Indlæs backup');
    importBtn.onclick = function () { importInput.click(); };

    var printBtn = el('button', 'btn btn-ghost', '🖨️ Print / gem PDF');
    printBtn.onclick = function () { window.print(); };

    t.appendChild(copyBtn); t.appendChild(exportBtn); t.appendChild(importBtn); t.appendChild(importInput); t.appendChild(printBtn);
  }

  function copyList(state) {
    var lines = ['MEDBRING — Sirdal 2026', ''];
    window.BRING_CATEGORIES.forEach(function (cat) {
      var inCat = Store.bringItems().filter(function (it) { return it.cat === cat; });
      lines.push('== ' + cat + ' ==');
      inCat.forEach(function (it) {
        var e = state.bring[it.id] || {};
        var who = CODES.filter(function (c) { return e[c]; }).map(function (c) { return FAM_BY_CODE[c].name.split(' & ')[0][0] + FAM_BY_CODE[c].name.split(' & ')[1][0]; });
        var tag = who.length ? ' [' + who.join(', ') + ']' : ' [ mangler ]';
        lines.push('- ' + it.name + tag + (e.done ? ' ✔' : ''));
      });
      lines.push('');
    });
    // fælles ting
    lines.push('== FÆLLES TING ==');
    Store.customList().forEach(function (c) {
      var fam = c.family ? ' (' + (FAM_BY_CODE[c.family] ? FAM_BY_CODE[c.family].name.split(' & ')[0] : c.family) + ')' : ' (fælles)';
      lines.push('- ' + c.name + fam);
    });
    var text = lines.join('\n');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { alert('Samlet liste kopieret — klar til at indsætte i familiechatten 📋'); },
        function () { fallbackCopy(text); });
    } else { fallbackCopy(text); }
  }
  function fallbackCopy(text) {
    var ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); alert('Samlet liste kopieret 📋'); } catch (e) { prompt('Kopiér listen manuelt:', text); }
    document.body.removeChild(ta);
  }

  /* ---------- CUSTOM (fælles ting) ---------- */
  function buildCustomAdd() {
    var wrap = $('#customAdd'); if (!wrap || wrap.dataset.built) return;
    wrap.dataset.built = '1';

    var row = el('div', 'custom-add-row');
    var name = el('input', 'custom-input name'); name.type = 'text'; name.placeholder = 'Fx “Bluetooth-højttaler”, “Snittekniv”, “Kortspil”…';
    row.appendChild(name);

    var picker = el('div', 'custom-fam-picker');
    var opts = [{ code: '', label: 'Fælles', icon: '' }].concat(FAMS.map(function (f) { return { code: f.code, label: f.name.split(' & ')[0], icon: f.code }; }));
    opts.forEach(function (o) {
      var b = el('button', 'custom-fam-opt' + (o.code === customFam ? ' on ' + o.code : ''), o.label);
      b.type = 'button';
      b.onclick = function () {
        customFam = o.code;
        picker.querySelectorAll('.custom-fam-opt').forEach(function (x) { x.className = 'custom-fam-opt'; });
        b.className = 'custom-fam-opt on ' + o.code;
      };
      picker.appendChild(b);
    });

    var addBtn = el('button', 'btn btn-primary', '+ Tilføj');
    addBtn.type = 'button';
    addBtn.onclick = function () {
      var v = name.value.trim(); if (!v) { name.focus(); return; }
      Store.addCustom({ name: v, family: customFam, note: '' });
      name.value = '';
    };
    name.addEventListener('keydown', function (ev) { if (ev.key === 'Enter') { ev.preventDefault(); addBtn.click(); } });

    var controls = el('div', 'custom-add-controls');
    controls.appendChild(picker);
    controls.appendChild(addBtn);
    wrap.appendChild(row);
    wrap.appendChild(controls);
  }

  function renderCustom(state) {
    var box = $('#customGroups'); if (!box) return;
    box.innerHTML = '';
    var list = Store.customList();
    var groups = [{ code: '', name: 'Fælles', icon: '', initial: '★' }].concat(FAMS.map(function (f) {
      return { code: f.code, name: f.name, icon: f.icon, initial: f.initial };
    }));
    groups.forEach(function (g) {
      var items = list.filter(function (c) { return (c.family || '') === g.code; });
      var group = el('div', 'custom-group');
      var head = el('div', 'custom-group-head');
      head.innerHTML = '<div class="custom-group-icon ' + (g.icon || '') + '" style="' + (g.code ? '' : 'background:var(--gold)') + '">' + g.initial + '</div>'
        + '<div class="custom-group-name">' + g.name + '</div>';
      group.appendChild(head);
      var listEl = el('div', 'custom-list');
      if (!items.length) {
        listEl.appendChild(el('div', 'custom-empty', 'Ingen ting endnu — tilføj ovenfor.'));
      } else {
        items.forEach(function (c) {
          var it = el('div', 'custom-item');
          it.innerHTML = '<div class="custom-item-name">' + esc(c.name) + '</div>'
            + '<button class="custom-item-del" data-del="' + c.id + '" title="Fjern">✕</button>';
          listEl.appendChild(it);
        });
      }
      group.appendChild(listEl);
      box.appendChild(group);
    });
    box.querySelectorAll('.custom-item-del[data-del]').forEach(function (btn) {
      btn.onclick = function () { Store.removeCustom(btn.dataset.del); };
    });
  }

  /* ---------- WIRE-UP ---------- */
  function renderAll(state, mode) {
    renderSyncBadge(mode);
    renderSummary(state);
    renderList(state);
    renderCustom(state);
  }

  document.addEventListener('DOMContentLoaded', function () {
    buildControls(); buildLegend(); buildTools(); buildCustomAdd();

    Store.subscribe(function (state, mode) { renderAll(state, mode); });

    Store.init().then(function (mode) {
      renderAll(Store.getState(), mode);
    });
  });
})();
