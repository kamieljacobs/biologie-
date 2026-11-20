/* ===== Opgave 4: Alcohol onder het ijs (inzicht versie 1; EI-stofwisseling-B01, B02, B03, havo B04 / vwo B05) ===== */
{
const STOF_DRIE={titel:"Drie manieren om ATP aan te vullen",html:`
<p>Een spier vult zijn ATP op drie manieren aan, vaak tegelijk:</p>
<ul style="margin:0;padding-left:20px"><li>de <b>fosfaataccu</b>: CP geeft zijn fosfaat aan ADP; de voorraad CP is klein;</li>
<li>de <b>glycolyse</b> in het grondplasma, met daarna <b>gisting</b> als er (te) weinig zuurstof is;</li>
<li>de <b>aerobe dissimilatie</b>: verdere afbraak in de mitochondriën, met zuurstof.</li></ul>
<p>Bij gisting wordt pyrodruivenzuur omgezet in melkzuur of in ethanol. Kijk bij elk proces of het zuurstof nodig heeft, en hoe lang het kan volhouden.</p>`,
films:[F.a]};
const STOF_PH={titel:"Enzymen en de pH",html:`
<p>Enzymen zijn gevoelig voor de pH: een beetje zuurder of basischer, en de ladingen in het actieve centrum kloppen al niet meer.</p>
`,
films:[F.a,F.v]};
const STOF_REKEN={titel:"Rekenen met een verhouding",html:`
<p>Levert elke eenheid brandstof minder op, dan heb je voor hetzelfde resultaat méér eenheden nodig. Een voorbeeld met andere getallen: een lamp die 4 uur brandt op een grote batterij, brandt maar 1 uur op een kleine. Voor 8 uur licht heb je dan 2 grote of 8 kleine batterijen nodig: vier keer zoveel.</p>
<p>Reken dus eerst uit hoeveel keer zoveel het ene oplevert als het andere.</p>`,
films:[F.a]};

const q11=vraag(1,"ATP onder het ijs",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Uit welk proces halen de spieren van de karper onder het ijs hun ATP?"));
  choiceStep(think,{q:"Is er onder het ijs zuurstof voor de spieren van de karper?",opts:["ja","nee"],right:1,
    ok:"Ja: geen zuurstof. Dan kunnen alleen processen die geen zuurstof nodig hebben nog ATP leveren.",no:"Lees de inleiding: het water bevat helemaal geen zuurstof meer.",
    onDone:()=>chipsStep(think,{q:"Welke processen kunnen zonder zuurstof ATP leveren? Kies alles wat klopt.",items:[["de fosfaataccu",1],["de glycolyse",1],["de afbraak in de mitochondriën",0]],
      ok:"Goed. Welke van deze twee kan het maandenlang volhouden?",no:"De afbraak in de mitochondriën heeft zuurstof nodig.",onDone:unlock})});
  mc(ans,{qid:id,pts:1,right:1,opts:["uit de afbraak van pyrodruivenzuur in de matrix","uit de glycolyse in het grondplasma","uit de fosfaataccu, maandenlang","uit de stap waarin ethanol ontstaat"],
    onChecked:()=>waaromBtn(ans,textBox("<b>B</b>: de glycolyse levert netto twee ATP per glucose, ook zonder zuurstof. A heeft zuurstof nodig. C: de voorraad CP raakt binnen seconden op. D: de stap van pyrodruivenzuur naar ethanol levert zelf <b>geen</b> ATP op; hij zorgt er wel voor dat de glycolyse door kan gaan."))});
  q.append(think,ans);
},STOF_DRIE);

const q12=vraag(2,"ethanol of melkzuur",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Leg uit waardoor de karper door ethanol te maken maanden zonder zuurstof kan, terwijl een dier dat melkzuur maakt dat niet lang volhoudt."));
  choiceStep(think,{q:"Wat gebeurt er met de pH in een spier als er veel melkzuur ontstaat?",opts:["de pH daalt","de pH stijgt","de pH blijft gelijk"],right:0,
    ok:"Ja. Waarom is dat een probleem voor de spiercellen?",no:"Melkzuur is een zuur.",
    onDone:()=>choiceStep(think,{q:"Wat gebeurt er met de ethanol die de spieren van de karper maken?",opts:["die hoopt zich op in de spieren","die verlaat het lichaam via de kieuwen","die wordt omgezet in melkzuur"],right:1,
      ok:"Goed. Zet die twee dingen tegenover elkaar in je uitleg.",no:"Lees de laatste zin van de inleiding.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Melkzuur (en H⁺) <b>hoopt zich op</b>, de <b>pH</b> in de spieren daalt en <b>enzymen werken dan slechter</b>.",
    "De ethanol <b>verlaat via de kieuwen het lichaam</b>, zodat er niets ophoopt en de pH niet daalt."],
    model:"Een dier dat melkzuur maakt, kan het melkzuur niet snel kwijt: melkzuur en H⁺ hopen zich op in de spieren, de pH daalt en de enzymen werken slechter. Dat houdt het dier niet lang vol. De ethanol van de karper verlaat via de kieuwen het lichaam. Daardoor hoopt er niets op, de pH daalt niet, en de glycolyse kan maandenlang doorgaan.",
    valkuil:"‘Ethanol levert meer ATP op dan melkzuur’: fout. Beide soorten gisting leveren netto twee ATP per glucose; het verschil is wat er met het eindproduct gebeurt.",
    after:()=>waaromBtn(ans,textBox("Beide soorten gisting leveren evenveel ATP: netto twee per glucose uit de glycolyse. Het verschil zit in het <b>afval</b>. Melkzuur blijft in de spier, de pH daalt, en enzymen (ook die van de glycolyse) werken slechter. Ethanol is een kleine stof die via de kieuwen in het water verdwijnt: er hoopt niets op."))});
  q.append(think,ans);
},STOF_PH);

const q13=vraag(2,"rekenen aan glucose en glycogeen",(q,id)=>{
  pre(q,"<p>Met zuurstof levert één glucose ongeveer 30 ATP op, met gisting 2 ATP. Stel dat een karper in de winter elke dag evenveel ATP gebruikt als een karper met zuurstof die 3 mmol glucose per dag verbruikt (fictieve gegevens).</p>");
  const {think,ans,unlock}=start(q,"<b>a</b> Bereken hoeveel mmol glucose de karper zonder zuurstof per dag verbruikt.<br><b>b</b> Karpers slaan in de herfst veel glycogeen op in hun lever en spieren. Leg uit waarom dat nodig is om de winter zonder zuurstof te overleven.");
  numStep(think,{uid:"q"+id+"n",q:"Hoeveel keer zoveel ATP levert één glucose met zuurstof op als met gisting?",right:15,
    ok:"Ja: 30 : 2 = 15. Hoeveel glucose heeft de karper zonder zuurstof dan nodig voor evenveel ATP?",no:"Deel het ene getal door het andere: 30 : 2 = ?",
    onDone:()=>choiceStep(think,{q:"Waar haalt een karper onder het ijs zijn glucose vandaan, als hij nauwelijks eet?",opts:["uit een voorraad in zijn eigen lichaam","uit het water onder het ijs"],right:0,
      ok:"Goed. Gebruik bij b ook je uitkomst van a.",no:"In de winter eet de karper bijna niets. Wat lees je in b over de herfst?",onDone:unlock})});
  rekenOpen(ans,{id,reken:["a · glucose zonder zuurstof","mmol per dag",v=>Math.abs(v-45)<0.01,"3 × (30 : 2) = <b>45</b> mmol glucose per dag"],
    check:"<b>b</b> Glycogeen is een <b>voorraad glucose</b>; zonder zuurstof is per dag (vijftien keer) zoveel glucose nodig dat de vis maanden lang een <b>grote voorraad</b> nodig heeft (onder het ijs eet hij nauwelijks).",
    model:"Glycogeen is een voorraad glucose. Zonder zuurstof levert elke glucose maar 2 ATP, dus de karper verbruikt per dag 15 keer zoveel glucose (45 in plaats van 3 mmol). Dat moet maandenlang, terwijl hij onder het ijs nauwelijks eet. Daarom heeft hij een grote voorraad nodig.",
    valkuil:"Bij a: 3 × 2 : 30 = 0,2 mmol is omgekeerd gerekend. Met minder ATP per glucose heb je juist méér glucose nodig.",
    after:()=>waaromBtn(ans,textBox("Met zuurstof: 3 mmol × 30 ATP = 90 mmol ATP per dag. Met gisting levert elke glucose maar 2 ATP: 90 : 2 = <b>45 mmol</b> glucose per dag, vijftien keer zoveel. Een hele winter lang is dat zoveel glucose dat de karper in de herfst een grote voorraad glycogeen moet aanleggen."))});
  q.append(think,ans);
},STOF_REKEN);

const ids=[q11,q12,q13];
if(!VWO){
ids.push(vraag(2,"geen ethanol in de zomer",(q,id)=>{
  pre(q,"<p>Een onderzoeker vindt in de winter ethanol in het vijverwater onder het ijs, maar in de zomer niet.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit waardoor de karper in de zomer geen ethanol maakt. Beschrijf wat er dan met het pyrodruivenzuur gebeurt."));
  choiceStep(think,{q:"Wat is er in de zomer anders aan het vijverwater?",opts:["er is zuurstof","het water is zouter","er zit al ethanol in"],right:0,
    ok:"Ja. Is gisting dan nodig?",no:"Onder het ijs is er geen zuurstof. En zonder ijs?",
    onDone:()=>choiceStep(think,{q:"Waar wordt pyrodruivenzuur verder afgebroken als er genoeg zuurstof is?",opts:["in het mitochondrium","in de celkern","in het grondplasma, tot ethanol"],right:0,
      ok:"Goed. Tot welke stoffen wordt het daar uiteindelijk afgebroken?",no:"Denk aan het organel waar je CO₂ ontstaat.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "In de zomer is er <b>genoeg zuurstof</b>, dus is er geen (nauwelijks) <b>gisting</b> nodig.",
    "Het pyrodruivenzuur gaat het <b>mitochondrium</b> in en wordt (aeroob) afgebroken tot <b>CO₂ en water</b>."],
    model:"In de zomer zit er zuurstof in het water. Dan is gisting (bijna) niet nodig. Het pyrodruivenzuur uit de glycolyse gaat het mitochondrium in en wordt daar met zuurstof afgebroken tot CO₂ en water. Daarbij ontstaat veel meer ATP.",
    valkuil:"‘In de zomer is het warmer’ is geen uitleg: het gaat om de zuurstof.",
    after:()=>waaromBtn(ans,textBox("Pyrodruivenzuur staat op een splitsing. <b>Zonder zuurstof</b> gaat het naar ethanol (gisting), zodat de glycolyse door kan. <b>Met zuurstof</b> gaat het vooral het mitochondrium in en wordt het helemaal afgebroken tot CO₂ en water: ongeveer dertig ATP per glucose in plaats van twee."))});
  q.append(think,ans);
},STOF_DRIE));
}else{
const STOF_NAD={titel:"Hulpmoleculen bij de glycolyse",html:`
<p>Bij één stap van de glycolyse gaan er H-atomen af. Een co-enzym neemt ze op: <b>NAD⁺</b>. Met de H-atomen erop heet het <b>NADH,H⁺</b>. Van NAD⁺ is maar weinig in een cel; een co-enzym wordt niet verbruikt, maar steeds opnieuw beladen en weer leeggemaakt.</p>
`,
films:[F.a]};
function NADKRING(stap){
  const c=[["glucose",80,60],["pyrodruivenzuur",420,60]];let s="";
  s+=`<rect x="160" y="34" width="180" height="50" rx="10" fill="var(--teal-soft)" stroke="var(--teal)" stroke-width="2"/><text x="250" y="64" text-anchor="middle" class="lbl">glycolyse</text>`;
  s+=`<text x="70" y="64" text-anchor="middle" class="lbl">glucose</text><path d="M110,59 H156" stroke="var(--text2)" stroke-width="2" marker-end="url(#nk)"/>`;
  s+=`<path d="M344,59 H396" stroke="var(--text2)" stroke-width="2" marker-end="url(#nk)" opacity="${stap===3?.3:1}"/><text x="470" y="64" text-anchor="middle" class="lbl">pyrodruivenzuur</text>`;
  s+=`<text x="400" y="34" class="lblm" style="fill:var(--koraal)">${stap===1?"+ 2 ATP":""}</text>`;
  /* kring NAD+ */
  s+=`<path d="M300,88 C320,150 400,160 440,140" fill="none" stroke="var(--goud)" stroke-width="2" marker-end="url(#nk)"/><text x="460" y="150" class="lbl">NADH,H⁺</text>`;
  const terug=stap===1;
  s+=`<path d="M440,168 C380,200 240,200 200,92" fill="none" stroke="${terug?"var(--groen)":"var(--koraal)"}" stroke-width="2" stroke-dasharray="${terug?"":"6 5"}" marker-end="url(#nk)"/><text x="150" y="150" class="lbl">NAD⁺</text>`;
  if(stap===1)s+=`<text x="320" y="214" text-anchor="middle" class="lblm">H-atomen naar pyrodruivenzuur: ethanol of melkzuur</text>`;
  if(stap>=2)s+=`<text x="320" y="214" text-anchor="middle" class="lblm" style="fill:var(--koraal)">geen zuurstof, geen ethanol, geen melkzuur: de H-atomen kunnen nergens heen</text>`;
  if(stap===3)s+=`<text x="250" y="22" text-anchor="middle" class="lbl" style="fill:var(--koraal)">glycolyse stopt: geen ATP meer</text>`;
  const defs=`<defs><marker id="nk" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--text2)"/></marker></defs>`;
  return FIG("0 0 640 230",defs+s,"NAD⁺ wordt bij de glycolyse beladen en moet weer vrijkomen",520,640);}
ids.push(vraag(2,"geen ethanol en geen melkzuur",(q,id)=>{
  pre(q,"<p>Stel dat een karper door een mutatie onder het ijs geen ethanol én geen melkzuur kan maken.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit waardoor zijn spieren dan geen ATP meer kunnen maken, hoewel er nog glucose is."));
  choiceStep(think,{q:"Welk hulpmolecuul neemt bij de glycolyse H-atomen op?",opts:["NAD⁺","ATP","CO₂"],right:0,
    ok:"Ja. Er is maar weinig van in de cel. Wat moet er met NADH,H⁺ gebeuren voordat de glycolyse verder kan?",no:"Het is een co-enzym; beladen heet het NADH,H⁺.",
    onDone:()=>choiceStep(think,{q:"Kan NADH,H⁺ onder het ijs zijn elektronen kwijt aan de elektronentransportketen?",opts:["ja, die werkt altijd","nee: zonder zuurstof loopt de keten vast"],right:1,
      ok:"Goed. Wat is dan nog de enige manier om NAD⁺ terug te krijgen, en wat gebeurt er als ook die wegvalt?",no:"Wie neemt aan het eind van de keten de elektronen op?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Het <b>NADH,H⁺</b> uit de glycolyse kan zijn H-atomen niet kwijt: zonder zuurstof loopt de elektronentransportketen vast en zonder ethanol- of melkzuurvorming komt er <b>geen NAD⁺ terug</b>.",
    "Zonder NAD⁺ <b>stopt de glycolyse</b>, de enige bron van ATP zonder zuurstof (de fosfaataccu is snel op)."],
    model:"Bij de glycolyse neemt NAD⁺ H-atomen op en wordt NADH,H⁺. Zonder zuurstof loopt de elektronentransportketen vast, en door de mutatie kan NADH,H⁺ zijn H-atomen ook niet aan pyrodruivenzuur kwijt (geen ethanol, geen melkzuur). Er komt dus geen NAD⁺ terug. Als alle NAD⁺ beladen is, stopt de glycolyse. Dat was zonder zuurstof de enige bron van ATP; de fosfaataccu is binnen seconden op.",
    valkuil:"‘De stap naar ethanol leverde de ATP’: fout. Die stap levert zelf geen ATP; hij levert NAD⁺ terug, zodat de glycolyse door kan.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Gewone karper onder het ijs: de glycolyse maakt netto 2 ATP en belaadt NAD⁺. Bij de vorming van ethanol gaan de H-atomen naar pyrodruivenzuur, en komt NAD⁺ terug.",s:1},
      {cap:"Mutant: geen ethanol en geen melkzuur, en zonder zuurstof ook geen elektronentransportketen. NADH,H⁺ kan zijn H-atomen nergens kwijt.",s:2},
      {cap:"Alle NAD⁺ is beladen: de glycolyse stopt, en daarmee de enige bron van ATP zonder zuurstof. Glucose genoeg, maar geen ATP.",s:3}],
      (st,x)=>st.innerHTML=NADKRING(x.s)))});
  q.append(think,ans);
},STOF_NAD));
}
opgave("Karper","Alcohol onder het ijs",`
<p>Kroeskarpers en goudvissen kunnen maandenlang leven in vijvers met een ijslaag erop, ook als het water onder het ijs helemaal geen zuurstof meer bevat. De meeste gewervelde dieren, ook de mens, maken zonder zuurstof melkzuur. De spieren van deze vissen maken in plaats daarvan vooral ethanol. De ethanol verlaat het lichaam via de kieuwen en komt in het water terecht.</p>
<p class="muted" style="font-size:14px">Bron: Universiteit van Liverpool en Universiteit van Oslo, Scientific Reports 2017 (vereenvoudigd).</p>`,ids);
}
