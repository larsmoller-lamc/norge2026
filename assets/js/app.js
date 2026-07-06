/* =====================================================================
   APP.js — binder alt sammen: program, madplan, attraktioner, familier,
   praktisk, vejr, countdown og navigation. Starter Store/Packing/Gear.
   ===================================================================== */

(function () {
  /* ---------- PROGRAM ---------- */
  function renderDays() {
    const tabs = document.getElementById('dayTabs');
    const cards = document.getElementById('dayCards');
    DAYS.forEach(function (d, i) {
      const tab = document.createElement('button');
      tab.className = 'day-tab' + (i === 0 ? ' active' : '');
      tab.dataset.idx = i;
      tab.innerHTML = '<span class="day-tab-weekday">' + d.weekday + '</span>' +
        '<span class="day-tab-date">' + d.day + '</span>' +
        '<span class="day-tab-month">' + d.month + '</span>';
      tab.onclick = function () { selectDay(i); };
      tabs.appendChild(tab);

      const card = document.createElement('div');
      card.className = 'day-card' + (i === 0 ? ' active' : '');
      card.dataset.idx = i;
      const fmt = new Date(d.date).toLocaleDateString('da-DK', { weekday: 'long', day: 'numeric', month: 'long' });
      card.innerHTML =
        '<div class="day-hero">' +
          '<div class="day-hero-date">' + fmt + '</div>' +
          '<div class="day-hero-title">' + d.title + '</div>' +
          '<div class="day-hero-subtitle">' + d.subtitle + '</div>' +
          '<div class="day-weather" data-daywx="' + d.date + '">🌡 Henter vejr…</div>' +
        '</div>' +
        '<div class="timeline">' +
          d.activities.map(function (a) {
            return '<div class="activity">' +
              '<div class="activity-time">' + a.time + '</div>' +
              '<div class="activity-title">' + a.title + '</div>' +
              '<div class="activity-desc">' + a.desc + '</div>' +
              (a.tags ? '<div>' + a.tags.map(function (t) {
                const cls = t === 'regn' ? 'rain' : t === 'sol' ? 'sun' : t === 'indendørs' ? 'indoor' : '';
                return '<span class="activity-tag ' + cls + '">' + t + '</span>';
              }).join('') + '</div>' : '') +
            '</div>';
          }).join('') +
        '</div>';
      cards.appendChild(card);
    });
  }
  function selectDay(idx) {
    document.querySelectorAll('.day-tab').forEach(function (t) { t.classList.toggle('active', +t.dataset.idx === idx); });
    document.querySelectorAll('.day-card').forEach(function (c) { c.classList.toggle('active', +c.dataset.idx === idx); });
    const tab = document.querySelector('.day-tab[data-idx="' + idx + '"]');
    if (tab) tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  /* ---------- MADPLAN ---------- */
  function renderMeals() {
    const list = document.getElementById('mealsList');
    MEALS.forEach(function (m) {
      const card = document.createElement('div');
      card.className = 'meal-card';
      card.innerHTML =
        '<div class="meal-date"><span class="meal-date-day">' + m.day + '</span><span class="meal-date-num">' + m.date.split('.')[0] + '</span></div>' +
        '<div class="meal-content">' +
          '<div class="meal-row"><span class="meal-icon">🥐</span><div class="meal-info"><div class="meal-type">Morgenmad</div><div class="meal-dish">' + m.breakfast + '</div><span class="meal-chef">' + m.breakfastChef + '</span></div></div>' +
          '<div class="meal-row"><span class="meal-icon">🍽</span><div class="meal-info"><div class="meal-type">Aftensmad</div><div class="meal-dish">' + m.dinner + '</div><span class="meal-chef">' + m.dinnerChef + '</span></div></div>' +
        '</div>';
      list.appendChild(card);
    });
  }

  /* ---------- ATTRAKTIONER ---------- */
  function renderAttractions() {
    const c = document.getElementById('attractions');
    ATTRACTIONS.forEach(function (a) {
      const div = document.createElement('div');
      div.className = 'attraction';
      div.innerHTML =
        '<div class="attraction-img ' + a.art + '">' +
          '<svg viewBox="0 0 300 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block">' +
          '<path d="M0,110 L40,70 L80,90 L120,55 L160,80 L200,60 L240,85 L280,70 L300,80 L300,140 L0,140 Z" fill="rgba(20,40,34,0.4)"/>' +
          '<path d="M0,140 L0,115 L50,100 L100,118 L150,98 L200,115 L250,105 L300,115 L300,140 Z" fill="rgba(20,40,34,0.6)"/>' +
          '<circle cx="240" cy="35" r="10" fill="rgba(212,168,71,0.85)"/></svg>' +
        '</div>' +
        '<div class="attraction-header"><div class="attraction-name">' + a.name + '</div>' +
          '<span class="attraction-diff diff-' + a.diff + '">' + a.diffLabel + '</span></div>' +
        '<div class="attraction-desc">' + a.desc + '</div>' +
        '<div class="attraction-meta">' + a.meta.map(function (m) { return '<span>' + m[0] + ' ' + m[1] + '</span>'; }).join('') + '</div>' +
        '<a class="attraction-link" href="' + a.link + '" target="_blank" rel="noopener">Læs mere →</a>';
      c.appendChild(div);
    });
  }

  /* ---------- FAMILIER ---------- */
  function renderFamilies() {
    const c = document.getElementById('families');
    FAMILIES.forEach(function (f) {
      const fm = FAMILY_MEMBERS.find(function (x) { return x.code === f.code; });
      const members = fm ? fm.members : [];
      const div = document.createElement('div');
      div.className = 'family';
      div.innerHTML =
        '<div class="family-head">' +
          '<div class="family-icon" style="background:var(' + f.colorVar + ')">' + f.initial + '</div>' +
          '<div><div class="family-name">' + f.name + '</div><div class="family-location">' + f.city + '</div></div>' +
        '</div>' +
        '<div class="family-members">' + members.map(function (m) {
          if (typeof m === 'string') return '<span class="member">' + m + '</span>';
          return '<span class="member ' + (m.child ? 'child' : '') + '">' + m.name + '</span>';
        }).join('') + '</div>';
      c.appendChild(div);
    });
  }

  /* ---------- PRAKTISK: adresse + kort ---------- */
  function renderLocation() {
    document.getElementById('addr-line').textContent = TRIP.address;
    document.getElementById('maps-link').href = TRIP.mapsUrl;
    const q = encodeURIComponent(TRIP.address + ', Norway');
    document.getElementById('map-frame').src = 'https://www.google.com/maps?q=' + q + '&z=11&output=embed';
  }

  /* ---------- VEJR ---------- */
  function renderWeather() {
    const root = document.getElementById('weather-app');
    Weather.load(TRIP.lat, TRIP.lon).then(function (wx) {
      const cur = wx.current;
      const daysHtml = wx.days.map(function (d) {
        return '<div class="wx-day">' +
          '<div class="wx-day-name">' + d.weekday + ' ' + d.date + '.</div>' +
          '<div class="wx-day-sym">' + d.sym[0] + '</div>' +
          '<div class="wx-day-temp"><span class="hi">' + d.max + '°</span> <span class="lo">' + d.min + '°</span></div>' +
        '</div>';
      }).join('');
      root.innerHTML =
        '<div class="wx-current">' +
          '<div class="wx-cur-sym">' + cur.sym[0] + '</div>' +
          '<div class="wx-cur-main">' +
            '<div class="wx-cur-temp">' + cur.temp + '°</div>' +
            '<div class="wx-cur-desc">' + cur.sym[1] + ' · 💨 ' + cur.wind + ' m/s</div>' +
            '<div class="wx-cur-loc">Sinnes, Sirdal · lige nu</div>' +
          '</div>' +
        '</div>' +
        '<div class="wx-days">' + daysHtml + '</div>' +
        '<div class="wx-foot">' +
          '<span>Kilde: ' + wx.source + '</span>' +
          '<a href="' + TRIP.yrUrl + '" target="_blank" rel="noopener">Se fuld udsigt på YR.no →</a>' +
        '</div>';
      // opdatér dag-hero vejr-badges hvis prognosen dækker turdatoerne
      updateDayBadges(wx.days);
    }).catch(function (e) {
      root.innerHTML = '<div class="wx-error">Kunne ikke hente vejret lige nu. ' +
        '<a href="' + TRIP.yrUrl + '" target="_blank" rel="noopener">Åbn YR.no →</a></div>';
      console.warn(e);
    });
  }

  function updateDayBadges(days) {
    // days: [{weekday,date,min,max,sym}] for aktuelle uge (matcher sjældent turen,
    // men når turen nærmer sig, udfyldes badges for de datoer der findes)
    document.querySelectorAll('[data-daywx]').forEach(function (el) {
      const iso = el.getAttribute('data-daywx');
      const dayNum = new Date(iso).getDate();
      const match = days.find(function (d) { return d.date === dayNum; });
      if (match) el.innerHTML = match.sym[0] + ' ' + match.max + '° / ' + match.min + '°';
      else el.innerHTML = '🗓 ' + new Date(iso).toLocaleDateString('da-DK', { day: 'numeric', month: 'short' });
    });
  }

  /* ---------- COUNTDOWN ---------- */
  function updateCountdown() {
    const target = new Date(TRIP.startISO);
    let diff = (target - new Date()) / 1000;
    if (diff < 0) {
      ['cd-d', 'cd-h', 'cd-m', 'cd-s'].forEach(function (id) { const e = document.getElementById(id); if (e) e.textContent = '0'; });
      const lbl = document.querySelector('.countdown-label'); if (lbl) lbl.textContent = 'I er fremme! 🎉';
      return;
    }
    const d = Math.floor(diff / 86400); diff -= d * 86400;
    const h = Math.floor(diff / 3600); diff -= h * 3600;
    const m = Math.floor(diff / 60); diff -= m * 60;
    set('cd-d', d); set('cd-h', h); set('cd-m', m); set('cd-s', Math.floor(diff));
  }
  function set(id, v) { const e = document.getElementById(id); if (e) e.textContent = v; }

  /* ---------- NAV ---------- */
  function setupNav() {
    const links = document.querySelectorAll('.nav-btn');
    const ids = ['top', 'vejr', 'program', 'madplan', 'medbring', 'grej', 'attraktioner', 'hold', 'praktisk'];
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (l) { l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id); });
        }
      });
    }, { rootMargin: '-30% 0px -65% 0px' });
    ids.forEach(function (id) { const el = document.getElementById(id); if (el) obs.observe(el); });
  }

  /* ---------- INIT ---------- */
  function boot() {
    renderDays();
    renderMeals();
    renderAttractions();
    renderFamilies();
    renderLocation();
    renderWeather();
    updateCountdown();
    setInterval(updateCountdown, 1000);
    setupNav();

    Store.init(function (mode) {
      const badge = document.getElementById('sync-badge');
      if (badge) {
        badge.textContent = mode === 'shared' ? '🔗 Delt synk aktiv' : '📱 Gemmes på denne enhed';
        badge.className = 'sync-badge ' + (mode === 'shared' ? 'shared' : 'local');
      }
      Packing.init();
      Gear.init();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
