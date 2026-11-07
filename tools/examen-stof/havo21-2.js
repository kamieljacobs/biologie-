/* Uitleg van de stof · oefenexamen havo 2021-II (tool havo21-2). Gekopieerd naar tools/examen-stof/havo21-2.js door samenvoegen.py. */
(function(){
"use strict";
if(!window.EXSTOF)return;
const E=window.EXSTOF,T="havo21-2";
const anim=(steps,draw)=>box=>E.stappen(box,steps,(st,s,i)=>{st.innerHTML=draw(i,s);});
const caps=a=>a.map(c=>({cap:c}));
const F={zint:["Zintuigen","films/zenuwstelsel/8-zintuigen.html"],hoofd:["Het hoofdkantoor","films/zenuwstelsel/5-het-hoofdkantoor.html"],spleet:["De spleet","films/zenuwstelsel/3-de-spleet.html"],kabel:["Het kabelnetwerk","films/zenuwstelsel/2-het-kabelnetwerk.html"],
  erf5:["Overerving via X-chromosomen en mitochondriën","films/erfelijkheid/5-overerving-via-x-chromosomen-en-mitochondrien.html"],erf6:["Stambomen en kansrekenen","films/erfelijkheid/6-stambomen-en-kansrekenen.html"],erf2:["Monohybride kruisingen","films/erfelijkheid/2-monohybride-kruisingen.html"],
  onderz:["Onderzoek doen","films/cellen/onderzoek-doen/index.html"],kun:["Kun je onderzoek vertrouwen?","films/extra/kun-je-onderzoek-vertrouwen.html"],diff:["Diffusie en osmose","films/cellen/diffusie-osmose/index.html"],org:["Celorganellen","films/cellen/celorganellen/index.html"],
  tplant:["Transport in planten","films/transport/6-transport-in-planten.html"],eco2:["Waar past een soort?","films/ecologie/2-waar-past-een-soort.html"],eco3:["Wie eet wie?","films/ecologie/3-wie-eet-wie.html"],eco7:["Stikstof gaat rond","films/ecologie/7-stikstof-gaat-rond.html"],
  adem1:["Adem in, adem uit","films/gaswisseling/1-adem-in-adem-uit.html"],gas2:["Gas op reis","films/gaswisseling/2-gas-op-reis.html"],gas3:["Uitscheiding en evenwicht","films/gaswisseling/3-uitscheiding-en-evenwicht.html"],hor5:["Water in balans","films/hormonen/5-water-in-balans.html"],hor4:["Stress","films/hormonen/4-stress.html"],
  pomp:["Eén pomp, twee rondjes","films/transport/1-een-pomp-twee-rondjes.html"],voed4:["Van darm naar bloed","films/voeding/4-van-darm-naar-bloed.html"],
  evo2:["Natuurlijke selectie","films/evolutie/2-natuurlijke-selectie.html"],evo1:["Wat is evolutie eigenlijk?","films/evolutie/1-wat-is-evolutie.html"],evo6:["Hoe een soort er twee wordt","films/evolutie/6-hoe-een-soort-er-twee-wordt.html"],
  afw1:["De eerste verdediging","films/afweer/1-de-eerste-verdediging.html"],afw2:["Antistoffen op maat","films/afweer/2-antistoffen-op-maat.html"],afw4:["Vaccins, allergie en bloedgroepen","films/afweer/4-vaccins-allergie-en-bloedgroepen.html"],bloed:["Wat er in je bloed zit","films/transport/3-wat-er-in-je-bloed-zit.html"],
  schaal:["Van molecuul tot biosfeer","films/cellen/van-molecuul-tot-biosfeer.html"]};

/* kubussen: oppervlak en inhoud (algemeen, geen hommel) */
function kubus(i){
  const z=[1,2,3][i],s=26*z;
  let g=`<rect x="${120-s/2}" y="${110-s/2}" width="${s}" height="${s}" fill="var(--teal-soft)" stroke="var(--teal)" stroke-width="2"/>`;
  g+=`<text class="lbl" x="250" y="70">ribbe: ${z} cm</text><text class="lbl" x="250" y="96">oppervlak: 6 × ${z}² = ${6*z*z} cm²</text><text class="lbl" x="250" y="122">inhoud: ${z}³ = ${z*z*z} cm³</text><text class="lbl" x="250" y="152" style="fill:var(--goud-text)">oppervlak per cm³: ${(6/z).toFixed(1).replace(".",",")}</text>`;
  return E.svg("0 0 480 220",g,"Kubus met oppervlak en inhoud");
}
/* regelkring algemeen (lichaamstemperatuur) */
function kring(i){
  const S=["waarde wijkt af","receptoren meten","regelcentrum","effector","waarde terug"];
  let g="";S.forEach((t,k)=>{const a=-Math.PI/2+k*2*Math.PI/S.length,x=190+120*Math.cos(a),y=118+86*Math.sin(a);const on=k<=i;
    g+=`<rect x="${x-66}" y="${y-15}" width="132" height="30" rx="8" fill="var(--bg)" stroke="${on?"var(--goud)":"var(--line2)"}" stroke-width="${on?2.4:1.2}"/><text class="lblm" x="${x}" y="${y+5}" text-anchor="middle" style="${on?"fill:var(--text)":""}">${t}</text>`;});
  return E.svg("0 0 380 236",g,"Kringloop van negatieve terugkoppeling");
}
/* osmose: twee vakken met deeltjes */
function osmose(i){
  const dots=(x0,n,seed)=>{let s="";for(let k=0;k<n;k++){const x=x0+18+((k*37+seed)%120),y=40+((k*53+seed*3)%120);s+=`<circle cx="${x}" cy="${y}" r="4" fill="var(--koraal)"/>`;}return s;};
  let g=`<rect x="20" y="20" width="160" height="160" fill="var(--teal-soft)" stroke="var(--text2)"/><rect x="200" y="20" width="160" height="160" fill="var(--teal-soft)" stroke="var(--text2)"/><path d="M190,20 V180" stroke="var(--text)" stroke-width="3" stroke-dasharray="6 4"/>`;
  g+=dots(20,5,1)+dots(200,14,2);
  g+=`<text class="lblm" x="100" y="200" text-anchor="middle">weinig opgelost</text><text class="lblm" x="280" y="200" text-anchor="middle">veel opgelost</text>`;
  if(i>=1)g+=`<path d="M150,100 H226" stroke="var(--goud)" stroke-width="4" marker-end="url(#ospa)"/><defs><marker id="ospa" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10Z" fill="var(--goud)"/></marker></defs><text class="lbl" x="188" y="90" text-anchor="middle" style="fill:var(--goud-text)">water</text>`;
  return E.svg("0 0 380 210",g,"Osmose door een halfdoorlaatbaar membraan");
}

/* ===== opgave 1 ===== */
E.zet(T,[1,3],{titel:"Staafjes, kegeltjes en het netvlies",
  html:`<p>Het netvlies heeft twee soorten lichtgevoelige zintuigcellen:</p><ul><li><b>staafjes</b>: heel gevoelig voor licht (lage drempelwaarde), zien geen kleur;</li><li><b>kegeltjes</b>: hebben meer licht nodig, zien kleur en scherp; ze liggen dicht op elkaar in de <b>gele vlek</b>.</li></ul><p>Het licht gaat in het netvlies eerst door lagen zenuwcellen heen. De zintuigcellen liggen achteraan, tegen de pigmentlaag. Hun impulsen gaan via de zenuwcellen naar de oogzenuw.</p>`,
  films:[F.zint]});
E.zet(T,[2],{titel:"Erfgangen in een stamboom",
  html:`<p>In een stamboom zoek je gezinnen die iets <b>bewijzen</b>:</p><ul><li><b>Recessief</b>: twee ouders zonder de eigenschap krijgen een kind mét de eigenschap.</li><li><b>Dominant</b>: twee ouders mét de eigenschap krijgen een kind zonder.</li></ul><p>Bij een <b>X-chromosomaal</b> gen geeft een vader zijn enige X aan elke dochter en een Y aan elke zoon. Een zoon krijgt zijn X altijd van zijn moeder. Een gezin dat met die regels in strijd is, bewijst dat het gen <b>niet</b> X-chromosomaal is.</p>`,
  films:[F.erf6,F.erf5]});
E.zet(T,[4],{titel:"Prikkel, drempelwaarde en impuls",
  html:`<p>Een zintuigcel reageert pas als de prikkel sterk genoeg is: boven de <b>drempelwaarde</b>. Hoe lager de drempelwaarde, hoe gevoeliger de cel.</p><p>Een zenuwcel die een sterk genoeg signaal krijgt, vormt <b>impulsen</b>. Die gaan via de oogzenuw naar de hersenen.</p><p>Hoe scherp je ziet, hangt af van hoeveel zintuigcellen er per mm² netvlies liggen.</p>`,
  films:[F.zint,F.kabel]});
E.zet(T,[5,18],{titel:"De hersenen en de synaps",
  html:`<ul><li><b>Grote hersenen</b>: hersenschors met gebieden voor bewuste waarneming (zien, horen, voelen), denken en willekeurige bewegingen.</li><li><b>Kleine hersenen</b>: coördinatie van bewegingen en evenwicht.</li><li><b>Hersenstam</b>: onbewuste processen zoals ademhaling en hartslag.</li></ul><p>Tussen twee zenuwcellen zit een <b>synaps</b>. De impuls springt niet over: de eerste cel geeft een stof af die naar receptoren van de volgende cel diffundeert.</p>`,
  films:[F.hoofd,F.spleet]});
E.zet(T,[6],{titel:"Een goede controleproef",
  html:`<p>In een onderzoek vergelijk je een <b>proefgroep</b> met een <b>controle</b>. In de controle is alles hetzelfde, op één ding na: de factor die je onderzoekt.</p><p>Vind je dan een verschil, dan weet je dat het door die factor komt en niet door iets anders (bijvoorbeeld dat de proefpersonen de test al kennen, of een andere ruimte).</p>`,
  films:[F.onderz]});

/* ===== opgave 2 ===== */
E.zet(T,[7],{titel:"Osmose",
  html:`<p>Water gaat door een halfdoorlaatbaar membraan naar de kant met de <b>meeste opgeloste deeltjes</b>. Een oplossing met méér opgeloste deeltjes dan de cel heet <b>hypertoon</b>, met minder <b>hypotoon</b>, even veel <b>isotoon</b>.</p><p>De <b>osmotische waarde</b> geeft aan hoeveel opgeloste deeltjes er per liter in een oplossing zitten.</p>`,
  anim:anim(caps(["Links weinig, rechts veel opgeloste deeltjes. Het membraan laat alleen water door.","Water stroomt naar de kant met de meeste opgeloste deeltjes."]),osmose),
  films:[F.diff]});
E.zet(T,[8],{titel:"Verdamping bij planten",
  html:`<p>Bladeren verliezen water door <b>verdamping</b>. Het meeste water ontsnapt via de <b>huidmondjes</b>; de <b>cuticula</b> (waslaag) op de opperhuid houdt water tegen.</p><p>Hoe meer oppervlak er aan de lucht grenst, hoe meer verdamping. Planten van droge plekken hebben vaak aanpassingen die hierop inspelen, zoals ingerolde of dikke bladeren en haren.</p>`,
  films:[F.tplant]});
E.zet(T,[9],{titel:"Organellen van een plantencel",
  html:`<ul><li><b>chloroplasten</b>: fotosynthese;</li><li><b>mitochondriën</b>: dissimilatie;</li><li><b>endoplasmatisch reticulum</b>: maken en vervoeren van eiwitten en vetten;</li><li><b>vacuole</b>: een grote ruimte met celvocht, omgeven door een eigen membraan.</li></ul><p>Enzymen werken in een bepaald milieu; een te hoge concentratie ionen kan hun vorm en werking verstoren.</p>`,
  films:[F.org]});
E.zet(T,[10],{titel:"Rekenen met een lineaire daling",
  html:`<p>Daalt een grootheid <b>lineair</b>, dan daalt hij per stap steeds evenveel. Daalt iets 5% per eenheid, dan is het na 4 eenheden 20% gedaald, na 10 eenheden 50%.</p><p>Wil je weten na hoeveel eenheden een bepaalde daling bereikt is: <b>gewenste daling ÷ daling per eenheid</b>. Tel daar het startpunt bij op.</p>`,
  films:[F.schaal]});
E.zet(T,[11,12],{titel:"De stikstofkringloop",
  html:`<ul><li><b>Stikstofbinding</b>: bepaalde bacteriën (bv. in wortelknolletjes van vlinderbloemigen) zetten N<sub>2</sub> uit de lucht om in stikstofverbindingen.</li><li><b>Ammonificatie</b> (rotting): reducenten breken eiwitten uit dode resten en afval af tot ammonium.</li><li><b>Nitrificatie</b>: nitrificerende bacteriën zetten ammonium om in nitriet en nitraat.</li><li><b>Denitrificatie</b>: bacteriën zetten nitraat om in N<sub>2</sub>.</li></ul><p><b>Duurzaam</b> betekent dat je het lang kunt volhouden zonder voorraden uit te putten of het milieu te belasten.</p>`,
  films:[F.eco7]});
E.zet(T,[13],{titel:"Conclusies uit resultaten",
  html:`<p>Een conclusie mag alleen gaan over wat er <b>gemeten</b> is. Meet je biomassa, dan kun je niet zeggen welk proces in de plant veranderd is.</p><p>Een <b>beperkende factor</b> is de factor die de groei tegenhoudt: verbeter je alleen die factor, dan neemt de groei toe.</p>`,
  films:[F.onderz,F.kun]});

/* ===== opgave 3 ===== */
E.zet(T,[14],{titel:"Inademen en uitademen",
  html:`<p>Lucht stroomt naar binnen als de <b>borstholte groter</b> wordt: de druk in de longen daalt.</p><ul><li><b>Borstademhaling</b>: de ribben gaan omhoog en naar voren (inademen) of omlaag (uitademen).</li><li><b>Buikademhaling</b>: het middenrif wordt platter en zakt (inademen) of wordt omhoog geduwd (uitademen).</li></ul><p>Bij diep of geforceerd ademen helpen extra spieren mee, zoals hals- en buikspieren. Let bij elke spier op welke kant hij de ribben of het middenrif op beweegt.</p>`,
  films:[F.adem1]});
E.zet(T,[15],{titel:"Water terug uit de nier",
  html:`<p>In de nier wordt eerst veel <b>voorurine</b> gefilterd uit het bloed in de glomerulus naar het kapsel van Bowman. Daarna wordt het grootste deel van het water en de nuttige stoffen weer <b>teruggeresorbeerd</b> naar de nierhaarvaten.</p><p>Het hormoon <b>ADH</b> uit de hypofyse beïnvloedt hoeveel water er wordt teruggeresorbeerd.</p>`,
  films:[F.gas3,F.hor5]});
E.zet(T,[16],{titel:"Diffusie en de wet van Fick",
  html:`<p>Diffusie gaat sneller als:</p><ul><li>het <b>oppervlak</b> groter is;</li><li>het <b>concentratieverschil</b> groter is;</li><li>de <b>afstand</b> kleiner is.</li></ul><p>In een formule: grootheden boven de deelstreep maken de snelheid groter als ze groter worden, grootheden onder de deelstreep maken hem kleiner.</p>`,
  films:[F.gas2,F.diff]});
E.zet(T,[17],{titel:"Een regelkring",
  html:`<p>In een regelkring met <b>negatieve terugkoppeling</b> wordt een verandering tegengewerkt. De vaste volgorde: <b>receptoren</b> meten de waarde → het <b>regelcentrum</b> vergelijkt met de normwaarde → de <b>effector</b> voert iets uit → de waarde gaat terug.</p><p>In een schema met + en –: + betekent ‘meer geeft meer’, – betekent ‘meer geeft minder’.</p>`,
  anim:anim(caps(["Een waarde wijkt af van de normwaarde.","Receptoren meten de verandering.","Het regelcentrum stuurt een signaal.","De effector reageert.","De waarde gaat terug naar normaal: negatieve terugkoppeling."]),kring),
  films:[F.adem1,F.hor5]});

/* ===== opgave 4 ===== */
E.zet(T,[19,22],{titel:"Symbiose en ecosystemen",
  html:`<p>Bij <b>symbiose</b> leven twee soorten nauw samen:</p><ul><li><b>mutualisme</b>: beide soorten voordeel;</li><li><b>commensalisme</b>: één soort voordeel, de ander geen voordeel en geen nadeel;</li><li><b>parasitisme</b>: één soort voordeel, de ander nadeel.</li></ul><p>Elke soort is een schakel in een voedselweb en kan ook een andere rol hebben, zoals bestuiver.</p>`,
  films:[F.eco3,F.eco2]});
E.zet(T,[20],{titel:"Prokaryoten en eukaryoten",
  html:`<ul><li><b>Prokaryoten</b> (bacteriën): geen kern, geen organellen met een membraan; wel ribosomen, celmembraan en meestal een celwand.</li><li><b>Eukaryoten</b>: een kern en organellen met een membraan (mitochondriën, ER, golgisysteem).</li><li><b>Planten</b>: celwand van cellulose, grote vacuole, chloroplasten. <b>Schimmels</b>: celwand van chitine.</li><li><b>Dieren</b>: geen celwand.</li></ul>`,
  films:[F.org]});
E.zet(T,[21],{titel:"Genotypen in een kruising",
  html:`<p>Een lichaamscel heeft van elk gen <b>twee allelen</b>, een geslachtscel maar <b>één</b>. Een homozygoot individu (AA of aa) maakt dus maar één soort geslachtscellen.</p><p>Bij de bevruchting komen een allel van de vader en een allel van de moeder samen in de zygote.</p>`,
  films:[F.erf2]});

/* ===== opgave 5 ===== */
E.zet(T,[23,24],{titel:"Warmte vasthouden",
  html:`<p>Een dier dat zijn lichaam op een vaste temperatuur houdt, verliest warmte aan de omgeving. Hoe snel warmte weglekt, hangt af van het temperatuurverschil met de omgeving en van het oppervlak.</p><p>Warmte wordt gemaakt in het hele lichaam (de <b>inhoud</b>) en lekt weg via het <b>oppervlak</b>. Vergelijk in de animatie oppervlak en inhoud bij verschillende maten.</p>`,
  anim:anim(caps(["Een kubus van 1 cm.","Een kubus van 2 cm.","Een kubus van 3 cm."]),kubus),
  films:[F.schaal]});
E.zet(T,[25,32,36],{titel:"Biotische en abiotische factoren",
  html:`<p><b>Abiotische factoren</b> komen uit de levenloze omgeving, bijvoorbeeld licht of wind.</p><p><b>Biotische factoren</b> zijn invloeden van andere organismen, bijvoorbeeld het voedsel dat een soort eet.</p><p>Voor elke abiotische factor heeft een soort een <b>tolerantiegebied</b>: het bereik waarbinnen hij kan leven. Hoe breder dat gebied, hoe meer verschillende plekken geschikt zijn.</p>`,
  films:[F.eco2]});
E.zet(T,[26,27,33,38],{titel:"Variatie en natuurlijke selectie",
  html:`<p>Evolutie door natuurlijke selectie:</p><ul><li>Individuen verschillen erfelijk: <b>genetische variatie</b>, ontstaan door mutaties en recombinatie bij de voortplanting.</li><li>Individuen met gunstige eigenschappen overleven beter en krijgen meer nakomelingen: <b>selectievoordeel</b>, een hogere fitness.</li><li>Zo worden gunstige allelen in de loop van generaties vaker in de populatie.</li></ul><p>Selectie werkt op de populatie, niet op één individu.</p>`,
  films:[F.evo2,F.evo1]});

/* ===== opgave 6 ===== */
E.zet(T,[28],{titel:"De dubbele bloedsomloop",
  html:`<ul><li><b>Grote bloedsomloop</b>: linkerkamer → aorta → slagaders naar organen → aders → holle aders → <b>rechterboezem</b>.</li><li><b>Kleine bloedsomloop</b>: rechterkamer → longslagader → longen → longaders → <b>linkerboezem</b>.</li></ul><p>Een <b>slagader</b> voert bloed van het hart af naar een orgaan, een <b>ader</b> voert bloed naar het hart terug. De <b>poortader</b> voert bloed van de darmen naar de lever.</p>`,
  films:[F.pomp]});
E.zet(T,[29],{titel:"De darmwand",
  html:`<p>De dunne darm neemt de kleine moleculen uit de vertering op in het bloed en de lymfe. Daarvoor heeft de wand een enorm oppervlak (darmvlokken en microvilli).</p><p>Voor <b>groei</b> heeft het lichaam bouwstoffen en energie nodig. Die komen uit het voedsel.</p>`,
  films:[F.voed4]});
E.zet(T,[30],{titel:"Betrouwbaarheid en validiteit",
  html:`<ul><li><b>Betrouwbaar</b>: als je het onderzoek herhaalt, vind je dezelfde uitkomst. Toeval speelt weinig rol. Je verhoogt het met meer metingen of meer proefobjecten.</li><li><b>Valide</b>: je meet echt wat je wilt meten. Je methode past bij je onderzoeksvraag.</li></ul>`,
  films:[F.kun,F.onderz]});
E.zet(T,[31],{titel:"Een voedselweb lezen",
  html:`<p>Een pijl in een voedselweb wijst van het organisme dat gegeten wordt naar de eter. Een verandering in één populatie werkt door langs de pijlen:</p><ul><li><b>naar boven</b>: meer prooi is meer voedsel voor de predator, die daardoor kan toenemen;</li><li><b>naar beneden</b>: meer predatoren betekent dat hun prooien afnemen, en wat die prooien eten neemt dan toe.</li></ul>`,
  films:[F.eco3]});

/* ===== opgave 7 ===== */
E.zet(T,[34],{titel:"Transport in een plant",
  html:`<ul><li><b>Houtvaten</b>: vervoeren water en mineralen (anorganische sapstroom) van de wortels omhoog.</li><li><b>Bastvaten</b>: vervoeren organische stoffen (zoals suikers uit de fotosynthese) van de bladeren naar andere delen, ook naar de wortels.</li></ul>`,
  films:[F.tplant]});
E.zet(T,[35],{titel:"Hoe planten zich verspreiden",
  html:`<p>Planten vormen zaden, die door wind, water of dieren worden verspreid. Dieren die vruchten eten, laten de zaden elders achter.</p><p>Een populatie houdt stand zolang er meer nakomelingen bijkomen dan er individuen verdwijnen.</p>`,
  films:[F.eco2]});
E.zet(T,[37],{titel:"Een keuze-experiment lezen",
  html:`<p>Bij een keuze-experiment krijgt elk dier twee mogelijkheden. Uitkomsten per groep tellen samen op tot 100%.</p><ul><li>Rond <b>50/50</b>: geen duidelijke voorkeur.</li><li>Een grote afwijking van 50/50: een duidelijke voorkeur.</li></ul>`,
  films:[F.onderz]});

/* ===== opgave 8 ===== */
E.zet(T,[39],{titel:"Hormonen bij inspanning en schrik",
  html:`<p>Bij schrik of plotselinge inspanning maakt het lichaam zich klaar om te vechten of te vluchten. Het bijniermerg geeft dan een hormoon af dat onder meer de hartslag verhoogt, en de bloedsuikerspiegel verhoogt.</p>`,
  films:[F.hor4]});
E.zet(T,[40,41,42],{titel:"Specifieke afweer en allergie",
  html:`<ul><li><b>Aspecifieke afweer</b>: werkt meteen en tegen alles, bijvoorbeeld fagocyten.</li><li><b>Specifieke afweer</b>: B- en T-lymfocyten herkennen één antigeen. Bij een eerste contact moeten ze eerst geactiveerd worden en zich delen. B-cellen worden plasmacellen die antistoffen maken.</li></ul><p>Bloedcellen ontstaan in het beenmerg uit stamcellen; elke soort heeft eigen voorlopercellen (zie de bloedcelvorming in je informatieboek). Bij een <b>allergie</b> reageert de specifieke afweer op een onschuldige stof; pas na <b>sensibilisering</b> (een eerste contact) volgt bij een volgend contact een allergische reactie.</p>`,
  films:[F.afw2,F.afw4]});
})();
