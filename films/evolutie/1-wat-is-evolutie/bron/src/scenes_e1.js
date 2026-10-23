// Evolutie v2 · film 1 Wat is evolutie eigenlijk? — animatie per alinea (23 okt 2026)
// Keyframes uit sb1.js zijn het eindbeeld; alles bouwt op in de maat van de stem (q.on).

const E1_SC = (i) => 0.9 * (0.92 + 0.16 * hash(i * 3.3)); // zelfde schaal als lhbGroep
// vlieg binnen, land, klap dicht en loop het laatste stukje naar de plek
function e1land(ctx, i, van, t0, dur, t, o = {}) {
  const [x, y, vorm, st, rot] = ORANJE_PLEK[i], s = E1_SC(i), lx = x + (o.dx == null ? -70 : o.dx), ly = y + (o.dy == null ? 14 : o.dy);
  const loopRot = e1rot(x - lx, y - ly);
  if (t < t0) return;
  if (t < t0 + dur + 0.8) { e1vlieg(ctx, van[0], van[1], lx, ly, t0, dur, t, s, { vorm, stippen: st, rotEind: loopRot, boog: o.boog }); return; }
  e1loop(ctx, lx, ly, x, y, t0 + dur + 0.8, t, s, { vorm, stippen: st, rotStart: loopRot, rotEind: rot, v: 26 });
}
function e1plek(ctx, i, t, o = {}) { const [x, y, vorm, st, rot] = ORANJE_PLEK[i]; lhb(ctx, x + (o.dx || 0), y + (o.dy || 0), E1_SC(i), { vorm, stippen: st, rot, a: o.a == null ? 1 : o.a }); }
// larve die van (x1,y1) naar (x2,y2) kruipt (kop vooruit), vanaf t0
function e1kruip(ctx, x1, y1, x2, y2, t0, t, s = 1, a = 1, v = 150) { const tt = t - t0; if (tt < 0 || a <= 0.01) return; const L = Math.hypot(x2 - x1, y2 - y1) || 1, u = clamp(tt * v / L, 0, 1);
  ctx.save(); ctx.translate(lerp(x1, x2, u), lerp(y1, y2, u)); ctx.rotate(Math.atan2(y2 - y1, x2 - x1) + Math.PI / 2); larve(ctx, 0, 0, s, a * ease(tt / 0.3), u < 1 ? tt : 0); ctx.restore(); }
const E1_TUIN = [[690, 480, 0.4], [920, 610, -0.8], [1060, 520, 1.2], [1400, 640, 0.2], [1660, 720, -0.5], [330, 700, 0.9], [560, 560, 2.2]];
function e1tuin(ctx) { macroNacht(ctx); huisGevel(ctx, 640, 760, 520, 330);
  for (const [x, y, s] of [[300, 760, 1], [1420, 760, 1.2], [1650, 780, 0.9]]) { ctx.beginPath(); ctx.moveTo(x - 70 * s, y); ctx.lineTo(x, y - 230 * s); ctx.lineTo(x + 70 * s, y); ctx.closePath(); ctx.fillStyle = '#2A4436'; ctx.fill(); } }

Object.assign(SCENES, {
  // ---- titelkaart: alleen het beeld rechts; knikkers vallen in de pot, beestjes kruipen ----
  title(ctx, t) {
    const L = potKleuren(64, 0.15, 4), n = Math.floor(clamp((t - 0.3) / 0.12 + 50, 50, 64));
    potK(ctx, 1500, 820, 1.25, L.slice(0, n), { seed: 4 });
    for (let k = 50; k < 64; k++) { const t0 = 0.3 + (k - 50) * 0.12 - 0.6, u = clamp((t - t0) / 0.6, 0, 1); if (u <= 0 || u >= 1) continue; const [sx, sy] = potSlot(1500, 820, 1.25, k, 4); knikker(ctx, lerp(1500 + (sx - 1500) * 0.4, sx, u), lerp(300, sy, u * u), 16, L[k]); }
    e1loop(ctx, 1080, 900, 1170, 820, 0.4, t, 0.9, { vorm: 'succinea', stippen: 14, rotEind: -0.3 });
    lhb(ctx, 1260, 660, 0.8, { vorm: 'spectabilis', rot: 0.4 + Math.sin(t * 0.8) * 0.05 });
    e1loop(ctx, 1900, 900, 1800, 860, 0.9, t, 0.8, { vorm: 'conspicua', rotEind: -0.2 });
  },

  // ===================== Opening =====================
  s01(ctx, t, q) {
    f1Bg(ctx);
    const aY = q.on('Yasmin', 1, 0.3), aB = q.on('Bilal', 1, 0.3), lach = q.on('lach', 1, 0.3) > 0.5;
    const A = persoon(ctx, 'yasmin', 760, 880, 640, { uit: lach ? 'lacht' : 'blij', a: aY, t });
    const B = persoon(ctx, 'bilal', 1160, 880, 640, { uit: 'lacht', kijk: -1, a: aB, t });
    naamMeta(ctx, 'Yasmin', 'zus · 16', 520, 420, aY, q.on('zus', 1, 0.4), 'right');
    naamMeta(ctx, 'Bilal', 'broer · 17', 1400, 400, aB, q.on('broer', 1, 0.4), 'left');
    for (const P of [A, B]) { gezichtRing(ctx, P.hoofd, 'ogen', q.on('ogen', 1, 0.4)); gezichtRing(ctx, P.hoofd, 'neus', q.on('neus', 1, 0.4)); gezichtRing(ctx, P.hoofd, 'mond', q.on('lach', 1, 0.4)); }
  },
  s02(ctx, t, q) {
    f1Bg(ctx);
    const toch = q.on('Toch', 1, 0.5), twin = q.on('eeneiige', 1, 0.3) * (1 - q.on('Waarom', 1, 0.5));
    const sx = -140 * ease(twin);
    const A = persoon(ctx, 'yasmin', 760 + sx, 880, 640, { uit: toch > 0.5 ? 'denkt' : 'lacht', t });
    const B = persoon(ctx, 'bilal', 1160 + sx, 880, 640, { uit: toch > 0.5 ? 'verbaasd' : 'lacht', kijk: -1, t });
    for (const P of [A, B]) { const r = 1 - toch; gezichtRing(ctx, P.hoofd, 'ogen', r); gezichtRing(ctx, P.hoofd, 'neus', r); gezichtRing(ctx, P.hoofd, 'mond', r); }
    // even de eeneiige tweeling (Daan en Thijs, vaste rol) als uitzondering
    if (twin > 0.01) { persoon(ctx, 'daan', 1560, 880, 420, { uit: 'blij', a: twin, t }); persoon(ctx, 'thijs', 1740, 880, 420, { uit: 'blij', kijk: -1, a: twin, t }); naamBij(ctx, 'eeneiige tweeling', null, 1650, 400, twin, 'center'); }
    const v = q.on('Waarom', 1, 0.6); if (v > 0.01) vraagteken(ctx, 960, 420 + Math.sin(t * 1.6) * 6, v, 160);
  },

  // ===================== H1 Variatie =====================
  s04(ctx, t, q) {
    const k = ease(t / 8), Z = lerp(1.06, 1, k); // camera glijdt langs het kozijn
    ctx.save(); ctx.translate(960, 540); ctx.scale(Z, Z); ctx.translate(-960 + lerp(-60, 0, k), -540);
    kozijnHoek(ctx);
    const tL = q.at('landen');
    [0, 3, 1, 4, 2].forEach((i, j) => e1land(ctx, i, [ORANJE_PLEK[i][0] + 260 - j * 40, -120], tL - 0.4 + j * 0.6, 1.3, t));
    e1land(ctx, 6, [1100, -120], q.at('overwinteren') - 0.4, 1.3, t, { dx: -40, dy: 40, boog: 80 });
    ctx.restore();
    roundRect(ctx, 64, 846, 560, 50, 8); ctx.fillStyle = 'rgba(18,26,38,0.85)'; ctx.fill(); evoSchaal(ctx, 'oktober · ware grootte ±7 mm');
  },
  s05(ctx, t, q) {
    const Z = lerp(1, 1.15, ease((t - q.at('Aziatische')) / 3.6));
    ctx.save(); ctx.translate(1500, 560); ctx.scale(Z, Z); ctx.translate(-1500, -560);
    kozijnHoek(ctx);
    for (const i of [0, 1, 3, 4, 6]) e1plek(ctx, i, t);
    e1loop(ctx, 1700, 740, 1745, 712, 1.6, t, E1_SC(2), { vorm: 'succinea', stippen: 6, rotStart: 1.2, rotEind: 1.2 });
    e1vlieg(ctx, 2000, -100, 1620, 300, 0.3, 1.5, t, E1_SC(5), { vorm: 'conspicua', rotEind: 0.15 });
    [0, 1, 5].forEach((i, j) => { const a = ease((t - q.at('allemaal') - j * 0.35) / 0.4); if (a > 0.01) { ctx.save(); ctx.globalAlpha = a; const [x, y] = ORANJE_PLEK[i]; goudRing(ctx, x, y - 4, 82); ctx.restore(); } });
    ctx.restore();
    naamMeta(ctx, 'Aziatisch lieveheersbeestje', 'Harmonia axyridis', 80, 160, q.on('Aziatische', 1, 0.5), q.on('soort', 1, 0.5), 'left');
  },
  s06(ctx, t, q) {
    f1Bg(ctx); const base = 700;
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; const lu = ease(t / 0.8); ctx.beginPath(); ctx.moveTo(960 - 660 * lu, base); ctx.lineTo(960 + 660 * lu, base); ctx.stroke();
    const d = [[480, 'succinea', 81, 'oranje', 'zwarte stippen', q.at('oranje'), q.at('stippen')], [960, 'spectabilis', 15, 'zwart', 'vier rode vlekken', q.at('zwart', 2), q.at('vier')], [1440, 'conspicua', 4, 'zwart', 'twee rode vlekken', q.at('zwart', 2) + 0.6, q.at('twee')]];
    const tb = q.at('telling');
    d.forEach(([x, v, pc, n, m, t0, tm], i) => {
      const a = ease((t - t0) / 0.3); if (a <= 0.01) return;
      e1loop(ctx, x - 20, base - 120, x - 20, base - 120, t0, t, 1.35, { vorm: v, stippen: 14, rotStart: 0.5, rotEind: 0, a });
      naamMeta(ctx, n, m, x + 60, base + 60, a, ease((t - tm) / 0.4), 'center');
      const g = ease((t - tb - 0.3 - i * 0.5) / 1.4); if (g > 0.005) { const bh = pc * 4.4 * g; roundRect(ctx, x + 110, base - bh, 70, Math.max(bh, 1), 8); shape(ctx, rgba(C.oker, 0.75), _lt(C.oker, 0.3), 1.5); text(ctx, Math.round(pc * g) + '%', x + 145, base - bh - 18, fTekst(40, 700), C.text, 'center'); }
    });
    const aS = q.on('Brabant', 1, 0.6); if (aS > 0.01) { ctx.save(); ctx.globalAlpha = aS; evoSchaal(ctx, 'telling in Brabant · 7160 beestjes · 2003–2015'); ctx.restore(); }
  },
  s07(ctx, t, q) {
    f1Bg(ctx);
    const m = q.on('erfelijk', 1, 1.2); // het zwarte beestje schuift opzij en wordt groot, de andere twee gaan weg
    if (m < 0.99) { lhb(ctx, 460, 580, 1.35, { vorm: 'succinea', stippen: 14, a: 1 - m }); lhb(ctx, 1420, 580, 1.35, { vorm: 'conspicua', a: 1 - m }); }
    lhb(ctx, lerp(940, 520, m), lerp(580, 560, m), lerp(1.35, 2.2, m), { vorm: 'spectabilis', rot: Math.sin(t * 0.7) * 0.03 });
    naamBij(ctx, 'variatie', null, 960, 300, q.on('variatie', 1, 0.5) * (1 - m), 'center', C.goud);
    const ac = q.on('kleurvorm', 1, 0.6), kl = q.on('verschillende', 1, 0.8);
    if (ac > 0.01) chromosoomPaar(ctx, 1160, 470 + (1 - ac) * 40, 420, { a: ac, allelen: [e1hex('#A392D6', EVO.a1, kl), e1hex('#A392D6', EVO.a2, kl)] });
    const ag = q.on('gen', 1, 0.5); naamBij(ctx, 'gen voor kleurvorm', null, 1240, 340, ag, 'left');
    if (ag > 0.01) { ctx.save(); ctx.globalAlpha = ag; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.strokeRect(1088, 470 - 210 + 420 * 0.32 - 16, 145, 32); ctx.restore(); }
    naamBij(ctx, 'allel', 'variant van een gen', 1240, 430, q.on('allelen', 1, 0.5), 'left', C.goud);
  },
  s08(ctx, t, q) {
    f1Bg(ctx);
    const paren = [[EVO.a1, EVO.a1, 'spectabilis'], [EVO.a1, EVO.a2, 'spectabilis'], [EVO.a2, EVO.a2, 'succinea']];
    const t2 = q.at('twee'), tb = [q.at('dominant') - 0.6, q.at('dominant'), q.at('oranje', 3) - 0.3];
    paren.forEach(([k1, k2, v], i) => { const x = 560 + i * 400, u = ease((t - t2 - i * 0.45) / 0.9); if (u <= 0.01) return;
      chromosoom1(ctx, x - 32 - (1 - u) * 90, 400, 240, k1, { a: u }); chromosoom1(ctx, x + 32 + (1 - u) * 90, 400, 240, k2, { a: u });
      const ab = ease((t - tb[i]) / 0.3); if (ab > 0.01) e1loop(ctx, x, 670, x, 670, tb[i], t, 0.95, { vorm: v, stippen: 12, rotStart: 0.6, rotEind: 0, a: ab }); });
    naamMeta(ctx, 'allel voor zwart', 'dominant', 80, 200, q.on('zwart', 1, 0.5), q.on('dominant', 1, 0.5), 'left', EVO.a1R);
    naamMeta(ctx, 'allel voor oranje', 'recessief', 1840, 200, q.on('oranje', 1, 0.5), q.on('Alleen', 1, 0.5), 'right', EVO.a2R);
    const k1 = q.on('zwart', 1, 0.4), k2 = q.on('oranje', 1, 0.4); if (k1 > 0.01) knikker(ctx, 100, 260, 16, EVO.a1, k1); if (k2 > 0.01) knikker(ctx, 1820, 260, 16, EVO.a2, k2);
    haak(ctx, 1260, 1460, 790, 'alleen zo oranje', C.groen, q.on('oranje', 3, 0.5));
  },
  s09(ctx, t, q) { // vraag-alinea: legsel, twee larven naar kou en warmte; geen vraagkaart
    f1Bg(ctx);
    const ak = q.on('kou', 1, 0.6), aw = q.on('warmte', 1, 0.6);
    if (ak > 0.01) { thermometer(ctx, 360, 720, 360, lerp(0.5, 0.2, ak), C.teal, ak); naamBij(ctx, 'kou', null, 360, 800, ak, 'center'); }
    if (aw > 0.01) { thermometer(ctx, 1160, 720, 360, lerp(0.5, 0.8, aw), C.koraal, aw); naamBij(ctx, 'warmte', null, 1160, 800, aw, 'center'); }
    const uit = Math.floor(ease((t - q.at('legsel')) / 0.8) * 2);
    legsel(ctx, 960, 300, 1, q.on('Twee', 1, 0.6), uit);
    naamBij(ctx, 'één legsel', null, 960, 210, q.on('legsel', 1, 0.5), 'center');
    e1kruip(ctx, 930, 330, 680, 520, q.at('groeit'), t, 1.1); { const ta = q.at('andere'), t1 = ta + 310 / 260; if (t < t1) e1kruip(ctx, 990, 300, 1300, 300, ta, t, 1.1, 1, 260); else e1kruip(ctx, 1300, 300, 1480, 520, t1, t, 1.1, 1, 260); }
  },
  s11(ctx, t, q) { // antwoord: de larven worden beestjes; stippen groeien aan tot 19 en 8
    f1Bg(ctx);
    thermometer(ctx, 360, 720, 360, 0.2, C.teal); thermometer(ctx, 1160, 720, 360, 0.8, C.koraal);
    const v = ease(t / 0.9), gr = ease((t - q.at('meer')) / Math.max(0.5, q.at('negentien') - q.at('meer')));
    if (v < 1) { e1kruip(ctx, 680, 520, 680, 520, -1, t, 1.1, 1 - v); e1kruip(ctx, 1480, 520, 1480, 520, -1, t, 1.1, 1 - v); }
    lhb(ctx, 680, 520, 2.1, { vorm: 'succinea', stippen: Math.round(19 * gr), a: v });
    lhb(ctx, 1480, 520, 2.1, { vorm: 'succinea', stippen: Math.round(8 * gr), a: v });
    naamMeta(ctx, '14 °C', '19 stippen', 360, 800, q.on('veertien', 1, 0.5), q.on('negentien', 1, 0.5), 'center');
    naamMeta(ctx, '28 °C', 'gemiddeld 8 stippen', 1160, 800, q.on('achtentwintig', 1, 0.5), q.on('gemiddeld', 1, 0.5), 'center');
    naamBij(ctx, 'kou', null, 360, 800, 1 - q.on('veertien', 1, 0.3), 'center'); naamBij(ctx, 'warmte', null, 1160, 800, 1 - q.on('achtentwintig', 1, 0.3), 'center');
    const ap = q.on('proef', 1, 0.6); if (ap > 0.01) { ctx.save(); ctx.globalAlpha = ap; evoSchaal(ctx, 'proef · Michie e.a. 2010'); ctx.restore(); }
  },
  s12(ctx, t, q) {
    f1Bg(ctx);
    const m = ease(t / 1.0);
    if (m < 1) { thermometer(ctx, 360, 720, 360, 0.2, C.teal, 1 - m); thermometer(ctx, 1160, 720, 360, 0.8, C.koraal, 1 - m); }
    lhb(ctx, lerp(680, 620, m), lerp(520, 480, m), 2.1, { vorm: 'succinea', stippen: 19 });
    lhb(ctx, lerp(1480, 1000, m), lerp(520, 500, m), lerp(2.1, 1.6, m), { vorm: 'succinea', stippen: 8 });
    naamBij(ctx, 'kou', null, 620, 260, q.on('omgeving', 1, 0.5), 'center'); naamBij(ctx, 'warmte', null, 1000, 300, q.on('omgeving', 1, 0.5), 'center');
    // larve met weinig voedsel kruipt binnen en wordt een kleiner beestje
    const tl = q.at('larve') - 0.4, tk = q.at('kleiner') - 0.3, wk = ease((t - tk) / 0.7);
    if (t > tl && wk < 1) e1kruip(ctx, 1640, 560, 1340, 500, tl, t, 0.95, 1 - wk, 170);
    if (wk > 0.01) lhb(ctx, 1340, 500, 1.2, { vorm: 'succinea', stippen: 8, a: wk });
    naamBij(ctx, 'weinig voedsel', null, 1340, 340, q.on('voedsel', 1, 0.5), 'center');
    haak(ctx, 480, 1460, 720, 'omgeving, niet erfelijk', C.groen, q.on('Zulke', 1, 0.6));
  },

  // ===================== H2 Waar komt variatie vandaan? =====================
  s13(ctx, t, q) {
    f1Bg(ctx);
    const a = q.on('Hoe', 1, 0.6), mu = q.on('mutatie', 1, 1.0);
    chromosoomPaar(ctx, 960, 470 + (1 - a) * 30, 440, { a, nieuw: mu > 0.02 ? [1, e1hex(EVO.a2, '#B9AEDB', mu)] : null });
    naamBij(ctx, 'mutatie', 'nieuw allel', 1060, 420, q.on('mutatie', 1, 0.5), 'left', C.paars);
    const z = q.on('DNA', 1, 0.7), bx = 1012, by = 470 - 220 + 440 * 0.32;
    if (z > 0.01) zoomCircle(ctx, 1480, 680, 150, bx, by, null, z, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(1300, 500, 360, 360); dnaStukje(ctx, 1480, 680, 260, ease((t - q.at('DNA') - 0.6) / 0.8), t); });
    naamBij(ctx, 'hoe dat gaat:', 'zie de DNA-reeks', 860, 420, q.on('reeks', 1, 0.5), 'right', C.text2);
  },
  s14(ctx, t, q) {
    f1Bg(ctx);
    const m = ease(t / 0.9);
    chromosoomPaar(ctx, lerp(960, 1240, m), lerp(470, 450, m), lerp(440, 380, m), { nieuw: [1, _lt(C.paars, 0.6)] });
    if (m < 1) zoomCircle(ctx, 1480, 680, 150, 1012, 391, null, 1 - m, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(1300, 500, 360, 360); dnaStukje(ctx, 1480, 680, 260, 1, t); });
    naamMeta(ctx, 'toevallig', 'niet omdat het nodig is', 1340, 760, q.on('toevallig', 1, 0.5), q.on('nodig', 1, 0.5), 'left', C.paars);
    naamBij(ctx, 'zeldzaam', null, 1340, 690, q.on('zeldzaam', 1, 0.5), 'left', C.paars);
    const ap = q.on('Toch', 1, 0.3);
    persoon(ctx, 'yasmin', 360, 860, 440, { uit: 'denkt', a: ap, t }); persoon(ctx, 'bilal', 640, 860, 440, { uit: 'neutraal', kijk: -1, a: ap, t });
  },
  s15(ctx, t, q) { // vraag-alinea: Yasmin en Bilal, dezelfde ouders, toch andere allelen
    f1Bg(ctx);
    const m = ease(t / 1.0);
    persoon(ctx, 'yasmin', lerp(360, 640, m), lerp(860, 700, m), lerp(440, 500, m), { uit: 'denkt', t });
    persoon(ctx, 'bilal', lerp(640, 1280, m), lerp(860, 700, m), lerp(440, 500, m), { uit: 'neutraal', kijk: -1, t });
    naamBij(ctx, 'dezelfde ouders', null, 960, 160, q.on('ouders', 1, 0.5), 'center', C.goud);
    const r = clamp((t - q.at('allelen')) / 1.0, 0, 1); e1allelRij(ctx, 640 - 157, 790, E1_Y, r); e1allelRij(ctx, 1280 - 157, 790, E1_B, r);
    const v = q.on('denk', 1, 0.5); if (v > 0.01) vraagteken(ctx, 960, 470 + Math.sin(t * 1.6) * 5, v, 140);
  },
  s17(ctx, t, q) {
    f1Bg(ctx);
    const am = q.on('Elke', 1, 0.5), av = q.on('ouder', 1, 0.5), tm = q.at('meiose'), te = q.at('eicel'), tz = q.at('zaadcel');
    chromosoomPaar(ctx, 480, 330, 260, { allelen: [EVO.a1, EVO.a2], a: am }); chromosoomPaar(ctx, 1440, 330, 260, { allelen: [EVO.a2, EVO.a2], a: av });
    naamBij(ctx, 'moeder', null, 480, 520, am, 'center'); naamBij(ctx, 'vader', null, 1440, 520, av, 'center');
    const ag = ease((t - q.at('twee')) / 0.5) * (1 - ease((t - tm) / 0.5)); if (ag > 0.01) { ctx.save(); ctx.globalAlpha = ag; for (const x of [480, 1440]) { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.strokeRect(x - 66, 330 - 130 + 260 * 0.32 - 16, 132, 32); } ctx.restore(); }
    // de twee eicellen ruilen van plek op 'Welke, dat is toeval'
    const sw = ease((t - q.at('Welke')) / 1.2);
    const eiX = [lerp(380, 580, sw), lerp(580, 380, sw)], eiY = [720 - Math.sin(sw * Math.PI) * 60, 720 + Math.sin(sw * Math.PI) * 60];
    const cel = (soort, x0, y0, x, y, kleur, t0) => { const u = ease((t - t0) / 1.0); if (u <= 0.01) return; const cx = lerp(x0, x, u), cy = lerp(y0, y, u);
      if (u < 1) chromosoom1(ctx, cx, cy, lerp(130, soort === 'ei' ? 96 : 44, u), kleur, { breed: lerp(30, soort === 'ei' ? 24 : 16, u), a: 1 - ease((u - 0.7) / 0.3) });
      if (u > 0.5) geslachtscel(ctx, x, y, soort, kleur, 1, ease((u - 0.5) / 0.5)); };
    cel('ei', 448, 330, eiX[0], eiY[0], EVO.a1, te - 0.4); cel('ei', 512, 330, eiX[1], eiY[1], EVO.a2, te - 0.1);
    cel('zaad', 1408, 330, 1400, 700, EVO.a2, tz - 0.3); cel('zaad', 1472, 330, 1560, 790, EVO.a2, tz);
    const ap = q.on('meiose', 1, 0.6); pijl(ctx, 450, 550, 400, 620, C.line, ap, 3); pijl(ctx, 510, 550, 560, 620, C.line, ap, 3); pijl(ctx, 1420, 550, 1400, 650, C.line, ap, 3); pijl(ctx, 1460, 550, 1540, 740, C.line, ap, 3);
    naamMeta(ctx, 'meiose', 'één van de twee, door toeval', 960, 400, q.on('meiose', 1, 0.5), q.on('toeval', 1, 0.5), 'center', C.goud);
    const ae = q.on('eicel', 1, 0.5); if (ae > 0.01) metaText(ctx, 'geslachtscellen', 960, 720, rgba(C.text2, ae), 'center', 26);
    const dz = q.on('duizenden', 1, 0.8); if (dz > 0.01) metaText(ctx, '× duizenden genen', 960, 780, rgba(C.goud, dz), 'center', 26);
  },
  s18(ctx, t, q) {
    f1Bg(ctx);
    naamMeta(ctx, 'bevruchting', 'nieuwe combinatie = recombinatie', 960, 180, q.on('bevruchting', 1, 0.5), q.on('recombinatie', 1, 0.5), 'center', C.goud);
    const paar = (xe, xz, xk, ke, kz, t0, t1, nr) => { const ai = ease((t - t0) / 0.4); if (ai <= 0.01) return;
      const zw = ease((t - t0) / (t1 - t0)), zx = lerp(xz + 160, xz, zw), zy = 330 + Math.sin((t - t0) * 7) * 6 * (1 - zw);
      const f = ease((t - t1) / 0.9);
      geslachtscel(ctx, xe, 330, 'ei', ke, 1.1, ai * (1 - 0.6 * f));
      if (f < 1) geslachtscel(ctx, zx, zy, 'zaad', kz, 1.1, ai * (1 - f));
      pijl(ctx, (xe + xz) / 2, 440, (xe + xz) / 2, 440 + 120 * ease((t - t1) / 0.6), C.line, f, 3);
      if (f > 0.01) { chromosoom1(ctx, lerp(xe, xk - 32, f), lerp(330, 720, f), lerp(106, 240, f), ke, { breed: lerp(26, 34, f) }); chromosoom1(ctx, lerp(zx + 4, xk + 32, f), lerp(330, 720, f), lerp(48, 240, f), kz, { breed: lerp(18, 34, f) }); }
      naamBij(ctx, 'kind ' + nr, null, xk, 880, ease((t - t1 - 0.6) / 0.4), 'center'); };
    paar(520, 820, 660, EVO.a1, EVO.a2, q.at('bevruchting'), q.at('samen'), 1);
    paar(1120, 1420, 1260, EVO.a2, EVO.a2, q.at('combinatie') - 1.0, q.at('combinatie') + 0.8, 2);
  },
  s19(ctx, t, q) {
    f1Bg(ctx);
    persoon(ctx, 'yasmin', 560, 650, 470, { uit: 'blij', t }); persoon(ctx, 'bilal', 1360, 650, 470, { uit: 'lacht', kijk: -1, t });
    const r = clamp((t - q.at('allelen')) / 1.4, 0, 1), g = q.on('andere', 1, 0.6);
    e1allelRij(ctx, 380, 760, E1_Y, r, g); e1allelRij(ctx, 1180, 760, E1_B, r, g);
    if (r > 0.01) metaText(ctx, 'acht genen · twee allelen per gen, versimpeld', 960, 860, rgba(C.text2, ease(r)), 'center', 26);
    const tw = q.on('eeneiige', 1, 0.3);
    if (tw > 0.01) { persoon(ctx, 'daan', 885, 650, 300, { uit: 'blij', a: tw, t }); persoon(ctx, 'thijs', 1035, 650, 300, { uit: 'blij', kijk: -1, a: tw, t }); naamBij(ctx, 'eeneiige tweeling', null, 960, 300, tw, 'center');
      const rr = clamp((t - q.at('deelt')) / 0.8, 0, 1); e1allelRij(ctx, 885 - 12, 690, E1_Y.slice(0, 4), rr, 0, 8); e1allelRij(ctx, 1035 - 12, 690, E1_Y.slice(0, 4), rr, 0, 8); }
  },
  s20(ctx, t, q) {
    f1Bg(ctx);
    const a1 = q.on('Mutatie', 1, 0.5), a2 = q.on('Meiose', 1, 0.5);
    card(ctx, 380, 300, 520, 260, 'mutatie', 'maakt nieuwe allelen', a1, C.paars);
    if (a1 > 0.01) { ctx.save(); ctx.globalAlpha = a1; knikker(ctx, 560, 500, 18, EVO.a1); knikker(ctx, 610, 500, 18, EVO.a2); const n = q.on('nieuwe', 1, 0.6); if (n > 0.01) { knikker(ctx, 680, 500 - (1 - n) * 30, 18 * n, '#8C7BBF'); goudRing(ctx, 680, 500, 26 * n); } ctx.restore(); }
    card(ctx, 1020, 300, 520, 260, 'recombinatie', 'maakt nieuwe combinaties (meiose en bevruchting)', a2, C.goud);
    if (a2 > 0.01) { ctx.save(); ctx.globalAlpha = a2; const s = ease((t - q.at('combinaties')) / 1.0), x0 = 1180, x1 = 1380;
      knikker(ctx, x0, 520, 16, EVO.a1); knikker(ctx, lerp(x0 + 40, x1 + 40, s), 520 - Math.sin(s * Math.PI) * 26, 16, EVO.a2); knikker(ctx, x1, 520, 16, EVO.a2); knikker(ctx, lerp(x1 + 40, x0 + 40, s), 520 + Math.sin(s * Math.PI) * 26, 16, EVO.a1); ctx.restore(); }
    haak(ctx, 380, 1540, 600, 'samen: erfelijke variatie', C.groen, q.on('Samen', 1, 0.6));
  },

  // ===================== H3 Populatie en genenpool =====================
  s21(ctx, t, q) {
    // terug naar het kozijn, dan continu uitzoomen naar huis en tuin; het beestje blijft in beeld
    const tz = q.at('eigenlijk') - 0.2, u = ease((t - tz) / 2.6), Z = Math.exp(lerp(Math.log(5.6), 0, u));
    const B = [785, 532], A = [lerp(1380, B[0], u), lerp(760, B[1], u)];
    ctx.save(); ctx.translate(A[0], A[1]); ctx.scale(Z, Z); ctx.translate(-B[0], -B[1]);
    e1tuin(ctx);
    const ai = q.on('individuen', 1, 1.2);
    if (ai > 0.01) E1_TUIN.forEach(([x, y, r], i) => lhb(ctx, x + Math.sin(t * 0.6 + i) * 3, y, 0.16, { vorm: i === 2 ? 'spectabilis' : 'succinea', stippen: 10, rot: r + Math.sin(t * 0.5 + i) * 0.2, a: clamp(ai * 1.6 - i * 0.09, 0, 1) }));
    lhb(ctx, 785, 532, 0.16, { vorm: 'succinea', stippen: 10, rot: 0.3 });
    ctx.restore();
    const ak = 1 - ease((t - tz - 0.1) / 1.0);
    if (ak > 0.01) { const k = Z / 5.6; ctx.save(); ctx.globalAlpha = ak; ctx.translate(A[0], A[1]); ctx.scale(k, k); ctx.translate(-1380, -760); kozijnHoek(ctx); for (const i of [1, 2, 3, 4]) e1plek(ctx, i, t); lhb(ctx, 1380, 760, 0.9, { vorm: 'succinea', stippen: 10, rot: 0.3 }); ctx.restore(); }
    const ar = q.on('dit', 1, 0.5); if (ar > 0.01) { ctx.save(); ctx.globalAlpha = ar; goudRing(ctx, A[0], A[1], lerp(26, 86, ak)); ctx.restore(); }
    naamMeta(ctx, 'populatie', 'één soort · één gebied · plant zich onderling voort', 80, 200, q.on('populatie', 1, 0.5), q.on('soort', 1, 0.6), 'left');
    const as = q.on('eigenlijk', 1, 0.5) * (1 - q.on('populatie', 1, 0.6)); if (as > 0.01) { ctx.save(); ctx.globalAlpha = as; evoSchaal(ctx, 'uitzoomen: kozijn → huis → tuin'); ctx.restore(); }
  },
  s22(ctx, t, q) { // vraag-alinea: zelfde decor, het beestje met ring; een beestje vliegt naar de buren
    e1tuin(ctx);
    E1_TUIN.forEach(([x, y, r], i) => { if (i !== 3) lhb(ctx, x + Math.sin(t * 0.6 + i) * 3, y, 0.16, { vorm: i === 2 ? 'spectabilis' : 'succinea', stippen: 10, rot: r + Math.sin(t * 0.5 + i) * 0.2 }); });
    if (!e1vlieg(ctx, 1400, 640, 1840, 520, 0.4, 2.6, t, 0.16, { vorm: 'succinea', stippen: 10, boog: 160 })) lhb(ctx, 1400, 640, 0.16, { vorm: 'succinea', stippen: 10, rot: 0.2 });
    lhb(ctx, 785, 532, 0.16, { vorm: 'succinea', stippen: 10, rot: 0.3 }); goudRing(ctx, 785, 532, 26 + Math.sin(t * 2.4) * 3);
    naamBij(ctx, 'populatie', 'één soort · één gebied · plant zich onderling voort', 80, 200, 1, 'left');
    const v = q.on('groot', 1, 0.5); if (v > 0.01) vraagteken(ctx, 1240, 330 + Math.sin(t * 1.6) * 5, v, 120);
  },
  s24(ctx, t, q) {
    f1Bg(ctx);
    const ak = ease(t / 0.6), land = q.on('verspreidt', 1, 1.0);
    kaartNL(ctx, 760, 520, 4.4, { a: ak, land: rgba(C.goud, 0.12 * land), rand: e1hex(C.line, C.goud, land) });
    const [tx, ty] = nlXY(51.84, 5.86, 760, 520, 4.4);
    // lasso van de onderzoeker: om de tuin, groeit tot de stad, wordt dan de landsgrens
    const al = q.on('kiest', 1, 0.8), r = lerp(22, 50, q.on('Wie', 2, 0.8));
    if (al > 0.01) { ctx.save(); ctx.globalAlpha = 1 - land; ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.setLineDash([9, 7]); ctx.beginPath(); ctx.arc(tx, ty, r, -Math.PI / 2, -Math.PI / 2 + 6.283 * al); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
    const at = q.on('tuin', 1, 0.5); if (at > 0.01) { circ(ctx, tx, ty, 9 * at, C.goud); naamBij(ctx, 'tuin', null, tx - 30, ty + 10, at * (1 - land), 'right'); }
    naamBij(ctx, 'stad', null, tx + 60, ty - 30, q.on('Wie', 2, 0.5) * (1 - land), 'left');
    naamMeta(ctx, 'heel Nederland', 'keuze van de onderzoeker', 380, 160, land, q.on('Nederland', 1, 0.5), 'left', C.goud);
    const pt = q.on('tuin', 1, 0.6), ps = q.on('Wie', 2, 0.6), pn = land;
    if (pt > 0.01) { pot(ctx, 1290, 760, 0.4, { p: 0.15, n: 12, seed: 2, a: pt * lerp(1, 0.5, ps) }); metaText(ctx, 'tuin', 1290, 810, rgba(C.text2, pt), 'center', 26); }
    if (ps > 0.01) { pot(ctx, 1460, 760, 0.62, { p: 0.15, n: 30, seed: 3, a: ps * lerp(1, 0.7, pn) }); metaText(ctx, 'stad', 1460, 810, rgba(C.text2, ps), 'center', 26); }
    if (pn > 0.01) { pot(ctx, 1720, 760, 0.95, { p: 0.15, n: 80, seed: 5, a: pn }); metaText(ctx, 'Nederland', 1720, 810, rgba(C.goud, pn), 'center', 26); }
  },
  s25(ctx, t, q) {
    f1Bg(ctx);
    const m = ease(t / 0.9), mx = lerp(760, 960, m);
    kaartNL(ctx, mx, 520, 4.4, { land: m < 1 ? rgba(C.goud, 0.12 * (1 - m)) : C.fill, rand: e1hex(C.goud, C.line, m) });
    if (m < 1) pot(ctx, 1720, 760, 0.95, { p: 0.15, n: 80, seed: 5, a: 1 - m });
    const pts = [[51.84, 5.86], [51.98, 5.91], [51.69, 5.3], [52.09, 5.12], [51.56, 5.09], [51.81, 4.67], [52.0, 6.2]].map(([a, b]) => nlXY(a, b, mx, 520, 4.4));
    pts.forEach(([x, y], i) => { const a = ease((t - 0.5 - i * 0.12) / 0.4); if (a > 0.01) circ(ctx, x, y, 9 * a, C.oker, _lt(C.oker, 0.3), 2); });
    const tv = q.at('vliegen') - 0.4;
    [[0, 1], [0, 2], [2, 4], [3, 1], [5, 2], [1, 6]].forEach(([i, j], k) => { const u = ease((t - tv - k * 0.45) / 1.4); if (u <= 0.005) return; const [x1, y1] = pts[i], [x2, y2] = pts[j];
      const P = e1boog(ctx, x1, y1, x2, y2, u); if (u < 0.999) lhb(ctx, P[0], P[1], 0.14, { vorm: k === 3 ? 'spectabilis' : 'succinea', stippen: 10, open: 1, rot: e1rot(x2 - x1, y2 - y1) }); });
    naamBij(ctx, 'geen scherpe grens', 'beestjes vliegen van tuin naar tuin', 80, 200, q.on('scherpe', 1, 0.5), 'left');
  },
  s26(ctx, t, q) {
    f1Bg(ctx);
    // de kaart krimpt weg naar de pot ('alle allelen van de hele populatie in één pot')
    const k = ease(t / 1.6); if (k < 1) kaartNL(ctx, 960, lerp(520, 640, k), lerp(4.4, 0.6, k), { a: 1 - k });
    const ap = q.on('allelen', 1, 0.6), N = 81, L = potKleuren(N, 0.15, 7), t0 = q.at('allelen'), dt = (q.at('genenpool') - 0.6 - t0) / N;
    const n = clamp(Math.floor((t - t0 - 0.6) / dt) + 1, 0, N);
    if (ap > 0.01) potK(ctx, 960, 800, 1.6, L.slice(0, n), { seed: 7, a: ap });
    for (let i = 0; i < N; i++) { const ti = t0 + i * dt, u = clamp((t - ti) / 0.6, 0, 1); if (u <= 0 || u >= 1) continue; const [sx, sy] = potSlot(960, 800, 1.6, i, 7), xs = 960 + (hash(i * 9.1) - 0.5) * 220;
      knikker(ctx, lerp(xs, sx, ease(u)), lerp(60, sy, u * u), 20, L[i]); }
    const ab = q.on('blauw', 1, 0.5), ag = q.on('geel', 1, 0.5);
    if (ab > 0.01) { knikker(ctx, 560, 468, 18, EVO.a1, ab); naamBij(ctx, 'allel voor zwart', null, 520, 480, ab, 'right', EVO.a1R); }
    if (ag > 0.01) { knikker(ctx, 560, 548, 18, EVO.a2, ag); naamBij(ctx, 'allel voor oranje', null, 520, 560, ag, 'right', EVO.a2R); }
    naamBij(ctx, 'genenpool', 'alle allelen van de populatie', 1220, 420, q.on('genenpool', 1, 0.5), 'left', C.goud);
  },
  s27(ctx, t, q) {
    f1Bg(ctx);
    const tt = q.at('tien'), tz = q.at('zwart', 1);
    for (let i = 0; i < 10; i++) { const x = 170 + i * 160, zw = i === 2 || i === 6, t0 = i === 0 ? q.at('beestje') : tt + (i - 1) * 0.12;
      const a = ease((t - t0) / 0.3); if (a <= 0.01) continue;
      e1loop(ctx, x, 330, x, 260, t0, t, 0.95, { vorm: zw ? 'spectabilis' : 'succinea', stippen: 10 + (i % 5) * 2, a, rotEind: 0 });
      if (zw) { const g = ease((t - tz - (i === 6 ? 0.3 : 0)) / 0.4); if (g > 0.01) { ctx.save(); ctx.globalAlpha = g; goudRing(ctx, x, 256, 92); ctx.restore(); } }
      const ko = i === 0 ? ease((t - q.at('knikkers')) / 0.4) : ease((t - q.at('acht') - i * 0.06) / 0.4);
      if (!zw && ko > 0.01) { knikker(ctx, x - 24, 400 + (1 - ko) * 20, 18, EVO.a2, ko); knikker(ctx, x + 24, 400 + (1 - ko) * 20, 18, EVO.a2, ko); }
      if (zw) { const k1 = ease((t - q.at('zwart', 3)) / 0.4), k2 = ease((t - q.at('oranje', 2)) / 0.4);
        if (k1 > 0.01) knikker(ctx, x - 24, 400 + (1 - k1) * 20, 18, EVO.a1, k1); if (k2 > 0.01) knikker(ctx, x + 24, 400 + (1 - k2) * 20, 18, EVO.a2, k2); } }
    const ap = q.on('knikkers', 1, 0.6); if (ap > 0.01) potK(ctx, 960, 880, 1.05, [], { a: ap });
    pijl(ctx, 960, 470, 960, 540, C.line, q.on('acht', 1, 0.5), 3);
  },
  s28(ctx, t, q) { // vraag-alinea: de knikkers rollen één voor één in de pot (situatie, geen antwoord)
    f1Bg(ctx);
    const order = []; for (let i = 0; i < 10; i++) { const zw = i === 2 || i === 6; order.push([i, -1, zw ? EVO.a1 : EVO.a2], [i, 1, EVO.a2]); }
    const dt = 0.24, ts = 0.2, slot = new Array(20).fill(null), vlucht = [];
    order.forEach(([i, side, kl], k) => { const ti = ts + k * dt, u = clamp((t - ti) / 0.9, 0, 1); if (u >= 1) slot[k] = kl; else vlucht.push([i, side, kl, k, u]); });
    for (let i = 0; i < 10; i++) { const x = 170 + i * 160, zw = i === 2 || i === 6; lhb(ctx, x, 260, 0.95, { vorm: zw ? 'spectabilis' : 'succinea', stippen: 10 + (i % 5) * 2 }); if (zw) goudRing(ctx, x, 256, 92); }
    potK(ctx, 960, 880, 1.05, slot, { seed: 11 });
    pijl(ctx, 960, 470, 960, 540, C.line, 1, 3);
    for (const [i, side, kl, k, u] of vlucht) { const x0 = 170 + i * 160 + side * 24, y0 = 400; if (u <= 0) { knikker(ctx, x0, y0, 18, kl); continue; }
      const [sx, sy] = potSlot(960, 880, 1.05, k, 11), mx = 960 + (sx - 960) * 0.3, my = 560;
      let x, y; if (u < 0.6) { const v = ease(u / 0.6); x = lerp(x0, mx, v); y = lerp(y0, my, v) - Math.sin(v * Math.PI) * 50; } else { const v = (u - 0.6) / 0.4; x = lerp(mx, sx, v); y = lerp(my, sy, v * v); }
      knikker(ctx, x, y, lerp(18, 13.6, u), kl); }
    const v = q.on('denk', 1, 0.5); if (v > 0.01) vraagteken(ctx, 1240, 720 + Math.sin(t * 1.6) * 5, v, 140);
  },
  s30(ctx, t, q) {
    f1Bg(ctx);
    const m = ease(t / 1.0);
    const slot = []; for (let i = 0; i < 10; i++) { const zw = i === 2 || i === 6; slot.push(zw ? EVO.a1 : EVO.a2, EVO.a2); }
    const px = lerp(960, 640, m), py = lerp(880, 600, m), ps = lerp(1.05, 1.3, m);
    potK(ctx, px, py, ps, slot, { seed: 11 });
    const rb = q.on('blauw', 1, 0.5) * (1 - q.on('allelfrequentie', 1, 0.6)); if (rb > 0.01) { ctx.save(); ctx.globalAlpha = rb; for (const k of [4, 12]) { const [x, y] = potSlot(px, py, ps, k, 11); goudRing(ctx, x, y, 13 * ps + 6); } ctx.restore(); }
    e1balk(ctx, 440, 660, 400, 0.1, ease((t - q.at('tien')) / 0.8), { namen: ['zwart', 'oranje'] });
    naamBij(ctx, 'allelfrequentie', 'aandeel van een allel in de pot', 640, 820, q.on('allelfrequentie', 1, 0.5), 'center', C.goud);
    const f2 = q.on('allelfrequentie', 2, 0.4) * (1 - ease((t - q.at('allelfrequentie', 2) - 1.6) / 0.6)); if (f2 > 0.01) { ctx.save(); ctx.globalAlpha = f2; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; roundRect(ctx, 432, 652, 56, 50, 16); ctx.stroke(); ctx.restore(); }
    const dz = q.on('procent', 2, 0.6);
    for (let i = 0; i < 10; i++) { const zw = i === 2 || i === 6, x0 = 170 + i * 160, y0 = 260, x1 = 1160 + (i % 5) * 130, y1 = 380 + Math.floor(i / 5) * 170;
      lhb(ctx, lerp(x0, x1, m), lerp(y0, y1, m), lerp(0.95, 0.75, m), { vorm: zw ? 'spectabilis' : 'succinea', stippen: 12, a: zw ? 1 : 1 - 0.65 * dz });
      if (zw && dz > 0.01) { ctx.save(); ctx.globalAlpha = dz; goudRing(ctx, x1, y1 - 3, 72); ctx.restore(); } }
    naamBij(ctx, '20% van de beestjes is zwart', null, 1420, 640, dz, 'center');
  },

  // ===================== H4 Evolutie =====================
  s31(ctx, t, q) {
    f1Bg(ctx); const ps = [0.1, 0.18, 0.3], ta = [0, q.at('verandering') - 0.2, q.at('allelfrequenties') - 0.2];
    ps.forEach((p, i) => { const x = 460 + i * 500, a = i === 0 ? ease(t / 0.6) : ease((t - ta[i]) / 0.7); if (a <= 0.01) return;
      pot(ctx, x + (1 - a) * 60, 620, 1.05, { p, n: 60, seed: 20 + i, a });
      const pb = i === 0 ? p : lerp(ps[i - 1], p, ease((t - ta[i] - 0.5) / 1.4)); allelBalk(ctx, x - 150, 680, 300, pb, { a });
      metaText(ctx, 'generatie ' + (1 + i * 10), x, 820, rgba(C.text2, a), 'center', 28);
      if (i > 0) e1pijl(ctx, x - 330, 480, x - 170, 480, C.line, ease((t - ta[i] + 0.3) / 0.6), 3); });
    naamMeta(ctx, 'evolutie', 'verandering van allelfrequenties, over generaties', 960, 170, q.on('evolutie', 1, 0.5), q.on('verandering', 1, 0.6), 'center', C.goud);
  },
  s32(ctx, t, q) { // vraag-alinea: 10% → 30% blauw na 20 generaties
    f1Bg(ctx);
    const a1 = q.on('tien', 1, 0.6), a2 = q.on('dertig', 1, 0.6), ap = q.on('Twintig', 1, 0.6);
    if (a1 > 0.01) { pot(ctx, 600, 620, 1.1, { p: 0.1, n: 60, seed: 60, a: a1 }); e1balk(ctx, 440, 680, 320, 0.1, a1, {}); metaText(ctx, 'generatie 1', 600, 820, rgba(C.text2, a1), 'center', 28); }
    e1pijl(ctx, 800, 480, 1120, 480, C.line, ap, 3); if (ap > 0.01) metaText(ctx, '20 generaties', 960, 440, rgba(C.text2, ap), 'center', 26);
    if (a2 > 0.01) { pot(ctx, 1320, 620, 1.1, { p: 0.3, n: 60, seed: 61, a: a2 }); e1balk(ctx, 1160, 680, 320, 0.3, a2, {}); metaText(ctx, 'generatie 21', 1320, 820, rgba(C.text2, a2), 'center', 28); }
    const v = q.on('veranderd', 1, 0.5); if (v > 0.01) vraagteken(ctx, 960, 290 + Math.sin(t * 1.6) * 5, v, 140);
  },
  s34(ctx, t, q) {
    f1Bg(ctx);
    // het beestje komt oranje uit de pop en blijft oranje
    const em = ease((t - q.at('komt')) / 0.9);
    popLhb(ctx, 400, 500, 1.6, 1 - em, em);
    if (em > 0.01) lhb(ctx, 400, lerp(500, 470, em), 2.0, { vorm: 'succinea', stippen: 14, a: em });
    const rg = q.on('oranje', 2, 0.5); if (rg > 0.01) { ctx.save(); ctx.globalAlpha = rg; goudRing(ctx, 400, 470, 175); ctx.restore(); }
    naamMeta(ctx, 'individu', 'allelen veranderen niet', 400, 720, q.on('allelen', 1, 0.5), q.on('veranderen', 1, 0.5), 'center');
    // wie krijgt jongen, en hoeveel
    const aj = q.on('welke', 1, 0.5) * (1 - q.on('verandert', 1, 0.8));
    if (aj > 0.01) { ctx.save(); ctx.globalAlpha = aj; lhb(ctx, 1040, 300, 0.85, { vorm: 'spectabilis' }); lhb(ctx, 1520, 300, 0.85, { vorm: 'succinea', stippen: 12 });
      const nj = (tx, n, t0) => { for (let k = 0; k < n; k++) { const a = ease((t - t0 - k * 0.3) / 0.4); if (a > 0.01) { ctx.save(); ctx.translate(tx + 110 + k * 75, 320); ctx.rotate(Math.PI); larve(ctx, 0, 0, 0.75, a, t + k); ctx.restore(); } } };
      nj(1040, 3, q.at('jongen')); nj(1520, 1, q.at('jongen') + 0.3); ctx.restore(); }
    const ps = [0.1, 0.18, 0.3], tp = [q.at('verandert') - 0.3, q.at('verandert') + 0.5, q.at('verandert') + 1.3];
    ps.forEach((p, i) => { const x = 1000 + i * 330, a = ease((t - tp[i]) / 0.6); if (a <= 0.01) return; pot(ctx, x, 560, 0.75, { p, n: 50, seed: 30 + i, a }); e1balk(ctx, x - 110, 600, 220, p, a, { procent: false });
      if (i > 0) e1pijl(ctx, x - 235, 420, x - 140, 420, C.line, a, 3); });
    naamBij(ctx, 'populatie', 'genenpool verandert', 1330, 720, q.on('populatie', 1, 0.5), 'center', C.goud);
  },
  s35(ctx, t, q) {
    f1Bg(ctx);
    const tv = q.at('Aziatisch'); // beestjes vliegen over: de soort verspreidt zich
    for (let k = 0; k < 6; k++) { const t0 = tv + k * 0.3, u = (t - t0) / 3.2; if (u <= 0 || u >= 1) continue; const x = lerp(-120, 2040, u), y = 330 + Math.sin(u * 6 + k) * 30 + (k % 3) * 40;
      lhb(ctx, x, y, 0.4, { vorm: k === 1 || k === 4 ? 'spectabilis' : 'succinea', stippen: 12, open: 1, rot: Math.PI / 2 + Math.cos(u * 6 + k) * 0.2, a: Math.min(1, (1 - Math.abs(u - 0.5) * 2) * 4) * (1 - q.on('eerste', 1, 0.5)) }); }
    naamMeta(ctx, 'Groot-Brittannië', 'eerste twee jaar van de verspreiding', 300, 260, q.on('Brittannië', 1, 0.5), q.on('eerste', 1, 0.5), 'left');
    const a1 = q.on('eerste', 1, 0.6), a2 = q.on('jaar', 1, 0.6), kr = ease((t - q.at('kleiner')) / 1.2);
    e1balk(ctx, 300, 400, 1100, 0.3, a1, { procent: false, h: 50 }); if (a1 > 0.01) metaText(ctx, 'jaar 1', 280, 436, rgba(C.text2, a1), 'right', 28);
    e1balk(ctx, 300, 560, 1100, lerp(0.3, 0.2, kr), a2, { procent: false, h: 50 }); if (a2 > 0.01) metaText(ctx, 'jaar 2', 280, 596, rgba(C.text2, a2), 'right', 28);
    naamMeta(ctx, 'allel voor zwart', 'wordt zeldzamer', 300, 700, q.on('allel', 1, 0.5), q.on('zeldzamer', 1, 0.5), 'left', EVO.a1R);
    const as = q.on('jaar', 1, 0.6); if (as > 0.01) { ctx.save(); ctx.globalAlpha = as; evoSchaal(ctx, 'schematisch · richting volgens Michie e.a. 2010'); ctx.restore(); }
  },
  s36(ctx, t, q) {
    f1Bg(ctx);
    const L = potKleuren(70, 0.3, 41), tm = q.at('knikkers') - 0.2, mu = t > tm + 1.0;
    if (mu) L.push('#8C7BBF');
    const tt = q.at('toeval'), sh = t > tt && t < tt + 1.2 ? Math.sin((t - tt) * 18) * 6 * (1 - (t - tt) / 1.2) : 0; // toeval: de pot schudt even
    const ap = ease(t / 0.6);
    potK(ctx, 960 + sh, 720, 1.25, L, { seed: 41, a: ap, ring: mu ? [70] : [] });
    allelBalk(ctx, 800, 770, 320, 0.3, { procent: false, a: ap });
    const k = [[C.groen, 'selectie', 'film 2–4', 420, 300, 'selectie', EVO.a1], [C.goud, 'toeval', 'film 5', 420, 640, 'toeval', null], [C.line, 'uitwisseling', 'film 5', 1500, 300, 'uitwisseling', EVO.a2], [C.paars, 'mutatie', 'nieuwe knikkers', 1500, 640, 'mutatie', '#8C7BBF']];
    for (const [c, n, m, x, y, w, kl] of k) { const a = q.on(w, 1, 0.5), u = ease((t - q.at(w)) / 0.8);
      const x1 = x + (x < 960 ? 150 : -150), y1 = y - 10, x2 = x < 960 ? 790 : 1130, y2 = y < 500 ? 520 : 640;
      naamMeta(ctx, n, m, x, y, a, w === 'mutatie' ? q.on('knikkers', 1, 0.5) : q.on('volgende', 1, 0.6), 'center', c); e1pijl(ctx, x1, y1, x2, y2, c, u, 4);
      if (kl) { const t0 = w === 'mutatie' ? tm : q.at(w) + 0.9, v = clamp((t - t0) / 1.0, 0, 1); if (v > 0 && v < 1) knikker(ctx, lerp(x1, x2, ease(v)), lerp(y1, y2, ease(v)), 15, kl); } }
  },

  // ===================== Recap =====================
  s37(ctx, t, q) {
    f1Bg(ctx);
    const a1 = q.on('Variatie', 1, 0.5), b1 = q.on('erfelijk', 1, 0.5), a2 = q.on('mutatie', 1, 0.5), a3 = q.on('Meiose', 1, 0.5);
    card(ctx, 200, 280, 480, 300, 'variatie', null, a1 * (1 - b1), C.goud); card(ctx, 200, 280, 480, 300, 'variatie', 'deels erfelijk, deels omgeving', a1 * b1, C.goud);
    [['succinea', 330], ['spectabilis', 440], ['conspicua', 550]].forEach(([v, x], i) => { const a = ease((t - 0.2 - i * 0.25) / 0.4) * a1; if (a > 0.01) lhb(ctx, x, 500, 0.5, { vorm: v, stippen: 12, a }); });
    card(ctx, 720, 280, 480, 300, 'mutatie', 'nieuwe allelen', a2, C.paars);
    if (a2 > 0.01) { ctx.save(); ctx.globalAlpha = a2; const mm = ease((t - q.at('mutatie') - 0.4) / 0.8); chromosoomPaar(ctx, 960, 500, 120, { breed: 22, gap: 18, nieuw: mm > 0.02 ? [1, e1hex(EVO.a2, '#B9AEDB', mm)] : null }); ctx.restore(); }
    card(ctx, 1240, 280, 480, 300, 'recombinatie', 'nieuwe combinaties door meiose en bevruchting', a3, C.goud);
    if (a3 > 0.01) { ctx.save(); ctx.globalAlpha = a3; const s = ease((t - q.at('combinaties')) / 1.0), x0 = 1400, x1 = 1560;
      knikker(ctx, x0, 535, 15, EVO.a1); knikker(ctx, lerp(x0 + 36, x1 + 36, s), 535 - Math.sin(s * Math.PI) * 18, 15, EVO.a2); knikker(ctx, x1, 535, 15, EVO.a2); knikker(ctx, lerp(x1 + 36, x0 + 36, s), 535 + Math.sin(s * Math.PI) * 18, 15, EVO.a1); ctx.restore(); }
  },
  s38(ctx, t, q) {
    f1Bg(ctx);
    const ap = ease(t / 0.3);
    persoon(ctx, 'yasmin', 560, 650, 470, { uit: 'lacht', a: ap, t }); persoon(ctx, 'bilal', 1360, 650, 470, { uit: 'blij', kijk: -1, a: ap, t });
    const r = clamp((t - q.at('lijken')) / 1.6, 0, 1), g = q.on('andere', 1, 0.6);
    e1allelRij(ctx, 380, 760, E1_Y, r, g); e1allelRij(ctx, 1180, 760, E1_B, r, g);
    naamBij(ctx, 'zelfde ouders, andere greep', null, 960, 210, q.on('Dezelfde', 1, 0.6), 'center', C.goud);
  },
  s39(ctx, t, q) {
    f1Bg(ctx);
    const ps = [0.1, 0.18, 0.3], ta = [q.at('genenpool') - 0.4, q.at('verandering') - 0.3, q.at('allelfrequenties') - 0.3];
    const a0 = q.on('Alle', 1, 0.6) * (1 - ease((t - ta[0]) / 0.6)); // losse knikkers zweven samen tot de eerste pot
    if (a0 > 0.01) { ctx.save(); ctx.globalAlpha = a0; for (let k = 0; k < 10; k++) knikker(ctx, 560 + Math.cos(k * 0.8 + t) * 140, 420 + Math.sin(k * 1.3 + t * 0.8) * 70, 16, k % 6 === 0 ? EVO.a1 : EVO.a2); ctx.restore(); }
    ps.forEach((p, i) => { const x = 560 + i * 400, a = ease((t - ta[i]) / 0.8); if (a <= 0.01) return;
      pot(ctx, x + (1 - a) * 200, 640, 0.95, { p, n: 55, seed: 50 + i, a }); e1balk(ctx, x - 130 + (1 - a) * 200, 690, 260, i ? lerp(ps[i - 1], p, ease((t - ta[i] - 0.5) / 1.0)) : p, a, { procent: false }); });
    haak(ctx, 400, 1520, 760, 'evolutie = verandering van allelfrequenties', C.groen, q.on('pot', 1, 0.6));
  },
});
