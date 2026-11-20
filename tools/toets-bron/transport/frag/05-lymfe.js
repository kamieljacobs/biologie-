/* ===== Opgave 5: Weefselvloeistof en lymfe (KL05) en opgave 6: Olifantsbenen door wormen (E01–E04) uit eigen/transport.json ===== */
{
const STOF_WV={titel:"Rond elke cel",html:`
<p>Je cellen raken je bloed niet direct. Tussen het haarvat en de cellen zit vocht: <b>weefselvloeistof</b>. Via dat vocht krijgen de cellen hun stoffen.</p>
<p>Aan het begin van een haarvat is de bloeddruk nog vrij hoog. Die druk duwt vocht door de dunne wand van het haarvat naar buiten: <b>filtratie</b>. De wand van een haarvat bestaat uit één laag cellen, met kleine openingen.</p>`
+(VWO?`<p>Voor vwo: plasma en weefselvloeistof verschillen in <b>osmotische waarde</b>; daardoor trekt het plasma aan het eind van het haarvat water terug.</p>`:""),
films:[F.lymfe]};
const q1=vraag(2,"plasma en weefselvloeistof",(q,id)=>{
  const {think,ans,unlock}=start(q,"Weefselvloeistof lijkt op bloedplasma, maar is er niet gelijk aan.<br>"+B("Beschrijf twee verschillen tussen bloedplasma en weefselvloeistof, en leg uit waardoor die verschillen ontstaan."));
  choiceStep(think,{q:"Waaruit ontstaat weefselvloeistof?",opts:["uit bloed: vocht wordt door de wand van het haarvat naar buiten geduwd","uit de cellen zelf: ze lekken vocht","uit de lymfe"],right:0,
    ok:"Ja. Het haarvat werkt dus als een soort zeef. Bedenk welke delen van het bloed te groot zijn om erdoor te gaan.",no:"Lees de uitleg van de stof nog eens: wat duwt de bloeddruk naar buiten?",
    onDone:()=>chipsStep(think,{q:"Welke van deze delen van het bloed zijn <b>klein</b>? Kies alles wat klopt.",items:[["water",1],["glucose",1],["zouten",1],["rode bloedcellen",0],["grote eiwitten",0]],
      ok:"Goed. Welke delen blijven dan achter in het haarvat?",no:"Cellen en grote moleculen zijn niet klein.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Weefselvloeistof bevat <b>geen rode bloedcellen</b> en (veel) <b>minder eiwitten</b> dan bloedplasma.",
    "De rode bloedcellen en de meeste plasma-eiwitten zijn <b>te groot</b> om door de wand van het haarvat te gaan; alleen water met kleine stoffen wordt naar buiten geduwd."],
    model:"Weefselvloeistof heeft geen rode bloedcellen en veel minder eiwitten dan bloedplasma. Dat komt doordat de bloeddruk alleen water met kleine stoffen door de wand van het haarvat duwt; rode bloedcellen en de meeste plasma-eiwitten zijn te groot en blijven in het bloed.",
    valkuil:"‘Weefselvloeistof is bloed dat gelekt is’ is precies de misvatting: dan zouden er wel rode bloedcellen in zitten.",
    after:()=>waaromBtn(ans,textBox("Denk aan een zeef: water, glucose, zouten en zuurstof gaan door de openingen in de wand van het haarvat, cellen en de meeste grote eiwitten niet. Weefselvloeistof lijkt dus op plasma, maar zonder rode bloedcellen en met veel minder eiwitten. Rode bloedcellen kunnen hun zuurstof wel afgeven: die gaat er als klein molecuul doorheen."))});
  q.append(think,ans);
},STOF_WV);
opgave("Weefselvloeistof","Weefselvloeistof en lymfe","",[q1]);

const STOF_LYMFE={titel:"Een tweede afvoer: de lymfe",html:`
<p>Aan het eind van een haarvat gaat het meeste vocht weer terug het bloed in (<b>resorptie</b>). Tussen je cellen beginnen dunne, doodlopende vaatjes: <b>lymfevaten</b>. Wat in de lymfevaten loopt, heet <b>lymfe</b>.</p>
<p>De lymfevaten komen samen in steeds grotere vaten, met onderweg <b>lymfeknopen</b> vol witte bloedcellen. Een hart heeft het lymfestelsel niet: spieren knijpen de lymfevaten samen en er zitten <b>kleppen</b> in, net als in aders.</p>
<p>Hoopt er vocht op tussen de cellen, dan zwelt het weefsel op: <b>oedeem</b>.</p>`,
films:[F.lymfe]};
const q2=vraag(2,"een dik been",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Leg uit waardoor verstopte lymfevaten tot een dik been leiden."));
  choiceStep(think,{q:"Gaat aan het eind van het haarvat al het vocht dat eruit kwam weer terug het bloed in?",opts:["ja, alles","nee, niet alles"],right:1,
    ok:"Ja. Waar blijft het deel dat niet terugkomt normaal gesproken?",no:"Lees de uitleg van de stof nog eens, en let op het woord ‘meeste’.",
    onDone:()=>choiceStep(think,{q:"Wat gebeurt er met vocht dat zich ophoopt tussen de cellen?",opts:["het weefsel zwelt op","het verdampt via de huid","de cellen nemen het allemaal op"],right:0,
      ok:"Goed. Verbind nu de twee stappen: wat doen de lymfevaten normaal, en wat gaat er mis als ze verstopt zijn?",no:"Dat heet oedeem.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Uit de haarvaten gaat steeds meer vocht naar buiten dan er terugkomt; het restje weefselvloeistof wordt normaal door de <b>lymfevaten afgevoerd</b>.",
    "Als de lymfevaten verstopt zijn, wordt dat vocht <b>niet afgevoerd</b> en hoopt de weefselvloeistof zich op (<b>oedeem</b>)."],
    model:"Uit de haarvaten gaat elke dag meer vocht naar buiten dan er terugkomt. Dat restje weefselvloeistof wordt normaal via de lymfevaten afgevoerd. Zijn de lymfevaten verstopt, dan kan dat vocht niet weg. Het hoopt zich op tussen de cellen en het been zwelt op: oedeem.",
    valkuil:"‘De wormen maken het been dik’ of ‘er lekt bloed uit de lymfevaten’ is geen uitleg: het gaat om vocht dat niet meer wordt afgevoerd.",
    after:()=>waaromBtn(ans,textBox("Vergelijk het met een gootsteen waarin de kraan een beetje harder loopt dan het putje afvoert, met een tweede afvoer (de lymfevaten) die het verschil wegwerkt. Zit die tweede afvoer dicht, dan loopt de gootsteen langzaam vol. Zo hoopt het restje weefselvloeistof zich op in het been."))});
  q.append(think,ans);
},STOF_LYMFE);

const q3=vraag(1,"van lymfe naar bloed",(q,id)=>{
  const {think,ans,unlock}=start(q,"Jonge wormen kunnen met de lymfe worden meegevoerd. "+B("Langs welke weg komen ze dan in het bloed terecht?"));
  choiceStep(think,{q:"Waar begint een lymfevat?",opts:["doodlopend, tussen de cellen in het weefsel","vast aan het eind van een haarvat","in een lymfeknoop"],right:0,
    ok:"Ja. Volg nu in gedachten de weg van de lymfe: door steeds grotere lymfevaten, tot ze bij het bloed komt. Langs welk soort bloedvat kan dat, waar de druk laag is?",no:"Lymfevaten zitten niet aan haarvaten vast: het restje weefselvloeistof loopt erin.",onDone:unlock});
  mc(ans,{qid:id,pts:1,right:0,opts:["via de borstbuis en een ader bij het sleutelbeen","via de poortader naar de lever","via de wand van de haarvaten in het been","via de lymfeknopen rechtstreeks in de aorta"],onChecked:()=>waaromBtn(ans,textBox(
    "De lymfevaten komen samen in de borstbuis; die komt bij het linkersleutelbeen uit in een <b>ader</b>, die naar de bovenste holle ader gaat. Antwoord <b>A</b>.<br>B: ook het vet uit de darm gaat juist níét via de poortader, maar via de lymfe. C: lymfe stroomt van de weefsels naar het bloed via de lymfevaten, niet terug door de wand van de haarvaten. D: lymfe komt nooit rechtstreeks in een slagader."))});
  q.append(think,ans);
},STOF_LYMFE);

const q4=vraag(2,"infecties in het gezwollen been",(q,id)=>{
  const {think,ans,unlock}=start(q,"Bij patiënten met olifantsbenen ontstaan vaak infecties in de huid van het gezwollen been. Het advies is daarom om het been goed te wassen en wondjes te verzorgen.<br>"+B("Leg uit waardoor ziekteverwekkers in het gezwollen been minder goed worden opgeruimd, nu de lymfevaten verstopt zijn."));
  choiceStep(think,{q:"Wat zit er in grote aantallen in een lymfeknoop?",opts:["rode bloedcellen","witte bloedcellen","vetcellen"],right:1,
    ok:"Ja. Wat doen die met ziekteverwekkers? En hoe komen ziekteverwekkers uit het been normaal bij een lymfeknoop?",no:"Denk aan dikke klieren in je hals bij keelpijn.",onDone:unlock});
  openAnswer(ans,{id,pts:2,checks:[
    "Normaal neemt de lymfe ziekteverwekkers uit het weefsel mee naar de <b>lymfeknopen</b>, waar <b>witte bloedcellen</b> ze vangen.",
    "Als de lymfevaten verstopt zijn, blijven ziekteverwekkers in het (vochtige) weefsel achter en komen ze niet bij de lymfeknopen, zodat ze zich kunnen vermeerderen."],
    model:"Normaal neemt de lymfe ziekteverwekkers uit het weefsel mee naar de lymfeknopen. Daar vangen witte bloedcellen ze. Zijn de lymfevaten verstopt, dan komen de ziekteverwekkers niet bij de lymfeknopen. Ze blijven in het vochtige weefsel van het been en kunnen zich daar vermeerderen.",
    valkuil:"‘De wormen eten de witte bloedcellen op’ of alleen ‘de afweer is zwakker’ zonder de rol van de lymfe en de lymfeknopen: 0 punten.",
    after:()=>waaromBtn(ans,textBox("De lymfe is een soort lopende band van het weefsel naar de lymfeknopen, de controleposten met witte bloedcellen. Ligt die band stil, dan worden ziekteverwekkers niet meer naar de controlepost gebracht. In het stilstaande vocht van het gezwollen been kunnen ze zich vermeerderen. Daarom is goed wassen en wondjes verzorgen zo belangrijk."))});
  q.append(think,ans);
},STOF_LYMFE);

const q5=vraag(1,"de richting van de lymfe",(q,id)=>{
  const {think,ans,unlock}=start(q,"In de lymfevaten van het been zitten kleppen. "+B("In welke richting stroomt de lymfe in het been?"));
  choiceStep(think,{q:"Waar gaat de lymfe uiteindelijk naartoe?",opts:["terug naar het bloed","naar de voet, waar ze wordt uitgescheiden","nergens: lymfe blijft in het weefsel"],right:0,
    ok:"Ja. Wat doen kleppen met de richting van een stroom?",no:"Lymfe is vocht dat terug moet naar het bloed.",onDone:unlock});
  mc(ans,{qid:id,pts:1,right:0,opts:["van de voet naar de lies, en verder naar het bloed","van de lies naar de voet","beide kanten op, afhankelijk van de stand van het been","de lymfe staat stil; alleen de wormen bewegen"],onChecked:()=>waaromBtn(ans,textBox(
    "Net als in de aders laten de kleppen de lymfe maar één kant op: naar het bloed. In het been is dat <b>van de voet naar de lies</b>, en verder via de borstbuis naar het bloed. Antwoord <b>A</b>. C denkt dat de lymfe met de zwaartekracht mee zakt: de kleppen voorkomen dat. De spieren knijpen de lymfevaten samen; ook daarom helpt bewegen tegen een dik been."))});
  q.append(think,ans);
},STOF_LYMFE);

opgave("Olifantsbenen","Olifantsbenen door wormen",`
<p>Lymfatische filariasis is een tropische ziekte die wordt veroorzaakt door kleine wormen. Muggen brengen de larven over: na een beet komen ze via de huid binnen en trekken ze naar het lymfestelsel. Daar groeien ze in ongeveer een jaar uit tot volwassen wormen, die in de lymfevaten leven. Door steeds terugkerende ontstekingen raken de lymfevaten beschadigd en verstopt. Een been kan dan enorm opzwellen: olifantsziekte.</p>
<p>Patiënten wordt geadviseerd het gezwollen been vaak hoog te leggen en goed te wassen.</p>`,[q2,q3,q4,q5]);
}
