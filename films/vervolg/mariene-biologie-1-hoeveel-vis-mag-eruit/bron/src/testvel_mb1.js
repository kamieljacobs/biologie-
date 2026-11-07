// testvel mb1: alle nieuwe objecten op navy, met naam eronder
const naam = (ctx, s, x, y) => { ctx.save(); ctx.font = '500 22px "IBM Plex Mono",monospace'; ctx.fillStyle = '#9AA6BA'; ctx.textAlign = 'center'; ctx.fillText(s, x, y); ctx.restore(); };
const kop = (ctx, s) => { ctx.save(); ctx.font = '700 30px system-ui'; ctx.fillStyle = '#C9B896'; ctx.fillText(s, 40, 46); ctx.restore(); };
const T = 1.3;

function vel1() { const ctx = c1.getContext('2d'); bg(ctx, 'schema'); kop(ctx, 'VEL 1 · VISSEN OP SCHAAL (1 cm = 9 px) · schol 30 cm, haring 30 cm, kabeljauw 80 cm');
  const cm = 9;
  schol(ctx, 330, 260, 30 * cm, { t: T }); naam(ctx, 'schol 30 cm (ogenzijde, kop rechts)', 330, 400);
  schol(ctx, 800, 260, 30 * cm, { t: T, kijk: -1, oor: true }); naam(ctx, 'kijk -1 (180°) + stipje otoliet', 800, 400);
  haring(ctx, 1250, 260, 30 * cm, { t: T }); naam(ctx, 'haring 30 cm', 1250, 400);
  kabeljauw(ctx, 1500, 560, 80 * cm, { t: T }); naam(ctx, 'kabeljauw 80 cm', 1500, 700);
  schol(ctx, 330, 560, 60 * 6, { t: T, goud: true }); naam(ctx, 'schol, goud omlijnd (gevolgd)', 330, 700);
  // schol op de meetplank
  meetplank(ctx, 120, 880, 12, 40, 1, { mark: 30 }); schol(ctx, 120 + 15 * 12, 870, 30 * 12, { t: T, stil: true }); naam(ctx, 'meetplank 40 cm, schol 30 cm (1 cm = 12 px)', 360, 1040);
  for (let i = 0; i < 6; i++) scholIcoon(ctx, 900 + i * 60, 900, 1.25, 1, { goud: i > 3, kijk: i % 2 ? -1 : 1 }); naam(ctx, 'scholIcoon (25 ton) · goud = nieuw', 1050, 960);
  persoon(ctx, 'sam', 1700, 1040, 300, { t: T, outfit: 'buiten', kijk: -1 }); naam(ctx, 'Sam buiten (h 300)', 1700, 1070);
  persoon(ctx, 'marien', 1830, 1040, 290, { t: T, outfit: 'boord', kijk: -1 });
}
function vel2() { const ctx = c2.getContext('2d'); bg(ctx, 'schema'); kop(ctx, 'VEL 2 · OTOLIET (groot) · BINNENOOR · BINOCULAIR · ZOOMCIRKEL');
  otoliet(ctx, 330, 300, 220, { n: 4, goud: 1, lees: 1 }); naam(ctx, 'otoliet 4 winters (goud geteld, leeslijn)', 330, 500);
  otoliet(ctx, 820, 300, 220, { n: 6 }); naam(ctx, 'otoliet 6 winters', 820, 500);
  otoliet(ctx, 1250, 300, 150, { n: 4, toon: 0.5 }); naam(ctx, 'opbouw: 2 van 4 ringen', 1250, 500);
  binnenoor(ctx, 1640, 300, 1.2, 1, { goud: true }); naam(ctx, 'binnenoor: grootste paar (sagitta) goud', 1640, 500);
  binoculair(ctx, 260, 980, 1.1); naam(ctx, 'binoculair', 260, 1020);
  schol(ctx, 760, 800, 360, { t: T, oor: true, kijk: 1 }); const p = scholOor(760, 800, 360, 1); zoomCircle(ctx, 1080, 720, 150, p.x, p.y, 'binnenoor · paar millimeter', 1, () => binnenoor(ctx, 1080, 720, 0.85, 1, { goud: true }));
  naam(ctx, 'zoomcirkel vanaf het stipje in de kop', 900, 1020);
  sorteerband(ctx, 1300, 760, 560, 1, T); for (let i = 0; i < 4; i++) schol(ctx, 1380 + i * 130, 820, 120, { t: T, kijk: i % 2 ? -1 : 1, rot: (i - 1.5) * 0.15 }); naam(ctx, 'sorteerband met vangst', 1580, 1020);
}
function vel3() { const ctx = c3.getContext('2d'); bg(ctx, 'schema'); kop(ctx, 'VEL 3 · MODELZEE · GRAFIEKEN · KAARTEN · BOOT EN NET · SLAGBOOM');
  modelZee(ctx, 60, 120, 380, 260, { n: 200, nieuw: 80, t: T, ton: '200 TON' }); modelZee(ctx, 480, 120, 380, 260, { n: 500, nieuw: 125, t: T, ton: '500 TON' });
  sCurve(ctx, 960, 120, 380, 240, 1); heuvel(ctx, 1440, 130, 400, 230, 1, 1, { band: 1, punten: [[200, 1, C.oker, '80'], [500, 1, C.goud, '125'], [800, 1, C.oker, '80']] });
  zeeKaart(ctx, 60, 470, 560, 400, VIEW_NZ, 1, { teken: (P) => { const [x, y] = P(3, 56); biomassaBlok(ctx, x, y, 2000000, 1, { max: 160 }); } }); naam(ctx, 'Noordzee + haringblok 2 mln ton', 340, 900);
  zeeKaart(ctx, 660, 470, 560, 400, VIEW_AT, 1); naam(ctx, 'Noord-Atlantische Oceaan', 940, 900);
  zeeKaart(ctx, 1260, 470, 300, 400, VIEW_NF, 1, { teken: (P) => { const [x, y] = P(-52, 49); kabeljauw(ctx, x, y, 140, {}); } }); naam(ctx, 'Newfoundland', 1410, 900);
  kotter(ctx, 1740, 600, 0.7, 1, { t: T }); visnet(ctx, 1640, 760, 220, 120, 1); naam(ctx, 'kotter + net', 1740, 900);
  slagboom(ctx, 120, 1060, 0, 1, { L: 200 }); slagboom(ctx, 420, 1060, 1, 1, { L: 200 }); jaarTeller(ctx, 700, 1010, 2); routeStap(ctx, 1100, 950, 300, 'ADVIES', C.goud); modelLabel(ctx, 1460, 1010); tafel(ctx, 1720, 990, 260);
}
function alles() { vel1(); vel2(); vel3(); }
document.fonts.ready.then(() => { const wacht = () => (DECOR_IMG.schip && DECOR_IMG.schip.complete) ? alles() : setTimeout(wacht, 50); wacht(); });
