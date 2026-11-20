/* ===== Opgave 3: Zwaluwen ontwijken het verkeer (EI-evolutie-A01, A02, A05, A06) =====
   Gegevens: Brown & Brown (2013) Current Biology 23: R233–R234; getallen in afbeelding 1 fictief (zie eigen/evolutie.json, bron_data). */
{
const STOF_NS={titel:"Hoe natuurlijke selectie werkt",html:`
<p>Natuurlijke selectie heeft drie dingen nodig:</p>
<ul style="margin:0;padding-left:20px"><li><b>erfelijke variatie</b>: individuen van een populatie verschillen, en een deel van die verschillen zit in hun allelen;</li>
<li><b>overproductie</b>: er worden meer jongen geboren dan er kunnen overleven;</li>
<li><b>selectiedruk</b>: een factor uit de omgeving waardoor sommige individuen meer kans hebben om te overleven en jongen te krijgen.</li></ul>
<p>Het gaat er niet om wie het langst leeft, maar om de <b>fitness</b>: hoeveel jongen een individu krijgt die zelf ook weer jongen krijgen. Wie de hoogste fitness heeft, geeft de meeste allelen door. Zo veranderen de allelfrequenties in de genenpool, generatie na generatie.</p>
`,
films:[F.e2,F.e1]};

const q1=vraag(3,"natuurlijke selectie in drie stappen",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Leg in drie stappen uit hoe door natuurlijke selectie de gemiddelde vleugellengte van de klifzwaluwen in dertig jaar kleiner is geworden. Gebruik in je uitleg de begrippen variatie, fitness en allelfrequentie."));
  choiceStep(think,{q:"Waar zie je in afbeelding 1 dat er variatie in vleugellengte is?",opts:["in elk jaar hebben niet alle zwaluwen dezelfde vleugellengte","de lijn van 2012 ligt links van die van 1983","er worden minder zwaluwen doodgereden"],right:0,
    ok:"Ja: elk jaar is er een spreiding. Voor selectie moet die variatie (deels) erfelijk zijn.",no:"Variatie gaat over verschillen tussen individuen in één populatie, op één moment.",
    onDone:()=>choiceStep(think,{q:"Welke zwaluwen hebben langs de weg de hoogste fitness?",opts:["zwaluwen met lange vleugels","zwaluwen met korte vleugels"],right:1,
      ok:"Goed. Fitness gaat over nakomelingen, niet alleen over overleven. Maak in je antwoord ook de derde stap: wat gebeurt er met de allelen in de populatie?",no:"Kijk in de inleiding: welke zwaluwen werden vaker doodgereden?",onDone:unlock})});
  openAnswer(ans,{id,pts:3,checks:[
    "er is (door mutatie/recombinatie) <b>erfelijke variatie</b> in vleugellengte tussen de zwaluwen in de populatie",
    "zwaluwen met kortere vleugels worden minder vaak doodgereden / overleven vaker en <b>krijgen daardoor meer nakomelingen</b> (hebben een hogere <b>fitness</b>)",
    "(zij geven hun allelen voor kortere vleugels door, waardoor) de <b>allelfrequentie</b> van allelen voor kortere vleugels in de volgende generaties <b>toeneemt</b>"],
    model:"In de populatie verschillen zwaluwen erfelijk in vleugellengte (variatie). Zwaluwen met kortere vleugels worden minder vaak doodgereden, overleven vaker en krijgen meer jongen: ze hebben een hogere fitness. Zo geven ze vaker hun allelen voor korte vleugels door, en neemt de allelfrequentie van die allelen generatie na generatie toe.",
    valkuil:"Het tweede punt krijg je alleen als je het verband met nakomelingen/voortplanting legt; alleen ‘ze overleven beter’ levert voor dat element 0 punten op. Een antwoord waarin zwaluwen hun vleugels korter maken of ‘zich aanpassen omdat het moet’, levert voor het eerste en het derde element geen punten op.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"1983: de zwaluwen verschillen in vleugellengte, rond een gemiddelde van 111 mm. Een deel van die verschillen is erfelijk: dat is de <b>variatie</b>.",o:{toon:["1983"],gem:true}},
      {cap:"Langs de weg worden vooral zwaluwen met lange vleugels doodgereden. Zwaluwen met kortere vleugels overleven vaker en krijgen <b>meer jongen</b>: een hogere <b>fitness</b>.",o:{toon:["1983"],staart:true}},
      {cap:"Die jongen erven de allelen voor kortere vleugels. Elke generatie neemt de <b>allelfrequentie</b> van die allelen iets toe.",o:{toon:["1983","2012"],dim:["2012"],pijl:true}},
      {cap:"2012: de hele verdeling ligt naar links, gemiddeld 107 mm. Geen enkele zwaluw kreeg zelf kortere vleugels: de populatie veranderde.",o:{toon:["1983","2012"],dim:["1983"],gem:true}}],
      (st,s)=>st.innerHTML=VLEUGEL(s.o)))});
  q.append(think,ans);
},STOF_NS);

const q2=vraag(2,"juist of onjuist: uitspraken van leerlingen",(q,id)=>{
  q.append(el("p",{class:"qtext"},"Drie leerlingen geven een uitspraak over de klifzwaluwen:<br>1 Een zwaluw die vaak voor auto’s moet uitwijken, krijgt in de loop van zijn leven kortere vleugels.<br>2 De mutaties die kortere vleugels geven, zijn ontstaan doordat er steeds meer verkeer kwam.<br>3 Als er geen erfelijke variatie in vleugellengte was geweest, had het verkeer de gemiddelde vleugellengte in de populatie niet kunnen veranderen.<br><br><b>Schrijf de nummers 1, 2 en 3 onder elkaar en noteer erachter of de uitspraak juist of onjuist is volgens de evolutietheorie.</b>"));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  choiceStep(think,{q:"Waar werkt natuurlijke selectie mee?",opts:["met verschillen die al in de populatie aanwezig zijn","het maakt de eigenschappen die een soort nodig heeft"],right:0,
    ok:"Ja. Lees nu elke uitspraak en vraag je af: past dit bij selectie op verschillen die er al zijn?",no:"Denk aan de vinken op Daphne Major: er kwamen in het droge jaar geen nieuwe snavels bij.",onDone:unlock});
  juistOnjuist(ans,{id,stm:["een zwaluw krijgt in zijn leven kortere vleugels door het uitwijken","de mutaties voor korte vleugels ontstonden door het verkeer","zonder erfelijke variatie geen verandering van de gemiddelde vleugellengte"],key:[false,false,true],
    uitleg:textBox("1 <b>onjuist</b>: een zwaluw houdt de vleugels waarmee hij opgroeit. Wat verandert, is welke zwaluwen jongen krijgen.<br>2 <b>onjuist</b>: mutaties ontstaan toevallig, niet omdat ze nodig zijn. Het verkeer bepaalt alleen welke allelen vaker worden doorgegeven.<br>3 <b>juist</b>: selectie kan alleen kiezen uit erfelijke verschillen die er al zijn. Zonder die variatie gaan alle allelen even vaak door.")});
  q.append(think,ans);
},TERUG("Aangepast, zonder doel",F.e2,"Aangepast, zonder doel"));

const q3=vraag(1,"natuurlijke of kunstmatige selectie?",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Is de selectie op vleugellengte door het verkeer een voorbeeld van natuurlijke of van kunstmatige selectie?"));
  choiceStep(think,{q:"Bij het fokken van honden spreek je van kunstmatige selectie. Waarom?",opts:["omdat de fokker bepaalt welke dieren jongen krijgen","omdat er mensen bij betrokken zijn","omdat honden bij mensen leven"],right:0,
    ok:"Ja: bij kunstmatige selectie bepaalt de mens wie zich voortplant. Bekijk nu de vier keuzes: wie bepaalt hier welke zwaluwen jongen krijgen?",no:"Het mechanisme is hetzelfde als bij natuurlijke selectie. Wat is dan het verschil?",onDone:unlock});
  mc(ans,{qid:id,pts:1,right:2,opts:["kunstmatige selectie, omdat de auto’s door mensen zijn gemaakt","kunstmatige selectie, omdat de selectiedruk door mensen wordt veroorzaakt","natuurlijke selectie, omdat mensen niet bewust kiezen welke zwaluwen zich voortplanten","natuurlijke selectie, omdat de mutaties voor korte vleugels vanzelf zijn ontstaan"],
    onChecked:()=>waaromBtn(ans,textBox("Het antwoord is <b>C</b>. Bij kunstmatige selectie kiest de mens bewust welke individuen zich voortplanten, zoals een fokker. Een automobilist kiest niet welke zwaluw hij raakt. Dat de oorzaak (auto's, selectiedruk) van mensen komt, maakt het nog geen kunstmatige selectie: dat is ook zo bij antibiotica en bacteriën (A en B). D klopt op zich, maar dat mutaties vanzelf ontstaan geldt voor élke vorm van selectie, ook kunstmatige. Het zegt dus niets over het verschil."))});
  q.append(think,ans);
},{titel:"Natuurlijke en kunstmatige selectie",html:`
<p>Bij <b>natuurlijke selectie</b> bepalen omstandigheden in de omgeving welke individuen meer jongen krijgen, zoals droogte, roofdieren of ziekten.</p>
<p>Bij <b>kunstmatige selectie</b> laat een fokker of kweker steeds de dieren of planten met de gewenste kenmerken jongen krijgen, bijvoorbeeld de kleinste honden of de koeien die de meeste melk geven. Zo ontstaan rassen.</p>
<p>Het mechanisme is in beide gevallen hetzelfde: individuen met bepaalde allelen krijgen meer nakomelingen, en die allelen worden vaker in de genenpool.</p>`,films:[F.e4,F.e2]});

const q4=vraag(2,"selectie of leren?",(q,id)=>{
  pre(q,"<p>Een andere verklaring voor het dalende aantal doodgereden zwaluwen is dat zwaluwen in de loop van hun leven leren om auto’s te ontwijken.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit welk gegeven uit de inleiding beter past bij natuurlijke selectie dan bij leren alleen."));
  chipsStep(think,{q:"Welke gegevens uit de inleiding passen óók bij de verklaring ‘leren’? Kies alles wat klopt.",items:[
    ["het aantal doodgereden zwaluwen daalde",true],["doodgereden zwaluwen hadden gemiddeld langere vleugels",false],["de vleugellengte in de populatie nam af (afbeelding 1)",false]],
    ok:"Goed. Zo'n gegeven kan de twee verklaringen niet uit elkaar houden. Zoek een gegeven dat maar bij één van beide past.",no:"Niet alles wat je koos, past bij leren. Vraag je per gegeven af: zou je dit ook zien als zwaluwen alleen leren?",onDone:unlock});
  openAnswer(ans,{id,pts:2,checks:[
    "het gegeven dat <b>doodgereden zwaluwen gemiddeld langere vleugels</b> hadden (en/of dat de vleugellengte in de populatie afnam, afbeelding 1) wordt gebruikt",
    "<b>leren verandert de vleugellengte niet</b>, een erfelijk kenmerk; dat juist zwaluwen met lange vleugels vaker sterven, past bij selectie op een erfelijk kenmerk"],
    model:"Doodgereden zwaluwen hadden gemiddeld langere vleugels, en de vleugellengte in de populatie nam af. Vleugellengte is erfelijk en verandert niet door te leren. Dat juist zwaluwen met een bepaalde erfelijke eigenschap vaker sterven en dat die eigenschap zeldzamer wordt, past bij natuurlijke selectie.",
    valkuil:"Een antwoord met alleen het gegeven dat het aantal doodgereden zwaluwen daalde, levert 0 punten op: dat past bij beide verklaringen.",
    after:()=>waaromBtn(ans,textBox("Als zwaluwen alleen leren, zouden de doodgereden zwaluwen gemiddeld net zulke vleugels hebben als de rest: vooral jonge, onervaren vogels zouden sterven. Maar de slachtoffers hadden juist <b>langere vleugels</b>, en de vleugellengte van de hele populatie werd kleiner. Leren kan een lichaamskenmerk als vleugellengte niet veranderen; selectie op een erfelijk kenmerk wel. Leren kan er best óók bij helpen, maar het verklaart deze twee gegevens niet."))});
  q.append(think,ans);
},STOF_NS);

opgave("Zwaluwen","Zwaluwen ontwijken het verkeer",`
<p>Klifzwaluwen (<i>Petrochelidon pyrrhonota</i>) zijn insecteneters die in de vlucht jagen. Ze overwinteren in Zuid-Amerika en broeden in Noord-Amerika, vaak in grote kolonies. In het westen van de staat Nebraska (VS) bouwen ze hun modderen nesten graag onder viaducten en bruggen van autowegen. Daar vliegen ze vlak boven het wegdek, en elk jaar worden er zwaluwen doodgereden.</p>
<p>Biologen volgden deze kolonies dertig jaar lang. Ze verzamelden de doodgereden zwaluwen en maten hun vleugels. Ook maten ze de vleugels van zwaluwen uit de kolonies zelf. Wat ze vonden:</p>
${LIJST(["Het aantal doodgereden zwaluwen daalde van ongeveer twintig per jaar naar ongeveer vier per jaar, terwijl het aantal zwaluwen in de kolonies juist toenam.","Doodgereden zwaluwen hadden gemiddeld langere vleugels dan de zwaluwen in de kolonies.","Zwaluwen met kortere vleugels kunnen steiler opstijgen en sneller een bocht maken."])}
<p>In afbeelding 1 is de verdeling van de vleugellengte in de populatie weergegeven in het begin en aan het eind van het onderzoek.</p>
<div class="eyebrow">afbeelding 1 (vereenvoudigd; de getallen zijn fictief, de richting van de verandering komt uit het onderzoek)</div>${VLEUGEL()}`,[q1,q2,q3,q4]);
}
