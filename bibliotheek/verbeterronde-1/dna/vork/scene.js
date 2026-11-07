function scene(ctx){ const st={i0:20,i1:110,X0:60,cy:330,g:64,dx:20,Dmax:200,Lsplit:9,Ltw:10,Lf:26,pl:4,p1:30,lead:4,startLead:0,vlag:1.4,t:0.7};
  vak(ctx,40,40,1840,600); ctx.save(); ctx.beginPath(); ctx.rect(40,40,1840,600); ctx.clip(); vork(ctx,Object.assign({},st,{f:80})); ctx.restore();
  [[56,40],[86,660],[104,1280]].forEach(([f,x])=>{ vak(ctx,x,670,600,370); ctx.save(); ctx.beginPath(); ctx.rect(x,670,600,370); ctx.clip(); ctx.translate(x,700); ctx.scale(0.33,0.33); vork(ctx,Object.assign({},st,{f,i0:0,i1:130,X0:20,dx:13})); ctx.restore(); });
  ctx.save(); ctx.translate(1640,1000); ctx.scale(0.13,0.13); vork(ctx,Object.assign({},st,{f:80,i0:0,i1:130,X0:0,cy:0})); ctx.restore();
}
