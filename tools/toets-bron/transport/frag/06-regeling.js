/* ===== Opgave 7: Het hart onder controle (KR02) en opgave 8: Het hart van een wielrenner (havo F01–F04, vwo F02, F03, F05) uit eigen/transport.json ===== */
{
const STOF_AUTO={titel:"Het hart bijsturen",html:`
<p>Het hart klopt uit zichzelf, maar zenuwen en hormonen kunnen het sneller of langzamer zetten. Dat gebeurt buiten je wil om, via het <b>autonome zenuwstelsel</b>. Dat heeft twee delen die elkaars tegenspelers zijn: het <b>orthosympathische</b> en het <b>parasympathische</b> zenuwstelsel. Het ene hoort bij actie en spanning, het andere bij rust en herstel.</p>
<p>Ook een hormoon kan het hart versnellen. Een hormoon gaat via het bloed naar zijn doelorganen.</p>
<p>De kleine slagaders kunnen nauwer en wijder worden. Zo stuurt het lichaam het bloed naar de plek waar het nodig is.</p>`,
films:[F.regel]};
const q1=vraag(2,"koppel: het hart onder controle",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Koppel elk begrip aan de juiste omschrijving. Gebruik elke omschrijving één keer; er blijft één omschrijving over."));
  chipsStep(think,{q:"Welke van deze begrippen zijn delen van het autonome zenuwstelsel? Kies alles wat klopt.",items:[["orthosympathisch zenuwstelsel",1],["parasympathisch zenuwstelsel",1],["adrenaline",0],["sinusknoop",0]],
    ok:"Goed. Adrenaline is een hormoon en de sinusknoop hoort bij het hart zelf. Bedenk per omschrijving: gaat het via een zenuw, via het bloed, of zit het in het hart of in de wand van een bloedvat?",no:"Een hormoon is geen deel van het zenuwstelsel.",onDone:unlock});
  koppelAnswer(ans,{id,uid:"q"+id,begrippen:["orthosympathisch zenuwstelsel","parasympathisch zenuwstelsel","adrenaline","sinusknoop","glad spierweefsel"],
    omschr:["maakt je hartslag na het sporten weer rustiger","komt bij schrik uit de bijnieren in het bloed en versnelt het hart","zet bij een sprint het hart sneller en vernauwt de kleine slagaders naar de darmen","geeft ook zonder zenuwen het startsein voor elke hartslag","ring in de wand van kleine slagaders die het vat nauwer kan maken","klep in de kleine slagaders die het bloed tegenhoudt"],key:[2,0,1,3,4],
    after:()=>waaromBtn(ans,textBox("1C, 2A, 3B, 4D, 5E. Omschrijving <b>F</b> blijft over: kleine slagaders hebben geen kleppen. Kleppen zitten in het hart, in aders en in lymfevaten. Het orthosympathische zenuwstelsel zet het lichaam in actie (sneller hart, minder bloed naar de darmen), het parasympathische brengt het terug tot rust. Adrenaline doet hetzelfde als het orthosympathische zenuwstelsel, maar via het bloed. Trekt het gladde spierweefsel in de wand samen, dan wordt het vat nauwer."))});
  q.append(think,ans);
},STOF_AUTO);
opgave("Regeling","Het hart onder controle","",[q1]);

const STOF_HMV2={titel:"Harder pompen",html:`
<p>Het <b>hartminuutvolume</b> is de hartfrequentie maal het slagvolume. In rust is dat ongeveer 5 liter per minuut.</p>
<p>Bij inspanning hebben je spieren veel meer bloed nodig. Je hartfrequentie kan oplopen tot rond 190 slagen per minuut. Ook het <b>slagvolume</b> kan groter worden: het hart trekt krachtiger samen, en werkende spieren duwen meer bloed terug naar het hart, zodat de kamers zich beter vullen.</p>
<p>Training verandert het hart: de linkerkamer wordt groter en de wand dikker. Een grafiek lees je af door bij een waarde op de x-as recht omhoog te gaan tot de lijn.</p>`,
films:[F.pomp,F.regel]};
const STOF_DRUK2={titel:"Bloeddruk bij inspanning",html:`
<p>Bij de systole spuit de kamer bloed de slagaders in en stijgt de druk: de <b>bovendruk</b>. Tijdens de diastole stroomt bloed uit de grote slagaders weg via de kleine slagaders en de haarvaten, en zakt de druk tot de <b>onderdruk</b>.</p>
<p>In de wand van de kleine slagaders zit glad spierweefsel. Daardoor kunnen ze nauwer en wijder worden, en zo bepalen hoeveel bloed er naar een orgaan stroomt.</p>`,
films:[F.druk,F.regel]};
const ids=[];
if(!VWO){
ids.push(vraag(1,"het slagvolume in rust",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Hoe groot is het slagvolume van de wielrenner in rust ongeveer?"));
  choiceStep(think,{q:"Welke twee gegevens over de wielrenner in rust heb je nodig?",opts:["hartminuutvolume 5 L/min en hartfrequentie 42 per minuut","hartfrequentie 42 en 70 per minuut","hartminuutvolume 5 L/min en het vermogen in afbeelding 1"],right:0,
    ok:"Ja. Gebruik nu de formule voor het hartminuutvolume, en let op de eenheden.",no:"Het gaat om de wielrenner zelf, in rust. Lees de inleiding nog eens.",onDone:unlock});
  mc(ans,{qid:id,pts:1,right:2,opts:["70 mL","84 mL","120 mL","210 mL"],onChecked:()=>waaromBtn(ans,textBox(
    "5000 mL : 42 ≈ 119 mL, dus ongeveer <b>120 mL</b>. Antwoord <b>C</b>.<br>A is het gewone getal uit de film voor een ongetraind hart. B rekent met 42 × 2. D deelt door 24 of verwisselt iets. Het getrainde hart pompt per slag veel meer weg: daardoor kan het in rust zo langzaam kloppen."))});
  q.append(think,ans);
},STOF_HMV2));
}

ids.push(vraag(2,"lagere hartfrequentie, toch genoeg bloed",(q,id)=>{
  const {think,ans,unlock}=start(q,"Bij 200 W is de hartfrequentie van de wielrenner veel lager dan die van zijn ongetrainde leeftijdsgenoot (afbeelding 1), terwijl hun spieren ongeveer even veel bloed nodig hebben.<br>"+B("Leg uit hoe de wielrenner met een lagere hartfrequentie toch genoeg bloed naar zijn spieren pompt."));
  think.append(el("div",{},FIETS({hl:200})));
  selectsStep(think,{uid:"q"+id,q:"Lees afbeelding 1 af bij 200 W. Wat is de hartfrequentie?",rows:[["wielrenner",["ongeveer 100","ongeveer 125","ongeveer 175"],1],["ongetrainde leeftijdsgenoot",["ongeveer 100","ongeveer 125","ongeveer 175"],2]],
    ok:"Goed. Hun spieren krijgen toch even veel bloed per minuut.",no:"Ga bij 200 W recht omhoog tot elke lijn.",
    onDone:()=>choiceStep(think,{q:"Welke twee grootheden bepalen samen hoeveel bloed het hart per minuut rondpompt?",opts:["hartfrequentie en bloeddruk","hartfrequentie en slagvolume","slagvolume en bloeddruk"],right:1,
      ok:"Ja. Bedenk nu welke van de twee bij de wielrenner anders moet zijn, en waardoor zijn hart dat kan: kijk in de inleiding.",no:"Denk aan het hartminuutvolume: wat vermenigvuldig je met wat?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Het hartminuutvolume is hartfrequentie × slagvolume; om evenveel bloed rond te pompen bij een lagere hartfrequentie moet het <b>slagvolume groter</b> zijn.",
    "De <b>grotere linkerkamer met dikkere wand</b> vult zich met meer bloed en pompt per slag meer weg."],
    model:"Het hartminuutvolume is de hartfrequentie maal het slagvolume. Omdat de spieren evenveel bloed per minuut nodig hebben, moet de wielrenner met zijn lagere hartfrequentie per slag meer bloed wegpompen: een groter slagvolume. Dat kan doordat zijn linkerkamer door training groter is en een dikkere wand heeft: hij vult zich met meer bloed en pompt per slag meer weg.",
    valkuil:"‘Zijn hart is sterker’ zonder slagvolume of hartminuutvolume: 0 punten voor het eerste element. ‘Zijn bloed vervoert meer zuurstof’ gaat niet over de vraag.",
    after:()=>waaromBtn(ans,textBox("Reken het na met de grafiek: de ongetrainde pompt bij 200 W met 175 slagen per minuut. Pompt hij per slag bijvoorbeeld 100 mL, dan is dat 17,5 liter per minuut. De wielrenner haalt dat met 125 slagen alleen als hij per slag 140 mL wegpompt. (De 100 mL is een voorbeeld, geen meetwaarde.) Dat grotere slagvolume komt van de grotere, dikkere linkerkamer."))});
  q.append(think,ans);
},STOF_HMV2));

ids.push(vraag(2,"bovendruk en onderdruk bij 300 W",(q,id)=>{
  const {think,ans,unlock}=start(q,"Tijdens de test wordt ook de bloeddruk van de wielrenner gemeten. Bij 300 W is zijn bovendruk veel hoger dan in rust, maar zijn onderdruk is bijna gelijk gebleven.<br>"+B("Leg uit waardoor de bovendruk stijgt, en waardoor de onderdruk niet stijgt."));
  choiceStep(think,{q:"Tijdens welke fase van de hartslag ontstaat de bovendruk?",opts:["tijdens de systole: de kamer spuit bloed de slagaders in","tijdens de diastole: de kamer ontspant"],right:0,
    ok:"Ja. Wat is er bij 300 W anders aan wat de kamer per slag de slagaders in spuit?",no:"‘Boven’ is de hoogste druk: als het hart zijn bloed wegpompt.",
    onDone:()=>choiceStep(think,{q:"Waar stroomt het bloed tijdens de diastole uit de grote slagaders naartoe?",opts:["via de kleine slagaders en de haarvaten naar de organen","terug de linkerkamer in","nergens: het blijft in de grote slagaders staan"],right:0,
      ok:"Goed. Hoe makkelijk dat bloed kan wegstromen, bepaalt hoe ver de druk in de diastole zakt. Bedenk wat er bij 300 W in de werkende beenspieren met de kleine slagaders gebeurt.",no:"De kleppen laten het bloed niet terug de kamer in. Lees de uitleg van de stof nog eens.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Bovendruk: bij elke systole wordt er (door het grotere slagvolume en het krachtiger samentrekken) <b>meer bloed de slagaders in gepompt</b>, en die rekken maar een beetje mee, dus de druk tijdens de systole stijgt. Alleen ‘het hart klopt sneller’ zonder slagvolume of meerekken van de slagaders: 0 punten voor dit element.",
    "Onderdruk: de <b>kleine slagaders in de werkende spieren zijn verwijd</b>, zodat het bloed tijdens de diastole makkelijk uit de grote slagaders wegstroomt en de druk dan niet hoger wordt."],
    model:"Bij 300 W trekt het hart krachtiger samen en pompt het per slag meer bloed de slagaders in. De slagaders rekken maar een beetje mee, dus de druk tijdens de systole, de bovendruk, stijgt. Tegelijk zijn de kleine slagaders in de werkende beenspieren wijd. Tijdens de diastole stroomt het bloed daardoor makkelijk weg uit de grote slagaders, zodat de onderdruk niet hoger wordt.",
    valkuil:"‘De onderdruk blijft gelijk omdat het hart in de diastole rust’ verklaart niet waarom hij bij 300 W niet stijgt: het verschil zit in de wijde kleine slagaders in de werkende spieren.",
    after:()=>waaromBtn(ans,textBox("Zie de slagaders als een ballon met een gat. Bij elke slag pomp je er een flinke stoot lucht in (groter slagvolume): de ballon zwelt meer op, de bovendruk stijgt. Maar het gat is groter geworden (wijde kleine slagaders in de spieren): tussen twee stoten loopt de ballon net zo ver leeg, dus de laagste druk, de onderdruk, blijft ongeveer gelijk."))});
  q.append(think,ans);
},STOF_DRUK2));

if(!VWO){
ids.push(vraag(2,"oudere mensen en training",(q,id)=>{
  const {think,ans,unlock}=start(q,"Bij oudere mensen is de hoogste hartfrequentie die ze kunnen halen lager dan bij jonge mensen.<br>"+B("Leg uit wat dit betekent voor hun maximale hartminuutvolume, en hoe training dat gedeeltelijk kan goedmaken."));
  choiceStep(think,{q:"Van welke twee dingen hangt het hartminuutvolume af?",opts:["hartfrequentie en slagvolume","hartfrequentie en bloeddruk","slagvolume en de dikte van de aorta"],right:0,
    ok:"Ja. Wat gebeurt er met het product als één van de twee kleiner wordt en de ander gelijk blijft?",no:"Kijk naar de formule in de uitleg van de stof.",
    onDone:()=>choiceStep(think,{q:"Wat verandert er door training aan het hart van de wielrenner (zie de inleiding)?",opts:["de linkerkamer wordt groter en de wand dikker","de sinusknoop vuurt sneller","er komen extra kleppen bij"],right:0,
      ok:"Goed. Wat doet zo'n kamer met het slagvolume? Gebruik dat voor het tweede deel van je antwoord.",no:"Lees de eerste zin van de inleiding nog eens.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Met een lagere maximale hartfrequentie is (bij hetzelfde slagvolume) het <b>maximale hartminuutvolume lager</b>, zodat er minder bloed (zuurstof) naar de spieren kan.",
    "Door training wordt de linkerkamer groter en sterker, zodat het <b>slagvolume</b> (en daarmee het hartminuutvolume) toch groter wordt."],
    model:"Het hartminuutvolume is hartfrequentie × slagvolume. Is de hoogste hartfrequentie lager, dan is bij hetzelfde slagvolume ook het hoogste hartminuutvolume lager: er kan minder bloed, en dus minder zuurstof, naar de spieren. Door training wordt de linkerkamer groter en sterker, zodat er per slag meer bloed uit gaat. Dat grotere slagvolume maakt het hartminuutvolume weer groter.",
    valkuil:"‘Door training gaat de hartfrequentie weer omhoog’ is onjuist: de hoogste hartfrequentie verandert door training nauwelijks (zie afbeelding 1: ze eindigen ongeveer even hoog). Training werkt via het slagvolume.",
    after:()=>waaromBtn(ans,textBox("In afbeelding 1 eindigen de wielrenner en zijn leeftijdsgenoot met ongeveer dezelfde hoogste hartfrequentie (186 en 195), maar de wielrenner levert veel meer vermogen. Het verschil zit dus in het slagvolume. Zo werkt training ook bij ouderen: de maximale hartfrequentie kan het niet goedmaken, een groter slagvolume gedeeltelijk wel."))});
  q.append(think,ans);
},STOF_HMV2));
}else{
const STOF_VAGUS={titel:"Zenuwen en adrenaline",html:`
<p>De sinusknoop geeft uit zichzelf prikkels af. Het <b>autonome zenuwstelsel</b> zet hem sneller of langzamer: het orthosympathische zenuwstelsel versnelt, het parasympathische remt. Voor vwo: de parasympathische zenuw naar het hart heet de <b>nervus vagus</b>.</p>
<p>Ook <b>adrenaline</b> versnelt het hart. Een signaal via een zenuw is binnen een fractie van een seconde bij het hart; een hormoon moet eerst gemaakt en via het bloed naar het hart vervoerd worden.</p>`,
films:[F.regel]};
ids.push(vraag(2,"de rem op de sinusknoop",(q,id)=>{
  const {think,ans,unlock}=start(q,"Zonder zenuwen zou de sinusknoop van de wielrenner ongeveer 100 keer per minuut prikkels afgeven. Toch is zijn hartfrequentie in rust 42.<br>"+B("Leg uit hoe die lage rusthartslag tot stand komt, en waarom zijn hart bij de start van een sprint binnen enkele seconden versnelt, terwijl een getransplanteerd hart daar minuten over doet."));
  choiceStep(think,{q:"De sinusknoop zou uit zichzelf 100 keer per minuut vuren, maar het hart klopt 42 keer. Wat moet er dan in rust gebeuren?",opts:["de sinusknoop wordt geremd","de sinusknoop wordt versneld","de kamers slaan een slag over"],right:0,
    ok:"Ja. Door welk deel van het autonome zenuwstelsel?",no:"42 is minder dan 100. Wat doet het lichaam dan met de sinusknoop?",
    onDone:()=>choiceStep(think,{q:"Wat gebeurt er bij een harttransplantatie met de zenuwen naar het hart?",opts:["ze worden doorgeknipt","ze worden mee getransplanteerd en blijven werken"],right:0,
      ok:"Goed. Wat blijft er dan nog over om het getransplanteerde hart te versnellen, en waarom gaat dat trager?",no:"Het hart komt uit een ander lichaam. Kan het meteen aan de zenuwen van de ontvanger vastzitten?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "In rust <b>remt</b> de <b>nervus vagus</b> (het parasympathische zenuwstelsel) de sinusknoop sterk.",
    "Bij de start valt die rem weg en zet het <b>orthosympathische zenuwstelsel</b> het hart meteen sneller (via zenuwen, snel); een getransplanteerd hart heeft geen zenuwen en versnelt pas als <b>adrenaline via het bloed</b> het hart bereikt."],
    model:"In rust remt de nervus vagus, het parasympathische zenuwstelsel, de sinusknoop sterk: van ongeveer 100 naar 42 slagen per minuut. Bij de start van een sprint valt die rem weg en zet het orthosympathische zenuwstelsel het hart via zenuwen meteen sneller. Bij een getransplanteerd hart zijn de zenuwen doorgeknipt. Dat hart versnelt pas als adrenaline via het bloed bij het hart komt, en dat duurt minuten.",
    valkuil:"‘Het getransplanteerde hart is zwakker’ of ‘het moet wennen’ is geen uitleg: het gaat om zenuwen (snel) tegenover adrenaline via het bloed (langzaam).",
    after:()=>waaromBtn(ans,textBox("De sinusknoop is als een motor die stationair op 100 draait, met de nervus vagus als rem. Bij de wielrenner staat die rem in rust stevig aan. Bij een sprint gaat de rem los en geeft het orthosympathische zenuwstelsel gas: binnen seconden. Een getransplanteerd hart heeft geen rem en geen gaspedaal van zenuwen; het klopt in rust juist sneller, en versnelt pas als er adrenaline in het bloed komt."))});
  q.append(think,ans);
},STOF_VAGUS));
}

opgave("Wielrenner","Het hart van een wielrenner",`
<p>Na jaren training is het hart van een wielrenner veranderd: de linkerkamer is groter en de wand ervan is dikker. Een getrainde wielrenner heeft in rust een hartfrequentie van 42 slagen per minuut, een ongetrainde leeftijdsgenoot 70. In rust hebben beiden een hartminuutvolume van ongeveer 5 liter per minuut.</p>
<p>Beiden fietsen op een hometrainer. Het vermogen wordt stap voor stap opgevoerd tot ze niet meer kunnen. In afbeelding 1 staat hun hartfrequentie.</p>
<div class="eyebrow">afbeelding 1 (fictieve gegevens)</div>${FIETS()}`,ids);
}
