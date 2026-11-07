/* ===== Opgave: bloedgroepen, letale factor, polygeen ===== */
{
const STOF4={titel:"Multipele allelen, codominant en letaal",html:`
<p>Van het gen voor de bloedgroepen (AB0-systeem) bestaan in de bevolking <b>drie allelen</b>: I<sup>A</sup>, I<sup>B</sup> en i (<b>multipele allelen</b>). Eén persoon heeft er maar twee. I<sup>A</sup> zorgt voor A-antigenen op de rode bloedcellen, I<sup>B</sup> voor B-antigenen en i voor geen van beide. I<sup>A</sup> en I<sup>B</sup> zijn allebei dominant over i.</p>
<div class="tablewrap"><table class="data"><tr><th>bloedgroep</th><th>mogelijke genotypen</th></tr><tr><td>A</td><td>I<sup>A</sup>I<sup>A</sup> of I<sup>A</sup>i</td></tr><tr><td>B</td><td>I<sup>B</sup>I<sup>B</sup> of I<sup>B</sup>i</td></tr><tr><td>AB</td><td>I<sup>A</sup>I<sup>B</sup></td></tr><tr><td>O</td><td>ii</td></tr></table></div>
<p>Een <b>letale factor</b> is een allel dat in een bepaalde combinatie het organisme laat sterven, vaak al als embryo. Dat genotype ontbreekt dan bij de geboren nakomelingen, waardoor je een andere verhouding telt dan je zou verwachten.</p>
<p>Bij <b>polygene</b> overerving bepalen veel genen samen één kenmerk.</p>`,
films:[F.voorbij]};
const b1=vraag(1,"codominantie",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Bloedgroep AB is een voorbeeld van:"));
  choiceStep(think,{q:"Welke antigenen zitten er op de rode bloedcellen van iemand met bloedgroep AB?",opts:["alleen A","alleen B","A én B","een tussenvorm van A en B"],right:2,
    ok:"Ja: beide allelen laten hun eigen antigeen maken.",no:"Kijk naar de tabel in de inleiding: welke allelen heeft iemand met AB, en wat maakt elk allel?",onDone:unlock});
  mc(ans,{qid:id,pts:1,right:0,opts:["codominantie: beide allelen komen volledig tot uiting","intermediaire overerving: het fenotype ligt tussen A en B in","recessieve overerving: AB komt alleen voor bij twee recessieve allelen"],onChecked:()=>waaromBtn(ans,textBox(
    "Iemand met I<sup>A</sup>I<sup>B</sup> heeft A-antigenen én B-antigenen op zijn rode bloedcellen: beide allelen komen volledig tot uiting. Dat is <b>codominantie</b>. Er is geen tussenvorm (zoals een roze leeuwenbek). Het antwoord is <b>A</b>."))});
  q.append(think,ans);
},STOF4);
const b2=vraag(2,"verwisselde baby's",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Leg uit welke baby bij welk ouderpaar hoort. Gebruik in je uitleg de genotypen."));
  selectsStep(think,{uid:"q"+id,q:"Welke allelen kan elke ouder doorgeven?",rows:[
    ["moeder 1 (AB)",["alleen IA","IA of IB","IA, IB of i"],1],
    ["vader 1 (O)",["alleen i","i of IA"],0],
    ["moeder 2 (A)",["alleen IA","IA, of i als ze IAi is"],1],
    ["vader 2 (B)",["alleen IB","IB, of i als hij IBi is"],1]],
    ok:"Goed. Een baby met bloedgroep O moet van <b>beide</b> ouders een i krijgen. Bij welk paar kan dat?",no:"Iemand met AB heeft geen i; iemand met A of B kan wel een i ‘verbergen’.",onDone:unlock});
  openAnswer(ans,{id,pts:2,checks:[
    "Ouderpaar 1 (I<sup>A</sup>I<sup>B</sup> × ii) krijgt alleen kinderen met I<sup>A</sup>i of I<sup>B</sup>i (bloedgroep A of B), nooit O: dus baby 2 (A) hoort bij ouderpaar 1.",
    "Ouderpaar 2 (A × B) kan een kind met bloedgroep O (ii) krijgen als beide ouders heterozygoot zijn (I<sup>A</sup>i × I<sup>B</sup>i): dus baby 1 (O) hoort bij ouderpaar 2."],
    model:"De moeder van ouderpaar 1 heeft AB (I<sup>A</sup>I<sup>B</sup>) en geeft dus altijd I<sup>A</sup> of I<sup>B</sup> door: haar kind kan geen O hebben. Baby 1 (ii) hoort dus bij ouderpaar 2; dat kan als die ouders I<sup>A</sup>i en I<sup>B</sup>i zijn. Baby 2 (A, I<sup>A</sup>i) hoort bij ouderpaar 1.",
    valkuil:"‘Een kind met O moet een ouder met O hebben.’ Twee ouders met A en B kunnen allebei een i doorgeven."});
  q.append(think,ans);
},STOF4);
const b3=vraag(1,"letale factor: verhouding",(q,id)=>{
  pre(q,"<p>Manx-katten hebben (bijna) geen staart. Dat komt door een dominant allel M. Katten met het genotype mm hebben een normale staart. Embryo's met het genotype MM sterven al vroeg in de baarmoeder.</p>");
  const {think,ans,unlock}=start(q,B("Twee Manx-katten krijgen samen veel kittens. In welke verhouding verwacht je kittens zonder staart en kittens met een staart?"));
  choiceStep(think,{q:"Welk genotype heeft een levende Manx-kat?",opts:["MM","Mm","MM of Mm"],right:1,ok:"Ja: MM overleeft niet. Maak nu het schema Mm × Mm.",no:"Lees de laatste zin van de tekst nog eens.",
    onDone:()=>choiceStep(think,{q:"Welk vakje van het schema Mm × Mm wordt nooit geboren?",opts:["MM","Mm","mm"],right:0,ok:"Goed. Tel nu de vakjes die overblijven.",no:"Welk genotype sterft als embryo?",onDone:unlock})});
  mc(ans,{qid:id,pts:1,right:1,opts:["3 : 1","2 : 1","1 : 1","1 : 2"],onChecked:()=>waaromBtn(ans,b=>stepAnim(b,[
    {cap:"Mm × Mm geeft 1 MM : 2 Mm : 1 mm.",t:0},{cap:"MM sterft als embryo: dat vakje valt weg.",t:1},{cap:"Over: 2 Mm (zonder staart) : 1 mm (met staart) = <b>2 : 1</b>. Het antwoord is <b>B</b>.",t:2}],
    (st,s)=>st.innerHTML=PUN(["M","m"],["M","m"],[[s.t?"✕":"MM","Mm"],["Mm","mm"]],{kopT:"Manx Mm",kopL:"Manx Mm",kleur:c=>c==="✕"?"var(--koraal-soft)":s.t===2?(c==="mm"?"var(--teal-soft)":"var(--goud-soft)"):""})))});
  q.append(think,ans);
},STOF4);
const b4=vraag(2,"geen raszuivere Manx",(q,id)=>{
  pre(q,"<p>Een fokker wil een raszuivere lijn Manx-katten: katten die alleen kittens zonder staart krijgen.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit waarom dat niet kan."));
  choiceStep(think,{q:"Welk genotype zou een raszuivere Manx-kat moeten hebben?",opts:["Mm","MM"],right:1,ok:"Ja: raszuiver = homozygoot. Kan een kat met dat genotype bestaan?",no:"Raszuiver betekent dat een dier van een gen twee dezelfde allelen heeft.",
    onDone:()=>choiceStep(think,{q:"Een Manx (Mm) wordt gekruist met een Manx of met een kat met staart. Kunnen er dan kittens met staart (mm) komen?",opts:["bij beide kruisingen wel","alleen bij Manx × kat met staart","bij geen van beide"],right:0,ok:"Goed: Mm geeft de helft van de keren m door.",no:"Een Manx is Mm. Hoe vaak geeft die een m door?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:["Elke levende Manx-kat is <b>heterozygoot (Mm)</b>, want MM sterft als embryo; een homozygote (raszuivere) Manx bestaat dus niet.",
    "Daardoor ontstaan bij elke kruising met een Manx ook kittens met een staart (mm): bij Mm × Mm een derde, bij Mm × mm de helft."],
    model:"Een raszuivere Manx zou MM moeten zijn, maar MM-embryo's sterven. Alle Manx-katten zijn dus Mm en geven de helft van de keren een m door. Twee Manx-katten krijgen daardoor altijd ook kittens met staart (mm).",
    valkuil:"‘Je moet maar lang genoeg doorfokken.’ Selectie helpt hier niet: het MM-genotype is letaal."});
  q.append(think,ans);
},STOF4);
const b5=vraag(1,"polygene overerving",(q,id)=>{
  pre(q,"<p>Als je de lichaamslengte van duizend volwassen mannen meet, vind je geen duidelijke groepen (zoals ‘lang’ en ‘kort’). De lengtes vormen een vloeiende verdeling met de meeste mensen in het midden.</p>");
  const {think,ans,unlock}=start(q,B("Welke verklaring past het best bij deze verdeling?"));
  choiceStep(think,{q:"Bij één gen met twee allelen (dominant-recessief) vind je hooguit twee groepen. Wat gebeurt er met het aantal groepen als er meer genen meedoen?",opts:["het aantal groepen neemt toe","het blijft twee","er komt één groep"],right:0,
    ok:"Ja. En als ook voeding en gezondheid een beetje meetellen, vervagen de grenzen tussen de groepen.",no:"Denk aan twee genen die elk iets langer maken: hoeveel ‘stappen’ zijn er dan mogelijk?",onDone:unlock});
  mc(ans,{qid:id,pts:1,right:1,opts:["Lengte wordt bepaald door één gen met intermediaire overerving.","Lengte wordt bepaald door veel genen samen, en daarnaast door het milieu.","Lengte is niet erfelijk, want er zijn geen groepen.","Bij lengte mengen de allelen van de ouders."],onChecked:()=>waaromBtn(ans,textBox(
    "Eén gen (ook intermediair) geeft hooguit drie groepen. Veel genen die elk een klein beetje bijdragen, geven heel veel tussenstappen; voeding en gezondheid maken het verloop helemaal vloeiend. Dat is <b>polygene</b> overerving, en lengte is wel degelijk erfelijk. Allelen mengen niet. Het antwoord is <b>B</b>."))});
  q.append(think,ans);
},STOF4);
opgave("Bloedgroepen","Verwisseld, staartloos en lang",`
<p>Op een kraamafdeling twijfelt men of twee baby's die op dezelfde dag geboren zijn, verwisseld zijn. Het bloed van de baby's en de ouders wordt onderzocht.</p>
<div class="tablewrap"><table class="data"><tr><th></th><th>moeder</th><th>vader</th></tr>
<tr><td>ouderpaar 1</td><td>bloedgroep AB</td><td>bloedgroep O</td></tr>
<tr><td>ouderpaar 2</td><td>bloedgroep A</td><td>bloedgroep B</td></tr></table></div>
<p>Baby 1 heeft bloedgroep O, baby 2 heeft bloedgroep A.</p>
<p>De bloedgroepen van het AB0-systeem worden bepaald door één gen met de allelen I<sup>A</sup>, I<sup>B</sup> en i.</p>`,[b1,b2,b3,b4,b5]);
}
