// ===== Zooku puzzle generator (designer tool; never shipped to players) =====
// Used by scripts/generate.js and the local workshop (scripts/workshop.js).
// Builds daily puzzles from the themed casts, checks each one with the same engine the game uses,
// rates difficulty, and lays them out on a calendar. Deterministic: the same date + seed always
// gives the same puzzle, so a schedule can be rebuilt exactly from (date, seed).
// Works in Node (require) and in the browser (window.ZGEN, needs window.ZK first).
(function (root) {
  const E = typeof module !== 'undefined' && typeof require !== 'undefined' && !root.ZK ? require('./engine.js') : root.ZK;
  const { Prey, Pred, Hab } = E;

  // ---------- themes: the cast, what each animal may do, where the habitat can sit ----------
  // rules: pool of rule types each animal may get (one is picked per puzzle).
  // Only one animal per theme may have 'flat' in its pool (design check: at most one tile without a rule).
  const THEMES = {
    reef: { scene: 'reef', groups: { prey: 'Fish', preyOne: 'Fish', pred: 'Shark' },
      titles: ['Reef Patrol', 'Coral Garden', 'The Lagoon', 'Shallow Reef'],
      pred: { a: 'shark', reach: 'next' },
      prey: [{ a: 'damsel', dup: true, rules: ['school', 'herd'] }, { a: 'clown', rules: ['nearHab', 'school'] },
             { a: 'parrot', rules: ['corner', 'edge', 'nearHab'] }, { a: 'butterfly', rules: ['loner', 'corner'] }],
      habitat: { h: 'coral', where: 'grid' } },
    savanna: { scene: 'savanna', groups: { prey: 'Grazers', preyOne: 'Grazer', pred: 'Lion' },
      titles: ['Watering Hole', 'The Long Grass', 'Open Plains', 'Heat Haze'],
      pred: { a: 'lion', reach: 'next' },
      prey: [{ a: 'zebra', dup: true, rules: ['herd', 'school'] }, { a: 'gnu', rules: ['school', 'nearHab'] },
             { a: 'gazelle', rules: ['corner', 'loner'] }, { a: 'buffalo', rules: ['flat', 'loner'] }],
      habitat: { h: 'water', where: 'border', sides: ['left', 'right'] } },
    night: { scene: 'night', groups: { prey: 'Small Mammals', preyOne: 'Small Mammal', pred: 'Owl' },
      titles: ['Night Shift', 'Moonlit Field', 'After Dark', 'Owl Light'],
      pred: { a: 'owl', reach: 'around' },
      prey: [{ a: 'mouse', dup: true, rules: ['school', 'herd'] }, { a: 'vole', rules: ['nearHab', 'school'] },
             { a: 'shrew', rules: ['loner', 'edge'] }, { a: 'dormouse', rules: ['corner', 'loner'] }],
      habitat: { h: 'logs', where: 'grid' } },
    ice: { scene: 'ice', groups: { prey: 'Penguins', preyOne: 'Penguin', pred: 'Leopard Seal' },
      titles: ['Ice Edge', 'Pack Ice', 'Floe Line', 'Polar Shelf'],
      pred: { a: 'leopard', reach: 'next' },
      prey: [{ a: 'emperor', dup: true, rules: ['herd'] }, { a: 'adelie', rules: ['school', 'loner'] },
             { a: 'gentoo', rules: ['nearHab', 'edge'] }, { a: 'chinstrap', rules: ['edge', 'corner'] }],
      habitat: { h: 'floe', where: 'grid' } },
    pond: { scene: 'pond', groups: { prey: 'Amphibians', preyOne: 'Amphibian', pred: 'Heron' },
      titles: ['Lily Pond', 'Still Water', 'Reed Bed', 'Spawning Season'],
      pred: { a: 'heron', reach: 'around' },
      prey: [{ a: 'frog', dup: true, rules: ['school', 'herd'] }, { a: 'toad', rules: ['flat', 'loner'] },
             { a: 'newt', rules: ['nearHab'] }, { a: 'treefrog', rules: ['corner', 'edge'] }],
      habitat: { h: 'lily', where: 'grid' } },
    jungle: { scene: 'jungle', groups: { prey: 'Monkeys', preyOne: 'Monkey', pred: 'Harpy Eagle' },
      titles: ['High Canopy', 'Fig Season', 'Treetops', 'Rainforest Roof'],
      pred: { a: 'harpy', reach: 'next' },
      prey: [{ a: 'tamarin', dup: true, rules: ['school', 'herd'] }, { a: 'howler', rules: ['loner'] },
             { a: 'capuchin', rules: ['nearHab', 'school'] }, { a: 'spider', rules: ['center', 'corner', 'edge'] }],
      habitat: { h: 'fig', where: 'grid' } },
    outback: { scene: 'outback', groups: { prey: 'Marsupials', preyOne: 'Marsupial', pred: 'Dingo' },
      titles: ['Dry Season', 'Red Dust', 'The Billabong', 'Outback Dusk'],
      pred: { a: 'dingo', reach: 'next' },
      prey: [{ a: 'roo', dup: true, rules: ['herd'] }, { a: 'wallaby', rules: ['corner', 'edge'] },
             { a: 'wombat', rules: ['loner'] }, { a: 'bilby', rules: ['flat', 'center'] }],
      habitat: { h: 'billabong', where: 'border', sides: ['bottom', 'top'] } },
    meadow: { scene: 'meadow', groups: { prey: 'Songbirds', preyOne: 'Songbird', pred: 'Sparrowhawk' },
      titles: ['Hedgerow', 'Field Margin', 'Country Lane', 'Morning Chorus'],
      pred: { a: 'hawk', reach: 'around' },
      prey: [{ a: 'sparrow', dup: true, rules: ['school', 'herd'] }, { a: 'robin', rules: ['loner'] },
             { a: 'bluetit', rules: ['nearHab'] }, { a: 'wren', rules: ['corner', 'edge'] }],
      habitat: { h: 'hedge', where: 'border', sides: ['right', 'left'] } },
    desert: { scene: 'desert', groups: { prey: 'Lizards', preyOne: 'Lizard', pred: 'Roadrunner' },
      titles: ['Desert Noon', 'Sunbaked', 'Saguaro Shade', 'Dry Wash'],
      pred: { a: 'roadrunner', reach: 'next' },
      prey: [{ a: 'whiptail', dup: true, rules: ['school', 'herd'] }, { a: 'hornedlizard', rules: ['corner', 'loner'] },
             { a: 'chuckwalla', rules: ['nearHab', 'edge'] }, { a: 'collared', rules: ['flat', 'center', 'loner'] }],
      habitat: { h: 'saguaro', where: 'grid' } },
    tundra: { scene: 'tundra', groups: { prey: 'Burrowers', preyOne: 'Burrower', pred: 'Arctic Fox' },
      titles: ['Polar Night', 'Tundra', 'Snowfield', 'Northern Lights'],
      pred: { a: 'arcticfox', reach: 'next' },
      prey: [{ a: 'lemming', dup: true, rules: ['school', 'herd'] }, { a: 'arctichare', rules: ['loner', 'edge'] },
             { a: 'groundsquirrel', rules: ['nearHab', 'corner'] }, { a: 'tundravole', rules: ['flat', 'nearHab'] }],
      habitat: { h: 'snowdrift', where: 'grid' } },
    kelp: { scene: 'kelp', groups: { prey: 'Invertebrates', preyOne: 'Invertebrate', pred: 'Sea Otter' },
      titles: ['Kelp Forest', 'Otter Cove', 'Tide Line', 'Green Water'],
      pred: { a: 'otter', reach: 'next' },
      prey: [{ a: 'urchin', dup: true, rules: ['school', 'herd'] }, { a: 'crab', rules: ['corner', 'loner'] },
             { a: 'abalone', rules: ['nearHab', 'edge'] }, { a: 'mussel', rules: ['flat', 'school'] }],
      habitat: { h: 'kelp', where: 'grid' } },
    mountain: { scene: 'mountain', groups: { prey: 'Wild Goats', preyOne: 'Wild Goat', pred: 'Snow Leopard' },
      titles: ['High Pass', 'Snowline', 'Cliff Face', 'Roof of the World'],
      pred: { a: 'snowleopard', reach: 'next' },
      prey: [{ a: 'bharal', dup: true, rules: ['herd', 'school'] }, { a: 'tahr', rules: ['edge', 'loner'] },
             { a: 'markhor', rules: ['nearHab', 'corner'] }, { a: 'ibex', rules: ['corner', 'center'] }],
      habitat: { h: 'alpine', where: 'grid' } },
    swamp: { scene: 'swamp', groups: { prey: 'Waterbirds', preyOne: 'Waterbird', pred: 'Alligator' },
      titles: ['Everglades', 'Gator Hole', 'Cypress Swamp', 'River of Grass'],
      pred: { a: 'gator', reach: 'next' },
      prey: [{ a: 'ibis', dup: true, rules: ['school', 'herd'] }, { a: 'spoonbill', rules: ['nearHab', 'loner'] },
             { a: 'egret', rules: ['edge', 'loner'] }, { a: 'woodduck', rules: ['flat', 'corner'] }],
      habitat: { h: 'sawgrass', where: 'border', sides: ['left', 'right'] } },
    porch: { scene: 'porch', groups: { prey: 'Moths', preyOne: 'Moth', pred: 'Bat' },
      titles: ['Porch Light', 'Summer Night', 'Moth Hour', 'Dusk Flight'],
      pred: { a: 'bat', reach: 'around' },
      prey: [{ a: 'luna', dup: true, rules: ['school', 'herd'] }, { a: 'rosymaple', rules: ['nearHab', 'corner'] },
             { a: 'polyphemus', rules: ['loner', 'edge'] }, { a: 'tigermoth', rules: ['nearHab', 'center'] }],
      habitat: { h: 'porchlight', where: 'grid' } },
    india: { scene: 'india', groups: { prey: 'Deer', preyOne: 'Deer', pred: 'Tiger' },
      titles: ['Tiger Country', 'Sal Forest', 'Bamboo Shade', 'Jungle Dawn'],
      pred: { a: 'tiger', reach: 'next' },
      prey: [{ a: 'chital', dup: true, rules: ['herd', 'school'] }, { a: 'sambar', rules: ['flat', 'loner'] },
             { a: 'barasingha', rules: ['nearHab', 'edge'] }, { a: 'muntjac', rules: ['corner', 'loner'] }],
      habitat: { h: 'bamboo', where: 'grid' } },
    river: { scene: 'river', groups: { prey: 'Salmon', preyOne: 'Salmon', pred: 'Grizzly' },
      titles: ['Salmon Run', 'The Falls', 'Upstream', 'Spawning Run'],
      pred: { a: 'grizzly', reach: 'next' },
      prey: [{ a: 'sockeye', dup: true, rules: ['school', 'herd'] }, { a: 'chinook', rules: ['nearHab', 'edge'] },
             { a: 'coho', rules: ['corner', 'loner'] }, { a: 'pink', rules: ['flat', 'center'] }],
      habitat: { h: 'waterfall', where: 'border', sides: ['top'] } },
  };
  const THEME_KEYS = Object.keys(THEMES);

  // ---------- seeded random numbers ----------
  function hashStr(s) { let h = 1779033703 ^ s.length; for (let i = 0; i < s.length; i++) { h = Math.imul(h ^ s.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); } return h >>> 0; }
  function rng(seedStr) {
    let a = hashStr(seedStr);
    const next = () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    const R = (lo, hi) => lo + Math.floor(next() * (hi - lo + 1));
    const pick = arr => arr[Math.floor(next() * arr.length)];
    const shuffle = arr => { const a2 = arr.slice(); for (let i = a2.length - 1; i > 0; i--) { const j = Math.floor(next() * (i + 1)); [a2[i], a2[j]] = [a2[j], a2[i]]; } return a2; };
    return { next, R, pick, shuffle };
  }

  // ---------- one candidate ----------
  const rc = i => [Math.floor(i / 3), i % 3];
  function ruleFor(type, r) {
    switch (type) {
      case 'school': return { t: 'school', n: r.R(1, 3) };
      case 'herd': return { t: 'herd', n: r.R(2, 5) };
      case 'loner': return { t: 'loner', n: r.R(3, 7) };
      case 'nearHab': return { t: 'nearHab', n: r.R(2, 5) };
      case 'corner': case 'edge': case 'center': return { t: 'position', n: r.R(2, 5), where: type };
      default: return { t: 'flat' };
    }
  }
  function candidate(themeKey, r) {
    const T = THEMES[themeKey];
    const cells = r.shuffle([...Array(9).keys()]);
    let fixed = [], border = [];
    const eff = r.pick([{ t: 'mult', v: 2 }, { t: 'mult', v: 2 }, { t: 'add', v: r.R(3, 6) }]);
    eff.role = r.pick(['any', 'any', 'prey', 'pred']);
    if (T.habitat.where === 'grid') {
      fixed = [{ tile: Hab(T.habitat.h, eff, r.pick(['around', 'next'])), at: rc(cells.pop()) }];
    } else {
      const span = r.pick([[0, 2], [0, 2], [0, 1], [1, 2]]);
      border = [{ tile: Hab(T.habitat.h, eff, 'next'), side: r.pick(T.habitat.sides), from: span[0], to: span[1] }];
    }
    const rocks = cells.slice(0, r.pick([1, 2])).map(rc);
    const pr = T.pred.reach === 'around' ? [2, 6] : [3, 10];
    const hand = [Pred(T.pred.a, r.R(1, 4), r.R(pr[0], pr[1]), T.pred.reach)];
    T.prey.forEach(sp => {
      const type = r.pick(sp.rules);
      const base = type === 'flat' ? r.R(6, 10) : r.R(3, 8);
      const rule = ruleFor(type, r);
      hand.push(Prey(sp.a, base, rule));
      if (sp.dup) hand.push(Prey(sp.a, base, JSON.parse(JSON.stringify(rule))));
    });
    return { theme: themeKey, scene: T.scene, groups: T.groups, rocks, fixed, border, hand };
  }

  // ---------- checks beyond the engine's design checks ----------
  // Every rule must be reachable on this board, and the habitat must change the best score.
  function viable(p) {
    const open = E.openCells(p);
    const isCorner = i => [0, 2, 6, 8].includes(i), isCenter = i => i === 4;
    for (const t of p.hand) {
      const rule = t.rule;
      if (rule.t === 'position') {
        const ok = open.some(i => rule.where === 'corner' ? isCorner(i) : rule.where === 'center' ? isCenter(i) : (!isCorner(i) && !isCenter(i)));
        if (!ok) return 'position bonus impossible';
      }
      if (rule.t === 'nearHab') {
        const habCells = (p.fixed || []).map(f => f.at).concat(...(p.border || []).map(b => E.borderCells(b)));
        const ok = open.some(i => { const [r, c] = rc(i); return habCells.some(([hr, hc]) => Math.abs(hr - r) + Math.abs(hc - c) === 1); });
        if (!ok) return 'habitat bonus impossible';
      }
    }
    return null;
  }
  function habitatMatters(p, perfect) {
    const q = JSON.parse(JSON.stringify(p));
    (q.fixed || []).forEach(f => { f.tile.eff = { ...f.tile.eff, t: 'add', v: 0 }; });
    (q.border || []).forEach(b => { b.tile.eff = { ...b.tile.eff, t: 'add', v: 0 }; });
    return E.solve(q).best < perfect;
  }
  // Difficulty: how many layouts would earn an A (within 10% of perfect). Fewer = harder.
  const TIERS = [{ name: 'Easy', min: 0.04 }, { name: 'Medium', min: 0.015 }, { name: 'Hard', min: 0 }];
  function analyze(p, perfect) {
    let total = 0, nearA = 0;
    E.eachLayout(p, pl => { total++; if (E.score(p, pl).total >= 0.9 * perfect) nearA++; });
    const share = nearA / total;
    return { share, tier: TIERS.find(t => share >= t.min).name };
  }

  // ---------- make the puzzle for one day ----------
  // want: { winner: 'feed'|'protect'|null, tier: 'Easy'|'Medium'|'Hard'|null }. Collects a few passing
  // candidates and keeps the one that best matches (winner first, then tier, then a close race).
  function makeDay({ date, no, theme, seed = 0, want = {}, avoid = new Set(), avoidTitles = new Set(), pool = 8, maxTries = 800 }) {
    const r = rng(`${date}|${theme}|${seed}`);
    const passing = [];
    let tries = 0;
    while (tries < maxTries && passing.length < pool) {
      tries++;
      const p = candidate(theme, r);
      if (viable(p)) continue;
      const c = E.checkPuzzle(p);
      if (!c.ok) continue;
      if (!habitatMatters(p, c.perfect)) continue;
      const sig = signature(p);
      if (avoid.has(sig)) continue;
      const d = analyze(p, c.perfect);
      const ratio = Math.min(c.protect, c.feed) / c.perfect;
      const cost = (want.winner && c.winner !== want.winner ? 10 : 0) + (want.tier && d.tier !== want.tier ? 3 : 0) + Math.abs(ratio - 0.93) * 10;
      passing.push({ p, c, d, cost, sig });
    }
    if (!passing.length) return null;
    passing.sort((a, b) => a.cost - b.cost);
    const best = passing[0];
    const T = THEMES[theme];
    const fresh = T.titles.filter(t => !avoidTitles.has(t));
    const puzzle = Object.assign({ no, date, title: r.pick(fresh.length ? fresh : T.titles) }, best.p);
    puzzle.meta = { seed, perfect: best.c.perfect, protect: best.c.protect, feed: best.c.feed, winner: best.c.winner,
                    perfectLayouts: best.c.perfectCount, layouts: best.c.layouts, eatenAtBest: best.c.eatenAtBest,
                    difficulty: best.d.tier, nearA: +(best.d.share * 100).toFixed(2), tries,
                    want: { winner: want.winner || null, tier: want.tier || null }, placement: E.solve(puzzle).placement };
    return puzzle;
  }
  function signature(p) { return JSON.stringify([p.theme, p.rocks, p.fixed, p.border, p.hand]); }

  // ---------- the calendar ----------
  const DAY_TIER = ['Hard', 'Easy', 'Easy', 'Medium', 'Medium', 'Medium', 'Hard'];   // Sun..Sat: easier early week, harder weekend
  const addDays = (iso, n) => { const d = new Date(iso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
  const weekday = iso => new Date(iso + 'T12:00:00Z').getUTCDay();
  // Theme order. Each theme (and so each animal and habitat, which belong to one theme) appears at most
  // MONTHLY_CAP times per calendar month, and never within MIN_GAP days of its last use if that can be avoided.
  // Among the allowed themes, the one used longest ago goes next (ties broken by the seeded shuffle).
  const MONTHLY_CAP = 2, MIN_GAP = 7;
  function themeOrder(startDate, days, previous = []) {
    const r = rng('themes|' + startDate);
    const used = previous.filter(p => p.theme).map(p => ({ date: p.date, theme: p.theme }));
    const out = [];
    for (let i = 0; i < days; i++) {
      const date = addDays(startDate, i), month = date.slice(0, 7), all = used.concat(out);
      const inMonth = t => all.filter(u => u.theme === t && u.date.slice(0, 7) === month).length;
      const since = t => { const d = all.filter(u => u.theme === t).map(u => u.date).sort().pop(); return d ? (new Date(date) - new Date(d)) / 864e5 : Infinity; };
      let pool = THEME_KEYS.filter(t => inMonth(t) < MONTHLY_CAP);
      const spaced = pool.filter(t => since(t) >= MIN_GAP);
      if (spaced.length) pool = spaced;
      const theme = r.shuffle(pool).sort((a, b) => since(b) - since(a))[0];
      out.push({ date, theme });
    }
    return out.map(o => o.theme);
  }
  function buildSchedule({ startDate, days, startNo, previous = [], onDay = null }) {
    const themes = themeOrder(startDate, days, previous);
    const avoid = new Set(previous.map(signature));
    const out = [];
    for (let i = 0; i < days; i++) {
      const date = addDays(startDate, i);
      // keep feed and protect days balanced: ask for whichever the last 6 days had less of
      const recent = out.slice(-6).map(p => p.meta.winner);
      const feeds = recent.filter(w => w === 'feed').length, protects = recent.length - feeds;
      const want = { winner: feeds > protects ? 'protect' : protects > feeds ? 'feed' : (i % 2 ? 'protect' : 'feed'), tier: DAY_TIER[weekday(date)] };
      let p = null, seed = 0;
      const avoidTitles = new Set(previous.concat(out).slice(-16).map(q => q.title));   // no repeated title within ~2 weeks
      while (!p && seed < 5) { p = makeDay({ date, no: startNo + i, theme: themes[i], seed, want, avoid, avoidTitles }); if (!p) seed++; }
      if (!p) throw new Error('Could not make a puzzle for ' + date);
      avoid.add(signature(p)); out.push(p);
      if (onDay) onDay(p, i);
    }
    return out;
  }

  const ZGEN = { THEMES, THEME_KEYS, TIERS, DAY_TIER, MONTHLY_CAP, MIN_GAP, themeOrder, rng, candidate, viable, analyze, makeDay, buildSchedule, signature, addDays, weekday };
  if (typeof module !== 'undefined') module.exports = ZGEN;
  if (typeof window !== 'undefined') window.ZGEN = ZGEN;
})(typeof window !== 'undefined' ? window : globalThis);
