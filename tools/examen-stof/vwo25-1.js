/* Uitleg van de stof bij oefenexamen vwo 2025-I (tool vwo25-1). Gebouwd in hw/vwo25-1/stof.js, gekopieerd naar tools/examen-stof/vwo25-1.js. */
(function(){
"use strict";
const E=window.EXSTOF;if(!E)return;const T="vwo25-1";
const SV=(vb,inner,lab)=>E.svg(vb,inner,lab);
const pijl=(id,kl)=>`<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${kl}"/></marker>`;
const DEFS=`<defs>${pijl("s25x","var(--text2)")}${pijl("s25g","var(--goud)")}${pijl("s25t","var(--teal)")}${pijl("s25k","var(--koraal)")}</defs>`;
const anim=(steps,draw)=>box=>E.stappen(box,steps,(st,s,i)=>{st.innerHTML=draw(i,s);});
const caps=a=>a.map(c=>({cap:c}));
const doos=(x,y,w,t,kl,h)=>`<rect x="${x}" y="${y}" width="${w}" height="${h||38}" rx="9" fill="var(--surface)" stroke="${kl||"var(--line2)"}" stroke-width="1.6"/><text class="lbl" x="${x+w/2}" y="${y+(h||38)/2+5}" text-anchor="middle">${t}</text>`;
const lijn=(x1,y1,x2,y2,m)=>`<path d="M${x1},${y1} L${x2},${y2}" stroke="var(--text2)" stroke-width="1.8" marker-end="url(#${m||"s25x"})"/>`;

/* ===================== opgave 1: slangengif ===================== */
E.zet(T,[1],{titel:"Klieren en weefsels",
  html:`<p>Een <b>klier</b> is een groep cellen die een stof maakt en afgeeft. Er zijn twee soorten:</p>
  <ul><li><b>Exocriene klieren</b> geven hun stof via een <b>afvoerbuis</b> af aan een holte of aan de buitenkant van het lichaam. Voorbeelden: zweetklieren, traanklieren, de alvleesklier (verteringssap naar de darm).</li>
  <li><b>Endocriene klieren</b> (hormoonklieren) hebben geen afvoerbuis: ze geven hun stof direct af aan het bloed. Voorbeelden: schildklier, bijnieren.</li></ul>
  <p>Buizen en holten in het lichaam zijn aan de binnenkant bekleed met <b>dekweefsel (epitheel)</b>: een aaneengesloten laag cellen.</p>
  <p><b>ATP</b> is de energiedrager van de cel. Elke cel maakt zijn eigen ATP (vooral in de mitochondriën) en verbruikt het ook zelf. ATP wordt niet van cel naar cel vervoerd.</p>`,
  films:[["Een fabriek die leeft: celorganellen","films/cellen/celorganellen/index.html"],["Post voor iedereen","films/hormonen/1-post-voor-iedereen.html"]]});

function eiwitroute(i){
  let g=DEFS+`<rect width="600" height="230" fill="var(--surface2)"/>
  <rect x="20" y="20" width="560" height="190" rx="40" fill="var(--surface)" stroke="var(--text3)" stroke-width="2"/>
  <circle cx="110" cy="115" r="55" fill="var(--teal-soft)" stroke="var(--teal)"/><text class="lbl" x="110" y="119" text-anchor="middle">kern (DNA)</text>`;
  if(i>=1)g+=`<path d="M175,80 C200,60 240,60 260,80 C280,100 240,110 260,130 C280,150 240,160 200,150" stroke="var(--text2)" stroke-width="3" fill="none"/>`+[[200,75],[230,64],[256,88],[248,128],[220,150]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4" fill="var(--goud)"/>`).join("")+`<text class="lblm" x="215" y="185" text-anchor="middle">ER met ribosomen</text>`;
  if(i>=2)g+=`<path d="M330,80 h70 M325,100 h80 M330,120 h70 M340,140 h50" stroke="var(--paars)" stroke-width="5" stroke-linecap="round"/><text class="lblm" x="365" y="185" text-anchor="middle">golgi-systeem</text>`+lijn(270,110,318,110);
  if(i>=3)g+=`<circle cx="460" cy="100" r="10" fill="var(--paars)" opacity=".6"/><circle cx="510" cy="120" r="10" fill="var(--paars)" opacity=".6"/>${lijn(410,105,446,102)}${lijn(520,122,575,140)}<text class="lblm" x="490" y="160" text-anchor="middle">blaasjes → exocytose</text>`;
  return SV("0 0 600 230",g,"Route van een eiwit door de cel");
}
E.zet(T,[2],{titel:"De route van een eiwit door de cel",
  html:`<p>Eiwitten die de cel <b>uitscheidt</b> (zoals enzymen of hormonen) volgen een vaste route:</p>
  <ul><li>In de kern wordt het gen overgeschreven tot mRNA.</li>
  <li>Aan de <b>ribosomen</b> (vaak op het ruw ER) wordt het mRNA vertaald: aminozuren worden aan elkaar gekoppeld tot een eiwitketen (translatie).</li>
  <li>In het <b>golgi-systeem</b> worden de eiwitten afgewerkt (bijvoorbeeld suikergroepen eraan) en in <b>blaasjes</b> verpakt.</li>
  <li>De blaasjes versmelten met de celmembraan en geven hun inhoud af (<b>exocytose</b>).</li></ul>
  <p>Een cel die veel van een bepaalde stof maakt, heeft vaak veel van de organellen die daarvoor nodig zijn.</p>`,
  anim:anim(caps(["De kern bevat het DNA met de genen.","Aan de ribosomen worden eiwitten gemaakt (translatie).","Via het ER gaan de eiwitten naar het golgi-systeem, waar ze worden afgewerkt.","Blaasjes brengen de eiwitten naar de celmembraan en geven ze af: exocytose."]),eiwitroute),
  films:[["Van DNA naar eiwit","films/dna/3-van-dna-naar-eiwit.html"],["Een fabriek die leeft: celorganellen","films/cellen/celorganellen/index.html"]]});

function humoraal(i){
  let g=DEFS+`<rect width="600" height="220" fill="var(--surface2)"/>`;
  g+=doos(20,90,110,"antigeen","var(--koraal)");
  if(i>=1)g+=lijn(130,109,168,109)+doos(170,90,120,"B-cel herkent");
  if(i>=2)g+=lijn(290,100,328,60)+doos(330,40,130,"T-helpercel","var(--teal)")+`<path d="M395,78 L320,98" stroke="var(--teal)" stroke-width="1.6" stroke-dasharray="4 3" marker-end="url(#s25t)"/><text class="lblm" x="420" y="100">activeert</text>`;
  if(i>=3)g+=lijn(290,118,328,160)+doos(330,150,130,"delen")+lijn(460,169,488,140)+doos(490,120,100,"geheugencel")+lijn(460,169,488,190)+doos(490,175,100,"? antistoffen","var(--goud)");
  return SV("0 0 600 220",g,"Humorale afweer");
}
E.zet(T,[3],{titel:"Humorale afweer: hoe ontstaan antistoffen?",
  html:`<p>Bij de <b>specifieke afweer</b> spelen lymfocyten de hoofdrol. Bij de <b>humorale afweer</b> gaat het om antistoffen in het bloed:</p>
  <ul><li>Een <b>B-cel</b> met een passende receptor bindt een antigeen.</li>
  <li>Een <b>T-helpercel</b> die hetzelfde antigeen herkent, activeert die B-cel.</li>
  <li>De geactiveerde B-cel deelt zich vaak. Een deel van de nakomelingen wordt <b>geheugencel</b>, een ander deel gaat grote hoeveelheden antistoffen maken en uitscheiden.</li></ul>
  <p>Andere afweercellen hebben andere taken: <b>macrofagen</b> eten ziekteverwekkers op en presenteren antigenen, <b>NK-cellen</b> doden geïnfecteerde cellen en tumorcellen zonder antistoffen.</p>`,
  anim:anim(caps(["Een antigeen (hier: een gifeiwit) komt in het bloed.","Een B-cel met een passende receptor bindt het antigeen.","Een T-helpercel activeert de B-cel.","De B-cel deelt zich: geheugencellen en cellen die antistoffen maken. Hoe heten die laatste?"]),humoraal),
  films:[["Antistoffen op maat","films/afweer/2-antistoffen-op-maat.html"],["T-cellen en virussen","films/afweer/3-t-cellen-en-virussen.html"]]});

function sleutel(i){
  let g=`<rect width="600" height="200" fill="var(--surface2)"/>`;
  const ab=(x,y)=>`<path d="M${x},${y+70} V${y+30} L${x-25},${y} M${x},${y+30} L${x+25},${y}" stroke="var(--teal)" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  g+=ab(140,60);g+=`<text class="lblm" x="140" y="160" text-anchor="middle">antistof</text>`;
  if(i>=1)g+=`<path d="M100,40 l15,-14 l15,14 Z" fill="var(--koraal)"/><path d="M150,40 l15,-14 l15,14 Z" fill="var(--koraal)"/><text class="lblm" x="140" y="20" text-anchor="middle">past: binding</text>`;
  if(i>=2){g+=ab(420,60)+`<text class="lblm" x="420" y="160" text-anchor="middle">andere antistof</text>`;g+=`<rect x="380" y="20" width="18" height="18" fill="var(--paars)"/><rect x="430" y="20" width="18" height="18" fill="var(--paars)"/><text class="lblm" x="420" y="185" text-anchor="middle">ander antigeen: andere vorm</text>`;}
  return SV("0 0 600 200",g,"Antistof en antigeen passen als sleutel en slot");
}
E.zet(T,[4],{titel:"Antistoffen zijn specifiek",
  html:`<p>Een <b>antistof</b> is een Y-vormig eiwit met twee <b>bindingsplaatsen</b>. Die passen precies op één bepaald stukje van een antigeen (een <b>determinant</b>), zoals een sleutel op een slot.</p>
  <p>De vorm van een eiwit wordt bepaald door de volgorde van zijn aminozuren. Verschillen eiwitten in aminozuurvolgorde, dan hebben ze een andere ruimtelijke vorm.</p>
  <p>Een <b>antiserum</b> is bloedplasma (zonder stollingsfactoren) met antistoffen tegen een bepaald antigeen. Wie het krijgt, is direct beschermd: <b>passieve immunisatie</b>.</p>`,
  anim:anim(caps(["Een antistof heeft twee bindingsplaatsen met een bepaalde vorm.","Een antigeen met de passende vorm wordt gebonden.","Een ander antigeen heeft een andere vorm: de antistof bindt het niet."]),sleutel),
  films:[["Antistoffen op maat","films/afweer/2-antistoffen-op-maat.html"],["Vaccins, allergie en bloedgroepen","films/afweer/4-vaccins-allergie-en-bloedgroepen.html"]]});

E.zet(T,[5],{titel:"Stamcellen en differentiatie",
  html:`<p>Alle cellen van een organisme ontstaan uit één zygote en hebben hetzelfde DNA. Tijdens de ontwikkeling <b>specialiseren</b> cellen zich: ze krijgen een eigen vorm en functie. Dat heet <b>differentiatie</b>.</p>
  <p>Een <b>stamcel</b> is een cel die nog niet gespecialiseerd is. Kenmerken:</p>
  <ul><li>hij kan zich (onbeperkt) blijven delen en zo nieuwe stamcellen maken;</li>
  <li>hij kan uitgroeien tot <b>verschillende</b> soorten gespecialiseerde cellen.</li></ul>
  <p>Een gewone gespecialiseerde cel kan zich soms ook delen, maar geeft dan alleen cellen van hetzelfde type. Een <b>organoïde</b> is een klein orgaanachtig klompje, gekweekt uit stamcellen.</p>`,
  films:[["Zelfde DNA, andere cel: stamcellen","films/cellen/stamcellen.html"]]});

E.zet(T,[6],{titel:"Genexpressie: welk mRNA maakt een cel?",
  html:`<p>Elke lichaamscel heeft hetzelfde DNA, maar niet elke cel gebruikt dezelfde genen. Een cel schrijft alleen de genen over die hij nodig heeft: die genen komen <b>tot expressie</b>. Een levercel maakt dus ander mRNA dan een spiercel.</p>
  <p>Daarom kun je aan het <b>mRNA</b> van een cel zien wat voor cel het is. Onderzoekers vergelijken het mRNA-profiel van een onbekende cel met dat van bekende cellen.</p>
  <p>Bij zo’n vergelijking gebruik je ook een <b>controle</b>: een ander celtype, zodat je kunt laten zien dat de overeenkomst echt specifiek is.</p>`,
  films:[["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"],["Zelfde DNA, andere cel: stamcellen","films/cellen/stamcellen.html"]]});

E.zet(T,[7],{titel:"Een antiserum maken",
  html:`<p>Een antiserum tegen slangengif wordt al ruim honderd jaar op dezelfde manier gemaakt:</p>
  <ul><li>gif verzamelen;</li><li>een productiedier (paard, schaap) inspuiten met kleine hoeveelheden verdund gif;</li><li>het dier maakt antistoffen (een immuunreactie die weken duurt);</li><li>bloed afnemen en de antistoffen uit het plasma zuiveren.</li></ul>
  <p>Bedenk bij elke nieuwe techniek: welke van deze stappen vervangt hij, en welke blijven nodig?</p>`,
  films:[["Antistoffen op maat","films/afweer/2-antistoffen-op-maat.html"]]});

/* ===================== opgave 2: overstroming ===================== */
function fick(i){
  let g=DEFS+`<rect width="600" height="220" fill="var(--surface2)"/>
  <text class="lbl" x="300" y="34" text-anchor="middle" style="font-size:16px">diffusiesnelheid ∼ D · A · Δc / Δx</text>`;
  const items=[["D","diffusieconstante: hoe snel de stof door het medium beweegt"],["A","oppervlak waardoor diffusie plaatsvindt"],["Δc","concentratieverschil tussen de twee kanten"],["Δx","afstand (dikte) die de stof moet afleggen"]];
  items.forEach(([k,t],j)=>{if(j>i)return;g+=`<text class="lbl" x="60" y="${75+j*36}" style="fill:var(--goud-text);font-size:15px">${k}</text><text class="lblm" x="110" y="${75+j*36}">${t}</text>`;});
  return SV("0 0 600 220",g,"Wet van Fick");
}
E.zet(T,[8],{titel:"Diffusie en de wet van Fick",
  html:`<p><b>Diffusie</b> is de verplaatsing van deeltjes van een hoge naar een lage concentratie, zonder dat dit energie kost. Hoe snel dat gaat, beschrijft de <b>wet van Fick</b>:</p>
  <p style="text-align:center"><b>diffusiesnelheid ∼ D · A · Δc / Δx</b></p>
  <ul><li>Groter oppervlak (A) of groter concentratieverschil (Δc): sneller.</li><li>Grotere afstand (Δx): langzamer.</li><li>De diffusieconstante (D) hangt af van de stof en van het medium waar die doorheen moet.</li></ul>`,
  anim:anim(caps(["D: de stof en het medium bepalen hoe snel het gaat.","A: hoe groter het contactoppervlak, hoe meer diffusie.","Δc: hoe groter het verschil in concentratie, hoe sneller.","Δx: hoe groter de afstand, hoe langzamer."]),fick),
  films:[["Diffusie en osmose","films/cellen/diffusie-osmose/index.html"],["Gas op reis","films/gaswisseling/2-gas-op-reis.html"]]});

function wortel(i){
  let g=DEFS+`<rect width="600" height="220" fill="var(--surface2)"/>
  <rect x="0" y="0" width="200" height="220" fill="var(--surface)"/><text class="lbl" x="100" y="24" text-anchor="middle">bodem</text>
  <rect x="200" y="0" width="400" height="220" fill="var(--teal-soft)"/><text class="lbl" x="400" y="24" text-anchor="middle">wortelcel</text>`;
  if(i>=1)g+=`<circle cx="120" cy="80" r="7" fill="var(--paars)"/><circle cx="150" cy="140" r="7" fill="var(--paars)"/>`+lijn(160,110,240,110)+`<rect x="196" y="95" width="10" height="30" fill="var(--goud)"/><text class="lblm" x="250" y="100">ionen: actief transport (ATP)</text>`;
  if(i>=2)[[300,70],[340,160],[420,90],[480,150],[510,70]].forEach(([x,y])=>g+=`<circle cx="${x}" cy="${y}" r="7" fill="var(--paars)"/>`);
  if(i>=3)g+=`<path d="M60,190 C120,190 160,195 260,190" stroke="var(--teal)" stroke-width="2.4" fill="none" marker-end="url(#s25t)"/><text class="lblm" x="120" y="180">water volgt door osmose</text>`;
  return SV("0 0 600 220",g,"Opname van ionen en water door een wortelcel");
}
E.zet(T,[9],{titel:"Opname van water en mineralen door de wortel",
  html:`<p>Wortelharen nemen <b>ionen</b> (mineralen) op uit de bodem. In de wortel is de concentratie van die ionen hoger dan in de bodem: de opname gaat dus tegen de concentratiegradiënt in. Dat is <b>actief transport</b>, en daarvoor is <b>ATP</b> nodig.</p>
  <p>ATP maakt een wortelcel met <b>dissimilatie</b>; met zuurstof (aeroob) levert dat veel meer ATP op dan zonder.</p>
  <p>Water wordt niet actief opgenomen, maar volgt passief door <b>osmose</b>: van een lage naar een hoge osmotische waarde. Doordat de wortel water opneemt, ontstaat er <b>worteldruk</b>, die samen met de verdamping (zuigkracht) het water omhoog in de houtvaten brengt.</p>`,
  anim:anim(caps(["Links de bodem, rechts een wortelcel.","Ionen worden met actief transport de wortelcel in gepompt. Dat kost ATP.","Zo wordt de concentratie opgeloste stoffen in de wortel hoger dan in de bodem.","Water volgt door osmose: van laag naar hoog osmotische waarde."]),wortel),
  films:[["Transport in planten","films/transport/6-transport-in-planten.html"],["Alles op adem","films/stofwisseling/2-alles-op-adem.html"]]});

E.zet(T,[10],{titel:"Bouw van een blad: gaswisseling",
  html:`<p>Een blad is aan beide kanten bedekt met een <b>opperhuid</b> met daarop een waslaag, de <b>cuticula</b>. Die laag beschermt tegen uitdroging en laat bijna geen water of gas door.</p>
  <p>In de opperhuid (vooral aan de onderkant) zitten openingen tussen twee <b>sluitcellen</b>. Daardoorheen gaan gassen het blad in en uit: CO<sub>2</sub> erin, O<sub>2</sub> en waterdamp eruit. Sluitcellen kunnen de opening groter en kleiner maken.</p>
  <p>Achter die openingen ligt het <b>sponsparenchym</b> met veel luchtholten, zodat gassen zich door het blad kunnen verspreiden.</p>`,
  films:[["Alles in het groen","films/stofwisseling/3-alles-in-het-groen.html"],["Transport in planten","films/transport/6-transport-in-planten.html"]]});

E.zet(T,[11],{titel:"Een regelmodel lezen",
  html:`<p>Een model van een signaalroute lees je als een keten van oorzaak en gevolg. Een paar regels helpen:</p>
  <ul><li>Een stof die aan een andere stof <b>bindt</b>, haalt die uit de ‘vrije’ voorraad: het complex neemt toe, de vrije stof neemt af.</li>
  <li>Een <b>enzym</b> werkt alleen als alle stoffen aanwezig zijn die het nodig heeft. Ontbreekt er één, dan valt de reactie (grotendeels) stil.</li>
  <li>Een <b>transcriptiefactor</b> is een eiwit dat in de kern bindt aan het DNA en de transcriptie van bepaalde genen aanzet (of remt).</li>
  <li>Wordt een stof <b>afgebroken</b>, dan kan hij zijn werk niet doen. Valt de afbraak weg, dan hoopt hij zich op.</li></ul>
  <p>Volg in het model steeds één pijl tegelijk, en schrijf bij elke stap of iets toeneemt of afneemt.</p>`,
  films:[["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"]]});

E.zet(T,[12],{titel:"Resultaten met mutanten lezen",
  html:`<p>Met <b>mutanten</b> ontdek je wat een gen doet: je vergelijkt planten waarin één gen niet werkt met het <b>wildtype</b> (de normale plant).</p>
  <ul><li>Is het resultaat bij de mutant <b>lager</b> dan bij het wildtype, dan helpt het werkende eiwit normaal juist mee.</li>
  <li>Is het resultaat bij de mutant <b>hoger</b>, dan remt het werkende eiwit normaal.</li></ul>
  <p>Bij een uitspraak als ‘zowel met als zonder behandeling’ moet je <b>beide</b> situaties controleren. Klopt één van de twee niet, dan wordt de uitspraak niet ondersteund.</p>`,
  films:[["Onderzoek doen","films/cellen/onderzoek-doen/index.html"]]});

E.zet(T,[13],{titel:"Genetische modificatie: knock-out en cisgenese",
  html:`<p>Met genetische modificatie verander je het DNA van een organisme gericht:</p>
  <ul><li><b>Knock-out</b>: een gen wordt uitgeschakeld (bijvoorbeeld met CRISPR-Cas). Het eiwit wordt niet meer gemaakt.</li>
  <li><b>Cisgenese</b>: er wordt een gen toegevoegd uit dezelfde soort (of een soort waarmee je kunt kruisen). Vaak gaat het om extra kopieën, zodat er meer van het eiwit gemaakt wordt.</li>
  <li><b>Transgenese</b>: er wordt een gen van een heel andere soort ingebracht.</li></ul>
  <p>Wil je een effect sterker maken, dan zoek je de schakels die het effect bevorderen.</p>`,
  films:[["Wat heb jij aan DNA?","films/dna/8-wat-heb-jij-aan-dna.html"]]});

/* ===================== opgave 3: nijlpaarden ===================== */
function groeicurve(i){
  let g=`<rect width="600" height="230" fill="var(--surface2)"/><line class="ax" x1="60" x2="60" y1="20" y2="200"/><line class="ax" x1="60" x2="570" y1="200" y2="200"/><text class="lblm" x="64" y="18">aantal</text><text class="lblm" x="566" y="218" text-anchor="end">tijd</text>`;
  const J=[],S=[];for(let t=0;t<=50;t++){J.push(`${60+t*10},${200-Math.min(180,3*Math.exp(t*0.09))}`);S.push(`${60+t*10},${200-160/(1+Math.exp(-(t-22)*0.22))}`);}
  if(i>=0)g+=`<polyline points="${J.join(" ")}" fill="none" stroke="var(--koraal)" stroke-width="2.4"/><text class="lbl" x="350" y="40" style="fill:var(--koraal)">J-curve: exponentieel</text>`;
  if(i>=1)g+=`<polyline points="${S.join(" ")}" fill="none" stroke="var(--teal)" stroke-width="2.4"/><line x1="60" x2="570" y1="40" y2="40" stroke="var(--teal)" stroke-dasharray="5 4"/><text class="lbl" x="420" y="70" style="fill:var(--teal)">S-curve: draagkracht</text>`;
  return SV("0 0 600 230",g,"Exponentiële groei en logistische groei");
}
E.zet(T,[14],{titel:"Populatiegroei, niche en draagkracht",
  html:`<p>Een populatie in een nieuw, geschikt gebied groeit eerst <b>exponentieel</b> (J-curve): het aantal verdubbelt steeds in dezelfde tijd. Kenmerk: elke verdubbeling kost even lang, dus de lijn wordt steeds steiler.</p>
  <p>Een soort kan alleen ergens leven als zijn <b>niche</b> daar past: de omstandigheden (temperatuur, water), het voedsel en de ruimte die hij nodig heeft.</p>
  <p>Als de populatie groeit, worden <b>dichtheidsafhankelijke factoren</b> belangrijker: voedselgebrek, concurrentie, ziekten en predatie. De groei remt dan af tot de <b>draagkracht</b> (S-curve). Dichtheidsonafhankelijke factoren (zoals een strenge winter) treffen een populatie ongeacht de grootte.</p>`,
  anim:anim(caps(["Exponentiële groei: steeds dezelfde verdubbelingstijd.","Logistische groei: de groei remt af tot de draagkracht, door dichtheidsafhankelijke factoren."]),groeicurve),
  films:[["Hoeveel passen er?","films/ecologie/1-hoeveel-passen-er.html"],["Waar past een soort?","films/ecologie/2-waar-past-een-soort.html"]]});

E.zet(T,[15],{titel:"Biotische en abiotische factoren",
  html:`<p>De omgeving van een organisme bestaat uit:</p>
  <ul><li><b>Abiotische factoren</b>: niet-levend, zoals temperatuur, licht, water, droogte, zuurgraad.</li>
  <li><b>Biotische factoren</b>: veroorzaakt door andere organismen, zoals voedsel, concurrentie, predatie, parasieten en ziekteverwekkers, en ook de mens.</li></ul>
  <p>Een factor beperkt de groei van een populatie doordat er <b>meer sterfte</b> is, of doordat er <b>minder nakomelingen</b> geboren worden of overleven. Bij een toelichting noem je dus altijd ook dat gevolg.</p>`,
  films:[["Hoeveel passen er?","films/ecologie/1-hoeveel-passen-er.html"],["Wie eet wie?","films/ecologie/3-wie-eet-wie.html"]]});

E.zet(T,[16],{titel:"Genetic drift",
  html:`<p><b>Genetic drift</b> is een toevallige verandering van allelfrequenties in een populatie. Het effect is het grootst in kleine populaties.</p>
  <p>Twee bijzondere vormen:</p>
  <ul><li><b>Flessenhalseffect</b> (bottleneck): een bestaande populatie wordt plotseling heel klein, bijvoorbeeld door een ramp of jacht. Alleen de allelen van de overlevenden gaan door.</li>
  <li><b>Stichtereffect</b> (founder effect): een paar individuen vestigen zich in een nieuw gebied en beginnen daar een nieuwe populatie. De oorspronkelijke populatie blijft bestaan.</li></ul>
  <p>In beide gevallen bevat de nieuwe genenpool maar een toevallig deel van de oorspronkelijke allelen.</p>`,
  films:[["Toeval en uitwisseling","films/evolutie/5-toeval-en-uitwisseling.html"]]});

E.zet(T,[17],{titel:"Soortvorming",
  html:`<p>Een nieuwe soort ontstaat als twee populaties zich niet meer met elkaar voortplanten en hun genenpools uit elkaar groeien (door mutaties, selectie en genetic drift).</p>
  <ul><li><b>Allopatrische soortvorming</b>: de populaties zijn ruimtelijk gescheiden, bijvoorbeeld door een gebergte, zee of rivier. Er is geen uitwisseling van allelen meer.</li>
  <li><b>Sympatrische soortvorming</b>: de populaties leven in hetzelfde gebied, maar planten zich toch niet meer met elkaar voort, bijvoorbeeld door een ander gedrag, een andere voortplantingstijd of polyploïdie.</li></ul>`,
  films:[["Hoe een soort er twee wordt","films/evolutie/6-hoe-een-soort-er-twee-wordt.html"]]});

E.zet(T,[18],{titel:"Successie",
  html:`<p><b>Successie</b> is de geleidelijke verandering van een levensgemeenschap in de loop van de tijd. Op kale grond verloopt die bijvoorbeeld zo:</p>
  <ul><li><b>pioniers</b>: snelgroeiende grassen en kruiden die tegen kale, voedselarme grond kunnen;</li>
  <li>struiken en snelgroeiende bomen;</li>
  <li>het <b>climaxstadium</b>: een stabiel ecosysteem, in Nederland meestal een bos met langzaam groeiende bomen.</li></ul>
  <p>Successie kan stilgezet of teruggezet worden door verstoringen: maaien, branden, overstromingen, en <b>begrazing</b> door grote grazers. Wie wil uitleggen hoe successie wordt tegengegaan, noemt wat er gebeurt én welk stadium daardoor niet bereikt wordt.</p>`,
  films:[["Van zand tot bos","films/ecologie/8-van-zand-tot-bos.html"]]});

function calvin(i){
  let g=DEFS+`<rect width="600" height="240" fill="var(--surface2)"/>
  <circle cx="300" cy="125" r="80" fill="none" stroke="var(--groen)" stroke-width="2.4" stroke-dasharray="6 5"/>
  <text class="lbl" x="300" y="130" text-anchor="middle" style="fill:var(--groen)">Calvincyclus</text>`;
  g+=doos(220,20,160,"ribulosedifosfaat (C5)");
  if(i>=1)g+=doos(40,105,90,"CO₂","var(--goud)")+lijn(130,124,218,124);
  if(i>=2)g+=doos(400,105,180,"twee keer een C3-stof","var(--goud)");
  if(i>=3)g+=doos(220,190,160,"via meer stappen: glucose");
  return SV("0 0 600 240",g,"Calvincyclus");
}
E.zet(T,[19],{titel:"Fotosynthese: de Calvincyclus",
  html:`<p>De fotosynthese bestaat uit twee delen:</p>
  <ul><li>de <b>lichtreacties</b> in de thylakoïden: lichtenergie wordt gebruikt om ATP en NADPH te maken, en water wordt gesplitst (O<sub>2</sub> komt vrij);</li>
  <li>de <b>Calvincyclus</b> (lichtonafhankelijke reacties) in het stroma: daar wordt CO<sub>2</sub> vastgelegd.</li></ul>
  <p>In de Calvincyclus koppelt het enzym <b>rubisco</b> CO<sub>2</sub> aan een molecuul met 5 C-atomen. Het product splitst meteen in twee moleculen met 3 C-atomen. Met ATP en NADPH wordt daar uiteindelijk glucose van gemaakt. De namen van alle tussenstoffen vind je in je informatieboek.</p>`,
  anim:anim(caps(["De Calvincyclus draait in het stroma van de bladgroenkorrel.","CO₂ wordt door rubisco gekoppeld aan een C5-molecuul.","Het product splitst meteen in twee C3-moleculen. Zoek de naam op in je informatieboek.","Met ATP en NADPH uit de lichtreacties wordt er glucose van gemaakt."]),calvin),
  films:[["Alles in het groen","films/stofwisseling/3-alles-in-het-groen.html"]]});

E.zet(T,[20],{titel:"Isotopen en de stikstofkringloop",
  html:`<p><b>Isotopen</b> zijn atomen van hetzelfde element met een verschillend aantal neutronen, zoals <sup>14</sup>N en <sup>15</sup>N. Ze gedragen zich chemisch bijna hetzelfde, maar de lichtere isotoop reageert iets sneller.</p>
  <p>Stikstof in je lichaam zit vooral in <b>aminozuren</b> en eiwitten. Wat je met eiwit binnenkrijgt, wordt deels ingebouwd en deels afgebroken. Bij de afbraak (<b>desaminering</b> in de lever) wordt de aminogroep afgesplitst en als <b>ureum</b> uitgescheiden.</p>
  <p>Planten nemen stikstof op als nitraat of ammonium en bouwen het in in aminozuren: <b>stikstofassimilatie</b>.</p>`,
  films:[["Stikstof gaat rond","films/ecologie/7-stikstof-gaat-rond.html"],["De lever als fabriek","films/voeding/5-de-lever-als-fabriek.html"]]});

E.zet(T,[21],{titel:"Een spreidingsdiagram vergelijken",
  html:`<p>In een spreidingsdiagram staat elk meetpunt voor één monster of één plek. Om een hypothese te toetsen, kijk je per as:</p>
  <ul><li>Op welke as liggen de groepen duidelijk uit elkaar? Op die as zit het verschil.</li>
  <li>Op welke as overlappen ze? Daar is (bijna) geen verschil.</li></ul>
  <p>Zoek daarna in eerdere informatie (een andere afbeelding of de tekst) <b>wat</b> een hoge of lage waarde op die as betekent. Een goede redenering heeft dus twee stappen: wat meet je, en wat zegt dat over de oorsprong van het materiaal?</p>`,
  films:[["Koolstof gaat rond","films/ecologie/6-koolstof-gaat-rond.html"]]});

function zuurstofdag(i){
  let g=DEFS+`<rect width="600" height="220" fill="var(--surface2)"/><line class="ax" x1="60" x2="560" y1="110" y2="110"/><text class="lblm" x="64" y="20">O₂ in het water</text>`;
  const pts=[];for(let h=0;h<=24;h++){const v=Math.sin((h-10)/24*2*Math.PI)*50;pts.push(`${60+h*20.8},${110-v}`);}
  g+=`<polyline points="${pts.join(" ")}" fill="none" stroke="var(--teal)" stroke-width="2.4"/>`;
  ["0.00","6.00","12.00","18.00","24.00"].forEach((t,k)=>g+=`<text class="tick" x="${60+k*125}" y="205" text-anchor="middle">${t}</text>`);
  if(i>=1)g+=`<text class="lbl" x="120" y="190" style="fill:var(--koraal)">nacht: alleen verbruik</text>`;
  if(i>=2)g+=`<text class="lbl" x="300" y="40" style="fill:var(--groen)">dag: fotosynthese &gt; verbruik</text>`;
  return SV("0 0 600 220",g,"Dag-nachtritme van zuurstof in een meer");
}
E.zet(T,[22],{titel:"Zuurstof in een meer over 24 uur",
  html:`<p>De zuurstofconcentratie in een meer hangt af van productie en verbruik:</p>
  <ul><li><b>Productie</b>: fotosynthese door algen en waterplanten, alleen als er licht is.</li>
  <li><b>Verbruik</b>: dissimilatie door alle organismen (dag en nacht), waaronder <b>reducenten</b> (bacteriën en schimmels) die dood organisch materiaal afbreken.</li></ul>
  <p>Bij de afbraak van organisch materiaal komen <b>mineralen</b> vrij (zoals nitraat en fosfaat). Die zijn voedingsstoffen voor algen en planten. Te veel voedingsstoffen in water heet <b>eutrofiëring</b>.</p>`,
  anim:anim(caps(["De zuurstofconcentratie schommelt over het etmaal.","’s Nachts is er alleen verbruik: de concentratie daalt.","Overdag is er fotosynthese: als die groter is dan het verbruik, stijgt de concentratie."]),zuurstofdag),
  films:[["Waar blijft het blad?","films/ecologie/4-waar-blijft-het-blad.html"],["Stikstof gaat rond","films/ecologie/7-stikstof-gaat-rond.html"]]});

E.zet(T,[23],{titel:"Biodiversiteit",
  html:`<p><b>Biodiversiteit</b> is de verscheidenheid aan leven in een gebied: vooral het aantal verschillende soorten, en de verschillen binnen soorten en tussen ecosystemen.</p>
  <p>Biodiversiteit wordt groter als er <b>meer verschillende niches</b> zijn: meer soorten habitats, meer soorten voedselbronnen en schuilplaatsen. Ze wordt kleiner als soorten verdwijnen, bijvoorbeeld door een invasieve soort die inheemse soorten wegconcurreert, of door vervuiling waarbij maar een paar soorten overblijven.</p>`,
  films:[["Waar past een soort?","films/ecologie/2-waar-past-een-soort.html"],["Binnen de grenzen","films/ecologie/5-binnen-de-grenzen.html"]]});

/* ===================== opgave 4: pijnbeleving ===================== */
E.zet(T,[24],{titel:"Stambomen: autosomaal of X-chromosomaal, dominant of recessief",
  html:`<p>Bij een stamboom stel je twee vragen:</p>
  <ul><li><b>Autosomaal of X-chromosomaal?</b> Ligt het gen op een autosoom (chromosoom 1 tot en met 22), dan erft het autosomaal over. Als de tekst het chromosoomnummer noemt, is dat het sterkste bewijs.</li>
  <li><b>Dominant of recessief?</b> Bij recessief kunnen twee ouders zonder het fenotype een kind mét het fenotype krijgen: beide zijn dan drager. Bij dominant heeft elk kind met het fenotype minstens één ouder met het fenotype.</li></ul>
  <p>Soms bewijst een stamboom niets met zekerheid, maar kun je wel zeggen wat <b>waarschijnlijk</b> is. Een allel dat zeer zeldzaam is, komt zelden toevallig bij meerdere mensen tegelijk voor die van buiten de familie komen.</p>`,
  films:[["Stambomen en kansrekenen","films/erfelijkheid/6-stambomen-en-kansrekenen.html"],["Monohybride kruisingen","films/erfelijkheid/2-monohybride-kruisingen.html"]]});

E.zet(T,[25],{titel:"Kiembaan en lichaamscellen",
  html:`<p>Een mutatie wordt alleen doorgegeven aan kinderen als hij in de <b>geslachtscellen</b> zit, of in de cellen waaruit die ontstaan (de <b>kiembaan</b>).</p>
  <ul><li>Een mutatie in een eicel of zaadcel komt in de zygote, en daarmee in <b>alle</b> cellen van het kind.</li>
  <li>Een mutatie die ontstaat tijdens de eerste celdelingen van het embryo komt in een deel van de cellen: alle nakomelingen van die ene cel.</li>
  <li>Een mutatie die later ontstaat in een lichaamscel (<b>somatische mutatie</b>) zit alleen in de nakomelingen van die cel, bijvoorbeeld in een stukje huid. Hij wordt niet doorgegeven.</li></ul>
  <p>Hoe vroeger in de ontwikkeling de mutatie ontstaat, hoe meer weefsels hem bevatten.</p>`,
  films:[["Mutaties","films/dna/5-mutaties.html"]]});

function myeline(i){
  let g=DEFS+`<rect width="600" height="200" fill="var(--surface2)"/><line x1="40" x2="560" y1="${i?130:80}" y2="${i?130:80}" stroke="var(--text2)" stroke-width="4"/>`;
  if(i===0){g+=`<text class="lbl" x="40" y="50">uitloper zonder isolatie</text>`;for(let x=60;x<=540;x+=30)g+=`<circle cx="${x}" cy="80" r="3" fill="var(--koraal)"/>`;g+=`<text class="lblm" x="40" y="110">de impuls gaat stap voor stap de hele membraan langs</text>`;}
  else{g+=`<text class="lbl" x="40" y="80">uitloper met isolerende omhulling</text>`;for(let x=60;x<540;x+=100)g+=`<rect x="${x}" y="116" width="86" height="28" rx="12" fill="var(--goud-soft)" stroke="var(--goud)"/>`;
    for(let x=153;x<540;x+=100)g+=`<path d="M${x-93},105 Q${x-46},${85} ${x},105" stroke="var(--koraal)" stroke-width="1.8" fill="none" marker-end="url(#s25k)"/>`;
    g+=`<text class="lblm" x="40" y="180">de impuls springt van onderbreking naar onderbreking: sneller</text>`;}
  return SV("0 0 600 200",g,"Impulsgeleiding met en zonder isolerende omhulling");
}
E.zet(T,[26],{titel:"Snelheid van impulsgeleiding",
  html:`<p>Hoe snel een impuls door een uitloper van een neuron gaat, hangt af van twee dingen:</p>
  <ul><li><b>de diameter</b>: een dikkere uitloper geleidt sneller;</li>
  <li><b>isolatie</b>: veel uitlopers zijn omgeven door een isolerende laag met regelmatige onderbrekingen. De impuls ‘springt’ dan van onderbreking naar onderbreking (sprongsgewijze of saltatoire geleiding). Dat gaat veel sneller dan langs een uitloper zonder die laag.</li></ul>
  <p>Zoek de namen van de isolerende laag, de cellen die hem maken en de onderbrekingen op in je informatieboek.</p>`,
  anim:anim(caps(["Zonder isolatie gaat de impuls stap voor stap langs de membraan: langzaam.","Met een isolerende laag springt de impuls van onderbreking naar onderbreking: snel."]),myeline),
  films:[["Het kabelnetwerk","films/zenuwstelsel/2-het-kabelnetwerk.html"]]});

E.zet(T,[27],{titel:"Rekenen met geleidingssnelheid",
  html:`<p>Tijd = afstand / snelheid. Een impuls die 1,0 m aflegt met 10 m/s doet daar 0,10 s over.</p>
  <p>Staat er een <b>bereik</b> van snelheden (bijvoorbeeld 4–20 m/s), dan hangt de uitkomst af van welke waarde je kiest. Wordt er gevraagd naar het <b>minimale</b> of <b>maximale</b> verschil tussen twee signalen, bedenk dan eerst:</p>
  <ul><li>bij welke combinatie liggen de twee tijden het dichtst bij elkaar? (kleinste verschil)</li>
  <li>bij welke combinatie het verst uit elkaar? (grootste verschil)</li></ul>
  <p>Reken daarna beide tijden uit en trek ze van elkaar af.</p>`,
  films:[["Een seconde","films/zenuwstelsel/1-een-seconde.html"],["Het kabelnetwerk","films/zenuwstelsel/2-het-kabelnetwerk.html"]]});

function reflexboog(i){
  let g=DEFS+`<rect width="600" height="240" fill="var(--surface2)"/>
  <ellipse cx="200" cy="120" rx="120" ry="95" fill="var(--surface)" stroke="var(--text3)" stroke-width="2"/>
  <path d="M150,60 Q200,100 250,60 Q230,120 250,180 Q200,140 150,180 Q170,120 150,60 Z" fill="var(--line2)"/>
  <text class="lblm" x="200" y="230" text-anchor="middle">ruggenmerg (doorsnede): grijze stof in het midden</text>
  <ellipse cx="420" cy="75" rx="26" ry="18" fill="var(--surface)" stroke="var(--text3)" stroke-width="2"/><text class="lblm" x="420" y="45" text-anchor="middle">ganglion</text>`;
  if(i>=1)g+=`<path d="M580,85 H446" stroke="var(--teal)" stroke-width="2.4"/><circle cx="420" cy="75" r="7" fill="var(--teal)"/><path d="M413,75 H250" stroke="var(--teal)" stroke-width="2.4" marker-end="url(#s25t)"/><text class="lbl" x="520" y="75" style="fill:var(--teal)">sensorisch</text>`;
  if(i>=2)g+=`<circle cx="215" cy="100" r="7" fill="var(--goud)"/><path d="M215,105 V145" stroke="var(--goud)" stroke-width="2.4" marker-end="url(#s25g)"/><text class="lbl" x="230" y="125" style="fill:var(--goud-text)">schakelneuron</text>`;
  if(i>=3)g+=`<circle cx="210" cy="160" r="7" fill="var(--koraal)"/><path d="M217,162 H580" stroke="var(--koraal)" stroke-width="2.4" marker-end="url(#s25k)"/><text class="lbl" x="520" y="180" style="fill:var(--koraal)">motorisch</text>`;
  return SV("0 0 600 240",g,"Ligging van cellichamen van sensorische, schakel- en motorische neuronen bij het ruggenmerg");
}
E.zet(T,[28],{titel:"Neuronen bij het ruggenmerg",
  html:`<p>Bij het ruggenmerg liggen drie soorten neuronen:</p>
  <ul><li><b>Sensorische neuronen</b> brengen impulsen van zintuigcellen naar het ruggenmerg. Hun cellichaam ligt <b>buiten</b> het ruggenmerg, in het spinale ganglion (een verdikking van de achterwortel).</li>
  <li><b>Schakelneuronen</b> liggen helemaal in de grijze stof en verbinden neuronen met elkaar.</li>
  <li><b>Motorische neuronen</b> hebben hun cellichaam in de voorhoorn van de grijze stof en lopen naar spieren of klieren.</li></ul>
  <p>Onthoud ook: alle lichaamscellen met een kern bevatten hetzelfde DNA. Welke genen een cel gebruikt, verschilt wel per celtype.</p>`,
  anim:anim(caps(["Doorsnede van het ruggenmerg met een ganglion ernaast.","Het cellichaam van een sensorisch neuron ligt in het ganglion.","Schakelneuronen liggen in de grijze stof.","Het cellichaam van een motorisch neuron ligt in de voorhoorn."]),reflexboog),
  films:[["Een seconde","films/zenuwstelsel/1-een-seconde.html"],["Het hoofdkantoor","films/zenuwstelsel/5-het-hoofdkantoor.html"]]});

E.zet(T,[29],{titel:"Natuurlijke selectie en geconserveerde genen",
  html:`<p>Mutaties ontstaan willekeurig, overal in het DNA. Of een mutatie in een populatie blijft, hangt af van <b>natuurlijke selectie</b>:</p>
  <ul><li>Een mutatie die de <b>overlevingskans of het voortplantingssucces</b> (fitness) verkleint, wordt minder vaak doorgegeven en verdwijnt.</li>
  <li>Een mutatie zonder effect kan blijven bestaan en zich door toeval verspreiden.</li></ul>
  <p>Een stuk DNA dat bij veel verschillende soorten (bijna) gelijk is, heet <b>geconserveerd</b>. Dat wijst erop dat veranderingen daar steeds werden weggeselecteerd. Bedenk bij zo’n vraag dus: wat zou het organisme missen als dit eiwit niet goed werkt?</p>`,
  films:[["Natuurlijke selectie","films/evolutie/2-natuurlijke-selectie.html"],["Hoe weten we dat?","films/evolutie/7-hoe-weten-we-dat.html"]]});

E.zet(T,[30],{titel:"Van mutatie naar aminozuur: de codontabel",
  html:`<p>Een <b>puntmutatie</b> (substitutie) vervangt één base. Daardoor kan één codon veranderen, en soms ook het aminozuur.</p>
  <ul><li>De <b>coderende streng</b> van het DNA heeft dezelfde basevolgorde als het mRNA, alleen met T in plaats van U.</li>
  <li>De <b>matrijsstreng</b> is complementair: daarvan wordt het mRNA gemaakt.</li></ul>
  <p>Werkwijze: zoek met de lettercode (in je informatieboek) op welke aminozuren het zijn, zoek in de codontabel alle codons van beide, en kijk welke codons met <b>één</b> base verschil in elkaar over kunnen gaan.</p>`,
  films:[["De genetische code lezen","films/dna/4-de-genetische-code-lezen.html"],["Mutaties","films/dna/5-mutaties.html"]]});

function ap(i){
  const X=t=>60+t*5,Y=v=>200-(v+80)*1.6;let g=`<rect width="600" height="240" fill="var(--surface2)"/><line class="ax" x1="60" x2="60" y1="20" y2="210"/>`;
  [-70,-55,0,30].forEach(v=>g+=`<text class="tick" x="54" y="${Y(v)+4}" text-anchor="end">${v}</text>`);g+=`<text class="lblm" x="64" y="18">membraanpotentiaal (mV)</text>`;
  g+=`<line x1="60" x2="560" y1="${Y(-55)}" y2="${Y(-55)}" stroke="var(--teal)" stroke-dasharray="5 4"/><text class="lbl" x="556" y="${Y(-55)-6}" text-anchor="end" style="fill:var(--teal)">drempelpotentiaal</text>`;
  g+=`<path d="M${X(0)},${Y(-70)} H${X(10)} L${X(14)},${Y(-60)} L${X(18)},${Y(-70)} H${X(30)}" stroke="var(--text)" stroke-width="2" fill="none"/>`;
  if(i>=1)g+=`<path d="M${X(30)},${Y(-70)} H${X(40)} L${X(44)},${Y(-55)} L${X(47)},${Y(30)} L${X(52)},${Y(-78)} L${X(58)},${Y(-70)} H${X(95)}" stroke="var(--koraal)" stroke-width="2.4" fill="none"/>`;
  if(i>=1)g+=`<text class="lblm" x="${X(16)}" y="${Y(-75)+20}" text-anchor="middle">onder de drempel: niets</text><text class="lblm" x="${X(62)}" y="${Y(10)}">drempel bereikt: actiepotentiaal</text>`;
  return SV("0 0 600 240",g,"Actiepotentiaal en drempelpotentiaal");
}
E.zet(T,[31],{titel:"Actiepotentiaal en drempelpotentiaal",
  html:`<p>In rust is de binnenkant van een neuron negatief: de <b>rustpotentiaal</b> is ongeveer −70 mV. Een prikkel maakt de membraanpotentiaal minder negatief.</p>
  <p>Komt de membraanpotentiaal boven de <b>drempelpotentiaal</b> (ongeveer −55 mV), dan gaan spanningsafhankelijke Na<sup>+</sup>-kanaaltjes open. Na<sup>+</sup> stroomt naar binnen en er ontstaat een <b>actiepotentiaal</b>. Blijft de prikkel onder de drempel, dan gebeurt er niets (alles-of-niets).</p>
  <p>De drempel is dus het punt waarop de Na<sup>+</sup>-kanaaltjes opengaan. Teken bij een vraag hierover rustpotentiaal en drempel op een getallenlijn: dan zie je goed wat ‘hoger’ en ‘lager’ betekent.</p>`,
  anim:anim(caps(["Een zwakke prikkel blijft onder de drempel: geen impuls.","Een prikkel die de drempel haalt, geeft een actiepotentiaal (alles of niets)."]),ap),
  films:[["Het kabelnetwerk","films/zenuwstelsel/2-het-kabelnetwerk.html"]]});

E.zet(T,[32],{titel:"Dominant en recessief op het niveau van eiwitten",
  html:`<p>Een heterozygoot heeft één allel van elke ouder. Of een allel dominant of recessief is, hangt af van wat de eiwitten doen:</p>
  <ul><li>Een allel is <b>dominant</b> als je het fenotype al ziet bij een heterozygoot.</li>
  <li>Een allel is <b>recessief</b> als het fenotype alleen te zien is bij een homozygoot.</li></ul>
  <p>Elk allel levert zijn eigen versie van het eiwit. Een heterozygoot heeft dus beide versies naast elkaar. Denk bij zo’n vraag steeds aan de heterozygoot: is de hoeveelheid normaal eiwit genoeg, en wat doet het veranderde eiwit erbij?</p>`,
  films:[["Voorbij dominant en recessief","films/erfelijkheid/3-voorbij-dominant-en-recessief.html"]]});

E.zet(T,[33],{titel:"De elektrische prikkelgeleiding in het hart",
  html:`<p>Het hart klopt uit zichzelf: de <b>sinusknoop</b> maakt regelmatig impulsen. Die gaan via de boezems naar de AV-knoop, en daarna via de bundel van His en de vezels van Purkinje naar de kamers. Zo trekken eerst de boezems en dan de kamers samen.</p>
  <p>Ook in hartspiercellen ontstaan <b>actiepotentialen</b> door het openen van Na<sup>+</sup>-kanaaltjes. Is de prikkelgeleiding verstoord, dan raakt het ritme van de hartslag in de war.</p>
  <p>Andere hartproblemen hebben een andere oorzaak: bij een hartinfarct krijgt een deel van de hartspier geen zuurstof door een afgesloten kransslagader, en een lekkende hartklep is een probleem met de bouw van de klep.</p>`,
  films:[["Het hart onder controle","films/transport/5-het-hart-onder-controle.html"],["Een pomp, twee rondjes","films/transport/1-een-pomp-twee-rondjes.html"]]});

/* ===================== opgave 5: histamine ===================== */
function temp(i){
  const X=t=>60+t*10,Y=v=>200-v*1.6;let g=`<rect width="600" height="230" fill="var(--surface2)"/><line class="ax" x1="60" x2="60" y1="20" y2="200"/><line class="ax" x1="60" x2="560" y1="200" y2="200"/>`;
  g+=`<text class="lblm" x="64" y="18">reactiesnelheid</text><text class="lblm" x="556" y="218" text-anchor="end">temperatuur (°C)</text>`;
  [0,10,20,30,40,50].forEach(t=>g+=`<text class="tick" x="${X(t)}" y="214" text-anchor="middle">${t}</text>`);
  const p=[];for(let t=0;t<=50;t++){const v=t<=37?100*Math.pow(2,(t-37)/10):100*Math.max(0,1-(t-37)/10);p.push(`${X(t)},${Y(v)}`);}
  g+=`<polyline points="${p.join(" ")}" fill="none" stroke="var(--teal)" stroke-width="2.4"/>`;
  if(i>=1)g+=`<text class="lbl" x="${X(8)}" y="${Y(40)}" style="fill:var(--teal)">kouder: langzamer</text>`;
  if(i>=2)g+=`<text class="lbl" x="${X(41)}" y="${Y(70)}" style="fill:var(--koraal)">te heet: denaturatie</text>`;
  return SV("0 0 600 230",g,"Reactiesnelheid van een enzym bij verschillende temperaturen");
}
E.zet(T,[34],{titel:"Enzymen en temperatuur",
  html:`<p>Een <b>enzym</b> zet een substraat om doordat het substraat in het <b>actieve centrum</b> past en daar bindt (enzym-substraatcomplex). Daarvoor moeten enzym en substraat elkaar eerst tegenkomen.</p>
  <ul><li>Moleculen bewegen voortdurend. Hoe <b>hoger</b> de temperatuur, hoe sneller ze bewegen.</li>
  <li>Boven een bepaalde temperatuur verandert de ruimtelijke vorm van het enzym blijvend: <b>denaturatie</b>. Dan werkt het enzym niet meer, ook niet als het weer afkoelt.</li></ul>
  <p>Zo heeft elk enzym een optimumtemperatuur waarbij het het snelst werkt.</p>`,
  anim:anim(caps(["De reactiesnelheid van een enzym bij verschillende temperaturen.","Bij lagere temperatuur gaat het langzamer, maar het enzym blijft heel.","Te heet: het enzym denatureert en werkt niet meer."]),temp),
  films:[["Alles versneld","films/stofwisseling/1-alles-versneld.html"]]});

E.zet(T,[35],{titel:"Bouwstenen van voedingsstoffen",
  html:`<p>Grote voedingsstoffen zijn opgebouwd uit kleinere bouwstenen:</p>
  <ul><li><b>koolhydraten</b> zoals zetmeel: uit monosachariden (glucose);</li>
  <li><b>vetten</b>: uit glycerol en vetzuren;</li>
  <li><b>eiwitten</b>: uit aminozuren. Er zijn twintig verschillende aminozuren.</li></ul>
  <p>Elk <b>aminozuur</b> heeft een aminogroep (NH<sub>2</sub>), een zuurgroep (COOH) en een restgroep die per aminozuur verschilt. In je informatieboek staan ze allemaal.</p>`,
  films:[["Wat zit er in je eten?","films/voeding/1-wat-zit-er-in-je-eten.html"],["Knippen op maat","films/voeding/3-knippen-op-maat.html"]]});

function cascade(i){
  let g=DEFS+`<rect width="600" height="230" fill="var(--surface2)"/>
  <rect x="0" y="60" width="600" height="18" fill="var(--line2)"/><text class="lblm" x="590" y="54" text-anchor="end">celmembraan</text><text class="lblm" x="590" y="100" text-anchor="end">binnen de cel</text>`;
  g+=doos(30,10,150,"signaalstof (buiten)","var(--koraal)",34);
  if(i>=1)g+=doos(30,55,150,"receptor","var(--teal)",28)+lijn(105,44,105,54);
  if(i>=2)g+=lijn(105,83,105,110)+doos(30,112,150,"G-eiwit, enzym","",34);
  if(i>=3)g+=lijn(180,129,228,129)+doos(230,112,170,"tweede boodschapper","var(--goud)",34)+lijn(400,129,438,129)+doos(440,112,140,"effect in de cel","",34);
  return SV("0 0 600 230",g,"Algemene signaalcascade");
}
E.zet(T,[36],{titel:"Signaalcascades en second messengers",
  html:`<p>Veel signaalstoffen (hormonen, neurotransmitters, mediatoren) komen de cel niet in. Ze binden aan een <b>receptor</b> in de celmembraan. Dat zet binnen de cel een kettingreactie in gang: een <b>signaalcascade</b>.</p>
  <ul><li>De signaalstof van buiten heet de <b>first messenger</b>.</li>
  <li>Vaak activeert de receptor een <b>G-eiwit</b>: dat wisselt GDP in voor GTP en zet daarmee een enzym aan.</li>
  <li>Dat enzym maakt in het cytoplasma een klein signaalmolecuul dat het bericht verder door de cel brengt: de <b>second messenger</b>. Een bekend voorbeeld is cAMP.</li></ul>`,
  anim:anim(caps(["Een signaalstof komt van buiten bij de cel.","Hij bindt aan een receptor in de membraan.","De receptor activeert een G-eiwit, dat een enzym aanzet.","Het enzym maakt een tweede boodschapper die in de cel het effect veroorzaakt."]),cascade),
  films:[["Post voor iedereen","films/hormonen/1-post-voor-iedereen.html"]]});

function ademregel(i){
  let g=DEFS+`<rect width="600" height="220" fill="var(--surface2)"/>`;
  g+=doos(220,15,160,"ademcentrum (hersenstam)","var(--teal)");
  if(i>=1)g+=doos(420,90,160,"chemoreceptoren")+`<path d="M500,90 C500,50 420,34 382,34" stroke="var(--text2)" stroke-width="1.8" fill="none" marker-end="url(#s25x)"/>`;
  if(i>=2)g+=doos(420,165,160,"CO₂ en pH in het bloed","var(--koraal)")+lijn(500,165,500,130);
  if(i>=3)g+=doos(20,90,170,"ademspieren")+`<path d="M220,34 C120,34 105,60 105,88" stroke="var(--text2)" stroke-width="1.8" fill="none" marker-end="url(#s25x)"/>`+doos(20,165,170,"ventilatie longen")+lijn(105,128,105,163)+`<path d="M190,184 H418" stroke="var(--text2)" stroke-width="1.6" stroke-dasharray="5 4" marker-end="url(#s25x)"/>`;
  return SV("0 0 600 220",g,"Regeling van de ademhaling");
}
E.zet(T,[37],{titel:"Regeling van de ademhaling",
  html:`<p>Het <b>ademcentrum</b> in de hersenstam regelt hoe snel en diep je ademt. Het krijgt informatie van <b>chemoreceptoren</b> (in de aorta, de halsslagaders en de hersenstam). Die meten vooral de <b>CO<sub>2</sub>-concentratie</b> en de pH van het bloed, en in mindere mate het zuurstofgehalte.</p>
  <p>Stijgt de CO<sub>2</sub>-concentratie (en daalt de pH), dan geven de chemoreceptoren meer impulsen af en stimuleert het ademcentrum de ademspieren: je ademt sneller en dieper. Zo wordt meer CO<sub>2</sub> afgevoerd: negatieve terugkoppeling.</p>
  <p>De bronchiolen zijn omgeven door <b>glad spierweefsel</b>, waarmee hun diameter kan veranderen.</p>`,
  anim:anim(caps(["Het ademcentrum in de hersenstam stuurt de ademhaling.","Het krijgt signalen van chemoreceptoren.","Die meten de CO₂-concentratie en de pH van het bloed.","Het ademcentrum stuurt de ademspieren aan; de ventilatie bepaalt weer hoeveel CO₂ er in het bloed blijft."]),ademregel),
  films:[["Adem in, adem uit","films/gaswisseling/1-adem-in-adem-uit.html"],["Gas op reis","films/gaswisseling/2-gas-op-reis.html"]]});

E.zet(T,[38],{titel:"Bloeddruk en de diameter van bloedvaten",
  html:`<p>De bloeddruk wordt genoteerd als twee getallen: <b>bovendruk / onderdruk</b> (systolisch / diastolisch), in mmHg of kPa. Een normale waarde bij een volwassene in rust is ongeveer 120/80 mmHg (16/11 kPa).</p>
  <p>De wand van slagadertjes bevat <b>glad spierweefsel</b>. Door samentrekken of ontspannen van dat spierweefsel verandert de diameter van de vaten, en daarmee de weerstand die het bloed ondervindt. De bloeddruk hangt af van de pompkracht van het hart en van die weerstand.</p>`,
  films:[["Buizen onder druk","films/transport/2-buizen-onder-druk.html"]]});

E.zet(T,[39],{titel:"Temperatuurregeling en de huid",
  html:`<p>De lichaamstemperatuur wordt geregeld vanuit de hypothalamus. De huid speelt daarbij een grote rol:</p>
  <ul><li>Bij <b>warmte</b>: de bloedvaten in de huid worden wijder en je gaat zweten.</li>
  <li>Bij <b>kou</b>: de bloedvaten in de huid worden nauwer, je gaat rillen en je stofwisseling stijgt.</li></ul>
  <p>Warmte gaat van het warme bloed via de huid naar de omgeving. Hoe meer bloed er door de huid stroomt, hoe meer warmte daar langs komt.</p>
  <p>Bij <b>koorts</b> staat de ‘thermostaat’ in de hypothalamus hoger. Het lichaam reageert dan alsof het te koud is.</p>`,
  films:[["Uitscheiding en evenwicht","films/gaswisseling/3-uitscheiding-en-evenwicht.html"]]});

function leverbloed(i){
  let g=DEFS+`<rect width="600" height="230" fill="var(--surface2)"/>`;
  g+=doos(20,170,120,"darm")+doos(240,90,120,"lever","var(--koraal)")+doos(450,20,130,"hart en aorta");
  if(i>=1)g+=`<path d="M80,170 C80,120 160,109 238,109" stroke="var(--teal)" stroke-width="2.4" fill="none" marker-end="url(#s25t)"/><text class="lbl" x="110" y="130" style="fill:var(--teal)">poortader</text>`;
  if(i>=2)g+=`<path d="M360,100 C420,80 450,60 470,58" stroke="var(--teal)" stroke-width="2.4" fill="none" marker-end="url(#s25t)"/><text class="lbl" x="390" y="78" style="fill:var(--teal)">leverader</text>`;
  if(i>=3)g+=`<path d="M520,58 C520,140 420,130 362,120" stroke="var(--koraal)" stroke-width="2.4" fill="none" marker-end="url(#s25k)"/><text class="lbl" x="470" y="160" style="fill:var(--koraal)">leverslagader</text>`;
  return SV("0 0 600 230",g,"Bloedvaten van de lever");
}
E.zet(T,[40],{titel:"De bloedsomloop van de lever",
  html:`<p>De lever krijgt bloed via twee bloedvaten:</p>
  <ul><li>de <b>poortader</b>: zuurstofarm bloed vol opgenomen voedingsstoffen, rechtstreeks van de darmen;</li>
  <li>de <b>leverslagader</b>: zuurstofrijk bloed uit de aorta.</li></ul>
  <p>Het bloed verlaat de lever via de <b>leverader</b> en gaat naar de onderste holle ader en het hart. Daarna wordt het over het hele lichaam verdeeld.</p>
  <p>Wat via de darm wordt opgenomen, gaat dus eerst langs de lever. De lever haalt veel stoffen uit het bloed, slaat ze op of zet ze om.</p>`,
  anim:anim(caps(["Darm, lever en hart.","De poortader brengt bloed van de darm naar de lever.","De leverader voert het bloed van de lever af naar het hart.","De leverslagader brengt bloed uit de aorta naar de lever."]),leverbloed),
  films:[["De lever als fabriek","films/voeding/5-de-lever-als-fabriek.html"],["Van darm naar bloed","films/voeding/4-van-darm-naar-bloed.html"]]});
})();
