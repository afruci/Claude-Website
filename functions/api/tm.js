// Cloudflare Pages Function — Ticketmaster API proxy
// Deployed automatically at: https://ticketcompasses.com/api/tm
// Forwards requests to TM Discovery API and adds CORS headers.

const TM_API_KEY = '2Pi4uwk0cTLCbPvDHz2rUPOhLbZIvdUJ';
const TM_BASE    = 'https://app.ticketmaster.com/discovery/v2/events.json';

export async function onRequest(context) {
  // Handle preflight
  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  // Forward all query params to TM, injecting the API key server-side
  const incoming = new URL(context.request.url);
  const tmUrl    = new URL(TM_BASE);

  incoming.searchParams.forEach((value, key) => {
    if (key !== 'apikey') tmUrl.searchParams.set(key, value);
  });
  tmUrl.searchParams.set('apikey', TM_API_KEY);

  try {
    const res  = await fetch(tmUrl.toString(), {
      headers: {
        'Origin':  'https://ticketcompasses.com',
        'Referer': 'https://ticketcompasses.com/',
      },
    });
    const body = await res.text();

    return new Response(body, {
      status: res.status,
      headers: {
        'Content-Type':                'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control':               'public, max-age=1800', // 30 min
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 502,
      headers: {
        'Content-Type':                'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
