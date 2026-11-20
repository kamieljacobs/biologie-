/* ===== Oefentoets Voeding: gedeelde hulpjes (havo en vwo uit één bron) =====
   Inhoud = de Word-oefentoetsen 5havo_voeding_oefentoets / 6vwo_voeding_oefentoets (toetsen-biologie, 20 nov 2026),
   vragen uit eigen/voeding.json (EI-voeding-…). Zelfde opgaven, volgorde, contexten, vraagteksten en punten. */
const VWO=/*@@VWO@@*/false;
let QN=0,ON=0;
/* vraag(punten, onderwerp, build(q,id), stof?) -> id; stof = {titel, html, anim?, films?} voor 'Uitleg van de stof' */
function vraag(pts,t,build,stof){const id=++QN;Q.push({id,pts,t,build:q=>build(q,id)});
  if(stof&&window.EXSTOF)EXSTOF.zet(TOOL,[id],stof);return id;}
function opgave(kort,titel,html,ids){const nr=++ON;
  const kop=html?`Toetstekst · inleiding opgave ${nr}`:`Toetstekst · opgave ${nr}`;
  OPG.push({nr,kort,titel,ids,ctx:`<div class="pkop"><span class="mono">${kop}</span></div>`+(html||`<p class="muted" style="margin:0">Bij deze opgave hoort geen inleiding: de vragen staan op zichzelf.</p>`)});}
/* films van het thema (hrefs als in HOOFDSTUKKEN.voeding.films) */
const F={
  eten:["Wat zit er in je eten?","films/voeding/1-wat-zit-er-in-je-eten.html"],
  reis:["De reis door je buik","films/voeding/2-de-reis-door-je-buik.html"],
  enz:["Knippen op maat","films/voeding/3-knippen-op-maat.html"],
  darm:["Van darm naar bloed","films/voeding/4-van-darm-naar-bloed.html"],
  lever:["De lever als fabriek","films/voeding/5-de-lever-als-fabriek.html"],
  bact:["Je darmbewoners","films/voeding/6-je-darmbewoners.html"],
  supp:["Supplementen en superfoods","films/voeding/7-supplementen-en-superfoods.html"]};
/* begin van een vraag: vraagzin, hulp- en antwoordvak */
function start(q,html){q.append(el("p",{class:"qtext"},html));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  return {think,ans,unlock};}
const B=t=>`<b>${t}</b>`;
const UITSPRAKEN=(lijst,slot)=>lijst.map((t,k)=>`${k+1} ${t}`).join("<br>")+`<br><br><b>${slot}</b>`;
/* getal uit een invoerveld: spaties (ook 44 400) en een komma mogen */
const getal=s=>parseFloat(String(s||"").replace(/[\s  ]/g,"").replace(",","."));
const fmt=(v,d=0)=>v.toFixed(d).replace(".",",").replace(/\B(?=(\d{3})+(?!\d))/g," ");
/* rekenantwoord met meerdere velden, 1 punt per veld; check(v, alle waarden) -> goed? */
function NUM(ans,{id,fields,after}){
  const inps=fields.map(([lab,unit],k)=>{const r=el("div",{class:"row"});const fid="q"+id+"f"+k;
    r.append(el("label",{for:fid,class:"sellab"},lab));const i=el("input",{class:"num",id:fid,inputmode:"decimal"});r.append(i,el("span",{class:"muted"},unit));ans.append(r);return i;});
  const ck=el("button",{class:"go"},"Nakijken"),fb=el("div",{class:"fb",hidden:""});ans.append(ck,fb);
  ck.onclick=()=>{const v=inps.map(i=>getal(i.value));if(v.some(isNaN)){fb.hidden=false;fb.className="fb hint";fb.textContent="Vul eerst alle uitkomsten in.";return;}
    inps.forEach(i=>i.disabled=true);ck.remove();const res=fields.map((f,k)=>!!f[2](v[k],v));const p=res.filter(Boolean).length;
    fb.hidden=false;fb.className="fb "+(p===fields.length?"ok":"no");
    fb.innerHTML=`<b>${p} van de ${fields.length} ${fields.length===1?"punt":"punten"}.</b><br>`+fields.map((f,k)=>`${res[k]?"✓":"✗"} ${f[3]}`).join("<br>");setScore(id,p);after&&after();};
}

/* Afbeelding 1 van opgave 3: activiteit van de wasmiddelprotease (zelfde fictieve waarden als
   eigen/figuren/voeding/maak.py in kamieljacobs/toetsen-biologie). opties: hl = [temperaturen] om te markeren,
   lijn = [[t1,t2]] hulplijnen naar de as, opt = optimum tonen. */
const PROT={t:[0,10,20,30,40,50,60,70,80],a:[5,12,30,55,80,100,70,20,0]};
function GRAFIEK({hl=[],lijn=false,opt=false}={}){
  const X0=70,X1=600,Y0=330,Y1=30,xs=t=>X0+t*(X1-X0)/85,ys=a=>Y0-a*(Y0-Y1)/110;
  let s="";
  [0,10,20,30,40,50,60,70,80].forEach(t=>s+=`<path d="M${xs(t)},${Y1} V${Y0}" stroke="var(--line)" stroke-width="1"/><text x="${xs(t)}" y="${Y0+20}" text-anchor="middle" class="lblm">${t}</text>`);
  [0,20,40,60,80,100].forEach(a=>s+=`<path d="M${X0},${ys(a)} H${X1}" stroke="var(--line)" stroke-width="1"/><text x="${X0-10}" y="${ys(a)+4}" text-anchor="end" class="lblm">${a}</text>`);
  s+=`<path d="M${X0},${Y1} V${Y0} H${X1}" fill="none" stroke="var(--text2)" stroke-width="1.4"/>`;
  s+=`<path d="${PROT.t.map((t,i)=>`${i?"L":"M"}${xs(t).toFixed(1)},${ys(PROT.a[i]).toFixed(1)}`).join(" ")}" fill="none" stroke="var(--text)" stroke-width="2.2" stroke-linejoin="round"/>`;
  PROT.t.forEach((t,i)=>{const on=hl.includes(t);
    if(on&&lijn)s+=`<path d="M${xs(t)},${ys(PROT.a[i])} V${Y0} M${xs(t)},${ys(PROT.a[i])} H${X0}" stroke="var(--goud)" stroke-width="1.6" stroke-dasharray="5 4"/>`;
    s+=`<circle cx="${xs(t)}" cy="${ys(PROT.a[i])}" r="${on?7:4}" fill="${on?"var(--goud)":"var(--text)"}"/>`;
    s+=`<text x="${xs(t)}" y="${ys(PROT.a[i])-11}" text-anchor="middle" class="lbl">${PROT.a[i]}</text>`;});
  if(opt)s+=`<text x="${xs(50)+12}" y="${ys(100)+18}" class="lbl" style="fill:var(--goud-text)">optimum</text>`;
  s+=`<text x="${(X0+X1)/2}" y="${Y0+44}" text-anchor="middle" class="lblm">temperatuur (°C)</text>`;
  s+=`<text x="18" y="${(Y0+Y1)/2}" text-anchor="middle" class="lblm" transform="rotate(-90 18 ${(Y0+Y1)/2})">activiteit protease (%)</text>`;
  return `<div class="vdfig" style="max-width:620px;margin:0 auto;width:100%;--min:520px">`+svgWrap("0 0 620 390",s,"Grafiek: activiteit van de protease bij 0 tot 80 graden Celsius")+`</div>`;}
