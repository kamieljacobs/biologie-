/* ===== Opgave 1: Ademhaling (kennisvragen KA01 en KA03 uit toetsen-biologie, eigen/gaswisseling.json) ===== */
{
const STOF_WEG={titel:"De luchtwegen",html:`
<p>De luchtwegen zijn een stelsel van buizen dat zich steeds verder vertakt, als een boom op zijn kop: van één brede buis naar steeds meer en steeds dunnere buisjes. Aan het eind zitten trosjes <b>longblaasjes</b>, waar de gaswisseling plaatsvindt.</p>
<p>Onderweg wordt de lucht verwarmd, vochtig gemaakt en schoongemaakt. In de <b>keelholte</b> kruisen lucht en voedsel elkaar; het <b>strotklepje</b> zorgt dat er bij het slikken geen eten in de luchtpijp komt. De <b>stembanden</b> zitten in het strottenhoofd.</p>`,
films:[F.adem]};
const STOF_TRIL={titel:"De luchtwegen schoonhouden",html:`
<p>Ingeademde lucht bevat stof, roet en bacteriën. Die mogen de longblaasjes niet bereiken. De neusholte, de luchtpijp en de bronchiën zijn daarom van binnen bekleed met <b>trilhaarepitheel</b>: een laag cellen met trilhaartjes, met daartussen cellen die <b>slijm</b> maken.</p>
<p>Trilhaartjes bewegen steeds in één richting heen en weer, als roeiriemen. Als die beweging stopt, verandert er dus iets aan de afvoer van wat er in de luchtwegen terechtkomt.</p>`,
films:[F.adem]};
const DELEN=["bronchiën","bronchiolen","keelholte","luchtpijp","neusholte","strottenhoofd"];

const q1=vraag(1,"de weg van de lucht",(q,id)=>{
  const {think,ans,unlock}=start(q,"Een stofje wordt ingeademd via de neus en komt in een longblaasje terecht. "+B("Zet de delen in de volgorde waarin het stofje ze passeert: bronchiën, bronchiolen, keelholte, luchtpijp, neusholte, strottenhoofd."));
  choiceStep(think,{q:"Waar kruisen lucht en voedsel elkaar?",opts:["in de keelholte","in het strottenhoofd","in de luchtpijp"],right:0,
    ok:"Ja. Lucht en voedsel delen dus een stuk van de weg, en gaan daarna elk hun eigen kant op.",no:"Het is de ruimte achter je neus en mond, waar je ook je eten doorheen slikt.",
    onDone:()=>choiceStep(think,{q:"De luchtpijp vertakt zich in steeds dunnere buisjes. Welke zijn het dunst?",opts:["de bronchiën","de bronchiolen"],right:1,
      ok:"Goed. Zet nu alle zes de delen op volgorde.",no:"Het verkleinwoord zit in de naam: ‑olen.",onDone:unlock})});
  selectAnswer(ans,{id,uid:"q"+id,intro:"Kies bij elke plek welk deel het stofje passeert.",
    rows:[["1e",DELEN,4],["2e",DELEN,2],["3e",DELEN,5],["4e",DELEN,3],["5e",DELEN,0],["6e",DELEN,1]],score:n=>n===6?1:0,
    after:()=>waaromBtn(ans,textBox("Neusholte → keelholte → strottenhoofd → luchtpijp → bronchiën → bronchiolen, en dan het longblaasje. In het <b>strottenhoofd</b> (met de stembanden) begint de eigen weg van de lucht; de luchtpijp splitst in twee <b>bronchiën</b>, die zich vertakken tot dunne <b>bronchiolen</b>. Alleen de volledig juiste volgorde levert het punt op."))});
  q.append(think,ans);
},STOF_WEG);

const q2=vraag(2,"rokers hoesten slijm op",(q,id)=>{
  const {think,ans,unlock}=start(q,"Rokers hoesten 's ochtends vaak slijm op. "+B("Leg uit hoe dat komt. Beschrijf eerst hoe het trilhaarepitheel bij een niet-roker de luchtwegen schoonhoudt."));
  choiceStep(think,{q:"Uit welke soorten cellen bestaat het trilhaarepitheel?",opts:["cellen met trilhaartjes, en daartussen cellen die slijm maken","spiercellen en kraakbeencellen","cellen van de longblaasjes met haarvaten eromheen"],right:0,
    ok:"Ja. Wat gebeurt er met stof dat in het slijm terechtkomt?",no:"Het woord zegt het al half: tril‑haar‑epitheel. En er hoort nog een soort cel bij.",
    onDone:()=>choiceStep(think,{q:"In welke richting slaan de trilhaartjes het slijm?",opts:["naar beneden, naar de longblaasjes","omhoog, naar de keel"],right:1,
      ok:"Goed. Beschrijf nu de niet-roker, en daarna wat rook aan dit systeem verandert.",no:"Het vuil moet juist weg van de longblaasjes.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Bij een niet-roker plakken stof en bacteriën in het <b>slijm</b> (van de slijmcellen) en slaan de <b>trilhaartjes</b> het slijm omhoog naar de keel, waar het wordt doorgeslikt.",
    "Bij rokers <b>verlamt de rook de trilhaartjes</b> (en maken ze meer slijm), dus blijft het slijm liggen en moet het worden opgehoest."],
    model:"Bij een niet-roker blijven stof en bacteriën plakken in het slijm dat de slijmcellen maken. De trilhaartjes slaan dat slijm omhoog naar de keel, en daar slik je het door. Rook verlamt de trilhaartjes (op den duur gaan ze kapot) en rokers maken meer slijm. Het slijm wordt dan niet meer afgevoerd, blijft liggen en moet worden opgehoest.",
    valkuil:"‘De rook maakt de luchtpijp nauwer’ of ‘er zit teer in de longblaasjes’: 0 punten voor het tweede element.",
    after:()=>waaromBtn(ans,textBox("Het trilhaarepitheel werkt als een <b>lopende band</b>: het slijm vangt het vuil, de trilhaartjes voeren het af naar de keel. Bij een roker staat de band stil (trilhaartjes verlamd) terwijl er juist méér slijm bij komt. Wat niet wordt afgevoerd, blijft liggen; 's nachts hoopt het zich op, en 's ochtends hoest de roker het op."))});
  q.append(think,ans);
},STOF_TRIL);

opgave("Ademhaling","Ademhaling",`<p>Bij deze opgave hoort geen inleiding.</p>`,[q1,q2]);
}
