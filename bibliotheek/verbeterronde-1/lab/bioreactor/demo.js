function demo(ctx, v) {
  if (v === 'C') { bioreactor(ctx, 300, 1000, 1.8, { t: 1, keten: { x: 260, y: 900, s: 0.75, fase: 0.85 } });
    persoon(ctx, 'bilal', 1640, 1000, 175 * 0.9, { kijk: -1 }); bioreactor(ctx, 1790, 1000, 0.9, { t: 1 }); return; }
  if (v === 'B') { bioreactor(ctx, 80, 510, 0.8, { fase: 0.2, t: 1 }); bioreactor(ctx, 80, 1020, 0.8, { fase: 0.85, t: 2 });
    bioreactor(ctx, 1700, 1050, 0.11, { fase: 0.5 }); return; }
  bioreactor(ctx, 300, 1000, 1.8, { t: 0 }); bioreactor(ctx, 760, 1000, 1.8, { t: 2.3 }); bioreactor(ctx, 1220, 1000, 1.8, { t: 4, oogst: 0.8 });
  persoon(ctx, 'bilal', 1520, 1000, 175 * 0.9, { kijk: -1 }); bioreactor(ctx, 1640, 1000, 0.9, { t: 1 });
  bioreactor(ctx, 1850, 1060, 0.33, { t: 1 });
}
