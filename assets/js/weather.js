/* =====================================================================
   weather.js — henter live vejr fra Open-Meteo (samme datagrundlag
   som YR/MET Norway for nordiske steder). Ingen nøgle nødvendig.
   ===================================================================== */
(function () {
  // WMO-vejrkoder -> dansk tekst + ikon
  var CODES = {
    0:  { t: 'Klart', i: '☀️' },
    1:  { t: 'Næsten klart', i: '🌤️' },
    2:  { t: 'Delvist skyet', i: '⛅' },
    3:  { t: 'Overskyet', i: '☁️' },
    45: { t: 'Tåge', i: '🌫️' },
    48: { t: 'Rimtåge', i: '🌫️' },
    51: { t: 'Let støvregn', i: '🌦️' },
    53: { t: 'Støvregn', i: '🌦️' },
    55: { t: 'Kraftig støvregn', i: '🌧️' },
    56: { t: 'Isslag (let)', i: '🌧️' },
    57: { t: 'Isslag', i: '🌧️' },
    61: { t: 'Let regn', i: '🌦️' },
    63: { t: 'Regn', i: '🌧️' },
    65: { t: 'Kraftig regn', i: '🌧️' },
    66: { t: 'Isregn', i: '🌧️' },
    67: { t: 'Kraftig isregn', i: '🌧️' },
    71: { t: 'Let sne', i: '🌨️' },
    73: { t: 'Sne', i: '🌨️' },
    75: { t: 'Kraftig sne', i: '❄️' },
    77: { t: 'Snekorn', i: '🌨️' },
    80: { t: 'Regnbyger', i: '🌦️' },
    81: { t: 'Byger', i: '🌧️' },
    82: { t: 'Kraftige byger', i: '⛈️' },
    85: { t: 'Snebyger', i: '🌨️' },
    86: { t: 'Kraftige snebyger', i: '❄️' },
    95: { t: 'Tordenvejr', i: '⛈️' },
    96: { t: 'Torden m. hagl', i: '⛈️' },
    99: { t: 'Kraftig torden', i: '⛈️' }
  };

  function desc(code) { return CODES[code] || { t: '—', i: '🌡️' }; }

  function fetchWeather(lat, lon) {
    var url = 'https://api.open-meteo.com/v1/forecast'
      + '?latitude=' + lat + '&longitude=' + lon
      + '&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,relative_humidity_2m'
      + '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,sunrise,sunset'
      + '&timezone=Europe%2FOslo&forecast_days=16';
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error('Vejrtjenesten svarede ikke (' + r.status + ')');
      return r.json();
    });
  }

  window.Weather = { fetchWeather: fetchWeather, desc: desc };
})();
