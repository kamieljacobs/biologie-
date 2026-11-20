/* ===== Opgave 6: Koolstof (EI-ecologie-KF03) ===== */
{
const STOF_FD={titel:"Fotosynthese en dissimilatie",html:`
<p>Bij <b>fotosynthese</b> neemt een plant koolstofdioxide en water op en maakt er met lichtenergie glucose van; er komt zuurstof vrij. Bij <b>dissimilatie</b> breekt een organisme glucose af met zuurstof; er komen koolstofdioxide en water vrij, en energie.</p>
<p>Bij een proef met een afgesloten stolp meet je het <b>verschil</b> tussen wat de plant opneemt en wat zij afgeeft. Ga voor elke situatie na welke processen er dan bezig zijn.</p>`,
films:[F.c,F.energie]};
function STOLP(k){const X=t=>40+t*150,Y=c=>170-c;let g=`<path d="M40,20 V180 H340" fill="none" stroke="var(--text2)" stroke-width="1.4"/>`;
  g+=`<rect x="40" y="20" width="150" height="160" fill="var(--goud)" opacity=".1"/>`+T(115,36,"licht","lbl")+`<rect x="190" y="20" width="150" height="160" fill="var(--text3)" opacity=".12"/>`+T(265,36,"donker","lbl");
  g+=T(115,198,"uur 1")+T(265,198,"uur 2")+T(16,100,"CO₂ onder de stolp (schets)","lblm","middle",'transform="rotate(-90 16 100)"');
  if(k>=1)g+=`<path d="M${X(0)},${Y(90)} L${X(1)},${Y(40)}" stroke="var(--teal)" stroke-width="3"/>`;
  if(k>=2)g+=`<path d="M${X(1)},${Y(40)} L${X(2)},${Y(75)}" stroke="var(--teal)" stroke-width="3"/>`;
  return SVG("0 0 350 210",g,"Schets: CO₂-gehalte onder de stolp, een uur licht en een uur donker",500);}
const ids=[vraag(2,"een plant onder een stolp",(q,id)=>{
  pre(q,"<p>Een plant staat onder een afgesloten glazen stolp. Het CO₂-gehalte onder de stolp wordt gemeten, eerst een uur in het licht en daarna een uur in het donker.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit wat er met het CO₂-gehalte gebeurt in het licht en in het donker."));
  chipsStep(think,{q:"Welke processen doet de plant <b>in het licht</b>? Kies alles wat klopt.",items:[["fotosynthese",1],["dissimilatie",1],["verbranding",0]],
    ok:"Ja, allebei tegelijk. Welk van de twee is in het licht groter?",no:"Een plant brandt niet. Welke twee processen met CO₂ doet een levende plant?",
    onDone:()=>chipsStep(think,{q:"En welke processen doet de plant <b>in het donker</b>? Kies alles wat klopt.",items:[["fotosynthese",0],["dissimilatie",1]],
      ok:"Goed. Bedenk nu per uur of er onder de stolp meer CO₂ bij komt of meer verdwijnt.",no:"Voor fotosynthese is licht nodig.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "In het licht <b>daalt</b> het: de fotosynthese neemt meer CO₂ op dan de plant met dissimilatie afgeeft.",
    "In het donker <b>stijgt</b> het: er is geen fotosynthese, maar de plant dissimileert wel."],
    model:"In het licht doet de plant fotosynthese en dissimilatie. De fotosynthese neemt meer CO₂ op dan de dissimilatie afgeeft, dus het CO₂-gehalte daalt. In het donker is er geen fotosynthese, maar de plant dissimileert wel door. Ze geeft dan alleen CO₂ af, dus het CO₂-gehalte stijgt.",
    valkuil:"‘In het donker doet een plant niets, dus het blijft gelijk’ is fout: een plant dissimileert dag en nacht.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Uur 1, licht: fotosynthese én dissimilatie. De fotosynthese is groter, dus er verdwijnt meer CO₂ dan erbij komt: het gehalte <b>daalt</b>.",k:1},
      {cap:"Uur 2, donker: geen fotosynthese, wel dissimilatie. Er komt alleen CO₂ bij: het gehalte <b>stijgt</b>.",k:2}],
      (st,s)=>st.innerHTML=STOLP(s.k)))});
  q.append(think,ans);
},STOF_FD)];
opgave("Koolstof","Koolstof","",ids);
}
