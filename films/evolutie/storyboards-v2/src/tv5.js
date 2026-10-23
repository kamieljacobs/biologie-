const TV5 = {
  vel(ctx) {
    ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, 'TESTVEL FILM 5', 80, 60, C.text2);
    jachtluipaard(ctx, 520, 560, 0.9);
    pingelapKaart(ctx, 1400, 300, 0.7);
    sikkelcel(ctx, 1100, 800, 40, 0.2); rodeBloedcel(ctx, 1260, 800, 40, 0, 0);
    flessenhals(ctx, 1600, 800, 1);
    reservaat(ctx, 100, 760, 300, 200, { naam: 'reservaat' }); luipaardIcoon(ctx, 250, 920, 0.14);
    for (let i = 0; i < 10; i++) telpop(ctx, 500 + i * 50, 960, 80, i === 3 ? C.text2 : C.oker);
    genotypeBalk(ctx, 1100, 960, 600, 0.6);
  },
  macro(ctx) { atolMacro(ctx, { storm: 0 }); },
  luipaard(ctx) { macroNacht(ctx); jachtluipaard(ctx, 960, 900, 1.2); },
  grafiek(ctx) { frequentieGrafiek(ctx, 200, 850, 700, 600, DRIFT.klein, { titel: '10 dieren' }); frequentieGrafiek(ctx, 1100, 850, 700, 600, DRIFT.groot, { titel: '1000 dieren' }); },
};
