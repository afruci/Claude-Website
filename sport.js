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
};

const PLATFORM_COLORS = {
  Ticketmaster: '#026cdf',
  StubHub:      '#5f259f',
  SeatGeek:     '#f4811f',
};

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
  if (sport === 'nhl'      && typeof NHL_GAMES       !== 'undefined') all = all.concat(NHL_GAMES);
  if (sport === 'worldcup' && typeof WORLDCUP_GAMES  !== 'undefined') all = all.concat(WORLDCUP_GAMES);

  return all
    .filter(e => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

// ── State ─────────────────────────────────────────────────────────────────────
let _sport     = '';
let _allEvents = [];
let _optData   = [];
let _currentBy = null;

window.pickOption = function(i) {
  navigate(_currentBy, _optData[i]);
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
  const p   = new URLSearchParams(window.location.search);
  const by  = p.get('by');
  const val = p.get('val');

  if (!by)            renderPicker();
  else if (!val)      renderOptions(by);
  else                renderGames(by, val);
}

// ── Banner ────────────────────────────────────────────────────────────────────
function buildBanner(meta, count) {
  const banner = document.getElementById('sportBanner');
  banner.style.borderLeft  = `4px solid ${meta.color}`;
  banner.style.paddingLeft = '20px';
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
  if (hasWeeks)  cats.push({ key: 'week',  emoji: '📅', label: 'Week',  desc: 'Browse by week number', white: false });
  if (hasGroups) cats.push({ key: 'group', emoji: '🌍', label: 'Group', desc: 'Browse by group',        white: false });
  if (hasTeams)  cats.push({ key: 'team',  emoji: '🏛', label: 'Teams', desc: 'Browse by your team',   white: true  });
                 cats.push({ key: 'venue', emoji: '🏟', label: 'Venue', desc: 'Browse by stadium',      white: true  });

  const cards = cats.map(c => `
    <button class="browse-cat-btn" onclick="navigate('${c.key}', null)">
      <span class="bcat-emoji${c.white ? ' white' : ''}">${c.emoji}</span>
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
  _currentBy = by;

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

  document.getElementById('browseArea').innerHTML = `
    <div class="browse-nav-bar">
      <button class="browse-back-btn" onclick="history.back()">← Back</button>
      <span class="browse-nav-label">${escHtml(heading)} &middot; ${count} game${count !== 1 ? 's' : ''}</span>
    </div>
    <div class="games-list">${gamesHtml}</div>`;

  setBannerSub(count);
}

// ── Game row card ─────────────────────────────────────────────────────────────
function buildGameRow(event) {
  const d      = new Date(event.date);
  const month  = d.toLocaleString('en-US', { month: 'short' });
  const day    = d.getDate();
  const year   = d.getFullYear();
  const sorted = [...event.prices].sort((a, b) => total(a) - total(b));

  const priceRows = sorted.map((p, i) => {
    const color = PLATFORM_COLORS[p.platform] || '#aaa';
    return `
      <div class="game-price-row">
        <span class="gp-platform" style="color:${color}">${p.platform}</span>
        <span class="gp-price">${fmt(total(p))}</span>
        ${i === 0 ? '<span class="gp-badge">Best</span>' : ''}
      </div>`;
  }).join('');

  const weekBadge = event.week
    ? `<span class="week-badge">Wk&nbsp;${event.week}</span>`
    : '';

  return `
    <div class="game-row">
      <div class="game-date">
        <span class="date-month">${month}</span>
        <span class="date-day">${day}</span>
        <span class="date-year">${year}</span>
      </div>
      <div class="game-info">
        <div class="game-title">${escHtml(event.title)}${weekBadge}</div>
        <div class="game-venue"><span class="game-venue-icon">📍</span>${escHtml(event.venue)}</div>
      </div>
      <div class="game-prices">${priceRows}</div>
      <a class="see-tickets-btn" href="seat-map.html?id=${event.id}">See Tickets →</a>
    </div>`;
}

// ── Init ──────────────────────────────────────────────────────────────────────
function init() {
  _sport = new URLSearchParams(window.location.search).get('sport') || 'nfl';
  const meta = SPORT_META[_sport];

  if (!meta) {
    document.getElementById('browseArea').innerHTML =
      '<p style="color:var(--muted);text-align:center;padding:40px">Sport not found.</p>';
    return;
  }

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
}

document.addEventListener('DOMContentLoaded', init);
