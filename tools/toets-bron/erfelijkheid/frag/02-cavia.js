/* ===== Opgave: Cavia's (havo monohybride, vwo dihybride) ===== */
{
const STOF2={titel:"Kruisen, kansen en de terugkruising",html:`
<p>Bij een kruising geeft elke ouder via een geslachtscel <b>één allel</b> van elk gen door. Een heterozygote ouder (bijvoorbeeld Aa) maakt evenveel geslachtscellen met A als met a. In een <b>kruisingsschema</b> zet je de geslachtscellen van de ene ouder boven en die van de andere ouder links; elk vakje is een even grote kans.</p>
<p>Een kruisingsschema geeft <b>kansen</b>, geen vaste aantallen: bij weinig nakomelingen kan de uitkomst flink afwijken van de verwachte verhouding.</p>
<p>Van een dier met het dominante fenotype weet je niet direct of het homozygoot of heterozygoot is. Dat test je met een <b>terugkruising</b>: een kruising met een partner die zelf niets ‘verbergt’, zodat je aan de nakomelingen direct kunt zien welke allelen het geteste dier doorgeeft.</p>`+(VWO?`
<p>Liggen twee genen op <b>verschillende chromosomen</b>, dan erven ze onafhankelijk van elkaar over. Je mag dan per gen een kans uitrekenen en die kansen vermenigvuldigen (<b>productregel</b>). Bij de vorming van geslachtscellen worden de allelen van het ene gen dan willekeurig gecombineerd met die van het andere gen.</p>`:""),
films:VWO?[F.mono,F.di]:[F.mono,F.stam]};

const ids=[];
if(!VWO){
ids.push(vraag(2,"monohybride kruising",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Ilse kruist haar twee kortharige cavia's met elkaar. Wat is het genotype van de ouders? En in welke verhouding verwacht je kortharige en langharige jongen?"));
  choiceStep(think,{q:"Elke ouder heeft een langharige moeder. Welk allel kreeg elke ouder zeker van die moeder?",opts:["L","l","dat weet je niet"],right:1,
    ok:"Ja: een langharige cavia is ll en kan alleen l doorgeven. De ouders zijn kortharig, dus hun andere allel is L.",no:"Welk genotype heeft een langharige cavia? Wat kan zij dan doorgeven?",
    onDone:()=>chipsStep(think,{q:"Welke geslachtscellen maakt een cavia met het genotype Ll? Kies alles wat klopt.",items:[["L",1],["l",1],["Ll",0],["LL",0]],
      ok:"Goed: de helft L, de helft l. Zet ze nu in een kruisingsschema.",no:"Een geslachtscel krijgt maar één allel van elk gen.",onDone:unlock})});
  selectAnswer(ans,{id,uid:"q"+id,rows:[["genotype van de ouders",["LL × LL","LL × Ll","Ll × Ll","Ll × ll"],2],["verhouding kort : lang",["1 : 0","1 : 1","2 : 1","3 : 1"],3]],score:n=>n,
    after:()=>waaromBtn(ans,b=>stepAnim(b,[{cap:"Beide ouders zijn Ll: elk maakt geslachtscellen met L en met l.",t:0},{cap:"Vul de vakjes: 1 LL : 2 Ll : 1 ll.",t:1},{cap:"LL en Ll zijn kort (L is dominant), ll is lang: <b>3 kort : 1 lang</b>.",t:2}],
      (st,s)=>st.innerHTML=PUN(["L","l"],["L","l"],[["LL","Ll"],["Ll","ll"]],{toon:s.t>0,kopT:"vader Ll",kopL:"moeder Ll",kleur:c=>s.t<2?"":c==="ll"?"var(--koraal-soft)":"var(--groen-soft)"})))});
  q.append(think,ans);
},STOF2));
ids.push(vraag(1,"kans op homozygoot",(q,id)=>{
  pre(q,"<p>Uit deze kruising houdt Ilse een kortharig mannetje.</p>");
  const {think,ans,unlock}=start(q,B("Hoe groot is de kans dat dit kortharige mannetje homozygoot (LL) is?"));
  choiceStep(think,{q:"Welke vakjes van het kruisingsschema Ll × Ll vallen af, nu je weet dat het mannetje kort haar heeft?",opts:["geen","het vakje LL","het vakje ll","de twee vakjes Ll"],right:2,
    ok:"Ja: ll is langharig, dat kan niet. Er blijven drie even grote vakjes over.",no:"Welk genotype geeft lang haar?",onDone:()=>choiceStep(think,{q:"Hoeveel van die drie overgebleven vakjes zijn LL?",opts:["één","twee","drie"],right:0,ok:"Goed. Reken nu de kans uit.",no:"De andere twee zijn Ll.",onDone:unlock})});
  mc(ans,{qid:id,pts:1,right:1,opts:["1/4","1/3","1/2","2/3"],onChecked:()=>waaromBtn(ans,textBox(
    "Je weet al dat het mannetje kort haar heeft, dus het vakje ll valt weg. Van de drie overgebleven vakjes (LL, Ll, Ll) is er één LL: de kans is <b>1/3</b>. Wie 1/4 kiest, vergeet dat ll al is uitgesloten. Het antwoord is <b>B</b>."))});
  q.append(think,ans);
},STOF2));
ids.push(vraag(2,"terugkruising",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Ilse wil weten of het kortharige mannetje homozygoot of heterozygoot is. Met welke cavia moet ze hem kruisen? Leg uit welke uitkomst laat zien dat hij heterozygoot is."));
  choiceStep(think,{q:"Waarom is een langharige cavia (ll) de beste partner voor deze test?",opts:["die geeft alleen l door, dus je ziet wat het mannetje doorgeeft","langharige cavia's krijgen meer jongen","die is ook heterozygoot"],right:0,
    ok:"Precies. Elk jong krijgt een l van de moeder; het allel van het mannetje bepaalt dus of een jong kort of lang haar krijgt.",no:"Denk aan wat de partner doorgeeft: verbergt dat iets, of juist niet?",
    onDone:()=>choiceStep(think,{q:"Het mannetje is Ll. Welke jongen kan hij dan krijgen met een ll-vrouwtje?",opts:["alleen kortharige","kortharige én langharige","alleen langharige"],right:1,ok:"Goed: zodra er één langharig jong is, weet je het.",no:"Ll geeft de helft van de keren l door.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:["Kruisen met een <b>langharige</b> cavia (ll): een terugkruising.","Als er (minstens) één <b>langharig jong</b> geboren wordt, is het mannetje <b>heterozygoot</b> (Ll); bij LL zijn alle jongen kortharig."],
    model:"Ze kruist hem met een langharige cavia (ll). Die geeft alleen l door. Krijgen ze een langharig jong (ll), dan moet het mannetje ook een l hebben doorgegeven: hij is Ll.",
    valkuil:"‘Hij is heterozygoot als precies de helft lang haar heeft.’ Eén langharig jong is al genoeg. Andersom bewijzen een paar kortharige jongen nog niet zeker dat hij LL is.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[{cap:"Als het mannetje <b>LL</b> is: alle jongen Ll, allemaal kort.",t:0},{cap:"Als het mannetje <b>Ll</b> is: de helft Ll (kort), de helft ll (lang).",t:1}],
      (st,s)=>st.innerHTML=s.t===0?PUN(["L","L"],["l"],[["Ll","Ll"]],{kopT:"mannetje LL",kopL:"ll",kleur:()=>"var(--groen-soft)"}):PUN(["L","l"],["l"],[["Ll","ll"]],{kopT:"mannetje Ll",kopL:"ll",kleur:c=>c==="ll"?"var(--koraal-soft)":"var(--groen-soft)"})))});
  q.append(think,ans);
},STOF2));
opgave("Cavia's","Kort en lang haar bij cavia's",`
<p>Bij cavia's is het allel voor kort haar (L) dominant over het allel voor lang haar (l).</p>
<p>Fokster Ilse heeft twee kortharige cavia's, een mannetje en een vrouwtje. Ze hebben allebei een langharige moeder.</p>`,ids);
}else{
ids.push(vraag(2,"dihybride kruising: kans",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Hoe groot is de kans dat een jong uit deze kruising kort, bruin haar heeft?"));
  choiceStep(think,{q:"Kijk eerst alleen naar de haarlengte: Ll × Ll. Hoe groot is de kans op kort haar?",opts:["1/4","1/2","3/4"],right:2,ok:"Ja: LL, Ll en Ll zijn kort.",no:"Maak het schema Ll × Ll. Hoeveel van de vier vakjes hebben minstens één L?",
    onDone:()=>choiceStep(think,{q:"En alleen de kleur: Zz × Zz. Hoe groot is de kans op bruin haar?",opts:["1/4","1/2","3/4"],right:0,ok:"Goed: alleen zz is bruin. De genen liggen op verschillende chromosomen, dus mag je de kansen vermenigvuldigen.",no:"Bruin is recessief.",onDone:unlock})});
  mc(ans,{qid:id,pts:2,right:1,opts:["1/16","3/16","1/4","9/16"],onChecked:()=>waaromBtn(ans,textBox(
    "Kort (¾) en bruin (¼) erven onafhankelijk over, dus de kans op beide is ¾ × ¼ = <b>3/16</b>. In het 4 × 4-schema zijn dat de drie vakjes L_zz uit de verhouding 9 : 3 : 3 : 1. Het antwoord is <b>B</b>."))});
  q.append(think,ans);
},STOF2));
ids.push(vraag(2,"dihybride terugkruising",(q,id)=>{
  pre(q,"<p>Ilse kruist een kortharig, zwart mannetje met een langharig, bruin vrouwtje (llzz). Ongeveer een kwart van de jongen is kort-zwart, een kwart kort-bruin, een kwart lang-zwart en een kwart lang-bruin.</p>");
  const {think,ans,unlock}=start(q,B("Wat is het genotype van het mannetje, en hoeveel soorten geslachtscellen maakt hij?"));
  choiceStep(think,{q:"Welke geslachtscellen maakt het vrouwtje (llzz)?",opts:["alleen lz","lz en LZ","vier soorten"],right:0,ok:"Ja. Het fenotype van elk jong laat dus direct zien welke allelen het mannetje doorgaf.",no:"Ze is voor beide genen homozygoot recessief.",
    onDone:()=>choiceStep(think,{q:"Er zijn langharige en bruine jongen. Wat zegt dat over het mannetje?",opts:["hij heeft een l en een z","hij heeft geen l en geen z","dat zegt niets"],right:0,ok:"Goed. Hij is kort en zwart, dus hij heeft ook L en Z.",no:"Een langharig jong is ll: één l kwam van het vrouwtje, waar kwam de andere vandaan?",onDone:unlock})});
  selectAnswer(ans,{id,uid:"q"+id,rows:[["genotype van het mannetje",["LLZZ","LlZZ","LLZz","LlZz"],3],["aantal soorten geslachtscellen",["1","2","3","4"],3]],score:n=>n,
    after:()=>waaromBtn(ans,b=>stepAnim(b,[{cap:"Het mannetje LlZz maakt vier soorten geslachtscellen, elk met kans ¼: LZ, Lz, lZ en lz.",t:0},{cap:"Het vrouwtje geeft alleen lz. Elk vakje is een ander fenotype: <b>1 : 1 : 1 : 1</b>.",t:1}],
      (st,s)=>st.innerHTML=PUN(["LZ","Lz","lZ","lz"],["lz"],[["LlZz","Llzz","llZz","llzz"]],{toon:s.t,kopT:"mannetje LlZz",kopL:"llzz",w:96,kleur:()=>"var(--groen-soft)"})))});
  q.append(think,ans);
},STOF2));
opgave("Cavia's","Haarlengte en haarkleur bij cavia's",`
<p>Bij cavia's is het allel voor kort haar (L) dominant over het allel voor lang haar (l), en het allel voor zwart haar (Z) dominant over het allel voor bruin haar (z). De twee genen liggen op verschillende chromosomen.</p>
<p>Fokster Ilse kruist twee cavia's die voor beide genen heterozygoot zijn (LlZz).</p>`,ids);
}
}
