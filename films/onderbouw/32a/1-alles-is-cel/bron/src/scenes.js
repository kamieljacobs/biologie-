// ===== Alles is cel — scènes (kerndoelen onderbouw, film 1) =====
// Elke scène: SCENES.sNN(ctx, t, q). t = seconden in de take; q.at('woord', n) = begintijd van het n-de woord dat 'woord' bevat.
// castboek heeft circ() nodig
function circ(ctx,x,y,r,fill,stroke,lw=1.5){ ctx.beginPath(); ctx.arc(x,y,r,0,6.283); if(fill){ctx.fillStyle=fill;ctx.fill();} if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=lw;ctx.stroke();} }
// Versie 1.1 (21 okt 2026): 'jij' in s04 is Lotte uit het castboek (lib_cast.js, in build.py vóór dit bestand geplakt) i.p.v. het grijze poppetje; human() wordt niet meer gebruikt.
// Tekenstijl: Part C, vlak, zoals Celorganellen en Diffusie. Sla, keuken en wangcellen zijn eigen tekeningen (stijlframes 12-10-2026).

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

// ================= SCÈNES =================
const SCENES={
// ---- cold open: stevig → slap → koud water → stevig ----
s01(ctx,t,q){
  const sunU=clamp((t-q.at('vergeet'))/Math.max(0.5,q.at('slap')-q.at('vergeet')),0,1)*0.85+0.1;
  kitchenBase(sunU, ramp(t,q.at('vergeet'),2)*(1-ramp(t,q.at('zet'),1)));
  const inX=lerp(-400,560,ramp(t,0.2,1.4));
  const slapU=ramp(t,q.at('slap'),0.8)*(1-ramp(t,q.at('uur'),1.2));
  const toBowl=ramp(t,q.at('water')-0.3,1.2);
  const hx=lerp(inX,1480,toBowl), hy=lerp(COUNTER,COUNTER-10,toBowl), hs=lerp(0.82,0.5,toBowl);
  const bowlA=ramp(t,q.at('koud')-1.0,0.6);
  if(toBowl<0.98) krop(hx,hy,hs,slapU);
  bowl(1480,bowlA,1-0.25*ramp(t,q.at('uur'),1.5), toBowl>=0.98? ()=>krop(1480,COUNTER-10,0.5,slapU):null);
  const lb=fadeIO(t,q.at('stevig'),q.at('vergeet'),0.4); label(ctx,'stevig','net uit de koelkast',hx-20,hy-210,hx-160,hy-420,lb);
  const ls=fadeIO(t,q.at('slap'),q.at('zet'),0.4); label(ctx,'slap','een dag op het aanrecht',hx,hy-120,hx+200,hy-420,ls);
  const tk=fadeIO(t,q.at('vergeet'),q.at('slap')+0.6,0.4); pill(ctx,560,170,'een dag later',C.grain,tk,30);
  label(ctx,'koud water','',1560,720,1640,590,fadeIO(t,q.at('koud'),q.at('uur'),0.4));
  pill(ctx,1480,170,'1 uur later',C.grain,fadeIO(t,q.at('uur'),q.at('gebleven')+1,0.4),30);
  label(ctx,'weer stevig','',1480,COUNTER-210,1300,420,fadeIO(t,q.at('stevig',2),q.at('gebleven'),0.4),C.groen);
  pill(ctx,960,170,'waar is dat water gebleven?',C.goud,ramp(t,q.at('Waar'),0.5),36);
},
// ---- titel ----
s03(ctx,t,q){ bg(ctx,'micro'); const a=ramp(t,0.1,0.7);
  alpha(ctx,a,()=>{ text(ctx,'Alles is cel',120,380,fTitel(120),C.text); text(ctx,'Waar alles wat leeft van gemaakt is',120,460,fTekst(44),C.text2); });
  alpha(ctx,ramp(t,0.5,1.2),()=>plantCellV(1420,480,300,270,{wall:1,chloro:1,vac:1,mitos:1,t}));
  metaText(ctx,'ONDERBOUW · KERNDOELEN · FILM 1',W-80,60,C.text2,'right',24); },
// ---- H1: blad → cellen, kat/eik/jij, kleinste bouwsteen, 30 000 miljard, microscoop ----
s04(ctx,t,q){ bg(ctx,'schema'); const tK=q.at('kat');
  const a1=1-ramp(t,tK-0.3,0.6);
  if(a1>0.01) alpha(ctx,a1,()=>{ counter(); krop(420,COUNTER,0.62,0);
    zoomCircle(ctx,1150,430,300,470,COUNTER-200,'zoom in: één blaadje',ramp(t,q.at('bestaat'),0.7),()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(850,130,600,600); tissue(1150,430,300,t); });
    label(ctx,'cellen','piepkleine bouwstenen',1210,400,1520,180,ramp(t,q.at('cellen'),0.5)); });
  const a2=ramp(t,tK-0.2,0.6)*(1-ramp(t,q.at('microscoop')-0.4,0.6)*0.65);
  if(a2>0.01) alpha(ctx,a2,()=>{ const gy=780; ctx.strokeStyle=rgba(C.line,0.4); ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(160,gy); ctx.lineTo(1760,gy); ctx.stroke();
    cat(ctx,420,gy,1.1,ramp(t,q.at('kat'),0.5)); oak(ctx,960,gy,1.05,ramp(t,q.at('eik'),0.5)); persoon(ctx,'lotte',1500,gy,300,{uit:'blij',a:ramp(t,q.at('jij'),0.5),t});
    const zc=ramp(t,q.at('cellen',2),0.6);
    zoomCircle(ctx,420,260,105,470,gy-110,'',zc,()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(300,140,240,240); for(let i=0;i<7;i++){ const a=i*0.9; ctx.beginPath(); ctx.ellipse(420+Math.cos(a)*(i?60:0),260+Math.sin(a)*(i?55:0),34,28,a,0,6.283); shape(ctx,rgba('#C9A3B0',0.3),'#D9B8C2',2); dot(ctx,420+Math.cos(a)*(i?60:0),260+Math.sin(a)*(i?55:0),8,C.kern); } });
    zoomCircle(ctx,960,200,105,960,gy-330,'',zc,()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(840,80,240,240); tissue(960,200,105,t); });
    zoomCircle(ctx,1500,260,105,1512,gy-282,'',zc,()=>{ ctx.fillStyle='#E6ECEF'; ctx.fillRect(1380,140,240,240); ctx.save(); ctx.translate(1500,260); ctx.scale(0.5,0.5); ctx.translate(-560,-470); [[470,430,105,2.6],[660,500,98,1.7],[380,300,92,0.2],[560,250,100,1.1],[390,640,96,1.9],[730,330,95,2]].forEach(([x,y,r,rot],i)=>wangcel(x,y,r,rot,i*5.7+2)); ctx.restore(); });
    pill(ctx,960,120,'een cel: de kleinste bouwsteen die zelf leeft',C.goud,fadeIO(t,q.at('kleinste'),q.at('volwassen'),0.5),34);
    pill(ctx,1500,120,'≈ 30 000 miljard cellen',C.goud,fadeIO(t,q.at('volwassen'),q.at('microscoop')+3,0.5),34); });
  const mc=ramp(t,q.at('microscoop')-0.3,0.6); if(mc>0.01){ microscope(ctx,960,640,1.6,mc); pill(ctx,960,150,'één cel zie je alleen met een microscoop',C.text,mc,32); }
},
// ---- H1: wangcellen, celmembraan, cytoplasma ----
s05(ctx,t,q){ bg(ctx,'micro'); const tOm=q.at('elke'); const fA=1-ramp(t,tOm-0.2,0.8);
  if(fA>0.01) alpha(ctx,fA,()=>{ microField(960,450,380,0.98); naamBij(ctx,'wangcellen','methyleenblauw, onder de microscoop',960,880,ramp(t,q.at('wangcellen'),0.5),'center');
    pill(ctx,960,870-30,'plat, als tegeltjes',C.goud,ramp(t,q.at('plat'),0.5),32); });
  const cA=ramp(t,tOm-0.4,0.8); if(cA>0.01) alpha(ctx,cA,()=>{
    animalCell(960,450,560,300,{t, kern:1, hlMem:fadeIO(t,q.at('celmembraan'),q.at('Binnenin'),0.5), hlCyto:fadeIO(t,q.at('gelei'),q.at('Daarin'),0.6), org:ramp(t,q.at('onderdelen'),0.6), mitos:ramp(t,q.at('onderdelen')+0.3,0.6)});
    label(ctx,'celmembraan','dun vlies om de cel',1440,300,1250,130,ramp(t,q.at('celmembraan'),0.5));
    // stoffen: sommige door het membraan, andere niet
    const sA=fadeIO(t,q.at('sommige'),q.at('Binnenin')+1.5,0.4); if(sA>0.01) alpha(ctx,sA,()=>{ const tt=t-q.at('sommige');
      for(let i=0;i<4;i++){ const u=((tt*0.35+i*0.25)%1); const y0=300+i*60; dot(ctx,lerp(1650,1420,u),y0+u*20,9,C.teal); }
      for(let i=0;i<3;i++){ const u=((tt*0.35+i*0.33)%1); const bx=1650-Math.sin(u*Math.PI)*120; dot(ctx,bx,560+i*50,9,C.koraal); } });
    label(ctx,'cytoplasma','een soort gelei',780,560,520,800,ramp(t,q.at('cytoplasma'),0.5));
    pill(ctx,960,90,'elk onderdeel heeft een eigen taak',C.text,ramp(t,q.at('taak'),0.5),30); });
},
// ---- H1: celkern ----
s06(ctx,t,q){ bg(ctx,'micro'); const tR=q.at('rij');
  animalCell(960,470,560,300,{t,kern:1,mitos:1,org:1,hlKern:ramp(t,q.at('celkern'),0.5)*(1-ramp(t,tR,0.5))});
  naamBij(ctx,'celkern','de bouwtekening van de cel',800,316,ramp(t,q.at('celkern'),0.5),'center');
  const rg=fadeIO(t,q.at('regelt'),tR,0.5); if(rg>0.01) for(let k=0;k<6;k++){ const a=k/6*6.283+0.3; arrow(ctx,803+Math.cos(a)*110,446+Math.sin(a)*110,803+Math.cos(a)*210,446+Math.sin(a)*170,C.goud,3,12,rg); }
  chips(ctx,[['celmembraan',ramp(t,q.at('celmembraan'),0.4)],['cytoplasma',ramp(t,q.at('cytoplasma'),0.4)],['celkern',ramp(t,q.at('celkern',4),0.4)]],870-40);
},
// ---- H1 havo/vwo: een tekening is een model ----
s07(ctx,t,q){ bg(ctx,'schema'); const out=1-ramp(t,q.at('Terug')-0.2,0.6);
  alpha(ctx,out,()=>{ const pl=ramp(t,q.at('plat'),0.6);
    alpha(ctx,pl,()=>{ ctx.save(); ctx.setLineDash([10,8]); ctx.beginPath(); ctx.arc(420,440,190,0,6.283); ctx.strokeStyle=C.text; ctx.lineWidth=2; ctx.stroke(); ctx.restore(); dot(ctx,380,420,34,rgba(C.kern,0.8)); metaText(ctx,'op papier: plat rondje',420,700,C.grain,'center',24); });
    const d3=ramp(t,q.at('dik'),0.6);
    alpha(ctx,ramp(t,q.at('bolletje'),0.5),()=>{ dot(ctx,1050,360,90,C.teal,lighten(C.teal,0.3),2); ctx.beginPath(); ctx.ellipse(1020,325,32,20,-0.5,0,6.283); ctx.fillStyle=rgba('#FFFFFF',0.25); ctx.fill(); metaText(ctx,'bolletje',1050,500,C.grain,'center',22); });
    alpha(ctx,ramp(t,q.at('blokje'),0.5),()=>{ const x=1330,y=420,s=110,dx=50,dy=-40; ctx.beginPath(); ctx.rect(x-s/2,y-s/2,s,s); shape(ctx,C.oker,lighten(C.oker,0.3),2); ctx.beginPath(); ctx.moveTo(x-s/2,y-s/2); ctx.lineTo(x-s/2+dx,y-s/2+dy); ctx.lineTo(x+s/2+dx,y-s/2+dy); ctx.lineTo(x+s/2,y-s/2); ctx.closePath(); shape(ctx,lighten(C.oker,0.25),lighten(C.oker,0.4),2); ctx.beginPath(); ctx.moveTo(x+s/2,y-s/2); ctx.lineTo(x+s/2+dx,y-s/2+dy); ctx.lineTo(x+s/2+dx,y+s/2+dy); ctx.lineTo(x+s/2,y+s/2); ctx.closePath(); shape(ctx,C.okerD,lighten(C.okerD,0.3),2); metaText(ctx,'blokje',1350,500,C.grain,'center',22); });
    alpha(ctx,ramp(t,q.at('tegeltje'),0.5),()=>{ const x=1610,y=410; ctx.beginPath(); ctx.ellipse(x,y+14,130,40,0,0,Math.PI); ctx.lineTo(x-130,y); ctx.ellipse(x,y,130,40,0,Math.PI,0,true); ctx.closePath(); ctx.fillStyle='#7F9CC4'; ctx.fill(); ctx.beginPath(); ctx.ellipse(x,y,130,40,0,0,6.283); shape(ctx,'#C9D6E6','#7F9CC4',2); dot(ctx,x+10,y,9,'rgba(42,62,128,0.85)'); metaText(ctx,'plat tegeltje',1610,500,C.grain,'center',22); });
    alpha(ctx,d3,()=>metaText(ctx,'echte cellen: ze hebben dikte',1330,600,C.text2,'center',24));
    naamBij(ctx,'model','je tekent alleen wat je wilt laten zien',420,205,ramp(t,q.at('model'),0.5),'center');
    const nz=ramp(t,q.at('niet'),0.5); alpha(ctx,nz,()=>{ text(ctx,'wat je in de tekening níét ziet:',240,780,fTekst(34,600),C.koraal); });
    alpha(ctx,ramp(t,q.at('dik',2),0.4),()=>text(ctx,'· hoe dik de cel is',760,780,fTekst(34),C.text));
    alpha(ctx,ramp(t,q.at('klein'),0.4),()=>text(ctx,'· hoe klein de onderdelen echt zijn',1080,780,fTekst(34),C.text));
    pill(ctx,960,110,'deze film: vereenvoudigd · niet op schaal',C.goud,ramp(t,q.at('vereenvoudigd'),0.5),30); });
  alpha(ctx,ramp(t,q.at('Terug')-0.1,0.6),()=>{ bg(ctx,'micro'); animalCell(960,470,560,300,{t,kern:1,mitos:0,org:1}); });
},
// ---- H1: energie? ----
s08(ctx,t,q){ bg(ctx,'micro'); animalCell(960,470,560,300,{t,kern:1,org:1}); pill(ctx,960,120,'energie?',C.koraal,ramp(t,q.at('energie'),0.5),40); },
// ---- H2: bloed, voedingsstoffen, zuurstof, mitochondrium, spiercel ----
s10(ctx,t,q){ bg(ctx,'micro'); const tS=q.at('spiercel'), tM=q.at('schoolmicroscoop');
  const cA=1-ramp(t,tS-0.3,0.7);
  if(cA>0.01) alpha(ctx,cA,()=>{
    // bloedvat links
    const va=ramp(t,q.at('bloed'),0.6); alpha(ctx,va,()=>{ roundRect(ctx,120,90,170,760,80); shape(ctx,rgba('#9A4A4A',0.45),'#C47070',2); for(let i=0;i<9;i++){ const y=90+((t*80+i*90)%760); ctx.beginPath(); ctx.ellipse(205,y,30,18,0,0,6.283); shape(ctx,'#B85A5A','#D88080',1.5); } metaText(ctx,'bloed',205,890-20,C.grain,'center',22); });
    animalCell(1120,470,560,300,{t,kern:1,org:1,mitos:ramp(t,q.at('boontjes'),0.6)});
    const vs=ramp(t,q.at('voedingsstoffen'),0.6), zs=ramp(t,q.at('zuurstof'),0.6), tt=t;
    for(let i=0;i<6;i++){ const u=((tt*0.22+i/6)%1); alpha(ctx,vs,()=>dot(ctx,lerp(300,1000,u),lerp(330+i*20,560-i*10,u),9,C.oker)); alpha(ctx,zs,()=>dot(ctx,lerp(300,980,(u+0.5)%1),lerp(600-i*15,380+i*12,(u+0.5)%1),8,C.teal)); }
    label(ctx,'voedingsstoffen','uit je eten',330,330,440,140,fadeIO(t,q.at('voedingsstoffen'),q.at('boontjes'),0.5));
    naamBij(ctx,'zuurstof','uit je longen',320,650,fadeIO(t,q.at('zuurstof'),q.at('boontjes'),0.5),'left',C.teal);
    label(ctx,'mitochondriën','kleine boontjes',1592,560,1500,800,ramp(t,q.at('boontjes'),0.5));
    const big=ramp(t,q.at('mitochondrium'),0.6); if(big>0.01) alpha(ctx,big,()=>{ ctx.fillStyle=rgba(C.bgMicro,0.6); ctx.fillRect(0,0,W,H); mitochondrion(ctx,960,470,420,0,1,6,t); text(ctx,'mitochondrium',960,260,fTekst(44,600),C.text,'center');
      const br=ramp(t,q.at('verbrandt'),0.6); for(let i=0;i<5;i++){ const u=clamp((t-q.at('verbrandt')-i*0.35)/1.6,0,1); alpha(ctx,br*(1-u),()=>{ dot(ctx,lerp(500,860,u),420+i*20,10,C.oker); dot(ctx,lerp(1420,1060,u),440+i*16,9,C.teal); }); }
      alpha(ctx,br,()=>{ metaText(ctx,'voedingsstof + zuurstof',600,700,C.oker,'center',24); });
      const en=ramp(t,q.at('vrij'),0.5); for(let k=0;k<8;k++){ const a=k/8*6.283, r=230+((t*90+k*30)%120); alpha(ctx,en*(1-((t*90+k*30)%120)/120),()=>dot(ctx,960+Math.cos(a)*r*1.4,470+Math.sin(a)*r*0.7,8,C.koraal)); }
      pill(ctx,960,820-30,'energie komt vrij',C.koraal,en,32); });
  });
  const sA=ramp(t,tS-0.3,0.7)*(1-ramp(t,tM-0.3,0.6)*0.85);
  if(sA>0.01) alpha(ctx,sA,()=>{ blob(ctx,960,470,760,150,0.02,4); ctx.fillStyle=rgba('#C47070',0.18); ctx.fill(); membrane(ctx,960,470,760,150,C.er,0.02,4,0);
    for(let i=0;i<22;i++){ const x=300+(i%11)*130+((i/11|0)?65:0), y=420+((i/11|0)?100:0)+Math.sin(i)*10; mitochondrion(ctx,x,y,70,0.1*Math.sin(i),1,4,t); }
    nucleus(ctx,960,470,40,1,t); label(ctx,'spiercel','heel veel mitochondriën',1600,380,1500,200,ramp(t,tS,0.5)); });
  const mA=ramp(t,tM-0.2,0.6); if(mA>0.01){ microscope(ctx,960,780-20,1.3,mA); crossOut(ctx,960,560,70,mA); pill(ctx,960,150,'te klein voor de schoolmicroscoop',C.text,mA,32); }
},
// ---- H2: vier delen, en een plant? ----
s11(ctx,t,q){ bg(ctx,'schema');
  chips(ctx,[['celmembraan',ramp(t,q.at('Celmembraan'),0.4)],['cytoplasma',ramp(t,q.at('cytoplasma'),0.4)],['celkern',ramp(t,q.at('celkern'),0.4)],['mitochondrium',ramp(t,q.at('mitochondrium'),0.4)]],200);
  metaText(ctx,'dierlijke cel',960,120,C.grain,'center',24);
  const pA=ramp(t,q.at('plant'),0.6); alpha(ctx,pA,()=>{ counter(); krop(760,COUNTER,0.62,0); dot(ctx,1300,380,46,C.goud); for(let k=0;k<6;k++){ const a=Math.PI*0.7+k*0.12; arrow(ctx,1300+Math.cos(a)*60,380+Math.sin(a)*60,1300+Math.cos(a)*260,380+Math.sin(a)*240,C.goud,3,12,ramp(t,q.at('voedsel'),0.5)); } });
  pill(ctx,1180,620,'maakt zijn eigen voedsel',C.groen,ramp(t,q.at('voedsel'),0.5),30);
  pill(ctx,960,330+10,'mitochondriën nodig?',C.goud,ramp(t,q.at('nodig'),0.5),36); },
// ---- H3: terug naar de sla, plantencel met bekende delen ----
s13(ctx,t,q){ bg(ctx,'schema'); const tC=q.at('celmembraan');
  const kA=1-ramp(t,tC-0.4,0.7); if(kA>0.01) alpha(ctx,kA,()=>{ counter(); krop(420,COUNTER,0.62,0);
    zoomCircle(ctx,1150,430,300,470,COUNTER-200,'zoom in: één blaadje',ramp(t,q.at('blaadje'),0.7),()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(850,130,600,600); tissue(1150,430,300,t); }); });
  const cA=ramp(t,tC-0.5,0.7); if(cA>0.01) alpha(ctx,cA,()=>{ bg(ctx,'micro'); const ox=ramp(t,q.at('drie'),0.8)*-260;
    plantCellV(960+ox,470,480,330,{t,wall:0,chloro:0,vac:0,kern:1,mitos:ramp(t,q.at('mitochondriën'),0.5),hlMem:fadeIO(t,tC,q.at('cytoplasma'),0.4),hlCyto:fadeIO(t,q.at('cytoplasma'),q.at('celkern'),0.4),hlMito:fadeIO(t,q.at('mitochondriën'),q.at('Maar'),0.4)});
    const lA=1-ramp(t,q.at('drie'),0.5);
    label(ctx,'celmembraan','',960+ox+430,320,1560,160,ramp(t,tC,0.4)*lA);
    label(ctx,'cytoplasma','',960+ox+120,600,1300,830-20,ramp(t,q.at('cytoplasma'),0.4)*lA);
    label(ctx,'celkern','',960+ox-275,450,420,180,ramp(t,q.at('celkern'),0.4)*lA);
    naamBij(ctx,'mitochondrium','ook in een plantencel',960+ox+96,830,ramp(t,q.at('mitochondriën'),0.4)*lA,'center');
    pill(ctx,960,100,'ook een plant verbrandt voedsel',C.koraal,fadeIO(t,q.at('verbrandt'),q.at('drie'),0.5),30);
    const d=ramp(t,q.at('drie'),0.5); if(d>0.01) for(let i=0;i<3;i++){ alpha(ctx,ramp(t,q.at('drie')+0.3*i,0.4),()=>{ ctx.save(); ctx.setLineDash([8,8]); roundRect(ctx,1300,220+i*170,420,120,16); ctx.strokeStyle=C.goud; ctx.lineWidth=2; ctx.stroke(); ctx.restore(); text(ctx,(i+1)+'  ?',1510,295+i*170,fTekst(40,600),C.goud,'center'); }); }
    metaText(ctx,'extra in een plantencel',1510,180,C.grain,'center',24*clamp(d,0.01,1)); });
},
// ---- H3: celwand en bladgroenkorrels ----
s14(ctx,t,q){ bg(ctx,'micro'); const wA=ramp(t,q.at('celwand'),0.6), chA=ramp(t,q.at('korrels'),0.6);
  plantCellV(700,470,480,330,{t,wall:wA,chloro:chA,vac:0,kern:1,mitos:1,hlWall:fadeIO(t,q.at('celwand'),q.at('groene'),0.5)});
  const tw=ramp(t,q.at('water'),0.5)*(1-ramp(t,q.at('groene'),0.5)); if(tw>0.01) for(let i=0;i<6;i++){ const u=((t*0.5+i/6)%1); const a=-0.6+i*0.25; const r=lerp(560,380,u); alpha(ctx,tw*Math.sin(u*Math.PI),()=>dot(ctx,700+Math.cos(a)*r,470+Math.sin(a)*r*0.7,9,C.teal)); }
  label(ctx,'celwand','laat water gewoon door',1172,470,1420,300,ramp(t,q.at('celwand'),0.5),C.groen);
  alpha(ctx,ramp(t,q.at('stevigheid'),0.5),()=>metaText(ctx,'geeft stevigheid en vorm',1430,384,C.grain,'left',26));
  naamBij(ctx,'bladgroenkorrel','vangt licht',1050,500,ramp(t,q.at('bladgroenkorrels'),0.5),'right',C.groen);
  const li=ramp(t,q.at('licht'),0.6); for(let k=0;k<4;k++) arrow(ctx,1500+k*60,120,1120+k*10,460+k*6,C.goud,3,14,li);
  const vd=ramp(t,q.at('voedsel'),0.6); if(vd>0.01) for(let i=0;i<6;i++){ const u=((t*0.4+i/6)%1); alpha(ctx,vd,()=>dot(ctx,1100-u*300,486+Math.sin(u*6+i)*40+u*40,7,C.oker)); }
  pill(ctx,700,100,'licht → eigen voedsel',C.goud,ramp(t,q.at('voedsel'),0.5),30); },
// ---- H3: de vacuole ----
s15(ctx,t,q){ bg(ctx,'micro'); const v=ramp(t,q.at('vacuole')-0.2,1.2), tA=q.at('aanrecht');
  plantCellV(700,470,480,330,{t,wall:1,chloro:1,vac:v,kern:1,mitos:1,sugar:ramp(t,q.at('opgeloste'),0.6)});
  naamBij(ctx,'vacuole','een grote blaas met water',740,568,ramp(t,q.at('vacuole'),0.5),'center',C.teal);
  naamBij(ctx,'opgeloste stoffen','zoals suikers',700,300,fadeIO(t,q.at('opgeloste'),tA,0.5),'center',C.oker);
  const nm=fadeIO(t,q.at('neemt'),tA,0.4); if(nm>0.01) for(let i=0;i<6;i++){ const u=((t*0.45+i/6)%1); const a=-0.8+i*0.3; alpha(ctx,nm,()=>dot(ctx,lerp(700+Math.cos(a)*600,710,u),lerp(470+Math.sin(a)*420,476,u),9,C.teal)); }
  inset(1640,600,160,ramp(t,tA,0.6),()=>{ ctx.beginPath(); ctx.rect(1470,660,340,30); shape(ctx,C.bruin,lighten(C.bruin,0.3),2); krop(1640,660,0.38,1); });
  pill(ctx,1580,830,'wat gebeurt er in de cellen?',C.goud,ramp(t,q.at('gebeurt'),0.5),28); },
// ---- H3: uitleg slap en stevig, binnenband ----
s17(ctx,t,q){ bg(ctx,'micro'); const tK=q.at('koud'), tB=q.at('binnenband'), tMi=q.at('Miljoenen');
  const shrink=ramp(t,q.at('verliest'),2.4), grow=ramp(t,tK,2.4); const v=1-0.42*shrink+0.42*grow; const turg=1-shrink+grow;
  const cA=1-ramp(t,tMi-0.2,0.8);
  if(cA>0.01) alpha(ctx,cA,()=>{
    plantCellV(640,470,460,320,{t,wall:1,chloro:1,vac:v,kern:1,mitos:1,turg:clamp(turg,0,1)});
    const out=fadeIO(t,q.at('verliest'),q.at('slap'),0.4); if(out>0.01) for(let i=0;i<6;i++){ const u=((t*0.5+i/6)%1); const a=-1+i*0.4; alpha(ctx,out,()=>dot(ctx,lerp(650,640+Math.cos(a)*620,u),lerp(476,470+Math.sin(a)*440,u),9,C.teal)); }
    const inn=fadeIO(t,tK,q.at('strak'),0.4); if(inn>0.01) for(let i=0;i<6;i++){ const u=((t*0.5+i/6)%1); const a=-1+i*0.4; alpha(ctx,inn,()=>dot(ctx,lerp(640+Math.cos(a)*620,650,u),lerp(470+Math.sin(a)*440,476,u),9,C.teal)); }
    naamBij(ctx,'vacuole','wordt kleiner',640,480,fadeIO(t,q.at('kleiner'),tK,0.4),'center',C.teal);
    naamBij(ctx,'vacuole','wordt groter',640,480,fadeIO(t,q.at('groter'),tB,0.4),'center',C.teal);
    pill(ctx,640,90,'water verdampt uit het blad',C.teal,fadeIO(t,q.at('verdampt'),q.at('drukt'),0.4),30);
    const pr=ramp(t,q.at('strak'),0.6); for(let k=0;k<8;k++){ const a=k/8*6.283; arrow(ctx,640+Math.cos(a)*250,470+Math.sin(a)*170,640+Math.cos(a)*380,470+Math.sin(a)*262,C.goud,4,14,pr*(1-ramp(t,tMi-0.6,0.4))); }
    naamBij(ctx,'celwand','houdt tegen: de cel knapt niet',700,834,ramp(t,q.at('houdt'),0.5),'left',C.groen);
    // kleine sla rechtsboven: slap en weer stevig
    inset(1580,450,170,ramp(t,q.at('slap'),0.5)*(1-ramp(t,tB-0.3,0.4)),()=>{ ctx.beginPath(); ctx.rect(1400,520,360,30); shape(ctx,C.bruin,lighten(C.bruin,0.3),2); krop(1580,520,0.42,1-ramp(t,q.at('groter'),1)); });
    // binnenband in fietsband
    const bb=ramp(t,tB,0.6); if(bb>0.01) alpha(ctx,bb,()=>{ const x=1580,y=430;
      ctx.beginPath(); ctx.arc(x,y,136,0,6.283); shape(ctx,rgba(C.teal,0.6),lighten(C.teal,0.3),2);
      ctx.beginPath(); ctx.arc(x,y,152,0,6.283); ctx.strokeStyle='#3A3F48'; ctx.lineWidth=28; ctx.stroke(); ctx.strokeStyle=C.line; ctx.lineWidth=1.5; ctx.beginPath(); ctx.arc(x,y,166,0,6.283); ctx.stroke();
      for(let k=0;k<8;k++){ const a=k/8*6.283; arrow(ctx,x+Math.cos(a)*60,y+Math.sin(a)*60,x+Math.cos(a)*126,y+Math.sin(a)*126,C.goud,3,12,1); }
      metaText(ctx,'doorsnede van een fietsband',x,y-200,C.grain,'center',22);
      metaText(ctx,'binnenband = vacuole',x,y+215,C.teal,'center',24); metaText(ctx,'buitenband = celwand',x,y+252,C.groen,'center',24); });
  });
  const mA=ramp(t,tMi-0.4,0.8); if(mA>0.01) alpha(ctx,mA,()=>{ bg(ctx,'schema'); ctx.save(); ctx.beginPath(); ctx.rect(0,0,W,880); ctx.clip(); counter(); krop(560,COUNTER,0.82,0); ctx.restore();
    zoomCircle(ctx,1300,400,290,640,COUNTER-230,'miljoenen strakke cellen',ramp(t,tMi,0.6),()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(1000,100,600,600); tissue(1300,400,290,t,1); }); pill(ctx,560,140,'stevig blad',C.groen,ramp(t,q.at('stevig'),0.5),34); });
},
// ---- samenvatting ----
s18(ctx,t,q){ bg(ctx,'schema'); const tS=q.at('slappe'); const cA=1-ramp(t,tS-0.3,0.7);
  if(cA>0.01) alpha(ctx,cA,()=>{ const gy=780; ctx.strokeStyle=rgba(C.line,0.4); ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(100,gy); ctx.lineTo(1820,gy); ctx.stroke();
    animalCell(500,500,320,230,{t,kern:1,mitos:1,org:0}); metaText(ctx,'dierlijke cel',500,830-20,C.grain,'center',26);
    const pA=ramp(t,q.at('Plantencel'),0.6); alpha(ctx,pA,()=>{ plantCellV(1380,500,340,250,{t,wall:ramp(t,q.at('celwand'),0.5),chloro:ramp(t,q.at('bladgroenkorrels'),0.5),vac:ramp(t,q.at('vacuole'),0.8),kern:1,mitos:1,hlWall:fadeIO(t,q.at('Zie'),q.at('Dan'),0.4)}); metaText(ctx,'plantencel',1380,830-20,C.grain,'center',26); });
    chips(ctx,[['celmembraan',ramp(t,q.at('celmembraan'),0.4)],['cytoplasma',ramp(t,q.at('cytoplasma'),0.4)],['celkern',ramp(t,q.at('celkern'),0.4)],['mitochondriën',ramp(t,q.at('mitochondriën'),0.4)]],120);
    chips(ctx,[['celwand',ramp(t,q.at('celwand'),0.4),C.groen],['vacuole',ramp(t,q.at('vacuole'),0.4),C.teal],['bladgroenkorrels',ramp(t,q.at('bladgroenkorrels'),0.4),C.groen]],200);
    pill(ctx,1380,880-30,'celwand of bladgroenkorrels? → plantencel',C.groen,ramp(t,q.at('Zie'),0.5),28); });
  const sA=ramp(t,tS-0.3,0.7); if(sA>0.01) alpha(ctx,sA,()=>{ counter(); const u=1-ramp(t,q.at('koud'),1.4); krop(760,COUNTER,0.75,u); bowl(1300,ramp(t,q.at('koud'),0.5),1);
    pill(ctx,760,170,'het water was uit elke vacuole verdampt',C.teal,fadeIO(t,q.at('Het'),q.at('koud'),0.5),30); pill(ctx,960,170,'in koud water liep elke vacuole weer vol',C.groen,ramp(t,q.at('vol'),0.5),30); });
},
// ---- eindkaart: probeer het zelf (speelt 12 s, stem alleen aan het begin) ----
s19(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Onthoud',120,200,fTitel(80),C.text);
  const K=['Alles wat leeft, is gemaakt van cellen.','Een plantencel heeft ook een celwand, een grote vacuole en bladgroenkorrels.','Slappe sla is weer stevig als elke vacuole volloopt met water.'];
  K.forEach((s,i)=>alpha(ctx,ramp(t,0.4+i*0.8,0.6),()=>{ const y=300+i*170; roundRect(ctx,120,y,1680,140,14); shape(ctx,rgba(C.bgSchema,0.95),i===0?C.goud:C.line,i===0?1.5:1); text(ctx,String(i+1),185,y+90,fTitel(60),C.goud,'center'); ctx.font=fTekst(38); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,s,260,y+84,1500,46); }));
  metaText(ctx,'biologie bij kamiel · stem: roos (elevenlabs) · versie 1.2 · oktober 2026',W/2,CAPTION_Y-10,C.text2,'center',22); },
};
