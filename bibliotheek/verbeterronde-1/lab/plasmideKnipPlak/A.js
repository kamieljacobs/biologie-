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
//  Bekende fouten: recht knippen (stompe uiteinden) bij EcoRI; gen met andere uiteinden dan de opening;
//  plasmide dat buiten de bacterie uitsteekt; schaar-icoon in plaats van een enzym.
// x, y = midden; r = straal van de ring in px. o.stap 0..4, o.letters (AATT bij grote ring, standaard aan als r ≥ 110),
// o.a, o.t. Geeft { knip, gen, resistentie, naden:[[x,y],[x,y]], bacterie } terug.
// =====================================================================================
function plasmideKnipPlak(ctx, x, y, r, o = {}) {
  const { a = 1, stap = 0, t = 0 } = o; const st = clamp(stap, 0, 4);
  const knip = clamp(st, 0, 1), plak = clamp(st - 1, 0, 1), lig = clamp(st - 2, 0, 1), terug = clamp(st - 3, 0, 1);
  const top = -Math.PI / 2, genHoek = 0.62; // opening die het gen vult (rad)
  const R = lerp(r, r * 0.42, ease(terug)), cy = y, w = Math.max(3, R * 0.11), stapR = Math.max(0.06, 9 / R); // sporten ± 9 px uit elkaar
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
  const letters = o.letters != null ? o.letters : R >= 110; if (letters && knip > 0.6 && plak < 0.5) { const fs = Math.max(12, R * 0.09);
    'AATT'.split('').forEach((b, i) => { const th1 = buiten0 + stapR * (i + 0.5) * 0.98, th2 = buiten1 + stapR * (i + 0.5) * 0.98;
      text(ctx, b, x + Math.cos(th1) * (R + w * 3.2), cy + Math.sin(th1) * (R + w * 3.2) + fs * 0.35, fMeta(fs), C.goud, 'center');
      text(ctx, 'TTAA'[i], x + Math.cos(th2) * (R - w * 3.2), cy + Math.sin(th2) * (R - w * 3.2) + fs * 0.35, fMeta(fs), C.goud, 'center'); }); }
  // ligase op de twee naden
  if (st >= 2 && st < 3.4) { const la = st < 3 ? Math.sin(lig * Math.PI) * 0.9 + 0.1 : 1 - (st - 3) / 0.4; [top - genHoek / 2, top + genHoek / 2].forEach((th, i) => { const px = x + Math.cos(th) * (R + w * 2.8), py = cy + Math.sin(th) * (R + w * 2.8); ret.naden.push([px, py]);
      enzymKluwen(ctx, px, py, Math.max(8, R * 0.11), { a: clamp(la, 0, 1), an: th + Math.PI, sluit: lig, seed: 3 + i, col: C.enzym }); }); }
  ctx.restore(); return ret;
}
