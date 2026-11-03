/* ===== Opgave 5: Hoe betrouwbaar? Anticonceptie en soa's (nieuw; film 5, vwo ook film 3) ===== */
{
const TAB1=TABEL(1,["methode","normaal gebruik","perfect gebruik"],[
  ["staafje in de arm","&lt; 1","&lt; 1"],["spiraaltje (hormoon of koper)","&lt; 1","&lt; 1"],["sterilisatie (man of vrouw)","&lt; 1","&lt; 1"],
  ["prikpil","4","&lt; 1"],["pil","7","&lt; 1"],["ring","7","&lt; 1"],["condoom","13","2"]],
  "Percentage vrouwen dat in het eerste jaar van gebruik toch zwanger wordt. Bron: Guttmacher Institute (factsheet), naar Contraceptive Technology, 21e druk (2018).");
const STOF_KETEN={titel:"Anticonceptie: een schakel uit de keten",html:`
<p>Een zwangerschap is een keten: een <b>eicel komt vrij</b> → een <b>zaadcel bereikt en bevrucht</b> haar → het <b>embryo nestelt zich</b> in de baarmoeder. Anticonceptie haalt één schakel uit die keten.</p>
<p>De <b>Pearl-index</b> geeft aan hoeveel van de honderd vrouwen in een jaar toch zwanger worden. Perfect gebruik = precies volgens de regels; normaal gebruik = zoals mensen het echt doen, met fouten.</p>`,
films:FV(F.anti,F.baby)};

const a1=vraag(2,"prikpil of pil",(q,id)=>{
  pre(q,"<p>De pil en de prikpil bevatten allebei hormonen die de eisprong remmen. De pil slik je elke dag; de prikpil is een injectie met een progestageen die je elke 12 weken krijgt.</p>");
  const {think,ans,unlock}=start(q,B("Leg met tabel 1 uit waardoor de prikpil bij normaal gebruik betrouwbaarder is dan de pil, terwijl ze bij perfect gebruik even betrouwbaar zijn."));
  choiceStep(think,{q:"Wat laat de kolom ‘perfect gebruik’ zien over de pil en de prikpil?",opts:["de hormonen van allebei remmen de eisprong even goed","de prikpil werkt veel sterker","de pil werkt alleen bij perfect gebruik"],right:0,
    ok:"Ja: allebei minder dan 1. Het verschil ontstaat dus pas bij normaal gebruik. Waar gaat het dan mis?",no:"Kijk naar de getallen in de laatste kolom: verschillen ze?",
    onDone:()=>choiceStep(think,{q:"Bij welke methode kun je het vaakst een fout maken?",opts:["bij de pil: elke dag een moment om hem te vergeten","bij de prikpil: elke 12 weken een moment"],right:0,
      ok:"Goed. Zet die twee dingen in je uitleg.",no:"Tel hoe vaak je er per jaar zelf aan moet denken.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Bij perfect gebruik is het percentage bij allebei <b>kleiner dan 1</b>: de hormonen werken even goed.",
    "De pil moet je <b>elke dag</b> nemen, de prikpil krijg je maar <b>eens per 12 weken</b>: er zijn veel minder momenten om iets te vergeten, dus minder fouten bij normaal gebruik (4 tegen 7)."],
    model:"Bij perfect gebruik worden er bij allebei minder dan 1 op de 100 vrouwen zwanger, dus de hormonen werken even goed. Bij normaal gebruik gaat het mis door vergeten. De pil moet je elke dag nemen, de prikpil maar eens per 12 weken, dus bij de prikpil zijn er veel minder kansen op een fout: 4 in plaats van 7.",
    valkuil:"‘De prikpil bevat meer hormoon en werkt daarom beter’: de kolom perfect gebruik laat zien dat dat niet de verklaring is."});
  q.append(think,ans);
},STOF_KETEN);

const a2=vraag(2,"welke schakel?",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Geef bij elke methode aan welke schakel van de keten vooral wordt onderbroken."));
  seqStep(think,{q:"Zet eerst de schakels van de keten in de goede volgorde.",items:["een eicel komt vrij","een zaadcel bereikt en bevrucht de eicel","het embryo nestelt zich"],shown:[1,2,0],
    ok:"Goed. Bedenk nu bij elke methode wat hij precies tegenhoudt.",onDone:unlock});
  const S=["geen eisprong","zaadcel bereikt de eicel niet","geen innesteling"];
  selectAnswer(ans,{id,uid:"q"+id,rows:[["pil",S,0],["condoom",S,1],["hormoonspiraaltje",S,1],["morning-afterpil",S,0]],score:n=>n===4?2:n===3?1:0,
    after:()=>waaromBtn(ans,textBox("Pil: remt de eisprong. Condoom: houdt zaadcellen tegen. Hormoonspiraaltje: maakt de slijmprop in de baarmoederhals taai, zodat zaadcellen er niet door komen. Morning-afterpil: <b>stelt de eisprong uit</b>; het is geen abortuspil en hij werkt niet meer als de eisprong al geweest is. Vier goed: 2 punten, drie goed: 1 punt."))});
  q.append(think,ans);
},STOF_KETEN);

const STOF_SOA={titel:"Soa's: bacterie of virus",html:`
<p>Gonorroe, chlamydia en syfilis worden veroorzaakt door een <b>bacterie</b>; die zijn te genezen met antibiotica. Antibiotica grijpen aan op onderdelen die bij bacteriën anders zijn dan bij ons, zoals hun celwand of hun ribosomen.</p>
<p>Hiv, HPV, herpes en hepatitis B zijn <b>virussen</b>. Een virus vermenigvuldigt zich in je eigen cellen; antibiotica doen daar niets tegen. Tegen sommige virussen bestaat een <b>vaccin</b>, bijvoorbeeld tegen HPV en hepatitis B.</p>
<p>Veel soa's geven geen klachten. Van al deze anticonceptiemethodes beschermt alleen het condoom ook tegen soa's.</p>`,
films:FV(F.anti,F.baby)};
const ids=[a1,a2];
if(!VWO){
ids.push(vraag(2,"de HPV-prik ook voor jongens",(q,id)=>{
  pre(q,"<p>Sinds 2022 krijgen in Nederland niet alleen meisjes, maar ook jongens een uitnodiging voor de HPV-prik. Volgens het RIVM kan HPV kanker veroorzaken van de mond en keel, de penis, de anus, de vagina, de vulva en de baarmoederhals.</p>");
  const {think,ans,unlock}=start(q,B("Geef twee redenen waarom het zinvol is om ook jongens tegen HPV te vaccineren."));
  choiceStep(think,{q:"Kan HPV bij een man zelf ook kanker veroorzaken?",opts:["nee, alleen baarmoederhalskanker","ja, bijvoorbeeld van de penis, de anus of de keel"],right:1,
    ok:"Ja, dat is één reden. HPV is een soa: wat betekent een gevaccineerde jongen voor zijn partners?",no:"Lees de opsomming van het RIVM nog eens.",
    onDone:()=>choiceStep(think,{q:"Een gevaccineerde jongen raakt minder vaak besmet met HPV. Wat betekent dat voor anderen?",opts:["niets, hij kan het nog even vaak doorgeven","hij geeft HPV minder vaak door aan partners"],right:1,
      ok:"Goed. Noem beide redenen.",no:"Wie niet besmet raakt, kan het virus ook niet doorgeven.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "HPV kan bij jongens en mannen <b>zelf kanker</b> veroorzaken (van penis, anus, mond of keel); de prik beschermt henzelf.",
    "Gevaccineerde jongens raken minder vaak besmet en <b>geven HPV minder door</b> aan hun partners (en zo bijvoorbeeld minder baarmoederhalskanker)."],
    model:"Ten eerste kan HPV ook bij mannen kanker veroorzaken, bijvoorbeeld van de penis, de anus of de keel; de prik beschermt de jongen zelf. Ten tweede is HPV een soa: een gevaccineerde jongen raakt minder vaak besmet en kan het virus dus ook minder vaak doorgeven aan een partner.",
    valkuil:"‘Jongens kunnen baarmoederhalskanker krijgen’ is fout. ‘Met antibiotica is HPV niet te genezen’ is waar, maar geen reden om juist jongens te vaccineren."});
  q.append(think,ans);
},STOF_SOA));
}
const STOF_RES={titel:"Mutatie en selectie",html:`
<p>In elke populatie ontstaan door toeval <b>mutaties</b>: veranderingen in het DNA, die worden doorgegeven aan de nakomelingen.</p>
<p>Bij <b>natuurlijke selectie</b> overleven en vermenigvuldigen de individuen met een gunstige eigenschap zich meer dan de andere. Zo neemt die eigenschap in de populatie toe. Selectie maakt geen nieuwe eigenschappen: ze bepaalt welke overblijven.</p>`,
films:[F.anti]};
if(VWO)ids.push(vraag(2,"gonorroe wordt resistent",(q,id)=>{
  pre(q,"<p>Bij gonorroe dreigt een probleem: er is bijna nog maar één soort antibioticum dat overal goed werkt. Artsen houden daarom goed in de gaten of de bacterie ook daar resistent tegen wordt.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit hoe een groep gonorroebacteriën resistent kan worden tegen een antibioticum."));
  choiceStep(think,{q:"Waardoor is een enkele bacterie in het begin al resistent?",opts:["door een toevallige mutatie in zijn DNA","doordat hij went aan het antibioticum","doordat het antibioticum de mutatie veroorzaakt"],right:0,
    ok:"Ja: de mutatie was er al vóór de kuur. Wat doet de kuur dan met de groep?",no:"Een bacterie kan niet ‘wennen’ of zich bewust aanpassen. Waar komen nieuwe eigenschappen van bacteriën vandaan?",
    onDone:()=>choiceStep(think,{q:"Wat gebeurt er tijdens een kuur?",opts:["alle bacteriën sterven even snel","de gevoelige bacteriën sterven; de resistente overleven en vermenigvuldigen zich"],right:1,
      ok:"Goed. Twee stappen: ontstaan door mutatie, toenemen door selectie.",no:"Het antibioticum werkt alleen op gevoelige bacteriën.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Door een toevallige <b>mutatie</b> zijn een paar bacteriën ongevoelig (resistent) voor het antibioticum.",
    "Het antibioticum doodt de gevoelige bacteriën; de resistente <b>overleven en vermenigvuldigen zich</b> (selectie), zodat de groep steeds meer uit resistente bacteriën bestaat."],
    model:"In de groep zitten door toevallige mutaties een paar bacteriën die ongevoelig zijn voor het antibioticum. De kuur doodt de gevoelige bacteriën. De resistente bacteriën blijven over en vermenigvuldigen zich, en geven de mutatie door. Zo ontstaat een groep die bijna helemaal resistent is.",
    valkuil:"‘De bacteriën wennen aan het antibioticum’ of ‘het antibioticum zorgt voor de mutatie’ is fout: de mutatie ontstaat toevallig, het antibioticum selecteert alleen."});
  q.append(think,ans);
},STOF_RES));

opgave("Anticonceptie","Hoe betrouwbaar? Anticonceptie en soa's",`
<p>Een meisje wil voorlopig niet zwanger worden en gaat naar de huisarts. Die laat haar een tabel zien met hoeveel vrouwen in het eerste jaar toch zwanger worden met een bepaalde methode (tabel 1). Daarbij is er verschil tussen perfect gebruik (altijd precies volgens de regels) en normaal gebruik (zoals mensen het in het echt doen).</p>
<p>De huisarts zegt er ook bij: ‘Geen van deze methodes beschermt je tegen soa's, behalve het condoom.’</p>
${TAB1}`,ids);
}
