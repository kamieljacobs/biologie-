function cel(ctx,cx,cy,rx,ry,ins,k){ if(ins>0.1&&ins<0.5&&typeof cdAnafaseCel==='function'){ cdAnafaseCel(ctx,cx,cy,rx,ry,{f:0.6,insnoer:ins,len:ry*0.4,w:Math.max(5,ry*0.05),t:1}); return; } cdCel(ctx,cx,cy,rx,ry,{insnoer:ins,t:1}); const pl=cx-rx*0.78, pr=cx+rx*0.78;
  if(ins<0.3){ cdPool(ctx,pl,cy); cdPool(ctx,pr,cy); [-0.3,-0.1,0.1,0.3].forEach(d=>{ const y=cy+d*ry; cdDraad(ctx,pl,cy,cx-k,y); cdDraad(ctx,pr,cy,cx+k,y); cdChromosoom(ctx,cx,y,ry*0.22,{w:Math.max(5,ry*0.05),rot:Math.PI/2,kl:C.kernR}); }); if(ins===0) cdKernmembraan(ctx,cx,cy,ry*0.55,0.6); }
  else { [-0.25,0.25].forEach(d=>{ cdKernmembraan(ctx,cx-rx*0.5,cy+0,ry*0.32*(1),0.2*0); }); cdKernmembraan(ctx,cx+rx*0.5,cy,ry*0.32,0); } }
function scene(ctx){
  vak(ctx,40,40,1100,1000); cel(ctx,590,540,470,420,0,14);
  vak(ctx,1180,40,700,470); cel(ctx,1530,275,300,190,0.25,8);
  vak(ctx,1180,550,700,470); cel(ctx,1530,785,300,190,0.85,8);
  cel(ctx,1790,1040,40,30,0,3);
}
