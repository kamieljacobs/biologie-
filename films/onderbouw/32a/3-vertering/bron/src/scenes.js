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


// ===== Vertering — scènes (kerndoelen onderbouw, film 3) =====
// Hulpjes uit film 1 (helpers1.js) en film 2 (helpers2.js) staan hierboven. Nieuw: de routekaart van het spijsverteringskanaal (`tractMap`), de hap die meereist (`hap`), mond, maag, darmvlokken, estafette, enzymschaartjes.

// ---------- routekaart: één buis van mond tot anus ----------
const ROUTE=[[250,300],[300,330],[330,400],[360,470],[430,520],[520,520],[560,470],[600,420],[660,400],[720,440],[760,500],[800,560],[860,600],[920,560],[960,500],[1000,440],[1060,400],[1120,440],[1160,500],[1200,560],[1260,600],[1320,560],[1360,500],[1400,440],[1460,400],[1500,440],[1520,520],[1520,620],[1480,700],[1380,730],[1260,730],[1160,730],[1160,660],[1300,640],[1440,640],[1560,660],[1620,720],[1660,800],[1700,860]];
const RL=(()=>{ let L=[0]; for(let i=1;i<ROUTE.length;i++) L.push(L[i-1]+Math.hypot(ROUTE[i][0]-ROUTE[i-1][0],ROUTE[i][1]-ROUTE[i-1][1])); return L; })();
function routePt(u){ const d=clamp(u,0,1)*RL[RL.length-1]; let i=1; while(i<RL.length-1&&RL[i]<d) i++; const a=ROUTE[i-1],b=ROUTE[i],k=(d-RL[i-1])/Math.max(1,RL[i]-RL[i-1]); return [lerp(a[0],b[0],k),lerp(a[1],b[1],k)]; }
// stations als route-parameter u
const ST={mond:0.0,slokdarm:0.05,maag:0.12,dunne:0.2,dunneEind:0.72,dikke:0.78,anus:1.0};
function routeStroke(u0,u1,color,lw){ ctx.beginPath(); const N=80; for(let i=0;i<=N;i++){ const p=routePt(lerp(u0,u1,i/N)); i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]); } ctx.strokeStyle=color; ctx.lineWidth=lw; ctx.lineCap='round'; ctx.lineJoin='round'; ctx.stroke(); }
function stomachShape(x,y,s,a=1,k=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.translate(x,y); ctx.scale(s*k,s/k); ctx.beginPath(); ctx.moveTo(-50,-70); ctx.bezierCurveTo(-10,-110,80,-80,70,0); ctx.bezierCurveTo(60,70,-20,90,-60,50); ctx.bezierCurveTo(-90,20,-80,-40,-50,-70); ctx.closePath(); shape(ctx,C.oker,lighten(C.oker,0.25),2.5); ctx.restore(); }
function tractMap(o={}){ const A=k=>o[k]===undefined?1:o[k];
  // buis
  routeStroke(0,1,rgba(C.okerD,0.35),30); routeStroke(0,1,rgba(C.bgSchema,0.6),22);
  // gekleurde delen
  alpha(ctx,A('slokdarm'),()=>routeStroke(ST.mond,ST.maag,C.oker,8)); alpha(ctx,A('dunne'),()=>routeStroke(ST.dunne,ST.dunneEind,C.okerD,8)); alpha(ctx,A('dikke'),()=>routeStroke(ST.dikke,1,lighten(C.okerD,0.15),14));
  // mond
  alpha(ctx,A('mond'),()=>{ ctx.beginPath(); ctx.arc(230,290,40,0,6.283); shape(ctx,C.fill,C.line,2); ctx.strokeStyle=C.text; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(230,290,24,0.2,2.94); ctx.stroke(); for(let k=0;k<5;k++){ ctx.fillStyle=C.text; ctx.fillRect(212+k*8,296,5,7); } });
  // maag
  alpha(ctx,A('maag'),()=>stomachShape(440,520,0.8,1,o.knead||1));
  // lever + gal, alvleesklier
  alpha(ctx,A('lever'),()=>{ ctx.beginPath(); ctx.moveTo(560,240); ctx.quadraticCurveTo(700,200,780,250); ctx.quadraticCurveTo(740,320,640,330); ctx.quadraticCurveTo(540,320,560,240); ctx.closePath(); shape(ctx,'#8E4A44','#B86A62',2); dot(ctx,700,330,16,C.groen,lighten(C.groen,0.3),1.5); });
  alpha(ctx,A('alvleesklier'),()=>{ ctx.beginPath(); ctx.ellipse(640,660,90,22,-0.1,0,6.283); shape(ctx,rgba(C.goud,0.7),lighten(C.goud,0.3),2); });
  alpha(ctx,A('speeksel'),()=>{ dot(ctx,300,250,14,C.teal,lighten(C.teal,0.3),1.5); });
  // anus
  alpha(ctx,A('anus'),()=>{ ctx.beginPath(); ctx.arc(1700,860,16,0,6.283); shape(ctx,C.fill,C.line,2); });
}
function tractLabels(o={}){ const L={mond:['mond',230,290,230,160,'left'],slokdarm:['slokdarm',345,440,120,600,'left'],maag:['maag',440,520,330,740,'right'],lever:['lever',680,260,940,160,'left'],gal:['gal',700,330,940,250,'left'],alvleesklier:['alvleesklier',640,660,940,760,'left'],dunne:['dunne darm',1060,400,1300,330,'left'],dikke:['dikke darm',1300,640,1120,860,'right'],anus:['anus',1700,860,1800,780,'left'],speeksel:['speekselklier',300,250,420,120,'left']};
  Object.entries(L).forEach(([k,v])=>{ const a=o[k]===undefined?0:o[k]; if(a>0.01) label(ctx,v[0],o[k+'Meta']||'',v[1],v[2],v[3],v[4],a,o[k+'Col']||C.text,v[5]); }); }
// de hap (stukje appel, later papje) en de pit
function apple(x,y,r,a=1,bite=false){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.beginPath(); ctx.arc(x,y,r,0,6.283); shape(ctx,'#C94B4B','#E07070',2); if(bite){ ctx.beginPath(); ctx.arc(x+r*0.8,y-r*0.5,r*0.5,0,6.283); ctx.fillStyle=C.bgSchema; ctx.fill(); ctx.beginPath(); ctx.arc(x+r*0.8,y-r*0.5,r*0.5,0,6.283); ctx.fillStyle='#F2E8C8'; ctx.fill(); ctx.beginPath(); ctx.arc(x,y,r,0,6.283); ctx.strokeStyle='#E07070'; ctx.lineWidth=2; ctx.stroke(); } ctx.strokeStyle=C.bruin; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(x,y-r); ctx.lineTo(x+4,y-r-18); ctx.stroke(); ctx.beginPath(); ctx.ellipse(x+16,y-r-14,14,7,-0.5,0,6.283); shape(ctx,C.groen,lighten(C.groen,0.3),1.5); ctx.restore(); }
function pitje(x,y,s=1,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.beginPath(); ctx.ellipse(x,y,9*s,14*s,0.3,0,6.283); shape(ctx,'#5A3A22','#8C5A3A',1.5); ctx.restore(); }
function hap(u,a=1,mush=0,t=0){ if(a<=0.01) return; const p=routePt(u); ctx.save(); ctx.globalAlpha*=a; if(mush<0.5){ ctx.beginPath(); ctx.arc(p[0],p[1],14,0,6.283); shape(ctx,'#F2E8C8','#C94B4B',3); } else { for(let i=0;i<5;i++){ const q=routePt(clamp(u-i*0.012,0,1)); dot(ctx,q[0]+(hash(i)-0.5)*8,q[1]+(hash(i*3)-0.5)*8,7,rgba(C.oker,0.9)); } } pitje(p[0]+6,p[1]-4,0.8); ctx.restore(); }
function clockPill(s,a){ pill(ctx,1700,120,'⏱ '+s,C.grain,a,28); }
// mond groot: tanden en speeksel
function bigMouth(x,y,s,a,t){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.translate(x,y); ctx.scale(s,s);
  ctx.beginPath(); ctx.ellipse(0,0,220,140,0,0,6.283); shape(ctx,'#7A3A4A','#A05868',2);
  const open=0.5+0.5*Math.sin(t*4); [[-1,-1],[1,1]].forEach(([d])=>{ for(let k=0;k<7;k++){ const tx=-120+k*40; roundRect(ctx,tx,d>0?30*open:-30*open-34,32,34,6); shape(ctx,'#F2EFE6','#D9D4C4',1.5); } });
  ctx.restore(); }
function dropsFrom(x,y,tx,ty,t,n,color,a){ if(a<=0.01) return; for(let i=0;i<n;i++){ const u=((t*0.5+i/n)%1); alpha(ctx,a*Math.sin(u*Math.PI),()=>dot(ctx,lerp(x,tx,u),lerp(y,ty,u),6,color)); } }
// darmwand met darmvlokken en bloedvaten
function villi(x,y,w,a,t,o={}){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; const n=Math.floor(w/70);
  ctx.fillStyle=rgba(C.okerD,0.25); ctx.fillRect(x-w/2,y,w,200);
  for(let i=0;i<n;i++){ const vx=x-w/2+35+i*70; roundRect(ctx,vx-24,y-220,48,240,24); shape(ctx,rgba(C.oker,0.5),lighten(C.oker,0.2),2); ctx.strokeStyle='#C47070'; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(vx-8,y+10); ctx.lineTo(vx-8,y-190); ctx.quadraticCurveTo(vx,y-205,vx+8,y-190); ctx.lineTo(vx+8,y+10); ctx.stroke(); }
  ctx.strokeStyle=lighten(C.oker,0.2); ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(x-w/2,y); ctx.lineTo(x+w/2,y); ctx.stroke();
  if(o.flow){ for(let i=0;i<12;i++){ const u=((t*0.35+i/12)%1); const vx=x-w/2+35+(i%n)*70; const col=[C.oker,C.paars,C.koraal][i%3]; alpha(ctx,o.flow,()=>dot(ctx,vx+(hash(i)-0.5)*26*(1-u),lerp(y-300,y+60,u),6,col)); } }
  ctx.restore(); }
// estafette: organen als haltes op een rij
const EST=[['mond','klein maken'],['slokdarm','duwen'],['maag','kneden, zuur'],['alvleesklier','sap: afbreken'],['dunne darm','opnemen'],['dikke darm','water terug']];
function estafette(al,t,o={}){ const x0=200,y=470,dx=300; EST.forEach(([n,m],i)=>{ const a=al[i]===undefined?1:al[i]; if(a<=0.01) return; alpha(ctx,a,()=>{ const x=x0+i*dx; dot(ctx,x,y,52,C.fill,C.line,2); text(ctx,n,x,y+100,fTekst(30,600),C.text,'center'); metaText(ctx,m,x,y+136,C.grain,'center',22); if(i<EST.length-1) arrow(ctx,x+60,y,x+dx-60,y,rgba(C.goud,0.7),3,12,o.arrows===undefined?1:o.arrows); }); });
  if(o.baton!==undefined){ const u=o.baton; const i=Math.floor(u*(EST.length-1)), k=u*(EST.length-1)-i; const x=lerp(x0+i*dx,x0+Math.min(i+1,EST.length-1)*dx,k); hapDot(x,y-80); }
  if(o.cross!==undefined) crossOut(ctx,x0+o.cross*dx,y,40,1); }
function hapDot(x,y){ ctx.beginPath(); ctx.arc(x,y,14,0,6.283); shape(ctx,'#F2E8C8','#C94B4B',3); }
// enzymschaartje en kralenketting
function beads(x,y,n,color,a=1,gap=26){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; for(let i=0;i<n;i++) dot(ctx,x+i*gap,y,11,color,lighten(color,0.3),1.5); if(n>1){ ctx.strokeStyle=lighten(color,0.3); ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+(n-1)*gap,y); ctx.stroke(); } ctx.restore(); }
function scissors(x,y,s,a,open=0.5){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.translate(x,y); ctx.scale(s,s); ctx.strokeStyle=C.teal; ctx.lineWidth=4; ctx.lineCap='round'; [[1],[-1]].forEach(([d])=>{ ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(-40,d*open*30); ctx.stroke(); ctx.beginPath(); ctx.arc(-52,d*open*36,10,0,6.283); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(34,-d*open*18); ctx.stroke(); }); ctx.restore(); }

// ================= SCÈNES =================
const SCENES={
// ---- cold open: appel, pit, wc ----
s01(ctx,t,q){ kitchenBase(0.3,0); const tD=q.at('dag'), tW=q.at('wc');
  const a1=1-ramp(t,tD-0.3,0.6); alpha(ctx,a1,()=>{ human(ctx,620,COUNTER,420,1,C.mens); const bite=ramp(t,q.at('Hap'),0.3); apple(700,520,46,1,bite>0.5);
    const sw=fadeIO(t,q.at('slik'),q.at('pit')+0.5,0.3); alpha(ctx,sw,()=>pitje(620,COUNTER-330+40*clamp((t-q.at('slik'))/1.2,0,1),1.2));
    label(ctx,'pit','per ongeluk doorgeslikt',628,COUNTER-300,900,300,fadeIO(t,q.at('pit'),tD,0.4),C.goud); });
  const a2=ramp(t,tD-0.3,0.6); alpha(ctx,a2,()=>{ pill(ctx,560,170,'een dag later',C.grain,1,30); human(ctx,520,COUNTER,420,1,C.mens);
    alpha(ctx,ramp(t,q.at('weg'),0.4),()=>{ apple(700,520,46,0.35); crossOut(ctx,700,520,40,1); metaText(ctx,'de appel: weg',700,620,C.grain,'center',24); });
    const wc=ramp(t,tW,0.5); alpha(ctx,wc,()=>{ roundRect(ctx,1180,560,160,230,10); shape(ctx,C.fill,C.line,2); text(ctx,'WC',1260,640,fTekst(34,700),C.text,'center'); pitje(1260,730,2.2); });
    label(ctx,'de pit','heel',1270,730,1480,600,ramp(t,q.at('Heel'),0.4),C.goud); });
  pill(ctx,960,870,'waarom de appel wel en de pit niet?',C.goud,ramp(t,q.at('Waarom'),0.5),34);
},
// ---- titel ----
s03(ctx,t,q){ bg(ctx,'schema'); const a=ramp(t,0.1,0.7); alpha(ctx,a,()=>{ text(ctx,'Vertering',120,330,fTitel(120),C.text); text(ctx,'De reis van een hap appel, van mond tot wc',120,410,fTekst(44),C.text2); });
  alpha(ctx,ramp(t,0.5,1.2),()=>{ ctx.save(); ctx.translate(0,300); ctx.scale(0.8,0.8); ctx.translate(140,60); tractMap({}); hap(((t*0.04)%1),1,0); ctx.restore(); });
  metaText(ctx,'ONDERBOUW · KERNDOELEN · FILM 3',W-80,60,C.text2,'right',24); },
// ---- H1: de buis; waarom verteren ----
s04(ctx,t,q){ bg(ctx,'schema'); const tWh=q.at('Waarom'), tBeg=q.at('Verteren');
  const a1=1-ramp(t,tWh-0.3,0.6); alpha(ctx,a1,()=>{ tractMap({}); tractLabels({mond:1,maag:ramp(t,q.at('organen'),0.3),lever:ramp(t,q.at('organen'),0.3),alvleesklier:ramp(t,q.at('organen'),0.3),dunne:ramp(t,q.at('buis'),0.3),dikke:ramp(t,q.at('buis'),0.3),anus:ramp(t,q.at('anus'),0.3)});
    const sp=ramp(t,q.at('spuiten'),0.5); dropsFrom(700,330,760,500,t,4,C.groen,sp); dropsFrom(640,640,720,560,t,4,C.goud,sp);
    pill(ctx,960,100,'spijsverteringsstelsel: de buis + de organen die sap spuiten',C.goud,ramp(t,q.at('Samen'),0.5),30); });
  const a2=ramp(t,tWh-0.3,0.6)*(1-ramp(t,tBeg-0.2,0.6)); alpha(ctx,a2,()=>{ bg(ctx,'micro'); animalCell(560,470,380,260,{t,kern:1,mitos:1,org:0}); apple(1000,470,60,1,true); crossOut(ctx,1000,470,56,ramp(t,q.at('niets'),0.4));
    const vs=ramp(t,q.at('voedingsstoffen'),0.5); alpha(ctx,vs,()=>{ chips(ctx,[['suikers',ramp(t,q.at('suikers'),0.3),C.oker],['eiwitten',ramp(t,q.at('eiwitten'),0.3),C.paars],['vetten',ramp(t,q.at('vetten'),0.3),C.koraal]],800); for(let i=0;i<9;i++){ const u=((t*0.3+i/9)%1); dot(ctx,lerp(1400,760,u),470+Math.sin(u*7+i)*40,7,[C.oker,C.paars,C.koraal][i%3]); } });
    const va=ramp(t,q.at('vast'),0.5); alpha(ctx,va,()=>{ apple(1500,470,110,1); for(let i=0;i<14;i++){ const an=hash(i*2.3)*6.283, d=Math.sqrt(hash(i*5.1))*80; dot(ctx,1500+Math.cos(an)*d,470+Math.sin(an)*d,7,[C.oker,C.paars,C.koraal][i%3]); } metaText(ctx,'zitten vast in de appel',1500,640,C.grain,'center',24); });
    pill(ctx,960,100,'je cellen hebben voedingsstoffen nodig, als piepkleine deeltjes',C.goud,vs,30); });
  const a3=ramp(t,tBeg-0.2,0.6); alpha(ctx,a3,()=>{ apple(400,470,120,1,true); arrow(ctx,560,470,700,470,C.goud,4,16,1); for(let i=0;i<6;i++){ const an=i*1.05; ctx.beginPath(); ctx.arc(820+Math.cos(an)*70,470+Math.sin(an)*60,28,0,6.283); shape(ctx,'#F2E8C8','#C94B4B',2); } metaText(ctx,'klein maken',820,640,C.grain,'center',26);
    const af=ramp(t,q.at('afbreken'),0.5); alpha(ctx,af,()=>{ arrow(ctx,940,470,1080,470,C.goud,4,16,1); for(let i=0;i<24;i++){ const an=hash(i*2.3)*6.283, d=Math.sqrt(hash(i*5.1))*110; dot(ctx,1240+Math.cos(an)*d,470+Math.sin(an)*d,7,[C.oker,C.paars,C.koraal][i%3]); } metaText(ctx,'afbreken: voedingsstoffen los',1240,640,C.grain,'center',26); });
    pill(ctx,960,100,'verteren = klein maken en afbreken, tot de voedingsstoffen los zijn',C.goud,ramp(t,q.at('Verteren'),0.5),28);
    const wv=ramp(t,q.at('Water'),0.5); alpha(ctx,wv,()=>{ chips(ctx,[['water',1,C.teal],['vitamines',1,C.groen]],800); metaText(ctx,'al klein genoeg: hoeven niet verteerd',960,850,C.grain,'center',24); }); });
},
// ---- H1: mond, slokdarm, op je kop ----
s05(ctx,t,q){ bg(ctx,'schema'); const tS=q.at('slikt'), tK=q.at('kop');
  const a1=1-ramp(t,tS-0.3,0.6); alpha(ctx,a1,()=>{ bigMouth(700,470,1,1,t*(ramp(t,q.at('tanden'),0.3))); const ch=ramp(t,q.at('tanden'),0.5); for(let i=0;i<6;i++){ const an=i*1.05; alpha(ctx,ch,()=>{ ctx.beginPath(); ctx.arc(700+Math.cos(an)*60*(1-0.3*ch),470+Math.sin(an)*30,16,0,6.283); shape(ctx,'#F2E8C8','#C94B4B',2); }); }
    alpha(ctx,1-ch,()=>apple(700,470,50,1,true));
    const sp=ramp(t,q.at('Speeksel'),0.5); dropsFrom(520,330,640,440,t,5,C.teal,sp); dropsFrom(880,330,760,440,t,5,C.teal,sp);
    label(ctx,'tanden','snijden en malen',760,400,1100,250,ch,C.text); label(ctx,'speeksel','maakt nat en glad',540,350,440,180,sp,C.teal);
    pill(ctx,960,870,'zo kunnen de sappen er straks overal bij',C.goud,ramp(t,q.at('sappen'),0.5),30); });
  const a2=ramp(t,tS-0.3,0.6); alpha(ctx,a2,()=>{ tractMap({}); const u=lerp(ST.mond,ST.slokdarm+0.02,clamp((t-tS)/2,0,1)); hap(u,1,0,t); tractLabels({slokdarm:1});
    const kop=ramp(t,tK-0.5,0.6); alpha(ctx,kop,()=>{ ctx.save(); ctx.translate(1400,540); ctx.rotate(Math.PI); human(ctx,0,200,400,1,C.mens); ctx.restore(); apple(1400,760,30,1,true); arrow(ctx,1400,700,1400,620,C.goud,3,14,1); metaText(ctx,'op je kop slikken?',1400,840,C.grain,'center',26); });
    pill(ctx,960,100,'komt het eten dan in je maag?',C.goud,ramp(t,q.at('Komt'),0.5),34); });
},
// ---- H2: slokdarm duwt; maag ----
s07(ctx,t,q){ bg(ctx,'schema'); const tM=q.at('maag');
  const a1=1-ramp(t,tM-0.3,0.6); alpha(ctx,a1,()=>{ // slokdarm groot, knijpende spieren achter de hap
    const u=clamp((t-q.at('Spieren'))/3.5,0,1); const y=lerp(180,760,u); roundRect(ctx,860,120,200,720,100); shape(ctx,rgba(C.oker,0.25),C.oker,3);
    ctx.beginPath(); ctx.ellipse(960,y+60,70,40,0,0,6.283); shape(ctx,rgba(C.oker,0.6),lighten(C.oker,0.3),2); ctx.beginPath(); ctx.arc(960,y+150,38,0,6.283); shape(ctx,'#F2E8C8','#C94B4B',3);
    [[-1],[1]].forEach(([d])=>arrow(ctx,960+d*160,y+60,960+d*95,y+60,C.koraal,4,14,ramp(t,q.at('knijpen'),0.4)));
    label(ctx,'spieren in de wand','knijpen achter de hap, duwen hem voort',1060,y+60,1300,y-40,ramp(t,q.at('knijpen'),0.4),C.koraal);
    alpha(ctx,ramp(t,q.at('kop'),0.4),()=>{ ctx.save(); ctx.translate(400,470); ctx.rotate(Math.PI); human(ctx,0,180,360,1,C.mens); ctx.restore(); pill(ctx,400,760,'ook op je kop',C.groen,1,28); }); });
  const a2=ramp(t,tM-0.3,0.6); alpha(ctx,a2,()=>{ const kn=ramp(t,q.at('kneedt'),0.5); stomachShape(760,470,2.6,1,1+0.08*kn*Math.sin(t*3));
    const sap=ramp(t,q.at('maagsap'),0.5); for(let i=0;i<14;i++){ const an=hash(i*2.1)*6.283, d=Math.sqrt(hash(i*4.3))*120; alpha(ctx,sap,()=>dot(ctx,740+Math.cos(an)*d,470+Math.sin(an)*d*0.8,6,C.teal)); }
    for(let i=0;i<4;i++){ const an=i*1.5+t*0.8; ctx.beginPath(); ctx.arc(740+Math.cos(an)*60,470+Math.sin(an)*50,22*(1-0.5*ramp(t,q.at('papje'),1)),0,6.283); shape(ctx,'#F2E8C8','#C94B4B',2); }
    label(ctx,'maag','een gespierde zak: kneedt',700,300,440,180,ramp(t,q.at('gespierde'),0.4)); label(ctx,'maagsap','zuur: doodt bacteriën, begint met eiwitten',800,560,1200,760,sap,C.teal);
    const bac=fadeIO(t,q.at('bacteriën'),q.at('Twee'),0.4); for(let i=0;i<4;i++) alpha(ctx,bac,()=>{ roundRect(ctx,1300+i*50,330,30,12,6); shape(ctx,rgba(C.groen,0.7),C.groen,1.5); crossOut(ctx,1315+i*50,336,10,1); });
    clockPill('2 tot 4 uur in je maag',ramp(t,q.at('Twee'),0.5));
    alpha(ctx,ramp(t,q.at('papje'),0.5),()=>{ arrow(ctx,880,620,1120,760,C.goud,4,16,1); metaText(ctx,'beetje bij beetje naar de dunne darm',1300,800,C.grain,'center',26); }); });
},
// ---- H2: dunne darm, drie sappen, enzymen ----
s08(ctx,t,q){ bg(ctx,'schema'); tractMap({mond:0.5,lever:ramp(t,q.at('Gal'),0.4),alvleesklier:ramp(t,q.at('alvleesklier'),0.4)});
  const z=ramp(t,q.at('zes'),0.5); tractLabels({dunne:1,dunneMeta:z>0.5?'ongeveer zes meter, opgevouwen':'',alvleesklier:ramp(t,q.at('alvleesklier'),0.4),alvleesklierMeta:'sap: suikers, eiwitten én vetten',alvleesklierCol:C.goud,lever:ramp(t,q.at('Gal'),0.4),gal:ramp(t,q.at('Gal'),0.4),galMeta:'maakt van vet kleine druppels',galCol:C.groen});
  dropsFrom(640,640,760,540,t,5,C.goud,ramp(t,q.at('alvleesklier'),0.5)); dropsFrom(700,330,760,470,t,5,C.groen,ramp(t,q.at('Gal'),0.5));
  const dw=ramp(t,q.at('darmwand'),0.5); for(let i=0;i<8;i++){ const p=routePt(0.3+i*0.05); alpha(ctx,dw,()=>dot(ctx,p[0]+(i%2?14:-14),p[1]-14,5,C.teal)); } label(ctx,'darmwand','maakt zelf ook sap',routePt(0.5)[0],routePt(0.5)[1],1560,160,dw,C.teal);
  const vet=fadeIO(t,q.at('druppels'),q.at('darmwand'),0.4); alpha(ctx,vet,()=>{ dot(ctx,1700,520,30,C.koraal); arrow(ctx,1740,520,1790,520,C.groen,3,12,1); for(let i=0;i<6;i++) dot(ctx,1812+(i%3)*24,508+Math.floor(i/3)*24,8,C.koraal); metaText(ctx,'gal: als afwasmiddel',1780,580,C.grain,'center',22); });
  pill(ctx,960,100,'in al die sappen zitten enzymen: zij doen het afbreken',C.goud,fadeIO(t,q.at('enzymen'),q.at('piepklein'),0.4),30);
  const los=ramp(t,q.at('los'),0.5); for(let i=0;i<18;i++){ const p=routePt(0.35+(i/18)*0.35); alpha(ctx,los,()=>dot(ctx,p[0]+(hash(i)-0.5)*10,p[1]+(hash(i*3)-0.5)*10,6,[C.oker,C.paars,C.koraal][i%3])); }
  pill(ctx,960,100,'de voedingsstoffen zijn los en piepklein',C.goud,fadeIO(t,q.at('piepklein'),q.at('hoe'),0.4),30);
  pill(ctx,960,100,'hoe komen ze bij je cellen?',C.goud,ramp(t,q.at('hoe'),0.5),34);
},
// ---- H2: darmwand, darmvlokken, opnemen ----
s10(ctx,t,q){ bg(ctx,'micro'); const fl=ramp(t,q.at('gaan'),0.5);
  villi(960,560,1300,1,t,{flow:fl});
  label(ctx,'darmwand','dun, vol plooien',960,560,440,760,ramp(t,q.at('darmwand',2),0.4));
  label(ctx,'darmvlokken','piepkleine vingertjes',1065,380,1180,200,ramp(t,q.at('darmvlokken'),0.4),C.oker);
  label(ctx,'bloedvaten','in elke darmvlok',952,420,560,220,ramp(t,q.at('bloedvaten'),0.4),'#C47070');
  pill(ctx,960,100,'opnemen: door de darmwand het bloed in',C.goud,fadeIO(t,q.at('opnemen'),q.at('dertig'),0.4),32);
  pill(ctx,960,100,'binnenkant ≈ 30 m²: de vloer van een grote kamer',C.goud,fadeIO(t,q.at('dertig'),q.at('bloedvaten'),0.4),30);
  const cel=ramp(t,q.at('cellen'),0.5); inset(1640,300,150,cel,()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(1490,150,300,300); animalCell(1640,300,120,90,{t,kern:1,mitos:1}); }); metaText(ctx,'verbranden, of bouwen er mee',1640,480,C.grain,'center',22*clamp(ramp(t,q.at('verbranden'),0.4),0.01,1));
  pill(ctx,960,870,'je bloed brengt ze naar al je cellen',C.koraal,ramp(t,q.at('brengt'),0.5),30);
},
// ---- H2: de pit ----
s11(ctx,t,q){ bg(ctx,'micro'); pitje(700,470,9); const sp=fadeIO(t,q.at('sap'),q.at('groot'),0.4); for(let k=0;k<6;k++){ const an=k/6*6.283; const u=((t*0.6+k/6)%1); alpha(ctx,sp,()=>dot(ctx,700+Math.cos(an)*(240-u*110),470+Math.sin(an)*(240-u*110),7,[C.goud,C.groen,C.teal][k%3])); }
  label(ctx,'de pit','harde schil: geen sap komt erdoor',760,380,1100,220,ramp(t,q.at('schil'),0.4),C.goud);
  const gr=ramp(t,q.at('groot'),0.5); alpha(ctx,gr,()=>{ villi(1500,620,500,1,t,{}); pitje(1500,330,6); crossOut(ctx,1500,330,40,ramp(t,q.at('past'),0.4)); metaText(ctx,'te groot voor de darmwand',1500,820,C.grain,'center',24); });
  pill(ctx,960,870,'reist verder, met de vezels van de appel',C.text,ramp(t,q.at('reist'),0.5),30);
},
// ---- H3: dikke darm, bacteriën, ontlasting ----
s12(ctx,t,q){ bg(ctx,'schema'); tractMap({mond:0.5,maag:0.6,lever:0.4,alvleesklier:0.4,dikke:1}); tractLabels({dikke:1,dikkeMeta:ramp(t,q.at('anderhalve'),0.4)>0.5?'ongeveer anderhalve meter':'',anus:ramp(t,q.at('anus'),0.4)});
  const u=lerp(ST.dikke,0.98,clamp((t-q.at('dikke'))/Math.max(1,q.at('anus')-q.at('dikke')),0,1)); hap(u,1,1,t);
  const wa=fadeIO(t,q.at('water'),q.at('bacteriën'),0.4); for(let i=0;i<8;i++){ const p=routePt(0.8+i*0.025); const k=((t*0.5+i/8)%1); alpha(ctx,wa,()=>dot(ctx,p[0],p[1]-20-k*60,6,C.teal)); } label(ctx,'water','terug je lichaam in',routePt(0.86)[0],routePt(0.86)[1]-60,1500,330,wa,C.teal);
  const bac=ramp(t,q.at('bacteriën'),0.5); for(let i=0;i<14;i++){ const p=routePt(0.8+(i/14)*0.18); alpha(ctx,bac,()=>{ ctx.save(); ctx.translate(p[0]+(hash(i)-0.5)*10,p[1]+(hash(i*3)-0.5)*10); ctx.rotate(hash(i*7)*3); roundRect(ctx,-9,-4,18,8,4); shape(ctx,rgba(C.groen,0.8),lighten(C.groen,0.3),1); ctx.restore(); }); }
  label(ctx,'bacteriën','vezels afbreken, vitamines maken',routePt(0.9)[0],routePt(0.9)[1],1540,580,bac,C.groen);
  pill(ctx,960,100,'ontlasting: wat overblijft, steviger',C.text,fadeIO(t,q.at('ontlasting'),q.at('bacteriën'),0.4),30);
  pill(ctx,960,100,'niet vies, maar handig',C.groen,fadeIO(t,q.at('handig'),q.at('Na'),0.4),30);
  clockPill('1 tot 2 dagen',ramp(t,q.at('Na'),0.5));
  pill(ctx,960,100,'ontlasting = alles wat nooit in je bloed kwam',C.goud,ramp(t,q.at('nooit'),0.5),30);
  alpha(ctx,ramp(t,q.at('pit'),0.4),()=>pitje(1720,900,2));
},
// ---- H3: estafette, alvleesklier stopt? ----
s13(ctx,t,q){ bg(ctx,'schema'); const e=ramp(t,q.at('orgaan'),0.5); const al=EST.map((_,i)=>ramp(t,q.at('orgaan')+i*0.25,0.4));
  estafette(al,t,{baton:clamp((t-q.at('gaf'))/4,0,1),cross:t>=q.at('Stel')-0.2?3:undefined});
  pill(ctx,960,150,'een estafette: elk orgaan doet een stuk en geeft door',C.goud,fadeIO(t,q.at('estafette'),q.at('Stel'),0.4),30);
  pill(ctx,960,150,'stel: je alvleesklier stopt',C.koraal,ramp(t,q.at('Stel'),0.5),34);
  pill(ctx,960,870,'wat gebeurt er?',C.goud,ramp(t,q.at('gebeurt'),0.5),34);
},
// ---- H3: zonder alvleesklier; orgaanstelsel ----
s15(ctx,t,q){ bg(ctx,'schema'); estafette([1,1,1,1,1,1],t,{cross:3,baton:clamp((t-0.2)/Math.max(1,q.at('krijgt')-0.2),0,1)});
  const va=ramp(t,q.at('vastzitten'),0.5); alpha(ctx,va,()=>{ apple(1400,250,60,1); for(let i=0;i<10;i++){ const an=hash(i*2.3)*6.283, d=Math.sqrt(hash(i*5.1))*44; dot(ctx,1400+Math.cos(an)*d,250+Math.sin(an)*d,6,[C.oker,C.paars,C.koraal][i%3]); } metaText(ctx,'voedingsstoffen blijven vastzitten',1400,350,C.grain,'center',22); });
  pill(ctx,960,150,'het sap dat het meeste afbreekt, is er niet',C.koraal,fadeIO(t,q.at('sap'),q.at('wc'),0.4),30);
  pill(ctx,960,150,'de dikke darm in, de wc in: je lichaam krijgt bijna niets',C.koraal,fadeIO(t,q.at('wc'),q.at('orgaanstelsel'),0.4),28);
  pill(ctx,960,150,'orgaanstelsel: elk orgaan doet een stuk',C.goud,ramp(t,q.at('orgaanstelsel'),0.5),32);
  pill(ctx,960,870,'valt er één uit, dan loopt de estafette vast',C.goud,ramp(t,q.at('Valt'),0.5),30);
},
// ---- H3 havo/vwo: enzymen knippen ----
s16(ctx,t,q){ bg(ctx,'micro'); const rows=[['speeksel','zetmeel → kleine suikers',q.at('speeksel'),C.oker,6],['maagsap','eiwit → bouwstenen',q.at('maagsap'),C.paars,5],['alvleesklier','zetmeel, eiwit én vet',q.at('alvleesklier'),C.koraal,5]];
  pill(ctx,960,100,'elk enzym knipt één soort stof',C.goud,ramp(t,q.at('knipt'),0.5),32);
  rows.forEach(([n,m,tt,col,k],i)=>{ const a=ramp(t,tt,0.5); if(a<=0.01) return; const y=260+i*150; alpha(ctx,a,()=>{ text(ctx,n,120,y+8,fTekst(34,600),C.text); metaText(ctx,m,120,y+44,C.grain,'left',22);
      const cut=clamp((t-tt-0.8)/1.5,0,1); beads(560,y,k,col,1,32*(1+cut*0.8)); if(cut<1) scissors(560+32*Math.floor(k/2)-16,y-30,1,1,0.5+0.5*Math.sin(t*6)); }); });
  const gal=ramp(t,q.at('Gal'),0.5); alpha(ctx,gal,()=>{ text(ctx,'gal',120,718,fTekst(34,600),C.text); metaText(ctx,'geen enzym: alleen druppels',120,754,C.grain,'left',22); dot(ctx,560,710,26,C.koraal); arrow(ctx,600,710,650,710,C.groen,3,12,1); for(let i=0;i<5;i++) dot(ctx,680+i*26,710,8,C.koraal); });
  const ch=ramp(t,q.at('chemische'),0.5); alpha(ctx,ch,()=>{ roundRect(ctx,1180,230,640,300,16); shape(ctx,rgba(C.fill,0.6),C.line,1); text(ctx,'afbreken = chemische verandering',1500,290,fTekst(30,600),C.goud,'center'); metaText(ctx,'een geknipte stof is een andere stof',1500,330,C.grain,'center',22); beads(1300,420,5,C.oker,1,30); arrow(ctx,1450,420,1520,420,C.goud,3,12,1); for(let i=0;i<5;i++) dot(ctx,1560+i*40,420,11,C.goud,lighten(C.goud,0.3),1.5); metaText(ctx,'zetmeel is zoet geworden',1500,480,C.grain,'center',22); });
  const ka=ramp(t,q.at('Kauwen'),0.5); alpha(ctx,ka,()=>{ roundRect(ctx,1180,560,640,260,16); shape(ctx,rgba(C.fill,0.6),C.line,1); text(ctx,'kauwen: kleiner, dezelfde stof',1500,620,fTekst(30,600),C.text,'center'); apple(1340,720,40,1,true); arrow(ctx,1400,720,1460,720,C.goud,3,12,1); for(let i=0;i<4;i++){ ctx.beginPath(); ctx.arc(1520+i*50,720,18,0,6.283); shape(ctx,'#F2E8C8','#C94B4B',2); } });
},
// ---- samenvatting ----
s17(ctx,t,q){ bg(ctx,'schema'); tractMap({}); const u=clamp((t-0.3)/Math.max(1,q.at('Drie')-0.3),0,1); hap(u,1,u>0.25?1:0,t);
  tractLabels({mond:ramp(t,q.at('Mond'),0.3),mondMeta:'klein maken, nat maken',slokdarm:ramp(t,q.at('Slokdarm'),0.3),slokdarmMeta:'duwen',maag:ramp(t,q.at('Maag'),0.3),maagMeta:'kneden, zuur maagsap',dunne:ramp(t,q.at('Dunne'),0.3),dunneMeta:'sappen; opnemen in het bloed',alvleesklier:ramp(t,q.at('alvleesklier'),0.3),lever:ramp(t,q.at('lever'),0.3),dikke:ramp(t,q.at('Dikke'),0.3),dikkeMeta:'water terug, bacteriën, ontlasting',anus:ramp(t,q.at('Dikke'),0.3)});
  const st=ramp(t,q.at('Drie'),0.5); chips(ctx,[['klein maken',ramp(t,q.at('klein',2),0.3),C.goud],['afbreken',ramp(t,q.at('afbreken'),0.3),C.goud],['opnemen',ramp(t,q.at('opnemen',2),0.3),C.goud]],100);
  pill(ctx,960,870,'samen, als estafette',C.goud,fadeIO(t,q.at('estafette'),q.at('pit'),0.4),30);
  alpha(ctx,ramp(t,q.at('pit'),0.5),()=>{ pitje(1720,900,2); pill(ctx,960,870,'de pit: te hard voor elk sap, te groot voor de darmwand',C.text,1,28); });
},
// ---- eindkaart ----
s18(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Probeer het zelf',120,200,fTitel(80),C.text); metaText(ctx,'de reis van een hap',120,260,C.grain,'left',26);
  const P=[['Kauw op brood','Kauw een minuut op een stukje brood zonder te slikken. Wat proef je na een tijdje? Welk sap doet dat?'],['Teken de reis','Teken de buis van mond tot anus. Zet bij elk orgaan zijn taak en het sap dat erbij komt.'],['Rondleiding','Kijk nog eens de film Een rondleiding door je lichaam: welke organen van de rondleiding zag je nu van binnen?']];
  P.forEach((p,i)=>{ const x=120+i*575; alpha(ctx,ramp(t,0.6+i*0.6,0.6),()=>{ roundRect(ctx,x,330,535,300,14); shape(ctx,rgba(C.bgSchema,0.95),C.line,1); text(ctx,p[0],x+28,392,fTekst(38,600),C.goud); ctx.font=fTekst(30); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,p[1],x+28,445,480,40); }); });
  alpha(ctx,ramp(t,2.6,0.6),()=>{ ctx.font=fTekst(36,600); ctx.fillStyle=C.goud; ctx.textAlign='left'; wrap(ctx,'Iemand heeft geen gal meer. Welke voedingsstof wordt dan slechter verteerd, en waarom?',120,720,1680,46); });
  metaText(ctx,'biologie bij kamiel · stem: roos (elevenlabs) · versie 1.0 · oktober 2026',W/2,CAPTION_Y-10,C.text2,'center',22); },
};
