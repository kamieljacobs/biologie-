/* ===== Opgave 1: Chromosomen, genen en allelen (KA01, KA04 alleen havo, KA06) ===== */
{
/* stof zonder de definities die in vraag 1 en 2 gevraagd worden (L05) */
const STOF_DNA={titel:"Van huid naar DNA",html:`
<p>In de kern van een lichaamscel liggen de chromosomen in <b>paren</b>: van elk paar komt er één van je vader en één van je moeder. Op de chromosomen ligt het DNA, met de instructies voor de eiwitten van de cel.</p>
<p>Een voorbeeld: de pigmentcellen in je huid maken het bruine pigment <b>melanine</b>. Daarvoor is het enzym <b>tyrosinase</b> nodig, een eiwit. De instructie voor dat enzym ligt op chromosoom 11. Bij albinisme zit er een fout in die instructie: het enzym werkt niet en er komt geen melanine.</p>
<p>Omdat je van elk chromosoom twee exemplaren hebt, heb je die instructie ook twee keer: één van je vader en één van je moeder. Die twee hoeven niet gelijk te zijn.</p>`,
films:[F.chrom]};
const STOF_MILIEU={titel:"Genotype en milieu",html:`
<p>Wat je van een eigenschap kunt waarnemen, ontstaat niet alleen uit je allelen. Ook de omstandigheden spelen mee: voeding, licht, temperatuur. Die invloeden van buiten heten samen het <b>milieu</b>.</p>
<p>Een voorbeeld: twee eeneiige tweelingen hebben precies dezelfde allelen. Krijgt de één als kind veel minder te eten, dan wordt hij toch kleiner dan zijn broer. Genen en milieu werken dus samen.</p>
<p>Denk bij zo'n vraag altijd na over wat de genen hier precies doen: welk eiwit maken ze, en wat doet dat eiwit?</p>`,
films:[F.chrom]};

const q1=vraag(2,"gen en allel",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Leg uit wat het verschil is tussen een gen en een allel. Gebruik als voorbeeld het gen voor het enzym tyrosinase, dat nodig is voor het pigment melanine."));
  choiceStep(think,{q:"Waar staat de instructie voor het enzym tyrosinase?",opts:["in een stuk DNA op een chromosoom","in het pigment melanine zelf","in het celmembraan"],right:0,
    ok:"Ja: een stuk DNA met de instructie voor één eiwit. Hoe heet zo'n stuk DNA?",no:"Eiwitten worden gemaakt volgens een instructie in de kern.",
    onDone:()=>choiceStep(think,{q:"Bij mensen met albinisme werkt tyrosinase niet, bij anderen wel. Hebben die mensen een ander stuk DNA voor tyrosinase, of een andere versie van hetzelfde stuk?",opts:["een heel ander stuk DNA, op een andere plek","een andere versie van hetzelfde stuk, op dezelfde plek"],right:1,
      ok:"Goed. Je hebt nu de twee begrippen: noem bij elk wat het is en geef het voorbeeld.",no:"De instructie voor tyrosinase ligt bij iedereen op dezelfde plek op chromosoom 11. Wat verschilt er dan?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Een <b>gen</b> is een stukje DNA met de instructie voor één eiwit, hier het enzym tyrosinase.",
    "Een <b>allel</b> is een versie van dat gen, bijvoorbeeld een allel dat een werkend enzym oplevert (A) en een allel met een fout waardoor het enzym niet werkt (a)."],
    model:"Een gen is een stuk DNA met de instructie voor één eiwit, zoals het gen voor tyrosinase. Een allel is een versie van dat gen: het allel A geeft een werkend enzym, het allel a heeft een fout, waardoor het enzym niet werkt (albinisme).",
    valkuil:"‘Een allel is een stukje van een gen’ levert voor het tweede punt 0 punten op: een allel is een hele versie van het gen, geen deel ervan.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Twee homologe chromosomen 11: één van je vader, één van je moeder.",t:0},
      {cap:"Op beide ligt op dezelfde plek het <b>gen</b> voor tyrosinase: de instructie voor dat ene enzym.",t:1},
      {cap:"Maar de twee versies kunnen verschillen: A (werkend enzym) en a (enzym werkt niet). Zo'n versie is een <b>allel</b>.",t:2}],(st,s)=>{
      let g="";[[60,"var(--teal)","vader","A"],[150,"var(--oker)","moeder","a"]].forEach(([x,c,lab,al])=>{
        g+=`<rect x="${x-16}" y="20" width="32" height="180" rx="16" fill="var(--surface)" stroke="${c}" stroke-width="3"/><text x="${x}" y="226" text-anchor="middle" class="lblm" style="font-size:16px">${lab}</text>`;
        if(s.t>=1)g+=`<rect x="${x-16}" y="90" width="32" height="26" fill="var(--goud-soft)" stroke="var(--goud)" stroke-width="2.4"/>`;
        if(s.t>=2)g+=`<text x="${x+24}" y="110" class="lbl" style="font-size:20px">${al}</text>`;});
      if(s.t===1)g+=`<text x="215" y="100" class="lbl" style="font-size:16px">gen voor</text><text x="215" y="120" class="lbl" style="font-size:16px">tyrosinase</text>`;
      if(s.t===2)g+=`<text x="215" y="90" class="lbl" style="font-size:16px">A, a = allelen</text><text x="215" y="114" class="lblm" style="font-size:15px">A: enzym werkt</text><text x="215" y="136" class="lblm" style="font-size:15px">a: enzym werkt niet</text>`;
      st.innerHTML=svgWrap("0 0 380 235",g,"Gen en allel op een chromosomenpaar");}))});
  q.append(think,ans);
},STOF_DNA);

const ids=[q1];
if(!VWO){
const BEGR=["genotype","fenotype","homozygoot","heterozygoot","gen","allel","locus","dominant (allel)","recessief (allel)"];
ids.push(vraag(2,"begrippen genotype, fenotype, locus",(q,id)=>{
  pre(q,"<p>Sanne heeft voor het gen voor tyrosinase het genotype Aa. Ze heeft een gewone huidskleur.</p>");
  q.append(el("p",{class:"qtext"},"Noteer bij elk onderdeel het begrip dat erbij hoort.<br><br>1 de combinatie van allelen Aa<br>2 gewone huidskleur<br>3 twee verschillende allelen van een gen hebben<br>4 de vaste plek van het gen op chromosoom 11<br>5 A, omdat één exemplaar genoeg is voor de gewone huidskleur"));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  choiceStep(think,{q:"Een ander voorbeeld: een erwtenplant met de allelen Gg heeft gele zaden. Hoe heet ‘gele zaden’?",opts:["genotype","fenotype"],right:1,
    ok:"Ja. Zoek nu bij Sanne welk onderdeel over de allelen gaat en welk over wat je kunt waarnemen.",no:"‘Feno-’ komt van ‘tonen, laten zien’.",
    onDone:()=>choiceStep(think,{q:"Een erwtenplant met GG heeft twee dezelfde allelen. Hoe heet dat?",opts:["homozygoot","heterozygoot"],right:0,
      ok:"Goed. Dan ken je ook het woord voor twee verschillende allelen. Bij onderdeel 4 zoek je het woord voor een plek op een chromosoom, bij 5 het woord voor het allel dat het fenotype bepaalt.",no:"‘Homo’ betekent ‘gelijk’, ‘hetero’ betekent ‘anders’.",onDone:unlock})});
  selectAnswer(ans,{id,uid:"q"+id,intro:"Kies bij elk onderdeel het begrip.",rows:[
    ["1 de combinatie van allelen Aa",BEGR,0],["2 gewone huidskleur",BEGR,1],["3 twee verschillende allelen van een gen hebben",BEGR,3],["4 de vaste plek van het gen op chromosoom 11",BEGR,6],["5 A, omdat één exemplaar genoeg is",BEGR,7]],
    score:n=>n===5?2:n===4?1:0,
    after:()=>waaromBtn(ans,textBox("1 <b>genotype</b>: de combinatie van allelen (Aa).<br>2 <b>fenotype</b>: wat je kunt waarnemen.<br>3 <b>heterozygoot</b>: twee verschillende allelen (Aa); twee dezelfde (AA of aa) is homozygoot.<br>4 <b>locus</b>: de vaste plek van een gen op een chromosoom.<br>5 <b>dominant</b>: één exemplaar is genoeg om tot uiting te komen.<br>Alle vijf goed: 2 punten; vier goed: 1 punt."))});
  q.append(think,ans);
},STOF_DNA));
}

ids.push(vraag(2,"genotype en milieu: in de zon",(q,id)=>{
  pre(q,"<p>Iemand met het genotype aa voor tyrosinase (albinisme) zit elke dag lang in de zon.</p>");
  const {think,ans,unlock}=start(q,B("Wordt zijn huid bruiner? Leg je antwoord uit met de begrippen genotype, fenotype en milieu."));
  choiceStep(think,{q:"Wat doet zonlicht (UV) bij iemand met een gewone huid?",opts:["de pigmentcellen gaan meer melanine maken","het DNA verandert in alle huidcellen","niets"],right:0,
    ok:"Ja: zo wordt een gewone huid bruin. Zonlicht hoort bij het milieu. Wat hebben de pigmentcellen nodig om melanine te maken?",no:"Waarom word je bruin op vakantie?",
    onDone:()=>choiceStep(think,{q:"Heeft iemand met aa een werkend enzym tyrosinase?",opts:["ja, maar minder","nee"],right:1,
      ok:"Goed. Zet het nu samen: wat doet het milieu, en wat kan het hier níet?",no:"Het allel a heeft een fout waardoor het enzym niet werkt. En hij heeft twee keer a.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Het <b>fenotype</b> ontstaat uit het <b>genotype</b> én het <b>milieu</b> (UV-licht laat pigmentcellen meer melanine maken).",
    "Maar het milieu kan alleen werken met wat de genen mogelijk maken: bij <b>aa</b> is er geen werkend enzym, dus er komt geen melanine en de huid wordt <b>niet bruiner</b>."],
    model:"Nee. Het fenotype hangt af van het genotype en het milieu: zonlicht laat bij een gewone huid de pigmentcellen meer melanine maken. Maar het milieu kan alleen werken met wat de genen mogelijk maken. Met het genotype aa is er geen werkend tyrosinase, dus er kan geen melanine gemaakt worden, hoeveel zon er ook is.",
    valkuil:"Alleen ‘nee’ zonder uitleg levert 0 punten op. ‘Ja, want het milieu verandert het fenotype’ vergeet dat er bij aa geen werkend enzym is.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Gewone huid (AA of Aa) in de zon: UV laat de pigmentcellen meer melanine maken. Het milieu verandert het fenotype: bruiner.",k:0},
      {cap:"Huid met aa in de zon: dezelfde UV, maar er is geen werkend tyrosinase. Er komt geen melanine: <b>niet bruiner</b>. Het milieu kan alleen werken met wat de genen mogelijk maken.",k:1}],
      (st,s)=>{let g=`<text x="10" y="22" class="lbl" style="font-size:16px">${s.k?"genotype aa":"genotype AA of Aa"}</text><text x="370" y="22" text-anchor="end" class="lblm" style="font-size:15px">UV</text>`;
        for(let i=0;i<4;i++)g+=`<path d="M${70+i*90},34 l-14,34" stroke="var(--goud)" stroke-width="3"/>`;
        g+=`<rect x="10" y="78" width="360" height="30" fill="var(--surface2)" stroke="var(--text2)"/><text x="16" y="98" class="lblm" style="font-size:14px">huid</text>`;
        for(let i=0;i<4;i++){const x=55+i*90;g+=`<circle cx="${x}" cy="132" r="18" fill="var(--surface)" stroke="var(--text2)"/>`;
          if(!s.k)for(let j=0;j<5;j++)g+=`<circle cx="${x-18+j*9}" cy="${96-j%2*7}" r="4" fill="var(--oker)"/>`;}
        g+=`<text x="190" y="176" text-anchor="middle" class="lbl" style="font-size:15px">${s.k?"geen werkend enzym → geen melanine":"enzym werkt → meer melanine"}</text>`;
        st.innerHTML=svgWrap("0 0 380 190",g,"Huid in de zon");}))});
  q.append(think,ans);
},STOF_MILIEU));

opgave("Genen","Chromosomen, genen en allelen","",ids);
}
