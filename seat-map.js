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
    lower: numRange(101, 120),
    upper: numRange(301, 320),
    rings: RINGS_ARENA,
    rows: 'ABCDEFGHIJKLMN'.split(''),
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
    // Yankee Stadium: main level 101–136, grandstand 201–236
    lower: numRange(101, 130),
    upper: numRange(201, 230),
    rings: RINGS_BASEBALL,
    rows: 'ABCDEFGHIJKLMNOPQ'.split(''),
    seatsPerRow: 20,
  },
  wrigley_field: {
    // Wrigley Field: terrace box 1–44, upper reserved 101–140
    lower: numRange(1, 30),
    upper: numRange(101, 130),
    rings: RINGS_BASEBALL,
    rows: 'ABCDEFGHIJKLMNOP'.split(''),
    seatsPerRow: 18,
  },
  dodger_stadium: {
    // Dodger Stadium: field level 1–56, loge 101–156 (simplified)
    lower: numRange(1, 28),
    upper: numRange(101, 128),
    rings: RINGS_BASEBALL,
    rows: 'ABCDEFGHIJKLMNOPQ'.split(''),
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
    // Madison Square Garden: lower 101-118, upper 201-220
    lower: numRange(101, 118),
    upper: numRange(201, 220),
    rings: RINGS_ARENA,
    rows: 'ABCDEFGHIJKLMN'.split(''),
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
  prudential_center:       { lower: numRange(1,20),    upper: numRange(201,216), rings: RINGS_ARENA,   rows: 'ABCDEFGHIJKLMN'.split(''),  seatsPerRow: 20 },
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
  chase_field:       { lower: numRange(101,130), upper: numRange(301,330), rings: RINGS_BASEBALL, rows: 'ABCDEFGHIJKLMNOPQ'.split(''), seatsPerRow: 20 },
  truist_park:       { lower: numRange(101,126), upper: numRange(301,322), rings: RINGS_BASEBALL, rows: 'ABCDEFGHIJKLMNOP'.split(''), seatsPerRow: 20 },
  oriole_park:       { lower: numRange(1,58),    upper: [...numRange(300,318), ...numRange(348,366)], rings: RINGS_BASEBALL, rows: 'ABCDEFGHIJKLMNOP'.split(''), seatsPerRow: 18 },
  fenway_park:       { lower: numRange(1,30),    upper: numRange(31,58),    rings: RINGS_BASEBALL, rows: 'ABCDEFGHIJKLMNO'.split(''), seatsPerRow: 18 },
  guaranteed_rate:   { lower: numRange(101,128), upper: numRange(501,528), rings: RINGS_BASEBALL, rows: 'ABCDEFGHIJKLMNOP'.split(''), seatsPerRow: 18 },
  great_american:    { lower: numRange(101,130), upper: numRange(401,430), rings: RINGS_BASEBALL, rows: 'ABCDEFGHIJKLMNOP'.split(''), seatsPerRow: 20 },
  progressive_field: { lower: numRange(101,126), upper: numRange(301,326), rings: RINGS_BASEBALL, rows: 'ABCDEFGHIJKLMNOP'.split(''), seatsPerRow: 18 },
  coors_field:       { lower: numRange(101,136), upper: numRange(301,336), rings: RINGS_BASEBALL, rows: 'ABCDEFGHIJKLMNOPQ'.split(''), seatsPerRow: 22 },
  comerica_park:     { lower: numRange(101,128), upper: numRange(301,326), rings: RINGS_BASEBALL, rows: 'ABCDEFGHIJKLMNOP'.split(''), seatsPerRow: 20 },
  minute_maid:       { lower: numRange(101,130), upper: numRange(401,430), rings: RINGS_BASEBALL, rows: 'ABCDEFGHIJKLMNOP'.split(''), seatsPerRow: 20 },
  kauffman_stadium:  { lower: numRange(101,126), upper: numRange(401,426), rings: RINGS_BASEBALL, rows: 'ABCDEFGHIJKLMNO'.split(''), seatsPerRow: 18 },
  angel_stadium:     { lower: numRange(101,128), upper: numRange(401,428), rings: RINGS_BASEBALL, rows: 'ABCDEFGHIJKLMNOP'.split(''), seatsPerRow: 20 },
  loandepot_park:    { lower: numRange(1,36),    upper: numRange(101,130), rings: RINGS_BASEBALL, rows: 'ABCDEFGHIJKLMNO'.split(''), seatsPerRow: 18 },
  american_family:   { lower: numRange(101,130), upper: numRange(401,430), rings: RINGS_BASEBALL, rows: 'ABCDEFGHIJKLMNOP'.split(''), seatsPerRow: 20 },
  target_field:      { lower: numRange(1,30),    upper: numRange(300,324), rings: RINGS_BASEBALL, rows: 'ABCDEFGHIJKLMNO'.split(''), seatsPerRow: 18 },
  citi_field:        { lower: numRange(101,130), upper: numRange(401,430), rings: RINGS_BASEBALL, rows: 'ABCDEFGHIJKLMNOP'.split(''), seatsPerRow: 20 },
  sutter_health:     { lower: numRange(101,118), upper: numRange(201,214), rings: RINGS_BASEBALL, rows: 'ABCDEFGHIJKL'.split(''),    seatsPerRow: 16 },
  citizens_bank:     { lower: numRange(101,132), upper: numRange(301,332), rings: RINGS_BASEBALL, rows: 'ABCDEFGHIJKLMNOP'.split(''), seatsPerRow: 20 },
  pnc_park:          { lower: numRange(1,36),    upper: numRange(301,326), rings: RINGS_BASEBALL, rows: 'ABCDEFGHIJKLMNO'.split(''), seatsPerRow: 18 },
  petco_park:        { lower: numRange(101,126), upper: numRange(301,326), rings: RINGS_BASEBALL, rows: 'ABCDEFGHIJKLMNOP'.split(''), seatsPerRow: 20 },
  oracle_park:       { lower: numRange(1,36),    upper: numRange(100,132), rings: RINGS_BASEBALL, rows: 'ABCDEFGHIJKLMNOP'.split(''), seatsPerRow: 18 },
  tmobile_park:      { lower: numRange(101,132), upper: numRange(301,332), rings: RINGS_BASEBALL, rows: 'ABCDEFGHIJKLMNOPQ'.split(''), seatsPerRow: 20 },
  busch_stadium:     { lower: numRange(101,130), upper: numRange(401,430), rings: RINGS_BASEBALL, rows: 'ABCDEFGHIJKLMNOPQ'.split(''), seatsPerRow: 20 },
  tropicana_field:   { lower: numRange(101,122), upper: numRange(301,320), rings: RINGS_BASEBALL, rows: 'ABCDEFGHIJKLM'.split(''),    seatsPerRow: 16 },
  globe_life:        { lower: numRange(1,36),    upper: numRange(200,226), rings: RINGS_BASEBALL, rows: 'ABCDEFGHIJKLMNOP'.split(''), seatsPerRow: 20 },
  rogers_centre:     { lower: numRange(100,140), upper: numRange(500,536), rings: RINGS_BASEBALL, rows: 'ABCDEFGHIJKLMNOPQ'.split(''), seatsPerRow: 22 },
  nationals_park:    { lower: numRange(101,130), upper: numRange(301,330), rings: RINGS_BASEBALL, rows: 'ABCDEFGHIJKLMNOP'.split(''), seatsPerRow: 20 },
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
  const q = encodeURIComponent(event.title);
  if (platform === 'Ticketmaster') return `https://www.ticketmaster.com/search?q=${q}`;
  if (platform === 'StubHub')      return `https://www.stubhub.com/find/s/?q=${q}`;
  if (platform === 'SeatGeek')     return `https://seatgeek.com/search?q=${q}`;
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
      const platsHtml = pIdxs.map(pi => {
        const ep  = event.prices[pi];
        const cls = ep.platform.toLowerCase().replace(/\s+/g, '');
        const px  = Math.max(1, Math.round(seatBase * (ep.base + ep.fees) / baseAvg));
        if (px < minSeatPrice) minSeatPrice = px;
        const url = platformUrl(ep.platform, event);
        return `<a class="te-plat ${cls}" href="${url}" target="_blank" rel="noopener noreferrer">${ep.platform} — ${fmt(px)}</a>`;
      }).join('');

      const caution = multi
        ? `<span class="te-caution">⚠️ Listed on ${pIdxs.length} platforms</span>`
        : '';

      rowHtml +=
        `<div class="ticket-entry${multi ? ' multi-listed' : ''}" data-price="${minSeatPrice}">` +
        `<span class="te-seat">Seat&nbsp;${s}</span>` +
        `<div class="te-platforms">${platsHtml}${caution}</div>` +
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

// ── Render hero stadium photo ─────────────────────────────────────────────────
// Sets img.src to a Wikimedia Commons Special:FilePath redirect URL.
// The browser follows the 302 → upload.wikimedia.org CDN image automatically.
// No JS fetch needed; onerror on the <img> handles any bad filenames.
function renderPhoto(event) {
  const img       = document.getElementById('stadiumHeroImg');
  const fallback  = document.getElementById('stadiumHeroFallback');
  const heroEl    = document.getElementById('stadiumHero');
  const shortName = event.venue.split('·')[0].trim();

  document.getElementById('heroVenueName').textContent    = shortName;
  document.getElementById('heroFallbackName').textContent = shortName;

  const filename = STADIUM_PHOTOS[event.venue_key];
  if (!filename) {
    img.style.display      = 'none';
    fallback.style.display = 'flex';
    heroEl.style.animation = 'none';
    return;
  }

  img.alt = shortName;
  img.src = `https://commons.wikimedia.org/wiki/Special:FilePath/${filename}?width=1280`;
  // onload / onerror attributes on the <img> stop the shimmer and show fallback
}

// ── Init ──────────────────────────────────────────────────────────────────────
function init() {
  const id = parseInt(new URLSearchParams(window.location.search).get('id'), 10);

  let event = EVENTS.find(e => e.id === id);
  if (!event && typeof NFL_GAMES       !== 'undefined') event = NFL_GAMES.find(e => e.id === id);
  if (!event && typeof MLB_GAMES       !== 'undefined') event = MLB_GAMES.find(e => e.id === id);
  if (!event && typeof NHL_GAMES       !== 'undefined') event = NHL_GAMES.find(e => e.id === id);
  if (!event && typeof WORLDCUP_GAMES  !== 'undefined') event = WORLDCUP_GAMES.find(e => e.id === id);

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
  document.title = `${event.title} — Tickets · TicketCompare`;

  renderPhoto(event);
  renderAccordion(event);
  buildFilters(event);
}

document.addEventListener('DOMContentLoaded', init);
