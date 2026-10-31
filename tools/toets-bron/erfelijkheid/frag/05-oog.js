/* ===== Opgave: Choroideremie (eigen vragen B05–B09) + vwo: LHON (mitochondriaal) ===== */
{
const X=x=>60+x*70,YG={I:50,II:150,III:250};
const PERS=[["I-1",3.5,"I",1,1],["I-2",4.5,"I",0,0],
  ["II-1",.5,"II",0,0],["II-2",1.5,"II",1,0],["II-3",3.5,"II",0,0],["II-4",4.5,"II",1,0],["II-5",6.5,"II",0,0],["II-6",7.5,"II",1,0],
  ["III-1",.5,"III",0,0],["III-2",1.5,"III",1,0],["III-3",3,"III",1,1],["III-4",4,"III",0,0],["III-5",5,"III",1,0],["III-6",6.5,"III",0,0],["III-7",7.5,"III",1,0]]
  .map(([id,x,g,m,z])=>({id,x:X(x),y:YG[g],m,ziek:z,lab:id}));
const STAMB=(hl={})=>STAM({personen:PERS,paren:[["I-1","I-2"],["II-1","II-2"],["II-3","II-4"],["II-5","II-6"]],
  kinderen:[["I-1","I-2",["II-2","II-3","II-5"]],["II-1","II-2",["III-1","III-2"]],["II-3","II-4",["III-3","III-4","III-5"]],["II-5","II-6",["III-6","III-7"]]],
  hl,breed:830,hoog:295,ziekNaam:"met choroideremie",gen:[[50,"I"],[150,"II"],[250,"III"]]});
const STOF5={titel:"Stambomen en X-chromosomale overerving",html:`
<p><b>Dominant of recessief?</b> Zoek in een stamboom twee ouders met hetzelfde fenotype die een kind krijgen met een <b>ander</b> fenotype. Dat kind heeft een allel gekregen dat bij de ouders niet tot uiting kwam: dat allel is recessief.</p>
<p><b>Autosomaal of X-chromosomaal?</b> Een vrouw heeft XX, een man XY. Een vader geeft zijn X aan al zijn dochters en nooit aan een zoon; een zoon krijgt zijn X altijd van zijn moeder. Op de Y liggen bijna geen genen. Je noteert X-chromosomale genotypen als X<sup>A</sup>X<sup>a</sup> of X<sup>a</sup>Y (geen letter bij de Y). Een vrouw met één recessief allel heet <b>draagster</b>.</p>
<p><b>Past of bewijst?</b> Een stamboom kan bij meer erfgangen <i>passen</i>. Iets is pas <i>bewezen</i> als de andere mogelijkheden in die stamboom tot een tegenspraak leiden.</p>
<p><b>Kansen:</b> de kans dat meerdere onafhankelijke dingen allemaal gebeuren, is het product van de afzonderlijke kansen (productregel).</p>`,
films:[F.x,F.stam]};
const STAMHTML=`<div class="eyebrow">afbeelding 1 (fictieve familie)</div>`;
const c5=vraag(2,"dominant of recessief",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Is het allel voor choroideremie dominant of recessief? Leg je antwoord uit met behulp van de stamboom en noteer de nummers van de personen die je gebruikt."));
  choiceStep(think,{q:"Wat zoek je in een stamboom om te bewijzen dat een allel recessief is?",opts:["een zieke ouder met gezonde kinderen","twee gezonde ouders met een ziek kind","dat er maar weinig zieken zijn"],right:1,
    ok:"Ja. Zoek zo'n gezin in de stamboom.",no:"Een zieke ouder met gezonde kinderen past bij dominant én bij recessief. Wanneer kan alleen recessief?",
    onDone:()=>chipsStep(think,{q:"Klik de personen aan die samen het bewijs vormen. Kies alles wat klopt.",items:[["I-1",0],["I-2",0],["II-3",1],["II-4",1],["III-3",1],["III-4",0]],
      ok:"Goed: II-3 en II-4 zijn gezond en hun zoon III-3 is ziek.",no:"I-1 en I-2 bewijzen niets: een zieke en een gezonde ouder kan bij beide erfgangen.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:["<b>II-3 en II-4</b> hebben geen choroideremie, maar hun zoon <b>III-3</b> wel.","Dus het allel is <b>recessief</b>: III-3 heeft het allel gekregen van een ouder bij wie het niet tot uiting komt."],
    model:"Recessief. II-3 en II-4 zijn allebei gezond, maar hun zoon III-3 heeft choroideremie. Hij moet het allel van (minstens) één van zijn ouders hebben, terwijl het bij die ouder niet tot uiting komt. Dat kan alleen als het allel recessief is.",
    valkuil:"‘Recessief, want er zijn maar weinig zieken’ of een redenering met I-1 en I-2. Daaruit is dominant of recessief niet af te leiden: 0 punten.",
    after:()=>waaromBtn(ans,b=>b.append(el("div",{},STAMB({"II-3":"var(--goud)","II-4":"var(--goud)","III-3":"var(--koraal)"}))))});
  q.append(think,ans);
},STOF5);
const c6=vraag(2,"wat bewijst de stamboom?",(q,id)=>{
  pre(q,"<p>Over de stamboom in afbeelding 1 worden drie uitspraken gedaan.</p>");
  q.append(el("p",{class:"qtext"},"1 Uit de stamboom blijkt dat het gen voor choroideremie op het X-chromosoom ligt.<br>2 Uit het fenotype van II-2 blijkt dat het gen niet op het Y-chromosoom ligt.<br>3 Als het gen op een autosoom zou liggen, moet II-4 heterozygoot zijn.<br><br><b>Geef bij elke uitspraak aan of hij juist of onjuist is.</b>"));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  choiceStep(think,{q:"Stel dat het allel autosomaal recessief is (a). Welk genotype heeft III-3 dan, en wat betekent dat voor zijn vader II-4?",opts:["III-3 is aa, dus II-4 gaf een a door en is (gezond) Aa","III-3 is aa, maar II-4 kan AA zijn","dat kan niet: dan klopt de stamboom niet"],right:0,
    ok:"Ja. Een autosomale verklaring is dus mogelijk, als II-4 toevallig drager is. Wat betekent dat voor uitspraak 1?",no:"III-3 krijgt van elke ouder één allel. Hoe krijgt hij dan twee a's?",
    onDone:()=>choiceStep(think,{q:"Als een gen op het Y-chromosoom ligt, wie krijgt het dan van een zieke vader?",opts:["al zijn zonen","al zijn dochters","de helft van zijn kinderen"],right:0,ok:"Goed. Kijk nu naar I-1 en zijn zoon II-2.",no:"Een vader geeft zijn Y alleen aan zonen, en dan aan elke zoon.",onDone:unlock})});
  juistOnjuist(ans,{id,stm:["uit de stamboom blijkt: X-chromosoom","II-2: niet op het Y-chromosoom","autosomaal: II-4 heterozygoot"],key:[false,true,true],
    uitleg:b=>{b.append(el("div",{class:"model"},"1 <b>onjuist</b>: de stamboom past bij X-chromosomaal recessief, maar ook bij autosomaal recessief (als II-4 toevallig drager is). Passen is geen bewijs.<br>2 <b>juist</b>: bij Y-chromosomale overerving geeft een zieke vader het aan al zijn zonen; II-2 is gezond.<br>3 <b>juist</b>: III-3 is dan aa en kreeg van beide ouders een a. II-4 is gezond, dus Aa."));
      b.append(el("div",{},STAMB({"I-1":"var(--koraal)","II-2":"var(--goud)","II-4":"var(--teal)"})));}});
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
    valkuil:"Voor III-4 maar één genotype noemen (dan geen tweede punt), of een notatie zonder Y, zoals ‘X<sup>a</sup>’ of ‘aa’ voor I-1: fout."});
  q.append(think,ans);
},STOF5);
const c8=vraag(2,"kans op een zoon met choroideremie",(q,id)=>{
  pre(q,"<p>III-4 en een man zonder choroideremie willen een kind.</p>");
  const {think,ans,unlock}=start(q,B("Bereken hoe groot de kans is dat hun eerste kind een jongen met choroideremie is. Laat je berekening zien."));
  choiceStep(think,{q:"Hoe groot is de kans dat III-4 draagster is?",opts:["1/4","1/2","2/3","1"],right:1,ok:"Ja: haar moeder is X<sup>A</sup>X<sup>a</sup>, haar vader geeft X<sup>A</sup>.",no:"Ze kreeg van haar moeder X<sup>A</sup> of X<sup>a</sup>, met even grote kans.",
    onDone:()=>choiceStep(think,{q:"Als ze draagster is: hoe groot is de kans dat een kind een <b>jongen met choroideremie</b> (X<sup>a</sup>Y) is?",opts:["1/2","1/4","1/8"],right:1,
      ok:"Goed: X<sup>a</sup> van moeder (½) én Y van vader (½). Vermenigvuldig nu met de kans dat ze draagster is.",no:"Er moeten twee dingen gebeuren: ze geeft X<sup>a</sup> door én het wordt een jongen.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:["Kans dat III-4 draagster is (X<sup>A</sup>X<sup>a</sup>) = <b>1/2</b>.","Als ze draagster is: kans op een jongen met X<sup>a</sup>Y = 1/2 × 1/2 = 1/4; totaal <b>1/2 × 1/4 = 1/8</b> (12,5%)."],
    model:"Kans draagster: ½. Kans dat zij X<sup>a</sup> doorgeeft: ½. Kans op een jongen: ½. Totaal ½ × ½ × ½ = 1/8.",
    valkuil:"III-4 als zeker draagster rekenen (1/4), of ‘een jongen met choroideremie’ lezen als ‘als het een jongen is, is hij dan ziek’ (1/2 × 1/2 = 1/4). In beide gevallen geen tweede punt.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[{cap:"Eerst: is III-4 draagster? Kans ½.",t:0},{cap:"Dan: geeft ze X<sup>a</sup> door? Kans ½.",t:1},{cap:"En: wordt het een jongen (Y van de vader)? Kans ½.",t:2},{cap:"Alles tegelijk: ½ × ½ × ½ = <b>1/8</b>.",t:3}],(st,s)=>{
      const W=[0,1,2].map(k=>k<=s.t);const box=(x,t,on)=>`<rect x="${x}" y="40" width="150" height="70" rx="12" fill="${on?"var(--goud-soft)":"none"}" stroke="${on?"var(--goud)":"var(--line2)"}"/><text x="${x+75}" y="70" text-anchor="middle" class="lbl">${t}</text><text x="${x+75}" y="94" text-anchor="middle" class="lbl" style="font-size:16px">${on?"½":""}</text>`;
      st.innerHTML=svgWrap("0 0 600 150",box(20,"III-4 draagster",W[0])+`<text x="185" y="80" class="lbl">×</text>`+box(205,"geeft Xᵃ door",W[1])+`<text x="370" y="80" class="lbl">×</text>`+box(390,"een jongen",W[2])+(s.t===3?`<text x="300" y="138" text-anchor="middle" class="lbl" style="fill:var(--goud-text);font-size:16px">= 1/8</text>`:""),"Kansketen");}))});
  q.append(think,ans);
},STOF5);
const c9=vraag(2,"waarom vooral mannen",(q,id)=>{
  pre(q,"<p>Choroideremie komt bijna alleen bij mannen voor.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit hoe dat komt. Noem in je uitleg zowel wat er bij een man als wat er bij een vrouw nodig is om de ziekte te krijgen."));
  choiceStep(think,{q:"Hoeveel allelen voor dit gen heeft een man?",opts:["één","twee","geen"],right:0,ok:"Ja: hij heeft maar één X, en op de Y ligt dit gen niet.",no:"Het gen ligt op de X. Hoeveel X-chromosomen heeft een man?",
    onDone:()=>choiceStep(think,{q:"Een vrouw met choroideremie is X<sup>a</sup>X<sup>a</sup>. Wat betekent dat voor haar vader?",opts:["hij moet zelf choroideremie hebben","hij kan gezond zijn"],right:0,ok:"Goed: zijn enige X is X<sup>a</sup>. En haar moeder moet ook een X<sup>a</sup> hebben. Hoe vaak komt die combinatie voor bij een zeldzaam allel?",no:"Van wie kreeg ze haar tweede X?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:["Een man heeft maar <b>één X-chromosoom</b>, dus <b>één X<sup>a</sup></b> is genoeg (er is geen tweede allel dat het normale eiwit kan laten maken).",
    "Een vrouw moet <b>X<sup>a</sup>X<sup>a</sup></b> hebben: haar vader moet ziek zijn én haar moeder draagster (of ziek), en die combinatie is bij een zeldzaam allel heel onwaarschijnlijk."],
    model:"Een man (X<sup>a</sup>Y) is al ziek met één X<sup>a</sup>, want hij heeft geen tweede X met een normaal allel. Een vrouw is alleen ziek als ze X<sup>a</sup>X<sup>a</sup> heeft. Dan moet haar vader ziek zijn en haar moeder het allel ook hebben. Omdat het allel zeldzaam is, gebeurt dat bijna nooit.",
    valkuil:"Alleen ‘vrouwen hebben twee X-chromosomen’ is te weinig voor het tweede punt: zeg ook wat dat voor de ouders betekent. ‘Het gen ligt op de Y’ levert 0 punten op."});
  q.append(think,ans);
},STOF5);
const ids=[c5,c6,c7,c8,c9];
if(VWO){ids.push(vraag(2,"mitochondriaal DNA",(q,id)=>{
  pre(q,"<p>Ook LHON (Leber hereditaire opticusneuropathie) is een erfelijke oogziekte: vooral jonge mannen gaan er in korte tijd veel slechter door zien. LHON wordt veroorzaakt door een mutatie in het DNA van de mitochondriën.</p><p>Een man met LHON en een vrouw zonder deze mutatie krijgen kinderen.</p>");
  const {think,ans,unlock}=start(q,B("Kunnen deze kinderen de mutatie van hun vader erven? Leg je antwoord uit."));
  choiceStep(think,{q:"Waar komen de mitochondriën van een bevruchte eicel vandaan?",opts:["uit de eicel","uit de zaadcel","de helft uit elk"],right:0,
    ok:"Ja. De eicel bevat er heel veel; de paar mitochondriën van de zaadcel worden na de bevruchting afgebroken.",no:"Vergelijk de grootte van een eicel en een zaadcel. En wat gebeurt er met de mitochondriën uit de zaadcel?",onDone:unlock});
  openAnswer(ans,{id,pts:2,checks:["Mitochondriën (en dus het mitochondriaal DNA) komen alleen via de <b>eicel</b>; de mitochondriën van de zaadcel worden na de bevruchting <b>afgebroken</b>.","Dus <b>geen enkel kind</b> erft de mutatie van de vader (ook zijn zonen niet)."],
    model:"Nee. Het mitochondriaal DNA erft alleen via de moeder over: de eicel levert alle mitochondriën, die van de zaadcel worden afgebroken. De kinderen van deze man krijgen de mutatie dus niet.",
    valkuil:"‘Alleen de zonen, want LHON komt vooral bij mannen voor.’ Dat de ziekte vaker bij mannen tot uiting komt, zegt niets over de manier van overerven."});
  q.append(think,ans);
},{titel:"Mitochondriaal DNA",html:"<p>Mitochondriën hebben hun eigen, kleine ringvormige DNA-molecuul (37 genen bij de mens). Een eicel bevat ongeveer honderdduizend mitochondriën, een zaadcel hooguit ongeveer honderd, in het middenstuk.</p>",films:[F.x]}));}
opgave("Choroideremie","Choroideremie",`
<p>Choroideremie is een zeldzame erfelijke oogziekte (ongeveer 1 op de 50 000 tot 100 000 mensen). Door een mutatie in het gen <i>CHM</i> gaan cellen van het netvlies en van het vaatvlies (de choroidea) geleidelijk dood. Het eerste verschijnsel is meestal nachtblindheid, al op jonge leeftijd. Later wordt het gezichtsveld steeds kleiner (kokerzien) en uiteindelijk worden patiënten blind.</p>
<p>Afbeelding 1 is de stamboom van een familie waarin choroideremie voorkomt.</p>${STAMHTML}<div>${STAMB()}</div>`,ids);
}
