/* Uitleg van de stof · oefenexamen havo 2023-I (tool havo23-1). Gekopieerd naar tools/examen-stof/havo23-1.js door samenvoegen.py. */
(function(){
"use strict";
if(!window.EXSTOF)return;
const E=window.EXSTOF,T="havo23-1";
const anim=(steps,draw)=>box=>E.stappen(box,steps,(st,s,i)=>{st.innerHTML=draw(i,s);});
const F={eco1:["Hoeveel passen er?","films/ecologie/1-hoeveel-passen-er.html"],eco2:["Waar past een soort?","films/ecologie/2-waar-past-een-soort.html"],eco3:["Wie eet wie?","films/ecologie/3-wie-eet-wie.html"],
  eco6:["Koolstof gaat rond","films/ecologie/6-koolstof-gaat-rond.html"],eco7:["Stikstof gaat rond","films/ecologie/7-stikstof-gaat-rond.html"],
  adem2:["Alles op adem","films/stofwisseling/2-alles-op-adem.html"],groen:["Alles in het groen","films/stofwisseling/3-alles-in-het-groen.html"],
  plant6:["Transport in planten","films/transport/6-transport-in-planten.html"],pomp:["Eén pomp, twee rondjes","films/transport/1-een-pomp-twee-rondjes.html"],buizen:["Buizen onder druk","films/transport/2-buizen-onder-druk.html"],bloed:["Wat er in je bloed zit","films/transport/3-wat-er-in-je-bloed-zit.html"],
  gas1:["Adem in, adem uit","films/gaswisseling/1-adem-in-adem-uit.html"],gas2:["Gas op reis","films/gaswisseling/2-gas-op-reis.html"],gas3:["Uitscheiding en evenwicht","films/gaswisseling/3-uitscheiding-en-evenwicht.html"],
  baby:["Van bevruchting tot baby","films/voortplanting/1-precies-op-tijd.html"],zen2:["Het kabelnetwerk","films/zenuwstelsel/2-het-kabelnetwerk.html"],zen8:["Zintuigen","films/zenuwstelsel/8-zintuigen.html"],
  stam:["Stamcellen","films/cellen/stamcellen.html"],afw3:["T-cellen en virussen","films/afweer/3-t-cellen-en-virussen.html"],afw4:["Vaccins, allergie en bloedgroepen","films/afweer/4-vaccins-allergie-en-bloedgroepen.html"],
  erf1:["Chromosomen","films/erfelijkheid/1-chromosomen.html"],erf2:["Monohybride kruisingen","films/erfelijkheid/2-monohybride-kruisingen.html"],erf6:["Stambomen en kansrekenen","films/erfelijkheid/6-stambomen-en-kansrekenen.html"],
  evo1:["Wat is evolutie eigenlijk?","films/evolutie/1-wat-is-evolutie.html"],evo4:["De mens als selectiefactor","films/evolutie/4-de-mens-als-selectiefactor.html"],evo5:["Toeval en uitwisseling","films/evolutie/5-toeval-en-uitwisseling.html"],evo7:["Hoe weten we dat?","films/evolutie/7-hoe-weten-we-dat.html"],evo8:["Stambomen lezen","films/evolutie/8-stambomen-lezen.html"],
  onderz:["Onderzoek doen","films/cellen/onderzoek-doen/index.html"],hor3:["De baas van de klieren","films/hormonen/3-de-baas-van-de-klieren.html"]};
const box=(x,y,w,h,t,on)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${on?"var(--goud-soft)":"none"}" stroke="${on?"var(--goud)":"var(--line2)"}" stroke-width="1.6"/><text class="lbl" x="${x+w/2}" y="${y+h/2+5}" text-anchor="middle">${t}</text>`;
const pijl=(x1,y1,x2,y2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--text2)" stroke-width="1.6" marker-end="url(#pk)"/>`;
const DEF=`<defs><marker id="pk" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--text2)"/></marker></defs>`;

/* ===== opgave 1 · Rivierdonderpad ===== */
E.zet(T,[1],{titel:"Bouw past bij leefwijze",
  html:`<p>Organismen hebben kenmerken die passen bij de plek waar ze leven: een <b>aanpassing</b>. Kijk bij een dier naar vorm, plaats van ogen en bek, vinnen of poten en kleur, en vraag je af: wat levert dit op in zijn milieu?</p><ul><li>Een vis die in open water zwemt, is vaak gestroomlijnd en zilverig.</li><li>Een vis die stilligt, kan zich verstoppen of camoufleren.</li></ul><p>Een goed antwoord noemt steeds <b>kenmerk + functie</b>: ‘… zodat / waardoor …’.</p>`,
  films:[F.evo1]});
E.zet(T,[2],{titel:"Van individu tot biosfeer",
  html:`<p>Ecologie gebruikt vaste begrippen:</p><ul><li><b>populatie</b>: alle individuen van één soort in een gebied;</li><li><b>levensgemeenschap</b>: alle populaties in een gebied samen;</li><li><b>ecosysteem</b>: levensgemeenschap plus de abiotische factoren;</li><li><b>voedselweb</b>: alle voedselrelaties tussen soorten in een gebied.</li></ul><p>Daarnaast is er een begrip voor de plek met alle omstandigheden die één soort nodig heeft. Welk begrip uit je boek is dat?</p>`,
  films:[F.eco2]});
E.zet(T,[3],{titel:"Biotische en abiotische factoren",
  html:`<p><b>Biotische factoren</b> zijn invloeden van andere organismen: voedsel (prooien, planten), predatoren, concurrenten, parasieten, ziekteverwekkers.</p><p><b>Abiotische factoren</b> zijn invloeden van de niet-levende natuur: licht, temperatuur, water, stroming, zuurstof- en koolstofdioxidegehalte, zuurgraad, bodemsoort.</p><p>Tip: vraag je af ‘leeft het, of komt het van iets wat leeft?’ Zo ja, biotisch.</p>`,
  films:[F.eco2]});
E.zet(T,[4],{titel:"Exoten en ingrijpen in een ecosysteem",
  html:`<p>Een <b>exoot</b> is een soort die door de mens in een gebied terechtkomt waar hij van nature niet voorkwam. Soms breidt hij zich explosief uit: een <b>invasieve exoot</b>. Dat komt vaak doordat zijn natuurlijke vijanden ontbreken.</p><p>Een soort uitzetten om een andere soort te bestrijden heet <b>biologische bestrijding</b>. Het kan werken, maar een nieuwe soort grijpt in op het hele voedselweb: hij eet wat hij kan krijgen en neemt soms ook ziekteverwekkers mee. In Australië liep zo de introductie van de rietpad uit de hand.</p>`,
  films:[F.eco3]});

/* ===== opgave 2 · Voedselbos ===== */
E.zet(T,[5],{titel:"Biodiversiteit en stabiliteit",
  html:`<p>Een ecosysteem met veel soorten (hoge <b>biodiversiteit</b>) heeft veel voedselrelaties. Neemt één soort toe, dan zijn er vaak predatoren of concurrenten die hem afremmen: het systeem is <b>stabieler</b>.</p><p>Een akker met één gewas is het tegenovergestelde: weinig soorten, weinig voedselrelaties. Denk na over wat dat betekent voor een insect dat juist dát gewas eet, en voor de dieren die zulke insecten eten.</p>`,
  films:[F.eco3,F.eco1]});
E.zet(T,[6],{titel:"Dissimilatie en fotosynthese in een plant",
  html:`<p><b>Fotosynthese</b>: 6 CO<sub>2</sub> + 6 H<sub>2</sub>O → C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> + 6 O<sub>2</sub>, alleen in cellen met bladgroenkorrels, alleen in het licht.</p><p><b>Aerobe dissimilatie</b>: C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> + 6 O<sub>2</sub> → 6 CO<sub>2</sub> + 6 H<sub>2</sub>O + energie, in <b>alle</b> levende cellen, dag en nacht.</p><p>Een plant doet dus beide, maar niet in elke cel. Bedenk welke cellen van een plant in het licht zitten en welke niet, en wat dat betekent voor wat ze opnemen.</p>`,
  films:[F.adem2,F.groen]});
E.zet(T,[7],{titel:"Vormen van symbiose",
  html:`<p>Bij <b>symbiose</b> leven twee soorten nauw samen. Er zijn drie vormen:</p><ul><li><b>mutualisme</b>: beide soorten hebben voordeel;</li><li><b>commensalisme</b>: de ene heeft voordeel, de andere geen voor- en geen nadeel;</li><li><b>parasitisme</b>: de ene heeft voordeel, de andere nadeel.</li></ul><p>Bepaal per soort wat hij ontvangt en wat hij afgeeft.</p>`,
  films:[F.eco3]});
E.zet(T,[8,9],{titel:"De stikstofkringloop",
  html:`<p>Stikstof (N) zit in eiwitten en DNA. Planten kunnen N<sub>2</sub> uit de lucht niet gebruiken; ze nemen stikstof op als <b>nitraat</b> of ammonium.</p><ul><li><b>Stikstofassimilatie</b>: planten maken van opgenomen stikstofzouten organische stikstofverbindingen (aminozuren, eiwitten).</li><li><b>Afbraak</b>: reducenten breken dode resten af; daarbij komt ammonium (NH<sub>4</sub><sup>+</sup>/NH<sub>3</sub>) vrij.</li><li><b>Nitrificatie</b>: bacteriën zetten ammonium in twee stappen om in nitraat (via nitriet).</li><li><b>Stikstoffixatie</b>: sommige bacteriën (vrij in de bodem of in wortelknolletjes) binden N<sub>2</sub> uit de lucht.</li><li><b>Denitrificatie</b>: bacteriën zetten nitraat om in N<sub>2</sub>, vooral bij zuurstofgebrek.</li></ul>`,
  anim:anim([{cap:"Stikstof uit dode resten komt vrij als ammonium."},{cap:"Ammonium wordt in twee stappen nitraat; planten nemen het op."},{cap:"Uit de lucht kan stikstof ook rechtstreeks de kringloop in, via bacteriën."}],i=>{
    let g=DEF+box(10,20,150,40,"dood blad",i===0)+box(200,20,150,40,"ammonium",i===0)+box(390,20,130,40,"nitriet",i===1)+box(390,110,130,40,"nitraat",i===1)+box(200,110,150,40,"plant",i===1)+box(10,110,150,40,"N₂ in de lucht",i===2);
    g+=pijl(160,40,198,40)+pijl(350,40,388,40)+pijl(455,60,455,108)+pijl(390,130,352,130)+pijl(275,110,90,62);
    if(i===2)g+=pijl(160,130,198,130);
    return E.svg("0 0 530 165",g,"Schets van de stikstofkringloop");}),
  films:[F.eco7]});
E.zet(T,[10],{titel:"Optimumkromme en tolerantiegrenzen",
  html:`<p>Een <b>optimumkromme</b> laat zien hoe goed een organisme het doet bij verschillende waarden van één abiotische factor.</p><ul><li><b>minimum</b>: de laagste waarde waarbij het nog kan leven;</li><li><b>optimum</b>: de waarde waarbij het het best gaat;</li><li><b>maximum</b>: de hoogste waarde die het nog verdraagt.</li></ul><p>Tussen minimum en maximum ligt het <b>tolerantiegebied</b>. Een soort die ergens wél kan groeien en een andere soort níet, verschilt dus in waar de grenzen liggen.</p>`,
  films:[F.eco2]});
E.zet(T,[11],{titel:"Het blad: licht vangen en water houden",
  html:`<p>Een blad moet twee dingen tegelijk: veel <b>licht</b> en CO<sub>2</sub> opvangen voor fotosynthese, en niet te veel <b>water</b> verliezen. Een groot, dun blad vangt veel licht, maar verdampt ook veel.</p><p>De <b>cuticula</b> is een waslaag op de opperhuid die verdamping tegengaat. Hoe dikker, hoe beter de bescherming, maar het maken van was kost de plant stoffen en energie.</p><p>Welke van die twee eisen het zwaarst weegt, hangt af van de plek waar de plant groeit.</p>`,
  films:[F.groen,F.plant6]});
E.zet(T,[12],{titel:"Inheems of niet",
  html:`<p>Een <b>inheemse</b> soort komt van nature in een gebied voor. Komt een soort door de mens (bewust of per ongeluk) in een nieuw gebied terecht, dan heeft hij een eigen naam. Breidt zo'n soort zich sterk uit ten koste van inheemse soorten, dan krijgt die naam er nog een woord bij.</p><p>Een soort die op eigen kracht een nieuw gebied bereikt (zoals vogels die vanzelf uitbreiden) valt daar niet onder.</p>`,
  films:[F.eco2]});
E.zet(T,[13],{titel:"Koolstofkringloop en broeikaseffect",
  html:`<p>Bij fotosynthese halen planten CO<sub>2</sub> uit de lucht en leggen de koolstof vast in organische stof. Bij dissimilatie, rotting en verbranding komt de koolstof weer vrij als CO<sub>2</sub>.</p><p>Koolstof kan kort of lang in organische stof vastliggen, bijvoorbeeld in bladeren, vruchten, hout, veen of fossiele brandstoffen. Meer CO<sub>2</sub> in de lucht versterkt het broeikaseffect.</p>`,
  films:[F.eco6]});

/* ===== opgave 3 · Spoedkeizersnede ===== */
E.zet(T,[14],{titel:"De dubbele bloedsomloop",
  html:`<p>Bloed gaat twee rondjes:</p><ul><li><b>kleine bloedsomloop</b>: rechterkamer → longslagader → longen → longaders → linkerboezem;</li><li><b>grote bloedsomloop</b>: linkerkamer → aorta → slagaders naar de organen → aders → holle aders → rechterboezem.</li></ul><p><b>Slagaders</b> voeren bloed van het hart naar een orgaan, <b>aders</b> van een orgaan naar het hart. Een stof die in een orgaan in het bloed komt, moet dus altijd eerst door het hart én de longen voordat hij een ander orgaan bereikt.</p>`,
  films:[F.pomp,F.gas3]});
E.zet(T,[15],{titel:"Bloeddruk: bovendruk en onderdruk",
  html:`<p>De <b>bovendruk</b> (systolische druk) is de druk in de slagaders als de kamers samentrekken; de <b>onderdruk</b> (diastolische druk) is de druk tussen twee slagen in, als de kamers ontspannen.</p><p>De bloeddruk hangt af van hoeveel bloed het hart wegpompt én van de <b>weerstand</b> in de vaten. Vooral de kleine slagaders bepalen die weerstand: zijn ze wijder, dan stroomt het bloed makkelijker weg; zijn ze nauwer, dan juist moeilijker.</p>`,
  films:[F.buizen]});
E.zet(T,[16],{titel:"Borst- en buikademhaling",
  html:`<p>Bij inademen wordt de borstholte groter, zodat er lucht in de longen stroomt.</p><ul><li><b>Borstademhaling</b>: de <b>tussenribspieren</b> trekken samen, de ribben gaan omhoog en naar buiten.</li><li><b>Buikademhaling</b>: het <b>middenrif</b> trekt samen en wordt platter; de buik komt naar voren. Bij krachtig uitademen spannen ook de buikspieren aan.</li></ul><p>Het middenrif scheidt de borstholte van de buikholte. Denk na over wat er in de buikholte gebeurt als het middenrif zakt.</p>`,
  films:[F.gas1]});
E.zet(T,[17,18],{titel:"Een CTG lezen en het autonome zenuwstelsel",
  html:`<p>Een <b>cardiotocogram</b> registreert tegelijk de hartslag van de baby (bovenste lijn) en de druk op de buikwand door weeën (onderste lijn). Lees altijd eerst de assen en de tijdschaal af: hoeveel tijd is één hokje?</p><p>Het <b>autonome zenuwstelsel</b> regelt de hartslag:</p><ul><li><b>orthosympathisch</b> zenuwstelsel (noradrenaline): actie, hartslag omhoog;</li><li><b>parasympathisch</b> zenuwstelsel: rust, hartslag omlaag.</li></ul><p>Een normale hartslag bij een ongeboren baby ligt tussen 110 en 150 slagen per minuut. Let bij een afwijking op de richting én op hoe lang die duurt.</p>`,
  films:[F.zen2,F.baby]});
E.zet(T,[19],{titel:"Gaswisseling in de placenta",
  html:`<p>Een foetus ademt nog niet. Zijn bloed wisselt stoffen uit met het bloed van de moeder in de <b>placenta</b>, via de navelstreng: O<sub>2</sub> en voedingsstoffen gaan naar de baby, CO<sub>2</sub> en afvalstoffen terug naar de moeder.</p><p>CO<sub>2</sub> reageert in bloed met water tot koolzuur; meer CO<sub>2</sub> maakt het bloed dus zuurder (lagere pH).</p>`,
  films:[F.baby,F.gas2]});
E.zet(T,[20],{titel:"Soorten zenuwcellen",
  html:`<ul><li><b>Gevoelszenuwcellen</b> (sensorische neuronen): van zintuigcellen naar het centraal zenuwstelsel.</li><li><b>Schakelcellen</b>: binnen het centraal zenuwstelsel (hersenen en ruggenmerg).</li><li><b>Bewegingszenuwcellen</b> (motorische neuronen): van het centraal zenuwstelsel naar spieren en klieren.</li></ul><p>Het <b>perifeer zenuwstelsel</b> bestaat uit alle zenuwen buiten hersenen en ruggenmerg. Waarneming (zoals pijn voelen) ontstaat pas in de hersenen.</p>`,
  films:[F.zen2]});
E.zet(T,[21],{titel:"De buikwand van buiten naar binnen",
  html:`<p>De buikwand bestaat uit lagen. Van buiten naar binnen: de opperhuid en lederhuid, dan het <b>onderhuidse bindweefsel</b> met vetcellen, dan de spieren van de buikwand, en pas daarachter het buikvlies en de buikholte met de organen.</p><p>Bij een operatie ga je dus laag voor laag naar binnen. In de buikholte liggen organen voor en achter elkaar; bekijk in afbeelding 4 wat er vlak achter het schaambeen ligt.</p>`,
  films:[F.baby]});
E.zet(T,[22],{titel:"Hormonen bij de bevalling",
  html:`<p>Rond de bevalling spelen meerdere hormonen een rol. De <b>hypofyse</b> geeft er twee af die je moet kennen:</p><ul><li>een hormoon dat <b>gladde spieren laat samentrekken</b>: de baarmoederwand (weeën) en de spiertjes rond de melkklieren (toeschietreflex);</li><li><b>prolactine</b>, dat de <b>melkproductie</b> stimuleert.</li></ul><p>Na de geboorte voorkomt samentrekken van de baarmoeder dat de vaten op de plek van de placenta blijven bloeden.</p>`,
  films:[F.baby,F.hor3]});
E.zet(T,[23],{titel:"Het oog en zijn reflexen",
  html:`<p>De <b>iris</b> regelt de grootte van de pupil met twee soorten gladde spieren:</p><ul><li><b>kringspieren</b>, in een ring rond de pupil;</li><li><b>straalsgewijs lopende spieren</b>, als spaken van een wiel.</li></ul><p>Bedenk wat er met de opening gebeurt als elk type samentrekt. De <b>pupilreflex</b> beschermt het netvlies; andere oogreflexen, zoals de knipperreflex, reageren op heel andere prikkels.</p>`,
  films:[F.zen8]});

/* ===== opgave 4 · Teunisbloemen ===== */
E.zet(T,[24],{titel:"Transport in een plant",
  html:`<p>Een plant heeft twee soorten vaten, samen in de vaatbundels:</p><ul><li><b>houtvaten</b>: dode, holle cellen; vervoeren water en mineralen van de wortels omhoog;</li><li><b>bastvaten</b>: levende cellen; vervoeren opgeloste organische stoffen (zoals suikers uit de bladeren) naar alle delen die ze nodig hebben of opslaan.</li></ul>`,
  films:[F.plant6]});
E.zet(T,[25],{titel:"Geslachtelijke voortplanting en variatie",
  html:`<p>Bij <b>zelfbestuiving</b> bevrucht stuifmeel van een plant zijn eigen eicellen. Bij <b>kruisbestuiving</b> komt het stuifmeel van een andere plant van dezelfde soort.</p><p>Bij geslachtelijke voortplanting ontstaan nieuwe combinaties van allelen. Hoe meer de ouders genetisch verschillen, hoe meer <b>genetische variatie</b> in de nakomelingen. Variatie is de grondstof voor <b>natuurlijke selectie</b>: welke individuen het best passen, hangt af van het milieu, en dat milieu verandert.</p>`,
  films:[F.evo5]});
E.zet(T,[26,27],{titel:"De stappen van een onderzoek",
  html:`<ul><li><b>onderzoeksvraag</b>: wat wil je weten (een vraag);</li><li><b>hypothese</b>: een verwacht, toetsbaar antwoord op die vraag, vaak ‘als …, dan …’;</li><li><b>werkplan</b>: hoe je het onderzoek uitvoert: proefmateriaal, wat je varieert, wat je meet en hoe;</li><li><b>resultaten</b>: wat je hebt gemeten;</li><li><b>conclusie</b>: antwoord op de vraag, op basis van de resultaten.</li></ul><p>In een artikel staan die stappen in lopende tekst. Zoek per zin naar signaalwoorden: een vraagteken, ‘we verwachten’, ‘we gebruikten / maten’, ‘wat blijkt’.</p>`,
  films:[F.onderz]});
E.zet(T,[28],{titel:"Procentuele toename uitrekenen",
  html:`<p>Een procentuele toename reken je altijd uit ten opzichte van de <b>beginwaarde</b>:</p><p style="text-align:center"><b>toename (%) = (nieuw − oud) / oud × 100%</b></p><p>Voorbeeld met andere getallen: een plant groeit van 40 naar 42 cm. De toename is (42 − 40) / 40 × 100% = 5%.</p><p>Lees in een staafdiagram eerst af hoeveel één hokje is, en kies de juiste staaf als beginwaarde (de controle, waarbij er niets bijzonders gebeurt).</p>`,
  films:[F.onderz]});
E.zet(T,[29],{titel:"Kosten en baten in de natuur",
  html:`<p>Alles wat een organisme maakt, kost stoffen en energie die uit de fotosynthese of het voedsel komen: bloemen, nectar, gif, een waslaag. Een eigenschap is voordelig als de opbrengst groter is dan de kosten.</p><p>Natuurlijke selectie bevoordeelt organismen waarbij de opbrengst van een eigenschap opweegt tegen wat die kost.</p>`,
  films:[F.evo1]});

/* ===== opgave 5 · Bèta-thalassemie ===== */
E.zet(T,[30],{titel:"Stamcellen en differentiatie",
  html:`<p>Een <b>stamcel</b> kan zich delen en ook uitgroeien tot gespecialiseerde cellen. Bloedstamcellen in het rode beenmerg vormen rode bloedcellen, witte bloedcellen en bloedplaatjes.</p><p>Alle cellen hebben hetzelfde DNA, maar in elk celtype staan andere genen aan (<b>genexpressie</b>). Zo krijgt een cel een eigen vorm en functie. Vergelijk dit met begrippen als evolutie, selectie en adaptatie: die gaan over populaties over generaties.</p>`,
  films:[F.stam]});
E.zet(T,[31,32,33],{titel:"Rode bloedcellen: aanmaak, functie en regeling",
  html:`<p><b>Rode bloedcellen</b> bevatten hemoglobine en vervoeren zuurstof. Ze worden gemaakt in het rode beenmerg en leven ongeveer 120 dagen. In het laatste stadium verliezen ze hun kern; jonge rode bloedcellen (<b>reticulocyten</b>) hebben nog wat restjes RNA die je na kleuring als korreltjes ziet.</p><p>Normaal is maar een klein deel (± 1%) van de rode bloedcellen een reticulocyt.</p><p>De aanmaak wordt geregeld door een <b>hormoon uit de nieren</b>: bij een te laag zuurstofgehalte van het bloed maken de nieren meer, en het beenmerg gaat harder werken.</p><p>Het <b>hartminuutvolume</b> is de hoeveelheid bloed die het hart per minuut rondpompt: slagvolume × hartslagfrequentie.</p>`,
  films:[F.bloed,F.gas2]});
E.zet(T,[34],{titel:"Een schema van de bloedsomloop lezen",
  html:`<p>In een schema van de bloedsomloop staat het hart in het midden. Zoek eerst de longen: twee netwerken die alleen met de rechter- en linkerhelft van het hart verbonden zijn (kleine bloedsomloop). De rest zijn organen uit de grote bloedsomloop.</p><ul><li>Kijk naar de <b>pijlen</b>: stroomt het bloed van het hart af (slagader) of naar het hart toe (ader)?</li><li>Kijk naar de <b>kleur</b>: vaak zuurstofrijk donker en zuurstofarm licht (of rood en blauw).</li></ul><p>Een infuus of een bloedafname komt in een ader: daar is de druk laag.</p>`,
  films:[F.pomp]});
E.zet(T,[35],{titel:"Erfelijke ziekte en lichaamscellen",
  html:`<p>Alle lichaamscellen ontstaan door mitose uit één bevruchte eicel. Ze hebben dus <b>hetzelfde DNA</b>: een erfelijke mutatie zit in elke cel, ook in de stamcellen.</p><p>Bij een transplantatie vervang je cellen. Of dat helpt, hangt af van welk DNA de nieuwe cellen hebben.</p>`,
  films:[F.stam,F.erf1]});
E.zet(T,[36,39],{titel:"Afweer en transplantatie",
  html:`<p>Op het celmembraan van al je cellen zitten <b>HLA-eiwitten</b> (MHC-eiwitten): een soort ‘paspoort’. T-cellen leren tijdens hun rijping de eigen HLA-eiwitten te verdragen. Een cel met afwijkende HLA-eiwitten wordt herkend als lichaamsvreemd: die eiwitten zijn dan <b>antigenen</b>.</p><p>Bij een gewone orgaantransplantatie valt de afweer van de ontvanger het donororgaan aan (afstoting). Bij een <b>stamceltransplantatie</b> wordt de afweer van de patiënt vooraf vernietigd en komt er een nieuw afweersysteem van de donor. Bedenk dan goed: <b>wiens</b> afweercellen herkennen <b>wiens</b> HLA-eiwitten?</p><p>Na het vernietigen van het beenmerg ontbreken tijdelijk alle nieuwe bloedcellen: witte bloedcellen (afweer), rode bloedcellen en bloedplaatjes (stolling).</p>`,
  films:[F.afw3,F.afw4]});
E.zet(T,[37,38],{titel:"Chromosomen, allelen en kansen",
  html:`<p>Een <b>autosoom</b> komt in paren voor: twee chromosomen van dezelfde vorm en grootte, één van elke ouder. De geslachtschromosomen X en Y verschillen in grootte. Na DNA-replicatie bestaat een chromosoom uit twee <b>identieke chromatiden</b>.</p><p>Bij <b>autosomaal recessieve</b> overerving heb je de ziekte alleen bij genotype aa; Aa is drager zonder verschijnselen.</p><p>Kansen reken je met een kruisingsschema. Weet je al iets over een kind (bijvoorbeeld zijn fenotype), dan vallen mogelijkheden af en reken je de kans uit binnen wat overblijft. Voorbeeld met andere getallen: bij een dobbelsteen is de kans op 2 gelijk aan 1/6; weet je al dat het even is, dan is de kans 1/3.</p>`,
  films:[F.erf2,F.erf6]});

/* ===== opgave 6 · Paarden ===== */
E.zet(T,[40],{titel:"Dateren met C14",
  html:`<p>Levende organismen nemen koolstof op (planten via CO<sub>2</sub>, dieren via voedsel), waaronder een vaste kleine fractie radioactieve <b><sup>14</sup>C</b>. Na de dood stopt de opname en vervalt <sup>14</sup>C langzaam (halveringstijd ongeveer 5730 jaar). Uit hoeveel er nog over is, volgt hoe lang geleden het organisme stierf.</p><p>De methode werkt dus alleen voor materiaal dat organische stof van een ooit levend organisme bevat.</p>`,
  films:[F.evo7]});
E.zet(T,[41],{titel:"Soorten stofwisseling",
  html:`<ul><li><b>Assimilatie</b>: van kleine moleculen grote maken (opbouw, kost energie).</li><li><b>Dissimilatie</b>: grote moleculen afbreken (levert energie).</li></ul><p>Bij <b>aerobe dissimilatie</b> (met zuurstof) wordt glucose volledig afgebroken tot CO<sub>2</sub> en water. Bij <b>anaerobe dissimilatie</b> (zonder zuurstof) is de afbraak onvolledig: er ontstaat bijvoorbeeld melkzuur of alcohol en CO<sub>2</sub>, en er komt minder energie vrij.</p>`,
  films:[F.adem2]});
E.zet(T,[42],{titel:"Kunstmatige selectie",
  html:`<p>Bij <b>fokken</b> (kunstmatige selectie) bepaalt de mens welke dieren zich voortplanten. Zo komen gewenste eigenschappen vaker voor.</p><p>Genetische variatie in een populatie hangt af van het aantal verschillende allelen en hoe ze verdeeld zijn. Variatie verdwijnt als allelen niet worden doorgegeven, bijvoorbeeld als maar weinig dieren nakomelingen krijgen. Het <b>Y-chromosoom</b> geeft een vader alleen door aan zijn zonen.</p>`,
  films:[F.evo4,F.evo5]});
E.zet(T,[43],{titel:"Soort, genus en populatie",
  html:`<p>Een <b>soort</b> is een groep organismen die zich onderling kan voortplanten en vruchtbare nakomelingen krijgt. De wetenschappelijke naam bestaat uit twee delen: het <b>genus</b> (geslacht) met een hoofdletter en de soortaanduiding, bijvoorbeeld <i>Homo sapiens</i>. Een derde naam geeft een <b>ondersoort</b> aan.</p><p>Een <b>populatie</b> is een groep individuen van één soort die in hetzelfde gebied leeft en zich onderling voortplant.</p>`,
  films:[F.evo1]});
E.zet(T,[44],{titel:"Een evolutionaire stamboom lezen",
  html:`<p>In een evolutionaire stamboom staan aan de uiteinden soorten of groepen die <b>nu</b> leven. Een vertakkingspunt is een (uitgestorven) <b>gemeenschappelijke voorouder</b>.</p><p>Hoe nauw twee groepen verwant zijn, lees je af aan hun laatste gemeenschappelijke voorouder: hoe recenter, hoe nauwer. Volg de lijnen naar links tot ze samenkomen. Hoe dicht de namen onder elkaar staan, zegt niets.</p>`,
  films:[F.evo8]});

/* ===== opgave 7 · Nierstenen ===== */
E.zet(T,[45,46],{titel:"Bouw van de nier en de urinewegen",
  html:`<p>Een nier heeft drie zones: de <b>nierschors</b> (buiten), het <b>niermerg</b> (met de nierpiramiden) en het <b>nierbekken</b> (de holte in het midden).</p><p>Onderdelen en wat ze doen:</p><ul><li><b>glomerulus</b> met kapsel van Bowman: filtratie, hier ontstaat voorurine;</li><li><b>nierbuisje</b>: terugresorptie van nuttige stoffen en uitscheiding van afvalstoffen;</li><li><b>verzamelbuisje</b>: verzamelt urine van veel nefronen, hier wordt nog water teruggeresorbeerd;</li><li><b>urineleider</b>, <b>blaas</b> en <b>urinebuis</b>: afvoer, opslag en lozing van urine.</li></ul><p>Teken voor jezelf een nefron en de urinewegen, en zet de delen in de volgorde waarin vloeistof erdoorheen stroomt.</p>`,
  films:[F.gas3]});
E.zet(T,[47,48],{titel:"Variabelen en conclusies",
  html:`<ul><li><b>onafhankelijke variabele</b>: wat de onderzoeker zelf kiest en varieert;</li><li><b>afhankelijke variabele</b>: wat de onderzoeker meet, de uitkomst;</li><li><b>constante factoren</b>: wat gelijk gehouden wordt.</li></ul><p>Een uitspraak als ‘hoe meer …, hoe meer …’ klopt alleen als de uitkomst bij elke stap in dezelfde richting verandert. Kijk in een tabel naar de totalen per rij en per kolom en controleer of de reeks echt steeds stijgt of daalt.</p>`,
  films:[F.onderz]});
})();
