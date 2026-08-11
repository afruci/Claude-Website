'use strict';

// ── Cache helpers ─────────────────────────────────────────────────────────────
const _CACHE_TTL = 60 * 60 * 1000; // 1 hour

function _cacheGet(sport) {
  try {
    const raw = localStorage.getItem('tc_sched_' + sport);
    if (!raw) return null;
    const { ts, data } = JSON.parse(raw);
    if (Date.now() - ts > _CACHE_TTL) return null;
    return data;
  } catch { return null; }
}

function _cacheSet(sport, data) {
  try {
    localStorage.setItem('tc_sched_' + sport, JSON.stringify({ ts: Date.now(), data }));
  } catch {}
}

function _cacheEvent(ev) {
  try {
    localStorage.setItem('tc_ev_' + ev.id, JSON.stringify(ev));
  } catch {}
}

window.getCachedEvent = function (id) {
  try {
    const raw = localStorage.getItem('tc_ev_' + id);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
};

// ── Date helpers ──────────────────────────────────────────────────────────────
// MLB API returns grouped local date "2026-08-14" — safe to parse directly
function _mlbDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const mo = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${mo[m - 1]} ${d}, ${y}`;
}

// ESPN returns UTC ISO; shift -4 h to get US local date (works for ET/CT; PT edge cases rare)
function _espnDate(isoStr) {
  const d = new Date(new Date(isoStr).getTime() - 4 * 60 * 60 * 1000);
  const mo = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${mo[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

function _todayStr()        { return new Date().toISOString().slice(0, 10); }
function _todayESPN()       { return _todayStr().replace(/-/g, ''); }
function _futureESPN(daysFromNow) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().slice(0, 10).replace(/-/g, '');
}

// ── Venue key map (name → seat-map photo key) ─────────────────────────────────
const _VK = {
  'Chase Field':'chase_field','Truist Park':'truist_park',
  'Oriole Park at Camden Yards':'oriole_park','Fenway Park':'fenway_park',
  'Wrigley Field':'wrigley_field','Guaranteed Rate Field':'guaranteed_rate',
  'Great American Ball Park':'great_american','Progressive Field':'progressive_field',
  'Coors Field':'coors_field','Comerica Park':'comerica_park',
  'Minute Maid Park':'minute_maid','Kauffman Stadium':'kauffman_stadium',
  'Angel Stadium':'angel_stadium','Dodger Stadium':'dodger_stadium',
  'loanDepot park':'loandepot_park','American Family Field':'american_family',
  'Target Field':'target_field','Citi Field':'citi_field',
  'Yankee Stadium':'yankee_stadium','Sutter Health Park':'sutter_health',
  'Citizens Bank Park':'citizens_bank','PNC Park':'pnc_park',
  'Petco Park':'petco_park','Oracle Park':'oracle_park',
  'T-Mobile Park':'tmobile_park','Busch Stadium':'busch_stadium',
  'Tropicana Field':'tropicana_field','Globe Life Field':'globe_life',
  'Rogers Centre':'rogers_centre','Nationals Park':'nationals_park',
  'State Farm Stadium':'state_farm_stadium','Mercedes-Benz Stadium':'mercedes_benz_stadium',
  'M&T Bank Stadium':'mt_bank_stadium','Highmark Stadium':'highmark_stadium',
  'Bank of America Stadium':'bank_of_america_stadium','Soldier Field':'soldier_field',
  'Paycor Stadium':'paycor_stadium','Huntington Bank Field':'huntington_bank_field',
  'AT&T Stadium':'att_stadium','Empower Field at Mile High':'empower_field',
  'Ford Field':'ford_field','Lambeau Field':'lambeau_field',
  'NRG Stadium':'nrg_stadium','Lucas Oil Stadium':'lucas_oil_stadium',
  'EverBank Stadium':'everbank_stadium','GEHA Field at Arrowhead':'arrowhead_stadium',
  'Allegiant Stadium':'allegiant_stadium','SoFi Stadium':'sofi_stadium',
  'Hard Rock Stadium':'hard_rock_stadium','U.S. Bank Stadium':'us_bank_stadium',
  'Gillette Stadium':'gillette_stadium','Caesars Superdome':'caesars_superdome',
  'MetLife Stadium':'metlife_stadium','Lincoln Financial Field':'lincoln_financial_field',
  'Acrisure Stadium':'acrisure_stadium','Levi\'s Stadium':'levis_stadium',
  'Lumen Field':'lumen_field','Raymond James Stadium':'raymond_james_stadium',
  'Nissan Stadium':'nissan_stadium','FedExField':'fedex_field',
  'Empower Field':'empower_field',
  'Scotiabank Arena':'scotiabank_arena','Bell Centre':'bell_centre',
  'Rogers Arena':'rogers_arena','Rogers Place':'rogers_place',
  'Crypto.com Arena':'crypto_com_arena','Xcel Energy Center':'xcel_energy_center',
  'Ball Arena':'ball_arena','SAP Center at San Jose':'sap_center',
  'T-Mobile Arena':'t_mobile_arena','Bridgestone Arena':'bridgestone_arena',
  'Amalie Arena':'amalie_arena','PNC Arena':'pnc_arena_hockey',
  'Capital One Arena':'capital_one_arena','Wells Fargo Center':'wells_fargo_center',
  'PPG Paints Arena':'ppg_paints_arena','Nationwide Arena':'nationwide_arena',
  'Little Caesars Arena':'little_caesars_arena','United Center':'united_center',
  'Enterprise Center':'enterprise_center','Madison Square Garden':'msg',
  'UBS Arena':'ubs_arena','Prudential Center':'prudential_center',
  'TD Garden':'td_garden','KeyBank Center':'keybank_center',
  'Scotiabank Saddledome':'saddledome','Canadian Tire Centre':'canadian_tire_centre',
  'BMO Stadium':'bmo_stadium','Dignity Health Sports Park':'dignity_health',
  'Q2 Stadium':'q2_stadium','GEODIS Park':'geodis_park',
  'Exploria Stadium':'exploria_stadium','Lower.com Field':'lower_field',
  'Red Bull Arena':'red_bull_arena','Subaru Park':'subaru_park',
  'Audi Field':'audi_field','Chase Stadium':'chase_stadium',
  'Allianz Field':'allianz_field','PayPal Park':'paypal_park',
  'TQL Stadium':'tql_stadium','Saputo Stadium':'saputo_stadium',
  'Providence Park':'providence_park','America First Field':'america_first_field',
  'Shell Energy Stadium':'shell_energy_stadium','Snapdragon Stadium':'snapdragon_stadium',
  'Wintrust Arena':'wintrust_arena',
};

function _venueKey(name) {
  if (!name) return 'yankee_stadium';
  if (_VK[name]) return _VK[name];
  for (const [k, v] of Object.entries(_VK)) {
    if (name.includes(k) || k.includes(name)) return v;
  }
  return 'yankee_stadium';
}

// ── Price generators ──────────────────────────────────────────────────────────
const _MLB_MKT = {
  'New York Yankees':1.60,'Los Angeles Dodgers':1.50,'Boston Red Sox':1.40,
  'Chicago Cubs':1.30,'New York Mets':1.28,'San Francisco Giants':1.18,
  'Houston Astros':1.18,'Philadelphia Phillies':1.18,'St. Louis Cardinals':1.12,
  'Atlanta Braves':1.10,'Toronto Blue Jays':1.02,'Baltimore Orioles':1.00,
  'Texas Rangers':1.00,'Seattle Mariners':1.00,'San Diego Padres':1.00,
  'Arizona Diamondbacks':0.96,'Los Angeles Angels':0.96,'Minnesota Twins':0.92,
  'Milwaukee Brewers':0.90,'Cincinnati Reds':0.88,'Cleveland Guardians':0.90,
  'Detroit Tigers':0.90,'Kansas City Royals':0.86,'Washington Nationals':0.86,
  'Chicago White Sox':0.84,'Tampa Bay Rays':0.84,'Colorado Rockies':0.82,
  'Miami Marlins':0.80,'Pittsburgh Pirates':0.80,'Athletics':0.75,
};
function _mlbPrices(home, away) {
  const hp = _MLB_MKT[home] || 1.0, ap = _MLB_MKT[away] || 1.0;
  const base = Math.round(72 * (hp * 0.6 + ap * 0.4));
  const sh = Math.round(base * 0.95), sg = Math.round(base * 0.88);
  return [
    { platform:'Ticketmaster', base,  fees: Math.round(base * 0.18) },
    { platform:'StubHub',      base: sh, fees: Math.round(sh * 0.16) },
    { platform:'SeatGeek',     base: sg, fees: Math.round(sg * 0.14) },
  ];
}

const _NFL_MKT = {
  'Dallas Cowboys':1.60,'Kansas City Chiefs':1.55,'Philadelphia Eagles':1.45,
  'New England Patriots':1.40,'Green Bay Packers':1.38,'San Francisco 49ers':1.35,
  'New York Giants':1.30,'Chicago Bears':1.28,'Pittsburgh Steelers':1.28,
  'Las Vegas Raiders':1.22,'Denver Broncos':1.20,'Seattle Seahawks':1.18,
  'New York Jets':1.15,'Baltimore Ravens':1.15,'Los Angeles Rams':1.12,
  'Miami Dolphins':1.10,'Buffalo Bills':1.10,'Cincinnati Bengals':1.08,
  'Minnesota Vikings':1.05,'Atlanta Falcons':1.02,'Tampa Bay Buccaneers':1.00,
  'New Orleans Saints':1.00,'Cleveland Browns':0.98,'Houston Texans':0.98,
  'Los Angeles Chargers':0.96,'Arizona Cardinals':0.96,'Detroit Lions':0.96,
  'Carolina Panthers':0.92,'Tennessee Titans':0.90,'Indianapolis Colts':0.92,
  'Jacksonville Jaguars':0.88,'Washington Commanders':0.90,
};
function _nflPrices(home, away) {
  const hp = _NFL_MKT[home] || 1.0, ap = _NFL_MKT[away] || 1.0;
  const base = Math.round(280 * (hp * 0.6 + ap * 0.4));
  const sh = Math.round(base * 0.94), sg = Math.round(base * 0.87);
  return [
    { platform:'Ticketmaster', base,  fees: Math.round(base * 0.17) },
    { platform:'StubHub',      base: sh, fees: Math.round(sh * 0.15) },
    { platform:'SeatGeek',     base: sg, fees: Math.round(sg * 0.13) },
  ];
}

const _NHL_MKT = {
  'Toronto Maple Leafs':1.65,'Montreal Canadiens':1.55,'Boston Bruins':1.45,
  'New York Rangers':1.42,'Chicago Blackhawks':1.38,'Detroit Red Wings':1.32,
  'Pittsburgh Penguins':1.30,'Philadelphia Flyers':1.25,'Vancouver Canucks':1.22,
  'Edmonton Oilers':1.20,'Vegas Golden Knights':1.18,'Colorado Avalanche':1.18,
  'Dallas Stars':1.12,'Tampa Bay Lightning':1.10,'New York Islanders':1.05,
  'New Jersey Devils':1.02,'Washington Capitals':1.00,'Seattle Kraken':1.00,
  'Los Angeles Kings':0.98,'Anaheim Ducks':0.95,'San Jose Sharks':0.95,
  'St. Louis Blues':0.95,'Minnesota Wild':0.95,'Columbus Blue Jackets':0.90,
  'Calgary Flames':0.92,'Ottawa Senators':0.88,'Winnipeg Jets':0.90,
  'Buffalo Sabres':0.88,'Carolina Hurricanes':0.95,'Nashville Predators':0.90,
  'Florida Panthers':0.95,'Utah Hockey Club':0.85,
};
function _nhlPrices(home, away) {
  const hp = _NHL_MKT[home] || 1.0, ap = _NHL_MKT[away] || 1.0;
  const base = Math.round(145 * (hp * 0.6 + ap * 0.4));
  const sh = Math.round(base * 0.95), sg = Math.round(base * 0.88);
  return [
    { platform:'Ticketmaster', base,  fees: Math.round(base * 0.17) },
    { platform:'StubHub',      base: sh, fees: Math.round(sh * 0.15) },
    { platform:'SeatGeek',     base: sg, fees: Math.round(sg * 0.13) },
  ];
}

const _MLS_MKT = {
  'LA Galaxy':1.40,'LAFC':1.35,'New York City FC':1.32,'Inter Miami CF':1.30,
  'Seattle Sounders FC':1.25,'Portland Timbers':1.22,'Atlanta United FC':1.20,
  'New York Red Bulls':1.18,'Toronto FC':1.15,'FC Dallas':1.10,
  'Orlando City SC':1.05,'Columbus Crew':1.05,'Sporting Kansas City':1.02,
  'Philadelphia Union':1.00,'Minnesota United FC':1.00,'D.C. United':1.00,
  'Chicago Fire FC':0.98,'Houston Dynamo FC':0.98,'Real Salt Lake':0.95,
  'Colorado Rapids':0.95,'San Jose Earthquakes':0.92,'FC Cincinnati':0.95,
  'Nashville SC':1.00,'CF Montréal':0.90,'New England Revolution':0.95,
  'San Diego FC':1.00,'Vancouver Whitecaps FC':0.90,'Austin FC':1.02,
  'Charlotte FC':0.95,'St. Louis City SC':0.95,
};
function _mlsPrices(home, away) {
  const hp = _MLS_MKT[home] || 1.0, ap = _MLS_MKT[away] || 1.0;
  const base = Math.round(65 * (hp * 0.6 + ap * 0.4));
  const sh = Math.round(base * 0.94), sg = Math.round(base * 0.87);
  return [
    { platform:'Ticketmaster', base,  fees: Math.round(base * 0.16) },
    { platform:'StubHub',      base: sh, fees: Math.round(sh * 0.14) },
    { platform:'SeatGeek',     base: sg, fees: Math.round(sg * 0.12) },
  ];
}

// ── ESPN normalizer ───────────────────────────────────────────────────────────
function _normalizeESPN(ev, sport, emoji, color, priceFn) {
  const comp = ev.competitions?.[0];
  if (!comp) return null;
  const home = comp.competitors?.find(c => c.homeAway === 'home');
  const away = comp.competitors?.find(c => c.homeAway === 'away');
  if (!home || !away) return null;
  const homeName  = home.team.displayName;
  const awayName  = away.team.displayName;
  const venueName = comp.venue?.fullName || '';
  const city      = comp.venue?.address?.city  || '';
  const state     = comp.venue?.address?.state || '';
  const venueStr  = city ? `${venueName} · ${city}, ${state}` : venueName;
  const event = {
    id:        'api_' + sport + '_' + ev.id,
    title:     `${awayName} at ${homeName}`,
    venue:     venueStr,
    date:      _espnDate(ev.date),
    sport,
    home:      homeName,
    away:      awayName,
    venue_key: _venueKey(venueName),
    emoji,
    color,
    prices:    priceFn(homeName, awayName),
  };
  _cacheEvent(event);
  return event;
}

// ── Fetchers ──────────────────────────────────────────────────────────────────
async function _fetchMLB() {
  const cached = _cacheGet('mlb');
  if (cached) return cached;

  const today   = _todayStr();
  const endDate = '2026-11-01';
  const res  = await fetch(
    `https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate=${today}&endDate=${endDate}&hydrate=team,venue`
  );
  const data = await res.json();

  const events = [];
  for (const dateEntry of data.dates || []) {
    for (const game of dateEntry.games) {
      if (game.gameType === 'S' || game.gameType === 'E') continue; // skip spring training / exhibitions
      const home     = game.teams.home.team.name;
      const away     = game.teams.away.team.name;
      const apiVenue = game.venue?.name || '';
      // Use existing venue map if available (has city/state), otherwise fall back to API name
      const venue = (typeof MLB_VENUES !== 'undefined' && MLB_VENUES[home])
        ? MLB_VENUES[home]
        : apiVenue;
      const vk = (typeof MLB_VENUE_KEYS !== 'undefined' && MLB_VENUE_KEYS[home])
        ? MLB_VENUE_KEYS[home]
        : _venueKey(apiVenue);
      const ev = {
        id:        'api_mlb_' + game.gamePk,
        title:     `${away} at ${home}`,
        venue,
        date:      _mlbDate(dateEntry.date),
        sport:     'mlb',
        home, away,
        venue_key: vk,
        emoji:     '⚾',
        color:     '#003087',
        prices:    _mlbPrices(home, away),
      };
      _cacheEvent(ev);
      events.push(ev);
    }
  }

  _cacheSet('mlb', events);
  return events;
}

async function _fetchESPN(sport, espnSport, espnLeague, emoji, color, priceFn, endDate) {
  const cached = _cacheGet(sport);
  if (cached) return cached;

  const start = _todayESPN();
  const res  = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/${espnSport}/${espnLeague}/scoreboard?dates=${start}-${endDate}&limit=1000`
  );
  const data = await res.json();

  const events = (data.events || [])
    .map(ev => _normalizeESPN(ev, sport, emoji, color, priceFn))
    .filter(Boolean);

  _cacheSet(sport, events);
  return events;
}

// ── Public ────────────────────────────────────────────────────────────────────
window.loadSchedule = async function (sport) {
  try {
    switch (sport) {
      case 'mlb': return await _fetchMLB();
      case 'nfl': return await _fetchESPN('nfl', 'football', 'nfl',    '🏈', '#013369', _nflPrices, '20270301');
      case 'nhl': return await _fetchESPN('nhl', 'hockey',   'nhl',    '🏒', '#000814', _nhlPrices, '20270701');
      case 'mls': return await _fetchESPN('mls', 'soccer',   'usa.1',  '⚽', '#1a1a2e', _mlsPrices, '20270101');
      default:    return null; // NBA: schedule not fully published yet — keep static
    }
  } catch (err) {
    console.warn('[TicketCompass] Schedule API failed for', sport, '—', err.message);
    return null;
  }
};
