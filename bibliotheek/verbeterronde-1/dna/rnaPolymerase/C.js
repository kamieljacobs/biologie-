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
// punt-in-veelhoek (ontwerpeenheden) als 'binnen'-functie voor _grKluwen; bbox erbij
function _lintVorm(poly) { const xs = poly.map(p => p[0]), ys = poly.map(p => p[1]);
  return { binnen: (x, y) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; },
    bbox: [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)] }; }
// =====================================================================================
// RNA-POLYMERASE MET TRANSCRIPTIEBEL — variant C (beeldbank ronde 2, 27 okt 2026): A (winnaar) + kaken en klep als gevouwen
// eiwitlint (_grKluwen), en het DNA-RNA-hybride duidelijk: RNA-basen in puzzelvorm tegenover de matrijs met gouden paarstreepjes.
// Recept (OpenStax Biology 2e § 15.2: 'the DNA unwinds ahead of the polymerase and then rewinds behind it', RNA 5' → 3' met
// ± 40 nt/s, promotor stroomopwaarts, terminator laat los; Barnes e.a. 2015 Mol Cell 59:258: transcriptiebel ± 8–22 nt open,
// kort DNA-RNA-hybride ± 8–9 bp):
//  - de polymerase (grijsblauw eiwit, actief centrum goud) zit óp het DNA en opent het alleen lokaal (bel ± 14 bp); vóór en
//    achter de bel blijft het een rechtsdraaiende dubbele helix (dnaLadderHelix) — duidelijk anders dan replicatie: geen vork,
//    geen twee nieuwe strengen, maar één dunne teal mRNA-sliert die uit het enzym komt.
//  - de matrijsstreng (onder) wordt 3' → 5' gelezen; het mRNA groeit 5' → 3' met U tegenover A; ± 8 basen vormen een hybride
//    met de matrijs, daarna laat het mRNA los en verlaat het enzym schuin naar boven.
//  - standen: 'bind' (op de promotor, DNA nog dicht), 'open' (bel open, nog geen RNA), 'lees' (bel + mRNA van o.mrna px),
//    'los' (terminator: enzym en mRNA laten los, DNA sluit). Animeer de beweging door x te verschuiven (DNA ligt stil).
//  Bekende fouten: replicatievork; RNA dat aan beide strengen ontstaat; DNA dat open blijft achter de polymerase; dik mRNA.
// rnaPolymerase(ctx, x, y, s, {stand, mrna, x0, x1, seq, t, a}); (x, y) = actief centrum op de DNA-as; s = schaal (1 ≈ 240 px breed).
// Geeft {actief, p5 (mRNA-uiteinde), bel: [xa, xb]} terug.
// =====================================================================================
function _rnapDNA(ctx, x, y, u, o) { const { x0 = x - 6 * u, x1 = x + 6 * u, open = 1, seq = 'TACGGATCCATGAAGTTCGGACTGATCCGTAGCTTAG' } = o;
  const dx = 0.1 * u, R = 0.27 * u, xa = x - 1.0 * u, xb = x + 0.4 * u, s = R / 110 * 0.62 * 1.6;
  const helix = (xs, xe, fase) => { if (xe - xs < dx * 2) return; const n = Math.floor((xe - xs) / dx) + 1; dnaLadderHelix(ctx, xs, y, dx, seq.repeat(4).slice(0, n), { draai: 1, R, s: Math.max(0.05, s), fase, toonBasen: 1 }); };
  if (open < 0.01) { helix(x0, x1, 0); return { xa, xb, dx, R, dicht: true }; }
  helix(x0, xa, 0); helix(xb, x1, (xb - x0) / dx * 0.628);
  // bel: codestreng boog omhoog, matrijs boog omlaag, met losse basen naar binnen
  const H = (X) => Math.sin(clamp((X - xa) / (xb - xa), 0, 1) * Math.PI) * open;
  const rug = D2.oud, bw = Math.max(3, R * 0.2), Ltop = [], Lbot = [];
  for (let X = xa; X <= xb + 0.01; X += dx * 0.5) { Ltop.push([X, y - R - H(X) * 0.35 * u]); Lbot.push([X, y + R + H(X) * 0.25 * u]); }
  const tB = [], cB = []; for (let X = xa + dx * 0.5, i = 0; X < xb; X += dx, i++) { const b = seq[i % seq.length]; tB.push([X, b]); cB.push([X, D2.comp[b]]); }
  return { xa, xb, dx, R, bw, Ltop, Lbot, tB, cB, H, rug }; }
function _rnapStrengen(ctx, D, y, u, mrna, t) { if (D.dicht) return null; const { xa, xb, dx, R, bw, Ltop, Lbot, tB, cB, H, rug } = D; const L = Math.max(4, R * 0.75);
  cB.forEach(([X, b]) => d2Base(ctx, X, y - R - H(X) * 0.35 * u + bw * 0.4, Math.PI / 2, b, L * (1 - 0.35 * H(X)), Math.max(1.5, dx * 0.32), { vorm: false }));
  tB.forEach(([X, b]) => d2Base(ctx, X, y + R + H(X) * 0.25 * u - bw * 0.4, -Math.PI / 2, D2.comp[b], L, Math.max(1.5, dx * 0.32), { vorm: dx >= 22, letter: dx >= 30 }));
  d2Rug(ctx, Ltop, { kleur: rug, bw }); d2Rug(ctx, Lbot, { kleur: rug, bw });
  // RNA: hybride over de laatste 8 nt vóór het actieve centrum, daarna los en schuin omhoog naar achteren
  if (mrna > 0) { const xs = xb - dx * 1.5, yh = (X) => y + R + H(X) * 0.25 * u - L * 1.9; const P = [];
    for (let k = 0; k <= 8 && k * dx <= mrna; k++) P.push([xs - k * dx, yh(xs - k * dx)]);
    const rest = mrna - 8 * dx; if (rest > 0) { const [px, py] = P[P.length - 1]; for (let q = 1; q <= 40; q++) { const f = q / 40, d = rest * f; P.push([px - d * 0.55 + Math.sin(f * 7 + t) * u * 0.05, py - d * 0.75 + Math.sin(f * 5 - t * 0.7) * u * 0.06]); } }
    // basen van het hybride (U tegenover A)
    for (let k = 0; k < 8 && k * dx <= mrna; k++) { const X = xs - k * dx, tb = tB.find(q => Math.abs(q[0] - X) < dx * 0.6); if (!tb) continue; const rb = D2.rcomp[D2.comp[tb[1]]] ; const rbb = rb === 'T' ? 'U' : rb, Lr = L * 0.85; d2Base(ctx, X, yh(X), Math.PI / 2, rbb, Lr, Math.max(1.5, dx * 0.32), { vorm: dx >= 22, rna: true, letter: dx >= 30 });
      ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(1.2, dx * 0.05); ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(X, yh(X) + Lr * 0.98); ctx.lineTo(X, y + R + H(X) * 0.25 * u - L * 0.98); ctx.stroke(); ctx.restore(); }
    ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.strokeStyle = '#2E6F92'; ctx.lineWidth = Math.max(2.5, bw * 0.55) + 2; ctx.stroke(); ctx.strokeStyle = '#5BA4C9'; ctx.lineWidth = Math.max(2.5, bw * 0.55); ctx.stroke(); ctx.restore();
    return P[P.length - 1]; } return null; }
function rnaPolymerase(ctx, x, y, s = 1, o = {}) {
  const { a = 1, stand = 'lees', mrna = 0, t = 0 } = o; if (a <= 0.01) return {}; const u = 100 * s;
  const open = stand === 'bind' || stand === 'los' ? 0 : 1, los = stand === 'los' ? 1 : 0, rL = stand === 'lees' || stand === 'los' ? mrna : 0;
  ctx.save(); ctx.globalAlpha *= a;
  const ex = x - 0.3 * u, ey = y - los * 0.75 * u; // enzymmidden (tilt omhoog bij loslaten)
  // achterkant van het enzym (achter het DNA): grote kluwen met een kanaal
  ctx.beginPath(); bioPad(ctx, [[ex - 1.25 * u, ey + 0.1 * u], [ex - 1.05 * u, ey - 0.85 * u], [ex - 0.2 * u, ey - 1.15 * u], [ex + 0.8 * u, ey - 0.95 * u], [ex + 1.25 * u, ey - 0.25 * u], [ex + 1.15 * u, ey + 0.7 * u], [ex + 0.3 * u, ey + 1.0 * u], [ex - 0.8 * u, ey + 0.85 * u]], true); shape(ctx, '#3E4B60', '#6F7E98', 1.5);
  if (u >= 60) { ctx.save(); ctx.beginPath(); ctx.rect(ex - 2 * u, ey - 2 * u, 4 * u, 4 * u); ctx.ellipse(x - 0.3 * u, y, 0.95 * u, 0.62 * u, 0, 0, 6.283); ctx.clip('evenodd'); const pts = [[-1.25, 0.1], [-1.05, -0.85], [-0.2, -1.15], [0.8, -0.95], [1.25, -0.25], [1.15, 0.7], [0.3, 1.0], [-0.8, 0.85]], V = _lintVorm(pts.map(([px, py]) => [px * 92, py * 92])); _grKluwen(ctx, ex, ey, V.binnen, { bbox: V.bbox, sc: u / 100, r: 8, col: '#4A5870', seed: 9, key: 'rnapRug' }); ctx.restore(); } // achterkant als donker lint, niet in de bel
  const D = _rnapDNA(ctx, x, y, u, Object.assign({}, o, { open }));
  let p5 = null; if (los < 1) p5 = _rnapStrengen(ctx, D, y, u, rL, t); else { // los: DNA dicht, mRNA drijft weg
    const P = []; for (let q = 0; q <= 40; q++) { const f = q / 40; P.push([x - 0.6 * u - f * rL * 0.8, y - 0.9 * u - f * rL * 0.3 + Math.sin(f * 6 + t) * u * 0.08]); } ctx.save(); ctx.lineCap = 'round'; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.strokeStyle = '#5BA4C9'; ctx.lineWidth = Math.max(2.5, u * 0.04); ctx.stroke(); ctx.restore(); p5 = P[P.length - 1]; }
  // voorkant: onderkaak onder de matrijs en klep boven de codestreng, elk als gevouwen lint met silhouet (de bel blijft vrij)
  const deel = (pts, col, seed, naam) => { const P = pts.map(([px, py]) => [ex + px * u, ey + py * u]); ctx.beginPath(); bioPad(ctx, P, true);
    if (u < 60) { shape(ctx, col, lighten(col, 0.3), 1.5); return; } ctx.fillStyle = rgba(_mixHex(col, '#121A26', 0.4), 0.85); ctx.fill();
    const V = _lintVorm(pts.map(([px, py]) => [px * 100, py * 100])); _grKluwen(ctx, ex, ey, V.binnen, { bbox: V.bbox, sc: u / 100, r: 7, col, seed, key: 'rnap' + naam }); };
  deel([[-1.1, 0.55], [-0.4, 0.65], [0.5, 0.6], [1.05, 0.55], [0.9, 0.98], [-0.7, 1.02]], '#7A8BA8', 3, 'kaak');
  deel([[0.2, -0.98], [0.95, -0.88], [1.28, -0.35], [0.95, -0.42], [0.45, -0.62]], '#8796B0', 6, 'klep');
  const act = [D.xb - D.dx * 1.5, y + D.R + 0.25 * u * open - D.R * 0.75 * 1.0]; if (open && !los) _bioCirc(ctx, act[0], act[1], Math.max(2.5, u * 0.05), rgba(C.goud, 0.85), C.goud, 1.5);
  ctx.restore(); return { actief: act, p5, bel: [D.xa, D.xb] };
}
