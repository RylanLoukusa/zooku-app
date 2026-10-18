#!/usr/bin/env node
// How far ahead the calendar is approved.   npm run runway   (--json for machines, --min N to fail below N days)
const calendar = require('./lib/calendar');
const { etDate, addDays } = require('./lib/time');

const today = etDate();
const days = calendar.read();
const ahead = days.filter(d => d.date > today);
let approvedAhead = 0;                       // consecutive approved days starting tomorrow
for (let date = addDays(today, 1); ; date = addDays(date, 1)) {
  const d = days.find(x => x.date === date);
  if (!d || !(d.review && d.review.approved)) break;
  approvedAhead++;
}
const result = {
  today,
  scheduledAhead: ahead.length,
  lastScheduled: days.length ? days[days.length - 1].date : null,
  approvedAhead,
  approvedThrough: approvedAhead ? addDays(today, approvedAhead) : today,
};

const args = process.argv.slice(2);
if (args.includes('--json')) console.log(JSON.stringify(result));
else console.log(`Today ${today}: ${result.scheduledAhead} days scheduled ahead (through ${result.lastScheduled}); approved through ${result.approvedThrough} (${approvedAhead} days).`);
const min = args.includes('--min') ? Number(args[args.indexOf('--min') + 1]) : null;
if (min != null && approvedAhead < min) process.exit(2);
