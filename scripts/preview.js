#!/usr/bin/env node
// Serves dist/ on http://localhost:5173 with the same headers Cloudflare Pages will send (public/_headers).
const http = require('http');
const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, '..', 'dist');
const PORT = Number(process.env.PORT || 5173);
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.woff2': 'font/woff2', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.txt': 'text/plain; charset=utf-8' };

// a small reader for the _headers format: a path pattern line, then indented "Name: value" lines
function headerRules() {
  const rules = []; let cur = null;
  const file = path.join(DIST, '_headers');
  if (!fs.existsSync(file)) return rules;
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    if (!/^\s/.test(line)) { cur = { pattern: line.trim(), headers: {} }; rules.push(cur); continue; }
    const i = line.indexOf(':'); if (cur && i > 0) cur.headers[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return rules;
}
const RULES = headerRules();
const matches = (pattern, url) => pattern.endsWith('*') ? url.startsWith(pattern.slice(0, -1)) : url === pattern;

http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  let file = path.join(DIST, url === '/' ? 'index.html' : url);
  if (!file.startsWith(DIST) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(DIST, 'index.html');
  const headers = { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' };
  RULES.filter(r => matches(r.pattern, url)).forEach(r => Object.assign(headers, r.headers));
  res.writeHead(200, headers);
  fs.createReadStream(file).pipe(res);
}).listen(PORT, '127.0.0.1', () => console.log(`Zooku preview: http://localhost:${PORT}`));
