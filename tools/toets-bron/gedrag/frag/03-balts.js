/* ===== Opgave 3: Baltsen en kiezen (EI-gedrag-KC02) ===== */
{
const STOF={titel:"Waarom kiest het vrouwtje?",html:`
<p>Een vrouwtje maakt weinig eicellen, en die zijn groot en kostbaar. Een mannetje maakt miljoenen kleine zaadcellen. Vaak zorgt het vrouwtje daarna ook nog voor de jongen. Een vrouwtje <b>investeert</b> dus meestal meer in elk jong, en voor haar is een slechte keuze duur. Daarom is zij kieskeurig, en moeten mannetjes opvallen: met vechten of met showen.</p>
<p>Wil je weten of vrouwtjes echt op één kenmerk kiezen, dan verander je dat kenmerk bij een paar mannetjes en kijk je wat de vrouwtjes doen. Met een <b>controlegroep</b> sluit je uit dat de behandeling zelf het verschil maakt.</p>`,
films:[F.balts]};
const q1=vraag(2,"de staart van de widavogel",(q,id)=>{
  const {think,ans,unlock}=start(q,"Bij widavogels deed een onderzoeker een proef met de staart van de mannetjes. "+B("Beschrijf de drie groepen en de uitkomst, en leg uit welke vorm van selectie deze proef laat zien."));
  choiceStep(think,{q:"Wat wilde de onderzoeker met deze proef te weten komen?",opts:["of een lange staart helpt bij het vliegen","of vrouwtjes kiezen op de lengte van de staart","of mannetjes vechten om de langste staart"],right:1,
    ok:"Ja. Bedenk welke groepen je daarvoor nodig hebt: wat moet er tussen de groepen verschillen, en hoe sluit je uit dat de behandeling van de staart zelf het verschil maakt?",no:"Het gaat om de mannetjes én de vrouwtjes die bij ze nestelen.",
    onDone:()=>choiceStep(think,{q:"Waaraan zag de onderzoeker hoe succesvol een mannetje was?",opts:["hoe lang het mannetje bleef leven","hoeveel nesten er in zijn territorium kwamen","hoe hoog het mannetje kon vliegen"],right:1,
      ok:"Goed. Noem in je antwoord ook welke groep de meeste en welke de minste nesten kreeg, en welke vorm van selectie Darwin bedacht voor zo'n kenmerk.",no:"Een vrouwtje bouwt haar nest in het territorium van het mannetje dat ze kiest.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Groepen: staart <b>korter</b> geknipt / staart <b>verlengd</b> met het afgeknipte stuk / staart doorgeknipt en weer vastgeplakt (<b>controle</b>, even lang); uitkomst: <b>verlengde staart de meeste nesten, korte staart de minste</b>.",
    "<b>Seksuele selectie</b>: de lange staart blijft bestaan omdat hij helpt om te <b>paren</b> (ook al helpt hij niet bij overleven)."],
    model:"Bij de ene groep knipte de onderzoeker de staart korter. Het afgeknipte stuk plakte hij bij een tweede groep vast, die daardoor een extra lange staart kreeg. Bij een derde groep knipte hij de staart door en plakte hem weer vast, zodat die even lang bleef. De mannetjes met de verlengde staart kregen de meeste nesten, die met de korte staart de minste. Dit laat seksuele selectie zien: een lange staart blijft bestaan omdat hij helpt om te paren, ook al helpt hij niet bij het overleven.",
    valkuil:"De drie groepen zonder de uitkomst: 0 punten voor het eerste element. ‘Natuurlijke selectie’ is fout: de staart helpt niet bij overleven.",
    after:()=>waaromBtn(ans,textBox("Omdat het knippen en plakken zelf geen verschil maakte (de controlegroep), ligt het verschil in nesten aan de <b>lengte</b> van de staart. De vrouwtjes kiezen dus echt op staartlengte. Een kenmerk dat blijft bestaan omdat het helpt om te paren, ook als het de overleving wat kleiner maakt, ontstaat door <b>seksuele selectie</b>."))});
  q.append(think,ans);
},STOF);
opgave("Balts","Baltsen en kiezen","",[q1]);
}
