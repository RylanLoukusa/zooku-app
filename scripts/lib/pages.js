// Builds the site's static, readable pages: how to play, the field guide (one page per scene),
// the puzzle archive, about, contact and privacy, plus sitemap.xml.
// The game itself is one interactive page; these pages carry the written content in plain HTML,
// so they read without JavaScript and search engines can see them.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ZK = require('../../src/shared/engine.js');
const ZGEN = require('../../src/shared/generator.js');
const { ECOSYSTEMS, RULE_WORDS, ABOUT } = require('./content');

const SITE = 'https://zooku.app';
const ADSENSE = 'ca-pub-1332573525474806';
const FEEDBACK_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeaWkHnXs8UWl2i9hyFYQnC6I3WUkqDDogej07Z76vQnIA-qQ/viewform';

// art.js is written for the browser (it sets window.ZART); run it in a sandbox to borrow the paintings.
function loadArt(root) {
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'src/shared/art.js'), 'utf8'), sandbox);
  return sandbox.window.ZART;
}

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const longDate = iso => new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { timeZone: 'UTC', weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
const shortDate = iso => new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric', year: 'numeric' });
const slug = theme => theme;   // theme keys are already short, lowercase words

const NAV = [
  ['/', 'Today’s puzzle'],
  ['/how-to-play/', 'How to play'],
  ['/field-guide/', 'Field guide'],
  ['/archive/', 'Archive'],
  ['/about/', 'About'],
];

function page({ urlPath, title, description, css, body, scene = '' }) {
  const canonical = SITE + urlPath;
  const nav = NAV.map(([href, label]) => `<a href="${href}"${href === urlPath ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Zooku">
<meta property="og:url" content="${canonical}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${SITE}/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#f4ead2">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="stylesheet" href="${css}">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE}"
     crossorigin="anonymous"></script>
</head>
<body${scene ? ` data-scene="${scene}"` : ''}>
<header class="site-head">
  <a class="site-logo" href="/">Zooku</a>
  <nav class="site-nav" aria-label="Site">${nav}</nav>
</header>
<main class="page">
${body}
</main>
${footer()}
</body>
</html>
`;
}

function footer() {
  return `<footer class="site-foot">
  <p><a href="/">Play today’s puzzle</a> · <a href="/how-to-play/">How to play</a> · <a href="/field-guide/">Field guide</a> · <a href="/archive/">Archive</a></p>
  <p><a href="/about/">About</a> · <a href="/contact/">Contact</a> · <a href="/privacy/">Privacy</a></p>
  <p class="fine">A new puzzle every day at midnight Eastern. © ${new Date().getUTCFullYear()} Zooku. Illustrations original to Zooku.</p>
</footer>`;
}

const svgArt = (ART, key, cls = 'specimen-art') => `<svg class="${cls}" viewBox="0 0 64 64" aria-hidden="true">${ART[key] || ''}</svg>`;

// ---------- how to play ----------
function howToPlay(css) {
  const body = `
<article class="prose-page">
<h1>How to play Zooku</h1>
<p class="lede">Zooku is a daily puzzle on a 3×3 board. You place five prey and one predator around a fixed habitat, and try to find the layout with the highest possible score. A new puzzle opens every day at midnight Eastern time.</p>

<h2>The pieces</h2>
<p>Every day has a scene, such as a coral reef or the Arctic tundra, and the pieces come from it.</p>
<ul>
  <li><b>Five prey</b> (green cards), named for the scene: Fish, Grazers, Penguins and so on. Some days two of them are the same species.</li>
  <li><b>One predator</b> (the red card): the shark on the reef, the lion on the savanna, the owl in the backyard.</li>
  <li><b>One habitat</b>, painted onto the board. It is either fixed on a square or runs along one edge of the board. It never scores by itself, but it boosts the animals near it.</li>
  <li><b>One or two rocks</b>, which block squares. With rocks and a habitat on a square, there are usually just enough open squares for your six animals, sometimes with one to spare.</li>
</ul>

<h2>Placing tiles</h2>
<p>Drag a card from your hand onto a square, or tap a card and then tap a square. Drag a placed card off the board to take it back. Your score updates as soon as anything moves, and your best score of the day is saved.</p>
<p>Hover over a card (or tap it on a phone) to read its notes: its base points, its rule and its reach. The board outlines the squares the card affects.</p>

<h2>Reach: next to and around</h2>
<p>Every rule says how far it reaches.</p>
<ul>
  <li><b>Next to</b> means the four squares directly above, below, left and right.</li>
  <li><b>Around</b> adds the four diagonals as well, so up to eight squares.</li>
</ul>
<p>A card in the center reaches the most squares. A card in a corner reaches the fewest: two squares next to it, or three around it.</p>

<h2>How animals score</h2>
<p>Each animal has a base score and one rule. These are the rules you will meet:</p>
<dl class="rules">
  <dt>Schooling</dt><dd>+points for each other prey next to it. Shoaling fish, grazing herds and penguin huddles like company.</dd>
  <dt>Herding</dt><dd>+points for each other animal of its own species next to it. These show up on days with two of the same prey.</dd>
  <dt>Loner</dt><dd>+points only if no other prey is next to it. It wants space.</dd>
  <dt>Habitat lover</dt><dd>+points if it sits right beside the habitat.</dd>
  <dt>Corner, edge or center</dt><dd>+points for standing in that kind of square. An edge square is the middle of a side, not a corner.</dd>
  <dt>No rule</dt><dd>Just its base score. At most one card a day is like this.</dd>
</dl>

<h2>The predator: feed or protect</h2>
<p>The predator scores its base points plus a bonus for <b>every prey it reaches</b>. But every prey it reaches is <b>eaten</b>, and an eaten animal scores 0, whatever its rule says. An eaten prey still counts as being on the board for its neighbours’ rules.</p>
<p>That is the heart of the game. You can protect the prey, keeping the predator away from all of them so every prey scores. Or you can feed the predator, letting it reach one or more prey for a big bonus and giving up what those prey would have scored. Some days protecting wins, other days feeding wins, and the puzzle never tells you which.</p>

<h2>The habitat</h2>
<p>The habitat adds points or multiplies the score of the animals in its reach, and its notes say exactly which ones: every animal, only the prey, or only the predator. A ×2 habitat doubles an animal’s whole score after its rule is counted, so it matters a great deal who stands beside it. A habitat painted along the edge of the board reaches the squares in the row or column next to it.</p>

<h2>Survey and grades</h2>
<p>The perfect score is hidden while you play. When you are happy with your board, press <b>Survey</b>. You get one Survey a day. It reveals the perfect score and grades your best board:</p>
<ul>
  <li><b>A+</b>: you found a perfect layout.</li>
  <li><b>A</b>: 90% of perfect or better. <b>B</b>: 80%. <b>C</b>: 70%. <b>D</b>: 60%. <b>F</b>: below that.</li>
</ul>
<p>After surveying you can see a perfect layout and a breakdown of how each animal scored, and copy a spoiler-free result to share.</p>

<h2>Tips</h2>
<ul>
  <li>Start by working out the best you can do with nothing eaten. Then try feeding the predator one prey, then two, and compare.</li>
  <li>Prey that score little on their own are the cheapest to feed. A loner that cannot get its bonus, or a corner animal with no free corner, is often the one to give up.</li>
  <li>Put whoever benefits most next to a multiplying habitat. If the habitat boosts the predator, feeding becomes more tempting.</li>
  <li>The predator’s reach decides everything. An owl or a hawk reaches <i>around</i>, so it is much harder to keep away from the prey than a shark that only reaches <i>next to</i> it.</li>
  <li>Puzzles are designed so that both plans come close, usually within 15% of each other. If one plan looks far ahead, check the other one again.</li>
</ul>

<h2>Past puzzles</h2>
<p>Missed a day? Open the calendar button at the top of the game to play any earlier puzzle. The <a href="/archive/">archive</a> lists every puzzle so far, and the <a href="/field-guide/">field guide</a> introduces every animal you can meet.</p>

<p class="cta"><a class="btn" href="/">Play today’s puzzle</a></p>
</article>`;
  return page({ urlPath: '/how-to-play/', title: 'How to Play Zooku · Rules, Scoring and Tips', css, body,
    description: 'The full rules of Zooku, the daily animal puzzle: how prey and predators score, reach, habitats, feeding versus protecting, grades and strategy tips.' });
}

// ---------- field guide ----------
function themeFacts(themeKey) {
  const T = ZGEN.THEMES[themeKey];
  const eco = ECOSYSTEMS[themeKey];
  if (!eco) throw new Error(`scripts/lib/content.js has no ECOSYSTEMS entry for theme "${themeKey}"`);
  const pred = ZK.ANIMALS[T.pred.a];
  const hab = ZK.HABITATS[T.habitat.h];
  return { T, eco, pred, hab };
}

function fieldGuideIndex(css, ART, counts) {
  const cards = ZGEN.THEME_KEYS.map(k => {
    const { T, eco, pred, hab } = themeFacts(k);
    const prey = T.prey.map(p => ZK.ANIMALS[p.a].short).join(', ');
    return `<li class="scene-card"><a href="/field-guide/${slug(k)}/">
      <span class="scene-thumb">${svgArt(ART, T.pred.a)}</span>
      <span class="scene-text"><b>${esc(eco.name)}</b>
      <span>${esc(pred.name)} hunts ${esc(T.groups.prey.toLowerCase())}: ${esc(prey)}. Habitat: ${esc(hab.name)}.</span>
      ${counts[k] ? `<span class="meta">${counts[k]} puzzle${counts[k] === 1 ? '' : 's'} so far</span>` : ''}</span></a></li>`;
  }).join('\n');
  const animalCount = ZGEN.THEME_KEYS.reduce((n, k) => n + 1 + ZGEN.THEMES[k].prey.length, 0);
  const body = `
<article class="prose-page">
<h1>The Zooku field guide</h1>
<p class="lede">Every Zooku puzzle takes place in one of ${ZGEN.THEME_KEYS.length} scenes, each with its own predator, its own prey and a habitat they depend on. Here are all ${animalCount} animals you can meet, with notes on how they really live and how they play on the board.</p>
<ul class="scene-list">
${cards}
</ul>
</article>`;
  return page({ urlPath: '/field-guide/', title: 'Zooku Field Guide · Every Animal and Habitat', css, body,
    description: `Meet all ${animalCount} animals in Zooku across ${ZGEN.THEME_KEYS.length} scenes, from coral reefs to the Arctic tundra: real species, real natural history, and how each one plays in the puzzle.` });
}

function fieldGuidePage(css, ZART, themeKey, puzzles) {
  const ART = ZART.ART;
  const { T, eco, pred, hab } = themeFacts(themeKey);
  const g = T.groups;
  const words = r => RULE_WORDS[r].replace('{preyOne}', g.preyOne.toLowerCase()).replace('{habitat}', hab.short.toLowerCase());
  const reach = T.pred.reach === 'around' ? 'around it, diagonals included' : 'next to it (not diagonally)';
  const where = T.habitat.where === 'grid'
    ? 'It is painted onto one square of the board.'
    : `It runs along the ${T.habitat.sides.join(' or ')} edge of the board, beside the squares in that ${['left', 'right'].includes(T.habitat.sides[0]) ? 'column' : 'row'}.`;
  const card = (key, roleLine, extra = '') => {
    const a = ZK.ANIMALS[key];
    return `<section class="specimen" id="${key}">
  <div class="specimen-plate">${svgArt(ART, key)}</div>
  <div class="specimen-text">
    <h3>${esc(a.name)}</h3>
    ${a.latin ? `<p class="latin">${esc(a.latin)}</p>` : ''}
    <p class="chips"><span>${esc(a.cls)}</span><span>${esc(a.home)}</span><span>${esc(a.diet)}</span></p>
    <p>${esc(a.fact)}</p>
    <p class="in-game"><b>In Zooku:</b> ${roleLine}${extra}</p>
  </div>
</section>`;
  };
  const predCard = card(T.pred.a, `the predator in this scene. It reaches the squares ${reach}, scores a bonus for every ${g.preyOne.toLowerCase()} it reaches, and eats them.`);
  const preyCards = T.prey.map(p => {
    const rules = p.rules.map(words);
    const line = `one of the ${g.prey.toLowerCase()}. ${rules.length === 1 ? `It ${rules[0]}.` : `Depending on the day, it ${rules.slice(0, -1).join(', ')} or ${rules[rules.length - 1]}.`}`;
    return card(p.a, line, p.dup ? ' Some days you get two of them.' : '');
  }).join('\n');
  const recent = puzzles.slice(-6).reverse();
  const body = `
<article class="prose-page">
<p class="crumbs"><a href="/field-guide/">Field guide</a> › ${esc(eco.name)}</p>
<h1>${esc(eco.name)}</h1>
<div class="scene-banner" aria-hidden="true"><svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMax slice">${ZART.SCENES[T.scene] || ''}</svg></div>
${eco.intro.map(p => `<p>${esc(p)}</p>`).join('\n')}

<h2>How this scene plays</h2>
<p>On ${esc(eco.name)} days, your hand is five ${esc(g.prey.toLowerCase())} and one ${esc(pred.short.toLowerCase())}. The ${esc(pred.short.toLowerCase())} reaches the squares ${reach}${T.pred.reach === 'around' ? ', so keeping the prey safe takes careful spacing' : ''}.</p>
<p>The habitat is the <b>${esc(hab.name.toLowerCase())}</b>. ${where} ${esc(hab.fact)}</p>

<h2>The predator</h2>
${predCard}

<h2>The ${esc(g.prey.toLowerCase())}</h2>
${preyCards}

${recent.length ? `<h2>Recent ${esc(eco.name)} puzzles</h2>
<ul class="archive-mini">${recent.map(d => `<li><a href="/puzzle/${d.no}/">No. ${d.no}: ${esc(d.title)}</a> <span>${shortDate(d.date)}</span></li>`).join('')}</ul>` : ''}

<p class="cta"><a class="btn" href="/">Play today’s puzzle</a> <a class="btn plain" href="/how-to-play/">How to play</a></p>
</article>`;
  return page({ urlPath: `/field-guide/${slug(themeKey)}/`, scene: T.scene, css, body,
    title: `${eco.name}: ${pred.short} and ${g.prey} · Zooku Field Guide`,
    description: `${eco.name} in Zooku: meet the ${pred.name.toLowerCase()} and the ${g.prey.toLowerCase()} it hunts (${T.prey.map(p => ZK.ANIMALS[p.a].name).join(', ')}), with natural-history notes and how each plays in the puzzle.` });
}

// ---------- archive ----------
function archive(css, past) {
  const byMonth = new Map();
  [...past].reverse().forEach(d => {
    const m = new Date(d.date + 'T12:00:00Z').toLocaleDateString('en-US', { timeZone: 'UTC', month: 'long', year: 'numeric' });
    if (!byMonth.has(m)) byMonth.set(m, []);
    byMonth.get(m).push(d);
  });
  const theme = d => ZGEN.THEME_KEYS.find(k => ZGEN.THEMES[k].scene === d.scene);
  const row = d => {
    const k = theme(d), eco = k && ECOSYSTEMS[k];
    const habitat = ZK.habitatOf(d);
    const cast = d.hand.map(t => ZK.ANIMALS[t.a].short);
    const uniq = [...new Set(cast)];
    return `<li id="no-${d.no}"><div class="arc-head"><b><a href="/puzzle/${d.no}/">No. ${d.no}: ${esc(d.title)}</a></b><time datetime="${d.date}">${longDate(d.date)}</time></div>
      <p>${eco ? `<a href="/field-guide/${slug(k)}/">${esc(eco.name)}</a> · ` : ''}${esc(d.groups.prey)} and ${esc(d.groups.pred)} · ${d.rocks.length} rock${d.rocks.length === 1 ? '' : 's'}${habitat ? ` · ${esc(ZK.HABITATS[habitat.h].name)} (${habitat.eff.t === 'mult' ? '×' + habitat.eff.v : '+' + habitat.eff.v})` : ''}</p>
      <p class="cast">${uniq.map(esc).join(', ')}</p></li>`;
  };
  const body = `
<article class="prose-page">
<h1>Puzzle archive</h1>
<p class="lede">Every Zooku puzzle so far, newest first. Tap a puzzle’s name to play it; each one has its own address, so you can bookmark or share it. Answers are never published here, so the archive is safe to browse before you play.</p>
${[...byMonth].map(([m, days]) => `<h2>${m}</h2>\n<ol class="archive" reversed>${days.map(row).join('\n')}</ol>`).join('\n')}
</article>`;
  return page({ urlPath: '/archive/', title: 'Zooku Puzzle Archive · Every Daily Puzzle', css, body,
    description: `All ${past.length} Zooku daily animal puzzles so far, with each day’s scene, animals and habitat. No spoilers.` });
}

// ---------- about, contact, privacy ----------
function about(css) {
  const body = `
<article class="prose-page">
<h1>About Zooku</h1>
${ABOUT.map(([h, ps]) => `<h2>${esc(h)}</h2>\n${ps.map(p => `<p>${p}</p>`).join('\n')}`).join('\n')}
<h2>Get in touch</h2>
<p>Ideas, bug reports and questions are always welcome. See the <a href="/contact/">contact page</a>.</p>
<p class="cta"><a class="btn" href="/">Play today’s puzzle</a></p>
</article>`;
  return page({ urlPath: '/about/', title: 'About Zooku · The Daily Animal Puzzle', css, body,
    description: 'Zooku is a free, independent daily logic puzzle about predators, prey and the places they live. Here is how it is made.' });
}

function contact(css) {
  const body = `
<article class="prose-page">
<h1>Contact</h1>
<p class="lede">Zooku is made by one person, and every message is read.</p>
<p>To report a bug, suggest an animal or a scene, vote on what gets built next, or just say hello, use the feedback form. It takes a minute and you don’t need an account.</p>
<p class="cta"><a class="btn" href="${FEEDBACK_URL}" target="_blank" rel="noopener">Send feedback ↗</a></p>
<p>When you report a bug, it helps to mention the puzzle number, the device and browser you were using, and what you expected to happen.</p>
<p>The feedback form is a Google Form, so anything you send through it is handled under <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google’s privacy policy</a>. See the <a href="/privacy/">Zooku privacy policy</a> for more.</p>
</article>`;
  return page({ urlPath: '/contact/', title: 'Contact Zooku', css, body,
    description: 'Report a bug, suggest an animal or vote on new features for Zooku, the daily animal puzzle.' });
}

function privacy(css, updated) {
  const body = `
<article class="prose-page">
<h1>Privacy policy</h1>
<p class="lede">Last updated ${longDate(updated)}.</p>
<p>Zooku is a free puzzle game at zooku.app. You don’t need an account to play, and we never ask for your name, email or any other personal details. This page explains what does get stored and who else is involved.</p>

<h2>Your game progress</h2>
<p>Your boards, best scores and surveys are saved in your browser’s local storage, on your own device. They are never sent to us. Clearing your browser data erases them.</p>

<h2>Advertising</h2>
<p>Zooku shows ads to pay for itself, using Google AdSense. Google and its partners may use cookies and similar technologies to show ads, to measure how ads perform and to limit how often you see the same ad.</p>
<ul>
  <li>Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or other websites.</li>
  <li>Google’s use of advertising cookies enables it and its partners to serve ads to you based on your visits to this site and/or other sites on the internet.</li>
  <li>You can opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener">Google Ads Settings</a>. You can also opt out of some third-party vendors’ use of cookies for personalized advertising at <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener">aboutads.info</a>.</li>
</ul>
<p>Read <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener">how Google uses information from sites that use its services</a> and <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener">how Google uses cookies in advertising</a>. Where the law requires it, such as in the European Economic Area and the UK, you will be asked for consent before personalized ads are shown.</p>

<h2>Site statistics</h2>
<p>We use Cloudflare Web Analytics to count visits and page loads. It does not use cookies and does not track you across other websites. Like any website host, Cloudflare also processes basic request information, such as IP addresses, to deliver the site and protect it from abuse.</p>

<h2>Feedback form</h2>
<p>The “Vote &amp; suggest” and feedback links open a Google Form. Anything you send there is collected by Google Forms under <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google’s privacy policy</a>, and we only use it to improve Zooku.</p>

<h2>Children</h2>
<p>Zooku is a general-audience game. We do not knowingly collect personal information from children.</p>

<h2>Changes and questions</h2>
<p>If this policy changes, the new version will be posted on this page with a new date. Questions about privacy can be sent through the <a href="/contact/">contact page</a>.</p>
</article>`;
  return page({ urlPath: '/privacy/', title: 'Privacy Policy · Zooku', css, body,
    description: 'What Zooku stores, how ads and cookies work on the site, and how to opt out of personalized advertising.' });
}

// ---------- everything ----------
/**
 * Writes the pages into OUT and returns their URL paths (for the sitemap).
 * past: the public days that are already playable (date <= today), oldest first.
 */
function build({ ROOT, OUT, css, past, today }) {
  const ZART = loadArt(ROOT);
  const write = (urlPath, html) => {
    const file = path.join(OUT, urlPath, 'index.html');
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, html);
    return urlPath;
  };
  const byTheme = {};
  ZGEN.THEME_KEYS.forEach(k => { byTheme[k] = past.filter(d => d.scene === ZGEN.THEMES[k].scene); });
  const counts = Object.fromEntries(Object.entries(byTheme).map(([k, v]) => [k, v.length]));
  const paths = [
    write('/how-to-play/', howToPlay(css)),
    write('/field-guide/', fieldGuideIndex(css, ZART.ART, counts)),
    ...ZGEN.THEME_KEYS.map(k => write(`/field-guide/${slug(k)}/`, fieldGuidePage(css, ZART, k, byTheme[k]))),
    write('/archive/', archive(css, past)),
    write('/about/', about(css)),
    write('/contact/', contact(css)),
    write('/privacy/', privacy(css, PRIVACY_UPDATED)),
  ];
  const urls = ['/', ...paths];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${SITE}${u}</loc>${u === '/' || u === '/archive/' ? `<lastmod>${today}</lastmod>` : ''}</url>`).join('\n')}
</urlset>
`;
  fs.writeFileSync(path.join(OUT, 'sitemap.xml'), sitemap);
  return urls;
}
const PRIVACY_UPDATED = '2026-11-05';   // change when the privacy policy text changes

module.exports = { build, NAV };
