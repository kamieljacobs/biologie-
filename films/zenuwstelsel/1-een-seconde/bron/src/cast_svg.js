/* cast_svg.js — castpersonages in de SVG-films van de reeks Zenuwstelsel (opwaardering prompt v13, 28 okt 2026).
   lib_cast.js tekent op canvas; deze film is SVG. castLaag() tekent personages één keer op een doorzichtig canvas van
   1920×1080 en zet dat als <image> in de SVG. Hulpjes die lib_cast.js verwacht (uit lib.js van de hoofdengine): */
function circ(ctx,x,y,r,fill,stroke,lw=1.5){ ctx.beginPath(); ctx.arc(x,y,r,0,6.283); if(fill){ctx.fillStyle=fill;ctx.fill();} if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=lw;ctx.stroke();} }
function rgba(hex,a){ const n=parseInt(hex.slice(1),16); return `rgba(${n>>16},${(n>>8)&255},${n&255},${a})`; }
function shape(ctx, fill, stroke, lw=1.5){ ctx.fillStyle=fill; ctx.fill(); if(stroke){ ctx.strokeStyle=stroke; ctx.lineWidth=lw; ctx.stroke(); } }
function roundRect(ctx,x,y,w,h,r){ ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath(); }
function castLaag(img, teken){ // img = <image>-element (1920×1080); teken(ctx) tekent de personages in stage-coördinaten
  const c=document.createElement('canvas'); c.width=1920; c.height=1080; const ctx=c.getContext('2d'); ctx.lineCap='round'; ctx.lineJoin='round';
  teken(ctx); const u=c.toDataURL('image/png'); img.setAttribute('href',u); img.setAttributeNS('http://www.w3.org/1999/xlink','href',u); }
// castBeeld(img, sleutel, [x, y, w, h], teken): tekent op een canvas van het vak (stage-coördinaten) en zet het als href;
// gecachet op sleutel, zodat een frame dat niet verandert niets kost.
const _CASTCACHE = {};
function castBeeld(img, sleutel, vak, teken){
  if(!img) return; if(img.dataset.sleutel===sleutel) return;
  let u=_CASTCACHE[sleutel];
  if(!u){ const [x,y,w,h]=vak, c=document.createElement('canvas'); c.width=w; c.height=h; const ctx=c.getContext('2d'); ctx.lineCap='round'; ctx.lineJoin='round'; ctx.translate(-x,-y); teken(ctx); u=c.toDataURL('image/png'); _CASTCACHE[sleutel]=u; }
  img.setAttribute('x',vak[0]); img.setAttribute('y',vak[1]); img.setAttribute('width',vak[2]); img.setAttribute('height',vak[3]);
  img.setAttribute('href',u); img.setAttributeNS('http://www.w3.org/1999/xlink','href',u); img.dataset.sleutel=sleutel; }
// De fietser (Daan, zijaanzicht, zittend op het zadel, handen aan het stuur) op de fiets van de wereldscène (groep op translate(120,620)).
// trek 0..1 = hand schiet van het stuur (terugtrekreflex). Fiets: zadel (200,110), stuur (350,100), trapas (250,250) in groepcoördinaten.
const FIETSER = { id: 'daan', h: 440, fx: 120 + 205, fy: 620 + 275, zitHoogte: 160, tafel: 620 + 112, reik: 1.6, leun: 32 };
let _fietsArm = null;
function fietserTeken(ctx, trek){ const F=FIETSER, o={zij:true,kijk:1,pose:'zit',zitHoogte:F.zitHoogte,tafel:F.tafel,reik:F.reik,leun:F.leun,uit:trek>0.05?'verbaasd':'neutraal'};
  if(trek>0){ if(!_fietsArm){ const c=document.createElement('canvas').getContext('2d'); const r=persoon(c,F.id,F.fx,F.fy,F.h,o).handR; const L=F.leun*Math.PI/180, a=Math.atan2(r.elx-r.shx,r.ely-r.shy), b=Math.atan2(r.x-r.elx,r.y-r.ely); _fietsArm=[a-L,b-a]; }
    const [u,e]=_fietsArm, k=trek*trek*(3-2*trek); o.arm=[u+(-0.2-u)*k, e+(2.4-e)*k]; }
  persoon(ctx,F.id,F.fx,F.fy,F.h,o); }
function fietser(img, trek=0){ const q=Math.round(Math.max(0,Math.min(1,trek))*12)/12; castBeeld(img,'fiets'+q,[100,380,620,560],ctx=>fietserTeken(ctx,q)); }
// Het kind op de stoep (Teun, ± 6 jaar), zijaanzicht, kijkt/loopt naar links de straat op. fase = loopfase (0..1 per pas-cyclus), stil = staan.
function kindBeeld(img, fase, stil){ const q=stil?'s':String(Math.round(((fase%1)+1)%1*24)/24); castBeeld(img,'kind'+q,[1220,560,240,240],ctx=>persoon(ctx,'kind',1330,782,190,stil?{zij:true,kijk:-1,uit:'blij'}:{zij:true,kijk:-1,gang:'loop',t:0,fase:Number(q),uit:'blij'})); }
