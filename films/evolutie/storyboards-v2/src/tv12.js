// Testvel film 12 'Hoe werden we mens?' — alle nieuwe tekeningen los (23 okt 2026)
function tv12bg(ctx, titel) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, 'TESTVEL 12 · ' + titel, 60, 56, C.text2); }
function tv12grond(ctx, x1, x2, y) { lijn(ctx, [[x1, y], [x2, y]], C.line, 2); }
const TV12 = {
  mensen(ctx) { tv12bg(ctx, 'MENSACHTIGEN OP SCHAAL (1 CM = 3,4 PX) · STAAN'); const g = 900, k = 3.4; tv12grond(ctx, 60, 1860, g);
    chimp(ctx, 200, g, 3.4 / 1.07 * 1.0, { houding: 'rechtop' }); naamBij(ctx, 'chimpansee', 'rechtop ±1,2 m', 200, g + 50, 1, 'center');
    e12Mens(ctx, 'afarensis', 470, g, 107 * k); naamBij(ctx, 'afarensis', 'Lucy 107 cm', 470, g + 50, 1, 'center');
    e12Mens(ctx, 'erectus', 760, g, 175 * k); naamBij(ctx, 'erectus', '175 cm', 760, g + 50, 1, 'center');
    e12Mens(ctx, 'neanderthaler', 1060, g, 165 * k); naamBij(ctx, 'neanderthaler ♂', '165 cm', 1060, g + 50, 1, 'center');
    e12Mens(ctx, 'neanderthalerV', 1320, g, 155 * k); naamBij(ctx, 'neanderthaler ♀', '155 cm', 1320, g + 50, 1, 'center');
    e12Mens(ctx, 'sapiens', 1560, g, 172 * k); naamBij(ctx, 'sapiens', '172 cm', 1560, g + 50, 1, 'center');
    e12Mens(ctx, 'floresiensis', 1770, g, 106 * k); naamBij(ctx, 'floresiensis', '106 cm', 1770, g + 50, 1, 'center');
    },
  koppen(ctx) { tv12bg(ctx, 'KOPPEN GROOT'); const g = 1040; const lijst = ['afarensis', 'erectus', 'neanderthaler', 'neanderthalerV', 'sapiens', 'floresiensis']; lijst.forEach((s, i) => { const x = 180 + i * 310; e12Mens(ctx, s, x, g + 900, 1500 * (E12_SOORT[s].H / 170)); naamBij(ctx, s, null, x, 120, 1, 'center'); }); },
  poses(ctx) { tv12bg(ctx, 'HOUDINGEN'); const g = 880, h = 520; tv12grond(ctx, 60, 1860, g);
    e12Mens(ctx, 'neanderthaler', 200, g, h, { pose: 'loop', t: 0 }); e12Mens(ctx, 'neanderthaler', 520, g, h, { pose: 'loop', t: 0.25 }); e12Mens(ctx, 'neanderthaler', 840, g, h, { pose: 'boule' });
    e12Mens(ctx, 'neanderthaler', 1180, g, h, { pose: 'kniel', hold: (c, x, y) => e12Handbijl(c, x + 10, y, 50, { rot: 0.8 }) }); e12Mens(ctx, 'neanderthalerV', 1480, g, h, { pose: 'zit' });
    e12Mens(ctx, 'afarensis', 1760, g, 330, { pose: 'loop', t: 0.1 });
    ['loop 0', 'loop 0,25', 'boule (fout)', 'kniel', 'zit', 'afarensis loop'].forEach((n, i) => naamBij(ctx, n, null, [200, 520, 840, 1180, 1480, 1760][i], g + 50, 1, 'center')); },
  schedels(ctx) { tv12bg(ctx, 'SCHEDELS (ZIJAANZICHT, ZELFDE SCHAAL: LENGTE NEANDERTHALER 208 MM)'); ['chimp', 'afarensis', 'erectus', 'neanderthaler', 'sapiens'].forEach((s, i) => { e12Schedel(ctx, s, 220 + i * 370, 380, 0.95, { nadruk: C.paars }); naamBij(ctx, s, null, 220 + i * 370, 560, 1, 'center'); });
    [[400, 'chimp'], [450, 'afarensis'], [1000, 'erectus'], [1500, 'neander'], [1350, 'sapiens']].forEach(([v, n], i) => e12Cilinder(ctx, 220 + i * 370, 980, v, { schaal: 0.18, label: null })); },
  dingen(ctx) { tv12bg(ctx, 'VOORWERPEN'); e12AsVlak(ctx, 60, 120, 700, 420); for (let i = 0; i < 4; i++) e12Voetafdruk(ctx, 160 + i * 150, 330 + (i % 2) * 70, 110, 1.57, { links: i % 2 === 0 }); e12Voetafdruk(ctx, 680, 260, 110, 1.57, { aap: true });
    e12Handbijl(ctx, 900, 330, 220); e12Speer(ctx, 1050, 480, 1500, 200); e12Vuur(ctx, 1700, 500, 1.2); e12Pyriet(ctx, 1000, 520, 1); e12Klauw(ctx, 1150, 560, 1.3, 0.3); e12Vingerbot(ctx, 1350, 560, 1.5);
    e12Grotwand(ctx, 80, 640, 520, 340); e12Handafdruk(ctx, 330, 800, 1, 0.1); e12BotDNA(ctx, 820, 800, 1.2); e12Genoom(ctx, 1300, 990, 560, { pDen: 0.01, h: 300 }); },
  kaart(ctx) { tv12bg(ctx, 'KAART + STRUIK'); const K = e12Kaart(ctx, 60, 100, 900, 560, { lon: [-20, 150], lat: [-45, 66] });
    e12Gebied(ctx, K, [[-10, 43], [-8, 52], [5, 55], [30, 54], [50, 52], [70, 52], [88, 52], [85, 44], [60, 36], [40, 31], [30, 33], [15, 38], [0, 37]], C.oker);
    e12Route(ctx, K, [[38, 8], [43, 14], [46, 26], [60, 32], [80, 25], [105, 12], [125, -10], [134, -22]], C.teal);
    e12Struik(ctx, 1040, 120, 760, 600, { markeer: ['neanderthaler'] });
    e12Splitsing(ctx, 1100, 840, 500, 120, { vraag: true }); },
  scenes(ctx) { ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); ctx.save(); ctx.scale(0.5, 0.5); e12Steppe(ctx); e12Mens(ctx, 'neanderthaler', 700, 900, 520, { pose: 'loop', t: 0.1, hold: (c, x, y) => e12Speer(c, x - 200, y + 120, x + 200, y - 160, { w: 7 }) }); e12Mens(ctx, 'neanderthalerV', 1100, 900, 490); ctx.restore();
    ctx.save(); ctx.translate(960, 0); ctx.scale(0.5, 0.5); e12Savanne(ctx); e12Mens(ctx, 'afarensis', 700, 860, 330, { pose: 'loop', t: 0.3 }); e12Mens(ctx, 'afarensis', 1000, 860, 450, { pose: 'loop', t: 0.6 }); ctx.restore();
    ctx.save(); ctx.translate(0, 540); ctx.scale(0.5, 0.5); e12Steppe(ctx); e12Vuur(ctx, 960, 880, 1.4); e12Mens(ctx, 'erectus', 600, 900, 560, { pose: 'draag', hold: (c, x, y) => e12Handbijl(c, x, y, 70, { rot: 1.2 }) }); ctx.restore();
    ctx.save(); ctx.translate(960, 540); ctx.scale(0.5, 0.5); e12Savanne(ctx); e12Mens(ctx, 'sapiens', 700, 900, 560, { pose: 'loop', t: 0.4 }); e12Mens(ctx, 'neanderthaler', 1100, 900, 540, { kijk: -1, uit: 'praat' }); ctx.restore(); }
};
