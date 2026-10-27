function demo(ctx, v) {
  const B = v === 'B' || v === 'C';
  if (v === 'C') { gelElektroforese(ctx, 520, 300, 2.6, { loop: 0.15 }); gelElektroforese(ctx, 520, 720, 2.6, { loop: 0.8 }); gelElektroforese(ctx, 1450, 450, 4.0, { loop: 0.8, kleur: 1, foto: true });
    onderarm(ctx, 1050 - 44 * 10, 990, 10, { id: 'yasmin', kijk: 1 }); gelElektroforese(ctx, 1300, 990, 1.0, { loop: 0.8 }); gelElektroforese(ctx, 1800, 1010, 0.4, { loop: 0.8 }); return; }
  if (B) { gelElektroforese(ctx, 520, 300, 2.6, { loop: 0.15 }); gelElektroforese(ctx, 520, 720, 2.6, { loop: 0.8 }); gelElektroforese(ctx, 1450, 470, 4.2, { loop: 0.8, kleur: 1, foto: true });
    gelElektroforese(ctx, 1780, 990, 0.45, { loop: 0.8 }); onderarm(ctx, 1000 - 44 * 10, 990, 10, { id: 'yasmin', kijk: 1 }); gelElektroforese(ctx, 1260, 960, 1.0, { loop: 0.8 }); return; }
  gelElektroforese(ctx, 300, 440, 2.6, { loop: 0.15 }); gelElektroforese(ctx, 700, 440, 2.6, { loop: 0.8 }); gelElektroforese(ctx, 1100, 440, 2.6, { loop: 0.8, kleur: 1 });
  gelElektroforese(ctx, 1810, 990, 0.42, { loop: 0.8, kleur: 1 }); onderarm(ctx, 1350 - 44 * 10, 900, 10, { id: 'yasmin', kijk: 1 }); gelElektroforese(ctx, 1620, 560, 1.0, { loop: 0.8 });
}
