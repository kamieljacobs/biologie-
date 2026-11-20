/* ===== Opgave 3: Ademstops in de nacht (eigen vragen E01–E04, vwo ook E05, uit toetsen-biologie) ===== */
{
/* concentratieverschil longblaasje–bloed (schema voor 'laat zien waarom' bij E01). lb, bl = relatieve zuurstofconcentratie 0–100 */
function DIFF({lb,bl,cap}){
  const Y1=230,h=v=>v*1.8;let s="";
  [[150,"longblaasje",lb,"var(--teal)"],[420,"bloed in het haarvat",bl,"var(--koraal)"]].forEach(([x,n,v,c])=>{
    s+=`<rect x="${x-50}" y="${Y1-180}" width="100" height="180" fill="none" stroke="var(--text2)" stroke-width="1.4"/><rect x="${x-50}" y="${Y1-h(v)}" width="100" height="${h(v)}" fill="${c}" opacity=".55"/>`;
    s+=`<text x="${x}" y="${Y1+20}" text-anchor="middle" class="lbl">${n}</text>`;});
  const d=lb-bl,w=Math.max(1,d/6);
  s+=`<path d="M210,${Y1-90} H340" stroke="var(--goud)" stroke-width="${w}"/><path d="M${352},${Y1-90} l-14,${-6-w/2} v${12+w} z" fill="var(--goud)"/>`;
  s+=`<text x="280" y="${Y1-110}" text-anchor="middle" class="lblm">zuurstof diffundeert</text>`;
  if(cap)s+=`<text x="20" y="22" class="lbl">${cap}</text>`;
  s+=`<text x="560" y="22" class="lblm" text-anchor="end">hoogte = zuurstofconcentratie</text>`;
  return FIG(s,"0 0 580 260","Staafjes met de zuurstofconcentratie in het longblaasje en in het bloed, met een pijl die dikker is naarmate het verschil groter is",580,480);
}
/* zuurstofbindingscurve (vwo, E05): verzadiging (%) tegen zuurstofspanning (kPa); vereenvoudigd, vorm als in Binas */
const CURVEV=p=>100*p**2.7/(p**2.7+3.6**2.7);
function CURVE({punten=[],band=null}={}){
  const X0=60,X1=600,Y0=24,Y1=264,xs=p=>X0+p*(X1-X0)/14,ys=v=>Y1-v*(Y1-Y0)/100;
  let s="";
  if(band)band.forEach(([a,b,c])=>s+=`<rect x="${xs(a)}" y="${Y0}" width="${xs(b)-xs(a)}" height="${Y1-Y0}" fill="${c}" opacity=".18"/>`);
  [0,2,4,6,8,10,12,14].forEach(k=>s+=`<path d="M${xs(k)},${Y1} v5" stroke="var(--text2)"/><text x="${xs(k)}" y="${Y1+20}" text-anchor="middle" class="lblm">${k}</text>`);
  [0,25,50,75,100].forEach(v=>s+=`<path d="M${X0},${ys(v)} H${X1}" stroke="var(--line)"/><text x="${X0-8}" y="${ys(v)+4}" text-anchor="end" class="lblm">${v}</text>`);
  s+=`<path d="M${X0},${Y0} V${Y1} H${X1}" fill="none" stroke="var(--text2)" stroke-width="1.4"/>`;
  let d="";for(let i=0;i<=140;i++){const p=i/10;d+=(i?"L":"M")+xs(p).toFixed(1)+","+ys(CURVEV(p)).toFixed(1);}
  s+=`<path d="${d}" fill="none" stroke="var(--text)" stroke-width="2.4"/>`;
  punten.forEach(([p,lab])=>s+=`<circle cx="${xs(p)}" cy="${ys(CURVEV(p))}" r="7" fill="var(--goud)" stroke="var(--text)" stroke-width="1.2"/>`+(lab?`<text x="${xs(p)+12}" y="${ys(CURVEV(p))+18}" class="lbl">${lab}</text>`:""));
  s+=`<text x="18" y="${(Y0+Y1)/2}" class="lblm" text-anchor="middle" transform="rotate(-90 18 ${(Y0+Y1)/2})">verzadiging (%)</text>`;
  s+=`<text x="${(X0+X1)/2}" y="${Y1+40}" text-anchor="middle" class="lblm">zuurstofspanning (kPa)</text>`;
  return FIG(s,"0 0 620 314","Zuurstofbindingscurve: S-vormig, steil bij lage en middelmatige zuurstofspanning, vlak bij hoge zuurstofspanning",620,500);
}
const STOF_DIFF={titel:"Diffusie in het longblaasje",html:`
<p>In het longblaasje lost zuurstof op in het vocht en <b>diffundeert</b> naar het bloed in de haarvaten; koolstofdioxide gaat de andere kant op. Bij diffusie gaan stoffen van een plek met een <b>hoge concentratie</b> naar een plek met een <b>lage concentratie</b>.</p>
<p>Hoe groter het concentratieverschil, hoe sneller de diffusie. Bij gewoon ademen blijft het verschil bestaan: je ademt steeds verse lucht in, en het bloed voert de zuurstof steeds af.</p>`,
films:[F.adem]};
const STOF_HB={titel:"Zuurstof aan boord",html:`
<p>Bijna alle zuurstof reist gebonden aan <b>hemoglobine</b> in de rode bloedcellen. In de longen is de zuurstofspanning hoog, en raakt de hemoglobine bijna vol. Waar de zuurstofspanning laag is, in de weefsels, laat de hemoglobine een deel van de zuurstof los.</p>
<p>De <b>saturatie</b> is het percentage van de hemoglobine dat zuurstof draagt. Een saturatiemeter op de vinger meet die in het bloed dat daar langsstroomt.</p>`,
films:[F.gas,F.adem]};
const STOF_ZUUR={titel:"Zuurgraad en pH",html:`
<p>Wat een stof zuur maakt, zijn <b>waterstofionen</b>. De zuurgraad meet je als pH: hoe meer waterstofionen, hoe zuurder, en hoe <b>lager</b> de pH. Normaal ligt de pH van het bloed tussen 7,35 en 7,45.</p>
<p>Je cellen maken bij de verbranding van glucose steeds koolstofdioxide. Bij gewoon ademen voer je dat net zo snel af als het ontstaat.</p>`,
films:[F.uit,F.gas]};
const STOF_REGEL={titel:"Het ademcentrum",html:`
<p>Het <b>ademcentrum</b> in het verlengde merg (onderste deel van de hersenstam) regelt je ademhaling, ook als je slaapt. Het stuurt via zenuwen het middenrif en de tussenribspieren aan.</p>
<p>Vlak bij het ademcentrum zitten <b>chemoreceptoren</b>. Sensor, regelcentrum en de ademspieren als uitvoerder vormen samen een <b>regelkring</b>: ademen wordt zo aangepast aan wat er in het bloed gebeurt.</p>`,
films:[F.gas]};
const ids=[];

ids.push(vraag(2,"lucht in de longen, toch minder zuurstof",(q,id)=>{
  pre(q,"<p>Tijdens een ademstop zit er nog ruim een liter lucht in de longen van Kees. Toch komt er steeds minder zuurstof in zijn bloed.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit waardoor."));
  choiceStep(think,{q:"Diffusie gaat van …",opts:["een hoge naar een lage concentratie","een lage naar een hoge concentratie"],right:0,
    ok:"Ja. De zuurstof gaat dus van het longblaasje naar het bloed zolang er in het longblaasje meer is.",no:"Denk aan een druppel inkt in water.",
    onDone:()=>choiceStep(think,{q:"Waardoor blijft bij gewoon ademen het concentratieverschil tussen longblaasje en bloed bestaan?",opts:["je ademt steeds verse lucht in, en het bloed voert de zuurstof steeds af","de longblaasjes pompen de zuurstof het bloed in","het bloed bevat helemaal geen zuurstof"],right:0,
      ok:"Goed. Welke van die twee valt tijdens een ademstop weg, en wat gebeurt er dan met het verschil?",no:"De film noemde twee dingen die samen het verschil in stand houden.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Er komt <b>geen verse lucht</b> in de longblaasjes, terwijl het bloed steeds zuurstof afvoert: de <b>zuurstofconcentratie in de longblaasjes daalt</b>.",
    "Daardoor wordt het <b>concentratieverschil</b> tussen longblaasje en bloed kleiner, en diffundeert er minder zuurstof naar het bloed."],
    model:"Tijdens de ademstop komt er geen verse lucht in de longblaasjes, maar het bloed neemt wel steeds zuurstof mee. De zuurstofconcentratie in de longblaasjes daalt dus. Daardoor wordt het concentratieverschil tussen longblaasje en bloed steeds kleiner, en diffundeert er steeds minder zuurstof naar het bloed.",
    valkuil:"‘Er is geen lucht meer’ klopt niet: er zit nog ruim een liter in. Het gaat om de zuurstof in die lucht en het verschil met het bloed.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Gewoon ademen: veel zuurstof in het longblaasje, weinig in het bloed dat aankomt. Groot verschil, veel diffusie.",d:{lb:95,bl:40,cap:"gewoon ademen"}},
      {cap:"Ademstop, na een tijdje: er komt geen verse lucht bij, maar het bloed haalt nog steeds zuurstof weg. De zuurstof in het longblaasje daalt.",d:{lb:70,bl:40,cap:"tijdens de ademstop"}},
      {cap:"Later in de ademstop: het verschil is klein geworden, dus er diffundeert nog maar weinig zuurstof naar het bloed.",d:{lb:52,bl:38,cap:"later in de ademstop"}}],
      (st,s)=>st.innerHTML=DIFF(s.d)))});
  q.append(think,ans);
},STOF_DIFF));

ids.push(vraag(2,"eerst bijna geen daling",(q,id)=>{
  pre(q,"<p>In afbeelding 1 daalt de saturatie in de eerste 10 seconden van een ademstop bijna niet.</p>");
  const {think,ans,unlock}=start(q,B("Geef hiervoor twee verklaringen."));
  choiceStep(think,{q:"Een saturatie van 96 % betekent …",opts:["dat 96 % van de hemoglobine zuurstof draagt","dat 96 % van de lucht in de longen zuurstof is"],right:0,
    ok:"Ja. De meter op de vinger meet dus iets in het bloed, niet in de longen.",no:"Lees de inleiding nog eens: daar staat wat de saturatie is.",
    onDone:()=>choiceStep(think,{q:"Wanneer daalt de saturatie op de meter?",opts:["als het bloed dat langs de vinger stroomt minder zuurstof draagt","zodra Kees stopt met ademen"],right:0,
      ok:"Goed. Zoek nu twee redenen waarom het bloed de eerste seconden van een ademstop nog bijna net zoveel zuurstof draagt: één in de longen en één in het bloed zelf.",no:"Stoppen met ademen is de oorzaak, maar de meter meet iets in het bloed.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "De longen zijn niet leeg: de lucht die nog in de longen zit, bevat nog <b>zuurstof die naar het bloed kan diffunderen</b>.",
    "Het bloed laat in rust maar ongeveer <b>een kwart</b> van zijn zuurstof los / het bloed dat terugkomt in de longen bevat nog veel zuurstof (de hemoglobine is nog bijna vol)."],
    model:"Ten eerste blijft er altijd lucht in de longen achter (het restvolume), en ook die lucht bevat nog zuurstof die naar het bloed kan diffunderen. Ten tweede laat de hemoglobine in rust maar ongeveer een kwart van zijn zuurstof los: het bloed dat terugkomt, is nog grotendeels gevuld. De saturatie daalt daarom eerst maar weinig.",
    valkuil:"Ook goed (voor één van de twee punten): het bloed met minder zuurstof moet eerst van de longen naar de vinger (de meetplek) stromen, dus de meting loopt achter.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Begin van de ademstop (20 s). De saturatie blijft eerst rond 96 %.",o:{hl:[[20,30,"var(--goud)"]],punt:25}},
      {cap:"In de longen zit nog ruim een liter lucht met zuurstof, en de hemoglobine die terugkomt, is nog grotendeels vol: er is nog een voorraad.",o:{hl:[[20,30,"var(--goud)"]],punt:30}},
      {cap:"Pas als die voorraad opraakt, daalt de saturatie steeds sneller, tot Kees wakker wordt.",o:{hl:[[30,65,"var(--koraal)"]],punt:60}}],
      (st,s)=>st.innerHTML=SAT(s.o)))});
  q.append(think,ans);
},STOF_HB));

ids.push(vraag(2,"koolstofdioxide en de pH",(q,id)=>{
  pre(q,"<p>Tijdens een ademstop verandert ook de zuurgraad van het bloed van Kees.</p>");
  const {think,ans,unlock}=start(q,B("Beschrijf wat er tijdens een ademstop met het koolstofdioxide en de pH van zijn bloed gebeurt, en leg uit waardoor de pH toch maar weinig verandert."));
  choiceStep(think,{q:"Een oplossing wordt zuurder als er meer … in zit.",opts:["waterstofionen","water","zuurstof"],right:0,
    ok:"Ja. Waar komen die waterstofionen tijdens een ademstop vandaan?",no:"Welk deeltje maakt een stof zuur?",
    onDone:()=>chipsStep(think,{q:"Welke stoffen in het bloed werken als buffer? Kies alles wat klopt.",items:[["waterstofcarbonaat",1],["hemoglobine",1],["glucose",0],["ureum",0]],
      ok:"Goed. Bedenk wat een buffer met waterstofionen doet.",no:"Eén of meer van je keuzes zijn geen buffer.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Het <b>koolstofdioxide</b> wordt niet uitgeademd en <b>hoopt zich op</b>; het reageert met water tot waterstofcarbonaat en zuur (waterstofionen), dus de <b>pH daalt</b>.",
    "<b>Buffers</b> in het bloed (waterstofcarbonaat, hemoglobine) vangen de waterstofionen op, zodat de pH maar weinig daalt."],
    model:"Kees ademt het koolstofdioxide niet uit, dus het hoopt zich op in zijn bloed. Koolstofdioxide reageert met water tot waterstofcarbonaat, en daarbij komt zuur (waterstofionen) vrij: de pH daalt. Buffers in het bloed, zoals waterstofcarbonaat en hemoglobine, vangen de meeste waterstofionen op. Daardoor daalt de pH maar weinig.",
    valkuil:"Alleen ‘het bloed wordt zuurder’ zonder koolstofdioxide als oorzaak: 0 punten voor het eerste element. Een buffer voert het zuur niet af, hij houdt het alleen vast.",
    after:()=>waaromBtn(ans,textBox("Ademstop → koolstofdioxide wordt niet uitgeademd → meer koolstofdioxide in het bloed → met water ontstaan waterstofcarbonaat en <b>waterstofionen</b> → de pH daalt. Buffers vangen het grootste deel van die waterstofionen weg, dus de daling blijft klein. Echt weg gaat het zuur pas weer als Kees ademt: dan blaast hij het koolstofdioxide uit."))});
  q.append(think,ans);
},STOF_ZUUR));

ids.push(vraag(2,"geen slaapmiddel",(q,id)=>{
  pre(q,"<p>Kees slaapt slecht en vraagt om een slaapmiddel. De arts weigert een middel dat het ademcentrum minder gevoelig maakt voor koolstofdioxide.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit waarom zo'n middel bij Kees gevaarlijk is."));
  choiceStep(think,{q:"Waarop reageert het ademcentrum vooral?",opts:["op koolstofdioxide in het bloed","op zuurstof in het bloed"],right:0,
    ok:"Ja. Tijdens een ademstop stijgt het koolstofdioxide.",no:"Denk aan de film: wat dwingt je om weer te ademen als je je adem inhoudt?",
    onDone:()=>choiceStep(think,{q:"Hoe eindigt elke ademstop van Kees (afbeelding 1)?",opts:["hij wordt kort wakker en ademt weer","de saturatie stijgt vanzelf, terwijl hij doorslaapt"],right:0,
      ok:"Goed. Bedenk wat er met dat ‘wakker worden’ gebeurt als het ademcentrum minder gevoelig is, en wat dat betekent voor de zuurstof in zijn bloed.",no:"Lees de inleiding nog eens.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Het ademcentrum reageert dan pas <b>later</b> op het stijgende koolstofdioxide, dus Kees wordt later wakker en een <b>ademstop duurt langer</b>.",
    "De zuurstof in zijn bloed <b>daalt dan verder</b> (de saturatie zakt dieper), terwijl het alarm voor zuurstof pas komt als die echt laag is."],
    model:"Het stijgende koolstofdioxide is het signaal dat Kees wakker maakt en weer laat ademen. Met zo'n middel reageert het ademcentrum daar pas later op, dus duurt elke ademstop langer. De zuurstof in zijn bloed zakt dan veel dieper. De sensoren voor zuurstof slaan pas alarm als de zuurstof echt laag is: dat is gevaarlijk.",
    valkuil:"Alleen ‘hij krijgt te weinig zuurstof’ zonder de koppeling met het ademcentrum: hooguit 1 punt.",
    after:()=>waaromBtn(ans,textBox("Bij Kees is het koolstofdioxide de wekker. Een middel dat het ademcentrum minder gevoelig maakt, zet die wekker later: de ademstop duurt langer, en in afbeelding 1 zou de dip veel dieper worden dan 80 %. De zuurstofsensoren in de halsslagader en de aorta zijn geen goede reserve: die slaan pas alarm als de zuurstof al echt laag is."))});
  q.append(think,ans);
},STOF_REGEL));

const STOF_CURVE={titel:"De zuurstofbindingscurve",html:`
<p>Zet je de <b>verzadiging</b> (het percentage van de hemoglobine dat zuurstof draagt) uit tegen de <b>zuurstofspanning</b>, dan krijg je de zuurstofbindingscurve. Je vindt hem in Binas. Hij heeft een S-vorm: bij hoge zuurstofspanning loopt hij vlak, bij lagere zuurstofspanning steil.</p>
<p>In de longen is de zuurstofspanning hoog; in de weefsels, waar zuurstof wordt verbruikt, is hij laag.</p>`,
films:[F.gas]};
if(VWO)ids.push(vraag(2,"eerst langzaam, dan steeds sneller",(q,id)=>{
  pre(q,"<p>In afbeelding 1 daalt de saturatie eerst langzaam en daarna steeds sneller.</p>");
  const {think,ans,unlock}=start(q,B("Leg dit uit met de zuurstofbindingscurve."));
  q.querySelector(".pre").insertAdjacentHTML("beforeend",`<p class="muted" style="font-size:14px">De zuurstofbindingscurve, zoals in Binas (vereenvoudigd):</p>${CURVE()}`);
  choiceStep(think,{q:"Wat staat er op de assen van de zuurstofbindingscurve?",opts:["verzadiging van de hemoglobine tegen zuurstofspanning","zuurstofspanning tegen tijd","saturatie tegen ademfrequentie"],right:0,
    ok:"Ja. Tijdens de ademstop daalt de zuurstofspanning in het bloed geleidelijk.",no:"Kijk naar de assen van de curve hierboven.",
    onDone:()=>choiceStep(think,{q:"Waar loopt de curve het steilst?",opts:["bij hoge zuurstofspanning (rechts)","bij lage tot middelmatige zuurstofspanning"],right:1,
      ok:"Goed. Volg nu de zuurstofspanning in het bloed van Kees tijdens de ademstop langs de curve.",no:"Kijk waar de lijn het snelst stijgt.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Eerst ligt de zuurstofspanning in het bloed op het <b>vlakke stuk</b> van de curve: een daling van de zuurstofspanning geeft weinig daling van de verzadiging.",
    "Daarna komt de zuurstofspanning op het <b>steile stuk</b>: een kleine verdere daling geeft een grote daling van de verzadiging."],
    model:"Aan het begin van de ademstop is de zuurstofspanning hoog: het bloed zit op het vlakke stuk van de curve. De zuurstofspanning daalt, maar de verzadiging nauwelijks. Daalt de zuurstofspanning verder, dan komt het bloed op het steile stuk. Daar geeft elke kleine daling van de zuurstofspanning een grote daling van de verzadiging: de saturatie zakt steeds sneller.",
    valkuil:"‘De zuurstof raakt steeds sneller op’ zonder de curve te gebruiken: 0 punten. Het gaat om vlak stuk → steil stuk.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Begin van de ademstop: hoge zuurstofspanning, vlak stuk. De verzadiging is ongeveer 96 %.",p:[[11,""]],band:[[8,14,"var(--groen)"]]},
      {cap:"De zuurstofspanning daalt een stuk, maar op het vlakke stuk zakt de verzadiging maar een paar procent.",p:[[11,""],[8,""]],band:[[8,14,"var(--groen)"]]},
      {cap:"Nu komt het bloed op het steile stuk: dezelfde daling van de zuurstofspanning geeft een veel grotere daling van de verzadiging.",p:[[8,""],[5,""]],band:[[3,8,"var(--koraal)"]]}],
      (st,s)=>st.innerHTML=CURVE({punten:s.p,band:s.band})))});
  q.append(think,ans);
},STOF_CURVE));

opgave("Ademstops","Ademstops in de nacht",`
<p>Kees (52) snurkt hard. Zijn vrouw merkt dat hij 's nachts soms helemaal stopt met ademen. In het ziekenhuis wordt hij een nacht gemeten. Hij heeft obstructieve slaapapneu: tijdens de slaap worden de spieren in zijn keel te slap, en zakt zijn bovenste luchtweg (achter in de keel) even dicht. Zijn ademspieren blijven bewegen, maar er komt geen lucht in zijn longen. Na een ademstop wordt hij heel even wakker, vaak zonder het te merken, en ademt hij weer. Dat gebeurt soms tientallen keren per uur.</p>
<p>In afbeelding 1 zie je de saturatie van Kees (hoeveel procent van zijn hemoglobine zuurstof draagt) tijdens twee ademstops.</p>
<div class="eyebrow">afbeelding 1 (fictieve gegevens)</div>${SAT()}`,ids);
}
