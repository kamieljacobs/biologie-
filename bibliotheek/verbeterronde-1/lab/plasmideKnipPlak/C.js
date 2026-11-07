// =====================================================================================
// PLASMIDE KNIPPEN EN PLAKKEN (recombinant DNA), ringaanzicht. Uitbreiding van plasmideRing (lib_micro_evo.js):
// zelfde ring van dubbelstrengs DNA met een resistentiegen in oker, maar nu als proces in vier stappen.
// Recept (OpenStax Biology 2e § 17.1; EcoRI: herkenningsplek G↓AATTC, homodimeer, 5′-overhang AATT):
//  stap 0 → 1 knippen: het restrictie-enzym knipt beide strengen verspringend (zigzag), de ring gaat open; aan elk
//    uiteinde steekt één streng 4 basen uit (plakkerig uiteinde, AATT);
//  stap 1 → 2 plakken: het gen (goud, met dezelfde plakkerige uiteinden want met hetzelfde enzym geknipt) schuift
//    in de opening; de uitstekende basen passen op elkaar;
//  stap 2 → 3 ligase: twee kleine eiwitkluwens sluiten de naden in de ruggengraat (fosfodiësterbinding);
//  stap 3 → 4 terug in de bacterie: de ring krimpt tot ± 1/4 van de bacteriebreedte en ligt helemaal binnen het
//    membraan (Beeldafspraken: niets steekt buiten het celmembraan).
//  Het resistentiegen (oker) blijft op de ring: daarmee selecteer je de bacteriën die het plasmide opnamen.
//  Echte maat: plasmide 2–200 kb; een bacterie ± 2 µm lang. Altijd 'vergroot'.
//  Enzymen in het gedeelde lintmodel (_grKluwen): EcoRI als twee gelijke helften op de knipplek, ligase (groengrijs) op
//  elke naad; een vergrootcirkel toont dan de basen in puzzelvorm met de uitstekende AATT en TTAA (goud omrand).
//  Bekende fouten: recht knippen (stompe uiteinden) bij EcoRI; gen met andere uiteinden dan de opening;
//  plasmide dat buiten de bacterie uitsteekt; schaar-icoon in plaats van een enzym.
// x, y = midden; r = straal van de ring in px. o.stap 0..4, o.letters (AATT bij grote ring, standaard aan als r ≥ 110),
// o.a, o.t. Geeft { knip, gen, resistentie, naden:[[x,y],[x,y]], bacterie } terug.
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

function plasmideKnipPlak(ctx, x, y, r, o = {}) {
  const { a = 1, stap = 0, t = 0 } = o; const st = clamp(stap, 0, 4);
  const knip = clamp(st, 0, 1), plak = clamp(st - 1, 0, 1), lig = clamp(st - 2, 0, 1), terug = clamp(st - 3, 0, 1);
  const top = -Math.PI / 2, genHoek = 0.62; // opening die het gen vult (rad)
  const R = lerp(r, r * 0.42, ease(terug)), cy = y, w = Math.max(3, R * 0.11), stapR = Math.max(0.06, 9 / R); // sporten ± 9 px uit elkaar
  const ksc = R / 150;
  const halve = lerp(0.02, genHoek / 2, ease(knip)) * (st >= 1 ? 1 : 1), over = 4 * 0.055; // overhang = 4 basen (hoek)
  const ret = { knip: [x, cy - R], gen: [x, cy - R - (1 - ease(plak)) * R * 0.9], resistentie: [x + Math.cos(0.6) * R, cy + Math.sin(0.6) * R], naden: [], bacterie: [x, cy] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  // bacterie (stap 3–4): staafvorm met wand en membraan; de ring ligt erbinnen
  if (terug > 0.01) { ctx.save(); ctx.globalAlpha *= ease(terug); const bl = r * 2.6, bh = r * 1.25;
    const caps = (ww, hh) => { ctx.beginPath(); roundRect(ctx, x - ww / 2, cy - hh / 2, ww, hh, hh / 2); };
    caps(bl + 14, bh + 14); shape(ctx, rgba(C.oker, 0.22), rgba(C.oker, 0.8), 3); caps(bl, bh); shape(ctx, '#22314D', rgba('#D8C9A8', 0.75), 2);
    ctx.strokeStyle = rgba(C.paars, 0.45); ctx.lineWidth = 2; const ch = []; for (let k = 0; k < 14; k++) { const u = k / 14 * 6.283; ch.push([x - bl * 0.28 + Math.cos(u) * bl * 0.12 + (hash(k + 5) - 0.5) * bl * 0.07, cy + Math.sin(u) * bh * 0.26 + (hash(k + 11) - 0.5) * bh * 0.12]); } ctx.beginPath(); bioPad(ctx, ch, true); ctx.stroke(); // chromosoom (losse lus, ingekort)
    ctx.restore(); }
  const strengArc = (rr, a0, a1, kleur, bw) => { if (a1 <= a0) return; ctx.strokeStyle = kleur; ctx.lineWidth = bw; ctx.beginPath(); ctx.arc(x, cy, rr, a0, a1); ctx.stroke(); };
  const sporten = (a0, a1, kleur) => { ctx.strokeStyle = kleur; ctx.lineWidth = Math.max(1.5, w * 0.35); for (let th = a0 + stapR / 2; th < a1; th += stapR) { ctx.beginPath(); ctx.moveTo(x + Math.cos(th) * (R - w * 1.2), cy + Math.sin(th) * (R - w * 1.2)); ctx.lineTo(x + Math.cos(th) * (R + w * 1.2), cy + Math.sin(th) * (R + w * 1.2)); ctx.stroke(); } };
  const halfSpoor = (a0, a1, buiten, kleur) => { ctx.strokeStyle = kleur; ctx.lineWidth = Math.max(1.5, w * 0.35); for (let th = a0 + stapR / 2; th < a1; th += stapR) { const r0 = buiten ? R : R - w * 1.2, r1 = buiten ? R + w * 1.2 : R; ctx.beginPath(); ctx.moveTo(x + Math.cos(th) * r0, cy + Math.sin(th) * r0); ctx.lineTo(x + Math.cos(th) * r1, cy + Math.sin(th) * r1); ctx.stroke(); } };
  // ring: van rechts van de opening rond tot links van de opening; buitenstreng loopt 4 basen verder dan de binnenstreng (zigzag)
  const aR = top + halve, aL = top - halve + Math.PI * 2, dO = knip > 0.02 ? over * 0.5 : 0;
  const binnen0 = aR + dO, binnen1 = aL + dO, buiten0 = aR - dO, buiten1 = aL - dO; // verspringend
  sporten(Math.max(binnen0, buiten0), Math.min(binnen1, buiten1), rgba(D2.oudR, 0.85));
  if (knip > 0.02) { halfSpoor(buiten0, binnen0, true, rgba(C.goud, 0.9)); halfSpoor(buiten1, binnen1, false, rgba(C.goud, 0.9)); }
  strengArc(R + w * 1.2, buiten0, buiten1, D2.oud, w); strengArc(R - w * 1.2, binnen0, binnen1, D2.oud, w);
  strengArc(R + w * 1.2, 0.0, 1.2, C.oker, w * 1.15); strengArc(R - w * 1.2, 0.0, 1.2, C.oker, w * 1.15); // resistentiegen
  // gen met dezelfde plakkerige uiteinden: daalt in de opening
  if (st > 1.0 || (st > 0.6)) { const ga = clamp((st - 0.6) / 0.4, 0, 1) * (st < 1 ? 1 : 1); const zak = (1 - ease(plak)) * R * 0.9;
    ctx.save(); ctx.globalAlpha *= st < 1 ? clamp((st - 0.6) / 0.4, 0, 1) : 1; ctx.translate(0, -zak);
    const g0 = top - genHoek / 2, g1 = top + genHoek / 2; const gb0 = g0 - dO, gb1 = g1 - dO, gi0 = g0 + dO, gi1 = g1 + dO; // past op de opening
    // gen-uiteinden: buitenstreng steekt links uit, binnenstreng rechts (complementair aan de ring)
    sporten(Math.max(gb0, gi0), Math.min(gb1, gi1), rgba(lighten(C.goud, 0.3), 0.7));
    strengArc(R + w * 1.2, g0 - dO, g1 - dO, C.goud, w); strengArc(R - w * 1.2, g0 + dO, g1 + dO, C.goud, w);
    halfSpoor(g0 - dO, g0 + dO, true, rgba(C.goud, 0.9)); halfSpoor(g1 - dO, g1 + dO, false, rgba(C.goud, 0.9));
    ctx.restore(); }
  // letters AATT op de overhang (alleen bij een grote ring en zolang het gen er nog niet in zit)
  const letters = o.letters != null ? o.letters : R >= 110; if (letters && knip > 0.6 && plak < 0.5) { const fs = Math.max(16, R * 0.13);
    'AATT'.split('').forEach((b, i) => { const th1 = buiten0 + stapR * (i + 0.5) * 0.98, th2 = buiten1 + stapR * (i + 0.5) * 1.7 - stapR * 1.2;
      text(ctx, b, x + Math.cos(th1) * (R + w * 2.6 + 46 * ksc), cy + Math.sin(th1) * (R + w * 2.6 + 46 * ksc) + fs * 0.35, fMeta(fs), C.goud, 'center');
      text(ctx, 'TTAA'[i], x + Math.cos(th2) * (R - w * 2.6 - 46 * ksc), cy + Math.sin(th2) * (R - w * 2.6 - 46 * ksc) + fs * 0.35, fMeta(fs), C.goud, 'center'); }); }
  // EcoRI (lintmodel, twee gelijke helften aan weerszijden van de dubbelstreng) op de knipplek tijdens het knippen
  const top0 = [x, cy - R];
  if (st > 0.02 && st < 1.25) { const ea = st < 1 ? 0.35 + 0.65 * Math.sin(Math.min(1, knip * 1.4) * Math.PI / 2) : 1 - (st - 1) / 0.25;
    [[1, C.enzym, 0], [-1, '#8A7FA8', Math.PI]].forEach(([sg, kl2, rot]) => _grKluwen(ctx, top0[0], top0[1] - sg * (w * 2.4 + 22 * ksc), (px, py) => (px / 40) ** 2 + (py / 17) ** 2 < 1, { r: 2.8, sc: ksc, col: kl2, seed: 4, bbox: [-40, -17, 40, 17], key: 'pkEco', rot, a: clamp(ea, 0, 1) })); }
  // ligase (lintmodel, eigen tint) komt bij het plakken op elk van de twee naden en sluit de ruggengraat
  if (st >= 1.7 && st < 3.4) { const la = st < 2 ? (st - 1.7) / 0.3 : st < 3 ? 1 : 1 - (st - 3) / 0.4; [top - genHoek / 2, top + genHoek / 2].forEach((th, i) => { const px = x + Math.cos(th) * (R + w * 2.6 + 20 * ksc), py = cy + Math.sin(th) * (R + w * 2.6 + 20 * ksc); ret.naden.push([px, py]);
      _grKluwen(ctx, px, py, (qx, qy) => (qx / 26) ** 2 + (qy / 19) ** 2 < 1, { r: 2.8, sc: ksc, col: '#6E9A8C', seed: 6 + i, bbox: [-26, -19, 26, 19], key: 'pkLig', rot: th + Math.PI / 2, a: clamp(la, 0, 1), fold: st < 2 ? 0.6 + 0.4 * clamp((st - 1.7) / 0.3, 0, 1) : 1 });
      if (lig > 0.05 && lig < 0.95) { ctx.save(); ctx.globalAlpha *= Math.sin(lig * Math.PI); circ(ctx, x + Math.cos(th) * R, cy + Math.sin(th) * R, w * 2.2, null, C.goud, 2); ctx.restore(); } }); }
  // vergrootcirkel met de basen in puzzelvorm op het moment dat de uitsteeksels zichtbaar zijn
  const zA = st < 0.6 ? 0 : st < 0.75 ? (st - 0.6) / 0.15 : st < 1.5 ? 1 : st < 1.7 ? (1.7 - st) / 0.2 : 0;
  if (zA > 0.01 && R >= 110) { const zx = x + R * 1.38, zy = cy - R * 0.72, zr = R * 0.66; ctx.save(); ctx.globalAlpha *= zA;
    ctx.strokeStyle = rgba(C.goud, 0.6); ctx.lineWidth = 2; ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(x + R * 0.1, cy - R * 1.0); ctx.lineTo(zx - zr, zy); ctx.stroke(); ctx.setLineDash([]);
    ctx.beginPath(); ctx.arc(zx, zy, zr, 0, 6.283); shape(ctx, C.bgMicro, C.goud, 2.5); ctx.save(); ctx.beginPath(); ctx.arc(zx, zy, zr - 2, 0, 6.283); ctx.clip();
    const bpz = zr * 0.16, Lz = zr * 0.22, hwz = bpz * 0.34, comp = { A: 'T', T: 'A', C: 'G', G: 'C' }, gapz = (st >= 1 ? lerp(1.6, 0.4, clamp(st - 1, 0, 0.5) * 2) : 1.6 * clamp((st - 0.6) / 0.3, 0, 1)) * bpz;
    const kx = (k) => zx + (k - 7.3) * bpz, yT2 = zy - Lz, yB2 = zy + Lz; const L1 = 'TCAG', R1 = 'AATTCG';
    const rug = (x0, x1, yy) => { ctx.strokeStyle = D2.oud; ctx.lineWidth = Math.max(3, bpz * 0.3); ctx.beginPath(); ctx.moveTo(x0, yy); ctx.lineTo(x1, yy); ctx.stroke(); };
    rug(kx(2) - bpz, kx(5) + bpz * 0.4, yT2); rug(kx(2) - bpz, kx(9) + bpz * 0.4, yB2); rug(kx(6) - bpz * 0.4 + gapz, kx(12) + bpz + gapz, yT2); rug(kx(10) - bpz * 0.4 + gapz, kx(12) + bpz + gapz, yB2);
    L1.split('').forEach((bb, i) => { d2Base(ctx, kx(2 + i), yT2, Math.PI / 2, bb, Lz, hwz); d2Base(ctx, kx(2 + i), yB2, -Math.PI / 2, comp[bb], Lz, hwz); });
    'TTAA'.split('').forEach((bb, i) => d2Base(ctx, kx(6 + i), yB2, -Math.PI / 2, bb, Lz, hwz, { rand: C.goud }));
    R1.split('').forEach((bb, i) => { d2Base(ctx, kx(6 + i) + gapz, yT2, Math.PI / 2, bb, Lz, hwz, { rand: i < 4 ? C.goud : null }); if (i >= 4) d2Base(ctx, kx(6 + i) + gapz, yB2, -Math.PI / 2, comp[bb], Lz, hwz); });
    ctx.restore(); ctx.restore(); }
  ctx.restore(); return ret;
}
