/* ===== Opgave 2: De ijzeren long (eigen vragen A01–A04 havo, A01 A03 A04 A05 vwo, uit toetsen-biologie) ===== */
{
/* Schematische ijzeren long. fase: rust | tank (pomp zuigt) | uitzetten | in | uit; hoofdIn = hoofd ook in de tank; lek = kraag lekt */
function IJZER({fase="rust",hoofdIn=false,lek=false}={}){
  const pijl=(x1,y1,x2,y2,c="var(--teal)",w=2.4)=>{const a=Math.atan2(y2-y1,x2-x1),h=9;
    return `<path d="M${x1},${y1} L${x2},${y2}" stroke="${c}" stroke-width="${w}" fill="none"/><path d="M${x2},${y2} L${(x2-h*Math.cos(a-0.45)).toFixed(1)},${(y2-h*Math.sin(a-0.45)).toFixed(1)} L${(x2-h*Math.cos(a+0.45)).toFixed(1)},${(y2-h*Math.sin(a+0.45)).toFixed(1)} Z" fill="${c}"/>`;};
  const groot=(fase==="uitzetten"||fase==="in")&&!hoofdIn&&!lek, klein=fase==="uit";
  const laag=(fase==="tank"||fase==="uitzetten"||fase==="in");
  const TX=hoofdIn?96:210;
  let s=`<rect x="${TX}" y="58" width="${600-TX}" height="164" rx="60" fill="var(--surface2)" stroke="var(--text2)" stroke-width="2.4"/>`;
  if(laag)s+=`<rect x="${TX+4}" y="62" width="${592-TX}" height="156" rx="56" fill="var(--teal)" opacity="${lek?.06:.13}"/>`;
  /* patiënt: hoofd links, lichaam liggend in de tank */
  const bry=groot?42:klein?33:37;
  s+=`<ellipse cx="400" cy="140" rx="170" ry="${bry}" fill="var(--surface)" stroke="var(--text2)" stroke-width="1.6"/>`;
  s+=`<path d="M190,130 h50 M190,150 h50" stroke="var(--text2)" stroke-width="1.6"/>`;
  s+=`<circle cx="160" cy="140" r="28" fill="var(--surface)" stroke="var(--text2)" stroke-width="1.6"/><circle cx="140" cy="134" r="2.4" fill="var(--text2)"/>`;
  /* longen in de borstkas */
  const lr=groot?26:klein?16:21;
  s+=`<ellipse cx="300" cy="${140-lr*0.55}" rx="${lr*1.7}" ry="${lr*0.62}" fill="var(--koraal-soft)" stroke="var(--koraal)" stroke-width="1.6"/><ellipse cx="300" cy="${140+lr*0.55}" rx="${lr*1.7}" ry="${lr*0.62}" fill="var(--koraal-soft)" stroke="var(--koraal)" stroke-width="1.6"/>`;
  s+=`<text x="300" y="${140+bry+18}" text-anchor="middle" class="lblm">longen</text>`;
  /* kraag */
  if(!hoofdIn)s+=`<rect x="203" y="104" width="14" height="72" rx="4" fill="var(--text2)"/><text x="210" y="196" text-anchor="middle" class="lblm">kraag</text>`;
  else s+=`<text x="${TX+20}" y="80" class="lblm">hoofd in de tank</text>`;
  /* pomp */
  s+=`<rect x="420" y="246" width="110" height="40" rx="6" fill="var(--surface)" stroke="var(--text2)" stroke-width="1.6"/><text x="475" y="271" text-anchor="middle" class="lbl">pomp</text><path d="M475,222 V246" stroke="var(--text2)" stroke-width="5"/>`;
  if(fase==="tank"||fase==="uitzetten"||fase==="in")s+=pijl(490,200,490,240,"var(--goud)");
  if(fase==="uit")s+=pijl(490,240,490,200,"var(--goud)");
  /* druk in de tank */
  const dt=fase==="rust"?"luchtdruk in de tank = buiten":fase==="uit"?"luchtdruk in de tank hoger":lek?"luchtdruk daalt nauwelijks":"luchtdruk in de tank lager";
  s+=`<text x="540" y="84" text-anchor="end" class="lbl">${dt}</text>`;
  /* borstkas zet uit */
  if(groot)s+=pijl(250,100,250,82,"var(--text)",1.8)+pijl(250,180,250,198,"var(--text)",1.8);
  /* lucht bij neus en mond */
  if(fase==="in"&&!hoofdIn&&!lek)s+=pijl(70,140,126,140)+`<text x="24" y="122" class="lbl">buitenlucht</text>`;
  if(fase==="in"&&lek)s+=pijl(96,140,126,140,"var(--teal)",1.2)+`<text x="20" y="122" class="lblm">weinig lucht</text>`;
  if(fase==="uit")s+=pijl(126,140,70,140)+`<text x="24" y="122" class="lbl">lucht naar buiten</text>`;
  if(hoofdIn)s+=`<text x="36" y="196" class="lblbad">geen drukverschil bij de mond</text>`;
  if(lek)s+=pijl(196,46,207,100,"var(--koraal)")+pijl(232,46,216,100,"var(--koraal)")+`<text x="214" y="36" text-anchor="middle" class="lblbad">lek: buitenlucht de tank in</text>`;
  if(fase==="uitzetten")s+=`<text x="300" y="44" text-anchor="middle" class="lblm">borstkas zet uit, longen gaan mee</text>`;
  return FIG(s,"0 0 640 300","Schematische ijzeren long: patiënt in een luchtdichte tank met het hoofd buiten de tank, een kraag om de hals en een pomp onder de tank",620,520);
}
const STOF_POMP={titel:"Lucht, druk en de ademspieren",html:`
<p>Lucht stroomt altijd van een plek met een <b>hogere druk</b> naar een plek met een <b>lagere druk</b>. Maak je een afgesloten ruimte met lucht groter, dan daalt de druk erin; maak je hem kleiner, dan stijgt de druk.</p>
<p>Je longen hebben zelf geen spieren: ze kunnen niet zuigen. De spieren rond de borstholte, het <b>middenrif</b> en de <b>tussenribspieren</b>, veranderen de grootte van de borstholte. Om elke long zit het <b>longvlies</b>, de binnenkant van de borstkas is bekleed met het <b>borstvlies</b>, en daartussen zit een dun laagje vocht.</p>`,
films:[F.adem]};
const STOF_VOL={titel:"Hoeveel lucht adem je?",html:`
<p>Met een spirometer meet je hoeveel lucht je ademt. Het <b>ademvolume</b> is de hoeveelheid lucht die je per keer inademt: in rust ongeveer een halve liter. Het <b>ademminuutvolume</b> is de hoeveelheid lucht die je per minuut inademt: in rust zo'n zes tot acht liter.</p>`+(VWO?`
<p>Niet alle ingeademde lucht komt in de longblaasjes: ongeveer anderhalve deciliter blijft in de luchtwegen hangen, de <b>dode ruimte</b>. Die lucht doet niet mee aan de gaswisseling, en bij de volgende uitademing gaat hij er als eerste weer uit.</p>`:""),
films:[F.adem]};
const ids=[];

ids.push(vraag(2,"de ademspieren",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Noteer welke twee soorten spieren deze patiënten niet meer konden gebruiken, en beschrijf wat elk van die spieren bij een gezond iemand doet bij het inademen."));
  choiceStep(think,{q:"Welke spier ligt als een koepel onder de longen?",opts:["het middenrif","de buikspieren","de hartspier"],right:0,
    ok:"Ja. De tweede soort spieren zit tussen de ribben.",no:"Het is een spierplaat die borstholte en buikholte van elkaar scheidt.",
    onDone:()=>choiceStep(think,{q:"Wat gebeurt er met de borstholte als je inademt?",opts:["die wordt groter","die wordt kleiner","die blijft even groot"],right:0,
      ok:"Goed. Beschrijf nu per spier hoe hij de borstholte groter maakt.",no:"Er moet ruimte komen voor de lucht die binnenkomt.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "<b>middenrif</b>: trekt samen, wordt platter en zakt",
    "<b>tussenribspieren</b>: trekken de ribben omhoog en naar buiten"],
    model:"Het middenrif trekt samen, wordt platter en zakt. De tussenribspieren trekken de ribben omhoog en naar buiten. Zo wordt de borstholte groter.",
    valkuil:"Alleen de twee namen zonder beschrijving: maximaal 1 punt. ‘Het middenrif gaat omhoog’ is fout: veel mensen denken dat, omdat de borst omhoog komt.",
    after:()=>waaromBtn(ans,textBox("In rust staat het middenrif als een koepel omhoog in de borstholte. Trekt het samen, dan wordt de koepel <b>platter en zakt</b> hij: de borstholte wordt langer. De tussenribspieren trekken de ribben <b>omhoog en naar buiten</b>: de borstholte wordt breder. Bij polio werken de zenuwen naar deze spieren niet meer, en dan wordt de borstholte niet groter."))});
  q.append(think,ans);
},STOF_POMP));

if(!VWO)ids.push(vraag(2,"pompslagen per minuut",(q,id)=>{
  pre(q,"<p>Een kind in een ijzeren long heeft in rust 7,2 liter lucht per minuut nodig. De arts stelt de pomp zo in dat er per pompslag 0,40 liter lucht in de longen stroomt.</p>");
  const {think,ans,unlock}=start(q,B("Bereken hoeveel pompslagen per minuut de arts moet instellen."));
  numStep(think,{uid:"q"+id+"n",q:"Oefen eerst met de getallen uit de film. Je ademt in rust 0,5 liter per keer in, 12 keer per minuut. Hoeveel liter is dat per minuut?",right:6,
    ok:"Ja: 0,5 × 12 = 6 liter per minuut, je ademminuutvolume.",no:"Hoeveel liter per keer, en hoeveel keer per minuut?",
    onDone:()=>choiceStep(think,{q:"Bij het kind weet je het aantal liter per minuut en het aantal liter per keer. Wat is onbekend?",opts:["het aantal keer per minuut","het ademvolume","het ademminuutvolume"],right:0,
      ok:"Goed. Draai je berekening van hierboven om.",no:"Lees de vraag nog eens: wat moet de arts instellen?",onDone:unlock})});
  rekenAnswer(ans,{id,pts:2,label:"aantal pompslagen per minuut",unit:"per minuut",right:18,
    aanpak:"Ik heb wel gebruikt dat het ademminuutvolume = volume per pompslag × aantal pompslagen per minuut (ik deelde 7,2 door 0,40), maar maakte een rekenfout.",
    model:"Ademminuutvolume = ademvolume × aantal keer per minuut, dus 7,2 / 0,40 = <b>18 pompslagen per minuut</b>.",
    after:()=>waaromBtn(ans,textBox("Per pompslag gaat er 0,40 L in. Na 10 slagen is dat 4,0 L, na 18 slagen 7,2 L. Het kind krijgt dan precies de 7,2 liter per minuut die het nodig heeft. Wie vermenigvuldigt (7,2 × 0,40 ≈ 2,9) heeft de verhouding omgedraaid: dan zou het kind maar 1,2 liter per minuut krijgen."))});
  q.append(think,ans);
},STOF_VOL));

ids.push(vraag(2,"lucht in de longen",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Leg in stappen uit hoe het verlagen van de luchtdruk in de tank ervoor zorgt dat er lucht in de longen van de patiënt stroomt."));
  choiceStep(think,{q:"Waarom gaan de longen mee als de borstkas groter wordt?",opts:["longvlies en borstvlies kleven met een laagje vocht aan elkaar","de longen zijn vastgegroeid aan de ribben","de longen hebben eigen spieren"],right:0,
    ok:"Ja. Wat de borstkas doet, doen de longen dus ook.",no:"De longen zitten niet vast aan de borstwand, maar volgen hem wel. Hoe heette dat in de film met de twee natte glasplaatjes?",
    onDone:()=>seqStep(think,{q:"Zet de stappen bij <b>gewoon</b> inademen op volgorde. Daarna pas je ze toe op de ijzeren long.",items:["de ademspieren maken de borstholte groter","de longen gaan mee en worden groter","de druk in de longen daalt","de lucht van buiten wordt de longen in geduwd"],shown:[2,0,3,1],
      ok:"Goed. In de ijzeren long doen de ademspieren niets. Wat neemt in de tank de eerste stap over?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "De druk <b>rond de borstkas</b> wordt lager, waardoor de borstkas uitzet en de longen meegaan (de vliezen kleven).",
    "Daardoor daalt de <b>druk in de longen onder de luchtdruk buiten de tank</b>, en duwt de buitenlucht via neus/mond en luchtwegen de longen in."],
    model:"De pomp verlaagt de druk in de tank, dus rond de borstkas. De druk in de borstkas is dan hoger dan erbuiten, zodat de borstkas uitzet; de longen gaan mee, omdat longvlies en borstvlies aan elkaar kleven. In de grotere longen daalt de druk onder de luchtdruk buiten de tank, waar het hoofd ligt. De buitenlucht wordt via neus en mond en de luchtwegen de longen in geduwd.",
    valkuil:"‘De lage druk zuigt de lucht de longen in’: de lucht in de tank komt niet in de longen. Het gaat om het verschil tussen de druk in de longen en de luchtdruk bij de mond, buiten de tank.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Rust: de luchtdruk in de tank is gelijk aan de luchtdruk buiten.",o:{fase:"rust"}},
      {cap:"De pomp zuigt lucht uit de tank: de luchtdruk rond de borstkas daalt.",o:{fase:"tank"}},
      {cap:"De borstkas zet uit, en de longen gaan mee: longvlies en borstvlies kleven met een laagje vocht aan elkaar.",o:{fase:"uitzetten"}},
      {cap:"In de grotere longen is de druk nu lager dan de luchtdruk buiten de tank. De buitenlucht duwt via neus, mond en luchtwegen de longen in.",o:{fase:"in"}},
      {cap:"Daarna verhoogt de pomp de druk in de tank: de borstkas wordt kleiner, de druk in de longen stijgt, en de lucht stroomt naar buiten.",o:{fase:"uit"}}],
      (st,s)=>st.innerHTML=IJZER(s.o)))});
  q.append(think,ans);
},STOF_POMP));

ids.push(vraag(2,"hoofd buiten de tank en een lekke kraag",(q,id)=>{
  pre(q,"<p>Het hoofd van de patiënt ligt buiten de tank, en de kraag sluit de tank om de hals luchtdicht af.</p>");
  q.append(el("p",{class:"qtext"},"– <b>Leg uit waarom het hoofd buiten de tank moet liggen.</b><br>– <b>Leg uit wat er gebeurt als de kraag om de hals lekt.</b>"));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  choiceStep(think,{q:"Lucht stroomt altijd …",opts:["van een hoge naar een lage druk","van een lage naar een hoge druk"],right:0,
    ok:"Ja. Er stroomt dus alleen lucht als er een drukverschil is.",no:"Denk aan een ballon die je loslaat.",
    onDone:()=>choiceStep(think,{q:"Waar is de druk het laagst als de pomp lucht uit de tank zuigt?",opts:["in de tank, rond de borstkas","buiten de tank, bij het hoofd","overal even laag"],right:0,
      ok:"Goed. Bedenk nu wat er verandert als de lucht bij neus en mond óók in de tank zou zitten, en wat er gebeurt als buitenlucht door een lek de tank in kan.",no:"De pomp zuigt alleen lucht uit de tank.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Hoofd buiten de tank: lag het hoofd in de tank, dan zou de druk bij neus en mond ook dalen; er is dan <b>geen drukverschil</b> tussen de lucht bij de mond en de longen, dus stroomt er geen lucht naar binnen.",
    "Lek: er stroomt buitenlucht de tank in, zodat de druk in de tank (rond de borstkas) <b>niet (genoeg) daalt</b>; de borstkas zet dan niet (genoeg) uit en er stroomt minder lucht de longen in."],
    model:"Het hoofd moet buiten de tank liggen, want anders daalt de druk bij neus en mond net zo hard als in de longen: dan is er geen drukverschil en stroomt er geen lucht de longen in. Lekt de kraag, dan stroomt er buitenlucht de tank in. De druk in de tank daalt dan niet genoeg, de borstkas zet nauwelijks uit, en er komt te weinig lucht in de longen.",
    valkuil:"‘Anders kan de patiënt niet ademen’ zonder het drukverschil te noemen is geen uitleg. Bij het lek: het gaat niet om lucht die ‘ontsnapt’ uit de longen, maar om lucht die de tank in komt.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Zo werkt het: lage druk in de tank, de longen worden groter, de buitenlucht bij de mond heeft een hogere druk en stroomt de longen in.",o:{fase:"in"}},
      {cap:"Hoofd in de tank: ook bij neus en mond is de druk laag. Tussen de mond en de longen is er geen drukverschil, dus er stroomt geen lucht naar binnen.",o:{fase:"tank",hoofdIn:true}},
      {cap:"Lekke kraag: buitenlucht stroomt de tank in. De druk in de tank daalt nauwelijks, de borstkas zet niet genoeg uit, en er komt weinig lucht in de longen.",o:{fase:"in",lek:true}}],
      (st,s)=>st.innerHTML=IJZER(s.o)))});
  q.append(think,ans);
},STOF_POMP));

if(VWO)ids.push(vraag(2,"pompslagen met de dode ruimte",(q,id)=>{
  pre(q,"<p>Een kind in een ijzeren long heeft per minuut 5,0 liter verse lucht in zijn longblaasjes nodig. De arts stelt de pomp zo in dat er per pompslag 0,40 liter lucht wordt ingeademd. De dode ruimte van het kind is 0,15 liter.</p>");
  const {think,ans,unlock}=start(q,B("Bereken hoeveel pompslagen per minuut de arts moet instellen."));
  choiceStep(think,{q:"Doet alle lucht van een pompslag mee aan de gaswisseling?",opts:["ja, alle 0,40 liter komt in de longblaasjes","nee, een deel blijft in de luchtwegen hangen"],right:1,
    ok:"Ja: dat deel is de dode ruimte. Reken eerst uit hoeveel verse lucht er per pompslag in de longblaasjes komt.",no:"Wat is de dode ruimte ook alweer?",onDone:unlock});
  let f1=null;
  numAnswer(ans,{id,fields:[
    ["verse lucht per pompslag","liter",v=>{f1=v;return Math.abs(v-0.25)<1e-6;},"0,40 − 0,15 = 0,25 liter verse lucht per pompslag"],
    ["aantal pompslagen per minuut","per minuut",v=>Math.abs(v-20)<1e-6||(f1>0&&Math.abs(f1-0.40)>1e-6&&Math.abs(v-5/f1)<0.05),"5,0 / 0,25 = 20 pompslagen per minuut. Verkeerde verse lucht per slag maar goed doorgerekend (5,0 / jouw getal): dit punt telt wel; 12,5 (zonder dode ruimte) telt niet."]],
    after:()=>waaromBtn(ans,textBox("Van elke pompslag van 0,40 L blijft 0,15 L in de luchtwegen hangen (de dode ruimte). Alleen 0,25 L verse lucht komt in de longblaasjes. Voor 5,0 L verse lucht per minuut zijn dus 5,0 / 0,25 = <b>20</b> pompslagen nodig. Wie 5,0 / 0,40 = 12,5 rekent, vergeet de dode ruimte: dan krijgt het kind maar 12,5 × 0,25 ≈ 3,1 L verse lucht per minuut."))});
  q.append(think,ans);
},STOF_VOL));

opgave("IJzeren long","De ijzeren long",`
<p>Rond 1950 waren er in Nederland en de Verenigde Staten grote epidemieën van polio (kinderverlamming). Het poliovirus kan de zenuwen aantasten die de ademspieren aansturen. Sommige patiënten konden daardoor niet meer zelf ademen. Zij werden behandeld in een ijzeren long (afbeelding 1).</p>
<p>In een ijzeren long ligt de patiënt in een luchtdichte metalen tank. Alleen het hoofd steekt erbuiten; rond de hals sluit een rubberen kraag de tank luchtdicht af. Een pomp verlaagt en verhoogt steeds de luchtdruk in de tank.</p>
<div class="eyebrow">afbeelding 1 (schematisch)</div>${IJZER()}
${TABEL(0,["onderdeel","functie"],[["metalen tank om het lichaam","luchtdichte ruimte"],["rubberen kraag om de hals","sluit de tank af; het hoofd ligt buiten de tank"],["pomp","verlaagt en verhoogt de luchtdruk in de tank"]],"","bij afbeelding 1")}`,ids);
}
