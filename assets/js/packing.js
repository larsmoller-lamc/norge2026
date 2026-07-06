/* =====================================================================
   PACKING.js — "Hvem tager hvad med" (indkøb + pakkeliste).
   Hver ting kan tildeles én eller flere familier (ML/GC/CM/LA).
   Understøtter søgning, filtrering, sortering og en samlet liste.
   ===================================================================== */

const Packing = (function () {
  let items = [];
  let ui = { search: '', cat: 'alle', fam: 'alle', status: 'alle', sort: 'kategori' };

  function famColor(code) {
    const f = FAMILIES.find(function (x) { return x.code === code; });
    return f ? 'var(' + f.colorVar + ')' : 'var(--moss)';
  }

  function save() { Store.set('packing', items); }

  function uid() { return 'p_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

  /* ---------- actions ---------- */
  function toggleFamily(id, code) {
    items = items.map(function (it) {
      if (it.id !== id) return it;
      const has = it.assigned.indexOf(code) !== -1;
      const assigned = has ? it.assigned.filter(function (c) { return c !== code; }) : it.assigned.concat([code]);
      return Object.assign({}, it, { assigned: assigned });
    });
    save();
  }
  function toggleDone(id) {
    items = items.map(function (it) { return it.id === id ? Object.assign({}, it, { done: !it.done }) : it; });
    save();
  }
  function remove(id) {
    items = items.filter(function (it) { return it.id !== id; });
    save();
  }
  function addItem(cat, name, qty, note) {
    if (!name.trim()) return;
    items = items.concat([{ id: uid(), cat: cat || 'Andet', name: name.trim(), qty: (qty || '').trim(), assigned: [], note: (note || '').trim(), done: false }]);
    save();
  }
  function editField(id, field, value) {
    items = items.map(function (it) { return it.id === id ? Object.assign({}, it, (function () { const o = {}; o[field] = value; return o; })()) : it; });
    save();
  }

  /* ---------- filtering + sorting ---------- */
  function visible() {
    let list = items.slice();
    if (ui.search) {
      const q = ui.search.toLowerCase();
      list = list.filter(function (it) { return (it.name + ' ' + it.note + ' ' + it.cat).toLowerCase().indexOf(q) !== -1; });
    }
    if (ui.cat !== 'alle') list = list.filter(function (it) { return it.cat === ui.cat; });
    if (ui.fam !== 'alle') {
      if (ui.fam === 'ingen') list = list.filter(function (it) { return it.assigned.length === 0; });
      else list = list.filter(function (it) { return it.assigned.indexOf(ui.fam) !== -1; });
    }
    if (ui.status === 'mangler') list = list.filter(function (it) { return it.assigned.length === 0; });
    if (ui.status === 'klar') list = list.filter(function (it) { return it.assigned.length > 0; });
    const cats = PACKING_CATEGORIES;
    list.sort(function (a, b) {
      if (ui.sort === 'navn') return a.name.localeCompare(b.name, 'da');
      if (ui.sort === 'familie') {
        const av = a.assigned[0] || 'zzz', bv = b.assigned[0] || 'zzz';
        return av.localeCompare(bv) || a.name.localeCompare(b.name, 'da');
      }
      // kategori (standard)
      const ai = cats.indexOf(a.cat), bi = cats.indexOf(b.cat);
      return (ai - bi) || a.name.localeCompare(b.name, 'da');
    });
    return list;
  }

  /* ---------- rendering ---------- */
  function stats() {
    const total = items.length;
    const assigned = items.filter(function (it) { return it.assigned.length > 0; }).length;
    return { total: total, assigned: assigned, missing: total - assigned };
  }

  function render() {
    const root = document.getElementById('packing-app');
    if (!root) return;
    const s = stats();
    const list = visible();

    // group by category when sorting by kategori
    let listHtml = '';
    if (ui.sort === 'kategori') {
      const groups = {};
      list.forEach(function (it) { (groups[it.cat] = groups[it.cat] || []).push(it); });
      PACKING_CATEGORIES.forEach(function (cat) {
        if (!groups[cat]) return;
        listHtml += '<div class="pk-group-title">' + cat + ' <span>' + groups[cat].length + '</span></div>';
        listHtml += groups[cat].map(rowHtml).join('');
      });
      // any categories not in the known list
      Object.keys(groups).forEach(function (cat) {
        if (PACKING_CATEGORIES.indexOf(cat) === -1) {
          listHtml += '<div class="pk-group-title">' + cat + ' <span>' + groups[cat].length + '</span></div>';
          listHtml += groups[cat].map(rowHtml).join('');
        }
      });
    } else {
      listHtml = list.map(rowHtml).join('');
    }
    if (!list.length) listHtml = '<div class="pk-empty">Ingen ting matcher filteret.</div>';

    root.innerHTML =
      '<div class="pk-stats">' +
        '<div class="pk-stat"><span class="pk-stat-num">' + s.total + '</span> ting i alt</div>' +
        '<div class="pk-stat"><span class="pk-stat-num" style="color:var(--forest)">' + s.assigned + '</span> tildelt</div>' +
        '<div class="pk-stat"><span class="pk-stat-num" style="color:var(--rust)">' + s.missing + '</span> mangler</div>' +
      '</div>' +

      '<div class="pk-controls">' +
        '<input id="pk-search" class="pk-input" type="search" placeholder="🔍 Søg…" value="' + escapeAttr(ui.search) + '">' +
        '<div class="pk-filters">' +
          selectHtml('pk-cat', 'Kategori', ['alle'].concat(PACKING_CATEGORIES), ui.cat) +
          famFilterHtml() +
          selectHtml('pk-status', 'Status', [['alle', 'Alle'], ['mangler', 'Mangler nogen'], ['klar', 'Er tildelt']], ui.status) +
          selectHtml('pk-sort', 'Sortér', [['kategori', 'Kategori'], ['navn', 'Navn'], ['familie', 'Familie']], ui.sort) +
        '</div>' +
      '</div>' +

      '<div class="pk-list">' + listHtml + '</div>' +

      '<div class="pk-add">' +
        '<div class="pk-add-title">+ Tilføj ny ting</div>' +
        '<div class="pk-add-row">' +
          '<select id="pk-add-cat" class="pk-input">' + PACKING_CATEGORIES.map(function (c) { return '<option>' + c + '</option>'; }).join('') + '</select>' +
          '<input id="pk-add-name" class="pk-input" placeholder="Fx Leverpostej">' +
          '<input id="pk-add-qty" class="pk-input pk-qty" placeholder="Antal">' +
        '</div>' +
        '<input id="pk-add-note" class="pk-input" placeholder="Note (valgfri)">' +
        '<button id="pk-add-btn" class="pk-btn">Tilføj</button>' +
      '</div>' +

      '<div class="pk-export">' +
        '<button id="pk-copy" class="pk-btn ghost">📋 Kopiér samlet liste</button>' +
        '<button id="pk-print" class="pk-btn ghost">🖨 Print / gem som PDF</button>' +
      '</div>';

    wire();
  }

  function rowHtml(it) {
    const chips = FAMILIES.map(function (f) {
      const on = it.assigned.indexOf(f.code) !== -1;
      return '<button class="pk-fam' + (on ? ' on' : '') + '" data-id="' + it.id + '" data-fam="' + f.code + '" ' +
        'style="--c:' + famColor(f.code) + '" title="' + f.name + '">' + f.code + '</button>';
    }).join('');
    return '<div class="pk-item' + (it.done ? ' done' : '') + '">' +
      '<button class="pk-check' + (it.done ? ' on' : '') + '" data-done="' + it.id + '" title="Købt/pakket"></button>' +
      '<div class="pk-main">' +
        '<div class="pk-name">' + escapeHtml(it.name) + (it.qty ? ' <span class="pk-qtytag">' + escapeHtml(it.qty) + '</span>' : '') + '</div>' +
        (it.note ? '<div class="pk-note">' + escapeHtml(it.note) + '</div>' : '') +
        '<div class="pk-fams">' + chips + '</div>' +
      '</div>' +
      '<button class="pk-del" data-del="' + it.id + '" title="Slet">×</button>' +
    '</div>';
  }

  function famFilterHtml() {
    const opts = [['alle', 'Alle familier'], ['ingen', 'Ikke tildelt']].concat(
      FAMILIES.map(function (f) { return [f.code, f.name]; })
    );
    return selectHtml('pk-fam', 'Familie', opts, ui.fam);
  }

  function selectHtml(id, label, opts, current) {
    const options = opts.map(function (o) {
      const val = Array.isArray(o) ? o[0] : o;
      const txt = Array.isArray(o) ? o[1] : (o === 'alle' ? 'Alle' : o);
      return '<option value="' + escapeAttr(val) + '"' + (val === current ? ' selected' : '') + '>' + escapeHtml(txt) + '</option>';
    }).join('');
    return '<label class="pk-sel"><span>' + label + '</span><select id="' + id + '">' + options + '</select></label>';
  }

  /* ---------- events ---------- */
  function wire() {
    const root = document.getElementById('packing-app');
    root.querySelectorAll('.pk-fam').forEach(function (b) {
      b.onclick = function () { toggleFamily(b.dataset.id, b.dataset.fam); };
    });
    root.querySelectorAll('[data-done]').forEach(function (b) { b.onclick = function () { toggleDone(b.dataset.done); }; });
    root.querySelectorAll('[data-del]').forEach(function (b) { b.onclick = function () {
      if (confirm('Slet denne ting?')) remove(b.dataset.del);
    }; });

    const search = document.getElementById('pk-search');
    search.oninput = function () { ui.search = search.value; renderPreserveFocus('pk-search'); };
    document.getElementById('pk-cat').onchange = function (e) { ui.cat = e.target.value; render(); };
    document.getElementById('pk-fam').onchange = function (e) { ui.fam = e.target.value; render(); };
    document.getElementById('pk-status').onchange = function (e) { ui.status = e.target.value; render(); };
    document.getElementById('pk-sort').onchange = function (e) { ui.sort = e.target.value; render(); };

    document.getElementById('pk-add-btn').onclick = function () {
      const cat = document.getElementById('pk-add-cat').value;
      const name = document.getElementById('pk-add-name').value;
      const qty = document.getElementById('pk-add-qty').value;
      const note = document.getElementById('pk-add-note').value;
      addItem(cat, name, qty, note);
    };
    document.getElementById('pk-add-name').onkeydown = function (e) { if (e.key === 'Enter') document.getElementById('pk-add-btn').click(); };

    document.getElementById('pk-copy').onclick = copyList;
    document.getElementById('pk-print').onclick = printList;
  }

  function renderPreserveFocus(focusId) {
    const val = document.getElementById(focusId) ? document.getElementById(focusId).value : '';
    render();
    const el = document.getElementById(focusId);
    if (el) { el.focus(); el.value = val; el.setSelectionRange(val.length, val.length); }
  }

  /* ---------- export ---------- */
  function buildText() {
    const groups = {};
    items.forEach(function (it) { (groups[it.cat] = groups[it.cat] || []).push(it); });
    let out = 'SIRDAL 2026 — HVEM TAGER HVAD MED\n\n';
    PACKING_CATEGORIES.concat(Object.keys(groups).filter(function (c) { return PACKING_CATEGORIES.indexOf(c) === -1; }))
      .forEach(function (cat) {
        if (!groups[cat]) return;
        out += '— ' + cat.toUpperCase() + ' —\n';
        groups[cat].forEach(function (it) {
          const who = it.assigned.length ? it.assigned.join('/') : 'MANGLER';
          out += '  [' + who + '] ' + it.name + (it.qty ? ' (' + it.qty + ')' : '') + (it.note ? ' — ' + it.note : '') + '\n';
        });
        out += '\n';
      });
    out += 'ML=Mette&Lars  GC=Gitte&Chresten  CM=Camilla&Morten  LA=Lisbeth&Anders';
    return out;
  }

  function copyList() {
    const text = buildText();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function () { flash('Listen er kopieret!'); },
        function () { fallbackCopy(text); });
    } else fallbackCopy(text);
  }
  function fallbackCopy(text) {
    const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta);
    ta.select(); try { document.execCommand('copy'); flash('Listen er kopieret!'); } catch (e) {}
    document.body.removeChild(ta);
  }
  function printList() {
    const w = window.open('', '_blank');
    w.document.write('<pre style="font-family:monospace;font-size:13px;padding:20px;white-space:pre-wrap">' + escapeHtml(buildText()) + '</pre>');
    w.document.close(); w.focus(); setTimeout(function () { w.print(); }, 200);
  }
  function flash(msg) {
    let el = document.getElementById('pk-flash');
    if (!el) { el = document.createElement('div'); el.id = 'pk-flash'; el.className = 'pk-flash'; document.body.appendChild(el); }
    el.textContent = msg; el.classList.add('show');
    setTimeout(function () { el.classList.remove('show'); }, 1800);
  }

  /* ---------- helpers ---------- */
  function escapeHtml(s) { return String(s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); }
  function escapeAttr(s) { return escapeHtml(s); }

  function init() {
    Store.subscribe('packing', function (data) { items = data || []; render(); });
  }

  return { init: init };
})();
