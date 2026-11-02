/* Uitleg van de stof bij oefenexamen vwo 2022-I (tool vwo22-1). Gebouwd in hw/vwo22-1/stof.js, gekopieerd naar tools/examen-stof/vwo22-1.js. */
(function(){
"use strict";
const E=window.EXSTOF;if(!E)return;const T="vwo22-1";
const SV=(vb,inner,lab)=>E.svg(vb,inner,lab);
const pijl=(id,kl)=>`<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${kl}"/></marker>`;
const DEFS=`<defs>${pijl("s22x","var(--text2)")}${pijl("s22g","var(--goud)")}${pijl("s22t","var(--teal)")}</defs>`;
const anim=(steps,draw)=>box=>E.stappen(box,steps,(st,s,i)=>{st.innerHTML=draw(i,s);});
const caps=a=>a.map(c=>({cap:c}));
const doos=(x,y,w,t,kl,h)=>`<rect x="${x}" y="${y}" width="${w}" height="${h||38}" rx="9" fill="var(--surface)" stroke="${kl||"var(--line2)"}" stroke-width="1.6"/><text class="lbl" x="${x+w/2}" y="${y+(h||38)/2+5}" text-anchor="middle">${t}</text>`;
const lijn=(x1,y1,x2,y2,m)=>`<path d="M${x1},${y1} L${x2},${y2}" stroke="var(--text2)" stroke-width="1.8" marker-end="url(#${m||"s22x"})"/>`;
const F={
  water:["Water in balans","films/hormonen/5-water-in-balans.html"],
  uitsch:["Uitscheiding en evenwicht","films/gaswisseling/3-uitscheiding-en-evenwicht.html"],
  baas:["De baas van de klieren","films/hormonen/3-de-baas-van-de-klieren.html"],
  bloed:["Wat er in je bloed zit","films/transport/3-wat-er-in-je-bloed-zit.html"],
  dna1:["Wat is DNA?","films/dna/1-wat-is-dna.html"],
  eiwit:["Van DNA naar eiwit","films/dna/3-van-dna-naar-eiwit.html"],
  mut:["Mutaties","films/dna/5-mutaties.html"],
  aanuit:["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"],
  cel:["Celdeling","films/voortplanting/celdeling/index.html"],
  onderzoek:["Onderzoek doen in de biologie","films/cellen/onderzoek-doen/index.html"],
  vertrouwen:["Kun je onderzoek vertrouwen?","films/extra/kun-je-onderzoek-vertrouwen.html"],
  plek:["Waar past een soort?","films/ecologie/2-waar-past-een-soort.html"],
  stikstof:["Stikstof gaat rond","films/ecologie/7-stikstof-gaat-rond.html"],
  groen:["Alles in het groen","films/stofwisseling/3-alles-in-het-groen.html"],
  adem:["Alles op adem","films/stofwisseling/2-alles-op-adem.html"],
  wie:["Wie eet wie?","films/ecologie/3-wie-eet-wie.html"],
  selectie:["Natuurlijke selectie","films/evolutie/2-natuurlijke-selectie.html"],
  toeval:["Toeval en uitwisseling","films/evolutie/5-toeval-en-uitwisseling.html"],
  stamb:["Stambomen lezen","films/evolutie/8-stambomen-lezen.html"],
  tijd:["Van bevruchting tot baby","films/voortplanting/1-precies-op-tijd.html"],
  post:["Post voor iedereen","films/hormonen/1-post-voor-iedereen.html"],
  suiker:["Suiker in balans","films/hormonen/2-suiker-in-balans.html"],
  spleet:["De spleet","films/zenuwstelsel/3-de-spleet.html"],
  kabel:["Het kabelnetwerk","films/zenuwstelsel/2-het-kabelnetwerk.html"],
  pomp:["Eén pomp, twee rondjes","films/transport/1-een-pomp-twee-rondjes.html"],
  gas:["Gas op reis","films/gaswisseling/2-gas-op-reis.html"],
  ademio:["Adem in, adem uit","films/gaswisseling/1-adem-in-adem-uit.html"],
  hoofd:["Het hoofdkantoor","films/zenuwstelsel/5-het-hoofdkantoor.html"],
  anti:["Antistoffen op maat","films/afweer/2-antistoffen-op-maat.html"],
  tcel:["T-cellen en virussen","films/afweer/3-t-cellen-en-virussen.html"],
  eerste:["De eerste verdediging","films/afweer/1-de-eerste-verdediging.html"],
  darm:["Van darm naar bloed","films/voeding/4-van-darm-naar-bloed.html"],
  knip:["Knippen op maat","films/voeding/3-knippen-op-maat.html"],
  enzym:["Alles versneld","films/stofwisseling/1-alles-versneld.html"]};

/* ===================== opgave 1: Gevaarlijk afslankmiddel ===================== */
E.zet(T,[1],{titel:"Lichaamsgewicht en water",
  html:`<p>Je lichaamsgewicht bestaat uit <b>water</b> (ongeveer 60%) en <b>droge stof</b>: vooral eiwitten, vetten, koolhydraten en mineralen. Echt afvallen betekent dat je reservestof kwijtraakt, vooral <b>vet</b>. Dat gebeurt alleen als je langere tijd meer energie verbruikt dan je binnenkrijgt.</p>
  <p>De hoeveelheid water in je lichaam wordt nauwkeurig geregeld (osmoregulatie). Verlies je water, dan krijg je dorst en houden de nieren meer water vast; drink je veel, dan plas je meer.</p>`,films:[F.water,F.uitsch]});
E.zet(T,[2],{titel:"Hormonen van de hypofyse",
  html:`<p>De <b>hypofyse</b> maakt onder andere TSH (stuurt de schildklier aan), FSH en LH (geslachtsorganen), groeihormoon en, uit de achterkwab, <b>ADH</b> en oxytocine (gemaakt in de hypothalamus).</p>
  <p>ADH heet voluit <i>antidiuretisch hormoon</i>. Diurese betekent: urine maken.</p>`,films:[F.water,F.baas]});
E.zet(T,[3],{titel:"Het verzamelbuisje en het niermerg",
  html:`<p>Rond de lussen van Henle en de verzamelbuisjes is de <b>osmotische waarde</b> van het niermerg hoog. Dat komt door zouten (Na<sup>+</sup>, Cl<sup>−</sup>) én door <b>ureum</b> dat uit de verzamelbuisjes het weefsel in diffundeert.</p>
  <p>Water gaat door osmose altijd naar de kant met de hoogste osmotische waarde. Zolang het merg 'zouter' is dan de voorurine in het verzamelbuisje, wordt er water uit het buisje teruggewonnen. ADH bepaalt hoeveel waterkanaaltjes er in de wand zitten.</p>`,
  anim:anim(caps(["Een verzamelbuisje loopt door het niermerg.","In het merg is de osmotische waarde hoog: zouten en ureum.","Water gaat door osmose uit het buisje naar het merg en wordt teruggewonnen."]),i=>SV("0 0 600 200",DEFS+`<rect width="600" height="200" fill="var(--surface2)"/>
    <rect x="270" y="10" width="60" height="180" rx="10" fill="var(--teal-soft)" stroke="var(--teal)" stroke-width="2"/><text class="lbl" x="300" y="105" text-anchor="middle">buisje</text>
    ${i>=1?`<rect x="20" y="10" width="230" height="180" rx="10" fill="var(--goud-soft)"/><rect x="350" y="10" width="230" height="180" rx="10" fill="var(--goud-soft)"/>`+[[60,40],[120,90],[200,60],[80,150],[400,50],[470,120],[540,70],[430,160]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="6" fill="var(--goud)"/>`).join("")+`<text class="lbl" x="135" y="190" text-anchor="middle">niermerg</text>`:""}
    ${i>=2?lijn(268,70,215,70,"s22t")+lijn(332,130,385,130,"s22t")+`<text class="lbl" x="200" y="60" text-anchor="end" style="fill:var(--teal)">water</text>`:""}`,"Verzamelbuisje en niermerg")),films:[F.uitsch]});
E.zet(T,[4],{titel:"Waar komen rode bloedcellen vandaan?",
  html:`<p>Rode bloedcellen leven ongeveer 120 dagen en worden steeds opnieuw gemaakt in het <b>rode beenmerg</b>. De aanmaak wordt geregeld door een hormoon (bekend van doping in de sport). Zoek in je informatieboek op welk hormoon dat is en welk orgaan het maakt.</p>
  <p>Organen hebben vaak meer dan één taak: een orgaan kan stoffen uitscheiden én hormonen maken.</p>`,films:[F.bloed,F.uitsch]});
E.zet(T,[5],{titel:"Bouw van een DNA-nucleotide",
  html:`<p>Een DNA-nucleotide bestaat uit een <b>fosfaatgroep</b>, de suiker <b>deoxyribose</b> (een vijfring met een O-atoom) en een <b>stikstofbase</b>.</p>
  <ul><li><b>Purines</b> (twee ringen): adenine en guanine.</li><li><b>Pyrimidines</b> (één ring): cytosine en thymine.</li></ul>
  <p>Je herkent de basen aan hun zijgroepen. Vergelijk de structuurformules in je informatieboek: welke groepen (NH<sub>2</sub>, C=O, CH<sub>3</sub>) zitten waar? Alles wat níet bij fosfaat, suiker of base hoort, is er later aan vast gekomen.</p>`,films:[F.dna1]});
E.zet(T,[6],{titel:"Celcyclus, controle en kanker",
  html:`<p>Tijdens de celcyclus zijn er <b>controlepunten</b>: de cel controleert het DNA voordat hij verder gaat met de deling. Bij schade wordt de cyclus stilgezet zodat het DNA gerepareerd kan worden. Is de schade te groot, dan volgt <b>apoptose</b> (geprogrammeerde celdood).</p>
  <ul><li><b>Proto-oncogenen</b> stimuleren de celdeling. Een mutatie kan ze overactief maken (oncogen).</li><li><b>Tumorsuppressorgenen</b> remmen de deling of zetten aan tot apoptose.</li></ul>
  <p>Kanker ontstaat meestal pas na een opeenstapeling van meerdere mutaties in één cellijn.</p>`,films:[F.cel,F.mut]});
E.zet(T,[7],{titel:"Exons, introns en splicing",
  html:`<p>Bij eukaryoten bestaat een gen uit <b>exons</b> en <b>introns</b>. Bij de transcriptie wordt het hele gen overgeschreven in pre-mRNA. Daarna worden de introns eruit geknipt en de exons aan elkaar gezet: <b>splicing</b>. Alleen het rijpe mRNA gaat naar de ribosomen.</p>
  <p>Het knipapparaat (spliceosoom) herkent korte basenvolgordes aan het begin en eind van elk intron.</p>`,films:[F.eiwit,F.aanuit]});
E.zet(T,[8],{titel:"Soorten mutaties",
  html:`<ul><li><b>Puntmutatie</b>: verandering van één basenpaar (substitutie, of insertie/deletie van één base).</li><li><b>Chromosoommutatie</b>: een groter stuk chromosoom verandert (deletie, duplicatie, inversie, translocatie).</li><li><b>Genoommutatie</b>: het aantal chromosomen verandert.</li></ul>
  <p>Mutaties ontstaan door mutagene factoren (straling, stoffen) maar ook spontaan, bijvoorbeeld door foutjes bij replicatie. Uit een figuur kun je alleen afleiden wat er echt in staat: let op wat wel en niet is weergegeven.</p>`,films:[F.mut]});
E.zet(T,[9],{titel:"Betrouwbaar en valide",
  html:`<p>Een methode is <b>betrouwbaar</b> als je bij herhaling hetzelfde resultaat krijgt. Een methode is <b>valide</b> als je echt meet wat je wilt weten.</p>
  <p>Voorbeeld: met een goed geijkte weegschaal kun je heel betrouwbaar het gewicht van een leerling meten. Maar als je wilt weten hoe fit iemand is, is gewicht geen valide maat.</p>`,films:[F.onderzoek,F.vertrouwen]});

/* ===================== opgave 2: Zeegras ===================== */
E.zet(T,[10],{titel:"Aanpassingen aan de standplaats",
  html:`<p>Een <b>aanpassing</b> is een erfelijke eigenschap die een organisme beter laat overleven en voortplanten op de plek waar het leeft. Bij een vraag over een aanpassing noem je altijd twee dingen: <b>wat</b> de eigenschap oplevert, en <b>tegen welke factor</b> van de standplaats dat helpt.</p>
  <p>In de getijdenzone wisselen water en lucht elkaar af: abiotische factoren zijn daar onder andere droogvallen, golfslag, temperatuur en zoutgehalte.</p>`,films:[F.plek]});
E.zet(T,[11],{titel:"Eutrofiëring",
  html:`<p><b>Eutrofiëring</b> is het voedselrijk worden van water door te veel mineralen (nitraat, fosfaat), bijvoorbeeld uit mest en afvalwater.</p>
  <p>Mineralen zijn vaak de beperkende factor voor de groei van <b>algen</b> en waterplanten. Komen er veel mineralen bij, dan groeien de snelste groeiers het hardst. Planten onder water hebben voor fotosynthese licht nodig dat door het water heen komt.</p>`,films:[F.stikstof,F.groen]});
E.zet(T,[12],{titel:"Geslachtelijk en ongeslachtelijk",
  html:`<p>Bij <b>ongeslachtelijke voortplanting</b> (bv. via wortelstokken, uitlopers) zijn de nakomelingen genetisch gelijk aan de ouder: een kloon. Snel en zonder partner, maar zonder nieuwe combinaties van allelen.</p>
  <p>Bij <b>geslachtelijke voortplanting</b> (zaden na bestuiving en bevruchting) ontstaan steeds nieuwe combinaties, en zaden kunnen ver verspreid worden.</p>
  <p>Genetische variatie in een populatie vergroot de kans dat er individuen zijn die een verandering in het milieu overleven.</p>`,films:[F.selectie,F.toeval]});
E.zet(T,[13],{titel:"Dissimilatie met en zonder zuurstof",
  html:`<p><b>Aeroob</b>: glycolyse → citroenzuurcyclus → oxidatieve fosforylering. Zuurstof is de laatste elektronenacceptor in de elektronentransportketen; daarbij wordt NADH weer NAD<sup>+</sup> en ontstaat veel ATP.</p>
  <p><b>Anaeroob</b> (gisting): na de glycolyse wordt pyruvaat omgezet in melkzuur (melkzuurgisting) of in ethanol en CO<sub>2</sub> (alcoholgisting). Zoek in je informatieboek per stap op welke stoffen worden verbruikt en gevormd.</p>`,films:[F.adem]});
E.zet(T,[14],{titel:"Een goede proefopzet",
  html:`<p>In een experiment verander je de <b>onafhankelijke variabele</b> en meet je het effect op de <b>afhankelijke variabele</b>. Alle andere factoren houd je gelijk.</p>
  <p>Een <b>controle</b> is de situatie waarin je níets aan de factoren verandert: daarmee vergelijk je alle behandelingen.</p>
  <p>Wil je het effect van één factor weten, dan vergelijk je situaties die alleen in die factor verschillen.</p>`,films:[F.onderzoek]});

/* ===================== opgave 3: Tijgermuggen ===================== */
E.zet(T,[15],{titel:"Trofische niveaus",
  html:`<ul><li><b>Producenten</b>: maken organische stof uit anorganische stof (fotosynthese).</li><li><b>Consumenten van de 1e orde</b>: eten producenten of plantaardig materiaal.</li><li><b>Consumenten van de 2e orde</b>: eten consumenten van de 1e orde; <b>3e orde</b>: eten consumenten van de 2e orde.</li><li><b>Reducenten</b>: bacteriën en schimmels die dood organisch materiaal afbreken tot anorganische stoffen.</li></ul>
  <p>Eén organisme kan op meerdere niveaus tegelijk zitten, als het verschillende soorten voedsel eet.</p>`,films:[F.wie]});
E.zet(T,[16],{titel:"Prikkels uit het milieu",
  html:`<p>Organismen gebruiken signalen uit de omgeving om hun gedrag of ontwikkeling af te stemmen op het seizoen, bijvoorbeeld bloeien, trekken of een rustfase. Zo'n signaal is pas bruikbaar als het het seizoen goed <b>voorspelt</b>.</p>
`,films:[F.plek]});
E.zet(T,[17],{titel:"Diagrammen met spreiding lezen",
  html:`<p>In een spreidingsdiagram is elk punt één meting (hier: één populatie). De lijn is de trendlijn door de punten.</p>
  <ul><li>Vergelijk eerst de assen: wat staat er, in welke eenheid, welk bereik?</li><li>Een bewering is alleen 'ondersteund' als de gegevens in het diagram het laten zien. Over gebieden buiten het gemeten bereik kun je niets zeggen.</li><li>Bij daglengte in de herfst: de dagen worden korter. Bedenk wat een hogere of lagere drempelwaarde betekent voor het moment in het jaar.</li></ul>`,films:[F.onderzoek]});
E.zet(T,[18],{titel:"Toeval in kleine populaties",
  html:`<p>Naast natuurlijke selectie verandert ook <b>toeval</b> de allelfrequenties, vooral in kleine populaties (genetische drift).</p>
  <p>Een bijzonder geval: een paar individuen vestigen zich op een nieuwe plek en stichten daar een nieuwe populatie. Die stichters dragen maar een klein deel van de allelen van de oorspronkelijke populatie mee: het <b>foundereffect</b> (stichtereffect). Een vergelijkbaar effect na een ramp heet een <i>bottleneck</i>.</p>`,films:[F.toeval]});
E.zet(T,[19],{titel:"Vormen van symbiose",
  html:`<p>Symbiose is een langdurig samenleven van twee soorten.</p><ul><li><b>Mutualisme</b>: beide soorten hebben voordeel.</li><li><b>Commensalisme</b>: de ene soort heeft voordeel, de andere merkt er niets van.</li><li><b>Parasitisme</b>: de ene soort heeft voordeel, de andere nadeel.</li></ul>
  <p>Bepaal per relatie voor beide partners apart: voordeel, nadeel of geen effect.</p>`,films:[F.wie]});
E.zet(T,[20],{titel:"Van dierenmiddel naar medicijn",
  html:`<p>Een nieuw geneesmiddel doorloopt verschillende fasen van onderzoek: eerst in het lab en bij proefdieren, daarna bij kleine groepen gezonde vrijwilligers en ten slotte bij grote groepen patiënten. Pas daarna kan het worden toegelaten.</p>
  <p>Bij elk onderzoek gaat het om twee hoofdvragen: <b>werkt</b> het (en bij welke hoeveelheid), en is het <b>veilig</b>? Een mens is geen grote hond: stofwisseling, gewicht en gevoeligheid verschillen.</p>`,films:[F.vertrouwen]});

/* ===================== opgave 4: Menstruatie ===================== */
E.zet(T,[21,23],{titel:"Een fylogenetische stamboom lezen",
  html:`<p>Een fylogenetische stamboom laat de <b>verwantschap</b> zien. Elke vertakking is een gemeenschappelijke voorouder. Hoe recenter twee soorten een gemeenschappelijke voorouder hebben, hoe nauwer ze verwant zijn.</p>
  <ul><li>Verwantschap lees je af aan de vertakkingen, niet aan een kenmerk en niet aan de volgorde van de namen.</li><li>Komt een kenmerk voor in groepen die ver uit elkaar liggen, terwijl hun voorouders het niet hadden, dan is het meerdere keren onafhankelijk ontstaan.</li><li>Mist één soort binnen een groep een kenmerk dat de hele groep heeft, dan is het in die lijn verloren gegaan.</li></ul>`,
  anim:anim(caps(["Een kleine stamboom met vier soorten.","A en B delen de meest recente voorouder: ze zijn het nauwst verwant.","A, B en C delen een voorouder die D niet heeft: A, B en C zijn alle drie even ver verwant aan D, wat hun kenmerken ook zijn."]),i=>SV("0 0 600 200",`<rect width="600" height="200" fill="var(--surface2)"/>
    <path d="M60,100 H120 M120,40 V160 M120,40 H220 M120,160 H460 M220,20 V60 M220,20 H340 M220,60 H280 M280,50 V80 M280,50 H460 M280,80 H460 M340,20 H460" stroke="var(--text)" stroke-width="2" fill="none"/>
    ${["A","B","C","D"].map((t,k)=>`<text class="lbl" x="470" y="${[54,84,24,164][k]}">${t}</text>`).join("")}
    ${i===1?`<circle cx="280" cy="65" r="9" fill="none" stroke="var(--goud)" stroke-width="3"/>`:""}${i===2?`<circle cx="120" cy="100" r="9" fill="none" stroke="var(--teal)" stroke-width="3"/>`:""}`,"Voorbeeldstamboom")),films:[F.stamb]});
E.zet(T,[22],{titel:"Hormonen van de menstruatiecyclus",
  html:`<ul><li><b>FSH</b> en <b>LH</b> uit de hypofyse sturen de rijping van de follikel en de eisprong (LH-piek).</li><li>Na de eisprong wordt de follikel het <b>geel lichaam</b>. LH houdt het geel lichaam in stand.</li><li>Het geel lichaam maakt <b>progesteron</b> (en oestrogeen); progesteron houdt het baarmoederslijmvlies in stand.</li><li>Bij een zwangerschap maakt het embryo (later de placenta) <b>hCG</b>, dat dezelfde werking heeft als LH.</li></ul>`,films:[F.tijd,F.baas]});
E.zet(T,[24],{titel:"Bloedvaten en bloedglucose",
  html:`<p>De wand van een slagader bevat <b>glad spierweefsel</b>. Als die spieren samentrekken, wordt het vat nauwer (vasoconstrictie) en stroomt er minder bloed door; ontspannen ze, dan wordt het vat wijder.</p>
  <p><b>Insuline</b> laat lichaamscellen (spieren, lever, vetweefsel) glucose uit het bloed opnemen en verlaagt zo de bloedglucoseconcentratie.</p>`,films:[F.suiker,F.pomp]});
E.zet(T,[25],{titel:"Fitness",
  html:`<p>In de evolutie gaat het om <b>fitness</b>: het aantal nakomelingen dat zelf ook weer tot voortplanting komt. Eigenschappen die de fitness verhogen, worden door natuurlijke selectie vaker.</p>
  <p>Ouders hebben maar een beperkte hoeveelheid tijd en energie om in nakomelingen te steken. Een eigenschap kan dus ook voordelig zijn als hij helpt om die investering zo goed mogelijk te besteden.</p>`,films:[F.selectie]});
E.zet(T,[26,27],{titel:"Signaaloverdracht in de cel",
  html:`<p>Hydrofiele signaalstoffen (zoals peptidehormonen) kunnen het celmembraan niet door. Ze binden aan een <b>membraanreceptor</b>. Binnen de cel zet een keten van stappen het signaal door: bijvoorbeeld een G-eiwit activeert het enzym <b>adenylcyclase</b>, dat ATP omzet in <b>cAMP</b>. cAMP activeert enzymen, en zo ontstaat de celrespons.</p>
  <p>Lipofiele hormonen (zoals <b>steroïden</b>, bv. progesteron en oestrogeen) gaan wel door het membraan en binden aan een receptor ín de cel. Dat complex bindt aan het DNA en verandert de genexpressie: welke eiwitten gemaakt worden.</p>`,films:[F.post,F.aanuit]});
E.zet(T,[28],{titel:"De hormoonas hypothalamus – hypofyse – eierstok",
  html:`<p>De <b>hypothalamus</b> geeft <b>GnRH</b> af. GnRH zet de hypofyse aan tot de afgifte van <b>FSH en LH</b>. Die sturen de eierstokken aan.</p>
  <p>Zenuwprikkels en andere hormonen kunnen de afgifte van GnRH beïnvloeden. Zo werken ook de hormonen in de pil: ze remmen via terugkoppeling de afgifte van GnRH en daardoor van FSH en LH.</p>`,films:[F.tijd,F.baas]});

/* ===================== opgave 5: Lachgas ===================== */
E.zet(T,[29],{titel:"De synaps",
  html:`<p>In een chemische synaps geeft het <b>presynaptisch</b> neuron neurotransmitter af in de synapsspleet. Die bindt aan receptoren in het membraan van het <b>postsynaptisch</b> neuron.</p>
  <ul><li><b>Depolarisatie</b>: de membraanpotentiaal wordt minder negatief (bv. door instroom van Na<sup>+</sup>): <b>excitatie</b>, de kans op een actiepotentiaal stijgt.</li><li><b>Repolarisatie</b>: terug naar de rustpotentiaal na een actiepotentiaal.</li><li><b>Hyperpolarisatie</b>: de potentiaal wordt negatiever dan in rust: <b>inhibitie</b>.</li></ul>`,films:[F.spleet,F.kabel]});
E.zet(T,[30],{titel:"De bloedsomloop",
  html:`<p>De mens heeft een dubbele bloedsomloop. <b>Kleine bloedsomloop</b>: rechterkamer → longslagader → longen → longaders → linkerboezem. <b>Grote bloedsomloop</b>: linkerkamer → aorta → slagaders naar de organen → aders → holle aders → rechterboezem.</p>
  <p><b>Slagaders</b> voeren bloed van het hart af, <b>aders</b> naar het hart toe. Gebruik de afbeelding van de bloedsomloop in je informatieboek.</p>`,films:[F.pomp]});
E.zet(T,[31],{titel:"De zuurstofverzadigingscurve",
  html:`<p>De zuurstofverzadigingscurve laat zien welk percentage van het hemoglobine zuurstof gebonden heeft bij een bepaalde pO<sub>2</sub>. In de longen (hoge pO<sub>2</sub>) is Hb bijna verzadigd; in de weefsels (lage pO<sub>2</sub>) laat Hb zuurstof los.</p>
  <p>De ligging van de curve hangt af van de omstandigheden, zoals de pCO<sub>2</sub>, de pH en de temperatuur (<b>Bohr-effect</b>). Zoek in je informatieboek op hoe de curve verschuift en wat dat betekent voor de verzadiging bij dezelfde pO<sub>2</sub>.</p>`,films:[F.gas]});
E.zet(T,[32],{titel:"Regeling van de ademhaling",
  html:`<p>De ademhaling gaat vanzelf door: het <b>ademcentrum</b> regelt hem onbewust. Zoek in je informatieboek op welk deel van de hersenen onbewuste processen zoals ademhaling en hartslag regelt, en welk deel bewuste processen.</p>
  <p><b>Chemoreceptoren</b> meten het CO<sub>2</sub>-gehalte (en O<sub>2</sub>, pH) van het bloed en geven dat door aan het ademcentrum. Zoek in je informatieboek op waar ze liggen.</p>`,films:[F.ademio,F.hoofd]});
E.zet(T,[33,34],{titel:"Myeline en impulsgeleiding",
  html:`<p>Veel axonen zijn omhuld door een <b>myelineschede</b>: lagen celmembraan van gliacellen die het axon isoleren. Tussen de stukjes myeline zitten kleine open plekken: de <b>insnoeringen van Ranvier</b>.</p>
  <p>Een impuls is een golf van actiepotentialen. Hoe snel die gaat, hangt af van de dikte van het axon en van de myelineschede.</p>`,films:[F.kabel]});
E.zet(T,[35],{titel:"Antistoffen en fagocytose",
  html:`<p>Een <b>antistof</b> (immunoglobuline) is Y-vormig: de twee armen binden specifiek aan een passend <b>antigeen</b>, de staart is bij alle antistoffen van een klasse gelijk.</p>
  <p>Antistoffen schakelen ziekteverwekkers niet altijd zelf uit. Ze kunnen ze ook 'markeren' (opsonisatie): fagocyten zoals <b>macrofagen</b> hebben receptoren voor de staart van antistoffen en ruimen gemarkeerde cellen op. Bij een <b>auto-immuunziekte</b> richt de afweer zich tegen eigen antigenen.</p>`,films:[F.anti,F.eerste]});
E.zet(T,[36],{titel:"T-helpercellen",
  html:`<p>Een <b>APC</b> (bv. een macrofaag of dendritische cel) presenteert een stukje antigeen in een MHC-eiwit. Een passende <b>T-helpercel</b> wordt daardoor geactiveerd.</p>
  <p>Geactiveerde T-helpercellen geven <b>cytokinen</b> (interleukinen) af. Die stimuleren andere afweercellen, zoals B-cellen en T-killercellen. <b>Plasmacellen</b> (uit B-cellen) maken de antistoffen.</p>`,films:[F.tcel,F.anti]});
E.zet(T,[37,39],{titel:"Vertering en opname",
  html:`<p>Eiwitten worden verteerd door <b>proteasen</b>: pepsine in de maag (werkt in zuur milieu) en proteasen uit de alvleesklier (trypsine e.d.) in de dunne darm.</p>
  <p>Sommige stoffen worden alleen opgenomen als ze gebonden zijn aan een transporteiwit dat past op een receptor in de darmwand.</p>`,films:[F.darm,F.knip]});
E.zet(T,[38],{titel:"Enzymen en cofactoren",
  html:`<p>Een <b>enzym</b> zet een substraat om in een product. Veel enzymen werken alleen met een <b>cofactor</b>: een niet-eiwit hulpstof, vaak een vitamine of een daarvan afgeleide stof.</p>
  <p>Is er te weinig cofactor, dan werkt het enzym slecht. Bedenk in een reactieketen wat er dan gebeurt met de stoffen <b>vóór</b> de geremde stap en met de stoffen <b>erna</b>.</p>`,films:[F.enzym]});
})();
