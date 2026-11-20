/* ===== Opgave 3: Zes weken prednison (EI-regeling-A01 t/m A05) ===== */
{
const STOF_SCHEMA={titel:"Een regelkring in een schema lezen",html:`
<p>In een schema van een hormoonregelkring staat elk vak voor een orgaan of een groep cellen. Een <b>pijl</b> is een hormoon dat via het bloed naar het volgende vak gaat. Een <b>+</b> betekent: stimuleert, een <b>−</b>: remt.</p>
<p>Een lijn die van het eindproduct terug naar boven loopt, is <b>terugkoppeling</b>. Bij een hormoon dat in balans moet blijven, is dat <b>negatieve terugkoppeling</b>: veel eindproduct zorgt voor minder aanmaak, weinig eindproduct voor meer.</p>`,
films:[F.baas,F.stress]};
const STOF_NADOEN={titel:"Een medicijn dat een hormoon nadoet",html:`
<p>Een hormoon werkt doordat het aan een <b>receptor</b> bindt. Een medicijn dat sterk op een hormoon lijkt en aan dezelfde receptor bindt, heeft dus ook hetzelfde effect, op <b>alle</b> cellen met die receptor.</p>
<p>Lees je twee grafieken onder elkaar, kijk dan steeds naar hetzelfde tijdstip in allebei: wat doet de ene stof als de andere stijgt of daalt? Zo zie je welke stof de andere aanstuurt.</p>`,
films:[F.baas,F.stress]};

const ORG=["hypothalamus","hypofyse","bijnierschors","schildklier","alvleesklier"],PM=["+ (stimuleren)","− (remmen)"];
const a1=vraag(2,"regelkring van cortisol",(q,id)=>{
  pre(q,"<p>In afbeelding 1 is de regelkring van cortisol schematisch weergegeven. De cijfers 1, 2 en 3 staan voor organen. In de cirkels P tot en met S hoort een + (stimuleren) of een − (remmen).</p>"+AFB(1)+SCHEMA_CORT());
  const {think,ans,unlock}=start(q,B("Noteer de namen van de organen 1, 2 en 3. Noteer daarna de letters P, Q, R en S onder elkaar en zet achter elke letter een + of een −."));
  choiceStep(think,{q:"Wat betekent de gestippelde lijn die van cortisol terug naar boven loopt?",opts:["terugkoppeling: cortisol werkt terug op de organen erboven","een tweede hormoon dat de bijnier maakt","de weg van cortisol naar de levercellen"],right:0,
    ok:"Ja. Wat voor terugkoppeling is dat bij een hormoon dat in balans moet blijven?",no:"Volg de gestippelde lijn: waar begint hij, en waar komt hij uit?",
    onDone:()=>choiceStep(think,{q:"Bij negatieve terugkoppeling: wat gebeurt er als er veel cortisol in het bloed is?",opts:["er wordt minder cortisol aangemaakt","er wordt nog meer cortisol aangemaakt"],right:0,
      ok:"Goed. Gebruik dit voor de cirkels R en S, en de inleiding voor de rest.",no:"Negatief betekent: het eindproduct werkt zijn eigen aanmaak tegen.",onDone:unlock})});
  selectPunten(ans,{id,uid:"q"+id,intro:"Eerste punt: alle drie de organen goed. Tweede punt: alle vier de tekens goed.",
    rows:[["orgaan 1",ORG,0],["orgaan 2",ORG,1],["orgaan 3",ORG,2],["P",PM,0],["Q",PM,0],["R",PM,1],["S",PM,1]],groepen:[[0,1,2],[3,4,5,6]],
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"De hypothalamus (1) zet met een releasing hormoon de hypofyse (2) aan; de hypofyse zet met ACTH de bijnierschors (3) aan. Ook ‘bijnier’ zonder ‘schors’ is goed.",v:1,hl:["1","2","3"]},
      {cap:"Langs de keten naar beneden stimuleert elk hormoon de volgende klier: P en Q zijn +.",v:2,hl:["P","Q"]},
      {cap:"Cortisol remt de hypofyse en de hypothalamus: R en S zijn −. Dit is negatieve terugkoppeling. Wie hier + zet, laat cortisol zijn eigen aanmaak opjagen.",v:3,hl:["R","S"]}],
      (stg,s)=>stg.innerHTML=SCHEMA_CORT({vul:s.v,hl:s.hl})))});
  q.append(think,ans);
},STOF_SCHEMA);

const FIG2=AFB(2,"fictieve gegevens, vereenvoudigd")+GRAF_PRED();
const a2=vraag(2,"waarom daalt cortisol?",(q,id)=>{
  pre(q,"<p>Bij Mila zijn vóór, tijdens en na de kuur de ACTH-concentratie en de cortisolconcentratie in het bloed gemeten. De meting van cortisol meet alleen het cortisol dat het lichaam zelf maakt, niet de prednison. In dit voorbeeld is de kuur na zes weken in één keer gestopt. Prednison is binnen een dag na de laatste tablet uit het bloed verdwenen.</p>"+FIG2);
  const {think,ans,unlock}=start(q,"Tijdens de kuur daalt de cortisolconcentratie in het bloed van Mila sterk.<br><br>"+B("Leg met behulp van afbeelding 2 uit hoe prednison deze daling veroorzaakt."));
  choiceStep(think,{q:"Wat doet de ACTH-concentratie in afbeelding 2 in de eerste week van de kuur?",opts:["die daalt","die stijgt","die blijft gelijk"],right:0,
    ok:"Ja, van ongeveer 5 naar ongeveer 1 pmol/L. Welk orgaan maakt ACTH, en op welke organen werkt prednison volgens de inleiding?",no:"Kijk naar de bovenste grafiek, tussen week 0 en week 1.",
    onDone:()=>choiceStep(think,{q:"Wat doet ACTH met de bijnierschors?",opts:["stimuleert de afgifte van cortisol","remt de afgifte van cortisol"],right:0,
      ok:"Goed. Maak nu de keten af: van prednison, via ACTH, naar cortisol.",no:"Lees de tweede alinea van de inleiding nog eens.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Prednison remt (net als cortisol) de <b>hypothalamus en/of hypofyse</b> (negatieve terugkoppeling), waardoor de <b>ACTH</b>-concentratie daalt (van ongeveer 5 naar ongeveer 1 pmol/L).",
    "Door de lage ACTH-concentratie wordt de <b>bijnierschors</b> minder gestimuleerd en geeft die minder cortisol af."],
    model:"Prednison bindt aan de cortisolreceptoren in de hypothalamus en de hypofyse en remt die, net als cortisol zelf. Daardoor daalt de ACTH-concentratie van ongeveer 5 naar ongeveer 1 pmol/L. De bijnierschors wordt dan nauwelijks nog gestimuleerd en maakt veel minder cortisol.",
    valkuil:"‘Prednison neemt de plaats van cortisol in, dus maakt het lichaam minder cortisol’ zonder de rol van ACTH: 0 punten. ‘Prednison remt de bijnier rechtstreeks’: geen punt voor het tweede deel.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Begin van de kuur: prednison remt hypothalamus en hypofyse. Eerst daalt ACTH (boven).",hl:[-0.3,1],t:"ACTH daalt"},
      {cap:"Met weinig ACTH wordt de bijnierschors niet meer aangezet: cortisol (onder) daalt mee en blijft de hele kuur laag.",hl:[0,6],t:"weinig ACTH → weinig cortisol"}],
      (stg,s)=>{stg.innerHTML=GRAF_PRED({hl:s.hl,tekst:s.t});inBeeld(stg,PREDX((s.hl[0]+s.hl[1])/2));}))});
  q.append(think,ans);
},STOF_NADOEN);

const a3=vraag(2,"ACTH na de kuur",(q,id)=>{
  pre(q,NOG(2,GRAF_PRED()));
  const {think,ans,unlock}=start(q,"In week 7 en 8 is de ACTH-concentratie bij Mila veel hoger dan vóór de kuur.<br><br>"+B("Leg uit waardoor de ACTH-concentratie in deze weken hoger is dan vóór de kuur."));
  choiceStep(think,{q:"Hoe hoog is de cortisolconcentratie in week 7 en 8, vergeleken met vóór de kuur?",opts:["veel lager","ongeveer even hoog","hoger"],right:0,
    ok:"Ja: ongeveer 80–120 nmol/L, tegen ongeveer 400 nmol/L vóór de kuur.",no:"Kijk naar de onderste grafiek bij week 7 en 8, en vergelijk met week −2 tot 0.",
    onDone:()=>choiceStep(think,{q:"Wat doet cortisol met de afgifte van ACTH (denk aan R en S in afbeelding 1)?",opts:["remt","stimuleert"],right:0,
      ok:"Goed. Combineer beide: wat betekent weinig cortisol voor de afgifte van ACTH?",no:"In de regelkring werkt cortisol terug op hypothalamus en hypofyse. Is dat negatieve of positieve terugkoppeling?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Na het stoppen is er geen prednison meer en is de <b>cortisolconcentratie</b> (nog) veel lager dan vóór de kuur.",
    "Daardoor is de <b>remming</b> van hypothalamus/hypofyse (negatieve terugkoppeling) kleiner dan vóór de kuur, zodat de hypofyse meer ACTH afgeeft."],
    model:"Na het stoppen is de prednison weg, en de cortisolconcentratie is nog veel lager dan vóór de kuur. Er is dus veel minder remming van de hypothalamus en de hypofyse dan normaal (negatieve terugkoppeling). De hypofyse geeft daardoor meer ACTH af dan vóór de kuur.",
    valkuil:"Alleen ‘omdat de prednison weg is’, zonder de lage cortisolconcentratie: maximaal 1 punt. Dat de prednison weg is, verklaart wel dat ACTH weer stijgt, maar niet dat hij hóger wordt dan vóór de kuur.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Vóór de kuur remt een normale hoeveelheid cortisol de hypofyse een beetje: ACTH ongeveer 5 pmol/L.",hl:[-2,0],t:"normale rem"},
      {cap:"Week 7–8: geen prednison en nog weinig cortisol. De rem is bijna weg, dus de hypofyse geeft veel meer ACTH af dan normaal.",hl:[6.5,8],t:"bijna geen rem → veel ACTH"}],
      (stg,s)=>{stg.innerHTML=GRAF_PRED({hl:s.hl,tekst:s.t});inBeeld(stg,PREDX((s.hl[0]+s.hl[1])/2));}))});
  q.append(think,ans);
},STOF_NADOEN);

const a4=vraag(1,"waarom duurt herstel zo lang?",(q,id)=>{
  pre(q,NOG(2,GRAF_PRED()));
  const {think,ans,unlock}=start(q,"Ondanks de hoge ACTH-concentratie duurt het na het stoppen ongeveer acht weken voordat de cortisolconcentratie weer normaal is.<br><br>"+B("Wat is hiervoor de verklaring?"));
  choiceStep(think,{q:"Hoe lang is de ACTH-concentratie tijdens de kuur laag geweest?",opts:["ongeveer zes weken","een paar dagen"],right:0,
    ok:"Ja. Lees in de inleiding nog eens wat ACTH, naast het aanzetten van de bijnierschors, nog meer doet.",no:"Kijk in de bovenste grafiek van week 0 tot week 6.",
    onDone:()=>choiceStep(think,{q:"Is de ACTH-concentratie in week 7 tot 10 hoog of laag?",opts:["hoog","laag"],right:0,
      ok:"Goed. Kijk met deze twee dingen naar de keuzes.",no:"Kijk in de bovenste grafiek na week 6.",onDone:unlock})});
  mc(ans,{qid:id,pts:1,right:2,opts:["Prednison remt de bijnierschors na de kuur nog weken rechtstreeks.","De hoge ACTH-concentratie remt de cortisolafgifte door negatieve terugkoppeling.","De bijnierschors is tijdens de kuur door het tekort aan ACTH gekrompen en heeft weken nodig om te herstellen.","De hypofyse geeft na de kuur nog te weinig ACTH af."],
    onChecked:()=>waaromBtn(ans,textBox("Zes weken lang was er weinig ACTH. Volgens de inleiding krimpt de bijnierschors dan. Na de kuur is er wel veel ACTH, maar de kleine bijnierschors kan nog weinig cortisol maken; hij moet eerst weer groeien. Het antwoord is <b>C</b>.<br>A kan niet: prednison is binnen een dag uit het bloed. B draait de regelkring om: ACTH stimuleert de bijnierschors. D klopt niet met de grafiek: ACTH is na de kuur juist hoog."))});
  q.append(think,ans);
},STOF_NADOEN);

const a5=vraag(2,"afbouwen",(q,id)=>{
  pre(q,"<p>In werkelijkheid stopt een arts een langdurige, hoge prednisonkuur nooit in één keer. De dosis wordt in een aantal weken stap voor stap verlaagd (afbouwen).</p>"+NOG(2,GRAF_PRED()));
  const {think,ans,unlock}=start(q,B("Leg uit dat Mila bij afbouwen minder risico loopt op een tekort aan cortisolwerking dan bij stoppen in één keer. Gebruik in je antwoord de begrippen ACTH en bijnierschors."));
  choiceStep(think,{q:"Waardoor heeft Mila in week 6 tot 12 van afbeelding 2 een tekort aan cortisolwerking?",opts:["er is geen prednison meer, en zelf maakt ze nog weinig cortisol","er is te veel ACTH in haar bloed"],right:0,
    ok:"Ja. Dat is het risico bij stoppen in één keer.",no:"Kijk naar de onderste grafiek na week 6, en bedenk dat de prednison binnen een dag weg is.",
    onDone:()=>choiceStep(think,{q:"Bij afbouwen daalt de dosis prednison langzaam. Wat gebeurt er dan met de rem op hypothalamus en hypofyse?",opts:["die wordt langzaam kleiner","die blijft tot de laatste tablet even groot"],right:0,
      ok:"Goed. Bedenk nu wat dat betekent voor ACTH en de bijnierschors, en wat de prednison in de tussentijd nog doet.",no:"Minder prednison bindt aan minder receptoren in hypothalamus en hypofyse.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Bij een lagere dosis prednison worden hypothalamus/hypofyse minder geremd, zodat er geleidelijk weer meer <b>ACTH</b> komt en de <b>bijnierschors</b> weer gestimuleerd wordt / kan herstellen.",
    "De nog aanwezige <b>prednison</b> neemt intussen de werking van cortisol over, zodat er geen periode is met (te) weinig cortisolwerking zoals in week 6–12 van afbeelding 2."],
    model:"Bij afbouwen wordt de remming van hypothalamus en hypofyse stap voor stap kleiner. Er komt weer meer ACTH, en de bijnierschors wordt weer gestimuleerd en kan groeien en herstellen. Ondertussen is er nog prednison, die de werking van cortisol overneemt. Zo is er geen periode zoals in week 6 tot 12, waarin er geen prednison meer is en de bijnierschors nog te weinig cortisol maakt.",
    valkuil:"‘Dan went het lichaam er langzaam aan’ zonder ACTH of bijnierschors: 0 punten. Je hebt twee dingen nodig: herstel van de bijnierschors én overbrugging door de prednison.",
    after:()=>waaromBtn(ans,textBox("Bij stoppen in één keer is de prednison binnen een dag weg, terwijl de gekrompen bijnierschors nog weken te weinig cortisol maakt: een gat in de cortisolwerking (week 6–12 in afbeelding 2). Bij afbouwen schuiven twee dingen langzaam over elkaar heen: de prednison neemt af, en tegelijk komt er weer meer ACTH, zodat de bijnierschors herstelt en zelf weer cortisol gaat maken. Er is dus steeds óf prednison, óf eigen cortisol."))});
  q.append(think,ans);
},STOF_NADOEN);

opgave("Prednison","Zes weken prednison",`
<p>Mila heeft de ziekte van Crohn, een chronische ontsteking van de darm. Tijdens een heftige periode krijgt ze zes weken lang een hoge dosis prednison. Prednison is een geneesmiddel dat sterk lijkt op het hormoon cortisol. Het bindt aan dezelfde receptoren als cortisol, ook aan de receptoren in de hypothalamus en de hypofyse, en remt ontstekingen.</p>
<p>De afgifte van cortisol wordt geregeld door een regelkring. ACTH stimuleert de bijnierschors tot de afgifte van cortisol. ACTH houdt de bijnierschors bovendien ‘in conditie’: als er langere tijd weinig ACTH is, krimpt dit weefsel.</p>
<p class="muted" style="font-size:14px">Mila is een fictieve patiënt; de meetwaarden in afbeelding 2 zijn fictief en vereenvoudigd.</p>`,[a1,a2,a3,a4,a5]);
}
