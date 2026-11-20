/* ===== Opgave 8: Hoe één soort er twee wordt (EI-evolutie-O03) ===== */
{
const q1=vraag(2,"juist of onjuist: soorten en isolatie",(q,id)=>{
  q.append(el("p",{class:"qtext"},"1 Of twee dieren tot dezelfde soort horen, zie je aan het uiterlijk.<br>2 Hond en wolf zijn nog steeds één soort, omdat er tussen hen genenstroom is.<br>3 Een hondenras is te vergelijken met een ondersoort in de natuur.<br>4 Twee kikkersoorten die in verschillende maanden paren, zijn gescheiden door isolatie vóór de bevruchting.<br>5 Een onvruchtbaar jong van twee soorten is een voorbeeld van isolatie vóór de bevruchting.<br><br><b>Noteer de nummers en schrijf erachter of de uitspraak juist of onjuist is.</b>"));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  choiceStep(think,{q:"Een paard en een ezel krijgen samen een muilezel. Waarom is de muilezel geen nieuwe soort?",opts:["omdat hij onvruchtbaar is: hij krijgt zelf geen jongen","omdat hij er anders uitziet dan paard en ezel","omdat hij door mensen gefokt is"],right:0,
    ok:"Ja. Gebruik bij elke uitspraak de afspraak over wat een soort is, en bedenk bij 4 en 5 of er wel of geen bevruchte eicel ontstaat.",no:"Denk aan de afspraak die biologen gebruiken: wat moeten twee dieren samen kunnen krijgen?",onDone:unlock});
  juistOnjuist(ans,{id,stm:["soort zie je aan het uiterlijk","hond en wolf één soort door genenstroom","hondenras ≈ ondersoort","andere paartijd = isolatie vóór de bevruchting","onvruchtbaar jong = isolatie vóór de bevruchting"],key:[false,true,true,true,false],
    uitleg:textBox("Puntentelling: alles goed 2 punten, één fout 1 punt, meer fouten 0 punten.<br>1 <b>onjuist</b>: een soort is een groep die in de natuur samen vruchtbare nakomelingen kan krijgen. Uiterlijk kan misleiden: een chihuahua en een wolf zijn één soort.<br>2 <b>juist</b>: honden en wolven kunnen samen vruchtbare jongen krijgen, dus er gaan allelen heen en weer.<br>3 <b>juist</b>: een ras is een groep binnen een soort, net als een ondersoort in de natuur.<br>4 <b>juist</b>: ze komen niet eens tot paren, dus er ontstaat geen bevruchte eicel.<br>5 <b>onjuist</b>: er is wél bevruchting en er is een jong. Dat het jong onvruchtbaar is, is isolatie <b>ná</b> de bevruchting.")});
  q.append(think,ans);
},TERUG("Soort en isolatie",F.e6,"Wat is een soort? en Wanneer is het echt een tweede soort?"));
opgave("Soort","Hoe één soort er twee wordt","",[q1]);
}
