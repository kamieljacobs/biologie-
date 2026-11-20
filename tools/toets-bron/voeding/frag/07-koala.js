/* ===== Opgave 7: Een jonge koala eet pap (havo C1–C4, vwo C2, C3, C5; film 6, ook 2 en 3) =====
   Bron context: Australian Geographic, juli 2022, 'Pap not poop'; de situaties in de opvang zijn bedacht. */
{
const STOF_MB={titel:"Het microbioom",html:`
<p>In je darm leven ongeveer veertig biljoen bacteriën, van honderden soorten. Al die micro-organismen samen heten je <b>microbioom</b>. Ze leven in de darminhoud en in de slijmlaag op de wand, buiten je weefsel. Je wordt er niet ziek van.</p>
<p>Jij en je darmbacteriën hebben allebei voordeel van het samenleven: <b>mutualisme</b>. Zij krijgen een warme plek en eten; jij krijgt er iets voor terug.</p>`,
films:[F.bact]};
const STOF_AB={titel:"Wat een antibioticum doet",html:`
<p>Een <b>antibioticum</b> is een stof die bacteriën doodt of hun groei remt. Het werkt op onderdelen die bacteriën wel hebben en dier- en mensencellen niet, zoals de celwand van een bacterie. Daarom kun je een dier of mens met antibiotica behandelen tegen een bacteriële infectie.</p>
<p>Tegen virussen werkt een antibioticum niet: een virus heeft geen eigen cel.</p>`,
films:[F.bact]};
const STOF_LACT={titel:"Suikers knippen en opnemen",html:`
<p>Melk bevat melksuiker: <b>lactose</b>. Dat is een disacharide: twee suikers aan elkaar. Alleen losse suikers (monosachariden) kunnen door de darmwand worden opgenomen. Daarvoor knipt het enzym <b>lactase</b> uit de wand van de dunne darm lactose in glucose en galactose.</p>
<p>Waar stoffen de darmwand in gaan, gaat water mee, door osmose. Elke dag komt er veel vocht in je darmen; normaal wordt bijna al dat water weer teruggenomen.</p>`,
films:[F.enz,F.bact]};

const ids=[];
if(!VWO)ids.push(vraag(2,"afvallen na een antibioticakuur",(q,id)=>{
  pre(q,"<p>Een volwassen koala in een opvang krijgt een lange antibioticakuur tegen een infectie (bedachte situatie). Na de kuur eet hij gewoon bladeren, maar hij valt af.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit hoe de kuur kan leiden tot het afvallen."));
  choiceStep(think,{q:"Op welke organismen werkt een antibioticum?",opts:["op bacteriën","op virussen","op de cellen van de koala zelf"],right:0,
    ok:"Ja. Bedenk welke bacteriën er allemaal in een koala leven, niet alleen die van de infectie.",no:"Antibiotica werken niet tegen virussen.",
    onDone:()=>choiceStep(think,{q:"Waaruit bestaan eucalyptusbladeren voor een groot deel?",opts:["uit vezels, zoals cellulose","uit eiwit","uit vet"],right:0,
      ok:"Goed. Bedenk wie in de koala die vezels afbreekt, en verbind dat met het afvallen.",no:"Lees de eerste zinnen van de inleiding nog eens.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Een antibioticum doodt bacteriën en kiest niet: het doodt ook veel <b>darmbacteriën</b> van de koala.",
    "Zonder die bacteriën worden de <b>vezels (cellulose) niet meer afgebroken</b>; de koala haalt veel <b>minder energie</b> uit de bladeren."],
    model:"Het antibioticum doodt niet alleen de bacteriën van de infectie, maar ook een groot deel van de darmbacteriën. Juist die bacteriën breken de vezels uit de eucalyptusbladeren af. Zonder hen haalt de koala veel minder energie uit hetzelfde eten, en daardoor valt hij af."});
  q.append(think,ans);
},STOF_AB));

ids.push(vraag(2,"diarree van koemelk",(q,id)=>{
  pre(q,"<p>Een verzorger geeft een jong koala zonder moeder koemelk (bedachte situatie). Het jong maakt weinig lactase en krijgt diarree.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit hoe de diarree ontstaat."));
  choiceStep(think,{q:"Wat is het substraat van lactase?",opts:["lactose (melksuiker)","melkeiwit","melkvet"],right:0,
    ok:"Ja. Wat gebeurt er met lactose die niet geknipt wordt: kan die door de darmwand van de dunne darm?",no:"De naam van een enzym verwijst vaak naar zijn substraat.",
    onDone:()=>choiceStep(think,{q:"Wat is de belangrijkste taak van de dikke darm?",opts:["water terugnemen","voedsel verteren","vet opnemen"],right:0,
      ok:"Goed. Bedenk wat een opgeloste suiker in de dikke darm met die taak doet (denk aan osmose), en zet de stappen achter elkaar: weinig lactase → … → diarree.",no:"De dikke darm verteert zelf bijna niets.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Door het tekort aan lactase komt de <b>lactose ongeknipt in de dikke darm</b>.",
    "De suiker <b>houdt daar water vast</b> (en bacteriën vergisten hem), zodat de dikke darm het water <b>niet kan terugnemen</b>."],
    model:"Het jong maakt weinig lactase, dus de lactose uit de koemelk wordt in de dunne darm niet geknipt en niet opgenomen. Die lactose komt in de dikke darm. Daar houdt de suiker water vast, en bacteriën vergisten hem. De dikke darm kan dat water niet terugnemen: waterige ontlasting, diarree."});
  q.append(think,ans);
},STOF_LACT));

ids.push(vraag(2,"pap uit de koelkast helpt niet",(q,id)=>{
  pre(q,"<p>In een opvang groeit een jong op zonder moeder. Een verzorger vangt pap op van een andere koala en bewaart die een week in een open bakje in de koelkast. Als het jong de pap krijgt, helpt die niet.</p>");
  const {think,ans,unlock}=start(q,B("Geef een verklaring."));
  choiceStep(think,{q:"Wat moet er in de pap zitten om het jong te helpen?",opts:["levende darmbacteriën","dode bacteriën","enzymen van de moeder"],right:0,
    ok:"Ja, dat staat in de inleiding. Wat is er in de darm anders dan in een open bakje?",no:"Lees het verschil tussen pap en gewone ontlasting in de inleiding.",
    onDone:()=>choiceStep(think,{q:"Hoeveel zuurstof is er diep in de darm?",opts:["bijna niets","net zoveel als in de lucht","meer dan in de lucht"],right:0,
      ok:"Goed. Wat betekent dat voor darmbacteriën die een week in een open bakje zitten?",no:"De wandcellen en de bacteriën bij de wand gebruiken de zuurstof uit het bloed op.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Voor de meeste darmbacteriën is <b>zuurstof giftig</b>.",
    "In het open bakje kwam <b>zuurstof</b> bij de bacteriën, die zijn <b>doodgegaan</b>; pap helpt alleen met levende bacteriën."],
    model:"De meeste darmbacteriën leven zonder zuurstof; voor hen is zuurstof giftig. In een open bakje kwam er een week lang lucht bij de pap. Daardoor zijn de bacteriën doodgegaan. Pap helpt alleen door de levende bacteriën, dus deze pap helpt niet meer.",
    valkuil:"‘De kou heeft de bacteriën gedood’: 0 punten. Kou laat bacteriën trager groeien, maar het probleem is de zuurstof."});
  q.append(think,ans);
},STOF_MB));

if(!VWO)ids.push(vraag(1,"waar de meeste darmbacteriën leven",(q,id)=>{
  const {think,ans,unlock}=start(q,B("In welk deel van het spijsverteringskanaal leven bij een koala, net als bij jou, de meeste darmbacteriën?"));
  choiceStep(think,{q:"Wat doet maagzuur met de bacteriën uit je eten?",opts:["het doodt de meeste","het laat ze sneller groeien","niets"],right:0,
    ok:"Ja. Bedenk ook waar het voedsel het langst blijft liggen: seconden, uren of dagen.",no:"Denk aan de gier met zijn extra zure maag.",onDone:unlock});
  mc(ans,{qid:id,pts:1,right:2,opts:["in de maag","in de dunne darm","in de dikke darm","in de slokdarm"],onChecked:()=>waaromBtn(ans,textBox(
    "De meeste darmbacteriën leven in de <b>dikke darm</b>: daar is bijna geen zuurstof, de inhoud blijft er een tot twee dagen, en er komen vezels aan die de koala (en jij) zelf niet verteren. In de maag doodt het zuur de meeste bacteriën (A), en door de slokdarm gaat de hap in een paar seconden (D). Het antwoord is <b>C</b>."))});
  q.append(think,ans);
},STOF_MB));

if(VWO)ids.push(vraag(2,"maakt het microbioom ze ziek?",(q,id)=>{
  pre(q,"<p>In een opvang zijn de koala's die vaak ziek zijn, ook de koala's met een ander microbioom dan gezonde koala's. Een verzorger concludeert: “Het microbioom maakt ze ziek.”</p>");
  const {think,ans,unlock}=start(q,B("a Leg uit waarom die conclusie niet zomaar mag.<br>b Beschrijf een proef die het wél kan beslissen."));
  choiceStep(think,{q:"Wat heeft de verzorger eigenlijk vastgesteld?",opts:["dat twee dingen samen voorkomen: vaak ziek en een ander microbioom","dat het microbioom de ziekte veroorzaakt","dat alle koala's in de opvang ziek zijn"],right:0,
    ok:"Ja: een verband. Bedenk bij a of het ook andersom kan werken.",no:"Kijk goed wat er gemeten is, en wat de verzorger erbij denkt.",
    onDone:()=>chipsStep(think,{q:"Wat hoort bij een proef die een oorzaak kan aantonen? Kies alles wat klopt.",items:[["een controlegroep",1],["het lot bepaalt wie in welke groep komt",1],["je verandert één ding en meet het effect",1],["alleen koala's die al gezond zijn",0]],
      ok:"Goed. Beschrijf nu bij b zo'n proef voor de koala's.",no:"Eén keuze past niet: je wilt juist weten of het zieke koala's helpt.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "a: een <b>verband is geen oorzaak</b>: een zieke koala eet bijvoorbeeld minder of anders, waardoor zijn microbioom verandert.",
    "b: verdeel door <b>loting</b> zieke koala's over een groep die <b>pap van een gezonde koala</b> krijgt en een <b>controlegroep</b> die geen (of een onwerkzame) pap krijgt; vergelijk daarna hoe vaak ze ziek zijn."],
    model:"a Dat de zieke koala's een ander microbioom hebben, is een verband en nog geen oorzaak. Het kan ook andersom: een zieke koala eet minder of anders, en daardoor verandert zijn microbioom. b Verdeel zieke koala's door loting over twee groepen. De ene groep krijgt pap van een gezonde koala, de controlegroep krijgt geen pap of pap zonder levende bacteriën. Vergelijk daarna hoe vaak de koala's in beide groepen ziek zijn.",
    valkuil:"Een proef zonder controlegroep: 0 punten voor b."});
  q.append(think,ans);
},STOF_MB));

opgave("Een jonge koala eet pap","Een jonge koala eet pap",`
<p>Koala's eten bijna alleen bladeren van eucalyptus. Die bladeren zitten vol vezels, zoals cellulose. Een jonge koala drinkt eerst alleen melk in de buidel van zijn moeder. Als het jong ongeveer 300 gram weegt, op een leeftijd van 5 tot 6 maanden, eet het een tijd lang “pap” van zijn moeder. Pap is een zachte, vettige brij uit de darm van de moeder, die lijkt op ontlasting. In gewone ontlasting zitten vooral dode bacteriën, in pap juist levende. Na de periode met pap kan het jong eucalyptusbladeren verteren.</p>`,ids);
}
