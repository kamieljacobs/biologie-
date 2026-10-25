/* Uitleg van de stof bij de oefenexamens (tools/examen-havo-*.html).
   Gedeeld bestand: kern hieronder, daarna per opgave de inhoud (gebouwd uit hw/stof/h*.js).
   Per vraag:  EXSTOF.zet(tool, [vraagnummers], {titel, html, anim?, films?})   -> blok 'Uitleg van de stof'
               EXSTOF.waarom(tool, vraagnummer, function(box){...})          -> extra animatie onder 'Laat zien waarom'
   tool = "havo26-1" of "havo26-2"; films = [[titel, pad vanaf de root van de site], ...]; anim(box) tekent in box. */
(function(){
"use strict";
const S={}, W={};
const el=(tag,attrs={},html="")=>{const e=document.createElement(tag);for(const k in attrs){if(k==="class")e.className=attrs[k];else if(k.startsWith("on"))e.addEventListener(k.slice(2),attrs[k]);else e.setAttribute(k,attrs[k]);}if(html)e.innerHTML=html;return e;};
/* stappenanimatie: steps = [{cap, ...}], render(stage, step, i) */
function stappen(box,steps,render){
  let i=0;const stage=el("div",{class:"stage"}),cap=el("p",{class:"cap"});
  const prev=el("button",{class:"ghost",type:"button"},"‹ Vorige"),next=el("button",{class:"go",type:"button"},"Volgende ›");
  const pips=el("div",{class:"pips"},steps.map(()=>"<span></span>").join(""));
  const nav=el("div",{class:"nav"});nav.append(prev,next,pips);
  const a=el("div",{class:"anim"});a.append(stage,cap,nav);box.append(a);
  function show(){cap.innerHTML=steps[i].cap;prev.disabled=i===0;next.textContent=i===steps.length-1?"Opnieuw ›":"Volgende ›";
    pips.querySelectorAll("span").forEach((p,j)=>p.classList.toggle("on",j===i));render(stage,steps[i],i);}
  prev.onclick=()=>{if(i>0){i--;show();}};next.onclick=()=>{i=(i+1)%steps.length;show();};show();
}
const svg=(vb,inner,label)=>`<svg viewBox="${vb}" role="img" aria-label="${label||""}" style="display:block;max-width:100%;height:auto">${inner}</svg>`;
window.EXSTOF={
  el, stappen, svg,
  zet(tool,ids,obj){(S[tool]=S[tool]||{});ids.forEach(id=>S[tool][id]=obj);},
  waarom(tool,id,fn){(W[tool]=W[tool]||{})[id]=fn;},
  heeft(tool,id){return !!(S[tool]&&S[tool][id]);},
  blok(tool,id){
    const o=S[tool]&&S[tool][id];if(!o)return null;
    const d=el("details",{class:"stof"});
    d.append(el("summary",{},`<span class="stoflab">Uitleg van de stof</span><span class="stoftitel">${o.titel}</span>`));
    const body=el("div",{class:"stofbody"});d.append(body);
    let klaar=false;
    d.addEventListener("toggle",()=>{if(!d.open||klaar)return;klaar=true;
      body.append(el("div",{class:"stoftekst"},o.html));
      if(o.anim){const ab=el("div",{});body.append(ab);try{o.anim(ab);}catch(e){console.error(e);}}
      if(o.films&&o.films.length){const f=el("div",{class:"stoffilms"},`<span class="mono">Bekijk ook de film</span>`);
        o.films.forEach(([t,h])=>f.append(el("a",{class:"stoffilm",href:"../"+h,target:"_blank",rel:"noopener"},`▶ ${t}`)));body.append(f);}
    });
    return d;
  },
  extraWaarom(tool,id,box){const f=W[tool]&&W[tool][id];if(!f)return;const b=el("div",{class:"exwaarom"});box.append(b);try{f(b);}catch(e){console.error(e);}}
};
const css=`.stof{border:1px solid var(--line2);border-radius:var(--radius);background:var(--surface);padding:0}
.stof>summary{list-style:none;cursor:pointer;display:flex;flex-wrap:wrap;gap:4px 12px;align-items:baseline;padding:12px 18px;font-weight:600}
.stof>summary::-webkit-details-marker{display:none}
.stof>summary::before{content:"▸";color:var(--goud-text);margin-right:2px}
.stof[open]>summary::before{content:"▾"}
.stof .stoflab{font:600 12px var(--meta);letter-spacing:.1em;text-transform:uppercase;color:var(--goud-text)}
.stof .stoftitel{color:var(--text)}
.stofbody{padding:0 18px 16px;display:flex;flex-direction:column;gap:12px}
.stoftekst p{margin:0 0 8px}.stoftekst p:last-child{margin:0}
.stoftekst ul{margin:0;padding-left:20px}
.stoffilms{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.stoffilms .mono{color:var(--text3);margin-right:4px}
a.stoffilm{display:inline-flex;align-items:center;min-height:36px;padding:0 14px;border-radius:999px;border:1px solid var(--line2);color:var(--text);text-decoration:none;font-weight:600;font-size:15px}
a.stoffilm:hover{border-color:var(--goud)}
.exwaarom{margin-top:12px}
body.examen .stof{display:none}`;
const st=document.createElement("style");st.textContent=css;document.head.append(st);
})();

/* ===== h1.js ===== */
(function(){
"use strict";
/* Opgave 1 van beide oefenexamens: havo26-1 Vanya (vraag 1–6), havo26-2 Schrik voor een prik (vraag 1–8). */
const E=window.EXSTOF, T1="havo26-1", T2="havo26-2";
const SV=(vb,inner,lab)=>E.svg(vb,inner,lab);
const pijl=(id,kl)=>`<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${kl}"/></marker>`;
const DEFS=`<defs>${pijl("h1pg","var(--goud)")}${pijl("h1pt","var(--teal)")}${pijl("h1pk","var(--koraal)")}${pijl("h1pp","var(--paars)")}${pijl("h1px","var(--text2)")}</defs>`;
/* klik-animatie: steps = [{cap}], draw(i) geeft de svg terug */
const anim=(steps,draw)=>box=>E.stappen(box,steps,(st,s,i)=>{st.innerHTML=draw(i,s);});
const caps=a=>a.map(c=>({cap:c}));
const hex=(cx,cy,r)=>[0,1,2,3,4,5].map(k=>{const a=Math.PI/3*k+Math.PI/6;return (cx+r*Math.cos(a)).toFixed(1)+","+(cy+r*Math.sin(a)).toFixed(1);}).join(" ");
const bact=(x,y,dood)=>`<g${dood?' opacity=".55"':""}><ellipse cx="${x}" cy="${y}" rx="9" ry="8" fill="${dood?"none":"var(--goud)"}" stroke="var(--goud)" stroke-width="1.6"${dood?' stroke-dasharray="3 3"':""}/><ellipse cx="${x+17}" cy="${y}" rx="9" ry="8" fill="${dood?"none":"var(--goud)"}" stroke="var(--goud)" stroke-width="1.6"${dood?' stroke-dasharray="3 3"':""}/></g>`;

/* =====================================================================
   havo26-1 · opgave 1 Vanya
   ===================================================================== */

/* --- respirogram (vraag 1–2) --- */
function respL(t){
  const sm=s=>(1-Math.cos(Math.PI*Math.max(0,Math.min(1,s))))/2;
  if(t<16)return 2.75-.25*Math.cos(2*Math.PI*t/4);
  if(t<20)return 2.5+3.1*sm((t-16)/4);
  if(t<25)return 5.6-4.3*sm((t-20)/5);
  if(t<28)return 1.3+1.2*sm((t-25)/3);
  return 2.75-.25*Math.cos(2*Math.PI*(t-28)/4);
}
function respSvg(i){
  const X=t=>50+t*11.25,Y=L=>230-L*35;let g="";
  for(let L=0;L<=6;L++)g+=`<line class="grid" x1="50" x2="500" y1="${Y(L)}" y2="${Y(L)}"/><text class="tick" x="42" y="${Y(L)+4}" text-anchor="end">${L}</text>`;
  for(let t=0;t<=40;t+=8)g+=`<text class="tick" x="${X(t)}" y="246" text-anchor="middle">${t}</text>`;
  g+=`<path class="ax" d="M50,16 V230 H500"/><text class="tick" x="275" y="264" text-anchor="middle">tijd (s)</text>
  <text class="tick" x="14" y="125" transform="rotate(-90 14 125)" text-anchor="middle">longvolume (L)</text>`;
  if(i>=3)g+=`<rect x="50" y="${Y(1.3)}" width="450" height="${Y(0)-Y(1.3)}" fill="var(--paars-soft)"/><text class="lbl" x="275" y="${Y(.55)}" text-anchor="middle">restvolume: deze lucht blijft altijd in je longen</text>`;
  const tmax=i<2?16:40;let d="";for(let t=0;t<=tmax+1e-9;t+=.1)d+=(d?"L":"M")+X(t).toFixed(1)+","+Y(respL(t)).toFixed(1);
  g+=`<path class="cv" d="${d}"/>`;
  g+=`<path d="M${X(0)},${Y(3)} H${X(16)} M${X(0)},${Y(2.5)} H${X(16)}" stroke="var(--goud)" stroke-dasharray="4 4" fill="none"/><text class="lbl" x="${X(8)}" y="${Y(3)-8}" text-anchor="middle" style="fill:var(--goud-text)">ademvolume</text>`;
  if(i===1)[2,6,10,14].forEach((t,k)=>g+=`<circle cx="${X(t)}" cy="${Y(3)}" r="9" fill="var(--goud)"/><text x="${X(t)}" y="${Y(3)+4}" text-anchor="middle" class="lbl" style="fill:var(--surface)">${k+1}</text>`);
  if(i>=2)g+=`<path d="M${X(16)},${Y(5.6)} H${X(31)} M${X(16)},${Y(1.3)} H${X(31)}" stroke="var(--teal)" stroke-dasharray="4 4" fill="none"/>
    <path d="M${X(30)},${Y(5.6)} V${Y(1.3)}" stroke="var(--teal)" stroke-width="2" marker-start="url(#h1pt)" marker-end="url(#h1pt)"/>
    <text class="lbl" x="${X(30.6)}" y="${Y(4.4)}">vitale</text><text class="lbl" x="${X(30.6)}" y="${Y(4.4)+15}">capaciteit</text>`;
  if(i===4)g+=`<rect x="568" y="50" width="12" height="70" rx="3" fill="var(--goud)"/>
    <path d="M574,118 L540,160 M574,118 L608,160 M540,160 L528,178 M540,160 L552,180 M608,160 L596,180 M608,160 L620,178" stroke="var(--goud)" stroke-width="7" stroke-linecap="round" fill="none"/>
    ${[[524,190],[548,192],[594,192],[622,190],[536,204],[608,204]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="9" fill="var(--teal-soft)" stroke="var(--teal)"/>`).join("")}
    <text class="lbl" x="574" y="34" text-anchor="middle" style="fill:var(--goud-text)">dode ruimte</text>
    <text class="lblm" x="574" y="232" text-anchor="middle">longblaasjes:</text><text class="lblm" x="574" y="247" text-anchor="middle">gaswisseling</text>`;
  return SV("0 0 640 270",DEFS+g,"Respirogram met ademvolume, vitale capaciteit en restvolume");
}
E.zet(T1,[1,2],{titel:"Longvolumes en het respirogram",
  html:`<p>Bij <b>rustig ademen</b> is inademen actief: het <b>middenrif</b> en de <b>tussenribspieren</b> trekken samen, je borstholte wordt groter en er stroomt lucht naar binnen. Uitademen gaat dan vanzelf (passief): de spieren ontspannen.</p>
  <p>Wil je dieper of sneller ademen, bijvoorbeeld bij inspanning, dan helpen extra spieren mee. Ook het uitademen wordt dan actief.</p>
  <ul><li><b>ademvolume</b>: de lucht die je per ademhaling in- of uitademt</li>
  <li><b>ademhalingsfrequentie</b>: het aantal ademhalingen per minuut</li>
  <li><b>vitale capaciteit</b>: maximaal inademen na maximaal uitademen</li>
  <li><b>restvolume</b>: de lucht die na een maximale uitademing nog in je longen zit</li>
  <li><b>dode ruimte</b>: de lucht in neusholte, luchtpijp en bronchiën, die niet bij de longblaasjes komt</li></ul>
  <p>In een <b>respirogram</b> lees je dit allemaal af. Let op beide assen: de hoogte van een golf is het ademvolume, het aantal golven per tijdseenheid de frequentie.</p>`,
  anim:anim(caps([
    "Een <b>respirogram</b> laat het longvolume zien in de tijd. Bij rustig ademen schommelt de lijn op en neer. Het verschil tussen dal en top is het <b>ademvolume</b>, hier 0,5 L.",
    "Elke top is één inademing. Hier zie je 4 golven in 16 seconden. Omgerekend naar een minuut: 4 × 60/16 = <b>15 ademhalingen per minuut</b>. Kijk dus altijd hoeveel tijd de x-as laat zien.",
    "Adem zo diep mogelijk in en blaas daarna zo ver mogelijk uit. Het verschil tussen de hoogste en de laagste stand is de <b>vitale capaciteit</b>.",
    "Ook na de diepste uitademing blijft er lucht in je longen: het <b>restvolume</b>.",
    "Een deel van elke inademing komt niet verder dan de luchtwegen. Daar is geen gaswisseling: dat is de <b>dode ruimte</b> (ongeveer 0,15 L)."]),respSvg),
  films:[["Adem in, adem uit","films/gaswisseling/1-adem-in-adem-uit.html"]]});

/* extra waarom vraag 2: dode ruimte en restvolume bij rustig en diep ademen */
function longSvg(diep,toon){
  /* toon: 0 dode ruimte, 1 restvolume, 2 buikspieren */
  const rv=diep?1.3:1.3, top=diep?5.6:3.0, dal=diep?1.3:2.5;
  const Y=L=>230-L*32;let g="";
  g+=`<text class="lbl" x="150" y="20" text-anchor="middle">${diep?"diep ademen":"rustig ademen"}</text>`;
  /* kolom longvolume */
  g+=`<rect x="110" y="${Y(6)}" width="80" height="${Y(0)-Y(6)}" fill="none" stroke="var(--line2)"/>
  <rect x="110" y="${Y(rv)}" width="80" height="${Y(0)-Y(rv)}" fill="var(--paars-soft)"/>
  <rect x="110" y="${Y(top)}" width="80" height="${Y(dal)-Y(top)}" fill="var(--teal-soft)" stroke="var(--teal)"/>
  <text class="lblm" x="${diep?150:104}" y="${(Y(top)+Y(dal))/2+4}" text-anchor="${diep?"middle":"end"}">ademvolume</text>
  <text class="lblm" x="150" y="${Y(rv/2)+4}" text-anchor="middle">restvolume</text>`;
  if(toon===1)g+=`<rect x="108" y="${Y(rv)}" width="84" height="${Y(0)-Y(rv)}" fill="none" stroke="var(--goud)" stroke-width="3"/>`;
  /* luchtwegen */
  g+=`<rect x="228" y="40" width="12" height="80" rx="3" fill="${toon===0?"var(--goud)":"var(--line2)"}"/>
  <path d="M234,118 L214,150 M234,118 L254,150" stroke="${toon===0?"var(--goud)":"var(--line2)"}" stroke-width="7" stroke-linecap="round"/>
  <text class="lblm" x="234" y="172" text-anchor="middle">luchtwegen</text>`;
  if(toon===2)g+=`<path d="M60,${diep?150:160} q-20,30 0,60" stroke="${diep?"var(--koraal)":"var(--line2)"}" stroke-width="${diep?6:3}" fill="none"/><text class="lblm" x="30" y="250">${diep?"buikspieren trekken samen":"spieren ontspannen"}</text>`;
  return g;
}
E.waarom(T1,2,anim(caps([
  "<b>Uitspraak 2.</b> De dode ruimte is de lucht in je luchtwegen. Of je nu rustig of diep ademt: je luchtpijp en bronchiën blijven even groot. De dode ruimte verandert dus niet: <b>onjuist</b>.",
  "<b>Uitspraak 3.</b> Het restvolume is de lucht die na een <i>maximale</i> uitademing nog in je longen zit. Dieper uitademen dan maximaal kan niet: het restvolume blijft gelijk. <b>Onjuist</b>.",
  "<b>Uitspraak 1.</b> Rustig uitademen is passief: de spieren ontspannen. Bij een diepe uitademing duw je extra lucht naar buiten: je <b>buikspieren trekken samen</b>. <b>Juist</b>.",
  "Antwoord volgens het correctievoorschrift: <b>1 juist, 2 onjuist, 3 onjuist</b>."]),
  i=>SV("0 0 600 270",DEFS+`<g>${longSvg(false,i===3?0:i)}</g><g transform="translate(300,0)">${longSvg(true,i===3?0:i)}</g>`,"Rustig en diep ademen vergeleken")));

/* --- autonoom zenuwstelsel (vraag 3 en havo26-2 vraag 6) --- */
function autoSvg(org,mode){
  /* org: [[naam, ortho-effect, para-effect]], mode: 0 beide, 1 ortho, 2 para, 3 adrenaline */
  const n=org.length,h=70+n*54,mid=40+n*27;let g="";
  g+=`<circle cx="70" cy="40" r="26" fill="var(--surface)" stroke="var(--text3)"/><text class="lblm" x="70" y="44" text-anchor="middle">hersenen</text>
  <rect x="64" y="66" width="12" height="${h-90}" rx="5" fill="var(--surface)" stroke="var(--text3)"/>
  <text class="lblm" x="84" y="${h-16}">ruggenmerg</text>`;
  const oO=mode===2?.18:1,oP=mode===1||mode===3?.18:1;
  org.forEach(([nm,o,p],k)=>{const y=58+k*54;
    g+=`<path d="M76,${mid} C160,${mid} 170,${y-7} 252,${y-7}" stroke="var(--koraal)" stroke-width="${mode===1?3.2:2}" fill="none" opacity="${oO}"/>
      <path d="M76,72 C150,72 170,${y+7} 252,${y+7}" stroke="var(--teal)" stroke-width="${mode===2?3.2:2}" fill="none" opacity="${oP}" stroke-dasharray="${mode===3?"3 4":"0"}"/>
      <rect x="252" y="${y-18}" width="136" height="36" rx="8" fill="var(--surface)" stroke="var(--line2)"/>
      <text class="lbl" x="320" y="${y+4}" text-anchor="middle">${nm}</text>`;
    if(mode===1||mode===3)g+=`<text class="lbl" x="400" y="${y+4}" style="fill:var(--koraal)">${o}</text>`;
    if(mode===2)g+=`<text class="lbl" x="400" y="${y+4}" style="fill:var(--teal)">${p}</text>`;});
  if(mode===0)g+=`<text class="lbl" x="400" y="${mid-10}" style="fill:var(--koraal)">orthosympathisch</text><text class="lblm" x="400" y="${mid+6}">actie, ‘vechten of vluchten’</text>
    <text class="lbl" x="400" y="${mid+34}" style="fill:var(--teal)">parasympathisch</text><text class="lblm" x="400" y="${mid+50}">rust en vertering</text>`;
  if(mode===3){g+=`<rect x="120" y="${h-44}" width="100" height="30" rx="8" fill="var(--goud-soft)" stroke="var(--goud)"/><text class="lbl" x="170" y="${h-25}" text-anchor="middle">bijniermerg</text>
    <path d="M76,${mid+10} C100,${h-40} 100,${h-30} 118,${h-30}" stroke="var(--koraal)" stroke-width="2" fill="none"/>
    <path d="M222,${h-30} C240,${h-30} 236,${58+(n-1)*54+20} 250,${58+(n-1)*54+18}" stroke="var(--goud)" stroke-width="2.4" stroke-dasharray="5 4" fill="none" marker-end="url(#h1pg)"/>
    <text class="lbl" x="232" y="${h-6}" style="fill:var(--goud-text)">adrenaline via het bloed</text>`;}
  return SV(`0 0 600 ${h}`,DEFS+g,"Orthosympathisch en parasympathisch zenuwstelsel");
}
function vatRij(y,nauw,lab){
  const cy=y+62,r=nauw?5:13;let g="";
  g+=`<rect x="250" y="${y+12}" width="200" height="104" rx="10" fill="var(--koraal-soft)" opacity="${nauw?.3:1}"/>
  <text class="lblm" x="440" y="${y+28}" text-anchor="end">huid</text>
  <rect x="40" y="${cy-r}" width="200" height="${2*r}" rx="${r}" fill="var(--koraal)" opacity=".85"/>`;
  for(let k=0;k<6;k++)g+=`<ellipse cx="${62+k*30}" cy="${cy}" rx="4" ry="${r+4}" fill="none" stroke="var(--paars)" stroke-width="2.6"/>`;
  [-40,-14,14,40].forEach(o=>g+=`<path d="M236,${cy} C290,${cy+o} 400,${cy+o} 456,${cy}" stroke="var(--koraal)" stroke-width="${nauw?1.4:4}" opacity="${nauw?.35:.9}" fill="none"/>`);
  g+=`<rect x="452" y="${cy-10}" width="128" height="20" rx="10" fill="var(--paars-soft)" stroke="var(--paars)"/>
  <text class="lblm" x="40" y="${cy-r-12}">slagadertje met kringspiertjes</text>
  <text class="lblm" x="516" y="${cy+30}" text-anchor="middle">adertje</text>
  <text class="lbl" x="40" y="${y+124}">${lab}</text>`;
  return g;
}
E.zet(T1,[3],{titel:"Autonoom zenuwstelsel en bloedverdeling",
  html:`<p>Je <b>autonome zenuwstelsel</b> regelt de werking van je organen, zonder dat je erover nadenkt. Het heeft twee delen die elkaars tegenspelers zijn:</p>
  <ul><li>het <b>orthosympathisch</b> zenuwstelsel: zet je lichaam in de stand ‘actie’ (inspanning, schrik, stress);</li>
  <li>het <b>parasympathisch</b> zenuwstelsel: zet je lichaam in de stand ‘rust en vertering’.</li></ul>
  <p>Bijna elk orgaan krijgt zenuwen van allebei. Wat het ene deel versnelt, remt het andere, net als gas en rem.</p>
  <p>Je hart pompt per minuut maar een beperkte hoeveelheid bloed rond (het <b>hartminuutvolume</b>). Hoeveel daarvan naar een orgaan gaat, regelt je lichaam met <b>kringspiertjes</b> in de wand van de slagadertjes: trekken ze samen, dan wordt het vat nauwer en komt er minder bloed; ontspannen ze, dan komt er meer bloed. Organen die op dat moment hard werken, krijgen zo voorrang.</p>`,
  anim:anim(caps([
    "Vanuit het ruggenmerg en de hersenen lopen twee soorten zenuwen naar dezelfde organen: <b>orthosympathisch</b> (koraal) en <b>parasympathisch</b> (teal).",
    "<b>Orthosympathisch actief</b>: je lichaam maakt zich klaar voor actie. Het hart gaat sneller, de luchtwegen worden wijder.",
    "<b>Parasympathisch actief</b>: rust. Het hart gaat langzamer en er komt veel speeksel voor de vertering.",
    "Zo wordt het bloed verdeeld: <b>kringspiertjes</b> in een slagadertje trekken samen (boven) of ontspannen (onder). Dat bepaalt hoeveel bloed er door de haarvaten van een orgaan stroomt."]),
    i=>i<3?autoSvg([["hart","sneller","langzamer"],["luchtwegen","wijder","nauwer"],["speekselklieren","weinig speeksel","veel speeksel"],["blaas","ophouden","legen"]],i)
      :SV("0 0 600 270",vatRij(0,true,"samengetrokken: nauw, weinig bloed")+vatRij(134,false,"ontspannen: wijd, veel bloed"),"Slagadertje met kringspiertjes")),
  films:[["Eén seconde","films/zenuwstelsel/1-een-seconde.html"],["Het hart onder controle","films/transport/5-het-hart-onder-controle.html"]]});

/* extra waarom vraag 3: bloedverdeling rust vs inspanning */
const BV=[["spieren",1.2,12.5],["hart",.25,.9],["huid",.5,1.9],["hersenen",.75,.8],["darmen, maag",1.4,.5],["nieren",1.1,.5]];
E.waarom(T1,3,anim(caps([
  "<b>In rust</b> pompt het hart ongeveer 5 liter bloed per minuut rond. De darmen krijgen daar een flink deel van: ze zijn bezig met verteren.",
  "<b>Tijdens het fietsen</b> is het <b>orthosympathisch</b> zenuwstelsel het meest actief. Het hart pompt veel meer bloed rond, en de spieren krijgen het grootste deel.",
  "Om dat mogelijk te maken knijpen de slagadertjes naar de <b>darmen</b> samen. De doorbloeding van de darmen <b>neemt af</b>.",
  "Dus: <b>orthosympathisch · neemt af</b>. Dat is antwoord <b>A</b>."]),
  i=>{const ins=i>0;let g=`<text class="lbl" x="20" y="22">${ins?"tijdens het fietsen":"in rust"}</text><text class="tick" x="500" y="22" text-anchor="end">liter bloed per minuut</text>`;
    BV.forEach(([nm,r,a],k)=>{const y=44+k*36,v=ins?a:r,hl=i>=2&&k===4;
      g+=`<text class="${hl?"lbl":"lblm"}" x="20" y="${y+15}"${hl?' style="fill:var(--koraal)"':""}>${nm}</text>`;
      if(ins)g+=`<rect x="130" y="${y+2}" width="${r*28}" height="18" fill="none" stroke="var(--text3)" stroke-dasharray="3 3"/>`;
      g+=`<rect x="130" y="${y+2}" width="${v*28}" height="18" rx="3" fill="${hl?"var(--koraal)":k===0&&ins?"var(--teal)":"var(--line2)"}"/>
        <text class="tick" x="${136+Math.max(v,r*(ins?1:0))*28}" y="${y+15}">${String(v).replace(".",",")}</text>`;});
    if(ins)g+=`<text class="lblm" x="130" y="270">gestippeld = in rust</text>`;
    if(i===1)g+=`<text class="lbl" x="500" y="270" text-anchor="end" style="fill:var(--koraal)">orthosympathisch actief</text>`;
    return SV("0 0 520 280",g,"Verdeling van het bloed over de organen");}));

/* --- bloeddruk (vraag 4) --- */
function pDruk(t){const ph=((t%.8)+.8)%.8,k=4;if(ph<.12)return 80+40*Math.sin(ph/.12*Math.PI/2);
  return 80+40*(Math.exp(-k*(ph-.12))-Math.exp(-k*.68))/(1-Math.exp(-k*.68));}
function drukSvg(i){
  const X=t=>60+t*180,Y=p=>230-(p-60)*2.4;let g="";
  for(let p=60;p<=140;p+=20)g+=`<line class="grid" x1="60" x2="500" y1="${Y(p)}" y2="${Y(p)}"/><text class="tick" x="52" y="${Y(p)+4}" text-anchor="end">${p}</text>`;
  for(let t=0;t<=2.4;t+=.8)g+=`<text class="tick" x="${X(t)}" y="246" text-anchor="middle">${t.toFixed(1).replace(".",",")}</text>`;
  g+=`<path class="ax" d="M60,26 V230 H500"/><text class="tick" x="280" y="262" text-anchor="middle">tijd (s)</text>
  <text class="tick" x="16" y="128" transform="rotate(-90 16 128)" text-anchor="middle">druk in de aorta (mm Hg)</text>`;
  const tmax=i<2?.8:2.4;let d="";for(let t=0;t<=tmax+1e-9;t+=.01)d+=(d?"L":"M")+X(t).toFixed(1)+","+Y(pDruk(t)).toFixed(1);
  g+=`<path class="cv" d="${d}"/>`;
  if(i===0||i>=2)g+=`<path d="M60,${Y(120)} H${X(tmax)}" stroke="var(--koraal)" stroke-dasharray="4 4"/><text class="lbl" x="${X(.14)}" y="${Y(120)-8}" style="fill:var(--koraal)">bovendruk 120</text>`;
  if(i>=1)g+=`<path d="M60,${Y(80)} H${X(tmax)}" stroke="var(--teal)" stroke-dasharray="4 4"/><text class="lbl" x="${X(.3)}" y="${Y(80)+18}" style="fill:var(--teal)">onderdruk 80</text>`;
  if(i===0)g+=`<rect x="${X(0)}" y="30" width="${X(.12)-X(0)}" height="200" fill="var(--koraal-soft)" opacity=".7"/><text class="lblm" x="${X(.14)}" y="48">kamer trekt samen</text>`;
  if(i===1)g+=`<rect x="${X(.12)}" y="30" width="${X(.8)-X(.12)}" height="200" fill="var(--teal-soft)" opacity=".6"/><text class="lblm" x="${X(.3)}" y="48">kamer ontspant, de rekbare aorta duwt het bloed verder</text>`;
  if(i>=2)[0,.8,1.6].forEach((t,k)=>g+=`<circle cx="${X(t+.12)}" cy="${Y(120)}" r="9" fill="var(--goud)"/><text x="${X(t+.12)}" y="${Y(120)+4}" text-anchor="middle" class="lbl" style="fill:var(--surface)">${k+1}</text>`);
  if(i===3)g+=`<rect x="250" y="34" width="244" height="40" rx="8" fill="var(--surface)" stroke="var(--goud)"/><text class="lbl" x="372" y="58" text-anchor="middle">slagvolume × hartfrequentie = HMV</text>`;
  return SV("0 0 520 270",g,"Bloeddruk in de aorta tijdens een paar hartslagen");
}
E.zet(T1,[4],{titel:"Hartminuutvolume en bloeddruk",
  html:`<ul><li>Het <b>slagvolume</b> is de hoeveelheid bloed die een hartkamer per samentrekking wegpompt (in rust ongeveer 70 mL).</li>
  <li>De <b>hartfrequentie</b> is het aantal hartslagen per minuut.</li>
  <li>Het <b>hartminuutvolume</b> is de hoeveelheid bloed die het hart per minuut wegpompt: slagvolume × hartfrequentie. Bijvoorbeeld 70 mL × 75 = ruim 5 liter per minuut.</li></ul>
  <p>De <b>bloeddruk</b> is de druk van het bloed op de wand van de slagaders. Trekt de linkerkamer samen, dan stijgt de druk tot de <b>bovendruk</b> (systolische druk). Ontspant de kamer, dan sluiten de halvemaanvormige kleppen en daalt de druk tot de <b>onderdruk</b> (diastolische druk). Dat de druk niet tot 0 zakt, komt door de rekbare, elastische wand van de grote slagaders. Je noteert de bloeddruk als bovendruk/onderdruk, bijvoorbeeld 120/80 mm Hg.</p>`,
  anim:anim(caps([
    "De linkerkamer trekt samen en perst bloed de aorta in. De druk stijgt snel tot de <b>bovendruk</b>.",
    "De kamer ontspant. De kleppen sluiten en de uitgerekte aortawand veert terug. De druk daalt langzaam tot de <b>onderdruk</b>.",
    "Elke piek is één hartslag: hier één per 0,8 s, dus 60/0,8 = <b>75 slagen per minuut</b> (de hartfrequentie).",
    "Vermenigvuldig je het <b>slagvolume</b> met de hartfrequentie, dan krijg je het <b>hartminuutvolume</b>: hoeveel bloed er per minuut door de aorta gaat."]),drukSvg),
  films:[["Eén pomp, twee rondjes","films/transport/1-een-pomp-twee-rondjes.html"],["Buizen onder druk","films/transport/2-buizen-onder-druk.html"]]});

/* --- dissimilatie (vraag 5) --- */
function dissSvg(i){
  let g=`<rect x="10" y="10" width="580" height="250" rx="22" fill="none" stroke="var(--text3)" stroke-dasharray="6 5"/><text class="lblm" x="24" y="32">spiercel</text>
  <polygon points="${hex(90,135,30)}" fill="var(--goud-soft)" stroke="var(--goud)" stroke-width="2"/><text class="lbl" x="90" y="139" text-anchor="middle">glucose</text>`;
  if(i===1){g+=`<path d="M124,120 C180,80 220,70 270,70" stroke="var(--teal)" stroke-width="2.4" fill="none" marker-end="url(#h1pt)"/>
    <circle cx="200" cy="40" r="14" fill="var(--teal-soft)" stroke="var(--teal)"/><text class="lbl" x="200" y="44" text-anchor="middle">O₂</text>
    <text class="lbl" x="280" y="66">koolstofdioxide + water</text><text class="lblm" x="280" y="84">in de mitochondriën</text>
    <rect x="280" y="98" width="290" height="18" rx="4" fill="var(--groen)"/><text class="lbl" x="280" y="134">veel energie (ATP)</text>`;}
  if(i===2){g+=`<path d="M124,150 C180,190 220,200 270,200" stroke="var(--koraal)" stroke-width="2.4" fill="none" marker-end="url(#h1pk)"/>
    <text class="lbl" x="280" y="196">melkzuur</text><text class="lblm" x="280" y="214">in het cytoplasma, zonder zuurstof</text>
    <rect x="280" y="226" width="16" height="18" rx="4" fill="var(--groen)"/><text class="lbl" x="304" y="240">weinig energie (ruim 15 keer minder)</text>
    ${[0,1,2,3,4].map(k=>`<circle cx="${400+k*30}" cy="${170-(k%2)*12}" r="6" fill="var(--koraal)"/>`).join("")}`;}
  if(i===3){g+=`<text class="lblm" x="24" y="32" style="visibility:hidden">x</text><rect x="12" y="12" width="96" height="24" fill="var(--surface2)"/><text class="lblm" x="24" y="32">gistcel</text>
    <path d="M124,150 C180,190 220,200 270,200" stroke="var(--paars)" stroke-width="2.4" fill="none" marker-end="url(#h1pp)"/>
    <text class="lbl" x="280" y="196">alcohol + koolstofdioxide</text><text class="lblm" x="280" y="214">alcoholgisting, ook zonder zuurstof</text>
    <rect x="280" y="226" width="16" height="18" rx="4" fill="var(--groen)"/><text class="lbl" x="304" y="240">weinig energie</text>`;}
  if(i===0)g+=`<text class="lbl" x="340" y="120" text-anchor="middle">glucose is de brandstof.</text><text class="lblm" x="340" y="140" text-anchor="middle">De cel haalt er energie (ATP) uit</text><text class="lblm" x="340" y="158" text-anchor="middle">door hem af te breken: dissimilatie.</text>`;
  return SV("0 0 600 270",DEFS+g,"Aerobe en anaerobe dissimilatie");
}
E.zet(T1,[5],{titel:"Aerobe en anaerobe dissimilatie",
  html:`<p>Bij <b>dissimilatie</b> breekt een cel brandstof (vooral <b>glucose</b>) af. De energie die daarbij vrijkomt, wordt vastgelegd in <b>ATP</b>, de ‘energiemunt’ van de cel.</p>
  <ul><li><b>Aerobe dissimilatie</b> (met zuurstof): glucose + zuurstof → koolstofdioxide + water + veel energie. Het grootste deel gebeurt in de <b>mitochondriën</b>.</li>
  <li><b>Anaerobe dissimilatie</b> (zonder zuurstof): bij de mens glucose → <b>melkzuur</b> + weinig energie. Dit gebeurt in het cytoplasma. Bij gist ontstaan alcohol en koolstofdioxide (<b>alcoholgisting</b>).</li></ul>
  <p>Anaeroob levert per glucosemolecuul veel minder ATP op dan aeroob. Melkzuur verlaagt de pH in de spier.</p>`,
  anim:anim(caps([
    "Een spiercel heeft energie nodig om samen te trekken. Die haalt hij uit <b>glucose</b>.",
    "<b>Aeroob</b>: met zuurstof wordt glucose helemaal afgebroken tot koolstofdioxide en water. Dat levert <b>veel</b> energie op.",
    "<b>Anaeroob</b>: zonder zuurstof wordt glucose maar gedeeltelijk afgebroken, tot <b>melkzuur</b>. Dat levert <b>weinig</b> energie op, en het melkzuur hoopt zich op.",
    "Gistcellen doen het anaeroob anders: zij maken <b>alcohol en koolstofdioxide</b>. Zo rijst brooddeeg."]),dissSvg),
  films:[["Alles op adem","films/stofwisseling/2-alles-op-adem.html"]]});

/* extra waarom vraag 5 */
E.waarom(T1,5,anim(caps([
  "<b>Rustig fietsen:</b> bloed en longen voeren genoeg zuurstof aan voor wat de spiercellen nodig hebben. Alle glucose wordt aeroob afgebroken.",
  "<b>Zo hard als ze kan:</b> de spieren hebben veel meer zuurstof nodig dan hart en longen kunnen aanvoeren. Er is een <b>tekort aan zuurstof</b>.",
  "Een deel van de glucose wordt dan <b>anaeroob</b> afgebroken: er ontstaat melkzuur en de pH in de spier daalt.",
  "Koolstofdioxide en water zijn producten van aerobe dissimilatie, geen oorzaak. Glucose is er genoeg: die wordt juist omgezet. Het antwoord is <b>D: door een tekort aan zuurstof</b>."]),
  i=>{const nodig=i===0?1:3,aanvoer=i===0?1:2;let g=`<text class="tick" x="40" y="24">zuurstof per minuut</text>
    <rect x="40" y="${230-nodig*60}" width="60" height="${nodig*60}" fill="var(--surface)" stroke="var(--text2)" stroke-dasharray="4 3"/><text class="lblm" x="70" y="250" text-anchor="middle">nodig</text>
    <rect x="120" y="${230-aanvoer*60}" width="60" height="${aanvoer*60}" fill="var(--teal)"/><text class="lblm" x="150" y="250" text-anchor="middle">aanvoer</text>`;
    if(i>0)g+=`<rect x="120" y="${230-nodig*60}" width="60" height="${(nodig-aanvoer)*60}" fill="var(--koraal-soft)" stroke="var(--koraal)" stroke-dasharray="4 3"/><text class="lbl" x="150" y="${230-2.5*60+4}" text-anchor="middle" style="fill:var(--koraal)">tekort</text>`;
    g+=`<rect x="230" y="40" width="340" height="190" rx="20" fill="none" stroke="var(--text3)" stroke-dasharray="6 5"/><text class="lblm" x="244" y="60">spiercel</text>`;
    g+=`<text class="lbl" x="400" y="110" text-anchor="middle">${i===0?"glucose → CO₂ + water":"glucose → CO₂ + water, én"}</text>`;
    if(i>=2){g+=`<text class="lbl" x="400" y="134" text-anchor="middle" style="fill:var(--koraal)">glucose → melkzuur</text>`;
      for(let k=0;k<9;k++)g+=`<circle cx="${270+(k*47)%280}" cy="${160+(k*29)%50}" r="6" fill="var(--koraal)"/>`;
      g+=`<text class="lbl" x="556" y="60" text-anchor="end">pH daalt</text>`;}
    return SV("0 0 600 270",g,"Zuurstofbehoefte en zuurstofaanvoer van de spieren");}));

/* --- melkzuur en zuurstofschuld (vraag 6) --- */
function o2(t){if(t<2)return .3;if(t<=8)return .3+2.4*(1-Math.exp(-(t-2)/1));const o8=.3+2.4*(1-Math.exp(-6));return .3+(o8-.3)*Math.exp(-(t-8)/1.6);}
function schuldSvg(i){
  const X=t=>60+t*32,Y=v=>220-v*55;let g="";
  for(let v=0;v<=3;v++)g+=`<line class="grid" x1="60" x2="508" y1="${Y(v)}" y2="${Y(v)}"/><text class="tick" x="52" y="${Y(v)+4}" text-anchor="end">${v}</text>`;
  for(let t=0;t<=14;t+=2)g+=`<text class="tick" x="${X(t)}" y="236" text-anchor="middle">${t}</text>`;
  g+=`<path class="ax" d="M60,36 V220 H508"/><text class="tick" x="284" y="254" text-anchor="middle">tijd (min)</text>
  <text class="tick" x="16" y="128" transform="rotate(-90 16 128)" text-anchor="middle">zuurstof (L/min)</text>
  <rect x="${X(2)}" y="36" width="${X(8)-X(2)}" height="184" fill="var(--surface)" opacity=".5"/><text class="lblm" x="${X(5)}" y="30" text-anchor="middle">inspanning</text>`;
  let up="",tek="",sch="";
  for(let t=0;t<=14.001;t+=.1)up+=(up?"L":"M")+X(t).toFixed(1)+","+Y(o2(t)).toFixed(1);
  if(i>=1){for(let t=2;t<=8.001;t+=.1)tek+=(tek?"L":"M")+X(t).toFixed(1)+","+Y(o2(t)).toFixed(1);tek+=`L${X(8)},${Y(3)} L${X(2)},${Y(3)}Z`;
    g+=`<path d="${tek}" fill="var(--koraal-soft)"/><text class="lbl" x="${X(4.6)}" y="${Y(2.4)}" text-anchor="middle" style="fill:var(--koraal)">zuurstoftekort</text>`;}
  if(i>=2){for(let t=8;t<=14.001;t+=.1)sch+=(sch?"L":"M")+X(t).toFixed(1)+","+Y(o2(t)).toFixed(1);sch+=`L${X(14)},${Y(.3)} L${X(8)},${Y(.3)}Z`;
    g+=`<path d="${sch}" fill="var(--teal-soft)"/><text class="lbl" x="${X(9.9)}" y="${Y(1.1)}" style="fill:var(--teal)">zuurstofschuld</text>`;}
  g+=`<path d="M${X(2)},${Y(3)} H${X(8)}" stroke="var(--text2)" stroke-width="2" stroke-dasharray="6 4"/><text class="lblm" x="${X(8)+6}" y="${Y(3)+4}">nodig</text>`;
  g+=`<path class="cv" d="${up}"/><text class="lblm" x="${X(.2)}" y="${Y(.3)-8}">opname</text>`;
  return SV("0 0 520 262",g,"Zuurstofopname voor, tijdens en na inspanning");
}
E.zet(T1,[6],{titel:"Melkzuur en zuurstofschuld",
  html:`<p>Bij zware inspanning ontstaat in de spieren <b>melkzuur</b>. Dat verlaagt de pH en maakt dat je spieren ‘verzuren’.</p>
  <ul><li>Melkzuur blijft niet in de spiercel: het gaat via het weefselvocht het <b>bloed</b> in en wordt afgevoerd.</li>
  <li>Het lichaam ruimt het melkzuur op door het weer om te zetten, voor een groot deel terug in <b>glucose</b>. Dat kost energie, dus zuurstof.</li>
  <li>Daarom blijf je na inspanning nog even snel ademen: je lost de <b>zuurstofschuld</b> af.</li></ul>
`,
  anim:anim(caps([
    "Bij zware inspanning hebben je spieren ineens veel meer zuurstof nodig (gestippelde lijn). Je opname stijgt, maar niet snel genoeg.",
    "Het verschil is het <b>zuurstoftekort</b>. In die tijd breken de spieren een deel van de glucose anaeroob af: er ontstaat <b>melkzuur</b>.",
    "Na de inspanning blijft de zuurstofopname nog een tijd hoger dan in rust: de <b>zuurstofschuld</b>. Die extra zuurstof is onder andere nodig om het melkzuur weer om te zetten."]),schuldSvg),
  films:[["Alles op adem","films/stofwisseling/2-alles-op-adem.html"]]});

/* extra waarom vraag 6: melkzuur naar de lever */
E.waarom(T1,6,anim(caps([
  "Het melkzuur gaat uit de spiercellen het <b>bloed</b> in.",
  "Het bloed voert het melkzuur af, onder andere naar de <b>lever</b>.",
  "De lever zet het melkzuur weer om, vooral in <b>glucose</b>. Daarvoor is zuurstof nodig. De glucose kan terug naar de spieren.",
  "Niet het spijsverteringskanaal (melkzuur zit in het bloed, niet in de darm), niet uitademen (melkzuur is geen gas) en de nieren scheiden er maar heel weinig van uit. Het antwoord is <b>B: omgezet in de lever</b>."]),
  i=>{let g=`<rect x="20" y="70" width="140" height="110" rx="20" fill="var(--surface)" stroke="var(--line2)"/><text class="lbl" x="90" y="196" text-anchor="middle">beenspier</text>
    <path d="M380,80 C430,40 560,50 570,100 C580,150 500,190 420,180 C370,174 350,120 380,80Z" fill="var(--surface)" stroke="${i>=1?"var(--goud)":"var(--line2)"}" stroke-width="${i>=1?2.4:1}"/><text class="lbl" x="470" y="206" text-anchor="middle">lever</text>
    <path d="M160,100 H380" stroke="var(--koraal)" stroke-width="10" opacity=".35"/><path d="M380,150 H160" stroke="var(--koraal)" stroke-width="10" opacity=".35"/>
    <path d="M200,100 H340" stroke="var(--koraal)" stroke-width="1.6" marker-end="url(#h1pk)"/><path d="M340,150 H200" stroke="var(--koraal)" stroke-width="1.6" marker-end="url(#h1pk)"/>
    <text class="lblm" x="270" y="86" text-anchor="middle">bloed</text>`;
    const mz=(x,y)=>`<circle cx="${x}" cy="${y}" r="6" fill="var(--koraal)"/>`,gl=(x,y)=>`<polygon points="${hex(x,y,8)}" fill="var(--goud)"/>`;
    if(i===0)g+=mz(60,110)+mz(90,130)+mz(120,105)+mz(175,100)+mz(200,100);
    if(i===1)g+=mz(240,100)+mz(290,100)+mz(330,100)+mz(420,110)+mz(450,130);
    if(i>=2){g+=gl(440,110)+gl(480,130)+gl(510,100)+gl(300,150)+gl(240,150);g+=`<text class="lbl" x="470" y="70" text-anchor="middle" style="fill:var(--goud-text)">melkzuur → glucose</text>`;}
    if(i===3)g+=`<text class="lbl" x="300" y="240" text-anchor="middle">legenda: <tspan style="fill:var(--koraal)">● melkzuur</tspan>   <tspan style="fill:var(--goud-text)">⬢ glucose</tspan></text>`;
    return SV("0 0 600 250",DEFS+g,"Melkzuur gaat via het bloed naar de lever");}));

/* =====================================================================
   havo26-2 · opgave 1 Schrik voor een prik
   ===================================================================== */

/* --- barrières (vraag 1) --- */
function huidSvg(){let g=`<rect x="0" y="0" width="520" height="60" fill="var(--surface)"/><text class="lblm" x="12" y="20">buitenwereld</text>`;
  for(let r=0;r<3;r++)for(let k=0;k<9;k++)g+=`<rect x="${4+k*58+(r%2)*29}" y="${62+r*11}" width="54" height="9" rx="3" fill="var(--line2)" stroke="var(--text3)" stroke-width=".6"/>`;
  for(let k=0;k<8;k++)g+=`<rect x="${6+k*64}" y="${100}" width="60" height="58" rx="8" fill="var(--surface)" stroke="var(--text3)"/><circle cx="${36+k*64}" cy="129" r="9" fill="var(--line2)"/>`;
  g+=bact(120,40)+bact(300,44)+bact(420,36);
  g+=`<path d="M309,50 L309,70" stroke="var(--koraal)" stroke-width="2.4"/><path d="M302,58 L316,66 M316,58 L302,66" stroke="var(--koraal)" stroke-width="2.4"/>
  <text class="lbl" x="508" y="20" text-anchor="end">hoornlaag: dode, verhoornde cellen</text><text class="lblm" x="12" y="180">levende cellen van de opperhuid</text>`;
  return SV("0 0 520 190",g,"Huid met hoornlaag houdt bacteriën tegen");}
function slijmSvg({pijl:pl,lyso,neus}={}){
  let g=`<rect x="0" y="34" width="520" height="62" fill="var(--groen-soft)"/><text class="lblm" x="12" y="24">${neus?"neusholte":"luchtweg"} · laag slijm</text>`;
  for(let k=0;k<6;k++){const x=10+k*84;g+=`<rect x="${x}" y="110" width="80" height="96" rx="7" fill="var(--surface)" stroke="var(--text3)"/><ellipse cx="${x+40}" cy="168" rx="14" ry="10" fill="var(--line2)"/>`;
    for(let c=0;c<8;c++)g+=`<path d="M${x+6+c*10},110 q${pl?5:2},-8 ${pl?6:0},-14" stroke="var(--text3)" stroke-width="1.3" fill="none"/>`;}
  g+=bact(80,60,lyso)+bact(230,70)+bact(380,58,lyso);
  if(pl)g+=`<path d="M60,42 H480" stroke="var(--goud)" stroke-width="2.4" marker-end="url(#h1pg)"/><text class="lbl" x="508" y="24" text-anchor="end" style="fill:var(--goud-text)">trilharen voeren het slijm af naar de keel</text>`;
  if(lyso)[[110,80],[360,80],[290,52]].forEach(([x,y])=>g+=`<path d="M${x},${y} l10,-6 a12,12 0 1 0 0,12 z" fill="var(--paars)"/>`);
  if(lyso)g+=`<text class="lbl" x="508" y="${pl?224:24}" text-anchor="end" style="fill:var(--paars)">lysozym breekt de celwand af</text>`;
  g+=`<text class="lblm" x="12" y="224">trilhaarepitheel (slijmvlies)</text>`;
  return SV("0 0 520 232",DEFS+g,"Slijmvlies met trilharen en bacteriën in het slijm");}
function chemSvg(){let g=`<rect x="0" y="0" width="520" height="150" rx="12" fill="var(--surface)"/>`;
  g+=bact(120,70,true)+bact(260,80)+bact(380,64,true);
  [[150,80],[410,74],[340,96]].forEach(([x,y])=>g+=`<path d="M${x},${y} l10,-6 a12,12 0 1 0 0,12 z" fill="var(--paars)"/>`);
  g+=`<text class="lbl" x="260" y="130" text-anchor="middle" style="fill:var(--paars)">een stof (zuur of enzym) doodt de bacterie</text>`;
  return SV("0 0 520 150",g,"Een chemische barrière doodt bacteriën");}
E.zet(T2,[1],{titel:"Aangeboren afweer: barrières",
  html:`<p>Je afweer bestaat uit de <b>aangeboren</b> (niet-specifieke) afweer en de <b>verworven</b> (specifieke) afweer. De eerste verdedigingslinie van de aangeboren afweer zijn de <b>barrières</b>: ze houden ziekteverwekkers buiten, voordat die in het inwendig milieu komen.</p>
  <ul><li><b>Fysische barrières</b> houden ziekteverwekkers tegen of voeren ze af. Voorbeelden: de <b>hoornlaag</b> van de huid (een laag dode cellen), <b>slijm</b> dat bacteriën vangt en <b>trilharen</b> die dat slijm wegvoeren, hoesten en niezen.</li>
  <li><b>(Bio)chemische barrières</b> werken met een stof die ziekteverwekkers doodt of remt. Voorbeelden: de <b>lage pH</b> van maagzuur en van de huid, en <b>lysozym</b>: een enzym dat de celwand van bacteriën afbreekt (onder andere in traanvocht en speeksel).</li>
  <li>Ook de nuttige bacteriën op je huid en in je darmen beschermen je: ze laten weinig ruimte over voor ziekteverwekkers.</li></ul>
  <p>Welke barrière waar zit, staat in de tabel over de aangeboren afweer in je informatieboek.</p>`,
  anim:anim(caps([
    "<b>Huid:</b> de buitenste laag, de <b>hoornlaag</b>, bestaat uit dode, verhoornde cellen. Bacteriën komen daar niet doorheen. Een fysische barrière.",
    "<b>Slijmvlies:</b> slijm vangt bacteriën en stofdeeltjes. <b>Trilharen</b> bewegen het slijm weg. Ook een fysische barrière.",
    "<b>Chemisch:</b> een stof doet het werk. <b>Lysozym</b> breekt de celwand van bacteriën af; in de maag doodt het <b>zoutzuur</b> (pH 1 à 2) veel ziekteverwekkers."]),
    i=>i===0?huidSvg():i===1?slijmSvg({pijl:true}):chemSvg()),
  films:[["De eerste verdediging","films/afweer/1-de-eerste-verdediging.html"]]});
E.waarom(T2,1,anim(caps([
  "De neusholte is bekleed met <b>slijmvlies</b>, niet met huid. Een <b>hoornlaag</b> zit hier dus niet: die valt af.",
  "Het slijmvlies is <b>trilhaarepitheel</b>: het slijm vangt de bacteriën en de trilharen voeren het af naar de keel. Dat is de <b>fysische</b> barrière.",
  "In het neusslijm zit <b>lysozym</b>, een enzym dat de celwand van bacteriën afbreekt: de <b>(bio)chemische</b> barrière. Een lage pH vind je in de maag en op de huid, niet in de neus.",
  "Dus: <b>trilhaarepitheel · lysozymen</b>. Dat is antwoord <b>D</b>."]),
  i=>slijmSvg({neus:true,pijl:i===1||i===3,lyso:i>=2})));

/* --- symbiose (vraag 2) --- */
function symRij(y,naam,a,b,sa,sb,hl){
  const kl=s=>s==="+"?"var(--groen)":s==="−"?"var(--koraal)":"var(--text3)";
  return `<rect x="10" y="${y}" width="540" height="64" rx="10" fill="${hl?"var(--goud-soft)":"none"}" stroke="${hl?"var(--goud)":"var(--line2)"}"/>
  <text class="lbl" x="26" y="${y+38}">${naam}</text>
  <circle cx="250" cy="${y+32}" r="22" fill="var(--surface)" stroke="${kl(sa)}" stroke-width="2.4"/><text x="250" y="${y+40}" text-anchor="middle" style="font:700 22px var(--meta);fill:${kl(sa)}">${sa}</text>
  <text class="lblm" x="280" y="${y+37}">${a}</text>
  <circle cx="410" cy="${y+32}" r="22" fill="var(--surface)" stroke="${kl(sb)}" stroke-width="2.4"/><text x="410" y="${y+40}" text-anchor="middle" style="font:700 22px var(--meta);fill:${kl(sb)}">${sb}</text>
  <text class="lblm" x="440" y="${y+37}">${b}</text>`;
}
E.zet(T2,[2],{titel:"Symbiose",
  html:`<p>Bij <b>symbiose</b> leven twee organismen van verschillende soorten langdurig nauw samen. Je deelt symbiose in naar het effect voor elk van beide:</p>
  <ul><li><b>mutualisme</b>: beide soorten hebben voordeel (+ +);</li>
  <li><b>commensalisme</b>: de ene soort heeft voordeel, de andere geen voordeel en geen nadeel (+ 0);</li>
  <li><b>parasitisme</b>: de ene soort heeft voordeel, de andere nadeel (+ −). De parasiet leeft ten koste van de gastheer.</li></ul>
  <p>Dezelfde twee soorten kunnen op een andere plek of in een andere situatie een andere vorm van symbiose hebben. Kijk dus steeds naar wat er op dát moment gebeurt.</p>`,
  anim:box=>{box.innerHTML=SV("0 0 560 236",symRij(6,"mutualisme","bij (nectar)","bloem (bestoven)","+","+")+symRij(82,"commensalisme","zeepok (lift)","walvis","+","0")+symRij(158,"parasitisme","lintworm","mens","+","−"),"Drie vormen van symbiose met voorbeelden");},
  films:[["Plek genoeg?","films/ecologie/plek-genoeg/index.html"],["Je darmbewoners","films/voeding/6-je-darmbewoners.html"]]});
E.waarom(T2,2,anim(caps([
  "<b>Neusslijmvlies:</b> de bacterie leeft er en heeft dus voordeel. Gezonde mensen hebben er volgens de tekst geen voordeel of nadeel van: <b>+ 0 = commensalisme</b>.",
  "<b>Inwendig milieu:</b> de bacterie heeft weer voordeel, maar veroorzaakt een ernstige longontsteking. De mens heeft nadeel: <b>+ − = parasitisme</b>.",
  "Dus: <b>commensalisme · parasitisme</b>. Dat is antwoord <b>B</b>."]),
  i=>SV("0 0 560 160",symRij(6,"neusslijmvlies","bacterie","mens","+","0",i===0||i===2)+symRij(86,"inwendig milieu","bacterie","mens","+","−",i>=1),"Symbiose op twee plekken")));

/* --- virussen (vraag 3) --- */
function virusSvg(i){
  let g=`<circle cx="260" cy="140" r="${i===3?0:100}" fill="var(--surface)" stroke="var(--text3)" stroke-width="1.6"/>`;
  if(i<3)g+=`<ellipse cx="240" cy="160" rx="34" ry="26" fill="var(--line2)" stroke="var(--text3)"/><text class="lblm" x="240" y="164" text-anchor="middle">kern</text><text class="lblm" x="300" y="60" text-anchor="middle">gastheercel</text>`;
  const vir=(x,y,s=1)=>`<polygon points="${hex(x,y,9*s)}" fill="var(--paars)"/><polygon points="${hex(x,y,4*s)}" fill="var(--surface)"/>`;
  if(i===0)g+=vir(260,30)+`<path d="M260,40 V48" stroke="var(--paars)" stroke-width="2"/><text class="lbl" x="280" y="26">virus hecht aan de cel</text>`;
  if(i===1)g+=vir(260,30)+`<path d="M260,44 C270,80 230,100 248,128" stroke="var(--paars)" stroke-width="2.4" fill="none" marker-end="url(#h1pp)"/><text class="lbl" x="280" y="26">erfelijk materiaal gaat naar binnen</text>`;
  if(i===2){for(let k=0;k<9;k++)g+=vir(180+(k*53)%170,90+(k*37)%110,.8);g+=`<text class="lbl" x="510" y="40" text-anchor="end">de cel maakt nieuwe virussen</text>`;}
  if(i===3){g+=`<path d="M170,80 Q160,140 180,200 M350,80 Q362,140 340,200 M200,60 Q260,40 320,60 M200,226 Q260,240 320,226" stroke="var(--koraal)" stroke-width="1.6" stroke-dasharray="6 6" fill="none"/>`;
    [[110,60],[420,70],[90,200],[430,210],[260,20],[260,260],[160,140],[360,140]].forEach(([x,y])=>g+=vir(x,y,.8));
    g+=`<text class="lbl" x="260" y="144" text-anchor="middle" style="fill:var(--koraal)">cel kapot</text>`;}
  return SV("0 0 520 280",DEFS+g,"Een virus vermenigvuldigt zich in een gastheercel");
}
E.zet(T2,[3],{titel:"Virussen vermenigvuldigen zich in cellen",
  html:`<p>Een <b>virus</b> is geen cel: het is erfelijk materiaal (DNA of RNA) in een eiwitmantel. Het heeft geen eigen stofwisseling en kan zich niet zelf vermenigvuldigen.</p>
  <ul><li>Een virus hecht zich aan een <b>gastheercel</b> en brengt zijn erfelijk materiaal naar binnen.</li>
  <li>De cel gaat volgens de instructies van het virus <b>nieuwe virussen</b> maken.</li>
  <li>Vaak gaat de gastheercel daarbij <b>kapot</b>. De nieuwe virussen infecteren buurcellen.</li></ul>
  <p>Je afweer ruimt geïnfecteerde cellen op met T-cellen.</p>`,
  anim:anim(caps([
    "Het virus hecht zich aan een stofje op het celmembraan van de gastheercel.",
    "Het erfelijk materiaal van het virus gaat de cel in.",
    "De cel gebruikt zijn eigen ribosomen en bouwstoffen om <b>nieuwe virussen</b> te maken.",
    "De cel <b>barst open</b>: honderden nieuwe virussen komen vrij en infecteren de buurcellen."]),virusSvg),
  films:[["T-cellen en virussen","films/afweer/3-t-cellen-en-virussen.html"]]});

/* --- diffusie en Fick (vraag 4) --- */
function fickSvg(i){
  const A=i===1?180:110,x=i===3?10:34,n2=i===2?26:14,n1=4,cy=130;
  const V=(A/110)*((n2-n1)/10)*(34/x);let g="";
  const top=cy-A/2,bot=cy+A/2,w0=250,w1=w0+x;
  g+=`<rect x="30" y="${top}" width="${w0-30}" height="${A}" fill="var(--teal-soft)"/><rect x="${w1}" y="${top}" width="${480-w1}" height="${A}" fill="var(--koraal-soft)"/>
  <rect x="${w0}" y="${top}" width="${x}" height="${A}" fill="var(--line2)" stroke="var(--text3)"/>
  <text class="lblm" x="40" y="${top-8}">hoge concentratie (c₂)</text><text class="lblm" x="470" y="${top-8}" text-anchor="end">lage concentratie (c₁)</text>`;
  for(let k=0;k<n2;k++)g+=`<circle cx="${45+(k*67)%190}" cy="${top+10+((k*41)%(A-20))}" r="4.5" fill="var(--teal)"/>`;
  for(let k=0;k<n1;k++)g+=`<circle cx="${w1+30+(k*71)%(440-w1)}" cy="${top+14+((k*53)%(A-28))}" r="4.5" fill="var(--teal)"/>`;
  const na=Math.max(1,Math.round(V*2));for(let k=0;k<na;k++){const y=top+(k+1)*A/(na+1);g+=`<path d="M${w0-40},${y} H${w1+44}" stroke="var(--goud)" stroke-width="2.2" marker-end="url(#h1pg)"/>`;}
  g+=`<path d="M${w0},${bot+16} H${w1}" stroke="var(--text2)" stroke-width="1.4" marker-start="url(#h1px)" marker-end="url(#h1px)"/><text class="lbl" x="${(w0+w1)/2}" y="${bot+34}" text-anchor="middle">x</text>
  <path d="M20,${top} V${bot}" stroke="var(--text2)" stroke-width="1.4" marker-start="url(#h1px)" marker-end="url(#h1px)"/><text class="lbl" x="10" y="${cy+4}" text-anchor="middle">A</text>
  <text class="tick" x="526" y="30" text-anchor="end">V</text><rect x="496" y="${250-V*40}" width="20" height="${V*40}" fill="var(--goud)"/><path d="M490,250 H522" class="ax"/>`;
  return SV("0 0 540 262",DEFS+g,"Diffusie door een wand: oppervlakte, concentratieverschil en afstand");
}
E.zet(T2,[4],{titel:"Diffusie en de wet van Fick",
  html:`<p>Bij <b>diffusie</b> verplaatsen moleculen zich vanzelf van een plek met een <b>hoge</b> naar een plek met een <b>lage concentratie</b>. Zo komt zuurstof uit de longblaasjes in het bloed.</p>
  <p>Hoe snel dat gaat, beschrijft de <b>wet van Fick</b>: V = D × A × (c₂ − c₁) / x.</p>
  <ul><li><b>A</b>: de oppervlakte waar de stof doorheen kan (alle longblaasjes samen: zo groot als een tennisveld);</li>
  <li><b>c₂ − c₁</b>: het concentratieverschil (blijft groot doordat je ventileert en het bloed doorstroomt);</li>
  <li><b>x</b>: de diffusieafstand (de wand van longblaasje en haarvat is samen maar ongeveer 1 µm dik);</li>
  <li><b>D</b>: de diffusieconstante, die hangt af van de stof en de temperatuur.</li></ul>
  <p>Een factor <b>boven</b> de deelstreep groter maken, maakt V groter. Een factor <b>onder</b> de deelstreep groter maken, maakt V kleiner.</p>`,
  anim:anim(caps([
    "Zuurstofmoleculen gaan van hoog naar laag door een wand met dikte <b>x</b> en oppervlakte <b>A</b>.",
    "<b>A groter</b>: er is meer oppervlak om doorheen te gaan, dus V wordt groter. Daarom heb je zoveel longblaasjes.",
    "<b>Concentratieverschil groter</b>: V wordt groter. Ventileren en de bloedstroom houden het verschil groot.",
    "<b>x kleiner</b>: een dunnere wand, dus een kortere weg. Omdat x onder de deelstreep staat, wordt V dan groter."]),fickSvg),
  films:[["Diffusie en osmose","films/cellen/diffusie-osmose/index.html"],["Gas op reis","films/gaswisseling/2-gas-op-reis.html"]]});

/* --- hersenen (vraag 5) --- */
function breinSvg(hl,extra){
  const f=k=>hl===k?"var(--goud-soft)":"var(--surface)",s=k=>hl===k?"var(--goud)":"var(--text3)",w=k=>hl===k?2.6:1.4;
  let g=`<path d="M300,176 C302,206 304,232 306,280 L326,280 C326,240 328,208 334,176 Z" fill="${hl===4?"var(--surface)":f(3)}" stroke="${s(3)}" stroke-width="${w(3)}"/>
  <path d="M306,236 L306,280 L326,280 L326,236Z" fill="var(--surface2)" stroke="var(--text3)"/>
  <ellipse cx="380" cy="198" rx="54" ry="30" fill="${f(2)}" stroke="${s(2)}" stroke-width="${w(2)}"/>
  ${[0,1,2,3].map(k=>`<path d="M${340+k*6},${184+k*6} q40,-10 80,0" stroke="${s(2)}" stroke-width="1" fill="none"/>`).join("")}
  <path d="M90,150 C80,80 160,30 260,32 C360,34 440,80 440,140 C440,170 420,180 390,172 L340,172 C280,180 160,200 112,186 C96,180 92,166 90,150Z" fill="${f(1)}" stroke="${s(1)}" stroke-width="${w(1)}"/>
  <path d="M150,90 q30,20 60,0 q30,-20 60,0 q30,20 60,0 M140,130 q40,20 80,0 q40,-20 80,0 q30,15 60,5" stroke="${s(1)}" stroke-width="1" fill="none"/>`;
  g+=`<text class="lbl" x="200" y="70" text-anchor="middle">grote hersenen</text><text class="lbl" x="440" y="244" text-anchor="middle">kleine hersenen</text>
  <text class="lbl" x="250" y="226" text-anchor="end">hersenstam</text><path d="M254,222 H300" stroke="var(--text3)"/>
  <text class="lblm" x="336" y="272">ruggenmerg</text><text class="tick" x="60" y="200">voorkant</text>`;
  if(extra)g+=extra;
  return SV("0 0 520 290",DEFS+g,"Zijaanzicht van de hersenen");
}
E.zet(T2,[5],{titel:"Bouw van de hersenen",
  html:`<ul><li><b>Grote hersenen</b>: bewuste processen. Waarnemen, denken, onthouden, emoties en het aansturen van bewuste (willekeurige) bewegingen. De buitenste laag is de hersenschors.</li>
  <li><b>Kleine hersenen</b>: evenwicht en het soepel en nauwkeurig laten verlopen van bewegingen (coördinatie), zoals fietsen zonder na te denken.</li>
  <li><b>Hersenstam</b>: verbindt de hersenen met het ruggenmerg en regelt levensnoodzakelijke processen die altijd doorgaan, ook als je slaapt, zoals hartslag en bloeddruk, en reflexen als slikken en hoesten.</li></ul>
  <p>Je <b>ademhaling</b> wordt geregeld door het <b>ademcentrum</b>. Dat reageert vooral op het koolstofdioxidegehalte van het bloed. De grote hersenen kunnen de ademhaling wel beïnvloeden: je kunt bewust je adem inhouden, en bij stress of schrik verandert je ademhaling.</p>`,
  anim:anim(caps([
    "De hersenen bestaan uit drie grote delen. Van onderen sluiten ze aan op het ruggenmerg.",
    "<b>Grote hersenen</b>: bewust waarnemen, denken, onthouden en bewust bewegen.",
    "<b>Kleine hersenen</b>: evenwicht en coördinatie van bewegingen.",
    "<b>Hersenstam</b>: levensnoodzakelijke processen die altijd doorgaan, zoals hartslag en bloeddruk."]),i=>breinSvg(i)),
  films:[["Het hoofdkantoor","films/zenuwstelsel/5-het-hoofdkantoor.html"],["Gas op reis","films/gaswisseling/2-gas-op-reis.html"]]});
E.waarom(T2,5,anim(caps([
  "Ademen moet altijd doorgaan, ook als je slaapt. Daarom ligt het <b>ademcentrum</b> in de <b>hersenstam</b> (het verlengde merg).",
  "De <b>grote hersenen</b> kunnen het ademcentrum wel beïnvloeden: bij schrik en stress (zoals bij de naald) of als je bewust je adem inhoudt. Het centrum zelf ligt daar niet.",
  "De <b>kleine hersenen</b> regelen evenwicht en coördinatie, niet de ademhaling. Het antwoord is <b>A: in de hersenstam</b>."]),
  i=>breinSvg(i===0?3:i===1?1:2,`<circle cx="318" cy="198" r="7" fill="var(--koraal)"/><text class="lbl" x="420" y="140" style="fill:var(--koraal)">ademcentrum</text><path d="M418,144 L326,194" stroke="var(--koraal)" stroke-width="1.4"/>`+(i===1?`<path d="M240,120 C280,150 300,170 312,190" stroke="var(--goud)" stroke-width="2.4" fill="none" marker-end="url(#h1pg)"/><text class="lbl" x="150" y="112" style="fill:var(--goud-text)">stress, bewust</text>`:""))));

/* --- stressreacties (vraag 6) --- */
E.zet(T2,[6],{titel:"Stressreacties: zenuwstelsel en adrenaline",
  html:`<p>Bij stress of schrik zet je lichaam zich klaar om te vechten of te vluchten. Twee systemen werken daarbij samen:</p>
  <ul><li>het <b>orthosympathisch</b> deel van het autonome zenuwstelsel: snel, via zenuwen naar de organen. Zijn tegenspeler, het <b>parasympathisch</b> deel, hoort bij rust en vertering;</li>
  <li>het hormoon <b>adrenaline</b> uit het <b>bijniermerg</b>: het gaat via het bloed naar alle organen en versterkt dezelfde effecten als het orthosympathisch zenuwstelsel. Het werkt iets trager, maar houdt langer aan.</li></ul>
  <p>Je huid helpt bij het regelen van je <b>lichaamstemperatuur</b>: via de doorbloeding van de huid en via de zweetklieren. Bedenk bij elk effect wat het je lichaam oplevert.</p>`,
  anim:anim(caps([
    "Het autonome zenuwstelsel heeft twee delen met tegengestelde werking: <b>orthosympathisch</b> (actie) en <b>parasympathisch</b> (rust).",
    "<b>Orthosympathisch actief</b>: de luchtwegen worden wijder, de vertering ligt stil, de blaas houdt op.",
    "<b>Parasympathisch actief</b>: de luchtwegen worden nauwer, de darmen werken, de blaas kan legen.",
    "Tegelijk stuurt het orthosympathisch zenuwstelsel het <b>bijniermerg</b> aan. Dat maakt <b>adrenaline</b>, die via het bloed alle organen bereikt en dezelfde effecten versterkt."]),
    i=>autoSvg([["luchtwegen","wijder","nauwer"],["speekselklieren","weinig speeksel","veel speeksel"],["darmbeweging","remt","stimuleert"],["blaas","ophouden","legen"]],i)),
  films:[["Stress","films/hormonen/4-stress.html"],["Eén seconde","films/zenuwstelsel/1-een-seconde.html"]]});
E.waarom(T2,6,anim(caps([
  "<b>1 juist.</b> Het orthosympathisch zenuwstelsel laat de pupil groter worden: er valt meer licht in en je ziet meer van je omgeving.",
  "<b>2 onjuist.</b> Zweet verdampt op je huid en neemt daarbij warmte mee. Transpiratie koelt je dus af: de temperatuur stijgt er niet door.",
  "<b>3 juist.</b> Adrenaline uit het bijniermerg verhoogt de hartslagfrequentie, zodat er meer bloed naar de spieren gaat. Antwoord: <b>1 juist, 2 onjuist, 3 juist</b>."]),
  i=>{let g="";
    if(i===0){[[150,"rust",14],[380,"stress",30]].forEach(([x,t,r])=>g+=`<ellipse cx="${x}" cy="120" rx="90" ry="54" fill="var(--surface)" stroke="var(--text3)"/><circle cx="${x}" cy="120" r="44" fill="var(--teal-soft)" stroke="var(--teal)"/><circle cx="${x}" cy="120" r="${r}" fill="var(--text)"/><text class="lbl" x="${x}" y="210" text-anchor="middle">${t}: pupil ${r>20?"groot":"klein"}</text>`);
      g+=`<path d="M250,120 H290" stroke="var(--koraal)" stroke-width="2.4" marker-end="url(#h1pk)"/><text class="lbl" x="270" y="100" text-anchor="middle" style="fill:var(--koraal)">ortho</text>`;}
    if(i===1){g+=`<rect x="40" y="150" width="340" height="70" fill="var(--koraal-soft)"/><text class="lblm" x="52" y="210">huid</text>`;
      [[100,140],[190,136],[280,140]].forEach(([x,y])=>g+=`<path d="M${x},${y-16} q8,12 0,18 q-8,-6 0,-18Z" fill="var(--teal)"/><path d="M${x},${y-26} q6,-14 0,-28 q-6,-14 0,-28" stroke="var(--teal)" stroke-width="1.4" stroke-dasharray="3 3" fill="none"/>`);
      g+=`<text class="lbl" x="190" y="40" text-anchor="middle">zweet verdampt en neemt warmte mee</text>
      <rect x="440" y="40" width="20" height="160" rx="10" fill="var(--surface)" stroke="var(--text3)"/><rect x="444" y="120" width="12" height="76" rx="6" fill="var(--koraal)"/><circle cx="450" cy="206" r="16" fill="var(--koraal)"/>
      <path d="M490,70 V150" stroke="var(--teal)" stroke-width="2.4" marker-end="url(#h1pt)"/><text class="lbl" x="500" y="114">koeler</text>`;}
    if(i===2){g+=`<rect x="40" y="90" width="100" height="40" rx="8" fill="var(--goud-soft)" stroke="var(--goud)"/><text class="lbl" x="90" y="115" text-anchor="middle">bijniermerg</text>
      <path d="M142,110 H230" stroke="var(--goud)" stroke-width="2.4" stroke-dasharray="5 4" marker-end="url(#h1pg)"/><text class="lblm" x="186" y="98" text-anchor="middle">adrenaline</text>
      <path d="M300,80 C300,50 250,50 250,90 C250,130 300,160 300,180 C300,160 350,130 350,90 C350,50 300,50 300,80Z" fill="var(--koraal)" opacity=".85"/>`;
      let d="";for(let x=380;x<=560;x+=2){const ph=((x-380)%30)/30;d+=(d?"L":"M")+x+","+(130-(ph<.2?Math.sin(ph/.2*Math.PI)*40:0)).toFixed(1);}
      g+=`<path d="${d}" stroke="var(--koraal)" stroke-width="2" fill="none"/><text class="lbl" x="470" y="170" text-anchor="middle">hartslag sneller</text>`;}
    return SV("0 0 580 230",DEFS+g,"Drie stressreacties");}));

/* --- bloedvaten (vraag 7) --- */
function vatenSvg(i){
  const vak=(cx,nm,hl,inner,sub)=>`<g opacity="${i===0||hl?1:.35}">${inner}<text class="lbl" x="${cx}" y="200" text-anchor="middle">${nm}</text><text class="lblm" x="${cx}" y="218" text-anchor="middle">${sub}</text></g>`;
  let g="";
  g+=vak(100,"slagader",i===1,`<circle cx="100" cy="100" r="66" fill="var(--paars-soft)" stroke="var(--paars)"/><circle cx="100" cy="100" r="50" fill="var(--teal-soft)" stroke="var(--teal)"/><circle cx="100" cy="100" r="30" fill="var(--koraal)" opacity=".8"/>`,"dikke, stevige wand");
  g+=vak(290,"ader",i===2,`<ellipse cx="290" cy="100" rx="62" ry="50" fill="var(--paars-soft)" stroke="var(--paars)"/><ellipse cx="290" cy="100" rx="54" ry="42" fill="var(--paars)" opacity=".55"/>`,"dunne wand, wijd, kleppen");
  g+=vak(460,"haarvat",i===3,`<circle cx="460" cy="100" r="14" fill="var(--koraal)" opacity=".8" stroke="var(--text3)" stroke-width="2"/>`,"wand van één laag cellen");
  if(i===1)g+=`<text class="lblm" x="100" y="22" text-anchor="middle">spier- en elastisch weefsel</text>`;
  return SV("0 0 560 230",g,"Doorsneden van slagader, ader en haarvat");
}
E.zet(T2,[7],{titel:"Bloedvaten: bouw en functie",
  html:`<p>Bloed stroomt van het hart via <b>slagaders</b> → <b>slagadertjes</b> → <b>haarvaten</b> → <b>adertjes</b> → <b>aders</b> terug naar het hart.</p>
  <ul><li><b>Slagaders</b> hebben een dikke, stevige wand met elastisch weefsel en <b>spierweefsel</b>. Ze krijgen de hoge druk van het hart te verwerken.</li>
  <li><b>Aders</b> hebben een dunnere wand en een wijde holte. De druk is laag; <b>kleppen</b> zorgen dat het bloed één kant op stroomt.</li>
  <li><b>Haarvaten</b> hebben een wand van maar <b>één laag cellen</b>. Daardoor kunnen stoffen er makkelijk doorheen naar het weefselvocht.</li></ul>
`,
  anim:anim(caps([
    "Drie soorten bloedvaten, in doorsnede. De bouw van de wand past bij wat het bloedvat doet.",
    "<b>Slagader</b>: dikke wand met elastisch weefsel en spierweefsel. Vangt de drukstoten van het hart op.",
    "<b>Ader</b>: dunne wand, wijde holte en kleppen. Hier is de druk laag.",
    "<b>Haarvat</b>: zo smal dat rode bloedcellen er één voor één door gaan. De wand is één cellaag dik: hier vindt de uitwisseling met de weefsels plaats."]),vatenSvg),
  films:[["Buizen onder druk","films/transport/2-buizen-onder-druk.html"],["Weefselvloeistof en lymfe","films/transport/4-weefselvloeistof-en-lymfe.html"]]});
E.waarom(T2,7,anim(caps([
  "In de huid van het gezicht ligt een netwerk van <b>haarvaten</b>. Hun wand is één laag cellen, zonder spiertjes.",
  "De haarvaten krijgen hun bloed van <b>slagadertjes</b>. In de wand daarvan zitten <b>kringspiertjes</b>.",
  "Bij schrik trekken de kringspiertjes samen: het slagadertje wordt nauw en er stroomt <b>minder bloed</b> door de haarvaten. Je wordt bleek.",
  "Adertjes voeren bloed áf: knijp je die dicht, dan blijft het bloed juist in de haarvaten staan. Het antwoord is <b>C: in slagadertjes</b>."]),
  i=>SV("0 0 600 140",vatRij(0,i>=2,i>=2?"kringspiertjes trekken samen: bleek":"kringspiertjes ontspannen: normale kleur")+(i===1?`<rect x="36" y="38" width="208" height="48" rx="10" fill="none" stroke="var(--goud)" stroke-width="2.4"/>`:i===0?`<rect x="246" y="10" width="208" height="102" rx="10" fill="none" stroke="var(--goud)" stroke-width="2.4"/>`:i===3?`<rect x="448" y="44" width="136" height="36" rx="10" fill="none" stroke="var(--koraal)" stroke-width="2.4"/>`:""),"Slagadertje, haarvaten en adertje in de huid")));

/* --- vaccinatie (vraag 8) --- */
function afSvg(i){
  const X=t=>50+t*7,Y=c=>220-c*1.8;let g="";
  const c1=t=>t<=4?0:20*((t-4)/8)*Math.exp(1-(t-4)/8),c2=t=>t<=37?0:95*((t-37)/4)*Math.exp(1-(t-37)/4);
  g+=`<path class="ax" d="M50,30 V220 H500"/><text class="tick" x="275" y="250" text-anchor="middle">tijd (dagen)</text>
  <text class="tick" x="16" y="125" transform="rotate(-90 16 125)" text-anchor="middle">antistoffen in het bloed</text>`;
  for(let t=0;t<=60;t+=10)g+=`<text class="tick" x="${X(t)}" y="236" text-anchor="middle">${t}</text>`;
  g+=`<path d="M${X(0)},220 V40" stroke="var(--goud)" stroke-dasharray="4 4"/><text class="lbl" x="${X(0)+6}" y="44" style="fill:var(--goud-text)">1e contact</text>`;
  const tm=i===0?34:i===1?34:64;let d="";for(let t=0;t<=tm;t+=.5)d+=(d?"L":"M")+X(t).toFixed(1)+","+Y(c1(t)+(i>=2?c2(t):0)).toFixed(1);
  if(i<3)g+=`<path class="cv" d="${d}"/>`;else g+=`<path class="cv" d="${d}" opacity=".35"/>`;
  if(i>=1)g+=`<text class="lblm" x="${X(14)}" y="${Y(28)}">geheugencellen blijven over</text>${[0,1,2].map(k=>`<circle cx="${X(20+k*4)}" cy="${Y(16)}" r="6" fill="var(--paars)"/>`).join("")}`;
  if(i>=2)g+=`<path d="M${X(36)},220 V40" stroke="var(--goud)" stroke-dasharray="4 4"/><text class="lbl" x="${X(36)+6}" y="44" style="fill:var(--goud-text)">2e contact</text>`;
  if(i===3){let p="";for(let t=36;t<=64;t+=.5)p+=(p?"L":"M")+X(t).toFixed(1)+","+Y(60*Math.exp(-(t-36)/8)).toFixed(1);
    g+=`<path d="${p}" class="cvbad"/><text class="lbl" x="${X(44)}" y="${Y(52)}" style="fill:var(--koraal)">passief: kant-en-klare antistoffen</text>`;}
  return SV("0 0 520 256",g,"Antistofconcentratie bij eerste en tweede contact");
}
E.zet(T2,[8],{titel:"Specifieke afweer en immunisatie",
  html:`<p>Een <b>antigeen</b> is een stof (vaak een eiwit) op een ziekteverwekker die je afweer als lichaamsvreemd herkent.</p>
  <ul><li>Een <b>B-cel</b> die precies past bij het antigeen wordt geactiveerd en deelt. Er ontstaan <b>plasmacellen</b>, die <b>antistoffen</b> maken, en <b>geheugencellen</b>.</li>
  <li>Bij een <b>eerste contact</b> duurt dit dagen: je kunt intussen ziek worden. Bij een <b>tweede contact</b> reageren de geheugencellen snel en sterk: je wordt meestal niet ziek. Je bent <b>immuun</b>.</li>
  <li><b>Actieve immunisatie</b>: je eigen afweer maakt antistoffen en geheugencellen aan. Dat gebeurt natuurlijk (je bent ziek geweest) of kunstmatig (vaccinatie). De bescherming houdt jaren aan.</li>
  <li><b>Passieve immunisatie</b>: je krijgt kant-en-klare antistoffen, bijvoorbeeld via een serum of van moeder naar baby. Je maakt geen geheugencellen, dus de bescherming is na een paar weken weg.</li></ul>`,
  anim:anim(caps([
    "<b>Eerste contact</b> met een antigeen: het duurt een paar dagen voordat er antistoffen zijn, en het zijn er niet veel.",
    "Na afloop verdwijnen de antistoffen weer, maar de <b>geheugencellen</b> blijven jaren in je lichaam.",
    "<b>Tweede contact</b> met hetzelfde antigeen: de geheugencellen reageren direct. Er komen sneller veel meer antistoffen.",
    "Ter vergelijking <b>passieve immunisatie</b>: je krijgt antistoffen ingespoten. Die werken meteen, maar worden afgebroken en er komen geen geheugencellen bij."]),afSvg),
  films:[["Antistoffen op maat","films/afweer/2-antistoffen-op-maat.html"],["Vaccins, allergie en bloedgroepen","films/afweer/4-vaccins-allergie-en-bloedgroepen.html"]]});
E.waarom(T2,8,anim(caps([
  "Het vaccin bevat <b>antigenen</b> van de pneumokokbacterie, bijvoorbeeld stukjes van de bacteriewand. Je wordt er niet ziek van.",
  "Een B-cel die precies bij het antigeen past, wordt geactiveerd en deelt.",
  "Er ontstaan <b>plasmacellen</b> (die maken antistoffen) en <b>geheugencellen</b>. Die maakt je lichaam zelf: ze hoeven niet in het vaccin. Kant-en-klare antistoffen zouden na een paar weken weg zijn, niet jaren.",
  "Komt de echte bacterie later binnen, dan reageren de geheugencellen meteen. Het antwoord is <b>A: antigenen van de pneumokokbacterie</b>."]),
  i=>{let g="";const ag=(x,y)=>`<path d="M${x-7},${y} l7,-9 l7,9 l-7,9z" fill="var(--goud)"/>`;
    const bcel=(x,y,lab,kl)=>`<circle cx="${x}" cy="${y}" r="26" fill="var(--surface)" stroke="${kl}" stroke-width="2"/><path d="M${x-8},${y-26} l8,-10 l8,10" stroke="${kl}" stroke-width="2" fill="none"/><text class="lblm" x="${x}" y="${y+46}" text-anchor="middle">${lab}</text>`;
    g+=`<rect x="20" y="70" width="90" height="120" rx="12" fill="var(--surface)" stroke="var(--text3)"/><text class="lbl" x="65" y="210" text-anchor="middle">vaccin</text>`;
    [[50,100],[80,120],[55,150],[85,165]].forEach(([x,y])=>g+=ag(x,y));
    if(i>=1){g+=`<path d="M114,130 H170" stroke="var(--goud)" stroke-width="2" marker-end="url(#h1pg)"/>`+bcel(210,130,"B-cel","var(--teal)")+ag(210,90);}
    if(i>=2){g+=`<path d="M240,120 L300,80 M240,140 L300,180" stroke="var(--text2)" stroke-width="1.6" marker-end="url(#h1px)"/>`+bcel(340,70,"plasmacel","var(--teal)")+bcel(340,190,"geheugencel","var(--paars)");
      [[400,50],[420,80],[410,110]].forEach(([x,y])=>g+=`<path d="M${x},${y} l0,10 m0,0 l-6,-8 m6,8 l6,-8" stroke="var(--teal)" stroke-width="2.2" fill="none"/>`);
      g+=`<text class="lblm" x="440" y="84">antistoffen</text>`;}
    if(i===3)g+=`<path d="M372,190 H460" stroke="var(--paars)" stroke-width="2" marker-end="url(#h1pp)"/>${bact(480,190)}<text class="lbl" x="490" y="226" text-anchor="middle">snel herkend</text>`;
    return SV("0 0 560 250",DEFS+g,"Vaccin met antigenen activeert B-cellen");}));

})();
/* ===== h2.js ===== */
(function(){
"use strict";
/* Opgave 2 van beide oefenexamens: havo26-1 Beekprik (vraag 7–15), havo26-2 Bonaire (vraag 9–16). */
const E=window.EXSTOF, T1="havo26-1", T2="havo26-2";
const COL={g:"var(--goud)",t:"var(--teal)",k:"var(--koraal)",p:"var(--paars)",x:"var(--text2)",n:"var(--groen)"};
const mk=(c)=>`<marker id="h2m${c}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${COL[c]}"/></marker>`;
const DEFS=`<defs>${Object.keys(COL).map(mk).join("")}</defs>`;
const SV=(vb,inner,lab)=>E.svg(vb,DEFS+inner,lab);
/* pijl */
const A=(x1,y1,x2,y2,c="x",o={})=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${COL[c]}" stroke-width="${o.w||2.2}"${o.dash?' stroke-dasharray="5 4"':""} marker-end="url(#h2m${c})" opacity="${o.op==null?1:o.op}"/>`;
/* tekst; meerdere regels met | */
const TX=(x,y,t,o={})=>{const r=String(t).split("|");const lh=o.lh||14;const y0=y-(r.length-1)*lh/2;
  return `<text class="${o.cls||"lbl"}" x="${x}" y="${y0}" text-anchor="${o.a||"middle"}"${o.st?` style="${o.st}"`:""}>${r.map((s,k)=>`<tspan x="${x}" dy="${k?lh:0}">${s}</tspan>`).join("")}</text>`;};
/* knooppunt met rand; on = goud, dim = vaag */
const N=(x,y,w,t,o={})=>{const h=o.h||32,on=o.on,op=o.dim?.3:1;
  return `<g opacity="${op}"><rect x="${x-w/2}" y="${y-h/2}" width="${w}" height="${h}" rx="10" fill="${on?"var(--goud-soft)":"var(--surface)"}" stroke="${on?"var(--goud)":(o.kl||"var(--line2)")}" stroke-width="${on?2.2:1.5}"/>${TX(x,y+4.5,t,{cls:o.cls||"lbl"})}</g>`;};
const anim=(steps,draw)=>box=>E.stappen(box,steps.map(c=>typeof c==="string"?{cap:c}:c),(st,s,i)=>{st.innerHTML=draw(i,s);});
/* vaste pseudo-willekeurige punten */
const rnd=(seed)=>{let s=seed;return()=>{s=(s*9301+49297)%233280;return s/233280;};};
const punten=(n,x0,x1,y0,y1,seed)=>{const r=rnd(seed);return Array.from({length:n},()=>[x0+r()*(x1-x0),y0+r()*(y1-y0)]);};
const boom=(x,y,s=1)=>`<line x1="${x}" y1="${y}" x2="${x}" y2="${y+22*s}" stroke="var(--text3)" stroke-width="3"/><circle cx="${x}" cy="${y-4*s}" r="${15*s}" fill="var(--groen)" opacity=".75"/>`;

const F={
  kring:["Alles gaat rond","films/ecologie/alles-gaat-rond/index.html"],
  plek:["Plek genoeg?","films/ecologie/plek-genoeg/index.html"],
  groen:["Alles in het groen","films/stofwisseling/3-alles-in-het-groen.html"],
  adem:["Alles op adem","films/stofwisseling/2-alles-op-adem.html"],
  selectie:["Natuurlijke selectie","films/evolutie/2-natuurlijke-selectie.html"],
  genen:["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"],
  onderzoek:["Onderzoek doen in de biologie","films/cellen/onderzoek-doen/index.html"],
  ingrijpen:["Ingrijpen of laten gaan?","films/ecologie/4-ingrijpen-of-laten-gaan.html"],
  aarde:["Eén aarde","films/ecologie/3-een-aarde.html"],
  osmose:["Diffusie en osmose","films/cellen/diffusie-osmose/index.html"]
};

/* =====================================================================
   Gedeeld: kringloop van stoffen (havo26-1 vraag 7, havo26-2 vraag 9)
   ===================================================================== */
function kringSvg(i){
  const act=[[0],[1],[2,3],[4,5],[6]][i];
  const nodeOn=[["min","plant"],["plant","cons"],["plant","cons","dood"],["dood","red","min"],["min"]][i];
  const E_=[[140,123,185,64],[312,40,401,40],[290,64,440,226],[480,64,480,226],[393,250,317,250],[190,226,150,169],[75,169,75,210]];
  let s="";
  E_.forEach(([a,b,c,d],k)=>{const on=act.includes(k);s+=A(a,b,c,d,on?(k===6?"t":"g"):"x",{op:on?1:.25,w:on?2.8:2,dash:k===6});});
  const n=(id,x,y,w,t)=>N(x,y,w,t,{h:44,on:nodeOn.includes(id)});
  s+=n("min",130,145,150,"anorganische stoffen|(CO₂, water, mineralen)")+n("plant",230,40,160,"producenten|(planten, algen)")+n("cons",480,40,150,"consumenten|(dieren)")
    +n("dood",480,250,170,"dode resten|en uitwerpselen")+n("red",230,250,170,"reducenten|(bacteriën, schimmels)");
  if(i===4)s+=TX(72,234,"spoelt uit|met water",{cls:"lblm",st:"fill:var(--teal)"});
  if(i===3)s+=TX(300,292,"bij de afbraak komen CO₂ en mineralen vrij",{cls:"lblm"});
  return SV("0 0 600 300",s,"Kringloop van stoffen: producenten, consumenten, dode resten, reducenten en anorganische stoffen");
}
const KRING={
  titel:"De kringloop van stoffen: reducenten en mineralen",
  html:`<p>In een ecosysteem gaan stoffen rond in een <b>kringloop</b>.</p><ul>
  <li><b>Producenten</b> (planten, algen) maken met fotosynthese <b>organische stoffen</b> uit <b>anorganische stoffen</b>: CO₂, water en mineralen zoals nitraat en fosfaat.</li>
  <li><b>Consumenten</b> eten die organische stoffen.</li>
  <li>Dode resten en uitwerpselen worden afgebroken door <b>reducenten</b>: bacteriën en schimmels. Zij gebruiken de organische stof voor hun eigen <b>dissimilatie</b>.</li>
  <li>Bij die afbraak komen weer anorganische stoffen vrij, die planten opnieuw opnemen.</li>
  <li>Mineralen lossen op in water. Ze kunnen met regenwater uit de bodem <b>uitspoelen</b>.</li></ul>`,
  anim:anim([
    "<b>Producenten</b> nemen anorganische stoffen op (CO₂, water, mineralen) en maken er met fotosynthese organische stoffen van.",
    "<b>Consumenten</b> eten de producenten (of andere consumenten). De organische stoffen gaan mee.",
    "Alles wat doodgaat, en alle uitwerpselen, komen terecht bij de <b>dode resten</b>. Dat is nog steeds organische stof.",
    "<b>Reducenten</b> breken de dode resten af. Ze dissimileren de organische stof. Daarbij komen weer <b>anorganische stoffen</b> vrij: de kringloop is rond.",
    "Opgeloste mineralen kunnen ook met het water mee <b>uitspoelen</b>, naar het grondwater."],kringSvg),
  films:[F.kring]
};
E.zet(T1,[7],KRING);
E.zet(T2,[9],KRING);

/* =====================================================================
   havo26-1 · opgave 2 Beekprik
   ===================================================================== */

/* --- vraag 7 extra: van bron tot benedenloop --- */
function beekSvg(i){
  const Z=[0,140,280,420,560];let s="";
  ["bron · moerasbos","loofbos","landbouwgrond","organische resten"].forEach((t,k)=>{const on=k<=i;
    s+=`<rect x="${Z[k]+2}" y="6" width="136" height="22" rx="6" fill="${on?"var(--goud-soft)":"none"}" stroke="${on?"var(--goud)":"var(--line2)"}"/>`+TX(Z[k]+70,21,t,{cls:"tick",st:on?"fill:var(--text)":""});});
  s+=`<rect x="0" y="120" width="560" height="40" fill="var(--teal)" opacity=".22"/><line x1="0" y1="120" x2="560" y2="120" stroke="var(--teal)" stroke-width="2"/>
  <rect x="0" y="160" width="560" height="16" fill="var(--area)" opacity=".6"/>`;
  s+=A(470,112,540,112,"t",{w:1.6})+TX(470,108,"stroomrichting",{cls:"tick",a:"start"});
  s+=boom(40,80,.8)+boom(95,84,.8);
  [[175,78],[220,74],[262,82]].forEach(([x,y])=>s+=boom(x,y));
  for(let r=0;r<4;r++)s+=`<line x1="292" x2="410" y1="${92+r*7}" y2="${92+r*7}" stroke="var(--groen)" stroke-width="2" stroke-dasharray="4 4" opacity=".8"/>`;
  [[440,166],[470,168],[505,165],[535,168]].forEach(([x,y])=>s+=`<ellipse cx="${x}" cy="${y}" rx="11" ry="4" fill="var(--text3)"/>`);
  if(i>=1){[[180,132],[215,146],[250,128]].forEach(([x,y],k)=>s+=`<ellipse cx="${x}" cy="${y}" rx="8" ry="3" transform="rotate(${k%2?15:-12} ${x} ${y})" fill="var(--goud)"/>`);
    s+=A(195,100,190,124,"g",{w:1.4});}
  if(i>=2){[310,350,390].forEach(x=>s+=A(x,100,x,128,"k",{w:1.8}));s+=TX(350,60,"mest spoelt uit",{cls:"lblm",st:"fill:var(--koraal)"});}
  if(i>=3)[[436,158],[466,160],[500,157],[531,160]].forEach(([x,y])=>s+=`<rect x="${x-5}" y="${y-2}" width="10" height="4" rx="2" fill="var(--paars)"/>`);
  const cnt=[2,6,10,15];
  for(let k=0;k<4;k++){if(k>i)break;punten(cnt[k],Z[k]+10,Z[k+1]-10,126,154,7+k*13).forEach(([x,y])=>s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.2" fill="var(--paars)"/>`);}
  s+=TX(280,198,"concentratie anorganische stoffen in het water",{cls:"tick"});
  for(let k=0;k<4;k++)s+=`<rect x="${Z[k]+4}" y="206" width="132" height="14" rx="3" fill="var(--paars)" opacity="${k<=i?[.2,.45,.7,.95][k]:.06}"/>`;
  return SV("0 0 560 228",s,"Beek van bron tot benedenloop met toenemende hoeveelheid anorganische stoffen");
}
E.waarom(T1,7,anim([
  "Bij de bron in het moerasbos is het water <b>voedselarm</b>: er is weinig dood materiaal om af te breken en er is geen landbouw.",
  "In het loofbos vallen bladeren in de beek. <b>Reducenten</b> breken ze af. Daarbij komen <b>anorganische stoffen</b> (paars) vrij in het water.",
  "Langs de landbouwgrond <b>spoelen</b> meststoffen met regenwater de beek in: <b>uitspoeling</b>.",
  "Nog verderop liggen organische resten op de bodem; ook die worden afgebroken. Alles stroomt mee naar beneden, dus de concentratie neemt toe. Voor het punt is <b>één</b> van de twee processen genoeg: uitspoeling óf afbraak."],beekSvg));

/* --- vraag 8: fotosynthese en beperkende factoren --- */
function fotoSvg(i){
  const x0=50,x1=410,y0=200,y1=22;const X=l=>x0+(x1-x0)*l/10,Y=v=>y0-(y0-y1)*v/100;
  const f=(l,P)=>P*(1-Math.exp(-l/2.2));
  const pad=(P,a,b)=>{let d="";for(let l=a;l<=b+1e-9;l+=.1)d+=(d?"L":"M")+X(l).toFixed(1)+","+Y(f(l,P)).toFixed(1);return d;};
  let s=`<line class="ax" x1="${x0}" y1="${y0}" x2="${x0}" y2="${y1-6}"/><line class="ax" x1="${x0}" y1="${y0}" x2="${x1}" y2="${y0}"/>
  ${TX(x1,y0+20,"lichtintensiteit →",{cls:"tick",a:"end"})}<text class="tick" transform="translate(${x0-12},${(y0+y1)/2}) rotate(-90)" text-anchor="middle">snelheid fotosynthese →</text>`;
  if(i===0){s+=`<path d="${pad(55,0,10)}" class="cv" opacity=".25"/><path d="${pad(55,0,3.2)}" fill="none" stroke="var(--goud)" stroke-width="3.4"/>`+TX(X(1.6),Y(48),"licht beperkt",{cls:"lbl",st:"fill:var(--goud-text)"});}
  if(i>=1){s+=`<path d="${pad(55,0,10)}" class="cv"/>`+TX(X(9.6),Y(55)+18,"weinig CO₂",{cls:"lblm",a:"end"});}
  if(i===1)s+=`<line x1="${X(5)}" x2="${X(10)}" y1="${Y(55)}" y2="${Y(55)}" stroke="var(--goud)" stroke-width="2" stroke-dasharray="5 4"/>`+TX(X(7.4),Y(55)-8,"plateau: licht niet meer beperkend",{cls:"lbl",st:"fill:var(--goud-text)"});
  if(i>=2){s+=`<path d="${pad(90,0,10)}" fill="none" stroke="var(--groen)" stroke-width="2.6"/>`+TX(X(9.6),Y(90)-8,"meer CO₂",{cls:"lblm",a:"end"});}
  if(i>=3){s+=A(X(8),Y(f(8,55))-4,X(8),Y(f(8,90))+6,"g",{w:2.4})+TX(X(8)-8,Y(72),"CO₂|beperkt",{cls:"lbl",a:"end",st:"fill:var(--goud-text)"});}
  return SV("0 0 440 230",s,"Snelheid van fotosynthese tegen lichtintensiteit bij twee temperaturen");
}
E.zet(T1,[8],{
  titel:"Fotosynthese en beperkende factoren",
  html:`<ul>
  <li>Producenten (planten, algen) maken met <b>fotosynthese</b> glucose: 6 CO₂ + 6 H₂O → C₆H₁₂O₆ + 6 O₂. De energie komt uit <b>licht</b>.</li>
  <li>Met die glucose groeien ze. Hoe meer fotosynthese, hoe sneller ze kunnen groeien.</li>
  <li>De snelheid hangt af van <b>abiotische factoren</b>: lichtintensiteit, CO₂-concentratie, temperatuur, en de hoeveelheid water en mineralen.</li>
  <li>De factor die het minst gunstig is, remt het proces: de <b>beperkende factor</b>.</li>
  <li><b>Algenbloei</b>: een explosieve groei van algen, als alle omstandigheden gunstig zijn.</li></ul>`,
  anim:anim([
    "Bij weinig licht geldt: meer licht = meer fotosynthese. Hier is <b>licht de beperkende factor</b>.",
    "Bij veel licht stijgt de lijn niet verder. Licht is niet meer beperkend: nu remt iets anders, bijvoorbeeld de CO₂-concentratie of de temperatuur.",
    "Bij een hogere CO₂-concentratie ligt het plateau hoger: er is meer grondstof voor de fotosynthese.",
    "Op dit punt is niet licht maar <b>CO₂</b> beperkend. Wil je weten wat de groei remt? Zoek de factor die het minst gunstig is."],fotoSvg),
  films:[F.groen]
});
/* extra waarom vraag 8: open beek tegenover beek in de schaduw */
function schaduwSvg(i){
  const paneel=(x0,schaduw,warm,nAlg,dim)=>{let s=`<g opacity="${dim?.3:1}">`;
    s+=`<rect x="${x0}" y="140" width="250" height="60" fill="var(--teal)" opacity=".22"/><line x1="${x0}" x2="${x0+250}" y1="140" y2="140" stroke="var(--teal)" stroke-width="2"/>`;
    s+=`<circle cx="${x0+36}" cy="34" r="16" fill="var(--goud)"/>`;
    [70,110,150,190].forEach(dx=>{const stop=schaduw&&dx>=110?82:140;const tx=x0+36+(dx-36)*(stop-34)/(140-34);
      s+=`<line x1="${x0+36}" y1="34" x2="${tx.toFixed(1)}" y2="${stop}" stroke="var(--goud)" stroke-width="2.2" opacity=".85"/>`;});
    if(schaduw){s+=`<rect x="${x0+150}" y="96" width="5" height="44" fill="var(--text3)"/><rect x="${x0+205}" y="96" width="5" height="44" fill="var(--text3)"/>`;
      [[x0+120,80],[x0+152,70],[x0+185,78],[x0+215,68],[x0+240,80]].forEach(([x,y])=>s+=`<circle cx="${x}" cy="${y}" r="20" fill="var(--groen)" opacity=".8"/>`);}
    const tH=warm?60:22;s+=`<rect x="${x0+8}" y="${80}" width="10" height="70" rx="5" fill="none" stroke="var(--text2)"/><rect x="${x0+10}" y="${150-tH}" width="6" height="${tH}" rx="3" fill="${warm?"var(--koraal)":"var(--teal)"}"/>`;
    punten(nAlg,x0+28,x0+240,148,194,x0+3).forEach(([x,y])=>s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.4" fill="var(--groen)"/>`);
    return s+"</g>";};
  let s=paneel(0,false,true,26,false)+paneel(280,true,i<2,i===0?26:(i===1?12:6),i===0);
  s+=TX(125,218,"open beek",{cls:"lblm"})+TX(405,218,"beek met bomen",{cls:"lblm"});
  if(i===1||i===3)s+=TX(405,240,"minder licht → minder fotosynthese",{cls:"lbl",st:"fill:var(--goud-text)"});
  if(i>=2)s+=TX(405,i===3?258:240,"lagere temperatuur → trager",{cls:"lbl",st:"fill:var(--teal)"});
  return SV("0 0 530 266",s,"Algen in een open beek en in een beek in de schaduw van bomen");
}
E.waarom(T1,8,anim([
  "Een open beek: veel licht en warm water. Algen (groene stipjes) kunnen veel fotosynthese doen en snel groeien. Zo ontstaat algenbloei.",
  "Met bomen langs de beek vangen de bladeren het licht weg. <b>Minder licht → minder fotosynthese → de algen groeien minder.</b> Dat is verklaring 1.",
  "In de schaduw warmt het water minder op. <b>Lagere temperatuur → processen (enzymreacties) in de algen gaan trager → ze groeien langzamer.</b> Dat is verklaring 2.",
  "Een verklaring telt alleen als je ook het gevolg voor de algen noemt. Alleen ‘minder licht’ en ‘lagere temperatuur’ opschrijven is niet genoeg."],schaduwSvg));

/* --- vraag 9: bouw en functie --- */
E.zet(T1,[9],{
  titel:"Bouw en functie: aanpassingen",
  html:`<p>Een eigenschap is <b>functioneel</b> als hij het organisme helpt om te overleven of zich voort te planten in zijn omgeving.</p><ul>
  <li>Je legt het verband tussen <b>bouw</b> (hoe ziet het eruit) en <b>functie</b> (wat kan het organisme daardoor).</li>
  <li>Zo'n eigenschap heet een <b>aanpassing</b>. Hij is ontstaan door natuurlijke selectie: individuen met die eigenschap overleefden vaker en kregen meer nakomelingen.</li>
  <li>Een goede verklaring heeft drie delen: de eigenschap, wat die eigenschap doet, en waarom dat helpt bij hoe of waar het organisme leeft.</li>
  <li>Lees daarom eerst in de tekst wat het organisme moet kunnen: voedsel zoeken, vluchten, warm blijven, zich voortplanten.</li></ul>`,
  anim:box=>{let s="";
    s+=TX(175,16,"bouw",{cls:"tick"})+TX(345,16,"functie",{cls:"tick"})+TX(485,16,"past bij",{cls:"tick"});
    [["reiger","lange, dunne poten","waden in ondiep water","oever, moeras"],["ijsbeer","dikke vacht en vetlaag","weinig warmteverlies","poolgebied"],["cactus","dikke stengel","slaat water op","woestijn"]].forEach(([o,b,f,m],k)=>{const y=48+k*56;
      s+=TX(48,y+4,o,{cls:"lbl"})+N(175,y,150,b)+A(252,y,266,y,"g")+N(345,y,150,f,{on:true})+A(422,y,434,y,"g")+N(485,y,100,m);});
    box.append(E.el("div",{class:"stage",style:"border-radius:var(--radius);background:var(--surface2);border:1px solid var(--line2);padding:6px"},SV("0 0 540 200",s,"Drie voorbeelden van bouw, functie en leefomgeving")));},
  films:[F.selectie]
});
/* extra waarom vraag 9: stroming langs een stomp en een gestroomlijnd lichaam */
function stroomSvg(i){
  let s="";const cy=100;
  const lijnen=(defl)=>{let p="";for(let y=24;y<=176;y+=19){const d=y-cy;let path="";
      for(let x=8;x<=452;x+=6){const off=defl(x,d);path+=(path?"L":"M")+x+","+(y+off).toFixed(1);}
      p+=`<path d="${path}" fill="none" stroke="var(--teal)" stroke-width="1.6" opacity=".7"/>`;}return p;};
  if(i===0){
    for(let y=24;y<=176;y+=19){const d=y-cy;
      if(Math.abs(d)<=34){s+=`<path d="M8,${y} L184,${y} Q192,${y} 192,${y+(d<0?-8:8)}" fill="none" stroke="var(--teal)" stroke-width="1.6" opacity=".7"/>`;}
      else{let path="";for(let x=8;x<=452;x+=6){const b=Math.exp(-(((x-230)/70)**2));path+=(path?"L":"M")+x+","+(y+Math.sign(d)*b*Math.max(0,46-Math.abs(d)*.35)).toFixed(1);}
        s+=`<path d="${path}" fill="none" stroke="var(--teal)" stroke-width="1.6" opacity=".7"/>`;}}
    s+=`<rect x="190" y="68" width="80" height="64" rx="6" fill="var(--text3)"/>`;
    [[300,82],[322,118],[352,96],[378,124]].forEach(([x,y])=>s+=`<path d="M${x},${y} m-10,0 a10,10 0 1,1 10,10 a6,6 0 1,1 -6,-6" fill="none" stroke="var(--koraal)" stroke-width="2"/>`);
    s+=TX(230,200,"stomp lichaam: wervelingen, veel weerstand",{cls:"lbl",st:"fill:var(--koraal)"});
  }else{
    s+=lijnen((x,d)=>{const b=Math.exp(-(((x-230)/95)**2));return Math.sign(d)*b*Math.max(0,24-Math.abs(d)*.25);});
    s+=`<ellipse cx="230" cy="${cy}" rx="100" ry="14" fill="var(--text2)"/><circle cx="148" cy="${cy-3}" r="3" fill="var(--surface)"/>
      <path d="M318,${cy} L340,${cy-8} L340,${cy+8}z" fill="var(--text2)"/>`;
    s+=TX(230,200,"gestroomlijnd: water stroomt glad langs, weinig weerstand",{cls:"lbl",st:"fill:var(--goud-text)"});
    if(i===2){s+=A(30,14,110,14,"t",{w:2.4})+TX(118,18,"stroming",{cls:"lblm",a:"start"})+A(150,60,70,60,"g",{w:3})+TX(155,64,"de beekprik zwemt stroomopwaarts",{cls:"lbl",a:"start",st:"fill:var(--goud-text)"});}
  }
  return SV("0 0 460 210",s,"Waterstroming langs een stomp en een gestroomlijnd lichaam");
}
E.waarom(T1,9,anim([
  "Een stomp lichaam in stromend water: het water botst ertegen en draait erachter in wervelingen. Dat geeft veel <b>weerstand</b>.",
  "Het langgerekte, ronde lichaam van de beekprik: het water stroomt er glad omheen. Weinig weerstand: de beekprik is <b>gestroomlijnd</b>.",
  "Volwassen beekprikken zwemmen <b>tegen de stroom in</b> naar de bovenloop. Dankzij hun vorm kost dat minder kracht. Bouw (gestroomlijnd) + functie (tegen de stroom in zwemmen) = 1 punt."],stroomSvg));

/* --- vraag 10: voedselketen en voedselweb --- */
function webSvg(i){
  const vis={gras:0,konijn:1,vos:2,muis:3,uil:3,red:4};
  const P={gras:[140,250,"gras"],konijn:[70,150,"konijn"],muis:[220,150,"muis"],vos:[70,45,"vos"],uil:[230,45,"uil"],red:[400,150,"reducenten"]};
  const Ed=[["gras","konijn",125,234,82,166,1],["konijn","vos",70,134,70,61,2],["gras","muis",155,234,208,166,3],["muis","vos",200,134,92,61,3],["muis","uil",222,134,228,61,3]];
  let s="";
  Ed.forEach(([a,b,x1,y1,x2,y2,st])=>{if(i>=st)s+=A(x1,y1,x2,y2,"g",{w:i===st?2.8:2,op:i===st?1:.6});});
  if(i>=4)[[262,52,350,136],[262,150,342,150],[180,244,350,162]].forEach(([a,b,c,d])=>s+=A(a,b,c,d,"p",{dash:true,w:1.8}));
  for(const k in P){if(vis[k]>i)continue;const [x,y,t]=P[k];s+=N(x,y,k==="red"?120:90,t,{on:vis[k]===i,kl:k==="red"?"var(--paars)":null});}
  if(i>=1)s+=TX(330,262,i>=2?"bij elke stap gaat energie verloren als warmte":"pijl: van voedsel naar eter",{cls:"lblm"});
  return SV("0 0 480 280",s,"Opbouw van een voedselketen tot voedselweb");
}
E.zet(T1,[10],{
  titel:"Voedselketen, voedselweb en energiestroom",
  html:`<ul>
  <li>Een <b>voedselketen</b> is een rij organismen waarin elk organisme door het volgende wordt gegeten.</li>
  <li>Alle voedselketens in een ecosysteem samen, met elkaar verbonden, vormen een <b>voedselweb</b>.</li>
  <li><b>Producenten</b> (planten, algen) → <b>consumenten van de 1e orde</b> (planteneters) → <b>consumenten van de 2e orde</b> (vleeseters) → enzovoort.</li>
  <li>Een organisme kan in verschillende ketens een andere plek hebben, bijvoorbeeld een dier dat zowel planten als dieren eet.</li>
  <li>De pijlen geven de richting van de <b>energiestroom</b> aan: van het voedsel naar de eter.</li></ul>`,
  anim:anim([
    "Een voedselketen begint bij een <b>producent</b>: een plant of alg die met fotosynthese energie uit licht vastlegt in organische stof.",
    "Een <b>consument van de 1e orde</b> (planteneter) eet de producent. De pijl wijst van wat gegeten wordt naar de eter: zo stroomt de energie.",
    "Een <b>consument van de 2e orde</b> eet de planteneter. Bij elke stap gaat een groot deel van de energie verloren als warmte.",
    "Meestal eet een dier meer dan één soort, en wordt het door meer soorten gegeten. De ketens raken verknoopt: een <b>voedselweb</b>.",
    "Dode resten en uitwerpselen van alle organismen gaan naar de <b>reducenten</b>. In een examenvraag teken je alleen de organismen en voedselrelaties die in de tekst staan."],webSvg),
  films:[F.kring,F.plek]
});

/* --- vraag 11: genotype en genexpressie --- */
const strip=(x,y,lit,w=12)=>{let s="";for(let k=0;k<6;k++)s+=`<rect x="${x+k*(w+2)}" y="${y}" width="${w}" height="8" rx="2" fill="${lit.includes(k)?"var(--goud)":"var(--line2)"}"/>`;return s;};
function cellenSvg(i){
  let s="";
  if(i===0){s+=`<circle cx="240" cy="105" r="44" fill="var(--teal-soft)" stroke="var(--teal)" stroke-width="2"/>`+strip(198,101,[])+TX(240,170,"bevruchte eicel: één set DNA",{cls:"lblm"});}
  else{const X=[75,195,315,435],nm=["spiercel","huidcel","zenuwcel","levercel"],lit=[[0,2],[1,4],[3,5],[0,1,5]],fl=["var(--koraal-soft)","var(--goud-soft)","var(--paars-soft)","var(--groen-soft)"];
    X.forEach((x,k)=>{s+=`<circle cx="${x}" cy="105" r="44" fill="${i>=2?fl[k]:"var(--teal-soft)"}" stroke="${i>=2?"var(--line2)":"var(--teal)"}" stroke-width="2"/>`+strip(x-42,101,i>=2?lit[k]:[]);
      if(i>=2)s+=TX(x,170,nm[k],{cls:"lblm"});});
    s+=TX(255,24,i===1?"na mitose: in elke cel precies hetzelfde DNA":i===2?"goud = gen staat aan (wordt afgelezen)":"genotype gelijk · genexpressie verschilt",{cls:"lbl",st:i>=2?"fill:var(--goud-text)":""});}
  return SV("0 0 510 190",s,"Cellen met hetzelfde DNA maar andere genen aan");
}
E.zet(T1,[11],{
  titel:"Genotype, fenotype en genexpressie",
  html:`<ul>
  <li>Het <b>genotype</b> is de verzameling genen (allelen) die een organisme heeft. Het ligt vast bij de bevruchting.</li>
  <li>Alle lichaamscellen ontstaan door <b>mitose</b> uit de bevruchte eicel. Bij mitose wordt het DNA precies gekopieerd, dus elke lichaamscel heeft hetzelfde DNA.</li>
  <li><b>Genexpressie</b>: een gen wordt afgelezen en de cel maakt er een eiwit van. In elke cel staat maar een deel van de genen ‘aan’.</li>
  <li>Daardoor kunnen cellen <b>differentiëren</b> tot bijvoorbeeld spiercel, huidcel of zenuwcel. Welke genen aan staan, kan veranderen tijdens de ontwikkeling en door het milieu.</li>
  <li>Het <b>fenotype</b> (wat je ziet) ontstaat uit het genotype en de invloed van het milieu.</li></ul>`,
  anim:anim([
    "Een organisme begint als één <b>bevruchte eicel</b>, met één set DNA (de balk met genen).",
    "Door <b>mitose</b> ontstaan steeds meer cellen. Het DNA wordt elke keer precies gekopieerd: alle cellen hebben dezelfde genen.",
    "Toch worden de cellen verschillend: in elke celsoort staan andere genen aan. Dat is <b>genexpressie</b>.",
    "Het <b>genotype</b> is in al die cellen hetzelfde. Wat verschilt, is welke genen worden afgelezen."],cellenSvg),
  films:[F.genen]
});
function metaSvg(i){
  const G=["darm","oog","vin","gesl.-|organen"];
  const rij=(x,lit,dim)=>{let s=`<g opacity="${dim?.3:1}">`;G.forEach((g,k)=>{const on=lit.includes(k);s+=`<rect x="${x+k*54}" y="120" width="52" height="34" rx="6" fill="${on?"var(--goud-soft)":"var(--surface)"}" stroke="${on?"var(--goud)":"var(--line2)"}" stroke-width="${on?2:1.2}"/>`+TX(x+k*54+26,141,g,{cls:"tick",lh:10,st:on?"fill:var(--text)":""});});return s+"</g>";};
  let s=`<path d="M40,70 Q120,56 200,70 Q120,84 40,70z" fill="var(--text2)" opacity=".8"/>`+TX(120,40,"larve",{cls:"lblm"});
  s+=`<g opacity="${i===0?.3:1}"><path d="M280,70 Q370,52 460,70 Q370,88 280,70z" fill="var(--text2)"/><circle cx="296" cy="67" r="4" fill="var(--surface)"/><path d="M400,58 L420,46 L430,60z M410,80 L430,92 L436,78z" fill="var(--text2)"/></g>`+TX(370,40,"volwassen",{cls:"lblm"});
  s+=A(214,70,264,70,"g",{op:i===0?.3:1})+TX(239,96,"metamorfose",{cls:"tick"});
  s+=rij(16,[0],false)+rij(262,i===1?[]:[1,2,3],i===0);
  if(i>=1)s+=TX(250,184,i===1?"dezelfde genen: genotype verandert niet":"andere genen aan: genexpressie verandert",{cls:"lbl",st:"fill:var(--goud-text)"});
  return SV("0 0 500 196",s,"Beekpriklarve en volwassen beekprik met dezelfde genen maar andere genen aan");
}
E.waarom(T1,11,anim([
  "Een beekpriklarve eet: het gen voor het darmkanaal staat aan (goud).",
  "Na de metamorfose zitten dezelfde genen er nog allemaal in. Het DNA is niet veranderd: het <b>genotype verandert niet</b>.",
  "Maar nu staan andere genen aan: ogen, vinnen en geslachtsorganen worden gemaakt, het darmkanaal verdwijnt. De <b>genexpressie verandert wel</b>.",
  "Het goede antwoord is dus: genotype nee, genexpressie ja."],metaSvg));

/* --- vraag 12 en 14: tolerantiegrenzen --- */
function tolSvg(i){
  const x0=40,x1=430,y0=196,y1=24;const X=v=>x0+(x1-x0)*v/10,Y=v=>y0-(y0-y1)*v/100;
  const krom=(c,w,kl,sw)=>{let d="";for(let v=c-w;v<=c+w+1e-9;v+=.05)d+=(d?"L":"M")+X(v).toFixed(1)+","+Y(100*(1-((v-c)/w)**2)).toFixed(1);return `<path d="${d}" fill="none" stroke="${kl}" stroke-width="${sw}"/>`;};
  let s=`<line class="ax" x1="${x0}" y1="${y0}" x2="${x0}" y2="${y1-6}"/><line class="ax" x1="${x0}" y1="${y0}" x2="${x1}" y2="${y0}"/>
  ${TX(x1,y0+32,"abiotische factor, bv. temperatuur →",{cls:"tick",a:"end"})}<text class="tick" transform="translate(${x0-12},${(y0+y1)/2}) rotate(-90)" text-anchor="middle">groei / overleving →</text>`;
  if(i===3)s+=`<rect x="${X(1.5)}" y="${y1}" width="${X(3)-X(1.5)}" height="${y0-y1}" fill="var(--koraal-soft)"/><rect x="${X(7)}" y="${y1}" width="${X(8.5)-X(7)}" height="${y0-y1}" fill="var(--koraal-soft)"/>`;
  s+=krom(5,3.5,"var(--teal)",2.6);
  if(i>=1){[1.5,8.5].forEach(v=>s+=`<line x1="${X(v)}" x2="${X(v)}" y1="${y0}" y2="${y1}" stroke="var(--goud)" stroke-width="2" stroke-dasharray="5 4"/>`);
    s+=TX(X(1.5),y0+14,"minimum",{cls:"tick",st:"fill:var(--goud-text)"})+TX(X(8.5),y0+14,"maximum",{cls:"tick",st:"fill:var(--goud-text)"});
    s+=A(X(4),y0-12,X(1.6),y0-12,"g",{w:1.4})+A(X(6),y0-12,X(8.4),y0-12,"g",{w:1.4})+TX(X(5),y0-20,"tolerantiegebied",{cls:"lblm"});}
  if(i>=2)s+=`<circle cx="${X(5)}" cy="${Y(100)}" r="5" fill="var(--goud)"/>`+TX(X(5),Y(100)-10,"optimum",{cls:"lbl",st:"fill:var(--goud-text)"});
  if(i===3)s+=TX(X(2.25),y1+14,"stress",{cls:"tick",st:"fill:var(--koraal)"})+TX(X(7.75),y1+14,"stress",{cls:"tick",st:"fill:var(--koraal)"});
  if(i>=4)s+=krom(6.8,1.6,"var(--paars)",2.6)+TX(X(6.8),Y(60),"soort 2",{cls:"lbl",st:"fill:var(--paars)"});
  return SV("0 0 460 240",s,"Tolerantiecurve met minimum, optimum en maximum");
}
E.zet(T1,[12,14],{
  titel:"Tolerantiegrenzen en optimum",
  html:`<ul>
  <li>Een organisme kan alleen leven binnen een bepaald bereik van een abiotische factor, zoals temperatuur, zuurstof of zoutgehalte.</li>
  <li>De onderste en bovenste grens zijn de <b>tolerantiegrenzen</b> (minimum en maximum). Het bereik ertussen is het <b>tolerantiegebied</b>.</li>
  <li>Bij het <b>optimum</b> gaat het het best: daar is de groei of overleving het hoogst.</li>
  <li>Elke soort heeft eigen tolerantiegrenzen, en soms verschillen ze ook per levensfase. Een gevoelig organisme overleeft maar in een klein gebied.</li>
  <li>Grafiek met <b>twee y-assen</b>: de ene lijn hoort bij de linker as, de andere bij de rechter. Check in de legenda wat bij welke as hoort voordat je afleest.</li></ul>`,
  anim:anim([
    "Een tolerantiecurve: op de x-as een abiotische factor, op de y-as hoe goed het organisme groeit of overleeft.",
    "Links en rechts van de curve overleeft het organisme niet. De grenzen zijn de <b>tolerantiegrenzen</b>; ertussen ligt het <b>tolerantiegebied</b>.",
    "Bij het <b>optimum</b> gaat het het best.",
    "Dicht bij de grenzen (rood) overleeft het organisme nog wel, maar het groeit slecht of plant zich niet voort.",
    "Een andere soort, of een andere levensfase, heeft een eigen curve: hier smaller en op een andere plek."],tolSvg),
  films:[F.plek]
});
/* extra waarom vraag 14 */
function sigSvg(i){
  const x0=40,x1=380,y0=190,y1=24;const X=v=>x0+(x1-x0)*v/10,Y=v=>y0-(y0-y1)*v/100;
  const sg=(x,c,H)=>H/(1+Math.exp(-(x-c)/.55));
  const pad=(c,H)=>{let d="";for(let x=0;x<=10.001;x+=.1)d+=(d?"L":"M")+X(x).toFixed(1)+","+Y(sg(x,c,H)).toFixed(1);return d;};
  let s=`<line class="ax" x1="${x0}" y1="${y0}" x2="${x0}" y2="${y1-6}"/><line class="ax" x1="${x0}" y1="${y0}" x2="${x1}" y2="${y0}"/>
  ${TX(x0-6,Y(100)+4,"100",{cls:"tick",a:"end"})}${TX(x0-6,y0+4,"0",{cls:"tick",a:"end"})}${TX(x1,y0+18,"zuurstofconcentratie →",{cls:"tick",a:"end"})}
  <text class="tick" transform="translate(12,${(y0+y1)/2}) rotate(-90)" text-anchor="middle">overleving (%)</text>
  <path d="${pad(3.3,100)}" fill="none" stroke="var(--text)" stroke-width="2.2" stroke-dasharray="2 4" stroke-linecap="round"/>${TX(X(1.6),Y(100)-6,"larven",{cls:"lblm"})}`;
  if(i===3){s+=`<path d="${pad(1.6,100)}" class="cvbad"/><path d="${pad(6,55)}" class="cvbad"/>`+TX(X(9.6),Y(55)-8,"fout: te laag",{cls:"lblbad",a:"end"})+TX(X(.4),Y(60),"fout: links",{cls:"lblbad",a:"start"});}
  if(i>=1){s+=`<path d="${pad(5.8,100)}" fill="none" stroke="var(--goud)" stroke-width="3"/>`+TX(X(7.6),Y(100)-6,"volwassen",{cls:"lbl",st:"fill:var(--goud-text)"});
    if(i===1)s+=A(X(3.5),Y(50),X(5.6),Y(50),"g",{w:2.4});}
  if(i===2)s+=`<line x1="${x0}" x2="${x1}" y1="${Y(100)}" y2="${Y(100)}" stroke="var(--goud)" stroke-width="2" stroke-dasharray="5 4"/>`+TX(X(5),Y(100)+16,"beide tot 100%",{cls:"lbl",st:"fill:var(--goud-text)"});
  return SV("0 0 400 214",s,"Overleving tegen zuurstofconcentratie voor larven en volwassen beekprikken");
}
E.waarom(T1,14,anim([
  "De curve van de larven: bij weinig zuurstof sterven ze, bij genoeg zuurstof overleven ze allemaal.",
  "Volwassen beekprikken zijn <b>gevoeliger</b> voor weinig zuurstof: ze hebben een hogere concentratie nodig. Hun curve ligt dus <b>rechts</b> van die van de larven (1 punt).",
  "In zuurstofrijk water overleven gezonde volwassen dieren ook allemaal: de curve bereikt <b>dezelfde hoogte</b>, 100% (1 punt).",
  "Fout is een curve die lager blijft (dan sterven er ook in goed water dieren) of een curve links (dan zouden ze juist minder gevoelig zijn)."],sigSvg));

/* --- vraag 13: variabelen --- */
function variSvg(i){
  const X=[100,240,380],L=[.3,.6,1],H=i>=1?[34,64,96]:[20,20,20];let s="";
  X.forEach((x,k)=>{s+=`<circle cx="${x}" cy="34" r="16" fill="var(--goud)" opacity="${L[k]}"/>`;
    for(let r=0;r<3;r++)s+=`<line x1="${x-14+r*14}" y1="54" x2="${x-20+r*20}" y2="74" stroke="var(--goud)" stroke-width="2" opacity="${L[k]}"/>`;
    s+=`<path d="M${x-26},182 L${x+26},182 L${x+20},210 L${x-20},210z" fill="var(--area)"/>`;
    s+=`<line x1="${x}" y1="182" x2="${x}" y2="${182-H[k]}" stroke="var(--groen)" stroke-width="3"/><ellipse cx="${x-8}" cy="${182-H[k]+6}" rx="9" ry="4" fill="var(--groen)"/><ellipse cx="${x+8}" cy="${182-H[k]+12}" rx="9" ry="4" fill="var(--groen)"/>`;
    if(i>=1){s+=`<line x1="${x+34}" y1="182" x2="${x+34}" y2="${182-H[k]}" stroke="var(--teal)" stroke-width="2"/><line x1="${x+29}" x2="${x+39}" y1="${182-H[k]}" y2="${182-H[k]}" stroke="var(--teal)" stroke-width="2"/>`;}});
  if(i===0)s+=TX(240,104,"onafhankelijke variabele: licht (zelf ingesteld)",{cls:"lbl",st:"fill:var(--goud-text)"});
  if(i===1)s+=TX(240,62+44,"afhankelijke variabele: lengte (gemeten)",{cls:"lbl",st:"fill:var(--teal)"});
  if(i>=2)s+=TX(240,228,"gelijk: pot, grond, water, temperatuur = constante factoren",{cls:"lbl"});
  return SV("0 0 480 236",s,"Proef met planten onder verschillende hoeveelheden licht");
}
E.zet(T1,[13],{
  titel:"Variabelen in een onderzoek",
  html:`<ul>
  <li><b>Onafhankelijke variabele</b>: de factor die de onderzoeker zelf kiest of verandert.</li>
  <li><b>Afhankelijke variabele</b>: wat je meet. De uitkomst hangt (misschien) af van de onafhankelijke variabele.</li>
  <li><b>Constante factoren</b>: alles wat je gelijk houdt, zodat een verschil alleen door de onafhankelijke variabele kan komen.</li>
  <li>Een onderzoek kan meer dan één onafhankelijke variabele hebben.</li>
  <li>Handige vraag: wat stelde de onderzoeker zelf in, en wat moest hij afwachten?</li></ul>`,
  anim:anim([
    "Vraag: groeit een plant harder bij meer licht? Je zet drie planten onder een andere lamp. Wat je zelf instelt, is de <b>onafhankelijke variabele</b>: hier de hoeveelheid licht.",
    "Na een paar weken meet je hoe lang de planten zijn. Wat je meet, is de <b>afhankelijke variabele</b>: die hangt af van wat je instelde.",
    "Alles wat verder invloed kan hebben, houd je gelijk: dat zijn de <b>constante factoren</b>. Anders weet je niet of een verschil door het licht komt.",
    "Een goed onderzoek gebruikt bovendien meer planten per groep (herhalingen), zodat toeval minder invloed heeft."],variSvg),
  films:[F.onderzoek]
});
function bakSvg(i){
  let s="";
  s+=N(90,50,150,"temperatuur|10 °C of 20 °C",{h:44,on:i===0,dim:i>=2&&i!==3?false:false})+N(90,120,150,"zuurstof omlaag|op dag 2, 4 en 6",{h:44,on:i===1});
  s+=TX(90,160,"ingesteld",{cls:"tick",st:i<=1?"fill:var(--goud-text)":""});
  s+=A(168,50,206,80,"g",{op:i===0?1:.4})+A(168,120,206,96,"g",{op:i===1?1:.4});
  s+=`<rect x="210" y="56" width="120" height="64" rx="8" fill="var(--teal-soft)" stroke="var(--teal)"/>`;
  [[236,76],[272,72],[306,80],[248,100],[296,102]].forEach(([x,y])=>s+=`<path d="M${x-14},${y} Q${x},${y-5} ${x+14},${y} Q${x},${y+5} ${x-14},${y}z" fill="var(--text2)"/>`);
  s+=TX(270,136,"5 larven",{cls:"tick"});
  s+=A(334,88,372,88,"t",{op:i===2?1:.4})+N(430,88,110,"sterfte (%)",{on:i===2})+TX(430,120,"gemeten",{cls:"tick",st:i===2?"fill:var(--teal)":""});
  s+=`<g opacity="${i===3?1:.4}"><circle cx="270" cy="180" r="16" fill="none" stroke="var(--text2)" stroke-width="2"/><line x1="270" y1="180" x2="270" y2="170" stroke="var(--text2)" stroke-width="2"/><line x1="270" y1="180" x2="278" y2="184" stroke="var(--text2)" stroke-width="2"/></g>`
    +TX(296,184,"tijd: wanneer je meet",{cls:"lblm",a:"start"});
  return SV("0 0 500 210",s,"Schema van het onderzoek met de beekpriklarven");
}
E.waarom(T1,13,anim([
  "De onderzoekers kozen zelf de temperatuur: 10 °C of 20 °C. Ingesteld, dus een <b>onafhankelijke</b> variabele.",
  "Ook de zuurstofverzadiging verlaagden ze zelf, op dag 2, 4 en 6. Ook die is ingesteld: onafhankelijk.",
  "Twee keer per dag telden ze hoeveel larven dood waren. Dat moesten ze afwachten: gemeten, dus de <b>afhankelijke variabele</b>.",
  "De tijd is geen uitkomst. Die loopt gewoon door en zegt alleen wanneer je meet. Het antwoord is: de sterfte van de beekpriklarven."],bakSvg));

/* --- vraag 15: populaties --- */
function popSvg(i){
  let s=`<rect x="160" y="80" width="160" height="70" rx="12" fill="var(--surface)" stroke="var(--line2)" stroke-width="1.6"/>`;
  const n=i===3?6:14;punten(n,172,308,92,140,5).forEach(([x,y])=>s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="var(--teal)"/>`);
  s+=TX(228,168,"populatie",{cls:"lbl",a:"end"});
  const on1=i===1,on2=i===2;
  s+=A(240,8,240,74,"n",{w:on1?3:2,op:i>=1?1:.25})+TX(250,30,"geboorte",{cls:"lblm",a:"start"});
  s+=A(240,156,240,214,"k",{w:on1?3:2,op:i>=1?1:.25})+TX(250,196,"sterfte",{cls:"lblm",a:"start"});
  s+=A(20,115,154,115,"n",{w:on2?3:2,op:i>=2?1:.25})+TX(30,140,"immigratie",{cls:"lblm",a:"start"});
  s+=A(326,115,460,115,"k",{w:on2?3:2,op:i>=2?1:.25})+TX(460,140,"emigratie",{cls:"lblm",a:"end"});
  if(i===3){[[130,90,130,140],[360,90,360,140]].forEach(([a,b,c,d])=>s+=`<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" stroke="var(--koraal)" stroke-width="6" stroke-linecap="round"/>`);
    s+=TX(130,82,"barrière",{cls:"lbl",st:"fill:var(--koraal)"})+TX(360,82,"barrière",{cls:"lbl",st:"fill:var(--koraal)"});}
  return SV("0 0 480 222",s,"Populatie met geboorte, sterfte, immigratie en emigratie");
}
E.zet(T1,[15],{
  titel:"Populaties: wat erbij komt en wat eraf gaat",
  html:`<ul>
  <li>Een <b>populatie</b> is een groep individuen van dezelfde soort in hetzelfde gebied, die zich onderling voortplanten.</li>
  <li>Erbij: <b>geboorte</b> en <b>immigratie</b>. Eraf: <b>sterfte</b> en <b>emigratie</b>.</li>
  <li>Veel dieren hebben in verschillende levensfasen verschillende plekken nodig: om te eten, te overwinteren of zich voort te planten (bijvoorbeeld de poel waar padden hun eieren leggen).</li>
  <li>Barrières zoals wegen, dammen en stuwen <b>versnipperen</b> een leefgebied. Kleine, geïsoleerde populaties sterven makkelijker uit.</li>
  <li>Verbindingen, zoals ecoducten en paddentunnels, maken een gebied weer bereikbaar.</li></ul>`,
  anim:anim([
    "Een <b>populatie</b>: individuen van dezelfde soort, in hetzelfde gebied, die zich met elkaar voortplanten.",
    "Door <b>geboorte</b> komen er individuen bij, door <b>sterfte</b> gaan er af. Zonder nakomelingen kan een populatie niet blijven bestaan.",
    "Door <b>immigratie</b> komen er dieren van elders bij, door <b>emigratie</b> vertrekken ze. Groei = geboorte + immigratie − sterfte − emigratie.",
    "Barrières sluiten een populatie in. Dieren kunnen dan niet meer overal komen waar ze moeten zijn, en de populatie wordt kleiner en kwetsbaarder."],popSvg),
  films:[F.plek,F.ingrijpen]
});
function passageSvg(i){
  let s=`<rect x="0" y="90" width="520" height="40" fill="var(--teal)" opacity=".22"/><line x1="0" x2="520" y1="90" y2="90" stroke="var(--teal)" stroke-width="2"/>
  <rect x="0" y="130" width="520" height="12" fill="var(--area)" opacity=".6"/>`;
  punten(26,10,150,132,141,3).forEach(([x,y])=>s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.4" fill="var(--text3)"/>`);
  s+=TX(80,160,"bovenloop: grind",{cls:"tick"})+TX(440,160,"benedenloop: zand",{cls:"tick"});
  s+=A(430,78,500,78,"t",{w:1.4})+TX(430,72,"stroomrichting",{cls:"tick",a:"start"});
  s+=`<rect x="240" y="40" width="50" height="44" rx="4" fill="var(--surface2)" stroke="var(--text2)"/>`+TX(265,66,"molen",{cls:"tick"})+`<rect x="255" y="88" width="8" height="44" fill="var(--koraal)"/>`;
  if(i>=2)s+=`<path d="M300,130 C300,190 220,190 222,130" fill="none" stroke="var(--teal)" stroke-width="12" opacity=".5"/>`+TX(262,200,"vispassage",{cls:"lblm"});
  const vis=(x,y,c="var(--goud)")=>`<path d="M${x-14},${y} Q${x},${y-6} ${x+14},${y} Q${x},${y+6} ${x-14},${y}z" fill="${c}"/>`;
  if(i===0)s+=vis(420,104)+vis(450,116)+A(400,110,340,110,"g");
  if(i===1){s+=vis(290,104)+vis(300,118)+TX(330,186,"geen eitjes, geen jongen: de populatie krimpt",{cls:"lbl",st:"fill:var(--koraal)"})+`<path d="M232,98 l14,14 m0,-14 l-14,14" stroke="var(--koraal)" stroke-width="3"/>`;}
  if(i>=2){s+=vis(100,104)+vis(130,116);[[60,128],[70,124],[82,128],[90,125]].forEach(([x,y])=>s+=`<circle cx="${x}" cy="${y}" r="3" fill="var(--goud)" stroke="var(--text)" stroke-width=".6"/>`);
    if(i===3)s+=`<path d="M340,112 q6,-4 12,0" stroke="var(--text2)" stroke-width="2" fill="none"/><path d="M380,116 q6,-4 12,0" stroke="var(--text2)" stroke-width="2" fill="none"/>`+TX(372,104,"larven",{cls:"tick"});}
  return SV("0 0 520 210",s,"Beek met watermolen en vispassage");
}
E.waarom(T1,15,anim([
  "Volwassen beekprikken zwemmen <b>stroomopwaarts</b> naar de grindbodem in de bovenloop. Daar zetten ze hun eitjes af.",
  "De stuw en het molenrad houden ze tegen. Ze bereiken het grind niet: er komen geen eitjes en geen jongen bij. De populatie krimpt.",
  "Via de <b>vispassage</b> zwemmen ze om de molen heen naar het grind en zetten daar eitjes af: <b>voortplanting</b> kan weer.",
  "De larven drijven stroomafwaarts naar het zand. Zo komen er steeds nakomelingen bij en blijft de populatie in stand. Alleen ‘ze worden niet door het molenrad gedood’ levert géén punt op."],passageSvg));

/* =====================================================================
   havo26-2 · opgave 2 Bonaire
   ===================================================================== */

/* --- vraag 10: fotosynthese en dissimilatie --- */
function celSvg(i){
  let s="";
  const cel=(x,t,on)=>`<rect x="${x}" y="34" width="210" height="160" rx="22" fill="var(--surface)" stroke="${on?"var(--goud)":"var(--line2)"}" stroke-width="${on?2.2:1.5}"/>`+TX(x+105,24,t,{cls:"lblm"});
  s+=cel(20,"bladcel",i<=1)+cel(270,"wortelcel",i===2);
  s+=`<g opacity="${i===0||i===3?1:.35}"><ellipse cx="85" cy="90" rx="34" ry="18" fill="var(--groen)" opacity=".85"/>${TX(85,94,"bladgroen",{cls:"tick",st:"fill:var(--text)"})}</g>`;
  const mito=(x,y,on)=>`<g opacity="${on?1:.35}"><ellipse cx="${x}" cy="${y}" rx="28" ry="13" fill="var(--koraal-soft)" stroke="var(--koraal)" stroke-width="1.6"/><path d="M${x-20},${y} q5,-8 10,0 t10,0 t10,0 t10,0" fill="none" stroke="var(--koraal)" stroke-width="1.2"/></g>`;
  s+=mito(175,170,i===1||i===3)+mito(375,100,i>=2);
  if(i===0)s+=TX(95,134,"CO₂ + water + licht|→ glucose + O₂",{cls:"lblm"});
  if(i===1)s+=TX(110,134,"glucose + O₂ →|CO₂ + water + energie",{cls:"lblm"});
  if(i>=2){s+=TX(375,140,"glucose + O₂ →|CO₂ + water + energie",{cls:"lblm"})+TX(375,62,"geen bladgroen",{cls:"tick"})+TX(375,180,"glucose komt via de bastvaten",{cls:"tick"});}
  return SV("0 0 500 222",s,"Bladcel met bladgroenkorrel en mitochondrion, wortelcel met alleen mitochondrion");
}
E.zet(T2,[10],{
  titel:"Fotosynthese en dissimilatie in een plant",
  html:`<ul>
  <li><b>Fotosynthese</b>: 6 CO₂ + 6 H₂O → C₆H₁₂O₆ + 6 O₂. Dit gebeurt alleen in cellen met <b>bladgroenkorrels</b>, en alleen als er licht is.</li>
  <li><b>Verbranding</b> (aerobe dissimilatie): C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + energie. Dit gebeurt in de <b>mitochondriën</b> van álle levende cellen, ook in plantencellen.</li>
  <li>De energie (ATP) uit dissimilatie gebruikt een cel voor groei, transport en onderhoud.</li>
  <li>Cellen zonder bladgroen, zoals wortelcellen, krijgen hun glucose aangevoerd via de bastvaten.</li>
  <li>Een plant geeft netto zuurstof af als de fotosynthese groter is dan de dissimilatie van de hele plant.</li></ul>`,
  anim:anim([
    "In de <b>bladgroenkorrels</b> doet een plant fotosynthese: met lichtenergie maakt hij glucose uit CO₂ en water. Er komt O₂ vrij.",
    "In de <b>mitochondriën</b> wordt glucose verbrand: aerobe dissimilatie. Daarbij wordt O₂ verbruikt en komt energie vrij voor de cel.",
    "Een <b>wortelcel</b> heeft geen bladgroen, dus geen fotosynthese. Hij krijgt glucose via de bastvaten en heeft wel mitochondriën.",
    "Fotosynthese en dissimilatie zijn twee aparte processen. Of een plant netto zuurstof afgeeft, hangt af van welk proces groter is."],celSvg),
  films:[F.groen,F.adem]
});
function dagSvg(i){
  const x0=40,x1=440,y0=180,y1=24;const X=h=>x0+(x1-x0)*h/24,Y=v=>y0-(y0-y1)*v/100;
  let s=`<rect x="${X(0)}" y="${y1}" width="${X(6)-X(0)}" height="${y0-y1}" fill="var(--area)" opacity="${i===2?.5:.25}"/><rect x="${X(20)}" y="${y1}" width="${X(24)-X(20)}" height="${y0-y1}" fill="var(--area)" opacity="${i===2?.5:.25}"/>`;
  s+=`<line class="ax" x1="${x0}" y1="${y0}" x2="${x0}" y2="${y1-6}"/><line class="ax" x1="${x0}" y1="${y0}" x2="${x1}" y2="${y0}"/>`;
  [0,6,12,18,24].forEach(h=>s+=TX(X(h),y0+14,h+" u",{cls:"tick"}));
  s+=TX(X(3),y1+14,"nacht",{cls:"tick"})+TX(X(22),y1+14,"nacht",{cls:"tick"})+TX(X(13),y1+14,"dag",{cls:"tick"});
  let d="";for(let h=0;h<=24.001;h+=.25){const v=h>6&&h<20?80*Math.sin(Math.PI*(h-6)/14):0;d+=(d?"L":"M")+X(h).toFixed(1)+","+Y(v).toFixed(1);}
  s+=`<path d="${d}" fill="none" stroke="var(--groen)" stroke-width="2.6"/>`+TX(X(17.3),Y(62),"fotosynthese (blad)",{cls:"lblm",a:"start"});
  if(i>=1)s+=`<line x1="${X(0)}" x2="${X(24)}" y1="${Y(28)}" y2="${Y(28)}" stroke="var(--koraal)" stroke-width="${i===2?3.4:2.6}"/>`+TX(X(.3),Y(28)-20,"O₂-verbruik wortels|(dissimilatie)",{cls:"lbl",a:"start",st:"fill:var(--koraal)"});
  if(i===2)[3,22].forEach(h=>s+=`<circle cx="${X(h)}" cy="${Y(28)}" r="6" fill="var(--goud)"/>`);
  return SV("0 0 460 200",s,"Fotosynthese en zuurstofverbruik van wortels over 24 uur");
}
E.waarom(T2,10,anim([
  "Fotosynthese in de bladeren kan alleen als er licht is: overdag.",
  "De wortelcellen verbruiken zuurstof bij de verbranding (dissimilatie). Daarmee maken ze energie vrij, die ze steeds nodig hebben, bijvoorbeeld voor de opname van mineralen.",
  "Ook ’s nachts leven de wortelcellen en hebben ze energie nodig. De dissimilatie gaat door, dus het zuurstofverbruik ook.",
  "Antwoord: <b>zowel overdag als ’s nachts</b>. Fotosynthese hangt af van licht, dissimilatie niet."],dagSvg));

/* --- vraag 11: osmotische waarde en transport --- */
function membSvg(i){
  let s=`<rect x="20" y="30" width="420" height="160" rx="10" fill="var(--teal)" opacity=".08"/>`;
  for(let y=30;y<190;y+=14)s+=`<rect x="226" y="${y}" width="8" height="10" rx="3" fill="var(--text3)"/>`;
  s+=TX(230,22,"membraan",{cls:"tick"});
  const deel=(n,x0,x1,seed,r,kl)=>punten(n,x0,x1,44,176,seed).map(([x,y])=>`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${kl}"/>`).join("");
  if(i===0){s+=deel(14,34,210,1,4,"var(--paars)")+deel(3,250,426,2,4,"var(--paars)")+A(180,110,290,110,"g",{w:3})+TX(230,206,"diffusie: van hoog naar laag, vanzelf",{cls:"lbl",st:"fill:var(--goud-text)"});}
  if(i===1){s+=deel(8,34,210,3,7,"var(--paars)")+deel(2,250,426,4,7,"var(--paars)")+deel(10,34,210,5,2.6,"var(--teal)")+deel(16,250,426,6,2.6,"var(--teal)")+A(300,100,170,100,"t",{w:3});
    s+=TX(120,206,"hoge osmotische waarde",{cls:"lblm"})+TX(340,206,"lage osmotische waarde",{cls:"lblm"})+TX(236,86,"water",{cls:"lbl",st:"fill:var(--teal)"});}
  if(i===2){s+=deel(3,34,210,7,4,"var(--paars)")+deel(14,250,426,8,4,"var(--paars)")+`<rect x="218" y="96" width="24" height="30" rx="6" fill="var(--goud)"/>`+A(170,111,300,111,"g",{w:3})+TX(230,150,"ATP → energie",{cls:"lbl",st:"fill:var(--goud-text)"})+TX(230,206,"actief transport: tegen het concentratieverschil in",{cls:"lbl",st:"fill:var(--goud-text)"});}
  if(i===3){s+=TX(120,90,"passief|(geen energie)",{cls:"lbl"})+TX(120,140,"diffusie · osmose",{cls:"lblm"})+TX(340,90,"actief|(kost ATP)",{cls:"lbl",st:"fill:var(--goud-text)"})+TX(340,140,"actief transport",{cls:"lblm"});}
  return SV("0 0 460 216",s,"Diffusie, osmose en actief transport door een membraan");
}
E.zet(T2,[11],{
  titel:"Osmotische waarde en transport door het membraan",
  html:`<ul>
  <li>De <b>osmotische waarde</b> is een maat voor de hoeveelheid opgeloste deeltjes in een oplossing. Meer opgeloste deeltjes = hogere osmotische waarde.</li>
  <li><b>Diffusie</b>: opgeloste deeltjes verplaatsen zich vanzelf van een hoge naar een lage concentratie. Dat is passief: het kost de cel geen energie.</li>
  <li><b>Osmose</b>: verplaatsing van <b>water</b> door een selectief permeabel membraan, naar de kant met de hoogste osmotische waarde.</li>
  <li><b>Actief transport</b>: stoffen worden met dragereiwitten in het membraan tegen het concentratieverschil in verplaatst. Dat kost energie (ATP).</li>
  <li>Een cel kan zijn osmotische waarde regelen door opgeloste stoffen op te nemen of af te geven.</li></ul>`,
  anim:anim([
    "<b>Diffusie</b>: opgeloste deeltjes (paars) bewegen vanzelf van de kant met veel naar de kant met weinig.",
    "<b>Osmose</b>: water (teal) gaat door het membraan naar de kant met de meeste opgeloste deeltjes, de hoogste osmotische waarde.",
    "<b>Actief transport</b>: een dragereiwit pompt deeltjes naar de kant waar er al veel zijn. Dat kost energie (ATP).",
    "Diffusie en osmose zijn passief. Actief transport kost energie. Osmose gaat alleen over water; opgeloste stoffen zoals zouten gaan via diffusie of actief transport."],membSvg),
  films:[F.osmose]
});
function zoutSvg(i){
  let s=`<rect x="20" y="40" width="250" height="150" rx="20" fill="var(--surface)" stroke="var(--line2)" stroke-width="1.6"/>`+TX(145,30,"bladcel",{cls:"lblm"});
  s+=`<rect x="300" y="40" width="160" height="150" rx="6" fill="var(--goud-soft)" opacity=".5"/>`+TX(380,30,"bladoppervlak: veel zout",{cls:"lblm"});
  punten(18,312,450,50,180,11).forEach(([x,y])=>s+=`<rect x="${(x-3).toFixed(1)}" y="${(y-3).toFixed(1)}" width="6" height="6" fill="var(--paars)"/>`);
  const n=i>=2?5:14;punten(n,36,226,56,176,12).forEach(([x,y])=>s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="var(--paars)"/>`);
  s+=`<rect x="262" y="98" width="26" height="34" rx="6" fill="${i>=1?"var(--goud)":"var(--line2)"}"/>`+TX(275,150,"zoutklier",{cls:"tick"});
  if(i>=1)s+=A(230,115,330,115,"g",{w:3})+TX(275,86,"ATP",{cls:"lbl",st:"fill:var(--goud-text)"});
  if(i>=2)s+=TX(145,208,"minder opgelost → osmotische waarde lager",{cls:"lbl",st:"fill:var(--goud-text)"});
  return SV("0 0 480 216",s,"Zoutklier pompt zoutionen uit een bladcel naar het zoute bladoppervlak");
}
E.waarom(T2,11,anim([
  "Met het zoute water komt veel zout in de plant. In de bladcellen zitten veel opgeloste zoutionen (paars).",
  "De zoutklieren pompen zoutionen naar buiten, naar het bladoppervlak, waar al heel veel zout ligt. Dat is <b>tegen het concentratieverschil in</b>: dat kan alleen met <b>actief transport</b>, en dat kost ATP.",
  "Er blijven minder opgeloste deeltjes in de bladcel over. De <b>osmotische waarde</b> van de bladcellen wordt dus <b>lager</b>.",
  "Antwoord: lager · actief transport. Diffusie kan niet, want die gaat van hoog naar laag. Osmose gaat over water, niet over zout."],zoutSvg));

/* --- vraag 12: soorten op een nieuwe plek (geen term noemen: daar vraagt de vraag naar) --- */
function nieuwSvg(i){
  let s=`<ellipse cx="110" cy="105" rx="90" ry="62" fill="var(--teal-soft)" stroke="var(--teal)"/><ellipse cx="390" cy="105" rx="90" ry="62" fill="var(--groen-soft)" stroke="var(--groen)"/>`;
  s+=TX(110,30,"oorspronkelijk gebied",{cls:"lblm"})+TX(390,30,"nieuw gebied",{cls:"lblm"});
  punten(9,60,160,80,135,21).forEach(([x,y])=>s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" fill="var(--goud)"/>`);
  const inh=i>=3?3:9;punten(inh,340,440,75,140,22).forEach(([x,y])=>s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" fill="var(--teal)"/>`);
  if(i>=1){s+=A(200,105,296,105,"x",{w:2,dash:true})+`<path d="M232,84 l36,0 l-6,10 l-24,0z" fill="var(--text2)"/><rect x="246" y="72" width="8" height="12" fill="var(--text2)"/>`+TX(250,128,"door de mens",{cls:"tick"});}
  const nieuw=i>=2?12:i===1?2:0;punten(nieuw,330,450,70,142,23).forEach(([x,y])=>s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" fill="var(--goud)"/>`);
  if(i===2)s+=TX(390,190,"geen natuurlijke vijanden",{cls:"lbl",st:"fill:var(--goud-text)"});
  if(i===3)s+=TX(330,190,"concurrentie: inheemse soorten verdrongen",{cls:"lbl",st:"fill:var(--koraal)"});
  return SV("0 0 500 200",s,"Een soort wordt door de mens naar een nieuw gebied gebracht");
}
E.zet(T2,[12],{
  titel:"Soorten buiten hun oorspronkelijke gebied",
  html:`<p>Niet elke soort die je ergens vindt, hoort daar van nature thuis.</p><ul>
  <li>Elke soort heeft een <b>oorspronkelijk verspreidingsgebied</b>: het gebied waar hij van nature voorkomt.</li>
  <li>De mens verplaatst soorten, bewust of per ongeluk: met schepen (ballastwater), handel, als huisdier of als tuinplant.</li>
  <li>Op de nieuwe plek ontbreken vaak natuurlijke vijanden en ziekten. Dan kan de soort zich snel uitbreiden en inheemse soorten verdringen.</li>
  <li>Voorbeelden in Nederland: de muskusrat, de Japanse duizendknoop en het Aziatisch lieveheersbeestje.</li></ul>
  <p>Voor zo’n soort bestaat een vaste biologische term. Weet je hem?</p>`,
  anim:anim([
    "Een soort (goud) leeft in zijn <b>oorspronkelijke verspreidingsgebied</b>. In het andere gebied leven van nature andere soorten (teal).",
    "De mens neemt de soort mee naar een ander gebied, bijvoorbeeld met een schip.",
    "Op de nieuwe plek zijn er vaak <b>geen natuurlijke vijanden</b>. De soort kan zich snel uitbreiden.",
    "Er ontstaat <b>concurrentie</b> om voedsel, licht of ruimte. Soorten die er al leefden, kunnen worden verdrongen en de biodiversiteit daalt."],nieuwSvg),
  films:[F.ingrijpen]
});

/* --- vraag 13: eutrofiëring en concurrentie --- */
function slootSvg(i){
  let s=`<rect x="0" y="40" width="460" height="150" fill="var(--teal)" opacity=".12"/><line x1="0" x2="460" y1="40" y2="40" stroke="var(--teal)" stroke-width="2"/>
  <rect x="0" y="190" width="460" height="22" fill="var(--area)" opacity=".6"/><circle cx="430" cy="14" r="14" fill="var(--goud)"/>`;
  const stop=i>=2?52:190;
  [70,160,250,340].forEach(x=>s+=`<line x1="${430-(430-x)*.05}" y1="22" x2="${x}" y2="${stop}" stroke="var(--goud)" stroke-width="2.2" opacity=".85"/>`);
  const dood=i>=3;
  for(let k=0;k<9;k++){const x=30+k*50;
    if(i===4){s+=`<path d="M${x-10},188 q10,-8 20,0" stroke="var(--text3)" stroke-width="3" fill="none"/>`;}
    else s+=`<g opacity="${dood?.3:1}"><line x1="${x}" y1="190" x2="${x}" y2="120" stroke="var(--groen)" stroke-width="3"/><ellipse cx="${x-8}" cy="135" rx="9" ry="4" fill="var(--groen)"/><ellipse cx="${x+8}" cy="150" rx="9" ry="4" fill="var(--groen)"/><ellipse cx="${x-7}" cy="165" rx="8" ry="3.5" fill="var(--groen)"/></g>`;}
  if(i>=1)punten(i>=2?10:18,10,450,60,180,31).forEach(([x,y])=>s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.6" fill="var(--paars)"/>`);
  if(i>=2){s+=`<rect x="0" y="40" width="460" height="12" fill="var(--groen)" opacity=".85"/>`;for(let x=6;x<460;x+=13)s+=`<circle cx="${x}" cy="40" r="5" fill="var(--groen)"/>`;}
  if(i===1)s+=A(30,6,60,36,"k",{w:2})+TX(70,18,"mest, afvalwater",{cls:"lblm",a:"start"});
  if(i===4){[[80,184],[180,186],[290,183],[380,185]].forEach(([x,y])=>s+=`<rect x="${x-6}" y="${y-2}" width="12" height="5" rx="2" fill="var(--paars)"/>`);s+=TX(230,110,"afbraak: zuurstof raakt op",{cls:"lbl",st:"fill:var(--koraal)"});}
  if(i===3)s+=TX(230,110,"te weinig licht op de bodem",{cls:"lbl",st:"fill:var(--koraal)"});
  return SV("0 0 460 212",s,"Sloot bij eutrofiëring: mineralen, algen aan het oppervlak en waterplanten op de bodem");
}
E.zet(T2,[13],{
  titel:"Eutrofiëring en concurrentie om licht",
  html:`<ul>
  <li><b>Eutrofiëring</b>: verrijking van water (of bodem) met voedingsstoffen, vooral stikstof- en fosfaatverbindingen (mineralen).</li>
  <li>Bronnen zijn bijvoorbeeld mest en kunstmest van landbouwgrond, en afvalwater.</li>
  <li><b>Concurrentie</b>: organismen hebben dezelfde hulpbron nodig (licht, ruimte, mineralen, voedsel) en er is te weinig voor allemaal. Een soort die sneller groeit, kan een andere soort <b>verdringen</b>.</li></ul>`,
  anim:anim([
    "Een gezonde sloot: weinig mineralen en helder water. Het licht komt tot op de bodem, waar waterplanten groeien.",
    "<b>Eutrofiëring</b>: er komen veel extra mineralen (paars), zoals nitraat en fosfaat, in het water, bijvoorbeeld uit mest of afvalwater.",
    "Algen en kroos groeien heel snel en profiteren het eerst. Ze vormen een dichte laag aan het oppervlak en nemen de mineralen op.",
    "Die laag vangt het licht weg: <b>concurrentie om licht</b>. De waterplanten op de bodem kunnen te weinig fotosynthese doen en sterven af.",
    "Reducenten breken de dode planten af en verbruiken daarbij zuurstof. Zo kan het water ook zuurstofarm worden."],slootSvg),
  films:[F.plek,F.aarde]
});

/* --- vraag 14: biotisch en abiotisch, vergelijkend onderzoek --- */
E.zet(T2,[14],{
  titel:"Biotische en abiotische factoren in onderzoek",
  html:`<ul>
  <li><b>Abiotische factoren</b>: de niet-levende factoren in het milieu.</li>
  <li><b>Biotische factoren</b>: de invloeden van andere organismen.</li>
  <li>In een <b>vergelijkend onderzoek</b>, bijvoorbeeld twee gebieden naast elkaar, wil je dat de gebieden alleen verschillen in de factor waar het om gaat.</li>
  <li>Alle andere factoren houd je zo gelijk mogelijk (constante factoren). Anders weet je niet waardoor een gevonden verschil komt.</li></ul>`,
  anim:box=>{let s="";
    const kaart=(x,kop,kl,items)=>{let t=`<rect x="${x}" y="8" width="226" height="176" rx="12" fill="var(--surface)" stroke="${kl}" stroke-width="1.6"/>`+TX(x+113,30,kop,{cls:"lbl",st:`fill:${kl}`});
      items.forEach((it,k)=>t+=TX(x+18,58+k*22,"· "+it,{cls:"lblm",a:"start"}));return t;};
    s+=kaart(6,"abiotisch · niet-levend","var(--teal)",["bodemsoort","neerslag","wind","luchtvochtigheid","hellingshoek"]);
    s+=kaart(248,"biotisch · levend","var(--groen)",["voedsel (prooien, planten)","predatoren","concurrenten","parasieten, ziekteverwekkers","symbionten"]);
    box.append(E.el("div",{style:"border-radius:var(--radius);background:var(--surface2);border:1px solid var(--line2);padding:6px"},SV("0 0 480 190",s,"Voorbeelden van abiotische en biotische factoren op het land")));},
  films:[F.plek,F.onderzoek]
});
function vergSvg(i){
  const R=[["waterdiepte","3 m","10 m"],["watertemperatuur","28 °C","24 °C"],["licht","",""],["stroming","",""],["zoutgehalte","",""]];
  let s=TX(160,22,"Bonaire",{cls:"lbl"})+TX(340,22,"Aruba",{cls:"lbl"})+TX(160,40,"28 vissoorten",{cls:"lblm"})+TX(340,40,"14 vissoorten",{cls:"lblm"});
  R.forEach(([f,a,b],k)=>{const y=74+k*26;const anders=i===1&&k<2;
    s+=TX(20,y,f,{cls:"lblm",a:"start"});
    if(i>=1){s+=TX(160,y,anders?a:"…",{cls:"lbl"})+TX(340,y,anders?b:"…",{cls:"lbl"})+TX(250,y,i===1?(anders?"≠":""):"=",{cls:"lbl",st:`fill:${anders?"var(--koraal)":"var(--teal)"};font-size:16px`});}});
  if(i===3)s+=TX(250,214,"noem twee verschillende abiotische factoren",{cls:"lbl",st:"fill:var(--goud-text)"});
  return SV("0 0 480 222",s,"Vergelijking van de onderzoeksgebieden bij Bonaire en Aruba");
}
E.waarom(T2,14,anim([
  "De onderzoekers willen de diversiteit aan vissen bij Bonaire en Aruba vergelijken.",
  "Stel dat het water bij Aruba dieper en kouder is. Dan kan het verschil in vissoorten ook dáárdoor komen, en niet door het eiland.",
  "Daarom kies je plekken waar de abiotische factoren gelijk zijn: waterdiepte, temperatuur, licht, stroming, zoutgehalte, zuurstof, nutriënten.",
  "Elk juist genoemde factor is 1 punt. Noem twee echt verschillende factoren (niet ‘licht’ en ‘zon’) en geen biotische, zoals de hoeveelheid zeegras."],vergSvg));

/* --- vraag 15: resultaat, conclusie en hypothese --- */
function cyclusSvg(i){
  const P=[[240,24,"waarneming"],[380,72,"onderzoeksvraag"],[380,168,"hypothese"],[240,216,"experiment"],[100,168,"resultaten"],[100,72,"conclusie"]];
  const on=[[0,1],[2],[3,4],[5]][i];let s="";
  [[305,30,380,54],[380,90,380,148],[345,186,300,206],[176,206,140,186],[100,150,100,92],[130,56,174,34]].forEach(([x1,y1,x2,y2])=>s+=A(x1,y1,x2,y2,"x",{w:1.6,op:.7}));
  P.forEach(([x,y,t],k)=>s+=N(x,y,130,t,{on:on.includes(k),dim:k>Math.max(...on)}));
  if(i===3)s+=TX(240,124,"alleen over wat je|gemeten hebt",{cls:"lbl",st:"fill:var(--goud-text)"});
  if(i===1)s+=TX(240,124,"verwachting,|nog niet bewezen",{cls:"lbl",st:"fill:var(--goud-text)"});
  return SV("0 0 480 240",s,"De stappen van een biologisch onderzoek");
}
E.zet(T2,[15],{
  titel:"Resultaat, conclusie en hypothese",
  html:`<ul>
  <li>Een <b>hypothese</b> is een mogelijk antwoord op de onderzoeksvraag: een verwachte verklaring. Die is nog niet getoetst.</li>
  <li>De <b>resultaten</b> zijn wat er echt gemeten is, bijvoorbeeld de getallen in een tabel.</li>
  <li>Een <b>conclusie</b> is het antwoord op de onderzoeksvraag, alleen gebaseerd op de resultaten. Een conclusie gaat niet verder dan wat je gemeten hebt.</li>
  <li>Twee dingen die samen voorkomen, zijn nog geen oorzaak en gevolg.</li>
  <li>Tip: zoek bij elke uitspraak op of alles waar hij over gaat ook echt gemeten is.</li></ul>`,
  anim:anim([
    "Onderzoek begint met een <b>waarneming</b>, en daaruit volgt een <b>onderzoeksvraag</b>.",
    "Een <b>hypothese</b> is een mogelijk antwoord: wat je verwacht en waarom. Hij moet nog getoetst worden.",
    "In het <b>experiment</b> meet je iets. De <b>resultaten</b> zijn de gemeten waarden.",
    "De <b>conclusie</b> beantwoordt de onderzoeksvraag, met alleen wat de resultaten laten zien. Daarna volgt vaak een nieuwe vraag."],cyclusSvg),
  films:[F.onderzoek]
});
function concSvg(i){
  let s=`<rect x="20" y="8" width="440" height="66" rx="8" fill="var(--surface)" stroke="var(--line2)"/>`;
  s+=TX(150,26,"totaal aantal vissen",{cls:"tick"})+TX(340,26,"aantal vissoorten",{cls:"tick"});
  s+=TX(40,48,"Bonaire",{cls:"lblm",a:"start"})+TX(150,48,"566",{cls:"lbl"})+TX(340,48,"28",{cls:"lbl"});
  s+=TX(40,66,"Aruba",{cls:"lblm",a:"start"})+TX(150,66,"472",{cls:"lbl"})+TX(340,66,"14",{cls:"lbl"});
  const U=[["1  diversiteit aan vissen groter op Bonaire",[["aantal vissoorten",1]],1],["2  meer diversiteit gaat verdringing tegen",[["vissoorten",1],["verdringing zeegras",0]],0],["3  vissen eten H. stipulacea",[["wat vissen eten",0],["verdringing",0]],0]];
  U.forEach(([t,need,ok],k)=>{const y=104+k*52;const on=i===k||i===3;
    s+=`<g opacity="${on?1:.35}">`+TX(20,y,t,{cls:"lbl",a:"start"});
    let x=30;need.forEach(([n,g])=>{const w=n.length*6.6+34;s+=`<rect x="${x}" y="${y+8}" width="${w}" height="20" rx="10" fill="${g?"var(--teal-soft)":"var(--koraal-soft)"}" stroke="${g?"var(--teal)":"var(--koraal)"}"/>`+TX(x+w/2,y+22,(g?"✓ ":"✗ ")+n,{cls:"tick",st:"fill:var(--text)"});x+=w+8;});
    if(on)s+=TX(460,y+22,ok?"wel conclusie":"geen conclusie",{cls:"lbl",a:"end",st:`fill:${ok?"var(--teal)":"var(--koraal)"}`});
    s+="</g>";});
  return SV("0 0 480 262",s,"Tabel 1 en de drie uitspraken: wat is gemeten?");
}
E.waarom(T2,15,anim([
  "Uitspraak 1 gaat over de diversiteit aan vissen. Die is gemeten: 28 soorten bij Bonaire, 14 bij Aruba. <b>Wel een conclusie.</b>",
  "Uitspraak 2 gaat ook over de verdringing van het zeegras. Die is niet gemeten; dat verband is het vermoeden (de hypothese) van de onderzoekers. <b>Geen conclusie.</b>",
  "Uitspraak 3 gaat over wat de vissen eten. Ook dat staat niet in tabel 1. <b>Geen conclusie.</b>",
  "1 wel, 2 geen, 3 geen. Drie goed = 2 punten, twee goed = 1 punt."],concSvg));

/* --- vraag 16: broeikaseffect --- */
function broeiSvg(i){
  let s=`<rect x="0" y="186" width="460" height="40" fill="var(--area)" opacity=".7"/>${TX(400,212,"aarde",{cls:"tick"})}
  <rect x="0" y="60" width="460" height="54" fill="var(--teal)" opacity=".1"/>${TX(452,76,"atmosfeer",{cls:"tick",a:"end"})}<circle cx="34" cy="26" r="18" fill="var(--goud)"/>`;
  [[60,40,150,182],[70,30,250,182],[60,48,110,182]].forEach(([a,b,c,d])=>s+=A(a,b,c,d,"g",{w:2.4}));
  if(i>=1){[[190,180,170,20],[280,180,300,20],[360,180,380,20]].forEach(([a,b,c,d],k)=>{const blok=i>=2&&(k<(i>=3?3:1));
    s+=blok?A(a,b,(a+c)/2,90,"k",{w:2.2})+A((a+c)/2,90,a+(k%2?20:-20),178,"k",{w:2.2,dash:true}):A(a,b,c,d,"k",{w:2.2});});}
  if(i>=2)punten(i>=3?22:8,10,450,66,108,41).forEach(([x,y])=>s+=`<g><circle cx="${(x-4).toFixed(1)}" cy="${y.toFixed(1)}" r="3.2" fill="var(--paars)"/><circle cx="${(x+4).toFixed(1)}" cy="${y.toFixed(1)}" r="3.2" fill="var(--paars)"/></g>`);
  if(i>=2)s+=TX(150,212,i>=3?"meer warmte vastgehouden":"deel van de warmte vastgehouden",{cls:"lbl",st:"fill:var(--koraal)"});
  const tH=i>=3?58:i>=2?40:24;s+=`<rect x="20" y="96" width="12" height="80" rx="6" fill="none" stroke="var(--text2)"/><rect x="22" y="${176-tH}" width="8" height="${tH}" rx="4" fill="var(--koraal)"/>`;
  return SV("0 0 460 226",s,"Broeikaseffect: zonlicht in, warmtestraling uit, broeikasgassen houden warmte vast");
}
E.zet(T2,[16],{
  titel:"Het (versterkt) broeikaseffect",
  html:`<ul>
  <li>Zonlicht gaat door de atmosfeer en verwarmt het aardoppervlak. De warme aarde straalt <b>warmte</b> (infrarood) terug naar het heelal.</li>
  <li><b>Broeikasgassen</b>, zoals CO₂, methaan en waterdamp, houden een deel van die warmte vast. Dat <b>natuurlijke broeikaseffect</b> maakt de aarde leefbaar.</li>
  <li>Door de verbranding van fossiele brandstoffen en door ontbossing komt er extra CO₂ in de lucht: het <b>versterkt broeikaseffect</b>. De aarde warmt op.</li>
  <li>Let op: het gat in de ozonlaag is een ander probleem. Dat gaat over uv-straling.</li></ul>`,
  anim:anim([
    "<b>Zonlicht</b> gaat door de atmosfeer en verwarmt het aardoppervlak.",
    "De warme aarde straalt <b>warmte</b> (infrarood) uit, terug richting heelal.",
    "<b>Broeikasgassen</b> (paars) houden een deel van die warmte vast. Dit natuurlijke broeikaseffect houdt de aarde gemiddeld rond 15 °C.",
    "Door verbranding van fossiele brandstoffen komt er extra CO₂ bij: het <b>versterkt broeikaseffect</b>. Er wordt meer warmte vastgehouden en de temperatuur stijgt."],broeiSvg),
  films:[F.aarde]
});
function kustSvg(i){
  const zee=i>=2?96:120,warm=i===1||i===3;
  let s=`<rect x="0" y="${zee}" width="480" height="${200-zee}" fill="${warm?"var(--koraal-soft)":"var(--teal)"}" opacity="${warm?.9:.22}"/><line x1="0" x2="480" y1="${zee}" y2="${zee}" stroke="var(--teal)" stroke-width="2"/>`;
  s+=`<path d="M0,200 L0,180 L240,160 L330,124 L480,90 L480,200z" fill="var(--area)"/>`;
  [[255,150],[290,138],[318,128]].forEach(([x,y])=>{const nat=y>zee;
    s+=`<g opacity="${i>=2&&nat?.45:1}"><path d="M${x-10},${y} L${x},${y-26} L${x+10},${y}" stroke="var(--koraal)" stroke-width="2" fill="none"/><line x1="${x}" y1="${y-26}" x2="${x}" y2="${y-40}" stroke="var(--text3)" stroke-width="3"/><circle cx="${x}" cy="${y-48}" r="13" fill="var(--groen)"/></g>`;});
  [[80,178],[130,173],[180,168]].forEach(([x,y])=>s+=`<path d="M${x},${y} l0,-14 m0,6 l-6,-6 m6,2 l6,-8" stroke="${warm?"var(--text3)":"var(--koraal)"}" stroke-width="2.4" fill="none" opacity="${warm?.5:1}"/>`);
  s+=TX(130,194,warm?"koraal en zeegras: te warm":"koraal, zeegras",{cls:"tick",st:warm?"fill:var(--koraal)":""})+TX(290,54,"mangroven",{cls:"tick"});
  s+=`<g opacity="${i===0?1:.35}"><path d="M40,30 L100,26 Q110,26 110,30 Q110,34 100,34 L40,30z M70,28 L58,12 L66,12 L84,27z M70,32 L58,48 L66,48 L84,33z M44,29 L38,20 L44,20 L52,28z" fill="var(--text2)"/><circle cx="28" cy="30" r="7" fill="var(--text3)" opacity=".5"/><circle cx="16" cy="28" r="5" fill="var(--text3)" opacity=".4"/>${TX(120,34,"CO₂",{cls:"lbl",a:"start"})}</g>`;
  if(i>=2)s+=A(450,122,450,100,"t",{w:2.4})+TX(440,116,"zeespiegel stijgt",{cls:"lbl",a:"end",st:"fill:var(--teal)"});
  const tH=i>=1?54:26;s+=`<rect x="440" y="16" width="12" height="64" rx="6" fill="none" stroke="var(--text2)"/><rect x="442" y="${80-tH}" width="8" height="${tH}" rx="4" fill="var(--koraal)"/>`;
  return SV("0 0 480 204",s,"Kust van Bonaire met koraal, zeegras en mangroven bij opwarming en zeespiegelstijging");
}
E.waarom(T2,16,anim([
  "Bij het vliegen wordt kerosine verbrand: er komt CO₂ vrij. Meer CO₂ → <b>versterkt broeikaseffect</b> → de aarde warmt op.",
  "Route 1: het <b>zeewater warmt op</b>. Soorten die dat niet verdragen, zoals koraal en sommige zeegrassen, gaan dood of verdwijnen.",
  "Route 2: landijs smelt en warm water zet uit: de <b>zeespiegel stijgt</b>. Mangroven en zeegrasvelden in ondiep water komen onder water of te diep te staan.",
  "Beide routes zijn goed. Voor het punt noem je een gevolg van het versterkt broeikaseffect én wat dat met de natuur van Bonaire doet. Alleen ‘het wordt warmer’ is niet genoeg."],kustSvg));

})();
/* ===== h3.js ===== */
(function(){
"use strict";
/* Opgave 3 in beide examens: havo26-1 Olifanten (16–21), havo26-2 Orka's (17–20) */
const X=EXSTOF, SV=X.svg;
const wrap=(s,max)=>`<div style="max-width:${max||520}px;margin:0 auto;padding:8px">${s}</div>`;
const mk=(id,kl)=>`<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10z" fill="${kl}"/></marker>`;
const PIJL=`<defs>${mk("h3pk","var(--text3)")}${mk("h3pg","var(--goud)")}${mk("h3pt","var(--teal)")}</defs>`;
const lijn=(x1,y1,x2,y2,on,dash)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${on?"var(--goud)":"var(--text3)"}" stroke-width="${on?2.6:1.4}" ${dash?'stroke-dasharray="4 3"':""} marker-end="url(#${on?"h3pg":"h3pk"})"/>`;
const doos=(x,y,w,h,t,on,sub)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${on?"var(--goud-soft)":"var(--surface)"}" stroke="${on?"var(--goud)":"var(--line2)"}" stroke-width="${on?2:1}"/>
  <text class="lbl" x="${x+w/2}" y="${y+(sub?h/2-2:h/2+4)}" text-anchor="middle">${t}</text>${sub?`<text class="tick" x="${x+w/2}" y="${y+h/2+13}" text-anchor="middle">${sub}</text>`:""}`;
/* simpele pseudo-random, zodat tekeningen elke keer gelijk zijn */
const rnd=s=>()=>{s=(s*9301+49297)%233280;return s/233280;};

/* ======================= havo26-1 · opgave 3 olifanten ======================= */

/* --- 16: absoluut en relatief --- */
/* twee jaren als staven: links absoluut aantal, rechts 100%-staven */
function staven(o){
  const {a,b,mode}=o; /* a,b = {jaar, tot, deel}; mode: 'tot'|'abs'|'rel' */
  let s="";
  const H=200,y0=230;
  if(mode==="tot"||mode==="abs"){
    const max=Math.max(a.tot,b.tot);
    [a,b].forEach((d,i)=>{const x=70+i*170,w=90;
      const ht=H*d.tot/max,hd=H*d.deel/max;
      s+=`<rect x="${x}" y="${y0-ht}" width="${w}" height="${ht}" fill="var(--surface)" stroke="var(--line2)"/>`;
      s+=`<rect x="${x}" y="${y0-hd}" width="${w}" height="${hd}" fill="${mode==="abs"?"var(--goud)":"var(--goud-soft)"}" stroke="var(--goud)"/>`;
      s+=`<text class="lbl" x="${x+w/2}" y="${y0+18}" text-anchor="middle">${d.jaar}</text>`;
      s+=`<text class="lblm" x="${x+w+6}" y="${y0-ht+4}">totaal ${d.tot}</text>`;
      s+=`<text class="lbl" x="${x+w+6}" y="${Math.min(y0-hd+4,y0-4)}" style="fill:var(--goud-text)">${d.deelTxt||d.deel}</text>`;});
    s+=`<line x1="50" y1="${y0}" x2="450" y2="${y0}" class="ax" stroke="var(--text2)"/>`;
    s+=`<text class="tick" x="50" y="20">${mode==="abs"?"absoluut: het echte aantal":"aantallen"}</text>`;
  }else{
    [a,b].forEach((d,i)=>{const x=70+i*170,w=90,p=d.pct/100;
      s+=`<rect x="${x}" y="${y0-H}" width="${w}" height="${H}" fill="var(--surface)" stroke="var(--line2)"/>`;
      s+=`<rect x="${x}" y="${y0-H*p}" width="${w}" height="${H*p}" fill="var(--teal-soft)" stroke="var(--teal)" stroke-width="2"/>`;
      s+=`<text class="lbl" x="${x+w/2}" y="${y0+18}" text-anchor="middle">${d.jaar}</text>`;
      s+=`<text class="lbl" x="${x+w+6}" y="${y0-H*p+4}" style="fill:var(--teal)">${d.pctTxt}</text>`;});
    s+=`<line x1="50" y1="${y0}" x2="450" y2="${y0}" stroke="var(--text2)"/><text class="tick" x="50" y="20">relatief: als deel van 100%</text>`;
  }
  return SV("0 0 470 255",s,"Staafdiagram absoluut en relatief");
}
X.zet("havo26-1",[16],{titel:"Absoluut en relatief: aantallen en percentages",
  html:`<p><b>Absoluut</b> is het echte aantal: 40 kikkers, 235 bomen. <b>Relatief</b> is een deel van het geheel, meestal als <b>percentage</b>.</p>
  <ul><li>Van percentage naar aantal: <b>aantal = percentage × totaal / 100</b>.</li>
  <li>Van aantal naar percentage: <b>percentage = deel / totaal × 100%</b>.</li></ul>
  <p>Een aantal kan dalen terwijl het percentage stijgt. Dat gebeurt als het <b>totaal</b> nog sneller daalt dan het deel. Vergelijk dus altijd eerst: gaat de vraag over aantallen of over percentages?</p>`,
  anim(box){const A={jaar:2015,tot:400,deel:40},B={jaar:2020,tot:100,deel:30};
    X.stappen(box,[
      {mode:"tot",cap:"Een voorbeeld: in een vijver leven in 2015 <b>400</b> kikkers, waarvan <b>10%</b> een afwijkend pootje heeft. In 2020 zijn er nog maar <b>100</b> kikkers, waarvan <b>30</b> met een afwijking."},
      {mode:"abs",cap:"Reken eerst om naar een aantal: 10 × 400 / 100 = <b>40</b> kikkers in 2015. In 2020 zijn het er 30. <b>Absoluut</b> is het aantal dus gedaald."},
      {mode:"rel",cap:"Reken nu om naar een percentage: 30 / 100 × 100% = <b>30%</b> in 2020, tegen 10% in 2015. <b>Relatief</b> is het aandeel gestegen."},
      {mode:"rel",cap:"Hoe kan dat? Het <b>totaal</b> daalde veel sterker (400 → 100) dan het aantal met een afwijking (40 → 30). Daardoor wordt het deel van het geheel groter."}],
      (st,s)=>st.innerHTML=wrap(staven({a:{...A,pct:10,pctTxt:"10%"},b:{...B,pct:30,pctTxt:"30%"},mode:s.mode})));}
});
X.waarom("havo26-1",16,box=>{
  const A={jaar:1977,tot:1271,deel:235,pct:18.5,pctTxt:"18,5%"},B={jaar:2000,tot:121,deel:61,pct:50.4,pctTxt:"50,4%"};
  X.stappen(box,[
    {mode:"tot",cap:"De gegevens: 1977 <b>1271</b> vrouwtjes, waarvan 18,5% slagtandloos. 2000 nog <b>121</b> vrouwtjes, waarvan <b>61</b> slagtandloos. Je mist het aantal in 1977 en het percentage in 2000."},
    {mode:"abs",cap:"Aantal in 1977: 18,5 × 1271 / 100 = <b>235</b> vrouwtjes. In 2000 waren het er 61. Het <b>aantal</b> is dus lager (235 → 61)."},
    {mode:"rel",cap:"Percentage in 2000: 61 / 121 × 100% = <b>50,4%</b>. In 1977 was dat 18,5%. Het <b>percentage</b> is dus hoger."},
    {mode:"rel",cap:"Stropers schoten vooral olifanten <b>mét</b> slagtanden. Het totaal daalde daardoor veel sterker dan het aantal slagtandloze vrouwtjes, dus hun aandeel groeide."}],
    (st,s)=>st.innerHTML=wrap(staven({a:A,b:B,mode:s.mode})));
});

/* --- 17: onderzoekscyclus --- */
const CYC=[["onderzoeksvraag","wat wil je weten?"],["hypothese","een mogelijk antwoord"],["voorspelling","wat verwacht je dan te zien?"],["onderzoek","meten, waarnemen, rekenen"],["resultaat","wat je echt vindt"],["conclusie","hypothese ondersteund of verworpen"]];
function cyclusSVG(on){
  let s=PIJL;const pos=[[20,20],[180,20],[340,20],[340,120],[180,120],[20,120]];
  CYC.forEach(([t,sub],i)=>{const [x,y]=pos[i];s+=doos(x,y,140,52,t,i===on,sub);});
  s+=lijn(160,46,178,46,on===1)+lijn(320,46,338,46,on===2)+lijn(410,72,410,118,on===3)+lijn(340,146,322,146,on===4)+lijn(180,146,162,146,on===5);
  s+=`<path d="M90,174 C90,200 250,200 250,74" fill="none" stroke="var(--text3)" stroke-dasharray="4 3" marker-end="url(#h3pk)"/><text class="tick" x="110" y="200">verworpen? nieuwe hypothese</text>`;
  return SV("0 0 500 210",s,"De onderzoekscyclus");
}
X.zet("havo26-1",[17],{titel:"Onderzoeksvraag, hypothese en resultaat",
  html:`<p>Een onderzoek begint met een <b>onderzoeksvraag</b>. Daarna bedenk je een <b>hypothese</b>: een mogelijk antwoord op die vraag, dat je nog gaat toetsen. Er kunnen meerdere hypothesen naast elkaar bestaan.</p>
  <p>Je herkent een hypothese aan woorden als <i>zou kunnen</i>, <i>mogelijk</i>, <i>ik verwacht dat</i>. Het <b>resultaat</b> is wat je echt gemeten of gevonden hebt (<i>bleek</i>, <i>toonde aan</i>). In de <b>conclusie</b> zeg je of het resultaat een hypothese ondersteunt of niet.</p>`,
  anim(box){X.stappen(box,[
    {on:0,cap:"<b>Onderzoeksvraag</b>: ‘Groeit tuinkers sneller bij meer licht?’"},
    {on:1,cap:"<b>Hypothese</b>: ‘Tuinkers zou sneller kunnen groeien bij meer licht.’ Nog niet bewezen: het is een verwachting."},
    {on:3,cap:"<b>Onderzoek</b>: je zet bakjes tuinkers bij verschillende hoeveelheden licht en meet de lengte. Alles behalve het licht houd je gelijk."},
    {on:4,cap:"<b>Resultaat</b>: wat je vindt, bijvoorbeeld ‘bij meer licht bleken de plantjes langer’."},
    {on:5,cap:"<b>Conclusie</b>: het resultaat ondersteunt de hypothese. Klopt het niet, dan verwerp je de hypothese en bedenk je een nieuwe."}],
    (st,s)=>st.innerHTML=wrap(cyclusSVG(s.on)));},
  films:[["Onderzoek doen in de biologie","films/cellen/onderzoek-doen/index.html"]]
});
X.waarom("havo26-1",17,box=>{
  const R=[["1","Campbell-Staton vroeg zich af wat de oorzaak was van de relatieve"],["2","toename van het aantal slagtandloze vrouwtjes. Het zou een toevallig"],["3","gevolg kunnen zijn van de afname van de populatie. Het zou echter ook"],["4","een gevolg kunnen zijn van evolutie. Met kansberekening toonde hij aan"],["5","dat er sprake was van selectievoordeel van een bepaalde erfelijke"],["6","eigenschap."]];
  /* per stap: welke regels (1-based) oplichten en in welke kleur */
  const S=[
    {hl:{},cap:"De zes regels uit de tekst. Zoek per zin wat hij is: vraag, hypothese of resultaat."},
    {hl:{1:"var(--surface2)",2:"var(--surface2)"},lab:"onderzoeksvraag",cap:"Regel 1–2: ‘vroeg zich af wat de oorzaak was’. Dat is de <b>onderzoeksvraag</b>."},
    {hl:{2:"var(--koraal-soft)",3:"var(--koraal-soft)"},lab:"hypothese 1: toeval",cap:"Regel 2–3: ‘Het zou een toevallig gevolg kunnen zijn …’. <b>Hypothese 1</b>: toeval."},
    {hl:{3:"var(--teal-soft)",4:"var(--teal-soft)"},lab:"hypothese 2: evolutie",cap:"Regel 3–4: ‘Het zou echter ook een gevolg kunnen zijn van evolutie.’ <b>Hypothese 2</b>: evolutie."},
    {hl:{4:"var(--goud-soft)",5:"var(--goud-soft)",6:"var(--goud-soft)"},lab:"resultaat",cap:"Regel 4–6: ‘toonde hij aan … selectievoordeel’. Dat is het <b>resultaat</b>, geen hypothese."},
    {hl:{3:"var(--teal-soft)",4:"var(--teal-soft)"},lab:"ondersteund",cap:"Selectievoordeel van een erfelijke eigenschap is evolutie. Het resultaat ondersteunt dus hypothese 2, in <b>regel 3 en 4</b>: antwoord <b>C</b>."}];
  X.stappen(box,S,(st,s)=>{
    st.innerHTML=`<div style="padding:14px 16px;font-size:15px;line-height:1.7">`+R.map(([n,t])=>`<div style="display:flex;gap:12px;border-radius:6px;padding:0 6px;background:${s.hl[n]||"transparent"}"><span style="color:var(--text3);font-family:var(--meta);min-width:1em">${n}</span><span>${t}</span></div>`).join("")+
      (s.lab?`<div style="margin-top:8px;font:600 12px var(--meta);letter-spacing:.08em;text-transform:uppercase;color:var(--goud-text)">${s.lab}</div>`:"")+`</div>`;});
});

/* --- 18: X-chromosomale overerving --- */
function chrom(x,y,soort,al,on){
  const h=soort==="X"?56:30;const kl=soort==="X"?"var(--paars)":"var(--teal)";
  return `<rect x="${x-3}" y="${y+(56-h)}" width="22" height="${h}" rx="10" fill="${on?"var(--goud-soft)":"var(--surface)"}" stroke="${on?"var(--goud)":kl}" stroke-width="${on?2.6:2}"/>
  <text class="tick" x="${x+8}" y="${y+70}" text-anchor="middle">${soort}</text>${al?`<text class="lbl" x="${x+8}" y="${y+(56-h)+18}" text-anchor="middle" style="font-size:11px">${al}</text>`:""}`;
}
function xySVG(st){
  let s=PIJL;
  s+=`<text class="lblm" x="60" y="18" text-anchor="middle">moeder</text><text class="lblm" x="360" y="18" text-anchor="middle">vader</text>`;
  s+=chrom(38,28,"X","A",false)+chrom(70,28,"X","a",false);
  s+=chrom(338,28,"X","A",st===1||st===3)+chrom(366,28,"Y","",st===2);
  if(st>=1){s+=`<text class="lbl" x="92" y="226" text-anchor="end">dochter</text>`+chrom(98,190,"X",st>=3?"A/a":"?",false)+chrom(126,190,"X","A",st===1||st===3);
    s+=lijn(360,104,150,186,st===1||st===3);}
  if(st>=2){s+=`<text class="lbl" x="272" y="226" text-anchor="end">zoon</text>`+chrom(278,190,"X",st>=3?"A/a":"?",false)+chrom(306,190,"Y","",st===2);
    s+=lijn(374,104,318,186,st===2);s+=lijn(60,104,290,186,false,true);}
  s+=lijn(60,104,110,186,false,true);
  return SV("0 0 420 270",s,"Overerving van X- en Y-chromosomen");
}
X.zet("havo26-1",[18],{titel:"X-chromosomale overerving",
  html:`<p>Sommige genen liggen op het <b>X-chromosoom</b>. Het Y-chromosoom is veel kleiner en heeft die genen niet. Zo’n eigenschap erft <b>X-chromosomaal</b> (geslachtsgebonden) over.</p>
  <ul><li>Een vrouwtje is <b>XX</b>: ze heeft twee allelen, bijvoorbeeld X<sup>A</sup>X<sup>a</sup>.</li>
  <li>Een mannetje is <b>XY</b>: hij heeft maar één allel, bijvoorbeeld X<sup>a</sup>Y. Een recessief allel komt bij hem dus altijd tot uiting.</li>
  <li>Een <b>dochter</b> krijgt altijd het X van haar vader, een <b>zoon</b> altijd het Y van zijn vader. Welke van de twee X’en van de moeder een kind krijgt, is toeval.</li></ul>
  <p>Voorbeeld bij mensen: rood-groen kleurenblindheid (recessief, op het X-chromosoom) komt veel vaker voor bij mannen.</p>`,
  anim(box){X.stappen(box,[
    {st:0,cap:"De geslachtschromosomen van de ouders. De moeder heeft twee X’en, de vader een X en een Y. Op het Y-chromosoom ligt dit gen niet."},
    {st:1,cap:"Een <b>dochter</b> krijgt van haar vader zijn <b>X</b> (en dus zijn allel), en van haar moeder één van de twee X’en."},
    {st:2,cap:"Een <b>zoon</b> krijgt van zijn vader het <b>Y</b>. Zijn enige X komt dus altijd van zijn moeder."},
    {st:3,cap:"Wat vast ligt, komt van de vader. Welke X van de moeder het wordt, is toeval. Maak daarom bij een vraag eerst de genotypen van de ouders, en dan het kruisingsschema."}],
    (st,s)=>st.innerHTML=wrap(xySVG(s.st),460));},
  films:[["Overerving via X-chromosomen en mitochondriën","films/erfelijkheid/5-overerving-via-x-chromosomen-en-mitochondrien.html"],["Stambomen en kansrekenen","films/erfelijkheid/6-stambomen-en-kansrekenen.html"]]
});

/* --- 19: letale allelen --- */
function letaalSVG(st){
  const x0=150,y0=50,cw=120,ch=56;let g="";
  g+=`<text class="lblm" x="${x0+cw}" y="20" text-anchor="middle">vader Aa (geel)</text><text class="lbl" x="${x0+cw/2}" y="${y0-10}" text-anchor="middle">A</text><text class="lbl" x="${x0+cw*1.5}" y="${y0-10}" text-anchor="middle">a</text>`;
  g+=`<text class="lblm" x="14" y="${y0+ch}">moeder</text><text class="lblm" x="14" y="${y0+ch+16}">Aa (geel)</text><text class="lbl" x="${x0-14}" y="${y0+ch/2+5}" text-anchor="end">A</text><text class="lbl" x="${x0-14}" y="${y0+ch*1.5+5}" text-anchor="end">a</text>`;
  const C=[["AA","sterft","dood"],["Aa","geel"],["Aa","geel"],["aa","grijs"]];
  C.forEach(([gt,lab,d],i)=>{const x=x0+(i%2)*cw,y=y0+Math.floor(i/2)*ch;const dead=d&&st>=1;
    g+=`<rect x="${x}" y="${y}" width="${cw}" height="${ch}" fill="${dead?"var(--koraal-soft)":"var(--surface)"}" stroke="var(--line2)"/>
    <text class="lbl" x="${x+cw/2}" y="${y+25}" text-anchor="middle" style="${dead?"opacity:.45":""}">${gt}</text><text class="tick" x="${x+cw/2}" y="${y+42}" text-anchor="middle">${dead?"sterft als embryo":lab==="sterft"?"geel":lab}</text>`;
    if(dead)g+=`<line x1="${x+10}" y1="${y+8}" x2="${x+cw-10}" y2="${y+ch-8}" stroke="var(--koraal)" stroke-width="3"/><line x1="${x+cw-10}" y1="${y+8}" x2="${x+10}" y2="${y+ch-8}" stroke="var(--koraal)" stroke-width="3"/>`;});
  g+=`<text class="lbl" x="${x0+cw}" y="${y0+2*ch+28}" text-anchor="middle" style="fill:var(--goud-text)">${st===0?"verwacht: 3 geel : 1 grijs":st===1?"één van de vier valt weg":"tel opnieuw: alleen de geboren jongen"}</text>`;
  return SV("0 0 430 210",g,"Kruising met een letaal allel");
}
X.zet("havo26-1",[19],{titel:"Letale allelen",
  html:`<p>Een allel is <b>letaal</b> als individuen met een bepaald genotype niet levensvatbaar zijn: ze sterven al als embryo en worden dus niet geboren. Dat verandert de verhouding tussen de nakomelingen die je wél ziet.</p>
  <p>Bekend voorbeeld: bij muizen is het allel voor <b>gele vacht</b> (A) dominant, maar homozygoot <b>AA</b> is letaal. Twee gele muizen (Aa × Aa) geven daardoor níét de verwachte 3 : 1.</p>
  <p>Werkwijze: maak eerst het gewone kruisingsschema, streep dan de genotypen weg die niet geboren worden en tel opnieuw.</p>`,
  anim(box){X.stappen(box,[
    {st:0,cap:"Twee gele muizen, allebei <b>Aa</b>. Het gewone kruisingsschema geeft 1 AA : 2 Aa : 1 aa, dus je verwacht 3 geel : 1 grijs."},
    {st:1,cap:"Maar <b>AA</b> is letaal: die embryo’s sterven. Dat vakje valt weg."},
    {st:2,cap:"Er blijven drie vakjes over: twee keer Aa (geel) en één keer aa (grijs). Tel zelf: welke verhouding geel : grijs zie je bij de geboren jongen?"}],
    (st,s)=>st.innerHTML=wrap(letaalSVG(s.st),470));},
  films:[["Voorbij dominant en recessief","films/erfelijkheid/3-voorbij-dominant-en-recessief.html"]]
});

/* --- 20: genenpool, flessenhals, inteelt --- */
const KL=["var(--goud)","var(--teal)","var(--koraal)","var(--groen)","var(--paars)","var(--text2)"];
function popSVG(o){
  /* o.groot / o.klein: arrays van kleur-indexen; o.weg: kleurindex die sterft; o.titel */
  const vak=(x,lijst,titel,weg,leeg)=>{let s=`<rect x="${x}" y="24" width="210" height="170" rx="12" fill="var(--surface)" stroke="var(--line2)"/><text class="lblm" x="${x+105}" y="16" text-anchor="middle">${titel}</text>`;
    const r=rnd(lijst.length*7+x);lijst.forEach((k,i)=>{const cx=x+16+(i%9)*22+r()*4,cy=42+Math.floor(i/9)*24+r()*4;const dood=weg!==undefined&&k!==weg;
      s+=`<circle cx="${cx}" cy="${cy}" r="8" fill="${KL[k]}" opacity="${dood?.15:1}" stroke="${dood?"none":"var(--surface)"}"/>`;});
    if(leeg)s+=`<text class="lbl" x="${x+105}" y="186" text-anchor="middle" style="fill:var(--koraal)">${leeg}</text>`;return s;};
  let s="";if(o.a)s+=vak(10,o.a.l,o.a.t,o.weg,o.a.n);if(o.b)s+=vak(250,o.b.l,o.b.t,o.weg,o.b.n);
  return SV("0 0 470 200",s,"Populaties met verschillende allelen");
}
const GROOT=Array.from({length:54},(_,i)=>i%6);
const NA=[0,0,1,0,1,1,0,0];
const NA_GROEI=Array.from({length:45},(_,i)=>[0,1,0,0,1][i%5]);
X.zet("havo26-1",[20],{titel:"Genenpool, genetische variatie en inteelt",
  html:`<p>De <b>genenpool</b> is het geheel van alle allelen in een populatie. Hoe meer verschillende allelen, hoe groter de <b>genetische variatie</b>. Nieuwe variatie ontstaat door <b>mutaties</b> en door recombinatie bij de voortplanting.</p>
  <ul><li><b>Natuurlijke selectie</b> kan alleen ‘kiezen’ uit de variatie die er al is: individuen met gunstige erfelijke eigenschappen overleven en planten zich vaker voort.</li>
  <li>Als een populatie ineens heel klein wordt (een <b>flessenhals</b>), blijft er door toeval maar een deel van de allelen over. De genenpool wordt kleiner, ook als de populatie daarna weer groeit.</li>
  <li>In een kleine populatie zijn dieren vaker familie van elkaar. Paren verwanten met elkaar, dan heet dat <b>inteelt</b>: de kans dat een nakomeling twee dezelfde (recessieve) allelen krijgt, wordt groter.</li></ul>`,
  anim(box){X.stappen(box,[
    {o:{a:{l:GROOT,t:"grote populatie"}},cap:"Elke stip is een individu, de kleur staat voor een allel. In een grote populatie komen veel verschillende allelen voor: een grote <b>genenpool</b>."},
    {o:{a:{l:GROOT,t:"grote populatie"},b:{l:NA,t:"na een flessenhals"}},cap:"Door jacht, ziekte of een ramp blijven er maar een paar dieren over. Welke allelen overblijven, is <b>toeval</b>. Hier zijn er nog maar twee kleuren."},
    {o:{a:{l:GROOT,t:"grote populatie"},b:{l:NA_GROEI,t:"weer gegroeid"}},cap:"De populatie groeit weer, maar de verloren allelen komen niet vanzelf terug: de <b>genetische variatie</b> blijft klein. Ook zijn veel dieren nu familie van elkaar, dus is er meer kans op <b>inteelt</b>."}],
    (st,s)=>st.innerHTML=wrap(popSVG(s.o)));},
  films:[["Toeval en uitwisseling","films/evolutie/5-toeval-en-uitwisseling.html"],["De mens als selectiefactor","films/evolutie/4-de-mens-als-selectiefactor.html"]]
});
X.waarom("havo26-1",20,box=>{
  const G=GROOT,K=NA_GROEI;
  X.stappen(box,[
    {o:{a:{l:G,t:"grote genenpool"},b:{l:K,t:"kleine genenpool"}},cap:"Twee populaties: links veel verschillende allelen, rechts maar een paar."},
    {o:{a:{l:G,t:"grote genenpool"},b:{l:K,t:"kleine genenpool"}},cap:"Het milieu verandert, bijvoorbeeld door een nieuwe ziekte. Stel dat alleen dieren met het <b>rode</b> allel ertegen bestand zijn."},
    {o:{a:{l:G,t:"grote genenpool",n:"een deel overleeft"},b:{l:K,t:"kleine genenpool",n:"niemand overleeft"},weg:2},cap:"Links zijn er dieren met het rode allel: die overleven en planten zich voort. Rechts komt dat allel niet voor: de populatie kan zich <b>niet aanpassen</b> en sterft uit."},
    {o:{b:{l:K,t:"kleine genenpool"}},cap:"Een tweede goede verklaring: in een kleine populatie paren vaak verwanten (<b>inteelt</b>). Daardoor komen schadelijke recessieve allelen vaker homozygoot voor: meer <b>erfelijke ziekten</b>. Eén van de twee verklaringen is genoeg voor het punt."}],
    (st,s)=>st.innerHTML=wrap(popSVG(s.o)));
});

/* --- 21: biodiversiteit en successie --- */
function boom(x,y,s,k){return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-3" y="-4" width="6" height="22" fill="var(--text3)"/><circle cx="0" cy="-16" r="18" fill="${k||"var(--groen)"}" opacity=".85"/></g>`;}
function struik(x,y,s,k){return `<g transform="translate(${x},${y}) scale(${s||1})"><ellipse cx="0" cy="-8" rx="16" ry="11" fill="${k||"var(--groen)"}" opacity=".75"/></g>`;}
function kruid(x,y,k){return `<g transform="translate(${x},${y})"><line x1="0" y1="0" x2="0" y2="-14" stroke="var(--groen)" stroke-width="1.5"/><circle cx="0" cy="-16" r="3.5" fill="${k}"/></g>`;}
const BL=["var(--goud)","var(--koraal)","var(--paars)","var(--teal)"];
function successieSVG(st){
  let s=`<line x1="10" y1="170" x2="460" y2="170" stroke="var(--text3)"/>`;
  const lab=["kale grond","pioniers: grassen, kruiden","struiken en jonge bomen","bos (climaxstadium)"];
  const fase=[
    ()=>`<path d="M30,170 Q120,164 220,170" fill="none" stroke="var(--text3)" stroke-width="3"/>`,
    ()=>{let t="";for(let i=0;i<14;i++)t+=kruid(30+i*14,170,BL[i%4]);return t;},
    ()=>{let t="";for(let i=0;i<6;i++)t+=kruid(30+i*30,170,BL[i%4]);t+=struik(60,170)+struik(130,170,1.2,"var(--teal)")+boom(190,162,.7);return t;},
    ()=>boom(50,150,1.4)+boom(110,150,1.5)+boom(170,150,1.4)+`<rect x="20" y="160" width="190" height="10" fill="var(--text3)" opacity=".25"/>`];
  s+=`<g>${fase[st]()}</g>`;
  s+=`<text class="lbl" x="120" y="194" text-anchor="middle">${lab[st]}</text>`;
  /* soortenaantal grafiekje rechts */
  const P=[[0,6],[1,46],[2,70],[3,52]];const X0=270,Y0=150,W=170,HH=110;
  s+=`<line x1="${X0}" y1="${Y0}" x2="${X0+W}" y2="${Y0}" stroke="var(--text2)"/><line x1="${X0}" y1="${Y0}" x2="${X0}" y2="${Y0-HH}" stroke="var(--text2)"/>
    <text class="tick" x="${X0}" y="${Y0-HH-8}">aantal soorten</text><text class="tick" x="${X0+W}" y="${Y0+14}" text-anchor="end">tijd →</text>`;
  const pts=P.slice(0,st+1).map(([i,v])=>`${X0+10+i*50},${Y0-v*HH/80}`);
  s+=`<polyline points="${pts.join(" ")}" fill="none" stroke="var(--goud)" stroke-width="2.6"/>`+pts.map(p=>{const [a,b]=p.split(",");return `<circle cx="${a}" cy="${b}" r="4" fill="var(--goud)"/>`;}).join("");
  return SV("0 0 470 205",s,"Successie en het aantal soorten");
}
X.zet("havo26-1",[21],{titel:"Biodiversiteit, concurrentie en successie",
  html:`<p><b>Biodiversiteit</b> is de verscheidenheid aan leven. Je kunt kijken naar verschillen in genen binnen een soort, het <b>aantal soorten</b> in een gebied, en het aantal verschillende ecosystemen.</p>
  <ul><li>Planten <b>concurreren</b> om licht, water, mineralen en ruimte. In een dichtbegroeid gebied winnen vaak een paar soorten die het meeste licht wegvangen.</li>
  <li><b>Successie</b>: op kale grond vestigen zich eerst <b>pioniersoorten</b>. Die veranderen de plek (schaduw, humus), waardoor andere soorten kansen krijgen. Zo volgen stadia elkaar op tot een stabiel <b>climaxstadium</b>.</li>
  <li>Een <b>verstoring</b> (storm, brand, grazers) zet een stukje successie terug.</li></ul>`,
  anim(box){X.stappen(box,[
    {st:0,cap:"Kale grond, bijvoorbeeld na een brand. Er groeit nog bijna niets."},
    {st:1,cap:"<b>Pioniersoorten</b> vestigen zich: grassen en kruiden die veel licht nodig hebben en snel groeien."},
    {st:2,cap:"Struiken en jonge bomen komen erbij. Er is nog licht én schaduw, dus veel verschillende soorten kunnen er leven."},
    {st:3,cap:"Een gesloten bos: de bomen vangen het meeste licht weg. Soorten die veel licht nodig hebben, verdwijnen door <b>concurrentie</b>. Het aantal soorten neemt weer wat af."}],
    (st,s)=>st.innerHTML=wrap(successieSVG(s.st)));},
  films:[["Alles gaat rond","films/ecologie/alles-gaat-rond/index.html"],["Binnen de grenzen","films/ecologie/5-binnen-de-grenzen.html"]]
});
function bosSVG(st){
  let s=`<defs><linearGradient id="h3licht" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--goud)" stop-opacity=".55"/><stop offset="1" stop-color="var(--goud)" stop-opacity="0"/></linearGradient></defs>
    <line x1="10" y1="180" x2="460" y2="180" stroke="var(--text3)"/>`;
  const zon=`<circle cx="235" cy="16" r="10" fill="var(--goud)"/>`;s+=zon;
  if(st>=2)s+=`<polygon points="200,26 270,26 300,180 170,180" fill="url(#h3licht)"/>`;
  const xs=[30,70,110,150,190,235,280,320,360,400,440];
  xs.forEach((x,i)=>{const open=st>=1&&(x===190||x===235||x===280);
    if(open){if(i===5&&st===1)s+=`<g transform="rotate(-70 ${x} 178)">${struik(x,178,1.4)}</g>`;return;}
    s+=struik(x,180,1.5)+(i%3===0?boom(x+10,150,1.1):"");});
  if(st===1)s+=`<text class="lbl" x="235" y="120" text-anchor="middle">olifant rukt struiken uit</text>`;
  if(st>=1){s+=`<path d="M190,180 Q235,172 280,180" fill="none" stroke="var(--text3)" stroke-width="3" stroke-dasharray="3 3"/>`;}
  if(st>=3){for(let i=0;i<7;i++)s+=kruid(200+i*12,180,BL[i%4]);}
  if(st>=4){s+=`<rect x="250" y="168" width="50" height="9" rx="4" fill="var(--text3)" transform="rotate(-6 275 172)"/>`;
    for(let i=0;i<5;i++)s+=`<circle cx="${256+i*9}" cy="${164+(i%2)*3}" r="2.2" fill="var(--koraal)"/>`;}
  const lab=["dichtbegroeid bos: weinig licht op de bodem","er komt een open plek","meer licht op de bodem","nieuwe plantensoorten kiemen","dood hout trekt afbrekers aan"];
  s+=`<text class="lblm" x="235" y="198" text-anchor="middle">${lab[st]}</text>`;
  return SV("0 0 470 205",s,"Open plek in een dicht bos");
}
X.waarom("havo26-1",21,box=>{
  X.stappen(box,[
    {st:0,cap:"Een dichtbegroeid bos: een paar soorten struiken houden het licht en de ruimte voor zichzelf. Andere soorten verliezen de <b>concurrentie</b>."},
    {st:1,cap:"Een olifant rukt struiken uit de grond. Er ontstaat een <b>open plek</b> met kale, omgewoelde grond."},
    {st:2,cap:"Op die plek valt nu <b>meer licht op de bodem</b> en er is <b>ruimte</b>."},
    {st:3,cap:"Zaden van <b>andere soorten</b> kunnen kiemen en groeien, ook soorten die veel licht nodig hebben."},
    {st:4,cap:"Het dode hout trekt organismen aan die het afbreken. Elk van deze routes geeft kansen aan andere soorten: zo neemt het <b>aantal soorten</b> toe."}],
    (st,s)=>st.innerHTML=wrap(bosSVG(s.st)));
});

/* ======================= havo26-2 · opgave 3 orka's ======================= */

/* --- 17: producenten en ecologische relaties --- */
const REL=[["predatie","rover eet prooi","+","−"],["concurrentie","zelfde voedsel of ruimte","−","−"],["parasitisme","parasiet leeft van gastheer","+","−"],["mutualisme","beide hebben voordeel","+","+"],["commensalisme","de een voordeel, de ander merkt niets","+","0"]];
function relSVG(on){
  let s=`<text class="tick" x="14" y="18">relatie</text><text class="tick" x="330" y="18" text-anchor="middle">soort 1</text><text class="tick" x="400" y="18" text-anchor="middle">soort 2</text>`;
  REL.forEach(([n,u,a,b],i)=>{const y=28+i*40,h=i===on;
    s+=`<rect x="6" y="${y}" width="438" height="34" rx="8" fill="${h?"var(--goud-soft)":"var(--surface)"}" stroke="${h?"var(--goud)":"var(--line2)"}"/>
    <text class="lbl" x="18" y="${y+15}">${n}</text><text class="tick" x="18" y="${y+28}">${u}</text>`;
    [a,b].forEach((t,j)=>s+=`<text x="${330+j*70}" y="${y+23}" text-anchor="middle" style="font:700 18px var(--meta);fill:${t==="+"?"var(--groen)":t==="−"?"var(--koraal)":"var(--text3)"}">${t}</text>`);});
  return SV("0 0 450 232",s,"Ecologische relaties met plus en min");
}
X.zet("havo26-2",[17],{titel:"Producenten en ecologische relaties",
  html:`<p><b>Producenten</b> maken met <b>fotosynthese</b> zelf organische stof uit koolstofdioxide en water: groene planten en algen (ook <b>fytoplankton</b>). Alle andere organismen in een voedselweb zijn <b>consumenten</b>: ze eten andere organismen.</p>
  <p>Tussen twee soorten bestaan verschillende <b>ecologische relaties</b>. Je herkent ze aan wie er voordeel (+) of nadeel (−) van heeft. Kijk in een voedselweb goed wie wat eet.</p>`,
  anim(box){box.append(EXSTOF.el("div",{},wrap(relSVG(-1),480)));},
  films:[["Plek genoeg?","films/ecologie/plek-genoeg/index.html"],["Alles gaat rond","films/ecologie/alles-gaat-rond/index.html"]]
});
const MW={algen:[220,190],zoo:[220,130],walvis:[110,50],inkt:[330,50]},MN={algen:"algen",zoo:"zoöplankton",walvis:"kleine walvissen",inkt:"inktvissen"};
function miniWeb(st){
  let s=PIJL;const on=k=>(st===0&&k==="algen")||(st===1&&(k==="zoo"||k==="algen"))||(st>=2&&k!=="algen"&&st!==4)||(st===4&&(k==="walvis"||k==="inkt"));
  const P=[["algen","zoo",st===1],["zoo","walvis",st===2||st===3],["zoo","inkt",st===2||st===3]];
  P.forEach(([a,b,h])=>{const [x1,y1]=MW[a],[x2,y2]=MW[b];s+=lijn(x1+(x2-x1)*.2,y1-14+(y2-y1)*0,x2-(x2-x1)*.1,y2+14,h);});
  Object.keys(MW).forEach(k=>{const [x,y]=MW[k];s+=doos(x-62,y-14,124,28,MN[k],on(k));});
  if(st===0)s+=`<text class="lbl" x="220" y="225" text-anchor="middle" style="fill:var(--goud-text)">producent: fotosynthese</text>`;
  if(st>=3){s+=`<line x1="175" y1="50" x2="265" y2="50" stroke="var(--koraal)" stroke-width="2" stroke-dasharray="5 4"/><text class="lbl" x="220" y="24" text-anchor="middle" style="fill:var(--koraal)">${st===3?"eten elkaar niet":"concurrentie (− / −)"}</text>`;}
  return SV("0 0 440 235",s,"Deel van het voedselweb van de orka");
}
X.waarom("havo26-2",17,box=>{
  X.stappen(box,[
    {st:0,cap:"Zoek het organisme dat niets eet, omdat het met fotosynthese zelf organische stof maakt: de <b>algen</b>. Dat zijn de producenten."},
    {st:1,cap:"Zoöplankton eet algen. Het is dus een consument, geen producent."},
    {st:2,cap:"Kleine walvissoorten én inktvissen eten allebei <b>zoöplankton</b>."},
    {st:3,cap:"Ze eten elkaar niet: er loopt geen pijl tussen die twee. Het is dus geen predatie."},
    {st:4,cap:"Twee soorten die dezelfde voedselbron gebruiken, hebben er allebei nadeel van: <b>concurrentie</b> (ook goed: competitie)."}],
    (st,s)=>st.innerHTML=wrap(miniWeb(s.st),460));
});

/* --- 18: ordes van consumenten --- */
const LW={gras:[220,200],konijn:[110,140],sprink:[330,140],merel:[330,80],vos:[220,24]};
const LN={gras:"gras",konijn:"konijn",sprink:"sprinkhaan",merel:"merel",vos:"vos"};
function landWeb(o){
  let s=PIJL;const k=o.keten||[];const inK=(a,b)=>{const i=k.indexOf(a);return i>=0&&k[i+1]===b;};
  [["gras","konijn"],["gras","sprink"],["sprink","merel"],["konijn","vos"],["merel","vos"]].forEach(([a,b])=>{const [x1,y1]=LW[a],[x2,y2]=LW[b];
    const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy);s+=lijn(x1+dx/L*24,y1+dy/L*16,x2-dx/L*30,y2-dy/L*18,inK(a,b));});
  Object.keys(LW).forEach(n=>{const [x,y]=LW[n];s+=doos(x-50,y-13,100,26,LN[n],k.includes(n));
    if(o.orde&&o.orde[n]!==undefined)s+=`<text x="${x+56}" y="${y+4}" class="lbl" style="fill:var(--goud-text)">${o.orde[n]}</text>`;});
  return SV("0 0 440 220",s,"Voedselweb op het land");
}
X.zet("havo26-2",[18],{titel:"Voedselketen, voedselweb en ordes van consumenten",
  html:`<p>Een <b>voedselketen</b> begint altijd bij een <b>producent</b>. Een pijl wijst van wat gegeten wordt naar de eter. Alle ketens in een gebied samen vormen een <b>voedselweb</b>.</p>
  <ul><li>Wie een producent eet, is <b>consument van de 1e orde</b> (herbivoor).</li>
  <li>Wie een consument van de 1e orde eet, is consument van de <b>2e orde</b>, enzovoort: tel de stappen vanaf de producent.</li>
  <li>Eet een dier verschillende prooien, dan kan het in verschillende ketens een <b>andere orde</b> hebben. Loop daarom elke keten apart na.</li></ul>`,
  anim(box){X.stappen(box,[
    {o:{},cap:"Een voedselweb op het land. Elke pijl wijst van prooi naar eter."},
    {o:{keten:["gras","konijn","vos"],orde:{gras:"P",konijn:"1e",vos:"2e"}},cap:"Keten 1: gras (producent) → konijn (1e orde) → vos. Hier is de vos consument van de <b>2e orde</b>."},
    {o:{keten:["gras","sprink","merel","vos"],orde:{gras:"P",sprink:"1e",merel:"2e",vos:"3e"}},cap:"Keten 2: gras → sprinkhaan (1e) → merel (2e) → vos. Nu is de vos consument van de <b>3e orde</b>."},
    {o:{orde:{gras:"P",konijn:"1e",sprink:"1e",merel:"2e",vos:"2e en 3e"}},cap:"De vos is dus consument van de 2e én de 3e orde. Een orde die in geen enkele keten voorkomt, telt niet mee."}],
    (st,s)=>st.innerHTML=wrap(landWeb(s.o),460));},
  films:[["Alles gaat rond","films/ecologie/alles-gaat-rond/index.html"]]
});

/* --- 19: evolutionaire stamboom lezen --- */
/* ((wolf,hond),vos),kat */
function stamSVG(st){
  const Y={wolf:40,hond:90,vos:140,kat:190},on=c=>`stroke="${c?"var(--goud)":"var(--text)"}" stroke-width="${c?3:1.6}"`;
  const n1=st===2||st===3,n2=st===3&&false,n3=st===1;
  let s="";
  /* knoop A (wolf+hond) x=260, B (+vos) x=170, C (+kat) x=80 */
  const kant=st===4;
  const yW=kant?Y.hond:Y.wolf,yH=kant?Y.wolf:Y.hond;
  s+=`<line x1="260" y1="${Y.wolf}" x2="260" y2="${Y.hond}" ${on(n1)}/><line x1="260" y1="${yW}" x2="380" y2="${yW}" ${on(n1)}/><line x1="260" y1="${yH}" x2="380" y2="${yH}" ${on(n1)}/>`;
  const yA=(Y.wolf+Y.hond)/2;
  s+=`<line x1="170" y1="${yA}" x2="170" y2="${Y.vos}" ${on(n2)}/><line x1="170" y1="${yA}" x2="260" y2="${yA}" ${on(n2)}/><line x1="170" y1="${Y.vos}" x2="380" y2="${Y.vos}" ${on(n2)}/>`;
  const yB=(yA+Y.vos)/2;
  s+=`<line x1="80" y1="${yB}" x2="80" y2="${Y.kat}" ${on(n3)}/><line x1="80" y1="${yB}" x2="170" y2="${yB}" ${on(n3)}/><line x1="80" y1="${Y.kat}" x2="380" y2="${Y.kat}" ${on(n3)}/><line x1="30" y1="${(yB+Y.kat)/2}" x2="80" y2="${(yB+Y.kat)/2}" ${on(false)}/>`;
  if(st===1)s+=`<circle cx="80" cy="${(yB+Y.kat)/2}" r="7" fill="var(--goud)"/><text class="lblm" x="88" y="${(yB+Y.kat)/2+22}">gemeenschappelijke voorouder van alle vier</text>`;
  if(st===2||st===3)s+=`<circle cx="260" cy="${yA}" r="7" fill="var(--goud)"/>`;
  if(st===4)s+=`<circle cx="260" cy="${yA}" r="7" fill="none" stroke="var(--goud)" stroke-width="2"/><path d="M240,48 A26,26 0 0 1 240,82" fill="none" stroke="var(--goud)" stroke-width="2" marker-end="url(#h3pg)"/>`;
  const nm={wolf:kant?"hond":"wolf",hond:kant?"wolf":"hond",vos:"vos",kat:"kat"};
  Object.keys(Y).forEach(k=>{const hl=(st===0)||((st===2||st===3)&&(nm[k]==="wolf"||nm[k]==="hond"));
    s+=`<circle cx="386" cy="${Y[k]}" r="5" fill="${hl?"var(--goud)":"var(--text)"}"/><text x="398" y="${Y[k]+4}" class="${hl?"lbl":"lblm"}">${nm[k]}</text>`;});
  s+=`<text class="tick" x="30" y="226">verleden</text><text class="tick" x="380" y="226" text-anchor="end">nu</text><line x1="80" y1="216" x2="370" y2="216" stroke="var(--text3)" marker-end="url(#h3pk)"/>`;
  return SV("0 0 470 236",PIJL+s,"Stamboom van wolf, hond, vos en kat");
}
X.zet("havo26-2",[19],{titel:"Een evolutionaire stamboom lezen",
  html:`<p>Een <b>evolutionaire stamboom</b> laat zien hoe soorten aan elkaar verwant zijn. De tijd loopt van de wortel (verleden) naar de uiteinden (nu).</p>
  <ul><li>De uiteinden zijn de <b>soorten die nu leven</b>.</li>
  <li>Elke splitsing (knooppunt) staat voor een <b>gemeenschappelijke voorouder</b>.</li>
  <li>Hoe <b>recenter</b> de gemeenschappelijke voorouder van twee soorten, hoe <b>nauwer verwant</b> ze zijn. Bij een stamboom op basis van DNA betekent dat ook: hoe meer hun DNA overeenkomt.</li>
  <li>De volgorde van de namen onder elkaar zegt niets: je kunt takken om een knooppunt draaien zonder dat de verwantschap verandert.</li></ul>`,
  anim(box){X.stappen(box,[
    {st:0,cap:"De uiteinden: vier soorten die nu leven."},
    {st:1,cap:"Volg de lijnen naar links. Waar ze samenkomen, zit een <b>gemeenschappelijke voorouder</b>. Bij de wortel: de voorouder van alle vier."},
    {st:2,cap:"Wolf en hond komen het <b>meest recent</b> samen. Ze zijn het nauwst verwant, en hun DNA lijkt het meest op elkaar."},
    {st:3,cap:"De vos komt pas eerder in de tijd samen met wolf en hond. De vos is dus even nauw verwant aan de wolf als aan de hond."},
    {st:4,cap:"Draai je wolf en hond om, dan verandert er niets aan de verwantschap. Kijk dus naar de knooppunten, niet naar wie dicht onder wie staat."}],
    (st,s)=>st.innerHTML=wrap(stamSVG(s.st),480));},
  films:[["Stambomen lezen","films/evolutie/8-stambomen-lezen.html"]]
});

/* --- 20: functie van gedrag, verwantschap --- */
function familieSVG(st){
  let s=PIJL;
  const P={oma:[90,50],moe:[240,50],kl1:[180,150],kl2:[300,150]};
  const lab={oma:"oma",moe:"dochter",kl1:"kleinkind",kl2:"kleinkind"};
  if(st>=1)s+=lijn(124,50,206,50,st===1)+`<text class="lbl" x="165" y="40" text-anchor="middle" style="fill:var(--goud-text)">½</text>`;
  if(st>=2){s+=lijn(232,68,190,130,st===2)+lijn(248,68,292,130,st===2)+`<text class="lbl" x="240" y="206" text-anchor="middle" style="fill:var(--goud-text)">elk kleinkind: ¼</text>`;}
  if(st>=3)s+=`<path d="M90,74 C90,180 140,200 168,166" fill="none" stroke="var(--teal)" stroke-width="2.4" stroke-dasharray="5 4" marker-end="url(#h3pt)"/><text class="lblm" x="8" y="118">hulp: kennis,</text><text class="lblm" x="8" y="132">voedsel, bescherming</text>`;
  Object.keys(P).forEach(k=>{const [x,y]=P[k];s+=`<circle cx="${x}" cy="${y}" r="26" fill="${k==="oma"?"var(--surface2)":"var(--surface)"}" stroke="${k==="oma"&&st>=3?"var(--teal)":"var(--line2)"}" stroke-width="${k==="oma"&&st>=3?2.4:1}"/><text class="lbl" x="${x}" y="${y+4}" text-anchor="middle" style="font-size:11px">${lab[k]}</text>`;});
  return SV("0 0 380 215",s,"Verwantschap tussen oma, dochter en kleinkinderen");
}
X.zet("havo26-2",[20],{titel:"Gedrag: functie en overlevingskans",
  html:`<p>Bij gedrag kun je vragen naar de <b>oorzaak</b> (welke prikkel of motivatie zet het gedrag in gang?) en naar de <b>functie</b>: hoe vergroot dit gedrag de kans om te overleven en nakomelingen te krijgen?</p>
  <ul><li>Dieren met een lang leven kunnen veel <b>leren</b> uit ervaring.</li>
  <li>Een dier dat zelf geen jongen meer krijgt, kan toch zijn genen helpen doorgeven door <b>verwanten</b> te helpen: een dochter heeft de helft van de genen van haar moeder, een kleinkind een kwart. Dat heet <b>verwantschapsselectie</b>.</li>
  <li>Een goede functie-uitleg is een redenering: gedrag → gevolg voor de groep → grotere overlevingskans.</li></ul>`,
  anim(box){X.stappen(box,[
    {st:0,cap:"Een oma, haar dochter en twee kleinkinderen."},
    {st:1,cap:"Van elk gen van oma heeft haar dochter met kans <b>½</b> hetzelfde exemplaar."},
    {st:2,cap:"Bij een kleinkind is die kans <b>¼</b>."},
    {st:3,cap:"Helpt oma haar kleinkinderen te overleven, dan helpt ze ook een deel van haar eigen genen verder, al krijgt ze zelf geen jongen meer: <b>verwantschapsselectie</b>."}],
    (st,s)=>st.innerHTML=wrap(familieSVG(s.st),420));},
  films:[["Waarom helpen dieren elkaar?","films/gedrag/10-helpen.html"],["Waarom doet een dier wat het doet?","films/gedrag/1-waarom-doet-een-dier-wat-het-doet.html"]]
});

})();
/* ===== h4.js ===== */
(function(){
"use strict";
/* Opgave 4 in beide examens: havo26-1 Plantenveredeling (22–28), havo26-2 Kiezen voor vegan (21–29) */
const X=EXSTOF, SV=X.svg;
const W=(s,m)=>`<div style="max-width:${m||540}px;margin:0 auto;padding:8px">${s}</div>`;
/* pijl met eigen punt (geen markers, dus geen dubbele id's) */
function P(x1,y1,x2,y2,c,w,dash){c=c||"var(--text2)";w=w||2;
  const a=Math.atan2(y2-y1,x2-x1),h=9,p=t=>`${(x2-h*Math.cos(a+t)).toFixed(1)},${(y2-h*Math.sin(a+t)).toFixed(1)}`;
  const xe=x2-5*Math.cos(a),ye=y2-5*Math.sin(a);
  return `<line x1="${x1}" y1="${y1}" x2="${xe.toFixed(1)}" y2="${ye.toFixed(1)}" stroke="${c}" stroke-width="${w}"${dash?' stroke-dasharray="5 4"':""}/><path d="M${x2},${y2} L${p(-.42)} L${p(.42)}Z" fill="${c}"/>`;}
/* vak met tekst, regels gescheiden door | */
function B(x,y,w,h,t,o){o=o||{};const c=o.c||"var(--line2)",f=o.f||"var(--surface)",sw=o.sw||1.6,cls=o.cls||"lbl";
  const r=t.split("|"),lh=15,y0=y+h/2-(r.length-1)*lh/2+4;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="${f}" stroke="${c}" stroke-width="${sw}"/>`+
    r.map((s,i)=>`<text class="${i?"lblm":cls}" x="${x+w/2}" y="${y0+i*lh}" text-anchor="middle">${s}</text>`).join("");}
const T=(x,y,t,cls,anc,st)=>`<text class="${cls||"lblm"}" x="${x}" y="${y}"${anc?` text-anchor="${anc}"`:""}${st?` style="${st}"`:""}>${t}</text>`;
const G=(on,s)=>on?s:"";
const KRUIS=(x,y,r)=>`<path d="M${x-r},${y-r} L${x+r},${y+r} M${x+r},${y-r} L${x-r},${y+r}" stroke="var(--koraal)" stroke-width="3" stroke-linecap="round"/>`;
const VINK=(x,y)=>`<path d="M${x-7},${y} l5,6 l10,-12" fill="none" stroke="var(--groen)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
const plantje=(x,y,h,c)=>`<path d="M${x},${y} V${y-h}" stroke="${c||"var(--groen)"}" stroke-width="2.4"/><ellipse cx="${x-7}" cy="${y-h*.55}" rx="7" ry="3.5" fill="${c||"var(--groen)"}" transform="rotate(-25 ${x-7} ${y-h*.55})"/><ellipse cx="${x+7}" cy="${y-h*.8}" rx="7" ry="3.5" fill="${c||"var(--groen)"}" transform="rotate(25 ${x+7} ${y-h*.8})"/>`;
const golf=(x0,x1,y,a,ph)=>{let d=`M${x0},${y+a*Math.sin(ph||0)}`;for(let x=x0+4;x<=x1;x+=4)d+=` L${x},${(y+a*Math.sin((x-x0)/9+(ph||0))).toFixed(1)}`;return d;};
const anim=(steps,teken,m)=>box=>X.stappen(box,steps,(st,s,i)=>st.innerHTML=W(teken(i,s),m));

/* ============================ havo26-1 · opgave 4 ============================ */

/* --- 22 + 25: stikstofkringloop --- */
function stikstofSVG(k){
  const nw=n=>k===n?"var(--goud)":"var(--text2)";
  let s=`<rect x="0" y="120" width="540" height="180" fill="var(--oker)" opacity=".10"/><line x1="0" y1="120" x2="540" y2="120" stroke="var(--text3)" stroke-width="1.5"/>`+
    T(530,20,"lucht","tick","end")+T(530,140,"bodem","tick","end");
  s+=B(190,14,150,34,"stikstofgas N₂",{c:"var(--teal)"});
  s+=B(20,58,140,42,"plant|eiwitten en DNA",{c:"var(--groen)"})+`<path d="M90,100 V120 M90,120 l-10,14 M90,120 l10,16 M90,120 v18" stroke="var(--groen)" stroke-width="2" fill="none"/>`;
  s+=B(370,160,140,40,"nitraat NO₃⁻",{c:"var(--goud)"});
  s+=P(370,170,162,90,nw(0))+T(286,112,"opname door de wortels","lblm","middle");
  if(k>=1){s+=B(20,236,120,42,"dode resten|en mest",{c:"var(--text3)"})+B(200,236,140,42,"ammonium NH₄⁺",{c:"var(--goud)"});
    s+=P(50,100,50,234,nw(1))+T(56,196,"afsterven, mest")+P(140,257,198,257,nw(1))+T(170,230,"afbraak","lblm","middle")+T(170,294,"door reducenten","tick","middle");}
  if(k>=2)s+=P(340,246,398,202,nw(2))+T(372,236,"nitrificatie");
  if(k>=3)s+=P(262,48,262,234,nw(3))+T(270,212,"stikstofbinding");
  if(k>=4)s+=P(470,160,342,34,nw(4))+T(420,84,"denitrificatie");
  return SV("0 0 540 300",s,"Stikstofkringloop: lucht, plant, bodem, ammonium en nitraat");
}
X.zet("havo26-1",[22,25],{titel:"Stikstofkringloop: stikstof in en uit de bodem",
  html:`<p>Planten hebben <b>stikstof</b> nodig voor eiwitten en DNA. Ze nemen het op als <b>mineralen</b> uit de bodem: <b>nitraat</b> (NO₃⁻) en <b>ammonium</b> (NH₄⁺). Stikstofgas (N₂) uit de lucht kunnen planten zelf niet gebruiken.</p>
  <ul><li><b>Reducenten</b> breken dode resten en mest af. Daarbij komt ammonium vrij.</li>
  <li><b>Nitrificerende bacteriën</b> zetten ammonium om in nitraat.</li>
  <li><b>Stikstofbindende bacteriën</b> zetten N₂ uit de lucht om in ammonium.</li>
  <li><b>Denitrificerende bacteriën</b> zetten nitraat om in N₂, vooral in natte bodem zonder zuurstof.</li></ul>`,
  anim:anim([{cap:"Stikstof zit vooral in de lucht als <b>N₂</b>. Planten nemen stikstof alleen op als <b>nitraat</b> of ammonium uit de bodem."},
    {cap:"Planten sterven af of worden gegeten, en dieren maken mest. <b>Reducenten</b> breken die resten af: er komt <b>ammonium</b> vrij."},
    {cap:"<b>Nitrificerende bacteriën</b> maken van ammonium weer nitraat. De kringloop is rond."},
    {cap:"<b>Stikstofbindende bacteriën</b> halen N₂ uit de lucht en maken er ammonium van."},
    {cap:"<b>Denitrificerende bacteriën</b> maken van nitraat weer N₂."}],stikstofSVG),
  films:[["Alles gaat rond","films/ecologie/alles-gaat-rond/index.html"]]});

function bodem22(k){
  const dots=[18,14,10,6,6][k];let s=`<rect x="0" y="120" width="540" height="160" fill="var(--oker)" opacity=".10"/><line x1="0" y1="120" x2="540" y2="120" stroke="var(--text3)" stroke-width="1.5"/>`;
  s+=`<rect x="190" y="138" width="180" height="70" rx="12" fill="var(--surface)" stroke="var(--goud)" stroke-width="2"/>`+T(280,226,"mineralen in de bodem","lbl","middle");
  for(let i=0;i<dots;i++)s+=`<circle cx="${206+(i%9)*19}" cy="${156+Math.floor(i/9)*20+(i%2)*6}" r="5" fill="var(--goud)"/>`;
  s+=P(480,62,372,150,"var(--text3)",2,true)+T(480,52,"(kunst)mest","lblm","middle");
  if(k===4)s+=KRUIS(428,104,12);
  s+=plantje(140,120,52);
  if(k>=1)s+=P(220,208,150,262,"var(--koraal)",2.4)+T(20,272,"uitspoeling → grondwater","lblm","start","fill:var(--koraal)");
  if(k>=2)s+=P(320,138,320,36,"var(--koraal)",2.4)+T(328,34,"lucht: N₂")+T(312,92,"denitrificatie","lblm","end","fill:var(--koraal)");
  if(k>=3)s+=P(200,146,148,104,"var(--koraal)",2.4)+T(166,138,"opname","lblm","end","fill:var(--koraal)")+P(128,66,40,30,"var(--koraal)",2.4)+T(20,22,"oogst: afgevoerd","lblm","start","fill:var(--koraal)");
  return SV("0 0 540 280",s,"Bodem met mineralen en de processen die ze afvoeren");
}
X.waarom("havo26-1",22,anim([
  {cap:"Zie de bodem als een voorraad mineralen. Mest vult hem aan. Welke processen halen er mineralen uit?"},
  {cap:"<b>Uitspoeling</b>: nitraat lost op in regenwater en zakt weg naar het grondwater of de sloot."},
  {cap:"<b>Denitrificatie</b>: bacteriën zetten nitraat om in stikstofgas, dat de lucht in gaat. Ook <b>vervluchtiging</b> (ammoniak naar de lucht) telt."},
  {cap:"<b>Opname door planten</b>, en de boer <b>oogst</b> die planten en voert ze af. Ook vraat door dieren telt."},
  {cap:"Zonder kunstmest vult niemand de voorraad snel aan. Elk juist proces is 1 punt; noem er precies twee."}],bodem22));

X.waarom("havo26-1",25,anim([
  {cap:"Een erwtenplant met <b>wortelknolletjes</b>. Daarin leven knolletjesbacteriën."},
  {cap:"De bacteriën <b>binden stikstofgas (N₂)</b> uit de lucht (punt 1)."},
  {cap:"Ze zetten het om in <b>ammonium</b>: een stikstofverbinding die de plant kan opnemen en gebruiken voor eiwitten (punt 2)."},
  {cap:"De plant krijgt zo stikstof die anders uit mest moet komen. Sterft de erwt af, dan komt die stikstof ook in de bodem voor de andere gewassen. Dus: minder mest nodig."}],
  k=>{let s=`<rect x="0" y="110" width="540" height="150" fill="var(--oker)" opacity=".10"/><line x1="0" y1="110" x2="540" y2="110" stroke="var(--text3)" stroke-width="1.5"/>`;
    s+=B(330,14,150,34,"lucht: N₂ (78%)",{c:"var(--teal)"})+plantje(150,110,70);
    s+=`<path d="M150,110 C146,140 130,160 110,190 M150,110 C156,145 176,170 196,196 M150,110 V200" stroke="var(--groen)" stroke-width="2" fill="none"/>`;
    [[124,168],[184,180],[150,196],[140,148]].forEach(([x,y])=>s+=`<circle cx="${x}" cy="${y}" r="9" fill="var(--paars-soft)" stroke="var(--paars)" stroke-width="2"/>`);
    s+=T(214,214,"wortelknolletjes met bacteriën","lblm","start","fill:var(--paars)");
    if(k>=1)s+=P(400,48,196,172,"var(--goud)",2.6)+T(330,96,"N₂ wordt gebonden","lbl");
    if(k>=2)s+=B(250,150,150,40,"ammonium NH₄⁺",{c:"var(--goud)"})+P(250,166,160,140,"var(--groen)",2.6)+T(162,56,"→ eiwitten in de plant","lblm");
    if(k>=3)s+=B(380,220,150,34,"minder mest nodig",{c:"var(--groen)",f:"var(--groen-soft)"});
    return SV("0 0 540 260",s,"Knolletjesbacteriën binden stikstof voor de erwtenplant");}));

/* --- 23: biodiversiteit en plagen --- */
function webSVG(k){
  const N=(cx,cy,t,c,o)=>`<g${o?' opacity=".25"':""}>${B(cx-45,cy-13,90,26,t,{c:c||"var(--line2)"})}</g>`;
  let s=T(100,18,"eenvoudig voedselweb","tick","middle")+T(385,18,"soortenrijk voedselweb","tick","middle")+`<line x1="205" y1="10" x2="205" y2="240" stroke="var(--line2)"/>`;
  s+=N(100,215,"plant","var(--groen)")+P(100,202,100,155)+(k===1?B(50,112,100,44,"rups","var(--koraal)")+T(100,104,"× 10 !","lbl","middle","fill:var(--koraal)"):N(100,140,"rups"))+(k===1?"":P(100,127,100,80))+N(100,65,"mees","var(--teal)");
  if(k===1)s+=KRUIS(100,65,16);
  if(k>=2){const pl=[["gras",285],["klaver",385],["brandnetel",485]],he=[["rups",285],["bladluis",385],["kever",485]],ro=[["mees",285],["spin",385],["sluipwesp",485]];
    [[0,0],[1,0],[1,2],[2,1],[0,1],[2,2]].forEach(([a,b])=>s+=P(pl[a][1],202,he[b][1]+(a-b)*8,153,"var(--text3)",1.4));
    [[0,0],[2,0],[1,1],[0,2],[1,0],[2,1]].forEach(([a,b])=>s+=P(he[a][1],127,ro[b][1]+(a-b)*8,78,"var(--text3)",1.4));
    pl.forEach(([t,x])=>s+=N(x,215,t,"var(--groen)"));he.forEach(([t,x])=>s+=N(x,140,t));ro.forEach(([t,x])=>s+=N(x,65,t,"var(--teal)"));
    if(k===3)s+=KRUIS(285,65,16);}
  return SV("0 0 540 245",s,"Eenvoudig en soortenrijk voedselweb");
}
X.zet("havo26-1",[23],{titel:"Biodiversiteit, voedselwebben en plagen",
  html:`<p><b>Biodiversiteit</b> is de verscheidenheid aan soorten in een gebied.</p>
  <ul><li>In een soortenrijk ecosysteem is het <b>voedselweb</b> ingewikkeld. Verdwijnt een soort, dan nemen andere soorten zijn rol over: het ecosysteem is <b>stabieler</b>.</li>
  <li>De grootte van een populatie hangt af van <b>beperkende factoren</b>, zoals de hoeveelheid voedsel, ruimte en natuurlijke vijanden.</li>
  <li>Een <b>plaag</b> is een populatie die zo groot wordt dat ze schade doet. Bij <b>biologische bestrijding</b> zet je natuurlijke vijanden van de plaag in.</li></ul>`,
  anim:anim([{cap:"Een <b>eenvoudig voedselweb</b>: elke soort hangt af van maar één andere soort."},
    {cap:"Verdwijnt de mees, dan eet niemand de rupsen meer. Hun aantal schiet omhoog: een plaag."},
    {cap:"In een <b>soortenrijk voedselweb</b> zijn er meer voedselbronnen en meer natuurlijke vijanden."},
    {cap:"Valt hier de mees weg, dan worden de rupsen nog steeds gegeten door de sluipwesp. Zo'n ecosysteem is <b>stabieler</b>."}],webSVG),
  films:[["Ingrijpen of laten gaan?","films/ecologie/4-ingrijpen-of-laten-gaan.html"],["Plek genoeg?","films/ecologie/plek-genoeg/index.html"]]});

X.waarom("havo26-1",23,anim([
  {cap:"<b>Monocultuur</b>: overal hetzelfde gewas. Een insect dat van dit gewas leeft, landt op het veld."},
  {cap:"Het vindt overal voedsel en verspreidt zich makkelijk van plant naar plant. De kans op een plaag is groter: <b>uitspraak 1 juist</b>."},
  {cap:"<b>Strokenteelt</b>: verschillende gewassen naast elkaar. Meer voedsel en schuilplaatsen voor verschillende dieren, ook voor natuurlijke vijanden van het plaaginsect: <b>uitspraak 2 juist</b>. Dus D: zowel 1 als 2."}],
  k=>{let s=T(130,18,"monocultuur","lbl","middle")+T(400,18,"strokenteelt","lbl","middle");
    const cel=(x,y,v)=>v===0?`<circle cx="${x}" cy="${y}" r="7" fill="var(--groen-soft)" stroke="var(--groen)" stroke-width="1.6"/>`:v===1?`<path d="M${x},${y-8} L${x+8},${y+6} L${x-8},${y+6}Z" fill="none" stroke="var(--oker)" stroke-width="1.6"/>`:`<rect x="${x-6}" y="${y-6}" width="12" height="12" fill="none" stroke="var(--paars)" stroke-width="1.6"/>`;
    for(let r=0;r<6;r++)for(let c=0;c<8;c++){const x=32+c*28,y=44+r*28;s+=cel(x,y,0);
      const pl=k===0?(r===2&&c===1):k>=1&&((r*8+c)*7%10<6);if(pl)s+=`<circle cx="${x+5}" cy="${y-5}" r="3.6" fill="var(--koraal)"/>`;}
    if(k>=2){for(let r=0;r<6;r++)for(let c=0;c<8;c++){const x=302+c*28,y=44+r*28,v=Math.floor(c/2)%3;s+=cel(x,y,v);
        if(v===0&&c<2&&(r*3+c)%4===0)s+=`<circle cx="${x+5}" cy="${y-5}" r="3.6" fill="var(--koraal)"/>`;
        const z=(r*5+c*3)%7;if(z===1)s+=`<path d="M${x-12},${y+12} l4,-4 l4,4 l-4,4z" fill="var(--teal)"/>`;if(z===4)s+=`<circle cx="${x-12}" cy="${y+12}" r="3.4" fill="var(--paars)"/>`;if(z===6)s+=`<circle cx="${x+12}" cy="${y+12}" r="3.4" fill="var(--goud)"/>`;}}
    s+=`<circle cx="30" cy="222" r="4" fill="var(--koraal)"/>`+T(40,226,"plaaginsect","tick");
    if(k>=2)s+=`<path d="M300,226 l4,-4 l4,4 l-4,4z" fill="var(--teal)"/>`+T(312,226,"natuurlijke vijand","tick")+`<circle cx="430" cy="222" r="4" fill="var(--paars)"/><circle cx="442" cy="222" r="4" fill="var(--goud)"/>`+T(452,226,"andere dieren","tick");
    return SV("0 0 540 236",s,"Monocultuur en strokenteelt met plaaginsecten");}));

/* --- 24: experiment opzetten --- */
X.zet("havo26-1",[24],{titel:"Een experiment opzetten",
  html:`<p>Met een experiment test je of één factor invloed heeft op iets anders.</p>
  <ul><li>De <b>onafhankelijke variabele</b> is de factor die jij verandert of vergelijkt.</li>
  <li>De <b>afhankelijke variabele</b> is wat je meet.</li>
  <li>Alle andere factoren houd je <b>gelijk</b>. Dan weet je dat een verschil door die ene factor komt.</li>
  <li>Een <b>controlegroep</b> krijgt de behandeling niet. Die vergelijk je met de proefgroep.</li>
  <li>Neem genoeg <b>herhalingen</b> (meer planten, dieren of proefvelden), zodat toeval minder uitmaakt.</li></ul>
  <p>Voorbeeld: groeien planten beter met mest? Je vergelijkt planten met en zonder mest en meet na vier weken hun lengte.</p>`,
  anim:anim([{cap:"Twee groepen: <b>met mest</b> (proefgroep) en <b>zonder mest</b> (controlegroep). Mest is de onafhankelijke variabele."},
    {cap:"Alles anders houd je <b>gelijk</b>: dezelfde zaden, grond, hoeveelheid water, licht en temperatuur."},
    {cap:"Na vier weken <b>meet</b> je de lengte van elke plant: de afhankelijke variabele. Vijf potjes per groep zijn je herhalingen."},
    {cap:"Je vergelijkt de gemiddelden. Omdat de rest gelijk was, mag je het verschil aan de mest toeschrijven."}],
    k=>{let s="";const hA=[62,56,66,54,60],hB=[38,44,34,42,40];
      [["met mest","proefgroep",hA,30],["zonder mest","controlegroep",hB,128]].forEach(([n,g,h,y])=>{s+=T(14,y+56,n,"lbl")+T(14,y+72,g,"tick");
        for(let i=0;i<5;i++){const x=160+i*56;s+=`<path d="M${x-14},${y+70} L${x+14},${y+70} L${x+10},${y+92} L${x-10},${y+92}Z" fill="var(--oker)" opacity=".55"/>`;
          if(k>=2)s+=plantje(x,y+70,h[i]*.9);}
        if(k>=3)s+=T(430,y+66,`gem. ${Math.round(h.reduce((a,b)=>a+b)/5)} mm`,"lbl");});
      if(k>=1)s+=B(14,226,512,30,"gelijk:  zelfde zaad · grond · water · licht · temperatuur",{c:"var(--teal)",f:"var(--teal-soft)",cls:"lblm"});
      if(k===2)s+=`<line x1="400" y1="40" x2="400" y2="100" stroke="var(--goud)" stroke-width="2"/>`+T(406,56,"meet de","tick")+T(406,68,"lengte","tick");
      return SV("0 0 540 262",s,"Experiment met en zonder mest");}),
  films:[["Onderzoek doen in de biologie","films/cellen/onderzoek-doen/index.html"]]});

X.waarom("havo26-1",24,anim([
  {cap:"<b>Punt 1:</b> richt <b>twee groepen proefvelden</b> in. Groep A: een aantal jaar steeds hetzelfde gewas. Groep B: elk jaar een ander gewas (vruchtwisseling). Meerdere velden per groep."},
  {cap:"<b>Punt 2:</b> de <b>overige omstandigheden zijn gelijk</b>: dezelfde grondsoort, hetzelfde klimaat, dezelfde bemesting en bewerking."},
  {cap:"<b>Punt 3:</b> na een aantal jaar <b>bepaal je het aantal ziekteverwekkende bodemorganismen</b> in bodemmonsters van elk veld, en vergelijk je A met B."}],
  k=>{let s=T(130,18,"jaar 1 · 2 · 3","tick");const kl=["var(--oker)","var(--groen)","var(--paars)"];
    [["A","zelfde gewas",[0,0,0],34],["B","vruchtwisseling",[0,1,2],126]].forEach(([n,t,c,y])=>{s+=T(14,y+26,n,"lbl","start","font-size:18px")+T(14,y+44,t,"tick");
      for(let f=0;f<3;f++){const x=130+f*110;for(let j=0;j<3;j++)s+=`<rect x="${x+j*30}" y="${y}" width="30" height="56" fill="${kl[c[j]]}" opacity=".45"/>`;
        s+=`<rect x="${x}" y="${y}" width="90" height="56" fill="none" stroke="var(--text3)" stroke-width="1.4"/>`;}
      if(k>=2){s+=P(452,y+28,476,y+28,"var(--goud)",2)+`<rect x="480" y="${y+6}" width="22" height="44" rx="6" fill="var(--surface)" stroke="var(--goud)" stroke-width="2"/>`+T(491,y+33,"?","lbl","middle");}});
    s+=`<rect x="140" y="202" width="10" height="10" fill="var(--oker)" opacity=".45"/>`+T(154,211,"aardappel","tick")+`<rect x="230" y="202" width="10" height="10" fill="var(--groen)" opacity=".45"/>`+T(244,211,"graan","tick")+`<rect x="300" y="202" width="10" height="10" fill="var(--paars)" opacity=".45"/>`+T(314,211,"suikerbiet","tick");
    if(k>=1)s+=B(14,222,440,30,"gelijk:  grondsoort · klimaat · bemesting · bewerking",{c:"var(--teal)",f:"var(--teal-soft)",cls:"lblm"});
    if(k>=2)s+=T(491,220,"tel","tick","middle")+T(491,232,"ziekte-","tick","middle")+T(491,244,"verwekkers","tick","middle");
    return SV("0 0 540 258",s,"Opzet veldexperiment met twee groepen proefvelden");}));

/* --- 26: symbiose --- */
X.zet("havo26-1",[26],{titel:"Symbiose, en autotroof of heterotroof",
  html:`<p>Soorten die nauw samenleven, vormen een <b>symbiose</b>. Er zijn drie vormen, naar wie er voordeel (+) of nadeel (−) van heeft:</p>
  <ul><li><b>Mutualisme</b> (+/+): beide partners hebben voordeel.</li>
  <li><b>Commensalisme</b> (+/0): één partner heeft voordeel, de ander merkt er niets van.</li>
  <li><b>Parasitisme</b> (+/−): de parasiet heeft voordeel, ten koste van de gastheer.</li></ul>
  <p>Kijk ook naar wat de partners uitwisselen. <b>Autotrofe</b> organismen, zoals planten, maken met fotosynthese zelf <b>organische stoffen</b> (zoals glucose) uit <b>anorganische stoffen</b> (water, CO₂, mineralen). <b>Heterotrofe</b> organismen, zoals dieren, moeten organische stoffen opnemen.</p>`,
  anim:box=>{const rij=(y,n,a,b,ca,cb,vb)=>T(10,y+5,n,"lbl")+`<circle cx="170" cy="${y}" r="16" fill="var(--surface)" stroke="${ca}" stroke-width="2"/>`+T(170,y+6,a,"lbl","middle","font-size:17px;fill:"+ca)+`<circle cx="214" cy="${y}" r="16" fill="var(--surface)" stroke="${cb}" stroke-width="2"/>`+T(214,y+6,b,"lbl","middle","font-size:17px;fill:"+cb)+T(246,y+5,vb);
    box.innerHTML=W(SV("0 0 540 180",T(170,18,"A","tick","middle")+T(214,18,"B","tick","middle")+
      rij(46,"mutualisme","+","+","var(--groen)","var(--groen)","bij en bloem: nectar ↔ bestuiving")+
      rij(96,"commensalisme","+","0","var(--groen)","var(--text3)","zeepok op een walvis: gratis vervoer")+
      rij(146,"parasitisme","+","−","var(--groen)","var(--koraal)","lintworm in de darm: voedsel van de gastheer"),"Drie vormen van symbiose"));},
  films:[["Plek genoeg?","films/ecologie/plek-genoeg/index.html"]]});

X.waarom("havo26-1",26,anim([
  {cap:"Schimmeldraden groeien om en in de wortels, en reiken veel verder de bodem in dan de wortels zelf."},
  {cap:"De schimmel neemt <b>mineralen</b> op en geeft die door aan de plant. Voordeel voor de plant: <b>+</b>."},
  {cap:"De plant maakt met fotosynthese <b>organische stoffen</b> (glucose) en geeft daarvan een deel aan de schimmel. Een schimmel is heterotroof en kan dat zelf niet. Voordeel voor de schimmel: <b>+</b>."},
  {cap:"+/+ is <b>mutualisme</b>, en de schimmel krijgt <b>organische stoffen</b>: antwoord D."}],
  k=>{let s=`<rect x="0" y="110" width="540" height="150" fill="var(--oker)" opacity=".10"/><line x1="0" y1="110" x2="540" y2="110" stroke="var(--text3)" stroke-width="1.5"/>`;
    s+=`<circle cx="50" cy="34" r="14" fill="var(--goud)" opacity=".8"/>`+plantje(150,110,74)+`<ellipse cx="160" cy="44" rx="16" ry="7" fill="var(--groen)" transform="rotate(-20 160 44)"/>`;
    s+=`<path d="M150,110 C146,140 126,170 104,200 M150,110 C158,145 180,168 204,190 M150,110 V214" stroke="var(--groen)" stroke-width="2.6" fill="none"/>`;
    for(let i=0;i<9;i++){const y=130+i*10,x0=110+(i%3)*30;s+=`<path d="${golf(x0,x0+190+(i%4)*40,y,4,i)}" fill="none" stroke="var(--paars)" stroke-width="1.2" opacity=".85"/>`;}
    s+=T(530,252,"schimmeldraden","lblm","end","fill:var(--paars)");
    [[380,130],[420,160],[470,140],[440,200],[500,180],[360,190]].forEach(([x,y])=>s+=`<circle cx="${x}" cy="${y}" r="4" fill="var(--teal)"/>`);
    if(k>=1)s+=P(400,170,176,170,"var(--teal)",3)+T(200,236,"mineralen → plant","lbl","start","fill:var(--teal)")+T(250,28,"plant +","lbl","start","font-size:16px;fill:var(--groen)");
    if(k>=2)s+=`<path d="M168,52 C200,70 210,100 220,140" fill="none" stroke="var(--goud)" stroke-width="3"/>`+P(220,138,236,186,"var(--goud)",3)+T(226,92,"organische stoffen → schimmel","lbl","start","fill:var(--goud-text)")+T(250,48,"schimmel +","lbl","start","font-size:16px;fill:var(--groen)");
    if(k>=3)s+=B(380,14,150,40,"+/+ = mutualisme",{c:"var(--groen)",f:"var(--groen-soft)"});
    return SV("0 0 540 260",s,"Mycorrhiza: uitwisseling tussen plant en schimmel");}));

/* --- 27: van gen naar eiwit --- */
X.zet("havo26-1",[27],{titel:"Van gen naar eiwit",
  html:`<p>Een <b>gen</b> is een stukje DNA met de code voor één eiwit. Het DNA blijft in de <b>celkern</b>.</p>
  <ul><li><b>Transcriptie</b>: in de kern wordt van het gen een kopie gemaakt, het <b>mRNA</b>. DNA is een dubbele streng, RNA een enkele.</li>
  <li>Het mRNA gaat door een kernporie naar het cytoplasma.</li>
  <li><b>Translatie</b>: een <b>ribosoom</b> leest het mRNA af, steeds drie basen tegelijk (een codon), en koppelt de bijbehorende <b>aminozuren</b> aan elkaar.</li>
  <li>De keten aminozuren <b>vouwt</b> tot een eiwit met een eigen vorm. Die vorm bepaalt wat het eiwit doet, bijvoorbeeld als <b>receptor</b> waar precies één stof op past.</li></ul>`,
  anim:anim([{cap:"In de celkern ligt het <b>DNA</b>: een dubbele streng. Een gen is een stukje daarvan."},
    {cap:"<b>Transcriptie</b>: van het gen wordt een enkele streng <b>mRNA</b> gemaakt. Die verlaat de kern."},
    {cap:"<b>Translatie</b>: een <b>ribosoom</b> leest het mRNA af en koppelt aminozuren aan elkaar tot een keten."},
    {cap:"De keten <b>vouwt</b> tot een eiwit met een eigen vorm, bijvoorbeeld een enzym, een hormoon of een receptor."}],
    k=>{let s=`<rect x="6" y="6" width="528" height="208" rx="22" fill="none" stroke="var(--groen)" stroke-width="2.5"/>`+T(520,26,"cel","tick","end");
      s+=`<circle cx="120" cy="110" r="82" fill="var(--surface)" stroke="var(--text3)" stroke-width="2"/>`+T(120,48,"celkern","tick","middle");
      s+=`<path d="${golf(62,178,96,7,0)}" fill="none" stroke="var(--text2)" stroke-width="2.4"/><path d="${golf(62,178,106,7,Math.PI)}" fill="none" stroke="var(--text2)" stroke-width="2.4"/>`+T(120,80,"DNA","lbl","middle");
      if(k>=1)s+=`<rect x="196" y="122" width="12" height="16" fill="var(--surface2)"/><path d="${golf(110,300,130,5,1)}" fill="none" stroke="var(--goud)" stroke-width="2.6"/>`+T(250,156,"mRNA","lbl","middle","fill:var(--goud-text)");
      if(k>=2){s+=`<ellipse cx="320" cy="128" rx="22" ry="15" fill="var(--paars-soft)" stroke="var(--paars)" stroke-width="2"/>`+T(320,166,"ribosoom","lblm","middle");
        const kl=["var(--teal)","var(--koraal)","var(--groen)","var(--goud)","var(--paars)"];for(let i=0;i<5;i++)s+=`<circle cx="${334+i*12}" cy="${108-i*10}" r="6" fill="${kl[i]}"/>`;
        s+=T(400,64,"keten van aminozuren","lblm");}
      if(k>=3)s+=`<path d="M430,140 C410,120 440,100 460,116 C480,132 500,110 490,94 C480,78 450,86 456,104 C462,124 500,150 520,136" fill="none" stroke="var(--groen)" stroke-width="6" stroke-linecap="round"/>`+T(470,180,"gevouwen eiwit","lbl","middle")+T(470,196,"met een eigen vorm","lblm","middle");
      return SV("0 0 540 220",s,"Eiwitsynthese: DNA, mRNA, ribosoom, eiwit");}),
  films:[["Van DNA naar eiwit","films/dna/3-van-dna-naar-eiwit.html"]]});

/* nagetekende plantencel uit de tool (opgave 4, vraag 27) */
function plantcel27(){
  return SV("0 0 380 230",`
  <rect x="6" y="6" width="368" height="218" rx="26" fill="none" stroke="var(--groen)" stroke-width="4"/>
  <rect x="14" y="14" width="352" height="202" rx="20" fill="var(--surface)" stroke="var(--groen)" stroke-width="1.5"/>
  <text class="tick" x="352" y="34" text-anchor="end">plantencel</text>
  <circle cx="100" cy="90" r="62" fill="var(--surface2)" stroke="var(--text3)" stroke-width="2"/>
  <path d="M60,62 C70,52 80,72 90,62 C100,52 110,72 120,62 C130,52 140,72 148,62" fill="none" stroke="var(--teal)" stroke-width="2.4"/>
  <path d="M60,72 C70,82 80,62 90,72 C100,82 110,62 120,72 C130,82 140,62 148,72" fill="none" stroke="var(--teal)" stroke-width="2.4"/>
  <path d="M96,100 C106,94 116,108 126,100 C136,94 146,108 158,100 C176,92 186,104 206,86" fill="none" stroke="var(--oker)" stroke-width="1.8"/>
  <ellipse cx="232" cy="84" rx="16" ry="11" fill="var(--paars-soft,rgba(168,151,219,.14))" stroke="var(--paars)" stroke-width="1.8"/>
  <path d="M244,80 C252,70 262,74 260,84 C258,94 270,98 276,90 C282,80 292,84 292,94 C292,106 280,110 284,118 C288,126 300,122 304,114" fill="none" stroke="var(--koraal)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="48" y="162" width="132" height="32" rx="16" fill="var(--surface2)" stroke="var(--text2)" stroke-width="2"/><text class="lblm" x="114" y="182" text-anchor="middle">ziekteverwekker</text>
  <path d="M232,178 l10,-16 l10,16z M262,190 l10,-16 l10,16z M290,170 l10,-16 l10,16z M246,202 l10,-16 l10,16z" fill="var(--text2)"/>
  <g class="lbl" style="font-size:15px;fill:var(--goud-text)">
  <line x1="40" y1="62" x2="58" y2="66" stroke="var(--goud)" stroke-width="1.5"/><text x="28" y="66" style="fill:var(--goud-text)">P</text>
  <line x1="166" y1="112" x2="160" y2="102" stroke="var(--goud)" stroke-width="1.5"/><text x="166" y="126" style="fill:var(--goud-text)">Q</text>
  <line x1="318" y1="112" x2="306" y2="112" stroke="var(--goud)" stroke-width="1.5"/><text x="322" y="117" style="fill:var(--goud-text)">R</text>
  <line x1="328" y1="182" x2="312" y2="182" stroke="var(--goud)" stroke-width="1.5"/><text x="332" y="187" style="fill:var(--goud-text)">S</text></g>`,"Schematische plantencel met P, Q, R en S");
}
X.waarom("havo26-1",27,box=>{
  const base=plantcel27();
  const HL={P:[104,67,52,16],Q:[150,97,62,16],R:[274,98,38,32],S:[270,182,48,28]};
  X.stappen(box,[
    {l:"P",cap:"<b>P</b> ligt in de celkern en is een dubbele streng: <b>DNA</b>."},
    {l:"Q",cap:"<b>Q</b> is een enkele streng die van de kern naar het ribosoom loopt: <b>RNA</b>. Het is de kopie van het gen (transcriptie)."},
    {l:"R",cap:"Het ribosoom vertaalt het RNA in een eiwit. Het gevouwen eiwit <b>R</b> is de <b>receptor</b> van de plant, gecodeerd door een resistentiegen."},
    {l:"S",cap:"<b>S</b> zijn de kleine deeltjes die de ziekteverwekker de cel in brengt: de <b>effectoren</b>. Alle vier goed geeft 1 punt."}],
    (st,s)=>{const [cx,cy,rx,ry]=HL[s.l];st.innerHTML=W(base.replace(/<\/svg>\s*$/,`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="var(--goud)" stroke-width="3.5" stroke-dasharray="7 5"/></svg>`),460);});
});

/* --- 28: mutatie en eiwitvorm --- */
X.zet("havo26-1",[28],{titel:"Mutaties en de vorm van een eiwit",
  html:`<p>Een <b>mutatie</b> is een verandering in het DNA. Gebeurt dat in een gen, dan kan het eiwit veranderen.</p>
  <ul><li>Bij een <b>genmutatie</b> verandert de basenvolgorde: een base wordt vervangen, komt erbij of valt weg.</li>
  <li>Daardoor kan een codon voor een <b>ander aminozuur</b> coderen, of stopt de keten eerder.</li>
  <li>Een andere volgorde van aminozuren geeft vaak een andere <b>vouwing</b>, en dus een andere <b>ruimtelijke vorm</b>.</li>
  <li>Veel eiwitten werken doordat hun vorm precies <b>past</b> op een ander molecuul, zoals een sleutel in een slot: een enzym op zijn substraat, een hormoon op zijn receptor.</li>
  <li>Mutaties ontstaan toevallig. <b>Mutagene factoren</b>, zoals uv-straling en sommige chemicaliën, maken ze vaker.</li></ul>`,
  anim:anim([{cap:"Elk <b>codon</b> (drie basen) op het mRNA codeert voor één aminozuur."},
    {cap:"De volgorde van aminozuren bepaalt hoe het eiwit vouwt. Een ander molecuul past precies in de holte."},
    {cap:"Een <b>genmutatie</b>: één base is veranderd (G → C). Dit codon codeert nu voor een <b>ander aminozuur</b>."},
    {cap:"Het eiwit vouwt anders. De holte heeft een andere vorm, en het andere molecuul <b>past niet meer</b>."}],
    k=>{const mut=k>=2;let s=T(10,40,"mRNA","tick")+T(10,98,"eiwit","tick");
      const cod=["AUG",mut?"<tspan style='fill:var(--koraal)'>C</tspan>CU":"GCU","AAA","UGG"],am=["Met",mut?"Pro":"Ala","Lys","Trp"];
      cod.forEach((c,i)=>{const x=70+i*110;s+=`<rect x="${x}" y="18" width="90" height="32" rx="8" fill="var(--surface)" stroke="${mut&&i===1?"var(--koraal)":"var(--line2)"}" stroke-width="1.8"/><text class="lbl" x="${x+45}" y="39" text-anchor="middle" style="font:600 15px var(--meta)">${c}</text>`;
        s+=`<line x1="${x+45}" y1="52" x2="${x+45}" y2="78" stroke="var(--text3)" stroke-dasharray="3 3"/>`;});
      s+=`<line x1="115" y1="94" x2="445" y2="94" stroke="var(--text3)" stroke-width="3"/>`;
      am.forEach((a,i)=>{const x=115+i*110;s+=`<circle cx="${x}" cy="94" r="16" fill="${mut&&i===1?"var(--koraal-soft)":"var(--surface)"}" stroke="${mut&&i===1?"var(--koraal)":"var(--teal)"}" stroke-width="2"/>`+T(x,98,a,"lbl","middle","font-size:11px");});
      if(k===1||k===3){const vorm=k===1?"M150,160 L230,160 L250,188 L270,160 L350,160 L350,212 L150,212Z":"M150,160 L230,160 L250,142 L270,160 L350,160 L350,212 L150,212Z";
        s+=`<path d="${vorm}" fill="var(--groen-soft)" stroke="var(--groen)" stroke-width="2.4"/>`+T(250,204,"eiwit","lbl","middle");
        const dy=k===1?0:-34;s+=`<path d="M230,${150+dy} L270,${150+dy} L250,${178+dy}Z" fill="var(--goud)"/>`;
        s+=k===1?T(370,170,"past precies","lbl")+VINK(470,166):T(370,170,"past niet meer","lbl","start","fill:var(--koraal)")+KRUIS(486,166,9);}
      return SV("0 0 540 220",s,"Codons, aminozuren en de vorm van een eiwit");}),
  films:[["Mutaties","films/dna/5-mutaties.html"],["Van DNA naar eiwit","films/dna/3-van-dna-naar-eiwit.html"]]});

/* ============================ havo26-2 · opgave 4 ============================ */

/* --- 21: eiwitvertering --- */
X.zet("havo26-2",[21],{titel:"Vertering: enzymen knippen eiwitten",
  html:`<p>Bij <b>vertering</b> worden grote moleculen uit je voedsel in kleine stukjes geknipt, zodat ze door de darmwand in je bloed kunnen.</p>
  <ul><li>Dat knippen doen <b>enzymen</b>. Elk enzym is <b>specifiek</b>: het werkt op één soort stof. Zo knipt amylase zetmeel, lipase vet, en eiwitverterende enzymen knippen eiwitten.</li>
  <li>Een <b>eiwit</b> is een lange keten <b>aminozuren</b>. Het wordt in stappen geknipt: eiwit → kortere ketens (<b>peptiden</b>) → losse aminozuren.</li>
  <li>De enzymen zitten in <b>verteringssappen</b>. Die worden gemaakt door klieren en komen op een vaste plek bij de voedselbrij.</li>
  <li>Elk enzym heeft een <b>optimum</b>: een temperatuur en pH waarbij het het best werkt.</li></ul>
  <p>Zoek in je informatieboek op welk sap welke enzymen bevat, en waar het bij de voedselbrij komt.</p>`,
  anim:anim([{cap:"Een eiwit is een lange keten van <b>aminozuren</b>. Zo is hij te groot om door de darmwand te gaan."},
    {cap:"Eiwitverterende enzymen knippen de keten eerst in kortere stukken: <b>peptiden</b>."},
    {cap:"Andere enzymen knippen de peptiden verder tot <b>losse aminozuren</b>."},
    {cap:"Losse aminozuren zijn klein genoeg: ze worden door de darmwand opgenomen in het <b>bloed</b>."}],
    k=>{const kl=["var(--teal)","var(--koraal)","var(--groen)","var(--goud)","var(--paars)"];let s="";
      const cut=k===1?[4,8]:k>=2?[1,2,3,4,5,6,7,8,9,10,11]:[];
      let x=48,pos=[];for(let i=0;i<12;i++){if(cut.includes(i))x+=k===1?28:12;pos.push(x);x+=32;}
      const y=k===3?182:60;
      if(k===3)s+=`<rect x="0" y="96" width="540" height="34" fill="var(--koraal-soft)"/>`+T(10,90,"darmholte","tick")+T(10,118,"darmwand","tick")+`<rect x="0" y="150" width="540" height="64" fill="var(--teal-soft)"/>`+T(10,166,"bloed","tick");
      for(let i=0;i<11;i++)if(!cut.includes(i+1))s+=`<line x1="${pos[i]}" y1="${y}" x2="${pos[i+1]}" y2="${y}" stroke="var(--text3)" stroke-width="3"/>`;
      pos.forEach((p,i)=>s+=`<circle cx="${p}" cy="${y}" r="11" fill="${kl[i%5]}"/>`);
      if(k===1)[4,8].forEach(c=>s+=T((pos[c-1]+pos[c])/2,y-22,"✂","lbl","middle","font-size:18px;fill:var(--goud-text)"));
      if(k===3)pos.forEach(p=>s+=P(p,128,p,166,"var(--text3)",1.2));
      s+=T(270,k===3?236:112,["eiwit","peptiden","aminozuren","opname in het bloed"][k],"lbl","middle");
      return SV("0 0 540 "+(k===3?244:124),s,"Eiwit wordt geknipt tot aminozuren");}),
  films:[["Knippen op maat","films/voeding/3-knippen-op-maat.html"],["De reis door je buik","films/voeding/2-de-reis-door-je-buik.html"]]});

/* --- 22 + 23: aminozuren in je lichaam --- */
X.zet("havo26-2",[22,23],{titel:"Aminozuren in je lichaam",
  html:`<p>Eiwitten uit je voedsel worden verteerd tot <b>aminozuren</b>. Die gaan via de poortader eerst naar de <b>lever</b>.</p>
  <ul><li>Je cellen bouwen uit aminozuren hun eigen eiwitten (<b>assimilatie</b>). Er zijn ongeveer twintig soorten aminozuren.</li>
  <li>Een deel van de aminozuren heet <b>essentieel</b>: zoek in je informatieboek op welke dat zijn.</li>
  <li>Heb je meer aminozuren dan je nodig hebt, dan haalt de lever de <b>aminogroep</b> (met stikstof) eraf. Daarvan maakt de lever <b>ureum</b>, dat de nieren uitscheiden.</li>
  <li>Wat overblijft is een koolstofketen, die je lichaam verder gebruikt in de stofwisseling.</li></ul>`,
  anim:anim([{cap:"Na de vertering komen aminozuren via de poortader eerst bij de <b>lever</b>."},
    {cap:"Lichaamscellen bouwen er hun <b>eigen eiwitten</b> van: enzymen, spiereiwitten, antistoffen."},
    {cap:"Cellen maken uit aminozuren ook <b>andere stoffen</b>, zoals sommige hormonen."},
    {cap:"Een <b>overschot</b>: de lever haalt de aminogroep eraf en maakt daar <b>ureum</b> van. De nieren scheiden ureum uit met de urine."}],
    k=>{let s="";const kl=["var(--teal)","var(--koraal)","var(--groen)","var(--goud)"];
      for(let i=0;i<6;i++)s+=`<circle cx="${30+(i%3)*22}" cy="${108+Math.floor(i/3)*22}" r="8" fill="${kl[i%4]}"/>`;
      s+=T(52,160,"aminozuren","lblm","middle")+T(52,174,"uit de darm","lblm","middle")+P(100,120,150,120);
      s+=B(152,94,110,52,"lever",{c:"var(--paars)",f:"var(--paars-soft)"});
      if(k>=1)s+=P(262,110,322,48,k===1?"var(--goud)":undefined)+B(324,22,200,46,"lichaamscellen|bouwen eigen eiwitten",{c:"var(--groen)"});
      if(k>=2)s+=P(262,120,322,120,k===2?"var(--goud)":undefined)+B(324,97,200,46,"andere stoffen|bv. sommige hormonen",{c:"var(--teal)"});
      if(k>=3)s+=P(262,132,322,190,"var(--goud)")+B(324,170,200,46,"overschot: aminogroep eraf|→ ureum → nieren → urine",{c:"var(--koraal)"});
      return SV("0 0 540 230",s,"Wat de lever met aminozuren doet");}),
  films:[["De lever als fabriek","films/voeding/5-de-lever-als-fabriek.html"],["Wat zit er in je eten?","films/voeding/1-wat-zit-er-in-je-eten.html"]]});

X.waarom("havo26-2",22,anim([
  {n:1,cap:"<b>1 juist.</b> Na het verwijderen van de aminogroep wordt de rest van een aminozuur in de cellen aeroob afgebroken tot CO₂ en water. Daarbij komt <b>energie</b> vrij."},
  {n:2,cap:"<b>2 onjuist.</b> Insuline en glucagon uit de alvleesklier regelen het <b>glucosegehalte</b> van het bloed, niet de hoeveelheid aminozuren."},
  {n:3,cap:"<b>3 onjuist.</b> Je lichaam slaat glucose op als glycogeen en vet in vetweefsel, maar heeft <b>geen eiwitvoorraad</b>. Een overschot aan aminozuren wordt afgebroken."},
  {n:4,cap:"Juist · onjuist · onjuist. Drie goed = 2 punten, twee goed = 1 punt."}],
  k=>{let s="";
    if(k===0){s+=B(10,70,110,40,"aminozuur",{c:"var(--teal)"})+P(120,90,160,90)+B(162,70,90,40,"lever",{c:"var(--paars)",f:"var(--paars-soft)"});
      s+=P(252,80,300,40)+B(302,18,120,40,"aminogroep|→ ureum",{c:"var(--line2)"})+P(252,100,300,140)+B(302,120,220,46,"rest → aerobe dissimilatie|→ CO₂ + H₂O + energie",{c:"var(--groen)",f:"var(--groen-soft)"})+VINK(500,190);}
    if(k===1){s+=B(10,70,120,40,"alvleesklier",{c:"var(--paars)"})+P(130,90,180,90)+B(182,70,140,40,"insuline|glucagon",{c:"var(--goud)"});
      s+=P(322,80,370,40)+B(372,18,150,40,"glucosegehalte",{c:"var(--groen)",f:"var(--groen-soft)"})+VINK(505,72);
      s+=P(322,100,370,140,"var(--text3)",2,true)+B(372,120,150,40,"aminozuurgehalte",{c:"var(--koraal)"})+KRUIS(505,172,9);}
    if(k===2){s+=B(20,40,150,56,"glycogeen|in lever en spieren",{c:"var(--groen)"})+VINK(95,116)+B(195,40,150,56,"vet|in vetweefsel",{c:"var(--groen)"})+VINK(270,116)+B(370,40,150,56,"eiwitvoorraad|bestaat niet",{c:"var(--koraal)"})+KRUIS(445,116,9);
      s+=T(270,160,"opslag in je lichaam","lblm","middle");}
    if(k===3){[["1","juist","var(--groen)"],["2","onjuist","var(--koraal)"],["3","onjuist","var(--koraal)"]].forEach(([n,t,c],i)=>s+=B(40+i*160,60,140,50,`${n}  ${t}`,{c,f:c==="var(--groen)"?"var(--groen-soft)":"var(--koraal-soft)"}));}
    return SV("0 0 540 200",s,"Uitspraken over aminozuren");}));

X.waarom("havo26-2",23,anim([
  {cap:"Je lichaam bouwt eiwitten uit ongeveer <b>twintig soorten</b> aminozuren."},
  {cap:"De <b>lever</b> kan een deel ervan zelf maken door andere aminozuren om te bouwen (groen)."},
  {cap:"Een aantal kan de lever <b>niet</b> maken: dat zijn de <b>essentiële</b> aminozuren (goud). Die moeten dus in je voeding zitten. Dat is het antwoord."}],
  k=>{let s="";const ess=[1,3,6,8,10,12,15,17,19];
    for(let i=0;i<20;i++){const x=50+(i%10)*48,y=50+Math.floor(i/10)*56,e=ess.includes(i);
      const c=k===0?"var(--text3)":e?(k===2?"var(--goud)":"var(--text3)"):"var(--groen)";
      s+=`<circle cx="${x}" cy="${y}" r="16" fill="var(--surface)" stroke="${c}" stroke-width="${k===2&&e?4:2.2}"/>`;}
    if(k>=1)s+=B(40,152,200,38,"lever kan ze maken",{c:"var(--groen)",f:"var(--groen-soft)"});
    if(k>=2)s+=B(280,152,240,38,"essentieel: uit je voeding",{c:"var(--goud)",f:"var(--goud-soft)"});
    return SV("0 0 540 200",s,"Twintig aminozuren, waarvan negen essentieel");}));

/* --- 24: tabel lezen --- */
X.zet("havo26-2",[24],{titel:"Tabellen lezen: procent of gram",
  html:`<p>Bij een tabel met voedingsgegevens let je goed op <b>waar een getal over gaat</b>.</p>
  <ul><li>Een <b>percentage</b> is een deel van een geheel. Vraag je steeds af: procent van <b>wat</b>? Van het product, van het eiwit, of van de energie?</li>
  <li>Wil je een <b>hoeveelheid in gram</b> vergelijken, reken dan eerst om: percentage × het geheel. Een lager percentage kan zo toch méér gram zijn.</li>
  <li>Gaat een uitspraak over een groep stoffen (bijvoorbeeld de essentiële aminozuren), tel dan eerst de juiste rijen bij elkaar op.</li>
  <li>'Het grootste deel' betekent: meer dan de helft, dus meer dan 50%.</li></ul>`,
  anim:anim([{cap:"Product A bevat 10% van een stof, product B maar 5%. Heeft A er dus meer van?"},
    {cap:"Procent van <b>wat</b>? Product A bevat 20 g eiwit, product B 80 g eiwit. Het percentage gaat over dat eiwit."},
    {cap:"Reken om: 10% van 20 g = <b>2 g</b>; 5% van 80 g = <b>4 g</b>. Product B bevat dus méér gram, ondanks het lagere percentage."}],
    k=>{let s="";const sc=4.6;
      [["A",10,20,40],["B",5,80,120]].forEach(([n,p,g,y])=>{s+=T(14,y+20,"product "+n,"lbl");
        if(k===0)s+=T(120,y+22,p+"%","lbl","start","font-size:22px;fill:var(--teal)");
        else{s+=`<rect x="110" y="${y}" width="${g*sc}" height="30" fill="var(--surface)" stroke="var(--text3)"/>`+T(116+g*sc,y+20,g+" g eiwit");
          s+=`<rect x="110" y="${y}" width="${g*sc*p/100}" height="30" fill="var(--teal)"/>`;
          if(k===2)s+=T(110,y+48,`${p}% van ${g} g = ${g*p/100} g`,"lbl","start","fill:var(--teal)");}});
      return SV("0 0 540 190",s,"Percentage tegenover hoeveelheid in gram");}),
  films:[["Wat zit er in je eten?","films/voeding/1-wat-zit-er-in-je-eten.html"]]});

/* --- 25: zuurstoftransport en dissimilatie --- */
function rbc(x,y,o2,c){let s=`<ellipse cx="${x}" cy="${y}" rx="20" ry="12" fill="var(--koraal-soft)" stroke="var(--koraal)" stroke-width="2"/>`;
  for(let i=0;i<o2;i++)s+=`<circle cx="${x-12+i*8}" cy="${y-16}" r="3.6" fill="${c||"var(--teal)"}"/>`;return s;}
X.zet("havo26-2",[25],{titel:"Zuurstoftransport en dissimilatie",
  html:`<p><b>Rode bloedcellen</b> zitten vol <b>hemoglobine</b>, een eiwit met <b>ijzer</b> erin. Hemoglobine bindt zuurstof waar veel zuurstof is (in de longblaasjes) en laat het los waar weinig is (in de weefsels).</p>
  <ul><li>In je cellen gebruiken de <b>mitochondriën</b> zuurstof bij de <b>aerobe dissimilatie</b>: glucose + zuurstof → koolstofdioxide + water + energie.</li>
  <li>De energie wordt vastgelegd in <b>ATP</b>. Daarmee werken je spieren en andere cellen.</li>
  <li>Voor het maken van hemoglobine heb je <b>ijzer</b> uit je voeding nodig.</li></ul>`,
  anim:anim([{cap:"In de <b>longblaasjes</b> is veel zuurstof."},
    {cap:"<b>Hemoglobine</b> in de rode bloedcellen bindt die zuurstof. Het bloed vervoert hem door het lichaam."},
    {cap:"In de weefsels is weinig zuurstof: hemoglobine laat hem los, en de zuurstof diffundeert de cel in."},
    {cap:"In de <b>mitochondriën</b>: aerobe dissimilatie. Glucose + zuurstof → CO₂ + water + <b>energie (ATP)</b>."}],
    k=>{let s=`<circle cx="70" cy="100" r="48" fill="var(--teal-soft)" stroke="var(--teal)" stroke-width="2"/>`+T(70,166,"longblaasje","lblm","middle");
      [[50,80],[80,74],[62,110],[92,104],[46,124],[86,128]].forEach(([x,y])=>s+=`<circle cx="${x}" cy="${y}" r="4" fill="var(--teal)"/>`);
      s+=`<rect x="118" y="84" width="270" height="34" rx="17" fill="var(--surface)" stroke="var(--koraal)" stroke-width="1.6"/>`+T(253,136,"bloedvat","lblm","middle");
      if(k===1)s+=rbc(170,101,4);if(k>=2)s+=rbc(330,101,k===2?1:0);
      if(k===2)s+=P(346,88,400,92,"var(--teal)",2);
      s+=`<circle cx="460" cy="100" r="58" fill="var(--surface)" stroke="var(--groen)" stroke-width="2"/>`+T(460,172,"lichaamscel","lblm","middle");
      s+=`<ellipse cx="462" cy="100" rx="26" ry="14" fill="var(--goud-soft)" stroke="var(--goud)" stroke-width="2"/><path d="${golf(440,484,100,5,0)}" fill="none" stroke="var(--goud)" stroke-width="1.4"/>`;
      if(k>=2)s+=`<circle cx="424" cy="82" r="4" fill="var(--teal)"/><circle cx="430" cy="122" r="4" fill="var(--teal)"/>`;
      if(k===3)s+=T(270,200,"glucose + O₂ → CO₂ + H₂O + energie (ATP)","lbl","middle")+T(462,62,"ATP ATP","lbl","middle","fill:var(--goud-text)");
      return SV("0 0 540 212",s,"Zuurstof van longblaasje naar mitochondrium");}),
  films:[["Wat er in je bloed zit","films/transport/3-wat-er-in-je-bloed-zit.html"],["Alles op adem","films/stofwisseling/2-alles-op-adem.html"]]});

X.waarom("havo26-2",25,anim([
  {cap:"<b>Normaal:</b> veel hemoglobine, dus elke rode bloedcel vervoert veel zuurstof. De cellen dissimileren genoeg en maken veel ATP."},
  {cap:"<b>Tekort aan hemoglobine:</b> minder plekken om zuurstof te binden. Er wordt <b>minder zuurstof naar de cellen vervoerd</b> (punt 1)."},
  {cap:"Minder zuurstof → <b>minder aerobe dissimilatie</b> → minder energie (ATP). Je bent sneller moe (punt 2)."}],
  k=>{let s="";
    [["normaal",4,6,20],["tekort aan hemoglobine",1,2,128]].forEach(([n,o,a,y],r)=>{if(r===1&&k<1)return;
      s+=T(14,y+12,n,"lbl");for(let i=0;i<4;i++)s+=rbc(40+i*50,y+50,o);
      s+=P(232,y+50,282,y+50)+`<circle cx="330" cy="${y+50}" r="40" fill="var(--surface)" stroke="var(--groen)" stroke-width="2"/>`+T(330,y+104,"cel","lblm","middle");
      for(let i=0;i<(r?2:6);i++)s+=`<circle cx="${310+(i%3)*18}" cy="${y+40+Math.floor(i/3)*18}" r="4" fill="var(--teal)"/>`;
      if(r===0||k>=2){s+=P(372,y+50,410,y+50);for(let i=0;i<a;i++)s+=`<rect x="${414+(i%3)*38}" y="${y+28+Math.floor(i/3)*24}" width="34" height="18" rx="4" fill="var(--goud-soft)" stroke="var(--goud)"/>`+T(431+(i%3)*38,y+41+Math.floor(i/3)*24,"ATP","tick","middle");}
      if(r===1&&k>=2)s+=T(470,y+104,"moe!","lbl","middle","fill:var(--koraal)");});
    return SV("0 0 540 236",s,"Normaal en met een tekort aan hemoglobine");}));

/* --- 26: nefron --- */
X.zet("havo26-2",[26],{titel:"De nier: bouw en werking van een nefron",
  html:`<p>Een nier bestaat uit ongeveer een miljoen <b>nefronen</b>. In elk nefron wordt bloed eerst gefilterd, daarna wordt het bruikbare teruggehaald.</p>
  <ul><li>Bloed komt via de <b>nierslagader</b> en een aanvoerend vaatje in de <b>glomerulus</b>: een kluwen haarvaten in het <b>kapsel van Bowman</b>.</li>
  <li><b>Filtratie</b>: de bloeddruk perst water en kleine opgeloste stoffen door de vaatwand het kapsel in. Dat is de <b>voorurine</b>. Bloedcellen en grote eiwitten blijven in het bloed.</li>
  <li>Via een afvoerend vaatje gaat het bloed naar de haarvaten rond de <b>nierbuisjes</b>.</li>
  <li><b>Terugresorptie</b>: glucose, zouten en veel water gaan uit de buisjes terug in het bloed.</li>
  <li>Wat overblijft is <b>urine</b>. Het gezuiverde bloed verlaat de nier via de <b>nierader</b>.</li></ul>`,
  anim:anim([{cap:"Bloed komt via de nierslagader en een aanvoerend vaatje in de <b>glomerulus</b>, in het <b>kapsel van Bowman</b>."},
    {cap:"<b>Filtratie</b>: water en kleine stoffen worden het kapsel in geperst. Dat is de <b>voorurine</b>, die door het nierbuisje stroomt."},
    {cap:"Het bloed gaat verder naar haarvaten rond de buisjes. <b>Terugresorptie</b>: glucose, zouten en water gaan terug het bloed in."},
    {cap:"Wat in het buisje overblijft, is <b>urine</b>. Het gezuiverde bloed gaat via de nierader terug."}],
    k=>{let s=P(14,30,72,82,"var(--koraal)",3)+T(10,22,"aanvoerend vaatje","lblm");
      s+=`<path d="M58,70 A42,42 0 1,0 122,74" fill="none" stroke="var(--text2)" stroke-width="3"/>`+T(90,158,"kapsel van Bowman","lblm","middle");
      s+=`<path d="M78,92 c-14,-14 10,-22 14,-6 c4,16 -22,12 -10,0 c12,-12 26,4 14,10 c-12,6 -16,-14 0,-14" fill="none" stroke="var(--koraal)" stroke-width="3"/>`+T(90,182,"glomerulus","lbl","middle","fill:var(--koraal)");
      const bu="M122,110 H240 V220 H290 V140 H400 V250";
      s+=`<path d="${bu}" fill="none" stroke="${k>=1?"var(--goud)":"var(--line2)"}" stroke-width="12" stroke-linejoin="round" opacity="${k>=1?.55:.6}"/>`+T(250,98,"nierbuisje","lblm");
      s+=`<path d="M100,76 C120,46 150,40 170,40" fill="none" stroke="var(--koraal)" stroke-width="2.4"/>`+T(176,36,"afvoerend vaatje","tick");
      if(k>=1){s+=T(150,132,"voorurine","lbl","start","fill:var(--goud-text)");[[96,108],[110,96]].forEach(([x,y])=>s+=P(x-6,y-8,x+4,y+4,"var(--goud)",1.6));}
      if(k>=2){s+=`<path d="M170,40 H300 C320,40 330,60 330,90 V118 H460 C480,118 490,100 490,60 V30" fill="none" stroke="var(--paars)" stroke-width="2.4" stroke-dasharray="2 4"/>`;
        [[200,108],[340,130],[380,130]].forEach(([x,y])=>s+=P(x,y,x,y-16,"var(--paars)",1.6));
        s+=T(330,74,"haarvaten: terugresorptie","lblm","start","fill:var(--paars)");}
      if(k>=3)s+=T(496,24,"→ nierader","lbl","end","fill:var(--teal)")+T(410,250,"urine","lbl","start","fill:var(--goud-text)");
      return SV("0 0 540 262",s,"Schema van een nefron");}),
  films:[["Water in balans","films/hormonen/5-water-in-balans.html"],["Uitscheiding en evenwicht","films/gaswisseling/3-uitscheiding-en-evenwicht.html"]]});

X.waarom("havo26-2",26,anim([
  {cap:"Volg het bloed vanaf de nierslagader. Het eerste haarvatennet dat het tegenkomt, is de <b>glomerulus</b>."},
  {cap:"Het afvoerende vaatje van de glomerulus is <b>nauwer</b> dan het aanvoerende. Daardoor blijft de druk in de glomerulus hoog: hoog genoeg om voorurine eruit te persen."},
  {cap:"Daarna stroomt het bloed door de haarvaten rond de buisjes. Door de wrijving in al die nauwe vaatjes is de druk daar al flink <b>gedaald</b>."},
  {cap:"Van deze drie plekken is de bloeddruk het hoogst in de <b>glomerulus</b>: antwoord A."}],
  k=>{let s="";const n=["nier-|slagader","glomerulus","haarvaten|1e buisje","haarvaten|2e buisje","nierader"],h=[120,92,30,24,12];
    n.forEach((t,i)=>{const x=8+i*106,on=k>=1&&i===1;s+=B(x,14,92,44,t,{c:on?"var(--goud)":"var(--line2)",sw:on?3:1.6});
      if(i<4)s+=P(x+92,36,x+106,36,"var(--text3)",i===1?1.2:2.4);
      const vis=i===0||(i===1&&k>=1)||(i>1&&k>=2);
      if(vis)s+=`<rect x="${x+26}" y="${214-h[i]}" width="40" height="${h[i]}" fill="${on&&k===3?"var(--goud-soft)":"var(--koraal-soft)"}" stroke="${on&&k===3?"var(--goud)":"var(--koraal)"}" stroke-width="2"/>`;});
    s+=`<line x1="4" y1="214" x2="536" y2="214" class="ax"/>`+T(8,80,"bloeddruk","tick");
    if(k===1)s+=T(214,72,"nauw afvoerend vaatje","tick","middle");
    if(k===3)s+=T(160,226,"hoogste druk","lbl","middle","fill:var(--goud-text)");
    return SV("0 0 540 232",s,"Bloeddruk langs de weg door de nier");}));

/* --- 27: mutaties en selectie --- */
X.zet("havo26-2",[27],{titel:"Soorten mutaties, en natuurlijke of kunstmatige selectie",
  html:`<p>Een <b>mutatie</b> is een verandering in het DNA. Er zijn drie soorten:</p>
  <ul><li><b>Genmutatie</b> (puntmutatie): een kleine verandering in de basenvolgorde van één gen.</li>
  <li><b>Chromosoommutatie</b>: een groter stuk van een chromosoom raakt kwijt, wordt verdubbeld, omgedraaid of verplaatst.</li>
  <li><b>Genoommutatie</b>: het <b>aantal chromosomen</b> verandert, bijvoorbeeld een extra chromosoom 21 bij het syndroom van Down.</li></ul>
  <p>Mutaties ontstaan toevallig. <b>Mutagene factoren</b>, zoals straling en sommige chemicaliën, maken ze vaker.</p>
  <p><b>Selectie</b> bepaalt welke varianten zich voortplanten. Bij <b>natuurlijke selectie</b> doet de omgeving dat: wie beter aangepast is, krijgt meer nakomelingen. Bij <b>kunstmatige selectie</b> kiest de mens, bijvoorbeeld bij het veredelen van planten of het fokken van dieren.</p>`,
  anim:anim([{cap:"Een chromosoompaar, en ingezoomd een stukje van een gen."},
    {cap:"<b>Genmutatie</b>: één base in het gen is veranderd. De chromosomen zien er nog hetzelfde uit."},
    {cap:"<b>Chromosoommutatie</b>: een heel stuk van een chromosoom is weg."},
    {cap:"<b>Genoommutatie</b>: er is een chromosoom bij gekomen. Het aantal chromosomen is veranderd."}],
    k=>{let s="";const chr=(x,len,c)=>`<rect x="${x}" y="30" width="24" height="${len}" rx="12" fill="var(--surface)" stroke="${c||"var(--teal)"}" stroke-width="2.2"/>`+[40,70,100,130].filter(y=>y<len+20).map(y=>`<line x1="${x+3}" y1="${y}" x2="${x+21}" y2="${y}" stroke="var(--teal)" stroke-width="3" opacity=".5"/>`).join("");
      s+=chr(40,140)+chr(80,k===2?84:140,k===2?"var(--koraal)":undefined);
      if(k===2)s+=`<rect x="80" y="118" width="24" height="52" rx="12" fill="none" stroke="var(--koraal)" stroke-width="2" stroke-dasharray="5 4"/>`;
      if(k===3)s+=chr(120,140,"var(--koraal)");
      const b=["A","T","G","C","C","A"];if(k===1)b[3]="G";
      s+=T(200,40,"stukje van een gen","tick");
      b.forEach((t,i)=>{const x=200+i*48,m=k===1&&i===3;s+=`<rect x="${x}" y="52" width="40" height="40" rx="8" fill="${m?"var(--koraal-soft)":"var(--surface)"}" stroke="${m?"var(--koraal)":"var(--line2)"}" stroke-width="2"/>`+T(x+20,78,t,"lbl","middle","font:600 17px var(--meta)");});
      s+=T(200,140,["normaal","genmutatie: één base anders","chromosoommutatie: stuk kwijt","genoommutatie: extra chromosoom"][k],"lbl","start",k?"fill:var(--koraal)":"");
      return SV("0 0 540 186",s,"Drie soorten mutaties");}),
  films:[["Mutaties","films/dna/5-mutaties.html"],["De mens als selectiefactor","films/evolutie/4-de-mens-als-selectiefactor.html"]]});

X.waarom("havo26-2",27,anim([
  {cap:"De onderzoekers stellen bacteriën bloot aan straling of chemicaliën. Daardoor ontstaan toevallig mutaties."},
  {cap:"Bij één bacterie verandert <b>één base in één gen</b>. Dat is een kleine verandering in een gen: een <b>puntmutatie</b>. Het aantal chromosomen blijft gelijk, dus geen genoommutatie."},
  {cap:"De <b>onderzoekers kiezen</b> de bacterie die meer B12 maakt en laten alleen die vermenigvuldigen. De mens kiest: <b>kunstmatige selectie</b>. Antwoord C."}],
  k=>{let s=`<circle cx="110" cy="110" r="88" fill="var(--surface)" stroke="var(--text3)" stroke-width="2"/>`;
    const bac=(x,y,c)=>`<rect x="${x-11}" y="${y-5}" width="22" height="10" rx="5" fill="${c||"var(--teal)"}"/>`;
    [[70,70],[110,60],[150,80],[60,120],[100,110],[140,130],[80,160],[120,160],[160,110],[90,90],[130,95],[60,95]].forEach(([x,y],i)=>s+=bac(x,y,k>=1&&i===5?"var(--koraal)":undefined));
    if(k===0)for(let i=0;i<3;i++)s+=`<path d="M${230+i*16},${20+i*6} l-12,14 l10,0 l-12,14" fill="none" stroke="var(--goud)" stroke-width="2.4"/>`+"";
    if(k===0)s+=T(230,90,"straling / chemicaliën","lblm");
    if(k===1){s+=`<circle cx="140" cy="130" r="18" fill="none" stroke="var(--koraal)" stroke-width="2.4"/>`+P(160,126,236,100,"var(--koraal)",2);
      ["A","C","G","T"].forEach((t,i)=>s+=`<rect x="${244+i*38}" y="40" width="32" height="32" rx="6" fill="var(--surface)" stroke="var(--line2)"/>`+T(260+i*38,62,t,"lbl","middle","font:600 15px var(--meta)"));
      ["A","C","A","T"].forEach((t,i)=>s+=`<rect x="${244+i*38}" y="100" width="32" height="32" rx="6" fill="${i===2?"var(--koraal-soft)":"var(--surface)"}" stroke="${i===2?"var(--koraal)":"var(--line2)"}"/>`+T(260+i*38,122,t,"lbl","middle","font:600 15px var(--meta)"));
      s+=T(400,62,"origineel","tick")+T(400,122,"mutant","tick","start","fill:var(--koraal)")+T(244,160,"één base anders = puntmutatie","lbl");}
    if(k===2){s+=P(160,130,330,110,"var(--goud)",2.6)+T(244,100,"de mens kiest","lbl","middle","fill:var(--goud-text)");
      s+=`<circle cx="420" cy="110" r="80" fill="var(--surface)" stroke="var(--koraal)" stroke-width="2"/>`;
      for(let i=0;i<18;i++)s+=bac(370+(i%5)*25,62+Math.floor(i/5)*28+(i%2)*6,"var(--koraal)");
      s+=T(420,212,"alleen de mutant groeit verder","lblm","middle");}
    return SV("0 0 540 220",s,"Mutatie en selectie bij B12-bacteriën");}));

/* --- 28: rijken --- */
X.zet("havo26-2",[28],{titel:"Indeling van organismen: prokaryoten en rijken",
  html:`<p>Biologen delen organismen in op grond van hun bouw. Het eerste onderscheid zit in de cel:</p>
  <ul><li><b>Prokaryoten</b> hebben geen celkern: hun DNA ligt los in het cytoplasma. Dit zijn de <b>bacteriën</b>.</li>
  <li><b>Eukaryoten</b> hebben wel een celkern, en organellen zoals mitochondriën.</li></ul>
  <p>De eukaryoten verdeel je in <b>rijken</b>: <b>planten</b> (autotroof, celwand van cellulose), <b>dieren</b> (heterotroof, geen celwand), <b>schimmels</b> (heterotroof, celwand van chitine) en <b>protisten</b> (meestal eencellige eukaryoten, zoals het pantoffeldiertje). Samen met de bacteriën zijn dat vijf rijken.</p>`,
  anim:box=>{let s=B(210,6,120,30,"organismen",{c:"var(--text3)"});
    s+=`<path d="M270,36 V50 H120 V66 M270,50 H420 V66" fill="none" stroke="var(--text3)" stroke-width="1.6"/>`;
    s+=B(40,66,160,42,"prokaryoten|geen celkern",{c:"var(--teal)"})+B(340,66,160,42,"eukaryoten|met celkern",{c:"var(--paars)"});
    s+=`<path d="M120,108 V136 M420,108 V122 H252 V136 M420,122 H492 V136 M336,122 V136 M420,122 V136" fill="none" stroke="var(--text3)" stroke-width="1.6"/>`;
    s+=B(60,136,120,32,"bacteriën",{c:"var(--teal)"});
    [["protisten",252],["schimmels",336],["planten",420],["dieren",492]].forEach(([t,x])=>s+=B(x-38,136,76,32,t,{c:"var(--paars)"}));
    box.innerHTML=W(SV("0 0 540 176",s,"Indeling in prokaryoten en vijf rijken"));},
  films:[["Celorganellen","films/cellen/celorganellen/index.html"]]});

/* --- 29: energiestroom --- */
X.zet("havo26-2",[29],{titel:"Energiestroom door een voedselketen",
  html:`<p>Planten (<b>producenten</b>) leggen zonne-energie vast in organische stoffen. Via voedselketens gaat die energie naar de <b>consumenten</b>.</p>
  <ul><li>Elk organisme gebruikt het grootste deel van zijn voedsel voor de eigen <b>dissimilatie</b>: bewegen, warm blijven, leven. Die energie gaat als <b>warmte</b> verloren.</li>
  <li>Bovendien wordt niet alles opgegeten of verteerd. Die resten gaan naar de reducenten.</li>
  <li>Vuistregel: maar ongeveer <b>10%</b> van de energie van een schakel komt in de volgende schakel terecht.</li>
  <li>Je tekent dat als een <b>piramide van energie</b> (of van biomassa): elke laag is veel smaller dan de laag eronder.</li></ul>`,
  anim:anim([{cap:"De <b>producenten</b> (planten) leggen zonne-energie vast. Stel: 10 000 kJ."},
    {cap:"Consumenten van de 1e orde krijgen maar ongeveer <b>10%</b>: 1 000 kJ. De rest gaat verloren, vooral als <b>warmte</b> bij hun dissimilatie."},
    {cap:"Consumenten van de 2e orde krijgen daar weer 10% van: 100 kJ. Elke schakel extra kost dus veel energie."}],
    k=>{let s="";const L=[["producenten","10 000 kJ",400,"var(--groen)"],["consumenten 1e orde","1 000 kJ",130,"var(--teal)"],["consumenten 2e orde","100 kJ",42,"var(--paars)"]];
      L.forEach(([n,e,w,c],i)=>{if(i>k)return;const y=170-i*58,x=230-w/2;
        s+=`<rect x="${x}" y="${y}" width="${w}" height="44" fill="var(--surface)" stroke="${c}" stroke-width="2.4"/>`+T(470,y+20,n,"lbl")+T(470,y+36,e,"lblm");
        if(i===0)s+=T(230,y+27,e,"lbl","middle");
        if(i>0)s+=`<path d="M${x+w+10},${y+40} q-6,-8 0,-16 q6,-8 0,-16" fill="none" stroke="var(--koraal)" stroke-width="2"/>`+T(x+w+18,y+16,"warmte","tick","start","fill:var(--koraal)");});
      return SV("0 0 600 222",s,"Piramide van energie");}),
  films:[["Alles gaat rond","films/ecologie/alles-gaat-rond/index.html"],["Eén aarde","films/ecologie/3-een-aarde.html"]]});

})();
/* ===== h5.js ===== */
(function(){
"use strict";
/* Opgave 5 in beide examens: havo26-1 Gastric bypass (29–32), havo26-2 Vel-bloedgroep (30–32) */
const X=EXSTOF, SV=X.svg;
const pijl=(id,kl)=>`<defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10z" fill="${kl}"/></marker></defs>`;
const wrap=(s,max)=>`<div style="max-width:${max||520}px;margin:0 auto;padding:8px">${s}</div>`;

/* ============================ havo26-1 · opgave 5 ============================ */

/* --- 29: verteringssappen en enzymen per plek --- */
function tractSVG(on){
  const hl=k=>on===k?"var(--goud)":"var(--text3)", hw=k=>on===k?3.5:1.6, fl=k=>on===k?"var(--goud-soft)":"var(--surface)";
  let s=`<ellipse cx="80" cy="28" rx="30" ry="13" fill="${fl(1)}" stroke="${hl(1)}" stroke-width="${hw(1)}"/>
  <path d="M80,41 L80,88" stroke="var(--line2)" stroke-width="12" stroke-linecap="round"/>
  <path d="M80,88 C86,74 150,70 162,102 C172,132 140,152 116,144 C98,138 92,118 80,104 Z" fill="${fl(2)}" stroke="${hl(2)}" stroke-width="${hw(2)}"/>
  <path d="M18,96 C40,82 76,86 92,102 C84,122 46,130 22,122 C10,114 10,102 18,96 Z" fill="var(--surface2)" stroke="${on===3?"var(--groen)":"var(--text3)"}" stroke-width="${on===3?2.5:1.4}"/>
  <path d="M56,124 C62,150 92,168 116,170" fill="none" stroke="${on===3?"var(--groen)":"var(--text3)"}" stroke-width="${on===3?2.5:1.2}" stroke-dasharray="4 3"/>
  <ellipse cx="176" cy="172" rx="34" ry="9" fill="var(--surface2)" stroke="${on===3?"var(--teal)":"var(--text3)"}" stroke-width="${on===3?2.5:1.4}"/>
  <path d="M142,172 L126,174" stroke="${on===3?"var(--teal)":"var(--text3)"}" stroke-width="${on===3?2.5:1.2}" stroke-dasharray="4 3"/>
  <path d="M120,146 C104,168 112,188 140,186" fill="none" stroke="${hl(3)}" stroke-width="${on===3?10:8}" stroke-linecap="round" opacity=".9"/>
  <path d="M140,186 C190,186 196,204 160,210 C120,216 112,232 150,238 C196,244 200,262 160,266 C130,270 120,282 150,290" fill="none" stroke="${hl(4)}" stroke-width="${on===4?10:8}" stroke-linecap="round" opacity=".9"/>
  <text class="lblm" x="118" y="24">mond</text><text class="lblm" x="166" y="92">maag</text><text class="lblm" x="14" y="88">lever</text>
  <text class="lblm" x="214" y="168">alvleesklier</text><text class="lblm" x="34" y="190">twaalfvingerige</text><text class="lblm" x="34" y="204">darm</text>
  <text class="lblm" x="196" y="252">dunne darm</text>`;
  const P=[[],
    ["speeksel","amylase: zetmeel → maltose"],
    ["maagsap","zoutzuur: pH ± 2","pepsine: eiwit → peptiden"],
    ["gal (lever): geen enzym,","  emulgeert vet","alvleessap: amylase,","  eiwitverterende enzymen,","  lipase"],
    ["darmsap: enzymen knippen","  maltose en peptiden af","resorptie in de darmvlokken"]][on]||[];
  if(P.length){s+=`<rect x="280" y="${40+on*30}" width="186" height="${18+P.length*17}" rx="8" fill="var(--surface)" stroke="var(--goud)"/>`;
    P.forEach((t,k)=>s+=`<text class="${k===0?"lbl":"lblm"}" x="292" y="${60+on*30+k*17}" style="font-size:11.5px">${t.replace(/ /g," ")}</text>`);}
  return SV("0 0 470 300",s,"Spijsverteringskanaal met de verteringssappen");
}
X.zet("havo26-1",[29],{titel:"Verteringssappen: welk enzym werkt waar?",
  html:`<p>Bij de vertering knippen <b>enzymen</b> grote moleculen in kleine stukken die je kunt opnemen. Elk enzym werkt op één soort stof (het is <b>specifiek</b>) en heeft een eigen optimale pH.</p>
  <ul><li><b>Mond</b>: speeksel bevat <b>amylase</b>; dat breekt zetmeel af.</li>
  <li><b>Maag</b>: maagsap bevat <b>zoutzuur</b> en <b>pepsine</b>, dat eiwitten afbreekt.</li>
  <li><b>Twaalfvingerige darm</b>: hier komen <b>gal</b> (uit de lever, geen enzym) en <b>alvleessap</b> bij het voedsel. Alvleessap bevat enzymen voor koolhydraten, eiwitten én vetten.</li>
  <li><b>Dunne darm</b>: darmsap maakt de vertering af; de voedingsstoffen worden opgenomen.</li></ul>`,
  anim:box=>X.stappen(box,[
    {k:0,cap:"Het spijsverteringskanaal: een lange buis. Op een paar plekken komen sappen bij het voedsel."},
    {k:1,cap:"<b>Mond</b>: speeksel met amylase. Amylase breekt zetmeel af tot maltose."},
    {k:2,cap:"<b>Maag</b>: maagsap met zoutzuur en pepsine. Pepsine knipt eiwitten in kleinere stukken."},
    {k:3,cap:"<b>Twaalfvingerige darm</b>: gal uit de lever (groen) emulgeert vet; alvleessap (blauw) bevat enzymen voor alle drie de soorten voedingsstoffen."},
    {k:4,cap:"<b>Dunne darm</b>: darmsap knipt de laatste stukjes; de kleine moleculen gaan door de darmwand naar het bloed."}],
    (st,s)=>st.innerHTML=wrap(tractSVG(s.k),520)),
  films:[["De reis door je buik","films/voeding/2-de-reis-door-je-buik.html"],["Knippen op maat","films/voeding/3-knippen-op-maat.html"]]});

/* --- 30: vetvertering en resorptie --- */
function vetSVG(i){
  let s=`<path d="M10,232 ${Array.from({length:8},(_,k)=>`L${20+k*56},232 L${26+k*56},176 Q${40+k*56},160 ${54+k*56},176 L${60+k*56},232`).join(" ")} L470,232 L470,262 L10,262 Z" fill="var(--koraal-soft)" stroke="var(--koraal)" stroke-width="1.5"/>
  <text class="lblm" x="16" y="254">darmwand met darmvlokken</text>`;
  if(i===0)s+=`<circle cx="230" cy="80" r="46" fill="var(--goud-soft)" stroke="var(--goud)" stroke-width="2"/><text class="lbl" x="230" y="84" text-anchor="middle">vetdruppel</text>`;
  if(i===1){[[150,60],[200,90],[250,58],[300,92],[340,62],[180,130],[270,128],[110,108],[360,120]].forEach(([x,y])=>s+=`<circle cx="${x}" cy="${y}" r="13" fill="var(--goud-soft)" stroke="var(--goud)" stroke-width="1.6"/>`);
    s+=`<text class="lbl" x="230" y="26" text-anchor="middle" style="fill:var(--groen)">gal: emulgeren</text>`;}
  if(i===2){[[150,60],[250,58],[340,62],[180,130]].forEach(([x,y])=>s+=`<circle cx="${x}" cy="${y}" r="13" fill="var(--goud-soft)" stroke="var(--goud)" stroke-width="1.6"/>`);
    [[200,96],[290,104],[110,110],[360,124],[240,140]].forEach(([x,y])=>s+=`<path d="M${x},${y} l18,0 M${x},${y} l14,-10 M${x},${y} l14,10" stroke="var(--goud)" stroke-width="2"/><circle cx="${x}" cy="${y}" r="3.5" fill="var(--paars)"/>`);
    s+=`<text class="lbl" x="230" y="26" text-anchor="middle" style="fill:var(--teal)">lipase knipt</text><text class="tick" x="380" y="40">vetzuren + glycerol</text>`;}
  if(i===3){[[60,186],[116,194],[172,184],[228,192],[284,186],[340,194]].forEach(([x,y])=>s+=`<path d="M${x},${y-40} L${x},${y-6}" stroke="var(--goud)" stroke-width="2" marker-end="url(#h5vt)"/>`);
    s+=pijl("h5vt","var(--goud)")+`<text class="lbl" x="230" y="40" text-anchor="middle">opname door de darmvlokken</text>`;}
  return SV("0 0 480 268",s,"Vetvertering in de dunne darm");
}
X.zet("havo26-1",[30],{titel:"Vetvertering en resorptie in de dunne darm",
  html:`<p>Vet lost niet op in water: het vormt grote druppels. Vetvertering gaat daarom in stappen.</p>
  <ul><li><b>Gal</b> (gemaakt in de lever) <b>emulgeert</b> vet: grote druppels worden veel kleine druppeltjes. Zo krijgen enzymen meer oppervlak om op te werken.</li>
  <li><b>Lipase</b> uit het alvleessap knipt vet in <b>vetzuren en glycerol</b>.</li>
  <li>Die worden in de dunne darm <b>geresorbeerd</b> (opgenomen) door de cellen van de darmwand.</li></ul>
  <p>De dunne darm is lang en heeft <b>darmvlokken</b> met microvilli: zo is het oppervlak voor opname heel groot.</p>`,
  anim:box=>X.stappen(box,[
    {cap:"Een grote vetdruppel in de dunne darm. Enzymen kunnen alleen aan de buitenkant werken."},
    {cap:"<b>Gal</b> emulgeert: veel kleine druppeltjes, samen een veel groter oppervlak."},
    {cap:"<b>Lipase</b> knipt vet in vetzuren en glycerol."},
    {cap:"De darmvlokken nemen vetzuren en glycerol op."}],
    (st,s,i)=>st.innerHTML=wrap(vetSVG(i))),
  films:[["Knippen op maat","films/voeding/3-knippen-op-maat.html"],["Van darm naar bloed","films/voeding/4-van-darm-naar-bloed.html"]]});

/* extra waarom 30: de dunne darm als balk, voor en na de operatie */
function darmBalk(i){
  const y1=60,y2=170;
  let s=pijl("h5db","var(--teal)")+`<text class="lbl" x="20" y="${y1-24}">vóór de operatie</text>
  <rect x="20" y="${y1}" width="420" height="26" rx="13" fill="${i>=0?"var(--goud-soft)":"none"}" stroke="var(--goud)" stroke-width="1.6"/>
  <path d="M20,${y1-12} L20,${y1-2}" stroke="var(--teal)" stroke-width="2.5" marker-end="url(#h5db)"/>
  <text class="tick" x="32" y="${y1-6}">gal en lipase vanaf het begin</text>
  <text class="tick" x="230" y="${y1+17}" text-anchor="middle">verteren en opnemen over de hele lengte</text>`;
  if(i>=1){s+=`<text class="lbl" x="20" y="${y2-24}">na de operatie</text>
    <rect x="20" y="${y2}" width="160" height="26" rx="13" fill="var(--surface)" stroke="var(--text3)" stroke-width="1.6" stroke-dasharray="5 4"/>
    <text class="lbl" x="20" y="${y2+46}" style="fill:var(--goud-text)">P</text><text class="lbl" x="176" y="${y2+46}" style="fill:var(--goud-text)">Q</text>
    <text class="tick" x="100" y="${y2+17}" text-anchor="middle" style="font-size:9px">1,5 m zonder gal en lipase</text>
    <path d="M180,${y2-12} L180,${y2-2}" stroke="var(--teal)" stroke-width="2.5" marker-end="url(#h5db)"/><text class="tick" x="192" y="${y2-6}">gal en lipase pas hier</text>
    <rect x="180" y="${y2}" width="260" height="26" rx="13" fill="var(--goud-soft)" stroke="var(--goud)" stroke-width="1.6"/>
    <text class="lbl" x="436" y="${y2+46}" text-anchor="end" style="fill:var(--goud-text)">R</text>`;}
  if(i===2)s+=`<rect x="178" y="${y2-4}" width="266" height="34" rx="17" fill="none" stroke="var(--koraal)" stroke-width="2.5"/><text class="lbl" x="310" y="${y2+66}" text-anchor="middle" style="fill:var(--koraal)">korter stuk: minder tijd voor gal en lipase</text>`;
  if(i===3){for(let k=0;k<10;k++)s+=`<path d="M${194+k*24},${y2+26} l0,12" stroke="var(--goud)" stroke-width="2"/>`;
    s+=`<text class="lbl" x="310" y="${y2+66}" text-anchor="middle" style="fill:var(--koraal)">minder darmoppervlak om vetzuren op te nemen</text>`;}
  return SV("0 0 460 250",s,"Dunne darm voor en na de gastric bypass");
}
X.waarom("havo26-1",30,box=>X.stappen(box,[
  {cap:"<b>Vóór de operatie</b>: gal en alvleessap komen meteen na de maag bij het voedsel. Over de hele lengte van de dunne darm wordt vet verteerd en opgenomen."},
  {cap:"<b>Na de operatie</b>: het voedsel komt bij P binnen, maar gal en alvleessap komen pas bij Q. De eerste anderhalve meter wordt vet nauwelijks verteerd."},
  {cap:"<b>Oorzaak 1</b>: het stuk waar gal en lipase op het vet werken, is korter. Er is minder tijd om te emulgeren en vet af te breken."},
  {cap:"<b>Oorzaak 2</b>: in dat kortere stuk is ook minder resorptieoppervlak. Er gaan minder vetzuren en glycerol naar het bloed, dus meer vet in de ontlasting."}],
  (st,s,i)=>st.innerHTML=wrap(darmBalk(i))));

/* --- 31: hormonen en regelkring --- */
function hormoonSVG(i){
  let s=pijl("h5hm","var(--goud)")+`<rect x="10" y="120" width="460" height="40" rx="20" fill="var(--koraal-soft)" stroke="var(--koraal)"/><text class="lblm" x="24" y="176">bloedvat</text>
  <rect x="24" y="30" width="100" height="70" rx="12" fill="var(--surface2)" stroke="${i>=0?"var(--paars)":"var(--text3)"}" stroke-width="2"/><text class="lbl" x="74" y="62" text-anchor="middle">hormoon-</text><text class="lbl" x="74" y="78" text-anchor="middle">klier</text>
  <circle cx="290" cy="220" r="34" fill="var(--surface2)" stroke="var(--text3)" stroke-width="1.6"/><text class="lblm" x="290" y="224" text-anchor="middle">geen</text><text class="lblm" x="290" y="238" text-anchor="middle">receptor</text>
  <circle cx="400" cy="220" r="34" fill="${i>=3?"var(--groen-soft)":"var(--surface2)"}" stroke="${i>=2?"var(--groen)":"var(--text3)"}" stroke-width="2"/><text class="lbl" x="400" y="224" text-anchor="middle">doelcel</text>
  <path d="M388,186 l0,-8 l-6,-6 M412,186 l0,-8 l6,-6" stroke="var(--groen)" stroke-width="2.5" fill="none"/>`;
  if(i===0)s+=`<path d="M74,6 L74,26" stroke="var(--goud)" stroke-width="2.5" marker-end="url(#h5hm)"/><text class="lbl" x="84" y="18" style="fill:var(--goud-text)">prikkel</text>`;
  if(i>=1){[[100,140],[150,134],[210,146],[262,136]].forEach(([x,y],k)=>{if(i>=2||k<2)s+=`<circle cx="${x+(i>=2?40:0)}" cy="${y}" r="5" fill="var(--paars)"/>`;});
    s+=`<path d="M74,100 L74,124" stroke="var(--paars)" stroke-width="2.5" marker-end="url(#h5hm)"/><text class="tick" x="132" y="112">hormoon in het bloed</text>`;}
  if(i>=2)s+=`<circle cx="400" cy="180" r="5" fill="var(--paars)"/><circle cx="290" cy="164" r="5" fill="var(--paars)" opacity=".5"/>`;
  if(i>=3)s+=`<text class="lbl" x="400" y="276" text-anchor="middle" style="fill:var(--groen)">reageert</text><text class="lblm" x="290" y="276" text-anchor="middle">reageert niet</text>`;
  if(i===4)s+=`<path d="M440,200 C480,120 300,20 140,40" fill="none" stroke="var(--goud)" stroke-width="2" stroke-dasharray="6 4" marker-end="url(#h5hm)"/><text class="lbl" x="300" y="40" style="fill:var(--goud-text)">effect remt de prikkel</text>`;
  return SV("0 0 480 290",s,"Hormoon van klier via het bloed naar een doelcel");
}
X.zet("havo26-1",[31],{titel:"Hormonen: van prikkel tot doelorgaan",
  html:`<p>Een <b>hormoon</b> is een signaalstof die een klier afgeeft aan het <b>bloed</b>. Het bloed brengt het overal in je lichaam, maar alleen cellen met een passende <b>receptor</b> reageren: de <b>doelcellen</b>.</p>
  <ul><li>Een klier maakt een hormoon pas als er een <b>prikkel</b> is (bijvoorbeeld een stof in het bloed of in de darm).</li>
  <li>Het doelorgaan reageert, en dat effect haalt vaak de prikkel weg: <b>negatieve terugkoppeling</b>. Zo blijft alles in balans.</li></ul>
  <p>Ook de spijsvertering wordt zo geregeld: hormonen uit maag en darm sturen hoeveel sap er wordt gemaakt.</p>`,
  anim:box=>X.stappen(box,[
    {cap:"Een <b>prikkel</b> bereikt de hormoonklier."},
    {cap:"De klier geeft het hormoon af aan het <b>bloed</b> (er is geen afvoerbuis)."},
    {cap:"Het bloed brengt het hormoon naar alle cellen. Alleen een cel met een passende <b>receptor</b> kan het binden."},
    {cap:"De <b>doelcel</b> reageert; een cel zonder receptor merkt niets."},
    {cap:"Het effect haalt de prikkel weg: <b>negatieve terugkoppeling</b>. Geen prikkel, geen hormoon."}],
    (st,s,i)=>st.innerHTML=wrap(hormoonSVG(i))),
  films:[["Post voor iedereen","films/hormonen/1-post-voor-iedereen.html"]]});

/* extra waarom 31: de keten met de wegvallende eerste schakel */
const KETEN=["eiwitten in het onderste deel van de maag","onderste deel maakt gastrine","gastrine via het bloed naar de maagklieren","maagklieren maken maagzuur"];
function ketenSVG(i){
  let s=pijl("h5kt","var(--text2)");
  KETEN.forEach((t,k)=>{const x=10+k*118,uit=i>=1&&(k===0||i>=2),w=t.split(" ");const half=Math.ceil(w.length/2);
    s+=`<rect x="${x}" y="40" width="104" height="96" rx="10" fill="${uit?"var(--surface)":"var(--goud-soft)"}" stroke="${uit?"var(--text3)":"var(--goud)"}" stroke-width="1.8" ${uit?'stroke-dasharray="5 4"':""}/>`;
    const lines=[];let cur="";w.forEach(wd=>{if((cur+" "+wd).trim().length>14){lines.push(cur.trim());cur=wd;}else cur+=" "+wd;});lines.push(cur.trim());
    lines.forEach((l,j)=>s+=`<text class="lblm" x="${x+52}" y="${70+j*15}" text-anchor="middle" style="${uit?"opacity:.55":""}">${l}</text>`);
    if(k<3)s+=`<path d="M${x+106},88 L${x+116},88" stroke="var(--text2)" stroke-width="2" marker-end="url(#h5kt)"/>`;
    if(uit&&(k===0||i>=2))s+=`<path d="M${x+20},50 L${x+84},126 M${x+84},50 L${x+20},126" stroke="var(--koraal)" stroke-width="2" opacity="${k===0?.75:.4}"/>`;});
  if(i>=1)s+=`<text class="lbl" x="62" y="160" text-anchor="middle" style="fill:var(--koraal)">voedsel gaat</text><text class="lbl" x="62" y="176" text-anchor="middle" style="fill:var(--koraal)">er niet meer langs</text>`;
  if(i>=2)s+=`<text class="lbl" x="420" y="160" text-anchor="middle" style="fill:var(--koraal)">nauwelijks zuur</text>`;
  s+=`<text class="lbl" x="10" y="24">${i===0?"normaal":"na de operatie"}</text>`;
  return SV("0 0 480 190",s,"Keten van eiwit naar maagzuur");
}
X.waarom("havo26-1",31,box=>X.stappen(box,[
  {cap:"<b>Normaal</b>: eiwitten in het onderste deel van de maag zijn de prikkel. Daarna volgen gastrine, het bloed en de maagklieren."},
  {cap:"<b>Na de operatie</b> gaat het voedsel van de pouch direct de dunne darm in. In het onderste deel van de maag komen geen eiwitten: de eerste schakel valt weg."},
  {cap:"Zonder prikkel <b>geen gastrine</b>, en zonder gastrine maken de (gezonde) maagklieren <b>nauwelijks maagzuur</b>."}],
  (st,s,i)=>st.innerHTML=wrap(ketenSVG(i))));

/* --- 32: osmose en bloeddruk --- */
function osmoseVat(i){
  const lvL=i>=3?70:100,lvR=i>=3?130:100;
  let s=pijl("h5os","var(--teal)")+`<rect x="40" y="40" width="360" height="190" fill="none" stroke="var(--text2)" stroke-width="2"/>
  <line x1="220" y1="40" x2="220" y2="230" stroke="var(--paars)" stroke-width="3" stroke-dasharray="${i>=1?"6 5":"0"}"/>
  <rect x="42" y="${lvL}" width="176" height="${228-lvL}" fill="var(--teal-soft)"/><rect x="222" y="${lvR}" width="176" height="${228-lvR}" fill="var(--teal-soft)"/>
  <text class="lblm" x="220" y="252" text-anchor="middle">halfdoorlatend membraan</text>`;
  const dots=(n,x0,y0,h)=>{let r="";const c=n>6?5:2,rw=Math.ceil(n/c);for(let k=0;k<n;k++){const cx=k%c,ry=Math.floor(k/c);r+=`<circle cx="${x0+10+cx*(140/c)+((k*37)%17)}" cy="${y0+ry*(h/rw)+((k*23)%13)}" r="6" fill="var(--goud)"/>`;}return r;};
  s+=dots(14,58,lvL+18,200-lvL)+dots(4,240,lvR+18,200-lvR);
  if(i>=1)s+=`<text class="lbl" x="130" y="32" text-anchor="middle">hoge osmotische waarde</text><text class="lbl" x="310" y="32" text-anchor="middle">lage osmotische waarde</text>`;
  if(i===2||i===3)s+=`<path d="M262,150 L180,150" stroke="var(--teal)" stroke-width="3.5" marker-end="url(#h5os)"/><path d="M262,190 L180,190" stroke="var(--teal)" stroke-width="3.5" marker-end="url(#h5os)"/><text class="lbl" x="221" y="174" text-anchor="middle" style="fill:var(--teal)">water</text>`;
  s+=`<text class="tick" x="290" y="272"><tspan fill="var(--goud)">●</tspan> opgeloste stof</text>`;
  return SV("0 0 440 280",s,"Osmose door een halfdoorlatend membraan");
}
X.zet("havo26-1",[32],{titel:"Osmose, osmotische waarde en bloeddruk",
  html:`<p><b>Osmose</b> is de verplaatsing van water door een <b>halfdoorlatend membraan</b>: water kan erdoor, veel opgeloste stoffen niet.</p>
  <ul><li>De <b>osmotische waarde</b> van een oplossing hangt af van de concentratie opgeloste deeltjes. Meer deeltjes in minder water = hogere osmotische waarde.</li>
  <li>Water gaat netto naar de kant met de <b>hoogste osmotische waarde</b>.</li>
  <li>De <b>bloeddruk</b> hangt af van de pompkracht van het hart, de wijdte van de bloedvaten en de hoeveelheid bloed.</li></ul>`,
  anim:box=>X.stappen(box,[
    {cap:"Twee oplossingen, gescheiden door een membraan."},
    {cap:"Links zitten veel meer opgeloste deeltjes: links is de <b>osmotische waarde</b> hoger. Het membraan laat water door, de deeltjes niet."},
    {cap:"Water gaat door het membraan naar de kant met de hoogste osmotische waarde: <b>osmose</b>."},
    {cap:"Resultaat: links meer water (de concentratie daalt), rechts minder water (de concentratie stijgt)."}],
    (st,s,i)=>st.innerHTML=wrap(osmoseVat(i),460)),
  films:[["Diffusie en osmose","films/cellen/diffusie-osmose/index.html"],["Buizen onder druk","films/transport/2-buizen-onder-druk.html"]]});

/* ============================ havo26-2 · opgave 5 ============================ */

/* --- 30: antigenen, B-cellen, primaire en secundaire reactie --- */
function reactieSVG(i){
  const x0=50,y0=210;
  let s=`<line class="ax" x1="${x0}" y1="20" x2="${x0}" y2="${y0}"/><line class="ax" x1="${x0}" y1="${y0}" x2="460" y2="${y0}"/>
  <text class="tick" x="${x0-8}" y="30" text-anchor="end" transform="rotate(-90 ${x0-30} 110)" style="font-size:11px"></text>
  <text class="lblm" x="16" y="110" transform="rotate(-90 16 110)" text-anchor="middle">hoeveelheid antistof</text>
  <text class="lblm" x="255" y="236" text-anchor="middle">tijd</text>`;
  s+=`<path d="M70,${y0} L70,${y0+8}" stroke="var(--goud)" stroke-width="3"/><text class="tick" x="70" y="${y0+20}" text-anchor="middle">1e contact</text>`;
  if(i>=1)s+=`<path class="cv" d="M70,${y0} C110,${y0} 120,${y0-8} 140,${y0-40} C158,${y0-70} 176,${y0-46} 200,${y0-20} C220,${y0-8} 240,${y0-6} 260,${y0-6}"/><text class="lblm" x="150" y="${y0-82}" text-anchor="middle">primaire reactie</text>`;
  if(i===2)s+=`<text class="tick" x="230" y="${y0-14}">geheugencellen blijven</text>`;
  if(i>=3)s+=`<path d="M290,${y0} L290,${y0+8}" stroke="var(--goud)" stroke-width="3"/><text class="tick" x="290" y="${y0+20}" text-anchor="middle">2e contact</text>
    <path d="M260,${y0-6} L290,${y0-6} C300,${y0-30} 306,${y0-170} 330,${y0-178} C360,${y0-186} 390,${y0-150} 440,${y0-120}" fill="none" stroke="var(--koraal)" stroke-width="2.6"/><text class="lbl" x="350" y="${y0-192}" text-anchor="middle" style="fill:var(--koraal)">secundaire reactie</text>`;
  return SV("0 0 470 245",s,"Primaire en secundaire afweerreactie");
}
X.zet("havo26-2",[30],{titel:"Bloedgroepen, antigenen en de specifieke afweer",
  html:`<p>Op je rode bloedcellen zitten eiwitten en suikers die per persoon kunnen verschillen: de <b>bloedgroepantigenen</b> (zoals A, B en resus D). Je afweer reageert alleen op antigenen die je <b>zelf niet hebt</b>.</p>
  <ul><li>Bij het eerste contact herkent een <b>B-cel</b> met een passende receptor het antigeen en wordt <b>geactiveerd</b>. Hij deelt en vormt <b>plasmacellen</b> en <b>geheugencellen</b>.</li>
  <li>Plasmacellen geven <b>antistoffen</b> af aan het bloedplasma. Een antistof bindt aan het antigeen; zo kunnen rode bloedcellen aan elkaar <b>klonteren</b> (agglutinatie).</li>
  <li>Deze eerste (<b>primaire</b>) reactie is traag en zwak. Bij een volgend contact zorgen de geheugencellen voor een snelle, sterke <b>secundaire</b> reactie.</li></ul>
  <p>Daarom controleert men bij een transfusie of de bloedgroepen van donor en ontvanger passen.</p>`,
  anim:box=>X.stappen(box,[
    {cap:"Een lichaamsvreemd antigeen komt voor het eerst in het bloed."},
    {cap:"<b>Primaire reactie</b>: B-cellen worden geactiveerd en vormen plasmacellen. Het duurt dagen voordat er wat antistof is."},
    {cap:"De antistoffen verdwijnen weer, maar de <b>geheugencellen</b> blijven."},
    {cap:"<b>Secundaire reactie</b>: bij een tweede contact maken de geheugencellen snel veel plasmacellen, dus snel veel antistof."}],
    (st,s,i)=>st.innerHTML=wrap(reactieSVG(i))),
  films:[["Vaccins, allergie en bloedgroepen","films/afweer/4-vaccins-allergie-en-bloedgroepen.html"],["Antistoffen op maat","films/afweer/2-antistoffen-op-maat.html"]]});

/* extra waarom 30: wat er bij mevrouw Vel gebeurde */
function velSVG(i){
  const rbc=(x,y,vel,dim)=>`<ellipse cx="${x}" cy="${y}" rx="22" ry="16" fill="var(--koraal-soft)" stroke="var(--koraal)" stroke-width="1.8" opacity="${dim?.45:1}"/><ellipse cx="${x}" cy="${y}" rx="10" ry="6" fill="none" stroke="var(--koraal)" opacity="${dim?.3:.6}"/>`+
    (vel?[[0,-18],[20,-8],[20,8],[-20,8],[-20,-8],[0,18]].map(([dx,dy])=>`<rect x="${x+dx-3}" y="${y+dy-3}" width="6" height="6" fill="var(--groen)" transform="rotate(45 ${x+dx} ${y+dy})"/>`).join(""):"");
  const Y=(x,y,r=0)=>`<path d="M${x},${y+10} L${x},${y} L${x-7},${y-8} M${x},${y} L${x+7},${y-8}" stroke="var(--goud)" stroke-width="2.6" fill="none" stroke-linecap="round" transform="rotate(${r} ${x} ${y})"/>`;
  let s=`<rect x="6" y="6" width="468" height="228" rx="16" fill="none" stroke="var(--line2)"/><text class="lblm" x="18" y="26">bloed van mevrouw Vel (Vel-negatief)</text>`;
  s+=rbc(60,80,false)+rbc(110,120,false)+`<text class="tick" x="85" y="160" text-anchor="middle">eigen cellen: geen Vel-eiwit</text>`;
  if(i<=1||i>=3){const k=i===3;s+=rbc(k?300:260,k?120:80,true)+rbc(k?336:320,k?120:120,true)+`<text class="tick" x="300" y="${k?166:160}" text-anchor="middle">${i===3?"donorcellen, 2e transfusie":"donorcellen met Vel-eiwit"}</text>`;
    if(i===0)s+=`<rect x="370" y="60" width="9" height="9" fill="var(--groen)" transform="rotate(45 374 64)"/><text class="lbl" x="388" y="70" style="fill:var(--groen)">= antigeen</text>`;}
  if(i===1){s+=`<circle cx="200" cy="190" r="18" fill="var(--paars-soft)" stroke="var(--paars)" stroke-width="2"/><text class="lblm" x="200" y="226" text-anchor="middle">B-cel</text>
    <path d="M216,180 L240,96" stroke="var(--paars)" stroke-dasharray="4 4"/><text class="lbl" x="230" y="200" style="fill:var(--paars)">herkent het antigeen: geactiveerd</text>`;}
  if(i===2){s+=`<circle cx="230" cy="80" r="16" fill="var(--paars-soft)" stroke="var(--paars)" stroke-width="2"/><text class="tick" x="230" y="110" text-anchor="middle">plasmacel</text>
    <circle cx="380" cy="80" r="16" fill="var(--paars-soft)" stroke="var(--paars)" stroke-width="2" stroke-dasharray="4 3"/><text class="tick" x="380" y="110" text-anchor="middle">geheugencel</text>`+
    [[270,150],[310,180],[350,140],[400,180],[250,200]].map(([x,y],k)=>Y(x,y,k*25-40)).join("")+`<text class="lbl" x="330" y="222" text-anchor="middle" style="fill:var(--goud-text)">antistoffen in het bloedplasma</text>`;}
  if(i===3){s+=Y(318,96,0)+Y(318,146,180)+Y(282,96,-30)+Y(354,146,150)+`<text class="lbl" x="318" y="200" text-anchor="middle" style="fill:var(--koraal)">antistoffen binden: klontering</text>`;}
  return SV("0 0 480 240",s,"Bloedtransfusie bij mevrouw Vel");
}
X.waarom("havo26-2",30,box=>X.stappen(box,[
  {cap:"Mevrouw Vel heeft geen Vel-eiwit op haar rode bloedcellen; de donor wel. Voor haar is het Vel-eiwit een <b>antigeen</b>. <b>Isa: juist.</b>"},
  {cap:"<b>Eerste transfusie</b>: een B-cel met een passende receptor herkent het Vel-antigeen en wordt geactiveerd. <b>Mounir: juist.</b>"},
  {cap:"De B-cel vormt plasmacellen en geheugencellen. Plasmacellen geven antistoffen af aan het <b>bloedplasma</b>, niet aan rode bloedcellen. <b>Kate: onjuist.</b>"},
  {cap:"<b>Tweede transfusie</b>: de geheugencellen zorgen snel voor veel antistoffen. Die binden aan de Vel-antigenen van de donorcellen: de cellen klonteren."}],
  (st,s,i)=>st.innerHTML=wrap(velSVG(i))));

/* --- 31: van gen tot eiwit --- */
function eiwitSVG(i){
  const dna="TACGGACTT",mrna="AUGCCUGAA",aa=["Met","Pro","Glu"];
  let s=`<rect x="6" y="6" width="200" height="248" rx="60" fill="var(--paars-soft)" stroke="var(--paars)" stroke-width="1.4"/><text class="lblm" x="24" y="30">kern</text><text class="lblm" x="290" y="30">cytoplasma</text>`;
  /* DNA-matrijsstreng */
  dna.split("").forEach((b,k)=>s+=`<text x="${30+k*18}" y="${i>=1?70:100}" class="lbl" text-anchor="middle" style="font-family:var(--meta)">${b}</text>`);
  s+=`<text class="tick" x="30" y="${i>=1?52:82}">DNA (matrijs)</text>`;
  if(i===0)s+=`<text class="tick" x="30" y="130">een gen: een stuk DNA</text><text class="tick" x="30" y="144">met de code voor één eiwit</text>`;
  if(i>=1){const mx=i===1?30:250,my=i===1?96:110;
    mrna.split("").forEach((b,k)=>s+=`<text x="${mx+k*18}" y="${my}" class="lbl" text-anchor="middle" style="fill:var(--goud-text);font-family:var(--meta)">${b}</text>`);
    s+=`<text class="tick" x="${mx}" y="${my+18}">mRNA</text>`;
    if(i===1)s+=`<text class="tick" x="30" y="150">transcriptie:</text><text class="tick" x="30" y="164">A–U, T–A, C–G, G–C</text>`;
    if(i>=2){for(let k=0;k<3;k++)s+=`<rect x="${mx-8+k*54}" y="${my-16}" width="52" height="22" rx="4" fill="none" stroke="var(--goud)" stroke-width="${i===2||k<2?1.4:2.4}"/>`;
      s+=`<ellipse cx="${mx+72}" cy="${my+4}" rx="96" ry="34" fill="var(--teal-soft)" stroke="var(--teal)" opacity=".55"/><text class="lblm" x="${mx+170}" y="${my+40}">ribosoom</text>`;
      s+=`<text class="tick" x="${mx}" y="${my-24}">codons (3 basen)</text>`;}
    if(i>=3){aa.forEach((a,k)=>s+=`<circle cx="${mx+18+k*44}" cy="${my+92}" r="18" fill="var(--groen-soft)" stroke="var(--groen)" stroke-width="1.8"/><text class="lblm" x="${mx+18+k*44}" y="${my+96}" text-anchor="middle">${a}</text>`+(k<2?`<line x1="${mx+36+k*44}" y1="${my+92}" x2="${mx+44+k*44}" y2="${my+92}" stroke="var(--groen)" stroke-width="2"/>`:""));
      s+=`<text class="tick" x="${mx}" y="${my+128}">aminozuren, gekoppeld tot een keten</text>`;}
  }
  return SV("0 0 480 260",s,"Van DNA via mRNA naar een keten van aminozuren");
}
X.zet("havo26-2",[31],{titel:"Eiwitsynthese: van gen tot eiwit",
  html:`<p>Een <b>gen</b> is een stuk DNA met de code voor één eiwit. Het DNA blijft altijd in de <b>kern</b>.</p>
  <ul><li><b>Transcriptie</b>: in de kern wordt het gen afgelezen; er ontstaat een kopie van <b>mRNA</b> (met U in plaats van T).</li>
  <li>Het mRNA gaat via de kernporiën naar het <b>cytoplasma</b>.</li>
  <li><b>Translatie</b>: een <b>ribosoom</b> leest het mRNA per drie basen (een <b>codon</b>). tRNA-moleculen brengen de passende <b>aminozuren</b>, die aan elkaar worden gekoppeld tot een keten (polypeptide).</li>
  <li>Een eiwit werkt alleen in de juiste <b>ruimtelijke vorm</b>: de volgorde van de aminozuren bepaalt hoe de keten vouwt, en de vorm bepaalt de functie.</li></ul>`,
  anim:box=>X.stappen(box,[
    {cap:"Het gen ligt in de kern, als volgorde van basen in het DNA."},
    {cap:"<b>Transcriptie</b>: tegenover de matrijsstreng ontstaat mRNA. Tegenover A komt U, tegenover T komt A, C en G horen bij elkaar."},
    {cap:"Het mRNA gaat naar het cytoplasma. Een <b>ribosoom</b> leest het per <b>codon</b> van drie basen."},
    {cap:"<b>Translatie</b>: elk codon hoort bij één aminozuur (AUG = Met, CCU = Pro, GAA = Glu). Zo groeit de keten."}],
    (st,s,i)=>st.innerHTML=wrap(eiwitSVG(i))),
  films:[["Van DNA naar eiwit","films/dna/3-van-dna-naar-eiwit.html"],["De genetische code lezen","films/dna/4-de-genetische-code-lezen.html"]]});

/* --- 32: gel-elektroforese en genotype --- */
function gelSVG(i){
  const lanes=[["marker",[600,500,400,300,200]],["persoon 1",[500]],["persoon 2",[500,400]],["persoon 3",[400]]],lx=[110,200,290,380];
  const y=n=>60+(600-n)*0.42*(i>=2?1:i===1?0.45:0);
  let s=pijl("h5gl","var(--text)")+`<rect x="60" y="40" width="370" height="230" rx="6" fill="var(--surface2)" stroke="var(--text3)"/>
  <text class="lbl" x="470" y="52" text-anchor="middle">−</text><text class="lbl" x="470" y="272" text-anchor="middle">+</text>
  <path d="M470,62 L470,250" stroke="var(--text)" stroke-width="1.3" marker-end="url(#h5gl)"/>`;
  lanes.forEach(([n,b],k)=>{s+=`<rect x="${lx[k]-22}" y="46" width="44" height="8" fill="var(--surface)" stroke="var(--text3)"/><text class="lblm" x="${lx[k]}" y="32" text-anchor="middle" style="font-size:11px">${n}</text>`;
    if(i>=1)b.forEach(v=>s+=`<rect x="${lx[k]-22}" y="${y(v)-3}" width="44" height="6" rx="3" fill="${k===0?"var(--text2)":v===500?"var(--teal)":"var(--koraal)"}"/>`);});
  if(i===0)s+=`<text class="tick" x="245" y="160" text-anchor="middle">DNA-fragmenten in de putjes</text>`;
  if(i>=2)lanes[0][1].forEach(v=>s+=`<text class="tick" x="80" y="${y(v)+4}" text-anchor="end">${v}</text>`);
  if(i===3)[[200,"1 band:","homozygoot"],[290,"2 banden:","heterozygoot"],[380,"1 band:","homozygoot"]].forEach(([x,a,b])=>s+=`<text class="tick" x="${x}" y="236" text-anchor="middle">${a}</text><text class="tick" x="${x}" y="250" text-anchor="middle">${b}</text>`);
  return SV("0 0 490 300",s,"Gel-elektroforese van DNA-fragmenten");
}
X.zet("havo26-2",[32],{titel:"Gel-elektroforese en genotype",
  html:`<p>Met <b>gel-elektroforese</b> scheid je DNA-fragmenten op <b>lengte</b>.</p>
  <ul><li>DNA is negatief geladen. Onder stroom beweegt het door de gel naar de <b>pluspool</b>.</li>
  <li><b>Korte fragmenten</b> komen makkelijker door de gel en gaan dus <b>verder</b>; lange blijven dichter bij het putje.</li>
  <li>Elke <b>band</b> bestaat uit fragmenten van één lengte. Een marker of controle met bekende lengtes helpt bij het aflezen.</li>
  <li>Verschillen twee allelen in lengte, dan zie je bij een <b>homozygoot</b> één band en bij een <b>heterozygoot</b> twee banden.</li></ul>
  <p>Uit de banden lees je dus het <b>genotype</b> af. Welk fenotype daarbij hoort, hangt af van welk allel dominant is.</p>`,
  anim:box=>X.stappen(box,[
    {cap:"De DNA-fragmenten gaan in putjes aan de kant van de minpool."},
    {cap:"De stroom gaat aan: het negatief geladen DNA beweegt naar de <b>pluspool</b>."},
    {cap:"Kleinere fragmenten gaan sneller en dus verder. De marker geeft de lengtes (in nucleotiden)."},
    {cap:"Een gen met twee allelen van 500 en 400 nucleotiden: één band = <b>homozygoot</b>, twee banden = <b>heterozygoot</b>."}],
    (st,s,i)=>st.innerHTML=wrap(gelSVG(i))),
  films:[["Op lengte gesorteerd · gelelektroforese","films/dna-technieken/2-op-lengte-gesorteerd/index.html"],["Monohybride kruisingen","films/erfelijkheid/2-monohybride-kruisingen.html"]]});

})();
/* ===== h6.js ===== */
(function(){
"use strict";
/* Opgave 6 in beide examens: havo26-1 Giraffen (33–35), havo26-2 Katten (33–39) */
const E=window.EXSTOF;
const T=(x,y,s,cls="lbl",a="start",sty="")=>`<text class="${cls}" x="${x}" y="${y}" text-anchor="${a}"${sty?` style="${sty}"`:""}>${s}</text>`;
const L=(x1,y1,x2,y2,sty)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="${sty||"stroke:var(--text);stroke-width:2"}"/>`;
const R=(x,y,w,h,sty,rx=6)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" style="${sty}"/>`;
const C=(cx,cy,r,sty)=>`<circle cx="${cx}" cy="${cy}" r="${r}" style="${sty}"/>`;
const pijl=(x1,y,x2,kl="var(--text2)")=>L(x1,y,x2-8,y,`stroke:${kl};stroke-width:2`)+`<path d="M${x2-9},${y-5} L${x2},${y} L${x2-9},${y+5} Z" style="fill:${kl}"/>`;
const sup=a=>`t<tspan baseline-shift="super" style="font-size:70%">${a}</tspan>`;
/* klik-animatie: steps [{cap,...}], draw(step,i) -> inhoud van de svg */
const anim=(vb,lab,steps,draw)=>box=>E.stappen(box,steps,(stg,s,i)=>{stg.innerHTML=E.svg(vb,draw(s,i),lab);});
const F={
  mut:["Mutaties","films/dna/5-mutaties.html"],
  eiwit:["Van DNA naar eiwit","films/dna/3-van-dna-naar-eiwit.html"],
  watdna:["Wat is DNA?","films/dna/1-wat-is-dna.html"],
  code:["De genetische code lezen","films/dna/4-de-genetische-code-lezen.html"],
  soort:["Hoe één soort er twee wordt","films/evolutie/6-hoe-een-soort-er-twee-wordt.html"],
  boom:["Stambomen lezen","films/evolutie/8-stambomen-lezen.html"],
  versneld:["Alles versneld","films/stofwisseling/1-alles-versneld.html"],
  mono:["Monohybride kruisingen","films/erfelijkheid/2-monohybride-kruisingen.html"],
  voorbij:["Voorbij dominant en recessief","films/erfelijkheid/3-voorbij-dominant-en-recessief.html"],
  aanuit:["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"]
};

/* ====================== havo26-1 · opgave 6 Giraffen ====================== */

/* --- 33: coderend en niet-coderend DNA, mutaties --- */
const GENEN=[[70,150],[250,330],[420,490]];
function dnaStrook(y,muts,o={}){
  let s=L(20,y,540,y,"stroke:var(--text3);stroke-width:3");
  GENEN.forEach(([a,b],k)=>{s+=R(a,y-13,b-a,26,`fill:var(--teal-soft);stroke:var(--teal);stroke-width:${o.genen?2:1.2}`,4);
    if(o.genen)s+=T((a+b)/2,y+4,"gen "+(k+1),"lbl","middle","font-size:11px");});
  muts.forEach(x=>{const inGen=GENEN.some(([a,b])=>x>=a&&x<=b);
    s+=C(x,y,6,`fill:var(--koraal);stroke:var(--surface2);stroke-width:1.5`);
    if(o.soort)s+=L(x,y+9,x,y+16,`stroke:${inGen?"var(--koraal)":"var(--text3)"};stroke-width:1.5`);});
  return s;}
E.zet("havo26-1",[33],{titel:"DNA: coderend, niet-coderend en mutaties",
  html:`<p>Het DNA in een chromosoom bestaat uit <b>genen</b> met stukken DNA ertussen. Een gen bevat de code voor één eiwit: dat is <b>coderend DNA</b>. Bij de mens is maar zo'n 2% van het DNA coderend. De rest heet <b>niet-coderend DNA</b>: een deel regelt wanneer genen aan of uit staan, van veel ervan is de functie onbekend.</p>
<ul><li>Een <b>mutatie</b> is een blijvende verandering in de basevolgorde van het DNA, bijvoorbeeld door een kopieerfout bij de DNA-replicatie, door straling of door chemische stoffen.</li>
<li>Mutatie in een gen: het eiwit kan veranderen of niet meer werken. Dan kan het <b>fenotype</b> veranderen, en daar kan natuurlijke selectie op werken.</li>
<li>Mutatie in niet-coderend DNA: meestal heeft die geen gevolg voor het fenotype.</li>
<li>Alleen mutaties in de geslachtscellen gaan over op de nakomelingen.</li></ul>`,
  anim:anim("0 0 560 150","Stuk DNA met genen en mutaties",[
    {cap:"Een stuk DNA uit een chromosoom: een lange rij basen."},
    {g:1,cap:"Op een paar plekken ligt een <b>gen</b> (coderend DNA). Daartussen ligt <b>niet-coderend DNA</b>, en dat is het grootste deel."},
    {g:1,m:[110],cap:"Een mutatie in een gen: het afgelezen eiwit kan anders worden. Misschien zie je dat aan het organisme."},
    {g:1,m:[110,205],cap:"Een mutatie in niet-coderend DNA: er verandert geen eiwit, dus meestal merk je er niets van."}],
    (s)=>{let g=dnaStrook(60,s.m||[],{genen:s.g});
      if(s.m&&s.m.includes(110))g+=L(110,76,110,100,"stroke:var(--koraal);stroke-width:1.5")+T(110,118,"eiwit kan veranderen","lblbad","middle");
      if(s.m&&s.m.includes(205))g+=L(205,76,205,100,"stroke:var(--text3);stroke-width:1.5")+T(205,118,"meestal geen gevolg","lblm","middle");
      if(s.g)g+=T(200,30,"niet-coderend DNA","lblm","middle")+L(200,35,200,52,"stroke:var(--text3);stroke-width:1");
      return g;}),
  films:[F.mut,F.eiwit]});
E.waarom("havo26-1",33,anim("0 0 560 200","Mutaties stapelen zich op in twee gescheiden populaties",[
  {n:0,cap:"Eerst was er één giraffenpopulatie. Alle giraffen hebben (bijna) hetzelfde DNA."},
  {n:2,b:1,cap:"De populaties raken gescheiden: er is geen voortplanting meer tussen Nog en Zug. In elke populatie ontstaan <b>eigen mutaties</b>, op toevallige plekken."},
  {n:5,b:1,cap:"Miljoenen jaren later. De mutaties zijn doorgegeven en opgestapeld. Ze zitten in de genen (coderend DNA) én in het DNA ertussen (niet-coderend)."},
  {n:5,b:1,c:1,cap:"Vergelijk je het DNA, dan vind je dus verschillen in <b>coderend én niet-coderend DNA</b>. Die in de genen zie je soms terug in het uiterlijk, zoals het vlekkenpatroon."}],
  (s)=>{const A=[110,205,455,300,40],B=[380,125,520,195,265];
    let g=T(20,30,"noordelijke giraf (Nog)","lbl")+dnaStrook(60,A.slice(0,s.n),{soort:s.c});
    g+=T(20,120,"zuidelijke giraf (Zug)","lbl")+dnaStrook(150,B.slice(0,s.n),{soort:s.c});
    if(s.b)g+=L(20,95,540,95,"stroke:var(--goud);stroke-width:2;stroke-dasharray:6 5")+T(540,90,"geen voortplanting meer","lblm","end");
    if(s.c)g+=R(330,176,10,10,"fill:var(--koraal-soft);stroke:var(--koraal)",2)+T(346,185,"in een gen","lblm")+R(430,176,10,10,"fill:none;stroke:var(--text3)",2)+T(446,185,"ertussen","lblm");
    return g;}));

/* --- 34: soortbegrip en soortvorming --- */
const POP=[[60,60],[90,90],[120,55],[140,100],[80,125],[170,70],[200,110],[230,60],[260,95],[300,70],[320,120],[350,55],[380,95],[410,70],[440,115],[470,60],[500,100],[220,135],[400,135],[150,140]];
E.zet("havo26-1",[34],{titel:"Wat is een soort? En hoe ontstaat een nieuwe soort?",
  html:`<p>Een <b>soort</b> is een groep organismen die onder natuurlijke omstandigheden samen <b>vruchtbare nakomelingen</b> kan krijgen. Uiterlijk zegt dus niet alles: een chihuahua en een herdershond zijn één soort, terwijl twee vogelsoorten soms bijna gelijk zijn.</p>
<p>Een paard en een ezel krijgen samen een muilezel, maar die is onvruchtbaar. Paard en ezel zijn dus twee soorten.</p>
<p><b>Soortvorming</b> gaat vaak zo: een populatie raakt gescheiden, bijvoorbeeld door een rivier of gebergte (<b>geografische isolatie</b>). Er is dan geen uitwisseling van genen meer. Door mutaties, natuurlijke selectie en toeval gaan de groepen steeds meer verschillen. Na lange tijd kunnen ze zich niet meer met elkaar voortplanten: dat heet <b>reproductieve isolatie</b>. Dan zijn het twee soorten.</p>`,
  anim:anim("0 0 560 180","Soortvorming in stappen",[
    {k:0,cap:"Eén populatie: alle dieren kunnen zich met elkaar voortplanten."},
    {k:1,cap:"Een barrière (hier een rivier) deelt de populatie in tweeën. Er gaan geen genen meer over en weer."},
    {k:2,cap:"Aan elke kant ontstaan andere mutaties en werkt selectie anders. De groepen gaan verschillen."},
    {k:3,cap:"De barrière verdwijnt, maar de dieren krijgen samen geen vruchtbare jongen meer: <b>reproductieve isolatie</b>. Het zijn nu twee soorten."}],
    (s)=>{let g="";
      if(s.k===1||s.k===2)g+=`<path d="M285,10 C265,60 305,110 280,170" style="fill:none;stroke:var(--teal);stroke-width:14;stroke-opacity:.45;stroke-linecap:round"/>`;
      POP.forEach(([x,y])=>{const links=x<285;
        const kl=s.k>=2?(links?"var(--goud)":"var(--paars)"):"var(--text2)";
        const r=s.k>=2&&!links?9:7;
        const xx=s.k===3?(links?x+25:x-25):x;
        g+=C(xx,y,r,`fill:${kl};fill-opacity:.75`);});
      if(s.k===3)g+=T(280,172,"geen vruchtbare nakomelingen","lblbad","middle")+`<path d="M266,82 l28,28 M294,82 l-28,28" style="stroke:var(--koraal);stroke-width:3"/>`;
      return g;}),
  films:[F.soort]});
E.waarom("havo26-1",34,anim("0 0 560 170","Kruisingsproef om te testen of twee populaties één soort zijn",[
  {k:0,cap:"Gebruik het soortbegrip als test: laat een giraf uit de ene populatie paren met een giraf uit de andere (bijvoorbeeld in een dierentuin)."},
  {k:1,cap:"Krijgen ze <b>geen nakomelingen</b>, of zijn de jongen <b>onvruchtbaar</b>? Dan horen ze bij verschillende soorten."},
  {k:2,cap:"Krijgen ze jongen die later zelf weer jongen kunnen krijgen? Dan zijn het dezelfde soort."}],
  (s)=>{let g=R(20,20,150,44,"fill:var(--goud-soft);stroke:var(--goud)")+T(95,47,"giraf uit populatie 1","lbl","middle")
      +R(20,96,150,44,"fill:var(--paars-soft,var(--surface));stroke:var(--paars)")+T(95,123,"giraf uit populatie 2","lbl","middle")
      +L(170,42,210,80,"stroke:var(--text2);stroke-width:2")+L(170,118,210,80,"stroke:var(--text2);stroke-width:2")+T(222,85,"×","lbl","middle","font-size:22px")+pijl(238,80,290);
    if(s.k===0)g+=T(300,85,"jongen?","lbl","start","font-size:16px");
    if(s.k===1)g+=R(298,52,240,56,"fill:var(--koraal-soft);stroke:var(--koraal)")+T(418,76,"geen of onvruchtbare jongen","lbl","middle")+T(418,96,"→ verschillende soorten","lblbad","middle");
    if(s.k===2)g+=R(298,52,240,56,"fill:var(--teal-soft);stroke:var(--teal)")+T(418,76,"vruchtbare jongen","lbl","middle")+T(418,96,"→ dezelfde soort","lbl","middle","fill:var(--teal)");
    return g;}));

/* --- 35: stambomen lezen --- */
/* boom: tips {naam:x}, takken als lijnen */
function boomMens(o){
  const tip={mens:70,chimpansee:180,gorilla:300,"orang-oetan":420};
  if(o.om){tip.mens=180;tip.chimpansee=70;}
  let g="";Object.entries(tip).forEach(([n,x])=>g+=T(x,26,n,"lbl","middle"));
  const st="stroke:var(--text);stroke-width:2.2";
  g+=L(tip.mens,34,125,100,o.hl?"stroke:var(--teal);stroke-width:3":st)+L(tip.chimpansee,34,125,100,o.hl?"stroke:var(--teal);stroke-width:3":st);
  g+=L(125,100,190,150,st)+L(300,34,190,150,st)+L(190,150,280,200,st)+L(420,34,280,200,st)+L(280,200,280,222,st);
  if(o.knoop)g+=C(125,100,8,"fill:var(--goud)")+T(114,124,"laatste voorouder","lblm","end")+T(114,139,"mens en chimpansee","lblm","end");
  if(o.ver)g+=C(190,150,8,"fill:var(--paars)")+T(178,172,"laatste voorouder","lblm","end")+T(178,187,"mens en gorilla","lblm","end");
  g+=L(530,40,530,215,"stroke:var(--text3);stroke-width:1.2")+T(536,48,"nu","tick")+T(536,215,"vroeger","tick");
  return g;}
E.zet("havo26-1",[35],{titel:"Evolutionaire stambomen lezen",
  html:`<p>Een <b>evolutionaire stamboom</b> laat zien hoe soorten van elkaar afstammen.</p>
<ul><li>De uiteinden van de takken zijn soorten: nu levend of uitgestorven.</li>
<li>Op een <b>splitsingspunt</b> lag de laatste <b>gemeenschappelijke voorouder</b> van alle soorten erboven.</li>
<li>Twee soorten zijn <b>nauwer verwant</b> naarmate hun gemeenschappelijke voorouder recenter leefde, dus hoe dichter het splitsingspunt bij de uiteinden ligt.</li>
<li>Je mag takken om een splitsingspunt draaien: de volgorde van de namen naast elkaar zegt niets, alleen de splitsingen tellen.</li></ul>
<p>Hoe weet je de verwantschap? Hoe minder verschillen in DNA (of in eiwitten), hoe korter geleden de soorten uit elkaar gingen.</p>`,
  anim:anim("0 0 600 232","Stamboom van mensachtigen",[
    {cap:"Een stamboom van vier mensachtigen. Onderaan ligt de oudste voorouder, bovenaan de soorten van nu."},
    {knoop:1,hl:1,cap:"Mens en chimpansee hebben een splitsingspunt dat dicht bij nu ligt: hun gemeenschappelijke voorouder leefde zo'n 6–7 miljoen jaar geleden."},
    {knoop:1,ver:1,cap:"Mens en gorilla komen pas verder terug samen. De mens is dus nauwer verwant aan de chimpansee dan aan de gorilla."},
    {om:1,knoop:1,cap:"Mens en chimpansee zijn omgedraaid. Het is <b>dezelfde stamboom</b>: de splitsingspunten zijn niet veranderd."}],
    (s)=>boomMens(s)),
  films:[F.boom]});
E.waarom("havo26-1",35,anim("0 0 560 230","Stamboom B stap voor stap opgebouwd",[
  {k:0,cap:"Begin met de vier giraffensoorten. Uit de tekst: Neg en Nog hebben de minste verschillen in DNA."},
  {k:1,cap:"Neg en Nog krijgen dus samen het <b>laatste</b> splitsingspunt: ze hebben de meest recente gemeenschappelijke voorouder."},
  {k:2,cap:"Mag is meer verwant aan Zug dan aan Neg en Nog. Mag en Zug krijgen dus ook een eigen splitsingspunt."},
  {k:3,cap:"De twee paren komen daaronder samen, en nog verder terug Samotherium. Dat is stamboom <b>B</b>. In A hoort Mag bij het Neg-Nog-paar, in C hoort Nog bij Mag en Zug: die kloppen niet met de tekst."}],
  (s)=>{const X={Neg:80,Nog:180,Mag:310,Zug:410};let g="";
    Object.entries(X).forEach(([n,x])=>g+=T(x,26,n,"lbl","middle","font-size:15px"));
    const te="stroke:var(--teal);stroke-width:3",go="stroke:var(--goud);stroke-width:3",zw="stroke:var(--text);stroke-width:2.2";
    if(s.k>=1)g+=L(80,36,130,100,te)+L(180,36,130,100,te)+C(130,100,6,"fill:var(--teal)");
    if(s.k>=2)g+=L(310,36,360,100,go)+L(410,36,360,100,go)+C(360,100,6,"fill:var(--goud)");
    if(s.k>=3)g+=L(130,100,245,165,zw)+L(360,100,245,165,zw)+L(245,165,300,205,zw)+L(510,36,300,205,"stroke:var(--text3);stroke-width:2")+T(510,26,"Samotherium","lblm","middle")+L(300,205,300,225,zw);
    return g;}));

/* ====================== havo26-2 · opgave 6 Katten ====================== */

/* --- 33: enzym, substraat, product --- */
const enzymVorm=(x,y,kl,kapot)=>kapot
  ?`<path d="M${x-50},${y+30} C${x-62},${y-10} ${x-30},${y-30} ${x-8},${y-22} C${x+10},${y-40} ${x+40},${y-26} ${x+52},${y} C${x+62},${y+24} ${x+30},${y+44} ${x},${y+36} C${x-20},${y+50} ${x-44},${y+46} ${x-50},${y+30} Z" style="fill:${kl}-soft);stroke:${kl});stroke-width:2"/>`
  :`<path d="M${x-50},${y-30} L${x-14},${y-30} L${x-14},${y-6} L${x+14},${y-6} L${x+14},${y-30} L${x+50},${y-30} L${x+50},${y+30} L${x-50},${y+30} Z" style="fill:${kl}-soft);stroke:${kl});stroke-width:2"/>`;
E.zet("havo26-2",[33],{titel:"Enzymen: substraat, enzym en product",
  html:`<p>Een <b>enzym</b> is een eiwit dat een reactie in een cel versnelt (een biokatalysator). Het enzym zelf wordt daarbij niet verbruikt en kan steeds opnieuw werken.</p>
<ul><li>Het <b>substraat</b> is de stof waarop het enzym inwerkt: de beginstof.</li>
<li>Het substraat past precies in de <b>actieve plaats</b> van het enzym. Daardoor werkt elk enzym maar op één soort substraat: het enzym is <b>specifiek</b>.</li>
<li>Het enzym zet het substraat om in een of meer <b>producten</b>.</li>
<li>Voorbeeld: het enzym amylase breekt het substraat zetmeel af; het product is maltose.</li></ul>`,
  anim:anim("0 0 560 170","Enzym zet substraat om in product",[
    {k:0,cap:"Een enzym met een <b>actieve plaats</b>, en een substraatmolecuul dat daar precies in past."},
    {k:1,cap:"Het substraat bindt in de actieve plaats: het <b>enzym-substraatcomplex</b>."},
    {k:2,cap:"Het enzym zet het substraat om. De <b>producten</b> komen los."},
    {k:3,cap:"Het enzym is onveranderd en pakt het volgende substraatmolecuul. Zo kan één enzym duizenden reacties per seconde versnellen."}],
    (s)=>{let g=enzymVorm(200,110,"var(--teal")+T(200,160,"enzym","lbl","middle");
      const sub=(x,y)=>R(x-14,y-12,28,24,"fill:var(--goud);stroke:var(--goud-text)",3);
      if(s.k===0)g+=sub(200,30)+T(225,34,"substraat","lbl")+`<path d="M200,48 L200,70" style="stroke:var(--text3);stroke-dasharray:4 3"/>`;
      if(s.k===1)g+=sub(200,92)+T(260,70,"enzym-substraatcomplex","lblm");
      if(s.k===2)g+=R(342,40,16,24,"fill:var(--koraal);stroke:var(--koraal)",3)+R(392,62,16,24,"fill:var(--koraal);stroke:var(--koraal)",3)+T(400,110,"producten","lbl","middle")+pijl(270,70,330);
      if(s.k===3)g+=sub(110,30)+pijl(130,40,180)+T(400,100,"enzym blijft","lblm","middle")+T(400,116,"hetzelfde","lblm","middle");
      return g;}),
  films:[F.versneld]});
E.waarom("havo26-2",33,anim("0 0 500 110","Reactie 1 ontleed",[
  {k:0,cap:"Reactie 1 uit het examen."},
  {k:1,cap:"Vóór de pijl staat de beginstof waarop het enzym inwerkt: <b>tyrosine is het substraat</b>."},
  {k:2,cap:"Boven de pijl staat wat de reactie versnelt maar niet verbruikt wordt (let op <i>-ase</i>): <b>tyrosinase is het enzym</b>. Dopaquinine is het product. Melanine komt pas later, na vervolgreacties."}],
  (s)=>{let g=T(20,60,"tyrosine","lbl","start","font-size:16px")+pijl(100,55,260,"var(--text)")+T(180,42,"tyrosinase","lbl","middle","font-size:15px")+T(272,60,"dopaquinine","lbl","start","font-size:16px");
    if(s.k>=1)g+=R(12,38,84,32,"fill:none;stroke:var(--goud);stroke-width:2.4")+T(54,92,"substraat","lbl","middle","fill:var(--goud-text)");
    if(s.k>=2)g+=R(134,22,92,28,"fill:none;stroke:var(--teal);stroke-width:2.4")+T(180,14,"enzym","lbl","middle","fill:var(--teal)")+T(320,92,"product","lblm","middle");
    return g;}));

/* --- 34: DNA en RNA --- */
const PAAR={A:"T",T:"A",C:"G",G:"C"},RNA={A:"U",T:"A",C:"G",G:"C"};
const BKL={A:"var(--teal)",T:"var(--goud)",U:"var(--koraal)",C:"var(--paars)",G:"var(--groen)"};
const base=(x,y,b,sterk)=>R(x-13,y-13,26,26,`fill:${BKL[b]};fill-opacity:${sterk?.35:.18};stroke:${BKL[b]};stroke-width:1.5`,4)+T(x,y+5,b,"lbl","middle","font-size:14px");
E.zet("havo26-2",[34],{titel:"DNA en RNA: de verschillen",
  html:`<p>DNA en RNA zijn allebei <b>nucleïnezuren</b>: lange ketens van nucleotiden. Elke nucleotide heeft een suiker, een fosfaatgroep en een base. Toch verschillen ze:</p>
<ul><li><b>DNA</b>: dubbelstrengs (de dubbele helix), suiker <b>desoxyribose</b>, basen A, <b>T</b>, C en G. Blijft in de celkern.</li>
<li><b>RNA</b>: enkelstrengs, suiker <b>ribose</b>, basen A, <b>U</b> (uracil), C en G. In RNA vervangt U de base T.</li></ul>
<p>Bij de <b>transcriptie</b> wordt een gen overgeschreven in mRNA: tegenover A in het DNA komt U, tegenover T komt A, tegenover C komt G en tegenover G komt C. Het mRNA gaat naar de ribosomen, waar het per drie basen (een <b>codon</b>) wordt afgelezen bij de <b>translatie</b>.</p>`,
  anim:anim("0 0 560 200","Transcriptie: van DNA naar mRNA",[
    {k:0,cap:"Een stukje DNA: twee strengen met baseparen. A past bij T, C past bij G."},
    {k:1,cap:"Bij de transcriptie gaan de strengen hier even uit elkaar. Eén streng is de mal."},
    {k:2,cap:"Tegenover de mal worden RNA-nucleotiden gezet. Let op: tegenover A komt geen T maar <b>U</b>."},
    {k:3,cap:"Het mRNA laat los en gaat naar een ribosoom. De codons worden afgelezen per drie basen."}],
    (s)=>{const mal="TACGAAGTC".split("");let g="";
      mal.forEach((b,i)=>{const x=60+i*52;const dy=s.k>=1?20:0;
        g+=base(x,40-dy,PAAR[b])+base(x,90+dy,b);
        if(s.k===0)g+=L(x,54,x,76,"stroke:var(--line2);stroke-width:2");
        if(s.k>=2)g+=base(x,s.k===3?175:150,RNA[b],true);});
      g+=T(20,s.k>=1?24:44,"DNA","lblm","end")+T(548,s.k>=1?115:95,"mal","lblm","end");
      if(s.k>=2)g+=T(548,s.k===3?180:155,"mRNA","lbl","end","fill:var(--koraal)");
      if(s.k===3)[0,1,2].forEach(c=>g+=R(60+c*156-20,158,146,34,"fill:none;stroke:var(--text3);stroke-dasharray:4 3",6));
      return g;}),
  films:[F.eiwit,F.watdna]});
E.waarom("havo26-2",34,anim("0 0 600 110","Basen in de tabel bekeken",[
  {k:0,cap:"De eerste zes codons van het wildtype uit de tabel."},
  {k:1,cap:"Zoek de <b>U</b>: die zit in bijna elk codon (rood omlijnd)."},
  {k:2,cap:"Een <b>T</b> komt in de hele tabel niet voor. U komt alleen in RNA voor, dus dit is <b>RNA</b>. Dat past ook: codons met aminozuren eronder lees je af van het mRNA."}],
  (s)=>{const cod=["AGG","CUC","CCC","UCC","UCU","GCU"];let g="";
    cod.forEach((c,k)=>[...c].forEach((b,j)=>{const x=40+k*92+j*26;
      g+=R(x-12,30,24,30,b==="U"&&s.k>=1?"fill:var(--koraal-soft);stroke:var(--koraal);stroke-width:2.2":"fill:none;stroke:var(--line2)",4)+T(x,51,b,"lbl","middle","font-size:15px");}));
    if(s.k===2)g+=T(300,92,"geen T, wel U  →  RNA","lbl","middle","font-size:16px");
    return g;}));

/* --- 35: mutaties en het leesraam (vraag heeft al een animatie) --- */
const ORG="DIEKATZAGHETHOLVANDIERAT";
function zin(letters,o={}){let g="";const n=letters.length;
  for(let i=0;i<n;i+=3){const x=20+(i/3)*62;const w=letters.slice(i,i+3);
    const fout=w!==ORG.slice(i,i+3);
    g+=R(x,o.y-22,56,32,fout?"fill:var(--koraal-soft);stroke:var(--koraal)":"fill:none;stroke:var(--line2)",5)+T(x+28,o.y,w,"lbl","middle","font:600 16px var(--meta)");}
  return g;}
E.zet("havo26-2",[35],{titel:"Mutaties, codons en het leesraam",
  html:`<p>Het mRNA wordt bij de translatie afgelezen in groepjes van drie basen: <b>codons</b>. Elk codon staat voor één aminozuur. Het ribosoom begint bij het <b>startcodon</b> (AUG) en stopt bij een <b>stopcodon</b> (UAA, UAG of UGA): daar hoort geen aminozuur bij en komt het eiwit los.</p>
<ul><li><b>Substitutie</b>: één base is vervangen door een andere. Hooguit één codon verandert, en soms zelfs niet het aminozuur.</li>
<li><b>Deletie</b> (een base valt weg) of <b>insertie</b> (een base komt erbij): alle basen daarna schuiven op. Het <b>leesraam</b> verschuift, dus alle codons daarna worden anders.</li></ul>
<p>Vergelijk het met een zin van woorden van drie letters: haal één letter weg en de rest wordt onzin.</p>`,
  anim:anim("0 0 600 120","Zin van drieletterwoorden als model voor codons",[
    {s:"DIEKATZAGHETHOLVANDIERAT",cap:"Een 'gen' als zin van woorden van drie letters. Je leest steeds drie letters, zonder spaties."},
    {s:"DIEMATZAGHETHOLVANDIERAT",cap:"<b>Substitutie</b>: de K is vervangen door een M. Alleen dat ene woord verandert."},
    {s:"DIEATZAGHETHOLVANDIERAT",cap:"<b>Deletie</b>: de K is weggevallen. Je leest nog steeds per drie, dus vanaf daar is elk 'woord' anders: het leesraam is verschoven."},
    {s:"DIEKAATZAGHETHOLVANDIERAT",cap:"<b>Insertie</b>: er komt een A bij. Ook dan schuift alles op en verandert elk woord daarna."}],
    (s)=>zin(s.s,{y:60})),
  films:[F.mut,F.code]});

/* --- 36: van gen naar kenmerk, dominant en recessief --- */
const keten=["allel","mRNA","enzym","pigment","kenmerk"];
E.zet("havo26-2",[36],{titel:"Van gen naar kenmerk: dominant en recessief",
  html:`<p>Een <b>gen</b> bevat de code voor een eiwit. Vaak is dat eiwit een <b>enzym</b> dat een stof maakt, en die stof bepaalt een kenmerk (bijvoorbeeld een pigment voor de kleur).</p>
<ul><li>Van elk gen heb je twee <b>allelen</b>: één van je vader, één van je moeder. Zijn ze gelijk, dan ben je <b>homozygoot</b>; zijn ze verschillend, dan ben je <b>heterozygoot</b>.</li>
<li>Het <b>genotype</b> is je combinatie van allelen; het <b>fenotype</b> is wat je ervan ziet.</li>
<li>Een <b>dominant</b> allel komt bij een heterozygoot tot uiting, een <b>recessief</b> allel alleen als het dubbel aanwezig is. Notatie: hoofdletter = dominant (A), kleine letter = recessief (a).</li>
<li>Een recessief allel is vaak een gemuteerde versie waarvan het eiwit niet (goed) werkt.</li></ul>`,
  anim:anim("0 0 600 130","Van allel naar kenmerk",[
    {k:1,cap:"Voorbeeld: bloemkleur. Het allel voor rood ligt in de celkern."},
    {k:2,cap:"Het allel wordt overgeschreven in mRNA (transcriptie)."},
    {k:3,cap:"Bij de ribosomen wordt het mRNA vertaald in een eiwit (translatie): hier een enzym."},
    {k:4,cap:"Het enzym zet een stof om in rood pigment."},
    {k:5,cap:"Het pigment geeft de bloem haar kleur: het fenotype. Elke schakel is nodig voor het kenmerk."}],
    (s)=>{let g="";keten.forEach((n,i)=>{const x=20+i*118;const aan=i<s.k;
      g+=R(x,40,92,44,aan?"fill:var(--teal-soft);stroke:var(--teal);stroke-width:2":"fill:none;stroke:var(--line2);stroke-dasharray:4 3")+T(x+46,67,n,aan?"lbl":"lblm","middle","font-size:14px");
      if(i<4)g+=pijl(x+94,62,x+116,i<s.k-1?"var(--text)":"var(--line2)");});
      if(s.k===5)g+=C(552,108,9,"fill:var(--koraal)")+T(536,112,"rode bloem","lbl","end");
      return g;}),
  films:[F.mono,F.eiwit]});
E.waarom("havo26-2",36,anim("0 0 600 200","Huidcel van een heterozygote kat",[
  {k:0,cap:"Een huidcel van een heterozygote kat (Tt): in de kern ligt allel <b>T</b> en allel <b>t</b>."},
  {k:1,cap:"Allel T wordt afgelezen: de cel maakt <b>werkzame tyrosinase</b>. Allel t levert geen werkzaam enzym (gestippeld)."},
  {k:2,cap:"De werkzame tyrosinase zet tyrosine om in dopaquinine, en via vervolgreacties ontstaat <b>melanine</b>."},
  {k:3,cap:"Er is melanine, dus de vacht is <b>donker</b>. Eén allel T levert al genoeg enzym: daarom is T dominant. Bij tt is er geen werkzame tyrosinase, geen melanine: een albino."}],
  (s)=>{let g=`<ellipse cx="300" cy="100" rx="285" ry="92" style="fill:var(--surface);stroke:var(--line2);stroke-width:1.5"/>`+C(90,100,52,"fill:var(--surface2);stroke:var(--text3);stroke-width:1.5")+T(90,40,"kern","tick","middle");
    g+=R(58,70,64,20,"fill:var(--teal-soft);stroke:var(--teal)",4)+T(90,85,"T","lbl","middle")+R(58,110,64,20,"fill:none;stroke:var(--koraal);stroke-dasharray:4 3",4)+T(90,125,"t","lbl","middle");
    if(s.k>=1){g+=pijl(124,80,170)+enzymVorm(225,80,"var(--teal")+T(225,124,"tyrosinase","lbl","middle","font-size:11px");
      g+=pijl(124,120,190,"var(--koraal)")+T(200,160,"geen werkzaam enzym","lblbad","start","font-size:11px");}
    if(s.k>=2)g+=T(300,60,"tyrosine","lbl")+pijl(358,56,400)+T(404,60,"dopaquinine","lbl")+L(440,68,440,92,"stroke:var(--text2);stroke-width:2")+T(404,110,"melanine","lbl");
    if(s.k>=2)[[470,128],[490,140],[510,124],[530,140],[500,156]].forEach(([x,y])=>g+=C(x,y,6,"fill:var(--text);fill-opacity:.75"));
    if(s.k>=3)g+=T(500,180,"donkere vacht","lbl","middle");
    return g;}));

/* --- 37: enzymactiviteit en temperatuur --- */
const kromme=(top,w)=>{let d="";for(let t=0;t<=80;t+=2){const v=t<=top?Math.pow(t/top,1.8):Math.max(0,1-Math.pow((t-top)/w,2));d+=(t?"L":"M")+(60+t*5.5).toFixed(1)+","+(170-v*130).toFixed(1);}return d;};
const assen=()=>L(60,170,520,170,"stroke:var(--text3);stroke-width:1.2")+L(60,170,60,30,"stroke:var(--text3);stroke-width:1.2")+T(520,197,"temperatuur (°C)","tick","end")+T(66,24,"enzymactiviteit","tick")+[0,20,40,60,80].map(t=>T(60+t*5.5,184,t,"tick","middle")).join("");
E.zet("havo26-2",[37],{titel:"Enzymactiviteit en temperatuur",
  html:`<p>Enzymen zijn <b>eiwitten</b> met een precieze ruimtelijke vorm. De temperatuur bepaalt hoe snel ze werken:</p>
<ul><li>Als het warmer wordt, bewegen moleculen sneller. Substraat en enzym botsen vaker, dus de activiteit stijgt.</li>
<li>Bij de <b>optimumtemperatuur</b> is de activiteit het hoogst. Voor de meeste menselijke enzymen ligt die rond 37 °C.</li>
<li>Boven het optimum daalt de activiteit snel. Bij hoge temperatuur raakt een enzym blijvend beschadigd: het <b>denatureert</b>. Een gekookte aardappel of een gekookt ei krijg je niet meer terug.</li>
<li>Bij lage temperatuur werkt een enzym langzaam, maar het gaat niet kapot.</li>
<li>Elk enzym heeft een eigen optimum: enzymen van bacteriën in hete bronnen werken het best bij 70 °C of meer.</li></ul>`,
  anim:anim("0 0 560 204","Activiteit van een enzym tegen de temperatuur",[
    {k:1,cap:"Bij lage temperatuur werkt het enzym langzaam. Hoe warmer, hoe vaker enzym en substraat botsen: de activiteit stijgt."},
    {k:2,cap:"Bij de <b>optimumtemperatuur</b> (hier 37 °C) is de activiteit het hoogst."},
    {k:3,cap:"Daarboven daalt de activiteit snel: het enzym denatureert. Afkoelen helpt dan niet meer."},
    {k:4,cap:"Een ander enzym kan beter tegen warmte: zijn optimum ligt hoger (gestippeld). Varianten van één enzym kunnen dus verschillen in hoe goed ze tegen hoge temperaturen kunnen."}],
    (s)=>{let g=assen();const full=kromme(37,18);const pts=full.split(/(?=[ML])/);
      const n=s.k===1?Math.ceil(37/2):s.k===2?Math.ceil(37/2)+1:pts.length;
      g+=`<path d="${pts.slice(0,n).join("")}" class="cv"/>`;
      if(s.k>=2)g+=L(60+37*5.5,40,60+37*5.5,170,"stroke:var(--goud);stroke-width:1.2;stroke-dasharray:4 3")+T(60+37*5.5,36,"optimum","lbl","middle","fill:var(--goud-text)");
      if(s.k>=4)g+=`<path d="${kromme(55,16)}" style="fill:none;stroke:var(--paars);stroke-width:2.2;stroke-dasharray:6 4"/>`;
      return g;}),
  films:[F.versneld]});
E.waarom("havo26-2",37,anim("0 0 560 196","Wat er met het enzymmolecuul gebeurt bij te hoge temperatuur",[
  {k:0,cap:"Onder het optimum: het substraat past in de actieve plaats, maar moleculen bewegen langzaam. Weinig botsingen."},
  {k:1,cap:"Bij het optimum: veel botsingen en het substraat past nog precies. De activiteit is het hoogst."},
  {k:2,cap:"Boven het optimum: door de warmte verbreken de bindingen die het eiwit in vorm houden. Het enzym <b>verandert van vorm</b> (denatureert): het substraat past niet meer, dus de activiteit neemt af."},
  {k:3,cap:"Bij de katten met t<sup>s</sup> en t<sup>b</sup> gebeurt dat al bij 38,5 °C. Op de warme romp werkt tyrosinase slecht, in de koelere oren, poten en staart wel: daar ontstaat melanine."}],
  (s)=>{let g="";const sub=(x,y)=>R(x-14,y-12,28,24,"fill:var(--goud);stroke:var(--goud-text)",3);
    if(s.k<3){const kapot=s.k===2;g+=enzymVorm(280,110,kapot?"var(--koraal":"var(--teal",kapot);
      g+=sub(kapot?380:280,kapot?40:92)+T(280,175,["koud","optimum","te warm"][s.k],"lbl","middle","font-size:15px");
      if(kapot)g+=T(400,72,"past niet meer","lblbad")+`<path d="M200,60 q10,-12 20,0 q10,12 20,0 M330,150 q10,-12 20,0 q10,12 20,0" style="fill:none;stroke:var(--koraal);stroke-width:1.5"/>`;
      if(s.k===1)g+=`<path d="M190,60 l20,8 M370,62 l-20,8 M200,150 l18,-6" style="stroke:var(--text3);stroke-width:1.5"/>`;}
    else{const koel="stroke:var(--teal);stroke-width:12;stroke-linecap:round";
      g+=`<ellipse cx="250" cy="110" rx="120" ry="45" style="fill:var(--koraal-soft);stroke:var(--koraal);stroke-width:1.5"/>`+C(110,90,30,"fill:var(--teal-soft);stroke:var(--teal);stroke-width:3")+`<path d="M370,105 C420,100 450,70 470,40" style="fill:none;${koel}"/>`
        +L(200,150,195,180,koel)+L(320,150,325,180,koel);
      g+=T(250,108,"romp 38,5 °C","lbl","middle")+T(250,124,"enzym werkt niet: licht","lblbad","middle")+T(545,160,"staart, poten, kop: koeler","lbl","end","fill:var(--teal)")+T(545,176,"enzym werkt: melanine, donker","lblm","end");}
    return g;}));

/* --- 38: intermediair, genotype en omgeving --- */
E.zet("havo26-2",[38],{titel:"Intermediair fenotype en de invloed van de omgeving",
  html:`<p>Niet elk allel is dominant of recessief.</p>
<ul><li>Bij <b>intermediaire overerving</b> heeft een heterozygoot een fenotype dat <b>tussen</b> dat van de twee homozygoten in ligt. Voorbeeld: leeuwenbek met rood (RR) × wit (WW) geeft roze (RW).</li>
<li>Bij <b>codominantie</b> komen beide allelen naast elkaar tot uiting, zoals bloedgroep AB.</li></ul>
<p>Het fenotype hangt af van het <b>genotype én de omgeving</b>. Hortensia's met hetzelfde genotype bloeien blauw op zure grond en roze op kalkrijke grond.</p>`,
  anim:anim("0 0 560 160","Intermediaire overerving bij leeuwenbek",[
    {k:0,cap:"Twee homozygote planten: rood (RR) en wit (WW)."},
    {k:1,cap:"Alle nakomelingen zijn RW. Er is geen dominant allel: de bloemen zijn <b>roze</b>, een intermediair fenotype."},
    {k:2,cap:"Ter vergelijking: bij dominante overerving zou de heterozygoot er net zo uitzien als de homozygoot met het dominante allel."}],
    (s)=>{const bloem=(x,y,kl,op)=>[0,72,144,216,288].map(a=>{const r=a*Math.PI/180;return C((x+16*Math.cos(r)).toFixed(1),(y+16*Math.sin(r)).toFixed(1),12,`fill:${kl};fill-opacity:${op};stroke:var(--text3)`);}).join("")+C(x,y,6,"fill:var(--goud)");
      let g=bloem(80,60,"var(--koraal)",.9)+T(80,108,"RR · rood","lbl","middle")+bloem(240,60,"var(--surface2)",1)+T(240,108,"WW · wit","lbl","middle")+T(160,66,"×","lbl","middle","font-size:22px");
      if(s.k>=1)g+=pijl(290,60,350)+bloem(410,60,"var(--koraal)",.35)+T(410,108,"RW · roze","lbl","middle");
      if(s.k===2)g+=T(410,140,"dominant zou geven: RW · rood","lblm","middle");
      return g;}),
  films:[F.voorbij,F.aanuit]});
E.waarom("havo26-2",38,anim("0 0 580 190","De drie uitspraken getoetst",[
  {k:0,cap:"<b>Uitspraak 1.</b> Kijk naar de kleur van de romp: Siamees (t<sup>s</sup>t<sup>s</sup>) licht, Burmees (t<sup>b</sup>t<sup>b</sup>) donker, mink (t<sup>s</sup>t<sup>b</sup>) ertussenin. De heterozygoot ligt tussen de homozygoten: intermediair, dus <b>juist</b>."},
  {k:1,cap:"<b>Uitspraak 2.</b> De romp is 38,5 °C. Bij t<sup>b</sup>t<sup>b</sup> wordt daar nog veel melanine gemaakt, bij t<sup>s</sup>t<sup>s</sup> bijna niets. Het enzym van t<sup>b</sup> kan dus <b>beter</b> tegen warmte dan dat van t<sup>s</sup>: de uitspraak is <b>onjuist</b>."},
  {k:2,cap:"<b>Uitspraak 3.</b> Alle huidcellen ontstaan door mitose uit één bevruchte eicel: overal t<sup>s</sup>t<sup>s</sup>. Het kleurverschil komt door de <b>temperatuur</b> (staart koeler), niet door het genotype: <b>onjuist</b>."}],
  (s)=>{let g="";
    if(s.k<2){[["Siamees","s","s",.06],["mink","s","b",.35],["Burmees","b","b",.7]].forEach(([n,a,b,op],i)=>{const y=40+i*50;
      g+=T(20,y+20,n,"lbl")+T(110,y+20,sup(a)+" "+sup(b),"lbl")+R(180,y,300,30,"fill:none;stroke:var(--line2)",5)+R(180,y,Math.max(8,300*op/0.7),30,"fill:var(--text2);fill-opacity:.8",5);});
      g+=T(330,30,"melanine op de romp (38,5 °C): meer = langere balk","lblm","middle");
      if(s.k===0)g+=T(370,110,"← ertussenin","lbl","start","fill:var(--goud-text)");
      if(s.k===1)g+=T(490,160,"enzym werkt","lbl","start","fill:var(--teal)")+T(490,176,"nog","lbl","start","fill:var(--teal)")+T(490,60,"enzym werkt","lblbad")+T(490,76,"niet","lblbad");}
    else{g+=`<ellipse cx="250" cy="100" rx="130" ry="45" style="fill:var(--koraal-soft);stroke:var(--koraal);stroke-width:1.5"/>`+`<path d="M378,95 C430,90 460,60 480,30" style="fill:none;stroke:var(--teal);stroke-width:12;stroke-linecap:round"/>`+T(130,40,"warm","lbl","middle","fill:var(--koraal)")+T(520,30,"koel","lbl","middle","fill:var(--teal)");
      g+=R(200,82,100,30,"fill:var(--surface2);stroke:var(--teal)",5)+T(250,102,"buik: "+sup("s")+" "+sup("s"),"lbl","middle")+R(400,110,120,30,"fill:var(--surface2);stroke:var(--teal)",5)+T(460,130,"staart: "+sup("s")+" "+sup("s"),"lbl","middle");
      g+=T(250,170,"zelfde genotype, andere temperatuur","lbl","middle");}
    return g;}));

/* --- 39: monohybride kruising (vraag heeft al een animatie) --- */
E.zet("havo26-2",[39],{titel:"Monohybride kruising en kruisingsschema",
  html:`<p>Bij een <b>monohybride kruising</b> kijk je naar één gen. Zo pak je het aan:</p>
<ul><li>Schrijf de <b>genotypen</b> van de ouders op.</li>
<li>Bepaal de <b>gameten</b>: bij de meiose krijgt elke gameet één van de twee allelen. Een homozygoot (AA) maakt één soort gameet, een heterozygoot (Aa) twee soorten, elk 50%.</li>
<li>Zet de gameten langs een <b>kruisingsschema</b> (2 × 2) en vul de vakjes in.</li>
<li>Elk vakje is 25% kans. Tel de vakjes met het genotype of fenotype dat je zoekt.</li></ul>
<p>Let op bij intermediaire overerving: dan heeft de heterozygoot een eigen fenotype.</p>`,
  anim:anim("0 0 560 210","Kruisingsschema Aa × Aa",[
    {k:0,cap:"Twee heterozygote ouders: Aa × Aa."},
    {k:1,cap:"Elke ouder maakt gameten met A en gameten met a, elk 50%."},
    {k:2,cap:"Combineer elke gameet van de ene ouder met elke gameet van de andere."},
    {k:3,cap:"Uitkomst: 1 AA : 2 Aa : 1 aa. De kans op aa is dus 1 op 4 (25%), de kans op een heterozygoot 50%."}],
    (s)=>{let g=T(20,26,"ouders:  Aa  ×  Aa","lbl","start","font-size:15px");const x0=200,y0=70,w=100,h=56;
      if(s.k>=1){g+=T(x0-14,y0-8,"gameten","lblm","end");["A","a"].forEach((a,j)=>{g+=T(x0+j*w+w/2,y0-10,a,"lbl","middle","font-size:15px");g+=T(x0-14,y0+j*h+h/2+5,a,"lbl","end","font-size:15px");});}
      if(s.k>=2)["A","a"].forEach((a,i)=>["A","a"].forEach((b,j)=>{const gt=a+b==="aA"?"Aa":a+b;
        const kl=s.k===3?(gt==="AA"?"var(--teal-soft)":gt==="aa"?"var(--goud-soft)":"var(--surface)"):"none";
        g+=R(x0+j*w,y0+i*h,w,h,`fill:${kl};stroke:var(--line2)`,0)+T(x0+j*w+w/2,y0+i*h+h/2+5,gt,"lbl","middle","font-size:15px");}));
      if(s.k===3)g+=T(430,110,"1 AA","lbl")+T(430,132,"2 Aa","lbl")+T(430,154,"1 aa","lbl");
      return g;}),
  films:[F.mono]});

})();
/* ===== h7.js ===== */
(function(){
"use strict";
/* Opgave 7 in beide examens: havo26-1 Mastitis (36–43), havo26-2 Paarden voeren zonder brokken (40–46). */
const E=window.EXSTOF, T1="havo26-1", T2="havo26-2";
const SV=(vb,inner,lab)=>E.svg(vb,inner,lab);
const W=(s,max)=>`<div style="max-width:${max||560}px;margin:0 auto;padding:10px 8px">${s}</div>`;
const anim=(caps,draw,max)=>b=>E.stappen(b,caps.map(c=>({cap:c})),(st,s,i)=>{st.innerHTML=W(draw(i),max);});
const vast=(s,max,onder)=>b=>{b.append(E.el("div",{style:"border-radius:var(--radius);background:var(--surface2);border:1px solid var(--line2)"},W(s,max)));
  if(onder)b.append(E.el("p",{style:"margin:0;color:var(--text2);font-size:15px"},onder));};
const f1=v=>(+v).toFixed(1);
/* pijl zonder markers (werkt ook in dichte <details>) */
const pijl=(x1,y1,x2,y2,k="var(--text2)",w=2.2)=>{const a=Math.atan2(y2-y1,x2-x1),h=9+w,bx=x2-h*Math.cos(a),by=y2-h*Math.sin(a),s=Math.sin(a)*h*.5,c=Math.cos(a)*h*.5;
  return `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(bx)}" y2="${f1(by)}" style="stroke:${k};stroke-width:${w};stroke-linecap:round"/><polygon points="${f1(x2)},${f1(y2)} ${f1(bx+s)},${f1(by-c)} ${f1(bx-s)},${f1(by+c)}" style="fill:${k}"/>`;};
const T=(x,y,t,kl="lbl",anc="middle",st="")=>`<text class="${kl}" x="${f1(x)}" y="${f1(y)}" text-anchor="${anc}"${st?` style="${st}"`:""}>${t}</text>`;
const C=(x,y,r,fill,stroke,w=1.6,extra="")=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:${fill};stroke:${stroke};stroke-width:${w};${extra}"/>`;
const R=(x,y,w,h,fill,stroke,rx=0,extra="")=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${rx}" style="fill:${fill};stroke:${stroke};stroke-width:1.6;${extra}"/>`;
const bac=(x,y,k="var(--groen)",dood=false,s=1)=>`<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${14*s}" ry="${8*s}" style="fill:${dood?"none":`color-mix(in srgb, ${k} 30%, transparent)`};stroke:${k};stroke-width:1.8;${dood?"stroke-dasharray:3 3;opacity:.6":""}"/>`;
const hexp=(cx,cy,r)=>[0,1,2,3,4,5].map(k=>{const a=Math.PI/3*k+Math.PI/6;return f1(cx+r*Math.cos(a))+","+f1(cy+r*Math.sin(a));}).join(" ");
const hex=(x,y,k="var(--goud)",r=8,op=1)=>`<polygon points="${hexp(x,y,r)}" style="fill:color-mix(in srgb, ${k} 35%, transparent);stroke:${k};stroke-width:1.5;opacity:${op}"/>`;
const keten=(x,y,n,k,r=8,gap=0)=>{let s="";for(let j=0;j<n;j++){if(j)s+=`<line x1="${f1(x+(j-1)*(2*r+gap)+r*.87)}" y1="${y}" x2="${f1(x+j*(2*r+gap)-r*.87)}" y2="${y}" style="stroke:${k};stroke-width:2"/>`;s+=hex(x+j*(2*r+gap),y,k,r);}return s;};
const Yv=(x,y,ang,k="var(--goud)",sc=1)=>`<g transform="translate(${f1(x)},${f1(y)}) rotate(${ang}) scale(${sc})"><path d="M0,0 L0,13 M0,0 L-8,-10 M0,0 L8,-10" style="stroke:${k};stroke-width:2.6;fill:none;stroke-linecap:round"/></g>`;
const tag=(x,y,w,t,sub,k)=>R(x,y,w,sub?54:34,`color-mix(in srgb, ${k} 18%, transparent)`,k,10)+T(x+w/2,y+22,t,"lbl","middle",`fill:${k==="var(--goud)"?"var(--goud-text)":k};font-size:14px;letter-spacing:.08em`)+(sub?T(x+w/2,y+42,sub,"lblm"):"");
const bez=(p,t)=>{const u=1-t;return [0,1].map(k=>u*u*u*p[0][k]+3*u*u*t*p[1][k]+3*u*t*t*p[2][k]+t*t*t*p[3][k]);};
const melkdot=(x,y)=>C(x,y,3.2,"var(--text)","none",0,"opacity:.85");

/* =====================================================================
   havo26-1 · opgave 7 Mastitis
   ===================================================================== */

/* --- vraag 36: zenuwstelsel, hormoonstelsel en klieren --- */
function kliertypen(){
  let s=`<line x1="280" y1="10" x2="280" y2="250" style="stroke:var(--line2);stroke-dasharray:4 4"/>`;
  /* exocrien */
  s+=T(135,18,"exocriene klier","lbl","middle","font-size:14px");
  s+=T(150,36,"naar buiten of in een holte","lblm","start");
  s+=R(20,52,104,12,"var(--line2)","var(--line2)")+R(146,52,104,12,"var(--line2)","var(--line2)");
  s+=`<path d="M128,64 V150 M142,64 V150" style="stroke:var(--text2);stroke-width:2;fill:none"/>`;
  for(let k=0;k<10;k++){const a=Math.PI*2*k/10+Math.PI/10;if(Math.abs(Math.cos(a-Math.PI*1.5))>.95)continue;s+=C(135+40*Math.cos(a),195+40*Math.sin(a),13,"var(--teal-soft)","var(--teal)",1.4);}
  s+=C(135,195,22,"var(--surface)","var(--text3)",1.2);
  [[128,190],[142,200],[134,205],[135,130],[135,105],[135,80],[135,42]].forEach(([x,y])=>s+=C(x,y,3.5,"var(--goud)","none",0));
  s+=pijl(164,150,164,66,"var(--goud)",2);
  s+=T(176,112,"afvoerbuis","lblm","start")+T(135,252,"kliercellen","lblm");
  /* endocrien */
  s+=T(425,18,"endocriene klier (hormoonklier)","lbl","middle","font-size:14px");
  s+=T(425,60,"geen afvoerbuis","lblm");
  for(let r=0;r<3;r++)for(let c=0;c<3;c++)s+=C(399+c*26,94+r*26,13,"var(--teal-soft)","var(--teal)",1.4);
  s+=R(300,190,250,34,"var(--koraal-soft)","var(--koraal)",17);
  s+=T(312,212,"bloedvat","lblm","start");
  [[412,100],[438,126],[425,166],[414,178]].forEach(([x,y])=>s+=C(x,y,3.5,"var(--paars)","none",0));
  [[400,207],[455,205],[505,209]].forEach(([x,y])=>s+=C(x,y,3.5,"var(--paars)","none",0));
  s+=pijl(452,156,452,186,"var(--paars)",2);
  s+=T(462,166,"hormoon","lblm","start")+T(462,181,"naar het bloed","lblm","start");
  s+=pijl(470,240,540,240,"var(--text3)",1.6)+T(468,244,"stroomt naar het hele lichaam","tick","end");
  return SV("0 0 560 256",s,"Exocriene klier met afvoerbuis naar buiten, en endocriene klier zonder afvoerbuis die zijn hormoon aan het bloed afgeeft");
}
E.zet(T1,[36],{titel:"Zenuwstelsel, hormoonstelsel en klieren",
  html:`<p>Je lichaam regelt processen met twee stelsels, die vaak samenwerken.</p>
  <ul><li><b>Zenuwstelsel</b>: snelle elektrische impulsen langs zenuwcellen, naar één precieze plek.</li>
  <li><b>Hormoonstelsel</b>: een hormoonklier geeft <b>hormonen</b> af aan het <b>bloed</b>. Een hormoon werkt alleen op <b>doelwitcellen</b> met de passende receptor. Trager dan een zenuwimpuls, maar het werkt langer en op meer plekken.</li></ul>
  <p>De <b>hypofyse</b> is een hormoonklier onder de hersenen. Ze krijgt haar signalen van de hypothalamus (zenuwstelsel) en is zo de schakel tussen de twee stelsels.</p>
  <p>Klieren verschillen in waar hun product heen gaat. Een <b>exocriene klier</b> geeft via een <b>afvoerbuis</b> af naar buiten of in een holte, zoals zweet-, speeksel- en traanklieren. Een <b>endocriene klier</b> heeft geen afvoerbuis en geeft af aan het <b>bloed</b>: dat zijn de hormoonklieren.</p>`,
  anim:vast(kliertypen(),560),
  films:[["Post voor iedereen","films/hormonen/1-post-voor-iedereen.html"],["De baas van de klieren","films/hormonen/3-de-baas-van-de-klieren.html"]]});

const NERVE=[[394,272],[280,302],[110,272],[92,104]], VAT=[[128,114],[210,150],[300,110],[374,146]];
function melkSvg(i){
  let s="";
  /* hersenen + hypofyse */
  s+=`<ellipse cx="110" cy="60" rx="72" ry="42" style="fill:var(--surface);stroke:var(--text3);stroke-width:1.6"/>`+T(110,64,"hersenen","lblm");
  s+=`<line x1="118" y1="100" x2="122" y2="106" style="stroke:var(--paars);stroke-width:2"/>`+C(124,112,9,i>=2?"var(--paars)":"var(--paars-soft)","var(--paars)",1.6)+T(140,116,"hypofyse","lblm","start");
  /* uier */
  s+=`<ellipse cx="410" cy="178" rx="128" ry="82" style="fill:none;stroke:var(--text3);stroke-width:1.4;stroke-dasharray:5 4"/>`+T(532,104,"uier","lblm");
  /* zenuw */
  const nd=`M${NERVE[0]} C${NERVE[1]} ${NERVE[2]} ${NERVE[3]}`;
  s+=`<path d="${nd}" style="fill:none;stroke:var(--teal);stroke-width:${i===1?4:2.4};opacity:${i===1?1:.35}"/>`;
  if(i===1)[.15,.4,.65,.88].forEach(t=>{const p=bez(NERVE,t);s+=C(p[0],p[1],5,"var(--teal)","var(--surface2)",1.5);});
  s+=T(200,302,"zenuw","lblm","middle","fill:var(--teal)");
  /* bloedvat */
  const vd=`M${VAT[0]} C${VAT[1]} ${VAT[2]} ${VAT[3]}`;
  s+=`<path d="${vd}" style="fill:none;stroke:var(--koraal);stroke-width:9;opacity:${i>=2?.45:.2};stroke-linecap:round"/>`;
  s+=T(250,118,"bloedvat","lblm","middle","fill:var(--koraal)");
  if(i===2||i===3)[.1,.35,.6,.85].forEach(t=>{const p=bez(VAT,t);s+=C(p[0],p[1],4,"var(--paars)","none",0);});
  /* melkklier */
  const r=i>=3?29:36, rs=i>=3?35:44;
  s+=C(410,150,r,"var(--surface)","var(--text2)",1.6)+C(410,150,r-14,"none","var(--text3)",1);
  if(i<3)[[402,146],[416,152],[408,158],[412,141]].forEach(([x,y])=>s+=melkdot(x,y));
  for(let k=0;k<7;k++){const a=Math.PI*2*k/7-Math.PI/2+.2;s+=`<ellipse cx="${f1(410+rs*Math.cos(a))}" cy="${f1(150+rs*Math.sin(a))}" rx="10" ry="4" transform="rotate(${f1(a*180/Math.PI+90)} ${f1(410+rs*Math.cos(a))} ${f1(150+rs*Math.sin(a))})" style="fill:var(--koraal-soft);stroke:var(--koraal);stroke-width:1.5"/>`;}
  if(i===3)[0,1,2,3].forEach(k=>{const a=Math.PI/2*k+Math.PI/4;s+=pijl(410+64*Math.cos(a),150+64*Math.sin(a),410+44*Math.cos(a),150+44*Math.sin(a),"var(--koraal)",2);});
  s+=T(470,138,"melkklier","lblm","start")+T(470,154,"met spiercellen","lblm","start","fill:var(--koraal)");
  /* kanaal + tepel */
  s+=`<path d="M404,${150+r} V240 M416,${150+r} V240" style="stroke:var(--text2);stroke-width:1.6"/>`;
  s+=`<path d="M392,236 L392,280 Q410,298 428,280 L428,236" style="fill:var(--surface);stroke:var(--text2);stroke-width:1.6"/><path d="M410,240 V292" style="stroke:var(--text3);stroke-width:1.4"/>`;
  s+=T(440,262,"tepel","lblm","start");
  if(i===0)s+=C(410,284,19,"none","var(--goud)",2.6)+T(440,302,"zuigen: zintuigcellen geprikkeld","lblm","start","fill:var(--goud-text)");
  if(i>=3){[[410,200],[410,222],[410,248],[410,270],[410,292]].forEach(([x,y])=>s+=melkdot(x,y));s+=pijl(376,196,376,286,"var(--text)",2)+T(368,244,"melk","lbl","end");}
  if(i===1)s+=tag(116,138,150,"ZENUWSTELSEL","","var(--teal)");
  if(i===2)s+=tag(116,138,170,"HORMOONSTELSEL","","var(--paars)");
  if(i===4)s+=tag(116,138,150,"EXOCRIEN","","var(--goud)");
  return SV("0 0 560 310",s,"Schema van zuigen aan de tepel, zenuw naar de hersenen, oxytocine via het bloed naar de melkklier");
}
E.waarom(T1,36,anim([
  "Het kalf of de melkmachine zuigt aan de tepel. Daardoor worden zintuigcellen in de tepel geprikkeld.",
  "Er gaan impulsen via zenuwen naar de hersenen: het <b>zenuwstelsel</b> doet mee.",
  "De hypofyse geeft <b>oxytocine</b> af aan het bloed: ook het <b>hormoonstelsel</b> doet mee. Uitspraak 1 is dus <b>juist</b>.",
  "Oxytocine bereikt de spiercellen rond de melkklieren. Die <b>trekken samen</b> en persen de melk eruit. Ze ontspannen dus niet: uitspraak 2 is <b>onjuist</b>.",
  "De melk gaat via melkkanaaltjes en het tepelkanaal naar buiten. Een klier die via een afvoerbuis naar buiten afgeeft, is <b>exocrien</b>: uitspraak 3 is <b>juist</b>."],melkSvg));

/* --- vraag 37: barrières --- */
function barSvg(i){
  let s="";
  if(i===0){/* huid */
    for(let k=0;k<8;k++)s+=R(30+k*40,100,38,12,"var(--line2)","var(--text3)",2);
    for(let k=0;k<8;k++)s+=C(49+k*40,138,14,"var(--surface)","var(--text3)",1.2)+C(49+k*40,138,4,"var(--text3)","none",0);
    s+=bac(232,40)+bac(316,46);
    s+=pijl(236,52,256,94,"var(--groen)",2)+pijl(262,92,282,56,"var(--groen)",2);
    s+=pijl(318,58,334,94,"var(--groen)",2)+pijl(340,92,356,58,"var(--groen)",2);
    s+=T(30,94,"hoornlaag (dode, dichte cellen)","lblm","start")+T(30,176,"levende huidcellen","lblm","start");
    s+=tag(395,72,150,"MECHANISCH","houdt tegen","var(--teal)");
  }
  if(i===1){/* trilharen */
    s+=R(30,86,320,26,"var(--goud-soft)","none",6);
    for(let k=0;k<8;k++){s+=R(30+k*40,132,38,46,"var(--surface)","var(--text3)",3);for(let j=0;j<4;j++)s+=`<line x1="${36+k*40+j*9}" y1="132" x2="${42+k*40+j*9}" y2="112" style="stroke:var(--text2);stroke-width:1.4"/>`;}
    s+=bac(120,98,"var(--groen)",false,.8)+bac(250,96,"var(--groen)",false,.8);
    s+=pijl(40,70,340,70,"var(--goud)",2.2)+T(190,62,"slijm wordt afgevoerd naar de keel","lblm");
    s+=T(30,196,"cellen met trilharen in je luchtwegen","lblm","start");
    s+=tag(395,72,150,"MECHANISCH","vangt en voert af","var(--teal)");
  }
  if(i===2){/* maagzuur */
    s+=`<path d="M70,40 C40,90 50,170 150,178 C260,186 330,140 320,90 C312,52 260,50 230,76 C200,100 160,90 140,40 Z" style="fill:var(--koraal-soft);stroke:var(--koraal);stroke-width:1.8"/>`;
    s+=T(185,120,"maagsap · pH 2","lbl","middle","font-size:16px");
    s+=bac(140,150,"var(--groen)",true)+bac(240,150,"var(--groen)",true)+bac(110,90,"var(--groen)",true);
    [[200,90],[260,108],[160,128],[230,160],[285,130]].forEach(([x,y])=>s+=T(x,y,"H⁺","tick","middle","fill:var(--koraal)"));
    s+=tag(395,72,150,"CHEMISCH","zuur doodt bacteriën","var(--goud)");
  }
  if(i===3){/* lysozym */
    s+=`<path d="M190,22 C190,22 120,110 120,140 A70,52 0 0 0 260,140 C260,110 190,22 190,22 Z" style="fill:var(--teal-soft);stroke:var(--teal);stroke-width:1.8"/>`;
    s+=`<ellipse cx="190" cy="140" rx="34" ry="18" style="fill:color-mix(in srgb, var(--groen) 30%, transparent);stroke:var(--groen);stroke-width:2;stroke-dasharray:14 6"/>`;
    s+=`<path d="M138,112 l12,6 l-12,6 a14,14 0 1 1 0,-12 Z" style="fill:var(--paars)" transform="rotate(20 138 118)"/>`;
    s+=T(120,96,"lysozym","lbl","end","fill:var(--paars)")+T(190,196,"traanvocht","lblm");
    s+=T(280,150,"celwand van de bacterie wordt geknipt","lblm","start");
    s+=tag(395,72,150,"CHEMISCH","enzym breekt af","var(--goud)");
  }
  return SV("0 0 560 210",s,"Voorbeelden van mechanische en chemische barrières");
}
E.zet(T1,[37],{titel:"Aangeboren afweer: barrières",
  html:`<p>De eerste verdediging van je lichaam is <b>aangeboren</b>: ze werkt meteen en tegen alle ziekteverwekkers op dezelfde manier (<b>niet-specifiek</b>). De buitenste laag zijn de <b>barrières</b>: die houden ziekteverwekkers buiten.</p>
  <ul><li><b>Mechanische (fysische) barrières</b> werken door hun bouw of beweging: ze sluiten af, houden tegen of voeren af. Voorbeelden: de hoornlaag van je huid, slijm met trilharen in je luchtwegen, hoesten, traanvocht dat wegspoelt.</li>
  <li><b>Chemische (biochemische) barrières</b> werken met een <b>stof</b> die ziekteverwekkers doodt of hun groei remt. Voorbeelden: het zoutzuur in je maag, de lage pH van je huid en vagina, het enzym <b>lysozym</b> in tranen en speeksel.</li></ul>
  <p>Vraag je bij elke barrière dus af: werkt het door afsluiten, tegenhouden of afvoeren, of door een stof die de bacterie of haar omgeving aantast? Komen ziekteverwekkers er toch doorheen, dan volgt de ontstekingsreactie.</p>`,
  anim:anim(["<b>Huid</b>: de hoornlaag is een dichte laag dode cellen. Bacteriën komen er niet doorheen.","<b>Luchtwegen</b>: bacteriën blijven plakken in slijm. Trilharen voeren het slijm af naar de keel.","<b>Maag</b>: het zoutzuur in maagsap maakt de pH zo laag dat de meeste bacteriën doodgaan.","<b>Tranen en speeksel</b>: het enzym lysozym breekt de celwand van bacteriën af."],barSvg),
  films:[["De eerste verdediging","films/afweer/1-de-eerste-verdediging.html"]]});

function tepelSvg(i){
  let s=`<path d="M200,14 L200,170 C200,240 236,282 280,282 C324,282 360,240 360,170 L360,14" style="fill:var(--surface);stroke:var(--text2);stroke-width:1.8"/>`;
  s+=`<ellipse cx="280" cy="100" rx="52" ry="64" style="fill:var(--line);stroke:var(--text3);stroke-width:1.2"/>`;
  s+=T(190,104,"tepelholte","lblm","end")+T(190,236,"tepelkanaal","lblm","end");
  if(i===0)s+=`<path d="M274,164 C274,210 280,232 280,240 C280,232 286,210 286,164 M280,240 V282" style="fill:none;stroke:var(--text2);stroke-width:1.6"/>`;
  else s+=`<path d="M274,164 V282 M286,164 V282" style="stroke:var(--text2);stroke-width:1.6"/>`;
  s+=bac(250,302)+bac(318,300);
  if(i===0){s+=`<ellipse cx="258" cy="236" rx="10" ry="20" style="fill:var(--koraal-soft);stroke:var(--koraal);stroke-width:2"/><ellipse cx="302" cy="236" rx="10" ry="20" style="fill:var(--koraal-soft);stroke:var(--koraal);stroke-width:2"/>`;
    s+=pijl(226,236,244,236,"var(--koraal)",2)+pijl(334,236,316,236,"var(--koraal)",2)+T(370,232,"kringspier spant aan:","lblm","start")+T(370,248,"het kanaal gaat dicht","lblm","start");
    s+=tag(390,40,160,"MECHANISCH","","var(--teal)");}
  if(i===1){for(let y=176;y<278;y+=14)s+=C(270,y,3,"var(--goud)","none",0)+C(290,y+7,3,"var(--goud)","none",0);
    s+=T(370,206,"vetzuren:","lblm","start")+T(370,222,"de pH daalt","lblm","start");s=s.replace(bac(250,302)+bac(318,300),bac(250,302,"var(--groen)",true)+bac(318,300,"var(--groen)",true));
    s+=tag(390,40,160,"CHEMISCH","","var(--goud)");}
  if(i===2){[[258,80],[300,92],[270,124],[300,130]].forEach(([x,y])=>{s+=`<path d="M${x-9},${y-6} a10,10 0 1 0 0,12" transform="rotate(180 ${x} ${y})" style="fill:none;stroke:var(--paars);stroke-width:3"/>`+C(x,y,4,"var(--koraal)","none",0);});
    s+=bac(250,58,"var(--groen)",true,.7);
    s+=T(370,90,"lactoferrine pakt ijzer (Fe)","lblm","start")+T(370,106,"weg: bacteriën kunnen","lblm","start")+T(370,122,"niet groeien","lblm","start");
    s+=tag(390,40,160,"CHEMISCH","","var(--goud)");}
  if(i===3){s+=R(274,196,12,64,"var(--teal)","var(--teal)",5);s+=T(370,222,"eiwitprop:","lblm","start")+T(370,238,"een stop in het kanaal","lblm","start");
    s+=tag(390,40,160,"MECHANISCH","","var(--teal)");}
  return SV("0 0 560 320",s,"Doorsnede van een tepel met tepelholte en tepelkanaal en de barrière van deze stap");
}
E.waarom(T1,37,anim([
  "<b>1 Kringspier</b>: de spier knijpt het tepelkanaal dicht. Er zit geen stof aan te pas, alleen afsluiten: <b>mechanisch</b>.",
  "<b>2 Vetzuren</b>: een stof die de pH laat dalen, zodat bacteriën slecht groeien: <b>chemisch</b>.",
  "<b>3 Lactoferrine</b>: een stof die ijzer bindt. De bacteriën worden niet tegengehouden, maar hun omgeving wordt ongunstig: <b>chemisch</b>.",
  "<b>4 Eiwit-prop</b>: wel een eiwit, maar hij werkt als een stop die het kanaal afsluit: <b>mechanisch</b>. Vier goed = 2 punten."],tepelSvg));

/* --- vraag 38: ontstekingsreactie --- */
function ontstSvg(i){
  let s=R(0,0,560,22,"var(--line2)","none")+R(262,0,30,22,"var(--surface2)","none");
  s+=T(10,38,"huid","tick","start")+T(10,150,"weefsel","tick","start");
  s+=R(20,192,520,46,"var(--koraal-soft)","var(--koraal)",22)+T(36,220,"bloedvat","lblm","start");
  [[120,214],[200,220],[380,212],[470,218]].forEach(([x,y])=>s+=`<ellipse cx="${x}" cy="${y}" rx="11" ry="6" style="fill:var(--koraal);opacity:.75"/>`);
  const bl=[[270,46],[300,78],[244,88],[322,112]];
  if(i<3)bl.forEach(([x,y])=>s+=bac(x,y,"var(--groen)",false,.8));
  if(i===0)s+=pijl(277,6,277,30,"var(--groen)",2)+T(306,16,"wondje","lblm","start");
  if(i>=1){s+=C(170,120,16,"var(--paars-soft)","var(--paars)",1.6)+[[-6,-5],[5,-3],[-2,6],[6,6]].map(([a,b])=>C(170+a,120+b,2.5,"var(--paars)","none",0)).join("");
    s+=T(170,158,"mestcel","lblm");
    if(i===1)[[200,100],[214,128],[230,80],[198,150],[250,140],[226,170],[160,178],[140,168]].forEach(([x,y])=>s+=C(x,y,3,"var(--paars)","none",0));
    if(i===1)s+=T(250,180,"mediatoren (bv. histamine)","lblm","start","fill:var(--paars)");}
  if(i===2){s+=C(300,208,13,"var(--teal-soft)","var(--teal)",1.6)+`<ellipse cx="340" cy="190" rx="9" ry="15" style="fill:var(--teal-soft);stroke:var(--teal);stroke-width:1.6"/>`+C(370,150,13,"var(--teal-soft)","var(--teal)",1.6);
    s+=pijl(372,134,344,112,"var(--teal)",2)+T(392,148,"fagocyten verlaten","lblm","start")+T(392,164,"het bloedvat","lblm","start");}
  if(i===3){[[270,52],[244,94],[322,116]].forEach(([x,y])=>{s+=C(x,y,20,"var(--teal-soft)","var(--teal)",1.6)+bac(x,y,"var(--groen)",true,.6);});
    s+=T(360,70,"fagocytose","lbl","start","fill:var(--teal)");}
  return SV("0 0 560 244",s,"Ontstekingsreactie: bacteriën in het weefsel, mestcel met mediatoren, fagocyten uit het bloedvat");
}
E.zet(T1,[38],{titel:"De ontstekingsreactie",
  html:`<p>Komt een ziekteverwekker door de barrières heen, bijvoorbeeld via een wondje, dan volgt een <b>ontstekingsreactie</b>. Ook die hoort bij de aangeboren, niet-specifieke afweer.</p>
  <ul><li>Beschadigde cellen en afweercellen, zoals <b>mestcellen</b>, geven <b>mediatoren</b> af. Een bekende mediator is <b>histamine</b>.</li>
  <li>De mediatoren werken op de kleine bloedvaten in het ontstoken gebied. Daardoor komen er meer bloed, bloedplasma en <b>fagocyten</b> (eetcellen) bij de infectie.</li>
  <li>Fagocyten kruipen door de vaatwand naar het weefsel en eten de bacteriën op (<b>fagocytose</b>).</li></ul>
  <p>Je herkent een ontsteking aan vier kenmerken: <b>rood, warm, gezwollen en pijnlijk</b>. Bij een <b>allergie</b> gebeurt ongeveer hetzelfde, maar dan tegen een onschuldige stof. Wat de mediatoren precies met de bloedvaten doen, kun je opzoeken in je informatieboek.</p>`,
  anim:anim(["Via een wondje komen bacteriën het weefsel binnen.","Mestcellen geven mediatoren af, zoals histamine. Die verspreiden zich door het weefsel en werken op de bloedvaatjes.","Fagocyten worden aangetrokken. Ze verlaten het bloedvat en kruipen naar de bacteriën toe.","De fagocyten nemen de bacteriën op en breken ze af. Ondertussen is de plek rood, warm, dik en pijnlijk."],ontstSvg),
  films:[["De eerste verdediging","films/afweer/1-de-eerste-verdediging.html"]]});

function vatSvg(i){
  const half=i===0?28:58, y0=120-half, y1=120+half, gap=i===2?12:3;
  let s=T(20,22,"weefsel","tick","start");
  s+=R(30,y0,480,y1-y0,"var(--koraal-soft)","none");
  for(let x=30;x<510;x+=40){s+=R(x+gap/2,y0-8,40-gap,8,"var(--surface)","var(--text2)",3)+R(x+gap/2,y1,40-gap,8,"var(--surface)","var(--text2)",3);}
  const n=i===0?5:11;
  for(let k=0;k<n;k++){const x=60+k*(440/(n-1)),y=120+((k%3)-1)*(half*.5);s+=`<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="12" ry="6" style="fill:var(--koraal)"/>`;}
  s+=pijl(40,120,140,120,"var(--text)",1.6)+T(40,110,"bloed stroomt","tick","start","fill:var(--text)");
  s+=`<path d="M522,${y0-8} h10 V${y1+8} h-10" style="fill:none;stroke:var(--text2);stroke-width:1.6"/>`+T(538,124,i===0?"smal":"wijder","lblm","start");
  if(i===0)s+=T(400,40,"normaal","lbl");
  if(i===1)s+=tag(380,198,170,"ROOD EN WARM","","var(--koraal)");
  if(i===2){[110,230,350].forEach(x=>{s+=pijl(x,y0-4,x-6,y0-30,"var(--teal)",1.8)+C(x-9,y0-38,3.5,"var(--teal)","none",0)+pijl(x,y1+12,x+6,y1+34,"var(--teal)",1.8)+C(x+9,y1+40,3.5,"var(--teal)","none",0);});
    s+=tag(380,198,170,"ZWELLING","","var(--teal)");}
  return SV("0 0 600 240",s,"Bloedvat bij een ontsteking: normaal, verwijd, en met een doorlaatbare wand");
}
E.waarom(T1,38,anim([
  "Normaal: een smal bloedvaatje met een dichte wand.",
  "Mediatoren laten de bloedvaten <b>verwijden</b>. Er stroomt meer bloed door het weefsel: het wordt <b>rood</b> en warm. Dat is het eerste punt.",
  "Mediatoren maken de vaatwand ook <b>beter doorlaatbaar</b>. Bloedplasma lekt het weefsel in en hoopt zich op: de uier <b>zwelt op</b>. Dat is het tweede punt."],vatSvg));

/* --- vraag 39–40: specifieke afweer en immuniteit --- */
function bcel(x,y,k,on,r=22){let s=C(x,y,r,"var(--teal-soft)",on?"var(--goud)":"var(--teal)",on?3:1.6);
  [0,72,144,216,288].forEach(d=>{const a=(d-90)*Math.PI/180;s+=Yv(x+(r+2)*Math.cos(a),y+(r+2)*Math.sin(a),d+180,k,.7);});return s;}
function kloonSvg(i){
  let s="";
  const kl=["var(--paars)","var(--goud)","var(--koraal)","var(--text3)"];
  if(i===0){s+=`<ellipse cx="100" cy="120" rx="44" ry="26" style="fill:color-mix(in srgb, var(--groen) 30%, transparent);stroke:var(--groen);stroke-width:2"/>`;
    [[-30,-26],[30,-26],[0,28]].forEach(([a,b])=>s+=`<polygon points="${100+a-6},${120+b} ${100+a+6},${120+b} ${100+a},${120+b+(b<0?-10:10)}" style="fill:var(--goud)"/>`);
    s+=T(100,176,"bacterie met antigenen","lblm");
    [[260,70],[360,70],[260,170],[360,170]].forEach(([x,y],k)=>s+=bcel(x,y,kl[k],k===1));
    s+=T(310,232,"B-cellen, elk met een eigen receptor","lblm");s+=T(395,74,"past!","lbl","start","fill:var(--goud-text)");}
  if(i===1){s+=bcel(200,120,"var(--goud)",true,26)+C(330,120,22,"var(--paars-soft)","var(--paars)",1.6)+T(330,124,"Th","lbl");
    s+=pijl(306,120,234,120,"var(--paars)",2.2)+T(330,168,"T-helpercel","lblm")+T(200,176,"B-cel wordt geactiveerd","lblm");}
  if(i===2){s+=bcel(70,120,"var(--goud)",true,18);
    [[180,80],[180,160]].forEach(([x,y])=>{s+=pijl(92,120,x-24,y,"var(--text3)",1.6)+bcel(x,y,"var(--goud)",false,16);});
    [[300,40],[300,90],[300,150],[300,200]].forEach(([x,y],k)=>{s+=pijl(198,k<2?80:160,x-22,y,"var(--text3)",1.4)+bcel(x,y,"var(--goud)",false,14);});
    s+=T(430,124,"deling: een kloon","lbl");}
  if(i===3){[[120,70],[120,170]].forEach(([x,y])=>{s+=C(x,y,26,"var(--teal-soft)","var(--teal)",1.6)+`<path d="M${x-14},${y-6} h28 M${x-14},${y} h28 M${x-14},${y+6} h28" style="stroke:var(--teal);stroke-width:1.2;opacity:.6"/>`;
      [[60,-30],[70,0],[60,30],[90,-14],[90,16]].forEach(([a,b],k)=>s+=Yv(x+a,y+b,90+k*25,"var(--goud)",.8));});
    s+=T(120,232,"plasmacellen maken antistoffen","lblm");
    s+=bcel(400,90,"var(--goud)",false,18)+bcel(460,150,"var(--goud)",false,18);
    s+=T(430,210,"geheugencellen","lblm")+T(430,226,"blijven jaren","tick");}
  return SV("0 0 560 240",s,"Specifieke afweer: B-cel herkent antigeen, wordt geactiveerd, deelt en vormt plasmacellen en geheugencellen");
}
E.zet(T1,[39,40],{titel:"Specifieke afweer: antistoffen en immuniteit",
  html:`<p>De <b>specifieke afweer</b> richt zich op één bepaald <b>antigeen</b>: een molecuul op een ziekteverwekker dat je lichaam als lichaamsvreemd herkent.</p>
  <ul><li>Elke <b>B-lymfocyt</b> (B-cel) heeft receptoren voor één antigeen. Past het antigeen, dan wordt die B-cel met hulp van een <b>T-helpercel</b> geactiveerd en deelt hij vaak.</li>
  <li>Een deel van de nieuwe cellen wordt <b>plasmacel</b>: die maakt in korte tijd heel veel <b>antistoffen</b> tegen dat ene antigeen.</li>
  <li>Een ander deel wordt <b>geheugencel</b>. Die blijven jaren in je lichaam en zorgen bij een volgende besmetting voor een snelle, sterke reactie: je bent <b>immuun</b>.</li></ul>
  <p><b>Actieve immuniteit</b>: je eigen afweer wordt aan het werk gezet, na een infectie of een vaccinatie. <b>Passieve immuniteit</b>: je krijgt kant-en-klare antistoffen van buiten, bijvoorbeeld van je moeder via de placenta of de moedermelk. Die werken meteen, maar worden na een tijd afgebroken.</p>`,
  anim:anim(["Je hebt miljoenen B-cellen, elk met een andere receptor. Eén ervan past op het antigeen van deze bacterie.","Een T-helpercel geeft het signaal: de passende B-cel wordt geactiveerd.","De geactiveerde B-cel deelt zich vaak. Zo ontstaat een kloon van gelijke cellen.","Een deel wordt <b>plasmacel</b> en maakt grote hoeveelheden antistoffen. Een ander deel wordt <b>geheugencel</b>."],kloonSvg),
  films:[["Antistoffen op maat","films/afweer/2-antistoffen-op-maat.html"],["Vaccins, allergie en bloedgroepen","films/afweer/4-vaccins-allergie-en-bloedgroepen.html"]]});

function immSvg(i){
  const X=t=>60+t*38,Y=v=>270-v*19;let s="";
  s+=`<path class="ax" d="M60,56 V270 H520"/>`;
  s+=`<text class="lblm" transform="translate(28,165) rotate(-90)" text-anchor="middle">antistoffen in het bloed</text>`+T(290,306,"tijd (weken)","lblm");
  for(let t=0;t<=12;t+=2)s+=T(X(t),286,t,"tick");
  const sm=u=>(1-Math.cos(Math.PI*Math.max(0,Math.min(1,u))))/2;
  const prim=(t,t0)=>t<t0+1?0:t<t0+2.2?4*sm((t-t0-1)/1.2):4-3*sm((t-t0-2.2)/3);
  const act=t=>t<7?prim(t,1):Math.max(prim(t,1),t<7.3?prim(7,1):t<8.3?prim(7,1)+(9-prim(7,1))*sm((t-7.3)/1):9-3*sm((t-8.3)/4));
  const pas=t=>t<1?0:6*Math.exp(-(t-1)/1.6)+(t>=7?prim(t,7):0);
  const pad=(f,a,b)=>{let d="";for(let t=a;t<=b+1e-9;t+=.1)d+=(d?"L":"M")+f1(X(t))+","+f1(Y(f(t)));return d;};
  const act_=i<=1, end=i===0||i===2?6:12;
  s+=`<line x1="${X(1)}" y1="56" x2="${X(1)}" y2="270" class="grid" style="stroke-dasharray:4 4"/>`+T(X(1)+4,Y(10.6),act_?"infectie of vaccinatie":"antistoffen toegediend","tick","start");
  if(act_){s+=`<path d="${pad(act,0,end)}" style="fill:none;stroke:var(--teal);stroke-width:2.8"/>`;
    s+=tag(60,6,150,"ACTIEF","","var(--teal)")+T(X(3.6),Y(4.4),"eerste reactie: traag","lblm","start");}
  else{s+=`<path d="${pad(pas,0,end)}" style="fill:none;stroke:var(--goud);stroke-width:2.8"/><line x1="${X(1)}" y1="${Y(0)}" x2="${X(1)}" y2="${Y(6)}" style="stroke:var(--goud);stroke-width:2.8"/>`;
    s+=tag(60,6,150,"PASSIEF","","var(--goud)")+T(X(1.6),Y(5.6),"direct veel, daarna afgebroken","lblm","start");}
  if(end===12){s+=`<line x1="${X(7)}" y1="56" x2="${X(7)}" y2="270" class="grid" style="stroke-dasharray:4 4"/>`+T(X(7)+4,Y(10.6),"nieuwe besmetting","tick","start");
    s+=act_?T(X(8.6),Y(9.5),"snel en sterk","lblm","start"):T(X(9.4),Y(4.5),"weer traag, vanaf nul","lblm","start");}
  const gx=X(act_?1.5:4.2),gy=act_?Y(8.2):Y(2.4);
  if(act_){[0,1,2].forEach(k=>s+=C(gx+k*16,gy,6,"var(--teal-soft)","var(--teal)",1.4));s+=T(gx+44,gy+4,"geheugencellen ✓","lblm","start","fill:var(--teal)");}
  else{[0,1,2].forEach(k=>s+=C(gx+k*16,gy,6,"none","var(--text3)",1.2,"stroke-dasharray:2 2"));s+=T(gx+44,gy+4,"geen geheugencellen","lblm","start","fill:var(--koraal)");}
  return SV("0 0 540 314",s,"Grafiek van de hoeveelheid antistoffen in de tijd bij actieve en passieve immuniteit");
}
E.waarom(T1,40,anim([
  "<b>Actieve immuniteit</b>: na een infectie of vaccinatie maakt je eigen afweer de antistoffen. De eerste keer duurt dat even. Er ontstaan ook geheugencellen.",
  "Bij een nieuwe besmetting reageren de geheugencellen meteen: sneller en sterker. Dat is immuun zijn.",
  "Bij Mastivax krijgt de koe <b>kant-en-klare antistoffen</b>: <b>passieve</b> immuniteit. Ze werken direct, maar worden afgebroken.",
  "De B-cellen van de koe zelf zijn niet geactiveerd, dus er ontstaan <b>geen geheugencellen</b>. Bij een nieuwe besmetting begint ze weer vanaf nul. Antwoord: passief · nee (<b>D</b>)."],immSvg));

/* --- vraag 41: antistoffen --- */
function antistofSvg(){
  let s="";
  s+=`<path d="M150,220 V140 M150,140 L92,72 M150,140 L208,72" style="stroke:var(--goud);stroke-width:14;fill:none;stroke-linecap:round"/>`;
  s+=`<path d="M86,58 l6,14 l6,-6 Z M214,58 l-6,14 l-6,-6 Z" style="fill:none"/>`;
  s+=C(92,72,10,"var(--surface2)","var(--teal)",2.6)+C(208,72,10,"var(--surface2)","var(--teal)",2.6);
  s+=T(92,40,"bindingsplaats","lbl","middle","fill:var(--teal)")+T(208,40,"bindingsplaats","lbl","middle","fill:var(--teal)");
  s+=`<line x1="92" y1="46" x2="92" y2="58" style="stroke:var(--teal)"/><line x1="208" y1="46" x2="208" y2="58" style="stroke:var(--teal)"/>`;
  s+=T(168,200,"steel","lbl","start")+T(168,216,"(bij alle antistoffen gelijk)","tick","start");
  s+=`<line x1="290" y1="20" x2="290" y2="230" style="stroke:var(--line2);stroke-dasharray:4 4"/>`;
  s+=T(420,24,"sleutel op slot","lbl","middle","font-size:14px");
  /* passende en niet-passende vorm */
  s+=`<path d="M330,120 h40 l10,-14 l10,14 h40" style="fill:none;stroke:var(--groen);stroke-width:3"/>`+T(380,146,"antigeen","lblm","middle","fill:var(--groen)");
  s+=`<path d="M340,92 h30 l10,14 l10,-14 h30" style="fill:none;stroke:var(--teal);stroke-width:3"/>`+T(380,80,"bindingsplaats","lblm","middle","fill:var(--teal)")+T(456,112,"past ✓","lbl","start","fill:var(--teal)");
  s+=`<path d="M330,200 h40 l10,-14 l10,14 h40" style="fill:none;stroke:var(--groen);stroke-width:3"/>`;
  s+=`<path d="M340,170 h30 v10 h20 v-10 h30" style="fill:none;stroke:var(--koraal);stroke-width:3"/>`+T(456,192,"past niet ✗","lbl","start","fill:var(--koraal)");
  return SV("0 0 560 236",s,"Bouw van een antistof: Y-vormig eiwit met twee bindingsplaatsen aan de armen en een steel; de bindingsplaats past op één antigeen");
}
E.zet(T1,[41],{titel:"Antistoffen: bouw en werking",
  html:`<p>Een <b>antistof</b> is een Y-vormig eiwit. Aan de uiteinden van de twee armen zitten de <b>bindingsplaatsen</b>. Hun vorm past precies op één <b>antigeen</b>, zoals een sleutel op een slot. De <b>steel</b> is bij alle antistoffen van één type gelijk.</p>
  <p>Een antistof doodt een bacterie meestal niet zelf. Antistoffen helpen op andere manieren:</p>
  <ul><li>Ze <b>klonteren</b> ziekteverwekkers samen (agglutinatie): met twee armen kan één antistof aan twee bacteriën binden.</li>
  <li>Ze <b>markeren</b> de ziekteverwekker. Fagocyten, zoals <b>macrofagen</b>, herkennen een gemarkeerde bacterie makkelijker en nemen hem op.</li>
  <li>Ze bedekken de plek waarmee een virus of een gifstof aan een cel bindt.</li></ul>`,
  anim:vast(antistofSvg(),560),
  films:[["Antistoffen op maat","films/afweer/2-antistoffen-op-maat.html"]]});

/* --- vraag 42: celorganellen --- */
function celSvg(){
  let s=`<ellipse cx="220" cy="150" rx="196" ry="128" style="fill:var(--surface);stroke:var(--text2);stroke-width:2"/>`;
  s+=C(196,150,46,"var(--paars-soft)","var(--paars)",1.8)+C(206,140,12,"var(--paars)","none",0,"opacity:.5");
  s+=`<path d="M252,112 C270,100 284,116 270,128 C256,140 280,154 266,166 C252,178 276,190 258,198" style="fill:none;stroke:var(--teal);stroke-width:2.4"/><path d="M262,104 C284,94 298,116 282,128 C268,140 292,154 278,168 C264,182 290,196 268,206" style="fill:none;stroke:var(--teal);stroke-width:2.4"/>`;
  [[262,118],[276,136],[262,156],[280,176],[264,190],[290,124]].forEach(([x,y])=>s+=C(x,y,2.6,"var(--text)","none",0));
  [0,1,2,3].forEach(k=>s+=`<path d="M${312+k*4},${74+k*9} q30,-12 60,0" style="fill:none;stroke:var(--goud);stroke-width:3;stroke-linecap:round"/>`);
  s+=C(368,128,6,"var(--goud-soft)","var(--goud)",1.4)+C(352,140,5,"var(--goud-soft)","var(--goud)",1.4);
  s+=`<ellipse cx="96" cy="226" rx="36" ry="16" style="fill:var(--koraal-soft);stroke:var(--koraal);stroke-width:1.8"/><path d="M66,226 l8,-8 l8,16 l8,-16 l8,16 l8,-16 l8,16 l8,-8" style="fill:none;stroke:var(--koraal);stroke-width:1.4"/>`;
  [[324,214,14],[110,82,11]].forEach(([x,y,r])=>{s+=C(x,y,r,"var(--groen-soft)","var(--groen)",1.8);[[-4,-3],[4,-2],[0,4]].forEach(([a,b])=>s+=C(x+a,y+b,1.8,"var(--groen)","none",0));});
  const lab=(y,naam,taak,px,py)=>`<line x1="${px}" y1="${py}" x2="446" y2="${y-4}" style="stroke:var(--text3);stroke-width:1"/>`+T(452,y-4,naam,"lbl","start")+T(452,y+11,taak,"tick","start");
  s+=lab(30,"celkern","DNA, regelt de cel",210,108);
  s+=lab(72,"golgi-systeem","verpakt stoffen in blaasjes",372,74);
  s+=lab(114,"ribosomen","maken eiwitten",290,124);
  s+=lab(156,"ER","vervoert en bewerkt eiwitten",284,160);
  s+=lab(206,"lysosoom","blaasje vol afbraakenzymen",338,212);
  s+=lab(262,"mitochondrium","aerobe dissimilatie: energie",130,230);
  return SV("0 0 640 290",s,"Dierlijke cel met celkern, ER met ribosomen, golgi-systeem, lysosomen en mitochondrium, met hun taak");
}
E.zet(T1,[42],{titel:"Celorganellen en hun taak",
  html:`<p>Een dierlijke cel bevat <b>organellen</b>, elk met een eigen taak.</p>
  <ul><li><b>Celkern</b>: bevat het DNA en regelt wat de cel doet.</li>
  <li><b>Ribosomen</b>: maken eiwitten, ook de enzymen van de cel. Ze liggen los in het cytoplasma of op het ruw <b>ER</b>.</li>
  <li><b>ER en golgi-systeem</b>: bewerken en vervoeren eiwitten en verpakken stoffen in <b>blaasjes</b>.</li>
  <li><b>Mitochondriën</b>: aerobe dissimilatie, ze leveren energie.</li>
  <li><b>Lysosomen</b>: blaasjes vol <b>afbraakenzymen</b>. Ze ruimen onder andere versleten celonderdelen op.</li></ul>`,
  anim:vast(celSvg(),640),
  films:[["Celorganellen","films/cellen/celorganellen/index.html"]]});

function fagoSvg(i){
  let s=`<ellipse cx="220" cy="125" rx="130" ry="88" style="fill:var(--teal-soft);stroke:var(--teal);stroke-width:2"/>`;
  s+=C(160,120,28,"var(--paars-soft)","var(--paars)",1.6)+T(160,124,"kern","tick");
  const lys=(x,y)=>C(x,y,12,"var(--groen-soft)","var(--groen)",1.8)+[[-4,-3],[4,-2],[0,4]].map(([a,b])=>C(x+a,y+b,1.8,"var(--groen)","none",0)).join("");
  if(i===0){s+=bac(440,120)+lys(250,70)+lys(240,180)+T(440,150,"bacterie","lblm")+T(250,48,"lysosoom","lblm");}
  if(i===1){s+=`<path d="M330,80 C380,50 440,70 452,104" style="fill:none;stroke:var(--teal-soft);stroke-width:22;stroke-linecap:round"/><path d="M330,170 C380,200 440,180 452,146" style="fill:none;stroke:var(--teal-soft);stroke-width:22;stroke-linecap:round"/>`;
    s+=`<path d="M326,70 C380,38 450,62 462,104 M326,180 C380,212 450,188 462,146" style="fill:none;stroke:var(--teal);stroke-width:2"/>`;
    s+=bac(410,125)+lys(250,70)+lys(240,180)+T(440,226,"schijnvoetjes","lblm");}
  if(i===2){s+=C(300,125,24,"none","var(--text2)",1.6,"stroke-dasharray:4 3")+bac(300,125,"var(--groen)",false,.8)+lys(250,70)+lys(268,164);
    s+=pijl(258,154,280,142,"var(--groen)",2)+T(330,90,"blaasje met bacterie","lblm","start");}
  if(i===3){s+=C(300,125,26,"var(--groen-soft)","var(--groen)",1.8)+lys(250,70);
    [[290,118],[306,128],[296,134],[310,114]].forEach(([x,y],k)=>s+=`<path d="M${x},${y} q5,-4 10,0" style="fill:none;stroke:var(--groen);stroke-width:2;stroke-dasharray:3 2"/>`);
    [[286,108],[316,140],[300,104],[284,140]].forEach(([x,y])=>s+=C(x,y,2,"var(--groen)","none",0));
    s+=T(336,100,"enzymen breken","lblm","start")+T(336,116,"de bacterie af","lblm","start");s+=tag(392,180,148,"LYSOSOOM","","var(--groen)");}
  return SV("0 0 560 240",s,"Fagocytose door een macrofaag en afbraak van de bacterie door een lysosoom");
}
E.waarom(T1,42,anim([
  "De macrofaag herkent de bacterie. In zijn cytoplasma liggen <b>lysosomen</b>: blaasjes vol afbraakenzymen.",
  "Met schijnvoetjes omsluit de macrofaag de bacterie (fagocytose).",
  "De bacterie zit nu in een blaasje in de macrofaag. Een lysosoom versmelt met dat blaasje.",
  "De enzymen uit het lysosoom breken de bacterie af. Het juiste organel is dus het <b>lysosoom</b> (B). Ribosomen en ER maken die enzymen wel, maar breken zelf niets af."],fagoSvg));

/* --- vraag 43: selectie van resistente bacteriën --- */
const POS=[];for(let r=0;r<3;r++)for(let c=0;c<4;c++)POS.push([28+c*40+(r%2)*10,46+r*40]);
function selPaneel(x0,titel,res,dood,ab){
  let s=R(x0,20,180,150,ab?"var(--goud-soft)":"var(--surface)","var(--line2)",10)+T(x0+90,14,titel,"lbl");
  POS.forEach(([x,y],k)=>{const r=res.includes(k);s+=bac(x0+x,y+16,r?"var(--koraal)":"var(--teal)",dood&&!r,.8);});
  if(ab)s+=T(x0+90,164,"antibioticum","tick","middle","fill:var(--goud-text)");
  return s;
}
function selStatisch(){
  let s=selPaneel(0,"1 variatie",[6],false,false)+selPaneel(210,"2 selectie",[6],true,true)+selPaneel(420,"3 vermeerdering",[0,1,2,3,4,5,6,7,8,9,10,11],false,false);
  s+=pijl(184,96,206,96,"var(--text2)",2)+pijl(394,96,416,96,"var(--text2)",2);
  s+=bac(160,196,"var(--teal)",false,.7)+T(176,200,"gevoelig","lblm","start")+bac(300,196,"var(--koraal)",false,.7)+T(316,200,"resistent","lblm","start");
  return SV("0 0 600 212",s,"Natuurlijke selectie bij bacteriën: variatie, selectie door een antibioticum, vermeerdering van de resistente bacteriën");
}
E.zet(T1,[43],{titel:"Natuurlijke selectie en antibioticaresistentie",
  html:`<p><b>Antibiotica</b> zijn stoffen die bacteriën doden of hun groei remmen. Tegen virussen werken ze niet.</p>
  <ul><li>In een grote groep bacteriën zijn ze niet allemaal gelijk. Door <b>mutaties</b> in het DNA is er <b>variatie</b>. Soms is een bacterie daardoor toevallig minder gevoelig voor een antibioticum: hij is <b>resistent</b>.</li>
  <li>Het antibioticum werkt als <b>selectiefactor</b>: gevoelige bacteriën gaan dood, resistente overleven en delen zich. Hun nakomelingen zijn ook resistent.</li>
  <li>Bacteriën kunnen genen voor resistentie bovendien aan elkaar doorgeven, via plasmiden.</li></ul>
  <p>Belangrijk: de mutatie was er al vóórdat het antibioticum kwam. Het antibioticum veroorzaakt de resistentie niet, het bepaalt welke bacteriën overblijven.</p>`,
  anim:vast(selStatisch(),600),
  films:[["De mens als selectiefactor","films/evolutie/4-de-mens-als-selectiefactor.html"],["Natuurlijke selectie","films/evolutie/2-natuurlijke-selectie.html"]]});

function resSvg(i){
  let s="";const pos=[];for(let r=0;r<3;r++)for(let c=0;c<8;c++)pos.push([40+c*44+(r%2)*14,40+r*40]);
  const res=i===2?pos.map((p,k)=>k).filter(k=>k%6!==2):[5,17];
  if(i<3){s+=R(10,12,390,136,i===1?"var(--goud-soft)":"var(--surface)","var(--line2)",10);
    pos.forEach(([x,y],k)=>{const r=res.includes(k);s+=bac(x,y,r?"var(--koraal)":"var(--teal)",i===1&&!r,.85);});
    if(i===1)s+=T(205,164,"antibioticum","lblm","middle","fill:var(--goud-text)");
    s+=bac(430,40,"var(--teal)",false,.7)+T(446,44,"gevoelig","lblm","start")+bac(430,70,"var(--koraal)",false,.7)+T(446,74,"resistent","lblm","start");}
  else{const Xb=k=>80+k*130,h=[.08,.6,.95];
    s+=`<path class="ax" d="M50,20 V180 H480"/>`+T(40,24,"100%","tick","end")+T(40,184,"0%","tick","end");
    h.forEach((v,k)=>{s+=R(Xb(k),180-v*160,70,v*160,"var(--koraal-soft)","var(--koraal)",4)+T(Xb(k)+35,200,`na ${k+1}× behandelen`,"tick");});
    s+=`<text class="lblm" transform="translate(18,100) rotate(-90)" text-anchor="middle">aandeel resistent</text>`;}
  return SV("0 0 560 210",s,"Bacteriën in een uier voor en na antibiotica, en het aandeel resistente bacteriën na meerdere behandelingen");
}
E.waarom(T1,43,anim([
  "In de uier leven veel bacteriën. Door mutaties zijn er toevallig een paar <b>resistent</b> (rood). Dat was al zo vóór de behandeling.",
  "De koe krijgt antibiotica. De gevoelige bacteriën gaan dood, de resistente blijven over.",
  "De resistente bacteriën delen zich. Na een tijd is bijna de hele groep resistent.",
  "Bij elke behandeling gebeurt dit weer: het aandeel resistente bacteriën groeit. Dat is <b>selectie</b> van resistente bacteriën (C). Bacteriën worden niet ‘immuun’: ze hebben geen afweersysteem. En accumulatie gaat over stoffen die zich ophopen in een voedselketen."],resSvg));

/* =====================================================================
   havo26-2 · opgave 7 Paarden voeren zonder brokken
   ===================================================================== */

/* --- vraag 40: vertering van koolhydraten --- */
const ORG=[["mond","pH ± 7"],["maag","pH ± 2"],["dunne darm","pH ± 8"],["dikke darm","bacteriën"]];
function verterSvg(i){
  let s="";
  ORG.forEach(([n,ph],k)=>{const x=20+k*145,on=k===i;s+=R(x,14,120,50,on?"var(--goud-soft)":"var(--surface)",on?"var(--goud)":"var(--line2)",10)+T(x+60,36,n,"lbl")+T(x+60,54,ph,"tick");
    if(k<3)s+=pijl(x+122,39,x+143,39,"var(--text3)",1.6);});
  s+=T(20,104,"zetmeel","lblm","start")+T(20,164,"cellulose","lblm","start");
  const zk="var(--goud)",ck="var(--groen)";
  if(i===0)s+=keten(110,100,4,zk)+keten(200,100,2,zk)+keten(250,100,2,zk)+T(300,104,"amylase knipt zetmeel in stukken (maltose)","tick","start");
  if(i===1)s+=keten(110,100,4,zk)+keten(200,100,2,zk)+keten(250,100,2,zk)+T(300,104,"zoutzuur: pH ± 2","tick","start");
  if(i===2){[0,1,2,3,4,5,6,7].forEach(k=>s+=hex(110+k*26,100,zk));s+=T(320,104,"monosachariden → opgenomen in het bloed","tick","start");}
  if(i===3)s+=T(110,104,"(al opgenomen in de dunne darm)","tick","start");
  if(i<3)s+=keten(110,160,8,ck)+T(330,164,"wordt niet verteerd","tick","start");
  else{s+=keten(110,160,2,ck)+hex(170,160,ck)+hex(196,160,ck)+keten(226,160,2,ck)+bac(206,190,"var(--teal)",false,.7)+bac(270,190,"var(--teal)",false,.7);
    s+=T(330,164,"bacteriën breken cellulose af","tick","start")+T(330,180,"water wordt teruggenomen","tick","start");}
  return SV("0 0 600 210",s,"Vertering van zetmeel en cellulose in mond, maag, dunne darm en dikke darm");
}
E.zet(T2,[40],{titel:"Vertering van koolhydraten",
  html:`<p><b>Koolhydraten</b> zijn opgebouwd uit suikers. <b>Monosachariden</b> (zoals glucose en fructose) zijn de bouwstenen. <b>Disachariden</b> (zoals maltose) bestaan uit twee, <b>polysachariden</b> (zetmeel, glycogeen, cellulose) uit heel veel.</p>
  <ul><li><b>Mond</b>: speeksel bevat <b>amylase</b>, dat zetmeel knipt in maltose.</li>
  <li><b>Maag</b>: maagsap bevat zoutzuur, de pH is ongeveer 2. Pepsine begint hier met de vertering van eiwitten.</li>
  <li><b>Dunne darm</b>: alvleessap (amylase) en darmsap (o.a. maltase) knippen verder tot <b>monosachariden</b>, bij een licht basische pH. De darmvlokken nemen ze op in het <b>bloed</b>.</li>
  <li><b>Dikke darm</b>: hier wordt water teruggenomen. Bacteriën breken stoffen af die je zelf niet kunt verteren, zoals <b>cellulose</b> (voedingsvezel).</li></ul>
  <p>Elk enzym werkt het best bij zijn eigen <b>optimum-pH</b>.</p>`,
  anim:anim(["<b>Mond</b>: speekselamylase knipt zetmeel in kleinere stukken. Cellulose blijft heel: daarvoor heb je geen enzym.","<b>Maag</b>: zoutzuur maakt de pH ongeveer 2. Pepsine verteert hier eiwitten.","<b>Dunne darm</b>: enzymen uit alvleessap en darmsap knippen alles tot monosachariden. De darmvlokken nemen die op in het bloed.","<b>Dikke darm</b>: bacteriën breken een deel van de cellulose af. De darmwand neemt water terug uit de voedselbrij."],verterSvg,600),
  films:[["De reis door je buik","films/voeding/2-de-reis-door-je-buik.html"],["Knippen op maat","films/voeding/3-knippen-op-maat.html"]]});

function kh40Svg(i){
  let s="";
  if(i===0){const X=p=>60+p*36,Y=v=>200-v*160;
    s+=`<path class="ax" d="M60,30 V200 H500"/>`;for(let p=0;p<=12;p+=2)s+=T(X(p),216,p,"tick");
    s+=T(280,234,"pH","lblm")+`<text class="lblm" transform="translate(30,115) rotate(-90)" text-anchor="middle">activiteit amylase</text>`;
    s+=R(X(1.3),30,X(2.7)-X(1.3),170,"var(--koraal-soft)","none");s+=T(X(2),46,"maag","lbl","middle","fill:var(--koraal)");
    let d="";for(let p=0;p<=12;p+=.1)d+=(d?"L":"M")+f1(X(p))+","+f1(Y(Math.exp(-(((p-7)/1.6)**2))));
    s+=`<path d="${d}" style="fill:none;stroke:var(--teal);stroke-width:2.8"/>`+T(X(7),Y(1)-8,"optimum ± pH 7","lblm");
    s+=C(X(2),Y(Math.exp(-(((2-7)/1.6)**2))),6,"var(--koraal)","none",0);}
  if(i===1){s+=`<path d="M200,210 V80 C200,30 300,30 300,80 V210" style="fill:var(--surface);stroke:var(--text2);stroke-width:1.8"/>`;
    s+=`<path d="M232,210 V86 C232,62 268,62 268,86 V210" style="fill:none;stroke:var(--koraal);stroke-width:5;opacity:.6"/>`;
    s+=T(320,90,"darmvlok","lbl","start")+T(320,140,"bloedvat","lblm","start","fill:var(--koraal)");
    [[150,70],[130,120],[160,160],[110,90]].forEach(([x,y])=>s+=hex(x,y,"var(--goud)",8));
    s+=pijl(168,120,226,120,"var(--goud)",2)+T(60,200,"monosachariden","lblm","start");}
  if(i===2){s+=keten(40,60,6,"var(--groen)")+T(40,36,"cellulose","lbl","start");
    s+=pijl(150,80,150,110,"var(--text2)",2)+T(162,100,"bacteriën","lblm","start");
    s+=R(30,120,240,60,"var(--groen-soft)","var(--groen)",10)+T(150,144,"glucose, vetzuren","lbl")+T(150,164,"bevatten C: organisch","lblm");
    s+=R(300,120,230,60,"var(--surface)","var(--line2)",10)+T(415,144,"CO₂ en H₂O","lbl")+T(415,164,"anorganisch","lblm");
    s+=T(415,104,"pas bij volledige afbraak","tick");}
  return SV("0 0 560 240",s,"Uitleg bij de drie uitspraken over koolhydraten");
}
E.waarom(T2,40,anim([
  "<b>1 onjuist.</b> Amylase werkt het best rond pH 7. In de maag is de pH ongeveer 2: daar doet amylase bijna niets.",
  "<b>2 juist.</b> In de dunne darm worden zetmeel en disachariden verteerd tot monosachariden. De darmvlokken nemen ze op in het bloed.",
  "<b>3 juist.</b> Bacteriën breken cellulose af tot kleinere stoffen zoals glucose en vetzuren. Die bevatten koolstof: <b>organisch</b>. Anorganisch (CO₂ en water) wordt het pas bij volledige dissimilatie."],kh40Svg));

/* --- vraag 41: assimilatie --- */
function assimSvg(){
  const box=(x,y,w,t,org)=>R(x,y,w,44,org?"var(--groen-soft)":"var(--surface)",org?"var(--groen)":"var(--text3)",10)+T(x+w/2,y+27,t,"lbl");
  let s=box(10,30,120,"CO₂ + H₂O",false)+box(250,30,110,"glucose",true)+box(450,30,140,"zetmeel, cellulose",true);
  s+=box(10,160,120,"nitraat",false)+box(250,160,110,"aminozuren",true)+box(450,160,140,"eiwitten",true);
  s+=pijl(132,52,246,52,"var(--goud)",2.4)+T(189,42,"koolstofassimilatie","tick")+T(189,72,"(fotosynthese, licht)","tick");
  s+=pijl(132,182,246,182,"var(--teal)",2.4)+T(189,172,"stikstofassimilatie","tick");
  s+=pijl(305,76,305,156,"var(--teal)",2)+T(312,120,"+ glucose","tick","start");
  s+=pijl(362,52,446,52,"var(--paars)",2.4)+T(404,42,"voortgezette","tick")+T(404,72,"assimilatie","tick");
  s+=pijl(362,182,446,182,"var(--paars)",2.4)+T(404,172,"voortgezette","tick")+T(404,202,"assimilatie","tick");
  s+=R(10,226,14,14,"var(--surface)","var(--text3)",3)+T(30,238,"anorganisch","lblm","start")+R(130,226,14,14,"var(--groen-soft)","var(--groen)",3)+T(150,238,"organisch","lblm","start");
  return SV("0 0 600 248",s,"Schema van koolstofassimilatie, stikstofassimilatie en voortgezette assimilatie");
}
E.zet(T2,[41],{titel:"Assimilatie: koolstof, stikstof en voortgezet",
  html:`<p><b>Organische stoffen</b> bevatten koolstof en zijn door organismen gemaakt: koolhydraten, vetten, eiwitten en DNA. <b>Anorganische stoffen</b> zijn onder andere water, CO<sub>2</sub>, zuurstof en zouten zoals nitraat.</p>
  <p><b>Assimilatie</b> is het opbouwen van grotere organische stoffen. Dat kost energie. Er zijn drie soorten:</p>
  <ul><li><b>Koolstofassimilatie</b> (fotosynthese): een plant maakt met lichtenergie glucose uit CO<sub>2</sub> en water. Daarbij komt zuurstof vrij.</li>
  <li><b>Stikstofassimilatie</b>: een plant maakt aminozuren met glucose en nitraat uit de bodem.</li>
  <li><b>Voortgezette assimilatie</b>: van organische stoffen andere organische stoffen maken, zoals zetmeel en cellulose uit glucose, of eiwitten uit aminozuren.</li></ul>
  <p>Kijk dus naar het <b>beginmateriaal</b>: is dat anorganisch of al organisch? Het afbreken van stoffen voor energie heet <b>dissimilatie</b>.</p>`,
  anim:vast(assimSvg(),600),
  films:[["Alles in het groen","films/stofwisseling/3-alles-in-het-groen.html"]]});

/* --- vraag 42: enzymen en temperatuur --- */
const enzym=(x,y,k="var(--paars)",kapot=false)=>kapot?`<path d="M${x-16},${y-8} q8,-10 18,-4 q12,6 10,14 q-4,10 -16,8 q-14,-2 -12,-18 Z" style="fill:var(--paars-soft);stroke:${k};stroke-width:2"/>`
  :`<path d="M${x+14},${y-7} L${x+2},${y} L${x+14},${y+7} A16,16 0 1 1 ${x+14},${y-7} Z" style="fill:var(--paars-soft);stroke:${k};stroke-width:2"/>`;
const sub=(x,y,dx,len)=>(len?`<line x1="${f1(x-dx*len)}" y1="${y}" x2="${f1(x-dx*8)}" y2="${y}" style="stroke:var(--goud);stroke-width:2;opacity:.45;stroke-dasharray:3 3"/>`:"")+hex(x,y,"var(--goud)",7);
function tempSvg(i){
  const X=t=>40+t*4.2,Y=v=>200-v*160,act=t=>t<=37?Math.pow(t/37,1.6):Math.max(0,1-((t-37)/20)**2);
  let s=`<path class="ax" d="M40,30 V200 H330"/>`;for(let t=0;t<=70;t+=10)s+=T(X(t),216,t,"tick");
  s+=T(185,234,"temperatuur (°C)","lblm")+`<text class="lblm" transform="translate(18,115) rotate(-90)" text-anchor="middle">reactiesnelheid</text>`;
  let d="";for(let t=0;t<=70;t+=.5)d+=(d?"L":"M")+f1(X(t))+","+f1(Y(act(t)));
  s+=`<path d="${d}" style="fill:none;stroke:var(--teal);stroke-width:2.6"/>`;
  const tt=[5,37,62][i];s+=C(X(tt),Y(act(tt)),7,"var(--goud)","var(--surface2)",2)+`<line x1="${X(tt)}" y1="${Y(act(tt))}" x2="${X(tt)}" y2="200" style="stroke:var(--goud);stroke-dasharray:4 3"/>`;
  s+=R(360,30,190,170,"var(--surface)","var(--line2)",10);
  if(i===0){s+=enzym(420,80)+enzym(500,160)+sub(480,90,1,10)+sub(400,150,-1,10)+sub(510,60,1,8);s+=T(455,190,"traag: weinig botsingen","tick");}
  if(i===1){s+=enzym(420,80)+enzym(500,160)+sub(448,80,1,40)+sub(400,150,-1,40)+sub(520,110,1,36);s+=T(455,190,"snel: veel botsingen","tick");}
  if(i===2){s+=enzym(420,80,"var(--koraal)",true)+enzym(500,160,"var(--koraal)",true)+sub(470,96,1,40)+sub(400,150,-1,40);s+=T(455,190,"enzym van vorm veranderd","tick","middle","fill:var(--koraal)");}
  return SV("0 0 560 244",s,"Reactiesnelheid van een enzym bij verschillende temperaturen, met botsende moleculen");
}
E.zet(T2,[42],{titel:"Enzymen en temperatuur",
  html:`<p><b>Enzymen</b> zijn eiwitten die stofwisselingsreacties versnellen. Het <b>substraat</b> past precies in het <b>actieve centrum</b> van het enzym. Na de reactie komt het product los en is het enzym klaar voor het volgende molecuul.</p>
  <ul><li>Enzym en substraat moeten elkaar eerst tegenkomen. Moleculen bewegen voortdurend en <b>botsen</b>.</li>
  <li><b>Lage temperatuur</b>: moleculen bewegen langzaam en botsen minder vaak. De reactie gaat traag, maar het enzym blijft heel.</li>
  <li><b>Optimumtemperatuur</b>: de reactie gaat het snelst.</li>
  <li><b>Te hoge temperatuur</b>: het enzym verandert van vorm (<b>denatureert</b>). Het substraat past niet meer, en dat is blijvend.</li></ul>`,
  anim:anim(["<b>Koud</b>: de moleculen bewegen langzaam (korte sporen). Ze botsen zelden, dus de reactie gaat traag. Het enzym is niet kapot.","<b>Optimum</b>: de moleculen bewegen snel en botsen vaak. De reactie gaat het snelst.","<b>Te heet</b>: het enzym verandert van vorm. Het substraat past niet meer in het actieve centrum en de reactie stopt."],tempSvg),
  films:[["Alles versneld","films/stofwisseling/1-alles-versneld.html"]]});

function fructSvg(i){
  let s="";const dag=i===0||i===3;
  if(dag){s+=C(70,60,22,"var(--goud-soft)","var(--goud)",2);for(let k=0;k<8;k++){const a=k*Math.PI/4;s+=`<line x1="${f1(70+30*Math.cos(a))}" y1="${f1(60+30*Math.sin(a))}" x2="${f1(70+40*Math.cos(a))}" y2="${f1(60+40*Math.sin(a))}" style="stroke:var(--goud);stroke-width:2"/>`;}s+=T(70,124,"dag","lbl");}
  else{s+=`<path d="M82,40 A26,26 0 1 0 82,84 A20,20 0 1 1 82,40 Z" style="fill:var(--text3)"/>`+T(70,124,"nacht","lbl");
    const tc=i===1?12:2;s+=R(52,140,14,70,"var(--surface)","var(--text3)",7)+R(55,210-(tc+5)*2.4,8,(tc+5)*2.4,i===1?"var(--koraal)":"var(--teal)","none",4)+T(76,186,`${tc} °C`,"lbl","start");}
  s+=R(150,20,250,190,"var(--surface)","var(--line2)",10);
  const fr=(x,y,dx,len)=>(len?`<line x1="${f1(x-dx*len)}" y1="${y}" x2="${f1(x-dx*12)}" y2="${y}" style="stroke:var(--goud);stroke-width:2;opacity:.45;stroke-dasharray:3 3"/>`:"")+keten(x-10,y,3,"var(--goud)",6);
  if(i===0){s+=fr(220,70,0,0)+fr(320,120,0,0)+fr(230,170,0,0)+hex(300,60,"var(--goud)",6)+hex(350,170,"var(--goud)",6);s+=T(275,200,"monosachariden → fructaan","tick");}
  if(i===1){s+=enzym(230,70)+enzym(340,160)+fr(300,80,1,50)+fr(250,160,-1,50)+hex(360,60,"var(--goud)",6)+hex(200,190,"var(--goud)",6);s+=T(275,204,"veel botsingen: fructaan omgezet","tick");}
  if(i===2||i===3){s+=enzym(230,70)+enzym(340,160)+fr(300,80,1,16)+fr(250,160,-1,16)+fr(330,110,1,14);s+=T(275,204,i===2?"weinig botsingen: fructaan blijft":"fructaan stapelt op","tick");}
  const lvl=[.5,.2,.55,.85][i];
  s+=R(450,30,60,170,"var(--surface)","var(--line2)",6)+R(450,30+170*(1-lvl),60,170*lvl,"var(--goud-soft)","var(--goud)",6)+T(480,222,"fructaan","lblm")+T(480,238,"in het gras","tick");
  return SV("0 0 560 244",s,"Fructaan in gras overdag, in een warme nacht en in een koude nacht");
}
E.waarom(T2,42,anim([
  "Overdag maakt het gras met fotosynthese monosachariden. Een deel wordt opgeslagen als <b>fructaan</b>.",
  "In een gewone nacht zetten <b>enzymen</b> het fructaan weer om. Enzym en fructaan botsen vaak. Het gras gebruikt de producten om te groeien.",
  "In een <b>koude nacht</b> (onder 5 °C) bewegen de moleculen langzaam en botsen ze nauwelijks. De enzymen zijn bijna niet actief, dus het fructaan blijft liggen.",
  "De volgende dag komt er nog meer fructaan bij: het gehalte loopt op. Let op: de enzymen zijn niet kapot (denatureren gebeurt alleen bij hitte). Als het warmer wordt, werken ze weer."],fructSvg));

/* --- vraag 43: aerobe en anaerobe dissimilatie --- */
function dissSvg(){
  const box=(x,y,w,t1,t2,k)=>R(x,y,w,48,`color-mix(in srgb, ${k} 14%, transparent)`,k,10)+T(x+w/2,y+21,t1,"lbl")+(t2?T(x+w/2,y+38,t2,"tick"):"");
  let s=box(10,110,110,"glucose","koolhydraat","var(--goud)");
  s+=box(230,14,360,"CO₂ + H₂O","veel energie","var(--teal)");
  s+=pijl(122,124,226,40,"var(--teal)",2.2)+T(16,70,"met O₂: aeroob","lblm","start","fill:var(--teal)");
  s+=box(230,94,170,"spiercel: melkzuur","weinig energie","var(--koraal)");
  s+=box(420,94,170,"gist: alcohol + CO₂","weinig energie","var(--koraal)");
  s+=box(230,168,360,"bacteriën zonder O₂: o.a. zuren en gassen","weinig energie","var(--koraal)");
  s+=pijl(122,140,226,120,"var(--koraal)",2)+pijl(122,144,226,190,"var(--koraal)",2)+T(150,226,"zonder O₂: anaeroob","lblm","start","fill:var(--koraal)");
  return SV("0 0 600 236",s,"Schema van aerobe en anaerobe dissimilatie met de producten bij spiercellen, gist en bacteriën");
}
E.zet(T2,[43],{titel:"Aerobe en anaerobe dissimilatie",
  html:`<p>Bij <b>dissimilatie</b> breken organismen organische stoffen af om energie vrij te maken.</p>
  <ul><li><b>Aeroob</b> (met zuurstof): glucose + zuurstof → koolstofdioxide + water. Dat levert veel energie.</li>
  <li><b>Anaeroob</b> (zonder zuurstof): de afbraak is onvolledig en levert weinig energie. Spiercellen maken dan <b>melkzuur</b>, gistcellen <b>alcohol en CO<sub>2</sub></b>.</li>
  <li>Ook veel bacteriën kunnen anaeroob dissimileren. Afhankelijk van de soort ontstaan daarbij bijvoorbeeld zuren, alcohol of gassen.</li></ul>
  <p>Handig bij elke reactie: atomen verdwijnen niet en ontstaan niet. In de producten zitten alleen atomen die al in de beginstoffen zaten.</p>`,
  anim:vast(dissSvg(),600),
  films:[["Alles op adem","films/stofwisseling/2-alles-op-adem.html"],["Je darmbewoners","films/voeding/6-je-darmbewoners.html"]]});

const atoom=(x,y,t,k,r=13)=>C(x,y,r,`color-mix(in srgb, ${k} 25%, transparent)`,k,1.8)+T(x,y+4,t,"lbl");
const mol=(x,y,mid,k,n)=>{let s="";const hs=n===4?[[0,-28],[28,0],[0,28],[-28,0]]:[[0,-28],[26,14],[-26,14]];hs.forEach(([a,b])=>s+=`<line x1="${x}" y1="${y}" x2="${x+a}" y2="${y+b}" style="stroke:var(--text3);stroke-width:2"/>`+atoom(x+a,y+b,"H","var(--text3)",9));return s+atoom(x,y,mid,k,15);};
function gasSvg(i){
  let s="";
  if(i===0){s+=R(30,60,320,100,"var(--surface)","var(--text2)",50);[[100,100],[170,130],[240,96],[290,124]].forEach(([x,y])=>s+=bac(x,y,"var(--teal)",false,.8));
    s+=T(190,186,"dikke darm","lbl")+atoom(430,110,"O₂","var(--teal)",22)+`<path d="M404,84 l52,52 M456,84 l-52,52" style="stroke:var(--koraal);stroke-width:3.5"/>`+T(430,160,"bijna geen zuurstof","lblm");
    s+=tag(390,20,150,"ANAEROOB","","var(--koraal)");}
  if(i===1){s+=keten(60,80,6,"var(--goud)",14,4)+T(60,40,"fructaan (koolhydraat)","lbl","start");
    s+=atoom(120,160,"C","var(--text2)")+atoom(200,160,"H","var(--text3)")+atoom(280,160,"O","var(--koraal)")+T(340,164,"alleen C, H en O","lbl","start");}
  if(i===2){s+=mol(130,100,"N","var(--paars)",3)+T(130,170,"ammoniak NH₃","lbl")+T(130,190,"N zit niet in fructaan ✗","lblm","middle","fill:var(--koraal)");
    s+=mol(390,100,"C","var(--text2)",4)+T(390,170,"methaan CH₄","lbl")+T(390,190,"alleen C en H ✓","lblm","middle","fill:var(--teal)");}
  return SV("0 0 560 210",s,"De dikke darm is zuurstofloos; fructaan bevat C, H en O; ammoniak bevat N en kan dus niet ontstaan, methaan wel");
}
E.waarom(T2,43,anim([
  "In de dikke darm is bijna geen zuurstof. De bacteriën breken het fructaan dus <b>anaeroob</b> af.",
  "Fructaan is een koolhydraat. Er zitten alleen koolstof (C), waterstof (H) en zuurstof (O) in.",
  "Ammoniak (NH<sub>3</sub>) bevat stikstof, en dat zit niet in fructaan: dat kan niet ontstaan. Methaan (CH<sub>4</sub>) bevat alleen C en H: dat kan wel. Antwoord: methaan · anaeroob (<b>D</b>)."],gasSvg));

/* --- vraag 44: osmose --- */
function osmSvg(i){
  const lv=i===1?[110,70]:[90,90];
  let s=R(60,40,440,170,"none","var(--text2)",6);
  s+=R(62,lv[0],216,210-lv[0],"var(--teal-soft)","none")+R(282,lv[1],216,210-lv[1],"var(--teal-soft)","none");
  s+=`<line x1="280" y1="40" x2="280" y2="210" style="stroke:var(--text);stroke-width:2;stroke-dasharray:6 4"/>`+T(280,30,"semipermeabel membraan","lblm");
  const rnd=k=>{const x=Math.sin(k*12.9898+3)*43758.5453;return x-Math.floor(x);};
  for(let k=0;k<14;k++){s+=C(76+rnd(k)*190,(lv[0]+8)+rnd(k+40)*(196-lv[0]),3.5,"var(--teal)","none",0);s+=C(296+rnd(k+70)*190,(lv[1]+8)+rnd(k+90)*(196-lv[1]),3.5,"var(--teal)","none",0);}
  if(i===0)[[160,150],[380,150]].forEach(([x,y])=>s+=hex(x,y,"var(--goud)",8));
  if(i===1){[[160,160]].forEach(([x,y])=>s+=hex(x,y,"var(--goud)",8));[[330,120],[370,160],[420,110],[460,170],[350,190],[440,145]].forEach(([x,y])=>s+=hex(x,y,"var(--goud)",8));
    s+=pijl(240,150,320,150,"var(--teal)",3)+T(280,232,"netto water naar rechts","lbl","middle","fill:var(--teal)");}
  if(i===2){s+=keten(110,150,6,"var(--goud)",8)+hex(380,150,"var(--goud)",8);s+=T(170,180,"1 zetmeelmolecuul","lblm")+T(380,180,"1 glucosemolecuul","lblm")+T(280,232,"evenveel deeltjes: geen netto waterstroom","lbl");}
  if(i===0)s+=T(280,232,"evenveel opgeloste deeltjes: evenwicht","lbl");
  return SV("0 0 560 244",s,"Osmose door een semipermeabel membraan met water en opgeloste suikermoleculen");
}
E.zet(T2,[44],{titel:"Osmose",
  html:`<p><b>Osmose</b> is de diffusie van <b>water</b> door een <b>semipermeabel</b> (halfdoorlatend) membraan: water kan erdoor, grotere opgeloste deeltjes niet.</p>
  <ul><li>De <b>osmotische waarde</b> van een oplossing hangt af van het <b>aantal</b> opgeloste deeltjes per liter, niet van hun grootte. Eén groot molecuul telt even zwaar als één klein.</li>
  <li>Water gaat netto naar de kant met de <b>hoogste osmotische waarde</b>: daar zijn de meeste opgeloste deeltjes.</li>
  <li>In de <b>dikke darm</b> wordt water uit de voedselbrij teruggenomen (<b>geresorbeerd</b>) in het bloed, zodat de ontlasting steviger wordt.</li></ul>`,
  anim:anim(["Water (blauw) kan door het membraan, suikermoleculen (goud) niet. Aan beide kanten zitten evenveel opgeloste deeltjes: geen netto waterstroom.","Rechts lossen we meer suiker op. Daar is de osmotische waarde nu hoger. Water gaat netto naar rechts, het niveau rechts stijgt.","Links één groot zetmeelmolecuul, rechts één klein glucosemolecuul. Het aantal deeltjes is gelijk, dus de osmotische waarde ook."],osmSvg),
  films:[["Diffusie en osmose","films/cellen/diffusie-osmose/index.html"],["Van darm naar bloed","films/voeding/4-van-darm-naar-bloed.html"]]});

/* --- vraag 45: spreidingsdiagram lezen --- */
const SLA=[[9,9.5],[8.5,10],[9.6,9.1],[10,10.5],[8.8,8.4],[9.4,10.2]], SLB=[[7,9],[6.5,8.5],[7.5,9.6],[6,8],[7.2,7],[6.8,9.8]];
function spreidSvg(i){
  const X=v=>60+(v-5)*70,Y=v=>250-(v-5)*34;let s="";
  for(let v=5;v<=11;v++){s+=`<line class="grid" x1="${X(v)}" y1="${Y(5)}" x2="${X(v)}" y2="${Y(11)}"/><line class="grid" x1="${X(5)}" y1="${Y(v)}" x2="${X(11)}" y2="${Y(v)}"/>`+T(X(v),Y(5)+16,v,"tick")+T(X(5)-8,Y(v)+4,v,"tick","end");}
  s+=`<path class="ax" d="M${X(5)},${Y(11)} V${Y(5)} H${X(11)}"/>`;
  s+=T(X(8),Y(5)+36,"uren slaap per nacht doordeweeks","lblm")+`<text class="lblm" transform="translate(20,${Y(8)}) rotate(-90)" text-anchor="middle">uren slaap in het weekend</text>`;
  if(i>=1)s+=`<line x1="${X(5)}" y1="${Y(5)}" x2="${X(11)}" y2="${Y(11)}" style="stroke:var(--paars);stroke-width:2;stroke-dasharray:6 4"/>`+T(X(10.9),Y(11)+16,"x = y","lbl","end","fill:var(--paars)");
  if(i===1){s+=T(X(5.3),Y(10.6),"boven de lijn: in het weekend meer","lblm","start","fill:var(--teal)")+T(X(10.9),Y(7.4),"onder de lijn: minder","lblm","end","fill:var(--koraal)");
    s+=C(X(7.2),Y(7),11,"none","var(--koraal)",2)+C(X(7),Y(9),11,"none","var(--teal)",2);}
  if(i===0)s+=`<path d="M${X(7)},${Y(5)} V${Y(9)} H${X(5)}" style="fill:none;stroke:var(--goud);stroke-width:2;stroke-dasharray:5 4"/>`+C(X(7),Y(9),11,"none","var(--goud)",2)+T(X(7)+16,Y(9)-8,"7 uur · 9 uur","lbl","start","fill:var(--goud-text)");
  if(i===2){const g=a=>[a.reduce((t,p)=>t+p[0],0)/a.length,a.reduce((t,p)=>t+p[1],0)/a.length];
    [[g(SLA),"var(--teal)"],[g(SLB),"var(--goud)"]].forEach(([p,k])=>s+=`<path d="M${X(p[0])},${Y(5)} V${Y(p[1])} H${X(5)}" style="fill:none;stroke:${k};stroke-width:2;stroke-dasharray:5 4"/>`+`<path d="M${X(p[0])-7},${Y(p[1])} h14 M${X(p[0])},${Y(p[1])-7} v14" style="stroke:${k};stroke-width:2.6"/>`);}
  SLA.forEach(p=>s+=C(X(p[0]),Y(p[1]),4.5,"var(--surface2)","var(--text)",1.5));
  SLB.forEach(p=>s+=C(X(p[0]),Y(p[1]),4.5,"var(--text)","none",0));
  s+=C(X(9.5),Y(6),4.5,"var(--surface2)","var(--text)",1.5)+T(X(9.5)+10,Y(6)+4,"brugklas","lblm","start")+C(X(9.5),Y(5.5),4.5,"var(--text)","none",0)+T(X(9.5)+10,Y(5.5)+4,"examenklas","lblm","start");
  return SV("0 0 520 300",s,"Voorbeeld van een spreidingsdiagram: uren slaap doordeweeks tegen uren slaap in het weekend voor twee groepen leerlingen");
}
E.zet(T2,[45],{titel:"Een spreidingsdiagram lezen",
  html:`<p>In een <b>spreidingsdiagram</b> (puntdiagram) is elk punt één onderzoeksobject, bijvoorbeeld één leerling of één soort. Elk punt geeft <b>twee</b> waarden tegelijk: de ene lees je af op de x-as, de andere op de y-as.</p>
  <ul><li>Lees eerst bij beide assen <b>wat</b> er staat en in welke eenheid.</li>
  <li>Staan er twee metingen van hetzelfde object tegen elkaar, zoals eerst en later? Denk dan aan de lijn waar <b>x = y</b>. Een punt boven die lijn is toegenomen, een punt eronder is afgenomen.</li>
  <li>Zijn er twee groepen (verschillende symbolen)? Vergelijk dan per as waar de punten van elke groep gemiddeld liggen.</li>
  <li>Lees nauwkeurig af: ga recht naar beneden naar de x-as en recht opzij naar de y-as.</li></ul>`,
  anim:anim(["Elk punt is één leerling. Dit punt: doordeweeks 7 uur slaap per nacht, in het weekend 9 uur.","Op de paarse lijn is x = y: evenveel slaap. Punten erboven slapen in het weekend meer, punten eronder minder.","Twee groepen: vergelijk per as. De kruisjes geven het gemiddelde. Brugklassers (open) slapen doordeweeks langer dan examenleerlingen (dicht); in het weekend is het verschil kleiner."],spreidSvg,520),
  films:[["Onderzoek doen in de biologie","films/cellen/onderzoek-doen/index.html"]]});

/* --- vraag 46: geslachten en soorten --- */
function naamSvg(){
  let s=R(8,8,584,234,"var(--surface)","var(--line2)",12)+T(24,32,"familie katachtigen (Felidae)","lbl","start","font-size:14px");
  s+=R(26,48,320,180,"var(--goud-soft)","var(--goud)",10)+T(42,72,"geslacht Panthera","lbl","start","fill:var(--goud-text)");
  s+=R(362,48,212,180,"var(--teal-soft)","var(--teal)",10)+T(378,72,"geslacht Felis","lbl","start","fill:var(--teal)");
  const soort=(x,y,w,g,sn,nl)=>R(x,y,w,40,"var(--surface)","var(--line2)",8)+`<text class="lbl" x="${x+12}" y="${y+18}" style="font-style:italic"><tspan style="font-weight:700">${g}</tspan> ${sn}</text>`+T(x+12,y+33,nl,"tick","start");
  s+=soort(42,86,288,"Panthera","leo","leeuw")+soort(42,132,288,"Panthera","tigris","tijger")+soort(42,178,288,"Panthera","pardus","luipaard");
  s+=soort(378,86,180,"Felis","catus","huiskat")+soort(378,132,180,"Felis","silvestris","wilde kat");
  return SV("0 0 600 250",s,"Familie katachtigen met de geslachten Panthera (leeuw, tijger, luipaard) en Felis (huiskat, wilde kat)");
}
E.zet(T2,[46],{titel:"Indeling en naamgeving: geslacht en soort",
  html:`<p>Biologen delen organismen in groepen in die steeds kleiner worden: rijk → stam → klasse → orde → familie → <b>geslacht</b> → <b>soort</b>. Hoe meer groepen twee organismen delen, hoe nauwer ze verwant zijn.</p>
  <p>Elke soort heeft een <b>wetenschappelijke naam</b> van twee woorden (binomiale naamgeving, bedacht door Linnaeus), schuingedrukt:</p>
  <ul><li>het eerste woord is de <b>geslachtsnaam</b>, met een hoofdletter;</li>
  <li>het tweede woord is de soortaanduiding, met een kleine letter;</li>
  <li>pas de <b>twee woorden samen</b> geven de soort.</li></ul>
  <p>Voorbeeld: de leeuw heet <i>Panthera leo</i> en de huiskat <i>Felis catus</i>. Ze horen bij dezelfde familie (katachtigen), maar bij een ander geslacht.</p>`,
  anim:vast(naamSvg(),600),
  films:[["Stambomen lezen","films/evolutie/8-stambomen-lezen.html"]]});

const GR=[["Lolium","perenne"],["Festuca","rubra"],["Poa","annua"],["Phleum","pratense"],["Poa","pratensis"]];
function grasSvg(i){
  let s=T(40,26,"geslacht","tick","start")+T(170,26,"soortaanduiding","tick","start");
  const gnr={Lolium:1,Festuca:2,Poa:3,Phleum:4};
  GR.forEach(([g,sn],k)=>{const y=40+k*38,on=i>=0;
    s+=R(30,y,120,30,i===0||i===1?"var(--goud-soft)":"var(--surface)",i===0||i===1?"var(--goud)":"var(--line2)",6)+`<text class="lbl" x="42" y="${y+20}" style="font-style:italic">${g}</text>`;
    s+=R(160,y,140,30,i===2?"var(--teal-soft)":"var(--surface)",i===2?"var(--teal)":"var(--line2)",6)+`<text class="lbl" x="172" y="${y+20}" style="font-style:italic">${sn}</text>`;
    if(i===1)s+=((g==="Poa"&&k===4)?T(330,y+20,"= zelfde geslacht als rij 3","lblm","start","fill:var(--goud-text)"):C(330,y+15,12,"var(--goud)","none",0)+T(330,y+20,gnr[g],"lbl","middle","fill:var(--goud-ink)"));
    if(i===2)s+=C(330,y+15,12,"var(--teal)","none",0)+T(330,y+20,k+1,"lbl","middle","fill:var(--surface)");});
  if(i===1)s+=`<path d="M28,131 C4,131 4,207 28,207" style="fill:none;stroke:var(--goud);stroke-width:2"/>`+tag(400,80,150,"4 GESLACHTEN","","var(--goud)");
  if(i===2)s+=tag(400,80,150,"5 SOORTEN","","var(--teal)");
  return SV("0 0 560 240",s,"De vijf grassen uit het mengsel met geslachtsnaam en soortaanduiding");
}
E.waarom(T2,46,anim([
  "Het eerste woord van elke naam is het <b>geslacht</b>.",
  "<i>Poa</i> staat er twee keer: dat is één geslacht. Verschillende geslachten: <i>Lolium</i>, <i>Festuca</i>, <i>Poa</i> en <i>Phleum</i> = <b>4</b>.",
  "De soort is de héle naam. <i>Poa annua</i> en <i>Poa pratensis</i> zijn twee verschillende soorten. Samen <b>5</b> soorten: antwoord <b>B</b>."],grasSvg));

})();
/* ===== vwo1.js ===== */
(function(){
"use strict";
/* vwo26-1 · opgave 1 Bloedplaatjes belaagd (vraag 1–11) */
const E=window.EXSTOF, T="vwo26-1";
const SV=(vb,inner,lab)=>E.svg(vb,inner,lab);
const pijl=(id,kl)=>`<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${kl}"/></marker>`;
const DEFS=`<defs>${pijl("v1pg","var(--goud)")}${pijl("v1pt","var(--teal)")}${pijl("v1pk","var(--koraal)")}${pijl("v1px","var(--text2)")}</defs>`;
const anim=(steps,draw)=>box=>E.stappen(box,steps,(st,s,i)=>{st.innerHTML=draw(i,s);});
const caps=a=>a.map(c=>({cap:c}));

/* --- vraag 1: wand van een haarvat --- */
function haarvatSvg(i){
  /* i 0 haarvat in doorsnede, 1 endotheelcellen met cell junctions, 2 bloedplaatjes */
  let g="";
  g+=`<rect x="0" y="0" width="600" height="250" fill="var(--surface)"/>
  <text class="lblm" x="14" y="22">weefsel</text>
  <rect x="40" y="70" width="520" height="110" rx="55" fill="var(--koraal-soft)" stroke="var(--text3)" stroke-width="${i===0?6:2}"/>`;
  if(i>=1)for(let k=0;k<6;k++){const x=70+k*80;
    g+=`<rect x="${x}" y="62" width="76" height="14" rx="6" fill="var(--surface2)" stroke="var(--text3)"/><rect x="${x}" y="174" width="76" height="14" rx="6" fill="var(--surface2)" stroke="var(--text3)"/>`;
    if(k>0)g+=`<rect x="${x-4}" y="60" width="5" height="18" fill="var(--teal)"/><rect x="${x-4}" y="172" width="5" height="18" fill="var(--teal)"/>`;}
  [[120,110],[230,140],[350,105],[460,135]].forEach(([x,y])=>g+=`<ellipse cx="${x}" cy="${y}" rx="22" ry="11" fill="var(--koraal)" opacity=".8"/>`);
  if(i===2)[[175,125],[300,135],[410,118],[510,128]].forEach(([x,y])=>g+=`<ellipse cx="${x}" cy="${y}" rx="7" ry="4.5" fill="var(--goud)"/>`);
  g+=`<text class="lbl" x="300" y="222" text-anchor="middle">${["haarvat: de wand is één laag cellen dik","endotheelcellen, aan elkaar vast met cell junctions","in het bloed: rode bloedcellen en bloedplaatjes"][i]}</text>`;
  if(i===1)g+=`<text class="lbl" x="560" y="50" text-anchor="end" style="fill:var(--teal)">▮ cell junction</text>`;
  if(i===2)g+=`<text class="lbl" x="560" y="50" text-anchor="end" style="fill:var(--goud-text)">● bloedplaatje</text>`;
  return SV("0 0 600 250",g,"Haarvat met endotheelcellen, cell junctions en bloedplaatjes");
}
E.zet(T,[1],{titel:"De wand van bloedvaten en de rol van bloedplaatjes",
  html:`<p>De binnenkant van elk bloedvat is bekleed met <b>endotheel</b>: een laag platte dekweefselcellen. Een <b>haarvat</b> bestaat zelfs alleen uit die ene laag. Daardoor kunnen stoffen als zuurstof en glucose makkelijk door de wand.</p>
  <p>De endotheelcellen zitten aan elkaar vast met <b>cell junctions</b>: eiwitverbindingen tussen de celmembranen van twee buurcellen. Zo vormen de cellen samen een gesloten wand. Bloedcellen blijven in het vat, alleen vocht en kleine stoffen gaan erdoor.</p>
  <p><b>Bloedplaatjes</b> (trombocyten) zijn kleine stukjes cel zonder kern. Je kent ze van de <b>bloedstolling</b>: bij een wond plakken ze aan elkaar en aan de vaatwand en starten ze de vorming van een stolsel.</p>`,
  anim:anim(caps([
    "Een <b>haarvat</b> in de lengte doorgesneden. De wand is maar één cel dik.",
    "De wand bestaat uit <b>endotheelcellen</b>. Tussen de cellen zitten <b>cell junctions</b> die de cellen aan elkaar vastmaken.",
    "In het bloed stromen rode bloedcellen, witte bloedcellen en <b>bloedplaatjes</b>."]),haarvatSvg),
  films:[["Wat er in je bloed zit","films/transport/3-wat-er-in-je-bloed-zit.html"],["Buizen onder druk","films/transport/2-buizen-onder-druk.html"]]});

/* --- vraag 2: terugkoppeling --- */
function terugSvg(i){
  /* i 0 regelkring, 1 negatief (glucose), 2 positief (oxytocine) */
  let g="";
  const doos=(x,y,w,t,kl)=>`<rect x="${x}" y="${y}" width="${w}" height="40" rx="10" fill="var(--surface)" stroke="${kl||"var(--line2)"}" stroke-width="1.6"/><text class="lbl" x="${x+w/2}" y="${y+25}" text-anchor="middle">${t}</text>`;
  if(i===0){
    g+=doos(200,20,200,"waarde (bv. concentratie)","var(--goud)")+doos(420,120,160,"waarneming")+doos(200,220,200,"signaal (hormoon)")+doos(20,120,160,"effect op de waarde");
    g+=`<path d="M400,40 C470,40 500,80 500,118" stroke="var(--text2)" stroke-width="1.8" fill="none" marker-end="url(#v1px)"/>
    <path d="M500,160 C500,210 460,240 402,240" stroke="var(--text2)" stroke-width="1.8" fill="none" marker-end="url(#v1px)"/>
    <path d="M200,240 C140,240 100,210 100,162" stroke="var(--text2)" stroke-width="1.8" fill="none" marker-end="url(#v1px)"/>
    <path d="M100,120 C100,80 130,40 198,40" stroke="var(--text2)" stroke-width="1.8" fill="none" marker-end="url(#v1px)"/>
    <text class="lblm" x="300" y="150" text-anchor="middle">een regelkring</text>`;
  }else if(i===1){
    g+=doos(30,40,170,"glucose ↑","var(--koraal)")+doos(240,40,140,"insuline ↑")+doos(420,40,160,"glucose ↓","var(--groen)");
    g+=`<path d="M200,60 H238" stroke="var(--text2)" stroke-width="1.8" marker-end="url(#v1px)"/><path d="M380,60 H418" stroke="var(--text2)" stroke-width="1.8" marker-end="url(#v1px)"/>
    <path d="M500,82 C500,160 115,160 115,84" stroke="var(--groen)" stroke-width="2" fill="none" stroke-dasharray="5 4" marker-end="url(#v1px)"/>
    <text class="lbl" x="300" y="190" text-anchor="middle" style="fill:var(--groen)">negatieve terugkoppeling: de verandering wordt tegengewerkt</text>
    <text class="lblm" x="300" y="214" text-anchor="middle">de waarde blijft rond de normaalwaarde</text>`;
  }else{
    g+=doos(30,40,170,"druk op baarmoederhals ↑","var(--koraal)")+doos(240,40,140,"oxytocine ↑")+doos(420,40,160,"weeën sterker","var(--koraal)");
    g+=`<path d="M200,60 H238" stroke="var(--text2)" stroke-width="1.8" marker-end="url(#v1px)"/><path d="M380,60 H418" stroke="var(--text2)" stroke-width="1.8" marker-end="url(#v1px)"/>
    <path d="M500,82 C500,160 115,160 115,84" stroke="var(--koraal)" stroke-width="2" fill="none" stroke-dasharray="5 4" marker-end="url(#v1pk)"/>
    <text class="lbl" x="300" y="190" text-anchor="middle" style="fill:var(--koraal)">positieve terugkoppeling: de verandering wordt versterkt</text>
    <text class="lblm" x="300" y="214" text-anchor="middle">steeds verder, tot de geboorte de kring doorbreekt</text>`;}
  return SV("0 0 600 270",DEFS+g,"Regelkring met terugkoppeling");
}
E.zet(T,[2],{titel:"Negatieve en positieve terugkoppeling",
  html:`<p>Veel waarden in je lichaam worden geregeld met een <b>regelkring</b>: een waarde wordt waargenomen, en dat bepaalt hoeveel van een signaalstof (vaak een hormoon) er gemaakt wordt. Die signaalstof heeft weer effect op de waarde zelf. Dat heet <b>terugkoppeling</b>.</p>
  <ul><li><b>Negatieve terugkoppeling</b>: het effect werkt de verandering tegen. Stijgt de waarde, dan zorgt de kring dat hij weer daalt (en omgekeerd). Zo blijft een waarde stabiel rond een normaalwaarde.</li>
  <li><b>Positieve terugkoppeling</b>: het effect versterkt de verandering. De waarde gaat steeds verder dezelfde kant op, tot iets de kring doorbreekt.</li></ul>
  <p>Let op: of de signaalstof bij een stijging van de waarde toe- of afneemt, hangt af van wat die stof doet. Kijk dus altijd eerst of het signaal de waarde verhoogt of verlaagt.</p>`,
  anim:anim(caps([
    "Een <b>regelkring</b>: de waarde wordt waargenomen, dat stuurt een signaal, en dat signaal heeft weer effect op de waarde.",
    "<b>Negatieve terugkoppeling</b> (voorbeeld bloedglucose): de glucose stijgt, er komt meer insuline, de glucose daalt weer. Insuline verlaagt de waarde, dus bij een stijging komt er méér van.",
    "<b>Positieve terugkoppeling</b> (voorbeeld de bevalling): druk op de baarmoederhals geeft oxytocine, oxytocine geeft sterkere weeën, en die geven nog meer druk."]),terugSvg),
  films:[["De baas van de klieren","films/hormonen/3-de-baas-van-de-klieren.html"],["Suiker in balans","films/hormonen/2-suiker-in-balans.html"]]});

/* --- vraag 3: bloedcellen in een preparaat --- */
E.zet(T,[3],{titel:"Bloedcellen herkennen en tellen",
  html:`<p>In een gekleurd <b>bloeduitstrijkje</b> onder de microscoop zie je drie soorten:</p>
  <ul><li><b>rode bloedcellen</b>: veruit de meeste, rond, zonder kern, in het midden vaak lichter;</li>
  <li><b>witte bloedcellen</b>: veel groter, met een donker gekleurde kern; er zijn er maar weinig;</li>
  <li><b>bloedplaatjes</b>: heel kleine donkere puntjes tussen de rode bloedcellen.</li></ul>
  <p>Hoeveel van elk er normaal in een mm<sup>3</sup> bloed zit, staat in je informatieboek bij de samenstelling van het bloed (zoek op ‘trombocyten’ voor de bloedplaatjes). Let goed op dat je de goede rij leest: de aantallen verschillen per soort enorm.</p>
  <p>Een aantal in een preparaat schat je door te <b>vergelijken</b> met een normaal preparaat van dezelfde grootte. Tel bijvoorbeeld in een preparaat van een patiënt half zoveel rode bloedcellen als in het normale, dan heeft die patiënt ongeveer de helft van de normaalwaarde. Tel alleen de soort waar het om gaat, en reken daarna om met de normaalwaarde uit je informatieboek.</p>`,
  films:[["Wat er in je bloed zit","films/transport/3-wat-er-in-je-bloed-zit.html"]]});

/* --- vraag 4: bloedstolling --- */
E.zet(T,[4],{titel:"Bloedstolling: een kettingreactie",
  html:`<p>Bloedstolling verloopt in stappen. Elke stap zet de volgende in gang:</p>
  <ul><li>Bij een beschadigd bloedvat hechten <b>bloedplaatjes</b> aan de wond en aan elkaar. Ze geven <b>trombokinase</b> af (samen met stoffen uit het beschadigde weefsel).</li>
  <li>Trombokinase zet, met hulp van calciumionen, <b>protrombine</b> om in het enzym <b>trombine</b>.</li>
  <li>Trombine zet het opgeloste <b>fibrinogeen</b> om in onoplosbare <b>fibrine</b>.</li>
  <li>Fibrinedraden vormen een netwerk waarin bloedcellen blijven hangen: het <b>stolsel</b>.</li></ul>
  <p>Protrombine en fibrinogeen zijn plasma-eiwitten die de <b>lever</b> maakt (voor protrombine is vitamine K nodig). Het overzicht staat ook in je informatieboek.</p>`,
  films:[["Wat er in je bloed zit","films/transport/3-wat-er-in-je-bloed-zit.html"]]});

/* --- vraag 5: vormen van overerving --- */
E.zet(T,[5],{titel:"Vormen van overerving",
  html:`<p>Hoe allelen samen een fenotype geven, kan op verschillende manieren:</p>
  <ul><li><b>dominant-recessief</b>: bij een heterozygoot zie je alleen het dominante allel.</li>
  <li><b>intermediair</b>: bij een heterozygoot ontstaat een <i>tussenvorm</i> van de twee homozygoten (bv. roze bloemen uit rood × wit).</li>
  <li><b>co-dominant</b>: bij een heterozygoot komen <i>beide</i> allelen volledig en naast elkaar tot expressie. Je ziet beide kenmerken tegelijk.</li></ul>
  <p>Daarnaast twee begrippen die over iets anders gaan:</p>
  <ul><li><b>multipele allelen</b>: van één gen bestaan in de populatie <i>meer dan twee</i> allelen (bv. het gen voor de ABO-bloedgroep met de allelen I<sup>A</sup>, I<sup>B</sup> en i). Ieder mens heeft er natuurlijk maar twee.</li>
  <li><b>gekoppelde overerving</b>: twee genen liggen op <i>hetzelfde chromosoom</i> en erven daardoor (meestal) samen over.</li></ul>`,
  films:[["Voorbij dominant en recessief","films/erfelijkheid/3-voorbij-dominant-en-recessief.html"],["Dihybride kruising en gekoppelde overerving","films/erfelijkheid/4-dihybride-kruising-en-gekoppelde-overerving.html"]]});

/* --- vraag 6: mutaties en de codontabel --- */
E.zet(T,[6],{titel:"Puntmutaties en de codontabel",
  html:`<p>Een <b>puntmutatie</b> verandert één basenpaar in het DNA. Er zijn drie soorten:</p>
  <ul><li><b>substitutie</b>: één base wordt vervangen door een andere. Er verandert hooguit één codon, dus hooguit één aminozuur (of het codon wordt een stopcodon).</li>
  <li><b>insertie</b>: er komt een base bij;</li>
  <li><b>deletie</b>: er valt een base weg.</li></ul>
  <p>Bij een insertie of deletie <b>verschuift het leesraam</b>: alle tripletten na de mutatie worden anders gelezen, dus vanaf die plek veranderen (bijna) alle aminozuren, en vaak ontstaat er ergens een vroeg stopcodon.</p>
  <p>Een gen bestaat uit <b>exons</b> en <b>introns</b>. Na de transcriptie worden de introns uit het pre-mRNA geknipt (<b>splicing</b>). Alleen de exons bepalen de aminozuurvolgorde.</p>
  <p>In de <b>codontabel</b> zoek je per aminozuur de codons op het mRNA. Veel aminozuren hebben meerdere codons. Die verschillen vaak alleen in de derde base, maar niet altijd: vergelijk alle codons van een aminozuur en kijk welke plaatsen steeds gelijk zijn.</p>`,
  films:[["Mutaties","films/dna/5-mutaties.html"],["De genetische code lezen","films/dna/4-de-genetische-code-lezen.html"]]});

/* --- vraag 7: de placenta --- */
function placentaSvg(i){
  let g=`<rect x="0" y="0" width="600" height="260" fill="var(--surface)"/>`;
  /* ruimte met bloed van de moeder */
  g+=`<rect x="30" y="110" width="540" height="130" rx="10" fill="var(--koraal-soft)"/>
  <text class="lblm" x="44" y="232">ruimte met bloed van de moeder</text>`;
  /* navelstreng en vlokken */
  g+=`<path d="M300,10 V70" stroke="var(--paars)" stroke-width="16" stroke-linecap="round"/>
  <text class="lblm" x="316" y="34">navelstreng (naar de foetus)</text>
  <path d="M120,70 H480" stroke="var(--paars)" stroke-width="10" stroke-linecap="round"/>`;
  [140,230,320,410].forEach(x=>{g+=`<path d="M${x},70 C${x-10},120 ${x+50},150 ${x+30},200 C${x+20},220 ${x},200 ${x+10},160 C${x+16},120 ${x+30},100 ${x+30},70" fill="var(--surface2)" stroke="var(--text3)" stroke-width="1.6"/>`;
    if(i>=1)g+=`<path d="M${x+12},74 C${x+8},120 ${x+36},150 ${x+26},190" stroke="var(--paars)" stroke-width="3" fill="none"/>`;});
  if(i>=1)g+=`<text class="lbl" x="40" y="56" style="fill:var(--paars)">haarvaten van de foetus in de vlok</text>`;
  if(i===2){[[200,190],[300,130],[380,200],[480,150]].forEach(([x,y])=>g+=`<path d="M${x},${y} l-24,0" stroke="var(--teal)" stroke-width="2" marker-end="url(#v1pt)"/>`);
    g+=`<text class="lbl" x="560" y="252" text-anchor="end" style="fill:var(--teal)">uitwisseling door de wand van de vlok</text>`;}
  return SV("0 0 600 260",DEFS+g,"Placentavlokken in een ruimte met bloed van de moeder");
}
E.zet(T,[7],{titel:"Bouw en werking van de placenta",
  html:`<p>De <b>placenta</b> is het orgaan waar moeder en foetus stoffen uitwisselen. Het foetale deel bestaat uit <b>placentavlokken</b>: vingervormige uitsteeksels met daarin haarvaten van de foetus, verbonden met de navelstreng. De vlokken steken uit in ruimtes die gevuld zijn met bloed van de moeder.</p>
  <p>Stoffen gaan door de dunne wand van de vlokken: zuurstof, glucose, aminozuren en vitamines van moeder naar foetus; koolstofdioxide en ureum van foetus naar moeder. Dat gaat door diffusie en actief transport. Ook sommige antistoffen worden doorgegeven, en helaas ook alcohol, nicotine en sommige virussen.</p>
  <p>Een grote oppervlakte (veel vlokken) en een kleine afstand maken de uitwisseling efficiënt. Denk bij een vraag over de placenta altijd na: wat moet er dóór de wand van de vlok, en wat is daar te groot voor?</p>`,
  anim:anim(caps([
    "De foetus is via de navelstreng verbonden met de <b>placentavlokken</b>. Die steken uit in een ruimte met bloed van de moeder.",
    "In elke vlok lopen <b>haarvaten van de foetus</b>.",
    "Stoffen worden uitgewisseld <b>door de wand van de vlok</b> heen."]),placentaSvg),
  films:[["Van bevruchting tot baby","films/voortplanting/1-precies-op-tijd.html"]]});

/* --- vraag 8: activering van de specifieke afweer --- */
E.zet(T,[8],{titel:"Hoe de specifieke afweer op gang komt",
  html:`<p>Je afweersysteem onderscheidt <b>eigen</b> van <b>lichaamsvreemd</b>. Elke cel draagt eigen merkers (MHC-eiwitten). Stoffen of cellen die niet bij jou horen, werken als <b>antigeen</b>.</p>
  <ul><li>Een <b>antigeen-presenterende cel</b> (APC, bv. een macrofaag of dendritische cel) neemt het lichaamsvreemde materiaal op, knipt het in stukjes en zet die stukjes in een eigen MHC-eiwit op het celmembraan.</li>
  <li>Een <b>T-helpercel</b> met een passende receptor herkent die combinatie en wordt geactiveerd.</li>
  <li>De T-helpercel activeert vervolgens <b>B-cellen</b> die hetzelfde antigeen herkennen. Die delen en worden plasmacellen (maken antistoffen) en geheugencellen.</li></ul>
  <p>Een T-helpercel reageert alleen op een stukje antigeen dat een APC presenteert in een MHC-eiwit dat de T-helpercel als eigen herkent.</p>`,
  films:[["Antistoffen op maat","films/afweer/2-antistoffen-op-maat.html"],["T-cellen en virussen","films/afweer/3-t-cellen-en-virussen.html"]]});

/* --- vraag 9: Hardy-Weinberg --- */
function hwSvg(i){
  /* voorbeeld p=0,7 en q=0,3 */
  const p=.7,q=.3,S=220,x0=180,y0=30;let g="";
  g+=`<text class="lbl" x="${x0+S*p/2}" y="${y0-8}" text-anchor="middle">B (p = 0,7)</text><text class="lbl" x="${x0+S*p+S*q/2}" y="${y0-8}" text-anchor="middle">b (q = 0,3)</text>
  <text class="lbl" x="${x0-8}" y="${y0+S*p/2+4}" text-anchor="end">B (0,7)</text><text class="lbl" x="${x0-8}" y="${y0+S*p+S*q/2+4}" text-anchor="end">b (0,3)</text>`;
  const vak=(x,y,w,h,t,kl,on)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${on?kl:"var(--surface2)"}" stroke="var(--text3)"/>${on?`<text class="lbl" x="${x+w/2}" y="${y+h/2+4}" text-anchor="middle">${t}</text>`:""}`;
  g+=vak(x0,y0,S*p,S*p,"BB: p² = 0,49","var(--teal-soft)",i>=1);
  g+=vak(x0+S*p,y0,S*q,S*p,"Bb: 0,21","var(--goud-soft)",i>=2)+vak(x0,y0+S*p,S*p,S*q,"Bb: 0,21","var(--goud-soft)",i>=2);
  g+=vak(x0+S*p,y0+S*p,S*q,S*q,"bb: 0,09","var(--koraal-soft)",i>=3);
  if(i>=2)g+=`<text class="lblm" x="${x0+S+16}" y="${y0+60}">2pq = 0,42</text>`;
  if(i>=3)g+=`<text class="lblm" x="${x0+S+16}" y="${y0+S*p+S*q/2+4}">q² = 0,09</text>`;
  return SV("0 0 600 270",g,"Hardy-Weinberg als vierkant met p en q");
}
E.zet(T,[9],{titel:"De regel van Hardy-Weinberg",
  html:`<p>Bij een gen met twee allelen noem je de allelfrequenties <i>p</i> en <i>q</i>, met <i>p</i> + <i>q</i> = 1.</p>
  <p>Als een populatie in <b>Hardy-Weinberg-evenwicht</b> is (grote populatie, willekeurige partnerkeuze, geen selectie, geen mutatie en geen migratie), dan volgen de <b>genotypefrequenties</b> uit de allelfrequenties:</p>
  <p style="text-align:center;font-size:18px"><i>p</i><sup>2</sup> + 2<i>pq</i> + <i>q</i><sup>2</sup> = 1</p>
  <ul><li><i>p</i><sup>2</sup>: homozygoot voor het allel met frequentie <i>p</i></li><li>2<i>pq</i>: heterozygoot</li><li><i>q</i><sup>2</sup>: homozygoot voor het allel met frequentie <i>q</i></li></ul>
  <p>Lees de vraag goed: wordt er een <b>allelfrequentie</b> gevraagd of een <b>genotypefrequentie</b>, en welk genotype precies? Een frequentie van 0,05 is 5%.</p>`,
  anim:anim(caps([
    "Voorbeeld: een gen met allel B (<i>p</i> = 0,7) en allel b (<i>q</i> = 0,3). De zijden van het vierkant zijn de kansen op elk allel in een eicel en een zaadcel.",
    "Twee keer B: <i>p</i> × <i>p</i> = <b>0,49</b>. 49% van de populatie is BB.",
    "Eén B en één b kan op twee manieren: 2 × 0,7 × 0,3 = <b>0,42</b>. 42% is heterozygoot.",
    "Twee keer b: <i>q</i> × <i>q</i> = <b>0,09</b>. 9% is bb. Samen: 0,49 + 0,42 + 0,09 = 1."]),hwSvg),
  films:[["Toeval en uitwisseling","films/evolutie/5-toeval-en-uitwisseling.html"]]});

/* --- vraag 10: actieve en passieve immuniteit, klassen antistoffen --- */
E.zet(T,[10],{titel:"Actieve en passieve immuniteit, soorten antistoffen",
  html:`<p><b>Actieve immuniteit</b>: je eigen afweersysteem maakt de antistoffen (en geheugencellen), na een infectie of een vaccinatie. Dat duurt even, maar werkt lang.<br><b>Passieve immuniteit</b>: je krijgt kant-en-klare antistoffen van buiten, bijvoorbeeld via een injectie met serum of van moeder op kind. Dat werkt meteen, maar maar tijdelijk: de antistoffen worden afgebroken en je maakt er zelf geen nieuwe bij.</p>
  <p>Er zijn vijf klassen antistoffen (immunoglobulinen), met elk een eigen taak:</p>
  <div class="tablewrap"><table class="data"><tr><th>klasse</th><th>kenmerk</th></tr>
  <tr><td>IgM</td><td>groot (vijf Y’s aan elkaar), als eerste gemaakt bij een eerste infectie</td></tr>
  <tr><td>IgG</td><td>meest voorkomend in het bloed, vooral bij een tweede contact</td></tr>
  <tr><td>IgA</td><td>in slijm, speeksel, traanvocht en moedermelk</td></tr>
  <tr><td>IgE</td><td>bindt aan mestcellen; betrokken bij allergie en afweer tegen parasieten</td></tr>
  <tr><td>IgD</td><td>vooral als receptor op B-cellen</td></tr></table></div>
  <p>Welke klasse van moeder naar kind kan, en langs welke weg, zoek je op in je informatieboek.</p>`,
  films:[["Vaccins, allergie en bloedgroepen","films/afweer/4-vaccins-allergie-en-bloedgroepen.html"],["Antistoffen op maat","films/afweer/2-antistoffen-op-maat.html"]]});

/* --- vraag 11: genotypen afleiden uit antistoffen --- */
E.zet(T,[11],{titel:"Genotypen afleiden uit antigenen en antistoffen",
  html:`<p>Drie dingen heb je nodig om zo’n puzzel op te lossen:</p>
  <ul><li><b>Eigen en vreemd</b>: je afweersysteem maakt geen antistoffen tegen antigenen die je zelf hebt. Antistoffen tegen een antigeen betekenen dus: dat antigeen heb je zelf <b>niet</b>.</li>
  <li><b>Co-dominant</b>: als alle aanwezige allelen tot expressie komen, betekent een antigeen op je cellen dat je minstens één allel ervoor hebt. Heb je een antigeen niet, dan heb je dat allel helemaal niet.</li>
  <li><b>Overerving</b>: een kind krijgt van elk gen één allel van de moeder en één van de vader.</li></ul>
  <p>Werk per gen apart. Begin bij de persoon over wie je het meest zeker weet, en controleer aan het eind of je uitkomst past bij álle gegevens.</p>`,
  films:[["Monohybride kruisingen","films/erfelijkheid/2-monohybride-kruisingen.html"],["Vaccins, allergie en bloedgroepen","films/afweer/4-vaccins-allergie-en-bloedgroepen.html"]]});

})();
/* ===== vwo2.js ===== */
(function(){
"use strict";
/* vwo26-1 · opgave 2 Synthetische biologie: ombouwen van E. coli (vraag 12–19) */
const E=window.EXSTOF, T="vwo26-1";
const SV=(vb,inner,lab)=>E.svg(vb,inner,lab);
const pijl=(id,kl)=>`<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${kl}"/></marker>`;
let nr=0;
const defs=()=>{nr++;return {d:`<defs>${pijl("v2g"+nr,"var(--goud)")}${pijl("v2x"+nr,"var(--text2)")}${pijl("v2t"+nr,"var(--teal)")}</defs>`,g:`url(#v2g${nr})`,x:`url(#v2x${nr})`,t:`url(#v2t${nr})`};};
const anim=(steps,draw)=>box=>E.stappen(box,steps,(st,s,i)=>{st.innerHTML=`<div style="padding:10px">${draw(i,s)}</div>`;});
const caps=a=>a.map(c=>({cap:c}));
const tx=(x,y,t,o={})=>`<text x="${x}" y="${y}" text-anchor="${o.a||"middle"}" style="font:${o.w||600} ${o.s||14}px var(--tekst);fill:${o.f||"var(--text)"}"${o.op?` opacity="${o.op}"`:""}>${t}</text>`;
const doos=(x,y,w,h,t,on,t2)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="var(--surface)" stroke="${on?"var(--goud)":"var(--line2)"}" stroke-width="${on?2.4:1.2}"/>`+tx(x+w/2,y+(t2?h/2-3:h/2+5),t)+(t2?tx(x+w/2,y+h/2+15,t2,{w:500,s:12,f:"var(--text2)"}):"");

/* ================= vraag 12: symbiose ================= */
function symSvg(i){
  const P=[["+","+","mutualisme","korstmos: alg en schimmel"],["+","0","commensalisme","seepok op een walvis"],["+","−","parasitisme","teek op een ree"]];
  let g="";
  P.forEach(([a,b,naam,vb],k)=>{const x=10+k*190,on=i===k+1||i===0,dim=i>0&&i!==k+1;
    g+=`<g opacity="${dim?.3:1}"><rect x="${x}" y="10" width="176" height="150" rx="14" fill="var(--surface)" stroke="${i===k+1?"var(--goud)":"var(--line2)"}" stroke-width="${i===k+1?2.4:1.2}"/>
      <circle cx="${x+50}" cy="62" r="26" fill="var(--teal)" opacity=".25" stroke="var(--teal)"/><circle cx="${x+126}" cy="62" r="26" fill="var(--paars)" opacity=".25" stroke="var(--paars)"/>
      ${tx(x+50,70,a,{s:24,w:700})}${tx(x+126,70,b,{s:24,w:700})}
      ${tx(x+50,104,"soort A",{s:12,w:500,f:"var(--text2)"})}${tx(x+126,104,"soort B",{s:12,w:500,f:"var(--text2)"})}
      ${i>0?tx(x+88,132,naam,{s:15,w:700,f:"var(--goud-text)"})+tx(x+88,151,vb,{s:12,w:500,f:"var(--text2)"}):""}</g>`;});
  return SV("0 0 590 170",g,"Drie vormen van symbiose met plus, nul en min");
}
E.zet(T,[12],{titel:"Symbiose: drie vormen",
  html:`<p><b>Symbiose</b> is een langdurig, nauw samenleven van twee organismen van verschillende soorten. Je bepaalt de vorm door bij <b>beide</b> partners te kijken: heeft hij er voordeel (+), nadeel (−) of merkt hij er niets van (0)?</p>
  <ul><li><b>Mutualisme</b> (+/+): beide partners hebben voordeel.</li>
  <li><b>Commensalisme</b> (+/0): de een heeft voordeel, de ander merkt er niets van.</li>
  <li><b>Parasitisme</b> (+/−): de parasiet heeft voordeel, de gastheer nadeel (hij wordt bijvoorbeeld ziek of verzwakt).</li></ul>
  <p>Let op: dezelfde soort kan in verschillende varianten een andere relatie met zijn partner hebben. Beoordeel dus elke relatie apart.</p>`,
  anim:anim(caps(["Twee soorten leven nauw samen. Per partner noteer je: + (voordeel), − (nadeel) of 0 (geen effect).",
    "<b>Mutualisme</b>: + en +. In een korstmos levert de alg suikers, de schimmel water, mineralen en bescherming.",
    "<b>Commensalisme</b>: + en 0. De seepok krijgt een plek en voedselrijk water, de walvis merkt er weinig van.",
    "<b>Parasitisme</b>: + en −. De teek zuigt bloed en kan ziekten overbrengen: de gastheer heeft er nadeel van."]),symSvg),
  films:[["Plek genoeg?","films/ecologie/plek-genoeg/index.html"]]});

/* ================= vraag 13: aerobe dissimilatie ================= */
function dissSvg(i){
  const D=defs();let g=D.d;
  const fase=[[10,"glycolyse","grondplasma"],[200,"citroenzuurcyclus","matrix mitochondrion"],[390,"oxidatieve fosforylering","membraan"]];
  fase.forEach(([x,n,w],k)=>{const on=i===k+1;g+=`<g opacity="${i>0&&!on&&!(i===4)?.35:1}">${doos(x,40,180,60,n,on,w)}</g>`;});
  g+=`<path d="M190,70 H198" stroke="var(--text2)" stroke-width="2" marker-end="${D.x}"/><path d="M380,70 H388" stroke="var(--text2)" stroke-width="2" marker-end="${D.x}"/>`;
  g+=tx(100,26,"glucose",{s:13,f:"var(--text2)"})+tx(290,26,"pyrodruivenzuur",{s:13,f:"var(--text2)"});
  if(i>=1){g+=`<path d="M100,102 C100,150 440,140 470,104" fill="none" stroke="var(--goud)" stroke-width="2" stroke-dasharray="6 5" marker-end="${D.g}"/>`+tx(100,124,"NADH",{s:13,f:"var(--goud-text)"});}
  if(i>=2){g+=`<path d="M290,102 C290,130 430,128 450,104" fill="none" stroke="var(--goud)" stroke-width="2" stroke-dasharray="6 5" marker-end="${D.g}"/>`+tx(290,124,"NADH",{s:13,f:"var(--goud-text)"})+tx(290,150,"CO₂ komt vrij",{s:12,w:500,f:"var(--text2)"});}
  if(i>=3){g+=tx(480,154,"O₂ + H⁺ + e⁻ → H₂O",{s:12,w:600,f:"var(--text2)"})+tx(480,176,"NAD⁺ terug",{s:12,w:500,f:"var(--text2)"});}
  if(i>=4){g+=`<rect x="200" y="190" width="370" height="40" rx="10" fill="var(--goud-soft)" stroke="var(--goud)"/>`+tx(385,215,"hier ontstaat de meeste ATP",{s:13});}
  return SV("0 0 580 236",g,"De drie fasen van de aerobe dissimilatie");
}
E.zet(T,[13],{titel:"Aerobe dissimilatie: NADH, ATP en de ademhalingsketen",
  html:`<p>Bij aerobe dissimilatie wordt glucose in drie fasen afgebroken. De energie wordt opgeslagen in <b>ATP</b>, dat ontstaat uit <b>ADP + fosfaat</b>.</p>
  <ul><li><b>Glycolyse</b> (in het cytoplasma): glucose → pyrodruivenzuur. Levert een beetje ATP en NADH.</li>
  <li><b>Citroenzuurcyclus</b>: koolstof wordt afgesplitst als CO₂. Er ontstaat veel NADH (en FADH₂).</li>
  <li><b>Oxidatieve fosforylering</b> (de ademhalingsketen): NADH geeft energierijke elektronen af aan eiwitten in een membraan. Aan het eind neemt <b>O₂</b> de elektronen op en vormt met H⁺ water. Hier ontstaat de meeste ATP. NAD⁺ kan weer opnieuw elektronen opnemen.</li></ul>
  <p>Bij eukaryoten zit de ademhalingsketen in het binnenmembraan van de mitochondriën.</p>
  <p><b>NADH</b> (en bij fotosynthese NADPH) is een drager van elektronen, <b>ATP</b> een drager van energie.</p>`,
  anim:anim(caps(["De drie fasen van de aerobe dissimilatie, van glucose tot water.",
    "<b>Glycolyse</b>: glucose wordt pyrodruivenzuur. Er ontstaat NADH: een drager van energierijke elektronen.",
    "<b>Citroenzuurcyclus</b>: de koolstofatomen worden CO₂. Er ontstaat nog veel meer NADH.",
    "<b>Oxidatieve fosforylering</b>: NADH geeft zijn elektronen af aan de ademhalingsketen in een membraan. O₂ is de laatste elektronenacceptor en wordt H₂O.",
    "In deze fase ontstaat de meeste ATP. Zonder O₂ loopt de keten vast."]),dissSvg),
  films:[["Alles op adem","films/stofwisseling/2-alles-op-adem.html"]]});

/* ================= vraag 14: cisgeen en transgeen ================= */
function gmSvg(i){
  const D=defs();let g=D.d;
  const org=(x,y,kl,lab)=>`<ellipse cx="${x}" cy="${y}" rx="52" ry="30" fill="${kl}" opacity=".18" stroke="${kl}" stroke-width="1.6"/>`+tx(x,y+5,lab,{s:13});
  const gen=(x,y,kl)=>`<rect x="${x-16}" y="${y-5}" width="32" height="10" rx="3" fill="${kl}"/>`;
  g+=org(90,60,"var(--teal)","soort A")+org(90,170,"var(--paars)","soort B")+org(470,115,"var(--teal)","soort A (ontvanger)");
  if(i===0)g+=tx(290,120,"Een gen inbrengen: waar komt het vandaan?",{s:14,f:"var(--text2)"});
  if(i===1){g+=gen(90,88,"var(--goud)")+`<path d="M150,70 C260,70 330,95 405,108" fill="none" stroke="var(--goud)" stroke-width="2.4" marker-end="${D.g}"/>`+gen(470,138,"var(--goud)")+tx(285,62,"zelfde soort → cisgeen",{f:"var(--goud-text)"});}
  if(i===2){g+=gen(90,198,"var(--koraal)")+`<path d="M150,165 C260,165 330,140 405,124" fill="none" stroke="var(--koraal)" stroke-width="2.4" marker-end="${D.x}"/>`+gen(470,138,"var(--koraal)")+tx(285,186,"andere soort → transgeen",{f:"var(--koraal)"});}
  return SV("0 0 580 230",g,"Cisgenese en transgenese");
}
E.zet(T,[14],{titel:"Genetische modificatie: cisgeen of transgeen",
  html:`<p>Bij <b>genetische modificatie</b> verander je het DNA van een organisme met biotechnologie, bijvoorbeeld door een gen in te brengen of uit te schakelen.</p>
  <ul><li><b>Cisgeen</b>: het ingebrachte gen komt uit <b>dezelfde soort</b> (of uit een soort waarmee het organisme zich ook natuurlijk kan kruisen). Voorbeeld: een aardappel krijgt een resistentiegen van een wilde aardappel.</li>
  <li><b>Transgeen</b>: het ingebrachte gen komt uit een <b>andere soort</b>. Voorbeeld: gist die een menselijk gen voor een hormoon heeft gekregen.</li></ul>
  <p>Het gaat dus om de herkomst van het gen, niet om hoeveel genen er zijn ingebracht of om hoe nauw verwant de groepen zijn. Bij de toelichting noem je altijd waar het gen vandaan komt.</p>`,
  anim:anim(caps(["Bij genetische modificatie brengt men een gen in een ontvanger. De naam hangt af van de herkomst van dat gen.",
    "Komt het gen uit <b>dezelfde soort</b> (of een kruisbare soort)? Dan is het resultaat <b>cisgeen</b>.",
    "Komt het gen uit een <b>andere soort</b>? Dan is het resultaat <b>transgeen</b>."]),gmSvg)});

/* ================= vraag 15: auto- en heterotroof ================= */
function trofSvg(i){
  let g="";
  const kol=[["energiebron","waar haalt het organisme energie vandaan?"],["koolstofbron","waarmee bouwt het organische stoffen?"],["elektronendonor","welke stof levert elektronen voor de opbouw?"]];
  kol.forEach(([n,v],k)=>{const x=10+k*190,on=i===k+1;g+=`<rect x="${x}" y="10" width="176" height="80" rx="12" fill="var(--surface)" stroke="${on?"var(--goud)":"var(--line2)"}" stroke-width="${on?2.4:1.2}"/>`+tx(x+88,40,n,{s:15,f:on?"var(--goud-text)":"var(--text)"})+tx(x+88,62,v.slice(0,v.indexOf(" ",22)),{s:11,w:500,f:"var(--text2)"})+tx(x+88,77,v.slice(v.indexOf(" ",22)+1),{s:11,w:500,f:"var(--text2)"});});
  const rij=(y,lab,a,b,c,on)=>tx(10,y,lab,{a:"start",s:12,f:"var(--text3)"})+[a,b,c].map((t,k)=>tx(98+k*190,y+22,t,{s:13,w:500,op:on?1:.3})).join("");
  if(i>=1)g+=rij(118,"FOTO-AUTOTROOF","licht","CO₂","?",i>=1);
  if(i>=2)g+=rij(166,"CHEMO-AUTOTROOF","chemische reactie","CO₂","anorganische stof",true);
  if(i>=3)g+=rij(214,"HETEROTROOF","organische stoffen","organische stoffen","organische stoffen",true);
  return SV("0 0 580 250",g,"Energiebron, koolstofbron en elektronendonor");
}
E.zet(T,[15],{titel:"Autotroof: energie, koolstof en elektronen",
  html:`<p>Een <b>autotroof</b> organisme maakt zijn organische stoffen zelf uit CO₂ (koolstofassimilatie, bijvoorbeeld in de calvincyclus). Een <b>heterotroof</b> organisme haalt ze uit ander organisch materiaal.</p>
  <p>Om CO₂ vast te leggen zijn twee dingen nodig: <b>energie</b> (ATP) en <b>energierijke elektronen</b> (via NADPH of NADH). Die elektronen komen van een <b>elektronendonor</b>: een stof die elektronen afgeeft en daarbij zelf verandert (geoxideerd wordt).</p>
  <ul><li><b>Foto-autotroof</b>: de energie komt uit licht. Licht is een energiebron, geen stof.</li>
  <li><b>Chemo-autotroof</b>: de energie komt uit een chemische reactie. Nitrificerende bacteriën gebruiken bijvoorbeeld ammonium als elektronendonor.</li></ul>
  <p>Stel jezelf dus drie vragen: wat is de energiebron, wat is de koolstofbron, en welke stof levert de elektronen?</p>`,
  anim:anim(caps(["Drie vragen over elk organisme: energiebron, koolstofbron en elektronendonor.",
    "<b>Foto-autotroof</b>: energie uit licht, koolstof uit CO₂. Welke stof de elektronen levert, ken je uit de lichtreactie van de fotosynthese.",
    "<b>Chemo-autotroof</b>: energie uit een chemische reactie, koolstof uit CO₂, elektronen van een anorganische stof (bij nitrificerende bacteriën: ammonium).",
    "<b>Heterotroof</b>: alles komt uit organische stoffen, zoals glucose."]),trofSvg),
  films:[["Alles in het groen","films/stofwisseling/3-alles-in-het-groen.html"]]});

/* ================= vraag 16: natuurlijke selectie ================= */
const LV=[[0,0,1,0,0,0,0,0,1,0,0,0],[0,0,1,0,0,0,0,0,1,0,0,0],[1,0,1,1,0,1,1,0,1,1,0,1],[1,1,1,1,1,1,1,1,1,1,1,1]];
function selSvg(i,s){
  let g=`<rect x="10" y="10" width="360" height="150" rx="16" fill="var(--teal)" opacity=".07" stroke="var(--line2)"/>`;
  LV[i].forEach((r,k)=>{const x=40+(k%6)*54,y=40+Math.floor(k/6)*60,d=i===2&&r===0;
    g+=`<rect x="${x}" y="${y}" width="36" height="16" rx="8" fill="${r?"var(--goud)":"var(--surface2)"}" stroke="${d?"var(--koraal)":"var(--text2)"}" stroke-width="1.4"${d?' stroke-dasharray="4 3" opacity=".45"':""}/>`;});
  g+=`<rect x="390" y="30" width="180" height="110" rx="12" fill="var(--surface)" stroke="${i>=2?"var(--koraal)":"var(--line2)"}"/>`+tx(480,70,i>=2?"antibioticum":"geen antibioticum",{s:13,f:i>=2?"var(--koraal)":"var(--text2)"})+tx(480,96,"in het medium",{s:12,w:500,f:"var(--text2)"});
  g+=`<rect x="16" y="178" width="22" height="12" rx="6" fill="var(--goud)" stroke="var(--text2)"/>`+tx(46,189,"resistent allel",{a:"start",s:12,w:500,f:"var(--text2)"})+`<rect x="170" y="178" width="22" height="12" rx="6" fill="var(--surface2)" stroke="var(--text2)"/>`+tx(200,189,"gevoelig",{a:"start",s:12,w:500,f:"var(--text2)"});
  return SV("0 0 580 200",g,"Natuurlijke selectie in een bacteriepopulatie");
}
E.zet(T,[16],{titel:"Evolutie door natuurlijke selectie",
  html:`<p>Evolutie is een verandering in de genetische samenstelling van een populatie over generaties. Bij <b>natuurlijke selectie</b> horen steeds dezelfde stappen:</p>
  <ul><li><b>Genetische variatie</b>: individuen verschillen erfelijk. Bij bacteriën ontstaat nieuwe variatie vooral door <b>mutaties</b> bij elke deling.</li>
  <li><b>Selectiedruk</b>: een factor in de omgeving die bepaalt wie meer of minder overleeft en zich voortplant (bijvoorbeeld een gif, voedseltekort, een predator).</li>
  <li><b>Selectievoordeel</b>: individuen met een gunstige variant overleven vaker en krijgen meer nakomelingen. Hun allelen worden vaker.</li></ul>
  <p>Een individu past zich dus niet aan ‘omdat het moet’: de populatie verandert doordat de best passende varianten vaker overblijven. Bacteriën delen snel, dus in een paar honderd dagen gaan er duizenden generaties voorbij.</p>`,
  anim:anim(caps(["Een populatie bacteriën. Ze lijken op elkaar, maar ze zijn niet allemaal gelijk.",
    "Door <b>mutaties</b> hebben een paar bacteriën een allel voor resistentie (goud): genetische variatie.",
    "Er komt een antibioticum in het medium: de <b>selectiedruk</b>. Gevoelige bacteriën sterven (rood gestippeld).",
    "De resistente bacteriën hebben een <b>selectievoordeel</b>: ze delen en geven het allel door. Na een tijd is de hele populatie resistent."]),selSvg),
  films:[["Natuurlijke selectie","films/evolutie/2-natuurlijke-selectie.html"],["De mens als selectiefactor","films/evolutie/4-de-mens-als-selectiefactor.html"]]});

/* ================= vraag 17: assimilatie ================= */
function assSvg(i){
  const D=defs();let g=D.d;
  g+=doos(10,70,120,54,"CO₂ + H₂O",i===1)+`<path d="M132,97 H186" stroke="var(--text2)" stroke-width="2" marker-end="${D.x}"/>`+doos(190,70,110,54,"glucose",i===1);
  g+=tx(160,60,"stap 1",{s:11,w:600,f:"var(--text3)"});
  if(i>=1)g+=tx(90,148,"koolstofassimilatie",{s:12,w:500,f:"var(--text2)"})+tx(100,163,"(fotosynthese, calvincyclus)",{s:11,w:500,f:"var(--text3)"});
  if(i>=2){[["zetmeel, cellulose",30,"C H O"],["vetten",100,"C H O"],["aminozuren",170,"C H O N (S)"]].forEach(([n,y,el],k)=>{const on=i===3&&k===2;
    g+=`<path d="M302,97 C340,97 350,${y+22} 390,${y+22}" fill="none" stroke="var(--text2)" stroke-width="2" marker-end="${D.x}"/>`+doos(394,y,176,46,n,on,el);});
    g+=tx(345,30,"stap 2",{s:11,w:600,f:"var(--text3)"});}
  if(i>=3)g+=`<path d="M300,210 C340,210 360,196 390,196" fill="none" stroke="var(--goud)" stroke-width="2.2" stroke-dasharray="5 4" marker-end="${D.g}"/>`+tx(250,214,"+ mineraal met N",{s:12,f:"var(--goud-text)"});
  return SV("0 0 580 230",g,"Van CO2 naar glucose en van glucose naar andere organische stoffen");
}
E.zet(T,[17],{titel:"Assimilatie: van glucose naar andere organische stoffen",
  html:`<p><b>Assimilatie</b> is het opbouwen van organische stoffen. Het gaat in twee stappen:</p>
  <ul><li><b>Koolstofassimilatie</b>: van CO₂ (en water) maakt een autotroof glucose. Bij planten is dat de fotosynthese.</li>
  <li>Daarna maakt een cel van glucose alle andere organische stoffen die hij nodig heeft: zetmeel en cellulose, vetten, aminozuren, nucleotiden. Ook heterotrofe organismen, zoals <i>E. coli</i> met glucose, doen deze tweede stap.</li></ul>
  <p>Glucose bevat alleen C, H en O. Voor stoffen met andere elementen moet de cel <b>mineralen</b> (anorganische ionen) uit zijn omgeving opnemen. Aminozuren bevatten bijvoorbeeld ook N (en soms S), nucleotiden ook N en P.</p>
  <p>De tweede stap van de assimilatie heeft een eigen naam. Weet je hem?</p>`,
  anim:anim(caps(["Assimilatie: de cel bouwt organische stoffen op.",
    "<b>Stap 1</b>: koolstofassimilatie. Van CO₂ en water wordt glucose gemaakt.",
    "<b>Stap 2</b>: van glucose maakt de cel andere organische stoffen. Zetmeel, cellulose en vetten bevatten net als glucose alleen C, H en O.",
    "Aminozuren bevatten ook <b>stikstof</b>. Die komt niet uit glucose: de cel moet een mineraal met N opnemen."]),assSvg),
  films:[["Alles in het groen","films/stofwisseling/3-alles-in-het-groen.html"]]});

/* ================= vraag 18 en 19: isotopen ================= */
function isoSvg(i){
  const D=defs();let g=D.d;
  const bol=(x,y,lab,on)=>`<circle cx="${x}" cy="${y}" r="22" fill="${on?"var(--goud)":"var(--surface2)"}" stroke="${on?"var(--goud)":"var(--text2)"}" stroke-width="1.6"/>`+tx(x,y+5,lab,{s:12,w:700,f:on?"var(--goud-ink,#1A1405)":"var(--text)"});
  if(i===0){g+=bol(140,80,"¹²C",false)+bol(290,80,"¹³C",true)+tx(140,130,"gewone koolstof",{s:12,w:500,f:"var(--text2)"})+tx(290,130,"isotoop: 1 neutron extra",{s:12,w:500,f:"var(--text2)"})+tx(440,85,"± 1,1% van alle C",{s:13,w:600,f:"var(--text2)"})+tx(440,104,"is van nature ¹³C",{s:13,w:600,f:"var(--text2)"});}
  else{
    const rij=(y,lab,h2o,co2)=>tx(10,y-26,lab,{a:"start",s:12,f:"var(--text3)"})+bol(60,y,"H₂O",h2o)+tx(100,y+5,"+",{s:16})+bol(140,y,"CO₂",co2)+`<path d="M170,${y} H250" stroke="var(--text2)" stroke-width="2" marker-end="${D.x}"/>`+tx(210,y-10,"plant",{s:11,w:500,f:"var(--text2)"})+(i>=2?bol(290,y,"O₂",h2o):"");
    g+=rij(60,"GROEP 1: ZUURSTOF IN WATER GELABELD (¹⁸O)",true,false)+rij(160,"GROEP 2: ZUURSTOF IN CO₂ GELABELD (¹⁸O)",false,true);
    if(i>=3)g+=tx(440,66,"label in O₂",{s:13,f:"var(--goud-text)"})+tx(440,166,"geen label in O₂",{s:13,f:"var(--text2)"})+tx(440,206,"→ O₂ komt uit water",{s:13,f:"var(--text)"});
  }
  return SV("0 0 580 220",g,"Een isotoop als label volgen");
}
E.zet(T,[18,19],{titel:"Atomen volgen met een isotoop",
  html:`<p>Een <b>isotoop</b> is een variant van een atoom met een ander aantal neutronen. <sup>13</sup>C is iets zwaarder dan gewone <sup>12</sup>C, maar reageert chemisch precies hetzelfde. Met een massaspectrometer kun je meten hoeveel <sup>13</sup>C er in een stof zit. Van nature is ongeveer 1,1% van alle koolstof <sup>13</sup>C.</p>
  <ul><li>Geef je een organisme een <b>gelabelde stof</b> (met veel <sup>13</sup>C), dan kun je volgen waar de atomen van die stof terechtkomen.</li>
  <li>Het label zit vast aan het <b>atoom</b>, niet aan de stof. Wordt de stof omgezet, dan gaat het label mee naar het product waarin dat atoom terechtkomt.</li>
  <li>Je vergelijkt groepen die verschillen in welke stof gelabeld is. Een <b>positieve controle</b> laat zien dat de methode werkt: daar móét het label terechtkomen.</li></ul>
  <p>Een klassiek voorbeeld: met zuurstofisotopen werd aangetoond waar het O₂ uit de fotosynthese vandaan komt.</p>`,
  anim:anim(caps(["Gewone koolstof is <sup>12</sup>C. De isotoop <sup>13</sup>C heeft één neutron extra, en reageert hetzelfde. Een klein deel van alle koolstof is van nature <sup>13</sup>C.",
    "Een klassiek experiment met zuurstofisotopen (<sup>18</sup>O). Twee groepen planten: in groep 1 is de zuurstof in het water gelabeld, in groep 2 de zuurstof in de CO₂.",
    "Daarna meet je of het O₂ dat de planten afgeven het label bevat.",
    "Alleen in groep 1 zit het label in het O₂. Conclusie: het O₂ komt uit water."]),isoSvg),
  films:[["Onderzoek doen in de biologie","films/cellen/onderzoek-doen/index.html"]]});

})();
/* ===== vwo3.js ===== */
(function(){
"use strict";
/* vwo26-1 · opgave 3 Imker door bijensteken naar de eerste hulp (vraag 20–27). De 'Laat zien waarom'-animaties staan in het fragment. */
const E=window.EXSTOF, T="vwo26-1";
const SV=(vb,inner,lab)=>E.svg(vb,inner,lab);
const pijl=(id,kl)=>`<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${kl}"/></marker>`;
const DEFS=`<defs>${pijl("v3pt","var(--teal)")}${pijl("v3pg","var(--goud)")}${pijl("v3px","var(--text2)")}</defs>`;
const anim=(caps,draw)=>box=>E.stappen(box,caps.map(c=>({cap:c})),(st,s,i)=>{st.innerHTML=draw(i);});

/* --- 20: weefselvloeistof bij een haarvat --- */
function haarvat(i){
  let g=DEFS;const cy=110;
  g+=`<rect x="20" y="${cy-24}" width="520" height="48" fill="var(--koraal-soft)" stroke="var(--koraal)" stroke-width="3"/>
    <text x="30" y="200" class="lblm">slagaderlijk eind</text><text x="530" y="200" class="lblm" text-anchor="end">aderlijk eind</text>
    <path d="M60,${cy} H500" stroke="var(--text2)" stroke-width="1.4" marker-end="url(#v3px)"/><text x="280" y="${cy+5}" class="lbl" text-anchor="middle">bloed</text>`;
  if(i>=1)[80,130,180].forEach(x=>g+=`<path d="M${x},${cy-26} V${cy-62}" stroke="var(--teal)" stroke-width="2.2" marker-end="url(#v3pt)"/><path d="M${x},${cy+26} V${cy+62}" stroke="var(--teal)" stroke-width="2.2" marker-end="url(#v3pt)"/>`);
  if(i>=1)g+=`<text x="130" y="${cy-70}" class="lblm" text-anchor="middle">bloeddruk duwt plasma naar buiten</text>`;
  if(i>=2)[380,430,480].forEach(x=>g+=`<path d="M${x},${cy-62} V${cy-26}" stroke="var(--teal)" stroke-width="2.2" marker-end="url(#v3pt)"/><path d="M${x},${cy+62} V${cy+26}" stroke="var(--teal)" stroke-width="2.2" marker-end="url(#v3pt)"/>`);
  if(i>=2)g+=`<text x="430" y="${cy-70}" class="lblm" text-anchor="middle">osmose trekt water terug</text>`;
  if(i>=3)g+=`<path d="M280,${cy+40} C280,${cy+60} 300,${cy+70} 330,${cy+74}" stroke="var(--goud)" stroke-width="2.2" fill="none" marker-end="url(#v3pg)"/><text x="336" y="${cy+78}" class="lbl" style="fill:var(--goud-text,var(--goud))">rest: via de lymfe</text>`;
  return SV("0 0 560 210",g,"Haarvat met uitwisseling van weefselvloeistof");
}
E.zet(T,[20],{titel:"Weefselvloeistof en ontsteking",
  html:`<p><b>Weefselvloeistof</b> ontstaat uit bloedplasma dat door de wand van de <b>haarvaten</b> naar buiten wordt geperst. Aan het slagaderlijke eind wint de <b>bloeddruk</b>: vocht gaat naar buiten. Aan het aderlijke eind trekt <b>osmose</b> (door de eiwitten in het bloed) een groot deel weer terug. De rest wordt via de <b>lymfevaten</b> afgevoerd.</p>
  <p>Als er meer vocht uit de haarvaten komt dan er wordt afgevoerd, hoopt het zich op tussen de cellen. Die zwelling heet <b>oedeem</b>.</p>
  <p>Bij een ontsteking of allergische reactie geven afweercellen <b>mediatoren</b> af: signaalstoffen die de bloedvaten in de buurt beïnvloeden. Daardoor wordt een plek rood, warm en dik. In je informatieboek vind je welke effecten een mediator als histamine heeft.</p>`,
  anim:anim(["Een haarvat: het bloed stroomt van het slagaderlijke naar het aderlijke eind.",
    "Aan het begin is de bloeddruk hoog. Plasma (zonder de grote eiwitten) wordt door de wand naar buiten geperst: weefselvloeistof.",
    "Aan het eind is de bloeddruk lager. Het bloed bevat nog veel eiwitten en trekt door osmose water terug.",
    "Wat overblijft, gaat via de lymfevaten terug naar het bloed. Zo blijft de hoeveelheid weefselvloeistof in evenwicht."],haarvat),
  films:[["Weefselvloeistof en lymfe","films/transport/4-weefselvloeistof-en-lymfe.html"],["De eerste verdediging","films/afweer/1-de-eerste-verdediging.html"]]});

/* --- 21: specifieke afweer en allergie --- */
function afweer(i){
  let g=DEFS;
  const box=(x,t,s,on)=>`<rect x="${x}" y="40" width="120" height="70" rx="10" fill="${on?"var(--teal-soft)":"none"}" stroke="${on?"var(--teal)":"var(--line2)"}"/><text x="${x+60}" y="70" class="lbl" text-anchor="middle">${t}</text><text x="${x+60}" y="90" class="lblm" text-anchor="middle">${s}</text>`;
  g+=box(10,"antigeen","komt binnen",i>=0)+box(160,"B-cel","herkent het",i>=1)+box(310,"plasmacellen","maken antistoffen",i>=2)+box(460,"antistoffen","binden antigeen",i>=3);
  [130,280,430].forEach((x,k)=>g+=`<path d="M${x+2},75 H${x+26}" stroke="${i>k?"var(--text2)":"var(--line2)"}" stroke-width="1.6" marker-end="url(#v3px)"/>`);
  if(i>=1)g+=`<text x="300" y="140" class="lblm" text-anchor="middle">dit kost bij een nieuw antigeen enkele dagen</text>`;
  return SV("0 0 600 160",g,"Stappen van de specifieke afweer");
}
E.zet(T,[21],{titel:"Specifieke afweer en allergie",
  html:`<p>Je <b>specifieke afweer</b> reageert op <b>antigenen</b>: moleculen die het lichaam als lichaamsvreemd herkent. Een B-cel met een passende receptor wordt geactiveerd, deelt en vormt <b>plasmacellen</b> die <b>antistoffen</b> maken, en geheugencellen. Antistoffen passen precies op één soort antigeen.</p>
  <p>Bij een <b>allergie</b> reageert de afweer op een stof die eigenlijk onschuldig is (het <b>allergeen</b>). De antistoffen die daarbij horen, gaan vastzitten op <b>mestcellen</b>. Bindt het allergeen aan die antistoffen, dan geven de mestcellen <b>histamine</b> en andere mediatoren af.</p>`,
  anim:anim(["Een antigeen komt het lichaam binnen.","Een B-cel met een passende receptor herkent het antigeen en wordt geactiveerd.","De B-cel deelt en vormt plasmacellen (en geheugencellen). Plasmacellen maken antistoffen.","De antistoffen binden het antigeen. Bij een allergie zitten zulke antistoffen ook op mestcellen."],afweer),
  films:[["Antistoffen op maat","films/afweer/2-antistoffen-op-maat.html"],["Vaccins, allergie en bloedgroepen","films/afweer/4-vaccins-allergie-en-bloedgroepen.html"]]});

/* --- 22: hartcyclus en bloeddruk --- */
function cyclus(i){
  let g="";const X=t=>60+t*240,Y=p=>200-(p-60)*2.2;
  const P=t=>{const f=t%1;if(f<.12)return 80+40*Math.sin(f/.12*Math.PI/2);if(f<.35)return 120-20*(f-.12)/.23;return 100-20*(f-.35)/.65;};
  for(let p=60;p<=120;p+=20)g+=`<line class="grid" x1="60" x2="540" y1="${Y(p)}" y2="${Y(p)}"/><text class="tick" x="54" y="${Y(p)+4}" text-anchor="end">${p}</text>`;
  g+=`<path class="ax" d="M60,40 V200 H540"/><text class="tick" x="300" y="222" text-anchor="middle">tijd (2 hartslagen)</text><text class="tick" x="18" y="130" transform="rotate(-90 18 130)" text-anchor="middle">druk in de aorta (mmHg)</text>`;
  if(i>=1)[0,1].forEach(k=>g+=`<rect x="${X(k)}" y="40" width="${.35*240}" height="160" fill="var(--koraal-soft)"/>`);
  if(i>=1)g+=`<text x="${X(.17)}" y="34" class="lblm" text-anchor="middle" style="fill:var(--koraal)">systole</text><text x="${X(.67)}" y="34" class="lblm" text-anchor="middle">diastole</text>`;
  let d="";for(let t=0;t<=2;t+=.01)d+=(d?"L":"M")+X(t).toFixed(1)+","+Y(P(t)).toFixed(1);g+=`<path class="cv" d="${d}"/>`;
  if(i>=2)g+=`<line x1="60" x2="540" y1="${Y(120)}" y2="${Y(120)}" stroke="var(--goud)" stroke-dasharray="5 4"/><text x="536" y="${Y(120)-5}" class="lbl" text-anchor="end">hoogste druk: systolische druk</text>
    <line x1="60" x2="540" y1="${Y(80)}" y2="${Y(80)}" stroke="var(--teal)" stroke-dasharray="5 4"/><text x="536" y="${Y(80)+15}" class="lbl" text-anchor="end" style="fill:var(--teal)">laagste druk: diastolische druk</text>`;
  return SV("0 0 560 230",g,"Druk in de aorta tijdens de hartcyclus");
}
E.zet(T,[22],{titel:"Hartcyclus en bloeddruk",
  html:`<p>Bij elke hartslag trekken de kamers samen (<b>systole</b>) en ontspannen ze weer (<b>diastole</b>). Tijdens de systole wordt bloed met kracht de slagaders in geperst.</p>
  <p>De druk in een slagader schommelt daardoor bij elke hartslag. De <b>systolische druk</b> is de hoogste waarde, de <b>diastolische druk</b> de laagste. Een bloeddruk van 120/80 mmHg betekent: 120 systolisch, 80 diastolisch.</p>
  <p>De wand van grote slagaders bevat veel <b>elastische vezels</b>. Daardoor kan de wand meegeven met de drukschommelingen, en het bloed tussen twee hartslagen in toch verder duwen. Kleinere slagaders hebben ook glad spierweefsel, waarmee ze nauwer of wijder kunnen worden.</p>`,
  anim:anim(["De druk in de aorta gaat bij elke hartslag op en neer.","Tijdens de systole trekken de kamers samen en stijgt de druk. Tijdens de diastole daalt hij weer.","De hoogste druk is de systolische druk, de laagste de diastolische druk."],cyclus),
  films:[["Buizen onder druk","films/transport/2-buizen-onder-druk.html"]]});

/* --- 23: eiwitstructuur --- */
function niveaus(i){
  let g="";const bol=(x,y,c)=>`<circle cx="${x}" cy="${y}" r="9" fill="${c}" stroke="var(--text2)"/>`;
  const kl=["var(--teal-soft)","var(--goud-soft)","var(--paars-soft)","var(--koraal-soft)"];
  if(i===0)g+=`<path d="M60,90 H456" stroke="var(--text2)" stroke-width="1.2"/>`+[...Array(12)].map((_,k)=>bol(60+k*36,90,kl[k%4])).join("");
  if(i===1){let d="";for(let t=0;t<=460;t+=2)d+=(d?"L":"M")+(40+t)+","+(90+22*Math.sin(t/14)).toFixed(1);g+=`<path d="${d}" stroke="var(--teal)" stroke-width="5" fill="none"/>`;}
  if(i>=2){g+=`<path d="M60,150 C30,60 140,20 170,80 C200,140 240,30 300,60 C360,90 300,170 380,150 C450,130 460,50 500,40" stroke="var(--teal)" stroke-width="6" fill="none"/>`;
    g+=`<text x="250" y="186" class="lblm" text-anchor="middle">bindingen tussen restgroepen houden de vouwing vast</text>`;}
  if(i===3)g+=`<path d="M300,140 C360,100 420,180 480,150" stroke="var(--paars)" stroke-width="6" fill="none"/><text x="470" y="176" class="lblm" text-anchor="end" style="fill:var(--paars)">tweede keten</text>`;
  return SV("0 0 540 200",g,"Niveaus van eiwitstructuur");
}
E.zet(T,[23],{titel:"Eiwitstructuur en bindingen",
  html:`<p>Een eiwit heeft vier niveaus van bouw:</p>
  <ul><li><b>primaire structuur</b>: de volgorde van de aminozuren (vaak in eenlettercode genoteerd)</li>
  <li><b>secundaire structuur</b>: helix of vouwblad, door waterstofbruggen in de ruggengraat</li>
  <li><b>tertiaire structuur</b>: de ruimtelijke vouwing van de hele keten, door bindingen tussen de <b>restgroepen</b></li>
  <li><b>quaternaire structuur</b>: meerdere ketens samen</li></ul>
  <p>Welke bindingen in de tertiaire structuur mogelijk zijn, hangt af van de restgroepen. <b>Apolaire</b> restgroepen kruipen bij elkaar weg van het water (hydrofobe interacties). <b>Polaire</b> restgroepen met OH-, NH- of C=O-groepen kunnen waterstofbruggen vormen. Een <b>zwavelbrug</b> (–S–S–) is een covalente binding tussen twee restgroepen met een SH-groep. In je informatieboek staan de aminozuren met hun restgroep en eenlettercode.</p>`,
  anim:anim(["Primaire structuur: een keten van aminozuren in een vaste volgorde.","Secundaire structuur: de keten vormt bijvoorbeeld een helix.","Tertiaire structuur: de keten vouwt zich verder, doordat restgroepen bindingen met elkaar aangaan.","Quaternaire structuur: meerdere ketens vormen samen één eiwit."],niveaus),
  films:[["Van DNA naar eiwit","films/dna/3-van-dna-naar-eiwit.html"]]});

/* --- 24: membraanbouw --- */
function fosfo(i){
  let g="";
  g+=`<g transform="translate(70,30)"><circle cx="0" cy="0" r="16" fill="var(--teal-soft)" stroke="var(--teal)" stroke-width="2"/><path d="M-6,16 V90 M6,16 V90" stroke="var(--goud)" stroke-width="3"/></g>`;
  g+=`<text x="96" y="34" class="lbl" style="fill:var(--teal)">kop: polair, hydrofiel</text><text x="96" y="90" class="lbl" style="fill:var(--goud-text,var(--goud))">staarten: apolair, hydrofoob</text>`;
  if(i>=1){for(let x=300;x<540;x+=22){g+=`<path d="M${x-3},60 V96 M${x+3},60 V96 M${x-3},140 V104 M${x+3},140 V104" stroke="var(--goud)" stroke-width="1.6"/><circle cx="${x}" cy="52" r="8" fill="var(--teal-soft)" stroke="var(--teal)"/><circle cx="${x}" cy="148" r="8" fill="var(--teal-soft)" stroke="var(--teal)"/>`;}
    g+=`<text x="420" y="30" class="lblm" text-anchor="middle">water</text><text x="420" y="178" class="lblm" text-anchor="middle">water</text>`;}
  if(i>=2)g+=`<rect x="370" y="40" width="40" height="120" rx="10" fill="var(--paars-soft)" stroke="var(--paars)" stroke-width="2"/><text x="300" y="196" class="lblm">membraaneiwit dwars door de membraan</text>`;
  return SV("0 0 560 205",g,"Fosfolipide en dubbele laag");
}
E.zet(T,[24],{titel:"Bouw van de celmembraan",
  html:`<p>Een celmembraan bestaat uit een <b>dubbele laag fosfolipiden</b>. Een fosfolipide heeft een <b>polaire kop</b> (hydrofiel, mengt goed met water) en twee <b>apolaire vetzuurstaarten</b> (hydrofoob).</p>
  <p>In water gaan fosfolipiden vanzelf zo liggen dat de koppen het water raken en de staarten naar elkaar toe wijzen. Er geldt: <b>polair mengt met polair, apolair met apolair</b>.</p>
  <p>In de membraan zitten ook <b>membraaneiwitten</b>. Sommige liggen tegen de membraan aan, andere steken er dwars doorheen. Waar een eiwit precies zit, hangt af van de eigenschappen van zijn aminozuren.</p>`,
  anim:anim(["Eén fosfolipide: een polaire kop en twee apolaire staarten.","In water vormen fosfolipiden een dubbele laag: koppen aan het water, staarten naar binnen.","Membraaneiwitten kunnen dwars door die dubbele laag heen steken."],fosfo),
  films:[["Diffusie en osmose","films/cellen/diffusie-osmose/index.html"]]});

/* --- 25: signaaloverdracht --- */
function signaal(i){
  let g=DEFS;
  g+=`<rect x="0" y="60" width="560" height="16" fill="var(--text3)" opacity=".45"/><text x="10" y="50" class="lblm">buiten de cel</text><text x="10" y="100" class="lblm">binnen de cel</text>`;
  g+=`<rect x="120" y="50" width="26" height="40" rx="6" fill="${i>=1?"var(--teal)":"var(--surface2)"}" stroke="var(--teal)"/><text x="133" y="118" class="lblm" text-anchor="middle">receptor</text>`;
  g+=`<path d="M128,10 l10,0 l-5,9 z" fill="var(--goud)" transform="translate(0,${i>=1?24:0})"/><text x="150" y="20" class="lblm">signaalstof van buiten (eerste boodschapper)</text>`;
  if(i>=2){g+=`<path d="M150,90 L220,140" stroke="var(--text2)" stroke-width="1.4" marker-end="url(#v3px)"/>`;[[240,140],[256,152],[244,164]].forEach(([x,y])=>g+=`<circle cx="${x}" cy="${y}" r="5" fill="var(--paars)"/>`);
    g+=`<text x="262" y="190" class="lblm" text-anchor="end">signaalstof in de cel</text>`;}
  if(i>=3){g+=`<path d="M266,152 L330,152" stroke="var(--text2)" stroke-width="1.4" marker-end="url(#v3px)"/>`;for(let k=0;k<9;k++)g+=`<circle cx="${350+(k%3)*16}" cy="${136+Math.floor(k/3)*16}" r="5" fill="var(--paars)" opacity=".7"/>`;
    g+=`<text x="336" y="190" class="lblm">steeds meer moleculen</text>`;}
  if(i>=4)g+=`<path d="M400,150 C460,150 470,110 470,82" stroke="var(--goud)" stroke-width="2" fill="none" marker-end="url(#v3pg)"/><text x="480" y="120" class="lbl" style="fill:var(--goud-text,var(--goud))">effect</text>`;
  return SV("0 0 560 210",g,"Signaaloverdracht van buiten de cel naar binnen");
}
E.zet(T,[25],{titel:"Signaaloverdracht in een cel",
  html:`<p>Een signaal van buiten, zoals een hormoon, kan vaak de cel niet in. Het bindt aan een <b>receptor</b>: een eiwit in de membraan dat precies op die stof past. Die buitenstof heet ook wel de <b>eerste boodschapper</b>.</p>
  <p>Binding aan de receptor zet in de cel een reeks reacties in gang: een <b>signaaltransductieroute</b>. Enzymen worden actief en maken signaalstoffen die het bericht in het cytoplasma verder brengen. Omdat elke stap veel nieuwe moleculen kan activeren, wordt het signaal sterk <b>versterkt</b>; zo'n kettingreactie noem je een <b>cascade</b>.</p>`,
  anim:anim(["Een signaalstof komt van buiten bij de cel aan.","De stof bindt aan een receptor in de membraan.","De receptor zet in de cel de vorming van een signaalstof in gang.","Elke stap activeert weer veel nieuwe moleculen: het signaal wordt versterkt.","Aan het eind van de route volgt het effect, bijvoorbeeld het openen van kanaaltjes in de membraan."],signaal),
  films:[["Post voor iedereen","films/hormonen/1-post-voor-iedereen.html"]]});

/* --- 26: membraanpotentiaal --- */
function potentiaal(i){
  let g="";const X=t=>70+t*4.4,Y=v=>30+(40-v)*1.5;
  [-80,-60,-40,-20,0,20,40].forEach(v=>g+=`<line class="grid" x1="70" x2="540" y1="${Y(v)}" y2="${Y(v)}"/><text class="tick" x="64" y="${Y(v)+4}" text-anchor="end">${v}</text>`);
  g+=`<path class="ax" d="M70,24 V${Y(-90)} H540"/><text class="tick" x="20" y="${Y(-25)}" transform="rotate(-90 20 ${Y(-25)})" text-anchor="middle">membraanpotentiaal (mV)</text>
    <line x1="70" x2="540" y1="${Y(-55)}" y2="${Y(-55)}" stroke="var(--koraal)" stroke-dasharray="5 4"/><text x="536" y="${Y(-55)-5}" class="lblm" text-anchor="end" style="fill:var(--koraal)">drempelwaarde</text>
    <text x="${X(66)}" y="${Y(-70)-6}" class="lblm">rustpotentiaal −70 mV</text>`;
  let d=`M${X(0)},${Y(-70)} L${X(20)},${Y(-70)}`;
  if(i===1)d+=` L${X(30)},${Y(-62)} L${X(45)},${Y(-70)} L${X(105)},${Y(-70)}`;
  if(i===2)d+=` L${X(30)},${Y(-80)} L${X(45)},${Y(-70)} L${X(105)},${Y(-70)}`;
  if(i===0)d+=` L${X(105)},${Y(-70)}`;
  if(i===3)d+=` L${X(30)},${Y(-55)} L${X(36)},${Y(35)} L${X(46)},${Y(-80)} L${X(60)},${Y(-70)} L${X(105)},${Y(-70)}`;
  g+=`<path class="cv" d="${d}"/>`;
  const lab={1:["minder negatief: depolarisatie","var(--goud-text,var(--goud))",-48],2:["negatiever: hyperpolarisatie","var(--teal)",-92],3:["boven de drempel: actiepotentiaal","var(--text)",30]}[i];
  if(lab)g+=`<text x="${X(40)}" y="${Y(lab[2])}" class="lbl" style="fill:${lab[1]}">${lab[0]}</text>`;
  return SV("0 0 560 236",g,"Veranderingen van de membraanpotentiaal");
}
E.zet(T,[26],{titel:"Membraanpotentiaal en impuls",
  html:`<p>Over de membraan van een zenuwcel staat een spanning: de <b>membraanpotentiaal</b>. In rust is de binnenkant negatief ten opzichte van de buitenkant, ongeveer −70 mV (<b>rustpotentiaal</b>). Dat komt doordat ionen ongelijk verdeeld zijn over de membraan.</p>
  <ul><li><b>Depolarisatie</b>: de binnenkant wordt minder negatief.</li><li><b>Hyperpolarisatie</b>: de binnenkant wordt negatiever.</li></ul>
  <p>Ionen gaan door open kanaaltjes van <b>hoge naar lage concentratie</b> (diffusie). Bewegen er positieve ionen naar binnen of naar buiten, dan verandert de lading aan de binnenkant mee. Na een actiepotentiaal stromen bijvoorbeeld K<sup>+</sup>-ionen naar buiten; de binnenkant wordt daardoor weer negatief.</p>
  <p>Een <b>impuls</b> (actiepotentiaal) ontstaat alleen als de membraanpotentiaal de <b>drempelwaarde</b> bereikt.</p>`,
  anim:anim(["In rust is de membraanpotentiaal ongeveer −70 mV.","Wordt de binnenkant minder negatief, dan heet dat depolarisatie.","Wordt de binnenkant juist negatiever, dan heet dat hyperpolarisatie.","Alleen als de drempelwaarde wordt bereikt, ontstaat een actiepotentiaal: de impuls."],potentiaal),
  films:[["Het kabelnetwerk","films/zenuwstelsel/2-het-kabelnetwerk.html"]]});

/* --- 27: wat bepaalt de bloeddruk --- */
function pomp(i){
  let g=DEFS;
  g+=`<rect x="30" y="70" width="90" height="70" rx="12" fill="var(--koraal-soft)" stroke="${i===1?"var(--goud)":"var(--koraal)"}" stroke-width="${i===1?3:1.6}"/><text x="75" y="110" class="lbl" text-anchor="middle">pomp</text>
    <path d="M120,105 H300" stroke="var(--koraal)" stroke-width="22"/><path d="M300,105 H520" stroke="var(--koraal)" stroke-width="${i===2?8:22}"/>
    <text x="410" y="${i===2?84:76}" class="lblm" text-anchor="middle">${i===2?"nauwere buis: meer weerstand":"buis"}</text>`;
  g+=`<g transform="translate(210,40)"><circle r="20" fill="none" stroke="var(--text2)" stroke-width="2"/><line x1="0" y1="0" x2="${i>0?12:0}" y2="${i>0?-16:-20}" stroke="var(--goud)" stroke-width="3"/><text y="-26" class="lblm" text-anchor="middle">druk</text></g>`;
  if(i===1)g+=`<text x="75" y="164" class="lbl" text-anchor="middle" style="fill:var(--goud-text,var(--goud))">meer pompen per minuut</text>`;
  return SV("0 0 560 180",g,"Pomp en buis als model voor de bloeddruk");
}
E.zet(T,[27],{titel:"Wat bepaalt de bloeddruk?",
  html:`<p>De bloeddruk in de slagaders hangt van twee dingen af:</p>
  <ul><li>hoeveel bloed het hart per minuut wegpompt (het <b>hartminuutvolume</b> = slagvolume × hartslagfrequentie);</li><li>hoeveel <b>weerstand</b> de bloedvaten bieden. Hoe nauwer de vaten, hoe groter de weerstand.</li></ul>
  <p>De wand van de kleine slagaders (arteriolen) bevat <b>glad spierweefsel</b>. Daarmee kunnen ze nauwer of wijder worden en zo de bloedstroom naar een orgaan regelen.</p>
  <p><b>Adrenaline</b> bereidt je lichaam voor op actie (vechten of vluchten). Het werkt op veel organen tegelijk: hart, bloedvaten, luchtwegen en stofwisseling. Niet al die effecten hebben met de bloeddruk te maken.</p>`,
  anim:anim(["Model: een pomp duwt vloeistof door een buis. Hoe hoog is de druk in de buis?","Pompt de pomp meer vloeistof per minuut, dan stijgt de druk.","Wordt de buis verderop nauwer, dan neemt de weerstand toe en stijgt de druk ervoor ook."],pomp),
  films:[["Buizen onder druk","films/transport/2-buizen-onder-druk.html"],["Het hart onder controle","films/transport/5-het-hart-onder-controle.html"]]});

})();
/* ===== vwo4.js ===== */
(function(){
"use strict";
/* vwo26-1 · opgave 4 CRISPR in de strijd tegen overgewicht (vraag 28–36) */
const E=window.EXSTOF, T="vwo26-1";
const SV=(vb,inner,lab)=>E.svg(vb,inner,lab);
const pijl=(id,kl)=>`<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${kl}"/></marker>`;
const DEFS=`<defs>${pijl("v4pk","var(--koraal)")}${pijl("v4pt","var(--teal)")}${pijl("v4pg","var(--goud)")}${pijl("v4px","var(--text2)")}</defs>`;
const anim=(steps,draw)=>box=>E.stappen(box,steps,(st,s,i)=>{st.innerHTML=draw(i,s);});
const caps=a=>a.map(c=>({cap:c}));

/* --- vraag 28–29: warmte en energiebalans --- */
function balans(i){
  let g=DEFS;
  /* weegschaal: inname links, verbruik rechts */
  const kant=i===0?0:i===1?14:-14;
  g+=`<path d="M300,210 L280,240 H320 Z" fill="var(--text3)"/><line x1="300" y1="210" x2="300" y2="110" stroke="var(--text3)" stroke-width="3"/>`;
  g+=`<g transform="rotate(${kant} 300 110)"><line x1="140" y1="110" x2="460" y2="110" stroke="var(--text2)" stroke-width="4"/>
    <path d="M140,110 L110,160 H170 Z" fill="var(--goud)" opacity=".35" stroke="var(--goud)"/><path d="M460,110 L430,160 H490 Z" fill="var(--teal)" opacity=".35" stroke="var(--teal)"/></g>`;
  g+=`<text x="140" y="40" class="lbl" text-anchor="middle" style="fill:var(--goud-text)">energie erin</text><text x="140" y="58" class="lblm" text-anchor="middle">voedsel</text>`;
  g+=`<text x="460" y="40" class="lbl" text-anchor="middle" style="fill:var(--teal)">energie eruit</text><text x="460" y="58" class="lblm" text-anchor="middle">bewegen, groei, warmte</text>`;
  if(i===1)g+=`<text x="300" y="275" class="lbl" text-anchor="middle">meer erin dan eruit: het overschot wordt opgeslagen als vet</text>`;
  if(i===2)g+=`<text x="300" y="275" class="lbl" text-anchor="middle">meer eruit dan erin: het lichaam gebruikt zijn reserves</text>`;
  if(i===0)g+=`<text x="300" y="275" class="lbl" text-anchor="middle">evenwicht: het lichaamsgewicht blijft gelijk</text>`;
  return SV("0 0 600 290",g,"Energiebalans als weegschaal");
}
E.zet(T,[28,29],{titel:"Warmte, vetweefsel en de energiebalans",
  html:`<p>Bij elke <b>dissimilatie</b> komt naast ATP ook <b>warmte</b> vrij. Zoogdieren houden zo hun lichaamstemperatuur constant. Het meeste warmteverlies gaat via de <b>huid</b>.</p>
  <p>Bij kou vernauwen de bloedvaten in de huid, zodat je minder warmte verliest; bij warmte verwijden ze juist en ga je zweten. Bij langdurige kou maakt het lichaam extra warmte, bijvoorbeeld door rillen.</p>
  <p>Je <b>energiebalans</b>: krijg je meer energie binnen dan je verbruikt, dan wordt het overschot opgeslagen als vet in wit vetweefsel. Alles wat energie verbruikt (bewegen, warmte maken) helpt die balans de andere kant op.</p>`,
  anim:anim(caps(["Energiebalans in evenwicht: wat je eet, verbruik je ook.","Meer energie erin dan eruit: het overschot wordt vet.","Meer energie eruit dan erin: het lichaam verbruikt zijn vetreserves."]),i=>balans(i)),
  films:[["Alles op adem","films/stofwisseling/2-alles-op-adem.html"],["Wat zit er in je eten?","films/voeding/1-wat-zit-er-in-je-eten.html"]]});

/* --- vraag 30: oxidatieve fosforylering (zonder UCP1) --- */
function oxfos(i){
  let g=DEFS;
  g+=`<rect x="0" y="0" width="600" height="96" fill="var(--teal)" opacity=".07"/><rect x="0" y="134" width="600" height="106" fill="var(--goud)" opacity=".06"/>
  <rect x="0" y="96" width="600" height="38" fill="var(--text3)" opacity=".22"/>
  <text x="8" y="18" class="lblm">ruimte tussen de membranen</text><text x="8" y="232" class="lblm">matrix</text><text x="592" y="120" class="lblm" text-anchor="end">binnenmembraan</text>`;
  [60,150,240].forEach((x,k)=>g+=`<rect x="${x}" y="86" width="56" height="58" rx="12" fill="var(--paars)" opacity=".5"/>`);
  g+=`<text x="178" y="80" class="lblm" text-anchor="middle">elektronentransportketen</text>`;
  if(i>=0)g+=`<path d="M70,170 C120,150 150,150 300,170" fill="none" stroke="var(--paars)" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#v4px)"/><text x="80" y="200" class="lblm">e⁻ (van NADH en FADH₂)</text><text x="330" y="176" class="lblm">→ O₂ + H⁺ → H₂O</text>`;
  const n=i===0?2:10;const pos=[[90,40],[130,60],[180,30],[220,58],[270,40],[110,20],[200,72],[250,20],[160,52],[300,64]];
  if(i>=1){[88,178,268].forEach(x=>g+=`<path d="M${x},150 V60" stroke="var(--koraal)" stroke-width="2" marker-end="url(#v4pk)"/>`);}
  pos.slice(0,n).forEach(([x,y])=>g+=`<text x="${x}" y="${y}" class="lbl" text-anchor="middle" style="fill:var(--koraal)">H⁺</text>`);
  g+=`<rect x="470" y="80" width="30" height="70" rx="6" fill="var(--teal)" opacity=".6"/><circle cx="485" cy="172" r="22" fill="var(--teal)" opacity=".5"/><text x="485" y="70" class="lbl" text-anchor="middle">ATP-synthase</text>`;
  if(i>=2)g+=`<path d="M485,26 V150" stroke="var(--koraal)" stroke-width="2.4" marker-end="url(#v4pk)"/><text x="485" y="214" class="lbl" text-anchor="middle" style="fill:var(--goud-text)">ADP + P → ATP</text>`;
  if(i>=1)g+=`<text x="300" y="14" class="lbl" text-anchor="middle" style="fill:var(--koraal)">hoge H⁺-concentratie</text>`;
  return SV("0 0 600 240",g,"Oxidatieve fosforylering in de binnenmembraan van een mitochondrion");
}
E.zet(T,[30],{titel:"Oxidatieve fosforylering",
  html:`<p>De laatste stap van de aerobe dissimilatie vindt plaats in de <b>binnenmembraan</b> van het mitochondrion.</p>
  <ul><li>NADH en FADH₂ geven elektronen af aan de <b>elektronentransportketen</b>. Aan het eind nemen O₂ en H⁺ ze op: er ontstaat water.</li>
  <li>Met de energie van de elektronen pompen de eiwitten van de keten <b>H⁺-ionen</b> van de matrix naar de ruimte tussen de membranen. Zo ontstaat een <b>H⁺-gradiënt</b>.</li>
  <li>De H⁺-ionen kunnen alleen terug via een kanaal. Stromen ze door <b>ATP-synthase</b>, dan levert die stroom de energie om van ADP en P ATP te maken (chemiosmose).</li></ul>
  <p>De gradiënt is dus een tussenvoorraad van energie, net als water achter een stuwdam dat een turbine aandrijft.</p>`,
  anim:anim(caps(["De elektronentransportketen in de binnenmembraan krijgt elektronen van NADH en FADH₂.","Met die energie pompen de eiwitten H⁺-ionen naar de ruimte tussen de membranen: een H⁺-gradiënt.","H⁺ stroomt terug door ATP-synthase. Die stroom drijft de vorming van ATP aan."]),i=>oxfos(i)),
  films:[["Alles op adem","films/stofwisseling/2-alles-op-adem.html"]]});

/* --- vraag 31: eiwitten op hun plek --- */
E.zet(T,[31],{titel:"Ribosomen, ER en golgi-systeem",
  html:`<p>Een cel heeft twee soorten ribosomen:</p>
  <ul><li><b>Ribosomen op het ER</b> (ruw ER): de groeiende polypeptideketen gaat direct het ER in. Daar wordt hij gevouwen en soms bewerkt. Blaasjes brengen het eiwit naar het <b>golgi-systeem</b>, dat het verder bewerkt en verpakt voor de celmembraan, lysosomen of uitscheiding (exocytose).</li>
  <li><b>Vrije ribosomen</b> liggen los in het grondplasma. De keten die zij maken, komt in het <b>grondplasma</b> terecht en gaat niet het ER in.</li></ul>
  <p>Welk ribosoom een eiwit maakt, hangt af van een signaalvolgorde aan het begin van de keten.</p>`,
  films:[["Celorganellen","films/cellen/celorganellen/index.html"],["Van DNA naar eiwit","films/dna/3-van-dna-naar-eiwit.html"]]});

/* --- vraag 32: CRISPR-Cas en genregulatie --- */
function crispr(i){
  let g=DEFS;
  const y1=150,y2=162;
  const bubbel=i>=1;
  g+=`<path d="M20,${y1} H200 ${bubbel?"L212,138 H330 L342,"+y1:"H342"} H580" fill="none" stroke="var(--text3)" stroke-width="4"/><path d="M20,${y2} H580" fill="none" stroke="var(--text3)" stroke-width="4"/>`;
  g+=`<text x="580" y="190" class="lblm" text-anchor="end">DNA</text>`;
  const bx=i===0?120:270;
  g+=`<path d="M${bx-80},${i===0?60:100} C${bx-90},${i===0?20:40} ${bx+90},${i===0?20:40} ${bx+80},${i===0?60:100} C${bx+90},${i===0?120:200} ${bx-90},${i===0?120:200} ${bx-80},${i===0?60:100} Z" fill="var(--text3)" opacity=".25"/>`;
  g+=`<text x="${bx}" y="${i===0?44:58}" class="lbl" text-anchor="middle">Cas-eiwit</text>`;
  const ry=i===0?90:157;
  g+=`<path d="M${bx-50},${ry} H${bx+50}" stroke="var(--goud)" stroke-width="4"/><text x="${bx}" y="${i===0?80:206}" class="lbl" text-anchor="middle" style="fill:var(--goud-text)">gids-RNA</text>`;
  if(i===0)g+=`<text x="420" y="80" class="lblm">gids-RNA past maar op één</text><text x="420" y="96" class="lblm">plek in het DNA (baseparing)</text>`;
  if(i===1)g+=`<text x="430" y="80" class="lblm">gevonden: het gids-RNA</text><text x="430" y="96" class="lblm">paart met de passende volgorde</text>`;
  if(i===2)g+=`<path d="M270,128 V186" stroke="var(--koraal)" stroke-width="3" stroke-dasharray="5 4"/><text x="430" y="80" class="lbl" style="fill:var(--koraal)">gewone Cas9: knipt hier</text><text x="430" y="96" class="lblm">het DNA door</text>`;
  if(i===3)g+=`<text x="430" y="80" class="lbl">‘dode’ Cas: knipt niet</text><text x="430" y="96" class="lblm">blijft alleen op die plek zitten,</text><text x="430" y="112" class="lblm">met eventueel iets eraan vast</text>`;
  return SV("0 0 600 220",g,"CRISPR-Cas zoekt met gids-RNA een plek in het DNA");
}
E.zet(T,[32],{titel:"CRISPR-Cas en genen aan- en uitzetten",
  html:`<p><b>Transcriptie</b> begint bij de <b>promotor</b>: een DNA-volgorde vóór het gen waar <b>RNA-polymerase</b> bindt. RNA-polymerase maakt een mRNA-kopie van de matrijsstreng. Alle lichaamscellen hebben hetzelfde DNA, maar elk celtype leest maar een deel van zijn genen af: zo heeft elk celtype zijn eigen set actieve genen. Dat wordt geregeld door eiwitten die aan DNA-volgordes rond een gen binden (<b>genregulatie</b>).</p>
  <p><b>CRISPR-Cas</b> bestaat uit een Cas-eiwit en een <b>gids-RNA</b>. Het gids-RNA vindt door <b>baseparing</b> precies één plek in het DNA. Het gewone Cas9 knipt daar het DNA door. Er bestaan ook varianten die niet knippen: die blijven alleen op de plek zitten, en wat je eraan vastmaakt, doet daar zijn werk.</p>`,
  anim:anim(caps(["Het Cas-eiwit draagt een gids-RNA met een vaste basenvolgorde.","Het gids-RNA paart met de passende volgorde in het DNA. Zo komt het Cas-eiwit op precies die plek.","Het gewone Cas9 knipt daar het DNA door (gen uitschakelen of repareren).","Een variant die niet knipt, blijft alleen op die plek zitten. Wat eraan vastzit, werkt dan precies daar."]),i=>crispr(i)),
  films:[["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"],["CRISPR: wat doet dit gen?","films/vervolg/biomedisch-2-crispr-wat-doet-dit-gen.html"]]});

/* --- vraag 33: eigen en lichaamsvreemd --- */
E.zet(T,[33],{titel:"Eigen of lichaamsvreemd",
  html:`<p>Op het membraan van bijna elke lichaamscel zitten <b>MHC-eiwitten</b> (bij de mens ook HLA genoemd). Die verschillen per persoon, en nog meer tussen soorten. Je afweer leert tijdens de ontwikkeling de eigen MHC-eiwitten te herkennen en niet aan te vallen.</p>
  <p>Cellen met andere MHC-eiwitten zijn <b>lichaamsvreemd</b>. <b>Cytotoxische T-cellen</b> herkennen en doden ze, en ook antistoffen kunnen ertegen worden gemaakt.</p>
  <p>Een organisme dat <b>immunodeficiënt</b> is, heeft een (deels) uitgeschakeld afweersysteem: het kan lichaamsvreemde cellen en ziekteverwekkers niet of nauwelijks opruimen.</p>`,
  films:[["T-cellen en virussen","films/afweer/3-t-cellen-en-virussen.html"],["Vaccins, allergie en bloedgroepen","films/afweer/4-vaccins-allergie-en-bloedgroepen.html"]]});

/* --- vraag 34–35: onderzoek beoordelen --- */
E.zet(T,[34,35],{titel:"Controlegroep, betrouwbaarheid en validiteit",
  html:`<p>In een experiment vergelijk je een <b>experimentele groep</b> (die krijgt de behandeling) met een <b>controlegroep</b>. De controlegroep is in alles gelijk, behalve de factor die je onderzoekt. Pas door die vergelijking zie je of de behandeling iets doet.</p>
  <ul><li><b>Betrouwbaarheid</b>: zou je bij herhaling dezelfde uitkomst krijgen? Toeval speelt minder mee bij grote groepen, meerdere herhalingen en nauwkeurige metingen.</li>
  <li><b>Validiteit</b>: meet je echt wat je wilt weten, en kloppen je conclusies daarom? Een goede opzet met de juiste vergelijkingen en zonder storende factoren maakt een onderzoek valide.</li></ul>
`,
  films:[["Onderzoek doen in de biologie","films/cellen/onderzoek-doen/index.html"]]});

/* --- vraag 36: glucoseregulatie --- */
function glucose(i){
  let g=DEFS;
  g+=`<rect x="220" y="100" width="160" height="50" rx="12" fill="var(--surface)" stroke="var(--text2)" stroke-width="2"/><text x="300" y="122" class="lbl" text-anchor="middle">glucose in het bloed</text><text x="300" y="139" class="lblm" text-anchor="middle">${i===0?"normaal":i===1?"te hoog":"daalt weer"}</text>`;
  if(i>=1)g+=`<rect x="20" y="20" width="150" height="44" rx="10" fill="var(--surface)" stroke="var(--teal)" stroke-width="2"/><text x="95" y="47" class="lbl" text-anchor="middle">alvleesklier</text>
    <path d="M220,112 C190,96 180,80 170,64" fill="none" stroke="var(--text2)" stroke-width="2" marker-end="url(#v4px)"/>`;
  if(i>=2)g+=`<path d="M95,64 V190 H200" fill="none" stroke="var(--teal)" stroke-width="2.4" marker-end="url(#v4pt)"/><text x="104" y="130" class="lbl" style="fill:var(--teal)">insuline</text>
    <rect x="204" y="174" width="190" height="44" rx="10" fill="var(--surface)" stroke="var(--goud)" stroke-width="2"/><text x="299" y="194" class="lbl" text-anchor="middle">lever-, spier- en vetcellen</text><text x="299" y="210" class="lblm" text-anchor="middle">nemen glucose op</text>
    <path d="M394,196 C460,196 470,140 382,128" fill="none" stroke="var(--goud)" stroke-width="2.4" marker-end="url(#v4pg)"/>`;
  if(i===3)g+=`<text x="440" y="40" class="lbl" style="fill:var(--koraal)">diabetes type 2:</text><text x="440" y="58" class="lblm">insuline is er wel,</text><text x="440" y="74" class="lblm">maar de cellen reageren</text><text x="440" y="90" class="lblm">er slecht op</text>
    <path d="M300,174 V156" stroke="var(--koraal)" stroke-width="3"/><path d="M290,160 L310,170 M310,160 L290,170" stroke="var(--koraal)" stroke-width="2.5"/>`;
  return SV("0 0 600 230",g,"Regeling van de glucoseconcentratie met insuline");
}
E.zet(T,[36],{titel:"Bloedsuiker, insuline en diabetes",
  html:`<p>Na een maaltijd stijgt de <b>glucoseconcentratie</b> van het bloed. De alvleesklier geeft dan <b>insuline</b> af. Insuline zorgt dat lever-, spier- en vetcellen glucose opnemen (en dat de lever glucose als glycogeen opslaat). Daardoor daalt de concentratie weer. Bij een te lage concentratie geeft de alvleesklier <b>glucagon</b> af.</p>
  <ul><li><b>Diabetes type 1</b>: de alvleesklier maakt (bijna) geen insuline meer.</li>
  <li><b>Diabetes type 2</b>: er is wel insuline, maar de cellen zijn er <b>ongevoelig</b> voor geworden. Overgewicht vergroot de kans hierop.</li></ul>
  <p>Bij een <b>glucosetolerantietest</b> krijgt een nuchter proefdier of persoon een vaste hoeveelheid glucose. Daarna meet je een tijd lang de glucoseconcentratie in het bloed. Zo zie je hoe goed het lichaam de glucose verwerkt.</p>`,
  anim:anim(caps(["De glucoseconcentratie van het bloed is normaal.","Na een maaltijd (of injectie) stijgt de concentratie. De alvleesklier merkt dat.","De alvleesklier geeft insuline af. Lever-, spier- en vetcellen nemen glucose op: de concentratie daalt weer.","Bij diabetes type 2 werkt die laatste stap slecht: de cellen reageren nauwelijks op insuline."]),i=>glucose(i)),
  films:[["Suiker in balans","films/hormonen/2-suiker-in-balans.html"]]});

})();
/* ===== vwo5.js ===== */
(function(){
"use strict";
/* Opgave 5 vwo26-1: Zetmeelmatten voor de kust (vraag 37–41) */
const X=EXSTOF, T="vwo26-1";
const wrap=(s,max)=>`<div style="max-width:${max||600}px;margin:0 auto;padding:8px">${s}</div>`;
const anim=(steps,draw)=>box=>X.stappen(box,steps,(st,s,i)=>{st.innerHTML=draw(i,s);});
const caps=a=>a.map(c=>({cap:c}));
const pijl=(id,kl)=>`<defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${kl}"/></marker></defs>`;

/* ---------- vraag 37: abiotische factoren en tolerantie ---------- */
function tolerantie(i){
  const X0=60,X1=600,B=220,Y=v=>B-v*170,xs=x=>X0+x*(X1-X0);
  let d="";for(let k=0;k<=100;k++){const x=k/100;const v=x<.2||x>.85?0:Math.sin(Math.PI*Math.pow((x-.2)/.65,.8));d+=(d?"L":"M")+xs(x).toFixed(1)+","+Y(Math.max(0,v)).toFixed(1);}
  let s=`<path d="M${X0},20 V${B} H${X1}" class="ax"/><text class="tick" x="${(X0+X1)/2}" y="${B+30}" text-anchor="middle">abiotische factor, bijvoorbeeld temperatuur →</text>
  <text class="tick" x="20" y="${B/2+20}" transform="rotate(-90 20 ${B/2+20})" text-anchor="middle">groei / activiteit →</text>`;
  const xo=.2+.65*Math.pow(.5,1/.8);
  if(i>=3)s+=`<rect x="${xs(.2)}" y="20" width="${xs(.85)-xs(.2)}" height="${B-20}" fill="var(--groen-soft)"/><text x="${xs(.52)}" y="${B-12}" text-anchor="middle" class="lbl" style="fill:var(--groen)">tolerantiegebied</text>
    <text x="${xs(.1)}" y="${B-40}" text-anchor="middle" class="lbl" style="fill:var(--koraal)">sterft</text><text x="${xs(.93)}" y="${B-40}" text-anchor="middle" class="lbl" style="fill:var(--koraal)">sterft</text>`;
  s+=`<path d="${d}" class="cv"/>`;
  if(i>=1)s+=`<path d="M${xs(xo)},${Y(1)} V${B}" stroke="var(--goud)" stroke-dasharray="4 4"/><text x="${xs(xo)}" y="${Y(1)-8}" text-anchor="middle" class="lbl" style="fill:var(--goud-text)">optimum</text>`;
  if(i>=2)s+=`<circle cx="${xs(.2)}" cy="${B}" r="5" fill="var(--koraal)"/><text x="${xs(.2)}" y="${B+16}" text-anchor="middle" class="lbl" style="fill:var(--koraal)">minimum</text>
    <circle cx="${xs(.85)}" cy="${B}" r="5" fill="var(--koraal)"/><text x="${xs(.85)}" y="${B+16}" text-anchor="middle" class="lbl" style="fill:var(--koraal)">maximum</text>`;
  return X.svg("0 0 640 260",s,"Tolerantiekromme met optimum, minimum, maximum en tolerantiegebied");
}
X.zet(T,[37],{titel:"Abiotische factoren en tolerantie",
  html:`<p>Elk organisme is afhankelijk van <b>abiotische factoren</b>: licht, temperatuur, water, zuurgraad (pH), zoutgehalte, stroming, de bodem. Voor elke factor heeft een soort een <b>tolerantiegebied</b>, tussen een minimum en een maximum. Daarbinnen ligt het <b>optimum</b>, waar de soort het best groeit.</p>
  <p>Planten zijn <b>producenten</b>: met fotosynthese maken ze glucose uit CO₂ en water, met licht als energiebron. Zonder genoeg licht maken ze te weinig organische stof om te groeien.</p>
  <p><b>Klimaatverandering</b> komt door het versterkte broeikaseffect: er komen meer broeikasgassen (vooral CO₂) in de atmosfeer, waardoor de aarde opwarmt. Dat heeft allerlei gevolgen, op het land en in zee, en die veranderen de abiotische factoren voor organismen.</p>
  <p class="muted">Bij een ‘licht toe’-vraag noem je niet alleen het gevolg, maar ook hoe het het organisme raakt: welke factor verandert er, en wat doet dat met de plant?</p>`,
  anim:anim(caps(["Een tolerantiekromme: hoe goed een soort groeit bij verschillende waarden van één abiotische factor.",
    "Bij het <b>optimum</b> groeit de soort het best.",
    "Onder het <b>minimum</b> of boven het <b>maximum</b> kan de soort niet overleven.",
    "Daartussen ligt het <b>tolerantiegebied</b>. Verandert een factor zo dat hij erbuiten komt, dan gaat de soort achteruit of dood."]),i=>wrap(tolerantie(i))),
  films:[["Eén aarde","films/ecologie/3-een-aarde.html"],["Binnen de grenzen","films/ecologie/5-binnen-de-grenzen.html"]]});

/* extra waarom-animatie vraag 37: hoe een gevolg van klimaatverandering zeegras raakt */
function zeegrasDiepte(i){
  const bodem=230,opp=i===1?40:90,troebel=i===2;
  let s=`<rect x="0" y="${opp}" width="460" height="${bodem-opp}" fill="var(--teal-soft)"/>`;
  if(i===1)s+=`<path d="M0,90 H460" stroke="var(--teal)" stroke-dasharray="5 5"/><text x="8" y="84" class="lblm">oude zeespiegel</text><text x="8" y="34" class="lbl" style="fill:var(--teal)">zeespiegel stijgt</text>`;
  if(troebel){for(let k=0;k<70;k++){const x=(k*53)%450+5,y=opp+10+((k*37)%(bodem-opp-15));s+=`<circle cx="${x}" cy="${y}" r="2.2" fill="var(--text3)" opacity=".7"/>`;}
    s+=`<rect x="0" y="${opp}" width="460" height="${bodem-opp}" fill="var(--text3)" opacity=".18"/>`;}
  const diep=bodem-opp,licht=i===0||i===3?1:i===1?.45:.3;
  for(let k=0;k<6;k++){const x=40+k*70;s+=`<path d="M${x},0 L${x+30},${bodem-8}" stroke="var(--goud)" stroke-width="3" opacity="${k%2?.6:.8}" stroke-dasharray="${i===0||i===3?"0":"0"}"/>`;}
  s+=`<defs><linearGradient id="o5zd${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--surface2)" stop-opacity="0"/><stop offset="${(opp/bodem).toFixed(2)}" stop-color="var(--surface2)" stop-opacity="0"/><stop offset="1" stop-color="var(--surface2)" stop-opacity="${(1-licht).toFixed(2)}"/></linearGradient></defs>
  <rect x="0" y="0" width="460" height="${bodem}" fill="url(#o5zd${i})"/>`;
  s+=`<path d="M0,${bodem} H460 V260 H0 Z" fill="var(--area)"/>`;
  for(let k=0;k<16;k++){const x=110+k*16,h=40+(k*13)%26,b=(k%2?1:-1)*8;const ok=i!==3;
    s+=`<path d="M${x},${bodem} C${x+b*.3},${bodem-h*.5} ${x+b},${bodem-h*.8} ${x+b*1.3},${bodem-h*(ok?1:.6)}" stroke="${ok?"var(--groen)":"var(--text3)"}" stroke-width="3" fill="none" stroke-linecap="round"/>`;}
  /* meter: licht bij de bladeren */
  s+=`<text x="480" y="24" class="lbl">licht bij de</text><text x="480" y="40" class="lbl">bladeren</text><rect x="490" y="52" width="36" height="170" rx="4" fill="none" stroke="var(--line2)"/>
  <rect x="490" y="${52+170*(1-licht)}" width="36" height="${170*licht}" rx="4" fill="var(--goud)"/>`;
  if(i===3)s+=`<rect x="560" y="60" width="16" height="140" rx="8" fill="none" stroke="var(--koraal)" stroke-width="2"/><circle cx="568" cy="210" r="14" fill="var(--koraal)"/><rect x="564" y="70" width="8" height="134" fill="var(--koraal)"/>
    <text x="568" y="240" text-anchor="middle" class="lbl" style="fill:var(--koraal)">te warm</text>`;
  return X.svg("0 0 620 262",s,["Zeegras op een ondiepe plek met genoeg licht","Hogere zeespiegel: dieper water, minder licht bij het zeegras","Troebel water door opwerveling: minder licht","Te warm water: zeegras sterft af"][i]);
}
X.waarom(T,37,anim(caps([
  "Zeegras groeit op <b>ondiepe</b> plekken. Er komt genoeg licht bij de bladeren voor fotosynthese.",
  "<b>Zeespiegelstijging:</b> de plant staat op dezelfde plek, maar het water erboven wordt dieper. Er komt minder licht bij de bladeren, dus minder fotosynthese en minder groei.",
  "<b>Meer en zwaardere stormen:</b> sediment wervelt op, het water wordt troebel. Ook dan komt er minder licht bij. Heftige stormen kunnen een veld zelfs wegslaan.",
  "<b>Opwarming:</b> komt de watertemperatuur boven het maximum van het tolerantiegebied, dan raakt de stofwisseling verstoord en sterft de plant af. Eén zo’n gevolg mét de toelichting is het punt."]),i=>wrap(zeegrasDiepte(i),560)));

/* ---------- vraag 38: productie en niches ---------- */
function productie(i){
  let s=pijl("o5sp","var(--text2)");
  const box=(x,y,w,h,t,kl,t2)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="var(--surface)" stroke="${kl}" stroke-width="1.6"/><text x="${x+w/2}" y="${y+h/2+(t2?-3:4)}" text-anchor="middle" class="lbl">${t}</text>${t2?`<text x="${x+w/2}" y="${y+h/2+13}" text-anchor="middle" class="lblm">${t2}</text>`:""}`;
  s+=`<circle cx="60" cy="60" r="26" fill="var(--goud)"/><text x="60" y="104" text-anchor="middle" class="lblm">zonlicht</text>`;
  s+=box(150,36,170,48,"producenten","var(--groen)","fotosynthese");
  s+=`<path d="M90,60 H146" stroke="var(--text2)" stroke-width="1.6" marker-end="url(#o5sp)"/>`;
  s+=`<text x="235" y="24" text-anchor="middle" class="lbl" style="fill:var(--groen)">BPP: alles wat ze maken</text>`;
  if(i>=1){s+=`<path d="M235,86 V140" stroke="var(--koraal)" stroke-width="1.6" marker-end="url(#o5sp)"/>`+box(150,144,170,48,"eigen dissimilatie","var(--koraal)","CO₂ en water terug");}
  if(i>=2){s+=`<path d="M322,60 H396" stroke="var(--groen)" stroke-width="2.4" marker-end="url(#o5sp)"/><text x="358" y="52" text-anchor="middle" class="lbl" style="fill:var(--groen)">NPP</text>`+box(400,36,200,48,"nieuwe organische stof","var(--groen)","groei van de producenten");
    s+=`<path d="M500,86 V140" stroke="var(--text2)" stroke-width="1.6" marker-end="url(#o5sp)"/>`+box(400,144,200,48,"consumenten en reducenten","var(--line2)","eten ervan");}
  return X.svg("0 0 620 210",s,"Van zonlicht via producenten naar BPP, dissimilatie en NPP");
}
X.zet(T,[38],{titel:"BPP, NPP en niches",
  html:`<p>De <b>bruto primaire productie (BPP)</b> is alle organische stof die de producenten in een ecosysteem per oppervlakte en per tijd maken met fotosynthese. Bij fotosynthese wordt koolstof uit CO₂ vastgelegd in glucose.</p>
  <p>Een deel daarvan gebruiken de producenten zelf voor hun <b>dissimilatie</b>; daarbij komt de koolstof weer vrij als CO₂. Wat overblijft is de <b>netto primaire productie (NPP)</b>: NPP = BPP − dissimilatie van de producenten. De NPP is de nieuwe organische stof die beschikbaar is voor groei, voor consumenten en voor reducenten.</p>
  <p>Een <b>niche</b> is de rol van een soort in een ecosysteem: waar en hoe hij leeft, wat hij eet, door wie hij gegeten wordt en welke omstandigheden hij nodig heeft. Het <b>habitat</b> is alleen de plek waar een soort leeft. Hoe meer verschillende manieren van leven een ecosysteem mogelijk maakt, hoe meer niches er zijn.</p>`,
  anim:anim(caps(["Producenten leggen met fotosynthese de energie van licht vast in organische stof. Alles samen is de <b>BPP</b>.",
    "Een deel van die organische stof verbranden de producenten zelf bij hun <b>dissimilatie</b>.",
    "Wat overblijft is de <b>NPP</b>: daarmee groeien de producenten, en daar leven consumenten en reducenten van."]),i=>wrap(productie(i))),
  films:[["Alles gaat rond","films/ecologie/alles-gaat-rond/index.html"],["Plek genoeg?","films/ecologie/plek-genoeg/index.html"]]});

/* ---------- vraag 39: successie, climax en evenwicht ---------- */
function successie(i){
  const B=200;let s=`<path d="M10,${B} H630" class="ax"/>`;
  const stad=[["kale bodem",0],["pioniers","mos, grassen"],["struiken",""],["bos","climax"]];
  stad.forEach(([n,sub],k)=>{const x=40+k*155,on=k<=i||i===4;const op=i===4?(k===0?1:.25):on?1:.15;
    let g="";
    if(k===0)g+=`<path d="M${x},${B} q20,-6 40,0 q20,-4 40,0" stroke="var(--text3)" stroke-width="2" fill="none"/>`;
    if(k===1)for(let j=0;j<8;j++)g+=`<path d="M${x+5+j*13},${B} q2,-14 ${j%2?5:-4},-${18+j%3*6}" stroke="var(--groen)" stroke-width="2.5" fill="none"/>`;
    if(k===2)[[x+20,40],[x+60,52],[x+100,38]].forEach(([cx,h])=>g+=`<path d="M${cx},${B} V${B-h+14}" stroke="var(--text2)" stroke-width="3"/><circle cx="${cx}" cy="${B-h}" r="20" fill="var(--groen)" opacity=".75"/>`);
    if(k===3)[[x+25,92],[x+80,106]].forEach(([cx,h])=>g+=`<path d="M${cx},${B} V${B-h+26}" stroke="var(--text2)" stroke-width="6"/><ellipse cx="${cx}" cy="${B-h}" rx="34" ry="34" fill="var(--groen)"/>`);
    g+=`<text x="${x+55}" y="${B+20}" text-anchor="middle" class="lbl">${n}</text>`+(sub?`<text x="${x+55}" y="${B+36}" text-anchor="middle" class="lblm">${sub}</text>`:"");
    if(k<3)g+=`<path d="M${x+122},${B-60} h22" stroke="var(--text3)" stroke-width="2"/><path d="M${x+144},${B-65} l7,5 l-7,5 z" fill="var(--text3)"/>`;
    s+=`<g opacity="${op}">${g}</g>`;});
  if(i===4)s+=`<path d="M470,64 C380,30 200,30 70,150" stroke="var(--koraal)" stroke-width="2.4" fill="none" stroke-dasharray="6 5"/><path d="M66,140 l2,14 l10,-9 z" fill="var(--koraal)"/><text x="330" y="20" text-anchor="middle" class="lbl" style="fill:var(--koraal)">verstoring (bv. brand, storm, kap): de successie begint opnieuw</text>`;
  return X.svg("0 0 640 250",s,"Successie van kale bodem via pioniers en struiken naar bos als climax");
}
X.zet(T,[39],{titel:"Successie, climax en evenwicht",
  html:`<p><b>Successie</b> is de geleidelijke opeenvolging van levensgemeenschappen op één plek. Pioniersoorten veranderen het milieu (bijvoorbeeld de bodem), waardoor andere soorten zich kunnen vestigen en de pioniers verdringen. Het stabiele <b>eindstadium</b> van zo’n natuurlijke successie heet het <b>climaxstadium</b> (climax-ecosysteem). Daarin is de samenstelling van de levensgemeenschap stabiel.</p>
  <p>In een <b>dynamisch evenwicht</b> schommelen aantallen en hoeveelheden rond een vaste waarde. Dat komt door <b>negatieve terugkoppeling</b>: een afwijking roept een reactie op die de afwijking verkleint.</p>
  <p>Bij <b>positieve terugkoppeling</b> versterkt een verandering zichzelf. Dan kan een ecosysteem bij een <b>omslagpunt</b> snel van de ene toestand naar een andere gaan, die zichzelf daarna ook in stand houdt.</p>
  <p class="muted">Lees bij een kringloop-tekening met pijlen precies welke pijl van waar naar waar loopt: wat leidt tot wat?</p>`,
  anim:anim(caps(["Successie begint vaak op een <b>kale bodem</b>.",
    "<b>Pioniers</b> zoals mossen en grassen vestigen zich en vormen een eerste bodemlaagje.",
    "Daardoor kunnen <b>struiken</b> groeien. Die verdringen de pioniers.",
    "Uiteindelijk ontstaat een stabiel eindstadium: het <b>climaxstadium</b>, hier een bos.",
    "Een <b>verstoring</b> zet de successie terug naar een vroeg stadium. Daarna begint de opeenvolging opnieuw."]),i=>wrap(successie(i))),
  films:[["Alles gaat rond","films/ecologie/alles-gaat-rond/index.html"]]});

/* ---------- vraag 40: duurzaamheid ---------- */
X.zet(T,[40],{titel:"Ecologisch duurzaam",
  html:`<p><b>Duurzame ontwikkeling</b> betekent: voorzien in de behoeften van nu, zonder dat latere generaties daardoor tekortkomen. <b>Ecologisch</b> duurzaam gaat over de natuur en het milieu:</p>
  <ul><li>je gebruikt <b>hernieuwbare grondstoffen</b>, niet sneller dan ze weer aangroeien;</li>
  <li>stoffen blijven in een <b>kringloop</b>: wat je achterlaat, kan de natuur zelf weer opnemen en verwerken;</li>
  <li>je doet de <b>ecosystemen</b> en de soorten die erin leven geen blijvende schade;</li>
  <li>je draagt zo min mogelijk bij aan grote milieuproblemen, zoals het <b>versterkte broeikaseffect</b>.</li></ul>
  <p class="muted">Een argument geef je als: kenmerk van het product → waarom dat goed is voor het milieu. Geld (‘goedkoop’) of hoe goed iets werkt, zijn geen ecologische argumenten.</p>`,
  films:[["Eén aarde","films/ecologie/3-een-aarde.html"]]});

/* ---------- vraag 41: een experiment beoordelen ---------- */
function experiment(i){
  let s=pijl("o5se","var(--text2)");
  const box=(x,y,w,h,t,t2,kl,on)=>`<g opacity="${on?1:.25}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="var(--surface)" stroke="${kl}" stroke-width="1.6"/><text x="${x+w/2}" y="${y+20}" text-anchor="middle" class="lbl">${t}</text>${t2.map((t,j)=>`<text x="${x+w/2}" y="${y+38+j*15}" text-anchor="middle" class="lblm">${t}</text>`).join("")}</g>`;
  s+=box(10,20,180,80,"hypothese",["verwachte invloed van","factor A op B"],"var(--goud)",true);
  s+=box(230,10,180,60,"proefgroep",["met factor A"],"var(--teal)",i>=1);
  s+=box(230,80,180,60,"controlegroep",["zonder factor A, verder gelijk"],"var(--teal)",i>=1);
  s+=box(450,20,170,80,"meten",["de afhankelijke","variabele B"],"var(--paars)",i>=2);
  s+=box(150,160,340,70,"conclusie",["passen de metingen","bij de voorspelling?"],"var(--groen)",i>=3);
  if(i>=1)s+=`<path d="M192,60 H226" stroke="var(--text2)" stroke-width="1.5" marker-end="url(#o5se)"/>`;
  if(i>=2)s+=`<path d="M412,40 H446 M412,110 H430 V70 H446" stroke="var(--text2)" stroke-width="1.5" fill="none" marker-end="url(#o5se)"/>`;
  if(i>=3)s+=`<path d="M535,102 V195 H494" stroke="var(--text2)" stroke-width="1.5" fill="none" marker-end="url(#o5se)"/>`;
  return X.svg("0 0 630 240",s,"Onderzoeksopzet: hypothese, proefgroep en controlegroep, meten, conclusie");
}
X.zet(T,[41],{titel:"Een experiment beoordelen",
  html:`<p>Een <b>hypothese</b> is een verwachting over het verband tussen een factor die je verandert (de <b>onafhankelijke variabele</b>) en iets wat je meet (de <b>afhankelijke variabele</b>). Met een <b>controlegroep</b>, die op één factor na gelijk wordt behandeld, zie je of een verschil echt door die factor komt.</p>
  <p>Bij het beoordelen vergelijk je per hypothese de proefgroep met de controlegroep, voor elke variabele die in de hypothese staat. Komt het resultaat uit zoals voorspeld, dan <b>ondersteunt</b> het de hypothese. Wat je verder mag concluderen, hangt af van de opzet van het onderzoek: wat is er gemeten, en onder welke omstandigheden?</p>
  <p class="muted">Lees bij staafdiagrammen eerst de titels en de assen: welke groep, welke plek, welke meting?</p>`,
  anim:anim(caps(["Je begint met een <b>hypothese</b>: wat verwacht je dat factor A doet met B?",
    "Je vergelijkt een <b>proefgroep</b> met een <b>controlegroep</b> die alleen in factor A verschilt.",
    "Je <b>meet</b> in beide groepen de afhankelijke variabele.",
    "Je trekt een <b>conclusie</b>: passen de metingen bij wat de hypothese voorspelde?"]),i=>wrap(experiment(i))),
  films:[["Onderzoek doen in de biologie","films/cellen/onderzoek-doen/index.html"]]});

})();