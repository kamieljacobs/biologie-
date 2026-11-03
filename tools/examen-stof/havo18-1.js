/* Uitleg van de stof · oefenexamen havo 2018-I (tool havo18-1). Gekopieerd naar tools/examen-stof/havo18-1.js door samenvoegen.py. */
(function(){
"use strict";
if(!window.EXSTOF)return;
const E=window.EXSTOF,T="havo18-1";
const anim=(steps,draw)=>box=>E.stappen(box,steps,(st,s,i)=>{st.innerHTML=draw(i,s);});
const caps=a=>a.map(c=>({cap:c}));
const F={
  stof3:["Alles in het groen","films/stofwisseling/3-alles-in-het-groen.html"],eco4:["Waar blijft het blad?","films/ecologie/4-waar-blijft-het-blad.html"],
  eco2:["Waar past een soort?","films/ecologie/2-waar-past-een-soort.html"],eco3:["Wie eet wie?","films/ecologie/3-wie-eet-wie.html"],eco5:["Waarom zo weinig roofdieren?","films/ecologie/5-waarom-zo-weinig-roofdieren.html"],
  eco7:["Stikstof gaat rond","films/ecologie/7-stikstof-gaat-rond.html"],eco1:["Hoeveel passen er?","films/ecologie/1-hoeveel-passen-er.html"],eco5b:["Binnen de grenzen","films/ecologie/5-binnen-de-grenzen.html"],
  afw1:["De eerste verdediging","films/afweer/1-de-eerste-verdediging.html"],afw2:["Antistoffen op maat","films/afweer/2-antistoffen-op-maat.html"],
  erf2:["Monohybride kruisingen","films/erfelijkheid/2-monohybride-kruisingen.html"],onderz:["Onderzoek doen","films/cellen/onderzoek-doen/index.html"],enz:["Alles versneld","films/stofwisseling/1-alles-versneld.html"],
  adem:["Adem in, adem uit","films/gaswisseling/1-adem-in-adem-uit.html"],bloed:["Wat er in je bloed zit","films/transport/3-wat-er-in-je-bloed-zit.html"],dna1:["Wat is DNA?","films/dna/1-wat-is-dna.html"],
  zen5:["Het hoofdkantoor","films/zenuwstelsel/5-het-hoofdkantoor.html"],zen1:["Een seconde","films/zenuwstelsel/1-een-seconde.html"],zen2:["Het kabelnetwerk","films/zenuwstelsel/2-het-kabelnetwerk.html"],zen3:["De spleet","films/zenuwstelsel/3-de-spleet.html"],
  stof2:["Alles op adem","films/stofwisseling/2-alles-op-adem.html"],vertrouw:["Kun je onderzoek vertrouwen?","films/extra/kun-je-onderzoek-vertrouwen.html"],
  evo2:["Natuurlijke selectie","films/evolutie/2-natuurlijke-selectie.html"],evo4:["De mens als selectiefactor","films/evolutie/4-de-mens-als-selectiefactor.html"],evo6:["Hoe één soort er twee wordt","films/evolutie/6-hoe-een-soort-er-twee-wordt.html"],evo7:["Hoe weten we dat?","films/evolutie/7-hoe-weten-we-dat.html"],evo8:["Stambomen lezen","films/evolutie/8-stambomen-lezen.html"],
  plant:["Transport in planten","films/transport/6-transport-in-planten.html"],cel:["Celdeling","films/voortplanting/celdeling/index.html"],
  dna3:["Van DNA naar eiwit","films/dna/3-van-dna-naar-eiwit.html"],dna5:["Mutaties","films/dna/5-mutaties.html"],
  pomp:["Eén pomp, twee rondjes","films/transport/1-een-pomp-twee-rondjes.html"],buis:["Buizen onder druk","films/transport/2-buizen-onder-druk.html"],hor4:["Stress","films/hormonen/4-stress.html"],hor2:["Suiker in balans","films/hormonen/2-suiker-in-balans.html"],uitsch:["Uitscheiding en evenwicht","films/gaswisseling/3-uitscheiding-en-evenwicht.html"],
  voed2:["De reis door je buik","films/voeding/2-de-reis-door-je-buik.html"],voed3:["Knippen op maat","films/voeding/3-knippen-op-maat.html"],voed4:["Van darm naar bloed","films/voeding/4-van-darm-naar-bloed.html"],darm:["Je darmbewoners","films/voeding/6-je-darmbewoners.html"],microben:["Wat groeit er op je boterham?","films/cellen/microben.html"]};

/* ===== opgave 1 · Rifbollen ===== */
function licht(i){let g="";for(let k=0;k<5;k++){const y=20+k*30,o=Math.max(.08,1-k*.22);g+=`<rect x="20" y="${y}" width="300" height="30" fill="var(--goud)" opacity="${(i>=k?o:0)*.6}"/><text class="lblm" x="330" y="${y+20}">${k*2} – ${k*2+2} m</text>`;}
  g+=`<text class="lblm" x="20" y="185">${i<4?"licht dringt dieper door …":"hoe dieper, hoe minder licht"}</text>`;return E.svg("0 0 420 195",g,"Licht in water neemt af met de diepte");}
E.zet(T,[1],{titel:"Fotosynthese en licht onder water",
  html:`<p>Planten en wieren zijn <b>producenten</b>: ze maken met <b>fotosynthese</b> glucose uit koolstofdioxide en water. De energie daarvoor halen ze uit <b>licht</b>. Zonder genoeg glucose kan een plant geen nieuwe stoffen maken om te groeien.</p><p>Water laat licht maar gedeeltelijk door: een deel wordt geabsorbeerd of verstrooid door water, slib en plankton.</p>`,
  anim:anim(caps(["Aan het oppervlak is het licht.","Een paar meter dieper …","… komt al minder licht aan …","… en nog minder …","Hoe dieper, hoe minder licht er overblijft."]),licht),films:[F.stof3]});
E.zet(T,[2],{titel:"Optimumkromme",
  html:`<p>Een <b>optimumkromme</b> laat zien hoe een organisme reageert op een abiotische factor. Er is een <b>minimum</b> (daaronder geen groei), een <b>optimum</b> (de beste groei) en een <b>maximum</b> (daarboven geen groei). Tussen minimum en maximum ligt het <b>tolerantiegebied</b>.</p><p>Lees bij zo’n vraag eerst in de tekst of de factor laag, optimaal of hoog is, en of de organismen nog groeien.</p>`,films:[F.eco2]});
E.zet(T,[3],{titel:"Afbraak en mineralen",
  html:`<p><b>Reducenten</b> (bacteriën en schimmels) breken dode organische stoffen af. Daarbij komen <b>anorganische stoffen</b> vrij, zoals CO<sub>2</sub>, water en mineralen (ammonium, nitraat, fosfaat).</p><p>Producenten nemen mineralen op uit hun omgeving om er zelf organische stoffen van te maken. Zo zijn afbraak en opbouw met elkaar verbonden in de <b>kringloop</b> van stoffen.</p>`,films:[F.eco4,F.eco7]});
E.zet(T,[4],{titel:"Trofische niveaus en de piramide van biomassa",
  html:`<p>In een voedselketen staat elk organisme op een <b>trofisch niveau</b>:</p><ul><li><b>P</b> producenten (planten, wieren, algen);</li><li><b>C1</b> consumenten van de eerste orde: eten producenten;</li><li><b>C2</b> consumenten van de tweede orde: eten C1, enzovoort.</li></ul><p>Een dier dat zowel planten als dieren eet, hoort op meer dan één niveau. In een <b>piramide van biomassa</b> wordt elke laag smaller, omdat bij elke stap energie verloren gaat.</p>`,films:[F.eco3,F.eco5]});
E.zet(T,[5],{titel:"Habitat en ecosysteem",
  html:`<p>De <b>habitat</b> van een soort is de plek waar die soort leeft, met de omstandigheden die hij nodig heeft. Komen er meer geschikte plekken bij, dan wordt de habitat groter.</p><p>Een <b>ecosysteem</b> bestaat uit alle organismen in een gebied samen met de abiotische factoren. Verandert de bodem, dan verandert welke soorten er kunnen leven.</p>`,films:[F.eco2]});

/* ===== opgave 2 · CF ===== */
E.zet(T,[6],{titel:"Aspecifieke en specifieke afweer",
  html:`<p><b>Aspecifieke afweer</b> werkt tegen alle ziekteverwekkers op dezelfde manier en is er altijd: huid, slijm en trilharen, maagzuur, enzymen zoals lysozym, fagocyten (macrofagen) en ontstekingsreacties.</p><p><b>Specifieke afweer</b> is gericht tegen één bepaald antigeen en moet eerst op gang komen: T-lymfocyten en B-lymfocyten (en de antistoffen die B-cellen maken). Daarbij ontstaan geheugencellen.</p>`,films:[F.afw1,F.afw2]});
E.zet(T,[7],{titel:"Monohybride kruising met een recessief allel",
  html:`<p>Bij een autosomaal <b>recessief</b> allel (a) is alleen <b>aa</b> ziek. <b>Aa</b> is gezond maar <b>drager</b>, <b>AA</b> is gezond en homozygoot.</p><p>Elke ouder geeft één van zijn twee allelen door. Wil je weten welke genotypen de nakomelingen kunnen hebben, zet dan de geslachtscellen van beide ouders in een kruisingsschema.</p>`,films:[F.erf2]});
E.zet(T,[8],{titel:"Een hypothese toetsen",
  html:`<p>Een <b>hypothese</b> is een mogelijk antwoord op de onderzoeksvraag. Om te kijken welk resultaat de hypothese steunt:</p><ul><li>bepaal per groep welke factor verschilt (hier de pH);</li><li>voorspel per groep wat je verwacht <b>als de hypothese klopt</b>;</li><li>zoek het resultaat dat bij die voorspelling past.</li></ul><p>CO<sub>2</sub> in water maakt het zuurder, NaHCO<sub>3</sub> (natriumwaterstofcarbonaat) maakt het minder zuur.</p>`,films:[F.onderz]});
E.zet(T,[9],{titel:"Enzymen en de pH",
  html:`<p>Een <b>enzym</b> is een eiwit met een precieze ruimtelijke vorm. Het substraat past in het <b>actieve centrum</b>.</p><p>Elk enzym heeft een <b>optimum-pH</b>. Bij een andere pH verandert de vorm van het eiwit een beetje, waardoor het substraat minder goed past. Bij extreme waarden gaat het enzym kapot (denaturatie).</p>`,films:[F.enz]});
E.zet(T,[10],{titel:"Van proefdier naar mens",
  html:`<p>Nieuwe medicijnen worden eerst getest in het laboratorium en bij proefdieren. Daarna volgen onderzoeken bij mensen. Proefdieren lijken op de mens, maar verschillen in bijvoorbeeld bouw van eiwitten, stofwisseling, gevoeligheid voor bijwerkingen en grootte. Wat bij een dier werkt, werkt daarom niet altijd hetzelfde bij een mens.</p>`,films:[F.onderz]});
E.zet(T,[11],{titel:"De luchtwegen",
  html:`<p>De <b>luchtwegen</b> zijn alle buizen en holtes waar lucht doorheen gaat, van de neus- of mondholte tot aan de longblaasjes. In de borstholte vertakken ze zich als een omgekeerde boom in steeds kleinere buisjes. In de <b>longblaasjes</b> zelf vindt de gaswisseling plaats.</p><p>Zoek de afbeelding van het ademhalingsstelsel op in je boek of informatieboek en noem de delen in de volgorde waarin de lucht ze passeert.</p>`,films:[F.adem]});
E.zet(T,[12],{titel:"Bloedcellen en DNA",
  html:`<p>Het DNA van een menselijke cel ligt vooral in de <b>celkern</b> (een klein deel in de mitochondriën).</p><ul><li><b>Rode bloedcellen</b> verliezen bij het rijpen hun kern en mitochondriën.</li><li><b>Bloedplaatjes</b> zijn stukjes van grote cellen in het beenmerg, zonder kern.</li><li><b>Witte bloedcellen</b> zijn complete cellen met een kern.</li></ul>`,films:[F.bloed,F.dna1]});
E.zet(T,[13],{titel:"Behandelen of genezen",
  html:`<p>Bij een <b>erfelijke ziekte</b> zit het afwijkende allel in het DNA van (bijna) alle lichaamscellen. Een behandeling die alleen de <b>gevolgen</b> bestrijdt, moet steeds herhaald worden. <b>Genezen</b> betekent dat de oorzaak wordt weggenomen.</p>`,films:[F.dna5]});

/* ===== opgave 3 · fMRI ===== */
E.zet(T,[14],{titel:"De delen van de hersenen",
  html:`<ul><li><b>Grote hersenen</b> (hersenschors): bewuste waarneming, denken, taal, geheugen, herkennen, plannen en gedrag.</li><li><b>Kleine hersenen</b>: coördinatie van bewegingen en evenwicht.</li><li><b>Hersenstam</b>: onbewuste levensfuncties, zoals ademhaling, hartslag en bloeddruk.</li></ul>`,films:[F.zen5]});
E.zet(T,[15],{titel:"Bloed en stofwisseling in de hersenen",
  html:`<p>Zenuwcellen gebruiken veel <b>energie</b>, onder andere om na een impuls ionen terug te pompen. Die energie komt uit <b>ATP</b>, dat ontstaat bij de <b>dissimilatie</b> van glucose in de mitochondriën.</p><p>Het <b>bloed</b> vervoert stoffen van en naar de organen: voedingsstoffen, gassen, hormonen en afvalstoffen. Zoek bij elke stof op waar hij gemaakt wordt en of hij de cel kan verlaten.</p>`,films:[F.zen3,F.stof2]});
E.zet(T,[16],{titel:"Hoe klein is een zenuwcel?",
  html:`<p>Een paar maten om te onthouden:</p><ul><li>cellichaam van een zenuwcel: ongeveer 0,01 – 0,1 mm;</li><li>dikte van een axon: ongeveer 0,001 mm (1 µm) of minder;</li><li>synapsspleet: ongeveer 20 nm.</li></ul><p>Een gebiedje van een paar millimeter hersenschors bevat al heel veel zenuwcellen.</p>`,films:[F.zen2]});
E.zet(T,[17],{titel:"Drie soorten zenuwcellen",
  html:`<ul><li><b>Sensorische</b> zenuwcellen: van zintuig naar het centrale zenuwstelsel.</li><li><b>Schakelcellen</b>: binnen het centrale zenuwstelsel, verwerken en verbinden.</li><li><b>Motorische</b> zenuwcellen: van het centrale zenuwstelsel naar spieren of klieren.</li></ul><p>Vraag je bij een opdracht steeds af: wordt er iets waargenomen, verwerkt en/of uitgevoerd?</p>`,films:[F.zen1]});
E.zet(T,[18],{titel:"Betrouwbaarheid en validiteit",
  html:`<p><b>Betrouwbaar</b>: de invloed van <b>toeval</b> is klein. Je herhaalt metingen en gebruikt genoeg proefpersonen, zodat één uitschieter de uitkomst niet bepaalt.</p><p><b>Valide</b>: je meet wat je wilt meten, zonder <b>systematische fouten</b>. Daarvoor heb je een goede opzet nodig, zoals een controlegroep die maar in één factor verschilt.</p>`,films:[F.onderz,F.vertrouw]});

/* ===== opgave 4 · Bananen ===== */
E.zet(T,[19],{titel:"Ongeslachtelijke voortplanting en variatie",
  html:`<p>Bij <b>ongeslachtelijke voortplanting</b> ontstaan nakomelingen door mitose: ze hebben hetzelfde DNA als de ouder. Een groep genetisch gelijke individuen heet een <b>kloon</b>.</p><p>Bij <b>geslachtelijke voortplanting</b> ontstaat juist <b>genetische variatie</b> door recombinatie. Variatie maakt een populatie beter bestand tegen veranderingen in het milieu.</p>`,films:[F.cel,F.evo2]});
E.zet(T,[20],{titel:"Transport in een plant",
  html:`<ul><li><b>Houtvaten</b> vervoeren water met opgeloste mineralen van de wortels omhoog naar stengel en bladeren.</li><li><b>Bastvaten</b> vervoeren opgeloste organische stoffen (vooral suikers) van de bladeren naar de rest van de plant.</li></ul><p>Plantencellen blijven stevig door de druk van water in de vacuole (turgor).</p>`,films:[F.plant]});
E.zet(T,[21],{titel:"Duurzaamheid",
  html:`<p>Iets is <b>duurzaam</b> als het de behoeften van nu vervult zonder de aarde voor later uit te putten of te vervuilen. Denk bij voedsel aan:</p><ul><li>het gebruik van bestrijdingsmiddelen en kunstmest;</li><li>energie en CO<sub>2</sub>-uitstoot bij productie en <b>transport</b>;</li><li>of de <b>kringlopen</b> van stoffen gesloten zijn: blijven mineralen in het gebied?</li></ul>`,films:[F.eco5b]});
E.zet(T,[22],{titel:"Natuurlijke selectie",
  html:`<p>Natuurlijke selectie verloopt altijd in dezelfde stappen:</p><ul><li>door <b>mutatie</b> (en recombinatie) verschillen individuen erfelijk van elkaar;</li><li>sommige varianten passen beter bij het milieu en <b>overleven</b> vaker;</li><li>zij krijgen <b>meer nakomelingen</b> (hogere fitness) en geven hun allelen vaker door;</li><li>over vele generaties komt de gunstige eigenschap steeds vaker voor.</li></ul><p>Een individu verandert zelf niet ‘omdat het moet’: selectie werkt op verschillen die er al zijn.</p>`,films:[F.evo2,F.evo4]});
E.zet(T,[23],{titel:"Veredeling en genetische modificatie",
  html:`<p>Bij <b>klassieke veredeling</b> kruis je planten met gewenste eigenschappen: stuifmeel van de ene plant bevrucht de eicel van de andere. Dat is <b>geslachtelijke voortplanting</b>.</p><p>Bij <b>genetische modificatie</b> breng je een gen rechtstreeks in het DNA van een organisme, zonder kruisen.</p><p>Voor geslachtelijke voortplanting moeten bij de meiose de chromosomen netjes in paren uit elkaar gaan. Met een oneven aantal chromosoomsets lukt dat niet goed.</p>`,films:[F.cel]});

/* ===== opgave 5 · Meeroken ===== */
E.zet(T,[24],{titel:"Ademhalingsspieren en luchtwegen",
  html:`<p><b>Inademen</b>: het middenrif trekt samen (wordt platter) en/of de tussenribspieren tillen de ribben op. De borstholte wordt groter en lucht stroomt naar binnen.</p><p>Ook in de wand van de luchtwegen ligt spierweefsel: <b>glad spierweefsel</b> in een kring rond de buis. Dat werkt onbewust.</p>`,films:[F.adem]});
E.zet(T,[25],{titel:"Mutaties",
  html:`<p>Een <b>mutatie</b> is een verandering in het DNA. Mutaties ontstaan spontaan (kopieerfoutjes) of door <b>mutagene</b> invloeden, zoals uv-straling, röntgenstraling en bepaalde chemische stoffen. Een mutagene stof die kanker kan veroorzaken heet <b>carcinogeen</b>.</p>`,films:[F.dna5]});
E.zet(T,[26],{titel:"De dubbele bloedsomloop",
  html:`<p>Bloed gaat in twee rondjes door het hart:</p><ul><li><b>kleine bloedsomloop</b>: rechterkamer → longslagader → longen → longaders → linkerboezem;</li><li><b>grote bloedsomloop</b>: linkerkamer → aorta → organen (ook de hersenen) → holle aders → rechterboezem.</li></ul><p>Een stof die ergens in het lichaam in het bloed komt, kun je zo volgen: tel steeds hoe vaak hij door het hart gaat.</p>`,films:[F.pomp,F.buis]});
E.zet(T,[27],{titel:"Orthosympatisch zenuwstelsel en bijnieren",
  html:`<p>Het <b>orthosympatisch</b> zenuwstelsel maakt het lichaam klaar voor actie. Het stimuleert ook het <b>bijniermerg</b>, dat dan een hormoon aan het bloed afgeeft dat dezelfde effecten versterkt.</p><p>De <b>bloeddruk</b> hangt af van hoeveel bloed het hart per minuut rondpompt en van hoe wijd de bloedvaten zijn.</p>`,films:[F.hor4,F.buis]});
E.zet(T,[28],{titel:"Urinevorming in het nefron",
  html:`<ul><li><b>Ultrafiltratie</b>: in het kapsel van Bowman wordt water met kleine opgeloste stoffen uit het bloed geperst: voorurine.</li><li><b>Terugresorptie</b>: nuttige stoffen (glucose, zouten, veel water) gaan in de nierkanaaltjes terug naar het bloed, deels door actief transport.</li><li>Wat overblijft, wordt urine.</li></ul>`,films:[F.uitsch]});

/* ===== opgave 6 · Wolf en hond ===== */
E.zet(T,[29],{titel:"Hoe nieuwe soorten ontstaan",
  html:`<p>Voor het ontstaan van grote verschillen tussen populaties zijn drie dingen nodig:</p><ul><li><b>mutatie</b>: nieuwe erfelijke variatie;</li><li><b>selectie</b>: sommige varianten krijgen meer nakomelingen;</li><li>een factor die voorkomt dat de genen van de populaties zich weer <b>vermengen</b>.</li></ul><p>Zonder die laatste factor blijven twee groepen die met elkaar paren genetisch op elkaar lijken.</p>`,films:[F.evo6]});
E.zet(T,[30],{titel:"Soort, ras en fenotype",
  html:`<p>Een <b>soort</b> is een groep organismen die samen <b>vruchtbare nakomelingen</b> kunnen krijgen.</p><p>Een <b>ras</b> is een groep binnen een soort met kenmerkende erfelijke eigenschappen. Het <b>fenotype</b> is het geheel van waarneembare eigenschappen (uiterlijk, gedrag).</p><p>Bij geslachtelijke voortplanting krijgt elk individu een nieuwe combinatie van allelen. Alleen klonen en eeneiige tweelingen hebben (bijna) identiek DNA.</p>`,films:[F.evo6,F.erf2]});
E.zet(T,[31],{titel:"Van gen naar enzymwerking",
  html:`<p>Hoeveel van een enzym in een cel wordt gemaakt, hangt af van hoe vaak het gen wordt afgelezen en hoeveel kopieën van het gen er zijn. Hoe goed het enzym werkt, hangt af van de <b>bouw</b> van het enzym zelf (de aminozuurvolgorde).</p><p><b>Amylase</b> knipt zetmeel in kleinere stukken (maltose).</p>`,films:[F.voed3,F.dna3]});
E.zet(T,[32],{titel:"Eiwitsynthese",
  html:`<p>De eiwitsynthese verloopt in twee stappen:</p><ul><li><b>transcriptie</b> (in de kern): een gen wordt ‘afgelezen’ en overgeschreven;</li><li><b>translatie</b> (bij de ribosomen): de code wordt vertaald in een volgorde van aminozuren.</li></ul><p>Bij <b>replicatie</b> wordt het hele DNA gekopieerd, vóór de celdeling.</p>`,films:[F.dna3]});
E.zet(T,[33],{titel:"Insuline en de glucoseconcentratie",
  html:`<p>Na een maaltijd met koolhydraten worden zetmeel en suikers verteerd tot <b>glucose</b>, die in de dunne darm in het bloed wordt opgenomen. Stijgt de glucoseconcentratie in het bloed, dan geeft de <b>alvleesklier</b> <b>insuline</b> af. Insuline zorgt dat lichaamscellen glucose opnemen en dat de lever glucose omzet in glycogeen.</p><p>Hoe sneller de glucoseconcentratie stijgt, hoe sneller de alvleesklier reageert.</p>`,films:[F.hor2,F.voed4]});
E.zet(T,[34],{titel:"Homologie en analogie",
  html:`<p><b>Homologe</b> organen hebben dezelfde bouw omdat ze van een <b>gemeenschappelijke voorouder</b> komen, ook al hebben ze nu een andere functie (arm van een mens, vleugel van een vleermuis).</p><p><b>Analoge</b> organen of eigenschappen lijken op elkaar in functie, maar zijn bij verschillende soorten <b>los van elkaar</b> ontstaan doordat ze onder dezelfde omstandigheden leefden (vleugel van een vlinder en van een vogel).</p>`,films:[F.evo7]});

/* ===== opgave 7 · Poeptransplantatie ===== */
E.zet(T,[35,38],{titel:"Het spijsverteringskanaal",
  html:`<p>Volgorde: mondholte → keelholte → slokdarm → maag → <b>twaalfvingerige darm</b> (begin van de dunne darm) → rest van de dunne darm → blinde darm → dikke darm → endeldarm.</p><ul><li>In de <b>maag</b> is het zuur (pH ongeveer 2) door zoutzuur, dat veel bacteriën doodt.</li><li>In de <b>dunne darm</b> worden voedingsstoffen verteerd en opgenomen.</li><li>In de <b>dikke darm</b> wordt vooral water (en zouten) uit de darminhoud geresorbeerd; hier leven heel veel bacteriën.</li></ul>`,films:[F.voed2,F.darm]});
E.zet(T,[36,37],{titel:"Darmbacteriën en antibiotica",
  html:`<p>In je darm leven veel soorten bacteriën, die met elkaar <b>concurreren</b> om voedsel en ruimte. Zo houden ze elkaar in evenwicht.</p><p>Een <b>antibioticum</b> doodt bacteriën of remt hun groei. Het maakt geen onderscheid tussen ziekteverwekkers en nuttige bacteriën. Sommige bacteriën vormen <b>sporen</b>: rustvormen die ongunstige omstandigheden kunnen overleven.</p><p>Bacteriën die door een mutatie ongevoelig zijn voor een antibioticum, overleven een kuur en vermenigvuldigen zich.</p>`,films:[F.darm,F.evo4,F.microben]});
E.zet(T,[39],{titel:"Een behandeling vergelijken",
  html:`<p>Om te bepalen of een behandeling beter werkt, vergelijk je twee groepen patiënten die alleen in de behandeling verschillen. Je kiest vooraf een meetbare uitkomst, bijvoorbeeld hoeveel patiënten herstellen, hoe snel, of hoeveel van de ziekteverwekker er nog aanwezig is.</p>`,films:[F.onderz]});
E.zet(T,[40],{titel:"Abiotische factoren in de dikke darm",
  html:`<p>Elk deel van het spijsverteringskanaal heeft eigen omstandigheden. De <b>pH</b> verschilt sterk: zuur in de maag, ongeveer neutraal tot licht zuur verderop in de darm.</p><p>Bacteriën die <b>anaeroob</b> leven, groeien zonder zuurstof; voor sommige is zuurstof zelfs giftig. Aerobe bacteriën hebben zuurstof nodig.</p>`,films:[F.darm,F.microben]});

/* ===== opgave 8 · Vuursalamander ===== */
E.zet(T,[41],{titel:"Voedselketen en voedselweb",
  html:`<p>Een <b>voedselketen</b> is een rij organismen waarin elk organisme wordt gegeten door het volgende. Een keten begint altijd bij een <b>producent</b>.</p><p>De <b>pijlen</b> wijzen in de richting van de energiestroom: van het organisme dat gegeten wordt naar het organisme dat eet.</p><p>Een <b>voedselweb</b> bestaat uit meerdere voedselketens die met elkaar verbonden zijn.</p>`,films:[F.eco3]});
E.zet(T,[42],{titel:"Een lijngrafiek lezen",
  html:`<p>Bij een vraag over een grafiek: lees eerst wat er op de assen staat. Een <b>index</b> zet één jaar op 100; een index van 50 betekent de helft van dat jaar.</p><p>Controleer elke bewering apart met de grafiek: vergelijk waarden, zoek de grootste stijging of daling (het verschil tussen twee opeenvolgende punten) en tel hoeveel jaren een trend aanhoudt.</p>`,films:[F.eco1]});
E.zet(T,[43],{titel:"Populaties tellen",
  html:`<p>Een hele populatie tellen lukt bijna nooit. Onderzoekers tellen daarom op een beperkt aantal plekken of in een vaste periode: een <b>steekproef</b>. Uit de steekproef schatten ze de grootte of de ontwikkeling van de populatie. Bedenk bij zo’n telling altijd: wat zegt een uitkomst wel, en wat niet?</p>`,films:[F.eco1]});
E.zet(T,[44],{titel:"Bouw van ziekteverwekkers",
  html:`<ul><li><b>Virus</b>: geen cel; erfelijk materiaal (DNA of RNA) in een eiwitmantel.</li><li><b>Bacterie</b>: prokaryoot, geen kernmembraan, wel een celwand, DNA.</li><li><b>Eukaryoten</b> (planten, dieren, schimmels, eencelligen zoals de malariaparasiet): wel een kernmembraan, DNA. Of er een celwand is, verschilt per groep: zoek dat op voor schimmels.</li></ul>`,films:[F.microben]});
E.zet(T,[45],{titel:"Een evolutionaire stamboom lezen",
  html:`<p>In een evolutionaire stamboom is elke <b>splitsing</b> een gemeenschappelijke voorouder. Twee groepen zijn het nauwst verwant als ze de <b>meest recente</b> splitsing delen: volg de takken naar beneden tot ze samenkomen. Hoe nauwer verwant, hoe meer hun DNA overeenkomt.</p><p>Let op: hoe dicht twee namen naast elkaar staan, zegt niets; het gaat om waar de takken samenkomen.</p>`,films:[F.evo8]});
E.zet(T,[46],{titel:"Een bedreigde soort beschermen",
  html:`<p>Bij natuurbeheer van een bedreigde soort zoek je een maatregel die je echt kunt uitvoeren en die bijdraagt aan een doel: de oorzaak aanpakken, de soort veiligstellen of het aantal dieren laten groeien.</p><p>Een doel herhalen is nog geen maatregel: beschrijf wát de beheerder doet, en met welke dieren. Lees de doelen in de tekst terug en bedenk wat de detectietest mogelijk maakt.</p>`,films:[F.eco1]});
})();
