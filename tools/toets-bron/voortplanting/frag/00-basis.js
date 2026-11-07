/* ===== Oefentoets Voortplanting: gedeelde hulpjes (havo en vwo uit één bron) ===== */
const VWO=/*@@VWO@@*/false;
let QN=0,ON=0;
/* vraag(punten, onderwerp, build(q,id), stof?) -> id; stof = {titel, html, anim?, films?} voor 'Uitleg van de stof' */
function vraag(pts,t,build,stof){const id=++QN;Q.push({id,pts,t,build:q=>build(q,id)});
  if(stof&&window.EXSTOF)EXSTOF.zet(TOOL,[id],stof);return id;}
function opgave(kort,titel,html,ids){const nr=++ON;
  OPG.push({nr,kort,titel,ids,ctx:`<div class="pkop"><span class="mono">Toetstekst · inleiding opgave ${nr}</span></div>`+html});}
/* films van het thema (hrefs als in HOOFDSTUKKEN.voortplanting.films); film 3 is alleen voor vwo */
const F={
  cel:["Celdeling","films/voortplanting/celdeling/index.html"],
  org:["Geslachtsorganen en puberteit","films/voortplanting/2-geslachtsorganen-puberteit.html"],
  baby:["Van bevruchting tot baby","films/voortplanting/1-precies-op-tijd.html"],
  sekse:["Sekse, gender en diversiteit","films/voortplanting/4-sekse-gender-diversiteit.html"],
  anti:["Anticonceptie, soa's en voortplantingstechniek","films/voortplanting/3-anticonceptie-soa-voortplantingstechniek.html"]};
const FV=(...f)=>f.filter(x=>VWO||x!==F.baby);
/* begin van een vraag: vraagzin, hulp- en antwoordvak */
function start(q,html){q.append(el("p",{class:"qtext"},html));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  return {think,ans,unlock};}
const B=t=>`<b>${t}</b>`;
const TABEL=(nr,kop,rijen,noot)=>`<div class="eyebrow">tabel ${nr}</div><div class="tablewrap"><table class="data"><tr>${kop.map(k=>`<th>${k}</th>`).join("")}</tr>${rijen.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</table></div>`+(noot?`<p class="muted" style="font-size:14px;margin:4px 0 0">${noot}</p>`:"");

/* Cyclusgrafiek (afbeelding 1 van opgave 2): zelfde vereenvoudigde krommen als eigen/figuren/voortplanting/maak.py
   in kamieljacobs/toetsen-biologie (vorm naar het bekende verloop, geen meetgegevens). opties: hl = {dag: kleur} (verticale
   band), toon = welke lijnen ('LH','FSH','oe','pr','t'); dim = lijnen die vaag worden. */
const CYC=(()=>{
  const g=(x,mu,s,h)=>h*Math.exp(-0.5*((x-mu)/s)**2);
  const d=[...Array(28)].map((_,i)=>i+1);
  const lh=d.map(x=>6+g(x,13,0.8,70)),fsh=d.map(x=>10+g(x,3,3,6)+g(x,13,0.9,14)-g(x,21,4,4)),
    oe=d.map(x=>8+g(x,12.5,2,42)+g(x,21,3,18)),pr=d.map(x=>2+g(x,21,3.3,60));
  const ruis=[0.03,-0.02,0.01,0,-0.03,0.02,0,0.01,-0.02,0.02,0,-0.01,0,0.01,0,0.02,-0.01,0,0.02,-0.02,0.01,0,0.02,-0.01,0,0.01,-0.02,0];
  const t=d.map((x,i)=>(x<=14?36.45:36.85)+(x===13?-0.08:0)+(x===15?-0.2:0)+(x===28?-0.3:0)+ruis[i]);
  return {d,lh,fsh,oe,pr,t};})();
function CYCLUS({hl={},dim=[],toon=["LH","FSH","oe","pr","t"]}={}){
  const X0=70,X1=620,xs=dag=>X0+(dag-1)*(X1-X0)/27;
  const yA=c=>250-c*2.6, yT=v=>400-(v-36.1)*95;
  const pad=a=>a.map((v,i)=>`${i?"L":"M"}${xs(i+1).toFixed(1)},${v.toFixed(1)}`).join(" ");
  const L=[["LH",CYC.lh,"var(--goud)","",2.6],["FSH",CYC.fsh,"var(--groen)","2 5",2.6],["oe",CYC.oe,"var(--koraal)","9 5",2.4],["pr",CYC.pr,"var(--paars)","",4]];
  const NAAM={LH:"LH",FSH:"FSH",oe:"oestrogeen",pr:"progesteron"};
  let s="";
  for(const dag in hl)s+=`<rect x="${xs(+dag)-9}" y="22" width="18" height="388" fill="${hl[dag]}" opacity=".22"/>`;
  [1,4,7,10,13,16,19,22,25,28].forEach(k=>s+=`<path d="M${xs(k)},26 V410" stroke="var(--line)" stroke-width="1"/><text x="${xs(k)}" y="428" text-anchor="middle" class="lblm">${k}</text>`);
  s+=`<path d="M${X0-8},26 V250 H${X1+8}" fill="none" stroke="var(--text2)" stroke-width="1.4"/>`;
  [0,20,40,60,80].forEach(v=>s+=`<text x="${X0-14}" y="${yA(v)+4}" text-anchor="end" class="lblm">${v}</text>`);
  s+=`<text x="16" y="140" class="lblm" text-anchor="middle" transform="rotate(-90 16 140)">concentratie (relatief)</text>`;
  L.forEach(([k,a,c,da,w],i)=>{if(!toon.includes(k))return;const op=dim.includes(k)?.25:1;
    s+=`<path d="${pad(a.map(yA))}" fill="none" stroke="${c}" stroke-width="${w}" stroke-dasharray="${da}" opacity="${op}" stroke-linejoin="round"/>`;
    const lx=90+(i%2)*150,ly=40+Math.floor(i/2)*22;
    s+=`<path d="M${lx},${ly} h34" stroke="${c}" stroke-width="${w}" stroke-dasharray="${da}" opacity="${op}"/><text x="${lx+42}" y="${ly+4}" class="lbl">${NAAM[k]}</text>`;});
  s+=`<path d="M${X0-8},300 V410 H${X1+8}" fill="none" stroke="var(--text2)" stroke-width="1.4"/>`;
  [36.2,36.6,37.0].forEach(v=>s+=`<text x="${X0-14}" y="${yT(v)+4}" text-anchor="end" class="lblm">${String(v.toFixed(1)).replace(".",",")}</text>`);
  s+=`<text x="16" y="355" class="lblm" text-anchor="middle" transform="rotate(-90 16 355)">temp. (°C)</text>`;
  if(toon.includes("t")){const op=dim.includes("t")?.25:1;s+=`<path d="${pad(CYC.t.map(yT))}" fill="none" stroke="var(--text)" stroke-width="1.6" opacity="${op}"/>`;
    CYC.t.forEach((v,i)=>s+=`<circle cx="${xs(i+1)}" cy="${yT(v)}" r="3.2" fill="var(--text)" opacity="${op}"/>`);}
  s+=`<text x="${(X0+X1)/2}" y="448" text-anchor="middle" class="lblm">dag van de cyclus (dag 1 = eerste dag van de menstruatie)</text>`;
  return `<div class="vpfig" style="max-width:640px;margin:0 auto;width:100%;--min:560px">`+svgWrap("0 0 640 456",s,"Hormoonconcentraties en basale lichaamstemperatuur tijdens een cyclus van 28 dagen")+`</div>`;}
