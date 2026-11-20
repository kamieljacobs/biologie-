/* ===== Opgave 5: Waarom helpen dieren elkaar? (EI-gedrag-KJ01) ===== */
{
const STOF={titel:"Natuurlijke selectie en helpen",html:`
<p><b>Natuurlijke selectie</b> bevoordeelt dieren die zelf veel nakomelingen krijgen. Hun genen komen in de volgende generatie vaker voor.</p>
<p>Toch helpen dieren elkaar vaak. Biologen kennen twee belangrijke verklaringen:</p>
<ul style="margin:0;padding-left:20px"><li><b>Verwantschapsselectie</b>: wie familie helpt, helpt ook een deel van zijn eigen genen verder. Hoe nauwer verwant, hoe meer helpen loont.</li>
<li><b>Wederkerig altruïsme</b>: ik help jou nu, jij helpt mij later, zoals bij vampiervleermuizen die bloed delen.</li></ul>`,
films:[F.help]};
const q1=vraag(2,"de grondeekhoorn slaat alarm",(q,id)=>{
  const {think,ans,unlock}=start(q,"Een grondeekhoorn slaat alarm als er een wezel aankomt, en valt daardoor zelf meer op. "+B("Leg uit waarom dit gedrag altruïsme heet; gebruik het begrip fitness. Leg ook uit waarom ‘ze doet het voor het voortbestaan van de soort’ geen goede verklaring is."));
  choiceStep(think,{q:"Wat betekent <b>fitness</b> in de biologie?",opts:["hoe sterk en sportief een dier is","je kans om te overleven en nakomelingen te krijgen","hoe snel een dier kan vluchten"],right:1,
    ok:"Ja. Wat doet het alarm met de fitness van de roeper, en met die van de anderen?",no:"Het gaat niet om conditie. Waar draait natuurlijke selectie om?",
    onDone:()=>choiceStep(think,{q:"Natuurlijke selectie werkt doordat sommige dieren meer nakomelingen krijgen dan andere. Tussen wie vindt die selectie plaats?",opts:["tussen soorten: de soort die het best samenwerkt, blijft bestaan","tussen individuen: wie meer nakomelingen krijgt, geeft vaker zijn genen door"],right:1,
      ok:"Goed. Bedenk nu wat er over vele generaties zou gebeuren in een groep met eekhoorns die wel en die nooit alarm slaan.",no:"Een soort krijgt geen jongen; een eekhoorn wel.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Altruïsme: het gedrag <b>kost de helper fitness</b> (kans om te overleven en jongen te krijgen) en <b>levert anderen fitness op</b>.",
    "Eekhoorns die nooit alarm slaan, lopen minder risico en krijgen meer jongen, dus hun genen worden elke generatie vaker; selectie werkt via <b>individuen en hun genen</b>, niet ‘voor de soort’."],
    model:"Fitness is de kans om te overleven en nakomelingen te krijgen. De roeper valt op en wordt vaker door de wezel achtervolgd: het alarm kost haar fitness. De andere eekhoorns kunnen vluchten en winnen dus fitness. Gedrag dat de helper fitness kost en een ander fitness oplevert, heet altruïsme. ‘Voor de soort’ klopt niet: eekhoorns die nooit alarm slaan, lopen minder risico en krijgen gemiddeld meer jongen. Hun genen worden elke generatie vaker. Selectie werkt via individuen en hun genen, niet voor de soort.",
    valkuil:"Alleen ‘ze helpt anderen’ is geen altruïsme in biologische zin: noem dat het de helper zelf fitness kost.",
    after:()=>waaromBtn(ans,textBox("Altruïsme gaat altijd over twee kanten: <b>kosten</b> voor de helper en <b>winst</b> voor de ander, allebei in fitness. ‘Voor de soort’ werkt niet, omdat selectie tussen individuen plaatsvindt: dieren die niet helpen, zouden steeds talrijker worden. Dat helpen toch blijft, vraagt dus om een andere verklaring, zoals familie in de buurt (verwantschapsselectie)."))});
  q.append(think,ans);
},STOF);
opgave("Helpen","Waarom helpen dieren elkaar?","",[q1]);
}
