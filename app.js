'use strict';

// EVENTS is defined in events-data.js

const PLATFORMS = ['Ticketmaster', 'StubHub', 'SeatGeek'];

const SPORT_LABELS = {
  nfl: 'NFL', nba: 'NBA', mlb: 'MLB',
  nhl: 'NHL', mls: 'MLS', ufc: 'UFC',
};

// EVENTS loaded from events-data.js

// ── Helpers ───────────────────────────────────────────────────────────────────
function total(p) { return p.base + p.fees; }

function bestPrice(event) {
  return event.prices.reduce((min, p) => total(p) < total(min) ? p : min);
}

function maxPlatformPrice(event) {
  return event.prices.reduce((max, p) => total(p) > total(max) ? p : max);
}

function savings(event) {
  return total(maxPlatformPrice(event)) - total(bestPrice(event));
}

function fmt(n) {
  return '$' + n.toLocaleString('en-US');
}

// ── State ─────────────────────────────────────────────────────────────────────
let activeSport = 'all';
let activeSort  = 'date';
let searchQuery = '';

// ── Render ────────────────────────────────────────────────────────────────────
function renderEvents() {
  const grid = document.getElementById('eventsGrid');
  const title = document.getElementById('sectionTitle');

  let list = EVENTS.filter(e => {
    const matchSport = activeSport === 'all' || e.sport === activeSport;
    const matchQ = !searchQuery ||
      e.title.toLowerCase().includes(searchQuery) ||
      e.venue.toLowerCase().includes(searchQuery) ||
      e.sport.toLowerCase().includes(searchQuery);
    return matchSport && matchQ;
  });

  if (activeSort === 'price-low') {
    list.sort((a, b) => total(bestPrice(a)) - total(bestPrice(b)));
  } else if (activeSort === 'price-high') {
    list.sort((a, b) => total(bestPrice(b)) - total(bestPrice(a)));
  } else if (activeSort === 'savings') {
    list.sort((a, b) => savings(b) - savings(a));
  }

  title.textContent = activeSport === 'all'
    ? 'All Upcoming Events'
    : `${SPORT_LABELS[activeSport]} Events`;

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🏟️</div>
        <p>No events found. Try a different search or sport.</p>
      </div>`;
    return;
  }

  grid.innerHTML = list.map(buildCard).join('');
}

function buildCard(event) {
  const best   = bestPrice(event);
  const saving = savings(event);

  const rows = event.prices.map(p => {
    const isBest = p === best;
    return `
      <div class="price-row ${isBest ? 'best' : ''}">
        <span class="platform-name">${p.platform}</span>
        <span class="price-value">${fmt(total(p))} <span class="all-in-label">all-in</span></span>
        ${isBest ? '<span class="best-badge">Best</span>' : ''}
      </div>`;
  }).join('');

  return `
    <div class="event-card" onclick="openModal(${event.id})">
      <div class="card-img-placeholder" style="background: linear-gradient(135deg, ${event.color}cc, ${event.color}44);">
        <span>${event.emoji}</span>
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span class="sport-badge sport-${event.sport}">${SPORT_LABELS[event.sport]}</span>
          <span class="card-date">${event.date}</span>
        </div>
        <div class="card-title">${event.title}</div>
        <div class="card-venue">📍 ${event.venue}</div>
        <div class="price-rows">${rows}</div>
        <div class="card-savings">
          Save up to <span class="savings-pill">${fmt(saving)}</span> vs. highest price
        </div>
        <button class="card-cta">Compare all-in prices →</button>
        <a class="card-seatmap-link" href="seat-map.html?id=${event.id}" onclick="event.stopPropagation()">
          🗺️ View interactive seat map
        </a>
      </div>
    </div>`;
}

// ── Modal ─────────────────────────────────────────────────────────────────────
function openModal(id) {
  const event = EVENTS.find(e => e.id === id);
  if (!event) return;

  const sorted = [...event.prices].sort((a, b) => total(a) - total(b));
  const best = sorted[0];

  const rows = sorted.map(p => {
    const isBest = p === best;
    const platformColor = p.platform === 'Ticketmaster' ? '#026cdf'
                        : p.platform === 'StubHub'      ? '#ff5a00'
                        :                                 '#f4811f';
    return `
      <div class="modal-platform-row ${isBest ? 'best' : ''}">
        <div class="modal-platform-name" style="color:${platformColor}">
          ${p.platform}${isBest ? ' <span class="best-badge">Best</span>' : ''}
        </div>
        <div class="modal-price-detail">
          <span class="total">${fmt(total(p))}</span>
          <span class="all-in-tag">all-in</span>
        </div>
      </div>`;
  }).join('');

  document.getElementById('modalContent').innerHTML = `
    <div class="modal-sport-badge">
      <span class="sport-badge sport-${event.sport}">${SPORT_LABELS[event.sport]}</span>
    </div>
    <div class="modal-event-title">${event.title}</div>
    <div class="modal-event-meta">📍 ${event.venue}&nbsp;&nbsp;·&nbsp;&nbsp;📅 ${event.date}</div>

    <div class="modal-all-in-notice">All prices include every fee — no surprises at checkout.</div>

    <div class="modal-platforms">${rows}</div>

    <button class="modal-buy-btn" onclick="alert('Redirecting to ${best.platform}…')">
      Buy on ${best.platform} — ${fmt(total(best))} all-in
    </button>
    <p class="modal-disclaimer">Prices updated regularly and may vary by seat selection. Always confirm on the platform before purchasing.</p>
  `;

  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── Controls ──────────────────────────────────────────────────────────────────
function quickFilter(sport) {
  activeSport = sport;

  document.querySelectorAll('.tag').forEach(t => {
    const label = t.textContent.trim().toLowerCase();
    const match = sport === 'all' ? label === 'all' : label === sport;
    t.classList.toggle('active', match);
  });

  document.getElementById('sportFilter').value = sport;
  renderEvents();
}

function filterEvents() {
  searchQuery = document.getElementById('searchInput').value.toLowerCase().trim();
  activeSport = document.getElementById('sportFilter').value;

  document.querySelectorAll('.tag').forEach(t => {
    const label = t.textContent.trim().toLowerCase();
    const match = activeSport === 'all' ? label === 'all' : label === activeSport;
    t.classList.toggle('active', match);
  });

  renderEvents();
}

function sortEvents() {
  activeSort = document.getElementById('sortSelect').value;
  renderEvents();
}

document.getElementById('searchInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') filterEvents();
});

// ── Init ──────────────────────────────────────────────────────────────────────
renderEvents();
