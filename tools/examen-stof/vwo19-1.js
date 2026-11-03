/* Uitleg van de stof · oefenexamen vwo 2019 tijdvak 1 (tool vwo19-1). Wordt door samenvoegen.py gekopieerd naar tools/examen-stof/vwo19-1.js. */
(function(){
"use strict";
const E=window.EXSTOF, T="vwo19-1";if(!E)return;
const caps=a=>a.map(c=>({cap:c}));
const anim=(steps,draw)=>box=>E.stappen(box,steps,(st,s,i)=>{st.innerHTML=draw(i,s);});
const doos=(x,y,w,t,kl,h)=>`<rect x="${x}" y="${y}" width="${w}" height="${h||38}" rx="10" fill="var(--surface)" stroke="${kl||"var(--line2)"}" stroke-width="1.6"/><text class="lbl" x="${x+w/2}" y="${y+(h||38)/2+5}" text-anchor="middle">${t}</text>`;
const pijl=(x1,y1,x2,y2,kl)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${kl||"var(--text2)"}" stroke-width="1.8"/><circle cx="${x2}" cy="${y2}" r="3.5" fill="${kl||"var(--text2)"}"/>`;

/* ---------- opgave 1 ---------- */
E.zet(T,[1],{titel:"Regeling van de ademhaling",
  html:`<p>De ademhaling is een <b>regelkring</b> met negatieve terugkoppeling. <b>Sensoren</b> (chemoreceptoren) meten de samenstelling van het bloed. Het <b>ademcentrum</b> in de hersenstam vergelijkt dat met de normwaarde en stuurt de ademhalingsspieren aan.</p>
  <p>Belangrijke bloedwaarden zijn de pO<sub>2</sub>, de pCO<sub>2</sub> en de pH (CO<sub>2</sub> vormt in het bloed koolzuur). Wijkt een waarde af, dan wordt de ademprikkel sterker of zwakker. Waar de chemoreceptoren precies zitten, vind je in Binas (regeling van de ademhaling).</p>`,
  anim:anim(caps(["Een bloedwaarde wijkt af van de norm.","Chemoreceptoren meten dat en melden het aan het ademcentrum.","Het ademcentrum laat de ademhalingsspieren harder werken.","Door de ventilatie gaat de bloedwaarde terug naar de norm: negatieve terugkoppeling."]),
    i=>E.svg("0 0 560 150",doos(20,56,130,"bloedwaarde",i===0||i===3?"var(--goud)":"")+doos(215,56,130,"ademcentrum",i===1?"var(--goud)":"")+doos(410,56,130,"ademspieren",i===2?"var(--goud)":"")+
      pijl(150,75,212,75)+pijl(345,75,407,75)+`<path d="M475,96 V130 H85 V97" stroke="${i===3?"var(--goud)":"var(--text3)"}" stroke-width="1.6" fill="none" stroke-dasharray="5 4"/><text x="280" y="146" class="lblm" text-anchor="middle">ventilatie herstelt de waarde</text><text x="180" y="50" class="lblm" text-anchor="middle">sensor</text>`,"Regelkring van de ademhaling")),
  films:[["Adem in, adem uit","films/gaswisseling/1-adem-in-adem-uit.html"],["Gas op reis","films/gaswisseling/2-gas-op-reis.html"]]});

E.zet(T,[2,4,5],{titel:"Ademhalingsbewegingen en longvolumes",
  html:`<p>Lucht stroomt van hoge naar lage druk. Wordt de borstholte <b>groter</b>, dan daalt de druk in de longen en stroomt lucht naar binnen. Wordt hij <b>kleiner</b>, dan stroomt lucht naar buiten.</p>
  <ul><li><b>Middenrif</b>: trekt samen en wordt platter (buikademhaling).</li><li><b>Tussenribspieren</b>: de ene laag tilt de ribben op, de andere laag trekt ze omlaag (borstademhaling).</li><li><b>Hulpademhalingsspieren</b> (bv. in de hals en de buik) helpen bij een extra krachtige in- of uitademing.</li></ul>
  <p>De long ‘plakt’ via het <b>longvlies</b>, de vloeistof in de interpleurale ruimte en het <b>borstvlies</b> aan de borstwand. Daardoor beweegt hij mee met de borstkas.</p>
  <p><b>Longvolumes</b>: het <i>ademvolume</i> is een gewone teug, de <i>vitale capaciteit</i> de grootste teug die je kunt in- en uitademen, het <i>restvolume</i> de lucht die er altijd in blijft. Vitale capaciteit + restvolume = <i>totale longcapaciteit</i>.</p>`,
  anim:anim(caps(["Totale longcapaciteit: alle lucht die er maximaal in kan.","Het restvolume blijft er na maximaal uitademen nog in.","De vitale capaciteit is wat je maximaal kunt verversen."]),
    i=>{const b=(y,h,t,on)=>`<rect x="200" y="${y}" width="160" height="${h}" fill="${on?"var(--goud-soft)":"var(--surface2)"}" stroke="${on?"var(--goud)":"var(--line2)"}" stroke-width="1.6"/><text x="280" y="${y+h/2+5}" class="lbl" text-anchor="middle">${t}</text>`;
      return E.svg("0 0 560 200",b(10,130,"vitale capaciteit",i===2)+b(140,45,"restvolume",i===1)+`<path d="M380,10 h10 V185 h-10" stroke="${i===0?"var(--goud)":"var(--text3)"}" stroke-width="1.6" fill="none"/><text x="400" y="100" class="lblm">totale</text><text x="400" y="116" class="lblm">longcapaciteit</text>`,"Opbouw van de longvolumes");}),
  films:[["Adem in, adem uit","films/gaswisseling/1-adem-in-adem-uit.html"]]});

E.zet(T,[3],{titel:"Gaswisseling en de wet van Fick",
  html:`<p>In de longblaasjes gaan O<sub>2</sub> en CO<sub>2</sub> door <b>diffusie</b> tussen lucht en bloed. Hoe snel dat gaat, beschrijft de <b>wet van Fick</b>:</p>
  <p style="text-align:center"><b>diffusiesnelheid ∝ oppervlak × concentratieverschil / afstand</b></p>
  <p>Bekijk bij een figuur van weefsel dus wat er gebeurt met elk van die drie factoren.</p>`,
  films:[["Gas op reis","films/gaswisseling/2-gas-op-reis.html"],["Diffusie en osmose","films/cellen/diffusie-osmose/index.html"]]});

E.zet(T,[6],{titel:"Aspecifieke en specifieke afweer",
  html:`<p><b>Aspecifieke afweer</b> werkt tegen alles wat lichaamsvreemd is: huid en slijmvliezen, ontstekingsreactie, en fagocyten die ziekteverwekkers opnemen en afbreken.</p>
  <p><b>Specifieke afweer</b> richt zich op één antigeen. Een <b>antigeenpresenterende cel</b> (APC) laat stukjes antigeen zien aan T-helpercellen. Die geven cytokinen af en activeren B-cellen (antistoffen) en cytotoxische T-cellen.</p>
  <p>Monocyten circuleren in het bloed en worden in de weefsels macrofagen.</p>`,
  anim:anim(caps(["Een APC neemt een ziekteverwekker op.","De APC presenteert stukjes antigeen aan een T-helpercel.","De T-helpercel activeert B-cellen en cytotoxische T-cellen."]),
    i=>E.svg("0 0 560 120",doos(20,40,130,"APC",i===0?"var(--goud)":"")+doos(215,40,130,"T-helpercel",i===1?"var(--goud)":"")+doos(410,14,130,"B-cel",i===2?"var(--goud)":"",34)+doos(410,66,130,"Tc-cel",i===2?"var(--goud)":"",34)+pijl(150,59,212,59)+pijl(345,55,407,31)+pijl(345,63,407,83),"Activatie van de specifieke afweer")),
  films:[["De eerste verdediging","films/afweer/1-de-eerste-verdediging.html"],["T-cellen en virussen","films/afweer/3-t-cellen-en-virussen.html"]]});

/* ---------- opgave 2 ---------- */
E.zet(T,[7],{titel:"Allergie",
  html:`<p>Bij een allergie reageert het afweersysteem op een onschuldig antigeen (allergeen). Bij het <b>eerste contact</b> maken plasmacellen <b>IgE</b>-antistoffen. Die gaan op <b>mestcellen</b> zitten: de mestcellen zijn dan <i>gesensibiliseerd</i>. Je merkt nog niets.</p>
  <p>Bij een <b>volgend contact</b> bindt het allergeen aan de IgE op de mestcellen. Die geven dan <b>mediatoren</b> af, zoals histamine: vaten verwijden en lekken, gladde spieren trekken samen.</p>
  <p>Een antiserum uit een paard bevat paardeneiwitten: voor jouw lichaam lichaamsvreemd.</p>`,
  films:[["Vaccins, allergie en bloedgroepen","films/afweer/4-vaccins-allergie-en-bloedgroepen.html"]]});

E.zet(T,[8,9],{titel:"Receptoren, ionkanalen en de impuls",
  html:`<p>Een neuron heeft in rust een <b>rustpotentiaal</b> van ongeveer −70 mV: binnen negatief ten opzichte van buiten. Buiten is veel Na<sup>+</sup>, binnen veel K<sup>+</sup>.</p>
  <p>Gaan er ionkanalen open, dan stromen ionen met hun concentratie- en ladingsverschil mee. Komt er <b>positieve lading naar binnen</b>, dan wordt de binnenkant minder negatief: <b>depolarisatie</b>. Wordt de binnenkant juist negatiever, dan heet dat <b>hyperpolarisatie</b>. Bereikt de depolarisatie de drempelwaarde, dan ontstaat een <b>actiepotentiaal</b> (impuls).</p>
  <p>Een kanaal kan open gaan door een <i>ligand</i>: een stof die aan het kanaaleiwit bindt.</p>
  <p>Pijnreceptoren zijn uiteinden van sensorische neuronen.</p>`,
  anim:anim(caps(["Rust: binnen −70 mV.","Kanalen gaan open, positieve ionen stromen naar binnen.","De binnenkant wordt minder negatief: depolarisatie. Boven de drempel: impuls."]),
    i=>{const y=[150,150,40][i];return E.svg("0 0 560 190",`<line x1="40" x2="520" y1="100" y2="100" stroke="var(--line2)" stroke-dasharray="4 4"/><text x="525" y="104" class="lblm">drempel</text><line x1="40" x2="520" y1="150" y2="150" stroke="var(--line2)"/><text x="525" y="154" class="lblm">−70</text><path d="M40,150 H200 ${i>=1?"L260,"+(i===1?120:100)+(i===2?" L280,30 L310,165 L360,150":""):""} H520" stroke="var(--goud)" stroke-width="2.4" fill="none"/>`,"Membraanpotentiaal tijdens depolarisatie");}),
});

E.zet(T,[10,11],{titel:"Banen in het zenuwstelsel",
  html:`<p>Een gevoelsimpuls volgt een vaste weg: <b>receptor → sensorisch neuron → schakelneuron(en) → hersenschors</b>. Het cellichaam van een sensorisch neuron ligt in de <b>spinale knoop</b>, net buiten het ruggenmerg. De sensorische baan komt via de <b>achterwortel</b> het ruggenmerg in.</p>
  <p>Een opdracht naar een spier gaat de andere kant op: <b>motorische schors → schakelneuron(en) → motorisch neuron</b> (cellichaam in de voorhoorn) → spier.</p>
  <p>De meeste banen <b>kruisen</b>: de linkerhersenhelft verwerkt de rechterkant van het lichaam en omgekeerd.</p>
  <p>In de gevoelsschors en de motorische schors heeft elk lichaamsdeel een vaste plek (de ‘homunculus’): de benen en voeten bij de middenlijn bovenin, romp, arm, hand en gezicht steeds verder opzij.</p>
`});

E.zet(T,[12,13],{titel:"Een experiment lezen",
  html:`<p>Een goed experiment heeft een <b>controlegroep</b>: alles hetzelfde, behalve de factor die je onderzoekt. Zo zie je wat het effect is van alleen die factor (en niet van bv. het hanteren of prikken van het dier).</p>
  <p>Een <b>nulmeting</b> is een meting voordat je iets verandert.</p>
  <p>Trek alleen conclusies die de proef echt kan dragen: kijk goed welke omstandigheden gelijk waren en welke niet.</p>`,
  films:[["Onderzoek doen","films/cellen/onderzoek-doen/index.html"],["Kun je onderzoek vertrouwen?","films/extra/kun-je-onderzoek-vertrouwen.html"]]});

E.zet(T,[14,15],{titel:"Van gen naar eiwit, en cDNA",
  html:`<p>Bij eukaryoten wordt een gen eerst overgeschreven tot <b>pre-mRNA</b> met exons en introns. Bij <b>splicing</b> worden de introns eruit geknipt: dan heb je <b>rijp mRNA</b>. Splicing gebeurt in de kern van eukaryote cellen.</p>
  <p><b>Reverse transcriptase</b> maakt van RNA een DNA-kopie: <b>cDNA</b>.</p>
`,
  anim:anim(caps(["Gen met exons en introns.","Pre-mRNA: alles is overgeschreven.","Splicing: de introns gaan eruit, rijp mRNA blijft over."]),
    i=>{const ex=["E1","E2","E3"];let s="";const y=[30,30,30];
      const seg=(x,w,t,ex,y)=>`<rect x="${x}" y="${y}" width="${w}" height="30" fill="${ex?"var(--teal-soft)":"var(--surface2)"}" stroke="${ex?"var(--teal)":"var(--line2)"}"/><text x="${x+w/2}" y="${y+20}" class="lblm" text-anchor="middle">${t}</text>`;
      if(i<2)s=seg(40,100,"exon",1,50)+seg(140,80,"intron",0,50)+seg(220,100,"exon",1,50)+seg(320,80,"intron",0,50)+seg(400,100,"exon",1,50)+`<text x="40" y="40" class="lbl">${i===0?"DNA (gen)":"pre-mRNA"}</text>`;
      else s=seg(130,100,"exon",1,50)+seg(230,100,"exon",1,50)+seg(330,100,"exon",1,50)+`<text x="130" y="40" class="lbl">rijp mRNA</text>`;
      return E.svg("0 0 560 100",s,"Splicing van pre-mRNA");}),
  films:[["Van DNA naar eiwit","films/dna/3-van-dna-naar-eiwit.html"],["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"]]});

/* ---------- opgave 3 ---------- */
E.zet(T,[16,17,18],{titel:"Evolutie: wat verandert een genenpool?",
  html:`<p>De allelfrequenties in een populatie veranderen door:</p>
  <ul><li><b>mutatie</b>: nieuwe allelen ontstaan;</li><li><b>selectie</b> (natuurlijk of kunstmatig): dragers van bepaalde allelen krijgen meer nakomelingen;</li><li><b>toeval</b>: genetic drift, het founder effect (een klein groepje sticht een nieuwe populatie) en het flessenhalseffect (een populatie krimpt sterk);</li><li><b>gene flow</b>: migratie van individuen (of hun allelen) tussen populaties.</li></ul>
  <p>Populaties die gescheiden leven, wisselen geen allelen uit en kunnen daardoor steeds meer van elkaar gaan verschillen.</p>
  <p>Hoe meer <b>genetische variatie</b> een populatie heeft, hoe groter de kans dat er individuen zijn die in een nieuwe situatie goed overleven.</p>`,
  films:[["Toeval en uitwisseling","films/evolutie/5-toeval-en-uitwisseling.html"],["De mens als selectiefactor","films/evolutie/4-de-mens-als-selectiefactor.html"]]});

E.zet(T,[19],{titel:"Energiestroom door een dier",
  html:`<p>Van de energie die een dier opneemt (<b>I</b>) wordt een deel niet verteerd en verlaat het lichaam als <b>feces</b> (F). De rest wordt opgenomen: de <b>assimilatie</b> (A = I − F).</p>
  <p>Van A gaat een groot deel op aan <b>respiratie</b> (R): de dissimilatie voor beweging, warmteproductie, onderhoud en herstel. Wat overblijft is de <b>productie</b> (P = A − R): groei en voortplanting.</p>
  <p>Voor een veehouder is P het nuttige deel. Hoe kleiner R en F, hoe gunstiger de conversie van voer naar vlees.</p>`,
  anim:anim(caps(["Inname I.","Een deel verlaat het dier als feces F.","Assimilatie A = I − F.","Respiratie R gaat verloren als warmte en beweging; productie P = A − R."]),
    i=>E.svg("0 0 560 150",doos(20,56,90,"I",i===0?"var(--goud)":"")+(i>=1?doos(160,100,90,"F",i===1?"var(--goud)":"")+pijl(110,80,158,112):"")+(i>=2?doos(160,10,90,"A",i===2?"var(--goud)":"")+pijl(110,66,158,32):"")+(i>=3?doos(320,10,90,"R","var(--goud)")+doos(320,100,90,"P","var(--goud)")+pijl(250,26,318,26)+pijl(250,36,318,112):""),"Energiestroom I, F, A, R, P")),
  films:[["Waarom zo weinig roofdieren?","films/ecologie/5-waarom-zo-weinig-roofdieren.html"]]});

E.zet(T,[20,21,22],{titel:"Meiose, koppeling en terugkruisen",
  html:`<p>In de meiose wordt het aantal chromosomen gehalveerd. Een nakomeling krijgt van elke ouder de <b>helft</b> van zijn chromosomen. Gemiddeld komt dus de helft van zijn genoom van zijn vader en de helft van zijn moeder.</p>
  <p>Genen op <b>hetzelfde chromosoom</b> zijn gekoppeld: ze gaan meestal samen naar dezelfde gameet. In de profase van meiose I kunnen homologe chromosomen stukken uitwisselen; daardoor kunnen nieuwe combinaties ontstaan.</p>
  <p>Mitochondriën liggen in het cytoplasma. Bij zoogdieren levert de eicel (vrijwel) al het cytoplasma van de zygote.</p>`,
  anim:anim(caps(["Een ouder met 100% genoom van ras X krijgt jongen met een ouder met 0%.","Elk jong krijgt de helft van elke ouder: gemiddeld (100 + 0) / 2 = 50% van ras X."]),
    i=>{const rond=(cx,fr,t)=>`<circle cx="${cx}" cy="60" r="30" fill="var(--surface)" stroke="var(--text)" stroke-width="1.6"/>`+(fr>=1?`<circle cx="${cx}" cy="60" r="30" fill="var(--teal)"/>`:fr>0?`<path d="M${cx},60 L${cx},30 A30,30 0 0 1 ${cx+30*Math.sin(2*Math.PI*fr)},${60-30*Math.cos(2*Math.PI*fr)} Z" fill="var(--teal)"/>`:"")+`<text x="${cx}" y="110" class="lblm" text-anchor="middle">${t}</text>`;
      return E.svg("0 0 560 130",rond(80,1,"ouder 100%")+rond(220,0,"ouder 0%")+(i?pijl(260,60,380,60)+rond(440,.5,"jong 50%"):""),"Gemiddeld aandeel van een ras na kruising");}),
  films:[["Dihybride kruising en gekoppelde overerving","films/erfelijkheid/4-dihybride-kruising-en-gekoppelde-overerving.html"],["Overerving via X-chromosomen en mitochondriën","films/erfelijkheid/5-overerving-via-x-chromosomen-en-mitochondrien.html"]]});

E.zet(T,[23,24,25],{titel:"Veredelen met DNA-markers en genetische modificatie",
  html:`<p>Een <b>genetische marker</b> is een herkenbaar stukje DNA op een bekende plek. Met een DNA-test kun je bij een levend dier zien welke variant van dat stukje het heeft, en dus van welke ouder of welk ras dat deel van een chromosoom komt. Markers die dicht bij een gen liggen, erven meestal samen met dat gen over.</p>
  <p><b>Genetische modificatie</b>: het DNA van een organisme veranderen met DNA-technieken (recombinant-DNA). Komt het ingebrachte gen uit dezelfde of een kruisbare soort, dan heet het organisme <b>cisgeen</b>; komt het uit een niet-kruisbare soort, dan <b>transgeen</b>.</p>`,
  films:[["Op maat gekopieerd","films/dna-technieken/1-op-maat-gekopieerd/index.html"],["Wat heb jij aan DNA?","films/dna/8-wat-heb-jij-aan-dna.html"]]});

/* ---------- opgave 4 ---------- */
E.zet(T,[26],{titel:"Bescherming in het spijsverteringskanaal",
  html:`<p>Het spijsverteringskanaal staat in open verbinding met de buitenwereld. Het lichaam beschermt zich op verschillende <b>organisatieniveaus</b>:</p>
  <ul><li><b>moleculair</b>: een bepaalde stof doet het werk (denk aan wat er in de sappen van de verteringsorganen zit);</li><li><b>orgaan(stelsel)</b>: wat een orgaan dóet of hoe het gebouwd is.</li></ul>
  <p>Vergelijk het met de huid: talg en zweet met afweerstoffen werken op moleculair niveau, de dichte hoornlaag op orgaanniveau. Let op: een stof en het effect van diezelfde stof op orgaanniveau zijn niet twee verschillende mechanismen.</p>`,
  films:[["Vertering","films/onderbouw/32a/3-vertering/index.html"],["De eerste verdediging","films/afweer/1-de-eerste-verdediging.html"]]});

E.zet(T,[27,28],{titel:"Symbiose en de darmflora",
  html:`<p><b>Symbiose</b> is een langdurig samenleven van twee soorten. Vormen: <b>mutualisme</b> (beide voordeel), <b>commensalisme</b> (één voordeel, ander geen effect) en <b>parasitisme</b> (één voordeel, ander nadeel).</p>
  <p>Soorten met dezelfde voedselbron en ruimte zijn elkaars <b>concurrenten</b>: hoe meer de ene soort gebruikt, hoe minder er overblijft voor de andere.</p>
  <p>Sommige bacteriën maken <b>sporen</b>: een rusttoestand met een dikke wand die hitte, droogte en giftige stoffen kan overleven en later weer uitgroeit.</p>`,
  films:[["Microben, vriend en vijand","films/onderbouw/32c/3-microben-vriend-en-vijand/index.html"]]});

E.zet(T,[29],{titel:"Mitochondriën en apoptose",
  html:`<p>Een mitochondrion heeft twee membranen. In en tegen het binnenmembraan zit de elektronentransportketen, die NADH en FADH<sub>2</sub> gebruikt en een H<sup>+</sup>-gradiënt opbouwt voor de ATP-synthese.</p>
  <p><b>Apoptose</b> is geprogrammeerde celdood: een gecontroleerde afbraak waarbij enzymen (caspasen) de cel en het DNA in stukjes knippen, zonder ontsteking. <b>Necrose</b> is ongecontroleerde celdood, bv. doordat een cel openbarst.</p>`});

E.zet(T,[30,31,32],{titel:"PCR, hybridisatie en een DNA-strip",
  html:`<p>Met <b>PCR</b> maak je in cycli van verhitten en afkoelen heel veel kopieën van één stuk DNA. <b>Primers</b> bepalen welk stuk. </p>
  <p>Bij <b>hybridisatie</b> gaat een enkelstrengs stuk DNA tegen een complementaire <b>probe</b> liggen. Complementaire basen (A-T, C-G) passen bij elkaar.</p>
  <p>Een <b>DNA-strip</b> heeft probes op vaste bandjes. Naast de probes voor de genen die je zoekt, heeft een strip <b>controlebandjes</b> voor onderdelen van de test.</p>`,
  anim:anim(caps(["Dubbelstrengs DNA.","Verhitten: de strengen gaan los.","Afkoelen: primers (met label) binden.","DNA-polymerase maakt de strengen af: twee kopieën, elk met label."]),
    i=>{let s="";const st=(y,c)=>`<rect x="80" y="${y}" width="400" height="10" fill="${c}"/>`;
      if(i===0)s=st(50,"var(--text)")+st(64,"var(--text3)");else s=st(30,"var(--text)")+st(90,"var(--text3)");
      if(i>=2)s+=`<rect x="80" y="44" width="60" height="10" fill="var(--teal)"/><circle cx="74" cy="49" r="6" fill="var(--goud)"/><rect x="420" y="76" width="60" height="10" fill="var(--teal)"/><circle cx="486" cy="81" r="6" fill="var(--goud)"/>`;
      if(i>=3)s+=`<rect x="140" y="44" width="340" height="10" fill="var(--teal)" opacity=".6"/><rect x="80" y="76" width="340" height="10" fill="var(--teal)" opacity=".6"/>`;
      return E.svg("0 0 560 130",s+`<text x="20" y="125" class="lblm">● label (bv. biotine)</text>`,"Eén PCR-cyclus");}),
  films:[["Op maat gekopieerd (PCR)","films/dna-technieken/1-op-maat-gekopieerd/index.html"],["DNA lezen","films/dna/7-dna-lezen.html"]]});

E.zet(T,[33,34],{titel:"Opsporen en een dendrogram lezen",
  html:`<p>Een test is ‘biomedisch’ beter als hij meer zieken of besmettelijke mensen opspoort, of als hij veiliger is voor patiënten en personeel. Denk aan <b>wie</b> je test en <b>hoe</b> je dat doet.</p>
  <p>Een <b>dendrogram</b> laat zien hoeveel monsters op elkaar lijken. Twee takken die bij een <b>hoge</b> overeenkomst samenkomen (aan de kant van de 1) lijken sterk op elkaar. Komen ze pas bij een <b>lage</b> waarde samen, dan lijken ze weinig op elkaar. Lees altijd af op de as waar de verticale verbindingslijn staat.</p>`,
  anim:anim(caps(["Twee monsters die bij 0,9 samenkomen: veel overeenkomst.","Twee groepen die bij 0,1 samenkomen: weinig overeenkomst."]),
    i=>{const X=v=>40+v*440;return E.svg("0 0 560 150",`<line x1="${X(0)}" x2="${X(1)}" y1="20" y2="20" class="ax"/>${[0,.5,1].map(v=>`<text x="${X(v)}" y="14" class="tick" text-anchor="middle">${v}</text>`).join("")}
      <path d="M${X(1)},50 H${X(.9)} V70 H${X(1)}" stroke="${i===0?"var(--goud)":"var(--text)"}" stroke-width="2" fill="none"/><path d="M${X(1)},110 H${X(.85)} V130 H${X(1)}" stroke="var(--text)" stroke-width="1.6" fill="none"/>
      <path d="M${X(.9)},60 H${X(.1)} V120 H${X(.85)}" stroke="${i===1?"var(--goud)":"var(--text3)"}" stroke-width="2" fill="none"/>`,"Voorbeeld van een dendrogram");}),
  films:[["Stambomen lezen","films/evolutie/8-stambomen-lezen.html"]]});

/* ---------- opgave 5 ---------- */
E.zet(T,[35],{titel:"Beperkende factoren en een proefopzet",
  html:`<p>De snelheid van de fotosynthese hangt af van meerdere factoren tegelijk, zoals CO<sub>2</sub>, licht, temperatuur, water en mineralen. De factor die het meest tekortschiet, bepaalt de snelheid: de <b>beperkende factor</b>. Verhoog je een factor die niet beperkend is, dan gebeurt er (bijna) niets.</p>
  <p>Bij een experiment verander je alleen de factor die je onderzoekt en houd je de rest gelijk. Een controle laat zien wat er gebeurt zonder die verandering.</p>`,
  films:[["Alles in het groen","films/stofwisseling/3-alles-in-het-groen.html"],["Onderzoek doen","films/cellen/onderzoek-doen/index.html"]]});

E.zet(T,[36,37],{titel:"Productie en de koolstofkringloop",
  html:`<p><b>Bruto primaire productie</b> (BPP) is alle organische stof die producenten per oppervlak per tijd maken. <b>Netto primaire productie</b> (NPP) = BPP − wat de producenten zelf dissimileren. Productie in de ecologie gaat over <b>organische stof</b>.</p>
  <p>In de koolstofkringloop wordt CO<sub>2</sub> vastgelegd door fotosynthese en komt het weer vrij bij dissimilatie.</p>`,
  films:[["Koolstof gaat rond","films/ecologie/6-koolstof-gaat-rond.html"],["Alles gaat rond","films/ecologie/alles-gaat-rond/index.html"]]});

E.zet(T,[38,39],{titel:"Huidmondjes en diffusie in het blad",
  html:`<p>CO<sub>2</sub> komt het blad binnen via de <b>huidmondjes</b> en diffundeert naar de cellen met bladgroen. Door dezelfde openingen verdampt waterdamp naar buiten. De <b>sluitcellen</b> regelen hoe ver een huidmondje open staat.</p>
  <p>Volgens de <b>wet van Fick</b> hangt de diffusiesnelheid af van het <b>oppervlak</b>, het <b>concentratieverschil</b> en de <b>afstand</b>.</p>`,
  films:[["Alles in het groen","films/stofwisseling/3-alles-in-het-groen.html"],["Diffusie en osmose","films/cellen/diffusie-osmose/index.html"]]});
})();
