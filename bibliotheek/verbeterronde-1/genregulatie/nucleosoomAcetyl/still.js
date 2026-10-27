function still(ctx){ // groot: open met factor; rechts: dicht → halfweg → open; klein rechtsonder
  nucleosoomAcetyl(ctx, 40, 380, 820, 380, { n: 4, R: 62, open: 1, tf: 1 });
  [0, 0.5, 1].forEach((p, i) => nucleosoomAcetyl(ctx, 870, 120 + i * 200, 1250, 120 + i * 200, { n: 4, R: 28, open: p }));
  nucleosoomAcetyl(ctx, 1110, 670, 1260, 670, { n: 4, R: 11, open: 1, tf: 1 }); }
