/* ===== Opgave 5: Fotosynthese en de plant (kennis; EI-stofwisseling-M01, M11, M02; havo en vwo gelijk) ===== */
{
const STOF_MASSA={titel:"Massa volgen: atomen tellen",html:`
<p>Massa verdwijnt niet en ontstaat niet uit het niets. Wordt een plant zwaarder, dan zijn die atomen ergens vandaan gekomen: uit de bodem, uit het water of uit de lucht.</p>
<p>De <b>droge massa</b> is wat er overblijft als je al het water eruit haalt. Organische stoffen, zoals glucose en hout, bestaan vooral uit drie soorten atomen: <b>C, H en O</b>. Vraag je dus bij elk soort atoom af waar het vandaan kan komen.</p>`,
films:[F.g]};
const STOF_GRONDSTOF={titel:"Glucose als brandstof en grondstof",html:`
<p>Een plant gebruikt de glucose die hij maakt op twee manieren. Een deel breekt hij af tot CO₂ en water om ATP te maken: <b>dissimilatie</b>, net als bij jou. Glucose is dan brandstof.</p>
<p>De rest is grondstof: <b>voortgezette assimilatie</b>. Van glucose maakt de plant onder andere zetmeel (reservestof), sacharose (transport via de bastvaten), cellulose (bouwstof voor de celwanden) en vet (reservestof).</p>`,
films:[F.g]};
const STOF_NODIG={titel:"Wat heeft fotosynthese nodig?",html:`
<p>Bij fotosynthese maakt een plant glucose uit <b>CO₂</b> en <b>water</b>, met energie uit <b>licht</b>. Dat gebeurt in de chloroplasten (bladgroenkorrels) van de bladcellen.</p>
<p>Elke bladcel met chloroplasten heeft dus licht, CO₂ en water nodig. De bouw van een blad heeft te maken met hoe die drie bij de cellen komen.</p>`,
films:[F.g]};

const q15=vraag(1,"het hout van een eik",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Uit een eikel van een paar gram groeit een eik van vele tonnen. Waar komt het grootste deel van het droge hout vandaan?"));
  choiceStep(think,{q:"Van Helmont kweekte een wilg van ongeveer 2 kg in een pot met afgewogen grond. Na vijf jaar woog de wilg ongeveer 75 kg; de grond was maar zo'n 60 gram lichter. Wat zegt dat?",opts:["de grond levert bijna niets van de massa","de grond levert het grootste deel"],right:0,
    ok:"Ja. Hout bestaat vooral uit C-, H- en O-atomen. Waar kunnen de C-atomen vandaan komen?",no:"Vergelijk 73 kg erbij met 60 gram eraf.",
    onDone:()=>choiceStep(think,{q:"Waar komen de C-atomen van de glucose in een plant vandaan?",opts:["uit CO₂","uit water","uit de mineralen"],right:0,
      ok:"Goed. Water (H₂O) bevat geen C. Kies nu je antwoord.",no:"Welke van deze stoffen bevat C-atomen?",onDone:unlock})});
  mc(ans,{qid:id,pts:1,right:1,opts:["uit mineralen uit de bodem","uit CO₂ uit de lucht","uit het water dat de wortels opnemen","uit de glucose die de wortels uit de bodem opnemen"],
    onChecked:()=>waaromBtn(ans,textBox("<b>B</b>: de C- en O-atomen, samen ruim negentig procent van de massa van glucose, komen uit CO₂. Uit de bodem komen alleen water en een klein beetje mineralen (A, C). Glucose neemt een plant niet op uit de bodem: die maakt hij zelf (D)."))});
  q.append(think,ans);
},STOF_MASSA);

const q16=vraag(2,"juist of onjuist: glucose in de plant",(q,id)=>{
  pre(q,"<p>Hieronder staan 5 uitspraken.</p>");
  q.append(el("p",{class:"qtext"},"1 Fotosynthese is precies het omgekeerde van dissimilatie: dezelfde enzymen, dezelfde plek.<br>2 Overdag maakt de chloroplast van glucose zetmeel.<br>3 Wortels hebben geen chloroplasten en halen hun ATP uit dissimilatie.<br>4 Zetmeel lost goed op in water.<br>5 Een eikel zit vooral vol vet.<br><br><b>Geef bij elke uitspraak aan of hij juist of onjuist is.</b>"));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  selectsStep(think,{uid:"q"+id,q:"Waar in een plantencel gebeurt het?",rows:[
    ["fotosynthese",["in de chloroplasten","in het grondplasma en de mitochondriën"],0],["dissimilatie",["in de chloroplasten","in het grondplasma en de mitochondriën"],1]],
    ok:"Goed. Bedenk bij uitspraak 4: wat moet een reservestof kunnen, zonder weg te stromen of de cel te verstoren?",no:"Fotosynthese gebeurt in de bladgroenkorrels. Waar breekt jouw lichaam glucose af?",onDone:unlock});
  juistOnjuist(ans,{id,stm:["fotosynthese is precies het omgekeerde van dissimilatie","overdag maakt de chloroplast zetmeel","wortels halen hun ATP uit dissimilatie","zetmeel lost goed op in water","een eikel zit vooral vol vet"],key:[false,true,true,false,false],
    uitleg:textBox("1 <b>onjuist</b>: de totaalreactie lijkt omgekeerd, maar het zijn andere enzymen, een andere plek, en de energie komt uit licht.<br>2 <b>juist</b>.<br>3 <b>juist</b>: wortels hebben geen chloroplasten; 's nachts maakt ook een blad geen ATP met licht.<br>4 <b>onjuist</b>: zetmeel lost niet op; daarom is het een goede reservestof.<br>5 <b>onjuist</b>: een eikel zit vol zetmeel, een zonnebloempit vooral vol vet.")});
  q.append(think,ans);
},STOF_GRONDSTOF);

const q17=vraag(2,"de bouw van een blad",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Noem twee kenmerken van de bouw van een blad en leg bij elk uit hoe het de fotosynthese helpt."));
  chipsStep(think,{q:"Wat heeft een bladcel nodig voor fotosynthese? Kies alles wat klopt.",items:[["licht",1],["CO₂",1],["water",1],["zuurstof",0]],
    ok:"Goed. Bedenk nu bij een kenmerk van het blad (de vorm, de dikte, de openingen, wat er tussen de cellen zit, de vaten) welke van deze drie het helpt.",no:"Zuurstof is een product van de fotosynthese, geen grondstof.",onDone:unlock});
  openAnswer(ans,{id,pts:2,checks:[
    "<b>Eerste kenmerk met de juiste uitleg</b>, bijvoorbeeld: plat: vangt veel licht · dun: licht en CO₂ komen bij elke cel · huidmondjes: CO₂ komt het blad in · veel lucht tussen de cellen: CO₂ komt makkelijk bij elke cel · vaten: water komt uit de wortels.",
    "<b>Tweede, ander kenmerk</b> uit dat rijtje, met de juiste uitleg."],
    model:"Een blad is plat, zodat het veel licht vangt. En een blad heeft huidmondjes, kleine openingen waardoor CO₂ het blad in komt. (Ook goed: dun, zodat licht en CO₂ bij elke cel komen; veel lucht tussen de cellen; vaten die water uit de wortels aanvoeren.)",
    valkuil:"Alleen een kenmerk noemen zonder uitleg (‘een blad is plat’) of alleen een uitleg zonder kenmerk: 0 punten voor dat kenmerk. ‘Een blad is groen’ is geen kenmerk van de bouw.",
    after:()=>waaromBtn(ans,textBox("Vijf kenmerken uit de film, telkens met wat ze aanvoeren:<br>· <b>plat</b> → veel licht<br>· <b>dun</b> → licht en CO₂ bij elke cel<br>· <b>huidmondjes</b> → CO₂ het blad in<br>· <b>veel lucht tussen de cellen</b> → CO₂ makkelijk bij elke cel<br>· <b>vaten</b> → water uit de wortels<br>Per kenmerk mét uitleg 1 punt, maximaal 2 punten."))});
  q.append(think,ans);
},STOF_NODIG);

opgave("Plant","Fotosynthese en de plant","",[q15,q16,q17]);
}
