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
