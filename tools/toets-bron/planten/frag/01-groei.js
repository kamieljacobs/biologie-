/* ===== Opgave 1: Groei en plantenhormonen (EI-planten-A02, A07 uit toetsen-biologie) ===== */
{
const STOF_PLEK={titel:"Waar een plant groeit",html:`
<p>Een mens groeit overal tegelijk. Een plant groeit alleen op een paar vaste plekken: in de <b>meristemen</b>. Zo'n groeipunt zit in de top van elke stengel en in elke wortelpunt (beschermd door een <b>wortelmutsje</b>). Een stengel wordt dus alleen bij de top langer: een spijker op één meter hoogte in een jonge boom zit daar tien jaar later nog.</p>
<p>Dikker worden gaat anders: in de stam zit een dunne ring delende cellen, het <b>cambium</b>.</p>
<p>Een cel die net ontstaan is, is nog klein en heeft nog geen vaste taak. Een plant moet daarna nog veel met die cel doen voordat hij een stuk stengel met houtvaten en bastvaten is.</p>`,
films:[F.groei]};
const q1=vraag(2,"drie zones in de stengeltop",(q,id)=>{
  const {think,ans,unlock}=start(q,"In een stengeltop onderscheid je drie zones.<br><br>"+B("Noem de drie zones van boven naar beneden, en geef aan in welke zone de stengel de meeste lengte wint."));
  choiceStep(think,{q:"Je slaat een spijker op één meter hoogte in een jonge boom. Tien jaar later zit hij nog op één meter. Wat zegt dat?",opts:["de hele stam groeit even hard mee","een stengel wordt alleen vlak bij de top langer","de boom groeit niet meer"],right:1,
    ok:"Ja. Vlak bij de top gebeuren na elkaar drie dingen met de cellen.",no:"Als de hele stam mee groeide, zou de spijker omhoog schuiven.",
    onDone:()=>choiceStep(think,{q:"Na een celdeling zijn de twee nieuwe cellen samen ongeveer even groot als de oude cel. Is de stengel na alleen delen al veel langer?",opts:["ja: meer cellen is meteen een langere stengel","nee: er moet daarna nog iets met de nieuwe cellen gebeuren"],right:1,
      ok:"Goed. Bedenk wat er met de nieuwe cellen gebeurt voordat de stengel langer is, en wat daarna voordat ze een houtvat of bastvat zijn. In welke van die zones wint de stengel de meeste lengte?",no:"Twee kleine cellen naast elkaar nemen evenveel ruimte in als de ene cel van daarvoor.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "van boven naar beneden: cellen <b>delen</b>, cellen <b>strekken</b>, cellen <b>differentiëren</b> (krijgen hun eigen bouw en taak)",
    "de meeste lengtewinst komt uit de zone waar de cellen <b>strekken</b>"],
    model:"Bovenaan delen de cellen zich (meristeem). Daaronder strekken ze zich: ze worden veel langer. Nog lager differentiëren ze: ze krijgen hun eigen bouw en taak, bijvoorbeeld als houtvat of bastvat. De meeste lengte wint de stengel in de strekkingszone.",
    valkuil:"De zones in de verkeerde volgorde (bijvoorbeeld differentiëren bovenaan) levert voor het eerste punt 0 punten op. ‘De meeste lengte komt van het delen’ is fout: delen maakt cellen, strekken maakt lengte.",
    after:()=>waaromBtn(ans,textBox("In de top ontstaan nieuwe cellen door <b>deling</b>. Die nemen daaronder water op in hun vacuole en <b>strekken</b> zich, soms tot tien keer hun lengte: daar komt de meeste lengtewinst vandaan. Nog lager krijgen ze hun eigen bouw en taak (<b>differentiatie</b>), bijvoorbeeld als houtvat. Door deze volgorde schuift de top steeds verder omhoog, en blijft een spijker op één meter staan."))});
  q.append(think,ans);
},STOF_PLEK);

const STOF_HORM={titel:"Plantenhormonen",html:`
<p>Een <b>plantenhormoon</b> is een stof die in kleine hoeveelheden de groei of ontwikkeling van een plant regelt, vaak ergens anders dan waar hij gemaakt wordt.</p>
<p>Het bekendste voorbeeld is <b>auxine</b>. Dat komt uit de top en maakt de celwand soepel, zodat de cellen eronder strekken. Komt het licht van één kant, dan gaat auxine naar de schaduwkant: die kant strekt meer en de stengel buigt naar het licht (fototropie). Dezelfde auxine remt bij een hogere concentratie juist de strekking in de wortel.</p>
<p>Naast auxine noemt de film nog vier plantenhormonen, elk met een eigen hoofdrol.</p>`,
films:[F.groei]};
const q2=vraag(2,"welk plantenhormoon?",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Noem bij elke situatie het plantenhormoon dat de hoofdrol speelt.")+"<br><br>a Avocado's worden sneller rijp in een papieren zak met een rijpe banaan.<br>b Bij droogte sluiten de huidmondjes.<br>c Zaden kiemen.<br>d Cellen in een meristeem delen.");
  choiceStep(think,{q:"Situatie c (zaden kiemen) en d (cellen delen) gaan allebei over groei. Is het in beide situaties hetzelfde hormoon?",opts:["ja, één groeihormoon regelt allebei","nee, elk heeft een eigen hormoon met een eigen hoofdrol"],right:1,
    ok:"Goed. Je hebt dus vier verschillende hormonen nodig, voor vier verschillende hoofdrollen: rijpen, sluiten bij droogte, kiemen en delen.",no:"De vraag noemt vier situaties en vraagt bij elke het hormoon met de hoofdrol. De film noemt naast auxine nog vier plantenhormonen.",
    onDone:()=>choiceStep(think,{q:"Situatie a: de banaan raakt de avocado niet eens. Wat zegt dat over het hormoon?",opts:["het gaat via de bastvaten van de banaan naar de avocado","het verspreidt zich door de lucht in de zak"],right:1,
      ok:"Ja. Dat is een bijzondere eigenschap van dit hormoon. Vul nu bij elke situatie het hormoon in.",no:"De banaan en de avocado zijn twee losse vruchten, zonder vaten ertussen.",onDone:unlock})});
  woordAnswer(ans,{id,pts:2,score:n=>n===4?2:n===3?1:0,fields:[
    ["a",["ethyl","etheen","ethen","etyl","etheen"],"ethyleen"],
    ["b",["absci","abcis","abscis","aba"],"abscisinezuur"],
    ["c",["gibber","giber","gibbe"],"gibberelline"],
    ["d",["cytokin","cytokyn","citokin","cytoquin"],"cytokinine"]],
    uitleg:textBox("a <b>Ethyleen</b> is een gas: het komt uit de rijpe banaan en laat de avocado rijpen.<br>b <b>Abscisinezuur</b> sluit de huidmondjes als het droog is, zodat de plant minder water verliest.<br>c <b>Gibberelline</b> laat zaden kiemen (en stengels strekken).<br>d <b>Cytokinine</b> laat cellen delen, vooral in de meristemen.<br><br>Vier goed: 2 punten, drie goed: 1 punt, minder: 0 punten. Kleine spelfouten rekent de tool niet fout.")});
  q.append(think,ans);
},STOF_HORM);

opgave("Groei","Groei en plantenhormonen",`
<p>Deze toets bestaat uit 17 vragen (36 punten). De toets volgt de plant: eerst hoe een plant groeit, dan hoe water en suiker door de plant gaan, dan de fotosynthese, en tot slot wat de plant met zijn glucose doet en wanneer hij groeit. Je mag BiNaS gebruiken.</p>
<p>De eerste twee vragen gaan over groei en plantenhormonen.</p>`,[q1,q2]);
}
