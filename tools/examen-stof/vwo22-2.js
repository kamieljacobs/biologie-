/* Uitleg van de stof · oefenexamen vwo 2022 tijdvak 2 (tool vwo22-2). Wordt door samenvoegen.py gekopieerd naar tools/examen-stof/vwo22-2.js. */
(function(){
"use strict";
const E=window.EXSTOF, T="vwo22-2";if(!E)return;
const caps=a=>a.map(c=>({cap:c}));
const anim=(steps,draw)=>box=>E.stappen(box,steps,(st,s,i)=>{st.innerHTML=draw(i,s);});
const doos=(x,y,w,t,kl)=>`<rect x="${x}" y="${y}" width="${w}" height="38" rx="10" fill="var(--surface)" stroke="${kl||"var(--line2)"}" stroke-width="1.6"/><text class="lbl" x="${x+w/2}" y="${y+24}" text-anchor="middle">${t}</text>`;
const pijl=(x1,y1,x2,y2,kl)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${kl||"var(--text2)"}" stroke-width="2"/><circle cx="${x2}" cy="${y2}" r="3.5" fill="${kl||"var(--text2)"}"/>`;

/* ---------- opgave 1 · NIPT ---------- */
E.zet(T,[1,7],{titel:"De placenta en de ligging van de baarmoeder",
  html:`<p>De <b>placenta</b> is een orgaan van twee kanten. Vanuit de vruchtvliezen van het embryo groeien <b>placentavlokken</b> met haarvaten die via de navelstreng met de foetus verbonden zijn. Die vlokken steken in het <b>baarmoederslijmvlies van de moeder</b>, waar bloed van de moeder uit open vaatjes stroomt en de vlokken omspoelt.</p>
  <p>Het bloed van moeder en foetus mengt dus niet: stoffen gaan door de dunne wand van de vlokken. Wel komen kleine stukjes DNA uit afgestorven placentacellen in het bloed van de moeder.</p>
  <p>De <b>baarmoeder</b> ligt in het kleine bekken, achter de blaas. Vóór de blaas en de baarmoeder ligt het <b>schaambeen</b>.</p>`,
  films:[["Zwanger","films/voortplanting/zwanger/index.html"],["Geslachtsorganen en puberteit","films/voortplanting/2-geslachtsorganen-puberteit.html"]]});

E.zet(T,[2],{titel:"DNA vermeerderen in het lab",
  html:`<p>Voor veel DNA-onderzoek heb je meer DNA nodig dan je uit een monster haalt. Met een techniek in een apparaat met temperatuurcycli maak je er miljoenen kopieën van:</p>
  <ul><li><b>verhitten</b> (± 95 °C): de twee DNA-strengen laten los;</li><li><b>afkoelen</b> (± 55 °C): korte startstukjes (primers) binden aan het begin en eind van het stuk DNA dat je wilt kopiëren;</li><li><b>± 72 °C</b>: een hittebestendig DNA-polymerase maakt de nieuwe strengen.</li></ul>
  <p>Na elke cyclus is het aantal kopieën verdubbeld.</p>`,
  anim:anim(caps(["Start: 1 stuk dubbelstrengs DNA.","Na 1 cyclus: 2 stukken.","Na 2 cycli: 4 stukken.","Na 3 cycli: 8 stukken. Na 30 cycli meer dan een miljard."]),
    i=>E.svg("0 0 560 120",Array.from({length:2**i},(_,k)=>`<rect x="${10+k*(540/8)}" y="40" width="${540/8-8}" height="10" rx="3" fill="var(--teal)"/><rect x="${10+k*(540/8)}" y="54" width="${540/8-8}" height="10" rx="3" fill="var(--goud)"/>`).join("")+`<text class="lbl" x="10" y="100">${2**i} ${i?"kopieën":"stuk DNA"}</text>`,"Verdubbeling van DNA per cyclus")),
  films:[["Op maat gekopieerd · PCR","films/dna-technieken/1-op-maat-gekopieerd/index.html"]]});

E.zet(T,[3,4,5,6],{titel:"Chromosomen tellen in DNA-fragmenten",
  html:`<p>Een gewone lichaamscel van de mens heeft <b>46 chromosomen</b>: 22 paar autosomen en een paar geslachtschromosomen (XX bij een vrouw, XY bij een man). Bij een <b>trisomie</b> is er van één chromosoom een derde kopie; bij een <b>monosomie</b> ontbreekt er een.</p>
  <p>Bij de NIPT zit er in het bloed van de moeder een mengsel van DNA-fragmenten van moeder én foetus. Als je per chromosoom telt hoeveel fragmenten er zijn, verandert dat getal als de foetus een chromosoom méér of minder heeft. Hoeveel het verandert, hangt af van <b>welk deel</b> van het DNA van de foetus komt (de foetale fractie).</p>
  <p>Rekentip: werk eerst uit hoeveel fragmenten van moeder en van foetus komen, en verander dan alleen het deel dat verandert.</p>
`,
  films:[["Chromosomen","films/erfelijkheid/1-chromosomen.html"],["Celdeling","films/voortplanting/celdeling/index.html"]]});

/* ---------- opgave 2 · fipronil ---------- */
E.zet(T,[8],{titel:"Bloed en energievoorraad",
  html:`<p>De <b>rode kleur</b> van huid en slijmvliezen komt van het bloed in de haarvaten: de rode bloedcellen bevatten het rode eiwit hemoglobine. Bij <b>bloedarmoede</b> (minder rode bloedcellen of minder hemoglobine) zie je dat iemand bleek wordt.</p>
  <p>Het lichaam maakt continu nieuwe bloedcellen in het rode beenmerg. Daarvoor zijn bouwstoffen (aminozuren, ijzer) en energie nodig. Krijgt een dier minder binnen dan het verbruikt, dan spreekt het zijn <b>reserves</b> aan: eerst glycogeen, daarna vooral vet.</p>`,
  films:[["Wat er in je bloed zit","films/transport/3-wat-er-in-je-bloed-zit.html"]]});

E.zet(T,[9],{titel:"Prikkelende en remmende synapsen",
  html:`<p>Een neurotransmitter opent in het <b>postsynaptisch membraan</b> ionkanalen. Welke ionen er gaan stromen, bepaalt het effect:</p>
  <ul><li>Na<sup>+</sup> naar binnen: de binnenkant wordt minder negatief (<b>depolarisatie</b>). De membraanpotentiaal komt dichter bij de drempelwaarde: een <b>prikkelende</b> (exciterende) synaps.</li>
  <li>Cl<sup>−</sup> naar binnen of K<sup>+</sup> naar buiten: de binnenkant wordt negatiever (<b>hyperpolarisatie</b>). De potentiaal gaat verder van de drempel af: een <b>remmende</b> (inhiberende) synaps.</li></ul>
  <p>Een neuron telt alle prikkelende en remmende signalen op. Alleen als de drempelpotentiaal bereikt wordt, ontstaat er een actiepotentiaal. Een stof die een kanaal blokkeert, haalt het effect van die neurotransmitter weg.</p>`,
  anim:anim(caps(["Rustpotentiaal: ongeveer −70 mV. De drempel ligt rond −55 mV.","Na<sup>+</sup> naar binnen: depolarisatie, dichter bij de drempel.","Cl<sup>−</sup> naar binnen: hyperpolarisatie, verder van de drempel."]),
    i=>{const v=m=>30+(-40-m)/45*130;const kl=i===1?"var(--teal)":"var(--paars)";
      let s=`<line x1="40" y1="${v(-55)}" x2="540" y2="${v(-55)}" stroke="var(--koraal)" stroke-dasharray="6 4"/><text class="lblbad" x="536" y="${v(-55)-6}" text-anchor="end">drempel</text><line x1="40" y1="${v(-70)}" x2="540" y2="${v(-70)}" stroke="var(--line2)" stroke-dasharray="3 4"/><text class="lblm" x="44" y="${v(-70)-6}">rust</text>`;
      if(i)s+=`<polyline fill="none" stroke="${kl}" stroke-width="2.6" points="40,${v(-70)} 200,${v(-70)} 240,${v(i===1?-62:-78)} 300,${v(i===1?-62:-78)} 380,${v(-70)} 540,${v(-70)}"/>`;
      return E.svg("0 0 580 180",s,"Membraanpotentiaal bij depolarisatie en hyperpolarisatie");}),
  films:[["De spleet","films/zenuwstelsel/3-de-spleet.html"],["Knoeien met de synaps","films/zenuwstelsel/4-knoeien-met-de-spleet.html"]]});

E.zet(T,[10,11],{titel:"Rekenen met normen voor giftige stoffen",
  html:`<p>Normen voor stoffen in voedsel worden vaak gegeven in <b>mg per kg lichaamsgewicht</b>. Wil je weten hoeveel een persoon mag binnenkrijgen, dan vermenigvuldig je de norm met zijn gewicht. De hoeveelheid in een product (in mg per kg product) vermenigvuldig je met de massa van wat iemand eet. Let op de eenheden: reken grammen om naar kilogrammen.</p>
  <p>Er zijn twee soorten normen: één voor een <b>eenmalige</b> of kortdurende blootstelling (acute effecten) en één voor wat je <b>elke dag</b>, je hele leven lang, mag binnenkrijgen. Of een stof zich in het lichaam ophoopt, hangt af van hoe snel het lichaam hem afbreekt en uitscheidt.</p>`,
  films:[["Kun je onderzoek vertrouwen?","films/extra/kun-je-onderzoek-vertrouwen.html"]]});

E.zet(T,[12],{titel:"Natuurlijke selectie en resistentie",
  html:`<p>Binnen een populatie verschillen individuen erfelijk van elkaar (<b>genetische variatie</b>, door mutaties en recombinatie). Verandert het milieu, dan hebben sommige varianten meer overlevings- en voortplantingssucces dan andere: hun <b>fitness</b> is hoger. Hun allelen komen in de volgende generatie vaker voor. Dat is <b>natuurlijke selectie</b>.</p>
  <p>Een organisme ‘leert’ niet om resistent te worden: de erfelijke verschillen zijn er al, de omstandigheden bepalen welke varianten het best overleven en zich voortplanten.</p>`,
  films:[["Natuurlijke selectie","films/evolutie/2-natuurlijke-selectie.html"],["De mens als selectiefactor","films/evolutie/4-de-mens-als-selectiefactor.html"]]});

E.zet(T,[13],{titel:"Denaturatie: eiwitten en DNA",
  html:`<p>De werking van een <b>eiwit</b> hangt af van zijn ruimtelijke vorm. Die vorm wordt bij elkaar gehouden door zwakke bindingen (waterstofbruggen, ionbindingen). Bij te hoge temperatuur, of een te hoge of lage pH, raken die los: het eiwit <b>denatureert</b> en werkt niet meer. Bij welke temperatuur dat gebeurt, verschilt per eiwit.</p>
  <p>Ook <b>DNA</b> kan ‘denatureren’: dan laten de twee strengen los. De twee strengen worden bij elkaar gehouden door waterstofbruggen tussen de basenparen. Zoek op bij welke temperatuur de strengen loslaten: in het lab gebruik je dat bij het kopiëren van DNA.</p>`,
  films:[["Alles versneld","films/stofwisseling/1-alles-versneld.html"],["Wat is DNA?","films/dna/1-wat-is-dna.html"]]});

/* ---------- opgave 3 · bruinvis ---------- */
E.zet(T,[14,15],{titel:"Shotgun-sequencing: puzzelen met overlap",
  html:`<p>Bij shotgun-sequencing knip je het DNA willekeurig in stukjes en bepaal je van elk stukje de basenvolgorde. Daarna zoekt de computer stukjes die met hun uiteinden <b>overlappen</b> en legt ze als een puzzel achter elkaar.</p>
  <p>Twee dingen om op te letten:</p>
  <ul><li>DNA is <b>dubbelstrengs</b>. Een stukje kan van de ene streng komen, of van de <b>complementaire</b> streng. De strengen lopen <b>antiparallel</b>: de complementaire streng lees je van 5′ naar 3′ in tegengestelde richting.</li>
  <li>Hoe meer overlap, hoe zekerder de computer weet welke stukjes bij elkaar horen.</li></ul>`,
  anim:anim(caps(["Een stuk DNA met twee strengen. De bovenste loopt van 5′ naar 3′, de onderste andersom.","Een fragment van de onderste streng: 5′-CCAT-3′. Lees het van 5′ naar 3′ en het staat ‘achterstevoren’ ten opzichte van de bovenste streng.","Complementair maken en omdraaien: 5′-ATGG-3′. Dat stuk vind je terug in de bovenste streng."]),
    i=>{const top="GCATGGTA",bot="CGTACCAT";let s=`<text class="lblm" x="20" y="44">5′</text><text class="lblm" x="20" y="84">3′</text><text class="lblm" x="370" y="44">3′</text><text class="lblm" x="370" y="84">5′</text>`;
      [...top].forEach((b,k)=>{const x=50+k*40,on=i===2&&k>=2&&k<=5;s+=`<rect x="${x}" y="24" width="34" height="28" rx="4" fill="${on?"var(--goud)":"var(--surface)"}" stroke="var(--line2)"/><text class="lbl" x="${x+17}" y="43" text-anchor="middle">${b}</text>`;});
      [...bot].forEach((b,k)=>{const x=50+k*40,on=i>=1&&k>=2&&k<=5;s+=`<rect x="${x}" y="64" width="34" height="28" rx="4" fill="${on?"var(--teal)":"var(--surface)"}" opacity="${on?.7:1}" stroke="var(--line2)"/><text class="lbl" x="${x+17}" y="83" text-anchor="middle">${b}</text>`;});
      if(i>=1)s+=`<text class="lbl" x="210" y="120" text-anchor="middle">fragment: 5′-CCAT-3′${i===2?"  →  complementair en omgedraaid: 5′-ATGG-3′":""}</text>`;
      return E.svg("0 0 420 135",s,"Twee antiparallelle DNA-strengen en een fragment van de onderste streng");}),
  films:[["DNA lezen","films/dna/7-dna-lezen.html"],["Wat is DNA?","films/dna/1-wat-is-dna.html"]]});

E.zet(T,[16],{titel:"Een evolutionaire stamboom met tijdas",
  html:`<p>In een evolutionaire stamboom is elk <b>splitsingspunt</b> de laatste gemeenschappelijke voorouder van de takken erna. Staat er een tijdas onder, dan lees je af hoe lang geleden die voorouder leefde.</p>
  <ul><li>Twee soorten zijn nauwer verwant naarmate hun takken <b>recenter</b> (dichter bij nu) samenkomen.</li><li>Vanaf een splitsingspunt zijn de populaties genetisch gescheiden en gaan ze uit elkaar lopen.</li><li>Een eigenschap die een hele groep deelt, is waarschijnlijk ontstaan op de tak <b>vóór</b> de voorouder van die groep, maar <b>na</b> de splitsing met de dichtstbijzijnde soorten buiten de groep.</li></ul>`,
  films:[["Stambomen lezen","films/evolutie/8-stambomen-lezen.html"],["Hoe weten we dat?","films/evolutie/7-hoe-weten-we-dat.html"]]});

E.zet(T,[17,18],{titel:"Waterhuishouding: ADH en osmotische waarde",
  html:`<p>De <b>osmotische waarde</b> van het bloed hangt af van het aantal opgeloste deeltjes. Receptoren in de <b>hypothalamus</b> meten die waarde. De hypothalamus maakt het hormoon <b>ADH</b>; de achterkwab van de <b>hypofyse</b> geeft het af aan het bloed.</p>
  <p>ADH werkt in de nier op de <b>verzamelbuisjes</b>: het maakt hun wand beter doorlaatbaar voor water, zodat er meer water wordt teruggeresorbeerd.</p>
  <p>Een oplossing met méér opgeloste deeltjes dan een andere heet <b>hypertoon</b>, met minder <b>hypotoon</b>. Water gaat bij osmose naar de hypertone kant. Een dier dat opgeloste stoffen uitscheidt, verandert daarmee de osmotische waarde van zijn eigen lichaamsvloeistof.</p>`,
  anim:anim(caps(["De regelkring: de hypothalamus meet de osmotische waarde van het bloed.","De hypofyse geeft ADH af aan het bloed.","ADH werkt op de verzamelbuisjes: meer of minder water terug naar het bloed. Zo wordt de verandering tegengewerkt (negatieve terugkoppeling)."]),
    i=>E.svg("0 0 580 110",doos(10,36,150,"hypothalamus",i===0?"var(--goud)":"")+pijl(160,55,205,55)+doos(210,36,130,"hypofyse",i===1?"var(--goud)":"")+pijl(340,55,385,55)+doos(390,36,180,"verzamelbuisjes",i===2?"var(--goud)":"")+(i===2?`<path d="M480,76 q0,26 -230,26 q-150,0 -160,-26" fill="none" stroke="var(--teal)" stroke-width="2" stroke-dasharray="5 4"/><text class="lblm" x="290" y="98" text-anchor="middle">terugkoppeling via de osmotische waarde</text>`:""),"Regelkring van ADH")),
  films:[["Water in balans","films/hormonen/5-water-in-balans.html"],["Uitscheiding en evenwicht","films/gaswisseling/3-uitscheiding-en-evenwicht.html"],["Diffusie en osmose","films/cellen/diffusie-osmose/index.html"]]});

E.zet(T,[19],{titel:"Hoe een nieuwe soort ontstaat",
  html:`<p>Bij <b>soortvorming</b> spelen drie dingen samen:</p>
  <ul><li><b>Variatie</b>: door mutaties en recombinatie verschillen individuen erfelijk.</li><li><b>Selectie</b>: in een nieuw milieu krijgen individuen met gunstige eigenschappen meer nakomelingen.</li><li><b>Isolatie</b>: twee populaties planten zich niet meer met elkaar voort (bijvoorbeeld door een barrière of een ander leefgebied). Daardoor vermengen hun genen niet meer en lopen de populaties steeds verder uiteen.</li></ul>
  <p>Zijn de verschillen zo groot dat ze zich niet meer met elkaar kunnen voortplanten, dan zijn het twee soorten.</p>`,
  films:[["Hoe één soort er twee wordt","films/evolutie/6-hoe-een-soort-er-twee-wordt.html"],["Natuurlijke selectie","films/evolutie/2-natuurlijke-selectie.html"]]});

/* ---------- opgave 4 · warkruid ---------- */
E.zet(T,[20],{titel:"Fotosynthese en dissimilatie: welke deelprocessen?",
  html:`<p><b>Fotosynthese</b> (in de bladgroenkorrels) bestaat uit twee delen: de <b>lichtreacties</b> in de thylakoïden (licht vangen met chlorofyl, water splitsen, ATP en NADPH maken) en de <b>calvincyclus</b> in het stroma (CO<sub>2</sub> vastleggen tot suikers).</p>
  <p>De <b>aerobe dissimilatie</b> breekt glucose af om ATP te maken: glycolyse (cytoplasma), dan de <b>citroenzuurcyclus</b> en de <b>oxidatieve fosforylering</b> (elektronentransportketen) in de mitochondriën. Elke levende cel, ook van een plant, heeft dissimilatie nodig.</p>`,
  films:[["Alles in het groen","films/stofwisseling/3-alles-in-het-groen.html"],["Alles op adem","films/stofwisseling/2-alles-op-adem.html"]]});

E.zet(T,[21,22,23],{titel:"Genexpressie remmen met klein RNA",
  html:`<p>Genexpressie heeft twee stappen: <b>transcriptie</b> (DNA → mRNA, in de kern) en <b>translatie</b> (mRNA → eiwit, bij de ribosomen).</p>
  <p>Bij <b>RNA-interferentie</b> binden kleine RNA-moleculen (miRNA of siRNA, ± 22 nucleotiden) samen met een eiwitcomplex aan een molecuul met een complementaire basenvolgorde. Zoek in je boek op welk molecuul dat is en wat er daarna mee gebeurt.</p>
  <p>Planten gebruiken RNA-interferentie zelf ook, bijvoorbeeld in hun afweer. Een <b>mutatie</b> in een gen verandert het eiwit dat ervan gemaakt wordt, of zorgt dat er geen werkend eiwit meer is.</p>
  <p>In de <b>bastvaten</b> (floëem) stroomt een suikerrijke oplossing van de bladeren naar de rest van de plant. Bij een beschadiging sluiten planten de bastvaten snel af om het lek te stoppen.</p>`,
  films:[["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"],["Van DNA naar eiwit","films/dna/3-van-dna-naar-eiwit.html"],["Transport in planten","films/transport/6-transport-in-planten.html"]]});

E.zet(T,[24],{titel:"Een goed controle-experiment",
  html:`<p>In een experiment verander je één factor (de <b>onafhankelijke variabele</b>) en meet je het effect. Een <b>controle-experiment</b> is hetzelfde experiment waarin alleen die ene factor ontbreekt. Verschilt de uitkomst, dan weet je dat het door die factor komt.</p>
  <p>Wil je bewijzen dat iets via een bepaalde <b>route</b> gaat, dan moet je ook andere mogelijke routes uitsluiten. Vraag jezelf: langs welke wegen kan het effect nog meer ontstaan? Haal in het controle-experiment precies de route weg die je wilt testen, en houd al het andere gelijk.</p>
`,
  films:[["Onderzoek doen in de biologie","films/cellen/onderzoek-doen/index.html"]]});

E.zet(T,[26],{titel:"Parasieten en signaalstoffen",
  html:`<p>Een <b>parasiet</b> leeft ten koste van een levende gastheer: hij haalt zijn voedingsstoffen uit die gastheer. Warkruid is een parasiet die zelf vrijwel geen fotosynthese doet.</p>
  <p>Planten die worden aangevreten, maken <b>signaalstoffen</b> zoals jasmijnzuur. Die zetten de <b>afweer</b> tegen vraat aan, bijvoorbeeld de productie van stoffen die insecten afschrikken of hun vertering remmen.</p>`,
  films:[["Waar past een soort?","films/ecologie/2-waar-past-een-soort.html"]]});

E.zet(T,[25],{titel:"Hout en bast in blad, stengel en wortel",
  html:`<p>Een <b>vaatbundel</b> bevat houtvaten (xyleem: water en zouten omhoog) en bastvaten (floëem: suikers en andere stoffen). Houtvaten zijn in een doorsnede vaak te herkennen aan hun <b>grote, dikwandige</b> holtes; bastvaten zijn kleiner en dunwandig.</p>
  <p>Herken eerst het <b>orgaan</b>: een wortel heeft één centrale cilinder met de vaten in het midden; een stengel heeft vaatbundels in een kring vlak onder de opperhuid; een blad is plat met een vaatbundel in de nerf. De ligging van hout en bast in een vaatbundel is in elk orgaan vast. Zoek die op in een doorsnede in je informatieboek of in je boek, en bedenk dat de vaatbundels van stengel en blad op elkaar aansluiten.</p>`,
  films:[["Transport in planten","films/transport/6-transport-in-planten.html"],["Hoe een plant groeit","films/transport/7-hoe-een-plant-groeit.html"]]});

/* ---------- opgave 5 · gene drive ---------- */
E.zet(T,[27,28,29],{titel:"Relaties tussen soorten",
  html:`<p><b>Symbiose</b> is een nauwe relatie tussen twee soorten. Er zijn drie vormen:</p>
  <ul><li><b>mutualisme</b>: beide hebben er voordeel van;</li><li><b>commensalisme</b>: de één heeft voordeel, de ander geen voor- of nadeel;</li><li><b>parasitisme</b>: de één heeft voordeel ten koste van de ander.</li></ul>
  <p>Twee soorten die nauw samenleven, oefenen selectiedruk op elkaar uit. Een verandering bij de één verandert de omstandigheden voor de ander. Zo kunnen soorten over vele generaties steeds beter op elkaar afgestemd raken.</p>
`,
  films:[["Waar past een soort?","films/ecologie/2-waar-past-een-soort.html"],["Vormen van selectie","films/evolutie/3-vormen-van-selectie.html"]]});

E.zet(T,[30],{titel:"De bloedsomloop: grote en kleine kringloop",
  html:`<p>De mens heeft een <b>dubbele bloedsomloop</b>. Bloed uit het lichaam komt via de holle aders in de <b>rechterhelft</b> van het hart, gaat via de longslagader naar de longen (<b>kleine bloedsomloop</b>) en komt via de longaders terug in de <b>linkerhelft</b>. Van daaruit pompt het hart het via de <b>aorta</b> het lichaam in (<b>grote bloedsomloop</b>).</p>
  <p>Vanuit de aorta vertakken slagaders naar alle organen. Het bloed uit de darmen gaat niet direct terug naar het hart: het loopt eerst via de <b>poortader</b> naar een ander orgaan. Zoek in je informatieboek op welke bloedvaten de lever aanvoeren.</p>`,
  anim:anim(caps(["Vanuit een lichaamsdeel gaat het bloed via aderen naar het hart.","Rechterhelft → longen → linkerhelft: de kleine bloedsomloop.","Vanuit de linkerhelft via de aorta naar de organen."]),
    i=>E.svg("0 0 580 150",doos(10,56,110,"lichaam",i===0?"var(--goud)":"")+pijl(120,75,160,75)+doos(165,56,90,"rechts",i===1?"var(--goud)":"")+pijl(210,56,210,26)+doos(165,0,90,"longen",i===1?"var(--goud)":"")+pijl(255,19,300,56)+doos(290,56,80,"links",i===1?"var(--goud)":"")+pijl(370,75,400,75)+doos(405,56,70,"aorta",i===2?"var(--goud)":"")+pijl(475,75,505,75)+doos(495,56,80,"organen",i===2?"var(--goud)":""),"Schema van de bloedsomloop van lichaam via hart en longen naar de aorta en de organen")),
  films:[["Eén pomp, twee rondjes","films/transport/1-een-pomp-twee-rondjes.html"]]});

E.zet(T,[31,32],{titel:"Aspecifieke en specifieke afweer",
  html:`<p>De <b>aspecifieke afweer</b> werkt tegen alles wat lichaamsvreemd is: huid, slijmvliezen, ontstekingsreactie en fagocyten zoals <b>macrofagen</b>. Macrofagen zijn daarnaast <b>antigeen-presenterende cellen</b>: ze tonen stukjes van een opgenomen ziekteverwekker aan T-helpercellen en zetten zo de specifieke afweer in gang.</p>
  <p>De <b>specifieke afweer</b> herkent één bepaald antigeen: B-cellen (antistoffen) en T-cellen (receptoren) passen precies op één antigeen.</p>
  <p>Elke lichaamscel met een kern heeft <b>MHC-I</b>-moleculen in zijn celmembraan. Daarin laat de cel stukjes zien van de eiwitten die hij zelf maakt. Cytotoxische T-cellen controleren die stukjes met hun receptor.</p>`,
  films:[["De eerste verdediging","films/afweer/1-de-eerste-verdediging.html"],["T-cellen en virussen","films/afweer/3-t-cellen-en-virussen.html"],["Antistoffen op maat","films/afweer/2-antistoffen-op-maat.html"]]});

E.zet(T,[33,34],{titel:"Rode bloedcellen, lever en bilirubine",
  html:`<p>Rode bloedcellen leven ongeveer 120 dagen. Oude rode bloedcellen worden afgebroken in de milt en de <b>lever</b>. Het hemoglobine wordt daarbij omgezet in de gele kleurstof <b>bilirubine</b>, die de lever met de gal uitscheidt naar de darm.</p>
  <p>Gaat er iets mis in deze route, dan hoopt bilirubine zich op in het bloed en de weefsels: de huid en het oogwit worden geel. Dat heet <b>geelzucht</b>.</p>
  <p>Bij een ziekteverwekker die zich in fasen vermenigvuldigt, ontstaan ziekteverschijnselen vaak op het moment dat er veel nieuwe exemplaren tegelijk vrijkomen. Bekijk in de levenscyclus welke stap met dat vrijkomen samenvalt.</p>`,
  films:[["De lever als fabriek","films/voeding/5-de-lever-als-fabriek.html"],["Wat er in je bloed zit","films/transport/3-wat-er-in-je-bloed-zit.html"]]});

E.zet(T,[35,36],{titel:"Splicing en merkergenen",
  html:`<p>Na de transcriptie is het RNA nog <b>pre-mRNA</b>. Daaruit worden de <b>introns</b> geknipt en de <b>exons</b> aan elkaar gezet: <b>splicing</b>. Bij <b>alternatieve splicing</b> worden in verschillende cellen of situaties andere stukken als exon bewaard. Zo kan één gen coderen voor meer varianten van een eiwit.</p>
  <p>Een <b>promotor</b> en <b>transcriptiefactoren</b> regelen of en hoe vaak een gen wordt overgeschreven.</p>`,
  anim:anim(caps(["Pre-mRNA: exons (blokken) en introns (lijnen).","Bij splicing gaan de introns eruit en worden de exons aan elkaar gezet: mRNA."]),
    i=>{let s="";const ex=[[20,60],[140,60],[260,60],[380,60]];
      if(i===0){s+=`<line x1="10" y1="50" x2="460" y2="50" stroke="var(--text2)" stroke-width="2"/>`;ex.forEach(([x,w])=>s+=`<rect x="${x}" y="38" width="${w}" height="24" fill="var(--teal)" opacity=".7" stroke="var(--text)"/>`);}
      else ex.forEach(([x,w],k)=>s+=`<rect x="${20+k*60}" y="38" width="60" height="24" fill="var(--teal)" opacity=".7" stroke="var(--text)"/>`);
      return E.svg("0 0 480 90",s,i?"mRNA na splicing":"Pre-mRNA met exons en introns");}),
  films:[["Van DNA naar eiwit","films/dna/3-van-dna-naar-eiwit.html"],["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"]]});

E.zet(T,[37],{titel:"Gelelektroforese lezen",
  html:`<p>Bij <b>gelelektroforese</b> zet je DNA-fragmenten in putjes (de opbrengplaats) en laat je ze door een gel bewegen. Kleine fragmenten bewegen sneller en komen <b>verder</b>; grote fragmenten blijven dichter bij de opbrengplaats.</p>
  <p>Vermenigvuldig je één stuk van een gen bij een individu, dan krijg je een band per <b>verschillende lengte</b> van dat stuk. Een homozygoot heeft twee allelen van dezelfde lengte: één band. Een heterozygoot met allelen van verschillende lengte: twee banden.</p>`,
  films:[["Op lengte gesorteerd · gelelektroforese","films/dna-technieken/2-op-lengte-gesorteerd/index.html"]]});

E.zet(T,[38,39],{titel:"Allelen doorgeven en een allel dat zich kopieert",
  html:`<p>Een diploïd organisme heeft van elk autosoom twee homologen. Bij de meiose krijgt elke geslachtscel er één van. Een heterozygoot (Aa) geeft dus normaal aan de helft van zijn geslachtscellen A en aan de helft a. </p>
  <p>Een <b>gene drive</b> doorbreekt die regel: het construct knipt het homologe chromosoom op dezelfde plek, en de cel repareert de breuk met het construct als voorbeeld. Gebeurt dat in de voorlopers van de geslachtscellen, dan krijgen (vrijwel) alle geslachtscellen het construct.</p>
`,
  films:[["Monohybride kruisingen","films/erfelijkheid/2-monohybride-kruisingen.html"],["CRISPR: wat doet dit gen?","films/vervolg/biomedisch-2-crispr-wat-doet-dit-gen.html"],["Toeval en uitwisseling","films/evolutie/5-toeval-en-uitwisseling.html"]]});

/* ---------- opgave 6 · mosselen ---------- */
E.zet(T,[40],{titel:"Productie en koolstofvastlegging",
  html:`<p><b>Bruto primaire productie</b> is alle organische stof die producenten met fotosynthese maken. Een deel verbruiken ze zelf bij hun dissimilatie; wat overblijft is de <b>netto primaire productie</b> (NPP): de nieuwe biomassa.</p>
  <p>Of de koolstof in die biomassa <b>vastgelegd blijft</b>, hangt af van wat er daarna met de biomassa gebeurt. Volg in de koolstofkringloop waar de koolstof van de producenten naartoe kan gaan.</p>`,
  films:[["Koolstof gaat rond","films/ecologie/6-koolstof-gaat-rond.html"],["Waarom zo weinig roofdieren?","films/ecologie/5-waarom-zo-weinig-roofdieren.html"]]});

E.zet(T,[41,42],{titel:"Fytoplankton meten en wat de groei beperkt",
  html:`<p><b>Fytoplankton</b> bestaat uit microscopisch kleine algen en cyanobacteriën die aan fotosynthese doen. <b>Zoöplankton</b> bestaat uit kleine diertjes die van ander plankton leven.</p>
  <p>Voor fotosynthese en groei heeft fytoplankton licht, CO<sub>2</sub> en mineralen (zoals nitraat en fosfaat) nodig. De factor die het meest tekortschiet, beperkt de groei: de <b>beperkende factor</b>.</p>`,
  films:[["Wie eet wie?","films/ecologie/3-wie-eet-wie.html"],["Stikstof gaat rond","films/ecologie/7-stikstof-gaat-rond.html"]]});

E.zet(T,[43],{titel:"Eutrofiëring en zuurstof",
  html:`<p>Bij <b>eutrofiëring</b> komen veel mineralen in het water. Daardoor kan fytoplankton explosief groeien: <b>waterbloei</b>. Dode organismen en hun resten (<b>detritus</b>) worden afgebroken door <b>reducenten</b> (bacteriën, schimmels).</p>
  <p><b>Mosselen</b> zijn filtreerders: ze pompen water door hun kieuwen en halen er voedseldeeltjes uit. In een stikstofkringloop zie je aan de pijlen wie wat eet en waar de stikstof naartoe gaat.</p>`,
  films:[["Stikstof gaat rond","films/ecologie/7-stikstof-gaat-rond.html"],["Waar blijft het blad?","films/ecologie/4-waar-blijft-het-blad.html"]]});
})();
