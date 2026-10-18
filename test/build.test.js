// The website build ships only released days, without answers, and every asset it links exists.
const test = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const calendar = require('../scripts/lib/calendar');

const ROOT = path.join(__dirname, '..');
const OUT = fs.mkdtempSync(path.join(os.tmpdir(), 'zooku-build-'));
const THROUGH = calendar.read()[10].date;
execFileSync(process.execPath, [path.join(ROOT, 'scripts/build.js')], { env: { ...process.env, OUT_DIR: OUT, RELEASE_THROUGH: THROUGH }, stdio: 'pipe' });
const html = fs.readFileSync(path.join(OUT, 'index.html'), 'utf8');
const assetFiles = fs.readdirSync(path.join(OUT, 'assets'));
const daysFile = fs.readFileSync(path.join(OUT, 'assets', assetFiles.find(f => f.startsWith('days.'))), 'utf8');

test('only days up to the release date are shipped', () => {
  const shipped = JSON.parse(daysFile.slice(daysFile.indexOf('['), daysFile.lastIndexOf(']') + 1));
  assert.equal(shipped.length, 11);
  assert.ok(shipped.every(d => d.date <= THROUGH));
});

test('no answers, generator notes or review state reach players', () => {
  for (const word of ['"meta"', 'placement', '"review"', '"previous"', 'perfectLayouts']) assert.ok(!daysFile.includes(word), word);
  const shipped = fs.readdirSync(OUT, { recursive: true }).join(' ');
  assert.ok(!/generator|workshop|calendar\.json/.test(shipped), shipped);
});

test('the page links real files and absolute share URLs', () => {
  assert.ok(!html.includes('{{'), 'all placeholders replaced');
  for (const [, url] of html.matchAll(/(?:src|href)="(\/[^"]*)"/g)) assert.ok(fs.existsSync(path.join(OUT, url)), url);
  assert.match(html, /<meta property="og:image" content="https:\/\/zooku\.app\/og-image\.png">/);
  assert.ok(fs.existsSync(path.join(OUT, '_headers')));
});
