/* ===== Oefentoets Evolutie: gedeelde hulpjes (havo en vwo uit één bron) ===== */
const VWO=/*@@VWO@@*/false;
let QN=0,ON=0;
/* vraag(punten, onderwerp, build(q,id), stof?) -> id; stof = {titel, html, anim?, films?} voor 'Uitleg van de stof' */
function vraag(pts,t,build,stof){const id=++QN;Q.push({id,pts,t,build:q=>build(q,id)});
  if(stof&&window.EXSTOF)EXSTOF.zet(TOOL,[id],stof);return id;}
/* opgave zonder inleiding (kennisvragen onder een kopje): html = "" -> geen inleidingsvak */
function opgave(kort,titel,html,ids){const nr=++ON;
  OPG.push({nr,kort,titel,ids,ctx:html?`<div class="pkop"><span class="mono">Toetstekst · inleiding opgave ${nr}</span></div>`+html:""});}
/* films van het thema (hrefs als in HOOFDSTUKKEN.evolutie.films in index.html) */
const F={
  e1:["Wat is evolutie eigenlijk?","films/evolutie/1-wat-is-evolutie.html"],
  e2:["Natuurlijke selectie","films/evolutie/2-natuurlijke-selectie.html"],
  e3:["Vormen van selectie","films/evolutie/3-vormen-van-selectie.html"],
  e4:["De mens als selectiefactor","films/evolutie/4-de-mens-als-selectiefactor.html"],
  e5:["Toeval en uitwisseling","films/evolutie/5-toeval-en-uitwisseling.html"],
  e6:["Hoe één soort er twee wordt","films/evolutie/6-hoe-een-soort-er-twee-wordt.html"],
  e7:["Hoe weten we dat?","films/evolutie/7-hoe-weten-we-dat.html"],
  e8:["Stambomen lezen","films/evolutie/8-stambomen-lezen.html"]};
/* 'Uitleg van de stof' bij een kennisvraag: alleen waar je het terugkijkt (de theorie zelf zou het antwoord zijn) */
const TERUG=(titel,film,hfd)=>({titel,html:`<p>Deze vraag toetst kennis uit de film <b>${film[0]}</b>. Weet je het niet zeker? Kijk dan het hoofdstuk <b>${hfd}</b> terug en probeer het daarna opnieuw.</p>`,films:[film]});
/* begin van een vraag: vraagzin, hulp- en antwoordvak */
function start(q,html){q.append(el("p",{class:"qtext"},html));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  return {think,ans,unlock};}
const B=t=>`<b>${t}</b>`;
const LIJST=a=>`<ul style="margin:0;padding-left:22px">${a.map(x=>`<li>${x}</li>`).join("")}</ul>`;
const TABEL=(nr,kop,rijen,noot)=>(nr?`<div class="eyebrow">tabel ${nr}</div>`:"")+`<div class="tablewrap"><table class="data"><tr>${kop.map(k=>`<th>${k}</th>`).join("")}</tr>${rijen.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</table></div>`+(noot?`<p class="muted" style="font-size:14px;margin:4px 0 0">${noot}</p>`:"");
const dicht=(a,b,m)=>Math.abs(a-b)<=m;
const getal=s=>parseFloat(String(s||"").replace(/\s/g,"").replace(",",".").replace(/[^0-9.\-]/g,""));

/* combi: rekenvraag met delen die de tool nakijkt (getallen, keuzelijst) en delen die je zelf afvinkt (uitleg).
   parts = [{nums:[[label, eenheid],…], ok:(waarden, alleWaarden)=>bool, tekst} | {sel:[label, opties], right, tekst} | {open:true, tekst}]
   Elk deel = 1 punt (zoals de scoringselementen van het antwoordmodel). */
function combi(ans,{id,pts,parts,model,valkuil,alt,placeholder,after}){
  const all=[];let ta=null;
  const ui=parts.map((p,k)=>{
    if(p.open){if(!ta){ta=el("textarea",{id:"q"+id+"t",placeholder:placeholder||"Schrijf je uitleg…"});ans.append(ta);}return null;}
    if(p.sel){const r=el("div",{class:"row"});const sid="q"+id+"s"+k;r.append(el("label",{for:sid,class:"sellab"},p.sel[0]));
      const s=el("select",{id:sid});s.append(el("option",{value:""},"kies…"));p.sel[1].forEach((o,j)=>s.append(el("option",{value:j},o)));r.append(s);ans.append(r);return s;}
    return p.nums.map(([lab,unit],j)=>{const r=el("div",{class:"row"});const fid="q"+id+"f"+k+"_"+j;
      r.append(el("label",{for:fid,class:"sellab"},lab));const i=el("input",{class:"num",id:fid,inputmode:"decimal"});r.append(i);if(unit)r.append(el("span",{class:"muted"},unit));ans.append(r);all.push(i);return i;});});
  const ck=el("button",{class:"go"},"Nakijken"),fb=el("div",{class:"fb hint",hidden:""});ans.append(ck,fb);
  ck.onclick=()=>{
    const leeg=ui.some((u,k)=>parts[k].sel?u.value==="":parts[k].nums?u.some(i=>isNaN(getal(i.value))):false);
    if(leeg){fb.hidden=false;fb.textContent="Vul eerst alle uitkomsten in.";return;}
    if(ta&&ta.value.trim().length<8){fb.hidden=false;fb.textContent="Schrijf eerst je uitleg op. Daarna kijk je het na.";ta.focus();return;}
    fb.remove();ck.remove();if(ta)ta.readOnly=true;
    const alleW=all.map(i=>getal(i.value));let auto=0;
    const ss=el("div",{class:"selfscore"});
    ss.append(el("p",{style:"margin:0"},"<b>Nakijken met het antwoordmodel.</b>"+(ta?" De tool kijkt de uitkomsten na; vink zelf aan wat er in je uitleg staat.":"")));
    const boxes=[];
    parts.forEach((p,k)=>{
      if(p.open){const lab=el("label",{},`<input type="checkbox" id="q${id}c${k}"><span>${p.tekst} <span class="pts">1p</span></span>`);ss.append(lab);boxes.push(lab.querySelector("input"));return;}
      let goed;
      if(p.sel){ui[k].disabled=true;goed=+ui[k].value===p.right;}
      else{ui[k].forEach(i=>i.disabled=true);goed=!!p.ok(ui[k].map(i=>getal(i.value)),alleW);}
      if(goed)auto++;
      ss.append(el("div",{class:"fb "+(goed?"ok":"no")},`${goed?"✓":"✗"} ${p.tekst} <span class="pts">${goed?1:0}p</span>`));});
    if(model)ss.append(el("div",{class:"model"},"<b>Voorbeeldantwoord:</b> "+model));
    if(valkuil)ss.append(el("div",{class:"fb hint"},"<b>Let op:</b> "+valkuil));
    /* alt = andere goedgekeurde aanpak uit het correctievoorschrift: zelf aanvinken geeft alle punten */
    let altBox=null;if(alt){const lab=el("label",{},`<input type="checkbox" id="q${id}alt"><span>${alt} <span class="pts">${pts}p</span></span>`);ss.append(lab);altBox=lab.querySelector("input");}
    const sc=el("div",{class:"score"});ss.append(sc);ans.append(ss);
    const upd=()=>{const p=altBox&&altBox.checked?pts:Math.min(pts,auto+boxes.filter(b=>b.checked).length);sc.textContent=`Jouw score: ${p} / ${pts}`;setScore(id,p);};
    boxes.forEach(b=>b.onchange=upd);if(altBox)altBox.onchange=upd;upd();after&&after();};
}

/* ---------- figuren (eigen tekeningen, kleuren via de huisstijl, werken in het witte papiervak en in donker) ---------- */
/* Afbeelding 1, opgave Zwaluwen: zelfde vereenvoudigde krommen als eigen/figuren/evolutie/maak.py (a1) in toetsen-biologie:
   normaalverdeling, sd 2,5 mm, gemiddelde 111 mm (1983) en 107 mm (2012), klassen van 1 mm. */
const VL=(()=>{const n=(x,m,s)=>Math.exp(-0.5*((x-m)/s)**2)/(s*Math.sqrt(2*Math.PI));
  const x=[...Array(19)].map((_,i)=>100+i);return {x,a:x.map(v=>100*n(v,111,2.5)),b:x.map(v=>100*n(v,107,2.5))};})();
/* opties: toon = ['1983','2012'], dim = [...], staart = true (lange vleugels gemarkeerd), gem = true (gemiddelden), pijl = true */
function VLEUGEL({toon=["1983","2012"],dim=[],staart=false,gem=false,pijl=false}={}){
  const X0=70,X1=610,xs=v=>X0+(v-100)*(X1-X0)/18,ys=p=>300-p*15;
  let s="";
  [0,3,6,9,12,15,18].forEach(v=>s+=`<path d="M${X0},${ys(v)} H${X1}" stroke="var(--line)" stroke-width="1"/><text x="${X0-10}" y="${ys(v)+4}" text-anchor="end" class="lblm">${v}</text>`);
  for(let v=100;v<=118;v+=2)s+=`<text x="${xs(v)}" y="320" text-anchor="middle" class="lblm">${v}</text>`;
  s+=`<path d="M${X0},26 V300 H${X1+6}" fill="none" stroke="var(--text2)" stroke-width="1.4"/>`;
  s+=`<text x="${(X0+X1)/2}" y="344" text-anchor="middle" class="lblm">vleugellengte (mm)</text>`;
  s+=`<text x="18" y="165" class="lblm" text-anchor="middle" transform="rotate(-90 18 165)">zwaluwen (% van de populatie)</text>`;
  if(staart)s+=`<rect x="${xs(113)}" y="26" width="${xs(118)-xs(113)}" height="274" fill="var(--koraal)" opacity=".16"/><text x="${xs(115.5)}" y="44" text-anchor="middle" class="lbl" style="fill:var(--koraal)">vaker doodgereden</text>`;
  const L=[["1983",VL.a,"9 5","c",111],["2012",VL.b,"","s",107]];
  L.forEach(([k,a,da,m,g],i)=>{if(!toon.includes(k))return;const op=dim.includes(k)?.25:1,c=k==="1983"?"var(--text2)":"var(--text)";
    s+=`<path d="${a.map((p,j)=>`${j?"L":"M"}${xs(VL.x[j]).toFixed(1)},${ys(p).toFixed(1)}`).join(" ")}" fill="none" stroke="${c}" stroke-width="2" stroke-dasharray="${da}" opacity="${op}"/>`;
    a.forEach((p,j)=>{const cx=xs(VL.x[j]),cy=ys(p);s+=m==="c"?`<circle cx="${cx}" cy="${cy}" r="3.6" fill="${c}" opacity="${op}"/>`:`<rect x="${cx-3.4}" y="${cy-3.4}" width="6.8" height="6.8" fill="${c}" opacity="${op}"/>`;});
    const lx=X1-120,ly=52+i*22;
    s+=`<path d="M${lx},${ly} h30" stroke="${c}" stroke-width="2" stroke-dasharray="${da}" opacity="${op}"/>`+(m==="c"?`<circle cx="${lx+15}" cy="${ly}" r="3.6" fill="${c}" opacity="${op}"/>`:`<rect x="${lx+11.6}" y="${ly-3.4}" width="6.8" height="6.8" fill="${c}" opacity="${op}"/>`)+`<text x="${lx+38}" y="${ly+4}" class="lbl" opacity="${op}">${k}</text>`;
    if(gem&&op===1)s+=`<path d="M${xs(g)},70 V300" stroke="var(--goud)" stroke-width="1.6" stroke-dasharray="3 4"/><text x="${xs(g)}" y="64" text-anchor="middle" class="lbl" style="fill:var(--goud-text)">${g} mm</text>`;});
  if(pijl)s+=`<path d="M${xs(110.4)},84 L${xs(107.6)},84" stroke="var(--goud)" stroke-width="2.4" marker-end="url(#evpijl)"/>`;
  const defs=`<defs><marker id="evpijl" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--goud)"/></marker></defs>`;
  return `<div class="vpfig" style="max-width:640px;margin:0 auto;width:100%;--min:520px">`+svgWrap("0 0 640 354",defs+s,"Verdeling van de vleugellengte van klifzwaluwen in 1983 en in 2012")+`</div>`;}

/* Cladogram met rechthoekige takken. Knoop = {id, x, c:[kinderen]}; blad = {id, naam} (rij = volgorde van de bladeren).
   opties: hl = [ids van takken (blad of knoop) die goud worden], dots = [knoop-ids met een stip], streep = {id: label} (streepje op de tak naar id),
   kruis = {id: '✓'|'✗'}, vet = [blad-ids] */
function CLAD(boom,{X,Y0,DY,nx,breed,hoog,label,stam=0,tijd=false},{hl=[],dots=[],streep={},kruis={},vet=[]}={}){
  let rij=0,s="",lijn="",top="";const XL=nx(X);
  const pos=k=>{if(k.naam){k.y=Y0+DY*(rij++);k.px=XL;return k;}k.c.forEach(pos);k.px=nx(k.x);
    k.y=(Math.min(...k.c.map(c=>c.y))+Math.max(...k.c.map(c=>c.y)))/2;return k;};
  pos(boom);
  const kl=id=>hl.includes(id)?"var(--goud)":"var(--text)",dk=id=>hl.includes(id)?3.4:1.8;
  const teken=k=>{if(k.naam){top+=`<text x="${XL+8}" y="${k.y+4.5}" class="lbl" style="${vet.includes(k.id)?"fill:var(--goud-text);font-weight:700":""}">${k.naam}</text>`;return;}
    lijn+=`<path d="M${k.px},${Math.min(...k.c.map(c=>c.y))} V${Math.max(...k.c.map(c=>c.y))}" stroke="var(--text)" stroke-width="1.8"/>`;
    k.c.forEach(c=>{lijn+=`<path d="M${k.px},${c.y} H${c.px}" stroke="${kl(c.id)}" stroke-width="${dk(c.id)}"/>`;
      if(streep[c.id]!==undefined){const mx=(k.px+c.px)/2;top+=`<path d="M${mx},${c.y-9} V${c.y+9}" stroke="var(--koraal)" stroke-width="4"/>`+(streep[c.id]?`<text x="${mx}" y="${c.y-14}" text-anchor="middle" class="lbl" style="fill:var(--koraal)">${streep[c.id]}</text>`:"");}
      if(kruis[c.id]){const mx=(k.px+c.px)/2,ok=kruis[c.id]==="✓";top+=`<circle cx="${mx}" cy="${c.y}" r="11" fill="var(--surface)" stroke="${ok?"var(--groen)":"var(--koraal)"}" stroke-width="2"/><text x="${mx}" y="${c.y+5}" text-anchor="middle" class="lbl" style="fill:${ok?"var(--groen)":"var(--koraal)"}">${ok?"✓":"✗"}</text>`;}
      teken(c);});
    if(dots.includes(k.id))top+=`<circle cx="${k.px}" cy="${k.y}" r="7" fill="var(--goud)" stroke="var(--surface)" stroke-width="2"/>`;};
  teken(boom);
  if(stam)lijn+=`<path d="M${nx(boom.x)-stam},${boom.y} H${nx(boom.x)}" stroke="${kl(boom.id)}" stroke-width="${dk(boom.id)}"/>`;
  if(stam&&streep[boom.id]!==undefined){const mx=nx(boom.x)-stam/2;top+=`<path d="M${mx},${boom.y-9} V${boom.y+9}" stroke="var(--koraal)" stroke-width="4"/>`;}
  if(tijd){const yy=Y0+DY*(rij-1)+DY*0.65;s+=`<path d="M${nx(boom.x)},${yy} H${XL-6}" stroke="var(--text2)" stroke-width="1.2" marker-end="url(#evtijd)"/><text x="${(nx(boom.x)+XL)/2}" y="${yy+18}" text-anchor="middle" class="lblm">tijd →</text>`;}
  const defs=`<defs><marker id="evtijd" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--text2)"/></marker></defs>`;
  return {svg:svgWrap(`0 0 ${breed} ${hoog}`,defs+lijn+s+top,label)};}

/* Afbeelding 2, opgave Big Bird: zelfde boom als eigen/figuren/evolutie/maak.py (b1): (zangervink, (vegetarische vink, (kleine boomvink,
   ((kleine gv, middelste gv), (grote cactusvink, grote gv))))); knoopposities 1, 3, 5, 6,5 en 8, bladeren op 10. */
function VINKEN(o={}){
  const b=(id,n,l)=>({id,naam:`${n} (<tspan font-style="italic">${l}</tspan>)`});
  const boom={id:"wortel",x:1,c:[b("zang","zangervink","Certhidea olivacea"),{id:"kveg",x:3,c:[b("veg","vegetarische vink","Platyspiza crassirostris"),
    {id:"kboom",x:5,c:[b("boom","kleine boomvink","Camarhynchus parvulus"),{id:"kgeo",x:6.5,c:[{id:"kfu",x:8,c:[b("fu","kleine grondvink","Geospiza fuliginosa"),b("fo","middelste grondvink","Geospiza fortis")]},
      {id:"kco",x:8,c:[b("co","grote cactusvink","Geospiza conirostris"),b("ma","grote grondvink","Geospiza magnirostris")]}]}]}]}]};
  const r=CLAD(boom,{X:10,Y0:26,DY:40,nx:x=>14+x*30,breed:680,hoog:290,label:"Cladogram van zeven soorten Darwinvinken",stam:30},o);
  return `<div class="vpfig" style="max-width:680px;margin:0 auto;width:100%;--min:600px">${r.svg}</div>`;}

/* Afbeelding 3, opgave Cactus of wolfsmelk: zelfde boom als eigen/figuren/evolutie/maak_extra.py (J-1):
   (lelie, ((cactus, anjer), (wolfsmelk, wilg))), alle bladeren op diepte 3, met tijdpijl. */
function PLANTEN(o={}){
  const L=(id,n)=>({id,naam:n});
  const boom={id:"wortel",x:0,c:[L("lelie","lelie"),{id:"kvier",x:1,c:[{id:"kca",x:2,c:[L("cactus","cactus"),L("anjer","anjer")]},{id:"kww",x:2,c:[L("wolfsmelk","wolfsmelk"),L("wilg","wilg")]}]}]};
  const r=CLAD(boom,{X:3,Y0:26,DY:44,nx:x=>60+x*120,breed:560,hoog:262,label:"Cladogram van cactus, anjer, wolfsmelk, wilg en lelie",stam:26,tijd:true},o);
  return `<div class="vpfig" style="max-width:560px;margin:0 auto;width:100%;--min:440px">${r.svg}</div>`;}
