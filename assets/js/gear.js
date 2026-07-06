/* =====================================================================
   GEAR.js — "Grej & andet man tager med" (fri tekst).
   Fx spil, højttaler, snittekniv. Hver ting kan tildeles en person/familie.
   ===================================================================== */

const Gear = (function () {
  let items = [];

  function save() { Store.set('gear', items); }
  function uid() { return 'g_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

  function add(name, by, note) {
    if (!name.trim()) return;
    items = items.concat([{ id: uid(), name: name.trim(), by: (by || '').trim(), note: (note || '').trim(), done: false }]);
    save();
  }
  function remove(id) { items = items.filter(function (it) { return it.id !== id; }); save(); }
  function toggleDone(id) { items = items.map(function (it) { return it.id === id ? Object.assign({}, it, { done: !it.done }) : it; }); save(); }
  function editBy(id, val) { items = items.map(function (it) { return it.id === id ? Object.assign({}, it, { by: val }) : it; }); save(); }

  function render() {
    const root = document.getElementById('gear-app');
    if (!root) return;

    const famOptions = '<option value="">Hvem?</option>' +
      FAMILIES.map(function (f) { return '<option value="' + f.name + '">' + f.name + '</option>'; }).join('') +
      '<option value="Fælles">Fælles</option>';

    const rows = items.map(function (it) {
      return '<div class="gr-item' + (it.done ? ' done' : '') + '">' +
        '<button class="pk-check' + (it.done ? ' on' : '') + '" data-done="' + it.id + '"></button>' +
        '<div class="gr-main">' +
          '<div class="gr-name">' + esc(it.name) + '</div>' +
          (it.note ? '<div class="gr-note">' + esc(it.note) + '</div>' : '') +
        '</div>' +
        '<select class="gr-by" data-by="' + it.id + '">' +
          famOptions.replace('value="' + esc(it.by) + '"', 'value="' + esc(it.by) + '" selected') +
        '</select>' +
        '<button class="pk-del" data-del="' + it.id + '">×</button>' +
      '</div>';
    }).join('') || '<div class="pk-empty">Ingenting endnu — tilføj det I vil have med.</div>';

    root.innerHTML =
      '<div class="gr-list">' + rows + '</div>' +
      '<div class="pk-add">' +
        '<div class="pk-add-title">+ Tilføj grej</div>' +
        '<div class="pk-add-row">' +
          '<input id="gr-name" class="pk-input" placeholder="Fx Bluetooth-højttaler">' +
          '<select id="gr-by" class="pk-input">' + famOptions + '</select>' +
        '</div>' +
        '<input id="gr-note" class="pk-input" placeholder="Note (valgfri)">' +
        '<button id="gr-add" class="pk-btn">Tilføj</button>' +
      '</div>';

    root.querySelectorAll('[data-done]').forEach(function (b) { b.onclick = function () { toggleDone(b.dataset.done); }; });
    root.querySelectorAll('[data-del]').forEach(function (b) { b.onclick = function () { if (confirm('Slet?')) remove(b.dataset.del); }; });
    root.querySelectorAll('[data-by]').forEach(function (s) { s.onchange = function () { editBy(s.dataset.by, s.value); }; });
    document.getElementById('gr-add').onclick = function () {
      add(document.getElementById('gr-name').value, document.getElementById('gr-by').value, document.getElementById('gr-note').value);
    };
    document.getElementById('gr-name').onkeydown = function (e) { if (e.key === 'Enter') document.getElementById('gr-add').click(); };
  }

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); }

  function init() { Store.subscribe('gear', function (data) { items = data || []; render(); }); }
  return { init: init };
})();
