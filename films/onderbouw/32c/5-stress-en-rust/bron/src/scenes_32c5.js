// ===== 32C film 5 — Waarom bonkt je hart voor een spreekbeurt?: scènes =====
// Rode draad: het alarm van je lichaam (één alarm, voor gevaar én voor iets spannends): aan → blijft hangen → weer uit.
// Kleuren (Part C): hart en bloed koraal · zenuwsignaal en ademhaling teal · adrenaline en bijnieren paars (hormoon) ·
// rust, ontspannen en 'dit helpt' groen · voedsel/agenda oker · goud = focus en het alarm zelf.
// Personages: Lotte (vaste 'jij' van de onderbouw), Yasmin (klasgenoot), Mevrouw Visser (docent), Noor (vriendin van Yasmin).
// Gezichten blijven heel; hersenen alleen in een zoomcirkel náást het hoofd (BEELDAFSPRAKEN). Geen leeuw getekend: 'leeuw' blijft tekst (geen goedgekeurd dier in de bibliotheek).
// Hulpfuncties uit 32A film 7 staan in lib_a7.js (klas, tafel, plein, hartPil, alarmBel, telefoon, lijf, zenuwnet, klier, nieren, adrenaline, puls, PAD).

const BPM=(t,t0,t1,lo=75,hi=125)=>lo+(hi-lo)*ramp(t,t0,1.2)*(1-ramp(t,t1,2.5));
// hersenen in een zoomcirkel naast het hoofd (anatomische hersenen uit lib_anatomie, groot geschaald)
function breinCirkel(x,y,r,sx,sy,a=1,hl=0,cap='HERSENEN'){ if(a<=0.01) return; zoomCircle(ctx,x,y,r,sx,sy,cap,a,()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(x-r,y-r,2*r,2*r);
  const HH=r*2.4/0.75, h=HH*7.3, top=y-0.3*HH; metLijf(x,top+h,h,()=>{ anBrain(1,hl); }); }); }
// spreekbubbel met tekst (directe rede van een personage)
function bubbel(x,y,w,s,a=1,kleur=C.text,staart=-1){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.font=fTekst(36,600); const regels=[]; let r=''; s.split(' ').forEach(wd=>{ const p=r?r+' '+wd:wd; if(ctx.measureText(p).width>w-60&&r){ regels.push(r); r=wd; } else r=p; }); regels.push(r);
  const h=40+regels.length*46; roundRect(ctx,x,y,w,h,22); shape(ctx,rgba(C.kast,0.92),kleur,2);
  ctx.beginPath(); const sx=x+(staart<0?60:w-60); ctx.moveTo(sx-18,y+h-1); ctx.lineTo(sx+staart*-30,y+h+34); ctx.lineTo(sx+18,y+h-1); ctx.closePath(); ctx.fillStyle=rgba(C.kast,0.92); ctx.fill(); ctx.strokeStyle=kleur; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(sx-18,y+h); ctx.lineTo(sx+staart*-30,y+h+34); ctx.lineTo(sx+18,y+h); ctx.stroke();
  regels.forEach((l,i)=>text(ctx,l,x+30,y+58+i*46,fTekst(36,600),C.text)); }); }
// symptoomrij: icoon links, tekst rechts
function rij(x,y,a,teken,naam,noot,kleur){ if(a<=0.01) return; alpha(ctx,a,()=>{ roundRect(ctx,x,y-56,620,112,18); shape(ctx,rgba(C.fill,0.75),rgba(kleur,0.9),2); teken(x+70,y); text(ctx,naam,x+150,y-4,fTekst(40,700),C.text); metaText(ctx,noot,x+150,y+36,kleur,'left',28); }); }
function druppel(x,y,s,kl=C.teal,a=1){ alpha(ctx,a,()=>{ ctx.beginPath(); ctx.moveTo(x,y-26*s); ctx.bezierCurveTo(x+20*s,y-2*s,x+20*s,y+20*s,x,y+20*s); ctx.bezierCurveTo(x-20*s,y+20*s,x-20*s,y-2*s,x,y-26*s); shape(ctx,rgba(kl,0.55),kl,2); }); }
function boomIcoon(x,y,s,a=1){ alpha(ctx,a,()=>{ ctx.fillStyle='#5A4636'; ctx.fillRect(x-6*s,y,12*s,46*s); ctx.beginPath(); ctx.arc(x,y-6*s,40*s,0,6.283); shape(ctx,'#5FA86E','#7FC48F',2); ctx.beginPath(); ctx.arc(x-26*s,y+8*s,26*s,0,6.283); shape(ctx,'#5FA86E','#7FC48F',2); ctx.beginPath(); ctx.arc(x+26*s,y+8*s,26*s,0,6.283); shape(ctx,'#5FA86E','#7FC48F',2); }); }
function maanIcoon(x,y,s,a=1){ alpha(ctx,a,()=>{ ctx.beginPath(); ctx.arc(x,y,30*s,0,6.283); ctx.fillStyle='#E8DFA8'; ctx.fill(); ctx.beginPath(); ctx.arc(x+14*s,y-8*s,26*s,0,6.283); ctx.fillStyle=C.bgSchema; ctx.fill(); }); }
function klokje(x,y,r,uur,a=1){ alpha(ctx,a,()=>{ ctx.beginPath(); ctx.arc(x,y,r,0,6.283); shape(ctx,C.fill,C.text,2.5); const ang=(uur%12)/12*6.283-Math.PI/2; ctx.strokeStyle=C.text; ctx.lineWidth=4; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+Math.cos(ang)*r*0.5,y+Math.sin(ang)*r*0.5); ctx.stroke(); ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x,y-r*0.78); ctx.stroke(); }); }
// alarmbel met status: aan (trilt, ringen), half (zacht trillen), uit (stil, groen vinkje)
function bel(x,y,s,t,stand,a=1){ if(a<=0.01) return; alpha(ctx,a,()=>{ if(stand==='half'){ ctx.save(); ctx.globalAlpha*=0.75; alarmBel(x,y,s,t*0.35,true); ctx.restore(); } else alarmBel(x,y,s,t,stand==='aan'); // 'stil' en 'uit': geen ringen
  if(stand==='uit'){ ctx.strokeStyle=C.groen; ctx.lineWidth=6; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x+52*s,y+18*s); ctx.lineTo(x+68*s,y+36*s); ctx.lineTo(x+100*s,y-6*s); ctx.stroke(); } }); }
// agendavak
function agendaVak(x,y,w,h,kop,kleur,u){ if(u<=0.01) return; alpha(ctx,u,()=>{ roundRect(ctx,x+4,y+4,w-8,h-8,10); shape(ctx,rgba(kleur,0.35),kleur,2); text(ctx,kop,x+w/2,y+h/2+12,fTekst(32,700),C.text,'center'); }); }
function telScherm(x,y,s,t,a=1,loop=true){ alpha(ctx,a,()=>{ roundRect(ctx,x-110*s,y-200*s,220*s,400*s,28*s); shape(ctx,'#20283A',C.text,3); ctx.save(); roundRect(ctx,x-95*s,y-170*s,190*s,330*s,8*s); ctx.clip(); ctx.fillStyle='#0F1624'; ctx.fillRect(x-95*s,y-170*s,190*s,330*s);
  const kl=[C.koraal,C.teal,C.oker,C.groen,C.goud]; const off=loop?(t*120)%110:0; for(let i=-1;i<5;i++){ const yy=y-170*s+i*110*s+off*s; roundRect(ctx,x-80*s,yy+10*s,160*s,90*s,10*s); shape(ctx,rgba(kl[(i+20)%5],0.45),kl[(i+20)%5],1.5); } ctx.restore(); }); }

const SCENES={
// ---- cold open: Lotte voor de klas ----
s01(ctx,t,q){ klas(t); const tHa=q.at('hart'), tDr=q.at('droog.'), tLe=q.at('leeuw'), tWa=q.at('Waarom');
  tafel(1500,640,420); persoon(ctx,'yasmin',1560,640+170,250,{pose:'zit',stoel:true,tafel:640,uit:'neutraal',t,kijk:-1});
  const A=persoon(ctx,'lotte',760,860,470,{outfit:'school',uit:'bezorgd',pose:'staan',t,kijk:1});
  hartPil(1120,330,t,ramp(t,tHa,0.4),BPM(t,tHa,99));
  pill(ctx,1120,450,'droge mond',C.teal,ramp(t,tDr,0.4),30);
  alpha(ctx,ramp(t,tLe,0.4),()=>{ roundRect(ctx,980,560,300,90,45); shape(ctx,rgba(C.kast,0.9),C.text2,2); text(ctx,'geen leeuw',1130,618,fTekst(40,700),C.text,'center'); });
  alpha(ctx,ramp(t,tWa,0.4),()=>text(ctx,'?',1130,780,fTitel(130),C.goud,'center')); },
// ---- titel ----
s02(ctx,t,q){ bg(ctx,'schema'); alpha(ctx,ramp(t,0.1,0.7),()=>{ text(ctx,'Waarom bonkt je hart',120,330,fTitel(84),C.text); text(ctx,'voor een spreekbeurt?',120,425,fTitel(84),C.text); text(ctx,'Stress, en wat je lichaam helpt',120,510,fTekst(44),C.text2); });
  alpha(ctx,ramp(t,0.4,0.6),()=>heart(1400,560,1.7,1,t*125/60*6.283)); bel(1650,330,1.2,t,'aan',ramp(t,0.8,0.5));
  metaText(ctx,'ONDERBOUW · KERNDOELEN · 32C · FILM 5',W-80,60,C.text2,'right',28); },
// ---- H1 vraagaanloop ----
s03(ctx,t,q){ klas(t); tafel(1500,640,420); persoon(ctx,'yasmin',1560,810,250,{pose:'zit',stoel:true,tafel:640,uit:'neutraal',t,kijk:-1});
  persoon(ctx,'lotte',760,860,470,{outfit:'school',uit:'bezorgd',pose:'staan',t,kijk:1}); hartPil(1120,330,t,1,125);
  alpha(ctx,ramp(t,q.at('gebeurt'),0.4),()=>text(ctx,'?',1120,560,fTitel(120),C.goud,'center')); },
// ---- H1: wat er in je lichaam gebeurt ----
s05(ctx,t,q){ bg(ctx,'schema'); const tSt=q.at('stress.'), tRe=q.at('reactie'), tHe=q.at('hersenen.'), tSe=q.at('seintjes'), tHa=q.at('hart',2), tAd=q.at('ademt'), tSp=q.at('spieren',2), tSpk=q.at('speeksel.'), tHo=q.at('hoofd.'), tHe2=q.at('hele'), tAdr=q.at('adrenaline.'), tFi=q.at('film');
  const A=persoon(ctx,'lotte',330,880,560,{outfit:'school',uit:t<tHo?'bezorgd':'neutraal',pose:'staan',t,kijk:1});
  // term stress
  alpha(ctx,ramp(t,tSt-0.1,0.4)*(1-ramp(t,tHe-0.4,0.4)),()=>{ text(ctx,'stress',720,330,fTitel(96),C.goud); metaText(ctx,'EEN REACTIE VAN JE LICHAAM OP IETS SPANNENDS',724,385,C.grain,'left',28); });
  // hersenen in zoomcirkel naast het hoofd
  const hx=A.hoofd?A.hoofd.x:330, hy=A.hoofd?A.hoofd.y:380;
  breinCirkel(760,250,130,hx+50,hy,ramp(t,tHe-0.3,0.5),t>tHe&&t<tSe+3?0.5:0);
  // seintjes naar hart, longen, spieren: rijen rechts
  const rx=1080, Y=[250,400,550,700];
  [tHa,tAd,tSp].forEach((tt,i)=>{ const a=ramp(t,Math.min(tt,tSe+0.4*i+0.6)-0.2,0.4)*(1-ramp(t,tSpk,0.6)*0.6); if(a>0.01) alpha(ctx,a,()=>arrow(ctx,890,250,rx-10,Y[i],C.teal,3,14)); });
  rij(rx,Y[0],ramp(t,Math.min(tHa,tSe+0.6)-0.2,0.4),(x,y)=>heart(x,y,0.55,1,t*125/60*6.283),'hart','SNELLER EN HARDER',C.koraal);
  rij(rx,Y[1],ramp(t,Math.min(tAd,tSe+1.0)-0.2,0.4),(x,y)=>lungs(x,y,0.42,1,0.5+0.5*Math.sin(t*5)),'longen','JE ADEMT SNELLER',C.teal);
  rij(rx,Y[2],ramp(t,Math.min(tSp,tSe+1.4)-0.2,0.4),(x,y)=>spierBundel(x-38,y,76,28,1),'spieren','SPANNEN ZICH',C.koraal);
  rij(rx,Y[3],ramp(t,tSpk,0.4),(x,y)=>druppel(x,y,1.2,C.teal),'minder speeksel','DROGE MOND',C.teal);
  // stress zit niet alleen in je hoofd
  if(t>tHo-0.3) haak(ctx,1080,1600,805,'je hele lichaam doet mee',C.groen,ramp(t,tHo,0.4)*(1-ramp(t,tAdr-0.6,0.4)));
  // adrenaline: paarse deeltjes in een bloedvat
  alpha(ctx,ramp(t,tAdr-0.3,0.5),()=>{ roundRect(ctx,620,700,420,110,55); shape(ctx,rgba('#B5574A',0.3),'#D07A6C',2); for(let i=0;i<14;i++){ const x=640+((hash(i*3.1)*380+t*90)%380); dot(ctx,x,725+hash(i*1.7)*60,8,C.paars,lighten(C.paars,0.35),1.5); } naamBij(ctx,'adrenaline','HOUDT HET EVEN VOL',830,630,1,'center',C.paars); });
  metaText(ctx,'schematisch · niet op schaal',W-40,100,C.text2,'right',28); },
// ---- H1: één alarm ----
s06(ctx,t,q){ bg(ctx,'schema'); const tAl=q.at('alarm.'), tEe=q.at('één.'), tGe=q.at('gevaar,'), tSp=q.at('spannends,'), tKa=q.at('kapot.'), tKo=q.at('Korte'), tBe=q.at('beter.');
  const aan=t>tGe&&t<tKa+0.5; bel(960,330,2,t,aan?'aan':(t>tKa?'uit':'stil'),ramp(t,tAl-0.4,0.5));
  alpha(ctx,ramp(t,tEe,0.4),()=>pill(ctx,960,480,'maar één alarm',C.goud,1,32));
  // links: gevaar
  alpha(ctx,ramp(t,tGe,0.4),()=>{ vak(170,520,520,250,'gevaar',C.koraal,1,'ZOALS EEN LEEUW'); arrow(ctx,600,560,840,400,C.koraal,4,16); text(ctx,'leeuw',430,700,fTekst(40,600),C.text2,'center'); });
  // rechts: spannend
  alpha(ctx,ramp(t,tSp,0.4),()=>{ vak(1230,520,520,250,'iets spannends',C.goud,1,'ZOALS EEN SPREEKBEURT'); arrow(ctx,1320,560,1080,400,C.goud,4,16); persoon(ctx,'lotte',1490,760,130,{outfit:'school',uit:'bezorgd',t,kijk:-1}); });
  alpha(ctx,ramp(t,tKa,0.4),()=>pill(ctx,960,180,'het alarm is niet kapot',C.groen,1,32));
  if(t>tKo-0.3) haak(ctx,560,1360,830,'korte stress kan je scherp maken',C.groen,ramp(t,tKo,0.4)); },
// ---- H1 uitdaging: de keten en vecht-of-vlucht ----
s07(ctx,t,q){ bg(ctx,'schema'); const tSe=q.at('seintje'), tBi=q.at('bijnieren.'), tNi=q.at('nieren.'), tAd=q.at('adrenaline.'), tBl=q.at('bloed'), tHa=q.at('hart.'), tSn=q.at('sneller.'), tMe=q.at('Mensen'), tVe=q.at('vechten'), tSpi=q.at('spieren'), tVv=q.at('vecht-of-vlucht');
  if(t<tMe-0.3){ const A=persoon(ctx,'lotte',330,880,560,{outfit:'school',uit:'bezorgd',pose:'staan',t,kijk:1});
    const hx=A.hoofd?A.hoofd.x:330, hy=A.hoofd?A.hoofd.y:380;
    breinCirkel(720,230,120,hx+50,hy,ramp(t,0.1,0.5),t<tSe+1.5?0.4:0);
    // nieren met bijnieren in een zoomcirkel naast de buik
    const NX=720, NY=600, NR=150; const zA=ramp(t,tBi-0.6,0.5);
    if(zA>0.01) zoomCircle(ctx,NX,NY,NR,375,640,'NIEREN EN BIJNIEREN',zA,()=>{ ctx.fillStyle=C.bgSchema; ctx.fillRect(NX-NR,NY-NR,2*NR,2*NR); const HH=NR/0.62, h=HH*7.3, top=NY-3.0*HH; metLijf(NX,top+h,h,()=>{ nieren(1); klier('bij',1,t>tBi&&t<tAd+1.2,t); if(t>tAd){ const u=clamp((t-tAd)/2.5,0,1); for(let i=0;i<12;i++){ const s=i%2?-1:1; const [x0,y0]=AP(s*0.37,2.86); const ui=clamp(u*1.3-hash(i*3.3)*0.3,0,1); dot(ctx,x0+(hash(i*1.9)-0.5)*40*ui,y0-ui*150-hash(i)*20,6,C.paars,lighten(C.paars,0.35),1.2); } } }); });
    // seintje: teal puls van de hersenen naar de bijnieren
    if(t>tSe-0.2&&t<tAd+1){ const u=clamp((t-tSe)/1.4,0,1); alpha(ctx,1-ramp(t,tAd,0.6),()=>{ ctx.setLineDash([8,8]); ctx.strokeStyle=rgba(C.teal,0.6); ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(720,350); ctx.lineTo(720,450); ctx.stroke(); ctx.setLineDash([]); dot(ctx,720,lerp(350,450,u),9,C.teal); }); }
    const ch=[['hersenen',C.text,0.2],['zenuw',C.teal,tSe],['bijnieren',C.paars,tBi],['adrenaline in je bloed',C.paars,tAd],['hart sneller',C.koraal,tHa]];
    ch.forEach(([n,k,tt],i)=>{ const y=180+i*135; alpha(ctx,ramp(t,tt,0.4),()=>{ roundRect(ctx,1100,y-46,560,92,16); shape(ctx,rgba(C.fill,0.8),k,2); text(ctx,n,1380,y+14,fTekst(40,700),C.text,'center'); if(i===4) heart(1150,y,0.45,1,t*BPM(t,tHa,99,90,140)/60*6.283); if(i<4) arrow(ctx,1380,y+48,1380,y+86,C.line,2.5,12); }); });
    metaText(ctx,'vereenvoudigd · niet op schaal',W-40,100,C.text2,'right',28); return; }
  // vecht of vlucht
  const u=clamp((t-tVe)/6,0,1); persoon(ctx,'lotte',260+u*560,850,330,{zij:true,kijk:1,gang:'ren',t,outfit:'sport'});
  alpha(ctx,ramp(t,tMe,0.4),()=>{ vak(170,140,620,190,'bij gevaar',C.koraal,1,'MENSEN EN DIEREN'); });
  alpha(ctx,ramp(t,tVe,0.4),()=>{ pill(ctx,1260,240,'vechten of vluchten',C.koraal,1,34); });
  alpha(ctx,ramp(t,tSpi,0.4),()=>{ rij(1150,450,1,(x,y)=>spierBundel(x-38,y,76,28,1),'meer bloed','IN JE SPIEREN',C.koraal); });
  alpha(ctx,ramp(t,tVv,0.4),()=>naamBij(ctx,'vecht-of-vluchtreactie','HET ALARM VAN JE LICHAAM',170,450,1,'left',C.goud)); },
// ---- H1: de spreekbeurt loopt, Yasmin na de les ----
s08(ctx,t,q){ const tRu=q.at('rustiger.'), tUi=q.at('uit.'), tLe=q.at('les'), tYa=q.at('Yasmin');
  if(t<tLe-0.2){ klas(t); tafel(1500,640,420); persoon(ctx,'yasmin',1560,810,250,{pose:'zit',stoel:true,tafel:640,uit:'blij',t,kijk:-1});
    persoon(ctx,'lotte',760,860,470,{outfit:'school',uit:t<tRu?'praat':'blij',pose:t<tRu?'wijs':'staan',t,kijk:1});
    const bpm=lerp(125,75,ramp(t,tRu-0.4,2)); hartPil(1080,330,t,1,bpm); pill(ctx,1080,430,'na een paar minuten: rustiger',C.groen,ramp(t,tRu-0.6,0.5),30);
    bel(1080,580,0.9,t,t<tUi?'half':'uit',ramp(t,tUi-0.6,0.4)); return; }
  plein(); persoon(ctx,'lotte',650,880,430,{outfit:'school',uit:'blij',t,kijk:1}); const Y=persoon(ctx,'yasmin',1050,880,440,{uit:'praat',pose:'denk',t,kijk:-1});
  bubbel(1120,160,640,'Ik was ook zó zenuwachtig.',ramp(t,tYa,0.4),C.goud,-1); },
// ---- H1: geen zwakte, Mevrouw Visser ----
s10(ctx,t,q){ plein(); const tZw=q.at('zwakte.'), tIe=q.at('iedereen'), tVi=q.at('Visser'), tVo=q.at('Voor');
  persoon(ctx,'lotte',560,880,430,{outfit:'school',uit:'blij',t,kijk:1}); persoon(ctx,'yasmin',900,880,440,{uit:'lacht',t,kijk:-1});
  pill(ctx,730,300,'zenuwachtig zijn is geen zwakte',C.groen,ramp(t,0.1,0.4),34);
  pill(ctx,730,380,'bijna iedereen kent het',C.text,ramp(t,tIe-0.3,0.4),30);
  alpha(ctx,ramp(t,tVi-0.2,0.5),()=>persoon(ctx,'visser',1400,890,480,{uit:t>tVo?'praat':'blij',pose:'staan',t,kijk:-1}));
  bubbel(1180,120,620,'Voor mijn eerste les bonkte mijn hart ook.',ramp(t,tVo,0.4),C.text,1); },
// ---- H2: Lottes agenda ----
s11(ctx,t,q){ bg(ctx,'schema'); const tMa=q.at('Maandag'), tDi=q.at('Dinsdag'), tWo=q.at('Woensdag'), tDo=q.at('Donderdag'), tAv=q.at('avond'), tLe=q.at('leeg'), tHo=q.at('Hoe');
  const X0=300, cw=280, Y0=230, rh=150; const dagen=['ma','di','wo','do','vr'];
  alpha(ctx,ramp(t,0.1,0.5),()=>{ text(ctx,'Lottes week',X0,170,fTitel(64),C.text); metaText(ctx,'WEKEN ACHTER ELKAAR',X0+460,165,C.grain,'left',28);
    dagen.forEach((d,i)=>{ metaText(ctx,d.toUpperCase(),X0+i*cw+cw/2,Y0-12,C.text2,'center',28); }); ['school','middag','avond'].forEach((r,j)=>metaText(ctx,r.toUpperCase(),X0-24,Y0+j*rh+rh/2+8,C.text2,'right',28));
    ctx.strokeStyle=rgba(C.line,0.5); ctx.lineWidth=1.5; for(let i=0;i<=5;i++){ ctx.beginPath(); ctx.moveTo(X0+i*cw,Y0); ctx.lineTo(X0+i*cw,Y0+3*rh); ctx.stroke(); } for(let j=0;j<=3;j++){ ctx.beginPath(); ctx.moveTo(X0,Y0+j*rh); ctx.lineTo(X0+5*cw,Y0+j*rh); ctx.stroke(); } });
  const V=(i,j,kop,kl,tt)=>agendaVak(X0+i*cw,Y0+j*rh,cw,rh,kop,kl,ramp(t,tt,0.35));
  for(let i=0;i<5;i++) V(i,0,'les',C.text2,0.3+i*0.12);
  V(0,1,'toets',C.koraal,tMa); V(1,1,'training',C.oker,tDi); V(2,1,'toets',C.koraal,tWo); V(3,1,'oefenen',C.goud,tDo);
  for(let i=0;i<5;i++) V(i,2,'telefoon, laat',C.teal,tAv+i*0.15);
  if(t>tLe-0.3) haak(ctx,X0,X0+5*cw,Y0+3*rh+40,'bijna geen leeg vakje',C.koraal,ramp(t,tLe,0.4));
  alpha(ctx,ramp(t,tHo,0.4),()=>text(ctx,'?',1760,600,fTitel(120),C.goud,'center')); },
// ---- H2: lange stress ----
s13(ctx,t,q){ bg(ctx,'schema'); const tAa=q.at('aan.'), tRu=q.at('rust'), tWe=q.at('went'), tLa=q.at('lange'), tMo=q.at('moe.'), tSl=q.at('slechter.'), tZi=q.at('ziek'), tAf=q.at('afweer'), tRo=q.at('rooster');
  // grafiek: het alarm over dagen
  const gx=170, gy=560, gw=900, gh=330; const u=ramp(t,0.2,Math.max(1,tRu+1.5));
  alpha(ctx,1,()=>{ ctx.strokeStyle=C.line; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(gx,gy-gh); ctx.lineTo(gx,gy); ctx.lineTo(gx+gw,gy); ctx.stroke(); metaText(ctx,'ALARM',gx,gy-gh-14,C.text2,'left',28); metaText(ctx,'DAGEN →',gx+gw,gy+40,C.text2,'right',28);
    ctx.setLineDash([10,8]); ctx.strokeStyle=rgba(C.groen,0.8); ctx.beginPath(); ctx.moveTo(gx,gy-50); ctx.lineTo(gx+gw,gy-50); ctx.stroke(); ctx.setLineDash([]); metaText(ctx,'RUST',gx+gw+14,gy-42,C.groen,'left',28);
    ctx.strokeStyle=C.goud; ctx.lineWidth=4; ctx.beginPath(); const N=160; for(let i=0;i<=N*u;i++){ const v=i/N, x=gx+v*gw; const piek=Math.pow(Math.max(0,Math.sin(v*Math.PI*14)),6); const basis=50+v*130; const y=gy-basis-piek*150; i?ctx.lineTo(x,y):ctx.moveTo(x,y); } ctx.stroke(); });
  pill(ctx,620,150,'te weinig tijd om tot rust te komen',C.koraal,ramp(t,tRu-0.3,0.4),30);
  alpha(ctx,ramp(t,tLa-0.2,0.4),()=>naamBij(ctx,'lange stress','HET ALARM GAAT STEEDS WEER AAN',gx,gy+120,1,'left',C.goud));
  // Lotte moe met gevolgen
  const A=persoon(ctx,'lotte',1270,880,400,{outfit:'school',uit:t>tMo-0.3?'moe':'neutraal',t,kijk:-1});
  [['vaak moe',tMo,C.koraal],['slechter slapen',tSl,C.koraal],['sneller ziek',tZi,C.koraal]].forEach(([n,tt,k],i)=>pill(ctx,1650,330+i*100,n,k,ramp(t,tt-0.35,0.35),32));
  pill(ctx,1650,630,'afweer minder goed',C.koraal,ramp(t,tAf,0.4)*0.85,28);
  alpha(ctx,ramp(t,tRo,0.4),()=>{ roundRect(ctx,1150,150,110,110,14); shape(ctx,rgba(C.line,0.25),C.line,2); for(let i=0;i<3;i++) for(let j=0;j<3;j++){ ctx.fillStyle=rgba(C.line,0.8); ctx.fillRect(1165+i*30,175+j*25,22,17); } telefoon(1320,205,0.55,1); }); },
// ---- H3: telefoon ----
s14(ctx,t,q){ plein(); const tPa=q.at('pakt'), tAl=q.at('alarm?');
  const A=persoon(ctx,'lotte',700,880,440,{outfit:'school',pose:t>tPa-0.2?'vasthouden':'staan',uit:'moe',t,kijk:1,hold:(c,x,y)=>{ if(t>tPa-0.2){ roundRect(c,x-10,y-18,20,36,4); shape(c,'#20283A',C.text,1.5); } }});
  const hr=A.handR||{x:760,y:640}; if(ramp(t,tPa,0.4)>0.01) zoomCircle(ctx,1150,420,190,hr.x,hr.y,'TELEFOON',ramp(t,tPa,0.4),()=>{ ctx.fillStyle=C.bgSchema; ctx.fillRect(960,230,380,380); telScherm(1150,430,0.85,t,1,true); });
  alpha(ctx,ramp(t,tAl-0.3,0.4),()=>{ roundRect(ctx,1440,590,360,220,24); shape(ctx,rgba(C.kast,0.9),C.goud,2); bel(1560,690,1,t,'half'); text(ctx,'?',1720,740,fTitel(100),C.goud,'center'); }); },
// ---- H3: wat helpt ----
s16(ctx,t,q){ const tNi=q.at('nieuws.'), tUi=q.at('uit.'), tSl=q.at('slapen.'), tWa=q.at('Wat'), tBe=q.at('Bewegen,'), tNa=q.at('Na'), tBu=q.at('buiten'), tRu=q.at('Rustig'), tGe=q.at('Genoeg'), tPr=q.at('praten'), tZo=q.at('Zo',2), tOn=q.at('ontspant.'), tLo=q.at('Lotte'), tYa=q.at('Yasmin'), tVe=q.at('verschilt'), tKu=q.at('kunt');
  if(t<tWa-0.2){ bg(ctx,'schema'); telScherm(560,480,1.2,t,1,true); pill(ctx,560,140,'steeds iets nieuws',C.teal,ramp(t,tNi-0.6,0.4),30);
    bel(1150,380,1.2,t,'half',ramp(t,tNi-0.4,0.4)); metaText(ctx,'het alarm gaat niet echt uit',1150,520,C.text2,'center',28);
    alpha(ctx,ramp(t,tSl-1.2,0.4),()=>{ klokje(1500,720,60,11.5); maanIcoon(1640,700,1); text(ctx,'later slapen',1570,830,fTekst(36,700),C.teal,'center'); }); return; }
  if(t<tLo-0.2){ bg(ctx,'schema'); alpha(ctx,ramp(t,tWa,0.4)*(1-ramp(t,tBe+1.5,0.4)),()=>text(ctx,'Wat helpt dan wel?',960,110,fTitel(60),C.text,'center'));
    const T=[[160,150,'bewegen',tBe,(x,y)=>fiets(x,y+30,1.15,1,t)],[730,150,'buiten zijn',tBu,(x,y)=>boomIcoon(x,y,1.5)],[1300,150,'rustig ademen',tRu,(x,y)=>lungs(x,y,0.9,1,0.5+0.5*Math.sin(t*1.4))],[445,500,'slapen',tGe,(x,y)=>bed(x-120,y+20,240,1)],[1015,500,'praten',tPr,(x,y)=>{ persoon(ctx,'yasmin',x-60,y+90,190,{uit:'praat',t,kijk:1}); persoon(ctx,'noor',x+60,y+90,185,{uit:'blij',t,kijk:-1}); }]];
    T.forEach(([x,y,n,tt,tek])=>{ const a=ramp(t,tt-0.2,0.4); if(a<=0.01) return; alpha(ctx,a,()=>{ roundRect(ctx,x,y,460,300,22); shape(ctx,rgba(C.fill,0.75),C.groen,2); ctx.save(); roundRect(ctx,x,y,460,300,22); ctx.clip(); tek(x+230,y+130); ctx.restore(); text(ctx,n,x+230,y+275,fTekst(38,700),C.text,'center'); }); });
    alpha(ctx,ramp(t,tNa,0.4)*(1-ramp(t,tBu,0.4)),()=>{ heart(1560,640,0.8,1,t*70/60*6.283); pill(ctx,1560,760,'daarna weer rustig',C.groen,1,30); });
    if(t>tZo-0.3){ haak(ctx,160,1760,850,'zo komt je lichaam weer tot rust',C.groen,ramp(t,tZo,0.4)); }
    alpha(ctx,ramp(t,tOn-0.2,0.4),()=>naamBij(ctx,'ontspannen','TOT RUST KOMEN',1520,600,1,'left',C.groen)); return; }
  // ieder zijn eigen manier
  plein(); fiets(800,790,1.1,1,t); persoon(ctx,'lotte',380,880,420,{outfit:'school',uit:'blij',t,kijk:1});
  alpha(ctx,ramp(t,tYa-0.2,0.4),()=>{ persoon(ctx,'yasmin',1180,880,430,{uit:'praat',t,kijk:1}); persoon(ctx,'noor',1460,880,420,{uit:'blij',t,kijk:-1}); });
  pill(ctx,960,200,'wat helpt, verschilt per persoon',C.groen,ramp(t,tVe,0.4),32);
  alpha(ctx,ramp(t,tKu,0.4),()=>metaText(ctx,'probeer uit wat bij jou past',960,270,C.text2,'center',28)); },
// ---- samenvatting ----
s17(ctx,t,q){ bg(ctx,'schema'); const tEe=q.at('één'), tGe=q.at('gevaar'), tSp=q.at('spannends.'), tKo=q.at('Kort'), tUi=q.at('uit.'), tSl=q.at('Slaap,'), tBl=q.at('Blijft'), tVo=q.at('volwassene'), tMe=q.at('mentor');
  if(t<tBl-0.3){ alpha(ctx,ramp(t,0.1,0.5),()=>text(ctx,'Waarom doet je lichaam alsof er een leeuw is?',960,140,fTekst(44,700),C.text,'center'));
    bel(960,380,1.6,t,t<tUi?'aan':'stil',ramp(t,0.1,0.4)); alpha(ctx,ramp(t,tEe,0.4),()=>pill(ctx,960,520,'één alarm',C.goud,1,32));
    alpha(ctx,ramp(t,tGe,0.4),()=>{ vak(200,300,420,180,'gevaar',C.koraal,1,'ZOALS EEN LEEUW'); arrow(ctx,630,390,820,380,C.koraal,4,16); });
    alpha(ctx,ramp(t,tSp,0.4),()=>{ vak(1300,300,420,180,'iets spannends',C.goud,1,'ZOALS EEN SPREEKBEURT'); arrow(ctx,1290,390,1100,380,C.goud,4,16); });
    pill(ctx,560,640,'kort: scherp',C.goud,ramp(t,tKo,0.4),32); pill(ctx,1360,640,'daarna: weer uit',C.groen,ramp(t,tUi-0.6,0.4),32);
    alpha(ctx,ramp(t,tSl-0.2,0.4),()=>chips(ctx,[['slaap',1,C.groen],['bewegen',1,C.groen],['buiten zijn',1,C.groen],['praten',1,C.groen]],760)); return; }
  alpha(ctx,ramp(t,tBl-0.3,0.4),()=>{ text(ctx,'Blijft stress lang?',960,170,fTitel(64),C.text,'center'); });
  persoon(ctx,'lotte',620,880,420,{outfit:'school',uit:'neutraal',t,kijk:1}); alpha(ctx,ramp(t,tVo-0.2,0.4),()=>persoon(ctx,'visser',980,890,470,{uit:'blij',t,kijk:-1}));
  alpha(ctx,ramp(t,tVo,0.4),()=>{ roundRect(ctx,1220,330,560,250,20); shape(ctx,rgba(C.kast,0.9),C.groen,2); text(ctx,'Praat erover met een',1500,400,fTekst(38,700),C.text,'center'); text(ctx,'volwassene die je vertrouwt',1500,450,fTekst(38,700),C.text,'center'); });
  alpha(ctx,ramp(t,tMe-0.2,0.4),()=>metaText(ctx,'BIJVOORBEELD JE MENTOR OF DE HUISARTS',1500,530,C.groen,'center',28)); },
// ---- eindkaart: Onthoud ----
s18(ctx,t,q){ bg(ctx,'schema'); alpha(ctx,ramp(t,0.1,0.6),()=>{ text(ctx,'Onthoud',160,190,fTitel(80),C.text);
    const Z=['Stress is een reactie van je lichaam op iets spannends.','Kort helpt het je. Lang zonder rust maakt het je moe.','Slaap, bewegen, buiten zijn en praten brengen je terug naar rust.'];
    Z.forEach((z,i)=>alpha(ctx,ramp(t,0.5+i*0.8,0.5),()=>{ dot(ctx,180,300+i*110,10,C.goud); text(ctx,z,220,314+i*110,fTekst(44,600),C.text); }));
    haak(ctx,160,1500,640,'blijft stress lang? praat met een volwassene die je vertrouwt, zoals je mentor of de huisarts',C.groen,ramp(t,3.2,0.5)); }); }
};
