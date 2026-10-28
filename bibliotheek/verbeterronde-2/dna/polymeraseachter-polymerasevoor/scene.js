// DNA met polymerase in het actieve centrum; nieuwe streng boven (bouwt naar rechts), matrijs onder
function stuk(ctx,x0,x1,cy,g,xa,sluit){ const dx=g*0.17, bw=Math.max(4,g*0.18), L=g/2-bw*0.5-1, hw=Math.max(1.6,dx*0.34), yT=cy-g/2, yB=cy+g/2;
  const gp=g*0.55; polymeraseAchter(ctx,xa,cy,gp,{dir:1,up:1});
  let i=0; for(let x=x0;x<=x1;x+=dx,i++){ const b=d2seq(i); d2Base(ctx,x,yB-bw*0.4,-Math.PI/2,D2.comp[b],L,hw,{vorm:dx>=30,letter:false}); if(x<xa-dx*0.3) d2Base(ctx,x,yT+bw*0.4,Math.PI/2,b,L,hw,{vorm:dx>=30,letter:false}); }
  d2Rug(ctx,[[x0,yB],[x1,yB]],{kleur:D2.oud,bw}); d2Rug(ctx,[[x0,yT],[xa-dx*0.3,yT]],{kleur:D2.nieuw,bw});
  // inkomende nucleotide boven het actieve centrum
  vrijNucleotide(ctx,xa+dx*0.55,yT+bw*0.2-(1-sluit)*g*0.45,D2.comp[d2seq(Math.round((xa-x0)/dx)+1)],Math.PI,g/110,{});
  polymeraseVoor(ctx,xa,cy,gp,{dir:1,up:1,sluit}); }
function scene(ctx){
  vak(ctx,40,40,1100,1000); ctx.save(); ctx.beginPath(); roundRect(ctx,40,40,1100,1000,18); ctx.clip(); stuk(ctx,60,1120,560,200,640,0.4); ctx.restore();
  vak(ctx,1180,40,700,470); ctx.save(); ctx.beginPath(); ctx.rect(1180,40,700,470); ctx.clip(); stuk(ctx,1190,1870,275,120,1560,0); ctx.restore();
  vak(ctx,1180,550,700,470); ctx.save(); ctx.beginPath(); ctx.rect(1180,550,700,470); ctx.clip(); stuk(ctx,1190,1870,785,120,1560,1); ctx.restore();
  stuk(ctx,1560,1860,1050,28,1750,0.5);
}
