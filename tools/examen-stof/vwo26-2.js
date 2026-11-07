/* Uitleg van de stof · oefenexamen vwo 2026 tijdvak 2 (tool vwo26-2). Wordt door samenvoegen.py gekopieerd naar tools/examen-stof/vwo26-2.js. */
(function(){
"use strict";
const E=window.EXSTOF, T="vwo26-2";if(!E)return;
const caps=a=>a.map(c=>({cap:c}));
const anim=(steps,draw)=>box=>E.stappen(box,steps,(st,s,i)=>{st.innerHTML=draw(i,s);});
const doos=(x,y,w,t,kl)=>`<rect x="${x}" y="${y}" width="${w}" height="38" rx="10" fill="var(--surface)" stroke="${kl||"var(--line2)"}" stroke-width="1.6"/><text class="lbl" x="${x+w/2}" y="${y+24}" text-anchor="middle">${t}</text>`;

/* ---------- opgave 1 ---------- */
E.zet(T,[1,2],{titel:"Stambomen lezen: dominant of recessief, autosoom of X",
  html:`<p>Een stamboom lees je in vaste stappen. <b>Stap 1: dominant of recessief?</b> Zoek een gezin waar het kind een eigenschap heeft die <i>geen van beide ouders</i> heeft, of juist een kind dat een eigenschap <i>mist</i> die beide ouders hebben. Een allel dat bij beide ouders ‘verstopt’ zat, is recessief.</p>
  <p><b>Stap 2: autosoom of X-chromosoom?</b> Een vader geeft zijn X altijd aan zijn dochters en nooit aan zijn zonen. Bij een X-chromosomaal dominant allel heeft een vader met de eigenschap dus <i>alleen</i> dochters met de eigenschap. Bij een X-chromosomaal recessieve eigenschap heeft een moeder met de eigenschap alleen zonen met de eigenschap. Vind je een gezin dat daar niet in past, dan ligt het gen op een autosoom.</p>
  <p>Let goed op de lijnen: een kind hangt onder de horizontale lijn tussen zijn twee ouders.</p>`,
  anim:anim(caps(["Een kater geeft aan een <b>dochter</b> zijn X en aan een <b>zoon</b> zijn Y.","Ligt een allel op de X van de vader, dan krijgt <b>elke dochter</b> dat allel, en geen enkele zoon."]),
    i=>E.svg("0 0 560 180",doos(40,20,150,"vader X Y","var(--teal)")+doos(370,20,150,"moeder X X")+
      `<path d="M115,60 L170,120" stroke="var(--teal)" stroke-width="2.4"/><path d="M445,60 L200,120" stroke="var(--text2)" stroke-width="1.6"/><path d="M445,60 L390,120" stroke="var(--text2)" stroke-width="1.6"/><path d="M115,60 L370,120" stroke="${i?"var(--goud)":"var(--text3)"}" stroke-width="${i?2.4:1.4}" stroke-dasharray="5 4"/>`+
      doos(110,122,130,"dochter X X","var(--teal)")+doos(320,122,130,"zoon X Y")+(i?`<text class="lbl" x="175" y="176" text-anchor="middle" style="fill:var(--teal)">X van vader</text><text class="lbl" x="385" y="176" text-anchor="middle" style="fill:var(--goud-text)">Y van vader</text>`:""),"Overerving van X en Y van vader op dochter en zoon")),
  films:[["Stambomen en kansrekenen","films/erfelijkheid/6-stambomen-en-kansrekenen.html"],["Overerving via het X-chromosoom","films/erfelijkheid/5-overerving-via-x-chromosomen-en-mitochondrien.html"]]});

E.zet(T,[3],{titel:"Elektronendragers: NADH en NADPH",
  html:`<p>Bij redoxreacties worden elektronen (met H<sup>+</sup>) overgedragen. Daarvoor gebruiken cellen <b>co-enzymen als elektronendrager</b>. In opgenomen toestand heten ze gereduceerd (met H), afgestaan geoxideerd.</p>
  <ul><li><b>NAD<sup>+</sup> / NADH</b> en <b>FAD / FADH<sub>2</sub></b>: dragers in de dissimilatie.</li><li><b>NADP<sup>+</sup> / NADPH</b>: drager in de fotosynthese en in veel opbouwreacties (assimilatie).</li></ul>
  <p>De fotosynthese heeft twee delen: in de <b>thylakoïden</b> wordt lichtenergie vastgelegd en wordt water gesplitst; in het <b>stroma</b> wordt CO<sub>2</sub> vastgelegd in de Calvincyclus. Zoek in je informatieboek op welk deel welke stoffen <i>levert</i> en welk deel ze <i>verbruikt</i>.</p>`,
  films:[["Alles in het groen","films/stofwisseling/3-alles-in-het-groen.html"],["Alles op adem","films/stofwisseling/2-alles-op-adem.html"]]});

E.zet(T,[4],{titel:"Een fylogenetische stamboom lezen",
  html:`<p>Een <b>fylogenetische stamboom</b> laat de verwantschap tussen soorten zien. Elk splitsingspunt (knoop) is een gemeenschappelijke voorouder; hoe dichter twee soorten bij elkaar aftakken, hoe nauwer verwant.</p>
  <p>Wil je weten waar een eigenschap verloren ging of ontstond, dan zoek je de <b>zuinigste verklaring</b>: zo weinig mogelijk veranderingen. Een eigenschap die een hele groep deelt, is meestal één keer veranderd op de tak naar de voorouder van die groep, niet bij elke soort apart. Een soort die afwijkt van zijn groep, heeft de verandering op zijn eigen tak gehad.</p>`,
  films:[["Stambomen lezen","films/evolutie/8-stambomen-lezen.html"]]});

E.zet(T,[5,6],{titel:"Soorten mutaties en de promotor",
  html:`<p><b>Genmutaties</b> veranderen de basenvolgorde van één gen: een substitutie (puntmutatie), een deletie of een insertie van nucleotiden. Een insertie of deletie van een aantal nucleotiden dat geen drievoud is, verschuift binnen een gen het leesraam.</p>
  <p><b>Chromosoommutaties</b> veranderen de bouw van een chromosoom: een stuk gaat verloren (deletie), wordt verdubbeld (duplicatie), omgedraaid (inversie) of verplaatst naar een andere plek (translocatie). <b>Genoommutaties</b> veranderen het aantal chromosomen, zoals bij trisomie of polyploïdie.</p>
  <p>Een <b>promotor</b> is het stuk DNA vóór een gen waar RNA-polymerase bindt. Vanaf daar wordt het gen in één richting (5’→3’ van het RNA) overgeschreven.</p>`,
  films:[["Mutaties","films/dna/5-mutaties.html"],["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"]]});

/* ---------- opgave 2 ---------- */
E.zet(T,[7,8,9],{titel:"Exoten, indicatorsoorten en voedselwebben",
  html:`<p>Een <b>exoot</b> is een soort die door toedoen van de mens in een gebied terecht is gekomen waar hij van nature niet voorkwam. Een soort die van nature in een gebied voorkomt, is <b>inheems</b>, ook als hij er zeldzaam is.</p>
  <p>Een <b>indicatorsoort</b> vertelt iets over het milieu, bijvoorbeeld omdat hij alleen in schoon water kan leven. Hoe betrouwbaarder de soort aan die omstandigheden gebonden is, hoe beter hij als indicator werkt.</p>
  <p>In een voedselketen zijn <b>producenten</b> (planten, algen) de eerste schakel. Wie producenten eet, is <b>consument van de 1e orde</b>; wie die eet, van de 2e orde, enzovoort. Een soort kan in een voedselweb in meer ordes tegelijk zitten. <b>Persistente</b> stoffen worden niet afgebroken en hopen zich in elke volgende schakel verder op (accumulatie). De <b>habitat</b> is de plek waar een soort leeft; de <b>niche</b> is zijn rol in het ecosysteem.</p>`,
  films:[["Wie eet wie?","films/ecologie/3-wie-eet-wie.html"],["Waar past een soort?","films/ecologie/2-waar-past-een-soort.html"]]});

E.zet(T,[10,11],{titel:"De zuurstofverzadigingscurve",
  html:`<p>De <b>zuurstofverzadigingscurve</b> laat zien welk percentage van de hemoglobine zuurstof draagt bij een bepaalde <i>p</i>O<sub>2</sub>. In de longen (hoge <i>p</i>O<sub>2</sub>) is het bloed bijna verzadigd; in werkend weefsel (lage <i>p</i>O<sub>2</sub>) laat het een deel los. Het verschil in verzadiging is het deel dat wordt <b>afgegeven</b>.</p>
  <p>Meer hemoglobine per mL bloed betekent: bij hetzelfde percentage meer mL zuurstof.</p>
  <p>De curve ligt niet altijd op dezelfde plek. Bij een hogere temperatuur, meer CO<sub>2</sub> of een lagere pH bindt hemoglobine zuurstof minder sterk: dat heet het <b>Bohr-effect</b>. Zoek in je informatieboek op hoe de curve dan verschuift.</p>`,
  anim:anim(caps(["Lees de curve af: ga vanaf een <i>p</i>O<sub>2</sub> op de x-as omhoog naar de lijn, en dan opzij naar de y-as.","Voorbeeld: bij 9 kPa is het bloed voor ongeveer 71% verzadigd, bij 4 kPa voor ongeveer 19%."]),
    i=>{const X=v=>50+v*28,Y=v=>230-v*2;const C=[[1,1],[2,5],[3,11],[4,19],[5,28],[6,38],[7,50],[8,61],[9,71],[10,79],[11,87],[12,93],[13,97],[14,98]];
      let g=`<line class="ax" x1="${X(0)}" y1="${Y(0)}" x2="${X(14)}" y2="${Y(0)}"/><line class="ax" x1="${X(0)}" y1="${Y(0)}" x2="${X(0)}" y2="${Y(100)}"/>`;
      for(let v=0;v<=14;v+=2)g+=`<text class="tick" x="${X(v)}" y="${Y(0)+14}" text-anchor="middle">${v}</text>`;for(let v=0;v<=100;v+=20)g+=`<text class="tick" x="${X(0)-5}" y="${Y(v)+4}" text-anchor="end">${v}</text>`;
      g+=`<polyline class="cv" points="${C.map(([x,y])=>X(x)+","+Y(y)).join(" ")}"/>`;
      if(i)[[9,71],[4,19]].forEach(([p,s])=>g+=`<polyline points="${X(p)},${Y(0)} ${X(p)},${Y(s)} ${X(0)},${Y(s)}" fill="none" stroke="var(--goud)" stroke-width="1.8" stroke-dasharray="4 3"/>`);
      return E.svg("0 0 470 260",g,"Zuurstofverzadigingscurve met afleesvoorbeeld");}),
  films:[["Gas op reis","films/gaswisseling/2-gas-op-reis.html"],["Wat er in je bloed zit","films/transport/3-wat-er-in-je-bloed-zit.html"]]});

E.zet(T,[12,13],{titel:"Zenuwstelsel, reflexen en de regeling van de ademhaling",
  html:`<p>Het <b>animale</b> zenuwstelsel stuurt de skeletspieren aan en werkt grotendeels bewust. Het <b>autonome</b> zenuwstelsel regelt onbewust de organen: hartspier, klieren en glad spierweefsel, zoals de spiertjes in de wand van slagadertjes. Trekken die samen, dan wordt het vat nauwer en stroomt er minder bloed door.</p>
  <p>Een <b>reflexboog</b> is de weg van een onbewuste reactie: receptor → sensorische neuronen → centraal zenuwstelsel → motorische neuronen → effector. Ook autonome reacties kunnen via een reflexboog verlopen.</p>
  <p>Het <b>ademcentrum</b> in de hersenstam regelt de ademhaling. Het krijgt signalen van <b>chemoreceptoren</b> die de samenstelling van het bloed meten (vooral het CO<sub>2</sub>-gehalte en de pH, en het O<sub>2</sub>-gehalte). CO<sub>2</sub> ontstaat in de cellen bij de dissimilatie.</p>`,
  films:[["Adem in, adem uit","films/gaswisseling/1-adem-in-adem-uit.html"],["Het kabelnetwerk","films/zenuwstelsel/2-het-kabelnetwerk.html"]]});

E.zet(T,[14],{titel:"Convergente en divergente evolutie",
  html:`<p>Bij <b>divergente evolutie</b> ontstaan uit één voorouder soorten die steeds meer van elkaar gaan verschillen. Hun overeenkomsten hebben ze van die voorouder geërfd (homologe kenmerken, zoals de botten in de voorpoot van mens, vleermuis en walvis).</p>
  <p>Bij <b>convergente evolutie</b> krijgen soorten die niet nauw verwant zijn een vergelijkbare eigenschap, omdat ze in een vergelijkbare omgeving leven en dezelfde selectiedruk ervaren. Zo'n eigenschap komt niet van een gemeenschappelijke voorouder (analoge kenmerken, zoals de vleugels van een vogel en een insect).</p>`,
  films:[["Vormen van selectie","films/evolutie/3-vormen-van-selectie.html"],["Hoe weten we dat?","films/evolutie/7-hoe-weten-we-dat.html"]]});

/* ---------- opgave 3 ---------- */
E.zet(T,[15,16,17],{titel:"Vetoplosbare stoffen, de huid en de bloedvaten van de lever",
  html:`<p>Bloedplasma bestaat vooral uit water. Stoffen die <b>hydrofoob</b> (vetoplosbaar) zijn, lossen daar slecht in op. Zulke stoffen worden in het bloed vervoerd met hulp van eiwitten of in vetbolletjes.</p>
  <p>De <b>huid</b> bestaat uit de opperhuid en de lederhuid. De opperhuid heeft een buitenste <b>hoornlaag</b> van dode, verhoornde cellen en daaronder de <b>kiemlaag</b> met levende, delende cellen. Daaronder ligt de lederhuid met bloedvaten, zweetklieren en haarzakjes.</p>
  <p>De lever krijgt bloed uit twee bloedvaten: de <b>leverslagader</b> (zuurstofrijk bloed, via de aorta) en de <b>poortader</b> (bloed uit de haarvaten van maag, darmen en milt). Vetten uit de darm worden als chylomicronen opgenomen in de <b>lymfevaten</b> van de darmvlokken. De lymfe komt via de borstbuis in een ader bij het sleutelbeen in het bloed.</p>`,
  films:[["Van darm naar bloed","films/voeding/4-van-darm-naar-bloed.html"],["De lever als fabriek","films/voeding/5-de-lever-als-fabriek.html"],["Eén pomp, twee rondjes","films/transport/1-een-pomp-twee-rondjes.html"]]});

E.zet(T,[18,19],{titel:"Hormonen, receptoren en genregulatie",
  html:`<p><b>Wateroplosbare hormonen</b> (zoals insuline en adrenaline) kunnen niet door het celmembraan. Ze binden aan een receptor op het membraan; daarna ontstaat in de cel een <b>second messenger</b> (bijvoorbeeld cAMP) die het signaal doorgeeft.</p>
  <p><b>Vetoplosbare hormonen</b> (zoals steroïdhormonen) gaan zelf door het membraan en binden aan een receptor ín de cel. Het hormoon-receptorcomplex gaat de kern in en bindt aan een bepaald stukje DNA. Zo'n eiwit dat de transcriptie van genen aan- of uitzet, heet een <b>transcriptiefactor</b>.</p>
  <p>In een celkweekexperiment vergelijk je cellen met en zonder een bepaald gen. Je leert alleen iets over een stof als het uitgeschakelde gen nodig is voor het effect van die stof <i>in de omstandigheden van de proef</i>.</p>`,
  films:[["Post voor iedereen","films/hormonen/1-post-voor-iedereen.html"],["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"]]});

E.zet(T,[20],{titel:"Regeling van het calciumgehalte en de werking van de nier",
  html:`<p>Het calciumgehalte van het bloed wordt binnen nauwe grenzen gehouden. Daarbij werken hormonen uit de <b>schildklier</b> en de <b>bijschildklieren</b> elkaar tegen (antagonisten): het ene verhoogt het calciumgehalte, het andere verlaagt het. Zoek in je informatieboek op welk hormoon uit welke klier komt en wat het doet met bot, darm en nier.</p>
  <p>Begrippen bij de stofuitwisseling: <b>resorptie</b> is opname van stoffen uit de darm in het bloed. In de nier wordt bij <b>filtratie</b> in het kapsel van Bowman bloedplasma (zonder grote eiwitten) in de voorurine geperst. Bij <b>terugresorptie</b> worden nuttige stoffen vanuit de nierbuisjes weer opgenomen in het bloed.</p>`,
  films:[["Uitscheiding en evenwicht","films/gaswisseling/3-uitscheiding-en-evenwicht.html"],["De baas van de klieren","films/hormonen/3-de-baas-van-de-klieren.html"]]});

E.zet(T,[21,22],{titel:"Aangeboren en verworven afweer, MHC en T-helpercellen",
  html:`<p>De <b>aangeboren</b> (niet-specifieke) afweer reageert op elke indringer op dezelfde manier: fagocyten zoals neutrofielen en macrofagen, NK-cellen, ontstekingsreactie. De <b>verworven</b> (specifieke) afweer reageert op één bepaald antigeen: B-cellen (die plasmacellen en antistoffen maken) en T-cellen.</p>
  <p>Cellen laten stukjes eiwit zien op <b>MHC-moleculen</b>. MHC-I zit op bijna alle kernhoudende cellen, MHC-II alleen op <b>antigeenpresenterende cellen</b>. Elk type T-cel herkent één van de twee: zoek in je informatieboek op welke.</p>
  <p>Geactiveerde T-helpercellen kunnen differentiëren tot verschillende typen, die verschillende <b>cytokinen</b> afgeven: sommige stimuleren een ontsteking, andere remmen haar. In een schema betekent een pijl met <b>+</b> stimuleren en met <b>−</b> remmen. Minder van een stof die remt, betekent minder remming.</p>`,
  films:[["De eerste verdediging","films/afweer/1-de-eerste-verdediging.html"],["T-cellen en virussen","films/afweer/3-t-cellen-en-virussen.html"]]});

/* ---------- opgave 4 ---------- */
E.zet(T,[23,24],{titel:"Weefselvloeistof, oedeem en de wet van Fick",
  html:`<p>Aan het begin van een haarvat perst de <b>bloeddruk</b> vocht naar buiten: weefselvloeistof. De plasma-eiwitten zorgen voor een <b>colloïd-osmotische waarde</b> die water terug het bloed in trekt. Het vocht dat niet terugkeert, wordt via de <b>lymfevaten</b> afgevoerd. Ontstaat er meer weefselvloeistof dan er wordt afgevoerd, dan zwelt het weefsel op: <b>oedeem</b>.</p>
  <p>De <b>wet van Fick</b> beschrijft de snelheid van diffusie: snelheid = D · A · ΔC / Δx. Een groter oppervlak (A) of concentratieverschil (ΔC) maakt diffusie sneller; een grotere diffusieafstand (Δx) maakt haar langzamer.</p>`,
  films:[["Weefselvloeistof en lymfe","films/transport/4-weefselvloeistof-en-lymfe.html"],["Diffusie en osmose","films/cellen/diffusie-osmose/index.html"]]});

E.zet(T,[25,26],{titel:"Hardy-Weinberg en mutaties in lichaamscellen",
  html:`<p>Met de <b>regel van Hardy-Weinberg</b> reken je in een grote populatie zonder selectie van allelfrequenties naar genotypefrequenties: <i>p</i> + <i>q</i> = 1 en <i>p</i><sup>2</sup> + 2<i>pq</i> + <i>q</i><sup>2</sup> = 1. Bij een dominant allel hebben zowel homozygoten als heterozygoten het fenotype. Reken met veel decimalen als een allel zeldzaam is.</p>
  <p>De <b>primaire structuur</b> van een eiwit is de volgorde van de aminozuren. Een mutatie die de functie van een eiwit verandert, verandert meestal die volgorde.</p>
  <p>Een mutatie in een <b>lichaamscel</b> (somatische mutatie) komt alleen terecht in de cellen die uit die ene cel ontstaan. Een mutatie in een <b>geslachtscel</b> komt in alle cellen van het kind en kan worden doorgegeven.</p>`,
  films:[["Toeval en uitwisseling","films/evolutie/5-toeval-en-uitwisseling.html"],["Mutaties","films/dna/5-mutaties.html"]]});

E.zet(T,[27],{titel:"Schema's met stimulering en remming",
  html:`<p>In een regelschema geeft een pijl de <b>richting van de invloed</b>: van de oorzaak naar wat erdoor verandert. Het teken zegt of de invloed stimulerend (<b>+</b>) of remmend (<b>−</b>) is.</p>
  <p>Zet de tekst om in losse zinnen van het type ‘<i>stof A</i> doet iets met <i>B</i>’. Het onderwerp van de zin is het begin van de pijl. Werkwoorden als activeren, omzetten en aanmaken geven +; remmen, stoppen en afbreken geven −.</p>
  <p>Versterkt een stap zichzelf via een kring van plussen, dan is er sprake van <b>positieve terugkoppeling</b>.</p>`,
  anim:anim(caps(["‘Insuline stimuleert de opname van glucose door levercellen.’","Onderwerp = begin van de pijl. Stimuleert = +."]),
    i=>E.svg("0 0 520 110",`<defs><marker id="exs27" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--text)"/></marker></defs>`+doos(20,36,130,"insuline")+doos(330,36,170,"glucoseopname")+
      `<line x1="152" y1="55" x2="326" y2="55" stroke="var(--text)" stroke-width="1.8" ${i?'marker-end="url(#exs27)"':""}/><circle cx="240" cy="55" r="11" fill="var(--bg)" stroke="var(--text)"/>${i?'<text x="240" y="60" text-anchor="middle" style="fill:var(--text);font:700 14px var(--tekst)">+</text>':""}`,"Voorbeeld van een pijl met plus")),
  films:[["Post voor iedereen","films/hormonen/1-post-voor-iedereen.html"]]});

E.zet(T,[28,29,30],{titel:"Van DNA naar mRNA: strengen, richting en splicing",
  html:`<p>Bij de transcriptie wordt de <b>matrijsstreng</b> afgelezen. Het mRNA is complementair aan de matrijsstreng en heeft dus dezelfde volgorde als de andere streng, de <b>coderende streng</b>, met U in plaats van T.</p>
  <p>Complementaire strengen lopen <b>antiparallel</b>: tegenover het 5’-uiteinde van de ene streng ligt het 3’-uiteinde van de andere. Een volgorde schrijf je afspraak­gewijs van 5’ naar 3’. DNA bevat A, T, C en G; RNA bevat A, U, C en G.</p>
  <p>Bij eukaryoten bevat het pre-mRNA <b>exons</b> en <b>introns</b>. In de kern wordt het pre-mRNA bewerkt (<b>splicing</b>) voordat het als rijp mRNA naar het grondplasma gaat voor de translatie. Zoek in je informatieboek op welke stukken daarbij verdwijnen.</p>`,
  films:[["Van DNA naar eiwit","films/dna/3-van-dna-naar-eiwit.html"],["De genetische code lezen","films/dna/4-de-genetische-code-lezen.html"]]});

E.zet(T,[31,32],{titel:"Transport door het membraan en moleculaire technieken",
  html:`<p>Kleine moleculen gaan door het membraan via <b>diffusie</b>, via kanaal- of dragereiwitten, of met <b>actief transport</b>. Grote deeltjes worden opgenomen doordat het membraan instulpt en een blaasje afsnoert (<b>endocytose</b>; bij vaste deeltjes heet dat ook fagocytose) of afgegeven doordat een blaasje met het membraan versmelt (exocytose).</p>
  <p><b>RNA-interferentie</b>: een kort stukje nucleïnezuur bindt aan een complementair mRNA, waarna dat mRNA wordt afgebroken en er geen eiwit meer van wordt gemaakt. Het gen zelf blijft onveranderd.</p>
  <p><b>Recombinant-DNA-techniek</b>: DNA van verschillende herkomst wordt samengevoegd, bijvoorbeeld een menselijk gen in een plasmide van een bacterie. Met <b>crispr-cas</b> knip je DNA op een precieze plek door; de cel herstelt de breuk, vaak met een fout.</p>`,
  films:[["CRISPR: wat doet dit gen?","films/vervolg/biomedisch-2-crispr-wat-doet-dit-gen.html"],["Wat heb jij aan DNA?","films/dna/8-wat-heb-jij-aan-dna.html"]]});

/* ---------- opgave 5 ---------- */
E.zet(T,[33],{titel:"Enzymen en temperatuur",
  html:`<p>Bijna alle stofwisselingsreacties worden versneld door <b>enzymen</b>: eiwitten met een actief centrum waar het substraat precies in past.</p>
  <p>Bij een hogere temperatuur bewegen moleculen sneller en botsen ze vaker: de reactie gaat sneller, tot de <b>optimumtemperatuur</b>. Daarboven daalt de activiteit snel. Zoek in je informatieboek op wat er dan met de ruimtelijke vorm van het eiwit gebeurt.</p>`,
  anim:anim(caps(["De activiteit van een enzym bij verschillende temperaturen.","Er is een temperatuur waarbij het enzym het snelst werkt: het optimum."]),
    i=>{const X=t=>50+t*6,Y=a=>200-a*1.6;const pts=[];for(let t=0;t<=60;t+=2){const a=t<=40?100*Math.pow(t/40,1.6):Math.max(0,100-(t-40)*7);pts.push(X(t)+","+Y(a));}
      let g=`<line class="ax" x1="${X(0)}" y1="${Y(0)}" x2="${X(62)}" y2="${Y(0)}"/><line class="ax" x1="${X(0)}" y1="${Y(0)}" x2="${X(0)}" y2="${Y(110)}"/><text class="lblm" x="${X(62)}" y="${Y(0)+18}" text-anchor="end">temperatuur →</text><text class="lblm" x="${X(0)+6}" y="${Y(108)}">enzymactiviteit</text>`;
      g+=`<polyline class="cv" points="${pts.join(" ")}"/>`;if(i)g+=`<line x1="${X(40)}" y1="${Y(0)}" x2="${X(40)}" y2="${Y(100)}" stroke="var(--goud)" stroke-dasharray="4 3"/><text class="lbl" x="${X(40)}" y="${Y(103)}" text-anchor="middle" style="fill:var(--goud-text)">optimum</text>`;
      return E.svg("0 0 460 230",g,"Enzymactiviteit tegen temperatuur");}),
  films:[["Alles versneld","films/stofwisseling/1-alles-versneld.html"]]});

E.zet(T,[34],{titel:"Genetic drift",
  html:`<p><b>Genetic drift</b> is een verandering van allelfrequenties in een populatie door toeval: welke individuen toevallig overleven en nakomelingen krijgen. Het allel hoeft geen voordeel of nadeel te hebben. Ook het <b>founder-effect</b> en het <b>bottleneck-effect</b> zijn vormen van genetic drift.</p>
  <p>Vergelijk het met een munt opgooien: hoe vaker je gooit, hoe dichter de uitkomst bij 50% kop komt.</p>`,
  films:[["Toeval en uitwisseling","films/evolutie/5-toeval-en-uitwisseling.html"]]});

E.zet(T,[35],{titel:"Eutrofiëring",
  html:`<p><b>Eutrofiëring</b> is een overmaat aan voedingsstoffen (vooral nitraat en fosfaat) in het water, bijvoorbeeld door afvalwater of bemesting.</p>
  <p>Algen en planten groeien door extra voedingsstoffen. Dode organismen worden afgebroken door <b>reducenten</b> (bacteriën en schimmels), die daarbij zuurstof verbruiken. Elk organisme heeft een <b>tolerantiegebied</b> voor factoren als zuurstof en gifstoffen; buiten die grenzen kan het niet overleven. Bedenk zelf hoe die processen bij eutrofiëring op elkaar volgen.</p>`,
  films:[["Stikstof gaat rond","films/ecologie/7-stikstof-gaat-rond.html"],["Waar blijft het blad?","films/ecologie/4-waar-blijft-het-blad.html"]]});

E.zet(T,[36,37],{titel:"Een leeftijdsklassenmodel lezen",
  html:`<p>In een <b>leeftijdsklassenmodel</b> staat elke cirkel voor een leeftijdsklasse. Een pijl van de ene naar de volgende klasse geeft de <b>overlevingskans</b> voor dat jaar. Een pijl terug naar klasse 0 geeft de <b>voortplanting</b>: hoeveel jongen per individu per jaar. Een pijl van een klasse naar zichzelf betekent dat een dier meerdere jaren in die klasse kan blijven.</p>
  <p>Let op het tellen: wie in klasse 0 zit, is in zijn eerste levensjaar. De kans om meerdere jaren achter elkaar te overleven, reken je uit met de <b>productregel</b>: vermenigvuldig de kansen per jaar.</p>`,
  films:[["Hoeveel passen er?","films/ecologie/1-hoeveel-passen-er.html"]]});

E.zet(T,[38,39],{titel:"Exponentiële en begrensde groei",
  html:`<p>Groeit een populatie elk jaar met hetzelfde <b>percentage</b>, dan is de groei <b>exponentieel</b>: N<sub>t</sub> = N<sub>0</sub> · <i>r</i><sup>t</sup>. Omdat de populatie steeds groter wordt, komen er elk jaar meer individuen bij dan het jaar ervoor: een J-vormige curve.</p>
  <p>In werkelijkheid raakt de groei begrensd door <b>beperkende factoren</b>. De populatie groeit naar de <b>draagkracht</b> van het gebied: het maximale aantal individuen dat er op lange termijn kan leven. Zo ontstaat een S-vormige (logistische) curve.</p>`,
  films:[["Hoeveel passen er?","films/ecologie/1-hoeveel-passen-er.html"],["Plek genoeg?","films/ecologie/plek-genoeg/index.html"]]});
})();
