/* ===== Oefentoets Erfelijkheid: gedeelde hulpjes (havo en vwo uit één bron) ===== */
const VWO=/*@@VWO@@*/false;
let QN=0,ON=0;
/* vraag(punten, onderwerp, build(q,id), stof?) -> id; stof = {titel, html, anim?, films?} voor 'Uitleg van de stof' */
function vraag(pts,t,build,stof){const id=++QN;Q.push({id,pts,t,build:q=>build(q,id)});
  if(stof&&window.EXSTOF)EXSTOF.zet(TOOL,[id],stof);return id;}
function opgave(kort,titel,html,ids){const nr=++ON;
  OPG.push({nr,kort,titel,ids,ctx:`<div class="pkop"><span class="mono">Toetstekst · inleiding opgave ${nr}</span></div>`+html});}
const F={
  chrom:["Chromosomen, genen en allelen","films/erfelijkheid/1-chromosomen.html"],
  mono:["Monohybride kruisingen","films/erfelijkheid/2-monohybride-kruisingen.html"],
  voorbij:["Voorbij dominant en recessief","films/erfelijkheid/3-voorbij-dominant-en-recessief.html"],
  di:["Dihybride kruising en gekoppelde overerving","films/erfelijkheid/4-dihybride-kruising-en-gekoppelde-overerving.html"],
  x:["Overerving via X-chromosomen en mitochondriën","films/erfelijkheid/5-overerving-via-x-chromosomen-en-mitochondrien.html"],
  stam:["Stambomen en kansrekenen","films/erfelijkheid/6-stambomen-en-kansrekenen.html"]};
/* begin van een vraag: vraagzin, hulp- en antwoordvak */
function start(q,html){q.append(el("p",{class:"qtext"},html));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  return {think,ans,unlock};}
/* kruisingsschema als svg. top/left = gameten, cells[r][k] = genotype; kleur(cel,r,k) -> css-kleur of ''; toon: 0 gameten, 1 + vakjes */
function PUN(top,left,cells,{kleur,toon=1,kopT="",kopL="",w=86,h=50}={}){
  const X0=110,Y0=70,W=X0+top.length*w+20,H=Y0+left.length*h+20;let s="";
  if(kopT)s+=`<text x="${X0+top.length*w/2}" y="20" text-anchor="middle" class="lblm">${kopT}</text>`;
  if(kopL)s+=`<text x="16" y="${Y0+left.length*h/2}" class="lblm" transform="rotate(-90 16 ${Y0+left.length*h/2})" text-anchor="middle">${kopL}</text>`;
  top.forEach((g,k)=>s+=`<rect x="${X0+k*w+8}" y="32" width="${w-16}" height="28" rx="14" fill="var(--teal-soft)" stroke="var(--teal)"/><text x="${X0+k*w+w/2}" y="51" text-anchor="middle" class="lbl">${g}</text>`);
  left.forEach((g,r)=>s+=`<rect x="34" y="${Y0+r*h+10}" width="${X0-46}" height="28" rx="14" fill="var(--goud-soft)" stroke="var(--goud)"/><text x="${34+(X0-46)/2}" y="${Y0+r*h+29}" text-anchor="middle" class="lbl">${g}</text>`);
  left.forEach((_,r)=>top.forEach((_,k)=>{const c=toon&&kleur?kleur(cells[r][k],r,k):"";
    s+=`<rect x="${X0+k*w}" y="${Y0+r*h}" width="${w}" height="${h}" fill="${c||"none"}" stroke="var(--line2)"/>`;
    if(toon)s+=`<text x="${X0+k*w+w/2}" y="${Y0+r*h+h/2+5}" text-anchor="middle" class="lbl" style="font-size:15px">${cells[r][k]}</text>`;}));
  return `<div style="max-width:${Math.min(W*1.1,520)}px;margin:0 auto">`+svgWrap(`0 0 ${W} ${H}`,s,"Kruisingsschema")+`</div>`;}
/* stamboom: personen {id,x,y,m,ziek,lab}; paren [[a,b]]; kinderen [[a,b,[ids]]] (a,b = ouders) */
function STAM({personen,paren,kinderen,hl={},legenda,breed=720,hoog=300,ziekNaam="met de aandoening",gen=[]}){
  const R=15,P={};personen.forEach(p=>P[p.id]=p);let s="";
  paren.forEach(([a,b])=>{const A=P[a],B=P[b];s+=`<path d="M${Math.min(A.x,B.x)+R},${A.y} H${Math.max(A.x,B.x)-R}" stroke="var(--text)" stroke-width="1.6"/>`;});
  kinderen.forEach(([a,b,ks])=>{const A=P[a],B=P[b],xm=(A.x+B.x)/2,yk=P[ks[0]].y,ym=(A.y+yk)/2;
    const xs=ks.map(k=>P[k].x);s+=`<path d="M${xm},${A.y} V${ym} M${Math.min(...xs,xm)},${ym} H${Math.max(...xs,xm)}" stroke="var(--text)" stroke-width="1.6" fill="none"/>`;
    xs.forEach(x=>s+=`<path d="M${x},${ym} V${yk-R}" stroke="var(--text)" stroke-width="1.6"/>`);});
  personen.forEach(p=>{const f=p.ziek?"var(--text)":"var(--surface)",c=hl[p.id];
    if(c)s+=p.m?`<rect x="${p.x-R-5}" y="${p.y-R-5}" width="${2*R+10}" height="${2*R+10}" rx="4" fill="none" stroke="${c}" stroke-width="3"/>`:`<circle cx="${p.x}" cy="${p.y}" r="${R+6}" fill="none" stroke="${c}" stroke-width="3"/>`;
    s+=p.m?`<rect x="${p.x-R}" y="${p.y-R}" width="${2*R}" height="${2*R}" fill="${f}" stroke="var(--text)" stroke-width="1.6"/>`:`<circle cx="${p.x}" cy="${p.y}" r="${R}" fill="${f}" stroke="var(--text)" stroke-width="1.6"/>`;
    s+=`<text x="${p.x}" y="${p.y+R+16}" text-anchor="middle" class="lblm">${p.lab}</text>`;});
  if(legenda!==false){const lx=breed-175;[[1,0,"man"],[0,0,"vrouw"],[1,1,"man "+ziekNaam]].forEach(([m,z,t],k)=>{const y=40+k*34;
    s+=m?`<rect x="${lx-9}" y="${y-9}" width="18" height="18" fill="${z?"var(--text)":"var(--surface)"}" stroke="var(--text)" stroke-width="1.4"/>`:`<circle cx="${lx}" cy="${y}" r="9" fill="var(--surface)" stroke="var(--text)" stroke-width="1.4"/>`;
    s+=`<text x="${lx+16}" y="${y+4}" class="lblm">${t}</text>`;});}
  gen.forEach(([y,t])=>s+=`<text x="20" y="${y+5}" class="lbl" style="font-size:15px">${t}</text>`);
  return svgWrap(`0 0 ${breed} ${hoog}`,s,"Stamboom");}
const B=t=>`<b>${t}</b>`;
