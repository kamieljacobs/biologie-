// Voorbij dominant en recessief 2.0 — scènes (één functie per gesproken alinea). 28 okt 2026.
// Let op cue-woorden: q.at zoekt een stukje van een woord (hoofdletterongevoelig, leestekens weg). Nooit op één letter of
// een genotype cuen ('r' of 'gg' zit in veel woorden); cue op het woord ervoor of erna.
const _n = (ctx, lab, sub, x, y, a, al = 'center', kl = C.text) => naamBij(ctx, lab, sub, x, y, a, al, kl);
const FL = { RR: 'rood', RW: 'roze', WR: 'roze', WW: 'wit' };
const BG = { 'IᴬIᴮ': 'AB', 'Iᴬi': 'A', 'iIᴮ': 'B', 'ii': 'O' }, BGS = { AB: 'AB', A: 'A', B: 'B', O: 'O' };

// ---- vaste beelden die in meerdere alinea's terugkomen
function drieKleur(ctx, t, q, o = {}) { // s04: panelen RR · RW · WW
  const kol = [['RR', 2, 1, 'rood', o.aRR ?? 1, o.vRR ?? 1], ['RW', 1, 0.5, 'roze', o.aRW ?? 1, o.vRW ?? 1], ['WW', 0, 0, 'wit', o.aWW ?? 1, o.vWW ?? 1]];
  kol.forEach(([g, n, v, kl, a, fill], i) => { if (a <= 0.01) return; const x = 380 + i * 580; ctx.save(); ctx.globalAlpha *= a;
    roundRect(ctx, x - 250, 190, 500, 640, 18); shape(ctx, rgba(C.fill, 0.45), (o.goud === i) ? C.goud : C.line, (o.goud === i) ? 3 : 1.5);
    allelChip(ctx, g, x, 250, 1, { px: 44 });
    for (let k = 0; k < 2; k++) enzym(ctx, x - 70 + k * 140, 375, k < n, 2.2, 1, k + t * 0.15);
    metaText(ctx, 'kleurstof', x - 200, 456, C.text2, 'left', 26); kleurstofMeter(ctx, x - 200, 470, 400, v * fill);
    if (i === 1) metaText(ctx, 'model', x + 200, 456, C.goud, 'right', 26);
    if (fill > 0.02 || i === 2) groeiPlant(ctx, x, 812, 300, fill > 0.6 || i === 2 ? kl : (i === 0 ? 'rood' : 'roze'), 1, { seed: 4 + i, n: 9, zwaai: t * 0.6 });
    _n(ctx, kl, null, x + 150, 760, fill > 0.6 || i === 2 ? 1 : 0, 'left');
    ctx.restore(); }); }
function schemaRoze(ctx, t, q, o = {}) { // kruisingsschema RW × RW (opbouw als film 2)
  const cel = o.cel || [1, 1, 1, 1];
  kruisSchema(ctx, 520, 290, 250, ['R', 'W'], ['R', 'W'], (i, j, cx, cy, cs) => { const k = i * 2 + j; if (cel[k] <= 0.01) return; ctx.save(); ctx.globalAlpha *= cel[k];
    const g = ['R', 'W'][i] + ['R', 'W'][j]; groeiPlant(ctx, cx, cy + cs * 0.36, cs * 0.62, FL[g], cel[k], { seed: k + 1, n: 7 }); allelChip(ctx, g === 'WR' ? 'RW' : g, cx + cs * 0.24, cy - cs * 0.32, 1, { px: 32 }); ctx.restore(); },
    { a: o.a ?? 1, gA: o.gA ?? 1, kopL: 'gameten plant 1', kopB: 'gameten plant 2', hl: o.hl || [] });
  const v = o.verh ?? 0; if (v > 0.01) { ctx.save(); ctx.globalAlpha *= v; roundRect(ctx, 1230, 330, 560, 380, 16); shape(ctx, rgba(C.bgSchema, 0.95), C.line, 1.5);
    [['1', 'rood'], ['2', 'roze'], ['1', 'wit']].forEach(([n, kl], i) => { const x = 1330 + i * 180; leeuwenbek(ctx, x, 600, 200, kl, { seed: 7 + i, n: 7 }); text(ctx, n, x, 660, fTitel(64), C.text, 'center'); metaText(ctx, kl, x, 700, C.text2, 'center', 26); });
    text(ctx, ':', 1420, 655, fTitel(56), C.text2, 'center'); text(ctx, ':', 1600, 655, fTitel(56), C.text2, 'center'); ctx.restore(); } }
function vierCellen(ctx, t, o = {}) { // A, B, AB, O naast elkaar
  const G = [['A', 'A', 'IᴬIᴬ of Iᴬi'], ['B', 'B', 'IᴮIᴮ of Iᴮi'], ['AB', 'AB', 'IᴬIᴮ'], ['O', 'O', 'ii']];
  G.forEach(([n, s, g], i) => { const a = (o.a || [1, 1, 1, 1])[i]; if (a <= 0.01) return; const x = 290 + i * 450; ctx.save(); ctx.globalAlpha *= a;
    bloedcelAntigeen(ctx, x, 440, 150, s, { n: 14, rk: 11, rot: t * 0.04 });
    text(ctx, 'bloedgroep ' + n, x, 700, fTekst(44, 700), C.text, 'center'); text(ctx, g, x, 750, fTekst(36, 600), C.grain, 'center'); ctx.restore(); }); }
function schemaAB(ctx, t, q, o = {}) { // Iᴬi × Iᴮi
  const cel = o.cel || [1, 1, 1, 1];
  kruisSchema(ctx, 560, 300, 250, ['Iᴬ', 'i'], ['Iᴮ', 'i'], (i, j, cx, cy, cs) => { const k = i * 2 + j; if (cel[k] <= 0.01) return; const g = ['Iᴬ', 'i'][i] + ['Iᴮ', 'i'][j], bg = BG[g];
    ctx.save(); ctx.globalAlpha *= cel[k]; ctx.save(); ctx.fillStyle = C.bgMicro; ctx.beginPath(); ctx.arc(cx, cy - 18, 70, 0, 6.283); ctx.fill(); ctx.restore(); bloedcelAntigeen(ctx, cx, cy - 18, 46, bg, { n: 12, rk: 4.6 });
    text(ctx, (g === 'iIᴮ' ? 'Iᴮi' : g) + '  ·  ' + bg, cx, cy + cs * 0.38, fTekst(36, 700), C.text, 'center'); ctx.restore(); },
    { a: o.a ?? 1, kopL: 'gameten moeder (A)', kopB: 'gameten vader (B)', hl: o.hl || [] }); }
function muisSchema(ctx, t, q, o = {}) { // Gg × Gg, GG weg
  kruisSchema(ctx, 470, 300, 250, ['G', 'g'], ['G', 'g'], (i, j, cx, cy, cs) => { const k = i * 2 + j; const cl = (o.cel || [1, 1, 1, 1])[k]; if (cl <= 0.01) return; ctx.save(); ctx.globalAlpha *= cl;
    const g = ['G', 'g'][i] + ['G', 'g'][j], g2 = g === 'gG' ? 'Gg' : g;
    if (g2 === 'GG') { ctx.save(); ctx.globalAlpha *= 0.7; blastocyste(ctx, cx, cy - 6, 50, {}); ctx.restore(); } else muisKleur(ctx, cx - 10, cy + 40, 15, g2 === 'gg' ? 'grijs' : 'geel', { houding: 'staan', kijk: 1 });
    allelChip(ctx, g2, cx + cs * 0.24, cy - cs * 0.32, 1, { px: 30 }); ctx.restore(); },
    { a: o.a ?? 1, kopL: 'gameten gele ouder 1', kopB: 'gameten gele ouder 2', uit: [o.weg || 0, 0, 0, 0] }); }
function klas(ctx, t, q, o = {}) { // klas op volgorde van lengte (zes castleerlingen + neutrale silhouetten)
  const cmPx = 2.1, voet = 760, lengte = [158, 161, 163, 165, 166, 168, 169, 170, 171, 172, 173, 174, 175, 176, 178, 179, 181, 183, 186, 189];
  const cast = { 2: 'yasmin', 5: 'noor', 9: 'daan', 12: 'lotte', 15: 'sam', 18: 'bilal' }, x0 = o.x0 ?? 140, dx = o.dx ?? 62, ia = o.in ?? 1;
  lengte.forEach((L, i) => { const a = clamp(ia * 20 - i, 0, 1); if (a <= 0.01) return; const x = x0 + i * dx, h = L * cmPx; ctx.save(); ctx.globalAlpha *= a * (o.a ?? 1);
    if (cast[i]) persoon(ctx, cast[i], x, voet, h, { uit: 'blij', t: t + i });
    else { ctx.fillStyle = rgba(C.mens, 0.55); circ(ctx, x, voet - h + h * 0.065, h * 0.065, rgba(C.mens, 0.55)); roundRect(ctx, x - h * 0.08, voet - h * 0.86, h * 0.16, h * 0.48, h * 0.05); ctx.fill(); ctx.fillRect(x - h * 0.06, voet - h * 0.4, h * 0.05, h * 0.4); ctx.fillRect(x + h * 0.01, voet - h * 0.4, h * 0.05, h * 0.4); }
    ctx.restore(); });
  ctx.save(); ctx.globalAlpha *= (o.a ?? 1); ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x0 - 40, voet); ctx.lineTo(x0 + 19 * dx + 40, voet); ctx.stroke();
  metaText(ctx, '1 m 60', x0 - 40, voet + 40, C.text2, 'left', 26); metaText(ctx, '1 m 90', x0 + 19 * dx + 40, voet + 40, C.text2, 'right', 26);
  if (o.lijn > 0.01) { ctx.globalAlpha *= o.lijn; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); lengte.forEach((L, i) => { const x = x0 + i * dx, y = voet - L * cmPx - 6; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.stroke(); }
  ctx.restore(); }

Object.assign(SCENES, {
  // ---------------- titel: rood, roze, wit
  title(ctx, t) { leeuwenbek(ctx, 1560, 980, 470, 'rood', { seed: 2, zwaai: t * 0.5 }); leeuwenbek(ctx, 1700, 980, 500, 'roze', { seed: 6, zwaai: t * 0.5 + 1 }); leeuwenbek(ctx, 1840, 980, 470, 'wit', { seed: 5, zwaai: t * 0.5 + 2 }); },

  // ---------------- Cold open (Macro: bloembed)
  s01(ctx, t, q) { bloembed(ctx); const r = q.on('rode', 1, 0.6), w = q.on('witte', 1, 0.6), rz = q.on('nakomelingen', 1, 1.4), m = q.on('gemengd', 1, 0.5) * (1 - q.on('vier', 1, 0.5)), v = q.on('vier', 1, 0.5), nm = q.on('nooit', 1, 0.5);
    groeiPlant(ctx, 520, 820, 500, 'rood', r, { seed: 2, zwaai: t * 0.5 }); groeiPlant(ctx, 860, 820, 500, 'wit', w, { seed: 5, zwaai: t * 0.5 + 1 });
    if (w > 0.5) text(ctx, '×', 690, 520, fTitel(90), rgba(C.text2, w), 'center');
    for (let i = 0; i < 4; i++) groeiPlant(ctx, 1180 + i * 165, 830, 400 + (i % 2) * 30, 'roze', clamp(rz * 1.4 - i * 0.12, 0, 1), { seed: 11 + i, zwaai: t * 0.5 + i });
    _n(ctx, 'rood', null, 520, 260, r); _n(ctx, 'wit', null, 860, 260, w); _n(ctx, 'alle nakomelingen roze', null, 1430, 360, rz);
    if (m > 0.01) { ctx.save(); ctx.globalAlpha *= m; roundRect(ctx, 1150, 110, 620, 170, 16); shape(ctx, rgba(C.bgSchema, 0.95), C.line, 1.5);
      verfKlodder(ctx, 1230, 195, 40, E3.rood); text(ctx, '+', 1310, 212, fTitel(60), C.text2, 'center'); verfKlodder(ctx, 1390, 195, 40, E3.wit); text(ctx, '=', 1470, 212, fTitel(60), C.text2, 'center'); verfKlodder(ctx, 1550, 195, 40, E3.roze);
      text(ctx, '?', 1690, 225, fTitel(80), C.goud, 'center'); ctx.restore(); }
    if (v > 0.01) { ctx.save(); ctx.globalAlpha *= v; termKaart(ctx, 'allelen mengen nooit', null, 1460, 140, 1, C.groen, 0, 44); ctx.restore(); }
    chMeta(ctx, 'leeuwenbek · antirrhinum majus', 1); },

  // ---------------- Hoofdstuk 1 — Intermediair
  s03(ctx, t, q) { chSchema(ctx); const f = q.on('eerste', 1, 0.5) * (1 - q.on('leeuwenbek', 1, 0.6)), lb = q.on('leeuwenbek', 1, 0.8);
    if (f > 0.01) { ctx.save(); ctx.globalAlpha *= f; metaText(ctx, 'uit film 1 · pigment in je huid', 960, 170, C.text2, 'center', 28);
      [['AA', 2, 1], ['Aa', 1, 1], ['aa', 0, 0]].forEach(([g, n, v], i) => { const x = 420 + i * 540; roundRect(ctx, x - 220, 220, 440, 440, 18); shape(ctx, rgba(C.fill, 0.45), i === 1 ? C.goud : C.line, i === 1 ? 3 : 1.5);
        allelChip(ctx, g, x, 280, 1, { px: 44 }); for (let k = 0; k < 2; k++) enzym(ctx, x - 60 + k * 120, 400, k < n, 2, 1, k); metaText(ctx, 'melanine', x - 180, 486, C.text2, 'left', 26); kleurstofMeter(ctx, x - 180, 500, 360, v, '#6A4026');
        text(ctx, v ? 'pigment' : 'geen pigment', x, 610, fTekst(40, 700), C.text, 'center'); });
      _n(ctx, 'één werkend allel is genoeg', null, 960, 730, q.on('genoeg', 1, 0.5), 'center', C.goud); ctx.restore(); }
    if (lb > 0.01) { ctx.save(); ctx.globalAlpha *= lb; leeuwenbek(ctx, 960, 860, 560, 'rood', { seed: 3, zwaai: t * 0.5 }); _n(ctx, 'leeuwenbek', 'bloemkleur', 1180, 420, 1, 'left'); ctx.restore(); } },
  s04(ctx, t, q) { chSchema(ctx); const rr = q.on('rode', 1, 0.5), ww = q.on('werkt', 1, 0.5), rRR = q.on('twee', 1, 1.2), rWW = q.on('wit', 1, 0.6), rRW = q.on('één', 1, 0.6), roze = q.on('genoeg', 1, 1.6), nie = q.on('genoeg', 1, 0.5);
    drieKleur(ctx, t, q, { aRR: Math.max(rr * 0.4, rRR), vRR: rRR, aWW: Math.max(ww * 0.4, rWW), vWW: 1, aRW: rRW, vRW: roze, goud: nie > 0.5 ? 1 : -1 }); },
  s05(ctx, t, q) { chSchema(ctx); const tus = q.on('tussen', 1, 0.6), im = q.on('intermediair', 1, 0.5), hl = q.on('hoofdletters', 1, 0.6);
    ['rood', 'roze', 'wit'].forEach((kl, i) => { const x = 460 + i * 500; leeuwenbek(ctx, x, 640, 400, kl, { seed: 4 + i, zwaai: t * 0.5 + i }); allelChip(ctx, ['RR', 'RW', 'WW'][i], x, 160, 1, { px: 40 }); });
    ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(260, 650); ctx.lineTo(1660, 650); ctx.stroke();
    haak(ctx, 840, 1080, 668, 'ertussenin', C.groen, tus * (1 - hl));
    if (im > 0.01) termKaart(ctx, 'intermediair', 'ook wel: onvolledig dominant', 960, 740, im * (1 - hl), C.goud);
    if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; roundRect(ctx, 460, 700, 1000, 190, 16); shape(ctx, rgba(C.bgSchema, 0.96), C.line, 1.5);
      allelChip(ctx, 'Aa', 640, 790, 1, { px: 40 }); metaText(ctx, 'dominant · recessief', 640, 860, C.text2, 'center', 24);
      allelChip(ctx, 'RW', 1280, 790, 1, { px: 40, rand: C.goud }); metaText(ctx, 'geen van beide dominant', 1280, 860, C.goud, 'center', 24); ctx.restore(); } },
  s06(ctx, t, q) { chSchema(ctx); leeuwenbek(ctx, 720, 760, 460, 'roze', { seed: 8, zwaai: t * 0.5 }); leeuwenbek(ctx, 1200, 760, 460, 'roze', { seed: 9, zwaai: t * 0.5 + 1 }); text(ctx, '×', 960, 520, fTitel(90), C.text2, 'center');
    vraagteken(ctx, 960, 300, q.on('denk', 1, 0.5)); },
  s08(ctx, t, q) { chSchema(ctx); const g = q.on('gameten', 1, 0.6), c0 = q.at('kruisingsschema'), rr = q.at('vakje', 1), rw = q.at('vakjes', 1), ww = q.at('vakje', 3), vh = q.on('verhouding', 1, 0.6);
    const cel = [ramp(t, rr, 0.6), ramp(t, rw, 0.6), ramp(t, rw + 0.3, 0.6), ramp(t, ww, 0.6)];
    leeuwenbek(ctx, 170, 860, 260, 'roze', { seed: 8, a: 1 - q.on('kruisingsschema', 1, 0.6) });
    schemaRoze(ctx, t, q, { a: Math.max(g, ramp(t, c0, 0.5)), gA: g, cel, verh: vh }); },
  s09(ctx, t, q) { chSchema(ctx); const lo = q.on('los', 1, 0.6), di = q.on('direct', 1, 0.6), u = ease(clamp((t - q.at('los')) / 1.4, 0, 1));
    leeuwenbek(ctx, 360, 760, 460, 'roze', { seed: 8, zwaai: t * 0.5 });
    allelChip(ctx, 'R', 590 + u * 30, 330 - u * 60, 1, { px: 44 }); allelChip(ctx, 'W', 650 + u * 130, 330 + u * 60, 1, { px: 44 });
    if (u > 0.3) { metaText(ctx, 'gameet', 620, 230, C.text2, 'center', 24); metaText(ctx, 'gameet', 780, 450, C.text2, 'center', 24); }
    misvatting(ctx, 'Allelen mengen', 'Ze worden los doorgegeven', 1320, 220, 760, q.on('gemengd', 1, 0.5), lo);
    if (di > 0.01) { ctx.save(); ctx.globalAlpha *= di; [['RR', 'rood'], ['RW', 'roze'], ['WW', 'wit']].forEach(([g, kl], i) => { const x = 1080 + i * 220; allelChip(ctx, g, x, 520, 1, { px: 36 }); text(ctx, '↓', x, 600, fTekst(44, 700), C.text2, 'center'); leeuwenbek(ctx, x, 860, 220, kl, { seed: 2 + i, n: 7 }); });
      metaText(ctx, 'genotype zie je aan het fenotype', 1300, 460, C.goud, 'center', 24); ctx.restore(); } },

  // ---------------- Hoofdstuk 2 — Bloedgroepen
  s10(ctx, t, q) { chMicro(ctx); const ke = q.on('ketens', 1, 0.8), a1 = q.at('ontstaat'), b1 = q.at('andere', 1), i1 = q.at('werkt'), gn = q.on('keten', 2, 0.5);
    const X = [400, 960, 1520];
    [['Iᴬ', 'A', a1 - 3.2], ['Iᴮ', 'B', b1 - 2.5], ['i', 'O', i1 - 1.5]].forEach(([al, s, t0], i) => { const x = X[i], a = i === 0 ? Math.max(ke, ramp(t, t0, 0.6)) : ramp(t, t0, 0.6); if (a <= 0.01) return;
      const eind = ramp(t, t0 + 1.4, 1.2); ctx.save(); ctx.globalAlpha *= a;
      bloedcelAntigeen(ctx, x, 470, 170, s === 'O' ? 'O' : s, { n: 14, rk: 12, eindIn: s === 'O' ? 1 : eind, rot: t * 0.03 });
      allelChip(ctx, al, x, 175, 1, { px: 44 });
      enzym(ctx, x + 175, 245, s !== 'O', 1.6, 1 - 0.6 * eind, t * 0.3);
      if (s !== 'O') _n(ctx, 'antigeen ' + s, null, x, 760, eind, 'center', s === 'A' ? E3.agA : E3.agB); else _n(ctx, 'geen A · geen B', 'alleen de keten', x, 760, gn, 'center');
      ctx.restore(); });
    _n(ctx, 'suikerketens', 'op de rode bloedcel', 400, 790, ke * (1 - ramp(t, a1 - 2.5, 0.6)), 'center');
    chMeta(ctx, 'rode bloedcellen · van boven · ketens vergroot', 1, W - 70, 'right'); },
  s11(ctx, t, q) { chSchema(ctx); const dr = q.on('drie', 1, 0.6), mu = q.on('multipele', 1, 0.5), tw = q.on('twee', 1, 0.6), v = q.on('vader', 1, 0.5), m = q.on('moeder', 1, 0.5);
    ctx.save(); ctx.globalAlpha *= dr; roundRect(ctx, 260, 170, 760, 230, 18); shape(ctx, rgba(C.fill, 0.4), C.line, 1.5); metaText(ctx, 'in de bevolking', 640, 220, C.text2, 'center', 26);
    ['Iᴬ', 'Iᴮ', 'i'].forEach((g, i) => allelChip(ctx, g, 420 + i * 220, 310, 1, { px: 48 })); ctx.restore();
    if (mu > 0.01) termKaart(ctx, 'multipele allelen', 'meer dan twee allelen voor één gen', 640, 450, mu, C.goud);
    if (tw > 0.01) { ctx.save(); ctx.globalAlpha *= tw; roundRect(ctx, 1120, 170, 600, 520, 18); shape(ctx, rgba(C.fill, 0.4), C.goud, 2); metaText(ctx, 'één persoon · twee allelen', 1420, 220, C.goud, 'center', 26);
      allelChip(ctx, 'Iᴬ', 1290, 380, v, { px: 52, rand: C.teal }); _n(ctx, 'van de vader', null, 1290, 490, v, 'center', C.teal);
      allelChip(ctx, 'i', 1550, 380, m, { px: 52, rand: C.oker }); _n(ctx, 'van de moeder', null, 1550, 490, m, 'center', C.oker);
      metaText(ctx, 'voorbeeld', 1420, 640, C.text2, 'center', 24); ctx.restore(); } },
  s12(ctx, t, q) { chMicro(ctx); const d = q.on('dominant', 1, 0.6), a = ramp(t, q.at('geven', 1) - 1.8, 0.6), b = ramp(t, q.at('geven', 2) - 1.8, 0.6), o = ramp(t, q.at('heb', 1) - 0.8, 0.6), og = q.on('geen', 1, 0.6);
    vierCellen(ctx, t, { a: [a, b, 0, o] });
    if (d > 0.01) tagKaart(ctx, 'Iᴬ en Iᴮ zijn dominant over i', 960, 130, d * (1 - a * 0.4), C.line, 40);
    _n(ctx, 'alleen de keten', 'geen a · geen b', 1640, 228, og);
    chMeta(ctx, 'rode bloedcellen · van boven · ketens vergroot', 1); },
  s13(ctx, t, q) { chSchema(ctx); const ab = q.on('beide', 1, 0.6), tu = q.on('ertussenin', 1, 0.6), co = q.on('codominant', 1, 0.6);
    const L = tu, R = 1; roundRect(ctx, 1040, 150, 760, 690, 18); shape(ctx, rgba(C.fill, 0.45), co > 0.5 ? C.goud : C.line, co > 0.5 ? 2.5 : 1.5);
    ctx.save(); ctx.fillStyle = C.bgMicro; ctx.beginPath(); ctx.arc(1260, 420, 200, 0, 6.283); ctx.fill(); ctx.restore();
    bloedcelAntigeen(ctx, 1260, 420, 140, 'AB', { n: 16, rk: 10, eindIn: Math.max(0.15, ab), rot: t * 0.03 });
    allelChip(ctx, 'IᴬIᴮ', 1620, 270, 1); text(ctx, 'A én B', 1620, 440, fTekst(44, 700), C.text, 'center');
    _n(ctx, 'antigeen A', null, 1530, 340, ab, 'left', E3.agA); _n(ctx, 'antigeen B', null, 1530, 520, ab, 'left', E3.agB);
    if (L > 0.01) { ctx.save(); ctx.globalAlpha *= L; roundRect(ctx, 120, 150, 760, 690, 18); shape(ctx, rgba(C.fill, 0.35), C.line, 1);
      leeuwenbek(ctx, 360, 640, 420, 'roze', { seed: 8, zwaai: t * 0.5 }); allelChip(ctx, 'RW', 640, 270, 1); text(ctx, 'ertussenin', 640, 440, fTekst(44, 700), C.text2, 'center');
      termKaart(ctx, 'intermediair', null, 500, 690, 1, C.text2, 560, 44); ctx.restore(); }
    if (co > 0.01) termKaart(ctx, 'codominant', 'beide allelen komen volledig tot uiting', 1420, 660, co, C.goud, 700, 60); },
  s14(ctx, t, q) { kamer(ctx); const m = q.on('moeder', 1, 0.5), v = q.on('vader', 1, 0.5), k = q.on('kind', 1, 0.5);
    const P = [['dennis', 560, 600], ['sara', 800, 500], ['levi', 990, 450], ['jens', 1160, 390], ['marieke', 1360, 575]];
    P.forEach(([id, x, h], i) => persoon(ctx, id, x, VLOER, h, { uit: 'blij', kijk: x < 950 ? 1 : -1, t: t + i * 0.7 }));
    tagKaart(ctx, 'bloedgroep A', 1360, 230, m); tagKaart(ctx, 'bloedgroep B', 560, 210, v);
    [800, 990, 1160].forEach((x, i) => tagKaart(ctx, '?', x, [300, 350, 410][i], k, C.goud)); },
  s16(ctx, t, q) { chSchema(ctx); const mo = q.on('moeder', 1, 0.5), dr = q.on('moeder', 1, 0.8), ii = q.at('allebei', 2), kw = q.on('kwart', 1, 0.6), an = q.on('andere', 1, 0.6);
    const cel = [an, an, an, ramp(t, ii, 0.6)];
    schemaAB(ctx, t, q, { a: mo, cel, hl: [0, 0, 0, ramp(t, ii + 0.6, 0.5)] });
    if (dr > 0.01) { tagKaart(ctx, 'moeder Iᴬi', 250, 450, dr * (1 - an), C.line, 34); tagKaart(ctx, 'vader Iᴮi', 810, 110, dr * (1 - an), C.line, 34); }
    if (kw > 0.01) { ctx.save(); ctx.globalAlpha *= kw; text(ctx, 'kans op O', 1530, 470, fTekst(44, 700), C.text, 'center'); text(ctx, '¼', 1530, 590, fTitel(110), C.goud, 'center'); ctx.restore(); }
    if (an > 0.01) { ctx.save(); ctx.globalAlpha *= an; text(ctx, 'A, B, AB en O', 1530, 690, fTekst(40, 700), C.text, 'center'); metaText(ctx, 'elk een kans van ¼', 1530, 740, C.text2, 'center', 26); ctx.restore(); } },
  s17(ctx, t, q) { chSchema(ctx); const st = q.on('stof', 1, 0.5), on = q.on('ontbreken', 1, 0.5), af = q.on('afweer', 1, 0.6);
    ctx.save(); ctx.fillStyle = C.bgMicro; ctx.beginPath(); ctx.arc(480, 470, 260, 0, 6.283); ctx.fill(); ctx.restore(); bloedcelAntigeen(ctx, 480, 470, 170, 'O', { n: 14, rk: 12, rot: t * 0.03 });
    _n(ctx, 'bloedgroep O', 'alleen de keten · geen a · geen b', 480, 800, 1, 'center');
    misvatting(ctx, 'Bloedgroep O is een eigen stof', 'O = geen antigeen A en geen B', 1260, 300, 860, st, on);
    if (af > 0.01) tagKaart(ctx, 'film: Vaccins, allergie en bloedgroepen', 1260, 580, af, C.line, 32); },

  // ---------------- Hoofdstuk 3 — Een letale factor
  s18(ctx, t, q) { chSchema(ctx); const gl = q.on('geel', 1, 0.6), gr = q.on('grijze', 1, 0.6), ch = q.on('noem', 1, 0.5), kr = q.on('kruis', 1, 0.6), ve = q.on('verwacht', 1, 0.6), te = q.on('telt', 1, 0.6);
    muisKleur(ctx, 560, 360, 20, 'geel', { kijk: 1, a: gl }); muisKleur(ctx, 1400, 360, 20, 'grijs', { kijk: -1, a: gr * (1 - kr) });
    allelChip(ctx, 'G', 560, 140, ch * (1 - kr), { px: 44 }); _n(ctx, 'geel · dominant', null, 560, 220, ch * (1 - kr), 'center');
    allelChip(ctx, 'g', 1400, 140, ch * (1 - kr), { px: 44 }); _n(ctx, 'grijs', null, 1400, 220, ch * (1 - kr), 'center');
    if (kr > 0.01) { ctx.save(); ctx.globalAlpha *= kr; muisKleur(ctx, 1260, 360, 20, 'geel', { kijk: -1 }); text(ctx, '×', 910, 300, fTitel(80), C.text2, 'center'); ctx.restore(); }
    if (ve > 0.01) { ctx.save(); ctx.globalAlpha *= ve; roundRect(ctx, 220, 470, 640, 330, 16); shape(ctx, rgba(C.bgSchema, 0.95), C.line, 1.5); metaText(ctx, 'verwacht', 540, 520, C.text2, 'center', 28);
      text(ctx, '3 geel : 1 grijs', 540, 600, fTekst(48, 700), C.text, 'center'); for (let i = 0; i < 4; i++) muisKleur(ctx, 300 + i * 150, 760, 10, i < 3 ? 'geel' : 'grijs', { kijk: 1 }); ctx.restore(); }
    if (te > 0.01) { ctx.save(); ctx.globalAlpha *= te; roundRect(ctx, 1060, 470, 640, 330, 16); shape(ctx, rgba(C.bgSchema, 0.95), C.koraal, 2); metaText(ctx, 'geteld', 1380, 520, C.koraal, 'center', 28);
      text(ctx, '2 geel : 1 grijs', 1380, 600, fTekst(48, 700), C.text, 'center'); for (let i = 0; i < 3; i++) muisKleur(ctx, 1160 + i * 170, 760, 10, i < 2 ? 'geel' : 'grijs', { kijk: 1 }); ctx.restore(); } },
  s19(ctx, t, q) { chSchema(ctx); muisKleur(ctx, 600, 520, 20, 'geel', { kijk: 1 }); muisKleur(ctx, 1320, 520, 20, 'geel', { kijk: -1 }); text(ctx, '×', 960, 460, fTitel(80), C.text2, 'center');
    tagKaart(ctx, 'geteld: 2 geel : 1 grijs', 960, 720, 1, C.koraal, 40); vraagteken(ctx, 960, 300, q.on('rest', 1, 0.5)); },
  s21(ctx, t, q) { chSchema(ctx); const gg = q.on('allemaal', 1, 0.5), ch = q.on('gele', 2, 0.6), dn = q.on('ontbreekt', 1, 0.5), weg = ramp(t, q.at('ontbreekt') + 0.2, 1.4), nb = q.on('naast', 1, 0.6), em = q.on('embryo', 1, 0.6), st = q.on('stopt', 1, 0.8);
    muisKleur(ctx, 300, 300, 18, 'geel', { kijk: 1, a: gg }); allelChip(ctx, 'Gg', 300, 120, gg, { px: 40 });
    if (ch > 0.01) { ctx.save(); ctx.globalAlpha *= ch * (1 - 0.5 * em); deletie(ctx, 140, 600, 1000, weg, dn, nb); ctx.restore(); }
    if (em > 0.01) zoomCircle(ctx, 1500, 420, 250, 360, 290, 'embryo · enkele dagen oud · vergroot', em, () => { chMicro(ctx); ctx.save(); ctx.globalAlpha *= 1 - 0.65 * st; blastocyste(ctx, 1500, 420, 150, {}); ctx.restore(); });
    if (st > 0.01) _n(ctx, 'met twee gele allelen', 'groeit niet verder', 1500, 120, st, 'center', C.koraal); },
  s22(ctx, t, q) { chSchema(ctx); const w = q.on('weg', 1, 0.8), tw = q.on('twee', 1, 0.6), le = q.on('letale', 1, 0.6), dm = q.on('vachtkleur', 1, 0.5), rc = q.on('overleven', 1, 0.5);
    muisSchema(ctx, t, q, { weg: w });
    if (tw > 0.01) { ctx.save(); ctx.globalAlpha *= tw; muisKleur(ctx, 1180, 330, 9, 'geel', { kijk: 1 }); muisKleur(ctx, 1320, 330, 9, 'geel', { kijk: 1 }); muisKleur(ctx, 1460, 330, 9, 'grijs', { kijk: 1 }); text(ctx, '2 geel : 1 grijs', 1560, 320, fTekst(40, 700), C.text, 'left'); ctx.restore(); }
    if (le > 0.01) termKaart(ctx, 'letale factor', 'in dubbele dosis dodelijk', 1450, 420, le, C.goud);
    tagKaart(ctx, 'vachtkleur: geel is dominant', 1450, 680, dm, C.line, 34); tagKaart(ctx, 'overleven: geel is recessief', 1450, 770, rc, C.koraal, 34); },

  // ---------------- Hoofdstuk 4 — Polygene overerving (verdieping)
  s23(ctx, t, q) { chSchema(ctx); const k = q.on('klas', 1, 0.5), u = clamp((t - q.at('klas')) / 2.5, 0, 1), vl = q.on('vloeiende', 1, 0.8), dz = q.on('duizenden', 1, 0.6);
    klas(ctx, t, q, { in: u, a: k, lijn: vl, x0: 260, dx: 72 });
    if (dz > 0.01) tagKaart(ctx, 'duizenden plekken in je DNA', 960, 150, dz, C.goud, 40); },
  s24(ctx, t, q) { chSchema(ctx); const m = q.on('model', 1, 0.5), g1 = q.on('één', 1, 0.6), g2 = q.on('vijf', 1, 0.6), g3 = q.on('zeven', 1, 0.6), gv = q.on('heel', 1, 0.8), po = q.on('polygene', 1, 0.6);
    metaText(ctx, 'model · elk allel voor lang telt een stapje op', 960, 130, C.goud, 'center', 26);
    histModel(ctx, 160, 520, 380, 220, 1, { a: g1, titel: '1 gen · 3 groepen' }); histModel(ctx, 640, 520, 380, 220, 2, { a: g2, titel: '2 genen · 5 groepen' }); histModel(ctx, 1120, 520, 380, 220, 3, { a: g3, titel: '3 genen · 7 groepen' });
    if (gv > 0.01) { histVeel(ctx, 560, 830, 800, 220, gv); metaText(ctx, 'heel veel genen + voeding en gezondheid', 960, 880, C.text2, 'center', 24); }
    if (po > 0.01) termKaart(ctx, 'polygene overerving', 'veel genen samen, één eigenschap', 1640, 640, po, C.goud, 470, 40); },
  s25(ctx, t, q) { chSchema(ctx); histVeel(ctx, 560, 720, 800, 360, 1); metaText(ctx, 'lengte', 960, 780, C.text2, 'center', 26); vraagteken(ctx, 960, 220, q.on('erfelijk', 1, 0.5)); },
  s27(ctx, t, q) { chSchema(ctx); const md = q.on('genen', 1, 0.6), op = q.on('op', 1, 0.6), mi = q.on('milieu', 1, 0.6), lo = q.on('ouders', 1, 0.6);
    // lengtebalk die stapjes stapelt: drie genen + milieu
    const x = 380, y0 = 820; ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(220, y0); ctx.lineTo(560, y0); ctx.stroke();
    ['gen 1', 'gen 2', 'gen 3'].forEach((g, i) => { const a = i === 0 ? md : ramp(t, q.at('op') + i * 0.4, 0.5); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 70, y0 - (i + 1) * 120, 140, 112, 8); shape(ctx, rgba(C.teal, 0.6), C.teal, 1.5); metaText(ctx, g, x + 90, y0 - i * 120 - 50, C.text2, 'left', 24); ctx.restore(); });
    if (mi > 0.01) { ctx.save(); ctx.globalAlpha *= mi; roundRect(ctx, x - 70, y0 - 3 * 120 - 70, 140, 62, 8); shape(ctx, rgba(C.oker, 0.6), C.oker, 1.5); metaText(ctx, 'milieu', x + 90, y0 - 3 * 120 - 30, C.oker, 'left', 24); ctx.restore(); }
    if (lo > 0.01) { ctx.save(); ctx.globalAlpha *= lo; histVeel(ctx, 900, 820, 820, 300, 0.35); histModel(ctx, 1240, 820, 420, 300, 4, { kl: C.groen });
      metaText(ctx, 'kinderen van lange ouders', 1450, 870, C.groen, 'center', 24); metaText(ctx, 'iedereen', 1000, 870, C.text2, 'center', 24); ctx.restore(); } },

  // ---------------- Recap
  s28(ctx, t, q) { bloembed(ctx); const kr = q.on('kruis', 1, 0.6), te = q.on('terug', 2, 2), no = q.on('nooit', 1, 0.6);
    leeuwenbek(ctx, 360, 820, 460, 'roze', { seed: 8, zwaai: t * 0.5 }); leeuwenbek(ctx, 640, 820, 460, 'roze', { seed: 9, zwaai: t * 0.5 + 1 }); text(ctx, '×', 500, 520, fTitel(80), rgba(C.text2, kr), 'center');
    ['rood', 'roze', 'roze', 'wit'].forEach((kl, i) => groeiPlant(ctx, 1000 + i * 210, 830, 400, kl, clamp(te * 1.4 - i * 0.12, 0, 1), { seed: 20 + i, zwaai: t * 0.5 + i }));
    if (no > 0.01) termKaart(ctx, 'allelen mengen nooit', 'ze worden los doorgegeven', 1320, 130, no, C.groen); },
  s29(ctx, t, q) { chSchema(ctx); const R = [['Intermediair', 'heterozygoot ertussenin · 1 : 2 : 1', 'intermediair'], ['Codominant', 'beide allelen volledig · bloedgroep AB', 'codominant'], ['Multipele allelen', 'Iᴬ, Iᴮ, i · per persoon twee', 'multipele'], ['Letale factor', 'één genotype valt weg · 2 : 1', 'letale'], ['Polygeen', 'veel genen · vloeiende reeks', 'polygeen']];
    R.forEach(([k, s, cue], i) => { const a = q.on(cue, 1, 0.5), nu = a * (1 - q.on(R[i + 1] ? R[i + 1][2] : 'volgende', 1, 0.5)); if (a <= 0.01) return; const y = 190 + i * 140; ctx.save(); ctx.globalAlpha *= a;
      roundRect(ctx, 400, y - 60, 1120, 112, 14); shape(ctx, rgba(C.fill, 0.45), nu > 0.5 ? C.goud : C.line, nu > 0.5 ? 2.5 : 1.5);
      const ix = 480, iy = y - 4;
      if (i === 0) leeuwenbek(ctx, ix, iy + 46, 100, 'roze', { seed: 3, n: 6 }); else if (i === 1) { bloedcelAntigeen(ctx, ix, iy, 30, 'AB', { n: 10, rk: 3 }); } else if (i === 2) { allelChip(ctx, 'Iᴬ Iᴮ i', ix, iy, 1, { px: 22 }); }
      else if (i === 3) { muisKleur(ctx, ix - 10, iy + 30, 5, 'geel', { kijk: 1 }); } else histModel(ctx, ix - 50, iy + 36, 100, 70, 3, {});
      text(ctx, k, 580, y + 2, fTekst(44, 700), C.text, 'left'); text(ctx, s, 960, y + 2, fTekst(32, 500), C.text2, 'left'); ctx.restore(); }); }
});
