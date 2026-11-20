/* ===== Opgave 9 (alleen havo): DNA veranderen (KG07) ===== */
if(!VWO){
const STOF_TECH={titel:"Vier technieken",html:`
<p>Met DNA kun je vier dingen doen: het <b>lezen</b> (de basenvolgorde bepalen), het <b>knippen</b> op een gekozen plek, één stuk heel vaak <b>kopiëren</b>, en stukken <b>sorteren</b> op lengte. Bij elke handeling hoort een eigen techniek.</p>
<p>Vaak gebruik je ze samen: eerst kopiëren, dan sorteren of lezen.</p>`,films:[F.lees,F.heb]};
const R=["1 DNA letter voor letter lezen, met gekleurde nucleotiden die de keten stoppen","2 op één gekozen plek in het DNA knippen","3 één stuk DNA heel vaak kopiëren, met de temperatuur als schakelaar","4 stukken DNA sorteren op lengte"];
const O=["A CRISPR","B gelelektroforese","C PCR","D sequencen"];
const ids=[vraag(2,"technieken koppelen",(q,id)=>{
  const {think,ans,unlock}=startLos(q,B("Welke techniek hoort bij de beschrijving? Gebruik elke letter één keer.")+"<br><br>"+R.join("<br>")+"<br><br>"+O.join("<br>"));
  chipsStep(think,{q:"Bij welke technieken maakt een polymerase nieuwe DNA-strengen? Kies alles wat klopt.",items:[["CRISPR",0],["gelelektroforese",0],["PCR",1],["sequencen",1]],
    ok:"Goed: twee technieken bouwen DNA, twee niet.",no:"Een gel sorteert alleen; CRISPR knipt.",onDone:unlock});
  selectAnswer(ans,{id,uid:"q"+id,rows:R.map((r,k)=>[r,O,[3,0,2,1][k]]),score:KOPPELSCORE("q"+id),
    after:()=>waaromBtn(ans,textBox("1D sequencen: de gekleurde nucleotiden stoppen de keten, en aan de kleur zie je welke base er stond. 2A CRISPR: Cas9 knipt waar het gids-RNA past. 3C PCR: heet, koeler, warm, en dat steeds opnieuw. 4B gelelektroforese: korte stukken komen verder dan lange."))});
  q.append(think,ans);
},STOF_TECH)];
opgave("DNA veranderen","DNA onderzoeken en veranderen","",ids);
}
