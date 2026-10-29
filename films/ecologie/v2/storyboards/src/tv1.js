// Testvel film 1 Ecologie v2 — nieuwe tekeningen uit teken_eco1.js (vervangt de kopie uit de evolutiereeks)
const TV1 = {
  vel(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, 'TESTVEL ECOLOGIE 1 · NIEUWE TEKENINGEN', 80, 60, C.text2);
    e1Veldmuis(ctx, 220, 260, 16, {}); e1Veldmuis(ctx, 520, 260, 16, { houding: 'rennen', t: 0.25 }); e1Veldmuis(ctx, 800, 260, 16, { houding: 'zit' }); e1Veldmuis(ctx, 1020, 260, 16, { jong: true });
    metaText(ctx, 'veldmuis · kop-romp 10 cm, staart 3,5 cm · 16 px/cm', 80, 320, C.text2, 'left', 26);
    e1Stomp(ctx, 1400, 360, 2.4, {}); e1Kist(ctx, 1750, 360, 2.2, {});
    e1Wilg(ctx, 200, 1000, 0.75, {}); e1Wilg(ctx, 600, 1000, 0.75, { knot: true });
    e1Burcht(ctx, 1100, 860, 0.6, { doorsnede: true, bewoners: (x, y) => ecoBever(ctx, x, y, 1.0, { houding: 'staan' }) });
    e1Riet(ctx, 1500, 1000, 1, {}); e1Stuw(ctx, 1780, 860, 0.7, {}); e1Telefoon(ctx, 1600, 600, 2);
    e1Profiel(ctx, 1500, 450, 300, 90, 3, C.text); e1Icoon(ctx, 1860, 500, 30, { merk: true });
  },
  vel2(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, 'TESTVEL ECOLOGIE 1 · MAAT EN SCHEMA', 80, 60, C.text2);
    persoon(ctx, 'gerrit', 260, 900, 330, { outfit: 'gewoon' }); ecoBever(ctx, 520, 900, 1.83, { houding: 'staan' }); e1Veldmuis(ctx, 700, 900, 1.83, {}); e1Stomp(ctx, 820, 900, 1.83, { val: false });
    metaText(ctx, 'zelfde schaal: 1,83 px/cm', 80, 960, C.text2, 'left', 26);
    e1Popcirkel(ctx, 1350, 330, 120, { getallen: ['120', '10', '60', '30'] });
    e1KaartMarkermeer(ctx, 1000, 600, 0.5); e1Oeverlint(ctx, 1480, 700, 380, 9, {});
    e1Piramide(ctx, 1650, 1040, [60, 40, 28, 18], { bh: 34, sc: 2 });
  }
};
