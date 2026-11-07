/* Uitleg van de stof · oefenexamen havo 2021-I (tool havo21-1). Gekopieerd naar tools/examen-stof/havo21-1.js door samenvoegen.py. */
(function(){
"use strict";
if(!window.EXSTOF)return;
const E=window.EXSTOF,T="havo21-1";
const anim=(steps,draw)=>box=>E.stappen(box,steps,(st,s,i)=>{st.innerHTML=draw(i,s);});
const caps=a=>a.map(c=>({cap:c}));
const F={afw1:["De eerste verdediging","films/afweer/1-de-eerste-verdediging.html"],afw2:["Antistoffen op maat","films/afweer/2-antistoffen-op-maat.html"],afw4:["Vaccins, allergie en bloedgroepen","films/afweer/4-vaccins-allergie-en-bloedgroepen.html"],
  evo2:["Natuurlijke selectie","films/evolutie/2-natuurlijke-selectie.html"],evo4:["De mens als selectiefactor","films/evolutie/4-de-mens-als-selectiefactor.html"],evo6:["Hoe een soort er twee wordt","films/evolutie/6-hoe-een-soort-er-twee-wordt.html"],evo8:["Stambomen lezen","films/evolutie/8-stambomen-lezen.html"],
  onderz:["Onderzoek doen","films/cellen/onderzoek-doen/index.html"],groen:["Alles in het groen","films/stofwisseling/3-alles-in-het-groen.html"],versneld:["Alles versneld","films/stofwisseling/1-alles-versneld.html"],adem2:["Alles op adem","films/stofwisseling/2-alles-op-adem.html"],
  dna1:["Wat is DNA?","films/dna/1-wat-is-dna.html"],dna3:["Van DNA naar eiwit","films/dna/3-van-dna-naar-eiwit.html"],dna4:["De genetische code lezen","films/dna/4-de-genetische-code-lezen.html"],dna5:["Mutaties","films/dna/5-mutaties.html"],dna6:["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"],dna7:["DNA lezen","films/dna/7-dna-lezen.html"],
  eco3:["Wie eet wie?","films/ecologie/3-wie-eet-wie.html"],eco7:["Stikstof gaat rond","films/ecologie/7-stikstof-gaat-rond.html"],
  pomp:["Eén pomp, twee rondjes","films/transport/1-een-pomp-twee-rondjes.html"],bloed:["Wat er in je bloed zit","films/transport/3-wat-er-in-je-bloed-zit.html"],plant:["Transport in planten","films/transport/6-transport-in-planten.html"],
  voed2:["De reis door je buik","films/voeding/2-de-reis-door-je-buik.html"],voed3:["Knippen op maat","films/voeding/3-knippen-op-maat.html"],voed5:["De lever als fabriek","films/voeding/5-de-lever-als-fabriek.html"],
  gas3:["Uitscheiding en evenwicht","films/gaswisseling/3-uitscheiding-en-evenwicht.html"],zen2:["Het kabelnetwerk","films/zenuwstelsel/2-het-kabelnetwerk.html"],zen3:["De spleet","films/zenuwstelsel/3-de-spleet.html"],zen8:["Zintuigen","films/zenuwstelsel/8-zintuigen.html"],
  hor1:["Post voor iedereen","films/hormonen/1-post-voor-iedereen.html"],erf1:["Chromosomen","films/erfelijkheid/1-chromosomen.html"],erf2:["Monohybride kruisingen","films/erfelijkheid/2-monohybride-kruisingen.html"],stam:["Stamcellen","films/cellen/stamcellen.html"],microben:["Wat groeit er op je boterham?","films/cellen/microben.html"]};
const sv=(vb,g,l)=>E.svg(vb,g,l);

/* ===== opgave 1 ===== */
E.zet(T,[1],{titel:"Bouw past bij functie",
  html:`<p>In de biologie hangt de <b>bouw</b> van een orgaan vaak samen met zijn <b>functie</b>. Een snavel, een tand of een monddeel heeft een vorm die past bij wat het dier ermee doet: knippen, kraken, prikken, vasthouden.</p><p>Bij een vraag als deze noem je altijd twee dingen: <b>wat zie je</b> (een kenmerk van de vorm) en <b>wat heeft het dier eraan</b> (hoe helpt dat kenmerk bij de functie).</p>`});
E.zet(T,[2],{titel:"Vergroting en eenheden",
  html:`<p>Bij een vergroting van 100 x is alles op de afbeelding 100 keer zo groot als in het echt. <b>Werkelijke grootte = gemeten grootte : vergroting.</b></p><p>Eenheden: 1 mm = 1000 micrometer (µm), 1 µm = 1000 nanometer. Meet altijd in mm met een liniaal, deel door de vergroting en reken dan om.</p><p>De huid bestaat van buiten naar binnen uit de <b>opperhuid</b> (hoornlaag en kiemlaag, zonder bloedvaten), de <b>lederhuid</b> (met haarvaten, zenuwuiteinden, zweetklieren) en het <b>onderhuids bindweefsel</b> (met vet).</p>`,
  anim:anim(caps(["Je meet op het papier bijvoorbeeld 35 mm bij een vergroting van 500 x.","Echt: 35 mm : 500 = 0,07 mm.","0,07 mm × 1000 = 70 µm."]),i=>{const L=[350,350,350][i];let g=`<line x1="30" y1="50" x2="${30+L}" y2="50" stroke="var(--teal)" stroke-width="6"/>`;
    g+=`<text class="lbl" x="30" y="30">${["gemeten: 35 mm",": 500 → 0,07 mm","× 1000 → 70 µm"][i]}</text>`;if(i>0)g+=`<line x1="30" y1="90" x2="${30+L/500*20}" y2="90" stroke="var(--goud)" stroke-width="6"/><text class="lblm" x="50" y="95">echte lengte (veel kleiner)</text>`;return sv("0 0 420 110",g,"Rekenen met vergroting");}),
  films:[F.zen8]});
E.zet(T,[3],{titel:"De lagen van de huid",
  html:`<p>De huid heeft drie lagen:</p><ul><li><b>opperhuid</b>: hoornlaag (dode cellen) en kiemlaag (delende cellen). Geen bloedvaten en geen zenuwuiteinden.</li><li><b>lederhuid</b>: bindweefsel met haarvaten, zenuwuiteinden en zintuigen (tast, pijn, warmte), zweetklieren en haarzakjes.</li><li><b>onderhuids bindweefsel</b>: vooral vetcellen, isolatie en reserve; hier lopen grotere bloedvaten.</li></ul>`,
  anim:anim(caps(["Opperhuid: hoornlaag en kiemlaag.","Lederhuid: haarvaten, zenuwuiteinden, zweetklieren.","Onderhuids bindweefsel: vet."]),i=>{const L=[["opperhuid",25,"var(--goud)"],["lederhuid",90,"var(--koraal)"],["onderhuids bindweefsel",70,"var(--text3)"]];let y=10,g="";
    L.forEach(([t,h,c],k)=>{g+=`<rect x="20" y="${y}" width="300" height="${h}" fill="${c}" opacity="${k===i?.45:.12}"/><text class="lbl" x="330" y="${y+h/2+4}" style="opacity:${k===i?1:.5}">${t}</text>`;y+=h;});return sv("0 0 520 200",g,"Huidlagen");}),
  films:[F.zen8]});
E.zet(T,[4],{titel:"Temperatuurregeling",
  html:`<p>Het lichaam houdt de temperatuur rond een <b>norm</b> (normaal 37 °C). De hypothalamus vergelijkt de gemeten temperatuur met de norm en stuurt bij met <b>negatieve terugkoppeling</b>.</p><ul><li>Warmte <b>maken</b>: meer verbranding, spieren laten samentrekken.</li><li>Warmte <b>vasthouden</b> of <b>afgeven</b>: de doorbloeding van de huid regelen.</li><li>Warmte <b>afvoeren</b>: verdamping van water op de huid.</li></ul><p>Bij koorts wordt de norm hoger gezet. Het lichaam reageert dan alsof het te koud heeft.</p>`,
  films:[F.hor1]});
E.zet(T,[5,6],{titel:"Antigenen, antistoffen en immuniteit",
  html:`<p>Een <b>antigeen</b> is een molecuul (vaak een eiwit) op een ziekteverwekker dat door het afweersysteem herkend wordt. Een <b>antistof</b> is een eiwit dat B-cellen (plasmacellen) maken en dat precies past op één antigeen, zoals een sleutel op een slot.</p><p>Na een infectie blijven er <b>geheugencellen</b> over. Bij een volgende besmetting met hetzelfde antigeen reageren ze snel.</p><ul><li><b>Actieve immuniteit</b>: je eigen afweer maakt de antistoffen en geheugencellen (na infectie of vaccinatie).</li><li><b>Passieve immuniteit</b>: je krijgt kant-en-klare antistoffen (serum, via placenta of moedermelk).</li></ul>`,
  films:[F.afw2,F.afw4]});
E.zet(T,[7],{titel:"Natuurlijke selectie",
  html:`<p>Natuurlijke selectie werkt in drie stappen:</p><ul><li><b>Variatie</b>: individuen verschillen, onder andere door mutaties.</li><li><b>Selectie</b>: in een bepaald milieu overleven individuen met een gunstige eigenschap beter; ze hebben een selectievoordeel (hogere fitness).</li><li><b>Voortplanting</b>: zij geven hun allelen vaker door, zodat de eigenschap in de populatie toeneemt.</li></ul><p>Let op: een organisme past zich niet ‘aan’ omdat het iets nodig heeft. De variatie is er al; het milieu bepaalt wie overblijft.</p>`,
  films:[F.evo2,F.evo4]});

/* ===== opgave 2 ===== */
E.zet(T,[8],{titel:"Een experiment opzetten",
  html:`<p>Een goed experiment vergelijkt groepen die maar in <b>één factor</b> verschillen: de onafhankelijke variabele. Al het andere houd je gelijk (constante factoren).</p><ul><li>Gebruik per groep <b>meerdere</b> proefobjecten, zodat toevallige verschillen uitmiddelen.</li><li>Gebruik in elke groep <b>evenveel</b> proefobjecten.</li><li>Beschrijf <b>wat je meet en hoe</b>.</li></ul><p><b>Biomassa</b> is de massa organische stof van een organisme. Omdat de hoeveelheid water sterk wisselt, bepaal je biomassa als <b>droge massa</b>: eerst drogen, dan wegen.</p>`,
  films:[F.onderz]});
E.zet(T,[9],{titel:"Fotosynthese en beperkende factoren",
  html:`<p>Fotosynthese: 6 CO<sub>2</sub> + 6 H<sub>2</sub>O → C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> + 6 O<sub>2</sub>, met lichtenergie. CO<sub>2</sub> komt via de <b>huidmondjes</b> het blad in; tegelijk verdampt daar water.</p><p>Een <b>beperkende factor</b> is de factor die op dat moment de snelheid van een proces begrenst. Dat kan een grondstof zijn (CO<sub>2</sub>, water), licht, of de temperatuur.</p><p>Enzymen werken het snelst bij hun <b>optimumtemperatuur</b>. Bij kou bewegen moleculen langzaam en verloopt de reactie traag; bij te hoge temperatuur denatureert het enzym.</p>`,
  films:[F.groen,F.versneld]});
E.zet(T,[10],{titel:"Bouwstenen van DNA en eiwitten",
  html:`<p><b>DNA</b> is opgebouwd uit nucleotiden. Elke nucleotide bestaat uit drie delen: een <b>fosfaatgroep</b>, een <b>suiker</b> (desoxyribose) en een <b>stikstofbase</b> (A, T, C of G).</p><p>Een <b>aminozuur</b> heeft een aminogroep (–NH<sub>2</sub>), een zuurgroep (–COOH) en een restgroep. Zoek de structuurformules op in je informatieboek en kijk welke atomen erin zitten.</p>`,
  films:[F.dna1]});
E.zet(T,[11,12],{titel:"De stikstofkringloop",
  html:`<p>Stikstof gaat rond in een ecosysteem:</p><ul><li><b>Stikstofbinding</b>: bepaalde bacteriën (vrij in de bodem of in wortelknolletjes van vlinderbloemigen) zetten N<sub>2</sub> uit de lucht om in stikstofverbindingen. Dat kost veel energie.</li><li><b>Rotting</b> (ammonificatie): reducenten breken eiwitten uit dode resten af tot ammonium.</li><li><b>Nitrificatie</b>: nitrificerende bacteriën zetten ammonium om in nitriet en nitraat.</li><li><b>Denitrificatie</b>: denitrificerende bacteriën zetten nitraat om in N<sub>2</sub>-gas, dat terug de lucht in gaat.</li></ul><p>Planten nemen nitraat (en ammonium) op en maken er eiwitten en DNA van.</p>`,
  films:[F.eco7]});

/* ===== opgave 3 ===== */
E.zet(T,[13],{titel:"Een scan lezen",
  html:`<p>Een CT-scan van de buik is een dwarsdoorsnede. Je kijkt er <b>van onderen</b> tegenaan, alsof je bij de voeten van de patiënt staat. De rechterkant van de patiënt staat daardoor <b>links</b> op het beeld.</p><p>Bot is wit, lucht is zwart. Organen herken je aan hun plek en vorm. Zoek in je informatieboek een afbeelding van de buikorganen op: welke organen liggen rechts, links, voor en achter?</p>`,
  films:[F.voed5]});
E.zet(T,[14],{titel:"Aanmaak en afbraak van rode bloedcellen",
  html:`<p>Rode bloedcellen leven ongeveer 120 dagen. Ze worden <b>gemaakt</b> uit stamcellen in het <b>rode beenmerg</b>. Daar wordt ook hemoglobine gemaakt; daarvoor is ijzer nodig.</p><p>Oude rode bloedcellen worden <b>afgebroken</b> in de milt en de lever. Uit hemoglobine ontstaat bilirubine (dat met de gal wordt uitgescheiden), en het ijzer wordt hergebruikt.</p>`,
  films:[F.bloed,F.voed5]});
E.zet(T,[15],{titel:"Klieren en hun afvoerbuizen",
  html:`<p>Een <b>exocriene</b> klier geeft zijn product af via een afvoerbuis, bijvoorbeeld een verteringssap aan de darm. Een <b>endocriene</b> klier (hormoonklier) geeft zijn product direct af aan het bloed.</p><p>In de twaalfvingerige darm komen twee buizen uit: de galgang (gal uit lever en galblaas) en de afvoerbuis van de alvleesklier (alvleessap). Bekijk in je informatieboek welke enzymen in welk verteringssap zitten. Veel enzymen worden als onwerkzame voorloper afgegeven (de naam eindigt dan op -ogeen).</p>`,
  films:[F.voed2,F.voed3]});
E.zet(T,[16],{titel:"De bloedsomloop",
  html:`<p>De mens heeft een <b>dubbele bloedsomloop</b>:</p><ul><li><b>kleine bloedsomloop</b>: rechterkamer → longslagader → haarvaten van de longen → longaders → linkerboezem;</li><li><b>grote bloedsomloop</b>: linkerkamer → aorta → slagaders → haarvaten in de organen → aders → holle aders → rechterboezem.</li></ul><p>De darmen sturen hun bloed via de <b>poortader</b> naar de lever. De lever krijgt ook zuurstofrijk bloed via de <b>leverslagader</b> en geeft bloed af via de <b>leverader</b> aan de onderste holle ader. Bloed uit hoofd en armen komt via de bovenste holle ader terug.</p>`,
  anim:anim(caps(["Rechterhelft van het hart → longen.","Longen → linkerhelft van het hart.","Linkerhelft → lichaam → terug naar rechts."]),i=>{let g=`<rect x="200" y="80" width="60" height="60" rx="10" fill="var(--teal)" opacity=".3"/><rect x="270" y="80" width="60" height="60" rx="10" fill="var(--koraal)" opacity=".3"/><text class="lblm" x="230" y="160" text-anchor="middle">rechts</text><text class="lblm" x="300" y="160" text-anchor="middle">links</text>`;
    g+=`<text class="lbl" x="265" y="30" text-anchor="middle">longen</text><text class="lbl" x="265" y="215" text-anchor="middle">lichaam</text>`;
    if(i>=0)g+=`<path d="M230,80 Q230,40 255,40" stroke="var(--teal)" stroke-width="3" fill="none"/>`;if(i>=1)g+=`<path d="M275,40 Q300,40 300,80" stroke="var(--koraal)" stroke-width="3" fill="none"/>`;
    if(i>=2)g+=`<path d="M300,140 Q300,200 265,200 Q230,200 230,140" stroke="var(--goud)" stroke-width="3" fill="none"/>`;return sv("0 0 530 225",g,"Dubbele bloedsomloop");}),
  films:[F.pomp]});
E.zet(T,[17],{titel:"Urinevorming in de nier",
  html:`<p>In een nefron gebeuren drie dingen:</p><ul><li><b>ultrafiltratie</b>: in het glomerulus wordt onder hoge druk water met kleine opgeloste stoffen uit het bloed in het kapsel van Bowman geperst (voorurine). Bloedcellen en grote eiwitten blijven in het bloed.</li><li><b>terugresorptie</b>: nuttige stoffen (glucose, zouten, veel water) gaan uit de voorurine terug naar het bloed.</li><li><b>osmose</b>: water volgt de opgeloste stoffen door een membraan.</li></ul>`,
  films:[F.gas3]});
E.zet(T,[18],{titel:"Vetvertering",
  html:`<p>Vet lost niet op in water en vormt druppels in de darminhoud. Enzymen werken alleen aan het <b>oppervlak</b> van zo'n druppel.</p><p><b>Gal</b> wordt gemaakt in de lever en opgeslagen in de galblaas. Gal bevat <b>geen enzymen</b>, maar galzouten die vet <b>emulgeren</b>. <b>Lipase</b> (vooral uit de alvleesklier) breekt vet af tot vetzuren en glycerol.</p>`,
  films:[F.voed3]});

/* ===== opgave 4 ===== */
E.zet(T,[19],{titel:"Selectie en isolatie",
  html:`<p>Bij <b>kunstmatige selectie</b> (veredeling) kiest de mens welke individuen zich voortplanten. Bij <b>natuurlijke selectie</b> doet het milieu dat.</p><p><b>Isolatie</b> betekent dat groepen zich niet meer met elkaar voortplanten, zodat er geen allelen meer worden uitgewisseld. In de natuur kan dat door een berg, water of een ander paargedrag; bij soortvorming is isolatie nodig zodat twee populaties steeds verder uit elkaar groeien.</p>`,
  films:[F.evo4,F.evo6]});
E.zet(T,[20],{titel:"Mutaties en mutagene factoren",
  html:`<p>Een <b>mutatie</b> is een verandering in het DNA. Mutaties ontstaan spontaan (fouten bij het kopiëren) of door factoren van buitenaf: bepaalde straling (uv, röntgen, radioactieve straling) en chemische stoffen.</p><p>Niet elke verandering van een organisme is een mutatie: het milieu kan ook het fenotype veranderen zonder dat het DNA verandert. Zoek bij twijfel de begrippen op in je boek.</p>`,
  films:[F.dna5]});
E.zet(T,[21],{titel:"Differentiatie en genexpressie",
  html:`<p>Alle cellen van een plant of dier ontstaan door mitose uit één cel en hebben <b>hetzelfde DNA</b>. Toch verschillen ze. Dat komt doordat in elke celsoort <b>andere genen tot expressie</b> komen: ze worden afgelezen tot RNA en vertaald tot eiwit. Dit heet <b>differentiatie</b>.</p><p>Signalen van buiten de cel, zoals hormonen, kunnen genen aan- of uitzetten.</p>`,
  films:[F.dna6,F.stam]});
E.zet(T,[22],{titel:"Geslachtelijk en ongeslachtelijk vermeerderen",
  html:`<p>Bij <b>geslachtelijke voortplanting</b> vormen ouders geslachtscellen (meiose) en worden allelen opnieuw gecombineerd. Een heterozygote ouder (Aa) kan dan nakomelingen met AA, Aa en aa krijgen.</p><p>Bij <b>ongeslachtelijke voortplanting</b> (stekken, weefselkweek) ontstaan nakomelingen door mitose: ze hebben precies <b>hetzelfde genotype</b> als de ouder (een kloon).</p><p>Een <b>soort</b> is een groep organismen die zich onderling kan voortplanten en vruchtbare nakomelingen krijgt. Een <b>ras</b> is een groep binnen een soort met kenmerkende eigenschappen.</p>`,
  films:[F.erf2]});
E.zet(T,[23],{titel:"Genotype, milieu en fenotype",
  html:`<p>Het <b>fenotype</b> (de waarneembare eigenschappen) ontstaat door het <b>genotype</b> én invloeden van het <b>milieu</b>: licht, temperatuur, voeding, water. Twee planten met hetzelfde genotype kunnen er dus verschillend uitzien als ze onder andere omstandigheden groeien.</p><p>Wil je weten of een verschil genetisch is, dan moet je verschillen door het milieu uitsluiten.</p>`,
  films:[F.onderz]});
E.zet(T,[24,25],{titel:"DNA-fingerprints",
  html:`<p>Bij een DNA-fingerprint knip of kopieer je stukken DNA en scheid je ze op lengte met <b>gelelektroforese</b>: korte stukken lopen verder door de gel dan lange. Elk bandje is een groep stukken DNA met dezelfde lengte.</p><p>Hoe meer bandjes twee monsters gemeenschappelijk hebben, hoe meer ze genetisch op elkaar lijken. Om te beoordelen of een verschil groot of klein is, vergelijk je met <b>referenties</b> waarvan je weet hoe verwant ze zijn.</p>`,
  films:[F.dna7]});

/* ===== opgave 5 ===== */
E.zet(T,[26],{titel:"Van RNA naar eiwit",
  html:`<p>Bij de <b>translatie</b> leest een ribosoom het mRNA per <b>codon</b>: drie nucleotiden achter elkaar. Elk codon codeert voor één aminozuur (of is een startcodon of stopcodon). Met de codontabel in je informatieboek zie je welk codon bij welk aminozuur hoort.</p>`,
  films:[F.dna3,F.dna4]});
E.zet(T,[27],{titel:"Een stamboom lezen",
  html:`<p>In een evolutionaire stamboom is elk splitsingspunt een <b>gemeenschappelijke voorouder</b>. Twee soorten zijn nauwer verwant naarmate hun gemeenschappelijke voorouder <b>recenter</b> is: volg de lijnen terug tot ze samenkomen.</p><p>Hoe langer twee soorten gescheiden zijn, hoe meer mutaties zich hebben opgestapeld. Daarom is het aantal verschillen in DNA of aminozuurvolgorde een maat voor verwantschap: <b>meer overeenkomst = nauwer verwant</b>. De volgorde van de namen van boven naar beneden zegt niets; alleen de vertakkingen tellen.</p>`,
  films:[F.evo8]});
E.zet(T,[28],{titel:"Impulsen en de synaps",
  html:`<p>Een impuls ontstaat als een prikkel de <b>drempelwaarde</b> van een zintuigcel of zenuwcel overschrijdt. De impuls wordt over de uitloper geleid naar het uiteinde.</p><p>In de synaps: de impuls opent <b>Ca<sup>2+</sup>-kanalen</b> in het membraan van het uiteinde, Ca<sup>2+</sup> stroomt naar binnen, en daardoor <b>fuseren blaasjes</b> met het membraan. De neurotransmitter komt in de synapsspleet en bindt aan <b>receptoren</b> op de volgende cel.</p>`,
  films:[F.zen2,F.zen3]});

/* ===== opgave 6 ===== */
E.zet(T,[29],{titel:"Fotosynthese en het gebruik van suikers",
  html:`<p>Bladeren zijn de plek van de <b>fotosynthese</b>: daar worden energierijke stoffen (glucose) gemaakt. Via de <b>bastvaten</b> gaan die stoffen naar de rest van de plant.</p><p>Een plant verdeelt zijn energierijke stoffen over groei (bladeren, wortels), opslag en voortplanting (bloemen, zaden, vruchten). Wat ergens naartoe gaat, kan niet tegelijk ergens anders gebruikt worden.</p>`,
  films:[F.groen,F.plant]});
E.zet(T,[30],{titel:"Bouw van een blad",
  html:`<p>Een blad heeft aan de boven- en onderkant een <b>epidermis</b>. Daartussen ligt het bladmoes: <b>palissadeparenchym</b> (veel bladgroenkorrels) en sponsparenchym met <b>intercellulaire ruimtes</b>. In de onderste epidermis zitten <b>huidmondjes</b>.</p><p>Door het blad lopen <b>vaatbundels</b> met twee soorten vaten:</p><ul><li><b>houtvaten</b>: water en opgeloste zouten van de wortels naar boven;</li><li><b>bastvaten</b>: opgeloste organische stoffen (suikers) van het blad naar de rest van de plant.</li></ul>`,
  films:[F.plant]});
E.zet(T,[31],{titel:"Vormen van symbiose",
  html:`<p>Bij <b>symbiose</b> leven twee soorten nauw samen. De naam hangt af van wat ze eraan hebben:</p><ul><li><b>mutualisme</b>: beide hebben voordeel;</li><li><b>commensalisme</b>: de een heeft voordeel, de ander geen voordeel en geen nadeel;</li><li><b>parasitisme</b>: de een heeft voordeel, de ander nadeel.</li></ul><p>Bij ‘beredeneer’ noem je de definitie en laat je met de gegevens zien dat het klopt voor beide partners.</p>`,
  films:[F.eco3]});
E.zet(T,[32],{titel:"Hypothese en resultaat",
  html:`<p>Een <b>hypothese</b> is een verwachte uitkomst die je kunt toetsen. Voordat je het experiment doet, bedenk je welk resultaat de hypothese <b>bevestigt</b> en welk resultaat haar <b>verwerpt</b>.</p><p>Vergelijk groepen eerlijk: zijn ze niet even groot, gebruik dan een gemiddelde of een aantal <b>per</b> proefobject.</p>`,
  films:[F.onderz]});
E.zet(T,[33],{titel:"Van gen naar eiwit, en genregulatie",
  html:`<p>Een gen komt tot expressie in twee stappen: <b>transcriptie</b> (DNA → mRNA) en <b>translatie</b> (mRNA → eiwit). Genen kunnen aan- en uitgezet worden door regulatie-eiwitten (activatoren of repressoren) die aan het DNA binden.</p><p>Bedenk bij zo'n vraag bij elke stap (DNA, mRNA, eiwit) of een regulatie-eiwit daar invloed op heeft.</p>`,
  films:[F.dna6]});

/* ===== opgave 7 ===== */
E.zet(T,[34],{titel:"Karyogram en karyotype",
  html:`<p>Een <b>karyogram</b> is een foto van de chromosomen van één cel, gerangschikt in paren. Een normale menselijke lichaamscel heeft <b>46 chromosomen</b>: 22 paar autosomen en 1 paar geslachtschromosomen (vrouw XX, man XY).</p><p>Het <b>karyotype</b> noteer je als: aantal chromosomen, geslachtschromosomen, en eventuele afwijkingen. Bijvoorbeeld 45, X voor een meisje met het syndroom van Turner (één X-chromosoom te weinig).</p>`,
  films:[F.erf1]});
E.zet(T,[35],{titel:"Druk in het hart",
  html:`<p>De <b>linkerkamer</b> pompt bloed door het hele lichaam (grote bloedsomloop) en heeft een dikke spierwand: daar is de druk hoog. De <b>rechterkamer</b> pompt bloed alleen naar de longen (kleine bloedsomloop): de druk is daar veel lager.</p><p>Vloeistof stroomt altijd van een plek met <b>hoge druk</b> naar een plek met <b>lage druk</b>.</p>`,
  films:[F.pomp]});
E.zet(T,[36],{titel:"Enzymen en pH",
  html:`<p>Enzymen zijn <b>eiwitten</b>. Elk enzym werkt het best bij een bepaalde <b>optimum-pH</b>. Is de pH ver van dat optimum, dan verandert de vorm van het enzym (denaturatie) en werkt het niet meer.</p><p>Elk deel van het spijsverteringskanaal heeft zijn eigen pH en zijn eigen enzymen. Zoek in je informatieboek op welke pH waar heerst en bij welke pH een enzym het best werkt.</p>`,
  films:[F.voed3]});

/* ===== opgave 8 ===== */
E.zet(T,[37],{titel:"Trofische niveaus",
  html:`<p>Een <b>trofisch niveau</b> is de plaats van een organisme in een voedselketen:</p><ul><li><b>producenten</b>: maken zelf organische stof (fotosynthese), ze zijn autotroof;</li><li><b>consumenten</b> van de 1e, 2e, 3e … orde: eten andere organismen;</li><li><b>reducenten</b>: breken dode resten af tot anorganische stoffen.</li></ul><p>Een pijl in een voedselweb wijst van ‘wordt gegeten’ naar ‘eter’.</p>`,
  films:[F.eco3]});
E.zet(T,[38],{titel:"Winterslaap en energie",
  html:`<p>Een zoogdier in <b>winterslaap</b> verlaagt zijn stofwisselingsniveau sterk: hartslag, ademhaling en lichaamstemperatuur dalen. Zo verbruikt het weinig energie.</p><p>Energie komt vrij bij <b>verbranding</b> (dissimilatie) van glucose of vet. In de winter is er geen voedsel, dus het dier leeft van de <b>vetreserve</b> die het in de herfst heeft opgebouwd.</p>`,
  films:[F.adem2]});
E.zet(T,[39],{titel:"De controlegroep",
  html:`<p>Een <b>controlegroep</b> wordt precies zo behandeld als de proefgroep, <b>op de onderzochte factor na</b>. Zo weet je dat een verschil in resultaat door die factor komt.</p><p>Voorbeeld: test je een medicijn in een pil, dan krijgt de controlegroep een pil zonder het medicijn (een placebo).</p>`,
  films:[F.onderz]});
E.zet(T,[40,41],{titel:"Grafieken van een experiment lezen",
  html:`<p>Lees bij een grafiek eerst de <b>assen</b> en de <b>legenda</b>: wat staat er waar, in welke eenheid, en welke lijn of staaf hoort bij welke groep?</p><p>Vergelijk de proefgroepen altijd met de <b>controlegroep</b>. Kijk ook naar het verloop in de tijd: neemt iets toe, af, of blijft het gelijk?</p><p>Een experiment laat zien wat er <b>kan</b> gebeuren. Of dat ook in de natuur gebeurt, controleer je met <b>veldwaarnemingen</b>.</p>`,
  films:[F.onderz]});
E.zet(T,[42],{titel:"Specifieke en aspecifieke afweer",
  html:`<p><b>Aspecifieke afweer</b> werkt tegen alles wat lichaamsvreemd is, zonder één bepaald antigeen te herkennen. Hij is er altijd en werkt meteen, bijvoorbeeld de huid, slijmvliezen en de ontstekingsreactie.</p><p><b>Specifieke afweer</b> richt zich op <b>één bepaald antigeen</b>. Daarbij worden lymfocyten geactiveerd die precies dat antigeen herkennen. Dat duurt bij een eerste besmetting een paar dagen, en er ontstaan geheugencellen.</p><p>Bedenk bij elk proces: is het gericht op één bepaald antigeen of niet?</p>`,
  films:[F.afw1,F.afw2]});
E.zet(T,[43],{titel:"Erfelijke en verworven eigenschappen",
  html:`<p>Een eigenschap is <b>erfelijk</b> als hij in het DNA ligt vastgelegd en via de geslachtscellen wordt doorgegeven. Eigenschappen die een organisme tijdens zijn leven verwerft (spieren door training, een litteken, een aangeleerd gedrag) veranderen het DNA van de geslachtscellen niet.</p>`,
  films:[F.afw4]});
})();
