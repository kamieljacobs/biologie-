/* Uitleg van de stof · oefenexamen havo 2019-I (tool havo19-1). Gekopieerd naar tools/examen-stof/havo19-1.js door samenvoegen.py. */
(function(){
"use strict";
if(!window.EXSTOF)return;
const E=window.EXSTOF,T="havo19-1";
const anim=(steps,draw)=>box=>E.stappen(box,steps,(st,s,i)=>{st.innerHTML=draw(i,s);});
const caps=a=>a.map(c=>({cap:c}));
const F={
  hor1:["Post voor iedereen","films/hormonen/1-post-voor-iedereen.html"],hor4:["Stress","films/hormonen/4-stress.html"],
  buis:["Buizen onder druk","films/transport/2-buizen-onder-druk.html"],pomp:["Eén pomp, twee rondjes","films/transport/1-een-pomp-twee-rondjes.html"],
  bloed:["Wat er in je bloed zit","films/transport/3-wat-er-in-je-bloed-zit.html"],weef:["Weefselvloeistof en lymfe","films/transport/4-weefselvloeistof-en-lymfe.html"],
  zin:["Zintuigen","films/zenuwstelsel/8-zintuigen.html"],onderz:["Onderzoek doen","films/cellen/onderzoek-doen/index.html"],
  voed3:["Knippen op maat","films/voeding/3-knippen-op-maat.html"],enz:["Alles versneld","films/stofwisseling/1-alles-versneld.html"],
  eco3:["Wie eet wie?","films/ecologie/3-wie-eet-wie.html"],eco2:["Waar past een soort?","films/ecologie/2-waar-past-een-soort.html"],stik:["Stikstof gaat rond","films/ecologie/7-stikstof-gaat-rond.html"],
  eco5:["Waarom zo weinig roofdieren?","films/ecologie/5-waarom-zo-weinig-roofdieren.html"],
  evo2:["Natuurlijke selectie","films/evolutie/2-natuurlijke-selectie.html"],evo6:["Hoe één soort er twee wordt","films/evolutie/6-hoe-een-soort-er-twee-wordt.html"],
  afw1:["De eerste verdediging","films/afweer/1-de-eerste-verdediging.html"],afw2:["Antistoffen op maat","films/afweer/2-antistoffen-op-maat.html"],afw3:["T-cellen en virussen","films/afweer/3-t-cellen-en-virussen.html"],afw4:["Vaccins, allergie en bloedgroepen","films/afweer/4-vaccins-allergie-en-bloedgroepen.html"],
  erf4:["Dihybride kruising en gekoppelde overerving","films/erfelijkheid/4-dihybride-kruising-en-gekoppelde-overerving.html"],erf6:["Stambomen en kansrekenen","films/erfelijkheid/6-stambomen-en-kansrekenen.html"],
  uitsch:["Uitscheiding en evenwicht","films/gaswisseling/3-uitscheiding-en-evenwicht.html"],adem:["Adem in, adem uit","films/gaswisseling/1-adem-in-adem-uit.html"],gas2:["Gas op reis","films/gaswisseling/2-gas-op-reis.html"],
  osm:["Diffusie en osmose","films/cellen/diffusie-osmose/index.html"],org:["Celorganellen","films/cellen/celorganellen/index.html"],
  dna3:["Van DNA naar eiwit","films/dna/3-van-dna-naar-eiwit.html"],dna5:["Mutaties","films/dna/5-mutaties.html"],dna8:["Wat heb jij aan DNA?","films/dna/8-wat-heb-jij-aan-dna.html"],
  adem2:["Alles op adem","films/stofwisseling/2-alles-op-adem.html"],stam:["Stamcellen","films/cellen/stamcellen.html"]};

/* ===== opgave 1 · Bungeejumpen ===== */
E.zet(T,[1],{titel:"Hormoonklieren in je lichaam",
  html:`<p>Een <b>hormoonklier</b> geeft zijn hormoon direct af aan het bloed. Belangrijke klieren, van boven naar beneden:</p><ul><li><b>hypofyse</b>: aan de onderkant van de hersenen;</li><li><b>schildklier</b>: in de hals, voor de luchtpijp;</li><li><b>bijnieren</b>: als een kapje boven op elke nier;</li><li><b>alvleesklier</b>: onder de maag, in de bocht van de twaalfvingerige darm;</li><li><b>geslachtsklieren</b>: teelballen of eierstokken.</li></ul><p>Welk hormoon door welke klier wordt gemaakt, zoek je op in de tabel met hormonen in je informatieboek.</p>`,
  films:[F.hor1,F.hor4]});
E.zet(T,[2],{titel:"Bloeddruk: hart, vaten en zwaartekracht",
  html:`<p>De <b>bovendruk</b> (systolische druk) is de hoogste druk in een slagader, vlak nadat de kamers zich samentrekken. Hoe hoog die is, hangt af van:</p><ul><li><b>het hart</b>: hoe sneller en krachtiger het pompt, hoe hoger de druk;</li><li><b>de vaten</b>: nauwere slagaders geven een hogere druk;</li><li><b>de zwaartekracht</b>: bloed is een vloeistof. Hoe lager een plek onder het hart ligt, hoe meer bloed er ‘op drukt’ en hoe hoger de druk.</li></ul><p>Bij schrik of stress zet het lichaam zich klaar voor actie (vechten of vluchten). Zoek in je informatieboek op wat adrenaline doet met hartslag en bloedvaten.</p>`,
  films:[F.buis,F.hor4]});
E.zet(T,[3],{titel:"Het netvlies: staafjes en kegeltjes",
  html:`<p>Het netvlies bevat twee soorten lichtgevoelige zintuigcellen:</p><ul><li><b>staafjes</b>: heel gevoelig, werken ook bij weinig licht, maar onderscheiden <b>geen kleuren</b> (je ziet grijstinten);</li><li><b>kegeltjes</b>: hebben meer licht nodig, er zijn drie typen (voor rood, groen en blauw licht), samen zorgen ze voor het <b>kleurenzien</b>.</li></ul><p>Twee bijzondere plekken: de <b>gele vlek</b>, recht achter de lens, waar je het scherpst ziet en de zintuigcellen het dichtst op elkaar liggen, en de <b>blinde vlek</b>, waar de oogzenuw het oog verlaat en geen zintuigcellen liggen. Zoek in je informatieboek op hoe staafjes en kegeltjes over het netvlies verdeeld zijn.</p>`,
  films:[F.zin]});
E.zet(T,[4],{titel:"Vaste bloedbestanddelen",
  html:`<p>Bloed bestaat uit plasma en drie soorten vaste bestanddelen:</p><ul><li><b>rode bloedcellen</b>: rond, zonder kern, in het midden lichter (dubbelhol), vervoeren zuurstof;</li><li><b>witte bloedcellen</b>: groter, met een kern (vaak gelobd en donker gekleurd in een preparaat), horen bij de afweer;</li><li><b>bloedplaatjes</b>: heel kleine stukjes cel zonder kern, belangrijk voor de bloedstolling.</li></ul>`,
  films:[F.bloed,F.afw1]});
E.zet(T,[5],{titel:"Een onderzoek met een remmer lezen",
  html:`<p>Bij een onderzoek met een <b>controlegroep</b> vergelijk je twee groepen die maar in één ding verschillen. Zo kun je zien of dat ene ding het effect veroorzaakt.</p><ul><li>Verandert een meting in de loop van de tijd? Dan heeft er iets invloed gehad.</li><li>Wil je weten of een bepaalde stof de oorzaak is, dan geef je een groep een <b>remmer</b> van die stof. Is de verandering bij die groep kleiner of weg, dan was de stof (mede) de oorzaak. Is de verandering even groot, dan niet.</li></ul><p>Let bij een diagram zonder getallen op de as alleen op duidelijke verschillen.</p>`,
  films:[F.onderz]});

/* ===== opgave 2 · Vlieëbos ===== */
function molecuul(i){const st=[["C","H","O"],["C","H","O","N"]];let g="";
  [["glucose / vetzuur",st[0]],["aminozuur / nucleotide",st[1]]].forEach(([n,a],k)=>{const y=40+k*70,on=i>=k;g+=`<text class="lbl" x="10" y="${y+5}" style="opacity:${on?1:.3}">${n}</text>`;
    a.forEach((el,j)=>g+=`<circle cx="${210+j*42}" cy="${y}" r="16" fill="${el==="N"?"var(--teal)":"var(--area)"}" opacity="${on?1:.2}"/><text class="lbl" x="${210+j*42}" y="${y+5}" text-anchor="middle" style="opacity:${on?1:.3}">${el}</text>`);});
  return E.svg("0 0 400 140",g,"Elementen in organische stoffen");}
E.zet(T,[6],{titel:"Organische stoffen en enzymen",
  html:`<p>Organische stoffen bestaan vooral uit C, H en O. Sommige bevatten ook <b>stikstof (N)</b>: eiwitten en aminozuren, maar bijvoorbeeld ook nucleïnezuren en een aantal andere stoffen. Zoek in je informatieboek de bouw van de stofgroepen op en kijk welke een N bevatten.</p><p>Elk enzym werkt op één soort stof (substraat). De naam van een enzym eindigt meestal op <b>-ase</b>, vaak met de naam van het substraat ervoor: zetmeel (amylum) → amylase, lipide → lipase.</p>`,
  anim:anim(caps(["Suikers en vetzuren bestaan uit C, H en O.","Aminozuren en nucleotiden bevatten ook N."]),molecuul),
  films:[F.voed3,F.enz]});
E.zet(T,[7,8],{titel:"Voedselrelaties en het spoor van een stof",
  html:`<p>Een gelabelde stof (zoals <sup>15</sup>N) kun je volgen door een voedselweb: wie een organisme eet of zijn afvalstoffen opneemt, bouwt een deel van de stoffen in zijn eigen lichaam in.</p><p>Relaties tussen soorten:</p><ul><li><b>predatie</b>: de ene soort doodt en eet de andere;</li><li><b>parasitisme</b>: de parasiet leeft op of in een gastheer en heeft voordeel, de gastheer nadeel, maar wordt meestal niet direct gedood;</li><li><b>mutualisme</b>: beide soorten hebben voordeel;</li><li><b>commensalisme</b>: de een heeft voordeel, de ander merkt er niets van.</li></ul>`,
  films:[F.eco3,F.eco2]});
E.zet(T,[9],{titel:"Waarom planten stikstof nodig hebben",
  html:`<p>Een plant maakt met fotosynthese glucose uit CO<sub>2</sub> en water. Om daar eiwitten, DNA en chlorofyl van te maken, heeft hij ook <b>mineralen</b> nodig die hij uit de bodem haalt, vooral <b>stikstof</b> (als nitraat of ammonium).</p><p>Een voedselarme bodem bevat weinig van die mineralen. Planten die daar groeien, hebben vaak een extra manier om aan mineralen te komen.</p>`,
  films:[F.stik]});
function selectie(i){let g="";const n=[[3,4,5,6,7],[4,5,6,7,7],[5,6,7,7,7]][Math.min(i,2)];
  n.forEach((d,k)=>{const x=40+k*70;g+=`<rect x="${x}" y="40" width="${d*3}" height="70" fill="var(--area)" stroke="var(--text2)"/><rect x="${x+d*3}" y="40" width="20" height="70" fill="var(--goud-soft)" stroke="var(--text2)"/>`;});
  g+=`<text class="lblm" x="40" y="135">generatie ${i+1}: steeds meer bomen met een dikke schors (goud = hout, grijs = schors)</text>`;return E.svg("0 0 420 150",g,"Selectie op schorsdikte");}
E.zet(T,[10],{titel:"Natuurlijke selectie",
  html:`<p>Natuurlijke selectie verloopt altijd in dezelfde stappen:</p><ul><li>Door <b>mutatie</b> en <b>recombinatie</b> verschillen individuen erfelijk van elkaar (genetische variatie).</li><li>Sommige varianten passen beter bij het milieu en <b>overleven</b> vaker.</li><li>Zij krijgen <b>meer nakomelingen</b> (een hogere fitness) en geven hun allelen vaker door.</li><li>Over vele generaties komt de gunstige eigenschap steeds vaker voor.</li></ul><p>Let op: een individu past zich niet aan ‘omdat het moet’. Selectie werkt op verschillen die er al zijn.</p>`,
  films:[F.evo2]});

/* ===== opgave 3 · Nierdonor ===== */
E.zet(T,[11],{titel:"Het AB0-systeem",
  html:`<p>Op rode bloedcellen kunnen twee antigenen zitten: <b>A</b> en <b>B</b>. In het plasma zitten van nature antistoffen tegen het antigeen dat je zelf <b>niet</b> hebt.</p><div class="tablewrap"><table class="data" style="max-width:420px"><tr><th>bloedgroep</th><th>antigeen op cellen</th><th>antistof in plasma</th></tr><tr><td>A</td><td>A</td><td>anti-B</td></tr><tr><td>B</td><td>B</td><td>anti-A</td></tr><tr><td>AB</td><td>A en B</td><td>geen</td></tr><tr><td>0</td><td>geen</td><td>anti-A en anti-B</td></tr></table></div><p>Komen antistoffen in contact met cellen met het passende antigeen, dan <b>klonteren</b> die cellen samen (agglutinatie). Bij een transfusie of transplantatie kijk je dus naar de antigenen van de donor en de antistoffen van de ontvanger.</p>`,
  films:[F.afw4]});
E.zet(T,[12],{titel:"Gekoppelde genen en kansen",
  html:`<p>Genen die heel dicht bij elkaar op één chromosoom liggen, erven (bijna) altijd samen over: <b>gekoppelde overerving</b>. Je kunt zo’n groepje dan behandelen als één ‘set’.</p><p>Elke ouder heeft twee chromosomen van een paar en geeft er <b>één</b> door, elk met kans 1/2. Moeten twee onafhankelijke dingen allebei gebeuren, dan <b>vermenigvuldig</b> je de kansen.</p><p>Een <b>eeneiige</b> tweeling komt uit één bevruchte eicel en is genetisch gelijk (altijd hetzelfde geslacht). Een <b>twee-eiige</b> tweeling komt uit twee eicellen en twee zaadcellen en lijkt genetisch op gewone broers en zussen.</p>`,
  films:[F.erf4,F.erf6]});
E.zet(T,[13],{titel:"Cellen van de afweer",
  html:`<ul><li><b>Aspecifieke afweer</b>: werkt tegen alles wat lichaamsvreemd is, bijvoorbeeld <b>macrofagen</b> (fagocyten) die indringers opeten.</li><li><b>Specifieke afweer</b>: herkent één bepaald antigeen. <b>B-cellen</b> worden plasmacellen die <b>antistoffen</b> maken. <b>T-helpercellen</b> activeren andere afweercellen, <b>T-killercellen</b> doden lichaamscellen met vreemde of afwijkende eiwitten op hun membraan.</li></ul>`,
  films:[F.afw1,F.afw2,F.afw3]});
E.zet(T,[14],{titel:"Bloedvaten en urinewegen bij de nier",
  html:`<p>Elke nier heeft drie verbindingen:</p><ul><li>de <b>nierslagader</b> (aftakking van de aorta) voert bloed aan;</li><li>de <b>nierader</b> voert het gezuiverde bloed af naar de onderste holle ader;</li><li>de <b>urineleider</b> voert urine af naar de blaas.</li></ul><p>Bloed gaat altijd via een <b>slagader</b> naar een orgaan toe en via een <b>ader</b> terug naar het hart. In de buik lopen de grote vaten (aorta en onderste holle ader) en hun aftakkingen naar de benen (heupslagaders en heupaders).</p>`,
  films:[F.uitsch,F.pomp]});

/* ===== opgave 4 · Haas ===== */
E.zet(T,[15],{titel:"Biotische en abiotische factoren",
  html:`<p>Alles in de omgeving van een organisme dat invloed heeft, is een <b>milieufactor</b>:</p><ul><li><b>biotisch</b>: komt van levende organismen, zoals voedsel, concurrenten, ziekteverwekkers, roofdieren;</li><li><b>abiotisch</b>: komt van de levenloze natuur, zoals temperatuur, licht, water, bodem, wind.</li></ul><p>Een milieufactor oefent <b>selectiedruk</b> uit als individuen met een bepaalde eigenschap daardoor vaker overleven en zich voortplanten.</p>`,
  films:[F.eco2,F.evo2]});
E.zet(T,[16],{titel:"Twee gegevens in één diagram vergelijken",
  html:`<p>In een diagram met twee soorten informatie (hier: een staaf per week en een periode bovenin) vergelijk je per moment:</p><ul><li>Klopt de waarde van de staaf bij wat er op dat moment boven staat?</li><li>Begint een verandering in de staven <b>tegelijk</b> met een verandering bovenin, of eerder of later?</li></ul><p>Een bewering ‘in elk jaar’ moet in <b>alle</b> diagrammen kloppen. Een bewering dat iets ‘de bepalende factor’ is, wordt alleen ondersteund als de verandering steeds samenvalt met die factor.</p>`,
  films:[F.onderz]});

/* ===== opgave 5 · Aquaponics ===== */
E.zet(T,[17],{titel:"Gesloten en open kringlopen",
  html:`<p>In een ecosysteem gaan stoffen rond: producenten maken organische stof, consumenten eten die, reducenten breken dode resten af tot anorganische stoffen die producenten weer opnemen.</p><p>Een kringloop is <b>gesloten</b> als er geen stoffen bij komen en geen stoffen weggaan. Komen er stoffen het systeem in (bijvoorbeeld door voeren of bemesten) of gaan ze eruit (bijvoorbeeld door oogsten of gassen die naar de lucht gaan), dan is de kringloop <b>open</b>. Energie (licht) gaat altijd in en uit, dat telt niet als stofkringloop.</p>`,
  films:[F.stik,F.eco3]});
E.zet(T,[18],{titel:"Wat heeft fotosynthese nodig?",
  html:`<p>Fotosynthese: CO<sub>2</sub> + water + <b>licht</b> → glucose + zuurstof, in organismen met bladgroen. Dat zijn niet alleen planten, maar ook <b>algen</b> en cyanobacteriën.</p>`,
  films:[F.adem2]});
E.zet(T,[19],{titel:"De stikstofkringloop",
  html:`<ul><li><b>Ammonificatie</b>: reducenten zetten eiwitten in dode resten en afval om in ammonium (NH<sub>4</sub><sup>+</sup>).</li><li><b>Nitrificatie</b>: nitrificerende bacteriën zetten ammonium via nitriet om in nitraat (NO<sub>3</sub><sup>−</sup>).</li><li><b>Stikstofassimilatie</b>: een plant neemt opgenomen stikstof op in zijn eigen organische stoffen, zoals aminozuren.</li><li><b>Stikstofbinding</b> en <b>denitrificatie</b>: omzettingen van en naar stikstofgas (N<sub>2</sub>).</li></ul><p>Zoek in je informatieboek op in welke vorm de meeste planten stikstof uit de bodem opnemen.</p>`,
  films:[F.stik]});
function piramide(i){let g="";[["planten",300],["planteneters",120],["vleeseters",50]].forEach(([n,w],k)=>{const y=110-k*40,on=k<=i;g+=`<rect x="${200-w/2}" y="${y}" width="${w}" height="34" fill="var(--area)" opacity="${on?1:.2}" stroke="var(--text2)"/><text class="lbl" x="200" y="${y+22}" text-anchor="middle" style="opacity:${on?1:.3}">${n}</text>`;});
  return E.svg("0 0 400 150",g,"Piramide van biomassa");}
E.zet(T,[20],{titel:"Energie en biomassa in een voedselketen",
  html:`<p>In een voedselketen wordt bij elke stap maar een klein deel (vaak zo’n 10%) van de biomassa van het ene niveau omgezet in biomassa van het volgende niveau. Daardoor heb je een <b>piramide</b>: veel planten, minder planteneters, nog minder vleeseters.</p><p>Bedenk zelf wat een dier allemaal doet met het voedsel dat hij binnenkrijgt, vanaf het moment dat hij het opeet: vertering, opname, transport, en wat de cellen ermee doen.</p>`,
  anim:anim(caps(["Planten leggen veel biomassa vast.","Planteneters bouwen maar een klein deel daarvan in hun lichaam in.","Vleeseters weer maar een klein deel daarvan."]),piramide),
  films:[F.eco5]});
E.zet(T,[21],{titel:"Een verhoudingsgetal omrekenen",
  html:`<p>Een <b>conversiefactor</b> zegt hoeveel van het ene je nodig hebt voor één eenheid van het andere. Bijvoorbeeld: een auto die ‘1 liter per 15 km’ rijdt.</p><ul><li>Weet je de afstand en wil je de liters: afstand <b>gedeeld door</b> 15.</li><li>Weet je de liters en wil je de afstand: liters <b>keer</b> 15.</li></ul><p>Controleer een formule altijd met makkelijke getallen: komt er iets logisch uit?</p>`,
  films:[F.onderz]});
E.zet(T,[22],{titel:"Een bewering toetsen met een tabel",
  html:`<p>Om een bewering te weerleggen, zoek je in de tabel gegevens die het tegendeel laten zien. Let op het verschil tussen een <b>percentage</b> (welk deel) en een <b>hoeveelheid</b> (hoeveel gram). Een kleiner deel van iets groots kan meer zijn dan een groot deel van iets kleins.</p><p>Bereken zo nodig verschillen (eindwaarde min startwaarde) en vergelijk elke rij afzonderlijk.</p>`,
  films:[F.onderz]});
E.zet(T,[23],{titel:"Stikstof: waar blijft het?",
  html:`<p>Een vis haalt stikstof uit zijn voer en bouwt een deel in zijn eiwitten in. Wat hij niet nodig heeft, scheidt hij uit als ammonium. Die stikstof kan:</p><ul><li>in het water blijven (en daar ophopen),</li><li>of opgenomen worden door planten die het in hun eigen eiwitten inbouwen.</li></ul><p>Bij duurzaamheid gaat het er vaak om hoeveel van een grondstof uiteindelijk in nuttig product terechtkomt en hoeveel verloren gaat. Vraag je bij een diagram af: <b>wat</b> wordt hier precies gemeten, en wat zegt dat wel en niet?</p>`,
  films:[F.stik]});

/* ===== opgave 6 · HSA uit rijst ===== */
E.zet(T,[24],{titel:"Doorbloeding en de spierpomp",
  html:`<ul><li>De doorbloeding van een orgaan past zich aan wat het nodig heeft: kringspiertjes in de wand van kleine slagaders maken die wijder of nauwer.</li><li>In de aders is de bloeddruk laag. Aders hebben <b>kleppen</b> die het bloed maar één kant op laten stromen (naar het hart), en veel aders liggen tussen skeletspieren in.</li><li>Een vloeistof stroomt altijd van een plek met hoge druk naar een plek met lage druk.</li></ul>`,
  films:[F.buis]});
function osmose(i){let g=`<rect x="10" y="20" width="380" height="110" rx="8" fill="none" stroke="var(--line2)"/><line x1="200" y1="20" x2="200" y2="130" stroke="var(--text)" stroke-dasharray="4 4"/>`;
  for(let k=0;k<3;k++)g+=`<circle cx="${50+k*40}" cy="${60+k*15}" r="7" fill="var(--paars)"/>`;for(let k=0;k<9;k++)g+=`<circle cx="${230+(k%3)*45}" cy="${45+Math.floor(k/3)*30}" r="7" fill="var(--paars)"/>`;
  if(i>=1)g+=`<path d="M120 105 L185 105" stroke="var(--teal)" stroke-width="4"/><path d="M185 105 l-10 -6 v12z" fill="var(--teal)"/><text class="lblm" x="20" y="148">netto stroomt water naar de kant met meer opgeloste deeltjes</text>`;
  g+=`<text class="lblm" x="20" y="15">weinig opgelost</text><text class="lblm" x="230" y="15">veel opgelost</text>`;return E.svg("0 0 400 155",g,"Osmose door een halfdoorlatend membraan");}
E.zet(T,[25],{titel:"Osmose",
  html:`<p><b>Osmose</b> is de verplaatsing van water door een halfdoorlatend membraan. Water gaat netto naar de kant met de <b>hoogste osmotische waarde</b> (de meeste opgeloste deeltjes).</p><p>Een plantencel heeft een stevige celwand en kan niet knappen. Een dierlijke cel heeft alleen een celmembraan. Een <b>fysiologische zoutoplossing</b> heeft dezelfde osmotische waarde als het bloed.</p>`,
  anim:anim(caps(["Links weinig opgeloste deeltjes, rechts veel. Het membraan laat water door, de deeltjes niet.","Water stroomt netto van links naar rechts."]),osmose),
  films:[F.osm]});
E.zet(T,[26],{titel:"Wat er in bloed zit en hoe het wordt aangevuld",
  html:`<ul><li><b>Bloedplasma</b> is vooral water met opgeloste stoffen en plasma-eiwitten. Water vul je aan door te drinken, plasma-eiwitten maakt vooral de <b>lever</b>.</li><li><b>Bloedcellen</b> ontstaan uit stamcellen in het <b>rode beenmerg</b>. Een rode bloedcel leeft ongeveer 120 dagen.</li></ul>`,
  films:[F.bloed,F.stam]});
E.zet(T,[27],{titel:"Eiwitten in het bloed",
  html:`<p>Eiwitten in het bloed hebben heel verschillende functies, bijvoorbeeld:</p><ul><li><b>hemoglobine</b> in de rode bloedcellen bindt zuurstof;</li><li><b>antistoffen</b> (immunoglobulinen) binden aan antigenen;</li><li>sommige <b>hormonen</b> zijn eiwitten, zoals insuline;</li><li><b>stollingseiwitten</b> zoals fibrinogeen;</li><li>plasma-eiwitten blijven in de haarvaten en bepalen mee de <b>osmotische waarde</b> van het bloed. Daardoor wordt een deel van het weefselvocht aan het eind van een haarvat weer opgenomen.</li></ul>`,
  films:[F.weef,F.bloed]});
E.zet(T,[28],{titel:"Van gen tot werkend eiwit",
  html:`<p>Een gen wordt overgeschreven in mRNA (transcriptie), en ribosomen maken daarmee een keten van aminozuren (translatie). Een eiwit werkt pas als die keten de juiste <b>ruimtelijke vorm</b> heeft.</p><p>In eukaryote cellen (planten, dieren, schimmels) worden veel eiwitten in het <b>endoplasmatisch reticulum</b> en het <b>golgi-systeem</b> gevouwen, bewerkt en verpakt voor transport naar buiten de cel. <b>Prokaryoten</b> (bacteriën) hebben geen celkern en geen organellen met een membraan.</p>`,
  films:[F.dna3,F.org]});
E.zet(T,[29],{titel:"Genetische modificatie",
  html:`<p>Een organisme is <b>genetisch gemodificeerd</b> als zijn DNA met technieken in het lab is veranderd, bijvoorbeeld doordat er een gen van een andere soort in is ingebouwd.</p><p>Een veelgebruikte route bij planten: een gen wordt eerst in het <b>plasmide</b> van de bodembacterie <i>Agrobacterium tumefaciens</i> gezet. Die bacterie kan een stuk van zijn plasmide in het DNA van een plantencel inbouwen. Het organisme waaruit het gen afkomstig is (de donor), houdt zelf zijn eigen DNA.</p>`,
  films:[F.dna8]});
E.zet(T,[30],{titel:"Groepen in een onderzoek",
  html:`<p>Bij een vergelijkend onderzoek krijgt elke behandeling die je wilt vergelijken een <b>eigen groep</b>. Alle andere omstandigheden houd je gelijk.</p><p>Bij onderzoek met <b>zieke mensen</b> vergelijk je een nieuwe behandeling vaak met de bestaande behandeling, zodat niemand een behandeling wordt onthouden. Bij gezonde proefpersonen of proefdieren gebruik je vaker een groep zonder behandeling (placebo).</p>`,
  films:[F.onderz]});
E.zet(T,[31],{titel:"Wat er in bloedplasma zit",
  html:`<p>Bloedplasma bevat naast water veel opgeloste stoffen: voedingsstoffen, afvalstoffen, zouten, hormonen en verschillende <b>plasma-eiwitten</b> (bijvoorbeeld albumine, stollingseiwitten en antistoffen). </p>`,
  films:[F.bloed]});

/* ===== opgave 7 · Smeerwortel ===== */
E.zet(T,[32],{titel:"Wondgenezing",
  html:`<p>Bij een wond moet weefsel worden hersteld. Eerst sluit een bloedstolsel de wond af. Daarna moeten er <b>nieuwe cellen</b> komen om het gat op te vullen: cellen in de rand van de wond delen zich door <b>mitose</b>.</p>`,
  films:[F.stam]});
E.zet(T,[33],{titel:"Hoe planten zich verdedigen",
  html:`<p>Een eigenschap levert een <b>evolutionair voordeel</b> als individuen ermee vaker overleven en zich voortplanten. Een plant kan niet wegrennen en moet het op zijn plek redden tegen allerlei bedreigingen: droogte, vorst, ziekteverwekkers, concurrenten om licht, en dieren. Veel plantenstoffen hebben geen rol in groei of fotosynthese, maar helpen de plant op een andere manier.</p>`,
  films:[F.evo2]});
E.zet(T,[34],{titel:"Opname via darmen of huid",
  html:`<p>De <b>dunne darm</b> is gebouwd om stoffen op te nemen: een enorm oppervlak (darmvlokken, microvilli), een dunne wand en veel haarvaten. Bloed uit de darmen gaat via de <b>poortader</b> eerst naar de lever.</p><p>De <b>huid</b> is juist een barrière: een dikke laag dode, verhoornde cellen houdt de meeste stoffen tegen. </p>`,
  films:[F.voed3]});
E.zet(T,[35],{titel:"Bestuiving en kruisen",
  html:`<p>Bij <b>bestuiving</b> komt stuifmeel (uit de <b>meeldraden</b>) op de stempel van een stamper. Bij <b>zelfbestuiving</b> komt het stuifmeel van dezelfde bloem of plant, bij <b>kruisbestuiving</b> van een andere plant.</p><p>Bij een kruisingsexperiment wil je precies weten welke plant de moeder is en welke de vader. De plant die het stuifmeel levert, is de vaderplant; de plant met de zaden is de moederplant.</p>`,
  films:[F.erf6]});
E.zet(T,[36],{titel:"Wat is een soort?",
  html:`<p>Individuen behoren tot dezelfde <b>soort</b> als ze samen <b>vruchtbare nakomelingen</b> kunnen krijgen. Lukt kruisen niet of zijn de nakomelingen onvruchtbaar, dan zijn het verschillende soorten.</p><p>Hoe gemakkelijker twee groepen samen nakomelingen krijgen, hoe nauwer ze waarschijnlijk verwant zijn. Een onderzoek ondersteunt een uitspraak alleen als de resultaten precies dat laten zien.</p>`,
  films:[F.evo6]});

/* ===== opgave 8 · MERS ===== */
function diff(i){let g=`<rect x="10" y="20" width="120" height="100" fill="var(--teal-soft)" stroke="var(--line2)"/><text class="lblm" x="16" y="15">lucht</text><text class="lblm" x="${150+i*40}" y="15">bloed</text>`;
  g+=`<rect x="130" y="20" width="${8+i*40}" height="100" fill="var(--area)" opacity=".6"/><rect x="${138+i*40}" y="20" width="80" height="100" fill="var(--koraal-soft)" stroke="var(--line2)"/>`;
  for(let k=0;k<6;k++)g+=`<circle cx="${30+(k%3)*30}" cy="${40+Math.floor(k/3)*40}" r="6" fill="var(--teal)"/>`;
  g+=`<text class="lblm" x="10" y="140">${i?"dikkere laag tussen lucht en bloed: grotere afstand":"dunne wand: kleine afstand"}</text>`;return E.svg("0 0 320 150",g,"Diffusieafstand in een longblaasje");}
E.zet(T,[37],{titel:"Gaswisseling en diffusie",
  html:`<p>In de longblaasjes gaat zuurstof door <b>diffusie</b> van de lucht naar het bloed. Diffusie gaat sneller bij:</p><ul><li>een <b>groot oppervlak</b>;</li><li>een <b>kleine afstand</b>;</li><li>een <b>groot concentratieverschil</b>.</li></ul><p>Bovendien diffunderen gassen in lucht veel sneller dan in water.</p>`,
  anim:anim(caps(["Normaal is de wand tussen lucht en bloed heel dun.","Wordt de laag ertussen dikker, dan moet zuurstof verder."]),diff),
  films:[F.gas2,F.osm]});
E.zet(T,[38],{titel:"Ademhalingsspieren",
  html:`<ul><li>Bij gewoon <b>inademen</b> trekken het <b>middenrif</b> (wordt platter) en de <b>buitenste tussenribspieren</b> (ribben omhoog en naar buiten) samen. De borstholte wordt groter.</li><li>Bij rustig <b>uitademen</b> ontspannen die spieren en veert alles terug.</li><li>Bij <b>krachtig uitademen</b> (hoesten, blazen) helpen extra spieren om de borstholte kleiner te maken. Zoek in je informatieboek op welke dat zijn.</li></ul>`,
  films:[F.adem]});
E.zet(T,[39,40],{titel:"DNA, RNA en virussen",
  html:`<p>In een cel zijn drie processen met DNA en RNA: <b>replicatie</b> (DNA kopiëren voor de celdeling), <b>transcriptie</b> (een gen overschrijven in mRNA) en <b>translatie</b> (ribosomen maken met mRNA een eiwit). Zoek in je informatieboek op welk molecuul bij elk proces de matrijs is.</p><p>Sommige virussen, zoals coronavirussen, hebben <b>RNA</b> als erfelijk materiaal. In een geïnfecteerde cel moet dat RNA dus meerdere dingen doen.</p><p>Een <b>mutatie</b> is een verandering in de volgorde van de basen van het erfelijk materiaal.</p>`,
  films:[F.dna3,F.dna5,F.afw3]});
E.zet(T,[41],{titel:"Vormen van immuniteit",
  html:`<div class="tablewrap"><table class="data" style="max-width:520px"><tr><th></th><th>actief: je maakt zelf antistoffen en geheugencellen</th><th>passief: je krijgt kant-en-klare antistoffen</th></tr><tr><td>natuurlijk</td><td colspan="2">zonder medisch ingrijpen</td></tr><tr><td>kunstmatig</td><td colspan="2">door medisch ingrijpen</td></tr></table></div><p>Actieve immuniteit houdt lang aan (geheugencellen), passieve maar een paar weken.</p>`,
  films:[F.afw4]});
E.zet(T,[42],{titel:"Transportprocessen",
  html:`<ul><li><b>Diffusie</b>: opgeloste deeltjes verspreiden zich vanzelf van een hoge naar een lage concentratie. Kost geen energie.</li><li><b>Osmose</b>: diffusie van <b>water</b> door een halfdoorlatend membraan.</li><li><b>Actief transport</b>: een cel pompt stoffen door het membraan, tegen het concentratieverschil in. Kost ATP.</li><li><b>Endocytose</b>: een cel neemt deeltjes op door het celmembraan eromheen te vouwen.</li></ul>`,
  films:[F.osm]});
E.zet(T,[43],{titel:"Antigenen en antistoffen",
  html:`<p>Een <b>antigeen</b> is een (meestal lichaamsvreemd) molecuul, vaak een eiwit, waartegen het afweersysteem reageert. Een <b>antistof</b> is een Y-vormig eiwit dat door plasmacellen (B-cellen) wordt gemaakt en precies past op één antigeen.</p><p>Omdat elke antistof twee bindingsplaatsen heeft, kunnen antistoffen en antigenen samen grote netwerken vormen die neerslaan of klonteren.</p>`,
  films:[F.afw2]});
})();
