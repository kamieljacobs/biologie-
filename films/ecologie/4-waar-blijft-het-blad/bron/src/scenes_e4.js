// Film 4 · Waar blijft het blad? — geanimeerde scènes (keyframes uit sb4.js als eindbeeld, opgebouwd in de maat van de stem).
const E4LOG = [['11 nov', '1,0 g', 'valt van de eik', null], ['dec', '…', 'pissebed, worm', null], ['feb', '…', 'schimmels, bacteriën', _vrij], ['mei', '0,7 g', 'gewogen', _vrij]];
const e4Blad = (c, x, y, s, o = {}) => ecoEikenblad(c, x, y, s, Object.assign({ hoek: 0.1 }, o));
Object.assign(SCENES, {
  // ---------------- titel: alleen het beeld rechts (zakje en logboek; een blad dwarrelt neer)
  title(ctx, t) {
    e4Zakje(ctx, 1420, 620, 420, 260, 44, (cc) => ecoEikenblad(cc, 1420, 620, 18, { hoek: -0.2 + Math.sin(t * 0.5) * 0.03 })); e4Logboek(ctx, 1120, 120, 640, [], { kw: [0, 0.2, 0.38, 0.62] });
    const u = e4fr(t / 9); e4A(ctx, Math.min(1, u * 6, (1 - u) * 6), () => ecoEikenblad(ctx, 1300 + Math.sin(t * 1.2) * 60 + u * 120, 300 + u * 520, 4, { hoek: t * 0.8 })); },

  // ---------------- Opening
  s01(ctx, t, q) { e4Bos(ctx);
    const tG = q.at('grond'), tR = q.at('raapt'), tW = q.at('weegt'), tZ = q.at('zakje');
    // het blad dwarrelt van de eik naar het strooisel
    const uV = clamp(t / Math.max(1.5, tG + 0.3), 0, 1);
    const hand = (c, x, y) => e4Blad(c, x + 10, y - 6, 2.6, { hoek: 0.6 });
    persoon(ctx, 'bas', 700, 900, 460, { pose: t > tR && t < tW + 0.3 ? 'vasthouden' : 'staan', kijk: 1, t, a: ramp(t, q.at('ecoloog') - 0.4, 0.3), hold: t > tR && t < tW + 0.3 ? hand : null });
    if (t < tR) e4Blad(ctx, lerp(1000, 900, uV) + Math.sin(uV * 9) * 40 * (1 - uV), lerp(80, 870, ease(uV)), 2.6, { hoek: uV * 7 });
    const aW = ramp(t, tW, 0.4) * (1 - ramp(t, tZ + 0.4, 0.4)); e4A(ctx, aW, () => { e4Weegschaal(ctx, 930, 880, 180, '1,0 g'); if (t > tW + 0.3) e4Blad(ctx, 930, 830, 2.6, {}); });
    const aZ = ramp(t, tZ, 0.4); if (aZ > 0.01) e4A(ctx, aZ, () => e4Zakje(ctx, 900, 880, 40, 26, 8, (c) => ecoEikenblad(c, 900, 880, 2.2, { hoek: 0.1 })));
    const zc = ramp(t, tZ + 0.5, 0.8); if (zc > 0.01) zoomCircle(ctx, 1380, 470, 260 * (0.5 + 0.5 * zc), 900, 880, 'gaaszakje ± 15 cm · vergroot', zc, () => { ctx.fillStyle = '#4A3A2C'; ctx.fillRect(1120, 210, 520, 520); e4Zakje(ctx, 1380, 470, 380, 250, 40, (c) => ecoEikenblad(c, 1380, 470, 15, { hoek: 0.1 })); });
    naamBij(ctx, 'ecoloog', null, 700, 360, q.on('ecoloog', 1, 0.5), 'center'); metaText(ctx, '11 NOVEMBER', 1800, 78, rgba(C.goud, ramp(t, 0, 0.5)), 'right', 28); ecoSchaal(ctx, 'ecoloog ± 1,80 m · zakje ± 15 cm'); },
  s02(ctx, t, q) { const tV = q.at('voorjaar'), z = lerp(1.4, 1, ramp(t, 0, 2.5));
    ctx.save(); ctx.translate(900, 800); ctx.scale(z, z); ctx.translate(-900, -800);
    e4Bos(ctx, { blad: false }); const n = t < tV ? Math.round(lerp(30, 150, clamp(t / tV, 0, 1))) : Math.round(lerp(150, 26, ramp(t, tV, 1.2))); e4Strooisel(ctx, n);
    e4Vallend(ctx, t, 26, 1 - ramp(t, tV - 0.3, 0.6), 0, W, -40, 860, 0.13, 2.6); ctx.restore();
    const aT = q.on('voorjaar', 1, 0.5); e4A(ctx, aT, () => { roundRect(ctx, 640, 120, 640, 90, 16); shape(ctx, rgba(C.bgMicro, 0.85), C.line, 1.5); text(ctx, 'november  →  april', 960, 180, fTekst(44, 700), C.text, 'center'); });
    vraagteken(ctx, 960, 400, q.on('blijft', 1, 0.5), 110); },

  // ---------------- H1 Een blad is voedsel
  s04(ctx, t, q) { _sch4(ctx); e4LogA(ctx, 980, 130, 860, E4LOG.slice(0, 1), [ramp(t, 0.3, 0.6)]);
    ecoEikenblad(ctx, 480, 520, 30, { hoek: -0.3 + Math.sin(t * 0.4) * 0.02 });
    const a1 = q.on('cellulose', 1, 0.6), a2 = q.on('lignine', 1, 0.6), a3 = q.on('eiwitten', 1, 0.6), w = Math.sin(t * 0.8) * 0.04;
    e4A(ctx, a1, () => e4Keten(ctx, 120, 820, 6, 16, C.groen, w)); naamBij(ctx, 'cellulose', null, 120, 880, a1, 'left', C.groen);
    e4A(ctx, a2, () => e4Keten(ctx, 420, 820, 5, 14, C.oker, 0.2 - w)); naamBij(ctx, 'lignine', null, 420, 880, a2, 'left', C.oker);
    e4A(ctx, a3, () => e4Kraal(ctx, 680, 820, 3, 11)); naamBij(ctx, 'eiwit', 'weinig', 680, 876, a3, 'left', C.groen);
    naamBij(ctx, 'organische stoffen', 'groot · energierijk · met koolstof', 1060, 640, q.on('organische', 1, 0.6), 'left', C.groen);
    const aE = q.on('energie', 1, 0.6); if (aE > 0.01) for (let i = 0; i < 6; i++) circ(ctx, 120 + i * 30.4, 820 + (i % 2) * 8, 5 + 2 * Math.sin(t * 3 + i), rgba(C.goud, aE)); },
  s05(ctx, t, q) { _sch4(ctx);
    roundRect(ctx, 160, 220, 720, 560, 22); shape(ctx, rgba(C.fill, 0.5), C.groen, 2); naamBij(ctx, 'organisch', 'groot · energierijk', 520, 300, 1, 'center', C.groen);
    e4Keten(ctx, 260, 460, 7, 18, C.groen, Math.sin(t * 0.6) * 0.03); e4Kraal(ctx, 280, 620, 9, 13);
    const aA = q.on('anorganische', 1, 0.6); e4A(ctx, aA, () => { roundRect(ctx, 1040, 220, 720, 560, 22); shape(ctx, rgba(C.fill, 0.5), ECOK.anorganisch, 2); });
    naamBij(ctx, 'anorganisch', null, 1400, 300, aA, 'center', ECOK.anorganisch); metaText(ctx, 'klein · bijna geen energie', 1400, 330, rgba(C.grain, q.on('energie', 1, 0.6)), 'center', 26);
    const M = [['koolstofdioxide', 1180, 460, e4CO2, 20, 'CO₂'], ['water', 1380, 460, e4H2O, 18, 'water'], ['nitraat', 1560, 460, e4Nitraat, 22, 'nitraat'], ['fosfaat', 1260, 620, e4Fosfaat, 20, null]];
    M.forEach(([c, x, y, f, r, n], i) => { const a = q.on(c, 1, 0.5); if (a <= 0.01) return; const w = wander(i, t, 6, 0.5); e4A(ctx, a, () => f(ctx, x + w.x, y + w.y, r)); if (n) naamBij(ctx, n, null, x, 530, a, 'center'); });
    naamBij(ctx, 'fosfaat', null, 1310, 690, q.on('fosfaat', 1, 0.5), 'left'); },
  s06(ctx, t, q) { _sch4(ctx);
    const N = [[480, 'cellulose', (x, y) => e4Keten(ctx, x - 80, y, 5, 16)], [960, 'eiwit', (x, y) => e4Kraal(ctx, x - 40, y, 5, 13)], [1440, 'nitraat', (x, y) => e4Nitraat(ctx, x, y, 34)]];
    N.forEach(([x, n, f], i) => { const a = ramp(t, i * 0.2, 0.4); if (a <= 0.01) return; e4A(ctx, a, () => { circ(ctx, x, 470, 150, rgba(C.fill, 0.9), C.line, 1.5); const w = wander(i, t, 5, 0.5); f(x + w.x, 470 + w.y); }); naamBij(ctx, n, null, x, 680, a, 'center'); });
    vraagteken(ctx, 960, 230, q.on('anorganisch', 1, 0.5), 100); },
  s08(ctx, t, q) { _sch4(ctx);
    e4BoomZonder(ctx, 700, 860, 4.6, { wind: 0.2, t: t * 0.4 }); ctx.fillStyle = '#3A2E24'; ctx.fillRect(0, 860, W, 20);
    const aL = q.on('licht', 1, 0.6); e4A(ctx, aL, () => { circ(ctx, 1500, 200, 56, C.goud); metaText(ctx, 'LICHT', 1500, 300, C.goud, 'center', 26); }); e4PijlG(ctx, 1440, 230, 980, 360, q.on('licht', 1, 1.2), C.goud, 3);
    // nitraat: uit de bodem de wortel in en omhoog
    const tB = q.at('bodem'), uN = clamp((t - tB) / 2.2, 0, 1); const nx = uN < 0.4 ? lerp(560, 700, uN / 0.4) : 700, ny = uN < 0.4 ? 840 : lerp(840, 420, (uN - 0.4) / 0.6);
    e4A(ctx, 1 - ramp(t, tB + 2.0, 0.4), () => e4Nitraat(ctx, nx, ny, 18, t < q.at('bodem') + 2)); e4PijlG(ctx, 700, 840, 700, 640, q.on('bodem', 1, 0.8), ECOK.stikstof, 3);
    const aC = q.on('koolstofdioxide', 1, 0.5), uC = ramp(t, q.at('koolstofdioxide') + 0.4, 2.0); e4A(ctx, aC * (1 - ramp(t, q.at('koolstofdioxide') + 2.3, 0.4)), () => e4CO2(ctx, lerp(1180, 900, uC), lerp(470, 420, uC), 18)); e4PijlG(ctx, 1120, 470, 950, 440, aC, ECOK.anorganisch, 3);
    const uW = ramp(t, q.at('water') + 0.2, 2.0); e4A(ctx, q.on('water', 1, 0.5) * (1 - ramp(t, q.at('water') + 2.3, 0.4)), () => e4H2O(ctx, lerp(900, 720, Math.min(1, uW * 2)), lerp(840, 420, uW), 14));
    const aO = q.on('organische', 1, 0.8); if (aO > 0.01) for (let i = 0; i < 4; i++) e4A(ctx, aO, () => e4Keten(ctx, 560 + i * 80, 330 + (i % 2) * 60, 2, 11, C.groen, Math.sin(t + i) * 0.2));
    naamBij(ctx, 'autotroof', 'maakt zelf organische stof', 1300, 640, q.on('autotroof', 1, 0.6), 'left', C.groen); naamBij(ctx, 'producent', null, 1300, 740, q.on('producent', 1, 0.6), 'left', C.groen); },
  s09(ctx, t, q) { e4Bos(ctx);
    const tD = q.at('Dieren');
    ecoRee(ctx, 440, 830, 3.2, { houding: 'grazen', t: t * 0.3, a: 1 });
    const aP = q.on('schimmels', 1, 0.8); ctx.fillStyle = '#5A4434'; ctx.fillRect(1010, 760, 90, 70);
    for (const [x, y, r] of [[1030, 760, 26], [1070, 752, 32]]) { const rr = r * aP; if (rr < 1) continue; ctx.beginPath(); ctx.ellipse(x, y - 14 * aP + 14, rr, rr * 0.45, 0, Math.PI, 0); shape(ctx, '#C9A880', '#E2CCA8', 1.5); ctx.fillStyle = '#C9A880'; ctx.fillRect(x - 5, y - 14 * aP + 14, 10, 14 * aP); }
    ecoEikenblad(ctx, 1500, 850, 7, { hoek: 0.2 }); ecoPissebed(ctx, 1470, 838, 18, { t: t * 0.6, vooruit: true });
    naamBij(ctx, 'ree', null, 440, 580, q.on('Dieren', 1, 0.5), 'center'); naamBij(ctx, 'paddenstoel', null, 1060, 680, aP, 'center'); naamBij(ctx, 'pissebed', 'vergroot', 1500, 770, ramp(t, tD + 0.4, 0.5), 'center');
    text(ctx, 'heterotroof', 960, 220, fTekst(56, 700), rgba(C.oker, q.on('heterotroof', 1, 0.6)), 'center'); metaText(ctx, 'NEEMT ORGANISCHE STOF OP', 960, 270, rgba(C.text2, q.on('heterotroof', 1, 0.6)), 'center', 26); },
  s10(ctx, t, q) { _sch4(ctx);
    ecoEikenblad(ctx, 760, 500, 26, { stadium: 0.15, hoek: -0.2 });
    const g = clamp(0.3 + t * 0.15, 0, 1); e4Schimmel(ctx, 640, 560, 160 * g, -0.4, 2); e4Schimmel(ctx, 860, 430, 140 * g, 2.6, 5); e4Schimmel(ctx, 700, 420, 120 * g, -1.2, 9);
    naamBij(ctx, 'witte schimmel', null, 760, 760, q.on('schimmel', 1, 0.5), 'center'); vraagteken(ctx, 1320, 430, q.on('producent', 1, 0.5), 120); },
  s12(ctx, t, q) { _sch4(ctx);
    ecoEikenblad(ctx, 420, 540, 26, { stadium: 0.15, hoek: -0.2 }); const z = ramp(t, 0, 1.0), g = q.on('draden', 1, 2.5), tN = q.at('neemt');
    zoomCircle(ctx, 1240, 500, 330 * (0.5 + 0.5 * z), 520, 520, 'schimmeldraden in het blad · vergroot', z, () => {
      ctx.fillStyle = '#3E4A2E'; ctx.fillRect(900, 160, 680, 680); for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) { roundRect(ctx, 920 + i * 110, 180 + j * 110, 100, 100, 26); shape(ctx, '#5E7A44', '#7A9A5A', 2); }
      e4Schimmel(ctx, 940, 760, 260 * Math.max(0.15, g), -0.6, 2); e4Schimmel(ctx, 1500, 260, 240 * Math.max(0.15, g), 2.4, 5);
      // groene ketentjes worden uit het blad opgenomen in de draad
      for (let i = 0; i < 3; i++) { const u = clamp((t - tN - i * 0.6) / 1.6, 0, 1); if (u >= 1) continue; e4A(ctx, 1 - u * 0.8, () => e4Keten(ctx, lerp(1180 + i * 40, 1060, u), lerp(470 + i * 60, 620, u), 2, 10, C.groen, 0.4)); } });
    naamBij(ctx, 'heterotroof', 'geen bladgroen', 420, 760, q.on('heterotroof', 1, 0.6), 'center', C.oker); },

  // ---------------- H2 De opruimers
  s13(ctx, t, q) { e4Bos(ctx, { blad: false }); metaText(ctx, 'DECEMBER', 1800, 78, C.goud, 'right', 28);
    const st = lerp(0.1, 0.3, q.on('gaatjes', 1, 2)), tP = q.at('Pissebedden'), tR = q.at('regenwormen');
    e4Zakje(ctx, 980, 760, 1180, 420, 70, (c) => { ctx.fillStyle = '#4A3A2C'; ctx.fillRect(380, 540, 1220, 440); ecoEikenblad(c, 900, 700, 40, { stadium: st, hoek: -0.1 });
      const cP = clamp((t - tP) * 1.2, 0, 2.5); if (t > tP) ecoPissebed(c, 520, 690, 40, { t: cP, vooruit: true });
      if (t > tR) ecoRegenworm(c, 600, 880, 40, { houding: 'zij', t: Math.min((t - tR) * 0.8, 8), vooruit: true }); });
    naamBij(ctx, 'pissebed', '± 1,5 cm', 520 + 70 * clamp((t - tP) * 1.2, 0, 2.5), 620, q.on('Pissebedden', 1, 0.5), 'center'); naamBij(ctx, 'regenworm', '± 20 cm', 1420, 830, q.on('regenwormen', 1, 0.5), 'center');
    naamBij(ctx, 'detrituseters', 'eten dode resten', 960, 400, q.on('detrituseters', 1, 0.6), 'center', C.oker); metaText(ctx, 'vergroot ± 4×', 80, 520, C.text2, 'left', 26); },
  s14(ctx, t, q) { _sch4(ctx);
    ecoPissebed(ctx, 330, 600, 90, { t: Math.min(t * 0.3, 2), vooruit: true });
    for (let i = 0; i < 9; i++) { const a = ramp(t, q.at('uitwerpselen') - 0.4 + i * 0.25, 0.3); if (a <= 0.01) continue; e4A(ctx, a, () => { ctx.beginPath(); ctx.ellipse(240 + i * 26, 610 + (i % 2) * 8, 10, 6, 0.3, 0, 6.283); shape(ctx, '#4A3A2C', '#6E5A44', 1.5); }); }
    const z = q.on('stukjes', 1, 0.8); if (z > 0.01) zoomCircle(ctx, 1260, 480, 300 * (0.5 + 0.5 * z), 300, 600, 'uitwerpsel · vergroot', z, () => { ctx.fillStyle = '#3A2E24'; ctx.fillRect(960, 180, 600, 600); for (let i = 0; i < 40; i++) { ctx.save(); ctx.translate(1000 + hash(i) * 520, 220 + hash(i + 9) * 520); ctx.rotate(hash(i + 3) * 6 + Math.sin(t * 0.3 + i) * 0.05); ctx.fillStyle = ['#7A6A3E', '#8A7A4A', '#6A5A34'][i % 3]; ctx.fillRect(-14, -7, 28, 14); ctx.restore(); } });
    naamBij(ctx, 'detrituseter', 'maakt het blad kleiner', 520, 470, q.on('detrituseters', 1, 0.6), 'center', C.oker); },
  s15(ctx, t, q) { _sch4(ctx);
    const K = [[400, 760, 'dood blad', (c, x, y, r) => ecoEikenblad(c, x, y, r / 7, { stadium: 0.3 })], [400, 470, 'pissebed', (c, x, y, r) => ecoPissebed(c, x, y + r * 0.2, r / 1.1, { t: t * 0.4 })], [400, 200, 'spitsmuis', (c, x, y, r) => ecoSpitsmuis(c, x - r * 0.1, y + r * 0.4, r / 6, { houding: 'snuffelen', t: t * 0.5 })],
      [1100, 760, 'dood blad', (c, x, y, r) => ecoEikenblad(c, x, y, r / 7, { stadium: 0.3, hoek: 0.5 })], [1100, 470, 'regenworm', (c, x, y, r) => ecoRegenworm(c, x - r * 0.85, y + r * 0.15, r / 12, { houding: 'boven', buig: 0.6, t: t * 0.3 })], [1100, 200, 'merel', (c, x, y, r) => merel(c, x - r * 0.2, y + r * 0.55, r / 130, {})]];
    const A = [1, 1, q.on('spitsmuis', 1, 0.6), 1, 1, q.on('merel', 1, 0.6)].map((a, i) => i === 2 || i === 5 ? a : ramp(t, 0.2 + (i % 3) * 0.3, 0.5));
    const P = [[0, 1, q.on('dode', 1, 1)], [3, 4, q.on('dode', 1, 1)], [1, 2, q.on('spitsmuis', 1, 1)], [4, 5, q.on('merel', 1, 1)]];
    for (const [a, b, u] of P) { const [x1, y1] = K[a], [x2, y2] = K[b]; e4PijlG(ctx, x1, y1 - 86, x2, y2 + 86, u, C.oker, 4); }
    K.forEach(([x, y, n, f], i) => { if (A[i] <= 0.01) return; e4A(ctx, A[i], () => { circ(ctx, x, y, 80, rgba(C.fill, 0.9), C.line, 1.5); ctx.save(); ctx.beginPath(); ctx.arc(x, y, 78, 0, 6.283); ctx.clip(); f(ctx, x, y, 80); ctx.restore(); }); naamBij(ctx, n, null, x + 110, y + 12, A[i], 'left'); });
    naamBij(ctx, 'consumenten', null, 750, 640, q.on('consumenten', 1, 0.6), 'center', C.text2);
    naamBij(ctx, 'pijl: van voedsel naar eter', null, 1500, 860, q.on('voedselweb', 1, 0.6), 'center', C.oker); },
  s16(ctx, t, q) { _sch4(ctx); metaText(ctx, 'FEBRUARI', 1800, 78, C.goud, 'right', 28);
    const aM = q.on('mineralen', 1, 0.6); e4LogA(ctx, 1000, 540, 860, E4LOG.slice(0, 3), [1, 1, q.on('Intussen', 1, 0.6)], { cel: [null, null, [1, 1, 1, aM]] });
    const sn = 1 - q.on('breken', 1, 4);
    zoomCircle(ctx, 520, 450, 340, 520, 450, 'bodem onder het blad · vergroot', 1, () => e4BodemT(ctx, 520, 450, 340, t, { sn: Math.max(0.15, sn) }));
    // stoffen komen vrij uit de snipper en drijven naar hun plek
    const M = [['koolstofdioxide', 1120, e4CO2, 18, 'CO₂'], ['water', 1320, e4H2O, 16, 'water'], ['mineralen', 1520, e4Ammonium, 18, 'ammonium'], ['mineralen', 1720, e4Fosfaat, 18, 'fosfaat']];
    M.forEach(([c, x, f, r, n], i) => { const t0 = q.at(c) + (i === 3 ? 0.3 : 0), u = ramp(t, t0, 1.4); if (u <= 0.01) return; f(ctx, lerp(560, x, u), lerp(450, 230, u), r); metaText(ctx, n, x, 290, rgba(C.text2, ramp(t, t0 + 1, 0.4)), 'center', 26); });
    const aR = q.on('reducenten', 1, 0.6), aMi = q.on('mineralisatie', 1, 0.6);
    const tMi = q.at('mineralisatie'); naamBij(ctx, 'reducenten', 'schimmels en bacteriën', 1430, 400, aR * (1 - ramp(t, tMi - 0.5, 0.3)), 'center', C.text); naamBij(ctx, 'mineralisatie', 'door reducenten', 1430, 400, ramp(t, tMi - 0.15, 0.4), 'center', C.text); },
  s17(ctx, t, q) { _sch4(ctx);
    const g = clamp(0.3 + q.on('draden', 1, 2) * 0.7, 0, 1), aB = q.on('Bacteriën', 1, 0.6), tE = q.at('enzymen'), kn = q.on('knippen', 1, 1.6), op = q.on('opnemen', 1, 2);
    zoomCircle(ctx, 960, 480, 380, 960, 480, 'enzymen buiten de cel · vergroot', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(580, 100, 760, 760);
      e4Schimmel(ctx, 620, 760, 300 * g, -0.4, 4);
      if (aB > 0.01) for (let i = 0; i < 18; i++) { const w = wander(i + 20, t, 16, 0.6); e4A(ctx, aB, () => e4Bacterie(ctx, 700 + hash(i + 40) * 520 + w.x, 180 + hash(i + 60) * 160 + w.y, 16, hash(i) * 3 + t * 0.2, C.teal)); }
      // de cellulosebundel: heel tot het knippen, daarna losse stukjes die naar de draad gaan
      const heel = 1 - ramp(kn, 0.3, 0.4); e4A(ctx, heel, () => e4Keten(ctx, 760, 420, 9, 22, C.groen, 0.05));
      if (kn > 0.5) for (let i = 0; i < 9; i++) { const u = clamp(op * 1.3 - hash(i) * 0.3, 0, 1); const x0 = 760 + i * 41.8, y0 = 420 + (i % 2) * 11 + i * 2; if (u >= 1) continue; e4A(ctx, 1 - u, () => e4Keten(ctx, lerp(x0 + (i - 4) * 8 * ease(kn), 700 + i * 12, u), lerp(y0 + 30 * ease(kn - 0.5), 700, u), 1, 18, C.groen)); }
      for (const [x, y, i] of [[880, 380, 0], [1060, 400, 1]]) { const u = ramp(t, tE + i * 0.3, 1.2); if (u <= 0.01) continue; enzymKluwen(ctx, lerp(700, x, u), lerp(700, y, u), 42, { bind: ramp(t, tE + 1.4, 0.6), knip: kn, a: u }); } });
    naamBij(ctx, 'enzym', null, 960, 300, q.on('enzymen', 1, 0.6), 'center', C.goud); naamBij(ctx, 'schimmeldraad', null, 760, 780, q.on('draden', 1, 0.6), 'center'); naamBij(ctx, 'bacteriën', 'miljarden per handvol grond', 1500, 200, aB, 'left', C.teal); },
  s18(ctx, t, q) { e4Bos(ctx, { blad: false }); metaText(ctx, 'MEI', 1800, 78, C.goud, 'right', 28);
    const tW = q.at('weegt'); persoon(ctx, 'bas', 600, 900, 460, { pose: 'vasthouden', t, a: ramp(t, 0, 0.3), hold: t < tW ? (c, x, y) => e4Zakje(c, x + 20, y, 40, 26, 8, (cc) => ecoEikenblad(cc, x + 20, y, 2.2, { stadium: 0.5 })) : null });
    e4Weegschaal(ctx, 1000, 900, 220, t > tW + 0.6 ? '0,7 g' : t > tW ? '…' : '0,0 g'); if (t > tW) e4A(ctx, ramp(t, tW, 0.4), () => ecoEikenblad(ctx, 1000, 838, 5.5, { stadium: 0.5, hoek: 0.1 }));
    metaText(ctx, '± 1/3 weg', 1000, 770, rgba(C.koraal, q.on('derde', 1, 0.6)), 'center', 30);
    e4LogA(ctx, 1000, 120, 860, E4LOG, [1, 1, 1, q.on('schrijft', 1, 0.6)]); },
  s19(ctx, t, q) { _sch4(ctx);
    ecoEikenblad(ctx, 520, 470, 22, { hoek: 0.1 }); naamBij(ctx, '1,0 g', 'november', 520, 720, 1, 'center');
    pijl(ctx, 760, 470, 1100, 470, C.line, ramp(t, 0.3, 0.6), 4, 18);
    e4A(ctx, ramp(t, 0.6, 0.6), () => ecoEikenblad(ctx, 1360, 470, 22, { stadium: 0.5, hoek: 0.1 })); naamBij(ctx, '0,7 g', 'mei', 1360, 720, ramp(t, 0.6, 0.6), 'center');
    vraagteken(ctx, 1640, 330, q.on('gebleven', 1, 0.5), 110); },
  s21(ctx, t, q) { _sch4(ctx);
    e4BoomZonder(ctx, 760, 700, 3.8, { wind: 0.2, t: t * 0.4 }); ctx.fillStyle = '#3A2E24'; ctx.fillRect(0, 700, W, 200);
    lijn(ctx, [[760, 700], [770, 780], [740, 860]], '#8A6A4C', 8); lijn(ctx, [[766, 760], [880, 820], [960, 880]], '#8A6A4C', 6);
    ecoEikenblad(ctx, 1240, 790, 6, { stadium: 0.55 });
    const aO = q.on('opruimers', 1, 0.6); e4A(ctx, aO, () => { ecoPissebed(ctx, 1380, 800, 16, { t: t * 0.5 }); e4Keten(ctx, 1410, 760, 2, 7, C.groen); });
    const tC = q.at('koolstofdioxide'), uC = ramp(t, tC, 2.2); if (t > tC) { e4A(ctx, 1, () => e4CO2(ctx, lerp(1260, 1400, uC), lerp(760, 300, uC), 18)); e4PijlG(ctx, 1260, 760, 1380, 340, q.on('koolstofdioxide', 1, 1.2), ECOK.anorganisch, 3, 0.7); }
    naamBij(ctx, 'koolstofdioxide', 'in de lucht', 1420, 380, ramp(t, tC + 1.6, 0.5), 'left');
    const aBo = q.on('bodem', 1, 0.6); e4A(ctx, aBo, () => { e4H2O(ctx, 1140, 820, 11); e4Fosfaat(ctx, 1320, 850, 11); e4H2O(ctx, 600, 840, 11); });
    // één nitraatdeeltje: bodem → wortel → stam → nieuw blad, daar wordt het een eiwit
    const tV = q.at('Volg'), tE = q.at('eiwit'), aV = q.on('Volg', 1, 0.6);
    const pad = [[1080, 860], [960, 880], [770, 780], [760, 600], [770, 400], [860, 240]];
    if (aV > 0.01) { ctx.save(); ctx.globalAlpha *= aV; ctx.setLineDash([10, 10]); lijn(ctx, pad, C.goud, 2); ctx.restore();
      const u = clamp((t - tV - 0.6) / Math.max(2, tE - tV - 0.8), 0, 1), L = pad.length - 1, k = Math.min(L - 1, Math.floor(u * L)), f = u * L - k; const px = lerp(pad[k][0], pad[k + 1][0], f), py = lerp(pad[k][1], pad[k + 1][1], f);
      const eiw = q.on('eiwit', 1, 0.8); e4A(ctx, 1 - eiw, () => e4Nitraat(ctx, px, py, 16, true)); e4A(ctx, eiw, () => e4Kraal(ctx, 840, 240, 3, 9)); }
    naamBij(ctx, 'nitraat', 'de wortel in, de stam op', 1120, 830, aV, 'left', ECOK.stikstof); naamBij(ctx, 'eiwit', 'in een nieuw blad', 900, 200, q.on('eiwit', 1, 0.6), 'left', C.groen); },
  s22(ctx, t, q) { _sch4(ctx);
    e4BoomZonder(ctx, 560, 860, 3.6, { wind: 0.2, t: t * 0.4 }); ctx.fillStyle = '#3A2E24'; ctx.fillRect(0, 860, W, 40);
    const O = [[1100, 840, (c, x, y) => ecoPissebed(c, x, y, 40, { t: t * 0.4 }), 'pissebed'], [1320, 850, (c, x, y) => ecoRegenworm(c, x - 120, y, 14, { t: t * 0.3 }), 'worm'], [1580, 850, (c, x, y) => { for (let i = 0; i < 4; i++) { const w = wander(i, t, 4, 0.6); e4Bacterie(c, x + i * 30 + w.x, y - 10 - (i % 2) * 14 + w.y, 30, i); } }, 'bacterie']];
    O.forEach(([x, y, f, c]) => { f(ctx, x, y); e4WarmteOp(ctx, x, y - 70, 1.4, t, q.on(c, 1, 0.6), 260); });
    e4WarmteOp(ctx, 560, 330, 1.6, t, q.on('eik', 1, 0.6), 130);
    naamBij(ctx, 'ook de eik dissimileert', 'dag en nacht', 820, 420, q.on('eik', 1, 0.6), 'left');
    naamBij(ctx, 'warmte', 'verlaat het bos', 1340, 560, q.on('warmte', 1, 0.6), 'center', C.koraal); },
  s23(ctx, t, q) { _sch4(ctx);
    const N = [[480, 'blad', (x, y) => ecoEikenblad(ctx, x, y, 13, { stadium: 0.4 })], [960, 'mineralen', (x, y) => { e4Nitraat(ctx, x - 30, y, 18); e4Fosfaat(ctx, x + 30, y + 10, 16); }], [1440, 'eik', (x, y) => e4BoomZonder(ctx, x, y + 90, 1.1, {})]];
    N.forEach(([x, n, f], i) => { const a = ramp(t, 0.2 + i * 0.4, 0.5); e4A(ctx, a, () => { circ(ctx, x, 470, 120, rgba(C.fill, 0.9), C.line, 1.5); ctx.save(); ctx.beginPath(); ctx.arc(x, 470, 118, 0, 6.283); ctx.clip(); f(x, 470); ctx.restore(); }); naamBij(ctx, n, null, x, 650, a, 'center'); });
    e4PijlG(ctx, 610, 470, 830, 470, ramp(t, 0.8, 0.6), C.groen, 4); e4PijlG(ctx, 1090, 470, 1310, 470, ramp(t, 1.2, 0.6), C.groen, 4);
    const aE = q.on('energie', 1, 0.6); if (aE > 0.01) { const u = e4fr(t * 0.3); circ(ctx, lerp(480, 1440, u), 330, 12, rgba(C.goud, aE * Math.min(1, u * 5, (1 - u) * 5))); text(ctx, 'energie?', 960, 300, fTekst(40, 700), rgba(C.goud, aE), 'center'); }
    vraagteken(ctx, 960, 820, q.on('vind', 1, 0.5), 90); },
  s25(ctx, t, q) { _sch4(ctx);
    const P = [[960, 230, 'eik'], [1360, 620, 'blad'], [560, 620, 'bodem']]; const cu = [q.on('blad', 1, 1), q.on('bodem', 1, 1), q.on('weer', 1, 1)];
    for (let i = 0; i < 3; i++) { const [x1, y1] = P[i], [x2, y2] = P[(i + 1) % 3]; const an = Math.atan2(y2 - y1, x2 - x1); const sx = x1 + Math.cos(an) * 120, sy = y1 + Math.sin(an) * 120, ex = x2 - Math.cos(an) * 120, ey = y2 - Math.sin(an) * 120; e4PijlG(ctx, sx, sy, ex, ey, cu[i], C.groen, 5);
      if (t > q.at('weer') + 1) { const u = e4fr(t * 0.3 + i / 3); circ(ctx, lerp(sx, ex, u), lerp(sy, ey, u), 9, rgba(C.groen, Math.min(1, u * 5, (1 - u) * 5))); } }
    circ(ctx, 960, 230, 100, rgba(C.fill, 0.9), C.line, 1.5); ctx.save(); ctx.beginPath(); ctx.arc(960, 230, 98, 0, 6.283); ctx.clip(); e4BoomZonder(ctx, 960, 320, 1.1, {}); ctx.restore();
    circ(ctx, 1360, 620, 100, rgba(C.fill, 0.9), C.line, 1.5); ecoEikenblad(ctx, 1360, 620, 13, { stadium: 0.3 });
    circ(ctx, 560, 620, 100, rgba(C.fill, 0.9), C.line, 1.5); e4CO2(ctx, 520, 600, 12); e4Nitraat(ctx, 590, 600, 14); e4Fosfaat(ctx, 560, 650, 12);
    P.forEach(([x, y, n]) => naamBij(ctx, n, null, x, y + 150, 1, 'center'));
    const aL = q.on('licht', 1, 0.6); e4A(ctx, aL, () => circ(ctx, 1700, 160, 44, C.goud)); e4PijlG(ctx, 1650, 190, 1080, 240, q.on('licht', 1, 1.2), C.goud, 4); naamBij(ctx, 'licht', null, 1700, 260, aL, 'center', C.goud);
    const aW = q.on('warmte', 1, 0.6); e4WarmteOp(ctx, 1500, 860, 1.6, t, aW, 160); e4PijlG(ctx, 1420, 760, 1760, 860, q.on('warmte', 1, 1.2), C.koraal, 4); naamBij(ctx, 'warmte', null, 1660, 790, aW, 'center', C.koraal);
    haak(ctx, 460, 1460, 790, 'Stoffen gaan rond. Energie gaat één kant op.', C.groen, q.on('Energie', 1, 0.6)); },
  s26(ctx, t, q) { _sch4(ctx); metaText(ctx, 'PROEFOPZET', 960, 150, C.goud, 'center', 30);
    [[560, 'grof gaas', '5 mm · ook pissebed, worm', 60, 'grof'], [1360, 'fijn gaas', '0,5 mm · alleen microben', 12, 'fijn']].forEach(([x, n, m, maas, c]) => { const a = q.on(c, 1, 0.6), aZ = ramp(t, 0, 0.4); e4A(ctx, aZ, () => e4Zakje(ctx, x, 470, 460, 300, maas, (cc) => ecoEikenblad(cc, x, 470, 20, {}))); naamBij(ctx, n, m, x, 690, a, 'center'); metaText(ctx, '125 G BLAD', x, 290, rgba(C.text2, q.on('evenveel', 1, 0.6)), 'center', 26); });
    const tP = q.at('pissebedden'); if (t > tP - 0.3) { e4A(ctx, ramp(t, tP - 0.3, 0.3), () => ecoPissebed(ctx, 260, 560, 40, { t: Math.min((t - tP + 0.3) * 2.2, 18), vooruit: true })); }
    const tA = q.at('fijne'); if (t > tA - 0.3) e4A(ctx, ramp(t, tA - 0.3, 0.3), () => ecoPissebed(ctx, 940, 600, 40, { t: Math.min((t - tA + 0.3) * 1.2, 4), vooruit: true }));
    naamBij(ctx, 'past er niet door', null, 1080, 800, q.on('alleen', 1, 0.6), 'center', C.koraal);
    e4A(ctx, q.on('half', 1, 0.6), () => ecoSchaal(ctx, 'een half jaar in het bos, dan wegen')); },
  s27(ctx, t, q) { _sch4(ctx);
    e4StaafA(ctx, 260, 760, 1000, 500, [q.on('grafiek', 1, 1), q.on('72', 1, 1.2), q.on('36', 1, 1.2)]);
    naamBij(ctx, 'grof: 72 g weg', null, 1340, 420, q.on('72', 1, 0.6), 'left', C.oker); naamBij(ctx, 'fijn: 36 g weg', null, 1340, 500, q.on('36', 1, 0.6), 'left', C.teal);
    naamBij(ctx, 'met detrituseters ± 2× zo snel', null, 1340, 620, q.on('twee', 1, 0.6), 'left', C.groen);
    // klein maken = meer oppervlak voor de reducenten
    const aK = q.on('kleiner', 1, 0.6), sp = q.on('kleiner', 1, 1.6); if (aK > 0.01) e4A(ctx, aK, () => { for (let i = 0; i < 9; i++) { const gx = (i % 3) - 1, gy = Math.floor(i / 3) - 1; roundRect(ctx, 1500 + gx * (40 + 22 * sp) - 20, 780 + gy * (40 + 22 * sp) - 20, 40, 40, 4); shape(ctx, '#8A6A3A', '#A88A5A', 1.5); }
      const aO = q.on('oppervlak', 1, 0.6); if (aO > 0.01) for (let i = 0; i < 12; i++) { const an = i / 12 * 6.283 + t * 0.2, w = wander(i, t, 4, 0.6); e4A(ctx, aO, () => e4Bacterie(ctx, 1500 + Math.cos(an) * 120 + w.x, 780 + Math.sin(an) * 120 + w.y, 18, an)); } });
    metaText(ctx, 'meer oppervlak', 1500, 690, rgba(C.text2, q.on('oppervlak', 1, 0.6)), 'center', 24); },

  // ---------------- H3 De composthoop
  s28(ctx, t, q) { e4Tuin(ctx); e4Moestuinbak(ctx, 1400, 900, 420);
    const dk = q.on('donkere', 1, 1.5); e4Compost(ctx, 1100, 880, 520, 330, {}); if (dk > 0.01) e4A(ctx, dk * 0.7, () => vul(ctx, [[840, 880], [902, 649], [1038, 550], [1178, 563], [1308, 682], [1360, 880]], '#2E2218'));
    const tG = q.at('Gooi'); persoon(ctx, 'noor', 650, 900, 420, { pose: 'vasthouden', t, a: ramp(t, 0, 0.3), hold: t < tG + 0.4 ? (c, x, y) => e4Emmer(c, x + 10, y + 10) : (c, x, y) => e4Emmer(c, x + 10, y + 10) });
    // afval vliegt in een boog op de hoop
    for (let i = 0; i < 6; i++) { const u = clamp((t - tG - i * 0.18) / 0.9, 0, 1); if (u <= 0 || u >= 1) continue; circ(ctx, lerp(720, 1020 + i * 30, u), lerp(560, 560, u) - Math.sin(Math.PI * u) * 140, 9, ['#7A8A44', '#C98A3E', '#A0A050'][i % 3]); }
    const aW = q.on('warm', 1, 0.8); if (aW > 0.01) for (let i = 0; i < 3; i++) { const u = e4fr(t * 0.25 + i / 3); lijn(ctx, [[1060 + i * 30 + Math.sin(t + i) * 8, 540 - u * 60], [1050 + i * 30, 480 - u * 80], [1070 + i * 30 + Math.sin(t * 1.3 + i) * 10, 430 - u * 100]], rgba('#E8EEF4', 0.35 * aW * (1 - u)), 6); }
    const aT = q.on('midden', 1, 0.6), tM0 = q.at('midden'), tZ0 = q.at('zestig'), uT = ease(clamp((t - tM0) / Math.max(0.6, tZ0 + 0.3 - tM0), 0, 1)); e4A(ctx, aT, () => e4Thermometer(ctx, 1170, 640, 200, lerp(0.15, 0.8, uT), uT > 0.95 ? '60 °C' : Math.round(lerp(10, 60, uT)) + ' °C'));
    naamBij(ctx, 'composthoop', null, 1100, 470, q.on('composthoop', 1, 0.6) * (1 - aT), 'center'); },
  s29(ctx, t, q) { e4Tuin(ctx);
    e4Moestuinbak(ctx, 990, 900, 720); const gs = 0.6 + 0.4 * q.on('groente', 1, 1.5);
    for (let i = 0; i < 6; i++) { for (const d of [-1, 1]) { ctx.save(); ctx.translate(1080 + i * 110, 836); ctx.rotate(d * 0.7 + Math.sin(t + i) * 0.04); ctx.beginPath(); ctx.ellipse(d * 16 * gs, -6, 22 * gs, 11 * gs, 0, 0, 6.283); ctx.fillStyle = '#7FC48F'; ctx.fill(); ctx.restore(); } lijn(ctx, [[1080 + i * 110, 852], [1080 + i * 110, 830]], '#5FA86E', 5); }
    let hx = 760, hy = 640; persoon(ctx, 'noor', 700, 900, 420, { pose: 'vasthouden', t, a: ramp(t, 0, 0.3), hold: (c, x, y) => { hx = x; hy = y; e4Zeef(c, x + 10, y + Math.sin(t * 6) * 3 * q.on('zeeft', 1, 0.3)); } });
    const aZ = q.on('zeeft', 1, 0.5); if (aZ > 0.01) for (let i = 0; i < 14; i++) { const u = e4fr(t * 0.7 + i / 14); circ(ctx, hx + 30 + hash(i) * 90, lerp(hy + 20, 836, u), 6, rgba('#3A2A1E', aZ)); }
    const tM = q.at('mineralen'), uM = ramp(t, tM, 1.6); if (t > tM) e4Nitraat(ctx, lerp(hx + 70, 1200, uM), lerp(hy + 20, 870, uM), 16, true);
    naamBij(ctx, 'compost', 'naar de moestuin', 900, 560, q.on('compost', 1, 0.6), 'center'); naamBij(ctx, 'jonge sla', null, 1350, 770, q.on('groente', 1, 0.6), 'center'); },
  s30(ctx, t, q) { _sch4(ctx);
    const keer = q.on('toe', 1, 1.0); e4Compost(ctx, 760, 820, 900, 560, { doorsnede: true });
    for (let i = 0; i < 12; i++) { const w = wander(i, t, 10, 0.7); e4Bacterie(ctx, 600 + hash(i) * 320 + w.x, 560 + hash(i + 4) * 180 + w.y, 30, i + Math.sin(t + i) * 0.3); }
    e4WarmteOp(ctx, 760, 500, 1.6, t, q.on('warmte', 1, 0.6), 200);
    [['warm', 3], ['vochtig', 1], ['zuurstof', 1]].forEach(([n, k], i) => { const a = q.on(n, k, 0.5); e4A(ctx, a, () => { roundRect(ctx, 1360, 300 + i * 140, 400, 100, 18); shape(ctx, rgba(C.fill, 0.85), C.line, 1.5); text(ctx, n, 1560, 365 + i * 140, fTekst(44, 700), C.text, 'center'); }); });
    // de riek keert de hoop; lucht stroomt naar binnen
    e4Riek(ctx, 1150, 640, -0.5 + Math.sin(t * 2) * 0.25 * keer, keer);
    if (keer > 0.01) for (let i = 0; i < 6; i++) { const u = e4fr(t * 0.4 + i / 6); circ(ctx, lerp(300 + i * 60, 600 + i * 50, u), lerp(400, 640, u), 7, rgba('#C9D2DE', keer * Math.min(1, u * 5, (1 - u) * 5))); }
    metaText(ctx, 'DOORSNEDE · LUCHTKANALEN', 760, 880, C.text2, 'center', 26); },
  s31(ctx, t, q) { _sch4(ctx);
    e4Compost(ctx, 760, 820, 900, 560, { doorsnede: true, nat: true }); for (let i = 0; i < 8; i++) e4Bacterie(ctx, 600 + hash(i) * 320, 600 + hash(i + 4) * 160, 30, i, '#7FAFC0');
    for (let i = 0; i < 4; i++) e4Geur(ctx, 580 + i * 120, 260 - (i % 2) * 30, t, q.on('stinken', 1, 0.8));
    vraagteken(ctx, 1450, 430, q.on('oorzaak', 1, 0.5), 110); },
  s33(ctx, t, q) { _sch4(ctx);
    const nat = q.on('Water', 1, 2.0), tr = q.on('traag', 1, 1.5);
    e4Compost(ctx, 760, 820, 900, 560, { doorsnede: true }); if (nat > 0.01) for (let i = 0; i < 8; i++) { const x1 = 760 - 900 * 0.3 + i * 900 * 0.08, x2 = 760 - 900 * 0.25 + i * 900 * 0.07, y2 = 820 - 560 * 0.55; lijn(ctx, [[x1, 810], [lerp(x1, x2, nat), lerp(810, y2, nat)]], rgba(C.teal, 0.8), 9); }
    for (let i = 0; i < 8; i++) { const w = wander(i, t * (1 - 0.8 * tr), 10, 0.7); e4Bacterie(ctx, 600 + hash(i) * 320 + w.x, 600 + hash(i + 4) * 160 + w.y, 30, i, tr > 0.5 ? '#7FAFC0' : C.teal); }
    for (let i = 0; i < 4; i++) e4Geur(ctx, 580 + i * 120, 260 - (i % 2) * 30, t, q.on('stinkende', 1, 0.8));
    naamBij(ctx, 'water in de luchtkanalen', null, 760, 880, q.on('ruimtes', 1, 0.6), 'center', C.teal);
    naamBij(ctx, 'te nat: geen lucht', 'trage afbraak · stank', 1400, 480, q.on('lucht', 1, 0.6), 'left', C.koraal); },
  s34(ctx, t, q) { _sch4(ctx);
    const st = (x, kl, n, cn, h, a, ac) => { if (a <= 0.01) return; e4A(ctx, a, () => vul(ctx, [[x - 260, 760], [x - 140 - 40 * (1 - h / 300), 760 - h], [x + 140 + 40 * (1 - h / 300), 760 - h], [x + 260, 760]], kl, _lt(kl, 0.25), 2)); naamBij(ctx, n, null, x, 840, a, 'center'); metaText(ctx, cn, x, 870, rgba(C.grain, ac), 'center', 26); };
    const aG = ramp(t, 0, 0.4), aE = ramp(t, 0.2, 0.4), sG = q.on('snel', 1, 2.0), sE = q.on('traag', 1, 4.0), aC = q.on('C/N', 1, 0.6);
    st(560, '#5FA86E', 'vers gras', 'C/N ± 15', lerp(300, 110, sG), aG, aC); st(1360, '#A06C36', 'eikenblad', 'C/N ± 40–80', lerp(300, 250, sE), aE, aC);
    for (let i = 0; i < 14; i++) { const h0 = lerp(300, 110, sG), x = 440 + i * 18, y = 760 - h0 + 10 + (i % 3) * 8; lijn(ctx, [[x, y + 30], [x + 6 * Math.sin(i), y - 40 + Math.sin(t + i) * 2]], '#8FD49C', 3); }
    for (let i = 0; i < 6; i++) { const h1 = lerp(300, 250, sE); ecoEikenblad(ctx, 1260 + (i % 3) * 90, 760 - h1 + 50 + Math.floor(i / 3) * 70, 5.5, { hoek: i * 1.1, stadium: 0.1 }); }
    text(ctx, 'snel', 560, 360, fTekst(48, 700), rgba(C.groen, q.on('snel', 1, 0.5)), 'center'); text(ctx, 'traag', 1360, 360, fTekst(48, 700), rgba(C.oker, q.on('traag', 1, 0.5)), 'center');
    const aN = q.on('stikstof', 1, 0.6); for (const [x, y] of [[480, 600], [560, 560], [640, 610]]) e4A(ctx, aN * (1 - sG * 0.7), () => e4Nitraat(ctx, x, y + 150 * sG, 14)); e4A(ctx, q.on('stikstof', 2, 0.6), () => e4Nitraat(ctx, 1360, 590, 14)); },

  // ---------------- H4 Waar afbraak stopt
  s35(ctx, t, q) { const tO = q.at('Onder'), d = 480 * ease(clamp((t - tO) / 2.5, 0, 1));
    ctx.save(); ctx.translate(0, -d); e4Hoogveen(ctx); ctx.fillStyle = '#4A3A28'; ctx.fillRect(0, 900, W, 900); ctx.fillStyle = rgba(C.teal, 0.12); ctx.fillRect(0, 960, W, 840);
    for (let i = 0; i < 40; i++) lijn(ctx, [[hash(i) * W, 920 + hash(i + 5) * 760], [hash(i) * W + 30, 925 + hash(i + 5) * 760]], rgba('#C9A86A', 0.35), 2);
    for (let i = 0; i < 12; i++) { const u = e4fr(t * 0.08 + hash(i)); circ(ctx, 200 + hash(i + 9) * 1500, lerp(1600, 1000, u), 5, rgba('#AFC0D0', 0.4 * (1 - u))); }
    const aR = q.on('Reducenten', 1, 0.6); if (aR > 0.01) for (let i = 0; i < 6; i++) e4A(ctx, aR * 0.6, () => e4Bacterie(ctx, 500 + i * 180, 1200 + (i % 2) * 60, 26, i, '#7FAFC0'));
    ctx.restore();
    const lab = 1 - ramp(t, tO, 0.5); naamBij(ctx, 'hoogveen', 'nat · zuur · zuurstofarm', 960, 300, q.on('hoogveen', 1, 0.6) * lab, 'center'); naamBij(ctx, 'veenmos', null, 520, 700, q.on('Veenmos', 1, 0.6) * lab, 'center'); naamBij(ctx, 'wollegras', null, 1460, 640, q.on('Veenmos', 1, 0.6) * lab, 'center');
    const aZ = q.on('zuurstof', 2, 0.6); naamBij(ctx, 'geen zuurstof · zuur water', null, 960, 300, aZ, 'center', C.koraal); naamBij(ctx, 'reducenten kunnen bijna niets', null, 960, 360, q.on('Reducenten', 1, 0.6), 'center', C.text2); },
  s36(ctx, t, q) { _sch4(ctx);
    e4VeenDoorsnede(ctx, 300, 160, 1000, 700); const gm = 0.5 + 0.5 * Math.sin(t * 0.8); ctx.fillStyle = '#7E8A4E'; ctx.fillRect(300, 152 - 6 * ramp(t, 0, 2), 1000, 8 + 6 * ramp(t, 0, 2));
    const tM = q.at('millimeter'), tD = q.at('meter', 2), u = clamp((t - tM) / Math.max(1.5, tD - tM), 0, 1), yM = 160 + 700 * u;
    ['nu', '± 200 jaar', '± 400 jaar', '± 600 jaar', '± 800 jaar', '± 1000 jaar'].forEach((n, i) => { const y = 160 + (i + 0.6) * 700 / 6; metaText(ctx, n, 1340, y, rgba(C.text2, i === 0 ? 1 : clamp((yM - y + 80) / 60, 0, 1)), 'left', 26); });
    if (t > tM) { lijn(ctx, [[300, yM], [1300, yM]], C.goud, 2); metaText(ctx, Math.round(u * 1000) + ' jaar terug', 800, yM - 12, C.goud, 'center', 24); }
    const aS = q.on('meter', 2, 0.6); lijn(ctx, [[260, 160], [260, lerp(160, 860, q.on('meter', 2, 1.2))]], rgba(C.goud, aS), 3); metaText(ctx, '± 1 M', 240, 520, rgba(C.goud, aS), 'right', 28);
    naamBij(ctx, '± 1 mm per jaar', null, 800, 120, q.on('millimeter', 1, 0.6), 'center', C.goud); naamBij(ctx, 'plantenresten stapelen zich op', null, 800, 120, q.on('stapelen', 1, 0.6) * (1 - q.on('millimeter', 1, 0.4)), 'center', C.text2); },
  s37(ctx, t, q) { _sch4(ctx);
    e4VeenDoorsnede(ctx, 160, 160, 760, 700); const z = q.on('lichaam', 1, 1.0);
    if (z > 0.01) zoomCircle(ctx, 1360, 480, 320 * (0.5 + 0.5 * z), 600, 700, 'yde · ± 2000 jaar in het veen', z, () => { ctx.fillStyle = '#3A2E24'; ctx.fillRect(1040, 160, 640, 640); e4Yde(ctx, 1400, 520, 2.2); });
    if (z > 0.01) circ(ctx, 600, 700, 16, null, rgba(C.goud, z), 2);
    naamBij(ctx, 'gevonden in het jaar 1897', 'turfstekers bij Yde (Drenthe)', 1360, 120, q.on('1897', 1, 0.6), 'center'); },
  s38(ctx, t, q) { _sch4(ctx);
    e4VeenDoorsnede(ctx, 160, 160, 760, 700); circ(ctx, 600, 700, 16, null, C.goud, 2);
    zoomCircle(ctx, 1360, 480, 320, 600, 700, 'yde · ± 2000 jaar in het veen', 1, () => { ctx.fillStyle = '#3A2E24'; ctx.fillRect(1040, 160, 640, 640); e4Yde(ctx, 1400, 520, 2.2); });
    vraagteken(ctx, 1760, 220, q.on('bewaard', 1, 0.5), 100); },
  s40(ctx, t, q) { _sch4(ctx);
    [['nat', 1], ['zuur', 1], ['zuurstof', 1]].forEach(([c, k], i) => { const a = q.on(c, k, 0.5), n = ['nat', 'zuur', 'geen zuurstof'][i]; e4A(ctx, a, () => { roundRect(ctx, 140 + i * 340, 240, 300, 120, 18); shape(ctx, rgba(C.fill, 0.85), C.line, 1.5); text(ctx, n, 290 + i * 340, 315, fTekst(44, 700), C.text, 'center'); }); });
    haak(ctx, 140, 1100, 380, 'Afbraak staat bijna stil.', C.goud, q.on('niets', 1, 0.6));
    const aT = q.on('drogen', 1, 0.6), dr = q.on('drogen', 1, 2), aL = q.on('lucht', 1, 0.8), aB = q.on('breekt', 1, 0.8);
    e4A(ctx, aT, () => { roundRect(ctx, 1320, 520, 360, 240, 14); shape(ctx, dr > 0.5 ? '#6A523A' : '#3E2E20', '#6E5A44', 2); for (let i = 0; i < 14; i++) circ(ctx, 1350 + hash(i) * 300, 550 + hash(i + 7) * 180, 9 * aL, '#2A2018');
      for (let i = 0; i < 6; i++) { const w = wander(i, t, 6, 0.6); e4A(ctx, aB, () => e4Bacterie(ctx, 1360 + hash(i + 30) * 280 + w.x, 560 + hash(i + 40) * 160 + w.y, 28, i)); }
      if (aL > 0.01) for (let i = 0; i < 4; i++) { const u = e4fr(t * 0.5 + i / 4); circ(ctx, lerp(1240, 1400 + i * 50, u), 600 + i * 40, 6, rgba('#C9D2DE', aL * Math.min(1, u * 5, (1 - u) * 5))); } });
    naamBij(ctx, 'turf', 'droog · lucht · weer afbraak', 1500, 830, q.on('turf', 1, 0.6), 'center'); },
  s41(ctx, t, q) { _sch4(ctx);
    // eerst licht aan het oppervlak, dan de diepte in
    const aO = 1 - q.on('oceaan', 1, 1.2); e4A(ctx, aO, () => { zon(ctx, 960, 260, 60, 1, t); ctx.fillStyle = rgba(C.teal, 0.35); ctx.fillRect(0, 520, W, 360); for (let i = 0; i < 5; i++) e4PijlG(ctx, 760 + i * 100, 360, 760 + i * 100, 500, 1, C.goud, 3); });
    const z = q.on('bronnen', 1, 1.0);
    if (z > 0.01) zoomCircle(ctx, 960, 450, 330 * (0.5 + 0.5 * z), 960, 450, 'hete bron in de diepzee · ± 2500 m diep', z, () => e4RokerT(ctx, 960, 450, 330, t, q.on('bacteriën', 1, 0.8), q.on('zwavelwaterstof', 1, 0.8)));
    naamBij(ctx, 'zwavelwaterstof', 'uit de bron', 1330, 300, q.on('zwavelwaterstof', 1, 0.6), 'left'); naamBij(ctx, 'bacteriën', 'energie uit een reactie', 1330, 560, q.on('reactie', 1, 0.6), 'left', C.goud); naamBij(ctx, 'geen licht', null, 590, 220, q.on('onder', 1, 0.6) * z, 'right', C.text2); },
  s42(ctx, t, q) { _sch4(ctx);
    const w = Math.sin(t * 0.7) * 0.04; e4Bacterie(ctx, 960, 470, 260, 0.1 + w, C.teal);
    const aE = q.on('energie', 1, 0.6); if (aE > 0.01) for (let i = 0; i < 5; i++) { const u = e4fr(t * 0.35 + i / 5); circ(ctx, lerp(700, 930, u), lerp(260, 450, u), 7, rgba('#E8D86A', aE * Math.min(1, u * 5, (1 - u) * 5))); }
    const tC = q.at('koolstofdioxide'), uC = e4fr(Math.max(0, t - tC) * 0.35); const aC = q.on('koolstofdioxide', 1, 0.6);
    e4A(ctx, aC, () => { e4CO2(ctx, 560, 460, 22); if (t > tC + 0.5) e4CO2(ctx, lerp(560, 900, uC), lerp(460, 470, uC), 16); }); e4PijlG(ctx, 620, 460, 820, 470, aC, ECOK.anorganisch, 4);
    const aOr = q.on('organische', 1, 0.6); e4A(ctx, aOr, () => e4Keten(ctx, 1220, 470, 3, 18, C.groen, Math.sin(t) * 0.05)); e4PijlG(ctx, 1100, 470, 1200, 470, aOr, C.groen, 4);
    const aL = q.on('licht', 1, 0.6); e4A(ctx, aL, () => { circ(ctx, 1500, 220, 40, null, C.goud, 3); for (let k = 0; k < 8; k++) { const a = k / 8 * 6.283; lijn(ctx, [[1500 + Math.cos(a) * 52, 220 + Math.sin(a) * 52], [1500 + Math.cos(a) * 70, 220 + Math.sin(a) * 70]], C.goud, 3); } }); lijn(ctx, [[1440, 280], [lerp(1440, 1560, q.on('licht', 1, 0.8)), lerp(280, 160, q.on('licht', 1, 0.8))]], rgba(C.koraal, aL), 6); metaText(ctx, 'GEEN LICHT NODIG', 1500, 330, rgba(C.text2, aL), 'center', 26);
    naamBij(ctx, 'CO₂', null, 560, 530, aC, 'center'); naamBij(ctx, 'organische stof', null, 1270, 530, aOr, 'center', C.groen);
    naamBij(ctx, 'chemo-autotroof', 'energie uit een reactie · koolstof uit CO₂', 960, 760, q.on('chemo', 1, 0.6), 'center', C.groen); },

  // ---------------- Samenvatting
  s43(ctx, t, q) { _sch4(ctx);
    const rg = [['11 nov', '1,0 g', 'valt van de eik', null], ['mei', '0,7 g', 'gewogen', _vrij], ['jaar 2', '0,4 g', '', _vrij], ['jaar 3', '0,1 g', '', _vrij]];
    e4LogA(ctx, 100, 140, 1040, rg, [1, 1, q.on('paar', 1, 0.6), ramp(t, q.at('weg') - 0.2, 0.6)]);
    metaText(ctx, 'MODEL: AFRONDING', 120, 880, rgba(C.text2, q.on('paar', 1, 0.6)), 'left', 26);
    const aB = q.on('evenveel', 1, 0.6); if (aB > 0.01) e4A(ctx, aB, () => { const an = 0.12 * (1 - ramp(t, q.at('evenveel') + 0.8, 1.5)) * Math.cos((t - q.at('evenveel')) * 2); const n = Math.min(4, Math.floor(ramp(t, q.at('evenveel'), 1.2) * 4.99));
      const [L, R] = e4Balans(ctx, 1540, 520, an, n, n); naamBij(ctx, 'nieuw blad', null, 1380, 600, 1, 'center'); naamBij(ctx, 'oud blad weg', null, 1700, 600, 1, 'center'); });
    naamBij(ctx, 'de laag blijft dun', null, 1540, 360, q.on('dun', 1, 0.6), 'center', C.groen); },
  s44(ctx, t, q) { e4Bos(ctx, { blad: false }); metaText(ctx, 'MEI', 1800, 78, C.goud, 'right', 28);
    e4BoomZonder(ctx, 1200, 860, 6.0, { wind: 0.25, t: t * 0.4 }); const aN = q.on('dit', 1, 0.6);
    e4A(ctx, aN, () => { e4Nitraat(ctx, 1160, 200, 22, true); circ(ctx, 1160, 200, 34 + 4 * Math.sin(t * 3), null, rgba(C.goud, 0.6), 2); }); naamBij(ctx, 'nitraat van vorig jaar', 'in een nieuw blad', 1240, 130, aN, 'left', ECOK.stikstof);
    const tA = q.at('Alleen'), neer = t > tA; persoon(ctx, 'bas', 600, 900, 460, { pose: neer ? 'staan' : 'vasthouden', t, a: ramp(t, 0, 0.3), hold: neer ? null : (c, x, y) => e4Zakje(c, x + 20, y, 40, 26, 8, (cc) => ecoEikenblad(cc, x + 20, y, 2.2, {})) });
    if (neer) e4A(ctx, ramp(t, tA, 0.4), () => e4Zakje(ctx, 790, 885, 40, 26, 8, (c) => ecoEikenblad(c, 790, 885, 2.2, {}))); naamBij(ctx, 'nieuw zakje', '± 15 cm', 820, 830, ramp(t, tA + 0.3, 0.5), 'left'); },
});
