/* ===== Opgave 4: Schimmels, bacteriën en virussen (EI-cellen-KC01) ===== */
{
const STOF_SCH={titel:"Schimmels",html:`
<p>Schimmels zijn geen planten: ze vormen een eigen rijk. Een schimmel bestaat uit schimmeldraden, de <b>hyfen</b>. Alle hyfen samen heten het <b>mycelium</b>.</p>
<p>Op steeltjes ontstaan <b>sporen</b>: piepkleine cellen waaruit een nieuwe schimmel kan groeien. De sporen geven de schimmel zijn kleur. Een paddenstoel is het vruchtlichaam van een schimmel, waarin ook sporen ontstaan.</p>
<p>Hoe snel een schimmel groeit, hangt af van de omstandigheden. In de film zie je een proef met sneetjes brood op verschillende plekken.</p>`,
films:[F.mic]};
const q1=vraag(2,"schimmel in een dichte trommel",(q,id)=>{
  pre(q,"<p>Een boterham is in een dichte trommel toch gaan schimmelen.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit hoe de schimmel op het brood kwam, en waarom hij in de trommel snel groeide."));
  choiceStep(think,{q:"Waaruit groeit een nieuwe schimmel?",opts:["uit oud brood dat vanzelf gaat schimmelen","uit sporen","uit bacteriën die van vorm veranderen"],right:1,
    ok:"Ja. De trommel was dicht. Wanneer kunnen die sporen er dan op gekomen zijn?",no:"Schimmel ontstaat niet vanzelf. Waaruit groeit een nieuwe schimmel?",
    onDone:()=>choiceStep(think,{q:"Wat gebeurt er met het vocht uit een boterham in een dichte trommel?",opts:["het blijft in de trommel","het verdwijnt door het deksel","het wordt zout"],right:0,
      ok:"Goed. Welke omstandigheden in de trommel helpen een schimmel dus groeien?",no:"Een dichte trommel laat bijna geen lucht en waterdamp door.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "<b>Sporen uit de lucht</b> zaten al op het brood (vóór het deksel dichtging).",
    "In de trommel was het <b>vochtig</b> (en warm): schimmel groeit het best als het warm en vochtig is."],
    model:"Er zweven overal schimmelsporen in de lucht. Die kwamen op het brood vóór de trommel dichtging, bijvoorbeeld bij het snijden of inpakken. In de dichte trommel bleef het vocht van het brood hangen; in een warme en vochtige omgeving groeit schimmel snel.",
    valkuil:"‘De schimmel ontstond uit het brood’: 0 punten. Schimmel ontstaat niet vanzelf, hij groeit altijd uit sporen.",
    after:()=>waaromBtn(ans,textBox("Sporen zijn piepkleine cellen die overal in de lucht zweven, binnen en buiten. De meeste komen pas ná het bakken op het brood: bij afkoelen, snijden of inpakken. Een dicht deksel houdt nieuwe sporen tegen, maar niet de sporen die er al op zaten. En het houdt het vocht vast: schimmel groeit het best als het <b>warm en vochtig</b> is. In de koelkast groeit hij langzamer."))});
  q.append(think,ans);
},STOF_SCH);
opgave("Schimmels","Schimmels, bacteriën en virussen",GEEN_INLEIDING,[q1]);
}

/* ===== Opgave 5: Diffusie en osmose (EI-cellen-KD06; havo ook KD07) ===== */
{
const STOF_DIF={titel:"Diffusie en het celmembraan",html:`
<p>Alle deeltjes bewegen kriskras door elkaar. Daardoor gaan er netto meer deeltjes van een plek met een hoge concentratie naar een plek met een lage concentratie: <b>diffusie</b>. Zijn de concentraties gelijk, dan gaan er evenveel heen als terug: evenwicht.</p>
<p>Het celmembraan laat sommige stoffen door en andere niet: het is <b>selectief doorlatend</b> (selectief permeabel). Kleine stoffen die goed in vet oplossen, zoals zuurstof, gaan er zo doorheen. Ionen en glucose hebben een eiwit in het membraan nodig.</p>`,
films:[F.dif]};
const STOF_OSM={titel:"Osmose en osmotische waarde",html:`
<p>Of een oplossing veel of weinig ‘osmotisch werk’ doet, hangt niet af van hoe zwaar de opgeloste stof is, maar van <b>hoeveel losse deeltjes</b> er in het water zweven. Tel daarom deeltjes, geen moleculen.</p>
<p>Sommige stoffen blijven in water heel. Andere vallen bij het oplossen uiteen in <b>ionen</b>: geladen deeltjes. Eén mol van zo'n stof levert dan meer dan één mol deeltjes.</p>
<p>In een U-buis kan water de vloeistof aan één kant laten stijgen. Een hogere kolom vloeistof duwt harder terug.</p>`,
films:[F.dif]};
const ids=[];
ids.push(vraag(2,"wat is osmose?",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Wat is osmose? Gebruik in je antwoord de begrippen semipermeabel en osmotische waarde."));
  choiceStep(think,{q:"Welke stof beweegt bij osmose door het membraan?",opts:["de opgeloste stof","water","allebei evenveel"],right:1,
    ok:"Ja. Wat voor membraan is daarvoor nodig?",no:"Bij osmose kan juist één van de twee er niet door.",
    onDone:()=>choiceStep(think,{q:"Wat bepaalt de richting?",opts:["de kant met de meeste watermoleculen trekt","de concentratie opgeloste deeltjes die er niet door kunnen","de temperatuur"],right:1,
      ok:"Goed. Schrijf nu de twee delen op: wat voor membraan, en welke kant op.",no:"Zout trekt niet. Wat verschilt er tussen links en rechts?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Water gaat door een <b>semipermeabel membraan</b> (dat water doorlaat, maar de opgeloste stof niet).",
    "Naar de kant met de <b>hoogste osmotische waarde</b> (de hoogste concentratie opgeloste deeltjes die er niet door kunnen)."],
    model:"Osmose is het verplaatsen van water door een semipermeabel membraan, dat water wel doorlaat en de opgeloste stof niet. Het water gaat naar de kant met de hoogste osmotische waarde.",
    valkuil:"Ook goed: ‘osmose is diffusie van water door een semipermeabel membraan’, als de richting goed is. Fout: ‘water gaat naar de kant met de laagste osmotische waarde’ of ‘het zout gaat door het membraan’.",
    after:()=>waaromBtn(ans,textBox("Bij osmose beweegt alleen het <b>water</b>: de opgeloste stof kan niet door het <b>semipermeabele</b> membraan. Het water gaat naar de kant met de <b>hoogste osmotische waarde</b>, dus naar de kant met de meeste opgeloste deeltjes die er niet door kunnen. ‘Het zout trekt water aan’ hoor je vaak, maar zout trekt niet; in de film zie je hoe het wél zit."))});
  q.append(think,ans);
},STOF_DIF));
if(!VWO){
ids.push(vraag(2,"glucose of zout in een U-buis",(q,id)=>{
  pre(q,"<p>In een U-buis zit een membraan dat alleen water doorlaat. Links zit een oplossing van 0,2 mol glucose per liter, rechts een oplossing van 0,2 mol keukenzout per liter.</p>");
  const {think,ans,unlock}=start(q,B("a Welke kant heeft de hoogste osmotische waarde? Leg uit.<br>b Wat zie je na een uur aan de hoogte van de vloeistof?"));
  choiceStep(think,{q:"Wat gebeurt er met keukenzout als het oplost in water?",opts:["het blijft heel, net als glucose","het valt uiteen in ionen","het verdampt"],right:1,
    ok:"Ja: natrium en chloride. Hoeveel deeltjes per liter levert 0,2 mol zout dan?",no:"Keukenzout is natriumchloride. Wat gebeurt er met de natrium en de chloride in water?",
    onDone:()=>choiceStep(think,{q:"Water gaat naar de kant met de hoogste osmotische waarde. Wat gebeurt er met de hoogte aan die kant?",opts:["die stijgt","die daalt","die blijft gelijk"],right:0,
      ok:"Goed. Hoe lang gaat dat door? Denk aan het gewicht van de kolom.",no:"Er komt water bij aan die kant.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "a <b>rechts</b>: keukenzout valt uiteen in twee ionen, dus 0,4 mol deeltjes per liter tegen 0,2 mol bij glucose.",
    "b de vloeistof <b>rechts stijgt</b> (links daalt), tot de kolom even hard terugduwt."],
    model:"a Rechts. Keukenzout valt in water uiteen in natrium- en chloride-ionen: 0,2 mol zout geeft 0,4 mol deeltjes per liter, glucose blijft heel en geeft 0,2 mol. b Water gaat door osmose naar rechts: de vloeistof rechts stijgt en links daalt, tot de hogere kolom even hard terugduwt.",
    valkuil:"‘Evenveel, want beide 0,2 mol’: 0 punten. Je telt deeltjes, geen moleculen.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Begin: links 0,2 mol glucose per liter, rechts 0,2 mol keukenzout per liter. De hoogte is gelijk.",l:2,r:2,h:0},
      {cap:"Keukenzout valt uiteen in twee ionen: rechts zitten nu twee keer zoveel opgeloste deeltjes (0,4 mol per liter). Rechts heeft de hoogste osmotische waarde.",l:2,r:4,h:0},
      {cap:"Water gaat door het membraan naar rechts: de kolom rechts stijgt, links daalt.",l:2,r:4,h:50,p:1},
      {cap:"Hoe hoger de kolom, hoe harder hij terugduwt. Op een bepaalde hoogte stroomt er netto geen water meer.",l:2,r:4,h:80}],
      (st,s)=>{st.innerHTML=UBUIS({links:s.l,rechts:s.r,h:s.h,pijl:!!s.p,lab:["glucose","keukenzout"]});}))});
  q.append(think,ans);
},STOF_OSM));
}
opgave("Osmose","Diffusie en osmose",GEEN_INLEIDING,ids);
}

/* ===== Opgave 6: Pantoffeldiertjes in de sloot (EI-cellen-D01–D03) ===== */
{
const STOF_TON={titel:"Water in en uit een cel",html:`
<p>Of er water een cel in of uit gaat, hangt af van de osmotische waarde binnen en buiten de cel. Daar zijn woorden voor:</p>
<ul><li><b>isotonisch</b>: dezelfde osmotische waarde als de cel;</li><li><b>hypotonisch</b>: een lagere osmotische waarde dan de cel;</li><li><b>hypertonisch</b>: een hogere osmotische waarde dan de cel.</li></ul>
<p>Water vanzelf laten bewegen kost een cel geen energie. Iets tegen het concentratieverschil in verplaatsen wel: dat is <b>actief transport</b>, en het kost ATP.</p>`,
films:[F.dif]};
const ids=[];
ids.push(vraag(2,"waarom wegpompen?",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Leg uit waarom een pantoffeldiertje in zoet water steeds water moet wegpompen."));
  choiceStep(think,{q:"Waar is de osmotische waarde het hoogst: in het slootwater of in het cytoplasma?",opts:["in het slootwater","in het cytoplasma","overal even hoog"],right:1,
    ok:"Ja: in het cytoplasma zitten veel opgeloste stoffen. Welke kant op gaat het water dan?",no:"Zoet water bevat bijna geen opgeloste stoffen. In een cel zitten er veel.",
    onDone:()=>choiceStep(think,{q:"Wat heeft een plantencel wél en een pantoffeldiertje niet?",opts:["een celmembraan","een celwand","cytoplasma"],right:1,
      ok:"Goed. Wat zou er met het pantoffeldiertje gebeuren als het het water niet wegpompte?",no:"Lees de inleiding nog eens: wat heeft het pantoffeldiertje niet?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Het cytoplasma heeft een <b>hogere osmotische waarde</b> dan het slootwater (het water is hypotonisch), dus komt er door <b>osmose</b> steeds water de cel in.",
    "Zonder wegpompen zou de cel <b>zwellen en barsten</b>, want er is <b>geen celwand</b> die terugduwt."],
    model:"Het slootwater is hypotonisch: het cytoplasma heeft een hogere osmotische waarde. Daardoor komt er door osmose steeds water de cel in. Het pantoffeldiertje heeft geen celwand die terugduwt; zonder wegpompen zou het zwellen en barsten.",
    valkuil:"‘Het pantoffeldiertje drinkt te veel’ of ‘er komt zout naar binnen’: 0 punten. Het gaat om water dat door osmose binnenkomt.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Een pantoffeldiertje in zoet water: binnen veel opgeloste stoffen, buiten bijna niets.",s:0},
      {cap:"Het cytoplasma heeft een hogere osmotische waarde: door osmose komt er steeds water naar binnen.",s:1},
      {cap:"De contractiele vacuole verzamelt dat water…",s:2},
      {cap:"…en perst het eruit. Zonder celwand zou de cel anders zwellen en barsten, net als een rode bloedcel in zuiver water.",s:3}],
      (st,s)=>{st.innerHTML=PANT({stap:s.s});}))});
  q.append(think,ans);
},STOF_TON));

ids.push(vraag(2,"bij 6 g/L geen samentrekkingen",(q,id)=>{
  pre(q,"<p>Bij 6 g/L zout trekt de contractiele vacuole niet meer samen.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit wat je daaruit kunt afleiden over de osmotische waarde van het cytoplasma van het pantoffeldiertje."));
  choiceStep(think,{q:"Wat zie je in afbeelding 1 als de zoutconcentratie stijgt?",opts:["de vacuole trekt steeds vaker samen","de vacuole trekt steeds minder vaak samen","er verandert niets"],right:1,
    ok:"Ja. Minder samentrekken betekent: er hoeft minder water weg. Komt er dan meer of minder water binnen?",no:"Lees de grafiek van links naar rechts: wat doet de lijn?",
    onDone:()=>choiceStep(think,{q:"Er komt netto geen water meer de cel in en ook niet uit. Wat weet je dan van de osmotische waarde binnen en buiten?",opts:["binnen is hij hoger","buiten is hij hoger","ze zijn ongeveer gelijk"],right:2,
      ok:"Goed. Welk begrip uit de film hoort bij die situatie?",no:"Als de ene kant hoger is, gaat het water die kant op.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Bij 6 g/L komt er <b>netto geen water</b> meer de cel in, dus hoeft er niets weggepompt te worden.",
    "Het cytoplasma heeft dus ongeveer <b>dezelfde osmotische waarde</b> als een oplossing van 6 g/L keukenzout (de oplossing is dan <b>isotonisch</b>)."],
    model:"De vacuole hoeft niets meer weg te pompen, dus komt er bij 6 g/L netto geen water meer binnen. Dan zijn de osmotische waarden binnen en buiten gelijk: het cytoplasma heeft ongeveer dezelfde osmotische waarde als 6 g/L keukenzout. Die oplossing is isotonisch.",
    valkuil:"‘Bij 6 g/L is het pantoffeldiertje dood’: 0 punten. Er is gewoon geen water meer om weg te pompen.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"In zoet water (0 g/L) trekt de vacuole 12 keer per minuut samen: er komt veel water binnen.",hl:0},
      {cap:"Hoe zouter het water, hoe kleiner het verschil in osmotische waarde, en hoe minder water er binnenkomt.",hl:3},
      {cap:"Bij 6 g/L: 0 samentrekkingen. Er komt netto geen water binnen: binnen en buiten hebben dezelfde osmotische waarde. De oplossing is <b>isotonisch</b>.",hl:6}],
      (st,s)=>{st.innerHTML=GRAF({hl:s.hl});}))});
  q.append(think,ans);
},STOF_TON));

ids.push(vraag(2,"hoe snel is de cel ‘leeggepompt’?",(q,id)=>{
  pre(q,"<p>Bij één samentrekking perst de contractiele vacuole een hoeveelheid water naar buiten die gelijk is aan 2 procent van het volume van de cel. In zoet water trekt de vacuole 12 keer per minuut samen (fictieve gegevens).</p>");
  const {think,ans,unlock}=start(q,B("Bereken na hoeveel minuten het pantoffeldiertje een hoeveelheid water heeft weggepompt die even groot is als zijn eigen volume."));
  choiceStep(think,{q:"Hoeveel procent van het celvolume is ‘even groot als zijn eigen volume’?",opts:["2 procent","12 procent","100 procent"],right:2,
    ok:"Ja. Elke samentrekking pompt een vast stukje daarvan weg. Bereken eerst hoeveel samentrekkingen dat zijn, en daarna de tijd.",no:"Het hele volume van de cel, uitgedrukt in procent.",onDone:unlock});
  let n1;
  numAnswer(ans,{id,fields:[
    ["aantal samentrekkingen dat nodig is","",v=>{n1=v;return v===50;},"100 / 2 = 50 samentrekkingen"],
    ["tijd","minuten",v=>(v>=4&&v<=4.3)||(n1>0&&n1!==50&&Math.abs(v-n1/12)<=0.02*n1/12+0.05),"50 / 12 ≈ 4,2 minuten (ook goed: ruim 4 minuten; met een fout aantal uit stap 1 dat je goed doorrekent ook 1 punt)"]],
    after:()=>waaromBtn(ans,textBox("Eén samentrekking = 2% van het celvolume. Voor 100% zijn dus 100 / 2 = <b>50</b> samentrekkingen nodig. Met 12 per minuut duurt dat 50 / 12 ≈ <b>4,2 minuten</b>. Zo snel komt er in zoet water dus water binnen: in ruim vier minuten een hele cel vol. Wie 12 × 2 = 24% per minuut uitrekent, komt via 100 / 24 ook op 4,2 minuten."))});
  q.append(think,ans);
},STOF_TON));

opgave("Pantoffeldiertjes","Pantoffeldiertjes in de sloot",`
<p>Een pantoffeldiertje is een eencellig organisme dat in zoet water leeft, bijvoorbeeld in een sloot. Het heeft geen celwand. In het cytoplasma ligt een contractiele vacuole: een blaasje dat water uit het cytoplasma verzamelt en dat water, door samen te trekken, naar buiten perst. Dit wegpompen kost de cel energie.</p>
<p>Leerlingen zetten pantoffeldiertjes in water met verschillende concentraties keukenzout en tellen onder de microscoop hoe vaak de contractiele vacuole per minuut samentrekt (afbeelding 1).</p>
<div class="eyebrow">afbeelding 1 (fictieve gegevens)</div>${GRAF()}`,ids);
}
