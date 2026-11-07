function demo(ctx, v) {
  const B = v === 'B' || v === 'C';
  if (B) { // drie standen: boven de huid, naald in de spier, ingespoten (4,4 px/mm)
    [[0, 0], [1, 0], [1, 1]].forEach(([p, d], i) => injectiespuit(ctx, 330 + i * 560, 560, 4.4, { arm: true, prik: p, druk: d }));
  } else { // groot: drie standen (vol, half ingedrukt, met druppel), 6 px/mm => spuit ± 780 px lang
    injectiespuit(ctx, 1150, 260, 6, { vul: 0.5 }); injectiespuit(ctx, 1150, 420, 6, { vul: 0.17, druppel: 1 }); injectiespuit(ctx, 1150, 580, 6, { vul: 0.02 });
  }
  // op ware maat naast de hand van Noor (2,5 px/mm); bij C onder de weefselblokken, zonder overlap
  const sh = 2.5, yh = v === 'C' ? 1000 : 930, ys = v === 'C' ? 905 : 790;
  onderarm(ctx, 760 - 44 * sh * 10, yh, sh * 10, { id: 'noor', kijk: 1 });
  injectiespuit(ctx, 700, ys, sh, { vul: 0.17 });
  injectiespuit(ctx, 1840, 1040, 0.9, { vul: 0.17, rot: Math.PI / 2 });
}
