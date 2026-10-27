function still(ctx){ // groot: dimeer met knik en enzym dat knipt (f 0.45); rechts: UV / stuk eruit / aanvullen; klein rechtsonder
  uvSchade(ctx, 420, 420, 0.85, { f: 0.45 });
  [0.12, 0.6, 0.78].forEach((p, i) => uvSchade(ctx, 1060, 140 + i * 200, 0.36, { f: p }));
  uvSchade(ctx, 1190, 675, 0.13, { f: 0.3 }); }
