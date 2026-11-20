/* ===== Opgave 2: Waar een soort leeft (EI-ecologie-KB02; havo KB05, vwo KB09) ===== */
{
const STOF_FACT={titel:"Abiotische en biotische factoren",html:`
<p>Elke plek heeft eigen omstandigheden. <b>Abiotische factoren</b> zijn de niet-levende omstandigheden: temperatuur, licht, zuurstof, stroming, pH, de bodem. <b>Biotische factoren</b> hebben te maken met andere organismen: voedsel, rovers, concurrenten, parasieten, en ook de mens.</p>
<p>Factoren hangen vaak samen: als de ene verandert, verandert een andere mee. Zo kan een biotische factor (een organisme) een abiotische factor veranderen.</p>
<p>Bij een vraag met twee waarnemingen: zoek bij elke waarneming apart wat er anders is, en welk proces dat verschil veroorzaakt.</p>`,
films:[F.soort]};
const k1=vraag(2,"zuurstof in de beek",(q,id)=>{
  pre(q,"<p>Onder een lozingspunt van afvalwater zit minder zuurstof in een beek dan erboven. In de zomer is het water bovendien zuurstofarmer dan in de winter.</p>");
  const {think,ans,unlock}=start(q,B("Verklaar beide waarnemingen."));
  choiceStep(think,{q:"Afvalwater bevat afvalstoffen. Welke organismen breken die in de beek af?",opts:["bacteriën","waterplanten","vissen"],right:0,
    ok:"Ja. Wat hebben die bacteriën nodig om te kunnen afbreken?",no:"Denk aan de afbrekers in een rioolwaterzuivering of een composthoop.",
    onDone:()=>choiceStep(think,{q:"Wat is in de zomer anders aan het water dan in de winter?",opts:["het is warmer","het is zouter","het stroomt altijd sneller"],right:0,
      ok:"Goed. Bedenk nu wat de temperatuur doet met de hoeveelheid zuurstof die in water kan oplossen.",no:"Denk aan de belangrijkste abiotische factor die met de seizoenen verandert.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Onder het lozingspunt: <b>bacteriën</b> breken de afvalstoffen af en <b>verbruiken daarbij zuurstof</b>.",
    "In de zomer: in <b>warm water lost minder zuurstof op</b> dan in koud water."],
    model:"Onder het lozingspunt breken bacteriën de afvalstoffen af. Daarbij gebruiken ze zuurstof, dus er blijft minder zuurstof over in het water. In de zomer is het water warmer, en in warm water lost minder zuurstof op dan in koud water.",
    valkuil:"‘De vissen gebruiken in de zomer meer zuurstof’ zonder het oplossen: 0 punten voor het tweede punt.",
    after:()=>waaromBtn(ans,textBox("Twee waarnemingen, twee verschillende oorzaken. Onder het lozingspunt is het een <b>biotische</b> oorzaak: bacteriën breken de afvalstoffen af en verbruiken zuurstof. In de zomer is het een <b>abiotische</b> oorzaak: warm water kan minder zuurstof bevatten dan koud water. Traag, warm water met afvalwater is daarom vaak zuurstofarm."))});
  q.append(think,ans);
},STOF_FACT);

const STOF_TOL={titel:"Tolerantie en optimum",html:`
<p>Elke soort overleeft alleen tussen twee grenzen van een factor, bijvoorbeeld zuurstof of temperatuur. Onder de <b>minimumtolerantiegrens</b> is er te weinig, boven de <b>maximumtolerantiegrens</b> te veel. Daartussen ligt het <b>tolerantiegebied</b>, met in het midden het <b>optimum</b>: daar groeit de soort het best en plant ze zich het best voort. In een grafiek is dat de <b>optimumkromme</b>.</p>
<p>Sommige soorten hebben een smalle kromme (smalle tolerantie), andere een brede. Een soort kan alleen ergens leven als <b>alle</b> factoren tegelijk binnen haar grenzen liggen.</p>`,
films:[F.soort]};
const ids=[k1];
if(!VWO){
const KROM=({smal=true,breed=true,lijn=null}={})=>{let g="";const X=v=>40+v*30,Y=y=>170-y;
  g+=`<path d="M40,20 V170 H380" fill="none" stroke="var(--text2)" stroke-width="1.4"/>`+T(210,200,"zuurstof (mg per liter)")+T(14,95,"groei (schets)","lblm","middle",'transform="rotate(-90 14 95)"');
  [0,2,4,6,8,10].forEach(v=>g+=T(X(v),186,v,"lblm"));
  /* zuurstof: onder de minimumgrens geen groei, daarboven tot het optimum stijgend en dan vlak (te veel zuurstof is in een beek geen probleem) */
  const kr=(mn,steil,h)=>{let d="";for(let k=0;k<=110;k++){const v=k/10,y=v<=mn?0:h*(1-Math.exp(-(v-mn)*steil));d+=(d?"L":"M")+X(v).toFixed(1)+","+Y(y).toFixed(1);}return d;};
  if(breed)g+=`<path d="${kr(1,0.9,95)}" fill="none" stroke="var(--teal)" stroke-width="2.4"/>`+T(X(1.6),Y(30),"brede tolerantie","lbl","start");
  if(smal)g+=`<path d="${kr(7,1.6,125)}" fill="none" stroke="var(--goud)" stroke-width="2.6"/>`+T(X(9),Y(138),"smalle tolerantie","lbl");
  if(lijn!==null)g+=`<path d="M${X(lijn)},20 V170" stroke="var(--koraal)" stroke-width="2" stroke-dasharray="6 4"/>`;
  return SVG("0 0 390 210",g,"Twee optimumkrommen: smalle en brede tolerantie voor zuurstof (schets)");};
ids.push(vraag(2,"indicatorsoort en beperkende factor",(q,id)=>{
  pre(q,"<p>Een waterschap telt beestjes in sloten om de waterkwaliteit te bepalen.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit waarom een soort met een smalle tolerantie daarvoor beter bruikbaar is dan een soort met een brede tolerantie. Leg ook uit wat de beperkende factor van een soort is."));
  choiceStep(think,{q:"Een soort met een smalle tolerantie voor zuurstof: waar kan die leven?",opts:["alleen in water waar de zuurstof binnen nauwe grenzen ligt","in bijna elk water"],right:0,
    ok:"Ja. Wat weet je dus over het water als je zo'n soort in een sloot vindt? En wat weet je als je een soort vindt die bijna overal leeft?",no:"Een smalle tolerantie betekent: een smal tolerantiegebied tussen minimum en maximum.",
    onDone:()=>choiceStep(think,{q:"Een plant heeft genoeg licht en water, maar er is weinig stikstof in de bodem. Wat helpt hem het meest?",opts:["extra licht","extra water","extra stikstof"],right:2,
      ok:"Goed. Die ene factor heeft een naam. Leg in je antwoord in het algemeen uit welke factor dat is.",no:"Extra van iets wat er al genoeg is, helpt niet.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Een soort met een <b>smalle tolerantie</b> leeft alleen waar de factoren binnen nauwe grenzen liggen, dus vertelt zijn aanwezigheid iets over het water (<b>indicatorsoort</b>); een soort met een brede tolerantie leeft bijna overal.",
    "De <b>beperkende factor</b> is de factor die het verst buiten het optimum ligt en de soort het meest beperkt."],
    model:"Een soort met een smalle tolerantie kan alleen leven als bijvoorbeeld de zuurstof en de temperatuur binnen nauwe grenzen liggen. Vind je die soort, dan weet je dus hoe het water is: het is een indicatorsoort. Een soort met een brede tolerantie leeft bijna overal en zegt weinig. De beperkende factor is de factor die het verst buiten het optimum ligt: die remt de soort het meest.",
    valkuil:"‘De beperkende factor is de factor waar de soort het minst van nodig heeft’ is fout. Het gaat om de factor die het verst van het optimum af ligt.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Twee soorten, twee optimumkrommen voor zuurstof.",o:{}},
      {cap:"Bij 3 mg zuurstof per liter: de soort met de brede tolerantie leeft er nog, de soort met de smalle tolerantie niet.",o:{lijn:3}},
      {cap:"Bij 9,5 mg leven ze allebei. De brede soort vind je dus bijna overal: die zegt weinig. Vind je de smalle soort, dan weet je dat het water zuurstofrijk is: een <b>indicatorsoort</b>.",o:{lijn:9.5}}],
      (st,s)=>st.innerHTML=KROM(s.o)))});
  q.append(think,ans);
},STOF_TOL));
}else{
const STOF_ACC={titel:"Grenzen, signalen en seizoenen",html:`
<p>Elke soort overleeft alleen tussen een minimum- en een maximumgrens van een factor, met daartussen het <b>optimum</b>. Die grenzen zijn voor een groot deel erfelijk: <b>adaptaties</b>, ontstaan door natuurlijke selectie.</p>
<p>Veel planten en dieren bereiden zich voor op de winter: ze laten bladeren vallen, gaan in winterrust of leggen eitjes die de winter overleven. Daarvoor reageren ze op een signaal uit de omgeving, zodat ze op tijd beginnen.</p>`,
films:[F.soort]};
ids.push(vraag(2,"tropische vissen en daglengte",(q,id)=>{
  pre(q,"<p>Een kweker zet tropische vissen in één keer over van water van 28 °C naar water van 22 °C. Ze sterven. Een andere kweker laat de temperatuur in drie weken langzaam dalen; zijn vissen overleven.</p>");
  const {think,ans,unlock}=start(q,B("Verklaar het verschil met het begrip acclimatisatie. Leg ook uit waarom veel planten op de daglengte reageren als signaal voor de winter, en niet op de temperatuur."));
  choiceStep(think,{q:"Wat is het verschil tussen de twee kwekers?",opts:["hoe koud het water uiteindelijk wordt","hoe snel de temperatuur verandert"],right:1,
    ok:"Ja: allebei eindigen ze bij 22 °C. Wat kan het lichaam van een vis doen als het daar drie weken de tijd voor krijgt?",no:"Kijk naar de eindtemperatuur: is die bij beide kwekers anders?",
    onDone:()=>choiceStep(think,{q:"Hoe betrouwbaar is de temperatuur van dag tot dag als teken dat de winter eraan komt?",opts:["heel betrouwbaar","niet zo betrouwbaar: hij schommelt"],right:1,
      ok:"Goed. Vergelijk dat met de daglengte: hoe verandert die door het jaar heen?",no:"Denk aan een warme dag in november of een koude dag in mei.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Bij een langzame verandering kunnen de vissen <b>acclimatiseren</b>: hun tolerantiekromme schuift een stukje op; bij een snelle verandering lukt dat niet.",
    "De <b>daglengte verandert elk jaar precies hetzelfde</b>, de temperatuur schommelt (fotoperiodiciteit)."],
    model:"Als de temperatuur langzaam daalt, krijgen de vissen de tijd om te acclimatiseren: hun lichaam past zich in een paar weken aan, en hun tolerantiekromme schuift een stukje op naar kouder water. In één keer van 28 naar 22 °C lukt dat niet: dan valt 22 °C buiten hun grens. Planten reageren op de daglengte, omdat die elk jaar precies hetzelfde verandert. De temperatuur schommelt van dag tot dag en van jaar tot jaar. Dat heet fotoperiodiciteit.",
    valkuil:"‘De vissen passen zich aan door evolutie’ is fout: acclimatisatie gebeurt tijdens het leven van één dier en is niet erfelijk.",
    after:()=>waaromBtn(ans,textBox("<b>Acclimatisatie</b> is wennen tijdens het leven: binnen een paar weken schuift de optimumkromme van een dier een stukje op. Dat kost tijd. Daarom overleven de vissen van de tweede kweker wel. Het is niet erfelijk, dus geen adaptatie.<br><br>Een plant die op de temperatuur zou letten, kan zich vergissen: na een warme week in de herfst lijkt het lente. De <b>daglengte</b> verandert elk jaar op precies dezelfde manier, dus is een betrouwbaar signaal. Reageren op de daglengte heet <b>fotoperiodiciteit</b>."))});
  q.append(think,ans);
},STOF_ACC));
}
opgave("Waar een soort leeft","Waar een soort leeft","",ids);
}
