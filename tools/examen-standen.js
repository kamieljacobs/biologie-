/* Hulpstanden bij de oefenexamens (tools/examen-*.html). Gedeeld bestand (Kamiel 1 nov 2026: 'een aantal standen
   waarin de leerling kan kiezen hoeveel hulp hij/zij wil').
   Gebruik in een tool, na setVrij:  EXSTAND.init({store, save, setVrij});
   Vier standen, van veel naar geen hulp. Ze zetten klassen op <body>; de oude klassen 'hulp' en 'examen' blijven,
   zodat de bestaande css (hulpvragen eerst / hulpknop) gewoon werkt:
     stap     -> body.hulp.stap        uitleg van de stof staat al open, hulpvragen eerst
     hulp     -> body.hulp             hulpvragen eerst (de oude hulpstand)
     vastzit  -> body.examen.vastzit   meteen de examenvraag, hulpvragen en uitleg achter een knop (de oude examenstand)
     echt     -> body.examen.echt      geen hulp, geen uitleg, geen 'Laat zien waarom', met een examenklok van 3 uur
   Opslag in store.mode (oude waarde 'examen' wordt 'vastzit') en store.klok. */
(function(){
"use strict";
const STANDEN=[
  {k:"stap",naam:"Stap voor stap",cls:["hulp","stap"],
   uitleg:"De meeste hulp. De uitleg van de stof staat al open en je doorloopt eerst de hulpvragen. Daarna maak je de examenvraag."},
  {k:"hulp",naam:"Met hulpvragen",cls:["hulp"],
   uitleg:"Eerst de hulpvragen, dan de examenvraag. De uitleg van de stof klap je open als je hem nodig hebt."},
  {k:"vastzit",naam:"Hulp als je vastzit",cls:["examen","vastzit"],
   uitleg:"Je begint meteen met de examenvraag. Zit je vast, dan open je de hulpvragen of de uitleg van de stof."},
  {k:"echt",naam:"Echt examen",cls:["examen","echt"],
   uitleg:"Zoals op het echte examen: geen hulpvragen, geen uitleg en geen 'Laat zien waarom'. Je mag vrij door de vragen klikken. Zet de klok aan voor 3 uur examentijd. Wil je achteraf de uitleg zien, kies dan een andere stand."}];
const ALLE=["hulp","examen","stap","vastzit","echt"];
const DUUR=180*60*1000;
const el=(tag,attrs={},html="")=>{const e=document.createElement(tag);for(const k in attrs){if(k==="class")e.className=attrs[k];else if(k.startsWith("on"))e.addEventListener(k.slice(2),attrs[k]);else e.setAttribute(k,attrs[k]);}if(html)e.innerHTML=html;return e;};
const css=`.standen{display:flex;flex-direction:column;gap:8px;width:100%}
.standen .seg{flex-wrap:wrap}
.standuitleg{margin:0;font-size:15px;color:var(--text2);max-width:62ch}
body.examen.vastzit .stof{display:block}
body.echt .helpbtn,body.echt .stof,body.echt .waarombtn{display:none!important}
.klok{display:none;align-items:center;gap:8px;flex-wrap:wrap}
body.echt .klok{display:flex}
.klok .tijd{font:600 18px var(--meta,monospace);font-variant-numeric:tabular-nums;color:var(--text);min-width:7ch}
.klok .tijd.op{color:var(--koraal)}
.klok button{min-height:36px}`;
let store,save,setVrij,tik=null;

function setStand(k,keuze){
  const s=STANDEN.find(x=>x.k===k)||STANDEN[1];
  store.mode=s.k;save();
  ALLE.forEach(c=>document.body.classList.toggle(c,s.cls.includes(c)));
  document.querySelectorAll("#standen button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.k===s.k?"true":"false"));
  const u=document.getElementById("standuitleg");if(u)u.textContent=s.uitleg;
  if(s.k==="stap")openStof(document);
  if(s.k==="echt"&&keuze&&setVrij)setVrij(true);
  toonKlok();
}
/* in 'stap voor stap' gaat de uitleg van de stof vanzelf open (één keer per blok; dichtklappen mag) */
function openStof(root){root.querySelectorAll("details.stof:not([data-auto])").forEach(d=>{d.dataset.auto="1";d.open=true;});}

/* ---------- examenklok (alleen in 'Echt examen') ---------- */
function verstreken(){const k=store.klok||{};return (k.al||0)+(k.loopt&&k.sinds?Date.now()-k.sinds:0);}
function fmt(ms){const r=Math.max(0,Math.ceil((DUUR-ms)/1000));const h=Math.floor(r/3600),m=Math.floor(r%3600/60),s=r%60;return `${h}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;}
function toonKlok(){
  const box=document.getElementById("klok");if(!box)return;
  const k=store.klok||{};const v=verstreken();const op=v>=DUUR;
  box.querySelector(".tijd").textContent=op?"Tijd is om":fmt(v);
  box.querySelector(".tijd").classList.toggle("op",op);
  box.querySelector(".start").textContent=k.loopt?"Pauze":(v>0?"Verder":"Start de klok");
  box.querySelector(".reset").hidden=v===0;
  clearInterval(tik);tik=null;
  if(k.loopt&&!op&&document.body.classList.contains("echt"))tik=setInterval(toonKlok,1000);
}
function startStop(){
  const k=store.klok=store.klok||{al:0,loopt:false,sinds:null};
  if(k.loopt){k.al=verstreken();k.loopt=false;k.sinds=null;}else{k.loopt=true;k.sinds=Date.now();}
  save();toonKlok();
}
function reset(){store.klok={al:0,loopt:false,sinds:null};save();toonKlok();}

window.EXSTAND={
  STANDEN,
  init(o){
    store=o.store;save=o.save;setVrij=o.setVrij;
    const st=document.createElement("style");st.textContent=css;document.head.append(st);
    const plek=document.getElementById("standen");
    if(plek){
      plek.innerHTML="";
      STANDEN.forEach(s=>{const b=el("button",{type:"button","data-k":s.k,title:s.uitleg},s.naam);b.onclick=()=>setStand(s.k,true);plek.append(b);});
      const wrap=el("div",{class:"standen"});plek.before(wrap);
      wrap.append(el("span",{class:"mono muted",style:"font-size:12px;letter-spacing:.08em;text-transform:uppercase"},"Hoeveel hulp wil je?"),plek,el("p",{class:"standuitleg",id:"standuitleg","aria-live":"polite"}));
      const klok=el("div",{class:"klok",id:"klok","aria-label":"Examenklok"},`<span class="mono muted">Examentijd</span><span class="tijd" role="timer"></span>`);
      const sb=el("button",{type:"button",class:"ghost start"},"Start de klok");sb.onclick=startStop;
      const rb=el("button",{type:"button",class:"ghost reset"},"Opnieuw");rb.onclick=reset;
      klok.append(sb,rb);wrap.append(klok);
    }
    new MutationObserver(ms=>{if(!document.body.classList.contains("stap"))return;
      for(const m of ms)m.addedNodes.forEach(n=>{if(n.nodeType===1)openStof(n.matches&&n.matches("details.stof")?n.parentNode||n:n);});
    }).observe(document.getElementById("main")||document.body,{childList:true,subtree:true});
    document.addEventListener("visibilitychange",()=>{if(!document.hidden)toonKlok();});
    const m=store.mode==="examen"?"vastzit":store.mode;
    setStand(STANDEN.some(s=>s.k===m)?m:"hulp",false);
  }
};
})();
