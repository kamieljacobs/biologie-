/* ===== Oefentoets Afweer: gedeelde hulpjes (havo en vwo uit één bron) ===== */
const VWO=/*@@VWO@@*/false;
let QN=0,ON=0;
/* vraag(punten, onderwerp, build(q,id), stof?) -> id; stof = {titel, html, anim?, films?} voor 'Uitleg van de stof' */
function vraag(pts,t,build,stof){const id=++QN;Q.push({id,pts,t,build:q=>build(q,id)});
  if(stof&&window.EXSTOF)EXSTOF.zet(TOOL,[id],stof);return id;}
function opgave(kort,titel,html,ids){const nr=++ON;
  OPG.push({nr,kort,titel,ids,ctx:`<div class="pkop"><span class="mono">Toetstekst · inleiding opgave ${nr}</span></div>`+html});}
/* films van het thema (hrefs als in HOOFDSTUKKEN.afweer.films in index.html); alle vier havo + vwo */
const F={
  ev:["De eerste verdediging","films/afweer/1-de-eerste-verdediging.html"],
  as:["Antistoffen op maat","films/afweer/2-antistoffen-op-maat.html"],
  tc:["T-cellen en virussen","films/afweer/3-t-cellen-en-virussen.html"],
  vb:["Vaccins, allergie en bloedgroepen","films/afweer/4-vaccins-allergie-en-bloedgroepen.html"]};
const GEEN_INLEIDING=`<p class="muted" style="margin:0">Bij deze vragen hoort geen inleiding.</p>`;
/* begin van een vraag: vraagzin, hulp- en antwoordvak */
function start(q,html){q.append(el("p",{class:"qtext"},html));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  return {think,ans,unlock};}
const B=t=>`<b>${t}</b>`;
const TABEL=(nr,kop,rijen,noot)=>`<div class="eyebrow">tabel ${nr}</div><div class="tablewrap"><table class="data"><tr>${kop.map(k=>`<th>${k}</th>`).join("")}</tr>${rijen.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</table></div>`+(noot?`<p class="muted" style="font-size:14px;margin:4px 0 0">${noot}</p>`:"");
/* grotere letters in de eigen figuren (anders onleesbaar op de telefoon) */
document.head.append(el("style",{},".afg15 .lbl,.afg15 .lblm{font-size:15px}.afg17 .lbl,.afg17 .lblm{font-size:17px}.afg18 .lbl,.afg18 .lblm{font-size:18px}"));
const svgG=(vb,inner,label,n)=>svgWrap(vb,`<g class="afg${n}">${inner}</g>`,label);
const getal=s=>parseFloat(String(s||"").replace(/\s/g,"").replace(/\.(?=\d{3}(\D|$))/g,"").replace(",","."));

/* Volgorde-antwoord (ordenvraag): leerling tikt de letters in volgorde. Score volgens het antwoordmodel:
   helemaal goed 2 punten; alleen twee letters die naast elkaar staan verwisseld 1 punt; anders 0. */
function volgordeAnswer(ans,{id,letters,key,after}){
  const seq=[];const toon=el("div",{class:"row",style:"min-height:34px"});
  const rij=el("div",{class:"row"});
  function upd(){toon.innerHTML=`<span class="muted">Jouw volgorde:</span>&nbsp;<b style="font:700 20px var(--titel);letter-spacing:.06em">${seq.length?seq.join(" – "):"…"}</b>`;}
  const knoppen=[...letters].map(L=>{const b=el("button",{class:"chip","aria-pressed":"false"},L);
    b.onclick=()=>{if(b.disabled)return;seq.push(L);b.disabled=true;b.setAttribute("aria-pressed","true");upd();};rij.append(b);return b;});
  const wis=el("button",{class:"ghost"},"Opnieuw kiezen");
  wis.onclick=()=>{seq.length=0;knoppen.forEach(b=>{b.disabled=false;b.setAttribute("aria-pressed","false");});upd();};
  ans.append(el("p",{style:"margin:0"},"Tik de letters aan in de goede volgorde."),rij,toon,wis);upd();
  const ck=el("button",{class:"go"},"Nakijken"),fb=el("div",{class:"fb",hidden:""});ans.append(ck,fb);
  ck.onclick=()=>{if(seq.length<letters.length){fb.hidden=false;fb.className="fb hint";fb.textContent="Zet eerst alle letters op hun plek.";return;}
    const s=seq.join("");let p=0;
    if(s===key)p=2;else{const d=[...s].map((c,k)=>c!==key[k]?k:-1).filter(k=>k>=0);
      if(d.length===2&&d[1]===d[0]+1&&s[d[0]]===key[d[1]]&&s[d[1]]===key[d[0]])p=1;}
    ck.remove();wis.remove();knoppen.forEach(b=>b.disabled=true);
    fb.hidden=false;fb.className="fb "+(p===2?"ok":"no");
    fb.innerHTML=`<b>${p} ${p===1?"punt":"punten"}.</b> Goede volgorde: <b>${[...key].join(" – ")}</b>.`+(p===1?" Je had alleen twee stappen die naast elkaar staan verwisseld.":"");
    setScore(id,p);after&&after();};
}

/* Getal-antwoord met eigen controle per veld (spaties en punten als duizendtal-scheiding mogen) */
function rekenAnswer(ans,{id,fields,after}){
  const inps=fields.map(([lab,unit],k)=>{const r=el("div",{class:"row"});const fid="q"+id+"f"+k;
    r.append(el("label",{for:fid,class:"sellab"},lab));const i=el("input",{class:"num",id:fid,inputmode:"decimal"});r.append(i,el("span",{class:"muted"},unit));ans.append(r);return i;});
  const ck=el("button",{class:"go"},"Nakijken"),fb=el("div",{class:"fb",hidden:""});ans.append(ck,fb);
  ck.onclick=()=>{const v=inps.map(i=>getal(i.value));if(v.some(isNaN)){fb.hidden=false;fb.className="fb hint";fb.textContent="Vul beide uitkomsten in.";return;}
    inps.forEach(i=>i.disabled=true);ck.remove();const res=fields.map((f,k)=>f[2](v[k],v));const p=res.filter(Boolean).length;
    fb.hidden=false;fb.className="fb "+(p===fields.length?"ok":"no");
    fb.innerHTML=`<b>${p} van de ${fields.length} punten.</b><br>`+fields.map((f,k)=>`${res[k]?"✓":"✗"} ${f[3]}`).join("<br>");setScore(id,p);after&&after();};
}

/* Bloedgroep afleiden: eerste punt (bloedgroep + resus) kijkt de tool na, de uitleg kijk je zelf na. */
function bloedgroepAnswer(ans,{id,abo,resus,check,model,valkuil,after}){
  const rij=(lab,opts,k)=>{const r=el("div",{class:"row"});const sid="q"+id+"b"+k;
    r.append(el("label",{for:sid,class:"sellab"},lab));const sel=el("select",{id:sid});sel.append(el("option",{value:""},"kies…"));
    opts.forEach((o,j)=>sel.append(el("option",{value:j},o)));r.append(sel);ans.append(r);return sel;};
  const ABO=["A","B","AB","O"],RES=["resuspositief","resusnegatief"];
  const s1=rij("bloedgroep (ABO)",ABO,0),s2=rij("resusfactor",RES,1);
  const ta=el("textarea",{id:"q"+id+"t",placeholder:"Leg uit hoe je dat met de tabel afleidt…"});ans.append(ta);
  const ck=el("button",{class:"go"},"Nakijken"),fb=el("div",{class:"fb",hidden:""});ans.append(ck,fb);
  ck.onclick=()=>{if(s1.value===""||s2.value===""||ta.value.trim().length<8){fb.hidden=false;fb.className="fb hint";fb.textContent="Kies de bloedgroep en de resusfactor, en schrijf je uitleg op.";return;}
    const p1=(+s1.value===abo&&+s2.value===resus)?1:0;s1.disabled=s2.disabled=true;ta.readOnly=true;ck.remove();
    fb.hidden=false;fb.className="fb "+(p1?"ok":"no");
    fb.innerHTML=(p1?"✓ Goed: ":"✗ Het is: ")+`<b>bloedgroep ${ABO[abo]}, ${RES[resus]}</b>. ${p1} ${p1===1?"punt":"punten"} voor de bloedgroep.`;
    const ss=el("div",{class:"selfscore"});
    ss.append(el("p",{style:"margin:0"},"<b>Kijk je uitleg zelf na met het antwoordmodel.</b> Vink aan als het in jouw antwoord staat."));
    const lab=el("label",{},`<input type="checkbox" id="q${id}c0"><span>${check} <span class="pts">1p</span></span>`);ss.append(lab);
    if(model)ss.append(el("div",{class:"model"},"<b>Voorbeeldantwoord:</b> "+model));
    if(valkuil)ss.append(el("div",{class:"fb hint"},"<b>Let op:</b> "+valkuil));
    const sc=el("div",{class:"score"});ss.append(sc);ans.append(ss);
    const box=lab.querySelector("input");const upd=()=>{const p=p1+(box.checked?1:0);sc.textContent=`Jouw score: ${p} / 2`;setScore(id,p);};
    box.onchange=upd;upd();after&&after();};
}

/* ---------- figuren (kleuren via de huisstijl-variabelen, werken in het witte papiervak en in donker) ---------- */
/* Afbeelding 1 (opgave Biest): totale hoeveelheid antistoffen in het bloed van een kalf. Zelfde krommen als
   eigen/figuren/afweer/maak.py in toetsen-biologie (fictief, schematisch): biest = 100·e^(−t/2,2), eigen = 60/(1+e^(−1,6(t−4))).
   split = ook de twee delen tonen (alleen in 'Laat zien waarom', anders geeft het het antwoord op de vraag weg). */
const KALF_B=t=>100*Math.exp(-t/2.2),KALF_E=t=>60/(1+Math.exp(-(t-4)*1.6));
function KALF({split=false,toon=["tot","b","e"],hl=null}={}){
  const X0=78,X1=610,Y0=280,Y1=24,xs=t=>X0+t*(X1-X0)/8,ys=v=>Y0-v*(Y0-Y1)/110;
  const pad=f=>[...Array(161)].map((_,i)=>{const t=i/20;return `${i?"L":"M"}${xs(t).toFixed(1)},${ys(f(t)).toFixed(1)}`;}).join(" ");
  let s="";
  if(hl)s+=`<rect x="${xs(hl[0])}" y="${Y1}" width="${xs(hl[1])-xs(hl[0])}" height="${Y0-Y1}" fill="var(--goud)" opacity=".14"/>`;
  for(let w=0;w<=8;w++)s+=`<path d="M${xs(w)},${Y0} v6" stroke="var(--text2)"/><text x="${xs(w)}" y="${Y0+22}" text-anchor="middle" class="lblm">${w}</text>`;
  [0,20,40,60,80,100].forEach(v=>s+=`<path d="M${X0-6},${ys(v)} h6" stroke="var(--text2)"/><text x="${X0-12}" y="${ys(v)+4}" text-anchor="end" class="lblm">${v}</text>`);
  s+=`<path d="M${X0},${Y1-6} V${Y0} H${X1+10}" fill="none" stroke="var(--text2)" stroke-width="1.4"/>`;
  s+=`<text x="${(X0+X1)/2}" y="${Y0+44}" text-anchor="middle" class="lblm">leeftijd van het kalf (weken)</text>`;
  s+=`<text x="22" y="${(Y0+Y1)/2}" class="lblm" text-anchor="middle" transform="rotate(-90 22 ${(Y0+Y1)/2})">hoeveelheid antistoffen in het bloed (relatief)</text>`;
  if(toon.includes("tot"))s+=`<path d="${pad(t=>KALF_B(t)+KALF_E(t))}" fill="none" stroke="var(--text)" stroke-width="2.6" opacity="${split?.35:1}"/>`;
  if(split){
    if(toon.includes("b"))s+=`<path d="${pad(KALF_B)}" fill="none" stroke="var(--koraal)" stroke-width="2.6" stroke-dasharray="9 5"/><text x="${xs(1.1)+8}" y="${ys(KALF_B(1.1))-4}" class="lbl" style="fill:var(--koraal)">uit de biest (van de koe)</text>`;
    if(toon.includes("e"))s+=`<path d="${pad(KALF_E)}" fill="none" stroke="var(--teal)" stroke-width="2.6" stroke-dasharray="2 5"/><text x="${xs(5.6)}" y="${ys(KALF_E(5.6))+22}" class="lbl" style="fill:var(--teal)">zelf gemaakt door het kalf</text>`;
    if(toon.includes("tot"))s+=`<text x="${xs(7.9)}" y="${ys(KALF_B(7.9)+KALF_E(7.9))-8}" text-anchor="end" class="lblm">totaal</text>`;}
  return `<div class="affig" style="max-width:640px;margin:0 auto;width:100%;--min:460px">`+svgG("0 0 640 340",s,"Totale hoeveelheid antistoffen in het bloed van een kalf in de eerste 8 weken",15)+`</div>`;}

/* Putjes van een bloedgroepbepaling of kruisproef: rode bloedcellen los of samengeklonterd */
function PUTJE(x,y,kop,klont,sub){
  const r=48;let s=`<circle cx="${x}" cy="${y}" r="${r}" fill="var(--surface2)" stroke="var(--text2)" stroke-width="1.4"/>`;
  const los=[[-26,-20],[4,-30],[28,-12],[-30,10],[-6,-4],[22,18],[-14,28],[10,32],[30,-34],[-34,-36],[0,14],[-22,-38]];
  const kl=[[-6,-6],[6,-8],[0,4],[-12,4],[12,4],[-4,14],[8,15],[-16,-6],[16,-4],[2,-18],[-8,-16],[12,-16]];
  (klont?kl:los).forEach(([dx,dy])=>s+=`<circle cx="${x+dx*(klont?1:.95)}" cy="${y+dy*(klont?1:.9)}" r="6.2" fill="var(--koraal)" stroke="var(--text)" stroke-width=".8" opacity=".9"/>`);
  s+=`<text x="${x}" y="${y-r-12}" text-anchor="middle" class="lbl">${kop}</text>`;
  s+=`<text x="${x}" y="${y+r+22}" text-anchor="middle" class="lblm">${sub||(klont?"klontert samen":"klontert niet")}</text>`;
  return s;}

/* Fagocytose in vijf stappen (voor 'Laat zien waarom' bij de ordenvraag) */
function FAGO(st){
  const cx=300,cy=128;let s=`<path d="M${cx-170},${cy} C${cx-170},${cy-110} ${cx+170},${cy-110} ${cx+170},${cy} C${cx+170},${cy+100} ${cx-170},${cy+100} ${cx-170},${cy} Z" fill="var(--goud)" fill-opacity=".10" stroke="var(--text2)" stroke-width="1.6"/>`;
  s+=`<ellipse cx="${cx+80}" cy="${cy+18}" rx="38" ry="26" fill="var(--paars)" fill-opacity=".18" stroke="var(--paars)"/><text x="${cx+80}" y="${cy+22}" text-anchor="middle" class="lblm">kern</text>`;
  s+=`<text x="${cx+150}" y="${cy-80}" text-anchor="end" class="lbl">macrofaag</text>`;
  const bac=(x,y,heel=true)=>heel?`<rect x="${x-20}" y="${y-9}" width="40" height="18" rx="9" fill="var(--groen)" stroke="var(--text)" stroke-width="1"/>`
    :[[-14,-4],[0,6],[12,-6],[-4,-10],[16,8]].map(([dx,dy])=>`<circle cx="${x+dx}" cy="${y+dy}" r="3.2" fill="var(--groen)"/>`).join("");
  const lyso=(x,y)=>`<circle cx="${x}" cy="${y}" r="9" fill="var(--paars)" fill-opacity=".55" stroke="var(--paars)"/>`;
  const bx=st===0?cx-230:cx-70,by=cy-10;
  if(st===0){s+=bac(bx,by)+`<text x="${bx}" y="${by+34}" text-anchor="middle" class="lblm">bacterie</text>`;}
  if(st===1){s+=`<path d="M${cx-160},${cy-40} C${cx-215},${cy-60} ${cx-205},${cy-20} ${cx-185},${cy-22}" fill="none" stroke="var(--text2)" stroke-width="7" stroke-linecap="round" opacity=".55"/>
    <path d="M${cx-160},${cy+20} C${cx-215},${cy+40} ${cx-205},${cy+2} ${cx-185},${cy+2}" fill="none" stroke="var(--text2)" stroke-width="7" stroke-linecap="round" opacity=".55"/>`+bac(cx-190,cy-10)+`<text x="${cx-200}" y="${cy+58}" text-anchor="middle" class="lblm">schijnvoetjes</text>`;}
  if(st>=2){s+=`<circle cx="${bx}" cy="${by}" r="30" fill="none" stroke="var(--text)" stroke-width="1.4" stroke-dasharray="${st>=3?"0":"4 3"}"/>`+bac(bx,by,st<4);
    if(st===2)s+=`<text x="${bx}" y="${by+50}" text-anchor="middle" class="lblm">blaasje</text>`+lyso(cx+10,cy-50)+lyso(cx-10,cy+50);
    if(st===3)s+=lyso(bx+28,by-14)+lyso(bx-22,by+22)+`<text x="${bx}" y="${by+56}" text-anchor="middle" class="lblm">lysosomen versmelten</text>`;
    if(st===4)s+=`<text x="${bx}" y="${by+50}" text-anchor="middle" class="lblm">enzymen breken af</text>`;
    if(st===2)s+=`<text x="${cx+10}" y="${cy-66}" text-anchor="middle" class="lblm">lysosoom</text>`;}
  return svgG("0 0 600 250",s,"Een macrofaag ruimt een bacterie op",18);}

/* Vermenigvuldiging van het virus per ronde van 8 uur (opgave Muizen) */
function RONDES(n){
  const R=[[0,1],[8,50],[16,2500],[24,125000]];const X0=90,W=110,Y0=232,H=160,ys=v=>Y0-Math.log10(v)/5.5*H;
  let s=`<path d="M${X0-20},${Y0} H${X0+4*W}" stroke="var(--text2)" stroke-width="1.4"/>`;
  s+=`<path d="M${X0-20},${ys(1e5)} H${X0+4*W}" stroke="var(--koraal)" stroke-width="1.6" stroke-dasharray="6 4"/><text x="${X0-16}" y="${ys(1e5)-8}" class="lbl" style="fill:var(--koraal)">grens: 100 000</text>`;
  R.forEach(([u,v],k)=>{const x=X0+k*W+20,on=k<=n;
    s+=`<rect x="${x}" y="${Math.min(ys(v),Y0-3)}" width="60" height="${Math.max(3,Y0-ys(v))}" fill="var(--teal)" opacity="${on?.8:.12}"/>`;
    s+=`<text x="${x+30}" y="${Y0+22}" text-anchor="middle" class="lblm">${u} uur</text>`;
    if(on)s+=`<text x="${x+30}" y="${Math.min(ys(v),Y0-3)-8}" text-anchor="middle" class="lbl">${v.toLocaleString("nl-NL").replace(/\./g," ")}</text>`;});
  s+=`<text x="${X0-20}" y="22" class="lblm">nieuw geïnfecteerde cellen</text>`;
  return svgG("0 0 560 270",s,"Aantal nieuw geïnfecteerde cellen per ronde van 8 uur",17);}
