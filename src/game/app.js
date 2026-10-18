(() => {
  const { score, solve, gradeFor, info, borderCells, ANIMALS, DIRS, predatorsOf, groupName } = window.ZK;
  const ruleText = (tile, p = P()) => window.ZK.ruleText(tile, p);
  const $ = id => document.getElementById(id);
  const STORE_KEY = 'zooku.v1';      // progress lives only in this browser
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const LADDER = ['F', 'D', 'C', 'B', 'A', 'A+'];
  // Feedback goes to a Google Form. Keep ROADMAP in step with the form's "What should we add next?" options.
  const FEEDBACK_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeaWkHnXs8UWl2i9hyFYQnC6I3WUkqDDogej07Z76vQnIA-qQ/viewform';
  const ROADMAP = [
    { t: 'A harder daily twin', d: 'A tougher second version of each day’s puzzle.' },
    { t: 'Flipped days', d: 'Your hand has several predators and just one prey.' },
    { t: 'Bigger boards', d: '4×4 and odd-shaped boards, beyond today’s 3×3.' },
    { t: 'Unlimited puzzles', d: 'Keep playing new puzzles, not just the daily one.' },
  ];
  const MARGIN = 0.55; // border track = 55% of a square

  // ---------- days: the build ships days up to today; each one opens at midnight in New York ----------
  const ET = 'America/New_York';
  const etParts = d => Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: ET, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).formatToParts(d).map(x => [x.type, x.value]));
  const etOffsetMin = d => { const p = etParts(d); return Math.round((Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour % 24, +p.minute, +p.second) - Math.floor(d.getTime() / 1000) * 1000) / 60000); };
  const etDate = (d = new Date()) => { const p = etParts(d); return `${p.year}-${p.month}-${p.day}`; };
  const PUZZLES = (window.ZOOKU_DAYS || []).filter(p => p.date <= etDate()).sort((a, b) => a.no - b.no);

  let store = { seenHowTo: false, p: {} };
  let cur = PUZZLES.length - 1;     // today = last puzzle
  let sel = null;                   // picked up: {from:'hand', idx} | {from:'cell', cell}
  let hover = null;                 // under the mouse: {from:'hand'|'cell'|'border', ...}
  let drag = null;                  // tile being dragged: {from, idx|cell, el, x0, y0, started, over, ghost}
  let suppressClick = false;        // swallow the click that follows a drag
  const perfectCache = {};

  // ---------- storage (best effort) ----------
  function load() { try { const s = JSON.parse(localStorage.getItem(STORE_KEY) || 'null'); if (s && s.p) store = s; } catch (e) {} }
  function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) {} }

  const P = () => PUZZLES[cur];
  function S() {
    const no = P().no;
    if (!store.p[no]) store.p[no] = { pl: Array(9).fill(null), best: null, survey: null };   // survey = the day's one submitted board
    return store.p[no];
  }
  const isRock = (p, cell) => p.rocks.some(([r, c]) => r * 3 + c === cell);
  const fixedAt = (p, cell) => (p.fixed || []).findIndex(f => f.at[0] * 3 + f.at[1] === cell);
  const placedCount = pl => pl.filter(i => i != null).length;
  const isComplete = (p, pl) => placedCount(pl) === p.hand.length;
  const samePl = (a, b) => a && b && a.every((v, i) => v === b[i]);
  const perfectFor = p => perfectCache[p.no] || (perfectCache[p.no] = solve(p));
  function fmtDate(iso) {
    const [y, m, d] = iso.split('-').map(Number);
    return DAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()] + ', ' + MONTHS[m - 1] + ' ' + d;
  }
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  const sameKey = (a, b) => (!a && !b) || (a && b && a.from === b.from && a.idx === b.idx && a.cell === b.cell && a.bi === b.bi && a.fi === b.fi);

  // ---------- pieces ----------
  const famClass = tile => tile.kind === 'habitat' ? 'k-habitat' : 'k-' + tile.role;
  const famName = (tile, p = P()) => tile.kind === 'habitat' ? 'Habitat' : groupName(p, tile.role, true);
  // reach grids: ink = the tile itself, blue = squares it affects, sand = squares it doesn't
  const REACH_ON = '#3b6e91', REACH_SELF = '#2f3a2c', REACH_OFF = '#d8ccb2';
  function reachSvg(reach, cls = 'rch') {
    let s = `<svg class="${cls}" viewBox="0 0 11 11" aria-hidden="true">`;
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
      const center = r === 1 && c === 1;
      const on = !center && (reach === 'around' || r === 1 || c === 1);
      s += `<rect x="${c * 4}" y="${r * 4}" width="3" height="3" rx="0.6" fill="${center ? REACH_SELF : on ? REACH_ON : REACH_OFF}"/>`;
    }
    return s + '</svg>';
  }
  // a border piece's true footprint: the whole board, the piece drawn along its side, and the squares it really reaches
  function borderReachSvg(p, bi) {
    const b = p.border[bi], cells = borderCells(b), hit = new Set(borderReach(p, bi));
    const rows = [0, 2, ...cells.map(x => x[0])], cols = [0, 2, ...cells.map(x => x[1])];
    const r0 = Math.min(...rows), c0 = Math.min(...cols), nr = Math.max(...rows) - r0 + 1, nc = Math.max(...cols) - c0 + 1;
    const W = nc * 4 - 1, H = nr * 4 - 1;
    let s = `<svg viewBox="0 0 ${W} ${H}" style="width:${Math.round(32 * W / 11)}px;height:${Math.round(32 * H / 11)}px" aria-hidden="true">`;
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++)
      s += `<rect x="${(c - c0) * 4}" y="${(r - r0) * 4}" width="3" height="3" rx="0.6" fill="${hit.has(r * 3 + c) ? REACH_ON : REACH_OFF}"/>`;
    const pr = cells.map(x => x[0]), pc = cells.map(x => x[1]);
    const x = (Math.min(...pc) - c0) * 4, y = (Math.min(...pr) - r0) * 4;
    s += `<rect x="${x}" y="${y}" width="${(Math.max(...pc) - Math.min(...pc)) * 4 + 3}" height="${(Math.max(...pr) - Math.min(...pr)) * 4 + 3}" rx="1" fill="${REACH_SELF}"/>`;
    return s + '</svg>';
  }
  const latinShort = l => (!l || l.length <= 15 || l.indexOf(' ') < 0) ? (l || '') : l.charAt(0) + '. ' + l.slice(l.indexOf(' ') + 1);
  const roman = n => { let out = ''; [[100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']].forEach(([v, r]) => { while (n >= v) { out += r; n -= v; } }); return out; };
  function tileFace(tile, opts = {}) {
    const f = info(tile);
    const pts = opts.pts != null ? `<span class="pts">${opts.pts}</span>` : '';
    const extra = (opts.sel ? ' sel' : '') + (opts.fixed ? ' fixed' : '') + (opts.vert ? ' vert' : '') + (opts.eaten ? ' eaten' : '');
    const tag = opts.eaten ? '<span class="eaten-tag">Eaten</span>' : '';
    const hab = tile.kind === 'habitat';
    const cls = hab ? ({ water: 'water', billabong: 'water', waterfall: 'water', hedge: 'hedge', sawgrass: 'grass' }[tile.h] || 'hab') : famClass(tile);
    const badge = hab && tile.eff ? `<span class="hab-tag">${tile.eff.t === 'mult' ? '×' + tile.eff.v : '+' + tile.eff.v}</span>` : '';
    const lat = !hab && f.latin ? `<span class="lat">${esc(latinShort(f.latin))}</span>` : '';
    const art = (window.ZART.ART[hab ? tile.h : tile.a] || '');
    return `<span class="tile ${cls}${extra}">${pts}${tag}${badge}<svg class="art" viewBox="0 0 64 64" aria-hidden="true">${art}</svg><span class="nm${f.short.replace(/ .*/, '').length > 10 || f.short.length > 13 ? ' long' : ''}">${esc(f.short)}</span>${lat}</span>`;
  }
  const rockSvg = `<svg viewBox="0 0 64 64" aria-hidden="true">${window.ZART.ART.rock}</svg>`;

  // squares a tile would reach from a cell
  function reachFrom(tile, cell) {
    const r = Math.floor(cell / 3), c = cell % 3;
    return DIRS[tile.reach].map(([dr, dc]) => [r + dr, c + dc]).filter(([a, b]) => a >= 0 && a < 3 && b >= 0 && b < 3).map(([a, b]) => a * 3 + b);
  }
  function borderReach(p, bi) {
    const b = p.border[bi]; const out = new Set();
    borderCells(b).forEach(([r, c]) => DIRS[b.tile.reach].forEach(([dr, dc]) => {
      const a = r + dr, d = c + dc; if (a >= 0 && a < 3 && d >= 0 && d < 3) out.add(a * 3 + d);
    }));
    return [...out];
  }

  // ---------- board ----------
  function boardLayout(p) {
    const sides = new Set(p.border.map(b => b.side));
    const L = sides.has('left'), R = sides.has('right'), T = sides.has('top'), B = sides.has('bottom');
    return {
      cols: `${L ? MARGIN + 'fr ' : ''}repeat(3, minmax(0, 1fr))${R ? ' ' + MARGIN + 'fr' : ''}`,
      rows: `${T ? 'auto ' : ''}auto auto auto${B ? ' auto' : ''}`,
      co: L ? 1 : 0, ro: T ? 1 : 0,
    };
  }
  function boardHtml(p, pl, opts = {}) {
    const { mini = false, pts = null, items = null } = opts;
    const lay = boardLayout(p);
    let h = '';
    p.border.forEach((b, bi) => {
      let col, row, aspect = '';
      const span = b.to - b.from + 1;
      if (b.side === 'left' || b.side === 'right') {
        col = b.side === 'left' ? 1 : 4 + lay.co;
        row = `${b.from + 1 + lay.ro} / ${b.to + 2 + lay.ro}`;
      } else {
        row = b.side === 'top' ? 1 : 4 + lay.ro;
        col = `${b.from + 1 + lay.co} / ${b.to + 2 + lay.co}`;
        aspect = `aspect-ratio:${(span / MARGIN).toFixed(2)};`;
      }
      const side = b.side === 'left' || b.side === 'right';
      const label = `${info(b.tile).name}, fixed border piece`;
      const inner = tileFace(b.tile, { fixed: true, vert: side && span > 1 });
      const horiz = !side ? ' horiz' : '';
      h += mini ? `<div class="border-piece${horiz}" style="grid-column:${col};grid-row:${row};${aspect}">${inner}</div>`
                : `<button class="border-piece${horiz}" style="grid-column:${col};grid-row:${row};${aspect}" data-border="${bi}" aria-label="${esc(label)}">${inner}</button>`;
    });
    for (let cell = 0; cell < 9; cell++) {
      const r = Math.floor(cell / 3), c = cell % 3;
      const style = `grid-column:${c + 1 + lay.co};grid-row:${r + 1 + lay.ro}`;
      if (isRock(p, cell)) { h += `<div class="cell rock" style="${style}" data-rock="${cell}" aria-label="Rock">${rockSvg}</div>`; continue; }
      const fi = fixedAt(p, cell);
      if (fi >= 0) {
        const ft = p.fixed[fi].tile, inner = tileFace(ft, { fixed: true });
        h += mini ? `<div class="cell fixedcell" style="${style}">${inner}</div>`
                  : `<button class="cell fixedcell" style="${style}" data-fixed="${fi}" data-at="${cell}" aria-label="${esc(info(ft).name)}, fixed piece">${inner}</button>`;
        continue;
      }
      const idx = pl[cell];
      let inner, label;
      if (idx != null) {
        const it = pts && pts.find(x => x.cell === cell);
        const live = (pts || items || []).find(x => x.cell === cell);
        const eaten = !!(live && live.eaten);
        inner = tileFace(p.hand[idx], { pts: it ? it.score : null, eaten });
        label = `Row ${r + 1}, column ${c + 1}: ${info(p.hand[idx]).name}${eaten ? ', eaten' : ''}`;
      } else { inner = ''; label = `Row ${r + 1}, column ${c + 1}: empty`; }
      h += mini ? `<div class="cell" style="${style}">${inner}</div>`
                : `<button class="cell" style="${style}" data-cell="${cell}" aria-label="${esc(label)}">${inner}</button>`;
    }
    return { html: h, lay };
  }
  function mountBoard(el, p, pl, opts) {
    const { html, lay } = boardHtml(p, pl, opts);
    el.style.gridTemplateColumns = lay.cols;
    el.style.gridTemplateRows = lay.rows;
    el.innerHTML = html;
  }

  // ---------- render ----------
  let lastScore = null;
  function render() {
    const p = P(), st = S();
    // drop stale hover / selection
    if (hover && hover.from === 'hand' && st.pl.includes(hover.idx)) hover = null;
    if (sel && sel.from === 'cell' && st.pl[sel.cell] == null) sel = null;

    const sc = score(p, st.pl);
    if (document.body.dataset.scene !== p.scene) {
      document.body.dataset.scene = p.scene;
      $('sceneSvg').innerHTML = (window.ZART.SCENES[p.scene] || '');
    }
    const [, mm, dd] = p.date.split('-').map(Number);
    $('dayline').innerHTML = `<span class="plate">Plate ${roman(p.no)} · ${esc(p.title)} · ${dd} ${MONTHS[mm - 1]}</span>` +
      (st.survey ? `<span class="stamp-tag">Surveyed · ${gradeFor(st.survey.s, st.survey.perfect)} · practice</span>` : '');

    const sn = $('scoreNum');
    sn.textContent = sc.total;
    if (lastScore !== null && lastScore !== sc.total) { sn.classList.remove('bump'); void sn.offsetWidth; sn.classList.add('bump'); }
    lastScore = sc.total;
    $('bestNum').textContent = st.best ? st.best.s : '–';
    $('restoreBtn').disabled = !st.best || samePl(st.pl, st.best.pl);
    $('perfectNum').textContent = st.survey ? st.survey.perfect : '?';

    mountBoard($('board'), p, st.pl, { items: sc.items });

    const left = p.hand.length - placedCount(st.pl);
    const hb = $('surveyBtn');
    if (st.survey) { hb.disabled = false; hb.querySelector('b').textContent = 'See results'; $('surveySub').textContent = 'Surveyed · practice freely'; updateCountdown(); }
    else {
      hb.querySelector('b').textContent = 'Survey';
      hb.disabled = left > 0;
      $('surveySub').textContent = left > 0 ? `${left} specimen${left > 1 ? 's' : ''} left` : 'One survey per day';
    }

    const placed = new Set(st.pl.filter(i => i != null));
    let hh = '';
    p.hand.forEach((t, i) => {
      if (placed.has(i)) return;
      hh += `<button class="slot" data-hand="${i}" aria-label="${esc(info(t).name)}, ${esc(famName(t))}: ${esc(ruleText(t))}">${tileFace(t)}</button>`;
    });
    if (!hh) hh = '<span class="hand-done">All specimens placed. Rearrange them, or Survey.</span>';
    $('hand').innerHTML = hh;
    paint();
  }

  // Highlights + hover card, without rebuilding the board (keeps the pointer's place)
  function paint() {
    const p = P(), st = S();
    const board = $('board');
    let reach = [], preview = null, src = null;
    if (drag && drag.started) {
      if (drag.over != null && !isRock(p, drag.over)) { reach = reachFrom(drag.tile, drag.over); preview = drag.over; }
    } else if (hover && hover.from === 'cell') {
      const idx = st.pl[hover.cell];
      if (idx != null) { reach = reachFrom(p.hand[idx], hover.cell); src = hover.cell; }
      else if (sel) {
        const t = sel.from === 'hand' ? p.hand[sel.idx] : p.hand[st.pl[sel.cell]];
        reach = reachFrom(t, hover.cell); preview = hover.cell;
      }
    } else if (hover && hover.from === 'border') reach = borderReach(p, hover.bi);
    else if (hover && hover.from === 'fixed') { const f = p.fixed[hover.fi]; reach = reachFrom(f.tile, f.at[0] * 3 + f.at[1]); }
    else if (!hover && sel && sel.from === 'cell') { reach = reachFrom(p.hand[st.pl[sel.cell]], sel.cell); src = sel.cell; }

    board.querySelectorAll('[data-cell]').forEach(el => {
      const cell = Number(el.dataset.cell);
      el.classList.toggle('reach', reach.includes(cell));
      el.classList.toggle('preview', preview === cell);
      el.classList.toggle('target', !!(sel || (drag && drag.started)) && st.pl[cell] == null);
      const t = el.querySelector('.tile');
      if (t) t.classList.toggle('sel', !!(sel && sel.from === 'cell' && sel.cell === cell));
      el.classList.toggle('src', src === cell);
    });
    board.querySelectorAll('[data-rock]').forEach(el => el.classList.toggle('reach-rock', reach.includes(Number(el.dataset.rock))));
    board.querySelectorAll('[data-fixed]').forEach(el => el.classList.toggle('hov', !!(hover && hover.from === 'fixed' && hover.fi === Number(el.dataset.fixed))));
    board.querySelectorAll('[data-border]').forEach(el => el.classList.toggle('hov', !!(hover && hover.from === 'border' && hover.bi === Number(el.dataset.border))));
    $('hand').querySelectorAll('[data-hand]').forEach(el => {
      const on = !!(sel && sel.from === 'hand' && sel.idx === Number(el.dataset.hand));
      el.classList.toggle('sel', on); el.setAttribute('aria-pressed', String(on));
    });
    $('handTools').innerHTML = (sel && sel.from === 'cell' ? '<button class="clear" id="toHandBtn">Back to hand</button>' : '') +
      (placedCount(st.pl) ? '<button class="clear" id="clearBtn">Clear board</button>' : '');
    showTip();
  }

  // ---------- hover card ----------
  function tipTarget() {
    const p = P(), st = S();
    const k = hover && !(hover.from === 'cell' && st.pl[hover.cell] == null) ? hover : sel;
    if (!k) return null;
    if (k.from === 'hand') return { tile: p.hand[k.idx], el: document.querySelector(`[data-hand="${k.idx}"]`), where: 'hand' };
    if (k.from === 'cell') return st.pl[k.cell] == null ? null : { tile: p.hand[st.pl[k.cell]], el: document.querySelector(`[data-cell="${k.cell}"]`), where: 'cell' };
    if (k.from === 'border') return { tile: p.border[k.bi].tile, el: document.querySelector(`[data-border="${k.bi}"]`), where: 'border', bi: k.bi };
    if (k.from === 'fixed') return { tile: p.fixed[k.fi].tile, el: document.querySelector(`[data-fixed="${k.fi}"]`), where: 'border' };
    return null;
  }
  function showTip() {
    const tip = $('tip');
    const t = tipTarget();
    if (!t || !t.el || !$('overlay').hidden || (drag && drag.started)) { tip.hidden = true; return; }
    const { tile, where } = t;
    const f = info(tile);
    const rule = ruleText(tile);
    let note = '';
    if (where === 'border') note = 'Fixed piece: you can’t move it, and it never scores.';
    else if (tile.kind === 'habitat') note = 'Habitats score 0.';
    // hunting lines
    let warn = '';
    if (tile.kind === 'animal' && tile.rule.t === 'eats') warn += `<div class="hunt eats">Every ${esc(groupName(P(), 'prey', true))} it reaches is eaten and scores 0.</div>`;
    const preds = predatorsOf(P(), tile);
    if (preds.length) warn += `<div class="hunt prey">Eaten (scores 0) if the ${esc(ANIMALS[preds[0]].short)} reaches it.</div>`;
    const pts = tile.kind === 'animal' && where !== 'border' ? `<span class="pts-note">${tile.base} pts</span>` : '';
    tip.innerHTML = `
      <div class="head"><span class="kind"><span class="sw ${famClass(tile)}"></span>${esc(famName(tile))}</span>${pts}</div>
      <div class="nm">${esc(f.name)}</div>${f.latin ? `<div class="lat">${esc(f.latin)}</div>` : ''}
      <div class="body"><span class="rule">${esc(rule)}</span>
        <span class="reach">${t.bi != null ? borderReachSvg(P(), t.bi) : reachSvg(tile.reach, '')}${tile.reach === 'around' ? 'Around' : 'Next to'}</span></div>
      ${warn}${note ? `<div class="note">${note}</div>` : ''}`;
    tip.hidden = false;
    // position above the tile (below if no room), kept on screen
    const r = t.el.getBoundingClientRect();
    const w = tip.offsetWidth, h = tip.offsetHeight, vw = document.documentElement.clientWidth;
    let x = Math.min(Math.max(8, r.left + r.width / 2 - w / 2), vw - w - 8);
    let y = r.top - h - 14, below = false;
    if (y < 8) { y = r.bottom + 14; below = true; }
    tip.style.left = x + 'px'; tip.style.top = y + 'px';
    tip.style.setProperty('--cx', (r.left + r.width / 2 - x) + 'px');
    tip.classList.toggle('below', below);
  }

  // ---------- actions ----------
  function changed() {
    const p = P(), st = S();
    if (isComplete(p, st.pl)) {
      const s = score(p, st.pl).total;
      if (!st.best || s > st.best.s) st.best = { s, pl: st.pl.slice() };
    }
    save(); render();
  }
  const canHover = () => matchMedia('(hover: hover)').matches;
  function onCell(cell) {
    const st = S();
    if (!canHover()) hover = null;
    const occ = st.pl[cell];
    if (sel && sel.from === 'hand') { st.pl[cell] = sel.idx; sel = null; changed(); return; }
    if (sel && sel.from === 'cell') {
      if (sel.cell !== cell) { const a = st.pl[sel.cell]; st.pl[sel.cell] = occ; st.pl[cell] = a; sel = null; changed(); return; }
      sel = null; paint(); return;
    }
    sel = occ != null ? { from: 'cell', cell } : null;
    paint();
  }
  function onHand(idx) {
    if (!canHover()) hover = null;
    sel = sel && sel.from === 'hand' && sel.idx === idx ? null : { from: 'hand', idx };
    paint();
  }
  function setHover(h) { if (drag && drag.started) return; if (sameKey(h, hover)) return; hover = h; paint(); }

  // ---------- drag and drop (mouse, pen and touch via pointer events) ----------
  function dragSource(e) {
    const slot = e.target.closest('[data-hand]');
    if (slot) return { from: 'hand', idx: Number(slot.dataset.hand), el: slot };
    const cell = e.target.closest('[data-cell]');
    if (cell && S().pl[Number(cell.dataset.cell)] != null) return { from: 'cell', cell: Number(cell.dataset.cell), el: cell };
    return null;
  }
  function onPointerDown(e) {
    if (e.button !== 0 || !$('overlay').hidden) return;
    const src = dragSource(e);
    if (src) drag = { ...src, pid: e.pointerId, x0: e.clientX, y0: e.clientY, started: false, over: null };
  }
  function startDrag(e) {
    const p = P(), st = S();
    drag.tile = drag.from === 'hand' ? p.hand[drag.idx] : p.hand[st.pl[drag.cell]];
    const face = drag.el.querySelector('.tile');
    const r = face.getBoundingClientRect();
    drag.offX = e.clientX - r.left; drag.offY = e.clientY - r.top;
    const g = document.createElement('div');
    g.className = 'ghost';
    g.style.width = r.width + 'px'; g.style.height = r.height + 'px';
    g.innerHTML = tileFace(drag.tile);
    document.body.appendChild(g);
    drag.ghost = g; drag.face = face;
    face.classList.add('dragging');
    document.body.classList.add('is-dragging');
    drag.started = true; hover = null; sel = null;
  }
  function onPointerMove(e) {
    if (!drag || e.pointerId !== drag.pid) return;
    if (!drag.started) {
      if (Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) < 6) return;
      startDrag(e);
    }
    e.preventDefault();
    drag.ghost.style.transform = `translate(${e.clientX - drag.offX}px, ${e.clientY - drag.offY}px) rotate(-4deg) scale(1.08)`;
    const under = document.elementFromPoint(e.clientX, e.clientY);
    const cellEl = under && under.closest('[data-cell], [data-rock]');
    const over = cellEl && cellEl.dataset.cell != null ? Number(cellEl.dataset.cell) : cellEl ? Number(cellEl.dataset.rock) : null;
    drag.onBoard = !!(under && under.closest('#board'));
    if (over !== drag.over) { drag.over = over; paint(); }
  }
  function onPointerUp(e) {
    if (!drag || e.pointerId !== drag.pid) return;
    const d = drag; drag = null;
    if (!d.started) return;               // a plain click: the click handlers deal with it
    suppressClick = true; setTimeout(() => { suppressClick = false; }, 0);
    d.ghost.remove(); d.face.classList.remove('dragging'); document.body.classList.remove('is-dragging');
    const p = P(), st = S();
    if (d.over != null && !isRock(p, d.over)) {
      if (d.from === 'hand') st.pl[d.over] = d.idx;
      else if (d.over !== d.cell) { const a = st.pl[d.cell]; st.pl[d.cell] = st.pl[d.over]; st.pl[d.over] = a; }
    } else if (d.from === 'cell' && !d.onBoard) st.pl[d.cell] = null;   // dropped off the board: back to hand
    sel = null;
    changed();
  }
  function onPointerCancel() {
    if (!drag) return;
    if (drag.started) { drag.ghost.remove(); drag.face.classList.remove('dragging'); document.body.classList.remove('is-dragging'); }
    drag = null; paint();
  }

  // ---------- overlays ----------
  function openSheet(html) {
    $('tip').hidden = true;
    $('sheet').innerHTML = html; $('overlay').hidden = false;
    document.documentElement.classList.add('sheet-open');   // freeze the page behind the sheet
    const first = $('sheet').querySelector('button'); if (first) first.focus({ preventScroll: true });
    $('sheet').scrollTop = 0;
  }
  function closeSheet() { $('overlay').hidden = true; document.documentElement.classList.remove('sheet-open'); }

  function surveyNow(pl) {
    const p = P(), st = S();
    const mine = pl.slice();
    sel = null; hover = null;
    openSheet('<h2 id="sheetTitle">Surveying the site…</h2>');
    setTimeout(() => {
      const perf = perfectFor(p);
      st.survey = { s: score(p, mine).total, pl: mine, perfect: perf.best };
      save(); render(); openResults();
    }, 30);
  }
  function onSurvey() {
    const p = P(), st = S();
    if (st.survey) { openResults(); return; }
    if (!isComplete(p, st.pl)) return;
    const s = score(p, st.pl).total;
    if (st.best && st.best.s > s) {
      openSheet(`<h2 id="sheetTitle">Submit your Best instead?</h2>
        <p class="center">This board scores <b>${s}</b>, but your Best was <b>${st.best.s}</b>. You only get one Survey today.</p>
        <div class="btn-row"><button class="big-btn" id="useBest">Survey my Best (${st.best.s})</button>
        <button class="big-btn plain" id="useThis">Survey this board (${s})</button></div>`);
      $('useBest').onclick = () => { st.pl = st.best.pl.slice(); surveyNow(st.best.pl); };
      $('useThis').onclick = () => surveyNow(st.pl);
      return;
    }
    surveyNow(st.pl);
  }

  function chipsFor(tile) {
    const f = ANIMALS[tile.a];
    return `<span class="chip"><span class="sw ${famClass(tile)}"></span>${esc(famName(tile))}</span><span class="chip">${esc(f.home)}</span><span class="chip">${esc(f.diet)}</span>`;
  }
  function factCards(p) {
    const seen = new Set(); let h = '';
    const add = (tile, idxs, border) => {
      const f = info(tile);
      let calc = '';
      if (tile.kind === 'habitat') calc = esc(ruleText(tile)) + (border ? ' · border piece' : '');
      else if (border) calc = 'Border piece · never scores';
      h += `<div class="fact"><div class="face">${tileFace(tile, { fixed: border })}</div><div>
        <b>${esc(f.name)}</b>${f.latin ? `<span class="flat">${esc(f.latin)}</span>` : ''}${tile.kind === 'animal' ? `<div class="chips">${chipsFor(tile)}</div>` : ''}
        <p>${esc(f.fact)}</p>${calc ? `<div class="calc">${calc}</div>` : ''}</div></div>`;
    };
    p.hand.forEach(t => {
      const k = t.kind === 'animal' ? 'a:' + t.a : 'h:' + t.h;
      if (seen.has(k)) return; seen.add(k);
      const idxs = p.hand.map((u, j) => (JSON.stringify(u) === JSON.stringify(t) ? j : -1)).filter(j => j >= 0);
      add(t, idxs, false);
    });
    (p.fixed || []).forEach(f => add(f.tile, [], true));
    p.border.forEach(b => add(b.tile, [], true));
    return h;
  }

  // Per-animal score breakdown: Base, each bonus grouped with its count, multipliers, Total. Board reading order.
  function ledgerHtml(p, items) {
    const sign = v => (v < 0 ? '−' : '+') + Math.abs(v);
    const row = (label, n, amt, cls = '') => `<div class="lrow${cls}"><span>${label}</span><span class="n">${n}</span><b>${amt}</b></div>`;
    return items.slice().sort((a, b) => a.cell - b.cell).map(it => {
      const tile = p.hand[it.idx];
      let rows = '';
      if (it.eaten) {
        rows = row('Base', '', tile.base, ' struck') + row(esc(it.lines[0].label), '', '0', ' eaten');
      } else {
        const groups = [];
        it.lines.slice(1).forEach(l => {
          const key = (l.m ? 'm|' + l.m : 'a|' + l.v) + '|' + (l.g || l.label);
          let gr = groups.find(x => x.key === key);
          if (!gr) groups.push(gr = { key, g: l.g || l.label, v: l.v, m: l.m, n: 0 });
          gr.n++;
        });
        rows = row('Base', '', it.lines[0].v);
        groups.filter(x => !x.m).forEach(x => { rows += row(`${esc(x.g)} ${sign(x.v)}`, '×' + x.n, sign(x.v * x.n)); });
        groups.filter(x => x.m).forEach(x => { rows += row(`${esc(x.g)} ×${x.m}`, x.n > 1 ? '×' + x.n : '', '×' + Math.pow(x.m, x.n)); });
      }
      return `<div class="lcard ${famClass(tile)}${it.eaten ? ' is-eaten' : ''}"><div class="lname">${esc(info(tile).short)}</div>${rows}${row('Total', '', it.score, ' ltotal')}</div>`;
    }).join('');
  }

  function openResults() {
    const p = P(), st = S();
    const perf = perfectFor(p);
    const g = gradeFor(st.survey.s, perf.best);
    const pct = Math.round(st.survey.s / perf.best * 100);
    const share = `Zooku #${p.no} · ${g} · ${st.survey.s}/${perf.best} · zooku.app`;
    const mine = score(p, st.survey.pl).items, best = score(p, perf.placement).items;
    let showPerfect = false;
    openSheet(`
      <h2 id="sheetTitle">${g === 'A+' ? 'Perfect survey!' : 'Survey complete'}</h2>
      <div class="grade-box">
        <div class="grade g-${g === 'A+' ? 'Aplus' : g}">${g}</div>
        <div class="score-line">${st.survey.s} <span class="soft">/ ${perf.best}</span><small>${g === 'A+' ? 'You found the perfect layout.' : `${pct}% of the perfect score`}</small></div>
      </div>
      ${isLatest() ? '<p class="next-up" id="nextUp" aria-live="polite"></p>' : ''}
      <div class="ladder" aria-label="Grade scale">${LADDER.map(x => `<span class="${x === g ? 'on g-' + (x === 'A+' ? 'Aplus' : x) : ''}">${x}</span>`).join('')}</div>
      <div class="seg" role="group" aria-label="Which layout to show">
        <button id="segMine" aria-pressed="true">Your layout</button><button id="segBest" aria-pressed="false">Perfect layout</button>
      </div>
      <div class="board-wrap"><div class="board mini" id="miniBoard"></div></div>
      <div class="share"><input id="shareText" readonly value="${esc(share)}" aria-label="Share text"><button class="small-btn" id="copyBtn">Copy</button></div>
      <section class="ledger" aria-labelledby="ledgerTitle"><h3 id="ledgerTitle">How your layout scored</h3><div class="lgrid" id="ledgerGrid"></div>
        <div class="ledger-sum"><span>Board total</span><b id="ledgerSum"></b></div></section>
      <div class="facts"><h3>Meet today’s animals</h3>${factCards(p)}</div>
      <div class="btn-row"><button class="big-btn" id="closeRes">Keep playing (practice)</button></div>
      <div class="btn-row"><button class="clear" id="resRoad">What’s coming next? Vote &amp; suggest</button></div>`);
    const draw = () => {
      mountBoard($('miniBoard'), p, showPerfect ? perf.placement : st.survey.pl, { mini: true, pts: showPerfect ? best : mine });
      $('ledgerTitle').textContent = showPerfect ? 'How the perfect layout scored' : 'How your layout scored';
      $('ledgerGrid').innerHTML = ledgerHtml(p, showPerfect ? best : mine);
      $('ledgerSum').textContent = showPerfect ? perf.best : st.survey.s;
      $('segMine').setAttribute('aria-pressed', String(!showPerfect));
      $('segBest').setAttribute('aria-pressed', String(showPerfect));
    };
    draw();
    $('segMine').onclick = () => { showPerfect = false; draw(); };
    $('segBest').onclick = () => { showPerfect = true; draw(); };
    $('copyBtn').onclick = () => {
      const done = () => { $('copyBtn').textContent = 'Copied'; };
      const fallback = () => { const i = $('shareText'); i.focus(); i.select(); $('copyBtn').textContent = 'Selected'; };
      try { navigator.clipboard.writeText(share).then(done, fallback); } catch (e) { fallback(); }
    };
    $('closeRes').onclick = closeSheet;
    updateCountdown();
    $('resRoad').onclick = () => openRoadmap(openResults);
  }

  const demo = (a, role = 'prey', opts = {}) => `<span class="demo">${tileFace({ kind: 'animal', a, role, reach: 'next' }, opts)}</span>`;
  const STEPS = [
    { t: 'Place every tile', p: 'Drag each tile from your hand onto a square, or tap a tile and then a square. Drag a placed tile off the board to take it back. Rocks and fixed pieces block squares.',
      art: () => demo('clown') + demo('damsel') + demo('parrot') },
    { t: 'Five prey, one predator', p: 'Every day you get five prey and one predator, named for the day’s scene, like Fish and a Shark. Green tiles are prey. The red tile is the predator.',
      art: () => demo('clown') + demo('damsel') + demo('shark', 'pred') },
    { t: 'Hover to read a tile', p: 'Hover a tile (or tap it on a phone) to see its points, its rule and its reach. Next to means the 4 squares beside it; Around adds the diagonals. The board outlines the squares it affects.',
      art: () => `<figure class="reach-demo">${reachSvg('next', 'reach-big')}<figcaption>Next to</figcaption></figure><figure class="reach-demo">${reachSvg('around', 'reach-big')}<figcaption>Around</figcaption></figure>` },
    { t: 'Feed or protect', p: 'The predator scores points for every prey it reaches, and those prey are eaten: they score 0. Some days it pays to keep the prey safe. Other days it pays to feed the predator. Work out which.',
      art: () => demo('shark', 'pred') + demo('damsel', 'prey', { eaten: true }) },
    { t: 'Use the habitat', p: 'Each day has one fixed habitat, painted into the ground of the board. It boosts the animals around it, predator included, and never scores itself.',
      art: () => `<span class="demo">${tileFace({ kind: 'habitat', h: 'coral', reach: 'around', eff: { t: 'mult', v: 2, role: 'any' } }, { fixed: true })}</span>` },
    { t: 'Survey once', p: 'Your score updates as you play, and your Best is saved. The perfect score stays hidden until you Survey, and you get one Survey a day.',
      art: () => `<div class="grade" style="width:70px;height:70px;font-size:32px">A+</div>` },
  ];
  function openHowTo(i = 0) {
    const s = STEPS[i];
    openSheet(`<div class="step-art">${s.art()}</div><h2 id="sheetTitle">${s.t}</h2><p class="center">${s.p}</p>
      <div class="dots">${STEPS.map((_, j) => `<i class="${j === i ? 'on' : ''}"></i>`).join('')}</div>
      <div class="btn-row"><button class="big-btn plain" id="stepBack" ${i === 0 ? 'disabled' : ''}>Back</button>
      <button class="big-btn" id="stepNext">${i === STEPS.length - 1 ? 'Play' : 'Next'}</button></div>`);
    $('stepBack').onclick = () => { if (i > 0) openHowTo(i - 1); };
    $('stepNext').onclick = () => { if (i < STEPS.length - 1) openHowTo(i + 1); else { store.seenHowTo = true; save(); closeSheet(); } };
  }

  // ---------- next puzzle: midnight in New York (handles daylight-saving changes) ----------
  function msToNextPuzzle(now = new Date()) {
    const p = etParts(now);
    let ms = 864e5 - (((+p.hour % 24) * 3600 + +p.minute * 60 + +p.second) * 1000 + now.getMilliseconds());
    ms += (etOffsetMin(now) - etOffsetMin(new Date(now.getTime() + ms))) * 60000;   // 23- or 25-hour days
    return Math.max(0, ms);
  }
  const leftText = ms => { const m = Math.ceil(ms / 60000); if (m <= 1) return 'under a minute'; const h = Math.floor(m / 60); return h ? `${h}h ${m % 60}m` : `${m}m`; };
  const isLatest = () => cur === PUZZLES.length - 1;
  function updateCountdown() {
    const ready = etDate() > PUZZLES[PUZZLES.length - 1].date, ms = msToNextPuzzle(), st = S();   // a new day began since this page loaded
    if (st.survey && isLatest()) $('surveySub').textContent = ready ? 'A new puzzle is ready' : `Next puzzle in ${leftText(ms)}`;
    const el = $('nextUp');
    if (el) {
      if (ready && !el.querySelector('button')) { el.innerHTML = '<button class="big-btn" id="playNew">Play the new puzzle</button>'; $('playNew').onclick = () => location.reload(); }
      else if (!ready) el.textContent = `Next puzzle in ${leftText(ms)}`;
    }
  }
  setInterval(updateCountdown, 15000);

  // Privacy: what the game keeps and where
  function openPrivacy() {
    openSheet(`<h2 id="sheetTitle">Privacy</h2>
      <div class="prose">
        <p>Zooku has no accounts, no ads and no tracking.</p>
        <p>Your progress (boards, best scores and surveys) is saved only in this browser, on this device. Nothing is sent to us, and clearing your browser data erases it.</p>
        <p>The “Vote &amp; suggest” button opens a Google Form. Anything you send there is collected by Google Forms under <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google’s privacy policy</a>.</p>
      </div>
      <div class="btn-row"><button class="big-btn plain" id="closePriv">Close</button></div>`);
    $('closePriv').onclick = closeSheet;
  }

  // Field guide: today's animals and habitat, any time (facts only, nothing about the answer)
  function openGuide() {
    const p = P();
    openSheet(`<h2 id="sheetTitle">Meet today’s animals</h2>
      <p class="center sheet-sub">Plate ${roman(p.no)} · ${esc(p.title)}</p>
      <div class="facts">${factCards(p)}</div>
      <div class="btn-row"><button class="big-btn plain" id="closeGuide">Back to the board</button></div>`);
    $('closeGuide').onclick = closeSheet;
  }

  // What's coming: the ideas players can vote on, plus the way to the feedback form
  function openRoadmap(back = null) {
    openSheet(`<h2 id="sheetTitle">What’s coming</h2>
      <p class="center sheet-sub">Ideas on the drawing board</p>
      <ol class="roadmap">${ROADMAP.map((r, i) => `<li><span class="no">No. ${i + 1}</span><div><b>${esc(r.t)}</b><p>${esc(r.d)}</p></div></li>`).join('')}</ol>
      <p class="center">Vote for the one you want most, suggest your own idea, or tell us about a bug.</p>
      <div class="btn-row"><a class="big-btn" id="voteLink" href="${FEEDBACK_URL}" target="_blank" rel="noopener">Vote &amp; suggest ↗</a>
        <button class="big-btn plain" id="closeRoad">${back ? 'Back' : 'Close'}</button></div>
      <p class="center form-note">Opens a short Google Form in a new tab.</p>`);
    $('closeRoad').onclick = () => (back ? back() : closeSheet());
  }

  function openPast() {
    let h = '<h2 id="sheetTitle">Puzzles</h2><div class="past">';
    [...PUZZLES].reverse().forEach(p => {
      const st = store.p[p.no];
      const status = st && st.survey ? 'Surveyed · ' + gradeFor(st.survey.s, st.survey.perfect) : st && placedCount(st.pl) ? 'In progress' : 'Not played';
      const i = PUZZLES.indexOf(p);
      h += `<button data-pz="${i}" aria-current="${i === cur}"><span><span class="t">#${p.no} · ${esc(p.title)}</span><br><span class="d">${fmtDate(p.date)}${i === PUZZLES.length - 1 ? ' · today' : ''}</span></span><span class="d">${status}</span></button>`;
    });
    h += '</div><div class="btn-row"><button class="big-btn plain" id="closePast">Close</button></div>';
    openSheet(h);
    $('sheet').querySelectorAll('[data-pz]').forEach(b => b.onclick = () => { cur = Number(b.dataset.pz); sel = null; hover = null; lastScore = null; closeSheet(); render(); });
    $('closePast').onclick = closeSheet;
  }

  // ---------- wiring ----------
  function keyFromEl(el) {
    if (!el) return null;
    if (el.dataset.hand != null) return { from: 'hand', idx: Number(el.dataset.hand) };
    if (el.dataset.cell != null) return { from: 'cell', cell: Number(el.dataset.cell) };
    if (el.dataset.border != null) return { from: 'border', bi: Number(el.dataset.border) };
    if (el.dataset.fixed != null) return { from: 'fixed', fi: Number(el.dataset.fixed) };
    return null;
  }
  function wire() {
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: false });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerCancel);
    document.addEventListener('dragstart', e => e.preventDefault());
    $('board').addEventListener('click', e => {
      if (suppressClick) return;
      const b = e.target.closest('[data-cell]'); if (b) return onCell(Number(b.dataset.cell));
      const bp = e.target.closest('[data-border],[data-fixed]');
      if (bp && !canHover()) { hover = keyFromEl(bp); sel = null; paint(); }
    });
    $('hand').addEventListener('click', e => { if (suppressClick) return; const b = e.target.closest('[data-hand]'); if (b) onHand(Number(b.dataset.hand)); });
    $('handTools').addEventListener('click', e => {
      const st = S();
      if (e.target.id === 'clearBtn') { st.pl = Array(9).fill(null); sel = null; changed(); }
      if (e.target.id === 'toHandBtn' && sel && sel.from === 'cell') { st.pl[sel.cell] = null; sel = null; changed(); }
    });
    // hover cards: mouse and pen only; touch uses tap-to-select
    document.addEventListener('pointerover', e => {
      if (e.pointerType === 'touch') return;
      setHover(keyFromEl(e.target.closest('[data-hand],[data-cell],[data-border],[data-fixed]')));
    });
    document.addEventListener('pointerout', e => { if (e.pointerType !== 'touch' && !e.relatedTarget) setHover(null); });
    window.addEventListener('scroll', () => { if (!$('tip').hidden) showTip(); }, { passive: true });
    window.addEventListener('resize', () => showTip());
    $('restoreBtn').onclick = () => { const st = S(); if (st.best) { st.pl = st.best.pl.slice(); sel = null; changed(); } };
    $('surveyBtn').onclick = onSurvey;
    $('helpBtn').onclick = () => openHowTo(0);
    $('calBtn').onclick = openPast;
    $('guideBtn').onclick = openGuide;
    $('roadBtn').onclick = () => openRoadmap();
    $('privBtn').onclick = openPrivacy;
    $('overlay').addEventListener('click', e => { if (e.target.id === 'overlay') closeSheet(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') { if (!$('overlay').hidden) closeSheet(); else if (sel || hover) { sel = null; hover = null; paint(); } }
    });
  }

  function start() {
    if (!PUZZLES.length) {   // nothing released yet (should not happen on the live site)
      $('board').innerHTML = '<p class="hint">Today’s puzzle is on its way. Check back soon.</p>';
      return;
    }
    load();
    wire();
    render();
    if (!store.seenHowTo) openHowTo(0);
  }
  start();
})();
