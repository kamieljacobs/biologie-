// ===== 32C film 2 — Slaap, natuur en hygiëne: scènes =====
// Rode draad: Noor (slaapkamer bij nacht → ochtend), een klok die de dag rondgaat, het raam met uitzicht (bomen of muur), handen met ziekteverwekkers.
// Kleuren: slaap/klok teal (informatie), licht goud, natuur groen, ziekteverwekkers koraal, zeep/vet oker.

function slaapkamer(dag,t){ // dag 0 = nacht, 1 = ochtend
  ctx.fillStyle=dag>0.5?'#2A3A58':'#16203A'; ctx.fillRect(0,0,W,H); ctx.fillStyle=dag>0.5?'#3A4A68':'#1E2A44'; ctx.fillRect(0,760,W,H-760);
  // raam
  roundRect(ctx,1240,140,460,340,10); shape(ctx,dag>0.5?'#8EB4D4':'#0F1626','#5A6A88',6); ctx.strokeStyle='#5A6A88'; ctx.lineWidth=6; ctx.beginPath(); ctx.moveTo(1470,140); ctx.lineTo(1470,480); ctx.moveTo(1240,310); ctx.lineTo(1700,310); ctx.stroke();
  ctx.save(); ctx.beginPath(); ctx.rect(1243,143,454,334); ctx.clip(); if(dag>0.5){ dot(ctx,1340,250,36,C.goud); } else { dot(ctx,1600,230,26,'#E8E2C8'); for(let i=0;i<8;i++) dot(ctx,1260+hash(i)*420,160+hash(i*3)*280,1.6,rgba('#F2F2EE',0.6)); } ctx.restore(); }
function noorInBed(x,y,t,dicht=1,a=1){ alpha(ctx,a,()=>{ bed(x,y,560,1); ctx.save(); ctx.translate(x+340,y-48); ctx.rotate(-Math.PI/2); persoon(ctx,'noor',0,0,300,{uit:dicht>0.5?'neutraal':'blij',t:0}); ctx.restore();
  // deken over het lijf
  roundRect(ctx,x+120,y-70,440,70,18); shape(ctx,'#4A6FA0','#6A8FC0',1.5);
  if(dicht>0.5){ ctx.strokeStyle='#2A1C16'; ctx.lineWidth=3; } }); }
function klok24(x,y,r,uur,a=1,hl=null){ alpha(ctx,a,()=>{ ctx.beginPath(); ctx.arc(x,y,r,0,6.283); shape(ctx,rgba(C.bgMicro,0.85),C.teal,2.5);
  // dag/nacht-ring
  ctx.lineWidth=r*0.14; ctx.strokeStyle=rgba(C.goud,0.55); ctx.beginPath(); ctx.arc(x,y,r*0.86,-Math.PI/2+6.283*7/24,-Math.PI/2+6.283*21/24); ctx.stroke(); ctx.strokeStyle=rgba('#5A6A88',0.8); ctx.beginPath(); ctx.arc(x,y,r*0.86,-Math.PI/2+6.283*21/24,-Math.PI/2+6.283*31/24); ctx.stroke();
  [[0,'0'],[6,'6'],[12,'12'],[18,'18']].forEach(([h,s])=>{ const an=-Math.PI/2+6.283*h/24; text(ctx,s,x+Math.cos(an)*r*0.6,y+Math.sin(an)*r*0.6+10,fMeta(26),C.text2,'center'); });
  const an=-Math.PI/2+6.283*uur/24; ctx.strokeStyle=C.goud; ctx.lineWidth=5; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+Math.cos(an)*r*0.78,y+Math.sin(an)*r*0.78); ctx.stroke(); dot(ctx,x,y,8,C.goud); }); }
function hoofdProfiel(x,y,s=1,a=1){ alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); ctx.beginPath(); ctx.moveTo(-90,140); ctx.lineTo(-90,40); ctx.bezierCurveTo(-120,-80,-20,-170,60,-140); ctx.bezierCurveTo(140,-110,150,-20,130,20); ctx.lineTo(150,60); ctx.lineTo(125,70); ctx.lineTo(120,110); ctx.lineTo(60,120); ctx.lineTo(50,140); ctx.closePath(); shape(ctx,'#2A3A58','#8FA0B5',2);
  ctx.beginPath(); ctx.ellipse(10,-50,95,70,0,0,6.283); shape(ctx,rgba('#D8A0B0',0.35),'#D8A0B0',1.5); ctx.restore(); }); }
function bladerBoom(x,y,s=1,a=1,k='#5FA86E'){ alpha(ctx,a,()=>{ ctx.fillStyle='#6B4A30'; ctx.fillRect(x-10*s,y-150*s,20*s,150*s); [[0,-200,90],[-60,-160,64],[60,-160,64],[0,-140,70]].forEach(([dx,dy,r])=>{ ctx.beginPath(); ctx.arc(x+dx*s,y+dy*s,r*s,0,6.283); shape(ctx,k,lighten(k,0.25),1.5); }); }); }
function bakstenen(x,y,w,h){ ctx.fillStyle='#8C5A4A'; ctx.fillRect(x,y,w,h); ctx.strokeStyle='#6B4238'; ctx.lineWidth=3; for(let r=0;r*40<h;r++){ ctx.beginPath(); ctx.moveTo(x,y+r*40); ctx.lineTo(x+w,y+r*40); ctx.stroke(); for(let c=0;c*90<w+90;c++){ const bx=x+c*90+(r%2)*45; if(bx>x&&bx<x+w){ ctx.beginPath(); ctx.moveTo(bx,y+r*40); ctx.lineTo(bx,y+r*40+40); ctx.stroke(); } } } }
function ziekenhuisRaam(x,y,w,h,uitzicht,a=1,lab=''){ alpha(ctx,a,()=>{ ctx.save(); roundRect(ctx,x,y,w,h,8); ctx.clip(); ctx.fillStyle='#8EB4D4'; ctx.fillRect(x,y,w,h); if(uitzicht==='bomen'){ ctx.fillStyle='#5F8A50'; ctx.fillRect(x,y+h*0.75,w,h); [0.25,0.6,0.85].forEach((u,i)=>bladerBoom(x+w*u,y+h*0.85,0.8+0.2*i)); } else bakstenen(x,y,w,h); ctx.restore(); roundRect(ctx,x,y,w,h,8); ctx.strokeStyle='#C9CED8'; ctx.lineWidth=10; ctx.stroke(); ctx.beginPath(); ctx.moveTo(x+w/2,y); ctx.lineTo(x+w/2,y+h); ctx.lineWidth=6; ctx.stroke(); if(lab) text(ctx,lab,x+w/2,y+h+50,fTekst(34,600),C.text,'center'); }); }
function ziekenhuisBed(x,y,id,t,a=1,uit='neutraal'){ alpha(ctx,a,()=>{ ctx.fillStyle='#C9CED8'; ctx.fillRect(x,y,420,22); ctx.fillRect(x,y,12,90); ctx.fillRect(x+408,y,12,90); ctx.fillRect(x-6,y-120,16,140); ctx.save(); ctx.translate(x+260,y-36); ctx.rotate(-Math.PI/2); persoon(ctx,id,0,0,240,{uit,t:0}); ctx.restore(); roundRect(ctx,x+110,y-50,300,50,14); shape(ctx,'#E6E9EE','#C9CED8',1.5); }); }
function hand(x,y,s=1,a=1,huid='#D9A982'){ alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); ctx.fillStyle=huid; roundRect(ctx,-70,-40,140,150,50); ctx.fill(); [[-60,-120,26,110],[-28,-150,26,130],[6,-150,26,130],[40,-130,26,110]].forEach(([fx,fy,fw,fh])=>{ roundRect(ctx,fx,fy,fw,fh,13); ctx.fill(); }); ctx.save(); ctx.translate(70,20); ctx.rotate(-0.7); roundRect(ctx,-14,-80,28,90,14); ctx.fill(); ctx.restore(); ctx.restore(); }); }
function ziekmaker(x,y,s=1,a=1,t=0,i=0){ alpha(ctx,a,()=>{ if(i%2){ ctx.save(); ctx.translate(x,y); ctx.rotate(hash(i)*3+t*0.3); roundRect(ctx,-14*s,-6*s,28*s,12*s,6*s); shape(ctx,rgba(C.koraal,0.6),lighten(C.koraal,0.3),1.2); ctx.restore(); } else { ctx.beginPath(); ctx.arc(x,y,7*s,0,6.283); shape(ctx,rgba(C.koraal,0.6),lighten(C.koraal,0.3),1.2); for(let k=0;k<6;k++){ const an=k*1.047+t*0.4; dot(ctx,x+Math.cos(an)*10*s,y+Math.sin(an)*10*s,2*s,C.koraal); } } }); }
function zeepMolecuul(x,y,an,s=1,a=1){ alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.rotate(an); ctx.strokeStyle=C.oker; ctx.lineWidth=3*s; ctx.beginPath(); ctx.moveTo(0,0); for(let k=1;k<=6;k++) ctx.lineTo(k*7*s,(k%2?4:-4)*s); ctx.stroke(); dot(ctx,0,0,7*s,C.teal,lighten(C.teal,0.3),1.2); ctx.restore(); }); }
function tand(x,y,s=1,a=1,plak=0){ alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); ctx.beginPath(); ctx.moveTo(-50,-60); ctx.quadraticCurveTo(-60,-110,-20,-100); ctx.quadraticCurveTo(0,-90,20,-100); ctx.quadraticCurveTo(60,-110,50,-60); ctx.lineTo(40,40); ctx.quadraticCurveTo(30,80,15,40); ctx.lineTo(0,0); ctx.lineTo(-15,40); ctx.quadraticCurveTo(-30,80,-40,40); ctx.closePath(); shape(ctx,'#F2EEE4','#C9CED8',2);
  if(plak>0.01){ ctx.fillStyle=rgba('#C9B060',0.55*plak); ctx.beginPath(); ctx.ellipse(0,-50,42,18,0,0,6.283); ctx.fill(); for(let i=0;i<10;i++) dot(ctx,-34+hash(i)*68,-60+hash(i*3)*22,3,rgba(C.teal,plak)); } ctx.restore(); }); }

const SCENES={
// ---- cold open ----
s01(ctx,t,q){ const tLo=q.at('logeerpartij'), tCh=q.at('chagrijnig'), tGe=q.at('gewone'), tFr=q.at('fris'), tWa=q.at('Wat');
  const ochtend=t>tGe-0.2;
  slaapkamer(t<tCh-0.3?0:1,t);
  if(t<tCh-0.3){ // logeerpartij: wakker in het donker
    persoon(ctx,'noor',460,860,330,{outfit:'winter',pose:'staan',uit:'lacht',t,kijk:1}); persoon(ctx,'lotte',760,860,330,{outfit:'zomer',pose:'zwaai',uit:'lacht',t,kijk:-1}); klok24(1000,300,110,2+ramp(t,0.5,3)*2,1);
    pill(ctx,1000,470,'maar 4 uur slaap',C.koraal,ramp(t,tLo+1,0.4),28); return; }
  if(!ochtend){ persoon(ctx,'noor',560,860,340,{outfit:'school',pose:'denk',uit:'bezorgd',t,kijk:1}); pill(ctx,560,420,'chagrijnig · slecht opletten',C.koraal,ramp(t,tCh,0.4),28); return; }
  noorInBed(260,760,t,1-ramp(t,tFr,0.6)); klok24(1000,300,110,7,1); pill(ctx,560,430,'fris wakker',C.groen,ramp(t,tFr,0.4),28);
  alpha(ctx,ramp(t,tWa,0.4),()=>text(ctx,'?',1000,560,fTitel(120),C.goud,'center')); },
// ---- titel ----
s03(ctx,t,q){ bg(ctx,'schema'); alpha(ctx,ramp(t,0.1,0.7),()=>{ text(ctx,'Slaap, natuur en hygiëne',120,330,fTitel(90),C.text); text(ctx,'Waarom word je fris van slapen?',120,410,fTekst(44),C.text2); });
  klok24(1300,620,120,23,ramp(t,0.4,0.5)); bladerBoom(1600,820,1,ramp(t,0.8,0.5)); alpha(ctx,ramp(t,1.2,0.5),()=>{ hand(1750,640,0.8,1); for(let i=0;i<5;i++) ziekmaker(1700+hash(i)*110,560+hash(i*3)*120,1,1,t,i); });
  metaText(ctx,'ONDERBOUW · KERNDOELEN · 32C · FILM 2',W-80,60,C.text2,'right',24); },
// ---- H1: slapen is werken ----
s04(ctx,t,q){ const tHe=q.at('hersenen'), tGr=q.at('groeit'), tAf=q.at('afweer'), tTi=q.at('tiener'), tAc=q.at('acht'), tKo=q.at('kort,'), tFi=q.at('film');
  if(t<tTi-0.3){ slaapkamer(0,t); noorInBed(220,800,t,1);
    const P=[['hersenen slaan op','wat je leerde',C.teal,tHe],['groeien en herstellen','kleine schade',C.groen,tGr],['afweer werkt beter','',C.paars,tAf]];
    P.forEach(([n,m,k,tt],i)=>{ alpha(ctx,ramp(t,tt,0.4),()=>{ roundRect(ctx,900,170+i*170,520,130,16); shape(ctx,rgba(C.bgSchema,0.92),k,2); text(ctx,n,1160,230+i*170,fTekst(38,700),k,'center'); if(m) metaText(ctx,m,1160,272+i*170,C.grain,'center',22); }); });
    alpha(ctx,ramp(t,tHe,0.4),()=>{ text(ctx,'z',600,560-((t*30)%60),fTitel(44),rgba(C.teal,0.7),'center'); text(ctx,'z',640,520-((t*30+20)%60),fTitel(54),rgba(C.teal,0.7),'center'); });
    pill(ctx,520,180,'je lichaam staat niet uit',C.goud,ramp(t,0.3,0.4),30); return; }
  bg(ctx,'schema');
  klok24(560,450,200,23,1); alpha(ctx,ramp(t,tAc,0.6),()=>{ ctx.strokeStyle=C.teal; ctx.lineWidth=20; ctx.beginPath(); ctx.arc(560,450,240,-Math.PI/2+6.283*22/24,-Math.PI/2+6.283*(22+9*ramp(t,tAc,1.5))/24); ctx.stroke(); });
  pill(ctx,560,760-20,'± 8 tot 10 uur',C.teal,ramp(t,tAc,0.4),34);
  alpha(ctx,ramp(t,tKo,0.4),()=>{ persoon(ctx,'sam',1300,840,360,{outfit:'school',pose:'denk',uit:'bezorgd',t,kijk:-1}); text(ctx,'slechter opletten',1300,330,fTekst(34,600),C.koraal,'center'); text(ctx,'sneller boos',1300,380,fTekst(34,600),C.koraal,'center'); });
  pill(ctx,960,150,'meer in de film Slaap',C.grain,ramp(t,tFi,0.4),26); },
// ---- H1: biologische klok, vraag ----
s05(ctx,t,q){ bg(ctx,'schema'); const tKl=q.at('klok.'), tBk=q.at('biologische'), tWa=q.at('Wat');
  hoofdProfiel(620,520,1.8,1); alpha(ctx,ramp(t,tKl-0.3,0.5),()=>klok24(640,430,90,(t*3)%24,1));
  naamBij(ctx,'biologische klok','in je hersenen',640,780-30,ramp(t,tBk,0.4),'center',C.teal);
  alpha(ctx,ramp(t,0.6,0.4),()=>{ text(ctx,'wakker',1300,380,fTekst(40,700),C.goud,'center'); text(ctx,'moe',1300,520,fTekst(40,700),C.teal,'center'); arrow(ctx,1300,400,1300,480,C.line,3,14); });
  alpha(ctx,ramp(t,tWa,0.4),()=>text(ctx,'?',1550,450,fTitel(120),C.goud,'center')); },
// ---- H1: daglicht en avondlicht ----
s07(ctx,t,q){ const tDa=q.at('Daglicht'), tFe=q.at('Fel'), tSc=q.at('scherm,'), tLa=q.at('later.'), tMo=q.at('moe.');
  bg(ctx,'schema');
  // ochtend buiten
  alpha(ctx,1,()=>{ roundRect(ctx,120,170,780,560,18); ctx.save(); ctx.clip(); ctx.fillStyle='#8EB4D4'; ctx.fillRect(120,170,780,560); ctx.fillStyle='#5F8A50'; ctx.fillRect(120,600,780,140); dot(ctx,260,280,50,C.goud); bladerBoom(780,640,0.9); persoon(ctx,'noor',480,700,300,{outfit:'school',pose:'zwaai',uit:'blij',t,kijk:1}); ctx.restore(); text(ctx,'ochtend: daglicht',510,790,fTekst(36,700),C.goud,'center'); });
  pill(ctx,510,220,'klok gelijk',C.goud,ramp(t,tDa,0.4),28);
  // avond binnen
  alpha(ctx,ramp(t,tFe-0.3,0.5),()=>{ roundRect(ctx,1020,170,780,560,18); ctx.save(); ctx.clip(); ctx.fillStyle='#16203A'; ctx.fillRect(1020,170,780,560); ctx.fillStyle='#1E2A44'; ctx.fillRect(1020,620,780,120); persoon(ctx,'daan',1330,700,300,{outfit:'school',pose:'vasthouden',uit:'neutraal',t,kijk:1,hold:(c,x,y)=>{ roundRect(c,x-18,y-30,36,60,6); shape(c,'#2A2F3E','#8FA0B5',2); if(t>tSc){ c.fillStyle=rgba('#DDEBFF',0.9); c.fillRect(x-14,y-26,28,52); } }}); if(t>tSc){ ctx.fillStyle=rgba('#DDEBFF',0.12); ctx.beginPath(); ctx.arc(1360,430,200,0,6.283); ctx.fill(); } ctx.restore(); text(ctx,'avond: fel licht',1410,790,fTekst(36,700),C.text,'center'); });
  alpha(ctx,ramp(t,tLa,0.4),()=>{ pill(ctx,1410,220,'klok later → pas laat moe',C.koraal,1,28); }); },
// ---- H1 uitdaging: melatonine ----
s08(ctx,t,q){ bg(ctx,'schema'); const tDo=q.at('donker'), tMe=q.at('melatonine.'), tSl=q.at('slaperig.'), tFe=q.at('Fel'), tRe=q.at('remt');
  hoofdProfiel(560,520,1.8,1); const donker=ramp(t,tDo,1)*(1-0.8*ramp(t,tFe,0.6));
  alpha(ctx,1,()=>{ roundRect(ctx,1100,200,640,300,16); shape(ctx,donker>0.5?'#16203A':'#8EB4D4','#5A6A88',4); if(donker>0.5) dot(ctx,1600,280,26,'#E8E2C8'); else dot(ctx,1260,280,40,C.goud); });
  // melatonine-bolletjes uit de hersenen
  const n=Math.round(14*donker*ramp(t,tMe-0.5,1)); for(let i=0;i<n;i++){ const w=wander(i,t,30,0.5); dot(ctx,500+hash(i*2.1)*300+w.x,420+hash(i*3.9)*260+w.y,9,rgba(C.paars,0.75),C.paars,1.2); }
  naamBij(ctx,'melatonine','hormoon',560,820-30,ramp(t,tMe,0.4),'center',C.paars);
  pill(ctx,1420,580,'slaperig',C.paars,ramp(t,tSl,0.4)*(1-ramp(t,tFe,0.4)),30);
  alpha(ctx,ramp(t,tRe,0.4),()=>{ crossOut(ctx,700,560,50,1); pill(ctx,1420,580,'fel licht remt melatonine',C.goud,1,30); }); },
// ---- H2: natuur ----
s09(ctx,t,q){ const tJ=q.at('1984'), tBo=q.at('bomen.'), tMu=q.at('muur.'), tDa=q.at('dag'), tOg=q.at('ogen.'), tVe=q.at('veertig'), tDr=q.at('drie'), tBu=q.at('Buitenlicht'), tRu=q.at('rustiger'), tSl=q.at('slaapt');
  if(t<tOg-0.3){ bg(ctx,'schema'); pill(ctx,W/2,120,'het jaar 1984 · na een operatie',C.grain,ramp(t,tJ,0.4),28);
    const tSo=q.at('Sommigen'); ziekenhuisRaam(180,200,520,340,'bomen',ramp(t,tSo,0.5),'uitzicht op bomen'); ziekenhuisBed(230,780,'henk',t,ramp(t,tSo,0.5),t>tDa?'blij':'neutraal');
    ziekenhuisRaam(1220,200,520,340,'muur',ramp(t,tSo+0.6,0.5),'uitzicht op een muur'); ziekenhuisBed(1270,780,'bilal',t,ramp(t,tSo+0.6,0.5));
    alpha(ctx,ramp(t,tDa,0.4),()=>{ text(ctx,'± 8 dagen',1480,700-60,fTekst(40,700),C.text,'center'); text(ctx,'bijna een dag eerder naar huis',440,700-60,fTekst(34,700),C.groen,'center'); }); return; }
  if(t<tRu-0.3){ schoolplein(); const buiten=ramp(t,tVe,0.8);
    for(let i=0;i<6;i++) persoon(ctx,['noor','sam','lotte','daan','yasmin','bilal'][i],300+i*180,820,250,{outfit:'zomer',pose:i%2?'zwaai':'staan',uit:'blij',t,kijk:i%2?-1:1,a:buiten});
    pill(ctx,960,150,'elke dag 40 minuten extra buiten',C.goud,ramp(t,tVe,0.4),30); pill(ctx,960,240,'na 3 jaar: minder kinderen bijziend',C.groen,ramp(t,tDr+0.6,0.4),30);
    alpha(ctx,ramp(t,tBu,0.4),()=>{ ctx.fillStyle=rgba(C.bgSchema,0.92); roundRect(ctx,1300,330,500,250,16); ctx.fill(); text(ctx,'licht',1550,385,fTekst(32,600),C.text2,'center'); balk(1340,410,300,34,1,C.goud,1,'buiten'); balk(1340,470,300,34,0.08,C.goud,1,'binnen'); metaText(ctx,'buiten vaak 10–100× feller',1550,550,C.grain,'center',20); });
    return; }
  schoolplein(); for(let i=0;i<4;i++) bladerBoom(200+i*160,700,0.9+0.1*(i%2));
  persoon(ctx,'yasmin',900,820,330,{outfit:'winter',pose:'staan',uit:'blij',t,kijk:1}); persoon(ctx,'kind',1050,820,200,{uit:'lacht',pose:'zwaai',t,kijk:-1});
  pill(ctx,960,200,'veel mensen worden rustiger',C.groen,ramp(t,tRu,0.4),30); pill(ctx,960,290,'overdag buiten → vaak beter slapen',C.teal,ramp(t,tSl,0.4),30); },
// ---- H3: Semmelweis, vraag ----
s10(ctx,t,q){ const tJ=q.at('1847'), tKo=q.at('koorts.'), tDo=q.at('dood.'), tVu=q.at('vuil'), tCh=q.at('chloorwater.'), tMi=q.at('minder'), tGe=q.at('geloofden'), tNu=q.at('Nu'), tZv=q.at('ziekteverwekkers'), tHa=q.at('handen.',2), tWa=q.at('Waarom');
  bg(ctx,'schema');
  if(t<tNu-0.3){ pill(ctx,W/2,110,'het jaar 1847 · ziekenhuis in Wenen',C.grain,ramp(t,tJ,0.4),28);
    // grafiek sterfte
    alpha(ctx,ramp(t,tKo,0.4),()=>{ ctx.strokeStyle=C.line; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(1040,260); ctx.lineTo(1040,700); ctx.lineTo(1760,700); ctx.stroke(); metaText(ctx,'moeders die stierven',1040,240,C.grain,'left',22);
      const h1=360*ramp(t,tDo,0.8), h2=40*ramp(t,tMi,0.8); roundRect(ctx,1120,700-h1,200,h1,6); ctx.fillStyle=rgba(C.koraal,0.7); ctx.fill(); text(ctx,'vóór',1220,750,fTekst(32,600),C.text,'center');
      alpha(ctx,ramp(t,tMi,0.4),()=>{ roundRect(ctx,1460,700-h2,200,Math.max(h2,4),6); ctx.fillStyle=rgba(C.groen,0.8); ctx.fill(); text(ctx,'na handen wassen',1560,750,fTekst(32,600),C.text,'center'); }); });
    persoon(ctx,'kim',380,840,380,{pose:t>tCh?'wijs':'staan',uit:t>tGe?'bezorgd':'neutraal',t,kijk:1});
    alpha(ctx,ramp(t,tVu,0.4)*(1-ramp(t,tCh,0.4)),()=>{ hand(700,520,0.9,1); for(let i=0;i<6;i++) ziekmaker(640+hash(i)*120,440+hash(i*3)*150,1.2,1,t,i); });
    alpha(ctx,ramp(t,tCh,0.4),()=>{ ctx.beginPath(); ctx.moveTo(620,560); ctx.lineTo(780,560); ctx.lineTo(760,640); ctx.lineTo(640,640); ctx.closePath(); shape(ctx,rgba(C.teal,0.5),'#AFC0D0',2); metaText(ctx,'chloorwater',700,680,C.grain,'center',22); });
    pill(ctx,700,330,'"Ziekmakers? Bestaan niet."',C.text2,ramp(t,tGe,0.4),26); return; }
  hand(700,560,1.6,1); for(let i=0;i<14;i++) ziekmaker(560+hash(i*1.3)*300+Math.sin(t+i)*4,380+hash(i*2.7)*320,1.4,ramp(t,tZv+i*0.05,0.3),t,i);
  naamBij(ctx,'ziekteverwekkers','bacteriën en virussen',1250,330,ramp(t,tZv,0.4),'left',C.koraal);
  pill(ctx,1350,520,'je ziet ze niet',C.text2,ramp(t,tHa,0.4),28); alpha(ctx,ramp(t,tWa,0.4),()=>text(ctx,'?',1450,720,fTitel(120),C.goud,'center')); meta32('vergroot · niet op schaal'); },
// ---- H3: zeep, elleboog, tanden ----
s12(ctx,t,q){ const tVe=q.at('vet'), tWr=q.at('wrijven'), tDo=q.at('doodt'), tTw=q.at('twintig'), tHo=q.at('hoesten'), tDe=q.at('deurklink.'), tTa=q.at('Tandenpoetsen'), tPl=q.at('tandplak.'), tPo=q.at('Poetsen',2);
  if(t<tHo-0.3){ bg(ctx,'micro'); // ingezoomd op de huid
    ctx.fillStyle='#8C6A58'; ctx.fillRect(0,640,W,260); ctx.fillStyle='#A07A66'; for(let i=0;i<12;i++){ ctx.beginPath(); ctx.ellipse(80+i*170,640,90,26,0,Math.PI,0); ctx.fill(); }
    const los=ramp(t,tWr,1.4), weg=ramp(t,tWr+1,2.2);
    for(let i=0;i<6;i++){ const bx=220+i*280, by=600-los*80-weg*500; alpha(ctx,1,()=>{ ctx.beginPath(); ctx.ellipse(bx,by,90,40,0,0,6.283); shape(ctx,rgba(C.oker,0.45),C.oker,1.5); }); ziekmaker(bx-20,by,1.8,1,t,i); ziekmaker(bx+30,by+5,1.6,1,t,i+1);
      for(let k=0;k<10;k++){ const an=k*0.628; zeepMolecuul(bx+Math.cos(an)*(130-40*ramp(t,tVe,1)),by+Math.sin(an)*(70-20*ramp(t,tVe,1)),an+Math.PI,1.3,ramp(t,tVe-0.2,0.4)); } }
    naamBij(ctx,'vet en vuil','met ziekteverwekkers erin',220,470,ramp(t,0.3,0.4)*(1-los),'left',C.oker); naamBij(ctx,'zeep','',1700,300,ramp(t,tVe,0.4),'center',C.teal);
    alpha(ctx,ramp(t,tWr,0.4),()=>{ ctx.strokeStyle=rgba(C.teal,0.6); ctx.lineWidth=4; for(let k=0;k<4;k++){ ctx.beginPath(); for(let x=0;x<=W;x+=40){ const y=200+k*60+Math.sin(x*0.01+t*4+k)*14; x?ctx.lineTo(x,y):ctx.moveTo(x,y); } ctx.stroke(); } metaText(ctx,'spoelen',W/2,170,C.teal,'center',24); });
    pill(ctx,W/2,820-20,'zeep spoelt weg, doodt niet alles',C.goud,ramp(t,tDo,0.4),30); pill(ctx,W/2,100,'20 seconden · ook tussen je vingers',C.goud,ramp(t,tTw,0.4),28); meta32('vergroot · niet op schaal'); return; }
  bg(ctx,'schema');
  if(t<tTa-0.3){ persoon(ctx,'bilal',560,840,380,{outfit:'winter',pose:'denk',uit:'neutraal',t,kijk:1});
    alpha(ctx,ramp(t,tHo,0.4),()=>{ for(let i=0;i<20;i++){ const u=clamp((t-tHo)*0.8,0,1); dot(ctx,610+u*80*hash(i),430+(hash(i*3)-0.5)*60*u,4,rgba(C.koraal,0.7*(1-u*0.5))); } pill(ctx,560,320,'in je elleboog',C.groen,1,28); });
    alpha(ctx,ramp(t,tDe,0.4),()=>{ ctx.fillStyle='#8FA0B5'; roundRect(ctx,1300,300,40,480,6); ctx.fill(); roundRect(ctx,1250,520,140,30,14); shape(ctx,'#C9A35C','#E0C080',2); text(ctx,'schone deurklink',1320,840-20,fTekst(32,600),C.text,'center'); }); return; }
  tand(620,520,2.6,1,1-ramp(t,tPo,1.5)); naamBij(ctx,'tandplak','laagje bacteriën',1100,380,ramp(t,tPl,0.4),'left',C.oker);
  alpha(ctx,ramp(t,tPo,0.4),()=>{ const bx=560+Math.sin(t*12)*60; roundRect(ctx,bx-30,280,260,30,12); shape(ctx,'#5BA4C9','#8FC4E0',2); for(let k=0;k<6;k++){ ctx.fillStyle='#F2F2EE'; ctx.fillRect(bx-26+k*8,310,5,22); } pill(ctx,1260,560,'weg vóór het gaatjes maakt',C.groen,1,28); });
  meta32('vergroot'); },
// ---- samenvatting ----
s13(ctx,t,q){ bg(ctx,'schema'); const tDa=q.at('Daglicht'), tBu=q.at('Buiten'), tZe=q.at('zeep'), tDa2=q.at('Daarom');
  if(t<tDa2-0.3){ const P=[['slapen is werken','opslaan · groeien · herstellen',C.teal,0.2],['daglicht','zet je klok gelijk',C.goud,tDa],['buiten zijn','ogen · slaap · rust',C.groen,tBu],['zeep','spoelt ziekteverwekkers weg',C.koraal,tZe]];
    P.forEach(([n,m,k,tt],i)=>{ const x=130+i*430; alpha(ctx,ramp(t,tt-0.2,0.4),()=>{ roundRect(ctx,x,250,390,420,16); shape(ctx,rgba(C.bgSchema,0.95),k,2); text(ctx,n,x+195,330,fTekst(38,700),k,'center'); metaText(ctx,m,x+195,370,C.grain,'center',20);
      if(i===0) klok24(x+195,520,100,2,1); if(i===1) dot(ctx,x+195,520,60,C.goud); if(i===2) bladerBoom(x+195,640,0.8); if(i===3){ hand(x+195,560,0.7,1); for(let j=0;j<4;j++) zeepMolecuul(x+150+j*30,450,0.5*j,1,1); } }); }); return; }
  slaapkamer(1,t); noorInBed(260,760,t,1-ramp(t,tDa2+1,0.6)); klok24(1000,300,110,7,1); haak(ctx,240,820,800,'de hele nacht doorgewerkt',C.groen,ramp(t,tDa2+0.5,0.5)); },
// ---- eindkaart ----
s14(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Probeer het zelf',120,200,fTitel(80),C.text); metaText(ctx,'slaap, natuur en hygiëne',120,260,C.grain,'left',26);
  const P=[['Slaap- en buitendagboek','Houd een week bij hoe laat je slaapt, hoe fris je je voelt en hoe lang je buiten was. Zie je een verband? Wat zou je zelf willen veranderen?'],['Glitterproef','Wrijf wat glitter of kaneel op je handen. Spoel eerst alleen met water, daarna met zeep. Wat blijft er zitten? Wat zegt dat over ziekteverwekkers?'],['Uitzicht','Zoek op school het raam met het groenste uitzicht. Vraag tien mensen waar ze het liefst zitten om te leren, en waarom.']];
  P.forEach((p,i)=>{ const x=120+i*575; alpha(ctx,ramp(t,0.6+i*0.6,0.6),()=>{ roundRect(ctx,x,330,535,330,14); shape(ctx,rgba(C.bgSchema,0.95),C.line,1); text(ctx,p[0],x+28,392,fTekst(36,600),C.goud); ctx.font=fTekst(30); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,p[1],x+28,445,480,40); }); });
  alpha(ctx,ramp(t,2.6,0.6),()=>{ ctx.font=fTekst(36,600); ctx.fillStyle=C.goud; ctx.textAlign='left'; wrap(ctx,'Semmelweis wist niets van bacteriën. Toch werkte zijn idee. Hoe kon hij zien dat handen wassen hielp?',120,740,1680,46); });
  metaText(ctx,'biologie bij kamiel · stem: roos (elevenlabs) · versie 1.0 · oktober 2026',W/2,CAPTION_Y-10,C.text2,'center',22); },
};
