/* ===== Oefentoets Gaswisseling en uitscheiding: gedeelde hulpjes (havo en vwo uit één bron) ===== */
const VWO=/*@@VWO@@*/false;
let QN=0,ON=0;
/* vraag(punten, onderwerp, build(q,id), stof?) -> id; stof = {titel, html, anim?, films?} voor 'Uitleg van de stof' */
function vraag(pts,t,build,stof){const id=++QN;Q.push({id,pts,t,build:q=>build(q,id)});
  if(stof&&window.EXSTOF)EXSTOF.zet(TOOL,[id],stof);return id;}
function opgave(kort,titel,html,ids){const nr=++ON;
  OPG.push({nr,kort,titel,ids,ctx:`<div class="pkop"><span class="mono">Toetstekst · inleiding opgave ${nr}</span></div>`+html});}
/* films van het thema (hrefs als in HOOFDSTUKKEN.gaswisseling.films); alle drie havo + vwo, met vwo-blokken */
const F={
  adem:["Adem in, adem uit","films/gaswisseling/1-adem-in-adem-uit.html"],
  gas:["Gas op reis","films/gaswisseling/2-gas-op-reis.html"],
  uit:["Uitscheiding en evenwicht","films/gaswisseling/3-uitscheiding-en-evenwicht.html"]};
/* begin van een vraag: vraagzin, hulp- en antwoordvak */
function start(q,html){q.append(el("p",{class:"qtext"},html));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  return {think,ans,unlock};}
const B=t=>`<b>${t}</b>`;
const TABEL=(nr,kop,rijen,noot,label)=>`<div class="eyebrow">${label||"tabel "+nr}</div><div class="tablewrap"><table class="data"><tr>${kop.map(k=>`<th>${k}</th>`).join("")}</tr>${rijen.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</table></div>`+(noot?`<p class="muted" style="font-size:14px;margin:4px 0 0">${noot}</p>`:"");
const FIG=(inner,vb,label,max=640,min=520)=>`<div class="gwfig" style="max-width:${max}px;margin:0 auto;width:100%;--min:${min}px">`+svgWrap(vb,inner,label)+`</div>`;
const komma=v=>String(v).replace(".",",");

/* Rekenvraag met één uitkomst: goed = alle punten; fout = de leerling vinkt zelf aan of de aanpak klopte (deelpunt). */
function rekenAnswer(ans,{id,pts,label,unit,right,tol=1e-6,aanpak,model,after}){
  const r=el("div",{class:"row"});const fid="q"+id+"r";
  r.append(el("label",{for:fid,class:"sellab"},label));const inp=el("input",{class:"num",id:fid,inputmode:"decimal"});r.append(inp,el("span",{class:"muted"},unit));ans.append(r);
  const ck=el("button",{class:"go"},"Nakijken"),fb=el("div",{class:"fb",hidden:""});ans.append(ck,fb);
  ck.onclick=()=>{const v=parseFloat((inp.value||"").replace(",","."));if(isNaN(v)){fb.hidden=false;fb.className="fb hint";fb.textContent="Vul eerst je uitkomst in.";return;}
    inp.disabled=true;ck.remove();fb.hidden=false;
    if(Math.abs(v-right)<=tol){fb.className="fb ok";fb.innerHTML=`Goed: <b>${komma(right)} ${unit}</b>. ${pts} punten.<br>${model}`;setScore(id,pts);}
    else{fb.className="fb no";fb.innerHTML=`Het goede antwoord is <b>${komma(right)} ${unit}</b>.<br>${model}`;
      const ss=el("div",{class:"selfscore"});
      const lab=el("label",{},`<input type="checkbox" id="q${id}c0"><span>${aanpak} <span class="pts">1p</span></span>`);ss.append(lab);
      const sc=el("div",{class:"score"});ss.append(sc);ans.append(ss);const box=lab.querySelector("input");
      const upd=()=>{const p=box.checked?1:0;sc.textContent=`Jouw score: ${p} / ${pts}`;setScore(id,p);};box.onchange=upd;upd();}
    after&&after();};
}
/* Open tabel: per rij een invulvak; na nakijken het model per rij en een vinkje 'klopt'. score(n) = punten bij n goede rijen. */
function rijenAnswer(ans,{id,rows,score,kop,after}){
  if(kop)ans.append(el("p",{style:"margin:0"},kop));
  const tas=rows.map(([lab],k)=>{const r=el("div",{class:"row"});const fid="q"+id+"t"+k;
    r.append(el("label",{for:fid,class:"sellab"},lab));const t=el("input",{class:"txt",id:fid,style:"flex:1 1 260px;min-width:0;font:inherit;padding:8px 10px;border-radius:8px;border:1px solid var(--line2);background:var(--surface);color:var(--text)",placeholder:"stof(fen) en hoe"});r.append(t);ans.append(r);return t;});
  const ck=el("button",{class:"go"},"Nakijken"),tf=el("div",{class:"fb hint",hidden:""},"Vul eerst elke rij in.");ans.append(ck,tf);
  ck.onclick=()=>{if(tas.some(t=>t.value.trim().length<3)){tf.hidden=false;return;}tf.remove();ck.remove();tas.forEach(t=>t.readOnly=true);
    const ss=el("div",{class:"selfscore"});ss.append(el("p",{style:"margin:0"},"<b>Kijk jezelf na met het antwoordmodel.</b> Vink per rij aan of jouw antwoord klopt."));
    const boxes=rows.map(([lab,model],k)=>{const l=el("label",{},`<input type="checkbox" id="q${id}c${k}"><span><b>${lab}</b>: ${model}</span>`);ss.append(l);return l.querySelector("input");});
    const sc=el("div",{class:"score"});ss.append(sc);ans.append(ss);
    const max=score(rows.length);const upd=()=>{const p=score(boxes.filter(b=>b.checked).length);sc.textContent=`Jouw score: ${p} / ${max}`;setScore(id,p);};
    boxes.forEach(b=>b.onchange=upd);upd();after&&after();};
}

/* ---------- Afbeelding: saturatie van Kees tijdens twee ademstops (opgave Ademstops), zelfde krommen als
   eigen/figuren/gaswisseling/maak.py in kamieljacobs/toetsen-biologie (fictief). hl = [[van,tot,kleur]] in s ---------- */
const SATW=t=>{for(const st of [20,110]){const d=t-st;if(d>=0&&d<45)return 96-16*(d/45)**3;if(d>=45&&d<60)return 80+16*(d-45)/15;}return 96;};
function SAT({hl=[],punt=null}={}){
  const X0=60,X1=620,Y0=30,Y1=290,xs=t=>X0+t*(X1-X0)/180,ys=v=>Y1-(v-70)*(Y1-Y0)/31;
  let s="";
  hl.forEach(([a,b,c])=>s+=`<rect x="${xs(a)}" y="${Y0}" width="${xs(b)-xs(a)}" height="${Y1-Y0}" fill="${c}" opacity=".2"/>`);
  [0,25,50,75,100,125,150,175].forEach(k=>s+=`<path d="M${xs(k)},${Y1} v5" stroke="var(--text2)"/><text x="${xs(k)}" y="${Y1+20}" text-anchor="middle" class="lblm">${k}</text>`);
  [70,75,80,85,90,95,100].forEach(v=>s+=`<path d="M${X0},${ys(v)} H${X1}" stroke="var(--line)"/><text x="${X0-8}" y="${ys(v)+4}" text-anchor="end" class="lblm">${v}</text>`);
  s+=`<path d="M${X0},${Y0} V${Y1} H${X1}" fill="none" stroke="var(--text2)" stroke-width="1.4"/>`;
  let d="";for(let t=0;t<=180;t++)d+=(t?"L":"M")+xs(t).toFixed(1)+","+ys(SATW(t)).toFixed(1);
  s+=`<path d="${d}" fill="none" stroke="var(--text)" stroke-width="2.4" stroke-linejoin="round"/>`;
  for(const st of [20,110]){
    s+=`<path d="M${xs(st)+6},${ys(99)} H${xs(st+45)-6}" stroke="var(--text)" stroke-width="1.2"/><path d="M${xs(st)},${ys(99)} l7,-4 v8 z M${xs(st+45)},${ys(99)} l-7,-4 v8 z" fill="var(--text)"/>`;
    s+=`<text x="${xs(st+22.5)}" y="${ys(99)-7}" text-anchor="middle" class="lblm">geen ademhaling</text>`;
    s+=`<path d="M${xs(st+52)},${ys(73.5)} L${xs(st+45.6)},${ys(79.4)}" stroke="var(--text)" stroke-width="1.2"/><text x="${xs(st+53)}" y="${ys(72)}" class="lblm">wakker</text>`;}
  if(punt!=null)s+=`<circle cx="${xs(punt)}" cy="${ys(SATW(punt))}" r="7" fill="var(--goud)" stroke="var(--text)" stroke-width="1.2"/>`;
  s+=`<text x="16" y="${(Y0+Y1)/2}" class="lblm" text-anchor="middle" transform="rotate(-90 16 ${(Y0+Y1)/2})">saturatie (%)</text>`;
  s+=`<text x="${(X0+X1)/2}" y="${Y1+40}" text-anchor="middle" class="lblm">tijd (s)</text>`;
  return FIG(s,"0 0 640 340","Saturatie tijdens twee ademstops: eerst ongeveer 96 procent, daarna eerst langzaam en dan steeds sneller dalend tot 80 procent, na het wakker worden snel terug naar 96");
}

/* ---------- Afbeelding: lichaamstemperatuur en ademfrequentie van een hond (opgave Hond), zelfde gegevens als maak.py ---------- */
const HONDD={t:[0,5,10,15,20,25,30,35,40,45,50,55,60],T:[38.5,38.7,39.0,39.3,39.5,39.6,39.6,39.4,39.2,39.0,38.9,38.8,38.8],f:[30,60,120,200,240,250,250,200,140,100,80,70,60]};
function HOND({hl=[],dim=[]}={}){
  const X0=70,X1=560,Y0=24,Y1=284,xs=t=>X0+t*(X1-X0)/60,yT=v=>Y1-(v-38)*(Y1-Y0)/2,yF=v=>Y1-v*(Y1-Y0)/300;
  let s=`<rect x="${xs(0)}" y="${Y0}" width="${xs(30)-xs(0)}" height="${Y1-Y0}" fill="var(--text3)" opacity=".14"/>`;
  hl.forEach(([a,b,c])=>s+=`<rect x="${xs(a)}" y="${Y0}" width="${xs(b)-xs(a)}" height="${Y1-Y0}" fill="${c}" opacity=".22"/>`);
  s+=`<text x="${xs(15)}" y="${Y0+18}" text-anchor="middle" class="lblm">lopen in de zon</text><text x="${xs(45)}" y="${Y0+18}" text-anchor="middle" class="lblm">rust in de schaduw</text>`;
  [0,10,20,30,40,50,60].forEach(k=>s+=`<path d="M${xs(k)},${Y1} v5" stroke="var(--text2)"/><text x="${xs(k)}" y="${Y1+20}" text-anchor="middle" class="lblm">${k}</text>`);
  [38,38.5,39,39.5,40].forEach(v=>s+=`<text x="${X0-8}" y="${yT(v)+4}" text-anchor="end" class="lblm">${komma(v.toFixed(2))}</text><path d="M${X0-4},${yT(v)} h4" stroke="var(--text2)"/>`);
  [0,50,100,150,200,250,300].forEach(v=>s+=`<text x="${X1+8}" y="${yF(v)+4}" class="lblm">${v}</text><path d="M${X1},${yF(v)} h4" stroke="var(--text2)"/>`);
  s+=`<path d="M${X0},${Y0} V${Y1} H${X1} V${Y0} Z" fill="none" stroke="var(--text2)" stroke-width="1.4"/>`;
  const pT=HONDD.t.map((t,i)=>`${i?"L":"M"}${xs(t)},${yT(HONDD.T[i])}`).join(""),pF=HONDD.t.map((t,i)=>`${i?"L":"M"}${xs(t)},${yF(HONDD.f[i])}`).join("");
  const oT=dim.includes("T")?.25:1,oF=dim.includes("f")?.25:1;
  s+=`<path d="${pT}" fill="none" stroke="var(--text)" stroke-width="2.2" opacity="${oT}"/>`+HONDD.t.map((t,i)=>`<circle cx="${xs(t)}" cy="${yT(HONDD.T[i])}" r="4" fill="var(--text)" opacity="${oT}"/>`).join("");
  s+=`<path d="${pF}" fill="none" stroke="var(--text)" stroke-width="2.2" stroke-dasharray="8 5" opacity="${oF}"/>`+HONDD.t.map((t,i)=>`<rect x="${xs(t)-4}" y="${yF(HONDD.f[i])-4}" width="8" height="8" fill="var(--text)" opacity="${oF}"/>`).join("");
  const lx=xs(14),ly=Y1-50;
  s+=`<rect x="${lx-10}" y="${ly-16}" width="206" height="56" rx="4" fill="var(--surface)" stroke="var(--line2)"/>`;
  s+=`<path d="M${lx},${ly} h30" stroke="var(--text)" stroke-width="2.2"/><circle cx="${lx+15}" cy="${ly}" r="4" fill="var(--text)"/><text x="${lx+40}" y="${ly+4}" class="lblm">lichaamstemperatuur</text>`;
  s+=`<path d="M${lx},${ly+24} h30" stroke="var(--text)" stroke-width="2.2" stroke-dasharray="8 5"/><rect x="${lx+11}" y="${ly+20}" width="8" height="8" fill="var(--text)"/><text x="${lx+40}" y="${ly+28}" class="lblm">ademfrequentie</text>`;
  s+=`<text x="16" y="${(Y0+Y1)/2}" class="lblm" text-anchor="middle" transform="rotate(-90 16 ${(Y0+Y1)/2})">lichaamstemperatuur (°C)</text>`;
  s+=`<text x="628" y="${(Y0+Y1)/2}" class="lblm" text-anchor="middle" transform="rotate(90 628 ${(Y0+Y1)/2})">ademfrequentie (per minuut)</text>`;
  s+=`<text x="${(X0+X1)/2}" y="${Y1+40}" text-anchor="middle" class="lblm">tijd (min)</text>`;
  return FIG(s,"0 0 640 334","Lichaamstemperatuur en ademfrequentie van een hond: allebei stijgend tijdens 30 minuten lopen in de zon, daarna allebei dalend tijdens rust in de schaduw",640,560);
}
