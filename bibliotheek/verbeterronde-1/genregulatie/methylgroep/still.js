function still(ctx){ // groot: gemethyleerd + factor stuit af; rechts: zonder methyl factor landt / deling half / deling klaar; klein rechtsonder
  methylgroep(ctx, 420, 400, 0.85, { m: 1, tf: 0.75 });
  methylgroep(ctx, 1060, 120, 0.36, { m: 0, tf: 1 });
  methylgroep(ctx, 1060, 330, 0.36, { m: 1, deling: 0.55 });
  methylgroep(ctx, 1060, 540, 0.36, { m: 1, deling: 1 });
  methylgroep(ctx, 1190, 680, 0.14, { m: 1 }); }
