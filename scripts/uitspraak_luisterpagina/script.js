const W = window.WOORDEN; // [{id,w,g,s,k,r,p:[[film,sid]],c:[{f,z,x:[deel,start,duur],v}]}]
const ORD = {}; // id -> {oordeel, notitie}
let db = null, nu = 0, lijstMax = 150;
const $ = id => document.getElementById(id);
const col = id => 'oordeel' + (id[0] < 'l' ? '1' : '2');

// ---- audio: één Audio per deelbestand
const SPELERS = {}; let stopT = null, actief = null, frag = 0, vooraf = false;
function laadAlles() { if (vooraf) return; vooraf = true; const n = Math.max(...W.flatMap(w => w.c.map(c => c.x[0]))); for (let d = 1; d <= n; d++) if (!SPELERS[d]) { const a = new Audio('audio/deel' + d + '.mp3'); a.preload = 'auto'; SPELERS[d] = a; } }
function speel(ci) {
  const w = W[nu], c = w.c[ci]; if (!c) return;
  const [deel, start, duur] = c.x;
  const a = SPELERS[deel] || (SPELERS[deel] = new Audio('audio/deel' + deel + '.mp3'));
  Object.values(SPELERS).forEach(x => x !== a && x.pause());
  clearTimeout(stopT); frag = ci; markeer(ci); laadAlles();
  const go = () => { a.currentTime = start; a.play().catch(() => {}); stopT = setTimeout(() => { a.pause(); markeer(-1); }, (duur + 0.05) * 1000); };
  if (a.readyState >= 1) go(); else { a.addEventListener('loadedmetadata', go, { once: true }); a.load(); }
}
function markeer(ci) { actief = ci; document.querySelectorAll('.speel').forEach((b, i) => b.classList.toggle('aan', i === ci)); document.querySelectorAll('.clip').forEach((c, i) => c.classList.toggle('nu', i === frag)); }
function naarWoord(i) { nu = i; frag = 0; toonKaart(); speel(0); }

// ---- tekenen
function esc(s) { return String(s).replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m])); }
function zinMet(z, woord) {
  const i = z.toLowerCase().indexOf(woord.toLowerCase());
  if (i < 0) return esc(z);
  return esc(z.slice(0, i)) + '<mark>' + esc(z.slice(i, i + woord.length)) + '</mark>' + esc(z.slice(i + woord.length));
}
function toonKaart() {
  const w = W[nu]; if (!w) return;
  const o = ORD[w.id] || {};
  $('k-lab').textContent = `Woord ${nu + 1} van ${W.length}` + (w.k === 'hoog' ? ' · grote kans op fout' : '');
  $('k-woord').textContent = w.w;
  const meta = [];
  if (w.g) meta.push(`<span>Gewenst: <b>${esc(w.g)}</b></span>`);
  if (w.s && w.s !== 'zoals geschreven') meta.push(`<span>Stem-invoer: <b>${esc(w.s)}</b></span>`);
  meta.push(`<span>${w.p.length} ${w.p.length === 1 ? 'plek' : 'plekken'} in ${new Set(w.p.map(p => p[0])).size} film(s)</span>`);
  if (w.r) meta.push(`<span>${esc(w.r)}</span>`);
  $('k-meta').innerHTML = meta.join('');
  const pc = o.clips || {};
  $('k-clips').innerHTML = w.c.map((c, i) => `<div class="clip"><button type="button" class="speel" data-c="${i}" aria-label="Fragment ${i + 1} afspelen">▶</button><div class="zin"><q>${zinMet(c.z, w.w)}</q><small>${w.c.length > 1 ? 'Fragment ' + (i + 1) + ' · ' : ''}${esc(c.f)}${c.v ? ' · fragment wat ruimer, woord zit ergens in het midden' : ''}</small>${w.c.length > 1 ? `<div class="per" role="group" aria-label="Oordeel fragment ${i + 1}"><button type="button" data-pc="${i}" data-po="goed" class="${pc[i] === 'goed' ? 'gekozen' : ''}">✓ goed</button><button type="button" data-pc="${i}" data-po="fout" class="${pc[i] === 'fout' ? 'gekozen' : ''}">✗ fout</button><button type="button" data-best="${i}" class="${o.beste === i ? 'gekozen' : ''}" aria-label="Dit fragment klinkt het best">★ klinkt het best</button></div>` : ''}</div></div>`).join('') || '<p class="melding">Geen fragment gevonden.</p>';
  document.querySelectorAll('.speel').forEach(b => b.onclick = () => speel(+b.dataset.c));
  document.querySelectorAll('[data-pc]').forEach(b => b.onclick = () => perClip(+b.dataset.pc, b.dataset.po));
  document.querySelectorAll('[data-best]').forEach(b => b.onclick = () => { const i = +b.dataset.best; bewaar(W[nu].id, { beste: (ORD[W[nu].id] || {}).beste === i ? -1 : i }); toonKaart(); });
  document.querySelectorAll('.kaart .keuze button[data-o]').forEach(b => b.classList.toggle('gekozen', b.dataset.o === o.oordeel));
  $('k-notitie').value = o.notitie || '';
  document.querySelectorAll('.clip').forEach((c, i) => c.classList.toggle('nu', i === frag && w.c.length > 1));
  document.querySelectorAll('.rij').forEach(r => r.classList.toggle('nu', +r.dataset.i === nu));
}
function telling() {
  let k = 0, f = 0, t = 0;
  for (const w of W) { const o = ORD[w.id]?.oordeel; if (o) k++; if (o === 'fout') f++; if (o === 'twijfel') t++; }
  $('t-klaar').textContent = k; $('t-tot').textContent = W.length; $('t-fout').textContent = f; $('t-twijfel').textContent = t;
  $('balk').style.width = (100 * k / W.length) + '%';
}
function filter() {
  const toon = $('f-toon').value, kans = $('f-kans').value, q = $('f-zoek').value.trim().toLowerCase();
  const uit = [];
  W.forEach((w, i) => {
    const o = ORD[w.id]?.oordeel;
    if (toon === 'open' && o) return;
    if (toon !== 'open' && toon !== 'alles' && o !== toon) return;
    if (kans === 'hoog' && w.k !== 'hoog') return;
    if (kans === 'verruimd' && !w.c.some(c => c.v)) return;
    if (q && !w.w.toLowerCase().includes(q) && !w.p.some(p => p[0].toLowerCase().includes(q))) return;
    uit.push(i);
  });
  return uit;
}
function toonLijst() {
  const idx = filter();
  const rijen = idx.slice(0, lijstMax).map(i => {
    const w = W[i], o = ORD[w.id]?.oordeel;
    return `<div class="rij${i === nu ? ' nu' : ''}" data-i="${i}" role="button" tabindex="0"><div class="w">${esc(w.w)}<small>${esc(w.p[0][0])}${w.p.length > 1 ? ' +' + (w.p.length - 1) : ''}</small></div><span class="chip ${o || ''}">${o || 'open'}</span></div>`;
  });
  if (idx.length > lijstMax) rijen.push(`<div class="meer"><button type="button" id="meer">Nog ${idx.length - lijstMax} tonen</button></div>`);
  $('lijst').innerHTML = rijen.join('') || '<div class="meer melding">Geen woorden in deze selectie.</div>';
  document.querySelectorAll('.rij').forEach(r => { const ga = () => { naarWoord(+r.dataset.i); $('kaart').scrollIntoView({ behavior: 'smooth', block: 'start' }); }; r.onclick = ga; r.onkeydown = e => { if (e.key === 'Enter') ga(); }; });
  const m = $('meer'); if (m) m.onclick = () => { lijstMax += 300; toonLijst(); };
}
function volgendeOpen(van) {
  for (let i = van + 1; i < W.length; i++) if (!ORD[W[i].id]?.oordeel) return i;
  for (let i = 0; i <= van; i++) if (!ORD[W[i].id]?.oordeel) return i;
  return Math.min(van + 1, W.length - 1);
}

// ---- opslaan
async function bewaar(id, velden) {
  const w = W.find(x => x.id === id);
  ORD[id] = Object.assign({}, ORD[id], velden);
  telling(); toonLijst();
  if (!db) { $('opslag').textContent = 'Niet verbonden: dit oordeel staat alleen in deze weergave.'; return; }
  try {
    const o = ORD[id], fr = {};
    w.c.forEach((c, i) => { if (o.clips && o.clips[i]) fr[i] = { oordeel: o.clips[i], film: c.f, zin: c.z }; });
    await db.collection(col(id)).doc(id).set({ woord: w.w, oordeel: o.oordeel || '', fragmenten: fr, beste: o.beste >= 0 ? o.beste : -1, notitie: o.notitie || '', films: w.p.map(p => p[0] + ' ' + p[1]).join(', '), tijd: new Date().toISOString() });
    $('opslag').textContent = 'Opgeslagen.';
  } catch (e) { $('opslag').textContent = 'Opslaan lukte niet (' + (e.code || e.message) + '). Probeer het opnieuw.'; }
}
// oordeel per fragment; het woord krijgt 'fout' zodra één fragment fout is, 'goed' als alle fragmenten goed zijn
function perClip(i, po, zet) {
  const w = W[nu], o = ORD[w.id] || {}, pc = Object.assign({}, o.clips || {});
  pc[i] = zet ? po : (pc[i] === po ? undefined : po); if (!pc[i]) delete pc[i];
  const v = Object.values(pc);
  let oordeel = o.oordeel;
  if (v.includes('fout')) oordeel = 'fout';
  else if (v.length === w.c.length && v.every(x => x === 'goed')) oordeel = 'goed';
  else if (o.oordeel !== 'twijfel') oordeel = undefined;
  bewaar(w.id, { clips: pc, oordeel, notitie: $('k-notitie').value.trim() });
  if (oordeel && Object.keys(pc).length === w.c.length) { naarWoord(volgendeOpen(nu)); return true; }
  toonKaart(); return false;
}
// G/F met het toetsenbord: oordeel over het fragment dat nu aan de beurt is, dan meteen het volgende fragment of woord
function toets(o) {
  const w = W[nu];
  if (w.c.length < 2) return kies(o);
  if (perClip(frag, o, true)) return;
  const rest = w.c.map((c, i) => i).filter(i => !(ORD[w.id].clips || {})[i]);
  const volg = rest.find(i => i > frag) ?? rest[0] ?? Math.min(frag + 1, w.c.length - 1);
  frag = volg; toonKaart(); speel(volg);
}
function kies(o) {
  const w = W[nu], pc = {}; if (o !== 'twijfel') w.c.forEach((c, i) => pc[i] = o);
  bewaar(w.id, { oordeel: o, clips: o === 'twijfel' ? (ORD[w.id] || {}).clips || {} : pc, notitie: $('k-notitie').value.trim() });
  naarWoord(volgendeOpen(nu));
}

// ---- bediening
document.querySelectorAll('.kaart .keuze button[data-o]').forEach(b => b.onclick = () => kies(b.dataset.o));
$('vorige').onclick = () => naarWoord(Math.max(0, nu - 1));
$('volgende').onclick = () => naarWoord(Math.min(W.length - 1, nu + 1));
$('k-notitie').addEventListener('change', () => { const w = W[nu]; if (ORD[w.id]?.oordeel || $('k-notitie').value.trim()) bewaar(w.id, { notitie: $('k-notitie').value.trim() }); });
['f-toon', 'f-kans'].forEach(id => $(id).onchange = () => { lijstMax = 150; toonLijst(); });
$('f-zoek').oninput = () => { lijstMax = 150; toonLijst(); };
$('k-notitie').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === 'Escape') { e.preventDefault(); $('k-notitie').dispatchEvent(new Event('change')); $('k-notitie').blur(); } });
document.addEventListener('keydown', e => {
  if (/INPUT|SELECT|TEXTAREA/.test(e.target.tagName) || e.metaKey || e.ctrlKey || e.altKey) return;
  const k = e.key.toLowerCase(), w = W[nu];
  const doe = f => { e.preventDefault(); if (document.activeElement && document.activeElement !== document.body) document.activeElement.blur(); f(); };
  if (k === ' ' || k === 'enter') doe(() => speel(frag));
  else if (/^[1-9]$/.test(k) && +k <= w.c.length) doe(() => speel(+k - 1));
  else if (k === 'g') doe(() => toets('goed'));
  else if (k === 'f') doe(() => toets('fout'));
  else if (k === 'a') doe(() => kies('goed'));
  else if (k === 't') doe(() => kies('twijfel'));
  else if (k === 'b') doe(() => { bewaar(w.id, { beste: (ORD[w.id] || {}).beste === frag ? -1 : frag }); toonKaart(); });
  else if (k === 'n') doe(() => $('k-notitie').focus());
  else if (k === 'arrowright') doe(() => naarWoord(Math.min(W.length - 1, nu + 1)));
  else if (k === 'arrowleft') doe(() => naarWoord(Math.max(0, nu - 1)));
  else if (k === 'arrowdown' && w.c.length > 1) doe(() => speel(Math.min(w.c.length - 1, frag + 1)));
  else if (k === 'arrowup' && w.c.length > 1) doe(() => speel(Math.max(0, frag - 1)));
});
document.addEventListener('pointerdown', laadAlles, { once: true });

telling(); toonKaart(); toonLijst();

// ---- verbinden met de gedeelde opslag
(async () => {
  try { db = await window.claude?.use?.('db'); } catch (e) { db = null; }
  if (!db) { $('opslag').textContent = 'Geen verbinding met de opslag: je kunt luisteren, maar oordelen worden niet bewaard.'; return; }
  $('opslag').textContent = 'Verbonden: elk oordeel wordt meteen bewaard.';
  let eerste = 2;
  for (const c of ['oordeel1', 'oordeel2']) {
    db.collection(c).onSnapshot(snap => {
      for (const d of snap.docs) { const x = d.data(); if (!x) continue; const pc = {}; for (const [k, v] of Object.entries(x.fragmenten || {})) pc[k] = v.oordeel; ORD[d.id] = { oordeel: x.oordeel || undefined, notitie: x.notitie || '', clips: pc, beste: typeof x.beste === 'number' ? x.beste : -1 }; }
      telling(); toonLijst();
      if (eerste > 0 && --eerste === 0) { if (ORD[W[nu].id]?.oordeel) nu = volgendeOpen(nu); toonKaart(); }
    }, err => { $('opslag').textContent = 'Verbinding met de opslag viel weg (' + err.code + '). Herlaad de pagina.'; });
  }
})();
