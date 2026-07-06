/* =====================================================================
   WEATHER.js — henter live vejr for Sinnes/Sirdal.

   Primær kilde: MET Norway / YR (api.met.no) — samme institut som yr.no.
   Reserve:      Open-Meteo (open-meteo.com) — hvis YR blokerer browseren.

   Begge er gratis og kræver ingen nøgle. YR kræver en User-Agent, som
   browseren selv sætter; hvis det alligevel blokeres (CORS), skifter vi
   automatisk til Open-Meteo. Der linkes altid til den fulde udsigt på YR.
   ===================================================================== */

const Weather = (function () {
  // Kortlægning af YR-symbolkoder -> emoji + dansk tekst
  const SYMBOLS = {
    clearsky: ['☀️', 'Klart'],
    fair: ['🌤', 'Let skyet'],
    partlycloudy: ['⛅', 'Delvist skyet'],
    cloudy: ['☁️', 'Skyet'],
    rainshowers: ['🌦', 'Regnbyger'],
    rainshowersandthunder: ['⛈', 'Regn & torden'],
    sleetshowers: ['🌨', 'Slud-byger'],
    snowshowers: ['🌨', 'Snebyger'],
    rain: ['🌧', 'Regn'],
    heavyrain: ['🌧', 'Kraftig regn'],
    heavyrainandthunder: ['⛈', 'Kraftig regn & torden'],
    sleet: ['🌨', 'Slud'],
    snow: ['❄️', 'Sne'],
    snowandthunder: ['⛈', 'Sne & torden'],
    fog: ['🌫', 'Tåge'],
    lightrainshowers: ['🌦', 'Lette regnbyger'],
    heavyrainshowers: ['🌧', 'Kraftige regnbyger'],
    lightrain: ['🌦', 'Let regn'],
    lightssleetshowers: ['🌨', 'Lette slud-byger'],
    thunderstorm: ['⛈', 'Tordenvejr']
  };

  function symToEmoji(code) {
    if (!code) return ['🌡', '—'];
    const base = code.replace(/_(day|night|polartwilight)$/, '');
    return SYMBOLS[base] || ['🌡', base.replace(/_/g, ' ')];
  }

  // Open-Meteo WMO weather codes -> emoji + tekst
  function wmoToEmoji(code) {
    if (code === 0) return ['☀️', 'Klart'];
    if (code === 1) return ['🌤', 'Overvejende klart'];
    if (code === 2) return ['⛅', 'Delvist skyet'];
    if (code === 3) return ['☁️', 'Skyet'];
    if (code === 45 || code === 48) return ['🌫', 'Tåge'];
    if (code >= 51 && code <= 57) return ['🌦', 'Finregn'];
    if (code >= 61 && code <= 67) return ['🌧', 'Regn'];
    if (code >= 71 && code <= 77) return ['❄️', 'Sne'];
    if (code >= 80 && code <= 82) return ['🌦', 'Regnbyger'];
    if (code >= 85 && code <= 86) return ['🌨', 'Snebyger'];
    if (code >= 95) return ['⛈', 'Tordenvejr'];
    return ['🌡', '—'];
  }

  const WEEKDAYS = ['søn', 'man', 'tir', 'ons', 'tor', 'fre', 'lør'];

  async function fromYr(lat, lon) {
    const url = 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=' + lat + '&lon=' + lon;
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error('YR ' + res.status);
    const data = await res.json();
    const series = data.properties.timeseries;
    const now = series[0];
    const current = {
      temp: Math.round(now.data.instant.details.air_temperature),
      wind: Math.round(now.data.instant.details.wind_speed),
      sym: symToEmoji((now.data.next_1_hours || now.data.next_6_hours || {}).summary
        ? (now.data.next_1_hours || now.data.next_6_hours).summary.symbol_code : null)
    };
    // Dagsudsigt: tag kl. ~12 for hver dag
    const byDay = {};
    series.forEach(function (s) {
      const d = new Date(s.time);
      const key = d.toISOString().slice(0, 10);
      const hour = d.getHours();
      if (!byDay[key]) byDay[key] = { min: 99, max: -99, sym: null, date: d };
      const t = s.data.instant.details.air_temperature;
      byDay[key].min = Math.min(byDay[key].min, t);
      byDay[key].max = Math.max(byDay[key].max, t);
      const sixSym = (s.data.next_6_hours || {}).summary;
      if ((hour >= 11 && hour <= 14) && sixSym) byDay[key].sym = sixSym.symbol_code;
      if (!byDay[key].sym && sixSym) byDay[key].sym = sixSym.symbol_code;
    });
    const days = Object.keys(byDay).sort().slice(0, 7).map(function (k) {
      const o = byDay[k];
      return { weekday: WEEKDAYS[o.date.getDay()], date: o.date.getDate(), min: Math.round(o.min), max: Math.round(o.max), sym: symToEmoji(o.sym) };
    });
    return { current: current, days: days, source: 'YR (MET Norway)' };
  }

  async function fromOpenMeteo(lat, lon) {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon +
      '&current=temperature_2m,weather_code,wind_speed_10m' +
      '&daily=weather_code,temperature_2m_max,temperature_2m_min' +
      '&wind_speed_unit=ms&timezone=Europe%2FOslo&forecast_days=7';
    const res = await fetch(url);
    if (!res.ok) throw new Error('OpenMeteo ' + res.status);
    const data = await res.json();
    const current = {
      temp: Math.round(data.current.temperature_2m),
      wind: Math.round(data.current.wind_speed_10m),
      sym: wmoToEmoji(data.current.weather_code)
    };
    const days = data.daily.time.map(function (t, i) {
      const d = new Date(t);
      return {
        weekday: WEEKDAYS[d.getDay()], date: d.getDate(),
        min: Math.round(data.daily.temperature_2m_min[i]),
        max: Math.round(data.daily.temperature_2m_max[i]),
        sym: wmoToEmoji(data.daily.weather_code[i])
      };
    });
    return { current: current, days: days, source: 'Open-Meteo' };
  }

  async function load(lat, lon) {
    try {
      return await fromYr(lat, lon);
    } catch (e) {
      console.warn('YR utilgængelig i browseren, skifter til Open-Meteo:', e.message);
      return await fromOpenMeteo(lat, lon);
    }
  }

  return { load: load };
})();
