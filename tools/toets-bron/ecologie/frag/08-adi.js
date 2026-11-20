/* ===== Opgave 8 (alleen havo): Te veel, en het blijft (EI-milieu-KN05) ===== */
if(!VWO){
const STOF_ADI={titel:"De ADI",html:`
<p>Sommige stoffen, zoals bestrijdingsmiddelen, kunnen schadelijk zijn als je er te veel van binnenkrijgt. Hoeveel veilig is, staat in de <b>ADI</b>: de aanvaardbare dagelijkse inname. Dat is de hoeveelheid die je je hele leven elke dag mag binnenkrijgen zonder merkbaar risico.</p>
<p>De ADI geldt <b>per kilo lichaamsgewicht</b>. In de film: ADI 0,02 mg per kilo, Daan weegt 50 kilo, op één appel zit 0,1 mg. Daan mag 0,02 × 50 = 1 mg per dag binnenkrijgen, dus 1 : 0,1 = 10 appels. Een kind van 20 kilo zit al bij 4 appels aan de grens.</p>
<p>Let bij zo'n som goed op de eenheden: gram of kilogram, per dag of per kilo.</p>`,
films:[F.aarde]};
const ids=[vraag(2,"ADI en appelmoes",(q,id)=>{
  pre(q,"<p>Een bestrijdingsmiddel heeft een ADI van 0,01 mg per kg lichaamsgewicht. Een peuter van 12 kg eet elke dag 200 gram appelmoes.</p>");
  const {think,ans,unlock}=start(q,B("Bereken hoeveel mg van het middel er per kilo appelmoes maximaal in mag zitten."));
  choiceStep(think,{q:"De ADI geldt per kilo lichaamsgewicht. Wat reken je dus eerst uit?",opts:["hoeveel mg de peuter in totaal per dag mag binnenkrijgen","hoeveel kilo appelmoes de peuter per jaar eet","hoeveel mg er in 200 gram appelmoes zit"],right:0,
    ok:"Ja. Dat is wat in de 200 gram appelmoes van één dag maximaal mag zitten.",no:"Begin bij de peuter: hoe zwaar is hij, en hoeveel mag hij per kilo?",
    onDone:()=>choiceStep(think,{q:"De vraag gaat over een kilo appelmoes. Hoeveel keer 200 gram is een kilo?",opts:["2 keer","5 keer","10 keer"],right:1,
      ok:"Goed. Reken nu de twee stappen uit.",no:"1 kilo = 1000 gram.",onDone:unlock})});
  rekenOpen(ans,{id,pts:2,veld:["maximaal in appelmoes","mg per kg",v=>Math.abs(v-0.6)<1e-9,"0,12 mg in 0,2 kg = 0,6 mg per kg appelmoes"],
    checks:["Berekening: de peuter mag per dag <b>0,01 × 12 = 0,12 mg</b> binnenkrijgen."],
    model:"De peuter mag per dag 0,01 × 12 = 0,12 mg van het middel binnenkrijgen. Die 0,12 mg zit dan in 200 gram = 0,2 kg appelmoes. In een kilo appelmoes mag dus maximaal 0,12 : 0,2 = 0,6 mg zitten.",
    valkuil:"0,12 mg per kg is de hoeveelheid per dag, niet per kilo appelmoes. En vergeet niet eerst met het lichaamsgewicht te vermenigvuldigen (0,01 : 0,2 = 0,05 is fout).",
    after:()=>waaromBtn(ans,textBox("Stap 1: wat mag de peuter per dag? ADI × lichaamsgewicht = 0,01 × 12 = <b>0,12 mg</b>.<br>Stap 2: die 0,12 mg mag in de 200 gram appelmoes van die dag zitten. Een kilo is vijf keer zoveel appelmoes, dus 5 × 0,12 = <b>0,6 mg per kg</b> (of 0,12 : 0,2)."))});
  q.append(think,ans);
},STOF_ADI)];
opgave("Te veel, en het blijft","Te veel, en het blijft","",ids);
}
