#!/usr/bin/env python3
"""Hulpvragen (choiceStep) in de oefentoetsen: knoppen in een vaste, geschudde volgorde, zodat het goede antwoord
niet steeds de eerste knop is (20 nov 2026, gevonden door de controleur van gaswisseling: 27 van 32 keer eerst).
De volgorde hangt af van de vraagtekst (zelfde volgorde bij elk bezoek). Alleen hulpvragen: de toetsvragen (mc) houden
hun letters A–D. Idempotent. Gebruik: python3 tools/toets-bron/schud_hulp.py tools/toets-*.html
(wordt aan het eind van elke tools/toets-bron/<thema>/bouw.py aangeroepen)."""
import sys
OUD = '''  opts.forEach((o,i)=>{const b=el("button",{class:"opt",onclick:()=>{
    if(i===right){row.querySelectorAll("button").forEach(x=>x.disabled=true);b.classList.add("right");fb.className="fb ok";fb.innerHTML=ok;fb.hidden=false;onDone&&onDone();}
    else{b.classList.add("wrong");fb.className="fb no";fb.innerHTML=no;fb.hidden=false;}
  }},o);row.append(b);});'''
NIEUW = '''  const knop=[];opts.forEach((o,i)=>{const b=el("button",{class:"opt",onclick:()=>{
    if(i===right){row.querySelectorAll("button").forEach(x=>x.disabled=true);b.classList.add("right");fb.className="fb ok";fb.innerHTML=ok;fb.hidden=false;onDone&&onDone();}
    else{b.classList.add("wrong");fb.className="fb no";fb.innerHTML=no;fb.hidden=false;}
  }},o);knop.push(b);});
  /* @@schud@@ vaste, geschudde volgorde (zaadje = vraagtekst), zodat het goede antwoord niet steeds eerst staat */
  {let h=2166136261;for(const c of String(q))h=Math.imul(h^c.charCodeAt(0),16777619)>>>0;
   const v=knop.map((b,i)=>i);for(let i=v.length-1;i>0;i--){h=Math.imul(h^(h>>>15),2246822507)>>>0;const j=h%(i+1);[v[i],v[j]]=[v[j],v[i]];}
   if(v.length>1&&v[0]===right&&opts.length>2){const k=v.indexOf(right);[v[0],v[1]]=[v[1],v[0]];}
   v.forEach(i=>row.append(knop[i]));}'''
for p in sys.argv[1:]:
    s = open(p).read()
    if '@@schud@@' in s: print(p, 'al geschud'); continue
    if s.count(OUD) != 1: print(p, 'NIET GEVONDEN'); continue
    open(p, 'w').write(s.replace(OUD, NIEUW)); print(p, 'geschud')
