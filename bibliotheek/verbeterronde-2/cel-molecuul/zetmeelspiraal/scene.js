function scene(ctx){ const t=0.5;
  zetmeelSpiraal(ctx, 90, 300, 30, 17, { t });
  zetmeelSpiraal(ctx, 790, 130, 14, 9, { t });
  zetmeelSpiraal(ctx, 790, 310, 14, 9, { t, open: 0.6 });
  zetmeelSpiraal(ctx, 790, 470, 10, 9, { t, los: 0.8 });
  zetmeelSpiraal(ctx, 1110, 650, 10, 6, { t });
}
