/* ===== Oefentoets Regeling: gedeelde hulpjes (havo en vwo uit één bron) ===== */
const VWO=/*@@VWO@@*/false;
let QN=0,ON=0;
/* vraag(punten, onderwerp, build(q,id), stof?) -> id; stof = {titel, html, anim?, films?} voor 'Uitleg van de stof' */
function vraag(pts,t,build,stof){const id=++QN;Q.push({id,pts,t,build:q=>build(q,id)});
  if(stof&&window.EXSTOF)EXSTOF.zet(TOOL,[id],stof);return id;}
function opgave(kort,titel,html,ids){const nr=++ON;
  OPG.push({nr,kort,titel,ids,ctx:`<div class="pkop"><span class="mono">Toetstekst · inleiding opgave ${nr}</span></div>`+html});}
const GEEN_INLEIDING=`<p class="muted" style="font-size:15px">Deze opgave heeft geen inleiding: de vraag staat hieronder.</p>`;
/* films van het thema (hrefs als in HOOFDSTUKKEN.regeling.films in index.html) */
const F={
  post:["Post voor iedereen","films/hormonen/1-post-voor-iedereen.html"],
  suiker:["Suiker in balans","films/hormonen/2-suiker-in-balans.html"],
  baas:["De baas van de klieren","films/hormonen/3-de-baas-van-de-klieren.html"],
  stress:["Stress","films/hormonen/4-stress.html"],
  sec:["Eén seconde","films/zenuwstelsel/1-een-seconde.html"],
  kabel:["Het kabelnetwerk","films/zenuwstelsel/2-het-kabelnetwerk.html"],
  spleet:["De spleet","films/zenuwstelsel/3-de-spleet.html"],
  knoei:["Knoeien met de synaps","films/zenuwstelsel/4-knoeien-met-de-spleet.html"],
  hoofd:["Het hoofdkantoor","films/zenuwstelsel/5-het-hoofdkantoor.html"],
  zin:["Zintuigen","films/zenuwstelsel/8-zintuigen.html"],
  spier:["Spieren en beweging","films/zenuwstelsel/9-spieren-en-beweging.html"]};
/* begin van een vraag: vraagzin, hulp- en antwoordvak */
function start(q,html){q.append(el("p",{class:"qtext"},html));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  return {think,ans,unlock};}
const B=t=>`<b>${t}</b>`;
const AFB=(nr,extra)=>`<p class="afb">Afbeelding ${nr}${extra?` <span style="text-transform:none;letter-spacing:0;font-weight:400">(${extra})</span>`:""}</p>`;
const FIG=(min,max,vb,s,label)=>`<div class="tfig" style="max-width:${max}px;--min:${min}px">`+svgWrap(vb,s,label)+`</div>`;
const NOG=(nr,html)=>`<details class="ctxd"><summary>Afbeelding ${nr} nog eens</summary>${html}</details>`;
let MK=0;
/* inBeeld: op de telefoon scrolt een brede figuur (.tfig) binnen zijn vak; zet het oplichtende deel (fx = 0–1 van de breedte) in beeld */
function inBeeld(stg,fx){const f=stg.querySelector(".tfig");if(!f)return;
  requestAnimationFrame(()=>{if(f.scrollWidth>f.clientWidth+1)f.scrollLeft=fx==null?0:Math.max(0,fx*f.scrollWidth-f.clientWidth/2);});}
const pijlDef=(id,kleur="var(--text)")=>`<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${kleur}"/></marker></defs>`;

/* selectPunten: keuzelijsten, per groep rijen 1 punt als alle rijen van die groep goed zijn */
function selectPunten(ans,{id,uid,rows,groepen,after,intro}){
  if(intro)ans.append(el("p",{style:"margin:0"},intro));
  const sels=rows.map(([lab,opts],k)=>{const r=el("div",{class:"row"});const sid=uid+"a"+k;
    r.append(el("label",{for:sid,class:"sellab"},lab));const sel=el("select",{id:sid});sel.append(el("option",{value:""},"kies…"));
    opts.forEach((o,j)=>sel.append(el("option",{value:j},o)));r.append(sel);ans.append(r);return sel;});
  const ck=el("button",{class:"go"},"Nakijken"),fb=el("div",{class:"fb",hidden:""});ans.append(ck,fb);
  ck.onclick=()=>{if(sels.some(x=>x.value==="")){fb.hidden=false;fb.className="fb hint";fb.textContent="Vul eerst alles in.";return;}
    const goed=sels.map((x,k)=>+x.value===rows[k][2]);const p=groepen.filter(g=>g.every(k=>goed[k])).length;
    sels.forEach(x=>x.disabled=true);ck.remove();fb.hidden=false;fb.className="fb "+(p===groepen.length?"ok":"no");
    fb.innerHTML=`<b>${p} ${p===1?"punt":"punten"}</b> (per deel alleen een punt als dat hele deel goed is).<br>`+rows.map(([lab,opts,r],k)=>`${goed[k]?"✓":"✗"} ${lab}: ${opts[r]}`).join("<br>");
    setScore(id,p);after&&after();};
}

/* ---------- Afbeelding 1: regelkring van cortisol (naar eigen/figuren/regeling/A-1.png) ----------
   vul = 0 leeg, 1 organen, 2 + tekens P en Q, 3 + tekens R en S (voor 'laat zien waarom'); hl = lijst van onderdelen die oplichten ('P','Q','R','S','1','2','3') */
function SCHEMA_CORT({vul=0,hl=[]}={}){
  const m="mk"+(++MK);let s=pijlDef(m);
  const on=k=>hl.includes(k);
  const doos=(cx,cy,w,h,t,k)=>`<rect x="${cx-w/2}" y="${cy-h/2}" width="${w}" height="${h}" rx="8" fill="${on(k)?"var(--goud-soft)":"var(--surface)"}" stroke="${on(k)?"var(--goud)":"var(--text)"}" stroke-width="${on(k)?2.6:1.8}"/><text x="${cx}" y="${cy+6}" text-anchor="middle" style="fill:var(--text);font:700 ${vul&&k?16:18}px var(--tekst)">${t}</text>`;
  const teken={P:"+",Q:"+",R:"−",S:"−"};
  const cirkel=(cx,cy,k)=>{const t=(vul>=2&&"PQ".includes(k))||(vul>=3&&"RS".includes(k))?teken[k]:"";const kl=t==="+"?"var(--groen)":"var(--koraal)";
    return `<circle cx="${cx}" cy="${cy}" r="17" fill="${on(k)?"var(--goud-soft)":"var(--surface)"}" stroke="${on(k)?"var(--goud)":"var(--text)"}" stroke-width="${on(k)?2.6:1.6}"/>`+(t?`<text x="${cx}" y="${cy+8}" text-anchor="middle" style="fill:${kl};font:700 24px var(--tekst)">${t}</text>`:"");};
  const lijn=(d,st="")=>`<path d="${d}" fill="none" stroke="var(--text)" stroke-width="1.8" ${st}/>`;
  const pijl=(d,st="")=>`<path d="${d}" fill="none" stroke="var(--text)" stroke-width="1.8" marker-end="url(#${m})" ${st}/>`;
  const N=vul?["hypothalamus","hypofyse","bijnierschors"]:["1","2","3"];
  s+=lijn("M180,85 V104")+pijl("M180,136 V152")+lijn("M180,205 V224")+pijl("M180,256 V272");
  s+=`<text x="150" y="114" text-anchor="end" class="lblm">releasing</text><text x="150" y="130" text-anchor="end" class="lblm">hormoon</text>`;
  s+=`<text x="150" y="245" text-anchor="end" class="lblm">ACTH</text>`;
  s+=cirkel(180,120,"P")+`<text x="206" y="126" class="lbl" style="font-size:16px">P</text>`;
  s+=cirkel(180,240,"Q")+`<text x="206" y="246" class="lbl" style="font-size:16px">Q</text>`;
  s+=lijn("M180,325 V385")+pijl("M180,385 H382");
  s+=`<text x="270" y="406" text-anchor="middle" class="lblm">cortisol</text>`;
  s+=lijn("M330,385 V60",'stroke-dasharray="7 5"');
  s+=lijn("M330,180 H303",'stroke-dasharray="7 5"')+pijl("M269,180 H262")+cirkel(286,180,"R");
  s+=lijn("M330,60 H303",'stroke-dasharray="7 5"')+pijl("M269,60 H262")+cirkel(286,60,"S");
  s+=`<text x="342" y="168" class="lbl" style="font-size:16px">R</text><text x="342" y="48" class="lbl" style="font-size:16px">S</text>`;
  s+=doos(180,60,160,50,N[0],"1")+doos(180,180,160,50,N[1],"2")+doos(180,300,160,50,N[2],"3");
  s+=`<rect x="388" y="358" width="200" height="56" rx="8" fill="var(--surface)" stroke="var(--text)" stroke-width="1.8"/><text x="488" y="381" text-anchor="middle" style="fill:var(--text);font:700 15px var(--tekst)">doelwitcellen</text><text x="488" y="401" text-anchor="middle" style="fill:var(--text);font:700 15px var(--tekst)">(o.a. levercellen)</text>`;
  return FIG(420,560,"0 0 600 430",s,"Regelkring van cortisol met organen 1, 2 en 3 en cirkels P tot en met S");}

/* ---------- Afbeelding 2: ACTH en cortisol rond een prednisonkuur (fictief, zelfde getallen als A-2.png) ---------- */
const PRED={wk:[-2,-1,0,0.5,1,2,3,4,5,6,6.5,7,8,9,10,11,12,13,14],
  acth:[5.0,5.2,5.0,2.0,1.2,1.0,1.0,1.1,1.0,1.0,6.0,11.5,12.0,10.5,9.0,7.8,6.6,5.8,5.3],
  cort:[410,400,405,150,70,60,55,60,58,55,60,80,120,170,230,290,340,375,395]};
/* hl = [van, tot] in weken (gouden band); pijl = tekst bij de band */
const PREDX=w=>(86+(w+2.6)*524/17.2)/630;
function GRAF_PRED({hl=null,tekst=""}={}){
  const X0=86,X1=610,xs=w=>X0+(w+2.6)*(X1-X0)/17.2;
  const yA=v=>226-v*(196/14), yC=v=>476-v*(196/500);
  let s="";
  [[30,226],[280,476]].forEach(([a,b])=>{s+=`<rect x="${xs(0)}" y="${a}" width="${xs(6)-xs(0)}" height="${b-a}" fill="var(--text3)" opacity=".16"/>`;});
  if(hl)[[30,226],[280,476]].forEach(([a,b])=>{s+=`<rect x="${xs(hl[0])-6}" y="${a}" width="${xs(hl[1])-xs(hl[0])+12}" height="${b-a}" fill="var(--goud)" opacity=".22"/>`;});
  s+=`<text x="${xs(3)}" y="50" text-anchor="middle" class="lblm">prednisonkuur</text>`;
  [0,2,4,6,8,10,12,14].forEach(v=>{s+=`<path d="M${X0},${yA(v)} H${X1}" stroke="var(--line)" stroke-width="1"/><text x="${X0-8}" y="${yA(v)+4}" text-anchor="end" class="lblm">${v}</text>`;});
  [0,100,200,300,400,500].forEach(v=>{s+=`<path d="M${X0},${yC(v)} H${X1}" stroke="var(--line)" stroke-width="1"/><text x="${X0-8}" y="${yC(v)+4}" text-anchor="end" class="lblm">${v}</text>`;});
  s+=`<rect x="${X0}" y="30" width="${X1-X0}" height="196" fill="none" stroke="var(--text2)" stroke-width="1.2"/><rect x="${X0}" y="280" width="${X1-X0}" height="196" fill="none" stroke="var(--text2)" stroke-width="1.2"/>`;
  [-2,0,2,4,6,8,10,12,14].forEach(w=>{s+=`<path d="M${xs(w)},476 v5 M${xs(w)},226 v5" stroke="var(--text2)"/><text x="${xs(w)}" y="496" text-anchor="middle" class="lblm">${String(w).replace("-","−")}</text>`;});
  s+=`<text x="20" y="128" text-anchor="middle" class="lblm" transform="rotate(-90 20 128)">ACTH (pmol/L)</text><text x="20" y="378" text-anchor="middle" class="lblm" transform="rotate(-90 20 378)">cortisol (nmol/L)</text>`;
  s+=`<text x="${(X0+X1)/2}" y="516" text-anchor="middle" class="lblm">tijd (weken na de start van de kuur)</text>`;
  const pad=(a,f)=>a.map((v,i)=>`${i?"L":"M"}${xs(PRED.wk[i]).toFixed(1)},${f(v).toFixed(1)}`).join(" ");
  s+=`<path d="${pad(PRED.acth,yA)}" fill="none" stroke="var(--text)" stroke-width="2"/>`+PRED.acth.map((v,i)=>`<circle cx="${xs(PRED.wk[i])}" cy="${yA(v)}" r="3.6" fill="var(--text)"/>`).join("");
  s+=`<path d="${pad(PRED.cort,yC)}" fill="none" stroke="var(--text)" stroke-width="2"/>`+PRED.cort.map((v,i)=>`<rect x="${xs(PRED.wk[i])-3.6}" y="${yC(v)-3.6}" width="7.2" height="7.2" fill="var(--text)"/>`).join("");
  if(tekst&&hl)s+=`<text x="${Math.max(X0+80,(xs(hl[0])+xs(hl[1]))/2)}" y="20" text-anchor="middle" class="lbl" style="fill:var(--goud-text)">${tekst}</text>`;
  return FIG(480,620,"0 0 630 524",s,"Grafiek: ACTH- en cortisolconcentratie in het bloed van week −2 tot week 14; de kuur loopt van week 0 tot week 6");}

/* ---------- Afbeelding 3: spierrespons bij herhaalde prikkels (fictief, zelfde getallen als B-1.png) ---------- */
const SPR={gezond:[100,99,99,98,98,98,99,98,99,98],jeroen:[100,87,78,73,71,72,73,74,74,75]};
function GRAF_SPIER({hl=null}={}){
  const X0=74,X1=600,xs=n=>X0+30+(n-1)*(X1-X0-60)/9,ys=v=>300-v*(270/110);
  let s="";
  if(hl)s+=`<rect x="${xs(hl[0])-14}" y="30" width="${xs(hl[1])-xs(hl[0])+28}" height="270" fill="var(--goud)" opacity=".2"/>`;
  [0,20,40,60,80,100].forEach(v=>s+=`<path d="M${X0},${ys(v)} H${X1}" stroke="var(--line)" stroke-width="1"/><text x="${X0-8}" y="${ys(v)+4}" text-anchor="end" class="lblm">${v}</text>`);
  s+=`<rect x="${X0}" y="30" width="${X1-X0}" height="270" fill="none" stroke="var(--text2)" stroke-width="1.2"/>`;
  for(let n=1;n<=10;n++)s+=`<path d="M${xs(n)},300 v5" stroke="var(--text2)"/><text x="${xs(n)}" y="320" text-anchor="middle" class="lblm">${n}</text>`;
  s+=`<text x="${(X0+X1)/2}" y="342" text-anchor="middle" class="lblm">nummer van de prikkel (3 prikkels per seconde)</text>`;
  s+=`<text x="20" y="165" text-anchor="middle" class="lblm" transform="rotate(-90 20 165)">spierrespons (% van de eerste)</text>`;
  const pad=a=>a.map((v,i)=>`${i?"L":"M"}${xs(i+1)},${ys(v).toFixed(1)}`).join(" ");
  s+=`<path d="${pad(SPR.gezond)}" fill="none" stroke="var(--text)" stroke-width="2"/>`+SPR.gezond.map((v,i)=>`<circle cx="${xs(i+1)}" cy="${ys(v)}" r="5" fill="var(--surface)" stroke="var(--text)" stroke-width="2"/>`).join("");
  s+=`<path d="${pad(SPR.jeroen)}" fill="none" stroke="var(--text)" stroke-width="2"/>`+SPR.jeroen.map((v,i)=>`<rect x="${xs(i+1)-5}" y="${ys(v)-5}" width="10" height="10" fill="var(--text)"/>`).join("");
  s+=`<path d="M${X0+16},250 h34" stroke="var(--text)" stroke-width="2"/><circle cx="${X0+33}" cy="250" r="5" fill="var(--surface)" stroke="var(--text)" stroke-width="2"/><text x="${X0+60}" y="255" class="lbl" style="font-weight:400;font-size:14px">gezonde proefpersoon</text>`;
  s+=`<path d="M${X0+16},276 h34" stroke="var(--text)" stroke-width="2"/><rect x="${X0+28}" y="271" width="10" height="10" fill="var(--text)"/><text x="${X0+60}" y="281" class="lbl" style="font-weight:400;font-size:14px">Jeroen</text>`;
  return FIG(440,620,"0 0 620 350",s,"Grafiek: spierrespons bij tien prikkels, bij een gezonde proefpersoon en bij Jeroen");}

/* ---------- Afbeelding 4: audiogram (fictief, zelfde getallen als E-1.png) ---------- */
const AUD={f:[250,500,1000,2000,3000,4000,6000,8000],gezond:[5,5,0,5,5,5,10,10],tim:[5,5,5,10,25,40,30,20]};
const AUDX=f=>{const lx=Math.log(250)-0.18,rx=Math.log(8000)+0.12;return (96+(Math.log(f)-lx)*504/(rx-lx))/620;};
function GRAF_AUDIO({hl=null,verschil=false}={}){
  const X0=96,X1=600,lx=Math.log(250)-0.18,rx=Math.log(8000)+0.12,xs=f=>X0+(Math.log(f)-lx)*(X1-X0)/(rx-lx),ys=v=>30+(v+10)*(270/70);
  let s="";
  if(hl)s+=`<rect x="${xs(hl)-16}" y="30" width="32" height="270" fill="var(--goud)" opacity=".22"/>`;
  [-10,0,10,20,30,40,50,60].forEach(v=>s+=`<path d="M${X0},${ys(v)} H${X1}" stroke="var(--line)" stroke-width="1"/><text x="${X0-8}" y="${ys(v)+4}" text-anchor="end" class="lblm">${String(v).replace("-","−")}</text>`);
  AUD.f.forEach(f=>s+=`<path d="M${xs(f)},30 V300" stroke="var(--line)" stroke-width="1"/><text x="${xs(f)}" y="318" text-anchor="middle" class="lblm">${f}</text>`);
  s+=`<rect x="${X0}" y="30" width="${X1-X0}" height="270" fill="none" stroke="var(--text2)" stroke-width="1.2"/>`;
  s+=`<text x="${(X0+X1)/2}" y="340" text-anchor="middle" class="lblm">toonhoogte (Hz)</text>`;
  s+=`<text x="22" y="165" text-anchor="middle" class="lblm" transform="rotate(-90 22 165)">gehoordrempel (dB)</text><text x="40" y="165" text-anchor="middle" class="lblm" transform="rotate(-90 40 165)">(hoger getal = slechter horen)</text>`;
  const pad=a=>a.map((v,i)=>`${i?"L":"M"}${xs(AUD.f[i]).toFixed(1)},${ys(v).toFixed(1)}`).join(" ");
  s+=`<path d="${pad(AUD.gezond)}" fill="none" stroke="var(--text)" stroke-width="2"/>`+AUD.gezond.map((v,i)=>`<circle cx="${xs(AUD.f[i])}" cy="${ys(v)}" r="5" fill="var(--text)"/>`).join("");
  s+=`<path d="${pad(AUD.tim)}" fill="none" stroke="var(--text)" stroke-width="2" stroke-dasharray="7 5"/>`+AUD.tim.map((v,i)=>`<rect x="${xs(AUD.f[i])-5}" y="${ys(v)-5}" width="10" height="10" fill="var(--text)"/>`).join("");
  if(verschil&&hl){const i=AUD.f.indexOf(hl);const a=ys(AUD.gezond[i])+7,b=ys(AUD.tim[i])-7;
    s+=`<path d="M${xs(hl)+24},${a} V${b}" stroke="var(--goud)" stroke-width="2.4" marker-start="url(#au${MK})" marker-end="url(#au${MK})"/>`+pijlDef("au"+MK,"var(--goud)")+`<text x="${xs(hl)+32}" y="${(a+b)/2+5}" class="lbl" style="fill:var(--goud-text)">${AUD.tim[i]-AUD.gezond[i]} dB</text>`;}
  s+=`<path d="M${X0+18},258 h34" stroke="var(--text)" stroke-width="2"/><circle cx="${X0+35}" cy="258" r="5" fill="var(--text)"/><text x="${X0+62}" y="263" class="lbl" style="font-weight:400;font-size:14px">leeftijdgenoot, gezonde oren</text>`;
  s+=`<path d="M${X0+18},282 h34" stroke="var(--text)" stroke-width="2" stroke-dasharray="7 5"/><rect x="${X0+30}" y="277" width="10" height="10" fill="var(--text)"/><text x="${X0+62}" y="287" class="lbl" style="font-weight:400;font-size:14px">Tim</text>`;
  return FIG(440,620,"0 0 620 350",s,"Audiogram: gehoordrempel van Tim en van een leeftijdgenoot bij toonhoogtes van 250 tot 8000 Hz");}
