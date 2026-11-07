function scene(ctx){ const t=0.8;
  celluloseBundel(ctx, 110, 250, 10, 28, { ketens: 3, t });
  celluloseBundel(ctx, 800, 160, 6, 13, { ketens: 3, t, glijd: 0.3 });
  celluloseBundel(ctx, 800, 420, 6, 13, { ketens: 3, t, glijd: 0.9 });
  celluloseBundel(ctx, 1110, 625, 6, 7, { ketens: 2, t });
}
