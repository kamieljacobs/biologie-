/* ===== Opgave 8: Supplementen en claims (K704; film 7, ook film 6) ===== */
{
const STOF_PROEF={titel:"Hoe sterk is een claim?",html:`
<p>Een claim is een bewering, bijvoorbeeld dat een supplement je minder vaak ziek maakt. Eén persoon of één verhaal zegt daarover weinig: misschien was het ook zonder het supplement zo gegaan.</p>
<p>Hoe meer goede onderzoeken hetzelfde vinden, hoe sterker het bewijs. In de films sorteer je claims op een bewijsbord met de vakken vastgesteld, waarschijnlijk, hypothese en weerlegd.</p>`,
films:[F.supp,F.bact]};

const ids=[vraag(2,"echt maar klein, weerlegd of hypothese",(q,id)=>{
  const {think,ans,unlock}=start(q,B("a Leg met het voorbeeld van vitamine C en verkoudheid uit wat het betekent dat een effect “echt, maar klein” is.<br>b Leg uit wat het verschil is tussen een claim op “weerlegd” en een claim op “hypothese”."));
  choiceStep(think,{q:"Wanneer noem je een effect ‘echt’?",opts:["als het in veel goede onderzoeken terugkomt","als één persoon het duidelijk merkt","als het verschil groot is"],right:0,
    ok:"Ja. ‘Klein’ gaat dan over hoeveel het scheelt. Wat scheelde vitamine C bij verkoudheid?",no:"Eén persoon zegt niets, en ook een klein verschil kan echt zijn.",
    onDone:()=>choiceStep(think,{q:"Wat is het verschil tussen een proefgroep en een controlegroep?",opts:["de controlegroep krijgt het middel niet, maar een placebo","de controlegroep bestaat uit de onderzoekers","de controlegroep krijgt een hogere dosis"],right:0,
      ok:"Goed. Bedenk bij b of een claim al met zo'n controlegroep getest is, en wat eruit kwam.",no:"Met een controlegroep vergelijk je: wat gebeurt er zónder het middel?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "a: wie elke dag vitamine C slikt, wordt <b>niet minder vaak verkouden</b>, maar een verkoudheid duurt gemiddeld <b>iets (een halve dag) korter</b>: het effect komt in veel onderzoeken terug, maar het scheelt weinig.",
    "b: <b>weerlegd</b>: goed getest met een controlegroep en het klopt niet; <b>hypothese</b>: nog niet (goed) getest met een controlegroep."],
    model:"a In veel onderzoeken met samen ruim tienduizend mensen werd wie elke dag vitamine C slikte niet minder vaak verkouden, maar duurde een verkoudheid gemiddeld een halve dag korter. Het effect komt steeds terug, dus het is echt, maar een halve dag scheelt weinig: klein. b Een claim op ‘weerlegd’ is goed getest met een controlegroep, en bleek niet te kloppen. Een claim op ‘hypothese’ is nog niet (goed) met een controlegroep getest: of hij klopt, weet je nog niet."});
  q.append(think,ans);
},STOF_PROEF)];

opgave("Supplementen en claims","Supplementen en claims","",ids);
}
