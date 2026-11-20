/* ===== Opgave 6: Biest voor het kalf (eigen vragen A01, A02, havo A03 / vwo A04) ===== */
{
const STOF_IMM={titel:"Actieve en passieve immunisatie",html:`
<p><b>Immunisatie</b> betekent dat je bescherming krijgt tegen een ziekteverwekker. Je onderscheidt twee dingen:</p>
<ul style="margin:0;padding-left:20px">
<li><b>Actief</b>: je lichaam maakt de afweer zelf. Passende B- en T-cellen worden gekozen en vermenigvuldigd en er ontstaan geheugencellen. Dat duurt even, maar de bescherming houdt lang.</li>
<li><b>Passief</b>: je krijgt kant-en-klare antistoffen. Ze beschermen meteen, maar tijdelijk.</li></ul>
<p>Daarnaast is immunisatie <b>natuurlijk</b> (het gebeurt vanzelf, zonder medische handeling) of <b>kunstmatig</b> (door een medische handeling, zoals een prik met een vaccin of met serum).</p>`,
films:[F.vb]};
const STOF_PRIK={titel:"Waarom een tweede prik?",html:`
<p>Een <b>vaccin</b> bevat antigenen, maar je wordt er niet ziek van. Je afweer reageert alsof het echt is: passende B- en T-cellen worden gekozen en vermenigvuldigd, en er ontstaan geheugencellen.</p>
<p>Hoe je afweer reageert, hangt af van wat hij al kent. Bij het eerste contact met een antigeen is de reactie traag en laag; bij een volgend contact met hetzelfde antigeen sneller en sterker.</p>`,
films:[F.vb,F.as]};

const q1=vraag(2,"welke immunisatie is biest?",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Is de bescherming die een kalf via de biest krijgt actieve of passieve immunisatie, en natuurlijk of kunstmatig? Leg je antwoord uit."));
  choiceStep(think,{q:"Waarin verschillen actieve en passieve immunisatie?",opts:["in wie de afweer maakt: je eigen lichaam, of je krijgt hem kant-en-klaar","in de manier: actief gaat met een prik, passief zonder"],right:0,
    ok:"Ja. Pas dat nu toe op het kalf: lees in de inleiding van wie de antistoffen in de biest komen.",no:"Dat is het verschil tussen kunstmatig en natuurlijk. Actief en passief gaat over iets anders: kijk in ‘Uitleg van de stof’.",
    onDone:()=>choiceStep(think,{q:"Wanneer noem je een immunisatie kunstmatig?",opts:["als er een medische handeling aan te pas komt","als de antistoffen van een ander komen","als het snel werkt"],right:0,
      ok:"Goed. Kies nu bij allebei het juiste woord en leg met de inleiding uit waarom.",no:"Kunstmatig of natuurlijk gaat over de manier waarop je de bescherming krijgt.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "<b>Passief</b>, want het kalf krijgt <b>kant-en-klare antistoffen</b>; zijn eigen B-cellen komen er niet aan te pas (geen geheugencellen).",
    "<b>Natuurlijk</b>, want het gaat <b>via de melk van de moeder</b> (niet via een injectie)."],
    model:"Het is passieve immunisatie: het kalf krijgt kant-en-klare antistoffen van de koe en maakt ze niet zelf, dus er ontstaan geen geheugencellen. Het is natuurlijke immunisatie: de antistoffen komen via de melk van de moeder, niet via een injectie.",
    valkuil:"Alleen de woorden ‘passief’ en ‘natuurlijk’ zonder uitleg: 0 punten. Een advies van de veehouder maakt het nog geen kunstmatige immunisatie."});
  q.append(think,ans);
},STOF_IMM);

const q2=vraag(2,"afbeelding 1: eerst omlaag, dan omhoog",(q,id)=>{
  pre(q,"<p>In afbeelding 1 daalt de hoeveelheid antistoffen in het bloed van het kalf eerst, en vanaf ongeveer week 3 stijgt hij weer.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit waardoor de hoeveelheid eerst daalt, en waardoor hij daarna weer stijgt."));
  choiceStep(think,{q:"Waar komen de antistoffen in het bloed van het kalf in de eerste dagen vandaan?",opts:["uit de biest, van de koe","van het kalf zelf"],right:0,
    ok:"Ja. Kan het kalf van die antistoffen nieuwe bijmaken? En blijft een antistof altijd in het bloed?",no:"Lees de inleiding: met hoeveel antistoffen wordt een kalf geboren?",
    onDone:()=>choiceStep(think,{q:"Een kalf komt in zijn eerste weken overal ziekteverwekkers tegen. Hoe lang duurt het ongeveer voordat een primaire reactie veel antistoffen geeft?",opts:["een paar uur","een week of twee","een jaar"],right:1,
      ok:"Goed. Leg nu het dalen én het stijgen uit.",no:"Bij het eerste contact verschijnen pas na ongeveer een week de eerste antistoffen.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "De antistoffen uit de biest (van de koe) <b>worden afgebroken</b> en er komen er <b>geen nieuwe bij</b>, want het kalf heeft er zelf geen B-cellen of geheugencellen voor.",
    "Het kalf komt zelf in aanraking met <b>ziekteverwekkers</b>; passende B-cellen worden gekozen en vermenigvuldigd en <b>plasmacellen maken eigen antistoffen</b> (primaire reactie, duurt even)."],
    model:"De antistoffen in het bloed komen eerst uit de biest. Die worden langzaam afgebroken, en het kalf maakt ze niet bij, want het heeft geen passende B-cellen of geheugencellen voor die antistoffen. Ondertussen komt het kalf zelf ziekteverwekkers tegen. Passende B-cellen worden gekozen en vermenigvuldigd, en plasmacellen gaan eigen antistoffen maken. Dat duurt een paar weken (primaire reactie), dus vanaf ongeveer week 3 stijgt de hoeveelheid weer.",
    valkuil:"‘De koe geeft minder biest’ of ‘de darm neemt geen antistoffen meer op’, zonder dat de antistoffen worden afgebroken: 0 punten voor het eerste element.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"De totale hoeveelheid antistoffen, zoals in afbeelding 1."},
      {cap:"Deel 1: de antistoffen uit de biest. Ze worden afgebroken en het kalf maakt ze niet bij: de lijn daalt.",toon:["tot","b"]},
      {cap:"Deel 2: de antistoffen die het kalf zelf maakt. Na het eerste contact met ziekteverwekkers duurt het even (primaire reactie), daarna stijgt deze lijn.",toon:["tot","e"]},
      {cap:"Samen geven ze de totale lijn: eerst omlaag (biest wordt afgebroken), vanaf ongeveer week 3 omhoog (eigen antistoffen).",toon:["tot","b","e"],hl:[2.4,3.6]}],
      (st,s,i)=>st.innerHTML=i===0?KALF():KALF({split:true,toon:s.toon,hl:s.hl})))});
  q.append(think,ans);
},STOF_IMM);

const ids=[q1,q2];
if(!VWO){
ids.push(vraag(2,"de koe inenten, het kalf beschermd",(q,id)=>{
  pre(q,"<p>Een veehouder laat zijn koeien zes weken voor het kalven inenten tegen een virus dat bij jonge kalveren diarree veroorzaakt. Vlak voor het kalven krijgen de koeien een tweede prik met hetzelfde vaccin.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit hoe het inenten van de koe het kalf beschermt, en waarom de tweede prik die bescherming beter maakt."));
  choiceStep(think,{q:"Wie maakt na de prik antistoffen tegen het virus?",opts:["de koe","het kalf"],right:0,
    ok:"Ja. Hoe komen die antistoffen bij het kalf? Lees de inleiding van de opgave nog eens.",no:"Het kalf is nog niet geboren als de koe de prik krijgt.",
    onDone:()=>choiceStep(think,{q:"Wat heeft de koe na de eerste prik, waardoor ze op de tweede prik anders reageert?",opts:["geheugencellen","een grotere uier","antistoffen van het kalf"],right:0,
      ok:"Goed. Hoe reageren geheugencellen op een tweede contact met hetzelfde antigeen, en wat betekent dat voor de biest?",no:"Na het eerste contact met een antigeen blijven er cellen over die het onthouden.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "De <b>koe maakt zelf antistoffen</b> tegen het virus, die <b>in de biest</b> komen; via de biest krijgt het kalf die antistoffen.",
    "Na de eerste prik heeft de koe <b>geheugencellen</b>; de tweede prik geeft een <b>secundaire reactie met veel meer antistoffen</b>, dus er zitten meer antistoffen tegen het virus in de biest."],
    model:"Na de prik maakt de koe zelf antistoffen tegen het virus. Die komen in de biest, en het kalf neemt ze op in zijn bloed. Na de eerste prik heeft de koe geheugencellen. Bij de tweede prik reageren die snel, met veel meer antistoffen: een secundaire reactie. Daardoor zitten er vlak na het kalven veel meer antistoffen tegen het virus in de biest.",
    valkuil:"‘Het kalf wordt via de biest ingeënt en maakt zelf geheugencellen’: 0 punten voor het eerste element. De koe is actief geïmmuniseerd, het kalf passief.",
    after:()=>waaromBtn(ans,textBox("Hier zitten twee soorten immunisatie in één verhaal. De <b>koe</b> wordt <b>actief</b> geïmmuniseerd: zij maakt zelf antistoffen en geheugencellen. De tweede prik geeft een secundaire reactie: sneller en met veel meer antistoffen, precies op tijd voor de biest. Het <b>kalf</b> wordt <b>passief</b> geïmmuniseerd: het drinkt de kant-en-klare antistoffen van de koe."))});
  q.append(think,ans);
},STOF_PRIK));
}else{
ids.push(vraag(2,"biest werkt een vaccin tegen (vwo)",(q,id)=>{
  pre(q,"<p>Kalveren die veel biest hebben gekregen, reageren in hun eerste levensweken vaak slecht op een vaccin tegen het diarreevirus: ze maken dan weinig geheugencellen.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit hoe de antistoffen uit de biest de werking van het vaccin kunnen tegenwerken."));
  choiceStep(think,{q:"Wat bevat het vaccin?",opts:["antigenen van het virus","antistoffen tegen het virus"],right:0,
    ok:"Ja. In het bloed van het kalf zitten ook nog antistoffen uit de biest tegen dit virus. Wat doen die met de antigenen?",no:"Een vaccin laat je afweer zelf iets maken. Wat moet je afweer dan te zien krijgen?",
    onDone:()=>choiceStep(think,{q:"Wat is er nodig om bij het kalf geheugencellen te krijgen?",opts:["de eigen lymfocyten van het kalf moeten het antigeen tegenkomen","het kalf moet antistoffen uit de biest opnemen"],right:0,
      ok:"Goed. Zet die twee dingen nu achter elkaar.",no:"Geheugencellen ontstaan uit de eigen cellen van het kalf.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "De antistoffen uit de biest <b>binden aan de antigenen van het vaccin</b> (maken ze onschadelijk / markeren ze), zodat <b>fagocyten ze opruimen</b>.",
    "Daardoor komen er <b>weinig antigenen bij de B-cellen</b> (en T-cellen) van het kalf zelf, die dus nauwelijks worden gekozen en vermenigvuldigd en <b>weinig geheugencellen</b> vormen."],
    model:"De antistoffen uit de biest binden aan de antigenen uit het vaccin en markeren ze, zodat fagocyten ze opruimen voordat de eigen afweer van het kalf ze goed ziet. De B-cellen en T-cellen van het kalf komen dan weinig antigenen tegen, worden nauwelijks gekozen en vermenigvuldigd en vormen weinig geheugencellen.",
    valkuil:"‘De biest maakt het vaccin kapot’ zonder dat de antistoffen aan de antigenen binden: geen punt voor het eerste element.",
    after:()=>waaromBtn(ans,textBox("Passieve en actieve immunisatie zitten elkaar hier in de weg. De kant-en-klare antistoffen uit de biest (passief) vangen de antigenen uit het vaccin weg. Het vaccin (actief) heeft juist nodig dat de eigen B- en T-cellen van het kalf die antigenen tegenkomen. Hetzelfde idee zag je bij de anti-D-injectie: kant-en-klare antistoffen ruimen antigenen op voordat de eigen afweer geheugencellen maakt."))});
  q.append(think,ans);
},STOF_PRIK));
}

opgave("Biest voor het kalf","Biest voor het kalf",`
<p>Een kalf wordt geboren zonder antistoffen in zijn bloed: bij koeien gaan er geen antistoffen door de placenta naar het kalf. De eerste melk na het kalven, de biest, bevat heel veel antistoffen van de koe. De darm van een pasgeboren kalf kan die antistoffen in de eerste uren na de geboorte opnemen in het bloed. Veehouders krijgen het advies om een kalf in de eerste 24 uur 6 liter biest te geven, het liefst 4 liter in het eerste uur.</p>
<p>In afbeelding 1 zie je de totale hoeveelheid antistoffen in het bloed van een kalf dat op tijd genoeg biest kreeg.</p>
<div class="eyebrow">afbeelding 1 (fictieve gegevens, vereenvoudigd)</div>${KALF()}`,ids);
}

/* ===== Opgave 7: Vaccins en allergie (eigen vraag ND37) ===== */
{
const STOF_ALL={titel:"Allergie",html:`
<p>Bij een <b>allergie</b> reageert je afweer op een onschuldige stof, het <b>allergeen</b>, alsof het gevaarlijk is. Bij het eerste contact merk je nog niets: plasmacellen maken antistoffen tegen het allergeen, en die gaan vastzitten op <b>mestcellen</b>.</p>
<p>Bij een volgend contact bindt het allergeen aan die antistoffen. Dan geven de mestcellen <b>histamine</b> af, de alarmstof die je ook bij een ontsteking zag.</p>
<p>Een allergie betekent dus geen zwakke afweer: hij reageert juist te sterk.</p>`,
films:[F.vb,F.ev]};
const q1=vraag(2,"pinda-allergie en antihistaminica",(q,id)=>{
  pre(q,"<p>Sara is allergisch voor pinda's. Ze heeft altijd antihistaminica en een noodinjectie bij zich.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit hoe antihistaminica haar klachten verminderen, en waarom een pinda-allergie gevaarlijker kan zijn dan hooikoorts."));
  choiceStep(think,{q:"Welke stof geven de mestcellen af bij een allergische reactie?",opts:["histamine","insuline","antistoffen"],right:0,
    ok:"Ja. Wat doet die stof met de haarvaten? Denk aan de splinter uit film 1.",no:"Het is dezelfde alarmstof als bij een ontsteking.",
    onDone:()=>choiceStep(think,{q:"Bij hooikoorts reageren vooral je neus en je ogen. Kan een allergische reactie ook in veel delen van je lichaam tegelijk optreden?",opts:["ja","nee, alleen op de plek waar het allergeen binnenkomt"],right:0,
      ok:"Klopt. Bedenk wat het betekent als heel veel haarvaten tegelijk wijder worden en lekken, en waarom Sara naast de pillen ook een noodinjectie bij zich heeft.",no:"Een allergeen dat je eet, komt in je bloed en kan zo overal mestcellen bereiken.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Antihistaminica <b>blokkeren de werking van histamine</b> dat de mestcellen afgeven, zodat de haarvaten <b>minder wijder worden en minder lekken</b>.",
    "Bij een pinda-allergie kan de reactie <b>zo sterk</b> zijn dat het <b>levensgevaarlijk</b> wordt."],
    model:"Bij een allergische reactie geven mestcellen histamine af. Histamine maakt de haarvaten wijder en laat ze vocht lekken. Antihistaminica blokkeren de werking van histamine, zodat de haarvaten minder wijder worden en minder lekken. Bij hooikoorts blijft het bij niezen en jeuk, maar een pinda-allergie kan zo sterk zijn dat de reactie levensgevaarlijk wordt; daarom heeft Sara ook een noodinjectie.",
    valkuil:"‘Antihistaminica doden de mestcellen’ of ‘ze remmen de antistoffen’ is fout: ze werken op het effect van histamine."});
  q.append(think,ans);
},STOF_ALL);
opgave("Vaccins en allergie","Vaccins en allergie",GEEN_INLEIDING,[q1]);
}
