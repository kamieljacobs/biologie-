/*@@ALLEEN-VWO@@*/
/* ===== Opgave 7 (alleen vwo): Toeval en uitwisseling (EI-evolutie-D07) ===== */
if(VWO){
const q1=vraag(2,"heterozygotenvoordeel bij sikkelcelanemie",(q,id)=>{
  pre(q,"<p>Kinderen met twee sikkelcelallelen worden zonder behandeling vaak niet oud. Toch komt het sikkelcelallel in gebieden met veel malaria veel voor.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit hoe heterozygotenvoordeel ervoor zorgt dat het sikkelcelallel daar in de populatie blijft."));
  choiceStep(think,{q:"Wie is een heterozygoot voor het sikkelcelallel?",opts:["iemand met één sikkelcelallel en één normaal allel","iemand met twee sikkelcelallelen","iemand zonder sikkelcelallel"],right:0,
    ok:"Ja: een drager. Er zijn dus drie groepen: twee normale allelen, drager, en twee sikkelcelallelen.",no:"Hetero betekent: twee verschillende allelen.",
    onDone:()=>choiceStep(think,{q:"Wat betekent ‘voordeel’ als het over evolutie gaat?",opts:["meer kans om te overleven en jongen te krijgen","sterker of groter zijn dan anderen"],right:0,
      ok:"Goed. Vergelijk nu de drie groepen in een gebied met veel malaria: wie overleeft het best, en wat gebeurt er dan met de allelen?",no:"Denk aan fitness.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "<b>dragers</b> (heterozygoten) krijgen veel minder vaak ernstige <b>malaria</b> dan mensen zonder sikkelcelallel, en worden niet ziek van sikkelcelanemie",
    "daardoor <b>overleven dragers het best</b> en geven ze het allel door; selectie houdt zo <b>beide allelen</b> in de populatie"],
    model:"Dragers hebben één sikkelcelallel en één normaal allel. Zij krijgen veel minder vaak ernstige malaria dan mensen met twee normale allelen, en ze worden niet ziek van sikkelcelanemie. In een malariagebied overleven dragers dus het best en krijgen ze de meeste kinderen. Zo geven ze steeds weer het sikkelcelallel door, en houdt selectie beide allelen in de populatie.",
    after:()=>waaromBtn(ans,textBox("Selectie werkt hier van twee kanten. Mensen met <b>twee sikkelcelallelen</b> overleven vaak niet: dat haalt sikkelcelallelen uit de pot. Mensen met <b>twee normale allelen</b> sterven vaker aan malaria: dat haalt normale allelen uit de pot. De <b>dragers</b> doen het in een malariagebied het best, en zij geven aan hun kinderen allebei de allelen door. Daardoor verdwijnt het sikkelcelallel niet. Waar geen malaria is, valt het voordeel weg en wordt het allel zeldzamer."))});
  q.append(think,ans);
},TERUG("Heterozygotenvoordeel",F.e5,"Hardy-Weinberg en heterozygotenvoordeel"));
opgave("Toeval","Toeval en uitwisseling","",[q1]);
}
