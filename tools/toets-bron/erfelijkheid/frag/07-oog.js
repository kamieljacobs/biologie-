/* ===== Opgave 9: Choroideremie (B06, B07, B11, B12) en vwo opgave 10: Mitochondriën (X01) ===== */
{
const X=x=>60+x*70,YG={I:50,II:150,III:250};
const PERS=[["I-1",3.5,"I",1,1],["I-2",4.5,"I",0,0],
  ["II-1",.5,"II",0,0],["II-2",1.5,"II",1,0],["II-3",3.5,"II",0,0],["II-4",4.5,"II",1,0],["II-5",6.5,"II",0,0],["II-6",7.5,"II",1,0],
  ["III-1",.5,"III",0,0],["III-2",1.5,"III",1,0],["III-3",3,"III",1,1],["III-4",4,"III",0,0],["III-5",5,"III",1,0],["III-6",6.5,"III",0,0],["III-7",7.5,"III",1,0]]
  .map(([id,x,g,m,z])=>({id,x:X(x),y:YG[g],m,ziek:z,lab:id}));
const STAMB=(hl={})=>STAM({personen:PERS,paren:[["I-1","I-2"],["II-1","II-2"],["II-3","II-4"],["II-5","II-6"]],
  kinderen:[["I-1","I-2",["II-2","II-3","II-5"]],["II-1","II-2",["III-1","III-2"]],["II-3","II-4",["III-3","III-4","III-5"]],["II-5","II-6",["III-6","III-7"]]],
  hl,breed:830,hoog:300,ziekNaam:"met choroideremie",gen:[[50,"I"],[150,"II"],[250,"III"]]});
const STOF5={titel:"Stambomen en X-chromosomale overerving",html:`
<p><b>Dominant of recessief?</b> Zoek in een stamboom twee ouders met hetzelfde fenotype die een kind krijgen met een <b>ander</b> fenotype. Dat kind heeft een allel gekregen dat bij de ouders niet tot uiting kwam: dat allel is recessief.</p>
<p><b>Autosomaal of X-chromosomaal?</b> Een vrouw heeft XX, een man XY. Een vader geeft zijn X aan al zijn dochters en nooit aan een zoon; een zoon krijgt zijn X altijd van zijn moeder. Op de Y liggen bijna geen genen. Je noteert X-chromosomale genotypen als X<sup>A</sup>X<sup>a</sup> of X<sup>a</sup>Y (geen letter bij de Y). Een vrouw met één recessief allel heet <b>draagster</b>.</p>
<p><b>Past of bewijst?</b> Een stamboom kan bij meer erfgangen <i>passen</i>. Iets is pas <i>bewezen</i> als de andere mogelijkheden in die stamboom tot een tegenspraak leiden.</p>
<p><b>Kansen:</b> de kans dat meerdere onafhankelijke dingen allemaal gebeuren, is het product van de afzonderlijke kansen (productregel).</p>`,
films:[F.x,F.stam]};
const STAMFIG=hl=>FIG(STAMB(hl),640,830);
const STAMHTML=`<div class="eyebrow">afbeelding 1 (fictieve familie)</div>`;
const c6=vraag(2,"wat bewijst de stamboom?",(q,id)=>{
  pre(q,"<p>Over de stamboom in afbeelding 1 worden drie uitspraken gedaan.</p>");
  q.append(el("p",{class:"qtext"},"1 Uit de stamboom blijkt dat het gen voor choroideremie op het X-chromosoom ligt.<br>2 Uit het fenotype van II-2 blijkt dat het gen niet op het Y-chromosoom ligt.<br>3 Als het gen op een autosoom zou liggen, moet II-4 heterozygoot zijn.<br><br><b>Geef bij elke uitspraak aan of hij juist of onjuist is.</b>"));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  choiceStep(think,{q:"Stel dat het allel autosomaal recessief is (a). Welk genotype heeft III-3 dan?",opts:["AA","Aa","aa"],right:2,
    ok:"Ja. Van wie kreeg hij die twee a's? Bedenk wat dat zegt over zijn ouders, en of de stamboom dan nog klopt.",no:"III-3 heeft choroideremie, en het allel is in deze aanname recessief.",
    onDone:()=>choiceStep(think,{q:"Als een gen op het Y-chromosoom ligt, wie krijgt het dan van een zieke vader?",opts:["al zijn zonen","al zijn dochters","de helft van zijn kinderen"],right:0,ok:"Goed. Kijk nu naar I-1 en zijn zoon II-2.",no:"Een vader geeft zijn Y alleen aan zonen, en dan aan elke zoon.",onDone:unlock})});
  juistOnjuist(ans,{id,stm:["uit de stamboom blijkt: X-chromosoom","II-2: niet op het Y-chromosoom","autosomaal: II-4 heterozygoot"],key:[false,true,true],
    uitleg:b=>{b.append(el("div",{class:"model"},"1 <b>onjuist</b>: de stamboom past bij X-chromosomaal recessief, maar ook bij autosomaal recessief (als II-4 toevallig drager is). Passen is geen bewijs.<br>2 <b>juist</b>: bij Y-chromosomale overerving geeft een zieke vader het aan al zijn zonen; II-2 is gezond.<br>3 <b>juist</b>: III-3 is dan aa en kreeg van beide ouders een a. II-4 is gezond, dus Aa."));
      b.append(el("div",{},STAMFIG({"I-1":"var(--koraal)","II-2":"var(--goud)","II-4":"var(--teal)"})));}});
  q.append(think,ans);
},STOF5);
const c7=vraag(2,"genotypen X-chromosomaal",(q,id)=>{
  pre(q,"<p>Choroideremie erft X-chromosomaal recessief over. Gebruik X<sup>A</sup> voor het normale allel en X<sup>a</sup> voor het allel voor choroideremie.</p>");
  const {think,ans,unlock}=start(q,B("Noteer de genotypen van I-1, II-3 en III-4. Noteer bij meer mogelijkheden alle mogelijke genotypen."));
  choiceStep(think,{q:"Welke X geeft I-1 aan zijn dochter II-3?",opts:["zijn enige X, met X<sup>a</sup>","de helft van de keren X<sup>a</sup>","geen X, hij geeft een Y"],right:0,
    ok:"Ja: een man heeft maar één X en geeft die aan elke dochter. II-3 is gezond, dus haar andere X is X<sup>A</sup>.",no:"Een dochter krijgt van haar vader altijd zijn X.",
    onDone:()=>choiceStep(think,{q:"III-4 is gezond. Welke X kan ze van haar moeder II-3 (X<sup>A</sup>X<sup>a</sup>) gekregen hebben?",opts:["alleen X<sup>A</sup>, want ze is gezond","X<sup>A</sup> of X<sup>a</sup>"],right:1,
      ok:"Goed: haar vader II-4 geeft haar X<sup>A</sup>, dus ook met X<sup>a</sup> van haar moeder is ze gezond.",no:"Van haar vader krijgt ze sowieso X<sup>A</sup>. Wordt ze ziek als ze daarnaast X<sup>a</sup> heeft?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:["I-1: <b>X<sup>a</sup>Y</b> en II-3: <b>X<sup>A</sup>X<sup>a</sup></b>.","III-4: <b>X<sup>A</sup>X<sup>A</sup> of X<sup>A</sup>X<sup>a</sup></b> (allebei genoemd)."],
    model:"I-1: X<sup>a</sup>Y. II-3: X<sup>A</sup>X<sup>a</sup> (ze kreeg de X<sup>a</sup> van haar vader en is gezond). III-4: X<sup>A</sup>X<sup>A</sup> of X<sup>A</sup>X<sup>a</sup>.",
    valkuil:"Als voor III-4 maar één van beide genotypen is genoteerd: geen tweede punt. Een notatie zonder X en Y (bijvoorbeeld ‘X<sup>a</sup>’ of ‘aa’ voor I-1) levert voor dat punt 0 punten op.",
    after:()=>waaromBtn(ans,b=>{b.append(el("div",{class:"model"},"I-1 is een man met choroideremie: <b>X<sup>a</sup>Y</b>. Hij geeft zijn enige X aan zijn dochter II-3; zij is gezond, dus <b>X<sup>A</sup>X<sup>a</sup></b>. III-4 krijgt van haar vader II-4 X<sup>A</sup> en van haar moeder X<sup>A</sup> of X<sup>a</sup>: <b>X<sup>A</sup>X<sup>A</sup> of X<sup>A</sup>X<sup>a</sup></b>."));
      b.append(el("div",{},STAMFIG({"I-1":"var(--koraal)","II-3":"var(--goud)","III-4":"var(--teal)"})));})});
  q.append(think,ans);
},STOF5);

const c8=vraag(2,"fout zoeken: kans op een jongen met choroideremie",(q,id)=>{
  pre(q,"<p>Choroideremie erft X-chromosomaal recessief over. III-4 en een man zonder choroideremie willen een kind. Een leerling berekent de kans dat hun eerste kind een jongen met choroideremie is:</p><p><i>‘III-4 is draagster, want haar opa I-1 heeft choroideremie. De kruising is X<sup>A</sup>X<sup>a</sup> × X<sup>A</sup>Y. De kinderen kunnen zijn: X<sup>A</sup>X<sup>A</sup>, X<sup>A</sup>X<sup>a</sup>, X<sup>A</sup>Y en X<sup>a</sup>Y. De kans op een jongen met choroideremie is dus 1/4.’</i></p>");
  const {think,ans,unlock}=start(q,"De redenering van de leerling bevat een fout.<br><br>"+B("Leg uit wat er fout is en bereken de juiste kans."));
  choiceStep(think,{q:"Welk genotype heeft II-3, de moeder van III-4?",opts:["X<sup>A</sup>X<sup>A</sup>","X<sup>A</sup>X<sup>a</sup>","X<sup>a</sup>X<sup>a</sup>"],right:1,
    ok:"Ja: ze kreeg X<sup>a</sup> van haar vader I-1 en is zelf gezond. Welke X geeft zij aan haar dochter III-4?",no:"II-3 kreeg de X van haar vader I-1, en ze heeft zelf geen choroideremie.",
    onDone:()=>choiceStep(think,{q:"III-4 krijgt één X van haar moeder II-3. Hoe groot is de kans dat dat X<sup>a</sup> is?",opts:["0","½","1"],right:1,
      ok:"Goed. Vergelijk dat met wat de leerling aanneemt over III-4, en reken dan de kans opnieuw uit.",no:"Een moeder met X<sup>A</sup>X<sup>a</sup> geeft de ene of de andere X door, met even grote kans.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "III-4 is <b>niet zeker draagster</b>: haar moeder II-3 is X<sup>A</sup>X<sup>a</sup>, dus III-4 heeft een kans van <b>1/2</b> om X<sup>a</sup> te hebben gekregen.",
    "Juiste kans: <b>1/2 × 1/4 = 1/8</b> (12,5%)."],
    model:"De fout: III-4 is niet zeker draagster. Haar moeder II-3 is X<sup>A</sup>X<sup>a</sup>, dus III-4 kreeg X<sup>A</sup> of X<sup>a</sup>, elk met kans ½. Als ze draagster is, is de kans op een jongen met choroideremie ¼. De juiste kans is dus ½ × ¼ = 1/8.",
    valkuil:"Een antwoord dat alleen ‘de kans is 1/8’ geeft zonder aan te wijzen wat er fout is, levert alleen het tweede punt op.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[{cap:"Eerst: is III-4 draagster? Kans ½ (de leerling nam hier 1 aan).",t:0},{cap:"Dan: geeft ze X<sup>a</sup> door? Kans ½.",t:1},{cap:"En: wordt het een jongen (Y van de vader)? Kans ½.",t:2},{cap:"Alles tegelijk: ½ × ½ × ½ = ½ × ¼ = <b>1/8</b>.",t:3}],(st,s)=>{
      const W=[0,1,2].map(k=>k<=s.t);const box=(x,t,on)=>`<rect x="${x}" y="20" width="112" height="80" rx="12" fill="${on?"var(--goud-soft)":"none"}" stroke="${on?"var(--goud)":"var(--line2)"}"/>`+t.map((r,j)=>`<text x="${x+56}" y="${44+j*18}" text-anchor="middle" class="lbl" style="font-size:15px">${r}</text>`).join("")+`<text x="${x+56}" y="${90}" text-anchor="middle" class="lbl" style="font-size:19px">${on?"½":""}</text>`;
      st.innerHTML=svgWrap("0 0 400 150",box(4,["III-4","draagster"],W[0])+`<text x="132" y="66" text-anchor="middle" class="lbl" style="font-size:18px">×</text>`+box(144,["geeft Xᵃ","door"],W[1])+`<text x="272" y="66" text-anchor="middle" class="lbl" style="font-size:18px">×</text>`+box(284,["een","jongen"],W[2])+(s.t===3?`<text x="200" y="136" text-anchor="middle" class="lbl" style="fill:var(--goud-text);font-size:20px">= 1/8</text>`:""),"Kansketen");}))});
  q.append(think,ans);
},STOF5);
const c9=vraag(2,"kans op een dochter met choroideremie",(q,id)=>{
  pre(q,"<p>Choroideremie erft X-chromosomaal recessief over. Gebruik X<sup>A</sup> voor het normale allel en X<sup>a</sup> voor het allel voor choroideremie.</p><p>Een man met choroideremie krijgt kinderen met een vrouw die draagster is.</p>");
  const {think,ans,unlock}=start(q,B("Bereken de kans dat een dochter van hen choroideremie heeft. Leg uit hoe het kan dat deze dochter choroideremie kan krijgen, terwijl de ziekte bijna alleen bij mannen voorkomt."));
  choiceStep(think,{q:"Welke X geeft de vader (X<sup>a</sup>Y) aan een dochter?",opts:["altijd X<sup>a</sup>","de helft van de keren X<sup>a</sup>","geen X"],right:0,
    ok:"Ja: hij heeft maar één X, en een dochter krijgt die altijd. En de moeder (X<sup>A</sup>X<sup>a</sup>)?",no:"Een dochter krijgt van haar vader zijn X; een zoon krijgt zijn Y.",
    onDone:()=>choiceStep(think,{q:"Welke X geeft de moeder (X<sup>A</sup>X<sup>a</sup>) aan een dochter?",opts:["altijd X<sup>A</sup>","X<sup>A</sup> of X<sup>a</sup>, elk met kans ½"],right:1,
      ok:"Goed. Reken nu de kans uit. Bedenk daarna: wat moet er met beide ouders aan de hand zijn voor een dochter met X<sup>a</sup>X<sup>a</sup>, en hoe vaak komt dat voor?",no:"Een draagster heeft twee verschillende X-chromosomen.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Een dochter krijgt van haar vader zeker X<sup>a</sup> en van haar moeder X<sup>A</sup> of X<sup>a</sup> (elk ½): kans op X<sup>a</sup>X<sup>a</sup> is <b>½</b>.",
    "Een vrouw heeft <b>twee X<sup>a</sup></b> nodig: haar vader moet de ziekte hebben én haar moeder draagster (of ziek) zijn; die combinatie is zeldzaam, hier is ze er wel."],
    model:"De dochter krijgt van haar vader altijd X<sup>a</sup>. Van haar moeder krijgt ze X<sup>A</sup> of X<sup>a</sup>, elk met kans ½. De kans dat een dochter X<sup>a</sup>X<sup>a</sup> is en choroideremie heeft, is dus ½. Normaal komt dat bijna niet voor: een vrouw heeft twee X<sup>a</sup> nodig, dus haar vader moet ziek zijn én haar moeder draagster. Bij een zeldzaam allel is die combinatie heel zeldzaam, maar in dit gezin is ze er wel.",
    valkuil:"De kans uitrekenen over alle kinderen (¼ van de kinderen is een dochter met choroideremie) in plaats van over de dochters. Of alleen ‘vrouwen hebben twee X-chromosomen’ zonder te zeggen wat dat voor de ouders betekent.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[{cap:"Vader X<sup>a</sup>Y, moeder X<sup>A</sup>X<sup>a</sup>.",t:0},{cap:"De vier vakjes: twee dochters, twee zonen.",t:1},{cap:"Van de twee dochters is er één X<sup>a</sup>X<sup>a</sup>: kans <b>½</b> per dochter.",t:2}],
      (st,s)=>st.innerHTML=PUN(["Xᵃ","Y"],["Xᴬ","Xᵃ"],[["XᴬXᵃ","XᴬY"],["XᵃXᵃ","XᵃY"]],{toon:s.t>0,kopT:"vader XᵃY",kopL:"moeder XᴬXᵃ",
        kleur:(c,r,k)=>s.t<2?"":k===0?(c==="XᵃXᵃ"?"var(--koraal-soft)":"var(--teal-soft)"):""})))});
  q.append(think,ans);
},STOF5);
opgave("Choroideremie","Choroideremie",`
<p>Choroideremie is een zeldzame erfelijke oogziekte (ongeveer 1 op de 50 000 tot 100 000 mensen). Door een mutatie in het gen <i>CHM</i> gaan cellen van het netvlies en van het vaatvlies (de choroidea) geleidelijk dood. Het eerste verschijnsel is meestal nachtblindheid, al op jonge leeftijd. Later wordt het gezichtsveld steeds kleiner (kokerzien) en uiteindelijk worden patiënten blind.</p>
<p>Afbeelding 1 is de stamboom van een familie waarin choroideremie voorkomt.</p>${STAMHTML}<div>${STAMFIG()}</div>`,[c6,c7,c8,c9]);

if(VWO){
const STOF_MT={titel:"Mitochondriaal DNA",html:`
<p>Mitochondriën hebben hun eigen, kleine ringvormige DNA-molecuul (37 genen bij de mens), los van de chromosomen in de kern.</p>
<p>Bij de bevruchting versmelten een eicel en een zaadcel. Denk bij een vraag over mitochondriaal DNA na over wat elke geslachtscel, naast de kern, meebrengt naar de bevruchte eicel.</p>`,
films:[F.x]};
const x1=vraag(1,"mitochondriaal DNA",(q,id)=>{
  pre(q,"<p>Een vrouw heeft een fout in haar mitochondriaal DNA. Haar dochter heeft de fout ook.</p>");
  const {think,ans,unlock}=start(q,B("Welk deel van de kinderen van deze dochter krijgt de fout?"));
  choiceStep(think,{q:"Van wie krijgt een bevruchte eicel haar mitochondriën?",opts:["van de moeder (uit de eicel)","van de vader (uit de zaadcel)","de helft van elk"],right:0,
    ok:"Ja: de mitochondriën van de zaadcel worden na de bevruchting afgebroken. Bedenk nu wat dat betekent voor de kinderen van de dochter.",no:"Vergelijk de grootte van een eicel en een zaadcel. En wat gebeurt er met de mitochondriën uit de zaadcel?",onDone:unlock});
  mc(ans,{qid:id,pts:1,right:3,opts:["geen enkel kind","de helft van de kinderen","alleen haar zonen","alle kinderen"],
    onChecked:()=>waaromBtn(ans,textBox("Een moeder geeft haar mitochondriën via de eicel aan <b>al haar kinderen</b>, zonen en dochters. De dochter heeft de fout, dus al haar kinderen krijgen hem ook. Het antwoord is <b>D</b>. Het is geen gen op een chromosoom, dus er is geen ‘helft’ (B), en het hangt niet van het geslacht af (C)."))});
  q.append(think,ans);
},STOF_MT);
opgave("Mitochondriën","Mitochondriën","",[x1]);
}
}
