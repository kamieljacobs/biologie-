// =====================================================================================
// UV-SCHADE EN HERSTEL (basenniveau). Recept (Lodish 8e § 5.6 'Nucleotide excision repair' (fig. 5-38); OpenStax Biology 2e
// § 14.6; LibreTexts Microbiology (Liu e.a.) § 13.2):
//  - UV-licht laat twee T's die naast elkaar op dezelfde streng liggen aan elkaar vastgaan (thymine-dimeer, koraal klem);
//    de helix vervormt (knik), daardoor kunnen replicatie en transcriptie er niet langs.
//  - herstel door uitsnijden: een enzymcomplex herkent de vervorming, knipt de beschadigde streng aan beide kanten van de
//    dimeer (bij de mens komt een stuk van ± 24–32 nucleotiden vrij; hier korter: 'schematisch'), het stuk gaat weg,
//    DNA-polymerase vult het gat met de juiste nucleotiden (de andere streng is de mal) en DNA-ligase sluit de laatste naad.
//  - o.f 0..1: 0–0.15 UV-straal · 0.15–0.3 dimeer + knik · 0.3–0.5 enzym knipt · 0.5–0.65 stuk eruit · 0.65–0.85 aanvullen ·
//    0.85–1 ligase sluit.
// Bekende fouten: T's op tegenover elkaar liggende strengen die vastgaan; alleen de twee T's eruit; beide strengen geknipt;
// gat dat zonder mal wordt gevuld.
// (x, y) = midden; s = schaal (± 900 × 420 px bij s = 1). o.f, o.t. Plaatshouders voor de enzymen (kluwen). Geeft {dimeer, knip:[[x,y],[x,y]], enzym, gat} terug.
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
function _uvGolf(ctx, x0, y0, x1, y1, s, a = 1, fase = 0) { if (a <= 0.01) return; const L = Math.hypot(x1 - x0, y1 - y0), an = Math.atan2(y1 - y0, x1 - x0); ctx.save(); ctx.globalAlpha *= a; ctx.translate(x0, y0); ctx.rotate(an);
  ctx.strokeStyle = '#C8B4F0'; ctx.lineWidth = 3 * s; ctx.lineCap = 'round'; ctx.beginPath(); for (let u = 0; u <= L; u += 3 * s) { const Y = Math.sin(u / (9 * s) - fase) * 9 * s * clamp(u / (40 * s), 0, 1); u ? ctx.lineTo(u, Y) : ctx.moveTo(u, Y); } ctx.stroke();
  ctx.fillStyle = '#C8B4F0'; ctx.beginPath(); ctx.moveTo(L + 12 * s, 0); ctx.lineTo(L - 6 * s, -10 * s); ctx.lineTo(L - 6 * s, 10 * s); ctx.closePath(); ctx.fill(); ctx.restore(); }
function uvSchade(ctx, x, y, s = 1, o = {}) {
  const { a = 1, f = 0, t = 0, seq = 'GCAGCTTACGAGC' } = o; if (a <= 0.01) return {};
  const p1 = ease(clamp(f / 0.15, 0, 1)), p2 = ease(clamp((f - 0.15) / 0.15, 0, 1)), p3 = ease(clamp((f - 0.3) / 0.2, 0, 1)), p4 = ease(clamp((f - 0.5) / 0.15, 0, 1)), p5 = ease(clamp((f - 0.65) / 0.2, 0, 1)), p6 = ease(clamp((f - 0.85) / 0.15, 0, 1));
  const n = seq.length, dx = 64 * s, k = 0.74 * s, H = (184 * k + 16 * s) / 2, x0 = x - (n - 1) * dx / 2, i1 = seq.indexOf('TT'), i2 = i1 + 1, c0 = i1 - 3, c1 = i2 + 3, uit = {};
  const comp = { A: 'T', T: 'A', C: 'G', G: 'C' }, knik = p2 * (1 - p4);
  ctx.save(); ctx.globalAlpha *= a;
  // knik: de bovenstreng buigt rond de dimeer omhoog (vervorming die het enzym herkent)
  const yT = (i) => y - H - knik * 26 * s * Math.exp(-Math.pow((i - (i1 + 0.5)) / 1.3, 2)), yB = () => y + H;
  for (let i = 0; i < n; i++) { const xx = x0 + i * dx; baseRing(ctx, xx, yB() - 8 * s, comp[seq[i]], -1, { s: k, plekA: 0 }); }
  ctx.save(); ctx.strokeStyle = DNA_BASE.rugR; ctx.lineWidth = 15 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0 - 22 * s, yB()); ctx.lineTo(x0 + (n - 1) * dx + 22 * s, yB()); ctx.stroke(); ctx.strokeStyle = DNA_BASE.rug; ctx.lineWidth = 8 * s; ctx.stroke(); ctx.restore();
  // bovenstreng: oud deel, weggeknipt stuk (gaat omhoog weg), nieuw deel (licht) dat de polymerase aanvult
  const weg = p4 * 140 * s, nieuwTot = c0 + (c1 - c0 + 1) * p5; // index tot waar het nieuwe stuk is aangevuld
  const tekenBoven = (i, dy, alpha, nieuw) => { const xx = x0 + i * dx, tilt = (i === i1 ? 1 : i === i2 ? -1 : 0) * 0.32 * knik; baseRing(ctx, xx, yT(i) + 8 * s - dy, seq[i], 1, { s: k, plekA: 0, a: alpha, rot: tilt });
    if (nieuw) { roundRect(ctx, xx - 26 * k, yT(i) + 4 * s, 52 * k, 6 * s, 3 * s); ctx.fillStyle = '#DCD4F5'; ctx.fill(); } };
  for (let i = 0; i < n; i++) { const inStuk = i >= c0 && i <= c1; if (!inStuk) tekenBoven(i, 0, 1, false); else { if (p4 < 1) tekenBoven(i, weg, 1 - p4, false); if (p5 > 0.01 && i < nieuwTot) tekenBoven(i, 0, clamp(nieuwTot - i, 0, 1), true); } }
  const rail = (ia, ib, dy, kl1, kl2, al) => { if (al <= 0.01 || ib < ia) return; const P = []; for (let q = ia; q <= ib; q += 0.25) P.push([x0 + q * dx, yT(q) - dy]); ctx.save(); ctx.globalAlpha *= al; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = kl1; ctx.lineWidth = 15 * s; ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke(); ctx.strokeStyle = kl2; ctx.lineWidth = 8 * s; ctx.stroke(); ctx.restore(); };
  rail(-0.35, c0 - 0.5, 0, DNA_BASE.rugR, DNA_BASE.rug, 1); rail(c1 + 0.5, n - 0.65, 0, DNA_BASE.rugR, DNA_BASE.rug, 1);
  rail(c0 - 0.5, c1 + 0.5, weg, DNA_BASE.rugR, DNA_BASE.rug, 1 - p4); if (p5 > 0.01) rail(c0 - 0.5, Math.min(c1 + 0.5, nieuwTot - 0.5), 0, '#DCD4F5', '#B9ACE6', 1);
  // dimeer: koraal klem tussen de twee T's
  if (p2 > 0.01 && p4 < 1) { const xa = x0 + i1 * dx, xb = x0 + i2 * dx, yy = (yT(i1) + yT(i2)) / 2 + DNA_BASE.len * k * 0.45 - weg; ctx.save(); ctx.globalAlpha *= p2 * (1 - p4); ctx.strokeStyle = C.koraal; ctx.lineWidth = 7 * s; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(xa + 12 * s, yy); ctx.lineTo(xb - 12 * s, yy); ctx.stroke(); _bioCirc(ctx, xa + 12 * s, yy, 6 * s, C.koraal); _bioCirc(ctx, xb - 12 * s, yy, 6 * s, C.koraal); ctx.restore(); uit.dimeer = [(xa + xb) / 2, yy]; }
  // UV-straal
  if (f < 0.35) _uvGolf(ctx, x0 + i1 * dx + 260 * s, y - H - 260 * s, x0 + (i1 + 0.5) * dx + 14 * s, y - H - 30 * s, s, Math.min(p1 * 3, 1) * (1 - ease(clamp((f - 0.22) / 0.1, 0, 1))), t * 6 + f * 40);
  // herstelenzym (plaatshouder): komt aan, knipt links en rechts, neemt het stuk mee
  const ex = x0 + (i1 + 0.5) * dx, ey = lerp(y - H - 260 * s, y - H - 62 * s, p3) - weg; const binE = (qx, qy) => { const e1 = qx / 110, e2 = qy / 55; return e1 * e1 + e2 * e2 < 1; };
  if (p3 > 0.01 && p4 < 1) { _grKluwen(ctx, ex, ey, binE, { r: 6, sc: s, col: '#7A8BA8', seed: 29, bbox: [-112, -56, 112, 56], key: 'uvE', a: Math.min(1, p3 * 2) * (1 - p4) }); uit.enzym = [ex, ey - 60 * s]; }
  uit.knip = [[x0 + (c0 - 0.5) * dx, yT(c0 - 0.5)], [x0 + (c1 + 0.5) * dx, yT(c1 + 0.5)]];
  if (p3 > 0.7 && p4 < 0.6) { ctx.save(); ctx.globalAlpha *= (p3 - 0.7) / 0.3; ctx.strokeStyle = C.goud; ctx.lineWidth = 3 * s; uit.knip.forEach(([kx, ky]) => { ctx.beginPath(); ctx.moveTo(kx - 10 * s, ky - 12 * s); ctx.lineTo(kx + 10 * s, ky + 12 * s); ctx.moveTo(kx + 10 * s, ky - 12 * s); ctx.lineTo(kx - 10 * s, ky + 12 * s); ctx.stroke(); }); ctx.restore(); }
  // polymerase (plaatshouder) loopt over het gat; ligase sluit de laatste naad (gouden flits)
  if (p5 > 0.01 && p6 < 1) { const px = x0 + Math.min(nieuwTot, c1 + 0.5) * dx, py = y - H - 70 * s; enzymKluwen(ctx, px, py, 48 * s, { col: '#7A8BA8', seed: 5, an: Math.PI / 2, a: 1 - p6 }); }
  if (p6 > 0.01) { const lx = x0 + (c1 + 0.5) * dx, ly = yT(c1 + 0.5); ctx.save(); ctx.globalAlpha *= Math.sin(p6 * Math.PI); ctx.strokeStyle = C.goud; ctx.lineWidth = 3 * s; ctx.beginPath(); for (let q = 0; q < 8; q++) { const an = q / 8 * 6.283; ctx.moveTo(lx + Math.cos(an) * 12 * s, ly + Math.sin(an) * 12 * s); ctx.lineTo(lx + Math.cos(an) * 24 * s, ly + Math.sin(an) * 24 * s); } ctx.stroke(); ctx.restore(); }
  uit.gat = [x0 + (c0 + c1) / 2 * dx, y - H]; ctx.restore(); return uit;
}
