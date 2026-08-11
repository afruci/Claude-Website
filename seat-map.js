'use strict';

const SPORT_LABELS = { nfl:'NFL', nba:'NBA', mlb:'MLB', nhl:'NHL', mls:'MLS', ufc:'UFC', worldcup:'World Cup' };

const PLATFORM_COLORS = {
  Ticketmaster: '#026cdf',
  StubHub:      '#5f259f',
  SeatGeek:     '#f4811f',
};

// ── Stadium photo filenames (Wikimedia Commons) ───────────────────────────────
// renderPhoto() builds:  commons.wikimedia.org/wiki/Special:FilePath/NAME?width=1280
// The browser follows the HTTP redirect straight to the Wikimedia CDN image.
// No JS fetch needed — onerror in the <img> tag handles any missing files.
const STADIUM_PHOTOS = {
  // ── NBA arenas ──────────────────────────────────────────────────────────────
  msg:                     'Madison_Square_Garden.jpg',
  td_garden:               'TD_Garden_Boston.jpg',
  // ── NHL arenas ──────────────────────────────────────────────────────────────
  amalie_arena:            'Amalie_Arena.jpg',
  // ── MLB ballparks ────────────────────────────────────────────────────────────
  yankee_stadium:          'Yankee_Stadium.jpg',
  wrigley_field:           'Wrigley_Field.jpg',
  dodger_stadium:          'Dodger_Stadium.jpg',
  fenway_park:             'Fenway_Park.jpg',
  coors_field:             'Coors_Field.jpg',
  oracle_park:             'Oracle_Park.jpg',
  petco_park:              'Petco_Park.jpg',
  tmobile_park:            'T-Mobile_Park_(Seattle).jpg',
  citizens_bank:           'Citizens_Bank_Park.jpg',
  truist_park:             'Truist_Park.jpg',
  chase_field:             'Chase_Field.jpg',
  busch_stadium:           'Busch_Stadium.jpg',
  pnc_park:                'PNC_Park.jpg',
  citi_field:              'Citi_Field.jpg',
  globe_life:              'Globe_Life_Field.jpg',
  minute_maid:             'Minute_Maid_Park.jpg',
  comerica_park:           'Comerica_Park.jpg',
  progressive_field:       'Progressive_Field.jpg',
  great_american:          'Great_American_Ball_Park.jpg',
  guaranteed_rate:         'Guaranteed_Rate_Field.jpg',
  target_field:            'Target_Field.jpg',
  kauffman_stadium:        'Kauffman_Stadium.jpg',
  angel_stadium:           'Angel_Stadium.jpg',
  oriole_park:             'Oriole_Park_at_Camden_Yards.jpg',
  loandepot_park:          'LoanDepot_park.jpg',
  american_family:         'American_Family_Field.jpg',
  tropicana_field:         'Tropicana_Field.jpg',
  rogers_centre:           'Rogers_Centre.jpg',
  nationals_park:          'Nationals_Park.jpg',
  sutter_health:           'Sutter_Health_Park.jpg',
  // ── NFL stadiums ────────────────────────────────────────────────────────────
  att_stadium:             'AT%26T_Stadium.jpg',
  arrowhead_stadium:       'Arrowhead_Stadium.jpg',
  lambeau_field:           'Lambeau_Field.jpg',
  allegiant_stadium:       'Allegiant_Stadium.jpg',
  metlife_stadium:         'MetLife_Stadium.jpg',
  sofi_stadium:            'SoFi_Stadium.jpg',
  levis_stadium:           'Levi%27s_Stadium.jpg',
  lumen_field:             'Lumen_Field.jpg',
  gillette_stadium:        'Gillette_Stadium.jpg',
  hard_rock_stadium:       'Hard_Rock_Stadium.jpg',
  us_bank_stadium:         'US_Bank_Stadium.jpg',
  mercedes_benz_stadium:   'Mercedes-Benz_Stadium.jpg',
  lincoln_financial:       'Lincoln_Financial_Field.jpg',
  soldier_field:           'Soldier_Field.jpg',
  ford_field:              'Ford_Field.jpg',
  caesars_superdome:       'Caesars_Superdome.jpg',
  raymond_james:           'Raymond_James_Stadium.jpg',
  bank_of_america_stadium: 'Bank_of_America_Stadium.jpg',
  nrg_stadium:             'NRG_Stadium.jpg',
  acrisure_stadium:        'Acrisure_Stadium.jpg',
  highmark_stadium:        'Highmark_Stadium.jpg',
  empower_field:           'Empower_Field_at_Mile_High.jpg',
  state_farm_stadium:      'State_Farm_Stadium.jpg',
  mt_bank_stadium:         'M%26T_Bank_Stadium.jpg',
  lucas_oil_stadium:       'Lucas_Oil_Stadium.jpg',
  nissan_stadium:          'Nissan_Stadium.jpg',
  huntington_bank_field:   'Huntington_Bank_Field.jpg',
  paycor_stadium:          'Paycor_Stadium.jpg',
  everbank_stadium:        'EverBank_Stadium.jpg',
  northwest_stadium:       'Northwest_Stadium.jpg',
  // ── MLS / UFC / Soccer ──────────────────────────────────────────────────────
  bmo_stadium:             'BMO_Stadium.jpg',
  t_mobile_arena:          'T-Mobile_Arena.jpg',
  rose_bowl:               'Rose_Bowl_stadium.jpg',
  // ── NHL arenas (new) ────────────────────────────────────────────────────────
  keybank_center:          'KeyBank_Center.jpg',
  little_caesars_arena:    'Little_Caesars_Arena.jpg',
  amerant_bank_arena:      'Amerant_Bank_Arena.jpg',
  bell_centre:             'Bell_Centre.jpg',
  canadian_tire_centre:    'Canadian_Tire_Centre.jpg',
  scotiabank_arena:        'Scotiabank_Arena.jpg',
  pnc_arena:               'PNC_Arena.jpg',
  nationwide_arena:        'Nationwide_Arena.jpg',
  prudential_center:       'Prudential_Center_arena.jpg',
  ubs_arena:               'UBS_Arena.jpg',
  wells_fargo_center:      'Wells_Fargo_Center_(Philadelphia).jpg',
  ppg_paints_arena:        'PPG_Paints_Arena.jpg',
  capital_one_arena:       'Capital_One_Arena.jpg',
  united_center:           'United_Center.jpg',
  ball_arena:              'Ball_Arena.jpg',
  american_airlines_center:'American_Airlines_Center.jpg',
  xcel_energy_center:      'Xcel_Energy_Center.jpg',
  bridgestone_arena:       'Bridgestone_Arena.jpg',
  enterprise_center:       'Enterprise_Center.jpg',
  delta_center:            'Delta_Center.jpg',
  canada_life_centre:      'Canada_Life_Centre.jpg',
  honda_center:            'Honda_Center.jpg',
  scotiabank_saddledome:   'Scotiabank_Saddledome.jpg',
  rogers_place:            'Rogers_Place.jpg',
  cryptodotcom_arena:      'Crypto.com_Arena.jpg',
  sap_center:              'SAP_Center_at_San_Jose.jpg',
  climate_pledge_arena:    'Climate_Pledge_Arena.jpg',
  rogers_arena:            'Rogers_Arena.jpg',
  // ── World Cup (new venues) ───────────────────────────────────────────────────
  bc_place:                'BC_Place.jpg',
  bmo_field_toronto:       'BMO_Field.jpg',
  estadio_azteca:          'Estadio_Azteca.jpg',
  estadio_akron:           'Estadio_Akron.jpg',
  estadio_bbva:            'Estadio_BBVA.jpg',
};

// ── Venue configuration helpers ───────────────────────────────────────────────
function numRange(a, b) {
  return Array.from({ length: b - a + 1 }, (_, i) => String(a + i));
}

// Ring geometry presets
const RINGS_ARENA = {
  lower: { rx1: 114, ry1: 80,  rx2: 196, ry2: 150 },
  upper: { rx1: 206, ry1: 160, rx2: 280, ry2: 218 },
};
const RINGS_BASEBALL = {
  lower: { rx1: 118, ry1: 74,  rx2: 204, ry2: 144 },
  upper: { rx1: 214, ry1: 154, rx2: 294, ry2: 218 },
};
const RINGS_FOOTBALL = {
  lower: { rx1: 122, ry1: 80,  rx2: 206, ry2: 150 },
  upper: { rx1: 216, ry1: 160, rx2: 298, ry2: 226 },
};
const RINGS_LARGE = {
  lower: { rx1: 124, ry1: 82,  rx2: 212, ry2: 155 },
  upper: { rx1: 222, ry1: 165, rx2: 304, ry2: 232 },
};

// ── Per-venue seating configurations ──────────────────────────────────────────
// Sections reflect the actual numbering scheme of each venue.
// Two visual rings (lower / upper) each carry a sorted array of section IDs.
const VENUE_CONFIGS = {

  // ── NBA ───────────────────────────────────────────────────────────────────
  td_garden: {
    // TD Garden: lower bowl 1–22, balcony 300s
    lower: numRange(1, 22),
    upper: numRange(301, 320),
    rings: RINGS_ARENA,
    rows: 'ABCDEFGHIJKLMNO'.split(''),
    seatsPerRow: 22,
  },

  // ── NHL ───────────────────────────────────────────────────────────────────
  amalie_arena: {
    // Amalie Arena: 101–124 lower, 301–316 upper
    lower: numRange(101, 124),
    upper: numRange(301, 316),
    rings: RINGS_ARENA,
    rows: 'ABCDEFGHIJKLMN'.split(''),
    seatsPerRow: 20,
  },

  // ── MLB ───────────────────────────────────────────────────────────────────
  yankee_stadium: {
    // Yankee Stadium: main level 101–136, grandstand 201–236; rows numbered
    lower: numRange(101, 136),
    upper: numRange(201, 236),
    rings: RINGS_BASEBALL,
    rows: numRange(1, 22),
    seatsPerRow: 22,
  },
  wrigley_field: {
    // Wrigley Field: field box/terrace 1–32, upper reserved 400–432; rows numbered
    lower: numRange(1, 32),
    upper: numRange(400, 432),
    rings: RINGS_BASEBALL,
    rows: numRange(1, 18),
    seatsPerRow: 18,
  },
  dodger_stadium: {
    // Dodger Stadium: field level 1–52, top deck 301–335; rows numbered
    lower: numRange(1, 52),
    upper: numRange(301, 335),
    rings: RINGS_BASEBALL,
    rows: numRange(1, 22),
    seatsPerRow: 20,
  },

  // ── UFC ───────────────────────────────────────────────────────────────────
  t_mobile_arena: {
    // T-Mobile Arena: floor/lower 1–20, upper 201–212
    lower: numRange(1, 20),
    upper: numRange(201, 212),
    rings: RINGS_ARENA,
    rows: 'ABCDEFGHIJKLM'.split(''),
    seatsPerRow: 20,
  },

  // ── MLS ───────────────────────────────────────────────────────────────────
  bmo_stadium: {
    // BMO Stadium (formerly Banc of California): 101–120 lower, 201–212 upper
    lower: numRange(101, 120),
    upper: numRange(201, 212),
    rings: RINGS_ARENA,
    rows: 'ABCDEFGHIJK'.split(''),
    seatsPerRow: 24,
  },

  // ── NFL ───────────────────────────────────────────────────────────────────
  att_stadium: {
    // AT&T Stadium: club 101–144, upper 301–344
    lower: numRange(101, 130),
    upper: numRange(301, 330),
    rings: RINGS_FOOTBALL,
    rows: 'ABCDEFGHIJKLMNOPQRST'.split(''),
    seatsPerRow: 26,
  },
  arrowhead_stadium: {
    // Arrowhead Stadium: lower 101–128, upper 301–328
    lower: numRange(101, 128),
    upper: numRange(301, 328),
    rings: RINGS_FOOTBALL,
    rows: 'ABCDEFGHIJKLMNOPQRS'.split(''),
    seatsPerRow: 26,
  },
  lambeau_field: {
    // Lambeau Field: lower 101–138, upper 201–238
    lower: numRange(101, 130),
    upper: numRange(201, 230),
    rings: RINGS_FOOTBALL,
    rows: 'ABCDEFGHIJKLMNOPQRS'.split(''),
    seatsPerRow: 24,
  },
  allegiant_stadium: {
    // Allegiant Stadium: lower 101–132, upper 301–332
    lower: numRange(101, 130),
    upper: numRange(301, 330),
    rings: RINGS_FOOTBALL,
    rows: 'ABCDEFGHIJKLMNOPQRST'.split(''),
    seatsPerRow: 26,
  },

  // ── World Cup / large venues ──────────────────────────────────────────────
  metlife_stadium: {
    // MetLife Stadium: stadium level 101–140, upper 301–340
    lower: numRange(101, 132),
    upper: numRange(301, 332),
    rings: RINGS_LARGE,
    rows: 'ABCDEFGHIJKLMNOPQRSTUV'.split(''),
    seatsPerRow: 28,
  },
  rose_bowl: {
    // Rose Bowl: home side 1–16 + hillside H1–H16 (lower), same pattern upper
    lower: [...numRange(1, 16), ...Array.from({ length: 16 }, (_, i) => `H${i + 1}`)],
    upper: [...numRange(17, 32), ...Array.from({ length: 16 }, (_, i) => `H${i + 17}`)],
    rings: RINGS_LARGE,
    rows: 'ABCDEFGHIJKLMNOPQRSTUVWX'.split(''),
    seatsPerRow: 30,
  },

  // ── NBA ───────────────────────────────────────────────────────────────────────
  msg: {
    // Madison Square Garden: suite/floor 1–20, upper 200–225
    lower: numRange(1, 20),
    upper: numRange(200, 225),
    rings: RINGS_ARENA,
    rows: 'ABCDEFGHIJKLMNO'.split(''),
    seatsPerRow: 20,
  },

  // ── NFL (additional stadiums) ─────────────────────────────────────────────────
  lumen_field:             { lower: numRange(101,136), upper: numRange(301,336), rings: RINGS_FOOTBALL, rows: 'ABCDEFGHIJKLMNOPQRST'.split(''), seatsPerRow: 24 },
  sofi_stadium:            { lower: numRange(101,140), upper: numRange(301,340), rings: RINGS_LARGE,    rows: 'ABCDEFGHIJKLMNOPQRST'.split(''), seatsPerRow: 26 },
  levis_stadium:           { lower: numRange(101,136), upper: numRange(301,336), rings: RINGS_FOOTBALL, rows: 'ABCDEFGHIJKLMNOPQRS'.split(''),  seatsPerRow: 24 },
  nrg_stadium:             { lower: numRange(101,138), upper: numRange(301,338), rings: RINGS_FOOTBALL, rows: 'ABCDEFGHIJKLMNOPQRST'.split(''), seatsPerRow: 26 },
  ford_field:              { lower: numRange(101,134), upper: numRange(301,334), rings: RINGS_FOOTBALL, rows: 'ABCDEFGHIJKLMNOPQRS'.split(''),  seatsPerRow: 24 },
  us_bank_stadium:         { lower: numRange(101,136), upper: numRange(301,336), rings: RINGS_FOOTBALL, rows: 'ABCDEFGHIJKLMNOPQRS'.split(''),  seatsPerRow: 24 },
  lincoln_financial:       { lower: numRange(101,138), upper: numRange(201,238), rings: RINGS_FOOTBALL, rows: 'ABCDEFGHIJKLMNOPQRST'.split(''), seatsPerRow: 24 },
  mercedes_benz_stadium:   { lower: numRange(101,138), upper: numRange(301,338), rings: RINGS_LARGE,    rows: 'ABCDEFGHIJKLMNOPQRST'.split(''), seatsPerRow: 26 },
  acrisure_stadium:        { lower: numRange(101,136), upper: numRange(301,336), rings: RINGS_FOOTBALL, rows: 'ABCDEFGHIJKLMNOPQRS'.split(''),  seatsPerRow: 24 },
  bank_of_america_stadium: { lower: numRange(101,140), upper: numRange(301,340), rings: RINGS_FOOTBALL, rows: 'ABCDEFGHIJKLMNOPQRST'.split(''), seatsPerRow: 26 },
  highmark_stadium:        { lower: numRange(101,136), upper: numRange(301,336), rings: RINGS_FOOTBALL, rows: 'ABCDEFGHIJKLMNOPQRST'.split(''), seatsPerRow: 24 },
  paycor_stadium:          { lower: numRange(101,134), upper: numRange(301,334), rings: RINGS_FOOTBALL, rows: 'ABCDEFGHIJKLMNOPQRS'.split(''),  seatsPerRow: 24 },
  huntington_bank_field:   { lower: numRange(101,136), upper: numRange(301,336), rings: RINGS_FOOTBALL, rows: 'ABCDEFGHIJKLMNOPQRS'.split(''),  seatsPerRow: 24 },
  everbank_stadium:        { lower: numRange(101,136), upper: numRange(301,336), rings: RINGS_FOOTBALL, rows: 'ABCDEFGHIJKLMNOPQRS'.split(''),  seatsPerRow: 24 },
  hard_rock_stadium:       { lower: numRange(101,138), upper: numRange(300,338), rings: RINGS_FOOTBALL, rows: 'ABCDEFGHIJKLMNOPQRST'.split(''), seatsPerRow: 24 },
  gillette_stadium:        { lower: numRange(101,136), upper: numRange(301,336), rings: RINGS_FOOTBALL, rows: 'ABCDEFGHIJKLMNOPQRS'.split(''),  seatsPerRow: 24 },
  caesars_superdome:       { lower: numRange(101,140), upper: numRange(300,340), rings: RINGS_LARGE,    rows: 'ABCDEFGHIJKLMNOPQRST'.split(''), seatsPerRow: 26 },
  raymond_james:           { lower: numRange(101,138), upper: numRange(301,338), rings: RINGS_FOOTBALL, rows: 'ABCDEFGHIJKLMNOPQRST'.split(''), seatsPerRow: 24 },
  nissan_stadium:          { lower: numRange(101,136), upper: numRange(301,336), rings: RINGS_FOOTBALL, rows: 'ABCDEFGHIJKLMNOPQRST'.split(''), seatsPerRow: 24 },
  empower_field:           { lower: numRange(101,140), upper: numRange(300,340), rings: RINGS_LARGE,    rows: 'ABCDEFGHIJKLMNOPQRSTUV'.split(''), seatsPerRow: 26 },
  state_farm_stadium:      { lower: numRange(101,134), upper: numRange(301,334), rings: RINGS_FOOTBALL, rows: 'ABCDEFGHIJKLMNOPQRS'.split(''),  seatsPerRow: 24 },
  mt_bank_stadium:         { lower: numRange(101,136), upper: numRange(300,336), rings: RINGS_FOOTBALL, rows: 'ABCDEFGHIJKLMNOPQRST'.split(''), seatsPerRow: 24 },
  northwest_stadium:       { lower: numRange(100,140), upper: numRange(400,440), rings: RINGS_LARGE,    rows: 'ABCDEFGHIJKLMNOPQRSTUV'.split(''), seatsPerRow: 28 },
  soldier_field:           { lower: numRange(1,30),    upper: numRange(100,130), rings: RINGS_FOOTBALL, rows: 'ABCDEFGHIJKLMNOPQ'.split(''),   seatsPerRow: 22 },
  lucas_oil_stadium:       { lower: numRange(101,136), upper: numRange(301,336), rings: RINGS_FOOTBALL, rows: 'ABCDEFGHIJKLMNOPQRS'.split(''),  seatsPerRow: 24 },

  // ── NHL arenas (additional) ───────────────────────────────────────────────────
  keybank_center:          { lower: numRange(101,120), upper: numRange(301,316), rings: RINGS_ARENA,   rows: 'ABCDEFGHIJKLMN'.split(''),  seatsPerRow: 20 },
  little_caesars_arena:    { lower: numRange(101,120), upper: numRange(201,216), rings: RINGS_ARENA,   rows: 'ABCDEFGHIJKLMN'.split(''),  seatsPerRow: 20 },
  amerant_bank_arena:      { lower: numRange(101,122), upper: numRange(301,316), rings: RINGS_ARENA,   rows: 'ABCDEFGHIJKLMN'.split(''),  seatsPerRow: 20 },
  bell_centre:             { lower: numRange(101,126), upper: numRange(301,320), rings: RINGS_ARENA,   rows: 'ABCDEFGHIJKLMNO'.split(''), seatsPerRow: 22 },
  canadian_tire_centre:    { lower: numRange(101,120), upper: numRange(301,316), rings: RINGS_ARENA,   rows: 'ABCDEFGHIJKLMN'.split(''),  seatsPerRow: 20 },
  scotiabank_arena:        { lower: numRange(101,122), upper: numRange(301,318), rings: RINGS_ARENA,   rows: 'ABCDEFGHIJKLMN'.split(''),  seatsPerRow: 22 },
  pnc_arena:               { lower: numRange(101,120), upper: numRange(201,216), rings: RINGS_ARENA,   rows: 'ABCDEFGHIJKLMN'.split(''),  seatsPerRow: 20 },
  nationwide_arena:        { lower: numRange(101,120), upper: numRange(201,216), rings: RINGS_ARENA,   rows: 'ABCDEFGHIJKLMN'.split(''),  seatsPerRow: 20 },
  prudential_center:       { lower: numRange(1,22),    upper: numRange(201,218), rings: RINGS_ARENA,   rows: 'ABCDEFGHIJKLMN'.split(''),  seatsPerRow: 20 },
  ubs_arena:               { lower: numRange(101,120), upper: numRange(301,316), rings: RINGS_ARENA,   rows: 'ABCDEFGHIJKLMN'.split(''),  seatsPerRow: 20 },
  wells_fargo_center:      { lower: numRange(101,122), upper: numRange(201,218), rings: RINGS_ARENA,   rows: 'ABCDEFGHIJKLMN'.split(''),  seatsPerRow: 22 },
  ppg_paints_arena:        { lower: numRange(101,122), upper: numRange(201,216), rings: RINGS_ARENA,   rows: 'ABCDEFGHIJKLMN'.split(''),  seatsPerRow: 20 },
  capital_one_arena:       { lower: numRange(101,120), upper: numRange(201,216), rings: RINGS_ARENA,   rows: 'ABCDEFGHIJKLMN'.split(''),  seatsPerRow: 20 },
  united_center:           { lower: numRange(101,124), upper: numRange(301,320), rings: RINGS_ARENA,   rows: 'ABCDEFGHIJKLMNO'.split(''), seatsPerRow: 22 },
  ball_arena:              { lower: numRange(101,124), upper: numRange(301,320), rings: RINGS_ARENA,   rows: 'ABCDEFGHIJKLMN'.split(''),  seatsPerRow: 20 },
  american_airlines_center:{ lower: numRange(101,122), upper: numRange(301,318), rings: RINGS_ARENA,   rows: 'ABCDEFGHIJKLMN'.split(''),  seatsPerRow: 22 },
  xcel_energy_center:      { lower: numRange(101,122), upper: numRange(201,218), rings: RINGS_ARENA,   rows: 'ABCDEFGHIJKLMN'.split(''),  seatsPerRow: 20 },
  bridgestone_arena:       { lower: numRange(101,118), upper: numRange(201,216), rings: RINGS_ARENA,   rows: 'ABCDEFGHIJKLM'.split(''),   seatsPerRow: 20 },
  enterprise_center:       { lower: numRange(101,122), upper: numRange(201,218), rings: RINGS_ARENA,   rows: 'ABCDEFGHIJKLMN'.split(''),  seatsPerRow: 20 },
  delta_center:            { lower: numRange(1,20),    upper: numRange(101,116), rings: RINGS_ARENA,   rows: 'ABCDEFGHIJKLMN'.split(''),  seatsPerRow: 20 },
  canada_life_centre:      { lower: numRange(101,118), upper: numRange(301,316), rings: RINGS_ARENA,   rows: 'ABCDEFGHIJKLMN'.split(''),  seatsPerRow: 20 },
  honda_center:            { lower: numRange(201,224), upper: numRange(401,420), rings: RINGS_ARENA,   rows: 'ABCDEFGHIJKLM'.split(''),   seatsPerRow: 20 },
  scotiabank_saddledome:   { lower: numRange(101,120), upper: numRange(201,218), rings: RINGS_ARENA,   rows: 'ABCDEFGHIJKLMN'.split(''),  seatsPerRow: 20 },
  rogers_place:            { lower: numRange(101,124), upper: numRange(201,218), rings: RINGS_ARENA,   rows: 'ABCDEFGHIJKLMN'.split(''),  seatsPerRow: 22 },
  cryptodotcom_arena:      { lower: numRange(101,122), upper: numRange(301,318), rings: RINGS_ARENA,   rows: 'ABCDEFGHIJKLMNO'.split(''), seatsPerRow: 22 },
  sap_center:              { lower: numRange(101,118), upper: numRange(201,216), rings: RINGS_ARENA,   rows: 'ABCDEFGHIJKLM'.split(''),   seatsPerRow: 18 },
  climate_pledge_arena:    { lower: numRange(101,122), upper: numRange(201,218), rings: RINGS_ARENA,   rows: 'ABCDEFGHIJKLMN'.split(''),  seatsPerRow: 20 },
  rogers_arena:            { lower: numRange(101,122), upper: numRange(301,318), rings: RINGS_ARENA,   rows: 'ABCDEFGHIJKLMN'.split(''),  seatsPerRow: 20 },
  // ── World Cup stadiums (new) ──────────────────────────────────────────────────
  bc_place:                { lower: numRange(200,230), upper: numRange(500,530), rings: RINGS_FOOTBALL, rows: 'ABCDEFGHIJKLMNOPQRS'.split(''),    seatsPerRow: 24 },
  bmo_field_toronto:       { lower: numRange(101,120), upper: numRange(201,214), rings: RINGS_FOOTBALL, rows: 'ABCDEFGHIJKLMNO'.split(''),       seatsPerRow: 22 },
  estadio_azteca:          { lower: numRange(1,40),    upper: numRange(100,140), rings: RINGS_LARGE,    rows: 'ABCDEFGHIJKLMNOPQRSTUVWX'.split(''), seatsPerRow: 30 },
  estadio_akron:           { lower: numRange(101,130), upper: numRange(301,330), rings: RINGS_FOOTBALL, rows: 'ABCDEFGHIJKLMNOPQRS'.split(''),    seatsPerRow: 24 },
  estadio_bbva:            { lower: numRange(101,130), upper: numRange(301,330), rings: RINGS_FOOTBALL, rows: 'ABCDEFGHIJKLMNOPQRS'.split(''),    seatsPerRow: 24 },

  // ── MLB (additional stadiums) ─────────────────────────────────────────────────
  // MLB rows are numbered (Row 1, 2, 3…) — not lettered — at every ballpark.
  chase_field:       { lower: numRange(101,136), upper: numRange(301,340), rings: RINGS_BASEBALL, rows: numRange(1,20), seatsPerRow: 20 },
  truist_park:       { lower: numRange(101,136), upper: numRange(400,428), rings: RINGS_BASEBALL, rows: numRange(1,20), seatsPerRow: 20 },
  oriole_park:       { lower: numRange(1,54),    upper: [...numRange(300,318), ...numRange(348,366)], rings: RINGS_BASEBALL, rows: numRange(1,18), seatsPerRow: 18 },
  fenway_park:       { lower: numRange(1,32),    upper: numRange(300,332), rings: RINGS_BASEBALL, rows: numRange(1,15), seatsPerRow: 18 },
  guaranteed_rate:   { lower: numRange(101,162), upper: numRange(501,540), rings: RINGS_BASEBALL, rows: numRange(1,20), seatsPerRow: 18 },
  great_american:    { lower: numRange(100,134), upper: numRange(400,434), rings: RINGS_BASEBALL, rows: numRange(1,20), seatsPerRow: 20 },
  progressive_field: { lower: numRange(101,130), upper: numRange(400,430), rings: RINGS_BASEBALL, rows: numRange(1,18), seatsPerRow: 18 },
  coors_field:       { lower: numRange(101,152), upper: numRange(300,340), rings: RINGS_BASEBALL, rows: numRange(1,22), seatsPerRow: 22 },
  comerica_park:     { lower: numRange(101,130), upper: numRange(326,352), rings: RINGS_BASEBALL, rows: numRange(1,20), seatsPerRow: 20 },
  minute_maid:       { lower: numRange(100,145), upper: numRange(400,441), rings: RINGS_BASEBALL, rows: numRange(1,20), seatsPerRow: 20 },
  kauffman_stadium:  { lower: numRange(101,130), upper: numRange(400,428), rings: RINGS_BASEBALL, rows: numRange(1,18), seatsPerRow: 18 },
  angel_stadium:     { lower: numRange(101,140), upper: numRange(400,436), rings: RINGS_BASEBALL, rows: numRange(1,20), seatsPerRow: 20 },
  loandepot_park:    { lower: numRange(1,36),    upper: numRange(100,130), rings: RINGS_BASEBALL, rows: numRange(1,18), seatsPerRow: 18 },
  american_family:   { lower: numRange(101,130), upper: numRange(401,430), rings: RINGS_BASEBALL, rows: numRange(1,20), seatsPerRow: 20 },
  target_field:      { lower: numRange(1,34),    upper: numRange(300,328), rings: RINGS_BASEBALL, rows: numRange(1,18), seatsPerRow: 18 },
  citi_field:        { lower: numRange(101,130), upper: numRange(500,530), rings: RINGS_BASEBALL, rows: numRange(1,20), seatsPerRow: 20 },
  sutter_health:     { lower: numRange(101,118), upper: numRange(201,214), rings: RINGS_BASEBALL, rows: numRange(1,16), seatsPerRow: 16 },
  citizens_bank:     { lower: numRange(101,141), upper: numRange(300,332), rings: RINGS_BASEBALL, rows: numRange(1,20), seatsPerRow: 20 },
  pnc_park:          { lower: numRange(1,38),    upper: numRange(301,328), rings: RINGS_BASEBALL, rows: numRange(1,18), seatsPerRow: 18 },
  petco_park:        { lower: numRange(100,130), upper: numRange(300,332), rings: RINGS_BASEBALL, rows: numRange(1,20), seatsPerRow: 20 },
  oracle_park:       { lower: numRange(101,140), upper: numRange(300,335), rings: RINGS_BASEBALL, rows: numRange(1,20), seatsPerRow: 18 },
  tmobile_park:      { lower: numRange(100,136), upper: numRange(300,336), rings: RINGS_BASEBALL, rows: numRange(1,22), seatsPerRow: 20 },
  busch_stadium:     { lower: numRange(101,148), upper: numRange(400,430), rings: RINGS_BASEBALL, rows: numRange(1,20), seatsPerRow: 20 },
  tropicana_field:   { lower: numRange(101,122), upper: numRange(201,220), rings: RINGS_BASEBALL, rows: numRange(1,16), seatsPerRow: 16 },
  globe_life:        { lower: numRange(1,38),    upper: numRange(200,230), rings: RINGS_BASEBALL, rows: numRange(1,20), seatsPerRow: 20 },
  rogers_centre:     { lower: numRange(100,140), upper: numRange(500,536), rings: RINGS_BASEBALL, rows: numRange(1,22), seatsPerRow: 22 },
  nationals_park:    { lower: numRange(101,136), upper: numRange(300,332), rings: RINGS_BASEBALL, rows: numRange(1,20), seatsPerRow: 20 },
};

const DEFAULT_VENUE = {
  lower: numRange(101, 118),
  upper: numRange(301, 318),
  rings: RINGS_FOOTBALL,
  rows: 'ABCDEFGHIJKLMNOP'.split(''),
  seatsPerRow: 22,
};

// ── Formatting ────────────────────────────────────────────────────────────────
const fmt = n => '$' + n.toLocaleString('en-US');

// ── Count available seats for section header display ──────────────────────────
function estimateAvailCount(secId, globalIdx, cfg) {
  const n = parseInt(String(secId), 10) || (globalIdx + 1);
  let count = 0;
  for (let r = 0; r < cfg.rows.length; r++) {
    for (let s = 1; s <= cfg.seatsPerRow; s++) {
      const seed = n * 1000 + r * 100 + s;
      if (Math.abs(Math.sin(seed * 17 + r * 31)) > 0.28) count++;
    }
  }
  return count;
}

// ── Platform purchase-link builder ────────────────────────────────────────────
function platformUrl(platform, event) {
  // Convert a team/event name to a URL slug: "Dallas Cowboys" → "dallas-cowboys"
  function toSlug(s) {
    return s.toLowerCase()
      .replace(/['’&]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+$/, '');
  }

  // Sport-level category pages used as fallback when no home team is set
  const sportFallback = {
    nfl:      { tm: 'nfl-football', sh: 'nfl-tickets',     sg: 'nfl-tickets'     },
    mlb:      { tm: 'mlb-baseball', sh: 'mlb-tickets',     sg: 'mlb-tickets'     },
    nba:      { tm: 'nba-basketball',sh: 'nba-tickets',    sg: 'nba-tickets'     },
    nhl:      { tm: 'nhl-hockey',   sh: 'nhl-tickets',     sg: 'nhl-tickets'     },
    worldcup: { tm: 'soccer',       sh: 'soccer-tickets',  sg: 'world-cup-tickets'},
    ufc:      { tm: 'mma',          sh: 'ufc-tickets',     sg: 'ufc-tickets'     },
    mls:      { tm: 'soccer',       sh: 'mls-tickets',     sg: 'mls-tickets'     },
  };
  const fb = sportFallback[event.sport] || { tm: 'sports', sh: 'sports-tickets', sg: 'sports' };
  const teamSlug = event.home ? toSlug(event.home) : null;

  if (platform === 'Ticketmaster') {
    // Ticketmaster team page: /dallas-cowboys-tickets/artist/... doesn't need the ID –
    // the slug alone redirects to the right team listing.
    return teamSlug
      ? `https://www.ticketmaster.com/${teamSlug}-tickets`
      : `https://www.ticketmaster.com/browse/sports/${fb.tm}`;
  }
  if (platform === 'StubHub') {
    // StubHub team pages: stubhub.com/dallas-cowboys-tickets/
    return teamSlug
      ? `https://www.stubhub.com/${teamSlug}-tickets/`
      : `https://www.stubhub.com/${fb.sh}/`;
  }
  if (platform === 'SeatGeek') {
    // SeatGeek team pages: seatgeek.com/dallas-cowboys-tickets
    return teamSlug
      ? `https://seatgeek.com/${teamSlug}-tickets`
      : `https://seatgeek.com/${fb.sg}`;
  }
  return '#';
}

// ── Generate lazy ticket HTML for a section body ──────────────────────────────
function generateSectionBody(secId, level, globalIdx, cfg, event) {
  const n       = parseInt(String(secId), 10) || (globalIdx + 1);
  const baseAvg = event.prices.reduce((s, p) => s + p.base + p.fees, 0) / event.prices.length;
  const lvlMult = level === 'lower' ? 1.12 : 0.88;
  let html = '';
  let hasAny = false;

  cfg.rows.forEach((letter, ri) => {
    const rowMult = 1 + (1 - ri / cfg.rows.length) * 0.18;
    let rowHtml = '';
    let maxConsec = 0, curRun = 0;

    for (let s = 1; s <= cfg.seatsPerRow; s++) {
      const seed = n * 1000 + ri * 100 + s;
      if (Math.abs(Math.sin(seed * 17 + ri * 31)) <= 0.28) { curRun = 0; continue; }
      curRun++;
      if (curRun > maxConsec) maxConsec = curRun;
      hasAny = true;

      // Determine which platforms list this seat
      const ms = Math.abs(Math.cos(seed * 7 + globalIdx * 13));
      let pIdxs;
      if (ms > 0.92) {
        pIdxs = [0, 1, 2];
      } else if (ms > 0.78) {
        pIdxs = [[0, 1], [0, 2], [1, 2]][Math.floor(ms * 10) % 3];
      } else {
        pIdxs = [Math.floor(Math.abs(Math.sin(seed * 23)) * 3) % 3];
      }
      // Clamp to valid platform indices
      pIdxs = pIdxs.filter(pi => pi < event.prices.length);
      if (pIdxs.length === 0) pIdxs = [0];

      const seatBase = baseAvg * lvlMult * rowMult * (1 + Math.sin(seed * 41) * 0.08);
      const multi    = pIdxs.length > 1;

      let minSeatPrice = Infinity;
      let bestPlatform = '';
      const platsHtml = pIdxs.map(pi => {
        const ep  = event.prices[pi];
        const cls = ep.platform.toLowerCase().replace(/\s+/g, '');
        const px  = Math.max(1, Math.round(seatBase * (ep.base + ep.fees) / baseAvg));
        if (px < minSeatPrice) { minSeatPrice = px; bestPlatform = ep.platform; }
        const url = platformUrl(ep.platform, event);
        return `<a class="te-plat ${cls}" href="${url}" target="_blank" rel="noopener noreferrer">${ep.platform} — ${fmt(px)}</a>`;
      }).join('');

      const caution = multi
        ? `<span class="te-caution">⚠️ Listed on ${pIdxs.length} platforms</span>`
        : '';

      const bellBtn =
        `<button class="te-bell" aria-label="Set price alert for seat ${s}"` +
        ` data-section="Section&nbsp;${secId}" data-row="Row&nbsp;${letter}"` +
        ` data-seat="Seat&nbsp;${s}" data-price="${minSeatPrice}" data-platform="${bestPlatform}"` +
        ` onclick="openAlertModal(this)">` +
        `<i class="ti ti-bell" aria-hidden="true"></i></button>`;

      rowHtml +=
        `<div class="ticket-entry${multi ? ' multi-listed' : ''}" data-price="${minSeatPrice}">` +
        `<span class="te-seat">Seat&nbsp;${s}</span>` +
        `<div class="te-platforms">${platsHtml}${caution}</div>` +
        `${bellBtn}` +
        `</div>`;
    }

    if (rowHtml) {
      html += `<div class="row-group" data-max-consec="${maxConsec}"><div class="row-label">Row ${letter}</div>${rowHtml}</div>`;
    }
  });

  return hasAny
    ? html
    : '<p class="no-tickets">No tickets available in this section.</p>';
}

// ── Section accordion toggle ──────────────────────────────────────────────────
window.toggleSection = function(btn) {
  const item  = btn.closest('.section-item');
  const body  = item.querySelector('.section-body');
  const arrow = btn.querySelector('.sh-arrow');
  const isOpen = item.classList.contains('open');

  if (isOpen) {
    body.style.maxHeight = '0';
    item.classList.remove('open');
    arrow.textContent = '▶';
    btn.setAttribute('aria-expanded', 'false');
  } else {
    // Lazy-render ticket listings on first expand
    if (!body.dataset.rendered) {
      body.dataset.rendered = '1';
      body.innerHTML = body.dataset.pending;
      delete body.dataset.pending;
      applyFilters(item); // apply current filters to the just-rendered section
    }
    body.style.maxHeight = body.scrollHeight + 'px';
    item.classList.add('open');
    arrow.textContent = '▼';
    btn.setAttribute('aria-expanded', 'true');
  }
};

// ── Expand / collapse all sections ───────────────────────────────────────────
let _expandedAll = false;

window.expandAll = function() {
  _expandedAll = !_expandedAll;

  document.querySelectorAll('.section-item').forEach(item => {
    const body  = item.querySelector('.section-body');
    const arrow = item.querySelector('.sh-arrow');
    const hdr   = item.querySelector('.section-header');

    if (_expandedAll) {
      if (!body.dataset.rendered) {
        body.dataset.rendered = '1';
        body.innerHTML = body.dataset.pending;
        delete body.dataset.pending;
      }
      body.style.maxHeight = body.scrollHeight + 'px';
      item.classList.add('open');
      if (arrow) arrow.textContent = '▼';
      if (hdr)   hdr.setAttribute('aria-expanded', 'true');
    } else {
      body.style.maxHeight = '0';
      item.classList.remove('open');
      if (arrow) arrow.textContent = '▶';
      if (hdr)   hdr.setAttribute('aria-expanded', 'false');
    }
  });

  if (_expandedAll) applyFilters();

  const btn = document.getElementById('expandAllBtn');
  if (btn) btn.textContent = _expandedAll ? 'Collapse All' : 'Expand All';
};

// ── Render section accordion ──────────────────────────────────────────────────
function renderAccordion(event) {
  const cfg       = VENUE_CONFIGS[event.venue_key] || DEFAULT_VENUE;
  const container = document.getElementById('sectionsAccordion');
  container.innerHTML = '';
  _expandedAll = false;

  let globalIdx = 0;

  ['lower', 'upper'].forEach(level => {
    const ids        = cfg[level];
    const groupLabel = level === 'lower' ? 'Lower Bowl' : 'Upper Bowl';

    const groupEl = document.createElement('div');
    groupEl.className = 'bowl-group';
    groupEl.innerHTML = `<div class="bowl-label">${groupLabel}</div>`;

    ids.forEach(secId => {
      const gi      = globalIdx++;
      const avail   = estimateAvailCount(secId, gi, cfg);
      const bodyHtml = generateSectionBody(secId, level, gi, cfg, event);

      const availText  = avail > 0
        ? `${avail} seat${avail !== 1 ? 's' : ''} available`
        : 'No availability';
      const levelLabel = level === 'lower' ? 'Lower Bowl' : 'Upper Bowl';

      const item = document.createElement('div');
      item.className = 'section-item';
      item.innerHTML =
        `<button class="section-header" onclick="toggleSection(this)" aria-expanded="false">` +
          `<div class="sh-left">` +
            `<span class="sh-num">Section ${secId}</span>` +
            `<span class="sh-level">${levelLabel}</span>` +
          `</div>` +
          `<div class="sh-right">` +
            `<span class="sh-avail">${availText}</span>` +
            `<span class="sh-arrow">▶</span>` +
          `</div>` +
        `</button>` +
        `<div class="section-body" style="max-height:0;overflow:hidden;transition:max-height .3s ease"></div>`;

      // Store body HTML as pending data — only injected when section is first opened
      item.querySelector('.section-body').dataset.pending = bodyHtml;

      groupEl.appendChild(item);
    });

    container.appendChild(groupEl);
  });
}

// ── Filters (max price + seats together) ─────────────────────────────────────
let _maxPriceFilter = Infinity;
let _priceSliderMax = 1000;
let _seatsFilter    = 1;      // minimum consecutive seats required

function buildFilters(event) {
  const wrap = document.getElementById('priceFilterWrap');
  if (!wrap) return;

  // Estimate price ceiling from the event's all-in prices
  const maxEventPrice = Math.max(...event.prices.map(p => p.base + p.fees));
  const sliderMax     = Math.ceil(maxEventPrice * 1.5 / 50) * 50;
  _priceSliderMax = sliderMax;
  _maxPriceFilter = Infinity;
  _seatsFilter    = 1;

  const step = sliderMax < 500 ? 5 : sliderMax < 2000 ? 10 : sliderMax < 6000 ? 50 : 100;

  const seatPills = [1, 2, 3, 4, 5, 6].map(v => `
    <button class="sm-sf-tile${v === 1 ? ' active' : ''}"
            data-seats="${v}"
            onclick="setSeatsFilter(${v})">${v === 6 ? '6+' : v}</button>`).join('');

  wrap.innerHTML = `
    <div class="sm-filters-bar">
      <div class="sm-pf-section">
        <div class="sm-pf-header">
          <span class="sm-pf-label">Max price <span class="sm-pf-allin">· all-in per seat</span></span>
          <span class="sm-pf-display" id="smPfDisplay">Any price</span>
          <button class="sm-pf-clear" id="smPfClear" onclick="clearMaxPrice()" style="display:none">Clear</button>
        </div>
        <div class="sm-pf-track-wrap">
          <div class="sm-pf-track">
            <div class="sm-pf-fill" id="smPfFill"></div>
          </div>
          <input type="range" class="sm-pf-thumb" id="smPfThumb"
                 min="0" max="${sliderMax}" value="${sliderMax}" step="${step}"
                 oninput="onMaxPriceInput(this)">
        </div>
      </div>

      <div class="sm-filter-divider"></div>

      <div class="sm-sf-section">
        <span class="sm-sf-label">Seats together</span>
        <div class="sm-sf-tiles">${seatPills}</div>
      </div>
    </div>`;
}

window.onMaxPriceInput = function(el) {
  const val  = +el.value;
  const sMax = _priceSliderMax;

  _maxPriceFilter = val >= sMax ? Infinity : val;

  const pct  = (val / sMax) * 100;
  const fill = document.getElementById('smPfFill');
  if (fill) fill.style.right = (100 - pct).toFixed(1) + '%';

  const disp = document.getElementById('smPfDisplay');
  if (disp) disp.textContent = val >= sMax ? 'Any price' : `Up to ${fmt(val)}`;

  const btn = document.getElementById('smPfClear');
  if (btn) btn.style.display = val < sMax ? 'inline-block' : 'none';

  applyFilters();
};

window.clearMaxPrice = function() {
  _maxPriceFilter = Infinity;
  const thumb = document.getElementById('smPfThumb');
  if (thumb) thumb.value = _priceSliderMax;

  const fill = document.getElementById('smPfFill');
  if (fill) fill.style.right = '0%';

  const disp = document.getElementById('smPfDisplay');
  if (disp) disp.textContent = 'Any price';

  const btn = document.getElementById('smPfClear');
  if (btn) btn.style.display = 'none';

  applyFilters();
};

window.setSeatsFilter = function(n) {
  _seatsFilter = n;

  // Update active pill
  document.querySelectorAll('.sm-sf-tile').forEach(p => {
    p.classList.toggle('active', +p.dataset.seats === n);
  });

  applyFilters();
};

// ── Section stats cache ───────────────────────────────────────────────────────
// Stores pre-parsed { rows: [{mc, prices}] } for sections not yet opened.
// Built once from pending HTML via DOMParser, then reused on every filter change.
const _sectionStatsCache = new WeakMap();

function getSectionStats(item) {
  if (_sectionStatsCache.has(item)) return _sectionStatsCache.get(item);
  const body    = item.querySelector('.section-body');
  const pending = body && body.dataset.pending;
  if (!pending) return { rows: [] };

  const doc  = new DOMParser().parseFromString(`<div>${pending}</div>`, 'text/html');
  const rows = [];
  doc.body.firstChild.querySelectorAll('.row-group[data-max-consec]').forEach(rg => {
    const mc     = +rg.dataset.maxConsec;
    const prices = [...rg.querySelectorAll('.ticket-entry[data-price]')].map(e => +e.dataset.price);
    if (prices.length) rows.push({ mc, prices });
  });

  const stats = { rows };
  _sectionStatsCache.set(item, stats);
  return stats;
}

function countVisibleInSection(item) {
  const body = item.querySelector('.section-body');

  if (body && body.dataset.rendered) {
    // Section is live in the DOM — count directly
    return [...item.querySelectorAll('.ticket-entry[data-price]')]
      .filter(e => e.style.display !== 'none').length;
  }

  // Section not yet opened — use cached stats
  const stats = getSectionStats(item);
  return stats.rows.reduce((total, row) => {
    if (_seatsFilter > 1 && row.mc < _seatsFilter) return total;
    return total + row.prices.filter(p => _maxPriceFilter === Infinity || p <= _maxPriceFilter).length;
  }, 0);
}

// Apply both filters to the accordion.
// Pass a specific .section-item to limit DOM work after lazy-render; omit for full pass.
function applyFilters(scope) {
  const root = scope || document.getElementById('sectionsAccordion');
  if (!root) return;

  // ── Price filter: hide individual ticket entries above max price ──
  root.querySelectorAll('.ticket-entry[data-price]').forEach(entry => {
    const price   = +entry.dataset.price;
    const visible = _maxPriceFilter === Infinity || price <= _maxPriceFilter;
    entry.style.display = visible ? '' : 'none';
  });

  // ── Row-group visibility: hide if seats filter fails OR all entries are price-hidden ──
  root.querySelectorAll('.row-group[data-max-consec]').forEach(rg => {
    // Seats filter
    if (_seatsFilter > 1 && +rg.dataset.maxConsec < _seatsFilter) {
      rg.style.display = 'none';
      return;
    }
    // Hide the whole row (label + entries) when every entry in it is price-filtered out
    const hasVisible = [...rg.querySelectorAll('.ticket-entry[data-price]')]
      .some(e => e.style.display !== 'none');
    rg.style.display = hasVisible ? '' : 'none';
  });

  // ── Update header counts for ALL sections (rendered and unrendered) ──
  const items = scope && scope.classList.contains('section-item')
    ? [scope]
    : document.querySelectorAll('.section-item');

  items.forEach(item => {
    const count = countVisibleInSection(item);
    const avail = item.querySelector('.sh-avail');
    if (avail) {
      avail.textContent = count > 0
        ? `${count} seat${count !== 1 ? 's' : ''} available`
        : 'None in range';
    }
  });
}


// ── Sport playing-surface diagrams ───────────────────────────────────────────
// Inline SVG overhead diagrams — no external images, always displays correctly.
const FIELD_DIAGRAMS = {

  mlb: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 360" role="img" aria-label="Baseball field">
    <!-- Outfield grass -->
    <rect width="520" height="360" fill="#1f6b1f"/>
    <!-- Warning track -->
    <path d="M260,330 L16,36 Q260,2 504,36 Z" fill="none" stroke="#a07840" stroke-width="28" opacity="0.7"/>
    <!-- Infield dirt -->
    <path d="M260,318 L102,162 Q260,48 418,162 Z" fill="#b8926a"/>
    <!-- Infield grass -->
    <circle cx="260" cy="188" r="100" fill="#237023"/>
    <!-- Foul lines -->
    <line x1="260" y1="330" x2="0"   y2="0"   stroke="white" stroke-width="1.5" opacity="0.9"/>
    <line x1="260" y1="330" x2="520" y2="0"   stroke="white" stroke-width="1.5" opacity="0.9"/>
    <!-- Pitcher mound -->
    <circle cx="260" cy="188" r="16" fill="#b8926a"/>
    <!-- Home plate dirt circle -->
    <circle cx="260" cy="318" r="22" fill="#b8926a"/>
    <!-- Home plate -->
    <polygon points="260,328 251,319 251,309 269,309 269,319" fill="white"/>
    <!-- 1B -->
    <rect x="404" y="154" width="16" height="16" fill="white" transform="rotate(45 412 162)"/>
    <!-- 2B -->
    <rect x="252" y="65"  width="16" height="16" fill="white" transform="rotate(45 260 73)"/>
    <!-- 3B -->
    <rect x="106" y="154" width="16" height="16" fill="white" transform="rotate(45 114 162)"/>
  </svg>`,

  nfl: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 280" role="img" aria-label="Football field">
    <!-- Field -->
    <rect width="560" height="280" fill="#2d7a2d"/>
    <!-- Alternating strips -->
    <rect x="40"  y="0" width="48" height="280" fill="#246424" opacity="0.55"/>
    <rect x="136" y="0" width="48" height="280" fill="#246424" opacity="0.55"/>
    <rect x="232" y="0" width="48" height="280" fill="#246424" opacity="0.55"/>
    <rect x="328" y="0" width="48" height="280" fill="#246424" opacity="0.55"/>
    <rect x="424" y="0" width="48" height="280" fill="#246424" opacity="0.55"/>
    <!-- End zones -->
    <rect x="0"   y="0" width="40"  height="280" fill="#1a3d8a" opacity="0.9"/>
    <rect x="520" y="0" width="40"  height="280" fill="#1a3d8a" opacity="0.9"/>
    <!-- Yard lines -->
    <line x1="40"  y1="0" x2="40"  y2="280" stroke="white" stroke-width="2.5"/>
    <line x1="88"  y1="14" x2="88"  y2="266" stroke="white" stroke-width="1"/>
    <line x1="136" y1="0" x2="136" y2="280" stroke="white" stroke-width="2"/>
    <line x1="184" y1="14" x2="184" y2="266" stroke="white" stroke-width="1"/>
    <line x1="232" y1="0" x2="232" y2="280" stroke="white" stroke-width="2"/>
    <line x1="280" y1="0" x2="280" y2="280" stroke="white" stroke-width="3"/>
    <line x1="328" y1="14" x2="328" y2="266" stroke="white" stroke-width="1"/>
    <line x1="376" y1="0" x2="376" y2="280" stroke="white" stroke-width="2"/>
    <line x1="424" y1="14" x2="424" y2="266" stroke="white" stroke-width="1"/>
    <line x1="472" y1="0" x2="472" y2="280" stroke="white" stroke-width="2"/>
    <line x1="520" y1="0" x2="520" y2="280" stroke="white" stroke-width="2.5"/>
    <!-- Yard numbers -->
    <text x="112" y="46"  font-size="20" fill="white" text-anchor="middle" font-family="Arial Black,sans-serif" font-weight="900" opacity="0.85">10</text>
    <text x="208" y="46"  font-size="20" fill="white" text-anchor="middle" font-family="Arial Black,sans-serif" font-weight="900" opacity="0.85">20</text>
    <text x="256" y="46"  font-size="20" fill="white" text-anchor="middle" font-family="Arial Black,sans-serif" font-weight="900" opacity="0.85">50</text>
    <text x="304" y="46"  font-size="20" fill="white" text-anchor="middle" font-family="Arial Black,sans-serif" font-weight="900" opacity="0.85">40</text>
    <text x="400" y="46"  font-size="20" fill="white" text-anchor="middle" font-family="Arial Black,sans-serif" font-weight="900" opacity="0.85">20</text>
    <text x="448" y="46"  font-size="20" fill="white" text-anchor="middle" font-family="Arial Black,sans-serif" font-weight="900" opacity="0.85">10</text>
    <!-- Goal posts -->
    <line x1="20" y1="280" x2="20" y2="230" stroke="#f5c518" stroke-width="3"/>
    <line x1="9"  y1="230" x2="31" y2="230" stroke="#f5c518" stroke-width="3"/>
    <line x1="540" y1="280" x2="540" y2="230" stroke="#f5c518" stroke-width="3"/>
    <line x1="529" y1="230" x2="551" y2="230" stroke="#f5c518" stroke-width="3"/>
  </svg>`,

  nba: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 294" role="img" aria-label="Basketball court">
    <!-- Hardwood floor -->
    <rect width="560" height="294" fill="#c8963e"/>
    <!-- Floor grain lines -->
    <line x1="0" y1="49"  x2="560" y2="49"  stroke="#b8822e" stroke-width="0.6" opacity="0.5"/>
    <line x1="0" y1="98"  x2="560" y2="98"  stroke="#b8822e" stroke-width="0.6" opacity="0.5"/>
    <line x1="0" y1="147" x2="560" y2="147" stroke="#b8822e" stroke-width="0.6" opacity="0.5"/>
    <line x1="0" y1="196" x2="560" y2="196" stroke="#b8822e" stroke-width="0.6" opacity="0.5"/>
    <line x1="0" y1="245" x2="560" y2="245" stroke="#b8822e" stroke-width="0.6" opacity="0.5"/>
    <!-- Court outline -->
    <rect x="4" y="4" width="552" height="286" fill="none" stroke="white" stroke-width="2.5"/>
    <!-- Half-court line -->
    <line x1="280" y1="4" x2="280" y2="290" stroke="white" stroke-width="2"/>
    <!-- Center circle -->
    <circle cx="280" cy="147" r="30" fill="none" stroke="white" stroke-width="2"/>
    <!-- Left paint -->
    <rect x="4" y="99" width="90" height="96" fill="#b5822e" stroke="white" stroke-width="2"/>
    <!-- Left restricted area -->
    <path d="M4,123 A28,28 0 0,1 4,171" stroke="white" stroke-width="1.5" fill="none" stroke-dasharray="5 4"/>
    <!-- Left 3pt line -->
    <line x1="4"  y1="52" x2="45" y2="52"  stroke="white" stroke-width="2"/>
    <line x1="4"  y1="242" x2="45" y2="242" stroke="white" stroke-width="2"/>
    <path d="M45,52 A115,115 0 0,1 45,242" fill="none" stroke="white" stroke-width="2"/>
    <!-- Left free-throw circle -->
    <circle cx="94" cy="147" r="30" fill="none" stroke="white" stroke-width="1.5" stroke-dasharray="7 5"/>
    <!-- Left basket + backboard -->
    <line x1="4"  y1="138" x2="4"  y2="156" stroke="white" stroke-width="4"/>
    <line x1="4"  y1="147" x2="42" y2="147" stroke="white" stroke-width="1.5"/>
    <circle cx="47" cy="147" r="9" fill="none" stroke="#e07820" stroke-width="2.5"/>
    <!-- Right paint -->
    <rect x="466" y="99" width="90" height="96" fill="#b5822e" stroke="white" stroke-width="2"/>
    <!-- Right restricted area -->
    <path d="M556,123 A28,28 0 0,0 556,171" stroke="white" stroke-width="1.5" fill="none" stroke-dasharray="5 4"/>
    <!-- Right 3pt line -->
    <line x1="556" y1="52"  x2="515" y2="52"  stroke="white" stroke-width="2"/>
    <line x1="556" y1="242" x2="515" y2="242" stroke="white" stroke-width="2"/>
    <path d="M515,52 A115,115 0 0,0 515,242" fill="none" stroke="white" stroke-width="2"/>
    <!-- Right free-throw circle -->
    <circle cx="466" cy="147" r="30" fill="none" stroke="white" stroke-width="1.5" stroke-dasharray="7 5"/>
    <!-- Right basket + backboard -->
    <line x1="556" y1="138" x2="556" y2="156" stroke="white" stroke-width="4"/>
    <line x1="518" y1="147" x2="556" y2="147" stroke="white" stroke-width="1.5"/>
    <circle cx="513" cy="147" r="9" fill="none" stroke="#e07820" stroke-width="2.5"/>
  </svg>`,

  nhl: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 270" role="img" aria-label="Hockey rink">
    <!-- Ice surface -->
    <rect width="560" height="270" rx="50" fill="#d8eef8"/>
    <!-- Red center line -->
    <line x1="280" y1="0" x2="280" y2="270" stroke="#cc1111" stroke-width="4.5"/>
    <!-- Blue lines -->
    <line x1="182" y1="0" x2="182" y2="270" stroke="#1155bb" stroke-width="4"/>
    <line x1="378" y1="0" x2="378" y2="270" stroke="#1155bb" stroke-width="4"/>
    <!-- Goal lines -->
    <line x1="52"  y1="38" x2="52"  y2="232" stroke="#cc1111" stroke-width="2.5"/>
    <line x1="508" y1="38" x2="508" y2="232" stroke="#cc1111" stroke-width="2.5"/>
    <!-- Center circle + dot -->
    <circle cx="280" cy="135" r="35" fill="none" stroke="#cc1111" stroke-width="2.5"/>
    <circle cx="280" cy="135" r="4"  fill="#cc1111"/>
    <!-- Left zone face-off circles -->
    <circle cx="112" cy="76"  r="28" fill="none" stroke="#cc1111" stroke-width="2"/>
    <circle cx="112" cy="76"  r="4"  fill="#cc1111"/>
    <circle cx="112" cy="194" r="28" fill="none" stroke="#cc1111" stroke-width="2"/>
    <circle cx="112" cy="194" r="4"  fill="#cc1111"/>
    <!-- Right zone face-off circles -->
    <circle cx="448" cy="76"  r="28" fill="none" stroke="#cc1111" stroke-width="2"/>
    <circle cx="448" cy="76"  r="4"  fill="#cc1111"/>
    <circle cx="448" cy="194" r="28" fill="none" stroke="#cc1111" stroke-width="2"/>
    <circle cx="448" cy="194" r="4"  fill="#cc1111"/>
    <!-- Neutral zone dots -->
    <circle cx="210" cy="135" r="4" fill="#cc1111"/>
    <circle cx="350" cy="135" r="4" fill="#cc1111"/>
    <!-- Left goal crease -->
    <path d="M52,112 Q88,112 88,135 Q88,158 52,158" fill="#aad0f0" stroke="#cc1111" stroke-width="2"/>
    <!-- Left net -->
    <rect x="30" y="117" width="22" height="36" rx="2" fill="none" stroke="#777" stroke-width="2"/>
    <!-- Right goal crease -->
    <path d="M508,112 Q472,112 472,135 Q472,158 508,158" fill="#aad0f0" stroke="#cc1111" stroke-width="2"/>
    <!-- Right net -->
    <rect x="508" y="117" width="22" height="36" rx="2" fill="none" stroke="#777" stroke-width="2"/>
  </svg>`,

  mls:      _soccerSVG(),
  worldcup: _soccerSVG(),
  ufc: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" role="img" aria-label="UFC octagon">
    <!-- Canvas -->
    <rect width="400" height="400" fill="#1a1a1a"/>
    <!-- Octagon mat -->
    <polygon points="200,20 340,80 380,220 320,360 80,360 20,220 60,80 200,20" fill="#c8a040"/>
    <!-- Octagon fence line -->
    <polygon points="200,30 330,86 368,218 312,350 88,350 32,218 70,86 200,30" fill="none" stroke="white" stroke-width="3"/>
    <!-- Center UFC logo circle -->
    <circle cx="200" cy="200" r="60" fill="none" stroke="white" stroke-width="2"/>
    <text x="200" y="208" font-size="22" fill="white" text-anchor="middle" font-family="Arial Black,sans-serif" font-weight="900" opacity="0.9">UFC</text>
    <!-- Corner markers -->
    <circle cx="200" cy="30"  r="5" fill="#cc1111"/>
    <circle cx="200" cy="370" r="5" fill="#1155bb"/>
  </svg>`,
};

function _soccerSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 340" role="img" aria-label="Soccer pitch">
    <!-- Pitch -->
    <rect width="560" height="340" fill="#2a7a2a"/>
    <!-- Stripe overlay -->
    <rect x="0"   y="0" width="56" height="340" fill="#246424" opacity="0.5"/>
    <rect x="112" y="0" width="56" height="340" fill="#246424" opacity="0.5"/>
    <rect x="224" y="0" width="56" height="340" fill="#246424" opacity="0.5"/>
    <rect x="336" y="0" width="56" height="340" fill="#246424" opacity="0.5"/>
    <rect x="448" y="0" width="56" height="340" fill="#246424" opacity="0.5"/>
    <!-- Boundary -->
    <rect x="5" y="5" width="550" height="330" fill="none" stroke="white" stroke-width="2.5"/>
    <!-- Halfway line -->
    <line x1="280" y1="5" x2="280" y2="335" stroke="white" stroke-width="2"/>
    <!-- Center circle + spot -->
    <circle cx="280" cy="170" r="46" fill="none" stroke="white" stroke-width="2"/>
    <circle cx="280" cy="170" r="3.5" fill="white"/>
    <!-- Left penalty area -->
    <rect x="5" y="96" width="90" height="148" fill="none" stroke="white" stroke-width="2"/>
    <!-- Left goal area -->
    <rect x="5" y="130" width="36" height="80" fill="none" stroke="white" stroke-width="2"/>
    <!-- Left penalty spot + arc -->
    <circle cx="60" cy="170" r="3.5" fill="white"/>
    <path d="M95,145 A48,48 0 0,1 95,195" fill="none" stroke="white" stroke-width="2"/>
    <!-- Left goal -->
    <rect x="0" y="148" width="5" height="44" fill="none" stroke="white" stroke-width="2"/>
    <!-- Right penalty area -->
    <rect x="465" y="96" width="90" height="148" fill="none" stroke="white" stroke-width="2"/>
    <!-- Right goal area -->
    <rect x="519" y="130" width="36" height="80" fill="none" stroke="white" stroke-width="2"/>
    <!-- Right penalty spot + arc -->
    <circle cx="500" cy="170" r="3.5" fill="white"/>
    <path d="M465,145 A48,48 0 0,0 465,195" fill="none" stroke="white" stroke-width="2"/>
    <!-- Right goal -->
    <rect x="555" y="148" width="5" height="44" fill="none" stroke="white" stroke-width="2"/>
    <!-- Corner arcs -->
    <path d="M5,18 A13,13 0 0,1 18,5"    fill="none" stroke="white" stroke-width="2"/>
    <path d="M542,5  A13,13 0 0,1 555,18" fill="none" stroke="white" stroke-width="2"/>
    <path d="M5,322 A13,13 0 0,0 18,335"  fill="none" stroke="white" stroke-width="2"/>
    <path d="M542,335 A13,13 0 0,0 555,322" fill="none" stroke="white" stroke-width="2"/>
  </svg>`;
}


function renderFieldDiagram(sport, venueKey) {
  const el = document.getElementById('fieldDiagram');
  if (!el) return;
  // Interior photos now load in the hero; the diagram strip always shows the SVG
  el.innerHTML = FIELD_DIAGRAMS[sport] || FIELD_DIAGRAMS.mlb;
}

// ── Init ──────────────────────────────────────────────────────────────────────
async function init() {
  const idParam = new URLSearchParams(window.location.search).get('id');
  // API event IDs are strings (e.g. "api_mlb_824240"); static IDs are integers
  const id = /^\d+$/.test(idParam) ? parseInt(idParam, 10) : idParam;

  let event = EVENTS.find(e => e.id === id);
  if (!event && typeof NFL_GAMES       !== 'undefined') event = NFL_GAMES.find(e => e.id === id);
  if (!event && typeof MLB_GAMES       !== 'undefined') event = MLB_GAMES.find(e => e.id === id);
  if (!event && typeof NBA_GAMES       !== 'undefined') event = NBA_GAMES.find(e => e.id === id);
  if (!event && typeof NHL_GAMES       !== 'undefined') event = NHL_GAMES.find(e => e.id === id);
  if (!event && typeof WORLDCUP_GAMES  !== 'undefined') event = WORLDCUP_GAMES.find(e => e.id === id);
  if (!event && typeof MLS_GAMES       !== 'undefined') event = MLS_GAMES.find(e => e.id === id);
  // Try localStorage cache populated by schedule-api.js
  if (!event && typeof window.getCachedEvent === 'function') event = window.getCachedEvent(id);
  // Last resort: fetch the schedule directly (handles cold loads with no localStorage)
  if (!event && typeof id === 'string' && id.startsWith('api_') && typeof window.loadSchedule === 'function') {
    const sport = id.split('_')[1]; // 'api_mlb_824882' → 'mlb'
    const games = await window.loadSchedule(sport);
    if (games) event = games.find(e => e.id === id) || null;
  }

  if (!event) {
    document.getElementById('eventTitle').textContent = 'Event not found';
    document.getElementById('sectionsAccordion').innerHTML =
      '<p style="color:var(--muted);padding:24px 0">No event data for this ID.</p>';
    return;
  }

  const badge = document.getElementById('eventBadge');
  badge.textContent = SPORT_LABELS[event.sport] || event.sport.toUpperCase();
  badge.className   = `sport-badge sport-${event.sport}`;
  document.getElementById('eventTitle').textContent = event.title;
  document.getElementById('eventMeta').textContent  = `📍 ${event.venue}  ·  📅 ${event.date}`;
  document.title = `${event.title} — Tickets · TicketCompass`;

  // Set venue name in hero banner
  const heroName = document.getElementById('heroFallbackName');
  if (heroName) heroName.textContent = event.venue.split('·')[0].trim();

  renderAccordion(event);
  buildFilters(event);
}

document.addEventListener('DOMContentLoaded', init);

// ── Price alert modal ─────────────────────────────────────────────────────────

let _alertSeat = {};

function openAlertModal(btn) {
  _alertSeat = {
    section:  btn.dataset.section,
    row:      btn.dataset.row,
    seat:     btn.dataset.seat,
    price:    parseInt(btn.dataset.price, 10),
    platform: btn.dataset.platform,
  };

  // Mark bell as active
  document.querySelectorAll('.te-bell.active').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Fill modal context
  document.getElementById('alertSeatLabel').textContent =
    `${_alertSeat.section} · ${_alertSeat.row} · ${_alertSeat.seat}`;
  document.getElementById('alertEventLabel').textContent =
    document.getElementById('eventTitle').textContent + ' · ' +
    document.getElementById('eventMeta').textContent.split('·')[1]?.trim() || '';

  // Default price input to $10 below current lowest
  const defaultMax = Math.max(1, _alertSeat.price - 10);
  document.getElementById('alertMaxPrice').value = defaultMax;
  alertUpdateNote();

  // Show price field by default (alert type = price-drops)
  selectAlertType('drop');

  document.getElementById('alertModal').classList.add('open');
  document.getElementById('alertConfirm').classList.remove('open');
  document.getElementById('alertOverlay').classList.add('open');
  document.getElementById('alertEmailInput').value = '';
}

function closeAlertModal() {
  document.getElementById('alertOverlay').classList.remove('open');
  document.querySelectorAll('.te-bell.active').forEach(b => b.classList.remove('active'));
}

function selectAlertType(type) {
  document.querySelectorAll('.alert-type-pill').forEach(p => p.classList.remove('active'));
  const pill = document.getElementById('apt-' + type);
  if (pill) pill.classList.add('active');
  document.getElementById('alertPriceBlock').style.display =
    type === 'sell' ? 'none' : 'block';
}

function alertUpdateNote() {
  const val = parseInt(document.getElementById('alertMaxPrice').value, 10) || 0;
  const cur = _alertSeat.price;
  const note = document.getElementById('alertPriceNote');
  if (val >= cur) {
    note.textContent = `Currently ${fmt(cur)} on ${_alertSeat.platform} — in range now`;
    note.className = 'alert-price-note in-range';
  } else {
    note.textContent = `Currently ${fmt(cur)} on ${_alertSeat.platform} — ${fmt(cur - val)} away`;
    note.className = 'alert-price-note away';
  }
}

function submitAlertForm() {
  const email = document.getElementById('alertEmailInput').value.trim();
  if (!email || !email.includes('@')) {
    document.getElementById('alertEmailInput').focus();
    return;
  }

  const activeType = document.querySelector('.alert-type-pill.active')?.dataset.type || 'drop';
  const maxPrice   = document.getElementById('alertMaxPrice').value;

  // ── Submit to Formspree ───────────────────────────────────────────────────
  // Replace 'YOUR_FORM_ID' with your Formspree form ID after creating a free
  // account at https://formspree.io — takes about 60 seconds.
  fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      email,
      event:    document.getElementById('eventTitle').textContent,
      section:  _alertSeat.section,
      row:      _alertSeat.row,
      seat:     _alertSeat.seat,
      alertType: activeType,
      maxPrice: activeType !== 'sell' ? maxPrice : 'N/A',
      currentPrice: fmt(_alertSeat.price),
      platform: _alertSeat.platform,
    }),
  }).catch(() => {}); // silently ignore network errors for now

  // Show confirmation
  const typeLabel = { drop: 'drops in price', threshold: 'reaches your price', sell: 'sells out' };
  document.getElementById('alertConfirmText').innerHTML =
    `We'll email you when <strong>${_alertSeat.section} · ${_alertSeat.row} · ${_alertSeat.seat}</strong> ` +
    (activeType !== 'sell' ? `drops below <strong>${fmt(+maxPrice)}</strong>` : 'sells out') + '.';

  document.getElementById('alertModal').classList.remove('open');
  document.getElementById('alertConfirm').classList.add('open');
}
