/* ===== Opgave 5: Uitscheiding en zuurgraad (kennisvragen KC01 (havo), KC04, KC10 uit toetsen-biologie) ===== */
{
const STOF_UIT={titel:"Uitscheiding",html:`
<p><b>Uitscheiding</b> is het kwijtraken van afvalstoffen die je eigen cellen maken, en van wat je te veel hebt aan water en zouten. Ontlasting bestaat vooral uit resten van je eten die je nooit hebt opgenomen; dat is geen uitscheiding.</p>
<p>Bij een uitscheidingsorgaan kun je twee dingen vragen: <b>welke stof</b> gaat eruit, en <b>waarmee</b> (in welke vloeistof of in welk gas) verlaat hij je lichaam?</p>`,
films:[F.uit]};
const STOF_HOM={titel:"Alles binnen grenzen",html:`
<p>In je lichaam moet veel gelijk blijven: de hoeveelheid water, zout en glucose, de temperatuur en de zuurgraad. Je lichaam houdt dat binnen nauwe grenzen.</p>
<p>De zuurgraad meet je als <b>pH</b>: hoe zuurder, hoe lager de pH. Normaal ligt de pH van het bloed tussen 7,35 en 7,45: heel licht basisch. Wat een stof zuur maakt, zijn <b>waterstofionen</b>.</p>`,
films:[F.uit]};
const STOF_DIAL={titel:"Hemodialyse",html:`
<p>Werken de nieren bijna niet meer (<b>nierfalen</b>), dan hopen afvalstoffen, zouten, zuur en water zich op in het bloed. Bij <b>hemodialyse</b> stroomt het bloed door een filter met duizenden holle vezels. De wand van die vezels is dun en heeft kleine poriën. Om de vezels heen stroomt dialysevloeistof.</p>
<p>De machine pompt het bloed rond, maar door het vlies duwt niets de stoffen. Hoe een stof door een vlies gaat, hangt af van de grootte van het deeltje en van de concentraties aan beide kanten.</p>`,
films:[F.uit]};
const ids=[];

if(!VWO)ids.push(vraag(2,"tabel: uitscheidingsorganen",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Neem de tabel over en vul per orgaan in welke stof(fen) het uitscheidt en hoe.")+`<br><br>${TABEL(0,["orgaan","stof(fen)","hoe"],[["longen","…","…"],["huid","…","…"],["lever","…","…"],["nieren","…","…"]],"","tabel")}`);
  choiceStep(think,{q:"Welk orgaan maakt ureum?",opts:["de nieren","de lever","de spieren"],right:1,
    ok:"Ja. Maar let op: in de tabel gaat het om welk orgaan iets uitscheidt.",no:"Het orgaan dat ureum maakt, is niet hetzelfde als het orgaan dat het uitscheidt.",
    onDone:()=>choiceStep(think,{q:"Waardoor is poep bruin?",opts:["door galkleurstof uit oude rode bloedcellen","door onverteerde vezels uit groente"],right:0,
      ok:"Goed. Vul nu de tabel in: per orgaan de stof(fen) en waarmee ze het lichaam verlaten.",no:"Het komt van een stof die de lever kwijt moet.",onDone:unlock})});
  rijenAnswer(ans,{id,kop:"Vul per orgaan de stof(fen) en het ‘hoe’ in.",rows:[
    ["longen","koolstofdioxide (en waterdamp), met de uitgeademde lucht"],
    ["huid","water, zouten, een beetje ureum, met zweet"],
    ["lever","afvalstoffen zoals galkleurstof, met de gal (naar de darm, ontlasting)"],
    ["nieren","water, zouten, ureum, met de urine"]],score:n=>n===4?2:n===3?1:0,
    after:()=>waaromBtn(ans,textBox("Alles juist: 2 punten, één fout: 1 punt, meer fouten: 0 punten. Let op de lever: galkleurstof gaat met de gal naar de darm en verlaat het lichaam met de ontlasting. Dat stukje is dus wél uitscheiding, ook al zit het in de poep."))});
  q.append(think,ans);
},STOF_UIT));

ids.push(vraag(2,"inwendig milieu en pH",(q,id)=>{
  const {think,ans,unlock}=start(q,"Beantwoord beide onderdelen.<br>– "+B("Wat is het inwendig milieu, en hoe heet het binnen nauwe grenzen houden ervan?")+"<br>– "+B("Leg uit waarom de pH van het bloed niet veel mag dalen, en noem twee stoffen die het bloed zuurder maken."));
  choiceStep(think,{q:"Een lagere pH betekent …",opts:["zuurder","basischer","meer zuurstof"],right:0,
    ok:"Ja.",no:"Hoe zuurder, hoe … de pH?",
    onDone:()=>choiceStep(think,{q:"Hoe zuur is het bloed normaal?",opts:["pH 7,35–7,45: heel licht basisch","pH 2: sterk zuur","pH 10: sterk basisch"],right:0,
      ok:"Goed. Bedenk welke stoffen in je cellen hun werk niet meer goed doen als het zuurder wordt, en welke stoffen je cellen steeds maken die zuur zijn. En voor het eerste onderdeel: waarin leven je cellen eigenlijk?",no:"Het bloed is net niet zuur.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "de <b>weefselvloeistof</b> waarin je cellen leven; <b>homeostase</b>",
    "bij een lagere pH werken <b>enzymen en eiwitten</b> niet goed meer; <b>koolstofdioxide</b> (vormt een zuur) en <b>melkzuur</b>"],
    model:"Het inwendig milieu is de weefselvloeistof waarin je cellen leven. Het binnen nauwe grenzen houden ervan heet homeostase. Daalt de pH van het bloed te veel, dan werken je enzymen en andere eiwitten niet goed meer. Koolstofdioxide (dat in het bloed een zuur vormt) en melkzuur maken het bloed zuurder.",
    valkuil:"Half goed = 0 punten voor dat element: alleen ‘weefselvloeistof’ zonder ‘homeostase’ (of omgekeerd), of alleen de reden zonder de twee stoffen (of omgekeerd). Ook goed als stof: waterstofionen of zure stoffen bij vetverbranding.",
    after:()=>waaromBtn(ans,textBox("Je cellen zitten niet in het bloed, maar in <b>weefselvloeistof</b>: dat is hun omgeving, het inwendig milieu. <b>Homeostase</b> houdt water, zout, glucose, temperatuur en pH daarin binnen grenzen. Eiwitten, zoals enzymen, hebben een vorm die verandert als het te zuur wordt; dan werken ze niet meer goed. Zuur komt er steeds bij: koolstofdioxide uit de verbranding, melkzuur bij zware inspanning."))});
  q.append(think,ans);
},STOF_HOM));

ids.push(vraag(2,"dialyse: ureum en glucose",(q,id)=>{
  pre(q,"<p>Bij hemodialyse stroomt bloed langs dialysevloeistof, gescheiden door een vlies met kleine poriën. In de vloeistof zit geen ureum, maar wel glucose in dezelfde concentratie als in gezond bloed.</p>");
  const {think,ans,unlock}=start(q,"– "+B("Noem twee soorten deeltjes die niet door de poriën kunnen.")+"<br>– "+B("Leg uit waardoor ureum het bloed uit gaat en glucose niet."));
  choiceStep(think,{q:"Wat bepaalt of een deeltje door een porie van het vlies kan?",opts:["de grootte van het deeltje","de kleur van het deeltje","of het deeltje nuttig is"],right:0,
    ok:"Ja. Welke delen van het bloed zijn te groot?",no:"Een vlies met poriën werkt als een zeef.",
    onDone:()=>choiceStep(think,{q:"Diffusie gaat van …",opts:["een hoge naar een lage concentratie","een lage naar een hoge concentratie"],right:0,
      ok:"Goed. Vergelijk nu voor ureum en voor glucose de concentratie in het bloed met die in de vloeistof.",no:"Denk aan een druppel inkt in water.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "<b>bloedcellen</b> en <b>grote eiwitten</b>",
    "het is <b>diffusie</b> van hoog naar laag: ureum heeft in het bloed een hoge en in de vloeistof (die steeds ververst wordt) een lage concentratie; voor glucose is de concentratie aan beide kanten <b>even hoog</b>, dus gaat het er niet uit"],
    model:"Bloedcellen en grote eiwitten kunnen niet door de poriën. Door het vlies gaan stoffen door diffusie, van een hoge naar een lage concentratie. In het bloed zit veel ureum en in de vloeistof (die steeds ververst wordt) niets, dus ureum diffundeert het bloed uit. Glucose is aan beide kanten even geconcentreerd, dus er gaat netto geen glucose het bloed uit.",
    valkuil:"‘De machine perst het ureum eruit’ is fout: de stoffen gaan door diffusie. Bij ‘glucose is te groot’ vergeet je dat glucose wél door de poriën kan.",
    after:()=>waaromBtn(ans,textBox("Ureum: bloed <b>veel</b> → vloeistof <b>niets</b> → groot verschil → ureum diffundeert het bloed uit. Glucose: bloed <b>normaal</b> ↔ vloeistof <b>even veel</b> → geen verschil → glucose blijft in het bloed. Was de vloeistof gewoon water, dan zou ook de glucose het bloed uit diffunderen."))});
  q.append(think,ans);
},STOF_DIAL));

opgave("Uitscheiding","Uitscheiding en zuurgraad",`<p>Bij deze opgave hoort geen inleiding.</p>`,ids);
}
