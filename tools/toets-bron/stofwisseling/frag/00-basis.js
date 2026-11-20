/* ===== Oefentoets Stofwisseling: gedeelde hulpjes (havo en vwo uit één bron) ===== */
const VWO=/*@@VWO@@*/false;
let QN=0,ON=0;
/* vraag(punten, onderwerp, build(q,id), stof?) -> id; stof = {titel, html, anim?, films?} voor 'Uitleg van de stof' */
function vraag(pts,t,build,stof){const id=++QN;Q.push({id,pts,t,build:q=>build(q,id)});
  if(stof&&window.EXSTOF)EXSTOF.zet(TOOL,[id],stof);return id;}
function opgave(kort,titel,html,ids){const nr=++ON;
  OPG.push({nr,kort,titel,ids,ctx:`<div class="pkop"><span class="mono">Toetstekst · ${html?"inleiding ":""}opgave ${nr}</span></div>`+(html||`<p class="muted" style="margin:0">Losse kennisvragen, zonder inleiding.</p>`)});}
/* films van het thema (hrefs als in HOOFDSTUKKEN.stofwisseling.films) */
const F={
  v:["Alles versneld","films/stofwisseling/1-alles-versneld.html"],
  a:["Alles op adem","films/stofwisseling/2-alles-op-adem.html"],
  g:["Alles in het groen","films/stofwisseling/3-alles-in-het-groen.html"]};
/* begin van een vraag: vraagzin, hulp- en antwoordvak */
function start(q,html){q.append(el("p",{class:"qtext"},html));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  return {think,ans,unlock};}
const B=t=>`<b>${t}</b>`;
const TABEL=(nr,kop,rijen,noot)=>`<div class="eyebrow">tabel ${nr}${noot?" "+noot:""}</div><div class="tablewrap"><table class="data"><tr>${kop.map(k=>`<th>${k}</th>`).join("")}</tr>${rijen.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</table></div>`;

/* Vraag met een rekendeel (a, door de tool nagekeken) en een uitlegdeel (b, zelf afvinken). Elk deel 1 punt.
   reken = [label, eenheid, test(v) -> bool, uitleg]; check = scoringselement van b */
function rekenOpen(ans,{id,reken:[lab,unit,test,uitleg],check,model,valkuil,after}){
  const r=el("div",{class:"row"});const fid="q"+id+"f0";
  r.append(el("label",{for:fid,class:"sellab"},lab));const inp=el("input",{class:"num",id:fid,inputmode:"decimal"});r.append(inp,el("span",{class:"muted"},unit));
  const ta=el("textarea",{id:"q"+id+"t",placeholder:"b · Schrijf je uitleg…"});
  const ck=el("button",{class:"go"},"Nakijken");const tf=el("div",{class:"fb hint",hidden:""});
  ans.append(r,ta,ck,tf);
  ck.onclick=()=>{const v=parseFloat((inp.value||"").replace(",","."));
    if(isNaN(v)||ta.value.trim().length<8){tf.hidden=false;tf.textContent="Vul eerst je uitkomst bij a in en schrijf je uitleg bij b. Daarna kijk je het na.";return;}
    tf.remove();ck.remove();inp.disabled=true;ta.readOnly=true;
    const ok=test(v);
    ans.append(el("div",{class:"fb "+(ok?"ok":"no")},`<b>a · ${ok?"1 punt":"0 punten"}</b><br>${ok?"✓":"✗"} ${uitleg}`));
    const ss=el("div",{class:"selfscore"});
    ss.append(el("p",{style:"margin:0"},"<b>b · Kijk jezelf na met het antwoordmodel.</b> Vink aan wat er in jouw antwoord staat."));
    const lab2=el("label",{},`<input type="checkbox" id="q${id}c0"><span>${check} <span class="pts">1p</span></span>`);ss.append(lab2);const box=lab2.querySelector("input");
    if(model)ss.append(el("div",{class:"model"},"<b>Voorbeeldantwoord b:</b> "+model));
    if(valkuil)ss.append(el("div",{class:"fb hint"},"<b>Valkuil:</b> "+valkuil));
    const sc=el("div",{class:"score"});ss.append(sc);ans.append(ss);
    const upd=()=>{const p=(ok?1:0)+(box.checked?1:0);sc.textContent=`Jouw score: ${p} / 2`;setScore(id,p);};
    box.onchange=upd;upd();after&&after();};
}

/* ---------- figuren (SVG, kleuren uit de huisstijl, dus licht en donker) ---------- */
const FIG=(vb,inner,label,min=520,max=640)=>`<div class="swfig" style="max-width:${max}px;margin:0 auto;width:100%;--min:${min}px">`+svgWrap(vb,inner,label)+`</div>`;
/* Reactiesnelheid tegen hoeveelheid substraat (model, geen meetwaarden).
   lijnen = [{vmax, km, kleur, naam, dash, half}]; tot = tot welke substraatwaarde (0–10) de lijn loopt;
   stip = [substraatwaarde, lijnindex] -> stip op de lijn; bezet = 0..1 -> balkje 'actieve centra bezet' */
function KROMME({lijnen,tot=10,stip=null,labels=true}){
  const X0=70,X1=600,Y0=300,Y1=40,xs=s=>X0+s/10*(X1-X0),ys=v=>Y0-v/2.2*(Y0-Y1);
  let s=`<path d="M${X0},${Y1-8} V${Y0} H${X1+10}" fill="none" stroke="var(--text2)" stroke-width="1.4"/>`;
  s+=`<text x="${(X0+X1)/2}" y="${Y0+30}" text-anchor="middle" class="lblm">hoeveelheid substraat →</text>`;
  s+=`<text x="22" y="${(Y0+Y1)/2}" text-anchor="middle" class="lblm" transform="rotate(-90 22 ${(Y0+Y1)/2})">reactiesnelheid →</text>`;
  lijnen.forEach((l,i)=>{let d="";for(let k=0;k<=60;k++){const S=k/60*tot;const v=l.vmax*S/(l.km+S);d+=`${k?"L":"M"}${xs(S).toFixed(1)},${ys(v).toFixed(1)} `;}
    s+=`<path d="${d}" fill="none" stroke="${l.kleur}" stroke-width="3" stroke-dasharray="${l.dash||""}" stroke-linecap="round"/>`;
    if(l.vmaxLijn)s+=`<path d="M${X0},${ys(l.vmax)} H${X1}" stroke="${l.kleur}" stroke-width="1.2" stroke-dasharray="3 5"/><text x="${X0+6}" y="${ys(l.vmax)-6}" class="lblm" style="fill:${l.kleur}">V-max</text>`;
    if(l.half){const yh=ys(l.vmax/2),xh=xs(l.km);s+=`<path d="M${X0},${yh} H${xh} V${Y0}" fill="none" stroke="${l.kleur}" stroke-width="1.2" stroke-dasharray="3 4"/><circle cx="${xh}" cy="${yh}" r="4.5" fill="${l.kleur}"/>`;}
    if(labels&&l.naam){const S=tot,v=l.vmax*S/(l.km+S);s+=`<text x="${xs(S)-4}" y="${ys(v)-10}" text-anchor="end" class="lbl" style="fill:${l.kleur}">${l.naam}</text>`;}});
  if(stip){const [S,i]=stip,l=lijnen[i],v=l.vmax*S/(l.km+S);s+=`<circle cx="${xs(S)}" cy="${ys(v)}" r="7" fill="var(--goud)" stroke="var(--bg)" stroke-width="2"/>`;}
  return FIG("0 0 640 340",s,"Reactiesnelheid uitgezet tegen de hoeveelheid substraat (model)");}
/* Een enzym met actief centrum, met n van de 6 centra bezet (voor de verzadiging) */
function CENTRA(bezet,totaal=6,extraSub=0){
  let s="";for(let k=0;k<totaal;k++){const x=50+k*92,y=70,vol=k<bezet;
    s+=`<path d="M${x-30},${y+26} Q${x-34},${y-24} ${x-12},${y-26} L${x-12},${y-6} L${x+12},${y-6} L${x+12},${y-26} Q${x+34},${y-24} ${x+30},${y+26} Z" fill="var(--teal-soft)" stroke="var(--teal)" stroke-width="2"/>`;
    if(vol)s+=`<rect x="${x-11}" y="${y-24}" width="22" height="17" rx="4" fill="var(--goud)"/>`;}
  for(let k=0;k<extraSub;k++)s+=`<rect x="${70+k*58}" y="${132+(k%2)*14}" width="22" height="17" rx="4" fill="var(--goud)" opacity=".8"/>`;
  return FIG("0 0 560 175",s,"Enzymmoleculen met een actief centrum, bezet of vrij",420,560);}
