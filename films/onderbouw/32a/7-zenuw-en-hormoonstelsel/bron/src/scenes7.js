// ===== Zenuw- en hormoonstelsel — scènes (kerndoelen onderbouw, film 7) =====
// Kleuren (Part C): zenuwsignaal teal, hormoon en hormoonklieren paars, spieren koraal, goud = focus.
// Lichaam: eigen schema (silhouet `human` + overlays), niet bodyOrgans: daar staat het zenuwstelsel paars.

// ---------- algemene hulpjes film 7 ----------
const LB={cx:960,yb:880,h:740}; const LU=LB.h/8, LT=LB.yb-LB.h; // lichaam: midden, voeten, lengte
const P7={ // ankerpunten in het lichaam (px)
  oor:[LB.cx+0.88*LU,LT+1.05*LU], brein:[LB.cx,LT+0.72*LU], hypo:[LB.cx,LT+1.12*LU], hals:[LB.cx,LT+1.95*LU],
  rugTop:[LB.cx,LT+1.6*LU], rugBot:[LB.cx,LT+5.35*LU], hart:[LB.cx-0.3*LU,LT+3.0*LU], long:[LB.cx,LT+2.95*LU],
  lever:[LB.cx-0.55*LU,LT+3.95*LU], alv:[LB.cx+0.3*LU,LT+4.35*LU], nierL:[LB.cx-0.62*LU,LT+4.55*LU], nierR:[LB.cx+0.62*LU,LT+4.55*LU],
  bijL:[LB.cx-0.62*LU,LT+4.22*LU], bijR:[LB.cx+0.62*LU,LT+4.22*LU], gesl:[LB.cx,LT+5.3*LU],
  beenL:[LB.cx-0.7*LU,LT+6.6*LU], beenR:[LB.cx+0.7*LU,LT+6.6*LU], voetL:[LB.cx-0.7*LU,LB.yb-12], voetR:[LB.cx+0.7*LU,LB.yb-12]
};
function lijf(a=1,sil=0.32){ alpha(ctx,a*sil,()=>human(ctx,LB.cx,LB.yb,LB.h,1,C.mens)); }
// zenuwnet: hersenen, ruggenmerg, zenuwen (neutraal), o.hl = lijst van onderdelen in goud
function zenuwnet(a=1,o={}){ if(a<=0.01) return; const hl=o.hl||[]; const G=k=>hl.includes(k);
  alpha(ctx,a,()=>{
    // zenuwen
    ctx.lineCap='round'; ctx.strokeStyle=rgba(C.line,0.9); ctx.lineWidth=2.5;
    const [rx,ry]=P7.rugBot, [tx,ty]=P7.rugTop;
    const zen=[[P7.oor,[LB.cx+0.45*LU,LT+0.9*LU]],[[tx,ty+0.7*LU],[LB.cx-1.25*LU,LT+4.2*LU]],[[tx,ty+0.7*LU],[LB.cx+1.25*LU,LT+4.2*LU]],[[rx,ry],P7.voetL],[[rx,ry],P7.voetR]];
    zen.forEach(([p,q],i)=>{ ctx.strokeStyle=(G('zenuw')||(i===0&&G('oorzenuw'))||(i>=3&&G('beenzenuw')))?C.goud:rgba(C.line,0.9); ctx.beginPath(); ctx.moveTo(p[0],p[1]); ctx.quadraticCurveTo((p[0]+q[0])/2+(i%2?14:-14),(p[1]+q[1])/2,q[0],q[1]); ctx.stroke(); });
    // ruggenmerg
    ctx.strokeStyle=G('rug')?C.goud:lighten(C.line,0.25); ctx.lineWidth=7; ctx.beginPath(); ctx.moveTo(tx,ty); ctx.lineTo(rx,ry); ctx.stroke();
    // hersenen
    ctx.beginPath(); ctx.ellipse(P7.brein[0],P7.brein[1],0.62*LU,0.4*LU,0,0,6.283); shape(ctx,rgba('#C9B8D6',0.55),G('brein')?C.goud:lighten(C.line,0.3),G('brein')?3:1.5);
    ctx.strokeStyle=rgba(C.bgSchema,0.5); ctx.lineWidth=1.5; for(let k=-2;k<=2;k++){ ctx.beginPath(); ctx.arc(P7.brein[0]+k*14,P7.brein[1]-4,10,0.2,2.8); ctx.stroke(); }
    // oor
    ctx.beginPath(); ctx.ellipse(P7.oor[0]+6,P7.oor[1],12,20,0,0,6.283); shape(ctx,rgba(C.mens,0.9),G('oor')?C.goud:C.line,G('oor')?3:1.5);
  }); }
function beenSpieren(a=1,kort=0){ if(a<=0.01) return; alpha(ctx,a,()=>{ [P7.beenL,P7.beenR].forEach(([x,y])=>{ const k=1-0.18*kort; ctx.beginPath(); ctx.ellipse(x,y-0.4*LU+0.4*LU*(1-k)*0.5,20,0.62*LU*k,0,0,6.283); shape(ctx,rgba(C.koraal,0.6),lighten(C.koraal,0.25),2); }); }); }
// puls: teal stip langs een pad (lijst punten), u = 0..1
function padPunt(pad,u){ const L=[]; let tot=0; for(let i=1;i<pad.length;i++){ const d=Math.hypot(pad[i][0]-pad[i-1][0],pad[i][1]-pad[i-1][1]); L.push(d); tot+=d; }
  let r=clamp(u,0,1)*tot; for(let i=0;i<L.length;i++){ if(r<=L[i]) { const f=L[i]?r/L[i]:0; return [lerp(pad[i][0],pad[i+1][0],f),lerp(pad[i][1],pad[i+1][1],f)]; } r-=L[i]; } return pad[pad.length-1]; }
function puls(pad,u,a=1,kleur=C.teal){ if(a<=0.01||u<=0||u>=1.02) return; const [x,y]=padPunt(pad,u); alpha(ctx,a,()=>{ ctx.strokeStyle=kleur; ctx.lineWidth=5; ctx.lineCap='round'; ctx.beginPath(); const [x0,y0]=padPunt(pad,Math.max(0,u-0.08)); ctx.moveTo(x0,y0); ctx.lineTo(x,y); ctx.stroke(); dot(ctx,x,y,11,kleur,lighten(kleur,0.4),2); }); }
const PAD_OOR_BREIN=[P7.oor,[LB.cx+0.45*LU,LT+0.9*LU],P7.brein];
const PAD_BREIN_BEEN=[P7.brein,P7.rugTop,P7.rugBot,[LB.cx-0.35*LU,LT+6.0*LU],P7.beenL];
const PAD_BREIN_BEEN2=[P7.brein,P7.rugTop,P7.rugBot,[LB.cx+0.35*LU,LT+6.0*LU],P7.beenR];
const PAD_BREIN_BIJ=[P7.brein,P7.rugTop,[LB.cx,LT+4.0*LU],P7.bijL];
// hormoonklieren
function klier(k,a=1,hl=false){ if(a<=0.01) return; alpha(ctx,a,()=>{ const st=hl?C.goud:lighten(C.paars,0.35), lw=hl?3:1.5;
  if(k==='bij'){ [P7.bijL,P7.bijR].forEach(([x,y])=>{ ctx.beginPath(); ctx.ellipse(x,y,20,11,0,Math.PI,0); ctx.closePath(); shape(ctx,C.paars,st,lw); }); }
  if(k==='hypo') dot(ctx,P7.hypo[0],P7.hypo[1],10,C.paars,st,lw);
  if(k==='schild'){ ctx.beginPath(); ctx.ellipse(P7.hals[0]-14,P7.hals[1],17,10,0.3,0,6.283); ctx.ellipse(P7.hals[0]+14,P7.hals[1],17,10,-0.3,0,6.283); shape(ctx,C.paars,st,lw); }
  if(k==='alv'){ ctx.beginPath(); ctx.ellipse(P7.alv[0],P7.alv[1],46,13,-0.15,0,6.283); shape(ctx,C.paars,st,lw); }
  if(k==='gesl'){ dot(ctx,P7.gesl[0]-34,P7.gesl[1],10,C.paars,st,lw); dot(ctx,P7.gesl[0]+34,P7.gesl[1],10,C.paars,st,lw); }
}); }
function nieren(a=1){ alpha(ctx,a,()=>{ kidney(P7.nierL[0],P7.nierL[1],1.2); kidney(P7.nierR[0],P7.nierR[1],1.2); }); }
function lever(a=1,hl=false){ if(a<=0.01) return; alpha(ctx,a,()=>{ const [x,y]=P7.lever; ctx.beginPath(); ctx.moveTo(x-70,y-24); ctx.quadraticCurveTo(x+10,y-46,x+70,y-20); ctx.quadraticCurveTo(x+10,y+30,x-60,y+22); ctx.closePath(); shape(ctx,'#8C4A3A',hl?C.goud:'#B06A58',hl?3:1.5); }); }
// adrenaline: paarse deeltjes van de bijnieren naar doelen door het hele lichaam (deterministisch)
const ADR_DOEL=[]; for(let i=0;i<46;i++){ const r=hash(i*3.7); let x,y; if(r<0.18){ x=LB.cx+(hash(i*1.3)-0.5)*0.9*LU; y=LT+(0.4+hash(i*2.9)*1.2)*LU; } else if(r<0.62){ x=LB.cx+(hash(i*1.3)-0.5)*2.2*LU; y=LT+(2.4+hash(i*2.9)*3.0)*LU; } else { const l=hash(i*5.1)<0.5?-1:1; x=LB.cx+l*0.7*LU+(hash(i*1.3)-0.5)*0.6*LU; y=LT+(5.6+hash(i*2.9)*2.2)*LU; } ADR_DOEL.push([x,y]); }
function adrenaline(u,a=1,n=46,verval=0){ if(a<=0.01) return; alpha(ctx,a*(1-0.75*verval),()=>{ for(let i=0;i<n;i++){ const src=i%2?P7.bijL:P7.bijR, d=ADR_DOEL[i]; const ui=ease(clamp(u*1.4-hash(i*7.7)*0.4,0,1)); if(ui<=0) continue; const w=wander(i,u*20,6,1); dot(ctx,lerp(src[0],d[0],ui)+w.x,lerp(src[1],d[1],ui)+w.y,6,C.paars,lighten(C.paars,0.4),1.2); } }); }
// bel met geluidsringen
function alarmBel(x,y,s,t,aan){ ctx.save(); ctx.translate(x,y); ctx.rotate(aan?Math.sin(t*28)*0.12:0); ctx.beginPath(); ctx.arc(0,0,34*s,Math.PI,0); ctx.lineTo(40*s,22*s); ctx.lineTo(-40*s,22*s); ctx.closePath(); shape(ctx,C.fill,C.text,2.5); dot(ctx,0,30*s,7*s,C.text); ctx.restore();
  if(aan) for(let k=0;k<3;k++){ const f=((t*1.6+k/3)%1); ctx.save(); ctx.globalAlpha*=(1-f); ctx.strokeStyle=C.teal; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(x,y,50*s+f*120*s,-0.8,0.8); ctx.stroke(); ctx.beginPath(); ctx.arc(x,y,50*s+f*120*s,Math.PI-0.8,Math.PI+0.8); ctx.stroke(); ctx.restore(); } }
// klaslokaal (Schema-achtergrond met bord, raam, tafel)
function klas(t){ bg(ctx,'schema'); ctx.fillStyle='#22324D'; ctx.fillRect(0,780,W,H-780); ctx.strokeStyle=rgba(C.line,0.5); ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(0,780); ctx.lineTo(W,780); ctx.stroke();
  roundRect(ctx,140,180,620,330,8); shape(ctx,'#2F4A3A',C.line,3); ctx.strokeStyle=rgba(C.text,0.45); ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(190,260); ctx.lineTo(420,260); ctx.moveTo(190,320); ctx.lineTo(560,320); ctx.moveTo(190,380); ctx.lineTo(380,380); ctx.stroke();
  windowView(1300,150,460,340,0.4,0); }
function tafel(x,y,w){ ctx.fillStyle='#6E5238'; ctx.fillRect(x-w/2+10,y+20,w-20,780-y-20); ctx.strokeStyle='#8C6A4A'; ctx.lineWidth=2; ctx.strokeRect(x-w/2+10,y+20,w-20,780-y-20); roundRect(ctx,x-w/2,y,w,24,6); shape(ctx,'#8C6A4A','#B08A5C',2); }
// schoolplein (Macro-dag)
function plein(){ ctx.fillStyle='#6E8CA8'; ctx.fillRect(0,0,W,H); ctx.fillStyle='#3E4A62'; ctx.fillRect(1100,220,820,520); ctx.fillStyle='#55627C'; for(let r=0;r<3;r++) for(let c=0;c<6;c++){ roundRect(ctx,1150+c*125,270+r*140,80,90,4); ctx.fill(); }
  roundRect(ctx,1460,610,110,130,4); shape(ctx,'#2A3A58',C.line,2); ctx.fillStyle='#8A8F96'; ctx.fillRect(0,740,W,H-740); ctx.strokeStyle=rgba('#FFFFFF',0.12); ctx.lineWidth=2; for(let x=0;x<W;x+=120){ ctx.beginPath(); ctx.moveTo(x,740); ctx.lineTo(x-60,H); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(0,820); ctx.lineTo(W,820); ctx.stroke();
  [[180,560,1],[420,600,0.8]].forEach(([x,y,s])=>{ ctx.fillStyle='#5A4636'; ctx.fillRect(x-8*s,y,16*s,180*s); ctx.beginPath(); ctx.arc(x,y,90*s,0,6.283); shape(ctx,'#5FA86E','#7FC48F',2); }); }
function hartPil(x,y,t,a=1,bpm=120){ if(a<=0.01) return; alpha(ctx,a,()=>{ roundRect(ctx,x-150,y-44,300,88,44); shape(ctx,rgba(C.bgMicro,0.85),C.koraal,2); heart(x-90,y,0.75,1,t*bpm/60*6.283); text(ctx,'bonk bonk',x+30,y+12,fTekst(32,600),C.text,'center'); }); }
function meta7(t){ metaText(ctx,'schematisch · niet op schaal',W-40,CAPTION_Y-14,C.text2,'right',22); }
// telefoon en luidspreker (H3)
function telefoon(x,y,s,a=1){ alpha(ctx,a,()=>{ roundRect(ctx,x-48*s,y-90*s,96*s,180*s,14*s); shape(ctx,C.fill,C.text,2.5); roundRect(ctx,x-36*s,y-50*s,72*s,30*s,10*s); shape(ctx,rgba(C.teal,0.35),C.teal,1.5); dot(ctx,x,y+72*s,6*s,C.line); }); }
function luidspreker(x,y,s,t,a=1){ alpha(ctx,a,()=>{ ctx.beginPath(); ctx.moveTo(x-40*s,y-24*s); ctx.lineTo(x-10*s,y-24*s); ctx.lineTo(x+30*s,y-60*s); ctx.lineTo(x+30*s,y+60*s); ctx.lineTo(x-10*s,y+24*s); ctx.lineTo(x-40*s,y+24*s); ctx.closePath(); shape(ctx,C.fill,C.text,2.5);
  for(let k=0;k<3;k++){ const f=((t*0.9+k/3)%1); ctx.save(); ctx.globalAlpha*=(1-f); ctx.strokeStyle=C.paars; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(x+30*s,y,(40+f*110)*s,-0.9,0.9); ctx.stroke(); ctx.restore(); } }); }
function voetbalveld(x,y,w,t,a=1){ if(a<=0.01) return; const h=w*0.6; alpha(ctx,a,()=>{ ctx.strokeStyle=C.line; ctx.lineWidth=2; ctx.strokeRect(x,y,w,h); ctx.beginPath(); ctx.moveTo(x+w/2,y); ctx.lineTo(x+w/2,y+h); ctx.stroke(); ctx.beginPath(); ctx.arc(x+w/2,y+h/2,h*0.18,0,6.283); ctx.stroke(); ctx.strokeRect(x,y+h*0.25,w*0.14,h*0.5); ctx.strokeRect(x+w*0.86,y+h*0.25,w*0.14,h*0.5);
  const u=(t%1.6)/1.0; if(u<=1){ dot(ctx,x+w*u,y+h/2,10,C.teal,lighten(C.teal,0.4),2); } metaText(ctx,'± 100 m in 1 seconde',x+w/2,y+h+40,C.teal,'center',24); }); }
// arm + pan (reflex-inzet)
function armPan(x,y,weg,t){ // weg 0..1: hand trekt terug
  ctx.fillStyle='#4A4F58'; ctx.fillRect(x-40,y+90,360,20); // fornuis
  ctx.beginPath(); ctx.ellipse(x+160,y+60,110,36,0,0,6.283); shape(ctx,'#3A3F48',C.line,2); ctx.fillStyle=C.koraal; ctx.fillRect(x+270,y+50,90,16); // pan + steel
  for(let k=0;k<3;k++){ const yy=y-((t*40+k*30)%90); ctx.strokeStyle=rgba(C.koraal,0.6); ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x+120+k*40,y+30); ctx.quadraticCurveTo(x+130+k*40,yy,x+120+k*40,yy-20); ctx.stroke(); }
  const hx=lerp(x+300,x+80,ease(weg)), hy=lerp(y+40,y-140,ease(weg)); ctx.strokeStyle='#D9A982'; ctx.lineWidth=34; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(-40,y-120); ctx.quadraticCurveTo(x-60,hy-10,hx,hy); ctx.stroke(); dot(ctx,hx+8,hy,24,'#D9A982'); return [hx,hy]; }

// ================= SCÈNES =================
const SCENES={
// ---- cold open: brandalarm in de klas, daarna het plein ----
s01(ctx,t,q){ const tB=q.at('buiten'), tAl=q.at('brandalarm'), tSp=q.at('springt');
  if(t<tB-0.3){ klas(t); const op=ramp(t,tSp,0.35);
    persoon(ctx,'sam',780,880-150*(1-op),440,{outfit:'school',uit:op>0.5?'verbaasd':'neutraal',kijk:1,t}); persoon(ctx,'noor',1100,880-150*(1-op),425,{outfit:'school',uit:op>0.5?'verbaasd':'denkt',kijk:-1,t});
    tafel(940,600,760); alarmBel(1000,110,1,t,t>tAl);
    pill(ctx,1000,250,'brandalarm!',C.teal,fadeIO(t,tAl,tB-0.6,0.3),32);
  } else { plein(); const s=t-tB;
    persoon(ctx,'sam',760,880,470,{outfit:'school',uit:'bezorgd',kijk:1,t}); persoon(ctx,'noor',980,880,450,{outfit:'school',uit:'praat',kijk:-1,t}); persoon(ctx,'lotte',540,880,455,{outfit:'school',uit:'verbaasd',kijk:1,t});
    hartPil(1500,140,t,ramp(t,q.at('bonkt'),0.4));
    alpha(ctx,ramp(t,q.at('Hoe'),0.5),()=>{ pill(ctx,760,150,'hoe wisten je benen en je hart het?',C.goud,1,40); }); }
},
// ---- titel ----
s02(ctx,t,q){ bg(ctx,'schema'); alpha(ctx,ramp(t,0.1,0.7),()=>{ text(ctx,'Zenuwen en hormonen',120,330,fTitel(104),C.text); text(ctx,'Hoe je organen met elkaar praten',120,410,fTekst(44),C.text2); });
  ctx.save(); ctx.translate(820,60); ctx.scale(0.88,0.88); lijf(ramp(t,0.4,1)); zenuwnet(ramp(t,0.6,1)); klier('hypo',ramp(t,1,1)); klier('schild',ramp(t,1,1)); klier('bij',ramp(t,1,1)); puls(PAD_BREIN_BEEN,(t*0.5)%1.3,ramp(t,1,1)); ctx.restore();
  metaText(ctx,'ONDERBOUW · KERNDOELEN · FILM 7',W-80,60,C.text2,'right',24); },
// ---- H1: zintuig, signaal, zenuw ----
s03(ctx,t,q){ bg(ctx,'schema'); const tZ=q.at('zintuigen'), tSig=q.at('signaal'), tZen=q.at('zenuw.',2), tW=q.at('Welke');
  lijf(1); zenuwnet(ramp(t,0.3,0.8),{hl:t>tZ&&t<tSig+1?['oor']:t>tZen?['oorzenuw']:[]});
  pill(ctx,420,200,'1  zenuwen',C.teal,fadeIO(t,0.4,q.at('begint'),0.4),34); pill(ctx,420,290,'2  hormonen',C.paars,fadeIO(t,0.4,q.at('begint'),0.4)*0.45,34);
  naamBij(ctx,'zintuig','het oor vangt geluid op',P7.oor[0]+40,P7.oor[1]+8,ramp(t,tZ,0.4),'left',C.goud);
  // vier soorten prikkels
  const tG=q.at('Geluid'); [['geluid',0],['licht',1],['warmte',2],['aanraking',3]].forEach(([s,i])=>pill(ctx,330,300+i*90,s,C.text,fadeIO(t,tG+i*0.35,tSig,0.3),30));
  // signaal: puls bij het oor, dan over de zenuw tot halverwege
  const pu=t<tZen?0.02+0.1*ramp(t,tSig,0.5):0.12+0.4*ramp(t,tZen,1.2); puls(PAD_OOR_BREIN,pu,ramp(t,tSig,0.3));
  naamBij(ctx,'elektrisch signaal','',1260,250,fadeIO(t,tSig,tZen+2,0.4),'left',C.teal);
  // zoomcirkel: doorsnede zenuw
  zoomCircle(ctx,1500,560,190,P7.oor[0]-40,P7.oor[1]+40,'doorsnede van een zenuw',ramp(t,q.at('bundel'),0.5),()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(1310,370,380,380); ctx.beginPath(); ctx.arc(1500,560,150,0,6.283); shape(ctx,rgba(C.grain,0.15),C.grain,4); for(let i=0;i<24;i++){ const an=hash(i*2.3)*6.283, d=Math.sqrt(hash(i*4.1))*120; dot(ctx,1500+Math.cos(an)*d,560+Math.sin(an)*d,13,rgba(C.teal,0.3),C.teal,1.5); } });
  naamBij(ctx,'zenuw','bundel draden van zenuwcellen',1500,330,ramp(t,q.at('bundel'),0.5),'center',C.goud);
  alpha(ctx,ramp(t,tW,0.4),()=>{ text(ctx,'?',P7.beenL[0]-170,P7.beenL[1],fTitel(90),C.goud,'center'); });
  meta7(t); },
// ---- H1: route via hersenen en ruggenmerg naar de beenspieren ----
s05(ctx,t,q){ bg(ctx,'schema'); const tH=q.at('hersenen'), tA=q.at('alarm'), tR=q.at('ruggenmerg'), tSp=q.at('spieren'), tK=q.at('korter'), tS=q.at('samen'), tSn=q.at('snel.'), tV=q.at('voetbalveld');
  const vS=1-ramp(t,tSn-0.2,0.5);
  alpha(ctx,vS,()=>{ lijf(1); const hl=t>tS?['brein','rug','zenuw','oor']:t>tR&&t<tSp?['rug']:t>tH&&t<tR?['brein']:[];
    zenuwnet(1,{hl}); beenSpieren(ramp(t,tSp,0.4),ramp(t,tK,0.4)*(1-ramp(t,tK+1.4,0.4)));
    puls(PAD_OOR_BREIN,ramp(t,0,1.1),1); pill(ctx,P7.brein[0],P7.brein[1]-120,'alarm!',C.goud,fadeIO(t,tA,tR,0.3),32);
    puls(PAD_BREIN_BEEN,ramp(t,tA+0.6,(tSp-tA)+0.6),1); puls(PAD_BREIN_BEEN2,ramp(t,tA+0.6,(tSp-tA)+0.6),1);
    naamBij(ctx,'hersenen','',P7.brein[0]+80,P7.brein[1]-50,fadeIO(t,tH,tS+3,0.4),'left',C.goud);
    naamBij(ctx,'ruggenmerg','',P7.rugTop[0]+60,LT+3.6*LU,ramp(t,tR,0.4)*vS,'left',C.goud);
    naamBij(ctx,'beenspieren','worden korter',P7.beenR[0]+60,P7.beenR[1],fadeIO(t,tSp,tS,0.4),'left',C.koraal);
    naamBij(ctx,'zenuwstelsel','zintuigen · zenuwen · ruggenmerg · hersenen',360,200,ramp(t,tS,0.5),'center',C.goud);
    naamBij(ctx,'spieren voeren uit','',1500,P7.beenR[1],ramp(t,q.at('uit.'),0.4),'center',C.koraal); });
  alpha(ctx,ramp(t,tSn,0.5),()=>{ text(ctx,'Zo snel gaat een zenuwsignaal',W/2,220,fTitel(64),C.text,'center'); voetbalveld(560,340,800,t-tSn,1); text(ctx,'tot wel 100 m per seconde',W/2,300,fTekst(40,600),C.teal,'center'); });
  meta7(t); },
// ---- H1 uitdaging: reflex ----
s06(ctx,t,q){ bg(ctx,'schema'); const tP=q.at('pan'), tR=q.at('ruggenmerg'), tT=q.at('terug'), tW=q.at('weg',2), tTe=q.at('Tegelijk'), tAu=q.at('au'), tRe=q.at('reflex');
  const weg=ramp(t,tW-0.25,0.35); const [hx,hy]=(()=>{ ctx.save(); const r=armPan(240,560,weg,t); ctx.restore(); return r; })();
  // ruggenmerg als verticale balk rechts, hersenen bovenaan
  const RX=1180; ctx.strokeStyle=lighten(C.line,0.25); ctx.lineWidth=8; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(RX,240); ctx.lineTo(RX,800); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(RX,170,120,74,0,0,6.283); shape(ctx,rgba('#C9B8D6',0.55),t>tAu?C.goud:lighten(C.line,0.3),t>tAu?3:1.5);
  naamBij(ctx,'hersenen','',RX+140,170,1,'left'); naamBij(ctx,'ruggenmerg','',RX+30,620,ramp(t,tR,0.4),'left',C.goud);
  const hand=[hx,hy], z1=[[hand[0],hand[1]],[800,560],[RX,560]], z2=[[RX,560],[820,520],[230,470]];
  ctx.strokeStyle=rgba(C.line,0.8); ctx.lineWidth=2.5; [z1,z2].forEach(p=>{ ctx.beginPath(); ctx.moveTo(p[0][0],p[0][1]); ctx.lineTo(p[1][0],p[1][1]); ctx.lineTo(p[2][0],p[2][1]); ctx.stroke(); });
  naamBij(ctx,'zintuigen in je huid','voelen de hitte',560,700,fadeIO(t,q.at('Zintuigen'),tT,0.4),'left',C.goud);
  puls(z1,ramp(t,q.at('signaal'),tR-q.at('signaal')+0.4),1);
  puls(z2,ramp(t,tT-0.2,tW-tT+0.2),1);
  naamBij(ctx,'armspier','trekt je hand weg',200,380,fadeIO(t,tW-0.2,tTe+1,0.4),'left',C.koraal);
  puls([[RX,560],[RX,250]],ramp(t,tTe,tAu-tTe+0.1),1);
  pill(ctx,RX,60,'au!',C.koraal,ramp(t,tAu,0.25),40);
  // tijdlijn klein: eerst hand weg, dan au
  alpha(ctx,ramp(t,tAu+0.6,0.5),()=>{ metaText(ctx,'1. hand weg  →  2. au!',1500,820,C.grain,'center',26); });
  naamBij(ctx,'reflex','snel, zonder nadenken',1500,420,ramp(t,tRe,0.4),'center',C.goud);
},
// ---- H2: het plein, seintje naar de bijnieren, adrenaline ----
s07(ctx,t,q){ const tTw=q.at('tweede'), tSe=q.at('seintje'), tKa=q.at('kapjes'), tHk=q.at('hormoonklieren'), tAd=q.at('adrenaline'), tHo=q.at('hormoon.',3), tWa=q.at('Waar');
  if(t<tTw-0.2){ plein(); persoon(ctx,'sam',760,880,470,{outfit:'school',uit:'bezorgd',kijk:1,t}); persoon(ctx,'lotte',540,880,455,{outfit:'school',uit:'neutraal',kijk:1,t}); hartPil(1500,140,t,1); pill(ctx,760,150,'het alarm is uit',C.text,ramp(t,q.at('uit.'),0.4),30); return; }
  bg(ctx,'schema'); lijf(1); zenuwnet(0.45); nieren(ramp(t,tKa-0.4,0.4)); heart(P7.hart[0],P7.hart[1],0.9,1,t*9);
  pill(ctx,420,200,'1  zenuwen',C.teal,0.4,34); pill(ctx,420,290,'2  hormonen',C.paars,ramp(t,tTw,0.4),34);
  puls(PAD_BREIN_BIJ,ramp(t,tSe,1.6),1); naamBij(ctx,'via een zenuw','',LB.cx+170,LT+3.3*LU,fadeIO(t,q.at('Via'),tKa,0.3),'left',C.teal);
  klier('bij',ramp(t,tKa,0.4),t>tKa&&t<tAd+1); naamBij(ctx,'bijnieren','op je nieren',P7.bijR[0]+50,P7.bijR[1]-10,ramp(t,tKa,0.4),'left',C.paars);
  naamBij(ctx,'hormoonklier','maakt een stof',300,520,fadeIO(t,tHk,tWa,0.4),'center',C.paars);
  adrenaline(0.12*ramp(t,tAd,1.5),ramp(t,tAd,0.4),46);
  naamBij(ctx,'adrenaline','',P7.bijL[0]-60,P7.bijL[1]+70,ramp(t,tAd,0.4),'right',C.paars);
  alpha(ctx,ramp(t,tHo,0.5),()=>{ roundRect(ctx,1300,420,520,190,14); shape(ctx,rgba(C.bgSchema,0.95),C.paars,1.5); text(ctx,'hormoon',1330,475,fTekst(40,700),C.paars); ctx.font=fTekst(30); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,'een stof die een hormoonklier aan je bloed afgeeft',1330,525,470,38); });
  alpha(ctx,ramp(t,tWa,0.4),()=>{ text(ctx,'?',P7.hart[0]-120,P7.hart[1]+20,fTitel(90),C.goud,'center'); });
  meta7(t); },
// ---- H2: overal; de schoolomroep; organen die het herkennen ----
s09(ctx,t,q){ const tOm=q.at('omroep'), tZo=q.at('Zo'), tHa=q.at('hart',1), tAd=q.at('ademt'), tLe=q.at('lever'), tMi=q.at('minuten');
  const inOmroep=t>tOm-0.2&&t<tZo-0.2;
  if(inOmroep){ bg(ctx,'schema'); ctx.fillStyle='#22324D'; ctx.fillRect(0,760,W,H-760); luidspreker(960,170,1,t,1);
    pill(ctx,960,330,'"Klas 1B naar de aula."',C.paars,ramp(t,q.at('aula'),0.3),36);
    const lp=ramp(t,q.at('lopen'),1.2);
    [['1A',360,['daan','yasmin']],['1B',960,['sam','noor']],['1C',1560,['bilal','lotte']]].forEach(([k,x,ids])=>{ const ik=k==='1B'; const a=ik||t<q.at('Alleen')?1:0.35;
      alpha(ctx,a,()=>{ ids.forEach((id,j)=>persoon(ctx,id,x-80+j*160+(ik?lp*260:0),780,340,{outfit:'school',kijk:ik?1:(j?-1:1),uit:ik&&lp>0?'blij':'neutraal',t})); metaText(ctx,'klas '+k,x+(ik?lp*260:0),820,ik?C.paars:C.text2,'center',26); }); });
    return; }
  bg(ctx,'schema'); lijf(1); zenuwnet(0.3); nieren(1); klier('bij',1);
  const u=0.12+0.88*ramp(t,0,2.2); const verval=t>tMi?ramp(t,tMi,3):0; adrenaline(u,1,46,verval);
  pill(ctx,1500,200,'± 1 minuut: bloed één keer rond',C.text,fadeIO(t,q.at('minuut'),tOm,0.4),28);
  const dimA=t>tZo?1:0; const hh=(a)=>alpha(ctx,a,()=>{});
  // organen die het herkennen
  alpha(ctx,t>tZo?1:0.5,()=>{ lungs(P7.long[0],P7.long[1]-10,1.1,t>tAd?1:0.35,t*3); heart(P7.hart[0],P7.hart[1],0.9,t>tHa&&t>tZo?1:0.35,t*(t>tHa&&t>tZo?14:7)); lever(t>tLe?1:0.35,t>tLe&&t<tMi); });
  naamBij(ctx,'hart','klopt sneller',P7.hart[0]-170,P7.hart[1]-20,ramp(t,tHa,0.4)*(t>tZo?1:0),'right',C.koraal);
  naamBij(ctx,'longen','dieper ademen',LB.cx+170,P7.long[1]-60,ramp(t,tAd,0.4),'left',C.teal);
  naamBij(ctx,'lever','geeft suiker af',P7.lever[0]-120,P7.lever[1]+50,ramp(t,tLe,0.4),'right',C.oker);
  // concentratiebalkje
  alpha(ctx,ramp(t,tMi,0.4),()=>{ metaText(ctx,'adrenaline in je bloed',1560,600,C.paars,'center',24); roundRect(ctx,1410,620,300,40,10); shape(ctx,rgba(C.bgMicro,0.8),C.line,1.5); const v=1-0.85*ramp(t,tMi+0.3,5); roundRect(ctx,1414,624,292*v,32,8); ctx.fillStyle=C.paars; ctx.fill(); metaText(ctx,'een paar minuten',1560,700,C.text2,'center',22); });
  meta7(t); },
// ---- H2: meer hormoonklieren ----
s10(ctx,t,q){ bg(ctx,'schema'); lijf(1,0.25);
  const K=[['hypo','hypofyse','onder andere groei',q.at('hypofyse'),[LB.cx+90,P7.hypo[1]-10],'left'],['schild','schildklier','hoe snel je lichaam werkt',q.at('schildklier'),[LB.cx+70,P7.hals[1]+10],'left'],['bij','bijnieren','adrenaline',0,[P7.bijR[0]+50,P7.bijR[1]],'left'],['alv','alvleesklier','suiker in je bloed',q.at('alvleesklier'),[P7.alv[0]-110,P7.alv[1]+60],'right'],['gesl','eierstokken of zaadballen','puberteit',q.at('eierstokken'),[LB.cx+70,P7.gesl[1]+40],'left']];
  nieren(0.6);
  K.forEach(([k,naam,taak,tk,[lx,ly],al])=>{ const a=k==='bij'?1:ramp(t,tk,0.4); klier(k,a,t>tk&&t<tk+2.5&&k!=='bij'); naamBij(ctx,naam,taak,lx,ly,a,al,C.paars); });
  pill(ctx,400,180,'namen hoef je niet te onthouden',C.text2,fadeIO(t,q.at('namen'),q.at('hypofyse')+1.5,0.4),28);
  const tL=q.at('lang'); alpha(ctx,ramp(t,tL,0.5),()=>{ roundRect(ctx,100,560,520,230,14); shape(ctx,rgba(C.bgSchema,0.95),C.paars,1.5); text(ctx,'hormonen regelen',130,610,fTekst(34,700),C.paars); ['groeien','de puberteit','energie voor een hele dag'].forEach((s,i)=>{ alpha(ctx,ramp(t,q.at(['Groeien','puberteit','energie'][i],i===1?2:1),0.4),()=>text(ctx,'· '+s,140,665+i*42,fTekst(32),C.text)); }); });
  meta7(t); },
// ---- H3: vergelijking app en omroep ----
s11(ctx,t,q){ bg(ctx,'schema'); const tAp=q.at('appje'), tOm=q.at('omroep'), tW=q.at('Welk');
  ctx.strokeStyle=C.line; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(160,700); ctx.lineTo(1760,700); ctx.stroke();
  alpha(ctx,ramp(t,0.1,0.5),()=>{ text(ctx,'zenuwstelsel',560,170,fTitel(56),C.teal,'center'); });
  alpha(ctx,ramp(t,tOm-0.3,0.5),()=>{ text(ctx,'hormoonstelsel',1360,170,fTitel(56),C.paars,'center'); });
  alpha(ctx,ramp(t,tAp,0.4),()=>{ telefoon(400,380,1.1,1); arrow(ctx,470,380,640,380,C.teal,5,18,ramp(t,tAp+0.5,0.4)); ctx.beginPath(); ctx.ellipse(700,380,26,70,0,0,6.283); shape(ctx,rgba(C.koraal,0.6),lighten(C.koraal,0.25),2); metaText(ctx,'één spier',700,490,C.text2,'center',22); });
  alpha(ctx,ramp(t,tOm,0.4),()=>{ luidspreker(1150,380,1,t,1); ctx.save(); ctx.globalAlpha*=0.5; human(ctx,1560,560,300,1,C.mens); ctx.restore(); for(let i=0;i<14;i++) dot(ctx,1530+hash(i*3.1)*60,300+hash(i*5.3)*240,6,C.paars); metaText(ctx,'het hele lichaam',1560,610,C.text2,'center',22); });
  const R=[['SNEL','LANGZAMER',q.at('Snel'),q.at('Langzamer')],['ÉÉN PLEK','OVERAL',q.at('plek'),q.at('overal')],['KORT','LANG',q.at('kort'),q.at('lang',2)]];
  R.forEach(([a,b,ta,tb],i)=>{ metaText(ctx,a,560,760+i*44,C.teal,'center',28); metaText(ctx,b,1360,760+i*44,C.paars,'center',28); ctx.save(); ctx.globalAlpha=0; ctx.restore(); });
  // rijen verschijnen op de woorden (overdekken met achtergrond tot het woord)
  R.forEach(([a,b,ta,tb],i)=>{ const y=760+i*44; ctx.save(); ctx.fillStyle=C.bgSchema; ctx.globalAlpha=1-ramp(t,ta,0.3); ctx.fillRect(360,y-32,400,42); ctx.globalAlpha=1-ramp(t,tb,0.3); ctx.fillRect(1160,y-32,400,42); ctx.restore(); });
  },
// ---- H3: groeien = hormoon; samenwerking; tijdlijn alarm ----
s13(ctx,t,q){ bg(ctx,'schema'); const tSa=q.at('samen'), tTe=q.at('Terug',2), tTw=q.at('Twee',2);
  if(t<tSa-0.3){ ctx.strokeStyle=C.line; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(160,700); ctx.lineTo(1760,700); ctx.stroke(); text(ctx,'zenuwen',560,200,fTitel(56),C.teal,'center'); text(ctx,'hormonen',1360,200,fTitel(56),C.paars,'center');
    const cards=[['groeien',1360,q.at('Groeien'),C.paars],['knipperen',560,q.at('Knipperen'),C.teal],['voet terugtrekken',560,q.at('terugtrekken'),C.teal]];
    cards.forEach(([s,x,tc,col],i)=>{ const u=ramp(t,tc,0.8); const y0=420, yy=lerp(y0,330+(i===2?160:i===1?20:80),u); const xx=lerp(960,x,u); pill(ctx,xx,yy,s,u>0.9?col:C.text,1,34); });
    return; }
  if(t<tTe-0.3){ // hersenen -> zenuwen en hypofyse -> klieren
    const a=ramp(t,tSa-0.3,0.4); alpha(ctx,a,()=>{ ctx.beginPath(); ctx.ellipse(960,220,170,100,0,0,6.283); shape(ctx,rgba('#C9B8D6',0.55),C.goud,2); text(ctx,'hersenen',960,232,fTekst(40,700),C.text,'center');
      arrow(ctx,860,310,560,500,C.teal,5,18,ramp(t,q.at('zenuwen'),0.4)); text(ctx,'zenuwen',520,560,fTekst(38,600),C.teal,'center');
      arrow(ctx,1060,310,1300,440,C.teal,5,18,ramp(t,q.at('hypofyse'),0.4)); dot(ctx,1340,470,22,C.paars,lighten(C.paars,0.4),2); alpha(ctx,ramp(t,q.at('hypofyse'),0.4),()=>text(ctx,'hypofyse',1340,540,fTekst(38,600),C.paars,'center'));
      [[1180,700],[1340,720],[1500,700]].forEach(([x,y],i)=>{ arrow(ctx,1340,560,x,y-30,C.paars,4,14,ramp(t,q.at('andere')+i*0.2,0.4)); dot(ctx,x,y,16,C.paars,lighten(C.paars,0.4),2); }); alpha(ctx,ramp(t,q.at('andere'),0.4),()=>metaText(ctx,'andere hormoonklieren',1340,790,C.text2,'center',24)); });
    return; }
  // tijdlijn
  const x0=220,x1=1700,y0=700; ctx.strokeStyle=C.line; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x1,y0); ctx.moveTo(x0,y0); ctx.lineTo(x0,300); ctx.stroke();
  metaText(ctx,'alarm',x0,y0+40,C.text2,'center',22); metaText(ctx,'1 s',x0+110,y0+40,C.text2,'center',22); metaText(ctx,'minuten',x0+900,y0+40,C.text2,'center',22);
  const u1=ramp(t,q.at('opspringen'),1.0), u2=ramp(t,q.at('adrenaline'),2.0);
  ctx.save(); ctx.beginPath(); ctx.rect(x0,250,(x1-x0)*Math.max(u1*0.1,u2),460); ctx.clip();
  ctx.strokeStyle=C.teal; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x0+20,340); ctx.lineTo(x0+60,y0); ctx.lineTo(x1,y0); ctx.stroke();
  if(u2>0){ ctx.strokeStyle=C.paars; ctx.beginPath(); ctx.moveTo(x0,y0); for(let i=0;i<=100;i++){ const x=x0+(x1-x0)*i/100, f=i/100; const y=y0-300*(1-Math.exp(-f*14))*Math.exp(-f*2.6); ctx.lineTo(x,y); } ctx.stroke(); }
  ctx.restore();
  naamBij(ctx,'zenuwen: opspringen','in minder dan een seconde',x0+80,330,u1,'left',C.teal);
  naamBij(ctx,'adrenaline: hart bonkt door','minutenlang',x0+520,420,u2,'left',C.paars);
  haak(ctx,x0+40,x1-40,y0+70,'twee orgaanstelsels, één reactie',C.groen,ramp(t,tTw,0.5));
},
// ---- samenvatting ----
s14(ctx,t,q){ bg(ctx,'schema'); const tZ=q.at('zenuwstelsel'), tH=q.at('hormoonstelsel'), tD=q.at('Dus');
  if(t<tD-0.3){ text(ctx,'Je organen praten op twee manieren',W/2,150,fTitel(60),C.text,'center');
    [[480,'zenuwstelsel',C.teal,tZ,['zintuig → zenuw → hersenen','→ ruggenmerg → spier','snel · kort · één plek']],[1440,'hormoonstelsel',C.paars,tH,['hormoonklier → bloed','→ organen die het herkennen','langzamer · overal · lang']]].forEach(([x,ttl,col,tt,rg])=>{ alpha(ctx,ramp(t,tt-0.2,0.5),()=>{ roundRect(ctx,x-380,220,760,420,16); shape(ctx,rgba(C.bgSchema,0.95),col,2); text(ctx,ttl,x,300,fTitel(52),col,'center'); rg.forEach((s,i)=>text(ctx,s,x,390+i*72,fTekst(i===2?40:36,i===2?700:400),i===2?col:C.text,'center')); }); });
    return; }
  lijf(1); zenuwnet(0.5); beenSpieren(1,0); klier('bij',1); heart(P7.hart[0],P7.hart[1],0.9,1,t*12); adrenaline(1,ramp(t,tD,0.4),30);
  puls(PAD_BREIN_BEEN,(t*0.6)%1.2,ramp(t,q.at('benen'),0.4));
  naamBij(ctx,'benen','via je zenuwen',P7.beenR[0]+60,P7.beenR[1],ramp(t,q.at('benen'),0.4),'left',C.teal);
  naamBij(ctx,'hart','via adrenaline in je bloed',P7.hart[0]-170,P7.hart[1],ramp(t,q.at('hart'),0.4),'right',C.paars);
},
// ---- eindkaart ----
s15(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Probeer het zelf',120,200,fTitel(80),C.text); metaText(ctx,'zenuwen en hormonen',120,260,C.grain,'left',26);
  const P=[['Liniaalproef','Laat een klasgenoot een liniaal vallen tussen je duim en vinger. Hoeveel cm valt hij voor je hem vangt? Welke weg neemt het bericht?'],['Zenuw of hormoon?','Sorteer: knipperen, groeien, puberteit, je hand van de kachel, trillen na een schrik, een bal vangen.'],['Rondleiding','Kijk nog eens Een rondleiding door je lichaam. Wijs de hormoonklieren en het zenuwstelsel aan.']];
  P.forEach((p,i)=>{ const x=120+i*575; alpha(ctx,ramp(t,0.6+i*0.6,0.6),()=>{ roundRect(ctx,x,330,535,300,14); shape(ctx,rgba(C.bgSchema,0.95),C.line,1); text(ctx,p[0],x+28,392,fTekst(38,600),C.goud); ctx.font=fTekst(30); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,p[1],x+28,445,480,40); }); });
  alpha(ctx,ramp(t,2.6,0.6),()=>{ ctx.font=fTekst(36,600); ctx.fillStyle=C.goud; ctx.textAlign='left'; wrap(ctx,'Je hart bonkt nog minuten na de schrik, je benen trillen al niet meer. Hoe kan dat?',120,720,1680,46); });
  metaText(ctx,'biologie bij kamiel · stem: roos (elevenlabs) · versie 1.0 · oktober 2026',W/2,CAPTION_Y-10,C.text2,'center',22); },
};
