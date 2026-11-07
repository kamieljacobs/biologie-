/* ===== Opgave 2: Zwanger worden met een app (eigen vragen B1–B5 uit toetsen-biologie) ===== */
{
const STOF_TIJD={titel:"Eisprong, eicel en zaadcel",html:`
<p>FSH en LH uit de hypofyse laten in de eierstok een eicel rijpen in een <b>follikel</b>. Rond het midden van de cyclus komt de <b>eisprong</b> (ovulatie): de eicel komt vrij en gaat de eileider in. Daar kan zij bevrucht worden.</p>
<p>Een eicel leeft na de eisprong ongeveer <b>een dag</b>. Een zaadcel kan in het lichaam van een vrouw <b>hooguit een dag of vijf</b> overleven. Een zwangerschap kan dus alleen als er zaadcellen zijn in de dagen vóór de eisprong of op de dag zelf.</p>
<p>Een grafiek lees je van links naar rechts: wat eerst stijgt, gebeurt eerst. Kijk bij elke lijn op welke dag hij begint te stijgen of te dalen.</p>`,
films:[F.org,F.bev]};
const STOF_CYC={titel:"De menstruatiecyclus",html:`
<p>Vanaf de eerste menstruatie werken hypofyse, eierstok en baarmoeder samen in een cyclus van ongeveer vier weken.</p>
<ul style="margin:0;padding-left:20px"><li>De <b>hypofyse</b> maakt FSH en LH. Die werken op de <b>eierstok</b>: daar rijpt een follikel met een eicel, en de eierstok maakt zelf hormonen.</li>
</ul>
<p>Let op: elk hormoon werkt alleen op cellen met de juiste receptor. Een hormoon uit de hypofyse werkt dus op een ander orgaan dan een hormoon uit de eierstok.</p>`,
films:[F.org,F.cyc]};

const q1=vraag(2,"het advies van de vriendin",(q,id)=>{
  pre(q,"<p>Een vriendin geeft Nora het advies: ‘Wacht tot je temperatuur omhoog is gegaan. Dan weet je zeker dat je eisprong is geweest, en dan moet je seks hebben.’</p>");
  const {think,ans,unlock}=start(q,B("Leg met behulp van afbeelding 1 uit dat Nora met dit advies juist weinig kans heeft om zwanger te worden."));
  choiceStep(think,{q:"Kijk in afbeelding 1. Wat gebeurt er eerst?",opts:["de temperatuur stijgt, daarna is de LH-piek","de LH-piek, daarna stijgt de temperatuur"],right:1,
    ok:"Ja: de LH-piek is op dag 13, de eisprong op dag 14 en de temperatuur is pas op dag 15–16 omhoog.",no:"Zoek de dag van de LH-piek en de dag waarop de temperatuur omhoog is. Welke dag is eerder?",
    onDone:()=>choiceStep(think,{q:"Hoe lang kan een eicel na de eisprong bevrucht worden?",opts:["ongeveer een dag","ongeveer vijf dagen","de hele tweede helft van de cyclus"],right:0,
      ok:"Goed. Combineer die twee dingen in je uitleg.",no:"Lees de inleiding nog eens: de vijf dagen gelden voor zaadcellen.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "De temperatuur stijgt pas <b>na</b> de ovulatie (in afbeelding 1 pas op dag 15–16, na de LH-piek op dag 13 en de ovulatie op dag 14).",
    "Een eicel kan maar ongeveer <b>een dag</b> bevrucht worden, dus als de temperatuur gestegen is, is de eicel meestal niet meer te bevruchten."],
    model:"De temperatuur gaat pas omhoog als de ovulatie al geweest is: in afbeelding 1 op dag 15–16. Een eicel kan maar ongeveer 24 uur bevrucht worden. Als Nora wacht tot haar temperatuur gestegen is, is de eicel dus meestal al niet meer te bevruchten. De zaadcellen hadden er al vóór of op de dag van de ovulatie moeten zijn.",
    valkuil:"‘De temperatuur stijgt bij de eisprong’ (zonder ‘erna’) laat niet zien waarom het advies niet werkt. Het gaat om de volgorde in de tijd plus de korte levensduur van de eicel.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Dag 13: de LH-piek. Ongeveer anderhalve dag na het begin van de piek, op dag 14, is de ovulatie.",hl:{13:"var(--goud)"},dim:["FSH","oe","pr"]},
      {cap:"Dag 14–15: alleen nu kan de eicel bevrucht worden, ongeveer een dag lang.",hl:{14:"var(--groen)",15:"var(--groen)"},dim:["FSH","oe","pr","LH"]},
      {cap:"Dag 15–16: pas nu is de temperatuur omhoog. De eicel is dan al (bijna) niet meer te bevruchten. Het advies komt dus te laat.",hl:{16:"var(--koraal)"},dim:["FSH","oe","LH"]}],
      (st,s)=>st.innerHTML=CYCLUS({hl:s.hl,dim:s.dim})))});
  q.append(think,ans);
},STOF_TIJD);

const q2=vraag(2,"rekenen aan een cyclus van 32 dagen",(q,id)=>{
  pre(q,"<p>Nora's cyclus duurt niet 28 maar 32 dagen. Bij een langere cyclus is alleen de periode vóór de ovulatie langer: de periode van de ovulatie tot het begin van de volgende menstruatie duurt bij vrijwel iedere vrouw even lang.</p>");
  const {think,ans,unlock}=start(q,B("Bereken op welke dag van Nora's cyclus de ovulatie plaatsvindt. Geef ook de eerste dag van haar cyclus waarop geslachtsgemeenschap tot een zwangerschap kan leiden."));
  numStep(think,{uid:"q"+id+"n",q:"Hoeveel dagen duurt in een cyclus van 28 dagen de periode van de ovulatie (dag 14) tot de volgende menstruatie?",right:14,
    ok:"Ja, 14 dagen, en die periode is bij Nora net zo lang. Reken terug vanaf dag 32.",no:"28 − 14 = ?",
    onDone:()=>choiceStep(think,{q:"Hoeveel dagen vóór de ovulatie kunnen zaadcellen al aanwezig zijn en toch nog een eicel bevruchten?",opts:["1 dag","5 dagen","14 dagen"],right:1,
      ok:"Goed. Reken nu beide dagen uit.",no:"Kijk in de inleiding hoe lang zaadcellen een eicel kunnen bevruchten.",onDone:unlock})});
  let ov=null;
  numAnswer(ans,{id,fields:[
    ["dag van de ovulatie","",v=>{ov=v;return v===18;},"ovulatie op dag 18 (32 − 14 = 18)"],
    ["eerste dag met kans op zwangerschap","",v=>ov===18?(v===13||v===14):(v===ov-5||v===ov-4),"dag 13 (18 − 5); dag 14 is ook goed als je de ovulatiedag als vijfde dag meetelt. Verkeerde ovulatiedag maar goed doorgerekend (− 5): dit punt telt wel."]],
    after:()=>waaromBtn(ans,textBox("Na de ovulatie duurt het altijd ongeveer 14 dagen tot de menstruatie (28 − 14). Bij Nora: 32 − 14 = dag <b>18</b>. Zaadcellen kunnen tot vijf dagen een eicel bevruchten, dus seks vanaf dag 18 − 5 = dag <b>13</b> kan tot een zwangerschap leiden. Wie de ovulatie ‘in het midden’ legt (dag 16), vergeet dat alleen de eerste helft langer wordt."))});
  q.append(think,ans);
},STOF_TIJD);

const q3=vraag(1,"wie maakt progesteron?",(q,id)=>{
  pre(q,"<p>Na de ovulatie stijgt de progesteronconcentratie (afbeelding 1).</p>");
  const {think,ans,unlock}=start(q,B("Noem de naam van het deel van de eierstok dat dan progesteron afgeeft."));
  choiceStep(think,{q:"Waarin rijpt een eicel in de eierstok, vóór de eisprong?",opts:["in een follikel","in het baarmoederslijmvlies","in de eileider"],right:0,
    ok:"Ja. Bij de eisprong scheurt de follikel open. Wat er overblijft, krijgt een nieuwe naam en een nieuwe taak.",no:"De eicel rijpt in de eierstok, in een blaasje van hulpcellen.",onDone:unlock});
  openAnswer(ans,{id,pts:1,checks:["het <b>geel lichaam</b> (corpus luteum)"],
    model:"het geel lichaam",valkuil:"Alleen ‘de eierstok’ of ‘de follikel’ is 0 punten: na de eisprong is de follikel veranderd in het geel lichaam.",
    after:()=>waaromBtn(ans,textBox("Na de eisprong blijft van de follikel een groepje cellen over: het <b>geel lichaam</b>. Dat maakt vooral progesteron (en ook oestrogeen). Wordt er geen embryo ingenesteld, dan sterft het na ongeveer twaalf dagen af en daalt het progesteron weer."))});
  q.append(think,ans);
},STOF_CYC);

const q4=vraag(2,"juist of onjuist: hormonen in de cyclus",(q,id)=>{
  pre(q,"<p>Over de hormonen in afbeelding 1 worden drie uitspraken gedaan:</p>");
  q.append(el("p",{class:"qtext"},"1 Het hormoon dat de groei van een follikel in de eierstok stimuleert, wordt gemaakt door de hypofyse.<br>"+(VWO?"2 De daling van de progesteronconcentratie aan het eind van de cyclus leidt tot de menstruatie.":"2 Veel oestrogeen remt de hypofyse.")+"<br>3 Het baarmoederslijmvlies wordt in de eerste helft van de cyclus dikker onder invloed van FSH.<br><br><b>Geef bij elke uitspraak aan of hij juist of onjuist is.</b>"));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  selectsStep(think,{uid:"q"+id,q:"Welk orgaan maakt het hormoon?",rows:[
    ["FSH",["hypofyse","eierstok","baarmoeder"],0],["LH",["hypofyse","eierstok","baarmoeder"],0],["oestrogeen",["hypofyse","eierstok","baarmoeder"],1],["progesteron",["hypofyse","eierstok","baarmoeder"],1]],
    ok:"Goed. Bedenk nu bij uitspraak 3: op welk orgaan werkt FSH, en op welk orgaan werkt oestrogeen?",no:"De hypofyse stuurt de eierstok aan; de eierstok stuurt de baarmoeder aan.",onDone:unlock});
  juistOnjuist(ans,{id,stm:["het hormoon voor de groei van een follikel komt uit de hypofyse",VWO?"daling van progesteron leidt tot de menstruatie":"veel oestrogeen remt de hypofyse","het slijmvlies wordt dikker onder invloed van FSH"],key:[true,true,false],
    uitleg:textBox("1 <b>juist</b>: FSH uit de hypofyse laat de follikels groeien.<br>"+(VWO?"2 <b>juist</b>: zonder progesteron blijft het slijmvlies niet zitten en wordt het afgestoten.":"2 <b>juist</b>: de eierstok werkt zo terug op de hypofyse, die dan minder FSH en LH maakt.")+"<br>3 <b>onjuist</b>: FSH werkt op de eierstok. Het slijmvlies groeit onder invloed van <b>oestrogeen</b> uit de eierstok.")});
  q.append(think,ans);
},STOF_CYC);

const STOF_PIL={titel:"Hormonen remmen de hypofyse",html:`
<p>De hormonen van de eierstok werken terug op de hersenen: <b>veel oestrogeen (en progesteron) remt de hypofyse</b>, zodat die minder FSH en LH maakt.`+(VWO?` Dat heet <b>negatieve terugkoppeling</b>: een signaal remt zijn eigen oorzaak.`:``)+`</p>
<p>Anticonceptie haalt één schakel uit de keten eisprong → zaadcel bij de eicel → innesteling. De pil, de prikpil, het staafje en de ring bevatten hormonen.</p>`,
films:[F.anti,F.cyc]};
const q5=vraag(2,"hoe de pil een eisprong voorkomt",(q,id)=>{
  pre(q,"<p>Nora's zus gebruikt de combinatiepil. Die bevat een oestrogeen en een progestageen (een stof die werkt als progesteron). Ze slikt 21 dagen lang elke dag een pil.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit hoe de hormonen uit de pil ervoor zorgen dat er geen ovulatie plaatsvindt."));
  choiceStep(think,{q:"Op welk orgaan werken de hormonen uit de pil vooral?",opts:["rechtstreeks op de eicel: die gaat dood","op de hypofyse (en hypothalamus)","op de zaadcellen"],right:1,
    ok:"Ja. Wat doet de hypofyse dan minder?",no:"De pil doodt geen cellen. Denk aan het hormoon dat de hypofyse remt als er veel van is.",
    onDone:()=>choiceStep(think,{q:"Wat is er nodig voor een eisprong?",opts:["een rijpe follikel en een LH-piek","alleen veel oestrogeen","een dik baarmoederslijmvlies"],right:0,
      ok:"Goed. Maak nu de keten af: pil → hypofyse → … → geen eisprong.",no:"Welk hormoon uit de hypofyse geeft midden in de cyclus een piek?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Het oestrogeen en progestageen uit de pil <b>remmen</b> (via de hypothalamus) de afgifte van <b>FSH en LH door de hypofyse</b>"+(VWO?" (negatieve terugkoppeling).":"."),
    "Daardoor <b>rijpt er geen follikel</b> / blijft de <b>LH-piek uit</b>, zodat er geen ovulatie is."],
    model:"De hormonen uit de pil houden de spiegels in het bloed hoog. Daardoor remmen ze de hypofyse, die dan te weinig FSH en LH maakt. Er rijpt geen follikel en de LH-piek blijft uit, dus er komt geen eisprong.",
    valkuil:"‘De pil remt de eierstok’ zonder de rol van de hypofyse: hooguit 1 punt. ‘De pil doodt de eicellen of zaadcellen’ is fout."});
  q.append(think,ans);
},STOF_PIL);

opgave("Cyclus-app","Zwanger worden met een app",`
<p>Nora (31) wil zwanger worden. Ze gebruikt een app die haar vruchtbare dagen voorspelt. Elke ochtend vóór het opstaan meet ze haar lichaamstemperatuur (de basale lichaamstemperatuur) en voert die in de app in.</p>
<p>In afbeelding 1 zijn de concentraties van vier hormonen in het bloed en de basale lichaamstemperatuur weergegeven tijdens een cyclus van 28 dagen. Bij een cyclus van 28 dagen vindt de ovulatie plaats op dag 14.</p>
<p>Een eicel kan tot ongeveer 24 uur na de ovulatie worden bevrucht. Zaadcellen kunnen in het lichaam van de vrouw tot vijf dagen na de zaadlozing een eicel bevruchten.</p>${VWO?"":"<p>Na de eisprong blijft van de follikel in de eierstok een groepje cellen over: het geel lichaam.</p>"}
<div class="eyebrow">afbeelding 1 (vereenvoudigd; geen meetgegevens van één persoon)</div>${CYCLUS()}`,[q1,q2,q3,q4,q5]);
}
