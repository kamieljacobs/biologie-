/* ===== Opgave 5: Katten proeven geen zoet (eigen vragen E1, E6, E3 (havo) / E5 (vwo), E4 uit toetsen-biologie) ===== */
{
const STOF_DEL={titel:"Wat doet een base erbij of eraf?",html:`
<p>Het ribosoom leest het mRNA vanaf het startcodon steeds per <b>drie basen</b>. Bij een <b>substitutie</b> verandert één base: hooguit één codon verandert.</p>
<p>Bij een <b>insertie</b> (base erbij) of <b>deletie</b> (base eraf) verandert het aantal basen. Het ribosoom weet niet dat er iets mist: het blijft gewoon per drie lezen.</p>`+(VWO?`
<p>De indeling in drietallen vanaf het startcodon heet het <b>leesraam</b>.</p>`:"")+`
<p>Een mutatie in het DNA wordt bij replicatie en transcriptie gewoon meegekopieerd: DNA-polymerase en RNA-polymerase volgen de volgorde zoals die is.</p>`,
films:[F.mut,F.eiw]};
const STOF_NIV={titel:"Van molecuul tot organisme",html:`
<p>Een mutatie werkt door op verschillende niveaus. Op <b>molecuulniveau</b> verandert een eiwit (of het ontbreekt). Op <b>celniveau</b> werkt de cel daardoor anders. Op <b>organismeniveau</b> zie je een ander kenmerk of ander gedrag.</p>
<p>Een receptor is een eiwit met een vaste vorm, waarin een signaalstof precies past.</p>`,films:[F.mut,F.eiw]};
const STOF_ERF={titel:"Toeval en erfelijkheid",html:`
<p>Mutaties ontstaan <b>toevallig</b>: door kopieerfouten en door schade, bijvoorbeeld door UV-licht. Of een mutatie handig of schadelijk is, merk je pas achteraf.</p>
<p>Een mutatie in een lichaamscel (huid, lever) gaat niet over op nakomelingen. Een nakomeling ontstaat uit één bevruchte eicel; al zijn cellen komen door mitose uit die ene cel voort.</p>`,films:[F.mut]};
const ids=[];
ids.push(vraag(2,"een deletie van 247 basenparen",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Leg uit dat het eiwit door deze deletie vanaf die plek een heel andere aminozuurvolgorde krijgt, of al snel stopt. Laat met een berekening zien waarom."));
  numStep(think,{uid:"q"+id+"n",q:"Hoeveel basen leest het ribosoom per keer?",right:3,ok:"Ja: één codon.",no:"Denk aan een codon.",
    onDone:()=>choiceStep(think,{q:"Stel dat er precies <b>drie</b> basenparen wegvallen, op de grens van twee codons. Wat gebeurt er met de codons daarna?",opts:["ze blijven hetzelfde: er mist alleen één aminozuur","ze veranderen allemaal"],right:0,
      ok:"Klopt: bij drie basen valt precies één codon weg. Kijk nu of 247 zich net zo gedraagt als 3.",no:"Bij drie basen eraf valt precies één codon weg; de codons erna worden gewoon goed gelezen.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "247 is <b>geen veelvoud van 3</b> (247 : 3 = 82, rest 1)",
    VWO?"het ribosoom leest per drie: vanaf de deletie liggen alle codons verschoven (het <b>leesraam verschuift</b>), zodat er andere aminozuren komen en al snel een stopcodon volgt"
       :"het ribosoom leest per drie: vanaf de deletie liggen <b>alle codons verschoven</b>, zodat er andere aminozuren komen en al snel een stopcodon volgt"],
    model:"247 : 3 = 82, rest 1. Er vallen dus 82 hele codons weg plus één base. Het ribosoom blijft per drie lezen, dus vanaf de deletie zijn alle codons verschoven met één base. Daardoor komen er andere aminozuren in de keten, en al snel komt er toevallig een stopcodon.",
    valkuil:"Alleen ‘er ontbreken aminozuren’: 0 punten voor het tweede punt. Dat geldt alleen als het aantal basen een veelvoud van 3 is.",
    after:()=>waaromBtn(ans,b=>{const S0="AUGCUGUGCGUCAAACUAAUGCGA",K=7,S=S0.slice(0,18),D=(S0.slice(0,K)+S0.slice(K+1)).slice(0,18);
      const cod=x=>x.match(/.{1,3}/g);
      stepAnim(b,[
        {cap:"Een voorbeeld (verzonnen stukje mRNA): het ribosoom leest per drie.",m:0},
        {cap:"Er valt één base weg (rood). 247 basen = 82 codons + 1 base: hier gebeurt hetzelfde als bij één base.",m:1},
        {cap:"Het ribosoom leest gewoon verder per drie. Alle codons na de deletie zijn verschoven: andere aminozuren, en al snel een stopcodon."+(VWO?" Het leesraam is verschoven.":""),m:2}],
        (st,s)=>{let h="";const rij=(seq,y,mark)=>{let x=6;cod(seq).forEach((c,i)=>{const a=c.length===3?vertaal(c):"",stop=a==="*";
            h+=`<rect x="${x}" y="${y}" width="58" height="30" rx="5" fill="${stop?"var(--koraal-soft)":"none"}" stroke="var(--text2)"/>`;
            [...c].forEach((ch,j)=>{const g=i*3+j,del=mark&&g===K;h+=`<text x="${x+11+j*18}" y="${y+21}" text-anchor="middle" class="lbl" style="font-size:16px;${del?"fill:var(--koraal);text-decoration:line-through":""}">${ch}</text>`;});
            if(a)h+=`<text x="${x+29}" y="${y+48}" text-anchor="middle" class="lblm" style="font-size:11.5px">${stop?"STOP":AZ[a].split(" ")[0]}</text>`;x+=62;});};
          if(s.m<2)rij(S,10,s.m===1);else{rij(S,10,true);rij(D,80,false);}
          st.innerHTML=svgWrap(`0 0 380 ${s.m<2?66:136}`,h,"mRNA voor en na een deletie");});})});
  q.append(think,ans);
},STOF_DEL));

ids.push(vraag(1,"bij welke stap gaat het mis?",(q,id)=>{
  const O=["Bij de replicatie: het DNA met de deletie kan niet meer worden gekopieerd.","Bij de translatie: het ribosoom leest vanaf de deletie andere codons.","Bij de transcriptie: RNA-polymerase kan een gen met een deletie niet overschrijven.","Pas bij het vouwen: de aminozuurvolgorde klopt nog, maar de keten vouwt anders."];
  const {think,ans,unlock}=startLos(q,B("De deletie zit in het DNA van het gen <i>Tas1r2</i>. Bij welke stap gaat het voor het eerst mis met het eiwit?")+"<br><br>"+L4(...O));
  choiceStep(think,{q:"Zet de stappen van gen naar eiwit op een rij. Wat is de goede volgorde?",opts:["translatie → transcriptie → vouwen","transcriptie → translatie → vouwen","vouwen → transcriptie → translatie"],right:1,
    ok:"Ja. Bedenk bij elke stap: werkt het enzym of het ribosoom gewoon met de volgorde die er ligt?",no:"Eerst wordt het gen overgeschreven naar mRNA, dan wordt het mRNA vertaald.",
    onDone:()=>choiceStep(think,{q:"RNA-polymerase schrijft een gen over. Wat staat er in het mRNA als er in het gen een stuk mist?",opts:["het mRNA heeft hetzelfde stuk niet","het mRNA vult het missende stuk aan"],right:0,
      ok:"Goed. Kies nu de stap waar het eiwit voor het eerst anders wordt.",no:"RNA-polymerase kent de ‘goede’ volgorde niet; het volgt de matrijs.",onDone:unlock})});
  mc(ans,{qid:id,pts:1,right:1,opts:O,onChecked:()=>waaromBtn(ans,textBox("<b>B</b>. Het DNA wordt gewoon gekopieerd en overgeschreven: het mRNA bevat dezelfde deletie. Pas het ribosoom leest vanaf daar andere codons. A en C: de enzymen kopiëren de volgorde zoals die is, ook met een deletie. D: de aminozuurvolgorde is al veranderd door de verschoven codons."))});
  q.append(think,ans);
},STOF_DEL));

if(!VWO){
ids.push(vraag(2,"molecuul, cel en organisme",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Leg uit hoe de deletie in het DNA ertoe leidt dat een kat geen voorkeur heeft voor zoet voer. Gebruik in je uitleg het molecuulniveau, het celniveau en het organismeniveau."));
  selectsStep(think,{uid:"q"+id,q:"Bij welk niveau hoort elk voorbeeld? (Een ander voorbeeld dan de kat.)",rows:[["een enzym in de lever heeft een andere vorm",["molecuul","cel","organisme"],0],["levercellen breken een stof niet meer af",["molecuul","cel","organisme"],1],["de persoon wordt ziek van die stof",["molecuul","cel","organisme"],2]],
    ok:"Goed. Doe nu hetzelfde voor de kat: eiwit → smaakcel → kat.",no:"Molecuul = één stof (zoals een eiwit), cel = wat een cel doet, organisme = het hele dier.",
    onDone:()=>choiceStep(think,{q:"Waar zit de zoetreceptor?",opts:["in de maag","op smaakcellen in de tong","in de hersenen"],right:1,
      ok:"Ja, dat staat in de inleiding. Schrijf nu je uitleg.",no:"Lees de eerste zin van de inleiding.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "molecuul: er wordt geen (werkend) Tas1r2-eiwit gemaakt, dus de <b>zoetreceptor</b> heeft niet de goede vorm / ontbreekt",
    "cel en organisme: de <b>smaakcellen</b> reageren niet op suiker, dus de <b>kat</b> proeft geen zoet en kiest niet voor zoet voer"],
    model:"Molecuul: door de deletie wordt er geen werkend Tas1r2-eiwit gemaakt, dus de zoetreceptor ontbreekt of heeft niet de goede vorm. Cel: suiker past niet in een receptor, dus de smaakcellen reageren niet op suiker. Organisme: de kat proeft geen zoet en heeft dus geen voorkeur voor zoet voer.",
    after:()=>waaromBtn(ans,textBox("<b>DNA</b> (deletie) → <b>eiwit</b> Tas1r2 ontbreekt → <b>zoetreceptor</b> werkt niet (molecuul) → <b>smaakcel</b> geeft geen signaal bij suiker (cel) → <b>kat</b> proeft geen zoet en kiest er niet voor (organisme)."))});
  q.append(think,ans);
},STOF_NIV));
}else{
ids.push(vraag(2,"een substitutie in de matrijsstreng",(q,id)=>{
  const {think,ans,unlock}=startLos(q,"Bij een ander zoogdier is in hetzelfde exon geen deletie, maar een substitutie gevonden. Van de matrijsstreng is dit stukje gegeven (fictief):<br><br>"+SEQ("5'-C C A A G T-3'")+"<br><br>De codons van het mRNA beginnen precies aan het 5'-uiteinde van het stukje mRNA dat hierbij hoort. Door de substitutie wordt de C aan het 5'-uiteinde van de matrijsstreng een T.<br><br>"+B("Gebruik de codontabel. Leg uit wat het gevolg is voor het eiwit."),CODONTABEL());
  choiceStep(think,{q:"Het mRNA is antiparallel aan de matrijsstreng. Waar ligt dan het 5'-uiteinde van het mRNA?",opts:["tegenover het 5'-uiteinde van de matrijsstreng","tegenover het 3'-uiteinde van de matrijsstreng"],right:1,
    ok:"Ja. Schrijf het mRNA dus eerst onder de matrijsstreng (3' ↔ 5'), en lees het daarna van 5' naar 3'.",no:"Antiparallel: 5' ligt tegenover 3'.",
    onDone:()=>selectsStep(think,{uid:"q"+id,q:"Welke base komt in het mRNA tegenover …",rows:[["C",["A","U","C","G"],3],["A",["A","U","C","G"],1],["G",["A","U","C","G"],2],["T",["A","U","C","G"],0]],
      ok:"Goed. Schrijf nu het mRNA voor en na de mutatie op en zoek de codons op.",no:"In RNA staat U tegenover A.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "het mRNA is "+SEQ("5'-A C U U G G-3'")+": ACU (threonine) en UGG (tryptofaan)",
    "na de mutatie wordt het tweede codon <b>UGA</b>, een <b>stopcodon</b>: het eiwit is te kort (en werkt meestal niet)"],
    model:"Het mRNA tegenover 5'-CCAAGT-3' is 5'-ACUUGG-3': ACU (threonine) en UGG (tryptofaan). De C aan het 5'-uiteinde van de matrijs ligt tegenover de laatste base van het mRNA. Wordt die C een T, dan wordt die G in het mRNA een A: UGG wordt UGA, een stopcodon. Het eiwit stopt hier dus te vroeg en werkt meestal niet.",
    valkuil:"Het mRNA in de verkeerde richting gelezen (GGU UCA …): 0 punten voor het eerste punt; het tweede kan nog goed zijn als je uitlegt dat de veranderde base in het laatste codon zit.",
    after:()=>waaromBtn(ans,textBox("Matrijs &nbsp;5'-C C A A G T-3'<br>mRNA &nbsp;&nbsp;&nbsp;3'-G G U U C A-5' &nbsp;→ van 5' naar 3': <b>ACU UGG</b> (threonine, tryptofaan)<br>Na de mutatie: matrijs 5'-<b>T</b> C A A G T-3' → mRNA 5'-ACU UG<b>A</b>-3': <b>UGA = stop</b>. De base aan het 5'-uiteinde van de matrijs hoort bij het láátste codon van het mRNA."))});
  q.append(think,ans);
},Object.assign({},STOF_DEL,{titel:"Matrijsstreng lezen",html:`<p>Het mRNA is complementair en <b>antiparallel</b> aan de matrijsstreng, met U in plaats van T. Codons lees je in het mRNA altijd van 5' naar 3'.</p><p>Bij een <b>substitutie</b> verandert één base, dus hooguit één codon. Dat kan een stille mutatie zijn, een ander aminozuur geven, of een stopcodon.</p>`,films:[F.code,F.mut]})));
}

ids.push(vraag(2,"‘ze hadden het niet nodig’",(q,id)=>{
  const {think,ans,unlock}=startLos(q,"Een leerling zegt: “Katten eten alleen vlees. Ze hadden de zoetreceptor niet nodig, en daarom is het gen kapotgegaan.”<br>• "+B("Leg uit wat er niet klopt aan deze redenering.")+"<br>• "+B("De deletie is ooit bij één dier ontstaan. Leg uit hoe hij nu in elke cel van elke jonge kat kan zitten."));
  chipsStep(think,{q:"Waardoor ontstaan mutaties? Kies alles wat klopt.",items:[["kopieerfouten bij de replicatie",1],["schade door UV-licht of andere mutagene factoren",1],["omdat het dier een eigenschap niet meer gebruikt",0]],
    ok:"Goed. Hangt het dan af van wat een dier nodig heeft, wáár een mutatie ontstaat?",no:"Eén keuze is precies de denkfout van de leerling.",
    onDone:()=>choiceStep(think,{q:"Een kuiken heeft een mutatie in alle cellen van zijn lichaam. Waar is die mutatie ontstaan?",opts:["in de huid van het kuiken","in een geslachtscel van een ouder, of heel vroeg in het embryo","in het ei, doordat de moederkip veel in de zon zat"],right:1,
      ok:"Ja (dat vroeg de film ook). Pas dat nu toe op de kat.",no:"Bedenk waaruit alle cellen van een dier voortkomen.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "een mutatie ontstaat <b>toevallig</b>; hij ontstaat niet omdat het dier hem (niet) nodig heeft",
    "de mutatie zat in een <b>geslachtscel</b> (eicel of zaadcel) en werd doorgegeven; een jonge kat ontstaat uit <b>één bevruchte eicel</b>, dus de mutatie zit in al zijn cellen"],
    model:"Mutaties ontstaan toevallig, niet omdat een dier een eiwit niet meer nodig heeft. De deletie ontstond ooit in een eicel of zaadcel van één kat en werd doorgegeven. Een jonge kat ontstaat uit één bevruchte eicel; door mitose zit de deletie dan in al zijn cellen.",
    valkuil:"Alleen ‘katten hebben het geërfd’ zonder geslachtscel of bevruchte eicel: 0 punten voor het tweede punt.",
    after:()=>waaromBtn(ans,textBox("Volgorde: eerst ontstaat <b>toevallig</b> een mutatie, pas daarna blijkt of hij schaadt. Voor een vleeseter maakte het verlies van de zoetreceptor weinig uit, dus het allel kon blijven bestaan; maar het ontstond niet ‘omdat’ het niet nodig was. Erfelijk wordt een mutatie alleen via een <b>geslachtscel</b>: de bevruchte eicel geeft hem door mitose door aan elke lichaamscel."))});
  q.append(think,ans);
},STOF_ERF));

opgave("Katten","Katten proeven geen zoet",`
<p>Je proeft zoet met een receptor op smaakcellen in je tong. Die receptor bestaat uit twee eiwitten. Eén daarvan wordt gecodeerd door het gen <i>Tas1r2</i>.</p>
<p>Katten eten vrijwel alleen vlees, en ze reageren niet op suiker. Onderzoekers vonden de oorzaak: bij katten ontbreken ${VWO?"in een exon van":"in"} het gen <i>Tas1r2</i> 247 basenparen. Katten maken van dit gen geen werkend eiwit.</p>`,ids);
}
