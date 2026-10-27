function scene(ctx){ const t=1.5;
  reticulum(ctx, 90, 150, 1100, 120, { ca: 0.7, t });
  actineDetail(ctx, 90, 360, 1100, 52, { ca: 1, schuif: 0.6 });
  kopStand(ctx, 300, 560, 26, { hoek: 0, vast: 0, chip: 'ADP+P' });
  kopStand(ctx, 880, 560, 26, { hoek: 1, vast: 1, actX: -1.4*26 });
  kopStand(ctx, 1170, 655, 8, { hoek: 0.5, vast: 1 });
}
