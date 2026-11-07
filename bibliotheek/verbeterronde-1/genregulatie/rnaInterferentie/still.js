function still(ctx){ // groot: RISC bindt het mRNA (f 0.72); rechts: dicer knipt / gids in RISC / mRNA stuk; klein rechtsonder
  rnaInterferentie(ctx, 430, 380, 0.84, { f: 0.72 });
  [0.15, 0.42, 0.95].forEach((p, i) => rnaInterferentie(ctx, 1055, 120 + i * 200, 0.36, { f: p }));
  rnaInterferentie(ctx, 1195, 670, 0.14, { f: 0.72 }); }
