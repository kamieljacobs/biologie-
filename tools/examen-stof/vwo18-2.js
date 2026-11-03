/* Uitleg van de stof · oefenexamen vwo 2018-II (tool vwo18-2). Geladen na de kern tools/examen-stof.js. */
(function(){
"use strict";
const E=window.EXSTOF, T="vwo18-2";
if(!E)return;
const SV=(vb,inner,lab)=>E.svg(vb,inner,lab);
const anim=(steps,draw)=>box=>E.stappen(box,steps,(st,s,i)=>{st.innerHTML=draw(i,s);});
const caps=a=>a.map(c=>({cap:c}));

/* ================= opgave 1 · De lauwbloedige koningsvis ================= */
/* kubusjes: oppervlakte/inhoud */
function kubus(i){
  const z=[1,2,4][i],s=24*z;let g=`<rect x="${120-s/2}" y="${130-s}" width="${s}" height="${s}" fill="var(--surface)" stroke="var(--teal)" stroke-width="2"/>`;
  g+=`<text class="lbl" x="260" y="60">ribbe ${z}</text><text class="lblm" x="260" y="84">oppervlakte 6 × ${z}² = ${6*z*z}</text><text class="lblm" x="260" y="106">inhoud ${z}³ = ${z*z*z}</text><text class="lbl" x="260" y="130">verhouding ${(6/z).toFixed(1).replace(".",",")} : 1</text>`;
  return SV("0 0 460 140",g,"Kubus met ribbe "+z+": oppervlakte-inhoudverhouding "+(6/z));
}
E.zet(T,[1],{titel:"Oppervlakte-inhoudverhouding en warmte",
  html:`<p>Een dier <b>maakt warmte</b> in al zijn cellen (in zijn <b>inhoud</b>) en <b>verliest warmte</b> via zijn huid (zijn <b>oppervlakte</b>). Hoe kleiner een dier, hoe groter zijn oppervlakte in verhouding tot zijn inhoud.</p><p>Water voert warmte ongeveer 25 keer zo snel af als lucht. Endotherm zijn in water is daarom extra ‘duur’: de warmte die verloren gaat, moet steeds worden aangevuld door dissimilatie van voedsel.</p>`,
  anim:anim(caps(["Een kubus met ribbe 1: per eenheid inhoud 6 eenheden oppervlak.","Ribbe 2: de inhoud groeit sneller dan de oppervlakte.","Ribbe 4: per eenheid inhoud nog maar 1,5 eenheid oppervlak."]),kubus),
  films:[["Gas op reis","films/gaswisseling/2-gas-op-reis.html"]]});
E.zet(T,[2],{titel:"Myoglobine en aerobe dissimilatie",
  html:`<p><b>Hemoglobine</b> in rode bloedcellen vervoert zuurstof door het lichaam. <b>Myoglobine</b> is een verwant eiwit dat <b>in spiercellen</b> zit. Het bindt zuurstof sterker dan hemoglobine en geeft het pas af als de zuurstofdruk in de spier laag wordt.</p><p>Spiercellen gebruiken zuurstof voor de <b>aerobe dissimilatie</b> in de mitochondriën. Per glucosemolecuul levert die veel meer ATP op dan anaerobe dissimilatie (melkzuurgisting).</p>`,
  films:[["Alles op adem","films/stofwisseling/2-alles-op-adem.html"],["Spieren en beweging","films/zenuwstelsel/9-spieren-en-beweging.html"]]});
E.zet(T,[3,4,5],{titel:"Meetgegevens lezen: gemiddelde, spreiding en validiteit",
  html:`<ul><li>Het <b>gemiddelde</b> zegt iets over de typische waarde. De <b>standaardafwijking</b> zegt hoe ver de afzonderlijke metingen daar gemiddeld vanaf liggen: hoe groter, hoe meer variatie.</li><li><b>Betrouwbaar</b>: krijg je bij herhaling dezelfde uitkomst? Grote spreiding en weinig metingen maken een conclusie minder betrouwbaar.</li><li><b>Valide</b>: meet je wat je wilt meten? Dat hangt af van de meetmethode, niet van de spreiding.</li><li>In een diagram met <b>twee y-assen</b> hoort elke lijn bij één as. Let op de richting: een diepte-as loopt vaak naar beneden.</li><li>Warmte wordt in het lichaam vooral door het <b>bloed</b> verspreid.</li></ul>`,
  films:[["Onderzoek doen in de biologie","films/cellen/onderzoek-doen/index.html"],["Kun je onderzoek vertrouwen?","films/extra/kun-je-onderzoek-vertrouwen.html"]]});
E.zet(T,[6],{titel:"Tegenstroomprincipe",
  html:`<p>Stromen twee vloeistoffen <b>in tegengestelde richting</b> vlak langs elkaar, dan is er over de hele lengte een verschil (in temperatuur of concentratie) tussen de twee. Daardoor kan er overal iets overgaan, en wordt de uitwisseling bijna volledig. Bij <b>meestroom</b> worden de twee snel gelijk en stopt de uitwisseling halverwege.</p><p>Voorbeelden: de zuurstofopname in de kieuwen van een vis (bloed en water stromen tegengesteld), en de warmte-uitwisseling in de poten van een eend of pinguïn.</p><p><b>Vetweefsel</b> geleidt warmte slecht: het werkt als isolatielaag.</p>`,
  films:[["Gas op reis","films/gaswisseling/2-gas-op-reis.html"]]});
E.zet(T,[7],{titel:"Een cladogram lezen",
  html:`<ul><li>Aan de <b>uiteinden</b> staan soorten of groepen die nu leven (hier: waarvan DNA is onderzocht).</li><li>Elke <b>splitsing (knoop)</b> staat voor een gemeenschappelijke voorouder.</li><li>Twee groepen zijn <b>meer verwant</b> naarmate hun gemeenschappelijke voorouder recenter is: de knoop waar ze samenkomen ligt dichter bij de uiteinden.</li><li>Hoe de takken op het papier liggen of draaien, maakt niet uit.</li></ul>`,
  films:[["Stambomen lezen","films/evolutie/8-stambomen-lezen.html"]]});
E.zet(T,[8],{titel:"Convergente evolutie en co-evolutie",
  html:`<ul><li><b>Convergente evolutie</b>: soorten die niet nauw verwant zijn, krijgen los van elkaar vergelijkbare kenmerken doordat ze onder vergelijkbare omstandigheden leven (bv. de vleugels van vogels en vleermuizen).</li><li><b>Co-evolutie</b>: twee soorten beïnvloeden elkaars evolutie door hun wisselwerking (bv. een bloem en zijn bestuiver, een parasiet en zijn gastheer).</li><li>Een soort die <b>nu</b> leeft, is geen voorouder van een andere soort die nu leeft. Ze hebben hooguit een gemeenschappelijke voorouder.</li><li>Afstammelingen houden kenmerken van hun voorouders: walvissen ademen met longen, zoals alle zoogdieren.</li></ul>`,
  films:[["Hoe weten we dat?","films/evolutie/7-hoe-weten-we-dat.html"],["Stambomen lezen","films/evolutie/8-stambomen-lezen.html"]]});

/* ================= opgave 2 · Nieuwe eilandjes voor de alvleesklier ================= */
E.zet(T,[9],{titel:"T-cellen leren in de thymus",
  html:`<p>T-cellen ontstaan in het beenmerg en <b>rijpen in de thymus</b>. Elke T-cel heeft een eigen receptor die past op één antigeen. In de thymus worden ze getest:</p><ul><li>T-cellen die <b>niet</b> op lichaamseigen stoffen reageren, mogen uitrijpen.</li><li>T-cellen die <b>sterk</b> reageren op een lichaamseigen eiwit dat de thymuscellen hun laten zien, worden opgeruimd.</li></ul><p>Zo ontstaat <b>tolerantie</b>: het afweersysteem valt eigen cellen niet aan. Gaat dat mis, dan kan er een <b>auto-immuunziekte</b> ontstaan.</p>`,
  films:[["T-cellen en virussen","films/afweer/3-t-cellen-en-virussen.html"]]});
E.zet(T,[10],{titel:"ADH en de waterhuishouding",
  html:`<p><b>Osmoreceptoren</b> in de hypothalamus meten de osmotische waarde van het bloed. Hoe meer opgeloste stoffen, hoe hoger de osmotische waarde. Bij een hogere osmotische waarde geeft de hypofyse meer <b>ADH</b> (antidiuretisch hormoon) af.</p><p>ADH maakt de wand van de <b>verzamelbuizen</b> in de nieren beter doorlaatbaar voor water (meer waterkanalen). Er wordt dan meer water teruggeresorbeerd en de urine wordt geconcentreerder.</p>`,
  films:[["Water in balans","films/hormonen/5-water-in-balans.html"]]});
E.zet(T,[11,12,15],{titel:"Insuline, glucagon en de bloedsuikerspiegel",
  html:`<ul><li>De <b>β-cellen</b> van de eilandjes van Langerhans meten de glucoseconcentratie en geven bij een stijging <b>insuline</b> af. Insuline laat spier- en vetcellen glucose opnemen en de lever glucose opslaan als glycogeen.</li><li>De <b>α-cellen</b> geven bij een daling <b>glucagon</b> af. Glucagon laat de lever glycogeen afbreken en glucose afgeven.</li><li>Is er te weinig glucose in de cellen, dan gebruiken ze andere brandstoffen: <b>vetten</b> en uiteindelijk ook <b>eiwitten</b>.</li><li>Boven de <b>nierdrempel</b> (± 10 mmol/L) komt glucose in de urine.</li><li>Een regelsysteem werkt alleen goed als de sensor een verandering <b>snel</b> waarneemt.</li></ul>`,
  films:[["Suiker in balans","films/hormonen/2-suiker-in-balans.html"],["De lever als fabriek","films/voeding/5-de-lever-als-fabriek.html"]]});
E.zet(T,[13],{titel:"Diagrammen kritisch lezen",
  html:`<ul><li>Een hoeveelheid die per tijdseenheid wordt afgegeven (een <b>afgifte</b>), tel je op over de tijd: de totale hoeveelheid is de <b>oppervlakte</b> onder de lijn, niet alleen de hoogte.</li><li>Een vereenvoudigd voorbeeld van één dag laat zien wat er <b>kan</b> gebeuren. Woorden als ‘nooit’ en ‘altijd’ kun je daar niet uit afleiden.</li><li>Leg twee diagrammen met dezelfde tijd-as onder elkaar: wat gebeurt er in het ene diagram op het moment dat het andere verandert?</li></ul>`,
  films:[["Suiker in balans","films/hormonen/2-suiker-in-balans.html"]]});
E.zet(T,[14],{titel:"Grootte van moleculen en cellen",
  html:`<p>Een membraan of gel met poriën werkt als een <b>zeef</b>: alles wat kleiner is dan de poriën kan erdoor, alles wat groter is niet. Van klein naar groot:</p><ul><li>kleine moleculen: water, zuurstof, glucose, aminozuren;</li><li>kleine eiwitten en peptidehormonen (een paar duizend tot tienduizenden dalton);</li><li>grote eiwitten, zoals de plasma-eiwitten (honderdduizend dalton en meer);</li><li>cellen: bacteriën en bloedcellen (micrometers groot, veel groter dan elk molecuul).</li></ul><p>Het afweersysteem werkt met <b>cellen</b> (fagocyten, T-cellen, B-cellen) én met <b>opgeloste stoffen</b> die deze cellen maken.</p>`,
  films:[["Antistoffen op maat","films/afweer/2-antistoffen-op-maat.html"],["Diffusie en osmose","films/cellen/diffusie-osmose/index.html"]]});

/* ================= opgave 3 · Een bijzondere band tussen grootvader en kleinkind ================= */
function leesraam(i){
  const r=["AUG","GCA","UUC","GAU","AAA"];const s=[r.join(""),"AUGGC"+"A"+"AUUCGAUAAA","AUGG"+"AUUCGAUAAA"][i];
  let g="";const chunks=s.match(/.{1,3}/g);chunks.forEach((c,k)=>{g+=`<rect x="${20+k*80}" y="30" width="72" height="34" rx="8" fill="var(--surface)" stroke="${i&&k>=1?"var(--koraal)":"var(--teal)"}" stroke-width="1.8"/><text class="lbl" x="${56+k*80}" y="53" text-anchor="middle" style="font-family:var(--meta)">${c}</text>`;});
  return SV("0 0 460 90",g,"mRNA per drie gelezen");
}
E.zet(T,[16],{titel:"Het leesraam",
  html:`<p>Bij de translatie leest een ribosoom het mRNA per <b>drie</b> nucleotiden: één codon is één aminozuur. Vanaf het startcodon ligt zo het <b>leesraam</b> vast.</p><p>Komt er bij een mutatie een aantal nucleotiden bij of af, dan hangt het van dat aantal af of het leesraam erna hetzelfde blijft.</p>`,
  anim:anim(caps(["Een stukje mRNA, per drie gelezen: AUG · GCA · UUC · GAU · AAA.","Eén nucleotide erbij (A na GC): vanaf die plek veranderen de codons.","Eén nucleotide eraf (C weg): ook dan veranderen alle codons erna."]),leesraam),
  films:[["Mutaties","films/dna/5-mutaties.html"],["De genetische code lezen","films/dna/4-de-genetische-code-lezen.html"]]});
E.zet(T,[17],{titel:"Genregulatie: methylering",
  html:`<p>Voor de <b>transcriptie</b> bindt RNA-polymerase aan de <b>promotor</b> van een gen. Dan ontstaat mRNA, dat daarna in de <b>translatie</b> wordt vertaald in een eiwit.</p><p>Aan cytosines in het DNA kunnen methylgroepen worden gekoppeld (<b>methylering</b>). Gemethyleerd DNA zit strak opgerold rond histonen: de promotor is dan niet bereikbaar. Dit is een vorm van <b>epigenetische</b> regulatie: de basenvolgorde verandert niet, de genexpressie wel.</p>`,
  films:[["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"],["Van DNA naar eiwit","films/dna/3-van-dna-naar-eiwit.html"]]});
E.zet(T,[18],{titel:"De delen van de hersenen",
  html:`<ul><li><b>Grote hersenen</b>: bewustzijn, denken, waarnemen, bewuste bewegingen in gang zetten.</li><li><b>Kleine hersenen</b>: coördinatie van bewegingen, evenwicht, houding, aangeleerde bewegingen (fietsen, schrijven).</li><li><b>Hersenstam</b>: ademhaling, hartslag, reflexen.</li><li><b>Hypothalamus</b>: lichaamstemperatuur, honger, dorst, hormoonregulatie.</li></ul>`,
  films:[["Het hoofdkantoor","films/zenuwstelsel/5-het-hoofdkantoor.html"]]});
E.zet(T,[19,20,21,22],{titel:"Overerving via het X-chromosoom",
  html:`<ul><li>Een man heeft één X (van zijn moeder) en één Y (van zijn vader). Hij geeft zijn X aan <b>al zijn dochters</b> en aan geen van zijn zonen.</li><li>Een vrouw heeft twee X-chromosomen. In elke lichaamscel wordt vroeg in de ontwikkeling <b>willekeurig</b> één X geïnactiveerd (een Barr-lichaampje). Alle dochtercellen houden die keuze: een vrouw is een <b>mozaïek</b>.</li><li>Voor een <b>karyogram</b> worden cellen in de mitose gefotografeerd: elk chromosoom bestaat dan uit twee identieke chromatiden. De korte arm heet p, de lange arm q.</li></ul>`,
  films:[["Overerving via het X-chromosoom","films/erfelijkheid/5-overerving-via-x-chromosomen-en-mitochondrien.html"],["Stambomen en kansrekenen","films/erfelijkheid/6-stambomen-en-kansrekenen.html"]]});
E.zet(T,[23,24],{titel:"PCR en gelelektroforese",
  html:`<p><b>PCR</b> (polymerase-kettingreactie): in steeds herhaalde cycli worden de DNA-strengen gescheiden door verhitting, binden primers aan de begin- en eindplaats, en maakt een hittebestendig DNA-polymerase nieuwe strengen. Na elke cyclus is het aantal kopieën verdubbeld.</p><p><b>Gelelektroforese</b>: DNA is negatief geladen en beweegt in een elektrisch veld naar de pluspool. Kleine fragmenten bewegen sneller door de gel dan grote. Elk bandje is een groep fragmenten van dezelfde lengte. Iemand met twee <b>verschillende</b> allelen heeft twee bandjes, iemand met één allel (of twee gelijke) één.</p>`,
  films:[["Op maat gekopieerd · PCR","films/dna-technieken/1-op-maat-gekopieerd/index.html"],["Op lengte gesorteerd · gelelektroforese","films/dna-technieken/2-op-lengte-gesorteerd/index.html"]]});
E.zet(T,[25],{titel:"Een synaps sterker of zwakker maken",
  html:`<p>Een synaps is sterk als de postsynaptische cel flink reageert op een signaal. Dat hangt onder meer af van het <b>aantal receptoren</b> voor de neurotransmitter in het postsynaptisch membraan. Bij leren worden er receptoren <b>bijgeplaatst</b>; bij vergeten worden ze er juist <b>uit gehaald</b> (naar binnen opgenomen).</p><p>In een schema betekent een pijl met een <b>−</b> of een dwarsstreepje: <b>remt</b>. Valt een remmer weg, dan werkt het proces dat hij remt <b>sterker</b>.</p>`,
  films:[["De spleet","films/zenuwstelsel/3-de-spleet.html"],["Leren en onthouden","films/zenuwstelsel/6-leren-en-onthouden.html"]]});
E.zet(T,[26],{titel:"Knock-out-dieren als model",
  html:`<p>Bij een <b>knock-out</b>-dier is één gen gericht uitgeschakeld, bijvoorbeeld met CRISPR-Cas. Door het te vergelijken met gewone dieren zie je wat dat gen doet. Lijken de gevolgen op een ziekte bij mensen, dan is het dier een <b>diermodel</b> voor die ziekte.</p>`,
  films:[["CRISPR: wat doet dit gen?","films/vervolg/biomedisch-2-crispr-wat-doet-dit-gen.html"]]});

/* ================= opgave 4 · Biologische productie van waterstofgas ================= */
E.zet(T,[27],{titel:"Koolhydraten in planten",
  html:`<ul><li><b>Monosachariden</b>: glucose, fructose. <b>Disachariden</b>: sacharose (vervoersvorm in planten), maltose.</li><li><b>Polysachariden</b> zijn ketens van vele glucose-eenheden:<ul><li>in plantencelwanden: <b>cellulose</b>;</li><li>als reservestof in planten: <b>zetmeel</b> (amylose en amylopectine);</li><li>als reservestof in dieren en schimmels: <b>glycogeen</b>;</li><li>in insectenpantsers en schimmelcelwanden: <b>chitine</b>.</li></ul></li><li><b>Lignine</b> (houtstof) is geen koolhydraat.</li></ul>`,
  films:[["Wat zit er in je eten?","films/voeding/1-wat-zit-er-in-je-eten.html"]]});
E.zet(T,[28],{titel:"NAD⁺ en anaerobe dissimilatie",
  html:`<p>Bij de <b>glycolyse</b> wordt glucose afgebroken tot pyruvaat. Daarbij komen elektronen (met H<sup>+</sup>) vrij, die worden opgenomen door <b>NAD<sup>+</sup></b>: er ontstaat NADH. De glycolyse levert 2 ATP per glucose.</p><p>Bij de <b>aerobe</b> dissimilatie geeft NADH zijn elektronen af aan de elektronentransportketen in de mitochondriën, met zuurstof als eindacceptor. Bij <b>melkzuurgisting</b> wordt pyruvaat omgezet in melkzuur, bij <b>alcoholgisting</b> in ethanol en CO<sub>2</sub>; daarbij wordt NADH gebruikt.</p>`,
  films:[["Alles op adem","films/stofwisseling/2-alles-op-adem.html"]]});
E.zet(T,[29],{titel:"Leefwijzen van organismen",
  html:`<div class="tablewrap"><table class="data"><tr><th></th><th>koolstofbron: CO<sub>2</sub></th><th>koolstofbron: organische stoffen</th></tr><tr><th>energie uit licht</th><td>foto-autotroof (planten, cyanobacteriën)</td><td>foto-heterotroof</td></tr><tr><th>energie uit chemische reacties</th><td>chemo-autotroof (bv. nitrificerende bacteriën)</td><td>chemo-heterotroof (dieren, schimmels, de meeste bacteriën)</td></tr></table></div><p>De eerste helft van het woord gaat over de <b>energiebron</b>, de tweede helft over de <b>koolstofbron</b>.</p>`,
  films:[["Alles in het groen","films/stofwisseling/3-alles-in-het-groen.html"]]});
E.zet(T,[30],{titel:"De koolstofkringloop",
  html:`<p>Planten leggen met fotosynthese CO<sub>2</sub> uit de lucht vast in organische stoffen. Bij dissimilatie, verbranding of afbraak door reducenten komt die CO<sub>2</sub> weer vrij. Zo gaat koolstof rond.</p><p>In <b>fossiele brandstoffen</b> zit koolstof die miljoenen jaren geleden is vastgelegd en al die tijd buiten de kringloop bleef. </p>`,
  films:[["Koolstof gaat rond","films/ecologie/6-koolstof-gaat-rond.html"]]});

/* ================= opgave 5 · Wat te doen aan de muizenplagen? ================= */
function groei(i){
  let g=`<path class="ax" d="M40,10 V170 H440"/><text class="lblm" x="440" y="188" text-anchor="end">tijd</text><text class="lblm" x="46" y="22">aantal</text>`;
  let j=[],s=[];for(let t=0;t<=400;t+=8){j.push([40+t,170-Math.min(165,4*Math.exp(t/90))]);s.push([40+t,170-120/(1+30*Math.exp(-t/45))]);}
  if(i>=0)g+=`<polyline points="${j.map(p=>p.join(",")).join(" ")}" fill="none" stroke="var(--teal)" stroke-width="2.4"/><text class="lbl" x="320" y="30" style="fill:var(--teal)">J-curve</text>`;
  if(i>=1)g+=`<polyline points="${s.map(p=>p.join(",")).join(" ")}" fill="none" stroke="var(--goud)" stroke-width="2.4"/><text class="lbl" x="350" y="68" style="fill:var(--goud-text)">S-curve</text>`;
  if(i>=2)g+=`<path d="M40,50 H440" stroke="var(--goud)" stroke-dasharray="5 4"/><text class="lblm" x="436" y="44" text-anchor="end">plafond</text>`;
  return SV("0 0 460 196",g,"Groeicurves: J-curve en S-curve");
}
E.zet(T,[31,32,33],{titel:"Populatiegroei",
  html:`<ul><li>Met genoeg voedsel en ruimte groeit een populatie <b>exponentieel</b>: per tijdseenheid wordt het aantal steeds met dezelfde factor vermenigvuldigd. In een diagram met een gewone as is dat een <b>J-curve</b>: eerst lijkt er niets te gebeuren, daarna gaat het heel snel.</li><li>Factoren die sterker werken naarmate er meer individuen zijn, zoals voedselgebrek en ziekte, heten <b>dichtheidsafhankelijk</b>.</li><li>Een populatie die afremt, groeit volgens een <b>S-curve</b> naar een plafond.</li></ul>`,
  anim:anim(caps(["Exponentiële groei: de J-curve.","Groei die afremt naarmate de populatie groter wordt: de S-curve.","De S-curve vlakt af bij een plafond: het maximale aantal dat het gebied langdurig aankan."]),groei),
  films:[["Hoeveel passen er?","films/ecologie/1-hoeveel-passen-er.html"],["Ingrijpen of laten gaan?","films/ecologie/4-ingrijpen-of-laten-gaan.html"]]});
E.zet(T,[34],{titel:"Bloedstolling",
  html:`<p>Bij een wond geven bloedplaatjes en beschadigd weefsel stoffen af die een reeks reacties starten. Daarbij wordt <b>protrombine</b> (uit de lever, met hulp van <b>vitamine K</b>) omgezet in <b>trombine</b>. Trombine zet het opgeloste plasma-eiwit <b>fibrinogeen</b> om in <b>fibrine</b>: lange draden die met bloedcellen een stolsel vormen.</p><ul><li><b>Trombose</b>: een stolsel in een bloedvat zonder wond (te veel stolling).</li><li><b>Bloedingen</b>: het bloed stolt te weinig.</li></ul>`,
  films:[["Wat er in je bloed zit","films/transport/3-wat-er-in-je-bloed-zit.html"]]});
E.zet(T,[35],{titel:"De stikstofkringloop",
  html:`<ul><li><b>Ammonificatie</b>: reducenten zetten eiwitten, ureum en andere stikstofverbindingen uit dode resten, poep en urine om in ammonium (NH<sub>4</sub><sup>+</sup>).</li><li><b>Nitrificatie</b>: nitrificerende bacteriën zetten ammonium om in nitriet en nitraat. Ze hebben daarvoor <b>zuurstof</b> nodig.</li><li>Planten nemen <b>nitraat</b> en ammonium op met hun wortels.</li><li>Nitraat bindt niet aan bodemdeeltjes en <b>spoelt</b> makkelijk uit naar grond- en oppervlaktewater.</li></ul>`,
  films:[["Stikstof gaat rond","films/ecologie/7-stikstof-gaat-rond.html"]]});
E.zet(T,[36],{titel:"Twee factoren in één diagram",
  html:`<p>Staan in een staafdiagram twee factoren (één op de x-as, één in de kleuren van de staven), vergelijk dan op twee manieren:</p><ul><li>houd de kleur gelijk en kijk hoe de hoogte verandert langs de x-as: het effect van de eerste factor;</li><li>houd de groep op de x-as gelijk en vergelijk de kleuren: het effect van de tweede factor.</li></ul><p>Wil je zeggen dat de ene factor <b>belangrijker</b> is dan de andere, dan moet het effect van die factor in alle groepen groter zijn. Een conclusie moet bovendien gaan over de grootheid die op de as staat.</p>`,
  films:[["Onderzoek doen in de biologie","films/cellen/onderzoek-doen/index.html"]]});
E.zet(T,[37,38],{titel:"Predatoren en biologische bestrijding",
  html:`<ul><li><b>Specialisten</b> eten één of enkele prooisoorten; <b>generalisten</b> eten veel verschillende prooisoorten.</li><li>Een <b>homogeen</b> landschap is overal hetzelfde; een <b>heterogeen</b> landschap is een afwisseling van verschillende leefgebieden.</li><li>Predatoren kunnen een prooipopulatie remmen. Hoe sterk, hangt af van hoeveel predatoren er zijn op het moment dat de prooi talrijk wordt.</li><li><b>Preventief</b>: een maatregel om een probleem te voorkomen. <b>Curatief</b>: een maatregel om een bestaand probleem op te lossen. Bij elke maatregel weeg je de kosten en de baten af.</li></ul>`,
  films:[["Wie eet wie?","films/ecologie/3-wie-eet-wie.html"],["Ingrijpen of laten gaan?","films/ecologie/4-ingrijpen-of-laten-gaan.html"]]});
})();
