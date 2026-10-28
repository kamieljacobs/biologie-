function demo(ctx, v) {
  // drie standen: boven de huid, naald in de spier, ingespoten (4 px/mm); blokken bovenin, ruime marge eronder
  [[0, 0], [1, 0], [1, 1]].forEach(([p, d], i) => injectiespuit(ctx, 360 + i * 600, 520, 4.0, { arm: true, prik: p, druk: d }));
  // maat: hand van Noor met de spuit ernaast op ware maat (1,6 px/mm), los van de doorsneden
  const sh = 1.6; onderarm(ctx, 1080 - 44 * sh * 10, 950, sh * 10, { id: 'noor', kijk: 1 });
  injectiespuit(ctx, 1290, 950, sh, { vul: 0.17 });
  injectiespuit(ctx, 1840, 1040, 0.9, { vul: 0.17, rot: Math.PI / 2 });
}
