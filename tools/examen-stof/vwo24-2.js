/* Uitleg van de stof · oefenexamen vwo 2024 tijdvak 2 (tool vwo24-2). samenvoegen.py kopieert dit naar tools/examen-stof/vwo24-2.js. */
(function(){
"use strict";
const E=window.EXSTOF, T="vwo24-2";if(!E)return;

/* ---------- opgave 1 ---------- */
E.zet(T,[1],{titel:"Soort en wetenschappelijke naam",
  html:`<p>Een <b>soort</b> is een groep organismen die zich onderling kunnen voortplanten en daarbij <b>vruchtbare</b> nakomelingen krijgen. Krijgen twee groepen samen geen (vruchtbare) nakomelingen, dan zijn het aparte soorten.</p>
  <p>De wetenschappelijke naam heeft twee delen: <i>Geslacht soort</i>. Een <b>derde</b> woord geeft een <b>ondersoort</b> aan: een groep binnen dezelfde soort die er door zijn leefgebied anders uitziet. Een verschil in chromosoomaantal wijst vaak op aparte soorten, omdat de meiose bij een kruising dan meestal misgaat.</p>`,
  films:[["Hoe een soort er twee wordt","films/evolutie/6-hoe-een-soort-er-twee-wordt.html"],["Stambomen lezen","films/evolutie/8-stambomen-lezen.html"]]});
E.zet(T,[2],{titel:"Een cladogram lezen",
  html:`<p>Een <b>cladogram</b> is een vertakte stamboom. De groepen die je vergelijkt staan aan de <b>uiteinden</b>; op elke <b>knoop</b> (splitsing) zit een gemeenschappelijke voorouder. Een huidige groep is dus nooit de voorouder van een andere huidige groep.</p>
  <p>Twee groepen zijn <b>nauwer verwant</b> naarmate hun gemeenschappelijke voorouder <b>recenter</b> is: hun knoop zit dan verder naar rechts (dichter bij de uiteinden).</p>`,
  films:[["Stambomen lezen","films/evolutie/8-stambomen-lezen.html"]]});
E.zet(T,[3,4],{titel:"Kleine populaties: flessenhals, stichter en inteelt",
  html:`<p>In een kleine populatie gaan door <b>toeval</b> allelen verloren: de genenpool krimpt.</p>
  <ul><li><b>Flessenhalseffect:</b> een bestaande populatie wordt ineens heel klein (ramp, bejaging).</li>
  <li><b>Stichtereffect:</b> een paar individuen koloniseren een <i>nieuw</i> gebied.</li></ul>
  <p><b>Inteelt</b> is voortplanting tussen nauwe verwanten. Zij dragen vaak dezelfde allelen, dus er ontstaan meer <b>homozygoten</b> (minder heterozygoten). Daardoor komen schadelijke recessieve allelen vaker tot uiting: de fitness kan dalen (inteeltdepressie). Op het ontstaan van <i>mutaties</i> heeft inteelt geen invloed.</p>`,
  films:[["Toeval en uitwisseling","films/evolutie/5-toeval-en-uitwisseling.html"]]});
E.zet(T,[5],{titel:"Niche, habitat en successie",
  html:`<p>De <b>habitat</b> is de plek waar een soort leeft; die kun je met andere soorten delen. De <b>niche</b> is de rol van een soort: wat hij eet, wanneer en hoe hij leeft. Twee soorten met dezelfde niche concurreren.</p>
  <p><b>Successie</b> is de geleidelijke verandering van een levensgemeenschap, bijvoorbeeld van kaal zand via gras en struiken naar bos. Grote grazers eten jonge planten weg en houden het landschap open; ze kunnen de successie dus afremmen.</p>`,
  films:[["Waar past een soort?","films/ecologie/2-waar-past-een-soort.html"],["Van zand tot bos","films/ecologie/8-van-zand-tot-bos.html"]]});
E.zet(T,[6],{titel:"Sequencing en genetische diversiteit",
  html:`<p><b>Sequencing</b> bepaalt de volgorde van de <b>nucleotiden (basen)</b> in het DNA. Door het DNA van individuen te vergelijken zie je hoe <b>verwant</b> ze zijn: hoe meer verschil, hoe minder verwant.</p>
  <p>Bij een fokprogramma wil je de <b>genetische diversiteit</b> vergroten. Je kiest dan een individu dat <b>sterk afwijkt</b> van de bestaande populatie, zodat er nieuwe allelen bij komen.</p>`,
  films:[["DNA lezen","films/dna/7-dna-lezen.html"]]});
E.zet(T,[7],{titel:"Haploïd en diploïd; klonen",
  html:`<p><b>Diploïd (2n):</b> twee sets chromosomen, zoals in alle gewone lichaamscellen (huidcel, spiercel). <b>Haploïd (n):</b> één set, zoals in de geslachtscellen (eicel, zaadcel), gevormd door <b>meiose</b>.</p>
  <p>Bij <b>klonen</b> (kerntransplantatie) wordt de kern uit een eicel verwijderd en vervangen door de <b>diploïde</b> kern van een lichaamscel. De cel kan dan zonder bevruchting tot een embryo uitgroeien. Het telt waar de <i>kern</i> vandaan komt, niet het cytoplasma eromheen.</p>`,
  films:[["Celdeling","films/voortplanting/celdeling/index.html"]]});
E.zet(T,[8],{titel:"Kern-DNA en mitochondriaal DNA",
  html:`<p>De meeste erfelijke informatie zit in de <b>celkern</b>. Daarnaast hebben <b>mitochondriën</b> hun eigen kleine ringvormige DNA. Dat mtDNA zit in het <b>cytoplasma</b> en erf je (ook bij klonen) van de cel die de eicel leverde, niet van de kerndonor.</p>`,
  films:[["Overerving via het X-chromosoom","films/erfelijkheid/5-overerving-via-x-chromosomen-en-mitochondrien.html"]]});

/* ---------- opgave 2 ---------- */
E.zet(T,[9,10],{titel:"Pionier, climax en verspreiding",
  html:`<p>Een <b>pioniersoort</b> vestigt zich als eerste op kale of verstoorde grond, aan het begin van de successie. Kenmerken: vaak eenjarig, veel zaden, zaden die lang kiemkrachtig blijven, snelle verspreiding. Een <b>climaxsoort</b> hoort bij het eindstadium (bijvoorbeeld bomen in een volgroeid bos).</p>
  <p>Een soort <b>vestigt</b> zich pas echt als hij zijn hele <b>levenscyclus</b> ter plaatse kan voltooien, inclusief het maken van kiemkrachtig zaad. Door klimaatverandering (warmere zomers) lukt dat soms voor soorten die hier eerst alleen werden aangevoerd.</p>`,
  films:[["Van zand tot bos","films/ecologie/8-van-zand-tot-bos.html"],["Waar past een soort?","films/ecologie/2-waar-past-een-soort.html"]]});
E.zet(T,[11],{titel:"Positieve en negatieve controle",
  html:`<p>In een proef vergelijk je met controles.</p>
  <ul><li>De <b>positieve controle</b> geeft een bekende, zekere reactie. Zo zie je hoe een echte (positieve) uitslag eruitziet en of de proef werkt.</li>
  <li>De <b>negatieve controle</b> mist de te testen factor. Zo zie je de reactie op alleen de omstandigheden (hier: het oplosmiddel en het krasje). Een uitslag telt pas als die groter is dan de negatieve controle.</li></ul>`,
  films:[["Kun je onderzoek vertrouwen?","films/extra/kun-je-onderzoek-vertrouwen.html"]]});
E.zet(T,[12],{titel:"Allergie en afweer",
  html:`<p><b>Aangeboren (niet-specifieke) afweer</b> werkt tegen alles, zonder te herkennen: huid, slijm, trilhaartjes, ontstekingsreactie. <b>Verworven (specifieke) afweer</b> richt zich op een bepaald <b>antigeen</b>, met B- en T-cellen en antistoffen.</p>
  <p>Een <b>antigeen</b> is de lichaamsvreemde stof (op de pollen); het lichaam maakt daartegen <b>antistoffen</b>. Bij een allergie laat de mediator <b>histamine</b> bloedvaten verwijden en lekken, waardoor weefsel opzwelt en rood wordt.</p>`,
  films:[["Vaccins, allergie en bloedgroepen","films/afweer/4-vaccins-allergie-en-bloedgroepen.html"],["De eerste verdediging","films/afweer/1-de-eerste-verdediging.html"]]});
E.zet(T,[13],{titel:"Diffusie en gaswisseling",
  html:`<p>De snelheid van gaswisseling hangt af van vier factoren: het <b>oppervlak (A)</b>, het <b>verschil in partiële druk (∆c)</b>, de <b>diffusiecoëfficiënt (D)</b> en de <b>diffusieafstand (∆x)</b>. Meer oppervlak en een groter drukverschil geven snellere diffusie; een grotere afstand remt af.</p>
  <p>In de longen zorgen veel open longblaasjes voor een groot oppervlak, en verse lucht houdt het drukverschil tussen longblaasje en bloed hoog. Raken longblaasjes afgesloten of ververst de lucht slecht, dan dalen A en ∆c.</p>`,
  films:[["Gas op reis","films/gaswisseling/2-gas-op-reis.html"],["Adem in, adem uit","films/gaswisseling/1-adem-in-adem-uit.html"]]});
E.zet(T,[14],{titel:"Autonoom zenuwstelsel",
  html:`<p>Het <b>animale</b> zenuwstelsel stuurt bewuste, willekeurige bewegingen (skeletspieren). Het <b>autonome</b> zenuwstelsel regelt onbewuste processen en bestaat uit het <b>orthosympatisch</b> deel (actie, 'vechten of vluchten') en het <b>parasympatisch</b> deel (rust en herstel).</p>
  <p>Bij inspanning verwijdt het orthosympatische deel de luchtwegen; in rust laat het parasympatische deel de gladde spieren in de bronchiolen juist samentrekken.</p>`,
  films:[["Het hoofdkantoor","films/zenuwstelsel/5-het-hoofdkantoor.html"]]});
E.zet(T,[15],{titel:"Longvolumes en het spirogram",
  html:`<p>Belangrijke longvolumes: het <b>restvolume</b> blijft altijd in de longen achter en kun je niet uitblazen. De <b>vitale capaciteit (VC)</b> is wat je maximaal kunt uitademen na maximaal inademen. Samen vormen ze de <b>totale longcapaciteit (TLC)</b>.</p>
  <p>In een flow-volumediagram staat de luchtsnelheid tegen het volume. Lees de assen zorgvuldig: de pieksnelheid en het eindvolume kun je er direct van aflezen.</p>`,
  films:[["Adem in, adem uit","films/gaswisseling/1-adem-in-adem-uit.html"]]});
E.zet(T,[16],{titel:"Biologische bestrijding en natuurlijke vijanden",
  html:`<p>Bij <b>biologische bestrijding</b> zet je een natuurlijke vijand in tegen een plaag. In zijn eigen leefgebied heeft zo'n soort meestal zelf al natuurlijke vijanden (predatoren, parasieten) die hem in toom houden.</p>
  <p>Zet je er extra exemplaren bij, dan krijgen die vijanden meer voedsel en nemen ze toe, zodat het aantal weer daalt. In een nieuw gebied, zonder die vijanden, kan de soort veel effectiever zijn.</p>`,
  films:[["Waarom zo weinig roofdieren?","films/ecologie/5-waarom-zo-weinig-roofdieren.html"],["Wie eet wie?","films/ecologie/3-wie-eet-wie.html"]]});
E.zet(T,[17,18],{titel:"Tolerantiecurven en milieufactoren",
  html:`<p>Een <b>tolerantiecurve</b> toont hoe goed een soort het doet bij verschillende waarden van een factor. De curve heeft een <b>minimum</b> (ondergrens), een <b>optimum</b> (de top) en een <b>maximum</b> (bovengrens). De <b>breedte</b> van de curve is de tolerantie: hoeveel variatie de soort verdraagt.</p>
  <p><b>Abiotische</b> factoren komen van de levenloze omgeving (temperatuur, neerslag, licht). <b>Biotische</b> factoren komen van andere organismen (predatie, concurrentie, ziekteverwekkers, voedsel).</p>`,
  films:[["Waar past een soort?","films/ecologie/2-waar-past-een-soort.html"]]});

/* ---------- opgave 3 ---------- */
E.zet(T,[19],{titel:"Vetvertering: emulgeren en gal",
  html:`<p><b>Emulgeren</b> is het verdelen van een grote vetdruppel in veel kleine druppeltjes. De vetmoleculen blijven daarbij heel; alleen het oppervlak wordt veel groter, zodat het enzym <b>lipase</b> het vet daarna sneller kan verteren.</p>
  <p>Emulgeren gebeurt door <b>galzouten</b> uit de <b>gal</b>. Gal wordt gemaakt in de <b>lever</b> en opgeslagen in de galblaas.</p>`,
  films:[["De reis door je buik","films/voeding/2-de-reis-door-je-buik.html"],["De lever als fabriek","films/voeding/5-de-lever-als-fabriek.html"]]});
E.zet(T,[20],{titel:"Organellen en opname van vet",
  html:`<p>Het <b>golgi-systeem</b> verpakt stoffen in blaasjes die de cel via <b>exocytose</b> verlaten. Het <b>ER</b> maakt lipiden (glad) en eiwitten (ruw, met ribosomen).</p>
  <p>Kleine, wateroplosbare verteringsproducten gaan rechtstreeks het <b>bloed (haarvat)</b> in. Grote vetdeeltjes (chylomicronen) zijn te groot voor de haarvaten en gaan eerst via de <b>lymfevaten</b> (borstbuis) naar het bloed.</p>`,
  films:[["Van darm naar bloed","films/voeding/4-van-darm-naar-bloed.html"],["Celorganellen","films/cellen/celorganellen/index.html"]]});
E.zet(T,[21],{titel:"Waarvoor dienen vetzuren?",
  html:`<p><b>Vetzuren</b> kun je in de mitochondriën afbreken tot <b>acetyl-CoA</b> (en zo verbranden voor energie), en gebruiken als bouwstof voor <b>fosfolipiden</b> in membranen. Je kunt er geen <b>eiwit</b> van maken: eiwitten bestaan uit <b>aminozuren</b> (met stikstof), die ribosomen aan elkaar koppelen.</p>`,
  films:[["Alles versneld","films/stofwisseling/1-alles-versneld.html"],["Celorganellen","films/cellen/celorganellen/index.html"]]});
E.zet(T,[22],{titel:"Bloed centrifugeren",
  html:`<p>Bij <b>centrifugeren</b> zakken de zwaarste deeltjes naar de bodem. In bloed zijn dat de <b>bloedcellen</b>: onderaan een dikke laag rode bloedcellen, met daarop een dun laagje witte bloedcellen. Daarboven blijft het <b>plasma</b> staan.</p>
  <p>Vet is lichter dan water, dus vetdeeltjes zoals <b>chylomicronen</b> blijven in de bovenste, plasma-laag drijven.</p>`,
  films:[["Wat er in je bloed zit","films/transport/3-wat-er-in-je-bloed-zit.html"]]});
E.zet(T,[23],{titel:"De alvleesklier",
  html:`<p>De <b>alvleesklier</b> heeft twee taken. Als verteringsklier geeft hij <b>alvleessap</b> met enzymen aan de darm af, waaronder <b>lipase</b> (vet), amylase (zetmeel) en proteasen (eiwit). Als hormoonklier geeft hij <b>insuline</b> en glucagon aan het bloed af om de glucoseconcentratie te regelen: <b>insuline</b> verlaagt die, glucagon verhoogt die.</p>`,
  films:[["Suiker in balans","films/hormonen/2-suiker-in-balans.html"]]});
E.zet(T,[24,25],{titel:"Gentherapie met een virus als vector",
  html:`<p>Bij <b>gentherapie</b> brengt een <b>vector</b> (vaak een onschadelijk gemaakt virus) een gezond gen in cellen. Maken die cellen daarna een eiwit (zoals LPL) dat ze aan het <b>bloed</b> afgeven, dan kan dat eiwit door het hele lichaam werken.</p>
  <p>Het virus blijft lichaamsvreemd. Zonder remming zouden <b>B- en T-cellen</b> er een afweerreactie tegen maken, waardoor de therapie mislukt. Daarom worden die cellen tijdelijk geremd.</p>`,
  films:[["CRISPR: wat doet dit gen?","films/vervolg/biomedisch-2-crispr-wat-doet-dit-gen.html"],["T-cellen en virussen","films/afweer/3-t-cellen-en-virussen.html"]]});
E.zet(T,[26],{titel:"Plasmiden, transgenen en expressie",
  html:`<p>Een <b>plasmide</b> is een ringetje DNA in een bacterie, handig om een gen (transgen) in te bouwen en te vermeerderen. Een <b>resistentiegen</b> helpt om bacteriën met de plasmide te selecteren.</p>
  <p>Voor <b>expressie</b> (aflezen tot eiwit) is naast het gen een <b>promotor</b> nodig, de startplaats voor transcriptie. Delen die alleen in de bacterie nodig zijn (zoals een bindingsplaats voor <b>prokaryoot</b> DNA-polymerase of een bacterieel resistentiegen) zijn in een zoogdiercel overbodig.</p>`,
  films:[["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"],["Op maat gekopieerd · PCR","films/dna-technieken/1-op-maat-gekopieerd/index.html"]]});
E.zet(T,[27],{titel:"Een experiment opzetten",
  html:`<p>In een goed experiment vergelijk je een <b>experimentele groep</b> met een <b>controlegroep</b> die alleen de te testen behandeling mist; alle andere omstandigheden houd je gelijk. Zo weet je zeker dat een verschil door de behandeling komt.</p>
  <p>Kies een duidelijke, meetbare grootheid die iets zegt over het effect, en meet die na verloop van tijd bij beide groepen.</p>`,
  films:[["Kun je onderzoek vertrouwen?","films/extra/kun-je-onderzoek-vertrouwen.html"]]});
E.zet(T,[28],{titel:"De regel van Hardy-Weinberg",
  html:`<p>Noem de allelfrequenties <b>p</b> en <b>q</b> (p + q = 1). Dan geldt voor de genotypen: p² homozygoot dominant, 2pq heterozygoot en <b>q²</b> homozygoot recessief.</p>
  <p>Bij een <b>recessieve</b> ziekte heeft alleen de homozygoot recessieve groep (q²) de ziekte. Het aantal zieke mensen reken je uit met q² × het aantal inwoners.</p>`,
  films:[["Toeval en uitwisseling","films/evolutie/5-toeval-en-uitwisseling.html"]]});

/* ---------- opgave 4 ---------- */
E.zet(T,[29],{titel:"Endocriene en exocriene klieren",
  html:`<p>Een <b>endocriene</b> klier (hormoonklier) geeft zijn stof rechtstreeks aan het <b>bloed</b> af; er loopt geen afvoerbuis naartoe. Een <b>exocriene</b> klier geeft zijn stof via een <b>afvoerbuis</b> af aan de buitenkant of aan een holte (zweet-, speeksel-, talgklieren).</p>
  <p>De epifyse geeft het hormoon <b>melatonine</b> aan het bloed af. Licht dat het netvlies opvangt remt die afgifte, zodat je overdag weinig en 's nachts veel melatonine hebt.</p>`,
  films:[["De baas van de klieren","films/hormonen/3-de-baas-van-de-klieren.html"],["Slaap","films/zenuwstelsel/7-slaap.html"]]});
E.zet(T,[30],{titel:"Receptoren op het membraan",
  html:`<p>Een hormoon werkt alleen op cellen met de juiste <b>receptor</b>. Zit de receptor op het <b>celmembraan</b>, dan blijft het hormoon buiten de cel; het signaal gaat naar binnen via <b>second messengers</b>, die onder meer de genexpressie kunnen beïnvloeden.</p>
  <p>Een <b>transcriptiefactor</b> bindt in de kern aan het DNA. Een hormoon dat zelf niet in de cel komt, is dus geen transcriptiefactor.</p>`,
  films:[["Post voor iedereen","films/hormonen/1-post-voor-iedereen.html"],["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"]]});
E.zet(T,[31,32],{titel:"Dissimilatie en ATP",
  html:`<p>Bij de <b>aerobe dissimilatie</b> wordt glucose afgebroken via de <b>glycolyse</b>, de <b>citroenzuurcyclus</b> en de <b>oxidatieve fosforylering</b>. Zuurstof wordt pas in die laatste stap gebruikt, als eindacceptor van elektronen. Glycolyse en gisting gaan zonder zuurstof.</p>
  <p>Een actief <b>neuron</b> gebruikt veel <b>ATP</b>, vooral voor de <b>natrium-kaliumpomp</b> die na elke impuls de rustpotentiaal herstelt, en voor het maken en afgeven van neurotransmitters.</p>`,
  films:[["Alles versneld","films/stofwisseling/1-alles-versneld.html"],["Het kabelnetwerk","films/zenuwstelsel/2-het-kabelnetwerk.html"]]});
E.zet(T,[33],{titel:"Mutaties: inserties en deleties",
  html:`<p>Het DNA wordt per <b>codon</b> (drie nucleotiden) afgelezen. Een <b>insertie</b> of <b>deletie</b> van een of twee nucleotiden verschuift het hele leesraam: alle codons erna veranderen (<b>leesraamverschuiving</b>).</p>
  <p>Daardoor kan een stopcodon eerder of juist later optreden. Verdwijnt het oude stopcodon (of verschuift het voorbij dat punt), dan wordt er langer doorgelezen en ontstaat een <b>langer</b> eiwit.</p>`,
  films:[["Mutaties","films/dna/5-mutaties.html"],["De genetische code lezen","films/dna/4-de-genetische-code-lezen.html"]]});
E.zet(T,[34],{titel:"Spiralisatie van het DNA",
  html:`<p>DNA is om histonen gewikkeld en kan meer of minder sterk opgerold (gespiraliseerd) zijn. Bij sterke <b>spiralisatie</b> ligt het DNA compact en moeilijk bereikbaar; bij <b>minder</b> spiralisatie ligt het losser en opener.</p>
  <p>Losser DNA is beter toegankelijk voor <b>enzymen</b>, zoals polymerase. Daardoor kunnen reparatie-enzymen een breuk makkelijker bereiken en herstellen.</p>`,
  films:[["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"]]});
E.zet(T,[35,36],{titel:"Grafieken en oorzaak-gevolg",
  html:`<p>Lees bij twee lijnen of staven goed welke <b>as</b> bij welke hoort en wat er op elk moment gebeurt. Koppel de vorm van de lijn aan het verhaal: wanneer is iets hoog, wanneer laag?</p>
  <p>Om <b>oorzaak en gevolg</b> te bepalen, kijk je wat je in het experiment hebt veranderd (de ingreep) en wat daarna verandert. Grijpt een stof in op A, en verandert daardoor B, dan is A de oorzaak en B het gevolg.</p>`,
  films:[["Slaap","films/zenuwstelsel/7-slaap.html"],["Kun je onderzoek vertrouwen?","films/extra/kun-je-onderzoek-vertrouwen.html"]]});

/* ---------- opgave 5 ---------- */
E.zet(T,[37],{titel:"Relatieve waarden berekenen",
  html:`<p>Een <b>relatieve</b> waarde vergelijkt een behandeling met een referentie, meestal de <b>controle</b>. Je deelt de waarde van de behandeling door die van de controle en maakt er een percentage van.</p>
  <p>Lees de staven zorgvuldig af en reken netjes: behandeling gedeeld door controle, maal 100%.</p>`,
  films:[["Kun je onderzoek vertrouwen?","films/extra/kun-je-onderzoek-vertrouwen.html"]]});
E.zet(T,[38],{titel:"Wortels, opname en groei",
  html:`<p>De wortels nemen <b>water en mineralen</b> op; hoe groter het wortelstelsel, hoe meer oppervlak voor opname. Met die stoffen en de suikers uit de <b>fotosynthese</b> groeit de plant (assimilatie), ook de wortels zelf.</p>
  <p>Een klein nadeel aan het begin kan zichzelf versterken: minder wortel, minder opname, minder groei, dus nog minder wortel. Zo wordt een klein beginverschil na enige tijd veel groter.</p>`,
  films:[["Hoe een plant groeit","films/transport/7-hoe-een-plant-groeit.html"],["Transport in planten","films/transport/6-transport-in-planten.html"]]});
E.zet(T,[39],{titel:"Fotosynthese: pigmenten en licht",
  html:`<p>De <b>lichtreactie</b> gebruikt pigmenten (chlorofyl a en b) om licht op te vangen. Daarbij worden <b>elektronen aangeslagen</b> in de fotosystemen. Chlorofyl absorbeert vooral <b>blauw</b> (rond 450 nm) en <b>rood</b> (rond 680 tot 700 nm) licht; groen licht (rond 550 nm) wordt teruggekaatst.</p>
  <p>Minder van een pigment betekent dat er bij de bijbehorende golflengte minder licht wordt opgevangen en dus minder elektronen worden aangeslagen.</p>`,
  films:[["Alles in het groen","films/stofwisseling/3-alles-in-het-groen.html"]]});
E.zet(T,[40,41],{titel:"Symbiose en lichtconcurrentie",
  html:`<p><b>Vlinderbloemigen</b> (zoals klaver) leven in <b>symbiose</b> met <b>knolletjesbacteriën</b> die stikstof uit de lucht binden. Dat voordeel is het grootst op <b>stikstofarme (nitraatarme)</b> bodems, waar andere planten weinig stikstof hebben. De plant geeft de bacteriën in ruil <b>organische stoffen</b> uit zijn fotosynthese.</p>
  <p>Bij <b>lichtconcurrentie</b> vangen hogere planten het licht weg. Een kortere plant doet dan minder aan fotosynthese, maakt minder suikers en kan de bacteriën minder voeden.</p>`,
  films:[["Stikstof gaat rond","films/ecologie/7-stikstof-gaat-rond.html"],["Wie eet wie?","films/ecologie/3-wie-eet-wie.html"]]});

})();
