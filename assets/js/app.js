/* =====================================================================
   app.js — bygger program, vejr, madplan, attraktioner, familier,
   countdown og navigation.
   ===================================================================== */
(function () {
  var $ = function (sel) { return document.querySelector(sel); };
  var el = function (tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

  /* ---------- PROGRAM ---------- */
  function renderDays() {
    var tabs = $('#dayTabs'), cards = $('#dayCards');
    if (!tabs || !cards) return;
    window.DAYS.forEach(function (d, i) {
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
          var c = t === 'regn' ? 'rain' : t === 'sol' ? 'sun' : t === 'indendørs' ? 'indoor' : '';
          return '<span class="activity-tag ' + c + '">' + t + '</span>';
        }).join('');
        return '<div class="activity"><div class="activity-time">' + a.time + '</div>'
          + '<div class="activity-title">' + a.title + '</div>'
          + '<div class="activity-desc">' + a.desc + '</div>'
          + (tags ? '<div>' + tags + '</div>' : '') + '</div>';
      }).join('');
      card.innerHTML = '<div class="day-hero"><div class="day-hero-date">' + fmt + '</div>'
        + '<div class="day-hero-title">' + d.title + '</div>'
        + '<div class="day-hero-subtitle">' + d.subtitle + '</div>'
        + '<div class="day-weather" data-daydate="' + d.date + '">🌡️ Henter vejr…</div></div>'
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

  /* ---------- MEALS ---------- */
  function renderMeals() {
    var list = $('#mealsList'); if (!list) return;
    window.MEALS.forEach(function (m) {
      var card = el('div', 'meal-card');
      card.innerHTML = '<div class="meal-date"><span class="meal-date-day">' + m.day + '</span>'
        + '<span class="meal-date-num">' + m.date.split('.')[0] + '</span></div>'
        + '<div class="meal-content">'
        + '<div class="meal-row"><span class="meal-icon">🥐</span><div class="meal-info">'
        + '<div class="meal-type">Morgenmad</div><div class="meal-dish">' + m.breakfast + '</div>'
        + '<span class="meal-chef">' + m.breakfastChef + '</span></div></div>'
        + '<div class="meal-row"><span class="meal-icon">🍽</span><div class="meal-info">'
        + '<div class="meal-type">Aftensmad</div><div class="meal-dish">' + m.dinner + '</div>'
        + '<span class="meal-chef">' + m.dinnerChef + '</span></div></div>'
        + '</div>';
      list.appendChild(card);
    });
  }

  /* ---------- ATTRACTIONS ---------- */
  function renderAttractions() {
    var c = $('#attractions'); if (!c) return;
    window.ATTRACTIONS.forEach(function (a) {
      var div = el('div', 'attraction');
      div.innerHTML = '<div class="attraction-img ' + a.art + '">'
        + '<svg viewBox="0 0 300 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block">'
        + '<path d="M0,110 L40,70 L80,90 L120,55 L160,80 L200,60 L240,85 L280,70 L300,80 L300,140 L0,140 Z" fill="rgba(20,40,34,0.4)"/>'
        + '<path d="M0,140 L0,115 L50,100 L100,118 L150,98 L200,115 L250,105 L300,115 L300,140 Z" fill="rgba(20,40,34,0.6)"/>'
        + '<circle cx="240" cy="35" r="10" fill="rgba(212,168,71,0.85)"/></svg></div>'
        + '<div class="attraction-header"><div class="attraction-name">' + a.name + '</div>'
        + '<span class="attraction-diff diff-' + a.diff + '">' + a.diffLabel + '</span></div>'
        + '<div class="attraction-desc">' + a.desc + '</div>'
        + '<div class="attraction-meta">' + a.meta.map(function (m) { return '<span>' + m[0] + ' ' + m[1] + '</span>'; }).join('') + '</div>'
        + '<a class="attraction-link" href="' + a.link + '" target="_blank" rel="noopener">Læs mere →</a>';
      c.appendChild(div);
    });
  }

  /* ---------- FAMILIES ---------- */
  function renderFamilies() {
    var c = $('#families'); if (!c) return;
    window.FAMILIES.forEach(function (f) {
      var div = el('div', 'family');
      var members = f.members.map(function (m) {
        if (typeof m === 'string') return '<span class="member">' + m + '</span>';
        return '<span class="member ' + (m.child ? 'child' : '') + '">' + m.name + '</span>';
      }).join('');
      div.innerHTML = '<div class="family-head"><div class="family-icon ' + f.icon + '">' + f.initial + '</div>'
        + '<div><div class="family-name">' + f.name + '</div><div class="family-location">' + f.location + '</div></div></div>'
        + '<div class="family-members">' + members + '</div>';
      c.appendChild(div);
    });
  }

  /* ---------- COUNTDOWN ---------- */
  function updateCountdown() {
    var target = new Date('2026-07-22T15:00:00');
    var now = new Date();
    var diff = (target - now) / 1000;
    var set = function (id, v) { var e = document.getElementById(id); if (e) e.textContent = v; };
    if (diff < 0) {
      set('cd-d', '0'); set('cd-h', '0'); set('cd-m', '0'); set('cd-s', '0');
      var lbl = $('.countdown-label'); if (lbl) lbl.textContent = 'I er fremme! 🎉';
      return;
    }
    var d = Math.floor(diff / 86400); diff -= d * 86400;
    var h = Math.floor(diff / 3600); diff -= h * 3600;
    var m = Math.floor(diff / 60); diff -= m * 60;
    set('cd-d', d); set('cd-h', h); set('cd-m', m); set('cd-s', Math.floor(diff));
  }

  /* ---------- WEATHER ---------- */
  function renderWeather() {
    var box = $('#weatherBox'); if (!box) return;
    var cfg = window.APP_CONFIG.location;
    box.innerHTML = '<div class="weather-loading">🌡️ Henter live vejr for ' + cfg.name + '…</div>';

    window.Weather.fetchWeather(cfg.lat, cfg.lon).then(function (data) {
      var cur = data.current, daily = data.daily;
      var cd = window.Weather.desc(cur.weather_code);

      var now = '<div class="weather-now"><div class="weather-now-top">'
        + '<div class="weather-now-icon">' + cd.i + '</div>'
        + '<div><div class="weather-now-temp">' + Math.round(cur.temperature_2m) + '°</div>'
        + '<div class="weather-now-desc">' + cd.t + '</div>'
        + '<div class="weather-now-place">' + cfg.name + '</div></div></div>'
        + '<div class="weather-now-meta">'
        + '<span>🌡️ Føles som ' + Math.round(cur.apparent_temperature) + '°</span>'
        + '<span>💨 ' + Math.round(cur.wind_speed_10m) + ' m/s</span>'
        + '<span>💧 ' + cur.relative_humidity_2m + '%</span></div>'
        + '<div class="weather-updated">Opdateret ' + new Date().toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' }) + '</div></div>';

      var tripStart = '2026-07-22', tripEnd = '2026-07-29';
      var days = daily.time.map(function (dt, i) {
        var dc = window.Weather.desc(daily.weather_code[i]);
        var dd = new Date(dt);
        var isTrip = dt >= tripStart && dt <= tripEnd;
        var name = dd.toLocaleDateString('da-DK', { weekday: 'short' });
        var dm = dd.toLocaleDateString('da-DK', { day: 'numeric', month: 'short' });
        return '<div class="wday' + (isTrip ? ' trip' : '') + '">'
          + '<div class="wday-name">' + name + '</div>'
          + '<div class="wday-date">' + dm + '</div>'
          + '<div class="wday-icon">' + dc.i + '</div>'
          + '<div class="wday-temp">' + Math.round(daily.temperature_2m_max[i]) + '° <span class="wday-min">' + Math.round(daily.temperature_2m_min[i]) + '°</span></div>'
          + '<div class="wday-rain">💧 ' + (daily.precipitation_probability_max[i] != null ? daily.precipitation_probability_max[i] + '%' : '–') + '</div>'
          + '</div>';
      }).join('');

      var reachesTrip = daily.time.indexOf(tripStart) !== -1;
      var note = reachesTrip
        ? 'De markerede dage (rød kant) er selve ferien.'
        : 'Prognosen rækker ca. 16 dage frem. Detaljeret ferievejr dukker op, når I kommer tættere på d. 22. juli.';

      box.innerHTML = now
        + '<div class="weather-days">' + days + '</div>'
        + '<div class="weather-note">' + note + '</div>'
        + '<div class="weather-actions">'
        + '<a class="btn btn-rust" href="' + window.APP_CONFIG.yrUrl + '" target="_blank" rel="noopener">Se fuld prognose på YR →</a>'
        + '<button class="btn btn-ghost" id="weatherReload">↻ Opdater</button></div>';

      var rl = $('#weatherReload'); if (rl) rl.onclick = renderWeather;

      // opdater vejr-badge på dagsprogrammet
      document.querySelectorAll('.day-weather[data-daydate]').forEach(function (dw) {
        var idx = daily.time.indexOf(dw.dataset.daydate);
        if (idx !== -1) {
          var dc = window.Weather.desc(daily.weather_code[idx]);
          dw.textContent = dc.i + ' ' + dc.t + ' · ' + Math.round(daily.temperature_2m_max[idx]) + '° / ' + Math.round(daily.temperature_2m_min[idx]) + '°';
        } else {
          dw.textContent = '🌡️ Prognose kommer nærmere ferien';
        }
      });
    }).catch(function (err) {
      box.innerHTML = '<div class="weather-error">Kunne ikke hente vejret lige nu 🌧️<br>'
        + '<span style="font-size:12px">' + (err && err.message ? err.message : '') + '</span><br><br>'
        + '<a class="btn btn-rust" href="' + window.APP_CONFIG.yrUrl + '" target="_blank" rel="noopener">Se vejret på YR →</a> '
        + '<button class="btn btn-ghost" id="weatherReload">↻ Prøv igen</button></div>';
      var rl = $('#weatherReload'); if (rl) rl.onclick = renderWeather;
      document.querySelectorAll('.day-weather[data-daydate]').forEach(function (dw) { dw.textContent = '🌡️ Se vejr-sektionen'; });
    });
  }

  /* ---------- NAV ---------- */
  function setupNav() {
    var links = document.querySelectorAll('.nav-btn');
    var ids = ['top', 'program', 'vejr', 'madplan', 'medbring', 'faelles', 'attraktioner', 'hold', 'praktisk'];
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
  window.SirdalApp = { renderWeather: renderWeather };
  document.addEventListener('DOMContentLoaded', function () {
    renderDays(); renderMeals(); renderAttractions(); renderFamilies();
    updateCountdown(); setInterval(updateCountdown, 1000);
    setupNav();
    renderWeather();
  });
})();
