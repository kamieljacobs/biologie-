/* ===== Opgave 4 Het zenuwstelsel en reflexen (KF04), opgave 5 De impuls (KG06) ===== */
{
const STOF_REFLEX={titel:"Reflex of bewuste reactie",html:`
<p>Bij een <b>reflex</b> gaat de impuls van een zintuig via een sensorische zenuwcel naar het ruggenmerg (of de hersenstam), via een schakelcel meteen naar een <b>motorische zenuwcel</b> en zo naar een spier. Je hoeft er niet over na te denken: de reactie gaat vanzelf en is altijd hetzelfde.</p>
<p>Bij een <b>bewuste reactie</b> gaat de impuls eerst naar de grote hersenen. Daar wordt de prikkel herkend en beslis je wat je doet; daarna gaat er een nieuwe impuls via het ruggenmerg naar de spieren. Ook de hersenen sturen dus via motorische zenuwcellen in het ruggenmerg je spieren aan.</p>`,
films:[F.sec]};
const k3=vraag(2,"remmen en een hete pan",(q,id)=>{
  const {think,ans,unlock}=start(q,"Beantwoord de volgende vragen.<ul style='margin:6px 0 0;padding-left:20px'><li>Je knijpt in de remmen als er een bal de straat op rolt. "+B("Leg uit waarom dit geen reflex is, terwijl het toch snel gaat.")+"</li><li>Je kunt een hete pan nog even vasthouden tot hij op het aanrecht staat. "+B("Leg uit hoe je hersenen dat doen.")+"</li></ul>");
  choiceStep(think,{q:"Wat maakt een reactie een reflex?",opts:["de impuls gaat niet eerst naar de grote hersenen: je hoeft niet na te denken","elke reactie die binnen een seconde gebeurt","elke reactie die je vaak geoefend hebt"],right:0,
    ok:"Ja. Moet je de rollende bal eerst zien en herkennen voordat je remt?",no:"Snelheid alleen maakt iets nog geen reflex. Waar gaat de impuls bij een reflex wel en niet langs?",
    onDone:()=>choiceStep(think,{q:"Bij de hete pan wil je reflex je hand terugtrekken. Langs welke zenuwcel gaat die opdracht naar je armspieren?",opts:["langs een motorische zenuwcel in het ruggenmerg","rechtstreeks van de huid naar de spier"],right:0,
      ok:"Goed. Bedenk nu hoe de hersenen op díe zenuwcel kunnen ingrijpen.",no:"Ook bij een reflex gaat er een schakel via het ruggenmerg.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Remmen: het signaal gaat <b>via de hersenen</b> (beeld verwerkt, nieuwe impuls via het ruggenmerg en een motorische zenuw); het gaat snel omdat de beweging <b>geleerd/geoefend</b> is.",
    "Hete pan: de hersenen <b>remmen de reflex af</b> via remmende verbindingen op het motorische neuron."],
    model:"Remmen voor een bal is geen reflex: je moet de bal eerst zien en herkennen, dus het signaal gaat via de hersenen, die een nieuwe impuls via het ruggenmerg naar je handen sturen. Het gaat snel omdat je die beweging honderden keren geoefend hebt. Bij de hete pan sturen je hersenen remmende impulsen naar het motorische neuron in het ruggenmerg, zodat de reflex even wordt tegengehouden.",
    valkuil:"‘Het is geen reflex omdat het niet snel genoeg is’ mist het punt: het verschil zit in de weg (via de hersenen), niet in de snelheid.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Reflex: zintuig → ruggenmerg → motorische zenuwcel → spier. De grote hersenen zitten er niet tussen.",k:0},
      {cap:"Remmen voor een bal: oog → hersenen (zien, herkennen, kiezen) → ruggenmerg → spieren. Snel, omdat het geoefend is.",k:1},
      {cap:"Hete pan: de reflex wil loslaten, maar de hersenen sturen een remmende impuls naar hetzelfde motorische neuron.",k:2}],
      (stg,s)=>stg.innerHTML=ROUTE_REFLEX(s.k)))});
  q.append(think,ans);
},STOF_REFLEX);

/* reflexboog of route via de hersenen (k = 0 reflex, 1 via de hersenen, 2 hersenen remmen de reflex) */
function ROUTE_REFLEX(k){
  const m="mk"+(++MK);let s=pijlDef(m,"var(--teal)")+pijlDef(m+"r","var(--koraal)");
  const doos=(x,y,t,on)=>`<rect x="${x-62}" y="${y-20}" width="124" height="40" rx="10" fill="${on?"var(--goud-soft)":"var(--surface)"}" stroke="${on?"var(--goud)":"var(--line2)"}" stroke-width="${on?2.2:1.3}"/><text x="${x}" y="${y+5}" text-anchor="middle" class="lbl">${t}</text>`;
  const p=(d,kl="teal")=>`<path d="${d}" fill="none" stroke="var(--${kl})" stroke-width="3" marker-end="url(#${m}${kl==="koraal"?"r":""})"/>`;
  s+=doos(300,40,"grote hersenen",k>=1)+doos(300,170,"ruggenmerg",true)+doos(80,170,k===1?"oog":"huid",true)+doos(520,170,"spier",true);
  if(k===0||k===2)s+=p("M142,170 H234")+p("M366,170 H454");
  if(k===1)s+=p("M80,148 V60 H234")+p("M300,62 V146")+p("M366,170 H454");
  if(k===2)s+=p("M300,62 V146","koraal")+`<text x="312" y="110" class="lbl" style="fill:var(--koraal)">remmende impuls</text><text x="410" y="210" text-anchor="middle" class="lblm">motorische zenuwcel</text>`;
  if(k===0)s+=`<text x="410" y="210" text-anchor="middle" class="lblm">motorische zenuwcel</text><text x="188" y="210" text-anchor="middle" class="lblm">sensorische zenuwcel</text>`;
  return FIG(440,600,"0 0 600 226",s,"Weg van een impuls");}

const STOF_IMP={titel:"De impuls in een zenuwcel",html:`
<p>In rust is de binnenkant van een zenuwcel negatief ten opzichte van de buitenkant: de <b>rustpotentiaal</b>. Wordt het membraan genoeg geprikkeld, voorbij de <b>drempelwaarde</b>, dan gaan er kanalen open, stromen er natriumionen naar binnen en draait de spanning even om: een <b>actiepotentiaal</b>. Daarna herstelt de cel de rustpotentiaal.</p>
<p>Een actiepotentiaal prikkelt het stukje membraan ernaast, dat daardoor ook boven de drempel komt. Zo loopt de impuls als een golf langs het axon.</p>`,
films:[F.kabel]};
/* axon als rij stukjes: i = plek van de actiepotentiaal; freq = twee prikkels met impulsen per seconde */
function AXON(st){
  let s="";
  if(st<3){const i=[2,4,6][st];
    s+=`<text x="20" y="34" class="lblm">cellichaam</text><text x="580" y="34" text-anchor="end" class="lblm">uiteinde →</text>`;
    for(let k=0;k<10;k++){const x=20+k*56;const ap=k===i,rf=k===i-1;
      s+=`<rect x="${x}" y="50" width="52" height="40" rx="6" fill="${ap?"var(--goud-soft)":rf?"var(--surface2)":"var(--surface)"}" stroke="${ap?"var(--goud)":"var(--line2)"}" stroke-width="${ap?2.4:1.2}" ${rf?'stroke-dasharray="4 3"':""}/>`;
      if(ap)s+=`<text x="${x+26}" y="76" text-anchor="middle" class="lbl" style="fill:var(--goud-text)">AP</text>`;
      if(rf)s+=`<text x="${x+26}" y="112" text-anchor="middle" class="lblm">even niet</text><text x="${x+26}" y="128" text-anchor="middle" class="lblm">prikkelbaar</text>`;
      if(k===i+1)s+=`<text x="${x+26}" y="112" text-anchor="middle" class="lblm" style="fill:var(--groen)">wordt</text><text x="${x+26}" y="128" text-anchor="middle" class="lblm" style="fill:var(--groen)">geprikkeld</text>`;}
    return FIG(440,600,"0 0 600 140",s,"Axon met de plek van de actiepotentiaal");}
  const rij=(y,n,t)=>{let r=`<text x="20" y="${y-30}" class="lbl">${t}</text><path d="M20,${y} H580" stroke="var(--line2)"/>`;for(let k=0;k<n;k++){const x=40+k*(520/n);r+=`<path d="M${x},${y} l4,-40 l4,40" fill="none" stroke="var(--teal)" stroke-width="2.2"/>`;}return r;};
  s+=rij(70,4,"zwakke prikkel")+rij(160,11,"sterke prikkel")+`<text x="580" y="186" text-anchor="end" class="lblm">tijd →</text>`;
  return FIG(440,600,"0 0 600 192",s,"Impulsen bij een zwakke en een sterke prikkel");}
const k4=vraag(2,"één kant op, en sterker",(q,id)=>{
  const {think,ans,unlock}=start(q,"Beantwoord de volgende vragen.<ul style='margin:6px 0 0;padding-left:20px'><li>"+B("Leg uit waardoor een impuls in een axon maar één kant op kan lopen.")+"</li><li>Een sterkere prikkel geeft geen grotere actiepotentiaal. "+B("Hoe geeft een zenuwcel dan door dat een prikkel sterker is?")+"</li></ul>");
  choiceStep(think,{q:"Een actiepotentiaal prikkelt het membraan ernaast. Aan welke kanten ligt membraan ernaast?",opts:["aan beide kanten: ervoor en erachter","alleen ervoor"],right:0,
    ok:"Klopt. Toch loopt de impuls maar één kant op. Denk aan wat het stukje erachter net heeft meegemaakt.",no:"Het axon is een buis: een stukje membraan heeft buren aan twee kanten.",
    onDone:()=>choiceStep(think,{q:"Een zenuwcel krijgt eerst een zwakke en dan een sterke prikkel. Wat blijft gelijk?",opts:["de hoogte van elke actiepotentiaal","het aantal impulsen per seconde"],right:0,
      ok:"Ja. Wat kan er dan wél veranderen?",no:"De vraag zegt het al: een sterkere prikkel geeft geen grotere actiepotentiaal.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Het stukje membraan <b>achter</b> de actiepotentiaal is even niet prikkelbaar (<b>refractaire periode</b>).",
    "Een actiepotentiaal is altijd even groot (<b>alles-of-niets</b>); bij een sterkere prikkel komen er <b>meer impulsen per seconde</b>."],
    model:"Het stukje membraan waar de actiepotentiaal net was, is even niet prikkelbaar: de refractaire periode. Daardoor kan de impuls alleen naar voren. Een actiepotentiaal is alles-of-niets en dus altijd even groot. Een sterkere prikkel geeft meer impulsen per seconde.",
    valkuil:"‘De impuls kan niet terug omdat er een synaps zit’ verklaart niet waarom hij in het axon zelf één kant op gaat. ‘Grotere impulsen’ is fout: alleen de frequentie verandert.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"De actiepotentiaal (AP) prikkelt het stukje ervoor.",st:0},
      {cap:"Het stukje waar hij net was, is even niet prikkelbaar: daar kan hij niet terug.",st:1},
      {cap:"Zo schuift hij steeds één kant op, naar het uiteinde.",st:2},
      {cap:"Elke impuls is even hoog. Een sterkere prikkel geeft er meer per seconde.",st:3}],
      (stg,s)=>{stg.innerHTML=AXON(s.st);inBeeld(stg,s.st<3?(46+[2,4,6][s.st]*56)/600:null);}))});
  q.append(think,ans);
},STOF_IMP);

opgave("Reflexen","Het zenuwstelsel en reflexen",GEEN_INLEIDING,[k3]);
opgave("Impuls","De impuls",GEEN_INLEIDING,[k4]);
}
