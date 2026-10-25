const W = window.WOORDEN; // [{id,w,g,s,k,r,p:[[film,sid]],c:[{f,z,x:[deel,start,duur],v}]}]
const ORD = {}; // id -> {oordeel, notitie}
let db = null, nu = 0, lijstMax = 150;
const $ = id => document.getElementById(id);
const col = id => 'oordeel' + (id[0] < 'l' ? '1' : '2');

// ---- audio: één Audio per deelbestand
const SPELERS = {}; let stopT = null, actief = null;
function speel(ci) {
  const w = W[nu], c = w.c[ci]; if (!c) return;
  const [deel, start, duur] = c.x;
  const a = SPELERS[deel] || (SPELERS[deel] = new Audio('audio/deel' + deel + '.mp3'));
  Object.values(SPELERS).forEach(x => x !== a && x.pause());
  clearTimeout(stopT); markeer(ci);
  const go = () => { a.currentTime = start; a.play().catch(() => {}); stopT = setTimeout(() => { a.pause(); markeer(-1); }, (duur + 0.05) * 1000); };
  if (a.readyState >= 1) go(); else { a.addEventListener('loadedmetadata', go, { once: true }); a.load(); }
}
function markeer(ci) { actief = ci; document.querySelectorAll('.speel').forEach((b, i) => b.classList.toggle('aan', i === ci)); }

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
  $('k-clips').innerHTML = w.c.map((c, i) => `<div class="clip"><button type="button" class="speel" data-c="${i}" aria-label="Fragment ${i + 1} afspelen">▶</button><div class="zin"><q>${zinMet(c.z, w.w)}</q><small>${esc(c.f)}${c.v ? ' · fragment wat ruimer, woord zit ergens in het midden' : ''}</small></div></div>`).join('') || '<p class="melding">Geen fragment gevonden.</p>';
  document.querySelectorAll('.speel').forEach(b => b.onclick = () => speel(+b.dataset.c));
  document.querySelectorAll('.kaart .keuze button[data-o]').forEach(b => b.classList.toggle('gekozen', b.dataset.o === o.oordeel));
  $('k-notitie').value = o.notitie || '';
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
  document.querySelectorAll('.rij').forEach(r => { const ga = () => { nu = +r.dataset.i; toonKaart(); $('kaart').scrollIntoView({ behavior: 'smooth', block: 'start' }); }; r.onclick = ga; r.onkeydown = e => { if (e.key === 'Enter') ga(); }; });
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
    await db.collection(col(id)).doc(id).set({ woord: w.w, oordeel: ORD[id].oordeel || '', notitie: ORD[id].notitie || '', films: w.p.map(p => p[0] + ' ' + p[1]).join(', '), tijd: new Date().toISOString() });
    $('opslag').textContent = 'Opgeslagen.';
  } catch (e) { $('opslag').textContent = 'Opslaan lukte niet (' + (e.code || e.message) + '). Probeer het opnieuw.'; }
}
function kies(o) {
  const w = W[nu]; bewaar(w.id, { oordeel: o, notitie: $('k-notitie').value.trim() });
  nu = volgendeOpen(nu); toonKaart(); setTimeout(() => speel(0), 150);
}

// ---- bediening
document.querySelectorAll('.kaart .keuze button[data-o]').forEach(b => b.onclick = () => kies(b.dataset.o));
$('vorige').onclick = () => { nu = Math.max(0, nu - 1); toonKaart(); };
$('volgende').onclick = () => { nu = Math.min(W.length - 1, nu + 1); toonKaart(); };
$('k-notitie').addEventListener('change', () => { const w = W[nu]; if (ORD[w.id]?.oordeel || $('k-notitie').value.trim()) bewaar(w.id, { notitie: $('k-notitie').value.trim() }); });
['f-toon', 'f-kans'].forEach(id => $(id).onchange = () => { lijstMax = 150; toonLijst(); });
$('f-zoek').oninput = () => { lijstMax = 150; toonLijst(); };
document.addEventListener('keydown', e => {
  if (/INPUT|SELECT|TEXTAREA/.test(e.target.tagName) || e.metaKey || e.ctrlKey || e.altKey) return;
  const k = e.key.toLowerCase();
  if (k === ' ') { e.preventDefault(); speel(actief >= 0 && actief !== null ? actief : 0); }
  else if (k === '1' || k === '2') speel(+k - 1);
  else if (k === 'g') kies('goed'); else if (k === 'f') kies('fout'); else if (k === 't') kies('twijfel');
  else if (k === 'arrowright') $('volgende').click(); else if (k === 'arrowleft') $('vorige').click();
});

telling(); toonKaart(); toonLijst();

// ---- verbinden met de gedeelde opslag
(async () => {
  try { db = await window.claude?.use?.('db'); } catch (e) { db = null; }
  if (!db) { $('opslag').textContent = 'Geen verbinding met de opslag: je kunt luisteren, maar oordelen worden niet bewaard.'; return; }
  $('opslag').textContent = 'Verbonden: elk oordeel wordt meteen bewaard.';
  let eerste = 2;
  for (const c of ['oordeel1', 'oordeel2']) {
    db.collection(c).onSnapshot(snap => {
      for (const d of snap.docs) { const x = d.data(); if (x) ORD[d.id] = { oordeel: x.oordeel || undefined, notitie: x.notitie || '' }; }
      telling(); toonLijst();
      if (eerste > 0 && --eerste === 0) { if (ORD[W[nu].id]?.oordeel) nu = volgendeOpen(nu); toonKaart(); }
    }, err => { $('opslag').textContent = 'Verbinding met de opslag viel weg (' + err.code + '). Herlaad de pagina.'; });
  }
})();
