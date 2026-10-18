#!/usr/bin/env node
// The Zooku Workshop: a local, private page for reviewing the calendar.   npm run workshop
// Serves src/workshop on http://localhost:5174 (this computer only) and saves every change to data/calendar.json.
const http = require('http');
const fs = require('fs');
const path = require('path');
const G = require('../src/shared/generator.js');
const calendar = require('./lib/calendar');
const { etDate, addDays } = require('./lib/time');

const ROOT = path.join(__dirname, '..');
const PORT = Number(process.env.PORT || 5174);
const FILES = {   // url → file on disk (nothing outside this list is served)
  '/': 'src/workshop/index.html', '/workshop/workshop.js': 'src/workshop/workshop.js', '/favicon.svg': 'public/favicon.svg',
  '/shared/engine.js': 'src/shared/engine.js', '/shared/art.js': 'src/shared/art.js',
};
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };

const send = (res, code, body) => { res.writeHead(code, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(body)); };
const readBody = req => new Promise((ok, fail) => {
  let s = ''; req.on('data', c => { s += c; if (s.length > 1e5) req.destroy(); });
  req.on('end', () => { try { ok(s ? JSON.parse(s) : {}); } catch (e) { fail(e); } }); req.on('error', fail);
});
const stripTries = p => { if (p.meta) delete p.meta.tries; return p; };
const puzzleOnly = ({ review, previous, ...p }) => p;

function regenerate(days, i) {
  const day = days[i];
  const near = days.filter(d => d.date !== day.date && Math.abs(new Date(d.date) - new Date(day.date)) <= 8 * 864e5).map(d => d.title);
  const avoid = new Set(days.map(G.signature));
  const want = day.meta.want || { winner: day.meta.winner, tier: day.meta.difficulty };
  let seed = Math.max(day.meta.seed || 0, day.previous && day.previous.meta.seed || 0) + 1, p = null;
  for (let k = 0; k < 6 && !p; k++, seed++) p = G.makeDay({ date: day.date, no: day.no, theme: day.theme, seed, want, avoid, avoidTitles: new Set(near.concat(day.title)) });
  if (!p) return null;
  return { ...stripTries(p), review: null, previous: day.previous || puzzleOnly(day) };   // keep the first original for "Revert"
}

async function api(req, res, url) {
  const days = calendar.read();
  const today = etDate();
  if (req.method === 'GET' && url === '/api/calendar') return send(res, 200, { today, days });
  if (req.method !== 'POST') return send(res, 405, { error: 'Use POST' });
  const body = await readBody(req);

  if (url === '/api/generate') {
    const n = Math.min(Math.max(Number(body.days) || 30, 1), 120);
    const last = days[days.length - 1];
    const fresh = G.buildSchedule({ startDate: addDays(last.date, 1), days: n, startNo: last.no + 1, previous: days }).map(p => ({ ...stripTries(p), review: null }));
    const all = days.concat(fresh); calendar.write(all);
    console.log(`Generated ${fresh.length} days through ${fresh[fresh.length - 1].date}`);
    return send(res, 200, { added: fresh.length, days: all });
  }

  const m = url.match(/^\/api\/days\/(\d{4}-\d{2}-\d{2})\/(approve|regen|revert)$/);
  if (!m) return send(res, 404, { error: 'Unknown action' });
  const [, date, action] = m;
  const i = days.findIndex(d => d.date === date);
  if (i < 0) return send(res, 404, { error: 'No such day' });
  if (action !== 'approve' && date <= today) return send(res, 409, { error: 'That day is already live' });

  if (action === 'approve') days[i].review = body.approved ? { approved: true, at: new Date().toISOString() } : null;
  if (action === 'regen') { const d = regenerate(days, i); if (!d) return send(res, 500, { error: 'No other puzzle found; try again' }); days[i] = d; }
  if (action === 'revert') { if (!days[i].previous) return send(res, 409, { error: 'Nothing to revert to' }); days[i] = { ...days[i].previous, review: null }; }
  calendar.write(days);
  console.log(`${date}: ${action}${action === 'approve' ? (body.approved ? 'd' : ' removed') : ''}`);
  return send(res, 200, days[i]);
}

http.createServer(async (req, res) => {
  const url = req.url.split('?')[0];
  try {
    if (url.startsWith('/api/')) return await api(req, res, url);
    let file = FILES[url];
    if (!file && /^\/fonts\/[\w.-]+\.woff2$/.test(url)) file = 'public' + url;
    if (!file || !fs.existsSync(path.join(ROOT, file))) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'text/plain', 'Cache-Control': 'no-store' });
    fs.createReadStream(path.join(ROOT, file)).pipe(res);
  } catch (e) { console.error(e); send(res, 500, { error: e.message }); }
}).listen(PORT, '127.0.0.1', () => console.log(`Zooku workshop: http://localhost:${PORT}  (Ctrl+C to stop)`));
