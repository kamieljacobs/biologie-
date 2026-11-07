function scene(ctx){ rnaPolymerase(ctx, 470, 400, 1.35, { stand: 'lees', mrna: 330, t: 0.3, x0: 60, x1: 820 });
  rnaPolymerase(ctx, 1060, 140, 0.5, { stand: 'bind', x0: 900, x1: 1240 }); rnaPolymerase(ctx, 1060, 330, 0.5, { stand: 'open', x0: 900, x1: 1240 });
  rnaPolymerase(ctx, 1060, 540, 0.5, { stand: 'los', mrna: 140, x0: 900, x1: 1240 }); rnaPolymerase(ctx, 1170, 680, 0.16, { stand: 'lees', mrna: 40, x0: 1100, x1: 1250 }); }
