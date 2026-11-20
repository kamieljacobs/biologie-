/* ===== Opgave 1: Kamsalamanders in een nieuwe poel (EI-ecologie-A01–A04, vwo + A05) ===== */
{
const JAAR=[2019,2020,2021,2022,2023,2024,2025],AANTAL=[0,6,15,38,92,180,186];
const TAB1=TABEL(1,["jaar","volwassen kamsalamanders in de poel"],JAAR.map((j,i)=>[j,AANTAL[i]]),true);

/* grafiek van tabel 1 (voor 'laat zien waarom' bij vraag 4) */
function GROEI({tot=7,hl=null,s=false,dk=false}={}){
  const xs=i=>66+i*55,ys=v=>250-v*1.05;let g="";
  [0,50,100,150,200].forEach(v=>g+=`<path d="M64,${ys(v)} H410" stroke="var(--line)" stroke-width="1"/>`+T(58,ys(v)+4,v,"lblm","end"));
  g+=`<path d="M64,20 V250 H410" fill="none" stroke="var(--text2)" stroke-width="1.4"/>`;
  JAAR.forEach((j,i)=>g+=T(xs(i),270,j));
  g+=T(236,292,"jaar");g+=T(16,140,"aantal","lblm","middle",'transform="rotate(-90 16 140)"');
  if(hl)g+=`<rect x="${xs(hl[0])-18}" y="22" width="${xs(hl[1])-xs(hl[0])+36}" height="228" fill="${hl[2]}" opacity=".18"/>`;
  if(dk)g+=`<path d="M64,${ys(190)} H410" stroke="var(--koraal)" stroke-width="2" stroke-dasharray="7 5"/>`+T(406,ys(190)-8,"draagkracht","lbl","end");
  if(s){/* vloeiende lijn (Catmull-Rom) door de meetpunten, zodat de kromme in 2024 bij 180 loopt */
    const P=AANTAL.map((v,i)=>[xs(i),ys(v)]);let d=`M${P[0][0]},${P[0][1]}`;
    for(let i=0;i<P.length-1;i++){const p0=P[Math.max(0,i-1)],p1=P[i],p2=P[i+1],p3=P[Math.min(P.length-1,i+2)];
      const c1=[p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6],c2=[p2[0]-(p3[0]-p1[0])/6,Math.max(p2[1]-(p3[1]-p1[1])/6,ys(190))];
      d+=` C${c1[0].toFixed(1)},${Math.max(c1[1],ys(190)).toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0]},${p2[1]}`;}
    g+=`<path d="${d}" fill="none" stroke="var(--goud)" stroke-width="2.4"/>`;}
  for(let i=0;i<tot;i++)g+=`<circle cx="${xs(i)}" cy="${ys(AANTAL[i])}" r="5" fill="var(--text)"/>`;
  return SVG("0 0 420 300",g,"Aantal volwassen kamsalamanders in de nieuwe poel, 2019 tot 2025");}

const STOF_TEL={titel:"Een populatie tellen",html:`
<p>Een <b>populatie</b> is een groep dieren van één soort, in één gebied, die zich onderling voortplanten. Alle dieren tellen lukt bijna nooit. Daarom schat je de populatiegrootte.</p>
<p>Bij <b>vangen, merken en terugvangen</b> herken je in een eerste ronde een aantal dieren (met een merkje, of aan hun DNA). In een tweede ronde kijk je welk deel van de dieren je al kende. Je neemt aan dat in de hele populatie hetzelfde deel bekend is. In de film: ronde 1 veertig bevers, ronde 2 dertig bevers waarvan twaalf bekend (twee op de vijf). Veertig is dan twee vijfde van de populatie: ongeveer honderd bevers.</p>
<p>Dat klopt alleen als er tussen de rondes geen dieren bijkomen of verdwijnen, en als elk dier evenveel kans heeft om gevonden te worden.</p>`,
films:[F.pop]};
const q1=vraag(2,"vlekkenpatronen tellen",(q,id)=>{
  pre(q,"<p>In 2025 schatten de vrijwilligers het aantal ook op een andere manier. Elke kamsalamander heeft een eigen vlekkenpatroon op zijn buik. In de eerste week fotograferen ze 48 verschillende dieren. Een week later fotograferen ze 36 dieren; 9 daarvan hadden ze al eerder gezien.</p>");
  const {think,ans,unlock}=start(q,B("Bereken met deze gegevens hoeveel kamsalamanders er in de poel zijn."));
  choiceStep(think,{q:"Kijk alleen naar de tweede week. Welk deel van die dieren hadden ze al eerder gezien?",opts:["9 van de 36","9 van de 48","36 van de 48"],right:0,
    ok:"Ja. Schrijf dat als een eenvoudige breuk. Wat zegt dat deel over de hele populatie?",no:"In de tweede week fotograferen ze 36 dieren. Hoeveel daarvan kenden ze al?",
    onDone:()=>choiceStep(think,{q:"Je neemt aan dat in de hele poel hetzelfde deel al bekend is. Welke dieren zijn in de hele poel ‘bekend’?",opts:["de 48 dieren uit de eerste week","de 9 dieren die twee keer op de foto staan","alle 75 dieren die ze samen zagen"],right:0,
      ok:"Goed. Die bekende dieren vormen dus hetzelfde deel van de populatie als in de tweede week. Reken nu de hele populatie uit.",no:"‘Bekend’ zijn alle dieren die ze in de eerste week gefotografeerd hebben.",onDone:unlock})});
  rekenOpen(ans,{id,pts:2,veld:["aantal kamsalamanders","",v=>v===192,"192 kamsalamanders"],
    checks:["Berekening: <b>9 van de 36 is een kwart</b>, dus de 48 bekende dieren zijn ook een kwart van de populatie (of 48 × 36 / 9)."],
    model:"In de tweede week was 9 van de 36 dieren al bekend: een kwart. Dan is waarschijnlijk ook een kwart van alle kamsalamanders bekend. De 48 dieren uit de eerste week zijn dus een kwart van de populatie: 48 × 4 = 192 kamsalamanders.",
    valkuil:"48 + 36 − 9 = 75 telt alleen de dieren die je gezien hebt, niet de hele populatie. Alleen 192 zonder berekening: alleen het punt voor de uitkomst.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Tweede week: 36 dieren op de foto. 9 daarvan (goud) kenden ze al: dat is 1 op de 4.",k:1},
      {cap:"Neem aan dat in de hele poel ook 1 op de 4 dieren bekend is. De bekende dieren zijn de 48 uit de eerste week.",k:2},
      {cap:"48 is dus een kwart van de populatie. Vier keer 48 = <b>192</b> kamsalamanders.",k:3}],
      (st,s)=>{let g="";const R=(x,y,w,f,t)=>`<rect x="${x}" y="${y}" width="${w}" height="34" rx="4" fill="${f}" stroke="var(--text2)" stroke-width="1"/>`+(t?T(x+w/2,y+22,t,"lbl"):"");
        g+=T(10,30,"tweede week","lbl","start");g+=R(10,40,300,"none","")+R(10,40,75,"var(--goud)","9 bekend")+T(197,62,"27 nieuw");
        if(s.k>=2){g+=T(10,120,"hele poel","lbl","start");g+=R(10,130,75,"var(--goud)","48");}
        if(s.k>=3){[1,2,3].forEach(k=>g+=R(10+k*75,130,75,"none","48"));g+=T(160,192,"4 × 48 = 192","lbl");}
        st.innerHTML=SVG("0 0 320 205",g,"Vangen en terugvangen met de vlekkenpatronen",420);}))});
  q.append(think,ans);
},STOF_TEL);

const STOF_POP={titel:"Erbij en eraf",html:`
<p>De grootte van een populatie verandert door vier processen. Twee laten de populatie groeien: <b>geboorte</b> en dieren die van buiten het gebied <b>binnenkomen</b>. Twee laten haar krimpen: <b>sterfte</b> en dieren die het gebied <b>verlaten</b>. De groei is alles wat erbij komt, min alles wat eraf gaat.</p>
<p>Let bij zo'n vraag goed op <b>vanuit welke populatie</b> je kijkt. Hetzelfde dier kan voor de ene populatie erbij komen en voor de andere eraf gaan.</p>
<p>Waar een soort helemaal verdwenen is, kunnen mensen hem terugzetten: <b>herintroductie</b>, zoals de bevers in de Biesbosch.</p>`,
films:[F.pop]};
const q2=vraag(1,"trekken naar de nieuwe poel",(q,id)=>{
  q.append(el("p",{class:"qtext"},"Kamsalamanders uit de oude poel trekken naar de nieuwe poel. <b>Welk begrip hoort bij deze dieren, gezien vanuit de populatie in de nieuwe poel?</b>"));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Kies je antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  choiceStep(think,{q:"Vanuit welke populatie moet je kijken?",opts:["de populatie in de oude poel","de populatie in de nieuwe poel"],right:1,
    ok:"Ja, dat staat in de vraag.",no:"Lees het laatste stukje van de vraag nog eens.",
    onDone:()=>choiceStep(think,{q:"Komen deze dieren voor die populatie erbij of gaan ze eraf?",opts:["ze komen erbij","ze gaan eraf"],right:0,
      ok:"Goed. Ze zijn niet in de poel geboren: ze komen van ergens anders. Welk begrip hoort daarbij?",no:"Ze trekken náár de nieuwe poel toe.",onDone:unlock})});
  mc(ans,{qid:id,pts:1,right:3,opts:["emigratie","geboorte","herintroductie","immigratie"],onChecked:()=>waaromBtn(ans,textBox(
    "Voor de nieuwe poel komen deze dieren van buiten het gebied binnen: <b>immigratie (D)</b>. Voor de oude poel is het juist emigratie (A): dat is het standpunt van de oude poel. Geboorte (B) is het niet, want ze zijn elders geboren. Herintroductie (C) is het terugzetten door mensen van een soort die verdwenen was."))});
  q.append(think,ans);
},STOF_POP);

const STOF_VW={titel:"Eten en gegeten worden",html:`
<p>Bij <b>predatie</b> eet een dier (de rover) een ander dier (de prooi). Twee soorten die hetzelfde voedsel gebruiken, zijn elkaars <b>concurrenten</b>.</p>
<p>Veel dieren leven in hun jonge stadium heel anders dan als volwassen dier: ze zijn kleiner, eten iets anders en leven soms op een andere plek. Een populatie groeit alleen als er genoeg jonge dieren overleven tot ze volwassen zijn.</p>`,
films:[F.eet,F.pop]};
const q3=vraag(2,"goudvissen in de oude poel",(q,id)=>{
  pre(q,"<p>In 2023 zet iemand goudvissen uit in de oude poel. Goudvissen eten geen volwassen kamsalamanders.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit hoe de goudvissen toch tot minder volwassen kamsalamanders in de oude poel kunnen leiden. Gebruik de informatie bij deze opgave."));
  chipsStep(think,{q:"Lees de inleiding. Welke stadia van de kamsalamander leven <b>in het water</b> van de poel? Kies alles wat klopt.",items:[["eitjes",1],["larven",1],["volwassen dieren buiten de voortplantingstijd",0]],
    ok:"Ja: eitjes en larven zitten in de poel. Volwassen kamsalamanders leven het grootste deel van het jaar op het land. Welke stadia kan een vis dus raken?",no:"De volwassen dieren leven op het land en komen alleen naar de poel om zich voort te planten.",
    onDone:()=>choiceStep(think,{q:"Waar zijn volwassen kamsalamanders vroeger zelf uit ontstaan?",opts:["uit larven die in de poel zijn opgegroeid","uit dieren die van een andere poel kwamen"],right:0,
      ok:"Goed. Maak nu de redenering af: wat doet de goudvis, en wat betekent dat een paar jaar later?",no:"Lees de inleiding nog eens: waar groeien de larven op?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Goudvissen eten <b>eitjes en/of larven</b> van de kamsalamander (predatie).",
    "Daardoor groeien er <b>minder larven op tot volwassen dieren</b> (minder aanwas), zodat het aantal volwassen dieren afneemt. Ook goed: goudvissen eten ook watervlooien, het voedsel van de larven (concurrentie), zodat minder larven overleven."],
    model:"Goudvissen eten de eitjes en larven van de kamsalamander in de poel. Daardoor overleven er minder larven tot ze volwassen zijn. Er komen dus minder nieuwe volwassen dieren bij, terwijl de oude dieren wel doodgaan. Zo neemt het aantal volwassen kamsalamanders af.",
    valkuil:"‘De goudvissen eten de kamsalamanders op’ is fout: dat sluit de vraag uit. Het gaat om een tussenstap: de eitjes en larven, of hun voedsel.",
    after:()=>waaromBtn(ans,textBox("De vraag zegt dat goudvissen geen <b>volwassen</b> kamsalamanders eten. In de inleiding staat dat het vrouwtje haar <b>eitjes</b> in de poel legt en dat de <b>larven</b> daar opgroeien en watervlooien eten. Juist daarom leven kamsalamanders in poelen zonder vis. Eet de goudvis eitjes en larven (of hun watervlooien), dan worden er minder larven volwassen. De volwassen dieren gaan na een tijd dood, en er komen er te weinig bij."))});
  q.append(think,ans);
},STOF_VW);

const STOF_GROEI={titel:"Hoe een populatie groeit",html:`
<p>Groeit een populatie elk jaar met ongeveer hetzelfde <b>percentage</b>, dan komen er steeds meer dieren per jaar bij: hoe meer dieren, hoe meer jongen. De lijn in een grafiek loopt steeds steiler omhoog, in de vorm van een J. Dat heet <b>exponentiële groei</b> (J-curve).</p>
<p>Niet elke populatie blijft zo groeien. Vlakt de groei na een tijd af, dan heeft de lijn een andere vorm, en die groeivorm heeft een eigen naam.</p>
<p>Kijk bij een tabel dus naar het begin én naar het eind: groeit het aantal steeds sneller, of wordt de groei kleiner? En vraag je af wat een populatie kan afremmen.</p>`,
films:[F.pop]};
const q4=vraag(2,"de groeivorm in de nieuwe poel",(q,id)=>{
  const {think,ans,unlock}=start(q,"Gebruik tabel 1. <b>Geef de naam van de groeivorm van de populatie in de nieuwe poel van 2019 tot 2025. Leg uit waardoor het aantal na 2024 bijna niet meer stijgt.</b>");
  choiceStep(think,{q:"Kijk naar 2021, 2022 en 2023 in tabel 1. Hoe verandert het aantal per jaar?",opts:["het wordt elk jaar ruim twee keer zo groot","er komen elk jaar ongeveer evenveel bij","het daalt"],right:0,
    ok:"Ja: 15, 38, 92. Snel en steeds sneller. En van 2024 naar 2025?",no:"Deel elk getal door het getal van het jaar ervoor.",
    onDone:()=>choiceStep(think,{q:"Van 2024 naar 2025 gaat het aantal van 180 naar 186. Welke vorm krijgt de lijn van 2019 tot 2025 dus?",opts:["steeds steiler omhoog","eerst steeds steiler, daarna bijna vlak"],right:1,
      ok:"Goed. Welke groeivorm hoort bij die vorm, en waardoor kan een poel niet eindeloos meer kamsalamanders hebben?",no:"Let op het laatste stuk: 180 → 186 is bijna geen groei meer.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "<b>Logistische groei</b> (S-curve).",
    "De <b>draagkracht</b> van de poel is (bijna) bereikt: dichtheidsafhankelijke factoren, zoals voedsel (watervlooien) voor de larven of plek, remmen de groei (meer sterfte / minder aanwas)."],
    model:"Het is logistische groei: eerst groeit het aantal steeds sneller, daarna bijna niet meer (een S-curve). Na 2024 is de draagkracht van de poel bereikt. Er zijn dan zoveel dieren dat er te weinig voedsel (watervlooien) voor de larven en te weinig plek is. Er sterven meer dieren en er komen er minder bij.",
    valkuil:"‘Exponentiële groei’: 0 punten voor het eerste punt. Bij exponentiële groei wordt de lijn steeds steiler en vlakt hij niet af.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"De punten uit tabel 1.",o:{}},
      {cap:"2020 tot 2023: elk jaar meer dan twee keer zoveel. Dat lijkt in het begin op exponentiële groei.",o:{hl:[1,4,"var(--groen)"]}},
      {cap:"2024 en 2025: bijna geen groei meer. De lijn vlakt af.",o:{hl:[5,6,"var(--koraal)"]}},
      {cap:"Samen een S: <b>logistische groei</b>. Het aantal blijft hangen rond de <b>draagkracht</b> van de poel. Daar remmen voedsel en plek de groei.",o:{s:true,dk:true}}],
      (st,s)=>st.innerHTML=GROEI(s.o)))});
  q.append(think,ans);
},STOF_GROEI);

const ids=[q1,q2,q3,q4];
if(VWO){
const STOF_LO={titel:"Leeftijdsopbouw",html:`
<p>De <b>leeftijdsopbouw</b> van een populatie laat zien hoeveel dieren er in elke leeftijdsklasse zitten. Je tekent die vaak als een piramide van liggende balken: onderaan de jongste dieren, bovenaan de oudste. De breedte van een balk is het aantal dieren in die klasse.</p>
<p>Uit de vorm lees je af hoeveel jonge dieren erbij komen, vergeleken met de oudere dieren.</p>`,
films:[F.pop]};
const PIR=(breed)=>{const ws=breed?[140,104,72,44,20]:[76,74,68,58,42];let g="";
  ws.forEach((w,i)=>{const y=150-i*28;g+=`<rect x="${85-w/2}" y="${y}" width="${w}" height="22" rx="3" fill="var(--teal)" opacity=".75"/>`;});
  return g+T(85,190,breed?"2021":"2025","lbl");};
ids.push(vraag(2,"leeftijdsopbouw in 2021 en 2025",(q,id)=>{
  pre(q,"<p>Onderzoekers bepalen in 2021 en in 2025 de leeftijd van de kamsalamanders in de nieuwe poel.</p>");
  const {think,ans,unlock}=start(q,B("Beredeneer met tabel 1 welke leeftijdsopbouw je in 2021 verwacht en welke in 2025. Leg ook uit waardoor die verschillen."));
  choiceStep(think,{q:"In welke fase zit de populatie in 2021 volgens tabel 1?",opts:["ze groeit snel","ze zit rond de draagkracht","ze krimpt"],right:0,
    ok:"Ja. Komen er dan veel of weinig jonge dieren bij, vergeleken met het aantal oude dieren?",no:"Vergelijk 2021 met 2020 en 2022.",
    onDone:()=>choiceStep(think,{q:"In 2025 groeit het aantal bijna niet meer. Wat weet je dan over de jonge dieren die erbij komen en de dieren die doodgaan?",opts:["er komen er veel meer bij dan er doodgaan","er komen er ongeveer evenveel bij als er doodgaan"],right:1,
      ok:"Goed. Vertaal dat nu naar de vorm van de leeftijdsopbouw in beide jaren.",no:"Als het aantal bijna gelijk blijft, moeten erbij en eraf ongeveer even groot zijn.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "2021: een <b>brede basis</b> (veel jonge dieren, piramidevorm), want de populatie groeit snel: veel aanwas, nog weinig oude dieren.",
    "2025: een <b>smallere basis</b> (meer een zuil), want de populatie zit rond de draagkracht: er komen ongeveer evenveel jonge dieren bij als er (oude) dieren sterven."],
    model:"In 2021 groeit de populatie snel. Er komen veel jonge dieren bij en er zijn nog weinig oude dieren, want de poel is pas twee jaar oud: een piramide met een brede basis. In 2025 zit de populatie rond de draagkracht. Er komen ongeveer evenveel jonge dieren bij als er doodgaan, dus de basis is smaller en de leeftijdsopbouw lijkt meer op een zuil.",
    valkuil:"Alleen ‘in 2025 zijn de dieren ouder’ is geen uitleg. Koppel de vorm aan de groei: snelle groei ↔ brede basis, rond de draagkracht ↔ smallere basis.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"2021: de populatie groeit snel. Veel jonge dieren onderaan, nog weinig oude dieren bovenaan: een brede basis.",k:1},
      {cap:"2025: rond de draagkracht. Er komen ongeveer evenveel jongen bij als er dieren doodgaan: een smallere basis, bijna een zuil.",k:2}],
      (st,s)=>{let g=`<g transform="translate(34,0)">${PIR(true)}</g>`;if(s.k>=2)g+=`<g transform="translate(200,0)">${PIR(false)}</g>`;
        g+=T(2,30,"oud","lblm","start")+T(2,165,"jong","lblm","start")+T(368,195,"schets","lblm","end");
        st.innerHTML=SVG("0 0 370 200",g,"Leeftijdsopbouw van de kamsalamanders in 2021 en 2025 (schets)",440);}))});
  q.append(think,ans);
},STOF_LO));
}

opgave("Kamsalamanders","Kamsalamanders in een nieuwe poel",`
<p>De kamsalamander is een zeldzame salamander. Hij leeft op het land, maar plant zich voort in poelen zonder vis: daar legt het vrouwtje haar eitjes en groeien de larven op. Larven eten kleine waterdiertjes zoals watervlooien.</p>
<p>In 2019 graaft een natuurorganisatie een nieuwe poel, 300 meter van een oude poel waar al kamsalamanders leven. Elk voorjaar tellen vrijwilligers de volwassen kamsalamanders die naar de nieuwe poel komen (tabel 1).</p>
${TAB1}`,ids);
}
