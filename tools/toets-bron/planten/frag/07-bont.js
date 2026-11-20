/* ===== Opgave 7: Bonte bladeren (EI-planten-F01, F02, F03 uit toetsen-biologie) ===== */
{
const STOF_JODIUM={titel:"Zetmeel aantonen met jodium",html:`
<p>Met <b>jodium</b> (joodoplossing) toon je <b>zetmeel</b> aan: waar zetmeel zit, kleurt het blauwzwart. Glucose of sacharose kleuren niet.</p>
<p>Een blad dat lang in het donker heeft gestaan, bevat bijna geen zetmeel meer: 's nachts breekt de plant zijn zetmeel weer af. Wil je weten waar een blad <i>vandaag</i> zetmeel heeft gemaakt, dan zet je de plant dus eerst een nacht in het donker.</p>
<p>In de film wordt een deel van een blad afgedekt met aluminiumfolie. Zo vergelijk je twee delen van hetzelfde blad, die maar in één ding verschillen.</p>`,
films:[F.groen]};
const STOF_PUT={titel:"Bron en put",html:`
<p>In de drukstroomtheorie heet een plek die suiker in het zeefvat pompt een <b>bron</b>, en een plek waar suiker uit het zeefvat wordt gehaald een <b>put</b>. Welke plek bron of put is, hangt af van wat er op dat moment gebeurt: een wortel is in de zomer een put en kan in het voorjaar een bron zijn.</p>
<p>Diffusie gaat alleen snel over heel korte afstanden (een paar cellen). Over grotere afstanden is er transport door vaten nodig.</p>`,
films:[F.trans,F.groen]};
const STOF_COMP={titel:"Compensatiepunt",html:`
<p>Het <b>compensatiepunt</b> is de lichtintensiteit waarbij de assimilatie (CO₂ vastleggen in de fotosynthese) en de dissimilatie (CO₂ afgeven) precies even groot zijn. De netto CO₂-opname is daar nul: in de grafiek snijdt de lijn de x-as.</p>
<p>Een plant groeit alleen als het licht overdag ruim boven zijn compensatiepunt ligt.</p>`,
films:[F.groen]};

const q1=vraag(2,"welke delen worden blauwzwart?",(q,id)=>{
  const {think,ans,unlock}=start(q,"Een bonte klimop heeft een nacht in het donker gestaan en daarna een dag in de zon. 's Avonds kleur je een blad met jodium.<br><br>"+B("Welke delen worden blauwzwart? Leg uit waarom de andere delen niet kleuren."));
  choiceStep(think,{q:"Wat toon je aan met jodium?",opts:["zetmeel","glucose","chlorofyl"],right:0,
    ok:"Ja. Waarom heeft de plant eerst een nacht in het donker gestaan?",no:"Jodium kleurt een stof die niet oplost en die de plant opslaat.",
    onDone:()=>choiceStep(think,{q:"Waarom heeft de plant eerst een nacht in het donker gestaan?",opts:["zodat het oude zetmeel is afgebroken","zodat de witte delen groen worden","zodat de plant meer chlorofyl maakt"],right:0,
      ok:"Goed: al het zetmeel dat je 's avonds ziet, is die dag gemaakt. Wat is daarvoor nodig, en hebben de witte delen dat?",no:"Wat doet de plant 's nachts met zijn zetmeel?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "alleen de <b>groene delen</b> worden blauwzwart",
    "de witte delen hebben <b>geen chlorofyl</b>: daar is <b>geen lichtreactie</b>, dus geen ATP en NADPH,H⁺ voor de calvincyclus, dus <b>geen glucose en geen zetmeel</b>"],
    model:"Alleen de groene delen worden blauwzwart. In de witte delen zit geen chlorofyl. Daar kan geen lichtreactie plaatsvinden, dus komen er geen ATP en NADPH,H⁺ voor de calvincyclus. Zonder calvincyclus wordt er daar geen glucose gemaakt, en dus ook geen zetmeel.",
    valkuil:"Alleen ‘de witte delen hebben geen chlorofyl’ zonder de stap naar glucose/zetmeel: 0 punten voor het tweede punt.",
    after:()=>waaromBtn(ans,textBox("Na de nacht in het donker is het oude zetmeel afgebroken. Al het zetmeel dat jodium 's avonds blauwzwart kleurt, is dus die dag gemaakt. Daarvoor is de hele keten nodig: <b>chlorofyl</b> absorbeert licht → <b>lichtreactie</b> levert ATP en NADPH,H⁺ → <b>calvincyclus</b> maakt glucose → de chloroplast maakt er <b>zetmeel</b> van. In de witte delen breekt de keten bij de eerste schakel. Het is dezelfde proef als in de film, maar nu doet de plant het ‘afdekken’ zelf."))});
  q.append(think,ans);
},STOF_JODIUM);

const q2=vraag(2,"hoe komen witte cellen aan glucose?",(q,id)=>{
  const {think,ans,unlock}=start(q,"De witte cellen in een bont blad leven en groeien wel.<br><br>"+B("Leg uit hoe deze cellen aan glucose komen. Noem het vervoermiddel en de vorm waarin de suiker wordt vervoerd, en de rol van de witte cellen in de drukstroom."));
  choiceStep(think,{q:"Kunnen de witte cellen hun glucose zelf maken?",opts:["ja, met de fotosynthese","nee, ze moeten suiker van elders krijgen"],right:1,
    ok:"Ja. Waar wordt die suiker dan gemaakt, en hoe komt die bij de witte cellen?",no:"Kijk naar vraag 15: wat ontbreekt er in de witte delen?",
    onDone:()=>choiceStep(think,{q:"Groene en witte delen liggen soms centimeters uit elkaar. Kan de suiker die afstand overbruggen door diffusie?",opts:["ja, diffusie is snel genoeg","nee, daarvoor is transport door vaten nodig"],right:1,
      ok:"Goed. Welke vaten, welke suiker, en zijn de witte cellen dan een bron of een put?",no:"Diffusie is alleen snel over een paar cellen.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "vanuit de groene delen komt suiker als <b>sacharose</b> via de <b>bastvaten</b> (het floëem) naar de witte delen",
    "de witte delen zijn een <b>put</b>: daar worden de suikers uit het zeefvat gehaald (en gebruikt voor dissimilatie en groei)"],
    model:"De groene delen maken glucose en zetten die om in sacharose. Die gaat via de bastvaten (het floëem) naar de witte delen. De witte cellen zijn een put: daar wordt de suiker uit het zeefvat gehaald en gebruikt voor dissimilatie en groei.",
    valkuil:"‘Via de houtvaten’ is fout: houtvaten vervoeren water en mineralen. ‘De witte cellen zijn een bron’ is fout: een bron levert suiker, een put neemt het op.",
    after:()=>waaromBtn(ans,textBox("Het groene deel is de <b>bron</b>: de begeleidende cellen pompen er sacharose het zeefvat in. Het witte deel is een <b>put</b>: daar wordt de sacharose uit het zeefvat gehaald. Door dat verschil in druk stroomt het sap via de <b>bastvaten</b> van groen naar wit. De witte cellen gebruiken de suiker als brandstof (dissimilatie) en als grondstof om te groeien, net als de wortels van een plant."))});
  q.append(think,ans);
},STOF_PUT);

/* Compensatiepunt groen en bont: zelfde dissimilatie (2), bont de helft van de fotosynthese. Fictieve modelkrommen. */
const GROEN=L=>14*L/(150+L)-2, BONT=L=>7*L/(150+L)-2;
const q3=vraag(2,"compensatiepunt van een bonte klimop",(q,id)=>{
  const {think,ans,unlock}=start(q,"Een kweker zet een helemaal groene klimop en een bonte klimop van dezelfde grootte naast elkaar. Bij de bonte plant is de helft van het bladoppervlak wit.<br><br>"+B("Leg in twee stappen uit dat het compensatiepunt van de bonte klimop hoger ligt dan dat van de groene."));
  choiceStep(think,{q:"Wat is het compensatiepunt?",opts:["de lichtintensiteit waarbij assimilatie en dissimilatie even groot zijn","de lichtintensiteit waarbij de fotosynthese het snelst gaat","de lichtintensiteit waarbij de plant geen dissimilatie meer doet"],right:0,
    ok:"Ja. Vergelijk nu de twee planten bij dezelfde lichtintensiteit: de assimilatie, en de dissimilatie.",no:"Op het compensatiepunt is de netto CO₂-opname nul.",
    onDone:()=>choiceStep(think,{q:"Dissimileren de witte delen van het blad?",opts:["ja","nee"],right:0,
      ok:"Goed: lees de inleiding nog eens. Wat betekent dat voor de dissimilatie van de bonte plant, vergeleken met de groene?",no:"Lees de inleiding: wat doen de witte cellen wel?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "de witte delen dissimileren wel, maar doen geen fotosynthese: de bonte plant heeft bij dezelfde lichtintensiteit <b>minder fotosynthese</b> tegenover (ongeveer) <b>dezelfde dissimilatie</b>",
    "er is dus <b>meer licht nodig</b> voordat de assimilatie even groot is als de dissimilatie: het compensatiepunt ligt hoger"],
    model:"De witte delen doen geen fotosynthese, maar dissimileren wel. De bonte plant legt bij dezelfde lichtintensiteit dus minder CO₂ vast dan de groene, terwijl hij ongeveer evenveel afbreekt. Hij heeft meer licht nodig voordat de assimilatie de dissimilatie inhaalt: zijn compensatiepunt ligt hoger.",
    valkuil:"‘De bonte plant heeft minder chlorofyl, dus een hoger compensatiepunt’ is één stap te kort: noem dat de dissimilatie gelijk blijft terwijl de fotosynthese lager is.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"De groene klimop: bij lichtintensiteit 0 alleen dissimilatie (−2). Waar de lijn de x-as snijdt, ligt zijn compensatiepunt.",k:[1,0],stip:[{x:25,y:0,tekst:"groen",links:false}]},
      {cap:"De bonte klimop dissimileert even veel: hij begint bij 0 ook op −2. Maar met de helft van het bladoppervlak wit, stijgt zijn fotosynthese maar half zo snel.",k:[1,1]},
      {cap:"De bonte plant heeft dus meer licht nodig voordat assimilatie en dissimilatie gelijk zijn: zijn compensatiepunt ligt verder naar rechts, hoger.",k:[1,1],stip:[{x:25,y:0,tekst:"groen",links:true},{x:60,y:0,tekst:"bont",links:false}]}],
      (st,s)=>st.innerHTML=`<div class="eyebrow" style="padding:8px 10px 0">groene en bonte klimop (schets, geen meetgegevens)</div>`+GRAF({krommen:[{f:GROEN,naam:"groene klimop",op:s.k[0]},{f:BONT,streep:"9 6",naam:"bonte klimop",op:s.k[1]?1:0}].filter(k=>k.op),stip:s.stip||[],
        xmax:200,xstap:25,ymin:-4,ymax:6,ystap:2,ytitel:"netto CO₂-opname (relatief)",xtitel:"lichtintensiteit (relatief)",label:"Compensatiepunt van een groene en een bonte klimop (schets, geen meetgegevens)"})))});
  q.append(think,ans);
},STOF_COMP);

opgave("Bonte bladeren","Bonte bladeren",`
<p>Sommige kamerplanten, zoals bonte klimop, hebben bladeren met groene en witte delen. In de witte delen maken de cellen geen chlorofyl. Ze leven wel: ze delen, groeien en dissimileren.</p>`,[q1,q2,q3]);
}
