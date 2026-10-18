#!/usr/bin/env node
// Builds the public website into dist/.
//
// Only days players may see are shipped: every day up to today in New York, plus tomorrow once it is
// 8pm there. The nightly job (.github/workflows/nightly-publish.yml) builds between about 8:30 and 11pm ET,
// so tomorrow is already online at midnight, and the game itself keeps it hidden until then.
// Future days never sit on the site, and answers / generator notes never leave this repo.
//
//   RELEASE_THROUGH=YYYY-MM-DD   ship days up to this date instead (testing)
//   OUT_DIR=path                 write somewhere other than dist/
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { etDate, etHour, addDays } = require('./lib/time');
const calendar = require('./lib/calendar');

const ROOT = path.join(__dirname, '..');
const OUT = process.env.OUT_DIR ? path.resolve(process.env.OUT_DIR) : path.join(ROOT, 'dist');
const read = rel => fs.readFileSync(path.join(ROOT, rel), 'utf8');

const today = etDate();
const through = process.env.RELEASE_THROUGH || (etHour() >= 20 ? addDays(today, 1) : today);
const all = calendar.read();
const released = all.filter(d => d.date <= through).map(calendar.publicDay);
if (!released.length) throw new Error(`No days on or before ${through} in data/calendar.json`);

// ---- dist/: public files, then content-hashed assets, then the page ----
fs.rmSync(OUT, { recursive: true, force: true });
fs.cpSync(path.join(ROOT, 'public'), OUT, { recursive: true });
fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });

const assets = {
  'styles.css': read('src/game/styles.css'),
  'days.js': `// Zooku days released through ${through}. Each one opens at midnight in New York.\nwindow.ZOOKU_DAYS = ${JSON.stringify(released)};\n`,
  'engine.js': read('src/shared/engine.js'),
  'art.js': read('src/shared/art.js'),
  'app.js': read('src/game/app.js'),
};
const urls = {};
for (const [name, content] of Object.entries(assets)) {
  const hash = crypto.createHash('sha256').update(content).digest('hex').slice(0, 10);
  const file = name.replace(/\.(\w+)$/, `.${hash}.$1`);
  fs.writeFileSync(path.join(OUT, 'assets', file), content);
  urls[name] = `/assets/${file}`;
}
const html = read('src/game/index.html').replace(/\{\{([\w.]+)\}\}/g, (_, key) => {
  if (!urls[key]) throw new Error(`index.html asks for unknown asset {{${key}}}`);
  return urls[key];
});
fs.writeFileSync(path.join(OUT, 'index.html'), html);

// ---- report ----
const last = released[released.length - 1];
console.log(`Built ${path.relative(ROOT, OUT) || OUT}/ with ${released.length} days through ${through} (latest: #${last.no} ${last.title}).`);
if (!all.some(d => d.date === today)) console.warn(`! No puzzle for today (${today}) in data/calendar.json. Run "npm run generate".`);
const upcoming = all.filter(d => d.date > today && d.date <= addDays(today, 7));
const unreviewed = upcoming.filter(d => !(d.review && d.review.approved));
if (upcoming.length < 7) console.warn(`! Only ${upcoming.length} days scheduled after today. Run "npm run generate".`);
if (unreviewed.length) console.warn(`! ${unreviewed.length} of the next 7 days are not approved yet (they will still go out). Run "npm run workshop".`);
