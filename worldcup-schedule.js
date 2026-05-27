'use strict';

// FIFA World Cup 2026 — United States, Canada & Mexico
// 48 teams · 12 groups of 4 · 72 group stage + 32 knockout matches

const WC_VENUES = {
  'MetLife Stadium':         'MetLife Stadium · East Rutherford, NJ',
  'Rose Bowl':               'Rose Bowl · Pasadena, CA',
  'AT&T Stadium':            'AT&T Stadium · Arlington, TX',
  'SoFi Stadium':            'SoFi Stadium · Inglewood, CA',
  'Hard Rock Stadium':       'Hard Rock Stadium · Miami Gardens, FL',
  'Lumen Field':             'Lumen Field · Seattle, WA',
  'Mercedes-Benz Stadium':   'Mercedes-Benz Stadium · Atlanta, GA',
  'Arrowhead Stadium':       'Arrowhead Stadium · Kansas City, MO',
  'Gillette Stadium':        'Gillette Stadium · Foxborough, MA',
  'Allegiant Stadium':       'Allegiant Stadium · Las Vegas, NV',
  'Lincoln Financial Field': 'Lincoln Financial Field · Philadelphia, PA',
  'BC Place':                'BC Place · Vancouver, BC',
  'BMO Field':               'BMO Field · Toronto, ON',
  'Estadio Azteca':          'Estadio Azteca · Mexico City, MX',
  'Estadio Akron':           'Estadio Akron · Guadalajara, MX',
  'Estadio BBVA':            'Estadio BBVA · Monterrey, MX',
};

const WC_VENUE_KEYS = {
  'MetLife Stadium':         'metlife_stadium',
  'Rose Bowl':               'rose_bowl',
  'AT&T Stadium':            'att_stadium',
  'SoFi Stadium':            'sofi_stadium',
  'Hard Rock Stadium':       'hard_rock_stadium',
  'Lumen Field':             'lumen_field',
  'Mercedes-Benz Stadium':   'mercedes_benz_stadium',
  'Arrowhead Stadium':       'arrowhead_stadium',
  'Gillette Stadium':        'gillette_stadium',
  'Allegiant Stadium':       'allegiant_stadium',
  'Lincoln Financial Field': 'lincoln_financial',
  'BC Place':                'bc_place',
  'BMO Field':               'bmo_field_toronto',
  'Estadio Azteca':          'estadio_azteca',
  'Estadio Akron':           'estadio_akron',
  'Estadio BBVA':            'estadio_bbva',
};

// Market premiums per nation
const WC_MARKET = {
  'United States': 1.80, 'Brazil':        1.65, 'Argentina':    1.65,
  'France':        1.58, 'England':        1.55, 'Germany':      1.50,
  'Spain':         1.45, 'Portugal':       1.40, 'Mexico':       1.38,
  'Netherlands':   1.30, 'Italy':          1.28, 'Belgium':      1.25,
  'Uruguay':       1.18, 'Colombia':       1.15, 'Croatia':      1.12,
  'Canada':        1.18, 'Japan':          1.10, 'South Korea':  1.10,
  'Senegal':       1.08, 'Morocco':        1.10, 'Chile':        1.08,
  'Denmark':       1.05, 'Switzerland':    1.05, 'Poland':       1.02,
  'Serbia':        1.02, 'Ecuador':        1.00, 'Austria':      1.00,
  'Scotland':      1.00, 'Ukraine':        1.00, 'Australia':    1.00,
  'Ivory Coast':   0.98, 'Egypt':          0.98, 'Turkey':       0.98,
  'Saudi Arabia':  0.95, 'Ghana':          0.95, 'Nigeria':      0.95,
  'Cameroon':      0.95, 'Costa Rica':     0.95, 'Iran':         0.92,
  'Honduras':      0.92, 'South Africa':   0.92, 'Algeria':      0.92,
  'Panama':        0.90, 'New Zealand':    0.90, 'Jamaica':      0.90,
  'Qatar':         0.90, 'Iraq':           0.88, 'China':        0.95,
};

function wcPrices(team1, team2, stage, venue) {
  const t1 = WC_MARKET[team1] || 1.0;
  const t2 = WC_MARKET[team2] || 1.0;
  const sm = stage === 'final'  ? 3.20
           : stage === 'sf'     ? 2.20
           : stage === '3rd'    ? 1.60
           : stage === 'qf'     ? 1.80
           : stage === 'r16'    ? 1.45
           : stage === 'r32'    ? 1.25
           : 1.0;
  const vm = venue === 'MetLife Stadium' ? 1.25
           : venue === 'Rose Bowl'       ? 1.20
           : venue === 'AT&T Stadium'    ? 1.15
           : venue === 'SoFi Stadium'    ? 1.12
           : 1.0;
  const base = Math.round(220 * ((t1 + t2) / 2) * sm * vm);
  const sh   = Math.round(base * 0.94);
  const sg   = Math.round(base * 0.88);
  return [
    { platform:'Ticketmaster', base,  fees: Math.round(base * 0.17) },
    { platform:'StubHub',      base: sh,   fees: Math.round(sh   * 0.15) },
    { platform:'SeatGeek',     base: sg,   fees: Math.round(sg   * 0.13) },
  ];
}

// ── 12 Groups of 4 ──────────────────────────────────────────────────────────────
// Each group: MD1=(t0vt1, t2vt3)  MD2=(t0vt2, t1vt3)  MD3=(t0vt3, t1vt2)
// [team1, team2, venue, date, group]

const WC_GROUP_RAW = [

  // ── Group A: United States · Germany · Morocco · Qatar ──────────────────────
  ['United States', 'Germany',      'MetLife Stadium',         'Jun 11, 2026', 'A'],
  ['Morocco',       'Qatar',        'Gillette Stadium',        'Jun 11, 2026', 'A'],
  ['United States', 'Morocco',      'Rose Bowl',               'Jun 18, 2026', 'A'],
  ['Germany',       'Qatar',        'Arrowhead Stadium',       'Jun 18, 2026', 'A'],
  ['United States', 'Qatar',        'AT&T Stadium',            'Jun 25, 2026', 'A'],
  ['Germany',       'Morocco',      'SoFi Stadium',            'Jun 25, 2026', 'A'],

  // ── Group B: France · Argentina · Senegal · Australia ───────────────────────
  ['France',        'Argentina',    'Rose Bowl',               'Jun 11, 2026', 'B'],
  ['Senegal',       'Australia',    'Mercedes-Benz Stadium',   'Jun 11, 2026', 'B'],
  ['France',        'Senegal',      'Hard Rock Stadium',       'Jun 19, 2026', 'B'],
  ['Argentina',     'Australia',    'Lumen Field',             'Jun 19, 2026', 'B'],
  ['France',        'Australia',    'MetLife Stadium',         'Jun 26, 2026', 'B'],
  ['Argentina',     'Senegal',      'Lincoln Financial Field', 'Jun 26, 2026', 'B'],

  // ── Group C: Spain · Brazil · Japan · South Africa ──────────────────────────
  ['Spain',         'Brazil',       'Rose Bowl',               'Jun 12, 2026', 'C'],
  ['Japan',         'South Africa', 'AT&T Stadium',            'Jun 12, 2026', 'C'],
  ['Spain',         'Japan',        'SoFi Stadium',            'Jun 19, 2026', 'C'],
  ['Brazil',        'South Africa', 'Hard Rock Stadium',       'Jun 19, 2026', 'C'],
  ['Spain',         'South Africa', 'MetLife Stadium',         'Jun 26, 2026', 'C'],
  ['Brazil',        'Japan',        'Gillette Stadium',        'Jun 26, 2026', 'C'],

  // ── Group D: England · Mexico · South Korea · New Zealand ───────────────────
  ['England',       'Mexico',       'Estadio Azteca',          'Jun 12, 2026', 'D'],
  ['South Korea',   'New Zealand',  'Arrowhead Stadium',       'Jun 12, 2026', 'D'],
  ['England',       'South Korea',  'AT&T Stadium',            'Jun 20, 2026', 'D'],
  ['Mexico',        'New Zealand',  'Estadio Akron',           'Jun 20, 2026', 'D'],
  ['England',       'New Zealand',  'Lincoln Financial Field', 'Jun 27, 2026', 'D'],
  ['Mexico',        'South Korea',  'Estadio BBVA',            'Jun 27, 2026', 'D'],

  // ── Group E: Netherlands · Colombia · Ecuador · Jamaica ─────────────────────
  ['Netherlands',   'Colombia',     'Lincoln Financial Field', 'Jun 13, 2026', 'E'],
  ['Ecuador',       'Jamaica',      'Allegiant Stadium',       'Jun 13, 2026', 'E'],
  ['Netherlands',   'Ecuador',      'Gillette Stadium',        'Jun 20, 2026', 'E'],
  ['Colombia',      'Jamaica',      'BC Place',                'Jun 20, 2026', 'E'],
  ['Netherlands',   'Jamaica',      'MetLife Stadium',         'Jun 27, 2026', 'E'],
  ['Colombia',      'Ecuador',      'Rose Bowl',               'Jun 27, 2026', 'E'],

  // ── Group F: Portugal · Uruguay · Egypt · Iraq ──────────────────────────────
  ['Portugal',      'Uruguay',      'SoFi Stadium',            'Jun 13, 2026', 'F'],
  ['Egypt',         'Iraq',         'BMO Field',               'Jun 13, 2026', 'F'],
  ['Portugal',      'Egypt',        'Hard Rock Stadium',       'Jun 21, 2026', 'F'],
  ['Uruguay',       'Iraq',         'Mercedes-Benz Stadium',   'Jun 21, 2026', 'F'],
  ['Portugal',      'Iraq',         'Arrowhead Stadium',       'Jun 28, 2026', 'F'],
  ['Uruguay',       'Egypt',        'Lumen Field',             'Jun 28, 2026', 'F'],

  // ── Group G: Italy · Chile · Saudi Arabia · Honduras ────────────────────────
  ['Italy',         'Chile',        'Hard Rock Stadium',       'Jun 14, 2026', 'G'],
  ['Saudi Arabia',  'Honduras',     'Estadio Akron',           'Jun 14, 2026', 'G'],
  ['Italy',         'Saudi Arabia', 'Allegiant Stadium',       'Jun 21, 2026', 'G'],
  ['Chile',         'Honduras',     'Rose Bowl',               'Jun 21, 2026', 'G'],
  ['Italy',         'Honduras',     'MetLife Stadium',         'Jun 28, 2026', 'G'],
  ['Chile',         'Saudi Arabia', 'AT&T Stadium',            'Jun 28, 2026', 'G'],

  // ── Group H: Belgium · Ivory Coast · Iran · Algeria ─────────────────────────
  ['Belgium',       'Ivory Coast',  'Lumen Field',             'Jun 14, 2026', 'H'],
  ['Iran',          'Algeria',      'Estadio BBVA',            'Jun 14, 2026', 'H'],
  ['Belgium',       'Iran',         'Lincoln Financial Field', 'Jun 22, 2026', 'H'],
  ['Ivory Coast',   'Algeria',      'SoFi Stadium',            'Jun 22, 2026', 'H'],
  ['Belgium',       'Algeria',      'Rose Bowl',               'Jun 29, 2026', 'H'],
  ['Ivory Coast',   'Iran',         'Gillette Stadium',        'Jun 29, 2026', 'H'],

  // ── Group I: Croatia · Nigeria · Cameroon · Austria ─────────────────────────
  ['Croatia',       'Nigeria',      'BC Place',                'Jun 15, 2026', 'I'],
  ['Cameroon',      'Austria',      'Mercedes-Benz Stadium',   'Jun 15, 2026', 'I'],
  ['Croatia',       'Cameroon',     'Gillette Stadium',        'Jun 22, 2026', 'I'],
  ['Nigeria',       'Austria',      'MetLife Stadium',         'Jun 22, 2026', 'I'],
  ['Croatia',       'Austria',      'Arrowhead Stadium',       'Jun 29, 2026', 'I'],
  ['Nigeria',       'Cameroon',     'AT&T Stadium',            'Jun 29, 2026', 'I'],

  // ── Group J: Switzerland · Ghana · Scotland · Panama ────────────────────────
  ['Switzerland',   'Ghana',        'Allegiant Stadium',       'Jun 15, 2026', 'J'],
  ['Scotland',      'Panama',       'Estadio Azteca',          'Jun 15, 2026', 'J'],
  ['Switzerland',   'Scotland',     'Rose Bowl',               'Jun 23, 2026', 'J'],
  ['Ghana',         'Panama',       'SoFi Stadium',            'Jun 23, 2026', 'J'],
  ['Switzerland',   'Panama',       'Lumen Field',             'Jun 30, 2026', 'J'],
  ['Ghana',         'Scotland',     'MetLife Stadium',         'Jun 30, 2026', 'J'],

  // ── Group K: Denmark · Poland · Turkey · China ──────────────────────────────
  ['Denmark',       'Poland',       'Arrowhead Stadium',       'Jun 16, 2026', 'K'],
  ['Turkey',        'China',        'Estadio Akron',           'Jun 16, 2026', 'K'],
  ['Denmark',       'Turkey',       'AT&T Stadium',            'Jun 23, 2026', 'K'],
  ['Poland',        'China',        'Hard Rock Stadium',       'Jun 23, 2026', 'K'],
  ['Denmark',       'China',        'MetLife Stadium',         'Jun 30, 2026', 'K'],
  ['Poland',        'Turkey',       'Rose Bowl',               'Jun 30, 2026', 'K'],

  // ── Group L: Canada · Ukraine · Serbia · Costa Rica ─────────────────────────
  ['Canada',        'Ukraine',      'BMO Field',               'Jun 17, 2026', 'L'],
  ['Serbia',        'Costa Rica',   'Estadio BBVA',            'Jun 17, 2026', 'L'],
  ['Canada',        'Serbia',       'BC Place',                'Jun 24, 2026', 'L'],
  ['Ukraine',       'Costa Rica',   'Gillette Stadium',        'Jun 24, 2026', 'L'],
  ['Canada',        'Costa Rica',   'Lumen Field',             'Jul 1, 2026',  'L'],
  ['Ukraine',       'Serbia',       'Lincoln Financial Field', 'Jul 1, 2026',  'L'],
];

// ── Knockout Stage ─────────────────────────────────────────────────────────────
// [team1, team2, venue, date, stage]
const WC_KNOCKOUT_RAW = [

  // ── Round of 32 (Jul 4–7) ────────────────────────────────────────────────────
  ['United States',  'Colombia',     'MetLife Stadium',         'Jul 4, 2026',  'r32'],
  ['France',         'Italy',        'Rose Bowl',               'Jul 4, 2026',  'r32'],
  ['Spain',          'Belgium',      'AT&T Stadium',            'Jul 4, 2026',  'r32'],
  ['England',        'Netherlands',  'Gillette Stadium',        'Jul 4, 2026',  'r32'],
  ['Brazil',         'Chile',        'SoFi Stadium',            'Jul 5, 2026',  'r32'],
  ['Argentina',      'Croatia',      'MetLife Stadium',         'Jul 5, 2026',  'r32'],
  ['Germany',        'Serbia',       'Hard Rock Stadium',       'Jul 5, 2026',  'r32'],
  ['Portugal',       'Denmark',      'Arrowhead Stadium',       'Jul 5, 2026',  'r32'],
  ['Mexico',         'Poland',       'Estadio Azteca',          'Jul 6, 2026',  'r32'],
  ['Uruguay',        'Austria',      'Lincoln Financial Field', 'Jul 6, 2026',  'r32'],
  ['Japan',          'Switzerland',  'Lumen Field',             'Jul 6, 2026',  'r32'],
  ['South Korea',    'Ecuador',      'Mercedes-Benz Stadium',   'Jul 6, 2026',  'r32'],
  ['Canada',         'Ivory Coast',  'BC Place',                'Jul 7, 2026',  'r32'],
  ['Morocco',        'Scotland',     'Allegiant Stadium',       'Jul 7, 2026',  'r32'],
  ['Senegal',        'Ukraine',      'BMO Field',               'Jul 7, 2026',  'r32'],
  ['Nigeria',        'Egypt',        'Estadio BBVA',            'Jul 7, 2026',  'r32'],

  // ── Round of 16 (Jul 11–14) ──────────────────────────────────────────────────
  ['United States',  'Germany',      'MetLife Stadium',         'Jul 11, 2026', 'r16'],
  ['France',         'Spain',        'Rose Bowl',               'Jul 11, 2026', 'r16'],
  ['Brazil',         'England',      'AT&T Stadium',            'Jul 12, 2026', 'r16'],
  ['Argentina',      'Portugal',     'SoFi Stadium',            'Jul 12, 2026', 'r16'],
  ['Mexico',         'Japan',        'Estadio Azteca',          'Jul 13, 2026', 'r16'],
  ['Uruguay',        'Morocco',      'Arrowhead Stadium',       'Jul 13, 2026', 'r16'],
  ['Nigeria',        'Canada',       'Hard Rock Stadium',       'Jul 14, 2026', 'r16'],
  ['Senegal',        'South Korea',  'Mercedes-Benz Stadium',   'Jul 14, 2026', 'r16'],

  // ── Quarterfinals (Jul 17–19) ────────────────────────────────────────────────
  ['United States',  'France',       'MetLife Stadium',         'Jul 17, 2026', 'qf'],
  ['Brazil',         'Argentina',    'Rose Bowl',               'Jul 18, 2026', 'qf'],
  ['England',        'Spain',        'AT&T Stadium',            'Jul 18, 2026', 'qf'],
  ['Portugal',       'Uruguay',      'SoFi Stadium',            'Jul 19, 2026', 'qf'],

  // ── Semifinals (Jul 22–23) ───────────────────────────────────────────────────
  ['United States',  'Brazil',       'MetLife Stadium',         'Jul 22, 2026', 'sf'],
  ['France',         'Argentina',    'Rose Bowl',               'Jul 23, 2026', 'sf'],

  // ── Third Place (Jul 25) ─────────────────────────────────────────────────────
  ['Brazil',         'France',       'AT&T Stadium',            'Jul 25, 2026', '3rd'],

  // ── Final (Jul 26) ───────────────────────────────────────────────────────────
  ['United States',  'Argentina',    'MetLife Stadium',         'Jul 26, 2026', 'final'],
];

// Build group stage games (IDs 5001–5072)
const WC_GROUP_GAMES = WC_GROUP_RAW.map(([team1, team2, venue, date, group], i) => ({
  id:        5001 + i,
  sport:     'worldcup',
  title:     `${team1} vs ${team2} — Group ${group}`,
  home:      team1,
  away:      team2,
  group:     `Group ${group}`,
  venue:     WC_VENUES[venue],
  venue_key: WC_VENUE_KEYS[venue],
  date,
  week:      null,
  prices:    wcPrices(team1, team2, 'group', venue),
}));

// Build knockout games (IDs 5101–5132)
const WC_KNOCKOUT_GAMES = WC_KNOCKOUT_RAW.map(([team1, team2, venue, date, stage], i) => {
  const stageLabel = stage === 'final' ? 'Final'
                   : stage === 'sf'    ? 'Semifinal'
                   : stage === '3rd'   ? 'Third Place'
                   : stage === 'qf'    ? 'Quarterfinal'
                   : stage === 'r16'   ? 'Round of 16'
                   : 'Round of 32';
  return {
    id:        5101 + i,
    sport:     'worldcup',
    title:     `${team1} vs ${team2} — ${stageLabel}`,
    home:      team1,
    away:      team2,
    group:     null,
    venue:     WC_VENUES[venue],
    venue_key: WC_VENUE_KEYS[venue],
    date,
    week:      null,
    prices:    wcPrices(team1, team2, stage, venue),
  };
});

const WORLDCUP_GAMES = [...WC_GROUP_GAMES, ...WC_KNOCKOUT_GAMES];
