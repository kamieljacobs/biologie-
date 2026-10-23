const TV1 = {
  vel(ctx) {
    ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, 'TESTVEL FILM 1', 80, 60, C.text2);
    persoon(ctx, 'yasmin', 160, 520, 380, { uit: 'blij' }); persoon(ctx, 'bilal', 380, 520, 380, { uit: 'lacht', kijk: -1 });
    chromosoomPaar(ctx, 620, 330, 300, {}); chromosoomPaar(ctx, 760, 330, 300, { allelen: [EVO.a1, EVO.a1] });
    thermometer(ctx, 880, 500, 260, 0.3); kaartNL(ctx, 1150, 330, 3.2);
    knikker(ctx, 1450, 200, 20, EVO.a1); knikker(ctx, 1500, 200, 20, EVO.a2);
  },
  kozijn(ctx) { kozijnHoek(ctx); lhbGroep(ctx, [[1400, 760, 'succinea', 14, 0.3], [1560, 800, 'spectabilis', 0, -0.4], [1700, 740, 'succinea', 6, 1.2], [1500, 400, 'conspicua', 0, 0.1]], 0.9); },
};
