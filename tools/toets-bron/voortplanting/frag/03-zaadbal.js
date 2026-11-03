/* ===== Opgave 3: havo 'Een knip in de zaadleider' (nieuw) · vwo 'Geen GnRH: het syndroom van Kallmann' (eigen vragen C1, C2, C4, C5) ===== */
{
/* route van een zaadcel als schema; knip = toon de knip in de zaadleider; hl = organen die oplichten */
function ROUTE({knip=false,hl=[],stip=false}={}){
  const O=[["zaadbal",60,150],["bijbal",170,150],["zaadleider",290,150],["zaadblaasjes",410,70],["prostaat",410,150],["urinebuis",530,150]];
  let s="";
  const pijl=(x1,y1,x2,y2)=>`<path d="M${x1},${y1} L${x2},${y2}" stroke="var(--text2)" stroke-width="2" marker-end="url(#vpPijl)"/>`;
  s+=`<defs><marker id="vpPijl" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--text2)"/></marker></defs>`;
  s+=pijl(106,150,122,150)+pijl(216,150,242,150)+pijl(336,150,362,150)+pijl(410,92,410,126)+pijl(456,150,482,150);
  O.forEach(([n,x,y])=>{const on=hl.includes(n);
    s+=`<rect x="${x-46}" y="${y-22}" width="92" height="44" rx="12" fill="${on?"var(--goud-soft)":"var(--surface)"}" stroke="${on?"var(--goud)":"var(--line2)"}" stroke-width="${on?2.4:1.4}"/><text x="${x}" y="${y+5}" text-anchor="middle" class="lbl">${n}</text>`;});
  if(knip)s+=`<path d="M236,124 L228,176 M248,124 L240,176" stroke="var(--koraal)" stroke-width="4" stroke-linecap="round"/><text x="238" y="196" text-anchor="middle" class="lbl" style="fill:var(--koraal)">knip</text>`;
  if(stip)[300,312,324].forEach(x=>s+=`<circle cx="${x}" cy="164" r="3.5" fill="var(--teal)"/>`);
  s+=`<text x="60" y="210" text-anchor="middle" class="lblm">maakt zaadcellen</text><text x="410" y="30" text-anchor="middle" class="lblm">vocht met suiker</text><text x="410" y="200" text-anchor="middle" class="lblm">vocht</text>`;
  return `<div style="max-width:620px;margin:0 auto;width:100%">`+svgWrap("0 0 600 220",s,"Route van een zaadcel")+`</div>`;}

if(!VWO){
const STOF_ROUTE={titel:"De weg van een zaadcel",html:`
<p>Zaadcellen ontstaan door meiose in de buisjes van de <b>zaadballen</b>, in de balzak. Ze rijpen ongeveer twee weken in de <b>bijbal</b> en worden daar bewaard.</p>
<p>Bij een zaadlozing gaan ze door de <b>zaadleider</b>: die loopt vanaf de balzak omhoog, de buik in, naar de achterkant van de blaas. Daar komen de <b>zaadblaasjes</b> erbij; samen gaan ze door de <b>prostaat</b> en komen uit in de <b>urinebuis</b>.</p>
<p>Sperma is meer dan zaadcellen: het meeste vocht komt uit de zaadblaasjes (ruim de helft) en de prostaat (een kwart tot een derde). Zaadcellen zijn maar een paar procent.</p>`,
anim:b=>EXSTOF.stappen(b,[{cap:"Zaadcellen ontstaan in de zaadbal en rijpen in de bijbal."},{cap:"Bij een zaadlozing: door de zaadleider omhoog, achter de blaas langs."},{cap:"Vocht van de zaadblaasjes en de prostaat komt erbij; via de urinebuis naar buiten."}],
  (st,s,i)=>st.innerHTML=ROUTE({hl:[["zaadbal","bijbal"],["zaadleider"],["zaadblaasjes","prostaat","urinebuis"]][i]})),
films:[F.org,F.anti]};
const STOF_HORM={titel:"Het startsein en testosteron",html:`
<p>De <b>hypothalamus</b>, een deel van de hersenen, geeft stoten <b>GnRH</b> af. Daarop maakt de <b>hypofyse</b> meer FSH en LH. Die hormonen gaan met het bloed door het hele lichaam, maar alleen de zaadballen (of eierstokken) hebben er receptoren voor.</p>
<p>De zaadballen maken dan <b>testosteron</b> en zaadcellen. Testosteron gaat met het <b>bloed</b> naar het hele lichaam en zorgt in de puberteit voor de secundaire geslachtskenmerken: baardgroei, bredere schouders, sterkere spieren, een lagere stem.</p>`,
films:[F.org]};

const h1=vraag(2,"het startsein voor testosteron",(q,id)=>{
  pre(q,"<p>Bas vraagt zich af of hij na de sterilisatie nog wel testosteron maakt. De uroloog legt eerst uit hoe het maken van testosteron geregeld wordt.</p>");
  q.append(el("p",{class:"qtext"},B("Geef bij elke stap aan welk orgaan dit doet.")));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  seqStep(think,{q:"Zet de stappen in de goede volgorde. Tik ze aan van eerst naar laatst.",items:["stoten GnRH","FSH en LH in het bloed","testosteron in het bloed"],shown:[2,0,1],
    ok:"Goed: hersenen → klier onder de hersenen → zaadbal. Welk orgaan hoort bij elke stap?",onDone:unlock});
  selectAnswer(ans,{id,uid:"q"+id,rows:[["geeft stoten GnRH af",["hypothalamus","hypofyse","zaadbal","bijbal"],0],["maakt FSH en LH",["hypothalamus","hypofyse","zaadbal","bijbal"],1],["maakt testosteron",["hypothalamus","hypofyse","zaadbal","bijbal"],2]],
    score:n=>n===3?2:n===2?1:0,
    after:()=>waaromBtn(ans,textBox("De <b>hypothalamus</b> geeft het startsein met GnRH, de <b>hypofyse</b> maakt dan FSH en LH, en de <b>zaadballen</b> maken testosteron. Drie goed: 2 punten, twee goed: 1 punt."))});
  q.append(think,ans);
},STOF_HORM);

const h2=vraag(1,"waar wordt geknipt?",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Welke buis haalt de uroloog aan beide kanten door?"));
  choiceStep(think,{q:"De buis loopt vanaf de balzak omhoog de buik in. Waar komen de zaadcellen vandaan als ze die buis in gaan?",opts:["uit de bijbal","uit de prostaat","uit de blaas"],right:0,
    ok:"Ja: na de bijbal volgt de buis die de uroloog zoekt.",no:"Zaadcellen ontstaan in de zaadbal en worden bewaard in het orgaan dat er tegenaan ligt.",onDone:unlock});
  mc(ans,{qid:id,pts:1,right:1,opts:["de bijbal","de zaadleider","de urinebuis"],onChecked:()=>waaromBtn(ans,b=>{b.append(el("div",{class:"model"},"De uroloog knipt de <b>zaadleider</b> door: de buis van bijbal naar blaas. De urinebuis kan niet: daar gaan ook urine en het vocht van zaadblaasjes en prostaat doorheen. Het antwoord is <b>B</b>."));b.insertAdjacentHTML("beforeend",ROUTE({knip:true}));})});
  q.append(think,ans);
},STOF_ROUTE);

const h3=vraag(2,"evenveel sperma",(q,id)=>{
  pre(q,"<p>In de folder van het ziekenhuis staat: ‘Bij een zaadlozing neemt de hoeveelheid zaadvloeistof niet af.’</p>");
  const {think,ans,unlock}=start(q,B("Leg uit dat de hoeveelheid sperma na de sterilisatie bijna gelijk blijft."));
  choiceStep(think,{q:"Waar komt het meeste vocht van sperma vandaan?",opts:["uit de zaadballen","uit de zaadblaasjes en de prostaat","uit de bijbal"],right:1,
    ok:"Ja. Liggen die vóór of achter de knip in de zaadleider?",no:"Zaadcellen zijn maar een paar procent van het sperma. Het vocht komt uit klieren verderop.",
    onDone:()=>choiceStep(think,{q:"Waar komt het vocht van de zaadblaasjes en de prostaat in de route terecht?",opts:["vóór de knip, in de bijbal","ná de knip, achter de blaas en in de urinebuis"],right:1,
      ok:"Goed. Maak nu je uitleg met twee stappen.",no:"De zaadblaasjes liggen achter de blaas, waar de zaadleider in de buik uitkomt.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Het meeste vocht van sperma komt uit de <b>zaadblaasjes en de prostaat</b>; zaadcellen zijn maar een paar procent van het sperma.",
    "Zaadblaasjes en prostaat komen <b>ná de knip</b> in de zaadleider uit op de route, dus hun vocht komt nog gewoon in het sperma."],
    model:"Het vocht van sperma komt vooral uit de zaadblaasjes en de prostaat. Die liggen verderop dan de plek waar de zaadleider is doorgeknipt, dus hun vocht komt nog steeds in de urinebuis. Alleen de zaadcellen, een paar procent van het sperma, ontbreken.",
    valkuil:"‘De zaadballen blijven sperma maken’ klopt niet: de zaadballen maken zaadcellen, niet het vocht. En de zaadcellen kunnen de knip niet meer voorbij.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[{cap:"Na de sterilisatie: de zaadleider is aan beide kanten doorgeknipt.",t:0},{cap:"Het vocht van zaadblaasjes en prostaat komt ná de knip in de route: het meeste sperma blijft dus komen.",t:1}],
      (st,s)=>st.innerHTML=ROUTE({knip:true,hl:s.t?["zaadblaasjes","prostaat","urinebuis"]:[]})))});
  q.append(think,ans);
},STOF_ROUTE);

const h4=vraag(1,"nog weken zaadcellen",(q,id)=>{
  pre(q,"<p>De uroloog zegt dat Bas pas na minstens drie maanden en 25 zaadlozingen zijn sperma moet laten controleren. Tot die tijd moet het stel nog een andere vorm van anticonceptie gebruiken.</p>");
  const {think,ans,unlock}=start(q,B("Wat is daarvan de reden?"));
  choiceStep(think,{q:"Blijven de zaadballen na de sterilisatie zaadcellen maken?",opts:["ja, die worden door het lichaam opgeruimd","nee, ze stoppen meteen","nee, maar pas na drie maanden"],right:0,
    ok:"Ja, dat staat in de folder. Maar die zaadcellen komen de knip niet voorbij. Waar zitten dan de zaadcellen die nog wél naar buiten kunnen?",no:"In de inleiding staat wat er met de zaadcellen gebeurt die nog gemaakt worden.",onDone:unlock});
  mc(ans,{qid:id,pts:1,right:1,opts:["De zaadballen hebben een paar maanden nodig om te stoppen met het maken van zaadcellen.","Er zitten nog zaadcellen in het deel van de route dat ná de knip ligt.","De prostaat maakt ook zaadcellen; die moeten eerst opgebruikt zijn.","Zaadcellen zwemmen in het begin nog langs de knip."],
    onChecked:()=>waaromBtn(ans,b=>{b.append(el("div",{class:"model"},"In de zaadleider na de knip en bij de zaadblaasjes liggen nog zaadcellen die er al vóór de operatie waren. Die komen bij de volgende zaadlozingen naar buiten. A klopt niet: de zaadballen blijven zaadcellen maken, maar die komen de knip niet voorbij en worden opgeruimd. Verder: de prostaat maakt geen zaadcellen (C) en een knip met een weggehaald stukje kunnen ze niet passeren (D). Het antwoord is <b>B</b>."));b.insertAdjacentHTML("beforeend",ROUTE({knip:true,stip:true}));})});
  q.append(think,ans);
},STOF_ROUTE);

const h5=vraag(2,"minder mannelijk?",(q,id)=>{
  pre(q,"<p>Bas is bang dat hij na de sterilisatie minder mannelijk wordt: minder baardgroei en minder spierkracht.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit dat de sterilisatie geen invloed heeft op deze secundaire geslachtskenmerken."));
  choiceStep(think,{q:"Welk hormoon zorgt voor baardgroei en spierkracht, en waar wordt het gemaakt?",opts:["testosteron, in de zaadballen","testosteron, in de prostaat","LH, in de zaadballen"],right:0,
    ok:"Ja. Is er aan de zaadballen iets veranderd?",no:"Het hormoon dat de secundaire geslachtskenmerken van een man geeft, komt uit hetzelfde orgaan als de zaadcellen.",
    onDone:()=>choiceStep(think,{q:"Hoe komt testosteron bij de huid van de kin en bij de spieren?",opts:["via de zaadleider","via het bloed"],right:1,
      ok:"Goed. Gebruik beide dingen in je uitleg.",no:"Hormonen gaan niet door buizen naar buiten: ze worden aan het bloed afgegeven.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "<b>Testosteron</b> wordt gemaakt in de <b>zaadballen</b>, en die blijven gewoon werken (ze krijgen nog steeds LH van de hypofyse).",
    "Testosteron gaat via het <b>bloed</b> naar de rest van het lichaam, niet via de zaadleider, dus het komt nog overal waar het werkt."],
    model:"Testosteron wordt in de zaadballen gemaakt. Aan de zaadballen verandert niets, en de hypofyse blijft ze met LH aansturen. Het testosteron wordt aan het bloed afgegeven en bereikt zo de huid en de spieren. De knip in de zaadleider zit daar niet tussen.",
    valkuil:"Een sterilisatie is geen castratie: de zaadballen blijven er en blijven hormonen maken. Een antwoord zonder de weg via het bloed mist het tweede punt."});
  q.append(think,ans);
},STOF_HORM);

opgave("Sterilisatie","Een knip in de zaadleider",`
<p>Bas (42) en zijn vrouw hebben drie kinderen en willen er geen meer. Bas laat zich steriliseren. Daarbij haalt een uroloog aan beide kanten een stukje uit een buis die vanuit de balzak omhoog loopt.</p>
<p>In de patiëntenfolder van het ziekenhuis staat onder andere:</p>
<ul style="margin:0;padding-left:20px"><li>‘Uw zaadballen blijven wel zaadcellen produceren, maar deze worden opgenomen door uw lichaam.’</li><li>‘Sterilisatie heeft geen invloed op de erecties en uw seksleven.’</li></ul>
<p class="muted" style="font-size:14px">Citaten uit de folder ‘Sterilisatie bij de man’ van het Albert Schweitzer ziekenhuis; Bas is een fictieve patiënt.</p>`,[h1,h2,h3,h4,h5]);
}else{
const STOF_RK={titel:"De regelkring van hypothalamus, hypofyse en zaadbal",html:`
<p>De <b>hypothalamus</b> geeft in korte stoten <b>GnRH</b> af aan de <b>hypofyse</b>. Die maakt <b>FSH</b> en <b>LH</b>. Bij de man zet LH de Leydigcellen tussen de zaadbuisjes aan tot het maken van <b>testosteron</b>. FSH en testosteron sturen samen de Sertolicellen aan, die de zaadcellen in de buisjes voeden en begeleiden.</p>
<p><b>Negatieve terugkoppeling</b>: testosteron remt de hypothalamus en de hypofyse, en inhibine uit de Sertolicellen remt vooral de afgifte van FSH. Stijgt het testosteron, dan daalt de afgifte van GnRH en LH. Daalt het testosteron, dan valt die rem weg.</p>
<p>Een storing zoek je schakel voor schakel: welke schakel werkt niet, en wat gebeurt er dan met de schakels erna?</p>`,
films:[F.baby,F.org]};

const c1=vraag(2,"bloedwaarden vergelijken",(q,id)=>{
  pre(q,"<p>Het syndroom van Kallmann moet worden onderscheiden van een aandoening waarbij de zaadballen zelf niet werken, bijvoorbeeld na een ernstige ontsteking.</p>");
  const {think,ans,unlock}=start(q,B("Welke bloedwaarden passen bij Sem, en welke bij een man bij wie de zaadballen niet werken?"));
  choiceStep(think,{q:"Bij Sem komt er geen GnRH bij de hypofyse. Wat doet de hypofyse dan?",opts:["veel LH maken, om het lage testosteron te compenseren","weinig LH maken, want het signaal om LH te maken ontbreekt"],right:1,
    ok:"Ja. Zonder GnRH maakt de hypofyse weinig LH, ook al is het testosteron laag. En bij de man met de kapotte zaadballen?",no:"De hypofyse kan alleen reageren op een laag testosteron als de hypothalamus GnRH kan geven.",
    onDone:()=>choiceStep(think,{q:"De zaadballen maken geen testosteron, maar hypothalamus en hypofyse werken wel. Wat gebeurt er met LH?",opts:["LH stijgt: de rem van testosteron valt weg","LH daalt: er is geen testosteron om LH aan te zetten"],right:0,
      ok:"Goed. Zoek nu het antwoord dat bij allebei past.",no:"Testosteron remt de hypothalamus en de hypofyse. Wat gebeurt er als die rem wegvalt?",onDone:unlock})});
  mc(ans,{qid:id,pts:2,right:1,opts:["Sem: LH laag en testosteron laag. Zaadballen werken niet: LH laag en testosteron laag.","Sem: LH laag en testosteron laag. Zaadballen werken niet: LH hoog en testosteron laag.","Sem: LH hoog en testosteron laag. Zaadballen werken niet: LH hoog en testosteron laag.","Sem: LH hoog en testosteron laag. Zaadballen werken niet: LH laag en testosteron laag."],
    onChecked:()=>waaromBtn(ans,textBox("Bij Sem ontbreekt de eerste schakel (GnRH). De hypofyse krijgt geen signaal, dus <b>LH laag</b>, en dan maken de zaadballen ook weinig <b>testosteron</b>. Bij kapotte zaadballen werken hypothalamus en hypofyse wel. Er is geen testosteron dat remt, dus de hypofyse maakt juist <b>veel LH</b> (negatieve terugkoppeling valt weg). Het antwoord is <b>B</b>. Wie C kiest, vergeet dat de hypofyse zonder GnRH niet kan reageren op het lage testosteron."))});
  q.append(think,ans);
},STOF_RK);

const c2=vraag(2,"testosteron alleen is niet genoeg",(q,id)=>{
  pre(q,"<p>Sem krijgt eerst elke drie weken een injectie met testosteron. Hij krijgt baardgroei en zijn stem zakt, maar zijn zaadballen blijven klein en hij maakt geen zaadcellen.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit waardoor de testosteroninjecties niet leiden tot de vorming van zaadcellen."));
  chipsStep(think,{q:"Wat is er volgens de inleiding nodig voor de vorming van zaadcellen? Kies alles wat klopt.",items:[["FSH",1],["een hoge testosteronconcentratie in de zaadbal",1],["GnRH in de zaadbal",0],["oestrogeen",0]],
    ok:"Goed. Welke van die twee krijgt Sem níet door de injecties?",no:"Lees de laatste alinea van de inleiding nog eens.",
    onDone:()=>choiceStep(think,{q:"Wat doet het testosteron uit de injectie met de afgifte van FSH en LH?",opts:["het stimuleert de afgifte","het remt de afgifte (negatieve terugkoppeling)","geen effect"],right:1,
      ok:"Ja: en bij Sem was die afgifte al laag, omdat GnRH ontbreekt. Gebruik dat in je uitleg.",no:"Testosteron remt de hypothalamus en de hypofyse.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "De <b>FSH</b>- (en LH-)concentratie blijft laag, doordat GnRH ontbreekt / doordat het toegediende testosteron de afgifte van FSH en LH bovendien remt (negatieve terugkoppeling).",
    "Zonder FSH (en zonder door LH gestimuleerde testosteronproductie in de zaadbal zelf, zodat de testosteronconcentratie in de zaadbal te laag blijft) worden er <b>geen zaadcellen</b> gevormd."],
    model:"Zonder GnRH maakt Sems hypofyse weinig FSH en LH, en het testosteron uit de injecties remt die afgifte nog verder. Zonder FSH, en zonder de hoge testosteronconcentratie die de Leydigcellen onder invloed van LH in de zaadbal zelf maken, komt de zaadcelvorming in de zaadbuisjes niet op gang. Voor baardgroei en stem is testosteron in het bloed wel genoeg.",
    valkuil:"‘Testosteron = vruchtbaar’ is een misvatting. Alleen ‘er is te weinig FSH’ zonder oorzaak of gevolg levert hooguit 1 punt op."});
  q.append(think,ans);
},STOF_RK);

const STOF_FOETUS={titel:"hCG werkt als LH",html:`
<p>De trofoblast van het embryo, later de placenta, maakt <b>hCG</b>. Dat hormoon lijkt sterk op LH en bindt aan de <b>LH-receptoren</b>. Bij de moeder houdt hCG zo het geel lichaam in leven.</p>
<p>Een hormoon werkt op elke cel met de juiste receptor, waar het ook vandaan komt. Wat de LH-receptor aanzet, maakt voor de cel niet uit: LH uit de eigen hypofyse of hCG uit de placenta.</p>
<p>Bij een jongensembryo maken de Leydigcellen al vroeg testosteron. Testosteron houdt de buizen van Wolff in stand; dihydrotestosteron vormt de uitwendige geslachtsorganen.</p>`,
films:[F.baby,F.sekse]};
const c3=vraag(2,"aanleg normaal, groei te weinig",(q,id)=>{
  pre(q,"<p>Bij jongens met het syndroom van Kallmann zijn de geslachtsorganen bij de geboorte normaal aangelegd, maar de penis is vaak klein. Voor de aanleg én de groei van de penis bij de foetus is testosteron nodig.</p><p>In het begin van de zwangerschap wordt de testosteronproductie in de zaadballen van een jongensfoetus gestimuleerd door hCG uit de placenta (hCG werkt als LH). Na ongeveer week 12 daalt de hCG-concentratie sterk.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit waardoor bij een jongen met het syndroom van Kallmann de geslachtsorganen wel normaal worden aangelegd, maar de penis later in de zwangerschap te weinig groeit."));
  choiceStep(think,{q:"Waar komt het hCG vandaan dat in het begin de zaadballen van de foetus aanzet?",opts:["uit de hypofyse van de foetus","uit de placenta, dus niet afhankelijk van de GnRH van de foetus"],right:1,
    ok:"Ja. Wat moet de testosteronproductie overnemen als het hCG na week 12 daalt?",no:"Lees de inleiding van deze vraag nog eens: welk orgaan maakt dit hCG?",
    onDone:()=>choiceStep(think,{q:"Na week 12 moet de foetus zelf LH maken. Kan dat bij Kallmann?",opts:["ja, de hypofyse werkt gewoon","nee, zonder GnRH maakt de hypofyse te weinig LH"],right:1,
      ok:"Goed. Zet beide perioden in je uitleg.",no:"Wat ontbreekt er bij Kallmann in de hypothalamus?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "In het begin stimuleert <b>hCG uit de placenta</b> de testosteronproductie; dat hangt niet af van de GnRH van de foetus, dus de aanleg is normaal.",
    "Later moet <b>LH uit de hypofyse van de foetus</b> het overnemen; zonder GnRH maakt de hypofyse te weinig LH, dus te weinig testosteron voor de groei van de penis."],
    model:"Vroeg in de zwangerschap zet hCG uit de placenta via de LH-receptoren de Leydigcellen van de foetus aan. Daarvoor is geen GnRH van de foetus nodig, dus er is genoeg testosteron voor de aanleg. Na week 12 daalt hCG en moet de eigen hypofyse LH maken. Zonder GnRH lukt dat niet, dus het testosteron daalt en de penis groeit te weinig.",
    valkuil:"hCG ‘alleen als zwangerschapshormoon van de moeder’ zien. Hier werkt het op de zaadballen van de foetus, omdat die ook LH-receptoren hebben."});
  q.append(think,ans);
},STOF_FOETUS);

const STOF_MEI={titel:"Meiose bij de man",html:`
<p>Meiose bestaat uit twee delingen na één keer DNA kopiëren. In <b>meiose I</b> komen de homologe chromosomen als paren tegen elkaar te liggen, wisselen stukken uit en gaan uit elkaar. In <b>meiose II</b> gaan de chromatiden uit elkaar, net als bij de mitose.</p>
<p>Tel chromosomen aan de centromeren: een X-vormig chromosoom met twee chromatiden is één chromosoom.</p>
<p>Bij een man ontstaan zaadcellen vanaf de puberteit elke dag opnieuw, in de zaadbuisjes. Bij een vrouw verloopt de deling scheef.</p>`,
films:[F.cel]};
const c4=vraag(2,"juist of onjuist: zaadcellen maken",(q,id)=>{
  pre(q,"<p>Daarna krijgt Sem een behandeling met injecties met hCG en FSH. Na ruim een jaar bevat zijn sperma zaadcellen. Over de vorming van zaadcellen in Sems zaadbuisjes worden drie uitspraken gedaan:</p>");
  q.append(el("p",{class:"qtext"},"1 Tijdens meiose I worden de homologe chromosomen van elkaar gescheiden.<br>2 Na meiose I heeft elke cel 46 chromosomen, elk met één chromatide.<br>3 Uit één cel die aan de meiose begint, ontstaan bij een man vier zaadcellen.<br><br><b>Geef bij elke uitspraak aan of hij juist of onjuist is.</b>"));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  numStep(think,{uid:"q"+id+"n",q:"Een cel begint aan meiose I met 46 chromosomen, elk met twee chromatiden. In meiose I gaan de paren uit elkaar. Hoeveel chromosomen heeft elke cel daarna?",right:23,
    ok:"Ja: 23 chromosomen, en elk heeft nog twee chromatiden. Het halveren gebeurt dus al in meiose I.",no:"Er zijn 23 paren. Van elk paar gaat één chromosoom naar elke kant.",onDone:unlock});
  juistOnjuist(ans,{id,stm:["in meiose I gaan homologe chromosomen uit elkaar","na meiose I: 46 chromosomen met één chromatide","bij een man ontstaan vier zaadcellen"],key:[true,false,true],
    uitleg:textBox("1 <b>juist</b>: in meiose I gaan de paren uit elkaar.<br>2 <b>onjuist</b>: na meiose I heeft elke cel 23 chromosomen, elk nog met twee chromatiden. De cel is dus al haploïd.<br>3 <b>juist</b>: bij een man ontstaan vier zaadcellen; bij een vrouw één grote eicel.")});
  q.append(think,ans);
},STOF_MEI);

opgave("Kallmann","Geen GnRH: het syndroom van Kallmann",`
<p>Sem is 17 jaar. Hij heeft nog geen baardgroei, zijn stem is niet gezakt en zijn zaadballen zijn klein. Ook ruikt hij vrijwel niets. De endocrinoloog stelt vast dat Sem het syndroom van Kallmann heeft. Dit komt voor bij ongeveer 1 op de 8000 mannen en 1 op de 40.000 vrouwen.</p>
<p>Tijdens de embryonale ontwikkeling ontstaan de zenuwcellen die GnRH maken in het reukslijmvlies van de neus. Van daaruit trekken ze langs de reukzenuwen naar de hypothalamus. Bij het syndroom van Kallmann mislukt die tocht: in de hypothalamus komen geen GnRH-producerende cellen aan, en ook de reukkolven ontwikkelen zich niet goed.</p>
<p>Bij mannen stimuleert LH de Leydigcellen tussen de zaadbuisjes tot de productie van testosteron. Voor de vorming van zaadcellen in de zaadbuisjes zijn FSH en een hoge testosteronconcentratie in de zaadbal nodig.</p>
<p class="muted" style="font-size:14px">Sem is een fictieve patiënt.</p>`,[c1,c2,c3,c4]);
}
}
