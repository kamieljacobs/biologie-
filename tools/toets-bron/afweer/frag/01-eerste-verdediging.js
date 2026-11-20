/* ===== Opgave 1: De eerste verdediging (eigen vragen NA21, NA22 uit toetsen-biologie) ===== */
{
const STOF_FAG={titel:"Fagocyten",html:`
<p>Je eerste verdediging bestaat uit <b>barrières</b> (huid, slijm en trilharen, lysozym, maagzuur, je eigen bacteriën) en uit <b>fagocyten</b>: witte bloedcellen die ziekteverwekkers opeten.</p>
<p><b>Macrofagen</b> zijn grote fagocyten die in je weefsels leven. Bij een ontsteking kruipen er extra fagocyten uit het bloed het weefsel in, vooral <b>neutrofielen</b>.</p>
<p>Bij het opeten (<b>fagocytose</b>) spelen een paar onderdelen van de fagocyt een rol: het celmembraan met uitstulpingen (<b>schijnvoetjes</b>), een <b>blaasje</b> en <b>lysosomen</b>: blaasjes met verteringsenzymen.</p>
<p>Naast deze <b>aspecifieke afweer</b> heb je een <b>specifieke afweer</b> met lymfocyten (B-cellen en T-cellen). Die zie je in film 2 en 3.</p>`,
films:[F.ev]};

const q1=vraag(2,"hoe een fagocyt vreemd herkent",(q,id)=>{
  pre(q,"<p>Een fagocyt kan een bacterie opeten die je lichaam nog nooit heeft gezien.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit hoe de fagocyt die bacterie als vreemd herkent, en noem één nadeel van deze manier van afweer."));
  choiceStep(think,{q:"Wat zit er op het oppervlak van elke cel, ook van jouw eigen cellen?",opts:["vormpjes (meestal stukjes eiwit)","antistoffen","lysosomen"],right:0,
    ok:"Ja. Jouw cellen hebben jouw vormpjes. Moet een fagocyt de precieze bacteriesoort kennen om te zien dat iets niet van jou is?",no:"Denk aan sleutel en slot: waaraan zie je afweer of iets eigen of vreemd is?",
    onDone:()=>choiceStep(think,{q:"Hoort de fagocyt bij de aspecifieke of bij de specifieke afweer?",opts:["aspecifiek","specifiek"],right:0,
      ok:"Goed. Wat betekent ‘aspecifiek’ voor wat een fagocyt wél en níet kan? Daar zit je nadeel.",no:"De specifieke afweer werkt met lymfocyten (B-cellen en T-cellen). Is een fagocyt een lymfocyt?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "De fagocyt herkent <b>vormpjes die veel bacteriën gemeen hebben</b>, maar die jouw eigen cellen niet hebben.",
    "Nadeel, één van: hij herkent <b>niet precies welke bacterie</b> het is / het is <b>niet op maat</b> / hij <b>onthoudt niets</b> (de volgende keer niet sneller)."],
    model:"Op elke cel zitten vormpjes. Een fagocyt herkent vormpjes die bij veel bacteriën voorkomen, maar niet op jouw eigen cellen. Zo weet hij dat de bacterie vreemd is, ook als hij die soort nog nooit zag. Een nadeel is dat hij niet herkent welke bacterie het precies is, en dat hij niets onthoudt: de volgende keer gaat het niet sneller.",
    valkuil:"‘De fagocyt heeft geleerd hoe de bacterie eruitziet’ is fout: hij kent geen soorten. ‘Hij is traag’ is geen goed nadeel: fagocyten zijn er juist meteen."});
  q.append(think,ans);
},STOF_FAG);

const q2=vraag(2,"volgorde van de fagocytose",(q,id)=>{
  q.append(el("p",{class:"qtext"},B("Een macrofaag ruimt een bacterie op. Zet de stappen in de juiste volgorde.")+
    "<br><br>A Enzymen breken de bacterie af.<br>B Een bacterie komt via een wondje in het weefsel terecht, waar de macrofaag hem tegenkomt.<br>C Lysosomen versmelten met het blaasje.<br>D De macrofaag omsluit de bacterie met schijnvoetjes.<br>E De bacterie zit in een blaasje in de macrofaag."));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  choiceStep(think,{q:"Wat is een lysosoom?",opts:["een blaasje met verteringsenzymen","een uitstulping van het celmembraan","een bacterie die is opgegeten"],right:0,
    ok:"Ja. Een lysosoom kan iets alleen afbreken als het ermee versmelt. Moet de bacterie dan al binnen zijn?",no:"Een lysosoom is een onderdeel van de fagocyt zelf. Wat zit erin?",
    onDone:()=>choiceStep(think,{q:"Een bacterie is helemaal omsloten door schijnvoetjes. Waar zit hij daarna?",opts:["in een blaasje in de macrofaag","los in het cytoplasma","buiten de macrofaag"],right:0,
      ok:"Goed. Zet nu alle stappen op een rij, van binnenkomen tot afbreken.",no:"De schijnvoetjes sluiten zich om de bacterie, met een stukje membraan eromheen.",onDone:unlock})});
  volgordeAnswer(ans,{id,letters:"ABCDE",key:"BDECA",after:()=>waaromBtn(ans,b=>stepAnim(b,[
    {cap:"<b>B</b> De bacterie komt via een wondje in het weefsel. Daar leven macrofagen."},
    {cap:"<b>D</b> De macrofaag omsluit de bacterie met schijnvoetjes."},
    {cap:"<b>E</b> De bacterie zit nu in een blaasje in de macrofaag."},
    {cap:"<b>C</b> Lysosomen versmelten met het blaasje."},
    {cap:"<b>A</b> De enzymen uit de lysosomen breken de bacterie af. Dat hele proces heet fagocytose."}],
    (st,s,i)=>st.innerHTML=FAGO(i)))});
  q.append(think,ans);
},STOF_FAG);

opgave("Eerste verdediging","De eerste verdediging",GEEN_INLEIDING,[q1,q2]);
}

/* ===== Opgave 2: Koorts bij een hagedis (eigen vragen C01, C02, havo C03 / vwo C04) ===== */
{
const STOF_KOORTS={titel:"Koorts en de thermostaat",html:`
<p>In je <b>hypothalamus</b> zit een soort <b>thermostaat</b>: hij vergelijkt je lichaamstemperatuur met een ingestelde waarde. Is je lichaam kouder dan die instelling, dan zet hij processen aan die warmte vasthouden en warmte maken. Is je lichaam warmer, dan processen die warmte kwijtraken.</p>
<p>Bij <b>koorts</b> blijft de thermostaat werken, maar zijn <b>instelling gaat omhoog</b>. Daarvoor zorgen stoffen die witte bloedcellen afgeven. Is de infectie voorbij, dan gaat de instelling weer omlaag.</p>
<p>Een mens maakt zelf veel warmte. Een <b>hagedis</b> maakt zelf nauwelijks warmte: zijn lichaamstemperatuur hangt af van de omgeving.</p>`,
films:[F.ev]};

const q1=vraag(2,"temperatuur omhoog: mens en leguaan",(q,id)=>{
  pre(q,"<p>Bij een mens stijgt de lichaamstemperatuur aan het begin van koorts doordat het lichaam warmte vasthoudt en warmte maakt.</p>");
  const {think,ans,unlock}=start(q,B("Beschrijf hoe dat bij een mens gebeurt, en hoe de zieke leguaan zijn temperatuur verhoogt."));
  choiceStep(think,{q:"Je hebt het warm en je wordt rood. Waar stroomt dan extra bloed, zodat je warmte kwijtraakt?",opts:["door de bloedvaatjes in je huid","door je spieren","door je lever"],right:0,
    ok:"Ja. Wat moeten die bloedvaatjes dan juist doen om warmte <i>vast te houden</i>? En wat kunnen je spieren doen om warmte te maken?",no:"Waar komt je bloed het dichtst bij de buitenlucht?",
    onDone:()=>choiceStep(think,{q:"Een leguaan maakt zelf nauwelijks warmte. Hoe wordt hij toch warmer?",opts:["door zijn gedrag","door te rillen","door zijn hart sneller te laten kloppen"],right:0,
      ok:"Goed. Beschrijf nu de mens én de leguaan.",no:"Lees de inleiding: wat deden de zieke leguanen in het terrarium?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Mens: de <b>bloedvaatjes in de huid worden nauwer</b> (minder warmteverlies) en de <b>spieren gaan rillen</b> (warmte maken).",
    "Leguaan: hij gaat op een <b>warmere plek</b> zitten (aan de warme kant / in de zon), dus door zijn <b>gedrag</b>."],
    model:"Bij een mens worden de bloedvaatjes in de huid nauwer, zodat hij minder warmte kwijtraakt, en gaan de spieren rillen, wat warmte maakt. De zieke leguaan gaat aan de warme kant van het terrarium zitten: hij verhoogt zijn temperatuur door zijn gedrag.",
    valkuil:"Alleen ‘de mens krijgt het warm’ of ‘de thermostaat gaat omhoog’ beschrijft niet hóé de temperatuur stijgt. Voor het eerste punt moeten de huidvaatjes én het rillen erin staan."});
  q.append(think,ans);
},STOF_KOORTS);

const q2=vraag(2,"tabel 1: gunstig om warm te zitten",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Leg met tabel 1 uit dat het voor een besmette leguaan gunstig is om de warme kant op te zoeken. Gebruik in je uitleg wat je weet over het effect van een hogere temperatuur."));
  numStep(think,{uid:"q"+id+"n1",q:"Hoeveel van de 12 leguanen leven na 7 dagen nog bij 38 °C, de normale temperatuur?",right:6,
    ok:"Ja, de helft. En bij 42 °C?",no:"Lees de onderste rij van tabel 1 af onder 38.",
    onDone:()=>numStep(think,{uid:"q"+id+"n2",q:"Hoeveel leven er nog bij 42 °C?",right:11,
      ok:"Goed. Dat is het eerste deel van je uitleg.",no:"Kijk in de laatste kolom van tabel 1.",
      onDone:()=>chipsStep(think,{q:"Op welke dingen kan een hogere lichaamstemperatuur invloed hebben? Kies alles wat klopt.",items:[["de groei van de bacteriën",1],["het werk van de afweercellen",1],["de hoeveelheid zonlicht",0]],
        ok:"Goed. Bedenk nu in welke richting die twee veranderen bij een hogere temperatuur.",no:"Eén keuze gaat niet over het lichaam van de leguaan.",onDone:unlock})})});
  openAnswer(ans,{id,pts:2,checks:[
    "Uit tabel 1: <b>hoe hoger de temperatuur, hoe meer leguanen overleven</b> (bij 42 °C 11 van de 12, bij 38 °C 6 van de 12).",
    "Bij een hogere temperatuur <b>groeien de bacteriën trager</b> en/of <b>werkt de afweer beter</b>."],
    model:"In tabel 1 overleven bij een hogere temperatuur meer leguanen: bij 38 °C 6 van de 12, bij 42 °C 11 van de 12. Bij een hogere temperatuur groeien de bacteriën trager en werkt de afweer beter. Aan de warme kant krijgt de leguaan koorts en heeft hij dus meer kans om te overleven.",
    valkuil:"Alleen de getallen uit de tabel noemen, zonder wat de hogere temperatuur doet met de bacteriën of de afweer: 1 punt.",
    after:()=>waaromBtn(ans,textBox("Lees tabel 1 van links naar rechts: van 34 °C naar 42 °C stijgt het aantal levende leguanen van 1 naar 11. Een besmette leguaan die de warme kant opzoekt, krijgt zo een temperatuur van ongeveer 41 °C: <b>koorts</b>. Bij die temperatuur groeien veel bacteriën trager en werkt de afweer beter. Koorts is dus geen fout van het lichaam, maar een deel van de afweer."))});
  q.append(think,ans);
},STOF_KOORTS);

const ids=[q1,q2];
if(!VWO){
ids.push(vraag(2,"een koortsremmer bij leguanen",(q,id)=>{
  pre(q,"<p>In een tweede proef kregen besmette leguanen een koortsremmer: een stof die voorkomt dat de witte bloedcellen de thermostaat in de hersenen hoger zetten. Deze leguanen bleven aan de koele kant zitten, ook al was de warme kant vrij. Er stierven er meer dan bij besmette leguanen zonder koortsremmer.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit hoe de koortsremmer ervoor zorgt dat er meer leguanen sterven."));
  choiceStep(think,{q:"Een besmette leguaan zonder koortsremmer zoekt de warmte op. Waardoor?",opts:["zijn thermostaat staat hoger, dus hij ‘vindt’ zichzelf te koud","hij heeft het door de bacteriën koud gekregen","de warme kant is groter"],right:0,
    ok:"Ja. En als de koortsremmer dat hoger zetten tegenhoudt?",no:"Lees de inleiding van de vraag: wat zetten de witte bloedcellen hoger?",
    onDone:()=>choiceStep(think,{q:"Welke lichaamstemperatuur houdt een leguaan met koortsremmer ongeveer?",opts:["ongeveer 38 °C","ongeveer 41 °C"],right:0,
      ok:"Goed. Wat zegt tabel 1 over 38 °C, en waarom zou dat zo zijn?",no:"Hij blijft aan de koele kant zitten, zoals een gezonde leguaan.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "De <b>thermostaat blijft op de normale stand</b>, dus de leguaan ‘vindt’ zichzelf niet te koud en <b>zoekt de warmte niet op</b>.",
    "Zijn temperatuur blijft rond <b>38 °C</b>, waardoor de <b>bacteriën sneller groeien</b> / de <b>afweer minder goed werkt</b> dan bij koorts, dus overleven er minder."],
    model:"Door de koortsremmer zetten de witte bloedcellen de thermostaat niet hoger. De leguaan vindt zichzelf dan niet te koud en blijft aan de koele kant. Zijn temperatuur blijft rond 38 °C. Daarbij groeien de bacteriën sneller en werkt de afweer minder goed dan bij koorts, dus sterven er meer leguanen.",
    valkuil:"‘De koortsremmer is giftig’ of ‘de koortsremmer remt de afweercellen’: 0 punten.",
    after:()=>waaromBtn(ans,textBox("Volg de keten: koortsremmer → thermostaat blijft normaal → de leguaan vindt zichzelf niet te koud → hij blijft aan de koele kant → lichaamstemperatuur rond 38 °C → bacteriën groeien sneller en de afweer werkt minder goed (tabel 1: bij 38 °C leeft maar de helft) → meer leguanen sterven. Het is dus niet de koortsremmer zelf die ze doodt, maar het <b>ontbreken van de koorts</b>."))});
  q.append(think,ans);
},STOF_KOORTS));
}else{
ids.push(vraag(2,"koorts remmen bij een mens: voor en tegen",(q,id)=>{
  pre(q,"<p>Bij koorts in mensen wordt vaak een koortsremmer gegeven, bijvoorbeeld paracetamol.</p>");
  const {think,ans,unlock}=start(q,B("Geef één argument voor en één argument tegen het remmen van koorts bij een mens. Gebruik bij het argument tegen de resultaten van dit onderzoek."));
  choiceStep(think,{q:"Is koorts de ziekte zelf, of een deel van de afweer?",opts:["de ziekte zelf","een deel van de afweer"],right:1,
    ok:"Ja. Wat lieten de leguanen in tabel 1 dan zien? Daar zit je argument tegen.",no:"Wie zet de thermostaat hoger: de ziekteverwekker of je eigen witte bloedcellen?",
    onDone:()=>choiceStep(think,{q:"Koorts heeft ook nadelen. Waaraan kost koorts je lichaam veel?",opts:["aan energie en vocht","aan zuurstof in de longen","aan rode bloedcellen"],right:0,
      ok:"Goed. Zo'n nadeel is een argument vóór remmen. Schrijf nu beide argumenten op.",no:"Denk aan hoe je je voelt met hoge koorts: moe, slap, veel zweten.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Argument voor, één van: koorts kost veel <b>energie en vocht</b> / je voelt je <b>slap</b> / boven ongeveer <b>41 °C</b> kunnen eigen eiwitten beschadigen.",
    "Argument tegen: koorts is een <b>deel van de afweer</b>; bij de leguanen <b>overleefden bij een hogere temperatuur meer dieren</b> (tabel 1; ziekteverwekkers groeien trager / afweer werkt beter)."],
    model:"Voor: koorts kost veel energie en vocht en je voelt je slap; boven ongeveer 41 °C kunnen eigen eiwitten beschadigen. Tegen: koorts is een deel van de afweer. Bij de leguanen overleefden bij een hogere temperatuur meer dieren, omdat ziekteverwekkers dan trager groeien en de afweer beter werkt. Remmen kan het herstel dus vertragen.",
    valkuil:"Een argument tegen zonder de resultaten van het onderzoek (tabel 1): geen punt voor het tweede element.",
    after:()=>waaromBtn(ans,textBox("Koorts heeft een prijs (energie, vocht, je voelt je slap, en boven 41 °C schade aan eigen eiwitten) en een opbrengst (trager groeiende ziekteverwekkers, een afweer die beter werkt). In tabel 1 zie je de opbrengst: van 6 van de 12 levende leguanen bij 38 °C naar 11 van de 12 bij 42 °C. Of je koorts remt, is dus een afweging, geen vaste regel."))});
  q.append(think,ans);
},STOF_KOORTS));
}

opgave("Koorts bij een hagedis","Koorts bij een hagedis",`
<p>De woestijnleguaan is een hagedis uit het zuidwesten van de Verenigde Staten. Een hagedis maakt zelf nauwelijks warmte: zijn lichaamstemperatuur hangt af van de omgeving. Een gezonde woestijnleguaan zoekt steeds een plek in de zon of in de schaduw op, zodat zijn lichaamstemperatuur rond 38 °C blijft.</p>
<p>Onderzoekers besmetten leguanen met een ziekteverwekkende bacterie en zetten ze in een terrarium met een warme en een koele kant. Zieke leguanen gingen vaker aan de warme kant zitten; hun lichaamstemperatuur steeg tot ongeveer 41 °C.</p>
<p>Daarna hielden de onderzoekers groepen besmette leguanen elk bij een vaste temperatuur (tabel 1).</p>
${TABEL("1 (fictieve gegevens)",["temperatuur van het terrarium (°C)","34","36","38","40","42"],[["aantal leguanen (van de 12) dat na 7 dagen nog leeft","1","3","6","10","11"]])}`,ids);
}
