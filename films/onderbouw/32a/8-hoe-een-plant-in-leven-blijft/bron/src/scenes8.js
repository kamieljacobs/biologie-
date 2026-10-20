// ===== Hoe een plant in leven blijft — scènes (kerndoelen onderbouw, film 8) =====
// Stoffen met eigen vorm (BEELDAFSPRAKEN): water = teal druppel, zuurstof = twee teal bolletjes, koolstofdioxide = drie grijze bolletjes,
// suiker = oker zeshoek, mineralen = oker stipjes. Licht = goudgele stralen. Plant groen.

// ---------- moleculen ----------
function druppel(x,y,s=1,a=1){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.beginPath(); ctx.moveTo(x,y-16*s); ctx.quadraticCurveTo(x+12*s,y,x+10*s,y+6*s); ctx.arc(x,y+6*s,10*s,0,Math.PI); ctx.quadraticCurveTo(x-12*s,y,x,y-16*s); ctx.closePath(); shape(ctx,rgba(C.teal,0.75),lighten(C.teal,0.4),1.5); }); }
function o2(x,y,s=1,a=1){ if(a<=0.01) return; alpha(ctx,a,()=>{ dot(ctx,x-7*s,y,9*s,rgba(C.teal,0.25),C.teal,2); dot(ctx,x+7*s,y,9*s,rgba(C.teal,0.25),C.teal,2); }); }
function co2(x,y,s=1,a=1){ if(a<=0.01) return; alpha(ctx,a,()=>{ dot(ctx,x-15*s,y,8*s,'#C9CED8','#E6E9EE',1.2); dot(ctx,x+15*s,y,8*s,'#C9CED8','#E6E9EE',1.2); dot(ctx,x,y,9*s,'#6E7686','#9AA3B2',1.2); }); }
function suiker(x,y,s=1,a=1,rot=0){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.beginPath(); for(let i=0;i<6;i++){ const an=rot+i*Math.PI/3; const px=x+Math.cos(an)*14*s, py=y+Math.sin(an)*14*s; i?ctx.lineTo(px,py):ctx.moveTo(px,py); } ctx.closePath(); shape(ctx,rgba(C.oker,0.45),lighten(C.oker,0.3),2); }); }
function mineraal(x,y,a=1){ dot(ctx,x,y,4,C.oker,null); }
function stralen(x,y,a=1,t=0){ if(a<=0.01) return; alpha(ctx,a,()=>{ dot(ctx,x,y,46,'#E8C960',lighten('#E0B64A',0.3),2); ctx.strokeStyle=rgba('#E0B64A',0.8); ctx.lineWidth=4; ctx.lineCap='round'; for(let k=0;k<10;k++){ const an=k/10*6.283+t*0.2; ctx.beginPath(); ctx.moveTo(x+Math.cos(an)*62,y+Math.sin(an)*62); ctx.lineTo(x+Math.cos(an)*86,y+Math.sin(an)*86); ctx.stroke(); } }); }
function lichtStraal(x1,y1,x2,y2,a=1,t=0){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.setLineDash([16,12]); ctx.lineDashOffset=-t*40; ctx.strokeStyle=rgba('#E0B64A',0.75); ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke(); ctx.setLineDash([]); }); }
function langsPad(pad,u){ return padPunt8(pad,u); }
function padPunt8(pad,u){ const L=[]; let tot=0; for(let i=1;i<pad.length;i++){ const d=Math.hypot(pad[i][0]-pad[i-1][0],pad[i][1]-pad[i-1][1]); L.push(d); tot+=d; } let r=clamp(u,0,1)*tot; for(let i=0;i<L.length;i++){ if(r<=L[i]){ const f=L[i]?r/L[i]:0; return [lerp(pad[i][0],pad[i+1][0],f),lerp(pad[i][1],pad[i+1][1],f)]; } r-=L[i]; } return pad[pad.length-1]; }
// stroom: n vormpjes die over een pad lopen (loop), fn(x,y)
function stroom(pad,t,n,speed,a,fn){ if(a<=0.01) return; for(let i=0;i<n;i++){ const u=((t*speed+i/n)%1); const [x,y]=padPunt8(pad,u); const fa=Math.min(1,u*6,(1-u)*6); alpha(ctx,a*fa,()=>fn(x,y,i)); } }

// ---------- planten ----------
function zonnebloem(x,yg,g,a=1,o={}){ if(a<=0.01) return; g=clamp(g,0,1); const h=40+g*560; alpha(ctx,a,()=>{
  ctx.strokeStyle=o.geel?'#A8A060':G1; ctx.lineCap='round'; ctx.lineWidth=6+12*g; ctx.beginPath(); ctx.moveTo(x,yg); ctx.quadraticCurveTo(x+12,yg-h*0.5,x,yg-h); ctx.stroke();
  const nb=Math.floor(1+g*5); for(let k=0;k<nb;k++){ const yy=yg-h*(0.15+0.75*k/Math.max(1,nb)), d=k%2?1:-1, s=(0.5+0.5*g)*(1-k*0.06); ctx.save(); ctx.translate(x,yy); ctx.rotate(d*(0.6+(o.slap?0.6:0))); ctx.beginPath(); ctx.ellipse(d*46*s,0,48*s,20*s,0,0,6.283); shape(ctx,o.geel?'#B8B070':G2,o.geel?'#D0C890':V1,1.5); ctx.restore(); }
  if(g>0.55){ const r=(g-0.55)/0.45; for(let k=0;k<16;k++){ const an=k/16*6.283; ctx.beginPath(); ctx.ellipse(x+Math.cos(an)*44*r,yg-h+Math.sin(an)*44*r,24*r,9*r,an,0,6.283); shape(ctx,'#D9B04A','#F0CC7A',1.2); } dot(ctx,x,yg-h,30*r,'#6B4A2E','#8C6A4A',2); } }); return yg-h; }
function wilg(x,yg,g,a=1){ if(a<=0.01) return; g=clamp(g,0,1); const h=80+g*360, w=8+g*30; alpha(ctx,a,()=>{
  ctx.fillStyle='#6E5238'; ctx.beginPath(); ctx.moveTo(x-w/2,yg); ctx.lineTo(x-w*0.3,yg-h); ctx.lineTo(x+w*0.3,yg-h); ctx.lineTo(x+w/2,yg); ctx.closePath(); ctx.fill();
  const n=6+Math.floor(g*14); for(let k=0;k<n;k++){ const an=-Math.PI/2+(k/(n-1)-0.5)*2.4, L=40+g*170; const ex=x+Math.cos(an)*L*0.8, ey=yg-h+Math.sin(an)*L*0.5; ctx.strokeStyle=k%3?G2:G1; ctx.lineWidth=3+g*3; ctx.beginPath(); ctx.moveTo(x,yg-h); ctx.quadraticCurveTo(ex,ey-30*g,ex+Math.cos(an)*10,ey+60+g*120); ctx.stroke(); } }); }
function pot(x,y,w,h){ ctx.beginPath(); ctx.moveTo(x-w/2,y); ctx.lineTo(x+w/2,y); ctx.lineTo(x+w*0.4,y+h); ctx.lineTo(x-w*0.4,y+h); ctx.closePath(); shape(ctx,'#8C5A3A','#B07A58',2); ctx.fillStyle='#3A2E24'; ctx.fillRect(x-w/2+6,y-2,w-12,14); }
function weegschaal(x,y,txt,a=1,kleur=C.text){ if(a<=0.01) return; alpha(ctx,a,()=>{ roundRect(ctx,x-170,y,340,46,8); shape(ctx,'#AFC0D0',C.line,1.5); roundRect(ctx,x-130,y+8,260,30,6); shape(ctx,C.bgMicro,null); text(ctx,txt,x,y+33,fMeta(26),kleur,'center'); }); }
// plantschema voor H2/H3/samenvatting: wortel, stengel, vier bladeren
const PS={x:960,yg:700};
const PAD_WATER=[[PS.x,PS.yg+150],[PS.x,PS.yg],[PS.x,PS.yg-260],[PS.x+150,PS.yg-330]];
const PAD_CO2=[[1400,330],[1210,370],[PS.x+150,PS.yg-330]];
const PAD_O2=[[PS.x-150,PS.yg-310],[PS.x-330,PS.yg-380],[560,260]];
function plantSchema(o={}){ const {x,yg}=PS; const A=k=>o[k]===undefined?1:o[k];
  groundLine(yg); roots(x,yg,0.85,A('wortel'));
  alpha(ctx,A('stengel'),()=>{ ctx.strokeStyle=o.geel?'#A8A060':G1; ctx.lineWidth=18; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x,yg); ctx.lineTo(x,yg-420); ctx.stroke(); if(o.vaat){ ctx.save(); ctx.globalAlpha*=o.vaat; ctx.strokeStyle=rgba(C.teal,0.9); ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(x,yg); ctx.lineTo(x,yg-400); ctx.stroke(); ctx.restore(); } });
  alpha(ctx,A('blad'),()=>{ [[1,-330,1],[-1,-310,1],[1,-180,0.8],[-1,-160,0.8],[1,-430,0.6],[-1,-420,0.6]].forEach(([d,dy,s])=>{ ctx.save(); ctx.translate(x,yg+dy); ctx.rotate(d*(o.slap?1.0:0.35)); ctx.beginPath(); ctx.ellipse(d*110*s,0,115*s,42*s,0,0,6.283); shape(ctx,o.geel?'#B8B070':G2,o.geel?'#D0C890':V1,2); ctx.strokeStyle=o.geel?'#D0C890':V1; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(d*220*s,0); ctx.stroke(); ctx.restore(); }); });
  if(o.huid) alpha(ctx,o.huid,()=>{ [[x+150,yg-330],[x-150,yg-310]].forEach(([hx,hy])=>{ ctx.strokeStyle=C.goud; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(hx,hy+20,14,0,6.283); ctx.stroke(); }); });
}
function huidmondje(x,y,s,open=1,a=1){ if(a<=0.01) return; alpha(ctx,a,()=>{ const gap=4+10*open; [-1,1].forEach(d=>{ ctx.beginPath(); ctx.ellipse(x+d*(gap+14)*s,y,16*s,36*s,0,0,6.283); shape(ctx,rgba(C.groen,0.55),C.groen,2); }); }); }
function bladcel(x,y,rx,ry,t,a=1){ if(a<=0.01) return; alpha(ctx,a,()=>{ blob(ctx,x,y,rx,ry,0.02,x); ctx.fillStyle=rgba(C.er,0.08); ctx.fill(); cellWall(ctx,x,y,rx,ry,1); for(let k=0;k<6;k++){ const an=k/6*6.283+0.3; chloroplast(ctx,x+Math.cos(an)*rx*0.62,y+Math.sin(an)*ry*0.62,44,1,an+1.57); } }); }
function zonMaan(x,y,nacht,a=1){ alpha(ctx,a,()=>{ roundRect(ctx,x-110,y-40,220,80,40); shape(ctx,rgba(C.bgMicro,0.85),C.line,1.5); if(nacht<0.5){ dot(ctx,x-60,y,20,'#E8C960'); text(ctx,'dag',x+20,y+12,fTekst(34,600),C.text,'center'); } else { dot(ctx,x-60,y,20,'#D8DCE4'); dot(ctx,x-50,y-6,18,C.bgMicro); text(ctx,'nacht',x+20,y+12,fTekst(34,600),C.text,'center'); } }); }
function meta8(){ metaText(ctx,'schematisch · niet op schaal',W-40,CAPTION_Y-14,C.text2,'right',22); }
function macroDag(){ ctx.fillStyle='#6E8CA8'; ctx.fillRect(0,0,W,H); ctx.fillStyle='#8EA8BF'; ctx.fillRect(0,420,W,140); ctx.fillStyle=C.bgMacroHill; ctx.beginPath(); ctx.moveTo(0,560); for(let x=0;x<=W;x+=60) ctx.lineTo(x,540-30*Math.sin(x*0.004)); ctx.lineTo(W,H); ctx.lineTo(0,H); ctx.fill(); }

// ================= SCÈNES =================
const SCENES={
// ---- cold open: schooltuin, zonnebloem groeit ----
s01(ctx,t,q){ macroDag(); const yg=780; ctx.fillStyle='#3A2E24'; ctx.fillRect(0,yg,W,H-yg); ctx.fillStyle='#5A4636'; ctx.fillRect(560,yg-12,800,24);
  const tL=q.at('lente'), tZ=q.at('zomer'), tB=q.at('bezemsteel'), tW=q.at('Waar');
  const g=ramp(t,tZ-0.6,2.6);
  persoon(ctx,'daan',700,yg,420,{outfit:'zomer',pose:t<tZ?'wijs':'staan',uit:g>0.9?'verbaasd':'neutraal',kijk:1,t});
  const top=zonnebloem(1000,yg,Math.max(0.02,g),1);
  pill(ctx,360,140,t<tZ?'lente':'zomer',C.grain,ramp(t,tL,0.4),30); metaText(ctx,'lente → zomer',360,210,C.text2,'center',24);
  alpha(ctx,ramp(t,q.at('meter'),0.4),()=>{ ctx.strokeStyle=C.text; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(1180,yg); ctx.lineTo(1180,yg-600); ctx.stroke(); for(let k=0;k<=4;k++){ ctx.beginPath(); ctx.moveTo(1170,yg-k*150); ctx.lineTo(1190,yg-k*150); ctx.stroke(); } text(ctx,'2 m',1210,yg-590,fTekst(36,700),C.text); });
  naamBij(ctx,'stengel','zo dik als een bezemsteel',1230,yg-300,fadeIO(t,tB,tW+1,0.4),'left',C.goud);
  pill(ctx,560,300,'waar komt al dat spul vandaan?',C.goud,ramp(t,tW,0.4),36);
},
// ---- titel ----
s02(ctx,t,q){ bg(ctx,'schema'); alpha(ctx,ramp(t,0.1,0.7),()=>{ text(ctx,'Hoe een plant in leven blijft',120,330,fTitel(92),C.text); text(ctx,'Waar haalt een plant zijn eten vandaan?',120,410,fTekst(44),C.text2); });
  groundLine(820); zonnebloem(1560,820,clamp(0.3+t*0.25,0,1),1); stralen(1780,170,ramp(t,0.6,0.6),t);
  metaText(ctx,'ONDERBOUW · KERNDOELEN · FILM 8',W-80,60,C.text2,'right',24); },
// ---- H1: Van Helmont ----
s03(ctx,t,q){ bg(ctx,'schema'); const tG=q.at('grond.'), tV=q.at('Helmont'), tW=q.at('water.'), tN=q.at('Na',2), tO=q.at('opnieuw'), tH=q.at('Hoeveel');
  // misverstand
  alpha(ctx,1-ramp(t,tV-0.4,0.5),()=>{ groundLine(700); slaPlant(960,700,0.8,{bloem:0}); for(let i=0;i<5;i++){ const u=((t*0.4+i/5)%1); alpha(ctx,ramp(t,1,0.5),()=>dot(ctx,960+(i-2)*40,820-u*120,9,'#6B4A2E')); } pill(ctx,960,160,'een plant eet aarde?',C.text,ramp(t,0.3,0.4),36); });
  // proef
  const a=ramp(t,tV-0.4,0.6); if(a<0.01) return;
  alpha(ctx,a,()=>{ ctx.fillStyle='#22324D'; ctx.fillRect(0,760,W,H-760);
    naamBij(ctx,'Jan Baptist van Helmont','rond het jaar 1640 · Vlaanderen',120,150,1,'left',C.goud);
    const g=ramp(t,tN,2.2);
    pot(760,560,300,200); wilg(760,570,g,1); weegschaal(760,770,g<0.02?'wilg 2 kg':`wilg ${Math.round(2+75*g)} kg`,1,g>0.98?C.goud:C.text);
    alpha(ctx,ramp(t,tV+1.5,0.4),()=>{ metaText(ctx,'aarde: 91 kg, droog',590,700,C.grain,'right',24); });
    for(let i=0;i<3;i++){ const u=((t*0.8+i/3)%1); druppel(700+i*40,330+u*200,1,ramp(t,tW-0.3,0.4)*(1-ramp(t,tN,0.5))*(u<0.9?1:0)); }
    pill(ctx,760,250,'alleen water',C.teal,fadeIO(t,tW,tN+0.6,0.3),30);
    metaText(ctx,'1 s = 1 jaar',760,880,C.text2,'center',24);
    alpha(ctx,ramp(t,tO,0.5),()=>{ ctx.fillStyle='#3A2E24'; ctx.beginPath(); ctx.ellipse(1320,600,170,60,0,0,6.283); ctx.fill(); weegschaal(1320,660,'aarde ? kg',1,C.goud); naamBij(ctx,'de aarde opnieuw gewogen','',1320,520,1,'center'); });
    alpha(ctx,ramp(t,tH,0.4),()=>text(ctx,'?',1560,620,fTitel(110),C.goud,'center')); });
},
// ---- H1: bijna niets; water en lucht ----
s05(ctx,t,q){ bg(ctx,'schema'); ctx.fillStyle='#22324D'; ctx.fillRect(0,760,W,H-760); const tE=q.at('ei.'), tWa=q.at('water.'), tL=q.at('lucht.'), tK=q.at('koolstofdioxide');
  pot(560,600,300,170); wilg(560,610,1,1); weegschaal(560,780,'wilg 77 kg',1);
  ctx.fillStyle='#3A2E24'; ctx.beginPath(); ctx.ellipse(1300,600,170,60,0,0,6.283); ctx.fill(); weegschaal(1300,660,'aarde − 60 g',ramp(t,0.2,0.4),C.goud);
  alpha(ctx,ramp(t,tE,0.4),()=>{ ctx.beginPath(); ctx.ellipse(1660,600,36,48,0,0,6.283); shape(ctx,'#F2EEE2','#D8D2C0',2); metaText(ctx,'zo zwaar als een ei',1660,560-30,C.grain,'center',24); });
  crossOut(ctx,1300,600,60,fadeIO(t,q.at('aarde.'),tWa,0.3));
  // water en CO2 de wilg in
  for(let i=0;i<6;i++){ const u=((t*0.5+i/6)%1); druppel(420+i*20,880-u*300,0.9,ramp(t,tWa,0.4)*(u<0.85?1:0)); }
  stroom([[1000,180],[760,260],[580,360]],t,8,0.35,ramp(t,tL,0.5),(x,y,i)=>co2(x,y,1.1));
  naamBij(ctx,'water','een flink deel',300,640,ramp(t,tWa,0.4),'right',C.teal);
  naamBij(ctx,'koolstofdioxide','gas uit de lucht · het stevige hout',1020,170,ramp(t,tK,0.4),'left',C.text);
  meta8(); },
// ---- H2: fotosynthese, wat er nodig is, wortel/stengel/huidmondjes ----
s06(ctx,t,q){ bg(ctx,'schema'); const tF=q.at('fotosynthese.'), tD=q.at('Daarvoor'), tWo=q.at('wortels'), tM=q.at('mineralen'), tGe=q.at('eten.'), tSt=q.at('stengel'), tVa=q.at('vaatbundels'), tLu=q.at('lucht.'), tHu=q.at('huidmondjes');
  plantSchema({vaat:ramp(t,tVa,0.4),huid:ramp(t,tHu,0.4)}); stralen(1700,160,ramp(t,q.at('licht.'),0.4),t);
  naamBij(ctx,'fotosynthese','foto = licht · synthese = maken',140,130,ramp(t,tF,0.4),'left',C.goud);
  const ch=fadeIO(t,tD,tWo+0.5,0.3); pill(ctx,360,260,'licht',C.goud,ch,30); pill(ctx,360,330,'water',C.teal,ch,30); pill(ctx,360,400,'koolstofdioxide',C.text,ch,30);
  stroom(PAD_WATER,t,7,0.3,ramp(t,tWo,0.5),(x,y,i)=>{ druppel(x,y,0.9); if(t>tM&&i%2===0) mineraal(x+14,y+4); });
  naamBij(ctx,'wortels','halen water',PS.x+190,PS.yg+120,fadeIO(t,tWo,tSt+1,0.4),'left',C.teal);
  alpha(ctx,fadeIO(t,tM,tSt,0.4),()=>{ roundRect(ctx,1300,560,460,200,14); shape(ctx,rgba(C.bgSchema,0.95),C.oker,1.5); text(ctx,'mineralen',1330,610,fTekst(38,700),C.oker); ctx.font=fTekst(28); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,'zoals in plantenvoeding · nodig in kleine beetjes',1330,655,410,36); });
  alpha(ctx,ramp(t,tGe,0.3)*(1-ramp(t,tSt,0.3)),()=>{ text(ctx,'geen eten',1530,820,fTekst(36,700),C.koraal,'center'); crossOut(ctx,1530,800,0,0); });
  naamBij(ctx,'vaatbundels','in de stengel',PS.x+30,PS.yg-80,ramp(t,tVa,0.4),'left',C.teal);
  stroom(PAD_CO2,t,6,0.35,ramp(t,tLu,0.4),(x,y)=>co2(x,y,1));
  naamBij(ctx,'huidmondjes','piepkleine gaatjes in het blad',1250,470,ramp(t,tHu,0.4),'left',C.goud);
  meta8(); },
// ---- H2: in het blad (Micro) ----
s07(ctx,t,q){ bg(ctx,'micro'); const tL=q.at('licht.'), tS=q.at('suiker.'), tZ=q.at('zuurstof'), tB=q.at('buiten.'), tK=q.at('kast');
  const a=1-ramp(t,tK-0.4,0.5);
  alpha(ctx,a,()=>{ bladcel(690,520,250,180,t,1); bladcel(1230,520,240,180,t,1); naamBij(ctx,'bladgroenkorrels','vangen licht',690,755,ramp(t,0.3,0.5),'center',C.groen);
    lichtStraal(520,80,640,420,ramp(t,tL,0.4),t); lichtStraal(1360,80,1230,420,ramp(t,tL,0.4),t);
    // reactie in het midden
    const r=ramp(t,q.at('energie'),1.2); druppel(860,230,2.2,1-r); co2(980,240,2.2,1-r); suiker(900,240,2.4,ramp(t,tS-0.3,0.5)); o2(1040,240,2.2,ramp(t,tZ,0.4));
    naamBij(ctx,'suiker','',860,320,ramp(t,tS,0.4),'right',C.oker); naamBij(ctx,'zuurstof','',1080,320,ramp(t,tZ,0.4),'left',C.teal);
    huidmondje(960,800,1,1,1); naamBij(ctx,'huidmondje','',1020,810,1,'left',C.text2);
    const u=ramp(t,tB-0.6,1.6); o2(lerp(1040,960,u),lerp(240,860,u),1.6,ramp(t,tB-0.6,0.3)*(1-ramp(t,tB+1.2,0.3))); });
  alpha(ctx,ramp(t,tK-0.4,0.5),()=>{ bg(ctx,'schema'); roundRect(ctx,760,200,400,560,10); shape(ctx,'#2A2119','#5A4636',3); ctx.fillStyle='#5A4636'; ctx.fillRect(1120,460,14,60); slaPlant(960,640,0.5,{bloem:0,wortel:0}); pot(960,640,160,100); druppel(960,240,1.2,ramp(t,q.at('water.'),0.4)); metaText(ctx,'twee weken donker',960,820,C.text2,'center',26); text(ctx,'?',1300,520,fTitel(110),C.goud,'center'); });
},
// ---- H3: geel en slap; bouwstof en brandstof ----
s09(ctx,t,q){ bg(ctx,'schema'); const tW=q.at('Wat',2), tBo=q.at('bouwt'), tCe=q.at('celwanden'), tHo=q.at('Hout'), tBr=q.at('brandstof'), tMi=q.at('mitochondriën'), tEn=q.at('energie'), tKo=q.at('koolstofdioxide'), tN=q.at('ook');
  if(t<tW-0.3){ groundLine(760); const k=ramp(t,0.2,1.5); ctx.save(); plantSchema({geel:k>0.5?1:0,slap:k>0.3?1:0}); ctx.restore(); pill(ctx,960,150,'geel en slap',C.koraal,ramp(t,0.3,0.4),34); pill(ctx,960,230,'geen licht → geen fotosynthese',C.text,ramp(t,q.at('Zonder'),0.4),30); return; }
  ctx.strokeStyle=C.line; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(140,760); ctx.lineTo(1780,760); ctx.stroke();
  text(ctx,'bouwstof',520,170,fTitel(60),C.oker,'center'); alpha(ctx,ramp(t,tBr-0.3,0.4),()=>text(ctx,'brandstof',1400,170,fTitel(60),C.koraal,'center'));
  // bouwstof: zeshoeken haken aan elkaar tot een net
  const nb=ramp(t,tCe,2); for(let r=0;r<4;r++) for(let c=0;c<6;c++){ const i=r*6+c, ui=clamp(nb*24-i,0,1); const x=330+c*76+(r%2?38:0), y=330+r*66; suiker(lerp(520,x,ui),lerp(260,y,ui),1.6,ramp(t,tBo,0.4),Math.PI/6); }
  alpha(ctx,ramp(t,tHo,0.5),()=>{ roundRect(ctx,380,620,280,90,10); shape(ctx,'#6E5238','#8C6A4A',2); for(let k=0;k<4;k++){ ctx.strokeStyle='#8C6A4A'; ctx.beginPath(); ctx.moveTo(390,640+k*18); ctx.lineTo(650,640+k*18); ctx.stroke(); } metaText(ctx,'hout = vooral celwand',520,740,C.grain,'center',24); });
  naamBij(ctx,'celwanden','',760,360,ramp(t,tCe,0.4),'left',C.oker);
  // brandstof: mitochondrium
  alpha(ctx,ramp(t,tBr,0.4),()=>{ mitochondrion(ctx,1400,450,300,0,1); const r=ramp(t,tEn-0.4,0.8); suiker(1240,330,1.6,1-r); o2(1300,330,1.4,1-r); co2(1520,580,1.3,ramp(t,tKo,0.4)); druppel(1600,580,1.2,ramp(t,tKo,0.4)); if(r>0&&r<1){ dot(ctx,1400,450,30+60*r,rgba(C.koraal,0.4*(1-r)),C.koraal,2); } naamBij(ctx,'mitochondrium','',1400,330,ramp(t,tMi,0.4),'center',C.text); pill(ctx,1400,680,'energie om te groeien',C.koraal,ramp(t,tEn,0.4),30); });
  alpha(ctx,ramp(t,tN,0.4),()=>{ zonMaan(960,860-60,1,1); });
},
// ---- H3: dag en nacht ----
s11(ctx,t,q){ bg(ctx,'schema'); const tN=q.at('Snachts'), tO=q.at('Overdag'), tZ=q.at('zuurstof');
  const nacht=t>tN-0.3?1:0; plantSchema({}); zonMaan(1600,140,nacht,1); if(!nacht) stralen(1780,160,1,t);
  if(!nacht){ stroom(PAD_CO2,t,5,0.35,1,(x,y)=>co2(x,y,1)); stroom(PAD_O2,t,8,0.35,ramp(t,tZ,0.5),(x,y)=>o2(x,y,1.2)); stroom([[PS.x-140,PS.yg-300],[PS.x-300,PS.yg-200],[420,560]],t,2,0.3,ramp(t,tO,0.4),(x,y)=>co2(x,y,0.8)); naamBij(ctx,'overdag: meer zuurstof eruit','',300,240,ramp(t,tZ,0.4),'left',C.teal); }
  else { ctx.fillStyle=rgba(C.bgMicro,0.35); ctx.fillRect(0,0,W,H); stroom([[1400,330],[1210,370],[PS.x+150,PS.yg-330]],t,3,0.3,1,(x,y)=>o2(x,y,1)); stroom([[PS.x-150,PS.yg-310],[PS.x-330,PS.yg-380],[560,260]],t,6,0.35,1,(x,y)=>co2(x,y,1.1)); naamBij(ctx,"'s nachts: alleen koolstofdioxide eruit",'',300,240,1,'left',C.text); alpha(ctx,ramp(t,q.at('jij.'),0.4),()=>human(ctx,1560,700,300,1,C.mens)); }
  metaText(ctx,'verbranden: dag en nacht',300,340,C.koraal,'left',26); },
// ---- H3 uitdaging: woordvergelijkingen ----
s12(ctx,t,q){ bg(ctx,'schema'); const tF=q.at('Fotosynthese:'), tV=q.at('Verbranding:'), tG=q.at('glucose');
  const rij=(y,items,a)=>alpha(ctx,a,()=>{ let x=260; items.forEach(([k,s])=>{ if(k==='druppel') druppel(x,y-8,1.6); else if(k==='co2') co2(x,y,1.6); else if(k==='o2') o2(x,y,1.6); else if(k==='suiker') suiker(x,y,2); else if(k==='pijl'){ arrow(ctx,x-50,y,x+90,y,C.line,4,16); if(s) metaText(ctx,s,x+20,y-24,'#E0B64A','center',22); } else text(ctx,s,x,y+14,fTekst(40,600),C.text,'center'); if(k!=='+'&&k!=='pijl'&&k!=='t'&&s) text(ctx,s,x,y+64,fTekst(28),C.text2,'center'); x+= k==='pijl'?190:(k==='+'?80:150); }); });
  text(ctx,'fotosynthese',120,250,fTitel(52),C.groen); rij(360,[['druppel','water'],['+','+'],['co2','koolstofdioxide'],['pijl','licht'],['suiker','suiker'],['+','+'],['o2','zuurstof']],ramp(t,tF,0.6));
  alpha(ctx,ramp(t,tV-0.2,0.4),()=>text(ctx,'verbranding',120,560,fTitel(52),C.koraal)); rij(670,[['suiker','suiker'],['+','+'],['o2','zuurstof'],['pijl',''],['druppel','water'],['+','+'],['co2','koolstofdioxide'],['+','+'],['t','energie']],ramp(t,tV,0.6));
  naamBij(ctx,'glucose','',260,770,ramp(t,tG,0.4),'center',C.oker); },
// ---- H3: samenwerking, uitval wortels ----
s13(ctx,t,q){ bg(ctx,'schema'); const tSt=q.at('Stel'), tD=q.at('dicht'), tCO=q.at('koolstofdioxide'), tSu=q.at('suiker'), tV=q.at('verhongert');
  plantSchema({slap:ramp(t,tD,1)>0.5?1:0}); stralen(1700,160,1,t);
  crossOut(ctx,PS.x,PS.yg+130,70,ramp(t,tSt,0.4)); naamBij(ctx,'geen water','',PS.x+250,PS.yg+110,ramp(t,tSt,0.4),'left',C.koraal);
  inset(1480,560,170,ramp(t,tD-0.3,0.4),()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(1310,390,340,340); huidmondje(1480,560,1.6,1-ramp(t,tD,0.8),1); });
  alpha(ctx,ramp(t,tD-0.3,0.4),()=>metaText(ctx,'huidmondje gaat dicht',1480,770,C.grain,'center',24));
  const k=ramp(t,tCO,0.4); for(let i=0;i<3;i++){ const u=((t*0.4+i/3)%1); const x=lerp(1400,PS.x+170,Math.min(u,0.6)/0.6), y=lerp(330,PS.yg-330,Math.min(u,0.6)/0.6)-(u>0.6?(u-0.6)*300:0); co2(x,y,1,k*(1-u)); }
  crossOut(ctx,PS.x+240,PS.yg-420,26,ramp(t,tSu,0.4)); suiker(PS.x+240,PS.yg-420,1.4,ramp(t,tSu,0.4)*0.5);
  haak(ctx,560,1360,110,'de plant verhongert, terwijl de zon schijnt',C.koraal,ramp(t,tV,0.5)); },
// ---- samenvatting ----
s14(ctx,t,q){ bg(ctx,'schema'); const tZ=q.at('zonnebloem');
  if(t<tZ-0.4){ plantSchema({vaat:1,huid:1}); stralen(1700,160,1,t);
    stroom(PAD_WATER,t,6,0.3,ramp(t,q.at('Wortels'),0.4),(x,y)=>druppel(x,y,0.9)); stroom(PAD_CO2,t,5,0.35,ramp(t,q.at('huidmondjes'),0.4),(x,y)=>co2(x,y,1)); stroom(PAD_O2,t,5,0.35,ramp(t,q.at('zuurstof.'),0.4),(x,y)=>o2(x,y,1.1));
    naamBij(ctx,'fotosynthese','',140,140,ramp(t,q.at('fotosynthese'),0.4),'left',C.goud);
    suiker(PS.x+200,PS.yg-380,1.6,ramp(t,q.at('suiker'),0.4)); naamBij(ctx,'suiker: bouwen en verbranden','dag en nacht',1240,640,ramp(t,q.at('bouwt'),0.4),'left',C.oker); return; }
  macroDag(); ctx.fillStyle='#3A2E24'; ctx.fillRect(0,780,W,H-780); zonnebloem(960,780,1,1); persoon(ctx,'daan',680,780,420,{outfit:'zomer',uit:'blij',kijk:1,t});
  pill(ctx,1350,220,'water + lucht + licht',C.goud,ramp(t,q.at('water'),0.4),40); },
// ---- eindkaart ----
s15(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Probeer het zelf',120,200,fTitel(80),C.text); metaText(ctx,'hoe een plant in leven blijft',120,260,C.grain,'left',26);
  const P=[['Waterpest-belletjes','Zet een takje waterpest in water onder een lamp. Tel een minuut de belletjes. Lamp verder weg of een doos erover: wat gebeurt er?'],['Zetmeelproef','Plak folie over een deel van een blad. Na een dag licht: blad ontkleuren, jodium erop (met je docent). Waar wordt het blauwzwart?'],['Kiemproef','Weeg tien droge bonen. Laat vijf kiemen in het licht en vijf in het donker. Weeg na twee weken. Wat valt op?']];
  P.forEach((p,i)=>{ const x=120+i*575; alpha(ctx,ramp(t,0.6+i*0.6,0.6),()=>{ roundRect(ctx,x,330,535,300,14); shape(ctx,rgba(C.bgSchema,0.95),C.line,1); text(ctx,p[0],x+28,392,fTekst(38,600),C.goud); ctx.font=fTekst(30); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,p[1],x+28,445,480,40); }); });
  alpha(ctx,ramp(t,2.6,0.6),()=>{ ctx.font=fTekst(36,600); ctx.fillStyle=C.goud; ctx.textAlign='left'; wrap(ctx,'Een kamerplant staat in de vensterbank. Welk gas neemt hij op en welk gas geeft hij af, overdag en \'s nachts?',120,720,1680,46); });
  metaText(ctx,'biologie bij kamiel · stem: roos (elevenlabs) · versie 1.0 · oktober 2026',W/2,CAPTION_Y-10,C.text2,'center',22); },
};
