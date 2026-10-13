// ---------- algemene hulpjes ----------
function fadeIO(t,a,b,d=0.5){ return ramp(t,a,d)*(1-ramp(t,b,d)); }
function dot(ctx,x,y,r,fill,stroke,lw=1.2){ ctx.beginPath(); ctx.arc(x,y,r,0,6.2832); ctx.fillStyle=fill; ctx.fill(); if(stroke){ ctx.strokeStyle=stroke; ctx.lineWidth=lw; ctx.stroke(); } }
function arrow(ctx,x1,y1,x2,y2,color,lw=4,head=16,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.strokeStyle=color; ctx.fillStyle=color; ctx.lineWidth=lw; ctx.lineCap='round';
  const a=Math.atan2(y2-y1,x2-x1), bx=x2-Math.cos(a)*head*0.8, by=y2-Math.sin(a)*head*0.8; ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(bx,by); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x2,y2); ctx.lineTo(x2-Math.cos(a-0.45)*head,y2-Math.sin(a-0.45)*head); ctx.lineTo(x2-Math.cos(a+0.45)*head,y2-Math.sin(a+0.45)*head); ctx.closePath(); ctx.fill(); ctx.restore(); }
function crossOut(ctx,x,y,s,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.strokeStyle=C.koraal; ctx.lineWidth=6; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x-s,y-s); ctx.lineTo(x+s,y+s); ctx.moveTo(x+s,y-s); ctx.lineTo(x-s,y+s); ctx.stroke(); ctx.restore(); }
function pill(ctx,x,y,s,color=C.goud,alpha=1,size=30){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.font=fTekst(size,600); const w=ctx.measureText(s).width+44; roundRect(ctx,x-w/2,y-size*0.95,w,size*1.65,size*0.8); shape(ctx,rgba(C.bgSchema,0.94),color,1.5); text(ctx,s,x,y+size*0.32,fTekst(size,600),color,'center'); ctx.restore(); }
function wrap(ctx, s, x, y, maxW, lh){ const words=s.split(' '); let line=''; for(const w of words){ const test=line?line+' '+w:w; if(ctx.measureText(test).width>maxW&&line){ ctx.fillText(line,x,y); y+=lh; line=w; } else line=test; } if(line) ctx.fillText(line,x,y); return y; }
function alpha(ctx,a,fn){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; fn(); ctx.restore(); }
function chips(ctx,items,y){ // row of term chips, centred; items: [label, alpha, color]
  ctx.save(); ctx.font=fTekst(32,600); const ws=items.map(i=>ctx.measureText(i[0]).width+48); const gap=18; const tot=ws.reduce((a,b)=>a+b,0)+gap*(items.length-1); let x=W/2-tot/2;
  items.forEach((it,i)=>{ const a=it[1]; if(a>0.01){ ctx.save(); ctx.globalAlpha*=a; roundRect(ctx,x,y-34,ws[i],58,29); shape(ctx,rgba(C.bgSchema,0.94),it[2]||C.text,1.5); text(ctx,it[0],x+ws[i]/2,y+6,fTekst(32,600),it[2]||C.text,'center'); ctx.restore(); }
    else { ctx.save(); ctx.setLineDash([6,6]); roundRect(ctx,x,y-34,ws[i],58,29); ctx.strokeStyle=rgba(C.line,0.35); ctx.lineWidth=1; ctx.stroke(); ctx.restore(); }
    x+=ws[i]+gap; }); ctx.restore(); }
function inset(cx,cy,r,a,fn){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.save(); ctx.beginPath(); ctx.arc(cx,cy,r,0,6.283); ctx.clip(); ctx.fillStyle=C.bgSchema; ctx.fillRect(cx-r,cy-r,2*r,2*r); fn(); ctx.restore(); ctx.beginPath(); ctx.arc(cx,cy,r,0,6.283); ctx.strokeStyle=C.goud; ctx.lineWidth=1.5; ctx.stroke(); ctx.restore(); }
function human(ctx,x,y,h,a=1,color=C.mens){ ctx.save(); ctx.globalAlpha*=a; ctx.fillStyle=color; const u=h/8;
  ctx.beginPath(); ctx.arc(x,y-h+u,u*0.9,0,6.283); ctx.fill();
  roundRect(ctx,x-u*1.3,y-h+u*2.1,u*2.6,u*3.6,u*0.8); ctx.fill();
  roundRect(ctx,x-u*1.2,y-h+u*5.5,u*1.0,u*2.5,u*0.4); ctx.fill(); roundRect(ctx,x+u*0.2,y-h+u*5.5,u*1.0,u*2.5,u*0.4); ctx.fill();
  ctx.fillStyle=C.bgSchema; ctx.beginPath(); ctx.arc(x-u*0.3,y-h+u*0.9,u*0.09,0,6.283); ctx.arc(x+u*0.3,y-h+u*0.9,u*0.09,0,6.283); ctx.fill();
  ctx.strokeStyle=C.bgSchema; ctx.lineWidth=u*0.08; ctx.beginPath(); ctx.arc(x,y-h+u*1.1,u*0.3,0.3,2.84); ctx.stroke(); ctx.restore(); }
function cat(ctx,x,y,s,a=1){ ctx.save(); ctx.globalAlpha*=a; const c=C.okerD;
  ctx.beginPath(); ctx.ellipse(x,y-55*s,95*s,48*s,0,0,6.283); shape(ctx,c,lighten(c,0.3),2);
  ctx.beginPath(); ctx.arc(x+92*s,y-110*s,40*s,0,6.283); shape(ctx,c,lighten(c,0.3),2);
  ctx.beginPath(); ctx.moveTo(x+66*s,y-136*s); ctx.lineTo(x+70*s,y-176*s); ctx.lineTo(x+92*s,y-148*s); ctx.closePath(); ctx.moveTo(x+104*s,y-148*s); ctx.lineTo(x+124*s,y-176*s); ctx.lineTo(x+126*s,y-134*s); ctx.closePath(); shape(ctx,c,lighten(c,0.3),2);
  [[-60,0],[-30,0],[40,0],[70,0]].forEach(([dx])=>{ roundRect(ctx,x+dx*s-9*s,y-30*s,18*s,30*s,8*s); shape(ctx,c,lighten(c,0.3),1.5); });
  ctx.strokeStyle=c; ctx.lineWidth=14*s; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x-88*s,y-70*s); ctx.quadraticCurveTo(x-150*s,y-80*s,x-140*s,y-150*s); ctx.stroke();
  ctx.fillStyle=C.bgSchema; ctx.beginPath(); ctx.arc(x+80*s,y-116*s,4*s,0,6.283); ctx.arc(x+106*s,y-116*s,4*s,0,6.283); ctx.fill(); ctx.restore(); }
function oak(ctx,x,y,s,a=1){ ctx.save(); ctx.globalAlpha*=a;
  ctx.beginPath(); ctx.moveTo(x-22*s,y); ctx.lineTo(x-14*s,y-150*s); ctx.lineTo(x+14*s,y-150*s); ctx.lineTo(x+22*s,y); ctx.closePath(); shape(ctx,C.bruin,lighten(C.bruin,0.3),2);
  [[0,-250,110],[-90,-200,80],[90,-205,85],[-50,-300,80],[55,-305,78],[0,-180,90]].forEach(([dx,dy,r],i)=>{ blob(ctx,x+dx*s,y+dy*s,r*s,r*0.85*s,0.06,i); shape(ctx,'#4E8A5C',lighten('#4E8A5C',0.3),2); });
  ctx.restore(); }
function microscope(ctx,x,y,s,a=1){ ctx.save(); ctx.globalAlpha*=a; const f=C.fill, l=C.line;
  roundRect(ctx,x-90*s,y-24*s,180*s,24*s,6*s); shape(ctx,f,l,2);
  ctx.beginPath(); ctx.moveTo(x+40*s,y-24*s); ctx.quadraticCurveTo(x+80*s,y-160*s,x+20*s,y-250*s); ctx.lineWidth=26*s; ctx.strokeStyle=l; ctx.lineCap='round'; ctx.stroke(); ctx.lineWidth=20*s; ctx.strokeStyle=f; ctx.stroke();
  roundRect(ctx,x-80*s,y-120*s,150*s,14*s,4*s); shape(ctx,f,l,2);
  ctx.save(); ctx.translate(x-10*s,y-200*s); ctx.rotate(-0.35); roundRect(ctx,-18*s,-90*s,36*s,150*s,6*s); shape(ctx,f,l,2); roundRect(ctx,-24*s,-110*s,48*s,24*s,6*s); shape(ctx,f,l,2); ctx.restore();
  ctx.restore(); }

// ---------- sla en keuken (stijlframe 1, vlak) ----------
function blobPath(cx,cy,rx,ry,rot,seed,waves,amp){ const N=140, pts=[];
  for(let i=0;i<N;i++){ const th=i/N*6.283; const r=1+(amp*Math.sin(th*waves+seed)+amp*0.5*Math.sin(th*waves*2.2+seed*1.7)+amp*0.35*Math.abs(Math.sin(th*waves*4.1+seed)));
    const x=Math.cos(th)*rx*r, y=Math.sin(th)*ry*r; pts.push([cx+x*Math.cos(rot)-y*Math.sin(rot), cy+x*Math.sin(rot)+y*Math.cos(rot)]); }
  ctx.beginPath(); pts.forEach((q,i)=>{ const n=pts[(i+1)%N], m=[(q[0]+n[0])/2,(q[1]+n[1])/2]; if(!i) ctx.moveTo(m[0],m[1]); else ctx.quadraticCurveTo(q[0],q[1],m[0],m[1]); }); ctx.closePath(); }
function leafPath(pts){ ctx.beginPath(); pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1])); ctx.closePath(); }
function lettuceLeaf(cx,cy,rx,ry,rot,seed,lx,ly,col,vein,o){ o=o||{}; const wv=o.waves||11, am=o.amp||0.07;
  blobPath(cx,cy,rx,ry,rot,seed,wv,am); shape(ctx,col,lighten(col,0.32),2);
  ctx.save(); blobPath(cx,cy,rx,ry,rot,seed,wv,am); ctx.clip(); ctx.strokeStyle=rgba(vein,0.35); ctx.lineWidth=2; ctx.lineCap='round';
  for(let k=0;k<3;k++){ const a=rot+(k-1)*0.45; const ex=cx+Math.cos(a-1.57)*rx*0.85, ey=cy+Math.sin(a-1.57)*ry*0.85; ctx.beginPath(); ctx.moveTo(lx,ly); ctx.quadraticCurveTo((lx+ex)/2,(ly+ey)/2+8,ex,ey); ctx.stroke(); }
  ctx.restore(); }
const G1='#5FA86E', G2='#6FB57C', G3='#9ACB8E', V1='#D8EBCF';
function stevigeKrop(x,y,s){ const L=(cx,cy,rx,ry,rot,seed,c,o)=>lettuceLeaf(x+cx*s,y+cy*s,rx*s,ry*s,rot,seed,x,y+40*s,c,V1,o);
  L(-150,60,150,95,-0.35,1,G1); L(150,60,150,95,0.35,2,G1); L(-90,95,140,80,-0.1,3,G1); L(95,98,140,80,0.12,4,G1);
  L(-175,-20,120,120,-0.6,5,G1); L(175,-20,120,120,0.6,6,G1); L(-110,-95,120,105,-0.4,7,G1); L(110,-95,120,105,0.4,8,G1); L(0,-140,140,90,0,9,G1);
  L(-80,-30,115,120,-0.25,10,G2,{amp:0.06}); L(85,-30,115,120,0.25,11,G2,{amp:0.06}); L(0,-60,120,110,0,12,G2,{amp:0.06});
  L(-35,10,85,95,-0.15,13,G3,{amp:0.05,waves:9}); L(40,15,85,92,0.15,14,G3,{amp:0.05,waves:9});
  L(0,55,120,70,0,15,G1,{amp:0.06}); L(-40,110,135,55,-0.05,16,G1); L(55,112,130,52,0.08,17,G1); }
function slappeKrop(x,y,s){ const top=[x+4*s,y-165*s], hemY=y+10*s;
  const SF=['#9AA068','#939A62'], SB=['#7C8452','#81894F'];
  [[-275,-120,0,0],[110,280,1,0],[-230,-20,2,0],[40,235,3,0],[-170,30,4,1],[-40,170,5,1],[-110,0,6,1],[-5,105,7,1]].forEach(([a,b,k,front])=>{
    const h=hash(k*4.7+1), c=front?SF[k%2]:SB[k%2]; const xa=x+a*s, xb=x+b*s, bulge=(32+30*h)*s;
    const edge=(xe,dir,t)=>{ const bx=top[0]+(xe-top[0])*t, by=top[1]+(hemY-top[1])*Math.pow(t,0.9); return [bx+dir*bulge*Math.sin(Math.PI*t)*0.9, by-bulge*0.35*Math.sin(Math.PI*t)]; };
    const pts=[], N=36; for(let i=0;i<=N;i++) pts.push(edge(xa,-1,i/N));
    for(let i=0;i<=N;i++){ const t=i/N; pts.push([xa+(xb-xa)*t, hemY+(Math.sin(t*14+k*2)*11+Math.abs(Math.sin(t*37+k))*7)*s-(front?0:14*s)]); }
    for(let i=N;i>=0;i--) pts.push(edge(xb,1,i/N));
    leafPath(pts); shape(ctx,c,lighten(c,0.3),2);
    ctx.save(); leafPath(pts); ctx.clip();
    if(front){ const mx=(xa+xb)/2+(h-0.5)*40*s; ctx.globalAlpha=0.6; ctx.strokeStyle='#D8D6B8'; ctx.lineCap='round';
      for(let i=0;i<12;i++){ const t1=i/12, t2=(i+1)/12; ctx.lineWidth=(7-5*t1)*s; ctx.beginPath(); ctx.moveTo(top[0]+(mx-top[0])*t1+Math.sin(t1*3)*12*s, top[1]+(hemY-top[1])*t1); ctx.lineTo(top[0]+(mx-top[0])*t2+Math.sin(t2*3)*12*s, top[1]+(hemY-top[1])*t2); ctx.stroke(); } }
    ctx.globalAlpha=0.25; ctx.strokeStyle=lighten(c,0.35); ctx.lineWidth=2;
    for(let w=0;w<5;w++){ const t=0.45+0.5*hash(k*9+w), u=hash(k*13+w*3); const p1=edge(xa,-1,t), p2=edge(xb,1,t); const px=p1[0]+(p2[0]-p1[0])*u, py=p1[1]+(p2[1]-p1[1])*u;
      ctx.beginPath(); ctx.moveTo(px,py); ctx.quadraticCurveTo(px+(hash(w+k)-0.5)*30*s,py+20*s,px+(hash(w*2+k)-0.5)*24*s,py+42*s); ctx.stroke(); }
    ctx.restore(); });
  ctx.beginPath(); ctx.ellipse(top[0],top[1]+4*s,18*s,9*s,0,0,6.283); shape(ctx,C.oker,lighten(C.oker,0.3),2); }
// krop op basislijn yb (onderkant op het aanrecht); u = 0 stevig … 1 slap (snelle overvloeier met een klein inzakken)
function krop(x,yb,s,u,a=1){ if(a<=0.01) return; u=clamp(u,0,1);
  if(u<0.99){ ctx.save(); ctx.globalAlpha*=a*(1-u); ctx.translate(x,yb); ctx.scale(1+0.08*u,1-0.3*u); ctx.translate(-x,-yb); stevigeKrop(x,yb-163*s,s); ctx.restore(); }
  if(u>0.01){ ctx.save(); ctx.globalAlpha*=a*u; ctx.translate(x,yb); ctx.scale(1,0.75+0.25*u); ctx.translate(-x,-yb); slappeKrop(x,yb-10*s,s); ctx.restore(); } }
function ridge(x0,x1,base,amp,seed,step){ const pts=[]; for(let x=x0;x<=x1+step;x+=step){ const u=x*0.004+seed; pts.push([x, base-amp*(0.55*Math.abs(Math.sin(u))+0.3*Math.sin(u*2.3+1)+0.15*Math.sin(u*5.1))]); } return pts; }
function treeLine(X,Wd,base,hMin,hVar,step,seed){ const pts=[[X-20,base+400]]; for(let x=X-20;x<=X+Wd+20;x+=step*(0.7+0.6*hash(x*0.11+seed))){ const h=hMin+hVar*hash(x*0.37+seed); pts.push([x-step*0.45,base-h*0.35]); pts.push([x,base-h]); pts.push([x+step*0.45,base-h*0.35]); } pts.push([X+Wd+20,base+400]); return pts; }
function windowView(X,Y,Wd,Hd,sun,dusk=0){ // sun: 0 morning (left low) … 1 evening (right low)
  ctx.save(); ctx.beginPath(); ctx.rect(X,Y,Wd,Hd); ctx.clip();
  ctx.fillStyle=C.bgMacroSky; ctx.fillRect(X,Y,Wd,Hd); if(dusk>0){ ctx.fillStyle=rgba('#0D1420',0.45*dusk); ctx.fillRect(X,Y,Wd,Hd); }
  const sx=X+Wd*(0.12+0.76*sun), sy=Y+Hd*(0.55-0.42*Math.sin(Math.PI*sun)); dot(ctx,sx,sy,22,C.goud);
  leafPath([[X,Y+300],[X+90,Y+240],[X+170,Y+270],[X+290,Y+150],[X+350,Y+120],[X+430,Y+190],[X+520,Y+230],[X+590,Y+210],[X+Wd,Y+240],[X+Wd,Y+Hd],[X,Y+Hd]]); ctx.fillStyle=C.berg; ctx.fill();
  leafPath([[X+350,Y+120],[X+400,Y+165],[X+380,Y+172],[X+362,Y+160],[X+345,Y+182],[X+325,Y+160],[X+305,Y+170],[X+290,Y+150]]); ctx.fillStyle=C.bergTop; ctx.fill();
  ctx.fillStyle=C.bgMacroHill; leafPath(treeLine(X,Wd,Y+330,26,30,18,3)); ctx.fill();
  ctx.fillStyle=C.bgMacroFront; leafPath(treeLine(X,Wd,Y+385,40,50,30,8)); ctx.fill();
  ctx.restore(); ctx.strokeStyle=C.line; ctx.lineWidth=2; ctx.strokeRect(X,Y,Wd,Hd); ctx.beginPath(); ctx.moveTo(X+Wd/2,Y); ctx.lineTo(X+Wd/2,Y+Hd); ctx.stroke(); }
const COUNTER=790;
function counter(){ ctx.beginPath(); ctx.rect(0,COUNTER,W,26); shape(ctx,C.bruin,lighten(C.bruin,0.3),2); }
function bowl(bx,a=1,level=1,inner){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; const top=640, bot=COUNTER-2;
  if(inner) inner();
  const wy=top+40+(1-level)*30; ctx.beginPath(); ctx.moveTo(bx-150+(1-level)*8,wy); ctx.lineTo(bx+150-(1-level)*8,wy); ctx.lineTo(bx+118,bot-2); ctx.lineTo(bx-118,bot-2); ctx.closePath(); ctx.fillStyle=rgba(C.water,0.45); ctx.fill();
  ctx.strokeStyle=rgba(C.teal,0.6); ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(bx-146,wy); ctx.lineTo(bx+146,wy); ctx.stroke();
  ctx.strokeStyle=C.line; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(bx-165,top); ctx.lineTo(bx-120,bot); ctx.lineTo(bx+120,bot); ctx.lineTo(bx+165,top); ctx.stroke(); ctx.restore(); }
function kitchenBase(sun=0.5,dusk=0){ bg(ctx,'schema'); windowView(1160,110,640,420,sun,dusk); counter(); }

// ---------- cellen ----------
function cytoFill(cx,cy,rx,ry,hl=0,seed=3){ blob(ctx,cx,cy,rx,ry,0.04,seed,0); ctx.fillStyle=rgba(C.er,0.07+0.12*hl); ctx.fill();
  ctx.save(); blob(ctx,cx,cy,rx,ry,0.04,seed,0); ctx.clip(); ctx.fillStyle=rgba(C.grain,0.35); for(let i=0;i<160;i++){ const a=hash(i*7+seed)*6.283, d=Math.sqrt(hash(i*7+1+seed)); ctx.beginPath(); ctx.arc(cx+Math.cos(a)*d*rx,cy+Math.sin(a)*d*ry,1.4,0,6.283); ctx.fill(); } ctx.restore(); }
function hlRing(cx,cy,rx,ry,a,seed=3){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; blob(ctx,cx,cy,rx,ry,0.04,seed,0); ctx.strokeStyle=C.goud; ctx.lineWidth=5; ctx.stroke(); ctx.restore(); }
// dierlijke cel (wangcel, schematisch): o = {cyto, kern, mitos, org, hlMem, hlCyto, hlKern, t}
function animalCell(cx,cy,rx,ry,o={}){ const t=o.t||0;
  cytoFill(cx,cy,rx,ry,o.hlCyto||0,3);
  if(o.org){ alpha(ctx,o.org,()=>{ for(let i=0;i<5;i++){ const a=1.1+i*1.05, w=wander(i+30,t,10,0.5); vesicle(ctx,cx+Math.cos(a)*rx*0.55+w.x,cy+Math.sin(a)*ry*0.5+w.y,9); } }); }
  if(o.mitos){ alpha(ctx,o.mitos,()=>{ [[0.42,0.38,0.3],[-0.15,0.62,-0.2],[0.6,-0.3,1.1],[-0.55,0.45,0.6],[0.15,-0.62,0.1]].forEach(([u,v,r],i)=>{ const w=wander(i+40,t,8,0.4); mitochondrion(ctx,cx+u*rx+w.x,cy+v*ry+w.y,Math.max(44,rx*0.16),r,1,4,t); }); }); }
  membrane(ctx,cx,cy,rx,ry,C.er,0.04,3,t*0.3); hlRing(cx,cy,rx,ry,o.hlMem||0);
  if(o.kern!==0){ alpha(ctx,o.kern===undefined?1:o.kern,()=>{ nucleus(ctx,cx-rx*0.28,cy-ry*0.08,Math.max(30,ry*0.3),1,t); if(o.hlKern) { ctx.save(); ctx.globalAlpha*=o.hlKern; ctx.beginPath(); ctx.arc(cx-rx*0.28,cy-ry*0.08,Math.max(30,ry*0.3)+10,0,6.283); ctx.strokeStyle=C.goud; ctx.lineWidth=4; ctx.stroke(); ctx.restore(); } }); } }
// plantencel (stijlframe 2): o = {wall, chloro, vac (0..1 grootte), kern, mitos, hlWall, hlMem, hlCyto, hlMito, sugar, t}
const CHL=[[-0.78,-0.55,0.3],[-0.15,-0.82,0],[0.55,-0.7,-0.3],[0.86,0.05,1.2],[0.55,0.72,0.4],[-0.3,0.82,-0.2],[-0.86,0.25,1.4]];
function plantCellV(cx,cy,rx,ry,o={}){ const t=o.t||0, v=o.vac===undefined?1:o.vac;
  const turg=o.turg===undefined?1:o.turg; // 1 strak, 0 slap (membraan iets van de wand)
  if(o.wall) alpha(ctx,o.wall,()=>{ cellWall(ctx,cx,cy,rx,ry,1); if(o.hlWall){ ctx.save(); ctx.globalAlpha*=o.hlWall; blob(ctx,cx,cy,rx,ry,0,0); ctx.strokeStyle=C.goud; ctx.lineWidth=5; ctx.stroke(); ctx.restore(); } });
  const mrx=(rx-12)*(0.94+0.06*turg), mry=(ry-12)*(0.9+0.1*turg);
  cytoFill(cx,cy+(1-turg)*8,mrx,mry,o.hlCyto||0,3);
  if(v>0.02){ vacuole(ctx,cx+10,cy+6,mrx*0.82,mry*0.74,1,0.25+0.75*v);
    if(o.sugar) alpha(ctx,o.sugar,()=>{ for(let i=0;i<18;i++){ const a=hash(i*3.1)*6.283, d=Math.sqrt(hash(i*5.7))*0.7, w=wander(i+60,t,6,0.8); dot(ctx,cx+10+Math.cos(a)*d*mrx*0.82*(0.25+0.75*v)+w.x,cy+6+Math.sin(a)*d*mry*0.74*(0.25+0.75*v)+w.y,5,C.oker); } }); }
  membrane(ctx,cx,cy+(1-turg)*8,mrx,mry,C.er,0.01+0.05*(1-turg),3,0); hlRing(cx,cy+(1-turg)*8,mrx,mry,o.hlMem||0);
  if(o.chloro) alpha(ctx,o.chloro,()=>CHL.forEach(([u,w,r])=>chloroplast(ctx,cx+u*mrx*(0.98+0.02*turg),cy+w*mry*(0.95+0.05*turg),Math.max(40,rx*0.2),1,r)));
  if(o.kern!==0) alpha(ctx,o.kern===undefined?1:o.kern,()=>nucleus(ctx,cx-mrx*0.62,cy-mry*0.05,Math.max(26,rx*0.13),1,t));
  if(o.mitos) alpha(ctx,o.mitos,()=>{ mitochondrion(ctx,cx+mrx*0.2,cy+mry*0.86,Math.max(36,rx*0.15),0.2,1,4,t); mitochondrion(ctx,cx-mrx*0.35,cy-mry*0.7,Math.max(32,rx*0.13),-0.4,1,4,t);
    if(o.hlMito){ ctx.save(); ctx.globalAlpha*=o.hlMito; ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.beginPath(); ctx.ellipse(cx+mrx*0.2,cy+mry*0.86,Math.max(36,rx*0.15)*0.75,22,0.2,0,6.283); ctx.stroke(); ctx.beginPath(); ctx.ellipse(cx-mrx*0.35,cy-mry*0.7,Math.max(32,rx*0.13)*0.75,20,-0.4,0,6.283); ctx.stroke(); ctx.restore(); } }); }
// microscoopbeeld van wangcellen (methyleenblauw)
function wangcel(x,y,r,rot,seed){ const n=7+Math.floor(hash(seed)*3), pts=[];
  for(let i=0;i<n;i++){ const a=rot+i/n*6.283+(hash(seed+i*1.3)-0.5)*0.5, rr=r*(0.78+0.35*hash(seed*2+i)); pts.push([x+Math.cos(a)*rr, y+Math.sin(a)*rr]); }
  ctx.beginPath(); pts.forEach((p,i)=>{ const q=pts[(i+1)%n], m=[(p[0]+q[0])/2,(p[1]+q[1])/2]; if(!i){ const l=pts[n-1]; ctx.moveTo((l[0]+p[0])/2,(l[1]+p[1])/2); } ctx.quadraticCurveTo(p[0],p[1],m[0],m[1]); });
  ctx.closePath(); ctx.fillStyle='rgba(120,155,205,0.22)'; ctx.fill(); ctx.strokeStyle='rgba(55,85,145,0.55)'; ctx.lineWidth=1.6; ctx.stroke();
  ctx.beginPath(); const f=hash(seed+9)*6.283; ctx.moveTo(x+Math.cos(f)*r*0.75,y+Math.sin(f)*r*0.75); ctx.quadraticCurveTo(x+Math.cos(f+1.4)*r*0.25,y+Math.sin(f+1.4)*r*0.25,x+Math.cos(f+2.4)*r*0.7,y+Math.sin(f+2.4)*r*0.7); ctx.strokeStyle='rgba(55,85,145,0.28)'; ctx.lineWidth=2.2; ctx.stroke();
  ctx.fillStyle='rgba(60,90,150,0.25)'; for(let i=0;i<26;i++){ const a=hash(seed+i*2.1)*6.283, d=Math.sqrt(hash(seed*3+i))*r*0.7; ctx.beginPath(); ctx.arc(x+Math.cos(a)*d,y+Math.sin(a)*d,1.4,0,6.283); ctx.fill(); }
  const nx=x+(hash(seed+4)-0.5)*r*0.3, ny=y+(hash(seed+5)-0.5)*r*0.3; ctx.beginPath(); ctx.ellipse(nx,ny,r*0.13,r*0.1,rot,0,6.283); ctx.fillStyle='rgba(42,62,128,0.85)'; ctx.fill(); }
const WANG=[[380,300,92,0.2],[560,250,100,1.1],[730,330,95,2.0],[300,470,90,0.7],[470,430,105,2.6],[660,500,98,1.7],[820,470,85,0.4],[390,640,96,1.9],[570,660,92,0.9],[750,660,88,2.9],[230,330,80,1.5],[880,300,78,0.8],[240,610,76,2.2],[540,90,90,0.1],[900,640,80,1.2]];
function microField(cx,cy,R,s=1){ ctx.save(); ctx.beginPath(); ctx.arc(cx,cy,R,0,6.283); ctx.clip(); ctx.fillStyle='#E6ECEF'; ctx.fillRect(cx-R,cy-R,2*R,2*R);
  ctx.translate(cx,cy); ctx.scale(s,s); ctx.translate(-560,-470); WANG.forEach(([x,y,r,rot],i)=>wangcel(x,y,r,rot,i*5.7+2));
  ctx.fillStyle='rgba(42,62,128,0.7)'; for(let i=0;i<40;i++){ const a=hash(i*3.3)*6.283, d=Math.sqrt(hash(i*7.1))*390; ctx.beginPath(); ctx.ellipse(560+Math.cos(a)*d,470+Math.sin(a)*d,2.6,1.5,a,0,6.283); ctx.fill(); }
  ctx.restore(); ctx.beginPath(); ctx.arc(cx,cy,R,0,6.283); ctx.strokeStyle='#05080D'; ctx.lineWidth=10; ctx.stroke(); }
// bladweefsel: honingraat van plantencellen (in een zoomcirkel)
function tissue(cx,cy,R,t=0,turg=1){ for(let r=-4;r<=4;r++) for(let c=-5;c<=5;c++){ const x=cx+c*92+(r%2?46:0), y=cy+r*70; if(Math.hypot(x-cx,y-cy)>R+80) continue;
  ctx.beginPath(); ctx.ellipse(x,y,44,32*(0.9+0.1*turg),0,0,6.283); shape(ctx,rgba(C.teal,0.18),C.groen,5);
  for(let k=0;k<4;k++){ const a=k*1.6+hash(r*11+c); dot(ctx,x+Math.cos(a)*30,y+Math.sin(a)*20,6,C.chloro); } } }

// ===== Van cel tot lichaam — scènes (kerndoelen onderbouw, film 2) =====
// Hulpjes uit film 1 staan hierboven (helpers1.js). Nieuwe tekeningen: gymzaal, spiercel, weefseltegels, kuitspier, bot, lichaam met tien stelsels, slaplant met organen, bladdoorsnede, gespecialiseerde cellen, trap.

// ---------- film 2: nieuwe tekeningen ----------
function muscleCell(x,y,len,a=1,ry=24){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.beginPath(); ctx.moveTo(x-len/2,y); ctx.quadraticCurveTo(x-len/4,y-ry-2,x,y-ry); ctx.quadraticCurveTo(x+len/4,y-ry-2,x+len/2,y); ctx.quadraticCurveTo(x+len/4,y+ry+2,x,y+ry); ctx.quadraticCurveTo(x-len/4,y+ry+2,x-len/2,y); ctx.closePath(); shape(ctx,rgba(C.koraal,0.35),lighten(C.koraal,0.2),2);
  ctx.strokeStyle=rgba(C.koraal,0.6); ctx.lineWidth=1.5; for(let k=-2;k<=2;k++){ ctx.beginPath(); ctx.moveTo(x-len/2+30,y+k*ry/3); ctx.lineTo(x+len/2-30,y+k*ry/3); ctx.stroke(); }
  nucleus(ctx,x-len*0.18,y-ry*0.25,Math.min(11,ry*0.45),1,0); nucleus(ctx,x+len*0.22,y+ry*0.2,Math.min(11,ry*0.45),1,0); ctx.restore(); }
function neuron(x,y,s,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.strokeStyle=C.paars; ctx.lineCap='round';
  ctx.lineWidth=5*s; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+420*s,y+10*s); ctx.stroke();
  [[-60,-70],[-80,10],[-50,80],[20,-85],[30,80]].forEach(([dx,dy])=>{ ctx.lineWidth=3*s; ctx.beginPath(); ctx.moveTo(x,y); ctx.quadraticCurveTo(x+dx*0.5*s,y+dy*0.7*s,x+dx*s,y+dy*s); ctx.stroke(); });
  [[-20,-30],[-20,30],[20,30]].forEach(([dx,dy])=>{ ctx.lineWidth=2.5*s; ctx.beginPath(); ctx.moveTo(x+420*s,y+10*s); ctx.lineTo(x+420*s+dx*s,y+10*s+dy*s); ctx.stroke(); });
  ctx.beginPath(); ctx.ellipse(x,y,34*s,30*s,0,0,6.283); shape(ctx,rgba(C.paars,0.5),lighten(C.paars,0.3),2); nucleus(ctx,x,y,12*s,1,0); ctx.restore(); }
function rbc(x,y,r,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.beginPath(); ctx.ellipse(x,y,r,r*0.95,0,0,6.283); shape(ctx,'#B85A5A','#D88080',2); ctx.beginPath(); ctx.ellipse(x,y,r*0.45,r*0.4,0,0,6.283); ctx.fillStyle=rgba('#7A3838',0.5); ctx.fill(); ctx.restore(); }
function bone(x,y,len,rot,a=1,s=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.translate(x,y); ctx.rotate(rot); const w=26*s, k=30*s;
  roundRect(ctx,-len/2,-w/2,len,w,w/2); shape(ctx,'#E9E4D6','#B8B2A2',2);
  [[-len/2,-1],[len/2,1]].forEach(([ex])=>{ ctx.beginPath(); ctx.arc(ex,-k*0.55,k*0.6,0,6.283); ctx.arc(ex,k*0.55,k*0.6,0,6.283); shape(ctx,'#E9E4D6','#B8B2A2',2); });
  ctx.restore(); }
function boneCells(x,y,len,a){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; for(let i=0;i<14;i++){ const px=x-len/2+40+(i*(len-80)/13), py=y+(hash(i*3.3)-0.5)*16; ctx.beginPath(); ctx.ellipse(px,py,9,6,hash(i)*3,0,6.283); shape(ctx,rgba(C.kern,0.8),lighten(C.kern,0.3),1); for(let k=0;k<5;k++){ const an=k*1.26+hash(i+k); ctx.strokeStyle=rgba(C.kern,0.6); ctx.lineWidth=1.2; ctx.beginPath(); ctx.moveTo(px+Math.cos(an)*9,py+Math.sin(an)*6); ctx.lineTo(px+Math.cos(an)*20,py+Math.sin(an)*14); ctx.stroke(); } } ctx.restore(); }
// gymzaal: vloer, lijnen, rennend poppetje
function runner(x,y,h,t,a=1,color=C.mens){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.fillStyle=color; ctx.strokeStyle=color; ctx.lineCap='round'; const u=h/8, ph=t*9;
  const by=y-h+u*2.2+Math.abs(Math.sin(ph))*u*0.15;
  ctx.beginPath(); ctx.arc(x+u*0.2,by-u*1.1,u*0.9,0,6.283); ctx.fill();
  ctx.save(); ctx.translate(x,by); ctx.rotate(0.18); roundRect(ctx,-u*1.3,0,u*2.6,u*3.4,u*0.8); ctx.fill(); ctx.restore();
  ctx.lineWidth=u*0.8; [[1,0],[-1,Math.PI]].forEach(([d,o])=>{ const sw=Math.sin(ph+o); const kx=x+sw*u*1.4, ky=by+u*3.2+u*1.6; const fx=kx+Math.max(0,sw)*u*0.6+u*0.3, fy=by+u*6.6-Math.max(0,-sw)*u*1.2; ctx.beginPath(); ctx.moveTo(x+u*0.2,by+u*3.2); ctx.lineTo(kx,ky); ctx.lineTo(fx,fy); ctx.stroke(); });
  ctx.lineWidth=u*0.6; [[1,Math.PI],[-1,0]].forEach(([d,o])=>{ const sw=Math.sin(ph+o); ctx.beginPath(); ctx.moveTo(x+u*0.3,by+u*0.8); ctx.lineTo(x+u*0.3+sw*u*1.4,by+u*2.2); ctx.lineTo(x+u*0.3+sw*u*1.6+u*0.8,by+u*1.6); ctx.stroke(); });
  ctx.restore(); }
function gymHall(t){ bg(ctx,'schema'); const fy=800;
  ctx.fillStyle='#22324D'; ctx.fillRect(0,fy,W,H-fy); ctx.strokeStyle=rgba(C.goud,0.35); ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(0,fy); ctx.lineTo(W,fy); ctx.stroke();
  ctx.strokeStyle=rgba(C.text,0.12); ctx.lineWidth=2; for(let x=200;x<W;x+=380){ ctx.beginPath(); ctx.moveTo(x,fy+10); ctx.lineTo(x,H-10); ctx.stroke(); }
  // wandrek links, basket rechts
  ctx.strokeStyle=rgba(C.line,0.45); ctx.lineWidth=3; for(let k=0;k<7;k++){ ctx.beginPath(); ctx.moveTo(90,230+k*70); ctx.lineTo(290,230+k*70); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(90,200); ctx.lineTo(90,fy); ctx.moveTo(290,200); ctx.lineTo(290,fy); ctx.stroke();
  ctx.beginPath(); ctx.rect(1700,300,140,100); ctx.stroke(); ctx.beginPath(); ctx.ellipse(1740,410,40,10,0,0,6.283); ctx.stroke(); ctx.beginPath(); ctx.moveTo(1840,300); ctx.lineTo(1840,fy); ctx.stroke();
  return fy; }
function heart(x,y,s,a=1,beat=0){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.translate(x,y); const k=1+0.12*Math.max(0,Math.sin(beat)); ctx.scale(s*k,s*k); ctx.beginPath(); ctx.moveTo(0,28); ctx.bezierCurveTo(-40,-6,-30,-40,0,-18); ctx.bezierCurveTo(30,-40,40,-6,0,28); ctx.closePath(); shape(ctx,C.koraal,lighten(C.koraal,0.25),2); ctx.restore(); }
function lungs(x,y,s,a=1,breath=0){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; const k=1+0.08*Math.max(0,Math.sin(breath)); [[-1,0],[1,0]].forEach(([d])=>{ ctx.beginPath(); ctx.ellipse(x+d*40*s,y,30*s*k,52*s*k,0,0,6.283); shape(ctx,rgba(C.teal,0.55),lighten(C.teal,0.2),2); }); ctx.strokeStyle=lighten(C.teal,0.2); ctx.lineWidth=5*s; ctx.beginPath(); ctx.moveTo(x,y-80*s); ctx.lineTo(x,y-20*s); ctx.stroke(); ctx.restore(); }
function kidney(x,y,s,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.beginPath(); ctx.ellipse(x,y,14*s,24*s,0,0,6.283); shape(ctx,'#9A4A4A','#C47070',1.5); ctx.restore(); }
// lichaam-schema: silhouet + organen per stelsel; o = {zenuw, spijs, adem, bloed, uitsch, skelet, spier, afweer, hormoon, voortpl, hl:'naam', t, labels}
const BODY={cx:960,yb:920,h:760};
function bodyOrgans(o={}){ const {cx,yb,h}=BODY, u=h/8, top=yb-h, t=o.t||0; const A=k=>o[k]===undefined?0:o[k];
  ctx.save(); ctx.globalAlpha*=(o.sil===undefined?0.3:o.sil); human(ctx,cx,yb,h,1,C.mens); ctx.restore();
  const hl=n=>o.hl===n?1:0;
  // skelet: wervelkolom, ribben, benen
  alpha(ctx,A('skelet'),()=>{ ctx.strokeStyle='#E9E4D6'; ctx.lineWidth=5; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(cx,top+u*1.9); ctx.lineTo(cx,top+u*5.5); ctx.stroke(); ctx.lineWidth=2.5; for(let k=0;k<5;k++){ const y=top+u*2.5+k*u*0.35; ctx.beginPath(); ctx.moveTo(cx-10,y); ctx.quadraticCurveTo(cx-70,y+6,cx-95,y+22); ctx.moveTo(cx+10,y); ctx.quadraticCurveTo(cx+70,y+6,cx+95,y+22); ctx.stroke(); }
    bone(cx-u*0.7,top+u*6.6,u*1.9,Math.PI/2,1,0.55); bone(cx+u*0.7,top+u*6.6,u*1.9,Math.PI/2,1,0.55); });
  // spieren: op de benen en bovenarmen
  alpha(ctx,A('spier'),()=>{ [[cx-u*0.75,top+u*6.5,0],[cx+u*0.75,top+u*6.5,0],[cx-u*1.55,top+u*3.1,0.25],[cx+u*1.55,top+u*3.1,-0.25]].forEach(([x,y,r])=>{ ctx.save(); ctx.translate(x,y); ctx.rotate(r); ctx.beginPath(); ctx.ellipse(0,0,22,u*0.75,0,0,6.283); shape(ctx,rgba(C.koraal,0.55),lighten(C.koraal,0.2),2); ctx.restore(); }); });
  // spijsvertering: mond, slokdarm, maag, darm
  alpha(ctx,A('spijs'),()=>{ ctx.strokeStyle=C.oker; ctx.lineWidth=5; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(cx+6,top+u*1.3); ctx.lineTo(cx+10,top+u*4.0); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx+20,top+u*4.3,48,34,-0.3,0,6.283); shape(ctx,C.oker,lighten(C.oker,0.25),2);
    ctx.strokeStyle=C.okerD; ctx.lineWidth=14; ctx.beginPath(); ctx.moveTo(cx-60,top+u*4.9); ctx.quadraticCurveTo(cx+60,top+u*4.9,cx+50,top+u*5.2); ctx.quadraticCurveTo(cx-70,top+u*5.2,cx-50,top+u*5.5); ctx.stroke();
    ctx.strokeStyle=lighten(C.okerD,0.15); ctx.lineWidth=12; ctx.beginPath(); ctx.moveTo(cx-85,top+u*5.5); ctx.lineTo(cx-85,top+u*4.75); ctx.lineTo(cx+90,top+u*4.75); ctx.lineTo(cx+90,top+u*5.6); ctx.stroke(); });
  // ademhaling: neus/luchtpijp + longen
  alpha(ctx,A('adem'),()=>{ lungs(cx-10,top+u*3.1,1.25,1,o.breath||0); });
  // bloedvaten: hart + vaten
  alpha(ctx,A('bloed'),()=>{ ctx.strokeStyle=rgba('#C47070',0.8); ctx.lineWidth=3; [[cx-30,top+u*2.9,cx-u*1.6,top+u*4.4],[cx-30,top+u*2.9,cx+u*1.6,top+u*4.4],[cx-30,top+u*2.9,cx-u*0.7,top+u*7.6],[cx-30,top+u*2.9,cx+u*0.7,top+u*7.6],[cx-30,top+u*2.9,cx,top+u*0.6]].forEach(([a,b,c,d])=>{ ctx.beginPath(); ctx.moveTo(a,b); ctx.quadraticCurveTo((a+c)/2-20,(b+d)/2,c,d); ctx.stroke(); }); heart(cx-30,top+u*2.95,1.1,1,o.beat||0); });
  // zenuwstelsel: hersenen + zenuwen
  alpha(ctx,A('zenuw'),()=>{ ctx.strokeStyle=C.paars; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(cx,top+u*1.6); ctx.lineTo(cx,top+u*5.4); ctx.moveTo(cx,top+u*2.4); ctx.lineTo(cx-u*1.6,top+u*4.6); ctx.moveTo(cx,top+u*2.4); ctx.lineTo(cx+u*1.6,top+u*4.6); ctx.moveTo(cx,top+u*5.4); ctx.lineTo(cx-u*0.7,top+u*7.7); ctx.moveTo(cx,top+u*5.4); ctx.lineTo(cx+u*0.7,top+u*7.7); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx,top+u*0.5,u*0.55,u*0.3,0,0,6.283); shape(ctx,rgba(C.paars,0.65),lighten(C.paars,0.3),1.5); });
  // uitscheiding: nieren + blaas
  alpha(ctx,A('uitsch'),()=>{ kidney(cx-60,top+u*4.55,1); kidney(cx+90,top+u*4.55,1); ctx.strokeStyle='#C47070'; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(cx-55,top+u*4.8); ctx.lineTo(cx+5,top+u*5.75); ctx.moveTo(cx+85,top+u*4.8); ctx.lineTo(cx+25,top+u*5.75); ctx.stroke(); ctx.beginPath(); ctx.ellipse(cx+15,top+u*5.85,26,18,0,0,6.283); shape(ctx,rgba(C.teal,0.5),lighten(C.teal,0.2),1.5); });
  // afweer: lymfeklieren
  alpha(ctx,A('afweer'),()=>{ [[cx-40,top+u*1.5],[cx+40,top+u*1.5],[cx-u*1.35,top+u*2.5],[cx+u*1.35,top+u*2.5],[cx-u*0.5,top+u*5.9],[cx+u*0.6,top+u*5.9]].forEach(([x,y])=>dot(ctx,x,y,7,C.groen,lighten(C.groen,0.3),1.5)); });
  // hormoon: hypofyse, schildklier, bijnieren
  alpha(ctx,A('hormoon'),()=>{ dot(ctx,cx,top+u*0.85,8,C.goud,lighten(C.goud,0.3),1.5); ctx.beginPath(); ctx.ellipse(cx-10,top+u*1.65,18,9,0,0,6.283); ctx.ellipse(cx+10,top+u*1.65,18,9,0,0,6.283); shape(ctx,rgba(C.goud,0.7),lighten(C.goud,0.3),1.5); dot(ctx,cx-60,top+u*4.2,7,C.goud,lighten(C.goud,0.3),1.5); dot(ctx,cx+90,top+u*4.2,7,C.goud,lighten(C.goud,0.3),1.5); });
  // voortplanting
  alpha(ctx,A('voortpl'),()=>{ ctx.beginPath(); ctx.ellipse(cx+10,top+u*5.45,30,22,0,0,6.283); shape(ctx,rgba(C.koraal,0.4),lighten(C.koraal,0.2),1.5); dot(ctx,cx-30,top+u*5.4,7,C.koraal); dot(ctx,cx+50,top+u*5.4,7,C.koraal); });
}
const SYS={ // naam, sleutel, aanwijspunt (relatief in u), labelpositie, taak
  spijs:['spijsverteringsstelsel',0.3,4.3,1400,470,'eten klein maken, opnemen'],
  adem:['ademhalingsstelsel',-0.9,3.1,440,330,'zuurstof erin, koolstofdioxide eruit'],
  bloed:['bloedvatenstelsel',-0.3,2.95,440,210,'alles rondbrengen'],
  zenuw:['zenuwstelsel',0,0.5,1400,120,'signalen doorgeven'],
  skelet:['skelet',0.7,6.6,1400,760,'stevigheid en bescherming'],
  spier:['spierstelsel',-1.55,3.1,440,600,'bewegen'],
  uitsch:['uitscheidingsstelsel',0.95,4.55,1400,600,'afval uit je bloed'],
  afweer:['afweersysteem',1.35,2.5,1400,300,'tegen ziekteverwekkers'],
  hormoon:['hormoonstelsel',0,0.85,440,110,'regelen met stoffen in je bloed'],
  voortpl:['voortplantingsstelsel',0.1,5.45,440,760,'nieuw leven'],
};
function sysLabel(k,a,meta=true){ const s=SYS[k]; if(a<=0.01) return; const u=BODY.h/8, top=BODY.yb-BODY.h; label(ctx,s[0],meta?s[5]:'',BODY.cx+s[1]*u,top+s[2]*u,s[3],s[4],a); }
// kuitspier als orgaan (doorsnede-achtig, vlak)
function calf(x,y,s,a=1,o={}){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.translate(x,y); ctx.scale(s,s);
  ctx.beginPath(); ctx.ellipse(0,0,120,250,0,0,6.283); shape(ctx,rgba(C.koraal,0.5),lighten(C.koraal,0.2),2);
  ctx.strokeStyle=rgba(C.koraal,0.7); ctx.lineWidth=1.5; for(let k=-4;k<=4;k++){ ctx.beginPath(); ctx.moveTo(k*22,-230+Math.abs(k)*12); ctx.lineTo(k*22,230-Math.abs(k)*12); ctx.stroke(); }
  if(o.zenuw){ ctx.save(); ctx.globalAlpha*=o.zenuw; ctx.strokeStyle=C.paars; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(-20,-250); ctx.quadraticCurveTo(20,-60,-10,200); ctx.stroke(); [[-80,-60],[60,0],[-70,80],[50,120]].forEach(([dx,dy])=>{ ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(0,dy-60); ctx.quadraticCurveTo(dx*0.5,dy-20,dx,dy); ctx.stroke(); }); ctx.restore(); }
  if(o.vat){ ctx.save(); ctx.globalAlpha*=o.vat; ctx.strokeStyle='#C47070'; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(30,-250); ctx.quadraticCurveTo(-30,0,20,230); ctx.stroke(); ctx.strokeStyle=C.teal; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(50,-245); ctx.quadraticCurveTo(0,20,40,225); ctx.stroke(); ctx.restore(); }
  if(o.bind){ ctx.save(); ctx.globalAlpha*=o.bind; ctx.beginPath(); ctx.ellipse(0,0,134,262,0,0,6.283); ctx.strokeStyle=C.grain; ctx.lineWidth=10; ctx.stroke(); ctx.restore(); }
  if(o.pees){ ctx.save(); ctx.globalAlpha*=o.pees; ctx.strokeStyle='#E9E4D6'; ctx.lineWidth=12; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(0,-250); ctx.lineTo(0,-320); ctx.moveTo(0,250); ctx.lineTo(0,330); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
// weefseltegel: cirkel met een patroon
function tissueTile(x,y,r,kind,a,t=0){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.beginPath(); ctx.arc(x,y,r,0,6.283); ctx.fillStyle=C.bgMicro; ctx.fill(); ctx.save(); ctx.beginPath(); ctx.arc(x,y,r,0,6.283); ctx.clip(); ctx.translate(x,y);
  if(kind==='spier'){ for(let k=-3;k<=3;k++) muscleCell(0,k*44,r*2.4,1,16); }
  if(kind==='zenuw'){ neuron(-110,-40,0.55); neuron(-60,70,0.45); neuron(-150,120,0.4); }
  if(kind==='bot'){ ctx.fillStyle='#E9E4D6'; ctx.fillRect(-r,-r,2*r,2*r); for(let i=0;i<4;i++){ ctx.strokeStyle='#C9C3B3'; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(0,0,30+i*32,0,6.283); ctx.stroke(); } for(let i=0;i<22;i++){ const an=hash(i*2.1)*6.283, d=35+hash(i*5.3)*(r-45); ctx.beginPath(); ctx.ellipse(Math.cos(an)*d,Math.sin(an)*d,7,4,an,0,6.283); shape(ctx,rgba(C.kern,0.8),lighten(C.kern,0.3),1); } }
  if(kind==='bind'){ ctx.strokeStyle=C.grain; ctx.lineWidth=2.5; for(let i=0;i<16;i++){ const an=hash(i*1.7)*6.283, px=(hash(i*3.1)-0.5)*2*r, py=(hash(i*4.3)-0.5)*2*r; ctx.beginPath(); ctx.moveTo(px-Math.cos(an)*120,py-Math.sin(an)*120); ctx.lineTo(px+Math.cos(an)*120,py+Math.sin(an)*120); ctx.stroke(); } for(let i=0;i<9;i++){ const px=(hash(i*7.1)-0.5)*1.6*r, py=(hash(i*8.3)-0.5)*1.6*r; ctx.beginPath(); ctx.ellipse(px,py,16,9,hash(i)*3,0,6.283); shape(ctx,rgba(C.grain,0.35),C.grain,1.2); nucleus(ctx,px,py,5,1,0); } }
  if(kind==='dek'){ for(let row=-2;row<=2;row++) for(let c=-4;c<=4;c++){ const px=c*60+(row%2?30:0), py=row*34; ctx.beginPath(); ctx.ellipse(px,py,31,17,0,0,6.283); shape(ctx,'rgba(120,155,205,0.22)','rgba(55,85,145,0.6)',1.5); dot(ctx,px,py,6,'rgba(42,62,128,0.85)'); } }
  if(kind==='bloed'){ ctx.fillStyle=rgba('#E8D9A8',0.18); ctx.fillRect(-r,-r,2*r,2*r); for(let i=0;i<14;i++){ const px=(hash(i*2.7)-0.5)*1.8*r, py=(hash(i*3.9)-0.5)*1.8*r+(t*20+i*13)%40-20; rbc(px,py,22); } dot(ctx,30,-40,18,'rgba(235,235,245,0.9)','#C9C3D6',1.5); dot(ctx,-70,60,16,'rgba(235,235,245,0.9)','#C9C3D6',1.5); }
  ctx.restore(); ctx.beginPath(); ctx.arc(x,y,r,0,6.283); ctx.strokeStyle=C.line; ctx.lineWidth=1.5; ctx.stroke(); ctx.restore(); }
// bloedvat (schematisch, verticaal) met bewegende cellen
function vessel(x,y,w,h,t,a=1,label=true){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; roundRect(ctx,x-w/2,y,w,h,w/2); shape(ctx,rgba('#9A4A4A',0.35),'#C47070',2); ctx.save(); roundRect(ctx,x-w/2,y,w,h,w/2); ctx.clip(); for(let i=0;i<12;i++){ const py=y+((t*70+i*(h/9))%h), px=x+(hash(i*3.3)-0.5)*(w-70); rbc(px,py,20+hash(i)*6); } dot(ctx,x+10,y+((t*55+200)%h),17,'rgba(235,235,245,0.9)','#C9C3D6',1.5); ctx.restore(); ctx.restore(); }
// slaplant met organen (bloeiende sla: stengel, bloem), in de grond
function groundLine(y){ ctx.fillStyle='#2A2119'; ctx.fillRect(0,y,W,H-y); ctx.strokeStyle=lighten(C.bruin,0.2); ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
function roots(x,y,s,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.strokeStyle='#D9CFA8'; ctx.lineCap='round'; [[0,0,-30,120,-60,250,5],[0,0,40,100,90,230,4.5],[0,0,-90,80,-180,170,3.5],[0,0,100,60,200,150,3.5],[0,0,-20,160,20,300,3],[-30,120,-110,140,-150,220,2],[40,100,120,150,150,260,2],[-60,250,-90,290,-100,340,1.5],[90,230,130,280,160,330,1.5]].forEach(([ax,ay,bx,by,cx2,cy2,w])=>{ ctx.lineWidth=w*s; ctx.beginPath(); ctx.moveTo(x+ax*s,y+ay*s); ctx.quadraticCurveTo(x+bx*s,y+by*s,x+cx2*s,y+cy2*s); ctx.stroke(); }); ctx.restore(); }
function flower(x,y,s,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; for(let k=0;k<8;k++){ const an=k/8*6.283; ctx.beginPath(); ctx.ellipse(x+Math.cos(an)*22*s,y+Math.sin(an)*22*s,20*s,9*s,an,0,6.283); shape(ctx,C.goud,lighten(C.goud,0.3),1.5); } dot(ctx,x,y,12*s,C.oker,lighten(C.oker,0.3),1.5); ctx.restore(); }
function slaPlant(x,yg,s,o={}){ // x, grondlijn yg; o: {wortel,stengel,blad,bloem,hl}
  const A=k=>o[k]===undefined?1:o[k];
  roots(x,yg,s*0.9,A('wortel'));
  alpha(ctx,A('stengel'),()=>{ ctx.strokeStyle=G1; ctx.lineWidth=16*s; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x,yg); ctx.quadraticCurveTo(x+10*s,yg-250*s,x-6*s,yg-470*s); ctx.stroke(); ctx.strokeStyle=lighten(G1,0.3); ctx.lineWidth=2; ctx.stroke(); });
  alpha(ctx,A('blad'),()=>{ [[-90,-120,0.9,-0.9,1],[95,-140,0.9,0.9,2],[-80,-250,0.75,-1.0,3],[85,-270,0.75,1.0,4],[-60,-360,0.6,-1.1,5],[60,-380,0.6,1.1,6]].forEach(([dx,dy,sc,rot,seed])=>{ lettuceLeaf(x+dx*s,yg+dy*s,95*s*sc,55*s*sc,rot,seed,x,yg+dy*s+40*s,seed%2?G1:G2,V1,{amp:0.06}); }); });
  flower(x-6*s,yg-490*s,s*1.1,A('bloem'));
  if(o.hl){ const P={wortel:[x,yg+150*s,200*s],stengel:[x,yg-230*s,70*s],blad:[x+95*s,yg-140*s,110*s],bloem:[x-6*s,yg-490*s,60*s]}[o.hl]; ctx.save(); ctx.setLineDash([10,8]); ctx.beginPath(); ctx.arc(P[0],P[1],P[2],0,6.283); ctx.strokeStyle=C.goud; ctx.lineWidth=2.5; ctx.stroke(); ctx.restore(); } }
// bladdoorsnede: opperhuid boven en onder, bladmoes, vaatbundel
function leafCross(x,y,w,o={}){ const A=k=>o[k]===undefined?1:o[k]; const h=360;
  ctx.save(); ctx.beginPath(); ctx.rect(x-w/2,y-h/2,w,h); ctx.fillStyle=C.bgMicro; ctx.fill(); ctx.strokeStyle=rgba(C.line,0.3); ctx.lineWidth=1; ctx.stroke();
  alpha(ctx,A('moes'),()=>{ for(let r=0;r<4;r++) for(let c=0;c<Math.floor(w/70);c++){ const px=x-w/2+45+c*70+(r%2?20:0), py=y-110+r*72; if(Math.abs(px-x)<70&&r>=1&&r<=2) continue; ctx.beginPath(); ctx.ellipse(px,py,30,32,0,0,6.283); shape(ctx,rgba(C.teal,0.18),C.groen,3); for(let k=0;k<4;k++){ const an=k*1.6+hash(r*11+c); chloroplast(ctx,px+Math.cos(an)*14,py+Math.sin(an)*15,16,1,an); } } });
  alpha(ctx,A('opper'),()=>{ [y-h/2+22,y+h/2-22].forEach(py=>{ for(let c=0;c<Math.floor(w/60);c++){ const px=x-w/2+32+c*60; ctx.beginPath(); ctx.ellipse(px,py,29,19,0,0,6.283); shape(ctx,rgba('#C9D6E6',0.25),'#9FB3CC',2); dot(ctx,px,py,5,'rgba(42,62,128,0.85)'); } }); });
  alpha(ctx,A('vaat'),()=>{ ctx.beginPath(); ctx.ellipse(x,y+10,64,78,0,0,6.283); shape(ctx,rgba(C.oker,0.2),C.oker,3); [[-22,-30],[22,-30],[0,-5],[-24,22],[24,22],[0,45]].forEach(([dx,dy])=>{ ctx.beginPath(); ctx.arc(x+dx,y+10+dy,14,0,6.283); shape(ctx,rgba(C.teal,0.35),lighten(C.teal,0.2),2); }); });
  if(o.hl){ const P={opper:[x,y-h/2+22,w,50],moes:[x,y-25,w,200],vaat:[x,y+10,150,180]}[o.hl]; ctx.save(); ctx.setLineDash([10,8]); roundRect(ctx,P[0]-P[2]/2,P[1]-P[3]/2,P[2],P[3],12); ctx.strokeStyle=C.goud; ctx.lineWidth=2.5; ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
// trap van vijf treden
const TRAP=[['cel','',C.koraal],['weefsel','dezelfde cellen, dezelfde taak'],['orgaan','verschillende weefsels samen'],['orgaanstelsel','organen die samenwerken'],['organisme','alles samen: één levend wezen']];
function trap(al,sub=true){ const x0=120,y0=780,sw=330,sh=118;
  TRAP.forEach((s,i)=>{ const a=al[i]; if(a<=0.01) return; alpha(ctx,a,()=>{ const x=x0+i*sw, y=y0-i*sh; ctx.beginPath(); ctx.rect(x,y,sw-6,H-y-200); shape(ctx,rgba(C.fill,0.9),C.line,1.5); text(ctx,s[0],x+24,y+52,fTekst(40,700),C.goud); if(sub&&s[1]){ ctx.font=fTekst(26); ctx.fillStyle=C.text2; ctx.textAlign='left'; wrap(ctx,s[1],x+24,y+92,sw-50,32); } }); }); }
function trapArt(al,t){ // tekeningen op de treden: mens
  alpha(ctx,al[0],()=>muscleCell(285,560,200));
  alpha(ctx,al[1],()=>{ for(let k=0;k<5;k++) muscleCell(615,470+k*20-40,210,0.9); });
  alpha(ctx,al[2],()=>calf(945,390,0.5,1,{zenuw:1,vat:1,bind:1}));
  alpha(ctx,al[3],()=>{ ctx.save(); ctx.globalAlpha*=0.35; human(ctx,1275,420,300,1,C.mens); ctx.restore(); heart(1268,262,0.5,1,t*5); ctx.strokeStyle='#C47070'; ctx.lineWidth=3; ctx.lineCap='round'; [[1268,282,1250,400],[1268,282,1290,400],[1268,244,1268,160],[1262,250,1232,300],[1274,250,1304,300]].forEach(([a,b,c,d])=>{ ctx.beginPath(); ctx.moveTo(a,b); ctx.quadraticCurveTo((a+c)/2+6,(b+d)/2,c,d); ctx.stroke(); }); });
  alpha(ctx,al[4],()=>human(ctx,1600,300,300,1,C.mens)); }


// ===== Een rondleiding door je lichaam — scènes (kerndoelen onderbouw, film 2b) =====
// Hulpjes uit film 1 (helpers1.js) en film 2 (helpers2.js: bodyOrgans, SYS, sysLabel, heart, lungs, kidney, bone, vessel, slaPlant, …) staan hierboven.
// Opbouw: links in een inzetcirkel het moment van de dag, in het midden het lichaam waarin organen oplichten, labels links en rechts.

BODY.cx=1120; Object.values(SYS).forEach(v=>{ if(v[3]===1400) v[3]=1500; if(v[3]===440) v[3]=900; }); SYS.hormoon[4]=170; SYS.hormoon[5]='regelen'; SYS.bloed[4]=250;
const U=BODY.h/8, TOP=BODY.yb-BODY.h, CX=BODY.cx;
// orgaanlabels: naam → [aanwijspunt x (in U vanaf cx), y (in U vanaf top), labelplek x, y]
const ORG={
  hersenen:[0,0.5,1500,110], ogen:[-0.3,0.9,900,230], ruggenmerg:[0,3.0,1500,260], zenuwen:[1.6,4.6,1500,700],
  mond:[0,1.25,1500,170], slokdarm:[0.08,2.3,1500,260], maag:[0.3,4.3,1500,520], 'dunne darm':[0.1,5.0,1500,610], 'dikke darm':[-0.9,5.2,900,700], alvleesklier:[0.75,4.62,1500,440], lever:[-0.95,4.05,900,560],
  spieren:[-1.55,3.1,900,330], botten:[0.7,6.6,1500,760], schedel:[0.55,0.3,1500,90],
  neus:[0,1.0,900,180], luchtpijp:[-0.1,2.3,900,260], longen:[-0.95,3.3,900,420],
  hart:[-0.3,2.95,900,300], bloedvaten:[-0.7,7.2,900,760],
  nieren:[0.95,4.55,1500,520], urineleiders:[0.4,5.3,1500,640], blaas:[0.15,5.9,1500,760],
  huid:[-1.4,3.6,900,480], lymfeklieren:[1.35,2.5,1500,300], 'witte bloedcellen':[0.6,7.0,1500,760],
  hypofyse:[0,0.85,1500,130], schildklier:[0.2,1.65,1500,230], eierstokken:[0.5,5.4,1500,640], baarmoeder:[0.1,5.45,1500,720], zaadballen:[0.1,6.25,1500,800],
};
function orgLabel(k,a,meta='',color=C.text){ if(a<=0.01) return; const o=ORG[k]; label(ctx,k,meta,CX+o[0]*U,TOP+o[1]*U,o[2],o[3],a,color); }
function orgRing(k,a,rx=40,ry=40){ if(a<=0.01) return; const o=ORG[k]; ctx.save(); ctx.globalAlpha*=a; ctx.setLineDash([8,7]); ctx.beginPath(); ctx.ellipse(CX+o[0]*U,TOP+o[1]*U,rx,ry,0,0,6.283); ctx.strokeStyle=C.goud; ctx.lineWidth=2.5; ctx.stroke(); ctx.restore(); }
// extra organen die bodyOrgans niet apart tekent
function liver(a){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; const x=CX-70,y=TOP+U*4.05; ctx.beginPath(); ctx.moveTo(x-80,y-30); ctx.quadraticCurveTo(x+40,y-50,x+70,y-10); ctx.quadraticCurveTo(x+30,y+40,x-40,y+30); ctx.quadraticCurveTo(x-90,y+10,x-80,y-30); ctx.closePath(); shape(ctx,'#8E4A44','#B86A62',2); ctx.restore(); }
function pancreas(a){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.beginPath(); ctx.ellipse(CX+40,TOP+U*4.62,70,14,-0.15,0,6.283); shape(ctx,rgba(C.goud,0.6),lighten(C.goud,0.3),1.5); ctx.restore(); }
function mouth(a){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.strokeStyle=C.oker; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(CX,TOP+U*1.1,U*0.3,0.3,2.84); ctx.stroke(); ctx.restore(); }
function skull(a){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.beginPath(); ctx.arc(CX,TOP+U,U*0.98,0,6.283); ctx.strokeStyle='#E9E4D6'; ctx.lineWidth=6; ctx.stroke(); ctx.restore(); }
function skin(a){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.strokeStyle='#E0BE9C'; ctx.lineWidth=7; const u=U,x=CX,y=BODY.yb,h=BODY.h; ctx.beginPath(); ctx.arc(x,y-h+u,u*0.9+4,0,6.283); ctx.stroke(); roundRect(ctx,x-u*1.3-4,y-h+u*2.1-4,u*2.6+8,u*3.6+8,u*0.8); ctx.stroke(); roundRect(ctx,x-u*1.2-4,y-h+u*5.5-4,u*1.0+8,u*2.5+8,u*0.4); ctx.stroke(); roundRect(ctx,x+u*0.2-4,y-h+u*5.5-4,u*1.0+8,u*2.5+8,u*0.4); ctx.stroke(); ctx.restore(); }
function eyes(a){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; [[-0.3],[0.3]].forEach(([d])=>dot(ctx,CX+d*U,TOP+U*0.9,9,C.teal,lighten(C.teal,0.3),1.5)); ctx.restore(); }
function nose(a){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.strokeStyle=C.teal; ctx.lineWidth=5; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(CX,TOP+U*0.95); ctx.lineTo(CX,TOP+U*1.2); ctx.lineTo(CX,TOP+U*2.6); ctx.stroke(); ctx.restore(); }
function pulse(t){ return 0.5+0.5*Math.sin(t*2.2); }
// inzet: moment van de dag
function vignette(kind,cx,cy,r,a,t=0){ inset(cx,cy,r,a,()=>{ ctx.save(); ctx.translate(cx,cy); const k=r/170;
  ctx.scale(k,k); ctx.lineCap='round';
  if(kind==='nacht'||kind==='slapen'){ ctx.fillStyle='#0D1420'; ctx.fillRect(-200,-200,400,400); dot(ctx,70,-80,34,C.goud); dot(ctx,56,-90,30,'#0D1420'); roundRect(ctx,-120,10,220,60,12); shape(ctx,C.fill,C.line,2); roundRect(ctx,-110,-20,60,36,10); shape(ctx,C.text2,C.line,1.5); ctx.beginPath(); ctx.arc(-40,0,22,0,6.283); shape(ctx,C.mens,lighten(C.mens,0.3),1.5); roundRect(ctx,-14,-12,110,34,10); shape(ctx,'#6E7FA8',lighten('#6E7FA8',0.2),1.5); if(kind==='nacht'){ for(let i=0;i<3;i++) text(ctx,'z',40+i*18,-30-i*18,fTekst(22+i*6,600),C.text2,'center'); } }
  if(kind==='wekker'){ dot(ctx,0,10,80,C.fill,C.line,3); ctx.strokeStyle=C.text; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(0,10); ctx.lineTo(0,-45); ctx.moveTo(0,10); ctx.lineTo(40,10); ctx.stroke(); dot(ctx,0,10,5,C.goud); ctx.lineWidth=6; ctx.strokeStyle=C.line; ctx.beginPath(); ctx.moveTo(-60,-50); ctx.lineTo(-80,-70); ctx.moveTo(60,-50); ctx.lineTo(80,-70); ctx.stroke(); const sh=Math.sin(t*25)*6; ctx.strokeStyle=C.goud; ctx.lineWidth=3; [-1,1].forEach(d=>{ ctx.beginPath(); ctx.arc(d*95+sh,-20,14,0,6.283); ctx.stroke(); }); text(ctx,'7:00',0,-100,fMeta(26),C.grain,'center'); }
  if(kind==='ontbijt'){ ctx.beginPath(); ctx.ellipse(0,20,110,40,0,0,6.283); shape(ctx,C.fill,C.line,2); ctx.save(); ctx.translate(-10,-10); ctx.rotate(-0.1); roundRect(ctx,-60,-45,120,80,22); shape(ctx,C.oker,lighten(C.oker,0.3),2); ctx.beginPath(); ctx.arc(-30,-45,30,Math.PI,0); ctx.arc(30,-45,30,Math.PI,0); shape(ctx,C.oker,lighten(C.oker,0.3),2); ctx.restore(); }
  if(kind==='fiets'){ ctx.strokeStyle=C.line; ctx.lineWidth=4; dot(ctx,-70,40,48,'rgba(0,0,0,0)',C.line,4); dot(ctx,70,40,48,'rgba(0,0,0,0)',C.line,4); ctx.beginPath(); ctx.moveTo(-70,40); ctx.lineTo(-20,-30); ctx.lineTo(60,-30); ctx.lineTo(70,40); ctx.moveTo(-20,-30); ctx.lineTo(10,40); ctx.lineTo(60,-30); ctx.moveTo(10,40); ctx.lineTo(-70,40); ctx.moveTo(60,-30); ctx.lineTo(50,-60); ctx.moveTo(-20,-30); ctx.lineTo(-30,-55); ctx.stroke(); ctx.lineWidth=6; ctx.beginPath(); ctx.moveTo(-45,-55); ctx.lineTo(-15,-55); ctx.stroke(); human(ctx,15,-20,130,1,C.mens); }
  if(kind==='wc'){ roundRect(ctx,-60,-110,120,220,8); shape(ctx,C.fill,C.line,2); dot(ctx,35,0,7,C.goud); text(ctx,'WC',0,-60,fTekst(34,700),C.text,'center'); }
  if(kind==='klas'){ [[-55,0],[55,0]].forEach(([x],i)=>{ human(ctx,x,110,200,1,C.mens); }); for(let i=0;i<3;i++){ const u=((t*0.8+i/3)%1); dot(ctx,70+u*60,-60-u*30-i*8,6+u*8,rgba(C.koraal,0.7*(1-u))); } }
  if(kind==='koud'){ human(ctx,-40,110,210,1,C.mens); ctx.strokeStyle=C.teal; ctx.lineWidth=3; for(let i=0;i<3;i++){ const x=50+i*35, y=-70+i*30; ctx.beginPath(); for(let k=0;k<3;k++){ const a=k*Math.PI/3; ctx.moveTo(x-Math.cos(a)*16,y-Math.sin(a)*16); ctx.lineTo(x+Math.cos(a)*16,y+Math.sin(a)*16); } ctx.stroke(); } }
  if(kind==='avond'){ ctx.fillStyle='#16203A'; ctx.fillRect(-200,-200,400,400); dot(ctx,70,-80,34,C.goud); dot(ctx,56,-90,30,'#16203A'); roundRect(ctx,-120,30,200,50,12); shape(ctx,C.fill,C.line,2); human(ctx,-60,30,150,1,C.mens); }
  if(kind==='tuin'){ ctx.fillStyle='#2A2119'; ctx.fillRect(-200,40,400,200); dot(ctx,-90,-90,26,C.goud); krop(0,40,0.4,0); }
  ctx.restore(); }); }
const V={x:270,y:330,r:150};
function dagInzet(kind,a,t){ vignette(kind,V.x,V.y,V.r,a,t); }
function tijd(s,a){ pill(ctx,V.x,V.y+V.r+60,s,C.grain,a,26); }

// ================= SCÈNES =================
const SCENES={
// ---- cold open: nacht ----
s01(ctx,t,q){ bg(ctx,'schema'); ctx.fillStyle='#0D1420'; ctx.fillRect(0,0,W,H);
  dot(ctx,1500,200,70,C.goud); dot(ctx,1470,180,64,'#0D1420'); for(let i=0;i<30;i++) dot(ctx,hash(i*3.1)*W,hash(i*7.7)*500,1.5+hash(i)*1.5,rgba(C.text,0.6));
  roundRect(ctx,520,560,900,120,24); shape(ctx,C.fill,C.line,2); roundRect(ctx,560,480,180,90,20); shape(ctx,C.text2,C.line,1.5); roundRect(ctx,760,500,560,70,18); shape(ctx,'#6E7FA8',lighten('#6E7FA8',0.2),1.5); ctx.beginPath(); ctx.arc(690,520,44,0,6.283); shape(ctx,C.mens,lighten(C.mens,0.3),1.5);
  for(let i=0;i<3;i++) alpha(ctx,0.5+0.5*Math.sin(t*2-i),()=>text(ctx,'z',800+i*30,440-i*30,fTekst(30+i*8,600),C.text2,'center'));
  pill(ctx,960,150,'6:00',C.grain,ramp(t,0.2,0.4),34);
  pill(ctx,960,780,'hoeveel van je organen zijn nu aan het werk?',C.goud,ramp(t,q.at('Hoeveel'),0.5),36);
},
// ---- titel ----
s03(ctx,t,q){ bg(ctx,'schema'); const a=ramp(t,0.1,0.7);
  alpha(ctx,a,()=>{ text(ctx,'Een rondleiding',120,340,fTitel(100),C.text); text(ctx,'door je lichaam',120,440,fTitel(100),C.text); text(ctx,'Een dag uit je leven, van binnen bekeken',120,520,fTekst(44),C.text2); });
  alpha(ctx,ramp(t,0.5,1.2),()=>{ ctx.save(); ctx.translate(1420,0); ctx.scale(0.72,0.72); ctx.translate(-960,120); bodyOrgans({sil:0.45,zenuw:1,spijs:1,adem:1,bloed:1,uitsch:1,skelet:0,hormoon:1,afweer:1,t,beat:t*5,breath:t*2.5}); ctx.restore(); });
  metaText(ctx,'ONDERBOUW · KERNDOELEN · FILM 2B',W-80,60,C.text2,'right',24); },
// ---- H1: wakker worden, zenuwstelsel ----
s04(ctx,t,q){ bg(ctx,'schema'); const tW=q.at('wekker');
  const intro=1-ramp(t,tW-0.3,0.6);
  alpha(ctx,intro,()=>{ bodyOrgans({sil:0.3,zenuw:0.6,spijs:0.6,adem:0.6,bloed:0.6,uitsch:0.6,hormoon:0.6,afweer:0.6,t,beat:t*3,breath:t*1.5}); pill(ctx,960,100,'bijna al je organen werken door, ook als je slaapt',C.goud,ramp(t,q.at('Bijna'),0.5),30); pill(ctx,960,870,'alle namen hoef je niet te onthouden',C.text2,fadeIO(t,q.at('namen'),q.at('wekker'),0.4),30); dagInzet('nacht',1,t); });
  alpha(ctx,1-intro,()=>{ const h=ramp(t,q.at('hersenen'),0.5), r=ramp(t,q.at('ruggenmerg'),0.5), z=ramp(t,q.at('zenuwen'),0.5), o=ramp(t,q.at('ogen'),0.5);
    bodyOrgans({sil:0.3,zenuw:Math.max(h,r,z),t}); eyes(o);
    dagInzet('wekker',1,t); tijd('7:00 · wakker worden',1);
    orgLabel('hersenen',h,'sturen alles aan',C.paars); orgRing('hersenen',h*(1-r),60,34);
    orgLabel('ruggenmerg',r,'',C.paars); orgLabel('zenuwen',z,'signalen heen en weer',C.paars); orgLabel('ogen',o,'vangen licht',C.teal);
    const sig=fadeIO(t,q.at('Signalen'),q.at('ogen'),0.4); for(let i=0;i<5;i++){ const u=((t*0.6+i/5)%1); alpha(ctx,sig,()=>dot(ctx,CX,TOP+U*(1.6+u*3.8),6,C.paars)); }
    pill(ctx,960,100,'zenuwstelsel',C.goud,ramp(t,q.at('zenuwstelsel'),0.5),34); });
},
// ---- H1: ontbijt, spijsvertering, lever-vraag ----
s05(ctx,t,q){ bg(ctx,'schema'); const K=['mond','slokdarm','maag','dunne','dikke'];
  const m=ramp(t,q.at('mond'),0.5), sl=ramp(t,q.at('slokdarm'),0.5), ma=ramp(t,q.at('maag'),0.5), dd=ramp(t,q.at('dunne'),0.5), dk=ramp(t,q.at('dikke'),0.5), al=ramp(t,q.at('alvleesklier'),0.5), le=ramp(t,q.at('lever'),0.5);
  bodyOrgans({sil:0.3,spijs:ramp(t,q.at('spijsverteringsstelsel'),0.6),t}); mouth(m); pancreas(al); liver(le);
  dagInzet('ontbijt',1,t); tijd('7:30 · ontbijt',1);
  orgLabel('mond',m,'tanden en speeksel',C.oker); orgLabel('slokdarm',sl,'duwt naar de maag',C.oker); orgLabel('maag',ma,'mengt met zuur',C.oker);
  orgLabel('dunne darm',dd,'voedingsstoffen → bloed',C.oker); orgLabel('dikke darm',dk,'haalt water eruit',C.oker);
  orgLabel('alvleesklier',al,'sap dat eten afbreekt',C.goud); orgLabel('lever',le,'rechts onder je ribben',C.koraal); orgRing('lever',ramp(t,q.at('groot'),0.4),90,50);
  const bol=fadeIO(t,q.at('ontbijten'),q.at('alvleesklier'),0.4); const stops=[[q.at('mond'),0,1.25],[q.at('slokdarm'),0.08,2.3],[q.at('maag'),0.3,4.3],[q.at('dunne'),0.1,5.0],[q.at('dikke'),-0.9,5.2]]; let px=CX,py=TOP+U*1.25; for(let i=1;i<stops.length;i++){ const u=clamp((t-stops[i][0]+1)/1,0,1); if(t>=stops[i-1][0]){ px=lerp(CX+stops[i-1][1]*U,CX+stops[i][1]*U,u); py=lerp(TOP+stops[i-1][2]*U,TOP+stops[i][2]*U,u); } } alpha(ctx,bol*ramp(t,q.at('mond'),0.3),()=>dot(ctx,px,py,9,C.oker,lighten(C.oker,0.4),1.5));
  pill(ctx,960,100,'spijsverteringsstelsel',C.goud,fadeIO(t,q.at('spijsverteringsstelsel'),q.at('welk'),0.5),34);
  pill(ctx,960,100,'bij welk stelsel hoort de lever?',C.goud,ramp(t,q.at('welk'),0.5),34);
},
// ---- H2: lever; fietsen: spieren en botten ----
s07(ctx,t,q){ bg(ctx,'schema'); const tF=q.at('fietst');
  const a1=1-ramp(t,tF-0.3,0.6); alpha(ctx,a1,()=>{ bodyOrgans({sil:0.3,spijs:0.6,t}); liver(1); orgLabel('lever',1,'bij je spijsvertering',C.koraal); dagInzet('ontbijt',1,t);
    pill(ctx,960,100,'maakt een sap voor het verteren van vet',C.koraal,fadeIO(t,q.at('sap'),q.at('bewaart'),0.4),30); pill(ctx,960,100,'bewaart voedingsstoffen voor later',C.koraal,ramp(t,q.at('bewaart'),0.4),30); });
  alpha(ctx,1-a1,()=>{ const sp=ramp(t,q.at('spieren'),0.5), bo=ramp(t,q.at('botten'),0.5), sc=ramp(t,q.at('schedel'),0.5);
    bodyOrgans({sil:0.3,skelet:bo,spier:sp,t}); skull(sc); dagInzet('fiets',1,t); tijd('8:15 · naar school',1);
    orgLabel('spieren',sp,'trekken aan je botten',C.koraal); orgLabel('botten',bo,'vorm en stevigheid','#E9E4D6'); orgLabel('schedel',sc,'beschermt je hersenen','#E9E4D6');
    pill(ctx,960,100,'spierstelsel',C.goud,fadeIO(t,q.at('spierstelsel'),q.at('skelet'),0.4),34); pill(ctx,960,100,'spierstelsel · skelet',C.goud,ramp(t,q.at('skelet'),0.4),34); });
},
// ---- H2: ademhaling en bloedvaten ----
s08(ctx,t,q){ bg(ctx,'schema'); const ne=ramp(t,q.at('neus'),0.5), lu=ramp(t,q.at('luchtpijp'),0.5), lo=ramp(t,q.at('longen'),0.5), ha=ramp(t,q.at('hart'),0.5), bv=ramp(t,q.at('bloedvaten'),0.5);
  bodyOrgans({sil:0.3,adem:Math.max(ne,lo),bloed:ha,t,beat:t*8,breath:t*4}); nose(Math.max(ne,lu)); dagInzet('fiets',1,t); tijd('8:30 · ademt dieper',1);
  orgLabel('neus',ne,'',C.teal); orgLabel('luchtpijp',lu,'',C.teal); orgLabel('longen',lo,'zuurstof erin',C.teal);
  const ox=fadeIO(t,q.at('zuurstof'),q.at('hart'),0.4); for(let i=0;i<5;i++){ const u=((t*0.5+i/5)%1); alpha(ctx,ox,()=>{ dot(ctx,CX-U*0.9+Math.sin(u*6)*10,TOP+U*(2.6+u*1.0),7,C.teal); dot(ctx,CX+U*0.7,TOP+U*(3.6-u*1.0),7,rgba(C.text2,0.8)); }); }
  orgLabel('hart',ha,'pompt het bloed rond',C.koraal); orgLabel('bloedvaten',bv,'tot in je tenen',C.koraal);
  pill(ctx,960,100,'ademhalingsstelsel',C.goud,fadeIO(t,q.at('ademhalingsstelsel'),q.at('hart'),0.4),34);
  pill(ctx,960,870,'100 000 keer per dag',C.koraal,fadeIO(t,q.at('Honderdduizend'),q.at('bloedvatenstelsel'),0.4),30);
  pill(ctx,960,100,'bloedvatenstelsel',C.goud,ramp(t,q.at('bloedvatenstelsel'),0.4),34);
},
// ---- H2: wc, uitscheiding ----
s09(ctx,t,q){ bg(ctx,'schema'); const ni=ramp(t,q.at('nieren'),0.5), ur=ramp(t,q.at('urineleiders'),0.5), bl=ramp(t,q.at('blaas'),0.5);
  bodyOrgans({sil:0.3,uitsch:Math.max(ni,ur,bl),bloed:0.35,t}); dagInzet('wc',1,t); tijd('10:00 · op school',1);
  orgLabel('nieren',ni,'maken je bloed schoon','#C47070'); orgLabel('urineleiders',ur,'',C.teal); orgLabel('blaas',bl,'bewaart de urine',C.teal);
  const fl=fadeIO(t,q.at('Afvalstoffen'),q.at('uitscheidingsstelsel'),0.4); for(let i=0;i<4;i++){ const u=((t*0.5+i/4)%1); alpha(ctx,fl,()=>{ dot(ctx,lerp(CX+85,CX+25,u),lerp(TOP+U*4.8,TOP+U*5.75,u),6,C.teal); dot(ctx,lerp(CX-55,CX+5,u),lerp(TOP+U*4.8,TOP+U*5.75,u),6,C.teal); }); }
  pill(ctx,960,870,'de hele dag, ook vannacht',C.grain,fadeIO(t,q.at('hele'),q.at('Afvalstoffen'),0.4),28);
  pill(ctx,960,870,'afvalstoffen + te veel water = urine',C.teal,fadeIO(t,q.at('urine'),q.at('uitscheidingsstelsel'),0.4),28);
  pill(ctx,960,100,'uitscheidingsstelsel',C.goud,ramp(t,q.at('uitscheidingsstelsel'),0.4),34);
},
// ---- H2: afweer ----
s10(ctx,t,q){ bg(ctx,'schema'); const af=ramp(t,q.at('afweersysteem'),0.5), wb=ramp(t,q.at('witte'),0.5), ly=ramp(t,q.at('lymfeklieren'),0.5);
  bodyOrgans({sil:0.3,bloed:0.35,afweer:Math.max(af,ly),t}); dagInzet('klas',1,t); tijd('11:00 · in de les',1);
  inset(1640,620,140,wb,()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(1500,480,280,280); vessel(1640,470,180,300,t,1); const at=ramp(t,q.at('vallen'),0.5); if(at>0.01){ const ex=1640+40, ey=620+((t*55+200)%300)-150; for(let i=0;i<3;i++){ const a=i*2.1+t*3; alpha(ctx,at,()=>dot(ctx,ex+Math.cos(a)*30,ey+Math.sin(a)*30,5,C.groen)); } } });
  metaText(ctx,'witte bloedcellen vallen ziekteverwekkers aan',1640,790,C.grain,'center',22*clamp(wb,0.01,1));
  orgLabel('lymfeklieren',ly,'in hals en oksels',C.groen);
  pill(ctx,960,870,'meestal word je niet ziek',C.groen,fadeIO(t,q.at('Meestal'),q.at('witte'),0.4),30);
  pill(ctx,960,100,'afweersysteem',C.goud,af,34);
},
// ---- H2: buiten, huid-vraag ----
s11(ctx,t,q){ bg(ctx,'schema'); const hu=ramp(t,q.at('huid'),0.5); bodyOrgans({sil:0.3,t}); skin(hu); dagInzet('koud',1,t); tijd('12:30 · pauze, buiten',1);
  orgLabel('huid',hu,'voelt de kou','#E0BE9C'); pill(ctx,960,100,'is je huid een orgaan?',C.goud,ramp(t,q.at('orgaan'),0.5),36); },
// ---- H3: huid = orgaan; avond, hormonen-vraag ----
s13(ctx,t,q){ bg(ctx,'schema'); const tA=q.at('Avonds');
  const a1=1-ramp(t,tA-0.3,0.6); alpha(ctx,a1,()=>{ bodyOrgans({sil:0.3,t}); skin(1); dagInzet('koud',1,t); orgLabel('huid',1,'je grootste orgaan','#E0BE9C');
    // doorsnede huid
    const cs=ramp(t,q.at('laag'),0.5); alpha(ctx,cs,()=>{ const x=1400,y=420,w=420; roundRect(ctx,x,y,w,60,6); shape(ctx,'#E0BE9C','#F0D6B8',1.5); roundRect(ctx,x,y+60,w,170,6); shape(ctx,rgba(C.grain,0.35),C.grain,1.5); ctx.strokeStyle=C.paars; ctx.lineWidth=2.5; ctx.beginPath(); ctx.moveTo(x+80,y+230); ctx.quadraticCurveTo(x+100,y+120,x+140,y+70); ctx.moveTo(x+300,y+230); ctx.quadraticCurveTo(x+320,y+140,x+360,y+75); ctx.stroke(); ctx.strokeStyle='#C47070'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x+200,y+230); ctx.quadraticCurveTo(x+210,y+120,x+250,y+80); ctx.stroke();
      metaText(ctx,'dekweefsel',x,y-14,'#E0BE9C','left',22); metaText(ctx,'bindweefsel, zenuwen, bloedvaten',x,y+260,C.grain,'left',22); });
    pill(ctx,960,100,'taak: beschermen en je temperatuur regelen',C.goud,ramp(t,q.at('Taak'),0.4),30); });
  alpha(ctx,1-a1,()=>{ bodyOrgans({sil:0.3,bloed:0.5,hormoon:ramp(t,q.at('hormonen'),0.5),t}); dagInzet('avond',1,t); tijd('20:00 · moe',1);
    const hm=ramp(t,q.at('stoffen'),0.5); for(let i=0;i<8;i++){ const u=((t*0.25+i/8)%1); const a=u*6.283; alpha(ctx,hm,()=>dot(ctx,CX-30+Math.cos(a)*U*1.0,TOP+U*2.95+Math.sin(a)*U*2.6,6,C.goud)); }
    pill(ctx,960,870,'hormonen: stoffen die in je bloed reizen',C.goud,hm,28);
    pill(ctx,960,100,'je groeit, vooral als je slaapt',C.text,fadeIO(t,q.at('groeit'),q.at('zijn'),0.4),30);
    pill(ctx,960,100,'hormonen: alleen in de puberteit?',C.goud,ramp(t,q.at('zijn'),0.5),34); });
},
// ---- H3: hormoonklieren en voortplanting ----
s15(ctx,t,q){ bg(ctx,'schema'); const hy=ramp(t,q.at('hypofyse'),0.5), sk=ramp(t,q.at('schildklier'),0.5), vp=ramp(t,q.at('voortplantingsorganen'),0.5), ei=ramp(t,q.at('Eierstokken'),0.5), ba=ramp(t,q.at('baarmoeder'),0.5), za=ramp(t,q.at('zaadballen'),0.5);
  bodyOrgans({sil:0.3,hormoon:Math.max(hy,sk),voortpl:vp,t}); dagInzet('avond',1,t); tijd('20:00 · groeien',1);
  alpha(ctx,za,()=>{ dot(ctx,CX-18,TOP+U*6.25,10,C.koraal); dot(ctx,CX+22,TOP+U*6.25,10,C.koraal); });
  pill(ctx,960,870,'je hele leven, van baby tot oud',C.goud,fadeIO(t,q.at('leven'),q.at('hypofyse'),0.4),30);
  orgLabel('hypofyse',hy,'regelt je groei',C.goud); orgLabel('schildklier',sk,'hoe snel je lichaam werkt',C.goud);
  orgLabel('eierstokken',ei,'',C.koraal); orgLabel('baarmoeder',ba,'',C.koraal); orgLabel('zaadballen',za,'',C.koraal);
  pill(ctx,960,100,'hormoonstelsel',C.goud,fadeIO(t,q.at('hormoonstelsel'),q.at('voortplantingsstelsel'),0.4),34);
  pill(ctx,960,870,'in de puberteit: eicellen of zaadcellen',C.koraal,fadeIO(t,q.at('puberteit'),q.at('voortplantingsstelsel'),0.4),28);
  pill(ctx,960,100,'voortplantingsstelsel',C.goud,ramp(t,q.at('voortplantingsstelsel'),0.4),34);
},
// ---- H3 havo/vwo: organen bij twee stelsels ----
s16(ctx,t,q){ bg(ctx,'schema'); const cards=[['alvleesklier',q.at('alvleesklier'),['spijsverteringsstelsel','hormoonstelsel'],q.at('Spijsvertering'),()=>{ ctx.beginPath(); ctx.ellipse(0,0,90,22,-0.15,0,6.283); shape(ctx,rgba(C.goud,0.6),lighten(C.goud,0.3),2); },'sap voor je darm · insuline'],
  ['lever',q.at('lever'),['spijsverteringsstelsel','uitscheidingsstelsel'],q.at('Spijsvertering',2),()=>{ ctx.beginPath(); ctx.moveTo(-90,-30); ctx.quadraticCurveTo(40,-50,80,-10); ctx.quadraticCurveTo(30,40,-40,30); ctx.quadraticCurveTo(-100,10,-90,-30); ctx.closePath(); shape(ctx,'#8E4A44','#B86A62',2); },'verteert · breekt gif af'],
  ['huid',q.at('huid'),['afweer en bescherming','uitscheidingsstelsel'],q.at('zweet'),()=>{ roundRect(ctx,-90,-40,180,80,10); shape(ctx,'#C9A27E','#E0BE9C',2); roundRect(ctx,-90,-40,180,22,8); shape(ctx,'#E0BE9C','#F0D6B8',1.5); },'beschermt · zweet = afval eruit']];
  cards.forEach(([n,tt,sys,tt2,fn,meta],i)=>{ const x=330+i*630, a=ramp(t,tt,0.5); alpha(ctx,a,()=>{ roundRect(ctx,x-280,230,560,520,16); shape(ctx,rgba(C.fill,0.6),C.line,1); ctx.save(); ctx.translate(x,360); fn(); ctx.restore(); text(ctx,n,x,470,fTekst(40,600),C.text,'center'); metaText(ctx,meta,x,515,C.grain,'center',22);
      const c2=ramp(t,tt2,0.4); pill(ctx,x,600,sys[0],C.oker,1,26); alpha(ctx,c2,()=>{ text(ctx,'én',x,665,fTekst(30,600),C.goud,'center'); }); pill(ctx,x,720,sys[1],C.teal,c2,26); }); });
  // chips() centreert over W; per kaart zelf tekenen
  pill(ctx,960,120,'sommige organen horen bij twee stelsels',C.goud,ramp(t,q.at('Sommige'),0.5),32);
  pill(ctx,960,850,'antwoord c was dus niet zo gek',C.text2,fadeIO(t,q.at('Antwoord'),q.at('huid'),0.4),26);
  pill(ctx,960,850,'geen losse hokjes: ze werken de hele dag samen',C.goud,ramp(t,q.at('hokjes'),0.5),30);
},
// ---- H3: slapen; hond en muis ----
s17(ctx,t,q){ bg(ctx,'schema'); ctx.fillStyle=rgba('#0D1420',0.5); ctx.fillRect(0,0,W,H); const tH=q.at('hond');
  const a1=1-ramp(t,tH-0.3,0.6); alpha(ctx,a1,()=>{ const p=pulse(t);
    bodyOrgans({sil:0.3,zenuw:0.4+0.4*ramp(t,q.at('hersenen'),0.4),bloed:0.3+0.5*ramp(t,q.at('hart'),0.4),adem:0.3+0.5*ramp(t,q.at('longen'),0.4),uitsch:0.3+0.5*ramp(t,q.at('nieren'),0.4),t,beat:t*4,breath:t*2});
    dagInzet('slapen',1,t); tijd('23:00 · slapen',1);
    orgLabel('hersenen',ramp(t,q.at('hersenen'),0.4),'stoppen niet',C.paars); orgLabel('hart',ramp(t,q.at('hart'),0.4),'klopt door',C.koraal); orgLabel('longen',ramp(t,q.at('longen'),0.4),'ademen door',C.teal); orgLabel('nieren',ramp(t,q.at('nieren'),0.4),'maken bloed schoon','#C47070');
    pill(ctx,960,100,'dag en nacht',C.goud,ramp(t,q.at('Dag'),0.5),34); });
  alpha(ctx,1-a1,()=>{ const gy=760; ctx.strokeStyle=rgba(C.line,0.4); ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(160,gy); ctx.lineTo(1760,gy); ctx.stroke();
    // hond (als kat, met hangoren) en muis
    alpha(ctx,ramp(t,tH,0.5),()=>{ const x=520,y=gy,s=1.3,c=C.okerD; ctx.beginPath(); ctx.ellipse(x,y-55*s,95*s,48*s,0,0,6.283); shape(ctx,c,lighten(c,0.3),2); ctx.beginPath(); ctx.arc(x+92*s,y-110*s,40*s,0,6.283); shape(ctx,c,lighten(c,0.3),2); [[64,-120],[122,-120]].forEach(([dx,dy])=>{ ctx.beginPath(); ctx.ellipse(x+dx*s,y+dy*s+22*s,12*s,26*s,0,0,6.283); shape(ctx,c,lighten(c,0.3),2); }); [[-60],[-30],[40],[70]].forEach(([dx])=>{ roundRect(ctx,x+dx*s-9*s,y-30*s,18*s,30*s,8*s); shape(ctx,c,lighten(c,0.3),1.5); }); ctx.strokeStyle=c; ctx.lineWidth=12*s; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x-88*s,y-70*s); ctx.quadraticCurveTo(x-130*s,y-60*s,x-140*s,y-120*s); ctx.stroke(); ctx.fillStyle=C.bgSchema; ctx.beginPath(); ctx.arc(x+80*s,y-116*s,4*s,0,6.283); ctx.arc(x+106*s,y-116*s,4*s,0,6.283); ctx.fill(); dot(ctx,x+130*s,y-100*s,6*s,C.bgSchema); text(ctx,'hond',x,gy+60,fTekst(32,600),C.text,'center'); });
    alpha(ctx,ramp(t,q.at('muis'),0.5),()=>{ const x=1000,y=gy,s=0.9,c=C.mens; ctx.beginPath(); ctx.ellipse(x,y-28*s,60*s,28*s,0,0,6.283); shape(ctx,c,lighten(c,0.3),2); ctx.beginPath(); ctx.arc(x+50*s,y-40*s,20*s,0,6.283); shape(ctx,c,lighten(c,0.3),2); dot(ctx,x+48*s,y-62*s,9*s,c,lighten(c,0.3),1.5); ctx.strokeStyle=c; ctx.lineWidth=3*s; ctx.beginPath(); ctx.moveTo(x-58*s,y-26*s); ctx.quadraticCurveTo(x-110*s,y-10*s,x-130*s,y-50*s); ctx.stroke(); dot(ctx,x+58*s,y-42*s,2.5*s,C.bgSchema); text(ctx,'muis',x,gy+60,fTekst(32,600),C.text,'center'); });
    alpha(ctx,ramp(t,q.at('Dezelfde'),0.5),()=>{ human(ctx,1450,gy,300,1,C.mens); text(ctx,'jij',1450,gy+60,fTekst(32,600),C.text,'center'); });
    pill(ctx,960,150,'dezelfde organen, dezelfde stelsels, dezelfde dag',C.goud,ramp(t,q.at('Dezelfde'),0.5),32); });
},
// ---- H3: een dag van de plant ----
s18(ctx,t,q){ bg(ctx,'macro'); const tN=q.at('Nachts'); const night=ramp(t,tN-0.3,1.2); const sunU=clamp((t-q.at('Ochtends'))/Math.max(1,tN-q.at('Ochtends')),0,1);
  // lucht + zon/maan
  ctx.fillStyle=rgba('#0D1420',0.55*night); ctx.fillRect(0,0,W,H); const sx=lerp(200,1720,sunU), sy=560-Math.sin(sunU*Math.PI)*420; alpha(ctx,1-night,()=>dot(ctx,sx,sy,46,C.goud)); alpha(ctx,night,()=>{ dot(ctx,1600,160,50,C.goud); dot(ctx,1580,145,46,'#1A2436'); });
  groundLine(700); slaPlant(760,700,1.0,{});
  const wa=fadeIO(t,q.at('halen'),q.at('stengel'),0.4)+ramp(t,q.at('wortels',2),0.5); for(let i=0;i<6;i++){ const u=((t*0.5+i/6)%1); alpha(ctx,clamp(wa,0,1),()=>dot(ctx,lerp(760+(hash(i)-0.5)*300,760,u),lerp(900,720,u),7,C.teal)); }
  const up=fadeIO(t,q.at('stengel'),q.at('Overdag'),0.4); for(let i=0;i<4;i++){ const u=((t*0.5+i/4)%1); alpha(ctx,up,()=>dot(ctx,760+4,lerp(700,260,u),6,C.teal)); }
  const li=fadeIO(t,q.at('Overdag'),tN,0.4)*(1-night); for(let k=0;k<4;k++) arrow(ctx,sx+(k-1.5)*30,sy+70,760+(k-1.5)*70,420,C.goud,3,14,li*0.7);
  label(ctx,'wortels','halen water, houden vast',760,820,1250,840,fadeIO(t,q.at('halen'),q.at('Overdag'),0.4),C.grain); label(ctx,'stengel','brengt het water omhoog',760,470,1250,560,fadeIO(t,q.at('stengel'),q.at('Overdag'),0.4),C.groen);
  label(ctx,'bladeren','vangen licht, maken voedsel',855,560,1250,380,fadeIO(t,q.at('bladeren'),tN,0.4),C.groen); label(ctx,'bloem','maakt zaden',754,210,1250,200,fadeIO(t,q.at('bloem'),tN,0.4),C.goud);
  pill(ctx,760,100,'ook de plant heeft een dag',C.goud,fadeIO(t,q.at('dag'),q.at('Ochtends'),0.4),32);
  pill(ctx,1300,100,"'s nachts: geen licht, maar de wortels werken door",C.text,ramp(t,tN,0.5),28); pill(ctx,1300,170,'net als jij',C.goud,ramp(t,q.at('Net'),0.5),30);
},
// ---- samenvatting: tien stelsels ----
s19(ctx,t,q){ bg(ctx,'schema'); const K=[['zenuw','Zenuwstelsel'],['spijs','Spijsverteringsstelsel'],['spier','Spierstelsel'],['skelet','skelet'],['adem','Ademhalingsstelsel'],['bloed','Bloedvatenstelsel'],['uitsch','Uitscheidingsstelsel'],['afweer','Afweersysteem'],['hormoon','Hormoonstelsel'],['voortpl','Voortplantingsstelsel']];
  const o={sil:0.3,t,beat:t*5,breath:t*2.5}; K.forEach(([k,w])=>o[k]=0.35+0.65*ramp(t,q.at(w),0.5)); bodyOrgans(o); skin(ramp(t,q.at('huid'),0.5));
  K.forEach(([k,w])=>sysLabel(k,ramp(t,q.at(w),0.5)));
  label(ctx,'huid','beschermt alles',CX-U*1.4,TOP+U*3.6,440,480,ramp(t,q.at('huid'),0.5),'#E0BE9C');
  pill(ctx,960,100,'tien orgaanstelsels, één dag',C.goud,ramp(t,q.at('Tien'),0.5),34);
  pill(ctx,960,870,'elk orgaan: eigen plek, eigen taak · samen zijn ze jij',C.goud,ramp(t,q.at('Elk'),0.5),30);
},
// ---- eindkaart ----
s20(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Probeer het zelf',120,200,fTitel(80),C.text); metaText(ctx,'welk orgaan hoort bij welk stelsel?',120,260,C.grain,'left',26);
  const P=[['Sorteer','lever · nieren · longen · hypofyse · maag · lymfeklieren · hart · ruggenmerg · blaas · schildklier'],['Jouw dag','Kies vijf dingen die je vandaag deed. Noem per ding één orgaan en zijn stelsel.'],['Lastig','Bij welk stelsel hoort de huid? Waarom is dat een strikvraag?']];
  P.forEach((p,i)=>{ const x=120+i*575; alpha(ctx,ramp(t,0.6+i*0.6,0.6),()=>{ roundRect(ctx,x,330,535,300,14); shape(ctx,rgba(C.bgSchema,0.95),C.line,1); text(ctx,p[0],x+28,392,fTekst(38,600),C.goud); ctx.font=fTekst(32); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,p[1],x+28,450,480,42); }); });
  alpha(ctx,ramp(t,2.6,0.6),()=>{ ctx.font=fTekst(36,600); ctx.fillStyle=C.goud; ctx.textAlign='left'; wrap(ctx,'Welke organen werken door als je slaapt? Noem er vier.',120,720,1680,46); });
  metaText(ctx,'biologie bij kamiel · stem: roos (elevenlabs) · versie 1.0 · oktober 2026',W/2,CAPTION_Y-10,C.text2,'center',22); },
};
