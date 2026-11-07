/* Uitleg van de stof · oefenexamen havo 2019-II (tool havo19-2). Gekopieerd naar tools/examen-stof/havo19-2.js door samenvoegen.py. */
(function(){
"use strict";
if(!window.EXSTOF)return;
const E=window.EXSTOF,T="havo19-2";
const anim=(steps,draw)=>box=>E.stappen(box,steps,(st,s,i)=>{st.innerHTML=draw(i,s);});
const caps=a=>a.map(c=>({cap:c}));
const F={dna3:["Van DNA naar eiwit","films/dna/3-van-dna-naar-eiwit.html"],dna4:["De genetische code lezen","films/dna/4-de-genetische-code-lezen.html"],dna5:["Mutaties","films/dna/5-mutaties.html"],
  org:["Een fabriek die leeft","films/cellen/celorganellen/index.html"],lever:["De lever als fabriek","films/voeding/5-de-lever-als-fabriek.html"],darm:["Van darm naar bloed","films/voeding/4-van-darm-naar-bloed.html"],
  erf2:["Monohybride kruisingen","films/erfelijkheid/2-monohybride-kruisingen.html"],erf5:["Overerving via X-chromosomen en mitochondriën","films/erfelijkheid/5-overerving-via-x-chromosomen-en-mitochondrien.html"],erf6:["Stambomen en kansrekenen","films/erfelijkheid/6-stambomen-en-kansrekenen.html"],erf1:["Chromosomen","films/erfelijkheid/1-chromosomen.html"],
  afw2:["Antistoffen op maat","films/afweer/2-antistoffen-op-maat.html"],afw4:["Vaccins, allergie en bloedgroepen","films/afweer/4-vaccins-allergie-en-bloedgroepen.html"],
  syn:["De spleet","films/zenuwstelsel/3-de-spleet.html"],knoei:["Knoeien met de spleet","films/zenuwstelsel/4-knoeien-met-de-spleet.html"],zen2:["Het kabelnetwerk","films/zenuwstelsel/2-het-kabelnetwerk.html"],zen5:["Het hoofdkantoor","films/zenuwstelsel/5-het-hoofdkantoor.html"],zen6:["Leren en onthouden","films/zenuwstelsel/6-leren-en-onthouden.html"],spier:["Spieren en beweging","films/zenuwstelsel/9-spieren-en-beweging.html"],
  evo2:["Natuurlijke selectie","films/evolutie/2-natuurlijke-selectie.html"],evo4:["De mens als selectiefactor","films/evolutie/4-de-mens-als-selectiefactor.html"],evo8:["Stambomen lezen","films/evolutie/8-stambomen-lezen.html"],evo7:["Hoe weten we dat?","films/evolutie/7-hoe-weten-we-dat.html"],
  voed1:["Wat zit er in je eten?","films/voeding/1-wat-zit-er-in-je-eten.html"],voed2:["De reis door je buik","films/voeding/2-de-reis-door-je-buik.html"],
  onderz:["Onderzoek doen","films/cellen/onderzoek-doen/index.html"],gel:["Op lengte gesorteerd","films/dna-technieken/2-op-lengte-gesorteerd/index.html"],
  adem:["Adem in, adem uit","films/gaswisseling/1-adem-in-adem-uit.html"],plant:["Transport in planten","films/transport/6-transport-in-planten.html"],groen:["Alles in het groen","films/stofwisseling/3-alles-in-het-groen.html"],
  eco7:["Stikstof gaat rond","films/ecologie/7-stikstof-gaat-rond.html"],eco3:["Wie eet wie?","films/ecologie/3-wie-eet-wie.html"],eco5:["Waarom zo weinig roofdieren?","films/ecologie/5-waarom-zo-weinig-roofdieren.html"],eco6:["Koolstof gaat rond","films/ecologie/6-koolstof-gaat-rond.html"],eco2:["Waar past een soort?","films/ecologie/2-waar-past-een-soort.html"],
  pomp:["Eén pomp, twee rondjes","films/transport/1-een-pomp-twee-rondjes.html"],hart:["Het hart onder controle","films/transport/5-het-hart-onder-controle.html"],
  adem2:["Alles op adem","films/stofwisseling/2-alles-op-adem.html"],hor5:["Water in balans","films/hormonen/5-water-in-balans.html"],gas3:["Uitscheiding en evenwicht","films/gaswisseling/3-uitscheiding-en-evenwicht.html"],
  zintuig:["Zintuigen","films/zenuwstelsel/8-zintuigen.html"],stres:["Stress","films/hormonen/4-stress.html"]};

/* ===== opgave 1 ===== */
E.zet(T,[1],{titel:"Bouw van het oog",
  html:`<p>Van buiten naar binnen heeft de oogbol drie lagen:</p><ul><li><b>harde oogvlies</b>: het wit van je oog. Aan de voorkant gaat het over in het doorzichtige, bolle <b>hoornvlies</b>, waar het licht binnenkomt;</li><li><b>vaatvlies</b>, dat aan de voorkant overgaat in de <b>iris</b> (het gekleurde deel, met de pupil in het midden) en het straalvormig lichaam met de lensbandjes;</li><li><b>netvlies</b> achterin, met de zintuigcellen.</li></ul><p>Achter de pupil ligt de <b>lens</b>. In een tekening wijst elke lijn naar één laag: volg hem tot het einde.</p>`,
  films:[F.zintuig]});
E.zet(T,[2],{titel:"Van gen naar eiwit",
  html:`<p>Een gen is een stuk DNA met de code voor één eiwit. De code staat in de volgorde van de <b>nucleotiden</b> (basen A, T, C, G).</p><ul><li>Bij de <b>transcriptie</b> wordt het gen overgeschreven in mRNA.</li><li>Bij de <b>translatie</b> leest een ribosoom het mRNA per <b>codon</b>: drie basen achter elkaar. Elk codon staat voor één aminozuur (zie de codontabel in je informatieboek).</li></ul><p>Een <b>mutatie</b> is een verandering in het DNA. Bij een <b>puntmutatie</b> (genmutatie) gaat het om één of enkele nucleotiden.</p>`,
  anim:anim(caps(["Een stukje mRNA wordt per drie basen gelezen.","Elk codon (drie basen) hoort bij één aminozuur.","De volgorde van de aminozuren bepaalt de vorm en dus de werking van het eiwit."]),i=>{const c=["AUG","GCU","UUC","CAU"],a=["Met","Ala","Phe","His"];let g="";c.forEach((t,k)=>{g+=`<rect x="${20+k*100}" y="20" width="90" height="34" rx="4" fill="var(--surface)" stroke="${i>=1?"var(--teal)":"var(--line2)"}"/><text x="${65+k*100}" y="43" text-anchor="middle" style="font:600 16px var(--meta);fill:var(--text)">${t}</text>`;if(i>=1)g+=`<circle cx="${65+k*100}" cy="${i>=2?95:90}" r="22" fill="var(--goud-soft)" stroke="var(--goud)"/><text x="${65+k*100}" y="${i>=2?100:95}" text-anchor="middle" style="font:600 13px var(--tekst);fill:var(--text)">${a[k]}</text>`;});if(i>=2)g+=`<line x1="87" y1="95" x2="343" y2="95" stroke="var(--goud)" stroke-width="2" opacity=".5"/>`;return E.svg("0 0 440 130",g,"Codons op mRNA met de bijbehorende aminozuren");}),
  films:[F.dna3,F.dna4,F.dna5]});
E.zet(T,[3],{titel:"Organellen die eiwitten maken en versturen",
  html:`<p>Eiwitten die een cel uitscheidt of in membranen zet, volgen een vaste route:</p><ul><li><b>ribosomen</b> op het <b>endoplasmatisch reticulum</b> (ER, een netwerk van membranen) maken het eiwit;</li><li>blaasjes brengen het naar het <b>Golgi-systeem</b>: een stapel platte, gebogen zakjes. Daar wordt het eiwit afgewerkt en verpakt;</li><li>nieuwe blaasjes snoeren af en gaan naar de <b>celmembraan</b>.</li></ul><p>Herken organellen aan hun vorm: mitochondriën zijn boonvormig met binnenplooien, de kern is groot en rond met een dubbele membraan met poriën.</p>`,
  films:[F.org]});
E.zet(T,[4],{titel:"Bloed en gal in de lever",
  html:`<p>De lever krijgt bloed via <b>twee</b> bloedvaten:</p><ul><li>de <b>poortader</b>: zuurstofarm bloed uit darmen en milt, rijk aan opgenomen voedingsstoffen;</li><li>de <b>leverslagader</b>: zuurstofrijk bloed, een tak van de aorta.</li></ul><p>In een leverlobje stromen beide langs rijen levercellen naar een <b>centrale ader</b> in het midden; die voert het bloed af naar de leverader. De levercellen maken <b>gal</b> en geven die af aan dunne <b>galgangetjes</b> tussen de cellen. De gal stroomt de andere kant op dan het bloed, naar de galgang aan de rand van het lobje.</p>`,
  films:[F.lever,F.darm]});
E.zet(T,[5,8],{titel:"De lever als fabriek",
  html:`<p>De lever doet veel voor de stofwisseling. Een paar voorbeelden:</p><ul><li><b>koolhydraten</b>: glucose opslaan als glycogeen en weer vrijmaken;</li><li><b>eiwitten</b>: aminozuren uit de darm komen via de poortader eerst in de lever. Je lichaam kan aminozuren niet opslaan; de lever bepaalt wat ermee gebeurt (bekijk de film over de lever);</li><li><b>vetten</b>: gal maken voor de vertering van vet;</li><li>giftige of overtollige stoffen <b>afbreken of uitscheiden via de gal</b>.</li></ul><p>Elke levercel doet dit werk met eiwitten (enzymen en transporteiwitten) die gemaakt worden volgens de genen in die cel.</p>`,
  films:[F.lever]});
E.zet(T,[6,7],{titel:"Stambomen lezen en kansen",
  html:`<p>In een stamboom is een vierkant een man en een rondje een vrouw; ingekleurd betekent ziek.</p><ul><li>Twee gezonde ouders met een ziek kind: de ziekte is <b>recessief</b>; beide ouders zijn drager (Aa).</li><li>Bij <b>X-chromosomale</b> overerving heeft een man maar één X (XY): één recessief allel is bij hem al genoeg om ziek te zijn. Een zoon krijgt zijn X van zijn moeder, een dochter krijgt een X van elke ouder.</li><li>Kansen: zet de ouders als genotype in een kruisingsschema. Bij Aa × Aa is ¼ AA, ½ Aa en ¼ aa.</li></ul>`,
  anim:anim(caps(["Een kruisingsschema: de geslachtscellen van de vader boven, van de moeder links.","Vul elk vakje met één allel van elke ouder.","Tel: bij Aa × Aa is ¼ AA, ½ Aa, ¼ aa."]),i=>{let g="";const v=["A","a"],m=["A","a"];v.forEach((x,k)=>g+=`<text x="${150+k*80}" y="30" text-anchor="middle" style="font:700 18px var(--meta);fill:var(--teal)">${x}</text>`);m.forEach((x,k)=>g+=`<text x="85" y="${85+k*60}" text-anchor="middle" style="font:700 18px var(--meta);fill:var(--koraal)">${x}</text>`);
    for(let r=0;r<2;r++)for(let c=0;c<2;c++){g+=`<rect x="${110+c*80}" y="${50+r*60}" width="80" height="60" fill="${i>=2&&(r+c===1)?"var(--goud-soft)":"none"}" stroke="var(--line2)"/>`;if(i>=1)g+=`<text x="${150+c*80}" y="${86+r*60}" text-anchor="middle" style="font:600 18px var(--meta);fill:var(--text)">${[m[r],v[c]].sort().join("")}</text>`;}return E.svg("0 0 320 180",g,"Kruisingsschema Aa maal Aa");}),
  films:[F.erf2,F.erf5,F.erf6]});

/* ===== opgave 2 ===== */
E.zet(T,[9],{titel:"Bouw past bij functie",
  html:`<p>Bij dieren zie je vaak dat de bouw van een lichaamsdeel past bij wat het moet doen. Kijk bij zo’n vraag naar de vorm en vergelijk die met de omgeving:</p><ul><li>wat moet het dier daar doen (lopen, zwemmen, vastklemmen, graven)?</li><li>welke vorm of welk onderdeel maakt dat makkelijker?</li></ul><p>Noem in je antwoord altijd beide: <b>de bouw</b> én <b>waarom die helpt</b>.</p>`,
  films:[]});
E.zet(T,[10,30],{titel:"Het verworven afweersysteem en allergie",
  html:`<p>Een <b>antigeen</b> is een (lichaamsvreemd) molecuul dat het afweersysteem herkent. Het verworven afweersysteem werkt zo:</p><ul><li>een <b>antigeen-presenterende cel</b> (APC) neemt het antigeen op en laat stukjes ervan zien;</li><li>een <b>T-helpercel</b> herkent dat en activeert de passende <b>B-lymfocyt</b>;</li><li>de B-lymfocyt deelt en wordt <b>plasmacel</b>: die maakt <b>antistoffen</b> (Y-vormige eiwitten) die precies op dat antigeen passen.</li></ul><p>Bij een <b>allergie</b> maakt het lichaam antistoffen tegen een onschuldig antigeen, bijvoorbeeld een eiwit uit voedsel. Die antistoffen gaan op <b>mestcellen</b> zitten. Bij een volgend contact geeft de mestcel histamine af.</p>`,
  films:[F.afw2,F.afw4]});
E.zet(T,[11],{titel:"Impulsoverdracht in de synaps",
  html:`<p>Een zenuwcel geeft een impuls door aan een spiercel (of een andere zenuwcel) via een <b>synaps</b>:</p><ul><li>de impuls bereikt het uiteinde van de zenuwcel en daar komt een <b>neurotransmitter</b> vrij, bijvoorbeeld acetylcholine;</li><li>die bindt aan receptoren van de volgende cel;</li><li>een <b>enzym</b> breekt de neurotransmitter daarna snel af, zodat het signaal stopt. Namen van enzymen eindigen meestal op <b>-ase</b>.</li></ul><p>In een schema betekent een <b>+</b> bij een pijl ‘stimuleert’ en een <b>–</b> ‘remt’.</p>`,
  films:[F.syn,F.knoei]});
E.zet(T,[12],{titel:"Selectie en immunisatie",
  html:`<ul><li><b>Natuurlijke selectie</b>: individuen verschillen erfelijk; wie het best past bij de omstandigheden, overleeft vaker en krijgt meer nakomelingen.</li><li><b>Kunstmatige selectie</b>: de mens kiest bewust welke individuen zich voortplanten, zoals bij het fokken van rassen.</li><li><b>Actieve immunisatie</b>: je lichaam maakt zelf antistoffen, bijvoorbeeld na een vaccinatie.</li><li><b>Passieve immunisatie</b>: je krijgt kant-en-klare antistoffen.</li></ul>`,
  films:[F.evo2,F.evo4]});

/* ===== opgave 3 ===== */
E.zet(T,[13],{titel:"Rekenen in stappen",
  html:`<p>Een rekenvraag los je stap voor stap op:</p><ul><li>schrijf eerst op wat je per eenheid hebt (bijvoorbeeld per uur);</li><li>een percentage reken je om naar een factor: 75% = × 0,75;</li><li>zet alles in <b>dezelfde eenheid</b> (1 kg = 1000 g);</li><li>deel wat je nodig hebt door wat je per eenheid krijgt.</li></ul><p>Op het examen telt de berekening mee: schrijf elke stap op.</p>`,
  films:[]});
E.zet(T,[14,16],{titel:"Vertering en voedingsstoffen",
  html:`<p>In maag en darm breken enzymen grote moleculen af: eiwitten tot aminozuren, vetten tot vetzuren en glycerol, koolhydraten tot enkelvoudige suikers. Harde delen zoals botten, schelpen en chitine zijn slecht verteerbaar.</p><p>Voedingsstoffen hebben drie functies:</p><ul><li><b>bouwstof</b>: om cellen en weefsels te maken (eiwitten, maar ook vetten in membranen, mineralen in botten);</li><li><b>brandstof</b>: voor energie (koolhydraten en vetten, eventueel eiwitten);</li><li><b>beschermende stof</b>: vitamines en mineralen. Vitamine A, D, E en K lossen op in vet.</li></ul>`,
  films:[F.voed1,F.voed2]});
E.zet(T,[15,17],{titel:"Controle in onderzoek",
  html:`<p>Om iets te kunnen concluderen, vergelijk je altijd met een <b>controle</b>:</p><ul><li>een <b>controlegroep</b> is zoveel mogelijk gelijk aan de onderzoeksgroep, alleen de factor die je onderzoekt is anders;</li><li>een <b>negatieve controle</b> moet geen uitslag geven. Geeft hij toch een uitslag, dan is er iets mis met de methode (vervuiling, de test reageert op iets anders);</li><li>een <b>positieve controle</b> moet wel een uitslag geven: zo weet je dat de test werkt.</li></ul>`,
  films:[F.onderz]});
E.zet(T,[18],{titel:"DNA aantonen met een gel",
  html:`<p>Met een PCR maak je van een stukje DNA met een bekende basevolgorde heel veel kopieën. Dat stukje is alleen aanwezig als het DNA van die soort in het monster zat.</p><p>Bij <b>gelelektroforese</b> gaan de DNA-stukjes door een gel. Kleine stukjes gaan verder dan grote. Een <b>marker</b> met stukjes van bekende lengte staat ernaast als liniaal. Een duidelijke <b>band</b> in een baan betekent: dit DNA-stukje zat in het monster. Een lege baan: niet (of te weinig).</p>`,
  films:[F.gel]});

/* ===== opgave 4 ===== */
E.zet(T,[19],{titel:"Erfelijk, besmettelijk of uit de omgeving?",
  html:`<p>Een ziekte kan verschillende oorzaken hebben. Elke oorzaak geeft een eigen patroon:</p><ul><li><b>erfelijk</b>: komt vaker voor in bepaalde families of rassen, bij verwante dieren;</li><li><b>besmettelijk</b>: verspreidt zich van ziek naar gezond, vooral bij dieren die contact met elkaar hebben;</li><li><b>uit de omgeving</b> (bijvoorbeeld een gif): treft alle dieren op één plek, ongeacht familie of contact met anderen.</li></ul><p>Zoek in de tekst voor elke oorzaak een gegeven dat er <b>niet</b> bij past.</p>`,
  films:[F.onderz]});
E.zet(T,[20],{titel:"Hoe je ademt",
  html:`<p>De longen hebben geen eigen spieren. Spieren maken de borstholte groter (inademen) of kleiner (uitademen):</p><ul><li>bij <b>borstademhaling</b> trekken spieren tussen de ribben de ribben omhoog en naar buiten;</li><li>bij <b>buikademhaling</b> trekt de koepelvormige spier onder de longen samen en wordt platter;</li><li>bij zware inspanning helpen hulpspieren in hals en buik mee.</li></ul>`,
  films:[F.adem]});
E.zet(T,[21],{titel:"Wat een plant opneemt",
  html:`<p>Een plant maakt alle organische stoffen zelf. De bouwstenen haalt hij uit zijn omgeving:</p><ul><li>via de <b>wortels</b> (wortelharen) water met opgeloste <b>mineralen</b>, zoals nitraat, ammonium, fosfaat en kalium. Die gaan via de houtvaten omhoog;</li><li>via de <b>huidmondjes</b> in de bladeren gassen uit de lucht. Bij de fotosynthese legt de plant daarmee koolstof vast in glucose.</li></ul><p>Elke atoomsoort in een organische stof moet uit een van die bronnen komen: tel welke atomen in de structuurformule staan.</p>`,
  films:[F.plant,F.groen]});
E.zet(T,[22],{titel:"Genen en genexpressie",
  html:`<p>Een organisme kan een stof alleen maken als het de <b>genen</b> heeft voor de enzymen die nodig zijn. Maar genen hebben is niet genoeg: een gen moet ook <b>tot expressie komen</b> (afgelezen worden). Hoe sterk dat gebeurt, kan per soort, per weefsel en per moment verschillen.</p><p>Lees bij een tabel altijd de kolomkoppen en de eenheden goed.</p>`,
  films:[F.dna3]});
E.zet(T,[23,24],{titel:"Evolutionaire stambomen",
  html:`<p>In een evolutionaire stamboom staan de huidige groepen bovenaan. Elk splitspunt op de stam is een <b>gemeenschappelijke voorouder</b> van alle groepen erboven.</p><ul><li>Een eigenschap die een voorouder had, kan hij doorgeven aan alle groepen erboven;</li><li>een groep kan een eigenschap ook later weer <b>kwijtraken</b>;</li><li>volg de lijn vanaf een huidige groep naar beneden: zo zie je langs welke voorouders zijn eigenschappen kwamen.</li></ul><p>Een conclusie uit weinig monsters is minder betrouwbaar: kijk altijd hoeveel er onderzocht is.</p>`,
  films:[F.evo8,F.evo7]});

/* ===== opgave 5 ===== */
E.zet(T,[25],{titel:"Eiwitten en aminozuren",
  html:`<p>Eiwitten zijn ketens van <b>aminozuren</b>; er zijn twintig soorten. Bij de vertering worden eiwitten afgebroken tot losse aminozuren, en je lichaam bouwt daar eigen eiwitten van.</p><p>Een aantal aminozuren kan je lichaam zelf maken uit andere aminozuren. De rest <b>moet</b> uit je voeding komen. Een eiwitbron is waardevoller als hij al die onmisbare aminozuren bevat.</p>`,
  films:[F.voed1,F.lever]});
E.zet(T,[26,27],{titel:"De stikstofkringloop",
  html:`<ul><li>Planten nemen stikstof op als <b>nitraat</b> (NO₃⁻) of <b>ammonium</b> (NH₄⁺) en maken er eiwitten van.</li><li>Dieren eten de eiwitten. Overtollige aminozuren breekt de lever af; de stikstof wordt uitgescheiden als <b>ureum</b> in de urine.</li><li>Uit ureum en mest ontstaat <b>ammoniak</b> (NH₃), deels als gas naar de lucht, deels als ammonium in de bodem.</li><li><b>Nitrificerende bacteriën</b> zetten ammonium om in <b>nitriet</b> (NO₂⁻) en dan in <b>nitraat</b> (NO₃⁻).</li></ul><p><b>Eutrofiëring</b>: te veel voedingsstoffen (zoals stikstof) in natuur of water. Een paar snelgroeiende soorten gaan overheersen en andere soorten verdwijnen.</p>`,
  anim:anim(caps(["Stikstof zit in eiwitten van planten en dieren.","Bij afbraak komt het vrij als ammoniak / ammonium.","Bacteriën maken er nitriet en dan nitraat van, dat planten weer opnemen."]),i=>{const k=[["eiwit",60],["NH₄⁺",200],["NO₂⁻",320],["NO₃⁻",440]];let g="";k.forEach(([t,x],j)=>{const on=(i===0&&j===0)||(i===1&&j<=1)||i===2;g+=`<rect x="${x-45}" y="40" width="90" height="40" rx="6" fill="${on?"var(--teal-soft)":"none"}" stroke="${on?"var(--teal)":"var(--line2)"}"/><text x="${x}" y="66" text-anchor="middle" style="font:600 16px var(--meta);fill:var(--text)">${t}</text>`;if(j<3)g+=`<line x1="${x+47}" y1="60" x2="${k[j+1][1]-49}" y2="60" stroke="var(--text3)" stroke-width="1.5"/>`;});if(i===2)g+=`<path d="M440,82 C440,130 60,130 60,84" fill="none" stroke="var(--groen)" stroke-width="2" stroke-dasharray="5 4"/><text x="250" y="138" text-anchor="middle" style="font:13px var(--tekst);fill:var(--text2)">opname door planten</text>`;return E.svg("0 0 500 150",g,"Stikstof van eiwit via ammonium en nitriet naar nitraat");}),
  films:[F.eco7]});
E.zet(T,[28,29],{titel:"Energie in voedselketens",
  html:`<p>In een voedselketen staan <b>producenten</b> (planten) onderaan, daarboven consumenten van de 1e, 2e, … orde. Elke plaats in de keten is een <b>trofisch niveau</b>.</p><p>Van de energie die een dier opneemt, wordt maar een klein deel lichaamsmassa. De rest gaat verloren:</p><ul><li>via <b>dissimilatie</b>: voor bewegen, onderhoud en het op temperatuur houden van het lichaam (warmte);</li><li>via mest (niet verteerd).</li></ul>`,
  films:[F.eco3,F.eco5]});

/* ===== opgave 6 ===== */
E.zet(T,[31,33],{titel:"Chromosomen en mutaties",
  html:`<p>Een mens heeft 23 paar chromosomen. Van elk paar komt er één van de vader en één van de moeder. Die twee hebben dezelfde genen op dezelfde plek, maar niet altijd dezelfde <b>allelen</b>.</p><p>Soorten mutaties:</p><ul><li><b>genmutatie</b> (puntmutatie): verandering in één of enkele nucleotiden;</li><li><b>chromosoommutatie</b>: verandering in de bouw van een chromosoom (een stuk weg, verdubbeld of verplaatst);</li><li><b>genoommutatie</b>: verandering in het aantal chromosomen.</li></ul><p>Bij de meiose gaan de chromosomen van een paar uit elkaar. Gaat dat mis, dan krijgt een eicel of zaadcel er één te veel of te weinig.</p>`,
  films:[F.erf1,F.dna5]});
E.zet(T,[32],{titel:"De bloedsomloop",
  html:`<p>Bloed maakt twee rondjes:</p><ul><li><b>grote bloedsomloop</b>: linkerkamer → aorta → slagaders → haarvaten in een orgaan → aders → holle aders → rechterboezem;</li><li><b>kleine bloedsomloop</b>: rechterkamer → longslagader → longen → longaders → linkerboezem.</li></ul><p>Een slagader brengt bloed naar een orgaan toe, een ader voert het af. Bloed uit de onderste helft van het lichaam komt via de <b>onderste</b> holle ader in het hart, bloed uit hoofd en armen via de <b>bovenste</b>. Wil bloed van het ene orgaan naar het andere, dan moet het altijd eerst door het hart én de longen.</p>`,
  films:[F.pomp]});
E.zet(T,[34],{titel:"Prenatale diagnostiek",
  html:`<p>Met prenatale tests kun je tijdens de zwangerschap onderzoeken of een kind mogelijk een aandoening heeft. Een <b>niet-invasieve</b> test (bloed van de moeder) is zonder risico voor het kind; bij een afwijkende uitslag volgt een vervolgonderzoek.</p><p>Wat ouders met de uitslag doen, is hun eigen keuze. Weten heeft ook gevolgen voor de tijd vóór en vlak na de geboorte, en voor hoe de ouders zich voelen.</p>`,
  films:[]});

/* ===== opgave 7 ===== */
E.zet(T,[35],{titel:"Zenuwcellen en zenuwstelsels",
  html:`<ul><li><b>Sensorische</b> zenuwcellen brengen impulsen van zintuigen naar het centrale zenuwstelsel.</li><li><b>Motorische</b> zenuwcellen brengen impulsen van het centrale zenuwstelsel naar spieren en klieren.</li></ul><p>Het zenuwstelsel heeft twee delen:</p><ul><li><b>animaal</b>: regelt bewuste waarneming en de skeletspieren, die je bewust beweegt;</li><li><b>autonoom</b>: regelt onbewust de werking van inwendige organen, zoals hart, darmen en klieren.</li></ul>`,
  films:[F.zen2,F.zen5]});
E.zet(T,[36],{titel:"Energie opslaan",
  html:`<p>Een dier slaat reservebrandstof op als <b>glycogeen</b> (in lever en spieren) of als <b>vet</b> (in vetweefsel). Per gram leveren ze niet evenveel energie: vet levert meer dan twee keer zoveel als koolhydraten.</p><p>Bij een vergelijking zoals deze denk je in twee stappen: wat betekent het verschil per gram voor de <b>massa</b> die het dier meedraagt, en wat betekent die massa voor wat het dier moet doen?</p>`,
  films:[F.adem2,F.voed1]});
E.zet(T,[37,39],{titel:"Klimaat en timing in de natuur",
  html:`<p>Gassen zoals CO₂ en methaan houden warmte vast in de atmosfeer. Door verbranding van fossiele brandstoffen en de veeteelt komt er steeds meer van in de lucht, waardoor de aarde opwarmt.</p><p>Veel dieren hebben een vaste <b>kalender</b>: ze trekken, broeden of komen uit rond een vaste datum. Hun voedsel hangt vaak af van het weer (dooi, temperatuur). Als dat door opwarming verschuift, kan er een <b>mismatch</b> ontstaan tussen het moment dat de dieren voedsel nodig hebben en het moment dat het er is.</p><p>Bij een spreidingsdiagram met een trendlijn: lees af hoe de ene grootheid verandert als de andere groter wordt.</p>`,
  films:[F.eco6,F.eco2]});
E.zet(T,[38],{titel:"Oppervlak en inhoud",
  html:`<p>Een dier maakt warmte in zijn hele lichaam (de <b>inhoud</b>) en geeft warmte af via zijn huid (het <b>oppervlak</b>).</p><p>Als je een vorm kleiner maakt, neemt de inhoud sneller af dan het oppervlak. Dat zie je bij kubussen:</p>`,
  anim:anim(caps(["Een kubus van 1 cm: oppervlak 6 cm², inhoud 1 cm³.","Een kubus van 2 cm: oppervlak 24 cm², inhoud 8 cm³.","Per cm³ inhoud: 6 cm² tegen 3 cm². Het kleine blokje heeft relatief meer oppervlak."]),i=>{let g="";const k=(x,y,z,on)=>`<rect x="${x}" y="${y}" width="${z}" height="${z}" fill="${on?"var(--teal-soft)":"none"}" stroke="var(--teal)" stroke-width="2"/>`;g+=k(60,90,40,i!==1)+`<text x="80" y="155" text-anchor="middle" style="font:13px var(--tekst);fill:var(--text2)">1 cm</text>`;if(i>=1)g+=k(200,50,80,i===1)+`<text x="240" y="155" text-anchor="middle" style="font:13px var(--tekst);fill:var(--text2)">2 cm</text>`;if(i===2)g+=`<text x="330" y="80" style="font:600 14px var(--meta);fill:var(--text)">6 : 1</text><text x="330" y="110" style="font:600 14px var(--meta);fill:var(--text)">24 : 8 = 3 : 1</text>`;return E.svg("0 0 460 170",g,"Twee kubussen: oppervlak tegen inhoud");}),
  films:[]});
E.zet(T,[40],{titel:"Trofische niveaus en voedsel zoeken",
  html:`<p>Het <b>trofisch niveau</b> is de plaats in de voedselketen: producent (planten), consument van de 1e orde (planteneter), 2e orde (eet planteneters), enzovoort. Een dier dat zowel planten als dieren eet, zit op meerdere niveaus tegelijk.</p><p>Bij een diagram met ingraafdiepte: vergelijk de lengte van het ‘gereedschap’ van een dier (snavel, tong, poten) met de diepte waarop het voedsel zit. Let ook op hoeveel voedsel er is (dichtheid) en hoe voedzaam het is: dat bepaalt hoe lang een dier moet zoeken.</p>`,
  films:[F.eco3]});
E.zet(T,[41],{titel:"Evolutie door natuurlijke selectie",
  html:`<p>Natuurlijke selectie werkt in een vaste volgorde:</p><ol style="margin:0;padding-left:20px"><li>binnen een populatie is er <b>erfelijke variatie</b>;</li><li>in een bepaalde omgeving geeft een variant een <b>voordeel</b>;</li><li>die individuen <b>overleven</b> vaker en krijgen <b>meer nakomelingen</b>, die de eigenschap erven.</li></ol><p>Over veel generaties verandert zo de populatie. Een individu past zich niet zelf aan zijn omgeving aan: de populatie verandert doordat sommige varianten het beter doen.</p>`,
  films:[F.evo2]});

/* ===== opgave 8 ===== */
E.zet(T,[42],{titel:"Delen van de hersenen",
  html:`<ul><li><b>Grote hersenen</b> (met de geplooide hersenschors): bewuste waarneming, willekeurige bewegingen, denken, taal, leren en onthouden.</li><li><b>Kleine hersenen</b> (achteronder, met een boomachtige tekening in doorsnede): coördinatie van bewegingen en evenwicht.</li><li><b>Hersenstam</b> (met de verlengde merg): onder andere ademhaling, hartslag en reflexen.</li><li><b>Ruggenmerg</b>: verbinding tussen hersenen en lichaam, en reflexen.</li></ul>`,
  films:[F.zen5,F.zen6]});
E.zet(T,[43],{titel:"Bloedvaten van de lever",
  html:`<p>De <b>aorta</b> is de grote slagader uit de linkerkamer. In de <b>haarvaten</b> van een orgaan neemt het orgaan stoffen op uit het bloed of geeft het stoffen af.</p><p>Het bloed uit de lever gaat via de <b>leverader</b> naar de onderste holle ader. In die holle ader komt ook bloed uit andere organen (nieren, benen) samen.</p>`,
  films:[F.pomp,F.lever]});
E.zet(T,[44],{titel:"Remmende en stimulerende synapsen",
  html:`<p>Een neurotransmitter bindt aan receptoren van de volgende zenuwcel. Er zijn twee soorten werking:</p><ul><li><b>stimulerend</b>: de volgende cel gaat sneller impulsen afgeven;</li><li><b>remmend</b>: de volgende cel geeft minder makkelijk impulsen af.</li></ul><p>Sommige stoffen (drugs, medicijnen) grijpen in op een synaps: ze bootsen een neurotransmitter na, blokkeren receptoren of remmen de afbraak.</p>`,
  films:[F.syn,F.knoei]});
E.zet(T,[45],{titel:"Het autonome zenuwstelsel en de bloeddruk",
  html:`<p>Het autonome zenuwstelsel heeft twee delen met een tegengesteld effect:</p><ul><li><b>orthosympatisch</b>: zet het lichaam in actie (vechten of vluchten): hogere hartslag, meer adrenaline;</li><li><b>parasympatisch</b>: zorgt voor rust en herstel: lagere hartslag, vertering.</li></ul><p>De bloeddruk hangt af van hoeveel bloed het hart per minuut wegpompt (hartslagfrequentie × slagvolume) en van de wijdte van de bloedvaten.</p>`,
  films:[F.hart,F.stres]});
E.zet(T,[46],{titel:"Energie voor spieren",
  html:`<p>Een spiervezel heeft <b>ATP</b> nodig om samen te trekken. ATP komt uit de <b>dissimilatie</b> van brandstof, vooral glucose. Spiercellen hebben een voorraad glucose in de vorm van <b>glycogeen</b>. Bij lange inspanning raakt die voorraad op.</p><p>Bij een volgordevraag: zoek de <b>oorzaak</b> die vooraan staat en het <b>gevolg</b> dat je merkt, en zet de tussenstap ertussen.</p>`,
  films:[F.adem2,F.spier]});
E.zet(T,[47],{titel:"ADH en de nieren",
  html:`<p>In de nieren wordt bloed gefilterd: er ontstaat veel <b>voorurine</b>. Daarna wordt het meeste water weer teruggehaald (<b>terugresorptie</b>), vooral in de verzamelbuisjes.</p><p><b>ADH</b> (antidiuretisch hormoon, uit de hypofyse) maakt de wand van de verzamelbuisjes beter doorlaatbaar voor water. Veel ADH: veel water terug, weinig geconcentreerde urine. Weinig ADH: weinig water terug, veel verdunde urine.</p>`,
  films:[F.hor5,F.gas3]});
})();
