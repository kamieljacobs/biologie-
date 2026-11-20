/* ===== Opgave 4: Een half jaar in de ruimte (D01, D02; havo D05, vwo D04 uit eigen/transport.json) ===== */
{
const STOF_AANTAL={titel:"Aanmaak en afbraak van rode bloedcellen",html:`
<p>Een volwassene heeft ongeveer 25 biljoen rode bloedcellen. Elke dag gaat ongeveer een honderdtwintigste deel kapot; het beenmerg maakt er evenveel bij. Zolang aanmaak en afbraak gelijk zijn, blijft het aantal gelijk.</p>
<p>Gaan er meer rode bloedcellen kapot dan het beenmerg maakt, dan daalt het aantal: <b>bloedarmoede</b>. Het bloed kan dan minder zuurstof vervoeren.</p>
<p>Rekenen met machten van tien: 1 miljoen = 10⁶, 1 biljoen = 10¹². Een percentage is deel : geheel × 100 %.</p>`,
films:[F.bloed]};
const q1=vraag(2,"rode bloedcellen tellen",(q,id)=>{
  const {think,ans,unlock}=start(q,"Een volwassene heeft ongeveer 25 biljoen (25 × 10¹²) rode bloedcellen. Stel dat het beenmerg in de ruimte 2 miljoen rode bloedcellen per seconde blijft maken, terwijl er 3 miljoen per seconde kapotgaan. Een dag heeft 86 400 seconden.<br>"+B("Bereken hoeveel procent van de rode bloedcellen er dan na 30 dagen minder is."));
  numStep(think,{uid:"q"+id+"n1",q:"Hoeveel miljoen rode bloedcellen gaan er per seconde <b>netto</b> verloren?",right:1,ok:"Ja: 3 miljoen kapot en 2 miljoen erbij. Reken nu uit hoeveel seconden er in 30 dagen zitten.",no:"Kijk naar het verschil tussen kapotgaan en aanmaken.",
    onDone:()=>numStep(think,{uid:"q"+id+"n2",q:"Hoeveel seconden zitten er in 30 dagen?",right:2592000,ok:"Goed: 2 592 000 seconden. Bereken nu het totale verlies en vergelijk dat met de 25 × 10¹² cellen.",no:"30 × 86 400 = ? (zonder spaties of punten invullen)",onDone:unlock})});
  rekenAnswer(ans,{id,pts:2,right:10.4,marge:0.6,eenheid:"%",label:"afname",deel:["Verlies na 30 dagen juist berekend: 1 × 10⁶ × 86 400 × 30 ≈ 2,6 × 10¹² rode bloedcellen","Met een verkeerd verlies, maar juist doorgerekend naar een percentage (verlies : 25 × 10¹² × 100 %)"],
    model:"netto verlies 1 miljoen per seconde; na 30 dagen 1 × 10⁶ × 86 400 × 30 ≈ 2,6 × 10¹² rode bloedcellen (1 punt). 2,6 × 10¹² : 25 × 10¹² × 100 % ≈ <b>10 %</b> (1 punt). Ook goed: 10,4 %. Bij een rekenfout in de eerste stap en verder juist doorgerekend: alleen het tweede punt.",
    after:()=>waaromBtn(ans,textBox("Het gaat om het <b>verschil</b> tussen afbraak en aanmaak: 3 − 2 = 1 miljoen per seconde. Wie met 3 miljoen rekent, vergeet dat het beenmerg doorwerkt (dan kom je op ongeveer 31 %). Na 30 dagen is er ongeveer een tiende deel minder. Dat past bij de bloedarmoede van een deel van de astronauten na de landing."))});
  q.append(think,ans);
},STOF_AANTAL);

const STOF_EPO={titel:"Bloedvorming en EPO",html:`
<p>Rode bloedcellen worden gemaakt in het <b>rode beenmerg</b>, uit stamcellen. Hoeveel er gemaakt worden, wordt geregeld door een hormoon.</p>
<p>Bij een regeling meet het lichaam iets, en als de waarde te laag of te hoog is, reageert het zo dat de waarde terugkomt. Is het weer goed, dan wordt de reactie kleiner. Zo blijft een waarde in je lichaam ongeveer gelijk.</p>
<p>Een voorbeeld uit de film: hoog in de bergen zit er weinig zuurstof in de lucht, en dus in je bloed. Ook dan reageert het lichaam met deze regeling.</p>`,
films:[F.bloed]};
const q2=vraag(2,"herstel na de landing",(q,id)=>{
  const {think,ans,unlock}=start(q,"Na de landing hadden veel astronauten bloedarmoede, maar na een paar maanden was het aantal rode bloedcellen weer normaal.<br>"+B("Leg uit hoe het lichaam dat herstel regelt. Noem het hormoon en het orgaan dat het maakt."));
  choiceStep(think,{q:"Wat merkt het lichaam van iemand met bloedarmoede?",opts:["het bloed vervoert minder zuurstof","het bloed wordt dikker","de bloeddruk stijgt"],right:0,
    ok:"Ja. Welk orgaan reageert daarop met een hormoon, en wat doet dat hormoon?",no:"Wat is de taak van rode bloedcellen?",
    onDone:()=>choiceStep(think,{q:"Waar werkt het hormoon dat de aanmaak van rode bloedcellen aanzet?",opts:["op de lever","op het rode beenmerg","op de milt"],right:1,
      ok:"Goed. Maak nu de regeling af: wat meet het lichaam, wie maakt het hormoon, wat gebeurt er in het beenmerg, en wat als er weer genoeg zijn?",no:"Waar worden rode bloedcellen gemaakt?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Door de bloedarmoede vervoert het bloed minder zuurstof; bij weinig zuurstof maken de <b>nieren</b> meer <b>EPO</b>.",
    "EPO zet (de stamcellen in) het <b>rode beenmerg</b> aan tot het maken van meer rode bloedcellen; zijn er weer genoeg, dan maken de nieren minder EPO."],
    model:"Met bloedarmoede vervoert het bloed minder zuurstof. De nieren merken dat en maken meer van het hormoon EPO. EPO zet het rode beenmerg aan om meer rode bloedcellen te maken. Als er weer genoeg zijn, maken de nieren minder EPO, en blijft het aantal gelijk.",
    valkuil:"‘Het beenmerg maakt gewoon meer’ zonder hormoon en orgaan: hooguit 1 punt. EPO komt niet uit de lever of het beenmerg zelf, maar uit de nieren.",
    after:()=>waaromBtn(ans,textBox("Weinig zuurstof → nieren maken meer EPO → beenmerg maakt meer rode bloedcellen → meer zuurstof in het bloed → nieren maken minder EPO. Het gevolg remt de oorzaak: zo blijft het aantal rode bloedcellen in balans. Dat herstel duurt maanden, want een nieuwe rode bloedcel moet eerst rijpen."))});
  q.append(think,ans);
},STOF_EPO);

const ids=[q1,q2];
if(!VWO){
const STOF_TROMB={titel:"Stolsels en de weg van het bloed",html:`
<p>Bloed stolt niet alleen bij een wond. Soms ontstaat er in een bloedvat een stolsel zonder wond: <b>trombose</b>. Zo'n stolsel kan een bloedvat afsluiten.</p>
<p>Aders brengen het bloed terug naar het hart, slagaders voeren het van het hart af. Het hart heeft twee helften: de ene pompt bloed door de kleine bloedsomloop, de andere door de grote. Slagaders vertakken onderweg in steeds nauwere vaten, tot de haarvaten.</p>`,
films:[F.bloed,F.pomp]};
ids.push(vraag(2,"een stolsel in de halsader",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Leg uit waardoor een trage of stilstaande stroom in de halsader de kans op een stolsel vergroot, en beschrijf de weg die een losgeraakt stolsel uit de halsader aflegt tot het ergens vast komt te zitten."));
  choiceStep(think,{q:"Waar ontstaat volgens de film vaak een stolsel zonder wond?",opts:["in je been na lang stilzitten","in een slagader die hard stroomt","in de haarvaten van je huid bij warmte"],right:0,
    ok:"Ja. Wat hebben dat been en de halsader van de astronauten gemeen?",no:"Denk aan een lange vliegreis.",
    onDone:()=>choiceStep(think,{q:"Is de halsader een slagader of een ader?",opts:["een ader: hij brengt bloed uit het hoofd naar het hart","een slagader: hij brengt bloed naar de hersenen"],right:0,
      ok:"Goed. Volg nu zelf de weg van het stolsel vanaf de halsader: via welke holtes van het hart en welk bloedvat gaat het, en waar worden de vaten zo nauw dat het vast komt te zitten?",no:"Lees de inleiding nog eens: wat doet de linker halsader met het bloed uit het hoofd?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "In stilstaand of traag stromend bloed kan gemakkelijker een stolsel ontstaan zonder wond (trombose), zoals in het been na lang stilzitten.",
    "Het stolsel gaat via de <b>bovenste holle ader</b> naar de <b>rechterboezem</b> en <b>rechterkamer</b> en dan de <b>longslagader</b> in, waar het in een (kleiner) bloedvat in de longen vast komt te zitten. Een route via de linkerharthelft of de aorta: 0 punten voor dit element."],
    model:"In bloed dat traag stroomt of stilstaat, kan gemakkelijk een stolsel ontstaan zonder wond, net als in je been na lang stilzitten: trombose. Raakt het los, dan gaat het met het bloed mee via de bovenste holle ader naar de rechterboezem en de rechterkamer, en dan de longslagader in. Die vertakt in steeds kleinere vaten; in een klein bloedvat in de longen loopt het vast.",
    valkuil:"De route via de linkerkamer en de aorta naar de hersenen is fout: bloed uit een ader komt eerst in de rechterharthelft en gaat naar de longen.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Het stolsel raakt los in de halsader en gaat mee met het bloed naar beneden: de <b>bovenste holle ader</b> in.",hl:["holle","lichaam"],stip:[120,250]},
      {cap:"Het komt in de <b>rechterboezem</b> en wordt naar de <b>rechterkamer</b> geduwd.",hl:["RB","RK"],stip:[272,280]},
      {cap:"De rechterkamer pompt het de <b>longslagader</b> in.",hl:["longslagader"],stip:[170,140]},
      {cap:"De longslagader vertakt in steeds kleinere vaten. In een klein bloedvat in de <b>longen</b> loopt het stolsel vast. Het komt dus niet in de linkerharthelft of de aorta.",hl:["longen"],stip:[260,50]}],
      (st,s)=>st.innerHTML=CIRC({hl:s.hl,stip:s.stip})))});
  q.append(think,ans);
},STOF_TROMB));
}else{
const STOF_BARO={titel:"De bloeddruk geregeld",html:`
<p>Voor vwo: in de wand van de aortaboog en de halsslagaders zitten <b>drukreceptoren</b> (baroreceptoren). Die meten hoe ver de wand uitrekt en sturen impulsen naar een regelcentrum in het <b>verlengde merg</b>, in de hersenstam.</p>
<p>Voorbeeld uit de film: sta je snel op, dan zakt er bloed naar je benen en daalt de druk naar je hoofd. De wand rekt minder uit en de drukreceptoren sturen minder impulsen. Het regelcentrum zet het hart sneller en vernauwt de kleine slagaders in benen en buik. De druk stijgt weer. Het gevolg remt de oorzaak: <b>negatieve terugkoppeling</b>.</p>`,
films:[F.regel]};
ids.push(vraag(2,"de drukreceptoren in de ruimte",(q,id)=>{
  const {think,ans,unlock}=start(q,"In de ruimte zit er meer bloed in het bovenlichaam dan op aarde, en het slagvolume is groter. De drukreceptoren in de halsslagaders en de aortaboog merken dat.<br>"+B("Leg uit hoe de regeling van de bloeddruk hierop reageert. Beschrijf wat er gebeurt met de impulsen van de drukreceptoren, met de hartfrequentie en met de kleine slagaders."));
  choiceStep(think,{q:"Wat meten de drukreceptoren eigenlijk?",opts:["hoeveel zuurstof er in het bloed zit","hoe ver de wand van het bloedvat uitrekt","hoe snel het hart klopt"],right:1,
    ok:"Ja. Wat gebeurt er met die wand als er meer bloed in het bovenlichaam zit en er per slag meer bloed de aorta in gaat?",no:"Het zijn drukreceptoren in de wand van de slagader.",
    onDone:()=>choiceStep(think,{q:"Bij snel opstaan daalt de druk naar het hoofd. Hoe reageert de regeling dan?",opts:["het hart sneller en de kleine slagaders nauwer","het hart langzamer en de kleine slagaders wijder"],right:0,
      ok:"Goed, dat staat ook in de uitleg van de stof. In de ruimte is de situatie andersom. Redeneer nu de drie stappen voor de astronaut.",no:"Het lichaam wil de druk weer omhoog krijgen. Wat helpt daarbij?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "De wand van de halsslagaders en aortaboog rekt verder uit, dus de drukreceptoren sturen <b>meer impulsen</b> naar het (regelcentrum in het) verlengde merg.",
    "Het regelcentrum laat het hart <b>langzamer</b> kloppen en de kleine slagaders (in benen en buik) <b>verwijden</b>, zodat de druk daalt (negatieve terugkoppeling)."],
    model:"Doordat er meer bloed in het bovenlichaam zit en het slagvolume groter is, rekt de wand van de halsslagaders en de aortaboog verder uit. De drukreceptoren sturen meer impulsen naar het regelcentrum in het verlengde merg. Dat laat het hart langzamer kloppen en de kleine slagaders in benen en buik verwijden. Daardoor daalt de druk weer: negatieve terugkoppeling.",
    valkuil:"‘De drukreceptoren zorgen dat het hart sneller gaat’ is precies de reactie bij snel opstaan, niet bij een te hoge druk.",
    after:()=>waaromBtn(ans,textBox("Het is het spiegelbeeld van snel opstaan uit de film. Daar: minder rek → minder impulsen → hart sneller, vaten nauwer → druk omhoog. In de ruimte: meer rek → meer impulsen → hart langzamer, vaten wijder → druk omlaag. In beide gevallen remt het gevolg de oorzaak."))});
  q.append(think,ans);
},STOF_BARO));
}

opgave("Ruimte","Een half jaar in de ruimte",`
<p>Astronauten verblijven vaak een half jaar in het ruimtestation ISS. Zonder zwaartekracht verandert er veel in hun bloedsomloop. Bij onderzoek bleek dat astronauten in de ruimte een opgezwollen gezicht en dunnere benen, een groter slagvolume en minder bloedplasma hadden dan op aarde. Bij 6 van de 11 onderzochte astronauten stroomde het bloed in de linker halsader (een ader die bloed uit het hoofd afvoert) heel traag, stond het stil of stroomde het zelfs terug. Bij één astronaut ontstond in die ader een bloedstolsel.</p>
<p>Ander onderzoek, bij 14 astronauten, ging over rode bloedcellen. Op aarde gaan er bij een volwassene ongeveer 2 miljoen rode bloedcellen per seconde kapot, en maakt het beenmerg er evenveel bij. In de ruimte gingen er ongeveer 3 miljoen per seconde kapot. Van 13 astronauten bij wie na de landing bloed werd geprikt, hadden er 5 bloedarmoede. Na drie tot vier maanden op aarde was dat hersteld.</p>`,ids);
}
