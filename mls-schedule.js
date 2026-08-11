'use strict';

const MLS_VENUES = {
  'Atlanta United FC':     'Mercedes-Benz Stadium · Atlanta, GA',
  'Austin FC':             'Q2 Stadium · Austin, TX',
  'Charlotte FC':          'Bank of America Stadium · Charlotte, NC',
  'Chicago Fire FC':       'Wintrust Arena · Chicago, IL',
  'CF Montréal':           'Saputo Stadium · Montreal, QC',
  'Colorado Rapids':       "Dick's Sporting Goods Park · Commerce City, CO",
  'Columbus Crew':         'Lower.com Field · Columbus, OH',
  'D.C. United':           'Audi Field · Washington, DC',
  'FC Cincinnati':         'TQL Stadium · Cincinnati, OH',
  'FC Dallas':             'Toyota Stadium · Frisco, TX',
  'Houston Dynamo FC':     'Shell Energy Stadium · Houston, TX',
  'Inter Miami CF':        'Chase Stadium · Fort Lauderdale, FL',
  'LA Galaxy':             'Dignity Health Sports Park · Carson, CA',
  'LAFC':                  'BMO Stadium · Los Angeles, CA',
  'Minnesota United FC':   'Allianz Field · St. Paul, MN',
  'Nashville SC':          'GEODIS Park · Nashville, TN',
  'New England Revolution':'Gillette Stadium · Foxborough, MA',
  'New York City FC':      'Yankee Stadium · Bronx, NY',
  'New York Red Bulls':    'Red Bull Arena · Harrison, NJ',
  'Orlando City SC':       'Exploria Stadium · Orlando, FL',
  'Philadelphia Union':    'Subaru Park · Chester, PA',
  'Portland Timbers':      'Providence Park · Portland, OR',
  'Real Salt Lake':        'America First Field · Sandy, UT',
  'San Diego FC':          'Snapdragon Stadium · San Diego, CA',
  'San Jose Earthquakes':  'PayPal Park · San Jose, CA',
  'Seattle Sounders FC':   'Lumen Field · Seattle, WA',
  'Sporting Kansas City':  "Children's Mercy Park · Kansas City, KS",
  'St. Louis City SC':     'CITYPARK · St. Louis, MO',
  'Toronto FC':            'BMO Field · Toronto, ON',
  'Vancouver Whitecaps FC':'BC Place · Vancouver, BC',
};

const MLS_VENUE_KEYS = {
  'Atlanta United FC':     'mercedes_benz_stadium',
  'Austin FC':             'att_stadium',
  'Charlotte FC':          'bank_of_america_stadium',
  'Chicago Fire FC':       'soldier_field',
  'CF Montréal':           'bell_centre',
  'Colorado Rapids':       'empower_field',
  'Columbus Crew':         'nationwide_arena',
  'D.C. United':           'capital_one_arena',
  'FC Cincinnati':         'tql_stadium',
  'FC Dallas':             'att_stadium',
  'Houston Dynamo FC':     'nrg_stadium',
  'Inter Miami CF':        'hard_rock_stadium',
  'LA Galaxy':             'sofi_stadium',
  'LAFC':                  'bmo_stadium',
  'Minnesota United FC':   'xcel_energy_center',
  'Nashville SC':          'bridgestone_arena',
  'New England Revolution':'gillette_stadium',
  'New York City FC':      'yankee_stadium',
  'New York Red Bulls':    'prudential_center',
  'Orlando City SC':       'amalie_arena',
  'Philadelphia Union':    'lincoln_financial',
  'Portland Timbers':      'providence_park',
  'Real Salt Lake':        'delta_center',
  'San Diego FC':          'snapdragon_stadium',
  'San Jose Earthquakes':  'sap_center',
  'Seattle Sounders FC':   'lumen_field',
  'Sporting Kansas City':  'arrowhead_stadium',
  'St. Louis City SC':     'enterprise_center',
  'Toronto FC':            'bmo_field_toronto',
  'Vancouver Whitecaps FC':'bc_place',
};

// Market demand multipliers (base price ~$62/ticket)
const MLS_MARKET = {
  'Inter Miami CF':        1.48,
  'LAFC':                  1.42,
  'LA Galaxy':             1.36,
  'Seattle Sounders FC':   1.30,
  'Atlanta United FC':     1.26,
  'Portland Timbers':      1.22,
  'New York City FC':      1.20,
  'Nashville SC':          1.16,
  'Philadelphia Union':    1.14,
  'Austin FC':             1.12,
  'Columbus Crew':         1.10,
  'FC Cincinnati':         1.10,
  'New York Red Bulls':    1.10,
  'Charlotte FC':          1.08,
  'San Diego FC':          1.08,
  'Toronto FC':            1.08,
  'St. Louis City SC':     1.06,
  'Minnesota United FC':   1.05,
  'Sporting Kansas City':  1.04,
  'New England Revolution':1.04,
  'Vancouver Whitecaps FC':1.03,
  'Orlando City SC':       1.02,
  'D.C. United':           1.00,
  'Houston Dynamo FC':     1.00,
  'FC Dallas':             0.99,
  'Chicago Fire FC':       0.98,
  'CF Montréal':           0.97,
  'Colorado Rapids':       0.97,
  'Real Salt Lake':        0.96,
  'San Jose Earthquakes':  0.95,
};

// Derby rivalry premium (applied when both clubs are in the matchup)
const MLS_DERBIES = [
  ['LAFC', 'LA Galaxy'],
  ['Seattle Sounders FC', 'Portland Timbers'],
  ['Seattle Sounders FC', 'Vancouver Whitecaps FC'],
  ['Portland Timbers', 'Vancouver Whitecaps FC'],
  ['Columbus Crew', 'FC Cincinnati'],
  ['New York City FC', 'New York Red Bulls'],
  ['Colorado Rapids', 'Real Salt Lake'],
  ['LA Galaxy', 'San Jose Earthquakes'],
  ['Toronto FC', 'CF Montréal'],
  ['Toronto FC', 'Columbus Crew'],
  ['Philadelphia Union', 'New York Red Bulls'],
  ['Atlanta United FC', 'Charlotte FC'],
  ['Sporting Kansas City', 'St. Louis City SC'],
];

function isDerby(home, away) {
  return MLS_DERBIES.some(([a, b]) =>
    (a === home && b === away) || (b === home && a === away));
}

function mlsPrices(home, away) {
  const hp      = MLS_MARKET[home]  || 1.0;
  const ap      = MLS_MARKET[away]  || 1.0;
  const derby   = isDerby(home, away) ? 1.28 : 1.0;
  const base    = Math.round(62 * (hp * 0.6 + ap * 0.4) * derby);
  const sh      = Math.round(base * 0.93);
  const sg      = Math.round(base * 0.87);
  return [
    { platform: 'Ticketmaster', base, fees: Math.round(base * 0.17) },
    { platform: 'StubHub',      base: sh, fees: Math.round(sh  * 0.15) },
    { platform: 'SeatGeek',     base: sg, fees: Math.round(sg  * 0.13) },
  ];
}

// [homeTeam, awayTeam, date]
const MLS_RAW = [
  // ── Opening Weekend — Feb 28 / Mar 1 ─────────────────────────────────────────
  ['LAFC',                  'Real Salt Lake',        'Feb 28, 2026'],
  ['LA Galaxy',             'FC Dallas',             'Feb 28, 2026'],
  ['Seattle Sounders FC',   'Portland Timbers',      'Feb 28, 2026'],
  ['Inter Miami CF',        'Atlanta United FC',     'Mar 1, 2026'],
  ['Philadelphia Union',    'New York Red Bulls',    'Mar 1, 2026'],
  ['Columbus Crew',         'FC Cincinnati',         'Mar 1, 2026'],
  ['Nashville SC',          'Charlotte FC',          'Mar 1, 2026'],
  ['D.C. United',           'Toronto FC',            'Mar 1, 2026'],
  ['Minnesota United FC',   'Sporting Kansas City',  'Mar 1, 2026'],
  ['Vancouver Whitecaps FC','San Jose Earthquakes',  'Mar 1, 2026'],
  ['St. Louis City SC',     'Houston Dynamo FC',     'Mar 1, 2026'],
  ['San Diego FC',          'Colorado Rapids',       'Mar 1, 2026'],

  // ── Matchday 2 — Mar 7-8 ─────────────────────────────────────────────────────
  ['Atlanta United FC',     'Inter Miami CF',        'Mar 7, 2026'],
  ['Toronto FC',            'CF Montréal',           'Mar 7, 2026'],
  ['New York City FC',      'New England Revolution','Mar 7, 2026'],
  ['Austin FC',             'LAFC',                  'Mar 7, 2026'],
  ['Real Salt Lake',        'San Diego FC',          'Mar 8, 2026'],
  ['Portland Timbers',      'Vancouver Whitecaps FC','Mar 8, 2026'],
  ['FC Cincinnati',         'Columbus Crew',         'Mar 8, 2026'],
  ['Charlotte FC',          'Orlando City SC',       'Mar 8, 2026'],
  ['Colorado Rapids',       'Sporting Kansas City',  'Mar 8, 2026'],
  ['FC Dallas',             'Houston Dynamo FC',     'Mar 8, 2026'],

  // ── Matchday 3 — Mar 14-15 ───────────────────────────────────────────────────
  ['New York Red Bulls',    'New York City FC',      'Mar 14, 2026'],
  ['New England Revolution','D.C. United',           'Mar 14, 2026'],
  ['Nashville SC',          'Inter Miami CF',        'Mar 14, 2026'],
  ['LAFC',                  'San Jose Earthquakes',  'Mar 14, 2026'],
  ['Seattle Sounders FC',   'Colorado Rapids',       'Mar 15, 2026'],
  ['Houston Dynamo FC',     'Austin FC',             'Mar 15, 2026'],
  ['CF Montréal',           'Philadelphia Union',    'Mar 15, 2026'],
  ['Orlando City SC',       'Atlanta United FC',     'Mar 15, 2026'],
  ['San Diego FC',          'LA Galaxy',             'Mar 15, 2026'],
  ['Sporting Kansas City',  'St. Louis City SC',     'Mar 15, 2026'],

  // ── Matchday 4 — Mar 21-22 ───────────────────────────────────────────────────
  ['Inter Miami CF',        'Orlando City SC',       'Mar 21, 2026'],
  ['Columbus Crew',         'Nashville SC',          'Mar 21, 2026'],
  ['LA Galaxy',             'LAFC',                  'Mar 21, 2026'],
  ['Vancouver Whitecaps FC','Seattle Sounders FC',   'Mar 21, 2026'],
  ['Atlanta United FC',     'Charlotte FC',          'Mar 22, 2026'],
  ['FC Cincinnati',         'D.C. United',           'Mar 22, 2026'],
  ['Toronto FC',            'New England Revolution','Mar 22, 2026'],
  ['Austin FC',             'FC Dallas',             'Mar 22, 2026'],
  ['Minnesota United FC',   'Colorado Rapids',       'Mar 22, 2026'],
  ['Real Salt Lake',        'Portland Timbers',      'Mar 22, 2026'],
  ['St. Louis City SC',     'Sporting Kansas City',  'Mar 22, 2026'],

  // ── Matchday 5 — Mar 28-29 ───────────────────────────────────────────────────
  ['Philadelphia Union',    'Columbus Crew',         'Mar 28, 2026'],
  ['New York City FC',      'Toronto FC',            'Mar 28, 2026'],
  ['Charlotte FC',          'Nashville SC',          'Mar 28, 2026'],
  ['Seattle Sounders FC',   'LAFC',                  'Mar 28, 2026'],
  ['CF Montréal',           'New York Red Bulls',    'Mar 28, 2026'],
  ['D.C. United',           'Inter Miami CF',        'Mar 29, 2026'],
  ['San Jose Earthquakes',  'Real Salt Lake',        'Mar 29, 2026'],
  ['Colorado Rapids',       'San Diego FC',          'Mar 29, 2026'],
  ['Portland Timbers',      'Austin FC',             'Mar 29, 2026'],
  ['FC Dallas',             'Sporting Kansas City',  'Mar 29, 2026'],

  // ── Matchday 6 — Apr 4-5 ─────────────────────────────────────────────────────
  ['Inter Miami CF',        'New York City FC',      'Apr 4, 2026'],
  ['Columbus Crew',         'Toronto FC',            'Apr 4, 2026'],
  ['LAFC',                  'Austin FC',             'Apr 4, 2026'],
  ['Nashville SC',          'Atlanta United FC',     'Apr 4, 2026'],
  ['Houston Dynamo FC',     'FC Dallas',             'Apr 4, 2026'],
  ['New England Revolution','CF Montréal',           'Apr 5, 2026'],
  ['Orlando City SC',       'Philadelphia Union',    'Apr 5, 2026'],
  ['Vancouver Whitecaps FC','Portland Timbers',      'Apr 5, 2026'],
  ['Real Salt Lake',        'Colorado Rapids',       'Apr 5, 2026'],
  ['Sporting Kansas City',  'Minnesota United FC',   'Apr 5, 2026'],
  ['San Diego FC',          'Seattle Sounders FC',   'Apr 5, 2026'],

  // ── Matchday 7 — Apr 11-12 (Derby Weekend) ───────────────────────────────────
  ['LA Galaxy',             'LAFC',                  'Apr 11, 2026'],   // El Tráfico
  ['Columbus Crew',         'FC Cincinnati',         'Apr 11, 2026'],   // Hell is Real
  ['New York City FC',      'New York Red Bulls',    'Apr 11, 2026'],   // Hudson River Derby
  ['Toronto FC',            'CF Montréal',           'Apr 11, 2026'],   // Canadian Clasico
  ['Seattle Sounders FC',   'Vancouver Whitecaps FC','Apr 11, 2026'],   // Cascadia
  ['Colorado Rapids',       'Real Salt Lake',        'Apr 12, 2026'],   // Rocky Mountain Cup
  ['Atlanta United FC',     'Inter Miami CF',        'Apr 12, 2026'],
  ['Charlotte FC',          'D.C. United',           'Apr 12, 2026'],
  ['Sporting Kansas City',  'St. Louis City SC',     'Apr 12, 2026'],   // Show-Me Cup
  ['LA Galaxy',             'San Jose Earthquakes',  'Apr 12, 2026'],   // California Clásico

  // ── Matchday 8 — Apr 18-19 ───────────────────────────────────────────────────
  ['FC Cincinnati',         'Philadelphia Union',    'Apr 18, 2026'],
  ['Inter Miami CF',        'Nashville SC',          'Apr 18, 2026'],
  ['Portland Timbers',      'Seattle Sounders FC',   'Apr 18, 2026'],   // Cascadia
  ['Austin FC',             'Houston Dynamo FC',     'Apr 18, 2026'],   // Texas Derby
  ['LAFC',                  'LA Galaxy',             'Apr 19, 2026'],   // El Tráfico II
  ['D.C. United',           'New England Revolution','Apr 19, 2026'],
  ['Minnesota United FC',   'St. Louis City SC',     'Apr 19, 2026'],
  ['San Jose Earthquakes',  'LA Galaxy',             'Apr 19, 2026'],
  ['CF Montréal',           'Toronto FC',            'Apr 19, 2026'],

  // ── Matchday 9 — Apr 25-26 ───────────────────────────────────────────────────
  ['Atlanta United FC',     'Columbus Crew',         'Apr 25, 2026'],
  ['New York Red Bulls',    'Philadelphia Union',    'Apr 25, 2026'],
  ['Nashville SC',          'Charlotte FC',          'Apr 25, 2026'],
  ['Real Salt Lake',        'LAFC',                  'Apr 25, 2026'],
  ['Seattle Sounders FC',   'San Diego FC',          'Apr 26, 2026'],
  ['FC Dallas',             'Austin FC',             'Apr 26, 2026'],
  ['Columbus Crew',         'D.C. United',           'Apr 26, 2026'],
  ['Vancouver Whitecaps FC','Real Salt Lake',        'Apr 26, 2026'],
  ['Sporting Kansas City',  'Colorado Rapids',       'Apr 26, 2026'],
  ['New England Revolution','New York City FC',      'Apr 26, 2026'],

  // ── Matchday 10 — May 2-3 ────────────────────────────────────────────────────
  ['Inter Miami CF',        'CF Montréal',           'May 2, 2026'],
  ['Charlotte FC',          'Atlanta United FC',     'May 2, 2026'],
  ['LAFC',                  'Portland Timbers',      'May 2, 2026'],
  ['Houston Dynamo FC',     'Sporting Kansas City',  'May 2, 2026'],
  ['FC Cincinnati',         'Toronto FC',            'May 3, 2026'],
  ['New York City FC',      'D.C. United',           'May 3, 2026'],
  ['Minnesota United FC',   'FC Dallas',             'May 3, 2026'],
  ['San Diego FC',          'Austin FC',             'May 3, 2026'],
  ['Colorado Rapids',       'Vancouver Whitecaps FC','May 3, 2026'],
  ['San Jose Earthquakes',  'Portland Timbers',      'May 3, 2026'],

  // ── Matchday 11 — May 9-10 ───────────────────────────────────────────────────
  ['Orlando City SC',       'Inter Miami CF',        'May 9, 2026'],
  ['Philadelphia Union',    'CF Montréal',           'May 9, 2026'],
  ['Atlanta United FC',     'Nashville SC',          'May 9, 2026'],
  ['LA Galaxy',             'Colorado Rapids',       'May 9, 2026'],
  ['Columbus Crew',         'Charlotte FC',          'May 10, 2026'],
  ['New York Red Bulls',    'New England Revolution','May 10, 2026'],
  ['Portland Timbers',      'Real Salt Lake',        'May 10, 2026'],
  ['St. Louis City SC',     'Minnesota United FC',   'May 10, 2026'],
  ['Austin FC',             'San Jose Earthquakes',  'May 10, 2026'],
  ['Seattle Sounders FC',   'Houston Dynamo FC',     'May 10, 2026'],

  // ── Matchday 12 — May 16-17 ──────────────────────────────────────────────────
  ['Toronto FC',            'D.C. United',           'May 16, 2026'],
  ['Nashville SC',          'FC Cincinnati',         'May 16, 2026'],
  ['LAFC',                  'Vancouver Whitecaps FC','May 16, 2026'],
  ['Inter Miami CF',        'Charlotte FC',          'May 16, 2026'],
  ['New York City FC',      'Atlanta United FC',     'May 17, 2026'],
  ['Real Salt Lake',        'Seattle Sounders FC',   'May 17, 2026'],
  ['FC Dallas',             'Colorado Rapids',       'May 17, 2026'],
  ['San Diego FC',          'LA Galaxy',             'May 17, 2026'],
  ['Sporting Kansas City',  'Austin FC',             'May 17, 2026'],
  ['CF Montréal',           'Columbus Crew',         'May 17, 2026'],

  // ── Matchday 13 — May 23-24 ──────────────────────────────────────────────────
  ['Philadelphia Union',    'Nashville SC',          'May 23, 2026'],
  ['Atlanta United FC',     'Orlando City SC',       'May 23, 2026'],
  ['Seattle Sounders FC',   'Minnesota United FC',   'May 23, 2026'],
  ['Houston Dynamo FC',     'LA Galaxy',             'May 23, 2026'],
  ['D.C. United',           'New York Red Bulls',    'May 24, 2026'],
  ['Columbus Crew',         'New England Revolution','May 24, 2026'],
  ['Austin FC',             'Real Salt Lake',        'May 24, 2026'],
  ['Colorado Rapids',       'Portland Timbers',      'May 24, 2026'],
  ['St. Louis City SC',     'FC Dallas',             'May 24, 2026'],

  // ── Matchday 14 — May 30-31 (final pre–World Cup) ────────────────────────────
  ['Inter Miami CF',        'Philadelphia Union',    'May 30, 2026'],
  ['LAFC',                  'San Diego FC',          'May 30, 2026'],
  ['New York City FC',      'CF Montréal',           'May 30, 2026'],
  ['Charlotte FC',          'Toronto FC',            'May 30, 2026'],
  ['LA Galaxy',             'Austin FC',             'May 31, 2026'],
  ['Nashville SC',          'Columbus Crew',         'May 31, 2026'],
  ['Portland Timbers',      'Sporting Kansas City',  'May 31, 2026'],
  ['Vancouver Whitecaps FC','FC Dallas',             'May 31, 2026'],
  ['Real Salt Lake',        'Houston Dynamo FC',     'May 31, 2026'],
  ['Atlanta United FC',     'New England Revolution','May 31, 2026'],
  ['Minnesota United FC',   'San Jose Earthquakes',  'May 31, 2026'],

  // [World Cup break: June 11 – July 19, 2026 — no MLS matches]

  // ── MLS Returns — Aug 1-2 ────────────────────────────────────────────────────
  ['Inter Miami CF',        'Nashville SC',          'Aug 1, 2026'],
  ['LA Galaxy',             'Seattle Sounders FC',   'Aug 1, 2026'],
  ['LAFC',                  'Colorado Rapids',       'Aug 1, 2026'],
  ['Philadelphia Union',    'Atlanta United FC',     'Aug 1, 2026'],
  ['Columbus Crew',         'Orlando City SC',       'Aug 2, 2026'],
  ['New York City FC',      'Charlotte FC',          'Aug 2, 2026'],
  ['Portland Timbers',      'Vancouver Whitecaps FC','Aug 2, 2026'],
  ['FC Cincinnati',         'New York Red Bulls',    'Aug 2, 2026'],
  ['Austin FC',             'Minnesota United FC',   'Aug 2, 2026'],
  ['FC Dallas',             'Real Salt Lake',        'Aug 2, 2026'],
  ['St. Louis City SC',     'Colorado Rapids',       'Aug 2, 2026'],
  ['Houston Dynamo FC',     'San Diego FC',          'Aug 2, 2026'],

  // ── Matchday 16 — Aug 8-9 ────────────────────────────────────────────────────
  ['Atlanta United FC',     'FC Cincinnati',         'Aug 8, 2026'],
  ['Nashville SC',          'D.C. United',           'Aug 8, 2026'],
  ['Seattle Sounders FC',   'LA Galaxy',             'Aug 8, 2026'],
  ['CF Montréal',           'Inter Miami CF',        'Aug 8, 2026'],
  ['New England Revolution','Philadelphia Union',    'Aug 9, 2026'],
  ['Toronto FC',            'Columbus Crew',         'Aug 9, 2026'],
  ['Real Salt Lake',        'Austin FC',             'Aug 9, 2026'],
  ['San Diego FC',          'Portland Timbers',      'Aug 9, 2026'],
  ['Sporting Kansas City',  'FC Dallas',             'Aug 9, 2026'],
  ['Colorado Rapids',       'LAFC',                  'Aug 9, 2026'],

  // ── Matchday 17 — Aug 15-16 ──────────────────────────────────────────────────
  ['Inter Miami CF',        'D.C. United',           'Aug 15, 2026'],
  ['Charlotte FC',          'New York City FC',      'Aug 15, 2026'],
  ['LAFC',                  'Houston Dynamo FC',     'Aug 15, 2026'],
  ['Columbus Crew',         'CF Montréal',           'Aug 15, 2026'],
  ['Orlando City SC',       'Nashville SC',          'Aug 16, 2026'],
  ['New York Red Bulls',    'Toronto FC',            'Aug 16, 2026'],
  ['Portland Timbers',      'Seattle Sounders FC',   'Aug 16, 2026'],
  ['Minnesota United FC',   'Vancouver Whitecaps FC','Aug 16, 2026'],
  ['San Jose Earthquakes',  'San Diego FC',          'Aug 16, 2026'],
  ['St. Louis City SC',     'Austin FC',             'Aug 16, 2026'],

  // ── Matchday 18 — Aug 22-23 ──────────────────────────────────────────────────
  ['Atlanta United FC',     'Philadelphia Union',   'Aug 22, 2026'],
  ['LA Galaxy',             'Portland Timbers',      'Aug 22, 2026'],
  ['Nashville SC',          'Toronto FC',            'Aug 22, 2026'],
  ['New York City FC',      'Inter Miami CF',        'Aug 22, 2026'],
  ['D.C. United',           'Columbus Crew',         'Aug 23, 2026'],
  ['FC Dallas',             'LAFC',                  'Aug 23, 2026'],
  ['Real Salt Lake',        'Minnesota United FC',   'Aug 23, 2026'],
  ['Colorado Rapids',       'Seattle Sounders FC',   'Aug 23, 2026'],
  ['CF Montréal',           'Charlotte FC',          'Aug 23, 2026'],
  ['San Diego FC',          'Real Salt Lake',        'Aug 23, 2026'],

  // ── Matchday 19 — Aug 29-30 ──────────────────────────────────────────────────
  ['Inter Miami CF',        'Columbus Crew',         'Aug 29, 2026'],
  ['LAFC',                  'FC Dallas',             'Aug 29, 2026'],
  ['Seattle Sounders FC',   'Real Salt Lake',        'Aug 29, 2026'],
  ['Charlotte FC',          'Philadelphia Union',    'Aug 29, 2026'],
  ['New England Revolution','New York Red Bulls',    'Aug 30, 2026'],
  ['Portland Timbers',      'LAFC',                  'Aug 30, 2026'],
  ['Columbus Crew',         'Atlanta United FC',     'Aug 30, 2026'],
  ['Austin FC',             'Colorado Rapids',       'Aug 30, 2026'],
  ['Houston Dynamo FC',     'St. Louis City SC',     'Aug 30, 2026'],
  ['Sporting Kansas City',  'San Jose Earthquakes',  'Aug 30, 2026'],

  // ── Matchday 20 — Sep 5-6 ────────────────────────────────────────────────────
  ['FC Cincinnati',         'Nashville SC',          'Sep 5, 2026'],
  ['Toronto FC',            'Atlanta United FC',     'Sep 5, 2026'],
  ['LA Galaxy',             'San Diego FC',          'Sep 5, 2026'],
  ['CF Montréal',           'D.C. United',           'Sep 5, 2026'],
  ['Philadelphia Union',    'Inter Miami CF',        'Sep 6, 2026'],
  ['New York City FC',      'Orlando City SC',       'Sep 6, 2026'],
  ['Vancouver Whitecaps FC','Colorado Rapids',       'Sep 6, 2026'],
  ['Minnesota United FC',   'Portland Timbers',      'Sep 6, 2026'],
  ['Real Salt Lake',        'Sporting Kansas City',  'Sep 6, 2026'],
  ['San Jose Earthquakes',  'Austin FC',             'Sep 6, 2026'],

  // ── Matchday 21 — Sep 12-13 ──────────────────────────────────────────────────
  ['Atlanta United FC',     'D.C. United',           'Sep 12, 2026'],
  ['Nashville SC',          'New York City FC',      'Sep 12, 2026'],
  ['LAFC',                  'Seattle Sounders FC',   'Sep 12, 2026'],
  ['Inter Miami CF',        'Toronto FC',            'Sep 12, 2026'],
  ['Columbus Crew',         'Philadelphia Union',    'Sep 13, 2026'],
  ['New York Red Bulls',    'CF Montréal',           'Sep 13, 2026'],
  ['Portland Timbers',      'San Diego FC',          'Sep 13, 2026'],
  ['FC Dallas',             'St. Louis City SC',     'Sep 13, 2026'],
  ['Houston Dynamo FC',     'Minnesota United FC',   'Sep 13, 2026'],
  ['Austin FC',             'Sporting Kansas City',  'Sep 13, 2026'],

  // ── Matchday 22 — Sep 19-20 ──────────────────────────────────────────────────
  ['Charlotte FC',          'CF Montréal',           'Sep 19, 2026'],
  ['D.C. United',           'Nashville SC',          'Sep 19, 2026'],
  ['LA Galaxy',             'Real Salt Lake',        'Sep 19, 2026'],
  ['New England Revolution','Toronto FC',            'Sep 19, 2026'],
  ['Seattle Sounders FC',   'San Jose Earthquakes',  'Sep 20, 2026'],
  ['Orlando City SC',       'FC Cincinnati',         'Sep 20, 2026'],
  ['Colorado Rapids',       'FC Dallas',             'Sep 20, 2026'],
  ['Vancouver Whitecaps FC','LAFC',                  'Sep 20, 2026'],
  ['Sporting Kansas City',  'Columbus Crew',         'Sep 20, 2026'],
  ['St. Louis City SC',     'Atlanta United FC',     'Sep 20, 2026'],

  // ── Matchday 23 — Sep 26-27 ──────────────────────────────────────────────────
  ['Inter Miami CF',        'New England Revolution','Sep 26, 2026'],
  ['FC Cincinnati',         'Charlotte FC',          'Sep 26, 2026'],
  ['LAFC',                  'Minnesota United FC',   'Sep 26, 2026'],
  ['New York City FC',      'New York Red Bulls',    'Sep 26, 2026'],  // Atlantic Derby
  ['Toronto FC',            'Orlando City SC',       'Sep 27, 2026'],
  ['Philadelphia Union',    'D.C. United',           'Sep 27, 2026'],
  ['Portland Timbers',      'Colorado Rapids',       'Sep 27, 2026'],
  ['Austin FC',             'LA Galaxy',             'Sep 27, 2026'],
  ['San Diego FC',          'Houston Dynamo FC',     'Sep 27, 2026'],
  ['Real Salt Lake',        'Vancouver Whitecaps FC','Sep 27, 2026'],

  // ── Matchday 24 — Oct 3-4 ────────────────────────────────────────────────────
  ['Atlanta United FC',     'CF Montréal',           'Oct 3, 2026'],
  ['Columbus Crew',         'New York City FC',      'Oct 3, 2026'],
  ['Nashville SC',          'Inter Miami CF',        'Oct 3, 2026'],
  ['LA Galaxy',             'Vancouver Whitecaps FC','Oct 3, 2026'],
  ['Seattle Sounders FC',   'Austin FC',             'Oct 4, 2026'],
  ['D.C. United',           'Philadelphia Union',    'Oct 4, 2026'],
  ['Minnesota United FC',   'Real Salt Lake',        'Oct 4, 2026'],
  ['Sporting Kansas City',  'Houston Dynamo FC',     'Oct 4, 2026'],
  ['San Jose Earthquakes',  'LAFC',                  'Oct 4, 2026'],
  ['St. Louis City SC',     'FC Cincinnati',         'Oct 4, 2026'],

  // ── Matchday 25 — Oct 10-11 ──────────────────────────────────────────────────
  ['Inter Miami CF',        'Orlando City SC',       'Oct 10, 2026'],
  ['Toronto FC',            'New York Red Bulls',    'Oct 10, 2026'],
  ['Portland Timbers',      'LA Galaxy',             'Oct 10, 2026'],
  ['Charlotte FC',          'Columbus Crew',         'Oct 10, 2026'],
  ['LAFC',                  'Sporting Kansas City',  'Oct 11, 2026'],
  ['FC Cincinnati',         'Atlanta United FC',     'Oct 11, 2026'],
  ['New England Revolution','Nashville SC',          'Oct 11, 2026'],
  ['Colorado Rapids',       'Minnesota United FC',   'Oct 11, 2026'],
  ['FC Dallas',             'San Jose Earthquakes',  'Oct 11, 2026'],
  ['Vancouver Whitecaps FC','San Diego FC',          'Oct 11, 2026'],

  // ── Decision Day — Oct 18 (all matches simultaneous) ─────────────────────────
  ['Inter Miami CF',        'Charlotte FC',          'Oct 18, 2026'],
  ['Columbus Crew',         'D.C. United',           'Oct 18, 2026'],
  ['Nashville SC',          'Philadelphia Union',    'Oct 18, 2026'],
  ['New York City FC',      'Toronto FC',            'Oct 18, 2026'],
  ['New York Red Bulls',    'Atlanta United FC',     'Oct 18, 2026'],
  ['New England Revolution','CF Montréal',           'Oct 18, 2026'],
  ['Orlando City SC',       'FC Cincinnati',         'Oct 18, 2026'],
  ['LAFC',                  'Colorado Rapids',       'Oct 18, 2026'],
  ['LA Galaxy',             'Real Salt Lake',        'Oct 18, 2026'],
  ['Seattle Sounders FC',   'Portland Timbers',      'Oct 18, 2026'],
  ['Austin FC',             'Houston Dynamo FC',     'Oct 18, 2026'],
  ['San Diego FC',          'San Jose Earthquakes',  'Oct 18, 2026'],
  ['Minnesota United FC',   'Sporting Kansas City',  'Oct 18, 2026'],
  ['St. Louis City SC',     'FC Dallas',             'Oct 18, 2026'],
  ['Vancouver Whitecaps FC','Real Salt Lake',        'Oct 18, 2026'],

  // ── MLS Cup Playoffs — First Round (Oct 24-25) ───────────────────────────────
  ['Inter Miami CF',        'Nashville SC',          'Oct 24, 2026'],
  ['Columbus Crew',         'Philadelphia Union',    'Oct 24, 2026'],
  ['LAFC',                  'Seattle Sounders FC',   'Oct 24, 2026'],
  ['LA Galaxy',             'Portland Timbers',      'Oct 25, 2026'],

  // ── Conference Semifinals (Oct 31 - Nov 1) ───────────────────────────────────
  ['Atlanta United FC',     'Inter Miami CF',        'Oct 31, 2026'],
  ['New York City FC',      'Columbus Crew',         'Oct 31, 2026'],
  ['LAFC',                  'LA Galaxy',             'Nov 1, 2026'],    // El Tráfico Playoffs
  ['Seattle Sounders FC',   'Austin FC',             'Nov 1, 2026'],

  // ── Conference Finals (Nov 8) ─────────────────────────────────────────────────
  ['Inter Miami CF',        'New York City FC',      'Nov 8, 2026'],
  ['LAFC',                  'Seattle Sounders FC',   'Nov 8, 2026'],

  // ── MLS Cup Final (Nov 21) ────────────────────────────────────────────────────
  ['Inter Miami CF',        'LAFC',                  'Nov 21, 2026'],
];

let _mlsId = 5000;
const MLS_GAMES = MLS_RAW.map(([home, away, date]) => ({
  id:        _mlsId++,
  title:     `${home} vs. ${away}`,
  venue:     MLS_VENUES[home] || 'TBD',
  date,
  sport:     'mls',
  emoji:     '⚽',
  color:     '#1a2d5a',
  venue_key: MLS_VENUE_KEYS[home] || 'bmo_stadium',
  home,
  away,
  prices:    mlsPrices(home, away),
}));
