/* ===== Opgave 4: Muizen zonder thymus (eigen vragen D01, D03, D04, vwo + D05) ===== */
{
const STOF_LYM={titel:"Witte bloedcellen en virussen",html:`
<p>Al je bloedcellen ontstaan in het <b>beenmerg</b>. Bij de witte bloedcellen horen de <b>fagocyten</b> (aspecifieke afweer) en de <b>lymfocyten</b>: B-cellen en T-cellen (specifieke afweer).</p>
<p>Afweer met antistoffen heet <b>humoraal</b>: antistoffen werken in bloed en weefselvocht, dus alleen buiten de cellen. Afweer met cellen die andere cellen doden, heet <b>cellulair</b>.</p>
<p>Een <b>virus</b> kan zich niet zelf vermenigvuldigen. Het brengt zijn erfelijk materiaal in een cel; die cel maakt dan nieuwe virusdeeltjes, die vrijkomen en buurcellen infecteren.</p>`,
films:[F.tc,F.as]};

const q1=vraag(2,"geen thymus, geen T-cellen",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Leg uit waardoor naaktmuizen bijna geen T-cellen hebben, terwijl ze evenveel B-cellen hebben als gewone muizen."));
  choiceStep(think,{q:"Waar ontstaan B-cellen en T-cellen?",opts:["allebei in het beenmerg","B-cellen in het beenmerg, T-cellen in de thymus","allebei in de thymus"],right:0,
    ok:"Ja. Het verschil zit dus niet in het ontstaan. Wat ontbreekt er bij een naaktmuis?",no:"Je beenmerg maakt al je bloedcellen, ook alle witte.",
    onDone:()=>choiceStep(think,{q:"De T in T-cel komt van een orgaan. Welk?",opts:["de thymus","de tong","de teelbal"],right:0,
      ok:"Goed. Wat moet er met een jonge T-cel in dat orgaan gebeuren? En heeft een B-cel die stap nodig?",no:"Lees de inleiding: welk orgaan heeft een naaktmuis niet?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "T-cellen ontstaan in het beenmerg, maar <b>rijpen in de thymus</b>; zonder thymus rijpen er (bijna) geen T-cellen.",
    "B-cellen ontstaan (en rijpen) in het <b>beenmerg</b> en hebben de thymus niet nodig."],
    model:"T-cellen ontstaan in het beenmerg, maar moeten rijpen in de thymus. Een naaktmuis heeft geen thymus, dus rijpen er bijna geen T-cellen. B-cellen ontstaan en rijpen in het beenmerg en hebben de thymus niet nodig; daarom heeft een naaktmuis er evenveel als een gewone muis.",
    valkuil:"‘T-cellen worden gemaakt in de thymus’ is niet goed genoeg voor het eerste punt: ze ontstaan in het beenmerg en rijpen in de thymus."});
  q.append(think,ans);
},STOF_LYM);

const q2=vraag(2,"rekenen aan een virusfabriek",(q,id)=>{
  pre(q,"<p>Een naaktmuis wordt besmet met een virus. In elke geïnfecteerde cel ontstaan na 8 uur 50 nieuwe virusdeeltjes, die vrijkomen en elk één nieuwe cel infecteren. Op tijdstip 0 is één cel geïnfecteerd.</p>");
  const {think,ans,unlock}=start(q,B("Bereken na hoeveel uur er voor het eerst meer dan 100 000 cellen geïnfecteerd raken, als het virus niet wordt tegengehouden. Schrijf je berekening op."));
  numStep(think,{uid:"q"+id+"n1",q:"Hoeveel cellen raken na 8 uur nieuw geïnfecteerd?",right:50,
    ok:"Ja. Elk van die 50 cellen maakt na nog eens 8 uur óók 50 virusdeeltjes.",no:"Eén cel maakt 50 virusdeeltjes, en elk deeltje infecteert één cel.",
    onDone:()=>numStep(think,{uid:"q"+id+"n2",q:"Hoeveel cellen raken na 16 uur nieuw geïnfecteerd?",right:2500,
      ok:"Goed. Reken zo door, ronde na ronde, tot je boven de 100 000 komt.",no:"50 cellen maken elk 50 virusdeeltjes.",onDone:unlock})});
  rekenAnswer(ans,{id,fields:[
    ["aantal cellen dat in die ronde (nieuw) geïnfecteerd raakt","cellen",v=>v===125000||v===127550||v===127551,"125 000 nieuw geïnfecteerde cellen (2500 × 50). Alle rondes opgeteld (127 550) is ook goed."],
    ["na hoeveel uur","uur",v=>v===24,"na 24 uur (8 → 50, 16 → 2500, 24 → 125 000)"]],
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Tijdstip 0: één geïnfecteerde cel."},
      {cap:"Na 8 uur: 1 × 50 = 50 nieuw geïnfecteerde cellen."},
      {cap:"Na 16 uur: 50 × 50 = 2500. Nog onder de 100 000."},
      {cap:"Na 24 uur: 2500 × 50 = 125 000. Voor het eerst meer dan 100 000, dus het antwoord is <b>24 uur</b>. Zonder T-cellen groeit de infectie zo in één dag enorm."}],
      (st,s,i)=>st.innerHTML=RONDES(i)))});
  q.append(think,ans);
},STOF_LYM);

const q3=vraag(2,"wie stopt de virusfabriek?",(q,id)=>{
  pre(q,"<p>Gewone muizen stoppen een infectie met dit virus binnen ongeveer een week. Bij naaktmuizen gaat de infectie door, ook al hebben ze evenveel fagocyten.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit welke cellen bij gewone muizen de virusfabriek stoppen, en waarom de fagocyten van de naaktmuis dat niet kunnen."));
  choiceStep(think,{q:"Kunnen antistoffen een virus bereiken dat al in een cel zit?",opts:["ja","nee"],right:1,
    ok:"Klopt. Om de fabriek te stoppen moet de hele geïnfecteerde cel weg. Hoe kan je afweer zien welke cel geïnfecteerd is?",no:"Antistoffen werken in bloed en weefselvocht, buiten de cellen.",
    onDone:()=>choiceStep(think,{q:"Wat laat een geïnfecteerde cel op zijn oppervlak zien?",opts:["stukjes virus","antistoffen","niets: hij ziet er gewoon uit"],right:0,
      ok:"Goed. Welke cellen herkennen zo'n stukje virus op een cel, en welke cellen heeft een naaktmuis bijna niet (tabel 2)?",no:"Een geïnfecteerde cel maakt viruseiwitten. Waar komen stukjes van terecht?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Bij gewone muizen <b>doden T-killercellen de geïnfecteerde cellen</b> (die stukjes virus laten zien), zodat er geen nieuwe virussen meer worden gemaakt (cellulaire afweer).",
    "Fagocyten <b>herkennen geen cellen met virus erin</b> / kunnen het virus niet uit de cel halen; ze eten alleen losse virussen en resten op, en de naaktmuis heeft <b>geen T-killercellen</b>."],
    model:"Een geïnfecteerde cel laat stukjes virus op zijn oppervlak zien. Bij gewone muizen herkennen T-killercellen die cellen en doden ze, zodat er geen nieuwe virussen meer worden gemaakt. Fagocyten herkennen geen cellen met virus erin en kunnen het virus niet uit een cel halen; ze ruimen alleen losse virussen en resten op. De naaktmuis heeft bijna geen T-cellen, dus ook geen T-killercellen.",
    valkuil:"‘De naaktmuis heeft geen antistoffen’ verklaart niet waarom de virusfabriek doorgaat: antistoffen kunnen niet bij het virus in de cel."});
  q.append(think,ans);
},STOF_LYM);

const ids=[q1,q2,q3];
if(VWO){
ids.push(vraag(2,"rattenhuid op een muis (vwo)",(q,id)=>{
  pre(q,"<p>Onderzoekers plaatsen een stukje huid van een rat op de rug van een gewone muis en op de rug van een naaktmuis. Bij de gewone muis is het stukje huid na ongeveer tien dagen afgestoten; bij de naaktmuis groeit het vast.</p>");
  const {think,ans,unlock}=start(q,B("Leg dit verschil uit."));
  choiceStep(think,{q:"Bij de gewone muis duurt het ongeveer tien dagen voordat de huid is afgestoten. Welk deel van de afweer past daarbij?",opts:["de specifieke afweer, die eerst op gang moet komen","de aspecifieke afweer, die er meteen is"],right:0,
    ok:"Ja. Waaraan kan de specifieke afweer zien dat levende cellen van een rat niet van de muis zelf zijn?",no:"Fagocyten en barrières werken binnen uren. Welke afweer heeft meer tijd nodig?",
    onDone:()=>choiceStep(think,{q:"Kijk in tabel 2. Welke cellen heeft de naaktmuis bijna niet?",opts:["T-cellen","B-cellen","fagocyten"],right:0,
      ok:"Goed. Bedenk welke afweercellen naar het oppervlak van andere cellen kijken. Leg nu het verschil tussen de twee muizen uit.",no:"Vergelijk de twee kolommen van tabel 2.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "De cellen van de rattenhuid hebben <b>MHC-eiwitten die anders zijn</b> dan die van de muis (vreemd).",
    "De <b>T-cellen</b> van de gewone muis herkennen die vreemde MHC en vallen het weefsel aan; de naaktmuis heeft (bijna) <b>geen T-cellen</b>."],
    model:"De cellen van de rattenhuid hebben andere MHC-eiwitten dan de muis. De T-cellen van de gewone muis zien die MHC als vreemd en vallen de huid aan, zodat die wordt afgestoten. De naaktmuis heeft bijna geen T-cellen, dus wordt de huid niet aangevallen en groeit hij vast.",
    valkuil:"‘De naaktmuis maakt geen antistoffen tegen de huid’ levert geen punt op voor het tweede element: afstoting van weefsel gaat via T-cellen. Noem ook dát de rattenhuid anders is (andere MHC-eiwitten) voor het eerste punt."});
  q.append(think,ans);
},{titel:"Eigen en vreemd herkennen (vwo)",html:`
<p>Bijna al je cellen laten op hun oppervlak stukjes zien van de eiwitten die ze maken, in houders: <b>MHC-eiwitten</b>. <b>MHC-I</b> zit op al je cellen met een kern; daar kijken T-killercellen naar. <b>MHC-II</b> zit alleen op antigeenpresenterende cellen; daar kijken T-helpercellen naar.</p>
<p>In de thymus worden T-cellen die op je eigen stoffen reageren uitgeschakeld.</p>`,films:[F.tc]}));
}

opgave("Muizen zonder thymus","Muizen zonder thymus",`
<p>Naaktmuizen zijn muizen met een mutatie waardoor ze geen haar hebben én geen thymus. Ze worden veel gebruikt in laboratoriumonderzoek.</p>
<p>Onderzoekers vergeleken gewone muizen en naaktmuizen. Ze telden de witte bloedcellen in het bloed. Daarna spoten ze de muizen in met een onschadelijk eiwit X, dat de muizen nooit eerder in hun lichaam hadden gehad. Na 14 dagen maten ze de antistoffen tegen eiwit X. De resultaten staan in tabel 2.</p>
${TABEL("2 (fictieve gegevens)",["","gewone muis","naaktmuis"],[["T-cellen per microliter bloed","2000","40"],["B-cellen per microliter bloed","1500","1500"],["fagocyten per microliter bloed","3000","3000"],["antistoffen tegen eiwit X na 14 dagen (relatief)","100","4"]])}`,ids);
}

/* ===== Opgave 5 (alleen havo): Bacteriën, virussen en T-cellen (eigen vraag NC30; de vwo-oefentoets heeft hem niet) ===== */
if(!VWO){
const STOF_AB={titel:"Antibiotica en resistentie",html:`
<p><b>Antibiotica</b> zijn medicijnen tegen bacteriën. Je kunt ze slikken zonder dat je eigen cellen kapotgaan, omdat ze iets remmen wat bacteriën wel hebben en jouw cellen niet.</p>
<p>Slik je antibiotica, dan sterven de gevoelige bacteriën. Een paar bacteriën zijn door een toevallige mutatie ongevoelig. Die blijven over en vermenigvuldigen zich: zo ontstaat <b>resistentie</b>. Niet jij wordt ongevoelig, maar de bacteriën.</p>
<p>Tegen sommige virussen bestaan andere medicijnen, bijvoorbeeld <b>hiv-remmers</b>.</p>`,
films:[F.tc,F.ev]};
const q1=vraag(2,"antibiotica: wel tegen bacteriën, niet tegen griep",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Leg uit waarom antibiotica wel helpen tegen een longontsteking door een bacterie, maar niet tegen griep. Noem in je antwoord een verschil in bouw tussen een bacterie en een virus."));
  chipsStep(think,{q:"Welke onderdelen heeft een bacterie? Kies alles wat klopt.",items:[["een celwand",1],["eigen ribosomen",1],["een eigen stofwisseling",1],["een kern met een kernmembraan",0]],
    ok:"Goed. Welke van die onderdelen heeft een griepvirus?",no:"Een bacterie is een cel, maar zonder kern.",
    onDone:()=>choiceStep(think,{q:"Waar vermenigvuldigt een griepvirus zich?",opts:["in jouw eigen cellen","zelfstandig, in het slijm van je luchtwegen"],right:0,
      ok:"Goed. Combineer nu: wat remmen antibiotica, en heeft een virus dat?",no:"Een virus kan zich niet zelf vermenigvuldigen.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Antibiotica <b>remmen onderdelen van bacteriën</b>, zoals het bouwen van de celwand (of de eigen ribosomen / stofwisseling).",
    "Een <b>virus is geen cel</b>: het heeft geen celwand en geen eigen stofwisseling (alleen een eiwitmantel met erfelijk materiaal) en vermenigvuldigt zich in jouw cellen, dus er is <b>niets om te remmen</b>."],
    model:"Een bacterie is een cel met een celwand, eigen ribosomen en een eigen stofwisseling. Antibiotica remmen zulke onderdelen, bijvoorbeeld het bouwen van de celwand. Een griepvirus is geen cel: het is een eiwitmantel met erfelijk materiaal, zonder celwand en zonder eigen stofwisseling. Het vermenigvuldigt zich in jouw cellen. Er is dus niets wat antibiotica kunnen remmen.",
    valkuil:"‘Griepvirussen zijn resistent geworden’: 0 punten. Antibiotica hebben nooit tegen virussen gewerkt."});
  q.append(think,ans);
},STOF_AB);
opgave("Bacteriën en virussen","Bacteriën, virussen en T-cellen",GEEN_INLEIDING,[q1]);
}
