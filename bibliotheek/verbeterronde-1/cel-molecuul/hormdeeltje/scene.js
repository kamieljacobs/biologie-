function scene(ctx){ const S=['gnrh','fsh','lh','testo','oestro'];
  S.forEach((k,i)=> hormDeeltje(ctx, 150 + i*240, 250, k, 58, 1, false));
  S.forEach((k,i)=> hormDeeltje(ctx, 330 + i*150, 500, k, 18, 1, false));
  S.forEach((k,i)=> hormDeeltje(ctx, 1000 + i*55, 650, k, 9, 1, k==='lh'));
}
