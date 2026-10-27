# ---- scene-edits (rep(old,new) op het gepubliceerde sceneblok) ----
rep("const PERSON_LOOK={skin:SKINS[0],hair:'#6B4A2B',shirt:'#C8663F',trousers:'#2E4A6A',hairStyle:'short'};",
"const PERSON_LOOK={skin:SKINS[0],hair:'#6B4A2B',shirt:'#C8663F',trousers:'#2E4A6A',hairStyle:'short'}; // niet meer gebruikt (1.2: castpersonages)\n"
"// 1.2 (27 okt 2026): mensen = castpersonages (ROLLEN.md: jij = Noor; patient in het examenvoorbeeld = Erik, figurant).\n"
"// Noor in zomeroutfit; zon 0..1 = zonnebrand: de huid kleurt tijdelijk rood (zoals o.geel bij de baby in het castboek).\n"
"CAST.noor_zon=Object.assign({},CAST.noor,CAST.noor.garderobe.zomer,{garderobe:null});\n"
"function noorZon(ctx,x,y,h,zon=0,o={}){ CAST.noor_zon.huid=_mixHex(CAST.noor.huid,'#D8604A',clamp(zon,0,1)*0.8); return persoon(ctx,'noor_zon',x,y,h,o)||{}; }\n"
"// eiwit als gevouwen keten (kralen langs een kluwenpad, geen bol); mark = index van de afwijkende kraal\n"
"function eiwitKeten(ctx,cx,cy,s,n,mark=-1,markCol=C.koraal,alpha=1){ if(alpha<=0.01) return []; const G=[[-1,-0.55],[-0.45,-0.95],[0.15,-0.8],[0.05,-0.35],[-0.55,-0.2],[-0.95,0.3],[-0.5,0.7],[0.1,0.35],[0.55,0.75],[1,0.3],[0.65,-0.2],[1,-0.7]];\n"
"  const seg=[]; let tot=0; for(let i=1;i<G.length;i++){ const l=Math.hypot(G[i][0]-G[i-1][0],G[i][1]-G[i-1][1]); seg.push(l); tot+=l; }\n"
"  const pts=[]; for(let k=0;k<n;k++){ let d=k/(n-1)*tot, i=0; while(i<seg.length-1&&d>seg[i]){ d-=seg[i]; i++; } const f=Math.min(1,d/seg[i]); pts.push([cx+lerp(G[i][0],G[i+1][0],f)*130*s, cy+lerp(G[i][1],G[i+1][1],f)*115*s]); }\n"
"  ctx.save(); ctx.globalAlpha*=alpha; ctx.strokeStyle=lighten(C.oker,0.25); ctx.lineWidth=4*s; ctx.lineJoin='round'; ctx.beginPath(); pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y)); ctx.stroke();\n"
"  pts.forEach(([x,y],i)=>{ if(i===mark) circ(ctx,x,y,24*s,markCol,lighten(markCol,0.3),2); else aa(ctx,x,y,19*s,i,'',1); }); ctx.restore(); return pts; }")
# opening: Noor met zonnebrand
rep("  personReal(ctx,520,880,600,1,{skin,hairStyle:'short',armR:{a1:0.5,a2:-0.6},armL:{a1:0.3,a2:0.2}});",
    "  const NR=noorZon(ctx,520,880,600,red,{t}); void skin;")
rep("SCENES.open=(ctx,li,lf,t)=>{ beachBg(ctx); sun(ctx,1620,170,90,1,t);","SCENES.open=(ctx,li,lf,t)=>{ beachBg(ctx); sun(ctx,1680,150,80,1,t);")
rep("  if(li>=2){ const p=P(li,2,lf); circ(ctx,585,635,7,C.koraal); naamBij(ctx,'een plekje','dat niet geneest',680,650,p,'left',C.koraal); }",
    "  if(li>=2){ const p=P(li,2,lf); const hd=[NR.handL,NR.handR].filter(Boolean).sort((a,b)=>b.x-a.x)[0]||{x:600,y:690}; const sx=hd.x-3, sy=hd.y-62; circ(ctx,sx,sy,6,'#8A4A3A'); circ(ctx,sx+2,sy-1,3.5,'#B0604A'); naamBij(ctx,'een plekje','dat niet geneest',sx+70,sy+12,p,'left',C.koraal); }")
rep("  if(li>=3){ const p=P(li,3,lf); panel(ctx,1040,240,760,220,p); T(ctx,'bijna 75 000',1080,330,72,{titel:true,color:C.goud,alpha:p}); T(ctx,'nieuwe huidkankerpatiënten per jaar in Nederland',1080,400,34,{alpha:p}); M(ctx,'iknl · meestal speelt zonlicht mee',1080,440,{alpha:p}); }",
    "  if(li>=3){ const p=P(li,3,lf); panel(ctx,1000,300,860,210,p); T(ctx,'bijna 75 000',1040,385,72,{titel:true,color:C.goud,alpha:p}); T(ctx,'nieuwe huidkankerpatiënten per jaar in Nederland',1040,450,34,{alpha:p}); M(ctx,'iknl · meestal speelt zonlicht mee',1040,490,{alpha:p}); }")
rep("  if(li>=4){ const p=ease(lf*2); T(ctx,'Hoe verandert licht je DNA?',1040,620,46,{titel:true,alpha:p}); T(ctx,'En waarom erven je kinderen dat niet?',1040,680,46,{titel:true,alpha:p}); }",
    "  if(li>=4){ const p=ease(lf*2); panel(ctx,1000,545,860,165,p); T(ctx,'Hoe verandert licht je DNA?',1040,612,42,{titel:true,alpha:p}); T(ctx,'En waarom erven je kinderen dat niet?',1040,672,42,{titel:true,alpha:p}); }")
# schaal: eenheden voluit
rep("'1 nm · vereenvoudigd'","'1 nanometer · vereenvoudigd'",4)
# vwo-titels: inhoud in plaats van 'Voor vwo' (de paarse vwo-balk markeert het niveau al)
rep("T(ctx,'Voor vwo: een stap verder',120,170,48,{w:700,alpha:li===0?ease(lf*2):0.5});\n  if(li<=1){ const m='AUGGUGGCUUCA'",
    "T(ctx,'Leesraam, promotor en intron',120,170,48,{w:700});\n  if(li<=1){ const m='AUGGUGGCUUCA'")
rep("T(ctx,'Voor vwo: chromosoommutatie',120,170,48,{w:700});","T(ctx,'Chromosoommutatie',120,170,48,{w:700});")
rep("SCENES.h4v=(ctx,li,lf,t)=>{ bg(ctx,'schema'); T(ctx,'Voor vwo: een stap verder',120,170,48,{w:700,alpha:li===0?ease(lf*2):0.5});",
    "SCENES.h4v=(ctx,li,lf,t)=>{ bg(ctx,'schema'); T(ctx,'Gaspedaal en rem: twee soorten genen',120,170,48,{w:700});")
rep("T(ctx,'Voor vwo, tot slot',120,170,48,{w:700});","T(ctx,'Mutaties en evolutie',120,170,48,{w:700});")
# h4v: beeld staat er vanaf t = 0 (regel 0 is weggeknipt); 'gemuteerd' i.p.v. 'kapot' bij het proto-oncogen
rep("pedal(ctx,560,470,'gas',P(li,1,lf),li>=1); T(ctx,'proto-oncogen',560,640,36,{w:700,align:'center',color:C.groen,alpha:P(li,1,lf)}); M(ctx,'één kapot allel is genoeg',560,690,{align:'center',color:C.text2,alpha:P(li,1,lf)});",
    "pedal(ctx,560,470,'gas',0.35+0.65*P(li,1,lf),li>=1); T(ctx,'proto-oncogen',560,640,36,{w:700,align:'center',color:C.groen,alpha:P(li,1,lf)}); M(ctx,'één gemuteerd allel is genoeg',560,690,{align:'center',color:C.text2,alpha:P(li,1,lf)});")
rep("pedal(ctx,1360,470,'rem',P(li,2,lf),li>=2);","pedal(ctx,1360,470,'rem',0.35+0.65*P(li,2,lf),li>=2);")
# h3a + h3c: eiwit als gevouwen keten
rep("  const bx=1250, by=460; for(let k=0;k<7;k++){ if(k) ln(ctx,bx-240+(k-1)*80,by,bx-240+k*80,by,C.oker,4); aaBead(ctx,bx-240+k*80,by,'',k,1); }\n  M(ctx,'eiwit voor koperuitscheiding',bx,by+90,{align:'center',color:C.text2});\n  if(li>=1){ const p=ease(lf*2); aaBead(ctx,bx,by,'Gln',1,1,C.koraal); label(ctx,'glutamine','waar histidine hoort',bx,by-40,bx+80,250,p,C.koraal,'left'); }",
    "  const bx=1250, by=440; const kp=eiwitKeten(ctx,bx,by,1.15,22,li>=1?17:-1,C.koraal,1);\n  M(ctx,'eiwit voor koperuitscheiding · gevouwen keten',bx,by+230,{align:'center',color:C.text2});\n  if(li>=1){ const p=ease(lf*2); const q=kp[17]; naamBij(ctx,'glutamine','waar histidine hoort',q[0]+44,q[1]+12,p,'left',C.koraal); }")
rep("    if(i===0){ for(let k=0;k<5;k++){ if(k) ln(ctx,x-120+(k-1)*60,400,x-120+k*60,400,C.oker,4); aaBead(ctx,x-120+k*60,400,'',k,1,k===2?C.koraal:null); } }",
    "    if(i===0) eiwitKeten(ctx,x,400,0.55,16,12,C.koraal,1);")
rep("    if(i===3) personReal(ctx,x,560,300,1,{skin:SKINS[2],hairStyle:'curly'});","    if(i===3) persoon(ctx,'erik',x,560,300,{uit:'moe'});")
# h4b + recap: Noor op het strand; geen korrel in de zoomcirkel
rep("SCENES.h4b=(ctx,li,lf,t)=>{ beachBg(ctx); sun(ctx,1620,170,90,1,t); personReal(ctx,420,880,600,1,{hairStyle:'short',armR:{a1:0.5,a2:-0.6}});",
    "SCENES.h4b=(ctx,li,lf,t)=>{ beachBg(ctx); sun(ctx,1620,170,90,1,t); noorZon(ctx,420,880,600,0.45,{t});")
rep("ctx.fillStyle=C.bgMicro; ctx.fillRect(950,180,600,600); grain(ctx);","ctx.fillStyle=C.bgMicro; ctx.fillRect(950,180,600,600);")
rep("SCENES.recap=(ctx,li,lf,t)=>{ beachBg(ctx); sun(ctx,760,150,80,1,t); personReal(ctx,420,880,600,1,{hairStyle:'short',armR:{a1:0.5,a2:-0.6}});",
    "SCENES.recap=(ctx,li,lf,t)=>{ beachBg(ctx); sun(ctx,760,150,80,1,t); noorZon(ctx,420,880,600,0,{t});")

rep("T(ctx,msgs[0],1540,300,48,{w:700,alpha:p}); T(ctx,msgs[1],1540,360,36,{alpha:p}); T(ctx,msgs[2],1540,440,44,{w:700,color:msgs[3],alpha:p});",
    "T(ctx,msgs[0],1480,300,48,{w:700,alpha:p}); T(ctx,msgs[1],1480,360,36,{alpha:p}); T(ctx,msgs[2],1480,440,44,{w:700,color:msgs[3],alpha:p});")
rep("ctx.fillStyle=rgba(C.bgSchema,0.92); ctx.fillRect(0,y0+120,W,620);","ctx.fillStyle=C.bgSchema; ctx.fillRect(0,y0+120,W,620);")
rep("M(ctx,'twee chromosomen in één cel',1150,440,{align:'center',color:C.koraal,alpha:p}); M(ctx,'geen',1150,570,{align:'center',color:C.text2,alpha:p}); label(ctx,'blijven bij elkaar','',1150,220,1400,180,p,C.koraal,'left'); return; }",
    "naamBij(ctx,'blijven bij elkaar','twee chromosomen in één cel',1290,300,p,'left',C.koraal); M(ctx,'geen chromosoom van dit paar',1290,570,{color:C.text2,alpha:p}); return; }")
rep("for(let k=0;k<3;k++) chromo(ctx,760+k*200,450,170,clamp(p*3-k,0,1),C.paars,k===0?'21':'');",
    "for(let k=0;k<3;k++) chromo(ctx,760+k*200,450,170,k<2?1:p,k<2?C.paars:C.koraal,k===0?'21':'');")
rep("sun(ctx,1500,230,50,1,t); hen(ctx,1560,470,1.1,1); for(let k=0;k<5;k++) circ(ctx,1500+k*26,430,5,C.koraal); egg(ctx,1700,560,1,1,false); naamBij(ctx,'huidcellen','niet de eicel',1665,440,p,'left',C.text);",
    "sun(ctx,1330,250,50,1,t); hen(ctx,1560,470,1.1,1); for(let k=0;k<5;k++) circ(ctx,1500+k*26,430,5,C.koraal); egg(ctx,1700,560,1,1,false); naamBij(ctx,'huidcellen','niet de eicel',1600,330,p,'center',C.text);")
rep("M(ctx,'erfelijk: het eerste kapotte allel in elke cel',960,720,{align:'center',color:C.text2}); label(ctx,'tweede allel valt uit','in één cel',360+3*130-10,330+2*100+8,1200,780,p,C.koraal,'left');",
    "M(ctx,'erfelijk: het eerste kapotte allel in elke cel',960,700,{align:'center',color:C.text2}); ctx.save(); ctx.globalAlpha*=p; circ(ctx,360+3*130,330+2*100,50,null,C.koraal,4); ctx.restore(); naamBij(ctx,'tweede allel valt uit','in één cel',960,790,p,'center',C.koraal);")
rep("chromo(ctx,500+k*230,460,150,clamp(p*5-k,0,1),k===2?C.koraal:C.paars);","chromo(ctx,500+k*230,460,150,clamp(0.3+p*5-k,0.3,1),k===2?C.koraal:C.paars);")
rep("const ex=x1+cap+80; enzyme(ctx,ex,y-50,0.7,1);","const ex=x1+cap+120; enzyme(ctx,ex,y-60,0.7,1);")
