/* ===== Opgave 1: De bouw van DNA (havo: KA01, KA05 · vwo: KA09) ===== */
{
const STOF_BOUW={titel:"Nucleotiden en de ladder",html:`
<p>DNA is een lange ketting van <b>nucleotiden</b>. Er zijn vier soorten nucleotiden; ze verschillen alleen in hun base. De ruggengraat van een streng is overal hetzelfde.</p>
<p>Twee strengen liggen tegenover elkaar als een <b>ladder</b> die gedraaid is: de dubbele helix. De basen vormen de sporten; tegenover een bepaalde base past steeds maar één andere (<b>complementair</b>).</p>
<p>Een cel moet de bouwstoffen voor DNA zelf maken of opnemen. Een plant haalt mineralen zoals nitraat en fosfaat uit de bodem.</p>`+(VWO?`
<p>De koolstofatomen van de suiker hebben nummers. Daardoor heeft elke streng een <b>richting</b>: een 5'-uiteinde en een 3'-uiteinde.</p>`:""),
films:[F.wat]};
const ids=[];
if(!VWO){
ids.push(vraag(2,"drie delen van een nucleotide en vier basen",(q,id)=>{
  const {think,ans,unlock}=startLos(q,"Een DNA-streng is een ketting van nucleotiden.<br>• "+B("Noem de drie delen van één nucleotide.")+"<br>• "+B("Noem de vier stikstofbasen van DNA voluit."));
  choiceStep(think,{q:"Er zijn vier soorten nucleotiden. Waarin verschillen ze van elkaar?",opts:["in de suiker","in de base","in het aantal delen"],right:1,
    ok:"Ja. De andere delen zijn bij alle nucleotiden gelijk: ze vormen samen de rug van de ketting.",no:"De rug van de ketting is overal hetzelfde. Wat steekt er naar binnen, als sport van de ladder?",
    onDone:()=>choiceStep(think,{q:"De letters A, T, C en G zijn afkortingen. Is alleen de letter genoeg als de vraag ‘voluit’ zegt?",opts:["ja","nee, je schrijft de hele naam"],right:1,
      ok:"Goed. Schrijf nu de drie delen en de vier namen op.",no:"‘Voluit’ betekent: de hele naam.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "fosfaatgroep, suiker (desoxyribose) en stikstofbase",
    "adenine, thymine, cytosine en guanine"],
    model:"Een nucleotide bestaat uit een fosfaatgroep, een suiker (desoxyribose) en een stikstofbase. De vier basen zijn adenine, thymine, cytosine en guanine.",
    valkuil:"Alleen de letters A, T, C en G: 0 punten voor het tweede punt. ‘Suiker’ zonder naam is goed.",
    after:()=>waaromBtn(ans,textBox("Elke nucleotide heeft dezelfde fosfaatgroep en dezelfde suiker (desoxyribose); die vormen samen de rug van de streng. Alleen de <b>base</b> verschilt: adenine, thymine, cytosine of guanine. Uit de volgorde van die vier basen bestaat de informatie in het DNA."))});
  q.append(think,ans);
},STOF_BOUW));

ids.push(vraag(1,"te weinig nitraat",(q,id)=>{
  const {think,ans,unlock}=start(q,"Een plant die op een bodem met te weinig nitraat groeit, kan minder DNA maken. "+B("Leg uit waardoor."));
  choiceStep(think,{q:"Nitraat is NO<sub>3</sub><sup>−</sup>. Welk element haalt een plant vooral uit nitraat?",opts:["zuurstof","stikstof","fosfor"],right:1,
    ok:"Ja. Zuurstof krijgt een plant genoeg uit lucht en water; om de N gaat het.",no:"Kijk naar het symbool: N.",
    onDone:()=>chipsStep(think,{q:"In welke stoffen in een cel zit dat element? Kies alles wat klopt.",items:[["eiwitten (aminozuren)",1],["DNA",1],["glucose",0],["vet",0]],
      ok:"Goed. Welk deel van een nucleotide bevat het dan?",no:"Glucose en vet bestaan alleen uit C, H en O.",onDone:unlock})});
  openAnswer(ans,{id,pts:1,checks:["De <b>stikstofbasen</b> van DNA bevatten stikstof; de plant haalt die stikstof uit nitraat in de bodem."],
    model:"De basen in DNA zijn stikstofbasen: er zit stikstof in. Die stikstof haalt de plant uit nitraat. Met te weinig nitraat kan de plant minder basen, en dus minder nucleotiden en DNA maken.",
    valkuil:"‘Nitraat is een voedingsstof’ zonder stikstof of basen: 0 punten.",
    after:()=>waaromBtn(ans,textBox("De naam zegt het al: <b>stikstof</b>basen. Een plant kan stikstof niet uit de lucht gebruiken, maar neemt hem op als nitraat uit de bodem. Zonder genoeg stikstof kan ze minder basen maken, dus minder nucleotiden en minder DNA (en ook minder eiwitten)."))});
  q.append(think,ans);
},STOF_BOUW));
}else{
ids.push(vraag(3,"de andere streng, 5' en 3', antiparallel",(q,id)=>{
  const {think,ans,unlock}=startLos(q,"Hieronder staat één streng van een stukje DNA:<br><br>"+SEQ("5'-A T G C C A-3'")+"<br><br>• "+B("Schrijf de andere streng eronder, met het 5'- en het 3'-uiteinde erbij.")+"<br>• "+B("Wat zit er vrij aan het 5'-uiteinde van een streng, en wat aan het 3'-uiteinde?")+"<br>• "+B("Leg met dit stukje DNA uit wat antiparallel betekent."));
  selectsStep(think,{uid:"q"+id,q:"Welke base staat in DNA tegenover …",rows:[["A",["A","T","C","G"],1],["T",["A","T","C","G"],0],["C",["A","T","C","G"],3],["G",["A","T","C","G"],2]],
    ok:"Goed: de basen zijn complementair.",no:"In DNA paart A met T, en C met G.",
    onDone:()=>choiceStep(think,{q:"Waar verwijzen de getallen 5' en 3' naar?",opts:["naar de nummers van de koolstofatomen in de suiker","naar het aantal basen aan dat uiteinde","naar de nummers van de nucleotiden"],right:0,
      ok:"Ja. Bedenk nu welke groep aan het vijfde en welke aan het derde koolstofatoom vrij zit, en in welke richting de andere streng loopt.",no:"Het gaat om de suiker in de rug van de streng.",onDone:unlock})});
  openAnswer(ans,{id,pts:3,checks:[
    SEQ("3'-T A C G G T-5'")+" (ook goed: "+SEQ("5'-T G G C A T-3'")+")",
    "5'-uiteinde: een vrije <b>fosfaatgroep</b> (aan het vijfde koolstofatoom); 3'-uiteinde: een vrije <b>OH-groep</b> (aan het derde koolstofatoom)",
    "de twee strengen lopen in <b>tegengestelde richting</b>: de ene van 5' naar 3', de andere (ernaast) van 3' naar 5'"],
    model:"5'-A T G C C A-3'<br>3'-T A C G G T-5'<br>Aan het 5'-uiteinde zit een vrije fosfaatgroep aan het vijfde koolstofatoom van de suiker, aan het 3'-uiteinde een vrije OH-groep aan het derde koolstofatoom. Antiparallel: de bovenste streng loopt van links naar rechts van 5' naar 3', de onderste ernaast van 3' naar 5'.",
    valkuil:"De andere streng zonder 5' en 3', of met 5' links onder 5' links (dan lopen ze dezelfde kant op): 0 punten voor het eerste punt.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"De gegeven streng loopt van links naar rechts van 5' naar 3'.",n:1},
      {cap:"Tegenover elke base de complementaire base: A–T, T–A, G–C, C–G, C–G, A–T.",n:2},
      {cap:"De nieuwe streng loopt de andere kant op: links het 3'-uiteinde, rechts het 5'-uiteinde. Dat is antiparallel.",n:3}],
      (st,s)=>{const top="ATGCCA",bot="TACGGT";let h="";
        [...top].forEach((c,i)=>{h+=`<text x="${70+i*48}" y="50" text-anchor="middle" class="lbl" style="font-size:20px">${c}</text>`;
          if(s.n>=2)h+=`<path d="M${70+i*48},58 V82" stroke="var(--text3)" stroke-width="2" stroke-dasharray="3 3"/><text x="${70+i*48}" y="106" text-anchor="middle" class="lbl" style="font-size:20px">${bot[i]}</text>`;});
        h+=`<text x="30" y="50" class="lblm">5'</text><text x="330" y="50" class="lblm">3'</text><path d="M60,22 H320" stroke="var(--teal)" stroke-width="2.5"/><path d="M312,16 L322,22 L312,28" fill="none" stroke="var(--teal)" stroke-width="2.5"/>`;
        if(s.n>=3)h+=`<text x="30" y="106" class="lblm">3'</text><text x="330" y="106" class="lblm">5'</text><path d="M60,128 H320" stroke="var(--goud)" stroke-width="2.5"/><path d="M68,122 L58,128 L68,134" fill="none" stroke="var(--goud)" stroke-width="2.5"/>`;
        st.innerHTML=svgWrap("0 0 360 140",h,"twee DNA-strengen");}))});
  q.append(think,ans);
},STOF_BOUW));
}
opgave("Bouw van DNA","De bouw van DNA","",ids);
}
