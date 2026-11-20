/* ===== Opgave 3: Enzymen in de was (eigen vragen B1, B2, B4 havo / B5 vwo, B6; film 3, film 7) ===== */
{
const STOF_ENZ={titel:"Hoe een enzym werkt",html:`
<p>Een <b>enzym</b> is een eiwit dat een reactie heel veel sneller laat gaan. Het enzym zelf raakt daarbij niet op.</p>
<p>Op één plek heeft een enzym een kuiltje met een precieze vorm: het <b>actieve centrum</b>. De stof die het enzym omzet, heet het <b>substraat</b>. Past het substraat in het actieve centrum, dan knipt het enzym een binding door, met een watermolecuul: <b>hydrolyse</b>. Wat er na de reactie overblijft, zijn de <b>producten</b>.</p>
<p>Hoe snel een enzym werkt, hangt af van de temperatuur en de pH. Bij het <b>optimum</b> werkt het enzym het snelst. Wordt het te warm, dan verandert het enzym blijvend van vorm (<b>denatureren</b>) en past het substraat niet meer.</p>`,
films:[F.enz]};
const STOF_SPEC={titel:"Elk enzym zijn eigen stof",html:`
<p>Elk enzym knipt maar één soort stof: het is <b>substraatspecifiek</b>, zoals een sleutel die maar op één slot past. Daarom heb je voor je eten een hele set ‘scharen’ nodig.</p>
<p>Je herkent ze vaak aan de naam: veel verteringsenzymen eindigen op <b>-ase</b>, en vaak zit het substraat in de naam. Maltose wordt geknipt door maltase, lactose door lactase. Eiwitsplitsende enzymen heten samen <b>proteasen</b>.</p>`,
films:[F.enz]};
const STOF_EIGEN={titel:"Enzympillen en claims",html:`
<p>Je lichaam maakt zelf alle enzymen die nodig zijn om zetmeel, eiwit en vet te verteren. Ze komen uit de speekselklieren, de maagwand, de alvleesklier en de wand van de dunne darm. Een gezond mens heeft dus geen enzymen uit een pil nodig.</p>
<p>Op een verpakking of website mag een fabrikant veel beweren. Zo'n bewering heet een <b>claim</b>. Een claim is nog geen bewijs: of een middel werkt en of het veilig is, moet blijken uit onderzoek. Vraag je bij elke claim af waarop hij rust.</p>`,
films:[F.enz,F.supp]};

const ids=[];
ids.push(vraag(2,"waarom de eigeelvlek eruit gaat",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Leg uit waardoor een eigeelvlek er met dit wasmiddel uit gaat, maar met hetzelfde wasmiddel zonder protease niet. Gebruik de begrippen substraat en product."));
  choiceStep(think,{q:"Wat is het substraat van een enzym?",opts:["de stof die het enzym omzet","de stof die na de reactie overblijft","het kuiltje in het enzym"],right:0,
    ok:"Ja. Welke stof in de eigeelvlek past in het actieve centrum van een protease?",no:"De stof die overblijft is het product; het kuiltje is het actieve centrum.",
    onDone:()=>choiceStep(think,{q:"Wat zijn de producten als een protease een lange eiwitketen knipt?",opts:["kleine stukjes: korte ketens en aminozuren","grotere eiwitten","het enzym zelf"],right:0,
      ok:"Goed. Bedenk nu wat het verschil in grootte betekent voor de vlek in de was.",no:"Een protease knipt eiwit door. Worden de stukken dan groter of kleiner?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Het eiwit uit het eigeel is het <b>substraat</b> van de protease: het past in het actieve centrum en wordt (met water, hydrolyse) <b>geknipt</b>.",
    "De <b>producten</b> zijn kleine stukjes (aminozuren / korte ketens) die in het waswater <b>oplossen en wegspoelen</b>; zonder enzym blijven de lange ketens aan de stof."],
    model:"Het eiwit uit het eigeel is het substraat van de protease. Het past in het actieve centrum en de protease knipt de lange eiwitketens door. De producten zijn kleine stukjes, korte ketens en aminozuren. Die lossen op in het waswater en spoelen weg. Zonder protease blijven de lange eiwitketens aan de stof plakken.",
    valkuil:"‘Het enzym lost de vlek op’ zonder dat het eiwit geknipt wordt: 0 punten."});
  q.append(think,ans);
},STOF_ENZ));

ids.push(vraag(2,"aflezen in de grafiek",(q,id)=>{
  pre(q,"<p>Gebruik de waarden in afbeelding 1.</p>");
  const {think,ans,unlock}=start(q,B("a Bij welke temperatuur ligt het optimum van deze protease?<br>b Iemand wast op 20 °C in plaats van op 40 °C. Hoeveel keer zo hoog is de activiteit bij 40 °C als bij 20 °C?"));
  choiceStep(think,{q:"Wat is het optimum van een enzym?",opts:["de temperatuur waarbij het enzym het snelst werkt","de hoogste temperatuur waarbij het enzym nog werkt","altijd 37 °C, je lichaamstemperatuur"],right:0,
    ok:"Ja. Zoek in afbeelding 1 het hoogste punt.",no:"Het optimum is geen grens en ook niet voor elk enzym hetzelfde.",
    onDone:()=>numStep(think,{uid:"q"+id+"n",q:"Oefen eerst met aflezen: hoeveel procent activiteit heeft de protease bij 30 °C?",right:55,
      ok:"Goed: 55 %. Lees nu de waarden bij 20 °C en 40 °C af en deel de grootste door de kleinste.",no:"Zoek 30 op de horizontale as en kijk welk getal bij dat punt staat.",onDone:unlock})});
  NUM(ans,{id,fields:[
    ["a optimum","°C",v=>v===50,"het optimum ligt bij 50 °C (activiteit 100 %)"],
    ["b keer zo hoog","keer",v=>v>=2.5&&v<=3,"80 / 30 = 2,7 keer (ongeveer 2,5 tot 3 is goed)"]],
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"a Het hoogste punt van de kromme ligt bij <b>50 °C</b>: activiteit 100 %. Daar werkt de protease het snelst: het optimum.",hl:[50],opt:true},
      {cap:"b Bij 20 °C is de activiteit 30 %, bij 40 °C 80 %.",hl:[20,40],lijn:true},
      {cap:"80 / 30 = <b>2,7</b>: bij 40 °C knipt de protease bijna drie keer zo snel. Kouder wassen kan wel, maar de vlek gaat er minder goed uit.",hl:[20,40],lijn:true}],
      (st,s)=>st.innerHTML=GRAFIEK({hl:s.hl,lijn:s.lijn,opt:s.opt})))});
  q.append(think,ans);
},STOF_ENZ));

if(!VWO)ids.push(vraag(1,"een vlek van boter",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Een vlek van boter gaat er met dit wasmiddel slecht uit. Welk enzym moet de fabrikant toevoegen?"));
  choiceStep(think,{q:"Waaruit bestaat boter vooral?",opts:["uit eiwit","uit vet","uit zetmeel"],right:1,
    ok:"Ja. En waarom helpt de protease die er al in zit dan niet?",no:"Boter maak je van room: het vetste deel van melk.",onDone:unlock});
  mc(ans,{qid:id,pts:1,right:1,opts:["amylase","lipase","maltase","nog meer protease"],onChecked:()=>waaromBtn(ans,textBox(
    "Boter is vooral vet. Vet wordt geknipt door <b>lipase</b> (in glycerol en vetzuren). Amylase knipt zetmeel, maltase knipt maltose. Meer protease helpt niet: een protease knipt alleen eiwit, want elk enzym is substraatspecifiek. Het antwoord is <b>B</b>."))});
  q.append(think,ans);
},STOF_SPEC));

if(VWO)ids.push(vraag(2,"knippen in het midden of aan het uiteinde",(q,id)=>{
  pre(q,"<p>De fabrikant kan kiezen uit een protease die eiwitketens midden in de keten knipt en een protease die steeds één aminozuur van het uiteinde knipt.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit welke protease een eiwitvlek het snelst losmaakt."));
  choiceStep(think,{q:"Wanneer lossen de eiwitketens van de vlek op in het waswater?",opts:["pas als ze helemaal in losse aminozuren geknipt zijn","als ze in stukken geknipt zijn die klein genoeg zijn","als ze van vorm veranderen"],right:1,
    ok:"Ja: korte stukken lossen al op. Vergelijk nu wat één knip doet bij elke protease.",no:"Ook korte ketens van een paar aminozuren lossen al op.",
    onDone:()=>choiceStep(think,{q:"Een keten van 100 aminozuren wordt één keer midden in de keten geknipt. Wat levert dat op?",opts:["twee stukken van ongeveer 50 aminozuren","een stuk van 99 aminozuren en één los aminozuur","100 losse aminozuren"],right:0,
      ok:"Goed. Bedenk nu wat één knip aan het uiteinde oplevert, en welke protease dus sneller kleine stukken maakt.",no:"Knippen in het midden verdeelt de keten in twee delen.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "De protease die <b>midden in de keten</b> knipt (endopeptidase): elke knip breekt een lange keten in <b>twee kortere stukken</b>.",
    "Na weinig knippen zijn de stukken <b>klein genoeg om op te lossen</b>; aan het uiteinde knippen (exopeptidase) maakt de keten per knip maar <b>één aminozuur korter</b>."],
    model:"De protease die midden in de keten knipt, een endopeptidase. Elke knip maakt van een lange keten twee kortere stukken, dus na een paar knippen zijn de stukken al klein genoeg om op te lossen. Een exopeptidase knipt per keer maar één aminozuur van het uiteinde: de lange keten wordt per knip maar één aminozuur korter en blijft lang aan de stof plakken."});
  q.append(think,ans);
},STOF_ENZ));

ids.push(vraag(2,"enzympillen: natuurlijk en 8 van de 10",(q,id)=>{
  pre(q,"<p>Dezelfde fabrikant verkoopt ook “enzympillen voor een betere spijsvertering”, met protease, amylase en lipase uit planten. Op de website staat: “100 % natuurlijk, dus veilig. 8 van de 10 klanten voelen zich minder opgeblazen.” (fictieve gegevens)</p>");
  const {think,ans,unlock}=start(q,B("Geef bij elk van de twee beweringen een kritische opmerking."));
  chipsStep(think,{q:"Welke vragen stel je bij een claim? Kies alles wat klopt.",items:[["Vergeleken met wat?",1],["Hoeveel effect?",1],["Wie betaalde het onderzoek?",1],["Ziet de verpakking er betrouwbaar uit?",0]],
    ok:"Goed. Gebruik die vragen bij de tweede bewering.",no:"Eén keuze zegt niets over of een middel werkt.",
    onDone:()=>choiceStep(think,{q:"Waaruit kun je afleiden dat een pil veilig is?",opts:["uit goed onderzoek naar de werking en de bijwerkingen","uit de plek waar de stof vandaan komt","uit het aantal mensen dat de pil koopt"],right:0,
      ok:"Ja. Denk nu aan een voorbeeld uit de film over supplementen, en bedenk wat dat zegt over de eerste bewering.",no:"Ook planten maken stoffen die schadelijk kunnen zijn.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "“Natuurlijk, dus veilig”: <b>natuurlijk is niet automatisch veilig</b> (bijvoorbeeld bètacaroteenpillen gaven rokers meer longkanker).",
    "“8 van de 10 klanten”: zonder <b>controlegroep met een placebo</b> weet je niet hoeveel klanten zich ook zonder pil beter hadden gevoeld (placebo-effect) / de fabrikant verdient eraan."],
    model:"Bij ‘natuurlijk, dus veilig’: een natuurlijke stof is niet automatisch veilig. Bètacaroteen komt uit wortels, maar pillen ervan gaven rokers juist meer longkanker. Bij ‘8 van de 10 klanten’: er is geen controlegroep die een placebo kreeg. Door het placebo-effect hadden misschien ook zonder pil veel klanten zich beter gevoeld. Bovendien verdient de fabrikant aan de pillen."});
  q.append(think,ans);
},STOF_EIGEN));

opgave("Enzymen in de was","Enzymen in de was",`
<p>Een wasmiddel bevat een protease: een enzym dat eiwitten knipt. Een vlek van eigeel of bloed bestaat voor een groot deel uit eiwit. De lange eiwitketens plakken aan de stof.</p>
<p>Een fabrikant meet hoe actief de protease uit zijn wasmiddel is bij verschillende temperaturen. In afbeelding 1 staat het resultaat.</p>
<div class="eyebrow">afbeelding 1 (fictieve, vereenvoudigde gegevens)</div>${GRAFIEK()}`,ids);
}
