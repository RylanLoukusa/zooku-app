#!/usr/bin/env node
// Adds new days to the end of data/calendar.json.   npm run generate -- 30
// Each new day is built by the generator and passes the same design checks as every other day.
// New days start unapproved; review them with "npm run workshop".
const G = require('../src/shared/generator.js');
const calendar = require('./lib/calendar');
const { addDays } = require('./lib/time');

const count = Number(process.argv[2] || 30);
if (!Number.isInteger(count) || count < 1 || count > 120) { console.error('Usage: npm run generate -- <days, 1-120>'); process.exit(1); }

const days = calendar.read();
const last = days[days.length - 1];
const start = addDays(last.date, 1);
const t0 = Date.now();
console.log(`Generating ${count} days from ${start}…`);
const fresh = G.buildSchedule({
  startDate: start, days: count, startNo: last.no + 1, previous: days,
  onDay: p => console.log(`  ${p.date}  #${p.no}  ${p.title.padEnd(16)} ${p.meta.difficulty.padEnd(6)} ${p.meta.winner === 'feed' ? 'feed wins   ' : 'protect wins'}  perfect ${p.meta.perfect}`),
});
fresh.forEach(p => { delete p.meta.tries; p.review = null; });
calendar.write(days.concat(fresh));
console.log(`Added ${fresh.length} days (${fresh[0].date} → ${fresh[fresh.length - 1].date}) in ${((Date.now() - t0) / 1000).toFixed(0)}s. Review them with "npm run workshop".`);
