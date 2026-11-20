/* ===== Oefentoets Ecologie en milieu: gedeelde hulpjes (havo en vwo uit één bron) ===== */
const VWO=/*@@VWO@@*/false;
let QN=0,ON=0;
/* vraag(punten, onderwerp, build(q,id), stof?) -> id; stof = {titel, html, anim?, films?} voor 'Uitleg van de stof' */
function vraag(pts,t,build,stof){const id=++QN;Q.push({id,pts,t,build:q=>build(q,id)});
  if(stof&&window.EXSTOF)EXSTOF.zet(TOOL,[id],stof);return id;}
/* opgave zonder inleiding (alleen een kopje, zoals in de Word-toets): html leeg, dan geen wit inleidingsvak */
function opgave(kort,titel,html,ids){const nr=++ON;
  OPG.push({nr,kort,titel,ids,ctx:html?`<div class="pkop"><span class="mono">Toetstekst · inleiding opgave ${nr}</span></div>`+html:""});}
/* films van de thema's Ecologie en Mens en milieu (hrefs als in HOOFDSTUKKEN.ecologie.films en HOOFDSTUKKEN.milieu.films) */
const F={
  pop:["Hoeveel passen er?","films/ecologie/1-hoeveel-passen-er.html"],
  soort:["Waar past een soort?","films/ecologie/2-waar-past-een-soort.html"],
  eet:["Wie eet wie?","films/ecologie/3-wie-eet-wie.html"],
  blad:["Waar blijft het blad?","films/ecologie/4-waar-blijft-het-blad.html"],
  energie:["Waarom zo weinig roofdieren?","films/ecologie/5-waarom-zo-weinig-roofdieren.html"],
  c:["Koolstof gaat rond","films/ecologie/6-koolstof-gaat-rond.html"],
  n:["Stikstof gaat rond","films/ecologie/7-stikstof-gaat-rond.html"],
  zand:["Van zand tot bos","films/ecologie/8-van-zand-tot-bos.html"],
  aarde:["Eén aarde","films/ecologie/3-een-aarde.html"],
  ingrijpen:["Ingrijpen of laten gaan?","films/ecologie/4-ingrijpen-of-laten-gaan.html"],
  grenzen:["Binnen de grenzen","films/ecologie/5-binnen-de-grenzen.html"]};
/* begin van een vraag: vraagzin, hulp- en antwoordvak */
function start(q,html){q.append(el("p",{class:"qtext"},html));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  return {think,ans,unlock};}
const B=t=>`<b>${t}</b>`;
const TABEL=(nr,kop,rijen,noot)=>`<div class="eyebrow">tabel ${nr}${noot?" (fictieve gegevens)":""}</div><div class="tablewrap"><table class="data"><tr>${kop.map(k=>`<th>${k}</th>`).join("")}</tr>${rijen.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</table></div>`;
/* getal uit een invoerveld: 0,6 / 0.6 / 9.000 / 9 000 */
function getal(s){s=(s||"").trim().replace(/\s/g,"");if(/^\d{1,3}(\.\d{3})+$/.test(s))s=s.replace(/\./g,"");return parseFloat(s.replace(",","."));}
/* rekenvraag: berekening opschrijven + uitkomst. De uitkomst kijkt de tool na (1 scorepunt), de stappen van de
   berekening of de uitleg vink je zelf aan (de andere scorepunten), zoals in het antwoordmodel. */
function rekenOpen(ans,{id,pts,veld:[lab,eenheid,test,goed],checks,model,valkuil,after}){
  const ta=el("textarea",{id:"q"+id+"t",placeholder:"Schrijf je berekening (en uitleg) op…"});
  const r=el("div",{class:"row"});const fid="q"+id+"u";
  r.append(el("label",{for:fid,class:"sellab"},lab));const inp=el("input",{class:"num",id:fid,inputmode:"decimal"});r.append(inp,el("span",{class:"muted"},eenheid));
  const ck=el("button",{class:"go"},"Nakijken");const tf=el("div",{class:"fb hint",hidden:""});
  ans.append(ta,r,ck,tf);
  ck.onclick=()=>{const v=getal(inp.value);
    if(isNaN(v)){tf.hidden=false;tf.textContent="Vul je uitkomst in het vakje in.";inp.focus();return;}
    if(ta.value.trim().length<4){tf.hidden=false;tf.textContent="Schrijf ook je berekening op. Daarna kijk je het na.";ta.focus();return;}
    tf.remove();ck.remove();ta.readOnly=true;inp.disabled=true;
    const ok=test(v);
    const fb=el("div",{class:"fb "+(ok?"ok":"no")},`${ok?"✓":"✗"} Uitkomst: ${goed} <span class="pts">${ok?1:0}p</span>`);ans.append(fb);
    const ss=el("div",{class:"selfscore"});
    ss.append(el("p",{style:"margin:0"},"<b>Kijk de rest zelf na met het antwoordmodel.</b> Vink aan wat er in jouw antwoord staat."));
    const boxes=checks.map((c,k)=>{const l=el("label",{},`<input type="checkbox" id="q${id}c${k}"><span>${c} <span class="pts">1p</span></span>`);ss.append(l);return l.querySelector("input");});
    if(model)ss.append(el("div",{class:"model"},"<b>Voorbeeldantwoord:</b> "+model));
    if(valkuil)ss.append(el("div",{class:"fb hint"},"<b>Valkuil:</b> "+valkuil));
    const sc=el("div",{class:"score"});ss.append(sc);ans.append(ss);
    const upd=()=>{const p=Math.min(pts,(ok?1:0)+boxes.filter(b=>b.checked).length);sc.textContent=`Jouw score: ${p} / ${pts}`;setScore(id,p);};
    boxes.forEach(b=>b.onchange=upd);upd();after&&after();};
}
/* kleine SVG-hulpjes (kleuren alleen via css-variabelen, werkt in licht en donker) */
const SVG=(vb,inner,label,maxw=560)=>`<div class="vpfig" style="max-width:${maxw}px;margin:0 auto;width:100%;--min:${Math.min(+vb.split(" ")[2],320)}px">`+svgWrap(vb,inner,label)+`</div>`;
const T=(x,y,t,cls="lblm",anchor="middle",extra="")=>`<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}" ${extra}>${t}</text>`;
