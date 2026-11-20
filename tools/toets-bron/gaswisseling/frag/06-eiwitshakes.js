/* ===== Opgave 6: Eiwitshakes (eigen vraag F01 uit toetsen-biologie); vwo daarna opgave 7: De zuurgraad van het bloed (KD01) ===== */
{
const STOF_UREUM={titel:"Ureum",html:`
<p>Eiwit uit je eten wordt verteerd tot <b>aminozuren</b>. Aminozuren kun je niet opslaan.</p>
<p>Ureum wordt gemaakt door de <b>lever</b>: die haalt de stikstofgroep van aminozuren af. Daarbij ontstaat <b>ammoniak</b>, en dat is giftig. De lever zet ammoniak meteen om in <b>ureum</b>, dat veel minder giftig is en goed oplost in water. Het bloed brengt het ureum naar de <b>nieren</b>, en die scheiden het uit met de urine.</p>`,
films:[F.uit]};
const q1=vraag(2,"ureum stijgt minder dan eiwit",(q,id)=>{
  pre(q,"<p>Met de shakes eet Jesse twee keer zoveel eiwit (tabel 1), maar hij scheidt geen twee keer zoveel ureum uit.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit waardoor de hoeveelheid ureum minder sterk stijgt dan de hoeveelheid eiwit."));
  numStep(think,{uid:"q"+id+"n",q:"Hoeveel keer zoveel ureum scheidt Jesse uit met de shakes? Rond af op één decimaal.",right:1.8,
    ok:"Ja: 45 / 25 = 1,8 keer zoveel ureum, bij 2 keer zoveel eiwit.",no:"Deel de hoeveelheid ureum met shakes door die zonder shakes.",
    onDone:()=>choiceStep(think,{q:"Kun je aminozuren opslaan voor later?",opts:["nee","ja, in de lever","ja, in het vetweefsel"],right:0,
      ok:"Klopt. Bedenk nu: worden álle aminozuren uit zijn eten afgebroken tot ureum?",no:"Aminozuren worden niet opgeslagen zoals glucose of vet.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Ureum ontstaat alleen uit aminozuren die worden <b>afgebroken</b> (waarvan de stikstofgroep wordt verwijderd), niet uit aminozuren die het lichaam <b>gebruikt</b>.",
    "Jesse gebruikt een deel van het extra eiwit om <b>spieren te bouwen</b>; die aminozuren blijven in zijn lichaam en worden geen ureum."],
    model:"Ureum ontstaat alleen uit aminozuren die worden afgebroken: de lever haalt er de stikstofgroep af. Aminozuren die het lichaam gebruikt, worden geen ureum. Jesse traint vijf keer per week en gebruikt een deel van het extra eiwit om spieren op te bouwen. Die aminozuren blijven in zijn lichaam, dus het ureum stijgt minder dan het eiwit.",
    valkuil:"Alleen ‘een deel wordt gebruikt’ zonder te noemen waarvoor of zonder verband met ureum: maximaal 1 punt. Een antwoord dat alleen beschrijft hoe ureum in de lever ontstaat (zonder dat een deel van het eiwit niet wordt afgebroken): maximaal 1 punt.",
    after:()=>waaromBtn(ans,textBox("Eiwit in (g per dag) → aminozuren → twee wegen: <b>gebruiken</b> (eigen eiwit, bij Jesse vooral spieren) of <b>afbreken</b> (stikstofgroep eraf → ammoniak → ureum). Alleen de tweede weg geeft ureum. Met de shakes gaat er 90 g eiwit extra in, maar een deel daarvan neemt de eerste weg. Daarom komt er geen 2 × 25 = 50 g ureum uit, maar 45 g."))});
  q.append(think,ans);
},STOF_UREUM);

opgave("Eiwitshakes","Eiwitshakes",`
<p>Jesse (17) traint vijf keer per week in de sportschool. Hij drinkt elke dag drie eiwitshakes, bovenop zijn gewone eten. In tabel 1 staat hoeveel ureum Jesse per dag met zijn urine uitscheidt (fictieve gegevens).</p>
${TABEL(1,["","gewoon eten","gewoon eten + 3 eiwitshakes"],[["eiwit per dag (g)","90","180"],["ureum in de urine per dag (g)","25","45"]])}`,[q1]);

/* ---- vwo: opgave 7 ---- */
if(VWO){
const STOF_EVW={titel:"Evenwicht en de regelaars van de pH",html:`
<p>Koolstofdioxide, water, koolzuur, waterstofionen en waterstofcarbonaat staan in het bloed met elkaar in <b>evenwicht</b>. Alle reacties in dit evenwicht verlopen tegelijk, heen en terug.</p>
<p>Twee organen houden de pH van het bloed op peil: de <b>longen</b> zijn de snelle regelaar (binnen minuten), de <b>nieren</b> de langzame (uren tot dagen).</p>`,
films:[F.uit,F.gas]};
const k1=vraag(2,"het evenwicht van koolzuur",(q,id)=>{
  const {think,ans,unlock}=start(q,"Koolstofdioxide + water ⇌ koolzuur ⇌ waterstofion + waterstofcarbonaat<br><br>– "+B("Leg met dit evenwicht uit waardoor de pH van het bloed daalt als je koolstofdioxide ophoopt.")+"<br>– "+B("Beschrijf wat de cellen van de nierbuisjes doen om de pH weer te verhogen."));
  choiceStep(think,{q:"Wat doet een evenwicht als je er één van de stoffen bij doet?",opts:["het verschuift zo dat die extra stof voor een deel wordt weggewerkt","het maakt nog meer van die stof","er verandert niets"],right:0,
    ok:"Ja. Pas dat nu toe op het evenwicht hierboven als er koolstofdioxide bijkomt.",no:"Een evenwicht werkt een verandering tegen.",
    onDone:()=>choiceStep(think,{q:"Welk orgaan is de langzame regelaar van de pH?",opts:["de nieren","de longen"],right:0,
      ok:"Goed. Bedenk welke stoffen uit het evenwicht de nieren kunnen kwijtraken of juist kunnen bewaren.",no:"De longen werken binnen minuten.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Meer koolstofdioxide schuift het evenwicht <b>naar rechts</b>: er ontstaan meer <b>waterstofionen</b>, dus de pH daalt.",
    "Ze scheiden actief <b>waterstofionen uit</b> naar de voorurine en geven <b>waterstofcarbonaat terug</b> aan het bloed."],
    model:"Hoopt koolstofdioxide zich op, dan schuift het evenwicht naar rechts. Er ontstaat meer koolzuur, dat splitst in waterstofionen en waterstofcarbonaat. Meer waterstofionen betekent een lagere pH. De cellen van de nierbuisjes scheiden actief waterstofionen uit naar de voorurine en geven waterstofcarbonaat terug aan het bloed; zo stijgt de pH weer.",
    valkuil:"‘Het evenwicht schuift naar links’ is de reactie op extra waterstofionen (zoals bij verzuring door vetverbranding), niet op extra koolstofdioxide. Alleen ‘de nieren scheiden zuur uit’ zonder waterstofcarbonaat: dat is maar de helft van het tweede element.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Evenwicht: links koolstofdioxide en water, rechts waterstofionen en waterstofcarbonaat.",k:0},
      {cap:"Er hoopt koolstofdioxide op (links meer): het evenwicht schuift naar rechts. Er ontstaan meer waterstofionen, en de pH daalt.",k:1},
      {cap:"De nierbuisjes halen waterstofionen uit het bloed (naar de voorurine) en geven waterstofcarbonaat terug: er blijven minder waterstofionen in het bloed, en de pH stijgt weer.",k:2}],
      (st,s)=>{const kl=["var(--text2)","var(--koraal)","var(--teal)"][s.k];
        const tx=(x,t,c,w)=>`<text x="${x}" y="80" text-anchor="middle" style="fill:${c};font:${w||600} 15px var(--tekst)">${t}</text>`;
        let g=tx(85,"CO₂ + H₂O",s.k===1?"var(--koraal)":"var(--text)")+tx(190,"⇌","var(--text2)")+tx(270,"koolzuur","var(--text)")+tx(355,"⇌","var(--text2)")+tx(430,"H⁺",s.k?"var(--koraal)":"var(--text)",700)+tx(475,"+","var(--text2)")+tx(540,"HCO₃⁻",s.k===2?"var(--teal)":"var(--text)");
        if(s.k===1)g+=`<path d="M150,110 H470" stroke="var(--koraal)" stroke-width="3"/><path d="M482,110 l-14,-7 v14 z" fill="var(--koraal)"/><text x="310" y="140" text-anchor="middle" class="lblm">evenwicht schuift naar rechts: meer H⁺, pH daalt</text>`;
        if(s.k===2)g+=`<path d="M430,96 V150" stroke="var(--koraal)" stroke-width="3"/><path d="M430,162 l-7,-14 h14 z" fill="var(--koraal)"/><text x="430" y="182" text-anchor="middle" class="lblm">H⁺ naar de voorurine</text><path d="M540,150 V100" stroke="var(--teal)" stroke-width="3"/><path d="M540,90 l-7,14 h14 z" fill="var(--teal)"/><text x="560" y="182" text-anchor="middle" class="lblm">HCO₃⁻ terug in het bloed</text>`;
        st.innerHTML=FIG(g,"0 0 620 200","Het evenwicht van koolstofdioxide, water, koolzuur, waterstofionen en waterstofcarbonaat",620,500);})) });
  q.append(think,ans);
},STOF_EVW);
opgave("Zuurgraad","De zuurgraad van het bloed",`<p>Bij deze opgave hoort geen inleiding.</p>`,[k1]);
}
}
