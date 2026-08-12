'use strict';

// ── Ticketmaster Discovery API ────────────────────────────────────────────────
// Get a free key in ~60 seconds at: https://developer.ticketmaster.com
// Paste it below, then push. The key is read-only — safe to ship in client JS.
const TM_API_KEY = '2Pi4uwk0cTLCbPvDHz2rUP0hLbZIvdUJ';

const TM_BASE    = 'https://app.ticketmaster.com/discovery/v2';
const TM_TTL     = 30 * 60 * 1000; // 30-minute cache

// Sport → Ticketmaster classification params
const TM_SPORTS = {
  nfl: { classificationName: 'NFL' },
  mlb: { classificationName: 'Baseball', subGenreName: 'Baseball' },
  nba: { classificationName: 'Basketball', subGenreName: 'NBA' },
  nhl: { classificationName: 'Hockey',     subGenreName: 'NHL' },
  mls: { classificationName: 'Soccer',     subGenreName: 'MLS' },
};

// ── Fetch events (with localStorage cache) ────────────────────────────────────
window.fetchTMEvents = async function (sport) {
  if (!TM_API_KEY || TM_API_KEY === 'YOUR_TM_API_KEY') return [];

  const cacheKey = `tc_tm_${sport}`;
  try {
    const raw = localStorage.getItem(cacheKey);
    if (raw) {
      const { ts, data } = JSON.parse(raw);
      if (Date.now() - ts < TM_TTL) return data;
    }
  } catch {}

  const params = TM_SPORTS[sport];
  if (!params) return [];

  const today = new Date().toISOString().slice(0, 10);
  const url   = new URL(`${TM_BASE}/events.json`);
  url.searchParams.set('apikey',        TM_API_KEY);
  url.searchParams.set('countryCode',   'US');
  url.searchParams.set('startDateTime', `${today}T00:00:00Z`);
  url.searchParams.set('size',          '20');
  url.searchParams.set('sort',          'date,asc');
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  try {
    const res  = await fetch(url.toString());
    if (!res.ok) return [];
    const json = await res.json();
    const events = (json._embedded?.events || []).map(_parseTMEvent);
    try {
      localStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), data: events }));
    } catch {}
    return events;
  } catch {
    return [];
  }
};

// ── Parse a TM event into a display-friendly object ───────────────────────────
function _parseTMEvent(ev) {
  const venue  = ev._embedded?.venues?.[0];
  const prices = ev.priceRanges?.[0];
  const date   = ev.dates?.start?.localDate || '';
  const [y, m, d] = date.split('-').map(Number);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  return {
    id:       ev.id,
    name:     ev.name,
    date,
    dateLabel: date ? `${months[m - 1]} ${d}, ${y}` : 'TBD',
    time:     ev.dates?.start?.localTime?.slice(0, 5) || '',
    venue:    venue
      ? `${venue.name} · ${venue.city?.name}, ${venue.state?.stateCode}`
      : '',
    minPrice: prices?.min  ?? null,
    maxPrice: prices?.max  ?? null,
    url:      ev.url || 'https://www.ticketmaster.com',
    image:    ev.images?.find(i => i.ratio === '16_9' && i.width > 500)?.url || '',
  };
}
