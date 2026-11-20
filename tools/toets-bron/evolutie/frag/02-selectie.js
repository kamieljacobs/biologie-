/* ===== Opgave 2: Natuurlijke selectie (EI-evolutie-N04) ===== */
{
const BEG=["adaptatie","fitness","genetische drift","natuurlijke selectie","overproductie","selectiedruk","variatie"];
const q1=vraag(3,"begrippen van natuurlijke selectie",(q,id)=>{
  const {think,ans,unlock}=start(q,"<b>Vul de begrippen in.</b> Kies uit: adaptatie, fitness, genetische drift, natuurlijke selectie, overproductie, selectiedruk, variatie. Niet alle begrippen worden gebruikt; gebruik elk begrip hoogstens één keer.<br><br>In een droog jaar blijven op een eiland alleen harde zaden over: de droogte is voor de vinken een (1) … . Elk jaar komen er veel meer jongen uit het ei dan er kunnen overleven: dat heet (2) … . De vinken verschillen in snavelhoogte; deze (3) … is grotendeels erfelijk. Vinken met een hoge snavel krijgen meer jongen die zelf ook weer broeden: ze hebben een hogere (4) … . Het hele proces waarbij de omgeving bepaalt welke erfelijke eigenschappen vaker worden doorgegeven, heet (5) … .");
  choiceStep(think,{q:"Eén begrip uit de lijst gaat over <b>toeval</b> en niet over wat de omgeving doet. Welk?",opts:["genetische drift","fitness","variatie"],right:0,
    ok:"Ja. Deze tekst gaat over wat de omgeving doet, dus genetische drift hoort er niet in. Lees nu per zin wat er beschreven wordt: een oorzaak, een aantal jongen, een verschil, of het hele proces?",no:"Welk begrip gaat over veranderingen in de genenpool die door kans ontstaan?",onDone:unlock});
  selectAnswer(ans,{id,uid:"q"+id,rows:[["(1)",BEG,5],["(2)",BEG,4],["(3)",BEG,6],["(4)",BEG,1],["(5)",BEG,3]],
    score:n=>n===5?3:n===4?2:n===3?1:0,intro:"Kies bij elk nummer het begrip. 5 goed = 3 punten, 4 goed = 2 punten, 3 goed = 1 punt.",
    after:()=>waaromBtn(ans,textBox("(1) <b>selectiedruk</b>: een factor uit de omgeving die bepaalt wie overleeft, hier de droogte met alleen harde zaden.<br>(2) <b>overproductie</b>: meer jongen dan er kunnen overleven.<br>(3) <b>variatie</b>: de verschillen tussen individuen, hier in snavelhoogte.<br>(4) <b>fitness</b>: hoeveel jongen een individu krijgt die zelf ook weer jongen krijgen.<br>(5) <b>natuurlijke selectie</b>: het hele proces.<br><br><b>Adaptatie</b> is wat er uit dat proces komt: een erfelijke eigenschap die door natuurlijke selectie algemeen is geworden. <b>Genetische drift</b> is verandering door toeval. Die twee bleven over."))});
  q.append(think,ans);
},TERUG("De begrippen van natuurlijke selectie",F.e2,"Wie wint?"));

opgave("Selectie","Natuurlijke selectie","",[q1]);
}
