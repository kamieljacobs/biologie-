// Wat word jij? · Gezondheidswetenschappen 2 · Screenen of niet? — scènes per alinea (v1.0, 31 okt 2026).
// Look: Schema met cast (Yasmin, stagiair; Epidemioloog Farid zonder badge of afdeling; Opa Henk krijgt alleen de envelop).
// Decors: 'henk' (hal en keuken, nieuw) in de cold open, de keuken in H2, het slot van H4 en de recap; 'ggd' (kantoor van film 1) alleen bij de eerste zinnen van H1, zonder badges of opschrift.
// Rode draad (mutatie 'geschiedenis-tijdlijn'): één tijdlijn onderin groeit per hoofdstuk: 2026 → 1968 → 2009 → jan 2014 → 2019 → jul 2014 → 2022 → 2015 → 2026.

// ---------- vaste stukken ----------
const KRIT = ['belangrijk gezondheidsprobleem', 'herkenbaar vroeg stadium', 'betrouwbare test', 'behandeling die helpt'];
// kaart 'Wilson & Jungner' met tien vinkvakjes; groot = 0..1 (vier vakjes lichten op)
function criteriaKaart(ctx, x, y, w, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = o.h || 330; roundRect(ctx, x, y, w, h, 18); shape(ctx, rgba(LOKAAL, 0.92), C.goud, 2.5);
  text(ctx, 'Wilson & Jungner', x + 36, y + 64, fTitel(o.px || 48), C.text, 'left'); metaText(ctx, o.meta || '1968 · VOOR DE WHO', x + 36, y + 102, C.grain, 'left', 22);
  for (let i = 0; i < 10; i++) { const bx = x + 36 + (i % 5) * ((w - 72) / 5), by = y + 150 + Math.floor(i / 5) * 76; roundRect(ctx, bx, by, 48, 48, 8); shape(ctx, rgba('#2A3446', 0.9), C.line, 2);
    if (o.vink && o.vink[i] > 0.01) vink_(ctx, bx + 24, by + 26, 14, o.vink[i], C.groen); }
  if (o.gezond > 0.01) { ctx.save(); ctx.globalAlpha *= o.gezond; for (let i = 0; i < 7; i++) popje(ctx, x + w - 250 + i * 32, y + 92, 11, C.teal, 1); metaText(ctx, 'GEZONDE MENSEN', x + w - 36, y + 46, C.teal, 'right', 20); ctx.restore(); }
  ctx.restore(); }
// sterftelijn 2013 → 2022 (alleen begin- en eindjaar), assen eerlijk vanaf 0
const STERF = { x: 1010, y: 260, w: 640, h: 300 };
function sterfteGrafiek(ctx, a = 1, u = 1, o = {}) { if (a <= 0.01) return; const { x, y, w, h } = Object.assign({}, STERF, o.g || {}); ctx.save(); ctx.globalAlpha *= a;
  lijn(ctx, [[x, y], [x, y + h], [x + w, y + h]], C.line, 2); [0, 50, 100].forEach(v => { const yy = y + h - v / 100 * h; ctx.fillStyle = C.line; ctx.fillRect(x - 10, yy - 1, 10, 2); metaText(ctx, String(v), x - 16, yy + 8, C.text2, 'right', 22); });
  metaText(ctx, '2013', x + 40, y + h + 36, C.text2, 'center', 22); metaText(ctx, '2022', x + w - 40, y + h + 36, C.text2, 'center', 22);
  metaText(ctx, 'STERFTE AAN DARMKANKER, 55+ · PER 100.000', x, y - 48, C.text2, 'left', 20);
  const p1 = [x + 40, y + h - 97 / 100 * h], p2 = [x + w - 40, y + h - 71 / 100 * h], pe = [lerp(p1[0], p2[0], u), lerp(p1[1], p2[1], u)];
  lijn(ctx, [p1, pe], C.koraal, 5); circ(ctx, p1[0], p1[1], 9, C.koraal, null); text(ctx, '97', p1[0], p1[1] - 22, fTekst(36, 800), C.text, 'center');
  if (u > 0.98) { circ(ctx, p2[0], p2[1], 9, C.koraal, null); text(ctx, '71', p2[0], p2[1] - 22, fTekst(36, 800), C.text, 'center'); }
  metaText(ctx, 'RIVM · ALLEEN BEGIN- EN EINDJAAR', x + w, y + h + 70, C.grain, 'right', 18); ctx.restore(); return [p1, p2]; }
function stadiumBalken(ctx, x, y, a = 1, u2 = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const w = 560;
  metaText(ctx, 'STADIUM I BIJ ONTDEKKING · 55–75 JAAR', x, y, C.text2, 'left', 20);
  [['2013', 0.18, 1], ['2022', 0.30, u2]].forEach(([jr, f, ua], i) => { if (ua <= 0.01) return; const yy = y + 34 + i * 92; ctx.save(); ctx.globalAlpha *= ua; text(ctx, jr, x, yy + 44, fTekst(32, 700), C.text2, 'left');
    roundRect(ctx, x + 100, yy, w, 56, 12); shape(ctx, '#2A3446', null); roundRect(ctx, x + 100, yy, Math.max(14, w * f * (i ? ease(ua) : 1)), 56, 12); shape(ctx, rgba(C.groen, 0.8), C.groen, 2);
    text(ctx, Math.round(f * 100) + ' %', x + 100 + w * f + 18, yy + 42, fTekst(36, 800), C.text, 'left'); ctx.restore(); });
  metaText(ctx, 'IKNL', x, y + 236, C.grain, 'left', 18); ctx.restore(); }
// groep telpoppetjes voor de gelote proef (met of zonder envelop)
function proefGroep(ctx, x, y, a, met, t) { if (a <= 0.01) return; popRaster(ctx, x, y, 30, 6, 46, 13, () => met ? C.teal : '#7C8698', a); if (met) for (let i = 0; i < 6; i++) envelop(ctx, x + i * 46 + 16, y - 50, 30, a, -0.1); }
// raster van 100 kijkonderzoeken (20 × 5)
const R100 = { x: 330, y: 300, per: 20, gap: 66, r: 15 };
const kleur100 = (i, k, p, kl, n) => i < 4 ? (k > 0.5 ? C.koraal : null) : i < 29 ? (p > 0.5 ? C.oker : null) : i < 62 ? (kl > 0.5 ? _mixHex(C.oker, '#F2F2EE', 0.45) : null) : (n > 0.5 ? C.teal : null);

// tekstpil op een donkere ondergrond (C5: op drukke achtergronden een donkere pil)
function donkerPil(ctx, s2, x, y, col, a = 1, px = 30) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 600); const w = ctx.measureText(s2).width + 44; roundRect(ctx, x - w / 2, y - px - 8, w, px + 26, (px + 26) / 2); shape(ctx, rgba('#121A26', 0.88), col, 2); text(ctx, s2, x, y, fTekst(px, 600), C.text, 'center'); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { envelop(ctx, 1430, 600, 360, 1, -0.08); buisje(ctx, 1700, 690, 1.7, 1, 0.12); metaText(ctx, 'BEVOLKINGSONDERZOEK · 55 T/M 75 JAAR', 1580, 820, C.text2, 'center', 20); },

  // ---------- Cold open: de envelop op de mat ----------
  s01(ctx, t, q) { henkVlak(ctx); const tMat = q.at('mat', 1), tY = q.at('Yasmin', 1), tV = q.at('vraagt', 1), tW = q.at('waarom', 1), tA = q.at('antwoord', 1);
    const Ya = ramp(t, tY - 0.2, 0.3), op = ramp(t, tY + 0.9, 0.9), geef = ramp(t, tV, 1.0);
    const rh = persoon(ctx, 'henk', 620, 790, 430, { t, kijk: 1, uit: t > tW ? 'denkt' : 'neutraal', pose: geef > 0.6 ? 'vasthouden' : 'staan' });
    const ry = persoon(ctx, 'yasmin', 930, 790, 430, { t, kijk: -1, uit: 'blij', pose: op > 0.3 && geef < 0.6 ? 'vasthouden' : 'staan', a: Ya });
    naamBij(ctx, 'Opa Henk', '71 JAAR', 620, 300, 1 - ramp(t, tW - 0.4, 0.4), 'center'); naamBij(ctx, 'Yasmin', 'STAGIAIR', 930, 300, Ya * (1 - ramp(t, tW - 0.4, 0.4)), 'center');
    // envelop: door de brievenbus op de mat, dan via Yasmin naar Opa Henk
    const val = ramp(t, tMat - 0.6, 0.7), mat = [318, 712], gleuf = [335, 440];
    let p = [lerp(gleuf[0], mat[0], val), lerp(gleuf[1], mat[1], val * val)], rot = lerp(-1.2, 0.08, val), w = 92;
    const hy = ry.handR || { x: 900, y: 600 }, hh = rh.handR || { x: 660, y: 600 };
    if (op > 0) { p = [lerp(p[0], hy.x, op), lerp(p[1], hy.y + 10, op)]; rot = lerp(rot, -0.15, op); w = lerp(92, 80, op); }
    if (geef > 0) { p = [lerp(p[0], hh.x, geef), lerp(p[1], hh.y + 10, geef)]; rot = lerp(rot, 0.1, geef); }
    envelop(ctx, p[0], p[1], w, ramp(t, tMat - 0.6, 0.15), rot);
    naamBij(ctx, 'ontlastingstest', 'BEVOLKINGSONDERZOEK DARMKANKER', 170, 790, ramp(t, tMat + 0.3, 0.4) * (1 - op), 'left', C.text);
    // de vraag: een test vanaf 55, maar geen hersenscan
    laag(ctx, ramp(t, tW - 0.2, 0.4), () => { roundRect(ctx, 1060, 120, 760, 360, 20); shape(ctx, rgba(LOKAAL, 0.92), rgba(C.goud, 0.85), 2.5);
      buisje(ctx, 1200, 330, 1.4, 1, -0.1); text(ctx, '55+', 1200, 440, fTekst(40, 800), C.text, 'center'); vink_(ctx, 1290, 220, 22, 1, C.groen);
      laag(ctx, q.on('hersenscan', 1, 0.4), () => { breinGrijs(ctx, 1560, 320, 0.42, 1); kruis(ctx, 1700, 200, 20, 1, C.koraal); text(ctx, 'hersenscan', 1560, 440, fTekst(34, 700), C.text, 'center'); });
      vraagteken(ctx, 1400, 340, q.on('maar', 1, 0.4), 120); });
    tijdlijn(ctx, ramp(t, tA - 0.2, 0.5), { zicht: { 2026: 1 }, hl: '2026', wijzer: TL.p[2026] - 220 * ease(ramp(t, tA + 0.6, 1.2)) }); },

  // ---------- H1 Voorkómen, vroeg vinden, erger voorkomen ----------
  s03(ctx, t, q) { const tP = q.at('Preventie', 1), Z = ramp(t, tP - 0.4, 1.3), P = 1 - clamp(Z * 3, 0, 1);
    kantoor(ctx, Z, (c) => { duoGz2(c, t, { poseF: t < q.at('bevolking', 1) ? 'staan' : 'wijsOmhoog', uitY: 'neutraal', aY: P, aF: P });
        naamBij(c, 'Epidemioloog Farid', '', 1420, 360, P * (1 - q.on('kijkt', 1)), 'center'); naamBij(c, 'Yasmin', '', 560, 370, P * (1 - q.on('kijkt', 1)), 'center'); },
      (c) => { const E = q.on('patiënt', 1, 0.4) * (1 - q.on('bevolking', 1, 0.4)), B = q.on('bevolking', 1, 0.6) * (1 - ramp(t, tP + 0.6, 0.5));
        laag(c, E, () => { popje(c, 960, 640, 70, C.teal, 1); text(c, 'één patiënt', 960, 760, fTekst(60, 700), C.text, 'center'); });
        laag(c, B, () => { popRaster(c, 330, 330, 60, 15, 90, 22, (i) => [C.teal, C.teal, C.teal, C.oker, C.teal, C.koraal][Math.floor(hash(i * 3.1) * 6)], 1); text(c, 'een hele bevolking', 960, 860, fTekst(60, 700), C.text, 'center'); });
        const pa = ramp(t, tP + 0.6, 0.5); preventie(c, [pa * Math.max(0.35, q.on('Voorkómen', 1)), pa * Math.max(0.35, q.on('vinden', 1)), pa * Math.max(0.35, q.on('erger', 1))], { t });
        tijdlijn(c, pa, { zicht: { 2026: 1 } }); }); },

  s04(ctx, t, q) { bg(ctx, 'schema'); const tN = q.at('niveau', 1), K = ramp(t, tN - 0.3, 0.6);
    darmDoorsnede(ctx, 1); metaText(ctx, 'DIKKE DARM · DOORSNEDE · VEREENVOUDIGD, NIET OP SCHAAL', 200, DARM.y - DARM.h / 2 - 20, C.grain, 'left', 20);
    const g1 = ramp(t, q.at('poliep', 1) - 0.2, 1.0), kan = ramp(t, q.at('groeit', 1), 2.4); const top = poliep(ctx, 760, g1 * (0.45 + 0.55 * kan), 1, kan);
    const on = q.on('onschuldig', 1, 0.6); poliep(ctx, 1180, 0.35, on); poliep(ctx, 1480, 0.25, on);
    naamBij(ctx, 'poliep', on > 0.01 ? '' : 'BOBBELTJE IN DE DARMWAND', 830, DARM.y - 4, q.on('poliep', 1, 0.4) * (1 - ramp(t, q.at('groeit', 1), 0.4)), 'left', C.oker);
    naamBij(ctx, 'kanker', 'UIT EEN POLIEP', 830, DARM.y - 4, ramp(t, q.at('groeit', 1) + 0.5, 0.5), 'left', C.koraal); naamBij(ctx, 'meestal onschuldig', '', 1330, DARM.y - 4, on, 'center', C.oker);
    // tijdpijl: vaak meer dan tien jaar
    laag(ctx, q.on('tien', 1, 0.5) * (1 - K), () => { pijl(ctx, 560, 410, 960, 410, C.goud, 1, 5, 18); tag(ctx, 'vaak meer dan 10 jaar', 760, 384, C.goud, 1, 'center', 28); });
    // de vraag: op welk niveau hoort het bevolkingsonderzoek?
    preventieKlein(ctx, [K, K, K], {}); laag(ctx, K, () => { envelop(ctx, 1450, 250 + Math.sin(t * 2) * 8, 150, 1, -0.06 + Math.sin(t * 1.3) * 0.04); vraagteken(ctx, 1640, 300, 1, 110); });
    tijdlijn(ctx, 1, { zicht: { 2026: 1 } }); },

  s06(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: vroeg vinden, en soms voorkómen', 1);
    const V = q.on('Zo', 1, 0.8), oy = 190;
    ctx.save(); ctx.translate(160, oy); ctx.scale(0.62, 0.62); ctx.translate(-160, -160); preventie(ctx, [1, 1, 1], { hl: V > 0.5 ? 0 : 1, dim: [2] }); ctx.restore();
    const [ex, ey] = [160 + (PREV.x[1] + PREV.w / 2 - 160) * 0.62, oy + (PREV.y - 160) * 0.62]; envelop(ctx, ex, oy + (PREV.y + PREV.h - 160) * 0.62 + 34, 70, 1, 0.04);
    // groene boog terug naar 'voorkómen'
    const boog = () => laag(ctx, V, () => { const x1 = ex - 40, x0 = 160 + (PREV.x[0] + PREV.w / 2 - 160) * 0.62 + 40, yt = oy + (PREV.y - 160) * 0.62 - 14; ctx.save(); ctx.strokeStyle = C.groen; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x1, yt); ctx.quadraticCurveTo((x0 + x1) / 2, yt - 70, x0 + 4, yt - 4); ctx.stroke(); ctx.restore(); pijl(ctx, x0 + 26, yt - 22, x0 + 2, yt - 2, C.groen, 1, 6, 18); });
    darmDoorsnede(ctx, 1); const sc = ramp(t, q.at('poliepen', 1) - 0.4, 1.6), weg = ramp(t, q.at('weggehaald', 1), 0.8);
    scoop(ctx, sc * (1 - 0.75 * weg), 1, t); poliep(ctx, 760, 0.55 * (1 - weg), 1, 0); poliep(ctx, 1180, 0.35, q.on('vindt', 2)); const KV = q.on('kanker', 1, 0.4) * (1 - q.on('poliepen', 1, 0.4)); laag(ctx, KV, () => { poliep(ctx, 1480, 0.7, 1, 1); naamBij(ctx, 'kanker', 'VROEG GEVONDEN', 1480, DARM.y - 4, 1, 'center', C.koraal); }); boog();
    laag(ctx, weg * (1 - V), () => { ctx.save(); ctx.beginPath(); ctx.arc(760, darmBodem(760) - 30, 60, 0, 6.283); ctx.strokeStyle = C.groen; ctx.lineWidth = 4; ctx.setLineDash([10, 7]); ctx.stroke(); ctx.restore(); });
    naamBij(ctx, 'poliep weg', 'HIER GROEIT GEEN KANKER MEER', 760, DARM.y - 4, weg, 'center', C.groen);
    naamBij(ctx, 'kijkonderzoek', '', 290, DARM.y + 14, sc * (1 - weg), 'left', C.text);
    tijdlijn(ctx, 1, { zicht: { 2026: 1 } }); },

  s07(ctx, t, q) { bg(ctx, 'schema'); const tT = q.at('tijdlijn', 1), tW = q.at('Wilson', 1), tD = q.at('Daar', 1), sl = ramp(t, tT, 1.6);
    const wx = lerp(TL.p[2026], TL.p[1968], sl); tijdlijn(ctx, 1, { zicht: { 2026: 1, 1968: ramp(t, tT + 1.2, 0.4) }, hl: sl > 0.9 ? '1968' : '2026', wijzer: wx });
    persoon(ctx, 'farid', 1790, 790, 380, { t, kijk: -1, pose: 'staan', outfit: 'kantoor', uit: 'blij' });
    // weegschaal klein als 'vaste criteria' (alleen aan het begin)
    laag(ctx, (1 - ramp(t, tT, 0.5)), () => { tag(ctx, 'wegen met vaste criteria', 860, 380, C.goud, q.on('weeg', 1), 'center', 34); weegschaal(ctx, 860, 480, Math.sin(t * 1.2) * 0.4, [], [], 1, { arm: 240 }); });
    // de kaart zakt aan het eind naar het punt 1968
    const kr = ramp(t, tD, 1.0), s = lerp(1, 0.32, kr), kx = lerp(260, TL.p[1968] - 40, kr), ky = lerp(250, 640, kr);
    ctx.save(); ctx.translate(kx, ky); ctx.scale(s, s); criteriaKaart(ctx, 0, 0, 1100, ramp(t, tW - 0.3, 0.5), { gezond: q.on('gezonde', 1) * (1 - kr), meta: '1968 · VOOR DE WHO' }); ctx.restore();
    naamBij(ctx, 'een arts en een chemicus', '', 260 + 36, 640, ramp(t, tW + 0.5, 0.4) * (1 - ramp(t, tD - 0.6, 0.4)), 'left', C.text2); },

  // ---------- H2 Januari en juli 2014 ----------
  s08(ctx, t, q) { const tNu = q.at('krijgt', 1) - 0.2, tLab = q.at('lab', 1), tGes = q.at('gesprek', 1), keuken = t >= tNu && t < tLab - 0.25;
    if (keuken) { henkVlak(ctx); const rH = persoon(ctx, 'henk', 1260, 820, 430, { t, kijk: 1, pose: 'zit', tafel: 548, zitHoogte: 150, uit: 'neutraal' });
      persoon(ctx, 'yasmin', 940, 800, 430, { t, kijk: 1, pose: 'vasthouden', uit: 'praat', hold: (c, x, y) => folder(c, x + 10, y - 40, 70, 1, 0.08) });
      buisje(ctx, (rH.handR || { x: 1400 }).x, (rH.handR || { y: 535 }).y - 30, 0.8, 1, 0.1); envelop(ctx, 1560, 535, 120, 1, 0.05, { open: true });
      donkerPil(ctx, 'u beslist zelf', 950, 240, C.groen, ramp(t, tNu + 1.2, 0.5)); donkerPil(ctx, '2019: iedereen van 55 t/m 75', 1440, 200, C.goud, ramp(t, q.at('iedereen', 1), 0.5));
      laag(ctx, q.on('elke', 1), () => donkerPil(ctx, 'elke twee jaar een test thuis', 1440, 290, C.grain, 1, 24));
      tijdlijn(ctx, 1, { zicht: { 1968: 1, 2009: 1, j14: 1, 2019: ramp(t, q.at('iedereen', 1), 0.4), 2026: 1 }, hl: 'j14', band: true }); return; }
    bg(ctx, 'schema');
    if (t < tNu) { // het advies en de start
      const A = q.on('adviseerde', 1, 0.5), S = q.on('januari', 1, 0.5);
      vak(ctx, 180, 280, 760, 220, 'Gezondheidsraad', 'ADVIES: BEGINNEN, MET EEN ONTLASTINGSTEST', A, C.line); buisje(ctx, 560, 640, 0.9, q.on('ontlastingstest', 1));
      laag(ctx, S, () => { vak(ctx, 1000, 280, 620, 220, 'start', 'STAP VOOR STAP', 1, C.goud); stempel(ctx, 1310, 560, 'jan 2014', C.goud, 1, -0.06); });
      tijdlijn(ctx, 1, { zicht: { 1968: 1, 2026: 1, 2009: ramp(t, 0.1, 0.4), j14: S }, hl: S > 0.5 ? 'j14' : '2009' }); return; }
    // in het lab
    const tAf = q.at('afkapwaarde', 1), tOn = q.at('ongunstig', 1), tV = q.at('ongeveer', 1), C2 = t >= tGes - 0.3;
    const z = { 1968: 1, 2009: 1, j14: 1, 2019: 1, 2026: 1 };
    if (!C2) { const lab = ramp(t, tLab - 0.25, 0.4); buisje(ctx, 200, 470, 1.6, lab, 0); metaA(ctx, 'LAB', 200, 330, lab, C.grain, 'center', 22);
      const niv = 0.06 + 0.16 * ramp(t, q.at('bloed', 1), 1.0) + 0.38 * ramp(t, tOn - 0.3, 1.0);
      bloedBalk(ctx, 380, 380, 1200, niv, M0, ramp(t, q.at('bloed', 1) - 0.3, 0.4), { afkapA: ramp(t, tAf, 0.4) });
      metaA(ctx, 'BLOED IN DE ONTLASTING · NIET TE ZIEN', 380 + 1200 * M0 + 120, 350, q.on('bloed', 1), C.text2, 'left', 22);
      naamBij(ctx, 'afkapwaarde', '', 380 + 1200 * M0, 330, ramp(t, tAf, 0.4), 'center', C.goud);
      laag(ctx, q.on('poliep', 1) * (1 - ramp(t, tAf, 0.4)), () => { ctx.save(); ctx.translate(1180, 640); circ(ctx, 0, 0, 70, rgba(C.oker, 0.85), _mixHex(C.oker, '#FFFFFF', 0.3), 2); [[-30, 90], [0, 110], [30, 95]].forEach(([dx, dy]) => circ(ctx, dx, dy, 9, C.koraal, null)); ctx.restore(); text(ctx, 'een beetje bloed', 1180, 820 - 30, fTekst(34, 700), C.text, 'center'); });
      const O = ramp(t, tOn, 0.5); laag(ctx, O, () => { envelop(ctx, 1460, 230, 130, 1, -0.05, { band: C.oker }); naamBij(ctx, 'ongunstig', 'MEER BLOED DAN DE AFKAPWAARDE', 1360, 210, 1, 'right', C.oker);
        envelop(ctx, 520, 560, 110, 1, 0.04, { band: C.teal }); naamBij(ctx, 'goed', '', 600, 570, 1, 'left', C.teal); });
      laag(ctx, ramp(t, tV, 0.5), () => { popRaster(ctx, 960, 560, 100, 20, 30, 8, (i) => [7, 23, 48, 66, 91].includes(i) ? C.oker : C.teal, 1); metaText(ctx, '± 5 OP DE 100 DEELNEMERS · 2024: 4,5 %', 960, 800, C.grain, 'left', 20); });
      tijdlijn(ctx, 1, { zicht: z, hl: 'j14' }); return; }
    // gesprek en kijkonderzoek
    const G = ramp(t, tGes - 0.3, 0.4); tag(ctx, 'gesprek', 560, 260, C.text2, G, 'center', 32); pijl(ctx, 680, 248, 820, 248, C.line, q.on('kijkonderzoek', 1), 3, 14); tag(ctx, 'meestal een kijkonderzoek', 1100, 260, C.goud, q.on('kijkonderzoek', 1), 'center', 32);
    darmDoorsnede(ctx, G); scoop(ctx, ramp(t, q.at('slangetje', 1) - 0.2, 2.4), G, t); poliep(ctx, 1240, 0.45, G); metaA(ctx, 'DIKKE DARM · COLOSCOPIE', 200, DARM.y - DARM.h / 2 - 20, G, C.grain, 'left', 20);
    naamBij(ctx, 'camera', '', 600, DARM.y + 60, q.on('camera', 1), 'left', C.text);
    tijdlijn(ctx, 1, { zicht: z, hl: 'j14' }); },

  s09(ctx, t, q) { bg(ctx, 'schema'); metaText(ctx, '100 MENSEN MET EEN KIJKONDERZOEK', 330, 240, C.text2, 'left', 22); const u = ramp(t, 0, 1.2);
    popRaster(ctx, R100.x, R100.y, 100, R100.per, R100.gap, R100.r, () => null, 1, { alpha: (i) => clamp(u * 100 - i * 0.6, 0, 1) });
    vraagteken(ctx, 1710, 600, q.on('darmkanker', 1), 130); tijdlijn(ctx, 1, { zicht: { 1968: 1, 2009: 1, j14: 1, 2019: 1, 2026: 1 }, hl: 'j14' }); },

  s11(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: bij ongeveer vier', 1);
    const K = q.on('vier', 1, 0.4), P = q.on('grote', 1, 0.4), KL = q.on('kleine', 1, 0.4), N = q.on('niets', 1, 0.4), V = q.on('weghaalt', 1, 0.4);
    popRaster(ctx, R100.x, R100.y, 100, R100.per, R100.gap, R100.r, (i) => kleur100(i, K, P, KL, N), 1, { vink: (i) => i >= 4 && i < 29 && V > 0.5 });
    const cy = 730; tag(ctx, '4 kanker', 470, cy, C.koraal, K, 'center', 28); tag(ctx, '25 grote poliep · weg', 840, cy, C.oker, P, 'center', 28); tag(ctx, '33 kleine poliep', 1220, cy, C.oker, KL, 'center', 28); tag(ctx, '38 niets', 1530, cy, C.teal, N, 'center', 28);
    metaA(ctx, 'RIVM-FOLDER 2026 · AFGEROND', 1650, 240, K, C.grain, 'right', 20);
    laag(ctx, q.on('reden', 1, 0.5), () => tag(ctx, 'een reden om te kijken, geen diagnose', 1000, 190, C.goud, 1, 'center', 32));
    filmKaartje(ctx, 1400, 110, 'Screenen: een keuze', q.on('reden', 1), 400); metaA(ctx, 'ZIE OOK · VERLOSKUNDE', 1400, 100, q.on('reden', 1), C.text2, 'left', 18); },

  s12(ctx, t, q) { bg(ctx, 'schema'); const Z = ramp(t, q.at('zeef', 1) - 0.8, 0.8), H = q.on('hoger', 1, 0.5);
    persoon(ctx, 'farid', 230, 800, 380, { t, kijk: 1, pose: 'staan', outfit: 'kantoor', uit: 'neutraal' });
    laag(ctx, 1 - Z, () => { bloedBalk(ctx, 480, 380, 1000, 0.3, M0, 1); naamBij(ctx, 'afkapwaarde', '', 480 + 1000 * M0, 330, 1, 'center', C.goud); });
    zeef(ctx, M0, (i) => ramp(t, q.at('zeef', 1) - 0.2 + i * 0.04, 0.9), Z);
    naamBij(ctx, 'ongunstig', 'BLIJFT IN DE ZEEF', ZEEF.cx, ZEEF.cy - 110, Z, 'center', C.oker);
    afkapSchuif(ctx, 1520, 230, 380, M0, Z); laag(ctx, H, () => { pijl(ctx, 1600, 420, 1600, 290, C.goud, 1, 5, 18); vraagteken(ctx, 1680, 380, 1, 90); });
    tijdlijn(ctx, 1, { zicht: { 1968: 1, 2009: 1, j14: 1, 2019: 1, 2026: 1 }, hl: 'j14' }); },

  s14(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: minder kijkonderzoeken, iets meer gemist', 1);
    const tM = q.at('mazen', 1), m = lerp(M0, M1, ramp(t, tM - 0.5, 1.2)), tF = q.at('minder', 1), tG = q.at('glipt', 1), tJ = q.at('juli', 1);
    const val = (i) => { const s = UITSLAG[i]; if (s <= M0) return 1; if (i === 9) return ramp(t, tG - 0.2, 1.0); return ramp(t, tF + (i % 7) * 0.12, 0.9); };
    zeef(ctx, m, val, 1, { tumor: q.on('kleine', 1, 0.5) });
    const tp = zeefTumorPos(m, val); naamBij(ctx, 'kleine tumor', 'BLOEDT WEINIG', ZEEF.cx + ZEEF.rx + 40, Math.max(ZEEF.bak - 30, Math.min(tp[1] + 10, ZEEF.bak + 70)), q.on('kleine', 1, 0.5), 'left', C.koraal); laag(ctx, q.on('kleine', 1, 0.5), () => lijn(ctx, [[tp[0] + 34, tp[1]], [ZEEF.cx + ZEEF.rx + 30, Math.max(ZEEF.bak - 30, Math.min(tp[1] + 10, ZEEF.bak + 70)) - 12]], C.koraal, 0));
    afkapSchuif(ctx, 1560, 230, 380, m, 1, { waarde: t > tJ ? '47' : '', eenheid: t > tJ ? 'µG HB/G' : '' });
    tag(ctx, 'minder kijkonderzoeken', 1040, 200, C.teal, q.on('kijkonderzoeken', 1) * (1 - q.on('Gevoeliger', 1, 0.3)), 'center', 30);
    tag(ctx, 'gevoeliger ≠ vanzelf beter', 900, 210, C.goud, q.on('Gevoeliger', 1), 'center', 30); laag(ctx, q.on('eerste', 1, 0.5) * (1 - q.on('juli', 1, 0.4)), () => donkerPil(ctx, 'eerste maanden: 10,6 % ongunstig, meer dan verwacht', 900, 210, C.oker, 1, 28));
    tijdlijn(ctx, 1, { zicht: { 1968: 1, 2009: 1, j14: 1, 2019: 1, 2026: 1, l14: ramp(t, tJ, 0.4) }, hl: t > tJ ? 'l14' : 'j14', label: ['l14', 'afkapwaarde omhoog', ramp(t, q.at('omhoog', 1), 0.4), C.goud] }); },

  // ---------- H3 Acht jaar later ----------
  s15(ctx, t, q) { bg(ctx, 'schema'); const sl = ramp(t, 0.1, 1.4); const z = { 1968: 1, 2009: 1, j14: 1, l14: 1, 2019: 1, 2026: 1, 2022: ramp(t, 1.0, 0.4) };
    tijdlijn(ctx, 1, { zicht: z, hl: sl > 0.9 ? '2022' : null, wijzer: lerp(TL.p[2026], TL.p[2022], sl) });
    persoon(ctx, 'farid', 1800, 790, 360, { t, kijk: -1, pose: 'staan', outfit: 'kantoor', uit: 'neutraal' });
    stadiumBalken(ctx, 160, 240, Math.max(0.35, q.on('vroeg', 1, 0.5)), ramp(t, q.at('stadium', 1), 1.0));
    const S = q.on('sterfte', 1, 0.5); sterfteGrafiek(ctx, S, ramp(t, q.at('zevenennegentig', 1), 2.0));
    laag(ctx, q.on('bewezen', 1, 0.5), () => { envelop(ctx, 640, 640, 130, 1, -0.05); vraagteken(ctx, 860, 670, 1, 100); pijl(ctx, 920, 640, STERF.x + STERF.w / 2 - 10, STERF.y + STERF.h - 84 / 100 * STERF.h + 14, C.goud, 1, 4, 16); naamBij(ctx, 'door het onderzoek?', '', 640, 740, 1, 'center', C.goud); }); },

  s17(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: nog niet', 1); const tS = q.at('Sterker', 1), F2 = ramp(t, tS - 0.3, 0.6);
    const z = { 1968: 1, 2009: 1, j14: 1, l14: 1, 2019: 1, 2022: 1, 2026: 1 };
    laag(ctx, 1 - F2, () => { const [p1, p2] = sterfteGrafiek(ctx, 1, 1, { g: { x: 1060, y: 270, w: 600, h: 280 } }); const mx = (p1[0] + p2[0]) / 2, my = (p1[1] + p2[1]) / 2;
      const B = ramp(t, q.at('behandeling', 1) - 0.4, 0.4), O = q.on('oorzaak', 1, 0.5);
      laag(ctx, B, () => { pijl(ctx, 560, 240, mx - 20, my - 16, C.text2, 1, 4, 16); tag(ctx, 'betere behandeling?', 420, 250, C.text2, 1, 'center', 30); });
      laag(ctx, O, () => { pijl(ctx, 560, 440, mx - 30, my + 10, C.goud, 1, 4, 16); tag(ctx, 'bevolkingsonderzoek?', 400, 450, C.goud, 1, 'center', 30); });
      kaartje(ctx, 160, 540, 820, 190, 'GEZONDHEIDSRAAD · 2022', [['nog te vroeg om aan te tonen', 1], ['wel duidelijke aanwijzingen', q.on('aanwijzingen', 1)]], q.on('Gezondheidsraad', 1, 0.5), C.goud); });
    laag(ctx, F2, () => { metaText(ctx, 'GELOTE PROEVEN · LOTING WIE EEN UITNODIGING KRIJGT · ANDER SOORT TEST (GUAJAK)', 160, 220, C.grain, 'left', 20);
      muntje(ctx, 960, 400, 46, t, ramp(t, q.at('geloot', 1) - 0.3, 0.4)); proefGroep(ctx, 300, 380, ramp(t, q.at('uitnodiging', 1), 0.5), true, t); proefGroep(ctx, 1300, 380, ramp(t, q.at('uitnodiging', 1), 0.5), false, t);
      naamBij(ctx, 'met uitnodiging', '', 420, 290, ramp(t, q.at('uitnodiging', 1), 0.5), 'center', C.teal); naamBij(ctx, 'zonder', '', 1420, 290, ramp(t, q.at('uitnodiging', 1), 0.5), 'center', C.text2);
      const D = q.on('vijftien', 1, 0.8); laag(ctx, q.on('daalde', 1, 0.5), () => { metaText(ctx, 'STERFTE AAN DARMKANKER', 960, 655, C.text2, 'center', 20);
        roundRect(ctx, 280, 670, 300 * lerp(1, 0.85, q.on('daalde', 1, 1.2)), 44, 10); shape(ctx, rgba(C.koraal, 0.7), C.koraal, 2); roundRect(ctx, 1280, 670, 300, 44, 10); shape(ctx, rgba(C.koraal, 0.7), C.koraal, 2); });
      laag(ctx, D, () => { tag(ctx, '± 15 % minder', 430, 770, C.groen, 1, 'center', 28); metaText(ctx, 'COCHRANE 2007 · ALLE UITGENODIGDEN', 1640, 770, C.grain, 'right', 18); }); });
    tijdlijn(ctx, 1 - F2 * 0.0, { zicht: z, hl: '2022' }); },

  s18(ctx, t, q) { bg(ctx, 'schema'); const z = { 1968: 1, 2009: 1, j14: 1, l14: 1, 2019: 1, 2022: 1, 2026: 1 };
    persoon(ctx, 'farid', 160, 800, 360, { t, kijk: 1, pose: 'staan', outfit: 'kantoor', uit: 'neutraal' });
    const n = [q.on('mist', 1), q.on('ernstigs', 1), q.on('onschuldige', 1), q.on('mis', 2)], nad = n.reduce((s, v) => s + v, 0), W = q.on('winst', 1, 1.2);
    const tilt = -1 + nad * 0.2 - W * 0.45;
    weegschaal(ctx, 960, 200, tilt, [['vaker vroeg gevonden', 1], ['poliepen weg', 1]], [['gemiste kanker', n[0]], ['kijkonderzoek zonder vondst', n[1]], ['onschuldige poliep weg', n[2]], ['soms een complicatie', n[3]]], 1);
    const an = tilt * 0.12; naamBij(ctx, 'voordelen', '', 960 - Math.cos(an) * 440, 200 - Math.sin(an) * 440 - 30, 1, 'center', C.groen); naamBij(ctx, 'nadelen', '', 960 + Math.cos(an) * 440, 200 + Math.sin(an) * 440 - 30, q.on('nadelen', 1), 'center', C.oker);
    kaartje(ctx, 1180, 630, 640, 150, 'KOSTEN · RIVM 2024 · ERASMUS MC 2025', [['± € 20 per deelnemer (zonder kijkonderzoek)', q.on('twintig', 1), 28], ['op termijn besparend', q.on('bespaart', 1), 30]], q.on('kost', 1, 0.5), C.goud);
        tag(ctx, 'de winst weegt op tegen de nadelen', 960, 140, C.groen, W, 'center', 30);
    tijdlijn(ctx, 1, { zicht: z, hl: '2022' }); },

  // ---------- H4 Wie beslist, en waarom geen scan? ----------
  s19(ctx, t, q) { bg(ctx, 'schema'); const sl = ramp(t, 0.1, 1.4), z = { 1968: 1, 2009: 1, j14: 1, l14: 1, 2019: 1, 2022: 1, 2026: 1 };
    tijdlijn(ctx, 1, { zicht: z, hl: sl > 0.9 ? '1968' : null, wijzer: lerp(TL.p[2022], TL.p[1968], sl) });
    const kv = 1 - ramp(t, q.at('belangrijk', 1) - 0.3, 0.5); laag(ctx, kv, () => criteriaKaart(ctx, 410, 250, 1100, 1, { meta: '1968 · VOOR DE WHO' })); metaA(ctx, 'WILSON & JUNGNER · 1968 · VIER VAN DE TIEN CRITERIA', 140, 200, 1 - kv, C.grain, 'left', 20);
    const cue = ['belangrijk', 'stadium', 'betrouwbare', 'behandeling'];
    KRIT.forEach((s2, i) => { const a = q.on(cue[i], 1, 0.4); const y = 250 + i * 110; laag(ctx, a, () => { roundRect(ctx, 140, y, 760, 90, 14); shape(ctx, rgba(LOKAAL, 0.9), rgba(C.goud, 0.6), 2); text(ctx, s2, 170, y + 58, fTekst(36, 700), C.text, 'left'); }); });
    const D = q.on('haalt', 1, 0.4), M = q.on('MRI', 1, 0.3);
    laag(ctx, Math.max(D, M), () => { text(ctx, 'darmkanker', 1050, 230, fTekst(32, 800), C.text, 'center'); }); laag(ctx, M, () => text(ctx, 'hersenscan', 1260, 230, fTekst(32, 800), C.text, 'center'));
    KRIT.forEach((s2, i) => { const y = 295 + i * 110; vink_(ctx, 1050, y, 22, clamp(D * 4 - i, 0, 1), C.groen); vraagteken(ctx, 1260, y + 22, clamp(M * 4 - i, 0, 1) * (i === 0 ? 0 : 1), 60); });
    laag(ctx, M, () => { breinStippen(ctx, 1600, 440, 0.5, 1, { t, stip: ramp(t, q.at('meer', 1), 1.0) }); naamBij(ctx, 'MRI-scan van de hersenen', 'ZIET VEEL MEER', 1600, 620, 1, 'center', C.text); }); },

  s21(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: veel vondsten, onbekend of ze kwaad kunnen', 1);
    const z = { 1968: 1, 2009: 1, j14: 1, l14: 1, 2019: 1, 2022: 1, 2026: 1, 2015: ramp(t, q.at('tweeduizendvijftien', 1), 0.4) };
    breinStippen(ctx, 520, 470, 0.85, 1, { t, stip: 1, vraag: q.on('kwaad', 1, 0.5) }); tag(ctx, 'MRI · geen röntgenstraling', 520, 250, C.teal, q.on('röntgenstraling', 1), 'center', 30);
    naamBij(ctx, 'kan het kwaad?', 'ONBEKEND', 520, 690, q.on('kwaad', 1, 0.5), 'center', C.goud);
    kaartje(ctx, 1040, 230, 780, 330, 'ROTTERDAM-STUDIE · 2000 MENSEN (GEM. 63 JAAR)', [['± 2 % verwijd bloedvat', ramp(t, q.at('verwijd', 1) - 0.2, 0.4)], ['± 2 % goedaardig gezwel', q.on('goedaardig', 1, 0.4)], ['± 7 % stil herseninfarct', q.on('goedaardig', 1, 0.4)], ['VERNOOIJ E.A., NEJM 2007', q.on('gezwel', 1), 20]], q.on('Rotterdams', 1, 0.5), C.goud);
    laag(ctx, q.on('onrust', 1, 0.5), () => { tag(ctx, 'onrust', 1180, 640, C.oker, 1, 'center', 30); tag(ctx, 'extra onderzoek', 1420, 640, C.oker, q.on('extra', 1), 'center', 30); tag(ctx, 'bewezen winst?', 1680, 640, C.text2, q.on('winst', 1), 'center', 30); });
    tijdlijn(ctx, 1, { zicht: z, hl: z[2015] > 0.5 ? '2015' : '1968', label: ['2015', 'Gezondheidsraad: nut niet aangetoond', ramp(t, q.at('concludeerde', 1), 0.5), C.goud] }); },

  s22(ctx, t, q) { bg(ctx, 'schema'); const a = ramp(t, 0, 0.5);
    [['Gezondheidsraad', 260, 300], ['minister', 1100, 300], ['RIVM', 260, 560], ['Bevolkingsonderzoek Nederland', 1100, 560]].forEach(([s2, x, y], i) => vak(ctx, x, y, 560, 160, s2, '', a * ramp(t, i * 0.3, 0.4), C.line, { px: s2.length > 20 ? 32 : 40 }));
    vraagteken(ctx, 960, 560, q.on('beslist', 1, 0.4), 150); tijdlijn(ctx, 1, { zicht: { 1968: 1, 2009: 1, j14: 1, l14: 1, 2015: 1, 2019: 1, 2022: 1, 2026: 1 } }); },

  s24(ctx, t, q) { const tM = q.at('Maar', 1), K = t >= tM - 0.2;
    if (K) { henkVlak(ctx); persoon(ctx, 'henk', 1260, 820, 430, { t, kijk: 1, pose: 'zit', tafel: 548, zitHoogte: 150, uit: q.on('zelf', 1) > 0.5 ? 'blij' : 'denkt' });
      envelop(ctx, 1520, 530, 130, 1, 0.04); buisje(ctx, 1420, 535, 0.9, 1, 0); pen(ctx, 1660, 500, 90, 1, -0.5); donkerPil(ctx, 'u beslist zelf', 960, 330, C.groen, ramp(t, q.at('beslist', 2) - 0.2, 0.3), 34);
      tijdlijn(ctx, 1, { zicht: { 1968: 1, 2009: 1, j14: 1, l14: 1, 2015: 1, 2019: 1, 2022: 1, 2026: 1 }, hl: '2026', band: true }); return; }
    bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: de minister, na advies', 1);
    const G = Math.max(0.35, q.on('Gezondheidsraad', 1, 0.4)), Mi = ramp(t, q.at('minister', 1) - 0.3, 0.4), B = q.on('Bevolkingsonderzoek', 1, 0.4), R = q.on('RIVM', 1, 0.4);
    vak(ctx, 160, 300, 420, 150, 'Gezondheidsraad', 'WEEGT HET BEWIJS', G, C.line); pijl(ctx, 590, 375, 720, 375, C.line, q.on('advies', 1), 3, 16); metaA(ctx, 'ADVIES', 655, 355, q.on('advies', 1), C.grain, 'center', 18);
    vak(ctx, 730, 300, 420, 150, 'minister VWS', 'BESLIST', Mi, C.goud, { dik: q.on('beslist', 1) > 0.5 }); pijl(ctx, 1160, 375, 1290, 375, C.line, q.on('voert', 1), 3, 16); metaA(ctx, 'BESLUIT', 1225, 355, q.on('voert', 1), C.grain, 'center', 18);
    vak(ctx, 1300, 300, 480, 150, 'Bevolkingsonderzoek NL', 'VOERT UIT', B, C.line, { px: 32 });
    vak(ctx, 1300, 540, 480, 130, 'RIVM', 'REGIE', R, C.line); pijl(ctx, 1540, 535, 1540, 460, C.line, R, 3, 14);
    tijdlijn(ctx, 1, { zicht: { 1968: 1, 2009: 1, j14: 1, l14: 1, 2015: 1, 2019: 1, 2022: 1, 2026: 1 } }); },

  // ---------- Recap ----------
  s25(ctx, t, q) { henkVlak(ctx); const dicht = ramp(t, 0.3, 1.4);
    persoon(ctx, 'henk', 1260, 820, 430, { t, kijk: 1, pose: 'zit', tafel: 548, zitHoogte: 150, uit: 'blij' });
    envelop(ctx, 1520, 530, 130, 1, 0.04, { open: dicht < 0.95 }); buisje(ctx, lerp(1420, 1520, ease(dicht)), lerp(535, 500, Math.sin(dicht * Math.PI)) , 0.9, 1 - ramp(t, 1.4, 0.3), 0);
    const kaarten = [['vroeg vinden, soms voorkómen', 'poliep', (x, y) => { roundRect(ctx, x - 150, y - 6, 300, 40, 18); shape(ctx, '#3A2E3A', '#A88A90', 1.5); circ(ctx, x - 40, y + 14, 14, rgba(C.oker, 0.9), null); kruis(ctx, x - 40, y + 14, 12, 1, C.groen); }],
      ['hersenscan: onbekend of het kwaad kan', 'hersenscan', (x, y) => { brein(ctx, x, y + 30, 0.2, 1, { t }); text(ctx, '?', x + 90, y + 10, fTekst(40, 800), C.goud, 'center'); }],
      ['steeds opnieuw wegen', 'wegen', (x, y) => { ctx.save(); ctx.translate(x, y - 34); ctx.scale(0.2, 0.2); weegschaal(ctx, 0, 0, Math.sin(t) * 0.4, [], [], 1); ctx.restore(); }]];
    kaarten.forEach(([kop, cue, teken], i) => { ctx.save(); recapKaart(ctx, 90, 120 + i * 205, 880, 185, kop, q.on(cue, i === 1 ? 2 : 1), (x, y) => { ctx.save(); ctx.translate(x, y); ctx.scale(1, 1); ctx.translate(-x, -y); teken(x, y); ctx.restore(); }); ctx.restore(); });
    const keys = ['1968', '2009', 'j14', 'l14', '2015', '2019', '2022', '2026'], s19 = q.at('negentienachtenzestig', 1), z = {}; keys.forEach((k, i) => z[k] = t < s19 ? 1 : 0.35 + 0.65 * ramp(t, s19 + i * 0.35, 0.3));
    tijdlijn(ctx, 1, { zicht: z, hl: t > s19 + 2.5 ? '2026' : null, band: true }); },

  s26(ctx, t, q) { bg(ctx, 'schema'); roundRect(ctx, 100, 120, 640, 100, 16); shape(ctx, rgba('#0D1420', 0.88), null); regel(ctx, 'Waar leer je dit?', 130, 190, 1, C.text, 56, 'left', 700); metaText(ctx, '2026', 700, 186, C.grain, 'right', 22);
    const rij = [['wo', 'Biomedische Wetenschappen → master', 'BIOMEDICAL SCIENCES, RICHTING EPIDEMIOLOGY (ENGELS) · NIJMEGEN', 'Nijmegen'], ['wo', 'Gezondheidswetenschappen', 'BIJVOORBEELD IN ENSCHEDE', 'Gezondheidswetenschappen'], ['werk', 'epidemioloog, onderzoeker, adviseur', 'REKENT DOOR OF EEN BEVOLKINGSONDERZOEK WERKT', 'Daarna']];
    rij.forEach(([n, o, m, cue], i) => { const a = q.on(cue, 1, 0.5); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const y = 260 + i * 170;
      roundRect(ctx, 100, y, 1200, 145, 18); shape(ctx, rgba('#0D1420', 0.9), i < 2 ? C.groen : C.goud, 2); text(ctx, n, 140, y + 88, fTitel(46), i < 2 ? C.groen : C.goud); text(ctx, o, 300, y + 68, fTekst(42, 700), C.text); metaText(ctx, m, 300, y + 112, C.grain, 'left', 18); ctx.restore(); });
    persoon(ctx, 'yasmin', 1500, 820, 420, { t, kijk: 1, uit: 'blij' }); persoon(ctx, 'farid', 1720, 820, 430, { t, kijk: -1, uit: q.on('adviseur', 1) > 0.5 ? 'lacht' : 'blij', pose: 'staan', outfit: 'kantoor' }); }
});
