function rna(ctx,x0,x1,y,w){ ctx.strokeStyle='#2E6F92'; ctx.lineWidth=w+2; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x0,y); for(let x=x0;x<=x1;x+=6) ctx.lineTo(x,y+Math.sin(x*0.01)*w*0.6); ctx.stroke(); ctx.strokeStyle='#5BA4C9'; ctx.lineWidth=w; ctx.stroke();
  ctx.strokeStyle='#8CC6E1'; ctx.lineWidth=Math.max(1.5,w*0.5); ctx.beginPath(); for(let x=x0+6;x<=x1;x+=w*3.2){ const yy=y+Math.sin(x*0.01)*w*0.6; ctx.moveTo(x,yy+w*0.5); ctx.lineTo(x,yy+w*2.2); } ctx.stroke(); }
function scene(ctx){ const t=1.1;
  vak(ctx,40,40,1100,1000); rna(ctx,60,1120,640,7); ribosoomEcht(ctx,590,640,2.4,{keten:14,sites:1,t});
  vak(ctx,1180,40,700,470); rna(ctx,1200,1860,440,4); ribosoomEcht(ctx,1530,440,1.0,{stand:'er',keten:10,t});
  vak(ctx,1180,550,700,470); rna(ctx,1200,1860,820,3); polysoom(ctx,1250,820,600,5,{s:0.55,t});
  rna(ctx,1700,1060,1870,2); ribosoomEcht(ctx,1790,1060,0.3,{keten:5,t});
}
