// ===== Uitscheiding — scènes (kerndoelen onderbouw, film 5) =====
// Gedeelde hulpjes uit film 4 (moleculen, paden, exacte cues, tellers) staan hieronder; daarna de tekeningen van deze film.
function circ(ctx,x,y,r,fill,stroke,lw=1.5){ ctx.beginPath(); ctx.arc(x,y,r,0,6.283); if(fill){ctx.fillStyle=fill;ctx.fill();} if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=lw;ctx.stroke();} }
// Hulpjes uit film 1–3 staan hierboven (helpers.js) en personages (lib_cast.js). Nieuw: routekaart lichaam (BM, bodyMap), zuurstof- en koolstofdioxidevormpjes,
// zwembad, longblaasje, haarvat bij spiercel, pols, twee pompen (uitdaging), ketting.

// exacte woord-cue (heel woord, hoofdlettergevoelig, n-de keer) in het huidige segment; T(k,n) in de scènes gebruikt dit
const _ewCache=new Map();
function exactAt(w,n=1){ const it=state.items[state.idx]; const seg=it&&it.seg; if(!seg||!seg.words) return Infinity; const key=seg.id+'|'+w+'|'+n; if(_ewCache.has(key)) return _ewCache.get(key);
  const nm=s=>s.replace(/[^A-Za-zÀ-ÿ0-9]/g,''); /* hoofdlettergevoelig */ let c=0, r=Infinity; for(const x of seg.words){ if(nm(x.t)===nm(w)){ c++; if(c===n){ r=x.s; break; } } } _ewCache.set(key,r); return r; }
// ---------- moleculen ----------
function o2(x,y,s=1,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; [[-6,0],[6,0]].forEach(([dx])=>{ ctx.beginPath(); ctx.arc(x+dx*s,y,8.5*s,0,6.283); shape(ctx,C.teal,lighten(C.teal,0.45),1.4); }); ctx.restore(); }
function co2(x,y,s=1,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; [[-11,6.5],[11,6.5],[0,8.5]].forEach(([dx,r])=>{ ctx.beginPath(); ctx.arc(x+dx*s,y,r*s,0,6.283); shape(ctx,dx?'#B9C0CC':'#7E8796',lighten('#9AA3B2',0.4),1.3); }); ctx.restore(); }
function voedsel(x,y,s=1,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.beginPath(); for(let k=0;k<6;k++){ const an=k/6*6.283+0.5; const px=x+Math.cos(an)*9*s, py=y+Math.sin(an)*9*s; k?ctx.lineTo(px,py):ctx.moveTo(px,py); } ctx.closePath(); shape(ctx,C.oker,lighten(C.oker,0.4),1.4); ctx.restore(); }
const ROOD='#E07A5F', DONKER='#9A4A4A';
function rbc2(x,y,r,a=1,col=ROOD){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.beginPath(); ctx.ellipse(x,y,r,r*0.92,0,0,6.283); shape(ctx,col,lighten(col,0.35),1.6); ctx.beginPath(); ctx.ellipse(x,y,r*0.45,r*0.4,0,0,6.283); ctx.fillStyle=rgba('#5A2626',0.35); ctx.fill(); ctx.restore(); }

// ---------- pad-hulp: punt op een polylijn (booglengte) ----------
function along(P,u){ u=clamp(u,0,1); let L=0; const seg=[]; for(let i=1;i<P.length;i++){ const d=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]); seg.push(d); L+=d; } let s=u*L; for(let i=0;i<seg.length;i++){ if(s<=seg[i]||i===seg.length-1){ const k=seg[i]?s/seg[i]:0; return [lerp(P[i][0],P[i+1][0],k),lerp(P[i][1],P[i+1][1],k)]; } s-=seg[i]; } return P[P.length-1]; }
function polyStroke(P,col,lw,a=1,dash=null){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.strokeStyle=col; ctx.lineWidth=lw; ctx.lineCap='round'; ctx.lineJoin='round'; if(dash) ctx.setLineDash(dash); ctx.beginPath(); P.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1])); ctx.stroke(); ctx.restore(); }
function heartAt(x,y,s,a=1,beat=0,hl=0){ if(a<=0.01) return; heart(x,y,s,a,beat); if(hl>0.01){ ctx.save(); ctx.globalAlpha*=a*hl; ctx.translate(x,y); ctx.scale(s,s); ctx.beginPath(); ctx.moveTo(0,28); ctx.bezierCurveTo(-40,-6,-30,-40,0,-18); ctx.bezierCurveTo(30,-40,40,-6,0,28); ctx.strokeStyle=C.goud; ctx.lineWidth=4/s; ctx.stroke(); ctx.restore(); } }
function bodyLabels(names,t,q){ // names: [[naam,meta,x,y,align,t0]]
  names.forEach(([n,m,x,y,al,t0,t1])=>naamBij(ctx,n,m,x,y,ramp(t,t0,0.5)*(t1?1-ramp(t,t1,0.5):1),al||'left')); }
function focusRing(x,y,r,a){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.strokeStyle=C.goud; ctx.lineWidth=2.5; ctx.beginPath(); ctx.arc(x,y,r,0,6.283); ctx.stroke(); ctx.restore(); }
function beatOf(t,bpm=70){ return t*bpm/60*6.283; }
function counterPill(x,y,label,val,a=1,col=C.goud){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; roundRect(ctx,x,y,400,92,14); shape(ctx,rgba(C.bgSchema,0.92),C.line,1); metaText(ctx,label,x+20,y+32,C.grain,'left',22); text(ctx,val,x+20,y+76,fTekst(38,700),col); ctx.restore(); }

// ---------- deeltjes van deze film ----------
function hexMix(a,b,k){ const p=h=>[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)]; const A=p(a),B=p(b); k=clamp(k,0,1); return `rgb(${A.map((v,i)=>Math.round(v+(B[i]-v)*k)).join(',')})`; }
function waterDot(x,y,s=1,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.beginPath(); ctx.moveTo(x,y-9*s); ctx.quadraticCurveTo(x+7*s,y,x,y+6*s); ctx.quadraticCurveTo(x-7*s,y,x,y-9*s); shape(ctx,C.teal,lighten(C.teal,0.4),1.2); ctx.restore(); }
function zout(x,y,s=1,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; roundRect(ctx,x-6*s,y-6*s,12*s,12*s,2); shape(ctx,'#E8ECF0','#FFFFFF',1); ctx.restore(); }
function ureum(x,y,s=1,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.beginPath(); ctx.moveTo(x,y-9*s); ctx.lineTo(x+9*s,y); ctx.lineTo(x,y+9*s); ctx.lineTo(x-9*s,y); ctx.closePath(); shape(ctx,C.grain,lighten(C.grain,0.4),1.2); ctx.restore(); }
function gifStof(x,y,s=1,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.beginPath(); ctx.moveTo(x,y-10*s); ctx.lineTo(x+9*s,y+7*s); ctx.lineTo(x-9*s,y+7*s); ctx.closePath(); shape(ctx,C.koraal,lighten(C.koraal,0.4),1.2); ctx.restore(); }
function kleurstof(x,y,s=1,a=1){ if(a<=0.01) return; dot(ctx,x,y,7*s,'#D9A520',lighten('#D9A520',0.4)); }
const PLAS_LICHT='#EFE9C9', PLAS_DONKER='#C98A2E';
function glas(x,y,k,lvl=1,a=1,w=70,h=110){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; const top=y-h; ctx.beginPath(); ctx.moveTo(x-w/2,top); ctx.lineTo(x-w/2+8,y); ctx.lineTo(x+w/2-8,y); ctx.lineTo(x+w/2,top); ctx.strokeStyle='#AFC0D0'; ctx.lineWidth=2;
  const lv=top+h*(1-0.85*lvl); ctx.save(); ctx.beginPath(); ctx.moveTo(x-w/2+(lv-top)/h*8,lv); ctx.lineTo(x-w/2+8,y); ctx.lineTo(x+w/2-8,y); ctx.lineTo(x+w/2-(lv-top)/h*8,lv); ctx.closePath(); ctx.fillStyle=hexMix(PLAS_LICHT,PLAS_DONKER,k); ctx.fill(); ctx.restore(); ctx.beginPath(); ctx.moveTo(x-w/2,top); ctx.lineTo(x-w/2+8,y); ctx.lineTo(x+w/2-8,y); ctx.lineTo(x+w/2,top); ctx.stroke(); ctx.restore(); }
function glazen(x,y,a=1,hl=-1){ if(a<=0.01) return; for(let i=0;i<5;i++){ glas(x+i*90,y,i/4,1,a); if(i===hl) focusRing(x+i*90,y-55,70,a); } alpha(ctx,a,()=>{ metaText(ctx,'bijna kleurloos',x-30,y+40,C.text2,'left',20); metaText(ctx,'donkergeel',x+400,y+40,C.text2,'right',20); }); }

// ---------- routekaart (Schema, van voren bekeken) ----------
const BM={cx:560,yb:870,h:760};
const NIER_L=[505,548], NIER_R=[615,548], BLAAS=[560,646], LEVER=[488,520];
const LEIDER_L=[[512,575],[530,610],[548,632]], LEIDER_R=[[608,575],[590,610],[572,632]], PLASBUIS=[[560,666],[560,705]];
const VAN_SPIER=[[492,800],[500,700],[516,640],[540,590]], NAAR_LEVER=[[540,590],[510,545],[488,520]], LEVER_NIER=[[488,520],[500,540],[505,548]];
function lever(x,y,a=1,hl=0){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.beginPath(); ctx.moveTo(x-50,y-20); ctx.quadraticCurveTo(x+10,y-48,x+75,y-22); ctx.quadraticCurveTo(x+40,y+10,x-30,y+28); ctx.quadraticCurveTo(x-62,y+10,x-50,y-20); ctx.closePath(); shape(ctx,rgba('#8C5A3A',0.85),hl?C.goud:lighten('#8C5A3A',0.35),hl?3:1.5); ctx.restore(); }
function nier(x,y,s=1,a=1,hl=0){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.translate(x,y); ctx.scale(s,s); ctx.beginPath(); ctx.moveTo(0,-26); ctx.bezierCurveTo(22,-28,24,26,0,26); ctx.bezierCurveTo(-14,26,-16,10,-8,4); ctx.bezierCurveTo(-2,0,-2,-2,-8,-6); ctx.bezierCurveTo(-16,-12,-14,-26,0,-26); ctx.closePath(); if(x<560){ ctx.scale(-1,1); } shape(ctx,'#9A4A4A',hl?C.goud:'#C47070',hl?3/s:1.5/s); ctx.restore(); }
function bodyMap5(o={}){ const A=k=>o[k]===undefined?1:o[k]; const {cx,yb,h}=BM;
  ctx.save(); ctx.globalAlpha*=0.3*A('sil'); human(ctx,cx,yb,h,1,C.mens); ctx.restore();
  if(o.huid) alpha(ctx,o.huid,()=>{ ctx.save(); ctx.globalAlpha*=0.35; human(ctx,cx,yb,h,1,C.teal); ctx.restore(); for(let i=0;i<7;i++){ const yy=360+i*45, side=i%2?1:-1; waterDot(cx+side*(128+6*Math.sin(i)),yy+((o.t||0)*30+i*13)%40,1,0.9); } });
  alpha(ctx,A('longen')*0.6,()=>{ [[512,440],[608,440]].forEach(([x,y])=>{ ctx.beginPath(); ctx.ellipse(x,y,40,70,0,0,6.283); shape(ctx,rgba(C.teal,0.3),lighten(C.teal,0.15),1.5); }); polyStroke([[560,262],[560,372]],lighten(C.teal,0.3),7); });
  alpha(ctx,A('hart')*0.6,()=>heart(576,505,0.6,1,o.beat||0));
  lever(LEVER[0],LEVER[1],A('lever'),o.leverHl);
  nier(NIER_L[0],NIER_L[1],1,A('nieren'),o.nierHl); nier(NIER_R[0],NIER_R[1],1,A('nieren'),o.nierHl);
  alpha(ctx,A('leiders'),()=>{ polyStroke(LEIDER_L,o.leiderHl?C.goud:'#C9A35C',o.leiderHl?5:3.5); polyStroke(LEIDER_R,o.leiderHl?C.goud:'#C9A35C',o.leiderHl?5:3.5); });
  alpha(ctx,A('blaas'),()=>{ const v=o.vol===undefined?0.5:o.vol; ctx.beginPath(); ctx.ellipse(BLAAS[0],BLAAS[1],22+12*v,15+8*v,0,0,6.283); shape(ctx,rgba(C.oker,0.25+0.45*v),o.blaasHl?C.goud:lighten(C.oker,0.3),o.blaasHl?3:1.5); });
  alpha(ctx,A('plasbuis'),()=>polyStroke(PLASBUIS,o.plasHl?C.goud:'#C9A35C',o.plasHl?5:3));
  if(o.vaten) alpha(ctx,o.vaten,()=>{ polyStroke(VAN_SPIER,DONKER,4); polyStroke(NAAR_LEVER,DONKER,4); polyStroke([[566,520],[590,540],[615,548]],ROOD,4); polyStroke([[566,520],[540,535],[505,548]],ROOD,4); });
}

// ---------- de nier als filter (Schema) ----------
const BUIS_Y=250, ZEEF_X=600, FILT_Y=560, GLAS_X=1560;
function filterBase(t,o={}){ // bloedbuis boven, filter, voorurinebuis, terugpijlen, glas
  roundRect(ctx,140,BUIS_Y-45,1640,90,45); shape(ctx,rgba(DONKER,0.3),'#C47070',2); metaText(ctx,'bloed',170,BUIS_Y-60,C.grain,'left',22);
  for(let i=0;i<7;i++){ const x=160+((t*90+i*235)%1600); rbc2(x,BUIS_Y+((i%2)*20-10),20,1,ROOD); }
  // zeef
  alpha(ctx,o.zeef===undefined?1:o.zeef,()=>{ ctx.strokeStyle=o.zeefHl?C.goud:C.line; ctx.lineWidth=3; ctx.setLineDash([8,8]); ctx.beginPath(); ctx.moveTo(ZEEF_X-70,BUIS_Y+45); ctx.lineTo(ZEEF_X+70,BUIS_Y+45); ctx.stroke(); ctx.setLineDash([]);
    roundRect(ctx,ZEEF_X-40,BUIS_Y+50,80,FILT_Y-BUIS_Y-50,30); shape(ctx,rgba(C.oker,0.12),lighten(C.oker,0.2),1.5);
    roundRect(ctx,ZEEF_X-40,FILT_Y-40,GLAS_X-ZEEF_X+40,80,40); shape(ctx,rgba(C.oker,0.12),lighten(C.oker,0.2),1.5);
    naamBij(ctx,'stap 1: eruit','filtertjes',ZEEF_X-70,BUIS_Y+130,o.l1===undefined?1:o.l1,'right'); });
  alpha(ctx,o.terug||0,()=>{ for(const x of [860,1020,1180,1340]) arrow(ctx,x,FILT_Y-50,x,BUIS_Y+55,C.groen,3,14); naamBij(ctx,'stap 2: terug','wat je nodig hebt',1100,FILT_Y+90,1,'center'); });
}
// deeltjes: soort per index; pad hangt af van terughalen
const FSOORT=['water','ureum','suiker','water','zout','water','ureum','water','suiker','zout','water','ureum','water','suiker','water','zout','water','water','ureum','water','suiker','water','zout','water'];
function teken(soort,x,y,a){ if(soort==='water') waterDot(x,y,1.2,a); else if(soort==='ureum') ureum(x,y,1.1,a); else if(soort==='suiker') voedsel(x,y,1,a); else zout(x,y,1,a); }
function filterDeeltjes(t,o){ // o.mode: 'eruit' | 'terug'; o.waterTerug: aandeel water terug (0..1); o.a
  const a=o.a===undefined?1:o.a; if(a<=0.01) return;
  FSOORT.forEach((s,i)=>{ const u=((t*0.085+hash(i*7.3))%1); const xr=860+((i*3)%4)*160; let terug=false;
    if(o.mode==='terug'){ if(s==='suiker') terug=true; else if(s==='zout') terug=(i%2===0); else if(s==='water') terug=hash(i*1.9)<(o.waterTerug===undefined?0.9:o.waterTerug); }
    const start=[ZEEF_X-260+hash(i)*180,BUIS_Y+(hash(i+3)-0.5)*40];
    const P=terug?[start,[ZEEF_X,BUIS_Y+10],[ZEEF_X,FILT_Y],[xr,FILT_Y],[xr,BUIS_Y+10],[xr+120,BUIS_Y]]:[start,[ZEEF_X,BUIS_Y+10],[ZEEF_X,FILT_Y],[GLAS_X,FILT_Y],[GLAS_X,FILT_Y+150]];
    const p=along(P,u); const fade=terug?1-ramp(u,0.92,0.08):1-ramp(u,0.93,0.07); teken(s,p[0]+(hash(i+9)-0.5)*14,p[1]+(hash(i+11)-0.5)*14,a*fade); });
}
function badkuip(x,y,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.beginPath(); ctx.moveTo(x-120,y-50); ctx.lineTo(x+120,y-50); ctx.quadraticCurveTo(x+115,y+30,x+60,y+40); ctx.lineTo(x-60,y+40); ctx.quadraticCurveTo(x-115,y+30,x-120,y-50); ctx.closePath(); shape(ctx,rgba(C.teal,0.25),'#AFC0D0',2); for(const dx of [-70,70]){ polyStroke([[x+dx,y+40],[x+dx,y+60]],'#AFC0D0',3); } ctx.restore(); }
function fles(x,y,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; roundRect(ctx,x-22,y-90,44,90,10); shape(ctx,rgba(C.oker,0.4),'#AFC0D0',2); roundRect(ctx,x-9,y-110,18,22,4); shape(ctx,'#AFC0D0',null); ctx.restore(); }

// ---------- nefron (uitdaging, Schema in zoomcirkel) ----------
const BUISJE=[[1150,330],[1230,360],[1260,420],[1220,470],[1150,490],[1130,540],[1180,580],[1290,580],[1360,540],[1400,600],[1420,700]];
function nefron(t,o){ ctx.fillStyle=C.bgSchema; ctx.fillRect(980,120,640,640);
  // kapsel (beker) + kluwen
  ctx.beginPath(); ctx.arc(1130,300,62,0.9,2*Math.PI+0.3); ctx.strokeStyle=lighten(C.oker,0.2); ctx.lineWidth=4; ctx.stroke();
  alpha(ctx,o.kluwen,()=>{ ctx.strokeStyle=ROOD; ctx.lineWidth=5; for(let k=0;k<6;k++){ ctx.beginPath(); ctx.ellipse(1125+Math.cos(k)*14,300+Math.sin(k*1.7)*12,22,14,k,0,6.283); ctx.stroke(); } polyStroke([[1060,180],[1110,270]],ROOD,6); polyStroke([[1140,270],[1180,180]],DONKER,6); });
  polyStroke(BUISJE,rgba(C.oker,0.7),16,o.buisje); polyStroke(BUISJE,lighten(C.oker,0.25),2,o.buisje);
  alpha(ctx,o.haar,()=>{ const P=BUISJE.map(([x,y])=>[x+20,y-18]); polyStroke(P,ROOD,3); polyStroke(BUISJE.map(([x,y])=>[x-18,y+20]),ROOD,3); });
  // deeltjes: in het buisje, sommige gaan terug naar de haarvaten
  if(o.deel>0.01) for(let i=0;i<10;i++){ const u=((t*0.12+i/10)%1); const p=along(BUISJE,u); const s=['water','suiker','ureum','zout','water'][i%5]; const back=(s!=='ureum')&&u>0.35+0.05*(i%3)&&o.terug>0.5; const dy=back?-28*ramp(u,0.35+0.05*(i%3),0.1):0; teken(s,p[0]+(back?18:0),p[1]+dy,o.deel*(back?1-ramp(u,0.5,0.15):1)); }
}

// ---------- samenwerking ----------
const SCH5=[['cellen','maken afval'],['bloed','brengt het weg'],['lever','maakt ureum'],['nieren','halen het eruit'],['blaas','bewaart urine']];
function keten5(t,lit){ SCH5.forEach(([n,m],i)=>{ const x=260+i*350, y=470, a=lit[i]; alpha(ctx,0.25+0.75*a,()=>{ roundRect(ctx,x-130,y-80,260,160,24); shape(ctx,rgba(C.fill,0.95),a>0.5?C.goud:C.line,a>0.5?2.5:1.2);
    if(i===0) animalCell(x,y-10,70,48,{t}); if(i===1){ for(let k=0;k<3;k++) rbc2(x-40+k*40,y-10,16,1,DONKER); ureum(x,y+24,1,1); } if(i===2) lever(x,y-10,1,0); if(i===3){ nier(x-28,y-10,1.2,1,0); nier(x+28,y-10,1.2,1,0); } if(i===4){ ctx.beginPath(); ctx.ellipse(x,y-10,40,28,0,0,6.283); shape(ctx,rgba(C.oker,0.5),lighten(C.oker,0.3),1.5); }
    text(ctx,n,x,y+125,fTekst(36,600),C.text,'center'); metaText(ctx,m,x,y+160,C.grain,'center',20); });
    if(i<4) arrow(ctx,x+135,y,x+215,y,C.line,3,12,0.25+0.75*lit[i+1]); }); }
function dialyse(x,y,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; roundRect(ctx,x-110,y-150,220,260,18); shape(ctx,C.fill,C.line,2); roundRect(ctx,x-80,y-120,160,70,10); shape(ctx,rgba(C.teal,0.25),C.line,1.2);
  for(let k=0;k<3;k++){ dot(ctx,x-50+k*50,y+10,10,k===1?C.groen:rgba(C.text2,0.6)); } polyStroke([[x-110,y+60],[x-220,y+90],[x-300,y+40]],ROOD,6); polyStroke([[x-110,y+80],[x-210,y+120],[x-300,y+70]],DONKER,6);
  roundRect(ctx,x-470,y+20,190,70,35); shape(ctx,'#D9A982',_donker('#D9A982',0.15),2); metaText(ctx,'arm',x-375,y+120,C.text2,'center',20); ctx.restore(); }

// ---------- voetbalveld (Macro-dag) ----------
function veld(t,avond=0){ ctx.fillStyle=hexMix('#6E8CA8','#1E2E4A',avond); ctx.fillRect(0,0,W,520); ctx.fillStyle=hexMix('#5E8C5A','#2F4A3A',avond); ctx.fillRect(0,520,W,H-520);
  for(let k=0;k<6;k++){ ctx.fillStyle=rgba('#FFFFFF',0.05); ctx.fillRect(k*340,520,170,H-520); }
  ctx.strokeStyle=rgba('#F2F2EE',0.7); ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(1500,520); ctx.lineTo(1500,330); ctx.lineTo(1840,330); ctx.lineTo(1840,520); ctx.stroke();
  alpha(ctx,1-avond,()=>{ dot(ctx,260,150,60,C.goud,lighten(C.goud,0.3),2); for(let k=0;k<8;k++){ const an=k/8*6.283+t*0.2; polyStroke([[260+Math.cos(an)*78,150+Math.sin(an)*78],[260+Math.cos(an)*100,150+Math.sin(an)*100]],C.goud,4); } });
  alpha(ctx,avond,()=>{ ctx.beginPath(); ctx.arc(1700,140,40,0,6.283); ctx.fillStyle='#E8E4D0'; ctx.fill(); ctx.beginPath(); ctx.arc(1716,128,36,0,6.283); ctx.fillStyle=hexMix('#6E8CA8','#1E2E4A',avond); ctx.fill(); }); }
function bal(x,y,r=26){ dot(ctx,x,y,r,'#F2F2EE','#9AA3B2',2); ctx.fillStyle='#2A3A58'; ctx.beginPath(); for(let k=0;k<5;k++){ const an=k/5*6.283-1.57; const px=x+Math.cos(an)*r*0.35, py=y+Math.sin(an)*r*0.35; k?ctx.lineTo(px,py):ctx.moveTo(px,py); } ctx.closePath(); ctx.fill(); }

// ================= SCÈNES =================
const SCENES={
s01(ctx,t,q){ const T=(k,n)=>exactAt(k,n); const av=ramp(t,T("'s Avonds")-0.3,1.0); veld(t,av);
  const jump=Math.abs(Math.sin(t*2.2))*20*(1-av); persoon(ctx,'daan',820,870-jump,420,{outfit:av>0.5?'school':'sport',pose:av>0.5?'vasthouden':'staan',uit:av>0.5?'blij':'neutraal',t});
  alpha(ctx,1-av,()=>bal(980,850-Math.abs(Math.sin(t*2.2+1))*120,26));
  alpha(ctx,av,()=>fles(895,700,1));
  // glazen: donkergeel → bijna kleurloos
  alpha(ctx,ramp(t,T('plas'),0.5),()=>{ roundRect(ctx,1180,560,620,220,18); shape(ctx,rgba(C.bgSchema,0.9),C.line,1); glazen(1270,720,1,t<T("'s Avonds")?4:(t>T('kleurloos.')-0.6?0:-1)); });
  alpha(ctx,ramp(t,T('Wat'),0.5),()=>text(ctx,'?',1770,520,fTitel(90),C.goud)); },
s02(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Uitscheiding',120,250,fTitel(80),C.text); text(ctx,'Waar blijft het afval van je cellen?',120,330,fTekst(44),C.text2); metaText(ctx,'onderbouw · kerndoelen · film 5',W-60,60,C.text2,'right',22);
  ctx.save(); ctx.translate(820,90); ctx.scale(0.95,0.95); bodyMap5({t,vaten:1}); const u=(t/3.6)%1; const p=along(VAN_SPIER.concat(NAAR_LEVER,LEVER_NIER,LEIDER_L,[[560,646]]),u); ureum(p[0],p[1],1.3,1); ctx.restore(); },
s03(ctx,t,q){ bg(ctx,'schema'); const T=(k,n)=>exactAt(k,n); const CX=1300,CY=430;
  bodyMap5({t,vaten:ramp(t,T('Als'),0.6),leverHl:t>T('lever')&&t<T('Ook'),nieren:0.4,leiders:0.4,blaas:0.4,plasbuis:0.4,longen:1});
  zoomCircle(ctx,CX,CY,300,492,800,'een spiercel · vergroot',ramp(t,0,0.6)*(1-ramp(t,T('Als')-0.2,0.6)),()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(CX-300,CY-300,600,600); animalCell(CX,CY,220,150,{t,mitos:1});
    voedsel(CX-60,CY+40,1.4,ramp(t,T('verbranden'),0.5)*(1-ramp(t,T('afval.'),0.6))); o2(CX+40,CY+40,1.4,ramp(t,T('zuurstof.'),0.5)*(1-ramp(t,T('afval.'),0.6)));
    for(let i=0;i<4;i++){ const k=ramp(t,T('afval.')+i*0.25,1.2); co2(CX-80+i*50+k*60,CY+20-k*120,1.2,k>0?1:0); } });
  // koolstofdioxide naar de longen
  alpha(ctx,ramp(t,T('Koolstofdioxide'),0.5)*(1-ramp(t,T('Maar'),0.5)),()=>{ for(let i=0;i<3;i++){ const k=((t-T('Koolstofdioxide'))*0.4+i/3)%1; const p=along([[540,590],[560,470],[560,300],[552,214],[420,180]],k); co2(p[0],p[1],1,1); } naamBij(ctx,'koolstofdioxide','via je longen naar buiten',700,300,1,'left'); });
  // eiwit → giftige stof → lever → ureum
  const E=ramp(t,T('Als'),0.6);
  alpha(ctx,E,()=>{ const brk=ramp(t,T('ontstaat'),0.8); for(let k=0;k<6;k++){ const x=1050+k*55+brk*(k-2.5)*30, y=400+Math.sin(k*1.3)*20+brk*(hash(k)-0.5)*80; alpha(ctx,1-brk,()=>dot(ctx,x,y,16,C.text2,lighten(C.text2,0.3))); gifStof(x,y,1.4,brk*(1-ramp(t,T('lever')+0.4,0.8))); }
    alpha(ctx,1-ramp(t,T('lever')+0.4,0.8),()=>metaText(ctx,brk<0.5?'eiwit':'giftige stof',1180,340,brk<0.5?C.grain:C.koraal,'center',24));
    const u=ramp(t,T('lever')+0.4,2.4); for(let k=0;k<3;k++){ const p=along([[1100,420],[800,520],[LEVER[0]+10,LEVER[1]]],clamp(u*1.4-k*0.15,0,1)); gifStof(p[0],p[1],1.1,u>0.02&&u<0.95?1:0); }
    arrow(ctx,440,545,410,580,C.line,2.5,10,ramp(t,T('ureum.')-0.4,0.5)); for(let k=0;k<4;k++){ const k2=ramp(t,T('ureum.')-0.4+k*0.15,0.6); ureum(300+k*34,600,1.3,k2); }
    naamBij(ctx,'lever','',LEVER[0]-75,LEVER[1]-10,ramp(t,T('lever'),0.5),'right'); naamBij(ctx,'ureum','minder giftig',160,650,ramp(t,T('ureum.'),0.5),'left'); });
  alpha(ctx,ramp(t,T('Ook'),0.5),()=>{ roundRect(ctx,1050,600,500,110,18); shape(ctx,rgba(C.bgSchema,0.92),C.line,1); for(let k=0;k<6;k++) waterDot(1090+k*36,650,1.3,1); for(let k=0;k<4;k++) zout(1330+k*30,650,1.2,1); metaText(ctx,'te veel water of zout',1300,690,C.grain,'center',20); }); },
s04(ctx,t,q){ bg(ctx,'schema'); const T=(k,n)=>exactAt(k,n);
  bodyMap5({t,huid:ramp(t,T('huid'),0.5)*(1-ramp(t,T('nieren'),0.5)),longen:1,nierHl:t>T('nieren')&&t<T('Welke')?1:0,nieren:0.5+0.5*ramp(t,T('nieren'),0.5),leiders:0.5,blaas:0.5,plasbuis:0.5});
  alpha(ctx,ramp(t,T('uitscheiding.'),0.5),()=>{ roundRect(ctx,1000,90,820,120,18); shape(ctx,rgba(C.bgSchema,0.92),C.goud,1.5); text(ctx,'uitscheiding',1030,140,fTekst(44,700),C.goud); text(ctx,'afval en wat je te veel hebt, je lichaam uit',1030,186,fTekst(30),C.text); });
  bodyLabels([['longen','koolstofdioxide',700,430,'left',T('longen')],['huid','zweet: water en zout',360,330,'right',T('huid')],['nieren','urine',700,560,'left',T('nieren')]],t,q);
  if(t>T('longen')&&t<T('huid')+1) for(let i=0;i<3;i++){ const k=((t-T('longen'))*0.5+i/3)%1; const p=along([[560,330],[552,214],[400,170]],k); co2(p[0],p[1],1,1); }
  alpha(ctx,ramp(t,T('Daarin'),0.5),()=>{ glas(1300,720,0.7,1,1,160,240); const items=[['water',T('water,')],['ureum',T('ureum,')],['zout',T('zout')],['kleurstof',T('kleurstof.')]]; items.forEach(([s,t0],k)=>{ const a=ramp(t,t0,0.4); const x=1480, y=470+k*70; if(s==='kleurstof') kleurstof(x,y,1.4,a); else teken(s,x,y,a); naamBij(ctx,s==='kleurstof'?'gele kleurstof':s,'',x+30,y+12,a,'left'); }); metaText(ctx,'urine',1300,770,C.grain,'center',22); });
  alpha(ctx,ramp(t,T('Welke'),0.5),()=>text(ctx,'?',1760,300,fTitel(90),C.goud)); },
s06(ctx,t,q){ bg(ctx,'schema'); const T=(k,n)=>exactAt(k,n); const nk=ramp(t,T('Je')-0.3,0.6);
  alpha(ctx,1-nk,()=>{ // darm: appelrest reist mee, gaat niet het bloed in
    polyStroke([[200,520],[500,460],[800,560],[1100,460],[1400,560],[1700,500]],rgba(C.okerD,0.8),60); polyStroke([[200,400],[1700,400]],ROOD,10); metaText(ctx,'bloed',220,380,C.grain,'left',22); metaText(ctx,'darm',220,600,C.grain,'left',22);
    const u=clamp(t/7.5,0,1); const p=along([[200,520],[500,460],[800,560],[1100,460],[1400,560],[1700,500]],u); ctx.beginPath(); ctx.ellipse(p[0],p[1],22,14,0.4,0,6.283); shape(ctx,'#9C6B3E',lighten('#9C6B3E',0.3),1.5);
    alpha(ctx,ramp(t,T('nooit'),0.5),()=>{ crossOut(ctx,960,430,26,1); pill(ctx,960,250,'appelresten: nooit in je bloed',C.oker,1,34); });
    alpha(ctx,ramp(t,T('Uitscheiding'),0.5),()=>pill(ctx,960,760,'uitscheiding: afval uit je cellen en je bloed',C.goud,1,34)); });
  alpha(ctx,nk,()=>{ bodyMap5({t,vaten:ramp(t,T('stroomt'),0.5),nierHl:1,leiders:0.4,blaas:0.4,plasbuis:0.4,lever:0.4});
    bodyLabels([['twee nieren','achter in je buik · zo groot als een vuist',700,560,'left',T('nieren,')]],t,q);
    if(t>T('stroomt')) for(let i=0;i<4;i++){ const k=((t-T('stroomt'))*0.5+i/4)%1; const p=along([[566,520],[590,540],[615,548]],k); rbc2(p[0],p[1],7,1,ROOD); }
    zoomCircle(ctx,1300,440,280,NIER_R[0],NIER_R[1],'nier · vergroot',ramp(t,T('Elk'),0.6),()=>{ ctx.fillStyle=C.bgSchema; ctx.fillRect(1000,140,600,600); nier(1300,440,7,1,0); polyStroke([[1200,420],[1120,400],[1040,410]],ROOD,12); polyStroke([[1200,460],[1120,480],[1040,470]],DONKER,12); polyStroke([[1250,520],[1260,640],[1270,720]],'#C9A35C',10); }); }); },
s07(ctx,t,q){ bg(ctx,'schema'); const T=(k,n)=>exactAt(k,n); const terug=ramp(t,T('Daarna'),0.6);
  filterBase(t,{zeef:ramp(t,0,0.5),zeefHl:t>T('Eerst')&&t<T('Daarna'),l1:ramp(t,T('Eerst'),0.5),terug});
  filterDeeltjes(t,{mode:terug>0.5?'terug':'eruit',a:ramp(t,T('Eerst')+0.4,0.6),waterTerug:0.9});
  alpha(ctx,ramp(t,T('Bloedcellen'),0.5)*(1-ramp(t,T('Dat'),0.5)),()=>pill(ctx,960,130,'bloedcellen blijven in het bloed: te groot',ROOD,1,32));
  alpha(ctx,ramp(t,T('honderdtachtig'),0.5)*(1-ramp(t,T('Daarna'),0.5)),()=>{ badkuip(1600,760,1); metaText(ctx,'± 180 liter per dag',1600,850,C.goud,'center',24); });
  alpha(ctx,ramp(t,T('Alle'),0.4)*(1-ramp(t,T('Wat'),0.5)),()=>pill(ctx,1100,130,t<T('Bijna')?'alle suiker terug':t<T('En')?'bijna al het water terug':'zout: zoveel als je nodig hebt',C.groen,1,32));
  alpha(ctx,ramp(t,T('overblijft,'),0.5),()=>{ glas(GLAS_X,860,0.45,0.6,1,90,140); naamBij(ctx,'urine','± 1,5 liter per dag',GLAS_X-70,800,ramp(t,T('anderhalve'),0.5),'right'); });
  alpha(ctx,ramp(t,T('Daan'),0.5),()=>{ persoon(ctx,'daan',1800,880,300,{outfit:'sport',t}); }); alpha(ctx,ramp(t,T('Wat',2),0.5),()=>text(ctx,'?',1720,560,fTitel(90),C.goud)); },
s09(ctx,t,q){ bg(ctx,'schema'); const T=(k,n)=>exactAt(k,n); const av=ramp(t,T("'s Avonds")-0.3,0.8);
  filterBase(t,{zeef:1,l1:0.5,terug:1}); filterDeeltjes(t,{mode:'terug',a:1,waterTerug:lerp(0.97,0.45,av)});
  const k=lerp(1,0.05,av), lvl=lerp(0.3,0.95,av); glas(GLAS_X,860,k,lvl,1,90,140);
  alpha(ctx,ramp(t,0.2,0.5)*(1-av),()=>pill(ctx,1100,130,'veel water terug · weinig urine',C.groen,1,32));
  alpha(ctx,ramp(t,T('Daarin'),0.5)*(1-av),()=>{ for(let i=0;i<4;i++) ureum(GLAS_X-110-i*30,820,1,1); kleurstof(GLAS_X-110,780,1.2,1); naamBij(ctx,'evenveel afval, minder water','',GLAS_X-80,740,1,'right'); });
  alpha(ctx,av,()=>{ pill(ctx,1100,130,'Daan drinkt veel: veel water eruit',C.teal,1,32); fles(1800,860,1); });
  alpha(ctx,ramp(t,T('evenwicht.'),0.5),()=>pill(ctx,960,780,'water in je bloed in evenwicht',C.goud,1,34)); },
s10(ctx,t,q){ bg(ctx,'schema'); const T=(k,n)=>exactAt(k,n); bodyMap5({t,nierHl:1,leiders:0.4,blaas:0.4,plasbuis:0.4,lever:0.3,longen:0.3,hart:0.3});
  zoomCircle(ctx,1300,440,300,NIER_R[0],NIER_R[1],'één nefron · vereenvoudigd',ramp(t,0.1,0.6),()=>nefron(t,{kluwen:ramp(t,T('kluwen'),0.6),buisje:ramp(t,T('kronkelend'),0.6),haar:ramp(t,T('Daaromheen'),0.6),deel:ramp(t,T('gefilterd.'),0.6),terug:ramp(t,T('Die'),0.5)}));
  alpha(ctx,ramp(t,T('miljoen'),0.5)*(1-ramp(t,T('Elk'),0.5)),()=>pill(ctx,1300,84,'± 1 miljoen nefronen per nier',C.goud,1,32));
  bodyLabels([['kluwen haarvaten','filtert het bloed',1040,250,'right',T('kluwen')],['kronkelend buisje','',1470,640,'left',T('kronkelend')]],t,q);
  alpha(ctx,ramp(t,T('Zit'),0.5),()=>{ glas(1760,860,0.4,0.6,1,80,120); for(let k=0;k<3;k++) voedsel(1730+k*30,820,1,1); naamBij(ctx,'suiker in urine','teken van suikerziekte',1700,700,ramp(t,T('suikerziekte.'),0.5),'right'); }); },
s11(ctx,t,q){ bg(ctx,'schema'); const T=(k,n)=>exactAt(k,n); const kk=ramp(t,T('Kijk')-0.3,0.6);
  alpha(ctx,1-kk,()=>{ const vol=0.2+0.7*ramp(t,T('blaas',2),T('seintje.')-T('blaas',2)); bodyMap5({t,lever:0.4,longen:0.4,hart:0.4,leiderHl:t>T('urineleiders.')-0.3&&t<T('Je'),blaasHl:t>T('blaas',2)&&t<T('Via'),plasHl:t>T('plasbuis'),vol});
    for(let i=0;i<4;i++){ const k=((t*0.6)+i/4)%1; const p=along(i%2?LEIDER_L:LEIDER_R,k); waterDot(p[0],p[1],0.7,ramp(t,T('urine'),0.5)); }
    if(t>T('plasbuis')) for(let i=0;i<3;i++){ const k=((t*0.8)+i/3)%1; const p=along(PLASBUIS,k); waterDot(p[0],p[1],0.7,1); }
    bodyLabels([['urineleiders','',700,600,'left',T('urineleiders.')],['blaas','rekbare zak met spieren',700,660,'left',T('blaas',2)],['plasbuis','',640,720,'left',T('plasbuis')]],t,q);
    alpha(ctx,ramp(t,T('seintje.'),0.4),()=>{ focusRing(BLAAS[0],BLAAS[1],48+6*Math.sin(t*6),1); pill(ctx,1300,400,'blaas voller: je krijgt een seintje',C.goud,1,32); }); });
  alpha(ctx,kk*(1-ramp(t,T('Stel:'),0.5)),()=>keten5(t,[ramp(t,T('cellen'),0.4),ramp(t,T('bloed'),0.4),ramp(t,T('lever'),0.4),ramp(t,T('nieren',2),0.4),ramp(t,T('blaas',3),0.4)]));
  alpha(ctx,ramp(t,T('Stel:'),0.5),()=>{ nier(840,440,4,1,0); nier(1080,440,4,1,0); crossOut(ctx,960,440,70,1); text(ctx,'nieren werken niet meer',960,640,fTekst(44,600),C.text,'center'); alpha(ctx,ramp(t,T('Wat'),0.4),()=>text(ctx,'?',1300,380,fTitel(90),C.goud)); }); },
s13(ctx,t,q){ bg(ctx,'schema'); const T=(k,n)=>exactAt(k,n); const d=ramp(t,T('machine')-0.3,0.6);
  alpha(ctx,1-d,()=>{ bodyMap5({t,nieren:0.6,leiders:0.4,blaas:0.4,plasbuis:0.4,vaten:1}); crossOut(ctx,560,548,40,1);
    roundRect(ctx,1000,280,700,260,20); shape(ctx,rgba(C.bgSchema,0.92),C.line,1); metaText(ctx,'in het bloed',1030,320,C.grain,'left',22); const n=Math.round(3+17*ramp(t,0,3)); for(let i=0;i<n;i++){ const x=1050+(i%10)*60, y=380+Math.floor(i/10)*70; if(i%3===2) waterDot(x,y,1.3,1); else ureum(x,y,1.2,1); }
    alpha(ctx,ramp(t,T('Longen'),0.5),()=>pill(ctx,1350,620,'longen en huid: te weinig',C.text2,1,32)); alpha(ctx,ramp(t,T('ernstig'),0.5),()=>pill(ctx,1350,700,'zonder hulp ernstig ziek',C.koraal,1,32)); });
  alpha(ctx,d,()=>{ dialyse(1160,470,1); naamBij(ctx,'dialyse','een paar keer per week, uren lang',1300,240,ramp(t,T('dialyse.'),0.5),'center');
    alpha(ctx,ramp(t,T('Of'),0.5),()=>{ nier(400,420,3.2,1,0); dot(ctx,470,330,26,C.groen,lighten(C.groen,0.3)); text(ctx,'+',470,342,fTekst(40,700),C.bgSchema,'center'); naamBij(ctx,'een nier van iemand anders','',400,560,1,'center'); }); }); },
s14(ctx,t,q){ bg(ctx,'schema'); const T=(k,n)=>exactAt(k,n);
  bodyMap5({t,vaten:1,leverHl:t>T('lever')&&t<T('Je',2),nierHl:t>T('nieren')&&t<T('De'),leiderHl:t>T('urineleiders')&&t<T('blaas,'),blaasHl:t>T('blaas,')&&t<T('plasbuis'),plasHl:t>T('plasbuis')&&t<T('En'),longen:1});
  if(t>T('Koolstofdioxide')&&t<T('Van')+0.5) for(let i=0;i<3;i++){ const k=((t-T('Koolstofdioxide'))*0.6+i/3)%1; const p=along([[560,330],[552,214],[400,170]],k); co2(p[0],p[1],1,1); }
  if(t>T('Je',2)&&t<T('En')){ const u=ramp(t,T('Je',2),T('buiten.')-T('Je',2)); const p=along(LEVER_NIER.concat(LEIDER_L,PLASBUIS),u); ureum(p[0],p[1],1.3,1); }
  alpha(ctx,ramp(t,T('Daan?'),0.5),()=>{ roundRect(ctx,1100,320,640,300,18); shape(ctx,rgba(C.bgSchema,0.92),C.line,1); glas(1260,520,1,0.3,1,100,150); glas(1580,520,0.05,0.95,ramp(t,T("'s Avonds:"),0.4),100,150); metaText(ctx,'na het voetballen',1260,580,C.grain,'center',20); alpha(ctx,ramp(t,T("'s Avonds:"),0.4),()=>metaText(ctx,"'s avonds",1580,580,C.grain,'center',20)); });
  alpha(ctx,ramp(t,T('schoon'),0.5),()=>pill(ctx,1420,700,'schoon en in evenwicht',C.goud,1,34)); },
s15(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Probeer het zelf',120,200,fTitel(80),C.text); metaText(ctx,'waar blijft het afval van je cellen',120,260,C.grain,'left',26);
  const P=[['Filterproef','Giet water met zand, zout en een druppel kleurstof door een koffiefilter. Wat blijft er achter, wat gaat erdoor? Waarin lijkt dit op een nier, en waarin niet?'],['Teken de route','Teken de reis van een ureumdeeltje: van een spiercel, via je bloed en je lever, naar je nieren en de wc.'],['Ademhaling','Kijk de film Ademhaling en bloedsomloop: hoe komt koolstofdioxide uit je cellen bij je longen?']];
  P.forEach((p,i)=>{ const x=120+i*575; alpha(ctx,ramp(t,0.6+i*0.6,0.6),()=>{ roundRect(ctx,x,330,535,300,14); shape(ctx,rgba(C.bgSchema,0.95),C.line,1); text(ctx,p[0],x+28,392,fTekst(38,600),C.goud); ctx.font=fTekst(30); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,p[1],x+28,445,480,40); }); });
  alpha(ctx,ramp(t,2.6,0.6),()=>{ ctx.font=fTekst(36,600); ctx.fillStyle=C.goud; ctx.textAlign='left'; wrap(ctx,'Op een hete dag zweet je veel. Wat merk je dan aan je urine, en waarom?',120,720,1680,46); });
  metaText(ctx,'biologie bij kamiel · stem: roos (elevenlabs) · versie 1.0 · oktober 2026',W/2,CAPTION_Y-10,C.text2,'center',22); },
};
