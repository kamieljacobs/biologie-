/* ===== Opgave 5: Sla uit een vertical farm (EI-planten-G01, G02, G04 uit toetsen-biologie; afbeelding 1 = G-1 nagetekend) ===== */
{
const STOF_NETTO={titel:"Een grafiek van de CO₂-opname lezen",html:`
<p>Een plant doet overdag twee dingen tegelijk: hij legt CO₂ vast in de fotosynthese (<b>assimilatie</b>) en hij breekt glucose af tot CO₂ en water (<b>dissimilatie</b>). Dissimileren doet een plant dag en nacht.</p>
<p>Wat je in een proef meet, is wat de plant per saldo opneemt: de <b>netto</b> CO₂-opname. Daarin zie je de dissimilatie niet apart. Een negatieve netto opname betekent dat de plant meer CO₂ afgeeft dan hij opneemt.</p>
<p>De <b>biomassa</b> (alle organische stof in de plant) neemt toe als er over een hele periode meer wordt vastgelegd dan afgebroken. Het <b>compensatiepunt</b> is de lichtintensiteit waarbij assimilatie en dissimilatie even groot zijn.</p>`,
films:[F.groen]};
const STOF_BEPERK={titel:"Beperkende factoren",html:`
<p>De snelheid van de fotosynthese hangt af van meerdere factoren tegelijk: lichtintensiteit, kleur van het licht, CO₂-concentratie, temperatuur. De <b>beperkende factor</b> is de factor die op dat moment de snelheid begrenst. Geef je méér van een factor die niet beperkend is, dan verandert de snelheid nauwelijks.</p>
<p>Zo lees je dat in een grafiek met twee lijnen: liggen de lijnen ergens ver uit elkaar, dan maakt het verschil tussen de twee proeven daar veel uit. Liggen ze op elkaar, dan maakt dat verschil daar niets uit.</p>`,
films:[F.groen]};

const q1=vraag(2,"bruto CO₂-opname",(q,id)=>{
  const {think,ans,unlock}=start(q,"Bij een lichtintensiteit van 200 is de netto CO₂-opname van een slaplant 6 mg per uur.<br><br>"+B("Bereken de bruto CO₂-opname bij deze lichtintensiteit. Leg uit hoe je de waarde voor de dissimilatie uit afbeelding 1 haalt."));
  choiceStep(think,{q:"Wat is het verschil tussen netto en bruto?",opts:["netto is wat je meet (opname min afgifte); bruto is alles wat de fotosynthese vastlegt","netto is alles wat de fotosynthese vastlegt; bruto is wat je meet"],right:0,
    ok:"Ja. Om van netto naar bruto te gaan, heb je dus de dissimilatie nodig. Waar in de grafiek zie je die?",no:"Je meet altijd wat de plant per saldo opneemt.",
    onDone:()=>choiceStep(think,{q:"Bij welke lichtintensiteit doet de slaplant géén fotosynthese?",opts:["bij 0","bij het compensatiepunt","waar de lijn vlak wordt"],right:0,
      ok:"Goed. Wat doet de plant daar dan nog wel, en hoeveel? Lees het af in afbeelding 1.",no:"Fotosynthese heeft licht nodig.",onDone:unlock})});
  mixAnswer(ans,{id,pts:2,auto:[
    {label:"dissimilatie (mg CO₂ per uur)",ok:v=>Math.abs(v)===2,toon:"de dissimilatie lees je af bij lichtintensiteit 0: daar is alleen dissimilatie, 2 mg CO₂ per uur (afgifte) — 1 punt"},
    {label:"bruto CO₂-opname (mg per uur)",ok:(v,a)=>v===8||(!Number.isNaN(a[0])&&Math.abs(a[0])!==2&&v===6+Math.abs(a[0])),toon:"bruto = netto + dissimilatie = 6 + 2 = 8 mg CO₂ per uur — 1 punt (verkeerd afgelezen, maar goed opgeteld: dit punt telt wel)"}],
    valkuil:"6 − 2 = 4 is fout: de dissimilatie zit al ‘afgetrokken’ in de netto opname, dus voor de bruto opname tel je hem er weer bij.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Bij lichtintensiteit 0 is er geen fotosynthese, alleen dissimilatie: de plant geeft 2 mg CO₂ per uur af (−2).",stip:[{x:0,y:-2,tekst:"−2",links:false}],band:[{x:0,kleur:"var(--koraal)"}]},
      {cap:"De plant dissimileert ook in het licht, ongeveer even veel. Bij lichtintensiteit 200 meet je netto +6.",stip:[{x:0,y:-2},{x:200,y:6,tekst:"netto 6",links:true}],band:[{x:200,kleur:"var(--goud)"}]},
      {cap:"De fotosynthese moet dus eerst de 2 mg van de dissimilatie ‘goedmaken’ en daarna nog 6 mg opnemen: bruto = 6 + 2 = <b>8 mg CO₂ per uur</b>.",stip:[{x:200,y:6,tekst:"bruto 8",links:true}],bruto:[200,-2,6]}],
      (st,s)=>st.innerHTML=GRAF({krommen:[{f:SLA.norm,naam:"normaal CO₂-gehalte"}],stip:s.stip||[],band:s.band||[],bruto:s.bruto||null})))});
  q.append(think,ans);
},STOF_NETTO);

const q2=vraag(2,"16 uur licht, 8 uur donker",(q,id)=>{
  const {think,ans,unlock}=start(q,"De boer laat de lampen 16 uur per etmaal branden op lichtintensiteit 200. De andere 8 uur is het donker. In het licht is de netto CO₂-opname 6 mg per uur; in het donker geeft een plant 2 mg CO₂ per uur af.<br><br>"+B("Bereken de netto CO₂-opname van één plant per etmaal, en leg uit of de sla groeit."));
  numStep(think,{uid:"q"+id+"n",q:"Hoeveel mg CO₂ neemt één plant netto op in de 16 uur licht?",right:96,
    ok:"Ja: 16 × 6 = 96 mg. Maar het etmaal is nog niet om.",no:"Vermenigvuldig het aantal uren met de netto opname per uur.",
    onDone:()=>choiceStep(think,{q:"Wat gebeurt er in de 8 uur donker met de CO₂ van de plant?",opts:["de plant geeft CO₂ af","de plant neemt nog een beetje CO₂ op","er gebeurt niets"],right:0,
      ok:"Goed. Reken nu het hele etmaal uit, en bedenk wat het teken van je uitkomst zegt over de biomassa.",no:"Een plant dissimileert dag en nacht.",onDone:unlock})});
  mixAnswer(ans,{id,pts:2,auto:[{label:"netto CO₂-opname per etmaal",unit:"mg",ok:v=>v===80,toon:"16 × 6 − 8 × 2 = 96 − 16 = 80 mg CO₂ per etmaal — 1 punt"}],
    tekst:"Leg uit of de sla groeit.",checks:["de netto opname is <b>positief</b>: over een etmaal is de <b>assimilatie groter dan de dissimilatie</b>, dus neemt de <b>biomassa toe</b> en groeit de sla"],
    valkuil:"Wie de nacht vergeet (16 × 6 = 96 mg), krijgt 0 punten voor de berekening. ‘De sla groeit, want hij krijgt licht’ is geen uitleg: het gaat om assimilatie tegenover dissimilatie over het hele etmaal.",
    after:()=>waaromBtn(ans,textBox("Licht: 16 uur × 6 mg = 96 mg opgenomen. Donker: 8 uur × 2 mg = 16 mg afgegeven. Per etmaal netto 96 − 16 = <b>80 mg</b>. Dat is meer dan nul: de plant legt over een heel etmaal meer koolstof vast dan hij door dissimilatie kwijtraakt. Zijn biomassa neemt toe, dus de sla groeit."))});
  q.append(think,ans);
},STOF_NETTO);

const q3=vraag(2,"extra CO₂: bij 50 of bij 400?",(q,id)=>{
  const {think,ans,unlock}=start(q,"De boer kan ook extra CO₂ in de hal blazen (gestippelde lijn in afbeelding 1). Dat kost geld.<br><br>"+B("Bij welke lichtintensiteit heeft extra CO₂ het meeste zin: bij 50 of bij 400? Leg je antwoord uit met het begrip beperkende factor."));
  choiceStep(think,{q:"Wat betekent het als een factor beperkend is?",opts:["meer van die factor maakt de fotosynthese sneller","meer van die factor verandert niets"],right:0,
    ok:"Ja. Extra CO₂ heeft dus alleen zin waar CO₂ (ook) beperkend is. Hoe zie je dat in afbeelding 1?",no:"De beperkende factor is de factor die de snelheid begrenst.",
    onDone:()=>choiceStep(think,{q:"Wat betekent het als de doorgetrokken en de gestippelde lijn bij een lichtintensiteit bijna op elkaar liggen?",opts:["daar maakt extra CO₂ weinig uit","daar maakt extra CO₂ veel uit"],right:0,
      ok:"Goed. Kijk nu in afbeelding 1 bij 50 en bij 400.",no:"De twee lijnen verschillen alleen in de hoeveelheid CO₂.",onDone:unlock})});
  mixAnswer(ans,{id,pts:2,auto:[{label:"extra CO₂ heeft het meeste zin bij",opts:["50","400"],right:1,toon:"bij 400 — 1 punt"}],
    tekst:"Leg je antwoord uit met het begrip beperkende factor.",checks:["bij 50 is <b>licht de beperkende factor</b>: de lijnen liggen bijna op elkaar, extra CO₂ helpt nauwelijks; bij 400 is <b>CO₂ (ook) beperkend</b>: met extra CO₂ ligt de lijn veel hoger"],
    valkuil:"‘Bij 400 is er meer fotosynthese’ is niet genoeg: leg uit dat bij 50 licht beperkend is en bij 400 CO₂.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Bij lichtintensiteit 50 liggen de lijnen bijna op elkaar: extra CO₂ maakt hier weinig verschil. Licht is de beperkende factor.",band:[{x:50,kleur:"var(--teal)"}],stip:[{x:50,y:SLA.norm(50)},{x:50,y:SLA.extra(50)}]},
      {cap:"Bij 400 ligt de gestippelde lijn bijna 3 mg per uur hoger: hier is CO₂ (ook) beperkend.",band:[{x:400,kleur:"var(--goud)"}],stip:[{x:400,y:SLA.norm(400)},{x:400,y:SLA.extra(400)}]},
      {cap:"Extra CO₂ kost geld, en levert alleen iets op als het licht fel genoeg is. Daarom geeft een tuinder extra CO₂ bij veel licht, niet op een donkere dag.",band:[{x:50,kleur:"var(--teal)"},{x:400,kleur:"var(--goud)"}]}],
      (st,s)=>st.innerHTML=GRAF({band:s.band,stip:s.stip||[]})))});
  q.append(think,ans);
},STOF_BEPERK);

opgave("Vertical farm","Sla uit een vertical farm",`
<p>In een vertical farm groeit sla in rekken boven elkaar, in een hal zonder ramen. Ledlampen geven het licht; de boer kiest zelf hoe fel en hoe lang.</p>
<p>In afbeelding 1 zie je de netto CO₂-opname van één slaplant bij verschillende lichtintensiteiten, bij het normale CO₂-gehalte en bij extra CO₂.</p>
<div class="eyebrow">afbeelding 1 (fictieve gegevens)</div>${GRAF()}`,[q1,q2,q3]);
}
