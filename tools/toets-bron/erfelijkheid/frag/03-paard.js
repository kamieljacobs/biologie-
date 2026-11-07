/* ===== Opgave: Palomino en cremello (eigen vragen A01–A04, toetsen-biologie) ===== */
{
const STOF3={titel:"Intermediair en codominant",html:`
<p>Niet elk allel is dominant of recessief. Bij <b>intermediaire</b> overerving (onvolledig dominant) heeft een heterozygoot een fenotype dat <b>tussen</b> de twee homozygoten in ligt. Eén werkend allel maakt dan niet genoeg product voor het volle kenmerk. Voorbeeld: rode × witte leeuwenbekken geven roze bloemen.</p>
<p>Bij <b>codominantie</b> komen beide allelen <b>naast elkaar</b> volledig tot uiting. Voorbeeld: bij sommige runderen (‘roan’) heeft een heterozygoot rode én witte haren door elkaar, niet een tussenkleur.</p>
<p>De allelen mengen niet: een heterozygoot geeft gewoon het ene óf het andere allel door, net als bij dominant-recessieve overerving. Alleen het verband tussen genotype en fenotype is anders.</p>`,
films:[F.voorbij,F.stam]};
const PAL=c=>c==="CC"?"var(--goud-soft)":c==="cc"?"var(--koraal-soft)":"var(--teal-soft)";
const a1=vraag(1,"intermediaire overerving",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Hoe heet de manier waarop het crème-allel en het normale allel samen het fenotype bepalen?"));
  choiceStep(think,{q:"Hoe ziet een paard met één crème-allel eruit, vergeleken met de twee homozygoten?",opts:["precies als de vos","precies als de cremello","ertussenin: goudgeel","met vlekken van beide kleuren"],right:2,
    ok:"Ja: een tussenvorm. Zoek nu de naam die daarbij hoort.",no:"Kijk in de tabel bij ‘één crème-allel’.",onDone:unlock});
  mc(ans,{qid:id,pts:1,right:1,opts:["codominant","intermediair","dominant-recessief"],onChecked:()=>waaromBtn(ans,textBox(
    "Een heterozygoot heeft een <b>tussenvorm</b> (goudgeel, tussen roodbruin en bijna wit): dat is intermediaire overerving. Bij codominantie zie je beide kenmerken náást elkaar, zoals A- én B-antigenen bij bloedgroep AB. Dominant-recessief is het niet, want één crème-allel verandert de kleur al. Het antwoord is <b>B</b>."))});
  q.append(think,ans);
},STOF3);
const a2=vraag(2,"kruisingsschema palomino × palomino",(q,id)=>{
  pre(q,"<p>Een fokker laat een palomino-hengst paren met een palomino-merrie.</p>");
  const {think,ans,unlock}=start(q,B("Maak een kruisingsschema van deze kruising en noteer in welke verhouding de fenotypen bij de veulens te verwachten zijn."));
  choiceStep(think,{q:"Welk genotype heeft een palomino?",opts:["CC","Cc","cc"],right:1,ok:"Ja: één crème-allel.",no:"Kijk in de tabel.",
    onDone:()=>choiceStep(think,{q:"Hoeveel verschillende fenotypen kunnen bij de veulens voorkomen?",opts:["twee","drie","vier"],right:1,
      ok:"Goed: bij intermediaire overerving heeft elk genotype zijn eigen fenotype.",no:"Hoeveel genotypen kunnen er uit Cc × Cc komen? En hoeveel fenotypen horen daarbij?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,placeholder:"Schrijf het schema op (bijvoorbeeld P: … × …, geslachtscellen, vakjes) en de verhouding.",checks:[
    "Juist kruisingsschema met ouders <b>Cc × Cc</b> en de genotypen van de nakomelingen (CC, Cc, Cc, cc).",
    "Fenotypen in de verhouding <b>1 cremello : 2 palomino : 1 vos</b>."],
    model:"P: Cc × Cc. Geslachtscellen: C en c. Vakjes: CC, Cc, Cc, cc. Verhouding cremello (CC) : palomino (Cc) : vos (cc) = 1 : 2 : 1.",
    valkuil:"De verhouding 3 : 1 (palomino : vos). Bij intermediaire overerving horen er drie fenotypen bij; 3 : 1 levert voor het tweede punt 0 punten op.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[{cap:"Beide palomino's zijn Cc en maken geslachtscellen met C en met c.",t:0},{cap:"De vakjes: CC, Cc, Cc en cc.",t:1},{cap:"Elk genotype zijn eigen kleur: <b>1 cremello : 2 palomino : 1 vos</b>.",t:2}],
      (st,s)=>st.innerHTML=PUN(["C","c"],["C","c"],[["CC","Cc"],["Cc","cc"]],{toon:s.t>0,kopT:"hengst Cc",kopL:"merrie Cc",kleur:c=>s.t<2?"":PAL(c)})))});
  q.append(think,ans);
},STOF3);
const a3=vraag(2,"palomino's fokken",(q,id)=>{
  pre(q,"<p>Een andere fokker wil alleen palomino-veulens fokken. Hij heeft de beschikking over vossen, palomino's en cremello's.</p>");
  const {think,ans,unlock}=start(q,B("Noteer welke kruising hij moet doen om er zeker van te zijn dat elk veulen palomino is, en leg met de genotypen uit waarom."));
  choiceStep(think,{q:"Kun je met twee palomino's alleen palomino's fokken?",opts:["ja, dezelfde kleur geeft dezelfde kleur","nee, dan komen er ook cremello's en vossen"],right:1,
    ok:"Juist: dat zag je in de vorige vraag. Welk genotype moet elk veulen dan hebben?",no:"Kijk naar je kruisingsschema van de vorige vraag.",
    onDone:()=>choiceStep(think,{q:"Een veulen moet Cc zijn. Hoe weet je zéker dat het van de ene ouder C en van de andere ouder c krijgt?",opts:["de ene ouder heeft alleen C, de andere alleen c","beide ouders hebben C en c"],right:0,ok:"Goed. Welke paarden zijn dat?",no:"Een heterozygote ouder geeft de ene keer C, de andere keer c.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:["Een <b>cremello</b> kruisen met een <b>vos</b>.","Uitleg: <b>CC × cc</b>: de cremello geeft altijd C en de vos altijd c door, dus alle veulens zijn Cc (palomino)."],
    model:"Hij kruist een cremello (CC) met een vos (cc). De cremello geeft altijd C door en de vos altijd c, dus elk veulen is Cc: palomino.",
    valkuil:"‘Twee palomino's kruisen’ of ‘palomino × cremello’: dan is maar de helft of een kwart van de veulens palomino. Zo'n antwoord levert 0 punten op."});
  q.append(think,ans);
},STOF3);
const a4=vraag(2,"kans op een cremello-merrieveulen",(q,id)=>{
  pre(q,"<p>De palomino-hengst en de palomino-merrie uit vraag "+a2+" krijgen een eerste veulen. Dat is een palomino.</p>");
  const {think,ans,unlock}=start(q,B("Hoe groot is de kans dat hun volgende veulen een cremello-merrieveulen (een vrouwelijk veulen) is?"));
  choiceStep(think,{q:"Verandert het eerste veulen iets aan de kans voor het volgende veulen?",opts:["ja, de kans op palomino wordt kleiner","nee, elke bevruchting is een nieuwe trekking"],right:1,
    ok:"Precies: toeval heeft geen geheugen. Je hebt het eerste veulen dus niet nodig.",no:"De geslachtscellen ‘weten’ niet wat er de vorige keer gebeurd is.",
    onDone:()=>choiceStep(think,{q:"Je zoekt twee dingen tegelijk: cremello én merrie. Wat doe je met de twee kansen?",opts:["optellen","vermenigvuldigen"],right:1,ok:"Goed: de productregel. Wat zijn de twee kansen?",no:"Bij ‘en’ (allebei tegelijk) wordt de kans kleiner, niet groter.",onDone:unlock})});
  mc(ans,{qid:id,pts:2,right:3,opts:["1/3","1/4","1/6","1/8"],onChecked:()=>waaromBtn(ans,textBox(
    "Kans op cremello (CC) = ¼; kans op een merrieveulen = ½. Allebei tegelijk: ¼ × ½ = <b>1/8</b>. Het eerste veulen doet er niet toe: elke bevruchting staat op zichzelf. Wie 1/4 kiest, vergeet het geslacht; wie 1/3 kiest, denkt dat de drie kleuren even vaak voorkomen. Het antwoord is <b>D</b>."))});
  q.append(think,ans);
},STOF3);
opgave("Palomino","Palomino en cremello",`
<p>Paarden met de basiskleur vos hebben een roodbruine vacht. Bij deze paarden bepaalt het gen <i>SLC45A2</i> of de vachtkleur wordt verdund. Van dit gen bestaan twee allelen: een normaal allel en het crème-allel.</p>
<div class="tablewrap"><table class="data"><tr><th>genotype</th><th>fenotype</th></tr>
<tr><td>geen crème-allel</td><td>vos: roodbruine vacht</td></tr>
<tr><td>één crème-allel</td><td>palomino: goudgele vacht met lichte manen</td></tr>
<tr><td>twee crème-allelen</td><td>cremello: bijna witte, crèmekleurige vacht</td></tr></table></div>
<p>Gebruik in deze opgave de letters C (crème-allel) en c (normaal allel). Ga ervan uit dat alle paarden in deze opgave de basiskleur vos hebben, zodat alleen het <i>SLC45A2</i>-gen de kleur bepaalt.</p>`,[a1,a2,a3,a4]);
}
