function demo(ctx, v) {
  if (v === 'C') { plasmideKnipPlak(ctx, 300, 600, 200, { stap: 1 }); plasmideKnipPlak(ctx, 1000, 600, 170, { stap: 2.5 }); plasmideKnipPlak(ctx, 1580, 600, 150, { stap: 4 });
    plasmideKnipPlak(ctx, 1810, 980, 40, { stap: 1.7 }); return; }
  const B = v === 'B';
  if (B) { const r = 150; [[0.9, 560, 330], [1.6, 1460, 330], [2.5, 560, 800], [3.8, 1460, 800]].forEach(([st, x, y]) => plasmideKnipPlak(ctx, x, y, r, { stap: st }));
    plasmideKnipPlak(ctx, 1780, 1010, 34, { stap: 2 }); return; }
  plasmideKnipPlak(ctx, 330, 560, 230, { stap: 1 });
  plasmideKnipPlak(ctx, 960, 560, 170, { stap: 2.5 });
  plasmideKnipPlak(ctx, 1550, 560, 170, { stap: 4 });
  plasmideKnipPlak(ctx, 1810, 980, 40, { stap: 1.7 });
}
