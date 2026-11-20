/* ===== Oefentoets Planten (alleen vwo, 6 vwo · Nectar H20): gedeelde hulpjes ===== */
const VWO=/*@@VWO@@*/false;
let QN=0,ON=0;
/* vraag(punten, onderwerp, build(q,id), stof?) -> id; stof = {titel, html, anim?, films?} voor 'Uitleg van de stof' */
function vraag(pts,t,build,stof){const id=++QN;Q.push({id,pts,t,build:q=>build(q,id)});
  if(stof&&window.EXSTOF)EXSTOF.zet(TOOL,[id],stof);return id;}
function opgave(kort,titel,html,ids){const nr=++ON;
  OPG.push({nr,kort,titel,ids,ctx:`<div class="pkop"><span class="mono">Toetstekst · inleiding opgave ${nr}</span></div>`+html});}
/* films van het thema (hrefs als in HOOFDSTUKKEN.planten.films in index.html) */
const F={
  groei:["Hoe een plant groeit","films/transport/7-hoe-een-plant-groeit.html"],
  trans:["Transport in planten","films/transport/6-transport-in-planten.html"],
  groen:["Alles in het groen","films/stofwisseling/3-alles-in-het-groen.html"]};
/* begin van een vraag: vraagzin, hulp- en antwoordvak */
function start(q,html){q.append(el("p",{class:"qtext"},html));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  return {think,ans,unlock};}
const B=t=>`<b>${t}</b>`;
const TABEL=(nr,kop,rijen,noot)=>`<div class="eyebrow">tabel ${nr}${noot?" "+noot:""}</div><div class="tablewrap"><table class="data"><tr>${kop.map(k=>`<th>${k}</th>`).join("")}</tr>${rijen.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</table></div>`;
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");

/* Open vraag met zelf nakijken, met een eigen puntentelling: score(aantal aangevinkt) -> punten.
   Voor vragen als 'drie stappen 2 punten, twee stappen 1 punt'. */
function openScore(ans,{id,pts,checks,score,model,valkuil,placeholder,after,kop}){
  const ta=el("textarea",{id:"q"+id+"t",placeholder:placeholder||"Schrijf je antwoord…"});
  const ck=el("button",{class:"go"},"Nakijken");const tf=el("div",{class:"fb hint",hidden:""},"Schrijf eerst je antwoord op. Daarna kijk je het na.");
  ans.append(ta,ck,tf);
  ck.onclick=()=>{if(ta.value.trim().length<8){tf.hidden=false;ta.focus();return;}tf.remove();ck.remove();ta.readOnly=true;
    const ss=el("div",{class:"selfscore"});
    ss.append(el("p",{style:"margin:0"},"<b>Kijk jezelf na met het antwoordmodel.</b> "+(kop||"Vink aan wat er in jouw antwoord staat.")));
    const boxes=checks.map((c,k)=>{const lab=el("label",{},`<input type="checkbox" id="q${id}c${k}"><span>${c}</span>`);ss.append(lab);return lab.querySelector("input");});
    if(model)ss.append(el("div",{class:"model"},"<b>Voorbeeldantwoord:</b> "+model));
    if(valkuil)ss.append(el("div",{class:"fb hint"},"<b>Valkuil:</b> "+valkuil));
    const sc=el("div",{class:"score"});ss.append(sc);ans.append(ss);
    const upd=()=>{const n=boxes.filter(b=>b.checked).length;const p=Math.min(pts,score(n));sc.textContent=`${n} aangevinkt · jouw score: ${p} / ${pts}`;setScore(id,p);};
    boxes.forEach(b=>b.onchange=upd);upd();after&&after();};
}

/* Woorden invullen die de tool zelf nakijkt. fields = [[label, [stukjes die goed zijn], juiste naam]], score(n goed) -> punten.
   Spelling telt niet: kleine letters, zonder spaties en streepjes; een veld is goed als het een van de stukjes bevat. */
function woordAnswer(ans,{id,pts,fields,score,after,uitleg}){
  const norm=s=>s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[\s\-–.]/g,"");
  const inps=fields.map(([lab],k)=>{const r=el("div",{class:"row"});const fid="q"+id+"w"+k;
    r.append(el("label",{for:fid,class:"sellab"},lab));const i=el("input",{class:"num woord",id:fid,autocomplete:"off",spellcheck:"false",style:"width:220px;font-family:var(--tekst)"});r.append(i);ans.append(r);return i;});
  const ck=el("button",{class:"go"},"Nakijken"),fb=el("div",{class:"fb",hidden:""});ans.append(ck,fb);
  ck.onclick=()=>{if(inps.some(i=>!i.value.trim())){fb.hidden=false;fb.className="fb hint";fb.textContent="Vul eerst alles in.";return;}
    const res=fields.map((f,k)=>f[1].some(s=>norm(inps[k].value).includes(norm(s))));
    const n=res.filter(Boolean).length,p=Math.min(pts,score(n));inps.forEach(i=>i.disabled=true);ck.remove();
    fb.hidden=false;fb.className="fb "+(p===pts?"ok":"no");
    fb.innerHTML=`${n} van de ${fields.length} goed: <b>${p} ${p===1?"punt":"punten"}</b>.<br>`+fields.map((f,k)=>`${res[k]?"✓":"✗"} ${f[0]} ${f[2]}`).join("<br>");
    setScore(id,p);if(uitleg)waaromBtn(ans,uitleg);after&&after();};
}

/* Gemengd antwoord: onderdelen die de tool nakijkt (getal of keuze, elk 1 punt) plus uitleg die je zelf nakijkt (vinkjes, elk 1 punt).
   auto = [{label, unit?, ok:(v, alle getallen)=>bool, toon}] voor een getal, of [{label, opts:[...], right, toon}] voor een keuze;
   checks = zelf nakijken (na 'Nakijken'); tekst = vraag boven het tekstvak voor de uitleg. */
function mixAnswer(ans,{id,pts,auto,checks=[],tekst,model,valkuil,after}){
  const vals=[];
  const parts=auto.map((a,k)=>{const r=el("div",{class:"row"});const fid="q"+id+"m"+k;
    r.append(el("label",{for:fid,class:"sellab"},a.label));
    if(a.opts){const box=el("span",{class:"row",style:"gap:8px"});a.opts.forEach((o,j)=>{const at={class:"chip","aria-pressed":"false"};if(!j)at.id=fid;const b=el("button",at,o);
      b.onclick=()=>{vals[k]=j;box.querySelectorAll(".chip").forEach(c=>c.setAttribute("aria-pressed",c===b?"true":"false"));};box.append(b);});r.append(box);}
    else{const i=el("input",{class:"num",id:fid,inputmode:"decimal"});i.oninput=()=>{vals[k]=parseFloat((i.value||"").replace(",","."));};r.append(i);if(a.unit)r.append(el("span",{class:"muted"},a.unit));}
    ans.append(r);return r;});
  let ta=null;
  if(checks.length){if(tekst)ans.append(el("p",{style:"margin:6px 0 0"},tekst));ta=el("textarea",{id:"q"+id+"t",placeholder:"Schrijf je uitleg…"});ans.append(ta);}
  const ck=el("button",{class:"go"},"Nakijken"),fb=el("div",{class:"fb",hidden:""});ans.append(ck,fb);
  ck.onclick=()=>{
    if(auto.some((a,k)=>vals[k]===undefined||Number.isNaN(vals[k]))){fb.hidden=false;fb.className="fb hint";fb.textContent="Vul eerst alles in.";return;}
    if(ta&&ta.value.trim().length<8){fb.hidden=false;fb.className="fb hint";fb.textContent="Schrijf eerst je uitleg op. Daarna kijk je het na.";ta.focus();return;}
    ck.remove();parts.forEach(r=>r.querySelectorAll("input,button").forEach(x=>x.disabled=true));if(ta)ta.readOnly=true;
    const res=auto.map((a,k)=>a.opts?vals[k]===a.right:!!a.ok(vals[k],vals));const na=res.filter(Boolean).length;
    fb.hidden=false;fb.className="fb "+(na===auto.length?"ok":"no");
    fb.innerHTML=`<b>Door de tool nagekeken: ${na} van de ${auto.length} ${auto.length===1?"punt":"punten"}.</b><br>`+auto.map((a,k)=>`${res[k]?"✓":"✗"} ${a.toon}`).join("<br>");
    const sc=el("div",{class:"score"});
    let boxes=[];
    if(checks.length){const ss=el("div",{class:"selfscore"});ss.append(el("p",{style:"margin:0"},"<b>Kijk je uitleg zelf na met het antwoordmodel.</b> Vink aan wat er in jouw antwoord staat."));
      boxes=checks.map((c,k)=>{const lab=el("label",{},`<input type="checkbox" id="q${id}c${k}"><span>${c} <span class="pts">1p</span></span>`);ss.append(lab);return lab.querySelector("input");});
      ss.append(sc);ans.append(ss);}
    else ans.append(sc);
    if(model)ans.append(el("div",{class:"model"},"<b>Voorbeeldantwoord:</b> "+model));
    if(valkuil)ans.append(el("div",{class:"fb hint"},"<b>Valkuil:</b> "+valkuil));
    const upd=()=>{const p=Math.min(pts,na+boxes.filter(b=>b.checked).length);sc.textContent=`Jouw score: ${p} / ${pts}`;setScore(id,p);};
    boxes.forEach(b=>b.onchange=upd);upd();after&&after();};
}

/* Grafiek netto CO₂-opname tegen lichtintensiteit (afbeelding 1 van de vertical farm). Zelfde modelkrommen als
   eigen/figuren/planten/maak.py in kamieljacobs/toetsen-biologie: normaal 14·L/(150+L) − 2, extra CO₂ 20·L/(214+L) − 2.
   opties: krommen = [{f, streep, naam, op}], band = [{x, kleur}], stip = [{x, y, kleur, tekst}], bruto = [x, laag, hoog],
   ymin/ymax/xmax, legenda (true/false). Alleen kleuren uit de huisstijl, dus licht en donker werken. */
const SLA={norm:L=>14*L/(150+L)-2, extra:L=>20*L/(214+L)-2};
function GRAF({krommen=[{f:SLA.norm,streep:"",naam:"normaal CO₂-gehalte"},{f:SLA.extra,streep:"9 6",naam:"extra CO₂"}],band=[],stip=[],bruto=null,
  ymin=-4,ymax=14,ystap=2,xmax=600,xstap=100,legenda=true,xtitel="lichtintensiteit (µmol fotonen per m² per s)",ytitel="netto CO₂-opname (mg per uur per plant)",label="Netto CO₂-opname van een slaplant bij verschillende lichtintensiteiten"}={}){
  const X0=72,X1=612,Y0=24,Y1=344;
  const xs=L=>X0+L*(X1-X0)/xmax, ys=v=>Y0+(ymax-v)*(Y1-Y0)/(ymax-ymin);
  let s="";
  band.forEach(b=>s+=`<rect x="${xs(b.x)-10}" y="${Y0}" width="20" height="${Y1-Y0}" fill="${b.kleur}" opacity=".22"/>`);
  for(let L=0;L<=xmax;L+=xstap)s+=`<path d="M${xs(L)},${Y0} V${Y1}" stroke="var(--line)" stroke-width="1"/><text x="${xs(L)}" y="${Y1+18}" text-anchor="middle" class="lblm">${L}</text>`;
  for(let v=ymin;v<=ymax;v+=ystap)s+=`<path d="M${X0},${ys(v)} H${X1}" stroke="var(--line)" stroke-width="1"/><text x="${X0-10}" y="${ys(v)+4}" text-anchor="end" class="lblm">${String(v).replace("-","−")}</text>`;
  s+=`<path d="M${X0},${Y0} V${Y1} H${X1}" fill="none" stroke="var(--text2)" stroke-width="1.4"/><path d="M${X0},${ys(0)} H${X1}" stroke="var(--text)" stroke-width="1.3"/>`;
  krommen.forEach(k=>{let d="";for(let L=0;L<=xmax;L+=4)d+=`${L?"L":"M"}${xs(L).toFixed(1)},${ys(k.f(L)).toFixed(1)} `;
    s+=`<path d="${d}" fill="none" stroke="${k.kleur||"var(--text)"}" stroke-width="2.6" stroke-dasharray="${k.streep||""}" opacity="${k.op??1}" stroke-linejoin="round"/>`;});
  if(bruto){const [x,lo,hi]=bruto;s+=`<path d="M${xs(x)+16},${ys(lo)} V${ys(hi)}" stroke="var(--goud)" stroke-width="4"/><path d="M${xs(x)+8},${ys(lo)} h16 M${xs(x)+8},${ys(hi)} h16" stroke="var(--goud)" stroke-width="2"/>`;}
  stip.forEach(p=>{s+=`<circle cx="${xs(p.x)}" cy="${ys(p.y)}" r="6" fill="${p.kleur||"var(--goud)"}"/>`;if(p.tekst)s+=`<text x="${xs(p.x)+(p.links?-10:10)}" y="${ys(p.y)-10}" text-anchor="${p.links?"end":"start"}" class="lbl">${p.tekst}</text>`;});
  if(legenda)krommen.forEach((k,i)=>{const lx=X1-210,ly=Y1-46+i*22;s+=`<path d="M${lx},${ly} h36" stroke="${k.kleur||"var(--text)"}" stroke-width="2.6" stroke-dasharray="${k.streep||""}" opacity="${k.op??1}"/><text x="${lx+44}" y="${ly+4}" class="lbl">${k.naam}</text>`;});
  s+=`<text x="${(X0+X1)/2}" y="${Y1+40}" text-anchor="middle" class="lblm">${xtitel}</text>`;
  s+=`<text x="18" y="${(Y0+Y1)/2}" class="lblm" text-anchor="middle" transform="rotate(-90 18 ${(Y0+Y1)/2})">${ytitel}</text>`;
  return `<div class="plfig" style="max-width:640px;margin:0 auto;width:100%;--min:540px">`+svgWrap("0 0 630 396",s,label)+`</div>`;}
