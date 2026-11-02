/* Uitleg van de stof · oefenexamen vwo 2024 tijdvak 2 (tool vwo24-2). samenvoegen.py kopieert dit naar tools/examen-stof/vwo24-2.js. */
(function(){
"use strict";
const E=window.EXSTOF, T="vwo24-2";if(!E)return;

/* ---------- opgave 1 ---------- */
E.zet(T,[1],{titel:"Soort en wetenschappelijke naam",
  html:`<p>Een <b>soort</b> is een groep organismen die zich onderling kunnen voortplanten en daarbij <b>vruchtbare</b> nakomelingen krijgen. Krijgen twee groepen samen geen (vruchtbare) nakomelingen, dan zijn het aparte soorten.</p>
  <p>De wetenschappelijke naam heeft twee delen: <i>Geslacht soort</i>. Een <b>derde</b> woord geeft een <b>ondersoort</b> aan: een groep binnen dezelfde soort die er door zijn leefgebied anders uitziet. Taxonomen gebruiken verschillende criteria (voortplanting, bouw, DNA), en die geven niet altijd hetzelfde antwoord. Daarom bestaan er soms twee namen naast elkaar.</p>`,
  films:[["Hoe een soort er twee wordt","films/evolutie/6-hoe-een-soort-er-twee-wordt.html"],["Stambomen lezen","films/evolutie/8-stambomen-lezen.html"]]});
E.zet(T,[2],{titel:"Een cladogram lezen",
  html:`<p>Een <b>cladogram</b> is een vertakte stamboom. De groepen die je vergelijkt staan aan de <b>uiteinden</b>; op elke <b>knoop</b> (splitsing) zit een gemeenschappelijke voorouder. Een huidige groep is dus nooit de voorouder van een andere huidige groep.</p>
  <p>Twee groepen zijn <b>nauwer verwant</b> naarmate hun gemeenschappelijke voorouder <b>recenter</b> is: hun knoop zit dan verder naar rechts (dichter bij de uiteinden).</p>`,
  films:[["Stambomen lezen","films/evolutie/8-stambomen-lezen.html"]]});
E.zet(T,[3,4],{titel:"Kleine populaties: flessenhals, stichter en inteelt",
  html:`<p>In een kleine populatie gaan door <b>toeval</b> allelen verloren: de genenpool krimpt.</p>
  <ul><li>Er zijn verschillende evolutiemechanismen: <b>natuurlijke selectie</b>, <b>gene flow</b> (uitwisseling van allelen tussen populaties) en <b>genetic drift</b> (toeval). Bij drift onderscheid je het <b>flessenhalseffect</b> en het <b>stichtereffect</b>; ken het verschil tussen die twee situaties.</li></ul>
  <p><b>Inteelt</b> is voortplanting tussen nauwe verwanten. Verwanten dragen vaak dezelfde allelen, geërfd van een gemeenschappelijke voorouder. <b>Fitness</b> is het vermogen om te overleven en nakomelingen te krijgen. Een <b>mutatie</b> is een verandering in het DNA, bijvoorbeeld door een kopieerfout of een mutagene stof.</p>`,
  films:[["Toeval en uitwisseling","films/evolutie/5-toeval-en-uitwisseling.html"]]});
E.zet(T,[5],{titel:"Niche, habitat en successie",
  html:`<p>De <b>habitat</b> is de plek waar een soort leeft; die kun je met andere soorten delen. De <b>niche</b> is de rol van een soort: wat hij eet, wanneer en hoe hij leeft. Twee soorten met dezelfde niche concurreren.</p>
  <p><b>Successie</b> is de geleidelijke verandering van een levensgemeenschap, bijvoorbeeld van kaal zand via gras en struiken naar bos. Welke soorten er in een gebied leven en wat ze eten, bepaalt mee hoe snel die verandering gaat.</p>`,
  films:[["Waar past een soort?","films/ecologie/2-waar-past-een-soort.html"],["Van zand tot bos","films/ecologie/8-van-zand-tot-bos.html"]]});
E.zet(T,[6],{titel:"Sequencing en genetische diversiteit",
  html:`<p><b>Sequencing</b> bepaalt de volgorde van de <b>nucleotiden (basen)</b> in het DNA. Door het DNA van individuen te vergelijken zie je hoe <b>verwant</b> ze zijn: hoe meer verschil, hoe minder verwant.</p>
  <p>De <b>genetische diversiteit</b> van een populatie is de variatie aan allelen in de genenpool. Een kleine, verwante populatie heeft weinig diversiteit.</p>`,
  films:[["DNA lezen","films/dna/7-dna-lezen.html"]]});
E.zet(T,[7],{titel:"Haploïd en diploïd; klonen",
  html:`<p><b>Diploïd (2n):</b> twee sets chromosomen, zoals in alle gewone lichaamscellen (huidcel, spiercel). <b>Haploïd (n):</b> één set, zoals in de geslachtscellen (eicel, zaadcel), gevormd door <b>meiose</b>.</p>
  <p>Bij <b>klonen</b> door kerntransplantatie wordt de kern uit een eicel verwijderd en vervangen door de kern van een lichaamscel. De chromosomen zitten in de kern.</p>`,
  films:[["Celdeling","films/voortplanting/celdeling/index.html"]]});
E.zet(T,[8],{titel:"Kern-DNA en mitochondriaal DNA",
  html:`<p>De meeste erfelijke informatie zit in de <b>celkern</b>. Daarnaast hebben <b>mitochondriën</b> hun eigen kleine ringvormige DNA. Dat mtDNA zit in het <b>cytoplasma</b>; bij gewone voortplanting erf je het via de eicel van je moeder.</p>`,
  films:[["Overerving via het X-chromosoom","films/erfelijkheid/5-overerving-via-x-chromosomen-en-mitochondrien.html"]]});

/* ---------- opgave 2 ---------- */
E.zet(T,[9,10],{titel:"Pionier, climax en verspreiding",
  html:`<p>Een <b>pioniersoort</b> vestigt zich als eerste op kale of verstoorde grond, aan het begin van de successie. Kenmerken: vaak eenjarig, veel zaden, zaden die lang kiemkrachtig blijven, snelle verspreiding. Een <b>climaxsoort</b> hoort bij het eindstadium (bijvoorbeeld bomen in een volgroeid bos).</p>
  <p>Een soort <b>vestigt</b> zich pas echt als hij zijn hele <b>levenscyclus</b> ter plaatse kan voltooien. Welke stap daarbij het knelpunt is, hangt af van abiotische factoren zoals temperatuur.</p>`,
  films:[["Van zand tot bos","films/ecologie/8-van-zand-tot-bos.html"],["Waar past een soort?","films/ecologie/2-waar-past-een-soort.html"]]});
E.zet(T,[11],{titel:"Positieve en negatieve controle",
  html:`<p>In een proef vergelijk je met controles.</p>
  <ul><li>De <b>positieve controle</b> geeft een bekende, zekere reactie. Zo zie je hoe een echte (positieve) uitslag eruitziet en of de proef werkt.</li>
  <li>De <b>negatieve controle</b> mist de te testen factor. Zo zie je de reactie op alleen de omstandigheden van de proef. Een uitslag telt pas als die groter is dan de negatieve controle.</li></ul>`,
  films:[["Kun je onderzoek vertrouwen?","films/extra/kun-je-onderzoek-vertrouwen.html"]]});
E.zet(T,[12],{titel:"Allergie en afweer",
  html:`<p><b>Aangeboren (niet-specifieke) afweer</b> werkt tegen alles, zonder te herkennen: huid, slijm, trilhaartjes, ontstekingsreactie. <b>Verworven (specifieke) afweer</b> richt zich op een bepaald <b>antigeen</b>, met B- en T-cellen en antistoffen.</p>
  <p>Een <b>antigeen</b> is een (lichaamsvreemde) stof die door het afweersysteem herkend wordt; <b>antistoffen</b> (antilichamen) worden door plasmacellen gemaakt. Bij een allergie maken mestcellen de mediator <b>histamine</b> vrij; ken het effect van histamine op bloedvaten en gladde spieren.</p>`,
  films:[["Vaccins, allergie en bloedgroepen","films/afweer/4-vaccins-allergie-en-bloedgroepen.html"],["De eerste verdediging","films/afweer/1-de-eerste-verdediging.html"]]});
E.zet(T,[13],{titel:"Diffusie en gaswisseling",
  html:`<p>De snelheid van gaswisseling hangt af van vier factoren: het <b>oppervlak (A)</b>, het <b>verschil in partiële druk (∆c)</b>, de <b>diffusiecoëfficiënt (D)</b> en de <b>diffusieafstand (∆x)</b>. Meer oppervlak en een groter drukverschil geven snellere diffusie; een grotere afstand remt af.</p>
  <p>In de longen zorgen de vele longblaasjes voor een groot oppervlak. Door te ventileren (in- en uitademen) blijft het drukverschil tussen de lucht in de longblaasjes en het bloed in stand.</p>`,
  films:[["Gas op reis","films/gaswisseling/2-gas-op-reis.html"],["Adem in, adem uit","films/gaswisseling/1-adem-in-adem-uit.html"]]});
E.zet(T,[14],{titel:"Autonoom zenuwstelsel",
  html:`<p>Het <b>animale</b> zenuwstelsel stuurt bewuste, willekeurige bewegingen (skeletspieren). Het <b>autonome</b> zenuwstelsel regelt onbewuste processen en bestaat uit het <b>orthosympatisch</b> deel (actie, 'vechten of vluchten') en het <b>parasympatisch</b> deel (rust en herstel).</p>
  <p>Ortho- en parasympatisch werken meestal elkaars tegenspelers. Bedenk bij een orgaan wat er nodig is bij inspanning en wat in rust.</p>`,
  films:[["Het hoofdkantoor","films/zenuwstelsel/5-het-hoofdkantoor.html"]]});
E.zet(T,[15],{titel:"Longvolumes en het spirogram",
  html:`<p>Belangrijke longvolumes: het <b>restvolume</b> blijft altijd in de longen achter en kun je niet uitblazen. De <b>vitale capaciteit (VC)</b> is wat je maximaal kunt uitademen na maximaal inademen. Samen vormen ze de <b>totale longcapaciteit (TLC)</b>.</p>
  <p>In een flow-volumediagram staat de luchtsnelheid tegen het volume. Lees de assen zorgvuldig: wat staat er op de x-as en wat op de y-as?</p>`,
  films:[["Adem in, adem uit","films/gaswisseling/1-adem-in-adem-uit.html"]]});
E.zet(T,[16],{titel:"Biologische bestrijding en natuurlijke vijanden",
  html:`<p>Bij <b>biologische bestrijding</b> zet je een natuurlijke vijand in tegen een plaag. Of dat werkt, hangt af van de hele voedselketen waarin die soort zit.</p>
  <p>In een <b>predator-prooirelatie</b> hangen de aantallen van beide soorten van elkaar af.</p>`,
  films:[["Waarom zo weinig roofdieren?","films/ecologie/5-waarom-zo-weinig-roofdieren.html"],["Wie eet wie?","films/ecologie/3-wie-eet-wie.html"]]});
E.zet(T,[17,18],{titel:"Tolerantiecurven en milieufactoren",
  html:`<p>Een <b>tolerantiecurve</b> toont hoe goed een soort het doet bij verschillende waarden van een factor. De curve heeft een <b>minimum</b> (ondergrens), een <b>optimum</b> (de top) en een <b>maximum</b> (bovengrens). De <b>breedte</b> van de curve is de tolerantie: hoeveel variatie de soort verdraagt.</p>
  <p><b>Abiotische</b> factoren komen van de levenloze omgeving (temperatuur, neerslag, licht). <b>Biotische</b> factoren komen van andere organismen.</p>`,
  films:[["Waar past een soort?","films/ecologie/2-waar-past-een-soort.html"]]});

/* ---------- opgave 3 ---------- */
E.zet(T,[19],{titel:"Vetvertering",
  html:`<p>Vet lost niet op in water. Bij de vertering van vet onderscheid je een <b>mechanische</b> stap (het vet fijner verdelen, de moleculen blijven heel) en een <b>chemische</b> stap (enzymen knippen de moleculen). Een groter oppervlak maakt de chemische stap sneller.</p>
  <p>Ken van elk verteringssap: welk orgaan het maakt, waar het wordt opgeslagen en wat het doet.</p>`,
  films:[["De reis door je buik","films/voeding/2-de-reis-door-je-buik.html"],["De lever als fabriek","films/voeding/5-de-lever-als-fabriek.html"]]});
E.zet(T,[20],{titel:"Organellen en opname van vet",
  html:`<p>Het <b>golgi-systeem</b> verpakt stoffen in blaasjes die de cel via <b>exocytose</b> verlaten. Het <b>ER</b> maakt lipiden (glad) en eiwitten (ruw, met ribosomen).</p>
  <p>In elke darmvlok liggen twee soorten vaten: <b>bloedvaten</b> (haarvaten, die via de poortader naar de lever gaan) en een <b>lymfevat</b> (via de borstbuis naar het bloed). Welke stoffen welke route nemen, hangt af van hun grootte en oplosbaarheid.</p>`,
  films:[["Van darm naar bloed","films/voeding/4-van-darm-naar-bloed.html"],["Celorganellen","films/cellen/celorganellen/index.html"]]});
E.zet(T,[21],{titel:"Waarvoor dienen vetzuren?",
  html:`<p>Ken de bouwstenen van de grote groepen stoffen: <b>eiwitten</b> uit aminozuren (met stikstof), <b>vetten</b> (triglyceriden) uit glycerol en vetzuren, <b>fosfolipiden</b> uit glycerol, fosfaat en vetzuren. Bij de <b>dissimilatie</b> komen glucose, vetzuren en aminozuren via verschillende routes uit bij de citroenzuurcyclus in de mitochondriën.</p>`,
  films:[["Alles versneld","films/stofwisseling/1-alles-versneld.html"],["Celorganellen","films/cellen/celorganellen/index.html"]]});
E.zet(T,[22],{titel:"Bloed centrifugeren",
  html:`<p>Bij <b>centrifugeren</b> zakken de zwaarste deeltjes naar de bodem. Wat lichter is (een lagere dichtheid heeft), blijft bovenin. Bloed bestaat uit <b>bloedplasma</b> (water met opgeloste stoffen) en <b>bloedcellen</b>; vet heeft een lagere dichtheid dan water.</p>`,
  films:[["Wat er in je bloed zit","films/transport/3-wat-er-in-je-bloed-zit.html"]]});
E.zet(T,[23],{titel:"De alvleesklier",
  html:`<p>De <b>alvleesklier</b> heeft twee taken. Als verteringsklier geeft hij <b>alvleessap</b> met verschillende verteringsenzymen aan de dunne darm af. Als hormoonklier (de eilandjes van Langerhans) geeft hij hormonen aan het bloed af die de glucoseconcentratie regelen. Ken per enzym en per hormoon wat het doet.</p>`,
  films:[["Suiker in balans","films/hormonen/2-suiker-in-balans.html"]]});
E.zet(T,[24,25],{titel:"Gentherapie met een virus als vector",
  html:`<p>Bij <b>gentherapie</b> brengt een <b>vector</b> (vaak een onschadelijk gemaakt virus) een gezond gen in cellen. Die cellen kunnen dan het eiwit maken dat ontbrak. Bedenk bij elke gentherapie: waar wordt het eiwit gemaakt, en waar moet het werken?</p>
  <p><b>B- en T-cellen</b> horen bij de specifieke afweer: ze herkennen <b>antigenen</b> en reageren op alles wat lichaamsvreemd is.</p>`,
  films:[["CRISPR: wat doet dit gen?","films/vervolg/biomedisch-2-crispr-wat-doet-dit-gen.html"],["T-cellen en virussen","films/afweer/3-t-cellen-en-virussen.html"]]});
E.zet(T,[26],{titel:"Plasmiden, transgenen en expressie",
  html:`<p>Een <b>plasmide</b> is een ringetje DNA in een bacterie, handig om een gen (transgen) in te bouwen en te vermeerderen. Een <b>resistentiegen</b> helpt om bacteriën met de plasmide te selecteren.</p>
  <p>Voor <b>expressie</b> (aflezen tot eiwit) is naast het gen een <b>promotor</b> nodig: de plaats waar RNA-polymerase bindt om de transcriptie te starten. Bij <b>replicatie</b> bindt DNA-polymerase aan een eigen startplaats. Prokaryoten en eukaryoten hebben daarvoor elk hun eigen enzymen en herkenningsplaatsen.</p>`,
  films:[["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"],["Op maat gekopieerd · PCR","films/dna-technieken/1-op-maat-gekopieerd/index.html"]]});
E.zet(T,[27],{titel:"Een experiment opzetten",
  html:`<p>In een goed experiment vergelijk je een <b>experimentele groep</b> met een <b>controlegroep</b> die alleen de te testen behandeling mist; alle andere omstandigheden houd je gelijk. Zo weet je zeker dat een verschil door de behandeling komt.</p>
  <p>Kies een duidelijke, meetbare grootheid die iets zegt over het effect, en meet die na verloop van tijd bij beide groepen.</p>`,
  films:[["Kun je onderzoek vertrouwen?","films/extra/kun-je-onderzoek-vertrouwen.html"]]});
E.zet(T,[28],{titel:"De regel van Hardy-Weinberg",
  html:`<p>Noem de allelfrequenties <b>p</b> en <b>q</b> (p + q = 1). Dan geldt voor de genotypen: p² homozygoot dominant, 2pq heterozygoot en <b>q²</b> homozygoot recessief.</p>
  <p>De regel geldt in een grote populatie zonder selectie, mutatie, migratie en met willekeurige partnerkeuze. Bedenk bij een erfelijke ziekte welk genotype de ziekte heeft.</p>`,
  films:[["Toeval en uitwisseling","films/evolutie/5-toeval-en-uitwisseling.html"]]});

/* ---------- opgave 4 ---------- */
E.zet(T,[29],{titel:"Endocriene en exocriene klieren",
  html:`<p>Een <b>endocriene</b> klier (hormoonklier) geeft zijn stof rechtstreeks aan het <b>bloed</b> af; er loopt geen afvoerbuis naartoe. Een <b>exocriene</b> klier geeft zijn stof via een <b>afvoerbuis</b> af aan de buitenkant of aan een holte (zweet-, speeksel-, talgklieren).</p>
  <p>Het hormoon <b>melatonine</b> speelt een rol in het slaap-waakritme: om in te slapen moet de concentratie boven een drempelwaarde komen.</p>`,
  films:[["De baas van de klieren","films/hormonen/3-de-baas-van-de-klieren.html"],["Slaap","films/zenuwstelsel/7-slaap.html"]]});
E.zet(T,[30],{titel:"Receptoren op het membraan",
  html:`<p>Een hormoon werkt alleen op cellen met de juiste <b>receptor</b>. Er zijn receptoren op het <b>celmembraan</b> en receptoren in de cel. Bij een membraanreceptor wordt het signaal binnen de cel doorgegeven door <b>second messengers</b>.</p>
  <p>Hydrofobe hormonen (zoals steroïden) kunnen door het membraan diffunderen en binden aan een receptor in de cel. Een <b>transcriptiefactor</b> is een eiwit dat in de kern aan het DNA bindt en zo de transcriptie van een gen regelt.</p>`,
  films:[["Post voor iedereen","films/hormonen/1-post-voor-iedereen.html"],["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"]]});
E.zet(T,[31,32],{titel:"Dissimilatie en ATP",
  html:`<p>Bij de <b>aerobe dissimilatie</b> wordt glucose afgebroken via de <b>glycolyse</b>, de <b>citroenzuurcyclus</b> en de <b>oxidatieve fosforylering</b>. Ken per stap waar hij plaatsvindt, wat erin gaat en wat eruit komt.</p>
  <p>ATP is nodig voor processen die energie kosten, zoals <b>actief transport</b> tegen een concentratieverschil in en de synthese van stoffen. Denk bij een cel aan wat hij doet (cellulair niveau) en welke moleculen daarbij werken (moleculair niveau).</p>`,
  films:[["Alles versneld","films/stofwisseling/1-alles-versneld.html"],["Het kabelnetwerk","films/zenuwstelsel/2-het-kabelnetwerk.html"]]});
E.zet(T,[33],{titel:"Mutaties: inserties en deleties",
  html:`<p>Het DNA wordt per <b>codon</b> (drie nucleotiden) afgelezen. Bij een <b>insertie</b> komen er nucleotiden bij, bij een <b>deletie</b> gaan er nucleotiden af. Een <b>leesraamverschuiving</b> betekent dat de indeling in codons vanaf een punt verschuift.</p>
  <p>De translatie stopt bij een <b>stopcodon</b> (UAA, UAG of UGA). Ga bij een mutatie na wat er met de codons en met het stopcodon kan gebeuren.</p>`,
  films:[["Mutaties","films/dna/5-mutaties.html"],["De genetische code lezen","films/dna/4-de-genetische-code-lezen.html"]]});
E.zet(T,[34],{titel:"Spiralisatie van het DNA",
  html:`<p>DNA is om histonen gewikkeld en kan meer of minder sterk opgerold (gespiraliseerd) zijn. Bij sterke <b>spiralisatie</b> ligt het DNA compact en moeilijk bereikbaar; bij <b>minder</b> spiralisatie ligt het losser en opener.</p>
  <p>Bij genregulatie bepaalt de mate van spiralisatie mee of een gen kan worden afgelezen: sterk opgerold DNA wordt nauwelijks getranscribeerd.</p>`,
  films:[["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"]]});
E.zet(T,[35,36],{titel:"Grafieken en oorzaak-gevolg",
  html:`<p>Lees bij twee lijnen of staven goed welke <b>as</b> bij welke hoort en wat er op elk moment gebeurt. Koppel de vorm van de lijn aan het verhaal: wanneer is iets hoog, wanneer laag?</p>
  <p>Om <b>oorzaak en gevolg</b> te bepalen, kijk je wat je in het experiment hebt veranderd (de ingreep) en wat daarna verandert. Een <b>+</b> bij een pijl betekent: meer van de oorzaak geeft meer van het gevolg; een <b>−</b>: meer van de oorzaak geeft minder van het gevolg.</p>`,
  films:[["Slaap","films/zenuwstelsel/7-slaap.html"],["Kun je onderzoek vertrouwen?","films/extra/kun-je-onderzoek-vertrouwen.html"]]});

/* ---------- opgave 5 ---------- */
E.zet(T,[37],{titel:"Relatieve waarden berekenen",
  html:`<p>Een <b>relatieve</b> waarde vergelijkt een behandeling met een referentie, meestal de <b>controle</b>. Je deelt de waarde van de behandeling door die van de controle en maakt er een percentage van.</p>
  <p>Lees de staven zorgvuldig af met de rasterlijnen.</p>`,
  films:[["Kun je onderzoek vertrouwen?","films/extra/kun-je-onderzoek-vertrouwen.html"]]});
E.zet(T,[38],{titel:"Wortels, opname en groei",
  html:`<p>De wortels nemen <b>water en mineralen</b> op; hoe groter het wortelstelsel, hoe meer oppervlak voor opname. Met die stoffen en de suikers uit de <b>fotosynthese</b> groeit de plant (assimilatie), ook de wortels zelf.</p>
  <p>Groei is een proces waarbij de groei zelf afhangt van hoe groot de plant al is (zoals rente op rente).</p>`,
  films:[["Hoe een plant groeit","films/transport/7-hoe-een-plant-groeit.html"],["Transport in planten","films/transport/6-transport-in-planten.html"]]});
E.zet(T,[39],{titel:"Fotosynthese: pigmenten en licht",
  html:`<p>De <b>lichtreactie</b> gebruikt pigmenten (chlorofyl a en b) om licht op te vangen. Daarbij worden <b>elektronen aangeslagen</b> in de fotosystemen. Een pigment absorbeert alleen licht van bepaalde golflengten.</p>
  <p>Ken het absorptiespectrum van de pigmenten (Binas/ScienceData) en de rol van fotosysteem I en II in de lichtreactie.</p>`,
  films:[["Alles in het groen","films/stofwisseling/3-alles-in-het-groen.html"]]});
E.zet(T,[40,41],{titel:"Symbiose en lichtconcurrentie",
  html:`<p><b>Vlinderbloemigen</b> (zoals klaver) leven in <b>symbiose</b> met <b>knolletjesbacteriën</b> in wortelknolletjes. Bij een symbiose als deze hebben beide partners voordeel: ga na wat elke partner levert en krijgt (denk aan de stikstofkringloop).</p>
  <p>Planten <b>concurreren</b> om licht, water en mineralen. Bij concurrentie om licht heeft de hoogste plant het voordeel.</p>`,
  films:[["Stikstof gaat rond","films/ecologie/7-stikstof-gaat-rond.html"],["Wie eet wie?","films/ecologie/3-wie-eet-wie.html"]]});

})();
