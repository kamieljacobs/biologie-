/* Uitleg van de stof · oefenexamen havo 2022-II (tool havo22-2). Gekopieerd naar tools/examen-stof/havo22-2.js door samenvoegen.py. */
(function(){
"use strict";
if(!window.EXSTOF)return;
const E=window.EXSTOF,T="havo22-2";
const anim=(steps,draw)=>box=>E.stappen(box,steps,(st,s,i)=>{st.innerHTML=draw(i,s);});
const caps=a=>a.map(c=>({cap:c}));
const F={
  bloed:["Wat er in je bloed zit","films/transport/3-wat-er-in-je-bloed-zit.html"],gas2:["Gas op reis","films/gaswisseling/2-gas-op-reis.html"],adem2:["Alles op adem","films/stofwisseling/2-alles-op-adem.html"],
  dna6:["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"],darm4:["Van darm naar bloed","films/voeding/4-van-darm-naar-bloed.html"],diff:["Diffusie en osmose","films/cellen/diffusie-osmose/index.html"],
  buizen:["Buizen onder druk","films/transport/2-buizen-onder-druk.html"],uitsch:["Uitscheiding en evenwicht","films/gaswisseling/3-uitscheiding-en-evenwicht.html"],water:["Water in balans","films/hormonen/5-water-in-balans.html"],
  plant7:["Hoe een plant groeit","films/transport/7-hoe-een-plant-groeit.html"],plant6:["Transport in planten","films/transport/6-transport-in-planten.html"],eco2:["Waar past een soort?","films/ecologie/2-waar-past-een-soort.html"],eco3:["Wie eet wie?","films/ecologie/3-wie-eet-wie.html"],
  microben:["Wat groeit er op je boterham?","films/cellen/microben.html"],stam:["Stamcellen","films/cellen/stamcellen.html"],post:["Post voor iedereen","films/hormonen/1-post-voor-iedereen.html"],baas:["De baas van de klieren","films/hormonen/3-de-baas-van-de-klieren.html"],
  afw1:["De eerste verdediging","films/afweer/1-de-eerste-verdediging.html"],afw2:["Antistoffen op maat","films/afweer/2-antistoffen-op-maat.html"],afw4:["Vaccins, allergie en bloedgroepen","films/afweer/4-vaccins-allergie-en-bloedgroepen.html"],
  voed1:["Wat zit er in je eten?","films/voeding/1-wat-zit-er-in-je-eten.html"],darmb:["Je darmbewoners","films/voeding/6-je-darmbewoners.html"],reis:["De reis door je buik","films/voeding/2-de-reis-door-je-buik.html"],
  evo1:["Wat is evolutie eigenlijk?","films/evolutie/1-wat-is-evolutie.html"],evo2:["Natuurlijke selectie","films/evolutie/2-natuurlijke-selectie.html"],evo4:["De mens als selectiefactor","films/evolutie/4-de-mens-als-selectiefactor.html"],evo5:["Toeval en uitwisseling","films/evolutie/5-toeval-en-uitwisseling.html"],evo6:["Hoe een soort er twee wordt","films/evolutie/6-hoe-een-soort-er-twee-wordt.html"],
  onderz:["Onderzoek doen","films/cellen/onderzoek-doen/index.html"],kun:["Kun je onderzoek vertrouwen?","films/extra/kun-je-onderzoek-vertrouwen.html"],
  dna4:["De genetische code lezen","films/dna/4-de-genetische-code-lezen.html"],dna5:["Mutaties","films/dna/5-mutaties.html"],erf2:["Monohybride kruisingen","films/erfelijkheid/2-monohybride-kruisingen.html"],
  zen1:["Eén seconde","films/zenuwstelsel/1-een-seconde.html"],zen2:["Het kabelnetwerk","films/zenuwstelsel/2-het-kabelnetwerk.html"],zen5:["Het hoofdkantoor","films/zenuwstelsel/5-het-hoofdkantoor.html"],spier:["Spieren en beweging","films/zenuwstelsel/9-spieren-en-beweging.html"],
  enzym:["Knippen op maat","films/voeding/3-knippen-op-maat.html"]
};
const svg=E.svg;

/* ===== opgave 1 ===== */
E.zet(T,[1],{titel:"Zuurstof, hemoglobine en energie",
  html:`<p><b>Hemoglobine</b> is een eiwit met ijzer in de rode bloedcellen. In de longen bindt het zuurstof, in de weefsels laat het zuurstof weer los.</p><p>Cellen gebruiken zuurstof bij <b>aerobe dissimilatie</b>: glucose wordt afgebroken tot CO<sub>2</sub> en water, en de energie wordt vastgelegd in ATP.</p>`,
  films:[F.bloed,F.adem2]});
E.zet(T,[2],{titel:"Rekenen met bloedwaarden",
  html:`<p>De <b>hematocrietwaarde</b> is het percentage van het bloedvolume dat uit rode bloedcellen bestaat. Het <b>hemoglobinegehalte</b> is de hoeveelheid hemoglobine per liter bloed.</p><ul><li>Wil je iets weten <i>per cel</i>, deel dan de totale hoeveelheid door een maat voor het aantal cellen.</li><li>Bij een formule: vul de waarden in mét eenheden en reken op het eind om.</li><li>1 g = 1000 mg = 1.000.000 µg.</li></ul>`,
  films:[F.bloed]});
E.zet(T,[3],{titel:"Genexpressie en transporteiwitten",
  html:`<p>Een gen komt tot <b>expressie</b> als het wordt afgelezen en het eiwit wordt gemaakt. Cellen kunnen de expressie hoger of lager zetten als de omstandigheden veranderen.</p><p>Ionen gaan niet zomaar door een membraan: ze hebben <b>transporteiwitten</b> nodig. Hoe meer van zo’n eiwit in het membraan zit, hoe meer ionen er per seconde door kunnen.</p>`,
  films:[F.dna6,F.darm4]});

/* ===== opgave 2 ===== */
E.zet(T,[4],{titel:"Osmose en bloeddruk",
  html:`<p><b>Osmotische waarde</b>: hoe meer opgeloste deeltjes, hoe hoger. Water beweegt (osmose) naar de plek met de hoogste osmotische waarde.</p><p>De <b>bloeddruk</b> is de druk die het bloed uitoefent op de wand van de bloedvaten. Het hart zorgt voor de druk; de vaten kunnen met hun spierlaag nauwer of wijder worden.</p>`,
  anim:anim(caps(["Een halfdoorlatend membraan: links weinig opgeloste deeltjes, rechts veel.","Water gaat naar de kant met de hoogste osmotische waarde: daar stijgt het volume."]),i=>svg("0 0 300 130",`<rect x="10" y="${i?40:30}" width="130" height="${i?80:90}" fill="var(--teal)" opacity=".25"/><rect x="160" y="${i?20:30}" width="130" height="${i?100:90}" fill="var(--teal)" opacity=".25"/><line x1="150" y1="10" x2="150" y2="120" stroke="var(--text)" stroke-dasharray="4 3"/>${[[40,90],[100,70]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5" fill="var(--koraal)"/>`).join("")}${[[180,60],[210,90],[240,70],[270,100],[200,110],[260,50]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5" fill="var(--koraal)"/>`).join("")}${i?`<path d="M120,60 L176,60" stroke="var(--goud)" stroke-width="3"/><path d="M170,54 L180,60 L170,66" fill="var(--goud)"/>`:""}`,"Osmose door een membraan")),
  films:[F.diff,F.buizen]});
E.zet(T,[5],{titel:"Urine maken: filtratie en terugresorptie",
  html:`<p>In een niereenheid gebeurt urine maken in twee stappen:</p><ul><li><b>ultrafiltratie</b> in het kapsel van Bowman: door de bloeddruk worden water en kleine opgeloste stoffen uit het bloed geperst;</li><li><b>terugresorptie</b> (reabsorptie) in de nierbuisjes: nuttige stoffen en water worden teruggehaald.</li></ul>`,
  films:[F.uitsch,F.water]});
E.zet(T,[6],{titel:"Bouw van de bloedvaten",
  html:`<ul><li><b>Slagaders</b> voeren bloed van het hart af. Ze krijgen bij elke hartslag een drukgolf en hebben een dikke wand met veel elastische vezels en spieren.</li><li><b>Aders</b> voeren bloed naar het hart, met lage druk, een dunne wand en kleppen.</li><li><b>Haarvaten</b> hebben een wand van één cellaag; hier vindt de uitwisseling met de weefsels plaats.</li></ul>`,
  films:[F.buizen]});
E.zet(T,[7],{titel:"Beperkende factoren",
  html:`<p>Elke soort heeft per milieufactor een <b>tolerantiegebied</b> met een optimum. Ligt een factor dicht bij de grens van dat gebied, dan remt hij de groei: hij is <b>beperkend</b>. Een factor die ruim in orde is, is niet beperkend, ook al is hij nodig.</p><p>Wortels hebben water nodig voor de opname, maar ook zuurstof voor de dissimilatie. Lucht zit tussen de gronddeeltjes.</p>`,
  films:[F.eco2,F.plant7]});
E.zet(T,[8],{titel:"Organismen indelen",
  html:`<ul><li><b>Bacteriën</b> zijn eencellig en hebben geen celkern.</li><li><b>Schimmels</b> (en zwamachtigen) vormen vaak draden, een zwamvlok, en planten zich voort met sporen.</li><li><b>Producenten</b> maken zelf organische stoffen uit anorganische stoffen, meestal met fotosynthese: <b>autotroof</b>.</li><li><b>Heterotrofe</b> organismen halen organische stoffen van andere organismen: consumenten, reducenten en parasieten.</li></ul>`,
  films:[F.microben,F.eco3]});
E.zet(T,[9],{titel:"Wat wortelcellen nodig hebben",
  html:`<p>Wortelcellen hebben geen bladgroen en doen dus geen fotosynthese. Ze krijgen suikers via de bastvaten en halen daar energie uit met <b>dissimilatie</b>. Die energie gebruiken ze onder andere voor groei en voor de actieve opname van mineralen.</p>`,
  films:[F.adem2,F.plant6]});
E.zet(T,[10],{titel:"Hout- en bastvaten",
  html:`<ul><li><b>Houtvaten</b> (xyleem): water en mineralen van de wortels omhoog, de <b>anorganische</b> sapstroom.</li><li><b>Bastvaten</b> (floëem): suikers en andere organische stoffen van de bladeren naar de rest van de plant, de <b>organische</b> sapstroom.</li></ul><p>In een <b>stengel</b> liggen de vaten in vaatbundels in een ring. In een <b>jonge wortel</b> liggen ze samen in een centrale cilinder, in een ster- of kruisvorm. Zoek de plaatjes op in je informatieboek of boek en vergelijk ze met de afbeelding.</p>`,
  films:[F.plant6]});
E.zet(T,[11],{titel:"Enten en erfelijkheid",
  html:`<p>Bij <b>enten</b> zet je een stengel van de ene plant op het wortelstelsel van een andere. De vaatstelsels groeien aan elkaar, zodat water en suikers worden uitgewisseld. </p><p>Nakomelingen krijgen hun erfelijke eigenschappen via de <b>geslachtscellen</b>. Bij planten ontstaan die in de bloemen: eicellen in het vruchtbeginsel en stuifmeelkorrels in de helmknoppen.</p>`,
  films:[F.plant7,F.erf2]});

/* ===== opgave 3 ===== */
E.zet(T,[12],{titel:"Differentiatie",
  html:`<p>Bijna alle cellen in je lichaam ontstaan door mitose uit één bevruchte eicel. Ze hebben dus hetzelfde DNA, met dezelfde genen.</p><p>Bij <b>differentiatie</b> wordt een cel gespecialiseerd: hij krijgt een eigen vorm en functie. Hoe een cel met hetzelfde DNA toch iets anders kan worden, zie je in de film hieronder.</p>`,
  films:[F.stam,F.dna6]});
E.zet(T,[13],{titel:"Hormonen en klieren",
  html:`<ul><li>Het <b>zenuwstelsel</b> stuurt boodschappen als impulsen langs zenuwcellen: snel en precies naar één plek.</li><li>Het <b>hormoonstelsel</b> stuurt boodschappen als hormonen via het <b>bloed</b>: alle cellen met een passende receptor reageren.</li></ul><p><b>Endocriene klieren</b> (hormoonklieren) geven hun product af aan het bloed. <b>Exocriene klieren</b> hebben een afvoerbuis en geven hun product af naar buiten of naar een holte, zoals zweetklieren en speekselklieren.</p>`,
  films:[F.post,F.baas]});
E.zet(T,[14],{titel:"Terugkoppeling",
  html:`<ul><li><b>Negatieve terugkoppeling</b>: het resultaat werkt de verandering tegen. Een waarde blijft zo rond een normaalwaarde. Voorbeeld: een thermostaat.</li><li><b>Positieve terugkoppeling</b>: het resultaat versterkt de verandering, de waarde gaat steeds verder dezelfde kant op. Voorbeeld: de weeën bij een bevalling.</li></ul><p>Tip: kijk wat er gebeurt als er <i>meer</i> van het product is. Wordt de aanmaak dan minder of meer?</p>`,
  films:[F.baas]});
E.zet(T,[15],{titel:"Vormen van immuniteit",
  html:`<ul><li><b>Actief</b>: je maakt zelf antistoffen en geheugencellen, na een infectie of een vaccinatie. Duurt lang.</li><li><b>Passief</b>: je krijgt kant-en-klare antistoffen van een ander. Werkt meteen, maar is na een tijd weg.</li><li><b>Natuurlijk</b>: het gebeurt vanzelf, zonder medische ingreep.</li><li><b>Kunstmatig</b>: door een medische behandeling, zoals een vaccinatie of een injectie met antistoffen.</li></ul>`,
  films:[F.afw4,F.afw2]});
E.zet(T,[16],{titel:"Koolhydraten en selectie in de darm",
  html:`<p>Koolhydraten zijn opgebouwd uit <b>suikereenheden</b> (monosachariden: ringen van C-atomen met veel OH-groepen). Twee eenheden vormen een disacharide, een paar een <b>oligosacharide</b>, heel veel een polysacharide. Eiwitten zijn ketens van aminozuren.</p><p>Verteren gebeurt met <b>enzymen</b> uit de verteringsklieren; elk enzym past op één soort binding. In de dikke darm leven veel soorten bacteriën, die elk hun eigen voedingsstoffen gebruiken.</p>`,
  films:[F.voed1,F.darmb]});
E.zet(T,[17],{titel:"Peristaltiek en de dikke darm",
  html:`<p><b>Peristaltiek</b>: golven van samentrekkende kringspieren in de darmwand duwen de voedselbrij verder.</p><p>In de <b>dikke darm</b> wordt vooral <b>water</b> teruggeresorbeerd. Daardoor wordt de brij steeds vaster.</p>`,
  films:[F.reis,F.darmb]});

/* ===== opgave 4 ===== */
E.zet(T,[18],{titel:"Wat is een soort?",
  html:`<p>Een <b>soort</b> is een groep organismen die onder natuurlijke omstandigheden samen <b>vruchtbare nakomelingen kunnen</b> krijgen.</p><p><b>Geografische isolatie</b> (een rivier, gebergte, zee) houdt populaties uit elkaar: er is dan geen uitwisseling van genen. Door mutaties, selectie en toeval kunnen de populaties daarna langzaam uit elkaar groeien. Pas als ze niet meer samen vruchtbare nakomelingen kunnen krijgen, zijn het aparte soorten.</p>`,
  films:[F.evo6]});
E.zet(T,[19],{titel:"Selecterende factoren",
  html:`<p>Een <b>selecterende factor</b> is een milieufactor waardoor individuen met een bepaalde eigenschap een grotere kans hebben om te overleven en zich voort te planten. Hun allelen worden daardoor in de volgende generaties vaker.</p><p>Een factor die geen verschil maakt voor de overleving of de voortplanting, selecteert niet.</p>`,
  films:[F.evo2]});
E.zet(T,[20],{titel:"ADH en de waterhuishouding",
  html:`<p><b>ADH</b> (antidiuretisch hormoon) komt uit de hypofyse. Het werkt op de verzamelbuisjes in de nieren en regelt hoeveel water er wordt teruggeresorbeerd. Zoek in je boek of informatieboek op in welke richting.</p><p>De <b>osmotische waarde</b> van urine hangt af van de hoeveelheid opgeloste stoffen per liter: dezelfde stoffen in meer water geven een andere waarde dan in weinig water.</p>`,
  films:[F.water,F.uitsch]});
E.zet(T,[21],{titel:"Kleine populaties",
  html:`<p>De <b>genetische variatie</b> in een populatie is de verscheidenheid aan allelen. Variatie ontstaat door mutaties en door de nieuwe combinaties bij geslachtelijke voortplanting.</p><p>Bij <b>inteelt</b> paren verwante dieren met elkaar. Bij <b>genetische drift</b> veranderen allelfrequenties door toeval. Bedenk zelf hoe groot die effecten zijn in een kleine en in een grote populatie.</p>`,
  films:[F.evo5,F.erf2]});

/* ===== opgave 5 ===== */
E.zet(T,[22],{titel:"Abiotische factoren en het microbioom",
  html:`<p>Welke soorten ergens leven, hangt af van de <b>milieufactoren</b>. <b>Abiotische</b> factoren komen uit de levenloze natuur: temperatuur, pH, zuurstof, stoffen. <b>Biotische</b> factoren hebben met andere organismen te maken: voedsel, concurrenten, ziekteverwekkers.</p><p>Elke soort heeft per factor een <b>tolerantiegebied</b>: alleen binnen die grenzen kan hij leven.</p>`,
  films:[F.eco2,F.darmb]});
E.zet(T,[23],{titel:"Variabelen in een diagram",
  html:`<ul><li>De <b>onafhankelijke variabele</b> is de factor die de onderzoeker kiest of die de oorzaak is: die komt op de <b>x-as</b>.</li><li>De <b>afhankelijke variabele</b> is de uitkomst die je meet: die komt op de <b>y-as</b>.</li></ul><p>Let op de schaal: lees bij een as altijd wat een hoge en een lage waarde betekent.</p>`,
  films:[F.onderz]});
E.zet(T,[24],{titel:"Een nulmeting",
  html:`<p>Wil je weten hoeveel iets verandert, dan moet je weten hoe het <b>vóór</b> de behandeling was: een <b>nulmeting</b> (beginmeting).</p><p>In een antwoord is het woord 'controle' alleen niet genoeg: zeg <b>wat</b> je met een meting kunt laten zien.</p>`,
  films:[F.onderz,F.kun]});
E.zet(T,[25],{titel:"Validiteit en betrouwbaarheid",
  html:`<ul><li><b>Validiteit</b>: meet je echt wat je wilt meten? Een goede meetmethode en het uitsluiten van andere verklaringen maken een onderzoek valide.</li><li><b>Betrouwbaarheid</b>: krijg je bij herhalen ongeveer dezelfde uitkomst? Meer metingen, meer proefpersonen of herhalen maken een uitkomst minder toevallig.</li></ul>`,
  films:[F.kun,F.onderz]});
E.zet(T,[26],{titel:"Antibiotica en concurrentie",
  html:`<p><b>Antibiotica</b> zijn stoffen die bacteriën doden of hun groei remmen. Op virussen werken ze niet.</p><p>Soorten die dezelfde ruimte en hetzelfde voedsel nodig hebben, <b>concurreren</b> met elkaar.</p>`,
  films:[F.microben,F.darmb]});
E.zet(T,[27],{titel:"Aangeboren en verworven afweer",
  html:`<ul><li><b>Aangeboren</b> (niet-specifieke) afweer: werkt tegen alle ziekteverwekkers op dezelfde manier en is er altijd. Bijvoorbeeld de huid en het traanvocht.</li><li><b>Verworven</b> (specifieke) afweer: richt zich op één bepaald antigeen en ontstaat pas na eerste contact.</li></ul>`,
  films:[F.afw1,F.afw2]});

/* ===== opgave 6 ===== */
E.zet(T,[28,29],{titel:"Het spijsverteringskanaal",
  html:`<p>Het spijsverteringskanaal is een buis door het lichaam: wat in de darmholte zit, zit eigenlijk nog <b>buiten</b> het lichaam. De darmwand vormt de grens. Verteren gebeurt met enzymen uit de verteringsklieren, en elk enzym werkt het best bij een bepaalde pH. Zoek in je informatieboek de pH op in de verschillende delen van het spijsverteringskanaal van de mens.</p>`,
  films:[F.reis,F.enzym]});
E.zet(T,[30],{titel:"Natuurlijke selectie en fitness",
  html:`<p>Bij <b>natuurlijke selectie</b> overleven individuen met een gunstige eigenschap vaker en krijgen ze meer nakomelingen. Hun allelen worden in de populatie dus elk jaar vaker. <b>Fitness</b> is het aantal nakomelingen dat een individu bijdraagt aan de volgende generatie.</p><p>Let op: de eigenschap moet er al zijn (door mutatie). Het milieu kiest alleen welke varianten overblijven.</p>`,
  films:[F.evo2,F.evo4]});
E.zet(T,[31],{titel:"Recessieve allelen in een populatie",
  html:`<p>Een <b>recessief</b> allel komt alleen tot uiting als iemand het twee keer heeft (homozygoot, aa). Heterozygoten (Aa) hebben het fenotype van het dominante allel.</p><p>Bij een paring aa × AA krijgen alle nakomelingen Aa. Bij aa × Aa krijgt de helft Aa en de helft aa.</p>`,
  films:[F.erf2,F.evo4]});
E.zet(T,[32],{titel:"De genetische code en puntmutaties",
  html:`<p>Een <b>codon</b> is een groepje van drie basen in het mRNA dat voor één aminozuur codeert. De meeste aminozuren hebben meerdere codons: zoek ze op in de codontabel van je informatieboek.</p><p>Bij een <b>puntmutatie</b> verandert één base. Het codon verandert dan op één plek, en soms wordt daardoor een ander aminozuur ingebouwd. Vergelijk codons dus base voor base.</p>`,
  films:[F.dna4,F.dna5]});
E.zet(T,[33],{titel:"Resistentie voorkomen",
  html:`<p>Resistentie ontstaat door een toevallige <b>mutatie</b> in het DNA van het insect; de gifstof selecteert daarna de resistente dieren.</p>`,
  films:[F.evo4,F.dna5]});

/* ===== opgave 7 ===== */
E.zet(T,[34],{titel:"Bouw van een zenuwcel",
  html:`<p>Een zenuwcel heeft een cellichaam met uitlopers: <b>dendrieten</b> geleiden impulsen naar het cellichaam toe, het <b>axon</b> ervan af. Bij een sensorische zenuwcel is de dendriet lang.</p><p>Veel uitlopers zijn omgeven door een <b>myelineschede</b>: een vettige laag van steuncellen die om de uitloper heen gewikkeld zijn, met insnoeringen ertussen. Zoek de naam van die cellen op in je informatieboek.</p>`,
  films:[F.zen2,F.zen1]});
E.zet(T,[35],{titel:"Witte bloedcellen",
  html:`<p>Er zijn verschillende soorten witte bloedcellen, elk met een eigen taak in de afweer: sommige nemen deeltjes op en breken ze af (<b>fagocytose</b>), andere maken antistoffen, activeren andere afweercellen of doden geïnfecteerde lichaamscellen. Zoek in je boek bij elke soort de taak op en maak er een tabelletje van.</p>`,
  films:[F.afw1,F.afw2]});
E.zet(T,[36],{titel:"De actiepotentiaal",
  html:`<p>In rust is de binnenkant van een zenuwcel negatief ten opzichte van de buitenkant: de <b>rustpotentiaal</b>. Buiten is veel Na<sup>+</sup>, binnen veel K<sup>+</sup>.</p><p>Bij een <b>actiepotentiaal</b> verandert de doorlaatbaarheid van het membraan voor ionen, en wordt de binnenkant even positief. Een actiepotentiaal ontstaat alleen als de prikkel sterk genoeg is: boven de <b>drempelwaarde</b> (alles-of-niets).</p>`,
  films:[F.zen2]});
E.zet(T,[39],{titel:"Kwabben van de grote hersenen",
  html:`<p>De grote hersenen hebben vier kwabben: voorhoofdskwab, wandbeenkwab, slaapkwab en achterhoofdskwab. In de schors liggen gebieden met een eigen taak: sommige ontvangen informatie van een zintuig, andere sturen spieren aan, en associatiegebieden verbinden ze. Zoek in je informatieboek de afbeelding van de schorsvelden op.</p>`,
  films:[F.zen5]});
E.zet(T,[37],{titel:"Motorische schors en gevoelsschors",
  html:`<p>De <b>centrale groeve</b> scheidt de voorhoofdskwab van de wandbeenkwab. Aan de ene kant van de groeve ligt de <b>motorische schors</b>, aan de andere kant de <b>gevoelsschors</b>. Zoek in je informatieboek op welke aan welke kant ligt.</p><p>In de motorische schors en de gevoelsschors liggen de lichaamsdelen op een vaste volgorde, als een 'mannetje' op zijn kop (de homunculus): de voeten bovenaan, aan de middellijn.</p>`,
  films:[F.zen5]});
E.zet(T,[38],{titel:"Zenuwstelsel: delen en richtingen",
  html:`<ul><li><b>Sensorische</b> zenuwcellen geleiden impulsen van zintuigen naar het centrale zenuwstelsel.</li><li><b>Motorische</b> zenuwcellen geleiden impulsen van het centrale zenuwstelsel naar spieren of klieren.</li><li>Het <b>animale</b> zenuwstelsel regelt (meestal bewust) de skeletspieren.</li><li>Het <b>autonome</b> zenuwstelsel regelt buiten je wil om organen, zoals hart, darmen en klieren.</li></ul>`,
  films:[F.zen1,F.spier]});

/* ===== opgave 8 ===== */
E.zet(T,[40],{titel:"Abiotische en biotische factoren",
  html:`<ul><li><b>Abiotisch</b>: factoren uit de levenloze natuur, zoals temperatuur, licht en de hoeveelheid zout.</li><li><b>Biotisch</b>: factoren die met levende organismen te maken hebben, zoals predatoren, ziekteverwekkers en concurrenten.</li></ul>`,
  films:[F.eco2]});
E.zet(T,[41],{titel:"Relaties tussen soorten",
  html:`<ul><li><b>Predatie</b>: de ene soort (predator) doodt en eet de andere (prooi).</li><li><b>Parasitisme</b>: de parasiet leeft op of in een gastheer en heeft er voordeel van; de gastheer heeft nadeel, maar wordt meestal niet meteen gedood.</li><li><b>Mutualisme</b>: beide soorten hebben voordeel.</li><li><b>Commensalisme</b>: de ene soort heeft voordeel, de andere merkt er niets van.</li></ul>`,
  films:[F.eco3]});
E.zet(T,[42],{titel:"Selectievoordeel",
  html:`<p>Een eigenschap geeft <b>selectievoordeel</b> als individuen met die eigenschap een grotere kans hebben om te overleven en zich voort te planten dan soortgenoten zonder. Zo’n eigenschap wordt over veel generaties steeds algemener.</p><p>In een uitleg noem je twee schakels: <b>wat de eigenschap concreet oplevert</b>, en <b>wat dat betekent voor overleving of voortplanting</b>.</p>`,
  films:[F.evo2,F.evo1]});
E.zet(T,[43],{titel:"Bloedstolling en enzymen",
  html:`<p>Bij een wond start een reeks reacties. Aan het eind zet het enzym <b>trombine</b> het oplosbare plasma-eiwit <b>fibrinogeen</b> om in onoplosbare <b>fibrine</b>draden. In dat netwerk blijven bloedcellen hangen: een stolsel.</p><p>Een enzym heeft een <b>actief centrum</b> (bindingsplaats) waarin het substraat past.</p>`,
  films:[F.bloed,F.enzym]});
E.zet(T,[44],{titel:"Onafhankelijke en afhankelijke variabele",
  html:`<ul><li>De <b>onafhankelijke variabele</b> is wat de onderzoeker zelf kiest of verandert tussen de groepen.</li><li>De <b>afhankelijke variabele</b> is wat de onderzoeker meet als uitkomst.</li></ul><p>Tip: in de onderzoeksvraag 'Heeft A invloed op B?' is A meestal de onafhankelijke en B de afhankelijke variabele.</p>`,
  films:[F.onderz]});
})();
