function demo(ctx, v) {
  const k = 0.3;
  if (v === 'B' || v === 'C') {
    thermocycler(ctx, 60, 480, 0.88, { fase: 1.15 });      // 95 °C: los
    thermocycler(ctx, 1000, 480, 0.88, { fase: 1.42 });    // 55 °C: primers
    thermocycler(ctx, 60, 1000, 0.88, { fase: 2.8 });      // 72 °C: bouwen
    ctx.fillStyle = '#2A3A58'; ctx.fillRect(1200, 1040 - 750 * k, 340, 20 * k);
    persoon(ctx, 'sam', 1150, 1040, 1750 * k, { kijk: 1 });
    thermocycler(ctx, 1260, 1040 - 750 * k, k, { fase: 0.1, toon: 'apparaat' });
    thermocycler(ctx, 1720, 1040, 0.5, { fase: 0.1, toon: 'apparaat' });
    return;
  }
  thermocycler(ctx, 60, 720, 1.15, { open: 0, temp: 95, cyclus: 3, stap: 'op' });
  thermocycler(ctx, 720, 720, 1.15, { open: 0.7, temp: 25, cyclus: 0, stap: null, buisjes: 8 });
  ctx.fillStyle = '#2A3A58'; ctx.fillRect(1200, 1040 - 750 * k, 340, 20 * k);
  persoon(ctx, 'sam', 1150, 1040, 1750 * k, { kijk: 1 });
  thermocycler(ctx, 1260, 1040 - 750 * k, k, { temp: 72, cyclus: 12, stap: 'af' });
  thermocycler(ctx, 1700, 1040, 0.42, { temp: 55, stap: 'af' });
}
