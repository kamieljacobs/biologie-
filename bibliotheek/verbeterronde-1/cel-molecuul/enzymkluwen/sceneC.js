// zelfde uitsnede als scene.js; het substraat tekent de variant zelf (bind/knip)
function scene(ctx){ const t=1.0;
  enzymKluwen(ctx, 360, 360, 200, { bind: 1, t });
  enzymKluwen(ctx, 830, 250, 95, { bind: 0.25, t });
  enzymKluwen(ctx, 1110, 250, 95, { bind: 1, knip: 0.8, t });
  enzymKluwen(ctx, 1190, 640, 40, { bind: 1, knip: 0.35, t });
  enzymKluwen(ctx, 1060, 650, 16, { t, an: 0.5 });
}
