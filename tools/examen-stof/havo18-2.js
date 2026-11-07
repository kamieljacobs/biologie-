/* Uitleg van de stof · oefenexamen havo 2018-II (tool havo18-2). Gekopieerd naar tools/examen-stof/havo18-2.js door samenvoegen.py. */
(function(){
"use strict";
if(!window.EXSTOF)return;
const E=window.EXSTOF,T="havo18-2";
const F={hor2:["Suiker in balans","films/hormonen/2-suiker-in-balans.html"],hor1:["Post voor iedereen","films/hormonen/1-post-voor-iedereen.html"],
  pomp:["Eén pomp, twee rondjes","films/transport/1-een-pomp-twee-rondjes.html"],bloed:["Wat er in je bloed zit","films/transport/3-wat-er-in-je-bloed-zit.html"],
  voed2:["De reis door je buik","films/voeding/2-de-reis-door-je-buik.html"],voed3:["Knippen op maat","films/voeding/3-knippen-op-maat.html"],voed1:["Wat zit er in je eten?","films/voeding/1-wat-zit-er-in-je-eten.html"],
  lever:["De lever als fabriek","films/voeding/5-de-lever-als-fabriek.html"],darm4:["Van darm naar bloed","films/voeding/4-van-darm-naar-bloed.html"],voed6:["Je darmbewoners","films/voeding/6-je-darmbewoners.html"],
  gas3:["Uitscheiding en evenwicht","films/gaswisseling/3-uitscheiding-en-evenwicht.html"],adem2:["Alles op adem","films/stofwisseling/2-alles-op-adem.html"],
  evo1:["Wat is evolutie eigenlijk?","films/evolutie/1-wat-is-evolutie.html"],evo2:["Natuurlijke selectie","films/evolutie/2-natuurlijke-selectie.html"],evo5:["Toeval en uitwisseling","films/evolutie/5-toeval-en-uitwisseling.html"],evo8:["Stambomen lezen","films/evolutie/8-stambomen-lezen.html"],evo4:["De mens als selectiefactor","films/evolutie/4-de-mens-als-selectiefactor.html"],
  dna3:["Van DNA naar eiwit","films/dna/3-van-dna-naar-eiwit.html"],dna5:["Mutaties","films/dna/5-mutaties.html"],dna6:["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"],dna8:["Wat heb jij aan DNA?","films/dna/8-wat-heb-jij-aan-dna.html"],
  erf2:["Monohybride kruisingen","films/erfelijkheid/2-monohybride-kruisingen.html"],erf6:["Stambomen en kansrekenen","films/erfelijkheid/6-stambomen-en-kansrekenen.html"],erf5:["Overerving via X-chromosomen en mitochondriën","films/erfelijkheid/5-overerving-via-x-chromosomen-en-mitochondrien.html"],
  plant:["Transport in planten","films/transport/6-transport-in-planten.html"],eco1:["Hoeveel passen er?","films/ecologie/1-hoeveel-passen-er.html"],eco2:["Waar past een soort?","films/ecologie/2-waar-past-een-soort.html"],eco3:["Wie eet wie?","films/ecologie/3-wie-eet-wie.html"],eco6:["Koolstof gaat rond","films/ecologie/6-koolstof-gaat-rond.html"],eco5:["Waarom zo weinig roofdieren?","films/ecologie/5-waarom-zo-weinig-roofdieren.html"],
  zen2:["Het kabelnetwerk","films/zenuwstelsel/2-het-kabelnetwerk.html"],syn:["De spleet","films/zenuwstelsel/3-de-spleet.html"],knoei:["Knoeien met de spleet","films/zenuwstelsel/4-knoeien-met-de-spleet.html"],zintuig:["Zintuigen","films/zenuwstelsel/8-zintuigen.html"],
  afw1:["De eerste verdediging","films/afweer/1-de-eerste-verdediging.html"],afw2:["Antistoffen op maat","films/afweer/2-antistoffen-op-maat.html"],onderz:["Onderzoek doen","films/cellen/onderzoek-doen/index.html"],vertr:["Kun je onderzoek vertrouwen?","films/extra/kun-je-onderzoek-vertrouwen.html"],
  microben:["Wat groeit er op je boterham?","films/cellen/microben.html"]};
const anim=(steps,draw)=>box=>E.stappen(box,steps,(st,s)=>{st.innerHTML=draw(s.i,s);});
const caps=a=>a.map((c,i)=>({cap:c,i}));
const T2=(x,y,t,o="")=>`<text x="${x}" y="${y}" text-anchor="middle" style="font:600 13px var(--tekst);fill:var(--text);${o}">${t}</text>`;

/* ===== opgave 1 ===== */
E.zet(T,[1,3],{titel:"Bloedsuikerspiegel: insuline en glucagon",
  html:`<p>Je lichaam houdt het glucosegehalte van het bloed binnen nauwe grenzen (negatieve terugkoppeling):</p><ul><li>Stijgt het gehalte, dan maken de eilandjes van Langerhans <b>insuline</b>. Lever- en spiercellen nemen dan glucose op en slaan het op als glycogeen. Het gehalte daalt.</li><li>Daalt het gehalte, dan maken ze <b>glucagon</b>. De lever breekt glycogeen af en geeft glucose af. Het gehalte stijgt.</li></ul><p>Glucose stijgt in het bloed na het eten van koolhydraten. Glucose wordt verbruikt bij de <b>dissimilatie</b> (verbranding) in je cellen, vooral als je spieren hard werken. Bij diabetes type 1 maakt het lichaam zelf geen insuline meer; dan moet de toediening passen bij wat iemand eet en doet. Te hoog heet een hyper, te laag een hypo.</p>`,
  anim:anim(caps(["Normaal bloedsuikergehalte.","Na een maaltijd: glucose stijgt, insuline zorgt voor opname en opslag.","Bij inspanning: de spieren verbruiken glucose, het gehalte daalt; glucagon laat de lever glucose afgeven."]),i=>{
    const y=[90,40,135][i];let g=`<rect x="20" y="20" width="420" height="140" fill="none" stroke="var(--line2)"/><rect x="20" y="70" width="420" height="40" fill="var(--groen-soft)"/>`+T2(400,64,"normaal","font-weight:400;fill:var(--text2)");
    g+=`<circle cx="230" cy="${y}" r="10" fill="var(--goud)"/>`+T2(230,y-16,["glucose","hoog: insuline","laag: glucagon"][i]);return E.svg("0 0 460 180",g,"Bloedsuikergehalte binnen en buiten het normale gebied");}),
  films:[F.hor2,F.hor1]});
E.zet(T,[2],{titel:"De poortader",
  html:`<p>Bloed uit de darmen (en de milt) gaat niet direct terug naar het hart, maar eerst via de <b>poortader</b> naar de lever. Stoffen die in de darm worden opgenomen, komen dus eerst in de poortader en daarna in de lever. De lever slaat stoffen op, zet ze om of geeft ze af. Via de leverader gaat het bloed daarna terug naar het hart.</p>`,
  films:[F.darm4,F.lever]});
E.zet(T,[4],{titel:"Grote en kleine bloedsomloop",
  html:`<p>Je hebt een <b>dubbele bloedsomloop</b>:</p><ul><li><b>kleine bloedsomloop</b>: rechterkamer → longslagader → longen → longaders → linkerboezem;</li><li><b>grote bloedsomloop</b>: linkerkamer → aorta → organen → aders → holle aders → rechterboezem.</li></ul><p>Een stof die in een ader terechtkomt, gaat dus eerst naar het hart. Volg zelf de route naar het orgaan waar de stof moet zijn, en tel hoe vaak je door het hart komt.</p>`,
  films:[F.pomp]});
E.zet(T,[5],{titel:"De alvleesklier: twee taken",
  html:`<p>De alvleesklier is een <b>gemengde klier</b>:</p><ul><li><b>endocrien</b> (hormoonklier): de eilandjes van Langerhans geven hormonen af aan het bloed;</li><li><b>exocrien</b>: het grootste deel van de klier geeft zijn product via een afvoerbuis af aan het verteringskanaal.</li></ul>`,
  films:[F.voed2,F.hor2]});

/* ===== opgave 2 ===== */
E.zet(T,[6],{titel:"Waarom evolueert een soort snel of langzaam?",
  html:`<p>Evolutie vraagt om twee dingen:</p><ul><li><b>variatie</b>: nieuwe allelen ontstaan door mutaties, en recombinatie maakt nieuwe combinaties;</li><li><b>selectie</b>: individuen met gunstige eigenschappen overleven en planten zich vaker voort.</li></ul><p>Hoe sterk de selectie is (de <b>selectiedruk</b>), hangt af van het milieu: veranderende omstandigheden, predatoren, ziekten en concurrentie. In een milieu dat lang hetzelfde blijft, passen de bestaande eigenschappen al goed en verandert er weinig.</p>`,
  films:[F.evo2,F.evo1]});
E.zet(T,[7],{titel:"Genexpressie: welke genen staan aan?",
  html:`<p>Alle lichaamscellen van een organisme hebben <b>hetzelfde DNA</b>. Toch verschilt een spiercel van een huidcel, omdat in elke cel andere genen worden afgelezen.</p><p>Een gen dat wordt afgelezen, wordt eerst overgeschreven in <b>mRNA</b> (transcriptie); dat mRNA wordt vertaald in een eiwit (translatie). Het aflezen en gebruiken van een gen heet <b>genexpressie</b>.</p><p>De <b>genetische code</b> is iets anders: de ‘vertaalsleutel’ die zegt welk codon bij welk aminozuur hoort. Die is bij (bijna) alle organismen gelijk.</p>`,
  films:[F.dna6,F.dna3]});
E.zet(T,[8],{titel:"Een stamboom van soorten lezen",
  html:`<p>In een evolutionaire stamboom is elke <b>splitsing</b> een gemeenschappelijke voorouder. Twee soorten zijn nauwer verwant naarmate hun <b>laatste gemeenschappelijke voorouder recenter</b> leefde, dus hoe dichter de splitsing bij ‘nu’ ligt.</p><p>Let op: de volgorde waarin de namen onder elkaar staan, zegt niets. Volg de takken naar het punt waar ze samenkomen en lees daar de tijd af.</p>`,
  films:[F.evo8]});

/* ===== opgave 3 ===== */
E.zet(T,[9,11],{titel:"Eiwitten, aminozuren en de lever",
  html:`<p>In de darm worden <b>eiwitten</b> verteerd tot <b>aminozuren</b>. Die gaan via de poortader naar de lever. Je lichaam kan aminozuren niet opslaan. Wat niet nodig is voor nieuwe eiwitten, breekt de lever af:</p><ul><li>de <b>aminogroep</b> (met stikstof) wordt eraf gehaald (desaminering); daarbij ontstaat giftig ammoniak;</li><li>de rest van het molecuul kan worden verbrand of omgezet.</li></ul><p>De lever zet het ammoniak om in een minder giftige stikstofverbinding die met het bloed naar een uitscheidingsorgaan gaat.</p>`,
  films:[F.lever,F.gas3,F.voed1]});
E.zet(T,[10],{titel:"Waaruit bestaat bloed?",
  html:`<p>Bloed bestaat uit <b>bloedcellen</b> en <b>bloedplasma</b>:</p><ul><li><b>rode bloedcellen</b>: vervoeren vooral zuurstof (aan hemoglobine);</li><li><b>witte bloedcellen</b>: afweer;</li><li><b>bloedplaatjes</b>: bloedstolling;</li><li><b>bloedplasma</b>: water met opgeloste stoffen, zoals voedingsstoffen, afvalstoffen, hormonen, zouten en plasma-eiwitten.</li></ul>`,
  films:[F.bloed]});
E.zet(T,[12],{titel:"Autosomaal of X-chromosomaal, en kansen",
  html:`<p>Hulpregels bij een stamboom:</p><ul><li>Twee gezonde ouders met een ziek kind: de aandoening is <b>recessief</b>; de ouders zijn drager.</li><li>Een man heeft maar één X-chromosoom. Heeft hij een recessief allel op zijn X, dan komt het tot uiting. Een gezonde man kan dus <b>geen drager</b> zijn van een X-chromosomale aandoening.</li><li>Bij <b>autosomale</b> overerving is de kans voor jongens en meisjes gelijk; bij X-chromosomale overerving niet.</li></ul>`,
  films:[F.erf6,F.erf5,F.erf2]});
E.zet(T,[13],{titel:"Waar ontstaat een mutatie, en wie erft hem?",
  html:`<p>Een mutatie wordt doorgegeven aan alle cellen die ontstaan uit de cel waarin de mutatie optrad:</p><ul><li>Mutatie in een <b>geslachtscel</b> (eicel of zaadcel): het kind dat eruit ontstaat, heeft de mutatie in al zijn cellen. De ouder zelf heeft hem niet in zijn lichaamscellen.</li><li>Mutatie in de <b>bevruchte eicel</b>: ook dan heeft het kind hem in (bijna) al zijn cellen.</li><li>Mutatie in een <b>lichaamscel</b> later in het leven: alleen de cellen die daaruit ontstaan, hebben hem.</li></ul>`,
  films:[F.dna5]});

/* ===== opgave 4 ===== */
E.zet(T,[14,15],{titel:"Transport in planten",
  html:`<p>Een vaatbundel heeft twee soorten vaten:</p><ul><li><b>houtvaten</b>: dode, verhoute buizen die water en mineralen van de wortels omhoog vervoeren;</li><li><b>bastvaten</b> (zeefvaten): levende cellen die opgeloste suikers (vooral sacharose) vervoeren van de bladeren naar plekken waar ze nodig zijn.</li></ul><p>Stoffen gaan een cel in of uit door <b>diffusie</b> (van hoge naar lage concentratie, kost geen energie) of door <b>actief transport</b> (ook tegen een concentratieverschil in, kost ATP uit de dissimilatie).</p>`,
  films:[F.plant,F.adem2]});
E.zet(T,[16],{titel:"Indicatoren aflezen",
  html:`<p>Een indicator verandert van kleur als een bepaalde stof aanwezig is. Belangrijk is de <b>kleuromslag</b>: van welke kleur naar welke kleur.</p><ul><li>Is de kleur ná de proef gelijk aan de kleur ná de omslag, dan is de stof aangetoond.</li><li>Is de kleur gelijk gebleven aan de beginkleur van de indicator, dan is de stof niet aangetoond.</li></ul><p>Let op: dezelfde kleur (bijvoorbeeld blauw) kan bij de ene indicator ‘aanwezig’ betekenen en bij de andere ‘afwezig’.</p>`,
  films:[F.voed1,F.onderz]});
E.zet(T,[17],{titel:"Vertering van koolhydraten",
  html:`<p>Verteringsenzymen knippen grote moleculen in kleine, die door de darmwand kunnen. Koolhydraten worden afgebroken tot monosachariden zoals glucose. Dat gebeurt in stappen, op verschillende plekken in het verteringskanaal, met enzymen uit verschillende klieren.</p><p>Bedenk per plek: welke klier geeft daar sap af, en zit er een koolhydraatverterend enzym in? Niet elke klier van het verteringsstelsel maakt enzymen; gal bijvoorbeeld bevat geen enzymen.</p>`,
  films:[F.voed2,F.voed3]});
E.zet(T,[18,19],{titel:"Populatiegroei",
  html:`<p>Zonder beperkingen groeit een populatie <b>exponentieel</b>: in elke periode wordt hij met hetzelfde getal vermenigvuldigd. Hoe groter de populatie, hoe groter de toename. De grafiek wordt steeds steiler (J-vorm).</p><p>In werkelijkheid remmen factoren de groei af: voedseltekort, ziekten, predatoren, ruimtegebrek. Dan vlakt de groei af (S-vorm) of stort de populatie in.</p><ul><li><b>biotische factoren</b>: invloeden van levende organismen (voedsel, predatoren, ziekteverwekkers, soortgenoten);</li><li><b>abiotische factoren</b>: niet-levende invloeden (temperatuur, licht, water, bodem).</li></ul>`,
  anim:anim(caps(["Begin: 10 individuen. Elke periode × 2.","Na 3 periodes: 10 × 2 × 2 × 2 = 80.","Na 6 periodes: 10 × 2⁶ = 640. De sprongen worden steeds groter."]),i=>{
    const n=[1,4,7][i];let g=`<line x1="40" y1="160" x2="420" y2="160" class="ax"/><line x1="40" y1="160" x2="40" y2="15" class="ax"/>`;
    for(let k=0;k<n;k++){const v=10*Math.pow(2,k),h=v/640*140;g+=`<rect x="${55+k*52}" y="${160-h}" width="38" height="${Math.max(h,1)}" fill="var(--teal)"/><text x="${74+k*52}" y="${155-h}" text-anchor="middle" style="font:600 11px var(--meta);fill:var(--text)">${v}</text>`;}
    return E.svg("0 0 440 175",g,"Staafdiagram van een populatie die elke periode verdubbelt");}),
  films:[F.eco1]});
E.zet(T,[20],{titel:"Voedselrelaties en populaties",
  html:`<p>De grootte van een populatie wordt mede bepaald door <b>predatoren</b>. Hoe meer predatoren er zijn, hoe meer prooidieren worden gegeten.</p><p>Een soort kan alleen ergens leven als zijn <b>habitat</b> er is: de plek met de omstandigheden en schuil-, nest- en voedselplekken die hij nodig heeft. Een eentonig landschap biedt maar voor een paar soorten een geschikte habitat.</p>`,
  films:[F.eco3,F.eco2]});

/* ===== opgave 5 ===== */
E.zet(T,[21],{titel:"Relaties tussen organismen",
  html:`<ul><li><b>Predatie</b>: een predator doodt en eet prooidieren.</li><li><b>Parasitisme</b>: een parasiet leeft op of in een gastheer en voedt zich ermee; de gastheer heeft er nadeel van maar blijft meestal in leven.</li><li><b>Mutualisme</b>: beide soorten hebben voordeel.</li><li><b>Commensalisme</b>: de ene soort heeft voordeel, de andere geen voor- of nadeel.</li></ul><p>Bij deze vraag kreeg iedereen het punt (aanvulling van het CvTE), omdat boeken predatie verschillend omschrijven.</p>`,
  films:[F.eco3]});
E.zet(T,[22],{titel:"Zenuwcellen en synapsen",
  html:`<p>Drie soorten zenuwcellen:</p><ul><li><b>sensorische</b> zenuwcel: van zintuig naar het centrale zenuwstelsel; het cellichaam ligt vaak halverwege de uitloper;</li><li><b>schakelcel</b>: in het centrale zenuwstelsel, tussen andere zenuwcellen;</li><li><b>motorische</b> zenuwcel: van het centrale zenuwstelsel naar een spier of klier.</li></ul><p>In een <b>synaps</b> geeft het eindknopje van de ene cel neurotransmitter af in de spleet. Die bindt aan <b>receptoren</b> in het membraan van de volgende cel. Een impuls gaat daardoor maar één kant op.</p>`,
  films:[F.zen2,F.syn,F.knoei]});
E.zet(T,[23],{titel:"Organische stof en dissimilatie",
  html:`<p>Organische stoffen (koolhydraten, vetten, eiwitten) bevatten energie. Een organisme gebruikt ze voor:</p><ul><li><b>assimilatie</b>: opbouw van eigen lichaamsstoffen (groei);</li><li><b>dissimilatie</b>: afbraak om energie vrij te maken. Bij volledige verbranding ontstaan CO₂ en water: anorganische stoffen die het lichaam verlaten.</li></ul><p>Van wat een dier eet, wordt dus maar een deel eigen lichaam; de rest wordt verbrand of uitgescheiden.</p>`,
  films:[F.adem2,F.eco5]});
E.zet(T,[24],{titel:"Hoe ontstaat antibioticaresistentie?",
  html:`<p>In een grote bacteriepopulatie ontstaan voortdurend <b>toevallige mutaties</b>. Sommige maken een bacterie ongevoelig voor een antibioticum. Ook kunnen bacteriën genen uitwisselen.</p><p>Gebruik je het antibioticum, dan sterven de gevoelige bacteriën en vermenigvuldigen de resistente zich: <b>natuurlijke selectie</b>. Resistentie is dus niet iets wat een bacterie ‘leert’; het allel was er al of ontstaat door toeval.</p>`,
  films:[F.evo4,F.evo2]});

/* ===== opgave 6 ===== */
E.zet(T,[25,27],{titel:"Het netvlies",
  html:`<p>Het netvlies bevat twee soorten lichtgevoelige zintuigcellen:</p><ul><li><b>kegeltjes</b>: scherp en in kleur zien, werken bij veel licht; vooral in de <b>gele vlek</b>;</li><li><b>staafjes</b>: zien bij weinig licht, alleen in grijstinten; vooral buiten de gele vlek.</li></ul><p>Wat je recht aankijkt, valt op de gele vlek. Elke zintuigcel hoort bij één plek in je gezichtsveld: de hersenen bouwen het beeld op uit welke zintuigcellen er geprikkeld worden. Op de <b>blinde vlek</b>, waar de oogzenuw het oog verlaat, zitten geen zintuigcellen.</p>`,
  films:[F.zintuig]});
E.zet(T,[26],{titel:"Accommoderen",
  html:`<p>De lens hangt met <b>lensbandjes</b> vast aan het straalvormig lichaam, waarin een <b>kringspier</b> zit.</p><ul><li>Kringspier <b>samengetrokken</b>: de ring wordt kleiner, de lensbandjes worden slap, de lens wordt boller (sterker).</li><li>Kringspier <b>ontspannen</b>: de ring wordt wijder, de lensbandjes worden strak getrokken, de lens wordt platter (zwakker).</li></ul><p>Een bolle lens breekt licht sterker; dat heb je nodig voor voorwerpen dichtbij.</p>`,
  anim:anim(caps(["Kringspier samengetrokken: lensbandjes slap, lens bol.","Kringspier ontspannen: lensbandjes strak, lens plat."]),i=>{
    const rx=i?16:30;let g=`<ellipse cx="200" cy="90" rx="${rx}" ry="55" fill="var(--teal-soft)" stroke="var(--teal)" stroke-width="2"/>`;
    const r=i?120:95;g+=`<circle cx="200" cy="90" r="${r}" fill="none" stroke="var(--koraal)" stroke-width="${i?3:7}" stroke-dasharray="2 4"/>`;
    [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([sx,sy])=>{const x1=200+sx*rx*0.6,y1=90+sy*44,x2=200+sx*r*0.72,y2=90+sy*r*0.7;g+=i?`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--text)" stroke-width="1.5"/>`:`<path d="M${x1},${y1} Q${(x1+x2)/2+sx*8},${(y1+y2)/2+12} ${x2},${y2}" fill="none" stroke="var(--text)" stroke-width="1.5"/>`;});
    g+=T2(200,230,i?"ontspannen kringspier":"samengetrokken kringspier");return E.svg("0 0 400 240",g,"Lens met lensbandjes en kringspier");}),
  films:[F.zintuig]});
E.zet(T,[28,29,30],{titel:"Een goed medisch onderzoek",
  html:`<ul><li><b>Controlegroep</b>: een groep die in alles gelijk wordt behandeld als de proefgroepen, behalve de factor die je onderzoekt. Bij medicijnen krijgt die een <b>placebo</b>.</li><li><b>Steekproefgrootte</b>: mensen verschillen. Hoe meer proefpersonen, hoe minder toevallige verschillen tussen personen de uitkomst bepalen: het onderzoek wordt <b>betrouwbaarder</b>.</li><li><b>Conclusies</b> trek je alleen over wat gemeten is: lees precies wat op de as staat en ga niet verder dan de gemeten periode.</li></ul>`,
  films:[F.onderz,F.vertr]});
E.zet(T,[31],{titel:"Tweelingonderzoek",
  html:`<ul><li><b>Eeneiige</b> tweelingen ontstaan uit één bevruchte eicel: ze hebben (vrijwel) hetzelfde DNA.</li><li><b>Twee-eiige</b> tweelingen ontstaan uit twee bevruchte eicellen: ze delen gemiddeld de helft van hun DNA, net als gewone broers en zussen.</li></ul><p>Tweelingen groeien meestal in hetzelfde gezin op. Verschillen tussen eeneiige tweelingen komen dus vooral door het milieu. Door eeneiige en twee-eiige tweelingen te vergelijken, kun je schatten hoe groot de erfelijke invloed op een eigenschap is.</p>`,
  films:[F.erf6]});

/* ===== opgave 7 ===== */
E.zet(T,[32],{titel:"Wetenschappelijke namen",
  html:`<p>Een wetenschappelijke naam bestaat uit twee delen (binaire naamgeving), schuin gedrukt:</p><ul><li>het eerste woord, met hoofdletter, is het <b>geslacht</b> (genus);</li><li>het tweede woord, met kleine letter, is de soortaanduiding.</li></ul><p>Elke soort heeft een eigen combinatie. Soorten met hetzelfde eerste woord horen bij hetzelfde geslacht. Voorbeeld: <i>Felis catus</i> (huiskat) en <i>Felis silvestris</i> (wilde kat) zijn twee soorten in één geslacht.</p>`});
E.zet(T,[33],{titel:"Organen en orgaanstelsels",
  html:`<p>Elk orgaanstelsel heeft zijn eigen taak:</p><ul><li><b>zenuwstelsel</b>: prikkels doorgeven, verwerken en het lichaam aansturen;</li><li><b>spierstelsel</b> en <b>skelet</b>: bewegen en steun;</li><li><b>spijsverteringsstelsel</b>, <b>ademhalingsstelsel</b>, <b>bloedvatenstelsel</b>, <b>uitscheidingsstelsel</b>, <b>hormoonstelsel</b>.</li></ul><p>Uit ziekteverschijnselen kun je afleiden welk stelsel is aangetast: welk stelsel regelt het gedrag dat verandert?</p>`,
  films:[F.zen2]});
E.zet(T,[34],{titel:"Aangeboren en verworven afweer",
  html:`<ul><li><b>Aangeboren (aspecifieke) afweer</b>: werkt tegen alle ziekteverwekkers op dezelfde manier en is direct paraat. Denk aan barrières zoals huid en slijmvliezen, de ontstekingsreactie en witte bloedcellen die ziekteverwekkers opruimen.</li><li><b>Verworven (specifieke) afweer</b>: richt zich op één bepaald antigeen en heeft een geheugen. Hier horen de lymfocyten (T-cellen en B-cellen) bij. Ga per proces na of het specifiek is voor één antigeen of niet.</li></ul>`,
  films:[F.afw1,F.afw2]});
E.zet(T,[35,36],{titel:"Kleine populaties en genetische variatie",
  html:`<ul><li><b>Genetic drift</b>: allelfrequenties veranderen door <b>toeval</b>, niet door selectie. Het effect is groot in kleine populaties.</li><li><b>Adaptatie</b>: aanpassing door natuurlijke selectie.</li><li><b>Recombinatie</b>: nieuwe combinaties van allelen bij de vorming van geslachtscellen en bevruchting.</li><li><b>Seksuele selectie</b>: selectie door partnerkeuze.</li></ul><p><b>Genetische variatie</b> is de grondstof voor selectie. Bij weinig variatie is ook de kans op inteelt groter.</p>`,
  films:[F.evo5,F.evo2]});
E.zet(T,[37,38],{titel:"DNA als soortkenmerk",
  html:`<p>DNA zit in de kern van cellen. Lichaamscellen hebben twee sets chromosomen, geslachtscellen één set. DNA is opgebouwd uit nucleotiden; drie nucleotiden achter elkaar in een gen vormen een codon.</p><p>Met DNA-technieken kun je een stukje DNA opsporen in een monster, ook als er maar heel weinig van is. Bedenk bij een monster steeds: zitten er cellen van het organisme in, en welke informatie in het DNA is kenmerkend voor één soort?</p>`,
  films:[F.dna8,F.dna3]});
E.zet(T,[39],{titel:"Twee methoden vergelijken in een grafiek",
  html:`<p>Vergelijk je twee lijnen in een grafiek, kijk dan niet alleen of de ene lijn hoger ligt, maar <b>waar</b> op de x-as het verschil zit. Vaak verschillen methoden maar in een deel van de grafiek.</p><p>Bedenk daarna welk deel van de grafiek past bij de situatie in de vraag.</p>`});
E.zet(T,[40],{titel:"Exoten en ziekten",
  html:`<p>Een <b>exoot</b> is een soort die door de mens in een gebied is gebracht. Exoten kunnen inheemse soorten bedreigen door <b>concurrentie</b> (om voedsel en ruimte), door predatie, of doordat ze <b>ziekteverwekkers</b> meebrengen waartegen inheemse soorten geen afweer hebben.</p><p>Een populatie in een geïsoleerd gebied is beschermd zolang exoten en ziekteverwekkers het gebied niet kunnen bereiken.</p>`,
  films:[F.eco2,F.evo4]});

/* ===== opgave 8 ===== */
E.zet(T,[41],{titel:"Cellulose verteren",
  html:`<p>Plantencellen hebben een stevige <b>celwand van cellulose</b>. Cellulose is net als zetmeel opgebouwd uit glucose, maar de bindingen zijn anders. Amylase kan ze niet knippen; daarvoor is <b>cellulase</b> nodig.</p><p>Zoogdieren maken zelf geen cellulase. Planteneters zoals koeien en konijnen hebben bacteriën in hun verteringskanaal die het wel maken.</p>`,
  films:[F.voed6,F.voed3]});
E.zet(T,[42],{titel:"Receptoren",
  html:`<p>Een <b>receptor</b> is een eiwit dat een bepaalde stof herkent en bindt, zoals een slot dat bij één sleutel past. Daardoor reageert de cel. Een receptor zet de stof niet om; dat doet een enzym.</p><p>Bedenk bij een receptor steeds: waar zit de stof die hij moet herkennen, en dus waar moet de receptor zitten?</p>`,
  films:[F.zintuig,F.syn]});
E.zet(T,[43],{titel:"Soorten mutaties",
  html:`<ul><li><b>Puntmutatie</b>: één (of enkele) nucleotide(n) in het DNA verandert, verdwijnt of komt erbij. Daardoor kan de code van een gen veranderen: een ander aminozuur, of een stopcodon.</li><li><b>Chromosoommutatie</b>: een stuk van een chromosoom verandert (bv. verdwijnt of wordt verplaatst).</li><li><b>Genoommutatie</b>: het <b>aantal chromosomen</b> verandert (één chromosoom extra of te weinig, of een hele set extra).</li></ul>`,
  films:[F.dna5]});
E.zet(T,[44,46],{titel:"Biobrandstof en de koolstofkringloop",
  html:`<p>Bij de <b>fotosynthese</b> leggen planten CO₂ uit de lucht vast in organische stof. Bij verbranding of dissimilatie komt die CO₂ weer vrij. Zo gaat koolstof rond.</p><ul><li><b>Fossiele brandstoffen</b> (aardolie, aardgas, steenkool) bevatten koolstof die miljoenen jaren uit de kringloop was. Bij verbranding komt CO₂ vrij, een broeikasgas.</li><li><b>Biobrandstoffen</b> worden gemaakt uit planten van nu.</li></ul><p>Om te bepalen wat een brandstof doet met het broeikaseffect, kijk je naar de hele kringloop: waar komt de koolstof vandaan en waar gaat hij heen?</p>`,
  films:[F.eco6]});
E.zet(T,[45],{titel:"Biotische en abiotische factoren",
  html:`<ul><li><b>Abiotische factoren</b>: de niet-levende omgeving: natuurkundige en scheikundige omstandigheden, zoals het klimaat of de samenstelling van de bodem.</li><li><b>Biotische factoren</b>: invloeden van andere organismen, zoals voedsel (als dat een organisme is), concurrenten, predatoren en ziekteverwekkers.</li></ul><p>Micro-organismen zoals gist groeien het best binnen een bepaald gebied van elke abiotische factor (het optimum). In een bioreactor houd je die factoren constant.</p>`,
  films:[F.microben,F.eco2]});
})();
