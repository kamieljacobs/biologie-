/* ===== Opgave 1: Het hart en de bloedsomloop (KH05, KH06, vwo KH07 en KH09, KH10 uit eigen/transport.json) ===== */
{
const STOF_SLAG={titel:"Eén hartslag",html:`
<p>Bij elke hartslag trekken eerst de twee <b>boezems</b> samen: zij duwen het bloed de kamers in. Daarna trekken de twee <b>kamers</b> samen (de <b>systole</b>) en pompen het bloed de slagaders in. Dan ontspant het hart: de <b>diastole</b> of hartpauze. De hartkleppen zorgen dat het bloed maar één kant op kan.</p>
<p>Het startsein voor elke slag komt niet uit je hersenen, maar uit het hart zelf: de <b>sinusknoop</b> in de wand van de rechterboezem geeft uit zichzelf steeds een elektrische prikkel af. Die prikkels kun je op je huid meten: dat is een <b>ECG</b> (elektrocardiogram), met een kleine P-top, een hoge piek (het QRS-complex) en, wat later, de T-top.</p>`
+(VWO?`<p>Voor vwo: de prikkel loopt over de boezems en kan alleen via de <b>AV-knoop</b> naar de kamers; daarna gaat hij via de <b>bundel van His</b> naar de punt van het hart en van daaruit omhoog door de kamerwanden.</p>`:""),
films:[F.pomp]};
const q1=vraag(1,"het ECG",(q,id)=>{
  const {think,ans,unlock}=start(q,"In een ECG volgt op elke P-top een QRS-complex. "+B("Wat gebeurt er in het hart vlak na het QRS-complex?"));
  choiceStep(think,{q:"In welke volgorde trekken de delen van het hart samen bij één hartslag?",opts:["eerst de kamers, dan de boezems","eerst de boezems, dan de kamers","boezems en kamers tegelijk"],right:1,
    ok:"Ja. Kijk nu naar het ECG: welke top komt eerst, en welke daarna?",no:"Het bloed gaat van de boezems naar de kamers. Wat moet er dan eerst samentrekken?",
    onDone:()=>choiceStep(think,{q:"Wanneer geeft de sinusknoop zijn prikkel af?",opts:["aan het begin van elke slag, vóór de boezems samentrekken","pas als de kamers klaar zijn met samentrekken"],right:0,
      ok:"Goed. Elke top in het ECG hoort bij de prikkel die door een deel van het hart loopt. Kies nu je antwoord.",no:"De sinusknoop is de gangmaker: hij geeft het startsein voor de slag.",onDone:unlock})});
  mc(ans,{qid:id,pts:1,right:1,opts:["de boezems trekken samen","de kamers trekken samen","de sinusknoop geeft een nieuwe prikkel af","de kleppen tussen boezems en kamers gaan open"],onChecked:()=>waaromBtn(ans,textBox(
    "De kleine P-top hoort bij de boezems, het hoge QRS-complex bij de kamers: vlak daarna trekken de <b>kamers</b> samen. Antwoord <b>B</b>.<br>A verwart de P-top met het QRS-complex. C: de sinusknoop vuurt vóór de P-top, aan het begin van de slag. D: als de kamers samentrekken, gaan de kleppen tussen boezems en kamers juist dicht (dat is de boem)."))});
  q.append(think,ans);
},STOF_SLAG);

const STOF_HMV={titel:"Slagvolume en hartminuutvolume",html:`
<p>Het <b>slagvolume</b> is de hoeveelheid bloed die een kamer bij één slag wegpompt. De <b>hartfrequentie</b> is het aantal slagen per minuut. Samen bepalen ze het <b>hartminuutvolume</b>: hoeveel bloed het hart per minuut rondpompt.</p>
<p>In rust klopt je hart ongeveer 70 keer per minuut en pompt elke kamer per slag ongeveer 70 mL weg. Samen is dat ongeveer 5 liter per minuut: al je bloed, één keer rond.</p>
<p>Let bij rekenen op de eenheden: 1 liter = 1000 mL.</p>`,
films:[F.pomp,F.regel]};
const q2=vraag(2,"het slagvolume berekenen",(q,id)=>{
  const {think,ans,unlock}=start(q,"Bij een sporter in rust wordt een hartminuutvolume van 6,0 liter per minuut gemeten, bij een hartfrequentie van 75 slagen per minuut.<br>"+B("Bereken het slagvolume in mL."));
  choiceStep(think,{q:"Welke formule hoort bij het hartminuutvolume?",opts:["hartminuutvolume = hartfrequentie × slagvolume","hartminuutvolume = slagvolume : hartfrequentie","hartminuutvolume = hartfrequentie + slagvolume"],right:0,
    ok:"Ja. Je zoekt nu het slagvolume: schrijf de formule zo om dat het slagvolume alleen staat.",no:"Denk aan het voorbeeld uit de film: 70 slagen per minuut en 70 mL per slag geeft samen ongeveer 5 liter per minuut.",
    onDone:()=>numStep(think,{uid:"q"+id+"n",q:"Hoeveel mL is 6,0 liter?",right:6000,ok:"Goed. Reken nu het slagvolume uit.",no:"1 liter = 1000 mL.",onDone:unlock})});
  rekenAnswer(ans,{id,pts:2,right:80,marge:0.5,ook:[[0.08,0.0005]],eenheid:"mL",label:"slagvolume",deel:["Juiste berekening opgezet: slagvolume = hartminuutvolume : hartfrequentie (6000 mL : 75)"],
    model:"hartminuutvolume = hartfrequentie × slagvolume, dus slagvolume = 6000 mL : 75 = <b>80 mL</b> (1 punt voor de berekening, 1 punt voor de uitkomst). Ook goed: 0,080 L.",
    after:()=>waaromBtn(ans,textBox("Het hartminuutvolume is het bloed van alle slagen in één minuut samen. Delen door het aantal slagen per minuut geeft de hoeveelheid per slag: 6000 mL : 75 = 80 mL. Wie 6,0 : 75 rekent, krijgt 0,08: dat is in liter, niet in mL."))});
  q.append(think,ans);
},STOF_HMV);

const ids=[q1,q2];
if(VWO){
ids.push(vraag(2,"de AV-knoop en de bundel van His",(q,id)=>{
  const {think,ans,unlock}=start(q,"Tussen de boezems en de kamers ligt een laag bindweefsel. De prikkel van de sinusknoop kan alleen via de AV-knoop naar de kamers.<br>"+B("Leg uit waarom het belangrijk is dat de prikkel in de AV-knoop wordt vertraagd, en waarom het nuttig is dat de kamers van onder naar boven samentrekken."));
  choiceStep(think,{q:"Waar gaat het bloed heen als de boezems samentrekken?",opts:["naar de kamers","de slagaders in"],right:0,
    ok:"Ja. Wat moet er dus gebeurd zijn voordat de kamers zelf samentrekken?",no:"Tussen boezem en slagader zit nog iets. Volg de weg van het bloed.",
    onDone:()=>choiceStep(think,{q:"Waar vertrekken de aorta en de longslagader uit het hart?",opts:["bovenaan het hart","bij de punt van het hart, onderaan"],right:0,
      ok:"Goed. Bedenk nu wat er met het bloed gebeurt als je een kamer van onder naar boven leegknijpt.",no:"Kijk in gedachten naar een tekening van het hart: de grote slagaders zitten aan de bovenkant.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Door de vertraging trekken de kamers pas samen als de boezems klaar zijn / als de kamers zich gevuld hebben.",
    "De kamers trekken samen van de punt naar boven, zodat het bloed naar boven wordt geknepen, naar de slagaders (aorta en longslagader) die bovenaan vertrekken (zoals een tube tandpasta)."],
    model:"In de AV-knoop wordt de prikkel ongeveer een tiende seconde vertraagd. Zo trekken de kamers pas samen als de boezems klaar zijn en de kamers vol zitten. De prikkel loopt daarna via de bundel van His naar de punt, en de kamers trekken van onder naar boven samen. Zo wordt het bloed naar boven geknepen, naar de aorta en de longslagader, die bovenaan vertrekken.",
    valkuil:"‘Zodat het hart rust krijgt’ is geen uitleg bij de vertraging: het gaat om het vullen van de kamers. Bij het tweede deel moet de plek van de slagaders (bovenaan) erin staan.",
    after:()=>waaromBtn(ans,textBox("Trekken boezems en kamers tegelijk samen, dan duwen de boezems bloed naar kamers die zich al leegknijpen: de kamers zijn dan niet goed gevuld. De vertraging in de AV-knoop voorkomt dat. En knijp je een tube tandpasta in het midden, dan blijft er onderin iets zitten; van onder naar boven knijpen duwt alles naar de opening, net als bij de kamers en de slagaders bovenaan."))});
  q.append(think,ans);
},STOF_SLAG));

const STOF_VOL={titel:"Het hart van een ongeboren kind; druk en snelheid",html:`
<p>Een ongeboren kind ademt nog niet: zijn bloed krijgt zuurstof uit de placenta, via de navelstreng. Daarom gaat het meeste bloed langs de longen. Daarvoor heeft het hart van een ongeboren kind twee extra verbindingen, het <b>foramen ovale</b> en de <b>ductus Botalli</b>. Bij de geboorte gaan de longen aan het werk en sluiten die verbindingen.</p>
<p>Elastische slagaders vangen de stoten uit het hart op (de <b>windketelwerking</b>), zodat er ook tijdens de hartpauze bloed blijft stromen.</p>
<p>Per seconde stroomt overal in de bloedsomloop even veel bloed. Dat <b>volume per seconde</b> is de totale doorsnede maal de snelheid.</p>`,
films:[F.pomp,F.druk]};
ids.push(vraag(2,"juist of onjuist: foetaal hart, windketel en snelheid",(q,id)=>{
  q.append(el("div",{class:"qtext"},UITSPRAKEN(4,["Bij een ongeboren kind stroomt bloed door het foramen ovale van de rechterboezem naar de linkerboezem.","De ductus Botalli verbindt de longader met de aorta.","Bij de windketelwerking rekt de wand van de aorta uit tijdens de systole en veert hij terug tijdens de diastole.","Als de totale doorsnede van een deel van de bloedsomloop twee keer zo groot is, stroomt het bloed daar twee keer zo langzaam."])));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  choiceStep(think,{q:"Waarom gaat bij een ongeboren kind het meeste bloed langs de longen?",opts:["de longen werken nog niet: de zuurstof komt uit de placenta","de longen zijn nog te klein om bloed door te laten"],right:0,
    ok:"Ja. Bedenk bij uitspraak 1 en 2 waar het bloed langs moet om de longen over te slaan.",no:"Een ongeboren kind ademt nog niet. Waar komt zijn zuurstof dan vandaan?",
    onDone:()=>choiceStep(think,{q:"Wat is overal in de bloedsomloop even groot?",opts:["de snelheid van het bloed","het volume bloed dat per seconde voorbijkomt","de bloeddruk"],right:1,
      ok:"Goed: volume per seconde = doorsnede × snelheid. Denk bij uitspraak 4 na wat er dan met de snelheid gebeurt.",no:"Bloed hoopt zich nergens op: wat er bij het hart vertrekt, komt overal even veel per seconde langs.",onDone:unlock})});
  juistOnjuist(ans,{id,stm:["foramen ovale: van rechterboezem naar linkerboezem","ductus Botalli: longader met aorta","windketel: aortawand rekt uit in de systole, veert terug in de diastole","twee keer zo grote doorsnede: twee keer zo langzaam"],key:[true,false,true,true],
    uitleg:textBox("1 <b>juist</b>: zo slaat het bloed de longen over.<br>2 <b>onjuist</b>: de ductus Botalli verbindt de <b>longslagader</b> met de aorta. De longader brengt bloed van de longen naar het hart; die is bij een ongeboren kind niet de omweg.<br>3 <b>juist</b>: zo duwt de aorta ook in de hartpauze nog bloed verder.<br>4 <b>juist</b>: het volume per seconde blijft gelijk, dus bij twee keer zo veel doorsnede is de snelheid half zo groot.")});
  q.append(think,ans);
},STOF_VOL));
}

const STOF_ROND={titel:"Twee rondjes",html:`
<p>Je hart is eigenlijk twee pompen naast elkaar. De rechterhelft pompt bloed door de <b>kleine bloedsomloop</b>: naar de longen en terug. De linkerhelft pompt bloed door de <b>grote bloedsomloop</b>: naar alle organen en terug.</p>
<p>Een <b>slagader</b> voert bloed van het hart af, een <b>ader</b> voert bloed naar het hart toe. In de haarvaten van de longen neemt het bloed zuurstof op; in de haarvaten van de organen geeft het zuurstof af.</p>`,
films:[F.pomp]};
const VATEN=["aorta","longslagader","longader","onderste holle ader"];
const SOORT=["slagader","ader"],O2=["zuurstofrijk","zuurstofarm"];
ids.push(vraag(2,"slagader of ader, zuurstofrijk of -arm",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Vul bij elk bloedvat in of het een slagader of een ader is, en of het zuurstofrijk of zuurstofarm bloed vervoert."));
  choiceStep(think,{q:"Wat bepaalt of een bloedvat een slagader of een ader heet?",opts:["of het bloed zuurstofrijk of zuurstofarm is","de richting: van het hart af of naar het hart toe","hoe dik het bloedvat is"],right:1,
    ok:"Ja. Bepaal dat per bloedvat. Daarna de zuurstof.",no:"Er bestaan slagaders met zuurstofarm bloed. Het gaat dus niet om de zuurstof.",
    onDone:()=>choiceStep(think,{q:"Waar neemt het bloed zuurstof op?",opts:["in de haarvaten van de longen","in het hart","in de haarvaten van de organen"],right:0,
      ok:"Goed. Bedenk per bloedvat: komt het bloed net uit de longen, of is het op weg ernaartoe?",no:"Waar komt de zuurstof in je lichaam binnen?",onDone:unlock})});
  tabelAnswer(ans,{id,kop:["bloedvat","slagader of ader","zuurstofrijk of zuurstofarm"],rijen:[
    ["aorta",[[SOORT,0],[O2,0]]],["longslagader",[[SOORT,0],[O2,1]]],["longader",[[SOORT,1],[O2,0]]],["onderste holle ader",[[SOORT,1],[O2,1]]]],
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"De <b>aorta</b> voert bloed uit de linkerkamer naar de organen: een slagader, met zuurstofrijk bloed.",hl:["aorta","LK"]},
      {cap:"De <b>longslagader</b> voert bloed uit de rechterkamer naar de longen: ook van het hart af, dus een slagader. Het bloed komt uit het lichaam en is zuurstofarm.",hl:["longslagader","RK"]},
      {cap:"De <b>longader</b> brengt bloed uit de longen naar de linkerboezem: naar het hart toe, dus een ader. Het heeft net zuurstof opgenomen: zuurstofrijk.",hl:["longader","LB"]},
      {cap:"De <b>onderste holle ader</b> brengt bloed uit de romp en de benen naar de rechterboezem: een ader, met zuurstofarm bloed. Slagader betekent dus niet ‘zuurstofrijk’.",hl:["holle","RB"]}],
      (st,s)=>st.innerHTML=CIRC({hl:s.hl,kleur:true})))});
  q.append(think,ans);
},STOF_ROND));

opgave("Hart","Het hart en de bloedsomloop","",ids);
}
