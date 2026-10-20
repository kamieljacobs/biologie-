// ===== 32C film 3 — Microben: vriend en vijand: scènes =====
// Part C: bacteriën en schimmels teal/grijs; helpers (vriend) groen gerand, ziekteverwekkers koraal; virus koraal met paarse bouwtekening.
// Rode draad: een weegschaal "vriend · vijand" die per hoofdstuk voller wordt; dezelfde drie microben (staafje, schimmeldraad, virus) overal.

function bact(x,y,s=1,a=1,rot=0,k=C.teal,bol=false){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.rotate(rot); if(bol){ ctx.beginPath(); ctx.arc(0,0,11*s,0,6.283); } else roundRect(ctx,-24*s,-10*s,48*s,20*s,10*s); shape(ctx,rgba(k,0.45),lighten(k,0.35),1.6); ctx.restore(); }); }
function schimmelDraad(x,y,s=1,a=1,groei=1,seed=1,k='#9AA3B2'){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.strokeStyle=k; ctx.lineCap='round'; ctx.lineWidth=4*s;
  const tak=(x0,y0,an,len,d)=>{ if(d>3||len<6) return; const L=len*clamp(groei*1.4-d*0.3,0,1); const x1=x0+Math.cos(an)*L, y1=y0+Math.sin(an)*L; ctx.beginPath(); ctx.moveTo(x0,y0); ctx.quadraticCurveTo((x0+x1)/2+Math.sin(seed+d)*6*s,(y0+y1)/2,x1,y1); ctx.stroke(); if(L>len*0.6){ tak(x1,y1,an-0.6+hash(seed+d)*0.3,len*0.7,d+1); tak(x1,y1,an+0.5-hash(seed*2+d)*0.3,len*0.65,d+1); } };
  for(let k2=0;k2<5;k2++) tak(x,y,-Math.PI/2+(k2-2)*0.55,70*s,0); }); }
function virusje(x,y,s=1,a=1,t=0){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.beginPath(); ctx.arc(x,y,12*s,0,6.283); shape(ctx,rgba(C.koraal,0.55),lighten(C.koraal,0.3),1.4); for(let k=0;k<8;k++){ const an=k*0.785+t*0.2; ctx.strokeStyle=C.koraal; ctx.lineWidth=2*s; ctx.beginPath(); ctx.moveTo(x+Math.cos(an)*12*s,y+Math.sin(an)*12*s); ctx.lineTo(x+Math.cos(an)*18*s,y+Math.sin(an)*18*s); ctx.stroke(); dot(ctx,x+Math.cos(an)*19*s,y+Math.sin(an)*19*s,2.5*s,C.koraal); } ctx.strokeStyle=C.paars; ctx.lineWidth=2*s; ctx.beginPath(); for(let k=0;k<=12;k++){ const u=k/12; ctx.lineTo(x-7*s+u*14*s,y+Math.sin(u*9)*3*s); } ctx.stroke(); }); }
function haar(x,y,w,a=1,len=440){ alpha(ctx,a,()=>{ roundRect(ctx,x,y-w/2,len,w,w/2); shape(ctx,'#5A4030','#7A5A40',2); }); }
function petri(x,y,r,a=1){ alpha(ctx,a,()=>{ ctx.beginPath(); ctx.arc(x,y,r,0,6.283); shape(ctx,rgba('#E8DCA0',0.25),'#AFC0D0',3); ctx.beginPath(); ctx.arc(x,y,r-10,0,6.283); ctx.strokeStyle=rgba('#AFC0D0',0.5); ctx.lineWidth=1.5; ctx.stroke(); }); }
function weegschaal(x,y,links,rechts,a=1){ alpha(ctx,a,()=>{ const tilt=clamp((rechts-links)*0.05,-0.15,0.15); ctx.strokeStyle=C.line; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x,y+160); ctx.moveTo(x-80,y+160); ctx.lineTo(x+80,y+160); ctx.stroke(); ctx.save(); ctx.translate(x,y); ctx.rotate(tilt); ctx.beginPath(); ctx.moveTo(-260,0); ctx.lineTo(260,0); ctx.stroke();
  [[-260,'vriend',C.groen,links],[260,'vijand',C.koraal,rechts]].forEach(([dx,n,k,v])=>{ ctx.beginPath(); ctx.moveTo(dx,0); ctx.lineTo(dx-70,80); ctx.moveTo(dx,0); ctx.lineTo(dx+70,80); ctx.strokeStyle=C.line; ctx.lineWidth=2; ctx.stroke(); ctx.beginPath(); ctx.ellipse(dx,84,90,16,0,0,Math.PI); shape(ctx,rgba(k,0.25),k,2); text(ctx,n,dx,140,fTekst(34,700),k,'center'); }); ctx.restore(); }); }
function darmBuis(x,y,w,h,t){ roundRect(ctx,x,y,w,h,h/2); shape(ctx,'#B5786A','#D09A8C',3); roundRect(ctx,x+20,y+20,w-40,h-40,(h-40)/2); ctx.fillStyle='#6E3E36'; ctx.fill(); }

const SCENES={
// ---- cold open ----
s01(ctx,t,q){ const tHu=q.at('huid'), tDa=q.at('darmen'), tEv=q.at('evenveel'), tWe=q.at('weg'), tSl=q.at('slecht?');
  bg(ctx,'schema'); ctx.fillStyle='#2A3A58'; ctx.fillRect(0,700,W,200);
  // badkamerspiegel
  roundRect(ctx,1180,140,520,420,18); shape(ctx,'#8EA8BF','#C9CED8',6);
  const A=persoon(ctx,'noor',600,880,560,{outfit:'school',pose:t>tWe?'denk':'staan',uit:t>tWe?'denkt':'neutraal',t,kijk:1});
  // bacteriën op de huid (vergroot ingezoomd)
  for(let i=0;i<18;i++){ const w=wander(i,t,6,0.8); bact(470+hash(i*1.3)*260+w.x,380+hash(i*2.7)*440+w.y,0.8,ramp(t,tHu+i*0.04,0.3),hash(i)*3,i%5?C.teal:C.groen,i%3===0); }
  pill(ctx,600,320,'miljarden op je huid',C.teal,fadeIO(t,tHu,tDa+0.3,0.3),28); pill(ctx,600,320,'nog veel meer in je darmen',C.teal,fadeIO(t,tDa,tEv,0.3),28);
  alpha(ctx,ramp(t,tEv,0.4),()=>{ roundRect(ctx,1220,620-20,440,190,16); shape(ctx,rgba(C.bgSchema,0.92),C.goud,2); text(ctx,'bacteriën ± eigen cellen',1440,670,fTekst(32,700),C.text,'center'); balk(1260,700,240,30,1,C.teal,1,''); balk(1260,745,240,30,0.85,C.koraal,1,''); metaText(ctx,'bacteriën',1520,724,C.text2,'left',20); metaText(ctx,'cellen',1520,769,C.text2,'left',20); });
  alpha(ctx,ramp(t,tSl,0.4),()=>text(ctx,'?',1440,380,fTitel(130),C.goud,'center')); meta32('vergroot · niet op schaal'); },
// ---- titel ----
s03(ctx,t,q){ bg(ctx,'schema'); alpha(ctx,ramp(t,0.1,0.7),()=>{ text(ctx,'Microben: vriend en vijand',120,330,fTitel(88),C.text); text(ctx,'Zijn alle bacteriën slecht?',120,410,fTekst(44),C.text2); });
  weegschaal(1380,600,0,0,ramp(t,0.4,0.6)); bact(1120,670,2,ramp(t,0.8,0.4),0.3,C.groen); virusje(1640,670,2,ramp(t,1.1,0.4),t);
  metaText(ctx,'ONDERBOUW · KERNDOELEN · 32C · FILM 3',W-80,60,C.text2,'right',24); },
// ---- H1: drie soorten ----
s04(ctx,t,q){ const tMi=q.at('microben:'), tDr=q.at('drie'), tBa=q.at('bacterie'), tDu=q.at('duizend'), tMm=q.at('millimeter.'), tOv=q.at('overal:'), tSc=q.at('schimmel'), tGi=q.at('gist.'), tDra=q.at('draden.'), tBr=q.at('brood'), tVi=q.at('virus'), tCe=q.at('cel.',2), tPa=q.at('pakketje'), tVe=q.at('vermenigvuldigen');
  bg(ctx,'schema');
  if(t<tBa-0.3){ text(ctx,'microben',W/2,330,fTitel(96),C.teal,'center'); metaText(ctx,'micro-organismen · te klein om te zien',W/2,390,C.grain,'center',26); alpha(ctx,ramp(t,tDr,0.4),()=>{ bact(660,620,3); schimmelDraad(960,700,1,1,1,2); virusje(1260,620,3,1,t); }); return; }
  // drie kolommen
  const X=[360,960,1560];
  alpha(ctx,1,()=>{ vak(X[0]-260,150,520,620,'bacterie',C.teal,1,'één cel'); bact(X[0],330,5,1,0.2); });
  alpha(ctx,ramp(t,tDu,0.4),()=>{ haar(X[0]-220,520,24); metaText(ctx,'haar',X[0]+240,528,C.grain,'left',20); for(let i=0;i<40;i++) bact(X[0]-220+i*2.4,552,0.05,1,0); metaText(ctx,'1000 naast elkaar = 1 mm',X[0],610,C.grain,'center',20); metaText(ctx,'een haar is 0,1 mm dik',X[0],640,C.grain,'center',20); });
  alpha(ctx,ramp(t,tOv,0.4),()=>{ text(ctx,'grond · water · huid',X[0],710,fTekst(30,600),C.text,'center'); });
  alpha(ctx,ramp(t,tSc-0.2,0.4),()=>{ vak(X[1]-260,150,520,620,'schimmel',C.text2,1,'één cel of draden'); });
  alpha(ctx,ramp(t,tGi,0.4),()=>{ ctx.beginPath(); ctx.ellipse(X[1]-120,330,40,30,0.3,0,6.283); shape(ctx,rgba('#7FA9B8',0.55),'#A9CAD6',2); metaText(ctx,'gist',X[1]-120,390,C.grain,'center',20); });
  schimmelDraad(X[1]+90,420,1,ramp(t,tDra-0.6,0.4),ramp(t,tDra-0.6,2.5),3);
  alpha(ctx,ramp(t,tBr,0.4),()=>{ brood(X[1],620,2); for(let i=0;i<6;i++) dot(ctx,X[1]-30+hash(i)*60,600+hash(i*3)*30,6+hash(i*5)*6,'#7FA88E'); metaText(ctx,'pluizig vlekje',X[1],700,C.grain,'center',20); });
  alpha(ctx,ramp(t,tVi-0.2,0.4),()=>{ vak(X[2]-260,150,520,620,'virus',C.koraal,1,'geen cel'); virusje(X[2],330,4,1,t); });
  alpha(ctx,ramp(t,tPa,0.4),()=>{ naamBij(ctx,'bouwtekening','',X[2],440,1,'center',C.paars); metaText(ctx,'10 tot 100× kleiner dan een bacterie',X[2],490,C.grain,'center',20); });
  alpha(ctx,ramp(t,tVe,0.4),()=>{ ctx.beginPath(); ctx.arc(X[2],620,80,0,6.283); shape(ctx,rgba(C.er,0.15),C.er,2); dot(ctx,X[2]-10,620,22,C.kern,C.kernR,1.5); virusje(X[2]+40,590,1.4,1,t); text(ctx,'alleen in een cel',X[2],740,fTekst(30,600),C.text,'center'); });
  meta32('vergroot · niet op schaal'); },
// ---- H2: vrienden ----
s05(ctx,t,q){ const tHu=q.at('huid.'), tPl=q.at('plek'), tZi=q.at('ziekteverwekker'), tDa=q.at('darm'), tVz=q.at('vezels'), tK=q.at('vitamine'), tSc=q.at('schimmel'), tJ=q.at('1928'), tSch=q.at('schaaltje'), tGr=q.at('groeide'), tDo=q.at('dood.'), tHo=q.at('Hoe');
  if(t<tDa-0.3){ bg(ctx,'micro'); // huidoppervlak
    ctx.fillStyle='#8C6A58'; ctx.fillRect(0,620,W,280); ctx.fillStyle='#A07A66'; for(let i=0;i<12;i++){ ctx.beginPath(); ctx.ellipse(80+i*170,620,90,26,0,Math.PI,0); ctx.fill(); }
    for(let i=0;i<22;i++){ const w=wander(i,t,3,0.6); bact(60+i*85+w.x,595+(i%2)*-14,1.1,ramp(t,0.2+i*0.03,0.3),(hash(i)-0.5)*0.6,C.teal,i%4===0); }
    naamBij(ctx,'huidbacteriën','houden de plek bezet',W/2,420,ramp(t,tPl,0.4),'center',C.groen);
    alpha(ctx,ramp(t,tZi,0.4),()=>{ const u=ramp(t,tZi,2); const x=lerp(1600,1500,u), y=lerp(250,520,u)+(u>0.9?-60*(u-0.9)*10:0); bact(x,y,1.6,1,0.5,C.koraal); text(ctx,'geen plek',x,y-50,fTekst(28,600),C.koraal,'center'); });
    meta32('vergroot'); return; }
  if(t<tSc-0.3){ bg(ctx,'schema'); darmBuis(160,340,1200,300,t);
    for(let i=0;i<30;i++){ const w=wander(i,t,10,0.7); bact(260+hash(i*1.7)*1000+w.x,420+hash(i*3.1)*140+w.y,1,1,hash(i)*3,i%6?C.teal:C.groen,i%3===0); }
    naamBij(ctx,'dikke darm','',760,300,1,'center',C.text);
    alpha(ctx,ramp(t,tVz,0.4),()=>{ for(let i=0;i<6;i++){ const br=ramp(t,tVz+0.4+i*0.2,1); ctx.strokeStyle=rgba(C.groen,1-0.6*br); ctx.lineWidth=8; ctx.beginPath(); ctx.moveTo(300+i*170,470); ctx.lineTo(300+i*170+90*(1-0.6*br),470+20); ctx.stroke(); } metaText(ctx,'vezels worden afgebroken',760,690,C.grain,'center',22); });
    alpha(ctx,ramp(t,tK,0.4),()=>{ for(let i=0;i<5;i++){ const u=ramp(t,tK+i*0.2,1.2); dot(ctx,lerp(700+i*60,1560,u),lerp(490,300+i*30,u),10,rgba(C.groen,0.8),C.groen,1.2); } text(ctx,'vitamine K',1600,250,fTekst(36,700),C.groen,'center'); });
    weegschaal(1600,560,ramp(t,tK,1)*2,0,0.9); return; }
  bg(ctx,'schema'); pill(ctx,W/2,110,'het jaar 1928 · Fleming',C.grain,ramp(t,tJ,0.4),28);
  persoon(ctx,'kim',380,860,380,{outfit:'practicum',pose:t>tDo?'wijs':'staan',uit:t>tDo?'verbaasd':'neutraal',t,kijk:1});
  petri(1100,520,280,ramp(t,tSch,0.4));
  alpha(ctx,ramp(t,tSch,0.4),()=>{ for(let i=0;i<70;i++){ const an=hash(i*1.9)*6.283, r=40+hash(i*3.3)*210; const x=1100+Math.cos(an)*r, y=520+Math.sin(an)*r; const d=Math.hypot(x-1180,y-460); const dood=t>tDo&&d<150?ramp(t,tDo,1):0; dot(ctx,x,y,7,rgba(dood?'#6E7686':'#E8DCA0',1-0.7*dood),dood?'#9AA3B2':'#F2ECC8',1); } });
  alpha(ctx,ramp(t,tGr,0.4),()=>{ ctx.beginPath(); ctx.arc(1180,460,46,0,6.283); shape(ctx,rgba('#5F8A70',0.7),'#7FC48F',2); schimmelDraad(1180,470,0.6,1,1,5,'#7FA88E'); });
  alpha(ctx,ramp(t,tDo,0.6),()=>{ ctx.setLineDash([8,8]); ctx.beginPath(); ctx.arc(1180,460,150,0,6.283); ctx.strokeStyle=C.goud; ctx.lineWidth=2; ctx.stroke(); ctx.setLineDash([]); text(ctx,'hier geen bacteriën',1180,860-60,fTekst(32,700),C.goud,'center'); });
  alpha(ctx,ramp(t,tHo,0.4),()=>text(ctx,'?',1550,330,fTitel(110),C.goud,'center')); },
// ---- H2: penicilline ----
s07(ctx,t,q){ bg(ctx,'schema'); const tPe=q.at('penicilline.'), tAn=q.at('antibioticum.'), tFa=q.at('fabrieken');
  petri(560,500,240,1); ctx.beginPath(); ctx.arc(620,450,40,0,6.283); shape(ctx,rgba('#5F8A70',0.7),'#7FC48F',2);
  for(let i=0;i<16;i++){ const an=i*0.39, r=60+((t*70+i*25)%120); dot(ctx,620+Math.cos(an)*r,450+Math.sin(an)*r,6,rgba(C.groen,0.8*(1-r/180))); }
  naamBij(ctx,'penicilline','stof uit een schimmel',560,800-20,ramp(t,tPe,0.4),'center',C.groen);
  alpha(ctx,ramp(t,tAn,0.4),()=>{ pil(ctx,1100,360,3,C.groen); text(ctx,'het eerste antibioticum',1100,460,fTekst(36,700),C.text,'center'); });
  alpha(ctx,ramp(t,tFa,0.4),()=>{ roundRect(ctx,1380,340,300,380,24); shape(ctx,rgba(C.teal,0.12),'#AFC0D0',2.5); schimmelDraad(1530,640,1,1,1,7,'#7FA88E'); metaText(ctx,'tank in een fabriek',1530,760,C.grain,'center',22); });
  weegschaal(1100,560+80,3,0,0); },
// ---- H3: vijanden ----
s08(ctx,t,q){ const tZv=q.at('ziekteverwekkers.'), tTw=q.at('twintig'), tZe=q.at('zeven'), tMi=q.at('miljoen.'), tGi=q.at('gif.'), tWa=q.at('warm'), tKo=q.at('koelkast'), tSc=q.at('schimmel'), tTe=q.at('tenen.'), tVi=q.at('virus'), tNi=q.at('nieuwe'), tVo=q.at('volgende'), tVe=q.at('verkoudheid'), tSa=q.at('Sam'), tHe=q.at('Helpt');
  bg(ctx,'schema');
  if(t<tSc-0.3){ // groei als stamboom en teller
    const g=t<tTw?0:Math.min(6,Math.floor((t-tTw)/0.7)); const rows=g+1;
    for(let r=0;r<rows;r++){ const n=Math.pow(2,r); for(let k=0;k<n;k++){ const x=180+ (k+0.5)*(720/n), y=200+r*80; bact(x,y,Math.max(0.25,1.1-r*0.13),ramp(t,tTw+r*0.7,0.3),0,C.koraal); } }
    alpha(ctx,ramp(t,tTw,0.4),()=>{ metaText(ctx,'elke 20 minuten ×2',540,170,C.grain,'center',22); });
    alpha(ctx,ramp(t,tZe,0.4),()=>{ roundRect(ctx,1060,200,700,160,16); shape(ctx,rgba(C.bgSchema,0.92),C.koraal,2); text(ctx,'na 7 uur:',1410,260,fTekst(34,600),C.text2,'center'); text(ctx,'meer dan 1 000 000',1410,320,fTekst(52,700),C.koraal,'center'); });
    alpha(ctx,ramp(t,tGi,0.4),()=>{ roundRect(ctx,1060,420,330,260,16); shape(ctx,rgba(C.bgSchema,0.92),C.koraal,1.5); ctx.beginPath(); ctx.ellipse(1225,560,110,40,0,0,6.283); shape(ctx,'#E8E2D4','#C9CED8',2); for(let i=0;i<8;i++) bact(1160+hash(i)*130,545+hash(i*3)*30,0.5,1,hash(i)*3,C.koraal); text(ctx,'te lang warm',1225,650,fTekst(28,600),C.koraal,'center'); });
    alpha(ctx,ramp(t,tKo,0.4),()=>{ roundRect(ctx,1430,420,330,260,16); shape(ctx,rgba(C.bgSchema,0.92),C.teal,1.5); roundRect(ctx,1520,450,150,170,10); shape(ctx,'#D8DCE4','#F2F2EE',2); bact(1595,540,0.6,1,0,C.koraal); text(ctx,'koelkast: trager',1595,650,fTekst(28,600),C.teal,'center'); });
    alpha(ctx,ramp(t,tWa-0.3,0.4)*(1-ramp(t,tKo,0.3)),()=>{}); return; }
  if(t<tVi-0.3){ ctx.fillStyle='#2A3A58'; ctx.fillRect(0,0,W,H); // voet
    ctx.fillStyle='#D9A982'; roundRect(ctx,500,500,900,240,110); ctx.fill(); [0,1,2,3,4].forEach(i=>{ ctx.beginPath(); ctx.ellipse(1330-i*0,520+i*0,0,0,0,0,1); }); for(let i=0;i<5;i++){ ctx.beginPath(); ctx.ellipse(1380,540+i*42,46-i*4,22,0,0,6.283); ctx.fill(); }
    schimmelDraad(1330,620,0.6,1,ramp(t,tSc,2),9,'#C9CED8'); pill(ctx,1100,380,'schimmel tussen je tenen · jeukt',C.koraal,ramp(t,tTe-0.6,0.4),28); return; }
  if(t<tSa-0.3){ // virus in een cel
    bg(ctx,'micro'); ctx.beginPath(); ctx.arc(860,500,300,0,6.283); shape(ctx,rgba(C.er,0.12),C.er,2.5); dot(ctx,820,520,90,C.kern,C.kernR,2);
    const binnen=ramp(t,tVi,1.4); virusje(lerp(1400,1060,binnen),lerp(260,400,binnen),2.2,1,t);
    const n=t>tNi?Math.min(10,Math.floor((t-tNi)*4)):0; for(let i=0;i<n;i++) virusje(700+hash(i*2.2)*320,380+hash(i*4.4)*240,1.3,1,t);
    alpha(ctx,ramp(t,tVo,0.4),()=>{ for(let i=0;i<5;i++){ const u=ramp(t,tVo+i*0.2,1.4); virusje(lerp(1000,1500,u),lerp(500,300+i*90,u),1.3,1,t); } ctx.beginPath(); ctx.arc(1660,520,160,0,6.283); shape(ctx,rgba(C.er,0.12),C.er,2); dot(ctx,1640,540,50,C.kern,C.kernR,1.5); });
    pill(ctx,960,820-40,'verkoudheid · griep',C.koraal,ramp(t,tVe,0.4),30); meta32('vergroot · niet op schaal'); return; }
  persoon(ctx,'sam',600,860,400,{outfit:'winter',pose:'staan',uit:'bezorgd',t,kijk:1}); virusje(900,320,3,ramp(t,tSa,0.4),t); pill(ctx,600,360,'griep',C.koraal,ramp(t,tSa,0.4),28);
  alpha(ctx,ramp(t,tHe,0.4),()=>{ pil(ctx,1300,520,4,C.groen); text(ctx,'?',1500,460,fTitel(120),C.goud,'center'); }); },
// ---- H3: antibiotica en virussen ----
s10(ctx,t,q){ bg(ctx,'schema'); const tBa=q.at('bacteriën.'), tVi=q.at('virus'), tDa=q.at('darmbacteriën.'), tNo=q.at('nodig');
  pil(ctx,960,200,3,C.groen);
  alpha(ctx,ramp(t,tBa-0.3,0.4),()=>{ vak(200,320,620,420,'bacterie',C.teal,1); for(let i=0;i<6;i++){ const d=ramp(t,tBa+i*0.1,0.8); bact(330+(i%3)*180,520+Math.floor(i/3)*110,1.6,1-0.6*d,0.2,d>0.5?'#6E7686':C.koraal); } text(ctx,'antibioticum werkt',510,720,fTekst(32,700),C.groen,'center'); });
  alpha(ctx,ramp(t,tVi,0.4),()=>{ vak(1100,320,620,420,'virus',C.koraal,1); for(let i=0;i<5;i++) virusje(1230+i*90,540+(i%2)*40,1.6,1,t); text(ctx,'antibioticum werkt niet',1410,720,fTekst(32,700),C.koraal,'center'); });
  alpha(ctx,ramp(t,tDa,0.4),()=>{ ctx.fillStyle=rgba(C.bgSchema,0.94); ctx.fillRect(0,260,W,560); darmBuis(360,420,1200,220,t); for(let i=0;i<20;i++){ const d=ramp(t,tDa+0.3+i*0.04,0.8); bact(460+hash(i*1.7)*1000,490+hash(i*3.1)*80,1,1-0.6*d,hash(i)*3,d>0.5?'#6E7686':C.groen); } text(ctx,'ook goede darmbacteriën gaan dood',960,720,fTekst(34,700),C.koraal,'center'); });
  pill(ctx,960,820-20,'alleen als het echt nodig is',C.goud,ramp(t,tNo,0.4),30); },
// ---- H3 uitdaging: resistentie ----
s11(ctx,t,q){ bg(ctx,'schema'); const tOv=q.at('overleeft'), tVe=q.at('verschil.'), tDe=q.at('deelt'), tRe=q.at('resistent'), tFi=q.at('film.');
  const N=24; for(let i=0;i<N;i++){ const x=300+(i%8)*110, y=280+Math.floor(i/8)*110; const sterk=i===13; const d=sterk?0:ramp(t,tOv+hash(i)*0.6,0.8); bact(x,y,1.2,1-0.75*d,0.2,sterk?C.goud:(d>0.5?'#6E7686':C.koraal)); }
  pill(ctx,700,640,'antibioticum',C.groen,ramp(t,0.3,0.4)*(1-ramp(t,tDe,0.3)),28); naamBij(ctx,'toevallig verschil','',300+5*110,280+110-50,ramp(t,tVe,0.4),'center',C.goud);
  alpha(ctx,ramp(t,tDe,0.4),()=>{ const g=Math.min(4,Math.floor((t-tDe)/0.7)+1); for(let r=0;r<g;r++){ const n=Math.pow(2,r); for(let k=0;k<n;k++) bact(1360+(k-(n-1)/2)*(300/n),260+r*110,Math.max(0.4,1.1-r*0.15),1,0.2,C.goud); } });
  naamBij(ctx,'resistent','antibioticum werkt niet meer',1360,760-60,ramp(t,tRe,0.4),'center',C.goud); pill(ctx,960,820-20,'meer in de film Antibioticaresistentie',C.grain,ramp(t,tFi,0.4),26); },
// ---- samenvatting ----
s12(ctx,t,q){ bg(ctx,'schema'); const tMe=q.at('meeste'), tHu=q.at('huid,'), tDa=q.at('darmen,'), tMed=q.at('medicijn.'), tKl=q.at('klein'), tAn=q.at('antibioticum,'), tNe=q.at('Nee,');
  alpha(ctx,1,()=>{ bact(700,260,2.5); schimmelDraad(960,320,0.8,1,1,2); virusje(1220,260,2.5,1,t); });
  const L=ramp(t,tHu,0.4)+ramp(t,tDa,0.4)+ramp(t,tMed,0.4), R=ramp(t,tKl,0.6); weegschaal(960,480,L*2,R,1);
  alpha(ctx,ramp(t,tHu,0.4),()=>bact(640,560,1.4,1,0,C.groen)); alpha(ctx,ramp(t,tDa,0.4),()=>bact(700,550,1.4,1,0.5,C.groen,true)); alpha(ctx,ramp(t,tMed,0.4),()=>pil(ctx,760,560,1.6,C.groen));
  alpha(ctx,ramp(t,tKl,0.4),()=>{ virusje(1220,555,1.4,1,t); bact(1270,560,1,1,0,C.koraal); });
  pill(ctx,960,780-20,'antibioticum: wel tegen bacteriën, niet tegen virussen',C.text,ramp(t,tAn,0.4),28);
  haak(ctx,520,1400,820-30,'',C.groen,0); alpha(ctx,ramp(t,tNe,0.4),()=>text(ctx,'Nee, lang niet.',960,410,fTitel(56),C.groen,'center')); },
// ---- eindkaart ----
s13(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Probeer het zelf',120,200,fTitel(80),C.text); metaText(ctx,'microben: vriend en vijand',120,260,C.grain,'left',26);
  const P=[['Broodproef','Leg drie sneetjes brood in zakjes: één droog, één vochtig, één vochtig in de koelkast. Kijk een week elke dag (zakje dicht laten!). Waar groeit het snelst schimmel?'],['Vriend of vijand?','Maak een tabel met tien microben die je in de film zag of zelf opzoekt. Zet bij elke: bacterie, schimmel of virus, en vriend of vijand.'],['Bijsluiter','Zoek een bijsluiter van een antibioticum (of online). Tegen welke ziektes is het? Waarom staat er dat je de kuur moet afmaken?']];
  P.forEach((p,i)=>{ const x=120+i*575; alpha(ctx,ramp(t,0.6+i*0.6,0.6),()=>{ roundRect(ctx,x,330,535,340,14); shape(ctx,rgba(C.bgSchema,0.95),C.line,1); text(ctx,p[0],x+28,392,fTekst(36,600),C.goud); ctx.font=fTekst(29); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,p[1],x+28,445,480,39); }); });
  alpha(ctx,ramp(t,2.6,0.6),()=>{ ctx.font=fTekst(36,600); ctx.fillStyle=C.goud; ctx.textAlign='left'; wrap(ctx,'Iemand wil alle bacteriën in huis doodmaken met sterke middelen. Is dat een goed idee? Leg uit.',120,750,1680,46); });
  metaText(ctx,'biologie bij kamiel · stem: roos (elevenlabs) · versie 1.0 · oktober 2026',W/2,CAPTION_Y-10,C.text2,'center',22); },
};
