// ===== Hoe vindt een haai zijn prooi? — scènes (kerndoelen onderbouw) =====
// Gebruikt lib.js (Part C), helpers1.js (fadeIO, dot, arrow, pill, alpha, chips, inset, haak via lib) en lib_cast.js (persoon).
// Looks: Macro-nacht onder water (sea), Schema (bg 'schema'). Geen korrel op de achtergrond (BEELDAFSPRAKEN). Namen direct bij onderdelen (naamBij), geen wijslijnen.

// hulpje dat lib_cast.js (persoon) nodig heeft
function circ(ctx,x,y,r,fill,stroke,lw=1.5){ ctx.beginPath(); ctx.arc(x,y,r,0,6.283); if(fill){ctx.fillStyle=fill;ctx.fill();} if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=lw;ctx.stroke();} }
// ---------- kleuren voor deze film ----------
const HK = { water:'#16253D', opp:'#1E2E4A', ver:'#1C2E47', bodem:'#34362E', bodemR:'#46483D', gras:'#4F8F5F', grasL:'#7FC48F',
  haai:'#7E8CA3', haaiR:'#A7B3C6', buik:'#C9D1DC', tijger:'#7C8794', streep:'#55606E', verpl:'#9C7A55', verplR:'#C29C72',
  vis:'#C9A35C', visR:'#E0C487', bloed:'#E07A5F', kraak:'#AFC0D0' };

// ---------- achtergrond: Macro-nacht onder water ----------
function sea(o={}){ const by=o.bodem===undefined?770:o.bodem;
  ctx.fillStyle=HK.water; ctx.fillRect(0,0,W,H);
  ctx.fillStyle=HK.opp; ctx.fillRect(0,0,W,64); ctx.fillStyle=rgba(C.water,0.45); ctx.fillRect(0,64,W,3);
  // verre rotsen
  ctx.fillStyle=HK.ver; ctx.beginPath(); ctx.moveTo(0,by-40); for(let x=0;x<=W;x+=80){ ctx.lineTo(x,by-60-50*hash(x*0.013+3)-(x%240===0?40:0)); } ctx.lineTo(W,by+20); ctx.lineTo(0,by+20); ctx.closePath(); ctx.fill();
  // bodem
  ctx.fillStyle=HK.bodem; ctx.beginPath(); ctx.moveTo(0,by); for(let x=0;x<=W;x+=60){ ctx.lineTo(x,by+8*Math.sin(x*0.004+1)); } ctx.lineTo(W,H); ctx.lineTo(0,H); ctx.closePath(); ctx.fill();
  ctx.strokeStyle=HK.bodemR; ctx.lineWidth=1.5; ctx.beginPath(); for(let x=0;x<=W;x+=60){ const y=by+8*Math.sin(x*0.004+1); x?ctx.lineTo(x,y):ctx.moveTo(x,y); } ctx.stroke();
  if(o.gras!==false){ for(let i=0;i<9;i++){ const x=60+i*230+hash(i*7)*80; tuft(x,by+6+4*Math.sin(x*0.004+1),0.8+0.5*hash(i*3),o.t||0,0.55); } }
  if(o.donker){ ctx.fillStyle=rgba('#05080D',0.55*o.donker); ctx.fillRect(0,0,W,H); }
}
function tuft(x,y,s,t,a=1,h=1){ if(a<=0.01||h<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.strokeStyle=HK.gras; ctx.lineCap='round';
  for(let k=0;k<5;k++){ const dx=(k-2)*7*s, L=(40+18*hash(k+x))*s*h, sw=Math.sin(t*0.9+k+x*0.01)*8*s*h; ctx.lineWidth=5*s; ctx.beginPath(); ctx.moveTo(x+dx,y); ctx.quadraticCurveTo(x+dx+sw*0.5,y-L*0.6,x+dx+sw,y-L); ctx.stroke(); }
  ctx.restore(); }

// ---------- de haai (zijaanzicht) ----------
// x,y = midden van het lijf; len = lengte in px; o.dir 1 = naar rechts; o.t = tijd (staartslag)
function sharkAnchors(x,y,len,dir){ const k=len/1000; const P=(lx,ly)=>({x:x+dir*lx*k,y:y+ly*k});
  return { neus:P(500,0), oog:P(405,-34), kieuw:P(285,10), rugvin:P(-15,-285), staart:P(-550,-40), buik:P(0,90), zij:P(0,-45), lever:P(80,0), snuit:P(450,0), bek:P(390,62) }; }
function shark(x,y,len,o={}){ const a=o.a===undefined?1:o.a; const k=len/1000, dir=o.dir||1, t=o.t||0; const ANK=sharkAnchors(x,y,len,dir); if(a<=0.01) return ANK;
  const body=o.body||HK.haai, rim=o.rim||HK.haaiR, belly=o.belly||HK.buik, sway=(o.swim===false?0:Math.sin(t*(o.speed||3))*0.18);
  ctx.save(); ctx.globalAlpha*=a; ctx.translate(x,y); ctx.scale(dir*k,k); if(o.rot) ctx.rotate(o.rot);
  const lw=(px)=>px/k;
  const ghost=o.ghost||0; // doorzichtig voor skelet/lever
  const fin=(fn)=>{ ctx.beginPath(); fn(); ctx.closePath(); ctx.fillStyle=ghost?rgba(C.bgSchema,0.5):body; ctx.fill(); ctx.strokeStyle=rim; ctx.lineWidth=lw(1.5); ctx.stroke(); };
  // staart
  ctx.save(); ctx.translate(-400,0); ctx.rotate(sway); if(o.nurse) fin(()=>{ ctx.moveTo(10,-30); ctx.quadraticCurveTo(-120,-70,-260,-40); ctx.quadraticCurveTo(-200,10,-120,30); ctx.lineTo(10,26); }); else fin(()=>{ ctx.moveTo(10,-30); ctx.lineTo(-150,-225); ctx.quadraticCurveTo(-112,-70,-82,-6); ctx.lineTo(-118,138); ctx.lineTo(10,26); });
  if(o.skelet>0.01){ ctx.save(); ctx.globalAlpha*=o.skelet; ctx.strokeStyle=HK.kraak; ctx.lineWidth=lw(5); ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(10,-8); ctx.quadraticCurveTo(-60,-60,-130,-180); ctx.stroke(); ctx.restore(); }
  ctx.restore();
  // vinnen achter het lijf
  fin(()=>{ ctx.moveTo(-160,72); ctx.lineTo(-235,132); ctx.lineTo(-250,62); });
  fin(()=>{ ctx.moveTo(-285,-52); ctx.lineTo(-335,-100); ctx.lineTo(-345,-40); });
  fin(()=>{ ctx.moveTo(-300,45); ctx.lineTo(-345,85); ctx.lineTo(-355,35); });
  // lijf
  const bodyPath=()=>{ ctx.beginPath(); ctx.moveTo(500,0); ctx.bezierCurveTo(470,-62,380,-98,250,-106); ctx.bezierCurveTo(100,-116,-150,-96,-330,-46); ctx.lineTo(-405,-28); ctx.lineTo(-405,24); ctx.bezierCurveTo(-200,72,50,96,250,82); ctx.bezierCurveTo(380,72,470,46,500,0); ctx.closePath(); };
  bodyPath(); ctx.fillStyle=ghost?rgba(C.bgSchema,0.55):body; ctx.fill();
  if(!ghost){ ctx.save(); bodyPath(); ctx.clip(); ctx.fillStyle=belly; ctx.beginPath(); ctx.moveTo(520,12); ctx.bezierCurveTo(300,40,-100,40,-420,10); ctx.lineTo(-420,120); ctx.lineTo(520,120); ctx.closePath(); ctx.fill();
    if(o.strepen){ ctx.strokeStyle=HK.streep; ctx.lineWidth=lw(6); for(let i=0;i<9;i++){ const sx=180-i*60; ctx.beginPath(); ctx.moveTo(sx,-110); ctx.lineTo(sx-20,-30); ctx.stroke(); } }
    ctx.restore(); }
  ctx.beginPath(); ctx.moveTo(-405,24); ctx.bezierCurveTo(-200,72,50,96,250,82); ctx.bezierCurveTo(380,72,470,46,500,0); ctx.bezierCurveTo(470,-62,380,-98,250,-106); ctx.bezierCurveTo(100,-116,-150,-96,-330,-46); ctx.lineTo(-405,-28); ctx.strokeStyle=rim; ctx.lineWidth=lw(1.5); ctx.stroke();
  // rugvin en borstvin
  if(o.nurse){ fin(()=>{ ctx.moveTo(-60,-100); ctx.quadraticCurveTo(-110,-190,-190,-150); ctx.quadraticCurveTo(-200,-110,-210,-85); }); fin(()=>{ ctx.moveTo(-250,-62); ctx.quadraticCurveTo(-290,-130,-330,-95); ctx.lineTo(-340,-48); }); fin(()=>{ ctx.moveTo(230,75); ctx.quadraticCurveTo(200,170,110,170); ctx.quadraticCurveTo(110,120,120,86); }); }
  else { fin(()=>{ ctx.moveTo(150,-104); ctx.quadraticCurveTo(70,-200,-15,-285); ctx.quadraticCurveTo(-30,-170,-80,-100); });
  fin(()=>{ ctx.moveTo(230,70); ctx.quadraticCurveTo(160,190,40,250); ctx.quadraticCurveTo(95,150,100,84); }); }
  if(o.barbels){ ctx.strokeStyle=rim; ctx.lineWidth=lw(3); ctx.beginPath(); ctx.moveTo(470,30); ctx.quadraticCurveTo(480,70,460,90); ctx.stroke(); }
  // kieuwspleten
  const gl=o.gill||0; ctx.lineWidth=lw(gl>0.01?3:2); ctx.strokeStyle=gl>0.01?rgba(C.goud,0.4+0.6*gl):rgba('#2A3446',0.8);
  for(let i=0;i<5;i++){ const gx=330-i*24; ctx.beginPath(); ctx.moveTo(gx,-30); ctx.quadraticCurveTo(gx-12,10,gx-2,48); ctx.stroke(); }
  // bek en oog
  ctx.strokeStyle='#2A3446'; ctx.lineWidth=lw(3); ctx.beginPath(); ctx.moveTo(445,48); ctx.quadraticCurveTo(400,70,330,62); ctx.stroke();
  dot(ctx,405,-34,lw(o.eyeR||5.5),'#121A26');
  if(o.eye>0.01){ ctx.strokeStyle=rgba(C.goud,o.eye); ctx.lineWidth=lw(3); ctx.beginPath(); ctx.arc(405,-34,lw(18),0,6.283); ctx.stroke(); }
  // gaatjes in de snuit (elektrisch zintuig)
  if(o.pores>0.01){ for(let i=0;i<26;i++){ const px=400+95*hash(i*3.1), py=-40+80*hash(i*5.7); if(Math.abs(px-405)<22&&Math.abs(py+34)<22) continue; if(px>480&&Math.abs(py)>20) continue; dot(ctx,px,py,lw(2.6),rgba(C.teal,o.pores)); } }
  // zijlijn
  if(o.zijlijn>0.01){ const zl=o.zijlijn; ctx.strokeStyle=rgba(C.goud,zl); ctx.lineWidth=lw(7); ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(380,-52); ctx.bezierCurveTo(250,-62,0,-50,-400,-4); ctx.stroke();
    ctx.lineWidth=lw(3); ctx.beginPath(); ctx.moveTo(470,-20); ctx.quadraticCurveTo(430,-60,380,-52); ctx.stroke();
    if(o.zijHits){ o.zijHits.forEach(([u,h])=>{ if(h<=0.01) return; const px=380-u*780, py=-52+u*48; dot(ctx,px,py,lw(8*h+2),rgba(C.goud,h)); }); } }
  // skelet (kraakbeen)
  if(o.skelet>0.01){ ctx.save(); ctx.globalAlpha*=o.skelet; ctx.strokeStyle=HK.kraak; ctx.lineCap='round';
    ctx.lineWidth=lw(7); ctx.beginPath(); ctx.moveTo(300,-40); ctx.bezierCurveTo(100,-40,-200,-30,-400,-10); ctx.stroke();
    ctx.lineWidth=lw(2); for(let i=0;i<26;i++){ const u=i/25, px=lerp(290,-395,u), py=lerp(-40,-10,u)-8*Math.sin(u*3); ctx.beginPath(); ctx.moveTo(px,py-14); ctx.lineTo(px,py+14); ctx.stroke(); }
    ctx.lineWidth=lw(4); ctx.beginPath(); ctx.moveTo(300,-40); ctx.quadraticCurveTo(420,-80,470,-20); ctx.quadraticCurveTo(430,20,330,10); ctx.closePath(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(445,45); ctx.quadraticCurveTo(390,75,320,50); ctx.stroke();
    for(let i=0;i<5;i++){ ctx.beginPath(); ctx.moveTo(320-i*24,-25); ctx.quadraticCurveTo(310-i*24,10,318-i*24,42); ctx.stroke(); }
    ctx.lineWidth=lw(2); for(let i=0;i<6;i++){ const u=(i+0.5)/6, bx=lerp(135,-65,u), by=-104, ex=lerp(bx,-15,0.72), ey=lerp(by,-285,0.72); ctx.beginPath(); ctx.moveTo(bx,by); ctx.lineTo(ex,ey); ctx.stroke(); }
    for(let i=0;i<5;i++){ const u=(i+0.5)/5, bx=lerp(220,110,u), by=lerp(72,84,u), ex=lerp(bx,40,0.72), ey=lerp(by,250,0.72); ctx.beginPath(); ctx.moveTo(bx,by); ctx.lineTo(ex,ey); ctx.stroke(); }
    ctx.restore(); }
  // lever vol olie
  if(o.lever>0.01){ ctx.save(); ctx.globalAlpha*=o.lever; ctx.beginPath(); ctx.moveTo(280,-10); ctx.bezierCurveTo(200,-60,-40,-55,-120,-10); ctx.bezierCurveTo(-100,40,120,60,280,30); ctx.closePath(); shape(ctx,C.oker,lighten(C.oker,0.3),lw(2));
    if(o.olie){ for(let i=0;i<12;i++){ const u=((t*0.35+i/12)%1); dot(ctx,lerp(-80,240,hash(i*4.3)),lerp(25,-35,u),lw(5),rgba(C.goud,0.8*Math.sin(u*Math.PI))); } }
    ctx.restore(); }
  ctx.restore();
  return ANK;
}
// ---------- de prooi: een vis ----------
function fishy(x,y,s,o={}){ const a=o.a===undefined?1:o.a; if(a<=0.01) return; const dir=o.dir||1, t=o.t||0; const wig=o.spartel?Math.sin(t*22)*0.35*o.spartel:Math.sin(t*4)*0.08;
  ctx.save(); ctx.globalAlpha*=a; ctx.translate(x,y); ctx.scale(dir*s,s); ctx.rotate(o.rot||0);
  ctx.save(); ctx.translate(-38,0); ctx.rotate(wig); ctx.beginPath(); ctx.moveTo(4,0); ctx.lineTo(-34,-24); ctx.lineTo(-28,0); ctx.lineTo(-34,24); ctx.closePath(); shape(ctx,o.col||HK.vis,o.rim||HK.visR,1.5/s); ctx.restore();
  ctx.beginPath(); ctx.ellipse(0,0,46,22,0,0,6.283); shape(ctx,o.col||HK.vis,o.rim||HK.visR,1.5/s);
  ctx.beginPath(); ctx.moveTo(-6,-20); ctx.lineTo(-20,-34); ctx.lineTo(14,-21); ctx.closePath(); shape(ctx,o.col||HK.vis,o.rim||HK.visR,1.2/s);
  if(o.blaas>0.01){ ctx.beginPath(); ctx.ellipse(-4,-2,22,9,0,0,6.283); shape(ctx,rgba(C.teal,0.55*o.blaas),rgba(C.teal,o.blaas),1.5/s); }
  dot(ctx,28,-6,3.2,'#121A26');
  ctx.restore(); }
// ---------- afstandsbalk: vier haltes van ver naar dichtbij ----------
const HALTE=[['honderden m','horen, ruiken'],['± 15 m','zien'],['± 2 m','zijlijn'],['± 20 cm','elektrisch zintuig']];
function distBar(pos,a=1,o={}){ if(a<=0.01) return; const y=o.y||132, x0=o.x0||470, x1=o.x1||1700; ctx.save(); ctx.globalAlpha*=a;
  ctx.strokeStyle=rgba(C.line,0.6); ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(x0,y); ctx.lineTo(x1,y); ctx.stroke();
  metaText(ctx,'afstand tot de vis',x0-30,y+8,C.text2,'right',20);
  HALTE.forEach(([d,z],i)=>{ const x=lerp(x0,x1,i/3); const on=o.lit?o.lit[i]:(Math.abs(pos-i)<0.5?1:0.35);
    dot(ctx,x,y,7,on>0.6?C.goud:rgba(C.line,0.8)); metaText(ctx,d,x,y-18,on>0.6?C.goud:C.text2,'center',20);
    if(o.zin) { ctx.save(); ctx.globalAlpha*=clamp(on,0,1); text(ctx,z,x,y+40,fTekst(26,600),on>0.6?C.text:C.text2,'center'); ctx.restore(); } });
  const mx=lerp(x0,x1,clamp(pos,0,3)/3); ctx.beginPath(); ctx.moveTo(mx,y+9); ctx.lineTo(mx-11,y+28); ctx.lineTo(mx+11,y+28); ctx.closePath(); ctx.fillStyle=C.goud; if(!o.lit) ctx.fill();
  ctx.restore(); }
// ---------- zintuig-iconen (lijntekeningen) ----------
function icoon(kind,x,y,s,col,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.translate(x,y); ctx.scale(s,s); ctx.strokeStyle=col; ctx.fillStyle=col; ctx.lineWidth=3; ctx.lineCap='round'; ctx.lineJoin='round';
  if(kind==='oor'){ ctx.beginPath(); ctx.moveTo(-6,18); ctx.bezierCurveTo(-22,10,-20,-22,2,-24); ctx.bezierCurveTo(22,-24,22,0,8,6); ctx.quadraticCurveTo(2,10,4,20); ctx.stroke(); ctx.beginPath(); ctx.arc(2,-6,7,3.4,6.6); ctx.stroke(); }
  if(kind==='neus'){ for(let i=0;i<3;i++){ ctx.beginPath(); ctx.moveTo(-18,-14+i*14); ctx.bezierCurveTo(-8,-20+i*14,0,-8+i*14,18,-14+i*14); ctx.stroke(); } }
  if(kind==='oog'){ ctx.beginPath(); ctx.moveTo(-22,0); ctx.quadraticCurveTo(0,-20,22,0); ctx.quadraticCurveTo(0,20,-22,0); ctx.stroke(); dot(ctx,0,0,6,col); }
  if(kind==='zijlijn'){ ctx.beginPath(); for(let i=0;i<=20;i++){ const xx=-24+i*2.4, yy=Math.sin(i*0.9)*7; i?ctx.lineTo(xx,yy):ctx.moveTo(xx,yy);} ctx.stroke(); }
  if(kind==='elek'){ ctx.beginPath(); ctx.moveTo(4,-24); ctx.lineTo(-10,2); ctx.lineTo(2,2); ctx.lineTo(-6,24); ctx.lineTo(12,-4); ctx.lineTo(0,-4); ctx.closePath(); ctx.fill(); }
  ctx.restore(); }
// geluidsringen en geurwolk
function rings(x,y,t,t0,maxR,col,a=1){ if(a<=0.01||t<t0) return; for(let i=0;i<4;i++){ const u=((t-t0)*0.45+i/4)%1; ctx.save(); ctx.globalAlpha*=a*(1-u); ctx.strokeStyle=col; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(x,y,20+u*maxR,-1.1,1.1); ctx.stroke(); ctx.restore(); } }
function cloud(x,y,r,a,t,dx=0){ if(a<=0.01) return; for(let i=0;i<70;i++){ const w=wander(i+300,t,r*0.12,0.5); const ang=hash(i*2.1)*6.283, d=Math.sqrt(hash(i*3.7))*r; dot(ctx,x+dx*hash(i*1.3)+Math.cos(ang)*d+w.x,y+Math.sin(ang)*d*0.55+w.y,2.5+3*hash(i*9),rgba(HK.bloed,(0.25+0.45*hash(i*5))*a)); } }
function drukGolf(x,y,t,t0,a,dir=1){ if(a<=0.01||t<t0) return; for(let i=0;i<3;i++){ const u=((t-t0)*0.8+i/3)%1; ctx.save(); ctx.globalAlpha*=a*(1-u)*0.9; ctx.strokeStyle=C.teal; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(x,y,30+u*260,dir>0?-0.7:Math.PI-0.7,dir>0?0.7:Math.PI+0.7); ctx.stroke(); ctx.restore(); } }
function veldLijnen(x,y,a,t){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a*(0.6+0.4*Math.sin(t*5)); ctx.strokeStyle=C.teal; ctx.lineWidth=2; ctx.setLineDash([6,8]); for(let i=1;i<=3;i++){ ctx.beginPath(); ctx.ellipse(x,y,40*i,18*i,0,0,6.283); ctx.stroke(); } ctx.restore(); }
// schildpad en zeekoe (Macro: zijaanzicht, egale vlakken)
function schildpad(x,y,s,a=1,t=0){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.translate(x,y); ctx.scale(s,s);
  const fl=Math.sin(t*2)*0.3; ctx.save(); ctx.translate(30,10); ctx.rotate(0.4+fl); ctx.beginPath(); ctx.ellipse(18,0,26,8,0,0,6.283); shape(ctx,'#8A9A5E','#A8B87A',1.5/s); ctx.restore();
  ctx.beginPath(); ctx.ellipse(0,0,52,18,0,Math.PI,0); ctx.lineTo(52,6); ctx.lineTo(-52,6); ctx.closePath(); shape(ctx,'#6E7F4A','#8E9F66',1.5/s);
  ctx.beginPath(); ctx.ellipse(62,-4,16,11,0,0,6.283); shape(ctx,'#8A9A5E','#A8B87A',1.5/s); dot(ctx,68,-7,2.6,'#121A26'); ctx.restore(); }
function zeekoe(x,y,s,a=1,t=0,dir=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.translate(x,y); ctx.scale(dir*s,s);
  ctx.beginPath(); ctx.moveTo(90,0); ctx.bezierCurveTo(90,-34,30,-42,-40,-30); ctx.bezierCurveTo(-80,-22,-100,-6,-112,0); ctx.bezierCurveTo(-100,8,-80,22,-40,28); ctx.bezierCurveTo(30,40,90,30,90,0); ctx.closePath(); shape(ctx,'#8C8A86','#B0ADA8',1.5/s);
  ctx.save(); ctx.translate(-108,0); ctx.rotate(Math.sin(t*1.5)*0.12); ctx.beginPath(); ctx.ellipse(-30,0,40,9,0,0,6.283); shape(ctx,'#8C8A86','#B0ADA8',1.5/s); ctx.restore();
  ctx.beginPath(); ctx.ellipse(86,10,14,10,0.3,0,6.283); shape(ctx,'#8C8A86','#B0ADA8',1.2/s);
  ctx.beginPath(); ctx.ellipse(30,22,22,7,0.5,0,6.283); shape(ctx,'#8C8A86','#B0ADA8',1.2/s); dot(ctx,72,-12,2.6,'#121A26'); ctx.restore(); }
function grasVeld(x0,x1,y,h,t,a=1,dens=1){ for(let i=0;i<Math.round((x1-x0)/26*dens);i++){ const x=x0+(i+0.5)*(x1-x0)/Math.round((x1-x0)/26*dens); tuft(x,y,0.9+0.3*hash(i*5),t,a,h); } }

// ---------- scènes ----------
const SCENES = {
// Cold open: de filmmythe
s01(ctx,t,q){ const dk=ramp(t,q.at('pikdonker'),0.8); sea({t,donker:dk});
  metaText(ctx,'zoals in een film',W-60,110,C.grain,'right',24*clamp(1-ramp(t,q.at('Klopt'),0.4),0.01,1));
  // druppel valt
  const dy=clamp((t-0.4)/1.6,0,1); alpha(ctx,1-ramp(t,q.at('Klopt'),0.5),()=>{ ctx.beginPath(); const yy=120+dy*300; ctx.moveTo(360,yy-26); ctx.quadraticCurveTo(378,yy,360,yy+12); ctx.quadraticCurveTo(342,yy,360,yy-26); shape(ctx,HK.bloed,lighten(HK.bloed,0.3),1.5); });
  cloud(360,430,40+60*ramp(t,2.0,1.5),ramp(t,2.0,0.8),t);
  const sx=1700-160*ramp(t,q.at('kilometers'),2.5); shark(sx,420,260,{t,dir:-1,a:1-0.6*dk});
  alpha(ctx,fadeIO(t,q.at('kilometers'),q.at('Klopt'),0.4),()=>{ ctx.save(); ctx.setLineDash([10,10]); ctx.strokeStyle=rgba(C.goud,0.8); ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(420,430); ctx.lineTo(sx-170,420); ctx.stroke(); ctx.restore(); text(ctx,'kilometers ver?',(420+sx-170)/2,395,fTekst(40,600),C.goud,'center'); });
  pill(ctx,960,160,'klopt dat eigenlijk?',C.goud,fadeIO(t,q.at('Klopt'),q.at('hoe'),0.4),40);
  pill(ctx,960,160,'hoe vindt een haai zijn prooi in het donker?',C.goud,ramp(t,q.at('hoe'),0.5),40);
},
// Titelkaart
s02(ctx,t,q){ bg(ctx,'schema'); const a=ramp(t,0.1,0.6);
  alpha(ctx,a,()=>{ text(ctx,'Haaien',120,300,fTitel(110),C.text); ctx.font=fTekst(48,600); ctx.fillStyle=C.text2; ctx.textAlign='left'; wrap(ctx,'Hoe vindt een haai zijn prooi?',120,390,760,60);
    metaText(ctx,'onderbouw · kerndoelen 29B · 32A · 32B · 33C',W-60,60,C.grain,'right',22);
    shark(1340,470,760,{t,dir:-1}); fishy(780,640,1.1,{t,dir:1,a:ramp(t,q.at('prooi'),0.5)}); });
},
// H1: gehoor en reuk
s03(ctx,t,q){ sea({t}); const sp=1-ramp(t,q.at('Dan'),2)*0.4;
  fishy(320,560,1.3,{t,spartel:sp}); label(ctx,'gewonde vis','spartelt',320,560,320,700,ramp(t,q.at('gewond'),0.4),C.oker);
  shark(1560-40*ramp(t,q.at('Dan'),3),470,300,{t,dir:-1});
  metaText(ctx,'honderden meters',940,420,C.grain,'center',24*clamp(fadeIO(t,q.at('honderden'),q.at('Eerst'),0.4),0.01,1));
  rings(320,560,t,q.at('hoort'),1150,C.teal,fadeIO(t,q.at('hoort'),q.at('Dan'),0.5));
  naamBij(ctx,'gehoor','hoort het gespartel',1560,330,ramp(t,q.at('hoort'),0.4),'center',C.teal);
  pill(ctx,960,240,'geluid draagt ver onder water',C.teal,fadeIO(t,q.at('Geluid'),q.at('Dan'),0.4),32);
  const ru=ramp(t,q.at('ruikt'),1.2); cloud(320+500*ru,540,60+120*ru,ramp(t,q.at('ruikt'),0.6),t,300*ru);
  arrow(ctx,500,700,760,700,rgba(C.line,0.9),2,12,ramp(t,q.at('ruikt'),0.5)); metaText(ctx,'stroming',630,740,C.text2,'center',20*clamp(ramp(t,q.at('ruikt'),0.5),0.01,1));
  naamBij(ctx,'reuk','ruikt het bloed',1560,640,ramp(t,q.at('ruikt'),0.4),'center',HK.bloed);
  pill(ctx,960,240,'hoe goed is die neus?',C.goud,ramp(t,q.at('neus'),0.5),34);
  distBar(0,ramp(t,0.3,0.6));
},
// H1: een druppel in een zwembad, niet kilometers
s05(ctx,t,q){ bg(ctx,'schema'); const z=ramp(t,q.at('zee'),1.0);
  const pw=lerp(760,150,z), ph=lerp(340,80,z), px=lerp(960,330,z), py=lerp(470,650,z);
  roundRect(ctx,px-pw/2,py-ph/2,pw,ph,8); shape(ctx,rgba(C.teal,0.18),C.teal,1.5); dot(ctx,px,py,lerp(9,5,z),HK.bloed);
  naamBij(ctx,'zwembad','één druppel: in het beste geval ruikt de haai het',px,py-ph/2-34,1-ramp(t,q.at('zee'),0.3),'center',C.teal); metaText(ctx,'zwembad',px,py+ph/2+30,C.teal,'center',20*clamp(ramp(t,q.at('zee')+0.8,0.4),0.01,1));
  alpha(ctx,z,()=>{ roundRect(ctx,160,190,1600,640,12); ctx.strokeStyle=rgba(C.teal,0.7); ctx.lineWidth=1.5; ctx.stroke(); metaText(ctx,'de zee: veel groter',960,240,C.teal,'center',24); });
  const vd=ramp(t,q.at('verdunt'),2.5); cloud(330+600*vd,520,30+200*vd,ramp(t,q.at('verdunt'),0.5)*(1-0.75*vd)*(1-ramp(t,q.at('Hooguit'),0.5)),t,500*vd);
  arrow(ctx,600,780,1000,780,rgba(C.line,0.9),2,12,ramp(t,q.at('stroming'),0.4)); metaText(ctx,'stroming',800,815,C.text2,'center',20*clamp(ramp(t,q.at('stroming'),0.4),0.01,1));
  pill(ctx,960,110,'kilometers ver?',C.goud,ramp(t,q.at('Kilometers'),0.4),36); crossOut(ctx,960,110,46,ramp(t,q.at('Nee',2),0.3));
  alpha(ctx,ramp(t,q.at('Hooguit'),0.5),()=>{ dot(ctx,560,470,7,HK.bloed); dot(ctx,1260,470,6,C.text2); text(ctx,'haai',1260,450,fTekst(28,600),C.text2,'center'); haak(ctx,560,1260,500,'hooguit een paar honderd meter',HK.bloed,1); metaText(ctx,'als de stroming meezit',910,610,C.grain,'center',22); });
},
// H1: zien, zijlijn, de vis duikt het zand in
s06(ctx,t,q){ const cutIn=q.at('zijlijn')-0.2, cutOut=q.at('Dan');
  if(t<cutIn||t>=cutOut){ const d=t>=cutOut; sea({t}); const sx=d?820:lerp(1500,1050,ramp(t,0,4))-lerp(0,200,ramp(t,q.at('dichterbij'),2));
    const fy=d?lerp(600,870,ramp(t,cutOut+0.5,1.4)):600; fishy(420,fy,1.2,{t,spartel:d?1-ramp(t,cutOut+0.5,1.2):0.7,rot:d?0.5*ramp(t,cutOut+0.4,0.6):0});
    if(d){ ctx.fillStyle=HK.bodem; ctx.fillRect(280,780,300,H-780); alpha(ctx,ramp(t,cutOut+1.6,0.6),()=>{ ctx.save(); ctx.setLineDash([6,6]); ctx.strokeStyle=rgba(HK.vis,0.6); ctx.lineWidth=2; ctx.beginPath(); ctx.ellipse(420,808,56,20,0.1,0,6.283); ctx.stroke(); ctx.restore(); metaText(ctx,'in het zand',420,880,C.grain,'center',22); }); }
    const sh=shark(sx,d?440:470,d?420:360,{t,dir:-1,eye:d?0:fadeIO(t,q.at('ziet'),q.at('dichterbij'),0.4)});
    if(!d){ naamBij(ctx,'ogen','ook goed in het donker',sh.oog.x,sh.oog.y+150,fadeIO(t,q.at('ziet'),q.at('dichterbij'),0.4),'center',C.goud);
      alpha(ctx,fadeIO(t,q.at('ziet'),q.at('dichterbij'),0.4),()=>{ ctx.save(); ctx.fillStyle=rgba(C.goud,0.08); ctx.beginPath(); ctx.moveTo(sh.oog.x,sh.oog.y); ctx.lineTo(420,520); ctx.lineTo(420,680); ctx.closePath(); ctx.fill(); ctx.restore(); }); }
    let pos=0; if(!d){ pos=lerp(0,1,ramp(t,q.at('vijftien'),0.8)); pos=lerp(pos,2,ramp(t,q.at('dichterbij'),0.8)); } else pos=2; distBar(pos,1);
    pill(ctx,960,240,'hoe vindt de haai hem nu?',C.goud,ramp(t,q.at('nu'),0.5),36);
    return; }
  // Schema-kaart: de zijlijn
  bg(ctx,'schema'); const u=t-cutIn; const sh=shark(1080,450,980,{t:t*0.6,dir:-1,zijlijn:ramp(u,0,0.6),speed:2,
    zijHits:[0.15,0.35,0.55,0.75].map((v,i)=>[v,fadeIO(t,q.at('trillingen')+0.4+i*0.25,q.at('afstand')+1.2,0.3)])});
  naamBij(ctx,'zijlijn','rij zintuigcellen langs lijf en kop',sh.buik.x+60,sh.buik.y+230,ramp(u,0.2,0.5),'center',C.goud);
  fishy(260,420,1.3,{t,spartel:1,a:ramp(t,q.at('trillingen'),0.5)}); drukGolf(300,420,t,q.at('trillingen'),ramp(t,q.at('trillingen'),0.4));
  metaText(ctx,'trillingen in het water',300,560,C.teal,'center',22*clamp(ramp(t,q.at('trillingen'),0.4),0.01,1));
  pill(ctx,960,150,'werkt op een paar meter afstand',C.goud,ramp(t,q.at('paar'),0.5),30);
  metaText(ctx,'schematisch · niet op schaal',W-60,96,C.text2,'right',20);
},
// H1: het elektrisch zintuig
s08(ctx,t,q){ sea({t}); const z=ramp(t,q.at('gaatjes'),0.6), out=ramp(t,q.at('Zo',2),0.5);
  // ingegraven vis met elektrisch veld
  ctx.save(); ctx.setLineDash([6,6]); ctx.strokeStyle=rgba(HK.vis,0.6); ctx.lineWidth=2; ctx.beginPath(); ctx.ellipse(700,808,56,20,0.1,0,6.283); ctx.stroke(); ctx.restore();
  veldLijnen(700,806,ramp(t,q.at('elektrische'),0.5)*(1-out*0.6),t);
  metaText(ctx,'kleine elektrische signalen',700,740-80,C.teal,'center',22*clamp(fadeIO(t,q.at('elektrische'),q.at('gaatjes'),0.4),0.01,1));
  const mv=ramp(t,q.at('voelt'),2.2), hx=lerp(1500,980,mv), hy=lerp(520,640,mv), rot=lerp(0,0.3,mv);
  shark(hx,hy,460,{t,dir:-1,rot,pores:ramp(t,q.at('elektrisch',2),0.5)}); const sh={snuit:{x:hx-207*Math.cos(rot),y:hy+207*Math.sin(rot)}};
  naamBij(ctx,'elektrisch zintuig','voelt de signalen',sh.snuit.x-60,sh.snuit.y-150,fadeIO(t,q.at('elektrisch',2),q.at('gaatjes'),0.4),'center',C.teal);
  zoomCircle(ctx,1480,470,200,sh.snuit.x,sh.snuit.y,'',z,()=>{ ctx.save(); ctx.translate(80,140); ctx.fillStyle=C.bgSchema; ctx.fillRect(1190,120,420,420);
    ctx.beginPath(); ctx.moveTo(1240,520); ctx.quadraticCurveTo(1240,170,1400,150); ctx.quadraticCurveTo(1560,170,1560,520); ctx.closePath(); shape(ctx,HK.buik,HK.haaiR,1.5);
    for(let i=0;i<70;i++){ const px=1400+(hash(i*2.3)-0.5)*260*(0.4+0.6*hash(i*7)), py=200+hash(i*4.1)*230; if(Math.abs(px-1400)>(py-150)*0.45+40) continue; dot(ctx,px,py,3.2,'#3A4658'); }
    ctx.strokeStyle='#3A4658'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(1290,470); ctx.quadraticCurveTo(1400,430,1510,470); ctx.stroke(); ctx.restore(); });
  naamBij(ctx,'gaatjes in de snuit','snuit van onderen · ampullen van Lorenzini',1480,212,z,'center',C.teal);
  alpha(ctx,fadeIO(t,q.at('twintig'),q.at('Zo',2),0.4),()=>{ ctx.strokeStyle=C.goud; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(sh.snuit.x,sh.snuit.y+14); ctx.lineTo(720,792); ctx.stroke(); text(ctx,'± 20 cm',(sh.snuit.x+720)/2-90,(sh.snuit.y+792)/2+10,fTekst(32,600),C.goud,'center'); });
  alpha(ctx,out,()=>{ pill(ctx,640,330,'zo vindt hij een vis die hij niet ziet',C.goud,1,32); });
  distBar(3,1);
},
// H2: oud, kraakbeen, zwaarder dan water
s09(ctx,t,q){ bg(ctx,'schema'); const sk=q.at('botten')-0.3;
  if(t<sk){ // tijdlijn
    const X=(my)=>lerp(1760,180,my/500); const y=470; const a0=ramp(t,q.at('bestaan'),0.5);
    alpha(ctx,a0,()=>{ ctx.strokeStyle=C.line; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(180,y+120); ctx.lineTo(1760,y+120); ctx.stroke();
      [500,400,300,200,100,0].forEach(v=>{ ctx.beginPath(); ctx.moveTo(X(v),y+112); ctx.lineTo(X(v),y+128); ctx.stroke(); metaText(ctx,v?String(v):'nu',X(v),y+165,C.text2,'center',22); });
      metaText(ctx,'miljoen jaar geleden',970,y+210,C.text2,'center',22); });
    const bar=(from,to,yy,col,a,naam)=>{ if(a<=0.01) return; alpha(ctx,a,()=>{ roundRect(ctx,X(from),yy-14,X(to)-X(from),28,14); shape(ctx,rgba(col,0.35),col,1.5); naamBij(ctx,naam,'',X(from),yy-28,1,'left',col); }); };
    alpha(ctx,a0,()=>{ const g=ramp(t,q.at('450'),1.2); if(g>0.01){ roundRect(ctx,X(450),y-194,Math.max(28,X(450-450*g)-X(450)),28,14); shape(ctx,rgba(C.groen,0.35),C.groen,1.5); naamBij(ctx,'haaien','',X(450),y-208,1,'left',C.groen); } });
    bar(385,0,y-60,C.groen,ramp(t,q.at('bomen'),0.5),'eerste bomen');
    bar(230,66,y+40,C.oker,ramp(t,q.at('dinosauriërs'),0.5),'dinosauriërs');
    alpha(ctx,ramp(t,q.at('jaar'),0.5),()=>metaText(ctx,'ongeveer · oudste vondsten: schubben',X(450),y-136,C.grain,'left',20));
    return; }
  const u=t-sk; const zak=ramp(t,q.at('zwaarder'),3);
  const sh=shark(900,430+zak*120,900,{t:t*0.5,dir:-1,ghost:ramp(u,0,0.6),skelet:ramp(u,0.4,0.8),speed:1.5});
  naamBij(ctx,'skelet van kraakbeen','stevig, buigzaam, lichter dan bot',900,130,ramp(t,q.at('kraakbeen'),0.4),'center',HK.kraak);
  const oo=fadeIO(t,q.at('oorschelp'),q.at('Toch'),0.5); alpha(ctx,oo,()=>{ roundRect(ctx,1460,440,380,360,16); shape(ctx,rgba(C.bgSchema,0.95),C.line,1);
    ctx.save(); ctx.save(); roundRect(ctx,1460,440,380,360,16); ctx.clip(); const P=persoon(ctx,'daan',1650,1860,1400,{uit:'blij',pose:'staan',kijk:1,t}); ctx.restore(); ctx.restore(); const h=P.hoofd; ctx.save(); ctx.globalAlpha=oo; ctx.strokeStyle=C.goud; ctx.lineWidth=5; ctx.beginPath(); ctx.arc(1758,662,34,0,6.283); ctx.stroke(); ctx.restore();
    metaText(ctx,'oorschelp: ook kraakbeen',1650,840,C.goud,'center',20); });
  alpha(ctx,ramp(t,q.at('zwaarder'),0.4),()=>{ arrow(ctx,1500,300,1500,520,C.koraal,4,16,1); metaText(ctx,'iets zwaarder dan water',1500,270,C.koraal,'center',22); });
  pill(ctx,960,820,'waarom zakt hij niet naar de bodem?',C.goud,ramp(t,q.at('Waarom'),0.5),34);
},
// H2: zwemblaas tegen lever
s11(ctx,t,q){ bg(ctx,'schema'); const sl=ramp(t,q.at('lever'),0.5);
  fishy(380,420,3.0,{t,blaas:ramp(t,q.at('zwemblaas'),0.5)}); naamBij(ctx,'zwemblaas','ballon met gas',380,270,ramp(t,q.at('zwemblaas'),0.4),'center',C.teal);
  metaText(ctx,'gewone vis',380,600,C.text2,'center',22);
  const sh=shark(1260,430,820,{t:t*0.5,dir:-1,ghost:sl*0.8,lever:sl,olie:ramp(t,q.at('Olie',2),0.5),speed:1.5});
  alpha(ctx,fadeIO(t,q.at('Haaien'),q.at('lever'),0.4),()=>{ text(ctx,'geen zwemblaas',1260,150,fTekst(36,600),C.koraal,'center'); });
  naamBij(ctx,'lever vol olie','olie is lichter dan water',1180,700,sl,'center',C.oker);
  alpha(ctx,ramp(t,q.at('lichter'),0.5),()=>{ for(let i=0;i<3;i++) arrow(ctx,1120+i*120,330,1120+i*120,250-10*Math.sin(t*3+i),C.groen,3,12,1); });
  alpha(ctx,ramp(t,q.at('kwart'),0.5),()=>{ const x=940,y=820,w=480; roundRect(ctx,x,y,w,26,13); shape(ctx,rgba(C.fill,0.8),C.line,1); roundRect(ctx,x,y,w/4,26,13); shape(ctx,C.oker,lighten(C.oker,0.3),1); metaText(ctx,'lever: tot ± een kwart van het gewicht',x+w/2,y-14,C.grain,'center',20); });
},
// H2: kieuwen; witte haai en verpleegsterhaai
s12(ctx,t,q){ sea({t,bodem:790}); const vp=ramp(t,q.at('verpleegsterhaai'),0.6);
  const sh=shark(1000-80*Math.sin(t*0.3),330,560,{t,dir:1,gill:ramp(t,q.at('kieuwen'),0.4)*(1-vp*0.7),a:1-vp*0.5});
  naamBij(ctx,'kieuwen','',sh.kieuw.x,sh.kieuw.y-110,fadeIO(t,q.at('kieuwen'),q.at('hoort'),0.4),'center',C.goud);
  const fl=fadeIO(t,q.at('Zwemmend'),q.at('Maar'),0.5); alpha(ctx,fl,()=>{ for(let i=0;i<4;i++){ const u=((t*0.8+i/4)%1); const x=lerp(sh.neus.x+140,sh.kieuw.x-40,u); dot(ctx,x,sh.bek.y-10+(i%2)*8,6,rgba(C.teal,Math.sin(u*Math.PI))); } arrow(ctx,sh.kieuw.x-30,sh.kieuw.y+10,sh.kieuw.x-140,sh.kieuw.y+70,C.teal,3,12,1); });
  naamBij(ctx,'witte haai','zwemt, dan stroomt het water langs',540,330,fadeIO(t,q.at('witte'),q.at('Maar'),0.4),'right',C.text);
  pill(ctx,960,130,'"een haai moet altijd zwemmen"',C.text,fadeIO(t,q.at('weleens'),q.at('Maar'),0.4),32);
  alpha(ctx,fadeIO(t,q.at('klopt'),q.at('Maar'),0.4),()=>{ ctx.strokeStyle=C.groen; ctx.lineWidth=6; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(1390,110); ctx.lineTo(1410,135); ctx.lineTo(1450,90); ctx.stroke(); text(ctx,'voor de witte haai',1480,140,fTekst(28,600),C.groen,'left'); });
  const nh=shark(640,742,560,{t,dir:1,swim:false,body:HK.verpl,rim:HK.verplR,belly:'#C9A98A',barbels:true,nurse:true,a:vp});
  const pump=ramp(t,q.at('pompt'),0.5); alpha(ctx,pump*vp,()=>{ const s=0.5+0.5*Math.sin(t*3); for(let i=0;i<3;i++){ const u=((t*0.6+i/3)%1); dot(ctx,lerp(nh.neus.x+60,nh.kieuw.x,u),nh.bek.y-12,5,rgba(C.teal,Math.sin(u*Math.PI))); } ctx.strokeStyle=rgba(C.goud,0.5+0.5*s); ctx.lineWidth=3; ctx.beginPath(); ctx.arc(nh.bek.x-10,nh.bek.y-28,24+6*s,0,6.283); ctx.stroke(); });
  naamBij(ctx,'verpleegsterhaai','ligt stil, pompt water met zijn wangspieren',nh.rugvin.x+40,nh.rugvin.y-40,vp,'center',C.oker);
},
// H2: tanden als lopende band (kaak in doorsnede: nieuwe tanden binnen, in gebruik bovenop, oude vallen eruit)
s13(ctx,t,q){ bg(ctx,'schema'); const cx=960, cy=700, R=250, da=Math.PI*0.15;
  ctx.save(); ctx.strokeStyle='#7A3A4A'; ctx.lineWidth=80; ctx.lineCap='round'; ctx.beginPath(); ctx.arc(cx,cy,R-36,Math.PI*0.88,Math.PI*1.68); ctx.stroke(); ctx.strokeStyle='#A05868'; ctx.lineWidth=1.5; ctx.beginPath(); ctx.arc(cx,cy,R+5,Math.PI*0.88,Math.PI*1.68); ctx.stroke(); ctx.restore();
  const fallT=q.at('uit'), sh=ease(clamp((t-q.at('schuift'))/1.6,0,1));
  for(let k=-4;k<=1;k++){ const kk=k+sh; let a=Math.PI*1.5+kk*da; let al=1, out=0, rot=0;
    if(k===1){ const u=clamp((t-fallT)/1.4,0,1); out=u*180; rot=u*1.2; al=1-u; a=Math.PI*1.5+da; }
    if(k===-4) al=sh; if(al<=0.01) continue;
    const lie=clamp(-kk,0,3)/3, sc=1-0.4*lie, tilt=-1.25*Math.min(1,lie*2.2);
    const x=cx+Math.cos(a)*(R+out-14*lie), y=cy+Math.sin(a)*(R+out-14*lie);
    ctx.save(); ctx.globalAlpha*=al; ctx.translate(x,y); ctx.rotate(a+Math.PI/2+rot+tilt); ctx.scale(sc,sc); ctx.beginPath(); ctx.moveTo(-24,6); ctx.lineTo(0,-70); ctx.lineTo(24,6); ctx.closePath(); shape(ctx,'#F2EFE6','#D9D4C4',1.5/sc); ctx.restore(); }
  // richting van de lopende band
  alpha(ctx,ramp(t,q.at('rijen'),0.5),()=>{ ctx.save(); ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.setLineDash([10,10]); ctx.beginPath(); ctx.arc(cx,cy,R+130,Math.PI*1.05,Math.PI*1.62); ctx.stroke(); ctx.restore(); const ae=Math.PI*1.62; arrow(ctx,cx+Math.cos(ae-0.05)*(R+130),cy+Math.sin(ae-0.05)*(R+130),cx+Math.cos(ae)*(R+130),cy+Math.sin(ae)*(R+130),C.goud,3,16,1); });
  naamBij(ctx,'nieuwe tanden','liggen al klaar',cx-R-90,cy-150,ramp(t,q.at('rijen'),0.4),'right',C.text);
  naamBij(ctx,'in gebruik','',cx,cy-R-170,ramp(t,q.at('rijen'),0.4),'center',C.text);
  naamBij(ctx,'valt uit','de volgende schuift door',cx+R+120,cy-220,ramp(t,q.at('Valt'),0.4),'left',C.koraal);
  pill(ctx,960,150,'tienduizenden tanden in een leven',C.goud,ramp(t,q.at('tienduizenden'),0.5),34);
  metaText(ctx,'kaak in doorsnede · schematisch',cx,cy+175,C.text2,'center',22);
},
// H2: natuurlijke selectie
s14(ctx,t,q){ bg(ctx,'schema'); const gen=ramp(t,q.at('generaties'),0.6);
  if(gen<1){ alpha(ctx,1-gen,()=>{ const zl=[0.25,0.6,0.35,1,0.45]; zl.forEach((z,i)=>{ const x=300+i*330, y=430+(i%2)*60; shark(x,y,270,{t:t+i,dir:1,zijlijn:ramp(t,q.at('verschillen'),0.5)*z}); });
      naamBij(ctx,'haaien verschillen een beetje','de zijlijn van de een voelt beter dan die van de ander',960,230,ramp(t,q.at('verschillen'),0.5),'center',C.text);
      const bx=300+3*330, by=430+60; alpha(ctx,ramp(t,q.at('eten'),0.5),()=>{ for(let k=0;k<3;k++) fishy(bx-130+k*90,by+150,0.55,{t:t+k}); metaText(ctx,'meer eten',bx-40,by+215,C.oker,'center',20); });
      alpha(ctx,ramp(t,q.at('jongen'),0.5),()=>{ for(let k=0;k<3;k++) shark(bx-140+k*110,by+250,120,{t:t+k,dir:1,zijlijn:1}); metaText(ctx,'vaker jongen',bx-30,by+310,C.goud,'center',20); }); });
    pill(ctx,960,130,'niet omdat hij dat wilde',C.koraal,fadeIO(t,q.at('Niet'),q.at('verschillen'),0.4),34); }
  alpha(ctx,gen,()=>{ for(let g=0;g<4;g++){ const y=230+g*150; const share=[1,2,4,5][g]; metaText(ctx,'generatie '+(g+1)+(g===3?' …':''),200,y+10,C.text2,'left',22);
      for(let i=0;i<6;i++){ const on=i<share; shark(560+i*210,y,170,{t:t+i+g,dir:1,zijlijn:on?1:0.15,a:on?1:0.55}); } } });
  metaText(ctx,'goud: een zijlijn die net iets beter voelt',1720,868,C.goud,'right',20*clamp(ramp(t,q.at('verschillen'),0.5),0.01,1));
  pill(ctx,960,790,'natuurlijke selectie',C.goud,ramp(t,q.at('natuurlijke'),0.5),36);
},
// H3: voedselweb, toppredator, de baai
s15(ctx,t,q){ const bay=q.at('baai')-0.3;
  if(t<bay){ bg(ctx,'schema'); const N={gras:[960,760],koe:[560,520],pad:[960,520],vis:[1360,520],haai:[960,230]};
    const node=(k,naam,a,draw)=>{ if(a<=0.01) return; alpha(ctx,a,()=>{ const [x,y]=N[k]; roundRect(ctx,x-160,y-80,320,160,18); shape(ctx,rgba(C.fill,0.7),C.line,1); draw(x,y); text(ctx,naam,x,y+66,fTekst(28,600),C.text,'center'); }); };
    const a=ramp(t,0.2,0.6);
    node('gras','zeegras',a,(x,y)=>grasVeld(x-110,x+110,y+30,0.8,t,1,0.9)); node('koe','zeekoe',a,(x,y)=>zeekoe(x,y-14,0.8,1,t)); node('pad','zeeschildpad',a,(x,y)=>schildpad(x-10,y-4,0.95,1,t)); node('vis','kleine vis',a,(x,y)=>fishy(x,y-14,1.0,{t}));
    node('haai','tijgerhaai',a,(x,y)=>shark(x,y-10,250,{t,dir:1,strepen:true,body:HK.tijger}));
    alpha(ctx,a,()=>{ [['gras','koe'],['gras','pad'],['koe','haai'],['pad','haai'],['vis','haai']].forEach(([f,to])=>{ const A=N[f],B=N[to]; const dy=B[1]<A[1]?-1:1; arrow(ctx,A[0]+(B[0]-A[0])*0.28,A[1]+dy*82,B[0]-(B[0]-A[0])*0.28,B[1]-dy*82,C.line,2,12,1); }); });
    metaText(ctx,'pijl: wordt gegeten door',1760,860,C.text2,'right',20);
    alpha(ctx,ramp(t,q.at('toppredator'),0.4),()=>{ roundRect(ctx,N.haai[0]-168,N.haai[1]-88,336,176,22); ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.stroke(); text(ctx,'toppredator',N.haai[0]+200,N.haai[1]+10,fTekst(40,600),C.goud,'left'); metaText(ctx,'bijna niets eet hem op',N.haai[0]+200,N.haai[1]+50,C.grain,'left',20); });
    return; }
  bayScene(t,{haai:1-0.65*ramp(t,q.at('verdwijnen'),0.6),grazersIn:0,gras:1,labels:{ondiep:ramp(t,q.at('ondiepe'),0.4),grazers:ramp(t,q.at('grazers'),0.4),zeegras:ramp(t,q.at('zeegras'),0.4)},in:ramp(t,bay,0.6)});
  pill(ctx,960,110,'een baai in Australië',C.text,fadeIO(t,bay+0.2,q.at('ondiepe'),0.4),30);
  pill(ctx,960,110,'wat gebeurt er met het zeegras?',C.goud,ramp(t,q.at('gebeurt'),0.5),34);
},
// H3: zonder haaien
s17(ctx,t,q){ const back=ramp(t,q.at('angst'),1.0); const gone=1-back;
  const kaal=ramp(t,q.at('kaal'),2.0)*gone; bayScene(t,{haai:back,grazersIn:ramp(t,0.2,1.8)*gone,gras:1-0.85*kaal,vissen:fadeIO(t,q.at('schuilen'),q.at('angst'),0.5),in:1});
  pill(ctx,960,110,'zonder haaien: overal grazen',C.koraal,fadeIO(t,0.2,q.at('juist'),0.4),30);
  pill(ctx,960,110,'jonge vissen schuilen in het zeegras',C.oker,fadeIO(t,q.at('juist'),q.at('angst'),0.4),30);
  alpha(ctx,ramp(t,q.at('angst'),0.6),()=>haak(ctx,140,820,640,'de angst voor haaien houdt het zeegras gezond',C.groen,1));
},
// H3: wie is gevaarlijk voor wie
s18(ctx,t,q){ bg(ctx,'schema'); const a1=ramp(t,q.at('beten'),0.5);
  alpha(ctx,ramp(t,q.at('2025'),0.4),()=>{ text(ctx,'haaien → mensen',460,170,fTekst(40,600),C.text,'center'); metaText(ctx,'2025 · beten zonder aanleiding · ISAF',460,210,C.grain,'center',20); });
  for(let i=0;i<65;i++){ const c=i%13, r=Math.floor(i/13); const ap=a1*ramp(t,q.at('beten')+i*0.02,0.2); if(ap<=0.01) continue; const dead=i<9&&t>q.at('Negen'); human(ctx,160+c*48,320+r*92,70,ap,dead?C.koraal:C.mens); }
  metaText(ctx,'65 beten',460,820-20,C.text,'center',24*clamp(a1,0.01,1)); metaText(ctx,'9 overleden',460,820+14,C.koraal,'center',22*clamp(ramp(t,q.at('Negen'),0.4),0.01,1));
  const a2=ramp(t,q.at('Mensen'),0.5); alpha(ctx,a2,()=>{ ctx.strokeStyle=rgba(C.line,0.4); ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(960,150); ctx.lineTo(960,840); ctx.stroke();
    text(ctx,'mensen → haaien',1440,170,fTekst(40,600),C.text,'center'); metaText(ctx,'per jaar · vooral door visserij',1440,210,C.grain,'center',20);
    const n=Math.min(80,Math.floor(Math.max(0,t-q.at('Mensen'))*30)); for(let i=0;i<n;i++){ const c=i%10, r=Math.floor(i/10); shark(1150+c*58,300+r*52,50,{t:t+i,dir:1,swim:false}); }
    metaText(ctx,'1 haai = 1 miljoen haaien',1440,740,C.text2,'center',20);
    alpha(ctx,ramp(t,q.at('80'),0.4),()=>text(ctx,'± 80 000 000',1440,820-10,fTitel(56),C.koraal,'center'));
    metaText(ctx,'meer dan twee per seconde',1440,850,C.grain,'center',22*clamp(ramp(t,q.at('twee'),0.4),0.01,1)); });
  pill(ctx,960,90,'wie is er eigenlijk gevaarlijk voor wie?',C.goud,ramp(t,q.at('gevaarlijk'),0.5),34);
},
// Samenvatting
s19(ctx,t,q){ sea({t}); const lit=[ramp(t,q.at('Ver'),0.3),ramp(t,q.at('zien'),0.3),ramp(t,q.at('zijlijn'),0.3),ramp(t,q.at('elektrisch'),0.3)];
  const step=lit.reduce((s,v)=>s+(v>0.5?1:0),0); const sx=lerp(1600,620,Math.max(0,step-1)/3);
  fishy(380,600,1.1,{t,spartel:0.6}); shark(sx,520,300,{t,dir:-1,zijlijn:lit[2],pores:lit[3],eye:lit[1]*(1-lit[2])});
  // de vier haltes met iconen
  const x0=380,x1=1540,y=200; ctx.save(); roundRect(ctx,260,90,1400,240,18); shape(ctx,rgba(C.bgSchema,0.92),C.line,1); ctx.restore();
  ctx.strokeStyle=rgba(C.line,0.6); ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(x0,y+60); ctx.lineTo(x1,y+60); ctx.stroke(); metaText(ctx,'ver weg',x0,y+100,C.text2,'center',20); metaText(ctx,'dichtbij',x1,y+100,C.text2,'center',20);
  const IC=[[['oor','neus'],'horen, ruiken',C.teal],[['oog'],'zien',C.goud],[['zijlijn'],'zijlijn',C.goud],[['elek'],'elektrisch zintuig',C.teal]];
  IC.forEach(([ks,naam,col],i)=>{ const x=lerp(x0,x1,i/3), a=lit[i]; alpha(ctx,0.25+0.75*a,()=>{ ks.forEach((k,j)=>icoon(k,x+(ks.length>1?(j-0.5)*56:0),y-10,1.2,a>0.5?col:C.text2,1)); text(ctx,naam,x,y+40,fTekst(28,600),a>0.5?C.text:C.text2,'center'); dot(ctx,x,y+60,7,a>0.5?col:rgba(C.line,0.8)); }); });
  pill(ctx,960,400,'de zintuigen lossen elkaar af',C.goud,fadeIO(t,q.at('lossen'),q.at('Eén'),0.4),30);
  alpha(ctx,fadeIO(t,q.at('Eén'),q.at('Maar'),0.4),()=>{ pill(ctx,960,400,'één druppel, kilometers ver: film',C.text,1,30); crossOut(ctx,960,400,40,ramp(t,q.at('film'),0.3)); });
  pill(ctx,960,400,'een zee zonder haaien: echt een probleem',C.groen,ramp(t,q.at('Maar'),0.5),30);
},
// Eindkaart
s20(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Onthoud',120,200,fTitel(80),C.text);
  const K=['De zintuigen van een haai lossen elkaar af.','Ver weg: horen en ruiken. Dichtbij: zien en de zijlijn.','Het laatste stukje vindt hij met zijn elektrisch zintuig.'];
  K.forEach((s,i)=>alpha(ctx,ramp(t,0.4+i*0.8,0.6),()=>{ const y=300+i*170; roundRect(ctx,120,y,1680,140,14); shape(ctx,rgba(C.bgSchema,0.95),i===0?C.goud:C.line,i===0?1.5:1); text(ctx,String(i+1),185,y+90,fTitel(60),C.goud,'center'); ctx.font=fTekst(38); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,s,260,y+84,1500,46); }));
  metaText(ctx,'biologie bij kamiel · stem: roos (elevenlabs) · versie 1.1 · oktober 2026',W/2,CAPTION_Y-10,C.text2,'center',22); },
};
// de baai (Macro-nacht, doorsnede: links ondiep, rechts diep)
function bayScene(t,o){ const A=o.in===undefined?1:o.in; sea({t,bodem:800,gras:false});
  ctx.save(); ctx.globalAlpha*=A;
  // ondiepe plaat links
  ctx.fillStyle=HK.bodem; ctx.beginPath(); ctx.moveTo(0,480); ctx.lineTo(900,480); ctx.quadraticCurveTo(1050,500,1120,800); ctx.lineTo(1140,H); ctx.lineTo(0,H); ctx.closePath(); ctx.fill(); ctx.strokeStyle=HK.bodemR; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(0,480); ctx.lineTo(900,480); ctx.quadraticCurveTo(1050,500,1120,800); ctx.stroke();
  grasVeld(40,880,480,(o.gras===undefined?1:o.gras),t,1,1); grasVeld(1200,1860,800,0.35,t,0.8,0.6);
  if(o.vissen>0.01){ for(let i=0;i<7;i++){ const g=o.gras===undefined?1:o.gras; fishy(120+i*110,452-8*Math.sin(t*2+i),0.35,{t:t+i,a:o.vissen*(g>0.4?0.85:0.9),dir:i%2?1:-1}); } }
  // grazers: diep (rechts) of overal
  const gi=o.grazersIn||0; zeekoe(lerp(1580,560,gi),lerp(720,420,gi),0.9,1,t,-1); schildpad(lerp(1790,300,gi),lerp(680,420,gi),0.9,1,t); zeekoe(lerp(1250,830,gi),lerp(745,430,gi),0.7,1,t+2,-1);
  // tijgerhaai in het ondiepe
  shark(520+260*Math.sin(t*0.35),360,330,{t,dir:Math.cos(t*0.35)>0?1:-1,strepen:true,body:HK.tijger,a:o.haai===undefined?1:o.haai});
  const L=o.labels||{}; naamBij(ctx,'ondiep','hier jagen tijgerhaaien',450,250,L.ondiep||0,'center',C.text); naamBij(ctx,'diep','hier grazen ze liever',1500,560,L.grazers||0,'center',C.text);
  naamBij(ctx,'zeegras','',300,540,L.zeegras||0,'center',C.groen);
  ctx.restore(); }
