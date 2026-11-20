/*@@ALLEEN-VWO@@*/
/* ===== Opgave 6 (alleen vwo): De witte beer van het regenwoud (EI-evolutie-C01, C02) =====
   Gegevens: Reimchen & Klinka (2017) Biol. J. Linn. Soc. 122: 274–285 (allelfrequenties en percentages uit Ritland e.a. 2001). */
if(VWO){
const STOF_HW={titel:"De regel van Hardy-Weinberg",html:`
<p>Noem het aandeel van het ene allel in de genenpool <b>p</b> en van het andere <b>q</b>. Dan is <b>p + q = 1</b>.</p>
<p>Bij willekeurig paren trek je voor elk jong twee allelen uit de pot. Twee keer het eerste allel: <b>p²</b>. Twee keer het tweede: <b>q²</b>. Eén van elk: <b>2pq</b>. Samen is dat p² + 2pq + q² = 1. Dat zijn de genotypefrequenties.</p>
<p>Dat klopt alleen als er niets aan de pot verandert: een grote populatie, willekeurig paren, en geen selectie, genenstroom of mutatie. Wijkt een echte populatie af van wat de regel voorspelt, dan werkt er een kracht.</p>`,
films:[F.e5]};

const q1=vraag(2,"kans op een drager (Hardy-Weinberg)",(q,id)=>{
  pre(q,"<p>Een bioloog ziet op Princess Royal Island een zwarte beer.</p>");
  const {think,ans,unlock}=start(q,"<b>Hoe groot is de kans dat deze zwarte beer drager is van het witte allel?</b><br>Ga uit van de allelfrequentie in de tabel en neem aan dat de regel van Hardy-Weinberg geldt. Noteer je berekening en geef je antwoord als percentage, afgerond op een geheel getal.");
  choiceStep(think,{q:"Welke genotypen kan een zwarte beer hebben?",opts:["alleen homozygoot voor het zwarte allel","homozygoot voor het zwarte allel of heterozygoot","alleen heterozygoot"],right:1,
    ok:"Ja: het witte allel is recessief. Je zoekt dus het deel heterozygoten binnen de zwarte beren, niet binnen alle beren.",no:"Lees de inleiding: hoe ziet een heterozygote beer eruit?",
    onDone:()=>numStep(think,{uid:"q"+id+"n",q:"Wat is p, de frequentie van het zwarte allel op Princess Royal Island?",right:0.66,
      ok:"Goed. Reken nu 2pq uit, en het aandeel zwarte beren (p² + 2pq).",no:"p + q = 1, en q staat in de tabel.",onDone:unlock})});
  combi(ans,{id,pts:2,parts:[
    {nums:[["tussenuitkomst 1",""],["tussenuitkomst 2",""]],ok:v=>{const a=[...v].sort((x,y)=>x-y);return dicht(a[0],0.449,0.006)&&dicht(a[1],0.884,0.006);},tekst:"juiste berekening van 2pq (<b>0,449</b>) en van het aandeel zwarte beren (<b>0,884</b>)"},
    {nums:[["uitkomst","%"]],ok:v=>dicht(v[0],51,0.5)||dicht(v[0],0.51,0.005),tekst:"juiste deling en antwoord <b>51%</b>"}],
    model:"q = 0,34 en p = 0,66. Heterozygoot: 2pq = 2 × 0,66 × 0,34 = 0,449. Zwart: p² + 2pq = 1 − q² = 1 − 0,116 = 0,884. Kans op drager onder de zwarte beren = 0,449 / 0,884 = 0,51 → 51%.",
    valkuil:"Een antwoord van 45% (alleen 2pq, niet gedeeld door het aandeel zwarte beren) levert alleen het eerste scorepunt op.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Denk aan 1000 beren. Met q = 0,34 is q² = 0,116: ongeveer <b>116 witte</b> beren.",r:[449,435,116],toon:[0,0,1]},
      {cap:"2pq = 2 × 0,66 × 0,34 = 0,449: ongeveer <b>449 dragers</b>. De rest, ongeveer 435 (p² ≈ 0,436), is zwart zonder wit allel.",r:[449,435,116],toon:[1,1,1]},
      {cap:"De bioloog ziet een <b>zwarte</b> beer. De witte vallen dus af: er blijven 449 + 435 = 884 zwarte beren over.",r:[449,435,116],toon:[1,1,.15]},
      {cap:"Daarvan zijn er 449 drager: 449 / 884 = 0,51. De kans is <b>51%</b>. Wie 45% zegt, deelt door alle beren in plaats van alleen door de zwarte.",r:[449,435,116],toon:[1,.35,.15]}],
      (st,s)=>{const W=520,lab=["drager (zwart)","zwart, geen wit allel","wit"],kl=["var(--goud)","var(--text2)","var(--surface2)"];let x=20,g="";
        s.r.forEach((n,k)=>{const w=n/1000*W;g+=`<rect x="${x}" y="40" width="${w}" height="60" fill="${kl[k]}" stroke="var(--text)" stroke-width="1.4" opacity="${s.toon[k]}"/>`+
          `<text x="${x+w/2}" y="76" text-anchor="middle" class="lbl" opacity="${s.toon[k]}" style="${k===0?"fill:var(--bg)":""}">${n}</text><text x="${x+w/2}" y="124" text-anchor="middle" class="lblm" opacity="${s.toon[k]}">${lab[k]}</text>`;x+=w;});
        st.innerHTML=`<div style="max-width:560px;margin:0 auto">`+svgWrap("0 0 560 140",`<text x="20" y="26" class="lbl">1000 beren op Princess Royal Island (bij Hardy-Weinberg)</text>`+g,"Verdeling van 1000 beren over drie genotypen")+`</div>`;}))});
  q.append(think,ans);
},STOF_HW);

const q2=vraag(2,"klopt Hardy-Weinberg hier?",(q,id)=>{
  pre(q,"<p>In de vorige vraag nam je aan dat de regel van Hardy-Weinberg geldt voor de beren op Princess Royal Island.</p>");
  const {think,ans,unlock}=start(q,B("Laat met een berekening zien dat de getelde vachtkleuren op Princess Royal Island niet passen bij een populatie in Hardy-Weinberg-evenwicht. Noteer ook of er meer of minder witte beren zijn dan je bij evenwicht verwacht."));
  choiceStep(think,{q:"Welke genotypefrequentie hoort bij de witte beren?",opts:["q²","2pq","p²"],right:0,
    ok:"Ja: witte beren hebben twee witte allelen. Reken uit welk percentage wit je bij evenwicht verwacht en vergelijk dat met de tabel.",no:"Het witte allel is recessief. Hoeveel witte allelen heeft een witte beer?",onDone:unlock});
  combi(ans,{id,pts:2,parts:[
    {nums:[["verwacht percentage witte beren bij evenwicht","%"]],ok:v=>(v[0]>=11.5&&v[0]<=12.05)||(v[0]>=0.115&&v[0]<=0.1205),tekst:"berekening van het verwachte percentage witte beren: q² = 0,34² = 0,116 → <b>11,6%</b> (of 12%)"},
    {sel:["Vergeleken met de getelde 17% zijn er",["meer witte beren dan verwacht","minder witte beren dan verwacht","evenveel witte beren als verwacht"]],right:0,tekst:"vergelijking met 17% en conclusie: <b>meer</b> witte beren dan verwacht"}],
    model:"Verwacht bij evenwicht: q² = 0,34² = 0,116 → 11,6% witte beren. Geteld: 17%. Er zijn dus meer witte beren dan verwacht; de populatie is niet in evenwicht.",
    alt:"Andere aanpak, ook goed: ik heb uit 17% witte beren q = √0,17 = 0,41 berekend en geconcludeerd dat dit hoger is dan de gemeten 0,34, dus meer witte beren dan bij evenwicht (beide scorepunten).",
    after:()=>waaromBtn(ans,textBox("Bij evenwicht verwacht je q² witte beren: 0,34 × 0,34 = 0,116, dus <b>11,6%</b>. Geteld werd <b>17%</b>: meer witte beren dan de regel voorspelt. Dan klopt minstens één van de voorwaarden niet, bijvoorbeeld willekeurig paren of ‘geen selectie’. Bij meer witte beren dan verwacht zijn er ook minder dragers dan verwacht; de onderzoekers vonden inderdaad zo'n tekort aan heterozygoten."))});
  q.append(think,ans);
},STOF_HW);

opgave("Witte beer","De witte beer van het regenwoud",`
<p>Aan de kust van British Columbia (Canada) leeft de Kermodebeer, een ondersoort van de Amerikaanse zwarte beer. De meeste Kermodeberen zijn zwart, maar een deel heeft een crèmewitte vacht. De witte vacht wordt veroorzaakt door een recessieve mutatie in het <i>Mc1r</i>-gen. Beren die heterozygoot zijn, zijn zwart.</p>
<p>Op het vasteland zijn witte beren zeldzaam. Op enkele eilanden voor de kust komen ze veel vaker voor. Onderzoekers bepaalden met DNA uit haren de frequentie van het witte allel:</p>
${TABEL(0,["eiland","frequentie witte allel","percentage witte beren (geteld)"],[["Princess Royal Island","0,34","17%"],["Gribbell Island","0,57","43%"]])}
<p>De beren vangen in de herfst zalm in de rivieren. Uit veldonderzoek bleek dat witte beren overdag meer zalm vangen dan zwarte beren, maar ’s nachts juist minder. In een proef vluchtten zalmen overdag ongeveer half zo vaak voor een wit model van een beer als voor een zwart model.</p>`,[q1,q2]);
}
