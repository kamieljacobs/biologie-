/* ===== Opgave 3: Energie uit glucose (kennis; EI-stofwisseling-L04, L10, havo L01 / vwo L07) ===== */
{
const STOF_BRAND={titel:"Brandstof voor je spieren",html:`
<p>Een spier draait op <b>ATP</b>. Na gebruik moet ATP steeds opnieuw gemaakt worden, en daar is energie voor nodig. Die energie komt uit <b>creatinefosfaat (CP)</b> of uit de afbraak van <b>glucose</b>.</p>
<p>De afbraak van glucose begint in het grondplasma met een reeks enzymen: de <b>glycolyse</b>. Glucose (zes C-atomen) wordt daarbij afgebroken tot twee moleculen pyrodruivenzuur (elk drie C-atomen).</p>`,
films:[F.a]};
const STOF_ATOM={titel:"Met en zonder zuurstof",html:`
<p><b>Aeroob</b>: het proces heeft zuurstof nodig. <b>Anaeroob</b>: het proces heeft geen zuurstof nodig (het kan ook gebeuren als er wél zuurstof is).</p>
<p>Bij uitspraken over dissimilatie helpt het om elke uitspraak na te lopen als een keten: welk proces, waar in de cel, welke stoffen gaan erin en welke komen eruit? En volg de atomen: een C-, H- of O-atoom verdwijnt niet, het komt altijd ergens terecht.</p>`,
films:[F.a]};

const q8=vraag(1,"glycogeen",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Wat is glycogeen, en waar dient het een spier voor?"));
  choiceStep(think,{q:"Welke stof is de brandstof van de glycolyse?",opts:["glucose","melkzuur","creatinefosfaat"],right:0,
    ok:"Ja. Glucose komt uit je bloed, of uit een voorraad in de spier zelf. Lees de keuzes nu nog eens.",no:"De glycolyse breekt een suiker met zes C-atomen af.",onDone:unlock});
  mc(ans,{qid:id,pts:1,right:0,opts:["een voorraad glucose in de spier, waaruit de spier glucose haalt voor de glycolyse","een hulpmolecuul dat bij de afbraak van glucose H-atomen opneemt","een stof die bij gisting ontstaat en de pH in de spier verlaagt","een stof die zijn fosfaat aan ADP geeft"],
    onChecked:()=>waaromBtn(ans,textBox(`<b>A</b>: glycogeen is je voorraad glucose in de spier (en de lever). Daaruit haalt de spier glucose voor de glycolyse. B is een hulpmolecuul${VWO?" (zoals NAD⁺)":""}, C is melkzuur en D is creatinefosfaat (CP).`))});
  q.append(think,ans);
},STOF_BRAND);

const q9=vraag(2,"juist of onjuist: energie uit glucose",(q,id)=>{
  pre(q,"<p>Hieronder staan 6 uitspraken.</p>");
  q.append(el("p",{class:"qtext"},"1 De O-atomen van de zuurstof die je cellen gebruiken, komen in water terecht.<br>2 De C-atomen van het CO₂ dat je uitademt, komen uit je brandstof, zoals glucose.<br>3 Het CO₂ dat je uitademt, ontstaat in je longen.<br>4 Zonder zuurstof blijven alleen de fosfaataccu en de glycolyse met gisting over.<br>5 Bij melkzuurgisting ontstaat CO₂.<br>6 De glycolyse kost eerst twee ATP en levert er daarna vier op, dus netto twee per glucose.<br><br><b>Geef bij elke uitspraak aan of hij juist of onjuist is.</b>"));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  selectsStep(think,{uid:"q"+id,q:"Welke stoffen ontstaan bij welk proces?",rows:[
    ["melkzuurgisting",["melkzuur","ethanol en CO₂","CO₂ en water"],0],["alcoholgisting",["melkzuur","ethanol en CO₂","CO₂ en water"],1],["aerobe dissimilatie",["melkzuur","ethanol en CO₂","CO₂ en water"],2]],
    ok:"Goed. Bedenk bij uitspraak 3 ook wáár in de cel glucose met zuurstof wordt afgebroken.",no:"Gist maakt brooddeeg luchtig. Welk gas is dat, en welk proces doet gist?",onDone:unlock});
  juistOnjuist(ans,{id,stm:["de O-atomen van zuurstof komen in water","de C-atomen van CO₂ komen uit je brandstof","CO₂ ontstaat in je longen","zonder zuurstof: alleen fosfaataccu en glycolyse met gisting","bij melkzuurgisting ontstaat CO₂","glycolyse: −2 en +4 ATP, netto 2"],key:[true,true,false,true,false,true],
    uitleg:textBox("1 <b>juist</b>: zuurstof neemt aan het eind de H-atomen op; zo ontstaat water.<br>2 <b>juist</b>: alle zes C-atomen van glucose komen in CO₂ terecht.<br>3 <b>onjuist</b>: CO₂ ontstaat in je mitochondriën; het gaat via je bloed naar je longen.<br>4 <b>juist</b>: zonder zuurstof stopt de afbraak in de mitochondriën.<br>5 <b>onjuist</b>: bij melkzuurgisting ontstaat geen CO₂, bij alcoholgisting wel.<br>6 <b>juist</b>.<br><span class=\"muted\">Alles goed 2 punten, één fout 1 punt, meer fouten 0 punten.</span>")});
  q.append(think,ans);
},STOF_ATOM);

const ids=[q8,q9];
if(!VWO){
const STOF_ATP={titel:"ATP: de energiedrager",html:`
<p><b>ATP</b> is de belangrijkste chemische energiebron in een cel. Splitst een cel ATP in <b>ADP en fosfaat</b>, dan komt er energie vrij voor werk: transport, bouwen of bewegen. Omgekeerd kost het energie om van ADP en fosfaat weer ATP te maken.</p>
<p class="muted">ADP + fosfaat + energie ⇄ ATP</p>`,
films:[F.a]};
ids.push(vraag(2,"ATP in een spier",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Beschrijf hoe een spier ATP gebruikt om samen te trekken, en leg uit waarom de ATP in een spier toch niet opraakt, al is de voorraad klein."));
  choiceStep(think,{q:"Welke eiwitten zorgen in een spiervezel voor de beweging?",opts:["myosine en actine","hemoglobine en insuline","katalase en pepsine"],right:0,
    ok:"Ja: myosinekoppen trekken aan actinefilamenten. Wat gebeurt er bij elke slag met ATP?",no:"In elke spiervezel trekt het ene eiwit aan draden van het andere.",
    onDone:()=>choiceStep(think,{q:"Hoe lang zou je kunnen sprinten op alleen de ATP die al in je spier zit?",opts:["ongeveer twee seconden","ongeveer een uur"],right:0,
      ok:"Goed: de voorraad is heel klein. Toch raakt hij in het echt niet op. Hoe kan dat?",no:"De voorraad ATP is erg klein.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Myosinekoppen trekken aan actinefilamenten; bij elke slag wordt <b>één ATP gesplitst in ADP en fosfaat</b> (met die energie komt de kop klaar voor de volgende slag).",
    "De spier <b>maakt ATP steeds opnieuw uit ADP en fosfaat</b> (met energie uit CP of glucose)."],
    model:"In een spiervezel trekken myosinekoppen aan actinefilamenten. Bij elke slag splitst een myosinekop één ATP in ADP en fosfaat; met die energie komt de kop klaar voor de volgende slag. De voorraad ATP is klein, maar de spier maakt steeds opnieuw ATP uit ADP en fosfaat, met energie uit CP of uit glucose. Daardoor raakt de ATP niet op.",
    valkuil:"‘De spier heeft een grote voorraad ATP’ is fout: de voorraad is na ongeveer twee seconden sprinten op. ‘ATP wordt verbrand’ zonder dat ATP weer uit ADP en fosfaat ontstaat: 0 punten voor het tweede element.",
    after:()=>waaromBtn(ans,textBox("Denk aan een oplaadbare batterij: ATP is ‘vol’, ADP + fosfaat is ‘leeg’. Bij elke slag van een myosinekop wordt één ATP leeg. Omdat de spier de lege ADP en fosfaat <b>meteen weer oplaadt</b> (eerst vooral met CP, en vanaf de start ook met energie uit glucose), blijft er genoeg ATP, ook al past er maar voor ongeveer twee seconden in de spier."))});
  q.append(think,ans);
},STOF_ATP));
}else{
const STOF_AER={titel:"Aerobe afbraak",html:`
<p>De glycolyse in het grondplasma levert pyrodruivenzuur. Is er genoeg zuurstof, dan gaat het pyrodruivenzuur vooral verder in een organel: het <b>mitochondrium</b>. Deze route heeft zuurstof nodig: hij is <b>aeroob</b>. Aan het eind is glucose helemaal afgebroken tot CO₂ en water, en zijn er ongeveer dertig ATP per glucose gemaakt.</p>`,
films:[F.a]};
function MITO({stap=0}={}){
  let s=`<ellipse cx="300" cy="115" rx="260" ry="96" fill="var(--surface)" stroke="var(--oker)" stroke-width="3"/>`;
  s+=`<ellipse cx="300" cy="115" rx="238" ry="76" fill="var(--goud-soft)" stroke="var(--oker)" stroke-width="2"/>`;
  [[130,1],[200,0],[270,1],[340,0],[410,1],[470,0]].forEach(([x,boven])=>{const y0=boven?115-76*Math.sqrt(1-((x-300)/238)**2):115+76*Math.sqrt(1-((x-300)/238)**2),tip=boven?y0+48:y0-48;
    s+=`<path d="M${x-7},${y0} L${x-7},${tip} Q${x},${boven?tip+12:tip-12} ${x+7},${tip} L${x+7},${y0}" fill="var(--surface)" stroke="var(--oker)" stroke-width="2"/>`;});
  s+=`<text x="300" y="12" text-anchor="middle" class="lbl">buitenmembraan</text><path d="M300,15 V19" stroke="var(--text2)"/>`;
  s+=`<text x="560" y="36" class="lbl" text-anchor="end">binnenmembraan (geplooid)</text><path d="M500,40 L470,${115-62}" stroke="var(--text2)" stroke-width="1"/>`;
  s+=`<text x="235" y="${stap>=2?150:120}" text-anchor="middle" class="lbl">matrix</text>`;
  if(stap>=1)s+=`<path d="M-30,115 H155" stroke="var(--goud)" stroke-width="2.5" marker-end="url(#mp)"/><text x="-30" y="104" class="lblm">pyrodruivenzuur</text>`;
  if(stap>=2){s+=`<text x="300" y="108" text-anchor="middle" class="lbl" style="fill:var(--groen)">CO₂</text><path d="M318,104 C380,70 500,20 590,6" stroke="var(--groen)" stroke-width="2" fill="none" marker-end="url(#mp)"/><text x="600" y="12" class="lblm">CO₂ naar buiten</text>`;
    s+=`<circle cx="370" cy="130" r="6" fill="var(--goud)"/><circle cx="384" cy="138" r="6" fill="var(--goud)"/><path d="M392,140 C400,150 402,150 403,160" stroke="var(--goud)" stroke-width="2" fill="none" marker-end="url(#mp)"/><text x="300" y="232" text-anchor="middle" class="lblm">H-atomen (via NAD⁺ en FAD) naar het binnenmembraan</text>`;}
  const defs=`<defs><marker id="mp" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--text2)"/></marker></defs>`;
  return FIG("-40 0 720 242",defs+s,"Schematische doorsnede van een mitochondrium",520,640);}
ids.push(vraag(2,"het mitochondrium",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Beschrijf de bouw van een mitochondrium (twee membranen en de ruimte binnenin), en beschrijf wat er in de matrix gebeurt met pyrodruivenzuur."));
  choiceStep(think,{q:"Hoeveel membranen heeft een mitochondrium?",opts:["één","twee","drie"],right:1,
    ok:"Ja. Hoe heet de ruimte binnen het binnenste membraan?",no:"De vraag geeft het al: twee membranen. Hoe heten ze?",
    onDone:()=>choiceStep(think,{q:"Welke stof komt vrij als pyrodruivenzuur in de matrix wordt afgebroken, en die je later uitademt?",opts:["CO₂","O₂","glucose"],right:0,
      ok:"Goed. En wat gebeurt er met de H-atomen die van het pyrodruivenzuur afgaan?",no:"Bij de afbraak van glucose komt een gas vrij dat via je bloed naar je longen gaat.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Een <b>buitenmembraan</b> en een <b>binnenmembraan</b>; de ruimte binnen het binnenmembraan is de <b>matrix</b>.",
    "In de matrix wordt pyrodruivenzuur stap voor stap afgebroken, waarbij <b>CO₂ vrijkomt</b> en <b>H-atomen</b> (via hulpmoleculen) naar het binnenmembraan gaan. Ook goed: decarboxyleren (CO₂ eraf), acetyl-coA en de citroenzuurcyclus, waarbij NAD⁺ en FAD H-atomen opnemen."],
    model:"Een mitochondrium heeft een buitenmembraan en een binnenmembraan; de ruimte binnen het binnenmembraan heet de matrix. In de matrix wordt CO₂ afgesplitst van pyrodruivenzuur (decarboxyleren); wat overblijft, gaat als acetyl-coA de citroenzuurcyclus in. Daarbij komt nog meer CO₂ vrij, en NAD⁺ en FAD nemen H-atomen op, die naar het binnenmembraan gaan.",
    valkuil:"Matrix en binnenmembraan verwisselen: de citroenzuurcyclus is in de matrix, de elektronentransportketen in het binnenmembraan.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Bouw: een buitenmembraan en een sterk geplooid binnenmembraan. De ruimte binnen het binnenmembraan is de matrix.",stap:0},
      {cap:"Pyrodruivenzuur uit de glycolyse komt het mitochondrium in, tot in de matrix.",stap:1},
      {cap:"In de matrix: CO₂ eraf (decarboxyleren), acetyl-coA de citroenzuurcyclus in. CO₂ komt vrij en NAD⁺ en FAD brengen de H-atomen naar het binnenmembraan.",stap:2}],
      (st,s)=>st.innerHTML=MITO(s)))});
  q.append(think,ans);
},STOF_AER));
}
opgave("Glucose","Energie uit glucose","",ids);
}
