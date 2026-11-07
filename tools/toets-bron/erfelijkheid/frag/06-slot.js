/* ===== Opgave 6: havo kansen + gekoppelde genen; vwo reukerwt (eigen vragen C10–C14) ===== */
{
if(!VWO){
const STOF6={titel:"Kansrekenen en gekoppelde genen",html:`
<p><b>Productregel:</b> de kans dat twee onafhankelijke dingen allebei gebeuren, is het product van de twee kansen. <b>Somregel:</b> de kans dat het ene óf het andere gebeurt (en ze sluiten elkaar uit), is de som van de kansen.</p>
<p>Genen die op <b>hetzelfde chromosoom</b> liggen, heten <b>gekoppeld</b>. Liggen twee genen op <b>verschillende chromosomen</b>, dan erven ze onafhankelijk van elkaar over.</p>`,films:[F.stam,F.di]};
const d1=vraag(1,"kans op drager",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Hoe groot is de kans dat Eva drager is van PKU?"));
  choiceStep(think,{q:"Welk genotype hebben Eva's ouders?",opts:["allebei AA","allebei Aa","de een Aa, de ander aa"],right:1,ok:"Ja: ze zijn gezond en hebben een zoon met PKU (aa).",no:"Hun zoon is aa. Van wie kreeg hij die a's? En de ouders zijn zelf gezond.",
    onDone:()=>choiceStep(think,{q:"Eva is gezond. Welk vakje van het schema Aa × Aa valt voor haar af?",opts:["AA","Aa","aa"],right:2,ok:"Goed. Hoeveel van de drie overgebleven vakjes zijn Aa?",no:"Welk genotype geeft PKU?",onDone:unlock})});
  mc(ans,{qid:id,pts:1,right:2,opts:["1/4","1/2","2/3","3/4"],onChecked:()=>waaromBtn(ans,b=>stepAnim(b,[{cap:"Haar ouders zijn Aa × Aa: 1 AA : 2 Aa : 1 aa.",t:0},{cap:"Eva is gezond: het vakje aa valt weg.",t:1},{cap:"Van de drie vakjes die overblijven, zijn er twee Aa: <b>2/3</b>. Het antwoord is <b>C</b>.",t:2}],
    (st,s)=>st.innerHTML=PUN(["A","a"],["A","a"],[["AA","Aa"],["Aa",s.t?"✕":"aa"]],{kopT:"vader Aa",kopL:"moeder Aa",kleur:c=>c==="✕"?"var(--koraal-soft)":s.t===2&&c==="Aa"?"var(--goud-soft)":""})))});
  q.append(think,ans);
},STOF6);
const d2=vraag(2,"kans op een kind met PKU",(q,id)=>{
  pre(q,"<p>Eva en Daan willen een kind.</p>");
  const {think,ans,unlock}=start(q,B("Hoe groot is de kans dat hun eerste kind PKU heeft?"));
  choiceStep(think,{q:"Wat moet er allemaal gebeuren voordat hun kind PKU (aa) heeft?",opts:["Eva is drager én Eva geeft a door én Daan geeft a door","alleen: Daan geeft a door","Eva is drager óf Daan is drager"],right:0,
    ok:"Ja: drie dingen tegelijk. Welke kansen horen daarbij?",no:"Het kind heeft van allebei de ouders een a nodig. En weten we zeker dat Eva een a heeft?",
    onDone:()=>selectsStep(think,{uid:"q"+id,q:"Vul de kansen in.",rows:[["Eva is drager",["1/4","1/2","2/3"],2],["Eva geeft a door (als ze drager is)",["1/4","1/2","2/3"],1],["Daan geeft a door",["1/4","1/2","1"],1]],
      ok:"Goed. Vermenigvuldig ze nu.",no:"Daan is zeker drager (Aa): hoe vaak geeft hij a door?",onDone:unlock})});
  mc(ans,{qid:id,pts:2,right:1,opts:["1/4","1/6","1/8","1/12"],onChecked:()=>waaromBtn(ans,textBox(
    "Kans dat Eva drager is: 2/3. Kans dat zij dan a doorgeeft: ½. Kans dat Daan a doorgeeft: ½. Samen: 2/3 × ½ × ½ = 2/12 = <b>1/6</b>. Wie 1/4 kiest, rekent Eva als zeker drager; wie 1/8 kiest, neemt ½ voor de kans dat Eva drager is. Het antwoord is <b>B</b>."))});
  q.append(think,ans);
},STOF6);
const d3=vraag(2,"gekoppelde genen bij maïs",(q,id)=>{
  pre(q,"<p>Bij maïs liggen het gen voor de kleur van de korrel (gekleurd C, kleurloos c) en het gen voor de vorm van de korrel (glad S, gerimpeld s) op hetzelfde chromosoom. Een maïsplant heeft het genotype CcSs. Daarbij liggen C en S samen op het ene chromosoom, en c en s samen op het homologe chromosoom. Ga ervan uit dat er geen crossing-over optreedt.</p>");
  const {think,ans,unlock}=start(q,B("Welke geslachtscellen maakt deze plant? En hoeveel soorten geslachtscellen zou een plant met het genotype CcSs maken als de twee genen op verschillende chromosomen lagen?"));
  choiceStep(think,{q:"Bij de vorming van geslachtscellen krijgt elke geslachtscel één chromosoom van elk paar. Wat gebeurt er met de allelen C en S, die samen op één chromosoom liggen?",opts:["ze gaan altijd samen naar dezelfde geslachtscel","ze worden over twee geslachtscellen verdeeld"],right:0,
    ok:"Ja: het chromosoom gaat in zijn geheel mee.",no:"Een chromosoom wordt bij de vorming van geslachtscellen niet in stukken verdeeld (zonder crossing-over).",
    onDone:()=>choiceStep(think,{q:"Bij genen op verschillende chromosomen: kan C dan samen met s in een geslachtscel komen?",opts:["ja, de chromosoomparen worden los van elkaar verdeeld","nee, nooit"],right:0,ok:"Goed. Hoeveel combinaties zijn er dan?",no:"De twee chromosoomparen liggen in meiose I los van elkaar in het evenaarsvlak.",onDone:unlock})});
  selectAnswer(ans,{id,uid:"q"+id,rows:[["geslachtscellen van deze plant",["CS en cs","Cs en cS","CS, Cs, cS en cs","Cc en Ss"],0],["aantal soorten bij genen op verschillende chromosomen",["1","2","3","4"],3]],score:n=>n,
    after:()=>waaromBtn(ans,textBox("Gekoppeld: het chromosoom met C en S gaat in zijn geheel naar een geslachtscel, net als het chromosoom met c en s. Er ontstaan dus alleen <b>CS</b> en <b>cs</b>. Op verschillende chromosomen worden de paren los van elkaar verdeeld: CS, Cs, cS en cs, dus <b>4</b> soorten, elk met kans ¼."))});
  q.append(think,ans);
},STOF6);
opgave("Kansen","Fenylketonurie en maïs",`
<p>Fenylketonurie (PKU) is een erfelijke stofwisselingsziekte. Mensen met PKU kunnen het aminozuur fenylalanine niet goed afbreken. PKU erft autosomaal recessief over (allel a).</p>
<p>Eva heeft geen PKU, maar haar broer wel. Haar ouders hebben geen PKU. Eva's partner Daan heeft zich laten testen: hij is drager van PKU (Aa).</p>`,[d1,d2,d3]);
}else{
const STOF6={titel:"Gekoppelde genen en crossing-over",html:`
<p>Genen die op <b>hetzelfde chromosoom</b> liggen, zijn <b>gekoppeld</b>: zonder crossing-over gaan hun allelen samen naar een geslachtscel.</p>
<p>Bij <b>crossing-over</b> wisselen in meiose I twee chromatiden van homologe chromosomen een stuk uit. Daardoor ontstaan geslachtscellen met een <b>nieuwe combinatie</b> van allelen (<b>recombinant</b>), naast geslachtscellen met de oude combinaties. Recombinante geslachtscellen zijn bij gekoppelde genen in de minderheid.</p>
<p>Bij genen op verschillende chromosomen verwacht je bij een dihybride F2 de verhouding 9 : 3 : 3 : 1.</p>`,films:[F.di]};
const TAB=`<div class="eyebrow">tabel 1</div><div class="tablewrap"><table class="data"><tr><th>fenotype F2</th><th>aantal planten</th></tr><tr><td>paars, lang</td><td>284</td></tr><tr><td>paars, rond</td><td>21</td></tr><tr><td>rood, lang</td><td>21</td></tr><tr><td>rood, rond</td><td>55</td></tr><tr><td><b>totaal</b></td><td><b>381</b></td></tr></table></div>`;
const e1=vraag(1,"verwachting 9 : 3 : 3 : 1",(q,id)=>{
  pre(q,"<p>De onderzoekers verwachtten de verhouding 9 : 3 : 3 : 1, omdat ze ervan uitgingen dat de twee genen onafhankelijk van elkaar overerven.</p>");
  const {think,ans,unlock}=start(q,B("Bereken hoeveel F2-planten met rode bloemen en rond stuifmeel ze dan verwachtten."));
  choiceStep(think,{q:"Welk deel van de 9 : 3 : 3 : 1 is rood en rond (ppll)?",opts:["9/16","3/16","1/16"],right:2,ok:"Ja: alleen het ene vakje met twee keer recessief.",no:"Rood en rond zijn allebei recessief.",onDone:unlock});
  numAnswer(ans,{id,fields:[["verwacht aantal rood, rond","planten",v=>v>=23&&v<=24.5,"1/16 × 381 = 23,8 (23 of 24 is ook goed)"]],
    after:()=>waaromBtn(ans,textBox("Rood en rond is ppll: 1/16 van de F2. 1/16 × 381 = <b>23,8</b>, dus ongeveer 24 planten. Gevonden werden er 55: meer dan twee keer zoveel."))});
  q.append(think,ans);
},STOF6);
const e2=vraag(2,"gekoppelde genen verklaren",(q,id)=>{
  pre(q,"<p>Er werden veel meer planten met rode bloemen en rond stuifmeel gevonden dan verwacht.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit hoe dat komt. Gebruik in je uitleg de allelen op de chromosomen van de F1-planten."));
  choiceStep(think,{q:"De F1 ontstond uit PPLL × ppll. Welke allelen liggen bij de F1 samen op één chromosoom, als de genen gekoppeld zijn?",opts:["P met L, en p met l","P met l, en p met L"],right:0,ok:"Ja: elke ouder gaf één chromosoom mee, met PL of met pl.",no:"Wat zat er in de geslachtscellen van de raszuivere ouders?",
    onDone:()=>choiceStep(think,{q:"Welke geslachtscellen maakt de F1 dan vooral?",opts:["PL en pl","Pl en pL","alle vier even vaak"],right:0,ok:"Goed. Wat betekent dat voor de kans dat twee pl-geslachtscellen samensmelten?",no:"Zonder crossing-over gaat een chromosoom in zijn geheel mee.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:["De genen liggen <b>gekoppeld</b> op hetzelfde chromosoom: de F1 heeft P en L samen op het ene chromosoom en p en l samen op het homologe chromosoom.","Daardoor maakt de F1 vooral geslachtscellen met <b>PL en pl</b> (elk meer dan ¼); de kans dat twee pl-geslachtscellen samensmelten (ppll) is dan <b>groter dan 1/16</b>."],
    model:"De genen liggen op hetzelfde chromosoom. De F1 heeft PL op het ene en pl op het andere chromosoom. Die gaan meestal in hun geheel naar een geslachtscel, dus ruim een kwart van de geslachtscellen is pl. De kans op ppll (pl × pl) is dan veel groter dan 1/16.",
    valkuil:"Alleen ‘de genen zijn gekoppeld’ zonder het gevolg voor de geslachtscellen (alleen het eerste punt). ‘Er is crossing-over opgetreden’ als verklaring voor de grote groep levert 0 punten op: crossing-over maakt juist de kleine groepen."});
  q.append(think,ans);
},STOF6);
const e3=vraag(2,"welke planten zijn recombinant?",(q,id)=>{
  pre(q,"<p>Van sommige F2-planten weet je zeker dat ze zijn ontstaan uit minstens één geslachtscel waarin crossing-over tussen de twee genen heeft plaatsgevonden.</p>");
  const {think,ans,unlock}=start(q,B("Welke F2-planten zijn dat?"));
  chipsStep(think,{q:"Welke geslachtscellen van de F1 (PL/pl) zijn recombinant? Kies alles wat klopt.",items:[["PL",0],["pl",0],["Pl",1],["pL",1]],ok:"Goed. Welke fenotypen kunnen <b>alleen</b> ontstaan als er zo'n geslachtscel meedoet?",no:"Recombinant = een combinatie die in de F1 niet samen op één chromosoom lag.",
    onDone:()=>choiceStep(think,{q:"Kan een plant met rode bloemen en rond stuifmeel (ppll) ontstaan zonder crossing-over?",opts:["ja, uit pl × pl","nee, daar is altijd een recombinante geslachtscel voor nodig"],right:0,ok:"Juist: ppll kan gewoon uit twee ouderlijke pl-geslachtscellen ontstaan.",no:"Welke twee geslachtscellen geven samen ppll?",onDone:unlock})});
  mc(ans,{qid:id,pts:2,right:2,opts:["alleen de planten met rode bloemen en rond stuifmeel","alleen de planten met paarse bloemen en rond stuifmeel","de planten met paarse bloemen en rond stuifmeel en de planten met rode bloemen en lang stuifmeel","de planten met paarse bloemen en rond stuifmeel, de planten met rode bloemen en lang stuifmeel en de planten met rode bloemen en rond stuifmeel"],onChecked:()=>waaromBtn(ans,textBox(
    "Paars-rond (P..ll) vraagt een geslachtscel met P én l: Pl. Rood-lang (ppL.) vraagt pL. Dat zijn recombinante combinaties. Rood-rond (ppll) ontstaat uit pl × pl, twee ouderlijke combinaties; paars-lang kan uit PL ontstaan. Het antwoord is <b>C</b>."))});
  q.append(think,ans);
},STOF6);
const e4=vraag(2,"terugkruising en crossing-over",(q,id)=>{
  pre(q,"<p>Uit een F2 kun je het percentage crossing-over moeilijk aflezen. Daarom kruist een onderzoeker F1-planten met planten met rode bloemen en rond stuifmeel (ppll). Hij vindt: paars-lang 380, paars-rond 120, rood-lang 116, rood-rond 384 (fictieve gegevens).</p>");
  const {think,ans,unlock}=start(q,B("Leg uit waarom je bij deze kruising het percentage crossing-over direct uit de nakomelingen kunt aflezen, en bereken het percentage recombinante nakomelingen."));
  choiceStep(think,{q:"Welke geslachtscellen maakt de ppll-plant?",opts:["alleen pl","pl en PL","vier soorten"],right:0,ok:"Ja. Het fenotype van elke nakomeling verraadt dus welke geslachtscel de F1-plant leverde.",no:"De plant is voor beide genen homozygoot recessief.",
    onDone:()=>chipsStep(think,{q:"Welke groepen nakomelingen zijn recombinant? Kies alles wat klopt.",items:[["paars-lang (380)",0],["paars-rond (120)",1],["rood-lang (116)",1],["rood-rond (384)",0]],ok:"Goed. Reken nu het percentage uit van het totaal.",no:"Recombinant zijn de nieuwe combinaties: Pl en pL.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:["De ppll-plant levert alleen geslachtscellen met <b>pl</b>, dus het fenotype van elke nakomeling laat zien welke allelencombinatie de geslachtscel van de F1-plant had.","(120 + 116) / 1000 × 100% = <b>23,6%</b>."],
    model:"De ppll-plant geeft alleen pl door; die allelen verbergen niets. Elk fenotype toont dus direct de geslachtscel van de F1. Recombinant zijn paars-rond en rood-lang: (120 + 116) / 1000 = 23,6%.",
    valkuil:"Alle ‘afwijkende’ of alle recessieve groepen meetellen (bijvoorbeeld met rood-rond erbij: 62,0%)."});
  q.append(think,ans);
},STOF6);
const e5=vraag(2,"andere ligging, andere F2",(q,id)=>{
  pre(q,"<p>Een andere onderzoeker kruist raszuivere reukerwten met paarse bloemen en rond stuifmeel (PPll) met raszuivere reukerwten met rode bloemen en lang stuifmeel (ppLL). De F1 plant zich voort door zelfbestuiving. Het percentage crossing-over is hetzelfde als in vraag "+e4+".</p>");
  const {think,ans,unlock}=start(q,B("Welk fenotype of welke fenotypen komen in deze F2 het minst voor?"));
  choiceStep(think,{q:"Welke allelen liggen nu bij de F1 samen op één chromosoom?",opts:["P met L, en p met l","P met l, en p met L"],right:1,ok:"Ja: de ouders gaven Pl en pL mee.",no:"Kijk naar de raszuivere ouders van deze F1.",
    onDone:()=>choiceStep(think,{q:"Is een geslachtscel met pl nu ouderlijk of recombinant?",opts:["ouderlijk, dus vaak","recombinant, dus zeldzaam (ongeveer 12%)"],right:1,ok:"Goed. Welk fenotype heeft twee pl-geslachtscellen nodig?",no:"Recombinant is wat niet samen op een chromosoom van de F1 lag.",onDone:unlock})});
  mc(ans,{qid:id,pts:2,right:0,opts:["rood, rond","paars, rond en rood, lang","paars, lang"],onChecked:()=>waaromBtn(ans,textBox(
    "De F1 heeft nu Pl op het ene en pL op het andere chromosoom. Een pl-geslachtscel is dan recombinant: ongeveer 23,6% / 2 ≈ 12%. Rood-rond (ppll) vraagt twee pl-geslachtscellen: ongeveer 0,118 × 0,118 ≈ 1,4%, veel minder dan 1/16. Paars-rond en rood-lang komen elk op ongeveer 24%, paars-lang op ongeveer 51%. Het antwoord is <b>A</b>."))});
  q.append(think,ans);
},STOF6);
opgave("Reukerwt","Paarse reukerwten met lang stuifmeel",`
<p>Bij de reukerwt (<i>Lathyrus odoratus</i>) is het allel voor paarse bloemen (P) dominant over het allel voor rode bloemen (p). Het allel voor lange stuifmeelkorrels (L) is dominant over het allel voor ronde stuifmeelkorrels (l).</p>
<p>Begin twintigste eeuw kruisten de Britse onderzoekers Bateson, Saunders en Punnett raszuivere reukerwten met paarse bloemen en lang stuifmeel met raszuivere reukerwten met rode bloemen en rond stuifmeel. Alle F1-planten hadden paarse bloemen en lang stuifmeel. De F1-planten werden door zelfbestuiving voortgeplant. Tabel 1 geeft de aantallen F2-planten per fenotype.</p>${TAB}`,[e1,e2,e3,e4,e5]);
}
}
