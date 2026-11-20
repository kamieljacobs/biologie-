/* ===== Opgave 4: Mutaties en kanker (havo: KD09, KD13 · vwo: KD07, KD11) ===== */
{
const STOF_MUT={titel:"Mutaties, allelen en kanker",html:`
<p>Een <b>mutatie</b> is een verandering in de basenvolgorde van het DNA: een kopieerfout, of schade die niet hersteld is. Straling en sommige stoffen laten mutaties vaker ontstaan (<b>mutagene factoren</b>). Mutaties ontstaan toevallig, op willekeurige plekken.</p>
<p>Alleen een mutatie in een geslachtscel (of heel vroeg in het embryo) kan worden doorgegeven aan nakomelingen.</p>
<p>Een cel heeft verschillende ‘remmen’ op de celdeling. Als genen die de deling regelen veranderen, kan een cel ongeremd gaan delen: een <b>tumor</b>. Blijft een tumor op zijn plek, dan is hij goedaardig; groeit hij in het weefsel eromheen en kan hij uitzaaien, dan is hij kwaadaardig.</p>`+(VWO?`
<p>Mutaties zijn er in verschillende maten: één base (puntmutatie), een stuk van een chromosoom, of het aantal chromosomen.</p>`:""),
films:[F.mut]};
const STOF_KANKER={titel:"Remmen op de celdeling",html:`
<p>Een gewone cel deelt niet eindeloos: ze heeft verschillende ‘remmen’ op de celdeling. Gaan door mutaties genoeg van die remmen kapot, dan kan een cel ongeremd gaan delen en ontstaat er een <b>tumor</b>.</p>
<p>Niet elke tumor is even gevaarlijk: het verschil zit in wat de tumor doet met het weefsel eromheen.</p>
<p>Hoe vaak mutaties ontstaan, hangt ook af van de omgeving.</p>`,films:[F.mut]};
const ids=[];
if(!VWO){
ids.push(vraag(1,"mutaties en allelen",(q,id)=>{
  const {think,ans,unlock}=startLos(q,B("Welke uitspraak over mutaties en allelen klopt?")+"<br><br>"+L4("Een mutatie ontstaat als een organisme een nieuw allel nodig heeft.","Alle allelen zijn ooit door een mutatie ontstaan.","Nieuwe allelen ontstaan bij de meiose; mutaties beschadigen alleen bestaande allelen.","Alleen mutaties in huidcellen leveren nieuwe allelen op."));
  choiceStep(think,{q:"Wat is een allel?",opts:["een variant van een gen, met een iets andere basenvolgorde","een chromosoom","een eiwit"],right:0,
    ok:"Ja. Waardoor kan een basenvolgorde veranderen?",no:"Een gen kan in meerdere varianten bestaan.",
    onDone:()=>choiceStep(think,{q:"Wat gebeurt er bij de meiose met de allelen?",opts:["er ontstaan nieuwe basenvolgordes","de bestaande allelen worden opnieuw verdeeld en gecombineerd"],right:1,
      ok:"Goed. Kies nu de uitspraak die klopt.",no:"Bij de meiose worden chromosomen (en stukken ervan) verdeeld; de basenvolgorde zelf blijft gelijk.",onDone:unlock})});
  mc(ans,{qid:id,pts:1,right:1,opts:["Een mutatie ontstaat als een organisme een nieuw allel nodig heeft.","Alle allelen zijn ooit door een mutatie ontstaan.","Nieuwe allelen ontstaan bij de meiose; mutaties beschadigen alleen bestaande allelen.","Alleen mutaties in huidcellen leveren nieuwe allelen op."],
    onChecked:()=>waaromBtn(ans,textBox("<b>B</b>. Een nieuw allel is een gen met een andere basenvolgorde, en die verandert alleen door een mutatie. A: mutaties ontstaan toevallig, niet omdat ze nodig zijn. C: bij de meiose worden bestaande allelen opnieuw verdeeld. D: een mutatie in een huidcel wordt niet doorgegeven."))});
  q.append(think,ans);
},STOF_MUT));

ids.push(vraag(2,"begrippen bij kanker",(q,id)=>{
  const R=["1 een cel met te veel DNA-schade valt netjes uiteen in blaasjes","2 zorgt dat een gewone cel maar een beperkt aantal keren kan delen","3 een tumor die het weefsel eromheen ingroeit","4 straling of een stof die mutaties vaker laat ontstaan"];
  const O=["A apoptose","B kwaadaardige tumor","C mutagene factor","D telomeren"];
  const {think,ans,unlock}=startLos(q,B("Welk begrip hoort bij de beschrijving? Gebruik elke letter één keer.")+"<br><br>"+R.join("<br>")+"<br><br>"+O.join("<br>"));
  chipsStep(think,{q:"Welke van deze begrippen zijn een ‘rem’ die ervoor zorgt dat cellen niet eindeloos blijven delen? Kies alles wat klopt.",items:[["apoptose",1],["telomeren",1],["kwaadaardige tumor",0],["mutagene factor",0]],
    ok:"Goed: twee remmen. Koppel nu alle vier de begrippen.",no:"Een tumor en een mutagene factor remmen de deling niet.",onDone:unlock});
  selectAnswer(ans,{id,uid:"q"+id,rows:R.map((r,k)=>[r,O,[0,3,1,2][k]]),score:KOPPELSCORE("q"+id),
    after:()=>waaromBtn(ans,textBox("1A apoptose: de cel ruimt zichzelf op. 2D telomeren: de beschermende uiteinden worden bij elke deling korter; zijn ze te kort, dan stopt de cel met delen. 3B kwaadaardige tumor: groeit in het weefsel eromheen en kan uitzaaien. 4C mutagene factor, zoals UV-licht of stoffen in sigarettenrook."))});
  q.append(think,ans);
},STOF_KANKER));
}else{
ids.push(vraag(3,"hoe een tumor ontstaat",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Leg uit hoe een tumor ontstaat, en waarom daarvoor meerdere mutaties in dezelfde cel nodig zijn. Gebruik de begrippen apoptose en telomeren."));
  choiceStep(think,{q:"Een tumor is een klomp cellen die blijft groeien. In welke genen moet een mutatie zitten om dat te veroorzaken?",opts:["in genen voor de kleur van de cel","in genen die de celdeling besturen","in genen voor het celmembraan"],right:1,
    ok:"Ja.",no:"Het gaat om cellen die te vaak delen.",
    onDone:()=>choiceStep(think,{q:"Mutaties ontstaan toevallig, op willekeurige plekken in het DNA. Hoe vaak treft één mutatie precies een gen dat de deling regelt?",opts:["bijna altijd","zelden"],right:1,
      ok:"Ja. Bedenk nu welke remmen een cel heeft op de deling, en wat dat betekent voor het aantal mutaties dat nodig is.",no:"Het DNA bevat heel veel genen; de genen die de deling regelen zijn er maar een paar.",onDone:unlock})});
  openAnswer(ans,{id,pts:3,checks:[
    "door mutaties gaan genen kapot die de <b>celdeling besturen</b> (aanzetten of remmen); de cel en haar dochtercellen blijven delen: een klomp cellen",
    "een cel heeft meer dan één rem; een cel met te veel DNA-schade ruimt zichzelf op (<b>apoptose</b>): ook die rem moet uitstaan",
    "<b>telomeren</b> worden bij elke deling korter; zijn ze te kort, dan stopt de cel met delen, dus ook die grens moet omzeild worden (bijvoorbeeld doordat kankercellen telomerase aanzetten)"],
    model:"Door mutaties veranderen genen die de celdeling aanzetten of remmen, zodat een cel en haar dochtercellen blijven delen: een tumor. Maar een cel heeft meerdere remmen. Een cel met veel DNA-schade ruimt zichzelf op door apoptose; die rem moet ook uitstaan. En bij elke deling worden de telomeren korter, tot de cel stopt met delen; kankercellen zetten telomerase aan, waardoor de telomeren weer langer worden. Voor elke rem is een eigen mutatie nodig, dus meerdere mutaties in dezelfde cel.",
    after:()=>waaromBtn(ans,textBox("Denk aan een auto met meerdere remmen: pas als ze allemaal kapot zijn, rijdt hij door. Gaspedaal vast (gen dat de deling aanzet), rem kapot (gen dat de deling remt), <b>apoptose</b> uit, en de ‘teller’ van de <b>telomeren</b> omzeild. Omdat elke mutatie toevallig is, duurt het lang voordat één cel ze allemaal heeft; daarom komt kanker vooral op latere leeftijd voor."))});
  q.append(think,ans);
},STOF_MUT));

ids.push(vraag(1,"chromosoommutatie of genoommutatie",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Wat is het verschil tussen een chromosoommutatie en een genoommutatie?"));
  choiceStep(think,{q:"Wat is het genoom van een cel?",opts:["één gen","al het DNA, dus alle chromosomen van de cel","één chromosoom"],right:1,
    ok:"Ja. Een genoommutatie raakt dus het geheel; een chromosoommutatie één chromosoom.",no:"Genoom = alles.",onDone:unlock});
  openAnswer(ans,{id,pts:1,checks:["chromosoommutatie: een <b>stuk van een chromosoom</b> verandert (valt weg, verdubbelt of komt op een ander chromosoom); genoommutatie: het <b>aantal chromosomen</b> verandert"],
    model:"Bij een chromosoommutatie verandert de bouw van een chromosoom: een stuk valt weg, verdubbelt of komt op een ander chromosoom. Bij een genoommutatie verandert het aantal chromosomen, zoals bij trisomie 21.",
    valkuil:"Beide kanten moeten kloppen voor het punt.",
    after:()=>waaromBtn(ans,textBox("Van klein naar groot: <b>puntmutatie</b> (één base) → <b>chromosoommutatie</b> (een stuk van een chromosoom) → <b>genoommutatie</b> (een heel chromosoom te veel of te weinig, bijvoorbeeld door non-disjunctie bij de meiose)."))});
  q.append(think,ans);
},STOF_MUT));
}
opgave("Mutaties","Mutaties en kanker","",ids);
}
