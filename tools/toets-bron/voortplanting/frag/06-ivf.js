/* ===== Opgave 6: Louise Brown, het eerste ivf-kind (nieuw; films 3 De cyclus, 5 Zwanger en 6 Anticonceptie) ===== */
{
const STOF_IVF={titel:"Ivf stap voor stap",html:`
<p>Normaal rijpt er per cyclus één follikel. Bij <b>ivf</b> (bevruchting buiten het lichaam) krijgt de vrouw eerst ongeveer tien dagen <b>hormooninjecties met FSH</b>. `+(VWO?`Tegelijk krijgt ze een middel dat haar eigen LH-piek onderdrukt. Zijn de follikels groot genoeg, dan krijgt ze één injectie met <b>hCG</b>, dat lijkt op LH en de LH-piek nadoet; zo'n anderhalve dag later worden de eicellen opgezogen. `:`Met een dunne naald haalt de arts daarna de eicellen uit de eierstokken. `)+`</p>
<p>In een schaaltje komen eicellen en zaadcellen samen; bij weinig of slecht zwemmende zaadcellen spuit de arts één zaadcel in de eicel (<b>ICSI</b>). De embryo's groeien een paar dagen in het lab. Meestal gaat er één terug in de baarmoeder, om een tweeling te voorkomen; andere goede embryo's gaan de vriezer in.</p>`,
films:[F.anti,F.cyc]};
const ids=[];
if(!VWO){
const STOF_EIL={titel:"De eileider",html:`
<p>Bij een eisprong vangt de trechter van de <b>eileider</b> de eicel op. <b>In de eileider</b> kan een eicel bevrucht worden; daarna gaat het embryo naar de baarmoeder.</p>
`,
films:[F.anti,F.org]};
ids.push(vraag(2,"chlamydia en dichte eileiders",(q,id)=>{
  pre(q,"<p>Dichte eileiders, zoals bij Lesley, zijn tegenwoordig vaak het gevolg van een chlamydia-infectie van jaren eerder.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit hoe een chlamydia-infectie die geen klachten gaf, kan leiden tot onvruchtbaarheid bij een vrouw."));
  choiceStep(think,{q:"Waarom wordt chlamydia vaak niet behandeld?",opts:["omdat antibiotica er niet tegen werken","omdat veel vrouwen geen klachten hebben en zich dus niet laten testen"],right:1,
    ok:"Ja: chlamydia is een bacterie en is met antibiotica te genezen, als je het weet. Wat doet de bacterie onbehandeld?",no:"Chlamydia is een bacterie. Antibiotica werken dus wel. Waarom krijgt iemand dan toch geen kuur?",
    onDone:()=>choiceStep(think,{q:"Waar vindt de bevruchting plaats?",opts:["in de baarmoeder","in de eileider","in de eierstok"],right:1,
      ok:"Goed. Wat betekent een afgesloten eileider dan voor zaadcel en eicel?",no:"De eicel wordt na de eisprong opgevangen door een buis met een trechter.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Zonder klachten laat ze zich niet testen en behandelen, zodat de bacterie de <b>eileiders kan ontsteken</b>; daarbij ontstaan <b>littekens</b> die de eileider afsluiten.",
    "Daardoor kunnen <b>zaadcel en eicel elkaar niet bereiken</b> in de eileider, dus is er geen bevruchting."],
    model:"Omdat ze geen klachten had, werd de chlamydia niet ontdekt en niet behandeld met antibiotica. De bacterie liet de eileiders ontsteken. Bij het genezen ontstonden littekens, die de eileiders afsloten. Zaadcellen kunnen de eicel dan niet meer bereiken, dus er kan geen bevruchting plaatsvinden.",
    valkuil:"‘Chlamydia maakt de eicellen kapot’ of ‘ze heeft geen eisprong meer’ is fout: de eierstokken werken gewoon, alleen de weg is dicht."});
  q.append(think,ans);
},STOF_EIL));
ids.push(vraag(2,"één eicel of tien",(q,id)=>{
  pre(q,"<p>In 1978 hadden Steptoe en Edwards per poging maar één eicel. Tegenwoordig krijgt een vrouw bij ivf eerst ongeveer tien dagen hormooninjecties.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit waardoor de kans op een zwangerschap tegenwoordig groter is dan in 1978 dankzij die hormooninjecties."));
  choiceStep(think,{q:"Welk hormoon zit in de injecties, en wat doet het?",opts:["FSH: meerdere follikels rijpen tegelijk","oestrogeen: de baarmoeder wordt groter","LH: de eicellen worden sneller bevrucht"],right:0,
    ok:"Ja: zo heeft de arts een stuk of tien eicellen. Waarom helpt dat?",no:"Welk hormoon laat in de eierstok follikels rijpen?",
    onDone:()=>choiceStep(think,{q:"Niet elke eicel wordt bevrucht en niet elk embryo groeit goed. Wat levert tien eicellen dus op?",opts:["meer kans op een of meer goede embryo's, en reserve-embryo's voor de vriezer","tien embryo's die allemaal terug in de baarmoeder gaan"],right:0,
      ok:"Goed. Zet de twee stappen in je uitleg.",no:"Meestal gaat er maar één embryo terug in de baarmoeder.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Door de injecties met <b>FSH</b> rijpen <b>meerdere follikels</b> tegelijk, dus heeft de arts meer eicellen (ongeveer tien).",
    "Met meer eicellen is de kans groter dat er een of meer <b>goede embryo's</b> ontstaan: de arts kan het beste kiezen en heeft embryo's in de vriezer voor een volgende poging."],
    model:"Met injecties met FSH rijpen niet één maar ongeveer tien follikels. Niet elke eicel wordt bevrucht en niet elk embryo groeit goed. Met tien eicellen is de kans veel groter dat er minstens één goed embryo is. De arts plaatst het beste terug en kan de andere invriezen voor een volgende poging.",
    valkuil:"‘Er worden dan meer embryo's teruggeplaatst’: meestal gaat er juist één terug, om een tweeling te voorkomen."});
  q.append(think,ans);
},STOF_IVF));
const STOF_PLAC={titel:"De placenta",html:`
<p>Een groeiend kind krijgt zuurstof en voedingsstoffen via de <b>placenta</b> en raakt daar koolstofdioxide en afvalstoffen kwijt.</p>
<p>Bij <b>diffusie</b> gaan kleine moleculen vanzelf van een plek met een hoge concentratie naar een plek met een lage concentratie, ook door een dunne laag cellen.</p>`,
films:[F.anti,F.cel]};
ids.push(vraag(2,"alcohol en de placenta",(q,id)=>{
  pre(q,"<p>Louise Brown groeide negen maanden in de baarmoeder van haar moeder, net als elk ander kind. Artsen raden zwangere vrouwen af om alcohol te drinken.</p><p>In de placenta liggen bloedvaatjes van het kind vlak bij bloed van de moeder; daartussen zit een dunne laag cellen.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit dat alcohol uit het bloed van de moeder in het bloed van het kind kan komen, terwijl het bloed van moeder en kind in de placenta niet mengt."));
  choiceStep(think,{q:"Hoe komt zuurstof uit het bloed van de moeder door de dunne laag cellen in het bloed van het kind?",opts:["door diffusie","met de rode bloedcellen van de moeder, die door de laag gaan"],right:0,
    ok:"Ja. Alcohol is ook een klein molecuul. In welke richting gaat het dan?",no:"Bloedcellen gaan niet door de laag: het bloed mengt niet. Hoe gaan kleine moleculen vanzelf door een dunne laag?",
    onDone:()=>choiceStep(think,{q:"De moeder heeft gedronken. Waar is de alcoholconcentratie dan het hoogst?",opts:["in het bloed van de moeder","in het bloed van het kind"],right:0,
      ok:"Goed. Combineer de twee dingen.",no:"De alcohol komt binnen via de moeder.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Alcohol is een <b>klein molecuul</b> en gaat door <b>diffusie</b> door de dunne laag cellen.",
    "Het gaat <b>van hoog (bloed van de moeder) naar laag (bloed van het kind)</b>."],
    model:"Alcohol is een klein molecuul, net als zuurstof. Het gaat door diffusie door de dunne laag cellen tussen het bloed van moeder en kind. Na het drinken is de concentratie in het bloed van de moeder hoog en in dat van het kind laag, dus gaat de alcohol van de moeder naar het kind.",
    valkuil:"‘Het bloed van moeder en kind mengt in de placenta’ is fout. Alleen ‘alcohol gaat door de placenta’, zonder diffusie en zonder richting, is 0 punten."});
  q.append(think,ans);
},STOF_PLAC));
}else{
const STOF_PIEK={titel:"De LH-piek en de eisprong",html:`
<p>De dominante follikel maakt steeds meer oestrogeen. Blijft de oestrogeenspiegel ongeveer twee dagen hoog, dan gaat oestrogeen de afgifte van LH juist stimuleren. Meer LH stimuleert de follikel weer: <b>positieve terugkoppeling</b>, een signaal dat zichzelf versterkt. Het resultaat is de <b>LH-piek</b>, midden in de cyclus.</p>`,
films:[F.cyc]};
ids.push(vraag(2,"precies op tijd",(q,id)=>{
  pre(q,"<p>Steptoe en Edwards haalden de eicel van Lesley met een kijkoperatie uit de follikel, 15 tot 35 uur nadat de LH-piek in de urine was gezien. De urine werd daarvoor elke drie uur verzameld.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit waarom ze de eicel niet veel eerder en ook niet veel later na het begin van de LH-piek konden ophalen."));
  choiceStep(think,{q:"Wat doet de LH-piek met de eicel zelf?",opts:["die hervat de meiose en maakt de eerste deling af","die wordt direct bevrucht","niets: de LH-piek werkt alleen op de baarmoeder"],right:0,
    ok:"Ja: vóór de piek is de eicel dus nog niet rijp. En wat gebeurt er ongeveer anderhalve dag na het begin van de piek?",no:"De eicel staat jaren stil in profase I. Wat zet de LH-piek in gang?",
    onDone:()=>choiceStep(think,{q:"Ongeveer anderhalve dag (± 36 uur) na het begin van de LH-piek…",opts:["scheurt de follikel open en komt de eicel vrij","sterft het geel lichaam af"],right:0,
      ok:"Goed. Waar is de eicel dan, en kunnen de artsen haar nog uit de follikel halen?",no:"Denk aan de eisprong.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "<b>Te vroeg</b>: de eicel is nog niet rijp; pas door de LH-piek hervat ze de meiose en maakt ze de eerste deling af.",
    "<b>Te laat</b>: ongeveer anderhalve dag (± 36 uur) na het begin van de LH-piek scheurt de follikel open (eisprong); dan zit de eicel niet meer in de follikel en is ze niet meer op te halen."],
    model:"De LH-piek laat de eicel de meiose hervatten en de eerste deling afmaken; vóór de piek is de eicel dus nog niet klaar om bevrucht te worden. Ongeveer 36 uur na het begin van de piek is de eisprong: de follikel scheurt open en de eicel verdwijnt uit de follikel. Daarom moest de eicel er tussen die twee momenten uit, en moest de piek zo precies (elke drie uur) gemeten worden.",
    valkuil:"‘Na de LH-piek is de eicel dood’ klopt niet; het probleem is dat ze na de eisprong de follikel uit is. Bij Lesley kon de eicel bovendien niet verder: haar eileiders zaten dicht."});
  q.append(think,ans);
},STOF_PIEK));
ids.push(vraag(1,"de eigen LH-piek onderdrukken",(q,id)=>{
  pre(q,"<p>Tegenwoordig krijgt de vrouw bij ivf ongeveer tien dagen injecties met FSH. Tegelijk krijgt ze een middel dat haar eigen LH-piek onderdrukt.</p>");
  const {think,ans,unlock}=start(q,B("Waarom krijgt ze dat middel?"));
  choiceStep(think,{q:"Wat zou er gebeuren als haar eigen LH-piek op een onverwacht moment kwam?",opts:["de follikels scheuren open voordat de arts de eicellen kan opzuigen","er rijpen minder follikels","de baarmoeder wordt niet klaar"],right:0,
    ok:"Ja. De arts wil zelf bepalen wanneer de eicellen hun rijping afmaken.",no:"Wat volgt er ongeveer anderhalve dag na een LH-piek?",onDone:unlock});
  mc(ans,{qid:id,pts:1,right:1,opts:["Zodat er meer follikels tegelijk rijpen.","Zodat de eicellen niet vrijkomen voordat de arts ze kan opzuigen.","Zodat het baarmoederslijmvlies dikker wordt.","Zodat het geel lichaam langer blijft leven."],
    onChecked:()=>waaromBtn(ans,textBox("Een eigen LH-piek zou een eisprong geven op een moment dat de arts niet kiest: de eicellen zouden dan al uit de follikels zijn. Daarom wordt de eigen piek onderdrukt en geeft de arts zelf het signaal, met hCG. Meer follikels (A) komt door het FSH. Het antwoord is <b>B</b>."))});
  q.append(think,ans);
},STOF_IVF));
ids.push(vraag(1,"zwangerschapstest na de hCG-injectie",(q,id)=>{
  pre(q,"<p>Als de follikels groot genoeg zijn, krijgt de vrouw één injectie met hCG. Zo'n anderhalve dag later worden de eicellen opgezogen. Een paar dagen later wordt een embryo teruggeplaatst. Een vrouw doet een week na de hCG-injectie al een zwangerschapstest. Die is positief.</p>");
  const {think,ans,unlock}=start(q,B("Waarom zegt deze uitslag nog niets?"));
  choiceStep(think,{q:"Welk hormoon meet een zwangerschapstest?",opts:["progesteron","hCG","oestrogeen"],right:1,
    ok:"Ja. Lees nog eens wat ze in die week kreeg.",no:"Normaal komt dit hormoon alleen van een ingenesteld embryo.",onDone:unlock});
  mc(ans,{qid:id,pts:1,right:0,opts:["De test meet hCG, en dat kan nog van de injectie komen.","De test meet progesteron, en dat krijgt ze ook extra.","Een embryo maakt pas hCG als de placenta het progesteron overneemt.","Een test werkt niet bij embryo's die in het lab zijn gemaakt."],
    onChecked:()=>waaromBtn(ans,textBox("Een zwangerschapstest bevat antistoffen die <b>hCG</b> binden. Vlak na een hCG-injectie meet de test dus de injectie zelf, niet een embryo. Pas na ongeveer twee weken zegt de uitslag iets. Het antwoord is <b>A</b>."))});
  q.append(think,ans);
},STOF_IVF));
const STOF_PLAC={titel:"Dichtbij, maar gescheiden",html:`
<p>In de <b>placenta</b> wisselen moeder en kind stoffen uit: zuurstof en voedingsstoffen naar het kind, koolstofdioxide en afvalstoffen terug.</p>
<p>Kleine moleculen gaan door <b>diffusie</b>, van hoog naar laag. Andere stoffen gaan met transporteiwitten of door actief transport.</p>`,
films:[F.zw]};
ids.push(vraag(2,"juist of onjuist: de placenta",(q,id)=>{
  pre(q,"<p>Na de terugplaatsing van een embryo krijgt de vrouw vaak een paar weken extra progesteron. Over de zwangerschap worden vier uitspraken gedaan:</p>");
  q.append(el("p",{class:"qtext"},"1 In de vlokken van de placenta stroomt het bloed van de moeder door dezelfde bloedvaatjes als het bloed van het kind.<br>2 Zuurstof gaat door diffusie van het bloed van de moeder naar het bloed van het kind.<br>3 Alcohol en nicotine gaan bijna net zo makkelijk door de placenta als zuurstof.<br>4 Rond week acht tot tien neemt de placenta de productie van progesteron over van het geel lichaam.<br><br><b>Geef bij elke uitspraak aan of hij juist of onjuist is.</b>"));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  chipsStep(think,{q:"Welke stoffen gaan door de placenta naar het kind? Kies alles wat klopt.",items:[["zuurstof",1],["glucose",1],["rode bloedcellen van de moeder",0],["alcohol",1]],
    ok:"Goed. Kijk bij uitspraak 1 goed wáár het bloed van de moeder stroomt.",no:"Het bloed van moeder en kind mengt niet. Kunnen hele cellen dan door de laag?",onDone:unlock});
  juistOnjuist(ans,{id,stm:["bloed van moeder en kind in dezelfde vaatjes","zuurstof gaat door diffusie","alcohol en nicotine gaan er makkelijk door","rond week 8–10 neemt de placenta progesteron over"],key:[false,true,true,true],
    uitleg:textBox("1 <b>onjuist</b>: de vlokken bevatten alleen bloedvaatjes van het kind; ze hangen in holtes met bloed van de moeder. Het bloed mengt niet.<br>2 <b>juist</b>: van hoog naar laag.<br>3 <b>juist</b>: kleine, ongeladen moleculen gaan er bijna net zo makkelijk door als zuurstof.<br>4 <b>juist</b>: daarna is het geel lichaam niet meer nodig. Vier goed: 2 punten, drie goed: 1 punt.")});
  q.append(think,ans);
},STOF_PLAC));
}

opgave("Ivf","Louise Brown, het eerste ivf-kind",`
<p>Op 25 juli 1978 werd in het ziekenhuis van Oldham, in Engeland, Louise Brown geboren: het eerste kind dat ontstond door in-vitrofertilisatie (ivf). Haar ouders probeerden al negen jaar een kind te krijgen, maar dat lukte niet doordat de eileiders van haar moeder Lesley dicht zaten.</p>
<p>De gynaecoloog Patrick Steptoe en de fysioloog Robert Edwards gebruikten in die tijd geen hormooninjecties meer: ze volgden de natuurlijke cyclus van de vrouw. Zo hadden ze per poging maar één eicel. Die werd in een schaaltje bevrucht, en het embryo werd na ongeveer twee dagen in de baarmoeder teruggeplaatst.</p>
<p class="muted" style="font-size:14px">Bronnen: Encyclopaedia Britannica, ‘Louise Brown’; K. Elder en M.H. Johnson, The Oldham Notebooks III, Reproductive BioMedicine and Society Online 2015.</p>`,ids);
}
