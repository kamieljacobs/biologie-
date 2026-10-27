function demo(ctx, v) {
  if (v === 'C') { restrictieEnzym(ctx, 500, 270, 3.2, { stap: 0.4, t: 1 }); restrictieEnzym(ctx, 1420, 270, 3.2, { stap: 1.8 });
    restrictieEnzym(ctx, 500, 790, 3.2, { stap: 2.3 }); restrictieEnzym(ctx, 1380, 790, 3.2, { stap: 3 }); restrictieEnzym(ctx, 1800, 1010, 0.6, { stap: 1.8 }); return; }
  restrictieEnzym(ctx, 500, 260, 3.2, { stap: 0.4, t: 1 }); restrictieEnzym(ctx, 1420, 260, 3.2, { stap: 1.8 });
  restrictieEnzym(ctx, 500, 780, 3.2, { stap: 2.4 }); restrictieEnzym(ctx, 1380, 780, 3.2, { stap: 3 });
  restrictieEnzym(ctx, 1800, 1010, 0.6, { stap: 1.8 });
}
