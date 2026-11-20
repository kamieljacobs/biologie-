/* ===== Opgave 5: Katten zonder staart (E03), 6: Palomino en cremello (A03), 7: Voorbij dominant en recessief (KC05) ===== */
{
const STOF_LETAAL={titel:"Een letale factor",html:`
<p>Een <b>letale factor</b> is een allel dat in een bepaalde combinatie het organisme laat sterven, vaak al als embryo. Dat genotype ontbreekt dan bij de geboren nakomelingen.</p>
<p>In de film: bij muizen is het allel voor gele vacht (G) dominant, maar GG-embryo's sterven. Daarom is elke gele muis Gg, en geven twee gele muizen geel en grijs in de verhouding 2 : 1 in plaats van 3 : 1.</p>
<p>Werk zo'n vraag uit met een kruisingsschema en streep het genotype weg dat niet geboren wordt.</p>`,
films:[F.voorbij]};
const q1=vraag(2,"letale factor: kittens per nest",(q,id)=>{
  pre(q,"<p>Bij een kruising van een staartloze Manx-kat met een kat met staart worden gemiddeld vier kittens per nest geboren (fictief gegeven).</p>");
  const {think,ans,unlock}=start(q,B("Hoeveel kittens per nest verwacht je gemiddeld bij een kruising van twee staartloze Manx-katten? Ga ervan uit dat bij beide kruisingen evenveel embryo's ontstaan. Leg je antwoord uit."));
  choiceStep(think,{q:"Welk genotype heeft een levende staartloze Manx-kat?",opts:["MM","Mm","MM of Mm"],right:1,
    ok:"Ja: MM overleeft niet. Sterven er embryo's bij Manx (Mm) × kat met staart (mm)?",no:"Lees de laatste zin van de inleiding nog eens.",
    onDone:()=>choiceStep(think,{q:"Bij Mm × mm: welk deel van de embryo's sterft?",opts:["geen enkel","een kwart","de helft"],right:0,
      ok:"Goed: daar ontstaat nooit MM. Dus vier kittens = alle embryo's. Maak nu het schema Mm × Mm en kijk welk deel daar wegvalt.",no:"Kan er bij Mm × mm een embryo MM ontstaan?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Bij Manx × kat met staart (Mm × mm) sterven geen embryo's, bij Manx × Manx sterft <b>1/4</b> van de embryo's (MM).",
    "Dus 3/4 × 4 = <b>3 kittens</b> per nest."],
    model:"Bij Mm × mm ontstaat nooit MM, dus de vier kittens zijn alle embryo's. Bij Mm × Mm is een kwart van de embryo's MM; die sterven. Er blijft 3/4 × 4 = 3 kittens per nest over.",
    valkuil:"‘Twee kittens, want MM sterft en de helft is Mm’ of 2/3 × 4: je moet uitgaan van alle embryo's, en daarvan valt een kwart weg.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Manx × kat met staart (Mm × mm): Mm en mm, geen MM. Alle vier de embryo's worden geboren.",x:0,t:2},
      {cap:"Manx × Manx (Mm × Mm): evenveel embryo's, maar een kwart is MM.",x:1,t:1},
      {cap:"De MM-embryo's sterven: van de vier blijven er <b>drie</b> over (3/4 × 4 = 3).",x:1,t:2}],
      (st,s)=>{const kl=c=>c==="✕"?"var(--koraal-soft)":c==="mm"?"var(--teal-soft)":"var(--goud-soft)";
        st.innerHTML=s.x?PUN(["M","m"],["M","m"],[[s.t===2?"✕":"MM","Mm"],["Mm","mm"]],{kopT:"Manx Mm",kopL:"Manx Mm",kleur:c=>s.t?kl(c):""})
          :PUN(["M","m"],["m","m"],[["Mm","mm"],["Mm","mm"]],{kopT:"Manx Mm",kopL:"kat met staart mm",kleur:kl});}))});
  q.append(think,ans);
},STOF_LETAAL);
opgave("Manx","Katten zonder staart",`
<p>Manx-katten zijn katten zonder staart, of met maar een heel kort staartje. Ze komen oorspronkelijk van het eiland Man. Staartloosheid wordt veroorzaakt door een dominant allel (M). Katten met het genotype mm hebben een normale staart. Er bestaan geen katten met het genotype MM: embryo's met dit genotype sterven al vroeg in de dracht.</p>`,[q1]);
}
{
const STOF_INT={titel:"Intermediaire overerving",html:`
<p>Niet elk allel is dominant of recessief. Bij <b>intermediaire</b> overerving heeft een heterozygoot een fenotype dat <b>tussen</b> de twee homozygoten in ligt. Voorbeeld uit de film: rode × witte leeuwenbekken geven roze bloemen.</p>
<p>Elk genotype heeft dan zijn eigen fenotype: aan het fenotype zie je meteen het genotype.</p>
<p>De allelen mengen niet: een heterozygoot geeft gewoon het ene óf het andere allel door, net als bij dominant-recessieve overerving.</p>`,
films:[F.voorbij,F.mono]};
const q1=vraag(2,"alleen palomino's fokken",(q,id)=>{
  pre(q,"<p>Een fokker wil alleen palomino-veulens fokken. Hij heeft de beschikking over vossen, palomino's en cremello's.</p>");
  const {think,ans,unlock}=start(q,B("Noteer welke kruising hij moet doen om er zeker van te zijn dat elk veulen palomino is, en leg met de genotypen uit waarom."));
  selectsStep(think,{uid:"q"+id,q:"Geef bij elk paard het genotype (C = crème-allel, c = normaal allel).",rows:[
    ["vos",["CC","Cc","cc"],2],["palomino",["CC","Cc","cc"],1],["cremello",["CC","Cc","cc"],0]],
    ok:"Goed. Elk veulen moet dus Cc zijn. Welke ouders geven altijd hetzelfde allel door?",no:"Kijk in de tabel: hoeveel crème-allelen heeft elk paard?",
    onDone:()=>choiceStep(think,{q:"Een palomino (Cc) als ouder: geeft die altijd hetzelfde allel door?",opts:["ja","nee, de ene keer C, de andere keer c"],right:1,
      ok:"Precies. Met een palomino als ouder krijg je dus nooit zeker alleen palomino's. Welke twee paarden blijven over?",no:"Een heterozygoot maakt twee soorten gameten.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:["Een <b>cremello</b> kruisen met een <b>vos</b>.","Uitleg: <b>CC × cc</b>: de cremello geeft altijd C en de vos altijd c door, dus alle veulens zijn Cc (palomino)."],
    model:"Hij kruist een cremello (CC) met een vos (cc). De cremello geeft altijd C door en de vos altijd c, dus elk veulen is Cc: palomino.",
    valkuil:"‘Twee palomino's kruisen’ of ‘palomino × cremello’ levert 0 punten op: dan is maar 1/2 of minder van de veulens palomino.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Palomino × palomino (Cc × Cc): cremello, palomino en vos in de verhouding 1 : 2 : 1. Maar de helft palomino.",k:0},
      {cap:"Palomino × cremello (Cc × CC): de helft palomino, de helft cremello.",k:1},
      {cap:"Cremello × vos (CC × cc): elk veulen krijgt C van de cremello en c van de vos: <b>alle veulens Cc, palomino</b>.",k:2}],
      (st,s)=>{const PAL=c=>c==="CC"?"var(--goud-soft)":c==="cc"?"var(--koraal-soft)":"var(--teal-soft)";
        const P=[[["C","c"],["C","c"],[["CC","Cc"],["Cc","cc"]],"palomino Cc","palomino Cc"],[["C","C"],["C","c"],[["CC","CC"],["Cc","Cc"]],"cremello CC","palomino Cc"],[["C","C"],["c","c"],[["Cc","Cc"],["Cc","Cc"]],"cremello CC","vos cc"]][s.k];
        st.innerHTML=PUN(P[0],P[1],P[2],{kopT:P[3],kopL:P[4],kleur:PAL})+`<p class="muted" style="text-align:center;margin:4px 0 0;font-size:14px">goud = cremello · blauw = palomino · rood = vos</p>`;}))});
  q.append(think,ans);
},STOF_INT);
opgave("Palomino","Palomino en cremello",`
<p>Paarden met de basiskleur vos hebben een roodbruine vacht. Bij deze paarden bepaalt het gen <i>SLC45A2</i> of de vachtkleur wordt verdund. Van dit gen bestaan twee allelen: een normaal allel en het crème-allel.</p>
<div class="tablewrap"><table class="data"><tr><th>genotype</th><th>fenotype</th></tr>
<tr><td>geen crème-allel</td><td>vos: roodbruine vacht</td></tr>
<tr><td>één crème-allel</td><td>palomino: goudgele vacht met lichte manen</td></tr>
<tr><td>twee crème-allelen</td><td>cremello: bijna witte, crèmekleurige vacht</td></tr></table></div>
<p>Gebruik in deze opgave de letters C (crème-allel) en c (normaal allel). Ga ervan uit dat alle paarden in deze opgave de basiskleur vos hebben, zodat alleen het <i>SLC45A2</i>-gen de kleur bepaalt.</p>`,[q1]);
}
{
const STOF_POLY={titel:"Eén gen of veel genen",html:`
<p>Bij één gen met twee allelen vind je een paar duidelijke groepen: bij dominant-recessief twee fenotypen, bij intermediair drie.</p>
<p>Maar veel eigenschappen hebben geen duidelijke groepen. Om dat te begrijpen helpt een vraag: wat gebeurt er met het aantal mogelijke uitkomsten als er niet één, maar twee, drie of tien genen aan dezelfde eigenschap meedoen? En wat doen invloeden van buiten?</p>`,
films:[F.voorbij]};
/* histogram: n genen (elk + of −), plus eventueel milieu-uitsmering */
function HIST(n,glad){const W=420,H=200,X0=40,Y0=170;let s=`<path d="M${X0},20 V${Y0} H${W-20}" fill="none" stroke="var(--text2)" stroke-width="1.4"/>`;
  if(glad){let d="";for(let x=0;x<=100;x++){const z=(x-50)/16;const y=Y0-140*Math.exp(-z*z/2);d+=(x?"L":"M")+(X0+10+x*3.4).toFixed(1)+","+y.toFixed(1);}
    s+=`<path d="${d}" fill="var(--teal-soft)" stroke="var(--teal)" stroke-width="2.4"/>`;}
  else{const k=2*n+1,bw=(W-80)/k;const C=(a,b)=>{let r=1;for(let i=0;i<b;i++)r=r*(a-i)/(i+1);return r;};const mx=C(2*n,n);
    for(let i=0;i<k;i++){const h=140*C(2*n,i)/mx;s+=`<rect x="${X0+10+i*bw+2}" y="${Y0-h}" width="${bw-4}" height="${h}" fill="var(--teal-soft)" stroke="var(--teal)"/>`;}}
  s+=`<text x="${W/2}" y="${Y0+22}" text-anchor="middle" class="lblm" style="font-size:16px">lengte →</text><text x="14" y="95" class="lblm" style="font-size:16px" transform="rotate(-90 14 95)" text-anchor="middle">aantal</text>`;
  return svgWrap(`0 0 ${W} ${H}`,s,"Verdeling van lengte");}
const q1=vraag(2,"polygene overerving",(q,id)=>{
  pre(q,"<p>Zet je een klas op volgorde van lengte, dan zie je geen groepjes lang en kort, maar een vloeiende reeks.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit hoe die vloeiende reeks ontstaat. Noem twee oorzaken."));
  choiceStep(think,{q:"Stel: lengte hangt af van één gen met een dominant en een recessief allel. Hoeveel groepen lengte zie je dan?",opts:["twee","heel veel"],right:0,
    ok:"Ja. Dat zie je in een klas niet. Wat verandert er als heel veel genen elk een klein beetje bijdragen?",no:"Bij één gen met dominant-recessief zijn er maar twee fenotypen.",
    onDone:()=>choiceStep(think,{q:"Twee mensen met precies dezelfde allelen (een eeneiige tweeling): worden ze altijd precies even lang?",opts:["ja, altijd","nee, niet altijd"],right:1,
      ok:"Goed: dan speelt er nog iets anders mee dan de genen. Noem in je antwoord beide oorzaken.",no:"Denk aan voeding of ziekte tijdens het opgroeien.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Lengte wordt bepaald door <b>heel veel genen</b>; elk gen erft volgens Mendel en de effecten tellen bij elkaar op (polygene overerving).",
    "Daarnaast heeft het <b>milieu</b> (voeding, gezondheid) invloed."],
    model:"Lengte wordt bepaald door heel veel genen samen (polygene overerving). Elk gen erft gewoon volgens Mendel, maar al die kleine bijdragen tellen op, waardoor er heel veel tussenstappen zijn. Daarnaast hebben voeding en gezondheid invloed, waardoor de grenzen tussen die stappen helemaal vervagen.",
    valkuil:"‘De allelen van de ouders mengen’ als oorzaak levert 0 punten op: allelen mengen nooit.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Eén gen (intermediair): hooguit drie groepen.",n:1},{cap:"Twee genen die elk iets langer maken: vijf groepen.",n:2},
      {cap:"Zes genen: dertien groepen, de meeste mensen in het midden.",n:6},{cap:"Heel veel genen én het milieu (voeding, gezondheid): een <b>vloeiende reeks</b>.",n:0}],
      (st,s)=>st.innerHTML=HIST(s.n,s.n===0)))});
  q.append(think,ans);
},STOF_POLY);
opgave("Lengte","Voorbij dominant en recessief","",[q1]);
}
