/* ===== Opgave 6: Geel gras onder het zwembad (inzicht versie 1; EI-stofwisseling-C01, C02, C03, havo C04 / vwo C05) ===== */
{
const TAB3=TABEL(3,["","droge massa (g)"],[["vóór de proef","25"],["na 2 weken onder het zwembad","22"],["na 2 weken naast het zwembad","32"]],"(fictieve gegevens)");
const STOF_DELEN={titel:"De twee delen van de fotosynthese",html:`
<p>In een chloroplast liggen in het stroma platte zakjes: de <b>thylakoïden</b>. In hun membraan zit chlorofyl.</p>
<ul style="margin:0;padding-left:20px"><li>De <b>lichtreactie</b> gebeurt in de thylakoïden. Ze gebruikt licht en water, en levert O₂, ATP en NADPH,H⁺.</li>
<li>De <b>calvincyclus</b> gebeurt in het stroma. Enzymen leggen daar CO₂ vast en maken er glucose van, met ATP en NADPH,H⁺.</li></ul>
<p>Kijk bij een vraag over een stoornis steeds: wat heeft elk deel nodig, en waar komt dat vandaan?</p>`,
films:[F.g]};
const STOF_BALANS={titel:"Groeien of krimpen",html:`
<p><b>Biomassa</b> is alle organische stof in een plant. Bij <b>assimilatie</b> bouwt de plant grotere organische stoffen op uit kleine; bij <b>dissimilatie</b> breekt hij ze af tot CO₂ en water. Is de assimilatie groter dan de dissimilatie, dan neemt de biomassa toe; is ze kleiner, dan neemt de biomassa af.</p>
<p>Bij een bepaalde lichtintensiteit zijn assimilatie en dissimilatie even groot: het <b>compensatiepunt</b>.</p>`,
films:[F.g]};

const q18=vraag(1,"wat stopte als eerste?",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Welk deel van de fotosynthese stopte onder het zwembad als eerste?"));
  choiceStep(think,{q:"Wat valt onder het zwembad weg?",opts:["licht","CO₂","water"],right:0,
    ok:"Ja: het zwembad laat geen licht door. Welk deel van de fotosynthese gebruikt het licht zelf?",no:"Lees de inleiding nog eens: wat laat het zwembad niet door?",
    onDone:()=>choiceStep(think,{q:"De calvincyclus gebruikt ATP en NADPH,H⁺. Waar komen die vandaan?",opts:["uit de lichtreactie","uit de mitochondriën","uit de bodem"],right:0,
      ok:"Goed. Welk deel stopt dus meteen, en welk deel pas als die voorraad op is?",no:"Kijk bij ‘Uitleg van de stof’ wat de lichtreactie levert.",onDone:unlock})});
  mc(ans,{qid:id,pts:1,right:3,opts:["de calvincyclus in het stroma","de dissimilatie in de mitochondriën","de opname van water door de wortels","de lichtreactie in de thylakoïden"],
    onChecked:()=>waaromBtn(ans,textBox("<b>D</b>: zonder licht vangt chlorofyl geen licht meer, dus de lichtreactie stopt meteen. De calvincyclus (A) stopt pas daarna, als ATP en NADPH,H⁺ op zijn. De naam ‘donkerreactie’ is verwarrend: in het donker stopt hij juist ook. B is geen deel van de fotosynthese en gaat gewoon door; ook C is geen deel van de fotosynthese."))});
  q.append(think,ans);
},STOF_DELEN);

/* balans van assimilatie (licht) en dissimilatie over een etmaal; stand: onder | naast */
function BALANS(stand,toon=2){
  const onder=stand==="onder";let s="";
  const balk=(x,h,kleur,lab)=>`<rect x="${x}" y="${170-h}" width="70" height="${Math.max(h,1.5)}" rx="4" fill="${kleur}"/><text x="${x+35}" y="190" text-anchor="middle" class="lblm">${lab}</text>`;
  s+=`<path d="M40,170 H600" stroke="var(--text2)" stroke-width="1.4"/>`;
  s+=`<text x="155" y="22" text-anchor="middle" class="lbl">overdag</text><text x="455" y="22" text-anchor="middle" class="lbl">'s nachts</text>`;
  s+=balk(80,onder?0:130,"var(--groen)","assimilatie")+balk(160,40,"var(--koraal)","dissimilatie");
  s+=balk(380,0,"var(--groen)","assimilatie")+balk(460,40,"var(--koraal)","dissimilatie");
  if(onder)s+=`<text x="115" y="160" text-anchor="middle" class="lblm">0</text><text x="415" y="160" text-anchor="middle" class="lblm">0</text>`;
  if(toon>=2){const net=onder?"biomassa neemt af, dag én nacht":"over een hele dag: assimilatie groter dan dissimilatie → biomassa neemt toe";
    s+=`<text x="320" y="222" text-anchor="middle" class="lbl" style="fill:${onder?"var(--koraal)":"var(--groen)"}">${net}</text>`;}
  return FIG("0 0 640 236",s,"Assimilatie en dissimilatie overdag en 's nachts (schematisch)",520,640);}

const q19=vraag(2,"de droge massa nam af",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Leg uit waardoor de droge massa van het gras onder het zwembad in de twee weken afnam."));
  choiceStep(think,{q:"Is er onder het zwembad fotosynthese?",opts:["nee, er is geen licht","ja, gewoon"],right:0,
    ok:"Ja. Komt er dan nog organische stof bij?",no:"Fotosynthese heeft licht nodig.",
    onDone:()=>choiceStep(think,{q:"Gaat de dissimilatie in het gras door in het donker?",opts:["ja, een plant dissimileert dag en nacht","nee, alleen als er licht is"],right:0,
      ok:"Goed. Wat betekent dat voor de organische stof in het gras?",no:"Ook wortels, zonder chloroplasten, hebben ATP nodig.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Zonder licht is er <b>geen fotosynthese</b> (geen koolstofassimilatie), dus komt er <b>geen organische stof bij</b>.",
    "De <b>dissimilatie gaat door</b>: organische stof wordt afgebroken tot CO₂ en water, zodat de biomassa daalt."],
    model:"Onder het zwembad is geen licht, dus is er geen fotosynthese: er komt geen organische stof bij. Het gras dissimileert wel door, dag en nacht. Daarbij wordt organische stof afgebroken tot CO₂ en water, die het gras verlaten. Daardoor neemt de droge massa af.",
    valkuil:"‘Het gras gaat dood’ of ‘het gras droogt uit’ legt het niet uit. Het gaat om de droge massa: de organische stof die verdwijnt door dissimilatie.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Naast het zwembad: overdag legt het gras meer vast dan het afbreekt; 's nachts alleen dissimilatie.",st:"naast",t:1},
      {cap:"Onder het zwembad: geen licht, dus geen assimilatie. De dissimilatie gaat dag en nacht door: er verdwijnt steeds organische stof als CO₂ en water.",st:"onder",t:2}],
      (st,s)=>st.innerHTML=BALANS(s.st,s.t)))});
  q.append(think,ans);
},STOF_BALANS);

const q20=vraag(2,"rekenen aan het gazon",(q,id)=>{
  pre(q,"<p>Jesse weegt van een stukje gazon van 0,1 m² de droge massa van het gras: vóór de proef, na twee weken onder het zwembad, en na twee weken naast het zwembad (tabel 3).</p>"+TAB3);
  const {think,ans,unlock}=start(q,"<b>a</b> Bereken met hoeveel procent de droge massa onder het zwembad is afgenomen.<br><b>b</b> Ook het gras naast het zwembad dissimileert dag en nacht. Leg uit waardoor het toch zwaarder werd.");
  numStep(think,{uid:"q"+id+"n",q:"Met hoeveel gram is de droge massa onder het zwembad afgenomen?",right:3,
    ok:"Ja: 25 − 22 = 3 g. Welk deel van de beginmassa is dat, in procent?",no:"Trek de massa na twee weken af van de massa vóór de proef.",
    onDone:()=>choiceStep(think,{q:"Hoe heet de lichtintensiteit waarbij assimilatie en dissimilatie even groot zijn?",opts:["het compensatiepunt","het optimum","de verzadiging"],right:0,
      ok:"Goed. Waar lag het licht naast het zwembad ten opzichte van dat punt? Vergeet de nacht niet.",no:"Kijk bij ‘Uitleg van de stof’.",onDone:unlock})});
  rekenOpen(ans,{id,reken:["a · afname","%",v=>Math.abs(v-12)<0.05,"(25 − 22) : 25 × 100 = <b>12 %</b>"],
    check:"<b>b</b> Overdag lag het licht <b>ruim boven het compensatiepunt</b>, zodat de <b>assimilatie over een hele dag</b> (met de nacht erbij) <b>groter</b> was dan de dissimilatie.",
    model:"Naast het zwembad kreeg het gras overdag veel licht, ruim boven het compensatiepunt. Overdag legde het daardoor veel meer vast dan het afbrak. Dat was meer dan wat het 's nachts door dissimilatie verloor. Over een hele dag was de assimilatie dus groter dan de dissimilatie: de biomassa nam toe.",
    valkuil:"Bij a: 3 : 22 × 100 ≈ 13,6 % deelt door de eindmassa; een afname reken je uit tegenover de beginmassa. Bij b: ‘overdag dissimileert het gras niet’ is fout.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"a: afname 25 − 22 = 3 g. Ten opzichte van de beginmassa: 3 : 25 × 100 = 12 %.",st:"onder",t:2},
      {cap:"b: naast het zwembad was de assimilatie overdag veel groter dan de dissimilatie. 's Nachts gaat er een beetje af, maar over de hele dag blijft er meer over: 25 → 32 g.",st:"naast",t:2}],
      (st,s)=>st.innerHTML=BALANS(s.st,s.t)))});
  q.append(think,ans);
},STOF_BALANS);

const ids=[q18,q19,q20];
if(!VWO){
const STOF_JOD={titel:"Zetmeel aantonen",html:`
<p>Met <b>jodium</b> toon je zetmeel aan: waar zetmeel zit, kleurt jodium blauwzwart. Zetmeel is een reservestof die een plant van glucose maakt.</p>
<p>Een plant maakt zetmeel en breekt het ook weer af. Bedenk dus bij een kleurproef: kon het blad zetmeel maken, en is het er nog?</p>`,
films:[F.g]};
ids.push(vraag(2,"de jodiumproef",(q,id)=>{
  pre(q,"<p>Jesse kleurt ’s avonds een grasblad van onder het zwembad en een blad van ernaast met jodium.</p>");
  const {think,ans,unlock}=start(q,B("Voorspel welk blad blauwzwart kleurt, en verklaar het verschil."));
  choiceStep(think,{q:"Welke stof kleurt blauwzwart met jodium?",opts:["zetmeel","glucose","chlorofyl"],right:0,
    ok:"Ja. Waar maakt een blad zetmeel van, en wat heeft het daarvoor nodig?",no:"Jodium toont een reservestof aan.",
    onDone:()=>choiceStep(think,{q:"Welk blad kon de afgelopen twee weken glucose maken?",opts:["alleen het blad naast het zwembad","alleen het blad onder het zwembad","allebei"],right:0,
      ok:"Goed. En wat is er gebeurd met het zetmeel dat het blad onder het zwembad vóór de proef had?",no:"Glucose maken kan alleen met licht.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Alleen het blad van <b>naast het zwembad</b> kleurt blauwzwart.",
    "Het blad onder het zwembad kreeg <b>geen licht</b>: er is <b>geen zetmeel gemaakt</b>, en het zetmeel dat er was, is (door dissimilatie) <b>afgebroken</b>."],
    model:"Alleen het blad van naast het zwembad kleurt blauwzwart. Dat blad kreeg licht, maakte glucose en daarvan zetmeel. Het blad onder het zwembad kreeg geen licht: het kon geen zetmeel maken, en het zetmeel dat er was, heeft het in de twee weken afgebroken voor de dissimilatie.",
    valkuil:"Alleen ‘onder het zwembad is geen licht’ zonder wat dat met het zetmeel doet: hooguit 1 punt voor de voorspelling.",
    after:()=>waaromBtn(ans,textBox("Jodium kleurt <b>zetmeel</b> blauwzwart. Zetmeel maakt een blad van glucose, en glucose maakt het alleen met licht. Onder het zwembad kwam twee weken geen licht: er kwam geen zetmeel bij, en het blad brak zijn voorraad af. Naast het zwembad maakte het blad die dag zetmeel; ’s avonds zit het er nog. (Na een hele nacht in het donker kleurt ook dat blad bijna niet meer.)"))});
  q.append(think,ans);
},STOF_JOD));
}else{
const STOF_SPEC={titel:"Licht en kleur",html:`
<p>Wit licht bestaat uit alle kleuren, van violet (golflengte ongeveer 400 nm) tot rood (ongeveer 700 nm). Een kleurstof absorbeert sommige kleuren en laat andere door of weerkaatst ze.</p>
<p>Een <b>absorptiespectrum</b> laat zien welke kleuren licht een stof absorbeert: op de x-as de golflengte, op de y-as hoeveel licht er geabsorbeerd wordt. Alleen geabsorbeerd licht kan energie leveren voor de lichtreactie.</p>`,
films:[F.g]};
/* vereenvoudigd absorptiespectrum van chlorofyl (vorm naar het bekende verloop, geen meetgegevens) */
function SPECTRUM(groen=false,label=true){
  const g=(x,mu,s,h)=>h*Math.exp(-0.5*((x-mu)/s)**2);
  const A=nm=>0.04+g(nm,430,18,0.95)+g(nm,455,15,0.55)+g(nm,662,13,0.8)+g(nm,642,12,0.35);
  const X0=70,X1=600,xs=nm=>X0+(nm-400)/300*(X1-X0),ys=a=>230-a*170;
  let s="";
  const kl=[[400,"#7a4bd1"],[450,"#2f6fe0"],[500,"#1fa7a0"],[550,"#3cae4a"],[600,"#e0a21f"],[650,"#e0641f"],[700,"#c62828"]];
  s+=`<defs><linearGradient id="spg" x1="0" x2="1">${kl.map(([n,c])=>`<stop offset="${(n-400)/300}" stop-color="${c}"/>`).join("")}</linearGradient></defs>`;
  s+=`<rect x="${X0}" y="240" width="${X1-X0}" height="12" fill="url(#spg)" rx="2"/>`;
  if(groen)s+=`<rect x="${xs(500)}" y="30" width="${xs(570)-xs(500)}" height="210" fill="var(--groen)" opacity=".18"/><text x="${xs(535)}" y="44" text-anchor="middle" class="lbl">groen licht</text>`;
  s+=`<path d="M${X0-8},28 V230 H${X1+8}" fill="none" stroke="var(--text2)" stroke-width="1.4"/>`;
  let d="";for(let nm=400;nm<=700;nm+=3)d+=`${nm===400?"M":"L"}${xs(nm).toFixed(1)},${ys(A(nm)).toFixed(1)} `;
  s+=`<path d="${d}" fill="none" stroke="var(--text)" stroke-width="2.6" stroke-linejoin="round"/>`;
  [400,500,600,700].forEach(n=>s+=`<text x="${xs(n)}" y="270" text-anchor="middle" class="lblm">${n}</text>`);
  s+=`<text x="${(X0+X1)/2}" y="290" text-anchor="middle" class="lblm">golflengte (nm)</text>`;
  s+=`<text x="22" y="130" text-anchor="middle" class="lblm" transform="rotate(-90 22 130)">absorptie (relatief)</text>`;
  if(label)s+=`<text x="${xs(600)}" y="${ys(0.25)}" text-anchor="middle" class="lbl">chlorofyl</text>`;
  s+=`<text x="${X1+8}" y="16" text-anchor="end" class="lblm">vereenvoudigd · geen meetgegevens</text>`;
  return FIG("0 0 640 300",s,"Vereenvoudigd absorptiespectrum van chlorofyl",520,640);}
ids.push(vraag(2,"een groen zwembad",(q,id)=>{
  pre(q,"<p>De buurman heeft een zwembad van groen, doorschijnend plastic. Er komt licht doorheen, maar vooral groen licht. Ook onder dit zwembad wordt het gras na twee weken geel.</p>");
  const {think,ans,unlock}=start(q,B("Verklaar dit met het absorptiespectrum van chlorofyl."));
  choiceStep(think,{q:"Waarom zie je een blad groen?",opts:["groen licht wordt het meest geabsorbeerd","groen licht wordt weinig geabsorbeerd; een deel wordt weerkaatst"],right:1,
    ok:"Ja. Wat betekent dat voor licht dat vooral groen is?",no:"Wat je ziet, is het licht dat het blad níet opneemt maar terugkaatst naar je oog.",
    onDone:()=>choiceStep(think,{q:"Stel: het bruikbare licht ligt onder het compensatiepunt. Wat is dan groter?",opts:["de dissimilatie","de assimilatie"],right:0,
      ok:"Goed. Maak de keten af: groen licht → chlorofyl → lichtreactie → biomassa.",no:"Onder het compensatiepunt breekt de plant meer af dan hij vastlegt.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Chlorofyl absorbeert <b>groen licht het minst</b> (vooral blauw en rood).",
    "Daardoor levert de lichtreactie weinig energie: het (bruikbare) licht ligt <b>onder het compensatiepunt</b>, de <b>dissimilatie is groter dan de assimilatie</b> en de biomassa neemt af."],
    model:"Chlorofyl absorbeert vooral blauw en rood licht, en groen licht het minst. Onder het groene zwembad komt dus vooral licht dat chlorofyl nauwelijks gebruikt. De lichtreactie levert weinig ATP en NADPH,H⁺, en de fotosynthese is laag: het bruikbare licht ligt onder het compensatiepunt. De dissimilatie is dan groter dan de assimilatie, en de biomassa van het gras neemt af.",
    valkuil:"‘Er komt licht door, dus het gras kan gewoon fotosynthese doen’: het gaat om licht dat chlorofyl absorbeert. ‘Groen licht wordt het meest geabsorbeerd, want het blad is groen’ is omgekeerd.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Het absorptiespectrum: chlorofyl absorbeert vooral blauw (links) en rood (rechts) licht.",g:false},
      {cap:"Groen licht (± 500–570 nm) absorbeert chlorofyl het minst: een deel wordt weerkaatst, daarom zie je bladeren groen.",g:true},
      {cap:"Onder het groene zwembad levert het licht dus weinig energie voor de lichtreactie: onder het compensatiepunt is de dissimilatie groter dan de assimilatie. De biomassa neemt af en het gras wordt geel.",g:true}],
      (st,s)=>st.innerHTML=SPECTRUM(s.g)))});
  q.append(think,ans);
},STOF_SPEC));
}
opgave("Gras","Geel gras onder het zwembad",`
<p>Jesse zet in juni een opblaaszwembad op het gazon. Het zwembad laat geen licht door. Na twee weken haalt hij het weg: het gras eronder is geel en slap. Naast het zwembad is het gras groen en gegroeid. Na een paar weken is het gras op de plek van het zwembad weer groen.</p>`,ids);
}
