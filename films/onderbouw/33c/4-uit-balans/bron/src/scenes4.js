// ===== Uit balans — scènes (kerndoelen onderbouw, 33C film 4) =====
// Rode draad: één stuk bos (Macro-nacht), voor, tijdens en na een brand; Noor en Opa Henk komen er jaar na jaar kijken.
// Schema: grafiek muizen/uilen (dynamisch evenwicht), kringloop, verstoringen, tijdlijn van de successie, samenvatting.
// Kleuren: planten groen, brand en warmte koraal, as grijs, mineralen oker, water teal, focus goud.

function meta4(){ metaText(ctx,'schematisch · niet op schaal',W-40,CAPTION_Y-14,C.text2,'right',22); }
const GROND=760;
function lucht(){ ctx.fillStyle=C.bgMacroSky; ctx.fillRect(0,0,W,H); for(let i=0;i<25;i++) dot(ctx,hash(i*3.1)*W,30+hash(i*5.3)*220,1.2+hash(i)*1.2,rgba('#F2F2EE',0.35)); }
function heuvels(){ ctx.fillStyle=C.berg; ctx.beginPath(); ctx.moveTo(0,520); [[220,430],[480,500],[760,410],[1100,500],[1400,430],[1700,500],[1920,450],[1920,600],[0,600]].forEach(([x,y])=>ctx.lineTo(x,y)); ctx.closePath(); ctx.fill(); ctx.fillStyle=C.bgMacroHill; leafPath(treeLine(0,W,600,60,50,80,4)); ctx.fill(); }
function eik(x,y,s,a=1,zw=0){ if(a<=0.01||s<=0.02) return; alpha(ctx,a,()=>{ ctx.fillStyle=zw?'#2A2626':'#5A4232'; ctx.fillRect(x-14*s,y-240*s,28*s,240*s); if(zw){ ctx.strokeStyle='#2A2626'; ctx.lineWidth=8*s; ctx.beginPath(); ctx.moveTo(x,y-200*s); ctx.lineTo(x-60*s,y-280*s); ctx.moveTo(x,y-160*s); ctx.lineTo(x+70*s,y-240*s); ctx.stroke(); return; } [[0,-300,110],[-80,-250,80],[85,-255,85],[0,-220,90]].forEach(([dx,dy,r])=>{ ctx.beginPath(); ctx.arc(x+dx*s,y+dy*s,r*s,0,6.283); shape(ctx,'#3F6E4C','#5A8A66',1.5); }); }); }
function berk(x,y,s,a=1){ if(a<=0.01||s<=0.02) return; alpha(ctx,a,()=>{ ctx.fillStyle='#E6E1D3'; ctx.fillRect(x-7*s,y-200*s,14*s,200*s); ctx.fillStyle='#3A3A3A'; for(let k=0;k<5;k++) ctx.fillRect(x-7*s,y-40*s-k*34*s,8*s,4*s); ctx.beginPath(); ctx.ellipse(x,y-210*s,46*s,80*s,0,0,6.283); shape(ctx,'#7FB07C','#9ACB8E',1.5); }); }
function struik(x,y,s,a=1){ if(a<=0.01||s<=0.02) return; alpha(ctx,a,()=>{ [[-30,-30,40],[20,-40,46],[50,-20,32],[-10,-60,36]].forEach(([dx,dy,r])=>{ ctx.beginPath(); ctx.arc(x+dx*s,y+dy*s,r*s,0,6.283); shape(ctx,'#4F8A5E','#6FA87C',1.2); }); }); }
function gras(x,y,s,a=1,bloem=false){ if(a<=0.01||s<=0.02) return; alpha(ctx,a,()=>{ ctx.strokeStyle=G1; ctx.lineWidth=2.5; for(let k=-3;k<=3;k++){ ctx.beginPath(); ctx.moveTo(x+k*5,y); ctx.quadraticCurveTo(x+k*7,y-18*s,x+k*11,y-34*s); ctx.stroke(); } if(bloem) dot(ctx,x+2,y-46*s,6*s,'#C98AB8','#E0B0D4',1); }); }
// het stuk bos in een stadium: o = {stad: 0 (vlak na brand) .. 6 (oud bos), brand: 0..1, as: 0..1}
function stukBos(t,o={}){ lucht(); heuvels(); const st=o.stad==null?6:o.stad, br=o.brand||0;
  ctx.fillStyle=br>0.5||st<1?'#3A3430':C.bgMacroFront; ctx.fillRect(0,GROND,W,H-GROND);
  if(st<1.2){ ctx.fillStyle=rgba('#7A7470',0.7*(1-clamp(st,0,1))); for(let i=0;i<40;i++) ctx.fillRect(hash(i*2.2)*W,GROND+hash(i*3.3)*120,30+hash(i)*60,4); }
  const X=[160,420,700,980,1260,1540,1800];
  // oud bos (eik/beuk) groeit in stadium 4..6; tijdens brand: zwarte stammen
  X.forEach((x,i)=>{ const s=(0.85+0.3*hash(i*5))*(i%2?1:0.9);
    if(st>=6&&br>0){ eik(x,GROND,s,1-ramp(br,0.25,0.4)); eik(x,GROND,s,ramp(br,0.25,0.4),1); return; }
    if(st<1&&o.stammen){ eik(x,GROND,s,0.9,1); return; }
    const ek=clamp((st-3.6)/2.4,0,1); eik(x,GROND,s*ek,ek>0?1:0);
    const bk=clamp((st-2.4)/1.2,0,1)*(1-clamp((st-4.6)/1.2,0,1)); berk(x+70,GROND,(0.7+0.4*hash(i))*clamp((st-2.2)/1.4,0.05,1),bk);
    const sk=clamp((st-1.6)/1,0,1)*(1-clamp((st-4.4)/1.4,0,0.8)); struik(x-60,GROND,0.9*sk+0.1,sk);
  });
  const gr=clamp((st-0.6)/0.8,0,1)*(1-clamp((st-2.6)/1.2,0,1)); for(let i=0;i<34;i++) gras(40+i*56+hash(i)*20,GROND+6+hash(i*4)*40,0.6+0.8*gr,gr,i%4===0);
  if(br>0) vlammen(t,br);
}
function vlammen(t,br){ const n=14; for(let i=0;i<n;i++){ const x=80+i*135+hash(i)*40, h=(120+hash(i*3)*160)*Math.min(1,br*1.6), w=60+hash(i*7)*30; const fl=Math.sin(t*9+i*1.7)*0.15+1;
  ctx.beginPath(); ctx.moveTo(x-w/2,GROND); ctx.quadraticCurveTo(x-w*0.45,GROND-h*0.5*fl,x,GROND-h*fl); ctx.quadraticCurveTo(x+w*0.45,GROND-h*0.5*fl,x+w/2,GROND); ctx.closePath(); shape(ctx,rgba(C.koraal,0.85),lighten(C.koraal,0.3),1.5);
  ctx.beginPath(); ctx.moveTo(x-w/4,GROND); ctx.quadraticCurveTo(x-w*0.2,GROND-h*0.3*fl,x,GROND-h*0.55*fl); ctx.quadraticCurveTo(x+w*0.2,GROND-h*0.3*fl,x+w/4,GROND); ctx.closePath(); ctx.fillStyle=rgba(C.goud,0.85); ctx.fill(); }
  ctx.fillStyle=rgba('#4A4A50',0.35*Math.min(1,br*2)); for(let k=0;k<6;k++){ ctx.beginPath(); ctx.ellipse(300+k*280+Math.sin(t*0.5+k)*30,260-k%2*60-((t*20)%40),160,50,0,0,6.283); ctx.fill(); } }
function jaarTeller(x,y,s,a=1){ if(a<=0.01) return; alpha(ctx,a,()=>{ roundRect(ctx,x-150,y-40,300,72,14); shape(ctx,rgba(C.bgMicro,0.85),C.goud,1.5); text(ctx,s,x,y+10,fTekst(36,700),C.goud,'center'); }); }
function muis4(x,y,s=1,a=1){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.beginPath(); ctx.ellipse(x,y,18*s,10*s,0,0,6.283); shape(ctx,'#9A8A78','#BCAE9C',1); dot(ctx,x+12*s,y-6*s,5*s,'#9A8A78'); dot(ctx,x+19*s,y-2*s,2*s,'#2A2119'); }); }
function uil4(x,y,s=1,a=1){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.beginPath(); ctx.ellipse(x,y,22*s,30*s,0,0,6.283); shape(ctx,'#A0845C','#C0A47C',1.2); dot(ctx,x-7*s,y-12*s,3*s,'#2A2119'); dot(ctx,x+7*s,y-12*s,3*s,'#2A2119'); }); }
function eikel(x,y,s=1){ ctx.beginPath(); ctx.ellipse(x,y+6*s,8*s,11*s,0,0,6.283); shape(ctx,'#B08A5C','#D0AA7C',1); ctx.beginPath(); ctx.ellipse(x,y-3*s,10*s,5*s,0,Math.PI,0); shape(ctx,'#8C6A4A','#B08A5C',1); }
function kegel(x,y,s,open,a=1){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); for(let r=0;r<6;r++) for(let k=-1;k<=1;k+=2){ const yy=-80+r*28, w=26+r*4; ctx.save(); ctx.translate(k*(4+open*14),yy); ctx.rotate(k*(0.25+open*0.9)); ctx.beginPath(); ctx.ellipse(k*w*0.5,0,w*0.55,12,0,0,6.283); shape(ctx,'#8C6A4A','#B08A5C',1.2); ctx.restore(); }
  if(open<0.3){ ctx.strokeStyle=rgba('#E8D9B0',0.8*(1-open*3)); ctx.lineWidth=3; for(let r=0;r<5;r++){ ctx.beginPath(); ctx.moveTo(-20,-66+r*28); ctx.lineTo(20,-66+r*28); ctx.stroke(); } }
  ctx.restore(); }); }

// ================= SCÈNES =================
const SCENES={
// ---- cold open: na de brand ----
s01(ctx,t,q){ const tZ=q.at('zwart.'), tN=q.at('Noor'), tK=q.at('Komt');
  const br=ramp(t,0,2.6); const na=ramp(t,tZ-0.8,0.8);
  if(na<1) stukBos(t,{stad:6,brand:br*(1-na)}); if(na>0) alpha(ctx,na,()=>stukBos(t,{stad:0,stammen:true}));
  persoon(ctx,'noor',760,880,300,{outfit:'winter',pose:'staan',uit:t>tK?'denkt':'bezorgd',kijk:1,t,a:ramp(t,tN,0.5)});
  persoon(ctx,'henk',560,880,320,{pose:'staan',uit:'bezorgd',kijk:1,t,a:ramp(t,tN+0.3,0.5)});
  alpha(ctx,ramp(t,tK,0.4),()=>text(ctx,'?',1300,380,fTitel(110),C.goud,'center')); },
// ---- titel ----
s03(ctx,t,q){ bg(ctx,'schema'); alpha(ctx,ramp(t,0.1,0.7),()=>{ text(ctx,'Uit balans',120,330,fTitel(96),C.text); text(ctx,'Hoe herstelt een bos na een brand?',120,410,fTekst(44),C.text2); });
  ctx.save(); ctx.beginPath(); roundRect(ctx,1080,480,720,330,18); ctx.clip(); ctx.translate(1080,480); ctx.scale(0.375,0.375); ctx.translate(0,-200); stukBos(t,{stad:ramp(t,0.4,3.2)*6}); ctx.restore(); roundRect(ctx,1080,480,720,330,18); ctx.strokeStyle=C.line; ctx.lineWidth=1.5; ctx.stroke();
  metaText(ctx,'onderbouw · kerndoelen · ecosystemen 4',W-80,60,C.text2,'right',24); },
// ---- H1: bos in evenwicht, mastjaar ----
s04(ctx,t,q){ const tM=q.at('Maar'), tE=q.at('eikels'), tMu=q.at('muizen.'), tU=q.at('uilen'), tWa=q.at('Wat');
  stukBos(t,{stad:6}); jaarTeller(1640,120,'vóór de brand',ramp(t,tM,0.4));
  if(t<tM) { pill(ctx,W/2,220,'ja, vanzelf, maar het duurt lang',C.groen,ramp(t,0.3,0.4),32); return; }
  for(let i=0;i<24;i++) eikel(100+hash(i*3)*1720,GROND+20+hash(i*5)*90,1.3*ramp(t,tE+hash(i)*0.6,0.4));
  for(let i=0;i<14;i++){ const w=wander(i,t,30,0.6); muis4(120+hash(i*7.7)*1680+w.x,GROND+50+hash(i*2.9)*80,1.3,ramp(t,tMu+hash(i)*0.8,0.4)); }
  [[300,360],[1150,330],[1650,380]].forEach(([x,y],i)=>uil4(x,y,1.3,ramp(t,tU+i*0.3,0.4)));
  alpha(ctx,ramp(t,tWa,0.4),()=>text(ctx,'?',W/2,260,fTitel(110),C.goud,'center')); },
// ---- H1: dynamisch evenwicht + kringloop ----
s06(ctx,t,q){ const tU=q.at('uilen'), tMi=q.at('minder',2), tO=q.at('neer,'), tD=q.at('dynamisch',1), tB=q.at('beweegt'), tS=q.at('stoffen'), tK=q.at('kringloop');
  bg(ctx,'schema');
  if(t<tS-0.3){ // grafiek: muizen en uilen over 12 jaar
    const gx=240, gy=760, gw=1440, gh=440; ctx.strokeStyle=C.line; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(gx,gy-gh); ctx.lineTo(gx,gy); ctx.lineTo(gx+gw,gy); ctx.stroke();
    metaText(ctx,'jaren',gx+gw,gy+44,C.text2,'right',24); metaText(ctx,'aantal',gx,gy-gh-20,C.text2,'left',24);
    const M=[0.45,0.8,0.4,0.5,0.6,0.85,0.42,0.5,0.55,0.78,0.4,0.52], U=[0.25,0.3,0.42,0.28,0.27,0.33,0.44,0.3,0.28,0.32,0.43,0.3];
    const prog=ramp(t,0.2,Math.max(1,tO-0.2)); const lijn=(arr,kl,lw)=>{ ctx.strokeStyle=kl; ctx.lineWidth=lw; ctx.beginPath(); const n=Math.max(2,Math.floor(prog*arr.length)); for(let i=0;i<n;i++){ const x=gx+40+i*(gw-80)/(arr.length-1), y=gy-arr[i]*gh; i?ctx.lineTo(x,y):ctx.moveTo(x,y);} ctx.stroke(); };
    alpha(ctx,ramp(t,tD-0.2,0.5),()=>{ ctx.fillStyle=rgba(C.goud,0.12); ctx.fillRect(gx+10,gy-0.7*gh,gw-20,0.32*gh); metaText(ctx,'evenwicht',gx+30,gy-0.72*gh-12,C.goud,'left',24); });
    lijn(M,C.oker,4); alpha(ctx,ramp(t,tU,0.4),()=>lijn(U,C.text2,3));
    naamBij(ctx,'muizen','',gx+gw+10,gy-0.6*gh,1,'left',C.oker); naamBij(ctx,'uilen','',gx+gw+10,gy-0.3*gh,ramp(t,tU,0.4),'left',C.text2);
    alpha(ctx,ramp(t,tMi,0.4)*(1-ramp(t,tO,0.4)),()=>{ ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(gx+40+2*(gw-80)/11,gy-0.4*gh,30,0,6.283); ctx.stroke(); });
    naamBij(ctx,'dynamisch evenwicht','het beweegt steeds',W/2,180,ramp(t,tD,0.4),'center',C.goud); return; }
  // kringloop klein
  const P=[['bladeren vallen',C.groen,-90],['reducenten',C.teal,30],['mineralen → bomen',C.oker,150]]; const cx=W/2, cy=470, R=230;
  P.forEach(([nm,kl,ang],i)=>{ const a=ang*Math.PI/180; const x=cx+Math.cos(a)*R*1.5, y=cy+Math.sin(a)*R; alpha(ctx,ramp(t,tS+i*0.6,0.4),()=>{ roundRect(ctx,x-170,y-44,340,88,16); shape(ctx,rgba(C.bgSchema,0.95),kl,2); text(ctx,nm,x,y+12,fTekst(34,600),C.text,'center'); });
    const b=P[(i+1)%3][2]*Math.PI/180; const x2=cx+Math.cos(b)*R*1.5, y2=cy+Math.sin(b)*R; const an=Math.atan2(y2-y,x2-x); arrow(ctx,x+Math.cos(an)*190,y+Math.sin(an)*60,x2-Math.cos(an)*190,y2-Math.sin(an)*60,C.line,3,14,ramp(t,tS+i*0.6+0.4,0.5)); });
  alpha(ctx,ramp(t,tK,0.4),()=>{ text(ctx,'kringloop',cx,cy+14,fTitel(60),C.goud,'center'); metaText(ctx,'zie: wie eet wie',cx,cy+60,C.grain,'center',22); }); meta4(); },
// ---- H2: de brand, verstoring, as en regen ----
s07(ctx,t,q){ const tBr=q.at('brand.'), tV=q.at('verstoring.'), tD=q.at('Dieren'), tAs=q.at('as.'), tK=q.at('kringloop'), tMi=q.at('mineralen.'), tW=q.at('wortels'), tR=q.at('regenbui'), tVs=q.at('Verstoringen');
  if(t<tVs-0.3){ const br=ramp(t,tBr-0.3,1.5)*(1-ramp(t,tAs,1.2));
    if(t<tAs+0.6) stukBos(t,{stad:6,brand:Math.max(br,0.01)}); else stukBos(t,{stad:0,stammen:true});
    naamBij(ctx,'verstoring','groot en plotseling',W/2,170,fadeIO(t,tV,tK,0.4),'center',C.koraal);
    alpha(ctx,fadeIO(t,tD,tAs,0.3),()=>{ for(let i=0;i<5;i++){ const u=(t-tD)*0.4; const x=200+i*90+u*900; muis4(x,GROND+70+(i%2)*20,1.4,1); } });
    // mineralen in de as, regen spoelt weg
    alpha(ctx,ramp(t,tMi,0.4),()=>{ for(let i=0;i<30;i++){ const sp=ramp(t,tR+0.2+hash(i)*0.6,1.5); const x=60+hash(i*2.2)*1800+sp*(80+hash(i)*120), y=GROND+30+hash(i*4.4)*80+sp*80; dot(ctx,x,y,6,C.oker,lighten(C.oker,0.3),1); } naamBij(ctx,'mineralen in de as','',W/2,170,1-ramp(t,tR-0.5,0.4),'center',C.oker); });
    alpha(ctx,ramp(t,tW,0.4)*(1-ramp(t,tR,0.4)),()=>{ pill(ctx,W/2,250,'geen wortels meer',C.text,1,32); });
    alpha(ctx,ramp(t,tR,0.4),()=>{ ctx.strokeStyle=rgba(C.teal,0.7); ctx.lineWidth=2; for(let i=0;i<70;i++){ const x=hash(i*1.7)*W, y=((t*700+hash(i)*900)%700)+40; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x-8,y+28); ctx.stroke(); } pill(ctx,W/2,250,'regen spoelt een deel weg',C.teal,1,32); });
    return; }
  bg(ctx,'schema'); text(ctx,'Verstoringen',W/2,170,fTitel(60),C.text,'center');
  const K=[['brand',C.koraal],['storm',C.text2],['overstroming',C.teal],['kappen',C.oker]]; const tt=[tVs,q.at('storm'),q.at('overstroming,'),q.at('kappen.')];
  K.forEach(([nm,kl],i)=>{ const x=300+i*440; alpha(ctx,ramp(t,tt[i],0.4),()=>{ roundRect(ctx,x-180,280,360,380,18); shape(ctx,rgba(C.bgSchema,0.95),kl,2); text(ctx,nm,x,620,fTekst(38,700),kl,'center');
    if(i===0){ ctx.save(); ctx.translate(x,520); for(let k=-1;k<=1;k++){ ctx.beginPath(); ctx.moveTo(k*50-30,0); ctx.quadraticCurveTo(k*50-26,-60,k*50,-120+Math.abs(k)*30); ctx.quadraticCurveTo(k*50+26,-60,k*50+30,0); ctx.closePath(); shape(ctx,rgba(C.koraal,0.85),lighten(C.koraal,0.3),1.5); } ctx.restore(); }
    if(i===1){ ctx.fillStyle='#5A4232'; ctx.save(); ctx.translate(x-40,520); ctx.rotate(1.2); ctx.fillRect(-12,-150,24,150); ctx.restore(); ctx.beginPath(); ctx.arc(x+90,480,60,0,6.283); shape(ctx,'#3F6E4C','#5A8A66',1.5); ctx.strokeStyle=C.text2; ctx.lineWidth=4; for(let k=0;k<3;k++){ ctx.beginPath(); ctx.moveTo(x-140,360+k*30); ctx.quadraticCurveTo(x-60,340+k*30,x+20,360+k*30); ctx.stroke(); } }
    if(i===2){ ctx.fillStyle=rgba(C.teal,0.5); ctx.fillRect(x-170,470,340,90); eik(x,560,0.5,1); ctx.fillStyle=rgba(C.teal,0.5); ctx.fillRect(x-170,520,340,40); }
    if(i===3){ for(let k=0;k<4;k++){ ctx.fillStyle='#8C6A4A'; ctx.beginPath(); ctx.ellipse(x-90+k*60,540,22,22,0,0,6.283); ctx.fill(); ctx.strokeStyle='#B08A5C'; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(x-90+k*60,540,12,0,6.283); ctx.stroke(); } } }); }); meta4(); },
// ---- H3: een jaar later, de vraag ----
s08(ctx,t,q){ const tJ=q.at('jaar'), tW=q.at('Welke');
  stukBos(t,{stad:0.2,stammen:true}); jaarTeller(1640,120,'1 jaar later',ramp(t,tJ,0.4));
  persoon(ctx,'noor',760,880,300,{outfit:'zomer',pose:'wijs',uit:'denkt',kijk:1,t}); persoon(ctx,'henk',560,880,320,{pose:'staan',uit:'neutraal',kijk:1,t});
  alpha(ctx,ramp(t,tW,0.4),()=>text(ctx,'?',1250,500,fTitel(110),C.goud,'center')); },
// ---- H3: successie, jaar na jaar ----
s10(ctx,t,q){ const tZ=q.at('Zaadjes'), tG=q.at('Grassen'), tP=q.at('pioniers.'), tS=q.at('struiken'), tSc=q.at('schaduw.',1), tPv=q.at('verdwijnen.'), tE=q.at('eiken'), tV=q.at('vijftig'), tSu=q.at('successie.'), tEl=q.at('Elke');
  // stadium volgt de tekst: 0.3 -> 1.6 (gras) -> 3 (struik/berk) -> 4.4 (pioniers weg) -> 6 (bos)
  let st=0.3; st=lerp(st,1.6,ramp(t,tG-0.3,1.2)); st=lerp(st,3.0,ramp(t,tS,1.6)); st=lerp(st,4.3,ramp(t,tPv-0.4,1.2)); st=lerp(st,6,ramp(t,tE,2.5));
  if(t<tSu-0.3){ stukBos(t,{stad:st,stammen:st<1});
    // zaadjes waaien aan
    alpha(ctx,fadeIO(t,tZ,tP,0.4),()=>{ for(let i=0;i<16;i++){ const u=((t-tZ)*0.35+hash(i))%1; const x=-50+u*2000, y=300+hash(i*3)*200+Math.sin(u*10+i)*30; dot(ctx,x,y,4,'#E8D9B0'); ctx.strokeStyle=rgba('#F2F2EE',0.6); ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x-6,y-12); ctx.moveTo(x,y); ctx.lineTo(x+6,y-12); ctx.stroke(); } });
    const jr= t<tS?'1 jaar later': t<tE?'± 5 jaar later': t<tV?'± 20 jaar later':'50 tot 100 jaar later'; jaarTeller(1640,120,jr,1);
    naamBij(ctx,'pioniers','grassen en snelle kruiden',W/2,250,fadeIO(t,tP,tS+0.5,0.4),'center',C.groen);
    naamBij(ctx,'struiken en jonge berken','',W/2,250,fadeIO(t,tS+0.6,tE,0.4),'center',C.groen);
    naamBij(ctx,'eiken en beuken','',W/2,250,ramp(t,tE,0.4),'center',C.groen); return; }
  // tijdlijn van de successie
  bg(ctx,'schema'); const Y=560; ctx.strokeStyle=C.line; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(160,Y); ctx.lineTo(1760,Y); ctx.stroke(); arrow(ctx,1700,Y,1780,Y,C.line,2,14);
  const S=[['as',0],['pioniers',1.6],['struiken en berken',3],['eiken en beuken',6]]; S.forEach(([nm,s],i)=>{ const x=300+i*450; alpha(ctx,ramp(t,tSu-0.3+i*0.35,0.4),()=>{ ctx.save(); ctx.beginPath(); roundRect(ctx,x-170,Y-330,340,280,14); ctx.clip(); ctx.translate(x-170,Y-330); ctx.scale(340/W,340/W); ctx.translate(0,-200); stukBos(0,{stad:s,stammen:s<1}); ctx.restore(); roundRect(ctx,x-170,Y-330,340,280,14); ctx.strokeStyle=C.line; ctx.lineWidth=1.5; ctx.stroke(); dot(ctx,x,Y,8,C.goud); text(ctx,nm,x,Y+60,fTekst(32,600),C.text,'center'); }); });
  naamBij(ctx,'successie','vaste volgorde van planten',W/2,150,ramp(t,tSu,0.4),'center',C.goud);
  haak(ctx,200,1720,Y+90,'elke groep maakt de plek klaar voor de volgende',C.groen,ramp(t,tEl,0.5)); },
// ---- H3 uitdaging: den die vuur nodig heeft ----
s11(ctx,t,q){ const tC=q.at('Canada'), tH=q.at('hitte'), tO=q.at('open'), tZ=q.at('zaadjes');
  bg(ctx,'schema'); const op=ramp(t,tO-0.3,1.2);
  alpha(ctx,1-ramp(t,tC-0.2,0.5)*0.65,()=>{ ctx.fillStyle='#5A4232'; ctx.fillRect(330,380,24,420); for(let k=0;k<5;k++){ const y=400+k*80, w=70+k*40; ctx.beginPath(); ctx.moveTo(342,y-60); ctx.lineTo(342+w,y+30); ctx.lineTo(342-w,y+30); ctx.closePath(); shape(ctx,'#2F5A3E','#4F7A5E',1.5); } naamBij(ctx,'den','Canada',342,860-20,1,'center',C.text); });
  kegel(820,560,2.4,op,ramp(t,tC,0.5)); naamBij(ctx,'dennenkegel','dichtgeplakt met hars',1180,520,ramp(t,tC+1,0.4)*(1-ramp(t,tO,0.4)),'center',C.text);
  alpha(ctx,ramp(t,tH-0.3,0.5)*(1-ramp(t,tO+1.5,0.6)),()=>{ ctx.save(); ctx.translate(820,800); for(let k=-2;k<=2;k++){ ctx.beginPath(); ctx.moveTo(k*60-30,0); ctx.quadraticCurveTo(k*60-24,-50,k*60,-110+Math.abs(k)*20+Math.sin(t*9+k)*8); ctx.quadraticCurveTo(k*60+24,-50,k*60+30,0); ctx.closePath(); shape(ctx,rgba(C.koraal,0.85),lighten(C.koraal,0.3),1.5); } ctx.restore(); pill(ctx,1300,300,'hitte: de hars smelt',C.koraal,1,32); });
  alpha(ctx,ramp(t,tZ,0.4),()=>{ for(let i=0;i<8;i++){ const u=ramp(t,tZ+i*0.15,1.6); const x=820+(i-3.5)*30+u*(200+i*40), y=lerp(500,795,u); ctx.beginPath(); ctx.ellipse(x,y,8,5,0.3,0,6.283); shape(ctx,'#8C6A4A','#B08A5C',1); ctx.beginPath(); ctx.ellipse(x+14,y-4,16,6,0.3,0,6.283); ctx.fillStyle=rgba('#E8D9B0',0.7); ctx.fill(); } ctx.fillStyle='#3A3430'; ctx.fillRect(1000,800,700,40); naamBij(ctx,'kale, rijke grond','',1350,770,1,'center',C.oker); }); meta4(); },
// ---- samenvatting ----
s12(ctx,t,q){ const tV=q.at('Vanzelf,'), tSu=q.at('successie.'), tN=q.at('nooit'), tE=q.at('evenwicht.',1), tVe=q.at('verstoring,'), tNi=q.at('nieuw');
  if(t<tN-0.3){ const st=lerp(0.2,6,ramp(t,tV,Math.max(1,tSu-tV))); stukBos(t,{stad:st,stammen:st<1}); jaarTeller(1640,120,st<1.6?'na de brand':(st<3?'pioniers':(st<5?'struiken en berken':'weer bos')),1); return; }
  bg(ctx,'schema');
  const gx=200, gy=720, gw=1520, gh=420; ctx.strokeStyle=C.line; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(gx,gy-gh); ctx.lineTo(gx,gy); ctx.lineTo(gx+gw,gy); ctx.stroke(); metaText(ctx,'tijd',gx+gw,gy+44,C.text2,'right',24); metaText(ctx,'hoeveel bos',gx,gy-gh-20,C.text2,'left',24);
  const f=(u)=>{ if(u<0.35) return 0.8+0.06*Math.sin(u*60); if(u<0.4) return lerp(0.8,0.05,(u-0.35)/0.05); return 0.05+0.75*(1-Math.exp(-(u-0.4)*5))+0.06*Math.sin(u*60)*clamp((u-0.7)*4,0,1); };
  const prog=ramp(t,tN-0.2,Math.max(1,tNi-tN+1)); ctx.strokeStyle=C.groen; ctx.lineWidth=4; ctx.beginPath(); for(let i=0;i<=200*prog;i++){ const u=i/200, x=gx+u*gw, y=gy-f(u)*gh; i?ctx.lineTo(x,y):ctx.moveTo(x,y); } ctx.stroke();
  alpha(ctx,ramp(t,tE-0.4,0.4),()=>naamBij(ctx,'evenwicht','schommelt',gx+0.17*gw,gy-0.92*gh,1,'center',C.goud));
  alpha(ctx,ramp(t,tVe,0.4),()=>{ ctx.strokeStyle=C.koraal; ctx.lineWidth=3; ctx.setLineDash([8,8]); ctx.beginPath(); ctx.moveTo(gx+0.37*gw,gy-gh); ctx.lineTo(gx+0.37*gw,gy); ctx.stroke(); ctx.setLineDash([]); naamBij(ctx,'brand','verstoring',gx+0.37*gw,gy-gh-10,1,'center',C.koraal); });
  alpha(ctx,ramp(t,tNi,0.4),()=>naamBij(ctx,'successie','nieuw evenwicht',gx+0.72*gw,gy-0.92*gh,1,'center',C.groen)); },
// ---- eindkaart ----
s13(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Probeer het zelf',120,200,fTitel(80),C.text); metaText(ctx,'uit balans',120,260,C.grain,'left',26);
  const P=[['Kale plek','Krab een vierkante meter in de schooltuin kaal (met toestemming). Kijk elke maand: welke planten komen er als eerste?'],['Tijdmachine','Zoek een open plek, een struweel en een oud bos bij school of op een kaart. Welk stadium van successie zie je?'],['Muizengrafiek','Teken zelf een grafiek van muizen en uilen over tien jaar. Laat zien wat er gebeurt in een jaar met veel eikels.']];
  P.forEach((p,i)=>{ const x=120+i*575; alpha(ctx,ramp(t,0.6+i*0.6,0.6),()=>{ roundRect(ctx,x,330,535,300,14); shape(ctx,rgba(C.bgSchema,0.95),C.line,1); text(ctx,p[0],x+28,392,fTekst(38,600),C.goud); ctx.font=fTekst(30); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,p[1],x+28,445,480,40); }); });
  alpha(ctx,ramp(t,2.6,0.6),()=>{ ctx.font=fTekst(36,600); ctx.fillStyle=C.goud; ctx.textAlign='left'; wrap(ctx,'Een storm blaast in een bos tien grote bomen om. Wat groeit er op die plek de eerste jaren, en waarom juist daar?',120,720,1680,46); });
  metaText(ctx,'biologie bij kamiel · stem: roos (elevenlabs) · versie 1.0 · oktober 2026',W/2,CAPTION_Y-10,C.text2,'center',22); },
};
