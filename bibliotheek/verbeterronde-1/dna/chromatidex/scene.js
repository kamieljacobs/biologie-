function scene(ctx){
  vak(ctx,60,60,1000,960); chromatideX(ctx,560,560,640,0.12,{w:100});
  vak(ctx,1100,60,760,560); chromatideX(ctx,1240,340,380,0,{w:58}); chromatideX(ctx,1480,340,380,0,{w:58,uiteen:0.5}); chromatideX(ctx,1730,340,380,0,{w:58,coils:0});
  vak(ctx,1100,660,760,360); chromatideX(ctx,1300,840,220,-0.4,{w:36}); chromatideX(ctx,1520,840,160,0.5,{w:28,kleur:'#B9ACE6',donker:'#6E5A9E'});
  chromatideX(ctx,1780,960,110,0.2,{w:18});
}
