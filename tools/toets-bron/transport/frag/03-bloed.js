/* ===== Opgave 3: Het bloed (havo KB02, vwo KB06; KB07 uit eigen/transport.json) ===== */
{
const STOF_BLOED={titel:"Wat er in je bloed zit",html:`
<p>Laat je bloed in een centrifuge draaien, dan zie je lagen: bovenin geel <b>bloedplasma</b>, daaronder een dun wit laagje met <b>witte bloedcellen</b> en <b>bloedplaatjes</b>, en onderin de zware <b>rode bloedcellen</b>.</p>
<p>Alle bloedcellen worden gemaakt in het <b>rode beenmerg</b>, uit <b>stamcellen</b>. Een rode bloedcel is een plat schijfje vol <b>hemoglobine</b>. Na ongeveer 120 dagen is hij versleten en wordt hij afgebroken; de rest van de hemoglobine wordt galkleurstof.</p>
<p>Om nieuwe eiwitten te maken, heeft een cel de informatie uit het DNA nodig.</p>`,
films:[F.bloed]};
const ids=[];
if(!VWO){
ids.push(vraag(2,"waarom een rode bloedcel slijt",(q,id)=>{
  const {think,ans,unlock}=start(q,"Een rode bloedcel leeft ongeveer 120 dagen en kan zichzelf niet herstellen.<br>"+B("Leg uit waardoor een rode bloedcel slijt. Gebruik de bouw van de rode bloedcel."));
  choiceStep(think,{q:"Wat heeft een cel nodig om nieuwe eiwitten te maken, bijvoorbeeld om een beschadigd onderdeel te vervangen?",opts:["alleen genoeg zuurstof","de informatie uit het DNA in de kern","alleen hemoglobine"],right:1,
    ok:"Ja. Bedenk nu wat er in een rijpe rode bloedcel wel en niet zit.",no:"Eiwitten worden gemaakt volgens een recept. Waar ligt dat recept in de cel?",onDone:unlock});
  openAnswer(ans,{id,pts:2,checks:[
    "Een rode bloedcel heeft (tijdens het rijpen zijn kern uitgestoten en heeft) <b>geen kern</b>. Ook goed: ‘de kern is eruit gestoten om meer ruimte te maken voor hemoglobine’.",
    "Daardoor kan hij <b>geen nieuwe eiwitten</b> maken (en niet delen), dus beschadigde onderdelen worden niet vervangen."],
    model:"Een rode bloedcel stoot tijdens het rijpen zijn kern uit, zodat er meer hemoglobine in past. Zonder kern heeft hij geen DNA meer en kan hij geen nieuwe eiwitten maken. Beschadigde onderdelen worden dus niet vervangen: na ongeveer 120 dagen is hij versleten.",
    valkuil:"‘Hij wordt moe van het vele rondstromen’ zonder de kern is 0 punten: het gaat erom dat hij niets kan vervangen.",
    after:()=>waaromBtn(ans,textBox("Een gewone cel vervangt steeds kapotte eiwitten met nieuwe, gemaakt volgens het DNA in de kern. Een rode bloedcel ruilt die mogelijkheid in voor ruimte: zonder kern past er meer hemoglobine in, dus vervoert hij meer zuurstof. De prijs: hij slijt en moet na ongeveer 120 dagen vervangen worden door een nieuwe uit het beenmerg."))});
  q.append(think,ans);
},STOF_BLOED));
}else{
const STOF_STOL={titel:"Een lek dichten",html:`
<p>Bij een wond plakken <b>bloedplaatjes</b> aan elkaar en aan de wondrand. Daarna komt een reeks reacties van eiwitten op gang: de <b>stolling</b>. Aan het eind zet <b>trombine</b> het opgeloste <b>fibrinogeen</b> om in <b>fibrine</b>: lange draden die een net over de wond weven. Rode bloedcellen raken erin verstrikt: een stolsel.</p>
<p>Voor vwo: de stolling is een <b>cascade</b>: de ene stollingsfactor activeert de volgende. Er zijn veel stollingsfactoren, elk een eiwit uit het bloedplasma; voor een aantal stappen zijn ook <b>calciumionen</b> nodig. Laat je bloed in een buisje stollen, dan blijft er een gele vloeistof over: <b>serum</b>.</p>`,
films:[F.bloed]};
ids.push(vraag(2,"juist of onjuist: de stolling",(q,id)=>{
  q.append(el("div",{class:"qtext"},UITSPRAKEN(5,["De meeste stollingsfactoren worden door de lever gemaakt.","Voor het maken van protrombine heeft de lever vitamine K nodig.","Zonder vrije calciumionen ontstaat er wel trombine, maar geen fibrine.","Serum is bloedplasma zonder fibrinogeen.","Bij elke stap van de stollingscascade wordt het signaal sterker."])));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  seqStep(think,{q:"Zet de stappen van de stolling in de goede volgorde. Klik ze aan van eerste naar laatste.",items:["bij een wond worden stollingsfactoren actief","protrombine wordt trombine","trombine zet fibrinogeen om in fibrine","fibrinedraden vangen bloedcellen: een stolsel"],shown:[2,0,3,1],
    ok:"Goed. Bedenk bij uitspraak 3: als er vroeg in deze reeks iets ontbreekt, wat gebeurt er dan met alles wat erna komt?",onDone:unlock});
  juistOnjuist(ans,{id,stm:["de meeste stollingsfactoren uit de lever","vitamine K nodig voor protrombine","zonder calciumionen wel trombine, geen fibrine","serum = plasma zonder fibrinogeen","het signaal wordt bij elke stap sterker"],key:[true,true,false,true,true],
    uitleg:textBox("1 <b>juist</b> en 2 <b>juist</b>: de lever maakt de meeste stollingsfactoren, en voor een paar daarvan, zoals protrombine, heeft hij vitamine K nodig.<br>3 <b>onjuist</b>: calciumionen zijn al nodig vóór de trombine ontstaat. Zonder vrije calciumionen ontstaat er al <b>geen trombine</b>, en dus ook geen fibrine. Zo werkt citraat in een zakje donorbloed: het bindt de calciumionen.<br>4 <b>juist</b>: bij het stollen is het fibrinogeen omgezet in fibrine en in het stolsel blijven zitten.<br>5 <b>juist</b>: één actieve factor activeert er veel van de volgende.")});
  q.append(think,ans);
},STOF_STOL));
}

ids.push(vraag(2,"koppel: delen van het bloed",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Koppel elk begrip aan de juiste omschrijving. Er blijft één omschrijving over."));
  chipsStep(think,{q:"Welke lagen zie je in een buisje bloed na de centrifuge? Kies alles wat klopt.",items:[["geel bloedplasma",1],["een dun wit laagje met witte bloedcellen en bloedplaatjes",1],["rode bloedcellen",1],["een laagje beenmerg",0]],
    ok:"Goed. Twee begrippen in de vraag zijn geen deel van het bloed: een stamcel zit in het beenmerg, en de milt is een orgaan. Koppel ze aan de omschrijving die past.",no:"Beenmerg zit in je botten, niet in het bloed.",onDone:unlock});
  koppelAnswer(ans,{id,uid:"q"+id,begrippen:["bloedplasma","bloedplaatje","rode bloedcel","stamcel","milt"],
    omschr:["vooral water met opgeloste stoffen, zoals glucose, zouten en ureum","stukje van een grote cel dat helpt een lek te dichten","vervoert zuurstof, gebonden aan hemoglobine","deelt zich; één van de dochtercellen blijft hetzelfde","hier worden versleten rode bloedcellen afgebroken","bestrijdt ziekteverwekkers"],key:[0,1,2,3,4],
    after:()=>waaromBtn(ans,textBox("1A, 2B, 3C, 4D, 5E. Omschrijving <b>F</b> blijft over: ziekteverwekkers bestrijden doen de <b>witte bloedcellen</b>, en die staan niet in het rijtje. Let op 2: een bloedplaatje is geen echte cel, maar een stukje van een grote cel uit het beenmerg. En 4: een stamcel deelt zich zo dat één dochtercel stamcel blijft; de andere gaat verder en wordt uiteindelijk een bloedcel."))});
  q.append(think,ans);
},STOF_BLOED));

opgave("Bloed","Het bloed","",ids);
}
