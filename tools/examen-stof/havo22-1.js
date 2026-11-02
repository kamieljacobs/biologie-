/* Uitleg van de stof · oefenexamen havo 2022 tijdvak 1 (tool havo22-1). Wordt door samenvoegen.py gekopieerd naar tools/examen-stof/havo22-1.js. */
(function(){
"use strict";
const E=window.EXSTOF, T="havo22-1";if(!E)return;
const caps=a=>a.map(c=>({cap:c}));
const anim=(steps,draw)=>box=>E.stappen(box,steps,(st,s,i)=>{st.innerHTML=draw(i,s);});

/* ---------- opgave 1: Alg doet oliepalm na ---------- */
E.zet(T,[1],{titel:"Duurzaamheid: ecologisch, economisch, sociaal",
  html:`<p>Iets is <b>duurzaam</b> als het nu kan zonder dat latere generaties er last van hebben. Je kunt het van drie kanten bekijken:</p>
  <ul><li><b>ecologisch</b>: de gevolgen voor natuur en milieu, zoals leefgebied, biodiversiteit, vervuiling, uitstoot van broeikasgassen en het gebruik van grondstoffen en energie;</li>
  <li><b>economisch</b>: de kosten en de opbrengst;</li><li><b>sociaal</b>: de gevolgen voor mensen, zoals werk en gezondheid.</li></ul>
  <p>Bij een product kijk je naar de hele keten: de teelt, de verwerking en het vervoer naar de plek waar het gebruikt wordt. Elke stap kan een ecologische ‘prijs’ hebben.</p>`,
  films:[["Binnen de grenzen","films/ecologie/5-binnen-de-grenzen.html"],["Koolstof gaat rond","films/ecologie/6-koolstof-gaat-rond.html"]]});
E.zet(T,[2,5],{titel:"Assimilatie, dissimilatie en levenswijze",
  html:`<p><b>Assimilatie</b> = stoffen opbouwen (kost energie). <b>Dissimilatie</b> = stoffen afbreken, waarbij energie vrijkomt (aeroob met zuurstof, anaeroob zonder).</p>
  <p>Bij assimilatie zijn er twee stappen. Eerst maakt een plant of alg met lichtenergie glucose uit CO<sub>2</sub> en water: <b>koolstofassimilatie</b> (fotosynthese). Daarna bouwt een organisme uit glucose (en zouten als nitraat) andere organische stoffen op. Ook die stap is assimilatie, en die doen álle organismen, ook dieren.</p>
  <p>Een organisme dat zijn organische stoffen helemaal zelf maakt uit anorganische stoffen is <b>autotroof</b>. Een organisme dat organische stoffen uit zijn omgeving opneemt (eten, of opnemen uit een oplossing) is <b>heterotroof</b>.</p>`,
  films:[["Alles in het groen","films/stofwisseling/3-alles-in-het-groen.html"],["Alles op adem","films/stofwisseling/2-alles-op-adem.html"]]});
E.zet(T,[3],{titel:"Plantencel, dierlijke cel, schimmelcel",
  html:`<p>Planten, dieren en schimmels zijn <b>eukaryoten</b>: hun cellen hebben een celkern en mitochondriën. Bacteriën (prokaryoten) hebben geen celkern.</p>
  <ul><li><b>plantencel</b>: celwand (cellulose), vaak chloroplasten, grote vacuole;</li>
  <li><b>dierlijke cel</b>: geen celwand, geen chloroplasten, hooguit kleine vacuolen.</li></ul>
  <p>Schimmels zijn geen planten: ze doen geen fotosynthese. Zoek in je boek of informatieboek op welke van de onderdelen hierboven een schimmelcel wél heeft.</p>
  <p>Wil je twee groepen uit elkaar houden, zoek dan een kenmerk dat de ene groep wel heeft en de andere niet.</p>`,
  films:[["Celorganellen","films/cellen/celorganellen/index.html"],["Wat groeit er op je boterham?","films/cellen/microben.html"]]});
E.zet(T,[4],{titel:"Osmose: hypertoon, isotoon, hypotoon",
  html:`<p>Bij <b>osmose</b> verplaatst water zich door een membraan dat wel water maar (bijna) geen opgeloste stoffen doorlaat. Water gaat naar de kant met de <b>hoogste osmotische waarde</b>: de kant met de meeste opgeloste deeltjes.</p>
  <p>Je vergelijkt een oplossing altijd mét iets, meestal de inhoud van een cel: <b>hypertoon</b> = hogere osmotische waarde dan de cel, <b>isotoon</b> = gelijk, <b>hypotoon</b> = lager. Hieronder zie je een dierlijke cel in een <b>hypotone</b> oplossing.</p>`,
  anim:anim(caps(["Een cel in een oplossing met minder opgeloste deeltjes dan de cel (hypotoon).","Water gaat naar de kant met de hoogste osmotische waarde: de cel in.","De cel zwelt. Een dierlijke cel kan zelfs barsten; een plantencel wordt tegengehouden door de celwand."]),
    i=>E.svg("0 0 400 180",`<rect width="400" height="180" fill="var(--surface2)"/>${[...Array(6)].map((_,k)=>`<circle cx="${30+k*62}" cy="${k%2?30:150}" r="5" fill="var(--teal)"/>`).join("")}
    <circle cx="200" cy="90" r="${[52,58,68][i]}" fill="var(--teal-soft)" stroke="var(--text)" stroke-width="2"/>${[...Array(10)].map((_,k)=>`<circle cx="${178+(k%4)*14}" cy="${70+Math.floor(k/4)*18}" r="5" fill="var(--teal)"/>`).join("")}
    ${i>=1?`<path d="M90,90 h40 M310,90 h-40" stroke="var(--goud)" stroke-width="3"/><text class="lbl" x="110" y="80" text-anchor="middle">water</text><text class="lbl" x="290" y="80" text-anchor="middle">water</text>`:""}`,"Cel in een hypotone oplossing")),
  films:[["Diffusie en osmose","films/cellen/diffusie-osmose/index.html"]]});
E.zet(T,[6],{titel:"Groeicurve en beperkende factor",
  html:`<p>Een populatie in een afgesloten ruimte (zoals een bioreactor) groeit eerst langzaam, dan snel (exponentieel), en stopt dan: de curve buigt af naar een <b>stabiel niveau</b>.</p>
  <p>Groei stopt door een <b>beperkende factor</b>: de factor die als eerste tekortschiet (een voedingsstof, licht, ruimte) of een opstapeling van afvalstoffen. Zoek in een grafiek naar het moment waarop de groei verandert, en kijk welke factor op dat moment ook verandert.</p>
  <p>Let op het verschil tussen <b>populatiedichtheid</b> (het aantal individuen) en <b>biomassa</b> (de massa aan organisme).</p>`,
  films:[["Hoeveel passen er?","films/ecologie/1-hoeveel-passen-er.html"]]});
E.zet(T,[7],{titel:"Elementen in organische stoffen",
  html:`<table class="data"><tr><th>stof</th><th>bevat de elementen</th></tr><tr><td>koolhydraten (glucose, zetmeel)</td><td>C, H, O</td></tr><tr><td>vetten en vetzuren</td><td>C, H, O</td></tr><tr><td>aminozuren en eiwitten</td><td>C, H, O, N (soms S)</td></tr><tr><td>DNA en RNA</td><td>C, H, O, N, P</td></tr></table>
`,
  films:[["Wat zit er in je eten?","films/voeding/1-wat-zit-er-in-je-eten.html"]]});
E.zet(T,[8],{titel:"Genetische modificatie",
  html:`<p>Een eigenschap ligt vast in <b>genen</b> in het DNA. Een gen bevat de code voor een eiwit; dat eiwit zorgt voor de eigenschap.</p>
  <p>Bij <b>genetische modificatie</b> verandert een onderzoeker het DNA van een organisme met een techniek. Een organisme met DNA van een andere soort heet <b>transgeen</b>. Bij <b>veredeling</b> (kruisen en selecteren) combineer je alleen eigenschappen die binnen één soort al voorkomen.</p>`,
  films:[["CRISPR: wat doet dit gen?","films/vervolg/biomedisch-2-crispr-wat-doet-dit-gen.html"],["Op maat gekopieerd · PCR","films/dna-technieken/1-op-maat-gekopieerd/index.html"]]});

/* ---------- opgave 2: BerkelBike ---------- */
E.zet(T,[9,10],{titel:"Reflexen en de bouw van het zenuwstelsel",
  html:`<p>Het <b>centraal zenuwstelsel</b> = hersenen + ruggenmerg. Het <b>perifeer zenuwstelsel</b> = alle zenuwen daarbuiten.</p>
  <ul><li><b>sensorische</b> zenuwcellen geleiden impulsen van zintuigen naar het centraal zenuwstelsel;</li>
  <li><b>schakelcellen</b> geven impulsen door binnen het centraal zenuwstelsel;</li>
  <li><b>motorische</b> zenuwcellen geleiden impulsen naar spieren of klieren.</li></ul>
  <p>Het <b>animale</b> zenuwstelsel regelt waarneming en de skeletspieren; het <b>autonome</b> zenuwstelsel regelt (onbewust) organen, gladde spieren, hartspier en klieren.</p>
  <p>Een <b>reflex</b> is een snelle, onbewuste reactie. De route van prikkel naar reactie heet de <b>reflexboog</b>. Een reflexboog bestaat uit een zintuig, een sensorische zenuwcel, een of meer schakelcellen, een motorische zenuwcel en een spier of klier.</p>`,
  films:[["Eén seconde","films/zenuwstelsel/1-een-seconde.html"],["Het kabelnetwerk","films/zenuwstelsel/2-het-kabelnetwerk.html"]]});
E.zet(T,[11,12],{titel:"Differentiatie van cellen",
  html:`<p>Alle lichaamscellen ontstaan door <b>mitose</b> uit één bevruchte eicel. Bij mitose krijgt elke dochtercel een kopie van al het DNA: dezelfde chromosomen, dezelfde allelen.</p>
  <p>Toch zijn een zenuwcel, een spiercel en een rode bloedcel heel verschillend. Het proces waarbij cellen zich specialiseren tot een bepaald celtype met een eigen vorm en functie heet <b>differentiatie</b>. Sommige cellen in je lichaam zijn nog niet gedifferentieerd en kunnen nog verschillende kanten op.</p>
  <p>Begrippen: <b>genoom</b> = al het DNA van een organisme; <b>genotype</b> = de allelen die iemand heeft; <b>karyotype</b> = het aantal en de vorm van de chromosomen; <b>genexpressie</b> = het aflezen van een gen tot een eiwit.</p>`,
  films:[["Hoe weet een cel wat hij moet worden?","films/extra/hoe-weet-een-cel.html"]]});
E.zet(T,[13],{titel:"Bouw van een zenuwcel",
  html:`<p>Een zenuwcel heeft een cellichaam, korte uitlopers (dendrieten) en één lange uitloper: het <b>axon</b>. Veel axonen zijn omgeven door een isolerende <b>myelineschede</b>. Die wordt gevormd door aparte cellen die zich om het axon heen wikkelen. Tussen die cellen zitten insnoeringen (de knopen van Ranvier), waardoor de impuls sneller gaat.</p>
  <p>Myeline komt voor in het centraal én in het perifeer zenuwstelsel, maar wordt in die twee delen door verschillende celtypen gemaakt.</p>`,
  films:[["Het kabelnetwerk","films/zenuwstelsel/2-het-kabelnetwerk.html"]]});

/* ---------- opgave 3: zonnedauw ---------- */
E.zet(T,[14],{titel:"Transport in planten",
  html:`<p>In een vaatbundel liggen twee soorten vaten:</p>
  <ul><li><b>houtvaten</b>: dode, holle cellen; vervoeren water met opgeloste zouten vanuit de wortels omhoog;</li>
  <li><b>bastvaten (zeefvaten)</b>: levende cellen; vervoeren een oplossing van organische stoffen vanaf de plek waar ze gemaakt of opgeslagen worden naar de plek waar ze nodig zijn.</li></ul>`,
  films:[["Transport in planten","films/transport/6-transport-in-planten.html"]]});
E.zet(T,[15,16],{titel:"Rekenen met een formule en tabel",
  html:`<p>Bij een opgave met een formule en een tabel werk je in stappen:</p>
  <ol style="margin:0;padding-left:20px"><li>Lees precies wat elke letter in de formule betekent.</li><li>Bepaal per regel van de tabel in welke groep hij valt. Zet eventueel een streepje of letter in de kantlijn.</li><li>Tel per groep. Controleer: tellen de groepen samen op tot het aantal regels?</li><li>Vul in en rond af zoals gevraagd (bijvoorbeeld twee decimalen).</li></ol>
  <p><b>Bestuiving</b>: stuifmeel komt van de meeldraden op de stempel. Veel planten zijn daarvoor afhankelijk van insecten. Zonder bestuiving geen bevruchting en geen zaden.</p>`,
  films:[["Onderzoek doen in de biologie","films/cellen/onderzoek-doen/index.html"]]});
E.zet(T,[17],{titel:"Exoten",
  html:`<p>Een <b>exoot</b> is een soort die door de mens in een gebied terechtkomt waar hij van nature niet voorkomt. Vaak heeft hij daar geen natuurlijke vijanden en kan hij zich snel uitbreiden.</p>
  <p>Soorten in een ecosysteem hangen op veel manieren met elkaar samen: ze concurreren, eten elkaar, helpen elkaar of brengen ziektes over. Een nieuwe soort kan in elk van die relaties ingrijpen.</p>`,
  films:[["Waar past een soort?","films/ecologie/2-waar-past-een-soort.html"],["Ingrijpen of laten gaan?","films/ecologie/4-ingrijpen-of-laten-gaan.html"]]});

/* ---------- opgave 4: Okselfris ---------- */
E.zet(T,[18,20],{titel:"Een goed onderzoek opzetten",
  html:`<ul><li><b>Onafhankelijke variabele</b>: wat je zelf verandert. <b>Afhankelijke variabele</b>: wat je meet.</li>
  <li><b>Controlevariabelen</b>: alles wat je gelijk houdt, zodat alleen de onafhankelijke variabele verschilt.</li>
  <li><b>Controlegroep</b>: een groep die de behandeling niet krijgt, om mee te vergelijken.</li>
  <li><b>Valide</b>: je meet echt wat je wilt meten; er spelen geen andere factoren mee. <b>Betrouwbaar</b>: bij herhaling krijg je hetzelfde resultaat (dus herhalen, genoeg proefpersonen of monsters).</li></ul>
  <p>Een onderzoeksopzet beschrijft: wat je gebruikt, welke groepen je maakt, wat je bij elke groep doet, wat je gelijk houdt, en wat je wanneer meet.</p>`,
  films:[["Onderzoek doen in de biologie","films/cellen/onderzoek-doen/index.html"],["Kun je onderzoek vertrouwen?","films/extra/kun-je-onderzoek-vertrouwen.html"]]});
E.zet(T,[19],{titel:"Bacteriën, concurrentie en antibiotica",
  html:`<p>Op je huid leven veel soorten bacteriën samen. Ze <b>concurreren</b> om dezelfde voedingsstoffen en om ruimte. Welke soort domineert, hangt af van wie het snelst groeit en wie er al zit.</p>
  <p>Een <b>antibioticum</b> is een stof die bacteriën doodt of hun groei remt.</p>`,
  films:[["Wat groeit er op je boterham?","films/cellen/microben.html"],["Antibioticaresistentie","films/vervolg/labtechniek-4-antibioticaresistentie.html"]]});

/* ---------- opgave 5: diabetes ---------- */
E.zet(T,[21],{titel:"Organisatieniveaus",
  html:`<p>Biologie kun je bekijken op verschillende <b>organisatieniveaus</b>, van klein naar groot: molecuul → organel → cel → weefsel → orgaan → orgaanstelsel → organisme → populatie → ecosysteem → biosfeer.</p>
  <p>Een verandering op een laag niveau kan leiden tot veranderingen op hogere niveaus. Een oorzaak-gevolgketen loopt vaak van klein naar groot.</p>`,
  films:[["Van molecuul tot biosfeer","films/cellen/van-molecuul-tot-biosfeer.html"]]});
E.zet(T,[22],{titel:"Urinevorming in de nier",
  html:`<p>1 <b>Ultrafiltratie</b>: in het kapsel van Bowman wordt bloedplasma (zonder bloedcellen en grote eiwitten) uit de haarvaten geperst: de voorurine.<br>2 <b>Terugresorptie</b>: in de nierbuisjes worden nuttige stoffen (glucose, zouten) actief teruggenomen naar het bloed; water volgt door osmose.<br>3 Wat overblijft, is urine.</p>
  <p>Hoeveel water er terug gaat, hangt af van het verschil in osmotische waarde tussen de inhoud van de nierbuisjes en het weefsel eromheen (en van ADH).</p>`,
  films:[["Uitscheiding en evenwicht","films/gaswisseling/3-uitscheiding-en-evenwicht.html"],["Water in balans","films/hormonen/5-water-in-balans.html"]]});
E.zet(T,[23,24],{titel:"Bloedsuikerspiegel en diabetes",
  html:`<p>Na een maaltijd stijgt de glucoseconcentratie in het bloed. De β-cellen in de eilandjes van Langerhans geven dan <b>insuline</b> af. Insuline zorgt dat lever-, spier- en vetcellen glucose opnemen (en dat de lever glucose omzet in glycogeen): de glucoseconcentratie <b>daalt</b>. Bij een lage glucoseconcentratie geven α-cellen <b>glucagon</b> af: de lever geeft glucose af. Zo blijft de concentratie rond de normwaarde (negatieve terugkoppeling).</p>
  <p><b>Diabetes type 1</b>: de β-cellen maken geen insuline meer. <b>Diabetes type 2</b>: er is wel insuline, maar de cellen reageren er minder op (insulineresistentie).</p>
  <p>Een grafiek met twee groepen lees je zo: wat is het enige verschil tussen de groepen, en waar lopen de lijnen uit elkaar?</p>`,
  films:[["Suiker in balans","films/hormonen/2-suiker-in-balans.html"]]});
E.zet(T,[25,26],{titel:"Genexpressie, mutatie en epigenetica",
  html:`<p><b>Genexpressie</b>: DNA → (transcriptie) mRNA → (translatie) eiwit. De eiwitten bepalen wat een cel doet.</p>
  <p>Een <b>mutatie</b> is een verandering in de basenvolgorde van het DNA (puntmutatie) of in het aantal of de bouw van chromosomen (genoom- of chromosoommutatie). Mutaties ontstaan willekeurig.</p>
  <p><b>Epigenetica</b>: veranderingen in de genexpressie zónder verandering van de basenvolgorde, bijvoorbeeld door methylgroepen op het DNA. Zo kan een gen worden aan- of uitgezet.</p>`,
  films:[["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"],["Mutaties","films/dna/5-mutaties.html"]]});

/* ---------- opgave 6: GloFish ---------- */
E.zet(T,[27],{titel:"Transgenen en expressie per celtype",
  html:`<p>Een transgen dat bij een bevruchte eicel is ingebouwd, zit na alle celdelingen (mitose) in het DNA van álle lichaamscellen. Of het eiwit wordt gemaakt, hangt af van de genexpressie in dat celtype: met een stukje DNA dat het gen aanzet, kun je kiezen in welk weefsel het werkt.</p>
  <p>Alle organismen gebruiken dezelfde twintig aminozuren en dezelfde genetische code. Daarom kan een gen uit een kwal ook in een vis tot een werkend eiwit worden vertaald.</p>`,
  films:[["Van DNA naar eiwit","films/dna/3-van-dna-naar-eiwit.html"],["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"]]});
E.zet(T,[28,29],{titel:"Kruisingen en chromosomen",
  html:`<p>Een organisme heeft van elk chromosoom twee exemplaren: een <b>homoloog paar</b>, even lang en met dezelfde genen op dezelfde plek. Eén komt van de vader, één van de moeder. Bij de vorming van geslachtscellen gaat van elk paar één chromosoom naar elke geslachtscel.</p>
  <p><b>Homozygoot</b>: op beide chromosomen van het paar hetzelfde allel. <b>Heterozygoot</b>: twee verschillende allelen. Een homozygoot organisme geeft aan al zijn nakomelingen hetzelfde allel door.</p>
  <p>Wil je een hypothese toetsen met een kruising, kies dan ouders waarvan je het genotype kent, en voorspel welke fenotypen er komen als de hypothese klopt.</p>`,
  films:[["Monohybride kruisingen","films/erfelijkheid/2-monohybride-kruisingen.html"],["Chromosomen","films/erfelijkheid/1-chromosomen.html"]]});
E.zet(T,[30],{titel:"Natuurlijke en seksuele selectie",
  html:`<p>Bij <b>natuurlijke selectie</b> hebben individuen met bepaalde erfelijke eigenschappen een grotere kans om te <b>overleven</b> en zich voort te planten, bijvoorbeeld de berkenspanner die op een donkere stam minder opvalt, of een vink met een snavel die beter bij de zaden kan.</p>
  <p>Bij <b>seksuele selectie</b> hangt het voortplantingssucces af van de <b>partnerkeuze</b>: individuen met eigenschappen waar de andere sekse de voorkeur voor heeft, krijgen meer nakomelingen. Denk aan de lange staart van een pauw.</p>`,
  films:[["Natuurlijke selectie","films/evolutie/2-natuurlijke-selectie.html"],["Vormen van selectie","films/evolutie/3-vormen-van-selectie.html"]]});

/* ---------- opgave 7: mazelen ---------- */
E.zet(T,[31,38],{titel:"Specifieke afweer en immunisatie",
  html:`<p>De <b>aangeboren (niet-specifieke)</b> afweer reageert op alles wat lichaamsvreemd is: huid en slijmvliezen, fagocyten, ontstekingsreacties. De <b>verworven (specifieke)</b> afweer reageert op één bepaald antigeen: lymfocyten die antistoffen maken of geïnfecteerde cellen opruimen.</p>
  <p><b>Actieve immunisatie</b>: je krijgt antigenen binnen en je afweersysteem reageert er zelf op. Werkt pas na enige tijd, maar lang. <b>Passieve immunisatie</b>: je krijgt kant-en-klare antistoffen. Werkt meteen, maar kort.</p>`,
  films:[["Antistoffen op maat","films/afweer/2-antistoffen-op-maat.html"],["Vaccins, allergie en bloedgroepen","films/afweer/4-vaccins-allergie-en-bloedgroepen.html"]]});
E.zet(T,[32,33],{titel:"Hersendelen en ademhalingsspieren",
  html:`<p><b>Grote hersenen (hersenschors)</b>: bewuste waarneming, denken, bewuste bewegingen. <b>Kleine hersenen</b>: coördinatie, evenwicht, aangeleerde bewegingen. <b>Hersenstam</b>: levensfuncties zoals ademhaling en hartslag.</p>
  <p><b>Inademen</b>: de middenrifspieren trekken samen (het middenrif wordt platter) en de buitenste tussenribspieren trekken de ribben omhoog. De borstholte wordt groter.<br><b>Rustig uitademen</b>: de spieren ontspannen, de borstholte wordt weer kleiner. Bij krachtig uitademen helpen extra spieren mee om de borstholte nog kleiner te maken.</p>`,
  films:[["Adem in, adem uit","films/gaswisseling/1-adem-in-adem-uit.html"],["Het hoofdkantoor","films/zenuwstelsel/5-het-hoofdkantoor.html"]]});
E.zet(T,[34],{titel:"Receptoren en het celmembraan",
  html:`<p>Het celmembraan bestaat uit een dubbele laag <b>fosfolipiden</b> met daarin <b>eiwitten</b>. In het membraan zitten ook <b>receptoren</b>: een signaalstof of een deel van een virus past erop zoals een sleutel in een slot.</p>
  <p>Zoek in je boek bij de bouw van het celmembraan op welke stoffen erin voorkomen, en welke daarvan zo’n specifieke vorm kunnen hebben.</p>`,
  films:[["Celorganellen","films/cellen/celorganellen/index.html"],["T-cellen en virussen","films/afweer/3-t-cellen-en-virussen.html"]]});
E.zet(T,[35],{titel:"Bloedsomloop en lymfevaten",
  html:`<p>De mens heeft een <b>dubbele bloedsomloop</b>. <b>Kleine bloedsomloop</b>: rechterkamer → longslagader → longen → longader → linkerboezem. <b>Grote bloedsomloop</b>: linkerkamer → aorta → slagaders naar de organen → aders → holle aders → rechterboezem.</p>
  <p>Het bloed van hoofd, armen en borst komt via de <b>bovenste holle ader</b> terug, dat van de rest van het lichaam via de <b>onderste holle ader</b>. Elk orgaan krijgt bloed via een eigen slagader en voert het af via een eigen ader.</p>
  <p>Weefselvloeistof wordt als <b>lymfe</b> afgevoerd via lymfevaten met lymfeknopen. De lymfe komt bij de <b>sleutelbeenaders</b> (onder het sleutelbeen) weer in het bloed.</p>`,
  films:[["Eén pomp, twee rondjes","films/transport/1-een-pomp-twee-rondjes.html"],["Weefselvloeistof en lymfe","films/transport/4-weefselvloeistof-en-lymfe.html"]]});
E.zet(T,[36,37],{titel:"Luchtwegen en hun bescherming",
  html:`<p>Lucht gaat via neus/mond → keelholte → strottenhoofd → <b>luchtpijp</b> → twee <b>bronchiën</b> → steeds fijner vertakte <b>bronchiolen</b> → <b>longblaasjes</b>. Luchtpijp en bronchiën worden opengehouden door kraakbeenringen.</p>
  <p>Het <b>dekweefsel</b> aan de binnenkant van de luchtwegen is een aaneengesloten laag cellen met <b>trilhaarcellen</b> en <b>slijmbekercellen</b>. Dit dekweefsel hoort bij de eerste, niet-specifieke afweer.</p>`,
  films:[["Adem in, adem uit","films/gaswisseling/1-adem-in-adem-uit.html"],["De eerste verdediging","films/afweer/1-de-eerste-verdediging.html"]]});

/* ---------- opgave 8: gieren ---------- */
E.zet(T,[39],{titel:"Producenten, consumenten, reducenten",
  html:`<p>In een ecosysteem gaan stoffen rond.</p>
  <ul><li><b>Producenten</b> (planten, algen) maken organische stoffen uit anorganische stoffen (CO<sub>2</sub>, water, zouten).</li>
  <li><b>Consumenten</b> (dieren) eten organische stoffen van producenten of van andere consumenten.</li>
  <li><b>Reducenten</b> (bacteriën, schimmels) breken dode resten en afval van producenten én consumenten af tot anorganische stoffen, die producenten weer opnemen.</li></ul>
  <p>Ook consumenten geven anorganische stoffen af, zoals CO<sub>2</sub> bij hun dissimilatie. In een schema herken je een groep aan wat er binnenkomt en wat eruit gaat.</p>`,
  films:[["Waar blijft het blad?","films/ecologie/4-waar-blijft-het-blad.html"],["Alles gaat rond","films/ecologie/alles-gaat-rond/index.html"]]});
E.zet(T,[40,41],{titel:"Aanpassing en warmteregulatie",
  html:`<p>Een <b>aanpassing</b> is een erfelijke eigenschap die de kans op overleven en voortplanten in een bepaalde omgeving vergroot. Een goede redenering heeft twee stappen: wat is het voordeel van de eigenschap, en waarom vergroot dat de overlevingskans?</p>
  <p>Een warmbloedig dier houdt zijn lichaamstemperatuur constant. Het maakt warmte bij de dissimilatie in spieren en organen en raakt warmte kwijt via het lichaamsoppervlak. Veren, haren en een vetlaag <b>isoleren</b>. Ook de doorbloeding van de huid en zweten spelen een rol bij de warmteregulatie.</p>`,
  films:[["Natuurlijke selectie","films/evolutie/2-natuurlijke-selectie.html"],["Buizen onder druk","films/transport/2-buizen-onder-druk.html"]]});
E.zet(T,[42],{titel:"Maagzuur",
  html:`<p>De maagwand maakt <b>zoutzuur</b> (lage pH) en het enzym pepsine. Het zure milieu:</p>
  <ul><li>is het optimum voor pepsine, dat eiwitten in stukken knipt;</li><li>laat eiwitten ontvouwen, zodat pepsine ze beter kan knippen.</li></ul><p>Een zuur heeft ook effect op levende cellen en op mineralen. Bedenk wat het voor die dingen betekent.</p>
  <p>Vraagt een opgave of iets <b>functioneel</b> is, leg dan het verband tussen de eigenschap en wat het dier eet of doet.</p>`,
  films:[["De reis door je buik","films/voeding/2-de-reis-door-je-buik.html"]]});
E.zet(T,[43],{titel:"Persistente stoffen en uitscheiding",
  html:`<p>Een <b>persistente</b> stof wordt in het milieu en in een organisme (bijna) niet afgebroken. Of hij zich in een lichaam <b>ophoopt</b>, hangt af van de route: wordt hij uitgescheiden, of blijft hij in het lichaam?</p>
  <p>Uitscheiden doet een gewerveld dier vooral via de <b>nieren</b> (urine) en via de <b>lever</b> en de darm. Ga bij elke plek in het lichaam na: is dit een stap op weg naar buiten, of blijft de stof hier in het lichaam?</p>
  <p>Een persistente stof stapelt zich ook op in een voedselketen: hogere schakels krijgen meer binnen.</p>`,
  films:[["De lever als fabriek","films/voeding/5-de-lever-als-fabriek.html"],["Waarom zo weinig roofdieren?","films/ecologie/5-waarom-zo-weinig-roofdieren.html"]]});
E.zet(T,[44],{titel:"Besmetting en verspreiding",
  html:`<p>Een infectieziekte verspreidt zich makkelijker als:</p>
  <ul><li>individuen vaak met elkaar of met een bron van besmetting in contact komen;</li><li>er veel ziekteverwekkers zijn.</li></ul>
  <p>Bij een vraag over een diagram noem je eerst wat je in het diagram ziet veranderen, en leg je daarna het verband met de verspreiding.</p>`,
  films:[["De eerste verdediging","films/afweer/1-de-eerste-verdediging.html"],["Wie eet wie?","films/ecologie/3-wie-eet-wie.html"]]});
})();
