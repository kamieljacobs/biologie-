function demo(ctx, v) {
  if (v === 'C') { petrischaal(ctx, 300, 430, 3.4, { gazon: false, schijf: false, groei: 0.4 }); petrischaal(ctx, 860, 430, 3.4, { groei: 1 });
    petrischaal(ctx, 1500, 520, 4.2, { aanzicht: 'schuin', groei: 1, deksel: 0.85 });
    onderarm(ctx, 960 - 44 * 10, 990, 10, { id: 'noor', kijk: 1 }); petrischaal(ctx, 1110, 960, 1.0, { groei: 1 }); petrischaal(ctx, 1830, 1010, 0.7, { groei: 1 }); return; }
  const B = v === 'B', s = B ? 5.2 : 5.6;
  if (B) { petrischaal(ctx, 330, 560, s * 0.65, { gazon: false, schijf: false, groei: 0.4, deksel: 1 }); petrischaal(ctx, 960, 560, s * 0.65, { gazon: false, schijf: false, groei: 1, deksel: 0.4 }); petrischaal(ctx, 1590, 560, s * 0.65, { groei: 1, deksel: 1 });
    onderarm(ctx, 960 - 44 * 10, 990, 10, { id: 'noor', kijk: 1 }); petrischaal(ctx, 1110, 980, 1.0, { groei: 1 }); petrischaal(ctx, 1830, 1030, 0.9, { groei: 1 }); return; }
  petrischaal(ctx, 330, 470, 3.6, { gazon: false, schijf: false, groei: 0.4 }); petrischaal(ctx, 960, 470, 3.6, { gazon: false, schijf: false, groei: 1 }); petrischaal(ctx, 1590, 470, 3.6, { groei: 1 });
  onderarm(ctx, 960 - 44 * 10, 990, 10, { id: 'noor', kijk: 1 }); petrischaal(ctx, 1110, 960, 1.0, { groei: 1 }); petrischaal(ctx, 1830, 1010, 0.7, { groei: 1 });
}
