/* Uitleg van de stof · oefenexamen havo 2025-II (tool havo25-2). Gekopieerd naar tools/examen-stof/havo25-2.js door samenvoegen.py. */
(function(){
"use strict";
if(!window.EXSTOF)return;
const E=window.EXSTOF,T="havo25-2";
const anim=(steps,draw)=>box=>E.stappen(box,steps,(st,s,i)=>{st.innerHTML=draw(i,s);});
const caps=a=>a.map(c=>({cap:c}));
const F={pomp:["Eén pomp, twee rondjes","films/transport/1-een-pomp-twee-rondjes.html"],buizen:["Buizen onder druk","films/transport/2-buizen-onder-druk.html"],hart:["Het hart onder controle","films/transport/5-het-hart-onder-controle.html"],
  adem2:["Alles op adem","films/stofwisseling/2-alles-op-adem.html"],versneld:["Alles versneld","films/stofwisseling/1-alles-versneld.html"],groen:["Alles in het groen","films/stofwisseling/3-alles-in-het-groen.html"],
  dna3:["Van DNA naar eiwit","films/dna/3-van-dna-naar-eiwit.html"],dna5:["Mutaties","films/dna/5-mutaties.html"],dna1:["Wat is DNA?","films/dna/1-wat-is-dna.html"],
  erf2:["Monohybride kruisingen","films/erfelijkheid/2-monohybride-kruisingen.html"],erf6:["Stambomen en kansrekenen","films/erfelijkheid/6-stambomen-en-kansrekenen.html"],
  evo1:["Wat is evolutie eigenlijk?","films/evolutie/1-wat-is-evolutie.html"],evo2:["Natuurlijke selectie","films/evolutie/2-natuurlijke-selectie.html"],evo5:["Toeval en uitwisseling","films/evolutie/5-toeval-en-uitwisseling.html"],evo6:["Hoe een soort er twee wordt","films/evolutie/6-hoe-een-soort-er-twee-wordt.html"],evo8:["Stambomen lezen","films/evolutie/8-stambomen-lezen.html"],
  microben:["Wat groeit er op je boterham?","films/cellen/microben.html"],voed3:["Knippen op maat","films/voeding/3-knippen-op-maat.html"],voed1:["Wat zit er in je eten?","films/voeding/1-wat-zit-er-in-je-eten.html"],voed5:["De lever als fabriek","films/voeding/5-de-lever-als-fabriek.html"],
  eco6:["Koolstof gaat rond","films/ecologie/6-koolstof-gaat-rond.html"],eco7:["Stikstof gaat rond","films/ecologie/7-stikstof-gaat-rond.html"],eco2:["Waar past een soort?","films/ecologie/2-waar-past-een-soort.html"],eco3:["Wie eet wie?","films/ecologie/3-wie-eet-wie.html"],eco1:["Hoeveel passen er?","films/ecologie/1-hoeveel-passen-er.html"],
  afw2:["Antistoffen op maat","films/afweer/2-antistoffen-op-maat.html"],afw3:["T-cellen en virussen","films/afweer/3-t-cellen-en-virussen.html"],
  gas1:["Adem in, adem uit","films/gaswisseling/1-adem-in-adem-uit.html"],gas2:["Gas op reis","films/gaswisseling/2-gas-op-reis.html"],gas3:["Uitscheiding en evenwicht","films/gaswisseling/3-uitscheiding-en-evenwicht.html"],
  zen2:["Het kabelnetwerk","films/zenuwstelsel/2-het-kabelnetwerk.html"],zen5:["Het hoofdkantoor","films/zenuwstelsel/5-het-hoofdkantoor.html"],zen1:["Eén seconde","films/zenuwstelsel/1-een-seconde.html"],
  hor1:["Post voor iedereen","films/hormonen/1-post-voor-iedereen.html"],hor5:["Water in balans","films/hormonen/5-water-in-balans.html"],
  onderz:["Onderzoek doen","films/cellen/onderzoek-doen/index.html"],kun:["Kun je onderzoek vertrouwen?","films/extra/kun-je-onderzoek-vertrouwen.html"],pcr:["Op maat gekopieerd","films/dna-technieken/1-op-maat-gekopieerd/index.html"],
  diff:["Diffusie en osmose","films/cellen/diffusie-osmose/index.html"]};

/* schematisch hart: kamers en vaten; on = lijst delen die oplichten */
function hart(on=[]){
  const c=k=>on.includes(k)?"var(--goud)":"var(--text2)",w=k=>on.includes(k)?3.2:1.8;
  let g=`<path d="M60,70 Q60,40 100,40 L140,40 Q170,40 170,70 L170,95 L60,95 Z" fill="none" stroke="${c("rb")}" stroke-width="${w("rb")}"/>
  <path d="M190,70 Q190,40 230,40 L270,40 Q300,40 300,70 L300,95 L190,95 Z" fill="none" stroke="${c("lb")}" stroke-width="${w("lb")}"/>
  <path d="M60,105 L170,105 L170,220 Q120,250 60,190 Z" fill="none" stroke="${c("rk")}" stroke-width="${on.includes("rkdik")?7:w("rk")}"/>
  <path d="M190,105 L300,105 L300,190 Q240,250 190,220 Z" fill="none" stroke="${c("lk")}" stroke-width="${on.includes("lkdik")?7:w("lk")}"/>`;
  g+=`<text class="lblm" x="115" y="72" text-anchor="middle">rechter-</text><text class="lblm" x="115" y="86" text-anchor="middle">boezem</text>
  <text class="lblm" x="245" y="72" text-anchor="middle">linker-</text><text class="lblm" x="245" y="86" text-anchor="middle">boezem</text>
  <text class="lblm" x="115" y="160" text-anchor="middle">rechter-</text><text class="lblm" x="115" y="174" text-anchor="middle">kamer</text>
  <text class="lblm" x="245" y="160" text-anchor="middle">linker-</text><text class="lblm" x="245" y="174" text-anchor="middle">kamer</text>`;
  g+=`<text class="lblm" x="180" y="270" text-anchor="middle">(vooraanzicht: rechts in het lichaam = links in de tekening)</text>`;
  return E.svg("0 0 360 280",g,"Schema van het hart met vier ruimten");
}
/* enzymactiviteit tegen temperatuur; m = markering */
function enzym(i){
  let g=`<path d="M40,200 H340 M40,200 V20" stroke="var(--text)" stroke-width="1.5" fill="none"/>
  <path d="M40,195 C120,185 180,120 230,40 C250,20 262,60 280,160 L290,198" fill="none" stroke="var(--text)" stroke-width="2.4"/>
  <text class="lblm" x="300" y="218" text-anchor="end">temperatuur →</text><text class="lblm" x="46" y="18">activiteit enzym ↑</text>`;
  const pts=[[90,190,"koud: moleculen bewegen langzaam"],[180,120,"warmer: vaker botsingen"],[238,36,"optimum"],[285,180,"te warm: enzym verandert van vorm"]];
  pts.slice(0,i+1).forEach(([x,y,t])=>g+=`<circle cx="${x}" cy="${y}" r="5" fill="var(--goud)"/><text class="lblm" x="${x+8}" y="${y-6}" style="fill:var(--goud-text)">${t}</text>`);
  return E.svg("0 0 380 225",g,"Grafiek: enzymactiviteit stijgt met de temperatuur tot een optimum en daalt daarna snel");
}
/* terugkoppeling (algemeen, met lichaamstemperatuur) */
function kring(i){
  const S=["waarde wijkt af","receptor meet","centrum stuurt","effector reageert","waarde terug naar normaal"];
  let g="";S.forEach((t,k)=>{const a=-Math.PI/2+k*2*Math.PI/S.length,x=190+120*Math.cos(a),y=125+92*Math.sin(a);const on=k<=i;
    g+=`<rect x="${x-70}" y="${y-15}" width="140" height="30" rx="8" fill="var(--bg)" stroke="${on?"var(--goud)":"var(--line2)"}" stroke-width="${on?2.4:1.2}"/><text class="lblm" x="${x}" y="${y+5}" text-anchor="middle" style="${on?"fill:var(--text)":""}">${t}</text>`;});
  return E.svg("0 0 380 250",g,"Kringloop van negatieve terugkoppeling");
}

/* ===== opgave 1 ===== */
E.zet(T,[1],{titel:"Bouw van het hart",
  html:`<p>Het hart heeft vier ruimten: twee boezems boven en twee kamers onder. De <b>rechterhelft</b> pompt zuurstofarm bloed naar de longen (kleine bloedsomloop), de <b>linkerhelft</b> pompt zuurstofrijk bloed door het hele lichaam (grote bloedsomloop).</p><p>Een spier die meer kracht moet leveren, is dikker. Daarom verschilt de dikte van de kamerwanden. Een tekening van het hart is meestal een vooraanzicht: wat rechts in het lichaam zit, staat links in de tekening.</p>`,
  anim:anim(caps(["Vier ruimten: boezems boven, kamers onder.","De rechterkamer pompt naar de longen: korte afstand, lage weerstand.","De linkerkamer pompt naar het hele lichaam: hij heeft de dikste wand."]),i=>hart([[],["rk"],["lk","lkdik"]][i])),
  films:[F.pomp]});
E.zet(T,[2],{titel:"De hartcyclus en de kleppen",
  html:`<p>Een hartslag heeft twee fasen voor de kamers:</p><ul><li><b>systole</b>: de kamers trekken samen, de druk in de kamers stijgt en het bloed wordt de slagaders in geperst;</li><li><b>diastole</b>: de kamers ontspannen, de druk in de kamers daalt en ze vullen zich weer vanuit de boezems.</li></ul><p>Bloed stroomt altijd van hoge naar lage druk. De <b>halvemaanvormige kleppen</b> tussen kamer en slagader gaan open als de druk in de kamer hoger is dan in de slagader, en sluiten als het andersom is. Zo houden ze het bloed op de goede weg.</p>`,
  films:[F.hart,F.buizen]});
E.zet(T,[3],{titel:"Zuurstof en energie in de cel",
  html:`<p>Cellen halen energie uit <b>dissimilatie</b>: glucose wordt afgebroken en de energie wordt vastgelegd in <b>ATP</b>.</p><ul><li><b>aerobe dissimilatie</b> (met zuurstof): glucose wordt volledig afgebroken, dat levert veel ATP;</li><li><b>anaerobe dissimilatie</b> (zonder zuurstof): levert veel minder ATP per glucose.</li></ul><p>De zuurstof komt met het bloed naar de cellen. Normaal zijn zuurstofrijk bloed (linkerhelft van het hart) en zuurstofarm bloed (rechterhelft) gescheiden door het tussenschot.</p>`,
  films:[F.adem2,F.pomp]});
E.zet(T,[4],{titel:"De twee bloedsomlopen",
  html:`<p>Bloed maakt twee rondjes:</p><ul><li><b>kleine bloedsomloop</b>: rechterkamer → longslagader → longen (zuurstof erin, CO<sub>2</sub> eruit) → longaders → linkerboezem;</li><li><b>grote bloedsomloop</b>: linkerkamer → aorta → organen → holle aders → rechterboezem.</li></ul><p>Een <b>slagader</b> voert bloed van het hart af, een <b>ader</b> brengt bloed naar het hart toe. In een schema herken je de longen en de rest van het lichaam aan de haarvatennetten die erin getekend zijn.</p>`,
  films:[F.pomp,F.gas2]});

/* ===== opgave 2 ===== */
E.zet(T,[5],{titel:"Genen, eiwitten en cellen",
  html:`<p>Een <b>gen</b> is een stuk DNA met de code voor één eiwit. Dat eiwit kan van alles doen: een enzym zijn dat een stof maakt, een signaal geven, of cellen laten bewegen.</p><p>Bijna alle cellen van een organisme ontstaan door mitose uit één bevruchte eicel, en bij elke deling wordt het DNA gekopieerd. Een <b>mutatie</b> wordt bij die delingen ook gekopieerd.</p>`,
  films:[F.dna3,F.dna5]});
E.zet(T,[6],{titel:"Mutaties zijn toeval",
  html:`<p>Een <b>mutatie</b> is een toevallige verandering in het DNA, bijvoorbeeld door een kopieerfout. Hoe groter en ingewikkelder een verandering, hoe kleiner de kans dat precies die verandering ontstaat.</p><p>Hebben twee groepen dezelfde zeldzame verandering in hun DNA, dan is het meestal waarschijnlijker dat ze die van een <b>gemeenschappelijke voorouder</b> hebben geërfd. Zo gebruiken biologen DNA om verwantschap te bepalen.</p>`,
  films:[F.dna5,F.evo8]});
E.zet(T,[7],{titel:"Dominant, recessief en stambomen",
  html:`<p>Een dominant allel (A) komt altijd tot uiting, een recessief allel (a) alleen als er twee van zijn (aa).</p><ul><li>Krijgen twee ouders met dezelfde eigenschap een kind <b>zonder</b> die eigenschap, dan zat er een verborgen allel bij de ouders: de eigenschap van de ouders is dominant en de ouders zijn heterozygoot.</li><li>Bij een kruising Aa × Aa ontstaan AA, Aa en aa in de verhouding 1 : 2 : 1.</li><li>Weet je al iets over het fenotype van een kind, dan valt een deel van de mogelijkheden af. Reken dan alleen met wat overblijft.</li></ul>`,
  films:[F.erf2,F.erf6]});
E.zet(T,[8],{titel:"De testkruising",
  html:`<p>Aan een dier met een dominante eigenschap zie je niet of het AA of Aa is. Dat test je door het te kruisen met een dier dat <b>homozygoot recessief</b> is (aa): een <b>testkruising</b>.</p><p>Het aa-dier geeft altijd een a door. Wat de nakomelingen laten zien, hangt dus alleen af van de gameten van het geteste dier. Schrijf de gameten van beide ouders op en combineer ze in een kruisingsschema.</p>`,
  films:[F.erf2]});
E.zet(T,[9],{titel:"Inteelt",
  html:`<p>Veel mensen en dieren zijn <b>drager</b> van een recessief allel voor een afwijking zonder het te weten: het dominante allel verbergt het. Een kind krijgt de afwijking alleen als het van <b>beide</b> ouders zo'n allel krijgt.</p><p>Verwanten hebben een deel van hun allelen van dezelfde voorouders gekregen. Hoe nauwer verwant, hoe meer allelen ze delen.</p>`,
  films:[F.evo5,F.erf6]});

/* ===== opgave 3 ===== */
E.zet(T,[10],{titel:"Koolhydraten en enzymen",
  html:`<p>Koolhydraten zijn er in drie maten:</p><ul><li><b>monosachariden</b>: één suikereenheid (glucose, fructose);</li><li><b>disachariden</b>: twee eenheden (sacharose = tafelsuiker, maltose);</li><li><b>polysachariden</b>: lange ketens (zetmeel, cellulose, glycogeen).</li></ul><p>Een cel neemt alleen kleine suikers op. Grote moleculen worden eerst geknipt door <b>enzymen</b>; elk enzym knipt één soort binding. De naam van een enzym eindigt meestal op <b>-ase</b>.</p>`,
  films:[F.voed3,F.voed1]});
E.zet(T,[11,12],{titel:"Dissimilatie met en zonder zuurstof",
  html:`<p><b>Aerobe dissimilatie</b> (met zuurstof): glucose wordt helemaal afgebroken tot kleine anorganische moleculen. Dat levert veel ATP op.</p><p><b>Anaerobe dissimilatie</b> (zonder zuurstof): glucose wordt maar gedeeltelijk afgebroken. In spiercellen ontstaat dan melkzuur. Gist, dat ook zonder zuurstof kan leven, maakt er andere stoffen van; mensen gebruiken dat al duizenden jaren bij het maken van brood, bier en wijn.</p>`,
  films:[F.adem2,F.microben]});
E.zet(T,[13],{titel:"CO₂ uit de landbouw",
  html:`<p>Bij het verbranden van fossiele brandstoffen (aardolie, aardgas, steenkool) komt CO<sub>2</sub> vrij die miljoenen jaren vastlag. In de hele keten van voedsel en gewassen wordt zulke energie gebruikt: op het land, in fabrieken die grondstoffen voor de landbouw maken, bij transport en bij verwerking.</p>`,
  films:[F.eco6]});
E.zet(T,[14],{titel:"Rekenen met percentages en gehalten",
  html:`<p>Bij een reeks gehalten reken je stap voor stap verder met wat er na elke stap overblijft:</p><ul><li>‘10% is zand’ betekent: 90% is biet, dus × 0,9;</li><li>‘24% biomassa’ betekent: × 0,24;</li><li>‘0,73 kg per kg’ betekent: × 0,73.</li></ul><p>Let altijd op de <b>eenheden</b>: staat iets in gram per kilogram, en vraagt de opgave kilogram, reken dan om (1 kg = 1000 g). Schrijf op het examen elke stap op.</p>`,
  anim:anim(caps(["Voorbeeld: 200 kg appels, 15% is klokhuis en schil.","Eetbaar: 200 × 0,85 = 170 kg.","Daarvan is 10% suiker: 170 × 0,10 = 17 kg suiker."]),i=>{let g="";[["200 kg appels",200],["170 kg eetbaar",170],["17 kg suiker",17]].slice(0,i+1).forEach(([t,v],k)=>g+=`<rect x="20" y="${20+k*44}" width="${v*1.6}" height="30" fill="var(--teal)" opacity=".6"/><text class="lbl" x="${30+v*1.6}" y="${40+k*44}">${t}</text>`);return E.svg("0 0 460 150",g,"Balken die stap voor stap kleiner worden");}),
  films:[]});
E.zet(T,[15],{titel:"De koolstofkringloop",
  html:`<p>Koolstof gaat rond: planten halen CO<sub>2</sub> uit de lucht voor fotosynthese en leggen het vast in organische stoffen. Bij dissimilatie, verbranding en afbraak komt het weer vrij.</p><ul><li><b>korte kringloop</b>: koolstof die kort geleden uit de lucht is gehaald, komt binnen enkele jaren weer terug;</li><li><b>lange kringloop</b>: koolstof die miljoenen jaren vastlag in aardolie, steenkool en aardgas.</li></ul><p>Het <b>versterkte broeikaseffect</b> ontstaat doordat de hoeveelheid CO<sub>2</sub> in de atmosfeer netto toeneemt.</p>`,
  films:[F.eco6]});

/* ===== opgave 4 ===== */
E.zet(T,[16],{titel:"DNA, RNA en eiwitten",
  html:`<p>DNA en RNA zijn ketens van <b>nucleotiden</b>; de volgorde van de basen vormt de code. Eiwitten zijn ketens van <b>aminozuren</b>; hun volgorde bepaalt de vorm van het eiwit.</p><p>Een virus bestaat uit erfelijk materiaal (bij het coronavirus RNA) met een mantel van eiwitten eromheen. Een <b>antigeen</b> is een molecuul waaraan het afweersysteem een ziekteverwekker herkent. Een <b>PCR</b> vermenigvuldigt een stukje erfelijk materiaal met een bekende basevolgorde, zodat je het kunt aantonen.</p>`,
  films:[F.afw2,F.pcr]});
E.zet(T,[17],{titel:"Diffusie",
  html:`<p>Bij <b>diffusie</b> bewegen deeltjes van een hoge naar een lage concentratie. De snelheid hangt af van:</p><ul><li>het <b>concentratieverschil</b>: hoe groter, hoe sneller;</li><li>het <b>oppervlak</b> waardoor de deeltjes gaan: hoe groter, hoe sneller;</li><li>de <b>afstand</b> die ze moeten afleggen: hoe korter, hoe sneller.</li></ul><p>Daarom hebben de longen heel veel kleine longblaasjes met een dunne wand. In een formule staat wat de snelheid groter maakt in de teller, en wat hem kleiner maakt in de noemer.</p>`,
  films:[F.diff,F.gas1]});
E.zet(T,[18,19],{titel:"Het verworven afweersysteem",
  html:`<p>Het verworven (specifieke) afweersysteem herkent één bepaald antigeen. Het werkt met <b>lymfocyten</b>: B-cellen en T-cellen, die na activering delen en zich specialiseren (onder andere tot plasmacellen, T-helpercellen, cytotoxische T-cellen en geheugencellen).</p><p>Het werkt op twee manieren: met <b>antistoffen</b> die in het bloed ziekteverwekkers binden, en met <b>cellen</b> die lichaamscellen opruimen waarin een virus zit. Zoek in je boek bij elke lymfocyt op wat hij doet.</p>`,
  films:[F.afw2,F.afw3]});
E.zet(T,[20],{titel:"Herkenning van een antigeen",
  html:`<p>Een antistof of de receptor van een afweercel herkent een antigeen doordat hun <b>vormen precies op elkaar passen</b>, als een sleutel in een slot. Dan binden ze.</p><p>De vorm van een eiwit hangt af van de volgorde van zijn aminozuren, en die volgorde ligt vast in het erfelijk materiaal.</p>`,
  films:[F.afw2,F.dna5]});
E.zet(T,[21],{titel:"Een goede controlegroep",
  html:`<p>Met een <b>controlegroep</b> laat je zien dat een effect echt door de onderzochte factor komt. De controlegroep verschilt daarom maar in één ding van de onderzoeksgroep: de factor die je onderzoekt.</p><p>Alle andere factoren die invloed kunnen hebben (leeftijd, geslacht, leefstijl, gezondheid) moeten in beide groepen gemiddeld gelijk zijn. Anders kan een verschil in uitkomst ook door die andere factor komen.</p>`,
  films:[F.onderz,F.kun]});
E.zet(T,[22],{titel:"Ademhalingsspieren",
  html:`<p><b>Inademen</b>: het middenrif trekt samen en wordt platter, de buitenste tussenribspieren trekken de ribben omhoog. De borstholte wordt groter, de druk lager, en lucht stroomt naar binnen.</p><p><b>Rustig uitademen</b> gaat bijna vanzelf: de spieren ontspannen en de borstkas veert terug. Bij <b>geforceerd uitademen</b> (blazen, hoesten) helpen extra spieren actief mee om de borstholte kleiner te maken.</p><p>Let op: een spier kan alleen trekken. Wordt een spier slap, dan doet hij niets meer.</p>`,
  films:[F.gas1]});
E.zet(T,[23],{titel:"Delen van de hersenen",
  html:`<ul><li><b>grote hersenen</b>: de schors met de groeven en windingen; hier word je je bewust van wat je voelt en neem je bewuste besluiten;</li><li><b>kleine hersenen</b>: achteraan onder de grote hersenen, met een boomachtige tekening; coördinatie en evenwicht;</li><li><b>hersenstam</b> (met het verlengde merg): de verbinding met het ruggenmerg; automatische regelingen van levensfuncties, zoals de hartslag;</li><li><b>hypothalamus</b>: onder in het midden; regelt onder andere temperatuur en dorst.</li></ul>`,
  films:[F.zen5]});

/* ===== opgave 5 ===== */
E.zet(T,[24],{titel:"Trofische niveaus in een voedselweb",
  html:`<p>Een <b>trofisch niveau</b> is de plaats in een voedselketen: producenten (planten), consumenten van de 1e orde (planteneters), van de 2e orde (eten planteneters), enzovoort. Een pijl wijst van wat gegeten wordt naar wie het eet.</p><p>In een voedselweb kan een organisme in meerdere ketens zitten, en dan ook op meerdere niveaus. Volg elke pijl die naar het organisme toe wijst terug tot een producent en tel de stappen.</p>`,
  films:[F.eco3]});
E.zet(T,[25],{titel:"Functies van voedingsstoffen",
  html:`<ul><li><b>koolhydraten</b> en <b>vetten</b>: vooral brandstof (energie); vet is ook een reservestof;</li><li><b>eiwitten</b>: vooral <b>bouwstof</b>; ze leveren aminozuren voor nieuwe cellen, spieren en enzymen;</li><li>mineralen en vitamines: kleine hoeveelheden, nodig voor veel processen.</li></ul>`,
  films:[F.voed1]});
E.zet(T,[26],{titel:"Relaties tussen soorten",
  html:`<ul><li><b>mutualisme</b>: beide soorten hebben voordeel;</li><li><b>commensalisme</b>: de een heeft voordeel, de ander geen voordeel en geen nadeel;</li><li><b>parasitisme</b>: de een (parasiet) leeft op of in de ander (gastheer) en heeft voordeel, de gastheer nadeel; meestal gaat de gastheer niet direct dood;</li><li><b>predatie</b>: een roofdier doodt en eet zijn prooi.</li></ul>`,
  films:[F.eco3]});
E.zet(T,[27],{titel:"Een hypothese toetsen",
  html:`<p>Een <b>hypothese</b> is een verwachte uitkomst die je kunt toetsen. Om hem te toetsen gebruik je alleen de resultaten die er echt iets over zeggen: let op <b>wie</b> en <b>wanneer</b> de hypothese gaat.</p><p>Het grootste verschil in een diagram is niet altijd het belangrijkste. Vraag je af: gaat dit deel van het diagram over de situatie uit de hypothese?</p>`,
  films:[F.onderz]});

/* ===== opgave 6 ===== */
E.zet(T,[28],{titel:"Stikstofverbindingen en eutrofiëring",
  html:`<p>Ureum is een stikstofverbinding in urine. Een enzym (urease) zet ureum om in <b>ammoniak</b>. Ammoniak kan verdampen, met de wind meegaan en elders neerslaan.</p><p>Te veel stikstof in de natuur maakt de bodem voedselrijk: <b>eutrofiëring</b>. Planten die van veel voedingsstoffen houden, nemen dan de plaats in van soorten die op arme grond groeien.</p>`,
  films:[F.eco7]});
E.zet(T,[29],{titel:"Reflexen",
  html:`<p>Een <b>reflex</b> is een snelle, automatische reactie op een prikkel. De impuls loopt via een <b>reflexboog</b>: zintuig → sensorische zenuwcel → schakelcel → motorische zenuwcel → spier.</p><p>Er zijn <b>ruggenmergreflexen</b> en <b>hersenstamreflexen</b>. Bij elke reflex kun je nagaan waar de schakelcel en de cellichamen van de zenuwcellen liggen, en welke spier wat doet.</p>`,
  films:[F.zen1,F.zen2]});
E.zet(T,[30],{titel:"Producenten en consumenten",
  html:`<p><b>Producenten</b> maken zelf organische stoffen uit anorganische stoffen (CO<sub>2</sub> en water), met energie uit licht: fotosynthese. Ze zijn <b>autotroof</b>.</p><p><b>Consumenten</b> kunnen dat niet: ze halen hun organische stoffen uit ander organisch materiaal (heterotroof). Een organisme kan ook mineralen (zoals stikstofverbindingen) uit andere bronnen halen; dat maakt het nog geen consument.</p>`,
  films:[F.groen,F.eco3]});
E.zet(T,[31],{titel:"Wetenschappelijke namen",
  html:`<p>Elke soort heeft een wetenschappelijke naam uit twee delen (Linnaeus), schuingedrukt:</p><ul><li>het eerste deel, met hoofdletter, is het <b>geslacht</b> (genus);</li><li>de twee delen samen zijn de naam van de <b>soort</b>.</li></ul><p>Voorbeeld: de mens heet <i>Homo sapiens</i>.</p>`,
  films:[F.evo8]});
E.zet(T,[32],{titel:"Conclusies uit een diagram",
  html:`<p>Een conclusie mag je alleen trekken als het onderzoek er de gegevens voor geeft. Controleer steeds:</p><ul><li>Zijn de verschillen duidelijk en steeds in dezelfde richting, of lopen de lijnen door elkaar?</li><li>Een <b>optimum</b> is de waarde waarbij een uitkomst het hoogst is; dat moet dan wel steeds zo zijn.</li><li>Een <b>verband</b> is er als de uitkomst verandert wanneer de factor verandert.</li><li>Gaat de conclusie over dezelfde soort, hetzelfde gebied en dezelfde factor als het onderzoek?</li></ul>`,
  films:[F.onderz,F.kun]});
E.zet(T,[33],{titel:"Tolerantie en concurrentie",
  html:`<p>Elke soort kan alleen leven tussen zijn <b>tolerantiegrenzen</b> voor een milieufactor. Maar ook binnen die grenzen kan een soort verdwijnen: door <b>concurrentie</b> met een andere soort die dezelfde hulpbronnen gebruikt (licht, water, voedingsstoffen, ruimte).</p>`,
  films:[F.eco2,F.eco7]});

/* ===== opgave 7 ===== */
E.zet(T,[34],{titel:"Biotische en abiotische factoren",
  html:`<ul><li><b>abiotisch</b> = niet-levend: temperatuur, licht, neerslag, luchtvochtigheid, wind, bodem;</li><li><b>biotisch</b> = levend: voedsel, predatoren, ziekteverwekkers, concurrenten, soortgenoten.</li></ul><p>Een soort kan zich in een nieuw gebied vestigen als de milieufactoren daar binnen zijn tolerantiegrenzen liggen. Bij ‘verklaar aan de hand van…’ noem je niet alleen de factor, maar ook waarom die gunstig is.</p>`,
  films:[F.eco2,F.eco1]});
E.zet(T,[35],{titel:"Soortvorming",
  html:`<p>Een <b>soort</b> is een groep organismen die samen vruchtbare nakomelingen kunnen krijgen. Raken populaties van elkaar gescheiden (bijvoorbeeld door een zee), dan wisselen ze geen allelen meer uit. In elke populatie ontstaan andere mutaties en werken toeval en selectie anders.</p><p>Pas als de verschillen zo groot zijn dat ze geen vruchtbare nakomelingen meer kunnen krijgen, spreek je van twee soorten.</p>`,
  films:[F.evo6]});
E.zet(T,[36],{titel:"Waar komen genetische verschillen vandaan?",
  html:`<p>De allelfrequenties in een populatie veranderen door:</p><ul><li><b>natuurlijke selectie</b>: dragers van bepaalde allelen overleven en planten zich beter voort (hogere fitness);</li><li><b>toeval</b>, zoals het <b>stichtereffect</b>: een kleine groep begint een nieuwe populatie, met toevallig andere allelfrequenties dan de oorspronkelijke populatie;</li><li><b>mutatie</b> en <b>uitwisseling</b> met andere populaties.</li></ul>`,
  films:[F.evo2,F.evo5]});
E.zet(T,[37],{titel:"Temperatuur en enzymen",
  html:`<p>Bijna alle reacties in een cel worden versneld door <b>enzymen</b>. Bij een hogere temperatuur bewegen moleculen sneller en botsen enzym en substraat vaker, tot het <b>optimum</b>. Boven het optimum verandert het enzym van vorm en werkt het steeds slechter.</p><p>Een <b>koudbloedig</b> dier heeft ongeveer de temperatuur van zijn omgeving en kan die alleen regelen met zijn gedrag (zonnen, schaduw zoeken) of zijn kleur.</p>`,
  anim:anim(caps(["Koud: moleculen bewegen langzaam, weinig botsingen.","Warmer: meer botsingen, de reactie gaat sneller.","Bij het optimum werkt het enzym het best.","Veel te warm: het enzym verandert van vorm en werkt slechter."]),i=>enzym(i)),
  films:[F.versneld]});
E.zet(T,[38],{titel:"Zenuwstelsel en hormoonstelsel",
  html:`<p>Het lichaam heeft twee communicatiesystemen. Het <b>zenuwstelsel</b> stuurt elektrische impulsen langs zenuwcellen, rechtstreeks naar één spier of klier. Het <b>hormoonstelsel</b> geeft hormonen af aan het bloed; die worden door het hele lichaam vervoerd en werken op alle cellen met een passende receptor.</p><p>Vergelijk zelf: hoe lang duurt het voordat het signaal er is, hoe lang werkt het en hoe gericht is het?</p>`,
  films:[F.hor1,F.zen2]});
E.zet(T,[39],{titel:"Een stamboom lezen",
  html:`<p>In een stamboom staan de groepen van nu aan de <b>uiteinden</b> van de takken. Elke <b>splitsing</b> is een gemeenschappelijke voorouder. Hoe recenter twee groepen een voorouder delen, hoe nauwer ze verwant zijn.</p><p>Met een tijdas lees je af wanneer een splitsing plaatsvond; in je informatieboek zoek je op welke geologische periode dat was.</p>`,
  films:[F.evo8,F.evo1]});

/* ===== opgave 8 ===== */
E.zet(T,[40],{titel:"Terugkoppeling: osmotische waarde en dorst",
  html:`<p>De <b>osmotische waarde</b> van het bloed hangt af van de hoeveelheid opgeloste deeltjes: hoe meer deeltjes, hoe hoger. Het lichaam houdt die waarde constant met <b>negatieve terugkoppeling</b>: een receptor meet een afwijking, een centrum stuurt een reactie aan, en die reactie brengt de waarde terug.</p><p><b>Osmoreceptoren</b> in de hypothalamus meten de osmotische waarde. Het <b>dorstcentrum</b> (ook in de hypothalamus) zorgt voor dorstgevoel; daarnaast regelt ADH hoeveel water de nieren terughalen.</p>`,
  anim:anim(caps(["Een waarde wijkt af van de normwaarde.","Receptoren meten de afwijking.","Een centrum geeft een signaal.","Een effector reageert.","Daardoor gaat de waarde terug naar normaal."]),i=>kring(i)),
  films:[F.hor5,F.gas3]});
E.zet(T,[41],{titel:"Urine maken: filtratie en terugresorptie",
  html:`<p>In de nieren wordt eerst veel <b>voorurine</b> gemaakt door filtratie in het kapsel van Bowman. Daarna haalt het nierbuisje het meeste water en de nuttige stoffen weer terug in het bloed: <b>terugresorptie</b> (reabsorptie).</p><p>De <b>dichtheid</b> van een oplossing is hoger naarmate er meer stoffen in opgelost zijn. Zuiver water heeft de laagste dichtheid.</p>`,
  films:[F.gas3,F.hor5]});
E.zet(T,[42],{titel:"De weg van het bloed",
  html:`<ul><li>Naar de lever toe: <b>poortader</b> (vanuit darmen) en <b>leverslagader</b>; van de lever af: <b>leverader</b>.</li><li>Bloed uit de onderste helft van het lichaam gaat via de <b>onderste holle ader</b> naar de rechterboezem, uit het hoofd en de armen via de <b>bovenste holle ader</b>.</li><li>Rechterkamer → <b>longslagader</b> → longen → <b>longaders</b> → linkerboezem.</li><li>Linkerkamer → <b>aorta</b> → slagaders naar de organen.</li></ul>`,
  films:[F.pomp,F.voed5]});
E.zet(T,[43],{titel:"De niereenheid",
  html:`<p>Een <b>niereenheid</b> (nefron) begint met een <b>glomerulus</b>: een kluwen haarvaten. Daaromheen ligt het <b>kapsel van Bowman</b>, een dubbelwandige beker die de voorurine opvangt. Vanuit het kapsel loopt het <b>nierbuisje</b> verder.</p><p>Een doorsnede laat alleen zien wat er op die hoogte ligt.</p>`,
  films:[F.gas3]});
E.zet(T,[44],{titel:"Eiwitten en ureum",
  html:`<p>Eiwitten worden in het spijsverteringskanaal verteerd tot hun bouwstenen, die in de dunne darm worden opgenomen in het bloed. Het lichaam kan een overschot aan die bouwstenen niet opslaan.</p><p>Bij de afbraak ervan ontstaat eerst <b>ammoniak</b>, dat giftig is. Dat wordt in één orgaan omgezet in het minder giftige <b>ureum</b>. Ureum gaat met het bloed naar de nieren, die het uitscheiden met de urine.</p>`,
  films:[F.voed3,F.voed5]});
})();
