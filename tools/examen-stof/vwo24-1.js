/* Uitleg van de stof · oefenexamen vwo 2024 tijdvak 1 (tool vwo24-1). Wordt door samenvoegen.py gekopieerd naar tools/examen-stof/vwo24-1.js. */
(function(){
"use strict";
const E=window.EXSTOF, T="vwo24-1";if(!E)return;
const caps=a=>a.map(c=>({cap:c}));
const anim=(steps,draw)=>box=>E.stappen(box,steps,(st,s,i)=>{st.innerHTML=draw(i,s);});
const doos=(x,y,w,t,kl)=>`<rect x="${x}" y="${y}" width="${w}" height="38" rx="10" fill="var(--surface)" stroke="${kl||"var(--line2)"}" stroke-width="1.6"/><text class="lbl" x="${x+w/2}" y="${y+24}" text-anchor="middle">${t}</text>`;
const pijl=(x1,y1,x2,y2,kl)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${kl||"var(--text2)"}" stroke-width="2"/><circle cx="${x2}" cy="${y2}" r="3.5" fill="${kl||"var(--text2)"}"/>`;

/* ---------- opgave 1: Nicotine ---------- */
E.zet(T,[1,2],{titel:"Impulsoverdracht in een synaps",
  html:`<p>In het presynaptische uiteinde zitten <b>blaasjes met neurotransmitter</b>. Komt er een impuls aan, dan stromen Ca<sup>2+</sup>-ionen naar binnen en versmelten de blaasjes met het membraan: de neurotransmitter komt door <b>exocytose</b> in de synapsspleet.</p>
  <p>De neurotransmitter bindt aan <b>receptoren</b> op het postsynaptische membraan. Daardoor gaan ionkanalen open en kan er een nieuwe impuls ontstaan. Daarna moet de neurotransmitter weer weg: hij wordt <b>afgebroken door een enzym</b> (zoals acetylcholinesterase) of <b>heropgenomen</b> via transporteiwitten in het presynaptische membraan.</p>
  <p>Stoffen van buitenaf kunnen ingrijpen. Een <b>agonist</b> bindt aan de receptor en heeft hetzelfde effect als de eigen neurotransmitter. Een <b>antagonist</b> bindt ook, maar blokkeert de receptor zonder hem te activeren.</p>`,
  anim:anim(caps(["Een impuls komt aan in het presynaptische uiteinde.","Blaasjes versmelten met het membraan: de neurotransmitter komt in de spleet.","De neurotransmitter bindt aan receptoren: in het postsynaptische neuron ontstaat een nieuwe impuls.","De neurotransmitter wordt afgebroken of heropgenomen: het signaal stopt."]),
    i=>E.svg("0 0 560 170",`<path d="M20,40 H170 Q230,40 230,85 Q230,130 170,130 H20 Z" fill="var(--surface)" stroke="var(--line2)" stroke-width="1.6"/><path d="M540,40 H320 Q290,40 290,85 Q290,130 320,130 H540 Z" fill="var(--surface)" stroke="var(--line2)" stroke-width="1.6"/>`+
      `<circle cx="${i>=1?215:180}" cy="70" r="12" fill="none" stroke="var(--text2)"/><circle cx="${i>=1?215:175}" cy="102" r="12" fill="none" stroke="var(--text2)"/>`+
      (i>=1&&i<3?[250,262,256,268,252].map((x,k)=>`<circle cx="${x+(i>=2?18:0)}" cy="${62+k*10}" r="3" fill="var(--goud)"/>`).join(""):"")+
      `<rect x="288" y="62" width="8" height="14" fill="${i===2?"var(--teal)":"var(--text3)"}"/><rect x="288" y="96" width="8" height="14" fill="${i===2?"var(--teal)":"var(--text3)"}"/>`+
      (i===0?pijl(30,85,140,85,"var(--goud)"):"")+(i===2?pijl(330,85,520,85,"var(--teal)"):"")+
      `<text class="lblm" x="120" y="155" text-anchor="middle">presynaptisch</text><text class="lblm" x="420" y="155" text-anchor="middle">postsynaptisch</text><text class="lblm" x="260" y="25" text-anchor="middle">spleet</text>`,"Synaps in stappen")),
  films:[["De spleet","films/zenuwstelsel/3-de-spleet.html"],["Knoeien met de spleet","films/zenuwstelsel/4-knoeien-met-de-spleet.html"]]});

E.zet(T,[3,4],{titel:"Planten, hun stoffen en gewassen van de mens",
  html:`<p>Planten maken naast stoffen voor groei ook <b>secundaire stoffen</b>: alkaloïden, looistoffen, geur- en kleurstoffen. Zulke stoffen hebben een functie in de relaties van de plant met andere organismen.</p>
  <p>De mens verbetert gewassen al duizenden jaren. De <b>klassieke</b> manier: planten met een gewenste eigenschap kruisen en uit de nakomelingen steeds de beste kiezen, generatie na generatie. Daarnaast bestaan moderne technieken zoals genetische modificatie en CRISPR, waarbij het DNA direct wordt veranderd.</p>
  <p>Let op het verschil tussen een <i>mechanisme</i> (selectie: wie krijgt nakomelingen?) en de <i>naam van de toepassing</i> in de landbouw en veeteelt.</p>`,
  films:[["De mens als selectiefactor","films/evolutie/4-de-mens-als-selectiefactor.html"],["Door de mens gekozen","films/onderbouw/32b/4-door-de-mens-gekozen/index.html"]]});

E.zet(T,[5],{titel:"Stamcellen en hun potentie",
  html:`<p>Een stamcel kan zich delen en kan differentiëren tot andere celtypen. Hoe meer celtypen een cel nog kan worden, hoe groter zijn <b>potentie</b>:</p>
  <ul><li><b>totipotent</b>: kan alle celtypen worden, ook de placenta en vliezen: een heel nieuw organisme (zygote en de eerste paar delingen);</li>
  <li><b>pluripotent</b>: kan alle celtypen van het lichaam worden, maar geen placenta;</li>
  <li><b>multipotent</b>: kan nog een beperkt aantal celtypen worden, bijvoorbeeld alle soorten bloedcellen.</li></ul>
  <p>Tijdens de ontwikkeling neemt de potentie van cellen steeds verder af.</p>`,
  anim:anim(caps(["Zygote: één cel met de grootste potentie.","Blastula: een holle bol met een buitenste cellaag en een binnenste celmassa.","Tijdens de ontwikkeling differentiëren cellen: hun potentie neemt af."]),
    i=>E.svg("0 0 560 150",`<circle cx="80" cy="75" r="30" fill="var(--surface)" stroke="${i===0?"var(--goud)":"var(--line2)"}" stroke-width="2"/><text class="lblm" x="80" y="130" text-anchor="middle">zygote</text>`+
      `<circle cx="270" cy="75" r="48" fill="none" stroke="${i===1?"var(--goud)":"var(--line2)"}" stroke-width="7"/><circle cx="292" cy="75" r="18" fill="var(--teal-soft,var(--surface))" stroke="${i===1?"var(--teal)":"var(--line2)"}" stroke-width="2"/><text class="lblm" x="270" y="140" text-anchor="middle">blastula</text>`+
      (i===2?`<circle cx="440" cy="50" r="12" fill="none" stroke="var(--teal)" stroke-width="2"/><rect x="470" y="40" width="40" height="14" rx="7" fill="none" stroke="var(--teal)" stroke-width="2"/><path d="M430,95 l20,10 l20,-10 l20,10" fill="none" stroke="var(--teal)" stroke-width="2"/><text class="lblm" x="470" y="140" text-anchor="middle">gespecialiseerde cellen</text>`:""),"Van zygote naar gespecialiseerde cellen")),
  films:[["Stamcellen","films/cellen/stamcellen.html"]]});

E.zet(T,[6],{titel:"Resultaten beoordelen: gemiddelde, spreiding en significantie",
  html:`<p>In een puntgrafiek is elk punt één meting. Kijk naar het <b>gemiddelde</b> (waar ligt het midden van de wolk?) en naar de <b>spreiding</b> (hoe ver liggen de punten uit elkaar?). Eén uitschieter zegt weinig over het gemiddelde.</p>
  <p>Een verschil tussen twee groepen kan echt zijn, of op <b>toeval</b> berusten: als je opnieuw meet, vind je dan weer een verschil? Met een statistische toets bereken je hoe groot de kans is dat zo’n verschil door toeval ontstaat. Is die kans kleiner dan een afgesproken grens (vaak 5%), dan heet het verschil <b>significant</b>. Dat wordt in een grafiek vaak met een sterretje aangegeven.</p>`,
  films:[["Kun je onderzoek vertrouwen?","films/extra/kun-je-onderzoek-vertrouwen.html"],["Onderzoek doen","films/cellen/onderzoek-doen/index.html"]]});

E.zet(T,[7],{titel:"cDNA en de PCR",
  html:`<p>Om te meten welke genen in een cel actief zijn, kijk je naar het <b>mRNA</b>. RNA is kwetsbaar, daarom maak je er eerst DNA van: <b>cDNA</b> (complementair DNA). Dat doet het enzym <b>reverse transcriptase</b>, afkomstig uit retrovirussen. Het leest een RNA-streng en bouwt er een complementaire DNA-streng bij.</p>
  <p>Met de <b>PCR</b> vermenigvuldig je DNA. In elke cyclus: denatureren (strengen los door verhitting), primers laten hechten, en een <b>hittebestendig DNA-polymerase</b> maakt de strengen weer compleet. Na 30 cycli heb je miljarden kopieën.</p>
  <p>Vraag je bij elk molecuul af: is het product DNA of RNA? Welke bouwstenen zijn daarvoor nodig? En hoeveel verschillende stukken DNA vermenigvuldig je: één gen, of alles wat erin zit?</p>`,
  films:[["Op maat gekopieerd (PCR)","films/dna-technieken/1-op-maat-gekopieerd/index.html"],["DNA lezen","films/dna/7-dna-lezen.html"]]});

E.zet(T,[8],{titel:"Gaswisseling en de wet van Fick",
  html:`<p>Zuurstof en koolstofdioxide gaan in de longblaasjes door <b>diffusie</b> tussen lucht en bloed. Hoe snel dat gaat, beschrijft de <b>wet van Fick</b>:</p>
  <p style="text-align:center;font:600 18px var(--meta)">diffusiesnelheid ∼ A · Δc / Δx</p>
  <ul><li><b>A</b>: het oppervlak waar diffusie plaatsvindt;</li><li><b>Δc</b>: het concentratieverschil tussen beide kanten;</li><li><b>Δx</b>: de diffusieafstand (dikte van de wand).</li></ul>
  <p>Longen zijn hiervoor gebouwd: miljoenen longblaasjes (groot A), een wand van één dunne cellaag plus de dunne wand van het haarvat (klein Δx), en ventilatie en bloedstroom die het concentratieverschil groot houden.</p>`,
  films:[["Adem in, adem uit","films/gaswisseling/1-adem-in-adem-uit.html"],["Gas op reis","films/gaswisseling/2-gas-op-reis.html"]]});

E.zet(T,[9],{titel:"Modellen in onderzoek",
  html:`<p>Onderzoek aan mensen kan vaak niet, om ethische of praktische redenen. Daarom gebruiken onderzoekers een <b>model</b>: een celkweek, een organoïde, een proefdier of een computermodel. Een model lijkt in belangrijke opzichten op de werkelijkheid, maar is er niet gelijk aan.</p>
  <p>Bij het beoordelen van een model vraag je je af: welke omstandigheden van de echte situatie zitten er níet in? Vergelijk de opzet van het model stap voor stap met de echte situatie.</p>`,
  films:[["Kun je onderzoek vertrouwen?","films/extra/kun-je-onderzoek-vertrouwen.html"]]});

/* ---------- opgave 2: Spitsbergenrendier ---------- */
E.zet(T,[10],{titel:"Oppervlakte-inhoudsverhouding en warmte",
  html:`<p>Een warmbloedig dier maakt warmte in zijn hele lichaam (het volume) en verliest warmte via zijn huid (het oppervlak). De <b>oppervlakte-inhoudsverhouding</b> (O/I) zegt hoeveel oppervlak er is per volume.</p>
  <p>Een <b>groter</b> lichaam van dezelfde vorm heeft een kleinere O/I. Maar ook de <b>vorm</b> doet ertoe, zie de blokjes hieronder.</p>`,
  anim:anim(caps(["Een kubus van 1 × 1 × 1: oppervlak 6, inhoud 1. O/I = 6.","Een kubus van 2 × 2 × 2: oppervlak 24, inhoud 8. O/I = 3: groter dier, kleinere verhouding.","Dezelfde 8 blokjes in een lange staaf (1 × 1 × 8): oppervlak 34, inhoud 8. O/I ≈ 4,3: langgerekt, grotere verhouding."]),
    i=>E.svg("0 0 560 140",i===0?`<rect x="250" y="50" width="40" height="40" fill="var(--surface)" stroke="var(--goud)" stroke-width="2"/>`:i===1?`<rect x="230" y="30" width="80" height="80" fill="var(--surface)" stroke="var(--goud)" stroke-width="2"/><path d="M270,30 V110 M230,70 H310" stroke="var(--line2)"/>`:`<rect x="110" y="55" width="320" height="40" fill="var(--surface)" stroke="var(--goud)" stroke-width="2"/>${[1,2,3,4,5,6,7].map(k=>`<line x1="${110+k*40}" y1="55" x2="${110+k*40}" y2="95" stroke="var(--line2)"/>`).join("")}`,"Kubussen en een staaf")),
  films:[["Hoeveel passen er?","films/ecologie/1-hoeveel-passen-er.html"]]});

E.zet(T,[11],{titel:"Natuurlijke selectie",
  html:`<p>Natuurlijke selectie verloopt altijd volgens hetzelfde patroon:</p>
  <ul><li><b>Variatie</b>: individuen in een populatie verschillen erfelijk, door mutaties en recombinatie.</li><li><b>Selectiedruk</b>: in een bepaald milieu hebben sommige varianten een voordeel (betere overleving, eerder voortplanten).</li><li><b>Fitness</b>: die varianten krijgen gemiddeld meer nakomelingen, dus hun allelen worden in de volgende generaties vaker.</li></ul>
  <p>Een selectiedruk kan een predator zijn, maar ook klimaat, voedselaanbod of ziekte. Belangrijk: individuen passen zich niet aan tijdens hun leven. De samenstelling van de <i>populatie</i> verandert.</p>`,
  films:[["Natuurlijke selectie","films/evolutie/2-natuurlijke-selectie.html"],["Hoe een soort er twee wordt","films/evolutie/6-hoe-een-soort-er-twee-wordt.html"]]});

E.zet(T,[12,13],{titel:"Productie in een ecosysteem",
  html:`<p>De <b>bruto primaire productie</b> (BPP) is alle organische stof die producenten per tijd en oppervlak vastleggen met fotosynthese. Een deel verbruiken ze zelf bij hun eigen dissimilatie. Wat overblijft voor groei is de <b>netto primaire productie</b> (NPP):</p>
  <p style="text-align:center;font:600 17px var(--meta)">NPP = BPP − dissimilatie van de producenten</p>
  <p>De groei van planten hangt ook af van <b>mineralen</b> zoals nitraat. Reducenten breken dode resten af tot anorganische stoffen; planten nemen die op en bouwen ze in (bv. stikstofassimilatie: van nitraat naar aminozuren).</p>
  <p>Soorten die hetzelfde nodig hebben (voedsel, ruimte) zijn elkaars <b>concurrenten</b>.</p>`,
  films:[["Waarom zo weinig roofdieren?","films/ecologie/5-waarom-zo-weinig-roofdieren.html"],["Waar past een soort?","films/ecologie/2-waar-past-een-soort.html"]]});

E.zet(T,[14],{titel:"Een puntgrafiek nauwkeurig lezen",
  html:`<p>Bij een uitspraak over een grafiek controleer je drie dingen:</p>
  <ul><li><b>Woorden als ‘alleen’, ‘altijd’, ‘elke’</b>: één punt dat niet past, maakt de uitspraak al onjuist.</li><li><b>Over welke groep</b> gaat de uitspraak? Kijk alleen naar de punten van die groep (legenda).</li><li><b>Gemiddeld</b>: kijk naar het patroon van alle punten samen, niet naar één punt.</li></ul>
  <p>Lees waarden af met de rasterlijnen en zet een aandeel om naar procenten (0,10 = 10%).</p>`});

E.zet(T,[15],{titel:"De stikstofkringloop",
  html:`<p>Stikstof gaat rond tussen het levende en het niet-levende deel van een ecosysteem. Planten nemen nitraat en ammonium op en maken er eiwitten en DNA van. Dieren krijgen stikstof binnen via hun voedsel. Via uitwerpselen, urine en dode resten komt organische stikstof terug in de bodem; reducenten en nitrificerende bacteriën maken er weer ammonium en nitraat van.</p>
  <p>Een kringloop is nooit helemaal gesloten: stikstof kan een ecosysteem ook binnenkomen of verlaten, bijvoorbeeld door stikstofbinding, denitrificatie, uitspoeling.</p>`,
  films:[["Stikstof gaat rond","films/ecologie/7-stikstof-gaat-rond.html"],["Alles gaat rond","films/ecologie/alles-gaat-rond/index.html"]]});

/* ---------- opgave 3: Koolmezen ---------- */
E.zet(T,[16],{titel:"De actiepotentiaal en spanningsafhankelijke kanalen",
  html:`<p>In rust is de binnenkant van een neuron negatief: de <b>rustpotentiaal</b> (ongeveer −70 mV). Bij een prikkel boven de drempel gaan <b>spanningsafhankelijke Na<sup>+</sup>-kanalen</b> open: Na<sup>+</sup> stroomt naar binnen en de binnenkant wordt positief (<b>depolarisatie</b>).</p>
  <p>Na een fractie van een milliseconde sluiten de Na<sup>+</sup>-kanalen en gaan K<sup>+</sup>-kanalen open: K<sup>+</sup> stroomt naar buiten (<b>repolarisatie</b>), soms even tot onder de rustwaarde (<b>hyperpolarisatie</b>). De Na<sup>+</sup>/K<sup>+</sup>-pomp herstelt de ionenverdeling. Pas als het membraan weer in rust is, kan er een nieuwe actiepotentiaal ontstaan (refractaire periode).</p>`,
  films:[["Het kabelnetwerk","films/zenuwstelsel/2-het-kabelnetwerk.html"],["Een seconde","films/zenuwstelsel/1-een-seconde.html"]]});

E.zet(T,[17,18],{titel:"Bestrijdingsmiddelen in het milieu",
  html:`<p>Bestrijdingsmiddelen worden genoemd naar wat ze doden: <b>insecticiden</b> (insecten), <b>herbiciden</b> (planten), <b>fungiciden</b> (schimmels). Een ideaal middel werkt alleen op de plaag en verdwijnt daarna snel.</p>
  <p>In het milieu worden stoffen afgebroken door bacteriën en schimmels, door licht of door chemische reacties. Hoe snel dat gaat, verschilt sterk per stof: sommige zijn binnen dagen weg, andere zijn na tientallen jaren nog terug te vinden. Stoffen die slecht afbreekbaar en goed vetoplosbaar zijn, kunnen zich in organismen ophopen.</p>`,
  films:[["Binnen de grenzen","films/ecologie/5-binnen-de-grenzen.html"]]});

E.zet(T,[19],{titel:"Opname in de dunne darm",
  html:`<p>De dunne darm is gebouwd voor opname. De darm is lang, de wand heeft plooien en <b>darmvlokken</b>, er is geen beschermende hoornlaag zoals bij de huid, en in elke vlok liggen haarvaten en een lymfevat.</p>
  <p>De dekweefselcellen hebben <b>microvilli</b> (kleine uitstulpingen van het celmembraan) en veel transporteiwitten in het membraan, waarmee ze stoffen ook actief kunnen opnemen.</p>
  <p>Samen vergroten plooien, vlokken en microvilli het oppervlak van de darm vele malen. Bedenk bij elke eigenschap: zie je hem aan één cel, of gaat het om de bouw van de hele darmwand?</p>`,
  films:[["Van darm naar bloed","films/voeding/4-van-darm-naar-bloed.html"],["De reis door je buik","films/voeding/2-de-reis-door-je-buik.html"]]});

E.zet(T,[20],{titel:"Correlatie, oorzaak en conclusies",
  html:`<p>Dat twee dingen samen voorkomen (<b>correlatie</b>), bewijst nog niet dat het een de oorzaak is van het ander (<b>causaal verband</b>). Om een oorzaak aan te tonen, heb je meer nodig: een vergelijking met een controlegroep, gegevens over de dosis, en liefst een experiment waarin je maar één factor verandert.</p>
  <p>Kijk bij een conclusie kritisch naar: hoeveel metingen zijn er, welke groep is wel en niet onderzocht, zijn er andere verklaringen, en zegt de conclusie meer dan de gegevens laten zien?</p>`,
  films:[["Kun je onderzoek vertrouwen?","films/extra/kun-je-onderzoek-vertrouwen.html"]]});

/* ---------- opgave 4: Drop ---------- */
E.zet(T,[21],{titel:"Lever, gal en de bloedvaten van de lever",
  html:`<p>De lever krijgt bloed uit twee bloedvaten: de <b>leverslagader</b> (zuurstofrijk bloed uit de aorta) en de <b>poortader</b> (bloed uit darmen en milt, met opgenomen voedingsstoffen). Het bloed verlaat de lever via de leverader naar de onderste holle ader.</p>
  <p>De lever maakt <b>gal</b>, die wordt opgeslagen in de galblaas en via de galbuis in de twaalfvingerige darm komt. Met de gal scheidt de lever ook afvalstoffen en omgezette stoffen uit. Een deel van wat met de gal in de darm komt, kan weer worden opgenomen.</p>
  <p>Hoeveel van een stof de darm opneemt, hangt onder meer af van de tijd dat de voedselbrij in de darm verblijft.</p>`,
  films:[["De lever als fabriek","films/voeding/5-de-lever-als-fabriek.html"],["Eén pomp, twee rondjes","films/transport/1-een-pomp-twee-rondjes.html"]]});

E.zet(T,[22,23],{titel:"Steroïdhormonen en genregulatie",
  html:`<p>Steroïdhormonen (zoals cortisol en aldosteron) zijn vetoplosbaar. Ze gaan door het celmembraan en binden aan een <b>receptor in het cytoplasma</b>. Het hormoon-receptorcomplex gaat naar de kern en bindt daar aan het DNA. Zo verandert de <b>transcriptie</b> van bepaalde genen.</p>
  <p>Bij genregulatie heb je stukken DNA en eiwitten:</p>
  <ul><li><b>promotor</b>: stuk DNA vlak voor het gen, waar RNA-polymerase bindt;</li><li><b>enhancer</b> of <b>silencer</b>: stuk DNA verder weg dat de transcriptie versterkt of afzwakt;</li><li><b>activator</b> of <b>repressor</b>: eiwit (transcriptiefactor) dat bindt aan zo’n stuk DNA en de transcriptie stimuleert of remt.</li></ul>
  <p>In de nier bepaalt het aantal ionkanalen in de wand van het nierbuisje hoeveel ionen uit de voorurine worden teruggeresorbeerd.</p>`,
  films:[["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"],["Water in balans","films/hormonen/5-water-in-balans.html"]]});

E.zet(T,[24],{titel:"Weefselvloeistof en oedeem",
  html:`<p>Aan het begin van een haarvat (slagaderlijke kant) is de <b>bloeddruk</b> hoger dan de <b>osmotische waarde</b> van het bloed: water en kleine stoffen worden uit het haarvat geperst. Zo ontstaat weefselvloeistof.</p>
  <p>Aan het eind (aderlijke kant) is de bloeddruk gedaald. Daar trekt de osmotische waarde van het bloed (vooral door de plasma-eiwitten) vocht weer terug. Wat overblijft, voert de lymfe af.</p>
  <p>Raakt dat evenwicht verstoord, dan blijft er te veel vocht in de weefsels achter: <b>oedeem</b>.</p>`,
  anim:anim(caps(["Begin van het haarvat: de bloeddruk is groter dan de osmotische zuigkracht. Vocht gaat naar buiten.","Eind van het haarvat: de bloeddruk is gedaald. De osmotische zuigkracht trekt vocht terug."]),
    i=>E.svg("0 0 560 150",`<rect x="40" y="55" width="480" height="40" rx="20" fill="var(--koraal-soft)" stroke="var(--koraal)" stroke-width="1.5"/><text class="lblm" x="60" y="125">slagaderlijk</text><text class="lblm" x="500" y="125" text-anchor="end">aderlijk</text>`+
      (i===0?pijl(150,55,150,18,"var(--goud)")+pijl(190,55,190,18,"var(--goud)")+`<text class="lbl" x="210" y="30">vocht naar buiten</text>`:pijl(390,18,390,52,"var(--teal)")+pijl(430,18,430,52,"var(--teal)")+`<text class="lbl" x="370" y="30" text-anchor="end">vocht terug</text>`),"Vochtuitwisseling in een haarvat")),
  films:[["Weefselvloeistof en lymfe","films/transport/4-weefselvloeistof-en-lymfe.html"],["Buizen onder druk","films/transport/2-buizen-onder-druk.html"]]});

E.zet(T,[25],{titel:"Rekenen met gehaltes en eenheden",
  html:`<p>Bij een rekenopdracht helpt een vast plan:</p>
  <ul><li>Schrijf bij elk getal de <b>eenheid</b> (mg/kg, g, kg).</li><li>Zet eenheden gelijk: 1 kg = 1000 g, dus een gehalte in mg/kg is hetzelfde getal ÷ 1000 in mg/g.</li><li>Een waarde ‘per kg lichaamsgewicht’ vermenigvuldig je met het gewicht van de persoon.</li><li>Lees goed of er nog een <b>veiligheidsmarge</b> of correctie geldt.</li></ul>
  <p>Voorbeeld met andere getallen: thee met 400 mg cafeïne per kg; een kopje bevat 2 g thee. Per kopje: 2 g × 0,4 mg/g = 0,8 mg cafeïne.</p>`});

/* ---------- opgave 5: Bonenziekte ---------- */
E.zet(T,[26,27],{titel:"Elektronendragers en stofwisselingsroutes",
  html:`<p>Bij redoxreacties worden elektronen (met H<sup>+</sup>) overgedragen. Cellen gebruiken daarvoor <b>elektronendragers</b>. In de gereduceerde vorm (met H) dragen ze energierijke elektronen, in de geoxideerde vorm niet:</p>
  <ul><li>NAD<sup>+</sup> / NADH en FAD / FADH<sub>2</sub>: bekend van de celademhaling;</li><li>NADP<sup>+</sup> / NADPH: bekend van de fotosynthese. Zoek op in welke fase van de fotosynthese NADPH wordt gemaakt en in welke het wordt gebruikt.</li></ul>
  <p>Een stofwisselingsroute is een reeks reacties, elk met een eigen enzym. Valt het enzym van een vroege stap uit, dan worden ook de producten van de latere stappen niet gemaakt. Volg in een schema dus elke pijl: wat gaat erin, wat komt eruit, en welke stof is nodig in een <i>andere</i> route?</p>`,
  films:[["Alles in het groen","films/stofwisseling/3-alles-in-het-groen.html"],["Alles op adem","films/stofwisseling/2-alles-op-adem.html"]]});

E.zet(T,[28,29,30],{titel:"Rode bloedcellen: bouw, afbraak en zuurstoftransport",
  html:`<p>Rijpe rode bloedcellen van zoogdieren zijn gespecialiseerd in zuurstoftransport. Tijdens de rijping in het rode beenmerg verandert hun bouw sterk, zodat er plaats is voor veel <b>hemoglobine</b>. Bedenk bij elke celtaak welk organel ervoor nodig is: voor het maken van een eiwit zijn DNA (transcriptie) en ribosomen (translatie) nodig. Ze leven ongeveer 120 dagen.</p>
  <p>Oude of beschadigde rode bloedcellen worden afgebroken in milt en lever. Het ijzer wordt hergebruikt; de rest wordt omgezet en verlaat het lichaam via de gal. Zoek in je informatieboek op welke stof daarbij ontstaat.</p>
  <p>Het lichaam regelt de zuurstofvoorziening van de weefsels met de <b>ademhaling</b> en het <b>hartminuutvolume</b>. Bij een tekort aan zuurstof in het bloed worden deze aangepast.</p>`,
  films:[["Wat er in je bloed zit","films/transport/3-wat-er-in-je-bloed-zit.html"],["Het hart onder controle","films/transport/5-het-hart-onder-controle.html"]]});

E.zet(T,[31],{titel:"Soorten mutaties",
  html:`<p>Een <b>puntmutatie</b> (substitutie) verandert één base. Zoek in de codontabel wat er gebeurt als je in een codon één base verandert: soms blijft het aminozuur gelijk, soms wordt het een ander aminozuur, en er bestaan ook stopcodons.</p>
  <p>Bij een <b>insertie</b> of <b>deletie</b> komen er basen bij of gaan er basen af. Een gen wordt per drie basen gelezen: bedenk wat er dan gebeurt met de codons erna.</p>`,
  films:[["Mutaties","films/dna/5-mutaties.html"],["De genetische code lezen","films/dna/4-de-genetische-code-lezen.html"]]});

E.zet(T,[32,34],{titel:"X-chromosomale overerving in een stamboom",
  html:`<p>Een vrouw heeft twee X-chromosomen, een man een X en een Y. Een <b>zoon</b> krijgt zijn X altijd van zijn <b>moeder</b> en zijn Y van zijn vader. Een dochter krijgt van elke ouder een X.</p>
  <p>Bij een X-chromosomaal recessieve aandoening heeft een man met één afwijkend allel de aandoening al. Een vrouw met één afwijkend allel is meestal <b>draagster</b>: gezond, maar ze kan het allel doorgeven.</p>
  <p><b>Kansen over meerdere generaties</b>: bereken per stap de kans dat het allel wordt doorgegeven en vermenigvuldig. Bijvoorbeeld: een draagster heeft een kleinzoon via een gezonde zoon? Die zoon heeft geen afwijkend allel als hij gezond is, dus dan is de kans 0.</p>`,
  films:[["Overerving via het X-chromosoom","films/erfelijkheid/5-overerving-via-x-chromosomen-en-mitochondrien.html"],["Stambomen en kansrekenen","films/erfelijkheid/6-stambomen-en-kansrekenen.html"]]});

E.zet(T,[33],{titel:"Epigenetica",
  html:`<p>Epigenetica gaat over veranderingen in <b>genexpressie</b> die niet komen door een verandering in de <b>basenvolgorde</b> van het DNA. Voorbeelden: methylering van DNA en het wel of niet strak opgevouwen zijn van chromatine. Strak opgevouwen DNA wordt niet afgeschreven.</p>
  <p>Zulke veranderingen kunnen bij celdeling worden doorgegeven aan dochtercellen. Zo kunnen twee cellen met precies hetzelfde DNA toch verschillende genen aan of uit hebben staan.</p>`,
  films:[["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"]]});

E.zet(T,[35],{titel:"Hardy-Weinberg",
  html:`<p>Met de regel van Hardy-Weinberg reken je van allelfrequenties naar genotypefrequenties. Bij twee allelen met frequenties <i>p</i> en <i>q</i> (<i>p</i> + <i>q</i> = 1) gelden voor een gen op een autosoom:</p>
  <p style="text-align:center;font:600 17px var(--meta)"><i>p</i><sup>2</sup> + 2<i>pq</i> + <i>q</i><sup>2</sup> = 1</p>
  <p>Bij een gen op het <b>X-chromosoom</b> is het anders voor mannen en vrouwen. Vrouwen hebben twee allelen, net als bij een autosoom. Mannen hebben maar één X-chromosoom. Bedenk wat dat betekent voor het aantal allelen dat hun fenotype bepaalt.</p>
  <p>Voorbeeld met andere getallen: een recessief allel met <i>q</i> = 0,1 op een autosoom geeft <i>q</i><sup>2</sup> = 0,01 = 1% homozygoten.</p>`,
  films:[["Toeval en uitwisseling","films/evolutie/5-toeval-en-uitwisseling.html"]]});

E.zet(T,[36],{titel:"Waardoor veranderen allelfrequenties?",
  html:`<p>Allelfrequenties in een populatie kunnen veranderen door:</p>
  <ul><li><b>natuurlijke selectie</b>: dragers van een allel hebben in een bepaald milieu een hogere of lagere fitness;</li><li><b>genetic drift</b> (toeval): vooral in kleine populaties, bijvoorbeeld na een flessenhals (de populatie wordt even heel klein) of bij een stichterpopulatie (een paar individuen beginnen ergens een nieuwe populatie);</li><li><b>gene-flow / migratie</b>: individuen nemen allelen mee van de ene populatie naar de andere;</li><li><b>mutatie</b>: nieuwe allelen ontstaan.</li></ul>
  <p>Vraag je af: hangt de verandering samen met een voordeel in een bepaald milieu, of met toeval of verplaatsing?</p>`,
  films:[["Vormen van selectie","films/evolutie/3-vormen-van-selectie.html"],["Toeval en uitwisseling","films/evolutie/5-toeval-en-uitwisseling.html"]]});

E.zet(T,[37],{titel:"Allergie",
  html:`<p>Bij een <b>allergie</b> reageert het specifieke afweersysteem op een onschuldig antigeen (allergeen), zoals pollen of pinda. Bij het eerste contact maken B-cellen <b>IgE-antistoffen</b>, die op mestcellen gaan zitten. Bij een volgend contact binden allergenen aan die IgE: de mestcellen geven <b>histamine</b> af. Dat geeft de bekende klachten: zwelling, jeuk, slijm, benauwdheid.</p>
`,
  films:[["Vaccins, allergie en bloedgroepen","films/afweer/4-vaccins-allergie-en-bloedgroepen.html"]]});

/* ---------- opgave 6: PFAS ---------- */
E.zet(T,[38],{titel:"Grenswaarden voor schadelijke stoffen",
  html:`<p>Voor schadelijke stoffen wordt een <b>grenswaarde</b> vastgesteld: de hoeveelheid die je per kg lichaamsgewicht per dag een leven lang mag binnenkrijgen zonder schade. Meestal begint dat bij proefdieren: de hoogste dosis zonder effect (‘no effect level’).</p>
  <p>Die waarde wordt voor mensen omlaag bijgesteld met <b>veiligheidsfactoren</b>, bijvoorbeeld voor verschillen tussen diersoort en mens en voor verschillen tussen mensen onderling.</p>`,
  films:[["Binnen de grenzen","films/ecologie/5-binnen-de-grenzen.html"]]});

E.zet(T,[39],{titel:"Urinevorming in de nier",
  html:`<p>In het kapsel van Bowman wordt bloedplasma door de bloeddruk door een filter geperst: <b>ultrafiltratie</b>. Water, zouten, glucose, ureum en andere kleine moleculen komen in de voorurine. Bloedcellen en grote moleculen gaan niet door het filter. Een stof die in het bloed aan iets anders vastzit, gedraagt zich als dat grotere geheel.</p>
  <p>In de nierbuisjes worden nuttige stoffen teruggeresorbeerd. Wat overblijft, wordt uitgescheiden als urine.</p>`,
  films:[["Uitscheiding en evenwicht","films/gaswisseling/3-uitscheiding-en-evenwicht.html"]]});

E.zet(T,[40,41],{titel:"Kanker en de afweer tegen kankercellen",
  html:`<p>Celdeling wordt geregeld door genen die de deling stimuleren en genen die haar remmen of een beschadigde cel laten afsterven (apoptose). Mutaties in zulke genen kunnen ervoor zorgen dat een cel ongeremd gaat delen. Meestal zijn er meerdere mutaties nodig voordat een tumor ontstaat.</p>
  <p>Het afweersysteem kan afwijkende cellen opruimen. Cellen tonen stukjes eiwit aan het afweersysteem op <b>MHC-moleculen</b>. Er zijn twee soorten, MHC-I en MHC-II, en ze zitten niet op dezelfde cellen. Afweercellen kunnen een cel op twee manieren doden: opeten (<b>fagocytose</b>) of het celmembraan lek maken zodat de cel uiteenvalt (<b>lysis</b>). Zoek in je informatieboek op welke cellen welk MHC hebben en welke afweercel welke manier gebruikt.</p>`,
  films:[["T-cellen en virussen","films/afweer/3-t-cellen-en-virussen.html"],["Mutaties","films/dna/5-mutaties.html"]]});

E.zet(T,[42],{titel:"De opzet van een onderzoek",
  html:`<p>Een onderzoek begint met een onderzoeksvraag en een hypothese. Daarna bepaal je de <b>onafhankelijke variabele</b> (wat je verandert of vergelijkt), de <b>afhankelijke variabele</b> (wat je meet) en de <b>constante factoren</b> (wat gelijk moet blijven).</p>
  <p>Bij het beoordelen van een opzet vraag je je af: kan ik met deze metingen echt zeggen dat een verschil door de onderzochte factor komt? Waarmee moet ik de resultaten daarvoor vergelijken?</p>`,
  films:[["Onderzoek doen","films/cellen/onderzoek-doen/index.html"]]});
})();
