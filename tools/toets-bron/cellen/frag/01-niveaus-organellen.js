/* ===== Opgave 1: Van molecuul tot biosfeer (EI-cellen-KA02) ===== */
{
const STOF_NIV={titel:"De ladder van organisatieniveaus",html:`
<p>Biologen kijken naar het leven op verschillende <b>organisatieniveaus</b>, van klein naar groot:</p>
<p>molecuul · organel · cel · weefsel · orgaan · orgaanstelsel · organisme · populatie · levensgemeenschap · ecosysteem · biosfeer</p>
<p>Elk niveau bestaat uit delen van het niveau eronder. De cel is het kleinste niveau dat leeft. Bij een bacterie is één cel meteen het hele organisme.</p>
<p>Op elk niveau komt er iets nieuws bij: een eigenschap die de losse delen niet hebben. Dat heet een <b>emergente eigenschap</b>. Eén spiercel trekt samen, maar pas een hart pompt bloed rond.</p>`,
films:[F.mol]};
const NIV=["molecuul","organel","cel","weefsel","orgaan","orgaanstelsel","organisme","populatie","levensgemeenschap","ecosysteem","biosfeer"];
const q1=vraag(3,"organisatieniveaus in een vijver",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Bij een onderzoek in een vijver worden zes dingen beschreven. Noem bij elke beschrijving het organisatieniveau.")+
    "<br><br>a alle snoeken in de vijver<br>b alle planten, dieren, schimmels en bacteriën in de vijver samen<br>c de vijver met alles wat erin leeft, samen met het water, het licht en de temperatuur<br>d de kieuw van een snoek<br>e een laag gelijke cellen die de binnenkant van de kieuw bekleedt<br>f maag, darm en lever van een snoek, die samen het voedsel verteren");
  choiceStep(think,{q:"Kijk naar a en b. Waarin verschillen ze?",opts:["a gaat over één soort, b over alle soorten samen","a gaat over dieren, b over planten","a is levend, b is levenloos"],right:0,
    ok:"Ja. Eén soort in één gebied heeft een andere naam dan alle soorten samen.",no:"Hoeveel soorten noemt a, en hoeveel b?",
    onDone:()=>choiceStep(think,{q:"Bij c komen er water, licht en temperatuur bij. Wat voor factoren zijn dat?",opts:["biotische factoren: ze leven","abiotische factoren: ze leven niet"],right:1,
      ok:"Goed. Een niveau met alleen levende wezens is dus niet hetzelfde als een niveau met ook de levenloze omgeving.",no:"Leeft licht? Leeft water?",
      onDone:()=>choiceStep(think,{q:"Bij d, e en f: wat is het kleinst?",opts:["d de kieuw","e een laag gelijke cellen","f maag, darm en lever samen"],right:1,
        ok:"Ja. Zet d, e en f nu van klein naar groot en zoek bij elk de naam op de ladder.",no:"Een laag cellen zit ín de kieuw. En de kieuw is kleiner dan maag, darm en lever samen.",onDone:unlock})})});
  selectAnswer(ans,{id,uid:"q"+id,intro:"Kies bij elke beschrijving het organisatieniveau.",
    rows:[["a alle snoeken",NIV,7],["b alle planten, dieren, schimmels en bacteriën",NIV,8],["c de vijver met water, licht en temperatuur",NIV,9],["d de kieuw",NIV,4],["e een laag gelijke cellen",NIV,3],["f maag, darm en lever samen",NIV,5]],
    score:n=>n===6?3:n===5?2:n===4?1:0,
    after:()=>waaromBtn(ans,textBox("Puntentelling: zes goed 3 punten, vijf goed 2, vier goed 1, minder 0.<br>a <b>populatie</b>: één soort in één gebied.<br>b <b>levensgemeenschap</b>: alle populaties samen.<br>c <b>ecosysteem</b>: de levensgemeenschap plus de abiotische factoren, zoals water, licht en temperatuur. Wie hier ‘levensgemeenschap’ kiest, vergeet dat de levenloze omgeving meetelt.<br>d <b>orgaan</b>: de kieuw bestaat uit verschillende weefsels.<br>e <b>weefsel</b>: cellen met dezelfde bouw en functie.<br>f <b>orgaanstelsel</b>: organen die samen één taak doen."))});
  q.append(think,ans);
},STOF_NIV);
opgave("Niveaus","Van molecuul tot biosfeer",GEEN_INLEIDING,[q1]);
}

/* ===== Opgave 2: Celorganellen (EI-cellen-KB09; vwo ook KB10) ===== */
{
const STOF_ORG={titel:"Organellen en hun taak",html:`
<p>Een cel met een kern heet <b>eukaryoot</b>. Het werk is verdeeld over afdelingen: de <b>organellen</b>, elk met een eigen bouw en taak.</p>
<ul><li><b>kern</b>: hier ligt het DNA, de bouwtekening van bijna elk eiwit. Werkkopieën gaan door de kernporiën naar buiten.</li>
<li><b>ribosomen</b>: kleine deeltjes die eiwitten maken.</li>
<li><b>endoplasmatisch reticulum (ER)</b>: een netwerk van membranen. Zitten er ribosomen op, dan heet het ruw ER.</li>
<li><b>golgisysteem</b>: een stapel platte zakjes die eiwitten bewerkt, sorteert en verpakt in blaasjes.</li>
<li><b>mitochondriën</b>: hier wordt de verbranding van glucose afgemaakt.</li>
<li><b>lysosomen</b>: blaasjes vol afbraakenzymen, de opruimdienst.</li></ul>
<p>De bouw van een cel past bij zijn taak: een cel heeft veel van de organellen die hij voor zijn werk nodig heeft.</p>`,
films:[F.org]};
const ids=[];
ids.push(vraag(2,"organellen in een traankliercel",(q,id)=>{
  pre(q,"<p>Een cel uit de traanklier maakt veel lysozym, een eiwit dat buiten de cel in het traanvocht werkt.</p>");
  const {think,ans,unlock}=start(q,B("Noem twee organellen die je in deze cel in grote hoeveelheid verwacht en leg bij één van de twee uit waarom."));
  choiceStep(think,{q:"Wat moet deze cel vooral heel veel doen?",opts:["glucose opslaan","een eiwit maken en naar buiten brengen","zich snel delen"],right:1,
    ok:"Ja. Zo'n eiwit legt een route af door de cel, van de plek waar het gemaakt wordt tot buiten de cel.",no:"Lees de eerste zin nog eens: wat maakt de cel, en waar werkt dat?",
    onDone:()=>choiceStep(think,{q:"Van welke organellen heeft zo'n cel er méér dan een gewone cel?",opts:["van alle organellen evenveel meer","van de organellen die het eiwit maken, bewerken en naar buiten brengen","vooral meer kernen, want daar ligt het DNA"],right:1,
      ok:"Goed. Bedenk nu welke organellen dat zijn: waar wordt het eiwit gemaakt, waar verpakt, en hoe komt het bij het celmembraan? Kies er twee en zeg bij één wat het doet.",no:"Een cel heeft veel van wat hij voor zijn taak nodig heeft. Wat is de taak van deze cel?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "<b>Twee</b> van: ruw ER / ribosomen, golgisysteem, blaasjes, mitochondriën.",
    "Een juiste <b>uitleg bij één</b> ervan, bijvoorbeeld: eiwitten voor buiten de cel worden op het ruw ER gemaakt en gevouwen / het golgisysteem verpakt ze in blaasjes / mitochondriën leveren de ATP voor het maken."],
    model:"Veel ruw ER en een groot golgisysteem. Lysozym is een eiwit voor buiten de cel: zulke eiwitten worden gemaakt door ribosomen op het ruw ER en daar gevouwen. Het golgisysteem verpakt ze in blaasjes die naar het celmembraan gaan.",
    valkuil:"Alleen ‘de kern, want daar ligt het DNA’ levert geen punt op: elke cel heeft één kern. Het gaat om organellen waarvan deze cel er méér heeft dan een gewone cel.",
    after:()=>waaromBtn(ans,textBox("Een cel die veel eiwit voor buiten maakt, heeft veel van alles op de route: <b>ribosomen op het ruw ER</b> (maken en vouwen), het <b>golgisysteem</b> (bewerken en verpakken), <b>blaasjes</b> (vervoer naar het membraan) en <b>mitochondriën</b> (ATP voor al dat werk). In de film zie je hetzelfde bij de alvleeskliercel: die heeft veel meer ruw ER dan een huidcel."))});
  q.append(think,ans);
},STOF_ORG));
if(VWO){
ids.push(vraag(2,"het golgisysteem sorteert",(q,id)=>{
  pre(q,"<p>Een cel maakt twee enzymen: een afbraakenzym dat in een lysosoom moet komen, en een verteringsenzym dat de cel uit moet.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit hoe het golgisysteem ervoor zorgt dat elk enzym op de goede plek komt. Gebruik het begrip exocytose."));
  choiceStep(think,{q:"Beide enzymen gaan door hetzelfde golgisysteem. Wat moet er dus aan elk eiwit te zien zijn?",opts:["hoe groot het is","waar het heen moet","hoeveel energie het kost"],right:1,
    ok:"Ja. Hoe kan het golgisysteem dat aan een eiwit zien, en wat doet het daarna met de eiwitten?",no:"Grootte zegt niets over de bestemming. Hoe weet een postsorteerder waar een pakketje heen moet?",
    onDone:()=>choiceStep(think,{q:"Hoe komt de inhoud van een blaasje buiten de cel?",opts:["het blaasje lost op in het cytoplasma","het blaasje versmelt met het celmembraan","het blaasje gaat door een kernporie"],right:1,
      ok:"Goed. Gebruik nu het begrip uit de vraag voor deze stap.",no:"Een blaasje heeft zelf ook een membraan. Waar moet dat membraan mee samengaan om de inhoud buiten te krijgen?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Het golgisysteem zet een <b>adreslabel</b> op elk eiwit en sorteert ze op dat label in verschillende blaasjes.",
    "Het blaasje met het verteringsenzym <b>versmelt met het celmembraan</b>, zodat de inhoud buiten komt: <b>exocytose</b>."],
    model:"In het golgisysteem krijgt elk eiwit een adreslabel. Op dat label sorteert het golgisysteem de eiwitten in verschillende blaasjes: het afbraakenzym gaat naar een lysosoom, het verteringsenzym naar het celmembraan. Dat blaasje versmelt met het celmembraan en de inhoud komt buiten de cel: exocytose.",
    valkuil:"‘Het enzym lekt door het membraan naar buiten’ of ‘het golgisysteem pompt het eruit’: 0 punten voor het tweede punt. En exocytose is iets anders dan endocytose (iets naar binnen halen).",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"In het golgisysteem krijgt elk eiwit een <b>adreslabel</b>.",t:0},
      {cap:"Het golgisysteem sorteert op dat label: elk eiwit komt in een eigen blaasje.",t:1},
      {cap:"Het blaasje met het verteringsenzym versmelt met het celmembraan: de inhoud komt buiten. Dat is <b>exocytose</b>. Het andere blaasje gaat naar het lysosoom.",t:2}],
      (st,s)=>{const golgi=[0,1,2,3].map(k=>`<path d="M120,${70+k*18} q60,-10 120,0" fill="none" stroke="var(--text2)" stroke-width="5" stroke-linecap="round"/>`).join("");
        const lab=(x,y,c)=>`<circle cx="${x}" cy="${y}" r="9" fill="${c}"/><rect x="${x+6}" y="${y-12}" width="10" height="7" fill="${c}"/>`;
        let g=golgi+`<path d="M470,20 Q440,120 470,230" fill="none" stroke="var(--text2)" stroke-width="3"/><text x="478" y="30" class="lblm">celmembraan</text><text x="150" y="160" class="lblm">golgisysteem</text>`;
        if(s.t===0)g+=lab(170,95,"var(--koraal)")+lab(200,95,"var(--paars)");
        if(s.t>=1){g+=`<circle cx="${s.t===2?458:330}" cy="80" r="20" fill="none" stroke="var(--text2)" stroke-width="2"/>`+lab(s.t===2?458:330,80,"var(--koraal)");
          g+=`<circle cx="320" cy="${s.t===2?200:170}" r="20" fill="none" stroke="var(--text2)" stroke-width="2"/>`+lab(320,s.t===2?200:170,"var(--paars)");
          g+=`<text x="300" y="${s.t===2?236:206}" class="lblm">naar het lysosoom</text>`;}
        if(s.t===2)g+=`<path d="M486,80 h40" stroke="var(--koraal)" stroke-width="3"/><text x="490" y="110" class="lblm">buiten</text>`;
        st.innerHTML=svgWrap("0 0 560 250",g,"Golgisysteem sorteert twee eiwitten in blaasjes");}))});
  q.append(think,ans);
},STOF_ORG));
}
opgave("Organellen","Celorganellen",GEEN_INLEIDING,ids);
}
