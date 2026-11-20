/* ===== Opgave 6: Vasten op het nest (eigen vragen A2–A5, vwo + A6; film 1 en 5) =====
   Bron context: Bertile e.a. 2016, Scientific Reports 6:39008 (zie eigen/voeding.json); 1,2 kg vet is fictief. */
{
const STOF_BRAND={titel:"Brandstof en reserve",html:`
<p>Koolhydraten, vetten en eiwitten kun je allemaal als brandstof gebruiken. Per gram leveren koolhydraten en eiwitten ongeveer 17 kJ, vet ongeveer 37 kJ.</p>
<p>Wat je niet meteen verbrandt, bewaar je als reserve: een klein beetje als <b>glycogeen</b> (een keten van glucose) in je lever en spieren, en het meeste als <b>vet</b>. Glycogeen wordt samen met water opgeslagen, vet bijna zonder water.</p>
<p>Rekenen met eenheden: 1 kg = 1000 g. Reken eerst alles om naar dezelfde eenheid.</p>`,
films:[F.eten]};
const STOF_EIWIT={titel:"Eiwit is bouwstof",html:`
<p>Eiwit is vooral <b>bouwstof</b>. Je spieren bestaan voor een groot deel uit eiwit, en ook enzymen, veel hormonen en antistoffen zijn eiwitten.</p>
<p>Je lichaam breekt elke dag een deel van zijn eigen eiwit af en bouwt het weer op. Aminozuren die over zijn, breekt de lever af: het stikstofdeel wordt een afvalstof die met de urine je lichaam verlaat.</p>`,
films:[F.eten,F.lever]};
const STOF_VET={titel:"Vet in water",html:`
<p>Vet lost niet op in water. Bloedplasma bestaat voor het grootste deel uit water.</p>
<p>Vet uit de darm wordt in de epitheelcellen verpakt in kleine bolletjes en gaat via de lymfe naar het bloed. Ook stoffen die de lever afgeeft, moeten met het bloed mee naar de cellen.</p>`,
films:[F.darm,F.lever]};

/* klik-animatie: hoe zwaar is dezelfde energie als vet of als glycogeen? */
function GEWICHT(stap){
  const sc=40,X0=150,bar=(y,kg,c,t)=>`<rect x="${X0}" y="${y}" width="${Math.max(2,kg*sc)}" height="34" rx="5" fill="${c}"/><text x="${X0-12}" y="${y+22}" text-anchor="end" class="lbl">${t}</text>`;
  let s="";
  s+=bar(30,1.2,"var(--goud)","vet");s+=`<text x="${X0+1.2*sc+10}" y="52" class="lbl">1,2 kg → 44 400 kJ</text>`;
  if(stap>=1){s+=bar(100,2.61,"var(--teal)","glycogeen");s+=`<text x="${X0+2.61*sc+10}" y="122" class="lbl">44 400 / 17 = 2612 g ≈ 2,6 kg</text>`;}
  if(stap>=2){s+=`<rect x="${X0}" y="170" width="${2.61*sc}" height="34" rx="5" fill="var(--teal)"/><rect x="${X0+2.61*sc}" y="170" width="${7.84*sc}" height="34" rx="5" fill="var(--teal-soft)" stroke="var(--teal)"/><text x="${X0-12}" y="192" text-anchor="end" class="lbl">+ water</text>`;
    s+=`<text x="${X0+5}" y="225" class="lblm">2,6 kg glycogeen + 3 × 2,6 = 7,8 kg water</text>`;}
  if(stap>=3)s+=`<text x="${X0+10.45*sc}" y="192" text-anchor="end" class="lbl" style="fill:var(--text)">≈ 10,4 kg</text>`;
  [0,2,4,6,8,10].forEach(k=>s+=`<path d="M${X0+k*sc},240 v6" stroke="var(--text2)"/><text x="${X0+k*sc}" y="262" text-anchor="middle" class="lblm">${k}</text>`);
  s+=`<path d="M${X0},240 H${X0+11*sc}" stroke="var(--text2)"/><text x="${X0+5.5*sc}" y="280" text-anchor="middle" class="lblm">massa (kg)</text>`;
  return `<div class="vdfig" style="max-width:620px;margin:0 auto;width:100%;--min:520px">`+svgWrap("0 0 620 290",s,"Staafdiagram: massa van dezelfde energie als vet en als glycogeen met water")+`</div>`;}

const ids=[];
ids.push(vraag(2,"rekenen: vet of glycogeen meenemen",(q,id)=>{
  pre(q,"<p>Stel dat een pinguïn tijdens het vasten 1,2 kg lichaamsvet verbrandt (fictief getal). Vet levert 37 kJ per gram.</p>");
  const {think,ans,unlock}=start(q,B("a Bereken hoeveel kJ dit vet heeft geleverd.<br>b Stel dat de pinguïn dezelfde energie als glycogeen had meegenomen. Glycogeen levert 17 kJ per gram, en bij elke gram glycogeen zit 3 gram water. Bereken hoeveel kilogram die voorraad glycogeen met water zou wegen."));
  numStep(think,{uid:"q"+id+"n1",q:"Hoeveel gram is 1,2 kg?",right:1200,
    ok:"Ja. Nu kun je a uitrekenen met de kJ per gram.",no:"1 kg = 1000 g.",
    onDone:()=>numStep(think,{uid:"q"+id+"n2",q:"Bij elke gram glycogeen zit 3 gram water. Hoeveel gram weegt 1 gram glycogeen samen met zijn water?",right:4,
      ok:"Goed. Reken bij b eerst uit hoeveel gram glycogeen dezelfde energie levert, en tel dan het water erbij.",no:"1 gram glycogeen + 3 gram water = ?",onDone:unlock})});
  NUM(ans,{id,fields:[
    ["a energie uit het vet","kJ",v=>Math.abs(v-44400)<=50,"1200 × 37 = 44 400 kJ"],
    ["b glycogeen met water","kg",(v,a)=>(v>=10&&v<=10.5)||(a[0]>0&&Math.abs(a[0]-44400)>50&&Math.abs(v-a[0]/17*4/1000)<=0.02*a[0]/17*4/1000),"44 400 / 17 = 2612 g glycogeen; met water × 4 = 10 447 g ≈ 10,4 kg (10–10,5 kg is goed). Rekenfout in a maar goed doorgerekend: dit punt telt wel. Water vergeten (2,6 kg): 0 punten."]],
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"a 1,2 kg vet = 1200 g. 1200 × 37 = <b>44 400 kJ</b>."},
      {cap:"Dezelfde energie als glycogeen: 44 400 / 17 = 2612 g, ongeveer 2,6 kg. Alleen dat is al ruim twee keer zo zwaar."},
      {cap:"Bij elke gram glycogeen zit 3 gram water: 2,6 kg glycogeen neemt 7,8 kg water mee."},
      {cap:"Samen ≈ <b>10,4 kg</b>: bijna negen keer zo zwaar als 1,2 kg vet. Daarom bewaren dieren die lang vasten hun energie als vet."}],
      (st,s,i)=>st.innerHTML=GEWICHT(i)))});
  q.append(think,ans);
},STOF_BRAND));

ids.push(vraag(2,"meer urinezuur in het bloed",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Leg uit waardoor de hoeveelheid urinezuur in het bloed stijgt in de fase met veel eiwitafbraak."));
  choiceStep(think,{q:"Welk deel van een aminozuur wordt bij een vogel urinezuur?",opts:["het stikstofdeel","het hele aminozuur","het deel zonder stikstof"],right:0,
    ok:"Ja, dat staat in de inleiding.",no:"Lees de laatste zin van de tweede alinea van de inleiding nog eens.",
    onDone:()=>choiceStep(think,{q:"In welk orgaan wordt bij jou het stikstofdeel van aminozuren omgezet in ureum?",opts:["in de lever","in de nieren","in de dunne darm"],right:0,
      ok:"Goed. Leg nu het verband: wat gebeurt er in deze fase met het eiwit, en wat levert dat op?",no:"De nieren plassen het uit, maar maken het niet.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "De pinguïn breekt <b>meer eiwit / aminozuren</b> af als brandstof.",
    "Het <b>stikstofdeel</b> van die aminozuren wordt (in de lever) omgezet in <b>urinezuur</b>, dat in het bloed komt."],
    model:"In deze fase breekt de pinguïn veel meer eiwit af en verbrandt hij de aminozuren. Van al die aminozuren blijft het stikstofdeel over. De lever zet dat om in urinezuur, dat in het bloed komt. Hoe meer eiwitafbraak, hoe meer urinezuur.",
    valkuil:"Schrijf je ‘er komt meer ureum’ zonder urinezuur, dan krijg je wel het tweede punt als de redenering klopt."});
  q.append(think,ans);
},STOF_BRAND));

ids.push(vraag(2,"waarom het ei opgeven?",(q,id)=>{
  pre(q,"<p>Onderzoekers denken dat de sterke stijging van de eiwitafbraak voor de pinguïn een signaal is om het nest te verlaten, ook als de partner nog niet terug is.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit waarom het voor de overleving van de pinguïn gunstig is om het ei op dat moment op te geven."));
  choiceStep(think,{q:"Hoeveel van de vetvoorraad is op als de fase met veel eiwitafbraak begint?",opts:["ongeveer 20 %","ongeveer 50 %","ongeveer 80 %"],right:2,
    ok:"Ja. Wat betekent dat voor de brandstof die hij nog heeft?",no:"Lees de inleiding nog eens.",
    onDone:()=>choiceStep(think,{q:"Waarvoor gebruikt een lichaam eiwit normaal vooral?",opts:["als bouwstof","als reservestof","als brandstof"],right:0,
      ok:"Goed. Het eiwit dat de pinguïn nu verbrandt, was dus een deel van zijn lichaam. Bedenk welk deel, en wat dat betekent als hij nog langer blijft zitten.",no:"Bekijk de taken van voedingsstoffen nog eens: welke taak heeft eiwit vooral?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Het <b>vet is bijna op</b>; de pinguïn verbrandt nu <b>eiwit uit zijn spieren</b> (er is geen eiwitvoorraad).",
    "Wacht hij langer, dan heeft hij <b>te weinig spieren / kracht</b> over om naar zee te gaan en voedsel te vangen, en sterft hij; nu kan hij nog weg (en later opnieuw broeden)."],
    model:"Als de eiwitafbraak sterk stijgt, is het vet bijna op en verbrandt de pinguïn eiwit uit zijn eigen spieren; een eiwitvoorraad heeft hij niet. Blijft hij nog langer zitten, dan heeft hij te weinig spierkracht over om naar zee te zwemmen en voedsel te vangen, en gaat hij dood. Door nu te gaan overleeft hij, en kan hij later opnieuw broeden."});
  q.append(think,ans);
},STOF_EIWIT));

ids.push(vraag(1,"glycogeen in het begin van het vasten",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Een pinguïn heeft, net als jij, glycogeen in zijn lever. Wat gebeurt er met die voorraad in het begin van het vasten?"));
  choiceStep(think,{q:"Wat is glycogeen?",opts:["een keten van glucose","een soort vet","een eiwit"],right:0,
    ok:"Ja. Bedenk waarvoor de lever die voorraad heeft.",no:"Glycogeen bestaat uit dezelfde bouwsteen als zetmeel.",onDone:unlock});
  mc(ans,{qid:id,pts:1,right:1,opts:["De voorraad wordt aangevuld, omdat de pinguïn stilzit.","De lever knipt het glycogeen in glucose om de glucose in het bloed op peil te houden; de voorraad is snel op.","De voorraad blijft gelijk tot het vet op is.","Het glycogeen wordt omgezet in urinezuur."],
    onChecked:()=>waaromBtn(ans,textBox("Tussen de maaltijden knipt de lever glycogeen in glucose en geeft die af aan het bloed, zodat de glucose in het bloed ongeveer gelijk blijft. De voorraad is klein: bij jou genoeg voor een nacht. Bij vasten is hij dus snel op. D is fout: glycogeen is een koolhydraat en bevat geen stikstof, dus er kan geen urinezuur van komen. Het antwoord is <b>B</b>."))});
  q.append(think,ans);
},STOF_BRAND));

if(VWO)ids.push(vraag(1,"hoe de lever vet vervoert",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Vet lost niet op in het bloed. Hoe brengt de lever vet en cholesterol naar de cellen, bijvoorbeeld naar de spieren van een pinguïn?"));
  choiceStep(think,{q:"Lost vet op in water?",opts:["ja","nee"],right:1,
    ok:"Klopt, en bloedplasma is vooral water. Hoe kan vet dan toch met het bloed mee naar de cellen?",no:"Denk aan een vette soep: het vet drijft als oogjes bovenop.",onDone:unlock});
  mc(ans,{qid:id,pts:1,right:1,opts:["opgelost in het bloedplasma","verpakt in bolletjes met een jasje van eiwit: lipoproteïnen","via de lymfe","als glycogeen"],
    onChecked:()=>waaromBtn(ans,textBox("Vet en cholesterol lossen niet op in het waterige bloedplasma (A fout). De lever verpakt ze in bolletjes met een jasje van eiwit: <b>lipoproteïnen</b>, zoals LDL. Via de lymfe (C) komt vet uit de darm, niet uit de lever. Glycogeen (D) is een koolhydraat, geen vet. Het antwoord is <b>B</b>."))});
  q.append(think,ans);
},STOF_VET));

opgave("Vasten op het nest","Vasten op het nest",`
<p>Adéliepinguïns broeden in Antarctica. Terwijl de ene ouder op het nest zit, zoekt de andere op zee naar voedsel. De vogel op het nest eet dan dagen tot weken niets.</p>
<p>Onderzoekers volgden broedende Adéliepinguïns. In het begin van het vasten verbrandt een pinguïn vooral vet en spaart hij zijn eiwit. Als ongeveer 80 % van zijn vetvoorraad op is, begint een nieuwe fase: hij breekt dan veel meer eiwit af. In die fase stijgt de hoeveelheid urinezuur in zijn bloed. Vogels maken van het stikstofdeel van aminozuren geen ureum, zoals jij, maar urinezuur.</p>
<p>De meeste pinguïns worden afgelost voordat de fase met veel eiwitafbraak begint. Van de pinguïns die wel in die fase komen, verlaat ongeveer twee derde het nest voordat de partner terug is.</p>`,ids);
}
