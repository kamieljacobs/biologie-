// Op maat gekopieerd 2.0 — scènes, één functie per alinea (segment). 31 okt 2026.
// De take is die van versie 1.0 (narration.mp3), op de regelgrenzen geknipt; tekst ongewijzigd.
// q.at(woord, n) = begintijd van het n-de woord dat dit stukje bevat (hoofdletterongevoelig).
// Lagen: Schema (#1A2740) voor gel, strengenbord, grafieken; Micro (#121A26, zonder korrel) voor moleculen.

const LAD = { x0: 470, dx: 52, y: 430 };          // ladder in H2 (20 basen)
const SEQ2 = 'GACCTGAAGTCCATGGCTAC';               // stukje template (zelfde volgorde als primerStuk in de bibliotheek)
const SEQ_STR = 'GCATCTATCTATCTATCTAGCA';          // stukje rond het begin van de STR (H1)
const VWA = 0.044;                                  // vWA op chromosoom 12: 5,9 van 133 miljoen bp vanaf het uiteinde van de korte arm
const TUBE = { x: 1340, y: 250, s: 21 };            // PCR-buisje in de opening

// chromosoom 12 horizontaal (korte arm rechts), met het vWA-stuk als gouden streepje; geeft x van het vWA-stuk
function chrom12(ctx, cx, cy, len, o = {}) { const { a = 1, hl = 0, w = 40, kl = CD.std } = o; if (a <= 0.01) return 0; ctx.save(); ctx.globalAlpha *= a;
  cdChromosoom(ctx, cx, cy, len, { w, cen: 0.27, rot: Math.PI / 2, kl }); const xv = cx + len * 0.33; // (x, y) = centromeer; korte arm ± 0,37 × len naar rechts, vWA vlak bij het uiteinde
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; ctx.fillStyle = C.goud; ctx.fillRect(xv - 3, cy - w * 0.62, 6, w * 1.24); ctx.restore(); }
  ctx.restore(); return xv; }
// lang draadje DNA (template) in een buisje of zoomcirkel; met o.goud een gouden stukje (de STR met primerplekken)
function draadje(ctx, x, y, L, seed, o = {}) { const { a = 1, w = 5, goud = 0, fase = 0 } = o; if (a <= 0.01) return null; const r = rng(seed), P = [];
  let px = x, py = y, an = r() * 6.28; for (let k = 0; k < 9; k++) { P.push([px, py]); an += (r() - 0.5) * 1.6; px += Math.cos(an) * L / 8; py += Math.sin(an) * L / 8 * 0.7; }
  ctx.save(); ctx.globalAlpha *= a; dnaDraad(ctx, P, { w }); const m = P[4];
  if (goud > 0.01) { ctx.save(); ctx.globalAlpha *= goud; ctx.strokeStyle = C.goud; ctx.lineWidth = w + 3; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(m[0] - 7, m[1]); ctx.lineTo(m[0] + 7, m[1]); ctx.stroke(); ctx.restore(); }
  ctx.restore(); return m; }
// waterstofbruggen van één basenpaar: 2 (A–T) of 3 (C–G) gouden streepjes over de naad (palet: goud = waterstofbrug, zoals in DNA 1)
function brug(ctx, x, y, b, a = 1) { if (a <= 0.01) return; const n = (b === 'A' || b === 'T') ? 2 : 3; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = C.goud;
  for (let k = 0; k < n; k++) { const dx = (n === 2 ? [-6, 6] : [-9, 0, 9])[k]; ctx.fillRect(x + dx - 1.5, y - 9, 3, 18); } ctx.restore(); }
// rek met buisjes uit het practicum
const REK = ['Eig', 'Sp', 'A', 'B', 'C', 'PC', 'NC'];
function rek(ctx, x0, y, s, o = {}) { const { a = 1, hl = -1, open = -1, dna = true, nieuwePunt = 0 } = o; if (a <= 0.01) return []; ctx.save(); ctx.globalAlpha *= a; const st = 9.5 * s, pos = [];
  roundRect(ctx, x0 - 14 * s, y + 8 * s, REK.length * st + 10 * s, 7 * s, 4); shape(ctx, '#3A4A66', '#55657F', 1.5);
  REK.forEach((l, i) => { const x = x0 + i * st; pcrBuisje(ctx, x, y, s, { vol: 25, dna: dna && l !== 'NC' ? 14 : 0, hl: i === hl ? 1 : 0, open: i === open ? 1 : 0, kleur: C.teal });
    text(ctx, l, x, y - 3.4 * s, fMeta(Math.max(24, 3.2 * s)), i === hl ? C.goud : C.text2, 'center'); pos.push([x, y]); });
  ctx.restore(); return pos; }

Object.assign(SCENES, {
  // ---------------- titel: het buisje (rechts) en één heldere band
  title(ctx, t) { pcrBuisje(ctx, 1620, 260, 24, { vol: 25, dna: 40, t }); },

  // ---------------- Opening: jouw gel uit het practicum
  s01(ctx, t, q) { sch(ctx);
    const hb = ramp(t, q.at('heldere') - 0.2, 0.6), bp = ramp(t, q.at('honderdtweeën') - 0.1, 0.5), sp = ramp(t, q.at('bloedspoor') - 0.3, 0.5);
    meta(ctx, 'jouw gel · practicum dna-profielen', 560, 128, 'left', C.text2, ramp(t, 0, 0.6));
    const g = gelFoto(ctx, 560, 170, 560, 660, [{ l: 'M50', b: GEL.M50 }, { l: 'Sp', b: [{ bp: 172, int: 1.4, dik: 5 }], hl: hb }, { l: 'NC', b: [] }], { a: ramp(t, 0, 0.6) });
    [100, 150, 200, 250].forEach(b => meta(ctx, b + ' bp', 520, g.Y(b) + 9, 'right', C.text2, ramp(t, 0.4, 0.6), 24));
    nb(ctx, 'bloedspoor', 'baan sp', 1170, g.Y(250), sp * (1 - hb), 'left', C.text);
    if (bp > 0.01) { nb(ctx, '172 basenparen', 'het vwa-stuk', 1170, g.Y(172) + 12, bp, 'left', C.goud); }
    nb(ctx, 'negatieve controle', 'water · geen band', 1170, g.Y(320) + 20, ramp(t, q.at('heldere') + 0.8, 0.6) * 0.0, 'left'); },
  s02(ctx, t, q) { sch(ctx);
    const z = ramp(t, q.at('buisje') - 0.3, 0.8), ph = ramp(t, q.at('paar') - 0.2, 0.7), ch = ramp(t, q.at('chromosoom') - 0.3, 0.8), hd = ramp(t, q.at('honderdduizenden') - 0.1, 0.6), hk = ramp(t, q.at('Hoe') - 0.2, 0.5);
    const g = gelFoto(ctx, 560 - 380 * z, 170, 560, 660, [{ l: 'M50', b: GEL.M50 }, { l: 'Sp', b: [{ bp: 172, int: 1.4, dik: 5 }], hl: 1 - z }, { l: 'NC', b: [] }], { a: lerp(1, 0.35, z * (1 - hk)) });
    const zt = ramp(t, q.at('buisje') + 0.4, 0.5); pcrBuisje(ctx, TUBE.x - 520, TUBE.y, TUBE.s, { vol: 25, dna: 30, t, a: zt, hl: ph * (1 - ch) });
    nb(ctx, 'je PCR-buisje', 'bloedspoor', TUBE.x - 520 + 90, TUBE.y + 60, zt * (1 - ph * 0.6), 'left');
    // zoomcirkel: een paar honderd lange DNA-draden, elk met één vWA-stuk (goud); daarna chromosoom 12
    const zx = 1440, zy = 470, zr = 330, ziA = ph;
    zoomCircle(ctx, zx, zy, zr, TUBE.x - 520, TUBE.y + 330, ch > 0.5 ? 'één draad: chromosoom 12 · niet op schaal' : 'een paar honderd dna-moleculen · vergroot', ziA, () => {
      mic(ctx); ctx.save(); ctx.globalAlpha *= 1 - ch; for (let k = 0; k < 14; k++) draadje(ctx, zx - 300 + (k % 4) * 150 + hash(k) * 60, zy - 250 + Math.floor(k / 4) * 140 + hash(k + 9) * 50, 250, k + 3, { goud: 1, w: 4 }); ctx.restore();
      if (ch > 0.01) { ctx.save(); ctx.globalAlpha *= ch; const xv = chrom12(ctx, zx, zy, 430, { hl: 1, w: 42 });
        nb(ctx, 'vWA-stuk', '172 bp', xv - 30, zy - 62, ch, 'center', C.goud);
        nb(ctx, 'chromosoom 12', '± 133 miljoen bp', zx - 120, zy + 96, ch, 'center');
        meta(ctx, '± 770.000 × zo lang', zx, zy + 180, 'center', C.grain, hd, 26); ctx.restore(); } });
    if (hk > 0.01) { ctx.save(); ctx.globalAlpha *= hk; ctx.setLineDash([10, 10]); pijlK(ctx, TUBE.x - 560, TUBE.y + 300, g.X(1) + 70, g.Y(172), C.goud, 1, 3); ctx.setLineDash([]); vraagT(ctx, 640, 700, 1, 120); ctx.restore(); } },

  // ---------------- Hoofdstuk 1 — Wat zit er in het buisje?
  s04(ctx, t, q) { sch(ctx);
    const ko = ramp(t, q.at('kopieën') - 0.3, 0.7), pc = ramp(t, q.at('PCR:') - 0.2, 0.5), nd = ramp(t, q.at('nodig') - 0.6, 0.6);
    const g = gelFoto(ctx, 220, 260, 300, 560, [{ l: 'M50', b: GEL.M50 }, { l: 'Sp', b: [] }], { a: 1 - 0.65 * ko });
    nb(ctx, 'te weinig', 'een paar honderd · geen band', 560, 470, 1 - 0.65 * ko, 'left', C.text);
    thermocycler(ctx, 760, 760, 1.25, { fase: 0.2 + Math.max(0, t - q.at('kopieën')) * 0.18, toon: 'apparaat', a: ko });
    nb(ctx, 'PCR-apparaat', 'thermocycler · warm en koud', 1260, 380, ko, 'left');
    pil(ctx, 'PCR = polymerase-kettingreactie', 1300, 300, C.goud, pc * (1 - nd), 34);
    ingRij(ctx, 0, { a: nd, y: 96 }); },
  s05(ctx, t, q) { sch(ctx); ingRij(ctx, 1, { hl: 0, y: 96 });
    const tp = ramp(t, q.at('template') - 0.3, 0.6), st = ramp(t, q.at('STR', 1) - 0.2, 0.6), z = ramp(t, q.at('kort') - 0.3, 1.6), he = q.at('herhaald'), zs = ramp(t, q.at('zestien') - 0.3, 0.5), vs = ramp(t, q.at('verschilt') - 0.2, 0.6);
    // lang template-draadje over het beeld; daarin de STR (goud) — doorlopende zoom naar de basen
    if (z < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - z; const P = []; for (let k = 0; k <= 12; k++) P.push([110 + k * 142, 520 + Math.sin(k * 1.3) * 60 + Math.sin(k * 0.6) * 40]);
      dnaDraad(ctx, P, { w: 12 }); if (st > 0.01) { ctx.strokeStyle = C.goud; ctx.lineWidth = 18; ctx.globalAlpha *= st; ctx.beginPath(); ctx.moveTo(P[6][0] - 20, P[6][1]); ctx.lineTo(P[6][0] + 20, P[6][1]); ctx.stroke(); }
      ctx.restore(); nb(ctx, 'template', 'dna uit het bloedspoor', 160, 400, tp * (1 - z), 'left'); nb(ctx, 'STR', 'hier zoeken we', 990, 470, st * (1 - z), 'left', C.goud); }
    if (z > 0.01) { ctx.save(); ctx.globalAlpha *= z; const x0 = 300, dx = 60, y = 360, sq = SEQ_STR;
      ctx.save(); ctx.beginPath(); roundRect(ctx, 150, 250, 1620, 340, 18); ctx.fillStyle = C.bgMicro; ctx.fill(); ctx.restore();
      streng(ctx, x0, y, dx, sq, 1, {}); streng(ctx, x0, y + ladGap(), dx, compl(sq), -1, {});
      // herhalingen van vier basen (TCTA) één voor één met een gouden haak
      for (let k = 0; k < 4; k++) { const i0 = 3 + k * 4, f = ramp(t, he + 0.35 * k, 0.4); haakK(ctx, x0 + i0 * dx - 24, x0 + (i0 + 3) * dx + 24, y - 34, C.goud, f, false); text(ctx, 'TCTA', x0 + (i0 + 1.5) * dx, y - 58, fTekst(30, 700), C.goud, 'center'); }
      meta(ctx, 'ingezoomd · vergroot', 170, 290, 'left', C.text2, 1, 24); ctx.restore(); }
    // teller: hier zestien keer
    if (vs > 0.01) { const n = Math.round(lerp(4, 16, clamp((t - q.at('Hier')) / Math.max(0.3, q.at('zestien') + 0.2 - q.at('Hier')), 0, 1))); ctx.save(); ctx.globalAlpha *= vs; text(ctx, 'TCTA ×', 300, 720, fTekst(44, 700), C.text, 'left'); strBlok(ctx, 470, 688, 16, 52, 30, 1, { zicht: n });
      text(ctx, String(n), 1330, 722, fTitel(56), zs > 0.5 ? C.goud : C.text, 'left'); meta(ctx, 'verschilt per persoon', 300, 780, 'left', C.text2, 1, 26); ctx.restore(); } },
  s06(ctx, t, q) { sch(ctx); ingRij(ctx, 2, { hl: 1, y: 96 });
    const pr = ramp(t, q.at('primers') - 0.2, 0.6), p1 = ramp(t, q.at('ene') - 0.1, 1.2), p2 = ramp(t, q.at('andere') - 0.1, 1.2), een = ramp(t, q.at('Elke') - 0.3, 0.9);
    const M = bordMap(160, 1760, 5.2, 300), yT = 420, yB = 640;
    ctx.save(); ctx.globalAlpha *= 1 - een;
    bordGids(ctx, M, yT - 30, yB + 30, { namen: 0 });
    bordStreng(ctx, M, { kind: 'orig', dir: 1, s5: -1e7, s3: 1e7 }, yT, { eind: 1 }); bordStreng(ctx, M, { kind: 'orig', dir: -1, s5: 1e7, s3: -1e7 }, yB, { eind: 1 });
    text(ctx, 'STR · TCTA × 16', M.X(88), yT - 66, fTekst(30, 600), C.text, 'center');
    // twee primers zweven in en gaan op hun plek liggen (op de streng waar ze passen)
    const P1 = [lerp(700, M.X(10), ease(p1)), lerp(770, yB - 26, ease(p1))], P2 = [lerp(1220, M.X(162), ease(p2)), lerp(770, yT + 26, ease(p2))];
    const bar = (x, y, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(x - PCR.P * M.kin / 2, y); ctx.lineTo(x + PCR.P * M.kin / 2, y); ctx.stroke(); ctx.restore(); };
    bar(P1[0], P1[1], pr); bar(P2[0], P2[1], pr);
    nb(ctx, 'primers', 'enkelstrengs · ± 20 nucleotiden', 960, 840, pr * (1 - p1), 'center', C.goud);
    nb(ctx, 'vóór de STR', 'primer 1 · op deze streng', M.X(10), yB + 110, p1, 'center', C.goud);
    nb(ctx, 'erachter', 'primer 2 · op de andere streng', M.X(172) + 30, yT + 80, p2, 'left', C.goud);
    ctx.restore();
    // al het DNA: één heel lange draad; elke primer past maar op één plek
    if (een > 0.01) { ctx.save(); ctx.globalAlpha *= een; const P = []; for (let k = 0; k <= 40; k++) P.push([120 + k * 42, 520 + Math.sin(k * 0.55) * 50 + Math.sin(k * 0.21 + 1) * 70]);
      dnaDraad(ctx, P, { w: 6 }); const m = P[23]; ctx.strokeStyle = C.goud; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(m[0] - 9, m[1]); ctx.lineTo(m[0] + 9, m[1]); ctx.stroke();
      ring(ctx, m[0], m[1], 34, ramp(t, q.at('maar') - 0.1, 0.4)); nb(ctx, 'één plek', 'in al het dna', m[0] + 50, m[1] - 50, ramp(t, q.at('maar'), 0.5), 'left', C.goud);
      meta(ctx, 'al het dna uit de cel · sterk ingekort', 120, 850, 'left', C.text2, 1, 24); ctx.restore(); } },
  s07(ctx, t, q) { sch(ctx);
    const po = q.at('DNA-polymerase'), tq = q.at('Taq.'), br = q.at('bronnen'), nu = q.at('nucleotiden'), bu = q.at('buffer'), wd = q.at('denk');
    const fA = fade(t, -1, tq - 0.3, 0.5), fB = fade(t, tq - 0.3, nu - 0.3, 0.5), fC = fade(t, nu - 0.3, bu - 0.3, 0.5), fD = ramp(t, bu - 0.3, 0.5);
    const n = 2 + ramp(t, po - 0.2, 0.5) + ramp(t, nu - 0.2, 0.5) + ramp(t, bu - 0.2, 0.5), qa = ramp(t, wd - 0.2, 0.5);
    ingRij(ctx, n, { hl: qa > 0.5 ? -1 : t < nu - 0.3 ? 2 : t < bu - 0.3 ? 3 : 4, leeg: qa > 0.5 ? 1 : -1, y: 96 });
    if (qa > 0.01) { vraagT(ctx, 960 - 346 - 40, 172, qa, 64); }
    // A. polymerase op een stukje DNA (Micro-paneel)
    if (fA > 0.01) { ctx.save(); ctx.globalAlpha *= fA; roundRect(ctx, 200, 260, 1520, 560, 18); ctx.fillStyle = C.bgMicro; ctx.fill();
      const x0 = 330, dx = 52, y = 480, k = 8 + Math.floor(clamp((t - po) / 0.5, 0, 6)); streng(ctx, x0, y + ladGap(), dx, compl(SEQ2), -1, {}); streng(ctx, x0, y, dx, SEQ2, 1, { i0: 0, i1: k - 1, kleur: D2.nieuw });
      ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(x0 - 20, y); ctx.lineTo(x0 + 5 * dx + 20, y); ctx.stroke(); ctx.restore();
      polymeraseAchter(ctx, x0 + k * dx + 20, y + ladGap() / 2, 62, {}); polymeraseVoor(ctx, x0 + k * dx + 20, y + ladGap() / 2, 62, { sluit: 0.5 + 0.5 * Math.sin(t * 3) });
      nb(ctx, 'DNA-polymerase', 'enzym · bouwt nieuwe strengen', x0 + k * dx + 120, 340, ramp(t, po, 0.5), 'left'); ctx.restore(); }
    // B. Taq: hete bron (Macro) en een zoomcirkel met de bacteriën
    if (fB > 0.01) { ctx.save(); ctx.globalAlpha *= fB; heteBron(ctx, 200, 280, 760, 520, t, 1);
      zoomCircle(ctx, 1380, 540, 260, 580, 650, 'thermus aquaticus · vergroot', ramp(t, br - 0.6, 0.6), () => { mic(ctx); bacterieEcht(ctx, 1320, 470, 230, { t, rot: 0.3, col: C.oker }); bacterieEcht(ctx, 1460, 620, 210, { t, rot: -0.5, col: C.oker, seed: 7 }); });
      nb(ctx, 'Taq', 'uit een bacterie in hete bronnen', 1080, 300, ramp(t, tq, 0.5), 'left'); ctx.restore(); }
    // C. losse nucleotiden
    if (fC > 0.01) { ctx.save(); ctx.globalAlpha *= fC; roundRect(ctx, 200, 260, 1520, 560, 18); ctx.fillStyle = C.bgMicro; ctx.fill();
      for (let k = 0; k < 16; k++) { const w = wander(k, t, 18, 0.5); vrijNucleotide(ctx, 330 + (k % 8) * 175 + w.x, 420 + Math.floor(k / 8) * 210 + w.y + (k % 2) * 40, 'ATCG'[k % 4], (hash(k) - 0.5) * 1.4, 1.15, {}); }
      nb(ctx, 'losse nucleotiden', 'bouwstenen voor nieuwe strengen', 260, 318, ramp(t, nu, 0.5), 'left'); ctx.restore(); }
    // D. buffer in het buisje
    if (fD > 0.01) { ctx.save(); ctx.globalAlpha *= fD; pcrBuisje(ctx, 960, 270, 26, { vol: 25, dna: 24, t, open: 0, kleur: C.teal });
      for (let k = 0; k < 7; k++) { const w = wander(k + 30, t, 8, 0.7); text(ctx, 'Mg²⁺', 1220 + (k % 3) * 130 + w.x, 520 + Math.floor(k / 3) * 80 + w.y, fTekst(34, 700), C.teal, 'center'); }
      nb(ctx, 'buffer', 'zuurgraad goed · levert magnesium', 1180, 400, ramp(t, bu, 0.5) * (1 - qa), 'left'); ctx.restore(); } },
  // s09 = alleen 'Antwoord B: er wordt niets gekopieerd.' (bij Vragen uit valt de hele alinea weg); daarna s09b
  s09(ctx, t, q) { SCENES.s09b(ctx, -50 + 0 * t, { at: () => Infinity }); kruisje(ctx, 820, 330, 22, ramp(t, q.at('niets') - 0.2, 0.4)); },
  s09b(ctx, t, q) { sch(ctx); ingRij(ctx, 5, { y: 96, a: 1 - ramp(t, q.at('Daarom') - 0.3, 0.5) });
    const vl = ramp(t, q.at('verlengen') - 0.3, 0.6), zb = ramp(t, q.at('beginnen') - 0.3, 0.6), da = ramp(t, q.at('Daarom') - 0.3, 0.7), al = ramp(t, q.at('Alleen') - 0.2, 0.6);
    // tweeluik: zonder primer gebeurt niets, met primer verlengt het polymerase
    if (da < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - da; const pan = (x, prim) => { roundRect(ctx, x, 250, 780, 560, 18); ctx.fillStyle = C.bgMicro; ctx.fill(); const x0 = x + 70, dx = 52, y = 520, sq = SEQ2.slice(0, 13);
        streng(ctx, x0, y + ladGap(), dx, compl(sq), -1, {});
        if (prim) { const k = 5 + Math.floor(clamp((t - q.at('verlengen')) / 0.45, 0, 7)); streng(ctx, x0, y, dx, sq, 1, { i0: 0, i1: k - 1, kleur: D2.nieuw }); ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(x0 - 20, y); ctx.lineTo(x0 + 4 * dx + 20, y); ctx.stroke(); ctx.restore();
          polymeraseAchter(ctx, x0 + k * dx + 20, y + ladGap() / 2, 58, {}); polymeraseVoor(ctx, x0 + k * dx + 20, y + ladGap() / 2, 58, { sluit: 0.6 }); }
        else { const w = wander(3, t, 10, 0.6); polymeraseAchter(ctx, x0 + 300 + w.x, y - 90 + w.y, 58, {}); polymeraseVoor(ctx, x0 + 300 + w.x, y - 90 + w.y, 58, { sluit: 0 }); } };
      pan(160, false); pan(980, true); text(ctx, 'zonder primer', 200, 310, fTekst(36, 700), C.text, 'left'); text(ctx, 'met primer', 1020, 310, fTekst(36, 700), C.text, 'left');
      kruisje(ctx, 820, 330, 22, t < -10 ? 0 : 1); vinkje(ctx, 1640, 330, 22, vl); nb(ctx, 'alleen verlengen', 'zelf beginnen kan het niet', 220, 760, zb, 'left'); nb(ctx, 'primer', 'het begin', 1050, 720, vl, 'left', C.goud); ctx.restore(); }
    if (da > 0.01) { ctx.save(); ctx.globalAlpha *= da; const M = bordMap(160, 1760, 5.2, 300), yT = 420, yB = 640;
      bordGids(ctx, M, yT - 30, yB + 30, {}); bordStreng(ctx, M, { kind: 'orig', dir: 1, s5: -1e7, s3: 1e7 }, yT, {}); bordStreng(ctx, M, { kind: 'orig', dir: -1, s5: 1e7, s3: -1e7 }, yB, {});
      ctx.strokeStyle = C.goud; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(M.X(0), yB - 26); ctx.lineTo(M.X(20), yB - 26); ctx.moveTo(M.X(152), yT + 26); ctx.lineTo(M.X(172), yT + 26); ctx.stroke();
      haakK(ctx, M.X(0), M.X(172), yB + 80, C.groen, al); zin(ctx, 'alleen dit stuk wordt gekopieerd', M.X(86), yB + 140, al, C.groen, 38, 'center'); ctx.restore(); } },

  // ---------------- Hoofdstuk 2 — Eén cyclus (Micro: één molecuul als ladder)
  s10(ctx, t, q) { mic(ctx);
    const tw = ramp(t, q.at('twee') - 0.2, 0.8), wk = ramp(t, q.at('warm') - 0.2, 0.5), cy = ramp(t, q.at('cycli') - 0.3, 0.6), s1 = ramp(t, q.at('Stap') - 0.2, 0.5), v = ramp(t, q.at('vijfennegentig') - 0.2, 1.2);
    const temp = wk > 0.01 ? (s1 > 0.01 ? lerp(60, 95, ramp(t, q.at('vijfennegentig') - 0.2, 0.6)) : 60 + 30 * Math.sin((t - q.at('warm')) * 2.2) * wk) : null;
    stappenBalk(ctx, s1 > 0.5 ? 0 : -1, { a: cy, temp: null }); if (temp != null) thermo(ctx, 1700, 230, temp, wk);
    // één molecuul → twee
    const y1 = lerp(LAD.y, LAD.y - 90 * tw * (1 - s1), 1), ladder = (y, a) => { streng(ctx, LAD.x0, y, LAD.dx, SEQ2, 1, { a }); streng(ctx, LAD.x0, y + ladGap(), LAD.dx, compl(SEQ2), -1, { a });
      for (let i = 0; i < 20; i++) brug(ctx, LAD.x0 + i * LAD.dx, y + ladGap() / 2, SEQ2[i], a); };
    ladder(LAD.y - 110 * tw * (1 - s1), 1); if (tw * (1 - s1) > 0.01) ladder(LAD.y + 150, tw * (1 - s1));
    meta(ctx, '1 molecuul', 330, LAD.y + 50, 'right', C.text2, 1 - tw * (1 - s1), 26); nb(ctx, '1 → 2', 'met alleen warm en koud', 965, LAD.y + 300, tw * (1 - s1), 'center', C.goud);
    meta(ctx, 'vergroot', 70, 860, 'left', C.text2, 1, 24); },
  s11(ctx, t, q) { mic(ctx); stappenBalk(ctx, 0, {}); thermo(ctx, 1700, 230, 95, 1);
    const br = q.at('breken'), ue = ramp(t, q.at('elkaar') - 0.5, 1.4), wd = ramp(t, q.at('denk') - 0.2, 0.5);
    const up = 120 * ue, jit = (i, k) => Math.sin(t * 7 + i * 1.7 + k) * 3 * ue;
    streng(ctx, LAD.x0, LAD.y - up, LAD.dx, SEQ2, 1, {}); streng(ctx, LAD.x0, LAD.y + ladGap() + up, LAD.dx, compl(SEQ2), -1, {});
    for (let i = 0; i < 20; i++) { const a = 1 - ramp(t, br - 0.2 + i * 0.07, 0.25); brug(ctx, LAD.x0 + i * LAD.dx, LAD.y + ladGap() / 2, SEQ2[i], a * (1 - ue)); }
    nb(ctx, 'waterstofbruggen', 'zwak · breken door de hitte', 960, LAD.y - 60, ramp(t, q.at('waterstofbruggen') - 0.3, 0.5) * (1 - ue), 'center', C.goud);
    nb(ctx, 'strengen los', '95 °C', 1500, LAD.y + 60, ue * (1 - wd), 'left');
    vraagT(ctx, 1640, LAD.y + 90, wd, 110); },
  s13(ctx, t, q) { mic(ctx); stappenBalk(ctx, 0, {}); thermo(ctx, 1700, 230, 95, 1);
    const he = ramp(t, q.at('heel') - 0.3, 0.6), bi = ramp(t, q.at('bindingen') - 0.2, 0.6), po = ramp(t, q.at('polymerase') - 0.4, 0.7), vo = ramp(t, q.at('vorm') - 0.6, 1.6);
    const dimS = 1 - 0.92 * po;
    ctx.save(); ctx.globalAlpha *= dimS;
    if (he > 0.01) { ctx.save(); ctx.globalAlpha *= he * (1 - po); ctx.strokeStyle = C.groen; ctx.lineWidth = 4; roundRect(ctx, LAD.x0 - 40, LAD.y - 120 - 22, 20 * LAD.dx + 30, 44, 22); ctx.stroke(); roundRect(ctx, LAD.x0 - 40, LAD.y + ladGap() + 120 - 22, 20 * LAD.dx + 30, 44, 22); ctx.stroke(); ctx.restore(); }
    streng(ctx, LAD.x0, LAD.y - 120, LAD.dx, SEQ2, 1, {}); streng(ctx, LAD.x0, LAD.y + ladGap() + 120, LAD.dx, compl(SEQ2), -1, {});
    nb(ctx, 'binnen een streng', 'sterke bindingen · blijven heel', LAD.x0, LAD.y - 205, bi * (1 - po), 'left', C.groen);
    nb(ctx, 'ertussen', 'zwakke waterstofbruggen', LAD.x0 + 7 * LAD.dx, LAD.y + ladGap() / 2 + 10, bi * (1 - po), 'left', C.text);
    ctx.restore();
    // twee enzymen bij 95 °C: een gewoon enzym ontvouwt, Taq blijft gevouwen
    if (po > 0.01) { ctx.save(); ctx.globalAlpha *= po; const kinds = Array.from({ length: 44 }, (_, i) => Math.floor(hash(i * 13 + 5) * 20));
      roundRect(ctx, 260, 290, 640, 520, 18); shape(ctx, C.fill, rgba(C.line, 0.4), 1.5); roundRect(ctx, 1020, 290, 640, 520, 18); shape(ctx, C.fill, rgba(C.line, 0.4), 1.5);
      ctx.save(); roundRect(ctx, 260, 290, 640, 520, 18); ctx.clip(); eiwitVouw(ctx, 580, 560, 0.8, 1 - vo, kinds, { t, kleur: 'eiwit' }); ctx.restore(); polymeraseAchter(ctx, 1340, 560, 70, { klem: false }); polymeraseVoor(ctx, 1340, 560, 70, { klem: false, sluit: 0.4 });
      text(ctx, 'gewoon enzym', 300, 350, fTekst(36, 700), C.text, 'left'); text(ctx, 'Taq', 1060, 350, fTekst(36, 700), C.text, 'left');
      meta(ctx, 'verliest zijn vorm', 580, 780, 'center', C.koraal, vo, 26); meta(ctx, 'blijft gevouwen', 1340, 780, 'center', C.groen, ramp(t, q.at('Taq') - 0.2, 0.5), 26); ctx.restore(); } },
  s14(ctx, t, q) { mic(ctx); stappenBalk(ctx, 1, {}); const vf = ramp(t, q.at('vijfenvijftig') - 0.4, 1.4); thermo(ctx, 1700, 230, lerp(95, 57, vf), 1);
    const pa = q.at('passen'), ha = q.at('half'), af = q.at('af');
    const yb = LAD.y + ladGap() + 40, x0 = 270, dx = 52, sq = compl('ATGCGACCTGAAGTCCATGGCTACAGTC'); // één losse streng (basen omhoog)
    streng(ctx, x0, yb, dx, sq, -1, {});
    nb(ctx, 'annealing', 'primers binden', 270, 690, ramp(t, q.at('annealing') - 0.2, 0.5), 'left');
    // primer A past overal: daalt, blijft zitten
    const pA = 'GACCTGAA', iA = 4, fa = ramp(t, pa - 1.6, 1.4), yA = lerp(yb - 250, yb - ladGap(), ease(fa));
    streng(ctx, x0 + iA * dx, yA, dx, pA, 1, { kleur: C.goud, a: ramp(t, pa - 2.2, 0.5) });
    vinkje(ctx, x0 + (iA + 3.5) * dx, yA - 60, 20, ramp(t, pa + 0.2, 0.4));
    // primer B past maar half: daalt, wiebelt, valt weer af
    const pB = 'CTGTAGAC', iB = 18, fb = ramp(t, ha - 0.8, 1.0), fo = ramp(t, af - 0.2, 1.4), yBp = lerp(yb - 250, yb - ladGap() - 16, ease(fb)) - 150 * ease(fo) + Math.sin(t * 14) * 5 * fb * (1 - fo);
    streng(ctx, x0 + iB * dx, yBp, dx, pB, 1, { kleur: C.goud, a: ramp(t, ha - 1.2, 0.4) * (1 - fo), rugA: 1 });
    nb(ctx, 'past maar half', 'valt weer af', x0 + (iB - 1) * dx, yb - 290, ramp(t, ha, 0.5), 'left', C.koraal); },
  s15(ctx, t, q) { mic(ctx); stappenBalk(ctx, 2, {}); thermo(ctx, 1700, 230, lerp(57, 72, ramp(t, q.at('tweeënzeventig') - 0.4, 1.2)), 1);
    const x0 = LAD.x0, dx = LAD.dx, y = LAD.y, vs = q.at('vast'), sn = ramp(t, q.at('snel') - 0.3, 0.5);
    const k = 5 + Math.floor(clamp((t - (vs - 2.5)) / 0.62, 0, 15)), f = clamp((t - (vs - 2.5)) / 0.62, 0, 15) % 1;
    streng(ctx, x0, y + ladGap(), dx, compl(SEQ2), -1, {});
    streng(ctx, x0, y, dx, SEQ2, 1, { i0: 0, i1: 4, kleur: C.goud }); streng(ctx, x0, y, dx, SEQ2, 1, { i0: 5, i1: k - 1, kleur: D2.nieuw });
    if (k < 20) nucVlucht(ctx, x0 + k * dx + 240, y - 190, x0 + k * dx, y, SEQ2[k], f, 1.0, 1);
    const px = x0 + Math.min(k, 19.5) * dx + 30; polymeraseAchter(ctx, px, y + ladGap() / 2, 62, {}); polymeraseVoor(ctx, px, y + ladGap() / 2, 62, { sluit: f < 0.8 ? 0.2 : 1 });
    nb(ctx, 'primer', 'begin van de nieuwe streng', x0 - 20, y - 120, ramp(t, q.at('primer') - 0.3, 0.5), 'left', C.goud);
    nb(ctx, 'Taq werkt snel', 'rond 72 °C', 1480, y + 230, sn * (1 - ramp(t, q.at('tegenover') - 0.5, 0.4)), 'left');
    // A tegenover T, C tegenover G: één paar van elk licht op
    const at = ramp(t, q.at('tegenover', 1) - 0.4, 0.4), cg = ramp(t, q.at('tegenover', 2) - 0.4, 0.4);
    const iAT = 6, iCG = 8; if (at > 0.01) { ring(ctx, x0 + iAT * dx, y + ladGap() / 2, 58, at * (1 - cg * 0.5)); nb(ctx, 'A – T', '', x0 + iAT * dx - 40, y + ladGap() + 130, at, 'center', C.text); }
    if (cg > 0.01) { ring(ctx, x0 + iCG * dx, y + ladGap() / 2, 58, cg); nb(ctx, 'C – G', '', x0 + iCG * dx + 40, y + ladGap() + 130, cg, 'center', C.text); } },
  s16(ctx, t, q) { const ein = ramp(t, q.at('drie-accent-uiteinde', 2) - 0.4, 0.3), cy = ramp(t, q.at('cyclus') - 0.4, 0.8);
    if (ein < 0.99) { ctx.save(); ctx.globalAlpha *= 1; mic(ctx); stappenBalk(ctx, 2, {}); thermo(ctx, 1700, 230, 72, 1); ctx.restore();
      ctx.save(); ctx.globalAlpha *= 1 - ein; const x0 = LAD.x0, dx = LAD.dx, y = LAD.y, ui = ramp(t, q.at('uiteinden') - 0.2, 0.5), er = q.at('altijd'), k = 15 + (t > er ? 1 : 0), f = clamp((t - er + 0.9) / 0.9, 0, 1);
      streng(ctx, x0, y + ladGap(), dx, compl(SEQ2), -1, {}); streng(ctx, x0, y, dx, SEQ2, 1, { i0: 0, i1: 4, kleur: C.goud }); streng(ctx, x0, y, dx, SEQ2, 1, { i0: 5, i1: k - 1, kleur: D2.nieuw });
      nucVlucht(ctx, x0 + k * dx + 220, y - 190, x0 + k * dx, y, SEQ2[k], f, 1.0, 1);
      const lab = (s, x, yy, a) => { ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, yy, fTitel(48), C.goud, 'center'); ctx.restore(); };
      lab("5′", x0 - 70, y + 14, ui); lab("3′", x0 + (k - 1) * dx + 60, y - 30, ui); lab("3′", x0 - 70, y + ladGap() + 14, ui); lab("5′", x0 + 19 * dx + 70, y + ladGap() + 14, ui);
      pijlK(ctx, x0 + (k - 1) * dx + 40, y - 70, x0 + (k - 1) * dx + 120, y - 70, C.goud, ramp(t, er - 0.3, 0.5), 4);
      nb(ctx, 'erbij aan het 3′-uiteinde', 'altijd', x0 + (k - 1) * dx + 20, y - 110, ramp(t, er - 0.3, 0.5), 'right', C.goud); ctx.restore(); }
    if (ein > 0.01) { ctx.save(); ctx.globalAlpha *= ein; sch(ctx); const M = bordMap(160, 1760, 5.2, 300), yT = 420, yB = 640;
      ctx.save(); ctx.globalAlpha *= 1 - cy; bordGids(ctx, M, yT - 30, yB + 30, {}); bordStreng(ctx, M, { kind: 'orig', dir: 1, s5: -1e7, s3: 1e7 }, yT, { eind: 1 }); bordStreng(ctx, M, { kind: 'orig', dir: -1, s5: 1e7, s3: -1e7 }, yB, { eind: 1 });
      ctx.strokeStyle = C.goud; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(M.X(0), yB - 26); ctx.lineTo(M.X(20), yB - 26); ctx.moveTo(M.X(152), yT + 26); ctx.lineTo(M.X(172), yT + 26); ctx.stroke();
      pijlK(ctx, M.X(20), yB - 26, M.X(48), yB - 26, C.goud, 1, 5, 18); pijlK(ctx, M.X(152), yT + 26, M.X(124), yT + 26, C.goud, 1, 5, 18);
      nb(ctx, "3′ wijst naar de andere primer", '', M.X(86), yB + 110, 1, 'center', C.goud); ctx.restore();
      // na één cyclus: het stuk tussen de primers twee keer
      if (cy > 0.01) { ctx.save(); ctx.globalAlpha *= cy; const m = CYC[1]; bordGids(ctx, M, 330, 720, { namen: 0 });
        bordMol(ctx, M, m[0], 380, { gap: 26 }); bordMol(ctx, M, m[1], 620, { gap: 26 });
        haakK(ctx, M.X(0), M.X(172), 760, C.groen, ramp(t, q.at('twee', 2) - 0.2, 0.5)); zin(ctx, '2 × het stuk tussen de primers', M.X(86), 830, ramp(t, q.at('twee', 2) - 0.2, 0.5), C.groen, 38, 'center'); ctx.restore(); }
      ctx.restore(); } },
});

// ===================== Hoofdstuk 3 — Van te lang naar precies goed (verdieping, vwo-blok) =====================
const MB = () => bordMap(150, 1770, 5.0, 340);
const ORIGT = { kind: 'orig', dir: 1, s5: -1e7, s3: 1e7 }, ORIGB = { kind: 'orig', dir: -1, s5: 1e7, s3: -1e7 };
// cyclusteller rechtsboven: 1 2 3
function cyclusTeller(ctx, c, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, 'cyclus', 1440, 150, C.text2, 'left', 26);
  for (let k = 1; k <= 3; k++) { const on = k <= c; circ(ctx, 1630 + (k - 1) * 56, 140, 22, on ? rgba(C.goud, 0.25) : rgba(C.fill, 0.6), on ? C.goud : rgba(C.line, 0.5), 2); text(ctx, String(k), 1630 + (k - 1) * 56, 151, fTekst(30, 700), on ? C.text : C.text2, 'center'); } ctx.restore(); }
const L1 = CYC[1][1].top, L1b = CYC[1][0].bot;    // de twee lange producten uit cyclus 1 (dir +1 vanaf primer 1, dir −1 vanaf primer 2)

Object.assign(SCENES, {
  s17(ctx, t, q) { sch(ctx); const M = MB(), y = 470; cyclusTeller(ctx, 0, ramp(t, q.at('drie') - 0.3, 0.5));
    bordGids(ctx, M, y - 40, y + 70, {}); const vo = ramp(t, q.at('Volg') - 0.2, 0.6);
    bordStreng(ctx, M, ORIGT, y, { eind: 1, rand: vo }); bordStreng(ctx, M, ORIGB, y + 26, { eind: 1, rand: vo });
    nb(ctx, 'één molecuul', 'dna uit het bloedspoor', 170, y + 140, vo, 'left', C.goud);
    pil(ctx, 'de eerste kopieën: te lang?', 960, 760, C.goud, ramp(t, q.at('lang') - 0.2, 0.5) * (1 - vo), 34); },
  s18(ctx, t, q) { sch(ctx); const M = MB(); cyclusTeller(ctx, 1, ramp(t, q.at('Cyclus'), 0.4));
    const ue = ramp(t, q.at('Cyclus') + 0.3, 1.0), pr = ramp(t, q.at('primer') - 0.2, 0.5), g = clamp((t - q.at('bouwt')) / 4.5, 0, 1), vs = ramp(t, q.at('verlengstap') - 0.2, 0.5);
    bordGids(ctx, M, 330, 690, { namen: 0.6 });
    const yT = lerp(457, 360, ue), yB = lerp(483, 646, ue);
    bordStreng(ctx, M, ORIGT, yT, { eind: 1 }); bordStreng(ctx, M, ORIGB, yB, { eind: 1 });
    const n1 = L1b, n2 = L1; // n1: op de bovenste streng (bouwt naar links), n2: op de onderste (bouwt naar rechts)
    if (pr > 0.01) { bordStreng(ctx, M, n1, 386, { a: pr, groei: lerp(PCR.B - PCR.P, n1.s3, ease(g)) }); bordStreng(ctx, M, n2, 620, { a: pr, groei: lerp(PCR.P, n2.s3, ease(g)) }); }
    if (g > 0.01 && g < 0.999) { const x2 = M.X(lerp(PCR.P, n2.s3, ease(g))), x1 = M.X(lerp(PCR.B - PCR.P, n1.s3, ease(g)));
      if (x2 < M.x1) { polymeraseAchter(ctx, x2 + 10, 633, 26, { klem: false }); polymeraseVoor(ctx, x2 + 10, 633, 26, { klem: false, sluit: 0.6 }); }
      if (x1 > M.x0) { polymeraseAchter(ctx, x1 - 10, 373, 26, { klem: false, dir: -1 }); polymeraseVoor(ctx, x1 - 10, 373, 26, { klem: false, dir: -1, sluit: 0.6 }); } }
    nb(ctx, 'primer', '', M.X(10), 700, pr * (1 - g), 'center', C.goud); nb(ctx, 'primer', '', M.X(162), 420, pr * (1 - g), 'center', C.goud);
    vraagT(ctx, 1700, 760, ramp(t, q.at('stopt') - 0.2, 0.4) * (1 - ramp(t, q.at('bijzonder'), 0.4)), 90);
    pil(ctx, '72 °C · verlengstap voorbij', 960, 800, C.koraal, vs, 32); },
  s19(ctx, t, q) { sch(ctx); const M = MB(); cyclusTeller(ctx, 1, 1);
    const du = ramp(t, q.at('duizend') - 0.2, 0.5), an = ramp(t, q.at('anders') - 0.2, 0.5), v5 = ramp(t, q.at('vijf-accent') - 0.3, 0.5), d3 = ramp(t, q.at('drie-accent') - 0.3, 0.5), lp = ramp(t, q.at('product') - 0.4, 0.5);
    bordGids(ctx, M, 330, 690, { namen: 0.4 });
    bordStreng(ctx, M, ORIGT, 360, {}); bordStreng(ctx, M, L1b, 386, { rand: an * 0.6 }); bordStreng(ctx, M, L1, 620, { rand: lp }); bordStreng(ctx, M, ORIGB, 646, {});
    haakK(ctx, M.X(0), M.x1, 590, C.text, du, false); pijlK(ctx, M.x1 - 10, 560, M.x1 + 60, 560, C.text, du, 3); meta(ctx, '± 1000 nucleotiden · ingekort', M.x1 - 30, 560, 'right', C.text, du, 26);
    meta(ctx, 'elke keer een andere lengte', M.X(-150), 440, 'center', C.text2, an, 26);
    if (v5 > 0.01) { ctx.save(); ctx.globalAlpha *= v5; text(ctx, "5′", M.X(0) - 34, 634, fTitel(46), C.goud, 'center'); ctx.restore(); nb(ctx, 'primer = begin', 'het 5′-uiteinde', M.X(0) + 6, 720, v5, 'left', C.goud); }
    if (d3 > 0.01) { ctx.save(); ctx.globalAlpha *= d3; text(ctx, "3′ ?", M.x1 - 30, 680, fTitel(46), C.text, 'center'); ctx.restore(); }
    nb(ctx, 'lang product', 'begint bij de primer · loopt door', M.X(60), 790, lp, 'left', C.text); },
  s20(ctx, t, q) { sch(ctx); const M = MB(); cyclusTeller(ctx, 2, ramp(t, q.at('Cyclus'), 0.4));
    const vl = ramp(t, q.at('Volg') - 0.2, 0.8), tp = ramp(t, q.at('template') - 0.2, 0.6), ap = ramp(t, q.at('andere') - 0.2, 0.6), bt = q.at('terug'), wd = q.at('denk');
    bordGids(ctx, M, 330, 690, { namen: 0.4 });
    ctx.save(); ctx.globalAlpha *= 1 - vl; bordStreng(ctx, M, ORIGT, 360, {}); bordStreng(ctx, M, L1b, 386, {}); bordStreng(ctx, M, ORIGB, 646, {}); ctx.restore();
    const yL = lerp(620, 560, vl); bordStreng(ctx, M, L1, yL, { rand: vl });
    nb(ctx, 'wordt nu zelf template', 'lang product uit cyclus 1', M.X(40), yL + 80, tp, 'left', C.text);
    const nieuw = { kind: 'lang', dir: -1, s5: PCR.B, s3: PCR.A }, g = clamp((t - bt + 0.4) / Math.max(0.5, wd - bt + 0.4), 0, 1);
    if (ap > 0.01) { const gr = lerp(PCR.B - PCR.P, 70, ease(g)); bordStreng(ctx, M, nieuw, yL - 26, { a: ap, groei: gr });
      if (g > 0.01) { const xx = M.X(gr); polymeraseAchter(ctx, xx - 10, yL - 13, 26, { klem: false, dir: -1 }); polymeraseVoor(ctx, xx - 10, yL - 13, 26, { klem: false, dir: -1, sluit: 0.6 }); }
      nb(ctx, 'de andere primer', 'primer 2', M.X(162), yL - 90, ap * (1 - g), 'center', C.goud); }
    vraagT(ctx, M.X(0) - 70, yL - 10, ramp(t, wd - 0.2, 0.4), 100); },
  s22(ctx, t, q) { sch(ctx); const M = MB(); cyclusTeller(ctx, 2, 1); const yL = 560;
    const ei = ramp(t, q.at('eind') - 0.3, 1.0), c1 = ramp(t, q.at('cyclus') - 0.3, 0.5), tn = ramp(t, q.at('telt') - 0.4, 0.5), ka = ramp(t, q.at('kant') - 0.2, 0.6);
    bordGids(ctx, M, 330, 690, { namen: 0.4 }); bordStreng(ctx, M, L1, yL, { rand: ka * 0 });
    const gr = lerp(70, PCR.A, ease(ei)); bordStreng(ctx, M, { kind: 'lang', dir: -1, s5: PCR.B, s3: PCR.A }, yL - 26, { groei: gr });
    if (ei < 0.999) { const xx = M.X(gr); polymeraseAchter(ctx, xx - 10, yL - 13, 26, { klem: false, dir: -1 }); polymeraseVoor(ctx, xx - 10, yL - 13, 26, { klem: false, dir: -1, sluit: 0.6 }); }
    ring(ctx, M.X(0), yL - 13, 40, ei * (1 - c1 * 0.5)); nb(ctx, 'einde van het template', '', M.X(0) - 20, yL + 100, ei * (1 - ka), 'center', C.goud);
    nb(ctx, 'in cyclus 1 liep het gewoon door', '', M.x1 - 20, yL + 80, c1, 'right', C.text);
    pil(ctx, 'weet niets · telt niets', 960, 300, C.line, tn, 32);
    if (ka > 0.01) { ctx.save(); ctx.globalAlpha *= ka; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; roundRect(ctx, M.X(0) - 14, yL - 18, M.X(20) - M.X(0) + 28, 36, 10); ctx.stroke(); ctx.restore(); nb(ctx, 'primer van cyclus 1', 'hier houdt het template op', M.X(0) - 20, yL + 100, ka, 'center', C.goud); } },
  s23(ctx, t, q) { sch(ctx); const M = MB(); cyclusTeller(ctx, 2, 1);
    const ma = ramp(t, q.at('maat') - 0.3, 0.5), lg = ramp(t, q.at('honderdtweeën') - 0.2, 0.5), an = ramp(t, q.at('andere') - 0.3, 0.6), ga = clamp((t - q.at('andere')) / 1.6, 0, 1), ab = ramp(t, q.at('Allebei') - 0.2, 0.5);
    bordGids(ctx, M, 300, 720, { namen: 0.4 });
    const y1 = lerp(560, 640, an); bordStreng(ctx, M, L1, y1, {}); bordStreng(ctx, M, { kind: ma > 0.5 ? 'maat' : 'lang', dir: -1, s5: PCR.B, s3: PCR.A }, y1 - 26, { rand: ma * (1 - an) });
    nb(ctx, 'streng op maat', 'van primer tot primer', M.X(86), y1 - 70, ma * (1 - an), 'center', C.groen);
    if (lg > 0.01) { ctx.save(); ctx.globalAlpha *= lg * (1 - an); haakK(ctx, M.X(0), M.X(172), y1 + 30, C.groen, 1); text(ctx, '172 nucleotiden · door het template', M.X(86), y1 + 90, fTekst(34, 600), C.groen, 'center'); ctx.restore(); }
    if (an > 0.01) { ctx.save(); ctx.globalAlpha *= an; bordStreng(ctx, M, L1b, 386, {}); bordStreng(ctx, M, { kind: 'maat', dir: 1, s5: PCR.A, s3: PCR.B }, 360, { groei: lerp(PCR.P, PCR.B, ease(ga)) }); ctx.restore(); }
    if (ab > 0.01) { nb(ctx, 'vast aan een lang product', '', M.x1 - 20, 450, ab, 'right'); nb(ctx, 'vast aan een lang product', '', M.x1 - 20, 720, ab, 'right'); } },
  s24(ctx, t, q) { sch(ctx); cyclusTeller(ctx, 3, 1);
    const tp = q.at('templates'), bo = clamp((t - q.at('bouwt')) / 1.8, 0, 1), zo = ramp(t, q.at('Zo') - 0.3, 0.6), ac = ramp(t, q.at('acht') - 0.6, 0.5);
    if (zo < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - zo; const M = MB(), y = 520; bordGids(ctx, M, 360, 660, { namen: 0.4 });
      bordStreng(ctx, M, { kind: 'maat', dir: -1, s5: PCR.B, s3: PCR.A }, y + 26, { rand: ramp(t, tp - 0.3, 0.5) });
      bordStreng(ctx, M, { kind: 'maat', dir: 1, s5: PCR.A, s3: PCR.B }, y, { a: ramp(t, q.at('primer') - 0.2, 0.4), groei: lerp(PCR.P, PCR.B, ease(bo)) });
      nb(ctx, 'streng op maat als template', '', M.X(86), y + 110, ramp(t, tp - 0.3, 0.5), 'center', C.groen); ctx.restore(); }
    if (zo > 0.01) { ctx.save(); ctx.globalAlpha *= zo; const mols = CYC[3];
      mols.forEach((m, i) => { const col = i % 2, row = Math.floor(i / 2), x0 = col ? 1000 : 120, M = bordMap(x0, x0 + 800, 2.5, 320), y = 300 + row * 140;
        const beide = m.top && m.bot && m.top.kind === 'maat' && m.bot.kind === 'maat';
        bordMol(ctx, M, m, y, { w: 9, gap: 18, rand: beide ? ac : 0 }); });
      text(ctx, '2 van de 8', 960, 860, fTitel(64), C.groen, 'center'); ctx.restore(); meta(ctx, 'na cyclus 3', 120, 250, 'left', C.text2, zo, 26); } },
  s25(ctx, t, q) { sch(ctx); const M = MB(), y = 500;
    const lp = ramp(t, q.at('lange') - 0.3, 0.6), mt = ramp(t, q.at('kopie', 2) - 0.3, 0.6), om = ramp(t, q.at('maat') - 0.3, 0.5);
    meta(ctx, 'samengevat', 150, 230, 'left', C.goud, 1, 28); bordGids(ctx, M, 360, 660, { namen: 0.6 });
    bordStreng(ctx, M, L1, y + 26, { rand: lp * (1 - mt) });
    nb(ctx, 'lang product', 'eerste kopie · loopt te ver door', M.X(120), y + 130, lp, 'left');
    bordStreng(ctx, M, { kind: 'maat', dir: -1, s5: PCR.B, s3: PCR.A }, y, { a: mt, groei: lerp(PCR.B - PCR.P, PCR.A, ramp(t, q.at('kopie', 2), 1.6)) });
    nb(ctx, 'op maat', 'kopie van een lange kopie · stopt bij de primer', M.X(86), y - 70, om, 'center', C.groen); },

// ===================== Hoofdstuk 4 — Tellen =====================
  s26(ctx, t, q) { sch(ctx); const mo = ramp(t, q.at('model') - 0.2, 0.5), wd = ramp(t, q.at('denk') - 0.2, 0.5);
    const rows = [['na cyclus 1', 2, q.at('één')], ['na cyclus 2', 4, q.at('twee', 2)], ['na cyclus 3', 6, q.at('drie')]];
    rows.forEach(([lab, n, tt], r) => { const a = ramp(t, tt - 0.3, 0.4), y = 330 + r * 120; zin(ctx, lab, 260, y, a, C.text, 40);
      for (let k = 0; k < n; k++) { const ak = ramp(t, tt + 0.1 * k, 0.25) * a; if (ak <= 0.01) continue; ctx.save(); ctx.globalAlpha *= ak; ctx.strokeStyle = D2.nieuw; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(620 + k * 46, y - 40); ctx.lineTo(620 + k * 46, y + 6); ctx.stroke(); ctx.restore(); }
      zin(ctx, String(n), 1020, y, a, C.text, 56); });
    nb(ctx, 'lange producten', 'uit één molecuul', 620, 230, ramp(t, q.at('lange', 1) - 0.2, 0.5), 'left');
    pil(ctx, 'model · elke cyclus een perfecte verdubbeling', 1400, 240, C.line, mo, 30);
    zin(ctx, 'na 30 cycli', 260, 740, wd, C.text, 40); vraagT(ctx, 1040, 760, wd, 100); },
  s28(ctx, t, q) { sch(ctx); const ze = ramp(t, q.at('zestig') - 0.2, 0.4), or = ramp(t, q.at('originele') - 0.3, 0.6), li = ramp(t, q.at('lineaire') - 0.4, 0.6), kn = ramp(t, q.at('knipt') - 0.6, 0.5);
    [['na cyclus 1', 2], ['na cyclus 2', 4], ['na cyclus 3', 6], ['na 30 cycli', 60]].forEach(([lab, n], r) => { const y = 330 + r * 120 + (r === 3 ? 40 : 0); zin(ctx, lab, 160, y, 1, C.text, 38);
      if (r < 3) for (let k = 0; k < n; k++) { ctx.strokeStyle = D2.nieuw; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(470 + k * 40, y - 38); ctx.lineTo(470 + k * 40, y + 4); ctx.stroke(); }
      text(ctx, String(n), 800, y, fTitel(56), r === 3 ? C.goud : C.text, 'left'); });
    ctx.save(); ctx.globalAlpha *= ze; ring(ctx, 836, 752, 64, 1); ctx.restore();
    // rechts: de twee originele strengen, elke cyclus één lang product per streng
    if (or > 0.01 && li < 0.99) { ctx.save(); ctx.globalAlpha *= or * (1 - li); const M = bordMap(1000, 1800, 2.4, 300);
      bordStreng(ctx, M, ORIGT, 330, {}); bordStreng(ctx, M, ORIGB, 560, {});
      for (let c = 0; c < 3; c++) { const a = ramp(t, q.at('originele') + 0.4 + c * 0.6, 0.4); bordStreng(ctx, M, { kind: 'lang', dir: -1, s5: PCR.B, s3: -800 - c * 60 }, 362 + c * 30, { a, w: 9 }); bordStreng(ctx, M, { kind: 'lang', dir: 1, s5: PCR.A, s3: 800 + c * 60 }, 528 - c * 30, { a, w: 9 }); }
      nb(ctx, 'alleen op de 2 originele strengen', 'elke cyclus 2 erbij', 1400, 680, or, 'center'); ctx.restore(); }
    if (li > 0.01) { ctx.save(); ctx.globalAlpha *= li; const gx = 1080, gy = 760, gw = 680, gh = 420; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy - gh); ctx.lineTo(gx, gy); ctx.lineTo(gx + gw, gy); ctx.stroke();
      [0, 10, 20, 30].forEach(c => meta(ctx, String(c), gx + c / 30 * gw, gy + 36, 'center', C.text2, 1, 26)); [0, 20, 40, 60].forEach(v => meta(ctx, String(v), gx - 14, gy - v / 60 * gh + 9, 'right', C.text2, 1, 26));
      meta(ctx, 'cycli', gx + gw, gy + 70, 'right', C.text2, 1, 26); meta(ctx, 'lange producten', gx, gy - gh - 20, 'left', C.text2, 1, 26);
      const u = ramp(t, q.at('lineaire') - 0.4, 1.4); ctx.strokeStyle = D2.nieuw; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + gw * u, gy - gh * u); ctx.stroke();
      nb(ctx, 'lineaire groei', 'elke cyclus evenveel erbij', gx + gw * 0.5, gy - gh * 0.26, u, 'left'); ctx.restore(); }
    if (kn > 0.01) { ctx.save(); ctx.globalAlpha *= kn; schaar(ctx, 1110, 840 - 10); kruisje(ctx, 1110, 830, 30, 1); zin(ctx, 'niets in het buisje knipt dna op maat', 1160, 846, 1, C.text, 34); ctx.restore(); } },
  s29(ctx, t, q) { sch(ctx); const ex = ramp(t, q.at('exponentiële') - 0.3, 0.5), kp = ramp(t, q.at('korte') - 0.3, 0.5), te = q.at('tien'), de = q.at('dertig');
    const cur = t < te ? lerp(0, 5, clamp(t / te, 0, 1)) : t < de ? lerp(5, 10, ramp(t, te, 1.2)) : lerp(10, 30, ramp(t, de - 0.3, 1.4));
    // links: verdubbelen 1 → 2 → 4 → 8 → 16
    const vd = ramp(t, 0, 0.5) * (1 - ramp(t, te - 0.5, 0.5));
    if (vd > 0.01) { ctx.save(); ctx.globalAlpha *= vd; [1, 2, 4, 8, 16].forEach((n, c) => { const a = ramp(t, 0.3 + c * 0.8, 0.4); for (let k = 0; k < n; k++) { const x = 140 + c * 150, y = 520 - (n - 1) * 15 + k * 30; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.groen; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 90, y); ctx.stroke(); ctx.restore(); } meta(ctx, n + '×', 185 + c * 150, 800, 'center', C.text2, a, 26); });
      nb(ctx, 'moleculen op maat', 'verdubbelen elke cyclus', 180, 270, 1, 'left', C.groen); ctx.restore(); }
    const tw = ramp(t, te - 0.5, 0.5), dr = ramp(t, de - 0.3, 0.5);
    if (tw > 0.01) { ctx.save(); ctx.globalAlpha *= tw * (1 - dr); text(ctx, '2¹⁰ = 1024', 180, 480, fTitel(84), C.groen, 'left'); zin(ctx, '≈ duizend', 180, 560, 1, C.text, 44); ctx.restore(); }
    if (dr > 0.01) { ctx.save(); ctx.globalAlpha *= dr; text(ctx, '2³⁰ ≈ 1,07 miljard', 160, 480, fTitel(72), C.groen, 'left'); zin(ctx, 'moleculen op maat', 160, 560, 1, C.text, 44); ctx.restore(); }
    // rechts: grafiek met logaritmische as
    const gx = 1040, gy = 800, gw = 740, gh = 520, Y = (v) => gy - Math.log10(Math.max(1, v)) / 9.2 * gh, X = (c) => gx + c / 30 * gw;
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy - gh); ctx.lineTo(gx, gy); ctx.lineTo(gx + gw, gy); ctx.stroke();
    [[1, '1'], [1e3, 'duizend'], [1e6, 'miljoen'], [1e9, 'miljard']].forEach(([v, l]) => { meta(ctx, l, gx - 14, Y(v) + 9, 'right', C.text2, 1, 24); ctx.strokeStyle = rgba('#FFFFFF', 0.03); ctx.beginPath(); ctx.moveTo(gx, Y(v)); ctx.lineTo(gx + gw, Y(v)); ctx.stroke(); });
    [0, 10, 20, 30].forEach(c => meta(ctx, String(c), X(c), gy + 36, 'center', C.text2, 1, 24)); meta(ctx, 'cycli', gx + gw, gy + 66, 'right', C.text2, 1, 24); meta(ctx, 'logaritmische as', gx, gy - gh - 22, 'left', C.text2, 1, 24);
    const lijn = (f, kl) => { ctx.strokeStyle = kl; ctx.lineWidth = 5; ctx.beginPath(); for (let c = 1; c <= cur + 1e-6; c += 0.1) { const p = [X(c), Y(f(c))]; c === 1 ? ctx.moveTo(...p) : ctx.lineTo(...p); } ctx.stroke(); };
    lijn(c => 2 * c, D2.nieuw); lijn(c => Math.max(1, Math.pow(2, c) - 2 * c), C.groen);
    nb(ctx, 'exponentiële groei', 'op maat = korte producten', X(1), Y(1e7), ex, 'left', C.groen); meta(ctx, 'op maat heet ook: kort product', X(13) - 20, Y(3e5) + 70, 'right', C.groen, kp * 0, 24);
    nb(ctx, 'lineair', 'lange producten', X(22), Y(60) - 62, ex, 'left', C.text); },
  s30(ctx, t, q) { sch(ctx); const ve = ramp(t, q.at('verdwijnen') - 0.3, 0.6), zi = ramp(t, q.at('zien') - 0.5, 0.5);
    const x0 = 140, y0 = 250, nx = 80, ny = 50, st = 12.6;
    for (let i = 0; i < nx * ny; i++) { const a = ramp(t, (i / (nx * ny)) * 1.4, 0.3); if (a <= 0.01) continue; ctx.fillStyle = rgba(C.groen, 0.85 * a); ctx.fillRect(x0 + (i % nx) * st, y0 + Math.floor(i / nx) * st, 9, 9); }
    meta(ctx, '4000 stippen · elke stip = 250.000 moleculen op maat', x0, y0 - 24, 'left', C.text2, 1, 24);
    const fx = x0 + 61 * st + 4.5, fy = y0 + 27 * st + 4.5; ring(ctx, fx, fy, 12, ve);
    zoomCircle(ctx, 1560, 540, 260, fx, fy, 'één stip · vergroot', ve, () => { mic(ctx); const s0 = 1560 - 225, t0 = 540 - 225, d = 9; for (let i = 0; i < 2500; i++) { const xx = s0 + (i % 50) * d, yy = t0 + Math.floor(i / 50) * d; ctx.fillStyle = i === 1287 ? D2.nieuw : rgba(C.groen, 0.8); ctx.fillRect(xx, yy, d - 2, d - 2); } ring(ctx, s0 + 37 * d + 3.5, t0 + 25 * d + 3.5, 16, ramp(t, q.at('verdwijnen') + 1.2, 0.5)); });
    nb(ctx, '60 lange producten', 'in één hokje · te weinig om te zien', 1600, 240, ramp(t, q.at('verdwijnen') + 1.2, 0.5), 'center', C.text); nb(ctx, 'zestig tegen een miljard', '', 140, 900 - 20, 0, 'left'); },
  s31(ctx, t, q) { sch(ctx); const la = ramp(t, q.at('langzamer') - 0.3, 0.6), tp = ramp(t, q.at('templates') - 0.3, 0.5), pk = ramp(t, q.at('plakken') - 0.3, 0.5), pl = ramp(t, q.at('plateau') - 0.3, 0.5);
    const gx = 200, gy = 800, gw = 1000, gh = 520, X = (c) => gx + c / 40 * gw, mod = (c) => 0.8 * Math.pow(2, c - 27), Ymod = (c) => gy - Math.min(1, mod(c)) * gh, Yecht = (c) => gy - gh * mod(c) / (1 + mod(c) / 0.8); // echt = model zolang er weinig DNA is, daarna afvlakken (nooit boven het model)
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy - gh); ctx.lineTo(gx, gy); ctx.lineTo(gx + gw, gy); ctx.stroke();
    [0, 10, 20, 30, 40].forEach(c => meta(ctx, String(c), X(c), gy + 36, 'center', C.text2, 1, 24)); meta(ctx, 'cycli', gx + gw, gy + 66, 'right', C.text2, 1, 24); meta(ctx, 'hoeveelheid dna', gx, gy - gh - 22, 'left', C.text2, 1, 24);
    ctx.save(); ctx.setLineDash([10, 10]); ctx.strokeStyle = rgba(D2.nieuw, 0.7); ctx.lineWidth = 3; ctx.beginPath(); for (let c = 0; c <= 27.33; c += 0.1) { const p = [X(c), Ymod(c)]; c ? ctx.lineTo(...p) : ctx.moveTo(...p); } ctx.stroke(); ctx.restore();
    meta(ctx, 'model', X(27.3) + 16, gy - gh + 10, 'left', C.text2, 1, 24);
    const u = 40 * ramp(t, 0.2, Math.max(1, q.at('plateau') - 0.4)); ctx.strokeStyle = C.groen; ctx.lineWidth = 6; ctx.beginPath(); for (let c = 0; c <= u; c += 0.1) { const p = [X(c), Yecht(c)]; c ? ctx.lineTo(...p) : ctx.moveTo(...p); } ctx.stroke();
    nb(ctx, 'in het echt', 'steeds langzamer', X(29), Yecht(29) + 70, la, 'left', C.groen);
    pil(ctx, 'te veel templates per polymerase', 1560, 360, C.line, tp, 30);
    if (pk > 0.01) { ctx.save(); ctx.globalAlpha *= pk; pil(ctx, 'strengen op maat plakken weer aan elkaar', 1560, 480, C.line, 1, 30); const xx = 1420, yy = 560, j = ease(clamp((t - q.at('plakken')) / 1.2, 0, 1));
      ctx.strokeStyle = C.groen; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(xx, yy + 30 * (1 - j)); ctx.lineTo(xx + 280, yy + 30 * (1 - j)); ctx.moveTo(xx, yy + 70 - 26 * (1 - j) * 0 - 30 * (1 - j) * -1 - 10 * j); ctx.lineTo(xx + 280, yy + 60 + 30 * (1 - j) - 10 * j); ctx.stroke(); ctx.restore(); }
    if (pl > 0.01) { haakK(ctx, X(31), X(40), Yecht(36) - 30, C.groen, pl, false); nb(ctx, 'plateau', '', X(35.5), Yecht(36) - 60, pl, 'center', C.groen); } },
});
// schaar (lijntekening) voor 'niets knipt'
function schaar(ctx, x, y) { ctx.save(); ctx.strokeStyle = C.text2; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x - 18, y + 14, 10, 0, 6.283); ctx.arc(x + 18, y + 14, 10, 0, 6.283); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - 12, y + 6); ctx.lineTo(x + 14, y - 30); ctx.moveTo(x + 12, y + 6); ctx.lineTo(x - 14, y - 30); ctx.stroke(); ctx.restore(); }

// ===================== Hoofdstuk 5 — Gevoelig voor besmetting =====================
// vWA-banden per baan uit het practicum (PROFILES): Eig 17/17, Sp 16/16, A 16/16, B 16/16, C 15/18, PC 17/18 → 108 + 4n
const VWA_BANEN = { Eig: [176], Sp: [172], A: [172], B: [172], C: [168, 180], PC: [176, 180], NC: [] };
function vwaGel(ctx, x, y, w, h, o = {}) { const { nc = 0, twijfel = 0, hlNC = 0, a = 1 } = o;
  const lanes = [{ l: 'M50', b: GEL.M50 }].concat(REK.map(l => ({ l, hl: l === 'NC' ? hlNC : 0, b: (l === 'NC' ? (nc > 0.01 ? [{ bp: 172, int: nc }] : []) : VWA_BANEN[l].map(bp => ({ bp, int: VWA_BANEN[l].length === 1 ? 1.4 : 0.9 }))) })));
  const g = gelFoto(ctx, x, y, w, h, lanes, { a });
  if (twijfel > 0.01) { ctx.save(); ctx.globalAlpha *= twijfel * a; ctx.setLineDash([8, 8]); ctx.strokeStyle = C.koraal; ctx.lineWidth = 2.5; for (let i = 1; i < 7; i++) { roundRect(ctx, g.X(i) - g.bw / 2 - 6, g.put - 14, g.bw + 12, y + h - g.put - 10, 8); ctx.stroke(); } ctx.setLineDash([]); ctx.restore(); }
  meta(ctx, 'alleen vwa', x, y + h + 46, 'left', C.text2, a, 24); return g; }

Object.assign(SCENES, {
  s32(ctx, t, q) { sch(ctx); const ri = ramp(t, q.at('risico') - 0.3, 0.5), nc = ramp(t, q.at('negatieve') - 0.3, 0.5), wa = ramp(t, q.at('water') - 0.3, 0.5), wd = ramp(t, q.at('denk') - 0.2, 0.6);
    if (wd < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - wd; rek(ctx, 600, 400, 13, { hl: nc > 0.5 ? 6 : -1 });
      nb(ctx, 'kopieert alles met de juiste primerplekken', '', 960, 800, ri * (1 - nc), 'center');
      nb(ctx, 'negatieve controle', 'hetzelfde mengsel', 600 + 6 * 9.5 * 13 + 60, 520, nc, 'left', C.goud);
      nb(ctx, 'water in plaats van DNA', 'geen template', 600 + 6 * 9.5 * 13 + 60, 640, wa, 'left'); ctx.restore(); }
    if (wd > 0.01) { ctx.save(); ctx.globalAlpha *= wd; const g = vwaGel(ctx, 560, 200, 800, 620, { nc: 1.1, hlNC: 1 }); vraagT(ctx, 1480, g.Y(172) + 40, 1, 110); ctx.restore(); } },
  s34(ctx, t, q) { sch(ctx); const pl = q.at('plekken'), hu = q.at('huidcellen'), dr = q.at('druppeltje'), mi = q.at('miljard');
    const fA = 1 - ramp(t, pl - 0.3, 0.5), fB = fade(t, pl - 0.3, hu - 0.4, 0.5), fC = ramp(t, hu - 0.4, 0.5);
    if (fA > 0.01) { ctx.save(); ctx.globalAlpha *= fA; vwaGel(ctx, 560, 200, 800, 620, { nc: 1.1, hlNC: 1 }); ctx.restore(); }
    if (fB > 0.01) { ctx.save(); ctx.globalAlpha *= fB; const P = []; for (let k = 0; k <= 16; k++) P.push([200 + k * 95, 520 + Math.sin(k * 0.8) * 50]);
      dnaDraad(ctx, P, { w: 10 }); const m = P[8]; ctx.strokeStyle = C.goud; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(m[0] - 60, m[1] - 4); ctx.lineTo(m[0] - 30, m[1] - 2); ctx.moveTo(m[0] + 30, m[1]); ctx.lineTo(m[0] + 60, m[1] + 2); ctx.stroke();
      nb(ctx, 'elk stuk DNA met deze plekken', 'wordt gekopieerd · van wie het ook is', m[0], m[1] + 110, 1, 'center', C.goud); ctx.restore(); }
    if (fC > 0.01) { ctx.save(); ctx.globalAlpha *= fC; const s = 6, x0 = 520, y = 600, pos = rek(ctx, x0, y, s, { hl: 6, open: 6 }), nx = pos[6][0];
      micropipet(ctx, nx + 2, y + 18, 1.9, { id: 'noor', knop: 1, vol: 0, in: 'buisje', rot: 0.32 });
      // huidschilfers dwarrelen van de hand in het open buisje
      for (let k = 0; k < 3; k++) { const f = clamp((t - hu - 0.2 - k * 0.5) / 2.2, 0, 1); if (f <= 0) continue; huidschilfer(ctx, lerp(nx + 160 + k * 30, nx + 4, ease(f)) + Math.sin(f * 9 + k) * 12, lerp(250 + k * 20, y + 20, f), 0.5, f * 3 + k, 1 - ramp(f, 0.92, 0.08), k + 2); }
      // eerdere PCR: een oud buisje open, een druppeltje springt over
      const da = ramp(t, dr - 0.4, 0.5); pcrBuisje(ctx, 320, 420, 9, { vol: 25, dna: 0, kleur: C.groen, open: 1, a: da }); meta(ctx, 'eerdere pcr', 320, 400, 'center', C.text2, da, 24);
      const fd = clamp((t - dr - 0.3) / 1.6, 0, 1); if (fd > 0 && fd < 1) { const xx = lerp(330, nx, ease(fd)), yy = lerp(410, y + 10, fd) - Math.sin(fd * Math.PI) * 140; circ(ctx, xx, yy, 6, rgba(C.groen, 0.8), C.groen, 1.5); }
      const zh = fade(t, hu + 0.6, dr - 0.2, 0.5), zd = ramp(t, dr + 0.6, 0.5);
      zoomCircle(ctx, 1500, 400, 250, nx, y + 30, 'huidschilfer · vergroot', zh, () => { mic(ctx); huidschilfer(ctx, 1500, 400, 4.2, 0.3, 1, 3); });
      zoomCircle(ctx, 1500, 400, 250, nx, y + 30, 'druppeltje · vergroot', zd, () => { mic(ctx); for (let k = 0; k < 70; k++) { const w = wander(k, t, 6, 0.4), xx = 1290 + hash(k * 3) * 420 + w.x, yy = 190 + hash(k * 7 + 1) * 420 + w.y; if (Math.hypot(xx - 1500, yy - 400) > 230) continue; ctx.save(); ctx.translate(xx, yy); ctx.rotate(hash(k) * 3); ctx.strokeStyle = C.groen; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-22, 0); ctx.lineTo(22, 0); ctx.stroke(); ctx.restore(); } });
      nb(ctx, 'miljoenen moleculen op maat', '', 1500, 720, ramp(t, q.at('miljoenen') - 0.2, 0.5) * (1 - ramp(t, mi - 0.4, 0.4)), 'center', C.groen);
      pil(ctx, '× 1 miljard', nx, y + 230, C.koraal, ramp(t, mi - 0.3, 0.4), 34); ctx.restore(); } },
  s35(ctx, t, q) { sch(ctx); const vt = ramp(t, q.at('vertrouwen') - 0.6, 0.6), gb = ramp(t, q.at('Geen') - 0.3, 0.5), np = ramp(t, q.at('nieuwe') - 0.4, 0.5);
    if (np < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - np; const g = vwaGel(ctx, 560, 200, 800, 620, { nc: 1.1 * (1 - gb), hlNC: 1, twijfel: vt * (1 - gb) });
      nb(ctx, 'niet te vertrouwen', 'kan ook besmet zijn', 1400, 420, vt * (1 - gb), 'left', C.koraal); vinkje(ctx, 1440, g.Y(172), 26, gb); nb(ctx, 'schoon', 'geen band in nc', 1480, g.Y(172) + 12, gb, 'left', C.groen); ctx.restore(); }
    if (np > 0.01) { ctx.save(); ctx.globalAlpha *= np; const pos = rek(ctx, 560, 640, 9); pos.forEach(([x, y], i) => pipetpunt(ctx, x, y - 260 + Math.max(0, 1 - ramp(t, q.at('nieuwe') + i * 0.15, 0.4)) * -40, 3, ramp(t, q.at('nieuwe') + i * 0.15, 0.4), C.er));
      nb(ctx, 'een nieuwe pipetpunt', 'voor elk buisje', 960, 300, 1, 'center'); ctx.restore(); } },

// ===================== Hoofdstuk 6 — Terug naar de gel =====================
  s36(ctx, t, q) { sch(ctx); const ph = ramp(t, q.at('Elk') - 0.3, 0.6), mj = ramp(t, q.at('miljard') - 0.3, 0.8), pp = ramp(t, q.at('primer', 1) - 0.3, 0.5), ld = ramp(t, q.at('lang') - 0.3, 0.5);
    // het bloedspoor op een glasscherf
    ctx.save(); ctx.globalAlpha *= 1 - ph; ctx.beginPath(); ctx.moveTo(700, 360); ctx.lineTo(1150, 300); ctx.lineTo(1260, 560); ctx.lineTo(980, 720); ctx.lineTo(660, 600); ctx.closePath(); shape(ctx, rgba(C.teal, 0.12), rgba(C.er, 0.8), 2);
    ctx.beginPath(); ctx.ellipse(960, 500, 70, 46, 0.3, 0, 6.283); ctx.fillStyle = '#7A2A2A'; ctx.fill(); ctx.beginPath(); ctx.ellipse(1040, 560, 22, 16, 0.2, 0, 6.283); ctx.fill();
    nb(ctx, 'bloedspoor', 'op een glasscherf · casus juwelier', 1290, 480, 1, 'left'); ctx.restore();
    if (ph > 0.01) { ctx.save(); ctx.globalAlpha *= ph; for (let k = 0; k < 11; k++) { const y = 280 + k * 52, L = 260 + hash(k * 5 + 2) * 420, xc = 560, l0 = xc - L * (0.3 + 0.4 * hash(k + 3));
        ctx.strokeStyle = rgba(D2.oud, ld > 0.5 ? 1 : 0.85); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(l0, y); ctx.lineTo(l0 + L, y); ctx.stroke(); ctx.strokeStyle = C.goud; ctx.beginPath(); ctx.moveTo(xc - 40, y); ctx.lineTo(xc - 26, y); ctx.moveTo(xc + 26, y); ctx.lineTo(xc + 40, y); ctx.stroke(); }
      meta(ctx, 'een paar honderd templates · 11 getekend', 160, 240, 'left', C.text2, 1, 24);
      nb(ctx, 'allemaal even lang', 'van primer tot primer', 560, 880 - 20, pp, 'center', C.goud);
      haakK(ctx, 160, 1000, 860 - 20, C.text2, ld * 0, true); ctx.restore();
      // wolk van moleculen op maat
      if (mj > 0.01) { ctx.save(); ctx.globalAlpha *= mj; for (let k = 0; k < 160; k++) { const w = wander(k, t, 5, 0.3), x = 1120 + hash(k * 3 + 1) * 620 + w.x, y = 290 + hash(k * 5 + 7) * 520 + w.y; ctx.strokeStyle = C.groen; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 20, y); ctx.lineTo(x + 20, y); ctx.stroke(); }
        meta(ctx, 'elk template: ruim een miljard op maat', 1120, 250, 'left', C.groen, 1, 24); ctx.restore(); }
      nb(ctx, 'hoe lang het dna eromheen ook was', '', 160, 260 + 0, 0, 'left'); } },
  s37(ctx, t, q) { sch(ctx); const sb = ramp(t, q.at('scherpe') - 0.4, 0.5), lp = ramp(t, q.at('lange') - 0.3, 0.5), st = ramp(t, q.at('Omdat') - 0.3, 0.6), hs = ramp(t, q.at('hele') - 0.3, 0.5);
    const g = gelFoto(ctx, 200, 200, 380, 640, [{ l: 'M50', b: GEL.M50 }, { l: 'Sp', b: [{ bp: 172, int: 1.4 * sb, dik: 5 }], hl: 1 }]);
    // moleculen op maat lopen samen even ver
    const loop = ramp(t, 0.3, Math.max(1, q.at('scherpe') - 0.6));
    if (sb < 0.99) for (let k = 0; k < 40; k++) { const yy = lerp(g.put + 10 + hash(k) * 40, g.Y(172) + (hash(k + 5) - 0.5) * 30 * (1 - loop), ease(loop)), xx = g.X(1) + (hash(k * 3) - 0.5) * (g.bw - 20); ctx.save(); ctx.globalAlpha *= 1 - sb; ctx.strokeStyle = C.groen; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(xx - 8, yy); ctx.lineTo(xx + 8, yy); ctx.stroke(); ctx.restore(); }
    nb(ctx, 'één scherpe band', 'allemaal even lang · even ver', 640, g.Y(172) + 10, sb * (1 - st), 'left', C.goud);
    if (lp > 0.01) { ctx.save(); ctx.globalAlpha *= lp * (1 - st); for (let k = 0; k < 3; k++) { ctx.strokeStyle = rgba(D2.nieuw, 0.6); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(g.X(1) - 20 + k * 14, g.put + 24 + k * 6); ctx.lineTo(g.X(1) - 8 + k * 14, g.put + 24 + k * 6); ctx.stroke(); }
      nb(ctx, 'lange producten', 'te weinig om te zien', 640, g.put + 40, 1, 'left'); ctx.restore(); }
    if (st > 0.01) { ctx.save(); ctx.globalAlpha *= st; const L = product(ctx, 720, 520, 16, 5.6, { namen: 1, lab: '172 bp' });
      haakK(ctx, 720 + 56 * 5.6, 720 + 120 * 5.6, 570, C.groen, hs); zin(ctx, 'de hele STR zit in het product', 720 + 88 * 5.6, 640, hs, C.groen, 36, 'center');
      meta(ctx, '108 + 4 × 16 = 172', 720, 720, 'left', C.text2, 1, 26); ctx.restore(); } },
  s38(ctx, t, q) { sch(ctx); const ve = ramp(t, q.at('veertien') - 0.3, 0.6), wa = ramp(t, q.at('Waar') - 0.2, 0.5);
    const g = gelFoto(ctx, 200, 200, 380, 640, [{ l: 'M50', b: GEL.M50 }, { l: '16', b: [{ bp: 172, int: 1.2 }] }, { l: '14', b: [] }]);
    product(ctx, 720, 400, 16, 5.0, { lab: '16 herhalingen' }); product(ctx, 720, 560, 14, 5.0, { a: ve, lab: '14 herhalingen' });
    vraagT(ctx, g.X(2), 560, wa, 110); },
  s40(ctx, t, q) { sch(ctx); const ve = ramp(t, q.at('verder', 1) - 0.3, 0.6), ko = ramp(t, q.at('korter') - 0.3, 0.5), va = ramp(t, q.at('vader') - 0.3, 0.6), mo = ramp(t, q.at('moeder') - 0.3, 0.6), tb = ramp(t, q.at('banden') - 0.5, 0.5);
    const g = gelFoto(ctx, 200, 200, 460, 640, [{ l: 'M50', b: GEL.M50 }, { l: '16', b: [{ bp: 172, int: 1.2 }] }, { l: '14', b: [{ bp: 164, int: 1.2 * ve }] }, { l: 'jij', b: [{ bp: 172, int: 0.9 * tb }, { bp: 164, int: 0.9 * tb }], hl: tb }]);
    pijlK(ctx, g.X(2) + 70, g.Y(172), g.X(2) + 70, g.Y(164), C.goud, ve * (1 - va), 3, 12);
    nb(ctx, '164 bp · komt verder', 'korter product', 720, g.Y(164) + 12, ve * (1 - va), 'left', C.goud);
    if (va > 0.01) { ctx.save(); ctx.globalAlpha *= va; const xv = chrom12(ctx, 1240, 380, 520, { kl: CD.vader, hl: 1, w: 40 }); nb(ctx, 'van je vader', 'vwa · 16 herhalingen', 1000, 300, 1, 'left'); ctx.restore(); }
    if (mo > 0.01) { ctx.save(); ctx.globalAlpha *= mo; chrom12(ctx, 1240, 620, 520, { kl: CD.moeder, hl: 1, w: 40 }); nb(ctx, 'van je moeder', 'vwa · 14 herhalingen', 1000, 540, 1, 'left'); ctx.restore(); }
    nb(ctx, 'twee banden', 'verschillende allelen', 1000, 760, tb, 'left', C.goud); },
  s41(ctx, t, q) { sch(ctx); const me = ramp(t, q.at('meerdere') - 0.3, 0.8), pr = ramp(t, q.at('profiel') - 0.4, 0.5), zo = ramp(t, q.at('scherpe') - 0.3, 0.5);
    // profielen uit het practicum: Sp en B, eerst alleen vWA, dan vijf STR's
    const P = { Sp: [68, 76, 106, 112, 140, 144, 172, 200, 204], B: [68, 80, 106, 112, 140, 144, 172, 200, 204] }, isV = (bp) => bp === 172;
    const band = (l) => P[l].map(bp => ({ bp, int: isV(bp) ? 1.4 : 0.9 * me }));
    const g = gelFoto(ctx, 560, 200, 600, 640, [{ l: 'M50', b: GEL.M50 }, { l: 'Sp', b: band('Sp'), hl: pr }, { l: 'B', b: band('B') }]);
    nb(ctx, 'zelfde allel', 'vwa · 16 en 16', 1200, g.Y(172) + 10, 1 - me, 'left', C.goud);
    ring(ctx, g.X(2), g.Y(80), 34, ramp(t, q.at('tegelijk') - 0.2, 0.5) * (1 - zo)); nb(ctx, 'hier verschillen ze', 'tpox', 1200, g.Y(78) + 10, ramp(t, q.at('tegelijk') - 0.2, 0.5) * (1 - zo), 'left', C.koraal);
    meta(ctx, 'tpox · amelogenine · d8s1179 · vwa · d3s1358', 560, 900 - 30, 'left', C.text2, me, 24);
    nb(ctx, 'DNA-profiel', 'van het bloedspoor', 300, 380, pr, 'center', C.goud); ring(ctx, g.X(1), g.Y(172), 40, zo); },
});
