/* ===== Opgave 7: Clickertraining bij de neushoorn (EI-gedrag-B01, B02 havo, B03, B04, B05, B06 vwo) ===== */
{
const TAB2=TABEL(2,["","dag 1","dag 2","dag 3"],[["Bao","20","9","2"],["Mila","20","17","14"]],
  "Aantal keer poot op de plank in tien minuten, nadat de beloning stopte (fictieve gegevens)");
const STOF_LEREN={titel:"Drie manieren van leren",html:`
<p><b>Gewenning</b>: een zeehaas trekt zijn kieuw in als je zijn sifon aanraakt. Doe je het steeds opnieuw, zonder dat er iets gebeurt, dan reageert hij steeds minder.</p>
<p><b>Klassieke conditionering</b>: eten is voor een hond een onvoorwaardelijke prikkel, kwijlen een onvoorwaardelijke reflex. Pavlov liet steeds vlak voor het eten een geluid horen. Na een aantal keer kwijlde de hond al bij het geluid: het geluid was een <b>voorwaardelijke prikkel</b> geworden. Je koppelt twee prikkels.</p>
<p><b>Operante conditionering</b>: je koppelt gedrag aan een gevolg. Skinners ratten drukten steeds vaker op een hendel als er dan een voerkorreltje kwam. Gedrag met een prettig gevolg neemt toe: <b>bekrachtiging</b>. Gedrag met een onprettig gevolg neemt af: <b>straf</b>.</p>
<p><b>Uitdoving</b>: liet Pavlov het geluid klinken zonder eten, dan werd het kwijlen steeds minder. Het verband was niet gewist: na een pauze kwam het kwijlen een beetje terug.</p>`,
films:[F.leren]};
const STOF_UIT={titel:"Als de beloning stopt",html:`
<p>Gedrag dat is aangeleerd met een beloning, neemt af als de beloning wegvalt. Dat heet <b>uitdoving</b>. Het verband is daarbij niet gewist: na een pauze komt het gedrag vaak een beetje terug.</p>
<p>Hoe snel gedrag uitdooft, verschilt. In een tabel zie je dat aan hoe snel het aantal per dag daalt. Vergelijk dus per dier de daling van dag 1 naar dag 3, niet alleen het getal op één dag.</p>`,
films:[F.leren]};

const b1=vraag(2,"het zoemende scheerapparaat",(q,id)=>{
  pre(q,"<p>Vóór het bloedprikken scheert de dierenarts een stukje huid met een zoemend scheerapparaat. In het begin schrikt Bao van het zoemen. Sanne laat het apparaat daarom twee weken lang elke dag even zoemen naast zijn hok, zonder het te gebruiken. Daarna reageert Bao er niet meer op.</p>");
  const {think,ans,unlock}=start(q,B("Welke vorm van leren is dit? Leg uit waarom dit geen uitdoving is."));
  chipsStep(think,{q:"Bij welke vormen van leren wordt iets <b>gekoppeld</b>: twee prikkels aan elkaar, of gedrag aan een gevolg? Kies alles wat klopt.",items:[["gewenning",0],["klassieke conditionering",1],["operante conditionering",1]],
    ok:"Goed. Uitdoving is het zwakker worden van zo'n aangeleerde koppeling. Was het zoemen voor Bao ooit ergens aan gekoppeld?",no:"Bij een van de drie wordt niets gekoppeld: daar reageer je alleen steeds minder op een prikkel die steeds terugkomt.",
    onDone:()=>choiceStep(think,{q:"Volgde er voor Bao ooit iets prettigs of vervelends op het zoemen?",opts:["ja, steeds een appel","nee, het zoemen kwam steeds terug zonder gevolg"],right:1,
      ok:"Goed. Noem nu de vorm van leren, en leg het verschil met uitdoving uit.",no:"Lees nog eens wat Sanne twee weken lang deed.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "<b>Gewenning</b>.",
    "Het zoemen was <b>nooit aan iets gekoppeld</b> (niet aangeleerd); het is een prikkel die steeds terugkomt zonder gevolgen. Bij <b>uitdoving</b> wordt een <b>aangeleerde reactie</b> zwakker doordat de koppeling (de beloning) niet meer volgt."],
    model:"Dit is gewenning. Het zoemen is een prikkel die steeds terugkomt zonder dat er iets op volgt, en Bao reageert er steeds minder op. Het is geen uitdoving, want Bao heeft het zoemen nooit aan iets geleerd te koppelen. Uitdoving is het zwakker worden van een aangeleerde reactie, doordat de beloning of de andere prikkel niet meer volgt.",
    valkuil:"Alleen ‘er gebeurt niets’ zonder het verschil met uitdoving: 0 punten voor het tweede element.",
    after:()=>waaromBtn(ans,textBox("Bij <b>gewenning</b> reageer je niet meer op een prikkel die er niet toe doet; er is nooit iets geleerd. Bij <b>uitdoving</b> was er eerst wél een koppeling (bijvoorbeeld klik → appel) en wordt de reactie zwakker omdat het gevolg wegblijft. In beide gevallen neemt een reactie af, maar de oorzaak is anders."))});
  q.append(think,ans);
},STOF_LEREN);

const ids=[b1];
if(!VWO){
ids.push(vraag(1,"de sleutelbos van Sanne",(q,id)=>{
  const {think,ans,unlock}=start(q,"Sanne rammelt elke ochtend met haar sleutelbos, vlak voordat ze het voer in Bao's verblijf brengt. Na een week loopt Bao al naar het hek als hij de sleutels hoort. "+B("Welke vorm van leren is dit?"));
  choiceStep(think,{q:"Moet Bao iets dóén om het voer te krijgen?",opts:["ja, hij moet naar het hek lopen","nee, het voer komt hoe dan ook"],right:1,
    ok:"Klopt. Wat doet het rammelen van de sleutels dan voor Bao? En welke vorm van leren hoort daarbij?",no:"Lees de vraag nog eens: brengt Sanne het voer alleen als Bao naar het hek loopt?",onDone:unlock});
  mc(ans,{qid:id,pts:1,right:1,opts:["gewenning","klassieke conditionering","operante conditionering","inzichtelijk leren"],
    onChecked:()=>waaromBtn(ans,textBox("Het antwoord is <b>B</b>. Twee prikkels worden gekoppeld: de sleutels kondigen het voer aan, net als het geluid bij Pavlov. C is fout: Bao krijgt het voer niet doordat hij iets doet."))});
  q.append(think,ans);
},STOF_LEREN));
}

ids.push(vraag(2,"de klik als beloning",(q,id)=>{
  const {think,ans,unlock}=start(q,"In fase 2 klikt Sanne op het moment dat Bao zijn poot op de plank zet, en geeft ze de appel pas daarna. "+B("Leg uit waarom de klik daar werkt als beloning, en waarom klikken beter werkt dan alleen een appel geven."));
  choiceStep(think,{q:"Wat heeft Bao in fase 1 geleerd?",opts:["dat de klik een appel aankondigt","dat hij zijn poot op de plank moet zetten","dat de klik gevaarlijk is"],right:0,
    ok:"Ja. Wat voor prikkel is de klik daardoor geworden, en wat doet de klik dus met Bao?",no:"Lees fase 1 nog eens: wat volgde er steeds vlak na de klik?",
    onDone:()=>choiceStep(think,{q:"Bao zet zijn poot op de plank en haalt hem meteen weer weg. Sanne pakt een appel en geeft die drie seconden later. Waaraan koppelt Bao de appel het makkelijkst?",opts:["aan de poot op de plank, ook al is die al weg","aan wat hij doet op het moment dat hij de appel krijgt"],right:1,
      ok:"Goed. Leg nu uit wat de klik daar beter doet dan de appel.",no:"Een dier koppelt een gevolg aan wat het vlak daarvoor deed.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Door fase 1 is de klik een <b>voorwaardelijke prikkel</b> geworden die de appel aankondigt, dus de klik zelf is al prettig (<b>bekrachtiging</b>).",
    "Een klik kan <b>precies op het moment</b> van het goede gedrag, een appel geven duurt langer; zo koppelt Bao het gevolg aan het <b>juiste gedrag</b> (poot op de plank) en niet aan iets wat hij een paar seconden later doet."],
    model:"In fase 1 heeft Bao geleerd dat de klik een appel aankondigt: de klik is een voorwaardelijke prikkel geworden. Daardoor is de klik zelf al prettig en werkt hij als bekrachtiging van het gedrag. Een klik kan Sanne precies laten horen op het moment dat de poot op de plank staat. Een appel geven duurt een paar seconden; dan koppelt Bao de beloning misschien aan iets anders wat hij net deed.",
    valkuil:"‘De klik is leuk’ zonder fase 1 (de koppeling met de appel) is geen uitleg. Noem ook het tijdstip: daar zit het voordeel van de klik.",
    after:()=>waaromBtn(ans,textBox("Hier werken <b>klassieke</b> en <b>operante</b> conditionering samen. Fase 1 (klassiek) koppelt de klik aan de appel. In fase 2 (operant) gebruikt Sanne die klik als beloning voor gedrag. Een gevolg werkt het best als het direct op het gedrag volgt; de klik is als het ware een snelle belofte: ‘dit was goed, de appel komt eraan’."))});
  q.append(think,ans);
},STOF_LEREN));

const B4=vraag(1,"rekenen aan tabel 2",(q,id)=>{
  pre(q,"<p>In een andere dierentuin werden twee neushoorns, Bao en Mila, getraind om hun poot op de plank te zetten. Daarna kregen ze allebei helemaal geen appel meer. Tabel 2 laat zien hoe vaak ze daarna nog hun poot op de plank zetten.</p>"+TAB2);
  const {think,ans,unlock}=start(q,B("Bereken hoeveel keer zo vaak Mila op dag 3 haar poot op de plank zet als Bao."));
  numStep(think,{uid:"q"+id+"n",q:"Hoe vaak zet Bao op dag 3 zijn poot op de plank?",right:2,ok:"Ja. Lees ook het getal van Mila op dag 3 af.",no:"Kijk in de rij van Bao, kolom dag 3.",
    onDone:()=>choiceStep(think,{q:"Hoe reken je uit hoeveel keer zo vaak het ene getal is als het andere?",opts:["het grootste getal min het kleinste","het ene getal gedeeld door het andere","de twee getallen bij elkaar opgeteld"],right:1,
      ok:"Goed. Reken het uit.",no:"‘Hoeveel keer zo vaak’ vraagt om een verhouding, niet om een verschil.",onDone:unlock})});
  numAnswer(ans,{id,fields:[["Mila zet haar poot … keer zo vaak op de plank","keer",v=>v===7,"14 / 2 = 7 keer zo vaak"]],
    after:()=>waaromBtn(ans,textBox("Op dag 3 zet Mila haar poot 14 keer op de plank, Bao 2 keer. 14 / 2 = <b>7</b>: Mila doet het zeven keer zo vaak. Wie 12 invult, rekent het verschil uit (14 − 2) in plaats van hoeveel keer zo vaak."))});
  q.append(think,ans);
},{titel:"Hoeveel keer zo vaak?",html:`<p>‘Hoeveel keer zo vaak’ is een <b>verhouding</b>: je deelt het ene getal door het andere. Voorbeeld: een vogel zingt 's ochtends 30 keer en 's middags 10 keer, dus 's ochtends 30 / 10 = 3 keer zo vaak.</p><p>Een <b>verschil</b> (aftrekken) beantwoordt een andere vraag: hoeveel keer méér?</p>`});
ids.push(B4);

ids.push(vraag(2,"wie werd af en toe beloond?",(q,id)=>{
  pre(q,`<p>Eén van de twee neushoorns werd tijdens de training bij elke poot op de plank beloond, de ander alleen af en toe, onvoorspelbaar.</p><p class="muted" style="font-size:14px;margin:6px 0 2px">Tabel 2 (uit vraag ${B4}):</p>`+TAB2);
  const {think,ans,unlock}=start(q,B("Leg met tabel 2 uit welke neushoorn af en toe werd beloond."));
  choiceStep(think,{q:"Kijk in tabel 2. Bij wie neemt het gedrag het snelst af nadat de beloning stopte?",opts:["bij Bao","bij Mila","bij allebei even snel"],right:0,
    ok:"Ja: bij Bao gaat het van 20 naar 2, bij Mila van 20 naar 14. Bedenk nu: voor welk dier was ‘geen beloning’ tijdens de training heel gewoon?",no:"Vergelijk per neushoorn dag 1 met dag 3.",
    onDone:()=>choiceStep(think,{q:"Een dier kreeg tijdens de training vaak níets na de poot op de plank. Wat merkt het als de beloning helemaal stopt?",opts:["meteen: het verschil is heel groot","weinig: niets krijgen was al heel gewoon"],right:1,
      ok:"Goed. Welke neushoorn werd dus af en toe beloond? Leg het uit met de tabel.",no:"Bedenk hoe vaak dit dier tijdens de training al niets kreeg.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "<b>Mila</b>, want haar gedrag <b>dooft veel langzamer uit</b>.",
    "Voor een dier dat af en toe beloond werd, is ‘niets’ heel gewoon, dus het <b>blijft langer proberen</b>; een dier dat altijd beloond werd, <b>merkt snel</b> dat er niets meer komt."],
    model:"Mila werd af en toe beloond. Haar gedrag dooft veel langzamer uit: van 20 naar 14 keer, tegen 20 naar 2 bij Bao. Voor Mila was niets krijgen tijdens de training heel gewoon, dus ze blijft het proberen: misschien komt de appel de volgende keer wel. Bao kreeg altijd een appel en merkt daarom snel dat er niets meer komt.",
    valkuil:"Alleen ‘Mila’ zonder uitleg: 0 punten.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Dag 1: allebei zetten ze hun poot nog 20 keer op de plank.",o:{toon:1}},
      {cap:"Dag 2: Bao merkt al snel dat er niets meer komt (9), Mila gaat door (17).",o:{toon:2}},
      {cap:"Dag 3: bij Bao is het gedrag bijna uitgedoofd (2), bij Mila nog lang niet (14). Elke keer belonen leert snel; onvoorspelbaar belonen maakt gedrag hardnekkig.",o:{toon:3,hl:"Mila"}}],
      (st,s)=>st.innerHTML=UITDOOF(s.o)))});
  q.append(think,ans);
},STOF_UIT));

if(VWO){
const STOF_DA={titel:"Dopamine: een leersignaal",html:`
<p><b>Dopamine</b> wordt vaak een gelukstof genoemd, maar dat klopt niet goed. Het werkt vooral als leer- en motivatiesignaal: het zorgt dat je iets wílt.</p>
<p>Bij apen vuurden dopamine-neuronen sterk bij een onverwachte beloning. Wat er gebeurt als de aap leert dat een lampje de beloning aankondigt, en wat er gebeurt als de beloning uitblijft, zie je in de film.</p>
<p>Het verschil tussen wat je verwacht en wat er echt gebeurt, heet de <b>voorspellingsfout</b>.</p>`,
films:[F.leren]};
ids.push(vraag(2,"voorspellingsfout",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Leg met het begrip voorspellingsfout uit wat er in Bao's dopaminesysteem gebeurt bij de klik na de training, en als de appel daarna uitblijft."));
  choiceStep(think,{q:"Bij de aap in de film: wanneer vuurden de dopamine-neuronen nadat de aap had geleerd dat een lampje de beloning aankondigt?",opts:["nog steeds vooral bij de beloning","al bij het lampje","helemaal niet meer"],right:1,
    ok:"Ja. Voor Bao werkt de klik als dat lampje. Wat verwacht Bao na de klik?",no:"Het lampje gaf de aap al informatie: de beloning komt eraan.",
    onDone:()=>choiceStep(think,{q:"Bao hoort de klik, maar de appel blijft uit. Is de uitkomst dan beter of slechter dan Bao verwachtte?",opts:["beter dan verwacht","slechter dan verwacht","precies zoals verwacht"],right:1,
      ok:"Goed. Wat doen de dopamine-neuronen bij een uitkomst die slechter is dan verwacht, en wat betekent dat voor het leren?",no:"Na de klik verwacht Bao een appel.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Na de training vuren de dopamine-neuronen <b>al bij de klik</b>, die de beloning aankondigt (en bij de appel zelf nauwelijks).",
    "Blijft de appel uit, dan is de uitkomst <b>slechter dan verwacht</b>: de activiteit van de dopamine-neuronen <b>zakt</b> (voorspellingsfout), waardoor de koppeling zwakker wordt."],
    model:"Na de training kondigt de klik de appel aan. De dopamine-neuronen vuren daarom al bij de klik, en bij de appel zelf nauwelijks nog, want die werd verwacht. Blijft de appel uit, dan is de uitkomst slechter dan verwacht: een negatieve voorspellingsfout. De activiteit van de dopamine-neuronen zakt dan, en de koppeling tussen klik en appel wordt zwakker.",
    valkuil:"‘Er komt minder dopamine omdat hij verdrietig is’ gebruikt het begrip voorspellingsfout niet: het gaat om het verschil tussen verwachting en uitkomst.",
    after:()=>waaromBtn(ans,textBox("Dopamine-neuronen reageren op het <b>verschil</b> tussen verwachting en uitkomst. Onverwacht een appel: veel activiteit. Klik geleerd: de activiteit verschuift naar de klik, want daar zit nu het ‘nieuws’. Klik zonder appel: slechter dan verwacht, de activiteit zakt onder het gewone niveau. Zo wordt de koppeling zwakker: uitdoving."))});
  q.append(think,ans);
},STOF_DA));
}

opgave("Clickertraining","Clickertraining bij de neushoorn",`
<p>In dierentuinen leren verzorgers dieren mee te werken aan een medische controle, zoals bloedprikken, zonder verdoving. Verzorgster Sanne traint neushoorn Bao met een clicker: een klein apparaatje dat een kort klikgeluid maakt.</p>
<p><b>Fase 1</b>: Sanne laat steeds een klik horen, vlak voordat ze Bao een stuk appel geeft. Na een paar dagen spitst Bao zijn oren en loopt hij naar haar toe zodra hij de klik hoort.</p>
<p><b>Fase 2</b>: Sanne klikt alleen nog als Bao zijn voorpoot op een plank zet, en geeft dan een stuk appel. Bao zet zijn poot steeds vaker op de plank. Op de plank kan de dierenarts later bloed prikken.</p>`,ids);
}
