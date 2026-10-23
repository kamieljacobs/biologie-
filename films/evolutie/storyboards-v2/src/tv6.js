const TV6 = {
  paarden(ctx) { macroNacht(ctx, { horizon: 520 }); metaText(ctx, 'TESTVEL FILM 6 · PAARD, MUIL-EEZEL, EZEL · SCHAAL 2,4 PX/CM', 80, 70, C.text2);
    const g = 860, s = 2.4; paard(ctx, 360, g, s); muilezel(ctx, 960, g, s); ezel(ctx, 1520, g, s);
    evoSchaal(ctx, 'schofthoogte: paard 160 · muilezel 130 · ezel 110 cm'); },
  ezelGroot(ctx) { macroNacht(ctx, { horizon: 600 }); ezel(ctx, 900, 1000, 6.5); },
  paardGroot(ctx) { macroNacht(ctx, { horizon: 600 }); paard(ctx, 800, 1060, 4.6); },
  vissen(ctx) { ctx.fillStyle = '#1B3550'; ctx.fillRect(0, 0, W, H); metaText(ctx, 'TESTVEL FILM 6 · PUNDAMILIA · KAART', 80, 70, C.text2);
    cichlide(ctx, 380, 260, 3, { vorm: 'blauw' }); cichlide(ctx, 900, 260, 3, { vorm: 'rood' }); cichlide(ctx, 1400, 260, 3, { vorm: 'vrouw' });
    kaartBarriere(ctx, 200, 560, 640, 360, { stippen: [[0.25, 0.4, EVO.a1], [0.3, 0.6, EVO.a1], [0.7, 0.4, EVO.a2], [0.75, 0.6, EVO.a2]] });
    kaartBarriere(ctx, 980, 560, 640, 360, { soort: 'berg' });
    for (let i = 0; i < 6; i++) { chromosoom(ctx, 1700 + (i % 2) * 30, 620 + Math.floor(i / 2) * 90, 70 - i * 6, i % 2 ? '#5A4A8A' : '#A392D6'); } },
};
