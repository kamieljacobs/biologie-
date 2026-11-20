/* ===== Opgave 2: DNA kopiëren (havo: KB01 · vwo: KB07, KB09) ===== */
{
const STOF_KOP={titel:"DNA-replicatie",html:`
<p>Voordat een cel deelt, kopieert ze al haar DNA: de <b>replicatie</b>, in de S-fase van de celcyclus. Zo krijgt elke dochtercel een volledige set.</p>
<p>Elke oude streng is daarbij het voorbeeld (de mal) voor een nieuwe streng: tegenover elke base komt de passende base. Het werk wordt gedaan door enzymen, zoals <b>helicase</b> en <b>DNA-polymerase</b>; in de film zie je wat elk enzym doet.</p>
<p>In het kernplasma zweven vrije nucleotiden rond: de bouwstenen voor de nieuwe strengen.</p>`+(VWO?`
<p>Naast de enzymen van de replicatie kent de cel enzymen die RNA maken van een gen, en enzymen die schade en fouten in het DNA herstellen. Sommige virussen hebben een enzym dat de stroom omdraait: van RNA naar DNA.</p>`:""),
films:[F.kop]};
const ids=[];
if(!VWO){
const ST=["P DNA-polymerase sluit zich om de nucleotide en koppelt hem vast aan de vorige.","Q Er liggen twee identieke DNA-moleculen, klaar voor twee dochtercellen.","R Helicase trekt de twee strengen uit elkaar.","S Een vrije nucleotide uit het kernplasma die past bij de base tegenover, blijft liggen."];
ids.push(vraag(1,"volgorde bij het kopiëren",(q,id)=>{
  const {think,ans,unlock}=startLos(q,B("Zet de gebeurtenissen bij het kopiëren van DNA in de goede volgorde.")+"<br><br>"+ST.join("<br>"));
  choiceStep(think,{q:"Waarom moeten de twee strengen ergens in het proces los van elkaar?",opts:["zodat de basen vrij liggen en er nieuwe nucleotiden tegenover kunnen komen","zodat het DNA korter wordt","zodat de nucleotiden van de oude streng kunnen worden afgebroken"],right:0,
    ok:"Ja. Bedenk dus: wat moet er eerst gebeuren voordat een nucleotide tegenover een base kan gaan liggen?",no:"De oude strengen blijven bestaan; ze zijn juist het voorbeeld.",
    onDone:()=>choiceStep(think,{q:"Kan DNA-polymerase een nucleotide vastkoppelen die er nog niet ligt?",opts:["ja","nee"],right:1,
      ok:"Goed. Zet nu de vier gebeurtenissen op volgorde.",no:"Het enzym koppelt een nucleotide die al tegenover de goede base ligt.",onDone:unlock})});
  const O=["P","Q","R","S"];
  selectAnswer(ans,{id,uid:"q"+id,intro:"Kies per stap de letter.",rows:[["1e",O,2],["2e",O,3],["3e",O,0],["4e",O,1]],score:n=>n===4?1:0,
    after:()=>waaromBtn(ans,textBox("<b>R – S – P – Q</b>. Helicase opent de dubbele helix als een rits (R). Pas dan liggen de basen vrij en blijft een passende vrije nucleotide liggen (S). DNA-polymerase koppelt hem vast aan de vorige (P). Zo groeien twee nieuwe strengen en liggen er aan het eind twee identieke DNA-moleculen (Q)."))});
  q.append(think,ans);
},STOF_KOP));
}else{
ids.push(vraag(2,"twee keer kopiëren: semiconservatief",(q,id)=>{
  const {think,ans,unlock}=start(q,"Een cel kopieert haar DNA twee keer achter elkaar. Uit één DNA-molecuul ontstaan zo vier DNA-moleculen.<br><br>"+B("Hoeveel van die vier moleculen bevatten nog een streng van het oorspronkelijke molecuul? Leg je antwoord uit met het begrip semiconservatief."));
  numStep(think,{uid:"q"+id+"n",q:"Uit hoeveel strengen bestaat het oorspronkelijke molecuul?",right:2,ok:"Ja. Worden die strengen bij het kopiëren afgebroken, of blijven ze bestaan?",no:"DNA is dubbelstrengs.",
    onDone:()=>choiceStep(think,{q:"Kan één oude streng in twee moleculen tegelijk zitten?",opts:["ja, hij wordt verdeeld","nee, een streng blijft in één molecuul"],right:1,
      ok:"Goed. Reken nu uit hoeveel van de vier moleculen een oude streng hebben, en leg uit waarom.",no:"Een streng wordt niet in stukken verdeeld over moleculen.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:["<b>twee</b>",
    "replicatie is <b>semiconservatief</b>: elk nieuw molecuul heeft één oude en één nieuwe streng; de twee oude strengen blijven elk in één molecuul"],
    model:"Twee. Replicatie is semiconservatief: na elke ronde heeft elk molecuul één oude streng en één nieuwe. De twee oorspronkelijke strengen blijven bestaan en zitten na twee rondes elk in één van de vier moleculen; de andere twee moleculen bestaan alleen uit nieuwe strengen.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Het oorspronkelijke molecuul: twee oude strengen (goud).",r:0},
      {cap:"Na de eerste ronde: twee moleculen, elk met één oude en één nieuwe streng. Dat is semiconservatief.",r:1},
      {cap:"Na de tweede ronde: vier moleculen. De twee oude strengen zitten in twee ervan; de andere twee zijn helemaal nieuw.",r:2}],
      (st,s)=>{const mol=(x,y,a,c)=>`<path d="M${x},${y} h70" stroke="${a}" stroke-width="5"/><path d="M${x},${y+12} h70" stroke="${c}" stroke-width="5"/>`;
        const O="var(--goud)",N="var(--teal)";let h="";
        if(s.r===0)h=mol(145,50,O,O);
        if(s.r===1)h=mol(60,50,O,N)+mol(230,50,N,O);
        if(s.r===2)h=mol(10,50,O,N)+mol(100,50,N,N)+mol(190,50,N,N)+mol(280,50,N,O);
        h+=`<text x="10" y="100" class="lblm">goud = oude streng · blauw = nieuwe streng</text>`;
        st.innerHTML=svgWrap("0 0 360 110",h,"DNA-moleculen na replicatie");}))});
  q.append(think,ans);
},STOF_KOP));

ids.push(vraag(2,"enzymen bij DNA en RNA",(q,id)=>{
  const {think,ans,unlock}=startLos(q,B("Vul de tabel in.")+`<div class="tablewrap"><table class="data"><tr><th>enzym</th><th>wat doet het?</th><th>hoe vaak?</th></tr><tr><td>DNA-polymerase</td><td>…</td><td>…</td></tr><tr><td>RNA-polymerase</td><td>…</td><td>…</td></tr></table></div>`+B("Noem ook het enzym waarmee sommige virussen RNA omzetten in DNA, en de enzymen die verkeerd ingebouwde nucleotiden vervangen."));
  choiceStep(think,{q:"Bij welk proces wordt één gen overgeschreven naar RNA?",opts:["replicatie","transcriptie","translatie"],right:1,
    ok:"Ja. En bij welk proces wordt al het DNA gekopieerd?",no:"Translatie gebeurt bij het ribosoom; replicatie is het kopiëren van al het DNA.",
    onDone:()=>choiceStep(think,{q:"Een cel gebruikt een gen soms heel veel. Hoe vaak wordt al het DNA gekopieerd?",opts:["zo vaak als de cel wil","één keer per celcyclus, vóór de deling"],right:1,
      ok:"Goed. Vul nu de tabel in en noem de twee andere enzymen.",no:"Al het DNA kopiëren hoort bij de voorbereiding op de deling.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "DNA-polymerase kopieert al het DNA, <b>één keer per celcyclus</b> (replicatie); RNA-polymerase schrijft één gen over naar RNA, <b>zo vaak als nodig</b> (transcriptie)",
    "<b>reverse transcriptase</b>; <b>DNA-repair-enzymen</b>"],
    model:"DNA-polymerase: kopieert al het DNA (replicatie), één keer per celcyclus. RNA-polymerase: schrijft een gen over naar RNA (transcriptie), zo vaak als de cel dat eiwit nodig heeft. Reverse transcriptase zet RNA om in DNA (bijvoorbeeld bij hiv). DNA-repair-enzymen vervangen verkeerd ingebouwde nucleotiden.",
    valkuil:"Voor het eerste punt moeten beide rijen helemaal kloppen (wat én hoe vaak).",
    after:()=>waaromBtn(ans,textBox("Het verschil zit in de omvang en de frequentie: <b>replicatie</b> = alles, één keer, vóór de deling; <b>transcriptie</b> = één gen, steeds opnieuw, wanneer het eiwit nodig is. <b>Reverse transcriptase</b> werkt ‘achteruit’ (RNA → DNA). <b>Repair-enzymen</b> knippen een fout of beschadigd stuk eruit en vullen het aan met de andere streng als voorbeeld."))});
  q.append(think,ans);
},STOF_KOP));
}
opgave("Kopiëren","DNA kopiëren","",ids);
}
