// ===== Skelet en spieren — scènes (kerndoelen onderbouw, film 6) =====
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

// ---------- botten ----------
const BOT='#E9E4D6', BOTR='#B8B2A2', KRAAK='#AFC0D0', SPIER='#E07A5F', PEES='#D9D4C7';
function botLijn(x1,y1,x2,y2,w,a=1,hl=0){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; const an=Math.atan2(y2-y1,x2-x1), L=Math.hypot(x2-x1,y2-y1); ctx.translate(x1,y1); ctx.rotate(an);
  roundRect(ctx,0,-w/2,L,w,w/2); shape(ctx,BOT,hl?C.goud:BOTR,hl?3:1.5); for(const ex of [0,L]){ ctx.beginPath(); ctx.arc(ex,-w*0.32,w*0.5,0,6.283); ctx.arc(ex,w*0.32,w*0.5,0,6.283); shape(ctx,BOT,hl?C.goud:BOTR,hl?3:1.5); } ctx.restore(); }
// skelet van voren; o: {schedel, ribben, heup (0..1 = hoeveel samengegroeid), hl:{...}}
function skelet(cx,yb,h,o={}){ const u=h/8, top=yb-h, A=k=>o[k]===undefined?1:o[k], HL=k=>o.hl&&o.hl[k]?o.hl[k]:0; ctx.save(); ctx.globalAlpha*=A('a');
  // benen en armen
  botLijn(cx-u*0.45,top+u*4.55,cx-u*0.55,top+u*6.2,u*0.28); botLijn(cx+u*0.45,top+u*4.55,cx+u*0.55,top+u*6.2,u*0.28);
  botLijn(cx-u*0.55,top+u*6.3,cx-u*0.6,top+u*7.85,u*0.24); botLijn(cx+u*0.55,top+u*6.3,cx+u*0.6,top+u*7.85,u*0.24);
  botLijn(cx-u*1.15,top+u*2.0,cx-u*1.45,top+u*3.6,u*0.24,1,HL('arm')); botLijn(cx+u*1.15,top+u*2.0,cx+u*1.45,top+u*3.6,u*0.24,1,HL('arm'));
  botLijn(cx-u*1.48,top+u*3.7,cx-u*1.6,top+u*5.0,u*0.2,1,HL('arm')); botLijn(cx+u*1.48,top+u*3.7,cx+u*1.6,top+u*5.0,u*0.2,1,HL('arm'));
  // wervelkolom
  for(let k=0;k<14;k++){ roundRect(ctx,cx-u*0.13,top+u*1.55+k*u*0.2,u*0.26,u*0.16,4); shape(ctx,BOT,BOTR,1.2); }
  // ribben
  ctx.save(); ctx.strokeStyle=HL('ribben')?C.goud:BOT; ctx.lineWidth=u*0.09; ctx.lineCap='round'; for(let k=0;k<6;k++){ const y=top+u*2.15+k*u*0.3; for(const d of [-1,1]){ ctx.beginPath(); ctx.moveTo(cx+d*u*0.15,y); ctx.quadraticCurveTo(cx+d*u*1.05,y-u*0.05,cx+d*u*0.9,y+u*0.45); ctx.stroke(); } } ctx.restore();
  // schouderblad/sleutelbeen
  botLijn(cx-u*0.2,top+u*1.85,cx-u*1.1,top+u*1.95,u*0.14); botLijn(cx+u*0.2,top+u*1.85,cx+u*1.1,top+u*1.95,u*0.14);
  // heup (bekken): twee helften, elk drie stukken die samengroeien
  heupBot(cx-u*0.45,top+u*4.4,u*0.9,-1,o.heup===undefined?1:o.heup,HL('heup')); heupBot(cx+u*0.45,top+u*4.4,u*0.9,1,o.heup===undefined?1:o.heup,HL('heup'));
  // schedel
  ctx.beginPath(); ctx.ellipse(cx,top+u*0.75,u*0.62,u*0.7,0,0,6.283); shape(ctx,BOT,HL('schedel')?C.goud:BOTR,HL('schedel')?4:1.5);
  dot(ctx,cx-u*0.22,top+u*0.75,u*0.13,rgba(C.bgSchema,0.8)); dot(ctx,cx+u*0.22,top+u*0.75,u*0.13,rgba(C.bgSchema,0.8)); roundRect(ctx,cx-u*0.3,top+u*1.15,u*0.6,u*0.3,8); shape(ctx,BOT,BOTR,1.2);
  ctx.restore(); }
function heupBot(x,y,s,side,merge=1,hl=0){ const gap=(1-merge)*s*0.18; const parts=[[0,-0.25,0.42,0.3],[0.15,0.22,0.22,0.18],[-0.18,0.24,0.2,0.18]];
  parts.forEach(([dx,dy,rx,ry],i)=>{ ctx.beginPath(); ctx.ellipse(x+side*dx*s+side*(i?gap:-gap)*(i===1?1:i===2?-0.5:0.4),y+dy*s+(i?gap:-gap),rx*s,ry*s,side*0.4,0,6.283); shape(ctx,BOT,hl?C.goud:BOTR,hl?3:1.5); });
  if(merge>0.95){ ctx.beginPath(); ctx.ellipse(x+side*0.02*s,y+0.02*s,0.46*s,0.5*s,side*0.3,0,6.283); ctx.fillStyle=rgba(BOT,1); ctx.fill(); ctx.strokeStyle=hl?C.goud:BOTR; ctx.lineWidth=hl?3:1.5; ctx.stroke(); dot(ctx,x+side*0.1*s,y+0.25*s,0.12*s,rgba(C.bgSchema,0.8)); } }

// ---------- de arm van opzij (Schema) ----------
// phi: hoek van de onderarm t.o.v. recht naar beneden (0 = gestrekt, ~2 = gebogen); o: {bic, tri (activatie 0..1), dun (spier dunner 0..1), gips, fles, labels}
const SCH=[760,170], ELL=[760,570], OARM=360;
function armGeo(phi){ const d=[Math.sin(phi),Math.cos(phi)]; const hand=[ELL[0]+d[0]*OARM,ELL[1]+d[1]*OARM]; const ins=[ELL[0]+d[0]*62+d[1]*16,ELL[1]+d[1]*62-d[0]*16]; const ole=[ELL[0]-d[0]*26-14,ELL[1]-d[1]*26+4]; return {d,hand,ins,ole}; }
function spoel(p1,p2,dik,col,a=1,hl=0){ if(a<=0.01) return; const L=Math.hypot(p2[0]-p1[0],p2[1]-p1[1]); const an=Math.atan2(p2[1]-p1[1],p2[0]-p1[0]); ctx.save(); ctx.globalAlpha*=a; ctx.translate(p1[0],p1[1]); ctx.rotate(an);
  const t0=L*0.16, t1=L*0.84; ctx.strokeStyle=PEES; ctx.lineWidth=5; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(t0,0); ctx.moveTo(t1,0); ctx.lineTo(L,0); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(t0,0); ctx.quadraticCurveTo(L/2,-dik*1.25,t1,0); ctx.quadraticCurveTo(L/2,dik*1.25,t0,0); ctx.closePath(); shape(ctx,rgba(col,0.85),hl?C.goud:lighten(col,0.3),hl?3:1.5);
  ctx.strokeStyle=rgba(lighten(col,0.4).replace('rgb(','rgba(').replace(')',',0.6)'),1); ctx.lineWidth=1; for(let k=-2;k<=2;k++){ ctx.beginPath(); ctx.moveTo(t0+12,k*dik*0.22); ctx.quadraticCurveTo(L/2,k*dik*0.4,t1-12,k*dik*0.22); ctx.stroke(); } ctx.restore(); }
function arm(phi,o={}){ const g=armGeo(phi); const A=k=>o[k]===undefined?1:o[k];
  // romp-aanzet
  ctx.save(); ctx.globalAlpha*=0.3*A('romp'); roundRect(ctx,SCH[0]-280,SCH[1]-90,230,460,60); ctx.fillStyle=C.mens; ctx.fill(); ctx.restore();
  // botten: opperarmbeen + onderarm
  botLijn(SCH[0],SCH[1],ELL[0],ELL[1],34,A('botten'),o.botHl); botLijn(ELL[0],ELL[1],g.hand[0],g.hand[1],28,A('botten'),o.botHl);
  alpha(ctx,A('hand'),()=>{ ctx.beginPath(); ctx.ellipse(g.hand[0]+g.d[0]*24,g.hand[1]+g.d[1]*24,30,22,Math.atan2(g.d[1],g.d[0]),0,6.283); shape(ctx,rgba(C.mens,0.5),C.mens,1.5); });
  if(o.fles) alpha(ctx,o.fles,()=>{ const hx=g.hand[0]+g.d[0]*30, hy=g.hand[1]+g.d[1]*30; roundRect(ctx,hx-20,hy-10,40,90,10); shape(ctx,rgba(C.teal,0.4),'#AFC0D0',2); });
  // spieren: lengte bepaalt dikte
  const bL=Math.hypot(g.ins[0]-SCH[0]-16,g.ins[1]-SCH[1]), tL=Math.hypot(g.ole[0]-SCH[0]+18,g.ole[1]-SCH[1]-30);
  const dun=1-0.45*(o.dun||0), sterk=1+0.3*(o.sterk||0);
  const bDik=clamp(11000/bL,24,64)*dun*sterk, tDik=clamp(11000/tL,24,64)*dun*sterk;
  spoel([SCH[0]+16,SCH[1]+10],g.ins,bDik,SPIER,A('spieren')*(0.55+0.45*(o.bic||0)),o.bicHl);
  spoel([SCH[0]-18,SCH[1]+30],g.ole,tDik,SPIER,A('spieren')*(0.55+0.45*(o.tri||0)),o.triHl);
  if(o.gips) alpha(ctx,o.gips,()=>{ ctx.save(); ctx.translate(ELL[0],ELL[1]); roundRect(ctx,-36,-140,72,140+OARM*0.8,30); ctx.restore(); ctx.save(); ctx.translate(ELL[0],ELL[1]); ctx.rotate(-phi); roundRect(ctx,-34,-20,68,OARM*0.85,28); ctx.fillStyle=rgba('#F2F2EE',0.85); ctx.fill(); ctx.strokeStyle='#C9CDD3'; ctx.lineWidth=2; ctx.stroke(); ctx.restore(); });
  return g; }
function spierLabels(phi,t,o){ const g=armGeo(phi); if(o.bic) naamBij(ctx,'biceps',o.bicMeta||'',(SCH[0]+g.ins[0])/2+60,(SCH[1]+g.ins[1])/2,o.bic,'left'); if(o.tri) naamBij(ctx,'triceps',o.triMeta||'',SCH[0]-80,(SCH[1]+ELL[1])/2+40,o.tri,'right'); }

// ---------- gewricht, iconen, beenmerg, spiercellen ----------
function gewricht(cx,cy,t,o){ ctx.fillStyle=C.bgSchema; ctx.fillRect(cx-320,cy-320,640,640); const rot=(o.glij||0)*Math.sin(t*1.5)*0.35;
  ctx.save(); ctx.translate(cx,cy-20); roundRect(ctx,-70,-300,140,250,30); shape(ctx,BOT,BOTR,2); ctx.beginPath(); ctx.arc(0,-50,90,0,Math.PI); shape(ctx,BOT,BOTR,2);
  alpha(ctx,o.kraak||0,()=>{ ctx.beginPath(); ctx.arc(0,-50,90,0.05,Math.PI-0.05); ctx.strokeStyle=o.kraakHl?C.goud:KRAAK; ctx.lineWidth=14; ctx.stroke(); }); ctx.restore();
  ctx.save(); ctx.translate(cx,cy+60); ctx.rotate(rot); ctx.beginPath(); ctx.moveTo(-95,30); ctx.quadraticCurveTo(0,-30,95,30); ctx.lineTo(70,260); ctx.lineTo(-70,260); ctx.closePath(); shape(ctx,BOT,BOTR,2);
  alpha(ctx,o.kraak||0,()=>{ ctx.beginPath(); ctx.moveTo(-88,26); ctx.quadraticCurveTo(0,-24,88,26); ctx.strokeStyle=o.kraakHl?C.goud:KRAAK; ctx.lineWidth=12; ctx.stroke(); }); ctx.restore();
  alpha(ctx,o.band||0,()=>{ for(const d of [-1,1]){ polyStroke([[cx+d*100,cy-120],[cx+d*108,cy+40],[cx+d*90,cy+180]],o.bandHl?C.goud:PEES,7); } }); }
function scharnierIcoon(x,y,a=1,t=0){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; roundRect(ctx,x-90,y-110,180,220,16); shape(ctx,rgba(C.fill,0.95),C.line,1.2); ctx.save(); ctx.translate(x-60,y-80); const op=0.5+0.4*Math.sin(t*2); ctx.scale(Math.cos(op),1); roundRect(ctx,0,0,120,160,6); shape(ctx,rgba(C.oker,0.5),lighten(C.oker,0.3),1.5); ctx.restore(); for(const yy of [y-60,y+50]) dot(ctx,x-60,yy,7,C.goud); text(ctx,'scharnier',x,y+150,fTekst(32,600),C.text,'center'); metaText(ctx,'één kant op',x,y+182,C.grain,'center',20); ctx.restore(); }
function kogelIcoon(x,y,a=1,t=0){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; roundRect(ctx,x-90,y-110,180,220,16); shape(ctx,rgba(C.fill,0.95),C.line,1.2); ctx.beginPath(); ctx.arc(x,y,48,0.2*Math.PI,0.8*Math.PI,true); ctx.strokeStyle=BOTR; ctx.lineWidth=16; ctx.stroke(); const an=t*1.6; dot(ctx,x,y,34,BOT,BOTR,2); botLijn(x,y,x+Math.cos(an)*90,y+Math.sin(an)*50+40,22); dot(ctx,x,y,34,BOT,BOTR,2); text(ctx,'kogel in een kom',x,y+150,fTekst(32,600),C.text,'center'); metaText(ctx,'alle kanten op',x,y+182,C.grain,'center',20); ctx.restore(); }
function beenmerg(cx,cy,t,a=1){ ctx.fillStyle=C.bgSchema; ctx.fillRect(cx-320,cy-320,640,640); roundRect(ctx,cx-280,cy-90,560,180,90); shape(ctx,BOT,BOTR,2); roundRect(ctx,cx-240,cy-55,480,110,55); shape(ctx,'#B0574A','#D88080',1.5);
  for(let i=0;i<9;i++){ const k=((t*0.25+i/9)%1); rbc2(cx-200+i*50+Math.sin(i)*8,cy-20+k*(i%2?-160:160)*0.4+(i%3)*12,12,a); } }
function spierBundel(cx,cy,t,k,a=1){ ctx.fillStyle=C.bgMicro; ctx.fillRect(cx-320,cy-320,640,640); for(let i=0;i<5;i++){ const len=420*(1-0.28*k), ry=22*(1+0.4*k); muscleCell(cx,cy-160+i*80,len,a,ry); } }

// ---------- buitenveld met basket (Macro-dag) ----------
function court(t){ ctx.fillStyle='#6E8CA8'; ctx.fillRect(0,0,W,600); ctx.fillStyle='#8FA7BD'; ctx.fillRect(0,520,W,80); ctx.fillStyle='#4E6274'; ctx.fillRect(0,600,W,H-600); ctx.strokeStyle=rgba('#F2F2EE',0.5); ctx.lineWidth=4; ctx.beginPath(); ctx.ellipse(1500,900,420,140,0,Math.PI,2*Math.PI); ctx.stroke();
  ctx.fillStyle='#3A3F4E'; ctx.fillRect(1640,300,22,620); roundRect(ctx,1480,230,220,150,8); shape(ctx,'#F2F2EE','#9AA3B2',3); roundRect(ctx,1545,290,90,60,4); ctx.strokeStyle=C.koraal; ctx.lineWidth=3; ctx.stroke();
  ctx.strokeStyle=C.koraal; ctx.lineWidth=6; ctx.beginPath(); ctx.ellipse(1520,380,48,10,0,0,6.283); ctx.stroke(); for(let k=0;k<5;k++){ polyStroke([[1476+k*22,384],[1490+k*16,440]],rgba('#F2F2EE',0.6),2); } }
function basketbal(x,y,r=30){ dot(ctx,x,y,r,'#D8743A','#A5552A',2); ctx.strokeStyle='#5A2E14'; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(x-r,y); ctx.lineTo(x+r,y); ctx.moveTo(x,y-r); ctx.lineTo(x,y+r); ctx.stroke(); ctx.beginPath(); ctx.arc(x-r*1.3,y,r,-0.7,0.7); ctx.stroke(); ctx.beginPath(); ctx.arc(x+r*1.3,y,r,Math.PI-0.7,Math.PI+0.7); ctx.stroke(); }
function samSprong(t,t0,x=900){ const k=clamp((t-t0)/1.6,0,1); const lift=Math.sin(k*Math.PI)*120; persoon(ctx,'sam',x,900-lift,460,{outfit:'sport',pose:k>0.15&&k<0.8?'wijsOmhoog':'staan',uit:'lacht',t});
  const bk=clamp((t-t0-0.5)/1.4,0,1); const bx=lerp(x+60,1520,bk), by=lerp(900-lift-470,380,bk)-Math.sin(bk*Math.PI)*260; if(bk<1) basketbal(bx,by,30); else basketbal(1520,380+clamp((t-t0-1.9)*500,0,420),30); return lift; }

// ================= SCÈNES =================
const SCENES={
s01(ctx,t,q){ const T=(k,n)=>exactAt(k,n); court(t); samSprong(t,0.2);
  zoomCircle(ctx,420,330,230,900,640,'botten en spieren',ramp(t,T('Maar'),0.7),()=>{ ctx.fillStyle=C.bgSchema; ctx.fillRect(190,100,460,460); ctx.save(); ctx.translate(420-800*0.5,330-560*0.5); ctx.scale(0.5,0.5); arm(1.6+0.5*Math.sin(t*2),{romp:0,bic:1}); ctx.restore(); });
  alpha(ctx,ramp(t,T('Hoe'),0.5),()=>text(ctx,'?',700,180,fTitel(90),C.goud)); },
s02(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Skelet en spieren',120,250,fTitel(80),C.text); text(ctx,'Hoe beweeg je eigenlijk?',120,330,fTekst(44),C.text2); metaText(ctx,'onderbouw · kerndoelen · film 6',W-60,60,C.text2,'right',22);
  ctx.save(); ctx.translate(600,60); ctx.scale(0.9,0.9); const ph=1.0+0.9*Math.sin(t*1.6); arm(ph,{bic:ph>1?1:0,tri:ph>1?0:1}); ctx.restore(); },
s03(ctx,t,q){ bg(ctx,'schema'); const T=(k,n)=>exactAt(k,n); const sk=ramp(t,T('skelet',2)-0.2,0.8); const cx=560;
  // pudding: silhouet zakt in elkaar zonder skelet
  const sag=1-sk; ctx.save(); ctx.translate(cx,870); ctx.scale(1+0.35*sag,1-0.45*sag+0.03*Math.sin(t*6)*sag); ctx.globalAlpha*=0.3; human(ctx,0,0,760,1,C.mens); ctx.restore();
  skelet(cx,870,760,{a:sk,hl:{schedel:t>T('schedel')&&t<T('Je',3)?1:0,ribben:t>T('ribben')&&t<T('En')?1:0}});
  alpha(ctx,ramp(t,T('tweehonderd'),0.5)*(1-ramp(t,T('Ze',2),0.5)),()=>pill(ctx,1300,300,'± 200 botten',C.goud,1,40));
  alpha(ctx,ramp(t,T('stevigheid.'),0.5)*(1-ramp(t,T('Ze',2),0.5)),()=>pill(ctx,1300,400,'vorm en stevigheid',C.text2,1,34));
  alpha(ctx,ramp(t,T('schedel'),0.5)*(1-ramp(t,T('En'),0.5)),()=>{ ctx.beginPath(); ctx.ellipse(cx,205,40,30,0,0,6.283); shape(ctx,rgba(C.paars,0.6),lighten(C.paars,0.3),1.5); naamBij(ctx,'schedel','beschermt je hersenen',cx+80,190,1,'left'); });
  alpha(ctx,ramp(t,T('ribben'),0.5)*(1-ramp(t,T('En'),0.5)),()=>{ heart(cx+20,420,0.7,1,t*7); naamBij(ctx,'ribben','beschermen hart en longen',cx+130,400,1,'left'); });
  const bm=ramp(t,T('beenmerg.')-0.3,0.6)*(1-ramp(t,T('Een'),0.5));
  zoomCircle(ctx,1300,430,280,cx-50,700,'beenmerg in een bot · vergroot',bm,()=>beenmerg(1300,430,t,ramp(t,T('Daar'),0.5)));
  alpha(ctx,ramp(t,T('baby'),0.5),()=>{ pill(ctx,1200,320,'baby: ± 300 botten',C.text,1,36); pill(ctx,1200,420,'jij: ± 200 botten',C.text,1,36); });
  alpha(ctx,ramp(t,T('Hoe'),0.5),()=>text(ctx,'?',1520,300,fTitel(90),C.goud)); },
s05(ctx,t,q){ bg(ctx,'schema'); const T=(k,n)=>exactAt(k,n); const g=ramp(t,T('Waar')-0.3,0.6);
  alpha(ctx,1-g,()=>{ skelet(560,870,760,{heup:ramp(t,T('heup')+0.6,2.4),hl:{heup:1}}); zoomCircle(ctx,1300,430,280,560-43,620,'heup · vergroot',ramp(t,T('heup'),0.6),()=>{ ctx.fillStyle=C.bgSchema; ctx.fillRect(1000,130,600,600); heupBot(1300,430,260,1,ramp(t,T('heup')+0.6,2.4),0); });
    naamBij(ctx,'heupbot','drie botten → één',1600,720,ramp(t,T('heupbot.'),0.5),'left'); alpha(ctx,ramp(t,T('Bot'),0.5),()=>pill(ctx,1300,84,'bot leeft en groeit',C.groen,1,34)); });
  alpha(ctx,g*(1-ramp(t,T('Je')-0.3,0.6)),()=>{ skelet(560,870,760,{hl:{arm:1}});
    zoomCircle(ctx,1300,430,300,698,452,'gewricht · vergroot',1,()=>gewricht(1300,430,t,{kraak:ramp(t,T('kraakbeen.'),0.5),kraakHl:t>T('kraakbeen.')&&t<T('Stevige'),glij:ramp(t,T('glad,'),0.6),band:ramp(t,T('Stevige'),0.5),bandHl:t>T('Stevige')}));
    naamBij(ctx,'kraakbeen','glad',1640,330,ramp(t,T('kraakbeen.'),0.5),'left'); naamBij(ctx,'banden','houden de botten bij elkaar',1630,560,ramp(t,T('banden'),0.5),'left'); });
  alpha(ctx,ramp(t,T('Je')-0.3,0.6),()=>{ scharnierIcoon(700,430,1,t); kogelIcoon(1220,430,ramp(t,T('schouder'),0.5),t); metaText(ctx,'elleboog · knie',700,640,C.text2,'center',22); alpha(ctx,ramp(t,T('schouder'),0.5),()=>metaText(ctx,'schouder · heup',1220,640,C.text2,'center',22)); }); },
s06(ctx,t,q){ bg(ctx,'schema'); const T=(k,n)=>exactAt(k,n); const phi=lerp(0.25,2.1,ramp(t,T('trekt')-0.2,2.4));
  arm(phi,{spieren:ramp(t,T('spieren.'),0.6),bic:ramp(t,T('signaal,'),0.6),bicHl:t>T('pees')&&t<T('Een',3)});
  const g=armGeo(phi); alpha(ctx,ramp(t,T('pees'),0.5)*(1-ramp(t,T('Een',3),0.5)),()=>{ focusRing(g.ins[0],g.ins[1],26,1); naamBij(ctx,'pees','stevig, als een touw',g.ins[0]+40,g.ins[1]+40,1,'left'); });
  const zc=ramp(t,T('Een',3),0.6)*(1-ramp(t,T('De')-0.2,0.6)); zoomCircle(ctx,1380,380,260,(SCH[0]+g.ins[0])/2+20,(SCH[1]+g.ins[1])/2,'spiercellen · vergroot',zc,()=>spierBundel(1380,380,t,ramp(t,T('korter.'),1.0)));
  alpha(ctx,ramp(t,T('kort'),0.5)*(1-ramp(t,T('biceps,'),0.5)),()=>pill(ctx,1300,84,'kort en dik → trekt aan de pees',C.koraal,1,32));
  alpha(ctx,ramp(t,T('draait'),0.5)*(1-ramp(t,T('biceps,'),0.5)),()=>{ ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(ELL[0],ELL[1],70,0.4,1.5); ctx.stroke(); });
  spierLabels(phi,t,{bic:ramp(t,T('biceps,'),0.5),bicMeta:'buigt je arm'});
  alpha(ctx,ramp(t,T('strek'),0.5),()=>text(ctx,'?',1500,300,fTitel(90),C.goud)); },
s08(ctx,t,q){ bg(ctx,'schema'); const T=(k,n)=>exactAt(k,n);
  let phi; if(t<T('Daarom')) phi=lerp(2.1,0.25,ramp(t,0.3,2.2)); else { const c=Math.sin((t-T('Daarom'))*1.3); phi=1.2-0.95*c; }
  const buig=t>T('Daarom')?(Math.cos((t-T('Daarom'))*1.3)>0?0:1):0; const triAct=t<T('Daarom')?1:(Math.cos((t-T('Daarom'))*1.3)<0?1:0);
  arm(phi,{bic:1-triAct,tri:triAct,triHl:t<T('Een')});
  spierLabels(phi,t,{bic:ramp(t,T('Daarom'),0.5),tri:ramp(t,T('triceps.'),0.5),triMeta:'strekt je arm',bicMeta:'buigt'});
  alpha(ctx,ramp(t,T('alleen'),0.5)*(1-ramp(t,T('Daarom'),0.5)),()=>{ pill(ctx,1350,300,'trekken: ja',C.groen,1,36); pill(ctx,1350,400,'duwen: nee',C.koraal,1,36); });
  alpha(ctx,ramp(t,T('tegenwerkers.'),0.5),()=>pill(ctx,1350,300,'tegenwerkers: de een buigt, de ander strekt',C.goud,1,34)); },
s09(ctx,t,q){ bg(ctx,'schema'); const T=(k,n)=>exactAt(k,n); const kracht=ramp(t,T('Houd'),0.6); const wig=kracht>0?1.57:1.57-0.6*Math.max(0,Math.sin((t-T('Wordt'))*1.4))*ramp(t,T('Wordt'),0.4)*(1-ramp(t,T('Maar'),0.4));
  const g=arm(wig,{bic:1,fles:kracht});
  alpha(ctx,ramp(t,T('centimeter'),0.5),()=>{ polyStroke([[ELL[0],ELL[1]+40],[g.ins[0],ELL[1]+40]],C.goud,2); metaText(ctx,'± 4 cm',(ELL[0]+g.ins[0])/2,ELL[1]+80,C.goud,'center',22); });
  alpha(ctx,ramp(t,T('heel'),0.5)*(1-kracht),()=>{ ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.setLineDash([8,8]); ctx.beginPath(); ctx.arc(ELL[0],ELL[1],OARM+30,-1.4+Math.PI/2-1.57+0.0,-0.2,false); ctx.stroke(); ctx.setLineDash([]); metaText(ctx,'grote beweging van je hand',ELL[0]+260,ELL[1]-260,C.goud,'left',22); });
  alpha(ctx,kracht,()=>{ arrow(ctx,g.hand[0]+30,g.hand[1]+40,g.hand[0]+30,g.hand[1]+140,C.teal,5,16); metaText(ctx,'1 kg',g.hand[0]+60,g.hand[1]+120,C.teal,'left',24); arrow(ctx,g.ins[0],g.ins[1],SCH[0]+30,SCH[1]+120,C.koraal,10,22,ramp(t,T('zeven'),0.5)); metaText(ctx,'± 7 kg',SCH[0]+90,SCH[1]+190,C.koraal,'left',26); });
  alpha(ctx,ramp(t,0.1,0.5),()=>pill(ctx,1350,120,'hefboom · vereenvoudigd',C.text2,1,30)); },
s10(ctx,t,q){ bg(ctx,'schema'); const T=(k,n)=>exactAt(k,n); const gip=ramp(t,T('Sam')-0.3,0.6);
  alpha(ctx,1-gip,()=>{ const ph=1.2+0.4*Math.sin(t*1.2); arm(ph,{bic:1,romp:0.6});
    // hersenen + ruggenmerg + zenuw
    ctx.beginPath(); ctx.ellipse(380,160,110,70,0,0,6.283); shape(ctx,rgba(C.paars,0.6),lighten(C.paars,0.3),2); naamBij(ctx,'hersenen','',380,260,ramp(t,T('hersenen.'),0.5),'center');
    const NZ=[[420,220],[460,300],[500,320],[620,330],[700,360],[(SCH[0]+armGeo(ph).ins[0])/2+20,(SCH[1]+armGeo(ph).ins[1])/2]]; polyStroke(NZ,C.paars,4,ramp(t,T('ruggenmerg'),0.5)); naamBij(ctx,'zenuw','',560,300,ramp(t,T('zenuwen'),0.5),'center');
    if(t>T('Via')&&t<T('Zonder')+1){ const k=((t-T('Via'))*0.8)%1; const p=along(NZ,k); focusRing(p[0],p[1],12,1); dot(ctx,p[0],p[1],7,C.goud); }
    alpha(ctx,ramp(t,T('Zonder'),0.5)*(1-ramp(t,T('En'),0.5)),()=>pill(ctx,1350,300,'geen signaal → spier doet niets',C.paars,1,32));
    alpha(ctx,ramp(t,T('energie'),0.5),()=>{ polyStroke([[1200,700],[1000,560],(()=>{ const g=armGeo(ph); return [(SCH[0]+g.ins[0])/2+40,(SCH[1]+g.ins[1])/2+20]; })()],ROOD,6); for(let i=0;i<3;i++){ const k=((t*0.5)+i/3)%1; const p=along([[1200,700],[1000,560],[900,440]],k); o2(p[0],p[1],1,1); } heartAt(1260,740,1.2,1,beatOf(t,70+60*ramp(t,T('sneller'),1))); naamBij(ctx,'bloed met zuurstof','energie uit verbranding',1320,640,1,'left'); }); });
  alpha(ctx,gip,()=>{ const dun=ramp(t,T('Daarna'),1.2); arm(1.5,{bic:0.5,gips:1-ramp(t,T('Daarna')-0.3,0.6),dun}); persoon(ctx,'sam',1500,900,420,{outfit:'school',pose:'staan',uit:dun>0.5?'verbaasd':'neutraal',t}); counterPill(1180,120,'in het gips','6 weken',ramp(t,T('weken'),0.5));
    alpha(ctx,ramp(t,T('Daarna'),0.5),()=>pill(ctx,1300,300,'dunner en zwakker',C.koraal,1,34)); alpha(ctx,ramp(t,T('Hoe'),0.5),()=>text(ctx,'?',1700,300,fTitel(90),C.goud)); }); },
s12(ctx,t,q){ const T=(k,n)=>exactAt(k,n); const sp=ramp(t,T('Terug')-0.3,0.6);
  if(sp<0.99){ bg(ctx,'schema'); alpha(ctx,1-sp,()=>{ const dun=1-ramp(t,T('Gebruik'),1.0); const st=ramp(t,T('Train'),1.0); arm(1.5,{bic:1,dun,sterk:st}); alpha(ctx,st,()=>{ const g=armGeo(1.5); roundRect(ctx,g.hand[0]+10,g.hand[1]-70,22,140,6); shape(ctx,'#5A6478','#8FA0B5',2); });
    pill(ctx,1350,240,t<T('Gebruik')?'niet gebruikt: kleiner':t<T('Train')?'weer gebruikt: groeit terug':'getraind: sterker',t<T('Gebruik')?C.koraal:C.groen,1,34);
    alpha(ctx,ramp(t,T('Ook'),0.5),()=>{ pill(ctx,1350,360,'botten: sterker door rennen en springen',C.groen,1,32); }); }); }
  if(sp>0.01){ ctx.save(); ctx.globalAlpha*=sp; court(t); const lift=samSprong(t,T('springt.')-0.9,900); const hy=900-lift-460;
    focusRing(900,hy+70,70,ramp(t,T('hersenen'),0.4)*(1-ramp(t,T('Zijn'),0.4))); alpha(ctx,ramp(t,T('hersenen'),0.4)*(1-ramp(t,T('Zijn'),0.4)),()=>pill(ctx,900,hy-40,'signaal',C.paars,1,30));
    alpha(ctx,ramp(t,T('beenspieren'),0.4)*(1-ramp(t,T('triceps'),0.4)),()=>pill(ctx,1150,820-lift,'beenspieren trekken',C.koraal,1,30));
    alpha(ctx,ramp(t,T('triceps'),0.4)*(1-ramp(t,T('bloed'),0.4)),()=>pill(ctx,1150,hy+180,'triceps strekt de arm',C.koraal,1,30));
    alpha(ctx,ramp(t,T('bloed'),0.4),()=>pill(ctx,1150,hy+260,'bloed brengt zuurstof',C.teal,1,30));
    alpha(ctx,ramp(t,T('Skelet,'),0.5),()=>{ roundRect(ctx,120,120,700,110,18); shape(ctx,rgba(C.bgSchema,0.9),C.goud,1.5); text(ctx,'skelet · spieren · zenuwen · bloed',470,190,fTekst(36,600),C.text,'center'); }); ctx.restore(); } },
s13(ctx,t,q){ bg(ctx,'schema'); const T=(k,n)=>exactAt(k,n); ctx.save(); ctx.translate(-120,40); ctx.scale(0.85,0.85); skelet(560,980,760,{hl:{schedel:t<T('Waar')?1:0}}); ctx.restore();
  ctx.save(); ctx.translate(420,40); ctx.scale(0.85,0.85); const ph=t<T('Daarom')?1.2:1.2+0.9*Math.sin((t-T('Daarom'))*1.5); arm(ph,{bic:ph>1.2?1:0.2,tri:ph>1.2?0.2:1,romp:0.5,bicHl:t>T('pezen')&&t<T('Een')}); ctx.restore();
  alpha(ctx,ramp(t,T('gewricht.'),0.5),()=>pill(ctx,1560,240,'gewricht',C.text,1,32)); alpha(ctx,ramp(t,T('pezen'),0.5),()=>pill(ctx,1560,320,'pezen',C.text,1,32)); alpha(ctx,ramp(t,T('alleen'),0.5),()=>pill(ctx,1560,400,'alleen trekken',C.koraal,1,32)); alpha(ctx,ramp(t,T('tegenwerkers:'),0.5),()=>pill(ctx,1560,480,'tegenwerkers',C.goud,1,32));
  alpha(ctx,ramp(t,T('Zo'),0.5),()=>{ roundRect(ctx,1220,580,660,170,18); shape(ctx,rgba(C.bgSchema,0.95),C.goud,1.5); ctx.font=fTekst(32,600); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,'signaal uit je hersenen → spier trekt → bot draait in het gewricht',1250,640,600,42); }); },
s14(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Onthoud',120,200,fTitel(80),C.text);
  const K=['Je skelet geeft stevigheid en bescherming.','Een spier kan alleen trekken.','Daarom werken spieren in paren: de een buigt, de ander strekt.'];
  K.forEach((s,i)=>alpha(ctx,ramp(t,0.4+i*0.8,0.6),()=>{ const y=300+i*170; roundRect(ctx,120,y,1680,140,14); shape(ctx,rgba(C.bgSchema,0.95),i===0?C.goud:C.line,i===0?1.5:1); text(ctx,String(i+1),185,y+90,fTitel(60),C.goud,'center'); ctx.font=fTekst(38); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,s,260,y+84,1500,46); }));
  metaText(ctx,'biologie bij kamiel · stem: roos (elevenlabs) · versie 1.1 · oktober 2026',W/2,CAPTION_Y-10,C.text2,'center',22); },
};
