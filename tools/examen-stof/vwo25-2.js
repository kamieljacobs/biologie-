/* Uitleg van de stof · oefenexamen vwo 2025-II (tool vwo25-2). Geladen na de kern tools/examen-stof.js. */
(function(){
"use strict";
const E=window.EXSTOF, T="vwo25-2";
if(!E)return;
const SV=(vb,inner,lab)=>E.svg(vb,inner,lab);
const pijl=(id,kl)=>`<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${kl}"/></marker>`;
const DEFS=`<defs>${pijl("s25a","var(--text2)")}${pijl("s25g","var(--goud)")}${pijl("s25k","var(--koraal)")}${pijl("s25t","var(--teal)")}</defs>`;
const anim=(steps,draw)=>box=>E.stappen(box,steps,(st,s,i)=>{st.innerHTML=draw(i,s);});
const caps=a=>a.map(c=>({cap:c}));
const doos=(x,y,w,t,kl,h=36)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="var(--surface)" stroke="${kl||"var(--line2)"}" stroke-width="1.6"/><text class="lbl" x="${x+w/2}" y="${y+h/2+5}" text-anchor="middle">${t}</text>`;
const lijn=(d,kl,m)=>`<path d="${d}" stroke="${kl||"var(--text2)"}" stroke-width="1.8" fill="none" marker-end="url(#${m||"s25a"})"/>`;

/* ================= opgave 1 · Een brouwerij in de darmen ================= */
/* spijsverteringskanaal: welke sappen waar */
function kanaalSvg(i){
  let g=DEFS;
  const st=[["mond","speeksel: amylase"],["maag","maagsap: zoutzuur + pepsine"],["twaalfvingerige darm","gal + alvleessap (vele enzymen)"],["rest dunne darm","darmsap, vertering af, opname"],["dikke darm","water terug, darmbacteriën"]];
  st.forEach(([a,b],k)=>{const y=14+k*48,on=k===i;g+=`<rect x="20" y="${y}" width="200" height="38" rx="9" fill="var(--surface)" stroke="${on?"var(--goud)":"var(--line2)"}" stroke-width="${on?2.4:1.4}"/><text class="lbl" x="120" y="${y+24}" text-anchor="middle">${a}</text><text class="lblm" x="236" y="${y+24}">${b}</text>`;if(k<4)g+=lijn(`M120,${y+38} V${y+46}`);});
  return SV("0 0 600 256",g,"Het spijsverteringskanaal van mond tot dikke darm met de verteringssappen per deel");
}
E.zet(T,[1,2],{titel:"Vertering en opname in het spijsverteringskanaal",
  html:`<p><b>Vertering</b> is het afbreken van grote voedingsstoffen tot kleine moleculen die door de darmwand kunnen: zetmeel tot glucose, eiwitten tot aminozuren, vetten tot vetzuren en glycerol. Dat doen <b>enzymen</b>, en die hebben daar <b>tijd</b> en <b>contact</b> met het voedsel voor nodig.</p>
  <ul><li>In de <b>maag</b> zorgt zoutzuur voor een lage pH. Daarin werkt pepsine, dat eiwitten in stukken knipt.</li>
  <li>In de <b>twaalfvingerige darm</b> komen twee sappen bij de voedselbrij: <b>alvleessap</b> met enzymen voor zetmeel, eiwitten en vetten, en <b>gal</b> uit de lever (via de galblaas).</li>
  <li><b>Gal</b> bevat geen enzymen. Gal <b>emulgeert</b> vetten: het verdeelt grote vetdruppels in kleine druppeltjes, zodat lipase een groter oppervlak heeft om op te werken.</li>
  <li>In de rest van de <b>dunne darm</b> wordt de vertering afgemaakt en worden de verteringsproducten <b>opgenomen</b> via de darmvlokken. Hoe langer het stuk darm, hoe meer tijd en oppervlak voor opname.</li></ul>`,
  anim:anim(caps(["In de <b>mond</b> begint de vertering van zetmeel.","In de <b>maag</b>: zoutzuur en pepsine. Hoe meer maagwand, hoe meer maagsap.","In de <b>twaalfvingerige darm</b> komen gal en alvleessap via buisjes bij het voedsel.","In de <b>dunne darm</b> wordt verder verteerd en opgenomen. Lengte betekent hier tijd en oppervlak.","In de <b>dikke darm</b> wordt water teruggenomen; hier leven de meeste darmbacteriën."]),kanaalSvg),
  films:[["De reis door je buik","films/voeding/2-de-reis-door-je-buik.html"],["Van darm naar bloed","films/voeding/4-van-darm-naar-bloed.html"]]});

/* hormoon dat een sap aanstuurt, met terugkoppeling (algemeen voorbeeld: CCK) */
function sapSvg(i){
  let g=DEFS;
  g+=doos(200,10,200,"prikkel in de darminhoud",i===0?"var(--goud)":"")+doos(200,90,200,"hormooncel in de wand",i===1?"var(--goud)":"")+doos(200,170,200,"cel die sap afgeeft",i===2?"var(--goud)":"")+doos(200,250,200,"eigenschap van de inhoud",i===3?"var(--goud)":"");
  g+=lijn("M300,46 V88")+`<text class="lbl" x="312" y="72">+</text>`+lijn("M300,126 V168")+`<text class="lbl" x="312" y="152">+ hormoon</text>`+lijn("M300,206 V248");
  if(i>=3)g+=lijn("M200,268 C120,268 120,108 196,108","var(--koraal)","s25k")+`<text class="lblbad" x="110" y="190" text-anchor="end">remt</text>`;
  return SV("0 0 600 292",g,"Een prikkel in de darminhoud zet hormooncellen aan; het hormoon zet sapcellen aan; het resultaat remt de hormooncel weer");
}
E.zet(T,[3],{titel:"Hormonen die verteringssappen regelen",
  html:`<p>De afgifte van verteringssappen wordt deels geregeld door <b>hormonen uit de wand van maag en darm</b>. Cellen in de wand ‘proeven’ wat er in de voedselbrij zit. Komt er een bepaalde stof langs, dan geven ze een hormoon af aan het bloed. Dat hormoon zet andere cellen aan tot het afgeven van sap.</p>
  <p>Zo’n systeem is vaak een <b>regelkring met negatieve terugkoppeling</b>: het resultaat van het sap remt de hormooncellen weer. Zo komt er alleen sap als er voedsel is, en niet meer dan nodig.</p>
  <p>Bij zo’n schema lees je elke pijl als oorzaak en gevolg: een <b>+</b> is ‘meer van de ene geeft meer van de andere’. Wil je weten wat er gebeurt als een stap wegvalt, volg dan de pijlen één voor één: wat komt er minder, en wat doet dat met de volgende stap?</p>`,
  anim:anim(caps(["Er komt een <b>prikkel</b> langs in de darminhoud (bijvoorbeeld een bepaalde voedingsstof).","De <b>hormooncel</b> in de wand reageert en geeft een hormoon af aan het bloed.","Het hormoon bereikt de <b>cellen die het sap maken</b>, die daardoor meer sap afgeven.","Het sap verandert de inhoud. Die verandering <b>remt</b> de hormooncel weer: negatieve terugkoppeling."]),sapSvg),
  films:[["De reis door je buik","films/voeding/2-de-reis-door-je-buik.html"],["Post voor iedereen","films/hormonen/1-post-voor-iedereen.html"]]});

/* microbioom: concurrentie */
function microSvg(i){
  let g=`<rect x="20" y="20" width="560" height="160" rx="20" fill="var(--surface2)" stroke="var(--line2)"/>`;
  const pts=[];for(let k=0;k<48;k++)pts.push([50+(k*97)%510,40+(k*53)%120,k%6]);
  pts.forEach(([x,y,t],k)=>{const weg=i>=1&&k%5!==0;if(weg&&i>=1)return;
    g+=`<ellipse cx="${x}" cy="${y}" rx="9" ry="5" fill="${["var(--teal)","var(--groen)","var(--paars)","var(--teal)","var(--groen)","var(--goud)"][t]}" opacity=".85"/>`;});
  if(i>=2)[[120,70],[200,140],[330,60],[420,120],[500,80],[260,100],[160,110],[380,150]].forEach(([x,y])=>g+=`<ellipse cx="${x}" cy="${y}" rx="9" ry="5" fill="var(--koraal)"/>`);
  g+=`<text class="lbl" x="300" y="206" text-anchor="middle">${["veel soorten bezetten alle plek en voedsel","een middel doodt veel soorten tegelijk","nieuwkomers vinden lege plekken"][i]}</text>`;
  return SV("0 0 600 216",g,"Darmbacteriën als concurrenten om ruimte en voedsel");
}
E.zet(T,[4],{titel:"Je darmbewoners en antibiotica",
  html:`<p>In je darm leven biljoenen micro-organismen van honderden soorten: het <b>microbioom</b>. De meeste zijn nuttig. Ze helpen bij de vertering van vezels, maken vitamines (K, B) en bezetten de ruimte en het voedsel in de darm. Daardoor krijgen ziekmakers weinig kans: ze moeten <b>concurreren</b> met de vaste bewoners.</p>
  <p>Een <b>antibioticum</b> doodt bacteriën of remt hun groei. Een <b>smal-spectrum</b>-middel werkt tegen een paar soorten; een <b>breed-spectrum</b>-middel tegen heel veel soorten tegelijk. Schimmels en virussen worden door antibiotica niet bestreden.</p>
  <p>Bij elk antibioticum speelt ook <b>resistentie</b>: bacteriën die toevallig ongevoelig zijn, overleven en vermenigvuldigen zich.</p>`,
  anim:anim(caps(["Een gezond microbioom: veel soorten, alle plekken bezet.","Een middel dat veel soorten tegelijk doodt, laat weinig bacteriën over."]),microSvg),
  films:[["Je darmbewoners","films/voeding/6-je-darmbewoners.html"],["Antibioticaresistentie","films/vervolg/labtechniek-4-antibioticaresistentie.html"]]});

E.zet(T,[5],{titel:"Gisting: alcohol uit glucose",
  html:`<p>Sommige micro-organismen, zoals gist en bepaalde bacteriën, kunnen zonder zuurstof energie halen uit glucose: <b>anaerobe dissimilatie</b>. Bij <b>alcoholgisting</b> wordt glucose omgezet in <b>ethanol (alcohol) en CO<sub>2</sub></b>:</p>
  <p style="font-family:var(--meta)">C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> → 2 C<sub>2</sub>H<sub>5</sub>OH + 2 CO<sub>2</sub> (+ een beetje ATP)</p>
  <p>Zo maakt een brouwer bier: gist zet de suikers uit gerst om in alcohol. De hoeveelheid alcohol hangt af van hoeveel suiker er beschikbaar is.</p>
  <p>Glucose in je darm komt uit je eten: <b>koolhydraten</b> zoals zetmeel en suikers worden verteerd tot glucose. Eiwitten worden aminozuren, vetten worden vetzuren en glycerol.</p>`,
  films:[["Alles op adem","films/stofwisseling/2-alles-op-adem.html"],["Wat zit er in je eten?","films/voeding/1-wat-zit-er-in-je-eten.html"]]});

/* ================= opgave 2 · Jakobskruiskruid uit de berm ================= */
function successieSvg(i){
  let g="";
  const fase=[["kaal zand","",""],["pioniers","kort, laag, veel zaad",""],["struiken","",""],["climax: bos","lang, groot, schaduw",""]];
  fase.forEach(([a,b],k)=>{const x=20+k*145,on=k===i;g+=`<rect x="${x}" y="20" width="135" height="130" rx="10" fill="var(--surface)" stroke="${on?"var(--goud)":"var(--line2)"}" stroke-width="${on?2.4:1.2}"/><text class="lbl" x="${x+67}" y="170" text-anchor="middle">${a}</text><text class="lblm" x="${x+67}" y="188" text-anchor="middle">${b}</text>`;
    g+=`<path d="M${x+6},140 H${x+129}" stroke="var(--text3)"/>`;
    if(k===1)for(let j=0;j<6;j++)g+=`<path d="M${x+18+j*20},140 v-${14+(j%3)*6}" stroke="var(--groen)" stroke-width="3"/>`;
    if(k===2)for(let j=0;j<3;j++)g+=`<circle cx="${x+30+j*38}" cy="${110-(j%2)*8}" r="18" fill="var(--groen)" opacity=".7"/><path d="M${x+30+j*38},128 V140" stroke="var(--text2)" stroke-width="3"/>`;
    if(k===3)for(let j=0;j<2;j++)g+=`<circle cx="${x+42+j*52}" cy="62" r="30" fill="var(--groen)"/><path d="M${x+42+j*52},92 V140" stroke="var(--text2)" stroke-width="5"/>`;});
  return SV("0 0 600 200",g,"Successie van kaal zand via pioniers en struiken naar een climaxbos");
}
E.zet(T,[6],{titel:"Successie: pioniersoorten en climaxsoorten",
  html:`<p>Op een kale plek verandert de begroeiing in de loop van de tijd vanzelf: <b>successie</b>. Elke fase verandert de bodem en het licht, waardoor er weer andere soorten kunnen groeien.</p>
  <ul><li><b>Pioniersoorten</b> komen als eerste op een open plek. Ze groeien snel, leven vaak kort (een- of tweejarig), maken veel kleine zaden die zich ver verspreiden, en kunnen tegen zon, wind en een arme bodem. In de schaduw van latere soorten verliezen ze de concurrentie.</li>
  <li><b>Climaxsoorten</b> horen bij de eindfase. Ze groeien langzaam, worden groot en oud, maken minder maar grotere zaden, en kunnen goed concurreren in de schaduw.</li></ul>
  <p>Iets wat een plek open houdt (grazers, verstuiving, maaien), houdt de successie tegen.</p>`,
  anim:anim(caps(["Een kale plek: er groeit nog niets.","De eerste <b>pioniers</b> vestigen zich.","Daarna komen struiken: de pioniers krijgen minder licht.","Uiteindelijk een <b>climaxvegetatie</b>, zoals een bos."]),successieSvg),
  films:[["Van zand tot bos","films/ecologie/8-van-zand-tot-bos.html"]]});

E.zet(T,[7,8],{titel:"Assimilatie en transport in een plant",
  html:`<p>Een plant maakt al zijn organische stoffen zelf uit <b>anorganische</b> stoffen (assimilatie):</p>
  <ul><li>Bij <b>fotosynthese</b> maakt de plant glucose uit CO<sub>2</sub> en H<sub>2</sub>O, met lichtenergie.</li>
  <li>Bij <b>stikstofassimilatie</b> bouwt de plant <b>anorganische stikstof</b> uit de bodem (nitraat NO<sub>3</sub><sup>–</sup> of ammonium NH<sub>4</sub><sup>+</sup>) in, samen met stoffen uit de glucose, tot organische stikstofverbindingen zoals aminozuren. Stikstofgas uit de lucht kunnen planten niet zelf gebruiken.</li></ul>
  <p>Een plant heeft twee transportsystemen:</p>
  <ul><li><b>Houtvaten</b>: water en opgeloste zouten van wortel naar blad (anorganische sapstroom). Drijvende krachten: verdamping uit de bladeren (zuigkracht), worteldruk en capillaire werking.</li>
  <li><b>Bastvaten</b>: suikers en andere organische stoffen van waar ze gemaakt worden naar waar ze nodig zijn of worden opgeslagen (organische sapstroom), in alle richtingen. Dit transport kost energie.</li></ul>`,
  films:[["Alles in het groen","films/stofwisseling/3-alles-in-het-groen.html"],["Transport in planten","films/transport/6-transport-in-planten.html"],["Stikstof gaat rond","films/ecologie/7-stikstof-gaat-rond.html"]]});

function haarvatSvg(i){
  let g=DEFS+`<rect x="40" y="70" width="520" height="60" rx="30" fill="var(--koraal-soft)" stroke="var(--text3)"/>
    <text class="lblm" x="50" y="60">slagaderlijk eind</text><text class="lblm" x="550" y="60" text-anchor="end">aderlijk eind</text>
    <text class="lbl" x="300" y="105" text-anchor="middle">bloed met eiwitten</text><text class="lblm" x="300" y="170" text-anchor="middle">weefselvloeistof</text>`;
  if(i>=1)g+=lijn("M140,130 V158","var(--teal)","s25t")+lijn("M180,130 V158","var(--teal)","s25t")+`<text class="lbl" x="160" y="188" text-anchor="middle" style="fill:var(--teal)">bloeddruk wint: eruit</text>`;
  if(i>=2)g+=lijn("M420,160 V134","var(--goud)","s25g")+lijn("M460,160 V134","var(--goud)","s25g")+`<text class="lbl" x="440" y="188" text-anchor="middle" style="fill:var(--goud-text)">zuigkracht wint: erin</text>`;
  if(i>=3)g+=lijn("M300,160 C300,190 560,190 580,168","var(--text2)")+`<text class="lblm" x="560" y="198" text-anchor="end">rest via lymfevaten</text>`;
  return SV("0 0 600 210",g,"Haarvat: aan het begin gaat vocht naar buiten, aan het eind gaat het meeste terug");
}
E.zet(T,[9],{titel:"Weefselvloeistof: eruit en weer terug",
  html:`<p>In een haarvat werken twee krachten tegen elkaar in:</p>
  <ul><li>de <b>bloeddruk</b> duwt vocht door de wand naar buiten;</li>
  <li>de <b>osmotische waarde</b> van het bloed (door de eiwitten in het plasma, die het vat niet uit kunnen) trekt vocht naar binnen.</li></ul>
  <p>Aan het begin van het haarvat is de bloeddruk hoog: plasma zonder de grote eiwitten wordt naar buiten geperst en wordt <b>weefselvloeistof</b>. Hoe heet dit proces? Je kent het ook van de nier. Langs het haarvat daalt de bloeddruk. Aan het eind wint de zuigkracht, en gaat het meeste vocht terug het bloed in. Een klein deel gaat via de <b>lymfevaten</b> terug.</p>
  <p>Raakt dat evenwicht verstoord, dan blijft er vocht in de weefsels achter: <b>oedeem</b>.</p>
  <p>De <b>poortader</b> voert bloed van de darmen naar de lever. De haarvaten in de darmwand lozen hun bloed dus via de poortader.</p>`,
  anim:anim(caps(["Een haarvat tussen een slagadertje en een adertje.","Aan het begin is de bloeddruk hoog: vocht gaat naar buiten.","Aan het eind is de bloeddruk laag: de osmotische zuigkracht haalt vocht terug.","Wat overblijft, gaat via de lymfevaten terug naar het bloed."]),haarvatSvg),
  films:[["Weefselvloeistof en lymfe","films/transport/4-weefselvloeistof-en-lymfe.html"],["Buizen onder druk","films/transport/2-buizen-onder-druk.html"]]});

E.zet(T,[10],{titel:"Rekenen met percentages en dosis per kilogram",
  html:`<p>Bij vergiftiging en medicijnen geef je een dosis vaak op <b>per kilogram lichaamsgewicht</b>, zoals 5 mg/kg. Voor een dier van 40 kg is de dosis dan 40 × 5 = 200 mg.</p>
  <p>Een <b>percentage</b> reken je om naar een getal door te delen door 100: 4% = 0,04 en 0,5% = 0,005.</p>
  <p>Zit een stof in iets wat zelf weer een deel is van iets anders, dan vermenigvuldig je de delen: zit er 0,5% stof in een plant, en is de plant 4% van een mengsel, dan is de stof 0,04 × 0,005 = 0,0002 deel van het mengsel.</p>
  <p>Terugrekenen (‘hoeveel heb ik nodig voor …’) doe je door te <b>delen</b> door dat deel. Werk met een eenheid tegelijk: zet alles in mg of alles in kg.</p>
  <p>Een handige werkwijze: <b>1</b> wat is de grens (de dosis)? <b>2</b> hoeveel van de stof zit er in één eenheid? <b>3</b> hoeveel eenheden passen er in de dosis?</p>`});

E.zet(T,[11,12],{titel:"Co-evolutie, specialisten en concurrentie",
  html:`<p>Planten kunnen niet weglopen voor vraat. Veel planten maken daarom <b>afweerstoffen</b>: bittere of giftige stoffen. Dat kost de plant energie en bouwstoffen.</p>
  <p>Planteneters passen zich daar weer op aan. Sommige insecten worden ongevoelig voor de gifstof, of slaan hem zelfs op als bescherming tegen hun eigen vijanden. Ze worden vaak <b>specialist</b>: ze eten nog maar één of een paar plantensoorten. <b>Generalisten</b> eten veel soorten planten, maar mijden de giftige.</p>
  <p>Begrippen die je hierbij moet kunnen onderscheiden:</p>
  <ul><li><b>Co-evolutie</b>: twee soorten oefenen selectiedruk op elkaar uit en passen zich in de loop van de evolutie steeds aan elkaar aan.</li>
  <li><b>Convergentie</b>: niet-verwante soorten gaan door een vergelijkbare leefomgeving op elkaar lijken (vleugels van vogels en vleermuizen).</li>
  <li><b>Bottleneck effect</b>: een populatie krimpt sterk, en door toeval blijft maar een deel van de genetische variatie over.</li></ul>
  <p><b>Concurrentie</b> tussen planten draait om licht, water en voedingszouten. Een plant die veel schade heeft door vraat, groeit minder goed en verliest terrein.</p>`,
  films:[["Wie eet wie?","films/ecologie/3-wie-eet-wie.html"],["Ingrijpen of laten gaan?","films/ecologie/4-ingrijpen-of-laten-gaan.html"]]});

E.zet(T,[13],{titel:"Inheemse soorten en exoten",
  html:`<p>Een <b>inheemse</b> soort komt van nature in een gebied voor: hij is er zelf gekomen of ontstaan, zonder hulp van de mens.</p>
  <p>Een <b>exoot</b> is een soort die door de mens (bewust of per ongeluk) in een gebied terecht is gekomen waar hij van nature niet voorkomt, bijvoorbeeld via scheepvaart, handel of uitgezette huisdieren. Voorbeelden in Nederland zijn de Amerikaanse rivierkreeft en de Japanse duizendknoop. Sommige exoten worden <b>invasief</b>: ze verdringen inheemse soorten.</p>
  <p>Bij een open vraag over exoten telt vooral: geef een duidelijk standpunt én een argument dat past bij deze definitie.</p>`,
  films:[["Ingrijpen of laten gaan?","films/ecologie/4-ingrijpen-of-laten-gaan.html"]]});

/* ================= opgave 3 · Verouderende eicellen ================= */
function meioseSvg(i){
  let g=DEFS;
  const cel=(x,y,r,chr,on)=>{let s=`<circle cx="${x}" cy="${y}" r="${r}" fill="var(--surface2)" stroke="${on?"var(--goud)":"var(--text2)"}" stroke-width="${on?2.4:1.4}"/>`;
    chr.forEach(([dx,kl,dub],k)=>{s+=`<rect x="${x+dx-3}" y="${y-12}" width="6" height="24" rx="3" fill="${kl}"/>`;if(dub)s+=`<rect x="${x+dx+4}" y="${y-12}" width="6" height="24" rx="3" fill="${kl}"/>`;});return s;};
  const P=[[-14,"var(--teal)",1],[6,"var(--koraal)",1]];
  g+=cel(80,100,40,i>=0?[[-22,"var(--teal)",1],[-6,"var(--koraal)",1],[12,"var(--teal)",1]].slice(0,2).concat([[12,"var(--koraal)",1]]):[],i===0);
  g+=`<text class="lbl" x="80" y="160" text-anchor="middle">2n, chromosomen verdubbeld</text>`;
  if(i>=1){g+=lijn("M124,90 L210,60")+lijn("M124,110 L210,140")+cel(250,60,30,[[-10,"var(--teal)",1],[4,"var(--koraal)",1]].slice(0,1).concat([[6,"var(--koraal)",1]]),i===1)+cel(250,140,30,[[-10,"var(--teal)",1]].concat([[6,"var(--koraal)",1]]),i===1)+`<text class="lbl" x="250" y="190" text-anchor="middle">meiose I: n</text>`;}
  if(i>=2){g+=lijn("M282,55 L380,36")+lijn("M282,65 L380,84")+lijn("M282,135 L380,116")+lijn("M282,145 L380,164");
    [[410,36],[410,84],[410,116],[410,164]].forEach(([x,y])=>g+=cel(x,y,20,[[-6,"var(--teal)",0],[6,"var(--koraal)",0]],i===2));g+=`<text class="lbl" x="470" y="104">meiose II: n</text>`;}
  return SV("0 0 600 200",g,"Meiose: een diploïde cel met verdubbelde chromosomen deelt in meiose I in twee haploïde cellen, die in meiose II weer delen");
}
E.zet(T,[14],{titel:"Meiose en de vorming van eicellen",
  html:`<p>Een <b>diploïde</b> cel (2n) heeft van elk chromosoom twee exemplaren: een van de vader en een van de moeder (een homoloog paar). Een <b>haploïde</b> cel (n) heeft van elk paar er maar één.</p>
  <p>Bij de <b>meiose</b> ontstaan haploïde cellen:</p>
  <ul><li><b>Meiose I</b>: de homologe chromosomen gaan uit elkaar. De dochtercellen zijn al <b>haploïd</b>, al bestaat elk chromosoom nog uit twee chromatiden.</li>
  <li><b>Meiose II</b>: de chromatiden gaan uit elkaar, zoals bij een mitose. De cellen blijven haploïd.</li></ul>
  <p>Bij vrouwen verloopt dit bijzonder: de deling is ongelijk. Bij elke deling krijgt één cel bijna al het cytoplasma, de andere wordt een klein <b>poollichaampje</b>. Het oögonium wordt al vóór de geboorte een primaire oöcyt, die tot de puberteit (of veel later) in meiose I blijft wachten. Meiose II wordt pas afgemaakt bij de bevruchting.</p>
  <p>Bij de <b>bevruchting</b> komen de chromosomen van de zaadcel erbij: de zygote is weer diploïd.</p>`,
  anim:anim(caps(["Een diploïde cel heeft homologe paren; vóór de meiose zijn alle chromosomen verdubbeld (twee chromatiden).","<b>Meiose I</b>: de paren gaan uit elkaar. Elke dochtercel krijgt van elk paar één chromosoom.","<b>Meiose II</b>: de chromatiden gaan uit elkaar."]),meioseSvg),
  films:[["Celdeling","films/voortplanting/celdeling/index.html"],["Van bevruchting tot baby","films/voortplanting/1-precies-op-tijd.html"]]});

E.zet(T,[15],{titel:"Crossing-over en chromosoommutaties",
  html:`<p>In de profase van meiose I gaan homologe chromosomen precies naast elkaar liggen. Dan kunnen chromatiden van de twee homologen <b>stukken uitwisselen</b>: <b>crossing-over</b>. Daardoor ontstaan nieuwe combinaties van allelen op één chromosoom (<b>recombinatie</b>). Dat zorgt voor genetische variatie.</p>
  <p>Gaat er iets mis met de chromosomen, dan spreek je van een <b>chromosoommutatie</b>: een stuk chromosoom gaat verloren (<b>deletie</b>), komt dubbel voor (<b>duplicatie</b>), draait om (<b>inversie</b>) of komt op een ander chromosoom terecht (<b>translocatie</b>). Ook een chromosoom te veel of te weinig (zoals een trisomie) is een chromosomale afwijking.</p>`,
  films:[["Celdeling","films/voortplanting/celdeling/index.html"],["Mutaties","films/dna/5-mutaties.html"]]});

function cyclusSvg(i){
  let g="";
  const X=d=>40+d*18;
  g+=`<path d="M40,200 H560" stroke="var(--text3)"/><text class="lblm" x="300" y="222" text-anchor="middle">dag van de cyclus</text>`;
  [0,7,14,21,28].forEach(d=>g+=`<text class="lblm" x="${X(d)}" y="214" text-anchor="middle">${d}</text>`);
  if(i>=0){const fsh=[[0,120],[4,110],[10,150],[13,100],[14,105],[18,175],[28,150]];g+=`<polyline points="${fsh.map(([d,y])=>X(d)+","+(y-20)).join(" ")}" fill="none" stroke="var(--groen)" stroke-width="2.4"/><text class="lbl" x="${X(2)}" y="80" style="fill:var(--groen)">FSH</text>`;}
  if(i>=1){const lh=[[0,180],[11,175],[13,50],[14,40],[15,90],[17,175],[28,180]];g+=`<polyline points="${lh.map(([d,y])=>X(d)+","+y).join(" ")}" fill="none" stroke="var(--goud)" stroke-width="2.4"/><text class="lbl" x="${X(14)+10}" y="44" style="fill:var(--goud-text)">LH-piek → ovulatie</text>`;}
  if(i>=2){const p=[[0,190],[14,188],[17,140],[21,90],[25,130],[28,188]];g+=`<polyline points="${p.map(([d,y])=>X(d)+","+y).join(" ")}" fill="none" stroke="var(--paars)" stroke-width="2.4"/><text class="lbl" x="${X(21)}" y="80" text-anchor="middle" style="fill:var(--paars)">progesteron</text>`;}
  return SV("0 0 600 230",g,"Hormoonconcentraties tijdens de menstruatiecyclus: FSH, de LH-piek rond dag 14 en progesteron in de tweede helft");
}
E.zet(T,[16,17,22],{titel:"Follikel, ovulatie en de hormonen van de cyclus",
  html:`<p>In de <b>eierstok</b> liggen eicellen in blaasjes: <b>follikels</b>. Elke cyclus rijpt er (meestal) één follikel tot een groot blaasje met vocht aan de rand van de eierstok.</p>
  <ul><li><b>FSH</b> uit de hypofyse stimuleert de groei van de follikels; de follikel maakt oestrogeen.</li>
  <li>Een piek in <b>LH</b> rond dag 14 veroorzaakt de <b>ovulatie</b>: de eicel komt vrij uit de follikel en wordt opgevangen door de eileider.</li>
  <li>Wat van de follikel overblijft wordt het <b>gele lichaam</b>. Dat maakt <b>progesteron</b> (en oestrogeen). Progesteron houdt het baarmoederslijmvlies in stand en <b>remt via negatieve terugkoppeling de afgifte van FSH en LH</b>.</li></ul>
  <p>Let op het verschil tussen drie stappen die vaak door elkaar worden gehaald: <b>ovulatie</b> (de eicel komt vrij uit de eierstok), <b>bevruchting</b> (zaadcel en eicel versmelten, meestal in de eileider) en <b>innesteling</b> (het embryo nestelt zich in het baarmoederslijmvlies).</p>`,
  anim:anim(caps(["<b>FSH</b> laat follikels groeien.","Een <b>LH-piek</b> veroorzaakt de ovulatie.","Het gele lichaam maakt <b>progesteron</b>, dat FSH en LH remt."]),cyclusSvg),
  films:[["Van bevruchting tot baby","films/voortplanting/1-precies-op-tijd.html"],["Anticonceptie, soa's en voortplantingstechniek","films/voortplanting/3-anticonceptie-soa-voortplantingstechniek.html"]]});

function leesraamSvg(i){
  const s1="AUG GCA UUC GAC UGG AAA UAG".split(" ");
  const s2=["AUG","GCU","UCG","ACU","GGA","AAU","AG…"];
  let g="";
  const rij=(y,arr,lab,kl)=>{let s=`<text class="lblm" x="10" y="${y+20}">${lab}</text>`;arr.forEach((c,k)=>{s+=`<rect x="${110+k*68}" y="${y}" width="62" height="30" rx="6" fill="var(--surface)" stroke="${kl||"var(--line2)"}"/><text x="${141+k*68}" y="${y+20}" text-anchor="middle" style="font:600 14px var(--meta);fill:var(--text)">${c}</text>`;});return s;};
  g+=rij(20,s1,"origineel");
  if(i===1)g+=rij(80,s1.slice(0,1).concat(s1.slice(2)),"3 weg","var(--groen)")+`<text class="lblm" x="300" y="136" text-anchor="middle">één codon minder, de rest blijft goed gelezen</text>`;
  if(i===2)g+=rij(80,s2,"1 weg","var(--koraal)")+`<text class="lblm" x="300" y="136" text-anchor="middle">leesraam verschoven: alle codons erna veranderen</text>`;
  return SV("0 0 600 150",g,"Leesraam van mRNA met en zonder deletie");
}
E.zet(T,[18],{titel:"Deleties, leesraam en eiwitstructuur",
  html:`<p>mRNA wordt per <b>drie basen</b> (een codon) gelezen, vanaf het startcodon. Elk codon staat voor één aminozuur, tot er een <b>stopcodon</b> komt.</p>
  <ul><li>Valt er een aantal basen weg dat een <b>veelvoud van drie</b> is, dan mist het eiwit een paar aminozuren, maar de rest wordt gewoon goed gelezen.</li>
  <li>Valt er een aantal weg dat <b>géén veelvoud van drie</b> is, dan verschuift het <b>leesraam</b>: een <b>frameshift</b>. Alle codons daarna worden anders gelezen, en vaak komt er al snel een stopcodon.</li></ul>
  <p>De <b>primaire structuur</b> van een eiwit is de aminozuurvolgorde. Die bepaalt hoe de keten zich vouwt: de <b>secundaire</b> structuur (helix, vouwblad) en de <b>tertiaire</b> structuur (de ruimtelijke vorm van de hele keten). De vorm bepaalt of het eiwit werkt.</p>
  <p>Introns worden uit het pre-mRNA geknipt; mutaties die tellen voor het eiwit, zitten in de <b>exons</b>.</p>`,
  anim:anim(caps(["Een stukje mRNA, per codon gelezen.","Drie basen weg: één aminozuur minder.","Eén base weg: het leesraam schuift op."]),leesraamSvg),
  films:[["Mutaties","films/dna/5-mutaties.html"],["De genetische code lezen","films/dna/4-de-genetische-code-lezen.html"]]});

E.zet(T,[19,20],{titel:"Kruisen met heterozygoten",
  html:`<p>Een <b>heterozygoot</b> (Aa) maakt twee soorten geslachtscellen: de helft met A, de helft met a. Kruis je twee heterozygoten (Aa × Aa), dan zet je dat in een kruisingsschema van 2 × 2:</p>
  <table class="data"><tr><th></th><th>A</th><th>a</th></tr><tr><th>A</th><td>AA</td><td>Aa</td></tr><tr><th>a</th><td>Aa</td><td>aa</td></tr></table>
  <p>De verwachte genotypeverhouding is <b>1 AA : 2 Aa : 1 aa</b>. Elke vorm hoort dus bij een vaste fractie van de nakomelingen.</p>
  <p>Wil je weten hoeveel nakomelingen je nodig hebt om een bepaald aantal van één genotype te krijgen, dan deel je het gewenste aantal door die fractie. Voorbeeld: wil je 10 nakomelingen Aa (fractie ½), dan verwacht je er 10 / ½ = 20 nodig te hebben.</p>
  <p>Om nakomelingen te krijgen moeten de ouders <b>geslachtsrijp</b> worden. Bij zoogdieren zet de hypothalamus in de puberteit de productie van geslachtshormonen in gang.</p>`,
  films:[["Monohybride kruisingen","films/erfelijkheid/2-monohybride-kruisingen.html"],["CRISPR: wat doet dit gen?","films/vervolg/biomedisch-2-crispr-wat-doet-dit-gen.html"]]});

E.zet(T,[21],{titel:"Een goede controlegroep",
  html:`<p>In een experiment wil je weten of één factor (de <b>onafhankelijke variabele</b>) effect heeft op een uitkomst (de <b>afhankelijke variabele</b>). Daarom vergelijk je een groep die de behandeling krijgt met een <b>controlegroep</b>.</p>
  <p>Een goede controlegroep is in <b>alles</b> gelijk aan de behandelde groep, <b>behalve in die ene factor</b>. Zo weet je zeker dat een verschil in uitkomst door die factor komt en niet door iets anders.</p>
  <p>Bij onderzoek met medicijnen krijgt de controlegroep vaak een <b>placebo</b>: een nepmiddel dat er hetzelfde uitziet. Bedenk bij elke behandeling dus goed wat precies de factor is die je onderzoekt, en wat er verder nog bij de behandeling hoort.</p>`,
  films:[["Onderzoek doen in de biologie","films/cellen/onderzoek-doen/index.html"],["Kun je onderzoek vertrouwen?","films/extra/kun-je-onderzoek-vertrouwen.html"]]});

/* ================= opgave 4 · Zwanger met de ziekte van Graves ================= */
E.zet(T,[23],{titel:"Stofwisseling en de regeling van de ademhaling",
  html:`<p><b>Schildklierhormoon</b> (T4, en in de cellen T3) verhoogt de <b>stofwisseling</b> (het basaal metabolisme) van bijna alle lichaamscellen. Cellen dissimileren dan meer glucose en vet. Daarbij komt energie vrij, ook als warmte.</p>
  <p>Bij <b>aerobe dissimilatie</b> wordt O<sub>2</sub> verbruikt en ontstaan CO<sub>2</sub> en H<sub>2</sub>O.</p>
  <p>Het <b>ademcentrum</b> in het verlengde merg regelt de ademhaling. Het krijgt informatie van chemoreceptoren, vooral over de <b>CO<sub>2</sub>-concentratie</b> (pCO<sub>2</sub>) van het bloed. CO<sub>2</sub> maakt het bloed zuurder; een stijging van de pCO<sub>2</sub> is de belangrijkste prikkel om dieper en vaker te ademen. Een sterke daling van de O<sub>2</sub>-concentratie is een extra prikkel.</p>`,
  films:[["Gas op reis","films/gaswisseling/2-gas-op-reis.html"],["De baas van de klieren","films/hormonen/3-de-baas-van-de-klieren.html"]]});

function asSvg(i){
  let g=DEFS+doos(200,10,200,"hypothalamus",i===0?"var(--goud)":"")+doos(200,90,200,"hypofyse",i===0?"var(--goud)":"")+doos(200,170,200,"klier",i===1?"var(--goud)":"")+`<text class="lbl" x="300" y="262" text-anchor="middle">hormoon in het bloed</text>`;
  g+=lijn("M300,46 V88")+`<text class="lblm" x="290" y="72" text-anchor="end">vrijmakend hormoon</text>`+lijn("M300,126 V168")+`<text class="lblm" x="290" y="152" text-anchor="end">stimulerend hormoon</text>`+lijn("M300,206 V244");
  if(i>=2)g+=`<path d="M402,256 C520,256 520,28 404,28" stroke="var(--koraal)" stroke-width="1.8" stroke-dasharray="5 4" fill="none" marker-end="url(#s25k)"/><path d="M402,256 C480,256 480,108 404,108" stroke="var(--koraal)" stroke-width="1.8" stroke-dasharray="5 4" fill="none" marker-end="url(#s25k)"/><text class="lblbad" x="520" y="150" text-anchor="middle">remt</text>`;
  return SV("0 0 600 276",g,"Hormoonas met negatieve terugkoppeling");
}
E.zet(T,[24],{titel:"De hormoonas hypothalamus, hypofyse en schildklier",
  html:`<p>De schildklier wordt aangestuurd door een <b>hormoonas</b>:</p>
  <ul><li>De <b>hypothalamus</b> geeft <b>TRH</b> af.</li><li>TRH zet de <b>hypofyse</b> aan tot het afgeven van <b>TSH</b>.</li><li>TSH bindt aan de TSH-receptoren van de <b>schildklier</b>, die daardoor T4 maakt.</li></ul>
  <p>Het eindproduct remt de as weer: een hoge T4-concentratie remt de afgifte van TRH en TSH. Dat is <b>negatieve terugkoppeling</b>. Zo blijft de T4-concentratie normaal rond een vaste waarde.</p>`,
  anim:anim(caps(["De hypothalamus en de hypofyse sturen met twee hormonen na elkaar.","De klier maakt het eindhormoon.","Het eindhormoon remt de hypothalamus en de hypofyse: negatieve terugkoppeling."]),asSvg),
  films:[["De baas van de klieren","films/hormonen/3-de-baas-van-de-klieren.html"]]});

E.zet(T,[25,26],{titel:"Genregulatie: histonen, methylering en acetylering",
  html:`<p>In de kern is het DNA opgewonden rond eiwitten: <b>histonen</b>. Hoe strak het DNA is opgewonden, bepaalt of een gen kan worden afgelezen.</p>
  <ul><li>Liggen de histonen dicht op elkaar (compact chromatine), dan kan <b>RNA-polymerase</b> niet bij het gen: geen transcriptie.</li>
  <li>Liggen ze los (open chromatine), dan kan RNA-polymerase binden: het gen wordt overgeschreven.</li></ul>
  <p>Aan de uitstekende <b>histonstaarten</b> kunnen kleine chemische groepen worden gezet, zoals <b>acetylgroepen</b> en <b>methylgroepen</b>. Die veranderen hoe strak het DNA rond de histonen ligt. Zo wordt een gen aan- of uitgezet zonder dat de DNA-volgorde verandert (<b>epigenetica</b>). Welk effect een groep heeft, lees je in een examen af uit de afbeelding.</p>
  <p>Voor een gen ligt <b>regulerend DNA</b>: korte stukjes waaraan regulerende eiwitten (activatoren, repressoren) binden. Dat stuk wordt niet vertaald in het eiwit; het <b>coderend DNA</b> (de exons) wel.</p>
  <p><b>Transcriptie</b> is het overschrijven van een gen in mRNA; <b>replicatie</b> is het kopiëren van al het DNA vóór een celdeling.</p>
  <p>Hormonen zijn er in verschillende soorten: <b>eiwit- of peptidehormonen</b> (zoals insuline), <b>steroïdhormonen</b> (zoals oestrogeen) en hormonen die van één <b>aminozuur</b> zijn afgeleid.</p>`,
  films:[["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"],["Post voor iedereen","films/hormonen/1-post-voor-iedereen.html"]]});

E.zet(T,[27,28],{titel:"Organellen, eiwitstructuur en binding",
  html:`<p>Eiwitten die de cel uit moeten (zoals enzymen voor de darm, hormonen en antistoffen) worden gemaakt door <b>ribosomen op het ruw endoplasmatisch reticulum</b> en verlaten de cel uiteindelijk in blaasjes die met het celmembraan versmelten (<b>exocytose</b>). Onderweg komen ze langs twee organellen:</p>
  <ul><li>het <b>endoplasmatisch reticulum (ER)</b>: een netwerk van membranen en holtes, verbonden met het kernmembraan;</li>
  <li>het <b>golgi-systeem</b>: een stapel afgeplatte membraanzakjes waar blaasjes aan- en afgaan.</li></ul>
  <p>Zoek in je boek of informatieboek op welke stap van de afwerking van een eiwit in welk organel plaatsvindt.</p>
  <p>Een eiwit heeft vier structuurniveaus: de <b>primaire</b> structuur (aminozuurvolgorde), de <b>secundaire</b> (helix en vouwblad), de <b>tertiaire</b> (de ruimtelijke vorm van de hele keten) en bij sommige eiwitten de <b>quaternaire</b> (meer ketens samen, zoals bij antistoffen).</p>
  <p>De <b>vorm</b> bepaalt de werking. Een antistof heeft bindingsplaatsen die passen op één molecuulvorm (het antigeen), zoals een sleutel op een slot. Een <b>receptor</b> wordt geactiveerd als er een passend molecuul aan bindt.</p>`,
  films:[["Celorganellen","films/cellen/celorganellen/index.html"],["Antistoffen op maat","films/afweer/2-antistoffen-op-maat.html"]]});

E.zet(T,[29],{titel:"Wat gaat er door de placenta?",
  html:`<p>In de <b>placenta</b> liggen de haarvaten van de foetus in placentavlokken, omgeven door bloed van de moeder. De bloedstromen mengen niet; stoffen gaan door de dunne wand van de vlokken.</p>
  <ul><li>Door de placenta gaan onder andere O<sub>2</sub>, CO<sub>2</sub>, glucose, aminozuren, water, zouten en afvalstoffen, maar ook veel medicijnen, alcohol en nicotine.</li>
  <li>Bloedcellen gaan er normaal niet door.</li>
  <li>Van de antistoffen worden alleen <b>IgG</b>-antistoffen actief door de placenta naar de foetus gebracht. Zo krijgt een baby bij de geboorte de afweer van de moeder mee (<b>passieve immuniteit</b>). Andere klassen (IgM, IgA, IgE) gaan er niet door.</li></ul>`,
  films:[["Van bevruchting tot baby","films/voortplanting/1-precies-op-tijd.html"],["Antistoffen op maat","films/afweer/2-antistoffen-op-maat.html"]]});

E.zet(T,[30],{titel:"Longvolumes en warmteafgifte",
  html:`<p><b>Vitale capaciteit</b> is de grootste hoeveelheid lucht die je na een maximale inademing kunt uitademen. Die hangt af van hoe ver je borstkas en je <b>middenrif</b> kunnen bewegen.</p>
  <p>Je <b>ademminuutvolume</b> is het aantal ademhalingen per minuut × de hoeveelheid lucht per ademteug.</p>
  <p>Je lichaam maakt warmte bij de stofwisseling, en raakt warmte kwijt via de <b>huid</b>. Hoeveel warmte je kunt afgeven, hangt af van het huidoppervlak; hoeveel je maakt, van de hoeveelheid lichaam (de inhoud).</p>
  <p>De <b>oppervlakte-inhoudsverhouding</b> (O/I) daalt als een lichaam groter wordt: de inhoud groeit sneller dan het oppervlak. Een groot lichaam houdt daardoor warmte beter vast, een klein lichaam koelt sneller af (denk aan een muis en een olifant).</p>`,
  films:[["Adem in, adem uit","films/gaswisseling/1-adem-in-adem-uit.html"],["Van molecuul tot biosfeer","films/cellen/van-molecuul-tot-biosfeer.html"]]});

/* ================= opgave 5 · Epilepsie door lintwormlarven ================= */
function hersenSvg(i){
  let g=`<path d="M60,140 C60,50 160,20 280,24 C400,28 470,70 470,140 C470,175 440,190 400,192 L120,192 C80,190 60,170 60,140 Z" fill="var(--surface2)" stroke="var(--text2)" stroke-width="1.6"/>`;
  const kw=[["voorhoofdskwab",120,90,"denken, plannen, willekeurige beweging"],["wandbeenkwab",290,60,"gevoel (tast)"],["achterhoofdskwab",420,120,"zien"],["slaapkwab",250,160,"horen"]];
  kw.forEach(([n,x,y,f],k)=>{const on=i===k+1;g+=`<text class="lbl" x="${x}" y="${y}" text-anchor="middle"${on?' style="fill:var(--goud-text)"':""}>${n}</text>${on?`<text class="lblm" x="${x}" y="${y+16}" text-anchor="middle">${f}</text>`:""}`;});
  g+=`<path d="M330,190 C340,220 360,240 370,262" stroke="var(--text2)" stroke-width="16" stroke-linecap="round" opacity=".45"/><ellipse cx="420" cy="205" rx="44" ry="22" fill="var(--surface2)" stroke="var(--text2)"/>`;
  g+=`<text class="lblm" x="420" y="210" text-anchor="middle">kleine hersenen</text><text class="lbl" x="300" y="262" text-anchor="end"${i===5?' style="fill:var(--goud-text)"':""}>hersenstam (verlengde merg)</text>`;
  if(i===5)g+=`<text class="lblm" x="300" y="278" text-anchor="end">reflexen als slikken, hoesten, ademritme</text>`;
  g+=`<text class="lblm" x="40" y="30">voor</text><text class="lblm" x="500" y="30" text-anchor="end">achter</text>`;
  return SV("0 0 540 290",g,"Zijaanzicht van de hersenen met de kwabben, kleine hersenen en hersenstam");
}
E.zet(T,[31],{titel:"Bouw van de hersenen",
  html:`<p>De <b>grote hersenen</b> hebben een geplooide buitenlaag: de <b>hersenschors</b>. Die bestaat uit <b>grijze stof</b>, vooral cellichamen van neuronen. Daaronder ligt <b>witte stof</b>: bundels uitlopers met een myelineschede, die de hersendelen met elkaar verbinden.</p>
  <p>De schors is verdeeld in <b>kwabben</b> met elk hun eigen centra. Het gezichtscentrum ligt in de <b>achterhoofdskwab</b>, het gehoorcentrum in de slaapkwab, het gevoelscentrum in de wandbeenkwab (achter de centrale groeve) en de motorische schors in de voorhoofdskwab (voor de centrale groeve).</p>
  <p>Onder de grote hersenen liggen de <b>kleine hersenen</b> (coördinatie, evenwicht) en de <b>hersenstam</b> met het verlengde merg: daar zitten centra voor levensreflexen, zoals ademhaling, hartslag, slikken en hoesten.</p>
  <p>Een MRI-scan toont meestal een <b>doorsnede</b>: kijk dus goed op welke hoogte de snede door het hoofd gaat, en welke kant voor en achter is.</p>`,
  anim:anim(caps(["De hersenen van opzij gezien.","De <b>voorhoofdskwab</b>.","De <b>wandbeenkwab</b>.","De <b>achterhoofdskwab</b>.","De <b>slaapkwab</b>.","Onderaan: de kleine hersenen en de <b>hersenstam</b>."]),hersenSvg),
  films:[["Het hoofdkantoor","films/zenuwstelsel/5-het-hoofdkantoor.html"]]});

E.zet(T,[32],{titel:"De synaps en de motorische eindplaat",
  html:`<p>Een neuron bestaat uit een <b>cellichaam</b> met de kern en de meeste ribosomen, dendrieten en een lang axon dat eindigt in uiteinden bij de volgende cel.</p>
  <p>Bij een <b>synaps</b> gebeurt het volgende (zie ook je informatieboek):</p>
  <ul><li>Een actiepotentiaal komt aan in het presynaptische uiteinde (bij een spier: het motorisch eindplaatje).</li>
  <li>Daardoor gaan spanningsgevoelige <b>calciumkanalen</b> open en stromen Ca<sup>2+</sup>-ionen naar binnen.</li>
  <li>Blaasjes met neurotransmitter versmelten met het membraan en geven hun inhoud af in de synapsspleet.</li>
  <li>De neurotransmitter bindt aan receptoren op het postsynaptische membraan. Bij een <b>prikkelende</b> synaps stromen Na<sup>+</sup>-ionen naar binnen: <b>depolarisatie</b>. Bij een <b>remmende</b> synaps wordt de binnenkant juist negatiever: <b>hyperpolarisatie</b>.</li>
  <li>Een enzym breekt de neurotransmitter af, zodat het signaal stopt.</li></ul>`,
  films:[["De spleet","films/zenuwstelsel/3-de-spleet.html"],["Spieren en beweging","films/zenuwstelsel/9-spieren-en-beweging.html"]]});

E.zet(T,[33],{titel:"Oppervlakte en opname",
  html:`<p>Alles wat een organisme opneemt, moet door een oppervlak heen: de darmwand, het longoppervlak, de huid. Hoe <b>groter het oppervlak</b>, hoe meer er per tijdseenheid door kan.</p>
  <p>Daarom zie je in de biologie steeds vormen die het oppervlak vergroten: plooien en <b>darmvlokken</b> in de dunne darm, <b>longblaasjes</b>, <b>wortelharen</b>, dunne platte bladeren.</p>
  <p>De <b>oppervlakte-inhoudsverhouding</b> zegt hoeveel oppervlak er is per hoeveelheid lichaam. Een bol heeft bij een gegeven inhoud de kleinste verhouding; hoe verder een vorm van een bol afwijkt, hoe groter de verhouding.</p>`,
  films:[["Van darm naar bloed","films/voeding/4-van-darm-naar-bloed.html"],["Van molecuul tot biosfeer","films/cellen/van-molecuul-tot-biosfeer.html"]]});

E.zet(T,[34],{titel:"Parasieten: eindgastheer en tussengastheer",
  html:`<p>Een <b>parasiet</b> leeft in of op een ander organisme (de gastheer) en heeft daar voordeel van, ten koste van de gastheer. Veel parasitaire wormen hebben een <b>levenscyclus met meer gastheren</b>:</p>
  <ul><li>In de <b>eindgastheer</b> wordt de parasiet volwassen en plant hij zich geslachtelijk voort (hij maakt eieren).</li>
  <li>In de <b>tussengastheer</b> leeft alleen een larvestadium, vaak ingekapseld in een cyste in spieren of andere weefsels.</li></ul>
  <p>Bij elke stap in zo’n cyclus moet een stadium van de parasiet van de ene gastheer naar de volgende. Vraag je steeds af: welk stadium verlaat deze gastheer, en welk stadium moet de volgende binnenkrijgen?</p>
  <p>Eén soort kan voor dezelfde parasiet zowel eind- als tussengastheer zijn: het hangt af van welk stadium hij binnenkrijgt.</p>`});

function ketenSvg(i){
  let g=DEFS+`<rect x="20" y="70" width="560" height="50" fill="var(--surface2)" stroke="var(--line2)"/><text class="lblm" x="24" y="62">intermembraanruimte</text><text class="lblm" x="24" y="140">matrix</text>`;
  [["I",90],["III",210],["IV",320],["V",480]].forEach(([n,x])=>{g+=`<rect x="${x}" y="60" width="50" height="70" rx="6" fill="var(--surface)" stroke="var(--text2)"/><text class="lbl" x="${x+25}" y="100" text-anchor="middle">${n}</text>`;});
  if(i>=1)g+=`<path d="M70,170 C80,110 150,110 210,100 S320,96 345,140" stroke="var(--teal)" stroke-width="3" fill="none" marker-end="url(#s25t)"/><text class="lbl" x="56" y="186" style="fill:var(--teal)">NADH: e⁻</text><text class="lbl" x="350" y="170" style="fill:var(--teal)">acceptor (bij de mens O₂ → H₂O)</text>`;
  if(i>=2)[115,235,345].forEach(x=>g+=lijn(`M${x},62 V26`,"var(--goud)","s25g")+`<text class="lbl" x="${x}" y="20" text-anchor="middle" style="fill:var(--goud-text)">H⁺</text>`);
  if(i>=3)g+=lijn("M505,26 V128","var(--goud)","s25g")+`<text class="lbl" x="520" y="170" style="fill:var(--goud-text)">ADP + Pi → ATP</text>`;
  return SV("0 0 600 196",g,"Elektronentransportketen in de binnenmembraan van een mitochondrion");
}
E.zet(T,[35,36],{titel:"Citroenzuurcyclus en elektronentransportketen",
  html:`<p>Bij de aerobe dissimilatie in het <b>mitochondrion</b> worden stoffen afgebroken in de <b>citroenzuurcyclus</b> (in de matrix). Daarbij worden waterstofatomen (protonen en elektronen) afgestaan aan <b>waterstofdragers</b>: NAD<sup>+</sup> wordt NADH, FAD wordt FADH<sub>2</sub>. Er ontstaat CO<sub>2</sub>.</p>
  <p>In de <b>binnenmembraan</b> ligt de <b>elektronentransportketen</b> (eiwitcomplexen I tot en met IV):</p>
  <ul><li>NADH en FADH<sub>2</sub> staan elektronen af: zij zijn <b>elektronendonor</b>.</li>
  <li>De elektronen gaan van complex naar complex. De vrijkomende energie gebruiken de complexen om <b>H<sup>+</sup>-ionen</b> naar de intermembraanruimte te pompen: er ontstaat een H<sup>+</sup>-gradiënt.</li>
  <li>Aan het eind neemt een <b>elektronenacceptor</b> de elektronen op. Zonder acceptor loopt de hele keten vast.</li>
  <li>De H<sup>+</sup>-ionen stromen via <b>ATP-synthase</b> (complex V) terug, en die energie wordt gebruikt om ATP te maken uit ADP en P<sub>i</sub> (<b>oxidatieve fosforylering</b>).</li></ul>`,
  anim:anim(caps(["De binnenmembraan van een mitochondrion met de eiwitcomplexen.","NADH staat elektronen af; ze gaan door de keten naar de laatste <b>acceptor</b>.","Met de energie worden <b>H<sup>+</sup>-ionen</b> naar de intermembraanruimte gepompt.","De H<sup>+</sup> stroomt terug via complex V: zo ontstaat <b>ATP</b>."]),ketenSvg),
  films:[["Alles op adem","films/stofwisseling/2-alles-op-adem.html"]]});

E.zet(T,[37],{titel:"Zenuwweefsel herstelt slecht",
  html:`<p>Neuronen in het centrale zenuwstelsel delen na de geboorte nauwelijks nog. Gaat er zenuwweefsel kapot, dan wordt het meestal niet vervangen door nieuwe neuronen. Er ontstaat <b>littekenweefsel</b>.</p>
  <p>Een <b>epileptische aanval</b> ontstaat doordat een groep neuronen tegelijk en ongeremd actiepotentialen afvuurt. Een beschadigde of afwijkende plek in de hersenschors kan zo’n aanval steeds opnieuw laten beginnen.</p>`,
  films:[["Het kabelnetwerk","films/zenuwstelsel/2-het-kabelnetwerk.html"]]});

/* ================= opgave 6 · Dwergolifanten op Sicilië ================= */
function founderSvg(i){
  let g=`<rect x="20" y="30" width="250" height="140" rx="16" fill="var(--surface2)" stroke="var(--line2)"/><text class="lbl" x="145" y="22" text-anchor="middle">vasteland</text>`;
  const kl=["var(--teal)","var(--koraal)","var(--goud)","var(--groen)","var(--paars)"];
  for(let k=0;k<40;k++)g+=`<circle cx="${40+(k*37)%220}" cy="${46+(k*29)%110}" r="6" fill="${kl[k%5]}"/>`;
  if(i>=1){g+=`<ellipse cx="460" cy="100" rx="110" ry="70" fill="var(--surface2)" stroke="var(--line2)"/><text class="lbl" x="460" y="22" text-anchor="middle">eiland</text>`;
    [[430,90,0],[470,110,0],[450,70,2],[490,85,0]].forEach(([x,y,c])=>g+=`<circle cx="${x}" cy="${y}" r="6" fill="${kl[c]}"/>`);
    g+=`<path d="M280,100 H340" stroke="var(--text2)" stroke-width="1.8" stroke-dasharray="5 4"/><text class="lblm" x="310" y="92" text-anchor="middle">een paar</text>`;}
  if(i>=2){[[400,120,0],[420,140,2],[510,130,0],[530,100,0],[520,70,2],[410,80,0]].forEach(([x,y,c])=>g+=`<circle cx="${x}" cy="${y}" r="6" fill="${kl[c]}"/>`);g+=`<text class="lblm" x="460" y="190" text-anchor="middle">groeit, met alleen de meegenomen varianten</text>`;}
  return SV("0 0 600 200",g,"Een paar dieren koloniseren een eiland met een deel van de genetische variatie");
}
E.zet(T,[38,39],{titel:"Populatiegenetica en soortvorming",
  html:`<p>De <b>genenpool</b> van een populatie is het geheel van alle allelen van alle individuen. Die genenpool verandert door:</p>
  <ul><li><b>natuurlijke selectie</b>: dragers van gunstige allelen krijgen meer nakomelingen;</li>
  <li><b>genetische drift</b>: toevallige veranderingen, vooral in kleine populaties. Twee bijzondere vormen: het <b>foundereffect</b> (een paar individuen beginnen een nieuwe populatie, met toevallig een deel van de allelen) en het <b>bottleneck effect</b> (een populatie krimpt sterk);</li>
  <li><b>gene flow</b>: uitwisseling van allelen tussen populaties doordat individuen migreren;</li>
  <li><b>mutaties</b>: nieuwe allelen.</li></ul>
  <p>Een nieuwe soort ontstaat als populaties zich niet meer met elkaar kunnen voortplanten (<b>reproductieve isolatie</b>).</p>
  <ul><li><b>Allopatrische</b> soortvorming: populaties raken geografisch gescheiden (zee, gebergte), er is geen gene flow meer en ze ontwikkelen zich apart.</li>
  <li><b>Sympatrische</b> soortvorming: een nieuwe soort ontstaat in hetzelfde gebied, bijvoorbeeld door een andere voedselkeuze of polyploïdie.</li></ul>`,
  anim:anim(caps(["Een grote populatie met veel verschillende allelen (kleuren).","Een paar individuen bereiken een eiland.","De eilandpopulatie groeit, maar heeft alleen de varianten van die paar kolonisten."]),founderSvg),
  films:[["Toeval en uitwisseling","films/evolutie/5-toeval-en-uitwisseling.html"],["Hoe één soort er twee wordt","films/evolutie/6-hoe-een-soort-er-twee-wordt.html"]]});

E.zet(T,[40],{titel:"De eilandtheorie van MacArthur en Wilson",
  html:`<p>Het aantal soorten op een eiland is volgens de eilandtheorie een <b>evenwicht</b> tussen twee processen:</p>
  <ul><li><b>Immigratie</b>: nieuwe soorten die het eiland bereiken door over het water te komen (vliegen, zwemmen, drijven, meeliften).</li>
  <li><b>Uitsterven</b>: soorten die van het eiland verdwijnen, bijvoorbeeld door toeval in een kleine populatie of door gebrek aan geschikt leefgebied.</li></ul>
  <p>Twee eigenschappen van een eiland bepalen hoe snel elk proces gaat: de <b>afstand tot het vasteland</b> en de <b>grootte</b> van het eiland. Bedenk bij elk proces welke van de twee eigenschappen het meest invloed heeft, en in welke richting.</p>
  <p>Dezelfde redenering geldt voor ‘eilanden’ op het land, zoals losse natuurgebiedjes tussen akkers en wegen.</p>
  <p>Op eilanden met weinig soorten ontbreken vaak <b>predatoren</b> en concurrenten. Dat verandert de selectiedruk op de soorten die er wel zijn.</p>`,
  films:[["Hoe één soort er twee wordt","films/evolutie/6-hoe-een-soort-er-twee-wordt.html"],["Waar past een soort?","films/ecologie/2-waar-past-een-soort.html"]]});

E.zet(T,[41],{titel:"DNA vermenigvuldigen en lezen",
  html:`<p>Uit een oud bot, een haar of een druppel bloed haal je maar heel weinig DNA. Biologen gebruiken daarom een paar vaste technieken:</p>
  <ul><li><b>PCR</b> (polymerasekettingreactie): een stuk DNA wordt in cycli van verhitten (strengen los), afkoelen (primers binden) en verlengen (DNA-polymerase) steeds verdubbeld. Na dertig cycli heb je er meer dan een miljard kopieën van.</li>
  <li><b>Gelelektroforese</b>: DNA-fragmenten worden in een gel door stroom gescheiden op lengte. Zo maak je een DNA-profiel.</li>
  <li><b>Sequencing</b> (sequentiebepaling): de volgorde van de basen (A, T, C, G) van een stuk DNA wordt bepaald.</li></ul>
  <p><b>Mitochondriaal DNA</b> (mtDNA) zit in veel kopieën in elke cel en erft alleen via de moeder over. Het is daarom handig in fossiel materiaal en bij onderzoek naar afstamming.</p>`,
  films:[["Op maat gekopieerd · PCR","films/dna-technieken/1-op-maat-gekopieerd/index.html"],["DNA lezen","films/dna/7-dna-lezen.html"]]});

E.zet(T,[42],{titel:"Rekenen met een snelheid per generatie",
  html:`<p>Een <b>snelheid</b> is een verandering gedeeld door de tijd: bijvoorbeeld mm per jaar. In de evolutie reken je vaak per <b>generatie</b>: de gemiddelde tijd tussen de geboorte van ouders en die van hun kinderen.</p>
  <p>Werkwijze:</p>
  <ul><li>Bepaal de <b>totale verandering</b> (let op de eenheden: zet meters om in millimeters).</li>
  <li>Bepaal de <b>duur</b>. Als een begin of einde als een periode (bijvoorbeeld 10.000 – 20.000 jaar geleden) is gegeven, kies je bewust: de langst mogelijke duur geeft de laagste snelheid, de kortst mogelijke duur de hoogste.</li>
  <li>Reken om naar generaties: <b>aantal generaties = duur / generatietijd</b>.</li>
  <li>Snelheid per generatie = verandering / aantal generaties. Dat is hetzelfde als (verandering / duur) × generatietijd.</li></ul>
  <p>Een voorbeeld met andere getallen: een snavel wordt in 6000 jaar 3 mm langer, bij een generatietijd van 2 jaar. Dat zijn 3000 generaties, dus 3 / 3000 = 0,001 mm per generatie.</p>`,
  films:[["Natuurlijke selectie","films/evolutie/2-natuurlijke-selectie.html"]]});

})();
