// ===== 32C film 4 — Ziek worden en beter worden: scènes =====
// Kleuren: ziekteverwekker (waterpokkenvirus) koraal; witte bloedcellen lichtgrijs-wit; antistoffen teal (informatie, Y-vormpjes);
// geheugencellen paars-loos → goud (onthouden); vaccin = oker spuitje met onschadelijk stukje (koraal maar gedimd, zonder 'staart').
// Rode draad: Teun met waterpokken (Macro-dag, woonkamer) en een antistoffen-grafiek "eerste keer / tweede keer".

function vlekjes(A,t,n=14,a=1){ if(!A||!A.hoofd) return; alpha(ctx,a,()=>{ const r=A.hoofd.r; for(let i=0;i<n;i++){ const an=hash(i*2.3)*6.283, d=r*(0.5+hash(i*5.1)*0.35); dot(ctx,A.hoofd.x+Math.cos(an)*d*0.9,A.hoofd.y+Math.sin(an)*d*0.8,r*0.045,rgba('#D04A3C',0.8)); } }); }
function vlekjesLijf(x,y,w,h,n,a=1){ alpha(ctx,a,()=>{ for(let i=0;i<n;i++) dot(ctx,x+hash(i*3.7)*w,y+hash(i*1.9)*h,4,rgba('#D04A3C',0.85)); }); }
function woonkamer(){ ctx.fillStyle='#4A5A78'; ctx.fillRect(0,0,W,H); ctx.fillStyle='#5A6A88'; ctx.fillRect(0,0,W,40); ctx.fillStyle='#7A6450'; ctx.fillRect(0,820,W,H-820);
  roundRect(ctx,1300,160,420,300,10); shape(ctx,'#8EB4D4','#C9CED8',8); ctx.fillStyle='#5F8A50'; ctx.fillRect(1306,380,408,74); dot(ctx,1400,240,30,C.goud);
  // bank
  roundRect(ctx,180,600,900,180,30); shape(ctx,'#B5574A','#C9706A',2); roundRect(ctx,140,560,80,240,24); shape(ctx,'#A04A40','#B5574A',2); roundRect(ctx,1040,560,80,240,24); shape(ctx,'#A04A40','#B5574A',2); ctx.fillStyle='#6B4A30'; ctx.fillRect(220,780,20,40); ctx.fillRect(1020,780,20,40); }
function pokVirus(x,y,s=1,a=1,t=0){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.beginPath(); ctx.arc(x,y,14*s,0,6.283); shape(ctx,rgba(C.koraal,0.6),lighten(C.koraal,0.3),1.4); for(let k=0;k<10;k++){ const an=k*0.628+t*0.2; dot(ctx,x+Math.cos(an)*17*s,y+Math.sin(an)*17*s,2.6*s,C.koraal); } dot(ctx,x,y,5*s,rgba(C.paars,0.8)); }); }
function witteCel(x,y,r,a=1,t=0,seed=1){ if(a<=0.01) return; alpha(ctx,a,()=>{ blob(ctx,x,y,r,r*0.92,0.08,seed,t); shape(ctx,rgba('#E6E9EE',0.75),'#F2F2EE',1.8); ctx.beginPath(); ctx.ellipse(x-r*0.15,y,r*0.35,r*0.22,0.5,0,6.283); shape(ctx,rgba(C.kern,0.7),C.kernR,1.2); }); }
function antistof(x,y,s=1,a=1,rot=0,k=C.teal){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.rotate(rot); ctx.strokeStyle=k; ctx.lineWidth=3.5*s; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(0,10*s); ctx.lineTo(0,0); ctx.lineTo(-7*s,-9*s); ctx.moveTo(0,0); ctx.lineTo(7*s,-9*s); ctx.stroke(); ctx.restore(); }); }
function geheugenCel(x,y,r,a=1){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.beginPath(); ctx.arc(x,y,r,0,6.283); shape(ctx,rgba(C.goud,0.35),C.goud,2); ctx.beginPath(); ctx.arc(x,y,r*0.45,0,6.283); shape(ctx,rgba(C.kern,0.7),C.kernR,1.2); }); }
function spuitje(x,y,s=1,a=1,rot=0){ alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.rotate(rot); ctx.scale(s,s); roundRect(ctx,-80,-18,160,36,8); shape(ctx,rgba('#E6E9EE',0.4),'#C9CED8',2); ctx.fillStyle=rgba(C.oker,0.6); ctx.fillRect(-60,-14,90,28); ctx.fillStyle='#9AA3B2'; ctx.fillRect(-110,-6,30,12); ctx.fillRect(-120,-22,12,44); ctx.strokeStyle='#C9CED8'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(80,0); ctx.lineTo(140,0); ctx.stroke(); ctx.restore(); }); }
function grafiekAS(x,y,w,h,u1,u2,a=1){ alpha(ctx,a,()=>{ ctx.strokeStyle=C.line; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(x,y-h); ctx.lineTo(x,y); ctx.lineTo(x+w,y); ctx.stroke(); metaText(ctx,'antistoffen',x,y-h-14,C.grain,'left',22); metaText(ctx,'tijd →',x+w,y+34,C.grain,'right',22);
  const curve=(x0,len,top,del,u,k)=>{ ctx.strokeStyle=k; ctx.lineWidth=4; ctx.beginPath(); for(let i=0;i<=60*u;i++){ const v=i/60, px=x0+v*len; const g=v<del?0:Math.min(1,(v-del)/0.3)*Math.max(0.35,1-Math.max(0,v-del-0.3)*1.2); const py=y-g*top; i?ctx.lineTo(px,py):ctx.moveTo(px,py); } ctx.stroke(); };
  curve(x+10,w*0.45,h*0.35,0.35,u1,C.teal); curve(x+w*0.52,w*0.45,h*0.92,0.06,u2,C.goud); }); }

const SCENES={
// ---- cold open ----
s01(ctx,t,q){ woonkamer(); const tVl=q.at('vlekjes.'), tWa=q.at('waterpokken.'), tNo=q.at('Noor',2), tSp=q.at('speelt'), tKr=q.at('Krijgt');
  const A=persoon(ctx,'kind',620,800,240,{uit:'bezorgd',pose:'staan',t,kijk:1}); vlekjes(A,t,16,ramp(t,tVl-0.3,0.5)); vlekjesLijf(585,640,70,90,14,ramp(t,tVl-0.3,0.5));
  pill(ctx,620,450,'waterpokken',C.koraal,ramp(t,tWa,0.4),28);
  persoon(ctx,'noor',900,840,340,{outfit:'zomer',pose:t>tSp?'zwaai':'staan',uit:'blij',t,kijk:-1,a:ramp(t,tNo-0.3,0.5)});
  alpha(ctx,ramp(t,tNo,0.4),()=>{ roundRect(ctx,1280,520,460,200,16); shape(ctx,rgba(C.bgSchema,0.92),C.goud,1.5); metaText(ctx,'noor, toen ze klein was',1510,560,C.grain,'center',20); const B=persoon(ctx,'kind',1420,700,120,{uit:'neutraal',t:0,kijk:1}); vlekjes(B,0,10,1); text(ctx,'had ook waterpokken',1580,650,fTekst(26,600),C.text,'center'); });
  alpha(ctx,ramp(t,tKr,0.4),()=>text(ctx,'?',900,380,fTitel(120),C.goud,'center')); },
// ---- titel ----
s03(ctx,t,q){ bg(ctx,'schema'); alpha(ctx,ramp(t,0.1,0.7),()=>{ text(ctx,'Ziek worden en beter worden',120,330,fTitel(88),C.text); text(ctx,'Wat doet een vaccin?',120,410,fTekst(44),C.text2); });
  spuitje(1350,600,1.6,ramp(t,0.4,0.5),-0.3); pokVirus(1150,750,2.4,ramp(t,0.8,0.5),t); witteCel(1650,760,60,ramp(t,1.1,0.5),t); antistof(1560,700,2,ramp(t,1.3,0.4),0.4);
  metaText(ctx,'ONDERBOUW · KERNDOELEN · 32C · FILM 4',W-80,60,C.text2,'right',24); },
// ---- H1: ziek worden ----
s04(ctx,t,q){ const tSc=q.at('school.'), tNi=q.at('niesde,'), tIn=q.at('druppeltjes'), tNe=q.at('neus'), tHa=q.at('handen,'), tEt=q.at('eten'), tWo=q.at('wondje.'), tVe=q.at('vermenigvuldigen.'), tInf=q.at('infectie.'), tNi2=q.at('niets.'), tWe=q.at('weken'), tKl=q.at('klachten.');
  if(t<tNe-0.3){ schoolplein(); persoon(ctx,'bilal',800,820,330,{outfit:'winter',pose:'denk',uit:'neutraal',t,kijk:1}); const A=persoon(ctx,'kind',1150,820,220,{uit:'neutraal',t,kijk:-1});
    alpha(ctx,ramp(t,tNi,0.3),()=>{ for(let i=0;i<26;i++){ const u=clamp((t-tNi)*0.5+hash(i)*0.2,0,1); const x=840+u*300*(0.6+hash(i*3)*0.6), y=560+(hash(i*5)-0.5)*120*u; dot(ctx,x,y,4+hash(i)*3,rgba(C.teal,0.6*(1-0.4*u))); if(i%5===0) pokVirus(x,y,0.4,1,t); } });
    pill(ctx,1150,500,'ademt druppeltjes in',C.koraal,ramp(t,tIn,0.4),26); return; }
  bg(ctx,'schema');
  if(t<tNi2-0.3){ persoon(ctx,'kind',560,880,520,{uit:'neutraal',t,kijk:1});
    const P=[['neus en mond',tNe,560,470],['handen',tHa,700,640],['eten',tEt,560,520],['wondje',tWo,480,790]];
    P.forEach(([n,tt,x,y],i)=>{ alpha(ctx,ramp(t,tt,0.4),()=>{ const lx=980, ly=260+i*110; arrow(ctx,lx-20,ly,x+40,y,C.koraal,3,14); text(ctx,n,lx,ly+12,fTekst(34,700),C.koraal,'left'); pokVirus(lx+300,ly,1,1,t); }); });
    alpha(ctx,ramp(t,tVe,0.4),()=>{ const n=Math.min(40,Math.floor(Math.pow(2,clamp((t-tVe)*1.6,0,5.3)))); for(let i=0;i<n;i++) pokVirus(1400+hash(i*1.7)*360,620+hash(i*3.3)*200,0.7,1,t); });
    naamBij(ctx,'infectie','ziekteverwekkers vermenigvuldigen zich',1580,580,ramp(t,tInf,0.4),'center',C.koraal); return; }
  // tijdlijn: eerst niets, dan klachten
  ctx.strokeStyle=C.line; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(200,640); ctx.lineTo(1720,640); ctx.stroke();
  for(let d=0;d<=21;d+=7){ const x=200+d/21*1520; ctx.beginPath(); ctx.moveTo(x,630); ctx.lineTo(x,650); ctx.stroke(); metaText(ctx,d===0?'besmet':`dag ${d}`,x,690,C.grain,'center',22); }
  const u=ramp(t,tNi2-0.2,4); for(let i=0;i<Math.floor(2+u*40);i++){ const d=hash(i*2.1)*u*14; pokVirus(200+d/21*1520,560-hash(i*3.7)*Math.pow(d/14,2)*300,0.7,1,t); }
  pill(ctx,560,380,'je merkt nog niets',C.text2,ramp(t,tNi2,0.4)*(1-ramp(t,tKl,0.3)),28);
  alpha(ctx,ramp(t,tWe,0.4),()=>{ ctx.fillStyle=rgba(C.koraal,0.25); ctx.fillRect(200+14/21*1520,200,6/21*1520,430); text(ctx,'± 2 weken',200+7/21*1520,780,fTekst(34,700),C.text,'center'); });
  pill(ctx,200+17/21*1520,260,'klachten',C.koraal,ramp(t,tKl,0.4),30); },
// ---- H2: afweer en geheugen ----
s05(ctx,t,q){ const tAf=q.at('afweer.'), tWi=q.at('witte'), tRu=q.at('ruimen'), tAn=q.at('antistoffen.'), tPa=q.at('passen'), tPl=q.at('plakken'), tVi=q.at('vinden'), tWe=q.at('week.'), tTi=q.at('tijdje'), tGe=q.at('geheugencellen'), tTe=q.at('terug,'), tMe=q.at('meteen'), tNi=q.at('niet'), tNo=q.at('Noor');
  if(t<tWe-0.3){ bg(ctx,'micro'); // bloedvat
    ctx.fillStyle=rgba('#B5574A',0.25); ctx.fillRect(0,260,W,440); ctx.strokeStyle=rgba('#D07A6C',0.8); ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(0,260); ctx.lineTo(W,260); ctx.moveTo(0,700); ctx.lineTo(W,700); ctx.stroke();
    for(let i=0;i<12;i++){ const x=(hash(i*2)*W+t*60)%W; ctx.beginPath(); ctx.ellipse(x,300+hash(i*3)*360,26,12,0,0,6.283); shape(ctx,rgba('#C9503C',0.6),'#E07A5F',1); }
    const pv=[]; for(let i=0;i<10;i++) pv.push([700+hash(i*1.3)*900,330+hash(i*2.9)*300]);
    pv.forEach(([x,y],i)=>{ const op=ramp(t,tRu+i*0.15,0.6)*(i<4?1:0); const geplakt=t>tPl; pokVirus(x,y,1.2,1-op,t); if(geplakt&&op<1) for(let k=0;k<3;k++) antistof(x+Math.cos(k*2.1)*22,y+Math.sin(k*2.1)*22,1,ramp(t,tPl+i*0.05,0.4),k*2.1+Math.PI/2); });
    alpha(ctx,ramp(t,tWi,0.5),()=>{ witteCel(lerp(300,620,ramp(t,tWi,2)),480,70,1,t,1); witteCel(lerp(200,560,ramp(t,tVi,2)),360,56,1,t,2); });
    naamBij(ctx,'witte bloedcellen','ruimen op',380,200,ramp(t,tWi,0.4),'center',C.text);
    alpha(ctx,ramp(t,tAn,0.4)*(1-ramp(t,tPl,0.4)),()=>{ for(let i=0;i<8;i++) antistof(1300+hash(i)*300,780+hash(i*3)*60-40,1.4,1,hash(i)*0.6-0.3); });
    naamBij(ctx,'antistoffen','passen op één soort',1450,200,ramp(t,tAn,0.4),'center',C.teal); meta32('vergroot · niet op schaal'); return; }
  bg(ctx,'schema'); grafiekAS(220,760,1480,480,ramp(t,tWe-0.2,1.8),ramp(t,tTe,1.8),1);
  pill(ctx,520,220,'eerste keer: ± een week, je bent ziek',C.teal,ramp(t,tTi,0.4),26);
  alpha(ctx,ramp(t,tGe,0.4),()=>{ for(let i=0;i<4;i++) geheugenCel(900+i*50,640-i%2*40,20,1); naamBij(ctx,'geheugencellen','onthouden',1000,560,1,'center',C.goud); });
  pill(ctx,1400,220,'tweede keer: meteen veel',C.goud,ramp(t,tMe,0.4),26); pill(ctx,1400,300,'niet ziek',C.groen,ramp(t,tNi,0.4),28);
  alpha(ctx,ramp(t,tNo,0.4),()=>persoon(ctx,'noor',1750,780,240,{outfit:'zomer',pose:'zwaai',uit:'blij',t,kijk:-1})); },
// ---- H2: vraag over het vaccin ----
s06(ctx,t,q){ bg(ctx,'schema'); const tOe=q.at('oefenen,'), tVa=q.at('vaccin.'), tWa=q.at('Wat',2);
  alpha(ctx,ramp(t,tOe,0.4),()=>{ for(let i=0;i<5;i++) geheugenCel(600+i*70,520+(i%2)*40,26,1); text(ctx,'oefenen zonder ziek te worden?',W/2,300,fTitel(52),C.text,'center'); });
  spuitje(1250,540,2,ramp(t,tVa,0.5),-0.2); alpha(ctx,ramp(t,tWa,0.4),()=>text(ctx,'?',1500,420,fTitel(120),C.goud,'center')); },
// ---- H2: vaccin, Jenner ----
s08(ctx,t,q){ const tSt=q.at('stukje,'), tVz=q.at('verzwakte'), tLe=q.at('leert'), tGe=q.at('geheugencellen.'), tNi=q.at('niet'), tAr=q.at('arm'), tJ=q.at('1796'), tPo=q.at('pokken.'), tKi=q.at('kinderen'), tVe=q.at('verdwenen.');
  bg(ctx,'schema');
  if(t<tJ-0.3){ spuitje(420,300,1.4,1,0);
    alpha(ctx,ramp(t,tSt,0.4),()=>{ vak(160,420,500,320,'stukje',C.oker,1,'onschadelijk'); for(let k=0;k<5;k++) dot(ctx,330+k*36,600,6,C.koraal); });
    alpha(ctx,ramp(t,tVz,0.4),()=>{ vak(720,420,500,320,'verzwakt',C.oker,1,'maakt je niet ziek'); pokVirus(970,600,2.2,0.45,t); });
    alpha(ctx,ramp(t,tLe,0.4),()=>{ witteCel(1450,520,70,1,t); for(let i=0;i<3;i++) antistof(1560+i*30,480+i*20,1.6,1,0.4); });
    alpha(ctx,ramp(t,tGe,0.4),()=>{ for(let i=0;i<4;i++) geheugenCel(1400+i*70,700,22,1); naamBij(ctx,'geheugencellen','',1500,790,1,'center',C.goud); });
    pill(ctx,1500,260,'niet ziek · soms even een zere arm',C.groen,ramp(t,tAr,0.4),26); return; }
  pill(ctx,W/2,120,'het jaar 1796 · eerste vaccin, tegen pokken',C.grain,ramp(t,tJ,0.4),28);
  persoon(ctx,'kim',360,860,380,{pose:'wijs',uit:'neutraal',t,kijk:1}); spuitje(640,520,1.2,ramp(t,tJ,0.4),-0.3);
  alpha(ctx,ramp(t,tKi,0.4),()=>{ roundRect(ctx,860,260,880,280,16); shape(ctx,rgba(C.bgSchema,0.92),C.groen,2); text(ctx,'Nederland: vaccins voor kinderen',1300,320,fTekst(34,700),C.text,'center'); for(let i=0;i<13;i++) spuitje(940+(i%7)*120,410+Math.floor(i/7)*80,0.35,ramp(t,tKi+i*0.08,0.3),0); text(ctx,'tegen meer dan tien ziektes',1300,525,fTekst(30,600),C.groen,'center'); });
  alpha(ctx,ramp(t,tVe,0.4),()=>{ ctx.beginPath(); ctx.arc(1300,700,90,0,6.283); shape(ctx,'#2E6FBF','#5BA4C9',2); ctx.fillStyle=rgba(C.groen,0.6); ctx.beginPath(); ctx.ellipse(1280,690,40,24,0.3,0,6.283); ctx.fill(); pokVirus(1460,660,1.4,1,t); crossOut(ctx,1460,660,30,1); text(ctx,'pokken: weg van de aarde',1300,840-20,fTekst(30,700),C.groen,'center'); }); },
// ---- H2 uitdaging: groepsbescherming ----
s09(ctx,t,q){ bg(ctx,'schema'); const tBa=q.at('baby'), tBij=q.at('bijna'), tVe=q.at('verspreiden.'), tGr=q.at('groepsbescherming.');
  const N=48, cx=W/2, cy=470; const pos=[]; for(let r=0;r<6;r++) for(let c=0;c<8;c++) pos.push([cx-490+c*140,cy-260+r*100]);
  const babyI=27; const gevac=i=>i!==babyI&&hash(i*3.3)>0.08;
  pos.forEach(([x,y],i)=>{ const isB=i===babyI; const k=isB?C.goud:(t>tBij&&gevac(i)?C.groen:'#9AA3B2'); ctx.beginPath(); ctx.arc(x,y-24,14,0,6.283); shape(ctx,rgba(k,0.7),k,1.5); roundRect(ctx,x-16,y-8,32,40,10); shape(ctx,rgba(k,0.5),k,1.5); });
  alpha(ctx,ramp(t,tBa,0.4),()=>{ arrow(ctx,1560,pos[babyI][1]-20,pos[babyI][0]+30,pos[babyI][1]-10,C.goud,3,14); text(ctx,'baby: te jong',1580,pos[babyI][1]-20,fTekst(34,700),C.goud,'left'); text(ctx,'voor een vaccin',1580,pos[babyI][1]+22,fTekst(34,700),C.goud,'left'); });
  alpha(ctx,ramp(t,tBij,0.4),()=>{ metaText(ctx,'groen = gevaccineerd',cx+560,cy-250,C.groen,'left',22); });
  alpha(ctx,ramp(t,tVe-0.6,0.4),()=>{ const u=ramp(t,tVe-0.6,2); const p0=pos[0]; pokVirus(lerp(p0[0]-80,p0[0]+120,u),p0[1]-40,1.2,1-0.8*ramp(t,tVe+1.2,0.6),t); crossOut(ctx,p0[0]+140,p0[1]-40,24,ramp(t,tVe+1,0.4)); });
  haak(ctx,cx-520,cx+520,cy+330,'groepsbescherming',C.groen,ramp(t,tGr,0.5)); },
// ---- H3: koorts, vraag ----
s10(ctx,t,q){ woonkamer(); const tKo=q.at('koorts.'), tNe=q.at('negenendertig'), tSl=q.at('slecht?');
  ctx.save(); ctx.translate(560,610); ctx.rotate(-Math.PI/2); const A=persoon(ctx,'kind',0,0,230,{uit:'bezorgd',t:0}); ctx.restore(); roundRect(ctx,620,560,380,60,20); shape(ctx,'#4A6FA0','#6A8FC0',1.5);
  alpha(ctx,ramp(t,tKo,0.4),()=>{ thermo(1400,640,320,ramp(t,tKo,1.5)*0.78); }); pill(ctx,1400,250,'39 °C',C.koraal,ramp(t,tNe,0.4),34);
  alpha(ctx,ramp(t,tSl,0.4),()=>text(ctx,'?',1620,460,fTitel(110),C.goud,'center')); },
// ---- H3: behandelen ----
s12(ctx,t,q){ const tHe=q.at('helpt'), tGr=q.at('groeien'), tHo=q.at('hoog,'), tDo=q.at('dokter.'), tRu=q.at('Rust,'), tDr=q.at('drinken.'), tPa=q.at('paracetamol'), tDoo=q.at('doodt'), tAf=q.at('afweer.'), tBa=q.at('bacteriën'), tVi=q.at('virus,');
  if(t<tRu-0.3){ bg(ctx,'schema'); thermo(360,720,420,0.78);
    alpha(ctx,ramp(t,tGr,0.4),()=>{ vak(620,200,520,460,'37 °C',C.teal,1); vak(1200,200,520,460,'39 °C',C.koraal,1); const n1=Math.floor(4+clamp((t-tGr)*3,0,1)*12), n2=Math.floor(4+clamp((t-tGr)*3,0,1)*4); for(let i=0;i<n1;i++) pokVirus(680+hash(i*1.3)*400,320+hash(i*2.1)*300,0.8,1,t); for(let i=0;i<n2;i++) pokVirus(1260+hash(i*1.7)*400,320+hash(i*2.9)*300,0.8,1,t); witteCel(1460,470,50,1,t); metaText(ctx,'ziekteverwekkers groeien',880,700,C.grain,'center',20); metaText(ctx,'groeien minder goed',1460,700,C.grain,'center',20); });
    pill(ctx,1160,820-40,'erg hoog of lang? naar de dokter',C.goud,ramp(t,tHo,0.4),28); return; }
  if(t<tBa-0.3){ woonkamer(); ctx.save(); ctx.translate(560,610); ctx.rotate(-Math.PI/2); persoon(ctx,'kind',0,0,230,{uit:'neutraal',t:0}); ctx.restore(); roundRect(ctx,620,560,380,60,20); shape(ctx,'#4A6FA0','#6A8FC0',1.5);
    pill(ctx,800,420,'rust',C.groen,ramp(t,tRu,0.4),30); alpha(ctx,ramp(t,tDr,0.4),()=>{ glasWater(1060,700,1.3); pill(ctx,1060,560,'veel drinken',C.teal,1,28); });
    alpha(ctx,ramp(t,tPa,0.4),()=>{ roundRect(ctx,1250,500,520,320,16); shape(ctx,rgba(C.bgSchema,0.96),C.line,1.5); pil(ctx,1380,580,2.2,C.text2); text(ctx,'paracetamol',1560,590,fTekst(32,700),C.text,'center'); text(ctx,'koorts en pijn minder',1510,660,fTekst(30,600),C.groen,'center'); text(ctx,'doodt het virus niet',1510,710,fTekst(30,600),C.koraal,'center'); alpha(ctx,ramp(t,tAf,0.4),()=>text(ctx,'dat doet je afweer',1510,770,fTekst(30,700),C.goud,'center')); });
    return; }
  bg(ctx,'schema'); pil(ctx,W/2,220,3,C.groen); text(ctx,'antibioticum',W/2,300,fTekst(36,700),C.text,'center');
  vak(260,380,620,360,'bacteriën',C.teal,1); bact2(570,560,ramp(t,tBa,0.6)); text(ctx,'werkt',570,700,fTekst(32,700),C.groen,'center');
  alpha(ctx,ramp(t,tVi,0.4),()=>{ vak(1040,380,620,360,'virus (waterpokken)',C.koraal,1); pokVirus(1350,560,2.4,1,t); text(ctx,'werkt niet',1350,700,fTekst(32,700),C.koraal,'center'); }); },
// ---- samenvatting ----
s13(ctx,t,q){ bg(ctx,'schema'); const tAf=q.at('afweer'), tOn=q.at('onthoudt'), tVa=q.at('vaccin'), tVo=q.at('voorkomt');
  const K=[['ziek worden','binnenkomen + vermenigvuldigen',C.koraal,0.2],['beter worden','afweer ruimt op',C.teal,tAf],['onthouden','geheugencellen',C.goud,tOn],['vaccin','oefenen zonder ziek te zijn',C.oker,tVa]];
  K.forEach(([n,m,k,tt],i)=>{ const x=130+i*430; alpha(ctx,ramp(t,tt-0.2,0.4),()=>{ roundRect(ctx,x,240,390,420,16); shape(ctx,rgba(C.bgSchema,0.95),k,2); text(ctx,n,x+195,320,fTekst(38,700),k,'center'); metaText(ctx,m,x+195,360,C.grain,'center',19);
    if(i===0) for(let j=0;j<6;j++) pokVirus(x+120+hash(j)*150,480+hash(j*3)*100,1,1,t); if(i===1){ witteCel(x+195,520,60,1,t); antistof(x+280,470,1.6,1,0.5); } if(i===2) for(let j=0;j<4;j++) geheugenCel(x+120+j*50,520,22,1); if(i===3) spuitje(x+195,520,1,1,-0.2); }); });
  haak(ctx,130,1800,690,'een vaccin voorkomt dat je ziek wordt',C.groen,ramp(t,tVo,0.5)); },
// ---- eindkaart ----
s14(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Onthoud',120,200,fTitel(80),C.text);
  const K=['Je wordt ziek als een ziekteverwekker zich in je vermenigvuldigt.','Je afweer ruimt hem op en onthoudt hem.','Met een vaccin oefent je afweer zonder dat je ziek wordt.'];
  K.forEach((s,i)=>alpha(ctx,ramp(t,0.4+i*0.8,0.6),()=>{ const y=300+i*170; roundRect(ctx,120,y,1680,140,14); shape(ctx,rgba(C.bgSchema,0.95),i===0?C.goud:C.line,i===0?1.5:1); text(ctx,String(i+1),185,y+90,fTitel(60),C.goud,'center'); ctx.font=fTekst(38); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,s,260,y+84,1500,46); }));
  metaText(ctx,'biologie bij kamiel · stem: roos (elevenlabs) · versie 1.1 · oktober 2026',W/2,CAPTION_Y-10,C.text2,'center',22); },
};
function thermo(x,y,h,niveau){ roundRect(ctx,x-18,y-h,36,h,18); shape(ctx,rgba(C.bgMicro,0.8),C.line,2); dot(ctx,x,y+18,30,C.koraal,lighten(C.koraal,0.3),2); roundRect(ctx,x-9,y-h*niveau,18,h*niveau+12,9); ctx.fillStyle=C.koraal; ctx.fill(); for(let k=0;k<=4;k++){ const yy=y-h*0.2-k*h*0.18; ctx.strokeStyle=C.line; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(x+22,yy); ctx.lineTo(x+38,yy); ctx.stroke(); metaText(ctx,`${36+k}`,x+48,yy+8,C.text2,'left',22); } }
function bact2(x,y,dood){ for(let i=0;i<6;i++){ const d=clamp(dood*1.4-i*0.08,0,1); ctx.save(); ctx.translate(x-150+(i%3)*150,y-40+Math.floor(i/3)*80); ctx.rotate(0.3); roundRect(ctx,-36,-14,72,28,14); shape(ctx,rgba(d>0.5?'#6E7686':C.teal,0.5),d>0.5?'#9AA3B2':lighten(C.teal,0.35),1.6); ctx.restore(); } }
