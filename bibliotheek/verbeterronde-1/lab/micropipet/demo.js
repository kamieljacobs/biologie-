function demo(ctx, v) {
  const B = v === 'B' || v === 'C', s = 2.2;
  if (B) { micropipet(ctx, 300, 880, s, { knop: 0, vol: 0, in: 'buisje', rot: 0 }); micropipet(ctx, 760, 880, s, { knop: 0.2, vol: 400, in: 'buisje' }); micropipet(ctx, 1240, 880, s, { knop: 2, vol: 0, in: 'gel' });
    micropipet(ctx, 1800, 1040, 0.42, { vol: 200 }); return; }
  micropipet(ctx, 300, 880, s, { knop: 0, vol: 0 }); micropipet(ctx, 760, 880, s, { knop: 1, vol: 400 }); micropipet(ctx, 1240, 880, s, { knop: 2, vol: 0, druppel: 1 });
  onderarm(ctx, 1600 - 44 * 22, 960, 22, { id: 'yasmin', kijk: 1 }); // hand op dezelfde maat (2,2 px/mm)
  micropipet(ctx, 1800, 1040, 0.42, { vol: 200 });
}
