// ===== Een rondleiding door je lichaam — scènes (kerndoelen onderbouw, film 2b) =====
// Hulpjes uit film 1 (helpers1.js) en film 2 (helpers2.js: bodyOrgans, SYS, sysLabel, heart, lungs, kidney, bone, vessel, slaPlant, …) staan hierboven.
// Opbouw: links in een inzetcirkel het moment van de dag, in het midden het lichaam waarin organen oplichten, labels links en rechts.

BODY.cx=1120; Object.values(SYS).forEach(v=>{ if(v[3]===1400) v[3]=1500; if(v[3]===440) v[3]=900; }); SYS.hormoon[4]=170; SYS.hormoon[5]='regelen'; SYS.bloed[4]=250;
const U=BODY.h/8, TOP=BODY.yb-BODY.h, CX=BODY.cx;
// orgaanlabels: naam → [aanwijspunt x (in U vanaf cx), y (in U vanaf top), labelplek x, y]
const ORG={
  hersenen:[0,0.5,1500,110], ogen:[-0.3,0.9,900,230], ruggenmerg:[0,3.0,1500,260], zenuwen:[1.6,4.6,1500,700],
  mond:[0,1.25,1500,170], slokdarm:[0.08,2.3,1500,260], maag:[0.3,4.3,1750,-220], 'dunne darm':[0.1,5.0,1730,1445], 'dikke darm':[-0.9,5.2,900,700], alvleesklier:[0.75,4.62,1700,610], lever:[-0.95,4.05,900,560],
  spieren:[-1.55,3.1,900,330], botten:[0.7,6.6,1500,760], schedel:[0.55,0.3,1500,90],
  neus:[0,1.0,900,180], luchtpijp:[-0.1,2.3,900,260], longen:[-0.95,3.3,900,420],
  hart:[-0.3,2.95,900,300], bloedvaten:[-0.7,7.2,900,760],
  nieren:[0.95,4.55,1500,520], urineleiders:[0.4,5.3,1500,640], blaas:[0.15,5.9,1500,760],
  huid:[-1.4,3.6,900,480], lymfeklieren:[1.35,2.5,1500,300], 'witte bloedcellen':[0.6,7.0,1500,760],
  hypofyse:[0,0.85,1500,130], schildklier:[0.2,1.65,1500,230], eierstokken:[0.5,5.4,1300,300], baarmoeder:[0.1,5.45,1500,678], zaadballen:[0.1,6.25,1500,800],
};
function orgLabel(k,a,meta='',color=C.text){ if(a<=0.01) return; const o=ORG[k]; label(ctx,k,meta,CX+o[0]*U,TOP+o[1]*U,o[2],o[3],a,color); }
function orgRing(k,a,rx=40,ry=40){ if(a<=0.01) return; const o=ORG[k]; ctx.save(); ctx.globalAlpha*=a; ctx.setLineDash([8,7]); ctx.beginPath(); ctx.ellipse(CX+o[0]*U,TOP+o[1]*U,rx,ry,0,0,6.283); ctx.strokeStyle=C.goud; ctx.lineWidth=2.5; ctx.stroke(); ctx.restore(); }
// extra organen die bodyOrgans niet apart tekent
function liver(a){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; const x=CX-70,y=TOP+U*4.05; ctx.beginPath(); ctx.moveTo(x-80,y-30); ctx.quadraticCurveTo(x+40,y-50,x+70,y-10); ctx.quadraticCurveTo(x+30,y+40,x-40,y+30); ctx.quadraticCurveTo(x-90,y+10,x-80,y-30); ctx.closePath(); shape(ctx,'#8E4A44','#B86A62',2); ctx.restore(); }
function pancreas(a){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.beginPath(); ctx.ellipse(CX+40,TOP+U*4.62,70,14,-0.15,0,6.283); shape(ctx,rgba(C.goud,0.6),lighten(C.goud,0.3),1.5); ctx.restore(); }
function mouth(a){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.strokeStyle=C.oker; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(CX,TOP+U*1.1,U*0.3,0.3,2.84); ctx.stroke(); ctx.restore(); }
function skull(a){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.beginPath(); ctx.arc(CX,TOP+U,U*0.98,0,6.283); ctx.strokeStyle='#E9E4D6'; ctx.lineWidth=6; ctx.stroke(); ctx.restore(); }
function skin(a){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.strokeStyle='#E0BE9C'; ctx.lineWidth=7; const u=U,x=CX,y=BODY.yb,h=BODY.h; ctx.beginPath(); ctx.arc(x,y-h+u,u*0.9+4,0,6.283); ctx.stroke(); roundRect(ctx,x-u*1.3-4,y-h+u*2.1-4,u*2.6+8,u*3.6+8,u*0.8); ctx.stroke(); roundRect(ctx,x-u*1.2-4,y-h+u*5.5-4,u*1.0+8,u*2.5+8,u*0.4); ctx.stroke(); roundRect(ctx,x+u*0.2-4,y-h+u*5.5-4,u*1.0+8,u*2.5+8,u*0.4); ctx.stroke(); ctx.restore(); }
function eyes(a){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; [[-0.3],[0.3]].forEach(([d])=>dot(ctx,CX+d*U,TOP+U*0.9,9,C.teal,lighten(C.teal,0.3),1.5)); ctx.restore(); }
function nose(a){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.strokeStyle=C.teal; ctx.lineWidth=5; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(CX,TOP+U*0.95); ctx.lineTo(CX,TOP+U*1.2); ctx.lineTo(CX,TOP+U*2.6); ctx.stroke(); ctx.restore(); }
function pulse(t){ return 0.5+0.5*Math.sin(t*2.2); }
// inzet: moment van de dag
function vignette(kind,cx,cy,r,a,t=0){ inset(cx,cy,r,a,()=>{ ctx.save(); ctx.translate(cx,cy); const k=r/170;
  ctx.scale(k,k); ctx.lineCap='round';
  if(kind==='nacht'||kind==='slapen'){ ctx.fillStyle='#0D1420'; ctx.fillRect(-200,-200,400,400); dot(ctx,70,-80,34,C.goud); dot(ctx,56,-90,30,'#0D1420'); roundRect(ctx,-120,10,220,60,12); shape(ctx,C.fill,C.line,2); roundRect(ctx,-110,-20,60,36,10); shape(ctx,C.text2,C.line,1.5); ctx.beginPath(); ctx.arc(-40,0,22,0,6.283); shape(ctx,C.mens,lighten(C.mens,0.3),1.5); roundRect(ctx,-14,-12,110,34,10); shape(ctx,'#6E7FA8',lighten('#6E7FA8',0.2),1.5); if(kind==='nacht'){ for(let i=0;i<3;i++) text(ctx,'z',40+i*18,-30-i*18,fTekst(22+i*6,600),C.text2,'center'); } }
  if(kind==='wekker'){ dot(ctx,0,10,80,C.fill,C.line,3); ctx.strokeStyle=C.text; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(0,10); ctx.lineTo(0,-45); ctx.moveTo(0,10); ctx.lineTo(40,10); ctx.stroke(); dot(ctx,0,10,5,C.goud); ctx.lineWidth=6; ctx.strokeStyle=C.line; ctx.beginPath(); ctx.moveTo(-60,-50); ctx.lineTo(-80,-70); ctx.moveTo(60,-50); ctx.lineTo(80,-70); ctx.stroke(); const sh=Math.sin(t*25)*6; ctx.strokeStyle=C.goud; ctx.lineWidth=3; [-1,1].forEach(d=>{ ctx.beginPath(); ctx.arc(d*95+sh,-20,14,0,6.283); ctx.stroke(); }); text(ctx,'7:00',0,-100,fMeta(26),C.grain,'center'); }
  if(kind==='ontbijt'){ ctx.beginPath(); ctx.ellipse(0,20,110,40,0,0,6.283); shape(ctx,C.fill,C.line,2); ctx.save(); ctx.translate(-10,-10); ctx.rotate(-0.1); roundRect(ctx,-60,-45,120,80,22); shape(ctx,C.oker,lighten(C.oker,0.3),2); ctx.beginPath(); ctx.arc(-30,-45,30,Math.PI,0); ctx.arc(30,-45,30,Math.PI,0); shape(ctx,C.oker,lighten(C.oker,0.3),2); ctx.restore(); }
  if(kind==='fiets'){ ctx.strokeStyle=C.line; ctx.lineWidth=4; dot(ctx,-70,40,48,'rgba(0,0,0,0)',C.line,4); dot(ctx,70,40,48,'rgba(0,0,0,0)',C.line,4); ctx.beginPath(); ctx.moveTo(-70,40); ctx.lineTo(-20,-30); ctx.lineTo(60,-30); ctx.lineTo(70,40); ctx.moveTo(-20,-30); ctx.lineTo(10,40); ctx.lineTo(60,-30); ctx.moveTo(10,40); ctx.lineTo(-70,40); ctx.moveTo(60,-30); ctx.lineTo(50,-60); ctx.moveTo(-20,-30); ctx.lineTo(-30,-55); ctx.stroke(); ctx.lineWidth=6; ctx.beginPath(); ctx.moveTo(-45,-55); ctx.lineTo(-15,-55); ctx.stroke(); human(ctx,15,-20,130,1,C.mens); }
  if(kind==='wc'){ roundRect(ctx,-60,-110,120,220,8); shape(ctx,C.fill,C.line,2); dot(ctx,35,0,7,C.goud); text(ctx,'WC',0,-60,fTekst(34,700),C.text,'center'); }
  if(kind==='klas'){ [[-55,0],[55,0]].forEach(([x],i)=>{ human(ctx,x,110,200,1,C.mens); }); for(let i=0;i<3;i++){ const u=((t*0.8+i/3)%1); dot(ctx,70+u*60,-60-u*30-i*8,6+u*8,rgba(C.koraal,0.7*(1-u))); } }
  if(kind==='koud'){ human(ctx,-40,110,210,1,C.mens); ctx.strokeStyle=C.teal; ctx.lineWidth=3; for(let i=0;i<3;i++){ const x=50+i*35, y=-70+i*30; ctx.beginPath(); for(let k=0;k<3;k++){ const a=k*Math.PI/3; ctx.moveTo(x-Math.cos(a)*16,y-Math.sin(a)*16); ctx.lineTo(x+Math.cos(a)*16,y+Math.sin(a)*16); } ctx.stroke(); } }
  if(kind==='avond'){ ctx.fillStyle='#16203A'; ctx.fillRect(-200,-200,400,400); dot(ctx,70,-80,34,C.goud); dot(ctx,56,-90,30,'#16203A'); roundRect(ctx,-120,30,200,50,12); shape(ctx,C.fill,C.line,2); human(ctx,-60,30,150,1,C.mens); }
  if(kind==='tuin'){ ctx.fillStyle='#2A2119'; ctx.fillRect(-200,40,400,200); dot(ctx,-90,-90,26,C.goud); krop(0,40,0.4,0); }
  ctx.restore(); }); }
const V={x:270,y:330,r:150};
function dagInzet(kind,a,t){ vignette(kind,V.x,V.y,V.r,a,t); }
function tijd(s,a){ pill(ctx,V.x,V.y+V.r+60,s,C.grain,a,26); }

// ================= SCÈNES =================
const SCENES={
// ---- cold open: nacht ----
s01(ctx,t,q){ bg(ctx,'schema'); ctx.fillStyle='#0D1420'; ctx.fillRect(0,0,W,H);
  dot(ctx,1500,200,70,C.goud); dot(ctx,1470,180,64,'#0D1420'); for(let i=0;i<30;i++) dot(ctx,hash(i*3.1)*W,hash(i*7.7)*500,1.5+hash(i)*1.5,rgba(C.text,0.6));
  roundRect(ctx,520,560,900,120,24); shape(ctx,C.fill,C.line,2); roundRect(ctx,560,480,180,90,20); shape(ctx,C.text2,C.line,1.5); roundRect(ctx,760,500,560,70,18); shape(ctx,'#6E7FA8',lighten('#6E7FA8',0.2),1.5); ctx.beginPath(); ctx.arc(690,520,44,0,6.283); shape(ctx,C.mens,lighten(C.mens,0.3),1.5);
  for(let i=0;i<3;i++) alpha(ctx,0.5+0.5*Math.sin(t*2-i),()=>text(ctx,'z',800+i*30,440-i*30,fTekst(30+i*8,600),C.text2,'center'));
  pill(ctx,960,150,'6:00',C.grain,ramp(t,0.2,0.4),34);
  pill(ctx,960,780,'hoeveel van je organen zijn nu aan het werk?',C.goud,ramp(t,q.at('Hoeveel'),0.5),36);
},
// ---- titel ----
s03(ctx,t,q){ bg(ctx,'schema'); const a=ramp(t,0.1,0.7);
  alpha(ctx,a,()=>{ text(ctx,'Een rondleiding',120,340,fTitel(100),C.text); text(ctx,'door je lichaam',120,440,fTitel(100),C.text); text(ctx,'Een dag uit je leven, van binnen bekeken',120,520,fTekst(44),C.text2); });
  alpha(ctx,ramp(t,0.5,1.2),()=>{ ctx.save(); ctx.translate(1420,0); ctx.scale(0.72,0.72); ctx.translate(-960,120); bodyOrgans({sil:0.45,zenuw:1,spijs:1,adem:1,bloed:1,uitsch:1,skelet:0,hormoon:1,afweer:1,t,beat:t*5,breath:t*2.5}); ctx.restore(); });
  metaText(ctx,'ONDERBOUW · KERNDOELEN · FILM 2B',W-80,60,C.text2,'right',24); },
// ---- H1: wakker worden, zenuwstelsel ----
s04(ctx,t,q){ bg(ctx,'schema'); const tW=q.at('wekker');
  const intro=1-ramp(t,tW-0.3,0.6);
  alpha(ctx,intro,()=>{ bodyOrgans({sil:0.3,zenuw:0.6,spijs:0.6,adem:0.6,bloed:0.6,uitsch:0.6,hormoon:0.6,afweer:0.6,t,beat:t*3,breath:t*1.5}); pill(ctx,960,100,'bijna al je organen werken door, ook als je slaapt',C.goud,ramp(t,q.at('Bijna'),0.5),30); pill(ctx,960,870,'alle namen hoef je niet te onthouden',C.text2,fadeIO(t,q.at('namen'),q.at('wekker'),0.4),30); dagInzet('nacht',1,t); });
  alpha(ctx,1-intro,()=>{ const h=ramp(t,q.at('hersenen'),0.5), r=ramp(t,q.at('ruggenmerg'),0.5), z=ramp(t,q.at('zenuwen'),0.5), o=ramp(t,q.at('ogen'),0.5);
    bodyOrgans({sil:0.3,zenuw:Math.max(h,r,z),t}); eyes(o);
    dagInzet('wekker',1,t); tijd('7:00 · wakker worden',1);
    orgLabel('hersenen',h,'sturen alles aan',C.paars); orgRing('hersenen',h*(1-r),60,34);
    orgLabel('ruggenmerg',r,'',C.paars); orgLabel('zenuwen',z,'signalen heen en weer',C.paars); orgLabel('ogen',o,'vangen licht',C.teal);
    const sig=fadeIO(t,q.at('Signalen'),q.at('ogen'),0.4); for(let i=0;i<5;i++){ const u=((t*0.6+i/5)%1); alpha(ctx,sig,()=>dot(ctx,CX,TOP+U*(1.6+u*3.8),6,C.paars)); }
    pill(ctx,960,100,'zenuwstelsel',C.goud,ramp(t,q.at('zenuwstelsel'),0.5),34); });
},
// ---- H1: ontbijt, spijsvertering, lever-vraag ----
s05(ctx,t,q){ bg(ctx,'schema'); const K=['mond','slokdarm','maag','dunne','dikke'];
  const m=ramp(t,q.at('mond'),0.5), sl=ramp(t,q.at('slokdarm'),0.5), ma=ramp(t,q.at('maag'),0.5), dd=ramp(t,q.at('dunne'),0.5), dk=ramp(t,q.at('dikke'),0.5), al=ramp(t,q.at('alvleesklier'),0.5), le=ramp(t,q.at('lever'),0.5);
  bodyOrgans({sil:0.3,spijs:ramp(t,q.at('spijsverteringsstelsel'),0.6),t}); mouth(m); pancreas(al); liver(le);
  dagInzet('ontbijt',1,t); tijd('7:30 · ontbijt',1);
  orgLabel('mond',m,'tanden en speeksel',C.oker); orgLabel('slokdarm',sl,'duwt naar de maag',C.oker); orgLabel('maag',ma,'mengt met zuur',C.oker);
  orgLabel('dunne darm',dd,'voedingsstoffen → bloed',C.oker); orgLabel('dikke darm',dk,'haalt water eruit',C.oker);
  orgLabel('alvleesklier',al,'sap dat eten afbreekt',C.goud); orgLabel('lever',le,'rechts onder je ribben',C.koraal); orgRing('lever',ramp(t,q.at('groot'),0.4),90,50);
  const bol=fadeIO(t,q.at('ontbijten'),q.at('alvleesklier'),0.4); const stops=[[q.at('mond'),0,1.25],[q.at('slokdarm'),0.08,2.3],[q.at('maag'),0.3,4.3],[q.at('dunne'),0.1,5.0],[q.at('dikke'),-0.9,5.2]]; let px=CX,py=TOP+U*1.25; for(let i=1;i<stops.length;i++){ const u=clamp((t-stops[i][0]+1)/1,0,1); if(t>=stops[i-1][0]){ px=lerp(CX+stops[i-1][1]*U,CX+stops[i][1]*U,u); py=lerp(TOP+stops[i-1][2]*U,TOP+stops[i][2]*U,u); } } alpha(ctx,bol*ramp(t,q.at('mond'),0.3),()=>dot(ctx,px,py,9,C.oker,lighten(C.oker,0.4),1.5));
  pill(ctx,960,100,'spijsverteringsstelsel',C.goud,fadeIO(t,q.at('spijsverteringsstelsel'),q.at('welk'),0.5),34);
  pill(ctx,960,100,'bij welk stelsel hoort de lever?',C.goud,ramp(t,q.at('welk'),0.5),34);
},
// ---- H2: lever; fietsen: spieren en botten ----
s07(ctx,t,q){ bg(ctx,'schema'); const tF=q.at('fietst');
  const a1=1-ramp(t,tF-0.3,0.6); alpha(ctx,a1,()=>{ bodyOrgans({sil:0.3,spijs:0.6,t}); liver(1); orgLabel('lever',1,'bij je spijsvertering',C.koraal); dagInzet('ontbijt',1,t);
    pill(ctx,960,100,'maakt een sap voor het verteren van vet',C.koraal,fadeIO(t,q.at('sap'),q.at('bewaart'),0.4),30); pill(ctx,960,100,'bewaart voedingsstoffen voor later',C.koraal,ramp(t,q.at('bewaart'),0.4),30); });
  alpha(ctx,1-a1,()=>{ const sp=ramp(t,q.at('spieren'),0.5), bo=ramp(t,q.at('botten'),0.5), sc=ramp(t,q.at('schedel'),0.5);
    bodyOrgans({sil:0.3,skelet:bo,spier:sp,t}); skull(sc); dagInzet('fiets',1,t); tijd('8:15 · naar school',1);
    orgLabel('spieren',sp,'trekken aan je botten',C.koraal); orgLabel('botten',bo,'vorm en stevigheid','#E9E4D6'); orgLabel('schedel',sc,'beschermt je hersenen','#E9E4D6');
    pill(ctx,960,100,'spierstelsel',C.goud,fadeIO(t,q.at('spierstelsel'),q.at('skelet'),0.4),34); pill(ctx,960,100,'spierstelsel · skelet',C.goud,ramp(t,q.at('skelet'),0.4),34); });
},
// ---- H2: ademhaling en bloedvaten ----
s08(ctx,t,q){ bg(ctx,'schema'); const ne=ramp(t,q.at('neus'),0.5), lu=ramp(t,q.at('luchtpijp'),0.5), lo=ramp(t,q.at('longen'),0.5), ha=ramp(t,q.at('hart'),0.5), bv=ramp(t,q.at('bloedvaten'),0.5);
  bodyOrgans({sil:0.3,adem:Math.max(ne,lo),bloed:ha,t,beat:t*8,breath:t*4}); nose(Math.max(ne,lu)); dagInzet('fiets',1,t); tijd('8:30 · ademt dieper',1);
  orgLabel('neus',ne,'',C.teal); orgLabel('luchtpijp',lu,'',C.teal); orgLabel('longen',lo,'zuurstof erin',C.teal);
  const ox=fadeIO(t,q.at('zuurstof'),q.at('hart'),0.4); for(let i=0;i<5;i++){ const u=((t*0.5+i/5)%1); alpha(ctx,ox,()=>{ dot(ctx,CX-U*0.9+Math.sin(u*6)*10,TOP+U*(2.6+u*1.0),7,C.teal); dot(ctx,CX+U*0.7,TOP+U*(3.6-u*1.0),7,rgba(C.text2,0.8)); }); }
  naamBij(ctx,'hart','pompt het bloed rond',1215,445,ha,'left',C.koraal); naamBij(ctx,'bloedvaten','tot in je tenen',1250,790,bv,'left',C.koraal);
  pill(ctx,960,100,'ademhalingsstelsel',C.goud,fadeIO(t,q.at('ademhalingsstelsel'),q.at('hart'),0.4),34);
  pill(ctx,960,870,'100 000 keer per dag',C.koraal,fadeIO(t,q.at('Honderdduizend'),q.at('bloedvatenstelsel'),0.4),30);
  pill(ctx,960,100,'bloedvatenstelsel',C.goud,ramp(t,q.at('bloedvatenstelsel'),0.4),34);
},
// ---- H2: wc, uitscheiding ----
s09(ctx,t,q){ bg(ctx,'schema'); const ni=ramp(t,q.at('nieren'),0.5), ur=ramp(t,q.at('urineleiders'),0.5), bl=ramp(t,q.at('blaas'),0.5);
  bodyOrgans({sil:0.3,uitsch:Math.max(ni,ur,bl),bloed:0.35,t}); dagInzet('wc',1,t); tijd('10:00 · op school',1);
  orgLabel('nieren',ni,'maken je bloed schoon','#C47070'); orgLabel('urineleiders',ur,'',C.teal); orgLabel('blaas',bl,'bewaart de urine',C.teal);
  const fl=fadeIO(t,q.at('Afvalstoffen'),q.at('uitscheidingsstelsel'),0.4); for(let i=0;i<4;i++){ const u=((t*0.5+i/4)%1); alpha(ctx,fl,()=>{ dot(ctx,lerp(CX+85,CX+25,u),lerp(TOP+U*4.8,TOP+U*5.75,u),6,C.teal); dot(ctx,lerp(CX-55,CX+5,u),lerp(TOP+U*4.8,TOP+U*5.75,u),6,C.teal); }); }
  pill(ctx,960,870,'de hele dag, ook vannacht',C.grain,fadeIO(t,q.at('hele'),q.at('Afvalstoffen'),0.4),28);
  pill(ctx,960,870,'afvalstoffen + te veel water = urine',C.teal,fadeIO(t,q.at('urine'),q.at('uitscheidingsstelsel'),0.4),28);
  pill(ctx,960,100,'uitscheidingsstelsel',C.goud,ramp(t,q.at('uitscheidingsstelsel'),0.4),34);
},
// ---- H2: afweer ----
s10(ctx,t,q){ bg(ctx,'schema'); const af=ramp(t,q.at('afweersysteem'),0.5), wb=ramp(t,q.at('witte'),0.5), ly=ramp(t,q.at('lymfeklieren'),0.5);
  bodyOrgans({sil:0.3,bloed:0.35,afweer:Math.max(af,ly),t}); dagInzet('klas',1,t); tijd('11:00 · in de les',1);
  inset(1640,620,140,wb,()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(1500,480,280,280); vessel(1640,470,180,300,t,1); const at=ramp(t,q.at('vallen'),0.5); if(at>0.01){ const ex=1640+40, ey=620+((t*55+200)%300)-150; for(let i=0;i<3;i++){ const a=i*2.1+t*3; alpha(ctx,at,()=>dot(ctx,ex+Math.cos(a)*30,ey+Math.sin(a)*30,5,C.groen)); } } });
  metaText(ctx,'witte bloedcellen vallen ziekteverwekkers aan',1640,790,C.grain,'center',22*clamp(wb,0.01,1));
  orgLabel('lymfeklieren',ly,'in hals en oksels',C.groen);
  pill(ctx,960,870,'meestal word je niet ziek',C.groen,fadeIO(t,q.at('Meestal'),q.at('witte'),0.4),30);
  pill(ctx,960,100,'afweersysteem',C.goud,af,34);
},
// ---- H2: buiten, huid-vraag ----
s11(ctx,t,q){ bg(ctx,'schema'); const hu=ramp(t,q.at('huid'),0.5); bodyOrgans({sil:0.3,t}); skin(hu); dagInzet('koud',1,t); tijd('12:30 · pauze, buiten',1);
  orgLabel('huid',hu,'voelt de kou','#E0BE9C'); pill(ctx,960,100,'is je huid een orgaan?',C.goud,ramp(t,q.at('orgaan'),0.5),36); },
// ---- H3: huid = orgaan; avond, hormonen-vraag ----
s13(ctx,t,q){ bg(ctx,'schema'); const tA=q.at('Avonds');
  const a1=1-ramp(t,tA-0.3,0.6); alpha(ctx,a1,()=>{ bodyOrgans({sil:0.3,t}); skin(1); dagInzet('koud',1,t); orgLabel('huid',1,'je grootste orgaan','#E0BE9C');
    // doorsnede huid
    const cs=ramp(t,q.at('laag'),0.5); alpha(ctx,cs,()=>{ const x=1400,y=420,w=420; roundRect(ctx,x,y,w,60,6); shape(ctx,'#E0BE9C','#F0D6B8',1.5); roundRect(ctx,x,y+60,w,170,6); shape(ctx,rgba(C.grain,0.35),C.grain,1.5); ctx.strokeStyle=C.paars; ctx.lineWidth=2.5; ctx.beginPath(); ctx.moveTo(x+80,y+230); ctx.quadraticCurveTo(x+100,y+120,x+140,y+70); ctx.moveTo(x+300,y+230); ctx.quadraticCurveTo(x+320,y+140,x+360,y+75); ctx.stroke(); ctx.strokeStyle='#C47070'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x+200,y+230); ctx.quadraticCurveTo(x+210,y+120,x+250,y+80); ctx.stroke();
      metaText(ctx,'dekweefsel',x,y-14,'#E0BE9C','left',22); metaText(ctx,'bindweefsel, zenuwen, bloedvaten',x,y+260,C.grain,'left',22); });
    pill(ctx,960,100,'taak: beschermen en je temperatuur regelen',C.goud,ramp(t,q.at('Taak'),0.4),30); });
  alpha(ctx,1-a1,()=>{ bodyOrgans({sil:0.3,bloed:0.5,hormoon:ramp(t,q.at('hormonen'),0.5),t}); dagInzet('avond',1,t); tijd('20:00 · moe',1);
    const hm=ramp(t,q.at('stoffen'),0.5); for(let i=0;i<8;i++){ const u=((t*0.25+i/8)%1); const a=u*6.283; alpha(ctx,hm,()=>dot(ctx,CX-30+Math.cos(a)*U*1.0,TOP+U*2.95+Math.sin(a)*U*2.6,6,C.goud)); }
    pill(ctx,960,870,'hormonen: stoffen die in je bloed reizen',C.goud,hm,28);
    pill(ctx,960,100,'je groeit, vooral als je slaapt',C.text,fadeIO(t,q.at('groeit'),q.at('zijn'),0.4),30);
    pill(ctx,960,100,'hormonen: alleen in de puberteit?',C.goud,ramp(t,q.at('zijn'),0.5),34); });
},
// ---- H3: hormoonklieren en voortplanting ----
s15(ctx,t,q){ bg(ctx,'schema'); const hy=ramp(t,q.at('hypofyse'),0.5), sk=ramp(t,q.at('schildklier'),0.5), vp=ramp(t,q.at('voortplantingsorganen'),0.5), ei=ramp(t,q.at('Eierstokken'),0.5), ba=ramp(t,q.at('baarmoeder'),0.5), za=ramp(t,q.at('zaadballen'),0.5);
  bodyOrgans({sil:0.3,hormoon:Math.max(hy,sk),voortpl:vp,t}); dagInzet('avond',1,t); tijd('20:00 · groeien',1);
  alpha(ctx,za,()=>{ dot(ctx,CX-18,TOP+U*6.25,10,C.koraal); dot(ctx,CX+22,TOP+U*6.25,10,C.koraal); });
  pill(ctx,960,870,'je hele leven, van baby tot oud',C.goud,fadeIO(t,q.at('leven'),q.at('hypofyse'),0.4),30);
  orgLabel('hypofyse',hy,'regelt je groei',C.goud); orgLabel('schildklier',sk,'hoe snel je lichaam werkt',C.goud);
  orgLabel('eierstokken',ei,'',C.koraal); orgLabel('baarmoeder',ba,'',C.koraal); orgLabel('zaadballen',za,'',C.koraal);
  pill(ctx,960,100,'hormoonstelsel',C.goud,fadeIO(t,q.at('hormoonstelsel'),q.at('voortplantingsstelsel'),0.4),34);
  pill(ctx,960,870,'in de puberteit: eicellen of zaadcellen',C.koraal,fadeIO(t,q.at('puberteit'),q.at('voortplantingsstelsel'),0.4),28);
  pill(ctx,960,100,'voortplantingsstelsel',C.goud,ramp(t,q.at('voortplantingsstelsel'),0.4),34);
},
// ---- H3 havo/vwo: organen bij twee stelsels ----
s16(ctx,t,q){ bg(ctx,'schema'); const cards=[['alvleesklier',q.at('alvleesklier'),['spijsverteringsstelsel','hormoonstelsel'],q.at('Spijsvertering'),()=>{ ctx.beginPath(); ctx.ellipse(0,0,90,22,-0.15,0,6.283); shape(ctx,rgba(C.goud,0.6),lighten(C.goud,0.3),2); },'sap voor je darm · insuline'],
  ['lever',q.at('lever'),['spijsverteringsstelsel','uitscheidingsstelsel'],q.at('Spijsvertering',2),()=>{ ctx.beginPath(); ctx.moveTo(-90,-30); ctx.quadraticCurveTo(40,-50,80,-10); ctx.quadraticCurveTo(30,40,-40,30); ctx.quadraticCurveTo(-100,10,-90,-30); ctx.closePath(); shape(ctx,'#8E4A44','#B86A62',2); },'verteert · breekt gif af'],
  ['huid',q.at('huid'),['afweer en bescherming','uitscheidingsstelsel'],q.at('zweet'),()=>{ roundRect(ctx,-90,-40,180,80,10); shape(ctx,'#C9A27E','#E0BE9C',2); roundRect(ctx,-90,-40,180,22,8); shape(ctx,'#E0BE9C','#F0D6B8',1.5); },'beschermt · zweet = afval eruit']];
  cards.forEach(([n,tt,sys,tt2,fn,meta],i)=>{ const x=330+i*630, a=ramp(t,tt,0.5); alpha(ctx,a,()=>{ roundRect(ctx,x-280,230,560,520,16); shape(ctx,rgba(C.fill,0.6),C.line,1); ctx.save(); ctx.translate(x,360); fn(); ctx.restore(); text(ctx,n,x,470,fTekst(40,600),C.text,'center'); metaText(ctx,meta,x,515,C.grain,'center',22);
      const c2=ramp(t,tt2,0.4); pill(ctx,x,600,sys[0],C.oker,1,26); alpha(ctx,c2,()=>{ text(ctx,'én',x,665,fTekst(30,600),C.goud,'center'); }); pill(ctx,x,720,sys[1],C.teal,c2,26); }); });
  // chips() centreert over W; per kaart zelf tekenen
  pill(ctx,960,120,'sommige organen horen bij twee stelsels',C.goud,ramp(t,q.at('Sommige'),0.5),32);
  pill(ctx,960,850,'antwoord c was dus niet zo gek',C.text2,fadeIO(t,q.at('Antwoord'),q.at('huid'),0.4),26);
  pill(ctx,960,850,'geen losse hokjes: ze werken de hele dag samen',C.goud,ramp(t,q.at('hokjes'),0.5),30);
},
// ---- H3: slapen; hond en muis ----
s17(ctx,t,q){ bg(ctx,'schema'); ctx.fillStyle=rgba('#0D1420',0.5); ctx.fillRect(0,0,W,H); const tH=q.at('hond');
  const a1=1-ramp(t,tH-0.3,0.6); alpha(ctx,a1,()=>{ const p=pulse(t);
    bodyOrgans({sil:0.3,zenuw:0.4+0.4*ramp(t,q.at('hersenen'),0.4),bloed:0.3+0.5*ramp(t,q.at('hart'),0.4),adem:0.3+0.5*ramp(t,q.at('longen'),0.4),uitsch:0.3+0.5*ramp(t,q.at('nieren'),0.4),t,beat:t*4,breath:t*2});
    dagInzet('slapen',1,t); tijd('23:00 · slapen',1);
    orgLabel('hersenen',ramp(t,q.at('hersenen'),0.4),'stoppen niet',C.paars); orgLabel('hart',ramp(t,q.at('hart'),0.4),'klopt door',C.koraal); orgLabel('longen',ramp(t,q.at('longen'),0.4),'ademen door',C.teal); orgLabel('nieren',ramp(t,q.at('nieren'),0.4),'maken bloed schoon','#C47070');
    pill(ctx,960,100,'dag en nacht',C.goud,ramp(t,q.at('Dag'),0.5),34); });
  alpha(ctx,1-a1,()=>{ const gy=760; ctx.strokeStyle=rgba(C.line,0.4); ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(160,gy); ctx.lineTo(1760,gy); ctx.stroke();
    // hond (als kat, met hangoren) en muis
    alpha(ctx,ramp(t,tH,0.5),()=>{ const x=520,y=gy,s=1.3,c=C.okerD; ctx.beginPath(); ctx.ellipse(x,y-55*s,95*s,48*s,0,0,6.283); shape(ctx,c,lighten(c,0.3),2); ctx.beginPath(); ctx.arc(x+92*s,y-110*s,40*s,0,6.283); shape(ctx,c,lighten(c,0.3),2); [[64,-120],[122,-120]].forEach(([dx,dy])=>{ ctx.beginPath(); ctx.ellipse(x+dx*s,y+dy*s+22*s,12*s,26*s,0,0,6.283); shape(ctx,c,lighten(c,0.3),2); }); [[-60],[-30],[40],[70]].forEach(([dx])=>{ roundRect(ctx,x+dx*s-9*s,y-30*s,18*s,30*s,8*s); shape(ctx,c,lighten(c,0.3),1.5); }); ctx.strokeStyle=c; ctx.lineWidth=12*s; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x-88*s,y-70*s); ctx.quadraticCurveTo(x-130*s,y-60*s,x-140*s,y-120*s); ctx.stroke(); ctx.fillStyle=C.bgSchema; ctx.beginPath(); ctx.arc(x+80*s,y-116*s,4*s,0,6.283); ctx.arc(x+106*s,y-116*s,4*s,0,6.283); ctx.fill(); dot(ctx,x+130*s,y-100*s,6*s,C.bgSchema); text(ctx,'hond',x,gy+60,fTekst(32,600),C.text,'center'); });
    alpha(ctx,ramp(t,q.at('muis'),0.5),()=>{ const x=1000,y=gy,s=0.9,c=C.mens; ctx.beginPath(); ctx.ellipse(x,y-28*s,60*s,28*s,0,0,6.283); shape(ctx,c,lighten(c,0.3),2); ctx.beginPath(); ctx.arc(x+50*s,y-40*s,20*s,0,6.283); shape(ctx,c,lighten(c,0.3),2); dot(ctx,x+48*s,y-62*s,9*s,c,lighten(c,0.3),1.5); ctx.strokeStyle=c; ctx.lineWidth=3*s; ctx.beginPath(); ctx.moveTo(x-58*s,y-26*s); ctx.quadraticCurveTo(x-110*s,y-10*s,x-130*s,y-50*s); ctx.stroke(); dot(ctx,x+58*s,y-42*s,2.5*s,C.bgSchema); text(ctx,'muis',x,gy+60,fTekst(32,600),C.text,'center'); });
    alpha(ctx,ramp(t,q.at('Dezelfde'),0.5),()=>{ human(ctx,1450,gy,300,1,C.mens); text(ctx,'jij',1450,gy+60,fTekst(32,600),C.text,'center'); });
    pill(ctx,960,150,'dezelfde organen, dezelfde stelsels, dezelfde dag',C.goud,ramp(t,q.at('Dezelfde'),0.5),32); });
},
// ---- H3: een dag van de plant ----
s18(ctx,t,q){ bg(ctx,'macro'); const tN=q.at('Nachts'); const night=ramp(t,tN-0.3,1.2); const sunU=clamp((t-q.at('Ochtends'))/Math.max(1,tN-q.at('Ochtends')),0,1);
  // lucht + zon/maan
  ctx.fillStyle=rgba('#0D1420',0.55*night); ctx.fillRect(0,0,W,H); const sx=lerp(200,1720,sunU), sy=560-Math.sin(sunU*Math.PI)*420; alpha(ctx,1-night,()=>dot(ctx,sx,sy,46,C.goud)); alpha(ctx,night,()=>{ dot(ctx,1600,160,50,C.goud); dot(ctx,1580,145,46,'#1A2436'); });
  groundLine(700); slaPlant(760,700,1.0,{});
  const wa=fadeIO(t,q.at('halen'),q.at('stengel'),0.4)+ramp(t,q.at('wortels',2),0.5); for(let i=0;i<6;i++){ const u=((t*0.5+i/6)%1); alpha(ctx,clamp(wa,0,1),()=>dot(ctx,lerp(760+(hash(i)-0.5)*300,760,u),lerp(900,720,u),7,C.teal)); }
  const up=fadeIO(t,q.at('stengel'),q.at('Overdag'),0.4); for(let i=0;i<4;i++){ const u=((t*0.5+i/4)%1); alpha(ctx,up,()=>dot(ctx,760+4,lerp(700,260,u),6,C.teal)); }
  const li=fadeIO(t,q.at('Overdag'),tN,0.4)*(1-night); for(let k=0;k<4;k++) arrow(ctx,sx+(k-1.5)*30,sy+70,760+(k-1.5)*70,420,C.goud,3,14,li*0.7);
  label(ctx,'wortels','halen water, houden vast',760,820,1250,840,fadeIO(t,q.at('halen'),q.at('Overdag'),0.4),C.grain); label(ctx,'stengel','brengt het water omhoog',760,470,1250,560,fadeIO(t,q.at('stengel'),q.at('Overdag'),0.4),C.groen);
  label(ctx,'bladeren','vangen licht, maken voedsel',855,560,1250,380,fadeIO(t,q.at('bladeren'),tN,0.4),C.groen); label(ctx,'bloem','maakt zaden',754,210,1250,200,fadeIO(t,q.at('bloem'),tN,0.4),C.goud);
  pill(ctx,760,100,'ook de plant heeft een dag',C.goud,fadeIO(t,q.at('dag'),q.at('Ochtends'),0.4),32);
  pill(ctx,1300,100,"'s nachts: geen licht, maar de wortels werken door",C.text,ramp(t,tN,0.5),28); pill(ctx,1300,170,'net als jij',C.goud,ramp(t,q.at('Net'),0.5),30);
},
// ---- samenvatting: tien stelsels ----
s19(ctx,t,q){ bg(ctx,'schema'); const K=[['zenuw','Zenuwstelsel'],['spijs','Spijsverteringsstelsel'],['spier','Spierstelsel'],['skelet','skelet'],['adem','Ademhalingsstelsel'],['bloed','Bloedvatenstelsel'],['uitsch','Uitscheidingsstelsel'],['afweer','Afweersysteem'],['hormoon','Hormoonstelsel'],['voortpl','Voortplantingsstelsel']];
  const o={sil:0.3,t,beat:t*5,breath:t*2.5}; K.forEach(([k,w])=>o[k]=0.35+0.65*ramp(t,q.at(w),0.5)); bodyOrgans(o); skin(ramp(t,q.at('huid'),0.5));
  K.forEach(([k,w])=>sysLabel(k,ramp(t,q.at(w),0.5)));
  naamBij(ctx,'huid','beschermt alles',925,615,ramp(t,q.at('huid'),0.5),'right','#E0BE9C');
  pill(ctx,960,100,'tien orgaanstelsels, één dag',C.goud,ramp(t,q.at('Tien'),0.5),34);
  pill(ctx,960,870,'elk orgaan: eigen plek, eigen taak · samen zijn ze jij',C.goud,ramp(t,q.at('Elk'),0.5),30);
},
// ---- eindkaart ----
s20(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Probeer het zelf',120,200,fTitel(80),C.text); metaText(ctx,'welk orgaan hoort bij welk stelsel?',120,260,C.grain,'left',26);
  const P=[['Sorteer','lever · nieren · longen · hypofyse · maag · lymfeklieren · hart · ruggenmerg · blaas · schildklier'],['Jouw dag','Kies vijf dingen die je vandaag deed. Noem per ding één orgaan en zijn stelsel.'],['Lastig','Bij welk stelsel hoort de huid? Waarom is dat een strikvraag?']];
  P.forEach((p,i)=>{ const x=120+i*575; alpha(ctx,ramp(t,0.6+i*0.6,0.6),()=>{ roundRect(ctx,x,330,535,300,14); shape(ctx,rgba(C.bgSchema,0.95),C.line,1); text(ctx,p[0],x+28,392,fTekst(38,600),C.goud); ctx.font=fTekst(32); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,p[1],x+28,450,480,42); }); });
  alpha(ctx,ramp(t,2.6,0.6),()=>{ ctx.font=fTekst(36,600); ctx.fillStyle=C.goud; ctx.textAlign='left'; wrap(ctx,'Welke organen werken door als je slaapt? Noem er vier.',120,720,1680,46); });
  metaText(ctx,'biologie bij kamiel · stem: roos (elevenlabs) · versie 1.0 · oktober 2026',W/2,CAPTION_Y-10,C.text2,'center',22); },
};
