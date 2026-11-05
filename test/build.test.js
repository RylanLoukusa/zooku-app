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

// Reading pages: plain HTML that search engines and AdSense reviewers can read without running the game.
const pageFiles = fs.readdirSync(OUT, { recursive: true }).filter(f => f.endsWith('index.html') && f !== 'index.html');
const textOf = h => h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

test('the reading pages are built, and the sitemap lists every page', () => {
  for (const p of ['how-to-play', 'field-guide', 'archive', 'about', 'contact', 'privacy']) assert.ok(pageFiles.includes(path.join(p, 'index.html')), p);
  const sitemap = fs.readFileSync(path.join(OUT, 'sitemap.xml'), 'utf8');
  const listed = [...sitemap.matchAll(/<loc>https:\/\/zooku\.app(\/[^<]*)<\/loc>/g)].map(m => m[1]);
  assert.deepEqual(listed.sort(), ['/', ...pageFiles.map(f => '/' + path.dirname(f).split(path.sep).join('/') + '/')].sort());
  assert.match(fs.readFileSync(path.join(OUT, 'robots.txt'), 'utf8'), /Sitemap: https:\/\/zooku\.app\/sitemap\.xml/);
});

test('every page has a title, a description, real text and working links', () => {
  for (const f of pageFiles) {
    const h = fs.readFileSync(path.join(OUT, f), 'utf8');
    assert.match(h, /<title>[^<]{10,}<\/title>/, f);
    assert.match(h, /<meta name="description" content="[^"]{50,}">/, f);
    assert.ok(textOf(h).split(' ').length > (f.startsWith('contact') ? 80 : 150), `${f} has too little text`);
    for (const [, url] of h.matchAll(/(?:src|href)="(\/[^"#]*)/g)) {
      const target = path.join(OUT, url);
      assert.ok(fs.existsSync(url.endsWith('/') ? path.join(target, 'index.html') : target), `${f} links to missing ${url}`);
    }
  }
  for (const [, url] of html.matchAll(/href="(\/[a-z-]+\/)"/g)) assert.ok(fs.existsSync(path.join(OUT, url, 'index.html')), url);
});

test('the archive lists only released days and never an answer', () => {
  const h = fs.readFileSync(path.join(OUT, 'archive', 'index.html'), 'utf8');
  const listed = [...h.matchAll(/id="no-(\d+)"/g)].map(m => Number(m[1]));
  const playable = calendar.read().filter(d => d.date <= THROUGH);
  assert.ok(listed.length >= playable.length - 1 && listed.length <= playable.length, `${listed.length} listed`);
  for (const word of ['perfect score is', 'placement', 'feed wins', 'protect wins']) assert.ok(!h.toLowerCase().includes(word), word);
});

test('the privacy policy covers ads and cookies', () => {
  const h = fs.readFileSync(path.join(OUT, 'privacy', 'index.html'), 'utf8');
  assert.match(h, /AdSense/);
  assert.match(h, /adssettings\.google\.com/);
  assert.match(h, /cookies/);
});
