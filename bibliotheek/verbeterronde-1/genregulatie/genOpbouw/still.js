function still(ctx){ // groot: gen + splicing klaar; rechts: drie standen van splicing; onder: genstrip; klein rechtsonder
  genOpbouw(ctx, 70, 200, 720, { splice: 1 });
  genOpbouw(ctx, 70, 520, 720, { modus: 'strip', aan: [1,0,0,1,0,1,0,0,0,1,0,0,1,0] });
  [0.2, 0.45, 0.7].forEach((p, i) => genOpbouw(ctx, 900, 90 + i * 170, 320, { splice: p }));
  genOpbouw(ctx, 1150, 650, 100, { splice: 1 }); }
