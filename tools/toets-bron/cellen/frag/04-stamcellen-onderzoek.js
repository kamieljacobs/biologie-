/* ===== Opgave 7: Stamcellen (havo EI-cellen-KE07, vwo EI-cellen-KE02) ===== */
const STOF_MITOSE={titel:"Van één cel naar honderden celsoorten",html:`
<p>Je begon als één cel: een bevruchte eicel. Die deelde zich door <b>mitose</b>, steeds weer. Nu bestaat je lichaam uit zo'n dertig biljoen cellen, van meer dan tweehonderd soorten.</p>
<p>Bij elke mitose krijgen beide cellen een kopie van hetzelfde DNA. Een uitzondering is de rode bloedcel: die verliest zijn kern.</p>
<p>Een gen is een stukje DNA met de bouwtekening van een eiwit. Welke eiwitten een cel maakt, bepaalt zijn bouw en zijn taak.</p>`,
films:[F.stam]};
{
const ids=[];
if(!VWO){
const STOF_EMB={titel:"Embryonale en volwassen stamcellen",html:`
<p>Een <b>stamcel</b> is nog niet gespecialiseerd en kan zich blijven delen. Bij een deling blijft er meestal één stamcel over.</p>
<p><b>Volwassen stamcellen</b> zitten bijvoorbeeld in de kiemlaag van je huid, in je rode beenmerg en in je darmwand.</p>
<p>Een embryo van vijf dagen is een holle bol met binnenin een klompje cellen. Onderzoekers kweken die cellen in het lab: dat zijn <b>embryonale stamcellen</b>.</p>`,
films:[F.stam]};
ids.push(vraag(2,"embryonale stamcellen roepen vragen op",(q,id)=>{
  pre(q,"<p>Embryonale stamcellen roepen vragen op.</p>");
  const {think,ans,unlock}=start(q,B("a Leg uit waarom, en noem waar onderzoekers in Nederland de embryo's vandaan halen.<br>b Leg uit waarom onderzoekers toch met embryonale stamcellen willen werken en niet alleen met volwassen stamcellen."));
  choiceStep(think,{q:"Waaruit kweken onderzoekers embryonale stamcellen?",opts:["uit het beenmerg van een volwassene","uit het klompje cellen in een embryo van een paar dagen","uit huidcellen"],right:1,
    ok:"Ja. Wat gebeurt er met het embryo als je die cellen eruit haalt?",no:"De naam zegt het al: embryonaal.",
    onDone:()=>choiceStep(think,{q:"Een bloedstamcel uit het beenmerg: welke cellen kan die maken?",opts:["alle celsoorten van het lichaam","alleen bloedcellen","alleen huidcellen"],right:1,
      ok:"Goed. Vergelijk dat nu met wat een embryonale stamcel kan worden.",no:"Een volwassen stamcel maakt de celsoorten van zijn eigen weefsel.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "a Om embryonale stamcellen te kweken <b>gaat een embryo verloren</b>; in Nederland gebruiken onderzoekers <b>restembryo's van ivf</b> (die ouders aan de wetenschap geven).",
    "b Embryonale stamcellen kunnen nog <b>elke celsoort</b> van het lichaam worden, volwassen stamcellen alleen de celsoorten van hun <b>eigen weefsel</b>."],
    model:"a Om embryonale stamcellen te kweken gaat een embryo verloren, en een embryo is het begin van een mens. In Nederland gebruiken onderzoekers restembryo's van ivf: embryo's die over zijn en die ouders aan de wetenschap geven. b Embryonale stamcellen kunnen nog elke celsoort van het lichaam worden. Volwassen stamcellen maken alleen de celsoorten van hun eigen weefsel, zoals een bloedstamcel alleen bloedcellen.",
    valkuil:"Bij a moeten beide delen erin staan (embryo gaat verloren én restembryo's van ivf) voor het punt. Bij b is ‘embryonale stamcellen zijn beter’ geen uitleg: zeg wat ze méér kunnen.",
    after:()=>waaromBtn(ans,textBox("a Om embryonale stamcellen te kweken haal je het klompje cellen uit een embryo van een paar dagen: dat embryo gaat verloren. Daarom zijn de regels streng. In Nederland komen de embryo's uit ivf: <b>restembryo's</b> die over zijn en die ouders aan de wetenschap geven.<br>b Een embryonale stamcel kan nog <b>elke celsoort</b> worden. Een volwassen stamcel maakt alleen cellen van zijn eigen weefsel: een bloedstamcel maakt bloedcellen, geen huid of hartspier."))});
  q.append(think,ans);
},STOF_EMB));
}else{
ids.push(vraag(2,"insuline: hetzelfde gen, andere cel",(q,id)=>{
  pre(q,"<p>Alleen sommige cellen in je alvleesklier maken insuline. Je huidcellen hebben het gen voor insuline ook.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit hoe dat kan. Gebruik het begrip differentiatie."));
  choiceStep(think,{q:"Een huidcel en een alvleeskliercel van dezelfde persoon: hebben ze hetzelfde DNA?",opts:["ja","nee, elke celsoort heeft eigen genen"],right:0,
    ok:"Ja, beide zijn door mitose uit dezelfde bevruchte eicel ontstaan. Waarom maakt de huidcel dan geen insuline?",no:"Beide cellen zijn door mitose ontstaan uit één bevruchte eicel. Wat krijgt elke cel bij een mitose mee?",
    onDone:()=>choiceStep(think,{q:"Een gen zit in een cel. Wat moet er gebeuren voordat de cel het eiwit van dat gen maakt?",opts:["het gen moet aan staan","het gen moet uit de cel geknipt worden","het gen moet verdubbelen"],right:0,
      ok:"Goed. Gebruik nu het begrip uit de vraag voor wat er zo met een cel gebeurt.",no:"Een gen is een bouwtekening. Je kunt hem gebruiken, of laten liggen.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "In de alvleeskliercel staat het gen voor insuline <b>aan</b>, in de huidcel staat het <b>uit</b> (het gen zit er wel in).",
    "Door <b>differentiatie</b> krijgt elke celsoort zo een eigen bouw en taak."],
    model:"Alle lichaamscellen hebben hetzelfde DNA, ook het gen voor insuline. In sommige alvleeskliercellen staat dat gen aan, in huidcellen staat het uit. Doordat in elke celsoort andere genen aan staan, krijgt elke cel een eigen bouw en taak: dat is differentiatie.",
    valkuil:"‘De huidcel heeft het gen niet’ of ‘de huidcel is het gen kwijtgeraakt’: dat spreekt de vraag tegen. Het gen zit erin, maar staat uit.",
    after:()=>waaromBtn(ans,textBox("Bij elke mitose krijgen beide cellen een kopie van hetzelfde DNA. Het verschil tussen celsoorten zit dus niet in welke genen ze hebben, maar in welke genen <b>aan</b> staan. In sommige alvleeskliercellen staat het insulinegen aan; in de huidcel staat het uit. Een cel die zo een eigen bouw en taak krijgt, is gedifferentieerd: <b>differentiatie</b>. Voor vwo: transcriptiefactoren en methylgroepen bepalen of een gen wordt overgeschreven."))});
  q.append(think,ans);
},STOF_MITOSE));
}
opgave("Stamcellen","Stamcellen",GEEN_INLEIDING,ids);
}

/* ===== Opgave 8: Een nieuw hoornvlies uit je andere oog (EI-cellen-F01–F03; havo F04, vwo F05) ===== */
{
const STOF_STAM={titel:"Stamcellen in je lichaam",html:`
<p>Een <b>stamcel</b> is nog niet gespecialiseerd. Stamcellen zitten op verschillende plekken: in de kiemlaag onderin je opperhuid, in je rode beenmerg en in je darmwand. Daar vernieuwen ze steeds het weefsel: je opperhuid is in ongeveer vier weken helemaal nieuw.</p>
<p>Zulke volwassen stamcellen maken alleen de celsoorten van hun eigen weefsel. Embryonale stamcellen kunnen nog elke celsoort van het lichaam worden.</p>`,
films:[F.stam]};
const STOF_OND={titel:"Een eerlijke proef",html:`
<p>In een goed onderzoek verander je maar één factor: de rest houd je gelijk. Je vergelijkt met een <b>controlegroep</b>, die alles krijgt behalve het ding dat je test.</p>
<p>Een uitkomst is <b>betrouwbaar</b> als je bij herhalen (bijna) hetzelfde vindt. Daarom gebruik je genoeg proefpersonen en herhaal je de proef.</p>
<p>Wie meet, kan zich ongemerkt laten leiden door wat hij verwacht. Ook daar letten onderzoekers op.</p>`,
films:[F.ond]};
const ids=[];
ids.push(vraag(2,"waarom uit de rand?",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Leg uit waarom de artsen het stukje uit de rand van het gezonde oog nemen en niet uit het midden van het hoornvlies."));
  choiceStep(think,{q:"Waar zitten volgens de inleiding de stamcellen van het hoornvlies?",opts:["in het midden","in de rand","overal evenveel"],right:1,
    ok:"Ja. Wat kunnen stamcellen dat de andere cellen niet kunnen?",no:"Lees de inleiding nog eens: waar komen de nieuwe cellen vandaan?",
    onDone:()=>choiceStep(think,{q:"De cellen in het midden zijn gespecialiseerd. Wat doen veel gespecialiseerde cellen niet meer?",opts:["eiwitten maken","zich blijven delen","ATP maken"],right:1,
      ok:"Goed. Wat zou er dan gebeuren met een laag die alleen uit zulke cellen bestaat en steeds afslijt?",no:"Denk aan een zenuwcel of een hartspiercel uit de film.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "In de rand zitten de <b>stamcellen</b>, die zich <b>blijven delen</b> (en waarbij steeds een stamcel overblijft).",
    "De cellen in het midden zijn <b>gespecialiseerd</b> en delen niet blijvend; een laag van alleen die cellen slijt af en wordt <b>niet vervangen</b>."],
    model:"In de rand zitten de stamcellen. Die blijven zich delen, en bij elke deling blijft er een stamcel over, zodat er steeds nieuwe cellen komen. De cellen in het midden zijn gespecialiseerd en delen zich niet blijvend. Een laag van alleen die cellen zou afslijten zonder dat er nieuwe cellen bij komen.",
    valkuil:"‘In het midden zitten geen cellen’ of ‘de rand is minder belangrijk voor het zien’ is geen biologische uitleg. Noem de stamcellen en wat ze kunnen.",
    after:()=>waaromBtn(ans,textBox("Net als in de kiemlaag van je huid: een <b>stamcel</b> blijft zich delen, en bij een deling blijft er meestal één stamcel over. Zo blijft de voorraad op peil en komen er steeds nieuwe cellen bij. De cellen in het midden zijn al gespecialiseerd: die delen zich niet blijvend. Neem je alleen die mee, dan slijt het nieuwe laagje af en komt er niets voor terug."))});
  q.append(think,ans);
},STOF_STAM));

ids.push(vraag(2,"cellen van een donor",(q,id)=>{
  pre(q,"<p>Bij patiënten van wie beide ogen beschadigd zijn, kan deze behandeling niet met eigen cellen.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit welk probleem ontstaat als je dan cellen van een donor gebruikt, en waarom dat probleem er bij eigen cellen niet is."));
  choiceStep(think,{q:"Welk systeem in je lichaam ruimt lichaamsvreemde cellen op?",opts:["het afweersysteem","het zenuwstelsel","het spijsverteringsstelsel"],right:0,
    ok:"Ja. Hoe ‘ziet’ dat systeem of een cel lichaamsvreemd is?",no:"Denk aan bacteriën die je lichaam binnendringen. Wie ruimt die op?",
    onDone:()=>choiceStep(think,{q:"Waaraan herkent het afweersysteem een cel?",opts:["aan zijn grootte","aan eiwitten op zijn celmembraan","aan zijn kleur"],right:1,
      ok:"Goed. Vergelijk nu die eiwitten van een donor met die van de patiënt zelf.",no:"Bij een transplantatie moet de donor ‘passen’. Waar kijkt men dan naar?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Donorcellen hebben (meestal) <b>andere herkenningseiwitten</b>, zodat het <b>afweersysteem</b> van de patiënt ze kan opruimen (<b>afstoting</b>).",
    "<b>Eigen cellen</b> hebben dezelfde herkenningseiwitten (hetzelfde DNA) en worden <b>niet afgestoten</b>."],
    model:"Cellen van een donor hebben meestal andere herkenningseiwitten. Het afweersysteem van de patiënt ziet ze als lichaamsvreemd en ruimt ze op: het nieuwe hoornvlies wordt afgestoten. Eigen cellen hebben hetzelfde DNA en dus dezelfde herkenningseiwitten; die worden niet afgestoten.",
    valkuil:"‘Donorcellen passen niet in het oog’ of ‘ze hebben ander DNA, dus werken ze niet’ is te vaag. Noem wat het afweersysteem doet en waaraan het de cellen herkent.",
    after:()=>waaromBtn(ans,textBox("Op het membraan van je cellen zitten <b>herkenningseiwitten</b>. Hebben donorcellen andere herkenningseiwitten, dan ruimt het <b>afweersysteem</b> ze op: afstoting. Daarom moet bij een transplantatie, bijvoorbeeld van bloedstamcellen bij leukemie, de donor goed passen. Met <b>eigen</b> cellen speelt dit niet: zelfde DNA, zelfde herkenningseiwitten."))});
  q.append(think,ans);
},STOF_STAM));

ids.push(vraag(2,"blind en valide meten",(q,id)=>{
  pre(q,"<p>In het onderzoek bekeek een oogarts na een jaar of het hoornvlies ‘helder’ was.</p>");
  const {think,ans,unlock}=start(q,B("a Leg uit waarom het beter is als die oogarts niet weet wie welke behandeling kreeg.<br>b Een onderzoeker stelt voor om bij elke patiënt ook te meten hoeveel regels letters hij op een letterkaart kan lezen. Leg uit waarom dat het onderzoek meer valide maakt."));
  choiceStep(think,{q:"‘Helder’ of niet: hoe stelt de oogarts dat vast?",opts:["met een meetapparaat dat een getal geeft","door te kijken en te oordelen","door bloed af te nemen"],right:1,
    ok:"Ja: het is een oordeel. Wat kan dat oordeel beïnvloeden als hij weet wie de nieuwe behandeling kreeg?",no:"Lees de zin nog eens: de oogarts ‘bekeek’ het hoornvlies.",
    onDone:()=>choiceStep(think,{q:"Waarom krijgt een patiënt deze behandeling eigenlijk?",opts:["om een mooier hoornvlies te krijgen","om weer te kunnen zien","om minder pijn te hebben"],right:1,
      ok:"Goed. Meet ‘helder’ precies dat? En wat meet de letterkaart?",no:"Lees de inleiding nog eens: wat kan de patiënt na de brandwond niet meer?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "a <b>Blind meten</b>: de oogarts kan zijn oordeel dan niet (onbewust) laten beïnvloeden door wat hij verwacht.",
    "b Dan meet je <b>wat je wilt weten</b>: of de patiënt weer kan zien (in plaats van alleen hoe het hoornvlies eruitziet)."],
    model:"a Als de oogarts weet wie de behandeling kreeg, kan hij onbewust een hoornvlies eerder ‘helder’ noemen omdat hij dat verwacht. Weet hij het niet (blind meten), dan kan zijn verwachting het oordeel niet beïnvloeden. b Het doel van de behandeling is dat de patiënt weer kan zien. Met de letterkaart meet je het zien zelf, en niet alleen hoe het hoornvlies eruitziet: je meet dus beter wat je wilt weten.",
    valkuil:"Bij b gaat het om valide (meet je wat je wilt weten?), niet om betrouwbaar (krijg je bij herhalen hetzelfde?). Ook goed bij b: een letterkaart geeft een getal en hangt minder af van de mening van de arts, mits je uitlegt dat je zo het zien zelf meet.",
    after:()=>waaromBtn(ans,textBox("a Wie meet, kan zich ongemerkt laten leiden door wat hij verwacht. Daarom werken onderzoekers <b>blind</b>: wie meet of telt, weet niet in welke groep iets hoort.<br>b <b>Valide</b> betekent: je meet echt wat je wilt weten. De behandeling is bedoeld om weer te kunnen zien. ‘Helder’ zegt iets over hoe het hoornvlies eruitziet; de letterkaart meet of de patiënt weer kan lezen, dus het zien zelf."))});
  q.append(think,ans);
},STOF_OND));

if(!VWO){
ids.push(vraag(2,"zelfde DNA, toch anders",(q,id)=>{
  pre(q,"<p>Een cel van het hoornvlies en een huidcel van het ooglid van dezelfde patiënt hebben hetzelfde DNA. Toch is de hoornvliescel doorzichtig en de huidcel niet.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit hoe dat kan."));
  choiceStep(think,{q:"Uit welke cel zijn de hoornvliescel en de huidcel allebei ontstaan?",opts:["uit één bevruchte eicel","uit een stamcel van het hoornvlies","uit verschillende eicellen"],right:0,
    ok:"Ja, door steeds weer mitose. Waarom hebben ze daardoor hetzelfde DNA?",no:"Je begon als één cel.",
    onDone:()=>choiceStep(think,{q:"Als het DNA hetzelfde is, waarin kunnen twee cellen dan verschillen?",opts:["in welke genen aan staan","in welke genen erin zitten","in het aantal chromosomen"],right:0,
      ok:"Goed. Welk begrip uit de film hoort bij een cel die zo een eigen bouw en taak krijgt?",no:"Het DNA is gelijk, dus de genen ook. Maar gebruikt elke cel alle genen?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Alle lichaamscellen zijn door <b>mitose</b> ontstaan uit één bevruchte eicel en hebben dus hetzelfde DNA (dezelfde genen).",
    "In een hoornvliescel staan <b>andere genen aan</b> dan in een huidcel, zodat elke cel een eigen bouw en taak krijgt (<b>differentiatie</b>)."],
    model:"Beide cellen zijn door mitose ontstaan uit dezelfde bevruchte eicel; bij elke mitose krijgen de cellen een kopie van hetzelfde DNA. In een hoornvliescel staan andere genen aan dan in een huidcel. Zo krijgt elke cel een eigen bouw en taak: differentiatie.",
    valkuil:"‘De huidcel heeft andere genen’ of ‘de hoornvliescel is genen kwijtgeraakt’: 0 punten voor het tweede punt. De genen zitten in beide cellen; ze staan alleen aan of uit.",
    after:()=>waaromBtn(ans,textBox("Je begon als één bevruchte eicel, die zich door <b>mitose</b> steeds weer deelde. Bij elke mitose krijgen beide cellen een kopie van hetzelfde DNA. Het verschil zit in welke genen <b>aan</b> staan: in de hoornvliescel andere dan in de huidcel. Een cel die zo een eigen bouw en taak krijgt, is gedifferentieerd: <b>differentiatie</b>."))});
  q.append(think,ans);
},STOF_MITOSE));
}else{
const STOF_POT={titel:"Hoeveel kan een stamcel nog worden?",html:`
<p>Niet elke stamcel kan hetzelfde. De bevruchte eicel kan alles maken. Embryonale stamcellen kunnen nog elke celsoort van het lichaam worden. Volwassen stamcellen maken alleen celsoorten van hun eigen weefsel: een bloedstamcel maakt rode en witte bloedcellen en bloedplaatjes.</p>
<p>Voor vwo hebben biologen vier woorden voor hoeveel een cel nog kan worden: <b>totipotent</b>, <b>pluripotent</b>, <b>multipotent</b> en <b>unipotent</b>.</p>
<p>In 2006 zette Yamanaka cellen van een muis terug tot stamcellen. Zo'n teruggezette cel heet een <b>iPS-cel</b>.</p>`,
films:[F.stam]};
ids.push(vraag(2,"hoeveel kan deze stamcel nog?",(q,id)=>{
  pre(q,"<p>De stamcellen in de rand van het hoornvlies maken alleen nieuwe cellen voor de buitenlaag van het hoornvlies.</p>");
  const {think,ans,unlock}=start(q,B("Zijn deze stamcellen totipotent, pluripotent, multipotent of unipotent? Leg uit, en leg uit waarom een iPS-cel van dezelfde patiënt meer kan."));
  choiceStep(think,{q:"Hoeveel verschillende celsoorten maken de stamcellen in de rand?",opts:["één soort","een paar soorten","alle celsoorten"],right:0,
    ok:"Ja. Welk van de vier woorden hoort bij één celsoort?",no:"Lees de zin boven de vraag nog eens.",
    onDone:()=>choiceStep(think,{q:"Waar staat de ‘i’ in iPS-cel voor?",opts:["geïnduceerd: teruggezet in het lab","immuun","inwendig"],right:0,
      ok:"Goed. Tot wat voor cel wordt hij teruggezet, en hoeveel celsoorten kan die nog worden?",no:"Een iPS-cel ontstaat in het lab uit een gewone cel.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "<b>Unipotent</b>: ze maken maar <b>één soort</b> cel.",
    "Een iPS-cel is <b>pluripotent</b>: teruggezet tot een stamcel die (bijna) <b>elke celsoort</b> van het lichaam kan worden."],
    model:"Ze zijn unipotent, want ze maken maar één soort cel: cellen voor de buitenlaag van het hoornvlies. Een iPS-cel is een cel die in het lab is teruggezet tot een pluripotente stamcel. Die kan (bijna) elke celsoort van het lichaam worden.",
    valkuil:"‘Multipotent, want het zijn volwassen stamcellen’: let op wat er staat: maar één soort cel. En een iPS-cel is niet totipotent: hij kan geen placenta maken.",
    after:()=>waaromBtn(ans,textBox("<b>Totipotent</b>: het hele lichaam en de placenta (bevruchte eicel). <b>Pluripotent</b>: elke celsoort van het lichaam, geen placenta (embryonale stamcellen, iPS-cellen). <b>Multipotent</b>: een paar celsoorten van het eigen weefsel (bloedstamcel). <b>Unipotent</b>: één soort cel, zoals de stamcel in de kiemlaag van je huid en deze stamcel in de rand van het hoornvlies."))});
  q.append(think,ans);
},STOF_POT));
}

opgave("Hoornvlies","Een nieuw hoornvlies uit je andere oog",`
<p>Het hoornvlies aan de voorkant van je oog is bedekt met een dunne laag cellen. Die cellen slijten steeds af en worden vervangen. Nieuwe cellen komen uit stamcellen in de rand van het hoornvlies. Bij een ernstige brandwond door een chemische stof kunnen al die stamcellen verloren gaan. Dan groeit er troebel weefsel over het hoornvlies en ziet de patiënt bijna niets meer.</p>
<p>Er is een behandeling: artsen nemen een stukje van 1 tot 2 mm² uit de rand van het gezonde andere oog. In het lab worden de cellen vermeerderd op een doorzichtig plaatje. Dat plaatje wordt op het beschadigde oog gelegd. In een langlopend onderzoek was de behandeling na een paar jaar bij ongeveer driekwart van de patiënten geslaagd.</p>`,ids);
}

/* ===== Opgave 9: Onderzoek doen (EI-cellen-KF01) ===== */
{
const STOF_CYC={titel:"De stappen van een onderzoek",html:`
<p>Een onderzoek doorloopt een vaste reeks stappen: <b>waarneming</b> → <b>onderzoeksvraag</b> → <b>hypothese</b> → <b>werkplan</b> → proef en <b>resultaten</b> → <b>conclusie</b> → <b>discussie</b>. Vaak levert de discussie weer een nieuwe vraag op.</p>
<p>Een goede hypothese is <b>falsifieerbaar</b>: er is een uitkomst denkbaar die haar weerlegt. Komt die uitkomst, dan verwerp je de hypothese. Dat is geen mislukte proef: je weet dan iets nieuws.</p>`,
films:[F.ond]};
const q1=vraag(2,"onderzoeksvraag en hypothese",(q,id)=>{
  pre(q,"<p>Femke ziet dat madeliefjes in de schaduw langere stelen hebben dan in de zon.</p>");
  const {think,ans,unlock}=start(q,B("a Schrijf een goede onderzoeksvraag bij deze waarneming.<br>b Schrijf een hypothese en de verwachting die erbij hoort."));
  choiceStep(think,{q:"Welke factor verschilt tussen schaduw en zon, die Femke kan onderzoeken?",opts:["de hoeveelheid licht","de soort plant","de kleur van de bloem"],right:0,
    ok:"Ja. Een goede onderzoeksvraag gaat over één factor en over iets wat je kunt meten. Wat meet Femke?",no:"Het zijn allemaal madeliefjes. Wat is er anders in de schaduw?",
    onDone:()=>choiceStep(think,{q:"Wat is het verschil tussen een hypothese en een verwachting?",opts:["er is geen verschil","de hypothese is het idee, de verwachting is wat je dan in de proef zou meten","de verwachting komt na de proef"],right:1,
      ok:"Goed. Schrijf ze allebei op; voor de verwachting helpt de vorm ‘als … dan …’.",no:"Denk aan Semmelweis in de film: wat was zijn idee, en wat verwachtte hij dan te zien?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "a Een vraag over <b>één factor</b> die <b>meetbaar</b> is, bijvoorbeeld: ‘Krijgen madeliefjes in het donker langere stelen dan in het licht?’",
    "b <b>Hypothese</b> (het idee) en <b>verwachting</b> (wat je dan meet, met als … dan), bijvoorbeeld: ‘Weinig licht maakt de stelen langer. Als dat zo is, dan zijn de stelen van madeliefjes in de schaduw na drie weken langer dan in de zon.’"],
    model:"a Krijgen madeliefjes bij weinig licht langere stelen dan bij veel licht? b Hypothese: weinig licht maakt de stelen van madeliefjes langer. Verwachting: als dat zo is, dan zijn de stelen van madeliefjes die drie weken in de schaduw staan langer dan die van madeliefjes in de zon.",
    valkuil:"Een vage vraag als ‘Wat doet licht met madeliefjes?’: 0 punten voor a. Bij b moeten hypothese én verwachting er allebei staan.",
    after:()=>waaromBtn(ans,textBox("Een <b>onderzoeksvraag</b> gaat over één factor (hier: licht) en over iets wat je kunt meten (de lengte van de stelen). ‘Wat doet licht met madeliefjes?’ is te vaag. De <b>hypothese</b> is een mogelijk antwoord, het idee zelf. De <b>verwachting</b> zegt wat je in deze proef zult meten als de hypothese klopt, vaak met ‘als … dan …’."))});
  q.append(think,ans);
},STOF_CYC);
opgave("Onderzoek","Onderzoek doen",GEEN_INLEIDING,[q1]);
}
