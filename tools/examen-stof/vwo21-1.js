/* Uitleg van de stof · oefenexamen vwo 2021 tijdvak 1 (tool vwo21-1). Wordt door samenvoegen.py gekopieerd naar tools/examen-stof/vwo21-1.js. */
(function(){
"use strict";
const E=window.EXSTOF, T="vwo21-1";if(!E)return;
const anim=(steps,draw)=>box=>E.stappen(box,steps,(st,s,i)=>{st.innerHTML=draw(i,s);});
const caps=a=>a.map(c=>({cap:c}));
const pijl=(id,k)=>`<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${k}"/></marker>`;

/* ---------- opgave 1: hart ---------- */
E.zet(T,[1,2],{titel:"Bouw van het hart, kleppen en de dubbele bloedsomloop",
  html:`<p>Het hart heeft twee helften. De <b>rechterhelft</b> pompt zuurstofarm bloed naar de longen (<b>kleine bloedsomloop</b>), de <b>linkerhelft</b> pompt zuurstofrijk bloed via de aorta naar alle organen (<b>grote bloedsomloop</b>). Bloed stroomt steeds: boezem → kamer → slagader → haarvaten → ader → boezem.</p>
  <p>Er zijn twee soorten kleppen. De <b>hartkleppen</b> (tussen boezem en kamer) en de <b>slagaderkleppen</b> (tussen kamer en slagader). Een klep gaat open als de druk ervóór hoger is dan erachter, en dicht als het andersom is. De hartcyclus heeft drie fasen: <b>hartpauze</b> (alles ontspannen, bloed stroomt de boezems en kamers in), <b>boezemsystole</b> (boezems trekken samen) en <b>kamersystole</b> (kamers trekken samen).</p>
  <p>Tip: bedenk per fase waar de druk het hoogst is. Dan weet je welke kleppen open staan.</p>`,
  films:[["Eén pomp, twee rondjes","films/transport/1-een-pomp-twee-rondjes.html"]]});

E.zet(T,[3,5,6],{titel:"Prikkelgeleiding in het hart",
  html:`<p>Het hart klopt uit zichzelf. De impuls ontstaat in de <b>sinusknoop</b> (SA-knoop) in de rechterboezem, de natuurlijke pacemaker. De impuls verspreidt zich over de boezemspier, want hartspiercellen zijn elektrisch aan elkaar gekoppeld: de boezems trekken samen.</p>
  <p>Tussen boezems en kamers ligt een laag bindweefsel die impulsen slecht geleidt. De enige doorgang is de <b>AV-knoop</b>. Die geeft de impuls met een kleine vertraging door via de bundel van His en de vezels van Purkinje naar de kamerspier. Zo trekken de kamers pas samen als ze gevuld zijn.</p>
  <p>Na een actiepotentiaal is een hartspiercel even <b>refractair</b>: hij kan dan geen nieuwe impuls geleiden. Daardoor loopt een impuls niet terug.</p>
  <p>Op een <b>ECG</b> meet je de elektrische spanning van de hartspier via de huid. Elke hartslag geeft een vast patroon van pieken.</p>`,
  anim:anim(caps(["De impuls start in de <b>sinusknoop</b>.","Hij verspreidt zich over beide <b>boezems</b>: die trekken samen.","Het bindweefsel houdt hem tegen, behalve bij de <b>AV-knoop</b>. Daar wacht hij even.","Via de bundel van His en de Purkinjevezels bereikt hij de <b>kamers</b>: die trekken samen."]),i=>{
    const on=k=>i>=k;return E.svg("0 0 400 260",`<defs>${pijl("sa","var(--goud)")}</defs>
    <rect x="60" y="20" width="130" height="90" rx="30" fill="${on(1)?"var(--goud-soft,rgba(214,170,60,.25))":"var(--surface2)"}" stroke="var(--text2)"/><rect x="210" y="20" width="130" height="90" rx="30" fill="${on(1)?"var(--goud-soft,rgba(214,170,60,.25))":"var(--surface2)"}" stroke="var(--text2)"/>
    <text class="lblm" x="125" y="70" text-anchor="middle">rechterboezem</text><text class="lblm" x="275" y="70" text-anchor="middle">linkerboezem</text>
    <rect x="40" y="114" width="320" height="10" fill="var(--text3)"/><text class="lblm" x="365" y="123">bindweefsel</text>
    <path d="M60,128 h140 v110 q-70,20 -140,-40 z" fill="${on(3)?"var(--goud-soft,rgba(214,170,60,.25))":"var(--surface2)"}" stroke="var(--text2)"/><path d="M200,128 h140 q0,80 -140,110 z" fill="${on(3)?"var(--goud-soft,rgba(214,170,60,.25))":"var(--surface2)"}" stroke="var(--text2)"/>
    <circle cx="80" cy="35" r="9" fill="${on(0)?"var(--goud)":"var(--surface)"}" stroke="var(--text2)"/><text class="lbl" x="95" y="39">SA</text>
    <circle cx="200" cy="119" r="9" fill="${on(2)?"var(--goud)":"var(--surface)"}" stroke="var(--text2)"/><text class="lbl" x="214" y="104">AV</text>
    ${on(3)?`<path d="M200,128 L200,215" stroke="var(--goud)" stroke-width="3"/><path d="M200,215 C170,225 120,210 95,180" stroke="var(--goud)" stroke-width="2" fill="none" marker-end="url(#sa)"/><path d="M200,215 C240,215 300,200 320,160" stroke="var(--goud)" stroke-width="2" fill="none" marker-end="url(#sa)"/>`:""}`,"Prikkelgeleiding in het hart");}),
  films:[["Het hart onder controle","films/transport/5-het-hart-onder-controle.html"]]});

E.zet(T,[4],{titel:"Een gen overbrengen met een virus",
  html:`<p>Bij genetische modificatie breng je een gen (het <b>transgen</b>) in een cel. Een veelgebruikte <b>vector</b> is een onschadelijk gemaakt virus: het levert het gen af in de cel en bouwt het in het DNA in.</p>
  <p>Een gen is een stuk DNA met een promotor en een coderend deel. Als je ergens een stuk DNA tussen zet, kan de basenvolgorde op die plek niet meer goed worden afgelezen: denk aan een zin waar je midden in een woord een andere zin plakt.</p>
  <p>Het menselijk genoom bestaat voor een klein deel uit genen. Het grootste deel is niet-coderend DNA.</p>`,
  films:[["Van DNA naar eiwit","films/dna/3-van-dna-naar-eiwit.html"],["Mutaties","films/dna/5-mutaties.html"]]});

/* ---------- opgave 2: vissen ---------- */
E.zet(T,[7,15],{titel:"Overleven als jong dier",
  html:`<p>Veel vissen leggen duizenden eitjes, en maar een heel klein deel van de jongen wordt volwassen. Of een jong dier overleeft, hangt af van <b>biotische factoren</b> (predatoren, concurrenten, voedsel) en <b>abiotische factoren</b> (temperatuur, zoutgehalte).</p>
  <p>Wat een dier kan eten en wie hem kan eten, hangt sterk af van zijn <b>grootte</b>. Een predator kan alleen prooien eten die in zijn bek passen, en een klein dier kan alleen kleine prooien eten.</p>
  <p>Trekvissen wisselen tussen zout en zoet water. Hun lichaam moet zich dan aanpassen aan een ander zoutgehalte (<b>acclimatiseren</b>), en dat kost tijd.</p>`,
  films:[["Wie eet wie?","films/ecologie/3-wie-eet-wie.html"]]});

E.zet(T,[8],{titel:"Een grafiek met positieve en negatieve waarden lezen",
  html:`<p>Staat er bij de y-as een <b>richting</b> (bijvoorbeeld ‘snelheid richting X’), dan betekent een <b>positieve</b> waarde: beweging naar X. Een <b>negatieve</b> waarde: beweging de andere kant op. Nul is stilstand.</p>
  <p>Lees een tijdsduur af door de tijdstippen op de x-as af te lezen waar de lijn een grens (zoals 0) passeert, en die van elkaar af te trekken. Let op een x-as die over middernacht loopt: na 24:00 begint de klok weer bij 00:00.</p>
  <p>‘In het ongunstigste geval’ betekent: zoek de <b>langste</b> periode in de grafiek.</p>`});

E.zet(T,[9,10],{titel:"De nier: filtreren, terugnemen en water vasthouden",
  html:`<p>Een niereenheid (nefron) begint met een <b>glomerulus</b> in het kapsel van Bowman. Daar wordt <b>voorurine</b> uit het bloed geperst (filtratie). Hoe meer glomeruli, hoe meer voorurine.</p>
  <p>In de <b>kronkelde buisjes</b> worden nuttige stoffen teruggenomen en worden H<sup>+</sup> en andere stoffen uitgescheiden: hier wordt ook de pH geregeld.</p>
  <p>De <b>lis van Henle</b> pompt zouten uit de voorurine in het weefsel van het niermerg. Daardoor wordt dat weefsel zout (hypertoon).</p>
  <p>De <b>verzamelbuisjes</b> lopen door dat zoute niermerg. Is hun wand doorlaatbaar voor water (onder invloed van ADH), dan gaat water osmotisch uit de urine terug het lichaam in. Is de wand slecht doorlaatbaar, dan blijft het water in de urine.</p>`,
  films:[["Uitscheiding en evenwicht","films/gaswisseling/3-uitscheiding-en-evenwicht.html"],["Water in balans","films/hormonen/5-water-in-balans.html"]]});

E.zet(T,[11,12,13],{titel:"Transport door het membraan",
  html:`<ul><li><b>Diffusie</b>: een stof gaat van hoge naar lage concentratie. Ionen kunnen alleen door een membraan via een <b>kanaaleiwit</b>. Voor ionen telt ook de lading: negatieve ionen worden aangetrokken door een positieve kant.</li>
  <li><b>Actief transport</b>: een pompeiwit verplaatst een stof <i>tegen</i> het concentratieverschil in en verbruikt daarvoor <b>ATP</b>. Voorbeeld: de <b>Na-K-pomp</b> pompt Na<sup>+</sup> de cel uit en K<sup>+</sup> de cel in.</li>
  <li><b>Cotransport</b>: een transporteiwit neemt twee of meer stoffen tegelijk mee. De ene stof stroomt met zijn concentratieverschil mee en ‘trekt’ de andere mee.</li></ul>
  <p><b>Mitochondriën</b> maken ATP door aerobe dissimilatie. <b>Microvilli</b> zijn uitstulpingen van het celmembraan die het oppervlak vergroten, zoals bij de cellen van de dunne darm.</p>`,
  anim:anim(caps(["Diffusie: deeltjes bewegen vanzelf van hoog naar laag, door een kanaal. Geen ATP.","Actief transport: een pomp verplaatst deeltjes van laag naar hoog. Dat kost ATP.","Cotransport: deeltje ● stroomt mee met zijn verschil en neemt deeltje ▲ mee. Het eiwit zelf gebruikt geen ATP."]),i=>{
    const st=(x,y,n,s)=>Array.from({length:n},(_,k)=>`<text class="lbl" x="${x+(k%4)*22}" y="${y+Math.floor(k/4)*22}">${s}</text>`).join("");
    return E.svg("0 0 400 220",`<defs>${pijl("st","var(--text2)")}</defs><rect x="0" y="100" width="400" height="22" fill="var(--surface2)" stroke="var(--line2)"/><text class="lblm" x="8" y="20">buiten</text><text class="lblm" x="8" y="210">binnen</text>
    ${i===0?st(150,40,8,"●")+st(180,160,2,"●")+`<rect x="185" y="96" width="30" height="30" fill="var(--teal)" opacity=".5"/><path d="M200,70 L200,150" stroke="var(--text2)" stroke-width="2" marker-end="url(#st)"/>`:""}
    ${i===1?st(160,40,2,"●")+st(150,150,8,"●")+`<circle cx="200" cy="111" r="17" fill="var(--goud)" opacity=".6"/><text class="lbl" x="235" y="116">ATP</text><path d="M200,150 L200,70" stroke="var(--text2)" stroke-width="2" marker-end="url(#st)"/>`:""}
    ${i===2?st(120,40,8,"●")+st(260,40,1,"▲")+st(130,160,2,"●")+st(250,150,6,"▲")+`<rect x="185" y="96" width="30" height="30" fill="var(--koraal)" opacity=".5"/><path d="M195,70 L195,150" stroke="var(--text2)" stroke-width="2" marker-end="url(#st)"/><path d="M207,70 L207,150" stroke="var(--text2)" stroke-width="2" marker-end="url(#st)"/>`:""}`,"Drie manieren van transport door een membraan");}),
  films:[["Diffusie en osmose","films/cellen/diffusie-osmose/index.html"],["Celorganellen","films/cellen/celorganellen/index.html"]]});

E.zet(T,[14],{titel:"Eiwitactiviteit, genregulatie en differentiatie",
  html:`<p>Eiwitten in een cel, zoals pompen en enzymen, kunnen <b>meer of minder actief</b> worden, bijvoorbeeld door de concentratie van hun substraat of door een signaalstof.</p>
  <p>Een cel kan ook <b>andere eiwitten</b> gaan maken: door <b>genregulatie</b> worden genen aan- of uitgezet, en dan moeten transcriptie en translatie nog gebeuren.</p>
  <p><b>Stamcellen</b> kunnen delen en <b>differentiëren</b> tot gespecialiseerde cellen. Hormonen kunnen genregulatie en differentiatie sturen.</p>`,
  films:[["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"],["Stamcellen","films/cellen/stamcellen.html"]]});

/* ---------- opgave 3: yoghurt en CRISPR ---------- */
E.zet(T,[16,17],{titel:"Eiwitten verteren: endo- en exopeptidasen",
  html:`<p>Een eiwit is een lange keten van aminozuren, verbonden met <b>peptidebindingen</b>. Enzymen die die bindingen verbreken, heten <b>peptidasen</b> (proteasen). Er zijn twee soorten:</p>
  <ul><li><b>Endopeptidasen</b> knippen ergens <i>midden in</i> de keten (in je maag bijvoorbeeld pepsine).</li>
  <li><b>Exopeptidasen</b> knippen één aminozuur tegelijk van een <i>uiteinde</i> af.</li></ul>
  <p>Een enzym werkt alleen als er <b>substraat</b> is: een plek waar het kan binden. Opnemen in het bloed kan alleen met kleine moleculen, zoals aminozuren.</p>`,
  films:[["Knippen op maat","films/voeding/3-knippen-op-maat.html"]]});

E.zet(T,[18],{titel:"Hoe een faag zich vermeerdert",
  html:`<p>Een bacteriofaag is een virus dat bacteriën infecteert. Hij heeft zelf geen ribosomen en bijna geen enzymen. Hij spuit zijn erfelijk materiaal in de bacterie en laat de bacterie het werk doen.</p>
  <p>Voor een nieuwe faag zijn twee dingen nodig: <b>kopieën van het erfelijk materiaal</b> en de <b>eiwitten</b> van kop en staart. Bedenk welke processen (replicatie, transcriptie, translatie) daarvoor nodig zijn, en welke enzymen bij elk proces horen.</p>`,
  films:[["DNA kopiëren","films/dna/2-dna-kopieren.html"],["Van DNA naar eiwit","films/dna/3-van-dna-naar-eiwit.html"]]});

E.zet(T,[19],{titel:"Herkennen: restrictie-enzymen en antigenen",
  html:`<p><b>Restrictie-enzymen</b> komen van nature voor in bacteriën. Ze knippen een nucleïnezuur op een vaste <b>herkenningsplaats</b>: een korte, vaste basenvolgorde. In het lab gebruik je ze bijvoorbeeld om een gen uit een stuk erfelijk materiaal te knippen.</p>
  <p>Het afweersysteem van de mens herkent <b>antigenen</b>: moleculen die het lichaam als lichaamsvreemd herkent, zoals de moleculen op het oppervlak van een bacterie of virus. Antistoffen en T-cellen binden aan een klein stukje van zo’n antigeen.</p>`,
  films:[["Antistoffen op maat","films/afweer/2-antistoffen-op-maat.html"]]});

E.zet(T,[20,21,22,23],{titel:"CRISPR-Cas, plasmiden en co-evolutie",
  html:`<p><b>CRISPR-Cas</b> is het afweersysteem van bacteriën. In de <b>CRISPR-locus</b> in het bacteriechromosoom liggen stukjes DNA van eerdere indringers (<b>spacers</b>), tussen herhalingen (repeats). Naast de locus liggen de genen voor de <b>Cas-eiwitten</b>. Van de spacers wordt RNA gemaakt; dat RNA brengt een Cas-eiwit naar DNA met de passende (complementaire) basenvolgorde, en het Cas-eiwit knipt dat DNA.</p>
  <p>Een <b>plasmide</b> is een kleine ring DNA naast het bacteriechromosoom. Bij <b>conjugatie</b> geeft een bacterie via een brug een kopie van een plasmide door aan een andere bacterie (horizontale genoverdracht). Bij deling krijgen dochtercellen het DNA van de moedercel (verticale genoverdracht).</p>
  <p><b>Selectiedruk</b>: als een omstandigheid bepaalt welke individuen overleven en zich voortplanten, worden gunstige erfelijke eigenschappen vaker. Bij <b>co-evolutie</b> zijn twee soorten elkaars selectiedruk.</p>`,
  films:[["CRISPR: wat doet dit gen?","films/vervolg/biomedisch-2-crispr-wat-doet-dit-gen.html"],["Natuurlijke selectie","films/evolutie/2-natuurlijke-selectie.html"]]});

/* ---------- opgave 4: aardappels ---------- */
E.zet(T,[24,30],{titel:"Geslachtelijke en ongeslachtelijke voortplanting",
  html:`<p>Bij <b>ongeslachtelijke voortplanting</b> (knollen, stekken, uitlopers) ontstaat een nieuw individu uit een deel van één ouder, door mitose. Het nieuwe individu heeft <b>hetzelfde genotype</b>: het is een kloon.</p>
  <p>Bij <b>geslachtelijke voortplanting</b> (zaden) versmelten twee geslachtscellen. Door meiose en bevruchting krijgt elke nakomeling een nieuwe combinatie van allelen: er ontstaat <b>genetische variatie</b>.</p>
  <p>Het <b>fenotype</b> wordt bepaald door het genotype én het milieu.</p>`,
  films:[["Celdeling","films/voortplanting/celdeling/index.html"]]});

E.zet(T,[25],{titel:"Rekenen met een dosis",
  html:`<p>Een dosis per kilogram lichaamsgewicht reken je zo om: <b>dosis = lichaamsgewicht × dosis per kg</b>. Voorbeeld met andere getallen: bij 4 mg/kg is de dosis voor iemand van 60 kg 60 × 4 = 240 mg.</p>
  <p>Een gehalte ‘per 100 g’ gebruik je met een verhoudingstabel. Voorbeeld: 6 mg per 100 g, hoeveel gram bevat 30 mg? 30 / 6 = 5, dus 5 × 100 g = 500 g.</p>
  <p>Zet bij elke tussenstap de <b>eenheid</b>, en trek een conclusie die bij je getal past.</p>`});

E.zet(T,[26,27],{titel:"Polyploïdie en geslachtscellen",
  html:`<p>Een diploïde (2n) organisme heeft van elk chromosoom twee exemplaren, dus van elk gen twee allelen. Een <b>tetraploïde</b> (4n) organisme heeft van elk chromosoom vier exemplaren, dus <b>vier allelen per gen</b>.</p>
  <p>Bij de meiose halveert het aantal chromosomen. Een diploïde plant maakt haploïde geslachtscellen met één allel per gen; een tetraploïde plant maakt <b>diploïde geslachtscellen met twee allelen per gen</b>.</p>
  <p>Welke twee allelen in een geslachtscel komen, is toeval. Geef de allelen een nummer en schrijf alle mogelijke paren uit: elk paar is even waarschijnlijk.</p>`,
  films:[["Chromosomen","films/erfelijkheid/1-chromosomen.html"],["Monohybride kruisingen","films/erfelijkheid/2-monohybride-kruisingen.html"]]});

E.zet(T,[28,29],{titel:"Kruisbestuiving, zelfbestuiving en kruisingsschema’s",
  html:`<p>Bij <b>zelfbestuiving</b> bevrucht stuifmeel de eicellen van dezelfde plant. Na een paar generaties worden de nakomelingen steeds vaker homozygoot: zo maak je een <b>zuivere lijn</b>. Bij <b>kruisbestuiving</b> komt stuifmeel van een andere plant.</p>
  <p>Genetische variatie is de grondstof voor natuurlijke selectie.</p>
  <p><b>Kruisingsschema</b>: zet de geslachtscellen van de ene ouder bovenaan, die van de andere ouder links, en vul de vakjes. Een verhouding als ‘ongeveer de helft’ of ‘ongeveer driekwart’ helpt je terug te redeneren welke genotypen de ouders hadden.</p>`,
  films:[["Monohybride kruisingen","films/erfelijkheid/2-monohybride-kruisingen.html"]]});

E.zet(T,[31,32],{titel:"Productie, opbrengst en de energiestroom",
  html:`<p><b>Productiviteit</b> is de hoeveelheid energie (of biomassa, drooggewicht) die planten per oppervlak en per tijd vastleggen.</p>
  <p>In een voedselketen gaat bij elke stap van de ene schakel naar de volgende een groot deel van de energie verloren: als warmte bij de dissimilatie, voor beweging en in onverteerde resten. Vaak komt maar ongeveer <b>10%</b> in de volgende schakel terecht. Daardoor wordt een energiepiramide naar boven toe steeds smaller.</p>`,
  anim:anim(caps(["Producenten leggen energie vast: 100%.","Planteneters bouwen er maar ± 10% van in.","Vleeseters krijgen daar weer ± 10% van: ± 1% van het begin."]),i=>E.svg("0 0 400 200",[["producenten",340,"var(--groen)"],["consumenten 1e orde",110,"var(--goud)"],["consumenten 2e orde",36,"var(--koraal)"]].map(([t,w,k],j)=>j<=i?`<rect x="${200-w/2}" y="${150-j*55}" width="${w}" height="44" fill="${k}" opacity=".55" stroke="var(--text2)"/><text class="lbl" x="${200+w/2+8}" y="${177-j*55}">${t}</text>`:"").join(""),"Energiepiramide")),
  films:[["Waarom zo weinig roofdieren?","films/ecologie/5-waarom-zo-weinig-roofdieren.html"]]});

/* ---------- opgave 5: teken ---------- */
E.zet(T,[33,34],{titel:"Vectoren: ziekte overbrengen via een bloedzuiger",
  html:`<p>Een <b>vector</b> is een organisme dat een ziekteverwekker van de ene gastheer naar de andere brengt, zoals een mug (malaria) of een teek (Lyme). De vector pikt de ziekteverwekker op bij een bloedmaaltijd op een besmette gastheer en geeft hem bij een volgende bloedmaaltijd door, bijvoorbeeld via het speeksel.</p>
  <p>Bij dieren met een levenscyclus in fasen (zoals ei, larve, nimf, adult) kan elke fase een eigen manier van leven en eigen behoeften hebben.</p>`});

E.zet(T,[35,36,37],{titel:"Aspecifieke en specifieke afweer",
  html:`<p><b>Aspecifieke afweer</b> is altijd paraat: huid, ontstekingsreactie, fagocyten zoals <b>macrofagen</b> die indringers opeten.</p>
  <p><b>Specifieke afweer</b> heeft tijd nodig. Volgorde: een <b>antigeen-presenterende cel</b> (APC, bijvoorbeeld een dendritische cel of macrofaag) neemt het antigeen op en presenteert het in een lymfeknoop aan <b>T-helpercellen</b>. Die activeren <b>B-cellen</b>, die uitgroeien tot <b>plasmacellen</b> en antistoffen maken, en <b>cytotoxische T-cellen</b>. Bij een eerste infectie duurt dat dagen.</p>
  <p><b>Antigenen</b> zijn lichaamsvreemde moleculen van een ziekteverwekker. <b>Antistoffen</b> zijn eiwitten die plasmacellen van de gastheer maken en die aan een antigeen binden.</p>`,
  films:[["De eerste verdediging","films/afweer/1-de-eerste-verdediging.html"],["T-cellen en virussen","films/afweer/3-t-cellen-en-virussen.html"]]});

E.zet(T,[38,39],{titel:"Relaties tussen soorten",
  html:`<ul><li><b>Mutualisme</b>: beide soorten hebben voordeel (+ +).</li>
  <li><b>Commensalisme</b>: de één heeft voordeel, de ander geen voor- of nadeel (+ 0).</li>
  <li><b>Parasitisme</b>: de één (parasiet) leeft op of in de ander (gastheer) en heeft er voordeel van, de gastheer nadeel (+ −), meestal zonder hem meteen te doden.</li>
  <li><b>Predatie</b>: de één (predator) eet de ander (prooi) op (+ −).</li>
  <li><b>Concurrentie</b>: beide gebruiken dezelfde hulpbron (− −).</li></ul>
  <p>Tussen twee soorten kan meer dan één relatie tegelijk gelden.</p>`,
  films:[["Waar past een soort?","films/ecologie/2-waar-past-een-soort.html"]]});
})();
