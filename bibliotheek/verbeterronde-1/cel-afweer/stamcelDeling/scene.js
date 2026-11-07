function scene(ctx) {
  stamcelDeling(ctx, 200, 260, 64, { f: 0.8 });
  // standen: begin · halverwege · klaar · embryonaal
  stamcelDeling(ctx, 880, 70, 24, { f: 0.3 });
  stamcelDeling(ctx, 880, 220, 24, { f: 0.55 });
  stamcelDeling(ctx, 880, 370, 24, { f: 1 });
  stamcelDeling(ctx, 880, 520, 20, { f: 1, soort: 'embryonaal' });
  stamcelDeling(ctx, 1110, 620, 14, { f: 1 });
}
