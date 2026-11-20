/* ===== Oefentoets DNA: gedeelde hulpjes (havo = 5havo_dna_oefentoets, vwo = 6vwo_dna_oefentoets, één bron) ===== */
const VWO=/*@@VWO@@*/false;
let QN=0,ON=0;
/* vraag(punten, onderwerp, build(q,id), stof?) -> id; stof = {titel, html, anim?, films?} voor 'Uitleg van de stof' */
function vraag(pts,t,build,stof){const id=++QN;Q.push({id,pts,t,build:q=>build(q,id)});
  if(stof&&window.EXSTOF)EXSTOF.zet(TOOL,[id],stof);return id;}
/* opgave zonder inleiding (losse kennisvragen, zoals in de Word-toets): html leeg */
function opgave(kort,titel,html,ids){const nr=++ON;
  OPG.push({nr,kort,titel,ids,ctx:html?`<div class="pkop"><span class="mono">Toetstekst · inleiding opgave ${nr}</span></div>`+html
    :`<div class="pkop"><span class="mono">Toetstekst · opgave ${nr}</span></div><p class="muted" style="margin:0">Losse vragen over dit onderwerp, zonder inleiding.</p>`});}
/* films van het thema (hrefs als in HOOFDSTUKKEN.dna.films) */
const F={
  wat:["Wat is DNA?","films/dna/1-wat-is-dna.html"],
  kop:["DNA kopiëren","films/dna/2-dna-kopieren.html"],
  eiw:["Van DNA naar eiwit","films/dna/3-van-dna-naar-eiwit.html"],
  code:["De genetische code lezen","films/dna/4-de-genetische-code-lezen.html"],
  mut:["Mutaties","films/dna/5-mutaties.html"],
  aan:["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"],
  lees:["DNA lezen","films/dna/7-dna-lezen.html"],
  heb:["Wat heb jij aan DNA?","films/dna/8-wat-heb-jij-aan-dna.html"],
  pcr:["Op maat gekopieerd · PCR","films/dna-technieken/1-op-maat-gekopieerd/index.html"],
  gel:["Op lengte gesorteerd · gelelektroforese","films/dna-technieken/2-op-lengte-gesorteerd/index.html"]};
function start(q,html,na){q.append(el("p",{class:"qtext"},html));if(na)q.append(el("div",{},na));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  return {think,ans,unlock};}
/* vraag met een opsomming of keuzes in de vraagtekst: html = hele vraagtekst */
function startLos(q,html,na){q.append(el("p",{class:"qtext"},html));if(na)q.append(el("div",{},na));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  return {think,ans,unlock};}
/* koppelvraag met elke letter één keer (4 rijen, 2 punten): alles goed 2; drie goed 1 (dan is een letter dubbel gebruikt);
   twee letters verwisseld en de rest goed 1 (correctievoorschrift); anders 0. Leest de keuzelijsten van selectAnswer (uid+"a"+k). */
const KOPPELSCORE=uid=>n=>{if(n===4)return 2;if(n===3)return 1;
  const v=[0,1,2,3].map(k=>{const e=document.getElementById(uid+"a"+k);return e?e.value:"";});return n===2&&new Set(v).size===4?1:0;};
const B=t=>`<b>${t}</b>`;
const SEQ=t=>`<span class="seqtxt">${t}</span>`;
const L4=(...r)=>r.map((t,i)=>`${"ABCDEF"[i]}&nbsp; ${t}`).join("<br>");

/* Codontabel (de standaardcode; in de Word-toets: BiNaS 71G). Uitklapbaar in het papiervak. */
const BASEN="UCAG",AZ={F:"fenylalanine",L:"leucine",I:"isoleucine",M:"methionine (start)",V:"valine",S:"serine",P:"proline",T:"threonine",A:"alanine",
  Y:"tyrosine","*":"stop",H:"histidine",Q:"glutamine",N:"asparagine",K:"lysine",D:"asparaginezuur",E:"glutaminezuur",C:"cysteïne",W:"tryptofaan",R:"arginine",G:"glycine"};
const CODE="FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG";
const vertaal=c=>CODE[BASEN.indexOf(c[0])*16+BASEN.indexOf(c[1])*4+BASEN.indexOf(c[2])];
function CODONTABEL(open){
  let h=`<tr><th>1e base</th>${[...BASEN].map(b=>`<th>2e base ${b}</th>`).join("")}</tr>`;
  for(const a of BASEN){h+=`<tr><th>${a}</th>`;for(const b of BASEN){h+="<td>"+[...BASEN].map(c=>{const k=vertaal(a+b+c);
      return `<span class="seqtxt">${a+b+c}</span> ${AZ[k].replace(" (start)","")}`;}).join("<br>")+"</td>";}h+="</tr>";}
  return `<details class="ctxd codon"${open?" open":""}><summary>Codontabel (mRNA)</summary><div class="tablewrap"><table class="data codontab">${h}</table></div>
  <p class="muted" style="font-size:13px;margin:4px 0 0">AUG = startcodon (methionine). UAA, UAG en UGA = stopcodon. In de toets op papier: BiNaS 71G.</p></details>`;}

/* Gel van opgave 'Echte kaviaar?' (afbeelding 1): zelfde banen en lengtes als eigen/figuren/dna/maak2.py in toetsen-biologie
   (fictieve gegevens; Siberische steur 154 bp, Russische steur 186 bp). hl = {baan: kleur}, mlijn = markerlengtes met hulplijn. */
const GELBANEN=[["M",[100,125,150,175,200,225,250]],["blik 1",[186]],["blik 2",[154]],["blik 3",[154,186]],["blik 4",[]],["neg.|controle",[]],["pos.|controle",[154]]];
function GEL({hl={},mlijn=[],extra=null}={}){
  const yb=bp=>40+330*(Math.log(260)-Math.log(bp))/(Math.log(260)-Math.log(90));
  const X0=80,W=78;let s="";
  s+=`<rect x="${X0-10}" y="8" width="${GELBANEN.length*W+12}" height="372" fill="var(--surface2)" stroke="var(--text2)" stroke-width="1.4"/>`;
  GELBANEN.forEach(([n,bands],i)=>{const x=X0+i*W;
    if(hl[i])s+=`<rect x="${x-4}" y="12" width="${W-8+8-6}" height="364" fill="${hl[i]}" opacity=".18"/>`;
    s+=`<rect x="${x+6}" y="16" width="${W-24}" height="10" fill="none" stroke="var(--text2)"/>`;
    n.split("|").forEach((r,k)=>s+=`<text x="${x+W/2-6}" y="${400+k*15}" text-anchor="middle" class="lblm">${r}</text>`);
    bands.forEach(bp=>s+=`<rect x="${x+8}" y="${yb(bp)-3}" width="${W-28}" height="${i===0?4:6}" fill="var(--text)"/>`);});
  GELBANEN[0][1].forEach(bp=>s+=`<text x="${X0-16}" y="${yb(bp)+4}" text-anchor="end" class="lblm">${bp} bp</text>`);
  mlijn.forEach(bp=>s+=`<path d="M${X0+8},${yb(bp)} H${X0+GELBANEN.length*W-12}" stroke="var(--goud)" stroke-width="1.4" stroke-dasharray="5 4"/>`);
  const xr=X0+GELBANEN.length*W+14;
  s+=`<path d="M${xr},40 V350" stroke="var(--text2)" stroke-width="1.4"/><path d="M${xr-5},342 L${xr},352 L${xr+5},342" fill="none" stroke="var(--text2)" stroke-width="1.4"/><text x="${xr+8}" y="30" class="lbl">−</text><text x="${xr+8}" y="374" class="lbl">+</text>`;
  if(extra)s+=extra(yb,X0,W);
  return `<div class="vpfig" style="max-width:660px;margin:0 auto;width:100%;--min:600px">`+svgWrap(`0 0 ${xr+30} 432`,s,"Gel met een marker, vier blikken kaviaar, een negatieve en een positieve controle")+`</div>`;}
