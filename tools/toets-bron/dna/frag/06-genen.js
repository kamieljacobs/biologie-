/* ===== Opgave 6 (alleen havo): Genen aan en uit (KE02, KE07, KE14) ===== */
if(!VWO){
const STOF_AAN={titel:"Zelfde DNA, andere cel",html:`
<p>Bijna elke cel in je lichaam heeft hetzelfde DNA. Toch is een huidcel iets anders dan een levercel. Het verschil zit in welke genen <b>aan</b> staan en welke <b>uit</b>: de <b>genexpressie</b>.</p>
<p><b>Stamcellen</b> zijn cellen die nog niet gespecialiseerd zijn. Het gespecialiseerd raken van een cel, doordat andere genen aan en uit gaan, heet <b>celdifferentiatie</b>.</p>
<p>Bij de ontwikkeling van een embryo wordt niet alleen geregeld wélk soort cel er ontstaat, maar ook waar cellen bij komen en waar er cellen verdwijnen.</p>`,films:[F.aan]};
const ids=[];
ids.push(vraag(1,"rups en vlinder: ander genotype?",(q,id)=>{
  const {think,ans,unlock}=start(q,"Een rups verandert in een vlinder. "+B("Verandert daarbij het genotype van het dier? Leg je antwoord uit."));
  choiceStep(think,{q:"Wat is het genotype?",opts:["de genen (allelen) die een organisme heeft","de kenmerken die je ziet"],right:0,
    ok:"Ja. De kenmerken die je ziet, zijn het fenotype.",no:"Wat je ziet, heet het fenotype.",
    onDone:()=>choiceStep(think,{q:"Een huidcel en een levercel van dezelfde persoon: hebben ze dezelfde genen?",opts:["ja","nee"],right:0,
      ok:"Goed. Waarom zien ze er dan zo verschillend uit? Pas dat toe op de rups.",no:"Bijna elke cel heeft hetzelfde DNA.",onDone:unlock})});
  openAnswer(ans,{id,pts:1,checks:["<b>Nee</b>: de cellen raken geen genen kwijt en krijgen er geen bij; alleen de <b>genexpressie</b> verandert (andere genen gaan aan en uit)"],
    model:"Nee. Het dier houdt dezelfde genen: er komen geen genen bij en er gaan er geen weg. Er gaan alleen andere genen aan en uit; de genexpressie verandert, en daardoor het fenotype.",
    valkuil:"Alleen ‘nee’ zonder uitleg: 0 punten.",
    after:()=>waaromBtn(ans,textBox("Genotype = welke genen je hebt; dat blijft gelijk. Fenotype = hoe je eruitziet; dat verandert enorm. De brug ertussen is de <b>genexpressie</b>: in de pop gaan andere genen aan, zodat er vleugels en andere monddelen ontstaan."))});
  q.append(think,ans);
},STOF_AAN));

ids.push(vraag(1,"vliezen tussen de vingers",(q,id)=>{
  const O=["Doordat de cellen in de vliezen een signaal krijgen om zichzelf op te ruimen.","Doordat de cellen in de vliezen hun genen kwijtraken.","Doordat de cellen in de vliezen door een mutatie niet meer kunnen delen.","Doordat de cellen in de vliezen naar de vingers toe groeien."];
  const {think,ans,unlock}=startLos(q,B("Hoe verdwijnen de vliezen tussen de vingers van een embryo?")+"<br><br>"+L4(...O));
  choiceStep(think,{q:"Verdwijnen de vliezen bij bijna elk embryo van de mens?",opts:["ja, het hoort bij de normale ontwikkeling","nee, alleen als er iets misgaat"],right:0,
    ok:"Ja. Bedenk bij elke keuze of hij past bij iets dat bij elk embryo op dezelfde manier gebeurt.",no:"Bij bijna iedereen zijn de vingers bij de geboorte los.",onDone:unlock});
  mc(ans,{qid:id,pts:1,right:0,opts:O,onChecked:()=>waaromBtn(ans,textBox("<b>A</b>: apoptose. De cellen krijgen een signaal en ruimen zichzelf netjes op. B: cellen raken geen genen kwijt. C: het is geen mutatie, het hoort bij de normale ontwikkeling. D: de cellen verdwijnen echt."))});
  q.append(think,ans);
},STOF_AAN));

ids.push(vraag(2,"juist of onjuist: stamcellen",(q,id)=>{
  q.append(el("p",{class:"qtext"},"Over stamcellen en celdifferentiatie staan hieronder vier uitspraken.<br><br>1 Een stamcel kan zichzelf blijven delen en zich ontwikkelen tot een gespecialiseerde cel.<br>2 Volwassen stamcellen vind je alleen in een embryo.<br>3 Een gespecialiseerde cel is de genen kwijtgeraakt die ze niet meer gebruikt.<br>4 Apoptose hoort bij de normale ontwikkeling van een embryo.<br><br><b>Geef bij elke uitspraak aan of hij juist of onjuist is.</b>"));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  choiceStep(think,{q:"Wat bepaalt of een cel een huidcel of een levercel wordt?",opts:["welke genen ze heeft","welke genen er aan en uit staan"],right:1,
    ok:"Ja. Lees nu elke uitspraak precies: één woord kan hem onjuist maken.",no:"Bijna elke cel heeft dezelfde genen.",onDone:unlock});
  juistOnjuist(ans,{id,stm:["een stamcel deelt en kan zich specialiseren","volwassen stamcellen alleen in een embryo","een gespecialiseerde cel is genen kwijtgeraakt","apoptose hoort bij de normale ontwikkeling"],key:[true,false,false,true],
    uitleg:textBox("1 <b>juist</b>: dat zijn precies de twee eigenschappen van een stamcel.<br>2 <b>onjuist</b>: volwassen stamcellen zitten bijvoorbeeld in het beenmerg; in een embryo zitten embryonale stamcellen.<br>3 <b>onjuist</b>: alle genen zitten er nog, ze staan uit (op slot).<br>4 <b>juist</b>: bijvoorbeeld bij het verdwijnen van de vliezen tussen de vingers.")});
  q.append(think,ans);
},STOF_AAN));
opgave("Genen aan en uit","Genen aan en uit","",ids);
}
