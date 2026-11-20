/* ===== Opgave 1 Bloedsuiker (EI-regeling-KB03) en opgave 2 Hypothalamus, hypofyse en schildklier (EI-regeling-KC08) ===== */
{
const STOF_GLUC={titel:"Glucose in je bloed",html:`
<p>De glucoseconcentratie in je bloed blijft in een gezond lichaam dicht bij een vaste waarde. Na het eten stijgt hij, tussen de maaltijden en bij inspanning daalt hij. Hormonen sturen hem terug: dat is een <b>regelkring</b>.</p>
<p>Je lichaam heeft een <b>voorraad</b>: in de lever en de spieren ligt glucose opgeslagen als <b>glycogeen</b>, lange ketens van glucose. Een hormoon kan de glucose in het bloed op verschillende manieren veranderen: cellen laten glucose opnemen en opslaan, glucose uit de voorraad halen, of in de lever nieuwe glucose laten maken uit andere stoffen.</p>
<p>Een hormoon werkt alleen op <b>doelwitcellen</b>: cellen met een receptor die bij dat hormoon past. Twee hormonen die elkaars werking tegengaan, heten tegenspelers.</p>`,
films:[F.suiker,F.stress]};
const OPT=["verlaagt: cellen nemen glucose op, lever en spieren maken glycogeen","verhoogt: de lever breekt glycogeen af tot glucose","verhoogt: de lever maakt nieuwe glucose uit aminozuren","verlaagt: de lever breekt glycogeen af","verhoogt: cellen nemen glucose op"];
const k1=vraag(2,"vier hormonen en de glucose",(q,id)=>{
  const {think,ans,unlock}=start(q,"Vier hormonen beïnvloeden de glucoseconcentratie: insuline, glucagon, adrenaline en cortisol.<br><br>"+B("Noteer de vier hormonen onder elkaar. Zet erachter of het hormoon de glucose verhoogt of verlaagt, en hoe het dat doet."));
  choiceStep(think,{q:"Je hebt net een groot bord pasta gegeten. Wat moet er gebeuren met de glucose in je bloed?",opts:["die moet omlaag: er komt veel glucose binnen","die moet omhoog: je hebt energie nodig"],right:0,
    ok:"Ja. Welk hormoon komt dan vrij? En welk hormoon is zijn tegenspeler?",no:"Na het eten wordt de glucose uit je darm opgenomen. Wordt hij dan hoger of lager?",
    onDone:()=>chipsStep(think,{q:"Op welke manieren kan een hormoon de glucose in je bloed veranderen? Kies alles wat klopt.",items:[["cellen glucose laten opnemen en opslaan",1],["glucose uit de voorraad glycogeen halen",1],["de lever nieuwe glucose laten maken",1],["de nieren glucose laten maken uit ureum",0]],
      ok:"Goed. Bedenk nu per hormoon welke van deze manieren erbij hoort.",no:"Eén van je keuzes klopt niet: welk orgaan heeft een voorraad glucose?",onDone:unlock})});
  selectAnswer(ans,{id,uid:"q"+id,intro:"Kies per hormoon de richting én de manier.",rows:[["insuline",OPT,0],["glucagon",OPT,1],["adrenaline",OPT,1],["cortisol",OPT,2]],
    score:n=>n===4?2:n===3?1:0,
    after:()=>waaromBtn(ans,textBox(`<b>Insuline</b> verlaagt: cellen nemen glucose op, en lever en spieren maken er glycogeen van. <b>Glucagon</b> is de tegenspeler: de lever breekt glycogeen af tot glucose. <b>Adrenaline</b> (bij schrik) haalt ook glucose uit de voorraad glycogeen, maar snel. <b>Cortisol</b> (bij langere stress) laat de lever <i>nieuwe</i> glucose maken uit aminozuren.<br>Vier goed: 2 punten, drie goed: 1 punt. Een hormoon telt alleen als richting én manier kloppen. Veel gemaakte fout: cortisol en adrenaline op dezelfde manier laten werken.`))});
  q.append(think,ans);
},STOF_GLUC);
opgave("Bloedsuiker","Bloedsuiker",GEEN_INLEIDING,[k1]);

/* schildklier-regelkring voor 'laat zien waarom': stap 0 normaal, 1 weinig jodium, 2 rem valt weg, 3 struma */
function KRING_SCHILD(st){
  const m="mk"+(++MK);let s=pijlDef(m)+pijlDef(m+"r","var(--koraal)");
  const doos=(x,y,t,on)=>`<rect x="${x-80}" y="${y-22}" width="160" height="44" rx="10" fill="${on?"var(--goud-soft)":"var(--surface)"}" stroke="${on?"var(--goud)":"var(--line2)"}" stroke-width="${on?2.4:1.4}"/><text x="${x}" y="${y+5}" text-anchor="middle" class="lbl">${t}</text>`;
  const tsh=st>=2?4:st===0?2:2, th=st>=1?1:3, rem=st>=1?(st>=2?0.35:0.6):1;
  s+=doos(140,50,"hypofyse",st===2)+doos(140,250,st===3?"schildklier (groot)":"schildklier",st===3);
  if(st===3)s+=`<ellipse cx="140" cy="250" rx="102" ry="36" fill="none" stroke="var(--goud)" stroke-width="2" stroke-dasharray="5 4"/>`;
  s+=`<path d="M140,74 V224" stroke="var(--groen)" stroke-width="${1.5+tsh}" marker-end="url(#${m})"/><text x="152" y="152" class="lbl" style="fill:var(--groen)">TSH ${st>=2?"(veel)":""}</text>`;
  s+=`<path d="M222,250 H330 V50 H226" fill="none" stroke="var(--koraal)" stroke-width="${0.8+th}" stroke-dasharray="7 5" opacity="${rem}" marker-end="url(#${m}r)"/><text x="340" y="150" class="lbl" style="fill:var(--koraal)">thyroxine${st>=1?" (weinig)":""}</text><text x="340" y="170" class="lblm">remt de hypofyse</text>`;
  s+=`<text x="40" y="300" class="lblm">jodium: ${st>=1?"tekort":"genoeg"}</text>`;
  return FIG(380,520,"0 0 500 312",s,"Regelkring van de schildklier");}

const STOF_KLIER={titel:"De baas van de klieren",html:`
<p>De <b>hypothalamus</b> in je hersenen meet allerlei waarden in je bloed en stuurt de <b>hypofyse</b> aan. De hypofyse geeft <b>opdrachthormonen</b> af: hormonen die een andere hormoonklier aan het werk zetten.</p>
<p>Zo'n keten houdt zichzelf in balans met <b>negatieve terugkoppeling</b>, net als een thermostaat: wordt het warm genoeg, dan zet de thermostaat de verwarming lager. Bij een hormoon betekent dat: het eindproduct van de keten werkt terug op het begin.</p>`,
films:[F.baas]};
const k2=vraag(2,"twee fouten bij struma",(q,id)=>{
  const {think,ans,unlock}=start(q,"Een leerling schrijft in een verslag: ‘Bij een tekort aan jodium wordt de schildklier groter en maakt hij daardoor meer thyroxine. Thyroxine stimuleert de hypofyse, zodat die nog meer TSH afgeeft.’<br><br>"+B("In deze tekst staan twee fouten. Verbeter ze."));
  choiceStep(think,{q:"Welk hormoon maakt de schildklier zelf?",opts:["thyroxine","TSH"],right:0,
    ok:"Ja. Wat heeft jodium daarmee te maken? Lees de eerste zin van de leerling nog eens.",no:"TSH is een opdrachthormoon. Uit welke klier komen opdrachthormonen?",
    onDone:()=>choiceStep(think,{q:"De thermostaat staat op 20 °C en het wordt 21 °C in de kamer. Wat doet de thermostaat met de verwarming?",opts:["zet hem zachter","zet hem harder"],right:0,
      ok:"Goed: zo werkt negatieve terugkoppeling. Wat is in de keten hypofyse → schildklier de ‘verwarming’, en wat de ‘temperatuur’? Lees dan de tweede zin van de leerling.",no:"Het is al warmer dan de thermostaat wil.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Een grote schildklier (struma) maakt juist <b>te weinig thyroxine</b>, want zonder jodium kan hij geen thyroxine maken.",
    "Thyroxine <b>remt</b> de hypofyse (negatieve terugkoppeling); de TSH is hoog doordat die rem bij weinig thyroxine wegvalt."],
    model:"Fout 1: bij een tekort aan jodium maakt de schildklier juist te weinig thyroxine, want jodium is een bouwstof van thyroxine. Fout 2: thyroxine remt de hypofyse. Is er weinig thyroxine, dan valt die rem weg en geeft de hypofyse veel TSH af. Daardoor groeit de schildklier.",
    valkuil:"Alleen zeggen dát iets fout is (‘het is niet meer maar minder’) zonder de juiste werking van thyroxine op de hypofyse levert geen punt op voor de tweede fout.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Normaal: TSH zet de schildklier aan, thyroxine remt de hypofyse. Zo blijft alles in balans."},
      {cap:"Te weinig jodium: de schildklier kan weinig thyroxine maken."},
      {cap:"Weinig thyroxine = weinig rem. De hypofyse geeft veel TSH af."},
      {cap:"Al die TSH laat de schildklier groeien: struma. Groter, maar zonder jodium nog steeds weinig thyroxine."}],
      (stg,s,i)=>stg.innerHTML=KRING_SCHILD(i)))});
  q.append(think,ans);
},STOF_KLIER);
opgave("Schildklier","Hypothalamus, hypofyse en schildklier",GEEN_INLEIDING,[k2]);
}
