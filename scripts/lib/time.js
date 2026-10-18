// New York time helpers. A new Zooku day starts at midnight Eastern.
const TZ = 'America/New_York';

function parts(d = new Date()) {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
  });
  return Object.fromEntries(fmt.formatToParts(d).map(p => [p.type, p.value]));
}
/** Today's date in New York as YYYY-MM-DD. */
const etDate = (d = new Date()) => { const p = parts(d); return `${p.year}-${p.month}-${p.day}`; };
/** The hour (0-23) in New York. */
const etHour = (d = new Date()) => Number(parts(d).hour) % 24;
/** Add whole days to a YYYY-MM-DD date. */
function addDays(iso, n) {
  const d = new Date(iso + 'T12:00:00Z');
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

module.exports = { TZ, etDate, etHour, addDays };
