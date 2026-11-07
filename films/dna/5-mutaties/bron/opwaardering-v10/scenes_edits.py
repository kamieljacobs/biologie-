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
# ===== frisse review 27 okt 2026 =====
# MOET 4: 'rood en warm' vrij van Noor
rep("if(li===1) naamBij(ctx,'rood en warm','zonnebrand',380,520,ease(lf*2),'right',C.koraal);","if(li===1) naamBij(ctx,'rood en warm','zonnebrand',660,420,ease(lf*2),'left',C.koraal);")
# MOET 2: DNA (twee strengen) boven, rijen = mRNA
rep("""SCENES.h2a=(ctx,li,lf,t)=>{ bg(ctx,'schema'); const sq='AUGGUGGCU', x0=330, dx=96, y=250; M(ctx,'puntmutatie · één nucleotidepaar',960,y-90,{align:'center',color:C.text2,alpha:P(li,0,lf)});
  tileRow(ctx,x0,y,sq,{});
  const rows=[['substitutie','AUGGAGGCU',1,i=>i===4],['insertie','AUGGUAGGCU',2,i=>i===5],['deletie','AUGGGGCU',3,null]];
  rows.forEach(([n,s,L,mk],r)=>{ const p=P(li,L,lf); if(p<=0.01) return; const yy=y+140+r*140;""",
"""SCENES.h2a=(ctx,li,lf,t)=>{ bg(ctx,'schema'); const sq='AUGGUGGCU', x0=330, dx=96, y=370; M(ctx,'puntmutatie · één nucleotidepaar in het dna',960,110,{align:'center',color:C.text2});
  // 1.2 review: het gen als DNA (twee strengen), daaronder het mRNA; de mutatierijen tonen het mRNA na de mutatie
  T(ctx,'DNA',x0-60,212,36,{w:600,align:'right',color:C.text2}); tileRow(ctx,x0,170,'ATGGTGGCT',{rna:false,h:64,px:36}); tileRow(ctx,x0,240,'TACCACCGA',{rna:false,h:64,px:36});
  T(ctx,'mRNA',x0-60,y+12,36,{w:600,align:'right',color:C.text2}); tileRow(ctx,x0,y,sq,{h:84}); M(ctx,'mrna na de mutatie',x0+10*dx-20,y+122,{color:C.text2,alpha:P(li,1,lf)});
  const rows=[['substitutie','AUGGAGGCU',1,i=>i===4],['insertie','AUGGUAGGCU',2,i=>i===5],['deletie','AUGGGGCU',3,null]];
  rows.forEach(([n,s,L,mk],r)=>{ const p=P(li,L,lf); if(p<=0.01) return; const yy=y+120+r*110;""")
rep("tileRow(ctx,x0,yy,s,{mark:mk?i=>mk(i)?C.koraal:null:null,dx}); if(n==='deletie'){ ctx.strokeStyle=C.koraal; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x0+4*dx-30,yy+62); ctx.lineTo(x0+4*dx+30,yy+62); ctx.stroke(); M(ctx,'weg',x0+4*dx+60,yy+72,{color:C.koraal}); }",
    "tileRow(ctx,x0,yy,s,{mark:mk?i=>mk(i)?C.koraal:null:null,dx,h:84}); if(n==='deletie'){ ctx.strokeStyle=C.koraal; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x0+4*dx-30,yy+52); ctx.lineTo(x0+4*dx+30,yy+52); ctx.stroke(); M(ctx,'weg',x0+4*dx+60,yy+62,{color:C.koraal}); }")
# KAN havo 284: na de deletie volgt echt een stopcodon
rep("const m='AUGGUGGCUUCA', m1='AUGGUGCUUCA';","const m='AUGGUGGUAAGC', m1='AUGGUGUAAGC';")
rep("for(let g=0;g<3;g++) bracket(ctx,x0+g*3*80-34,x0+(g*3+2)*80+34,y0+548,g>=2?C.koraal:C.line,'',1);","for(let g=0;g<3;g++) bracket(ctx,x0+g*3*80-34,x0+(g*3+2)*80+34,y0+548,g>=2?C.koraal:C.line,g===2?'stop':'',1);")
rep("M(ctx,'vanaf de deletie klopt geen codon meer',x0,y0+600,{color:C.koraal});","M(ctx,'vanaf de deletie klopt geen codon meer · al snel een stopcodon',x0+300,y0+600,{color:C.koraal});")
# MOET 1: normaal en mutant naast elkaar, DNA als basenpaar
rep("""  if(li===0){ const p=ease(lf*1.5); const steps=[['DNA',BC,'GTA',false],['mRNA',RC,'CAU',true],['codon → aminozuur',null,'his',null]]; let x=320; steps.forEach(([n,_,s,rna],i)=>{ ctx.save(); ctx.globalAlpha*=clamp(p*3-i,0,1); M(ctx,n,x+100,300,{align:'center',color:C.text2}); if(rna!==null) tileRow(ctx,x,420,s,{dx:72,w:62,h:72,px:40,rna,mark:j=>j===2?C.koraal:null}); else aaBead(ctx,x+100,420,s==='his'?'His':'',4,1); if(i<2) arrow(ctx,x+230,420,x+330,420,C.line,2,1); ctx.restore(); x+=430; }); M(ctx,'één basenpaar anders → één base anders in het mRNA → één ander codon',960,600,{align:'center',color:C.text2,alpha:p}); return; }""",
"""  if(li===0){ const p=ease(lf*1.5); // 1.2 review: normaal en mutant onder elkaar; DNA als basenpaar (coderende + matrijsstreng)
    [['DNA (basenparen)',470],['mRNA',990],['aminozuur',1420]].forEach(([n,x])=>M(ctx,n,x,215,{align:'center',color:C.text2}));
    const rij=(y,cod,mat,rna,aa,lab,mut,a)=>{ ctx.save(); ctx.globalAlpha*=a; T(ctx,lab,150,y+12,34,{w:700,color:mut?C.koraal:C.text}); const mk=j=>(mut&&j===2)?C.koraal:null;
      tileRow(ctx,400,y-40,cod,{rna:false,dx:72,w:62,h:62,px:36,mark:mk}); tileRow(ctx,400,y+30,mat,{rna:false,dx:72,w:62,h:62,px:36,mark:mk});
      arrow(ctx,610,y,780,y,C.line,2,1); tileRow(ctx,920,y,rna,{dx:72,w:62,h:72,px:40,mark:mk}); arrow(ctx,1130,y,1300,y,C.line,2,1); aaBead(ctx,1420,y,aa,mut?1:4,1,mut?C.koraal:null); ctx.restore(); };
    rij(330,'CAT','GTA','CAU','His','normaal',false,1); rij(580,'CAA','GTT','CAA','Gln','mutatie',true,p);
    M(ctx,'één basenpaar anders → één base anders in het mRNA → één ander codon',960,780,{align:'center',color:C.text2,alpha:p}); return; }""")
# MOET 3: realistische maten; bevruchte eicel als cel
rep("egg(ctx,330,400,1.6,1,true); arrow(ctx,420,400,560,400,C.line,2,1);","cellS(ctx,330,400,62,1,true); M(ctx,'bevruchte eicel',330,500,{align:'center',color:C.text2}); arrow(ctx,420,400,560,400,C.line,2,1);")
rep("chick(ctx,1180,420,1.4,1,true);","chick(ctx,1160,440,0.7,1,true); M(ctx,'kuiken',1170,520,{align:'center',color:C.text2});")
rep("sun(ctx,1330,250,50,1,t); hen(ctx,1560,470,1.1,1); for(let k=0;k<5;k++) circ(ctx,1500+k*26,430,5,C.koraal); egg(ctx,1700,560,1,1,false); naamBij(ctx,'huidcellen','niet de eicel',1600,330,p,'center',C.text);",
    "sun(ctx,1290,230,46,1,t); hen(ctx,1540,470,1.6,1); for(let k=0;k<5;k++) circ(ctx,1470+k*26,440,5,C.koraal); egg(ctx,1730,575,0.7,1,false); naamBij(ctx,'huidcellen','niet de eicel',1560,285,p,'center',C.text);")
# KAN: inhoud op t = 0 (n24, n24c, n20)
rep("const p=li===0?clamp(ease(lf*1.3)*4-i,0,1):1;","const p=li===0?clamp(1+ease(lf*1.3)*3-i,0,1):1;")
rep("if(li===0){ const p=ease(lf*1.5); T(ctx,'een cel heeft meer dan één rem',960,250,44,{w:700,align:'center',alpha:p});","if(li===0){ const p=0.45+0.55*ease(lf*1.5); T(ctx,'een cel heeft meer dan één rem',960,250,44,{w:700,align:'center',alpha:p});")
# n20: centromeer, echt gat bij 'weg', verdubbeling naast het origineel; eerste chromosoom meteen in beeld
rep("""const p=ease(li===0?lf*1.5:1);
  const kinds=[['weg',i=>i!==2],['verdubbeld',null],['verplaatst',null]]; kinds.forEach(([n,_],i)=>{ const x=420+i*520; ctx.save(); ctx.globalAlpha*=clamp(p*3-i,0,1); for(let s=0;s<5;s++){ const seg=i===0&&s===2; box(ctx,x-30,300+s*56,60,48,10,seg?rgba(C.koraal,0.2):C.paars,seg?C.koraal:null,seg?2:0); if(seg){ ctx.strokeStyle=C.koraal; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x-30,300+s*56); ctx.lineTo(x+30,348+s*56); ctx.stroke(); } }
    if(i===1) box(ctx,x-30,300+5*56,60,48,10,C.koraal); if(i===2){""",
"""const p=ease(li===0?lf*1.5:1);
  const cen=(x,y)=>{ ctx.fillStyle=C.bgSchema; ctx.fillRect(x-34,y-5,10,10); ctx.fillRect(x+24,y-5,10,10); circ(ctx,x,y,7,lighten(C.paars,0.4)); }; // centromeer: insnoering
  const kinds=[['weg',null],['verdubbeld',null],['verplaatst',null]]; kinds.forEach(([n,_],i)=>{ const x=420+i*520; ctx.save(); ctx.globalAlpha*=clamp(1+p*2-i,0,1);
    if(i===0){ [0,1,3,4].forEach((s,k)=>box(ctx,x-30,300+k*56,60,48,10,C.paars)); cen(x,300+56-4); ctx.strokeStyle=C.koraal; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x+44,300+2*56-30); ctx.lineTo(x+60,300+2*56-30); ctx.stroke(); M(ctx,'stuk ontbreekt',x+70,300+2*56-20,{color:C.koraal}); box(ctx,x+90,520,60,48,10,rgba(C.koraal,0.25),C.koraal,2); }
    else { const ns=i===1?6:5; for(let s=0;s<ns;s++){ const dup=i===1&&s===3; box(ctx,x-30,300+s*56,60,48,10,dup?C.koraal:C.paars); } cen(x,300+56-4); }
    if(i===2){""")
# KAN n25 p53: pijl van p53 naar de cel, tekst vrij van de cel, 'zonder p53' in beeld
rep("M(ctx,'stopt de cel · of laat haar zichzelf opruimen',1150,620,{align:'center',color:C.text2,alpha:p}); arrow(ctx,850,470,1040,470,C.koraal,2,p); return; }",
    "M(ctx,'stopt de cel',1060,610,{color:C.text2,alpha:p}); M(ctx,'of laat haar zichzelf opruimen',1060,650,{color:C.text2,alpha:p}); arrow(ctx,1040,470,850,470,C.koraal,2,p); M(ctx,'zonder p53: beschadigde cellen blijven delen',960,780,{align:'center',color:C.koraal,alpha:ease((lf-0.55)*3)}); return; }")
# KAN n14: labels niet in elkaar
rep("M(ctx,'eiwit voor koperuitscheiding · gevouwen keten',bx,by+230,{align:'center',color:C.text2});","M(ctx,'eiwit voor koperuitscheiding',bx,by+210,{align:'center',color:C.text2});")
# KAN n28: nieuw allel = stukje op het chromosoom
rep("for(let k=0;k<5;k++){ chromo(ctx,500+k*230,460,150,clamp(0.3+p*5-k,0.3,1),k===2?C.koraal:C.paars); }",
    "for(let k=0;k<5;k++){ chromo(ctx,500+k*230,460,150,clamp(0.3+p*5-k,0.3,1),C.paars); } { const a=clamp(p*5-2,0,1), x=960, h=150; ctx.save(); ctx.globalAlpha*=a; ctx.strokeStyle=C.koraal; ctx.lineWidth=h*0.17; ctx.lineCap='butt'; ctx.beginPath(); ctx.moveTo(x-h*0.22*0.5,460-h*0.5*0.5); ctx.lineTo(x-h*0.22*0.72,460-h*0.5*0.72); ctx.stroke(); ctx.restore(); naamBij(ctx,'nieuw allel','',x-30,350,a,'center',C.koraal); }")
rep("y0+548,g>=2?C.koraal:C.line,g===2?'stop':'',1);","y0+548,g>=2?C.koraal:C.line,'',1);")
rep("M(ctx,'vanaf de deletie klopt geen codon meer · al snel een stopcodon',x0+300,y0+600,{color:C.koraal});","M(ctx,'vanaf de deletie klopt geen codon meer · u a a = stop',x0,y0+600,{color:C.koraal});")
rep(" M(ctx,'stuk ontbreekt',x+70,300+2*56-20,{color:C.koraal}); box(ctx,x+90,520,60,48,10,rgba(C.koraal,0.25),C.koraal,2); }"," M(ctx,'stuk ontbreekt',x+70,300+2*56-20,{color:C.koraal}); }")
