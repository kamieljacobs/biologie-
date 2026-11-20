/* ===== Opgave 8–11: Emotieregulatie, Hechting, Wiens schuld is het?, Beroemde psychologie-experimenten
   (EI-gedrag-KE04, KD02, KF02, KL02; losse vragen zonder inleiding) ===== */
{
const STOF_EMO={titel:"Emoties in je hersenen",html:`
<p>In je hersenen werken twee delen samen. De <b>amygdala</b>, diep in je hersenen, reageert razendsnel op wat belangrijk voor je is: een snel alarm. De <b>prefrontale cortex</b>, achter je voorhoofd, is trager. Die weegt af, en kan het alarm bijsturen of afremmen.</p>
<p>Een emotie ontstaat in stappen: een <b>situatie</b>, waar je <b>aandacht</b> naartoe gaat, welke <b>betekenis</b> je eraan geeft, en hoe je <b>reageert</b>. Bij elke stap kun je bijsturen. De situatie anders bekijken heet <b>herwaarderen</b>.</p>
<p>Hoe goed een strategie werkt, onderzoeken psychologen met proeven: ze vergelijken groepen die een andere strategie gebruiken.</p>`,
films:[F.emo]};
const e1=vraag(2,"juist of onjuist: emoties",(q,id)=>{
  const {think,ans,unlock}=uitspraken(q,"Over emoties en emotieregulatie worden vijf uitspraken gedaan:",[
    "Emoties maken je lichaam snel klaar om te handelen en laten anderen zien hoe je je voelt.",
    "Wie een emotie onderdrukt, laat minder zien en zijn lichaam reageert ook minder.",
    "Een gevoel in woorden benoemen kan de reactie van de amygdala minder fel maken.",
    "Volgens de film is één strategie altijd de beste.",
    "In een grote proef hielp langzaam ademen niet beter tegen stress dan bewust ademen in een gewoon tempo."]);
  selectsStep(think,{uid:"q"+id,q:"Bij welke stap van een emotie stuur je bij?",rows:[
    ["even weg van het scherm",["situatie","aandacht","betekenis","reactie"],0],
    ["ergens anders naar kijken",["situatie","aandacht","betekenis","reactie"],1],
    ["het anders bekijken (herwaarderen)",["situatie","aandacht","betekenis","reactie"],2],
    ["niets laten merken (onderdrukken)",["situatie","aandacht","betekenis","reactie"],3]],
    ok:"Goed. Bekijk nu elke uitspraak. Staan er twee beweringen in één uitspraak, dan moeten ze allebei kloppen.",no:"Kijk naar de volgorde: situatie → aandacht → betekenis → reactie.",onDone:unlock});
  juistOnjuist(ans,{id,stm:["emoties maken je klaar en laten zien hoe je je voelt","onderdrukken: minder laten zien én lichaam reageert minder","benoemen maakt de amygdala minder fel","één strategie is altijd de beste","langzaam ademen niet beter dan gewoon tempo"],key:[true,false,true,false,true],
    uitleg:textBox("1 <b>juist</b>.<br>2 <b>onjuist</b>: wie onderdrukte liet minder zien, maar het lichaam reageerde juist sterker, en de walging bleef even groot.<br>3 <b>juist</b>: de amygdala reageerde minder fel, de prefrontale cortex werd actiever.<br>4 <b>onjuist</b>: soms is weglopen of even niets laten merken goed; het gaat erom dat je kunt kiezen.<br>5 <b>juist</b>: bij beide groepen daalde de stress ongeveer evenveel.<br>Alles goed: 2 punten, één fout: 1 punt.")});
  q.append(think,ans);
},STOF_EMO);
opgave("Emoties","Emotieregulatie","",[e1]);

const STOF_HE={titel:"Wat is hechting?",html:`
<p><b>Hechting</b> is de emotionele band tussen een kind en een vaste verzorger. Een baby wordt geboren met gedrag dat die band uitlokt: huilen, lachen, vastgrijpen.</p>
<p>John Bowlby keek naar de functie, net als Tinbergen: een kind dat dicht bij een verzorger blijft, is beter beschermd tegen gevaar. Dat lijkt op inprenting bij gansjes, maar hechting groeit langzamer, in de eerste jaren, en een kind kan zich aan meerdere mensen hechten.</p>
<p>Gaat hechting eigenlijk om eten? Dat wilde de onderzoeker Harry Harlow testen met jonge rhesusaapjes.</p>`,
films:[F.hecht]};
const h1=vraag(2,"de proef van Harlow",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Beschrijf de proef van Harlow met jonge rhesusaapjes en leg uit wat die liet zien over hechting."));
  choiceStep(think,{q:"Welke vraag wilde Harlow met zijn proef beantwoorden?",opts:["Gaat hechting om eten?","Kunnen apen rekenen?","Zijn apen bang voor ijzerdraad?"],right:0,
    ok:"Ja. Hoe moeten de twee nepmoeders van elkaar verschillen om dat te kunnen testen?",no:"Harlow was benieuwd waarom een jong zich aan zijn moeder hecht.",
    onDone:()=>choiceStep(think,{q:"Stel dat hechting wél om eten gaat. Naar welke nepmoeder rent een bang aapje dan?",opts:["naar de nepmoeder die melk geeft","naar de nepmoeder die het prettigst aanvoelt","naar geen van beide"],right:0,
      ok:"Dat is de voorspelling. Beschrijf nu de twee nepmoeders en wat de aapjes in de film echt deden, en leg uit wat dat zegt over hechting.",no:"Als het om eten gaat, is de melk het belangrijkste.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Aapjes zonder moeder kregen een <b>nepmoeder van ijzerdraad met melk</b> en een <b>zachte nepmoeder zonder melk</b>; ze dronken bij de draadmoeder maar <b>zaten urenlang bij de zachte moeder</b> en renden daarheen als ze bang waren.",
    "<b>Contact en troost</b> zijn belangrijker dan voedsel (hechting gaat niet om eten)."],
    model:"Harlow liet jonge rhesusaapjes opgroeien zonder hun moeder. In de kooi stonden twee nepmoeders: een van ijzerdraad met een fles melk, en een van zachte stof zonder melk. De aapjes dronken snel bij de draadmoeder, maar klampten zich daarna urenlang vast aan de zachte moeder. Werden ze bang, dan renden ze naar de zachte moeder. De proef liet zien dat contact en troost belangrijker zijn dan voedsel: hechting gaat niet om eten.",
    after:()=>waaromBtn(ans,textBox("Als hechting om eten ging, zouden de aapjes bij de draadmoeder met melk blijven. Ze kozen juist de zachte moeder, vooral als ze bang waren: daar kalmeerden ze, en daarna durfden ze de kooi te verkennen. Een verzorger is een <b>veilige haven</b> als je bang bent, en een <b>veilige basis</b> om de wereld te ontdekken. Zulke proeven worden nu om ethische redenen niet meer toegestaan."))});
  q.append(think,ans);
},STOF_HE);
opgave("Hechting","Hechting","",[h1]);

const STOF_AT={titel:"Attributie",html:`
<p>Zoeken naar de oorzaak van wat er gebeurt, heet <b>attributie</b>. Er zijn twee soorten verklaringen:</p>
<ul style="margin:0;padding-left:20px"><li><b>intern</b>: de oorzaak ligt bij de persoon, zoals aanleg, inzet of karakter;</li>
<li><b>extern</b>: de oorzaak ligt in de situatie, zoals een moeilijke toets, lawaai of pech.</li></ul>
<p>Bernard Weiner voegde twee vragen toe: is de oorzaak blijvend of tijdelijk, en kun je er zelf iets aan doen (beheersbaar)?</p>
<p>Mensen maken bij het toeschrijven vaak vaste denkfouten. Let er bij elke situatie op <b>over wie</b> het gaat: over jezelf of over een ander.</p>`,
films:[F.attr]};
const t1=vraag(2,"welke denkfout?",(q,id)=>{
  q.append(el("p",{class:"qtext"},"Welke denkfout zie je: de zelfdienende vertekening (A) of de fundamentele attributiefout (B)? Een letter mag vaker voorkomen.<br><br>1 Na een overwinning: ‘We waren gewoon beter.’ Na een nederlaag: ‘De scheidsrechter floot slecht.’<br>2 Een nieuwe klasgenoot zegt weinig; jij denkt meteen dat ze arrogant is.<br>3 Lezers denken dat iemand die een opgelegd opstel schreef, het toch een beetje eens is met wat hij moest schrijven.<br>4 Na een 9: ‘Ik ben er goed in.’ Na een 4: ‘De vragen waren raar.’<br><br>A zelfdienende vertekening<br>B fundamentele attributiefout"));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  selectsStep(think,{uid:"q"+id,q:"Oefen eerst: is de verklaring intern of extern?",rows:[
    ["‘Ik had goed geleerd.’",["intern","extern"],0],["‘Het was te lawaaiig in het lokaal.’",["intern","extern"],1],["‘Hij is gewoon lui.’",["intern","extern"],0]],
    ok:"Goed. Kijk nu bij elke situatie: gaat het over jezelf (bij succes en bij falen), of over een ander?",no:"Intern = bij de persoon (inzet, karakter); extern = in de situatie.",onDone:unlock});
  const S=["A zelfdienende vertekening","B fundamentele attributiefout"];
  selectAnswer(ans,{id,uid:"q"+id,rows:[["1 overwinning en nederlaag",S,0],["2 de stille klasgenoot",S,1],["3 het opgelegde opstel",S,1],["4 een 9 en een 4",S,0]],score:n=>n===4?2:n===3?1:0,
    after:()=>waaromBtn(ans,textBox("1 en 4: <b>A</b>. Over jezelf: bij succes een interne verklaring (‘wij’, ‘ik’), bij falen een externe (scheidsrechter, vragen). Zo blijf je je goed voelen over jezelf.<br>2 en 3: <b>B</b>. Over een ander: je onderschat de situatie (nieuw in de klas, een opgelegd standpunt) en overschat het karakter. Dat is de fundamentele attributiefout; zin 3 is de proef van Jones en Harris uit de film.<br>Alles goed: 2 punten, één fout: 1 punt."))});
  q.append(think,ans);
},STOF_AT);
opgave("Attributie","Wiens schuld is het?","",[t1]);

const STOF_EX={titel:"Beroemd is niet bewezen",html:`
<p>Een bekend experiment laat iets echts zien, maar één proef is nog geen bewezen waarheid. Pas als onderzoek vaak genoeg is herhaald, weet je hoe sterk een effect is. Toen honderden onderzoekers in het jaar 2015 honderd psychologische studies probeerden te herhalen, gaf slechts ruim een derde opnieuw een duidelijk resultaat: de <b>replicatiecrisis</b>.</p>
<p>Daarom leggen onderzoekers nu vaker vooraf vast wat ze gaan meten en hoe ze het analyseren: <b>preregistratie</b>.</p>
<p>Bij uitspraken over experimenten helpt het om te letten op woorden als ‘iedereen’, ‘niemand’ en ‘altijd’: kloppen die met wat er gemeten is?</p>`,
films:[F.exp]};
const x1=vraag(2,"juist of onjuist: beroemde experimenten",(q,id)=>{
  const {think,ans,unlock}=uitspraken(q,"Over beroemde psychologie-experimenten worden vijf uitspraken gedaan:",[
    "In het experiment van Asch ging bijna iedereen wel eens mee met de groep, maar niemand deed het altijd.",
    "In de proef van Milgram kregen de ‘leerlingen’ echte schokken.",
    "Hoeveel mensen gehoorzamen aan iemand met gezag, hangt sterk af van de situatie.",
    "Volgens de regels voor onderzoek met mensen mag een proefpersoon altijd stoppen.",
    "Kinderen die bij de marshmallowtest kort wachten, hebben volgens de film altijd weinig zelfbeheersing."]);
  choiceStep(think,{q:"Wat betekent <b>conformisme</b>?",opts:["gehoorzamen aan iemand met gezag","je gedrag aanpassen aan de groep","je eigen mening vasthouden"],right:1,
    ok:"Ja. Dat onderzocht Asch; gehoorzamen aan gezag onderzocht Milgram.",no:"Bij Asch zeiden zes anderen hardop een fout antwoord. Wat deden de proefpersonen dan?",
    onDone:()=>choiceStep(think,{q:"Bij Asch gaf soms één andere deelnemer wél het goede antwoord. Wat gebeurde er dan?",opts:["de proefpersoon ging nog vaker mee met de groep","de proefpersoon ging nog maar zelden mee met de groep","er veranderde niets"],right:1,
      ok:"Goed: de situatie maakt veel uit. Bekijk nu elke uitspraak, en let op woorden als ‘altijd’ en ‘niemand’.",no:"Je staat dan niet meer alleen. Wordt de druk groter of kleiner?",onDone:unlock})});
  juistOnjuist(ans,{id,stm:["Asch: bijna iedereen wel eens, niemand altijd","Milgram: echte schokken","gehoorzamen hangt sterk af van de situatie","een proefpersoon mag altijd stoppen","kort wachten = altijd weinig zelfbeheersing"],key:[true,false,true,true,false],
    uitleg:textBox("1 <b>juist</b>: driekwart ging minstens één keer mee, niemand deed het altijd.<br>2 <b>onjuist</b>: de leerling was een acteur.<br>3 <b>juist</b>: per telefoon ging maar één op de vijf door tot het einde.<br>4 <b>juist</b>: dat is nu een vaste regel, net als vooraf toestemming en achteraf uitleg.<br>5 <b>onjuist</b>: na een gebroken belofte is niet wachten een verstandige keuze.<br>Alles goed: 2 punten, één fout: 1 punt.")});
  q.append(think,ans);
},STOF_EX);
opgave("Experimenten","Beroemde psychologie-experimenten","",[x1]);
}
