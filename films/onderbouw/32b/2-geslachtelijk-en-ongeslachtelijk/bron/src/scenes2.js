// ===== 32B film 2 — Geslachtelijk en ongeslachtelijk =====
// Rode draad: de aardbeienplant van opa Henk. Kopieën = één kleur (teal), mixen = tinten paars/oker per jong. Eicel oker, zaadcel teal.
const YB2=780;
function aardbei(x,y,s=1,a=1){ alpha(ctx,a,()=>{ ctx.beginPath(); ctx.moveTo(x,y+28*s); ctx.bezierCurveTo(x-30*s,y+10*s,x-26*s,y-18*s,x,y-16*s); ctx.bezierCurveTo(x+26*s,y-18*s,x+30*s,y+10*s,x,y+28*s); shape(ctx,'#D8574A','#F08A7A',1.5);
  for(let k=0;k<9;k++) dot(ctx,x+(hash(k*2.1)-0.5)*32*s,y+(hash(k*3.7)-0.4)*30*s,1.8*s,'#F2D27A');
  ctx.fillStyle='#5FA86E'; for(let k=0;k<5;k++){ const an=-Math.PI/2+(k-2)*0.5; ctx.beginPath(); ctx.ellipse(x+Math.cos(an)*10*s,y-16*s+Math.sin(an)*4*s,9*s,3.5*s,an,0,6.283); ctx.fill(); } }); }
// aardbeienplant: rozet bladeren op de grond; bloem, vrucht; o.kleur = tint voor 'kopie' (genkleur)
function aardbeiPlant(x,yg,s=1,o={}){ const a=o.a==null?1:o.a; alpha(ctx,a,()=>{
  for(let k=0;k<5;k++){ const an=-Math.PI/2+(k-2)*0.45; const lx=x+Math.cos(an)*60*s, ly=yg-20*s+Math.sin(an)*70*s;
    ctx.strokeStyle='#4E8A5C'; ctx.lineWidth=3*s; ctx.beginPath(); ctx.moveTo(x,yg); ctx.lineTo(lx,ly); ctx.stroke();
    for(let j=-1;j<=1;j++){ ctx.beginPath(); ctx.ellipse(lx+j*16*s,ly-8*s+Math.abs(j)*6*s,16*s,22*s,j*0.5,0,6.283); shape(ctx,'#5FA86E','#8FC49A',1.2); } }
  if(o.bloem>0.01) alpha(ctx,o.bloem,()=>{ [[-40,-110],[50,-100]].forEach(([dx,dy])=>{ for(let k=0;k<5;k++){ const an=k*1.2566; ctx.beginPath(); ctx.ellipse(x+dx*s+Math.cos(an)*11*s,yg+dy*s+Math.sin(an)*11*s,9*s,7*s,an,0,6.283); shape(ctx,'#F2F2EE','#D9DEE6',1); } dot(ctx,x+dx*s,yg+dy*s,6*s,'#F2D27A'); }); });
  if(o.vrucht>0.01){ aardbei(x-50*s,yg-50*s,0.9*s*o.vrucht,o.vrucht); aardbei(x+46*s,yg-40*s,0.8*s*o.vrucht,o.vrucht); }
  if(o.genkl) genStreep(x-50*s,yg+20*s,100*s,14*s,1,-1,0,o.genkl);
}); }
function uitloper(x0,x1,yg,u,s=1){ if(u<=0.01) return; const xe=lerp(x0,x1,u); ctx.strokeStyle='#7A9A5A'; ctx.lineWidth=3*s; ctx.beginPath(); ctx.moveTo(x0,yg-6); ctx.quadraticCurveTo((x0+xe)/2,yg-40*s,xe,yg-4); ctx.stroke(); }
function aardappel(x,y,s=1,a=1,spruit=0){ alpha(ctx,a,()=>{ ctx.beginPath(); ctx.ellipse(x,y,50*s,34*s,0.2,0,6.283); shape(ctx,'#C9A35C','#E0C48A',2); for(let k=0;k<4;k++) dot(ctx,x+(hash(k)-0.5)*60*s,y+(hash(k*3)-0.5)*30*s,3*s,'#8C6A3A');
  if(spruit>0.01){ [[-20,-28],[18,-30],[36,-10]].forEach(([dx,dy],i)=>{ ctx.strokeStyle='#E8D8F0'; ctx.lineWidth=4*s; ctx.beginPath(); ctx.moveTo(x+dx*s,y+dy*s); ctx.lineTo(x+dx*s+(i-1)*12*s,y+dy*s-36*s*spruit); ctx.stroke(); dot(ctx,x+dx*s+(i-1)*12*s,y+dy*s-36*s*spruit,5*s,'#9ACB8E'); }); } }); }
function bacterieDeling(x,y,s,u,kleur=C.teal){ // u 0..1: één staafje wordt twee
  const sep=u*34*s; ctx.save(); ctx.translate(x,y);
  if(u<0.5){ const w=26*s*(1+u); roundRect(ctx,-w,-10*s,2*w,20*s,10*s); shape(ctx,rgba(kleur,0.45),lighten(kleur,0.35),1.6); if(u>0.25){ ctx.strokeStyle=lighten(kleur,0.35); ctx.beginPath(); ctx.moveTo(0,-10*s); ctx.lineTo(0,10*s); ctx.stroke(); } }
  else { [-1,1].forEach(d=>{ roundRect(ctx,d*sep-24*s+(d>0?6*s:-6*s),-10*s,48*s,20*s,10*s); shape(ctx,rgba(kleur,0.45),lighten(kleur,0.35),1.6); }); }
  ctx.restore(); }
function eicel(x,y,r,a=1,kern=true){ alpha(ctx,a,()=>{ ctx.beginPath(); ctx.arc(x,y,r,0,6.283); shape(ctx,rgba(C.oker,0.45),lighten(C.oker,0.35),2); ctx.beginPath(); ctx.arc(x,y,r+8,0,6.283); ctx.strokeStyle=rgba(C.oker,0.35); ctx.lineWidth=6; ctx.stroke(); if(kern) dot(ctx,x-r*0.15,y-r*0.1,r*0.28,rgba(C.paars,0.7),C.kernR,1.2); }); }
function zaadcel(x,y,s=1,a=1,ang=0,t=0){ alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.rotate(ang); ctx.beginPath(); ctx.ellipse(0,0,14*s,9*s,0,0,6.283); shape(ctx,rgba(C.teal,0.6),lighten(C.teal,0.35),1.5); dot(ctx,2*s,0,4*s,rgba(C.paars,0.8));
  ctx.strokeStyle=lighten(C.teal,0.2); ctx.lineWidth=2*s; ctx.beginPath(); ctx.moveTo(-14*s,0); for(let k=1;k<=10;k++) ctx.lineTo(-14*s-k*6*s,Math.sin(t*14+k*0.9)*5*s*(k/10)); ctx.stroke(); ctx.restore(); }); }
function bij(x,y,s=1,a=1,t=0){ alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.fillStyle=rgba('#F2F2EE',0.6); const f=Math.sin(t*40)*0.3; ctx.beginPath(); ctx.ellipse(-4*s,-14*s,12*s,7*s,-0.5+f,0,6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(6*s,-14*s,12*s,7*s,0.5-f,0,6.283); ctx.fill();
  ctx.beginPath(); ctx.ellipse(0,0,18*s,12*s,0,0,6.283); shape(ctx,'#E0B64A','#F2D27A',1.2); ctx.fillStyle='#2A2119'; [-6,4].forEach(dx=>ctx.fillRect(dx*s,-11*s,4*s,22*s)); dot(ctx,18*s,0,6*s,'#2A2119'); ctx.restore(); }); }
function bloemZij(x,y,s=1,a=1,hart=null){ alpha(ctx,a,()=>{ ctx.strokeStyle=BOON.stengel; ctx.lineWidth=6*s; ctx.beginPath(); ctx.moveTo(x,y+160*s); ctx.lineTo(x,y+20*s); ctx.stroke();
  for(let k=0;k<6;k++){ const an=k*1.047; ctx.beginPath(); ctx.ellipse(x+Math.cos(an)*30*s,y+Math.sin(an)*30*s,24*s,14*s,an,0,6.283); shape(ctx,'#F2F2EE','#D9DEE6',1.2); }
  dot(ctx,x,y,16*s,hart||'#F2D27A','#F8E6A8',1.5); }); }
// kleine groep dieren (muisjes) als silhouet; kleuren per individu; ziek = aantal dat valt
function diertje(x,y,s,kleur,a=1){ alpha(ctx,a,()=>{ ctx.beginPath(); ctx.ellipse(x,y,26*s,16*s,0,0,6.283); shape(ctx,kleur,lighten(kleur,0.3),1.2); dot(ctx,x+24*s,y-6*s,10*s,kleur); dot(ctx,x+20*s,y-18*s,6*s,lighten(kleur,0.2)); dot(ctx,x+30*s,y-8*s,1.8*s,'#1A1410'); ctx.strokeStyle=kleur; ctx.lineWidth=2*s; ctx.beginPath(); ctx.moveTo(x-26*s,y); ctx.quadraticCurveTo(x-46*s,y-10*s,x-52*s,y+6*s); ctx.stroke(); }); }
function bladluis2(x,y,s=1,a=1,kleur='#9CC86E'){ alpha(ctx,a,()=>{ ctx.beginPath(); ctx.ellipse(x,y,14*s,10*s,0,0,6.283); shape(ctx,kleur,lighten(kleur,0.35),1.2); dot(ctx,x-13*s,y-3*s,4*s,_donker(kleur,0.2)); ctx.strokeStyle=_donker(kleur,0.3); ctx.lineWidth=1.5*s; for(let k=-1;k<=1;k++){ ctx.beginPath(); ctx.moveTo(x+k*6*s,y+8*s); ctx.lineTo(x+k*8*s,y+16*s); ctx.stroke(); } }); }
const MIX=['#8C7BBF','#C9A35C','#A392D6','#B08A5C','#6E5A9E','#D4B87A','#9C8CC8','#C2955A'];

const SCENES={
// ---- cold open ----
s01(ctx,t,q){ const tV=q.at('voorjaar'), tE=q.at('eind'), tT=q.at('twintig.'), tN=q.at('niets'), tD=q.at('dieren'), tW=q.at('Waarom');
  if(t<tD-0.3){ tuinDag({yb:YB2,zx:300}); persoon(ctx,'henk',260,YB2+40,420,{pose:t>tT?'schouders':'staan',uit:t>tT?'verbaasd':'blij',kijk:1,t});
    const n=Math.round(1+19*ramp(t,tE,2.2)); for(let i=0;i<n;i++){ const c=i%7, r=Math.floor(i/7); aardbeiPlant(620+c*170+(r%2)*80,YB2+40+r*90,0.55+0.1*(i===0)); }
    pill(ctx,960,150,t<tE?'voorjaar: 1 plant':'eind van de zomer: 20 planten',C.grain,ramp(t,tV,0.4),30);
    alpha(ctx,ramp(t,tN,0.4),()=>{ ctx.fillStyle=rgba(C.bgSchema,0.92); roundRect(ctx,1340,230,440,80,14); ctx.fill(); text(ctx,'niets gezaaid',1560,282,fTekst(36,700),C.text,'center'); crossOut(ctx,1740,270,0,0); }); return; }
  bg(ctx,'schema'); ctx.strokeStyle=C.line; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(300,700); ctx.lineTo(1620,700); ctx.stroke();
  alpha(ctx,ramp(t,tD,0.5),()=>{ kikker(560,620,1.3,1,1); kikker(860,620,1.3,1,-1); text(ctx,'vader',560,760,fTekst(32,600),C.text,'center'); text(ctx,'moeder',860,760,fTekst(32,600),C.text,'center');
    arrow(ctx,710,560,1120,420,C.line,3,14); kikker(1300,430,0.8,1); kikker(1440,470,0.7,1,-1); kikker(1340,560,0.75,1); });
  vraagteken(1400,280,ramp(t,tW,0.4)); },
// ---- titel ----
s03(ctx,t,q){ bg(ctx,'schema'); alpha(ctx,ramp(t,0.1,0.7),()=>{ text(ctx,'Geslachtelijk en',120,300,fTitel(84),C.text); text(ctx,'ongeslachtelijk',120,390,fTitel(84),C.text); text(ctx,'Waarom hebben de meeste dieren twee ouders?',120,470,fTekst(40),C.text2); });
  ctx.strokeStyle=C.line; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(1150,780); ctx.lineTo(1800,780); ctx.stroke();
  aardbeiPlant(1300,780,0.9,{a:ramp(t,0.4,0.6)}); uitloper(1300,1560,780,ramp(t,0.8,1.2),1); aardbeiPlant(1600,780,0.6,{a:ramp(t,1.8,0.6)});
  metaText(ctx,'ONDERBOUW · KERNDOEL 32B · FILM 2',W-80,60,C.text2,'right',24); },
// ---- H1: uitlopers, kloon ----
s04(ctx,t,q){ tuinDag({yb:YB2,zon:false}); const tU=q.at('uitlopers.'), tN=q.at('nieuw'), tW=q.at('wortels.'), tE=q.at('Eén'), tO=q.at('ongeslachtelijke'), tG=q.at('genen'), tK=q.at('kloon.');
  const u=ramp(t,q.at('stengels')-0.3,2.4); aardbeiPlant(420,YB2,1.2,{genkl:t>tG?[C.teal,C.teal,C.teal,C.teal]:null}); uitloper(420,880,YB2,u,1.4); uitloper(880,1320,YB2,ramp(t,tE,2),1.4);
  aardbeiPlant(900,YB2,0.9*ramp(t,tN-0.2,1),{a:ramp(t,tN-0.2,0.5),genkl:t>tG+0.4?[C.teal,C.teal,C.teal,C.teal]:null}); aardbeiPlant(1340,YB2,0.7*ramp(t,tE+1.2,1),{a:ramp(t,tE+1.2,0.5),genkl:t>tG+0.8?[C.teal,C.teal,C.teal,C.teal]:null});
  alpha(ctx,ramp(t,tW,0.5),()=>{ roots(900,YB2+4,0.35,1); }); naamBij(ctx,'uitloper','',650,YB2-90,ramp(t,tU-0.2,0.4),'center',C.text);
  alpha(ctx,ramp(t,tO-0.3,0.5),()=>{ ctx.fillStyle=rgba(C.bgSchema,0.92); roundRect(ctx,420,90,1080,140,16); ctx.fill(); text(ctx,'ongeslachtelijke voortplanting',W/2,160,fTekst(46,700),C.goud,'center'); metaText(ctx,'één ouder · geen bloem, geen zaad',W/2,205,C.grain,'center',24); });
  naamBij(ctx,'dezelfde genen','',900,YB2+110,ramp(t,tG,0.4),'center',C.teal); naamBij(ctx,'kloon','een kopie',1340,YB2+110,ramp(t,tK,0.4),'center',C.teal); },
// ---- H1: aardappel, stek, bacterie ----
s05(ctx,t,q){ bg(ctx,'schema'); const tA=q.at('aardappel'), tS=q.at('stekje'), tB=q.at('bacterie'), tT=q.at('Twintig'), tZ=q.at('snel',1), tSn=q.at('Snel'), tP=q.at('partner'), tK=q.at('kopieën.'), tL=q.at('precies');
  if(t<tSn-0.3){ const xs=[330,960,1590];
    alpha(ctx,ramp(t,tA-0.2,0.4),()=>{ kaart(xs[0]-260,200,520,560,C.line,1); aardappel(xs[0],520,1.6,1,ramp(t,tA+0.6,1.4)); text(ctx,'knol',xs[0],700,fTekst(34,600),C.text,'center'); });
    alpha(ctx,ramp(t,tS-0.2,0.4),()=>{ kaart(xs[1]-260,200,520,560,C.line,1); ctx.fillStyle=rgba(C.teal,0.25); ctx.fillRect(xs[1]-60,460,120,160); ctx.strokeStyle='#AFC0D0'; ctx.lineWidth=2; ctx.strokeRect(xs[1]-60,380,120,240); stekje(xs[1],560,1.6); alpha(ctx,ramp(t,tS+0.8,1),()=>roots(xs[1],570,0.18,1)); text(ctx,'stek',xs[1],700,fTekst(34,600),C.text,'center'); });
    alpha(ctx,ramp(t,tB-0.2,0.4),()=>{ kaart(xs[2]-260,200,520,560,C.line,1); const g=ramp(t,tT,1.2), g2=ramp(t,tZ,1.2);
      if(t<tT){ bacterieDeling(xs[2],460,1.4,ramp(t,tB,1.6)); }
      else { const cel=[[-1,-1],[1,-1],[-1,1],[1,1]]; const n=g2>0.5?8:4; for(let i=0;i<n;i++){ const c=i%4, r=Math.floor(i/4); bacterieDeling(xs[2]+(c-1.5)*100,370+r*130+(c%2)*30,1,1); } }
      text(ctx,'deling',xs[2],700,fTekst(34,600),C.text,'center'); alpha(ctx,ramp(t,tT,0.4),()=>metaText(ctx,'± elke 20 minuten',xs[2],740,C.grain,'center',22)); });
    meta32b(); return; }
  // allemaal kopieën
  for(let i=0;i<18;i++){ const c=i%6, r=Math.floor(i/6); aardbeiPlant(330+c*250,420+r*170,0.5,{a:ramp(t,tSn-0.2+i*0.03,0.3),genkl:[C.teal,C.teal,C.teal]}); }
  pill(ctx,480,150,'snel',C.groen,ramp(t,tSn,0.4),34); pill(ctx,960,150,'geen partner nodig',C.groen,ramp(t,tP,0.4),34);
  naamBij(ctx,'allemaal kopieën','',1440,160,ramp(t,tK,0.4),'center',C.teal); },
// ---- H2: geslachtscellen, bevruchting ----
s06(ctx,t,q){ bg(ctx,'schema'); const tT=q.at('twee'), tG=q.at('geslachtscellen.'), tE=q.at('eicellen.'), tZ=q.at('zaadcellen.'), tS=q.at('smelt'), tB=q.at('bevruchting.'), tU=q.at('groeit');
  if(t<tS-0.3){ alpha(ctx,ramp(t,tT-0.3,0.4),()=>{ kikker(520,560,1.4,1,1); kikker(1400,560,1.4,1,-1); text(ctx,'vrouwtje',520,700,fTekst(34,600),C.oker,'center'); text(ctx,'mannetje',1400,700,fTekst(34,600),C.teal,'center'); });
    alpha(ctx,ramp(t,tE-0.3,0.5),()=>{ eicel(760,330,46,1); naamBij(ctx,'eicel','',760,410,1,'center',C.oker); });
    alpha(ctx,ramp(t,tZ-0.3,0.5),()=>{ for(let i=0;i<3;i++) zaadcel(1160+i*24,300+i*40,1.3,1,Math.PI,t); naamBij(ctx,'zaadcel','',1160,420,1,'center',C.teal); });
    naamBij(ctx,'geslachtscellen','',W/2,200,ramp(t,tG-0.4,0.4),'center',C.goud); return; }
  const u=ramp(t,tS,1.6), v=ramp(t,tU-0.2,1.6);
  if(v<0.5){ eicel(W/2,440,120*(1-v*0.2),1,u<0.9); for(let i=0;i<6;i++){ const an=i*1.05+0.4, d=lerp(420,i===0?120:220+i*12,ramp(t,tS-0.6+i*0.1,1.2)); if(i===0&&u>=0.9) continue; zaadcel(W/2+Math.cos(an)*d,440+Math.sin(an)*d,1.4,1,an+Math.PI,t); }
    if(u>=0.9) alpha(ctx,ramp(t,tS+1.4,0.5),()=>{ dot(ctx,W/2-10,430,40,rgba(C.paars,0.75),C.kernR,1.5); }); }
  else { const n=Math.pow(2,Math.min(4,Math.floor(v*8))); // klompje cellen -> kikkervisje
    if(v<0.9){ for(let i=0;i<n;i++){ const an=i/n*6.283, d=Math.sqrt(n)*12; dot(ctx,W/2+Math.cos(an)*d,440+Math.sin(an)*d,90/Math.sqrt(n),rgba(C.oker,0.45),lighten(C.oker,0.35),1.5); } }
    else kikkervisje(W/2,440,2.4,0,1,1,t); }
  alpha(ctx,ramp(t,tB-0.3,0.5),()=>{ ctx.fillStyle=rgba(C.bgSchema,0.92); roundRect(ctx,W/2-260,110,520,90,16); ctx.fill(); text(ctx,'bevruchting',W/2,170,fTekst(46,700),C.goud,'center'); }); },
// ---- H2: kikkers in water, bloem met bij, aardbei ----
s07(ctx,t,q){ const tP=q.at('planten'), tBi=q.at('bij'), tSt=q.at('stuifmeel'), tSm=q.at('smelt'), tZa=q.at('zaadje.'), tO=q.at('opa');
  if(t<tP-0.3){ bg(ctx,'schema'); sloot(160,200,1600,560,0,1); kikker(620,320,1.2,1,1); kikker(1240,320,1.2,1,-1);
    kikkerEi(760,560,1.6,ramp(t,q.at('eitjes,')-0.2,0.5)); for(let i=0;i<8;i++){ const w=wander(i,t,30,1.5); zaadcel(lerp(1180,860+hash(i)*120,ramp(t,q.at('zaadcellen')-0.2,1.5))+w.x,500+hash(i*3)*120+w.y,1,ramp(t,q.at('zaadcellen')-0.3,0.4),Math.PI,t); }
    naamBij(ctx,'bevruchting in het water','',W/2,160,ramp(t,0.3,0.4),'center',C.teal); return; }
  if(t<tO-0.3){ bg(ctx,'schema'); bloemZij(520,340,1.6,1,'#F2D27A'); bloemZij(1400,340,1.6,1,ramp(t,tSm,0.5)?_mixHex('#F2D27A','#8C7BBF',ramp(t,tSm,0.5)):'#F2D27A');
    const u=ramp(t,tBi,3.2); const bx=lerp(560,1380,u), by=300-Math.sin(u*Math.PI)*160; bij(bx,by,2,ramp(t,tBi-0.3,0.4),t);
    alpha(ctx,ramp(t,tSt,0.4),()=>{ for(let k=0;k<6;k++) dot(ctx,bx-12+hash(k)*24,by+18+hash(k*3)*10,4,'#F2D27A'); }); naamBij(ctx,'stuifmeel','',bx,by-60,fadeIO(t,tSt,tSm,0.4),'center','#F2D27A');
    alpha(ctx,ramp(t,tSm,0.5),()=>{ zoomCircle(ctx,1400,700,140,1400,360,'in de bloem',1,()=>{ ctx.fillStyle=C.bgSchema; ctx.fillRect(1260,560,280,280); eicel(1400,700,50,1); dot(ctx,1380,690,10,rgba(C.teal,0.8)); }); });
    alpha(ctx,ramp(t,tZa-0.2,0.5),()=>{ zaadje(1640,700,1.4); naamBij(ctx,'zaadje','',1640,760,1,'center',C.oker); }); return; }
  tuinDag({yb:YB2,zx:1700}); persoon(ctx,'henk',300,YB2+40,420,{pose:'wijs',uit:'blij',kijk:1,t});
  aardbeiPlant(900,YB2,1.6,{bloem:1-ramp(t,q.at('aardbeien,')-0.4,0.8),vrucht:ramp(t,q.at('aardbeien,')-0.4,0.8)});
  alpha(ctx,ramp(t,q.at('zaadjes.')-0.3,0.4),()=>{ zoomCircle(ctx,1450,380,150,880,700,'zaadjes op de aardbei',1,()=>{ ctx.fillStyle=DAG.lucht; ctx.fillRect(1300,230,300,300); aardbei(1450,380,4.2,1); }); }); },
// ---- H3: mix, broers en zussen, ziekte ----
s08(ctx,t,q){ bg(ctx,'schema'); const tG=q.at('genen'), tM=q.at('mix.'), tB=q.at('broers'), tZ=q.at('ziekte.'), tW=q.at('Welke');
  if(t<tZ-0.3){ const A=['#8C7BBF','#8C7BBF','#8C7BBF','#8C7BBF','#8C7BBF','#8C7BBF'], B=['#C9A35C','#C9A35C','#C9A35C','#C9A35C','#C9A35C','#C9A35C'];
    genStreep(260,200,480,40,ramp(t,0.2,0.4),-1,0,A); genStreep(1180,200,480,40,ramp(t,0.4,0.4),-1,0,B); text(ctx,'moeder',500,180,fTekst(32,600),C.paars,'center'); text(ctx,'vader',1420,180,fTekst(32,600),C.oker,'center');
    for(let j=0;j<3;j++){ const kl=[0,1,2,3,4,5].map(i=>hash(j*31+i*7)<0.5?A[i]:B[i]); alpha(ctx,ramp(t,tM-0.6+j*0.3,0.4),()=>{ genStreep(380+j*420,520,360,34,1,-1,0,kl); }); arrow(ctx,960,260,560+j*420,500,C.line,2,12,ramp(t,tG+j*0.2,0.4)); }
    naamBij(ctx,'elke keer een andere mix','',800,640,ramp(t,tM,0.4),'center',C.goud);
    alpha(ctx,ramp(t,tB-0.3,0.4),()=>{ persoon(ctx,'yasmin',1500,870,300,{uit:'blij',t}); persoon(ctx,'bilal',1700,870,310,{uit:'lacht',kijk:-1,t}); naamBij(ctx,'broer en zus','',1600,520,1,'center',C.text); }); return; }
  const xs=[560,1360];
  alpha(ctx,ramp(t,tW-0.4,0.4),()=>{ kaart(xs[0]-330,170,660,560,C.teal,1); kaart(xs[1]-330,170,660,560,C.paars,1);
    text(ctx,'kopieën van één ouder',xs[0],240,fTekst(34,700),C.teal,'center'); text(ctx,'jongen van twee ouders',xs[1],240,fTekst(34,700),C.paars,'center');
    for(let i=0;i<12;i++){ const c=i%4, r=Math.floor(i/4); diertje(xs[0]-220+c*145,360+r*120,1,'#7FA9B8'); diertje(xs[1]-220+c*145,360+r*120,1,MIX[(i*5)%8]); } });
  vraagteken(W/2,460,ramp(t,tW+1,0.4),90); },
// ---- H3: antwoord ----
s10(ctx,t,q){ bg(ctx,'schema'); const tA=q.at('anders.'), tK=q.at('kans'), tKo=q.at('kopieën'), tV=q.at('Valt'), tO=q.at('Ongeslachtelijk'), tGe=q.at('Geslachtelijk',2), tVe=q.at('Veel');
  const xs=[560,1360];
  if(t<tO-0.3){ kaart(xs[0]-330,170,660,560,C.teal,1); kaart(xs[1]-330,170,660,560,C.paars,1);
    text(ctx,'kopieën',xs[0],240,fTekst(34,700),C.teal,'center'); text(ctx,'twee ouders',xs[1],240,fTekst(34,700),C.paars,'center');
    const z=ramp(t,tK,1.2), z0=ramp(t,tV,1.2);
    for(let i=0;i<12;i++){ const c=i%4, r=Math.floor(i/4); const overl=[2,7,9].includes(i);
      diertje(xs[1]-220+c*145,360+r*120,1,MIX[(i*5)%8],overl?1:1-0.65*z); if(overl&&z>0.5) alpha(ctx,z,()=>{ ctx.strokeStyle=C.groen; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(xs[1]-220+c*145,360+r*120,40,0,6.283); ctx.stroke(); });
      diertje(xs[0]-220+c*145,360+r*120,1,'#7FA9B8',1-0.65*z0); }
    naamBij(ctx,'een paar kunnen ertegen','',xs[1],790,ramp(t,tK,0.4),'center',C.groen); naamBij(ctx,'allemaal even zwak','',xs[0],790,ramp(t,tV,0.4),'center',C.koraal); return; }
  alpha(ctx,ramp(t,tO-0.2,0.4),()=>{ kaart(260,240,600,320,C.teal,1); text(ctx,'ongeslachtelijk',560,320,fTekst(40,700),C.teal,'center'); text(ctx,'snel',560,410,fTekst(36,600),C.text,'center'); });
  alpha(ctx,ramp(t,tGe-0.2,0.4),()=>{ kaart(1060,240,600,320,C.paars,1); text(ctx,'geslachtelijk',1360,320,fTekst(40,700),C.paars,'center'); text(ctx,'variatie',1360,410,fTekst(36,600),C.text,'center'); });
  alpha(ctx,ramp(t,tVe-0.2,0.4),()=>{ aardbeiPlant(860,820,0.8,{bloem:1}); uitloper(860,1100,820,1,1); aardbeiPlant(1110,820,0.5); haak(ctx,560,1360,600,'veel planten doen allebei',C.groen,1); }); },
// ---- uitdaging: bladluizen ----
s11(ctx,t,q){ bg(ctx,'schema'); const tZ=q.at('zomer'), tJ=q.at('jongen'), tK=q.at('kopieën,'), tH=q.at('herfst'), tM=q.at('mannetjes.'), tB=q.at('bevruchte'), tW=q.at('winter.');
  ctx.strokeStyle=C.line; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(W/2,180); ctx.lineTo(W/2,760); ctx.stroke();
  alpha(ctx,ramp(t,tZ-0.2,0.4),()=>{ text(ctx,'zomer',480,220,fTekst(40,700),C.goud,'center'); bladluis2(480,340,3);
    const n=Math.round(ramp(t,tJ,2.5)*14); for(let i=0;i<n;i++){ const c=i%5, r=Math.floor(i/5); bladluis2(280+c*100,470+r*90,1.6); }
    naamBij(ctx,'zonder mannetje: kopieën','',480,770,ramp(t,tK,0.4),'center',C.teal); });
  alpha(ctx,ramp(t,tH-0.2,0.4),()=>{ text(ctx,'herfst',1440,220,fTekst(40,700),C.koraal,'center'); bladluis2(1320,340,3); bladluis2(1560,340,2.6,ramp(t,tM-0.2,0.4),'#7A9A5A');
    alpha(ctx,ramp(t,tM,0.4),()=>{ text(ctx,'♀',1320,420,fTekst(32,600),C.text2,'center'); text(ctx,'♂',1560,420,fTekst(32,600),C.text2,'center'); });
    alpha(ctx,ramp(t,tB-0.2,0.4),()=>{ for(let i=0;i<5;i++){ ctx.beginPath(); ctx.ellipse(1240+i*80,560,22,14,0,0,6.283); shape(ctx,'#2A2119',MIX[i],2.5); } naamBij(ctx,'bevruchte eitjes','nieuwe mixen',1440,640,1,'center',C.paars); });
    naamBij(ctx,'overleven de winter','',1440,770,ramp(t,tW-0.3,0.4),'center',C.teal); }); },
// ---- samenvatting ----
s12(ctx,t,q){ bg(ctx,'schema'); const tO=q.at('Ongeslachtelijk:'), tG=q.at('Geslachtelijk:',2), tD=q.at('Daarom'), tV=q.at('verschillen'), tH=q.at('helpt');
  alpha(ctx,ramp(t,tO-0.2,0.4),()=>{ kaart(160,170,760,480,C.teal,1); text(ctx,'ongeslachtelijk',540,240,fTekst(40,700),C.teal,'center'); aardbeiPlant(380,480,0.8); uitloper(380,640,480,1,1); aardbeiPlant(660,480,0.6); text(ctx,'één ouder → kopieën',540,600,fTekst(32,600),C.text,'center'); });
  alpha(ctx,ramp(t,tG-0.2,0.4),()=>{ kaart(1000,170,760,480,C.paars,1); text(ctx,'geslachtelijk',1380,240,fTekst(40,700),C.paars,'center'); eicel(1260,400,46,1); zaadcel(1440,400,1.5,1,Math.PI,t); text(ctx,'+',1350,415,fTekst(48,700),C.text,'center'); for(let i=0;i<4;i++) diertje(1170+i*120,520,0.8,MIX[i*2]); text(ctx,'twee ouders → elk jong een nieuwe mix',1380,600,fTekst(30,600),C.text,'center'); });
  haak(ctx,1000,1760,680,'jongen verschillen: dat helpt',C.groen,ramp(t,tV,0.5)); },
// ---- eindkaart ----
s13(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Probeer het zelf',120,200,fTitel(80),C.text); metaText(ctx,'geslachtelijk en ongeslachtelijk',120,260,C.grain,'left',26);
  const P=[['Stekken','Knip een stukje van een vetplant of een pothos af en zet het in water. Na twee weken: wortels? Wat voor voortplanting is dit?'],['Bloem uit elkaar','Haal een bloem voorzichtig uit elkaar. Zoek de meeldraden met stuifmeel en het vruchtbeginsel. Teken wat je ziet.'],['Zoek ze allebei','Zoek drie planten die zich op twee manieren voortplanten (aardbei, aardappel, tulp). Hoe doen ze het?']];
  P.forEach((p,i)=>{ const x=120+i*575; alpha(ctx,ramp(t,0.6+i*0.6,0.6),()=>{ roundRect(ctx,x,330,535,300,14); shape(ctx,rgba(C.bgSchema,0.95),C.line,1); text(ctx,p[0],x+28,392,fTekst(38,600),C.goud); ctx.font=fTekst(30); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,p[1],x+28,445,480,40); }); });
  alpha(ctx,ramp(t,2.6,0.6),()=>{ ctx.font=fTekst(36,600); ctx.fillStyle=C.goud; ctx.textAlign='left'; wrap(ctx,'Een boer heeft een veld met alleen maar kopieën van één aardappel. Waarom is een nieuwe plantenziekte voor hem een groot risico?',120,720,1680,46); });
  metaText(ctx,'biologie bij kamiel · stem: roos (elevenlabs) · versie 1.0 · oktober 2026',W/2,CAPTION_Y-10,C.text2,'center',22); },
};
