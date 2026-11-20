/* ===== Opgave: Een bloem met een slotje (eigen vragen F1, F2, F3 (havo) / F4 (vwo)) ===== */
{
const STOF_SLOT={titel:"Slotjes op het DNA",html:`
<p>Een gen wordt alleen overgeschreven als een <b>transcriptiefactor</b> bij de <b>promotor</b> kan binden; dan kan RNA-polymerase beginnen. Zo regelt een cel welke genen aan staan: de <b>genexpressie</b>.</p>
<p>Een cel kan een gen ook voor lange tijd uitzetten met een chemisch slotje: een <b>methylgroep</b> op het DNA. De basenvolgorde verandert daarbij niet; het is dus geen mutatie. Het onderzoek naar zulke slotjes heet <b>epigenetica</b>.</p>
<p>Slotjes kunnen er later ook weer af.</p>`+(VWO?`<p>Een cel kan een gen ook uitzetten nádat het is overgeschreven, met kleine RNA-moleculen: <b>RNA-interferentie</b>.</p>`:""),films:[F.aan]};
const ids=[];
ids.push(vraag(2,"pelorisch zonder mutatie",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Leg uit hoe een plant pelorische bloemen krijgt, terwijl de basenvolgorde van <i>Lcyc</i> niet veranderd is. Gebruik de begrippen genexpressie en transcriptiefactor."));
  choiceStep(think,{q:"In de bloemknoppen van pelorische planten is geen mRNA van <i>Lcyc</i>. Welke stap van de eiwitsynthese gebeurt dan niet?",opts:["de transcriptie","de translatie","de replicatie"],right:0,
    ok:"Ja. Wat is er nodig om een gen te kunnen overschrijven, en wat zit er in de weg?",no:"mRNA ontstaat bij het overschrijven van een gen.",
    onDone:()=>choiceStep(think,{q:"Kan er Lcyc-eiwit gemaakt worden als er geen mRNA van <i>Lcyc</i> is?",opts:["ja","nee"],right:1,
      ok:"Goed. Schrijf nu de keten op: methylgroepen → … → bloemvorm.",no:"Het ribosoom heeft mRNA nodig.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "door de methylgroepen (bij de promotor) kan de <b>transcriptiefactor niet binden</b>, dus <i>Lcyc</i> wordt niet overgeschreven: er komt geen mRNA",
    "er wordt dus geen Lcyc-eiwit gemaakt; het verschil komt door een verschil in <b>genexpressie</b>, niet door een andere basenvolgorde"],
    model:"Door de methylgroepen op het Lcyc-gen kan de transcriptiefactor niet bij de promotor binden. Het gen wordt dan niet overgeschreven, er komt geen mRNA en dus geen Lcyc-eiwit. De genexpressie is anders, terwijl de basenvolgorde gelijk is; daardoor krijgt de plant pelorische bloemen.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Gewone plant: de transcriptiefactor bindt bij de promotor, RNA-polymerase schrijft <i>Lcyc</i> over. Er komt mRNA en Lcyc-eiwit.",m:0},
      {cap:"Pelorische plant: methylgroepen (slotjes) op het gen. De transcriptiefactor kan er niet bij.",m:1},
      {cap:"Geen transcriptie → geen mRNA → geen Lcyc-eiwit → rondom symmetrische bloem. De basenvolgorde is precies gelijk.",m:2}],
      (st,s)=>{let h=`<path d="M20,70 H400" stroke="var(--text2)" stroke-width="6"/><rect x="60" y="60" width="90" height="20" fill="var(--goud-soft)" stroke="var(--goud)"/><text x="105" y="100" text-anchor="middle" class="lblm" style="font-size:15px">promotor</text><rect x="160" y="60" width="200" height="20" fill="var(--teal-soft)" stroke="var(--teal)"/><text x="260" y="100" text-anchor="middle" class="lblm" style="font-size:15px">gen Lcyc</text>`;
        if(s.m===0)h+=`<ellipse cx="105" cy="44" rx="32" ry="14" fill="var(--groen-soft)" stroke="var(--groen)"/><text x="105" y="48" text-anchor="middle" class="lblm" style="font-size:13px">transcriptiefactor</text><path d="M170,40 C240,10 300,10 360,30" fill="none" stroke="var(--koraal)" stroke-width="2.5"/><text x="365" y="26" class="lblm" style="font-size:15px">mRNA</text>`;
        else{[80,110,140,200,260].forEach(x=>h+=`<circle cx="${x}" cy="56" r="6" fill="var(--paars)"/><path d="M${x},62 V60" stroke="var(--paars)"/>`);
          h+=`<text x="230" y="40" class="lblm" style="font-size:15px">methylgroepen</text><ellipse cx="105" cy="16" rx="32" ry="12" fill="none" stroke="var(--groen)" stroke-dasharray="4 3"/><text x="105" y="20" text-anchor="middle" class="lblm" style="font-size:13px">kan niet binden</text>`;
          if(s.m===2)h+=`<text x="260" y="128" text-anchor="middle" class="lbl" style="font-size:16px">geen mRNA · geen eiwit</text>`;}
        st.innerHTML=svgWrap("0 0 420 140",h,"gen met promotor en methylgroepen");}))});
  q.append(think,ans);
},STOF_SLOT));

ids.push(vraag(1,"een tak met bijna gewone bloemen",(q,id)=>{
  const O=["In die tak is de mutatie in <i>Lcyc</i> hersteld.","Methylgroepen zetten <i>Lcyc</i> aan.","De methylgroepen kunnen er weer af, en dan kan <i>Lcyc</i> weer worden afgelezen.","De cellen in die tak hebben andere genen dan de rest van de plant."];
  const {think,ans,unlock}=startLos(q,"Soms groeit aan een pelorische plant een tak met bijna gewone bloemen. Op het <i>Lcyc</i>-gen in die tak zitten veel minder methylgroepen. "+B("Wat kun je hieruit afleiden?")+"<br><br>"+L4(...O));
  choiceStep(think,{q:"Is er bij pelorische planten een mutatie in <i>Lcyc</i>?",opts:["ja","nee, de basenvolgorde is gelijk aan die van gewone planten"],right:1,
    ok:"Ja, dat staat in de inleiding. Vergelijk nu: minder methylgroepen hoort bij welke bloemvorm?",no:"Lees de eerste waarneming in de inleiding nog eens.",onDone:unlock});
  mc(ans,{qid:id,pts:1,right:2,opts:O,onChecked:()=>waaromBtn(ans,textBox("<b>C</b>. Minder slotjes en bijna gewone bloemen: als de methylgroepen eraf gaan, kan <i>Lcyc</i> weer worden afgelezen. A: er was geen mutatie. B: dan zou de tak met minder methylgroepen juist pelorisch zijn. D: alle cellen van de plant hebben dezelfde genen."))});
  q.append(think,ans);
},STOF_SLOT));

if(!VWO){
ids.push(vraag(1,"slotjes in het zaad",(q,id)=>{
  const {think,ans,unlock}=start(q,"Zaden van pelorische planten groeien vaak weer uit tot pelorische planten. "+B("Leg uit waarom dat opvallend is, als je kijkt naar wat er normaal met slotjes op het DNA gebeurt bij de voortplanting."));
  choiceStep(think,{q:"Een zaadje bevat een embryo. Uit welke cel is dat embryo ontstaan?",opts:["uit een bevruchte eicel","uit een cel van de bloem van de moederplant"],right:0,
    ok:"Ja. Het embryo komt dus voort uit geslachtscellen. Wat gebeurt er volgens de film normaal met de slotjes rond de vorming van geslachtscellen en de bevruchting?",no:"Een plant vormt zaad na bestuiving en bevruchting.",onDone:unlock});
  openAnswer(ans,{id,pts:1,checks:["de meeste slotjes (methylgroepen) worden bij de vorming van geslachtscellen en na de bevruchting <b>gewist</b>; hier <b>blijven ze zitten</b> en gaan ze mee naar de nakomelingen"],
    model:"Normaal worden de meeste slotjes gewist bij de vorming van eicellen en zaadcellen (bij planten: geslachtscellen) en nog eens na de bevruchting. Bij de pelorische planten blijven de methylgroepen op Lcyc zitten en gaan ze mee naar de volgende generatie.",
    valkuil:"Alleen ‘het is erfelijk’: 0 punten.",
    after:()=>waaromBtn(ans,textBox("Erfelijk is normaal de <b>basenvolgorde</b>. Slotjes zijn meestal tijdelijk: ze worden bij de vorming van geslachtscellen en vlak na de bevruchting grotendeels gewist. Dat ze bij vlasleeuwenbek blijven zitten, maakt deze plant een bekend voorbeeld van epigenetica die over generaties gaat."))});
  q.append(think,ans);
},STOF_SLOT));
}else{
ids.push(vraag(2,"RNA-interferentie of methylering",(q,id)=>{
  const {think,ans,unlock}=startLos(q,"Onderzoekers maken in een gewone plant pelorische bloemen na met RNA-interferentie tegen het mRNA van <i>Lcyc</i>.<br>• "+B("Leg uit hoe RNA-interferentie zorgt dat er geen Lcyc-eiwit komt.")+"<br>• "+B("In de natuurlijke pelorische plant vind je geen mRNA van <i>Lcyc</i>. In de plant met RNA-interferentie wordt wel mRNA van <i>Lcyc</i> gemaakt. Leg uit waardoor dat verschil komt."));
  choiceStep(think,{q:"Op welk molecuul werkt RNA-interferentie?",opts:["op het DNA van het gen","op het mRNA","op het eiwit"],right:1,
    ok:"Ja: RNA-interferentie werkt ná de transcriptie. Waar werkt methylering?",no:"De naam zegt het al: het gaat om RNA.",
    onDone:()=>choiceStep(think,{q:"Waar zitten de methylgroepen bij de natuurlijke pelorische plant?",opts:["op het mRNA","op het DNA, bij de promotor"],right:1,
      ok:"Goed. Vergelijk nu op welk moment elk van beide het gen uitzet.",no:"Methylgroepen zijn slotjes op het DNA.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "een klein RNA (siRNA) gaat met één streng in <b>RISC</b> en bindt door <b>baseparing aan het mRNA</b> van <i>Lcyc</i>; dat mRNA wordt doorgeknipt en afgebroken (of de translatie wordt geblokkeerd)",
    "methylering voorkomt de <b>transcriptie</b> (er wordt geen mRNA gemaakt); bij RNA-interferentie wordt het gen wél overgeschreven en wordt het mRNA pas <b>daarna</b> afgebroken"],
    model:"Een siRNA dat past op het mRNA van Lcyc gaat met één streng in RISC. Dat complex bindt door baseparing aan het mRNA, dat wordt doorgeknipt en afgebroken, dus er komt geen eiwit. In de natuurlijke plant zitten methylgroepen op het DNA bij de promotor: daar wordt het gen niet eens overgeschreven, dus geen mRNA. Bij RNA-interferentie wordt het gen wel overgeschreven; het mRNA wordt pas daarna afgebroken.",
    after:()=>waaromBtn(ans,textBox("Twee manieren om een gen uit te zetten, op een ander moment:<br><b>Methylering</b>: DNA → (blokkade) geen transcriptie → geen mRNA → geen eiwit.<br><b>RNA-interferentie</b>: DNA → transcriptie → mRNA → (siRNA in RISC knipt het mRNA) → geen eiwit.<br>Daarom vind je bij RNA-interferentie nog wél (een beetje) mRNA, en bij methylering niet."))});
  q.append(think,ans);
},STOF_SLOT));
}
opgave("Bloem met slotje","Een bloem met een slotje",`
<p>Vlasleeuwenbek is een plant met gele bloemen. Een gewone bloem heeft een bovenlip en een onderlip: je kunt hem maar op één manier in twee spiegelbeelden delen. Soms vind je planten met bloemen die rondom symmetrisch zijn: de pelorische vorm.</p>
<p>Voor de vorm van de bloem is het gen <i>Lcyc</i> nodig. Onderzoekers vergeleken gewone en pelorische planten:</p>
<ul style="margin:0;padding-left:20px"><li>de basenvolgorde van <i>Lcyc</i> is bij beide precies hetzelfde;</li><li>bij pelorische planten zitten er veel methylgroepen op het <i>Lcyc</i>-gen;</li><li>in de bloemknoppen van pelorische planten is geen mRNA van <i>Lcyc</i> te vinden.</li></ul>`,ids);
}
