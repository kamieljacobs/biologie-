function scene(ctx){ const t=2.0;
  celRond(ctx, 380, 360, 215, { t, versmelt: 0.75 });
  celRond(ctx, 880, 250, 110, { t, seed: 2, versmelt: 0.35 });
  celRond(ctx, 1140, 250, 110*0+70, { t, seed: 3, versmelt: 0.95 });
  celRond(ctx, 1190, 640, 40, { t, seed: 4 });
}
