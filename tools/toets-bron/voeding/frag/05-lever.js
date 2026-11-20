/* ===== Opgave 5: De lever (K505 alcohol en medicijnen; film 5) ===== */
{
const STOF_LEVER={titel:"De lever als fabriek",html:`
<p>De lever ligt rechtsboven in je buik, onder je ribben. Er lopen drie grote bloedvaten naar en van de lever: de <b>poortader</b> (bloed van de darm, met de opgenomen voedingsstoffen), de <b>leverslagader</b> (zuurstofrijk bloed van de aorta) en de <b>leverader</b> (naar de onderste holle ader en het hart).</p>
<p>De lever heeft verschillende ‘afdelingen’: hij bewaart glucose als glycogeen, maakt eiwitten en breekt aminozuren af, maakt gal, en ruimt stoffen op die je lichaam kwijt moet.</p>
<p>De <b>nieren</b> halen stoffen uit het bloed die in water oplossen; die verlaten je lichaam met de urine.</p>`,
films:[F.lever]};

const ids=[vraag(2,"alcohol en medicijnen in de lever",(q,id)=>{
  const {think,ans,unlock}=start(q,B("a Leg uit waarom de lever alcohol niet zomaar uit het bloed kan zeven.<br>b Beschrijf hoe de lever een medicijn klaarmaakt om uitgeplast te worden."));
  choiceStep(think,{q:"Hoe werkt een zeef?",opts:["hij houdt deeltjes tegen op grootte","hij breekt deeltjes af","hij lost deeltjes op"],right:0,
    ok:"Ja. Vergelijk dan de grootte van een alcoholmolecuul met die van water.",no:"Denk aan een vergiet: wat blijft erin liggen en wat valt erdoor?",
    onDone:()=>choiceStep(think,{q:"Welke stoffen kunnen de nieren uit het bloed halen en uitplassen?",opts:["stoffen die goed in water oplossen","stoffen die alleen in vet oplossen","alleen ureum"],right:0,
      ok:"Goed. Bedenk voor b wat de lever met een medicijn moet doen zodat het zo'n stof wordt.",no:"Urine is vooral water.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "a: alcohol is een <b>klein molecuul, nauwelijks groter dan water</b>: een zeef die alcohol tegenhoudt, houdt ook water tegen (de lever breekt het daarom af).",
    "b: de lever <b>bouwt het medicijn om en plakt er een stukje aan</b>, zodat het <b>in water oplost</b> en de nieren het kunnen uitplassen."],
    model:"a Een zeef houdt deeltjes tegen op grootte. Een alcoholmolecuul is nauwelijks groter dan een watermolecuul: een zeef die alcohol tegenhoudt, houdt ook al het water tegen. Daarom breekt de lever alcohol stap voor stap af. b De lever bouwt het medicijn om en plakt er een stukje aan. Daardoor lost het in water op, en kunnen de nieren het met de urine uitplassen."});
  q.append(think,ans);
},STOF_LEVER)];

opgave("De lever","De lever","",ids);
}
