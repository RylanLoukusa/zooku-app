// ===== Zooku Workshop (local designer tool, served by scripts/workshop.js) =====
// Lists every day in data/calendar.json with its perfect layout and numbers. Approve, Regenerate, Revert and
// Generate call the local server, which updates the calendar file. Days that are already live are locked.
(() => {
  const { score, ruleText, info } = window.ZK;
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const THEME_NAME = { reef: 'Reef', savanna: 'Savanna', night: 'Night field', ice: 'Antarctic', pond: 'Pond', jungle: 'Rainforest', outback: 'Outback', meadow: 'Hedgerow' };
  const fmt = iso => { const d = new Date(iso + 'T12:00:00Z'); return `${DOW[d.getUTCDay()]} ${d.getUTCDate()} ${MON[d.getUTCMonth()]}`; };
  const num = n => n.toLocaleString('en-US');

  const state = { days: [], today: '', busy: new Set(), filter: 'upcoming', generating: false };
  const approved = d => !!(d.review && d.review.approved);
  function setStatus(text, warn = false) { const el = $('status'); el.textContent = text; el.classList.toggle('warn', warn); }

  async function api(path, body) {
    const res = await fetch(path, body === undefined ? {} : { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || res.statusText);
    return data;
  }

  // ---------- the perfect-layout board ----------
  const art = key => `<svg viewBox="0 0 64 64" aria-hidden="true">${window.ZART.ART[key] || ''}</svg>`;
  function boardHtml(p) {
    const items = score(p, p.meta.placement).items;
    const sides = new Set(p.border.map(b => b.side));
    const L = sides.has('left'), R = sides.has('right'), T = sides.has('top');
    const co = L ? 1 : 0, ro = T ? 1 : 0;
    const cols = `${L ? '0.55fr ' : ''}repeat(3, minmax(0, 1fr))${R ? ' 0.55fr' : ''}`;
    let h = '';
    p.border.forEach(b => {
      const span = b.to - b.from + 1, vertical = b.side === 'left' || b.side === 'right';
      const col = vertical ? (b.side === 'left' ? 1 : 4 + co) : `${b.from + 1 + co} / ${b.to + 2 + co}`;
      const row = vertical ? `${b.from + 1 + ro} / ${b.to + 2 + ro}` : (b.side === 'top' ? 1 : 4 + ro);
      const cls = b.tile.h === 'hedge' ? 'hedge' : 'water';
      h += `<div class="bp ${cls}" style="grid-column:${col};grid-row:${row};${vertical ? '' : `aspect-ratio:${(span / 0.55).toFixed(2)};`}" title="${esc(info(b.tile).name)}">${art(b.tile.h)}</div>`;
    });
    for (let cell = 0; cell < 9; cell++) {
      const r = Math.floor(cell / 3), c = cell % 3, style = `grid-column:${c + 1 + co};grid-row:${r + 1 + ro}`;
      if (p.rocks.some(([a, b]) => a === r && b === c)) { h += `<div class="c" style="${style}">${art('rock')}</div>`; continue; }
      const f = (p.fixed || []).find(x => x.at[0] === r && x.at[1] === c);
      if (f) { h += `<div class="c" style="${style}" title="${esc(info(f.tile).name)}">${art(f.tile.h)}</div>`; continue; }
      const idx = p.meta.placement[cell];
      if (idx == null) { h += `<div class="c" style="${style}"></div>`; continue; }
      const t = p.hand[idx], it = items.find(x => x.cell === cell);
      h += `<div class="c k-${t.role}${it && it.eaten ? ' eaten' : ''}" style="${style}" title="${esc(info(t).short)}"><span class="pts">${it ? it.score : ''}</span>${art(t.a)}</div>`;
    }
    return `<div class="mini" style="grid-template-columns:${cols}">${h}</div>`;
  }

  function handHtml(p) {
    const seen = new Map();
    p.hand.forEach(t => { const k = JSON.stringify(t); seen.set(k, { t, n: (seen.get(k)?.n || 0) + 1 }); });
    let h = [...seen.values()].map(({ t, n }) => `<li><span class="sw k-${t.role}"></span><span><b>${esc(info(t).short)}${n > 1 ? ' ×' + n : ''}</b> <span class="x">${t.base} pts · ${esc(ruleText(t, p))}</span></span></li>`).join('');
    const hab = (p.fixed || []).map(f => ({ t: f.tile, where: 'in the grid' })).concat(p.border.map(b => ({ t: b.tile, where: `${b.side} edge, ${b.to - b.from + 1} squares` })));
    h += hab.map(({ t, where }) => `<li><span class="sw k-habitat"></span><span><b>${esc(info(t).short)}</b> <span class="x">${esc(ruleText(t, p))} · ${where}</span></span></li>`).join('');
    return `<ul class="hand">${h}</ul>`;
  }

  function cardHtml(p) {
    const m = p.meta, live = p.date <= state.today, ok = approved(p), replaced = !!p.previous, busy = state.busy.has(p.date);
    const tags = [`<span class="tag">${esc(THEME_NAME[p.theme] || p.theme)}</span>`, `<span class="tag d-${m.difficulty}">${m.difficulty}</span>`,
      p.date === state.today ? '<span class="tag live">Today</span>' : live ? '<span class="tag live">Live</span>' : '',
      m.handmade ? '<span class="tag">Hand-made</span>' : '', replaced ? '<span class="tag new">Regenerated</span>' : '', ok ? '<span class="tag ok">Approved</span>' : ''].join('');
    return `<article class="day${ok ? ' ok' : ''}${live ? ' live' : ''}" data-date="${p.date}">
      <div class="head"><h2>${esc(p.title)}</h2><span class="when">${fmt(p.date)} · #${p.no}</span></div>
      <div class="tags">${tags}</div>
      <div class="body">${boardHtml(p)}
        <div class="info">
          <div class="stats"><div><span>Perfect</span><b>${m.perfect}</b></div>
            <div class="${m.winner === 'protect' ? 'win' : ''}"><span>Best protect</span><b>${m.protect}</b></div>
            <div class="${m.winner === 'feed' ? 'win' : ''}"><span>Best feed</span><b>${m.feed}</b></div></div>
          <div class="meta">${m.winner === 'feed' ? 'Feeding' : 'Protecting'} wins by ${Math.abs(m.feed - m.protect)} · eats ${m.eatenAtBest.join(' or ')} at best<br>
            A-grade layouts ${m.nearA}% · perfect layouts ${num(m.perfectLayouts)} of ${num(m.layouts)}</div>
          ${handHtml(p)}
        </div>
      </div>
      <div class="actions">
        <button class="btn go" data-act="approve" aria-pressed="${ok}">${ok ? '✓ Approved' : 'Approve'}</button>
        <button class="btn" data-act="regen" ${live || busy ? 'disabled' : ''} title="${live ? 'Already live for players' : 'Make a different puzzle for this day'}">↻ Regenerate</button>
        ${replaced && !live ? '<button class="link" data-act="revert">Revert to previous</button>' : ''}
        ${busy ? '<span class="busy">Generating…</span>' : ''}
        <span class="note">${m.seed != null ? 'seed ' + m.seed : ''}</span>
      </div>
    </article>`;
  }

  function render() {
    const days = state.days, ahead = days.filter(d => d.date > state.today);
    let run = 0; for (const d of ahead) { if (!approved(d)) break; run++; }
    const count = (k, v, list) => list.filter(p => p.meta[k] === v).length;
    $('summary').innerHTML = [
      `<span class="chip"><b>${days.length}</b> days · ${fmt(days[0].date)} – ${fmt(days[days.length - 1].date)}</span>`,
      `<span class="chip${run < 7 ? ' warn' : ''}">Approved <b>${run}</b> days ahead${run ? ' · through ' + fmt(ahead[run - 1].date) : ''}</span>`,
      `<span class="chip${ahead.length < 14 ? ' warn' : ''}">Scheduled <b>${ahead.length}</b> days ahead</span>`,
      `<span class="chip">Upcoming: feed <b>${count('winner', 'feed', ahead)}</b> · protect <b>${count('winner', 'protect', ahead)}</b></span>`,
      `<span class="chip">Easy <b>${count('difficulty', 'Easy', ahead)}</b> · Medium <b>${count('difficulty', 'Medium', ahead)}</b> · Hard <b>${count('difficulty', 'Hard', ahead)}</b></span>`,
    ].join('');
    const show = days.filter(d => state.filter === 'all' || (state.filter === 'upcoming' && d.date > state.today) ||
      (state.filter === 'review' && d.date > state.today && !approved(d)) || (state.filter === 'ok' && approved(d)) || (state.filter === 'new' && d.previous));
    $('days').innerHTML = show.length ? show.map(cardHtml).join('') : '<p class="empty">Nothing here.</p>';
    $('genBtn').disabled = state.generating;
    $('genNote').textContent = state.generating ? 'Generating… this takes about a minute.' : `New days start after ${fmt(days[days.length - 1].date)}.`;
  }

  function replaceDay(day) { const i = state.days.findIndex(d => d.date === day.date); if (i >= 0) state.days[i] = day; }
  async function act(date, action) {
    if (action === 'regen') { state.busy.add(date); render(); }
    try {
      const day = await api(`/api/days/${date}/${action}`, action === 'approve' ? { approved: !approved(state.days.find(d => d.date === date)) } : {});
      replaceDay(day);
      setStatus(action === 'regen' ? `Made a new puzzle for ${fmt(date)}.` : 'Saved to data/calendar.json.');
    } catch (e) { setStatus(`Could not ${action === 'regen' ? 'regenerate' : action} ${fmt(date)}: ${e.message}`, true); }
    state.busy.delete(date); render();
  }

  document.addEventListener('click', async e => {
    const f = e.target.closest('.filters button');
    if (f) { state.filter = f.dataset.f; document.querySelectorAll('.filters button').forEach(b => b.setAttribute('aria-pressed', String(b === f))); render(); return; }
    if (e.target.closest('#genBtn')) {
      state.generating = true; render();
      try { const r = await api('/api/generate', { days: 30 }); state.days = r.days; setStatus(`Added ${r.added} days. They start unapproved.`); }
      catch (err) { setStatus('Could not generate: ' + err.message, true); }
      state.generating = false; render(); return;
    }
    const b = e.target.closest('[data-act]'); if (!b || b.disabled) return;
    act(b.closest('.day').dataset.date, b.dataset.act);
  });

  (async () => {
    try { const r = await api('/api/calendar'); state.days = r.days; state.today = r.today; render(); setStatus(`Today in New York is ${fmt(r.today)}.`); }
    catch (e) { setStatus('Could not load the calendar: ' + e.message, true); }
  })();
})();
