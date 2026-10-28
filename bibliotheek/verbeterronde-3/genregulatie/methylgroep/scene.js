// verbeterronde 3 methylgroep: groot = gemethyleerde promotor, de factor stuit af; rechts: zonder CH3 (factor landt, gen aan),
// deling halverwege (alleen de oude strengen dragen CH3), deling klaar (aangevuld); klein rechtsonder.
function scene(ctx){
  methylgroep(ctx, 400, 430, 0.72, { m: 1, tf: 0.65 });
  methylgroep(ctx, 1010, 120, 0.3, { m: 0, tf: 1 });
  methylgroep(ctx, 1010, 310, 0.3, { m: 1, deling: 0.6 });
  methylgroep(ctx, 1010, 545, 0.3, { m: 1, deling: 1 });
  methylgroep(ctx, 1180, 680, 0.1, { m: 1 });
}
