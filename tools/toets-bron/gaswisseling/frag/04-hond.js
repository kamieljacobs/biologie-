/* ===== Opgave 4: Een hond die hijgt (eigen vragen C01, C02, C04 uit toetsen-biologie) ===== */
{
const STOF_HUID={titel:"De huid en je temperatuur",html:`
<p>De huid bestaat van buiten naar binnen uit de <b>opperhuid</b> (met bovenaan de hoornlaag en onderin de kiemlaag), de <b>lederhuid</b> en het <b>onderhuids bindweefsel</b> met vet. In de huid liggen onder andere bloedvaten, zweetklieren, talgklieren, haarzakjes en zintuigen.</p>
<p>De temperatuur binnen in je lichaam blijft rond de 37 graden. De <b>hypothalamus</b> in de hersenen is het regelcentrum. Wordt het bloed te warm, dan worden de bloedvaten in de huid wijder en maken de zweetklieren meer zweet.</p>`,
films:[F.uit]};
const STOF_TK={titel:"Negatieve terugkoppeling",html:`
<p>Bij <b>negatieve terugkoppeling</b> remt het gevolg zijn eigen oorzaak. Een regelkring heeft een <b>sensor</b> die iets meet, een <b>regelcentrum</b> dat vergelijkt met de gewenste waarde, en een <b>uitvoerder</b> die iets verandert. Zo blijft een waarde binnen grenzen, zoals de temperatuur binnen in je lichaam of het koolstofdioxide in je bloed.</p>
<p>Een grafiek met twee lijnen lees je per tijdvak: wat doet de ene lijn, wat doet de andere lijn, en wat gebeurt er eerst?</p>`,
films:[F.uit,F.gas]};
const STOF_UIT={titel:"Wat is uitscheiding?",html:`
<p><b>Uitscheiding</b> is het kwijtraken van afvalstoffen die je eigen cellen maken, en van wat je te veel hebt aan water en zouten. Ontlasting bestaat vooral uit resten van je eten die je nooit hebt opgenomen: die zijn alleen door je darmen gereisd, en dat is dus geen uitscheiding.</p>
<p>Verschillende organen scheiden uit, elk op hun eigen manier en elk met hun eigen afvalstoffen.</p>`,
films:[F.uit]};

const q1=vraag(2,"zweetklieren en afkoelen",(q,id)=>{
  pre(q,"<p>Bij een mens zitten zweetklieren over de hele huid.</p>");
  q.append(el("p",{class:"qtext"},"– <b>Noteer in welke laag van de huid de zweetklieren liggen.</b><br>– <b>Leg uit hoe zweet een mens afkoelt.</b>"));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  seqStep(think,{q:"Zet de lagen van de huid op volgorde, van buiten naar binnen.",items:["opperhuid","lederhuid","onderhuids bindweefsel"],shown:[2,0,1],
    ok:"Goed. Bedenk in welke van deze lagen bloedvaten, klieren en haarzakjes liggen.",
    onDone:()=>choiceStep(think,{q:"Wanneer koelt zweet je níet af?",opts:["als het van je huid af druipt","als het op je huid verdampt"],right:0,
      ok:"Ja. Het zweet moet dus iets dóén op je huid om je af te koelen. Wat heeft dat nodig?",no:"Denk aan een zweetdruppel die op de grond valt.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "in de <b>lederhuid</b>",
    "het zweet <b>verdampt</b>; verdampen kost warmte, die uit de huid komt"],
    model:"De zweetklieren liggen in de lederhuid. Zweet koelt doordat het verdampt: om te verdampen heeft water veel warmte nodig, en die haalt het uit de huid.",
    valkuil:"‘Het zweet neemt warmte mee naar buiten’: 0 punten voor het tweede element. Zweet dat van je huid af druipt, koelt niet.",
    after:()=>waaromBtn(ans,textBox("Om water te laten verdampen is energie nodig: warmte. Verdampt zweet op je huid, dan haalt het die warmte uit je huid, en het bloed dat daar stroomt koelt af. Daarom koelt zweet minder als de lucht vochtig is (het verdampt dan slecht), en daarom koelt een hond via de natte bek en luchtwegen: ook daar verdampt water."))});
  q.append(think,ans);
},STOF_HUID);

const q2=vraag(2,"hijgen als negatieve terugkoppeling",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Leg met afbeelding 1 uit dat het hijgen van de hond deel is van een negatieve terugkoppeling."));
  choiceStep(think,{q:"Wat is negatieve terugkoppeling?",opts:["het gevolg remt zijn eigen oorzaak","het gevolg versterkt zijn eigen oorzaak","twee dingen gebeuren toevallig tegelijk"],right:0,
    ok:"Ja. Lees nu de grafiek af.",no:"Negatief = tegenwerken.",
    onDone:()=>selectsStep(think,{uid:"q"+id,q:"Wat doen de lijnen in afbeelding 1?",rows:[
      ["0–25 min: lichaamstemperatuur",["stijgt","daalt","blijft gelijk"],0],["0–25 min: ademfrequentie",["stijgt","daalt","blijft gelijk"],0],
      ["30–60 min: lichaamstemperatuur",["stijgt","daalt","blijft gelijk"],1],["30–60 min: ademfrequentie",["stijgt","daalt","blijft gelijk"],1]],
      ok:"Goed afgelezen. Leg nu uit hoe de temperatuur het hijgen beïnvloedt, en hoe het hijgen de temperatuur beïnvloedt.",no:"Kijk per tijdvak naar het begin en het eind van elke lijn.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Als de lichaamstemperatuur <b>stijgt</b>, stijgt ook de <b>ademfrequentie</b> (meer hijgen) (0–30 min).",
    "Door het hijgen <b>verdampt er water</b>, dat kost warmte, waardoor de temperatuur daalt; als de temperatuur daalt, neemt het hijgen weer af (30–60 min): het gevolg remt zijn oorzaak."],
    model:"Tussen 0 en 30 minuten stijgt de lichaamstemperatuur van de hond, en tegelijk stijgt de ademfrequentie: hij gaat harder hijgen. Door het hijgen verdampt er water uit de bek en de luchtwegen, en dat kost warmte: de temperatuur daalt. Daarna (30–60 min) daalt de temperatuur, en neemt ook het hijgen weer af. Het gevolg (afkoelen) remt de oorzaak (de hoge temperatuur): negatieve terugkoppeling.",
    valkuil:"‘Na 30 minuten daalt alles omdat hij gaat rusten’ zonder de koppeling hijgen → afkoelen: maximaal 1 punt. Ook goed voor het tweede element: tussen 25 en 30 minuten stijgt de temperatuur niet meer terwijl de hond maximaal hijgt: het hijgen houdt de stijging tegen.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"0–25 min: de temperatuur stijgt (doorgetrokken lijn), en de hond gaat steeds sneller hijgen (stippellijn).",o:{hl:[[0,25,"var(--koraal)"]]}},
      {cap:"25–30 min: de hond hijgt maximaal. De temperatuur stijgt niet meer, ook al loopt hij nog in de zon: het verdampen van water houdt de stijging tegen.",o:{hl:[[25,30,"var(--goud)"]]}},
      {cap:"30–60 min: de temperatuur daalt, en het hijgen neemt weer af. Is de oorzaak weg, dan stopt ook de reactie: negatieve terugkoppeling.",o:{hl:[[30,60,"var(--teal)"]]}}],
      (st,s)=>st.innerHTML=HOND(s.o)))});
  q.append(think,ans);
},STOF_TK);

const q3=vraag(2,"andere uitscheidingsorganen",(q,id)=>{
  const {think,ans,unlock}=start(q,"Een hond scheidt via zijn huid bijna niets uit. "+B("Noem twee andere organen waarmee een hond afvalstoffen uitscheidt, en noteer bij elk orgaan één afvalstof die het uitscheidt."));
  choiceStep(think,{q:"Wat valt onder uitscheiding?",opts:["afvalstoffen die je eigen cellen maken (en te veel water en zouten) kwijtraken","onverteerde resten van je eten kwijtraken","allebei"],right:0,
    ok:"Ja. Denk nu aan afvalstoffen die bij de stofwisseling ontstaan, zoals bij de verbranding van glucose en bij de afbraak van aminozuren.",no:"Onverteerde voedselresten zijn nooit in je cellen geweest.",onDone:unlock});
  openAnswer(ans,{id,pts:2,checks:[
    "<b>longen</b>: koolstofdioxide",
    "<b>nieren</b>: ureum (of <b>lever</b>: galkleurstof met de gal)"],
    model:"De longen scheiden koolstofdioxide uit (met de uitgeademde lucht). De nieren scheiden ureum uit met de urine. Ook goed: de lever scheidt galkleurstof uit met de gal.",
    valkuil:"Water of zouten mogen ook bij de nieren. Darm met onverteerde voedselresten: 0 punten.",
    after:()=>waaromBtn(ans,textBox("Uitscheidingsorganen en hun afval: <b>longen</b> koolstofdioxide en waterdamp; <b>nieren</b> ureum, water en zouten (urine); <b>lever</b> galkleurstof uit oude rode bloedcellen, via de gal naar de darm; <b>huid</b> water, zouten en een beetje ureum (zweet). Bij een hond valt de huid bijna weg, want hij zweet alleen via zijn voetzolen."))});
  q.append(think,ans);
},STOF_UIT);

opgave("Hond","Een hond die hijgt",`
<p>Een hond heeft alleen zweetklieren in zijn voetzolen. Hij raakt zijn warmte vooral kwijt door te hijgen: snel en oppervlakkig ademen met de bek open en de tong naar buiten. Daarbij verdampt water uit de bek en de luchtwegen. Bij een hoge luchtvochtigheid kan een hond via hijgen minder water verdampen.</p>
<p>In afbeelding 1 zie je de lichaamstemperatuur en de ademfrequentie van een hond tijdens een wandeling op een warme dag. De eerste 30 minuten loopt hij in de zon, daarna rust hij in de schaduw.</p>
<div class="eyebrow">afbeelding 1 (fictieve gegevens)</div>${HOND()}`,[q1,q2,q3]);
}
