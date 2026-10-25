// ===== 32B film 4 — Door de mens gekozen =====
// Rode draad: tomaten in de kas (Lotte, Dr. Kim). Kiezen door de mens = goud; ziekteresistent = groen; genen = paars; ingeplakt gen = teal (bacterie).
function kasDag(){ ctx.fillStyle='#8EA8BF'; ctx.fillRect(0,0,W,H); ctx.fillStyle='#8E9AA0'; ctx.fillRect(0,800,W,H-800); ctx.strokeStyle=rgba('#F2F2EE',0.5); ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(0,140); for(let x=0;x<=W;x+=320){ ctx.lineTo(x+160,60); ctx.lineTo(x+320,140); } ctx.stroke(); for(let x=0;x<=W;x+=160){ ctx.beginPath(); ctx.moveTo(x,140); ctx.lineTo(x,800); ctx.stroke(); } }
function tomaat(x,y,r,a=1,kleur='#D8574A'){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.beginPath(); ctx.ellipse(x,y,r,r*0.88,0,0,6.283); shape(ctx,kleur,lighten(kleur,0.3),Math.max(1,r/20)); ctx.fillStyle='#4E8A5C'; for(let k=0;k<5;k++){ const an=-Math.PI/2+k*1.2566; ctx.beginPath(); ctx.ellipse(x+Math.cos(an)*r*0.25,y-r*0.8+Math.sin(an)*r*0.12,r*0.22,r*0.08,an,0,6.283); ctx.fill(); } ctx.fillStyle=rgba('#F2F2EE',0.25); ctx.beginPath(); ctx.ellipse(x-r*0.35,y-r*0.3,r*0.2,r*0.12,-0.6,0,6.283); ctx.fill(); }); }
// tomatenplant: maat 0..1 vruchtgrootte, ziek 0..1 (vlekjes), vruchten n
function tomatenPlant(x,yg,s,maat,o={}){ const a=o.a==null?1:o.a; alpha(ctx,a,()=>{ ctx.strokeStyle='#5FA86E'; ctx.lineWidth=8*s; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x,yg); ctx.lineTo(x,yg-320*s); ctx.stroke();
  for(let k=0;k<5;k++){ const d=k%2?1:-1, yy=yg-60*s-k*55*s; ctx.save(); ctx.translate(x,yy); ctx.rotate(d*0.5); for(let j=0;j<3;j++){ ctx.beginPath(); ctx.ellipse(d*(30+j*22)*s,0,14*s,9*s,0,0,6.283); shape(ctx,o.ziek?_mixHex('#6FB57C','#C9B060',o.ziek):'#6FB57C',o.ziek?'#E0D090':'#9ACB8E',1.2); if(o.ziek>0.3) dot(ctx,d*(30+j*22)*s,0,3*s,'#6A4A30'); } ctx.restore(); }
  const n=o.n||3, r=(8+30*maat)*s; for(let k=0;k<n;k++){ const yy=yg-110*s-k*70*s, xx=x+(k%2?1:-1)*(30+r*0.6)*s/s; tomaat(xx,yy,r,1); }
  if(o.gekozen>0.01) alpha(ctx,o.gekozen,()=>{ ctx.strokeStyle=C.goud; ctx.lineWidth=4; ctx.beginPath(); ctx.ellipse(x,yg-170*s,90*s+r,210*s,0,0,6.283); ctx.stroke(); });
}); }
function hond(x,y,s,soort='wolf',a=1,dir=1){ alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.scale(dir*s,s);
  const P={wolf:{c:'#8A8A88',l:150,h:70,poot:70,snuit:40,oor:28,staart:60},herder:{c:'#8C5A3A',l:150,h:66,poot:66,snuit:38,oor:30,staart:58,rug:'#3A2E24'},chihuahua:{c:'#D9B58A',l:70,h:38,poot:34,snuit:12,oor:30,staart:26},mops:{c:'#D8C098',l:100,h:56,poot:36,snuit:4,oor:12,staart:16}}[soort];
  const c=P.c, cr=lighten(c,0.25); ctx.strokeStyle=c; ctx.lineCap='round'; ctx.lineWidth=Math.max(8,P.h*0.22); [[-P.l*0.38],[-P.l*0.22],[P.l*0.25],[P.l*0.4]].forEach(([dx])=>{ ctx.beginPath(); ctx.moveTo(dx,0); ctx.lineTo(dx,P.poot); ctx.stroke(); });
  ctx.lineWidth=Math.max(5,P.h*0.14); ctx.beginPath(); ctx.moveTo(-P.l*0.48,-P.h*0.2); ctx.quadraticCurveTo(-P.l*0.6-P.staart*0.5,-P.h*0.6,-P.l*0.5-P.staart,-P.h*0.4); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0,-P.h*0.15,P.l*0.52,P.h*0.5,0,0,6.283); shape(ctx,c,cr,1.2); if(P.rug){ ctx.beginPath(); ctx.ellipse(-P.l*0.05,-P.h*0.45,P.l*0.4,P.h*0.22,0,0,6.283); ctx.fillStyle=P.rug; ctx.fill(); }
  const hx=P.l*0.5, hy=-P.h*0.55, hr=P.h*0.42; ctx.beginPath(); ctx.ellipse(hx,hy,hr,hr*0.85,0,0,6.283); shape(ctx,c,cr,1.2);
  ctx.beginPath(); ctx.ellipse(hx+hr*0.6+P.snuit*0.5,hy+hr*0.25,P.snuit*0.5+hr*0.25,hr*0.4,0,0,6.283); shape(ctx,c,cr,1.2); dot(ctx,hx+hr*0.6+P.snuit+hr*0.15,hy+hr*0.2,Math.max(3,hr*0.14),'#2A2119');
  ctx.fillStyle=_donker(c,0.2); ctx.beginPath(); ctx.moveTo(hx-hr*0.4,hy-hr*0.5); ctx.lineTo(hx-hr*0.2,hy-hr*0.5-P.oor); ctx.lineTo(hx+hr*0.1,hy-hr*0.6); ctx.closePath(); ctx.fill();
  dot(ctx,hx+hr*0.25,hy-hr*0.15,Math.max(2.5,hr*0.1),'#1A1410'); ctx.restore(); }); }
function koeIcoon(x,y,s,a=1,uier=1){ alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); ctx.fillStyle='#E9E4D6'; roundRect(ctx,-120,-100,240,100,40); ctx.fill(); ctx.fillStyle='#4A3A2C'; ctx.beginPath(); ctx.ellipse(-50,-70,30,22,0.3,0,6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(40,-40,36,24,0,0,6.283); ctx.fill();
  ctx.fillStyle='#E9E4D6'; [-90,-50,60,95].forEach(dx=>ctx.fillRect(dx,-10,16,80)); ctx.beginPath(); ctx.ellipse(140,-60,40,30,0.4,0,6.283); ctx.fill(); dot(ctx,150,-72,4,'#2A2119'); ctx.beginPath(); ctx.ellipse(0,6,22*uier,14*uier,0,0,6.283); shape(ctx,'#E8A0A0','#F2C0C0',1.2); ctx.restore(); }); }
function melkfles(x,y,h,niv,a=1){ alpha(ctx,a,()=>{ roundRect(ctx,x-30,y-h,60,h,12); shape(ctx,rgba('#F2F2EE',0.15),'#C9CED8',2); roundRect(ctx,x-26,y-h*niv,52,h*niv-4,10); ctx.fillStyle='#F2F2EE'; ctx.fill(); }); }
function maisPlant(x,yg,s,a=1,bt=0){ alpha(ctx,a,()=>{ ctx.strokeStyle='#7FB060'; ctx.lineWidth=10*s; ctx.beginPath(); ctx.moveTo(x,yg); ctx.lineTo(x,yg-420*s); ctx.stroke(); for(let k=0;k<5;k++){ const d=k%2?1:-1, yy=yg-80*s-k*70*s; ctx.save(); ctx.translate(x,yy); ctx.rotate(d*0.9); ctx.beginPath(); ctx.ellipse(d*70*s,0,80*s,10*s,0,0,6.283); shape(ctx,'#7FC48F','#A8D8A8',1.2); ctx.restore(); }
  ctx.beginPath(); ctx.ellipse(x+22*s,yg-210*s,18*s,50*s,0.2,0,6.283); shape(ctx,'#E0B64A','#F2D27A',1.5); if(bt>0.01) alpha(ctx,bt,()=>{ ctx.strokeStyle=C.teal; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(x,yg-210*s,80*s,0,6.283); ctx.stroke(); }); }); }
function rups(x,y,s,a=1,t=0){ alpha(ctx,a,()=>{ for(let k=0;k<6;k++) dot(ctx,x+k*12*s,y+Math.sin(t*4+k)*3*s,8*s,'#B8C870','#D8E0A0',1); dot(ctx,x+72*s,y,9*s,'#8A9A50'); }); }
function schaar(x,y,s,open,a=1,kleur=C.goud){ alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); ctx.strokeStyle=kleur; ctx.lineWidth=4; [-1,1].forEach(d=>{ ctx.save(); ctx.rotate(d*open*0.4); ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(70,d*4); ctx.stroke(); ctx.beginPath(); ctx.arc(-22,d*14,12,0,6.283); ctx.stroke(); ctx.restore(); }); ctx.restore(); }); }
function generatieRij(t,t0,dt,n,maten,x0,yg,s){ for(let g=0;g<n;g++){ const a=ramp(t,t0+g*dt,0.4); if(a<=0.01) continue; const x=x0+g*360; metaText(ctx,`generatie ${g+1}`,x,yg+50,C.grain,'center',22);
  for(let k=0;k<3;k++){ const m=maten[g]+[-0.08,0,0.08][k]; tomatenPlant(x-90+k*90,yg,0.5,m,{a,n:2,gekozen:k===2?ramp(t,t0+g*dt+dt*0.6,0.3):0}); } if(g<n-1) arrow(ctx,x+150,yg-150,x+210,yg-150,C.goud,3,12,ramp(t,t0+g*dt+dt*0.7,0.3)); } }

const SCENES={
// ---- cold open ----
s01(ctx,t,q){ kasDag(); const tB=q.at('bijt'), tW=q.at('wilde'), tE=q.at('erwt.'), tH=q.at('Hoe');
  persoon(ctx,'lotte',520,900,560,{outfit:'zomer',pose:'vasthouden',uit:t<tW?'blij':'verbaasd',kijk:1,t,hold:(c,x,y)=>{ tomaat(x+20,y-10,40,1); }});
  tomatenPlant(1100,800,1.1,0.9,{n:3}); alpha(ctx,ramp(t,tW-0.2,0.5),()=>{ ctx.fillStyle=rgba(C.bgSchema,0.94); roundRect(ctx,1360,260,440,360,18); ctx.fill(); ctx.strokeStyle=C.line; ctx.lineWidth=1.5; ctx.stroke();
    text(ctx,'wilde tomaat',1580,320,fTekst(34,700),C.text,'center'); tomaat(1500,460,10,1); tomaat(1540,470,9,1); tomaat(1520,440,10,1); tomaat(1660,460,48,ramp(t,tE,0.4));
    metaText(ctx,'± 1 cm',1520,540,C.grain,'center',22); alpha(ctx,ramp(t,tE,0.4),()=>metaText(ctx,'nu: ± 7 cm',1660,540,C.grain,'center',22)); });
  vraagteken(1100,300,ramp(t,tH,0.4)); },
// ---- titel ----
s03(ctx,t,q){ bg(ctx,'schema'); alpha(ctx,ramp(t,0.1,0.7),()=>{ text(ctx,'Door de mens gekozen',120,330,fTitel(92),C.text); text(ctx,'Hoe maak je een betere tomaat?',120,410,fTekst(44),C.text2); });
  [10,18,28,40,52].forEach((r,i)=>tomaat(1160+i*150,600-r*0.3,r,ramp(t,0.4+i*0.2,0.4))); for(let i=0;i<4;i++) arrow(ctx,1190+i*150+[10,18,28,40][i],600,1270+i*150-[18,28,40,52][i]*0.6,600,C.goud,2,10,ramp(t,0.6+i*0.2,0.3));
  metaText(ctx,'ONDERBOUW · KERNDOEL 32B · FILM 4',W-80,60,C.text2,'right',24); },
// ---- H1: veredeling en kruisen ----
s04(ctx,t,q){ const tZ=q.at('zaadjes'), tV=q.at('volgende'), tG=q.at('generatie',1), tN=q.at('natuurlijke'), tM=q.at('mens.'), tVe=q.at('veredeling.'), tK=q.at('kruisen.'), tGr=q.at('groot',3), tZi=q.at('ziekte'), tS=q.at('stuifmeel'), tP=q.at('paar'), tGe=q.at('verder.');
  if(t<tK-0.3){ bg(ctx,'schema'); ctx.strokeStyle=C.line; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(100,720); ctx.lineTo(1820,720); ctx.stroke();
    generatieRij(t,0.2,Math.max(1.2,(tG-0.2)/4),5,[0.15,0.3,0.45,0.6,0.8],260,720,1);
    alpha(ctx,ramp(t,tZ,0.4),()=>{ metaText(ctx,'de grootste: zaadjes opnieuw zaaien',W/2,150,C.goud,'center',26); });
    alpha(ctx,ramp(t,tVe-0.5,0.5),()=>{ ctx.fillStyle=rgba(C.bgSchema,0.94); roundRect(ctx,560,190,800,100,18); ctx.fill(); ctx.strokeStyle=C.goud; ctx.lineWidth=2; ctx.stroke(); text(ctx,'veredeling',W/2,258,fTitel(56),C.goud,'center'); });
    alpha(ctx,fadeIO(t,tN,tVe-0.5,0.4),()=>{ text(ctx,'net als natuurlijke selectie, maar de mens kiest',W/2,258,fTekst(38,700),C.text,'center'); }); return; }
  bg(ctx,'schema');
  alpha(ctx,ramp(t,tGr-0.3,0.4),()=>{ tomatenPlant(420,620,0.9,0.85,{n:2}); text(ctx,'groot',420,690,fTekst(34,700),C.goud,'center'); });
  alpha(ctx,ramp(t,tZi-0.3,0.4),()=>{ tomatenPlant(1500,620,0.9,0.2,{n:2}); text(ctx,'kan tegen ziekte',1500,690,fTekst(34,700),C.groen,'center'); });
  const u=ramp(t,tS,1.8); alpha(ctx,ramp(t,tS-0.2,0.3)*(1-ramp(t,tP-0.4,0.3)),()=>{ for(let k=0;k<6;k++) dot(ctx,lerp(480,1440,u)+hash(k)*20,330-Math.sin(u*Math.PI)*120+hash(k*3)*14,5,'#F2D27A'); });
  naamBij(ctx,'kruisen','',W/2,180,ramp(t,tK-0.3,0.4),'center',C.text);
  if(t>tP-0.4){ for(let k=0;k<5;k++){ const goed=k===1||k===3; alpha(ctx,ramp(t,tP-0.4+k*0.12,0.3)*(t>tGe&&!goed?0.35:1),()=>{ tomatenPlant(600+k*180,860,0.55,goed?0.8:[0.3,0,0.7,0,0.25][k],{n:2,ziek:goed?0:(k%2?0:0.6),gekozen:goed?ramp(t,tP+0.6,0.3):0}); }); }
    naamBij(ctx,'groot én sterk','',960,470,ramp(t,tP+0.6,0.4),'center',C.goud); } },
// ---- H2: fokken ----
s05(ctx,t,q){ bg(ctx,'schema'); const tF=q.at('fokken.'), tW=q.at('wolf.'), tK=q.at('kozen'), tR=q.at('rassen.'), tC=q.at('chihuahua'), tD=q.at('Duitse'), tS=q.at('soort.'), tKo=q.at('koeien'), tM=q.at('melk'), tN=q.at('nadelen.'), tMo=q.at('mopshond'), tWa=q.at('Waarom');
  if(t<tKo-0.3){ alpha(ctx,ramp(t,tW-0.3,0.4),()=>{ hond(380,620,1.5,'wolf'); text(ctx,'wolf',380,760,fTekst(34,700),C.text,'center'); });
    alpha(ctx,ramp(t,tK,0.4),()=>{ for(let i=0;i<3;i++) arrow(ctx,560,560,820,400+i*160,C.goud,3,14); });
    alpha(ctx,ramp(t,tC-0.3,0.4),()=>{ hond(1000,440,1.4,'chihuahua'); text(ctx,'chihuahua',1000,520,fTekst(30,600),C.text,'center'); });
    alpha(ctx,ramp(t,tD-0.3,0.4),()=>{ hond(1000,680,1.3,'herder'); text(ctx,'Duitse herder',1000,800,fTekst(30,600),C.text,'center'); });
    alpha(ctx,ramp(t,tR-1,0.4),()=>{ hond(1450,560,1.3,'mops'); text(ctx,'mopshond',1450,660,fTekst(30,600),C.text,'center'); });
    naamBij(ctx,'fokken','bij dieren',380,200,ramp(t,tF-0.3,0.4),'center',C.goud);
    alpha(ctx,ramp(t,tS-0.6,0.4),()=>{ ctx.fillStyle=rgba(C.bgSchema,0.94); roundRect(ctx,1220,170,560,90,16); ctx.fill(); text(ctx,'toch één soort',1500,230,fTekst(38,700),C.groen,'center'); }); return; }
  if(t<tN-0.3){ koeIcoon(560,600,1.4,1,0.8); melkfles(1250,700,300,ramp(t,tM,1.5)*0.9); melkfles(1450,700,300,0.4,ramp(t,tM,0.4)); metaText(ctx,'nu',1250,750,C.grain,'center',24); metaText(ctx,'vroeger',1450,750,C.grain,'center',24);
    naamBij(ctx,'meer melk','',1350,330,ramp(t,tM+0.5,0.4),'center',C.goud); return; }
  hond(760,620,2.6,'mops'); alpha(ctx,ramp(t,tMo,0.4),()=>{ naamBij(ctx,'heel korte neus','ademt slecht',1150,420,1,'left',C.koraal); ctx.strokeStyle=C.koraal; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(930,500,70,0,6.283); ctx.stroke(); });
  naamBij(ctx,'nadelen','',W/2,180,ramp(t,tN-0.3,0.4),'center',C.koraal); vraagteken(1500,640,ramp(t,tWa,0.4)); },
// ---- H2: inteelt ----
s07(ctx,t,q){ bg(ctx,'schema'); const tF=q.at('familie'), tZ=q.at('zwakke.'), tI=q.at('inteelt.');
  // kleine stamboom: ouders delen opa; zwak gen (koraal) komt dubbel
  const N=[[960,200],[700,400],[1220,400],[960,620]]; const zwak=[C.paars,C.paars,C.koraal,C.paars];
  alpha(ctx,ramp(t,0.2,0.4),()=>{ hond(N[0][0],N[0][1],0.7,'mops'); }); alpha(ctx,ramp(t,tF-0.3,0.4),()=>{ hond(N[1][0],N[1][1],0.7,'mops'); hond(N[2][0],N[2][1],0.7,'mops',1,-1); ctx.strokeStyle=C.line; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(960,250); ctx.lineTo(700,340); ctx.moveTo(960,250); ctx.lineTo(1220,340); ctx.moveTo(760,440); ctx.lineTo(960,560); ctx.moveTo(1160,440); ctx.lineTo(960,560); ctx.stroke(); text(ctx,'broer en zus',960,460,fTekst(28,600),C.text2,'center'); });
  alpha(ctx,ramp(t,tZ-1,0.4),()=>{ genStreep(N[1][0]-80,N[1][1]+60,160,22,1,-1,0,[C.paars,C.koraal,C.paars,C.paars]); genStreep(N[2][0]-80,N[2][1]+60,160,22,1,-1,0,[C.paars,C.koraal,C.paars,C.paars]); hond(N[3][0],N[3][1],0.9,'mops'); genStreep(880,700,160,22,1,-1,0,[C.paars,C.koraal,C.paars,C.paars]); genStreep(880,728,160,22,1,-1,0,[C.paars,C.koraal,C.paars,C.paars]); naamBij(ctx,'zwak gen: dubbel','',1100,720,1,'left',C.koraal); });
  alpha(ctx,ramp(t,tI-0.3,0.5),()=>{ ctx.fillStyle=rgba(C.bgSchema,0.94); roundRect(ctx,1340,150,440,100,18); ctx.fill(); ctx.strokeStyle=C.koraal; ctx.lineWidth=2; ctx.stroke(); text(ctx,'inteelt',1560,218,fTitel(56),C.koraal,'center'); }); },
// ---- H3: genetische modificatie ----
s08(ctx,t,q){ bg(ctx,'schema'); const tL=q.at('langzaam.'), tT=q.at('tientallen'), tG=q.at('modificatie',1), tO=q.at('Onderzoekers'), tP=q.at('plakken'), tM=q.at('maïs'), tB=q.at('bacterie.'), tR=q.at('rupsen'), tI=q.at('Is',3);
  if(t<tG-0.3){ generatieRij(t,-10,0.1,4,[0.2,0.35,0.5,0.65],330,700,1); pill(ctx,W/2,180,'tientallen jaren',C.grain,ramp(t,tT,0.4),32); return; }
  if(t<tM-0.3){ text(ctx,'genetische modificatie',W/2,170,fTitel(60),C.teal,'center');
    alpha(ctx,ramp(t,tO-0.3,0.4),()=>{ genStreep(460,420,1000,50,1,-1,0,[C.paars,'#A392D6',C.paars,'#6E5A9E',C.paars,'#A392D6',C.paars,'#6E5A9E']); naamBij(ctx,'genen van de plant','',960,530,1,'center',C.paars); });
    const u=ramp(t,tP,1.6); alpha(ctx,ramp(t,tP-0.3,0.4),()=>{ bacterieDeling2(1500,260,1.4); const gx=lerp(1500,960,u), gy=lerp(300,420,u); roundRect(ctx,gx-55,gy,110,50,6); shape(ctx,rgba(C.teal,0.7),lighten(C.teal,0.3),2); naamBij(ctx,'gen van een ander organisme','',1500,190,1-u,'center',C.teal); });
    if(u>0.95) schaar(800,380,1,0.2,ramp(t,tP+1.3,0.3)); return; }
  // mais met bt-gen, rupsen
  maisPlant(700,820,1.2,1,ramp(t,tB,0.4)); naamBij(ctx,'maïs','',700,880-40,1,'center',C.text);
  alpha(ctx,ramp(t,tB-0.3,0.4),()=>{ genStreep(1100,240,520,34,1,-1,0,[C.paars,C.paars,C.teal,C.paars,C.paars]); naamBij(ctx,'+ gen van een bacterie','',1360,330,1,'center',C.teal); });
  const r=ramp(t,tR,1.5); rups(1200,620,1.4,1-r*0.65,t); rups(1380,680,1.2,1-r*0.65,t); alpha(ctx,ramp(t,tR+0.5,0.4),()=>naamBij(ctx,'bepaalde rupsen kunnen er niet tegen','',1320,760,1,'center',C.text));
  vraagteken(1600,500,ramp(t,tI,0.4)); },
// ---- H3: antwoord, regels, nadenken ----
s10(ctx,t,q){ bg(ctx,'schema'); const tV=q.at('veredelen'), tG=q.at('modificatie'), tS=q.at('soort.'), tE=q.at('Europa'), tVe=q.at('veilig?'), tVo=q.at('voordeel'), tN=q.at('nadenken.');
  if(t<tE-0.3){ kaart(180,200,700,500,C.goud,ramp(t,tV-0.3,0.4)); kaart(1040,200,700,500,C.teal,ramp(t,tG-0.3,0.4));
    alpha(ctx,ramp(t,tV-0.3,0.4),()=>{ text(ctx,'veredelen / fokken',530,270,fTekst(38,700),C.goud,'center'); text(ctx,'kiezen uit wat er al is',530,330,fTekst(30,600),C.text,'center'); for(let k=0;k<3;k++) tomatenPlant(400+k*130,620,0.5,[0.3,0.5,0.8][k],{n:2,gekozen:k===2?1:0}); });
    alpha(ctx,ramp(t,tG-0.3,0.4),()=>{ text(ctx,'genetische modificatie',1390,270,fTekst(38,700),C.teal,'center'); text(ctx,'de genen zelf veranderen',1390,330,fTekst(30,600),C.text,'center'); genStreep(1170,450,440,40,1,-1,0,[C.paars,C.paars,C.teal,C.paars,C.paars]); });
    alpha(ctx,ramp(t,tS-1,0.4),()=>naamBij(ctx,'soms met een gen van een andere soort','',1390,560,1,'center',C.teal)); return; }
  persoon(ctx,'kim',400,880,520,{pose:'denk',uit:'denkt',t}); persoon(ctx,'lotte',1540,880,500,{outfit:'zomer',pose:'denk',uit:'denkt',kijk:-1,t});
  alpha(ctx,ramp(t,tE-0.2,0.4),()=>{ ctx.fillStyle=rgba(C.bgSchema,0.94); roundRect(ctx,640,180,640,90,16); ctx.fill(); text(ctx,'Europa: strenge regels',W/2,238,fTekst(38,700),C.text,'center'); });
  pill(ctx,W/2,380,'Is het veilig?',C.goud,ramp(t,tVe-0.2,0.4),34); pill(ctx,W/2,480,'Wie heeft er voordeel van?',C.goud,ramp(t,tVo-0.4,0.4),34);
  alpha(ctx,ramp(t,tN-0.6,0.4),()=>text(ctx,'denk zelf na',W/2,620,fTitel(52),C.groen,'center')); },
// ---- uitdaging: CRISPR ----
s11(ctx,t,q){ bg(ctx,'schema'); const tP=q.at('precies'), tS=q.at('schaar:'), tK=q.at('knipt'), tL=q.at('letter');
  const lt=['A','T','G','C','C','A','T','G','A','C','T','G','G','A'];
  lt.forEach((L,i)=>{ const x=320+i*92, y=480; const split=ramp(t,tK,0.6)*(i>=7?40:-40); roundRect(ctx,x-38+split,y-40,76,80,10); const nieuw=i===7&&t>tL; shape(ctx,rgba(nieuw?C.goud:C.paars,0.45),nieuw?C.goud:'#A392D6',1.5); text(ctx,nieuw?'T':L,x+split,y+14,fTekst(40,700),C.text,'center'); });
  alpha(ctx,ramp(t,tS-0.3,0.4),()=>{ schaar(320+6.5*92,300,1.3,1-ramp(t,tK,0.4)); naamBij(ctx,'CRISPR','moleculaire schaar',320+6.5*92,220,1,'center',C.goud); });
  alpha(ctx,ramp(t,tL,0.5),()=>naamBij(ctx,'één letter veranderd','',320+7*92,620,1,'center',C.goud)); metaText(ctx,'vergroot · DNA-letters',60,CAPTION_Y-14,C.text2,'left',22); },
// ---- samenvatting ----
s12(ctx,t,q){ bg(ctx,'schema'); const tV=q.at('Veredelen'), tG=q.at('Genetische'), tL=q.at('Lotte?'), tD=q.at('duizenden');
  if(t<tL-0.3){ alpha(ctx,ramp(t,tV-0.2,0.4),()=>{ kaart(180,200,700,460,C.goud,1); text(ctx,'veredelen en fokken',530,270,fTekst(38,700),C.goud,'center'); tomatenPlant(420,560,0.55,0.8,{n:2,gekozen:1}); hond(680,500,0.9,'herder'); text(ctx,'de mens kiest',530,620,fTekst(32,600),C.text,'center'); });
    alpha(ctx,ramp(t,tG-0.2,0.4),()=>{ kaart(1040,200,700,460,C.teal,1); text(ctx,'genetische modificatie',1390,270,fTekst(38,700),C.teal,'center'); genStreep(1170,420,440,40,1,-1,0,[C.paars,C.paars,C.teal,C.paars,C.paars]); text(ctx,'genen zelf veranderen',1390,620,fTekst(32,600),C.text,'center'); }); return; }
  kasDag(); persoon(ctx,'lotte',760,900,560,{outfit:'zomer',pose:'vasthouden',uit:'lacht',kijk:1,t,hold:(c,x,y)=>tomaat(x+20,y-10,40,1)});
  alpha(ctx,ramp(t,tL+0.4,0.5),()=>{ ctx.fillStyle=rgba(C.bgSchema,0.94); roundRect(ctx,1100,280,620,120,18); ctx.fill(); ctx.strokeStyle=C.goud; ctx.lineWidth=2; ctx.stroke(); text(ctx,'gekozen door mensen',1410,335,fTekst(38,700),C.goud,'center'); metaText(ctx,'duizenden jaren lang',1410,380,C.grain,'center',24); }); },
// ---- eindkaart ----
s13(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Onthoud',120,200,fTitel(80),C.text);
  const K=['Bij veredelen en fokken kiest de mens de beste planten en dieren.','Dat gaat generatie na generatie.','Bij genetische modificatie veranderen onderzoekers zelf de genen.'];
  K.forEach((s,i)=>alpha(ctx,ramp(t,0.4+i*0.8,0.6),()=>{ const y=300+i*170; roundRect(ctx,120,y,1680,140,14); shape(ctx,rgba(C.bgSchema,0.95),i===0?C.goud:C.line,i===0?1.5:1); text(ctx,String(i+1),185,y+90,fTitel(60),C.goud,'center'); ctx.font=fTekst(38); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,s,260,y+84,1500,46); }));
  metaText(ctx,'biologie bij kamiel · stem: roos (elevenlabs) · versie 1.1 · oktober 2026',W/2,CAPTION_Y-10,C.text2,'center',22); },
};
function bacterieDeling2(x,y,s){ roundRect(ctx,x-50*s,y-18*s,100*s,36*s,18*s); shape(ctx,rgba(C.teal,0.45),lighten(C.teal,0.35),1.6); }
