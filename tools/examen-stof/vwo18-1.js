/* Uitleg van de stof · oefenexamen vwo 2018 tijdvak 1 (tool vwo18-1). Wordt door samenvoegen.py gekopieerd naar tools/examen-stof/vwo18-1.js. */
(function(){
"use strict";
const E=window.EXSTOF, T="vwo18-1";if(!E)return;
const caps=a=>a.map(c=>({cap:c}));
const anim=(steps,draw)=>box=>E.stappen(box,steps,(st,s,i)=>{st.innerHTML=draw(i,s);});
const doos=(x,y,w,t,kl,h)=>`<rect x="${x}" y="${y}" width="${w}" height="${h||38}" rx="10" fill="var(--surface)" stroke="${kl||"var(--line2)"}" stroke-width="1.6"/><text class="lbl" x="${x+w/2}" y="${y+(h||38)/2+5}" text-anchor="middle">${t}</text>`;
const pijl=(x1,y1,x2,y2,kl)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${kl||"var(--text2)"}" stroke-width="1.8"/><circle cx="${x2}" cy="${y2}" r="3.5" fill="${kl||"var(--text2)"}"/>`;
const G="var(--goud)";

/* ---------- opgave 1 · Hoogteziekte ---------- */
E.zet(T,[1],{titel:"Regeling van de ademhaling",
  html:`<p>Het <b>ademcentrum</b> in de hersenstam regelt de ademhaling. Chemoreceptoren meten de pCO<sub>2</sub> (via de pH) en de pO<sub>2</sub> van het bloed.</p>
  <ul><li>De belangrijkste prikkel is <b>CO<sub>2</sub></b>: stijgt de pCO<sub>2</sub>, dan adem je sneller en dieper.</li><li>Een flinke daling van de pO<sub>2</sub> geeft ook een ademprikkel.</li><li>Sneller ademen verandert de bloedwaarden weer: negatieve terugkoppeling.</li></ul>
  <p>Bedenk bij een vraag over een ‘vreemd’ adempatroon steeds: welke waarde verandert er door het ademen zelf, en wat doet dat met de prikkel?</p>`,
  anim:anim(caps(["Een bloedwaarde wijkt af.","Chemoreceptoren geven dat door aan het ademcentrum.","Het ademcentrum past de ventilatie aan.","Door de nieuwe ventilatie veranderen de bloedwaarden weer."]),
    i=>E.svg("0 0 560 110",doos(10,36,120,"bloedwaarde",i===0||i===3?G:"")+doos(150,36,120,"receptoren",i===1?G:"")+doos(290,36,120,"ademcentrum",i===2?G:"")+doos(430,36,120,"ventilatie",i===2||i===3?G:"")+pijl(130,55,147,55)+pijl(270,55,287,55)+pijl(410,55,427,55)+`<path d="M490,74 V98 H70 V77" fill="none" stroke="${i===3?G:"var(--text3)"}" stroke-width="1.6" stroke-dasharray="5 4"/>`,"Regelkring van de ademhaling")),
  films:[["Gas op reis","films/gaswisseling/2-gas-op-reis.html"],["Adem in, adem uit","films/gaswisseling/1-adem-in-adem-uit.html"]]});

E.zet(T,[2],{titel:"Hormonen en regelkringen",
  html:`<p>Een <b>regelkring</b> met negatieve terugkoppeling: een afwijking wordt gemeten, een orgaan maakt een hormoon, het hormoon werkt op een doelweefsel, en het effect heft de afwijking weer op. Daardoor stopt de prikkel.</p>
  <p>Bij een regelkring geef je met <b>+</b> aan dat iets wordt gestimuleerd en met <b>-</b> dat het wordt geremd. Zoek in Binas bij de hormonen welk orgaan welk hormoon maakt en waarop het werkt.</p>
`,
  films:[["Post voor iedereen","films/hormonen/1-post-voor-iedereen.html"],["Wat er in je bloed zit","films/transport/3-wat-er-in-je-bloed-zit.html"]]});

E.zet(T,[3],{titel:"De zuurstofverzadigingscurve",
  html:`<p>De curve laat zien hoeveel procent van het hemoglobine O<sub>2</sub> draagt bij elke pO<sub>2</sub>. Hij is <b>S-vormig</b>: boven ±10 kPa is Hb bijna verzadigd, in het steile deel (2 tot 6 kPa) geeft Hb bij een kleine daling van de pO<sub>2</sub> veel O<sub>2</sub> af.</p>
  <ul><li>Het bloed begint in de slagaders bij een bepaalde pO<sub>2</sub> (op de curve: een % verzadiging).</li><li>De weefsels halen er O<sub>2</sub> af: het % verzadiging daalt.</li><li>Waar je dan op de curve uitkomt, is de pO<sub>2</sub> in de aders.</li></ul>
  <p>De vorm van de curve hangt af van eigenschappen van het bloed, zoals de pH, de temperatuur en de pCO<sub>2</sub>.</p>`,
  films:[["Gas op reis","films/gaswisseling/2-gas-op-reis.html"]]});

E.zet(T,[4],{titel:"Weefselvloeistof en diffusie",
  html:`<p>In een haarvat persen twee krachten tegen elkaar: de <b>bloeddruk</b> duwt vocht naar buiten, de <b>osmotische waarde</b> van het bloed (eiwitten) trekt vocht terug. Aan het begin van het haarvat wint de bloeddruk, aan het eind de osmotische waarde.</p>
    <p>Gaswisseling in de longblaasjes is <b>diffusie</b>. Volgens de wet van Fick gaat dat sneller bij een groter oppervlak, een groter concentratieverschil en een kleinere afstand.</p>`,
  films:[["Weefselvloeistof en lymfe","films/transport/4-weefselvloeistof-en-lymfe.html"],["Gas op reis","films/gaswisseling/2-gas-op-reis.html"]]});

E.zet(T,[5],{titel:"Delen van de hersenen",
  html:`<ul><li><b>Grote hersenen</b>: de schors verwerkt waarnemingen, bewuste bewegingen, denken, taal, oordelen en geheugen.</li><li><b>Kleine hersenen</b>: coördinatie en verfijning van bewegingen, evenwicht, houding.</li><li><b>Hersenstam</b> (verlengde merg, brug, middenhersenen): levensfuncties als ademhaling, hartslag, bloeddruk en reflexen.</li></ul>`,
  films:[["Het hoofdkantoor","films/zenuwstelsel/5-het-hoofdkantoor.html"]]});

E.zet(T,[6,7],{titel:"Koolzuuranhydrase en de pH",
  html:`<p>Het enzym <b>koolzuuranhydrase</b> versnelt een evenwichtsreactie:</p>
  <p style="text-align:center"><b>CO<sub>2</sub> + H<sub>2</sub>O ⇌ H<sub>2</sub>CO<sub>3</sub> ⇌ H<sup>+</sup> + HCO<sub>3</sub><sup>-</sup></b></p>
    <p><b>HCO<sub>3</sub><sup>-</sup></b> is de belangrijkste <b>buffer</b> in het bloed: het bindt H<sup>+</sup>. De nieren regelen de pH door H<sup>+</sup> uit te scheiden en HCO<sub>3</sub><sup>-</sup> terug te nemen (resorptie).</p>`,
  anim:anim(caps(["HCO₃⁻ in het bloed.","Er komt H⁺ bij (bv. uit de stofwisseling).","HCO₃⁻ vangt H⁺ weg: de pH blijft ongeveer gelijk."]),
    i=>E.svg("0 0 560 100",doos(30,30,140,"HCO₃⁻",i>=0?G:"")+(i>=1?doos(210,30,100,"H⁺","var(--koraal)"):"")+(i>=2?pijl(320,49,370,49)+doos(380,30,150,"H₂CO₃",G):""),"Buffer")),
  films:[["Uitscheiding en evenwicht","films/gaswisseling/3-uitscheiding-en-evenwicht.html"]]});

E.zet(T,[8],{titel:"Longvolumes",
  html:`<ul><li><b>Ademvolume</b>: de lucht per gewone ademteug.</li><li><b>Inademingsreservevolume</b>: wat je na een gewone inademing nog extra kunt inademen.</li><li><b>Uitademingsreservevolume</b>: wat je na een gewone uitademing nog extra kunt uitblazen.</li><li><b>Vitale capaciteit</b> = ademvolume + beide reservevolumes: de grootste teug die mogelijk is.</li><li><b>Totale longcapaciteit</b> = vitale capaciteit + restvolume.</li></ul>
  `,
  films:[["Adem in, adem uit","films/gaswisseling/1-adem-in-adem-uit.html"]]});

/* ---------- opgave 2 · Q-koorts ---------- */
E.zet(T,[9,10],{titel:"Fagocytose en de immuunrespons",
  html:`<p>Een <b>macrofaag</b> neemt een ziekteverwekker op in een blaasje (fagosoom). Een lysosoom versmelt ermee: het <b>fagolysosoom</b>.</p>
  <p>Macrofagen zijn ook <b>antigeenpresenterende cellen</b>: stukjes van de ziekteverwekker komen op het celmembraan te zitten (met MHC-eiwitten). T-helpercellen herkennen ze en activeren daarna:</p>
  <ul><li>de <b>humorale</b> respons: B-cellen worden plasmacellen die antistoffen maken;</li><li>de <b>cellulaire</b> respons: cytotoxische T-cellen (Tc) doden geïnfecteerde lichaamscellen.</li></ul>`,
  anim:anim(caps(["Fagocytose: de ziekteverwekker komt in een fagosoom.","Een lysosoom versmelt ermee.","Antigeen op het membraan: de T-helpercel wordt geactiveerd.","Die activeert B-cellen en Tc-cellen."]),
    i=>E.svg("0 0 560 110",doos(10,36,120,"fagosoom",i===0?G:"")+doos(150,36,120,"+ lysosoom",i===1?G:"")+doos(290,36,120,"T-helpercel",i===2?G:"")+doos(430,10,120,"B-cel",i===3?G:"",34)+doos(430,62,120,"Tc-cel",i===3?G:"",34)+pijl(130,55,147,55)+pijl(270,55,287,55)+pijl(410,50,427,28)+pijl(410,60,427,80),"Fagocytose en activatie")),
  films:[["De eerste verdediging","films/afweer/1-de-eerste-verdediging.html"],["T-cellen en virussen","films/afweer/3-t-cellen-en-virussen.html"]]});

E.zet(T,[11],{titel:"Barrières tegen ziekteverwekkers",
  html:`<p>Je lichaam heeft verschillende eerste verdedigingslinies:</p><ul><li><b>Huid</b>: dikke laag dode cellen.</li><li><b>Slijmvliezen</b> met slijm en trilharen in de luchtwegen.</li><li><b>Maagsap</b>: zoutzuur (pH 1 à 2) en enzymen doden veel micro-organismen.</li></ul>
`,
  films:[["De eerste verdediging","films/afweer/1-de-eerste-verdediging.html"]]});

E.zet(T,[12],{titel:"Antibiotica en eiwitsynthese",
  html:`<p>Antibiotica grijpen in op iets wat bacteriën wel hebben en wij niet (of anders): de celwand, het <b>70S-ribosoom</b>, bacteriële enzymen.</p>
  <p>Aan ribosomen vindt de <b>translatie</b> plaats: mRNA wordt vertaald in een eiwit. Eiwitten zijn nodig als enzym (bv. voor DNA-replicatie) en als bouwstof van de cel.</p>`,
  films:[["Van DNA naar eiwit","films/dna/3-van-dna-naar-eiwit.html"],["Microben","films/cellen/microben.html"]]});

E.zet(T,[13],{titel:"Vaccinatie en geheugen",
  html:`<p>Bij vaccinatie krijg je onschadelijk gemaakt antigeen. Je maakt antistoffen en <b>geheugencellen</b> (actieve immunisatie). Bij een volgende besmetting volgt een snelle, sterke secundaire reactie.</p>
`,
  films:[["Vaccins, allergie en bloedgroepen","films/afweer/4-vaccins-allergie-en-bloedgroepen.html"]]});

/* ---------- opgave 3 · Grottentetra ---------- */
E.zet(T,[14,19],{titel:"Natuurlijke selectie",
  html:`<p>In een populatie verschillen individuen erfelijk van elkaar. Individuen met eigenschappen die in dat milieu gunstig zijn, overleven vaker en krijgen meer nakomelingen: hun allelen worden algemener.</p>
  <p>Let op het verschil: een eigenschap die ‘nutteloos’ is, is nog niet vanzelf een <b>nadeel</b>. Een nadeel verlaagt de overlevingskans of het aantal nakomelingen.</p>`,
  films:[["Natuurlijke selectie","films/evolutie/2-natuurlijke-selectie.html"],["Vormen van selectie","films/evolutie/3-vormen-van-selectie.html"]]});

E.zet(T,[15],{titel:"Osmoregulatie bij vissen",
  html:`<p>Water gaat door osmose naar de kant met de <b>hoogste</b> osmotische waarde (de meeste opgeloste deeltjes).</p>
  <p>Een vis kan zijn osmotische waarde regelen met wat hij drinkt, met het actief opnemen of uitscheiden van zouten via de kieuwen, en met de nieren (hoeveel zout en water hij terugneemt uit de voorurine).</p><p>Bedenk eerst welke kant het water en de zouten vanzelf op gaan, en dan wat de vis moet doen om dat tegen te gaan.</p>`,
  films:[["Diffusie en osmose","films/cellen/diffusie-osmose/index.html"],["Water in balans","films/hormonen/5-water-in-balans.html"]]});

E.zet(T,[16],{titel:"Eiwitstructuur",
  html:`<ul><li><b>Primaire structuur</b>: de volgorde van aminozuren, vastgelegd door peptidebindingen.</li><li><b>Secundaire structuur</b>: α-helices en β-plaatjes door waterstofbruggen in de keten.</li><li><b>Tertiaire structuur</b>: de ruimtelijke vouwing van de hele keten (zwavelbruggen, ionbindingen, hydrofobe interacties).</li><li><b>Quaternaire structuur</b>: meerdere ketens samen.</li></ul>
`,
  films:[["Van DNA naar eiwit","films/dna/3-van-dna-naar-eiwit.html"]]});

E.zet(T,[17],{titel:"Gemiddelde en variatie aflezen",
  html:`<p>In een stippendiagram is elke stip één individu en het streepje het gemiddelde.</p><ul><li>Een verschil in <b>gemiddelde</b>: de streepjes liggen op een andere hoogte.</li><li>Een verschil in <b>variatie</b>: de stippen liggen meer of minder ver uit elkaar (spreiding).</li></ul>
  <p>Kijk ook goed naar de legenda: welke sterretjes betekenen een significant verschil in wat? En bij een bewering: zegt die ‘groter’ of ‘kleiner’?</p>`,
  films:[["Onderzoek doen","films/cellen/onderzoek-doen/index.html"]]});

E.zet(T,[18],{titel:"Verborgen variatie",
  html:`<p>Niet elke mutatie is zichtbaar in het fenotype. Een mutatie kan verborgen blijven, bijvoorbeeld als een eiwit met een kleine fout toch goed gevouwen wordt.</p>
  <p>Verandert het milieu, dan kunnen zulke verborgen mutaties alsnog tot uiting komen. Er ontstaat dan in korte tijd veel fenotypische variatie, waarop selectie kan werken. Zet bij een volgordevraag elke situatie in de goede oorzaak-gevolgketen.</p>`,
  films:[["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"],["Toeval en uitwisseling","films/evolutie/5-toeval-en-uitwisseling.html"]]});

/* ---------- opgave 4 · Bruin vet ---------- */
E.zet(T,[20],{titel:"Bouw past bij functie",
  html:`<p>Cellen met een hoge stofwisseling hebben veel <b>mitochondria</b>: daar vindt de aerobe dissimilatie (verbranding) plaats.</p>
  <p>Enzymen werken aan het <b>oppervlak</b> van hun substraat. Hoe groter het oppervlak, hoe sneller een stof kan worden omgezet (denk aan het emulgeren van vet door gal).</p>
  <p>Bij een ‘leg uit’-vraag noem je steeds het kenmerk én hoe het de functie helpt.</p>`,
  films:[["Celorganellen","films/cellen/celorganellen/index.html"]]});

E.zet(T,[21],{titel:"De ademhalingsketen en ATP-synthetase",
  html:`<p>In het binnenmembraan van het mitochondrium geven NADH en FADH<sub>2</sub> elektronen af aan de <b>ademhalingsketen</b>. De energie van die elektronen wordt gebruikt om protonen (H<sup>+</sup>) actief over het membraan te pompen. Zo ontstaat een <b>protonengradiënt</b>.</p>
  <p>Protonen kunnen alleen via speciale kanalen met de gradiënt mee terug. <b>ATP-synthetase</b> gebruikt die stroom om ATP te maken (chemiosmose). Bij O<sub>2</sub> als eindacceptor ontstaat water.</p>`,
  films:[["Alles op adem","films/stofwisseling/2-alles-op-adem.html"]]});

E.zet(T,[22],{titel:"Het autonome zenuwstelsel",
  html:`<ul><li><b>Animaal</b> zenuwstelsel: bewuste waarneming en de skeletspieren.</li><li><b>Autonoom</b> zenuwstelsel: onbewuste regeling van organen.<ul><li><b>Orthosympatisch</b>: actie, ‘vecht of vlucht’.</li><li><b>Parasympatisch</b>: rust en herstel.</li></ul></li></ul>
  <p>De hypothalamus stuurt het autonome zenuwstelsel aan.</p>`,
  films:[["Het kabelnetwerk","films/zenuwstelsel/2-het-kabelnetwerk.html"],["Stress","films/hormonen/4-stress.html"]]});

E.zet(T,[23],{titel:"Wat doet het bloed voor een weefsel?",
  html:`<p>Het bloed vervoert stoffen naar een weefsel toe en ervan weg, en het kan ook warmte verplaatsen.</p><p>Bedenk wat een weefsel <b>nodig heeft</b> voor zijn functie en wat het <b>produceert</b>.</p>
  <p>Bij een vraag over een specifiek weefsel moet je concreet zijn: welke stof of welk product, en waarom juist voor dít weefsel? Algemene antwoorden als ‘afvalstoffen’ zijn meestal niet genoeg.</p>`,
  films:[["Wat er in je bloed zit","films/transport/3-wat-er-in-je-bloed-zit.html"]]});

E.zet(T,[24,25],{titel:"Hormonen: twee werkingsmechanismen",
  html:`<ul><li><b>Hydrofiele hormonen</b> (bv. adrenaline, eiwithormonen) kunnen niet door het membraan. Ze binden aan een <b>receptor op het celmembraan</b>; binnen de cel geven <b>second messengers</b> het signaal door en activeren ze enzymen.</li>
  <li><b>Hydrofobe hormonen</b> (bv. steroïdhormonen zoals testosteron) gaan de cel in, binden aan een receptor in de cel en beïnvloeden in de kern de <b>transcriptie</b> van genen.</li></ul>
  <p>Lees in een schema de pijlen nauwkeurig: waar komt de stof terecht, en wat staat er bij het eindpunt?</p>`,
  films:[["Post voor iedereen","films/hormonen/1-post-voor-iedereen.html"],["De baas van de klieren","films/hormonen/3-de-baas-van-de-klieren.html"]]});

E.zet(T,[26],{titel:"Een conclusie uit een spreidingsdiagram",
  html:`<p>Bij een ‘beredeneer’-vraag geef je drie dingen:</p><ol style="margin:0;padding-left:20px"><li>het <b>resultaat</b> dat je afleest (wat zie je bij welke groep?);</li><li>de <b>conclusie</b> daaruit;</li><li>de <b>afweging</b> voor de vraag.</li></ol>
  <p>Let op wat er precies op de as staat: is het een hoeveelheid, of een activiteit? En kijk naar de spreiding: zijn er uitschieters?</p>`,
  films:[["Waarom afvallen zo moeilijk is","films/vervolg/voedingsleer-2-waarom-afvallen-zo-moeilijk-is.html"],["Kun je onderzoek vertrouwen?","films/extra/kun-je-onderzoek-vertrouwen.html"]]});

/* ---------- opgave 5 · Blauwalgen ---------- */
E.zet(T,[27,28],{titel:"Voedselwebben en ophoping",
  html:`<p>In een voedselweb wijst een pijl van <b>voedsel naar eter</b>. Een verandering in één populatie werkt door langs alle pijlen: soms direct (meer eters, minder prooi), soms via een omweg (minder van een concurrent of van een eter van je prooi).</p>
  <p>Stoffen die een organisme slecht kan afbreken of uitscheiden, kunnen zich in de voedselketen <b>ophopen</b>: een predator die veel prooien eet, krijgt de stof van al die prooien binnen.</p>`,
  films:[["Wie eet wie?","films/ecologie/3-wie-eet-wie.html"]]});

E.zet(T,[29],{titel:"Zuurstof in het water",
  html:`<p>Zuurstof komt in het water door <b>fotosynthese</b> (en vanuit de lucht). Zuurstof verdwijnt door <b>dissimilatie</b> van alle organismen in het water, ook van de reducenten.</p>
  <p>Bedenk bij een verandering in een ecosysteem wat die doet met de hoeveelheid fotosynthese en met de hoeveelheid dissimilatie.</p>`,
  films:[["Waar blijft het blad?","films/ecologie/4-waar-blijft-het-blad.html"],["Koolstof gaat rond","films/ecologie/6-koolstof-gaat-rond.html"]]});

E.zet(T,[30,31],{titel:"Grafieken lezen bij een maatregel",
  html:`<p>Leg bij een maatregel steeds twee vragen naast de grafiek:</p><ul><li><b>Werkt het?</b> Lees af wat de grafiek doet bij de waarden die in de tekst staan (bijvoorbeeld een bereik van concentraties). Ligt de lijn boven of onder een grenswaarde?</li><li><b>Is het nodig?</b> Wanneer is er eigenlijk een probleem (welk seizoen, welke omstandigheden)?</li></ul>
  <p>Bij meerdere scenario’s: vergelijk ze alleen op het punt waarin ze verschillen.</p>`,
  films:[["Ingrijpen of laten gaan","films/ecologie/4-ingrijpen-of-laten-gaan.html"]]});

/* ---------- opgave 6 · Wolf ---------- */
E.zet(T,[32,33,37,38],{titel:"Populaties en ecosystemen",
  html:`<p>Een <b>populatie</b> is een groep individuen van één soort in een gebied die zich onderling voortplant. Een populatie groeit eerst snel en vlakt af als hij de <b>draagkracht</b> nadert (S-curve). Die hangt af van ruimte, voedsel en andere hulpbronnen.</p>
  <p>Relaties in een ecosysteem: <b>predatie</b>, <b>concurrentie</b> (om dezelfde niche), <b>parasitisme</b> en ziekten. Een predator eet vaak de dieren die het makkelijkst te vangen zijn. Dode organismen worden door reducenten afgebroken: de stoffen gaan terug in de kringloop.</p>`,
  anim:anim(caps(["Weinig dieren: de groei begint langzaam.","Veel ruimte en voedsel: snelle groei.","Bij de draagkracht vlakt de groei af."]),
    i=>{const X=t=>40+t*4.6,Y=n=>130-n;let d="";for(let t=0;t<=100;t+=2){const n=110/(1+Math.exp(-(t-45)/9));d+=(d?" L":"M")+X(t)+","+Y(n);}
      return E.svg("0 0 520 150",`<path d="M40,10 V130 H510" fill="none" stroke="var(--text3)"/><line x1="40" x2="510" y1="20" y2="20" stroke="var(--text3)" stroke-dasharray="5 4"/><text x="505" y="15" class="lblm" text-anchor="end">draagkracht</text><path d="${d}" fill="none" stroke="var(--teal)" stroke-width="2.4"/><circle cx="${X([10,45,90][i])}" cy="${Y(110/(1+Math.exp(-([10,45,90][i]-45)/9)))}" r="7" fill="${G}"/>`,"Logistische groei");}),
  films:[["Hoeveel passen er?","films/ecologie/1-hoeveel-passen-er.html"],["Waar past een soort?","films/ecologie/2-waar-past-een-soort.html"],["Waarom zo weinig roofdieren?","films/ecologie/5-waarom-zo-weinig-roofdieren.html"]]});

E.zet(T,[34,36],{titel:"Overerving van chromosomen en mitochondriën",
  html:`<ul><li><b>Autosomen</b>: elk individu heeft er twee van elk; één van de vader, één van de moeder.</li><li><b>X-chromosoom</b>: een vrouwtje heeft er twee, een mannetje één. Een vader geeft zijn X aan zijn dochters.</li><li><b>Y-chromosoom</b>: alleen mannetjes; een vader geeft hem aan zijn zonen.</li><li><b>Mitochondriaal DNA</b>: zit in het cytoplasma van de eicel en komt (vrijwel) alleen van de <b>moeder</b>.</li></ul>
`,
  films:[["Chromosomen","films/erfelijkheid/1-chromosomen.html"],["Overerving via X-chromosomen en mitochondriën","films/erfelijkheid/5-overerving-via-x-chromosomen-en-mitochondrien.html"]]});

E.zet(T,[35],{titel:"Genetische variatie in kleine populaties",
  html:`<p>In een kleine populatie zijn alle dieren al snel familie van elkaar: <b>inteelt</b>. Daardoor worden nadelige recessieve allelen vaker homozygoot en komen ze tot uiting. Ook gaan allelen door toeval verloren (genetic drift).</p>
`,
  films:[["Toeval en uitwisseling","films/evolutie/5-toeval-en-uitwisseling.html"]]});
})();
