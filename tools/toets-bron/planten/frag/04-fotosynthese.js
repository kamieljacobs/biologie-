/* ===== Opgave 4: Fotosynthese (EI-planten-C04, C11 uit toetsen-biologie) ===== */
{
const STOF_LICHT={titel:"De bladgroenkorrel en de lichtreactie",html:`
<p>De fotosynthese gebeurt in de <b>bladgroenkorrel</b> (chloroplast). Binnen het dubbele membraan ligt het <b>stroma</b>, een vloeistof vol enzymen. Daarin liggen platte zakjes: de <b>thylakoïden</b>, opgestapeld in grana. In het membraan van de thylakoïden zit <b>chlorofyl</b>.</p>
<p>De fotosynthese heeft twee delen. De <b>lichtreactie</b> in de thylakoïden gebruikt licht en water, en levert O₂, ATP en NADPH,H⁺. De <b>calvincyclus</b> in het stroma gebruikt die ATP en NADPH,H⁺ om CO₂ vast te leggen in glucose.</p>
<p>Hoe een mitochondrium ATP maakt, ken je al: een keten van eiwitcomplexen pompt H⁺ naar één kant van een membraan, en de H⁺ stromen terug door ATP-synthetase.</p>`,
films:[F.groen]};
const q1=vraag(3,"de niet-cyclische fotofosforylering",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Beschrijf de niet-cyclische fotofosforylering in drie stappen: van het licht tot ATP en NADPH,H⁺. Noem daarbij: water, O₂, H⁺, ATP-synthetase, tweede chlorofyl en NADP⁺."));
  chipsStep(think,{q:"Wat levert de lichtreactie op? Kies alles wat klopt.",items:[["O₂",1],["ATP",1],["NADPH,H⁺",1],["glucose",0],["CO₂",0]],
    ok:"Goed. Begin je beschrijving bij het chlorofyl dat licht absorbeert. Wat gebeurt er dan met een elektron?",no:"Glucose ontstaat pas in de calvincyclus, en CO₂ wordt daar juist gebruikt.",
    onDone:()=>choiceStep(think,{q:"Waarmee maakt ATP-synthetase ATP, in het mitochondrium én in de chloroplast?",opts:["met H⁺ die door het enzym terugstroomt","met energie die het rechtstreeks uit glucose haalt","met elektronen uit NADPH,H⁺"],right:0,
      ok:"Ja: hetzelfde principe. Waar hoopt de H⁺ zich in de chloroplast op? Werk nu de drie stappen uit en gebruik alle zes woorden.",no:"Denk aan het mitochondrium: wat stroomt er door ATP-synthetase heen?",onDone:unlock})});
  openAnswer(ans,{id,pts:3,checks:[
    "chlorofyl absorbeert licht; een elektron krijgt energie en gaat naar de keten; het chlorofyl krijgt een nieuw elektron uit <b>water</b>, dat wordt gesplitst in elektronen, H⁺ en <b>O₂</b>",
    "met energie van de elektronen wordt <b>H⁺ het thylakoïd in</b> gepompt; de H⁺ stromen terug door <b>ATP-synthetase</b> en daarbij ontstaat ATP",
    "bij een <b>tweede chlorofyl</b> krijgen de elektronen nog eens energie uit licht; ze komen bij <b>NADP⁺</b>, dat met H⁺ uit het stroma NADPH,H⁺ wordt"],
    model:"Chlorofyl absorbeert licht. Een elektron krijgt daardoor veel energie en gaat naar een keten van eiwitcomplexen. Het chlorofyl krijgt een nieuw elektron uit water; water wordt gesplitst in elektronen, H⁺ en O₂. Met de energie van de elektronen pompt een eiwitcomplex H⁺ het thylakoïd in. De H⁺ stromen terug door ATP-synthetase, en daarbij ontstaat ATP. Bij een tweede chlorofyl krijgen de elektronen nog een keer energie uit licht. Aan het eind komen ze bij NADP⁺, dat met H⁺ uit het stroma NADPH,H⁺ wordt.",
    valkuil:"‘De O₂ komt uit CO₂’ is fout: de O₂ komt uit water. En H⁺ wordt het thylakoïd <i>in</i> gepompt, niet het stroma in; ATP ontstaat als de H⁺ terugstromen.",
    after:()=>waaromBtn(ans,textBox("Volg één elektron: <b>licht</b> → chlorofyl geeft een elektron met veel energie af aan de keten → het gat wordt gevuld met een elektron uit <b>water</b> (water → elektronen + H⁺ + O₂) → de energie van de elektronen pompt <b>H⁺ het thylakoïd in</b> → de H⁺ stromen terug door <b>ATP-synthetase</b>: ATP → bij een <b>tweede chlorofyl</b> nog eens energie uit licht → het elektron komt bij <b>NADP⁺</b>, dat met H⁺ NADPH,H⁺ wordt. ‘Niet-cyclisch’: de elektronen gaan in één richting, van water naar NADP⁺."))});
  q.append(think,ans);
},STOF_LICHT);

const STOF_MASSA={titel:"Rekenen met molecuulmassa's",html:`
<p>De massa van een molecuul is de som van de massa's van zijn atomen. Een C-atoom heeft massa 12, een O-atoom 16 en een H-atoom 1 (in BiNaS staan alle atoommassa's).</p>
<p>Voorbeeld: CO₂ heeft massa 12 + 2 × 16 = 44. Van die massa komt 12 / 44 × 100 % = 27 % van het C-atoom.</p>
<p>In de fotosynthese komen de atomen van glucose uit twee stoffen: CO₂ en water. De film volgt waar elk atoom terechtkomt.</p>`,
films:[F.groen]};
const q2=vraag(2,"hoeveel van glucose komt uit CO₂?",(q,id)=>{
  const {think,ans,unlock}=start(q,"Glucose is C₆H₁₂O₆. Gebruik de atoommassa's C = 12, O = 16 en H = 1.<br><br>"+B("Bereken welk percentage van de massa van glucose bestaat uit atomen die uit CO₂ komen. Leg uit welke atomen dat zijn."));
  numStep(think,{uid:"q"+id+"n",q:"Bereken eerst de massa van één glucosemolecuul.",right:180,
    ok:"Ja: 6 × 12 + 12 × 1 + 6 × 16 = 180. Nu de vraag welke atomen uit CO₂ komen.",no:"Tel op: zes keer C, twaalf keer H, zes keer O.",
    onDone:()=>choiceStep(think,{q:"Bij de lichtreactie wordt water gesplitst. Waar komen de O-atomen van de O₂ vandaan die de plant afgeeft?",opts:["uit water","uit CO₂","uit allebei"],right:0,
      ok:"Goed. Gebruik dat om te bedenken uit welke stof de O-atomen in glucose dan komen. En de C-atomen?",no:"Algen die water met zware O-atomen krijgen, geven zware O₂ af.",onDone:unlock})});
  mixAnswer(ans,{id,pts:2,auto:[
    {label:"atomen die uit CO₂ komen",opts:["alleen C","C en O","C, H en O","alleen O"],right:1,toon:"de C- én de O-atomen in glucose komen uit CO₂ (de H-atomen uit water) — 1 punt"},
    {label:"percentage van de massa",unit:"%",ok:v=>v>=92.5&&v<=93.5,toon:"(6 × 12 + 6 × 16) / 180 × 100 % = 168 / 180 × 100 % = 93 % — 1 punt"}],
    valkuil:"Wie alleen de C-atomen telt (72 / 180 = 40 %), krijgt 0 punten: ook de O-atomen in glucose komen uit CO₂.",
    after:()=>waaromBtn(ans,textBox("De O₂ komt uit water. Alle O-atomen van het gesplitste water gaan in O₂, dus de O-atomen in glucose moeten uit <b>CO₂</b> komen, net als de C-atomen. De H-atomen komen uit water.<br>C: 6 × 12 = 72 · O: 6 × 16 = 96 · samen 168 van de 180: <b>93 %</b>.<br>Daarom zegt de film dat het droge hout van een eik ‘vrijwel helemaal uit de lucht’ komt."))});
  q.append(think,ans);
},STOF_MASSA);

opgave("Fotosynthese","Fotosynthese",`<p>De volgende twee vragen gaan over de fotosynthese.</p>`,[q1,q2]);
}
