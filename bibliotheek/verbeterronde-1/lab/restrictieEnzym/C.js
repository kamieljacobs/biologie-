// =====================================================================================
// RESTRICTIE-ENZYM (EcoRI), lintmodel: eiwit dat langs het DNA glijdt, de herkenningsplek GAATTC vindt, zich vastklemt en
// beide strengen verspringend knipt, zodat er plakkerige uiteinden (AATT) ontstaan.
// Recept (OpenStax Biology 2e § 17.1: restrictie-enzymen herkennen een vaste volgorde en knippen voorspelbaar, vaak
//  verspringend → plakkerige uiteinden die met complementaire uiteinden kunnen paren; EcoRI: G↓AATTC, homodimeer
//  van twee gelijke ketens van ± 31 kDa, 5′-overhang AATT). De plek is een palindroom: beide strengen lezen van
//  5′ naar 3′ GAATTC, daarom past één symmetrisch dimeer en knipt elke helft één streng op dezelfde plek in zijn
//  eigen leesrichting. Maten: elk eiwitdeel ± 5 nm, DNA 2 nm breed, 0,34 nm per basepaar.
//  Stappen: o.stap 0–1 glijden, 1–2 herkennen en klemmen (plek goud omrand), 2–2,5 knippen (zigzag),
//  2,5–3 loslaten, uiteinden wijken uiteen.
//  Eiwit = gevouwen keten in het gedeelde lintmodel (_grKluwen), géén schaar-icoon. Het dimeer KLEMT om het DNA: elke
//  helft ligt aan één kant van de dubbelstreng en steekt met een arm vóór het DNA langs naar de andere kant
//  (de armen grijpen pas als de plek herkend is). Na het knippen wijken de stukken ± 3 bp uiteen, zodat de
//  uitstekende AATT (boven, rechts) en TTAA (onder, links) als losse basen te zien zijn. Een DNA-schaar alleen als metafoor in tekst.
//  Bekende fouten: rechte knip; één streng geknipt; enzym als schaar; uitsteeksels die niet AATT/TTAA zijn.
// x, y = midden van de herkenningsplek op het DNA; s = px per 0,1 nm (DNA-breedte = 20 · s px). o.stap 0..3,
// o.t, o.a. Geeft { enzym, site, knipBoven, knipOnder } terug.
// =====================================================================================
// -------------------------------------------------------------------------------------
// GEDEELD HULPJE (groep genregulatie, ronde 2, 27 okt 2026): EIWITKLUWEN als ÉÉN GEVOUWEN KETEN (lintmodel). Eén keer in
// lib_bio.js plakken; transcriptiefactor, lacOperon, rnaInterferentie en uvSchade gebruiken het (kopieën in hun bestanden zijn gelijk).
// Recept (C9, BEELDAFSPRAKEN 'eiwitten zijn een keten die vouwt'; vouwstanden als eiwitVouw): de ruggengraat is één doorlopende
// gladde buis (dikke lijn met lichte rand) die heen en weer door de omtrek loopt; 2–3 stukken zijn α-helix (spiraaltje,
// 3,6 aminozuren per winding, voorkant licht, achterkant donker) en een paar stukken zijn β-streng (brede pijl, buren
// antiparallel = een plaat); bochten zijn lussen. Samen een compacte kluwen; de omtrek (binnen(x, y), ontwerpeenheden) mag een
// pasvorm hebben. o.fold 0 = gestrekte keten → 1 = gevouwen (helices en pijlen verschijnen pas aan het eind van het vouwen).
// o.sc = schaal; o.r = buisdikte-maat; o.key = cachesleutel. Geeft de punten van de hartlijn in beeld terug ([x, y, z]).
// Bekende fouten: losse kralen of bolletjeswolk; een bol; helix als zigzag zonder voor/achter.
// -------------------------------------------------------------------------------------
const _grKluwenCache = {};
function _grKluwenVorm(binnen, bbox, r, seed) { // rijen door de omtrek, met soort per rij: h = helix, s = streng, l = lus
  const rows = [], gap = r * 3.1; for (let y = bbox[1] + r * 1.8; y <= bbox[3] - r * 1.4; y += gap) rows.push(y);
  const spans = []; rows.forEach(y => { let best = null, cur = null; for (let x = bbox[0]; x <= bbox[2]; x += r * 0.4) { if (binnen(x, y)) { if (!cur) cur = [x, x]; cur[1] = x; } else if (cur) { if (!best || cur[1] - cur[0] > best[1] - best[0]) best = cur; cur = null; } }
    if (cur && (!best || cur[1] - cur[0] > best[1] - best[0])) best = cur; if (best && best[1] - best[0] > r * 3) spans.push([y, best[0] + r * 1.3, best[1] - r * 1.3]); });
  const n = spans.length, soort = spans.map(() => 'l'); let h = 0, st = 0;
  const volg = spans.map((_, i) => i).sort((a, b) => hash(seed * 3.1 + a * 7.7) - hash(seed * 3.1 + b * 7.7));
  volg.forEach(i => { const L = spans[i][2] - spans[i][1]; if (h < Math.min(3, Math.max(1, Math.round(n / 3))) && L > r * 6 && soort[i - 1] !== 'h' && soort[i + 1] !== 'h') { soort[i] = 'h'; h++; } });
  for (let i = 0; i < n - 1 && st < 4; i++) if (soort[i] === 'l' && soort[i + 1] === 'l' && hash(seed + i * 2.3) > 0.25) { soort[i] = soort[i + 1] = 's'; st += 2; i++; }
  return spans.map((sp, i) => ({ y: sp[0], x0: sp[1], x1: sp[2], dir: i % 2 ? -1 : 1, soort: soort[i] })); }
function _grKluwen(ctx, cx, cy, binnen, o = {}) {
  const { r = 7, sc = 1, col = '#7A8BA8', seed = 1, a = 1, rot = 0, bbox = [-60, -50, 60, 50], fold = 1, key = null, hl = null } = o; if (a <= 0.01) return [];
  const k = (key || 'k') + '|' + seed + '|' + r + '|' + bbox.join(','); let V = _grKluwenCache[k];
  if (!V) { const rijen = _grKluwenVorm(binnen, bbox, r, seed), P = [];
    rijen.forEach((rj, i) => { const xa = rj.dir > 0 ? rj.x0 : rj.x1, xb = rj.dir > 0 ? rj.x1 : rj.x0;
      if (i > 0) { const q = P[P.length - 1], bx = xa - rj.dir * r * 2.2; for (let u = 0.2; u < 1; u += 0.2) P.push([lerp(q[0], xa, u) + Math.sin(u * Math.PI) * -rj.dir * r * 2.2, lerp(q[1], rj.y, u), 'l', -1]); }
      const m = Math.max(4, Math.round(Math.abs(xb - xa) / (r * 0.8))), Lr = Math.abs(xb - xa), maxL = rj.soort === 'h' ? r * 10 : r * 13, w0 = Lr > maxL ? (Lr - maxL) / 2 / Lr : 0;
        for (let j = 0; j <= m; j++) { const u = j / m, x = lerp(xa, xb, u), tp = (u >= w0 - 1e-6 && u <= 1 - w0 + 1e-6) ? rj.soort : 'l'; P.push([x, rj.y + Math.sin(x / (r * 7) + i * 1.7 + seed) * r * 0.9 + (tp === 'l' ? Math.sin(u * 5 + seed + i) * r * 0.7 * (rj.soort === 'l' ? 1 : 0.4) : 0), tp, tp === 'l' ? -1 : i]); } });
    V = { P, rijen: rijen }; _grKluwenCache[k] = V; }
  const n = V.P.length, cs = Math.cos(rot), sn = Math.sin(rot), Lst = n * r * 0.85;
  const W = (x, y) => [cx + (x * cs - y * sn) * sc, cy + (x * sn + y * cs) * sc];
  const pts = V.P.map((p, i) => { const f = ease(clamp(fold * 1.3 - (i / n) * 0.3, 0, 1)); const bx = -Lst / 2 + i * r * 0.85, by = Math.sin(i * 0.22 + seed) * r * 2.5; return [...W(lerp(bx, p[0], f), lerp(by, p[1], f)), 0]; });
  const deco = ease(clamp((fold - 0.75) / 0.25, 0, 1)), w = r * sc * 1.05, rand = lighten(col, 0.38), donker = _mixHex(col, '#000000', 0.28);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const buis = (Q, kl = col, ww = w) => { if (Q.length < 2) return; ctx.beginPath(); bioPad(ctx, Q, false); ctx.strokeStyle = rand; ctx.lineWidth = ww + 2.4 * Math.max(0.5, sc); ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = ww; ctx.stroke(); };
  // 1) de hele keten als buis (bij helices/strengen alleen zolang ze nog niet gevormd zijn)
  ctx.save(); let seg = []; const flush = () => { buis(seg); seg = []; };
  pts.forEach((p, i) => { const tp = V.P[i][2]; if (tp === 'l' || deco < 0.5) seg.push(p); else { if (seg.length) { seg.push(p); flush(); } } }); flush(); ctx.restore();
  if (deco > 0.01) { ctx.save(); ctx.globalAlpha *= deco;
    V.rijen.forEach((rj, i) => { if (rj.soort === 'l') return; const ids = V.P.map((p, j) => p[3] === i ? j : -1).filter(j => j >= 0); if (ids.length < 2) return; const A = pts[ids[0]], B = pts[ids[ids.length - 1]];
      const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, isHl = hl && hl(ids[0], n) > 0.5, kl = isHl ? C.goud : col, rd = isHl ? lighten(C.goud, 0.35) : rand;
      if (rj.soort === 's') { const hw = r * sc * 0.95, kop = Math.min(L * 0.35, r * sc * 2.4), q = (t2, s2) => [A[0] + ux * t2 + nx * s2, A[1] + uy * t2 + ny * s2];
        const poly = [q(0, -hw), q(L - kop, -hw), q(L - kop, -hw * 1.75), q(L, 0), q(L - kop, hw * 1.75), q(L - kop, hw), q(0, hw)]; ctx.beginPath(); poly.forEach((p, j) => j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); shape(ctx, lighten(kl, 0.06), rd, 1.2 * Math.max(0.6, sc)); }
      else { const amp = r * sc * 1.35, tw = Math.max(2, Math.round(L / (amp * 2.1))), N = tw * 24, H = []; for (let j = 0; j <= N; j++) { const u = j / N, ph = u * tw * 6.283; H.push([A[0] + ux * L * u + nx * Math.sin(ph) * amp, A[1] + uy * L * u + ny * Math.sin(ph) * amp, Math.cos(ph)]); }
        [false, true].forEach(voor => { let s2 = []; H.forEach(p => { if ((p[2] >= 0) === voor) s2.push(p); else { if (s2.length > 1) buis(s2, voor ? lighten(kl, 0.12) : _mixHex(isHl ? C.goud : col, '#000000', 0.3), w * (voor ? 1.25 : 1.0)); s2 = []; } }); if (s2.length > 1) buis(s2, voor ? lighten(kl, 0.12) : _mixHex(isHl ? C.goud : col, '#000000', 0.3), w * (voor ? 1.25 : 1.0)); }); } });
    ctx.restore(); }
  ctx.restore(); return pts;
}

function restrictieEnzym(ctx, x, y, s, o = {}) {
  const { a = 1, stap = 1, t = 0 } = o; const st = clamp(stap, 0, 3);
  const glij = clamp(st, 0, 1), klem = clamp(st - 1, 0, 1), knip = clamp((st - 2) / 0.5, 0, 1), los = clamp((st - 2.5) / 0.5, 0, 1);
  const bp = 3.4, L = 10, seq = 'TACCTGCAGTCGAATTCTAGCCATGGTA', iSite = 10, n = seq.length, comp = { A: 'T', T: 'A', C: 'G', G: 'C' };
  const X = (i) => x + (i - iSite - 2.5) * bp * s, yT = y - L * s, yB = y + L * s;
  const ex = x + lerp(-110, 0, ease(glij)) * s + Math.sin(t * 3) * (glij < 1 ? 2 * s : 0), ey = y, weg = ease(los) * 16 * s, ea = 1 - ease(los) * 0.8, dicht = lerp(14, 0, ease(klem)) * s;
  const uit = ease(los) * 3.4 * bp * s; const dxT = (i) => (knip >= 1 && i >= iSite + 1 ? uit : 0), dxB = (i) => (knip >= 1 && i >= iSite + 5 ? uit : 0);
  const ret = { enzym: [ex, ey], site: [X(iSite + 2.5), y], knipBoven: [X(iSite + 0.5), yT], knipOnder: [X(iSite + 4.5), yB] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  // twee gelijke helften achter het DNA (boven en, puntgespiegeld, onder)
  const D = dicht + weg, kleur = [C.enzym, '#8A7FA8'];
  [1, -1].forEach((sg, k) => _grKluwen(ctx, ex, y - sg * (33 * s + D), (px, py) => (px / 42) ** 2 + (py / 21) ** 2 < 1, { r: 3, sc: s, col: kleur[k], seed: 4, bbox: [-42, -21, 42, 21], key: 'reeSub', rot: sg > 0 ? 0 : Math.PI, a: ea }));
  const hw = bp * s * 0.34, rw = Math.max(2.5, bp * s * 0.35), herken = klem > 0.3;
  const rug = (yy, i0, i1, dxf) => { ctx.strokeStyle = D2.oud; ctx.lineWidth = rw; ctx.beginPath(); ctx.moveTo(X(i0) - bp * s * 0.45 + dxf(i0), yy); ctx.lineTo(X(i1) + bp * s * 0.45 + dxf(i1), yy); ctx.stroke(); };
  if (knip >= 1) { rug(yT, 0, iSite, dxT); rug(yT, iSite + 1, n - 1, dxT); rug(yB, 0, iSite + 4, dxB); rug(yB, iSite + 5, n - 1, dxB); }
  else { rug(yT, 0, n - 1, dxT); rug(yB, 0, n - 1, dxB); }
  for (let i = 0; i < n; i++) { const inSite = i >= iSite && i < iSite + 6; const rand = inSite && herken ? C.goud : null;
    d2Base(ctx, X(i) + dxT(i), yT, Math.PI / 2, seq[i], L * s, hw, { rand, letter: s >= 2.5 }); d2Base(ctx, X(i) + dxB(i), yB, -Math.PI / 2, comp[seq[i]], L * s, hw, { rand, letter: s >= 2.5 }); }
  // de zigzag-knip oplichten
  if (knip > 0.01 && los < 0.7) { ctx.save(); ctx.globalAlpha *= (knip < 1 ? knip : 1 - los / 0.7); ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(2, 1.2 * s); ctx.setLineDash([4 * s, 3 * s]); ctx.beginPath(); ctx.moveTo(X(iSite + 0.5), yT - L * s * 0.6); ctx.lineTo(X(iSite + 0.5), y); ctx.lineTo(X(iSite + 4.5), y); ctx.lineTo(X(iSite + 4.5), yB + L * s * 0.6); ctx.stroke(); ctx.restore(); }
  // armen vóór het DNA langs (sluiten de klem zodra de plek herkend is) + actieve plekken (goud) bij de twee knipplekken
  const armA = ea * ease(clamp(klem * 1.5, 0, 1)) * (1 - ease(los));
  if (armA > 0.01) [1, -1].forEach((sg, k) => _grKluwen(ctx, ex - sg * 38 * s, y - sg * 6 * s, (px, py) => (px / 8) ** 2 + (py / 34) ** 2 < 1, { r: 3, sc: s, col: kleur[k], seed: 9, bbox: [-8, -34, 8, 34], key: 'reeArm', rot: sg > 0 ? 0 : Math.PI, a: armA }));
  if (herken) { ctx.save(); ctx.globalAlpha *= ea; ctx.fillStyle = C.goud; for (const [px, py] of [[X(iSite + 0.5), yT - 9 * s], [X(iSite + 4.5), yB + 9 * s]]) { ctx.beginPath(); ctx.arc(px + (ex - x), py + (py < y ? -1 : 1) * weg, 3.5 * s, 0, 6.283); ctx.fill(); } ctx.restore(); }
  ctx.restore(); return ret;
}
