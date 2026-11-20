/* ===== Oefentoets Gedrag: gedeelde hulpjes (havo en vwo uit één bron) ===== */
const VWO=/*@@VWO@@*/false;
let QN=0,ON=0;
/* vraag(punten, onderwerp, build(q,id), stof?) -> id; stof = {titel, html, anim?, films?} voor 'Uitleg van de stof' */
function vraag(pts,t,build,stof){const id=++QN;Q.push({id,pts,t,build:q=>build(q,id)});
  if(stof&&window.EXSTOF)EXSTOF.zet(TOOL,[id],stof);return id;}
/* opgave(kort, titel, inleiding, ids); zonder inleiding (losse vraag) een korte regel */
function opgave(kort,titel,html,ids){const nr=++ON;
  OPG.push({nr,kort,titel,ids,ctx:`<div class="pkop"><span class="mono">Toetstekst · ${html?"inleiding ":""}opgave ${nr}</span></div>`+
    (html||`<p class="muted" style="margin:0">Bij deze opgave hoort geen inleiding: de vraag staat hieronder.</p>`)});}
/* films van het thema (hrefs als in HOOFDSTUKKEN.gedrag.films) */
const F={
  wdd:["Waarom doet een dier wat het doet?","films/gedrag/1-waarom-doet-een-dier-wat-het-doet.html"],
  inp:["Inprenting en de sensitieve periode","films/gedrag/2-inprenting-en-de-sensitieve-periode.html"],
  balts:["Baltsen en kiezen","films/gedrag/3-baltsen-en-kiezen.html"],
  hecht:["Hechting: van baby tot verliefd","films/gedrag/4-hechting.html"],
  emo:["Emotieregulatie","films/gedrag/5-emotieregulatie.html"],
  attr:["Wiens schuld is het? Interne en externe attributie","films/gedrag/6-attributie.html"],
  leren:["Leren: van Pavlov tot je telefoon","films/gedrag/7-leren.html"],
  bij:["De dans van de honingbij","films/gedrag/8-honingbij.html"],
  mier:["Een mierenkolonie zonder baas","films/gedrag/9-mierenkolonie.html"],
  help:["Waarom helpen dieren elkaar?","films/gedrag/10-helpen.html"],
  slim:["Slimme dieren","films/gedrag/11-slimme-dieren.html"],
  exp:["Beroemde psychologie-experimenten","films/gedrag/12-psychologie-experimenten.html"]};
/* begin van een vraag: vraagzin, hulp- en antwoordvak */
function start(q,html){q.append(el("p",{class:"qtext"},html));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  return {think,ans,unlock};}
/* vraag met uitspraken (juist/onjuist): vaste opbouw */
function uitspraken(q,inleiding,lijst){pre(q,`<p>${inleiding}</p>`);
  q.append(el("p",{class:"qtext"},lijst.map((t,i)=>`${i+1} ${t}`).join("<br>")+"<br><br><b>Geef bij elke uitspraak aan of hij juist of onjuist is.</b>"));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  return {think,ans,unlock};}
const B=t=>`<b>${t}</b>`;
const TABEL=(nr,kop,rijen,titel)=>(titel?`<div class="eyebrow">tabel ${nr}</div><p style="margin:2px 0 6px;font-size:15px">${titel}</p>`:`<div class="eyebrow">tabel ${nr}</div>`)+
  `<div class="tablewrap"><table class="data"><tr>${kop.map(k=>`<th>${k}</th>`).join("")}</tr>${rijen.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</table></div>`;

/* Afbeelding 1 van opgave 'Zalmen ruiken hun rivier': zelfde fictieve punten als eigen/figuren/gedrag/maak.py (D-1)
   in kamieljacobs/toetsen-biologie. opties: band = [van, tot, kleur, tekst] (verticale band), lijn50 = stippellijn 50 % benadrukken,
   kwek = [tot maand, tekst] (balk 'in de kwekerij' onder de as), dimPunten = punten vaag. */
const ZALM_PT=[[6,51],[12,53],[15,74],[18,90],[21,63],[24,50]];
function ZALM({band=null,lijn50=false,kwek=null,dimPunten=false,controle=false}={}){
  const X0=78,X1=610,Y0=330,Y1=30,xs=m=>X0+(m-4)*(X1-X0)/22,ys=p=>Y0-p*(Y0-Y1)/100;
  let s="";
  if(band)s+=`<rect x="${xs(band[0])}" y="${Y1}" width="${xs(band[1])-xs(band[0])}" height="${Y0-Y1}" fill="${band[2]}" opacity=".2"/>`+
    (band[3]?`<text x="${(xs(band[0])+xs(band[1]))/2}" y="${Y1+16}" text-anchor="middle" class="lbl">${band[3]}</text>`:"");
  [0,20,40,60,80,100].forEach(v=>s+=`<path d="M${X0},${ys(v)} H${X1}" stroke="var(--line)" stroke-width="1"/><text x="${X0-10}" y="${ys(v)+4}" text-anchor="end" class="lblm">${v}</text>`);
  [6,9,12,15,18,21,24].forEach(m=>s+=`<path d="M${xs(m)},${Y0} v6" stroke="var(--text2)" stroke-width="1.2"/><text x="${xs(m)}" y="${Y0+22}" text-anchor="middle" class="lblm">${m}</text>`);
  s+=`<path d="M${X0},${Y1-6} V${Y0} H${X1+8}" fill="none" stroke="var(--text2)" stroke-width="1.4"/>`;
  s+=`<path d="M${X0},${ys(50)} H${X1}" stroke="${lijn50?"var(--goud)":"var(--text2)"}" stroke-width="${lijn50?2.4:1.2}" stroke-dasharray="6 5"/><text x="${xs(4.4)}" y="${ys(50)-6}" class="lblm">50 %</text>`;
  if(controle)s+=`<circle cx="${xs(25.2)}" cy="${ys(50)}" r="7" fill="none" stroke="var(--goud)" stroke-width="2.6"/><text x="${xs(25.2)}" y="${ys(50)+24}" text-anchor="middle" class="lbl">?</text>`;
  const op=dimPunten?.3:1;
  s+=`<path d="${ZALM_PT.map(([m,p],i)=>`${i?"L":"M"}${xs(m)},${ys(p)}`).join(" ")}" fill="none" stroke="var(--text)" stroke-width="2" opacity="${op}"/>`;
  ZALM_PT.forEach(([m,p])=>s+=`<circle cx="${xs(m)}" cy="${ys(p)}" r="5" fill="var(--text)" opacity="${op}"/>`);
  if(kwek)s+=`<rect x="${X0}" y="${Y0+34}" width="${xs(kwek[0])-X0}" height="12" rx="4" fill="var(--teal)" opacity=".7"/><text x="${xs(kwek[0])+8}" y="${Y0+44}" class="lbl">${kwek[1]}</text>`;
  s+=`<text x="${(X0+X1)/2}" y="${kwek?Y0+70:Y0+48}" text-anchor="middle" class="lblm">leeftijd tijdens de week met morfoline (maanden)</text>`;
  s+=`<text x="20" y="${(Y0+Y1)/2}" text-anchor="middle" class="lblm" transform="rotate(-90 20 ${(Y0+Y1)/2})">kiest de tak met morfoline (%)</text>`;
  const H=kwek?Y0+82:Y0+60;
  return `<div class="vpfig" style="max-width:640px;margin:0 auto;width:100%;--min:520px">`+svgWrap(`0 0 640 ${H}`,s,"Teruggekeerde zalmen die de tak met morfoline kozen, per leeftijd tijdens de week met morfoline")+`</div>`;}

/* staafjes voor tabel 2 (neushoorns na het stoppen van de beloning); toon = aantal dagen zichtbaar */
function UITDOOF({toon=3,hl=null}={}){
  const D={Bao:[20,9,2],Mila:[20,17,14]},X0=70,Y0=210,h=v=>v*8;let s="";
  [0,5,10,15,20].forEach(v=>s+=`<path d="M${X0},${Y0-h(v)} H600" stroke="var(--line)" stroke-width="1"/><text x="${X0-10}" y="${Y0-h(v)+4}" text-anchor="end" class="lblm">${v}</text>`);
  s+=`<path d="M${X0},20 V${Y0} H600" fill="none" stroke="var(--text2)" stroke-width="1.4"/>`;
  [0,1,2].forEach(d=>{const gx=X0+30+d*175;
    s+=`<text x="${gx+60}" y="${Y0+22}" text-anchor="middle" class="lblm">dag ${d+1}</text>`;
    if(d>=toon)return;
    [["Bao","var(--teal)"],["Mila","var(--goud)"]].forEach(([n,c],k)=>{const v=D[n][d],x=gx+k*62;
      s+=`<rect x="${x}" y="${Y0-h(v)}" width="52" height="${h(v)}" rx="3" fill="${c}" opacity="${hl&&hl!==n?.3:.85}"/><text x="${x+26}" y="${Y0-h(v)-6}" text-anchor="middle" class="lbl">${v}</text>`;});});
  s+=`<rect x="420" y="14" width="14" height="14" fill="var(--teal)"/><text x="440" y="26" class="lbl">Bao</text><rect x="500" y="14" width="14" height="14" fill="var(--goud)"/><text x="520" y="26" class="lbl">Mila</text>`;
  return `<div class="vpfig" style="max-width:620px;margin:0 auto;width:100%;--min:480px">`+svgWrap("0 0 620 240",s,"Aantal keer poot op de plank per tien minuten, Bao en Mila, dag 1 tot 3")+`</div>`;}
