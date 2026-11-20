/* ===== Oefentoets Cellen: gedeelde hulpjes (havo en vwo uit één bron) ===== */
const VWO=/*@@VWO@@*/false;
let QN=0,ON=0;
/* vraag(punten, onderwerp, build(q,id), stof?) -> id; stof = {titel, html, anim?, films?} voor 'Uitleg van de stof' */
function vraag(pts,t,build,stof){const id=++QN;Q.push({id,pts,t,build:q=>build(q,id)});
  if(stof&&window.EXSTOF)EXSTOF.zet(TOOL,[id],stof);return id;}
function opgave(kort,titel,html,ids){const nr=++ON;
  OPG.push({nr,kort,titel,ids,ctx:`<div class="pkop"><span class="mono">Toetstekst · opgave ${nr}</span></div>`+html});}
/* films van het thema (hrefs als in HOOFDSTUKKEN.cellen.films in index.html) */
const F={
  mol:["Van molecuul tot biosfeer","films/cellen/van-molecuul-tot-biosfeer.html"],
  org:["Celorganellen","films/cellen/celorganellen/index.html"],
  mic:["Wat groeit er op je boterham?","films/cellen/microben.html"],
  dif:["Diffusie en osmose","films/cellen/diffusie-osmose/index.html"],
  stam:["Stamcellen","films/cellen/stamcellen.html"],
  ond:["Onderzoek doen in de biologie","films/cellen/onderzoek-doen/index.html"],
  dis:["Alles op adem","films/stofwisseling/2-alles-op-adem.html"]};
const GEEN_INLEIDING="<p>Bij deze opgave hoort geen inleiding: je beantwoordt een losse vraag.</p>";
/* begin van een vraag: vraagzin, hulp- en antwoordvak */
function start(q,html){q.append(el("p",{class:"qtext"},html));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  return {think,ans,unlock};}
const B=t=>`<b>${t}</b>`;
const TABEL=(nr,kop,rijen,noot)=>`<div class="eyebrow">tabel ${nr}</div><div class="tablewrap"><table class="data"><tr>${kop.map(k=>`<th>${k}</th>`).join("")}</tr>${rijen.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</table></div>`+(noot?`<p class="muted" style="font-size:14px;margin:4px 0 0">${noot}</p>`:"");

/* Afbeelding 1 van opgave 6 (pantoffeldiertjes): zelfde fictieve gegevens als eigen/figuren/cellen/maak.py (D-1)
   in kamieljacobs/toetsen-biologie. opties: hl = index van een punt dat oplicht, tot = aantal punten dat getekend wordt. */
const PD={c:[0,1,2,3,4,5,6],f:[12,9.5,7,4.5,2,0.5,0]};
function GRAF({hl=-1,tot=7,kader=""}={}){
  const X0=70,X1=600,Y0=330,Y1=30,xs=c=>X0+c*(X1-X0)/6.3,ys=f=>Y0-f*(Y0-Y1)/13;
  let s="";
  [0,1,2,3,4,5,6].forEach(c=>s+=`<path d="M${xs(c)},${Y1} V${Y0}" stroke="var(--line)" stroke-width="1"/><text x="${xs(c)}" y="${Y0+20}" text-anchor="middle" class="lblm">${c}</text>`);
  [0,2,4,6,8,10,12].forEach(f=>s+=`<path d="M${X0},${ys(f)} H${X1}" stroke="var(--line)" stroke-width="1"/><text x="${X0-10}" y="${ys(f)+4}" text-anchor="end" class="lblm">${f}</text>`);
  s+=`<path d="M${X0},${Y1-6} V${Y0} H${X1+6}" fill="none" stroke="var(--text2)" stroke-width="1.4"/>`;
  if(kader)s+=kader(xs,ys);
  const pts=PD.c.slice(0,tot).map((c,i)=>[xs(c),ys(PD.f[i])]);
  if(pts.length>1)s+=`<path d="${pts.map((p,i)=>(i?"L":"M")+p[0].toFixed(1)+","+p[1].toFixed(1)).join(" ")}" fill="none" stroke="var(--text)" stroke-width="2"/>`;
  pts.forEach((p,i)=>s+=`<rect x="${p[0]-5}" y="${p[1]-5}" width="10" height="10" fill="${i===hl?"var(--goud)":"var(--text)"}"/>`);
  s+=`<text x="${(X0+X1)/2}" y="${Y0+44}" text-anchor="middle" class="lblm">concentratie keukenzout in het water (g/L)</text>`;
  s+=`<text x="18" y="${(Y0+Y1)/2}" class="lblm" text-anchor="middle" transform="rotate(-90 18 ${(Y0+Y1)/2})">samentrekkingen per minuut</text>`;
  return `<div class="tfig" style="max-width:620px;margin:0 auto;width:100%;--min:440px">`+svgWrap("0 0 620 390",s,"Grafiek: hoe vaak de contractiele vacuole per minuut samentrekt bij 0 tot 6 gram keukenzout per liter")+`</div>`;}

/* U-buis met een membraan dat alleen water doorlaat (waarom-animatie bij de U-buisvraag).
   links/rechts = aantal deeltjes dat je tekent; h = hoogteverschil (px, rechts omhoog). */
function UBUIS({links=2,rechts=2,h=0,pijl=false,lab=["",""]}={}){
  const hl=150+h/2,hr=150-h/2;let s="";
  s+=`<path d="M60,40 V250 Q60,300 110,300 H250 Q300,300 300,250 V40" fill="none" stroke="var(--text2)" stroke-width="3"/>`;
  s+=`<path d="M100,40 V250 Q100,262 112,262 H248 Q260,262 260,250 V40" fill="none" stroke="var(--text2)" stroke-width="3"/>`;
  s+=`<path d="M62,${hl} H98 M262,${hr} H298" stroke="var(--teal)" stroke-width="3"/>`;
  s+=`<path d="M62,${hl} H98 V250 Q100,262 112,262 H180 V298 H110 Q62,298 62,250 Z" fill="var(--teal)" opacity=".18"/>`;
  s+=`<path d="M298,${hr} H262 V250 Q260,262 248,262 H180 V298 H250 Q298,298 298,250 Z" fill="var(--teal)" opacity=".18"/>`;
  s+=`<path d="M180,262 V298" stroke="var(--goud)" stroke-width="4" stroke-dasharray="4 4"/><text x="180" y="326" text-anchor="middle" class="lblm">membraan</text>`;
  const stip=(x0,n,kl)=>{let r="";for(let i=0;i<n;i++){const x=x0+(i%3)*12,y=210+Math.floor(i/3)*14;r+=`<circle cx="${x}" cy="${y}" r="4.5" fill="${kl}"/>`;}return r;};
  s+=stip(68,links,"var(--koraal)")+stip(268,rechts,"var(--paars)");
  s+=`<text x="80" y="28" text-anchor="middle" class="lbl">${lab[0]}</text><text x="280" y="28" text-anchor="middle" class="lbl">${lab[1]}</text>`;
  if(pijl)s+=`<path d="M150,280 H205" stroke="var(--teal)" stroke-width="3"/><path d="M205,273 L216,280 L205,287 Z" fill="var(--teal)"/><text x="150" y="250" class="lblm">water</text>`;
  return `<div style="max-width:360px;margin:0 auto">`+svgWrap("0 0 360 340",s,"U-buis met links en rechts een oplossing, gescheiden door een membraan dat alleen water doorlaat")+`</div>`;}

/* Pantoffeldiertje: water komt binnen door osmose, de contractiele vacuole perst het eruit (waarom-animatie). */
function PANT({stap=0}={}){
  let s=`<ellipse cx="200" cy="130" rx="150" ry="70" fill="var(--groen)" opacity=".12" stroke="var(--text2)" stroke-width="2.5"/>`;
  s+=`<text x="200" y="232" text-anchor="middle" class="lblm">alleen een celmembraan, geen celwand</text>`;
  const r=stap===2?26:stap===3?8:16;
  s+=`<circle cx="270" cy="115" r="${r}" fill="var(--teal)" opacity=".35" stroke="var(--teal)" stroke-width="2"/><text x="262" y="${115+r+16}" text-anchor="middle" class="lblm">contractiele vacuole</text>`;
  if(stap>=1)[[40,60,80,95],[40,200,85,165],[360,200,315,165],[230,22,215,60]].forEach(([x1,y1,x2,y2])=>s+=`<path d="M${x1},${y1} L${x2},${y2}" stroke="var(--teal)" stroke-width="3"/><circle cx="${x2}" cy="${y2}" r="4" fill="var(--teal)"/>`);
  if(stap>=1)s+=`<text x="20" y="14" class="lbl">slootwater: lage osmotische waarde</text><text x="80" y="135" class="lbl">cytoplasma: hogere</text>`;
  if(stap===3)s+=`<path d="M296,104 L350,70" stroke="var(--teal)" stroke-width="3"/><path d="M352,62 L356,74 L344,72 Z" fill="var(--teal)"/><text x="300" y="60" class="lblm">eruit geperst</text>`;
  return `<div style="max-width:420px;margin:0 auto">`+svgWrap("0 0 400 245",s,"Schets van een pantoffeldiertje met contractiele vacuole")+`</div>`;}
