function streng(ctx,x0,x1,y,kl,bw){ d2Rug(ctx,[[x0,y],[x1,y]],{kleur:kl,bw}); }
function heli(ctx,x,y,r,x0,x1,fase){ helicaseRing(ctx,x,y,r,{fase,laag:'achter'}); streng(ctx,x0,x1,y,D2.oud,r*0.16); helicaseRing(ctx,x,y,r,{fase,laag:'voor'}); }
function scene(ctx){
  vak(ctx,40,40,1000,1000); heli(ctx,540,540,230,60,1020,0.3);
  vak(ctx,1080,40,800,300); heli(ctx,1280,190,80,1100,1460,0); heli(ctx,1680,190,80,1500,1860,0.5);
  vak(ctx,1080,370,800,300); streng(ctx,1100,1860,560,D2.oud,14); d2Rug(ctx,[[1400,535],[1560,535]],{kleur:D2.rna,bw:12}); primase(ctx,1580,462,70,{an:1.57});
  vak(ctx,1080,700,800,340); [[1280,0],[1660,1]].forEach(([x,sl])=>{ streng(ctx,x-170,x+170,900,D2.oud,14); streng(ctx,x-170,x-4,850,D2.nieuw,14); streng(ctx,x+4,x+170,850,D2.nieuw,14); ligase(ctx,x,795,62,{an:1.57,sluit:sl}); });
  heli(ctx,1800,1050,22,1740,1870,0.2);
}
