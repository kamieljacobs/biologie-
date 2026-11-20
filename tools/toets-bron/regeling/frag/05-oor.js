/* ===== Opgave 8 Een piep na het festival (EI-regeling-E01, E02, E03, havo E04 / vwo E05) en vwo opgave 9 Bot en spieren (KK02) ===== */
{
const STOF_OOR={titel:"Van geluid naar impuls",html:`
<p>Geluid is een trilling van de lucht. De oorschelp vangt die op en de gehoorgang leidt hem naar binnen. In het middenoor en het binnenoor wordt de trilling doorgegeven tot hij bij de <b>zintuigcellen</b> van het gehoor aankomt.</p>
<p>Een zintuigcel zet een prikkel om in impulsen. Hoe sterker de prikkel, hoe meer impulsen per seconde; is de prikkel te zwak, dan ontstaat er geen impuls.</p>
<p>In een <b>audiogram</b> staat per toonhoogte de zachtste toon die iemand nog hoort: de gehoordrempel. Hoe lager een punt in de grafiek, hoe harder een toon moet zijn om hem te horen.</p>`,
films:[F.zin]};
/* keten in het oor; k = laatste onderdeel dat oplicht */
function OOR_KETEN(k){
  const m="mk"+(++MK);let s=pijlDef(m,"var(--text2)");
  const N=[["trommelvlies","trilt mee"],["gehoorbeentjes","geven door"],["slakkenhuis","vloeistof trilt"],["haarcellen","haartjes buigen"],["gehoorzenuw","impulsen"]];
  N.forEach(([t,o],i)=>{const x=62+i*118,on=i<=k,nu=i===k;
    s+=`<rect x="${x-54}" y="40" width="108" height="46" rx="10" fill="${nu?"var(--goud-soft)":"var(--surface)"}" stroke="${nu?"var(--goud)":on?"var(--text2)":"var(--line2)"}" stroke-width="${nu?2.4:1.3}" opacity="${on?1:.45}"/><text x="${x}" y="68" text-anchor="middle" class="lbl" opacity="${on?1:.45}" style="font-size:12.5px">${t}</text>`;
    if(on)s+=`<text x="${x}" y="108" text-anchor="middle" class="lblm">${o}</text>`;
    if(i<4)s+=`<path d="M${x+56},63 H${x+62}" stroke="var(--text2)" stroke-width="2" marker-end="url(#${m})" opacity="${i<k?1:.35}"/>`;});
  return FIG(480,600,"0 0 600 120",s,"Van trilling naar impuls in het oor");}

const e1=vraag(2,"van trilling naar impuls",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Beschrijf hoe een geluidstrilling in het oor leidt tot impulsen in de gehoorzenuw. Noem het trommelvlies, de gehoorbeentjes en de haarcellen."));
  choiceStep(think,{q:"Wat is geluid?",opts:["een trilling van de lucht","een stroom deeltjes die het oor in vliegt","licht dat je niet kunt zien"],right:0,
    ok:"Ja. Die trilling moet van buiten tot diep in je oor komen.",no:"Denk aan een speaker: wat doet de lucht ervoor?",
    onDone:()=>choiceStep(think,{q:"Welk onderdeel uit de vraag is de zintuigcel, die van een trilling een impuls maakt?",opts:["de haarcellen","het trommelvlies","de gehoorbeentjes"],right:0,
      ok:"Goed. Zet nu de drie onderdelen in de goede volgorde en zeg bij elk wat het doet.",no:"Een zintuigcel is een cel. Welk van de drie is een cel?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Het <b>trommelvlies</b> trilt mee en de <b>gehoorbeentjes</b> (hamer, aambeeld, stijgbeugel) geven de trilling door naar het slakkenhuis.",
    "In het slakkenhuis buigen de haartjes van de <b>haarcellen</b> mee met de trilling, en dan ontstaan er impulsen."],
    model:"Het trommelvlies gaat meetrillen met het geluid. De gehoorbeentjes in het middenoor (hamer, aambeeld en stijgbeugel) geven de trilling door naar het slakkenhuis. Daar gaat de vloeistof trillen en buigen de haartjes van de haarcellen mee. Dan ontstaan er impulsen in de gehoorzenuw.",
    valkuil:"Het trommelvlies maakt zelf geen impulsen: alleen de haarcellen zijn zintuigcellen.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[0,1,2,3,4].map(k=>({k,cap:["Het trommelvlies trilt mee met de lucht.","De gehoorbeentjes geven de trilling door naar het slakkenhuis.","In het slakkenhuis gaat de vloeistof trillen.","De haartjes van de haarcellen buigen mee.","Dan ontstaan er impulsen in de gehoorzenuw, naar de hersenen."][k]})),
      (stg,s)=>{stg.innerHTML=OOR_KETEN(s.k);inBeeld(stg,(62+s.k*118)/600);}))});
  q.append(think,ans);
},STOF_OOR);

const e2=vraag(2,"het audiogram van Tim",(q,id)=>{
  const {think,ans,unlock}=start(q,"Beantwoord de volgende vragen.<ul style='margin:6px 0 0;padding-left:20px'><li>"+B("Bij welke toonhoogte is het gehoor van Tim het meest achteruitgegaan? Gebruik afbeelding 4.")+"</li><li>"+B("Leg uit waardoor Tim bij deze toonhoogte slechter hoort. Gebruik het begrip haarcellen.")+"</li></ul>");
  choiceStep(think,{q:"Wat betekent het als een punt in een audiogram lager ligt?",opts:["de toon moet harder zijn om hem te horen: je hoort slechter","de toon is lager","je hoort beter"],right:0,
    ok:"Ja. Zoek nu de toonhoogte waar Tim het verst onder zijn leeftijdgenoot zit.",no:"Lees het bijschrift bij de verticale as.",
    onDone:()=>choiceStep(think,{q:"Wat doen haarcellen?",opts:["ze zetten een trilling om in impulsen","ze geven de trilling door aan het slakkenhuis"],right:0,
      ok:"Goed. Wat zou er met de haarcellen van Tim gebeurd zijn, en kan dat herstellen?",no:"Doorgeven doen de gehoorbeentjes.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Bij ongeveer <b>4000 Hz</b> (hoge tonen); zijn gehoordrempel is daar ongeveer 35 dB hoger dan bij zijn leeftijdgenoot.",
    "Door het harde geluid zijn <b>haarcellen</b> (die hoge tonen opvangen) beschadigd of doodgegaan; die groeien niet terug, dus een toon moet harder zijn om nog een impuls te geven."],
    model:"Bij ongeveer 4000 Hz: daar ligt zijn gehoordrempel op 40 dB, tegen 5 dB bij zijn leeftijdgenoot. Door het harde geluid op festivals zijn haarcellen die deze hoge tonen opvangen beschadigd of doodgegaan. Dode haarcellen groeien niet terug, dus een toon moet veel harder zijn voordat er nog genoeg haarcellen een impuls geven.",
    valkuil:"‘Zijn trommelvlies is kapot’ of ‘zijn oren zijn gewend aan hard geluid’: 0 punten voor het tweede deel.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Tot 2000 Hz liggen Tim en zijn leeftijdgenoot dicht bij elkaar.",hl:null},
      {cap:"Bij 4000 Hz is het verschil het grootst: 40 − 5 = 35 dB. Daar heeft Tim de meeste haarcellen verloren.",hl:4000}],
      (stg,s)=>{stg.innerHTML=GRAF_AUDIO({hl:s.hl,verschil:!!s.hl});inBeeld(stg,s.hl?AUDX(s.hl)+0.03:null);}))});
  q.append(think,ans);
},STOF_OOR);

const e3=vraag(2,"weer weg, en toch blijvend",(q,id)=>{
  const {think,ans,unlock}=start(q,"Na een festival hoort Tim de volgende dag alles gedempt, met een piep. Een dag later is dat weer weg. Toch zegt de huisarts dat zijn gehoor in de afgelopen jaren blijvend slechter is geworden.<br><br>"+B("Leg uit hoe het kan dat de klachten na een festival verdwijnen, terwijl zijn gehoor toch blijvend achteruitgaat."));
  choiceStep(think,{q:"Hoe vaak gaat Tim naar een festival?",opts:["elke zomer een paar keer","één keer"],right:0,
    ok:"Ja: elk festival telt mee. Bedenk twee dingen die er na één festival met haarcellen kunnen gebeuren.",no:"Lees de inleiding van de opgave nog eens.",onDone:unlock});
  openAnswer(ans,{id,pts:2,checks:[
    "Na één festival zijn de meeste haarcellen alleen <b>overbelast</b> en herstellen ze na rust.",
    "Bij elk festival gaat een <b>deel van de haarcellen dood</b>, en die groeien niet terug; zo neemt het aantal werkende haarcellen steeds verder af."],
    model:"Na één festival zijn de meeste haarcellen alleen overbelast. Na rust herstellen ze, en dan zijn de klachten weg. Maar bij elk festival gaat ook een klein deel van de haarcellen dood, en dode haarcellen groeien niet terug. Na jaren festivals zijn er zo steeds minder werkende haarcellen.",
    valkuil:"‘Zijn oren wennen aan hard geluid’: 0 punten. Het lijkt zachter te klinken, juist doordat er haarcellen beschadigd zijn.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Vóór het festival: alle haarcellen werken.",st:0},
      {cap:"De dag erna: veel haarcellen zijn overbelast (geel), een paar zijn dood (rood). Alles klinkt gedempt.",st:1},
      {cap:"Na rust herstellen de overbelaste haarcellen. De dode niet.",st:2},
      {cap:"Na jaren festivals: steeds meer dode haarcellen. Blijvend slechter horen.",st:3}],
      (stg,s)=>stg.innerHTML=HAARCELLEN(s.st)))});
  q.append(think,ans);
},STOF_OOR);
/* rij haarcellen: 0 gezond, 1 na festival, 2 na rust, 3 na jaren */
function HAARCELLEN(st){
  const n=16,dood=st===3?[1,3,4,6,8,9,11,13,14]:st>=1?[4,11]:[],moe=st===1?[0,1,2,3,5,6,7,8,9,10,12,13,14]:[];let s="";
  for(let k=0;k<n;k++){const x=30+k*35,d=dood.includes(k),m=moe.includes(k);const kl=d?"var(--koraal)":m?"var(--goud)":"var(--groen)";
    s+=`<rect x="${x}" y="60" width="22" height="46" rx="6" fill="${kl}" opacity="${d?.35:.75}"/>`;
    if(!d)for(let h=0;h<3;h++)s+=`<path d="M${x+5+h*6},60 l${m?3:0},-16" stroke="${kl}" stroke-width="2"/>`;
    else s+=`<path d="M${x+4},70 l14,26 M${x+18},70 l-14,26" stroke="var(--koraal)" stroke-width="2"/>`;}
  s+=`<text x="30" y="132" class="lblm">${["vóór het festival","de dag erna","na een dag rust","na jaren festivals"][st]}: ${n-dood.length} van de ${n} haarcellen werken${st===1?" (veel zijn overbelast)":""}</text>`;
  return FIG(440,600,"0 0 600 142",s,"Rij haarcellen");}

let e4;
if(!VWO){
e4=vraag(2,"veilig met oordopjes",(q,id)=>{
  const {think,ans,unlock}=start(q,"Bij de geluidssterkte vooraan op het festival is het ongeveer 15 minuten veilig om te luisteren. Elke 3 dB harder betekent: de helft zo lang veilig. Omgekeerd: elke 3 dB zachter betekent twee keer zo lang veilig. Oordopjes maken het geluid 15 dB zachter.<br><br>"+B("Bereken hoe lang Tim met oordopjes vooraan veilig kan luisteren. Geef je antwoord in uren."));
  numStep(think,{uid:"q"+id+"n",q:"Hoeveel stappen van 3 dB zitten er in 15 dB?",right:5,ok:"Ja, vijf stappen.",no:"Deel 15 dB door 3 dB.",
    onDone:()=>choiceStep(think,{q:"Stel dat het geluid 9 dB zachter wordt: drie stappen. Hoeveel keer zo lang is het dan veilig?",opts:["3 × 2 = 6 keer zo lang","2 × 2 × 2 = 8 keer zo lang"],right:1,
      ok:"Ja: elke stap verdubbelt de tijd opnieuw. Reken nu met vijf stappen, en zet de minuten om in uren.",no:"Na één stap: 2 keer zo lang. Na de tweede stap verdubbelt díe tijd weer.",onDone:unlock})});
  numAnswer(ans,{id,fields:[
    ["Hoeveel keer zo lang veilig met oordopjes?","keer",v=>v===32,"15 dB = 5 stappen van 3 dB: 2 × 2 × 2 × 2 × 2 = 32 keer zo lang (1 punt)"],
    ["Veilige tijd met oordopjes","uur",v=>{const f0=parseFloat((document.getElementById("q"+id+"f0").value||"").replace(",","."));return Math.abs(v-8)<0.01||(f0!==32&&Math.abs(v-f0*15/60)<0.01);},"32 × 15 min = 480 min = 8 uur (1 punt; bij een fout in de eerste stap telt een juiste omrekening naar uren)"]],
    after:()=>waaromBtn(ans,b=>stepAnim(b,[0,1,2,3,4,5].map(k=>({k,cap:k===0?"Zonder oordopjes: 15 minuten veilig.":k<5?`${3*k} dB zachter: ${k} ${k===1?"stap":"stappen"}, ${2**k} keer zo lang: ${15*2**k} minuten.`:"15 dB zachter: 5 stappen, 2 × 2 × 2 × 2 × 2 = 32 keer zo lang: 480 minuten = <b>8 uur</b>. Wie 15/3 = 5 keer zo lang rekent (75 minuten), vergeet dat elke stap de tijd opnieuw verdubbelt."})),
      (stg,s)=>{stg.innerHTML=VERDUBBEL(s.k);inBeeld(stg,(77+s.k*90)/600);}))});
  q.append(think,ans);
},STOF_OOR);
}else{
const STOF_BAS={titel:"Het basilair membraan",html:`
<p>De haarcellen in het slakkenhuis staan op een lang vlies: het <b>basilair membraan</b>. Dat is niet overal hetzelfde: van het begin naar het eind verandert de breedte en de stevigheid. Daardoor trilt elke plek het best bij een eigen toonhoogte.</p>`,
films:[F.zin]};
e4=vraag(2,"de plek van de schade",(q,id)=>{
  const {think,ans,unlock}=start(q,"Bij gehoorschade door lawaai zijn vooral de haarcellen aan het begin van het slakkenhuis beschadigd.<ul style='margin:6px 0 0;padding-left:20px'><li>"+B("Leg uit waarom schade aan dít deel vooral het horen van hoge tonen aantast.")+"</li><li>Bij Tim is het gehoor bij 8000 Hz minder achteruitgegaan dan bij 4000 Hz. "+B("Wat kun je daaruit afleiden over de plek van de schade op het basilair membraan?")+"</li></ul>");
  choiceStep(think,{q:"Hoe weten je hersenen welke toonhoogte je hoort?",opts:["aan de plek op het basilair membraan van de haarcellen die impulsen geven","aan hoe hard de impulsen zijn"],right:0,
    ok:"Ja. Welke toonhoogte laat dan het begin van het membraan trillen, en waarom?",no:"Impulsen zijn altijd even groot (alles-of-niets).",
    onDone:()=>choiceStep(think,{q:"Welke toon is hoger: 4000 Hz of 8000 Hz?",opts:["8000 Hz","4000 Hz"],right:0,
      ok:"Goed. Bedenk waar op het membraan de hoogste tonen worden opgevangen, en waar 4000 Hz.",no:"Hertz is het aantal trillingen per seconde: meer trillingen is een hogere toon.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Het begin van het basilair membraan is <b>smal en stijf</b> en trilt mee met <b>hoge tonen</b>; de hersenen horen de toonhoogte aan de plek van de haarcellen die een impuls geven.",
    "De schade zit op een plek <b>iets verder van het begin</b> (waar 4000 Hz wordt opgevangen), niet helemaal aan het begin (waar de hoogste tonen worden opgevangen)."],
    model:"Het begin van het basilair membraan is smal en stijf en trilt bij hoge tonen. De hersenen horen de toonhoogte aan de plek van de haarcellen die impulsen geven, dus schade aan het begin raakt vooral de hoge tonen. Omdat 8000 Hz minder is aangetast dan 4000 Hz, zit de meeste schade niet helemaal aan het begin, maar iets verder, op de plek waar 4000 Hz wordt opgevangen.",
    valkuil:"Voor het tweede punt moet je de plek ten opzichte van het begin noemen; alleen ‘bij 4000 Hz’ is te weinig.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Het basilair membraan, uitgerold: aan het begin smal en stijf (hoge tonen, helemaal vooraan tot 20 000 Hz), aan het eind breed en slap (lage tonen).",st:0},
      {cap:"Bij Tim is het gehoor bij 4000 Hz het slechtst, bij 8000 Hz minder slecht: de meeste schade zit iets na het begin.",st:1}],
      (stg,s)=>{stg.innerHTML=BASILAIR(s.st);inBeeld(stg,s.st?0.3:null);}))});
  q.append(think,ans);
},STOF_BAS);
}
/* verdubbelen per 3 dB (havo) */
function VERDUBBEL(k){let s="";const ys=v=>220-v*0.4;
  for(let j=0;j<=5;j++){const x=50+j*90,v=15*2**j,on=j<=k;
    s+=`<rect x="${x}" y="${ys(v)}" width="54" height="${220-ys(v)}" rx="4" fill="${j===k?"var(--goud)":"var(--teal)"}" opacity="${on?.8:.12}"/>`;
    s+=`<text x="${x+27}" y="240" text-anchor="middle" class="lblm">−${3*j} dB</text>`;
    if(on)s+=`<text x="${x+27}" y="${ys(v)-6}" text-anchor="middle" class="lbl">${v} min</text>`;}
  s+=`<path d="M40,220 H580" stroke="var(--text2)"/>`;
  return FIG(440,600,"0 0 600 250",s,"Veilige luistertijd per 3 dB zachter");}
/* basilair membraan (vwo) */
function BASILAIR(st){let s="";
  /* plek als fractie van het begin (ovale venster) volgens de Greenwood-functie voor de mens: 20 000 Hz helemaal aan het begin, 8000 Hz op ± een vijfde */
  const X=f=>40+520*(1-Math.log10(f/165.4+0.88)/2.1),top=x=>90-30*(x-40)/520;
  s+=`<path d="M40,90 L560,60 L560,140 L40,110 Z" fill="var(--teal-soft)" stroke="var(--teal)" stroke-width="1.6"/>`;
  s+=`<text x="40" y="40" class="lbl">begin (bij het ovale venster): smal en stijf</text><text x="560" y="40" text-anchor="end" class="lbl">eind: breed en slap</text>`;
  [20000,8000,6000,4000,3000,2000,1000,500,250].forEach((f,k)=>{const x=X(f);
    s+=`<path d="M${x.toFixed(1)},${top(x).toFixed(1)} V${k%2?178:192}" stroke="var(--line2)" stroke-width="1"/><text x="${x.toFixed(1)}" y="${k%2?192:206}" text-anchor="${k?"middle":"start"}" class="lblm">${f===20000?"20 000":f}</text>`;});
  s+=`<text x="300" y="228" text-anchor="middle" class="lblm">toonhoogte die op die plek het sterkst trilt (Hz)</text>`;
  if(st===1){[[8000,.3],[6000,.55],[4000,.9],[3000,.55],[2000,.15]].forEach(([f,o])=>s+=`<circle cx="${X(f).toFixed(1)}" cy="100" r="15" fill="var(--koraal)" opacity="${o}"/>`);
    s+=`<text x="${X(4000).toFixed(1)}" y="152" text-anchor="middle" class="lbl" style="fill:var(--koraal)">meeste schade</text>`;}
  return FIG(440,600,"0 0 600 238",s,"Basilair membraan met de plek van hoge en lage tonen");}

opgave("Festival","Een piep na het festival",`
<p>Tim (18) gaat elke zomer naar een paar festivals en staat daar graag vooraan bij de boxen. Oordopjes vindt hij niet nodig. De laatste tijd hoort hij na een festival een hoge piep, en in de klas verstaat hij zijn klasgenoten slecht als er geroezemoes is. Bij de huisarts wordt zijn gehoor getest: met een koptelefoon krijgt hij tonen van verschillende hoogte te horen, steeds zachter, totdat hij ze niet meer hoort. De zachtste toon die hij nog hoort, is zijn gehoordrempel.</p>
${AFB(4,"fictieve gegevens")}${GRAF_AUDIO()}
<p class="muted" style="font-size:14px">Tim is fictief.</p>`,[e1,e2,e3,e4]);

if(VWO){
/* ----- opgave 9 (vwo): Bot en spieren (KK02) ----- */
const STOF_SPIER={titel:"Spieren en gewrichten",html:`
<p>Een skeletspier zit met <b>pezen</b> vast aan botten. Over een gewricht heen trekt een spier twee botten naar elkaar toe. Als een spier samentrekt, wordt hij korter en dikker.</p>
<p>Hoe sterk een spier trekt, hangt af van hoeveel spiervezels meedoen en hoeveel impulsen per seconde ze krijgen.</p>`,
films:[F.spier]};
/* arm: st 0 buigen (biceps), 1 strekken (triceps) */
const ARM=st=>{const b=st===0,E=[160,190],H=b?[272,112]:[170,342];let s="";
  const L=Math.hypot(H[0]-E[0],H[1]-E[1]),u=[(H[0]-E[0])/L,(H[1]-E[1])/L],n=[u[1],-u[0]];
  const A=[E[0]+u[0]*34+n[0]*7,E[1]+u[1]*34+n[1]*7],O=[E[0]-n[0]*0-8,E[1]+12];
  s+=`<path d="M150,30 L${E[0]},${E[1]} L${H[0]},${H[1]}" fill="none" stroke="var(--text3)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`;
  const bE=[E[0]+15,E[1]-30],tE=[E[0]-13,E[1]-26];
  s+=`<path d="M170,44 L172,62 M${bE[0]},${bE[1]} L${A[0].toFixed(1)},${A[1].toFixed(1)}" stroke="var(--koraal)" stroke-width="3" fill="none"/>`;
  s+=`<path d="M172,62 Q${b?222:190},${b?118:126} ${bE[0]},${bE[1]}" fill="none" stroke="var(--koraal)" stroke-width="${b?24:13}" stroke-linecap="round" opacity="${b?.9:.45}"/>`;
  s+=`<path d="M132,44 L134,62 M${tE[0]},${tE[1]} L${O[0]},${O[1]}" stroke="var(--teal)" stroke-width="3" fill="none"/>`;
  s+=`<path d="M134,62 Q${b?116:104},126 ${tE[0]},${tE[1]}" fill="none" stroke="var(--teal)" stroke-width="${b?13:24}" stroke-linecap="round" opacity="${b?.45:.9}"/>`;
  s+=`<circle cx="${E[0]}" cy="${E[1]}" r="7" fill="var(--surface)" stroke="var(--text2)" stroke-width="2"/>`;
  s+=`<text x="${b?222:206}" y="76" class="lbl" style="fill:var(--koraal)">biceps${b?" trekt":""}</text><text x="${b?20:10}" y="120" class="lbl" style="fill:var(--teal)">triceps${b?"":" trekt"}</text>`;
  s+=`<text x="${b?150:110}" y="${b?222:200}" class="lblm"${b?"":` text-anchor="end"`}>elleboog</text><text x="${b?204:(Math.max(bE[0],A[0])+10).toFixed(0)}" y="${b?190:((bE[1]+A[1])/2+4).toFixed(0)}" class="lblm">pees</text>`;
  return FIG(320,420,"0 0 360 350",s,b?"Arm buigen: de biceps trekt":"Arm strekken: de triceps trekt");};
const k6=vraag(2,"buigen en strekken",(q,id)=>{
  const {think,ans,unlock}=start(q,"Je buigt en strekt je arm.<br><br>"+B("Leg uit waarom je daar twee spieren voor nodig hebt. Gebruik de begrippen pees, biceps, triceps en antagonisten."));
  choiceStep(think,{q:"Wat gebeurt er met een spier als hij samentrekt?",opts:["hij wordt korter en dikker","hij wordt langer en dunner"],right:0,
    ok:"Ja. Bedenk wat dat betekent als je je gebogen arm weer wilt strekken.",no:"Voel maar aan je bovenarm als je je arm buigt.",
    onDone:()=>choiceStep(think,{q:"Waarmee zit een spier vast aan een bot?",opts:["met een pees","met een gewrichtsband"],right:0,
      ok:"Goed. Volg bij elke spier de pees naar de onderarm: wat doet de onderarm als die spier korter wordt?",no:"Een gewrichtsband houdt twee botten bij elkaar.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Een spier kan alleen <b>korter worden / trekken</b>, niet duwen.",
    "De <b>biceps</b> (pees vóór de elleboog) buigt en de <b>triceps</b> (pees achter de elleboog) strekt de arm; ze bewegen in tegengestelde richting: <b>antagonisten</b>."],
    model:"Een spier kan alleen samentrekken en dus alleen trekken, niet duwen. De biceps zit met een pees vóór de elleboog aan het onderarmbot en buigt de arm. De triceps zit met een pees achter de elleboog vast en strekt de arm. Ze maken tegengestelde bewegingen: het zijn antagonisten.",
    valkuil:"‘De biceps duwt de arm weer recht’ klopt niet: een spier kan niet duwen.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[{cap:"Buigen: de biceps trekt (korter en dikker), de triceps ontspant.",st:0},{cap:"Strekken: de triceps trekt, de biceps wordt weer uitgerekt.",st:1}],
      (stg,s)=>stg.innerHTML=ARM(s.st)))});
  q.append(think,ans);
},STOF_SPIER);
opgave("Spieren","Bot en spieren",GEEN_INLEIDING,[k6]);
}
}
