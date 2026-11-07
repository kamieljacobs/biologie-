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
function nucleoide(ctx, cx, cy, rx, ry, o = {}) {
  const { w = 3, lussen = 13, seed = 1, a = 1, kleur = C.kernR, donker = C.kern, rot = 0, T = null, helix = 'auto', fase = 0 } = o; if (a <= 0.01) return;
  const P = [], rc = 0.2, n = lussen, cs = Math.cos(rot), sn = Math.sin(rot);
  const kaart = (u, v) => { const px = u * rx, py = v * ry; const q = [cx + px * cs - py * sn, cy + px * sn + py * cs]; return T ? T(q[0], q[1]) : q; };
  for (let k = 0; k < n; k++) {
    const h1 = hash(k * 7.3 + seed * 3.1), h2 = hash(k * 2.9 + seed * 5.7), h3 = hash(k * 4.1 + seed * 1.3);
    const th = (k + 0.6 * (h1 - 0.5)) / n * 6.283, L = 0.38 + 0.55 * h2, buig = (h3 - 0.5) * 2.4, wt = 0.05 + 0.08 * hash(k * 9.7 + seed), m = 1 + Math.floor(hash(k * 3.7 + seed * 2.3) * 3), scheef = (hash(k * 1.7 + seed) - 0.5) * 0.9;
    const rk = rc * (0.5 + 0.9 * hash(k * 5.5 + seed)); const as = (t) => { const an = th + scheef + buig * t * t; return [Math.cos(th) * rk + Math.cos(an) * L * t, Math.sin(th) * rk + Math.sin(an) * L * t, an]; };
    const hwf = (t) => wt * (0.3 + 0.7 * Math.pow(t, 0.7)) * Math.cos(Math.PI * m * t);
    // kern-stukje tussen de lussen
    const thV = (k - 0.5) / n * 6.283, rv = rc * (0.3 + 0.7 * hash(k * 8.1 + seed)); P.push([Math.cos(thV) * rv, Math.sin(thV) * rv]);
    const N = 7; for (let i = 0; i <= N; i++) { const t = i / N, [ax, ay, an] = as(t), h = hwf(t); P.push([ax - Math.sin(an) * h, ay + Math.cos(an) * h]); }
    { const [ax, ay, an] = as(1), h = hwf(1), r0 = Math.abs(wt); const s0 = h >= 0 ? an + Math.PI / 2 : an - Math.PI / 2, dir = h >= 0 ? -1 : 1; // lustop: halve cirkel naar buiten
      for (let i = 1; i < 4; i++) { const b = s0 + dir * Math.PI * i / 4; P.push([ax + Math.cos(b) * r0, ay + Math.sin(b) * r0]); } }
    for (let i = N; i >= 0; i--) { const t = i / N, [ax, ay, an] = as(t), h = hwf(t); P.push([ax + Math.sin(an) * h, ay - Math.cos(an) * h]); }
  }
  const Q = P.map(([u, v]) => kaart(u, v));
  dnaDraad(ctx, Q, { w, kleur, donker, a, dicht: true, helix, fase });
}

// =====================================================================================
// BACTERIE (E. coli). Recept: staafje 2–4 µm lang, 0,7–1 µm breed (BioNumbers 104113: K-12 2,6–4,0 × 0,68–1,04 µm),
// getekend als 1 : 0,28; ronde polen, soms licht gebogen. Gramnegatief: buitenmembraan + dunne celwand (peptidoglycaan)
// als één lichte band, periplasma als smalle donkere spleet, celmembraan als tweede lichte lijn → dubbele rand.
// Binnen: nucleoïde (paarse kluwen, zonder membraan), ribosomen als dichte kleine stippen (±20 nm, tienduizenden),
// een paar polysomen (kralensnoertjes). Buiten: 4–6 flagellen, 5–10 µm lang (2–4× de cel), helix met spoed ±2,3 µm
// (BioNumbers 100095), bij zwemmen gebundeld achter de cel; honderden fimbriae, kort en fijn, loodrecht op de wand.
// Kleur van de cel = allel (teal gevoelig, oker resistent). Gedood: 40%, wand open, inhoud lekt.
// Bekende fouten: kern met membraan; wand en membraan als één lijn; flagel als kort haartje; plasmide even groot als het chromosoom.
// Parameters gelijk aan de oude versie; extra: o.t (fase van de flagelgolf), o.flagel (lengte flagel × cel, standaard 1,25),
// o.fimbriae (standaard: aan vanaf 150 px).
// =====================================================================================
function _bacOmtrek(L, r, d, bend, N = 40) {
  const half = L / 2, top = [], bot = [];
  const rad = (x) => { let q = r; const e = Math.abs(x) - (half - r); if (e > 0) q = r * Math.sqrt(Math.max(0, 1 - (e / r) * (e / r))); if (d > 0) q *= 1 - d * 0.88 * Math.exp(-Math.pow(x / (r * 0.95), 2)); return q; };
  for (let i = 0; i <= N; i++) { const x = -half * Math.cos(Math.PI * i / N); const b = bend(x); top.push([x, b - rad(x)]); }
  for (let i = N - 1; i >= 1; i--) { const x = -half * Math.cos(Math.PI * i / N); const b = bend(x); bot.push([x, b + rad(x)]); }
  return top.concat(bot); }
function bacterie(ctx, x, y, len, rot = 0, o = {}) {
  const { type = 'gevoelig', plasmide = 0, dood = 0, deling = 0, a = 1, focus = false, seed = 1, zweep = true, t = 0, flagel = 1.25 } = o;
  const fimb = o.fimbriae !== undefined ? o.fimbriae : len >= 150;
  const kl = type === 'resistent' ? EVO.a2 : EVO.a1, L = len, r = len * 0.14, half = L / 2;
  const bendA = (hash(seed * 3.7 + 0.3) - 0.5) * 0.36 * r, bend = (px) => bendA * (1 - Math.pow(px / half, 2)), B = (px, py) => [px, py + bend(px)];
  ctx.save(); ctx.globalAlpha *= a * (dood ? 0.4 : 1); ctx.translate(x, y); ctx.rotate(rot); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const N = L > 200 ? 48 : 28;
  const buiten = _bacOmtrek(L, r, deling, bend, N);
  // flagellen (achter de cel), gebundeld achter de linkerpool
  if (zweep && !dood) {
    const nf = L < 100 ? 2 : 4 + Math.floor(hash(seed * 1.9) * 3), lf = L * flagel, lam = L * 1.12, amp = L * 0.085;
    ctx.strokeStyle = rgba('#C9D4E0', 0.55); ctx.lineWidth = Math.max(1, r * 0.05);
    for (let i = 0; i < nf; i++) { const h = hash(i * 5.1 + seed), zij = i % 2 ? 1 : -1; const sx = lerp(-half * 0.8, -half * 0.05, h); const sy = bend(sx) + zij * r;
      const bx = -half - L * 0.22, by = bend(-half) + (h - 0.5) * r * 0.5, ph = t * 6.283 + i * 0.8;
      // vanaf de wand eerst naar buiten (haak), dan in een ruime boog naar achteren de bundel in
      const mx = lerp(sx, -half, 0.5); const Pf = [[sx, sy], [sx - L * 0.012, sy + zij * r * 0.3], [mx, bend(mx) + zij * r * (1.2 + 0.15 * h)], [-half - L * 0.06, lerp(bend(-half) + zij * r * 0.8, by, 0.5)]];
      const nst = 26; for (let k = 0; k <= nst; k++) { const dd = k / nst * lf, ramp = Math.min(1, dd / (lam * 0.35)); Pf.push([bx - dd, by + Math.sin(dd / lam * 6.283 - ph) * amp * ramp + (h - 0.5) * r * 0.25 * (1 - dd / lf)]); }
      ctx.beginPath(); bioPad(ctx, Pf, false); ctx.stroke(); } }
  // fimbriae: kort, fijn, loodrecht op de wand
  if (fimb && !dood) { ctx.strokeStyle = rgba('#C9D4E0', 0.32); ctx.lineWidth = 1; ctx.beginPath(); const dichte = _mvGelijk(buiten, Math.max(5, L / 70), true);
    for (let i = 0; i < dichte.length - 1; i++) { const q = dichte[i], h = hash(i * 3.3 + seed); const fl = r * (0.16 + 0.14 * h), tilt = (h - 0.5) * 0.6;
      const nx = -q.nx, ny = -q.ny; const ex = q.x + (nx * Math.cos(tilt) - ny * Math.sin(tilt)) * fl, ey = q.y + (nx * Math.sin(tilt) + ny * Math.cos(tilt)) * fl; ctx.moveTo(q.x, q.y); ctx.lineTo(ex, ey); } ctx.stroke(); }
  // lagen: buitenmembraan + celwand (band), periplasma, celmembraan, cytoplasma
  const ww = Math.max(1.4, r * 0.1), gp = Math.max(1.2, r * 0.07), lwM = Math.max(1, r * 0.035);
  const wand = _bacOmtrek(L - 2 * ww, r - ww, deling, bend, N), mem = _bacOmtrek(L - 2 * (ww + gp), r - ww - gp, deling, bend, N);
  _mvPad(ctx, buiten); ctx.fillStyle = _mvL(kl, 0.15); ctx.fill();
  _mvPad(ctx, wand); ctx.fillStyle = C.bgMicro; ctx.fill(); ctx.fillStyle = rgba(kl, 0.14); ctx.fill();
  _mvPad(ctx, mem); ctx.fillStyle = C.bgMicro; ctx.fill(); ctx.fillStyle = rgba(kl, 0.24); ctx.fill();
  if (L > 40) { // binnenkant
    ctx.save(); _mvPad(ctx, mem); ctx.clip();
    const nc = deling > 0.5 ? [-L * 0.24, L * 0.24] : [-L * 0.06 + (hash(seed * 2.2) - 0.5) * L * 0.04];
    const nrx = deling > 0.5 ? L * 0.15 : L * 0.22, nry = r * 0.6;
    // ribosomen
    const nr = Math.min(1100, Math.round(L * r * 2 / (L < 150 ? 210 : 300))), rr = Math.max(0.9, r * 0.024);
    ctx.fillStyle = rgba(C.ribo, 0.42);
    for (let i = 0; i < nr; i++) { const px = (hash(i * 2.7 + seed) - 0.5) * L * 0.96, py = (hash(i * 3.9 + seed * 1.7) - 0.5) * r * 1.8;
      if (nc.some(cx => Math.pow((px - cx) / (nrx * 1.05), 2) + Math.pow(py / (nry * 1.1), 2) < 1)) continue; const [qx, qy] = B(px, py); ctx.beginPath(); ctx.arc(qx, qy, rr, 0, 6.283); ctx.fill(); }
    if (L >= 300) { ctx.fillStyle = rgba(_mvL(C.ribo, 0.2), 0.75); // polysomen: kralensnoertjes van ribosomen op één mRNA
      for (let p = 0; p < 7; p++) { const h = hash(p * 9.1 + seed); const px0 = (h - 0.5) * L * 0.8, py0 = (hash(p * 4.3 + seed) - 0.5) * r * 1.3; if (nc.some(cx => Math.abs(px0 - cx) < nrx * 1.1 && Math.abs(py0) < nry * 1.1)) continue;
        const an = hash(p * 6.7) * 6.283; for (let k = 0; k < 5; k++) { const [qx, qy] = B(px0 + Math.cos(an + k * 0.25) * k * rr * 3.2, py0 + Math.sin(an + k * 0.25) * k * rr * 3.2); ctx.beginPath(); ctx.arc(qx, qy, rr * 1.15, 0, 6.283); ctx.fill(); } } }
    // nucleoïde(n)
    const dw = clamp(L / 110, 1.5, 6);
    nc.forEach((cx, j) => nucleoide(ctx, cx, 0, nrx, nry, { w: dw, lussen: L < 120 ? 7 : L < 300 ? 11 : 15, seed: seed + j * 11, T: B, fase: t, helix: false }));
    // plasmiden: kleine ringen dubbelstrengs DNA, buiten de nucleoïde, richting de polen; altijd helemaal binnen het celmembraan (Kamiel 23 okt 2026)
    if (plasmide) { const ri = r - ww - gp - lwM, rp = Math.max(4, Math.min(L * 0.065, ri * 0.34)), PL = [[0.33, -1], [-0.36, 1], [0.4, 1], [-0.22, -1]];
      for (let i = 0; i < plasmide; i++) { const [u, zij] = PL[i % 4]; const vy = zij * Math.max(0, ri - rp * 1.25 - 1) * 0.85; const [qx, qy] = B(u / 0.4 * (half - ri - rp) * 0.8, vy);
        plasmideRing(ctx, qx, qy, rp, { gen: true, seed: seed + i }); } }
    ctx.restore();
  }
  // randen: buitenmembraan (licht), binnenrand van de wand, celmembraan als dubbele lijn bij grote cellen
  ctx.strokeStyle = _mvL(kl, 0.45); ctx.lineWidth = Math.max(1.2, r * 0.035);
  if (dood) { const per = Math.max(10, L * 0.09); ctx.setLineDash([per, per * 0.45]); }
  _mvPad(ctx, buiten); ctx.stroke();
  ctx.strokeStyle = rgba(_mvL(kl, 0.3), 0.7); ctx.lineWidth = Math.max(0.8, lwM * 0.7); _mvPad(ctx, wand); ctx.stroke();
  ctx.strokeStyle = _mvL(kl, 0.4); ctx.lineWidth = lwM; _mvPad(ctx, mem); ctx.stroke();
  if (L >= 300) { const mem2 = _bacOmtrek(L - 2 * (ww + gp) - lwM * 5, r - ww - gp - lwM * 2.5, deling, bend, N); ctx.strokeStyle = rgba(_mvL(kl, 0.4), 0.6); ctx.lineWidth = lwM * 0.7; _mvPad(ctx, mem2); ctx.stroke(); }
  ctx.setLineDash([]);
  if (dood && L > 40) { // inhoud lekt door een gat in de wand
    const gx = (hash(seed * 4.4) - 0.5) * L * 0.5; ctx.fillStyle = rgba(C.ribo, 0.7);
    for (let i = 0; i < 12; i++) { const h = hash(i * 3.1 + seed); const [qx, qy] = B(gx + (h - 0.5) * r * 1.2, -r - hash(i * 5.3) * r * 0.9); ctx.beginPath(); ctx.arc(qx, qy, Math.max(1, r * 0.035), 0, 6.283); ctx.fill(); } }
  if (focus) { const f = _bacOmtrek(L + 18, r + 9, deling, bend, N); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; _mvPad(ctx, f); ctx.stroke(); }
  ctx.restore();
}

// =====================================================================================
// PLASMIDE. Recept: klein ringvormig dubbelstrengs DNA (E. coli-plasmiden 2–200 kb tegen 4600 kb chromosoom), vaak
// meerdere kopieën; in de cel licht superspiraal, hier als golvende ring. Resistentiegen = stuk van de ring in oker (allel 2).
// =====================================================================================
function plasmideRing(ctx, x, y, r, o = {}) {
  const { gen = true, a = 1, seed = 1, fase = 0 } = o; if (a <= 0.01) return; const w = Math.max(1.8, r * 0.2);
  const ring = (a0, a1, n) => { const P = []; for (let i = 0; i <= n; i++) { const th = a0 + (a1 - a0) * i / n; const rr = r * (1 + 0.07 * Math.sin(th * 3 + seed) + 0.04 * Math.sin(th * 5 + seed * 2)); P.push([x + Math.cos(th) * rr, y + Math.sin(th) * rr]); } return P; };
  ctx.save(); ctx.globalAlpha *= a;
  const P = ring(0, 6.283, 36); P.pop(); dnaDraad(ctx, P, { w, dicht: true, fase });
  if (gen) dnaDraad(ctx, ring(-0.7, 0.9, 10), { w: w * 1.35, kleur: EVO.a2, donker: _mvD(EVO.a2, 0.35), fase });
  ctx.restore(); }

// =====================================================================================
// F-PILUS (geslachtsdraad). Recept: holle buis van pilineiwit, ±8 nm dik, 1–20 µm lang; trekt de cellen naar elkaar toe.
// Getekend als dunne buis (twee lichte lijnen, fijne schuine streepjes = de helix van pilinesubunits), vergroot zodat
// het kopie-plasmide (u = 0..1 onderweg) erlangs past. (In het echt gaat één streng over en wordt die in de ontvanger
// weer dubbel; de ring onderweg is een vereenvoudiging.)
// =====================================================================================
function pilus(ctx, x1, y1, x2, y2, u = -1, r = 10) {
  ctx.save(); ctx.lineCap = 'round'; const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - 18, bw = 7;
  const P = []; for (let i = 0; i <= 40; i++) { const t = i / 40; P.push([(1 - t) ** 2 * x1 + 2 * (1 - t) * t * mx + t * t * x2, (1 - t) ** 2 * y1 + 2 * (1 - t) * t * my + t * t * y2]); }
  const S = _mvGelijk(P, 2, false);
  ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (const p of P) ctx.lineTo(p[0], p[1]); ctx.strokeStyle = _mvL(C.er, 0.1); ctx.lineWidth = bw; ctx.stroke(); ctx.strokeStyle = '#2E3A4E'; ctx.lineWidth = bw - 3; ctx.stroke();
  ctx.strokeStyle = rgba(C.er, 0.7); ctx.lineWidth = 1; ctx.beginPath(); let volg = 0;
  for (const q of S) { if (q.s < volg) continue; volg = q.s + 5; ctx.moveTo(q.x + q.nx * (bw / 2 - 1) - q.ny * 1.5, q.y + q.ny * (bw / 2 - 1) + q.nx * 1.5); ctx.lineTo(q.x - q.nx * (bw / 2 - 1) + q.ny * 1.5, q.y - q.ny * (bw / 2 - 1) - q.nx * 1.5); } ctx.stroke();
  if (u >= 0) { const t = u; const px = (1 - t) ** 2 * x1 + 2 * (1 - t) * t * mx + t * t * x2, py = (1 - t) ** 2 * y1 + 2 * (1 - t) * t * my + t * t * y2; plasmideRing(ctx, px, py, r, { seed: 3 }); }
  ctx.restore(); }

// =====================================================================================
// ANTIBIOTICUM (bètalactam, bv. penicilline). Recept: vierring (bètalactam) die een zijde (N–C) deelt met een vijfring
// (thiazolidine, met zwavel); aan de vierring een C=O en een zijketen (amide), aan de vijfring een carboxylgroep.
// Het molecuul is ±1 nm: in beeld altijd 'vergroot'. Getekend als afgeronde vormen in koraal (geen atomen, Part C:
// alleen in vwo-blokken), met de zwavel als okerkleurige stip. r ≈ halve breedte.
// =====================================================================================
function antibioticum(ctx, x, y, r = 10, rot = 0, a = 1) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const s = r * 0.78, lw = Math.max(1.4, r * 0.13), rand = _mvL(C.koraal, 0.35), vulK = rgba(C.koraal, 0.55);
  const N = [0, s / 2], C5 = [0, -s / 2], C6 = [-s, -s / 2], C7 = [-s, s / 2];
  const pc = s / (2 * Math.tan(Math.PI / 5)), R5 = s / (2 * Math.sin(Math.PI / 5)); const vijf = []; for (let i = 0; i < 5; i++) { const an = Math.PI + Math.PI / 5 + i * 2 * Math.PI / 5; vijf.push([pc + Math.cos(an) * R5, Math.sin(an) * R5]); }
  // vijf[0] = C5-hoek? zorg dat de gedeelde zijde op x=0 ligt: hoeken met x≈0 zijn C5 en N
  const Sx = vijf.reduce((b, p) => (p[1] < b[1] && p[0] > 1e-3 ? p : b), [0, 1e9]);
  const stok = (p, an, l, knop) => { const e = [p[0] + Math.cos(an) * l, p[1] + Math.sin(an) * l]; ctx.strokeStyle = rand; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(e[0], e[1]); ctx.stroke(); if (knop) circ(ctx, e[0], e[1], knop, vulK, rand, lw * 0.8); return e; };
  // zijketen aan C6 (amide → ring), C=O aan C7, carboxyl aan de vijfring
  const e1 = stok(C6, -2.4, s * 0.55, 0); const e2 = stok(e1, -3.0, s * 0.5, 0); circ(ctx, e2[0] - s * 0.3, e2[1], s * 0.32, vulK, rand, lw * 0.8); circ(ctx, e1[0], e1[1] - s * 0.32, s * 0.13, vulK, rand, lw * 0.7);
  const o1 = [C7[0] - s * 0.38, C7[1] + s * 0.38]; ctx.strokeStyle = rand; ctx.lineWidth = lw * 0.7; ctx.beginPath(); ctx.moveTo(C7[0] - lw * 0.6, C7[1] + lw * 0.2); ctx.lineTo(o1[0] - lw * 0.6, o1[1] + lw * 0.2); ctx.moveTo(C7[0] + lw * 0.2, C7[1] + lw * 0.6); ctx.lineTo(o1[0] + lw * 0.2, o1[1] + lw * 0.6); ctx.stroke(); circ(ctx, o1[0], o1[1], s * 0.13, vulK, rand, lw * 0.7);
  const vC3 = vijf.reduce((b, p) => (p[1] > b[1] && p[0] > 1e-3 ? p : b), [0, -1e9]); stok(vC3, 1.0, s * 0.45, s * 0.14);
  ctx.beginPath(); ctx.moveTo(N[0], N[1]); ctx.lineTo(C5[0], C5[1]); ctx.lineTo(C6[0], C6[1]); ctx.lineTo(C7[0], C7[1]); ctx.closePath(); shape(ctx, vulK, rand, lw);
  ctx.beginPath(); vijf.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); shape(ctx, vulK, rand, lw);
  circ(ctx, Sx[0], Sx[1], Math.max(1.6, s * 0.16), C.oker, _mvL(C.oker, 0.3), Math.max(0.8, lw * 0.6)); // zwavel
  ctx.restore(); }

// =====================================================================================
// GRIEPVIRUS (influenza A). Recept: bol of ei, 80–120 nm; envelop = lipidendubbellaag uit de gastheercel; daaronder een
// laag matrixeiwit (M1); ±300–400 uitsteeksels: hemagglutinine (HA, staafje ±13 nm met verdikte kop) en ±1 op 7
// neuraminidase (NA, dun steeltje met vierkante kop), NA vaak in groepjes; binnenin 8 RNA-segmenten (RNP's: staafjes
// 12–15 nm breed, 30–130 nm lang) in een '7 + 1'-bundel aan één pool. Bron: Harris e.a. 2006 PNAS 103:19123; Noda e.a. 2006 Nature 439:490.
// Bekende fouten: virus als bolletje met speldjes; DNA in plaats van RNA; virus zo groot als een bacterie (100 nm tegen 2 µm).
// =====================================================================================
function griepVirus(ctx, x, y, r, a = 1) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate((hash(x * 0.37 + y * 0.11) - 0.5) * 1.6); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; // elk virus iets anders gedraaid
  const HA = '#C9B896', NA = '#AFC0D0', ns = 34, lw = Math.max(1, r * 0.035);
  const naPlek = (i) => (i >= 21 && i <= 24) || i === 8 || i === 30;
  for (let i = 0; i < ns; i++) { const an = (i + 0.3 * (hash(i * 3.3) - 0.5)) / ns * 6.283 - Math.PI / 2, c = Math.cos(an), s = Math.sin(an);
    ctx.save(); ctx.rotate(an); const l = r * 0.27 * (0.92 + 0.16 * hash(i * 7.7));
    if (naPlek(i)) { ctx.strokeStyle = NA; ctx.lineWidth = Math.max(1, r * 0.03); ctx.beginPath(); ctx.moveTo(r * 0.98, 0); ctx.lineTo(r + l * 0.62, 0); ctx.stroke();
      roundRect(ctx, r + l * 0.6, -r * 0.065, r * 0.13, r * 0.13, r * 0.025); shape(ctx, rgba(NA, 0.75), _mvL(NA, 0.3), lw); }
    else { ctx.beginPath(); ctx.moveTo(r * 0.98, -r * 0.03); ctx.lineTo(r + l * 0.6, -r * 0.035); ctx.quadraticCurveTo(r + l, -r * 0.06, r + l, 0); ctx.quadraticCurveTo(r + l, r * 0.06, r + l * 0.6, r * 0.035); ctx.lineTo(r * 0.98, r * 0.03); ctx.closePath();
      shape(ctx, rgba(HA, 0.8), _mvL(HA, 0.3), lw); }
    ctx.restore(); }
  // envelop (dubbellaag) en M1-laag
  circ(ctx, 0, 0, r, C.bgMicro); circ(ctx, 0, 0, r, rgba(HA, 0.12), _mvL(HA, 0.2), Math.max(1.4, r * 0.04)); circ(ctx, 0, 0, r * 0.93, null, rgba(HA, 0.7), Math.max(1, r * 0.025));
  ctx.fillStyle = rgba('#9AA3B2', 0.6); const nm = Math.max(18, Math.round(r * 0.9)); for (let i = 0; i < nm; i++) { const an = i / nm * 6.283; ctx.beginPath(); ctx.arc(Math.cos(an) * r * 0.86, Math.sin(an) * r * 0.86, Math.max(0.8, r * 0.025), 0, 6.283); ctx.fill(); }
  // 8 RNP's in een 7+1-bundel, hangend aan de bovenpool; het middelste staafje vooraan
  const L = [0.95, 0.7, 0.9, 0.58, 0.82, 0.5, 0.66, 0.42], X = [-0.33, 0.33, -0.22, 0.22, -0.11, 0.11, 0.0, 0.0], bw = r * 0.1, yT = -r * 0.7;
  [0, 1, 2, 3, 4, 5, 7, 6].forEach((k) => { const xx = X[k] * r + (k === 7 ? r * 0.05 : 0), ll = L[k] * r * 0.95; const yt = yT + Math.abs(X[k]) * r * 0.35;
    ctx.save(); ctx.translate(xx, yt); ctx.rotate(-X[k] * 0.45 + (hash(k * 3.1) - 0.5) * 0.12); // bundel: staafjes lopen naar de pool toe samen
    roundRect(ctx, -bw / 2, 0, bw, ll, bw / 2); shape(ctx, k === 6 ? rgba(C.kernR, 0.55) : rgba(C.kernR, 0.32), C.kernR, Math.max(0.8, r * 0.02));
    roundRect(ctx, -bw / 2, 0, bw, ll, bw / 2); ctx.clip(); ctx.strokeStyle = rgba(_mvL(C.kernR, 0.3), 0.8); ctx.lineWidth = Math.max(0.7, r * 0.015); ctx.beginPath();
    for (let d = 0; d < ll + bw; d += bw * 0.7) { ctx.moveTo(-bw / 2, d); ctx.lineTo(bw / 2, d - bw * 0.5); } ctx.stroke(); ctx.restore(); });
  ctx.restore(); }

// =====================================================================================
// CHROMOSOOM. Recept: een chromosoom is één DNA-molecuul, om eiwitten gewonden en opgevouwen in lussen. Niet verdubbeld
// (G1, of in een geslachtscel) = één staafje; vorm: ronde uiteinden (telomeren), een duidelijke insnoering (centromeer,
// ±55–60 % van de breedte), licht golvende randen. Bandenpatroon (G-banden) als afwisselend donkere en lichte banden van
// ongelijke breedte. Een gen = een band op een vaste plek (locus) in de allelkleur. Kleur paars (Part C: DNA).
// Bekende fouten: rechthoekig staafje; centromeer als zwart blokje; gen als los kader naast het chromosoom.
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
function geslachtscel(ctx, x, y, soort, kleur, s = 1, a = 1) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; const wit = '#F2F2EE', ivoor = '#F2E6C8';
  if (soort === 'ei') {
    circ(ctx, x, y, 78 * s, rgba('#F6EEDC', 0.16), rgba('#F6EEDC', 0.85), 2.5); // zona pellucida (buitenrand)
    circ(ctx, x, y, 69 * s, C.bgSchema, rgba('#F6EEDC', 0.45), 1.5); circ(ctx, x, y, 69 * s, rgba('#F6EEDC', 0.05));
    circ(ctx, x + Math.cos(-0.75) * 64.5 * s, y + Math.sin(-0.75) * 64.5 * s, 5.5 * s, rgba(ivoor, 0.3), rgba(ivoor, 0.8), 1.5); // poollichaampje
    circ(ctx, x, y, 61 * s, rgba(ivoor, 0.16), rgba(ivoor, 0.8), 2);
    ctx.fillStyle = rgba(ivoor, 0.28); for (let i = 0; i < 46; i++) { const an = hash(i * 2.3) * 6.283, d = Math.sqrt(hash(i * 5.9)) * 56 * s; if (Math.abs(Math.cos(an) * d) < 18 * s && Math.abs(Math.sin(an) * d) < 52 * s) continue; ctx.beginPath(); ctx.arc(x + Math.cos(an) * d, y + Math.sin(an) * d, (1.2 + hash(i) * 1.3) * s, 0, 6.283); ctx.fill(); }
    chromosoom1(ctx, x, y, 92 * s, kleur, { breed: 24 * s });
  } else {
    const hx = x, kr = 44 * s, kb = 30 * s; // kop: ovaal, achteraan smaller (peddel)
    const kop = []; for (let i = 0; i < 40; i++) { const th = i / 40 * 6.283; const ry = kb * (0.86 + 0.14 * Math.cos(th)); kop.push([hx + Math.cos(th) * kr, y + Math.sin(th) * ry]); }
    // staart: middenstuk dikker met mitochondriënspiraal, dan dunner wordende golf
    const x0 = hx - kr * 0.97, mid = 34 * s, st = 98 * s, P = []; for (let i = 0; i <= 50; i++) { const d = i / 50 * (mid + st); const amp = d < mid ? 0 : (3 + 11 * Math.pow((d - mid) / st, 1.1)) * s; P.push([x0 - d, y + Math.sin((d - mid) / (st * 0.62) * 6.283) * amp]); }
    for (let i = 1; i < P.length; i++) { const d = i / 50 * (mid + st); ctx.strokeStyle = rgba(wit, 0.85); ctx.lineWidth = d < mid ? 6.5 * s : Math.max(1, lerp(3.2, 1, (d - mid) / st) * s); ctx.beginPath(); ctx.moveTo(P[i - 1][0], P[i - 1][1]); ctx.lineTo(P[i][0], P[i][1]); ctx.stroke(); }
    ctx.strokeStyle = rgba(C.mito, 0.9); ctx.lineWidth = Math.max(1, 1.4 * s); ctx.beginPath(); for (let d = 4 * s; d < mid - 2 * s; d += 4.5 * s) { ctx.moveTo(x0 - d + 1.5 * s, y - 3 * s); ctx.lineTo(x0 - d - 1.5 * s, y + 3 * s); } ctx.stroke();
    vul(ctx, kop, rgba(wit, 0.16), rgba(wit, 0.85), 2.5);
    ctx.save(); zacht(ctx, kop, true); ctx.clip(); ctx.beginPath(); ctx.ellipse(hx + kr * 0.42, y, kr * 0.72, kb * 1.1, 0, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.3); ctx.fill(); ctx.strokeStyle = rgba(C.teal, 0.8); ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore(); // acrosoom
    chromosoom1(ctx, hx - 8 * s, y, 44 * s, kleur, { breed: 16 * s, band: 0.3 });
  }
  ctx.restore(); }

// =====================================================================================
// RODE BLOEDCEL (overschrijft lib_bio, zelfde parameters). Recept: ingedeukte schijf, 7,8 µm breed, rand ±2,5 µm dik,
// midden ±1 µm (Evans & Fung 1972: dikte T(ρ) = R·√(1−ρ²)·(0,207 + 2,003ρ² − 1,123ρ⁴)). Van boven: schijf met een
// dikke rand en een ondiepe deuk in het midden (twee tinten: deuk donkerder, lichte boog op de rand). Van opzij: een
// halter (dikke uiteinden, dun midden). kant 0 = van boven, 1 = van opzij; ertussen kantelt hij.
// Bekende fouten: bol; van opzij een ovaal; deuk als gat.
// =====================================================================================
function rodeBloedcel(ctx, x, y, r, an = 0, kant = 0, a = 1) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  const kl = BIO.bloed, ry = r * lerp(1, 0.3, kant), wd = clamp((kant - 0.55) / 0.45, 0, 1);
  const halfT = (p) => r * Math.sqrt(Math.max(0, 1 - p * p)) * (0.207 + 2.003 * p * p - 1.123 * p ** 4) / 2;
  const P = [], N = 36; for (let i = 0; i <= N; i++) { const th = Math.PI * i / N, p = Math.cos(th); P.push([r * p, -lerp(ry * Math.sin(th), halfT(p) * 1.05, wd)]); }
  for (let i = N - 1; i >= 1; i--) { const th = Math.PI * i / N, p = Math.cos(th); P.push([r * p, lerp(ry * Math.sin(th), halfT(p) * 1.05, wd)]); }
  ctx.beginPath(); bioPad(ctx, P, true); shape(ctx, kl, lighten(kl, 0.3), Math.max(1, r * 0.04));
  const dk = 1 - wd; if (dk > 0.02) { // deuk: twee tinten, iets verschoven door het kantelen
    ctx.beginPath(); ctx.ellipse(0, ry * 0.06 * kant, r * 0.55, ry * 0.55, 0, 0, 6.283); ctx.fillStyle = rgba('#8E2A2A', 0.35 * dk); ctx.fill();
    ctx.beginPath(); ctx.ellipse(0, ry * 0.1 * kant, r * 0.36, ry * 0.36, 0, 0, 6.283); ctx.fillStyle = rgba('#7A1E1E', 0.35 * dk); ctx.fill();
    ctx.strokeStyle = rgba(_mvL(kl, 0.45), 0.6 * dk); ctx.lineWidth = Math.max(1, r * 0.06); ctx.beginPath(); ctx.ellipse(0, 0, r * 0.8, ry * 0.8, 0, 3.6, 4.9); ctx.stroke(); }
  if (wd > 0.02) { ctx.strokeStyle = rgba('#7A1E1E', 0.4 * wd); ctx.lineWidth = Math.max(1, r * 0.05); ctx.beginPath(); ctx.moveTo(-r * 0.45, 0); ctx.quadraticCurveTo(0, r * 0.02, r * 0.45, 0); ctx.stroke(); }
  ctx.restore(); }

// =====================================================================================
// SIKKELCEL (HbSS, zuurstofarm). Recept: HbS-moleculen klonteren tot lange vezels (bundels van 14-strengs vezels) die
// zich langs de lengteas richten en de cel uitrekken tot een stijve halve maan met spitse punten, ±1,5–2× zo lang als
// een normale cel; geen deuk meer; kleur iets donkerder en doffer (zuurstofarm). Bron: Christoph e.a. 2005 (vezels in
// de cel); Part C: 'toestand verandert de verzadiging, niet de vorm' geldt hier niet: de vorm IS het verschijnsel.
// Getekend: halve maan met spitse uiteinden en 3 fijne vezellijnen langs de boog.
// =====================================================================================
function sikkelcel(ctx, x, y, r, an = 0, a = 1) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const kl = '#A8403A', Rc = r * 1.65, span = 1.05, yc = Rc * 0.82;
  const dik = (u) => Math.pow(Math.sin(Math.PI * u), 0.75) * r * 0.42 * (1 + 0.06 * Math.sin(u * 17)); // spitse punten, licht hobbelig
  const pt = (u, d) => { const ph = -span + 2 * span * u, R = Rc + d; return [Math.sin(ph) * R, yc - Math.cos(ph) * R]; };
  const P = [], N = 28; for (let i = 0; i <= N; i++) P.push(pt(i / N, dik(i / N) * 0.55)); for (let i = N - 1; i >= 1; i--) P.push(pt(i / N, -dik(i / N) * 0.45));
  ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (const p of P) ctx.lineTo(p[0], p[1]); ctx.closePath(); shape(ctx, kl, lighten(kl, 0.25), Math.max(1, r * 0.04));
  ctx.strokeStyle = rgba('#6E1E1E', 0.55); ctx.lineWidth = Math.max(0.8, r * 0.035); // HbS-vezels langs de lengteas
  for (const f of [-0.3, 0.05, 0.38]) { ctx.beginPath(); for (let i = 0; i <= 20; i++) { const u = 0.1 + 0.8 * i / 20; const p = pt(u, dik(u) * f); i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); } ctx.stroke(); }
  ctx.restore(); }
