// Evolutie v2 · tekenronde 2 (23 okt 2026) — Micro-objecten opnieuw getekend volgens Part C2 en C9 (Moleculen, Cellen).
// Wordt NA teken_evo1..8 geladen en overschrijft daar: bacterie, plasmideRing, pilus, antibioticum, griepVirus (evo4),
// chromosoom (evo6), chromosoom1, chromosoomPaar, geslachtscel (evo1), sikkelcel (evo5) en rodeBloedcel (lib_bio).
// Nieuw en herbruikbaar: dnaDraad (DNA als touw of dubbele helix langs een pad) en nucleoide (bacterie-DNA als rozet van lussen).
// Functienamen en parameters zijn gelijk aan de oude, zodat alle keyframes vanzelf de nieuwe tekening gebruiken.

// ---------- hulpjes ----------
// Let op: lib_cast.js herdefinieert _mix (geeft rgb()), dus _lt/_dk leveren geen hex meer en rgba(_lt(..)) wordt zwart. Daarom eigen hex-mengers.
const _mvL = (h, k = 0.25) => _mixHex(h, "#FFFFFF", k), _mvD = (h, k = 0.25) => _mixHex(h, "#000000", k);
function _mvCR(P, closed, per = 10) { // Catmull-Rom-punten door P
  const n = P.length, out = []; if (n < 2) return P.slice(); const N = closed ? n : n - 1;
  for (let i = 0; i < N; i++) { const p0 = P[closed ? (i - 1 + n) % n : Math.max(0, i - 1)], p1 = P[i], p2 = P[(i + 1) % n], p3 = P[closed ? (i + 2) % n : Math.min(n - 1, i + 2)];
    for (let k = 0; k < per; k++) { const t = k / per, t2 = t * t, t3 = t2 * t;
      out.push([0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
        0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3)]); } }
  if (!closed) out.push(P[n - 1].slice()); return out; }
function _mvGelijk(P, step, closed) { // punten op gelijke booglengte (+ normaal en s)
  const Q = closed ? P.concat([P[0]]) : P; const L = [0]; for (let i = 1; i < Q.length; i++) L.push(L[i - 1] + Math.hypot(Q[i][0] - Q[i - 1][0], Q[i][1] - Q[i - 1][1]));
  const tot = L[L.length - 1], n = Math.max(2, Math.round(tot / step)), out = []; let j = 1;
  for (let k = 0; k <= n; k++) { const d = k / n * tot; while (j < Q.length - 1 && L[j] < d) j++; const f = (d - L[j - 1]) / Math.max(1e-6, L[j] - L[j - 1]);
    const a = Q[j - 1], b = Q[j], an = Math.atan2(b[1] - a[1], b[0] - a[0]); out.push({ x: a[0] + (b[0] - a[0]) * f, y: a[1] + (b[1] - a[1]) * f, nx: -Math.sin(an), ny: Math.cos(an), s: d }); }
  return out; }
function _mvPad(ctx, P, closed = true) { ctx.beginPath(); bioPad(ctx, P, closed); }

// =====================================================================================
// DNA-DRAAD. Recept (Part C9 Moleculen): rechtsdraaiende dubbele helix, 2 nm breed, één winding per ±10 bp (3,4 nm),
// grote en kleine groef ongelijk; kleur paars. Op een kleine schaal (w < 6 px) is de helix niet meer te zien: dan een
// touw met een lichte rand en een donkere kern die om de halve winding onderbreekt (suggereert de draaiing).
// Bekende fouten: platte ladder; linksdraaiend; een te dun lijntje dat in de achtergrond verdwijnt (Kamiel: 'ietsje dikker').
// P = punten van het pad; o.w = breedte in px; o.dicht = ring (plasmide, bacteriechromosoom).
// =====================================================================================
function dnaDraad(ctx, P, o = {}) {
  const { w = 4, kleur = C.kernR, donker = C.kern, a = 1, dicht = false, helix = 'auto', fase = 0, glad = true } = o; if (a <= 0.01 || P.length < 2) return;
  const pts = glad ? _mvCR(P, dicht, 8) : P.slice();
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const metHelix = helix === true || (helix === 'auto' && w >= 6);
  if (!metHelix) {
    const pad = () => { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (const p of pts) ctx.lineTo(p[0], p[1]); if (dicht) ctx.closePath(); };
    pad(); ctx.strokeStyle = kleur; ctx.lineWidth = w; ctx.stroke();
    if (w >= 2.4) { pad(); ctx.strokeStyle = donker; ctx.lineWidth = w * 0.42; const per = w * 1.7; ctx.setLineDash([per * 0.55, per * 0.45]); ctx.lineDashOffset = -fase * per; ctx.stroke(); ctx.setLineDash([]); }
    ctx.restore(); return; }
  // dubbele helix langs het pad
  const S = _mvGelijk(pts, Math.max(1.2, w * 0.18), dicht), hw = w / 2, pitch = w * 1.75, sl = Math.max(1.1, w * 0.24);
  const off = (q, k) => { const ph = q.s / pitch * 6.283 + fase * 6.283 + (k ? 2.3 : 0); return [q.x + q.nx * hw * Math.sin(ph), q.y + q.ny * hw * Math.sin(ph), Math.cos(ph)]; };
  const streng = (k, voor) => { ctx.strokeStyle = voor ? _mvL(kleur, 0.18) : donker; ctx.lineWidth = sl; ctx.beginPath(); let aan = false;
    for (let i = 0; i < S.length; i++) { const [px, py, z] = off(S[i], k); const zij = voor ? z >= 0 : z < 0; if (zij) { if (!aan) { ctx.moveTo(px, py); aan = true; } else ctx.lineTo(px, py); } else aan = false; } ctx.stroke(); };
  streng(0, false); streng(1, false);
  // baseparen: sporten loodrecht op de as, ±4 per winding getekend (rustig), iets transparant
  ctx.strokeStyle = rgba(kleur, 0.55); ctx.lineWidth = Math.max(0.8, sl * 0.55); ctx.beginPath(); const stap = pitch / 4;
  let volg = 0; for (const q of S) { if (q.s < volg) continue; volg = q.s + stap; const A = off(q, 0), B = off(q, 1); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); } ctx.stroke();
  streng(0, true); streng(1, true);
  ctx.restore(); }

// =====================================================================================
// NUCLEOÏDE. Recept: het bacteriechromosoom is één ringvormig DNA-molecuul (E. coli 4,6 Mbp, ±1,5 mm lang) zonder
// kernmembraan, opgevouwen in ±400 superspiraal-lussen van 10–20 kb rond een kern (rozet). Bron: BioNumbers 103792;
// Postow e.a. 2004 (Genes Dev 18:1766). Getekend: één gesloten draad die 10–16 lussen uitstulpt, een deel getwist
// (plectoneem: de armen kruisen elkaar), samen een onregelmatige kluwen in het midden van de cel.
// Bekende fouten: losse krul zonder einde (het is een ring); DNA in een kern met membraan.
// (cx, cy) = midden; rx, ry = halve maten; o.T = puntafbeelding (bv. voor een gebogen bacterie).
// =====================================================================================
function _chromPad(ctx, cx, top, h, breed, cen, seed = 0) {
  const R = breed / 2, rc = R * 0.95, N = 44, Lz = [], Rz = [];
  const hw = (t, ph) => { const dE = Math.min(t, 1 - t) * h; const cap = dE >= rc ? 1 : Math.sqrt(Math.max(0, 1 - Math.pow((rc - dE) / rc, 2)));
    const con = 1 - 0.4 * Math.exp(-Math.pow((t - cen) * h / (breed * 0.34), 2)); const wob = 1 + 0.035 * Math.sin(t * h / (breed * 0.5) + ph); return R * cap * con * wob; };
  for (let i = 0; i <= N; i++) { const t = (1 - Math.cos(Math.PI * i / N)) / 2; Lz.push([cx - hw(t, seed), top + t * h]); }
  for (let i = N - 1; i >= 1; i--) { const t = (1 - Math.cos(Math.PI * i / N)) / 2; Rz.push([cx + hw(t, seed + 1.7), top + t * h]); }
  ctx.beginPath(); bioPad(ctx, Lz.concat(Rz), true); }
const _GBAND = [[0.07, 0.03, 1], [0.15, 0.05, 1], [0.22, 0.025, 0], [0.4, 0.04, 1], [0.47, 0.025, 0], [0.66, 0.05, 1], [0.73, 0.03, 0], [0.8, 0.055, 1], [0.9, 0.03, 1]];
function _chromTekening(ctx, cx, top, h, breed, cen, vul, rand, gen, seed) {
  _chromPad(ctx, cx, top, h, breed, cen, seed); shape(ctx, vul, rand, Math.max(1.2, breed * 0.06));
  ctx.save(); _chromPad(ctx, cx, top, h, breed, cen, seed); ctx.clip();
  const zak = breed * 0.12; // banden licht gebogen (het chromosoom is rond)
  for (const [p, d, donker] of _GBAND) { if (gen && Math.abs(p - gen.band) < gen.halfT + d) continue; if (Math.abs(p - cen) < 0.05) continue;
    const y0 = top + p * h, hh = Math.max(2, d * h); ctx.beginPath(); ctx.moveTo(cx - breed, y0); ctx.quadraticCurveTo(cx, y0 + zak, cx + breed, y0); ctx.lineTo(cx + breed, y0 + hh); ctx.quadraticCurveTo(cx, y0 + hh + zak, cx - breed, y0 + hh); ctx.closePath();
    ctx.fillStyle = donker ? rgba(_mvD(vul, 0.35), 0.75) : rgba(rand, 0.35); ctx.fill(); }
  // chromatine: fijne lichte lusjes langs de randen (opgevouwen DNA-draad), heel rustig
  if (breed >= 18) { ctx.strokeStyle = rgba(rand, 0.22); ctx.lineWidth = Math.max(0.8, breed * 0.035); for (const zij of [-1, 1]) { ctx.beginPath();
      for (let i = 0; i <= 60; i++) { const t = i / 60, yy = top + t * h; const xx = cx + zij * breed * (0.3 + 0.08 * Math.sin(t * h / (breed * 0.22) + zij)); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); } }
  if (gen) { const y0 = top + gen.band * h - gen.hh / 2; ctx.beginPath(); ctx.moveTo(cx - breed, y0); ctx.quadraticCurveTo(cx, y0 + zak, cx + breed, y0); ctx.lineTo(cx + breed, y0 + gen.hh); ctx.quadraticCurveTo(cx, y0 + gen.hh + zak, cx - breed, y0 + gen.hh); ctx.closePath();
    ctx.fillStyle = gen.kleur; ctx.fill(); ctx.strokeStyle = _mvL(gen.kleur, 0.5); ctx.lineWidth = 1.5; ctx.stroke(); }
  ctx.restore();
  _chromPad(ctx, cx, top, h, breed, cen, seed); ctx.strokeStyle = rand; ctx.lineWidth = Math.max(1.2, breed * 0.06); ctx.stroke();
  if (gen && gen.nieuw) { const y0 = top + gen.band * h - gen.hh / 2; roundRect(ctx, cx - breed / 2 - 6, y0 - 5, breed + 12, gen.hh + 10 + zak, 6); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); }
}
function _bandH(h) { return clamp(h * 0.11, 10, 24); }
function chromosoomPaar(ctx, x, y, h, o = {}) {
  const { allelen = [EVO.a1, EVO.a2], band = 0.32, a = 1, breed = 34, gap = 30, cen = 0.58, nieuw = null } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; const hh = _bandH(h);
  for (let k = 0; k < 2; k++) { const cx = x + (k ? 1 : -1) * (gap / 2 + breed / 2); const isN = nieuw && nieuw[0] === k; const kl = isN ? nieuw[1] : allelen[k];
    _chromTekening(ctx, cx, y - h / 2, h, breed, cen, C.kern, C.kernR, { band, hh, halfT: hh / h / 2, kleur: kl, nieuw: isN }, k * 2.3); }
  ctx.restore(); }
function chromosoom1(ctx, x, y, h, kleur, o = {}) {
  const { band = 0.32, breed = 34, cen = 0.58, a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const hh = _bandH(h);
  _chromTekening(ctx, x, y - h / 2, h, breed, cen, C.kern, C.kernR, { band, hh, halfT: hh / h / 2, kleur }, 0.9); ctx.restore(); }
// chromosoom (muilezel-meiose, film 6): staafje 14 px breed, centromeer op 38 % van boven, eigen kleur per set
function chromosoom(ctx, x, y, l, kleur, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; _chromTekening(ctx, x, y - l / 2, l, 14, 0.38, kleur, _mvL(kleur, 0.35), null, l * 0.01); ctx.restore(); }

// =====================================================================================
// GESLACHTSCEL als schema met één chromosoom. Eicel: ±120 µm, zona pellucida als brede lichte band, smalle ruimte met
// het eerste poollichaampje, cytoplasma met dooierkorrels; de eicel staat stil in metafase II, dus het chromosoom ligt
// vrij (geen kernmembraan). Zaadcel: platte ovale kop (4–5 × 3 µm) met acrosoomkap over de voorste helft (teal, zoals
// zaadcelEcht in lib_bio), kern vult de kop; middenstuk met mitochondriën als spiraal; staart dunner wordend en golvend.
// Schema: de kop is vergroot (het chromosoom moet erin passen) en de staart ingekort (echt ±10× de kop).
// =====================================================================================
