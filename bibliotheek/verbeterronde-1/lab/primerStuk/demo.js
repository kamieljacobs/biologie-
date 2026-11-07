function demo(ctx, v) {
  const B = v === 'B' || v === 'C';
  if (B) { primerStuk(ctx, 230, 200, 1.6, { bind: 1, bouw: 0 }); primerStuk(ctx, 230, 540, 1.6, { bind: 1, bouw: 0.45 }); primerStuk(ctx, 230, 880, 1.6, { bind: 1, bouw: 0.95 });
    primerStuk(ctx, 1560, 1060, 0.2, { bind: 1, bouw: 0.5 }); return; }
  primerStuk(ctx, 230, 260, 1.6, { bind: 0, t: 1 }); primerStuk(ctx, 230, 580, 1.6, { bind: 0.55, t: 1 }); primerStuk(ctx, 230, 880, 1.6, { bind: 1 });
  primerStuk(ctx, 1560, 1060, 0.2, { bind: 1 });
}
