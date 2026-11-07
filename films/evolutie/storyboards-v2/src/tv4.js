const TV4 = {
  dieren(ctx) { macroNacht(ctx, { horizon: 560 }); metaText(ctx, 'TESTVEL FILM 4 · WOLF EN HONDEN · SCHAAL 4 PX/CM', 80, 70, C.text2);
    const g = 860, s = 4;
    wolf(ctx, 420, g, s); hond(ctx, 'herder', 920, g, s); hond(ctx, 'teckel', 1260, g, s); hond(ctx, 'mops', 1500, g, s); hond(ctx, 'chihuahua', 1720, g, s);
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; for (const [xx, hh] of [[420, 80], [920, 62], [1260, 23], [1500, 29], [1720, 20]]) { ctx.beginPath(); ctx.moveTo(xx + 260 * (hh / 80) * 0 + 0, g); ctx.stroke(); }
    evoSchaal(ctx, 'schofthoogte: wolf 80 · herder 62 · teckel 23 · mops 29 · chihuahua 20 cm');
  },
  wolfGroot(ctx) { macroNacht(ctx, { horizon: 600 }); wolf(ctx, 900, 900, 9); },
  micro(ctx) { bg(ctx, 'micro'); metaText(ctx, 'TESTVEL FILM 4 · BACTERIËN', 80, 70, C.text2);
    bacterie(ctx, 400, 300, 360, -0.2, { type: 'gevoelig', seed: 2 }); bacterie(ctx, 1000, 300, 360, 0.15, { type: 'resistent', plasmide: 2, seed: 4, focus: true });
    bacterie(ctx, 1550, 300, 300, 0, { type: 'gevoelig', deling: 0.7, seed: 6 }); bacterie(ctx, 400, 650, 300, 0.3, { type: 'gevoelig', dood: 1 });
    pilus(ctx, 1080, 640, 1400, 680, 0.45, 16); bacterie(ctx, 950, 640, 260, 0, { type: 'resistent', plasmide: 1, zweep: false }); bacterie(ctx, 1540, 690, 260, 0.1, { type: 'gevoelig', seed: 9, zweep: false });
    for (let i = 0; i < 6; i++) antibioticum(ctx, 200 + i * 60, 820, 14, i);
    griepVirus(ctx, 1780, 820, 40);
  },
  kool(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, 'TESTVEL FILM 4 · KOOL · GENENBANK', 80, 70, C.text2);
    const soorten = ['wild', 'boerenkool', 'sluitkool', 'rodekool', 'spruitjes', 'koolrabi', 'broccoli', 'bloemkool'];
    soorten.forEach((k, i) => { kool(ctx, k, 140 + i * 230, 560, 4); naamBij(ctx, k, null, 140 + i * 230, 610, 1, 'center'); });
    genenbankRek(ctx, 200, 680, 700, 300); petrischaal(ctx, 1200, 830, 130, [[0.3, 0.2, 14, EVO.a1], [-0.4, -0.3, 12, EVO.a2], [0.1, -0.5, 10, EVO.a1]], { schijfje: true });
    ziekenhuisIcoon(ctx, 1600, 960, 1); medicijnDoosje(ctx, 1800, 900, 120);
  },
};
