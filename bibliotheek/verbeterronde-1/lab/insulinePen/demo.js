function demo(ctx, v) {
  if (v === 'C') { [[0, 0, 0], [1, 12, 0], [1, 12, 1]].forEach(([p, ds, d], i) => insulinePen(ctx, 330 + i * 560, 800, 4.0, { prik: p, druk: d, dosis: ds }));
    onderarm(ctx, 960 - 44 * 10, 990, 10, { id: 'noor', kijk: 1 }); insulinePen(ctx, 1150, 940, 1.0, { buik: false, dosis: 0 }); insulinePen(ctx, 1840, 1050, 0.55, { buik: false }); return; }
  if (v === 'B') { [[0, 0], [1, 0], [1, 1]].forEach(([p, d], i) => insulinePen(ctx, 330 + i * 560, 800, 4.0, { prik: p, druk: d, dosis: 10 }));
    onderarm(ctx, 960 - 44 * 10, 990, 10, { id: 'noor', kijk: 1 }); insulinePen(ctx, 1150, 940, 1.0, { buik: false }); insulinePen(ctx, 1840, 1050, 0.55, { buik: false }); return; }
  insulinePen(ctx, 1300, 220, 5, { dop: 1, dosis: 0 }); insulinePen(ctx, 1300, 420, 5, { dop: 0, dosis: 12 }); insulinePen(ctx, 1300, 620, 5, { dop: 0, dosis: 12, druk: 1 });
  onderarm(ctx, 960 - 44 * 10, 990, 10, { id: 'noor', kijk: 1 }); insulinePen(ctx, 1170, 880, 1.0, {}); insulinePen(ctx, 1860, 1000, 0.55, { rot: 0 });
}
