// ===== Ademhaling en bloedsomloop — scènes (kerndoelen onderbouw, film 4) =====
function circ(ctx,x,y,r,fill,stroke,lw=1.5){ ctx.beginPath(); ctx.arc(x,y,r,0,6.283); if(fill){ctx.fillStyle=fill;ctx.fill();} if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=lw;ctx.stroke();} }
// Hulpjes uit film 1–3 staan hierboven (helpers.js) en personages (lib_cast.js). Nieuw: routekaart lichaam (BM, bodyMap), zuurstof- en koolstofdioxidevormpjes,
// zwembad, longblaasje, haarvat bij spiercel, pols, twee pompen (uitdaging), ketting.

// exacte woord-cue (heel woord, n-de keer) in het huidige segment; T(k,n) in de scènes gebruikt dit
const _ewCache=new Map();
function exactAt(w,n=1){ const it=state.items[state.idx]; const seg=it&&it.seg; if(!seg||!seg.words) return Infinity; const key=seg.id+'|'+w+'|'+n; if(_ewCache.has(key)) return _ewCache.get(key);
  const nm=s=>s.toLowerCase().replace(/[^a-zà-ÿ0-9]/g,''); let c=0, r=Infinity; for(const x of seg.words){ if(nm(x.t)===nm(w)){ c++; if(c===n){ r=x.s; break; } } } _ewCache.set(key,r); return r; }
// ---------- moleculen ----------
function o2(x,y,s=1,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; [[-6,0],[6,0]].forEach(([dx])=>{ ctx.beginPath(); ctx.arc(x+dx*s,y,8.5*s,0,6.283); shape(ctx,C.teal,lighten(C.teal,0.45),1.4); }); ctx.restore(); }
function co2(x,y,s=1,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; [[-11,6.5],[11,6.5],[0,8.5]].forEach(([dx,r])=>{ ctx.beginPath(); ctx.arc(x+dx*s,y,r*s,0,6.283); shape(ctx,dx?'#B9C0CC':'#7E8796',lighten('#9AA3B2',0.4),1.3); }); ctx.restore(); }
function voedsel(x,y,s=1,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.beginPath(); for(let k=0;k<6;k++){ const an=k/6*6.283+0.5; const px=x+Math.cos(an)*9*s, py=y+Math.sin(an)*9*s; k?ctx.lineTo(px,py):ctx.moveTo(px,py); } ctx.closePath(); shape(ctx,C.oker,lighten(C.oker,0.4),1.4); ctx.restore(); }
const ROOD='#E07A5F', DONKER='#9A4A4A';
function rbc2(x,y,r,a=1,col=ROOD){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.beginPath(); ctx.ellipse(x,y,r,r*0.92,0,0,6.283); shape(ctx,col,lighten(col,0.35),1.6); ctx.beginPath(); ctx.ellipse(x,y,r*0.45,r*0.4,0,0,6.283); ctx.fillStyle=rgba('#5A2626',0.35); ctx.fill(); ctx.restore(); }

// ---------- pad-hulp: punt op een polylijn (booglengte) ----------
function along(P,u){ u=clamp(u,0,1); let L=0; const seg=[]; for(let i=1;i<P.length;i++){ const d=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]); seg.push(d); L+=d; } let s=u*L; for(let i=0;i<seg.length;i++){ if(s<=seg[i]||i===seg.length-1){ const k=seg[i]?s/seg[i]:0; return [lerp(P[i][0],P[i+1][0],k),lerp(P[i][1],P[i+1][1],k)]; } s-=seg[i]; } return P[P.length-1]; }
function polyStroke(P,col,lw,a=1,dash=null){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.strokeStyle=col; ctx.lineWidth=lw; ctx.lineCap='round'; ctx.lineJoin='round'; if(dash) ctx.setLineDash(dash); ctx.beginPath(); P.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1])); ctx.stroke(); ctx.restore(); }

// ---------- routekaart van het lichaam (Schema, van voren bekeken) ----------
const BM={cx:560,yb:870,h:760};
const AIR=[[360,170],[470,205],[552,214],[560,262],[560,300],[560,392],[596,424],[618,468]];
const LUNG2HEART=[[618,470],[612,500],[586,520]];
const SLAG=[[566,540],[548,592],[512,642],[494,700],[490,770],[492,808]];
const ADER=[[506,812],[512,770],[516,700],[526,646],[556,598],[582,552]];
const HEART2LUNG=[[584,512],[596,486],[612,470]];
const NEUS=[552,214], LONGB=[618,468], HART=[576,520], KUIT=[495,808], TEEN=[500,866];
function heartAt(x,y,s,a=1,beat=0,hl=0){ if(a<=0.01) return; heart(x,y,s,a,beat); if(hl>0.01){ ctx.save(); ctx.globalAlpha*=a*hl; ctx.translate(x,y); ctx.scale(s,s); ctx.beginPath(); ctx.moveTo(0,28); ctx.bezierCurveTo(-40,-6,-30,-40,0,-18); ctx.bezierCurveTo(30,-40,40,-6,0,28); ctx.strokeStyle=C.goud; ctx.lineWidth=4/s; ctx.stroke(); ctx.restore(); } }
function bodyMap(o={}){ const A=k=>o[k]===undefined?1:o[k]; const t=o.t||0;
  const {cx,yb,h}=BM; ctx.save(); ctx.globalAlpha*=0.3*A('sil'); human(ctx,cx,yb,h,1,C.mens); ctx.restore();
  // longen (teal), ademen = schalen
  const br=o.breath||0;
  alpha(ctx,A('longen'),()=>{ [[512,466],[608,466]].forEach(([x,y],i)=>{ ctx.beginPath(); ctx.ellipse(x,y-6*br,44*(1+0.12*br),80*(1+0.12*br),i?0.08:-0.08,0,6.283); shape(ctx,rgba(C.teal,0.35),lighten(C.teal,0.15),2); }); });
  // luchtpijp + bronchiën
  alpha(ctx,A('luchtpijp'),()=>{ polyStroke([[560,262],[560,392]],lighten(C.teal,0.3),9); polyStroke([[560,388],[528,424],[514,460]],lighten(C.teal,0.3),6); polyStroke([[560,388],[596,424],[610,460]],lighten(C.teal,0.3),6); for(let k=0;k<6;k++){ ctx.strokeStyle=rgba(C.bgSchema,0.7); ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(555,282+k*18); ctx.lineTo(565,282+k*18); ctx.stroke(); } });
  // middenrif: boog onder de longen; md 0 = ontspannen (koepel), 1 = omlaag getrokken (plat)
  const md=o.md||0; alpha(ctx,A('middenrif'),()=>{ ctx.strokeStyle=o.mdHl?C.goud:lighten(C.koraal,0.1); ctx.lineWidth=7; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(446,566+14*md); ctx.quadraticCurveTo(560,520+50*md,674,566+14*md); ctx.stroke(); });
  // bloedvaten: slagader (helderrood) en ader (donkerrood) naar de kuit; haarvatnetje
  alpha(ctx,A('vaten'),()=>{ polyStroke(SLAG,ROOD,o.slagHl?9:6); polyStroke(ADER,DONKER,o.aderHl?9:6); polyStroke(LUNG2HEART,ROOD,5); polyStroke(HEART2LUNG,DONKER,5);
    ctx.save(); ctx.strokeStyle=rgba(ROOD,0.8); ctx.lineWidth=1.6; for(let k=0;k<5;k++){ ctx.beginPath(); ctx.moveTo(488,800+k*4); ctx.quadraticCurveTo(500,792+k*6,510,806+k*2); ctx.stroke(); } ctx.restore(); });
  alpha(ctx,A('hart'),()=>heartAt(HART[0],HART[1],0.82,1,o.beat||0,o.hartHl||0));
  if(o.slagHl) alpha(ctx,o.slagHl,()=>polyStroke(SLAG,C.goud,2,0.9,[6,8]));
}
function bodyLabels(names,t,q){ // names: [[naam,meta,x,y,align,t0]]
  names.forEach(([n,m,x,y,al,t0,t1])=>naamBij(ctx,n,m,x,y,ramp(t,t0,0.5)*(t1?1-ramp(t,t1,0.5):1),al||'left')); }
function focusRing(x,y,r,a){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.strokeStyle=C.goud; ctx.lineWidth=2.5; ctx.beginPath(); ctx.arc(x,y,r,0,6.283); ctx.stroke(); ctx.restore(); }
function beatOf(t,bpm=70){ return t*bpm/60*6.283; }

// ---------- zwembad (Macro-dag) ----------
const WATERY=300;
function poolBase(t){ ctx.fillStyle='#6E8CA8'; ctx.fillRect(0,0,W,WATERY-40); ctx.fillStyle='#8FA7BD'; ctx.fillRect(0,WATERY-120,W,80); // achterwand met ramen
  for(let k=0;k<7;k++){ roundRect(ctx,120+k*260,WATERY-112,180,58,6); ctx.fillStyle=rgba('#DDE6EE',0.55); ctx.fill(); }
  ctx.fillStyle='#C9D3DC'; ctx.fillRect(0,WATERY-40,W,40); ctx.strokeStyle=rgba('#7C8C9C',0.6); ctx.lineWidth=1; for(let x=0;x<W;x+=40){ ctx.beginPath(); ctx.moveTo(x,WATERY-40); ctx.lineTo(x,WATERY); ctx.stroke(); }
  ctx.fillStyle='#2A6E7E'; ctx.fillRect(0,WATERY,W,H-WATERY); ctx.fillStyle='#24606E'; ctx.fillRect(0,820,W,H-820);
  ctx.strokeStyle=rgba('#BFE3EA',0.55); ctx.lineWidth=2; ctx.beginPath(); for(let x=0;x<=W;x+=20){ const y=WATERY+3*Math.sin(x*0.02+t*1.5); x?ctx.lineTo(x,y):ctx.moveTo(x,y); } ctx.stroke();
  // lijnen op de bodem en een baanlijn
  ctx.fillStyle=rgba('#1C4F5B',0.8); ctx.fillRect(0,860,W,10); for(let x=40;x<W;x+=46){ dot(ctx,x,WATERY+4,6,(x/46|0)%2?'#E07A5F':'#F2F2EE'); } }
function swimmer(x,y,s,t,a=1,up=0){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a*(1-ramp(up,0.45,0.1)); ctx.translate(x,y); ctx.rotate(-1.5708); persoon(ctx,'noor',0,0,300*s,{outfit:'sport',pose:'wijsOmhoog',t}); ctx.restore();
  const b=ramp(up,0.45,0.1); if(b>0.01){ ctx.save(); ctx.globalAlpha*=a*b; persoon(ctx,'noor',x,WATERY+190,300*s,{outfit:'sport',pose:'zwaai',uit:'lacht',t}); ctx.fillStyle=rgba('#2A6E7E',0.82); ctx.fillRect(x-140,WATERY+4,280,220); ctx.restore(); } }
function bubbles(x,y,t,n,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; for(let i=0;i<n;i++){ const ph=(t*0.6+hash(i*7))%1; const by=y-ph*(y-WATERY); if(by<WATERY+6) continue; ctx.beginPath(); ctx.arc(x+Math.sin(t*2+i)*8,by,4+3*hash(i*3),0,6.283); ctx.strokeStyle=rgba('#DFF3F6',0.8); ctx.lineWidth=1.5; ctx.stroke(); } ctx.restore(); }

// ---------- micro: longblaasje en haarvat ----------
function alveolus(cx,cy,t,o={}){ const R=150; ctx.fillStyle=C.bgMicro; ctx.fillRect(cx-400,cy-400,800,800);
  for(let i=0;i<40;i++){ ctx.fillStyle=rgba(C.grain,0.15); ctx.beginPath(); ctx.arc(cx-300+hash(i)*600,cy-300+hash(i+50)*600,1.5,0,6.283); ctx.fill(); }
  // luchtbuisje van boven + blaasje
  ctx.beginPath(); ctx.moveTo(cx-40,cy-330); ctx.lineTo(cx-40,cy-R+20); ctx.moveTo(cx+40,cy-330); ctx.lineTo(cx+40,cy-R+20); ctx.strokeStyle=lighten(C.teal,0.2); ctx.lineWidth=3; ctx.stroke();
  ctx.beginPath(); ctx.arc(cx,cy,R,0,6.283); ctx.fillStyle=rgba(C.teal,0.12); ctx.fill(); ctx.strokeStyle=o.wandHl?C.goud:lighten(C.teal,0.25); ctx.lineWidth=o.wandHl?4:3; ctx.stroke();
  // haarvat als band rond de onderkant
  const hv=o.hv===undefined?1:o.hv; alpha(ctx,hv,()=>{ ctx.strokeStyle=rgba(DONKER,0.9); ctx.lineWidth=46; ctx.lineCap='round'; ctx.beginPath(); ctx.arc(cx,cy,R+30,0.15*Math.PI,1.0*Math.PI); ctx.stroke(); ctx.strokeStyle=rgba(ROOD,0.95); ctx.lineWidth=46; ctx.beginPath(); ctx.arc(cx,cy,R+30,-0.15*Math.PI,0.15*Math.PI); ctx.stroke();
    ctx.strokeStyle=lighten('#C47070',0.2); ctx.lineWidth=1.5; ctx.beginPath(); ctx.arc(cx,cy,R+7,-0.15*Math.PI,1.0*Math.PI); ctx.stroke(); ctx.beginPath(); ctx.arc(cx,cy,R+53,-0.15*Math.PI,1.0*Math.PI); ctx.stroke();
    for(let i=0;i<6;i++){ const an=Math.PI*1.0-((t*0.18+i/6)%1)*1.15*Math.PI; const k=clamp((Math.PI*1.0-an)/(1.15*Math.PI),0,1); rbc2(cx+Math.cos(an)*(R+30),cy+Math.sin(an)*(R+30),17,1,k>0.75?ROOD:DONKER); } });
  // zuurstof binnen (veel) en in het bloed (weinig); oversteek
  const n=o.nIn===undefined?9:o.nIn; for(let i=0;i<n;i++){ const w=wander(i,t,22,0.6); o2(cx-90+((i*61)%170)+w.x,cy-90+((i*37)%170)*0.9+w.y,1,o.aIn===undefined?1:o.aIn); }
  if(o.cross){ for(let i=0;i<3;i++){ const u=clamp(o.cross-i*0.25,0,1); const an=0.2*Math.PI+i*0.25*Math.PI; const r=lerp(R-50,R+30,ease(u)); o2(cx+Math.cos(an)*r,cy+Math.sin(an)*r,1,u>0?1:0); } }
  if(o.out){ for(let i=0;i<2;i++){ const u=clamp(o.out-i*0.3,0,1); const an=0.45*Math.PI+i*0.3*Math.PI; const r=lerp(R+30,R-60,ease(u)); co2(cx+Math.cos(an)*r,cy+Math.sin(an)*r,0.9,u>0?1:0); } }
}
function capillaryCell(cx,cy,t,o={}){ ctx.fillStyle=C.bgMicro; ctx.fillRect(cx-400,cy-400,800,800);
  for(let i=0;i<40;i++){ ctx.fillStyle=rgba(C.grain,0.15); ctx.beginPath(); ctx.arc(cx-300+hash(i)*600,cy-300+hash(i+50)*600,1.5,0,6.283); ctx.fill(); }
  const yv=cy-120; // haarvat
  roundRect(ctx,cx-420,yv-36,840,72,36); ctx.fillStyle=rgba('#9A4A4A',0.28); ctx.fill(); ctx.strokeStyle='#C47070'; ctx.lineWidth=2; ctx.stroke();
  for(let i=0;i<7;i++){ const x=cx-420+((t*70+i*130)%900); const k=clamp((x-(cx-420))/840,0,1); rbc2(x,yv,24,1,o.donker?DONKER:(k<0.55?ROOD:DONKER)); }
  // spiercel(len) en andere cellen rondom
  if(o.cells){ alpha(ctx,o.cells,()=>{ [[-95,-225],[105,-230],[-170,40],[30,150],[200,40]].forEach(([dx,dy],i)=>{ blob(ctx,cx+dx,cy+dy,80,38,0.05,i+2); shape(ctx,rgba(C.er,0.12),C.er,1.5); }); }); }
  alpha(ctx,o.spier===undefined?1:o.spier,()=>{ muscleCell(cx,cy+80,520,1,70); if(o.mito!==undefined){ mitochondrion(ctx,cx-90,cy+95,90,0.2,o.mito); mitochondrion(ctx,cx+120,cy+70,80,-0.3,o.mito); } });
  if(o.o2in){ const u=o.o2in; for(let i=0;i<3;i++){ const k=clamp(u*1.4-i*0.2,0,1); o2(cx-120+i*110,lerp(yv+8,cy+60,ease(k)),1,k>0?1:0); } }
  if(o.food) for(let i=0;i<3;i++) voedsel(cx-170+i*150,cy+110+((i%2)*14),1,o.food);
  if(o.co2){ const u=o.co2; for(let i=0;i<2;i++){ const k=clamp(u*1.3-i*0.25,0,1); co2(cx-60+i*140,lerp(cy+70,yv+6,ease(k)),0.9,k>0?1:0); } }
}
// ---------- pols ----------
function wrist(x,y,a=1,cut=0){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; roundRect(ctx,x-330,y-90,660,180,90); shape(ctx,'#D9A982',_donker('#D9A982',0.15),2);
  [[-0.3,-30],[0.25,10],[-0.15,45]].forEach(([k,dy],i)=>{ ctx.strokeStyle=rgba('#6F86A8',0.75); ctx.lineWidth=7-i; ctx.beginPath(); ctx.moveTo(x-300,y+dy); ctx.bezierCurveTo(x-120,y+dy+40*k,x+80,y+dy-30*k,x+300,y+dy+10*k); ctx.stroke(); });
  if(cut>0.01){ ctx.save(); ctx.globalAlpha*=cut; ctx.beginPath(); ctx.arc(x+40,y+6,70,0,6.283); ctx.fillStyle='#C9906C'; ctx.fill(); ctx.strokeStyle=C.goud; ctx.lineWidth=2; ctx.stroke(); roundRect(ctx,x-30,y-14,140,40,20); shape(ctx,DONKER,lighten(DONKER,0.3),1.5); for(let i=0;i<3;i++) rbc2(x-5+i*40,y+6,13,1,DONKER); ctx.restore(); }
  ctx.restore(); }
// ---------- ketting ----------
const SCHAKELS=[['longen'],['bloed'],['hart'],['bloedvaten']];
function chain(t,o={}){ const y=o.y||420, x0=o.x0||330, dx=o.dx||420; ctx.save();
  SCHAKELS.forEach((s,i)=>{ const x=x0+i*dx, a=o.a?o.a[i]:1; const broken=o.broken===i?o.breakA||0:0;
    alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.beginPath(); ctx.ellipse(0,0,150,92,0,0,6.283); ctx.strokeStyle=broken>0.5?rgba(C.line,0.4):C.line; ctx.lineWidth=10; ctx.stroke(); ctx.restore();
      if(i===0) lungs(x,y+10,0.7,1,0); if(i===1){ for(let k=0;k<(o.weinig?2:5);k++) rbc2(x-50+k*25,y+((k%2)*16-8),14,1); } if(i===2) heartAt(x,y,0.8,1,o.beat||0); if(i===3){ polyStroke([[x-70,y],[x-20,y-20],[x+20,y+20],[x+70,y]],ROOD,8); }
      text(ctx,s[0],x,y+150,fTekst(36,600),C.text,'center'); });
    if(broken>0.01) crossOut(ctx,x+150,y,40,broken);
    if(i<3) alpha(ctx,a,()=>{ ctx.strokeStyle=C.line; ctx.lineWidth=10; ctx.beginPath(); ctx.moveTo(x+140,y); ctx.lineTo(x+dx-140,y); ctx.stroke(); }); });
  ctx.restore(); }
// ---------- twee pompen (uitdaging) ----------
function tweePompen(t,q){ const hx=960, hy=470; const kl=ramp(t,exactAt('kleine')), gr=ramp(t,exactAt('grote')), dik=ramp(t,exactAt('spierwand'));
  // longen boven, lichaam onder
  lungs(hx,180,0.9,ramp(t,3.2)); naamBij(ctx,'longen','',hx+110,170,ramp(t,3.2),'left');
  // kleine lus (rechts in het lichaam = links op het scherm)
  const L1=[[hx-60,hy-40],[hx-170,hy-150],[hx-120,250],[hx-40,230],[hx+40,230],[hx+120,250],[hx+170,hy-150],[hx+60,hy-40]];
  const L2=[[hx+60,hy+50],[hx+300,hy+100],[hx+330,700],[hx+200,780],[hx-200,780],[hx-330,700],[hx-300,hy+100],[hx-60,hy+50]];
  polyStroke(L1,ROOD,7,ramp(t,3.2)); polyStroke(L2,ROOD,7,ramp(t,8.6));
  roundRect(ctx,hx-260,735,520,100,18); shape(ctx,C.fill,C.line,1.5); alpha(ctx,ramp(t,8.6),()=>text(ctx,'de rest van je lichaam',hx,797,fTekst(36,600),C.text,'center'));
  // hart in twee helften
  const ga=ramp(t,0,0.5); alpha(ctx,ga,()=>{ roundRect(ctx,hx-150,hy-90,140,180,40); shape(ctx,rgba(DONKER,0.75),lighten(DONKER,0.3),2); roundRect(ctx,hx+10,hy-90,140,180,40); shape(ctx,rgba(ROOD,0.8),lighten(ROOD,0.3),2+10*dik);
    naamBij(ctx,'rechterhelft','',hx-170,hy+10,ramp(t,3.2),'right'); naamBij(ctx,'linkerhelft','',hx+170,hy+10,ramp(t,8.6),'left'); metaText(ctx,'van voren bekeken',hx,hy+130,C.text2,'center',22); });
  naamBij(ctx,'kleine bloedsomloop','naar de longen en terug',hx-560,300,kl,'left',C.text);
  naamBij(ctx,'grote bloedsomloop','door de rest van je lichaam',hx+380,640,gr,'left',C.text);
  if(dik>0.01) naamBij(ctx,'dikkere wand','',hx+170,hy-60,dik*(1-ramp(t,exactAt('Zo'))),'left',C.goud);
  // deeltje: één rondje = twee keer door het hart
  const u=clamp((t-exactAt('Zo'))/3.0,0,1); if(u>0){ const P=L2.slice(0,4).concat(L2.slice(4)).concat(L1); const p=along(L2.concat(L1),u); rbc2(p[0],p[1],16,1,u<0.5?DONKER:ROOD); const n=u>0.98?2:u>0.48?1:0; metaText(ctx,`door het hart: ${n}×`,hx,hy+170,C.goud,'center',26); }
}
function counterPill(x,y,label,val,a=1,col=C.goud){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; roundRect(ctx,x,y,400,92,14); shape(ctx,rgba(C.bgSchema,0.92),C.line,1); metaText(ctx,label,x+20,y+32,C.grain,'left',22); text(ctx,val,x+20,y+76,fTekst(38,700),col); ctx.restore(); }

// ================= SCÈNES =================
const SCENES={
s01(ctx,t,q){ poolBase(t); const up=ramp(t,q.at('omhoog'),1.4); const sx=lerp(420,900,clamp(t/5.5,0,1)), sy=lerp(560,WATERY-10,up);
  swimmer(sx,sy,1,t,1,up); if(up<0.6) bubbles(sx-120,sy-40,t,6,1-up);
  // klok
  const sec=Math.min(30,Math.floor(clamp(t/q.at('omhoog'),0,1)*30)); counterPill(1500,340,'adem in',`0:${String(sec).padStart(2,'0')}`,1-ramp(t,q.at('Elke'),0.6));
  // zoom naar een cel in de teen
  const zc=ramp(t,q.at('Elke'),0.8); const toe=[sx+(up>0.5?40:130),sy+(up>0.5?280:20)];
  zoomCircle(ctx,1420,400,250,toe[0],toe[1],'een cel in je teen',zc,()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(1100,100,700,700); animalCell(1420,400,180,130,{t}); o2(1420+Math.cos(t)*40,400+Math.sin(t*0.8)*30,1.4,ramp(t,q.at('zuurstof'),0.5)); });
  // vraagspoor van de lucht naar de teen
  const qa=ramp(t,q.at('Hoe'),0.8); if(qa>0.01){ polyStroke([[700,120],[620,220],toe],C.goud,3,qa,[10,10]); o2(700,120,1.4,qa); alpha(ctx,qa,()=>text(ctx,'?',760,140,fTitel(72),C.goud)); }
},
s02(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Ademhaling en bloedsomloop',120,250,fTitel(76),C.text); text(ctx,'Hoe komt zuurstof bij elke cel?',120,330,fTekst(44),C.text2); metaText(ctx,'onderbouw · kerndoelen · film 4',W-60,60,C.text2,'right',22);
  ctx.save(); ctx.translate(820,90); ctx.scale(0.95,0.95); bodyMap({t,beat:beatOf(t)}); const u=(t/4.6)%1; const R=AIR.concat(LUNG2HEART,SLAG); const p=along(R,u); o2(p[0],p[1],1.3,1); ctx.restore(); },
s03(ctx,t,q){ bg(ctx,'schema'); const T=(k,n)=>exactAt(k,n);
  const br=ramp(t,T('borstkas'),1.0), md=ramp(t,T('trekt'),1.2);
  bodyMap({t,longen:0.35+0.65*ramp(t,T('linkerlong'),0.6),vaten:0.15,hart:0.2,middenrif:ramp(t,T('Onder'),0.6),md,mdHl:t>T('Onder')&&t<T('lucht',3)+1.5,breath:br});
  // deeltje langs de luchtweg
  let u=0; if(t<T('ademt')) u=0; else if(t<T('neus')+0.6) u=0.28*ramp(t,T('ademt'),T('neus')+0.6-T('ademt')); else if(t<T('luchtpijp')) u=0.28; else if(t<T('splitst')) u=0.28+0.42*ramp(t,T('luchtpijp')-0.4,1.4); else if(t<T('stroomt')) u=0.7+0.12*ramp(t,T('splitst'),1); else u=0.82+0.18*ramp(t,T('stroomt'),1);
  const p=along(AIR,u); o2(p[0],p[1],1.4,1); focusRing(p[0],p[1],34,ramp(t,0.1,0.4)*(1-ramp(t,T('ademt'),0.6)));
  bodyLabels([['neus','warm · vochtig · stof gevangen',600,200,'left',T('neus')],['luchtpijp','',600,330,'left',T('luchtpijp')],['linkerlong','',680,470,'left',T('linkerlong')],['rechterlong','',440,470,'right',T('rechterlong')],['middenrif','spier onder je longen',700,600,'left',T('middenrif')]],t,q);
  metaText(ctx,'van voren bekeken',560,920-30,C.text2,'center',22);
  alpha(ctx,ramp(t,T('geen'),0.5)*(1-ramp(t,T('Onder'),0.5)),()=>pill(ctx,1300,420,'longen: geen spieren',C.teal,1,40));
  if(t>T('trekt')) { arrow(ctx,560,560,560,620,C.goud,4,16,ramp(t,T('trekt'),0.5)*(1-ramp(t,T('borstkas'),0.5))); }
  alpha(ctx,ramp(t,T('borstkas'),0.6),()=>{ arrow(ctx,700,450,760,450,C.text2,3,12); arrow(ctx,420,450,360,450,C.text2,3,12); pill(ctx,1300,420,'borstkas groter → lucht stroomt in',C.goud,1,36); });
  if(t>T('stroomt')) for(let i=0;i<4;i++){ const k=((t-T('stroomt'))*0.8+i/4)%1; const pp=along(AIR,k*0.7); o2(pp[0],pp[1],0.8,0.7); }
},
s04(ctx,t,q){ bg(ctx,'schema'); const T=(k,n)=>exactAt(k,n); bodyMap({t,sil:0.6,vaten:0.15,hart:0.2,middenrif:0.3}); o2(LONGB[0],LONGB[1],1.2,1);
  const zc=ramp(t,0.1,0.8); const CX=1300, CY=430;
  zoomCircle(ctx,CX,CY,300,LONGB[0],LONGB[1],t<T('Om')?'in je long':'één longblaasje · vergroot',zc,()=>{
    if(t<T('Om')-0.3){ ctx.fillStyle=C.bgMicro; ctx.fillRect(CX-300,CY-300,600,600); const g=ramp(t,0.2,2.4); // vertakking
      const tak=(x,y,an,len,d)=>{ if(d>4) return; const k=clamp(g*5-d,0,1); if(k<=0) return; const x2=x+Math.cos(an)*len*k, y2=y+Math.sin(an)*len*k; ctx.strokeStyle=lighten(C.teal,0.2); ctx.lineWidth=10-d*2; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x2,y2); ctx.stroke(); if(k>=1){ tak(x2,y2,an-0.5,len*0.68,d+1); tak(x2,y2,an+0.5,len*0.68,d+1); } else return; if(d===4){ const ba=ramp(t,T('blaasjes:')-0.6,0.8); if(ba>0.01){ ctx.save(); ctx.globalAlpha*=ba; for(let j=0;j<5;j++){ const aa=j/5*6.283; ctx.beginPath(); ctx.arc(x2+Math.cos(aa)*12,y2+Math.sin(aa)*12,11,0,6.283); shape(ctx,rgba(C.teal,0.25),lighten(C.teal,0.3),1.2); } ctx.restore(); } } };
      tak(CX,CY-280,1.5708,140,0);
      alpha(ctx,ramp(t,T('honderden'),0.5),()=>metaText(ctx,'honderden miljoenen',CX,CY+250,C.goud,'center',26)); }
    else { const cr=ramp(t,T('In',2)-0.2,0.5), out=ramp(t,T('Koolstofdioxide'),1.6);
      alveolus(CX,CY,t,{hv:ramp(t,T('netje'),0.8),wandHl:t>T('wand')&&t<T('In',2),nIn:9,cross:ramp(t,T('Dus'),2.2),out}); }
  });
  bodyLabels([['longblaasjes','',CX+320,CY-140,'left',T('longblaasjes.'),T('Om')],['longblaasje','',CX+320,CY-140,'left',T('Om')],['haarvaten','piepkleine bloedvaatjes',CX+320,CY+230,'left',T('haarvaten.')]],t,q);
  alpha(ctx,ramp(t,T('wand'),0.5)*(1-ramp(t,T('In',2),0.5)),()=>pill(ctx,CX,84,'wand: heel dun',C.goud,1,34));
  alpha(ctx,ramp(t,T('In',2),0.5)*(1-ramp(t,T('Koolstofdioxide'),0.5)),()=>pill(ctx,CX,84,'blaasje: veel zuurstof · bloed: weinig',C.teal,1,32));
  alpha(ctx,ramp(t,T('Koolstofdioxide'),0.5)*(1-ramp(t,T('Dan'),0.5)),()=>pill(ctx,CX,84,'koolstofdioxide: andere kant op',C.text2,1,32));
  alpha(ctx,ramp(t,T('Wat'),0.5),()=>text(ctx,'?',CX+250,CY-250,fTitel(90),C.goud));
},
s06(ctx,t,q){ bg(ctx,'schema'); const T=(k,n)=>exactAt(k,n); const swap=ramp(t,T('Ons')-0.3,0.6);
  // in- en uitgeademde lucht: 20 deeltjes per bak
  alpha(ctx,1-swap,()=>{ [['ingeademd',300],['uitgeademd',1000]].forEach(([nm,x],b)=>{ roundRect(ctx,x,250,600,420,20); shape(ctx,rgba(C.fill,0.9),C.line,1.5); text(ctx,nm,x+300,230,fTekst(40,600),C.text,'center');
      for(let i=0;i<20;i++){ const gx=x+70+(i%5)*115, gy=320+Math.floor(i/5)*95; const kind = b===0 ? (i<4?'o2':'n') : (i<3?'o2':i===3?'co2':'n'); const show=b===0?1:ramp(t,0.3+i*0.04,0.4);
        if(kind==='o2') o2(gx,gy,1.3,show); else if(kind==='co2') co2(gx,gy,1.2,show*ramp(t,T('koolstofdioxide'),0.5)); else dot(ctx,gx,gy,9,rgba(C.text2,0.35*show)); } });
    alpha(ctx,ramp(t,T('driekwart'),0.5),()=>{ pill(ctx,960,760,'driekwart van de zuurstof adem je weer uit',C.teal,1,34); });
    alpha(ctx,ramp(t,T('waterdamp'),0.5),()=>{ for(let k=0;k<3;k++){ ctx.beginPath(); ctx.arc(1460+k*40,700,8,0,6.283); ctx.strokeStyle=lighten(C.teal,0.3); ctx.lineWidth=2; ctx.stroke(); } metaText(ctx,'+ waterdamp',1540,708,C.text2,'left',22); });
    metaText(ctx,'grijze stip: andere gassen (vooral stikstof)',960,850,C.text2,'center',22); });
  alpha(ctx,swap,()=>{ const beat=beatOf(t); bodyMap({t,beat,longen:0.6,middenrif:0.3,hartHl:ramp(t,T('hart'),0.5)}); const u=ramp(t,T('Het',2)+0.2,T('hart')-T('Het',2)); const p=along(LUNG2HEART,u); rbc2(p[0]+10,p[1]+8,14,1,ROOD); o2(p[0],p[1]-4,1,1);
    bodyLabels([['rode bloedcel','neemt de zuurstof mee',700,500,'left',T('rode'),T('Het',3)],['hart','pompt',700,540,'left',T('hart')]],t,q);
    alpha(ctx,ramp(t,T('zeventig'),0.5),()=>counterPill(1300,400,'hartslag in rust','± 70 × per minuut',1));
    alpha(ctx,ramp(t,T('Je',2),0.5),()=>heartAt(1460,700,1.8,1,beat)); });
},
s07(ctx,t,q){ bg(ctx,'schema'); const T=(k,n)=>exactAt(k,n); const beat=beatOf(t); const zc=ramp(t,T('Die')-0.3,0.8);
  bodyMap({t,beat,longen:0.4,middenrif:0.2,slagHl:ramp(t,T('slagader.'),0.5)*(1-zc)});
  const u=ramp(t,T('slagader.'),T('haarvaten.')-T('slagader.')); const p=along(SLAG,u); rbc2(p[0]+8,p[1],12,1,ROOD); o2(p[0]-4,p[1]-6,0.9,1);
  // kloppen: golfjes langs de slagader
  if(t>T('Bij')&&t<T('Zo')+0.5){ for(let k=0;k<3;k++){ const ph=((t*70/60)+k/3)%1; const pp=along(SLAG,ph); focusRing(pp[0],pp[1],10+14*ph,(1-ph)*0.9); } }
  bodyLabels([['slagader','van je hart af · dikke wand',650,640,'left',T('slagader.'),T('Die')-0.3],['haarvaten','',360,800,'right',T('haarvaten.'),T('Die')-0.3]],t,q);
  alpha(ctx,ramp(t,T('onthouden:'),0.5)*(1-ramp(t,T('De'),0.5)),()=>{ text(ctx,'slag',1180,450,fTitel(110),C.goud,'left'); ctx.font=fTitel(110); const w=ctx.measureText('slag').width; text(ctx,'ader',1180+w,450,fTitel(110),C.text,'left'); metaText(ctx,'je voelt de slag van je hart',1180,520,C.grain,'left',24); });
  alpha(ctx,ramp(t,T('vertakken'),0.5)*(1-zc),()=>{ for(let k=0;k<6;k++){ polyStroke([[492,790],[450+k*18,840+(k%2)*10]],ROOD,1.5); } });
  zoomCircle(ctx,1300,440,300,KUIT[0],KUIT[1],'haarvaten in je kuit · vergroot',zc,()=>capillaryCell(1300,440,t,{spier:0,cells:ramp(t,T('Haarvaten',2),0.6)}));
  alpha(ctx,ramp(t,T('één'),0.5)*zc,()=>pill(ctx,1300,84,'één voor één',C.goud,1,32));
},
s08(ctx,t,q){ bg(ctx,'schema'); const T=(k,n)=>exactAt(k,n); bodyMap({t,beat:beatOf(t),longen:0.4,middenrif:0.2}); o2(KUIT[0],KUIT[1]-10,1,1);
  zoomCircle(ctx,1300,440,300,KUIT[0],KUIT[1],'spiercel in je kuit · vergroot',1,()=>capillaryCell(1300,440,t,{o2in:ramp(t,T('Dus'),1.6),food:ramp(t,T('verbrandt'),0.6)*(1-ramp(t,T('energie.'),0.6)),mito:ramp(t,T('verbrandt'),0.6)}));
  bodyLabels([['spiercel','',1620,640,'left',T('spiercel')]],t,q);
  alpha(ctx,ramp(t,T('weinig'),0.5)*(1-ramp(t,T('verbrandt'),0.5)),()=>pill(ctx,1300,84,'in de cel: weinig zuurstof',C.teal,1,32));
  alpha(ctx,ramp(t,T('energie.'),0.4),()=>{ for(let k=0;k<8;k++){ const an=k/8*6.283; const r=40+30*ramp(t,T('energie.'),0.8); polyStroke([[1300+Math.cos(an)*30,560+Math.sin(an)*20],[1300+Math.cos(an)*r*1.6,560+Math.sin(an)*r]],ROOD,4); } pill(ctx,1300,84,'energie',ROOD,1,36); });
},
s09(ctx,t,q){ bg(ctx,'schema'); const T=(k,n)=>exactAt(k,n); const pw=ramp(t,T('Aan')-0.3,0.7);
  alpha(ctx,1-pw,()=>{ bodyMap({t,beat:beatOf(t),longen:0.4,middenrif:0.2,aderHl:t>T('Via')}); const zc=1-ramp(t,T('Via')-0.3,0.6);
    zoomCircle(ctx,1300,440,300,KUIT[0],KUIT[1],'spiercel in je kuit · vergroot',zc,()=>capillaryCell(1300,440,t,{co2:ramp(t,T('Dat')-0.2,1.6),mito:1}));
    alpha(ctx,ramp(t,0.1,0.5)*zc,()=>pill(ctx,1300,84,'koolstofdioxide',C.text2,1,34));
    const u=ramp(t,T('Via'),T('Aan')-T('Via')-0.5); if(t>T('Via')){ const p=along(ADER,u); rbc2(p[0]+8,p[1],12,1,DONKER); co2(p[0]-4,p[1]-8,0.8,1); }
    bodyLabels([['ader','naar je hart toe',380,700,'right',T('aders')]],t,q); });
  alpha(ctx,pw,()=>{ wrist(960,430,1,0); metaText(ctx,'zo zie je het',960,600,C.grain,'center',24); text(ctx,'Welke kleur heeft het bloed daarin?',960,240,fTekst(44,600),C.text,'center'); alpha(ctx,ramp(t,T('Welke'),0.5),()=>text(ctx,'?',1360,330,fTitel(90),C.goud)); });
},
s11(ctx,t,q){ bg(ctx,'schema'); const T=(k,n)=>exactAt(k,n); const back=ramp(t,T('Je')-0.3,0.7);
  alpha(ctx,1-back,()=>{ wrist(960,330,1,ramp(t,0.1,0.6)); metaText(ctx,'zo is het: donkerrood',960,500,C.grain,'center',24);
    alpha(ctx,ramp(t,T('Met'),0.5),()=>{ roundRect(ctx,520,600,360,60,30); shape(ctx,ROOD,lighten(ROOD,0.3),1.5); text(ctx,'helderrood',700,700+10,fTekst(36,600),C.text,'center'); metaText(ctx,'veel zuurstof',700,740,C.grain,'center',22); o2(560,630,1,1); o2(840,630,1,1); });
    alpha(ctx,ramp(t,T('minder'),0.5),()=>{ roundRect(ctx,1040,600,360,60,30); shape(ctx,DONKER,lighten(DONKER,0.3),1.5); text(ctx,'donkerrood',1220,700+10,fTekst(36,600),C.text,'center'); metaText(ctx,'minder zuurstof',1220,740,C.grain,'center',22); });
    alpha(ctx,ramp(t,T('blauw'),0.5),()=>pill(ctx,960,160,'blauw lijkt het door je huid, niet door het bloed',C.goud,1,32)); });
  alpha(ctx,back,()=>{ bodyMap({t,beat:beatOf(t),longen:1,middenrif:0.4,hartHl:ramp(t,T('hart'),0.5)*(1-ramp(t,T('longen.'),0.5))}); const u=ramp(t,T('Je')+0.2,T('longen.')-T('Je')); const p=along(HEART2LUNG,u); rbc2(p[0],p[1],12,1,DONKER);
    const cu=ramp(t,T('Koolstofdioxide'),1.4); if(cu>0){ const pp=along(AIR.slice().reverse(),cu); co2(pp[0],pp[1],1.1,1-ramp(t,T('nieuwe'),0.4)); }
    const ou=ramp(t,T('nieuwe'),1.4); if(ou>0){ const pp=along(AIR,0.6+0.4*ou); o2(pp[0],pp[1],1.1,1); }
    alpha(ctx,ramp(t,T('rond.'),0.5),()=>{ const k=((t-T('rond.'))/3)%1; const R=LUNG2HEART.concat(SLAG,ADER,HEART2LUNG); const pp=along(R,k); rbc2(pp[0],pp[1],12,1,k<0.55?ROOD:DONKER); });
    alpha(ctx,ramp(t,T('rondje'),0.5),()=>counterPill(1300,400,'één rondje in rust','± 1 minuut',1)); });
},
s12(ctx,t,q){ bg(ctx,'schema'); tweePompen(t,q); },
s13(ctx,t,q){ bg(ctx,'schema'); const T=(k,n)=>exactAt(k,n); const sp=ramp(t,T('Als')-0.2,0.6), rb=ramp(t,T('Stel:'),0.6); const tempo=1+1.2*ramp(t,T('sneller'),1.5);
  alpha(ctx,1-rb,()=>{ bodyMap({t,beat:beatOf(t,70*tempo),breath:0.5+0.5*Math.sin(t*1.6*tempo),longen:ramp(t,T('ademhalingsstelsel'),0.5)*0.7+0.3,vaten:ramp(t,T('bloedvatenstelsel'),0.5)*0.8+0.2,hart:0.3+0.7*ramp(t,T('bloedvatenstelsel'),0.5)});
    bodyLabels([['ademhalingsstelsel','zuurstof in, koolstofdioxide uit',700,380,'left',T('ademhalingsstelsel'),T('Als')],['bloedvatenstelsel','brengt het rond',700,640,'left',T('bloedvatenstelsel'),T('Als')]],t,q);
    alpha(ctx,sp,()=>{ persoon(ctx,'noor',1180,820,420,{outfit:'sport',pose:'staan',uit:'lacht',t}); counterPill(1440,300,'ademhalingen per minuut',t>T('ademt')?'± 15 → 40':'± 15',ramp(t,T('ademt')-0.5,0.5)); counterPill(1440,420,'hartslag per minuut',t>T('klopt')?'± 70 → 150':'± 70',ramp(t,T('hart')-0.3,0.5)); metaText(ctx,'ongeveer',1440,540,C.text2,'left',22); }); });
  alpha(ctx,rb,()=>{ roundRect(ctx,360,380,1200,120,60); shape(ctx,rgba(DONKER,0.25),'#C47070',2); for(let k=0;k<3;k++){ const x=420+((t*90+k*400)%1100); rbc2(x,440,28,1,ROOD); }
    text(ctx,'te weinig rode bloedcellen',960,330,fTekst(44,600),C.text,'center'); alpha(ctx,ramp(t,T('Bij'),0.5),()=>pill(ctx,960,620,'bij sport snel moe',C.koraal,1,36)); alpha(ctx,ramp(t,T('Hoe'),0.5),()=>text(ctx,'?',1500,320,fTitel(90),C.goud)); });
},
s15(ctx,t,q){ bg(ctx,'schema'); const T=(k,n)=>exactAt(k,n); const ch=ramp(t,T('Het')-0.2,0.6);
  alpha(ctx,1-ch,()=>{ roundRect(ctx,360,380,1200,120,60); shape(ctx,rgba(DONKER,0.25),'#C47070',2); for(let k=0;k<3;k++){ const x=420+((t*90+k*400)%1100); rbc2(x,440,28,1,ROOD); o2(x,410,0.9,1); }
    for(let k=0;k<6;k++) o2(500+k*170,620+(k%2)*30,1.2,ramp(t,T('Maar'),0.5)); alpha(ctx,ramp(t,T('Maar'),0.5),()=>metaText(ctx,'zuurstof genoeg · te weinig vervoer',960,720,C.teal,'center',24));
    alpha(ctx,ramp(t,T('longen'),0.5),()=>{ pill(ctx,700,260,'longen werken',C.groen,1,32); pill(ctx,1220,260,'hart werkt',C.groen,1,32); });
    alpha(ctx,ramp(t,T('spieren'),0.5),()=>pill(ctx,960,800,'spieren krijgen te weinig zuurstof',C.koraal,1,32)); });
  alpha(ctx,ch,()=>{ chain(t,{beat:beatOf(t),broken:1,breakA:ramp(t,T('Breekt'),0.5),weinig:false,a:[1,1,1,1]}); alpha(ctx,ramp(t,T('cellen'),0.5),()=>pill(ctx,960,760,'je cellen krijgen te weinig zuurstof',C.koraal,1,34)); });
},
s16(ctx,t,q){ poolBase(t); const T=(k,n)=>exactAt(k,n); const up=ramp(t,T('omhoog.')-0.6,1.2); const sx=860, sy=lerp(600,WATERY-10,up);
  swimmer(sx,sy,1,t,1,up); if(up<0.6) bubbles(sx-120,sy-40,t,3,1-up);
  const k=clamp(t/T('Koolstofdioxide'),0,1)*0.5+0.5*ramp(t,T('Koolstofdioxide'),3);
  alpha(ctx,ramp(t,T('Er'),0.5),()=>{ counterPill(1450,360,'zuurstof in je bloed',k<0.5?'daalt':'daalt verder',1,C.teal); });
  alpha(ctx,ramp(t,T('Koolstofdioxide'),0.5),()=>{ roundRect(ctx,1450,480,330,140,14); shape(ctx,rgba(C.bgSchema,0.92),C.line,1); metaText(ctx,'koolstofdioxide',1470,512,C.grain,'left',22); for(let i=0;i<Math.round(2+8*ramp(t,T('Koolstofdioxide'),3));i++) co2(1490+(i%5)*60,550+Math.floor(i/5)*40,0.8,1); });
  alpha(ctx,ramp(t,T('hersenen.'),0.5),()=>{ const hx=up>0.5?sx:sx-262, hy=up>0.5?WATERY-60:sy; focusRing(hx,hy,60+8*Math.sin(t*8),1); pill(ctx,1615,700,'je hersenen merken het',C.paars,1,30); });
},
s17(ctx,t,q){ bg(ctx,'schema'); const T=(k,n)=>exactAt(k,n); const beat=beatOf(t);
  bodyMap({t,beat,middenrif:0.4,longen:1,slagHl:t>T('slagaders')&&t<T('haarvaten,')+0.6?1:0,aderHl:t>T('aders')&&t<T('hart',2)+0.6,hartHl:(t>T('hart')&&t<T('slagaders'))?1:0});
  const R=AIR.concat(LUNG2HEART,SLAG); let p; if(t<T('In')) p=along(AIR,ramp(t,0.2,T('longen.')-0.2)); else if(t<T('hart')) p=along(AIR,1); else if(t<T('Daar')) p=along(LUNG2HEART.concat(SLAG),ramp(t,T('hart'),T('haarvaten,')-T('hart')+0.4)); else p=null;
  if(p) o2(p[0],p[1],1.3,1-ramp(t,T('Daar')-0.2,0.4));
  if(t>T('Via')){ const pp=along(ADER,ramp(t,T('Via'),T('hart',2)-T('Via'))); rbc2(pp[0]+6,pp[1],12,1,DONKER); co2(pp[0]-4,pp[1]-8,0.8,1); }
  bodyLabels([['neus','',600,200,'left',T('neus')],['luchtpijp','',600,330,'left',T('luchtpijp')],['longblaasjes','zuurstof erin, koolstofdioxide eruit',700,470,'left',T('longblaasjes')],['hart','',700,540,'left',T('hart')],['slagaders','',650,640,'left',T('slagaders')],['haarvaten','vlak bij elke cel',360,800,'right',T('haarvaten,')],['aders','',380,700,'right',T('aders')]],t,q);
  alpha(ctx,ramp(t,T('Twee'),0.5),()=>{ chain(t,{beat,y:190,x0:1100,dx:230,a:[1,1,1,1]}); });
  focusRing(TEEN[0],TEEN[1],26,ramp(t,T('teen.'),0.4));
},
s18(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Probeer het zelf',120,200,fTitel(80),C.text); metaText(ctx,'de reis van een zuurstofdeeltje',120,260,C.grain,'left',26);
  const P=[['Tel een hartslag','Tel 15 seconden de polsslag, in rust en na een minuut springen. Keer vier: hoeveel per minuut? Wat zie je?'],['Kalkwaterproef','Met je docent: blaas door een rietje in kalkwater. Het wordt troebel. Welk gas zit er meer in je uitademlucht?'],['Vertering','Kijk de film Vertering: waar komen de voedingsstoffen vandaan die je spiercel verbrandt?']];
  P.forEach((p,i)=>{ const x=120+i*575; alpha(ctx,ramp(t,0.6+i*0.6,0.6),()=>{ roundRect(ctx,x,330,535,300,14); shape(ctx,rgba(C.bgSchema,0.95),C.line,1); text(ctx,p[0],x+28,392,fTekst(38,600),C.goud); ctx.font=fTekst(30); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,p[1],x+28,445,480,40); }); });
  alpha(ctx,ramp(t,2.6,0.6),()=>{ ctx.font=fTekst(36,600); ctx.fillStyle=C.goud; ctx.textAlign='left'; wrap(ctx,'Hoog in de bergen zit in elke hap lucht minder zuurstof. Waarom ademt een klimmer daar sneller, en klopt zijn hart sneller?',120,720,1680,46); });
  metaText(ctx,'biologie bij kamiel · stem: roos (elevenlabs) · versie 1.0 · oktober 2026',W/2,CAPTION_Y-10,C.text2,'center',22); },
};
