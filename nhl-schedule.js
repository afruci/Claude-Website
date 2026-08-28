'use strict';

const NHL_VENUES = {
  'Boston Bruins':         'TD Garden · Boston, MA',
  'Buffalo Sabres':        'KeyBank Center · Buffalo, NY',
  'Detroit Red Wings':     'Little Caesars Arena · Detroit, MI',
  'Florida Panthers':      'Amerant Bank Arena · Sunrise, FL',
  'Montreal Canadiens':    'Bell Centre · Montreal, QC',
  'Ottawa Senators':       'Canadian Tire Centre · Ottawa, ON',
  'Tampa Bay Lightning':   'Amalie Arena · Tampa, FL',
  'Toronto Maple Leafs':   'Scotiabank Arena · Toronto, ON',
  'Carolina Hurricanes':   'PNC Arena · Raleigh, NC',
  'Columbus Blue Jackets': 'Nationwide Arena · Columbus, OH',
  'New Jersey Devils':     'Prudential Center · Newark, NJ',
  'New York Islanders':    'UBS Arena · Elmont, NY',
  'New York Rangers':      'Madison Square Garden · New York, NY',
  'Philadelphia Flyers':   'Wells Fargo Center · Philadelphia, PA',
  'Pittsburgh Penguins':   'PPG Paints Arena · Pittsburgh, PA',
  'Washington Capitals':   'Capital One Arena · Washington, DC',
  'Chicago Blackhawks':    'United Center · Chicago, IL',
  'Colorado Avalanche':    'Ball Arena · Denver, CO',
  'Dallas Stars':          'American Airlines Center · Dallas, TX',
  'Minnesota Wild':        'Xcel Energy Center · St. Paul, MN',
  'Nashville Predators':   'Bridgestone Arena · Nashville, TN',
  'St. Louis Blues':       'Enterprise Center · St. Louis, MO',
  'Utah Hockey Club':      'Delta Center · Salt Lake City, UT',
  'Winnipeg Jets':         'Canada Life Centre · Winnipeg, MB',
  'Anaheim Ducks':         'Honda Center · Anaheim, CA',
  'Calgary Flames':        'Scotiabank Saddledome · Calgary, AB',
  'Edmonton Oilers':       'Rogers Place · Edmonton, AB',
  'Los Angeles Kings':     'Crypto.com Arena · Los Angeles, CA',
  'San Jose Sharks':       'SAP Center · San Jose, CA',
  'Seattle Kraken':        'Climate Pledge Arena · Seattle, WA',
  'Vancouver Canucks':     'Rogers Arena · Vancouver, BC',
  'Vegas Golden Knights':  'T-Mobile Arena · Las Vegas, NV',
};

const NHL_VENUE_KEYS = {
  'Boston Bruins':         'td_garden',
  'Buffalo Sabres':        'keybank_center',
  'Detroit Red Wings':     'little_caesars_arena',
  'Florida Panthers':      'amerant_bank_arena',
  'Montreal Canadiens':    'bell_centre',
  'Ottawa Senators':       'canadian_tire_centre',
  'Tampa Bay Lightning':   'amalie_arena',
  'Toronto Maple Leafs':   'scotiabank_arena',
  'Carolina Hurricanes':   'pnc_arena',
  'Columbus Blue Jackets': 'nationwide_arena',
  'New Jersey Devils':     'prudential_center',
  'New York Islanders':    'ubs_arena',
  'New York Rangers':      'msg',
  'Philadelphia Flyers':   'wells_fargo_center',
  'Pittsburgh Penguins':   'ppg_paints_arena',
  'Washington Capitals':   'capital_one_arena',
  'Chicago Blackhawks':    'united_center',
  'Colorado Avalanche':    'ball_arena',
  'Dallas Stars':          'american_airlines_center',
  'Minnesota Wild':        'xcel_energy_center',
  'Nashville Predators':   'bridgestone_arena',
  'St. Louis Blues':       'enterprise_center',
  'Utah Hockey Club':      'delta_center',
  'Winnipeg Jets':         'canada_life_centre',
  'Anaheim Ducks':         'honda_center',
  'Calgary Flames':        'scotiabank_saddledome',
  'Edmonton Oilers':       'rogers_place',
  'Los Angeles Kings':     'cryptodotcom_arena',
  'San Jose Sharks':       'sap_center',
  'Seattle Kraken':        'climate_pledge_arena',
  'Vancouver Canucks':     'rogers_arena',
  'Vegas Golden Knights':  't_mobile_arena',
};

const NHL_MARKET = {
  'Toronto Maple Leafs':   1.65,
  'New York Rangers':      1.55,
  'Boston Bruins':         1.48,
  'Montreal Canadiens':    1.42,
  'Vegas Golden Knights':  1.38,
  'Colorado Avalanche':    1.35,
  'Tampa Bay Lightning':   1.30,
  'Edmonton Oilers':       1.28,
  'Pittsburgh Penguins':   1.25,
  'Chicago Blackhawks':    1.22,
  'Washington Capitals':   1.20,
  'Detroit Red Wings':     1.18,
  'Vancouver Canucks':     1.18,
  'Philadelphia Flyers':   1.15,
  'Dallas Stars':          1.15,
  'Carolina Hurricanes':   1.12,
  'New Jersey Devils':     1.10,
  'Minnesota Wild':        1.08,
  'Calgary Flames':        1.08,
  'Florida Panthers':      1.05,
  'St. Louis Blues':       1.05,
  'Los Angeles Kings':     1.05,
  'Seattle Kraken':        1.05,
  'New York Islanders':    1.02,
  'Nashville Predators':   1.00,
  'Winnipeg Jets':         1.00,
  'Buffalo Sabres':        0.95,
  'Utah Hockey Club':      0.95,
  'Columbus Blue Jackets': 0.90,
  'Ottawa Senators':       0.90,
  'Anaheim Ducks':         0.88,
  'San Jose Sharks':       0.88,
};

// round: 0=regular season, 1=first round playoffs, 2=second round, 3=conference finals
function nhlPrices(home, away, round) {
  const hp = NHL_MARKET[home] || 1.0;
  const ap = NHL_MARKET[away] || 1.0;
  const rm = round === 3 ? 1.60 : round === 2 ? 1.40 : round === 1 ? 1.22 : 1.0;
  const base = Math.round(145 * (hp * 0.6 + ap * 0.4) * rm);
  const sh = Math.round(base * 0.94);
  const sg = Math.round(base * 0.88);
  return [
    { platform:'Ticketmaster', base, fees: Math.round(base * 0.17) },
    { platform:'StubHub',      base: sh, fees: Math.round(sh * 0.15) },
    { platform:'SeatGeek',     base: sg, fees: Math.round(sg * 0.13) },
  ];
}

// ── Full 82-game regular-season generator (1,312 total games, round=0 only) ──
// Per-team breakdown:
//   4 games × 7 division rivals                           = 28  (2H+2A each)
//   3 games × 6 same-conf non-div rivals (cyclic)         = 18  (3H+3A balanced)
//   2 games × 2 same-conf non-div rivals (cyclic)         =  4  (1H+1A each)
//   2 games × 16 cross-conf rivals                        = 32  (1H+1A each)
//   Total: 28 + 22 + 32 = 82 ✓   Home: 14 + 9 + 2 + 16 = 41 ✓
// [home, away, date, round]  — all entries have round=0 (regular season)
const NHL_RAW = (function generateNHLSchedule() {
  // 4 divisions of 8 teams each (division index within div = 0-7)
  const DIVS = {
    atlantic:     ['Boston Bruins',       'Buffalo Sabres',        'Detroit Red Wings',    'Florida Panthers',
                   'Montreal Canadiens',  'Ottawa Senators',       'Tampa Bay Lightning',  'Toronto Maple Leafs'],
    metropolitan: ['Carolina Hurricanes', 'Columbus Blue Jackets', 'New Jersey Devils',    'New York Islanders',
                   'New York Rangers',    'Philadelphia Flyers',   'Pittsburgh Penguins',  'Washington Capitals'],
    central:      ['Chicago Blackhawks',  'Colorado Avalanche',    'Dallas Stars',         'Minnesota Wild',
                   'Nashville Predators', 'St. Louis Blues',       'Utah Hockey Club',     'Winnipeg Jets'],
    pacific:      ['Anaheim Ducks',       'Calgary Flames',        'Edmonton Oilers',      'Los Angeles Kings',
                   'San Jose Sharks',     'Seattle Kraken',        'Vancouver Canucks',    'Vegas Golden Knights'],
  };
  const EAST = new Set(['atlantic', 'metropolitan']);

  const META = {};
  for (const [div, teams] of Object.entries(DIVS)) {
    teams.forEach((t, i) => { META[t] = { div, idx: i, conf: EAST.has(div) ? 'east' : 'west' }; });
  }
  const ALL = Object.values(DIVS).flat(); // length 32

  // ── Game count ────────────────────────────────────────────────────────────
  // same-div → 4; cross-conf → 2; same-conf diff-div:
  //   2-game when (ia + ib) % 8 ≥ 6 (gives each team exactly 2 of 8 non-div conf opponents at 2-game)
  //   3-game otherwise (gives each team 6 of 8)
  function gCount(ma, mb) {
    if (ma.div === mb.div) return 4;
    if (ma.conf !== mb.conf) return 2;
    return ((ma.idx + mb.idx) % 8 >= 6) ? 2 : 3;
  }

  // ── Home/away split ────────────────────────────────────────────────────────
  // n=4: 2H+2A; n=2: 1H+1A; n=3 (only for same-conf non-div):
  //   aHome=2 when (ia+ib)%8 < 3 → gives each team exactly 3 of 6 three-game
  //   non-div conf opponents where they host 2 (and 3 where they host 1) → net 9H ✓
  function aHome(n, ia, ib) {
    if (n === 4) return 2;
    if (n === 2) return 1;
    return ((ia + ib) % 8 < 3) ? 2 : 1;
  }

  // ── Build all [home, away, round=0] raw pairs ────────────────────────────
  const pairs = [];
  for (let i = 0; i < ALL.length; i++) {
    for (let j = i + 1; j < ALL.length; j++) {
      const a = ALL[i], b = ALL[j];
      const ma = META[a], mb = META[b];
      const n  = gCount(ma, mb);
      const ah = aHome(n, ma.idx, mb.idx);
      const bh = n - ah;
      for (let k = 0; k < ah; k++) pairs.push([a, b, 0]);
      for (let k = 0; k < bh; k++) pairs.push([b, a, 0]);
    }
  }
  // pairs.length === 1,312 (32×82/2)

  // ── Date distribution ─────────────────────────────────────────────────────
  // Regular season: Oct 7, 2026 – Apr 18, 2027, skip All-Star break Feb 6-9.
  const START   = new Date('2026-10-07');
  const END     = new Date('2027-04-18');
  const ASB_S   = new Date('2027-02-06');
  const ASB_E   = new Date('2027-02-09');
  const MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const fmt = d => `${MON[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

  const dates = [];
  for (let d = new Date(START); d <= END; d.setDate(d.getDate() + 1)) {
    if (!(d >= ASB_S && d <= ASB_E)) dates.push(new Date(d));
  }
  // ~190 dates; 1,312/190 ≈ 6.9 games/day — matches real NHL cadence

  // Deterministic seeded shuffle for stable output
  function shuffle(arr) {
    let s = 73;
    const rng = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 0x100000000; };
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const shuffled = shuffle(pairs);
  const total    = shuffled.length;
  const games    = shuffled.map(([home, away, round], i) => {
    const di = Math.floor(i * dates.length / total);
    return [home, away, fmt(dates[di]), round];
  });

  games.sort((a, b) => new Date(a[2]) - new Date(b[2]));
  return games;
})();

/* ── Legacy static schedule (replaced by generator above) ──────────────────
const _NHL_RAW_LEGACY = [
  // ── Regular Season — October 2025 ────────────────────────────────────────────
  ['Boston Bruins','Toronto Maple Leafs','Oct 9, 2025',0],
  ['New York Rangers','New Jersey Devils','Oct 9, 2025',0],
  ['Tampa Bay Lightning','Florida Panthers','Oct 10, 2025',0],
  ['Colorado Avalanche','Vegas Golden Knights','Oct 10, 2025',0],
  ['Edmonton Oilers','Calgary Flames','Oct 11, 2025',0],
  ['Washington Capitals','Pittsburgh Penguins','Oct 11, 2025',0],
  ['Carolina Hurricanes','Philadelphia Flyers','Oct 14, 2025',0],
  ['Montreal Canadiens','Ottawa Senators','Oct 14, 2025',0],
  ['Minnesota Wild','Winnipeg Jets','Oct 14, 2025',0],
  ['Dallas Stars','Nashville Predators','Oct 14, 2025',0],
  ['Vancouver Canucks','Seattle Kraken','Oct 15, 2025',0],
  ['Los Angeles Kings','Anaheim Ducks','Oct 15, 2025',0],
  ['New York Islanders','New York Rangers','Oct 16, 2025',0],
  ['Detroit Red Wings','Buffalo Sabres','Oct 16, 2025',0],
  ['St. Louis Blues','Chicago Blackhawks','Oct 16, 2025',0],
  ['Utah Hockey Club','San Jose Sharks','Oct 16, 2025',0],
  ['Boston Bruins','Montreal Canadiens','Oct 18, 2025',0],
  ['Tampa Bay Lightning','Carolina Hurricanes','Oct 18, 2025',0],
  ['Colorado Avalanche','Dallas Stars','Oct 18, 2025',0],
  ['Toronto Maple Leafs','Ottawa Senators','Oct 19, 2025',0],
  ['Pittsburgh Penguins','Washington Capitals','Oct 19, 2025',0],
  ['Edmonton Oilers','Vancouver Canucks','Oct 19, 2025',0],
  ['Vegas Golden Knights','Los Angeles Kings','Oct 19, 2025',0],
  ['Columbus Blue Jackets','Detroit Red Wings','Oct 21, 2025',0],
  ['New Jersey Devils','Philadelphia Flyers','Oct 21, 2025',0],
  ['Minnesota Wild','Chicago Blackhawks','Oct 21, 2025',0],
  ['Nashville Predators','St. Louis Blues','Oct 23, 2025',0],
  ['Winnipeg Jets','Calgary Flames','Oct 23, 2025',0],
  ['Seattle Kraken','Anaheim Ducks','Oct 23, 2025',0],
  ['Florida Panthers','Tampa Bay Lightning','Oct 25, 2025',0],
  // ── Regular Season — November 2025 ───────────────────────────────────────────
  ['New York Rangers','Boston Bruins','Nov 1, 2025',0],
  ['Toronto Maple Leafs','Detroit Red Wings','Nov 1, 2025',0],
  ['Carolina Hurricanes','Washington Capitals','Nov 1, 2025',0],
  ['Colorado Avalanche','Minnesota Wild','Nov 1, 2025',0],
  ['Vegas Golden Knights','Utah Hockey Club','Nov 2, 2025',0],
  ['Edmonton Oilers','Seattle Kraken','Nov 2, 2025',0],
  ['Pittsburgh Penguins','New York Islanders','Nov 4, 2025',0],
  ['Montreal Canadiens','Buffalo Sabres','Nov 4, 2025',0],
  ['Dallas Stars','St. Louis Blues','Nov 4, 2025',0],
  ['Tampa Bay Lightning','Nashville Predators','Nov 6, 2025',0],
  ['Vancouver Canucks','Calgary Flames','Nov 8, 2025',0],
  ['Los Angeles Kings','San Jose Sharks','Nov 8, 2025',0],
  ['Washington Capitals','New Jersey Devils','Nov 8, 2025',0],
  ['Florida Panthers','Ottawa Senators','Nov 11, 2025',0],
  ['Chicago Blackhawks','Detroit Red Wings','Nov 11, 2025',0],
  ['Winnipeg Jets','Minnesota Wild','Nov 13, 2025',0],
  ['Boston Bruins','Philadelphia Flyers','Nov 15, 2025',0],
  ['New York Rangers','Pittsburgh Penguins','Nov 15, 2025',0],
  ['Colorado Avalanche','Nashville Predators','Nov 15, 2025',0],
  ['Edmonton Oilers','Vegas Golden Knights','Nov 16, 2025',0],
  ['Toronto Maple Leafs','Montreal Canadiens','Nov 18, 2025',0],
  ['Carolina Hurricanes','Tampa Bay Lightning','Nov 20, 2025',0],
  ['Seattle Kraken','Vancouver Canucks','Nov 20, 2025',0],
  ['Utah Hockey Club','Dallas Stars','Nov 22, 2025',0],
  ['New Jersey Devils','New York Rangers','Nov 22, 2025',0],
  ['St. Louis Blues','Winnipeg Jets','Nov 25, 2025',0],
  ['Anaheim Ducks','Los Angeles Kings','Nov 25, 2025',0],
  ['Buffalo Sabres','Ottawa Senators','Nov 27, 2025',0],
  ['Boston Bruins','Detroit Red Wings','Nov 29, 2025',0],
  ['Tampa Bay Lightning','Florida Panthers','Nov 29, 2025',0],
  // ── Regular Season — December 2025 ───────────────────────────────────────────
  ['New York Rangers','Washington Capitals','Dec 2, 2025',0],
  ['Colorado Avalanche','Utah Hockey Club','Dec 2, 2025',0],
  ['Toronto Maple Leafs','Boston Bruins','Dec 6, 2025',0],
  ['Carolina Hurricanes','Pittsburgh Penguins','Dec 6, 2025',0],
  ['Minnesota Wild','Dallas Stars','Dec 6, 2025',0],
  ['Vegas Golden Knights','Seattle Kraken','Dec 6, 2025',0],
  ['Edmonton Oilers','Calgary Flames','Dec 9, 2025',0],
  ['Montreal Canadiens','New York Rangers','Dec 9, 2025',0],
  ['Nashville Predators','Tampa Bay Lightning','Dec 11, 2025',0],
  ['Los Angeles Kings','Vegas Golden Knights','Dec 13, 2025',0],
  ['Washington Capitals','Carolina Hurricanes','Dec 13, 2025',0],
  ['Winnipeg Jets','Colorado Avalanche','Dec 16, 2025',0],
  ['Philadelphia Flyers','New York Islanders','Dec 16, 2025',0],
  ['Detroit Red Wings','Columbus Blue Jackets','Dec 18, 2025',0],
  ['Florida Panthers','Montreal Canadiens','Dec 20, 2025',0],
  ['Toronto Maple Leafs','New York Rangers','Dec 20, 2025',0],
  ['Vancouver Canucks','Edmonton Oilers','Dec 23, 2025',0],
  ['Boston Bruins','Ottawa Senators','Dec 27, 2025',0],
  ['Tampa Bay Lightning','Carolina Hurricanes','Dec 27, 2025',0],
  ['Colorado Avalanche','St. Louis Blues','Dec 27, 2025',0],
  ['Vegas Golden Knights','Anaheim Ducks','Dec 27, 2025',0],
  ['Pittsburgh Penguins','Philadelphia Flyers','Dec 29, 2025',0],
  ['New Jersey Devils','Washington Capitals','Dec 29, 2025',0],
  // ── Regular Season — January 2026 ────────────────────────────────────────────
  ['Toronto Maple Leafs','Buffalo Sabres','Jan 3, 2026',0],
  ['New York Rangers','New York Islanders','Jan 3, 2026',0],
  ['Dallas Stars','Colorado Avalanche','Jan 3, 2026',0],
  ['Calgary Flames','Edmonton Oilers','Jan 3, 2026',0],
  ['Minnesota Wild','Winnipeg Jets','Jan 6, 2026',0],
  ['Boston Bruins','Tampa Bay Lightning','Jan 8, 2026',0],
  ['Carolina Hurricanes','New Jersey Devils','Jan 8, 2026',0],
  ['Seattle Kraken','Vegas Golden Knights','Jan 8, 2026',0],
  ['Detroit Red Wings','Toronto Maple Leafs','Jan 10, 2026',0],
  ['Florida Panthers','Washington Capitals','Jan 10, 2026',0],
  ['Nashville Predators','Dallas Stars','Jan 13, 2026',0],
  ['Utah Hockey Club','Colorado Avalanche','Jan 13, 2026',0],
  ['Los Angeles Kings','Vancouver Canucks','Jan 15, 2026',0],
  ['Ottawa Senators','Montreal Canadiens','Jan 17, 2026',0],
  ['Pittsburgh Penguins','Boston Bruins','Jan 17, 2026',0],
  ['Philadelphia Flyers','Carolina Hurricanes','Jan 17, 2026',0],
  ['St. Louis Blues','Nashville Predators','Jan 20, 2026',0],
  ['Edmonton Oilers','Winnipeg Jets','Jan 22, 2026',0],
  ['New York Rangers','Philadelphia Flyers','Jan 24, 2026',0],
  ['Tampa Bay Lightning','Pittsburgh Penguins','Jan 24, 2026',0],
  ['Colorado Avalanche','Calgary Flames','Jan 27, 2026',0],
  ['Vegas Golden Knights','Dallas Stars','Jan 29, 2026',0],
  // ── Regular Season — February 2026 ───────────────────────────────────────────
  ['Boston Bruins','Carolina Hurricanes','Feb 3, 2026',0],
  ['Toronto Maple Leafs','Florida Panthers','Feb 3, 2026',0],
  ['Minnesota Wild','Colorado Avalanche','Feb 5, 2026',0],
  ['New York Rangers','Pittsburgh Penguins','Feb 7, 2026',0],
  ['Washington Capitals','Tampa Bay Lightning','Feb 7, 2026',0],
  ['Edmonton Oilers','Los Angeles Kings','Feb 10, 2026',0],
  ['Vancouver Canucks','Seattle Kraken','Feb 10, 2026',0],
  ['Carolina Hurricanes','Boston Bruins','Feb 12, 2026',0],
  ['New Jersey Devils','New York Islanders','Feb 14, 2026',0],
  ['Dallas Stars','Winnipeg Jets','Feb 14, 2026',0],
  ['Calgary Flames','Vegas Golden Knights','Feb 17, 2026',0],
  ['Toronto Maple Leafs','Ottawa Senators','Feb 19, 2026',0],
  ['Philadelphia Flyers','Pittsburgh Penguins','Feb 21, 2026',0],
  ['St. Louis Blues','Minnesota Wild','Feb 21, 2026',0],
  ['Tampa Bay Lightning','New York Rangers','Feb 24, 2026',0],
  ['Colorado Avalanche','Edmonton Oilers','Feb 26, 2026',0],
  // ── Regular Season — March 2026 ──────────────────────────────────────────────
  ['Boston Bruins','Montreal Canadiens','Mar 3, 2026',0],
  ['Florida Panthers','Carolina Hurricanes','Mar 3, 2026',0],
  ['New York Rangers','Washington Capitals','Mar 5, 2026',0],
  ['Toronto Maple Leafs','Tampa Bay Lightning','Mar 7, 2026',0],
  ['Minnesota Wild','St. Louis Blues','Mar 7, 2026',0],
  ['Vegas Golden Knights','Colorado Avalanche','Mar 7, 2026',0],
  ['Pittsburgh Penguins','Carolina Hurricanes','Mar 10, 2026',0],
  ['New Jersey Devils','Philadelphia Flyers','Mar 12, 2026',0],
  ['Edmonton Oilers','Vancouver Canucks','Mar 14, 2026',0],
  ['Dallas Stars','Utah Hockey Club','Mar 14, 2026',0],
  ['Detroit Red Wings','Buffalo Sabres','Mar 17, 2026',0],
  ['Washington Capitals','New York Rangers','Mar 19, 2026',0],
  ['Carolina Hurricanes','Tampa Bay Lightning','Mar 21, 2026',0],
  ['Colorado Avalanche','Winnipeg Jets','Mar 21, 2026',0],
  ['Boston Bruins','New York Islanders','Mar 24, 2026',0],
  ['Nashville Predators','Colorado Avalanche','Mar 26, 2026',0],
  ['Toronto Maple Leafs','Carolina Hurricanes','Mar 28, 2026',0],
  ['Vegas Golden Knights','Los Angeles Kings','Mar 28, 2026',0],
  // ── Regular Season — April 2026 ──────────────────────────────────────────────
  ['Tampa Bay Lightning','Boston Bruins','Apr 2, 2026',0],
  ['New York Rangers','Carolina Hurricanes','Apr 4, 2026',0],
  ['Colorado Avalanche','Dallas Stars','Apr 4, 2026',0],
  ['Edmonton Oilers','Seattle Kraken','Apr 4, 2026',0],
  ['Toronto Maple Leafs','Montreal Canadiens','Apr 9, 2026',0],
  ['Florida Panthers','Carolina Hurricanes','Apr 9, 2026',0],
  ['Tampa Bay Lightning','Washington Capitals','Apr 9, 2026',0],
  ['Colorado Avalanche','Vegas Golden Knights','Apr 11, 2026',0],
  ['Boston Bruins','Toronto Maple Leafs','Apr 14, 2026',0],
  ['Carolina Hurricanes','New York Rangers','Apr 14, 2026',0],
  ['Dallas Stars','Minnesota Wild','Apr 16, 2026',0],
  ['Edmonton Oilers','Calgary Flames','Apr 16, 2026',0],
  // ── Playoffs Round 1 (First Round) ───────────────────────────────────────────
  // East: (1) Tampa Bay vs (8) Ottawa | (2) Carolina vs (7) NY Islanders
  //       (3) Boston vs (6) Washington | (4) Toronto vs (5) Florida
  // West: (1) Colorado vs (8) Nashville | (2) Vegas vs (7) Winnipeg
  //       (3) Dallas vs (6) Minnesota | (4) Edmonton vs (5) Seattle
  ['Tampa Bay Lightning','Ottawa Senators','Apr 21, 2026',1],
  ['Tampa Bay Lightning','Ottawa Senators','Apr 23, 2026',1],
  ['Ottawa Senators','Tampa Bay Lightning','Apr 26, 2026',1],
  ['Ottawa Senators','Tampa Bay Lightning','Apr 28, 2026',1],
  ['Tampa Bay Lightning','Ottawa Senators','Apr 30, 2026',1],
  ['Carolina Hurricanes','New York Islanders','Apr 21, 2026',1],
  ['Carolina Hurricanes','New York Islanders','Apr 23, 2026',1],
  ['New York Islanders','Carolina Hurricanes','Apr 26, 2026',1],
  ['New York Islanders','Carolina Hurricanes','Apr 28, 2026',1],
  ['Carolina Hurricanes','New York Islanders','Apr 30, 2026',1],
  ['Boston Bruins','Washington Capitals','Apr 22, 2026',1],
  ['Boston Bruins','Washington Capitals','Apr 24, 2026',1],
  ['Washington Capitals','Boston Bruins','Apr 27, 2026',1],
  ['Washington Capitals','Boston Bruins','Apr 29, 2026',1],
  ['Boston Bruins','Washington Capitals','May 1, 2026',1],
  ['Toronto Maple Leafs','Florida Panthers','Apr 22, 2026',1],
  ['Toronto Maple Leafs','Florida Panthers','Apr 24, 2026',1],
  ['Florida Panthers','Toronto Maple Leafs','Apr 27, 2026',1],
  ['Florida Panthers','Toronto Maple Leafs','Apr 29, 2026',1],
  ['Toronto Maple Leafs','Florida Panthers','May 1, 2026',1],
  ['Colorado Avalanche','Nashville Predators','Apr 20, 2026',1],
  ['Colorado Avalanche','Nashville Predators','Apr 22, 2026',1],
  ['Nashville Predators','Colorado Avalanche','Apr 25, 2026',1],
  ['Nashville Predators','Colorado Avalanche','Apr 27, 2026',1],
  ['Colorado Avalanche','Nashville Predators','Apr 29, 2026',1],
  ['Vegas Golden Knights','Winnipeg Jets','Apr 20, 2026',1],
  ['Vegas Golden Knights','Winnipeg Jets','Apr 22, 2026',1],
  ['Winnipeg Jets','Vegas Golden Knights','Apr 25, 2026',1],
  ['Winnipeg Jets','Vegas Golden Knights','Apr 27, 2026',1],
  ['Vegas Golden Knights','Winnipeg Jets','Apr 30, 2026',1],
  ['Dallas Stars','Minnesota Wild','Apr 21, 2026',1],
  ['Dallas Stars','Minnesota Wild','Apr 23, 2026',1],
  ['Minnesota Wild','Dallas Stars','Apr 26, 2026',1],
  ['Dallas Stars','Minnesota Wild','Apr 30, 2026',1],
  ['Edmonton Oilers','Seattle Kraken','Apr 21, 2026',1],
  ['Edmonton Oilers','Seattle Kraken','Apr 23, 2026',1],
  ['Seattle Kraken','Edmonton Oilers','Apr 26, 2026',1],
  ['Seattle Kraken','Edmonton Oilers','Apr 28, 2026',1],
  ['Edmonton Oilers','Seattle Kraken','Apr 30, 2026',1],
  // ── Playoffs Round 2 (Second Round) ──────────────────────────────────────────
  // East: Tampa Bay vs Carolina | Boston vs Toronto
  // West: Colorado vs Vegas | Edmonton vs Dallas
  ['Tampa Bay Lightning','Carolina Hurricanes','May 6, 2026',2],
  ['Tampa Bay Lightning','Carolina Hurricanes','May 8, 2026',2],
  ['Carolina Hurricanes','Tampa Bay Lightning','May 11, 2026',2],
  ['Carolina Hurricanes','Tampa Bay Lightning','May 13, 2026',2],
  ['Tampa Bay Lightning','Carolina Hurricanes','May 15, 2026',2],
  ['Carolina Hurricanes','Tampa Bay Lightning','May 17, 2026',2],
  ['Toronto Maple Leafs','Boston Bruins','May 6, 2026',2],
  ['Toronto Maple Leafs','Boston Bruins','May 8, 2026',2],
  ['Boston Bruins','Toronto Maple Leafs','May 11, 2026',2],
  ['Boston Bruins','Toronto Maple Leafs','May 13, 2026',2],
  ['Toronto Maple Leafs','Boston Bruins','May 16, 2026',2],
  ['Colorado Avalanche','Vegas Golden Knights','May 5, 2026',2],
  ['Colorado Avalanche','Vegas Golden Knights','May 7, 2026',2],
  ['Vegas Golden Knights','Colorado Avalanche','May 10, 2026',2],
  ['Vegas Golden Knights','Colorado Avalanche','May 12, 2026',2],
  ['Colorado Avalanche','Vegas Golden Knights','May 14, 2026',2],
  ['Edmonton Oilers','Dallas Stars','May 5, 2026',2],
  ['Edmonton Oilers','Dallas Stars','May 7, 2026',2],
  ['Dallas Stars','Edmonton Oilers','May 10, 2026',2],
  ['Dallas Stars','Edmonton Oilers','May 12, 2026',2],
  ['Edmonton Oilers','Dallas Stars','May 15, 2026',2],
  // ── Conference Finals ─────────────────────────────────────────────────────────
  // East Finals: Tampa Bay Lightning vs Toronto Maple Leafs (Tampa wins, goes to Finals)
  // West Finals: Colorado Avalanche vs Edmonton Oilers (Colorado wins, goes to Finals)
  ['Tampa Bay Lightning','Toronto Maple Leafs','May 20, 2026',3],
  ['Tampa Bay Lightning','Toronto Maple Leafs','May 22, 2026',3],
  ['Toronto Maple Leafs','Tampa Bay Lightning','May 25, 2026',3],
  ['Toronto Maple Leafs','Tampa Bay Lightning','May 27, 2026',3],
  ['Tampa Bay Lightning','Toronto Maple Leafs','May 29, 2026',3],
  ['Colorado Avalanche','Edmonton Oilers','May 19, 2026',3],
  ['Colorado Avalanche','Edmonton Oilers','May 21, 2026',3],
  ['Edmonton Oilers','Colorado Avalanche','May 24, 2026',3],
  ['Edmonton Oilers','Colorado Avalanche','May 26, 2026',3],
  ['Colorado Avalanche','Edmonton Oilers','May 28, 2026',3],
  // NOTE: Stanley Cup Finals Game 1 (Tampa Bay vs Colorado, Jun 1) is in events-data.js (id:2)

  // ── 2026-27 Regular Season — October 2026 ────────────────────────────────────
  ['Toronto Maple Leafs',   'Boston Bruins',          'Oct 8, 2026',  0],
  ['New York Rangers',      'New Jersey Devils',       'Oct 8, 2026',  0],
  ['Colorado Avalanche',    'Vegas Golden Knights',    'Oct 9, 2026',  0],
  ['Tampa Bay Lightning',   'Florida Panthers',        'Oct 9, 2026',  0],
  ['Edmonton Oilers',       'Calgary Flames',          'Oct 10, 2026', 0],
  ['Washington Capitals',   'Pittsburgh Penguins',     'Oct 10, 2026', 0],
  ['Boston Bruins',         'Montreal Canadiens',      'Oct 14, 2026', 0],
  ['Minnesota Wild',        'Winnipeg Jets',           'Oct 14, 2026', 0],
  ['Dallas Stars',          'Nashville Predators',     'Oct 14, 2026', 0],
  ['Vancouver Canucks',     'Seattle Kraken',          'Oct 15, 2026', 0],
  ['Los Angeles Kings',     'Anaheim Ducks',           'Oct 15, 2026', 0],
  ['Carolina Hurricanes',   'Philadelphia Flyers',     'Oct 16, 2026', 0],
  ['New York Islanders',    'New York Rangers',        'Oct 16, 2026', 0],
  ['St. Louis Blues',       'Utah Hockey Club',        'Oct 16, 2026', 0],
  ['Pittsburgh Penguins',   'Washington Capitals',     'Oct 17, 2026', 0],
  ['Montreal Canadiens',    'Toronto Maple Leafs',     'Oct 17, 2026', 0],
  ['Vegas Golden Knights',  'Los Angeles Kings',       'Oct 18, 2026', 0],
  ['Ottawa Senators',       'Detroit Red Wings',       'Oct 18, 2026', 0],
  ['Calgary Flames',        'Edmonton Oilers',         'Oct 21, 2026', 0],
  ['Florida Panthers',      'Tampa Bay Lightning',     'Oct 21, 2026', 0],
  ['Columbus Blue Jackets', 'Carolina Hurricanes',     'Oct 22, 2026', 0],
  ['New Jersey Devils',     'Philadelphia Flyers',     'Oct 22, 2026', 0],
  ['Nashville Predators',   'St. Louis Blues',         'Oct 22, 2026', 0],
  ['Seattle Kraken',        'Vancouver Canucks',       'Oct 22, 2026', 0],
  ['Boston Bruins',         'Toronto Maple Leafs',     'Oct 24, 2026', 0],
  ['New York Rangers',      'New York Islanders',      'Oct 24, 2026', 0],
  ['Colorado Avalanche',    'Dallas Stars',            'Oct 24, 2026', 0],
  ['Vegas Golden Knights',  'Anaheim Ducks',           'Oct 25, 2026', 0],
  ['Winnipeg Jets',         'Minnesota Wild',          'Oct 25, 2026', 0],
  ['Washington Capitals',   'Pittsburgh Penguins',     'Oct 26, 2026', 0],
  ['Detroit Red Wings',     'Montreal Canadiens',      'Oct 27, 2026', 0],
  ['Tampa Bay Lightning',   'Carolina Hurricanes',     'Oct 28, 2026', 0],
  ['Utah Hockey Club',      'Colorado Avalanche',      'Oct 29, 2026', 0],
  ['Philadelphia Flyers',   'New Jersey Devils',       'Oct 29, 2026', 0],
  ['Edmonton Oilers',       'Vancouver Canucks',       'Oct 30, 2026', 0],
  ['Dallas Stars',          'St. Louis Blues',         'Oct 31, 2026', 0],

  // ── November 2026 ────────────────────────────────────────────────────────────
  ['Toronto Maple Leafs',   'Montreal Canadiens',      'Nov 3, 2026',  0],
  ['Vegas Golden Knights',  'Colorado Avalanche',      'Nov 3, 2026',  0],
  ['Carolina Hurricanes',   'Washington Capitals',     'Nov 4, 2026',  0],
  ['Boston Bruins',         'New York Rangers',        'Nov 5, 2026',  0],
  ['Chicago Blackhawks',    'Detroit Red Wings',       'Nov 5, 2026',  0],
  ['Calgary Flames',        'Vancouver Canucks',       'Nov 5, 2026',  0],
  ['Florida Panthers',      'New Jersey Devils',       'Nov 6, 2026',  0],
  ['Minnesota Wild',        'Dallas Stars',            'Nov 7, 2026',  0],
  ['Seattle Kraken',        'Edmonton Oilers',         'Nov 7, 2026',  0],
  ['Pittsburgh Penguins',   'Philadelphia Flyers',     'Nov 8, 2026',  0],
  ['Nashville Predators',   'Winnipeg Jets',           'Nov 8, 2026',  0],
  ['Los Angeles Kings',     'Vegas Golden Knights',    'Nov 9, 2026',  0],
  ['Montreal Canadiens',    'Ottawa Senators',         'Nov 10, 2026', 0],
  ['New York Islanders',    'New Jersey Devils',       'Nov 11, 2026', 0],
  ['Colorado Avalanche',    'Utah Hockey Club',        'Nov 11, 2026', 0],
  ['Edmonton Oilers',       'Calgary Flames',          'Nov 13, 2026', 0],
  ['Tampa Bay Lightning',   'Florida Panthers',        'Nov 14, 2026', 0],
  ['New York Rangers',      'Boston Bruins',           'Nov 15, 2026', 0],
  ['Washington Capitals',   'Carolina Hurricanes',     'Nov 15, 2026', 0],
  ['Dallas Stars',          'Colorado Avalanche',      'Nov 16, 2026', 0],
  ['Anaheim Ducks',         'Los Angeles Kings',       'Nov 17, 2026', 0],
  ['Vancouver Canucks',     'Seattle Kraken',          'Nov 17, 2026', 0],
  ['Detroit Red Wings',     'Toronto Maple Leafs',     'Nov 18, 2026', 0],
  ['St. Louis Blues',       'Nashville Predators',     'Nov 19, 2026', 0],
  ['Vegas Golden Knights',  'San Jose Sharks',         'Nov 20, 2026', 0],
  ['Philadelphia Flyers',   'Pittsburgh Penguins',     'Nov 21, 2026', 0],
  ['Buffalo Sabres',        'Ottawa Senators',         'Nov 22, 2026', 0],
  ['Minnesota Wild',        'Chicago Blackhawks',      'Nov 22, 2026', 0],
  ['Boston Bruins',         'Montreal Canadiens',      'Nov 25, 2026', 0],
  ['New Jersey Devils',     'New York Rangers',        'Nov 25, 2026', 0],
  ['Toronto Maple Leafs',   'Ottawa Senators',         'Nov 28, 2026', 0],
  ['Colorado Avalanche',    'Vegas Golden Knights',    'Nov 28, 2026', 0],
  ['Tampa Bay Lightning',   'Washington Capitals',     'Nov 29, 2026', 0],

  // ── December 2026 ────────────────────────────────────────────────────────────
  ['New York Rangers',      'Philadelphia Flyers',     'Dec 1, 2026',  0],
  ['Edmonton Oilers',       'Vancouver Canucks',       'Dec 2, 2026',  0],
  ['Carolina Hurricanes',   'Florida Panthers',        'Dec 3, 2026',  0],
  ['Minnesota Wild',        'St. Louis Blues',         'Dec 4, 2026',  0],
  ['Calgary Flames',        'Seattle Kraken',          'Dec 5, 2026',  0],
  ['Boston Bruins',         'Pittsburgh Penguins',     'Dec 6, 2026',  0],
  ['Montreal Canadiens',    'Detroit Red Wings',       'Dec 6, 2026',  0],
  ['Vegas Golden Knights',  'Colorado Avalanche',      'Dec 6, 2026',  0],
  ['Toronto Maple Leafs',   'Buffalo Sabres',          'Dec 8, 2026',  0],
  ['Dallas Stars',          'Nashville Predators',     'Dec 9, 2026',  0],
  ['Los Angeles Kings',     'Anaheim Ducks',           'Dec 10, 2026', 0],
  ['New York Islanders',    'New York Rangers',        'Dec 11, 2026', 0],
  ['Washington Capitals',   'Tampa Bay Lightning',     'Dec 12, 2026', 0],
  ['Columbus Blue Jackets', 'Pittsburgh Penguins',     'Dec 13, 2026', 0],
  ['Winnipeg Jets',         'Calgary Flames',          'Dec 13, 2026', 0],
  ['Utah Hockey Club',      'Vegas Golden Knights',    'Dec 14, 2026', 0],
  ['Seattle Kraken',        'Edmonton Oilers',         'Dec 15, 2026', 0],
  ['Philadelphia Flyers',   'New Jersey Devils',       'Dec 16, 2026', 0],
  ['Ottawa Senators',       'Montreal Canadiens',      'Dec 17, 2026', 0],
  ['Colorado Avalanche',    'Minnesota Wild',          'Dec 18, 2026', 0],
  ['Florida Panthers',      'Carolina Hurricanes',     'Dec 19, 2026', 0],
  ['Detroit Red Wings',     'Chicago Blackhawks',      'Dec 20, 2026', 0],
  ['San Jose Sharks',       'Los Angeles Kings',       'Dec 21, 2026', 0],
  ['Boston Bruins',         'Toronto Maple Leafs',     'Dec 23, 2026', 0],
  ['New York Rangers',      'Washington Capitals',     'Dec 27, 2026', 0],
  ['Edmonton Oilers',       'Calgary Flames',          'Dec 27, 2026', 0],
  ['Vegas Golden Knights',  'Dallas Stars',            'Dec 28, 2026', 0],
  ['Tampa Bay Lightning',   'Florida Panthers',        'Dec 29, 2026', 0],
  ['Colorado Avalanche',    'St. Louis Blues',         'Dec 30, 2026', 0],
  ['Vancouver Canucks',     'Seattle Kraken',          'Dec 31, 2026', 0],

  // ── January 2027 ─────────────────────────────────────────────────────────────
  // NOTE: NHL Winter Classic (Jan 1, 2027) is in events-data.js (id:10)
  ['Toronto Maple Leafs',   'New York Rangers',        'Jan 2, 2027',  0],
  ['Carolina Hurricanes',   'New Jersey Devils',       'Jan 3, 2027',  0],
  ['Minnesota Wild',        'Winnipeg Jets',           'Jan 4, 2027',  0],
  ['Los Angeles Kings',     'Vegas Golden Knights',    'Jan 5, 2027',  0],
  ['Nashville Predators',   'Dallas Stars',            'Jan 6, 2027',  0],
  ['Buffalo Sabres',        'Boston Bruins',           'Jan 7, 2027',  0],
  ['Pittsburgh Penguins',   'Washington Capitals',     'Jan 8, 2027',  0],
  ['Calgary Flames',        'Edmonton Oilers',         'Jan 9, 2027',  0],
  ['Philadelphia Flyers',   'Carolina Hurricanes',     'Jan 10, 2027', 0],
  ['Colorado Avalanche',    'Utah Hockey Club',        'Jan 11, 2027', 0],
  ['Ottawa Senators',       'Toronto Maple Leafs',     'Jan 12, 2027', 0],
  ['New York Islanders',    'New York Rangers',        'Jan 13, 2027', 0],
  ['Florida Panthers',      'Tampa Bay Lightning',     'Jan 14, 2027', 0],
  ['Vancouver Canucks',     'Calgary Flames',          'Jan 15, 2027', 0],
  ['St. Louis Blues',       'Chicago Blackhawks',      'Jan 16, 2027', 0],
  ['Detroit Red Wings',     'Columbus Blue Jackets',   'Jan 17, 2027', 0],
  ['Vegas Golden Knights',  'Anaheim Ducks',           'Jan 18, 2027', 0],
  ['Dallas Stars',          'Minnesota Wild',          'Jan 19, 2027', 0],
  ['New Jersey Devils',     'Philadelphia Flyers',     'Jan 21, 2027', 0],
  ['Boston Bruins',         'Buffalo Sabres',          'Jan 22, 2027', 0],
  ['Montreal Canadiens',    'Ottawa Senators',         'Jan 23, 2027', 0],
  ['Seattle Kraken',        'Vancouver Canucks',       'Jan 24, 2027', 0],
  ['Tampa Bay Lightning',   'Carolina Hurricanes',     'Jan 25, 2027', 0],
  ['Pittsburgh Penguins',   'New York Rangers',        'Jan 26, 2027', 0],
  ['Colorado Avalanche',    'Vegas Golden Knights',    'Jan 27, 2027', 0],
  ['Edmonton Oilers',       'Vancouver Canucks',       'Jan 28, 2027', 0],
  ['Toronto Maple Leafs',   'Detroit Red Wings',       'Jan 30, 2027', 0],

  // ── February 2027 ────────────────────────────────────────────────────────────
  ['Washington Capitals',   'Pittsburgh Penguins',     'Feb 2, 2027',  0],
  ['New York Rangers',      'Boston Bruins',           'Feb 3, 2027',  0],
  ['Calgary Flames',        'Vancouver Canucks',       'Feb 4, 2027',  0],
  ['Florida Panthers',      'Tampa Bay Lightning',     'Feb 5, 2027',  0],
  ['Colorado Avalanche',    'Dallas Stars',            'Feb 6, 2027',  0],
  ['Carolina Hurricanes',   'New Jersey Devils',       'Feb 7, 2027',  0],
  ['Vegas Golden Knights',  'Los Angeles Kings',       'Feb 8, 2027',  0],
  ['Minnesota Wild',        'St. Louis Blues',         'Feb 9, 2027',  0],
  ['Toronto Maple Leafs',   'Montreal Canadiens',      'Feb 12, 2027', 0],
  ['Philadelphia Flyers',   'Pittsburgh Penguins',     'Feb 13, 2027', 0],
  ['Nashville Predators',   'Winnipeg Jets',           'Feb 14, 2027', 0],
  ['Seattle Kraken',        'Edmonton Oilers',         'Feb 15, 2027', 0],
  ['New York Islanders',    'New Jersey Devils',       'Feb 16, 2027', 0],
  ['Dallas Stars',          'Colorado Avalanche',      'Feb 17, 2027', 0],
  ['Anaheim Ducks',         'Vegas Golden Knights',    'Feb 18, 2027', 0],
  ['Chicago Blackhawks',    'Detroit Red Wings',       'Feb 19, 2027', 0],
  ['Ottawa Senators',       'Buffalo Sabres',          'Feb 20, 2027', 0],
  ['Boston Bruins',         'Washington Capitals',     'Feb 22, 2027', 0],
  ['Tampa Bay Lightning',   'Florida Panthers',        'Feb 23, 2027', 0],
  ['Edmonton Oilers',       'Calgary Flames',          'Feb 24, 2027', 0],
  ['New York Rangers',      'New York Islanders',      'Feb 25, 2027', 0],
  ['St. Louis Blues',       'Nashville Predators',     'Feb 26, 2027', 0],
  ['Vancouver Canucks',     'Seattle Kraken',          'Feb 27, 2027', 0],

  // ── March 2027 ───────────────────────────────────────────────────────────────
  ['Montreal Canadiens',    'Toronto Maple Leafs',     'Mar 1, 2027',  0],
  ['New Jersey Devils',     'Carolina Hurricanes',     'Mar 2, 2027',  0],
  ['Colorado Avalanche',    'Vegas Golden Knights',    'Mar 3, 2027',  0],
  ['Pittsburgh Penguins',   'Washington Capitals',     'Mar 4, 2027',  0],
  ['Winnipeg Jets',         'Minnesota Wild',          'Mar 5, 2027',  0],
  ['Los Angeles Kings',     'San Jose Sharks',         'Mar 6, 2027',  0],
  ['Calgary Flames',        'Edmonton Oilers',         'Mar 7, 2027',  0],
  ['Boston Bruins',         'New York Rangers',        'Mar 8, 2027',  0],
  ['Florida Panthers',      'Carolina Hurricanes',     'Mar 9, 2027',  0],
  ['Toronto Maple Leafs',   'Ottawa Senators',         'Mar 10, 2027', 0],
  ['Vegas Golden Knights',  'Colorado Avalanche',      'Mar 11, 2027', 0],
  ['Dallas Stars',          'St. Louis Blues',         'Mar 12, 2027', 0],
  ['Tampa Bay Lightning',   'Washington Capitals',     'Mar 13, 2027', 0],
  ['Detroit Red Wings',     'Chicago Blackhawks',      'Mar 14, 2027', 0],
  ['New York Rangers',      'Philadelphia Flyers',     'Mar 15, 2027', 0],
  ['Vancouver Canucks',     'Calgary Flames',          'Mar 16, 2027', 0],
  ['Nashville Predators',   'Dallas Stars',            'Mar 17, 2027', 0],
  ['Boston Bruins',         'Pittsburgh Penguins',     'Mar 18, 2027', 0],
  ['Carolina Hurricanes',   'Washington Capitals',     'Mar 19, 2027', 0],
  ['Colorado Avalanche',    'Minnesota Wild',          'Mar 20, 2027', 0],
  ['Edmonton Oilers',       'Vancouver Canucks',       'Mar 21, 2027', 0],
  ['Toronto Maple Leafs',   'Boston Bruins',           'Mar 22, 2027', 0],
  ['New York Islanders',    'New York Rangers',        'Mar 23, 2027', 0],
  ['Florida Panthers',      'Tampa Bay Lightning',     'Mar 24, 2027', 0],
  ['Utah Hockey Club',      'Vegas Golden Knights',    'Mar 25, 2027', 0],
  ['St. Louis Blues',       'Winnipeg Jets',           'Mar 26, 2027', 0],
  ['Philadelphia Flyers',   'New Jersey Devils',       'Mar 27, 2027', 0],
  ['Montreal Canadiens',    'Ottawa Senators',         'Mar 28, 2027', 0],
  ['Seattle Kraken',        'Edmonton Oilers',         'Mar 29, 2027', 0],
  ['Colorado Avalanche',    'Dallas Stars',            'Mar 30, 2027', 0],
  ['Boston Bruins',         'Toronto Maple Leafs',     'Apr 1, 2027',  0],
  ['New York Rangers',      'Washington Capitals',     'Apr 2, 2027',  0],
  ['Vegas Golden Knights',  'Los Angeles Kings',       'Apr 3, 2027',  0],
  ['Calgary Flames',        'Vancouver Canucks',       'Apr 4, 2027',  0],
  ['Tampa Bay Lightning',   'Florida Panthers',        'Apr 5, 2027',  0],
  ['Carolina Hurricanes',   'Pittsburgh Penguins',     'Apr 6, 2027',  0],
  ['Colorado Avalanche',    'Utah Hockey Club',        'Apr 7, 2027',  0],
  ['Toronto Maple Leafs',   'Montreal Canadiens',      'Apr 9, 2027',  0],
  ['Edmonton Oilers',       'Calgary Flames',          'Apr 10, 2027', 0],
  ['Dallas Stars',          'Minnesota Wild',          'Apr 11, 2027', 0],
  ['New York Rangers',      'New Jersey Devils',       'Apr 13, 2027', 0],
  ['Vegas Golden Knights',  'Colorado Avalanche',      'Apr 14, 2027', 0],

  // ── 2027 Playoffs — First Round (Apr 19 - May 4) ─────────────────────────────
  ['Toronto Maple Leafs',   'Carolina Hurricanes',     'Apr 19, 2027', 1],
  ['Boston Bruins',         'Florida Panthers',        'Apr 19, 2027', 1],
  ['New York Rangers',      'Washington Capitals',     'Apr 20, 2027', 1],
  ['Tampa Bay Lightning',   'New Jersey Devils',       'Apr 20, 2027', 1],
  ['Colorado Avalanche',    'Minnesota Wild',          'Apr 21, 2027', 1],
  ['Vegas Golden Knights',  'Dallas Stars',            'Apr 21, 2027', 1],
  ['Edmonton Oilers',       'Seattle Kraken',          'Apr 22, 2027', 1],
  ['Calgary Flames',        'Vancouver Canucks',       'Apr 22, 2027', 1],
  ['Toronto Maple Leafs',   'Carolina Hurricanes',     'Apr 24, 2027', 1],
  ['Boston Bruins',         'Florida Panthers',        'Apr 25, 2027', 1],
  ['Colorado Avalanche',    'Minnesota Wild',          'Apr 26, 2027', 1],
  ['Vegas Golden Knights',  'Dallas Stars',            'Apr 27, 2027', 1],
  ['Edmonton Oilers',       'Seattle Kraken',          'Apr 28, 2027', 1],
  ['Toronto Maple Leafs',   'Carolina Hurricanes',     'Apr 30, 2027', 1],
  ['Boston Bruins',         'Florida Panthers',        'May 1, 2027',  1],
  ['Vegas Golden Knights',  'Dallas Stars',            'May 3, 2027',  1],

  // ── Second Round (May 8-22) ───────────────────────────────────────────────────
  ['Toronto Maple Leafs',   'New York Rangers',        'May 8, 2027',  2],
  ['Boston Bruins',         'Tampa Bay Lightning',     'May 9, 2027',  2],
  ['Colorado Avalanche',    'Vegas Golden Knights',    'May 10, 2027', 2],
  ['Edmonton Oilers',       'Calgary Flames',          'May 11, 2027', 2],
  ['Toronto Maple Leafs',   'New York Rangers',        'May 13, 2027', 2],
  ['Boston Bruins',         'Tampa Bay Lightning',     'May 15, 2027', 2],
  ['Colorado Avalanche',    'Vegas Golden Knights',    'May 17, 2027', 2],
  ['Edmonton Oilers',       'Calgary Flames',          'May 19, 2027', 2],
  ['Toronto Maple Leafs',   'New York Rangers',        'May 21, 2027', 2],

  // ── Conference Finals (May 27 - Jun 10) ──────────────────────────────────────
  ['Toronto Maple Leafs',   'Boston Bruins',           'May 27, 2027', 3],
  ['Colorado Avalanche',    'Edmonton Oilers',         'May 28, 2027', 3],
  ['Toronto Maple Leafs',   'Boston Bruins',           'May 30, 2027', 3],
  ['Colorado Avalanche',    'Edmonton Oilers',         'Jun 1, 2027',  3],
  ['Toronto Maple Leafs',   'Boston Bruins',           'Jun 3, 2027',  3],
  ['Colorado Avalanche',    'Edmonton Oilers',         'Jun 5, 2027',  3],
  ['Toronto Maple Leafs',   'Boston Bruins',           'Jun 8, 2027',  3],
  ['Colorado Avalanche',    'Edmonton Oilers',         'Jun 10, 2027', 3],
]; // end legacy list */

const NHL_GAMES = NHL_RAW.map(([home, away, date, round], i) => {
  const roundLabel = round === 3 ? ' — Conference Finals'
                   : round === 2 ? ' — Second Round'
                   : round === 1 ? ' — First Round'
                   : '';
  return {
    id:        4001 + i,
    sport:     'nhl',
    title:     `${away} at ${home}${roundLabel}`,
    home,
    away,
    venue:     NHL_VENUES[home],
    venue_key: NHL_VENUE_KEYS[home],
    date,
    week:      null,
    prices:    nhlPrices(home, away, round),
  };
});
