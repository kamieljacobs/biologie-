function demo(ctx, v) {
  const B = v === 'B';
  // groot: drie standen (dicht, half open, open) op 26 px/mm => 20 mm = 520 px
  const s = 26; const xs = [230, 590, 950];
  [0, 0.5, 1].forEach((op, i) => pcrBuisje(ctx, xs[i], 260, s, { open: op, vol: i === 2 ? 30 : 25, dna: 30, t: i }));
  // op ware maat naast de hand van Noor (2,5 px/mm; hand ± 19 cm)
  const sh = 2.5; onderarm(ctx, 1270 + 44 * sh * 10, 560, sh * 10, { id: 'noor', kijk: -1 });
  if (B) pcrBuisje(ctx, 1420, 400, sh, { n: 8, rek: true, open: [0, 0, 1, 0, 0, 0, 0, 0], vol: 25 });
  else for (let i = 0; i < 4; i++) pcrBuisje(ctx, 1440 + i * 9 * sh, 410, sh, { vol: 25, open: i === 1 ? 1 : 0 });
  // klein rechtsonder (± 120 px hoog)
  pcrBuisje(ctx, 1800, 920, 5.5, { vol: 25 });
}
