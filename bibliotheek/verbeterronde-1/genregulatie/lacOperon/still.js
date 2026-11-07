function still(ctx){ // groot: tussenstand (suiker gebonden, repressor laat los); rechts: uit / net gebonden / aan; klein rechtsonder
  lacOperon(ctx, 50, 420, 780, { lactose: 0.42 });
  [0, 0.28, 1].forEach((p, i) => lacOperon(ctx, 880, 150 + i * 190, 360, { lactose: p }));
  lacOperon(ctx, 1150, 680, 110, { lactose: 0 }); }
