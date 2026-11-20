/* ===== Opgave 4: Van darm naar bloed (havo K401, vwo K403; K408; film 4) ===== */
{
const STOF_WAND={titel:"Vaten in de darmwand",html:`
<p>In de wand van de dunne darm liggen twee soorten vaatjes: een netwerk van <b>haarvaten</b> en <b>lymfevaten</b>. Een lymfevat voert vocht uit het weefsel af; dat vocht heet <b>lymfe</b>.</p>
<p>De wand van een haarvat en de wand van een lymfevat zijn verschillend gebouwd. Welke stoffen erdoor kunnen, hangt onder andere af van hoe groot ze zijn.</p>`,
films:[F.darm]};

const STOF_DUNNE={titel:"Verteren en opnemen in de dunne darm",html:`
<p>In de dunne darm komen gal en alvleessap bij het voedsel, en de enzymen uit de darmwand maken de vertering af. Wat overblijft zijn kleine moleculen, zoals glucose en aminozuren.</p>
<p>Die moleculen moeten door de binnenwand van de darm naar het bloed: dat heet <b>opname</b> of <b>resorptie</b>. De binnenwand is bekleed met één laag cellen, de <b>darmepitheelcellen</b>. Elk molecuul gaat door het membraan van zo'n cel naar binnen en er aan de andere kant weer uit. Vlak onder de cellen liggen de haarvaten.</p>`,
films:[F.darm]};
const STOF_OPN={titel:"Glucose de cel in",html:`
<p>Glucose gaat niet zomaar door het celmembraan van een darmepitheelcel: het gaat door <b>transporteiwitten</b> in het membraan. Zo'n transporteiwit past alleen op moleculen met de juiste vorm, zoals een enzym op zijn substraat.</p>
<p>De <b>concentratie</b> van een stof is hoeveel ervan in een bepaalde hoeveelheid vocht is opgelost. Hoeveel glucose er in de darm zit, verandert in de loop van de vertering. De epitheelcel geeft de glucose aan de andere kant weer af, naar het bloed.</p>`,
films:[F.darm]};

/* klik-animatie: twee routes naar het hart */
function ROUTES(stap){
  const box=(x,y,w,t,on,kl)=>`<rect x="${x}" y="${y}" width="${w}" height="34" rx="8" fill="${on?kl+"-soft)":"var(--surface2)"}" stroke="${on?kl+")":"var(--line2)"}" stroke-width="1.6"/><text x="${x+w/2}" y="${y+22}" text-anchor="middle" class="lbl">${t}</text>`;
  const pijl=(x1,y1,x2,y2,on,kl)=>`<path d="M${x1},${y1} L${x2},${y2}" stroke="${on?kl+")":"var(--line2)"}" stroke-width="${on?2.6:1.6}" marker-end="url(#rp${on?kl.slice(6):"x"})"/>`;
  const G="var(--groen",O="var(--goud";const g=stap===1||stap===3,o=stap===2||stap===3;
  let s=`<defs>${[["groen","var(--groen)"],["goud","var(--goud)"],["x","var(--line2)"]].map(([k,c])=>`<marker id="rp${k}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${c}"/></marker>`).join("")}</defs>`;
  s+=box(20,128,120,"darmvlok",stap>0,stap===2?O:G);
  s+=box(190,40,140,"haarvat",g,G)+box(370,40,110,"poortader",g,G)+box(520,40,70,"lever",g,G)+box(520,128,70,"hart",stap>0,stap===2?O:G);
  s+=box(190,216,140,"lymfevat",o,O)+box(370,216,140,"borstbuis",o,O);
  s+=`<text x="555" y="235" text-anchor="middle" class="lblm">ader bij het</text><text x="555" y="250" text-anchor="middle" class="lblm">sleutelbeen</text>`;
  s+=pijl(140,138,190,62,g,G)+pijl(330,57,368,57,g,G)+pijl(480,57,518,57,g,G)+pijl(555,74,555,126,g,G);
  s+=pijl(140,158,190,228,o,O)+pijl(330,233,368,233,o,O)+pijl(510,225,540,164,o,O);
  if(g)s+=`<text x="260" y="30" text-anchor="middle" class="lblm">glucose, aminozuren</text>`;
  if(o)s+=`<text x="260" y="270" text-anchor="middle" class="lblm">vet (als bolletjes)</text>`;
  return `<div class="vdfig" style="max-width:610px;margin:0 auto;width:100%;--min:520px">`+svgWrap("0 0 610 280",s,"Twee routes van de darmvlok naar het hart")+`</div>`;}

const ids=[];
if(!VWO)ids.push(vraag(2,"oppervlaktevergroting in de dunne darm",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Noem de drie onderdelen die het oppervlak van de binnenkant van de dunne darm vergroten, van groot naar klein. Leg ook uit waarom een groot oppervlak belangrijk is."));
  choiceStep(think,{q:"Wat is een darmvlok?",opts:["een uitsteeksel van de darmwand, als een vingertje","een enzym in het darmsap","een bacterie in de darm"],right:0,
    ok:"Ja. Er is één onderdeel dat groter is dan een vlok, en één dat kleiner is.",no:"Een vlok is een deel van de wand zelf.",
    onDone:()=>numStep(think,{uid:"q"+id+"n",q:"Was de dunne darm een gladde buis, dan was de binnenkant ongeveer een kwart vierkante meter. Echt is het ongeveer 30 m². Hoeveel keer zo groot is dat?",right:120,
      ok:"Ja, meer dan honderd keer zo groot. Waarom heb je daar iets aan?",no:"Deel 30 door 0,25.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "(darm)<b>plooien</b>, (darm)<b>vlokken</b>, <b>microvilli</b>, in deze volgorde.",
    "Hoe groter het oppervlak, hoe <b>meer moleculen tegelijk</b> door de wand kunnen: de opname gaat <b>sneller</b>."],
    model:"De binnenwand ligt in plooien. Op de plooien staan darmvlokken, en de epitheelcellen op de vlokken hebben microvilli. Hoe groter het oppervlak, hoe meer moleculen er tegelijk door de wand gaan, dus hoe sneller de opname.",
    after:()=>waaromBtn(ans,textBox("Van groot naar klein: <b>plooien</b> (het oppervlak anderhalf keer zo groot), daarop <b>darmvlokken</b> (½ tot 1 mm), en op elke epitheelcel van de vlok duizenden <b>microvilli</b>, piepkleine uitstulpingen van het celmembraan. Samen van een kwart m² naar ongeveer 30 m². Meer oppervlak = meer moleculen tegelijk door de wand = snellere opname. Bij coeliakie worden de vlokken korter en gaat de opname daardoor slechter."))});
  q.append(think,ans);
},STOF_DUNNE));

if(VWO)ids.push(vraag(2,"glucose: eerst diffusie, later actief transport",(q,id)=>{
  pre(q,"<p>Vlak na een maaltijd gaat een deel van de glucose door diffusie de epitheelcel in. Later gaat het door actief transport.</p>");
  const {think,ans,unlock}=start(q,B("a Leg uit waarom de opname vlak na de maaltijd door diffusie kan.<br>b Wat is het verschil tussen diffusie en actief transport? Noem twee verschillen."));
  choiceStep(think,{q:"Vlak na de maaltijd: waar is de glucoseconcentratie het hoogst?",opts:["in de darm","in de epitheelcel","overal even hoog"],right:0,
    ok:"Ja. Bedenk welke kant diffusie op gaat.",no:"Je hebt net gegeten: waar zit dan de meeste glucose?",
    onDone:()=>choiceStep(think,{q:"Later is er minder glucose in de darm dan in de cel. Kan de glucose dan nog door diffusie de cel in?",opts:["ja","nee"],right:1,
      ok:"Klopt: dan is er een andere manier nodig. Bedenk bij b hoe die manier verschilt van diffusie.",no:"Diffusie gaat altijd van veel naar weinig.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "a: er is dan <b>veel glucose in de darm en weinig in de cel</b>; diffusie gaat van veel naar weinig.",
    "b: actief transport gaat <b>tegen het verschil in</b> (van weinig naar veel) <b>en kost de cel energie</b>; diffusie niet. (Beide verschillen nodig.)"],
    model:"a Vlak na de maaltijd zit er veel glucose in de darm en weinig in de cel. Diffusie gaat van veel naar weinig, dus de glucose gaat vanzelf de cel in. b Actief transport gaat tegen het verschil in, van weinig naar veel, en kost de cel energie. Diffusie gaat met het verschil mee en kost geen energie.",
    valkuil:"Voor b moeten beide verschillen genoemd zijn."});
  q.append(think,ans);
},STOF_OPN));

ids.push(vraag(2,"juist of onjuist: lymfe en vet",(q,id)=>{
  pre(q,"<p>Hieronder staan enkele uitspraken.</p>");
  const S=["Lymfe is vocht uit het weefsel dat later ook in het bloed komt.","De vetbolletjes uit de epitheelcel gaan door de wand van een haarvat.","De poortader brengt het bloed van de darm rechtstreeks naar het hart.","In de wand van de haarvaten in vetweefsel zit een enzym dat het vet uit de bolletjes weer knipt.","Een vetcel maakt van de opgenomen vetzuren weer vet en slaat dat op."];
  q.append(el("p",{class:"qtext"},UITSPRAKEN(S,"Geef bij elke uitspraak aan of hij juist of onjuist is.")));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  chipsStep(think,{q:"Wat ligt er binnen in een darmvlok? Kies alles wat klopt.",items:[["haarvaten",1],["een lymfevat",1],["de poortader",0],["de lever",0]],
    ok:"Goed: twee soorten vaatjes, met een verschillende wand. Bedenk bij elke uitspraak welk vat bedoeld wordt en waar het heen gaat.",no:"De vlok is maar ½ tot 1 mm groot. Wat past daar niet in?",onDone:unlock});
  juistOnjuist(ans,{id,stm:S,key:[true,false,false,true,true],
    uitleg:b=>{b.append(el("div",{class:"model"},"1 <b>juist</b> · 4 <b>juist</b> · 5 <b>juist</b>.<br>2 <b>onjuist</b>: de vetbolletjes zijn te groot voor de wand van een haarvat; ze gaan het lymfevat in.<br>3 <b>onjuist</b>: de poortader gaat eerst naar de lever. Alles goed: 2 punten, één fout: 1 punt."));
      stepAnim(b,[{cap:"In elke darmvlok liggen haarvaten en een lymfevat."},
        {cap:"Glucose en aminozuren: haarvat → <b>poortader</b> → eerst de <b>lever</b> → leverader → hart."},
        {cap:"Vet: in de epitheelcel weer vet, als bolletjes → lymfevat → borstbuis → ader vlak bij het hart. Het vet komt dus eerst in het hart en pas later in de lever."},
        {cap:"Twee routes naast elkaar. Daarom is uitspraak 3 onjuist en uitspraak 2 ook."}],(st,s,i)=>st.innerHTML=ROUTES(i));}});
  q.append(think,ans);
},STOF_WAND));

opgave("Van darm naar bloed","Van darm naar bloed","",ids);
}
