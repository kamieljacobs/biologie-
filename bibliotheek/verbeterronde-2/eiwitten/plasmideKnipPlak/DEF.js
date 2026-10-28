// PLASMIDE KNIPPEN EN PLAKKEN, verbeterronde 2 eiwitten (28 okt 2026): EcoRI (twee gelijke helften) en ligase zijn nu
// gevouwen kralenketens (_kkKluwen, eiwitten/_hulp.js) in plaats van het lintmodel; ring, gen, vergrootcirkel, bacterie,
// stappen en aanroep ongewijzigd. Recept (OpenStax Biology 2e § 17.1; zie het receptcommentaar in lib_bio.js, ronde 2):
//  stap 0 → 1 EcoRI knipt de ring verspringend (G↓AATTC, plakkerige uiteinden AATT); stap 1 → 2 het gen met dezelfde
//  uiteinden daalt in de opening; stap 2 → 3 ligase sluit de naden (fosfodiësterbinding); stap 3 → 4 terug in de bacterie
//  (ring ± 1/4 van de bacteriebreedte, helemaal binnen het membraan). Resistentiegen oker. Altijd 'vergroot'.
//  Bekende fouten: recht knippen bij EcoRI; gen met andere uiteinden; plasmide buiten de bacterie; schaar-icoon; lint.
// x, y = midden; r = straal van de ring in px. o.stap 0..4, o.letters, o.a, o.t. Geeft { knip, gen, resistentie, naden, bacterie } terug.
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
    [[1, C.enzym, 0], [-1, '#8A7FA8', Math.PI]].forEach(([sg, kl2, rot]) => _kkKluwen(ctx, top0[0], top0[1] - sg * (w * 2.4 + 22 * ksc), (px, py) => (px / 40) ** 2 + (py / 17) ** 2 < 1, { r: 2.8, sc: ksc, col: kl2, seed: 4, bbox: [-40, -17, 40, 17], key: 'pkEco', rot, a: clamp(ea, 0, 1) })); }
  // ligase (lintmodel, eigen tint) komt bij het plakken op elk van de twee naden en sluit de ruggengraat
  if (st >= 1.7 && st < 3.4) { const la = st < 2 ? (st - 1.7) / 0.3 : st < 3 ? 1 : 1 - (st - 3) / 0.4; [top - genHoek / 2, top + genHoek / 2].forEach((th, i) => { const px = x + Math.cos(th) * (R + w * 2.6 + 20 * ksc), py = cy + Math.sin(th) * (R + w * 2.6 + 20 * ksc); ret.naden.push([px, py]);
      _kkKluwen(ctx, px, py, (qx, qy) => (qx / 26) ** 2 + (qy / 19) ** 2 < 1, { r: 2.8, sc: ksc, col: '#6E9A8C', seed: 6 + i, bbox: [-26, -19, 26, 19], key: 'pkLig', rot: th + Math.PI / 2, a: clamp(la, 0, 1), fold: st < 2 ? 0.6 + 0.4 * clamp((st - 1.7) / 0.3, 0, 1) : 1 });
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
