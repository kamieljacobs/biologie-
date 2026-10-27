function scene(ctx){ const t=2.2;
  rodeBloedcel(ctx, 260, 250, 150, 0, 0);
  rodeBloedcel(ctx, 260, 560, 150, 0, 1);
  rodeBloedcel(ctx, 600, 400, 70, 0.4, 0.5);
  bloedvat(ctx, [[700,170],[900,140],[1100,190],[1260,160]], 50, t, { n: 10 });
  bloedvat(ctx, [[700,470],[900,450],[1100,490],[1260,470]], 14, t, { n: 6, haarvat: true, cel: 10 });
  rodeBloedcel(ctx, 1190, 640, 40, 0.3, 0.2);
}
