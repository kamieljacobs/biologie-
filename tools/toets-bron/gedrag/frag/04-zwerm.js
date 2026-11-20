/* ===== Opgave 4: Een zwerm zoekt een nieuw huis (EI-gedrag-A01, A02 havo, A03) ===== */
{
const TAB1=TABEL(1,["tijdstip","9.00","11.00","13.00","15.00"],[["holte P","2","8","25","60"],["holte Q","3","5","4","1"]],
  "Aantal verkensters dat op de tros danst voor holte P (groot, droog) en holte Q (klein, tochtig) (fictieve gegevens)");
const STOF_ZO={titel:"Slim zonder baas",html:`
<p>Bij sociale insecten zoals bijen en mieren geeft niemand bevelen. Een koningin legt eieren, maar ze is geen baas en weet niet wat er buiten gebeurt.</p>
<p>Elke werkster volgt een paar eenvoudige regels en reageert op wat ze tegenkomt. Geen enkele werkster overziet het geheel. Toch ontstaat er slim gedrag van de hele groep, zoals een mierenstraat over de kortste route. Dat heet <b>zelforganisatie</b>: het slimme gedrag zit niet in één dier, maar in de samenwerking.</p>
<p>Een verkenster vertelt met een dans waar iets goeds is: hoe beter het voedsel, hoe vaker ze de dans herhaalt.</p>`,
films:[F.mier,F.bij]};
const STOF_TK={titel:"Een signaal dat zichzelf versterkt",html:`
<p>Een mier die voedsel vindt, legt op de terugweg een geurspoor (feromonen). Andere mieren volgen het spoor. Vinden zij ook voedsel, dan leggen ze er ook geur bij. Het spoor wordt sterker, er volgen nog meer mieren, en het wordt nog sterker. Dat heet <b>positieve terugkoppeling</b>.</p>
<p>Zo werd bij de twee bruggetjes de korte brug de drukste: mieren op de korte brug waren eerder terug, dus daar kwam sneller geur bij. Geen enkele mier had de bruggen vergeleken.</p>
<p>In een tabel lees je zo'n proces af aan hoe een aantal per tijdstip verandert: neemt het steeds sneller toe, of neemt het af?</p>`,
films:[F.mier]};

/* animatie bij vraag 'vijftien bijen': verkensters bij twee holtes, drempel van 15 */
function QUORUM({p,q,vertrek=false}){
  let s="";const Y0=200,h=v=>v*9;
  s+=`<path d="M60,${Y0-h(15)} H520" stroke="var(--goud)" stroke-width="2.2" stroke-dasharray="7 5"/><text x="524" y="${Y0-h(15)+4}" class="lbl" style="fill:var(--goud-text)">± 15</text>`;
  s+=`<path d="M60,${Y0} H520" stroke="var(--text2)" stroke-width="1.4"/>`;
  [["holte P (groot, droog)",p,150],["holte Q (klein, tochtig)",q,340]].forEach(([n,v,x])=>{
    for(let k=0;k<v;k++){const r=Math.floor(k/5),c=k%5;s+=`<circle cx="${x+c*14}" cy="${Y0-8-r*14}" r="5.5" fill="var(--text)"/>`;}
    s+=`<text x="${x+28}" y="${Y0+22}" text-anchor="middle" class="lblm">${n}</text><text x="${x+28}" y="${Y0+40}" text-anchor="middle" class="lbl">${v} bijen</text>`;});
  if(vertrek)s+=`<text x="178" y="36" text-anchor="middle" class="lbl" style="fill:var(--groen)">vertrek naar P</text>`;
  return `<div class="vpfig" style="max-width:560px;margin:0 auto;width:100%;--min:440px">`+svgWrap("0 0 560 250",s,"Aantal verkensters bij holte P en holte Q, met de drempel van ongeveer vijftien")+`</div>`;}

const a1=vraag(2,"waarom pas bij vijftien bijen?",(q,id)=>{
  const {think,ans,unlock}=start(q,"De zwerm vertrekt pas als ongeveer vijftien bijen tegelijk bij één holte zijn, en niet al als de eerste verkenster een holte heeft gevonden. "+B("Leg uit waarom dit voor de zwerm voordelig is."));
  choiceStep(think,{q:"Stel dat de zwerm al vertrekt zodra één verkenster danst. Wie heeft de holte dan bekeken?",opts:["alleen die ene verkenster","honderden verkensters","de koningin"],right:0,
    ok:"Ja. Wat kan daar het risico van zijn?",no:"Er heeft dan nog maar één bij gedanst. Hoeveel bijen zijn er dan al gaan kijken?",
    onDone:()=>choiceStep(think,{q:"Bij welke holte komen er volgens de inleiding sneller nieuwe bezoekers bij?",opts:["bij de holte die als eerste gevonden is","bij een betere holte, want daarvoor wordt langer gedanst","bij alle holtes even snel"],right:1,
      ok:"Goed. Leg nu uit wat het wachten tot ongeveer vijftien bijen de zwerm oplevert.",no:"Lees de inleiding nog eens: wat doet een verkenster bij een betere holte?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Eén verkenster kan een <b>slechte holte</b> hebben gevonden (de eerst gevonden holte is vaak niet de beste).",
    "Als pas vertrokken wordt bij veel bijen tegelijk bij één holte, hebben <b>veel verkensters</b> die holte bezocht en goed gevonden / heeft de <b>betere holte de tijd</b> gehad om de meeste dansers te krijgen, zodat de zwerm meestal de beste holte kiest."],
    model:"De eerste holte die een verkenster vindt, is vaak niet de beste. Vertrekt de zwerm meteen, dan kan hij in een slechte holte terechtkomen. Door te wachten tot ongeveer vijftien bijen tegelijk bij één holte zijn, hebben veel verkensters die holte zelf bekeken en goed gevonden. Een betere holte krijgt langere dansen en dus sneller nieuwe bezoekers, zodat die meestal als eerste de vijftien haalt.",
    valkuil:"Alleen ‘dan weten ze het zeker’ zonder uitleg: 0 punten.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Stel: de eerste verkenster vindt holte Q, die klein en tochtig is. Zou de zwerm nu al vertrekken, dan koos hij een slechte holte.",o:{p:0,q:1}},
      {cap:"Andere verkensters vinden ook holte P. Voor P wordt langer gedanst, dus daar gaan sneller nieuwe bijen kijken.",o:{p:5,q:3}},
      {cap:"Bij P lopen de aantallen snel op, bij Q nauwelijks.",o:{p:11,q:4}},
      {cap:"Bij P zijn ongeveer vijftien bijen tegelijk: veel bijen hebben P bekeken en goed gevonden. Nu vertrekt de zwerm, naar de betere holte.",o:{p:15,q:3,vertrek:true}}],
      (st,s)=>st.innerHTML=QUORUM(s.o)))});
  q.append(think,ans);
},STOF_ZO);

const ids=[a1];
if(!VWO){
ids.push(vraag(1,"vijf holtes, langer wachten",(q,id)=>{
  const {think,ans,unlock}=start(q,"Onderzoekers boden een zwerm vijf even goede holtes aan in plaats van twee. De zwerm deed er toen bijna twee keer zo lang over om te vertrekken. "+B("Welke verklaring past bij de werkwijze van de zwerm?"));
  choiceStep(think,{q:"Wie beslist in de zwerm waar hij naartoe gaat?",opts:["de koningin","één leider die alle holtes vergelijkt","niemand: het volgt uit wat elke verkenster doet"],right:2,
    ok:"Ja. Wat moet er bij één holte gebeuren voordat de zwerm vertrekt? Bedenk wat er met dat aantal gebeurt als de verkensters over vijf holtes verdeeld zijn.",no:"Lees de inleiding nog eens: geeft iemand een opdracht?",onDone:unlock});
  mc(ans,{qid:id,pts:1,right:1,opts:["De verkensters moeten meer holtes met elkaar vergelijken, en dat kost meer tijd.","De verkensters verdelen zich over meer holtes, waardoor het aantal bijen bij elke holte langzamer oploopt tot ongeveer vijftien.","De koningin heeft meer tijd nodig om te beslissen.","Bij vijf holtes dansen de verkensters korter, omdat de holtes minder goed zijn."],
    onChecked:()=>waaromBtn(ans,textBox("Het antwoord is <b>B</b>. De zwerm vertrekt pas als ongeveer vijftien bijen tegelijk bij één holte zijn. Zijn de verkensters over vijf holtes verdeeld, dan duurt het langer voordat één holte dat aantal haalt.<br>A: geen bij vergelijkt holtes; dat is de misvatting van een ‘slimme beslisser’. C: de koningin geeft geen opdrachten. D: de holtes waren even goed."))});
  q.append(think,ans);
},STOF_ZO));
}

ids.push(vraag(2,"de dansers voor Q verdwijnen",(q,id)=>{
  const {think,ans,unlock}=start(q,"Volgens tabel 1 daalt het aantal dansers voor holte Q na 11.00 uur, terwijl het aantal voor P blijft stijgen. Holte Q is er gewoon nog. "+B("Leg met de inleiding uit hoe het komt dat de dansers voor Q verdwijnen en die voor P niet. Vergelijk met de mierenstraat uit de film."));
  choiceStep(think,{q:"Wat doet een verkenster na een paar bezoeken aan haar holte, volgens de inleiding?",opts:["ze danst steeds langer","ze houdt op met dansen","ze gaat voor een andere holte dansen"],right:1,
    ok:"Ja, en dat geldt voor de dansers van P én van Q. Waarom groeit P dan toch?",no:"Lees de laatste zin van de inleiding nog eens.",
    onDone:()=>choiceStep(think,{q:"Voor welke holte duren de dansen het langst, zodat er de meeste nieuwe verkensters gaan kijken?",opts:["holte P (groot, droog)","holte Q (klein, tochtig)"],right:0,
      ok:"Goed. Vergelijk voor P en voor Q: komen er meer dansers bij dan er stoppen, of minder? Zoek daarna bij de mierenstraat wat ook zo werkt als het stoppen van de dansers.",no:"Hoe beter de holte, hoe langer de dans.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Elke verkenster houdt na een paar bezoeken <b>op met dansen</b>; voor Q (korte dansen) komen er <b>minder nieuwe dansers bij dan er stoppen</b>, voor P (lange dansen) meer, dus Q verdwijnt en P groeit.",
    "Het stoppen werkt als een <b>rem</b>, zoals het <b>verdampen van de geur</b> bij de mierenstraat: zonder nieuwe aanvoer verdwijnt het signaal vanzelf."],
    model:"Elke verkenster danst na elk bezoek iets korter en houdt na een paar bezoeken op. Voor Q, een slechte holte, zijn de dansen kort, dus er gaan weinig nieuwe verkensters kijken: er stoppen meer dansers dan er bijkomen, en Q verdwijnt vanzelf. Voor P zijn de dansen lang, dus er komen meer nieuwe dansers bij dan er stoppen, en P groeit. Het stoppen werkt als een rem, net als het verdampen van de geur bij de mierenstraat: komt er geen nieuwe geur bij, dan verdwijnt het spoor vanzelf.",
    valkuil:"‘De bijen kiezen voor P omdat P beter is’ legt niet uit waarom de dansers voor Q verdwijnen: geen bij vergelijkt de holtes. Noem het stoppen van de dansers én de vergelijking met de geur die verdampt.",
    after:()=>waaromBtn(ans,textBox("Er werken twee dingen tegelijk. Dansen brengen nieuwe dansers (positieve terugkoppeling), en elke danser stopt na een paar bezoeken (een rem). Bij P wint de terugkoppeling, want de dansen zijn lang: 2 → 8 → 25 → 60. Bij Q wint de rem: 3 → 5 → 4 → 1. Bij de mieren is het verdampen van de geur de rem: is het voedsel op, dan legt niemand meer geur en verdwijnt het spoor. Zo verdwijnt een slechte keuze vanzelf, zonder dat iemand beslist."))});
  q.append(think,ans);
},STOF_TK));

opgave("Bijenzwerm","Een zwerm zoekt een nieuw huis",`
<p>In het voorjaar verlaat een oude bijenkoningin met een groot deel van de werksters de kast. Duizenden bijen hangen als een tros aan een tak: een zwerm. Een paar honderd verkensters vliegen uit om een nieuwe woonplek te zoeken, meestal een holte in een boom.</p>
<p>Een verkenster die een holte heeft gevonden, danst op de tros een kwispeldans voor die holte. Hoe beter de holte, hoe langer ze danst. Andere verkensters gaan dan zelf kijken, en dansen ook als zij de holte goed vinden. In een proef kreeg een uitstekende holte samen 100 rondjes dans, een middelmatige holte 12. Zijn bij één holte ongeveer vijftien of meer bijen tegelijk, dan maken ze de zwerm klaar voor vertrek en vliegt de hele zwerm daarheen. Een verkenster danst na elk nieuw bezoek aan haar holte iets korter, en houdt na een paar bezoeken op met dansen (vereenvoudigd).</p>
${TAB1}`,ids);
}
