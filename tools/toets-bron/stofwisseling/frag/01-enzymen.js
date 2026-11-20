/* ===== Opgave 1: Eiwitten en enzymen (kennis; EI-stofwisseling-K03, K08, havo K09 / vwo K12) ===== */
{
const STOF_EIWIT={titel:"Eiwitten werken door hun vorm",html:`
<p>Een eiwit bestaat uit een of meer lange ketens <b>aminozuren</b>, opgevouwen tot een eigen ruimtelijke vorm. Die <b>vorm bepaalt wat het eiwit kan</b>.</p>
<p>Je lichaam heeft heel verschillende soorten eiwitten, bijvoorbeeld membraaneiwitten die cellen aan elkaar vasthouden. De naam van een soort eiwit zegt vaak al iets over zijn taak. Vraag je bij elk eiwit af: wat doet het, en met welk ander molecuul of welke structuur?</p>`,
films:[F.v]};
const STOF_WERKING={titel:"Hoe een enzym werkt",html:`
<p>Het molecuul waar een enzym op inwerkt, is het <b>substraat</b>. Het past in een holte met precies de goede vorm: het <b>actieve centrum</b>. Samen vormen ze even het <b>enzym-substraatcomplex</b>. Zo verloopt de reactie over een lagere drempel: het enzym verlaagt de <b>activeringsenergie</b>.</p>
<p>Moleculen bewegen voortdurend en botsen heel vaak. De vorm van het actieve centrum hangt af van de vouwing van het eiwit en van de ladingen erin. Daarom heeft elk enzym een eigen <b>optimumtemperatuur</b> en een eigen <b>optimum-pH</b>.</p>
<p>Bij een proef hoort een <b>controle</b>: een opstelling die zo gelijk mogelijk is, maar zonder de factor die je onderzoekt.</p>`,
films:[F.v]};

const q1=vraag(1,"eiwit en functie",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Welke combinatie van eiwit en functie is juist?"));
  choiceStep(think,{q:"Wat bepaalt wat een eiwit kan?",opts:["zijn ruimtelijke vorm","hoe groot het eiwit is","in welk orgaan het zit"],right:0,
    ok:"Ja. De naam van een soort eiwit zegt vaak al wat het doet.",no:"Denk aan de gekookte aardappel: de ketens waren er nog, maar wat was er kapot?",
    onDone:()=>choiceStep(think,{q:"Welke soort eiwit versnelt één specifieke reactie?",opts:["een enzym","een eiwithormoon","een receptor"],right:0,
      ok:"Goed. Controleer op dezelfde manier de andere keuzes: past het werk bij de naam?",no:"Welk eiwit werkt bij de rauwe aardappel en laat het waterstofperoxide schuimen?",onDone:unlock})});
  mc(ans,{qid:id,pts:1,right:2,opts:["motoreiwit: brengt een bepaalde stof door het membraan","transporteiwit: loopt over een microtubulus met een blaasje op sleeptouw","receptor: past precies om een bepaalde signaalstof heen","eiwithormoon: versnelt één specifieke reactie"],
    onChecked:()=>waaromBtn(ans,textBox("Een <b>receptor</b> past precies om een bepaalde signaalstof heen: <b>C</b>. Bij A en B zijn de taken verwisseld: een <b>transporteiwit</b> brengt een stof door het membraan, een <b>motoreiwit</b> loopt over een microtubulus met een blaasje op sleeptouw. D is de taak van een <b>enzym</b>; een eiwithormoon, zoals insuline, past juist in een receptor. Wat een eiwit kan, hangt af van zijn vorm."))});
  q.append(think,ans);
},STOF_EIWIT);

const q2=vraag(2,"juist of onjuist: enzymen",(q,id)=>{
  pre(q,"<p>Hieronder staan 5 uitspraken.</p>");
  q.append(el("p",{class:"qtext"},"1 Een enzym zoekt actief naar zijn substraat.<br>2 Pepsine werkt het best in een zure omgeving, zoals de maag.<br>3 Trypsine werkt in de dunne darm bij een hogere pH dan pepsine.<br>4 Wordt de pH een beetje anders dan het optimum, dan kloppen de ladingen in het actieve centrum al niet meer.<br>5 Bij een proef met rauwe aardappel is een blokje gekookte aardappel de controle.<br><br><b>Geef bij elke uitspraak aan of hij juist of onjuist is.</b>"));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  choiceStep(think,{q:"Kan een molecuul zelf ergens naartoe ‘willen’ of iets ‘zoeken’?",opts:["ja, enzymen hebben een soort zintuig","nee, moleculen bewegen willekeurig"],right:1,
    ok:"Ja. Houd dat in je achterhoofd bij uitspraak 1.",no:"Een enzym is een molecuul: het leeft niet en heeft geen zintuigen.",
    onDone:()=>choiceStep(think,{q:"Bij de aardappelproef onderzoek je wat katalase doet. Wat moet de controle dan zijn?",opts:["een opstelling die verder gelijk is, maar zonder werkend katalase","een opstelling met twee keer zoveel aardappel","een opstelling zonder vloeistof"],right:0,
      ok:"Goed. Denk bij 2 en 3 aan de pH van je maag en je dunne darm.",no:"Een controle verschilt maar in één ding: de factor die je onderzoekt.",onDone:unlock})});
  juistOnjuist(ans,{id,stm:["een enzym zoekt actief naar zijn substraat","pepsine werkt het best in een zure omgeving","trypsine werkt bij een hogere pH dan pepsine","een beetje andere pH: de ladingen in het actieve centrum kloppen niet meer","de gekookte aardappel is de controle"],key:[false,true,true,true,true],
    uitleg:textBox("1 <b>onjuist</b>: een enzym zoekt niets op. Alles beweegt willekeurig en botsingen zijn toeval; er zijn alleen enorm veel botsingen per seconde.<br>2 <b>juist</b>: pepsine werkt het best bij ongeveer pH 2.<br>3 <b>juist</b>: trypsine werkt het best bij ongeveer pH 8.<br>4 <b>juist</b>: een kleine verandering van de pH verandert al de ladingen in het actieve centrum; nog verder weg gaat de hele vouwing kapot.<br>5 <b>juist</b>: in het gekookte blokje is katalase gedenatureerd; verder is het zo gelijk mogelijk.")});
  q.append(think,ans);
},STOF_WERKING);

const ids=[q1,q2];
if(!VWO){
const STOF_HV={titel:"Meer enzym of meer substraat",html:`
<p>Een enzym zet alleen een substraatmolecuul om dat botst met een <b>vrij</b> actief centrum. Een enzymmolecuul kan dat heel vaak achter elkaar doen, want het wordt niet verbruikt.</p>
<p>Elk enzymmolecuul werkt los van de andere. Als je de snelheid meet, kijk je dus naar twee dingen: hoeveel enzymmoleculen er zijn, en hoe vaak er een substraatmolecuul in een vrij actief centrum terechtkomt.</p>`,
films:[F.v]};
ids.push(vraag(2,"meer substraat, nauwelijks sneller",(q,id)=>{
  pre(q,"<p>Een leerling meet de reactiesnelheid van een vaste hoeveelheid enzym bij steeds meer substraat. Eerst stijgt de snelheid, daarna nauwelijks nog.</p>");
  const {think,ans,unlock}=start(q,"<b>a</b> Verklaar waarom de snelheid bij veel substraat nauwelijks nog stijgt.<br><b>b</b> Wat moet de leerling veranderen om de snelheid dan tóch te verhogen?");
  choiceStep(think,{q:"Wat moet er gebeuren voordat een enzym een substraatmolecuul omzet?",opts:["het substraat moet botsen met een vrij actief centrum","het enzym moet eerst opgewarmd worden","het substraat moet eerst in stukken vallen"],right:0,
    ok:"Ja. Stel je nu heel veel substraat voor, en steeds evenveel enzym.",no:"Het substraat moet in het actieve centrum passen. Wat moet daar dan vrij zijn?",
    onDone:()=>choiceStep(think,{q:"Bij heel veel substraat: hoe vaak is een actief centrum vrij?",opts:["bijna altijd","bijna nooit"],right:1,
      ok:"Goed. Gebruik dat bij a. Bedenk bij b wat er dan nog wél helpt, nu meer substraat niet meer helpt.",no:"Elk centrum kan maar één substraatmolecuul tegelijk vasthouden. Er botsen er heel veel.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "<b>a</b> Bijna elk actief centrum is vrijwel steeds <b>bezet</b>; een nieuw substraatmolecuul botst op een bezet centrum (<b>verzadiging</b>).",
    "<b>b</b> <b>Meer enzym</b> toevoegen."],
    model:"a: Bij veel substraat is bijna elk actief centrum vrijwel steeds bezet. Een nieuw substraatmolecuul botst dan op een bezet centrum en kaatst weg: het enzym is verzadigd. b: Meer enzym toevoegen. Elk enzymmolecuul werkt los van de andere, dus twee keer zoveel enzym geeft twee keer zoveel omzettingen.",
    valkuil:"Bij a: ‘het enzym raakt op’ of ‘het enzym wordt moe’ is fout: een enzym wordt niet verbruikt. Bij b: ‘nog meer substraat’ helpt juist niet meer.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Weinig substraat: de meeste actieve centra zijn vrij. Elk extra substraatmolecuul geeft meer botsingen met een vrij centrum, dus de snelheid stijgt.",tot:2.5,bezet:1},
      {cap:"Meer substraat: steeds meer centra zijn bezet. De lijn buigt af.",tot:6,bezet:4},
      {cap:"Heel veel substraat: bijna elk centrum is steeds bezet. Een nieuw substraatmolecuul kaatst weg. Dat is verzadiging: meer substraat helpt niet meer.",tot:10,bezet:6,extra:6},
      {cap:"Twee keer zoveel enzym: twee keer zoveel actieve centra, dus twee keer zoveel omzettingen per seconde. Meer enzym helpt dus wél.",tot:10,bezet:6,dubbel:true}],
      (st,s)=>{const L=[{vmax:1,km:1.2,kleur:"var(--teal)",naam:s.dubbel?"evenveel enzym":""}];if(s.dubbel)L.push({vmax:2,km:1.2,kleur:"var(--goud)",naam:"twee keer zoveel enzym"});
        st.innerHTML=KROMME({lijnen:L,tot:s.tot,stip:[s.tot,0]})+(s.dubbel?"":CENTRA(s.bezet,6,s.extra||0));}))});
  q.append(think,ans);
},STOF_HV));
}else{
const STOF_REM={titel:"Remmen en activeren",html:`
<p>Een enzym kan op twee manieren worden afgeremd. Een <b>competitieve remstof</b> lijkt op het substraat: hij past in het actieve centrum, wordt niet omgezet en laat ook weer los.</p>
<p>Een molecuul kan ook binden op een andere plek: de <b>allosterische zijde</b>. Daardoor verandert de vorm van het hele enzym. Een <b>inhibitor</b> vervormt het actieve centrum, zodat het substraat niet meer past; een <b>activator</b> geeft het actieve centrum juist de goede vorm. Zo'n molecuul hoeft niet op het substraat te lijken.</p>`,
films:[F.v]};
/* keten van drie enzymen: E1 → E2 → E3 → eindproduct; rem = eindproduct op de allosterische zijde van E1 */
function KETEN({rem,veel,loopt}){
  const E=[110,290,470];let s="";
  s+=`<text x="30" y="92" class="lblm">A</text>`;
  E.forEach((x,i)=>{const op=(!loopt&&i>0)?.45:1;
    s+=`<path d="M${x-42},${110} Q${x-48},${52} ${x-16},${50} L${x-16},${66} L${x+16},${66} L${x+16},${50} Q${x+48},${52} ${x+42},${110} Z" fill="var(--teal-soft)" stroke="var(--teal)" stroke-width="2" opacity="${op}"/>`;
    s+=`<text x="${x}" y="100" text-anchor="middle" class="lbl">enzym ${i+1}</text>`;
    if(i<2)s+=`<path d="M${x+52},80 H${E[i+1]-58}" stroke="var(--text2)" stroke-width="2" opacity="${loopt?1:.3}" marker-end="url(#pijl)"/>`;});
  s+=`<path d="M40,80 H${E[0]-58}" stroke="var(--text2)" stroke-width="2" marker-end="url(#pijl)"/>`;
  s+=`<path d="M${E[2]+52},80 H${E[2]+84}" stroke="var(--text2)" stroke-width="2" opacity="${loopt?1:.3}" marker-end="url(#pijl)"/>`;
  const n=veel?7:2;for(let k=0;k<n;k++)s+=`<circle cx="${574+(k%3)*16}" cy="${66+Math.floor(k/3)*16}" r="6" fill="var(--paars)"/>`;
  s+=`<text x="590" y="132" text-anchor="middle" class="lblm">eindproduct</text>`;
  s+=`<text x="${E[0]-16}" y="158" text-anchor="middle" class="lblm">allosterische zijde</text><path d="M${E[0]-16},146 V128" stroke="var(--text3)" stroke-width="1"/>`;
  if(rem)s+=`<circle cx="${E[0]-16}" cy="${116}" r="7" fill="var(--paars)"/><path d="M560,96 C470,170 220,170 ${E[0]-8},124" fill="none" stroke="var(--paars)" stroke-width="1.8" stroke-dasharray="5 4" marker-end="url(#pijlp)"/>`;
  const defs=`<defs><marker id="pijl" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--text2)"/></marker><marker id="pijlp" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--paars)"/></marker></defs>`;
  return FIG("0 0 640 168",defs+s,"Een keten van drie enzymen die samen één eindproduct maken",520,640);}
ids.push(vraag(2,"een keten die zichzelf remt",(q,id)=>{
  pre(q,"<p>In een cel maken drie enzymen na elkaar één eindproduct.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit hoe het eindproduct zijn eigen aanmaak remt als er veel van is, en waarom de keten weer op gang komt als het eindproduct wordt verbruikt."));
  choiceStep(think,{q:"Welk enzym van de keten kun je het beste remmen om de hele keten te vertragen?",opts:["het eerste enzym","het laatste enzym"],right:0,
    ok:"Ja: dan ontstaan ook de tussenproducten niet. Maar het eindproduct lijkt niet op het substraat van het eerste enzym.",no:"Als je het laatste enzym remt, worden de tussenproducten nog steeds gemaakt.",
    onDone:()=>choiceStep(think,{q:"Hoe kan een molecuul dat niet op het substraat lijkt, een enzym toch remmen?",opts:["door in het actieve centrum te gaan zitten","door op een andere plek te binden, waardoor de vorm van het hele enzym verandert"],right:1,
      ok:"Goed. Bedenk nu ook wat er gebeurt als er steeds minder eindproduct is.",no:"In het actieve centrum past alleen iets dat op het substraat lijkt.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Bij veel eindproduct bindt het aan de <b>allosterische zijde van het eerste enzym</b>, waardoor dat (vervormt en) veel minder werkt en de hele keten vertraagt.",
    "Wordt het eindproduct verbruikt, dan <b>bindt er steeds minder</b> aan het eerste enzym, dat dan weer werkt; dit heet <b>negatieve terugkoppeling</b>."],
    model:"Is er veel eindproduct, dan bindt het aan de allosterische zijde van het eerste enzym. Het actieve centrum vervormt, het eerste enzym werkt veel minder en de hele keten vertraagt. Wordt het eindproduct verbruikt, dan bindt er steeds minder aan het eerste enzym. Dat werkt dan weer, en de keten komt op gang. Dit is negatieve terugkoppeling.",
    valkuil:"‘De cel merkt dat er genoeg is’: 0 punten voor het eerste element. Er is geen cel die iets wil; er is alleen een molecuul dat ergens past.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Weinig eindproduct: de drie enzymen werken, stof A wordt stap voor stap eindproduct.",rem:false,veel:false,loopt:true},
      {cap:"Veel eindproduct: het bindt vaker aan de allosterische zijde van enzym 1. Het actieve centrum vervormt en enzym 1 werkt veel minder: de hele keten vertraagt.",rem:true,veel:true,loopt:false},
      {cap:"Het eindproduct wordt verbruikt: er bindt steeds minder aan enzym 1, dus het werkt weer en de keten komt op gang. Het eindproduct remt zijn eigen aanmaak: negatieve terugkoppeling.",rem:false,veel:false,loopt:true}],
      (st,s)=>st.innerHTML=KETEN(s)))});
  q.append(think,ans);
},STOF_REM));
}
opgave("Enzymen","Eiwitten en enzymen","",ids);
}
