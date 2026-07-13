/* =====================================================================
   arendal.js — Renderer for arendal.html
   Version: 2026-07-13-v1

   Genbruger samme dom-mønster som app.js. Ingen countdown og vejr her —
   siden er statisk (3 dages tur, kendte tider). Nye componenter:
   parking-liste, beach-liste, crew.
   ===================================================================== */
(function () {
  var $ = function (sel) { return document.querySelector(sel); };
  var el = function (tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  };

  /* ---------- PROGRAM (samme som Sirdal-appens renderDays) ---------- */
  function renderDays() {
    var tabs = $('#dayTabs'), cards = $('#dayCards');
    if (!tabs || !cards) return;
    window.TRIP_DAYS.forEach(function (d, i) {
      var tab = el('button', 'day-tab' + (i === 0 ? ' active' : ''));
      tab.dataset.idx = i;
      tab.innerHTML = '<span class="day-tab-weekday">' + d.weekday + '</span>'
        + '<span class="day-tab-date">' + d.day + '</span>'
        + '<span class="day-tab-month">' + d.month + '</span>';
      tab.onclick = function () { selectDay(i); };
      tabs.appendChild(tab);

      var card = el('div', 'day-card' + (i === 0 ? ' active' : ''));
      card.dataset.idx = i;
      var fmt = new Date(d.date).toLocaleDateString('da-DK', { weekday: 'long', day: 'numeric', month: 'long' });
      var acts = d.activities.map(function (a) {
        var tags = (a.tags || []).map(function (t) {
          var c = t === 'regn' ? 'rain' : (t === 'sol' || t === 'badning') ? 'sun' : (t === 'indendørs' || t === 'museum') ? 'indoor' : '';
          return '<span class="activity-tag ' + c + '">' + t + '</span>';
        }).join('');
        return '<div class="activity"><div class="activity-time">' + a.time + '</div>'
          + '<div class="activity-title">' + a.title + '</div>'
          + '<div class="activity-desc">' + a.desc + '</div>'
          + (tags ? '<div>' + tags + '</div>' : '') + '</div>';
      }).join('');
      card.innerHTML = '<div class="day-hero"><div class="day-hero-date">' + fmt + '</div>'
        + '<div class="day-hero-title">' + d.title + '</div>'
        + '<div class="day-hero-subtitle">' + d.subtitle + '</div></div>'
        + '<div class="timeline">' + acts + '</div>';
      cards.appendChild(card);
    });
  }
  function selectDay(idx) {
    document.querySelectorAll('.day-tab').forEach(function (t) { t.classList.toggle('active', +t.dataset.idx === idx); });
    document.querySelectorAll('.day-card').forEach(function (c) { c.classList.toggle('active', +c.dataset.idx === idx); });
    var tab = document.querySelector('.day-tab[data-idx="' + idx + '"]');
    if (tab) tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  /* ---------- ATTRACTIONS (samme som Sirdal-appens renderAttractions) ---------- */
  function renderAttractions() {
    var c = $('#attractions'); if (!c) return;
    window.ATTRACTIONS.forEach(function (a) {
      var div = el('div', 'attraction');
      div.innerHTML = '<div class="attraction-img ' + a.art + '">'
        + '<svg viewBox="0 0 300 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block">'
        + '<path d="M0,110 L40,70 L80,90 L120,55 L160,80 L200,60 L240,85 L280,70 L300,80 L300,140 L0,140 Z" fill="rgba(30,58,82,0.4)"/>'
        + '<path d="M0,140 L0,115 L50,100 L100,118 L150,98 L200,115 L250,105 L300,115 L300,140 Z" fill="rgba(30,58,82,0.6)"/>'
        + '<circle cx="240" cy="35" r="10" fill="rgba(232,181,85,0.85)"/></svg></div>'
        + '<div class="attraction-header"><div class="attraction-name">' + a.name + '</div>'
        + '<span class="attraction-diff diff-' + a.diff + '">' + a.diffLabel + '</span></div>'
        + '<div class="attraction-desc">' + a.desc + '</div>'
        + '<div class="attraction-meta">' + a.meta.map(function (m) { return '<span>' + m[0] + ' ' + m[1] + '</span>'; }).join('') + '</div>'
        + '<a class="attraction-link" href="' + a.link + '" target="_blank" rel="noopener">Åbn på kort →</a>';
      c.appendChild(div);
    });
  }

  /* ---------- PARKING ---------- */
  function renderParking() {
    var c = $('#parkingList'); if (!c) return;
    window.PARKING.forEach(function (p) {
      var div = el('div', 'parking-item');
      div.innerHTML = '<div class="parking-badge' + (p.recommended ? ' recommended' : '') + '">' + p.badge + '</div>'
        + '<div class="parking-info">'
        + '<div class="parking-name">' + p.name
        + (p.recommended ? '<span class="parking-recommended-tag">Anbefalet</span>' : '')
        + '</div>'
        + '<div class="parking-desc">' + p.desc + '</div>'
        + '</div>'
        + '<a class="parking-link" href="' + p.link + '" target="_blank" rel="noopener">Kort →</a>';
      c.appendChild(div);
    });
  }

  /* ---------- BEACHES ---------- */
  function renderBeaches() {
    var c = $('#beachList'); if (!c) return;
    window.BEACHES.forEach(function (b) {
      var div = el('div', 'beach-item');
      div.innerHTML = '<div class="beach-head">'
        + '<div class="beach-name">' + b.name + '</div>'
        + '<div class="beach-distance">' + b.distance + '</div>'
        + '</div>'
        + '<div class="beach-type">' + b.type + '</div>'
        + '<div class="beach-desc">' + b.desc + '</div>'
        + '<a class="beach-link" href="' + b.link + '" target="_blank" rel="noopener">Åbn på kort →</a>';
      c.appendChild(div);
    });
  }

  /* ---------- CREW ---------- */
  function renderCrew() {
    var c = $('#crew'); if (!c) return;
    window.CREW.forEach(function (p) {
      var div = el('div', 'crew-card');
      div.innerHTML = '<div class="crew-icon ' + p.icon + '">' + p.initial + '</div>'
        + '<div class="crew-name">' + p.name + '</div>'
        + '<div class="crew-role">' + p.role + '</div>';
      c.appendChild(div);
    });
  }

  /* ---------- NAV ---------- */
  function setupNav() {
    var links = document.querySelectorAll('.nav-btn');
    var ids = ['top', 'program', 'kort', 'attraktioner', 'parkering', 'badning', 'hold', 'praktisk'];
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (l) { l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id); });
        }
      });
    }, { rootMargin: '-30% 0px -65% 0px' });
    ids.forEach(function (id) { var el2 = document.getElementById(id); if (el2) observer.observe(el2); });
  }

  /* ---------- INIT ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    renderDays();
    renderAttractions();
    renderParking();
    renderBeaches();
    renderCrew();
    setupNav();
  });
})();
