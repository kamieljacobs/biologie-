/* ===== Opgave 2: Ananas in de pudding (inzicht versie 1; EI-stofwisseling-A01, A02, A03, havo A04 / vwo A05) ===== */
{
const TAB1=TABEL(1,["bakje","toegevoegd","na 3 uur"],[
  ["1","niets","stevig"],["2","stukjes verse ananas","vloeibaar"],["3","stukjes ananas uit blik (bij het inblikken verhit)","stevig"],["4","stukjes verse ananas, eerst 5 minuten gekookt en afgekoeld","stevig"]],"(fictieve gegevens)");
const T2=[["niet verwarmd",8],["40",8],["50",7],["60",4],["70",1],["80",0]];
const TAB2=TABEL(2,["sap eerst verwarmd tot (°C)",...T2.map(r=>r[0])],[["vloeibaar na 1 uur bij 20 °C (mm)",...T2.map(r=>r[1])]],"(fictieve gegevens)");

const STOF_SUB={titel:"Enzym en substraat",html:`
<p>Een enzym versnelt één specifieke reactie. Het molecuul waar het enzym op inwerkt, heet het <b>substraat</b>. Het substraat past in het <b>actieve centrum</b> van het enzym; samen vormen ze even het <b>enzym-substraatcomplex</b>. Daarin verandert het substraat in <b>product</b>. Het product laat los, en het enzym is weer precies als eerst.</p>
<p>Verwar de drie niet: het enzym doet het werk, het substraat wordt veranderd, het product is wat er overblijft.</p>`,
films:[F.v]};
const STOF_WARM={titel:"Warmte en enzymen",html:`
<p>Bij een hogere temperatuur bewegen moleculen sneller en botsen ze vaker en harder: een enzymreactie gaat dan eerst sneller. Maar een enzym is een eiwit. Bij veel warmte trilt het zo hard dat de zwakke bindingen breken die de vouwing bij elkaar houden. De keten zelf blijft heel, maar de ruimtelijke vorm, en daarmee het actieve centrum, gaat verloren. Dat heet <b>denatureren</b>.</p>
<p>Een enzym leeft niet, dus het gaat ook niet dood: het verliest zijn vorm.</p>
<p>Bij een proef verander je maar één factor tegelijk; alles wat het resultaat ook kan beïnvloeden, houd je gelijk.</p>`,
films:[F.v]};

const q4=vraag(1,"het substraat in bakje 2",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Wat is in bakje 2 het substraat van bromelaïne?"));
  choiceStep(think,{q:"Wat is een substraat?",opts:["het molecuul waar een enzym op inwerkt","het enzym zelf","een stof die het enzym energie geeft"],right:0,
    ok:"Ja. Lees in de inleiding waar bromelaïne op inwerkt.",no:"Het enzym doet het werk. Hoe heet het molecuul dat door het enzym veranderd wordt?",onDone:unlock});
  mc(ans,{qid:id,pts:1,right:2,opts:["bromelaïne","de suiker uit de ananas","gelatine","water"],onChecked:()=>waaromBtn(ans,textBox(
    "Het substraat is het molecuul waar het enzym op inwerkt: de eiwitketens van <b>gelatine</b> (<b>C</b>). Bromelaïne (A) is het enzym zelf. Wie B kiest, denkt dat een enzym in fruit op suiker werkt; maar bromelaïne knipt eiwitketens."))});
  q.append(think,ans);
},STOF_SUB);

const q5=vraag(2,"bakje 3 wordt wél stevig",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Leg in twee stappen uit waardoor bakje 3 wél stevig wordt."));
  choiceStep(think,{q:"Wat is er met de ananas in bakje 3 gebeurd, en in bakje 2 niet?",opts:["hij is verhit","hij is gekoeld","hij is fijngesneden"],right:0,
    ok:"Ja: bij het inblikken. Wat doet verhitten met een eiwit zoals bromelaïne?",no:"Kijk in tabel 1 wat er tussen haakjes bij bakje 3 staat.",
    onDone:()=>choiceStep(think,{q:"Kan een enzym doodgaan?",opts:["ja, door hitte","nee, een enzym is een eiwit en leeft niet"],right:1,
      ok:"Goed: ‘dood’ is dus niet het goede woord. Wat doet hitte dan wél met een eiwit, en wat betekent dat voor de gelatine?",no:"Een enzym is een molecuul, geen cel.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Bij het verhitten (inblikken) is bromelaïne <b>gedenatureerd</b>: het actieve centrum heeft zijn vorm verloren.",
    "Daardoor <b>past gelatine niet meer</b> in het actieve centrum en worden de eiwitketens <b>niet geknipt</b>, zodat het netwerk zich kan vormen."],
    model:"Bij het inblikken is de ananas verhit. Daardoor is bromelaïne gedenatureerd: het eiwit heeft zijn ruimtelijke vorm verloren, en daarmee ook het actieve centrum. De gelatine past dan niet meer in het actieve centrum, de eiwitketens worden niet geknipt en kunnen een netwerk vormen: de pudding wordt stevig.",
    valkuil:"‘Het enzym is door het koken dood’: 0 punten voor het eerste element. Een enzym leeft niet; het verliest zijn vorm.",
    after:()=>waaromBtn(ans,textBox("Oorzaak → gevolg → gevolg: <b>verhitten</b> breekt de zwakke bindingen van de vouwing (<b>denatureren</b>) → het <b>actieve centrum</b> heeft niet meer de goede vorm, dus gelatine <b>past er niet meer in</b> → de eiwitketens van gelatine blijven heel en vormen bij afkoelen een netwerk. Bakje 4 laat hetzelfde zien: koken en daarna afkoelen helpt het enzym niet terug."))});
  q.append(think,ans);
},STOF_WARM);

/* staafjes bij tabel 2; hl = indexen die opvallen */
function STAAF(hl=[],kleur="var(--goud)"){
  const X0=80,Y0=210,bw=56,gap=22;let s=`<path d="M${X0-10},30 V${Y0} H${X0+6*(bw+gap)+4}" fill="none" stroke="var(--text2)" stroke-width="1.4"/>`;
  [0,2,4,6,8].forEach(v=>s+=`<text x="${X0-16}" y="${Y0-v*20+4}" text-anchor="end" class="lblm">${v}</text>`);
  s+=`<text x="22" y="120" text-anchor="middle" class="lblm" transform="rotate(-90 22 120)">vloeibaar (mm)</text>`;
  T2.forEach(([t,v],i)=>{const x=X0+6+i*(bw+gap),on=hl.includes(i);
    s+=`<rect x="${x}" y="${Y0-v*20}" width="${bw}" height="${Math.max(v*20,1.5)}" fill="${on?kleur:"var(--teal)"}" opacity="${hl.length&&!on?.35:1}" rx="3"/>`;
    s+=`<text x="${x+bw/2}" y="${Y0+18}" text-anchor="middle" class="lblm">${t==="niet verwarmd"?"niet":t+" °C"}</text>`;});
  s+=`<text x="${X0+3*(bw+gap)}" y="${Y0+40}" text-anchor="middle" class="lblm">sap eerst verwarmd tot … en daarna afgekoeld tot 20 °C</text>`;
  return FIG("0 0 560 260",s,"Staafdiagram van tabel 2: hoe diep de gelatine vloeibaar werd",460,560);}
const q6=vraag(2,"verwarmen en afkoelen",(q,id)=>{
  pre(q,"<p>Lisa onderzoekt bij welke temperatuur bromelaïne kapotgaat. Ze verwarmt ananassap 10 minuten tot een bepaalde temperatuur en laat het daarna afkoelen tot kamertemperatuur (20 °C). Dan doet ze het sap op stevige gelatine en meet ze na een uur bij 20 °C hoe diep de gelatine vloeibaar is geworden (tabel 2).</p>"+TAB2);
  const {think,ans,unlock}=start(q,"<b>a</b> Gelatine smelt boven ongeveer 34 °C. Leg uit waarom Lisa het sap eerst laat afkoelen en de gelatine steeds bij 20 °C houdt.<br><b>b</b> Leg met tabel 2 uit dat het kapotgaan van bromelaïne niet ongedaan wordt gemaakt door af te koelen.");
  choiceStep(think,{q:"Stel dat Lisa sap van 60 °C meteen op de gelatine doet, en dat er in dat sap helemaal geen enzym zit. Wat gebeurt er dan met de gelatine?",opts:["die blijft stevig","die smelt"],right:1,
    ok:"Ja. Bij een eerlijke proef verschilt er maar één ding tussen de opstellingen. Welk ding wil Lisa hier laten verschillen?",no:"Lees de vraag nog eens: boven welke temperatuur smelt gelatine?",
    onDone:()=>numStep(think,{uid:"q"+id+"n",q:"Kijk in tabel 2. Hoeveel mm vloeibaar werd de gelatine met sap dat eerst tot 80 °C was verwarmd?",right:0,
      ok:"Goed: 0 mm, en dat sap werkte daarna bij 20 °C, een temperatuur waarbij onverwarmd sap wél werkt. Wat zegt dat over het enzym na het afkoelen?",no:"Lees de laatste kolom van tabel 2.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "<b>a</b> Anders smelt de gelatine ook door de warmte, en meet je niet alleen de werking van het enzym (zo verschilt alleen de voorbehandeling van het sap).",
    "<b>b</b> Het sap van 70 en 80 °C maakt de gelatine (bijna) niet meer vloeibaar, ook al werkt het daarna bij 20 °C: het verhitte bromelaïne is <b>gedenatureerd</b> en vouwt bij afkoelen niet terug."],
    model:"a: Gelatine smelt boven ongeveer 34 °C. Doet Lisa warm sap op de gelatine, dan smelt die ook door de warmte, en meet ze niet alleen wat het enzym doet. Door steeds bij 20 °C te meten, verschilt alleen hoe het sap vooraf verwarmd is. b: Sap dat tot 70 of 80 °C verwarmd was, maakt bij 20 °C de gelatine (bijna) niet meer vloeibaar, terwijl onverwarmd sap bij 20 °C wel werkt. Het bromelaïne is dus gedenatureerd en vouwt bij afkoelen niet terug.",
    valkuil:"Bij b: ‘bij 80 °C werkt het enzym niet’ zonder het afkoelen: 0 punten. De meting gebeurde steeds bij 20 °C; het gaat erom dat het enzym ná het afkoelen nog steeds niet werkt.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Alle staafjes zijn gemeten bij 20 °C. Alleen de voorbehandeling van het sap verschilt.",hl:[]},
      {cap:"Niet verwarmd, 40 en 50 °C: het sap maakt de gelatine nog (bijna) even diep vloeibaar. Het enzym werkt.",hl:[0,1,2],k:"var(--groen)"},
      {cap:"70 en 80 °C: ook na afkoelen tot 20 °C werkt het sap (bijna) niet meer. Het bromelaïne is gedenatureerd en vouwt niet terug.",hl:[4,5],k:"var(--koraal)"}],
      (st,s)=>st.innerHTML=STAAF(s.hl,s.k)))});
  q.append(think,ans);
},STOF_WARM);

const ids=[q4,q5,q6];
if(!VWO){
const STOF_SPEC={titel:"Enzymen zijn specifiek",html:`
<p>Elk enzym heeft zijn eigen substraat, of een kleine groep stoffen die erop lijkt. Je kunt het zien als een sleutel in een slot: het <b>sleutel-slotmodel</b>. Andere moleculen botsen ook tegen het enzym, maar kaatsen weer weg.</p>
<p>Om te voorspellen of een enzym op een stof werkt, vraag je je dus af: wat voor soort stof is het, en is dat het substraat van dit enzym?</p>`,
films:[F.v]};
ids.push(vraag(2,"agar in plaats van gelatine",(q,id)=>{
  pre(q,"<p>Pudding met agar in plaats van gelatine wordt wél stevig met verse ananas. Agar is een koolhydraat uit zeewier.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit waardoor bromelaïne de agarpudding niet vloeibaar maakt."));
  choiceStep(think,{q:"Wat voor soort stof is agar?",opts:["een eiwit","een koolhydraat"],right:1,
    ok:"Ja. En op welk soort stof werkt bromelaïne volgens de inleiding?",no:"Lees de zin onder de vraag nog eens.",
    onDone:()=>choiceStep(think,{q:"Op welke moleculen werkt een enzym?",opts:["op elk molecuul dat het tegenkomt","alleen op zijn eigen substraat, dat in het actieve centrum past"],right:1,
      ok:"Goed. Combineer die twee dingen in je uitleg.",no:"Katalase zet waterstofperoxide om, en bijna niets anders. Hoe heet die eigenschap?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Bromelaïne is <b>specifiek</b>: het werkt alleen op eiwitketens (zijn eigen substraat).",
    "Agar is <b>geen eiwit</b> en past niet in het actieve centrum (sleutel-slot), dus de ketens van agar worden niet geknipt."],
    model:"Enzymen zijn specifiek: bromelaïne werkt alleen op eiwitketens. Agar is een koolhydraat, geen eiwit. Agar past daarom niet in het actieve centrum van bromelaïne, en de ketens van agar worden niet geknipt. Het netwerk van agar blijft heel: de pudding wordt stevig.",
    valkuil:"‘Agar is sterker dan gelatine’ of ‘agar kan niet smelten’ legt niets uit over het enzym: 0 punten.",
    after:()=>waaromBtn(ans,textBox("Een enzym werkt alleen op het molecuul dat in zijn actieve centrum past, zoals een sleutel in een slot. Bromelaïne knipt <b>eiwitketens</b>. Agar is een <b>koolhydraat</b>: dat past niet, botst en kaatst weg. Daarom blijft de agarpudding stevig, ook met verse ananas."))});
  q.append(think,ans);
},STOF_SPEC));
}else{
const STOF_VMAX={titel:"Verzadiging en V-max",html:`
<p>Bij een vaste hoeveelheid enzym en steeds meer substraat stijgt de snelheid eerst en buigt de lijn dan af: bijna elk actief centrum is vrijwel steeds bezet (<b>verzadiging</b>). De maximale snelheid heet <b>V-max</b>.</p>
<p>Kijk ook bij hoeveel substraat je de helft van V-max haalt. Hoe minder substraat daarvoor nodig is, hoe steviger het enzym zijn substraat meestal bindt.</p>`,
films:[F.v]};
ids.push(vraag(2,"verdund sap en V-max",(q,id)=>{
  pre(q,"<p>Lisa verdunt het ananassap met evenveel water. Ze meet de snelheid waarmee het sap gelatine knipt, bij steeds meer gelatine, en vergelijkt met onverdund sap.</p>");
  const {think,ans,unlock}=start(q,B("Voorspel en verklaar hoe V-max verandert, en of de helft van V-max bij een andere gelatineconcentratie wordt bereikt."));
  choiceStep(think,{q:"Wat verandert er als Lisa het sap verdunt met evenveel water?",opts:["er zijn per ml half zoveel enzymmoleculen","elk enzymmolecuul werkt half zo goed","het enzym denatureert"],right:0,
    ok:"Ja. Waar hangt V-max van af, als alle actieve centra bezet zijn?",no:"Water verandert niets aan de vorm van het enzym. Wat verandert er dan wel?",
    onDone:()=>choiceStep(think,{q:"Bindt één bromelaïnemolecuul de gelatine na het verdunnen even stevig als eerst?",opts:["ja, het molecuul is niet veranderd","nee, minder stevig","nee, steviger"],right:0,
      ok:"Goed. Gebruik dat bij het tweede deel van je voorspelling.",no:"Verdunnen verandert het aantal moleculen, niet het molecuul zelf.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "<b>V-max wordt (ongeveer) de helft</b>: er zijn half zoveel enzymmoleculen, en bij verzadiging is de snelheid evenredig met de hoeveelheid enzym.",
    "De helft van V-max wordt bij <b>dezelfde gelatineconcentratie</b> bereikt, want elk enzymmolecuul bindt het substraat even stevig als eerst."],
    model:"V-max wordt ongeveer de helft. Bij verzadiging is elk actief centrum steeds bezet, en dan hangt de snelheid alleen af van hoeveel enzymmoleculen er zijn; dat is nu de helft. De helft van V-max haalt Lisa bij dezelfde gelatineconcentratie als eerst, want elk bromelaïnemolecuul bindt de gelatine nog even stevig.",
    valkuil:"‘Het verdunde enzym is zwakker en bindt minder goed, dus de helft van V-max komt later’: verdunnen verandert het aantal moleculen, niet hoe stevig één molecuul bindt.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Onverdund sap: de lijn buigt af naar V-max. De stip geeft aan bij hoeveel gelatine de helft van V-max wordt gehaald.",d:false},
      {cap:"Verdund sap: half zoveel enzymmoleculen, dus bij verzadiging half zoveel omzettingen per seconde: V-max is de helft.",d:true},
      {cap:"De helft van díe V-max wordt bij dezelfde hoeveelheid gelatine bereikt: elk enzymmolecuul bindt even stevig als eerst.",d:true,h:true}],
      (st,s)=>{const L=[{vmax:2,km:1.5,kleur:"var(--teal)",naam:"onverdund",half:!s.d||s.h,vmaxLijn:!s.d}];
        if(s.d)L.push({vmax:1,km:1.5,kleur:"var(--goud)",naam:"verdund",half:!!s.h,vmaxLijn:true});st.innerHTML=KROMME({lijnen:L});}))});
  q.append(think,ans);
},STOF_VMAX));
}
opgave("Ananas","Ananas in de pudding",`
<p>Lisa maakt een pudding met gelatine. Gelatine is een eiwit. Als warme gelatine afkoelt, vormen de lange eiwitketens samen een netwerk, en wordt de pudding stevig.</p>
<p>Op een verpakking leest ze: ‘Gebruik geen verse ananas.’ Verse ananas bevat bromelaïne, een enzym dat eiwitketens in stukken knipt.</p>
<p>Lisa doet een proef. Ze maakt vier bakjes met gelatine en zet ze drie uur in de koelkast (tabel 1).</p>${TAB1}`,ids);
}
