/* Uitleg van de stof bij oefenexamen vwo 2023-I (tool vwo23-1). Gebouwd in hw/vwo23-1/stof.js, gekopieerd naar tools/examen-stof/vwo23-1.js. */
(function(){
"use strict";
const E=window.EXSTOF;if(!E)return;const T="vwo23-1";
const SV=(vb,inner,lab)=>E.svg(vb,inner,lab);
const pijl=(id,kl)=>`<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${kl}"/></marker>`;
const DEFS=`<defs>${pijl("s23x","var(--text2)")}${pijl("s23g","var(--goud)")}${pijl("s23t","var(--teal)")}${pijl("s23k","var(--koraal)")}</defs>`;
const doos=(x,y,w,t,kl,h)=>`<rect x="${x}" y="${y}" width="${w}" height="${h||38}" rx="9" fill="var(--surface)" stroke="${kl||"var(--line2)"}" stroke-width="1.6"/><text class="lbl" x="${x+w/2}" y="${y+(h||38)/2+5}" text-anchor="middle">${t}</text>`;
const lijn=(x1,y1,x2,y2,m)=>`<path d="M${x1},${y1} L${x2},${y2}" stroke="var(--text2)" stroke-width="1.8" marker-end="url(#${m||"s23x"})"/>`;

/* ============ opgave 1: Elfstedentocht ============ */
E.zet(T,[1],{titel:"Organisatieniveaus",
  html:`<p>Een organisme is op verschillende <b>niveaus</b> te bekijken. Van klein naar groot:</p>
  <ul><li><b>molecuul</b> (bv. hemoglobine) → <b>cel</b> (rode bloedcel) → <b>weefsel</b> (bloed, spierweefsel) → <b>orgaan</b> (hart, long) → <b>orgaanstelsel</b> (bloedvatenstelsel) → <b>organisme</b>.</li></ul>
  <p>Daarboven gaat het verder met populatie, levensgemeenschap, ecosysteem en biosfeer.</p>
  <p>Bij een vraag over een niveau let je dus op <i>waar je naar kijkt</i>: een verandering in de samenstelling van het bloed is weefselniveau, een verandering van het hart of de long is orgaanniveau.</p>`,
  films:[["Van molecuul tot biosfeer","films/cellen/van-molecuul-tot-biosfeer.html"]]});

E.zet(T,[2],{titel:"De wet van Fick",
  html:`<p>Diffusie is het verplaatsen van moleculen van hoge naar lage concentratie. Hoe snel dat gaat, beschrijft de <b>wet van Fick</b>:</p>
  <p style="text-align:center"><b>diffusiesnelheid = <i>k</i> · <i>A</i> · Δ<i>C</i> / Δ<i>x</i></b></p>
  <ul><li><b><i>A</i></b> = het oppervlak waarover gediffundeerd wordt. Groter oppervlak, snellere diffusie.</li>
  <li><b>Δ<i>C</i></b> = het concentratieverschil. Groter verschil, snellere diffusie.</li>
  <li><b>Δ<i>x</i></b> = de afstand waarover gediffundeerd moet worden. Kortere afstand, snellere diffusie.</li>
  <li><b><i>k</i></b> = een constante die bij de stof en het membraan hoort.</li></ul>
  <p>In het lichaam zie je dit overal terug: longblaasjes en darmvlokken vergroten <i>A</i>, een dunne wand verkleint Δ<i>x</i>, en doorstroming houdt Δ<i>C</i> groot.</p>`,
  films:[["Adem in, adem uit","films/gaswisseling/1-adem-in-adem-uit.html"],["Gas op reis","films/gaswisseling/2-gas-op-reis.html"]]});

E.zet(T,[3,4],{titel:"Dissimilatie: aeroob en anaeroob",
  html:`<p>Cellen maken ATP door glucose af te breken. Dat gaat in drie stappen:</p>
  <ul><li><b>Glycolyse</b> (cytoplasma, geen zuurstof nodig): glucose → 2 pyrodruivenzuur, met een kleine opbrengst ATP.</li>
  <li><b>Citroenzuurcyclus</b> (mitochondriënmatrix): pyrodruivenzuur wordt verder afgebroken; er komen NADH en FADH₂ vrij.</li>
  <li><b>Oxidatieve fosforylering</b> (binnenmembraan mitochondrion): NADH en FADH₂ geven hun elektronen af aan de ademhalingsketen. Zuurstof is de laatste acceptor. Hier ontstaat verreweg het meeste ATP.</li></ul>
  <p>Is er te weinig zuurstof, dan stokt stap 3 en daarmee ook stap 2. De glycolyse gaat wel door, maar dan moet het pyrodruivenzuur ergens heen: in spiercellen wordt het omgezet in <b>melkzuur</b> (melkzuurgisting). Zo komt NAD⁺ weer vrij en kan de glycolyse doorgaan.</p>
  <p>Spiervezels verschillen hierin: <b>type I</b> (rood, veel mitochondriën en myoglobine) is gemaakt voor lange, aerobe inspanning; <b>type II</b> (wit) voor korte, krachtige inspanning.</p>`,
  films:[["Alles op adem: dissimilatie","films/stofwisseling/2-alles-op-adem.html"],["Spieren en beweging","films/zenuwstelsel/9-spieren-en-beweging.html"]]});

E.zet(T,[5],{titel:"Vertering en opname van vet en koolhydraten",
  html:`<p><b>Zetmeel</b> wordt al in de <b>mond</b> aangepakt door speekselamylase, later in de dunne darm door alvleesklieramylase. Amylase maakt er maltose van, en maltase (darmsap) maakt daar glucose van: dus minstens <b>twee</b> verschillende enzymen.</p>
  <p><b>Triglyceriden (vetten)</b> worden pas in de <b>dunne darm</b> verteerd. Gal emulgeert het vet (geen enzym) en <b>lipase</b> knipt het in vetzuren en glycerol of monoglyceriden.</p>
  <p>De opname verschilt ook. Glucose en aminozuren gaan via de haarvaten van de darmvlok naar de <b>poortader</b> en dus eerst langs de lever. Vetzuren en monoglyceriden worden in de darmepitheelcellen weer <b>triglyceriden</b> en gaan als vetdruppeltjes de <b>lymfevaten (chylvaten)</b> in. Via de borstbuis komen ze pas later in het bloed, zonder eerst langs de lever te gaan.</p>`,
  films:[["Knippen op maat: verteringsenzymen","films/voeding/3-knippen-op-maat.html"],["Van darm naar bloed","films/voeding/4-van-darm-naar-bloed.html"]]});

E.zet(T,[6],{titel:"Animaal en autonoom zenuwstelsel",
  html:`<p>Het <b>animale</b> (willekeurige) zenuwstelsel stuurt de <b>skeletspieren</b> aan. Je kunt die bewegingen (meestal) bewust sturen, zoals lopen, zwemmen en praten. Ook rillen loopt via dit systeem, al gebeurt dat onbewust.</p>
  <p>Het <b>autonome</b> (onwillekeurige) zenuwstelsel stuurt <b>gladde spieren</b>, de <b>hartspier</b> en <b>klieren</b>: de darmwand, de bloedvaten, de zweetklieren, de hartslag. Het bestaat uit de orthosympathicus (actie) en de parasympathicus (rust).</p>
  <p>Bij de temperatuurregeling werken beide systemen samen. Ga bij een proces dus na welk soort spier of klier het uitvoert: dat bepaalt onder welk systeem het valt.</p>`,
  films:[["Het kabelnetwerk: het zenuwstelsel","films/zenuwstelsel/2-het-kabelnetwerk.html"]]});

E.zet(T,[7],{titel:"Filtratie in de haarvaten",
  html:`<p>In een haarvat heerst <b>bloeddruk</b>. Aan het begin van het haarvat is die druk hoger dan de zuigende werking van de eiwitten in het plasma, zodat er vocht uit het haarvat de weefsels in wordt geperst: <b>filtratie</b>. Zo ontstaat weefselvloeistof.</p>
  <p>Aan het eind van het haarvat is de bloeddruk gedaald en overheerst de zuigkracht van de plasma-eiwitten: het meeste vocht stroomt weer terug (<b>resorptie</b>). De rest wordt door de lymfevaten afgevoerd.</p>
  <p>De druk in een haarvat hangt af van de vaten eromheen. In de wand van arteriolen en venulen zit glad spierweefsel: trekt dat samen, dan vernauwt het vat. Een vernauwing <b>vóór</b> het haarvat laat minder bloed door, een vernauwing <b>erna</b> houdt het bloed juist tegen. Denk bij zo'n vraag altijd na in welke richting het bloed stroomt en wat dat met de druk in het haarvat doet.</p>`,
  anim:box=>E.stappen(box,[
    {s:0,cap:"Aan het begin van een haarvat is de bloeddruk hoog: er wordt vocht naar buiten geperst (filtratie)."},
    {s:1,cap:"Verderop is de druk gedaald. De zuigende werking van de plasma-eiwitten wint: het meeste vocht stroomt terug."},
    {s:2,cap:"Vernauwt het aanvoerende vat, dan daalt de druk in het haarvat en wordt er minder vocht naar buiten geperst."}],
    (st,s,i)=>{
      let g=DEFS+`<rect width="520" height="170" fill="var(--surface2)"/>`;
      const w=i===2?10:16;
      g+=`<path d="M20,85 L${i===2?110:70},85" stroke="var(--koraal)" stroke-width="${i===2?8:16}" stroke-linecap="round"/>`;
      g+=`<path d="M70,85 L450,85" stroke="var(--koraal)" stroke-width="${w}" opacity=".85"/>`;
      g+=`<text class="lblm" x="24" y="68">aanvoer</text><text class="lblm" x="430" y="68">afvoer</text>`;
      const n=i===2?1:3;
      if(i!==1)for(let k=0;k<n;k++)g+=`<path d="M${120+k*70},95 l-4,30" stroke="var(--teal)" stroke-width="2.4" marker-end="url(#s23t)"/>`;
      if(i>=1)for(let k=0;k<2;k++)g+=`<path d="M${330+k*60},125 l4,-30" stroke="var(--goud)" stroke-width="2.4" marker-end="url(#s23g)"/>`;
      g+=`<text class="lblm" x="120" y="150" style="fill:var(--teal)">filtratie</text>`;
      if(i>=1)g+=`<text class="lblm" x="340" y="150" style="fill:var(--goud-text)">resorptie</text>`;
      st.innerHTML=SV("0 0 520 170",g,"Haarvat met filtratie aan het begin en resorptie aan het eind");}),
  films:[["Buizen onder druk","films/transport/2-buizen-onder-druk.html"],["Weefselvloeistof en lymfe","films/transport/4-weefselvloeistof-en-lymfe.html"]]});

/* ============ opgave 2: de kip als draagmoeder ============ */
E.zet(T,[8],{titel:"Stamcellen en geslachtscellen",
  html:`<p><b>Stamcellen</b> kunnen zich blijven delen en zich daarna specialiseren (differentiëren). Hoeveel kanten ze op kunnen, verschilt: embryonale stamcellen kunnen heel veel celtypen worden, stamcellen in een volwassen lichaam meestal maar een paar.</p>
  <p>Belangrijk verschil voor erfelijkheid: alleen <b>geslachtscellen</b> (en de cellen waaruit die ontstaan) geven hun DNA door aan de volgende generatie. Een verandering in een lichaamscel verdwijnt met dat organisme; een verandering in de kiembaan erft door.</p>`,
  films:[["Zelfde DNA, andere cel: stamcellen","films/cellen/stamcellen.html"]]});

E.zet(T,[9],{titel:"Transcriptie: promotor en transcriptiefactoren",
  html:`<p>Een gen begint met een <b>promotor</b>: een stuk DNA dat zelf niet voor aminozuren codeert, maar aangeeft waar de transcriptie moet beginnen. In veel promotors zit een <b>TATA-box</b>.</p>
  <p><b>Transcriptiefactoren</b> zijn eiwitten die aan zo'n stuk DNA binden. Ze herkennen de volgorde aan de vorm en de lading van de helix, <b>niet</b> via basenparing: basenparen (A–T, C–G) vormen alleen nucleotiden met elkaar. Zodra de factoren gebonden zijn, kan RNA-polymerase aankoppelen en begint de transcriptie.</p>
  <p>Zo regelt een cel welke genen aan staan: dezelfde DNA-volgorde, andere eiwitten per celtype.</p>`,
  films:[["Van DNA naar eiwit","films/dna/3-van-dna-naar-eiwit.html"],["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"]]});

E.zet(T,[10],{titel:"Van gen naar mRNA: exons, introns en splicing",
  html:`<p>Een gen bestaat uit <b>exons</b> (komen in het mRNA terecht) en <b>introns</b> (ertussen). De transcriptie maakt eerst een <b>pre-mRNA</b> van het hele stuk, van de startplaats tot een <b>stopsignaal</b>. Daarna worden bij de <b>splicing</b> de introns eruit geknipt en de exons aan elkaar geplakt: het rijpe mRNA.</p>
  <p>Bouw je ergens in een gen een stuk DNA in met een stopsignaal, dan stopt de transcriptie dáár. Alles wat achter dat signaal ligt, komt niet meer in het mRNA. Vervangt het ingebouwde stuk een exon, dan ontbreekt dat exon natuurlijk ook.</p>
  <p>Zolang er nog exons mét introns ertussen worden overgeschreven, vindt er gewoon splicing plaats.</p>`,
  films:[["Van DNA naar eiwit","films/dna/3-van-dna-naar-eiwit.html"],["Mutaties","films/dna/5-mutaties.html"]]});

E.zet(T,[11,12],{titel:"Genconstructen, merkergenen en gel-elektroforese",
  html:`<p>Bij genetische modificatie wordt vaak een <b>genconstruct</b> ingebouwd met meer dan één gen:</p>
  <ul><li>een <b>merkergen</b>, bijvoorbeeld voor een fluorescerend eiwit: daarmee <i>zie</i> je welke cellen het construct hebben;</li>
  <li>een <b>resistentiegen</b>: daarmee kun je <i>selecteren</i>. Een cel met dit gen kan tegen een stof die andere cellen doodt.</li></ul>
  <p>Om te controleren of het construct op de juiste plaats zit, knip je het DNA met een <b>restrictie-enzym</b>. Dat enzym knipt alleen op zijn eigen herkenningsvolgorde. Verdwijnt zo'n knipplaats door de inbouw, of komt er een stuk DNA bij, dan verandert de <b>lengte</b> van een fragment.</p>
  <p>Met <b>gel-elektroforese</b> sorteer je de fragmenten op lengte: DNA is negatief geladen en loopt naar de pluspool, korte fragmenten het verst. Je vergelijkt de bandjes altijd met een <b>controle</b>: het patroon van onbehandeld DNA.</p>`,
  films:[["Op lengte gesorteerd: gel-elektroforese","films/dna-technieken/2-op-lengte-gesorteerd/index.html"],["Op maat gekopieerd: PCR","films/dna-technieken/1-op-maat-gekopieerd/index.html"]]});

E.zet(T,[13,14],{titel:"Geslachtschromosomen bij vogels",
  html:`<p>Bij de mens bepaalt de váder het geslacht: XX is een vrouw, XY een man. Bij vogels is het andersom. Daar heten de geslachtschromosomen <b>Z</b> en <b>W</b>:</p>
  <ul><li><b>mannetje: ZZ</b> (homozygoot voor het geslachtschromosoom, maakt alleen Z-gameten)</li>
  <li><b>vrouwtje: ZW</b> (maakt Z- of W-gameten, en bepaalt dus het geslacht van het kuiken)</li></ul>
  <p>Een gen op het Z-chromosoom erft daardoor anders over dan een gen op een gewoon chromosoom. Een mannetje heeft er <b>twee</b> allelen van en kan heterozygoot zijn; een vrouwtje heeft er maar <b>één</b>. Wat bij een mannetje door het andere allel wordt opgevangen, komt bij een vrouwtje meteen tot uiting.</p>
  <p>Een kruisingstabel maak je net als altijd: de gameten van de vader bovenaan, die van de moeder links, en in de vakjes de combinaties.</p>`,
  films:[["Overerving via X-chromosomen en mitochondriën","films/erfelijkheid/5-overerving-via-x-chromosomen-en-mitochondrien.html"],["Monohybride kruisingen","films/erfelijkheid/2-monohybride-kruisingen.html"]]});

E.zet(T,[15],{titel:"Soort, ras en genetische variatie",
  html:`<p>Een <b>soort</b> is een groep organismen die zich onderling kan voortplanten en vruchtbare nakomelingen krijgt. Alle kippenrassen horen bij dezelfde soort; een <b>ras</b> is een groep binnen de soort die de mens door selectie heeft gefokt en die bepaalde allelcombinaties heeft.</p>
  <p>Door eeuwen van fokken op een paar eigenschappen is de <b>genetische variatie</b> binnen de landbouw klein geworden: een paar rassen worden overal gebruikt. Zeldzame rassen dragen allelen die in die paar rassen niet meer voorkomen.</p>
  <p>Genetische variatie is een verzekering: ze maakt het mogelijk later te selecteren op nieuwe eigenschappen, bijvoorbeeld tegen een nieuwe ziekte. Daarom bewaart men zaden (zaadbanken) en, hier, bevroren cellen.</p>`,
  films:[["Toeval en uitwisseling","films/evolutie/5-toeval-en-uitwisseling.html"],["De mens als selectiefactor","films/evolutie/4-de-mens-als-selectiefactor.html"]]});

/* ============ opgave 3: koorts ============ */
E.zet(T,[16],{titel:"Celcommunicatie: signaalstof, receptor en second messenger",
  html:`<p>Cellen praten met elkaar via <b>signaalstoffen</b>. Zo'n stof past op een <b>receptor</b>: een eiwit op (of in) de ontvangende cel. De stof zelf hoeft de cel niet in.</p>
  <p>Binnen in de cel gaat het signaal verder via een <b>second messenger</b>, zoals cAMP of Ca²⁺. Dat is dus altijd een stof <i>binnen</i> de cel die het signaal doorgeeft, nooit de stof die van buiten kwam.</p>
  <p>Vaak volgt een <b>signaalcascade</b>: enzym A activeert enzym B, dat activeert er weer tien, enzovoort. Zo wordt een klein signaal flink versterkt.</p>
  <p>Let bij enzymvragen op de rollen: het <b>enzym</b> versnelt, het <b>substraat</b> is de stof die wordt omgezet, en wat eruit komt is het <b>product</b>.</p>`,
  films:[["Post voor iedereen: hormonen","films/hormonen/1-post-voor-iedereen.html"],["Alles versneld: enzymen","films/stofwisseling/1-alles-versneld.html"]]});

E.zet(T,[17],{titel:"Temperatuurregeling en de normtemperatuur",
  html:`<p>De <b>hypothalamus</b> is de thermostaat van het lichaam. Hij vergelijkt de gemeten kerntemperatuur met een <b>normtemperatuur</b> (setpoint) van ongeveer 37 °C en stuurt bij.</p>
  <p><b>Te koud</b> (kerntemperatuur onder de norm): warmte maken en vasthouden. Huidvaten vernauwen, rillen, hogere stofwisseling (onder andere door schildklierhormoon), kippenvel.</p>
  <p><b>Te warm</b>: warmte afgeven. Huidvaten verwijden (meer doorbloeding van de huid), zweten (verdampingswarmte).</p>
  <p>Bij <b>koorts</b> verandert niet de meting maar de <b>norm</b>: de hypothalamus zet het setpoint hoger of later weer lager. Het lichaam reageert dan zoals het altijd doet, namelijk op het <i>verschil</i> tussen de gemeten kerntemperatuur en die norm. Kijk in een grafiek dus eerst welke van de twee lijnen boven de andere ligt.</p>`,
  films:[["Uitscheiding en evenwicht","films/gaswisseling/3-uitscheiding-en-evenwicht.html"],["De baas van de klieren","films/hormonen/3-de-baas-van-de-klieren.html"]]});

E.zet(T,[18],{titel:"Aangeboren en verworven afweer",
  html:`<p>De <b>aangeboren (aspecifieke)</b> afweer werkt tegen elke indringer, meteen, en leert niets bij:</p>
  <ul><li>barrières: huid, slijmvliezen, maagzuur</li>
  <li>fagocyten (macrofagen, granulocyten) die alles opeten wat lichaamsvreemd is</li>
  <li>natural-killercellen, die afwijkende of geïnfecteerde cellen doden zonder een bepaald antigeen te herkennen</li>
  <li>ontstekingsreactie en koorts</li></ul>
  <p>De <b>verworven (specifieke)</b> afweer is gericht op één bepaald antigeen en heeft een geheugen:</p>
  <ul><li>B-cellen en plasmacellen die <b>antistoffen</b> maken</li>
  <li>T-helpercellen en <b>cytotoxische T-cellen</b></li>
  <li>geheugencellen, die bij een tweede besmetting veel sneller reageren</li></ul>
  <p>Kortom: herkent de cel één specifiek antigeen, dan is het verworven afweer.</p>`,
  films:[["De eerste verdediging","films/afweer/1-de-eerste-verdediging.html"],["T-cellen en virussen","films/afweer/3-t-cellen-en-virussen.html"]]});

E.zet(T,[19],{titel:"Eiwitten en temperatuur",
  html:`<p>Een eiwit werkt dankzij zijn <b>ruimtelijke structuur</b>: de keten van aminozuren vouwt zich op tot een vorm die precies past op zijn substraat of partner. Die vorm wordt vastgehouden door zwakke bindingen (waterstofbruggen, zout- en zwavelbruggen).</p>
  <p>Bij een te hoge temperatuur gaan de zwakke bindingen kapot: het eiwit <b>denatureert</b> en verliest zijn vorm. Dat is onomkeerbaar, zoals bij een gebakken ei. Enzymen werken daarna niet meer, en processen in de cel vallen stil.</p>
  <p>Ook membranen worden bij hoge temperatuur minder stabiel en er ontstaan meer schadelijke <b>zuurstofradicalen</b>, die eiwitten en DNA aantasten.</p>`,
  films:[["Alles versneld: enzymen","films/stofwisseling/1-alles-versneld.html"]]});

E.zet(T,[20],{titel:"Terugkoppeling lezen in een regelkring",
  html:`<p>In een regelkring geeft elke pijl aan wat het ene onderdeel met het volgende doet: <b>stimuleren (+)</b> of <b>remmen (−)</b>. Je leest dat telkens uit de tekst: woorden als 'verhoogt', 'zet aan' en 'activeert' betekenen +, en 'verlaagt', 'remt' en 'onderdrukt' betekenen −.</p>
  <p>Let op: een remming van een rém geeft uiteindelijk méér. Komt er minder van een remmende stof, dan stijgt de stof die werd geremd. Maar de <b>pijl</b> zelf blijft een remming; je verandert het teken niet onderweg.</p>
  <p>Een kring met in totaal een oneven aantal minnen werkt als <b>negatieve terugkoppeling</b>: de verandering wordt tegengewerkt en de waarde blijft rond de norm. Bij <b>positieve terugkoppeling</b> wordt de verandering juist versterkt.</p>`,
  films:[["Post voor iedereen: hormonen","films/hormonen/1-post-voor-iedereen.html"],["Suiker in balans","films/hormonen/2-suiker-in-balans.html"]]});

E.zet(T,[21],{titel:"Van gen naar eiwit: waar kan het geregeld worden?",
  html:`<p>De weg van gen naar eiwit heeft meerdere momenten waarop de cel kan ingrijpen:</p>
  <ol><li><b>transcriptie</b> (in de kern): DNA → pre-mRNA. Hier werken transcriptiefactoren.</li>
  <li><b>splicing</b> (in de kern): introns eruit, exons aan elkaar. Rijp mRNA gaat de kern uit.</li>
  <li><b>translatie</b> (cytoplasma, ribosoom): mRNA → aminozuurketen.</li>
  <li><b>vouwing en bewerking</b> van het eiwit (ER en golgisysteem).</li></ol>
  <p><b>micro-RNA's (miRNA's)</b> zijn korte stukjes RNA die aan een mRNA kunnen binden, zodat dat mRNA niet gebruikt wordt of wordt afgebroken: <b>RNA-interferentie</b>. Welke stap daarmee wordt geblokkeerd, leid je af uit de <b>plaats</b> in de cel waar het gebeurt: transcriptie en splicing zijn in de kern, de translatie is in het cytoplasma.</p>`,
  films:[["Van DNA naar eiwit","films/dna/3-van-dna-naar-eiwit.html"],["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"]]});

/* ============ opgave 4: sorghum ============ */
E.zet(T,[22],{titel:"Exoten en areaalverschuiving",
  html:`<p>Een <b>exoot</b> is een soort die door toedoen van de mens buiten zijn natuurlijke verspreidingsgebied terecht is gekomen: meegelift met transport, ontsnapt uit een kwekerij of bewust uitgezet. Kan zo'n soort zich hier handhaven en verdringt hij inheemse soorten, dan heet hij invasief.</p>
  <p>Schuift een soort op <b>eigen kracht</b> op, bijvoorbeeld doordat het klimaat verandert en nieuwe gebieden geschikt worden, dan is dat een <b>areaaluitbreiding</b> en geen exoot. Zo komen steeds meer zuidelijke insecten en vogels in Nederland voor.</p>
  <p>Het gaat dus niet om de afstand of de snelheid, maar om de <b>manier</b> waarop de soort er gekomen is.</p>`,
  films:[["Waar past een soort?","films/ecologie/2-waar-past-een-soort.html"],["Ingrijpen of laten gaan","films/ecologie/4-ingrijpen-of-laten-gaan.html"]]});

E.zet(T,[23],{titel:"Afweer bij planten",
  html:`<p>Ook planten verdedigen zich, maar zonder afweercellen die rondlopen:</p>
  <ul><li><b>Fysisch (mechanisch)</b>: een dichte buitenlaag met was, stevige celwanden, schors, doornen en haren. Zolang die laag heel is, komen schimmels en bacteriën er niet door.</li>
  <li><b>Chemisch</b>: giftige of bittere stoffen, en stoffen die een indringer afremmen.</li>
  <li><b>Reactie op een infectie</b>: cellen rond de infectie laten zichzelf afsterven, zodat de indringer niet verder kan.</li></ul>
  <p>Ga bij zo'n vraag na wat de aanvaller precies kapotmaakt: de buitenkant van de plant, een afweerstof, of de reactie op een infectie. Dat bepaalt welk type afweer eronder lijdt.</p>`,
  films:[["De eerste verdediging","films/afweer/1-de-eerste-verdediging.html"]]});

E.zet(T,[24],{titel:"Vormen van symbiose",
  html:`<p><b>Symbiose</b> is een langdurig samenleven van twee soorten. Je onderscheidt:</p>
  <ul><li><b>mutualisme</b>: allebei voordeel (bij-bloem, darmbacteriën-mens);</li>
  <li><b>commensalisme</b>: de een voordeel, de ander geen voor- of nadeel (zeepok op een walvis);</li>
  <li><b>parasitisme</b>: de een voordeel, de ander nadeel (teek, lintworm).</li></ul>
  <p>Bepaal dus eerst per partner of hij er beter of slechter van wordt. Let op: een derde soort die eronder lijdt (bijvoorbeeld de plant waarop beide partners leven) hoort niet bij de symbiose zelf.</p>`,
  films:[["Wie eet wie?","films/ecologie/3-wie-eet-wie.html"]]});

E.zet(T,[25],{titel:"Rekenen met gehalten en eenheden",
  html:`<p>Een <b>gehalte</b> is een deel van een geheel, dus vermenigvuldig je ermee. Let goed op de eenheden:</p>
  <ul><li>g/kg betekent gram per kilogram. 354 g/kg = 0,354 kg per kg, dus ook 0,354 ton per ton.</li>
  <li>Werk je in ton, deel dan het getal in g/kg door 1000.</li>
  <li>Een percentage deel je door 100.</li></ul>
  <p>Werk altijd <b>stap voor stap</b> en schrijf elke tussenstap op met de eenheid erbij. Bij een vraag naar 'hoeveel meer' reken je eerst beide waarden uit en trek je ze daarna van elkaar af.</p>
  <p>Een hoog versgewicht betekent niet automatisch een hoge opbrengst aan droge stof: er kan veel water in zitten.</p>`});

E.zet(T,[26],{titel:"Energiestromen: I, P, F en R",
  html:`<p>Van de energie die een consument via zijn voedsel binnenkrijgt (<b>I</b>, ingestie) gaat maar een klein deel in zijn eigen biomassa zitten:</p>
  <ul><li><b>F</b> = wat niet verteerd en geresorbeerd wordt en als <b>feces</b> het lichaam verlaat;</li>
  <li><b>R</b> = de energie die bij de <b>dissimilatie</b> als warmte verloren gaat (bewegen, warm blijven, alle processen);</li>
  <li><b>P</b> = de <b>productiviteit</b>: wat overblijft voor groei en voortplanting, bij een rund dus vlees en melk.</li></ul>
  <p>Er geldt: <b>I = P + F + R</b>. Bij de meeste dieren is R verreweg de grootste post en P maar een paar procent; daarom wordt een voedselpiramide snel smaller.</p>
  <p>Een <b>verteringscoëfficiënt</b> zegt welk deel wél wordt opgenomen. De rest is F.</p>`,
  films:[["Wie eet wie?","films/ecologie/3-wie-eet-wie.html"],["Waar blijft het blad?","films/ecologie/4-waar-blijft-het-blad.html"]]});

E.zet(T,[27,28],{titel:"Broeikasgassen en methaan uit de pens",
  html:`<p>De aarde straalt warmte uit als infraroodstraling. <b>Broeikasgassen</b> (CO₂, methaan, lachgas, waterdamp) nemen die straling op en stralen een deel terug naar het aardoppervlak. Hoe meer broeikasgas, hoe meer warmte er wordt vastgehouden. Methaan is per molecuul een veel sterker broeikasgas dan CO₂.</p>
  <p>Een <b>herkauwer</b> zoals een rund kan zelf geen cellulose verteren. In de <b>pens</b> leven micro-organismen die dat wel kunnen. Bij die afbraak van koolhydraten ontstaan onder andere CO₂ en waterstof, en <b>methaanbacteriën</b> maken daar CH₄ van. Dat boert het rund uit.</p>
  <p>Kijk in het schema van de pens dus goed welke stoffen aan het begin van de keten staan: alleen die stoffen kunnen uiteindelijk methaan opleveren.</p>`,
  films:[["Koolstof gaat rond","films/ecologie/6-koolstof-gaat-rond.html"],["Je darmbewoners","films/voeding/6-je-darmbewoners.html"]]});

/* ============ opgave 5: pijlgifkikkers ============ */
E.zet(T,[29,30],{titel:"De synaps en stoffen die erop ingrijpen",
  html:`<p>Bij een impuls komt er <b>neurotransmitter</b> (bv. acetylcholine) vrij in de synapsspleet. Die bindt aan <b>receptoren</b> op het postsynaptisch membraan, waardoor ionkanalen opengaan. Gaan er Na⁺-kanalen open, dan stromen positieve ionen naar binnen en wordt de binnenkant minder negatief: <b>depolarisatie</b>. Komt de membraanpotentiaal boven de <b>drempelwaarde</b>, dan ontstaat er een impuls.</p>
  <p>De drempelwaarde is een vaste eigenschap van het neuron: een stof in de synaps verandert de <b>membraanpotentiaal</b>, niet de drempel zelf.</p>
  <p>Om de prikkeling te stoppen moet de transmitter weer weg. Acetylcholine wordt afgebroken door <b>acetylcholinesterase</b>; andere transmitters worden teruggepompt in het presynaptische neuron.</p>
  <p>Stoffen die op zo'n receptor werken:</p>
  <ul><li><b>agonist</b>: lijkt op de transmitter en doet hetzelfde (kanaal gaat open);</li>
  <li><b>antagonist</b>: bezet de receptor of werkt de transmitter tegen (kanaal blijft dicht).</li></ul>
  <p>Een agonist die niet wordt afgebroken, houdt de kanalen open en is daarom al in heel lage concentratie gevaarlijk.</p>`,
  films:[["De spleet: de synaps","films/zenuwstelsel/3-de-spleet.html"],["Knoeien met de spleet","films/zenuwstelsel/4-knoeien-met-de-spleet.html"]]});

E.zet(T,[31],{titel:"Cladogrammen en convergente evolutie",
  html:`<p>Een <b>cladogram</b> laat zien hoe soorten uit gemeenschappelijke voorouders zijn ontstaan. Elk splitspunt is een gemeenschappelijke voorouder; soorten die daar vlak na elkaar afsplitsen, zijn nauw verwant.</p>
  <p>Een kenmerk dat alle soorten in een tak hebben, is meestal <b>één keer</b> ontstaan: bij hun gemeenschappelijke voorouder. Dat heet een homologie: het kenmerk is geërfd.</p>
  <p>Van <b>convergente evolutie</b> spreek je als dezelfde eigenschap <b>onafhankelijk</b> in verschillende takken is ontstaan, doordat de soorten met dezelfde selectiedruk te maken hadden. In een cladogram herken je dat zo: de soorten met het kenmerk staan in verschillende takken, en de soorten dáártussen hebben het kenmerk <b>niet</b>.</p>`,
  anim:box=>E.stappen(box,[
    {i:0,cap:"Zelfde kenmerk (goud) bij alle soorten van één tak: één keer ontstaan bij de gemeenschappelijke voorouder. Dat is geen convergentie."},
    {i:1,cap:"Zelfde kenmerk bij twee soorten uit verschillende takken, terwijl de soorten ertussen het niet hebben: twee keer apart ontstaan, dus convergente evolutie."}],
    (st,s,i)=>{
      const soort=[0,1,2,3,4,5];
      const heeft=i===0?[3,4,5]:[1,5];
      let g=DEFS+`<rect width="440" height="230" fill="var(--surface2)"/>`;
      const y=k=>30+k*34;
      g+=`<path d="M30,${y(0)} L30,${y(5)}" stroke="var(--text2)" stroke-width="1.6"/>`;
      soort.forEach(k=>{g+=`<path d="M30,${y(k)} L250,${y(k)}" stroke="var(--text2)" stroke-width="1.6"/>`;
        g+=`<text class="lblm" x="300" y="${y(k)+4}" text-anchor="middle">soort ${k+1}</text>`;
        if(heeft.includes(k))g+=`<circle cx="262" cy="${y(k)}" r="7" fill="var(--goud)"/>`;});
      g+=`<path d="M110,${y(3)} L110,${y(5)}" stroke="var(--text2)" stroke-width="1.6"/>`;
      g+=`<path d="M170,${y(0)} L170,${y(1)}" stroke="var(--text2)" stroke-width="1.6"/>`;
      if(i===0)g+=`<circle cx="110" cy="${y(4)}" r="7" fill="var(--goud)"/><text class="lblm" x="122" y="${y(4)+4}">hier ontstaan</text>`;
      else g+=`<text class="lblm" x="276" y="${y(1)-14}" style="fill:var(--goud-text)">apart ontstaan</text><text class="lblm" x="276" y="${y(5)+22}" style="fill:var(--goud-text)">apart ontstaan</text>`;
      st.innerHTML=SV("0 0 440 230",g,"Cladogram met zes soorten; gouden stippen geven aan welke soorten het kenmerk hebben");}),
  films:[["Hoe weten we dat?","films/evolutie/7-hoe-weten-we-dat.html"],["Stambomen lezen","films/evolutie/8-stambomen-lezen.html"]]});

E.zet(T,[32],{titel:"Puntmutatie, codon en aminozuur",
  html:`<p>Het DNA wordt per <b>triplet</b> (drie nucleotiden) gelezen; in het mRNA heet dat een <b>codon</b>. Elk codon staat voor één aminozuur.</p>
  <p>Bij een <b>puntmutatie (substitutie)</b> verandert er één nucleotide. Dat kan één aminozuur veranderen (missense), niets veranderen (stille mutatie, want de code is redundant) of een stopcodon maken (nonsense). De lengte van het eiwit blijft gelijk.</p>
  <p>Bij een <b>insertie</b> of <b>deletie</b> van één of twee nucleotiden verschuift het <b>leesraam</b>: vanaf die plek verandert bijna alles.</p>
  <p>Wil je weten hoeveel nucleotiden er minimaal moeten veranderen voor een aantal aminozuurveranderingen, dan geldt: bij een puntmutatie is <b>één nucleotide per aminozuur</b> genoeg, als er tenminste een codon bestaat dat maar in één letter verschilt. Dat zoek je op in de codontabel.</p>`,
  films:[["De genetische code lezen","films/dna/4-de-genetische-code-lezen.html"],["Mutaties","films/dna/5-mutaties.html"]]});

E.zet(T,[33],{titel:"Dosis-responscurven lezen",
  html:`<p>In een <b>dosis-responsdiagram</b> staat op de x-as de concentratie (vaak <b>logaritmisch</b>: elke stap is een factor 10) en op de y-as de respons, meestal in procenten van een maximum.</p>
  <p>Twee dingen lees je apart af:</p>
  <ul><li><b>Gevoeligheid</b>: hoeveel is er nodig voor een bepaalde respons? Dat zie je aan de <b>plek</b> van de curve. Ligt een curve verder naar rechts, dan is er meer nodig: minder gevoelig.</li>
  <li><b>Maximale respons</b>: hoe hoog komt de curve? Dat zie je aan de <b>hoogte</b>.</li></ul>
  <p>Let op: twee grafieken naast elkaar kunnen verschillende bereiken op de x-as hebben. Wil je bij een <i>gelijke concentratie</i> vergelijken, zoek dan in beide grafieken dezelfde waarde op de as op; kijk niet naar dezelfde plek op het papier.</p>`});

/* ============ opgave 6: fosfor ============ */
E.zet(T,[34],{titel:"Transport in de plant en assimilatie",
  html:`<p>Een plant heeft twee soorten vaten:</p>
  <ul><li><b>Houtvaten (xyleem)</b>: vervoeren water met opgeloste <b>mineralen</b> van de wortels naar boven, getrokken door de verdamping in de bladeren.</li>
  <li><b>Bastvaten (floëem)</b>: vervoeren <b>assimilatieproducten</b> (vooral suiker) van de bladeren naar de rest van de plant.</li></ul>
  <p>Twee soorten assimilatie:</p>
  <ul><li><b>Koolstofassimilatie</b> = fotosynthese: uit CO₂ en water maakt de plant met lichtenergie glucose.</li>
  <li><b>Voortgezette assimilatie</b>: uit glucose plus opgenomen mineralen (N, P, S) maakt de plant alle andere organische stoffen: eiwitten, DNA, ATP, vetten, celwandstoffen.</li></ul>
  <p>Fosfaat wordt dus met de houtvaten aangevoerd en bij de voortgezette assimilatie ingebouwd.</p>`,
  films:[["Transport in planten","films/transport/6-transport-in-planten.html"],["Alles in het groen: fotosynthese","films/stofwisseling/3-alles-in-het-groen.html"]]});

E.zet(T,[35],{titel:"Lichtreactie en donkerreactie",
  html:`<p>De fotosynthese in de chloroplast bestaat uit twee delen.</p>
  <p><b>Lichtreactie</b> (thylakoïdmembranen): licht maakt elektronen vrij uit chlorofyl. Water wordt gesplitst, waarbij <b>O₂</b> vrijkomt als afvalproduct. De energie wordt vastgelegd in <b>ATP</b>, en waterstof wordt gebonden aan NADP⁺ tot <b>NADPH</b>.</p>
  <p><b>Donkerreactie</b> (stroma, Calvincyclus): CO₂ wordt vastgelegd en met de <b>ATP</b> en <b>NADPH</b> uit de lichtreactie omgezet in glucose. 'Donker' betekent alleen dat er geen licht voor nodig is; het gebeurt ook overdag.</p>
  <p>ATP en NADPH bevatten allebei fosfaatgroepen: ATP drie, NADPH één meer dan NADH. Daarom heeft een plant fosfaat nodig om te kunnen fotosynthetiseren.</p>`,
  films:[["Alles in het groen: fotosynthese","films/stofwisseling/3-alles-in-het-groen.html"]]});

E.zet(T,[36,37],{titel:"De fosforkringloop en uitspoeling",
  html:`<p>Fosfor komt vrij bij de <b>verwering</b> van gesteente en wordt gewonnen in fosfaatmijnen. Planten nemen het als <b>fosfaat</b> op uit de bodem; via de voedselketen komt het in dieren terecht. Reducenten (schimmels en bacteriën) maken het weer vrij in de bodem. Een deel slaat neer in water en wordt op heel lange termijn weer gesteente.</p>
  <p>Anders dan bij koolstof en stikstof zit er <b>geen gasvormige stap</b> in: fosfor gaat niet door de lucht. Daardoor is de kringloop traag en kan fosfor zich lokaal ophopen of juist opraken.</p>
  <p>Komt er op een plek meer fosfaat binnen dan eruit gaat, dan hoopt het zich op in de bodem. Een deel daarvan <b>spoelt</b> bij regen <b>uit</b> naar sloten, beken en grondwater. Een bodem die jarenlang veel fosfaat heeft gekregen, blijft dat nog lang naleveren. Reken bij zulke vragen dus na wat er een gebied in gaat en wat eruit gaat.</p>`,
  films:[["Koolstof gaat rond","films/ecologie/6-koolstof-gaat-rond.html"],["Stikstof gaat rond","films/ecologie/7-stikstof-gaat-rond.html"]]});

E.zet(T,[38],{titel:"Beperkende factoren en tolerantie",
  html:`<p>Een <b>beperkende factor</b> is de factor die op dat moment de groei begrenst. Alleen méér van <i>die</i> factor geeft meer groei; van de andere factoren is er al genoeg. In water is vaak fosfaat of stikstof de beperkende factor voor algen, soms ook licht of temperatuur.</p>
  <p>Een <b>tolerantiecurve</b> laat zien bij welke waarden van een factor een soort kan leven. Tussen de <b>minimum-</b> en de <b>maximumtolerantiegrens</b> kan de soort voorkomen, met daartussen een optimum. <b>Buiten</b> die grenzen kan de soort niet leven.</p>
  <p>Let dus op het verschil: bij een beperkende factor levert méér nog winst op; boven de maximumtolerantiegrens verdwijnt een soort juist.</p>`,
  films:[["Waar past een soort?","films/ecologie/2-waar-past-een-soort.html"],["Binnen de grenzen","films/ecologie/5-binnen-de-grenzen.html"]]});

E.zet(T,[39],{titel:"Een proefopzet beschrijven",
  html:`<p>Bij een vraag over een proefopzet verwacht het correctievoorschrift bijna altijd dezelfde drie dingen:</p>
  <ul><li><b>Wat houd je gelijk?</b> Alle omstandigheden behalve de factor die je onderzoekt: zelfde grootte, zelfde begin-concentratie, zelfde licht en temperatuur, zelfde looptijd.</li>
  <li><b>Wat laat je verschillen?</b> Precies één factor, de <b>onafhankelijke variabele</b>. Er is altijd een <b>controle</b> zonder die factor.</li>
  <li><b>Wat meet je?</b> De <b>afhankelijke variabele</b>: wat de onderzoeksvraag wil weten, gemeten vóór en na afloop of met vaste tussenpozen.</li></ul>
  <p>Meet altijd wat er in de <b>onderzoeksvraag</b> staat, niet iets wat daar alleen mee samenhangt. Meer herhalingen (meer vijvers per behandeling) maken de uitkomst betrouwbaarder.</p>`,
  films:[["Onderzoek doen","films/cellen/onderzoek-doen/index.html"],["Kun je onderzoek vertrouwen?","films/extra/kun-je-onderzoek-vertrouwen.html"]]});

})();
