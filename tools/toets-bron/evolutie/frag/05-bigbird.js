/* ===== Opgave 5: Een nieuwe vinkenlijn op Daphne Major (EI-evolutie-B01, B02, B03; havo ook B04, B05) =====
   Gegevens: Lamichhaney e.a. (2018) Science 359: 224–228; cladogram naar Sato e.a. (1999) en Lamichhaney e.a. (2015). */
{
const STOF_CLAD={titel:"Een cladogram lezen",html:`
<p>Een <b>cladogram</b> is een stamboom van soorten. Elk <b>knooppunt</b> staat voor een gemeenschappelijke voorouder: een populatie die zich splitste in twee lijnen. Volg je een lijn van een soort naar de wortel, dan volg je zijn afstammingslijn.</p>
<p>Hoe <b>jonger</b> de laatste gemeenschappelijke voorouder van twee soorten (hoe verder naar de bladeren het knooppunt ligt), hoe <b>nauwer verwant</b> ze zijn. Lees een cladogram aan de vertakkingen, nooit aan de volgorde van de namen: draai je takken om een knooppunt, dan blijft de boom dezelfde.</p>
<p>Een soort die nu leeft, is nooit de voorouder van een andere soort die nu leeft. Alle soorten aan de rechterkant hebben even lang gehad om te veranderen.</p>`,
films:[F.e8]};
const STOF_SOORT={titel:"Genenstroom en reproductieve isolatie",html:`
<p>Zolang twee groepen zich met elkaar voortplanten, gaan er allelen van de ene groep naar de andere: <b>genenstroom</b>.</p>
<p>Planten twee groepen zich in de natuur niet meer met elkaar voort, dan heet dat <b>reproductieve isolatie</b>. Dat kan op verschillende manieren: soms zit er een barrière tussen de groepen, soms komen ze elkaar wel tegen maar vormen ze toch geen paren met elkaar.</p>`,
films:[F.e6]};
const STOF_DRIFT={titel:"Toeval en uitwisseling",html:`
<p>Niet alleen selectie verandert een genenpool. In elke generatie wordt maar een deel van de allelen doorgegeven, en welk deel is soms <b>toeval</b>. Dat heet <b>genetische drift</b>. In een kleine populatie is het effect van toeval groot: een allel kan zo zomaar verdwijnen.</p>
<p>Begint een nieuwe populatie met maar een paar individuen, dan neemt die alleen hun allelen mee: het <b>founder-effect</b>. Slinkt een populatie tijdelijk tot een paar individuen, dan heet dat een <b>flessenhals</b>. In beide gevallen gaat genetische variatie verloren.</p>
<p>Komen er individuen uit een andere populatie bij die zich voortplanten, dan brengen ze nieuwe allelen mee: <b>genenstroom</b>. Genenstroom maakt de variatie juist groter.</p>`,
films:[F.e5]};

const q1=vraag(1,"het cladogram van de vinken",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Welke uitspraak over afbeelding 2 is juist?"));
  choiceStep(think,{q:"Hoe lees je in een cladogram hoe nauw twee soorten verwant zijn?",opts:["aan hoe dicht hun namen bij elkaar staan","aan hoe jong hun laatste gemeenschappelijke voorouder is: het knooppunt waar hun lijnen samenkomen","aan hoe lang hun takken zijn"],right:1,
    ok:"Ja. Zoek bij elke uitspraak het knooppunt waar de lijnen samenkomen, en vergelijk.",no:"De volgorde van de namen kun je omdraaien zonder dat de boom verandert. Waar kijk je dan naar?",onDone:unlock});
  mc(ans,{qid:id,pts:1,right:1,opts:["De zangervink is de voorouder van de andere zes soorten in het cladogram.","De kleine boomvink is nauwer verwant aan de grote grondvink dan aan de vegetarische vink.","De grote cactusvink is even nauw verwant aan de middelste grondvink als aan de grote grondvink.","De vegetarische vink is minder ver geëvolueerd dan de vier grondvinken."],
    onChecked:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"<b>A</b>: de zangervink leeft nu, net als de andere zes. Een soort die nu leeft, is nooit de voorouder van een andere soort die nu leeft. Hij splitste alleen het eerst af.",o:{vet:["zang"],dots:["wortel"]}},
      {cap:"<b>B</b>: kleine boomvink en grote grondvink komen samen in dit knooppunt…",o:{vet:["boom","ma"],dots:["kboom"]}},
      {cap:"…kleine boomvink en vegetarische vink pas in dit oudere knooppunt, verder naar links. De voorouder met de grote grondvink is dus jonger: B is <b>juist</b>.",o:{vet:["boom","veg"],dots:["kveg"]}},
      {cap:"<b>C</b>: de grote cactusvink deelt met de grote grondvink een jongere voorouder dan met de middelste grondvink. Niet even nauw.",o:{vet:["co","ma","fo"],dots:["kco","kgeo"]}},
      {cap:"<b>D</b>: alle soorten rechts hebben even lang gehad om te veranderen. ‘Minder ver geëvolueerd’ bestaat in een cladogram niet.",o:{vet:["zang","veg","boom","fu","fo","co","ma"]}}],
      (st,s)=>st.innerHTML=VINKEN(s.o)))});
  q.append(think,ans);
},STOF_CLAD);

const q2=vraag(2,"de zang houdt de lijn apart",(q,id)=>{
  pre(q,"<p>De Big Bird-lijn leeft op hetzelfde eiland als de middelste grondvink, maar de vogels van beide groepen planten zich niet met elkaar voort.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit hoe het leren van de zang ervoor zorgt dat de Big Bird-lijn reproductief geïsoleerd blijft van de middelste grondvinken."));
  choiceStep(think,{q:"Van wie leert een jong Big Bird-mannetje zijn zang?",opts:["van zijn vader","van de middelste grondvinken om hem heen","de zang is aangeboren"],right:0,
    ok:"Ja, zo staat het in de inleiding. Hoe zingt hij dan, vergeleken met een mannetje van de middelste grondvink?",no:"Lees het eerste punt van de lijst in de inleiding nog eens.",
    onDone:()=>choiceStep(think,{q:"Welk mannetje kiest een vrouwtje?",opts:["een mannetje dat zingt zoals haar eigen vader","het mannetje met de grootste snavel","maakt niet uit"],right:0,
      ok:"Goed. Wat betekent dat voor paringen en voor de uitwisseling van genen tussen beide groepen?",no:"Ook dat staat in het eerste punt van de lijst.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "mannetjes van de Big Bird-lijn <b>leren de afwijkende zang van hun vader</b> (de immigrant) en zingen dus anders dan mannetjes van de middelste grondvink",
    "vrouwtjes van de Big Bird-lijn kiezen daardoor <b>alleen Big Bird-mannetjes</b> (en vrouwtjes van de middelste grondvink alleen mannetjes van hun eigen soort), zodat er <b>geen paring en geen uitwisseling van genen</b> is tussen beide groepen"],
    model:"Jonge Big Bird-mannetjes leren de afwijkende zang van hun vader en zingen dus anders dan middelste grondvinken. Vrouwtjes kiezen een partner die zingt zoals hun eigen vader: Big Bird-vrouwtjes kiezen dus Big Bird-mannetjes, en grondvinkvrouwtjes kiezen grondvinkmannetjes. Zo paren de groepen niet met elkaar en is er geen uitwisseling van genen.",
    valkuil:"Een antwoord als ‘ze zingen anders, dus ze herkennen elkaar niet’ levert alleen het eerste scorepunt op.",
    after:()=>waaromBtn(ans,textBox("De zang werkt als een <b>wachtwoord</b> dat van vader op zoon gaat. Big Bird-zonen leren het Big Bird-lied; grondvinkzonen leren het grondvinklied. Dochters kiezen een man die klinkt als hun vader. Zo vormt elke groep alleen paren binnen de eigen groep, en er gaan geen allelen van de ene genenpool naar de andere. Dat is een vorm van isolatie <b>vóór de bevruchting</b>: er is geen barrière zoals een zee nodig."))});
  q.append(think,ans);
},STOF_SOORT);

const q3=vraag(2,"minder genetische variatie",(q,id)=>{
  pre(q,"<p>DNA-onderzoek liet zien dat de genetische variatie in de Big Bird-lijn in de vierde tot en met de zesde generatie kleiner was dan in de eerste generatie.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit waardoor de genetische variatie in de Big Bird-lijn kleiner werd. Gebruik twee gegevens uit de inleiding."));
  choiceStep(think,{q:"Kan genetische variatie in een kleine groep ook verloren gaan zonder selectie?",opts:["ja, door toeval: niet alle allelen worden doorgegeven","nee, dat kan alleen door selectie"],right:0,
    ok:"Ja. Hoe kleiner de groep, hoe groter de rol van toeval.",no:"Denk aan de film over toeval: wat gebeurt er met allelen in een heel kleine groep?",
    onDone:()=>choiceStep(think,{q:"Waardoor kan de variatie in een groep juist weer groter worden?",opts:["doordat er allelen van buiten de groep bij komen","doordat de groep kleiner wordt"],right:0,
      ok:"Goed. Zoek nu in de inleiding twee gegevens die hierbij passen.",no:"Een kleinere groep heeft minder allelen, niet meer.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "alle latere vogels stammen af van <b>één broer-zuspaar</b>, dat maar een (toevallig) deel van de allelen van de lijn bezat / waardoor allelen verloren gingen",
    "door de reproductieve isolatie / doordat de vogels <b>alleen met elkaar paren</b> komen er <b>geen nieuwe allelen</b> van andere vinken in de lijn (geen genenstroom)"],
    model:"In de derde generatie plantte zich nog maar één broer-zuspaar voort. Dat paar had maar een toevallig deel van de allelen van de lijn, dus allelen gingen verloren. Omdat de vogels daarna alleen nog met elkaar paarden, kwamen er geen nieuwe allelen van andere vinken bij: er was geen genenstroom.",
    valkuil:"Een antwoord als ‘door inteelt’ zonder uitleg levert 0 punten op. Een antwoord waarin natuurlijke selectie de oorzaak is, levert 0 punten op.",
    after:()=>waaromBtn(ans,textBox("Twee dingen werkten samen. Eerst een <b>flessenhals</b>: in de derde generatie bracht nog maar één broer-zuspaar jongen voort. Alleen de allelen van die twee gingen mee naar de volgende generaties; de rest was door toeval weg. Daarna was er <b>geen genenstroom</b>: de lijn paarde alleen met zichzelf, dus er kwamen geen nieuwe allelen bij om het verlies aan te vullen. Selectie is hier niet nodig om de variatie te laten dalen."))});
  q.append(think,ans);
},STOF_DRIFT);

const ids=[q1,q2,q3];
if(!VWO){
  const q4=vraag(2,"juist of onjuist: de Big Bird-lijn",(q,id)=>{
    q.append(el("p",{class:"qtext"},"Drie uitspraken over de Big Bird-lijn:<br>1 De reproductieve isolatie tussen de Big Bird-lijn en de middelste grondvink is ontstaan doordat de zee de groepen van elkaar scheidt.<br>2 Door de reproductieve isolatie kan de genenpool van de Big Bird-lijn veranderen zonder dat de genenpool van de middelste grondvink mee verandert.<br>3 Je mag de Big Bird-lijn pas een nieuwe soort noemen als de vogels er anders uitzien dan alle andere vinkensoorten.<br><br><b>Schrijf de nummers 1, 2 en 3 onder elkaar en noteer erachter of de uitspraak juist of onjuist is.</b>"));
    const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
    choiceStep(think,{q:"Wat is het verschil tussen geografische en reproductieve isolatie?",opts:["bij geografische isolatie scheidt een barrière de groepen; bij reproductieve isolatie krijgen ze samen geen vruchtbare jongen meer","er is geen verschil: beide betekenen dat groepen ver uit elkaar wonen"],right:0,
      ok:"Ja. Lees de inleiding nog eens: waar leven deze vinken, en waardoor planten ze zich niet met elkaar voort?",no:"Reproductieve isolatie kan ook als twee groepen op dezelfde plek leven.",onDone:unlock});
    juistOnjuist(ans,{id,stm:["de zee scheidt de groepen","de genenpool van de lijn kan los van die van de grondvink veranderen","pas een soort als ze er anders uitzien"],key:[false,true,false],
      uitleg:textBox("1 <b>onjuist</b>: beide groepen leven op hetzelfde eiland. De isolatie komt door de zang en de partnerkeuze, niet door de zee.<br>2 <b>juist</b>: zonder genenstroom tussen beide groepen kan de genenpool van de ene groep veranderen terwijl die van de andere gelijk blijft.<br>3 <b>onjuist</b>: of groepen tot verschillende soorten horen, hangt af van de vraag of ze in de natuur samen vruchtbare nakomelingen krijgen, niet van het uiterlijk.")});
    q.append(think,ans);
  },TERUG("Wanneer is het een soort?",F.e6,"Wat is een soort?"));
  const q5=vraag(2,"past niet als één tak",(q,id)=>{
    pre(q,"<p>Iemand wil de Big Bird-lijn als achtste tak toevoegen aan het cladogram van afbeelding 2. Dat kan niet zomaar.</p>");
    const {think,ans,unlock}=start(q,B("Leg met behulp van de herkomst van de Big Bird-lijn uit waarom deze lijn niet als één nieuwe tak in het cladogram past."));
    choiceStep(think,{q:"Van welke soort(en) stamt de Big Bird-lijn af?",opts:["alleen van de middelste grondvink","alleen van de grote cactusvink","van een grote cactusvink én een middelste grondvink"],right:2,
      ok:"Ja: de vader was een grote cactusvink, de moeder een middelste grondvink. Zoek die twee soorten op in afbeelding 2.",no:"Lees de inleiding nog eens: wie waren de vader en de moeder van de eerste Big Bird-jongen?",
      onDone:()=>choiceStep(think,{q:"Hoe ontstaat in een cladogram een nieuwe tak?",opts:["doordat één lijn zich splitst in twee","doordat twee lijnen samengaan"],right:0,
        ok:"Goed. Leg nu uit waarom de Big Bird-lijn daar niet in past.",no:"Elk knooppunt is een voorouder die zich splitste.",onDone:unlock})});
    openAnswer(ans,{id,pts:2,checks:[
      "de Big Bird-lijn stamt af van <b>twee verschillende soorten</b> (de grote cactusvink en de middelste grondvink) / is een kruising (hybride) van twee soorten",
      "in een cladogram ontstaat elke tak door een <b>splitsing uit één voorouder</b> / takken gaan alleen uit elkaar en komen niet weer samen, zodat de lijn bij <b>twee takken tegelijk</b> zou horen"],
      model:"De Big Bird-lijn is een kruising van twee soorten: een grote cactusvink en een middelste grondvink. In een cladogram splitst een tak zich alleen in tweeën; takken komen niet weer samen. De Big Bird-lijn zou dus aan twee takken tegelijk vastzitten.",
      after:()=>waaromBtn(ans,b=>stepAnim(b,[
        {cap:"De vader van de lijn was een grote cactusvink…",o:{vet:["co"],hl:["co"]}},
        {cap:"…de moeder een middelste grondvink. Die twee soorten zitten op verschillende takken.",o:{vet:["co","fo"],hl:["co","fo"]}},
        {cap:"In een cladogram splitst elk knooppunt één lijn in tweeën. Een lijn die uit twee takken samenkomt, past daar niet als één nieuwe tak in.",o:{vet:["co","fo"],hl:["co","fo"],dots:["kgeo"]}}],
        (st,s)=>st.innerHTML=VINKEN(s.o)))});
    q.append(think,ans);
  },STOF_CLAD);
  ids.push(q4,q5);
}

opgave("Big Bird","Een nieuwe vinkenlijn op Daphne Major",`
<p>Op de Galápagoseilanden leven ongeveer vijftien soorten Darwinvinken. Ze verschillen vooral in de vorm en grootte van hun snavel en in hun zang. Afbeelding 2 is een cladogram van zeven van deze soorten.</p>
<div class="eyebrow">afbeelding 2 (vereenvoudigd)</div>${VINKEN()}
<p>Op het kleine eiland Daphne Major onderzoeken biologen al tientallen jaren alle vinken. In 1981 zagen ze daar een onbekend, groot mannetje met een afwijkende zang. Veel later bleek uit DNA-onderzoek dat het een grote cactusvink was van het eiland Española, meer dan 100 km verderop. Dit mannetje paarde met een vrouwtje van de middelste grondvink, een soort die op Daphne Major algemeen is. Hun nakomelingen worden de ‘Big Bird’-lijn genoemd.</p>
<p>Over de Big Bird-lijn is het volgende bekend:</p>
${LIJST(["Jonge mannetjes leren de zang van hun vader. Vrouwtjes kiezen een partner die zingt zoals hun eigen vader.","De vogels hebben een grotere snavel dan de andere vinken op Daphne Major.","Op één uitzondering in de eerste generatie na, paarden de nakomelingen alleen nog met elkaar.","In de derde generatie plantte zich nog maar één broer-zuspaar voort. Alle vogels van de vierde tot en met de zesde generatie stammen van dit paar af.","In 2010 bestond de lijn uit 36 vogels, met acht broedparen."])}`,ids);
}
