function demo(ctx, v) {
  if (v === 'C') { sequencer(ctx, 80, 30, 0.9, { fase: 0.85 }); const k = 2.3, blad = 1040 - 75 * k; ctx.fillStyle = '#2A3A58'; ctx.fillRect(380, blad, 330, 5); ctx.fillRect(690, blad, 8, 75 * k);
    persoon(ctx, 'kim', 300, 1040, 165 * k, { kijk: 1 }); sequencer(ctx, 450, blad, k, { soort: 'ngs', fase: 1 }); sequencer(ctx, 860, 1010, 10, { soort: 'ngs', fase: 1, scherm: true }); sequencer(ctx, 1700, 1050, 0.11, { fase: 1 }); return; }
  if (v === 'B') { sequencer(ctx, 120, 950, 13, { fase: 0.3 }); sequencer(ctx, 1000, 760, 13, { fase: 1, scherm: true }); sequencer(ctx, 1780, 1050, 2, { fase: 1 }); return; }
  sequencer(ctx, 80, 30, 0.9, { fase: 0.25 }); sequencer(ctx, 80, 540, 0.9, { fase: 0.85 }); sequencer(ctx, 1700, 960, 0.14, { fase: 1 });
}
