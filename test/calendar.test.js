// Every day in data/calendar.json must be a good, playable puzzle.
const test = require('node:test');
const assert = require('node:assert/strict');
globalThis.window = globalThis;            // art.js attaches itself to window
const E = require('../src/shared/engine.js');
require('../src/shared/art.js');
const calendar = require('../scripts/lib/calendar');
const { addDays } = require('../scripts/lib/time');

const days = calendar.read();

test('days are numbered in order with no gaps in the dates', () => {
  days.forEach((d, i) => {
    if (i === 0) return;
    assert.equal(d.no, days[i - 1].no + 1, `#${d.no} follows #${days[i - 1].no}`);
    assert.equal(d.date, addDays(days[i - 1].date, 1), `${d.date} follows ${days[i - 1].date}`);
  });
});

test('every day passes the design checks and its stored answer is right', () => {
  for (const d of days) {
    const c = E.checkPuzzle(d);
    assert.ok(c.ok, `#${d.no} ${d.date}: ${c.problems.join('; ')}`);
    assert.equal(c.perfect, d.meta.perfect, `#${d.no}: perfect score`);
    assert.equal(E.score(d, d.meta.placement).total, d.meta.perfect, `#${d.no}: stored perfect layout`);
    assert.equal(d.meta.winner, c.winner, `#${d.no}: winning plan`);
  }
});

test('every animal, habitat and scene has art, a fact and (for animals) a Latin name', () => {
  for (const d of days) {
    assert.ok(window.ZART.SCENES[d.scene], `#${d.no}: scene ${d.scene}`);
    for (const t of d.hand) {
      const a = E.ANIMALS[t.a];
      assert.ok(a && a.fact && a.latin && a.home && a.diet, `#${d.no}: animal ${t.a}`);
      assert.ok(window.ZART.ART[t.a], `art for ${t.a}`);
    }
    for (const h of d.fixed.map(f => f.tile).concat(d.border.map(b => b.tile))) {
      assert.ok(E.HABITATS[h.h] && E.HABITATS[h.h].fact, `#${d.no}: habitat ${h.h}`);
      assert.ok(window.ZART.ART[h.h], `art for ${h.h}`);
    }
  }
});

test('no two days are the same puzzle', () => {
  const seen = new Set();
  for (const d of days) {
    const sig = JSON.stringify([d.rocks, d.fixed, d.border, d.hand]);
    assert.ok(!seen.has(sig), `#${d.no} repeats an earlier day`);
    seen.add(sig);
  }
});

test('no theme, animal or habitat appears on more than two days in a calendar month', () => {
  const count = {};
  for (const d of days) {
    const month = d.date.slice(0, 7);
    const things = new Set([`theme ${d.theme}`, ...d.hand.map(t => `animal ${t.a}`),
      ...d.fixed.map(f => `habitat ${f.tile.h}`), ...d.border.map(b => `habitat ${b.tile.h}`)]);
    for (const t of things) count[`${month} ${t}`] = (count[`${month} ${t}`] || 0) + 1;
  }
  assert.deepEqual(Object.entries(count).filter(([, n]) => n > 2), []);
});
