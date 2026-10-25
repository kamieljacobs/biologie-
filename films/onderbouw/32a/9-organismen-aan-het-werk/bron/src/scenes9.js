// ===== Organismen aan het werk — scènes (kerndoelen onderbouw, film 9) =====
// Gist en bacteriën in teal/grijs (Part C: bacteriën en schimmels), celkern paars, suiker = oker zeshoek, zetmeel = ketting van zeshoeken,
// koolstofdioxide = drie grijze bolletjes (zelfde vormen als film 8). Koraal alleen voor warmte/energie.

function zeshoek(x,y,s=1,a=1,rot=Math.PI/6){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.beginPath(); for(let i=0;i<6;i++){ const an=rot+i*Math.PI/3; const px=x+Math.cos(an)*14*s, py=y+Math.sin(an)*14*s; i?ctx.lineTo(px,py):ctx.moveTo(px,py); } ctx.closePath(); shape(ctx,rgba(C.oker,0.45),lighten(C.oker,0.3),2); }); }
function koolzuur(x,y,s=1,a=1){ if(a<=0.01) return; alpha(ctx,a,()=>{ dot(ctx,x-15*s,y,8*s,'#C9CED8','#E6E9EE',1.2); dot(ctx,x+15*s,y,8*s,'#C9CED8','#E6E9EE',1.2); dot(ctx,x,y,9*s,'#6E7686','#9AA3B2',1.2); }); }
function gistcel(x,y,s=1,a=1,knop=0,dood=0){ if(a<=0.01) return; alpha(ctx,a*(1-0.65*dood),()=>{ ctx.beginPath(); ctx.ellipse(x,y,46*s,36*s,0.3,0,6.283); shape(ctx,dood?'#5A6270':rgba('#7FA9B8',0.55),dood?'#7A8290':'#A9CAD6',2);
  if(knop>0){ ctx.beginPath(); ctx.ellipse(x+44*s,y-22*s,18*s*knop,15*s*knop,0.3,0,6.283); shape(ctx,rgba('#7FA9B8',0.55),'#A9CAD6',2); }
  dot(ctx,x-10*s,y+4*s,12*s,C.kern,C.kernR,1.2); ctx.beginPath(); ctx.ellipse(x+14*s,y-6*s,13*s,10*s,0,0,6.283); shape(ctx,rgba(C.teal,0.25),lighten(C.teal,0.3),1); }); }
function bacterie(x,y,s=1,soort='staaf',a=1,rot=0,kleur=C.teal){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.rotate(rot); if(soort==='staaf'){ roundRect(ctx,-26*s,-10*s,52*s,20*s,10*s); } else { ctx.beginPath(); ctx.arc(-11*s,0,11*s,0,6.283); ctx.arc(11*s,0,11*s,0,6.283); } shape(ctx,rgba(kleur,0.45),lighten(kleur,0.35),1.8); ctx.restore(); }); }
function deegkom(x,y,rijs,t,a=1,doek=0){ alpha(ctx,a,()=>{ const r=1+rijs; ctx.beginPath(); ctx.ellipse(x,y-10,170,50*r+20,0,Math.PI,0); ctx.closePath(); shape(ctx,'#E8D9B0','#F2E6C8',2);
  for(let i=0;i<Math.floor(rijs*14);i++){ const bx=x-120+hash(i*3.3)*240, by=y-15-hash(i*5.7)*45*r; dot(ctx,bx,by,4+hash(i)*5,rgba(C.bgMicro,0.25)); }
  ctx.beginPath(); ctx.moveTo(x-200,y-20); ctx.lineTo(x+200,y-20); ctx.lineTo(x+150,y+90); ctx.lineTo(x-150,y+90); ctx.closePath(); shape(ctx,'#5A7FA8','#7FA0C8',2);
  if(doek>0.01) alpha(ctx,doek,()=>{ ctx.beginPath(); ctx.moveTo(x-215,y-20); ctx.quadraticCurveTo(x,y-90*r-30,x+215,y-20); ctx.lineTo(x+215,y+10); ctx.lineTo(x-215,y+10); ctx.closePath(); shape(ctx,'#D9DEE6','#F2F2EE',2); ctx.strokeStyle=rgba(C.koraal,0.5); ctx.lineWidth=3; for(let k=-2;k<=2;k++){ ctx.beginPath(); ctx.moveTo(x+k*70,y-40*r-10); ctx.lineTo(x+k*70,y+8); ctx.stroke(); } }); }); }
function thermometer(x,y,h,niveau,a=1){ alpha(ctx,a,()=>{ roundRect(ctx,x-14,y-h,28,h,14); shape(ctx,rgba(C.bgMicro,0.8),C.line,2); dot(ctx,x,y+14,24,C.koraal,lighten(C.koraal,0.3),2); roundRect(ctx,x-7,y-h*niveau,14,h*niveau+10,7); ctx.fillStyle=C.koraal; ctx.fill(); }); }
function yoghurtPot(x,y,s=1,a=1,dik=1,label='yoghurt'){ alpha(ctx,a,()=>{ ctx.beginPath(); ctx.moveTo(x-60*s,y-90*s); ctx.lineTo(x+60*s,y-90*s); ctx.lineTo(x+48*s,y+40*s); ctx.lineTo(x-48*s,y+40*s); ctx.closePath(); shape(ctx,'#F2F2EE','#C9CED8',2); ctx.fillStyle=rgba(C.teal,0.25); ctx.fillRect(x-58*s,y-40*s,116*s,26*s); text(ctx,label,x,y+6*s,fTekst(24*s,700),C.bgSchema,'center'); }); }
function melkpak(x,y,s=1,a=1){ alpha(ctx,a,()=>{ ctx.beginPath(); ctx.moveTo(x-45*s,y-80*s); ctx.lineTo(x,y-120*s); ctx.lineTo(x+45*s,y-80*s); ctx.lineTo(x+45*s,y+50*s); ctx.lineTo(x-45*s,y+50*s); ctx.closePath(); shape(ctx,'#F2F2EE','#9AA3B2',2); ctx.fillStyle=C.teal; ctx.fillRect(x-45*s,y-30*s,90*s,26*s); text(ctx,'melk',x,y+30*s,fTekst(24*s,700),C.bgSchema,'center'); }); }
function klok(x,y,r,t,a=1,txt=''){ alpha(ctx,a,()=>{ ctx.beginPath(); ctx.arc(x,y,r,0,6.283); shape(ctx,rgba(C.bgMicro,0.8),C.text,2); const an=t*1.5; ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+Math.cos(an)*r*0.75,y+Math.sin(an)*r*0.75); ctx.stroke(); if(txt) metaText(ctx,txt,x,y+r+34,C.grain,'center',22); }); }
// kas, paprika, bladluis, sluipwesp
function kas(){ ctx.fillStyle='#6E8CA8'; ctx.fillRect(0,0,W,H); ctx.fillStyle='#8E9AA0'; ctx.fillRect(0,780,W,H-780); ctx.strokeStyle=rgba('#F2F2EE',0.55); ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(0,140); for(let x=0;x<=W;x+=320){ ctx.lineTo(x+160,60); ctx.lineTo(x+320,140); } ctx.stroke(); for(let x=0;x<=W;x+=160){ ctx.beginPath(); ctx.moveTo(x,140); ctx.lineTo(x,780); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(0,460); ctx.lineTo(W,460); ctx.stroke(); }
function paprikaPlant(x,yg,s=1){ ctx.strokeStyle=G1; ctx.lineWidth=10*s; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x,yg); ctx.lineTo(x,yg-380*s); ctx.stroke(); for(let k=0;k<6;k++){ const d=k%2?1:-1, yy=yg-60*s-k*55*s; ctx.save(); ctx.translate(x,yy); ctx.rotate(d*0.5); ctx.beginPath(); ctx.ellipse(d*60*s,0,62*s,26*s,0,0,6.283); shape(ctx,G2,V1,1.5); ctx.restore(); }
  [[x-40*s,yg-150*s],[x+42*s,yg-240*s]].forEach(([px,py])=>{ roundRect(ctx,px-20*s,py-28*s,40*s,56*s,16*s); shape(ctx,'#D8743C','#F09A60',2); ctx.fillStyle=G1; ctx.fillRect(px-4*s,py-38*s,8*s,12*s); }); }
function bladluis(x,y,s=1,a=1,mummie=0){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.beginPath(); ctx.ellipse(x,y,12*s,8*s,0,0,6.283); shape(ctx,mummie?'#B08A5C':'#9CC86E','#C8E0A0',1.2); dot(ctx,x-11*s,y-3*s,3*s,mummie?'#8C6A4A':'#7FA858'); }); }
function sluipwesp(x,y,s=1,a=1,t=0){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.fillStyle='#3A3020'; ctx.beginPath(); ctx.ellipse(x,y,18*s,6*s,0,0,6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(x+20*s,y-2*s,8*s,5*s,0,0,6.283); ctx.fill(); dot(ctx,x+30*s,y-4*s,5*s,'#3A3020'); ctx.fillStyle=rgba('#F2F2EE',0.6); const fl=Math.sin(t*40)*0.3; ctx.beginPath(); ctx.ellipse(x+6*s,y-12*s,16*s,6*s,-0.4+fl,0,6.283); ctx.fill(); ctx.strokeStyle='#3A3020'; ctx.lineWidth=1.5*s; ctx.beginPath(); ctx.moveTo(x-18*s,y); ctx.lineTo(x-30*s,y+8*s); ctx.stroke(); }); }
// koe (zijaanzicht), kuilbaal, wei
function wei(){ ctx.fillStyle='#6E8CA8'; ctx.fillRect(0,0,W,H); ctx.fillStyle='#8EA8BF'; ctx.fillRect(0,420,W,120); ctx.fillStyle='#5F8A50'; ctx.fillRect(0,540,W,H-540); ctx.strokeStyle='#6E5238'; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(0,600); ctx.lineTo(W,600); ctx.stroke(); for(let x=40;x<W;x+=220){ ctx.beginPath(); ctx.moveTo(x,560); ctx.lineTo(x,660); ctx.stroke(); } }
function koe(x,y,s=1,a=1,t=0){ alpha(ctx,a,()=>{ ctx.fillStyle='#E9E4D6'; roundRect(ctx,x-170*s,y-150*s,340*s,150*s,60*s); ctx.fill(); ctx.fillStyle='#4A3A2C'; [[x-90*s,y-120*s,46,34],[x+40*s,y-60*s,60,40],[x+100*s,y-130*s,36,26]].forEach(([px,py,rx,ry])=>{ ctx.beginPath(); ctx.ellipse(px,py,rx*s,ry*s,0.3,0,6.283); ctx.fill(); });
  ctx.fillStyle='#E9E4D6'; [-130,-80,90,140].forEach(dx=>{ ctx.fillRect(x+dx*s,y-20*s,22*s,120*s); }); ctx.fillStyle='#4A3A2C'; [-130,-80,90,140].forEach(dx=>ctx.fillRect(x+dx*s,y+90*s,22*s,12*s));
  const hd=Math.sin(t*1.2)*6; ctx.fillStyle='#E9E4D6'; ctx.beginPath(); ctx.ellipse(x+200*s,y-80*s+hd,62*s,44*s,0.5,0,6.283); ctx.fill(); ctx.fillStyle='#D8A090'; ctx.beginPath(); ctx.ellipse(x+240*s,y-50*s+hd,24*s,20*s,0.5,0,6.283); ctx.fill(); dot(ctx,x+200*s,y-100*s+hd,4*s,'#2A2119'); ctx.fillStyle='#E9E4D6'; ctx.beginPath(); ctx.moveTo(x-170*s,y-120*s); ctx.lineTo(x-200*s,y-40*s); ctx.lineTo(x-190*s,y-40*s); ctx.closePath(); ctx.fill(); }); }
function kuilbaal(x,y,s=1){ ctx.beginPath(); ctx.ellipse(x,y,70*s,60*s,0,0,6.283); shape(ctx,'#E6E9EE','#9AA3B2',2); ctx.beginPath(); ctx.ellipse(x-30*s,y,28*s,58*s,0,0,6.283); shape(ctx,'#D8DCE4','#9AA3B2',1.5); }
function tank(x,y,w,h,t,a=1){ alpha(ctx,a,()=>{ roundRect(ctx,x-w/2,y-h,w,h,24); shape(ctx,rgba(C.teal,0.12),'#AFC0D0',2.5); for(let i=0;i<26;i++){ const w2=wander(i,t,8,1); bacterie(x-w/2+30+hash(i*3.1)*(w-60)+w2.x,y-h+30+hash(i*5.7)*(h-60)+w2.y,0.7,'staaf',1,hash(i)*3); } }); }
function insuline(x,y,s=1,a=1){ alpha(ctx,a,()=>{ roundRect(ctx,x-20*s,y-50*s,40*s,90*s,8*s); shape(ctx,rgba(C.paars,0.35),C.paars,2); ctx.fillStyle='#9AA3B2'; ctx.fillRect(x-14*s,y-62*s,28*s,14*s); }); }
function meta9(){ metaText(ctx,'schematisch · niet op schaal',W-40,CAPTION_Y-14,C.text2,'right',22); }

// ================= SCÈNES =================
// lichaam met dikke darm vol bacteriën (versie 1.1, 22 okt 2026: realistisch lichaam uit lib_anatomie.js i.p.v. het grijze poppetje)
function darmBewoners(t,g){ const o={cx:BODY.cx,yb:BODY.yb,h:BODY.h}; BODY.cx=270; BODY.yb=872; BODY.h=600; const HH=AHH();
  anFigure(0.5); anCavity(0.25); anDigest(0.35,t);
  // dikke darm licht op
  ctx.save(); ctx.globalAlpha*=0.4*g; ctx.filter='blur(6px)'; anLine(AN_DIK,C.teal,0.12*HH+14); ctx.restore();
  anTube(AN_DIK,0.12,ANA.dik,ANA.dikS,t,0.04);
  // bacteriën wemelen door de dikke darm
  const P=anDense(AN_DIK,60); for(let i=0;i<34;i++){ const u=(hash(i*3.3)+t*0.02*(0.5+hash(i)))%1; const [x,y]=anAlong(P,u); const w=wander(i,t,0.035*HH,1.2);
    bacterie(x+w.x,y+w.y,0.4,i%3?'staaf':'bol',g,hash(i)*6+t*0.6,i%4===0?C.groen:C.teal); }
  naamBij(ctx,'dikke darm','vol bacteriën',BODY.cx,BODY.yb-BODY.h-40,g,'center',C.teal);
  Object.assign(BODY,o); }
const SCENES={
// ---- cold open: pizzadeeg ----
s01(ctx,t,q){ kitchenBase(0.35,0); const tG=q.at('gist.'), tAf=q.at('dekt'), tU=q.at('uur.'), tNu=q.at('Nu',2), tW=q.at('Wat',2);
  persoon(ctx,'sam',460,COUNTER,470,{outfit:'school',pose:t<tAf?'wijs':'staan',uit:t>tNu?'verbaasd':'neutraal',kijk:1,t});
  const rijs=ramp(t,tNu-0.4,1.4); deegkom(820,COUNTER-80,rijs,t,1,ramp(t,tAf,0.5)*(1-ramp(t,tNu-0.6,0.4)));
  const it=[['bloem',q.at('Bloem')],['water',q.at('water')],['zout',q.at('zout')],['gist',tG]];
  it.forEach(([s,tt],i)=>pill(ctx,640+i*170,180,s,s==='gist'?C.goud:C.text,fadeIO(t,tt,tAf+0.3,0.3),30));
  pill(ctx,1460,640,'1 uur later',C.grain,fadeIO(t,tU,tW+2,0.4),28);
  pill(ctx,820,300,'twee keer zo groot!',C.goud,ramp(t,tNu+0.6,0.4),34); alpha(ctx,ramp(t,tW,0.4),()=>text(ctx,'?',1080,520,fTitel(110),C.goud,'center')); },
// ---- titel ----
s03(ctx,t,q){ bg(ctx,'schema'); alpha(ctx,ramp(t,0.1,0.7),()=>{ text(ctx,'Organismen aan het werk',120,330,fTitel(96),C.text); text(ctx,'Wat doen gist en bacteriën voor ons?',120,410,fTekst(44),C.text2); });
  gistcel(1380,640,3,ramp(t,0.5,0.6),ramp(t,1,1.5)); bacterie(1680,560,3,'staaf',ramp(t,0.8,0.6),0.4); bacterie(1660,760,3,'bol',ramp(t,1.0,0.6),-0.3);
  metaText(ctx,'ONDERBOUW · KERNDOELEN · FILM 9',W-80,60,C.text2,'right',24); },
// ---- H1: gistcellen in het deeg (Micro) ----
s04(ctx,t,q){ bg(ctx,'micro'); const tS=q.at('schimmel,'), tB=q.at('brood.'), tM=q.at('miljarden'), tZ=q.at('zetmeel'), tSu=q.at('suiker.'), tL=q.at('leeft'), tE=q.at('energie'), tG=q.at('gas:'), tBel=q.at('belletjes'), tR=q.at('rijst');
  // zetmeel-kettingen
  for(let k=0;k<3;k++){ const y0=220+k*220; for(let i=0;i<7;i++){ const los=ramp(t,tSu-0.4+k*0.2,1)*(i%2); zeshoek(200+i*52+los*(hash(i+k)*70-35),y0+los*(hash(i*2+k)*80-40),1.6,ramp(t,tZ,0.5)); } }
  naamBij(ctx,'zetmeel uit de bloem','',260,170,fadeIO(t,tZ,tSu+1.5,0.4),'left',C.oker);
  naamBij(ctx,'suiker','',380,820,ramp(t,tSu,0.4)*(1-ramp(t,tG,0.4)),'center',C.oker);
  // gistcellen
  const cel=[[900,430,2.6],[1280,260,1.8],[1340,640,2.0],[1020,770,1.4],[1660,450,1.8]];
  cel.forEach(([x,y,s],i)=>gistcel(x,y,s,ramp(t,0.2+i*0.15,0.5),i===0?ramp(t,tM,1.2):0));
  naamBij(ctx,'gistcel','één cel',900,590,ramp(t,0.6,0.4),'center',C.teal);
  inset(1640,170,120,fadeIO(t,tS,tM+0.5,0.4),()=>{ roundRect(ctx,1540,120,200,100,20); shape(ctx,'#C9B896','#E0D4B0',2); for(let i=0;i<8;i++) dot(ctx,1560+hash(i)*160,140+hash(i*3)*60,8+hash(i*5)*8,'#5F8A70'); });
  alpha(ctx,fadeIO(t,tS,tM+0.5,0.4),()=>metaText(ctx,'schimmel op oud brood',1640,330,C.grain,'center',22));
  // suiker naar de gistcel, CO2 eruit, belletjes
  const u=ramp(t,tL,1.2); for(let i=0;i<3;i++) zeshoek(lerp(480+i*40,860,u),lerp(450+i*20,430,u),1.6,ramp(t,tL,0.3)*(1-ramp(t,tE,0.3)));
  if(t>tE&&t<tE+0.8) alpha(ctx,1-(t-tE)/0.8,()=>{ ctx.strokeStyle=C.koraal; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(900,420,80+(t-tE)*60,0,6.283); ctx.stroke(); });
  for(let i=0;i<5;i++){ const v=ramp(t,tG+i*0.25,1.6); koolzuur(lerp(1000,1120+i*50,v),lerp(400,150+i*50,v),1.5,ramp(t,tG,0.3)); }
  naamBij(ctx,'koolstofdioxide','gas',1420,130,ramp(t,tG,0.4),'left',C.text);
  alpha(ctx,ramp(t,tBel,0.5),()=>{ [[700,260,40],[1450,780,55],[640,640,32],[1700,620,46]].forEach(([x,y,r])=>{ const g=1+0.4*ramp(t,tR,1.5); ctx.beginPath(); ctx.arc(x,y,r*g,0,6.283); ctx.strokeStyle=rgba('#E6E9EE',0.7); ctx.lineWidth=2.5; ctx.stroke(); koolzuur(x,y,0.8); }); });
  metaText(ctx,'vergroot · ± 1000×',60,CAPTION_Y-14,C.text2,'left',22); },
// ---- H1: koelkast, temperatuur, oven, biotechnologie ----
s05(ctx,t,q){ bg(ctx,'schema'); const tH=q.at('langzamer.'), tL=q.at('lauw'), tK=q.at('kou'), tHe=q.at('heet'), tO=q.at('oven'), tGa=q.at('gaatjes'), tA=q.at('alcohol'), tBi=q.at('biotechnologie'), tBr=q.at('Brood',3);
  if(t<tO-0.3){ text(ctx,'Hoe warm wil gist het hebben?',W/2,170,fTitel(56),C.text,'center');
    const Z=[['koelkast','traag',C.teal,480,0.25,ramp(t,tK,0.4)||ramp(t,0,0.4)],['lauw · ± 30 °C','actief',C.goud,960,0.5,ramp(t,tL,0.4)],['heet water','dood',C.koraal,1440,0.9,ramp(t,tHe,0.4)]];
    Z.forEach(([nm,st,col,x,niv,a],i)=>{ alpha(ctx,i===0?ramp(t,0.3,0.4):a,()=>{ thermometer(x-120,640,300,niv,1); gistcel(x+60,520,1.4,1,i===1?0.5+0.5*Math.sin(t*3):0,i===2?1:0); text(ctx,nm,x,760,fTekst(36,700),col,'center'); metaText(ctx,st,x,800,C.text2,'center',24); if(i===2) crossOut(ctx,x+60,520,40,1); }); });
    pill(ctx,480,300,'rijst veel langzamer',C.teal,fadeIO(t,tH,tL,0.3),28); return; }
  // oven, brood, biotechnologie
  const ov=1-ramp(t,tBi-0.4,0.5);
  alpha(ctx,ov,()=>{ roundRect(ctx,380,260,620,460,18); shape(ctx,'#3A3F48',C.line,3); roundRect(ctx,430,330,520,330,10); shape(ctx,rgba(C.koraal,0.18),C.koraal,2); ctx.beginPath(); ctx.ellipse(690,560,170,80,0,Math.PI,0); ctx.closePath(); shape(ctx,'#C9924A','#E0B070',2);
    for(let i=0;i<10;i++) dot(ctx,580+hash(i*2.2)*220,520+hash(i*4.4)*30,6+hash(i)*8*ramp(t,tO,1.5),rgba(C.bgMicro,0.35));
    alpha(ctx,ramp(t,tGa,0.4),()=>{ ctx.beginPath(); ctx.ellipse(1400,520,240,120,0,Math.PI,0); ctx.closePath(); shape(ctx,'#E8D9B0','#C9924A',6); for(let i=0;i<22;i++){ dot(ctx,1220+hash(i*3.1)*360,430+hash(i*5.3)*80,5+hash(i*7.7)*12,'#C9B080'); } metaText(ctx,'doorsnede: vol gaatjes',1400,580,C.grain,'center',24); });
    for(let k=0;k<3;k++){ const yy=320-((t*40+k*30)%90); alpha(ctx,ramp(t,tA,0.4),()=>{ ctx.strokeStyle=rgba('#E6E9EE',0.6); ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(640+k*50,260); ctx.quadraticCurveTo(650+k*50,yy,640+k*50,yy-30); ctx.stroke(); }); }
    alpha(ctx,ramp(t,tA,0.4),()=>metaText(ctx,'alcohol verdampt',690,230,C.grain,'center',22)); });
  alpha(ctx,ramp(t,tBi-0.4,0.5),()=>{ naamBij(ctx,'biotechnologie','een organisme voor je laten werken',W/2,300,1,'center',C.groen); gistcel(760,560,1.4,1,0.6); arrow(ctx,860,560,1040,560,C.line,4,16); ctx.beginPath(); ctx.ellipse(1180,600,140,70,0,Math.PI,0); ctx.closePath(); shape(ctx,'#C9924A','#E0B070',2); pill(ctx,W/2,760,'al duizenden jaren',C.grain,ramp(t,tBr,0.4),30); });
},
// ---- H2: yoghurt maken ----
s06(ctx,t,q){ bg(ctx,'schema'); const tM=q.at('melk.'), tS=q.at('schepje'), tW=q.at('warm.'), tMs=q.at('melksuiker'), tMz=q.at('melkzuur'), tMb=q.at('melkzuurbacteriën'), tDi=q.at('dik.'), tKa=q.at('kaas'), tIs=q.at('erg');
  ctx.strokeStyle=C.line; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(160,760); ctx.lineTo(1760,760); ctx.stroke();
  melkpak(320,700,1.3,ramp(t,tM-0.3,0.4)); arrow(ctx,430,640,560,640,C.line,3,14,ramp(t,tS,0.4));
  yoghurtPot(680,700,0.8,ramp(t,tS,0.4),1,'schepje'); arrow(ctx,780,640,900,640,C.line,3,14,ramp(t,tW,0.4));
  klok(1030,640,70,t,ramp(t,tW,0.4),'een paar uur, warm'); arrow(ctx,1130,640,1250,640,C.line,3,14,ramp(t,tDi,0.4));
  yoghurtPot(1380,700,1.3,ramp(t,tDi,0.4),1,'yoghurt');
  // zoomcirkel met bacteriën
  zoomCircle(ctx,1000,300,170,680,620,'in de melk',ramp(t,tMs-0.5,0.5),()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(820,120,360,360); const k=ramp(t,tDi,1.5);
    for(let i=0;i<10;i++){ const w=wander(i,t,10,0.8); bacterie(880+hash(i*2.1)*240+w.x,170+hash(i*3.7)*260+w.y,0.9,i%2?'staaf':'bol',1,hash(i)*3); }
    for(let i=0;i<8;i++){ const w=wander(i+30,t,14,0.6); const u=ramp(t,tMz+i*0.15,0.6); alpha(ctx,1-u,()=>{ dot(ctx,880+hash(i*7.1)*240+w.x-6,180+hash(i*8.3)*240+w.y,7,rgba(C.oker,0.6),C.oker,1.2); dot(ctx,880+hash(i*7.1)*240+w.x+6,180+hash(i*8.3)*240+w.y,7,rgba(C.oker,0.6),C.oker,1.2); }); alpha(ctx,u,()=>dot(ctx,880+hash(i*7.1)*240+w.x,180+hash(i*8.3)*240+w.y,6,'#C9CED8','#E6E9EE',1)); }
    if(k>0){ ctx.fillStyle=rgba('#F2F2EE',0.15*k); ctx.fillRect(820,120,360,360); } });
  naamBij(ctx,'melksuiker','',1200,180,fadeIO(t,tMs,tMb+1,0.4),'left',C.oker); naamBij(ctx,'melkzuur','',1200,240,fadeIO(t,tMz,tMb+1,0.4),'left',C.text);
  naamBij(ctx,'melkzuurbacteriën','',1200,200,ramp(t,tMb,0.4),'left',C.teal);
  alpha(ctx,ramp(t,tKa,0.4),()=>{ ctx.beginPath(); ctx.moveTo(1560,700); ctx.lineTo(1700,700); ctx.lineTo(1700,620); ctx.closePath(); shape(ctx,'#E8C060','#F0D890',2); metaText(ctx,'kaas · karnemelk',1630,740,C.grain,'center',22); });
  alpha(ctx,ramp(t,tIs,0.4),()=>text(ctx,'?',1500,420,fTitel(100),C.goud,'center')); },
// ---- H2: de meeste bacteriën zijn onschuldig ----
s08(ctx,t,q){ bg(ctx,'schema'); const tK=q.at('klein'), tO=q.at('onschuldig,'), tN=q.at('nuttig.'), tD=q.at('darm');
  const yA=1-ramp(t,tD-0.6,0.5); alpha(ctx,yA,()=>{ yoghurtPot(260,420,1.4,1,1,'yoghurt'); pill(ctx,260,230,'gemaakt door bacteriën',C.groen,ramp(t,0.3,0.4),26); });
  for(let r=0;r<6;r++) for(let c=0;c<9;c++){ const i=r*10+c, x=600+c*90, y=230+r*80, ziek=(i%17===3||i===41); const col=ziek&&t>tK?C.koraal:(t>tN&&i%3===0?C.groen:C.teal); bacterie(x,y,0.9,i%3?'staaf':'bol',ramp(t,0.2+i*0.01,0.3)*(ziek||t<tK?1:(t>tO?1:0.7)),hash(i)*2,col); }
  naamBij(ctx,'een klein deel maakt je ziek','',1500,240,ramp(t,tK,0.4),'left',C.koraal); naamBij(ctx,'de meeste: onschuldig of nuttig','',1500,420,ramp(t,tO,0.4),'left',C.groen);
  alpha(ctx,ramp(t,tD-0.4,0.5),()=>darmBewoners(t,ramp(t,tD+0.3,0.6)));
  meta9(); },
// ---- H3: kas met sluipwespen; de koe ----
s09(ctx,t,q){ const tK=q.at('koe');
  if(t<tK-0.3){ kas(); const tB=q.at('bladluizen.'), tS=q.at('sluipwespen'), tE=q.at('eitje'), tL=q.at('larve'), tBi=q.at('binnen'), tG=q.at('gif.'), tBb=q.at('bestrijding');
    [300,640,980].forEach(x=>paprikaPlant(x,780,1)); persoon(ctx,'henk',1420,800,440,{pose:t>tS?'vasthouden':'staan',uit:t>tG?'blij':'neutraal',kijk:-1,t,hold:(c,x,y)=>{ roundRect(c,x-30,y-20,60,40,6); shape(c,'#F2F2EE','#9AA3B2',2); }});
    const weg=ramp(t,tG-0.5,1.2);
    for(let i=0;i<14;i++){ const px=[300,640,980][i%3]+(hash(i*2.3)-0.5)*120, py=780-80-hash(i*4.1)*280; bladluis(px,py,1.2,ramp(t,tB,0.4)*(1-weg*(i%4?1:0)),i%4===0&&t>tBi?1:0); }
    naamBij(ctx,'bladluizen','zuigen sap uit de plant',640,240,fadeIO(t,tB,tS,0.4),'center',C.text);
    for(let i=0;i<5;i++){ const w=wander(i,t,60,0.6); sluipwesp(1300-i*160+w.x,360+hash(i)*120+w.y,1.4,ramp(t,tS+0.3,0.5),t); }
    inset(1560,260,150,fadeIO(t,tE-0.3,tG,0.4),()=>{ ctx.fillStyle='#6E8CA8'; ctx.fillRect(1410,110,300,300); sluipwesp(1520,220,2.6,1,t); bladluis(1610,300,3.2,1,ramp(t,tBi,0.6)); if(t>tE&&t<tL) dot(ctx,1600,295,7,'#F2F2EE'); if(t>tL) alpha(ctx,ramp(t,tL,0.4),()=>{ ctx.beginPath(); ctx.ellipse(1612,300,12,6,0.4,0,6.283); shape(ctx,'#F2F2EE','#C9CED8',1); metaText(ctx,'larve',1610,370,C.bgSchema,'center',20); }); });
    pill(ctx,960,880-60,'zonder gif',C.groen,ramp(t,tG,0.4),30); crossOut(ctx,1120,820-60,0,0);
    naamBij(ctx,'biologische bestrijding','',W/2,150,ramp(t,tBb,0.4),'center',C.groen); return; }
  wei(); koe(900,720,1.6,1,t); kuilbaal(1600,640,0.8); alpha(ctx,ramp(t,q.at('Wie'),0.4),()=>text(ctx,'?',1300,380,fTitel(110),C.goud,'center')); },
// ---- H3: de pens, kuilvoer ----
s11(ctx,t,q){ const tP=q.at('pens,'), tB=q.at('breken'), tL=q.at('leeft'), tV=q.at('verteert'), tK=q.at('kuilvoer,'), tBa=q.at('balen'), tY=q.at('yoghurt.');
  wei(); koe(620,760,1.3,1,t); kuilbaal(1500,660,0.9); kuilbaal(1660,690,0.9);
  zoomCircle(ctx,1180,320,190,640,620,'in de pens',ramp(t,tP-0.6,0.5)*(1-ramp(t,tK-0.6,0.5)),()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(990,130,380,380); for(let i=0;i<7;i++){ const br=ramp(t,tB+i*0.2,1.2); ctx.strokeStyle=rgba(C.groen,1-0.7*br); ctx.lineWidth=10; ctx.beginPath(); const y=180+i*45; ctx.moveTo(1040,y); ctx.lineTo(1040+260*(1-0.6*br),y+hash(i)*20); ctx.stroke(); } for(let i=0;i<14;i++){ const w=wander(i,t,8,1); bacterie(1030+hash(i*2.7)*300+w.x,170+hash(i*4.9)*300+w.y,0.8,i%2?'staaf':'bol',1,hash(i)*3); } });
  naamBij(ctx,'pens','grote voormaag',640,500,ramp(t,tP,0.4)*(1-ramp(t,tK-0.6,0.4)),'center',C.goud);
  alpha(ctx,ramp(t,tL,0.4)*(1-ramp(t,tK-0.6,0.4)),()=>{ arrow(ctx,1000,420,760,560,C.groen,4,16); metaText(ctx,'voedsel voor de koe',860,420,C.groen,'center',22); });
  zoomCircle(ctx,1300,300,170,1520,620,'in de kuilbaal',ramp(t,tBa,0.5),()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(1130,130,340,340); for(let i=0;i<6;i++){ ctx.strokeStyle=rgba(C.groen,0.7); ctx.lineWidth=8; ctx.beginPath(); ctx.moveTo(1170,180+i*45); ctx.lineTo(1430,190+i*45); ctx.stroke(); } for(let i=0;i<10;i++){ const w=wander(i+40,t,8,1); bacterie(1160+hash(i*3.3)*280+w.x,170+hash(i*6.1)*260+w.y,0.8,'staaf',1,hash(i)*3); } });
  naamBij(ctx,'kuilvoer','gras voor de winter',1560,540,ramp(t,tK,0.4),'center',C.text);
  alpha(ctx,ramp(t,tY,0.4),()=>{ yoghurtPot(1700,330,0.7,1,1,''); metaText(ctx,'net als yoghurt',1700,400,C.grain,'center',22); }); },
// ---- H3 uitdaging: insuline uit bacteriën ----
s12(ctx,t,q){ bg(ctx,'schema'); const tI=q.at('insuline'), tV=q.at('Vroeger'), tN=q.at('Nu'), tB=q.at('bouwtekening'), tM=q.at('menselijke'), tT=q.at('tanks,');
  insuline(260,360,1.6,ramp(t,tI,0.4)); naamBij(ctx,'insuline','hormoon · bij suikerziekte',260,500,ramp(t,tI,0.4),'center',C.paars);
  alpha(ctx,fadeIO(t,tV,tB,0.4),()=>{ ctx.strokeStyle=C.text2; ctx.lineWidth=3; ctx.beginPath(); ctx.ellipse(700,380,90,60,0,0,6.283); ctx.stroke(); dot(ctx,780,370,12,null); ctx.beginPath(); ctx.ellipse(800,380,28,22,0,0,6.283); ctx.stroke(); metaText(ctx,'vroeger: uit de alvleesklier van varkens en koeien',820,480,C.text2,'center',22); });
  crossOut(ctx,700,380,60,fadeIO(t,tN,tB,0.3));
  alpha(ctx,ramp(t,tB-0.6,0.4),()=>{ bacterie(900,360,4,'staaf',1,0); ctx.beginPath(); ctx.arc(860,360,40,0,6.283); ctx.strokeStyle=rgba(C.paars,0.6); ctx.lineWidth=3; ctx.stroke();
    const u=ramp(t,tB,1); ctx.strokeStyle=C.paars; ctx.lineWidth=6; ctx.beginPath(); const x0=lerp(700,930,u), y0=lerp(180,340,u); ctx.moveTo(x0,y0); ctx.quadraticCurveTo(x0+20,y0-15,x0+40,y0); ctx.quadraticCurveTo(x0+60,y0+15,x0+80,y0); ctx.stroke();
    naamBij(ctx,'stukje bouwtekening van een mens','het stukje voor insuline',900,180,1,'center',C.paars); });
  alpha(ctx,ramp(t,tM,0.4),()=>{ arrow(ctx,1020,360,1160,360,C.line,4,16); insuline(1220,370,1.1,1); });
  tank(1560,780,380,420,t,ramp(t,tT,0.5)); alpha(ctx,ramp(t,tT,0.5),()=>{ metaText(ctx,'miljarden tegelijk',1560,830,C.grain,'center',22); [1440,1520,1600,1680].forEach((x,i)=>insuline(x,280,0.8,ramp(t,tT+0.5+i*0.3,0.3))); });
},
// ---- samenvatting ----
s13(ctx,t,q){ bg(ctx,'schema'); const tP=q.at('pizzadeeg?');
  if(t<tP-0.4){ ctx.strokeStyle=C.line; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(160,640); ctx.lineTo(1760,640); ctx.stroke();
    const K=[['gist','brood',q.at('Gist')],['melkzuurbacteriën','yoghurt',q.at('Melkzuurbacteriën')],['sluipwespen','paprika zonder gif',q.at('Sluipwespen')],['bacteriën in de pens','gras verteerd',q.at('pens')]];
    K.forEach(([a,b,tt],i)=>{ const x=340+i*410; alpha(ctx,ramp(t,tt-0.2,0.4),()=>{ roundRect(ctx,x-180,200,360,400,16); shape(ctx,rgba(C.bgSchema,0.95),C.teal,1.5);
      if(i===0) gistcel(x,330,1.3,1,0.5); if(i===1) { bacterie(x-40,320,1.3,'staaf',1,0.3); bacterie(x+40,350,1.3,'bol',1,-0.2); } if(i===2) sluipwesp(x,330,2.2,1,t); if(i===3){ ctx.save(); ctx.translate(x,380); ctx.scale(0.5,0.5); koe(0,0,1,1,t); ctx.restore(); }
      text(ctx,a,x,470,fTekst(i===3?28:32,700),C.teal,'center'); text(ctx,'→ '+b,x,530,fTekst(28),C.text,'center'); }); });
    haak(ctx,200,1720,660,'biotechnologie: organismen voor ons laten werken',C.groen,ramp(t,q.at('biotechnologie.'),0.5)); return; }
  kitchenBase(0.35,0); deegkom(820,COUNTER-80,1,t,1,0); pill(ctx,820,300,'miljarden levende gistcellen',C.goud,ramp(t,q.at('Opgeblazen'),0.4),34); },
// ---- eindkaart ----
s14(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Onthoud',120,200,fTitel(80),C.text);
  const K=['Gist, bacteriën en sluipwespen werken voor de mens.','Organismen voor ons laten werken heet biotechnologie.','Deeg rijst doordat gistcellen gas maken.'];
  K.forEach((s,i)=>alpha(ctx,ramp(t,0.4+i*0.8,0.6),()=>{ const y=300+i*170; roundRect(ctx,120,y,1680,140,14); shape(ctx,rgba(C.bgSchema,0.95),i===0?C.goud:C.line,i===0?1.5:1); text(ctx,String(i+1),185,y+90,fTitel(60),C.goud,'center'); ctx.font=fTekst(38); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,s,260,y+84,1500,46); }));
  metaText(ctx,'biologie bij kamiel · stem: roos (elevenlabs) · versie 1.1 · oktober 2026',W/2,CAPTION_Y-10,C.text2,'center',22); },
};
