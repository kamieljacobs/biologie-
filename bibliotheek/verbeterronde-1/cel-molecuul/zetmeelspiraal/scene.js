function scene(ctx){ const t=0.5;
  zetmeelSpiraal(ctx, 80, 300, 18, 34, { t });
  zetmeelSpiraal(ctx, 780, 140, 10, 14, { t, open: 0 });
  zetmeelSpiraal(ctx, 780, 330, 10, 14, { t, open: 0.6 });
  zetmeelSpiraal(ctx, 780, 480, 10, 14, { t, los: 0.8 });
  zetmeelSpiraal(ctx, 1090, 640, 10, 7, { t });
}
