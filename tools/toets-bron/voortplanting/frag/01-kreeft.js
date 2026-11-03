/* ===== Opgave 1: Alleen maar moeders: de marmerkreeft (eigen vragen A1–A4 uit toetsen-biologie; vwo + 1 nieuwe vraag) ===== */
{
const STOF_DELING={titel:"Mitose en meiose",html:`
<p>Bij de <b>mitose</b> wordt eerst in de interfase het DNA gekopieerd. Daarna gaan de twee chromatiden van elk chromosoom uit elkaar, naar de twee polen. Elke dochtercel krijgt zo evenveel chromosomen als de moedercel, met precies hetzelfde DNA.</p>
<p>Bij de <b>meiose</b> zijn er twee delingen na één keer kopiëren. In meiose I liggen de homologe chromosomen als paren tegen elkaar; ze wisselen stukken uit (<b>crossing-over</b>) en de paren gaan uit elkaar. In meiose II gaan de chromatiden uit elkaar. Zo ontstaan <b>haploïde</b> cellen (n), die bijna allemaal een andere combinatie van chromosomen hebben.</p>
<p>Bij <b>ongeslachtelijke voortplanting</b> ontstaan nakomelingen uit één ouder, zonder bevruchting, door mitose: het zijn klonen. Bij <b>geslachtelijke voortplanting</b> versmelten twee haploïde geslachtscellen tot een diploïde zygote.</p>`,
films:[F.cel]};
const q1=vraag(1,"chromosomen in een eicel",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Hoeveel chromosomen bevat de kern van een eicel van een marmerkreeft?"));
  choiceStep(think,{q:"Door welke deling ontstaan de eicellen van een marmerkreeft?",opts:["door meiose, zoals bij alle eicellen","door mitose"],right:1,
    ok:"Ja, dat staat in de inleiding. Wat doet die deling met het aantal chromosomen?",no:"Lees de inleiding nog eens: hoe deelt de kern van de voorlopercel?",
    onDone:()=>choiceStep(think,{q:"Wat gebeurt er bij een mitose met het aantal chromosomen?",opts:["het wordt gehalveerd","het blijft gelijk","het wordt verdubbeld"],right:1,
      ok:"Goed. Hoeveel chromosomen had de voorlopercel ook alweer?",no:"Bij de mitose krijgt elke dochtercel van elk chromosoom één chromatide. Is dat er minder dan in de moedercel?",onDone:unlock})});
  mc(ans,{qid:id,pts:1,right:3,opts:["92","138","184","276"],onChecked:()=>waaromBtn(ans,textBox(
    "De eicel ontstaat door mitose uit een lichaamscel met 276 chromosomen, dus de eicel heeft er ook <b>276</b>. Wie 92 kiest, denkt dat een eicel altijd één set krijgt; wie 138 kiest, halveert omdat een eicel ‘de helft’ heeft. Dat geldt alleen na een meiose. 184 is het aantal van de verwante soort. Het antwoord is <b>D</b>."))});
  q.append(think,ans);
},STOF_DELING);

const q2=vraag(2,"genetisch gelijk aan de moeder",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Leg uit dat de nakomelingen van een marmerkreeft genetisch gelijk zijn aan hun moeder."));
  choiceStep(think,{q:"Bij welke deling kan een nieuwe combinatie van chromosomen ontstaan, bijvoorbeeld door crossing-over?",opts:["bij de mitose","bij de meiose"],right:1,
    ok:"Ja. En welke deling maakt de eicel van de marmerkreeft?",no:"Bij welke deling liggen homologe chromosomen als paren tegen elkaar?",
    onDone:()=>choiceStep(think,{q:"Komt er bij een jonge marmerkreeft DNA van een tweede ouder bij?",opts:["ja, bij de bevruchting","nee, er is geen bevruchting"],right:1,
      ok:"Goed. Je hebt nu twee redenen: noem ze allebei.",no:"Er zijn geen mannetjes. Is er dan een zaadcel?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "De eicellen ontstaan door <b>mitose</b>: zonder crossing-over of nieuwe verdeling van chromosomen, dus met een precieze kopie van het DNA van de moeder.",
    "Er is <b>geen bevruchting</b>, dus er komt geen DNA van een tweede ouder bij."],
    model:"De eicel ontstaat door mitose. Daarbij wordt het DNA precies gekopieerd en er is geen crossing-over, dus de eicel heeft hetzelfde DNA als de moeder. De eicel wordt niet bevrucht, dus er komt ook geen DNA van een vader bij.",
    valkuil:"Alleen ‘het is ongeslachtelijke voortplanting, dus het is een kloon’ is geen uitleg: 0 punten. Noem wát er gebeurt (mitose) en wat er níet gebeurt (bevruchting)."});
  q.append(think,ans);
},STOF_DELING);

const q3=vraag(2,"juist of onjuist: kreeften en mutaties",(q,id)=>{
  pre(q,"<p>Over de marmerkreeft worden drie uitspraken gedaan:</p>");
  q.append(el("p",{class:"qtext"},"1 Bij de vorming van eicellen van de marmerkreeft vindt crossing-over plaats.<br>2 Verschillen in de DNA-volgorde tussen marmerkreeften kunnen alleen door mutaties ontstaan.<br>3 Een jonge marmerkreeft ontwikkelt zich uit een eicel door mitose en celdifferentiatie.<br><br><b>Geef bij elke uitspraak aan of hij juist of onjuist is.</b>"));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  chipsStep(think,{q:"Welke bronnen van genetische variatie horen bij <b>geslachtelijke</b> voortplanting? Kies alles wat klopt.",items:[["crossing-over in meiose I",1],["toevallige verdeling van de chromosoomparen",1],["bevruchting: DNA van twee ouders",1],["mutaties",0]],
    ok:"Goed. Mutaties komen bij elke celdeling voor, ook bij mitose. Welke van deze bronnen heeft de marmerkreeft dan nog?",no:"Eén keuze hoort niet bij geslachtelijke voortplanting alleen: die kan bij elke celdeling gebeuren.",onDone:unlock});
  juistOnjuist(ans,{id,stm:["crossing-over bij de vorming van eicellen","verschillen in DNA alleen door mutaties","ontwikkeling door mitose en celdifferentiatie"],key:[false,true,true],
    uitleg:textBox("1 <b>onjuist</b>: crossing-over hoort bij meiose I, en de eicellen van de marmerkreeft ontstaan door mitose.<br>2 <b>juist</b>: zonder meiose en bevruchting blijft alleen een mutatie over als bron van nieuwe verschillen in het DNA.<br>3 <b>juist</b>: ook zonder bevruchting groeit het embryo door mitose, en de cellen specialiseren zich (differentiatie).")});
  q.append(think,ans);
},STOF_DELING);

const STOF_POP={titel:"Ongeslachtelijk of geslachtelijk",html:`
<p><b>Ongeslachtelijke voortplanting</b> gaat snel en er is geen partner nodig. Alle nakomelingen zijn gelijk aan de ouder. Komt er een nieuwe ziekte, dan kunnen ze allemaal tegelijk sterven.</p>
<p><b>Geslachtelijke voortplanting</b> gaat trager. Maar de nakomelingen verschillen van elkaar, dus de kans is groter dat sommige overleven als de omgeving verandert. Bij soorten met mannetjes en vrouwtjes leggen alleen de vrouwtjes eieren of krijgen alleen zij jongen.</p>`,
films:[F.cel]};
const q4=vraag(2,"snelle groei van de populatie",(q,id)=>{
  pre(q,"<p>Stel dat een vrouwtje van een rivierkreeftensoort die zich geslachtelijk voortplant evenveel eieren legt als een marmerkreeft, en dat bij beide soorten evenveel jongen overleven.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit dat een populatie marmerkreeften na een paar generaties toch veel groter is dan een populatie van de andere soort die met evenveel dieren begon."));
  choiceStep(think,{q:"Welk deel van de jongen van een marmerkreeft legt later zelf eieren?",opts:["allemaal","ongeveer de helft","geen enkel"],right:0,
    ok:"Ja: er zijn alleen vrouwtjes. En bij de andere soort?",no:"Van de marmerkreeft zijn alleen vrouwtjes bekend.",
    onDone:()=>choiceStep(think,{q:"Welk deel van de jongen van de geslachtelijke soort legt later zelf eieren?",opts:["allemaal","ongeveer de helft: de vrouwtjes","alleen de mannetjes"],right:1,
      ok:"Goed. Wat betekent dat voor het aantal eieren in de volgende generatie?",no:"Ongeveer de helft van de jongen is mannetje. Leggen mannetjes eieren?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Bij de marmerkreeft zijn <b>alle</b> nakomelingen vrouwtjes die zelf eieren leggen.",
    "Bij de geslachtelijke soort is ongeveer de <b>helft mannetje</b> en legt zelf geen eieren, dus het aantal eierleggende dieren groeit per generatie minder snel."],
    model:"Elke jonge marmerkreeft is een vrouwtje dat zelf weer eieren legt. Bij de andere soort is ongeveer de helft van de jongen mannetje; die leggen geen eieren. Bij de marmerkreeft komen er dus per generatie ongeveer twee keer zoveel eierleggers bij, en dat verschil wordt elke generatie groter.",
    valkuil:"‘Marmerkreeften hoeven geen partner te zoeken’ levert 0 punten op: de aanname in de tekst sluit dat juist uit. Het gaat om de mannetjes die geen eieren leggen."});
  q.append(think,ans);
},STOF_POP);

const ids=[q1,q2,q3,q4];
if(VWO){
const STOF_ND={titel:"Als de meiose misgaat",html:`
<p>Soms gaan de twee chromosomen van een paar, of twee chromatiden, bij de meiose niet uit elkaar. Dat heet <b>non-disjunctie</b>. De ene geslachtscel krijgt dan een chromosoom te veel, de andere een te weinig.</p>
<p>Bij de bevruchting tellen de chromosomen van de twee geslachtscellen op: n + n = 2n. Krijgt een geslachtscel een chromosoom te veel, dan heeft de zygote er ook één te veel (bijvoorbeeld trisomie 21).</p>`,
films:[F.cel]};
ids.push(vraag(2,"hoe ontstaat een triploïde kreeft?",(q,id)=>{
  pre(q,"<p>De marmerkreeft is ontstaan uit <i>P. fallax</i> (2n = 184). Stel dat bij één bevruchting tussen twee <i>P. fallax</i>-kreeften bij één van de ouders de meiose misging.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit hoe zo een kreeft met 276 chromosomen kan ontstaan. Noem in je uitleg het aantal chromosomen in beide geslachtscellen."));
  numStep(think,{uid:"q"+id+"n1",q:"Hoeveel chromosomen heeft een normale geslachtscel van <i>P. fallax</i>?",right:92,ok:"Ja: n = 92. Hoeveel moet de andere geslachtscel dan meebrengen om op 276 te komen?",no:"Een geslachtscel is haploïd: de helft van 2n = 184.",
    onDone:()=>numStep(think,{uid:"q"+id+"n2",q:"Hoeveel chromosomen heeft de andere geslachtscel?",right:184,ok:"Goed: 92 + 184 = 276. Wat moet er in de meiose misgegaan zijn om 184 chromosomen in één geslachtscel te krijgen?",no:"276 − 92 = ?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "De ene geslachtscel is normaal (haploïd) en heeft <b>92</b> chromosomen.",
    "De andere geslachtscel heeft <b>184</b> chromosomen, doordat bij de meiose de chromosomen (paren of chromatiden) niet uit elkaar gingen (non-disjunctie van alle chromosomen / geen halvering); 92 + 184 = 276."],
    model:"Een normale geslachtscel van P. fallax heeft 92 chromosomen. Bij de andere ouder gingen bij de meiose de chromosomen niet uit elkaar, waardoor die geslachtscel alle 184 chromosomen kreeg. Bij de bevruchting komen 92 + 184 = 276 chromosomen samen: drie sets.",
    valkuil:"‘De kreeft kreeg van elke ouder 138 chromosomen’: dan zijn beide geslachtscellen afwijkend én passen ze niet bij hele sets van 92. Of: ‘er is een chromosoom te veel’ (één chromosoom geeft 185, geen 276)."});
  q.append(think,ans);
},STOF_ND));
}

opgave("Marmerkreeft","Alleen maar moeders: de marmerkreeft",`
<p>In 1995 dook in de Duitse aquariumhandel een onbekende rivierkreeft op: de marmerkreeft. Hij is ontstaan uit de Noord-Amerikaanse rivierkreeft <i>Procambarus fallax</i>, maar komt in de natuur in Amerika niet voor.</p>
<p>Van de marmerkreeft zijn alleen vrouwtjes bekend; mannetjes zijn nooit gevonden. Een marmerkreeft legt eieren die zich zonder bevruchting ontwikkelen tot jonge kreeftjes. De eicellen ontstaan niet door meiose: de kern van de voorlopercel deelt door een gewone mitose.</p>
<p>De marmerkreeft is triploïd: haar lichaamscellen bevatten drie sets van 92 chromosomen, samen 276 chromosomen. De verwante soort <i>P. fallax</i> is diploïd (2n = 184).</p>
<p>Doordat aquariumhouders dieren loslieten, leven er nu populaties in verschillende Europese landen. In Nederland werd de marmerkreeft gevonden bij Dordrecht (2004) en Middelburg (2014–2015). Op Madagaskar werd het gebied waar de marmerkreeft voorkomt tussen 2007 en 2017 ongeveer honderd keer zo groot. DNA-onderzoek liet zien dat de marmerkreeften op Madagaskar genetisch vrijwel gelijk zijn aan de aquariumdieren uit 1995.</p>`,ids);
}
