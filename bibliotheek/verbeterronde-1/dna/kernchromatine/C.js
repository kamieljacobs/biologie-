// ---- DNA-DRAAD, verhuisd uit lib_micro_evo.js (evolutie) naar lib_bio.js (beeldbank 27 okt 2026), zodat kernChromatine,
// nucleosoomDraad en cdKluwen geen evolutiefilmmap meer nodig hebben. Zelfde aanroep en zelfde beeld.
const _bioL = (h, k = 0.25) => _mixHex(h, '#FFFFFF', k);
function _bioCR(P, closed, per = 10) { // Catmull-Rom-punten door P
  const n = P.length, out = []; if (n < 2) return P.slice(); const N = closed ? n : n - 1;
  for (let i = 0; i < N; i++) { const p0 = P[closed ? (i - 1 + n) % n : Math.max(0, i - 1)], p1 = P[i], p2 = P[(i + 1) % n], p3 = P[closed ? (i + 2) % n : Math.min(n - 1, i + 2)];
    for (let k = 0; k < per; k++) { const t = k / per, t2 = t * t, t3 = t2 * t;
      out.push([0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
        0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3)]); } }
  if (!closed) out.push(P[n - 1].slice()); return out; }
function _bioGelijk(P, step, closed) { // punten op gelijke booglengte (+ normaal en s)
  const Q = closed ? P.concat([P[0]]) : P; const L = [0]; for (let i = 1; i < Q.length; i++) L.push(L[i - 1] + Math.hypot(Q[i][0] - Q[i - 1][0], Q[i][1] - Q[i - 1][1]));
  const tot = L[L.length - 1], n = Math.max(2, Math.round(tot / step)), out = []; let j = 1;
  for (let k = 0; k <= n; k++) { const d = k / n * tot; while (j < Q.length - 1 && L[j] < d) j++; const f = (d - L[j - 1]) / Math.max(1e-6, L[j] - L[j - 1]);
    const a = Q[j - 1], b = Q[j], an = Math.atan2(b[1] - a[1], b[0] - a[0]); out.push({ x: a[0] + (b[0] - a[0]) * f, y: a[1] + (b[1] - a[1]) * f, nx: -Math.sin(an), ny: Math.cos(an), s: d }); }
  return out; }

// =====================================================================================
// DNA-DRAAD. Recept (Part C9 Moleculen): rechtsdraaiende dubbele helix, 2 nm breed, één winding per ±10 bp (3,4 nm),
// grote en kleine groef ongelijk; kleur paars. Op een kleine schaal (w < 6 px) is de helix niet meer te zien: dan een
// touw met een lichte rand en een donkere kern die om de halve winding onderbreekt (suggereert de draaiing).
// Bekende fouten: platte ladder; linksdraaiend; een te dun lijntje dat in de achtergrond verdwijnt (Kamiel: 'ietsje dikker').
// P = punten van het pad; o.w = breedte in px; o.dicht = ring (plasmide, bacteriechromosoom).
// =====================================================================================
function dnaDraad(ctx, P, o = {}) {
  const { w = 4, kleur = C.kernR, donker = C.kern, a = 1, dicht = false, helix = 'auto', fase = 0, glad = true } = o; if (a <= 0.01 || P.length < 2) return;
  const pts = glad ? _bioCR(P, dicht, 8) : P.slice();
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const metHelix = helix === true || (helix === 'auto' && w >= 6);
  if (!metHelix) {
    const pad = () => { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (const p of pts) ctx.lineTo(p[0], p[1]); if (dicht) ctx.closePath(); };
    pad(); ctx.strokeStyle = kleur; ctx.lineWidth = w; ctx.stroke();
    if (w >= 2.4) { pad(); ctx.strokeStyle = donker; ctx.lineWidth = w * 0.42; const per = w * 1.7; ctx.setLineDash([per * 0.55, per * 0.45]); ctx.lineDashOffset = -fase * per; ctx.stroke(); ctx.setLineDash([]); }
    ctx.restore(); return; }
  // dubbele helix langs het pad
  const S = _bioGelijk(pts, Math.max(1.2, w * 0.18), dicht), hw = w / 2, pitch = w * 1.75, sl = Math.max(1.1, w * 0.24);
  const off = (q, k) => { const ph = q.s / pitch * 6.283 + fase * 6.283 + (k ? 2.3 : 0); return [q.x + q.nx * hw * Math.sin(ph), q.y + q.ny * hw * Math.sin(ph), Math.cos(ph)]; };
  const streng = (k, voor) => { ctx.strokeStyle = voor ? _bioL(kleur, 0.18) : donker; ctx.lineWidth = sl; ctx.beginPath(); let aan = false;
    for (let i = 0; i < S.length; i++) { const [px, py, z] = off(S[i], k); const zij = voor ? z >= 0 : z < 0; if (zij) { if (!aan) { ctx.moveTo(px, py); aan = true; } else ctx.lineTo(px, py); } else aan = false; } ctx.stroke(); };
  streng(0, false); streng(1, false);
  // baseparen: sporten loodrecht op de as, ±4 per winding getekend (rustig), iets transparant
  ctx.strokeStyle = rgba(kleur, 0.55); ctx.lineWidth = Math.max(0.8, sl * 0.55); ctx.beginPath(); const stap = pitch / 4;
  let volg = 0; for (const q of S) { if (q.s < volg) continue; volg = q.s + stap; const A = off(q, 0), B = off(q, 1); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); } ctx.stroke();
  streng(0, true); streng(1, true);
  ctx.restore(); }

// =====================================================================================
// CELKERN MET CHROMATINE (variant C, beeldbank ronde 2, 27 okt 2026: A + uit B een duidelijker kernlichaampje, minder dicht,
// draadlengte naar baseparen, grotere kernporiën). Recept (OpenStax Biology 2e § 10.1/10.2; Utah GSLC):
// (territoria per chromosoom: model, bron nog niet geopend in deze ronde)
//  - in de interfase ligt elk chromosoom als één losse, zacht kronkelende draad in zijn eigen gebied (territorium);
//    46 draden, lengte naar baseparen (CHROM_MB). Kernmembraan dubbel met poriën, kernlichaampje als donkere vlek.
//  - Beeldafspraak 15 okt: losse, zacht kronkelende draden, geen krabbel: daarom ± 1/3 zoveel draadlengte als v1 en
//    1,5 × zo dik; draaiing per stap ≤ 0,8 rad.
//  - condenseren is een morph langs de draad (C8): elk punt schuift naar de opgerolde chromatide; de windingen van de
//    oprolling komen er pas laat in (amplitude ∝ c²), zodat c = 0,4–0,6 geen stekelige pluizen geeft. De X-vorm zelf
//    (chromatideX) verschijnt pas vanaf c = 0,75, nooit als spook achter de draden.
//  Bekende fouten: krabbel van dunne lijnen (v1, c = 0); stekelige pluizen met spook-X'en (v1, c = 0,4–0,6); zigzag- of veerpatroon.
// cx, cy, r = kern; o.c 0 … 1; o.n (46); o.seed; o.kleuren(i); o.membraan 0..1; o.dichtheid (1 = standaard, 3 = oude krabbel).
// Geeft de posities van de chromosomen terug. Gebruikt dnaDraad (nu in lib_bio.js).
// =====================================================================================
function _chromDraad(i, P, r, seed, N, st = r * 0.03, draai = 0.8) { // losse kronkelende draad in het territorium van chromosoom i
  // stuurt zacht terug naar het midden van het territorium (max 0,35 rad per stap): geen knikken of punten
  const pts = []; let px = P.x, py = P.y, an = hash(i * 7 + seed) * 6.283; const terr = P.ln * 0.6 + r * 0.06;
  for (let k = 0; k < N; k++) { an += (hash(i * 131 + k * 17 + seed) - 0.5) * draai + Math.sin(k * 0.37 + i) * 0.12;
    const dx = px - P.x, dy = py - P.y, d = Math.hypot(dx, dy), dk = Math.hypot(px, py);
    const trek = Math.max(clamp((d - terr * 0.6) / (terr * 0.4), 0, 1), clamp((dk - r * 0.72) / (r * 0.12), 0, 1));
    if (trek > 0) { const doel = Math.atan2(-(dk > r * 0.72 ? py : dy), -(dk > r * 0.72 ? px : dx)); let df = doel - an; df = Math.atan2(Math.sin(df), Math.cos(df)); an += clamp(df, -0.35, 0.35) * trek; }
    px += Math.cos(an) * st; py += Math.sin(an) * st; const dd = Math.hypot(px, py); if (dd > r * 0.86) { px *= r * 0.86 / dd; py *= r * 0.86 / dd; } pts.push([px, py]); }
  return pts;
}
function _chromHer(P, N) { // pad opnieuw bemonsteren: N punten op gelijke booglengte
  const G = _bioGelijk(_bioCR(P, false, 6), 1, false), out = []; for (let k = 0; k < N; k++) { const q = G[Math.round(k / (N - 1) * (G.length - 1))]; out.push([q.x, q.y]); } return out; }
function _chromDoelA(P, s, w, coils, amp) { // als _chromDoel, met windingsamplitude amp (0 = gladde X-arm)
  const cen = 0.38, L = P.ln, kant = s < 0.5 ? -1 : 1, u = s < 0.5 ? s * 2 : (1 - s) * 2;
  const yy = -L * cen + u * L, buig = Math.abs(yy) / L; const xx = kant * (w * 0.55 + buig * w * 0.55);
  const ph = u * coils * 6.283, cx = xx + Math.sin(ph) * w * 0.42 * amp, cy = yy + Math.cos(ph) * w * 0.12 * amp;
  const cs = Math.cos(P.rot), sn = Math.sin(P.rot); return [P.x + cx * cs - cy * sn, P.y + cx * sn + cy * cs];
}
function kernChromatine(ctx, cx, cy, r, o = {}) {
  const { a = 1, c = 0, n = 46, seed = 4, membraan = 1, kleuren = null, t = 0, dichtheid = 1, dw = Math.max(2.2, r * 0.0135) } = o; if (a <= 0.01) return [];
  const e = ease(c), pos = _chromLayout(n, r, seed);
  ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.ellipse(cx, cy, r, r * 0.94, 0, 0, 6.283); ctx.fillStyle = rgba(C.kern, 0.28); ctx.fill();
  if (membraan > 0.01) { ctx.save(); ctx.globalAlpha *= membraan; ctx.strokeStyle = C.kernR; ctx.lineWidth = Math.max(1.5, r * 0.008);
    [1, 0.975].forEach(f => { ctx.beginPath(); ctx.ellipse(cx, cy, r * f, r * 0.94 * f, 0, 0, 6.283); ctx.stroke(); });
    for (let k = 0; k < 40; k++) { const an = k / 40 * 6.283 + 0.04; const px = cx + Math.cos(an) * r * 0.988, py = cy + Math.sin(an) * r * 0.94 * 0.988; _bioCirc(ctx, px, py, Math.max(2, r * 0.017), C.bgMicro || '#121A26', C.kernR, Math.max(1, r * 0.004)); } ctx.restore(); }
  if (e < 0.95) { ctx.save(); ctx.globalAlpha *= 1 - e; ctx.beginPath(); ctx.ellipse(cx + r * 0.22, cy - r * 0.12, r * 0.17, r * 0.14, 0.4, 0, 6.283); shape(ctx, '#4A3770', '#7A68B8', Math.max(1.2, r * 0.005));
    ctx.beginPath(); ctx.ellipse(cx + r * 0.2, cy - r * 0.14, r * 0.07, r * 0.055, 0.4, 0, 6.283); ctx.fillStyle = '#3A2A5C'; ctx.fill(); ctx.restore(); } // kernlichaampje (nucleolus) met donkerder kern
  ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy, r * 0.965, r * 0.9, 0, 0, 6.283); ctx.clip();
  const N = 80, out = [];
  pos.forEach((P, i) => { const kl = kleuren ? kleuren(i) : C.kernR, dk = kleuren ? _mixHex(kl, '#000000', 0.35) : C.kern; const w = P.ln * 0.17;
    const Nd = Math.max(8, Math.round((8 + 30 * CHROM_MB[P.nr] / 249) * 0.8 * dichtheid)); // lengte naar baseparen (chr 1 ± 5× chr 21)
    const D = _chromHer(_chromDraad(i, P, r, seed, Nd, r * 0.05), N); const amp = e * e;
    const pts = D.map((p, k) => { const q = _chromDoelA(P, k / (N - 1), w, 7 + Math.round(P.ln / r * 12), amp); return [cx + lerp(p[0], q[0], e), cy + lerp(p[1], q[1], e)]; });
    if (e > 0.75) chromatideX(ctx, cx + P.x, cy + P.y, P.ln, P.rot, { a: (e - 0.75) / 0.25, w, kleur: kl, donker: dk });
    dnaDraad(ctx, pts, { w: lerp(dw, w * 0.34, e * e), kleur: kl, donker: dk, a: 1 - 0.8 * clamp((e - 0.8) / 0.2, 0, 1), helix: false });
    out.push({ x: cx + P.x, y: cy + P.y, len: P.ln, rot: P.rot, nr: P.nr }); });
  ctx.restore(); ctx.restore(); return out;
}
