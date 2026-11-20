/* ===== Opgave 4: Veenweiden: het water omhoog (EI-ecologie-B01–B03, vwo + B04) ===== */
{
const TAB2=TABEL(2,["grondwater onder het maaiveld","60 cm","20 cm"],[["daling van de bodem (mm per jaar)","10","3"],["CO₂ uit de bodem (ton per hectare per jaar)","22","7"]],true);
const STOF_AF={titel:"Afbraak door reducenten",html:`
<p>Dode resten van planten en dieren zijn <b>organische stof</b>: grote moleculen met koolstof, waar energie in zit. Detrituseters, zoals regenwormen, maken de resten kleiner. <b>Reducenten</b> (bacteriën en schimmels) breken ze helemaal af tot koolstofdioxide, water en mineralen. Dat heet <b>mineralisatie</b>. De reducenten halen er energie uit door te dissimileren.</p>
<p>Hoe snel afbraak gaat, hangt af van de omstandigheden: denk aan een composthoop, die je af en toe omzet, of aan een lichaam dat tweeduizend jaar bewaard bleef in een hoogveen.</p>`,
films:[F.blad,F.c]};
const b1=vraag(2,"meer CO₂ en een dalende bodem",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Leg met tabel 2 uit waardoor er bij een laag grondwaterpeil meer CO₂ uit de bodem komt én de bodem sneller daalt."));
  choiceStep(think,{q:"Bij een laag grondwaterpeil ligt de bovenste 60 cm van het veen boven het water. Wat zit er dan tussen het veen?",opts:["lucht, met zuurstof","alleen water"],right:0,
    ok:"Ja. Wat kunnen bacteriën en schimmels in het veen doen als er zuurstof is?",no:"Boven het grondwater zijn de ruimtes in de bodem niet met water gevuld.",
    onDone:()=>choiceStep(think,{q:"Veen bestaat uit oude plantenresten. Wat gebeurt er met de dikte van de bodem als een deel van die resten verdwijnt?",opts:["de bodem wordt dunner","de bodem wordt dikker","de dikte verandert niet"],right:0,
      ok:"Goed. Verbind nu de twee rijen van tabel 2 met één proces, en zeg in welke vorm het veen verdwijnt.",no:"Als er materiaal uit een laag weggaat, blijft er minder van over.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Boven het grondwater komt <b>lucht (zuurstof)</b> in het veen, zodat bacteriën en schimmels het veen <b>afbreken</b> en daarbij (door dissimilatie) CO₂ afgeven.",
    "Het afgebroken veen <b>verdwijnt</b> (als CO₂ en water), dus de bodem wordt dunner en daalt."],
    model:"Bij een laag grondwaterpeil komt er lucht, en dus zuurstof, in het veen. Bacteriën en schimmels kunnen het veen dan afbreken. Ze dissimileren en geven daarbij CO₂ af: 22 in plaats van 7 ton per hectare. Het veen dat wordt afgebroken, verdwijnt als CO₂ en water. De bodem wordt dus dunner en zakt: 10 in plaats van 3 mm per jaar.",
    valkuil:"‘Het veen droogt in’ zonder afbraak: 0 punten voor het tweede punt. Het gaat erom dat het veen echt verdwijnt, doordat het wordt afgebroken.",
    after:()=>waaromBtn(ans,textBox("Eén proces verklaart beide rijen van tabel 2: <b>afbraak met zuurstof</b>. Bij 60 cm komt er lucht in het veen. Reducenten breken de oude plantenresten af en geven CO₂ af. Wat ze afbreken, is weg: de bodem wordt dunner en daalt. Bij 20 cm zit het veen bijna helemaal onder water, zonder zuurstof: dan gaat de afbraak heel langzaam."))});
  q.append(think,ans);
},STOF_AF);

const STOF_KR={titel:"De koolstofkringloop",html:`
<p>In de <b>snelle kringloop</b> haalt een plant met fotosynthese koolstofdioxide uit de lucht en bouwt de koolstof in in organische stof. Dieren eten de plant, reducenten breken dode resten af. Allemaal dissimileren ze en geven ze de koolstof weer af als koolstofdioxide. Een koolstofatoom gaat zo in dagen tot jaren rond, soms eeuwen in het hout van een boom.</p>
<p>Daarnaast is er een <b>trage kringloop</b>: koolstof die lange tijd uit de snelle kringloop is, zoals in steenkool, aardolie, aardgas en kalksteen.</p>`,
films:[F.c,F.blad]};
const b2=vraag(2,"hoe het veen is ontstaan",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Leg uit hoe het veen in deze weilanden ooit is ontstaan. Leg ook uit waarom het veen een voorraad van de trage koolstofkringloop is."));
  choiceStep(think,{q:"Waar bestaat veen uit?",opts:["uit opgestapelde plantenresten","uit zand en klei","uit kalk van schelpen"],right:0,
    ok:"Ja. Normaal breken reducenten plantenresten af. Onder welke omstandigheden lukt dat bijna niet?",no:"Denk aan veenmos in een hoogveen.",
    onDone:()=>choiceStep(think,{q:"Hoe lang zit een koolstofatoom in de snelle kringloop meestal vast, voordat het weer in de lucht is?",opts:["dagen tot jaren","miljoenen jaren"],right:0,
      ok:"Goed. Vergelijk dat met hoe lang de koolstof in het veen al ligt.",no:"In de snelle kringloop gaat koolstof van de lucht naar planten, dieren en reducenten en weer terug.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Plantenresten (veenmos, riet) stapelden zich op in <b>nat, zuurstofarm (zuur) water</b>, waar reducenten ze bijna niet afbreken.",
    "De koolstof <b>blijft daar duizenden jaren liggen</b>, in plaats van binnen dagen tot jaren terug te gaan naar de lucht."],
    model:"Veen is ontstaan uit plantenresten, zoals veenmos en riet, die afstierven in nat, zuurstofarm water. Daar konden bacteriën en schimmels ze bijna niet afbreken, dus stapelden de resten zich op. De koolstof in die resten ligt er al duizenden jaren en gaat niet binnen een paar jaar terug naar de lucht, zoals in de snelle kringloop. Daarom hoort veen bij de trage kringloop.",
    valkuil:"‘Veen is uit dode dieren ontstaan’ of ‘veen is ontstaan doordat het koud was’: 0 punten. Het gaat om plantenresten in nat, zuurstofarm water.",
    after:()=>waaromBtn(ans,textBox("In een moeras of hoogveen sterven de onderste delen van de planten onder water af. Daar komt geen zuurstof bij en het water is zuur. Reducenten kunnen dan bijna niets: de resten stapelen zich op, ongeveer een millimeter per jaar. Zo komt koolstof terecht <b>waar afbraak stopt</b>, en ligt hij duizenden jaren stil. In de snelle kringloop gaat koolstof juist in dagen tot jaren terug de lucht in."))});
  q.append(think,ans);
},STOF_KR);

const STOF_N={titel:"Stikstof in de bodem",html:`
<p>Planten nemen stikstof op als <b>nitraat</b> of ammonium en maken er eiwitten van. Mest bevat veel stikstof. Afbrekers maken van de stikstof in mest en dode resten <b>ammonium</b> (ammonificatie). Nitrificerende bacteriën maken van ammonium <b>nitraat</b>: <b>nitrificatie</b>, dat kan alleen met zuurstof.</p>
<p>Ammonium blijft aan klei en humus plakken. Nitraat niet: wat de planten niet opnemen, spoelt met het regenwater uit naar het grondwater en de sloot (<b>uitspoeling</b>). Daar groeien algen en kroos harder: <b>eutrofiëring</b>.</p>
<p>Let bij elke stap van de stikstofkringloop op de zuurstof: welke bacteriën werken mét zuurstof, en welke juist zonder?</p>`,
films:[F.n]};
/* schema bij 'laat zien waarom' vraag 3: stap voor stap oplichten */
function KETEN(k){const box=(x,y,w,t,on)=>`<rect x="${x}" y="${y}" width="${w}" height="44" rx="8" fill="${on?"var(--goud)":"none"}" fill-opacity="${on?.22:0}" stroke="${on?"var(--goud)":"var(--text3)"}" stroke-width="${on?2.2:1.2}"/>`+T(x+w/2,y+27,t,"lbl");
  const pijl=(x1,y1,x2,y2,on)=>`<path d="M${x1},${y1} L${x2},${y2}" stroke="${on?"var(--text)":"var(--text3)"}" stroke-width="1.8" marker-end="url(#pn)"/>`;
  let g=`<defs><marker id="pn" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--text2)"/></marker></defs>`;
  g+=`<rect x="0" y="100" width="320" height="104" rx="6" fill="var(--teal)" opacity="${k>=1?.22:.08}"/>`+T(10,120,"natte bodem: geen zuurstof","lbl","start");
  g+=box(70,10,180,"stikstofgas → lucht",k>=2)+box(70,135,180,"nitraat in de bodem",k>=2)+box(70,240,180,"minder nitraat in de sloot",k>=3);
  g+=pijl(160,133,160,58,k>=2)+T(172,98,"bacteriën","lblm","start")+pijl(160,181,160,236,k>=3);
  return SVG("0 0 320 290",g,"Schema: denitrificatie in een natte bodem",380);}
const b3=vraag(3,"minder nitraat in de sloten",(q,id)=>{
  pre(q,"<p>Op de weilanden komt mest. Bij een hoog grondwaterpeil komt er minder nitraat in de sloten.</p>");
  const {think,ans,unlock}=start(q,B("Leg in drie stappen uit hoe dat komt. Noem het proces dat daarbij hoort."));
  choiceStep(think,{q:"Is er in een bodem die bijna helemaal onder water staat veel of weinig zuurstof?",opts:["veel","weinig"],right:1,
    ok:"Ja: water vult de ruimtes tussen de bodemdeeltjes. Welke bacteriën kunnen daar dus níet werken?",no:"Denk aan een composthoop die veel te nat is.",
    onDone:()=>choiceStep(think,{q:"Nitrificerende bacteriën maken van ammonium nitraat. Kan dat zonder zuurstof?",opts:["ja","nee, alleen met zuurstof"],right:1,
      ok:"Goed. Maar er is ook een stap in de stikstofkringloop die juist alleen zónder zuurstof gebeurt. Welke stof maken bacteriën daar van nitraat, en waar blijft die stof?",no:"Kijk naar de uitleg van de stof: nitrificatie heeft zuurstof nodig.",onDone:unlock})});
  openAnswer(ans,{id,pts:3,checks:[
    "In een natte bodem is (bijna) <b>geen zuurstof</b>.",
    "Bacteriën maken daar van nitraat <b>stikstofgas</b>: <b>denitrificatie</b> (anaeroob).",
    "Het stikstofgas <b>verdwijnt naar de lucht</b>, dus er spoelt minder nitraat uit naar de sloot (minder eutrofiëring)."],
    model:"Bij een hoog grondwaterpeil staat de bodem bijna helemaal onder water, dus er is bijna geen zuurstof. Bacteriën gebruiken dan nitraat in plaats van zuurstof en maken er stikstofgas van: denitrificatie. Het stikstofgas gaat naar de lucht. Er blijft dus minder nitraat over dat met het regenwater naar de sloot kan spoelen.",
    valkuil:"‘Nitrificatie’ als proces: 0 punten voor de tweede stap. Nitrificatie maakt juist nitraat, en kan alleen mét zuurstof.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Stap 1: de bodem staat bijna helemaal onder water. Tussen de korrels zit geen lucht: <b>geen zuurstof</b>.",k:1},
      {cap:"Stap 2: bacteriën gebruiken het nitraat zoals jij zuurstof gebruikt. Ze maken er <b>stikstofgas</b> van, dat de lucht in gaat: <b>denitrificatie</b>.",k:2},
      {cap:"Stap 3: dat nitraat is weg uit de bodem. Er spoelt dus <b>minder nitraat</b> naar de sloot.",k:3}],
      (st,s)=>st.innerHTML=KETEN(s.k)))});
  q.append(think,ans);
},STOF_N);

const ids=[b1,b2,b3];
if(VWO){
const STOF_TK={titel:"Terugkoppeling",html:`
<p>Bij een <b>terugkoppeling</b> heeft een gevolg invloed op zijn eigen oorzaak. Bij een <b>negatieve terugkoppeling</b> remt het gevolg de oorzaak af, zodat iets stabiel blijft. Bij een <b>positieve terugkoppeling</b> versterkt het gevolg zijn eigen oorzaak: het effect wordt steeds groter.</p>
<p>In de film: warmer zeewater lost minder koolstofdioxide op. Leg zo'n terugkoppeling altijd uit als een rondje: begin bij de oorzaak en eindig weer bij dezelfde oorzaak.</p>`,
films:[F.c]};
ids.push(vraag(2,"veen en opwarming: een terugkoppeling",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Door klimaatverandering worden de zomers warmer en droger. Leg uit dat de afbraak van veenweiden daardoor een positieve terugkoppeling op de opwarming kan geven."));
  choiceStep(think,{q:"Wat doet een warme, droge zomer met het grondwater in een veenweide?",opts:["het zakt verder","het stijgt","het blijft gelijk"],right:0,
    ok:"Ja. En wat betekent dat, samen met de warmte, voor de reducenten in het veen? Kijk ook nog eens naar tabel 2.",no:"In een droge zomer verdampt veel water en valt er weinig regen.",
    onDone:()=>choiceStep(think,{q:"Wat moet er aan het eind van een positieve terugkoppeling gebeuren?",opts:["het gevolg versterkt de oorzaak: de opwarming","het gevolg remt de oorzaak af"],right:0,
      ok:"Goed. Maak het rondje: opwarming → … → opwarming.",no:"Positief betekent hier: versterkend.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Warmer en droger: het grondwater zakt verder / het veen wordt warmer, zodat reducenten het <b>sneller afbreken</b> en er <b>meer CO₂</b> vrijkomt.",
    "Meer CO₂ <b>versterkt het broeikaseffect</b> en dus de opwarming, die de afbraak weer versnelt: het effect versterkt zijn eigen oorzaak."],
    model:"In warmere, drogere zomers zakt het grondwater verder en wordt het veen warmer. Er komt meer zuurstof in het veen en de reducenten werken sneller, dus wordt er meer veen afgebroken en komt er meer CO₂ vrij. CO₂ is een broeikasgas: de aarde warmt verder op. Daardoor worden de zomers nog warmer en droger, en gaat de afbraak nog sneller. Het effect versterkt zijn eigen oorzaak.",
    valkuil:"Alleen ‘er komt meer CO₂ vrij’ is geen terugkoppeling. Het rondje moet terugkomen bij de opwarming, die de afbraak weer versnelt.",
    after:()=>waaromBtn(ans,textBox("Het rondje: <b>opwarming</b> → warmere, drogere zomers → grondwater lager, veen warmer → reducenten breken sneller af → <b>meer CO₂</b> → sterker broeikaseffect → <b>meer opwarming</b>. Het gevolg (meer CO₂) versterkt de oorzaak (opwarming): een positieve terugkoppeling."))});
  q.append(think,ans);
},STOF_TK));
}
opgave("Veenweiden","Veenweiden: het water omhoog",`
<p>In het westen van Nederland liggen veel weilanden op veen. Om er koeien te kunnen laten grazen, houden boeren het grondwater laag: vaak zo'n 60 cm onder het maaiveld. In sommige proefgebieden wordt het grondwater hoger gezet, tot 20 cm onder het maaiveld. Onderzoekers meten in beide situaties hoeveel de bodem per jaar daalt en hoeveel CO₂ er uit de bodem komt (tabel 2).</p>
${TAB2}`,ids);
}
