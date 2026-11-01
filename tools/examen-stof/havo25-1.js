/* Uitleg van de stof · oefenexamen havo 2025-I (tool havo25-1). Gekopieerd naar tools/examen-stof/havo25-1.js door samenvoegen.py. */
(function(){
"use strict";
if(!window.EXSTOF)return;
const E=window.EXSTOF,T="havo25-1";
const anim=(steps,draw)=>box=>E.stappen(box,steps,(st,s,i)=>{st.innerHTML=draw(i,s);});
const caps=a=>a.map(c=>({cap:c}));
const F={eco2:["Waar past een soort?","films/ecologie/2-waar-past-een-soort.html"],eco3:["Wie eet wie?","films/ecologie/3-wie-eet-wie.html"],eco5:["Waarom zo weinig roofdieren?","films/ecologie/5-waarom-zo-weinig-roofdieren.html"],
  eco1:["Hoeveel passen er?","films/ecologie/1-hoeveel-passen-er.html"],eco4:["Waar blijft het blad?","films/ecologie/4-waar-blijft-het-blad.html"],eco6:["Koolstof gaat rond","films/ecologie/6-koolstof-gaat-rond.html"],
  evo2:["Natuurlijke selectie","films/evolutie/2-natuurlijke-selectie.html"],evo5:["Toeval en uitwisseling","films/evolutie/5-toeval-en-uitwisseling.html"],
  erf1:["Chromosomen","films/erfelijkheid/1-chromosomen.html"],erf3:["Voorbij dominant en recessief","films/erfelijkheid/3-voorbij-dominant-en-recessief.html"],erf5:["Overerving via X-chromosomen","films/erfelijkheid/5-overerving-via-x-chromosomen-en-mitochondrien.html"],erf6:["Stambomen en kansrekenen","films/erfelijkheid/6-stambomen-en-kansrekenen.html"],
  bloed:["Wat er in je bloed zit","films/transport/3-wat-er-in-je-bloed-zit.html"],pomp:["Eén pomp, twee rondjes","films/transport/1-een-pomp-twee-rondjes.html"],afw2:["Antistoffen op maat","films/afweer/2-antistoffen-op-maat.html"],afw3:["T-cellen en virussen","films/afweer/3-t-cellen-en-virussen.html"],afw4:["Vaccins, allergie en bloedgroepen","films/afweer/4-vaccins-allergie-en-bloedgroepen.html"],
  stam:["Stamcellen","films/cellen/stamcellen.html"],dna6:["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"],dna4:["De genetische code lezen","films/dna/4-de-genetische-code-lezen.html"],dna5:["Mutaties","films/dna/5-mutaties.html"],dna1:["Wat is DNA?","films/dna/1-wat-is-dna.html"],
  groen:["Alles in het groen","films/stofwisseling/3-alles-in-het-groen.html"],adem2:["Alles op adem","films/stofwisseling/2-alles-op-adem.html"],celdel:["Celdeling","films/voortplanting/celdeling/index.html"],
  voed1:["Wat zit er in je eten?","films/voeding/1-wat-zit-er-in-je-eten.html"],voed3:["Knippen op maat","films/voeding/3-knippen-op-maat.html"],voed5:["De lever als fabriek","films/voeding/5-de-lever-als-fabriek.html"],
  gas1:["Adem in, adem uit","films/gaswisseling/1-adem-in-adem-uit.html"],gas3:["Uitscheiding en evenwicht","films/gaswisseling/3-uitscheiding-en-evenwicht.html"],
  zen2:["Het kabelnetwerk","films/zenuwstelsel/2-het-kabelnetwerk.html"],zen3:["De spleet","films/zenuwstelsel/3-de-spleet.html"],zen5:["Het hoofdkantoor","films/zenuwstelsel/5-het-hoofdkantoor.html"],zen8:["Zintuigen","films/zenuwstelsel/8-zintuigen.html"],
  hor4:["Stress","films/hormonen/4-stress.html"],org:["Celorganellen","films/cellen/celorganellen/index.html"],microben:["Wat groeit er op je boterham?","films/cellen/microben.html"],onderz:["Onderzoek doen","films/cellen/onderzoek-doen/index.html"],kun:["Kun je onderzoek vertrouwen?","films/extra/kun-je-onderzoek-vertrouwen.html"]};

/* ===== opgave 1 ===== */
E.zet(T,[1],{titel:"Begrippen in de ecologie",
  html:`<p>Ecologie werkt met een vaste reeks van klein naar groot:</p><ul><li><b>individu</b>: één organisme;</li><li><b>populatie</b>: alle individuen van één soort in een gebied, die zich onderling kunnen voortplanten;</li><li><b>levensgemeenschap</b>: alle populaties (soorten) in een gebied samen;</li><li><b>ecosysteem</b>: de levensgemeenschap plus de abiotische factoren (bodem, water, klimaat);</li></ul><p>Daarnaast heeft elke soort een plek waar hij kan leven en alles vindt wat hij nodig heeft, en een rol in het ecosysteem (zijn <b>niche</b>). Een <b>trofisch niveau</b> is de plaats in een voedselketen: producent, consument van de eerste orde, enzovoort.</p>`,
  films:[F.eco2]});
E.zet(T,[2],{titel:"Inheemse soorten en exoten",
  html:`<p>Een <b>inheemse</b> soort hoort van nature in een gebied. Een <b>exoot</b> is een soort die door toedoen van de mens (bewust uitgezet of per ongeluk meegenomen, bijvoorbeeld met schepen of handel) in een gebied terecht is gekomen waar hij van nature niet voorkwam.</p><p>Soorten verspreiden zich ook op eigen kracht: vogels vliegen, zaden waaien mee, dieren trekken naar nieuwe gebieden als hun populatie groeit. Het verschil zit dus in de <b>manier</b> waarop een soort in een gebied komt, niet in hoe nieuw of zeldzaam hij is.</p>`,
  films:[F.eco2]});
function keten(i){const n=[[1],[1,1,1],[1,1,1,1,1,1,1]];let g="";["water / plankton","vis","visetende vogel"].forEach((t,k)=>{const y=40+k*70,on=k<=i;
  g+=`<text class="lbl" x="16" y="${y+5}" style="opacity:${on?1:.3}">${t}</text>`;for(let j=0;j<[2,5,10][k];j++)g+=`<circle cx="${180+j*22}" cy="${y}" r="6" fill="var(--paars)" opacity="${on?.85:.12}"/>`;});
  g+=`<text class="lblm" x="16" y="232">● = hoeveelheid PCB per gram lichaam (voorbeeld)</text>`;return E.svg("0 0 460 245",g,"Ophoping van een stof in een voedselketen");}
E.zet(T,[3],{titel:"Stoffen die zich ophopen in de voedselketen",
  html:`<p>De meeste stoffen die een dier binnenkrijgt, worden verteerd, verbrand of uitgescheiden. Sommige stoffen niet: zware metalen, PCB's en bepaalde bestrijdingsmiddelen worden <b>nauwelijks afgebroken</b> en lossen goed op in vet. Ze blijven in het lichaam en <b>hopen zich op</b> (accumulatie).</p><p>Een dier eet in zijn leven heel veel prooien. Alles wat in die prooien was opgehoopt, komt bij hem samen. Zo stijgt de concentratie bij elke stap in een voedselketen.</p>`,
  anim:anim(caps(["Een stof als PCB komt in kleine hoeveelheden in het water en het plankton.","Een vis eet heel veel plankton. De stof wordt niet afgebroken en blijft in de vis.","Een vogel die veel vis eet, krijgt de opgehoopte stof van al die vissen binnen."]),keten),
  films:[F.eco3,F.eco5]});
E.zet(T,[4],{titel:"Groeicurven en wat een grafiek wel en niet zegt",
  html:`<p>Bij <b>lineaire groei</b> komt er per tijdseenheid steeds ongeveer <b>hetzelfde aantal</b> bij (bijvoorbeeld +2 per jaar). Bij <b>exponentiële groei</b> wordt het aantal per tijdseenheid met <b>dezelfde factor</b> vermenigvuldigd (bijvoorbeeld steeds ×2): de toename wordt steeds groter, de curve loopt steeds steiler.</p><p>Lees bij een grafiek altijd eerst de <b>as</b> goed: wat wordt er precies geteld (individuen, paren, nesten, jongen)? Een conclusie is alleen ondersteund als de grafiek er gegevens over geeft.</p>`,
  films:[F.eco1]});
E.zet(T,[5],{titel:"Genetische variatie en inteelt",
  html:`<p>De <b>genetische variatie</b> in een populatie is de verscheidenheid aan allelen. Hoe kleiner de populatie, hoe groter de kans dat dieren verwant zijn en onderling paren: <b>inteelt</b>. Daardoor krijgen jongen vaker twee dezelfde allelen, ook van schadelijke recessieve allelen.</p><p>Veel variatie is belangrijk: als het milieu verandert (nieuwe ziekte, ander klimaat, minder voedsel), is de kans groter dat sommige individuen eigenschappen hebben om te overleven. Uitwisseling met andere populaties (migratie) brengt nieuwe allelen in.</p>`,
  films:[F.evo5]});
E.zet(T,[6],{titel:"Biotische en abiotische factoren",
  html:`<p>Alles wat invloed heeft op een organisme noem je een <b>milieufactor</b>.</p><ul><li><b>Abiotisch</b> = niet-levend: temperatuur, licht, wind, neerslag, vochtigheid, zoutgehalte, bodemsoort.</li><li><b>Biotisch</b> = levend: voedsel, predatoren, ziekteverwekkers, concurrenten, soortgenoten.</li></ul><p>Bij ‘licht toe hoe’ noem je niet alleen de factor, maar ook <b>het gevolg</b> voor het organisme.</p>`,
  films:[F.eco2]});
E.zet(T,[7],{titel:"Geslachtsbepaling en chromosomen",
  html:`<p>Het geslacht ligt vast in de <b>geslachtschromosomen</b>. Bij de mens heeft een vrouw XX en een man XY. (Bij vogels is het andersom geregeld: daar heten ze Z en W, en is het vrouwtje ZW.)</p><p>Elke lichaamscel met een kern bevat alle chromosomen. Uit een klein stukje weefsel kun je dus het DNA halen. In een <b>karyogram</b> worden de chromosomen van een cel op volgorde gelegd, zodat je ook de geslachtschromosomen ziet.</p>`,
  films:[F.erf1]});
E.zet(T,[8],{titel:"Een meetmethode beoordelen",
  html:`<p>Wil je met één meting twee groepen uit elkaar houden (bijvoorbeeld twee soorten, of gezond en ziek), dan kijk je naar de <b>spreiding</b> van de meetwaarden per groep, niet alleen naar het gemiddelde.</p><p>Zitten de waarden van de twee groepen deels in hetzelfde gebied, dan heet dat <b>overlap</b>. Een individu met een waarde in dat gebied kun je niet zeker indelen. Hoe kleiner de overlap, hoe betrouwbaarder de methode voor het indelen.</p>`,
  films:[F.onderz]});
E.zet(T,[9],{titel:"Een biologisch argument",
  html:`<p>Bij keuzes in natuurbeheer (welke soort beschermen we, waar grijpen we in?) gebruik je <b>biologische argumenten</b>: argumenten over de soorten en het ecosysteem zelf. Bijvoorbeeld de grootte van een populatie, hoe zeldzaam een soort is, waar een soort van afhankelijk is (voedsel, nestplaats) en welke rol hij heeft in het voedselweb.</p><p>Argumenten over geld, mooi of lelijk, of toerisme zijn niet biologisch.</p>`,
  films:[F.eco4]});
E.zet(T,[10],{titel:"Vormen van symbiose",
  html:`<p>Bij <b>symbiose</b> leven twee soorten nauw samen. Wat ze eraan hebben, bepaalt de naam:</p><ul><li><b>mutualisme</b>: beide hebben voordeel (bloem en bij);</li><li><b>commensalisme</b>: de ene heeft voordeel, de andere geen voordeel en geen nadeel (seepokken op een walvis);</li><li><b>parasitisme</b>: de ene heeft voordeel, de andere nadeel (lintworm in de darm).</li></ul>`,
  films:[F.eco3]});

/* ===== opgave 2 ===== */
E.zet(T,[11],{titel:"X-chromosomale overerving herkennen",
  html:`<p>Een gen op het X-chromosoom erft anders over dan een gen op een autosoom, omdat een man maar één X heeft (XY) en een vrouw twee (XX).</p><ul><li>Een man geeft zijn <b>X aan al zijn dochters</b> en zijn Y aan al zijn zonen.</li><li>Een zoon krijgt zijn X dus altijd van zijn moeder.</li><li>Bij een man komt elk allel op zijn X tot uiting, ook een recessief allel, want er staat geen tweede allel naast.</li></ul><p>Tip: neem aan dat iets X-chromosomaal overerft, vul genotypen in en kijk of je ergens vastloopt.</p>`,
  films:[F.erf5,F.erf6]});
E.zet(T,[12],{titel:"De vaste bloedbestanddelen",
  html:`<ul><li><b>Rode bloedcellen</b>: schijfvormig, zonder kern, vol hemoglobine. Ze vervoeren zuurstof naar de weefsels.</li><li><b>Witte bloedcellen</b>: groter en met een kern (vaak gelobd). Ze zorgen voor de afweer tegen ziekteverwekkers.</li><li><b>Bloedplaatjes</b>: heel kleine stukjes cel zonder kern. Ze zijn nodig voor de bloedstolling.</li></ul><p>In een gekleurd bloeduitstrijkje zie je vooral veel rode bloedcellen, af en toe een witte bloedcel met een donkere kern, en kleine stipjes ertussen.</p>`,
  films:[F.bloed]});
E.zet(T,[13],{titel:"Bloedgroepen en transfusie",
  html:`<p>Op rode bloedcellen kunnen antigenen zitten: <b>A</b>, <b>B</b> en het <b>resusantigeen</b> (D). In het plasma zitten antistoffen tegen de AB0-antigenen die je zelf niet hebt: bloedgroep A heeft anti-B, bloedgroep B heeft anti-A, 0 heeft beide, AB geen van beide.</p><p>Bij een transfusie van rode bloedcellen gaat het erom of de <b>antigenen van de donorcellen</b> worden herkend door de afweer van de ontvanger. Een donorcel met een antigeen dat de ontvanger zelf niet heeft, kan worden aangevallen. Antigenen die de ontvanger zelf ook heeft, zijn geen probleem.</p>`,
  films:[F.afw4]});
E.zet(T,[14],{titel:"De grote bloedvaten bij het hart",
  html:`<ul><li><b>Bovenste holle ader</b>: bloed uit hoofd, armen en bovenlichaam → rechterboezem.</li><li><b>Onderste holle ader</b>: bloed uit het onderlichaam → rechterboezem.</li><li><b>Longslagader</b>: rechterkamer → longen.</li><li><b>Longaders</b>: longen → linkerboezem.</li><li><b>Aorta</b>: linkerkamer → lichaam.</li></ul><p>Slagaders voeren bloed van het hart af en hebben een hoge druk; aders voeren bloed naar het hart toe en hebben een lage druk. Een infuus prik je daarom in een ader.</p>`,
  films:[F.pomp]});
E.zet(T,[15],{titel:"Stamcellen, differentiatie en genexpressie",
  html:`<p>Een <b>stamcel</b> kan delen en kan uitgroeien tot verschillende celtypen. Het specialiseren van een cel tot een bepaald type (met een eigen vorm en functie) heet <b>differentiatie</b>.</p><p>Alle lichaamscellen hebben hetzelfde DNA. Ze verschillen doordat in elk celtype <b>andere genen aan en uit</b> staan. Het aflezen van een gen tot een eiwit heet <b>genexpressie</b>.</p><p>Niet verwarren: een <b>mutatie</b> is een verandering in het DNA, <b>recombinatie</b> is het ontstaan van nieuwe combinaties van allelen bij de meiose, en <b>adaptatie</b> is een erfelijke aanpassing van een soort aan zijn omgeving.</p>`,
  films:[F.stam,F.dna6]});
E.zet(T,[16],{titel:"Aangeboren en verworven afweer",
  html:`<ul><li><b>Aangeboren (niet-specifieke) afweer</b>: werkt tegen alles wat lichaamsvreemd is, meteen en steeds op dezelfde manier. Bijvoorbeeld huid, slijm, fagocyten en ontstekingsreacties.</li><li><b>Verworven (specifieke) afweer</b>: gericht tegen één bepaald antigeen; komt langzamer op gang en heeft een geheugen. Dit doen de <b>lymfocyten</b>.</li></ul><p>Er zijn twee soorten lymfocyten: <b>B-lymfocyten</b> worden plasmacellen die antistoffen maken; <b>T-lymfocyten</b> sturen de afweer (T-helpercellen) of doden zelf cellen met een afwijkend antigeen (T-killercellen). Membraaneiwitten (HLA) bepalen of een cel als ‘eigen’ wordt herkend.</p>`,
  films:[F.afw3,F.afw2]});
E.zet(T,[17],{titel:"Waar bloedcellen worden gemaakt",
  html:`<p>Bloedcellen leven maar kort (een rode bloedcel ongeveer 120 dagen). Daarom worden er voortdurend nieuwe gemaakt uit <b>bloedstamcellen</b>. Bij mensen na de geboorte gebeurt dat in het <b>rode beenmerg</b>, het sponsachtige weefsel in onder andere borstbeen, ribben, wervels en bekken. Lymfocyten rijpen deels verder in de thymus en de lymfeknopen.</p>`,
  films:[F.bloed,F.stam]});

/* ===== opgave 3 ===== */
function gas(i){const licht=i===0;let g=`<rect x="0" y="0" width="520" height="200" fill="${licht?"var(--goud-soft)":"var(--surface2)"}"/><text class="lbl" x="20" y="28">${licht?"overdag: fotosynthese én verbranding":"'s nachts: alleen verbranding"}</text>`;
  g+=`<ellipse cx="260" cy="120" rx="90" ry="38" fill="var(--groen)" opacity=".35" stroke="var(--groen)"/><text class="lbl" x="260" y="125" text-anchor="middle">plant</text>`;
  g+=`<text class="lbl" x="60" y="80">fotosynthese ${licht?"✓":"✗"}</text><text class="lbl" x="350" y="80">verbranding ✓</text>`;
  g+=`<text class="lblm" x="20" y="185">${licht?"Fotosynthese gaat veel sneller dan verbranding.":"Zonder licht stopt de fotosynthese."}</text>`;return E.svg("0 0 520 200",g,"Fotosynthese en verbranding in licht en donker");}
E.zet(T,[18],{titel:"Fotosynthese en verbranding",
  html:`<p><b>Fotosynthese</b> (alleen in het licht, in de bladgroenkorrels): koolstofdioxide + water → glucose + zuurstof.<br><b>Verbranding</b> (dissimilatie, dag en nacht, in de mitochondriën): glucose + zuurstof → koolstofdioxide + water + energie.</p><p>Een plant doet beide tegelijk. Welk gas hij <b>netto</b> opneemt (opname min afgifte), hangt af van welk proces sneller gaat.</p>`,
  anim:anim(caps(["In het licht lopen beide processen.","In het donker loopt alleen de verbranding."]),gas),
  films:[F.groen,F.adem2]});
E.zet(T,[19],{titel:"Geslachtelijke en ongeslachtelijke voortplanting",
  html:`<ul><li><b>Ongeslachtelijk</b>: één ouder, nieuwe cellen ontstaan door <b>mitose</b>. De nakomelingen hebben precies hetzelfde DNA als de ouder (een kloon). Voorbeelden: stekken, uitlopers, knollen.</li><li><b>Geslachtelijk</b>: geslachtscellen ontstaan door <b>meiose</b> en versmelten bij de bevruchting. Bij de meiose worden chromosomen opnieuw verdeeld en uitgewisseld (<b>recombinatie</b>), dus elke nakomeling is genetisch uniek.</li></ul>`,
  films:[F.celdel]});
E.zet(T,[20],{titel:"Zuurstof in het water",
  html:`<p>Zuurstof komt in water vooral via <b>fotosynthese</b> van waterplanten en algen, en een beetje via het oppervlak uit de lucht. Zuurstof wordt verbruikt door alles wat aan <b>verbranding</b> doet: dieren, planten en bacteriën.</p><p>Bij de afbraak van dood organisch materiaal verbruiken <b>aerobe bacteriën</b> veel zuurstof. Hoe meer dood materiaal, hoe meer bacteriën en hoe meer zuurstofverbruik. Planten onder water hebben licht nodig om te overleven.</p>`,
  films:[F.eco4]});
E.zet(T,[21],{titel:"Welke elementen zitten in welke stoffen?",
  html:`<ul><li><b>Koolhydraten</b> (glucose, zetmeel, cellulose): C, H en O.</li><li><b>Vetten</b>: C, H en O.</li><li><b>Eiwitten</b> (aminozuren): C, H, O, <b>N</b> en soms S.</li><li><b>Nucleïnezuren</b> (DNA, RNA): C, H, O, <b>N</b> en P. Elke nucleotide bevat een suiker, een fosfaatgroep en een stikstofbase.</li></ul><p>Van andere stoffen kun je de structuurformule opzoeken in je informatieboek en tellen welke atomen erin zitten.</p>`,
  films:[F.voed1,F.dna1]});
E.zet(T,[22],{titel:"Beperkende factoren",
  html:`<p>Groei en fotosynthese hangen af van meerdere abiotische factoren tegelijk, bijvoorbeeld de CO<sub>2</sub>-concentratie en de hoeveelheid mineralen. De factor die het minst gunstig is, bepaalt hoe snel het gaat: de <b>beperkende factor</b>. Verbeter je een andere factor, dan verandert de snelheid niet.</p>`,
  films:[F.groen]});
E.zet(T,[23],{titel:"Energie in de voedselketen",
  html:`<p>Energie komt een voedselketen binnen via de fotosynthese van producenten en wordt als chemische energie in organische stoffen doorgegeven van schakel naar schakel. Bij elke stap komt maar een klein deel (vaak rond de 10%) van de energie bij de volgende schakel terecht. Energie gaat niet rond zoals stoffen: wat de keten verlaat, komt niet terug.</p><p>Daarom is een korte voedselketen efficiënter: plantaardig eiwit direct eten kost minder land en energie dan het via vee eten.</p>`,
  films:[F.eco5]});
E.zet(T,[24],{titel:"Essentiële en niet-essentiële aminozuren",
  html:`<p>Eiwitten zijn opgebouwd uit 20 soorten aminozuren. Je lichaam breekt eiwitten uit voedsel af tot aminozuren, neemt die op in het bloed en bouwt er eigen eiwitten van.</p><p>Een deel van de aminozuren kan je lichaam zelf maken uit andere stoffen: de <b>niet-essentiële</b> aminozuren. Negen aminozuren kan het niet zelf maken: de <b>essentiële</b> aminozuren. Die moet je uit je voeding halen.</p>`,
  films:[F.voed1,F.voed3]});
E.zet(T,[25],{titel:"Ecologisch duurzaam voedsel produceren",
  html:`<p><b>Ecologisch duurzaam</b> betekent: zo produceren dat het milieu en de natuur er (op lange termijn) zo weinig mogelijk last van hebben. Denk aan:</p><ul><li>weinig gebruik van grondstoffen, water en fossiele brandstof;</li><li>weinig uitstoot naar lucht, bodem en water (meststoffen, stikstof, CO<sub>2</sub>);</li><li>weinig bestrijdingsmiddelen;</li><li>weinig ruimtegebruik, zodat er plek blijft voor natuur.</li></ul>`,
  films:[F.eco6]});

/* ===== opgave 4 ===== */
E.zet(T,[26],{titel:"Ademhaling en de ademprikkel",
  html:`<p>Longvolumes: bij een gewone ademhaling ververs je het <b>ademvolume</b>. Na maximaal uitademen blijft er altijd lucht in de longen achter: het <b>restvolume</b>. Dat hangt af van de bouw van de longen en de borstkas.</p><p>Het <b>ademcentrum</b> in de hersenstam regelt hoe snel en diep je ademt. Het reageert vooral op de <b>CO<sub>2</sub>-concentratie</b> (en daarmee de pH) van het bloed: stijgt die, dan krijg je een sterke ademprikkel. Op een lage O<sub>2</sub>-concentratie reageert het veel minder sterk.</p><p>De hersenen hebben voortdurend zuurstof nodig.</p>`,
  films:[F.gas1]});
E.zet(T,[27],{titel:"Indeling van het zenuwstelsel",
  html:`<ul><li><b>Animaal zenuwstelsel</b>: stuurt de skeletspieren aan en verwerkt bewuste waarnemingen. Je kunt het bewust beïnvloeden.</li><li><b>Autonoom zenuwstelsel</b>: regelt organen, klieren en gladde spieren zonder dat je het wilt. Het heeft twee delen die elkaar tegenwerken:<ul><li><b>orthosympathisch</b>: actie, ‘vechten of vluchten’ (hartslag omhoog, pupillen wijd, vertering geremd);</li><li><b>parasympathisch</b>: rust en herstel (hartslag omlaag, vertering gestimuleerd).</li></ul></li></ul>`,
  films:[F.zen2,F.hor4]});
E.zet(T,[28,29],{titel:"Rode bloedcellen: zuurstof, levensduur en afbraak",
  html:`<p>Rode bloedcellen zijn gevuld met een ijzerhoudend eiwit dat zuurstof bindt in de longen en weer afgeeft in de weefsels. Dat eiwit geeft het bloed ook zijn rode kleur.</p><p>Een rode bloedcel leeft ongeveer 120 dagen. Oude rode bloedcellen worden opgeruimd en afgebroken. Het ijzer wordt hergebruikt voor nieuwe rode bloedcellen; de rest van de rode kleurstof wordt omgezet en verlaat het lichaam.</p>`,
  films:[F.bloed,F.voed5]});
E.zet(T,[30],{titel:"Hetzelfde DNA in alle cellen",
  html:`<p>Je bent ontstaan uit één bevruchte eicel. Alle andere cellen zijn daaruit door <b>mitose</b> ontstaan, en bij elke mitose wordt het DNA precies gekopieerd. Elke lichaamscel met een kern heeft daarom hetzelfde DNA (op toevallige mutaties na).</p><p>Cellen verschillen doordat er andere genen <b>aan en uit</b> staan, niet doordat ze ander DNA hebben.</p>`,
  films:[F.dna6,F.dna1]});
E.zet(T,[31],{titel:"Waar liggen de organen in de buik?",
  html:`<p>De buikholte wordt verdeeld in vier kwadranten (rechtsboven, linksboven, rechtsonder, linksonder), gezien vanuit de persoon zelf.</p><ul><li><b>Rechtsboven</b>: lever en galblaas.</li><li><b>Linksboven</b>: maag en een deel van de alvleesklier.</li><li><b>Rechtsonder</b>: blinde darm met wormvormig aanhangsel.</li><li><b>Midden onder</b>: dunne darm en blaas.</li></ul><p>Let op bij een tekening in vooraanzicht: de linkerkant van de persoon staat dan rechts op het papier.</p>`,
  films:[F.voed5]});
E.zet(T,[32],{titel:"Erfelijk of door het milieu?",
  html:`<p>Een eigenschap kan komen door je genen, door het milieu (wat je doet en meemaakt), of door allebei. Om dat uit te zoeken, vergelijk je groepen die in <b>maar één ding</b> verschillen.</p><ul><li>Verschillen de groepen in genen én in leefwijze, dan weet je niet welke van de twee het verschil veroorzaakt.</li><li>Houd je de leefwijze gelijk en verschillen alleen de genen, dan wijst een verschil op erfelijkheid.</li><li>Houd je de genen gelijk en verschilt alleen de leefwijze, dan wijst een verschil op het milieu.</li></ul>`,
  films:[F.onderz,F.kun]});
E.zet(T,[33],{titel:"Autosomaal, intermediair en meerdere genen",
  html:`<p>Mensen hebben 22 paar <b>autosomen</b> (genummerd 1 tot en met 22) en één paar geslachtschromosomen (X en Y). Een gen op een autosoom erft autosomaal over.</p><p>Bij <b>dominant-recessief</b> heeft de heterozygoot hetzelfde fenotype als de dominante homozygoot. Bij <b>intermediaire</b> overerving ligt het fenotype van de heterozygoot <b>tussen</b> dat van de twee homozygoten.</p><p>Veel eigenschappen, zoals lengte, worden beïnvloed door <b>meerdere genen én door het milieu</b>.</p>`,
  films:[F.erf3,F.erf1]});
E.zet(T,[34],{titel:"Evolutie door natuurlijke selectie",
  html:`<p>Natuurlijke selectie verloopt altijd in dezelfde stappen:</p><ol style="margin:0;padding-left:20px"><li>Binnen een populatie is er <b>erfelijke variatie</b>, ontstaan door mutaties en recombinatie.</li><li>In een bepaalde omgeving geven sommige varianten een <b>voordeel</b> (beter voedsel vinden, beter overleven).</li><li>Die individuen krijgen gemiddeld <b>meer nakomelingen</b>: ze hebben een hogere <b>fitness</b>.</li><li>Hun allelen komen in de volgende generaties <b>vaker</b> voor.</li></ol><p>Let op: een eigenschap die je tijdens je leven verwerft (een gespierd lichaam door trainen) is niet erfelijk en telt niet mee voor evolutie.</p>`,
  films:[F.evo2]});

/* ===== opgave 5 ===== */
E.zet(T,[35],{titel:"Bescherming van de luchtwegen",
  html:`<p>Ingeademde lucht gaat via neus, keel en luchtpijp naar de bronchiën en de longblaasjes. Onderweg wordt de lucht verwarmd, bevochtigd en gezuiverd.</p><p>De luchtpijp en de bronchiën zijn bekleed met <b>trilhaarepitheel</b>: een dekweefsel met <b>slijmbekercellen</b> en <b>trilhaarcellen</b>. Op die cellen ligt een laagje slijm, en de trilharen slaan steeds in dezelfde richting. Roken verlamt de trilharen.</p>`,
  films:[F.gas1]});
E.zet(T,[36],{titel:"Bouw van verschillende soorten cellen",
  html:`<div class="tablewrap"><table class="data"><tr><th>onderdeel</th><th>dier</th><th>plant</th><th>bacterie</th></tr><tr><td>celkern</td><td>✓</td><td>✓</td><td>✗</td></tr><tr><td>celwand</td><td>✗</td><td>✓ (cellulose)</td><td>✓</td></tr><tr><td>bladgroenkorrels</td><td>✗</td><td>✓</td><td>✗</td></tr><tr><td>grote vacuole</td><td>✗</td><td>✓</td><td>✗</td></tr></table></div><p>Schimmels zijn eukaryoten, maar geen planten en geen dieren. Ze zijn <b>heterotroof</b>: ze nemen organische stoffen op uit hun omgeving. Zoek de bouw van een schimmelcel op in je informatieboek.</p>`,
  films:[F.org,F.microben]});
E.zet(T,[37],{titel:"De hersenschors in kaart",
  html:`<p>De grote hersenen bestaan uit een linker- en een rechterhelft. De zenuwbanen <b>kruisen</b>: de linkerhelft stuurt de rechterkant van het lichaam aan, en omgekeerd.</p><p>De schors heeft gebieden met een eigen taak. Van voor naar achter: het voorhoofdsgebied (plannen), dan de <b>motorische schors</b> (aansturen van spieren), direct daarachter de <b>sensorische schors</b> (gevoel), en helemaal achterin het gezichtscentrum. Motorische en sensorische schors liggen als een band over de bovenkant van de hersenen, ongeveer halverwege voor en achter.</p>`,
  films:[F.zen5]});
E.zet(T,[38],{titel:"Enzymen en remmers in een schema",
  html:`<p>Een <b>enzym</b> versnelt een omzetting van een stof (substraat) in een product, zonder zelf verbruikt te worden. In een schema zet je de omzetting als horizontale pijl van substraat naar product, en het enzym erbij met een pijl naar die omzetting: het enzym werkt <b>stimulerend (+)</b>.</p><p>Een <b>remmer</b> (veel medicijnen en gifstoffen) bindt aan een enzym, waardoor het minder of niet meer werkt. Die pijl geef je aan met <b>–</b>. Let goed op wát een stof remt of stimuleert: het enzym, of de omzetting.</p>`,
  films:[F.voed3]});
E.zet(T,[39],{titel:"De codontabel gebruiken",
  html:`<p>Een <b>codon</b> is een groep van drie basen op het mRNA. Elk codon codeert voor één aminozuur (of een stopsignaal). De meeste aminozuren hebben meerdere codons.</p><p>Bij een <b>puntmutatie</b> is één base vervangen door een andere. Om te vinden welke base veranderd is, zoek je in de codontabel alle codons van het oude en het nieuwe aminozuur op, en zoek je een paar dat in maar <b>één base</b> verschilt.</p>`,
  films:[F.dna4,F.dna5]});
E.zet(T,[40],{titel:"Hoe mutaties ontstaan",
  html:`<p>Mutaties ontstaan door kopieerfouten bij de DNA-replicatie of door schade (straling, bepaalde stoffen). Ze zijn <b>toevallig</b>: ze ontstaan op willekeurige plekken in het DNA, en niet omdat een organisme ze ‘nodig heeft’.</p><p>Als een mutatie toevallig een voordeel geeft (bijvoorbeeld resistentie tegen een middel), kan <b>selectie</b> ervoor zorgen dat die variant zich daarna verspreidt.</p>`,
  films:[F.dna5,F.evo2]});
E.zet(T,[41],{titel:"Producenten, consumenten en reducenten",
  html:`<ul><li><b>Producenten</b> (groene planten, algen) maken met fotosynthese organische stoffen uit anorganische stoffen.</li><li><b>Consumenten</b> (dieren) eten organische stoffen van andere organismen.</li><li><b>Reducenten</b> (veel bacteriën en schimmels) breken dood organisch materiaal en uitwerpselen af tot anorganische stoffen: CO<sub>2</sub>, water en mineralen.</li></ul><p>Zo gaan stoffen in een kringloop rond.</p>`,
  films:[F.eco4,F.eco6]});
E.zet(T,[42],{titel:"Enzymen die koolhydraten afbreken",
  html:`<p>Enzymen zijn <b>specifiek</b>: elk enzym werkt op één soort substraat. De naam eindigt vaak op -ase en verwijst naar het substraat. Een paar voorbeelden:</p><ul><li><b>amylase</b> (in speeksel en alvleessap) knipt een plantaardig reservekoolhydraat in maltose;</li><li><b>cellulase</b> (bij bacteriën en schimmels) breekt het koolhydraat van de celwand af;</li><li><b>lactase</b> breekt melksuiker af.</li></ul>`,
  films:[F.voed3]});
E.zet(T,[43],{titel:"Hoe een niereenheid werkt",
  html:`<ol style="margin:0;padding-left:20px"><li><b>Filtratie</b>: in de <b>glomerulus</b> wordt bloedplasma met alle kleine opgeloste stoffen (water, glucose, zouten, ureum) naar buiten geperst en opgevangen in het <b>kapsel van Bowman</b>: de voorurine. Bloedcellen en grote eiwitten blijven in het bloed.</li><li><b>Terugresorptie</b>: in het <b>nierbuisje</b> worden nuttige stoffen (glucose, het grootste deel van het water en de ionen) teruggenomen naar het bloed in de haarvaten eromheen.</li><li>Wat overblijft, is urine.</li></ol>`,
  films:[F.gas3]});

/* ===== opgave 6 ===== */
E.zet(T,[44],{titel:"Van zintuig naar hersenen",
  html:`<p>Een <b>zintuigcel</b> zet een prikkel om in een signaal. Via sensorische zenuwcellen gaan impulsen naar het centrale zenuwstelsel.</p><ul><li><b>Hersenstam</b>: onbewuste processen en reflexen (ademhaling, hartslag).</li><li><b>Kleine hersenen</b>: coördinatie van bewegingen, evenwicht.</li><li><b>Grote hersenen</b>, met de hersenschors: bewuste processen. De schors heeft gebieden die prikkels uit zintuigen verwerken en gebieden die spieren aansturen.</li></ul>`,
  films:[F.zen8,F.zen5]});
E.zet(T,[45],{titel:"Prikkel, impuls en synaps",
  html:`<p>Een <b>prikkel</b> is een invloed uit de omgeving die een zintuigcel waarneemt (licht, geluid, een smaakstof). Een <b>impuls</b> is het elektrische signaal dat door een zenuwcel loopt.</p><p>Tussen twee cellen zit een <b>synaps</b>. De zendende cel geeft daar <b>neurotransmitters</b> af uit blaasjes. Stoffen die een cel naar buiten afgeeft doordat een blaasje met het celmembraan versmelt: <b>exocytose</b>. Stoffen die een cel naar binnen opneemt doordat het membraan een blaasje vormt: <b>endocytose</b>. <b>Hormonen</b> worden door klieren aan het bloed afgegeven.</p>`,
  films:[F.zen3,F.zen8]});
E.zet(T,[46],{titel:"De stappen van een onderzoek",
  html:`<ol style="margin:0;padding-left:20px"><li><b>Waarneming en voorkennis</b>: wat weet je al, wat valt op?</li><li><b>Onderzoeksvraag</b>.</li><li><b>Hypothese</b>: een verwacht antwoord op de onderzoeksvraag, opgesteld vóór het onderzoek en daarna getoetst.</li><li><b>Experiment</b> en <b>resultaten</b>: wat meet of ziet de onderzoeker?</li><li><b>Conclusie</b>: wat leid je uit de resultaten af? Klopt de hypothese?</li></ol>`,
  films:[F.onderz]});
E.zet(T,[47,48],{titel:"Drempelwaarde en controle in een smaakproef",
  html:`<p>De <b>drempelwaarde</b> is de laagste sterkte (hier: concentratie) van een prikkel waarbij een zintuigcel reageert en je de prikkel waarneemt. Onder de drempelwaarde neem je niets waar, erboven wel.</p><p>In een proef wil je weten of de uitkomst echt door de onderzochte factor komt. Daarom voeg je <b>controles</b> toe: proeven waarvan je de uitkomst al weet, zodat je kunt nagaan of de proef en de proefpersonen werken zoals je denkt. Een controle verschilt maar in één ding van de proef.</p>`,
  films:[F.onderz,F.zen8]});
})();
