'use strict';

const SPORT_META = {
  nfl: {
    name: 'NFL',
    full: 'National Football League',
    color: '#013369',
    logo: `<svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="36" cy="36" rx="27" ry="17" fill="#7B3F00" stroke="#5a2d00" stroke-width="1.5"/>
      <path d="M10 36 Q36 26 62 36" stroke="white" stroke-width="2.5" fill="none" opacity=".9"/>
      <path d="M10 36 Q36 46 62 36" stroke="white" stroke-width="2.5" fill="none" opacity=".9"/>
      <line x1="36" y1="24" x2="36" y2="48" stroke="white" stroke-width="2" opacity=".9"/>
      <line x1="31" y1="29" x2="41" y2="29" stroke="white" stroke-width="1.8" opacity=".9"/>
      <line x1="30" y1="34" x2="42" y2="34" stroke="white" stroke-width="1.8" opacity=".9"/>
      <line x1="30" y1="39" x2="42" y2="39" stroke="white" stroke-width="1.8" opacity=".9"/>
      <line x1="31" y1="44" x2="41" y2="44" stroke="white" stroke-width="1.8" opacity=".9"/>
    </svg>`,
  },
  mlb: {
    name: 'MLB',
    full: 'Major League Baseball',
    color: '#002D72',
    logo: `<svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="36" cy="36" r="28" fill="#f9f9f9" stroke="#ddd" stroke-width="1.5"/>
      <path d="M24 11 Q31 22 27 34 Q23 46 29 61" stroke="#C8102E" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M22 16 L18 19" stroke="#C8102E" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M22 23 L17 26" stroke="#C8102E" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M22 31 L17 31" stroke="#C8102E" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M23 39 L18 38" stroke="#C8102E" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M48 11 Q41 22 45 34 Q49 46 43 61" stroke="#C8102E" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M50 16 L54 19" stroke="#C8102E" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M50 23 L55 26" stroke="#C8102E" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M50 31 L55 31" stroke="#C8102E" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M49 39 L54 38" stroke="#C8102E" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`,
  },
  nba: {
    name: 'NBA',
    full: 'National Basketball Association',
    color: '#C9082A',
    logo: `<svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="36" cy="36" r="28" fill="#F96119" stroke="#e55200" stroke-width="1.5"/>
      <line x1="8" y1="36" x2="64" y2="36" stroke="#111" stroke-width="2.5"/>
      <line x1="36" y1="8" x2="36" y2="64" stroke="#111" stroke-width="2.5"/>
      <path d="M16 13 Q27 36 16 59" stroke="#111" stroke-width="2" fill="none"/>
      <path d="M56 13 Q45 36 56 59" stroke="#111" stroke-width="2" fill="none"/>
    </svg>`,
  },
  nhl: {
    name: 'NHL',
    full: 'National Hockey League',
    color: '#000814',
    logo: `<svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="31" y="8" width="10" height="38" rx="5" fill="#c8a96e" stroke="#9a7c45" stroke-width="1.5" transform="rotate(-12 36 27)"/>
      <rect x="18" y="48" width="36" height="11" rx="5" fill="#c8a96e" stroke="#9a7c45" stroke-width="1.5"/>
      <ellipse cx="40" cy="60" rx="12" ry="6" fill="#1a1a1a" stroke="#444" stroke-width="1"/>
      <ellipse cx="40" cy="58" rx="12" ry="5" fill="#222" stroke="#555" stroke-width="1"/>
    </svg>`,
  },
  worldcup: {
    name: 'World Cup',
    full: 'FIFA World Cup 2026',
    color: '#1a3d6e',
    logo: `<svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="36" cy="36" r="28" fill="white" stroke="#d0d0d0" stroke-width="1.5"/>
      <polygon points="36,11 44,17 41,27 31,27 28,17" fill="#111"/>
      <polygon points="56,27 62,36 56,45 46,42 46,30" fill="#111"/>
      <polygon points="49,55 39,63 31,57 33,46 44,44" fill="#111"/>
      <polygon points="23,55 15,47 19,36 29,38 29,50" fill="#111"/>
      <polygon points="16,27 26,30 26,42 16,45 10,36" fill="#111"/>
      <line x1="36" y1="27" x2="46" y2="30" stroke="#bbb" stroke-width="1"/>
      <line x1="46" y1="30" x2="44" y2="44" stroke="#bbb" stroke-width="1"/>
      <line x1="44" y1="44" x2="33" y2="46" stroke="#bbb" stroke-width="1"/>
      <line x1="33" y1="46" x2="26" y2="42" stroke="#bbb" stroke-width="1"/>
      <line x1="26" y1="42" x2="28" y2="27" stroke="#bbb" stroke-width="1"/>
      <line x1="28" y1="27" x2="36" y2="27" stroke="#bbb" stroke-width="1"/>
    </svg>`,
  },
  mls: {
    name: 'MLS',
    full: 'Major League Soccer',
    color: '#1a1a2e',
    logo: `<svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="36" cy="36" r="28" fill="#2d7a3e" stroke="#1d5e2a" stroke-width="1.5"/>
      <circle cx="36" cy="36" r="10" fill="none" stroke="#fff" stroke-width="1.5" opacity=".9"/>
      <line x1="8" y1="36" x2="64" y2="36" stroke="#fff" stroke-width="1.2" opacity=".8"/>
      <line x1="36" y1="8" x2="36" y2="64" stroke="#fff" stroke-width="1.2" opacity=".8"/>
    </svg>`,
  },
  cfb: {
    name: 'College Football',
    full: 'Power 4 College Football',
    color: '#8B1A1A',
    logo: `<svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="36" cy="38" rx="26" ry="16" fill="#7B3F00" stroke="#5a2d00" stroke-width="1.5"/>
      <path d="M11 38 Q36 28 61 38" stroke="white" stroke-width="2.5" fill="none" opacity=".9"/>
      <path d="M11 38 Q36 48 61 38" stroke="white" stroke-width="2.5" fill="none" opacity=".9"/>
      <line x1="36" y1="26" x2="36" y2="50" stroke="white" stroke-width="2" opacity=".9"/>
      <line x1="31" y1="31" x2="41" y2="31" stroke="white" stroke-width="1.8" opacity=".9"/>
      <line x1="30" y1="38" x2="42" y2="38" stroke="white" stroke-width="1.8" opacity=".9"/>
      <line x1="31" y1="45" x2="41" y2="45" stroke="white" stroke-width="1.8" opacity=".9"/>
    </svg>`,
  },
};

const PLATFORM_COLORS = {
  Ticketmaster:  '#026cdf',
  StubHub:       '#5f259f',
  SeatGeek:      '#f4811f',
  'Vivid Seats': '#c8102e',
  AXS:           '#111111',
};

// ── Official primary ticketing partner per team ───────────────────────────────
// Default is Ticketmaster. Only exceptions are listed here.
// SeatGeek partners verified from seatgeek.com/enterprise/partners
const OFFICIAL_TICKETERS = {
  // CFB — Big 12 (official SeatGeek conference partner — current 16 members)
  'Arizona':                  'SeatGeek',
  'Arizona State':            'SeatGeek',
  'Baylor':                   'SeatGeek',
  'BYU':                      'SeatGeek',
  'Cincinnati':               'SeatGeek',
  'Colorado':                 'SeatGeek',
  'Houston':                  'SeatGeek',
  'Iowa State':               'SeatGeek',
  'Kansas':                   'SeatGeek',
  'Kansas State':             'SeatGeek',
  'Oklahoma State':           'SeatGeek',
  'TCU':                      'SeatGeek',
  'Texas Tech':               'SeatGeek',
  'UCF':                      'SeatGeek',
  'Utah':                     'SeatGeek',
  'West Virginia':            'SeatGeek',
  // CFB — SEC (individually confirmed SeatGeek partnerships)
  'Texas':                    'SeatGeek',
  'Oklahoma':                 'SeatGeek',
  // NFL — SeatGeek
  'Arizona Cardinals':        'SeatGeek',
  'Baltimore Ravens':         'SeatGeek',
  'Dallas Cowboys':           'SeatGeek',
  'New Orleans Saints':       'SeatGeek',
  'Tennessee Titans':         'SeatGeek',
  'Washington Commanders':    'SeatGeek',
  // NBA — AXS
  'Golden State Warriors':    'AXS',
  'Denver Nuggets':           'AXS',
  // NBA — SeatGeek
  'Cleveland Cavaliers':      'SeatGeek',
  'New Orleans Pelicans':     'SeatGeek',
  'Utah Jazz':                'SeatGeek',
  // NHL — AXS
  'Vegas Golden Knights':     'AXS',
  'Colorado Avalanche':       'AXS',
  // NHL — SeatGeek
  'Florida Panthers':         'SeatGeek',
  // MLS — AXS
  'LA Galaxy':                'AXS',
  'LAFC':                     'AXS',
  'Seattle Sounders FC':      'AXS',
  'Houston Dynamo FC':        'AXS',
  // MLS — SeatGeek
  'Austin FC':                'SeatGeek',
  'Chicago Fire FC':          'SeatGeek',
  'FC Cincinnati':            'SeatGeek',
  'FC Dallas':                'SeatGeek',
  'Minnesota United FC':      'SeatGeek',
  'Philadelphia Union':       'SeatGeek',
  'Portland Timbers':         'SeatGeek',
  'Real Salt Lake':           'SeatGeek',
  'Sporting Kansas City':     'SeatGeek',
  'St. Louis City SC':        'SeatGeek',
};

function officialTicketer(teamName) {
  return OFFICIAL_TICKETERS[teamName] || 'Ticketmaster';
}

function total(p) { return p.base + p.fees; }
function fmt(n)   { return '$' + n.toLocaleString('en-US'); }

function shortDate(d) {
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric' });
}

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ── Data ──────────────────────────────────────────────────────────────────────
function getAllEvents(sport) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let all = EVENTS.filter(e => e.sport === sport);
  if (sport === 'nfl'      && typeof NFL_GAMES       !== 'undefined') all = all.concat(NFL_GAMES);
  if (sport === 'mlb'      && typeof MLB_GAMES       !== 'undefined') all = all.concat(MLB_GAMES);
  if (sport === 'nba'      && typeof NBA_GAMES       !== 'undefined') all = all.concat(NBA_GAMES);
  if (sport === 'nhl'      && typeof NHL_GAMES       !== 'undefined') all = all.concat(NHL_GAMES);
  if (sport === 'worldcup' && typeof WORLDCUP_GAMES  !== 'undefined') all = all.concat(WORLDCUP_GAMES);
  if (sport === 'mls'      && typeof MLS_GAMES       !== 'undefined') all = all.concat(MLS_GAMES);
  if (sport === 'cfb'      && typeof CFB_GAMES       !== 'undefined') all = all.concat(CFB_GAMES);

  return all
    .filter(e => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

// ── State ─────────────────────────────────────────────────────────────────────
let _sport       = '';
let _allEvents   = [];
let _optData     = [];
let _currentBy   = null;
let _currentTeam = null; // set when browsing by team — used for official ticketer badge

window.pickOption = function(i) {
  navigate(_currentBy, _optData[i]);
};

window.pickConference = function(conf) {
  const p = new URLSearchParams({ sport: 'cfb', conf });
  history.pushState({}, '', `?${p}`);
  renderView();
};

window.pickCfbTeam = function(conf, team) {
  const p = new URLSearchParams({ sport: 'cfb', conf, team });
  history.pushState({}, '', `?${p}`);
  renderView();
};

// ── Navigation ────────────────────────────────────────────────────────────────
function navigate(by, val) {
  const p = new URLSearchParams({ sport: _sport });
  if (by  != null) p.set('by',  by);
  if (val != null) p.set('val', String(val));
  history.pushState({}, '', `?${p}`);
  renderView();
}

function renderView() {
  const p    = new URLSearchParams(window.location.search);
  const by   = p.get('by');
  const val  = p.get('val');
  const conf = p.get('conf');
  const team = p.get('team');

  // CFB uses a 3-level hierarchy: conference → team → games
  if (_sport === 'cfb') {
    if (!conf)       renderConferences();
    else if (!team)  renderTeamsInConference(conf);
    else             renderGames('team', team);
    return;
  }

  if (!by)            renderPicker();
  else if (!val)      renderOptions(by);
  else                renderGames(by, val);
}

// ── CFB: Conference grid ──────────────────────────────────────────────────────
function renderConferences() {
  if (typeof CFB_CONFERENCES === 'undefined') {
    document.getElementById('browseArea').innerHTML =
      '<p style="color:var(--muted);padding:40px;text-align:center">Loading…</p>';
    return;
  }

  const cards = Object.entries(CFB_CONFERENCES).map(([key, conf]) => {
    const gameCount = _allEvents.filter(e => e.conference === key).length;
    const logoHtml  = conf.logo
      ? `<span class="conf-logo">${conf.logo}</span>`
      : `<span class="conf-badge" style="background:${conf.color}">${conf.short}</span>`;
    return `
      <button class="browse-cat-btn conf-card" onclick="pickConference('${key}')">
        ${logoHtml}
        <span class="bcat-label">${key}</span>
        <span class="bcat-desc">${conf.name}</span>
        <span class="conf-meta">${conf.teams.length} team${conf.teams.length !== 1 ? 's' : ''} &middot; ${gameCount} games</span>
      </button>`;
  }).join('');

  document.getElementById('browseArea').innerHTML = `
    <div class="browse-picker">
      <p class="browse-prompt">Select a conference</p>
      <div class="browse-categories">${cards}</div>
    </div>`;

  setBannerSub(_allEvents.length);
}

// ── CFB: Teams within a conference ───────────────────────────────────────────
function renderTeamsInConference(conf) {
  if (typeof CFB_CONFERENCES === 'undefined') return;
  const confData = CFB_CONFERENCES[conf];
  if (!confData) return;

  const teams = [...confData.teams].sort();
  const cards = teams.map(t => {
    const count   = _allEvents.filter(e => e.home === t || e.away === t).length;
    const venue   = (typeof CFB_VENUES !== 'undefined' && CFB_VENUES[t])
      ? CFB_VENUES[t].split(' · ')[0] : '';
    const mascot  = (typeof CFB_MASCOTS !== 'undefined' && CFB_MASCOTS[t]) ? CFB_MASCOTS[t] : '';
    const safeConf = conf.replace(/'/g, "\\'");
    const safeTeam = t.replace(/'/g, "\\'");
    return `
      <button class="opt-card team-opt-card" onclick="pickCfbTeam('${safeConf}','${safeTeam}')">
        <span class="opt-main">${escHtml(t)}</span>
        ${mascot ? `<span class="opt-mascot">${escHtml(mascot)}</span>` : ''}
        ${venue ? `<span class="opt-sub">${escHtml(venue)}</span>` : ''}
        <span class="opt-count">${count} game${count !== 1 ? 's' : ''}</span>
      </button>`;
  }).join('');

  document.getElementById('browseArea').innerHTML = `
    <div class="browse-nav-bar">
      <button class="browse-back-btn" onclick="history.back()">← Back</button>
      <span class="browse-nav-label" style="color:var(--text)">${conf} &mdash; ${escHtml(confData.name)}</span>
    </div>
    <div class="opt-grid team-opt-grid">${cards}</div>`;

  setBannerSub(_allEvents.length);
}

// ── Banner ────────────────────────────────────────────────────────────────────
function buildBanner(meta, count) {
  const banner = document.getElementById('sportBanner');
  banner.style.borderLeft  = `4px solid ${meta.color}`;
  banner.style.paddingLeft = '20px';
  banner.style.background  = `${meta.color}0d`;
  document.getElementById('bannerLogo').innerHTML    = meta.logo;
  document.getElementById('bannerTitle').textContent = meta.name;
  setBannerSub(count);
  document.title = `${meta.name} Tickets — TicketCompare`;
}

function setBannerSub(count) {
  const meta = SPORT_META[_sport];
  document.getElementById('bannerSub').textContent =
    `${meta.full}  ·  ${count} game${count !== 1 ? 's' : ''}`;
}

// ── View 1: Category picker ───────────────────────────────────────────────────
function renderPicker() {
  _currentBy = null;
  _optData   = [];

  const hasWeeks  = _allEvents.some(e => e.week  != null);
  const hasTeams  = _allEvents.some(e => e.home || e.away);
  const hasGroups = _allEvents.some(e => e.group != null);

  const cats = [];
  if (hasWeeks)  cats.push({ key: 'week',  emoji: '📅', label: 'Week',  desc: 'Browse by week number' });
  if (hasGroups) cats.push({ key: 'group', emoji: '🌍', label: 'Group', desc: 'Browse by group'        });
  if (hasTeams)  cats.push({ key: 'team',  emoji: '🏆', label: 'Teams', desc: 'Browse by your team'   });
                 cats.push({ key: 'venue', emoji: '📍', label: 'Venue', desc: 'Browse by stadium'      });

  const cards = cats.map(c => `
    <button class="browse-cat-btn" onclick="navigate('${c.key}', null)">
      <span class="bcat-emoji">${c.emoji}</span>
      <span class="bcat-label">${c.label}</span>
      <span class="bcat-desc">${c.desc}</span>
    </button>`).join('');

  document.getElementById('browseArea').innerHTML = `
    <div class="browse-picker">
      <p class="browse-prompt">How would you like to browse?</p>
      <div class="browse-categories">${cards}</div>
    </div>`;

  setBannerSub(_allEvents.length);
}

// ── View 2: Options grid ──────────────────────────────────────────────────────
function renderOptions(by) {
  _currentBy = by;

  let inner = '';
  if      (by === 'week')  inner = buildWeekGrid();
  else if (by === 'group') inner = buildGroupGrid();
  else if (by === 'team')  inner = buildTeamGrid();
  else if (by === 'venue') inner = buildVenueGrid();

  const label = by.charAt(0).toUpperCase() + by.slice(1);
  document.getElementById('browseArea').innerHTML = `
    <div class="browse-nav-bar">
      <button class="browse-back-btn" onclick="history.back()">← Back</button>
      <span class="browse-nav-label">Browse by ${label}</span>
    </div>
    ${inner}`;

  setBannerSub(_allEvents.length);
}

function buildWeekGrid() {
  const weekMap = {};
  _allEvents.forEach(e => {
    if (e.week == null) return;
    (weekMap[e.week] = weekMap[e.week] || []).push(e);
  });

  const weeks = Object.keys(weekMap).map(Number).sort((a, b) => a - b);
  _optData = weeks;

  const cards = weeks.map((wk, i) => {
    const games = weekMap[wk];
    const dates = games.map(e => new Date(e.date)).sort((a, b) => a - b);
    const lo = shortDate(dates[0]);
    const hi = shortDate(dates[dates.length - 1]);
    const range = lo === hi ? lo : `${lo} – ${hi}`;
    return `
      <button class="opt-card week-opt-card" onclick="pickOption(${i})">
        <span class="opt-main">Week ${wk}</span>
        <span class="opt-sub">${range}</span>
        <span class="opt-count">${games.length} game${games.length !== 1 ? 's' : ''}</span>
      </button>`;
  }).join('');

  return `<div class="opt-grid week-opt-grid">${cards}</div>`;
}

function buildGroupGrid() {
  const groupMap = {};
  _allEvents.forEach(e => {
    if (!e.group) return;
    (groupMap[e.group] = groupMap[e.group] || []).push(e);
  });

  const groups = Object.keys(groupMap).sort((a, b) => {
    const la = a.replace('Group ', '');
    const lb = b.replace('Group ', '');
    return la.localeCompare(lb);
  });
  _optData = groups;

  const cards = groups.map((grp, i) => {
    const games = groupMap[grp];
    const teams = [...new Set(games.flatMap(e => [e.home, e.away].filter(Boolean)))].slice(0, 4);
    const teamsHtml = teams.length
      ? `<div class="group-team-list">${teams.map(t => `<span class="group-team-name">${escHtml(t)}</span>`).join('')}</div>`
      : '';
    return `
      <button class="opt-card group-opt-card" onclick="pickOption(${i})">
        <span class="opt-main">${escHtml(grp)}</span>
        ${teamsHtml}
        <span class="opt-count">${games.length} match${games.length !== 1 ? 'es' : ''}</span>
      </button>`;
  }).join('');

  return `<div class="opt-grid group-opt-grid">${cards}</div>`;
}

function buildTeamGrid() {
  const teams = [...new Set(
    _allEvents.flatMap(e => [e.home, e.away].filter(Boolean))
  )].sort();
  _optData = teams;

  const cards = teams.map((t, i) => {
    const count = _allEvents.filter(e => e.home === t || e.away === t).length;
    return `
      <button class="opt-card team-opt-card" onclick="pickOption(${i})">
        <span class="opt-main">${t}</span>
        <span class="opt-count">${count} game${count !== 1 ? 's' : ''}</span>
      </button>`;
  }).join('');

  return `<div class="opt-grid team-opt-grid">${cards}</div>`;
}

function buildVenueGrid() {
  const venueMap = new Map();
  _allEvents.forEach(e => {
    if (!e.venue) return;
    const v = venueMap.get(e.venue) || { venue: e.venue, count: 0 };
    v.count++;
    venueMap.set(e.venue, v);
  });

  const venues = [...venueMap.values()].sort((a, b) => a.venue.localeCompare(b.venue));
  _optData = venues.map(v => v.venue);

  const cards = venues.map((v, i) => {
    const [name, loc = ''] = v.venue.split(' · ');
    return `
      <button class="opt-card venue-opt-card" onclick="pickOption(${i})">
        <span class="opt-main">${name}</span>
        ${loc ? `<span class="opt-sub">${loc}</span>` : ''}
        <span class="opt-count">${v.count} game${v.count !== 1 ? 's' : ''}</span>
      </button>`;
  }).join('');

  return `<div class="opt-grid venue-opt-grid">${cards}</div>`;
}

// ── View 3: Games list ────────────────────────────────────────────────────────
function renderGames(by, val) {
  _currentBy   = by;
  _currentTeam = (by === 'team') ? val : null;

  let filtered = _allEvents;
  let heading  = val;

  if (by === 'week') {
    const wk = parseInt(val, 10);
    filtered  = _allEvents.filter(e => e.week === wk);
    heading   = `Week ${wk}`;
  } else if (by === 'group') {
    filtered  = _allEvents.filter(e => e.group === val);
    heading   = val;
  } else if (by === 'team') {
    filtered  = _allEvents.filter(e => e.home === val || e.away === val);
    heading   = val;
  } else if (by === 'venue') {
    filtered  = _allEvents.filter(e => e.venue === val);
    heading   = val.split(' · ')[0];
  }

  const count     = filtered.length;
  const gamesHtml = count
    ? filtered.map(buildGameRow).join('')
    : `<div class="empty-state">
         <span class="empty-icon">🎫</span>
         <h3 class="empty-heading">No upcoming games found</h3>
         <p class="empty-sub">Check back soon — more games may be announced.</p>
       </div>`;

  const wlCount = getWatchlist().size;

  document.getElementById('browseArea').innerHTML = `
    <div class="browse-nav-bar">
      <button class="browse-back-btn" onclick="history.back()">← Back</button>
      <span class="browse-nav-label">${escHtml(heading)} &middot; ${count} game${count !== 1 ? 's' : ''}</span>
    </div>
    <div class="wl-tabs">
      <button class="wl-tab wl-tab-active" id="allGamesTab" onclick="switchToAllGames()">All Games</button>
      <button class="wl-tab" id="watchlistTabBtn" onclick="switchToWatchlist()">
        Watchlist
        <span class="wl-badge" id="wlBadge" style="display:${wlCount ? 'inline-flex' : 'none'}">${wlCount}</span>
      </button>
    </div>
    <div id="allGamesPanel"><div class="games-list">${gamesHtml}</div></div>
    <div id="watchlistPanel" class="wl-panel" style="display:none"></div>`;

  setBannerSub(count);

  // Async: fetch real TM prices and inject into matching game rows (non-blocking)
  _injectTMStrip(_sport, by, val);
}

// ── Ticketmaster live prices — inject into matching game rows ─────────────────
async function _injectTMStrip(sport, by, val) {
  if (typeof fetchTMEvents !== 'function') return;

  // Use team name as keyword when browsing by team for precise results
  const keyword = (by === 'team') ? val : null;
  const events  = await fetchTMEvents(sport, keyword);
  if (!events.length) return;

  // Filter out season packages — we only want single-game tickets
  const singles = events.filter(ev =>
    !/season|package|plan|membership|series/i.test(ev.name)
  );
  if (!singles.length) return;

  // Index TM events by date for fast lookup
  const tmByDate = {};
  singles.forEach(ev => {
    (tmByDate[ev.date] = tmByDate[ev.date] || []).push(ev);
  });

  // Find each rendered game row and inject a Ticketmaster price row
  document.querySelectorAll('.game-row[data-date]').forEach(row => {
    const date   = row.dataset.date;
    const tmEvs  = tmByDate[date];
    if (!tmEvs || !tmEvs.length) return;

    // Pick the TM event with the lowest price (or first if none have prices)
    const best = tmEvs
      .filter(ev => ev.minPrice !== null)
      .sort((a, b) => a.minPrice - b.minPrice)[0] || tmEvs[0];

    const pricesEl = row.querySelector('.game-prices');
    if (!pricesEl || !best) return;

    // Build price text
    const priceText = best.minPrice !== null
      ? fmt(Math.round(best.minPrice))
      : 'See prices';

    // Inject as a new price row at the bottom (primary market, separate from resale)
    const tmOfficial = officialTicketer(_currentTeam) === 'Ticketmaster';
    const tmBadge    = tmOfficial
      ? '<span class="gp-badge gp-badge-official">Official</span>'
      : '<span class="gp-badge gp-badge-resale">Resale</span>';
    const tmRow = document.createElement('div');
    tmRow.className = 'game-price-row gp-tm-row';
    tmRow.innerHTML =
      `<span class="gp-platform" style="color:#026cdf">Ticketmaster</span>` +
      `<a class="gp-price gp-tm-link" href="${best.url}" target="_blank" rel="noopener noreferrer">${priceText}</a>` +
      tmBadge;
    pricesEl.appendChild(tmRow);
  });
}

// ── Watchlist (localStorage) ─────────────────────────────────────────────────
const WATCHLIST_KEY = 'tc_watchlist';

function getWatchlist() {
  try { return new Set(JSON.parse(localStorage.getItem(WATCHLIST_KEY)) || []); }
  catch { return new Set(); }
}

function saveWatchlist(set) {
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify([...set]));
}

function toggleWatchlist(id) {
  const wl = getWatchlist();
  const adding = !wl.has(id);
  adding ? wl.add(id) : wl.delete(id);
  saveWatchlist(wl);

  // Update all bookmark buttons for this event
  document.querySelectorAll(`.bmark-btn[data-id="${id}"]`).forEach(btn => {
    btn.classList.toggle('saved', adding);
    btn.setAttribute('aria-label', adding ? 'Remove from watchlist' : 'Save to watchlist');
    btn.innerHTML = bookmarkSVG(adding);
  });

  // Update watchlist tab badge
  updateWatchlistBadge();
  showWatchlistToast(adding);

  // If we're on the watchlist tab, re-render it
  if (document.getElementById('watchlistPanel')?.classList.contains('wl-active')) {
    renderWatchlistPanel();
  }
}

function bookmarkSVG(filled) {
  return `<svg width="15" height="15" viewBox="0 0 24 24" fill="${filled ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`;
}

function updateWatchlistBadge() {
  const badge = document.getElementById('wlBadge');
  if (!badge) return;
  const count = getWatchlist().size;
  badge.textContent = count;
  badge.style.display = count ? 'inline-flex' : 'none';
}

let _toastTimer;
function showWatchlistToast(adding) {
  let toast = document.getElementById('wlToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'wlToast';
    toast.className = 'wl-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = adding ? '🔖 Saved to watchlist' : 'Removed from watchlist';
  toast.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

// ── Countdown label ───────────────────────────────────────────────────────────
function countdownLabel(dateStr) {
  const today    = new Date(); today.setHours(0,0,0,0);
  const eventDay = new Date(dateStr); eventDay.setHours(0,0,0,0);
  const days     = Math.round((eventDay - today) / 86400000);
  if (days < 0)   return null;
  if (days === 0) return { text: 'Today',         cls: 'cd-today' };
  if (days === 1) return { text: 'Tomorrow',      cls: 'cd-tomorrow' };
  if (days <= 7)  return { text: `${days} days`,  cls: 'cd-soon' };
  return           { text: `${days} days away`,   cls: 'cd-future' };
}

// ── Game row card ─────────────────────────────────────────────────────────────
function buildGameRow(event) {
  const d      = new Date(event.date);
  const month  = d.toLocaleString('en-US', { month: 'short' });
  const day    = d.getDate();
  const year   = d.getFullYear();
  const sorted = [...event.prices].sort((a, b) => total(a) - total(b));

  const official   = officialTicketer(_currentTeam);
  const priceRows = sorted.map(p => {
    const color     = PLATFORM_COLORS[p.platform] || '#aaa';
    const isOfficial = p.platform === official;
    const badge     = isOfficial
      ? '<span class="gp-badge gp-badge-official">Official</span>'
      : '<span class="gp-badge gp-badge-resale">Resale</span>';
    return `
      <div class="game-price-row">
        <span class="gp-platform" style="color:${color}">${p.platform}</span>
        <span class="gp-price">${fmt(total(p))}</span>
        ${badge}
      </div>`;
  }).join('');

  const weekBadge = event.week
    ? `<span class="week-badge">Wk&nbsp;${event.week}</span>`
    : '';

  const cd = countdownLabel(event.date);
  const countdownHtml = cd
    ? `<span class="countdown-pill ${cd.cls}">${cd.text}</span>`
    : '';

  const isSaved   = getWatchlist().has(event.id);
  const bmarkHtml =
    `<button class="bmark-btn ${isSaved ? 'saved' : ''}" data-id="${event.id}"` +
    ` onclick="toggleWatchlist('${event.id}')"` +
    ` aria-label="${isSaved ? 'Remove from watchlist' : 'Save to watchlist'}">` +
    `${bookmarkSVG(isSaved)}</button>`;

  return `
    <div class="game-row" data-id="${event.id}" data-date="${event.date}">
      <div class="game-date">
        <span class="date-month">${month}</span>
        <span class="date-day">${day}</span>
        <span class="date-year">${year}</span>
      </div>
      <div class="game-info">
        <div class="game-title">${escHtml(event.title)}${weekBadge}</div>
        <div class="game-venue"><span class="game-venue-icon">📍</span>${escHtml(event.venue)}</div>
        ${countdownHtml}
      </div>
      <div class="game-prices">${priceRows}</div>
      <div class="game-actions">
        <a class="see-tickets-btn" href="seat-map.html?id=${event.id}">See Tickets →</a>
        ${bmarkHtml}
      </div>
    </div>`;
}

// ── Watchlist tab panel ───────────────────────────────────────────────────────
function renderWatchlistPanel() {
  const panel = document.getElementById('watchlistPanel');
  if (!panel) return;
  const wl       = getWatchlist();
  const wlEvents = _allEvents.filter(e => wl.has(e.id));
  if (wlEvents.length === 0) {
    panel.innerHTML = `
      <div class="wl-empty">
        <div class="wl-empty-icon">🔖</div>
        <div class="wl-empty-title">No saved games yet</div>
        <div class="wl-empty-sub">Tap the bookmark on any game to save it here</div>
      </div>`;
  } else {
    panel.innerHTML = `<div class="games-list">${wlEvents.map(buildGameRow).join('')}</div>`;
  }
}

function switchToWatchlist() {
  document.getElementById('allGamesTab').classList.remove('wl-tab-active');
  document.getElementById('watchlistTabBtn').classList.add('wl-tab-active');
  document.getElementById('allGamesPanel').style.display = 'none';
  document.getElementById('watchlistPanel').classList.add('wl-active');
  document.getElementById('watchlistPanel').style.display = '';
  renderWatchlistPanel();
}

function switchToAllGames() {
  document.getElementById('watchlistTabBtn').classList.remove('wl-tab-active');
  document.getElementById('allGamesTab').classList.add('wl-tab-active');
  document.getElementById('watchlistPanel').style.display = 'none';
  document.getElementById('watchlistPanel').classList.remove('wl-active');
  document.getElementById('allGamesPanel').style.display = '';
}

// ── Init ──────────────────────────────────────────────────────────────────────
async function init() {
  _sport = new URLSearchParams(window.location.search).get('sport') || 'nfl';
  const meta = SPORT_META[_sport];

  if (!meta) {
    document.getElementById('browseArea').innerHTML =
      '<p style="color:var(--muted);text-align:center;padding:40px">Sport not found.</p>';
    return;
  }

  // Show static/cached data immediately
  _allEvents = getAllEvents(_sport);
  buildBanner(meta, _allEvents.length);
  window.addEventListener('popstate', renderView);
  renderView();

  // Back-to-top button
  const btt = document.getElementById('backToTop');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('visible', window.scrollY > 320);
    }, { passive: true });
  }

  // Fetch real schedule from API (MLB, NFL, NHL, MLS); NBA/worldcup/CFB keep static
  if (typeof window.loadSchedule === 'function' && _sport !== 'nba' && _sport !== 'worldcup' && _sport !== 'cfb') {
    const apiEvents = await window.loadSchedule(_sport);
    if (apiEvents && apiEvents.length > 0) {
      _allEvents = apiEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
      buildBanner(meta, _allEvents.length);
      renderView();
    }
  }
}

document.addEventListener('DOMContentLoaded', init);
