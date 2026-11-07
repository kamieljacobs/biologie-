/* Uitleg van de stof · oefenexamen vwo 2019 tijdvak 2 (tool vwo19-2). Wordt door samenvoegen.py gekopieerd naar tools/examen-stof/vwo19-2.js. */
(function(){
"use strict";
const E=window.EXSTOF, T="vwo19-2";if(!E)return;
const caps=a=>a.map(c=>({cap:c}));
const anim=(steps,draw)=>box=>E.stappen(box,steps,(st,s,i)=>{st.innerHTML=draw(i,s);});
const doos=(x,y,w,t,kl)=>`<rect x="${x}" y="${y}" width="${w}" height="38" rx="10" fill="var(--surface)" stroke="${kl||"var(--line2)"}" stroke-width="1.6"/><text class="lbl" x="${x+w/2}" y="${y+24}" text-anchor="middle">${t}</text>`;
const PIJL=`<defs><marker id="exs19p" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--text2)"/></marker></defs>`;
const pijl=(x1,y1,x2,y2)=>`<path d="M${x1},${y1} L${x2},${y2}" stroke="var(--text2)" stroke-width="1.6" marker-end="url(#exs19p)"/>`;

/* ---------- opgave 1: ecologie ---------- */
E.zet(T,[1,2,4,7],{titel:"Successie, grazers en biodiversiteit",
  html:`<p><b>Successie</b> is de geleidelijke verandering van een levensgemeenschap in een gebied: van kale grond via kruiden en struiken naar bos. Bij een <b>natuurlijke</b> successie gebeurt dat vanzelf; bij natuurbeheer stuurt de mens (maaien, kappen, dieren uitzetten of bijvoeren).</p>
  <p><b>Biodiversiteit</b> is de verscheidenheid aan soorten in een gebied. Die is hoog als er veel verschillende <b>niches</b> zijn: plekken met eigen omstandigheden en voedsel. Grote grazers beïnvloeden de vegetatie door te eten, te vertrappen en mest achter te laten. Hoeveel invloed ze hebben, hangt af van de <b>begrazingsdruk</b>: het aantal grazers per oppervlakte.</p>
  <p>De grootte van een populatie hangt af van geboorte, sterfte, immigratie en emigratie. Wie de dichtheid wil veranderen, moet dus aan een van die vier knoppen draaien.</p>`,
  films:[["Van zand tot bos","films/ecologie/8-van-zand-tot-bos.html"],["Ingrijpen of laten gaan?","films/ecologie/4-ingrijpen-of-laten-gaan.html"]]});
E.zet(T,[3,5,6],{titel:"Populatiegroei, draagkracht en dichtheid",
  html:`<p>Een populatie <b>groeit</b> als er meer individuen geboren worden dan er sterven (geboortecijfer &gt; sterftecijfer). Bij een te hoge dichtheid wordt voedsel schaars: het geboortecijfer daalt en het sterftecijfer stijgt, tot ze gelijk zijn. Dan zit de populatie bij de <b>draagkracht</b>.</p>
  <p>Factoren die de populatie remmen zijn <b>dichtheidsafhankelijk</b> als hun effect groter wordt naarmate er meer individuen per oppervlakte zijn, en <b>dichtheidsonafhankelijk</b> als ze de populatie treffen hoe groot die ook is.</p>
  <p>In een diagram met geboorte- en sterftelijnen is het <b>snijpunt</b> het evenwichtspunt. Links van het snijpunt is de sterfte hoger dan de geboorte (populatie krimpt), rechts is het omgekeerd (populatie groeit).</p>`,
  anim:anim(caps(["Langs de x-as staat de hoeveelheid voedsel. Bij <b>weinig voedsel</b> is de sterfte hoog en de geboorte laag: de populatie krimpt.","Waar de lijnen elkaar snijden, zijn geboorte en sterfte <b>gelijk</b>: het evenwichtspunt.","Bij <b>meer voedsel</b> is de geboorte hoger dan de sterfte: de populatie groeit."]),
    i=>E.svg("0 0 520 220",`<path class="ax" d="M50,20 V190 H500"/><text class="lblm" x="270" y="214" text-anchor="middle">voedsel →</text><text class="lblm" x="8" y="16">%</text>
      <path d="M50,150 L490,50" stroke="var(--teal)" stroke-width="2.4"/><text class="lbl" x="494" y="50" style="fill:var(--teal)" text-anchor="end" dy="-6">geboorte</text>
      <path d="M50,60 L490,170" stroke="var(--koraal)" stroke-width="2.4" stroke-dasharray="6 4"/><text class="lbl" x="494" y="170" style="fill:var(--koraal)" text-anchor="end" dy="-8">sterfte</text>
      ${i===0?`<rect x="50" y="20" width="120" height="170" fill="var(--koraal-soft)" opacity=".6"/>`:""}${i===2?`<rect x="330" y="20" width="160" height="170" fill="var(--teal-soft)" opacity=".6"/>`:""}
      ${i>=1?`<circle cx="247" cy="105" r="7" fill="none" stroke="var(--goud)" stroke-width="2.4"/>`:""}`,"Geboorte- en sterftelijn tegen de hoeveelheid voedsel")),
  films:[["Hoeveel passen er?","films/ecologie/1-hoeveel-passen-er.html"]]});

/* ---------- opgave 2: RNAi ---------- */
E.zet(T,[8,15],{titel:"Veredeling en overerving bij planten",
  html:`<p><b>Veredelen</b> is kunstmatige selectie: de mens kiest steeds de planten met gewenste eigenschappen om mee verder te kruisen. Allelen voor die eigenschappen worden dan vaker, andere allelen kunnen verdwijnen. Ook een eigenschap waarop níét wordt gelet, kan door toeval verloren gaan als er geen natuurlijke selectie meer op is.</p>
  <p>Bij <b>geslachtelijke voortplanting</b> van een bloemplant komt de mannelijke kern met de <b>stuifmeelkorrel</b> naar de eicel. Stuifmeel kan met wind of insecten ver komen. Bij <b>ongeslachtelijke</b> voortplanting (bv. via knollen) ontstaan klonen van de moederplant.</p>
  <p>DNA buiten de kern (in mitochondriën en plastiden) erft bij de meeste planten en dieren alleen via de <b>eicel</b> over: de moederlijke lijn.</p>`,
  films:[["De mens als selectiefactor","films/evolutie/4-de-mens-als-selectiefactor.html"],["Overerving via het X-chromosoom","films/erfelijkheid/5-overerving-via-x-chromosomen-en-mitochondrien.html"]]});
E.zet(T,[9],{titel:"De synaps",
  html:`<p>Een impuls loopt langs het axon (<b>impulsgeleiding</b>). In de eindknop zorgt de impuls ervoor dat blaasjes met <b>neurotransmitter</b> zoals acetylcholine hun inhoud in de synapsspleet loslaten. De neurotransmitter bindt aan <b>receptoren</b> in het postsynaptisch membraan, waardoor in de volgende cel een nieuwe impuls kan ontstaan (<b>impulsoverdracht</b>).</p>
  <p>Een stof die een receptor bezet of blokkeert, grijpt dus aan op het postsynaptisch membraan. Wat er vóór de synapsspleet gebeurt, gaat gewoon door.</p>`,
  films:[["De spleet","films/zenuwstelsel/3-de-spleet.html"],["Knoeien met de synaps","films/zenuwstelsel/4-knoeien-met-de-spleet.html"]]});
E.zet(T,[10,11,13,14],{titel:"Van gen naar eiwit, en RNAi",
  html:`<p>Bij eukaryoten wordt een gen in de <b>kern</b> overgeschreven tot pre-mRNA (<b>transcriptie</b>). Daarna worden de <b>introns</b> eruit geknipt en de <b>exons</b> aan elkaar gezet (<b>splicing</b>). Het rijpe mRNA gaat naar het <b>cytoplasma</b>, waar ribosomen het vertalen tot eiwit (<b>translatie</b>).</p>
  <p><b>RNA-interferentie</b> is een manier om genexpressie uit te zetten: korte stukjes RNA zoeken een mRNA met een <b>complementaire</b> basenvolgorde en zorgen dat dat mRNA wordt afgebroken. Hoe uniek de gekozen basenvolgorde is, bepaalt welke genen geraakt worden.</p>
  <p>Het <b>cytoskelet</b> (onder andere actine) geeft cellen vorm en is nodig bij celdeling en celgroei.</p>`,
  anim:anim(caps(["In de kern: het gen wordt overgeschreven tot <b>pre-mRNA</b> met exons (blokken) en introns (lijntjes).","<b>Splicing</b>: de introns worden eruit geknipt.","Het rijpe mRNA gaat naar het <b>cytoplasma</b>. Daar vindt de translatie plaats."]),
    i=>{let s=`<rect x="10" y="10" width="300" height="150" rx="30" fill="var(--surface)" stroke="var(--text3)"/><text class="lblm" x="24" y="32">kern</text><text class="lblm" x="340" y="32">cytoplasma</text>`;
      const ex=(x,y,w)=>`<rect x="${x}" y="${y}" width="${w}" height="18" rx="4" fill="var(--teal-soft)" stroke="var(--teal)"/>`;
      if(i===0)s+=ex(30,80,50)+`<path d="M80,89 h40" stroke="var(--text3)" stroke-width="3"/>`+ex(120,80,50)+`<path d="M170,89 h40" stroke="var(--text3)" stroke-width="3"/>`+ex(210,80,50)+`<text class="lblm" x="100" y="72" text-anchor="middle">intron</text><text class="lblm" x="55" y="120" text-anchor="middle">exon</text>`;
      if(i===1)s+=ex(60,80,50)+ex(110,80,50)+ex(160,80,50)+`<path d="M100,130 h20 M180,130 h20" stroke="var(--text3)" stroke-width="3"/><text class="lblm" x="150" y="150" text-anchor="middle">weggeknipt</text>`;
      if(i===2)s+=ex(340,80,50)+ex(390,80,50)+ex(440,80,50)+pijl(240,89,330,89)+`<ellipse cx="420" cy="122" rx="30" ry="12" fill="var(--line2)"/><text class="lblm" x="420" y="150" text-anchor="middle">ribosoom</text>`;
      return E.svg("0 0 520 170",PIJL+s,"Transcriptie, splicing en transport van mRNA naar het cytoplasma");}),
  films:[["Van DNA naar eiwit","films/dna/3-van-dna-naar-eiwit.html"],["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"]]});
E.zet(T,[12],{titel:"Waar in de cel? Kern, cytoplasma en chloroplast",
  html:`<p>Een plantencel heeft DNA op drie plekken: in de <b>kern</b>, in de <b>mitochondriën</b> en in de <b>chloroplasten</b>. Wat in de kern of in een chloroplast wordt gemaakt, kan binnen dat compartiment blijven: de membranen eromheen houden veel stoffen tegen.</p>
  <p>Enzymen werken alleen op de plek waar ze zitten.</p>
  <p>Wat een dier eet, komt eerst in het darmkanaal. Alleen stoffen die door de darmwand worden opgenomen, kunnen de cellen van het dier bereiken.</p>`,
  films:[["Celorganellen","films/cellen/celorganellen/index.html"]]});

/* ---------- opgave 3: CF ---------- */
E.zet(T,[16,17,25],{titel:"Afweer in de luchtwegen en resistentie",
  html:`<p>De luchtwegen zijn bekleed met <b>trilhaarepitheel</b> en slijmbekercellen. Het slijm vangt stof en ziekteverwekkers; de trilharen bewegen het slijm naar de keel, waar je het inslikt of ophoest. Zo blijven de longen schoon.</p>
  <p>Bacteriën die een antibioticum overleven, krijgen nakomelingen die het ook overleven: zo ontstaat door <b>selectie</b> een <b>resistente</b> populatie. Hoe vaker en langer er antibiotica gebruikt worden, hoe groter die selectiedruk.</p>
  <p>Bij <b>gentherapie</b> breng je een intact allel in lichaamscellen (somatische cellen) van een patiënt. De geslachtscellen veranderen daardoor niet: de patiënt kan het defecte allel nog steeds doorgeven.</p>`,
  films:[["De eerste verdediging","films/afweer/1-de-eerste-verdediging.html"],["De mens als selectiefactor","films/evolutie/4-de-mens-als-selectiefactor.html"]]});
E.zet(T,[18,19],{titel:"Vertering: enzymen, alvleessap en gal",
  html:`<p>In de twaalfvingerige darm komen twee sappen samen: <b>alvleessap</b> uit de alvleesklier en <b>gal</b> uit de lever (via de galblaas en de galafvoergang). Gal bevat geen enzymen, maar <b>emulgeert</b> vet: grote vetdruppels worden kleine druppeltjes met veel meer oppervlak waar lipase kan werken.</p>
  <p>Zoek in je informatieboek per enzym op <b>waar</b> het gemaakt wordt (speeksel, maag, alvleesklier, darmwand) en <b>welke omzetting</b> het doet. Let op: niet elk verteringsenzym in de dunne darm komt uit de alvleesklier.</p>`,
  films:[["Knippen op maat","films/voeding/3-knippen-op-maat.html"],["De lever als fabriek","films/voeding/5-de-lever-als-fabriek.html"]]});
E.zet(T,[20],{titel:"Dissimilatie: O₂ erin, CO₂ eruit",
  html:`<p>Bij <b>aerobe dissimilatie</b> wordt brandstof met zuurstof afgebroken tot CO<sub>2</sub> en water. Bij glucose wordt per verbruikte O<sub>2</sub> evenveel CO<sub>2</sub> gevormd. Bij vetten en eiwitten is die verhouding anders, omdat die moleculen relatief minder zuurstofatomen bevatten.</p>
  <p>Bij <b>anaerobe dissimilatie</b> in spieren ontstaat melkzuur. Dat gebeurt als er te weinig zuurstof is voor de energie die de spier nodig heeft.</p>
  <p>De <b>ruststofwisseling</b> is de energie die je lichaam in volledige rust verbruikt.</p>`,
  films:[["Alles op adem","films/stofwisseling/2-alles-op-adem.html"]]});
E.zet(T,[21,22,23],{titel:"Zuurstoftransport: van lucht tot mitochondrium",
  html:`<p>Zuurstof doorloopt een keten: de <b>longen</b> nemen het op uit de lucht, het <b>bloed</b> vervoert het (gepompt door het hart) en de <b>cellen</b> verbruiken het in hun mitochondriën. De zwakste schakel bepaalt hoeveel zuurstof je maximaal kunt verbruiken.</p>
  <p>Het <b>hartminuutvolume</b> is het volume bloed dat het hart per minuut rondpompt: slagvolume × hartslagfrequentie. In de <b>slagaders</b> van de grote bloedsomloop zit zuurstofrijk bloed, in de <b>aders</b> zuurstofarmer bloed.</p>`,
  films:[["Gas op reis","films/gaswisseling/2-gas-op-reis.html"],["Eén pomp, twee rondjes","films/transport/1-een-pomp-twee-rondjes.html"]]});
E.zet(T,[24],{titel:"Longvolumes",
  html:`<p>De <b>totale longinhoud</b> bestaat uit twee delen. De <b>vitale capaciteit</b> is de hoeveelheid lucht die je na een maximale inademing maximaal kunt uitademen. Het <b>restvolume</b> is de lucht die daarna nog in je longen achterblijft; die kun je niet uitademen.</p>
  <p>Het <b>ademvolume</b> is de hoeveelheid lucht die je bij een gewone ademhaling in- en uitademt. Het is een deel van de vitale capaciteit.</p>`,
  anim:anim(caps(["De totale longinhoud van iemand is ongeveer vast.","Bovenin: de <b>vitale capaciteit</b>, lucht die je maximaal kunt in- en uitademen.","Onderin: het <b>restvolume</b>, lucht die altijd achterblijft."]),
    i=>E.svg("0 0 360 240",`<rect x="40" y="20" width="140" height="200" fill="var(--surface)" stroke="var(--text2)"/>${i>=1?`<rect x="40" y="20" width="140" height="140" fill="var(--teal-soft)" stroke="var(--teal)"/><text class="lbl" x="110" y="94" text-anchor="middle">vitale capaciteit</text>`:""}${i>=2?`<rect x="40" y="160" width="140" height="60" fill="var(--koraal-soft)" stroke="var(--koraal)"/><text class="lbl" x="110" y="194" text-anchor="middle">restvolume</text>`:""}<text class="lblm" x="196" y="30">totale longinhoud</text>`,"Opbouw van de totale longinhoud")),
  films:[["Adem in, adem uit","films/gaswisseling/1-adem-in-adem-uit.html"]]});

/* ---------- opgave 4: smaak ---------- */
E.zet(T,[26,27],{titel:"Signaaloverdracht in een cel en de synaps",
  html:`<p>Veel signalen komen niet zelf de cel in. Een <b>signaalstof</b> (eerste boodschapper) bindt aan een <b>receptor</b> in het celmembraan. Die activeert binnen de cel een <b>enzym</b>, dat een <b>second messenger</b> maakt (bijvoorbeeld cAMP of IP<sub>3</sub>). De second messenger geeft het signaal door, bijvoorbeeld door een ionkanaal te openen. Zo’n reeks heet een <b>signaalcascade</b>.</p>
  <p>Bij een synaps zorgt een stijging van de Ca<sup>2+</sup>-concentratie in de presynaptische cel ervoor dat neurotransmitter vrijkomt. Op het postsynaptisch membraan verandert de membraanpotentiaal: <b>depolarisatie</b> maakt een impuls waarschijnlijker, <b>hyperpolarisatie</b> maakt hem minder waarschijnlijk.</p>`,
  anim:anim(caps(["Een <b>signaalstof</b> komt aan bij de cel.","Hij bindt aan een <b>receptor</b> in het membraan.","De receptor activeert een <b>enzym</b>, dat een <b>second messenger</b> maakt.","De second messenger zet in de cel een <b>reactie</b> in gang."]),
    i=>E.svg("0 0 540 150",PIJL+`<rect x="0" y="60" width="540" height="14" fill="var(--line2)"/><text class="lblm" x="8" y="54">buiten de cel</text><text class="lblm" x="8" y="96">in de cel</text>`
      +doos(30,10,120,"signaalstof",i===0?"var(--goud)":"")+(i>=1?doos(160,48,100,"receptor","var(--teal)"):"")+(i>=1?pijl(150,29,180,48):"")
      +(i>=2?pijl(260,86,290,106)+doos(290,100,90,"enzym","var(--teal)")+pijl(380,119,400,119)+doos(400,100,130,"2nd messenger","var(--goud)"):"")
      +(i>=3?`<text class="lbl" x="465" y="96" text-anchor="middle" style="fill:var(--goud-text)">→ reactie</text>`:""),"Schema van een signaalcascade")),
  films:[["Post voor iedereen","films/hormonen/1-post-voor-iedereen.html"],["De spleet","films/zenuwstelsel/3-de-spleet.html"]]});
E.zet(T,[28],{titel:"Reflexen en het centrale zenuwstelsel",
  html:`<p>Het centrale zenuwstelsel bestaat uit hersenen en ruggenmerg. <b>Grijze stof</b> bevat de cellichamen en synapsen: daar wordt informatie verwerkt. <b>Witte stof</b> bestaat vooral uit uitlopers met myelineschede: daar wordt informatie vervoerd.</p>
  <p>Bij een <b>reflex</b> loopt de impuls niet via het bewuste deel van de hersenen, maar via een korte route. Reflexen van de romp en ledematen lopen via het ruggenmerg; reflexen in het hoofdgebied (zoals de pupilreflex of knipperen) via de <b>hersenstam</b>. Sensorische neuronen brengen impulsen naar het centrale zenuwstelsel, motorische neuronen naar spieren of klieren.</p>`,
  films:[["Eén seconde","films/zenuwstelsel/1-een-seconde.html"],["Het hoofdkantoor","films/zenuwstelsel/5-het-hoofdkantoor.html"]]});
E.zet(T,[29],{titel:"Intermediaire overerving",
  html:`<p>Bij <b>intermediaire</b> (onvolledig dominante) overerving heeft de heterozygoot een fenotype tussen beide homozygoten in. Elk fenotype hoort dan bij precies één genotype, zodat je het genotype van iemand direct kunt aflezen.</p>
  <p>Een kind krijgt van elke ouder één allel. Weet je het genotype van het kind en van één ouder, dan weet je ook welk allel de andere ouder in elk geval moet hebben.</p>`,
  films:[["Voorbij dominant en recessief","films/erfelijkheid/3-voorbij-dominant-en-recessief.html"],["Monohybride kruisingen","films/erfelijkheid/2-monohybride-kruisingen.html"]]});
E.zet(T,[30,31],{titel:"Hardy-Weinberg en selectie",
  html:`<p>Bij een gen met twee allelen geef je de allelfrequenties aan met <b>p</b> en <b>q</b> (p + q = 1). Volgens de regel van <b>Hardy-Weinberg</b> zijn de genotypefrequenties dan: <b>p²</b> (homozygoot voor het ene allel), <b>2pq</b> (heterozygoot) en <b>q²</b> (homozygoot voor het andere). Ken je de frequentie van een homozygoot fenotype, dan vind je de allelfrequentie door de wortel te nemen.</p>
  <p>Blijven twee allelen lang naast elkaar bestaan, dan kan dat komen doordat de <b>heterozygoot</b> in het voordeel is: elk uiterste fenotype heeft dan een eigen nadeel (balancerende selectie).</p>`,
  films:[["Toeval en uitwisseling","films/evolutie/5-toeval-en-uitwisseling.html"],["Vormen van selectie","films/evolutie/3-vormen-van-selectie.html"]]});
E.zet(T,[32],{titel:"Mutatie, eiwit en fenotype",
  html:`<p>Een <b>puntmutatie</b> (zoals een SNP) verandert één base. Daardoor kan één aminozuur in het eiwit anders worden. Een eiwit werkt door zijn <b>vorm</b>: een receptor past op een bepaalde stof, een enzym op een bepaald substraat. Verandert de vorm, dan kan het eiwit slechter, anders of helemaal niet meer werken.</p>
  <p>Zo’n verandering op <b>moleculair niveau</b> kan doorwerken tot op het <b>niveau van het organisme</b>: van eiwit, via cel en orgaan (de hersenen die de prikkels verwerken), tot wat je waarneemt en doet.</p>`,
  films:[["Mutaties","films/dna/5-mutaties.html"],["Zintuigen","films/zenuwstelsel/8-zintuigen.html"]]});

/* ---------- opgave 5: mazelen ---------- */
E.zet(T,[33],{titel:"Weefselvocht, lymfe en bloed",
  html:`<p>Tussen de cellen zit <b>weefselvocht</b>. Een deel daarvan komt in de <b>lymfevaten</b> en heet dan lymfe. Lymfevaten lopen door <b>lymfeknopen</b>, waar veel lymfocyten zitten. Uiteindelijk komt de lymfe via de borstbuis in een grote ader terecht: in het bloed.</p>
  <p>Witte bloedcellen kunnen het bloed verlaten en door het weefsel bewegen.</p>`,
  anim:anim(caps(["Weefselvocht ligt tussen de cellen van een weefsel.","Een deel komt in een <b>lymfevat</b> en stroomt naar een lymfeknoop.","De lymfe komt via de borstbuis in het <b>bloed</b>. Het bloed stroomt langs alle organen."]),
    i=>E.svg("0 0 540 160",PIJL+doos(10,60,120,"weefselvocht",i===0?"var(--goud)":"")+(i>=1?pijl(130,79,170,79)+doos(170,60,140,"lymfe → knoop",i===1?"var(--goud)":""):"")+(i>=2?pijl(310,79,350,79)+doos(350,60,80,"bloed",i===2?"var(--goud)":"")+pijl(430,79,460,40)+pijl(430,79,460,118)+`<text class="lblm" x="466" y="40">organen</text><text class="lblm" x="466" y="122">organen</text>`:""),"Van weefselvocht via lymfe naar bloed")),
  films:[["Weefselvloeistof en lymfe","films/transport/4-weefselvloeistof-en-lymfe.html"]]});
E.zet(T,[34,36,37],{titel:"Specifieke afweer en vaccinatie",
  html:`<p>Bij de <b>humorale afweer</b> herkennen B-cellen een vrij antigeen; ze delen en worden <b>plasmacellen</b> (die antistoffen maken) en geheugencellen. Bij de <b>cellulaire afweer</b> herkennen cytotoxische T-cellen <b>lichaamscellen</b> die een antigeen van binnenuit tonen (bijvoorbeeld omdat ze met een virus geïnfecteerd zijn) en doden die. Ook hierbij ontstaan geheugencellen. T-helpercellen activeren beide.</p>
  <p>Bij <b>actieve immunisatie</b> (vaccinatie) maakt het lichaam zelf antistoffen en geheugencellen. Bij <b>passieve immunisatie</b> krijg je kant-en-klare antistoffen, bijvoorbeeld door een injectie met antistoffen. Antistoffen binden antigenen en maken ze onschadelijk.</p>`,
  films:[["Antistoffen op maat","films/afweer/2-antistoffen-op-maat.html"],["T-cellen en virussen","films/afweer/3-t-cellen-en-virussen.html"],["Vaccins, allergie en bloedgroepen","films/afweer/4-vaccins-allergie-en-bloedgroepen.html"]]});
E.zet(T,[35],{titel:"Virussen en verzwakte vaccins",
  html:`<p>Een virus heeft een gastheercel nodig om zich te vermenigvuldigen. Het hecht met eiwitten op zijn oppervlak aan de cel, gaat naar binnen en laat de cel nieuwe virusdeeltjes maken. Een RNA-virus heeft daarvoor een eigen <b>RNA-polymerase</b> nodig om zijn RNA te kopiëren.</p>
  <p>Het afweersysteem herkent een virus aan zijn <b>antigenen</b>, vooral de eiwitten aan de buitenkant. Een <b>verzwakt</b> (‘levend’) vaccin bevat virussen die zich nog wel een beetje kunnen vermenigvuldigen, maar veel minder dan het wilde virus. Door een virus lang in andere cellen te kweken, verandert de selectiedruk en dus het virus.</p>`,
  films:[["T-cellen en virussen","films/afweer/3-t-cellen-en-virussen.html"],["Vaccins, allergie en bloedgroepen","films/afweer/4-vaccins-allergie-en-bloedgroepen.html"]]});
E.zet(T,[38],{titel:"Rekenen met percentages van een groep",
  html:`<p>Bij een rekenvraag met meerdere percentages is het belangrijk <b>van welke groep</b> elk percentage is. ‘93% wordt gevaccineerd’ gaat over het hele cohort. ‘Het vaccin beschermt in 92% van de toedieningen’ gaat alleen over de kinderen die het vaccin kregen. Reken dus eerst de groep uit, en neem daarvan het volgende percentage.</p>
  <p>Een vaccin werkt bijna nooit bij 100% van de mensen. Is een groot deel van de bevolking gevaccineerd, dan kan een ziekteverwekker zich moeilijk verspreiden: <b>groepsimmuniteit</b>.</p>`,
  films:[["Vaccins, allergie en bloedgroepen","films/afweer/4-vaccins-allergie-en-bloedgroepen.html"]]});
})();
