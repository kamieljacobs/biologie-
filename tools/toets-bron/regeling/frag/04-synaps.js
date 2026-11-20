/* ===== Opgave 6 Moeie spieren (EI-regeling-B06, B08, B09, B10) en opgave 7 De hersenen (KI03) ===== */
{
const STOF_SYN={titel:"De synaps tussen zenuw en spier",html:`
<p>Komt een impuls aan het uiteinde van een motorische zenuwcel, dan laten blaasjes de neurotransmitter <b>acetylcholine</b> los in de <b>synapsspleet</b>. Acetylcholine bindt aan <b>receptoren</b> op de spiervezel. Zijn er genoeg receptoren bezet, dan komt de spiervezel boven de drempelwaarde en trekt hij samen.</p>
<p>Daarna moet de spleet weer leeg: het enzym <b>acetylcholinesterase</b> breekt acetylcholine af.</p>
<p>Een spier bestaat uit veel spiervezels. Hoe sterk een spier samentrekt, hangt af van hoeveel vezels er meedoen.</p>`,
films:[F.spleet,F.knoei]};

/* staafjes: binding van acetylcholine per spiervezel bij prikkel 1 en prikkel 5, met drempel */
function DREMPEL(st){
  const W={g1:[90,84,96,80,88],g5:[76,70,82,68,74],j1:[66,61,72,59,63],j5:[54,48,60,46,52]};
  const D=58,ys=v=>230-v*1.9;let s="";
  const groep=(x0,arr,titel)=>{let r=`<text x="${x0+70}" y="258" text-anchor="middle" class="lbl">${titel}</text>`;
    arr.forEach((v,k)=>{const x=x0+k*30,on=v>=D;r+=`<rect x="${x}" y="${ys(v)}" width="22" height="${230-ys(v)}" rx="3" fill="${on?"var(--groen)":"var(--koraal)"}" opacity="${on?.8:.55}"/>`;});
    const nn=arr.filter(v=>v>=D).length;r+=`<text x="${x0+70}" y="278" text-anchor="middle" class="lblm">${nn} van de 5 vezels ${nn===1?"trekt":"trekken"} samen</text>`;return r;};
  const zet=st===0?[["g1","gezond, prikkel 1"],["j1","Jeroen, prikkel 1"]]:[["g5","gezond, prikkel 5"],["j5","Jeroen, prikkel 5"]];
  s+=groep(60,W[zet[0][0]],zet[0][1])+groep(290,W[zet[1][0]],zet[1][1]);
  s+=`<path d="M40,${ys(D)} H490" stroke="var(--goud)" stroke-width="2" stroke-dasharray="7 5"/><text x="490" y="${ys(D)-6}" text-anchor="end" class="lbl" style="fill:var(--goud-text)">drempelwaarde</text>`;
  s+=`<path d="M40,230 H490" stroke="var(--text2)"/><text x="18" y="130" text-anchor="middle" class="lblm" transform="rotate(-90 18 130)">prikkeling per spiervezel</text>`;
  return FIG(360,520,"0 0 500 290",s,"Prikkeling van vijf spiervezels ten opzichte van de drempelwaarde");}

const b6=vraag(2,"de spierrespons neemt af",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Leg uit waardoor de spierrespons bij Jeroen bij herhaalde prikkels afneemt, terwijl die bij de gezonde proefpersoon gelijk blijft."));
  choiceStep(think,{q:"Wat heeft Jeroen minder dan de gezonde proefpersoon?",opts:["werkzame acetylcholinereceptoren","acetylcholine","spiervezels"],right:0,
    ok:"Ja, dat staat in de inleiding.",no:"Lees de eerste alinea van de inleiding nog eens: waar maakt het afweersysteem antistoffen tegen?",
    onDone:()=>choiceStep(think,{q:"Wat verandert er volgens de inleiding bij snel herhaalde impulsen, ook bij gezonde mensen?",opts:["er komt per impuls iets minder acetylcholine vrij","er komen meer receptoren bij","de spiervezels worden moe"],right:0,
      ok:"Goed. Bedenk nu wat een spiervezel nodig heeft om samen te trekken, en waarom dat bij Jeroen na een paar prikkels niet meer bij alle vezels lukt.",no:"De laatste zin van de tweede alinea gaat hierover.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Bij Jeroen bindt (door het kleinere aantal receptoren) <b>minder acetylcholine</b> aan de spiervezels / ontstaat er minder depolarisatie dan bij een gezond persoon.",
    "Als bij herhaalde impulsen ook minder acetylcholine vrijkomt, wordt bij een deel van de spiervezels de <b>drempelwaarde</b> niet meer bereikt, zodat minder vezels samentrekken; bij de gezonde persoon is er genoeg om de drempel toch te halen."],
    model:"Jeroen heeft minder werkzame receptoren, dus er bindt minder acetylcholine aan zijn spiervezels en ze worden minder sterk geprikkeld. Bij de eerste prikkel is dat nog genoeg. Bij herhaalde prikkels komt er per impuls minder acetylcholine vrij: dan haalt een deel van zijn spiervezels de drempelwaarde niet meer en trekken er minder vezels samen. Een gezond persoon heeft zoveel receptoren dat de drempel ook dan nog gehaald wordt.",
    valkuil:"‘De spieren van Jeroen raken sneller vermoeid’ zonder de synaps: 0 punten. Het gaat niet om energie in de spier, maar om de overdracht in de synaps.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Prikkel 1: bij de gezonde persoon én bij Jeroen halen alle vezels de drempel, al komt Jeroen minder ver boven de drempel uit.",st:0},
      {cap:"Prikkel 5: er komt minder acetylcholine vrij. Bij de gezonde persoon nog steeds genoeg; bij Jeroen haalt een deel van de vezels de drempel niet meer.",st:1}],
      (stg,s)=>stg.innerHTML=DREMPEL(s.st)))});
  q.append(think,ans);
},STOF_SYN);

const b8=vraag(2,"hoe helpt pyridostigmine?",(q,id)=>{
  pre(q,"<p>Jeroen krijgt het geneesmiddel pyridostigmine. Pyridostigmine remt het enzym acetylcholinesterase.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit hoe pyridostigmine ervoor zorgt dat de spieren van Jeroen minder snel verzwakken. Gebruik in je antwoord de begrippen synapsspleet en receptoren."));
  choiceStep(think,{q:"Wat doet het enzym acetylcholinesterase normaal?",opts:["het breekt acetylcholine in de synapsspleet af","het maakt nieuwe acetylcholine","het bouwt nieuwe receptoren"],right:0,
    ok:"Ja. Wat gebeurt er dan als dit enzym geremd wordt?",no:"De uitgang ‘-ase’ zegt dat het een enzym is. Wat doet het met acetylcholine?",onDone:unlock});
  openAnswer(ans,{id,pts:2,checks:[
    "Acetylcholine in de <b>synapsspleet</b> wordt minder snel afgebroken, zodat het langer / in hogere concentratie aanwezig is.",
    "De acetylcholine bindt daardoor vaker/langer aan de overgebleven <b>receptoren</b>, zodat ook bij herhaalde impulsen meer spiervezels blijven samentrekken."],
    model:"Pyridostigmine remt acetylcholinesterase, dus acetylcholine wordt in de synapsspleet minder snel afgebroken en blijft er langer en in een hogere concentratie. Daardoor bindt het vaker en langer aan de receptoren die Jeroen nog heeft. Ook bij herhaalde impulsen halen dan meer spiervezels de drempel.",
    valkuil:"‘Pyridostigmine maakt nieuwe receptoren’ of ‘pyridostigmine remt de antistoffen’: 0 punten. Het medicijn verandert niets aan de oorzaak.",
    after:()=>waaromBtn(ans,textBox("Normaal ruimt acetylcholinesterase acetylcholine binnen een paar duizendste seconde op. Remt pyridostigmine dat enzym, dan blijft er meer acetylcholine langer in de synapsspleet. Elk molecuul krijgt zo vaker de kans om aan een van de weinige overgebleven receptoren te binden. Daardoor halen meer spiervezels de drempelwaarde, ook bij herhaalde impulsen. Aan het aantal receptoren verandert niets."))});
  q.append(think,ans);
},STOF_SYN);

const b9=vraag(2,"drie uitspraken over pyridostigmine",(q,id)=>{
  pre(q,"<p>Over de behandeling met pyridostigmine worden drie uitspraken gedaan:</p>");
  q.append(el("p",{class:"qtext"},"1 Pyridostigmine geneest de oorzaak van myasthenia gravis.<br>2 Bij een te hoge dosis pyridostigmine kunnen spiervezels blijven samentrekken, doordat acetylcholine in de spleet blijft.<br>3 Pyridostigmine helpt alleen zolang er nog werkzame acetylcholinereceptoren zijn.<br><br><b>Schrijf de nummers 1, 2 en 3 onder elkaar en noteer erachter of de uitspraak juist of onjuist is.</b>"));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  choiceStep(think,{q:"Wat is de oorzaak van myasthenia gravis?",opts:["antistoffen tegen de acetylcholinereceptoren","te veel acetylcholinesterase","te weinig acetylcholine"],right:0,
    ok:"Ja. Pakt pyridostigmine dát aan? Bekijk daarna uitspraak 2 en 3: wat gebeurt er met de spiervezel zolang acetylcholine aan de receptoren zit?",no:"Lees de eerste alinea van de inleiding nog eens.",onDone:unlock});
  juistOnjuist(ans,{id,stm:["geneest de oorzaak","te hoge dosis: vezels blijven samentrekken","helpt alleen met nog werkzame receptoren"],key:[false,true,true],
    uitleg:textBox("1 <b>onjuist</b>: de antistoffen tegen de receptoren blijven; pyridostigmine verlengt alleen de werking van acetylcholine.<br>2 <b>juist</b>: zolang de receptoren bezet zijn, blijft de spiervezel geprikkeld. Wordt acetylcholine nauwelijks nog afgebroken, dan blijft de spier samentrekken.<br>3 <b>juist</b>: acetylcholine moet nog ergens aan kunnen binden. Zonder werkzame receptoren helpt meer acetylcholine niet.")});
  q.append(think,ans);
},STOF_SYN);

const b10=vraag(1,"de ijszaktest",(q,id)=>{
  pre(q,"<p>Een eenvoudige test bij hangende oogleden is de ijszaktest. De arts legt twee minuten een zakje met ijs op het hangende ooglid. Bij myasthenia gravis gaat het ooglid daarna duidelijk verder open. Enzymen werken bij een lagere temperatuur langzamer. Onderzoekers vermoeden dat de kou op een vergelijkbare manier werkt als pyridostigmine.</p>");
  const {think,ans,unlock}=start(q,B("Geef een verklaring voor het effect van de ijszaktest."));
  choiceStep(think,{q:"Op welk enzym werkt pyridostigmine?",opts:["acetylcholinesterase","een enzym in de spiervezel dat energie levert","een enzym in de antistoffen"],right:0,
    ok:"Ja. Combineer dat met wat er in de inleiding staat over kou en enzymen.",no:"Kijk terug naar vraag "+(id-2)+".",onDone:unlock});
  openAnswer(ans,{id,pts:1,checks:[
    "Het enzym <b>acetylcholinesterase</b> werkt bij een lage temperatuur langzamer, zodat <b>acetylcholine</b> minder snel wordt afgebroken (en langer aan de receptoren kan binden)."],
    model:"Door de kou werkt acetylcholinesterase in de synapsen van het ooglid langzamer. Acetylcholine wordt dan minder snel afgebroken en kan langer aan de overgebleven receptoren binden, net als bij pyridostigmine. Daardoor trekken meer spiervezels samen en gaat het ooglid verder open.",
    valkuil:"‘Door de kou zwelt het ooglid minder op’ of ‘de kou remt de ontsteking’: 0 punten.",
    after:()=>waaromBtn(ans,textBox("De kou doet hetzelfde als pyridostigmine, maar op een andere manier: het medicijn remt acetylcholinesterase, de kou laat dit enzym langzamer werken. In beide gevallen blijft acetylcholine langer in de synapsspleet en kan het langer aan de overgebleven receptoren binden. Na twee minuten ijs halen meer spiervezels van de ooglidspier de drempel, dus gaat het ooglid verder open. Het effect is tijdelijk: als het ooglid weer opwarmt, werkt het enzym weer op volle snelheid."))});
  q.append(think,ans);
},STOF_SYN);

opgave("Moeie spieren","Moeie spieren",`
<p>Jeroen (34) merkt dat zijn oogleden aan het eind van de dag gaan hangen en dat hij dan dubbel ziet. Bij een lange maaltijd worden zijn kauwspieren moe. Na een nacht slapen is alles weer beter. De neuroloog stelt vast dat Jeroen myasthenia gravis heeft. Bij deze auto-immuunziekte maakt het afweersysteem antistoffen tegen de acetylcholinereceptoren in de synapsen tussen bewegingszenuwcellen en skeletspiervezels. Daardoor zijn er minder werkzame receptoren.</p>
<p>Om de diagnose te bevestigen geeft de neuroloog met een elektrode tien elektrische prikkels kort na elkaar op een zenuw naar een handspier en meet de spierrespons. De spierrespons is een maat voor het aantal spiervezels dat samentrekt. Bij de eerste prikkel was de spierrespons van Jeroen even groot als die van een gezonde proefpersoon. Bij snel herhaalde impulsen komt per impuls iets minder acetylcholine vrij dan bij de eerste impuls, ook bij gezonde mensen.</p>
${AFB(3,"fictieve gegevens, vereenvoudigd")}${GRAF_SPIER()}
<p class="muted" style="font-size:14px">Jeroen is een fictieve patiënt.</p>`,[b6,b8,b9,b10]);

/* ----- opgave 7: De hersenen (KI03) ----- */
const STOF_HERS={titel:"De hersenschors",html:`
<p>Elke hersenhelft heeft vier <b>kwabben</b>: de voorhoofdskwab, de wandbeenkwab, de slaapkwab en de achterhoofdskwab. Tussen de voorhoofdskwab en de wandbeenkwab loopt een diepe groeve, de centrale groeve.</p>
<p>In een <b>primair</b> schorsgebied komen de impulsen van één soort zintuig binnen, of beginnen de opdrachten voor de spieren. Een <b>associatief</b> gebied ernaast koppelt die informatie aan wat je al weet en geeft er betekenis aan.</p>
<p>Hoe groter een lichaamsdeel op de strook voor voelen of bewegen, hoe preciezer je het kunt gebruiken: het gaat om precisie, niet om grootte.</p>`,
films:[F.hoofd]};
const KWAB=["voorhoofdskwab","wandbeenkwab","slaapkwab","achterhoofdskwab"],TAAK=["bewegingsopdrachten beginnen","impulsen van de huid komen binnen (voelen)","plannen, kiezen, je inhouden","geluid herkennen"];
const k5=vraag(2,"gebieden in de hersenschors",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Neem de tabel over en vul bij elk gebied in waar het ligt (kwab) of wat het doet.")+`<div class="tablewrap" style="margin-top:8px"><table class="data"><tr><th>gebied</th><th>ligt in</th><th>taak</th></tr>
<tr><td>primaire schors voor zien</td><td>…</td><td>binnenkomen van impulsen van de ogen</td></tr>
<tr><td>strook voor bewegen</td><td>voorhoofdskwab</td><td>…</td></tr>
<tr><td>strook voor voelen</td><td>…</td><td>…</td></tr>
<tr><td>veel associatieve schors</td><td>voorhoofdskwab</td><td>…</td></tr></table></div>`);
  choiceStep(think,{q:"Je ziet een gezicht en herkent je vriend. Welk soort schors heb je nodig om te weten wie het is?",opts:["associatieve schors","primaire schors"],right:0,
    ok:"Ja. Bedenk per regel in de tabel: is dit een primair gebied (impulsen komen binnen of vertrekken) of een associatief gebied (betekenis geven)?",no:"In de primaire schors voor zien komen de impulsen van je ogen alleen binnen. Wie het is, weet je dan nog niet.",
    onDone:()=>numStep(think,{uid:"q"+id+"n",q:"Hoeveel kwabben heeft elke hersenhelft?",right:4,ok:"Goed. Elke kwab is genoemd naar het schedelbot erboven: denk na waar dat bot ligt.",no:"Elke kwab is genoemd naar het bot van je schedel erboven. Noem ze één voor één.",onDone:unlock})});
  selectAnswer(ans,{id,uid:"q"+id,intro:"Kies voor elk leeg vakje.",rows:[["zien · ligt in",KWAB,3],["bewegen · taak",TAAK,0],["voelen · ligt in",KWAB,1],["voelen · taak",TAAK,1],["associatieve schors · taak",TAAK,2]],
    score:n=>n===5?2:n===4?1:0,
    after:()=>waaromBtn(ans,textBox("De primaire schors voor zien ligt in de <b>achterhoofdskwab</b>. De strook voor bewegen (motorische schors) laat <b>bewegingsopdrachten beginnen</b>. Vlak daarachter, over de centrale groeve, ligt de strook voor voelen in de <b>wandbeenkwab</b>: daar komen de <b>impulsen van de huid</b> binnen. De voorhoofdskwab heeft veel associatieve schors: <b>plannen, kiezen en je inhouden</b>.<br>Alle vakjes goed: 2 punten, één fout: 1 punt."))});
  q.append(think,ans);
},STOF_HERS);
opgave("Hersenen","De hersenen",GEEN_INLEIDING,[k5]);
}
