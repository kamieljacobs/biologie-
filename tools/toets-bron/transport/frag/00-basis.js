/* ===== Oefentoets Transport: gedeelde hulpjes (havo en vwo uit één bron) ===== */
const VWO=/*@@VWO@@*/false;
let QN=0,ON=0;
/* vraag(punten, onderwerp, build(q,id), stof?) -> id; stof = {titel, html, anim?, films?} voor 'Uitleg van de stof' */
function vraag(pts,t,build,stof){const id=++QN;Q.push({id,pts,t,build:q=>build(q,id)});
  if(stof&&window.EXSTOF)EXSTOF.zet(TOOL,[id],stof);return id;}
function opgave(kort,titel,html,ids){const nr=++ON;
  OPG.push({nr,kort,titel,ids,ctx:`<div class="pkop"><span class="mono">Toetstekst · ${html?"inleiding opgave "+nr:"opgave "+nr}</span></div>`+(html||`<p class="muted" style="margin:0">Bij deze opgave hoort geen inleiding.</p>`)});}
/* films van het thema (hrefs als in HOOFDSTUKKEN.transport.films) */
const F={
  pomp:["Eén pomp, twee rondjes","films/transport/1-een-pomp-twee-rondjes.html"],
  druk:["Buizen onder druk","films/transport/2-buizen-onder-druk.html"],
  bloed:["Wat er in je bloed zit","films/transport/3-wat-er-in-je-bloed-zit.html"],
  lymfe:["Weefselvloeistof en lymfe","films/transport/4-weefselvloeistof-en-lymfe.html"],
  regel:["Het hart onder controle","films/transport/5-het-hart-onder-controle.html"]};
/* begin van een vraag: vraagzin, hulp- en antwoordvak */
function start(q,html){q.append(el("p",{class:"qtext"},html));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  return {think,ans,unlock};}
/* uitspraken onder elkaar, zoals in de Word-toets */
const UITSPRAKEN=(n,lijst,slot)=>`<p>Hieronder staan ${n} uitspraken.</p><p class="qtext" style="margin:0">${lijst.map((u,k)=>`${k+1} ${u}`).join("<br>")}<br><br><b>${slot||"Geef bij elke uitspraak aan of hij juist of onjuist is."}</b></p>`;
const B=t=>`<b>${t}</b>`;

/* Rekenvraag: goed antwoord (binnen marge) = alle punten; anders zelf afvinken wat wel goed was (deelpunten uit het
   correctievoorschrift, samen hooguit punten − 1). */
function rekenAnswer(ans,{id,pts,right,marge=0,ook=[],eenheid="",label="uitkomst",deel=[],model,after}){
  const r=el("div",{class:"row"});const fid="q"+id+"f0";
  r.append(el("label",{for:fid,class:"sellab"},label));const inp=el("input",{class:"num",id:fid,inputmode:"decimal"});r.append(inp,el("span",{class:"muted"},eenheid));ans.append(r);
  const ck=el("button",{class:"go"},"Nakijken"),fb=el("div",{class:"fb",hidden:""});ans.append(ck,fb);
  ck.onclick=()=>{const v=parseFloat((inp.value||"").replace(/\s/g,"").replace(",","."));
    if(isNaN(v)){fb.hidden=false;fb.className="fb hint";fb.textContent="Vul eerst je uitkomst in (alleen het getal).";return;}
    inp.disabled=true;ck.remove();fb.hidden=false;
    if([right,...ook.map(o=>o[0])].some((w,k)=>Math.abs(v-w)<=(k?ook[k-1][1]:marge)+1e-9)){fb.className="fb ok";fb.innerHTML=`Goed: <b>${pts} punten</b>.`;setScore(id,pts);}
    else{fb.className="fb no";fb.innerHTML=`Jouw uitkomst klopt niet. Het goede antwoord is <b>${String(right).replace(".",",")} ${eenheid}</b>.`;
      const ss=el("div",{class:"selfscore"});ss.append(el("p",{style:"margin:0"},"<b>Deelpunten?</b> Vink aan wat er wel goed was in je berekening."));
      const boxes=deel.map((c,k)=>{const lab=el("label",{},`<input type="checkbox" id="q${id}d${k}"><span>${c} <span class="pts">1p</span></span>`);ss.append(lab);return lab.querySelector("input");});
      const sc=el("div",{class:"score"});ss.append(sc);ans.append(ss);
      const upd=()=>{const p=Math.min(pts-1,boxes.filter(b=>b.checked).length);sc.textContent=`Jouw score: ${p} / ${pts}`;setScore(id,p);};
      boxes.forEach(b=>b.onchange=upd);upd();}
    if(model)ans.append(el("div",{class:"model"},"<b>Uitwerking:</b> "+model));
    after&&after();};
}
/* Tabel invullen met keuzelijsten: rijen = [naam, [[opties, goed], [opties, goed]]]; alles goed 2p, één fout 1p. */
function tabelAnswer(ans,{id,kop,rijen,after}){
  const t=el("table",{class:"data"});t.innerHTML=`<tr>${kop.map(k=>`<th>${k}</th>`).join("")}</tr>`;const sels=[];
  rijen.forEach(([naam,cellen],r)=>{const tr=el("tr");tr.append(el("td",{},naam));
    cellen.forEach(([opts,goed],c)=>{const td=el("td");const s=el("select",{id:`q${id}t${r}${c}`,"aria-label":`${naam}: ${kop[c+1]}`});
      s.append(el("option",{value:""},"kies…"));opts.forEach((o,j)=>s.append(el("option",{value:j},o)));td.append(s);tr.append(td);sels.push([s,goed,opts]);});t.append(tr);});
  const w=el("div",{class:"tablewrap"});w.append(t);ans.append(w);
  const ck=el("button",{class:"go"},"Nakijken"),fb=el("div",{class:"fb",hidden:""});ans.append(ck,fb);
  ck.onclick=()=>{if(sels.some(([s])=>s.value==="")){fb.hidden=false;fb.className="fb hint";fb.textContent="Vul eerst alle vakjes in.";return;}
    const fout=sels.filter(([s,g])=>+s.value!==g).length;const p=fout===0?2:fout===1?1:0;sels.forEach(([s,g])=>{s.disabled=true;s.style.outline=`2px solid var(${+s.value===g?"--groen":"--koraal"})`;});ck.remove();
    fb.hidden=false;fb.className="fb "+(p===2?"ok":"no");
    fb.innerHTML=`${sels.length-fout} van de ${sels.length} vakjes goed: <b>${p} ${p===1?"punt":"punten"}</b>.<br>`+rijen.map(([n,c])=>`${n}: ${c.map(([o,g])=>o[g]).join(", ")}`).join(" · ");
    setScore(id,p);after&&after();};
}
/* Koppelvraag: begrippen 1–5 aan omschrijvingen A–F; alles goed 2p, één fout 1p. */
function koppelAnswer(ans,{id,uid,begrippen,omschr,key,after}){
  ans.append(el("p",{style:"margin:0"},omschr.map((o,k)=>`<b>${"ABCDEF"[k]}</b> ${o}`).join("<br>")));
  selectAnswer(ans,{id,uid,rows:begrippen.map((b,k)=>[`${k+1} ${b}`,omschr.map((o,j)=>"ABCDEF"[j]),key[k]]),
    score:n=>n===begrippen.length?2:n===begrippen.length-1?1:0,after});
}

/* ---------- figuren (eigen tekeningen, kleuren uit de huisstijl) ---------- */
const PIJLKOP=(x,y,dir,kl)=>{const d={r:[-9,-5,-9,5],l:[9,-5,9,5],u:[-5,9,5,9],d:[-5,-9,5,-9]}[dir];
  return `<path d="M${x},${y} L${x+d[0]},${y+d[1]} L${x+d[2]},${y+d[3]} Z" fill="${kl}"/>`;};
/* Bloedsomloop als schema. opties: hl = vaten/delen die oplichten, kleur = zuurstofrijk/-arm kleuren, stip = [x,y] */
const CIRC_VAT={
  longslagader:{d:"M230,250 H170 V50 H200",eind:[200,50,"r"],rijk:0,lab:[164,135,"end","longslagader"]},
  longader:{d:"M440,50 H480 V178 H410",eind:[410,178,"l"],rijk:1,lab:[486,120,"start","longader"]},
  aorta:{d:"M410,250 H520 V390 H440",eind:[440,390,"l"],rijk:1,lab:[526,320,"start","aorta"]},
  holle:{d:"M200,390 H120 V178 H230",eind:[230,178,"r"],rijk:0,lab:[114,300,"end","holle aders"]}};
function CIRC({hl=[],kleur=false,stip=null}={}){
  const dim=k=>hl.length&&!hl.includes(k)?.28:1;
  const kl=k=>kleur?(CIRC_VAT[k].rijk?"var(--koraal)":"var(--teal)"):"var(--text2)";
  let s="";
  const vak=(k,x,y,w,h,t1,t2)=>{s+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${hl.includes(k)?"var(--goud-soft)":"none"}" stroke="var(--text2)" stroke-width="1.4" opacity="${dim(k)}"/>`+
    `<text x="${x+w/2}" y="${y+h/2+(t2?-3:4)}" text-anchor="middle" class="lbl" opacity="${dim(k)}">${t1}</text>`+(t2?`<text x="${x+w/2}" y="${y+h/2+13}" text-anchor="middle" class="lblm" opacity="${dim(k)}">${t2}</text>`:"");};
  vak("longen",200,22,240,56,"longen","haarvaten");
  vak("lichaam",200,362,240,56,"hoofd, romp, armen en benen","haarvaten");
  vak("RB",230,150,85,55,"rechter-","boezem");vak("RK",230,210,85,80,"rechter-","kamer");
  vak("LB",325,150,85,55,"linker-","boezem");vak("LK",325,210,85,80,"linker-","kamer");
  for(const k in CIRC_VAT){const v=CIRC_VAT[k];const c=kl(k);
    s+=`<path d="${v.d}" fill="none" stroke="${c}" stroke-width="${hl.includes(k)?5:3}" opacity="${dim(k)}" stroke-linejoin="round"/>`+`<g opacity="${dim(k)}">${PIJLKOP(v.eind[0],v.eind[1],v.eind[2],c)}</g>`+
      `<text x="${v.lab[0]}" y="${v.lab[1]}" text-anchor="${v.lab[2]}" class="lbl" opacity="${dim(k)}">${v.lab[3]}</text>`;}
  s+=`<text x="320" y="320" text-anchor="middle" class="lblm">hart (vooraanzicht: rechts in het lichaam = links in de tekening)</text>`;
  if(kleur)s+=`<path d="M40,440 h30" stroke="var(--koraal)" stroke-width="4"/><text x="78" y="444" class="lblm">zuurstofrijk</text><path d="M190,440 h30" stroke="var(--teal)" stroke-width="4"/><text x="228" y="444" class="lblm">zuurstofarm</text>`;
  if(stip)s+=`<circle cx="${stip[0]}" cy="${stip[1]}" r="9" fill="var(--goud)" stroke="var(--text)" stroke-width="1.5"/>`;
  return `<div class="trfig" style="max-width:600px;margin:0 auto;width:100%;--min:420px">`+svgWrap("0 0 640 456",s,"Schema van de bloedsomloop met hart, longen en lichaam")+`</div>`;}

/* Drukverloop in de grote bloedsomloop (vereenvoudigd). hl = index van het deel dat oplicht. */
const DRUK_DEEL=["aorta","grote slagaders","kleine slagaders","haarvaten","aders","holle aders"];
function DRUK({hl=-1}={}){
  const X0=70,X1=620,W=(X1-X0)/6,yP=p=>250-p*1.6;
  let s="";
  DRUK_DEEL.forEach((n,i)=>{const x=X0+i*W;if(i===hl)s+=`<rect x="${x}" y="40" width="${W}" height="212" fill="var(--goud-soft)"/>`;
    s+=`<path d="M${x},40 V252" stroke="var(--line)"/><text x="${x+W/2}" y="270" text-anchor="middle" class="lblm">${n}</text>`;});
  s+=`<path d="M${X0},36 V252 H${X1}" fill="none" stroke="var(--text2)" stroke-width="1.4"/>`;
  [0,40,80,120].forEach(v=>s+=`<text x="${X0-8}" y="${yP(v)+4}" text-anchor="end" class="lblm">${v}</text>`);
  s+=`<text x="16" y="146" class="lblm" text-anchor="middle" transform="rotate(-90 16 146)">bloeddruk (mm kwik)</text>`;
  /* midden en uitslag per x: hoog en golvend in de slagaders, daarna dalend en vlak */
  const N=330;let d="";for(let k=0;k<=N;k++){const f=k/N,x=X0+f*(X1-X0);let mid,amp;
    if(f<2/6){mid=98-f*6;amp=20;}else if(f<3/6){const g=(f-2/6)*6;mid=96-g*61;amp=20*(1-g)+1;}else if(f<4/6){const g=(f-3/6)*6;mid=35-g*20;amp=0;}else{const g=(f-4/6)*3;mid=15-g*12;amp=0;}
    const p=mid+amp*Math.sin(f*2*Math.PI*14);d+=(k?"L":"M")+x.toFixed(1)+","+yP(p).toFixed(1)+" ";}
  s+=`<path d="${d}" fill="none" stroke="var(--koraal)" stroke-width="2.4" stroke-linejoin="round"/>`;
  s+=`<text x="${X1}" y="30" text-anchor="end" class="lblm">vereenvoudigd; de golfjes zijn de hartslagen</text>`;
  return `<div class="trfig" style="max-width:640px;margin:0 auto;width:100%;--min:460px">`+svgWrap("0 0 640 284",s,"Bloeddruk in de grote bloedsomloop, van aorta tot holle aders")+`</div>`;}

/* Afbeelding 1 van de wielrenner: hartfrequentie bij toenemend vermogen (fictieve gegevens, zoals
   eigen/figuren/transport/maak.py in kamieljacobs/toetsen-biologie). hl = vermogen (W) dat oplicht. */
const FIETS_ONG=[[0,70],[50,100],[100,125],[150,150],[200,175],[250,195]];
const FIETS_GET=[[0,42],[50,65],[100,85],[150,105],[200,125],[250,145],[300,162],[350,176],[400,186]];
function FIETS({hl=null}={}){
  const X0=80,X1=620,xs=w=>X0+(w+10)*(X1-X0)/430,ys=h=>300-h*1.3;
  let s="";
  if(hl!==null)s+=`<rect x="${xs(hl)-10}" y="24" width="20" height="276" fill="var(--goud-soft)"/>`;
  [0,50,100,150,200,250,300,350,400].forEach(w=>s+=`<path d="M${xs(w)},27 V300" stroke="var(--line)"/><text x="${xs(w)}" y="318" text-anchor="middle" class="lblm">${w}</text>`);
  [0,40,80,120,160,200].forEach(h=>s+=`<path d="M${X0},${ys(h)} H${X1}" stroke="var(--line)"/><text x="${X0-10}" y="${ys(h)+4}" text-anchor="end" class="lblm">${h}</text>`);
  s+=`<path d="M${X0},24 V300 H${X1}" fill="none" stroke="var(--text2)" stroke-width="1.4"/>`;
  const lijn=(a,da,c)=>`<path d="${a.map(([w,h],i)=>(i?"L":"M")+xs(w)+","+ys(h)).join(" ")}" fill="none" stroke="${c}" stroke-width="2.4" stroke-dasharray="${da}"/>`;
  s+=lijn(FIETS_ONG,"8 5","var(--text2)")+FIETS_ONG.map(([w,h])=>`<circle cx="${xs(w)}" cy="${ys(h)}" r="5" fill="var(--surface)" stroke="var(--text2)" stroke-width="2"/>`).join("");
  s+=lijn(FIETS_GET,"","var(--text)")+FIETS_GET.map(([w,h])=>`<rect x="${xs(w)-5}" y="${ys(h)-5}" width="10" height="10" fill="var(--text)"/>`).join("");
  s+=`<path d="M380,250 h34" stroke="var(--text2)" stroke-width="2.4" stroke-dasharray="8 5"/><circle cx="397" cy="250" r="5" fill="var(--surface)" stroke="var(--text2)" stroke-width="2"/><text x="422" y="254" class="lbl">ongetrainde leeftijdsgenoot</text>`;
  s+=`<path d="M380,274 h34" stroke="var(--text)" stroke-width="2.4"/><rect x="392" y="269" width="10" height="10" fill="var(--text)"/><text x="422" y="278" class="lbl">getrainde wielrenner</text>`;
  s+=`<text x="${(X0+X1)/2}" y="340" text-anchor="middle" class="lblm">vermogen op de fiets (W)</text>`;
  s+=`<text x="20" y="160" class="lblm" text-anchor="middle" transform="rotate(-90 20 160)">hartfrequentie (slagen per minuut)</text>`;
  return `<div class="trfig" style="max-width:640px;margin:0 auto;width:100%;--min:440px">`+svgWrap("0 0 640 350",s,"Hartfrequentie van de wielrenner en zijn ongetrainde leeftijdsgenoot bij toenemend vermogen")+`</div>`;}
