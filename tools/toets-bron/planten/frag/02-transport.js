/* ===== Opgave 2: Transport in de plant (EI-planten-B04, B09 uit toetsen-biologie) ===== */
{
const STOF_OSM={titel:"Osmose en opname door de wortel",html:`
<p><b>Osmose</b> is de beweging van water door een membraan dat wel water doorlaat, maar opgeloste stoffen moeilijk. Water gaat altijd naar de kant waar <b>meer opgeloste stoffen</b> zitten (de hoogste osmotische waarde).</p>
<p>Een plant haalt uit de bodem alleen water en mineralen. Stoffen die een cel opneemt tegen het concentratieverschil in, neemt hij op met <b>actief transport</b>: dat kost energie (ATP).</p>
<p>Hoe groter het oppervlak van een orgaan, hoe meer stoffen er per seconde over de grens kunnen.</p>`,
films:[F.trans]};
const q1=vraag(2,"water de wortel in",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Leg in drie stappen uit hoe water vanuit de bodem in de wortel komt. Begin bij de wortelharen."));
  choiceStep(think,{q:"Bij osmose gaat water naar de kant met…",opts:["meer opgeloste stoffen","minder opgeloste stoffen"],right:0,
    ok:"Ja. Onthoud die richting: die heb je in je uitleg nodig.",no:"Denk aan een plantencel in zout water: het water gaat de cel uit, naar het zout.",
    onDone:()=>choiceStep(think,{q:"Wortelharen zijn lange, dunne uitstulpingen van cellen in de wortel. Wat hebben ze voor nut?",opts:["ze maken het oppervlak van de wortel veel groter","ze houden de plant stevig in de grond","ze pompen het water omhoog"],right:0,
      ok:"Goed: dat is je eerste stap. Bedenk zelf de twee stappen die volgen, tot het water in de wortel is.",no:"Bedenk wat er gebeurt met de opname als er veel meer celoppervlak tegen het bodemwater ligt.",onDone:unlock})});
  openScore(ans,{id,pts:2,score:n=>n>=3?2:n===2?1:0,kop:"Vink elke stap aan die in jouw antwoord staat. Drie stappen: 2 punten, twee stappen: 1 punt, minder: 0 punten.",checks:[
    "wortelharen geven de wortel een <b>groot oppervlak</b>",
    "wortelcellen nemen <b>mineralen</b> op (vaak met actief transport), zodat er <b>meer opgeloste stoffen</b> in zitten dan in het bodemwater",
    "daardoor gaat water door <b>osmose</b> de wortel in (tot in de houtvaten)"],
    model:"Wortelharen geven de wortel een enorm oppervlak dat tegen het bodemwater ligt. De wortelcellen nemen mineralen op, vaak met actief transport, zodat er in de cellen meer opgeloste stoffen zitten dan in het bodemwater. Daardoor gaat water door osmose de wortel in, tot in de houtvaten.",
    valkuil:"‘De wortels zuigen het water op’ is geen stap: noem waaróm het water naar binnen gaat (meer opgeloste stoffen binnen, osmose).",
    after:()=>waaromBtn(ans,textBox("Het water gaat de wortel niet in omdat de wortel ‘zuigt’, maar door <b>osmose</b>: de wortelcellen hebben eerst mineralen opgenomen, vaak met actief transport. Daardoor is de osmotische waarde binnen hoger dan in het bodemwater, en gaat water naar binnen. De <b>wortelharen</b> zorgen dat dat over een heel groot oppervlak tegelijk gebeurt."))});
  q.append(think,ans);
},STOF_OSM);

/* Drukstroom in beeld: boven een houtvat, onder een zeefvat met begeleidende cellen; links blad (bron), rechts vrucht (put). */
function DRUK(st){
  const W=620,H=270;let s="";
  s+=`<text x="70" y="22" text-anchor="middle" class="lbl">blad (bron)</text><text x="${W-70}" y="22" text-anchor="middle" class="lbl">vrucht (put)</text>`;
  s+=`<rect x="20" y="34" width="${W-40}" height="44" rx="8" fill="var(--teal-soft)" stroke="var(--teal)" stroke-width="1.6"/><text x="${W/2}" y="61" text-anchor="middle" class="lblm">houtvat (xyleem)</text>`;
  s+=`<rect x="20" y="110" width="${W-40}" height="54" rx="8" fill="var(--surface2)" stroke="var(--text2)" stroke-width="1.6"/>`;
  [160,300,440].forEach(x=>s+=`<path d="M${x},110 v54" stroke="var(--text3)" stroke-width="2" stroke-dasharray="4 4"/>`);
  s+=`<text x="${W/2}" y="186" text-anchor="middle" class="lblm">zeefvat (floëem), met zeefplaten</text>`;
  s+=`<rect x="34" y="196" width="110" height="44" rx="10" fill="var(--groen-soft)" stroke="var(--groen)" stroke-width="1.6"/><text x="89" y="223" text-anchor="middle" class="lblm">begeleidende cel</text>`;
  const suiker=(x,y)=>`<circle cx="${x}" cy="${y}" r="5" fill="var(--goud)"/>`;
  if(st.pomp){s+=`<path d="M89,196 V170" stroke="var(--goud)" stroke-width="3" marker-end="url(#plpijl)"/>`;[[60,128],[80,146],[100,130],[120,148],[70,150],[110,124]].forEach(([x,y])=>s+=suiker(x,y));
    s+=`<text x="160" y="228" class="lbl">pompt suiker het zeefvat in</text>`;}
  else [[60,190+30],[90,210+10]].forEach(([x,y])=>s+=suiker(x,y));
  if(st.water){[60,110].forEach(x=>s+=`<path d="M${x},80 V106" stroke="var(--teal)" stroke-width="3" marker-end="url(#plpijlb)"/>`);s+=`<text x="128" y="99" class="lbl">water erin: druk hoog</text>`;}
  if(st.put){[[W-100,130],[W-70,146]].forEach(([x,y])=>s+=suiker(x,y));s+=`<path d="M${W-85},164 V${H-20}" stroke="var(--goud)" stroke-width="3" marker-end="url(#plpijl)"/><text x="${W-95}" y="${H-24}" text-anchor="end" class="lbl">suiker eruit: druk laag</text>`;
    s+=`<path d="M${W-60},106 V82" stroke="var(--teal)" stroke-width="3" marker-end="url(#plpijlb)"/>`;}
  if(st.stroom)s+=`<path d="M170,137 H${W-150}" stroke="var(--koraal)" stroke-width="5" marker-end="url(#plpijlk)"/><text x="440" y="99" text-anchor="middle" class="lbl">sap stroomt van hoge naar lage druk</text>`;
  const m=(id,c)=>`<marker id="${id}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${c}"/></marker>`;
  return svgWrap(`0 0 ${W} ${H}`,`<defs>${m("plpijl","var(--goud)")}${m("plpijlb","var(--teal)")}${m("plpijlk","var(--koraal)")}</defs>`+s,"Drukstroom in een zeefvat van bron naar put");}

const STOF_VATEN={titel:"Twee soorten vaten",html:`
<p>In elke vaatbundel zitten twee soorten vaten. De <b>houtvaten</b> (xyleem) zijn dode, holle buizen: ze vervoeren water met mineralen van de wortels omhoog, altijd één kant op. De <b>bastvaten</b> of zeefvaten (floëem) zijn levende cellen met zeefplaten: ze vervoeren opgeloste suiker uit de bladeren naar plekken die suiker verbruiken of opslaan, in twee richtingen.</p>
<p>Een vloeistof in een buis stroomt altijd van een plek met hoge druk naar een plek met lage druk.</p>`,
films:[F.trans]};
const q2=vraag(3,"de drukstroomtheorie",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Beschrijf de drukstroomtheorie in drie stappen: van een blad (bron) naar een vrucht (put)."));
  selectsStep(think,{uid:"q"+id,q:"Is het een bron of een put voor suiker?",rows:[
    ["blad in de zon",["bron","put"],0],["groeiende vrucht",["bron","put"],1],["wortel in de zomer",["bron","put"],1]],
    ok:"Goed. In het floëem gaat het sap van bron naar put. Maar wat duwt het sap vooruit?",no:"Een bron maakt suiker of geeft het af; een put verbruikt of slaat het op.",
    onDone:()=>choiceStep(think,{q:"Wat gebeurt er met een cel of vat als de concentratie opgeloste suiker erin stijgt?",opts:["er gaat water uit, door osmose","er stroomt water in, door osmose","er gebeurt niets met het water"],right:1,
      ok:"Ja. En wat doet dat instromende water met de druk in het zeefvat? Maak nu de drie stappen: bron, druk, put.",no:"Water gaat naar de kant met meer opgeloste stoffen.",onDone:unlock})});
  openAnswer(ans,{id,pts:3,checks:[
    "in het blad (de bron) pompt de <b>begeleidende cel</b> suiker het zeefvat in",
    "daardoor stijgt de osmotische waarde, stroomt er <b>water uit de houtvaten</b> het zeefvat in en wordt de <b>druk hoog</b>",
    "in de vrucht (de put) worden de suikers eruit gehaald en gaat ook water weg, zodat de <b>druk daar laag</b> is; het sap stroomt van hoge naar lage druk, van bron naar put"],
    model:"In het blad pompt de begeleidende cel suiker het zeefvat in. Daardoor stijgt de osmotische waarde en stroomt er water uit de houtvaten ernaast het zeefvat in: de druk wordt hoog. In de vrucht worden de suikers eruit gehaald en gaat er ook water weg, dus is de druk daar laag. Het sap stroomt van hoge naar lage druk, van bron naar put.",
    valkuil:"‘De suiker diffundeert naar de vrucht’ of ‘de vrucht zuigt de suiker aan’ is niet de drukstroomtheorie: het sap wordt door een drukverschil geduwd, en dat drukverschil ontstaat door osmose.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"In het blad (de bron) pompt de begeleidende cel suiker het zeefvat in. De osmotische waarde in het zeefvat stijgt.",pomp:1},
      {cap:"Door osmose stroomt water uit het houtvat ernaast het zeefvat in. In het zeefvat bij het blad wordt de druk hoog.",pomp:1,water:1},
      {cap:"In de vrucht (de put) worden de suikers eruit gehaald, en gaat ook het water weg: daar is de druk laag.",pomp:1,water:1,put:1},
      {cap:"Het sap stroomt van hoge naar lage druk, van bron naar put. Een bladluis hoeft daarom niet te zuigen: het sap wordt vanzelf in zijn monddeel geperst.",pomp:1,water:1,put:1,stroom:1}],
      (st,s)=>st.innerHTML=DRUK(s)))});
  q.append(think,ans);
},STOF_VATEN);

opgave("Transport","Transport in de plant",`<p>De volgende twee vragen gaan over het transport van water en suiker in een plant.</p>`,[q1,q2]);
}
