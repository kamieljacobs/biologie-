/* ===== Opgave 3: Van gen naar eiwit (havo: KC07, KC10, KC11 · vwo: KC15, KC16, KC17) ===== */
{
const STOF_CODE={titel:"Codons en de codontabel",html:`
<p>Bij de <b>transcriptie</b> schrijft RNA-polymerase een gen over naar mRNA. Bij de <b>translatie</b> leest een ribosoom het mRNA steeds per <b>drie basen</b>: een codon. Elk codon staat voor een aminozuur, of voor stop.</p>
<p>De codontabel lees je zo: zoek de eerste base in de rij, de tweede base in de kolom, en de derde base in het vak. Het ribosoom begint bij het <b>startcodon</b> en stopt bij een <b>stopcodon</b>.</p>
<p>Er zijn 64 codons en maar 20 aminozuren, dus veel aminozuren hebben meer dan één codon.</p>`,films:[F.eiw,F.code]};
const STOF_VORM={titel:"Van keten naar vorm",html:`
<p>Een eiwit is een keten van aminozuren. Als de keten klaar is, is het eiwit nog niet af: de keten <b>vouwt</b> zich nog tot het eiwit dat in de cel werk doet.</p>
<p>Een <b>enzym</b> is zo'n eiwit. Het zet steeds één bepaalde stof om, zijn <b>substraat</b>.</p>`,films:[F.eiw]};
const ids=[];
if(!VWO){
ids.push(vraag(1,"aminozuren bij een stukje mRNA",(q,id)=>{
  const {think,ans,unlock}=startLos(q,"Gebruik de codontabel (BiNaS 71G). Een mRNA begint zo:<br><br>"+SEQ("C G A U G G C U U G G U A A C U")+"<br><br>"+B("Welke aminozuren horen bij dit stukje mRNA? Geef ze in de goede volgorde."),CODONTABEL());
  choiceStep(think,{q:"Waar begint het ribosoom met lezen?",opts:["bij de eerste base van het mRNA","bij het startcodon AUG","bij de eerste G"],right:1,
    ok:"Ja. Zoek AUG in dit stukje mRNA en lees vanaf daar per drie.",no:"Het ribosoom zoekt eerst het startcodon.",
    onDone:()=>choiceStep(think,{q:"Wat doet het ribosoom bij een stopcodon?",opts:["het zet er een laatste aminozuur neer","het stopt; er komt geen aminozuur bij"],right:1,
      ok:"Goed. Schrijf de aminozuren op tot het stopcodon.",no:"Een stopcodon staat niet voor een aminozuur.",onDone:unlock})});
  openAnswer(ans,{id,pts:1,checks:["methionine – alanine – tryptofaan"],
    model:"methionine – alanine – tryptofaan (AUG GCU UGG, daarna stopcodon UAA)",valkuil:"Begonnen bij de eerste base (CGA …): 0 punten.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Het ribosoom zoekt eerst het startcodon AUG. De eerste twee basen (C G) worden niet gelezen.",k:1},
      {cap:"Vanaf AUG per drie: AUG = methionine, GCU = alanine, UGG = tryptofaan.",k:4},
      {cap:"UAA is een stopcodon: de keten is klaar. De rest (CU) wordt niet meer gelezen.",k:5}],
      (st,s)=>{const r="CG|AUG|GCU|UGG|UAA|CU".split("|");let h="",x=10;
        r.forEach((c,i)=>{const w=c.length*22+10,act=i>=1&&i<s.k,stop=i===4&&s.k>=5;
          h+=`<rect x="${x}" y="20" width="${w}" height="36" rx="6" fill="${stop?"var(--koraal-soft)":act?"var(--teal-soft)":"none"}" stroke="${i===0||i===5?"var(--line2)":"var(--text2)"}"/>`;
          h+=`<text x="${x+w/2}" y="44" text-anchor="middle" class="lbl" style="font-size:17px;letter-spacing:3px">${c}</text>`;
          if(act||stop)h+=`<text x="${x+w/2}" y="78" text-anchor="middle" class="lblm">${stop?"stop":AZ[vertaal(c)].replace(" (start)","")}</text>`;x+=w+6;});
        st.innerHTML=svgWrap(`0 0 ${x+4} 92`,h,"mRNA in codons");}))});
  q.append(think,ans);
},STOF_CODE));

ids.push(vraag(1,"GCU wordt GCA",(q,id)=>{
  const {think,ans,unlock}=startLos(q,B("Gebruik de codontabel. Door een substitutie verandert het codon GCU in het mRNA in GCA. Wat is het gevolg voor het eiwit?"),CODONTABEL());
  choiceStep(think,{q:"Bij een substitutie wordt één base vervangen door een andere. Verschuiven de codons die erna komen?",opts:["ja, alle codons erna veranderen","nee, alleen dit ene codon verandert"],right:1,
    ok:"Ja. Het gaat dus alleen om dit ene codon. Zoek nu beide codons op in de tabel.",no:"Er komt geen base bij en er gaat er geen af. Het aantal basen blijft gelijk.",onDone:unlock});
  mc(ans,{qid:id,pts:1,right:2,opts:["Er komt een ander aminozuur in het eiwit.","Het eiwit is te kort, want GCA is een stopcodon.","Er verandert niets aan het eiwit, want GCA codeert ook voor alanine.","Vanaf deze plek klopt geen enkel codon meer."],
    onChecked:()=>waaromBtn(ans,textBox("GCU en GCA staan allebei voor <b>alanine</b>: een stille mutatie. Vaak verschillen codons voor hetzelfde aminozuur alleen in de derde base. A: een andere base betekent niet altijd een ander aminozuur. B: GCA is geen stopcodon. D: dat geldt voor een base erbij of eraf, niet voor een substitutie. Het antwoord is <b>C</b>."))});
  q.append(think,ans);
},STOF_CODE));

ids.push(vraag(2,"van nucleotiden naar een werkend enzym",(q,id)=>{
  const {think,ans,unlock}=start(q,"Cellen maken de hele dag eiwitten, zoals enzymen. "+B("Leg uit hoe de volgorde van de nucleotiden in een gen bepaalt of een enzym werkt. Gebruik de begrippen aminozuurvolgorde, vorm en substraat."));
  numStep(think,{uid:"q"+id+"n",q:"Hoeveel nucleotiden in het mRNA bepalen samen één aminozuur?",right:3,ok:"Ja: één codon. Wat gebeurt er met de keten aminozuren als hij klaar is?",no:"Denk aan een codon.",
    onDone:()=>choiceStep(think,{q:"Een enzym zet alleen zijn eigen substraat om. Waardoor?",opts:["het substraat past precies in het enzym","het enzym is groter dan het substraat","het substraat lost op in het enzym"],right:0,
      ok:"Goed. Maak nu de keten af: nucleotiden → … → werkt het enzym?",no:"Denk aan sleutel en slot.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "de nucleotidenvolgorde bepaalt de <b>aminozuurvolgorde</b>, en die bepaalt hoe de keten zich vouwt tot een vaste <b>vorm</b>",
    "de vorm bepaalt de werking: een enzym werkt alleen als het op zijn <b>substraat</b> past"],
    model:"Elke drie nucleotiden bepalen één aminozuur, dus de nucleotidenvolgorde bepaalt de aminozuurvolgorde. Die bepaalt hoe de keten vouwt, en dus de vorm van het enzym. Alleen als die vorm precies past bij het substraat, kan het enzym het substraat omzetten.",
    after:()=>waaromBtn(ans,textBox("De keten is: <b>nucleotidenvolgorde → aminozuurvolgorde → vouwing → vorm → past het substraat?</b> Verandert er iets in het begin van de keten, dan kan het doorwerken tot aan de vorm, en dan werkt het enzym niet meer."))});
  q.append(think,ans);
},STOF_VORM));
}else{
const STOF_STR={titel:"Matrijsstreng, coderende streng en mRNA",html:`
<p>RNA-polymerase gebruikt één streng van het gen als voorbeeld: de <b>matrijsstreng</b>. Het mRNA is complementair aan die streng (met U in plaats van T). De andere streng heet de <b>coderende streng</b>.</p>
<p>Het mRNA wordt gemaakt van 5' naar 3', en is antiparallel aan de streng waartegenover het ontstaat. Schrijf daarom altijd de 5'- en 3'-uiteinden erbij, en controleer of twee strengen tegenover elkaar de andere kant op lopen.</p>`,films:[F.eiw,F.code]};
ids.push(vraag(3,"matrijsstreng en mRNA",(q,id)=>{
  const {think,ans,unlock}=startLos(q,"Van een gen is een stukje van de coderende streng gegeven:<br><br>"+SEQ("5'-A T G A A A C C C-3'")+"<br><br>• "+B("Schrijf de matrijsstreng op, met 5' en 3'.")+"<br>• "+B("Schrijf het mRNA op, van 5' naar 3'.")+"<br>• "+B("In welke richting leest RNA-polymerase de matrijsstreng?"));
  choiceStep(think,{q:"Welke streng ligt tegenover de coderende streng?",opts:["het mRNA","de matrijsstreng"],right:1,
    ok:"Ja: samen vormen ze het dubbelstrengs DNA. Het mRNA ontstaat tegenover de matrijsstreng.",no:"Het gen is dubbelstrengs DNA; de coderende streng heeft een partner.",
    onDone:()=>choiceStep(think,{q:"In welke richting groeit een nieuw RNA- of DNA-molecuul?",opts:["van 5' naar 3'","van 3' naar 5'"],right:0,
      ok:"Goed. Bedenk dan in welke richting de streng waar het tegenover ligt, wordt afgelezen.",no:"Nieuwe nucleotiden komen steeds aan het 3'-uiteinde.",onDone:unlock})});
  openAnswer(ans,{id,pts:3,checks:[
    "matrijsstreng: "+SEQ("3'-T A C T T T G G G-5'")+" (of "+SEQ("5'-G G G T T T C A T-3'")+")",
    "mRNA: "+SEQ("5'-A U G A A A C C C-3'"),
    "RNA-polymerase leest de matrijsstreng <b>van 3' naar 5'</b> (het mRNA groeit van 5' naar 3')"],
    model:"Matrijsstreng 3'-TACTTTGGG-5'. Het mRNA is complementair aan de matrijsstreng en heeft dus dezelfde volgorde als de coderende streng, met U: 5'-AUGAAACCC-3'. Het mRNA groeit van 5' naar 3', dus RNA-polymerase leest de matrijsstreng van 3' naar 5'.",
    valkuil:"Een mRNA dat complementair is aan de coderende streng (UAC…) is fout: het mRNA ontstaat tegenover de matrijsstreng.",
    after:()=>waaromBtn(ans,textBox("Coderende streng 5'-ATGAAACCC-3'<br>Matrijsstreng &nbsp;&nbsp;3'-TACTTTGGG-5'<br>mRNA &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5'-AUGAAACCC-3' (tegenover de matrijs, dus gelijk aan de coderende streng met U)<br>Het mRNA groeit van 5' naar 3'. Omdat het antiparallel ligt aan de matrijs, leest RNA-polymerase de matrijsstreng van <b>3' naar 5'</b>. Handig: het mRNA begint met AUG, het startcodon."))});
  q.append(think,ans);
},STOF_STR));

ids.push(vraag(2,"anticodon en 64 codons",(q,id)=>{
  const {think,ans,unlock}=startLos(q,B("Beantwoord beide vragen.")+"<br>• "+B("Welk anticodon heeft het tRNA dat past op het codon GCU?")+"<br>• "+B("Er zijn 64 codons en maar 20 aminozuren. Leg uit wat daaruit volgt voor het aantal codons per aminozuur."));
  selectsStep(think,{uid:"q"+id,q:"Welke base past in RNA tegenover …",rows:[["A",["A","U","C","G"],1],["U",["A","U","C","G"],0],["C",["A","U","C","G"],3],["G",["A","U","C","G"],2]],
    ok:"Goed: in RNA paart A met U.",no:"In RNA staat U in plaats van T.",
    onDone:()=>numStep(think,{uid:"q"+id+"n",q:"Hoeveel van de 64 codons zijn een stopcodon?",right:3,ok:"Ja. Hoeveel codons blijven er dan over voor 20 aminozuren?",no:"Kijk in de codontabel: UAA, UAG, UGA.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:["<b>CGA</b>",
    "drie codons zijn stopcodons; de andere <b>61</b> horen bij 20 aminozuren, dus de meeste aminozuren hebben <b>meer dan één codon</b> (vaak alleen verschillend in de derde base)"],
    model:"Het anticodon is CGA. Drie van de 64 codons zijn stopcodons; de andere 61 codons horen bij maar 20 aminozuren. De meeste aminozuren hebben dus meer dan één codon; die verschillen vaak alleen in de derde base.",
    after:()=>waaromBtn(ans,textBox("Codon GCU, anticodon tegenover elke base de complementaire: G–C, C–G, U–A → <b>CGA</b>. 61 codons voor 20 aminozuren is gemiddeld ruim drie per aminozuur: de code heeft ‘reserves’. Daardoor is een verandering in de derde base vaak een stille mutatie."))});
  q.append(think,ans);
},STOF_CODE));

ids.push(vraag(2,"rRNA en een gen zonder introns",(q,id)=>{
  const {think,ans,unlock}=startLos(q,B("Beantwoord beide vragen.")+"<br>• "+B("Een ribosoom bestaat voor een groot deel uit RNA. Wat doet dat RNA?")+"<br>• "+B("De bacterie die menselijke insuline maakt, kreeg een versie van het gen zonder introns. Leg uit waarom."));
  choiceStep(think,{q:"Wat gebeurt er in een menselijke cel met de introns in het pre-mRNA?",opts:["ze worden vertaald naar aminozuren","ze worden eruit geknipt voordat het mRNA de kern uit gaat","ze blijven in het DNA en komen niet in het RNA"],right:1,
    ok:"Ja. Een bacterie heeft geen kern. Heeft ze ook dit knipwerk?",no:"Introns komen wél in het pre-mRNA, maar niet in het mRNA dat het ribosoom leest.",
    onDone:()=>choiceStep(think,{q:"Wat doet een ribosoom tijdens de translatie met de aminozuren die tRNA's aanvoeren?",opts:["het koppelt ze aan elkaar","het breekt ze af","het vervoert ze de kern in"],right:0,
      ok:"Goed. Beantwoord nu beide vragen.",no:"Het ribosoom bouwt de eiwitketen.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "het ribosomale RNA (<b>rRNA</b>) <b>koppelt de aminozuren</b> aan elkaar",
    "een bacterie kan geen introns wegknippen (<b>geen splicing</b>); met introns zou het eiwit niet kloppen"],
    model:"Het rRNA koppelt de aminozuren aan elkaar tot een eiwitketen. Een bacterie heeft geen splicing: zij kan geen introns uit het RNA knippen. Met introns erin zouden er verkeerde aminozuren (of een stopcodon) in het eiwit komen, dus geen werkende insuline.",
    after:()=>waaromBtn(ans,textBox("Het werk in het ribosoom wordt gedaan door het <b>RNA</b>, niet door de eiwitten erin: het rRNA maakt de binding tussen twee aminozuren. Bacteriegenen hebben geen introns, dus bacteriën hebben ook geen splicing. Daarom geeft men ze een ‘kant-en-klare’ versie van het gen: alleen de exons achter elkaar."))});
  q.append(think,ans);
},STOF_CODE));
}
opgave("Gen naar eiwit","Van gen naar eiwit","",ids);
}
