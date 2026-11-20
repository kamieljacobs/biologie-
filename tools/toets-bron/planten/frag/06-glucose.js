/* ===== Opgave 6: Wat de plant met glucose doet (EI-planten-D01, D10 uit toetsen-biologie) ===== */
{
const STOF_GRONDSTOF={titel:"Brandstof, bouwstof, reservestof",html:`
<p>De glucose uit de fotosynthese is het begin van alle organische stoffen in een plant. Wat de plant ermee doet, kun je indelen naar de rol die de stof krijgt:</p>
<ul style="margin:0;padding-left:20px">
<li><b>brandstof</b>: de plant breekt de stof af om energie (ATP) vrij te maken;</li>
<li><b>bouwstof</b>: de stof wordt een vast onderdeel van de plant;</li>
<li><b>reservestof</b>: de plant slaat de stof op om hem later te gebruiken; zo'n stof lost meestal niet (goed) op;</li>
<li><b>transportsuiker</b>: de vorm waarin suiker door de plant wordt vervoerd.</li></ul>
<p>Uit glucose andere organische stoffen maken heet <b>voortgezette assimilatie</b>. Voor sommige stoffen heeft de plant naast glucose ook mineralen uit de bodem nodig.</p>`,
films:[F.groen]};
const q1=vraag(2,"vier bestemmingen van glucose",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Een eikenblad maakt glucose. Noem vier dingen die de eik met die glucose doet, en geef bij elk aan of de glucose dan brandstof, bouwstof, reservestof of transportsuiker wordt."));
  choiceStep(think,{q:"Glucose lost goed op in water. Kan een cel grote hoeveelheden glucose zomaar als glucose bewaren?",opts:["ja, dat is geen probleem","nee: veel opgeloste glucose trekt door osmose water de cel in"],right:1,
    ok:"Klopt. Een plant bewaart en vervoert suiker daarom vaak in een andere vorm. Bedenk welke vormen, en wat de plant nog meer met glucose doet.",no:"Denk aan osmose: wat doet water als er in een cel veel meer opgeloste stoffen zitten dan erbuiten?",
    onDone:()=>choiceStep(think,{q:"Wat is het verschil tussen een bouwstof en een reservestof?",opts:["een bouwstof blijft een vast onderdeel van de plant; een reservestof slaat de plant op om later te gebruiken","een bouwstof slaat de plant op om later te gebruiken; een reservestof blijft een vast onderdeel"],right:0,
      ok:"Goed. Noem nu vier bestemmingen, elk met de rol erbij.",no:"Een reservestof wordt later weer gebruikt; een bouwstof blijft zitten waar hij is ingebouwd.",onDone:unlock})});
  openScore(ans,{id,pts:2,score:n=>n>=4?2:n===3?1:0,kop:"Vink elke bestemming aan die jij noemde, mét de juiste rol. Vier juist: 2 punten, drie juist: 1 punt, minder: 0 punten.",checks:[
    "afbreken in de dissimilatie: <b>brandstof</b>",
    "zetmeel: <b>reservestof</b>",
    "sacharose: <b>transportsuiker</b>",
    "cellulose: <b>bouwstof</b> (celwanden, hout)",
    "vet (in zaden): <b>reservestof</b>",
    "eiwitten en andere stoffen (met mineralen): <b>bouwstof</b>"],
    model:"De eik breekt een deel van de glucose af in de dissimilatie (brandstof). Hij maakt er zetmeel van, in het blad en in stam, wortels en eikels (reservestof). Hij maakt sacharose om de suiker via de bastvaten te vervoeren (transportsuiker). En hij maakt er cellulose van voor de celwanden en het hout (bouwstof).",
    valkuil:"Een stof zonder rol, of met de verkeerde rol (bijvoorbeeld ‘zetmeel: bouwstof’), telt niet mee. Zetmeel en cellulose zijn allebei ketens van glucose, maar zetmeel is een reserve en cellulose een bouwstof.",
    after:()=>waaromBtn(ans,textBox("De film volgt één glucose uit een eikenblad. Een deel wordt <b>afgebroken</b> in de dissimilatie: brandstof. De rest is grondstof: <b>zetmeel</b> (lost niet op: reservestof), <b>sacharose</b> (glucose + fructose: de transportsuiker in de bastvaten), <b>cellulose</b> (lange ketens glucose in de celwanden: bouwstof), <b>vet</b> in zaden (reservestof) en, met mineralen zoals nitraat, <b>eiwitten</b> (bouwstof)."))});
  q.append(think,ans);
},STOF_GRONDSTOF);

const STOF_KLEUR={titel:"Licht en kleur",html:`
<p>Wit licht bestaat uit alle kleuren van de regenboog, van violet (golflengte ongeveer 400 nanometer) tot rood (ongeveer 700 nanometer).</p>
<p>Een stof kan licht <b>absorberen</b> (opnemen), <b>weerkaatsen</b> of <b>doorlaten</b>. Alleen geabsorbeerd licht kan energie leveren voor de fotosynthese. De kleur die je van een voorwerp ziet, is de kleur van het licht dat het weerkaatst.</p>
<p>De kleur van het licht is net als licht en CO₂ een factor die de snelheid van de fotosynthese kan beperken.</p>`,
films:[F.groen]};
const q2=vraag(2,"absorptiespectrum en roze-paarse kassen",(q,id)=>{
  const {think,ans,unlock}=start(q,"a "+B("Wat laat een absorptiespectrum van chlorofyl zien? Leg daarmee uit waarom bladeren groen zijn.")+"<br>b Veel kassen met ledlampen gloeien 's avonds roze-paars. "+B("Leg uit waarom tuinders die kleur kiezen."));
  choiceStep(think,{q:"Een rode appel ligt in wit licht. Welk licht komt van de appel in je oog?",opts:["vooral rood licht, dat de appel weerkaatst","vooral groen en blauw licht, dat de appel absorbeert"],right:0,
    ok:"Ja: je ziet de kleur die een voorwerp weerkaatst. Pas dat toe op chlorofyl.",no:"Geabsorbeerd licht komt niet meer terug naar je oog.",
    onDone:()=>choiceStep(think,{q:"Je mengt licht van twee kleuren ledlampen en ziet roze-paars. Welke twee kleuren zijn het?",opts:["rood en blauw","groen en geel","geel en oranje"],right:0,
      ok:"Goed. Waarom zou een tuinder juist die twee kleuren willen?",no:"Paars ligt in de regenboog tussen blauw en … het andere uiteinde?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "a welke kleuren (golflengtes) licht chlorofyl <b>absorbeert</b>; chlorofyl absorbeert vooral <b>blauw en rood</b>, groen het minst; een deel van het groene licht wordt <b>weerkaatst</b>, daarom zie je bladeren groen",
    "b de lampen geven vooral <b>rood en blauw</b> licht: precies de kleuren die chlorofyl absorbeert, dus er gaat <b>weinig licht (energie) verloren</b>"],
    model:"a Een absorptiespectrum laat zien welke kleuren (golflengtes) licht chlorofyl absorbeert. Chlorofyl absorbeert vooral blauw en rood licht, en groen het minst. Een deel van het groene licht wordt weerkaatst, en dat zie je: daarom zijn bladeren groen. b De roze-paarse lampen geven vooral rood en blauw licht. Dat zijn precies de kleuren die chlorofyl absorbeert, dus vrijwel al het licht van de lampen wordt gebruikt voor fotosynthese en er gaat weinig energie verloren.",
    valkuil:"‘Bladeren zijn groen omdat ze groen licht absorberen’ is precies omgekeerd: groen licht wordt het minst geabsorbeerd.",
    after:()=>waaromBtn(ans,textBox("Je ziet de kleur die <b>niet</b> wordt geabsorbeerd. Chlorofyl absorbeert vooral blauw en rood; groen het minst, en een deel ervan wordt weerkaatst: groene bladeren. Een tuinder betaalt voor de stroom van zijn lampen. Groen licht zou grotendeels verloren gaan, dus kiest hij leds die vooral rood en blauw geven: samen zie je dat als roze-paars."))});
  q.append(think,ans);
},STOF_KLEUR);

opgave("Glucose","Wat de plant met glucose doet",`<p>De volgende twee vragen gaan over wat de plant met zijn glucose doet en over het licht dat hij gebruikt.</p>`,[q1,q2]);
}
