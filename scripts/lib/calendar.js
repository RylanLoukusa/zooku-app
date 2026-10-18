// Read and write data/calendar.json: every Zooku day, past and upcoming, one day per line (tidy git diffs).
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', '..', 'data', 'calendar.json');

function read() {
  const days = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  return days.sort((a, b) => a.date.localeCompare(b.date));
}

// Keep the fields in a fixed order so a day always serialises the same way.
const FIELDS = ['no', 'date', 'title', 'theme', 'scene', 'groups', 'rocks', 'fixed', 'border', 'hand', 'meta', 'review', 'previous'];
function tidy(day) {
  const out = {};
  FIELDS.forEach(k => { if (day[k] !== undefined) out[k] = day[k]; });
  return out;
}

function write(days) {
  const text = '[\n' + days.map(d => '  ' + JSON.stringify(tidy(d))).join(',\n') + '\n]\n';
  const tmp = FILE + '.tmp';
  fs.writeFileSync(tmp, text);
  fs.renameSync(tmp, FILE);   // never leave a half-written calendar behind
}

/** The part of a day players receive: no answers, no generator notes, no review state. */
function publicDay({ no, date, title, scene, groups, rocks, fixed, border, hand }) {
  return { no, date, title, scene, groups, rocks, fixed, border, hand };
}

module.exports = { FILE, read, write, publicDay };
