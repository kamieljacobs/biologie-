function scene(ctx){ const t=1.3;
  ctx.fillStyle=C.bgMicro; ctx.beginPath(); ctx.arc(430,540,370,0,6.283); ctx.fill();
  kernChromatine(ctx,430,540,340,{c:0,seed:4,t});
  [[0.45,1000],[0.75,1330],[1,1660]].forEach(([c,x])=>{ ctx.fillStyle=C.bgMicro; ctx.beginPath(); ctx.arc(x,330,165,0,6.283); ctx.fill(); kernChromatine(ctx,x,330,150,{c,seed:4,t}); });
  ctx.fillStyle=C.bgMicro; ctx.beginPath(); ctx.arc(1330,760,165,0,6.283); ctx.fill(); kernChromatine(ctx,1330,760,150,{c:0.2,seed:4,t});
  ctx.fillStyle=C.bgMicro; ctx.beginPath(); ctx.arc(1800,960,66,0,6.283); ctx.fill(); kernChromatine(ctx,1800,960,60,{c:0,seed:4,t});
}
