/* ===== Opgave 2: De reis door je buik (K207 gal, K209 darminfectie; film 2, ook film 3) ===== */
{
const STOF_VERT={titel:"Mechanische en chemische vertering",html:`
<p>Je eten gaat door één lange buis, van mond tot anus: het <b>spijsverteringskanaal</b>. Onderweg spuiten klieren er sappen in.</p>
<ul style="margin:0;padding-left:20px"><li><b>Mechanische vertering</b>: het eten wordt in kleinere stukjes verdeeld, bijvoorbeeld door kauwen of door het kneden van de maag. De moleculen blijven hetzelfde.</li>
<li><b>Chemische vertering</b>: enzymen knippen grote moleculen in kleine moleculen.</li></ul>
<p>Hoe kleiner de stukjes, hoe meer oppervlak er is waarop verteringssappen kunnen werken.</p>`,
films:[F.reis,F.enz]};
const STOF_DIKKE={titel:"Peristaltiek en de dikke darm",html:`
<p>In de wand van het hele spijsverteringskanaal zitten kringspieren. Achter de darminhoud knijpen ze samen, ervoor ontspannen ze: zo schuift een golf de inhoud verder. Die knijpbeweging heet <b>peristaltiek</b>.</p>
<p>Elke dag komt er zo'n negen liter vocht in je darmen: wat je drinkt, plus speeksel, maagsap, gal, alvleessap en darmsap. Het meeste neemt de dunne darm weer op. De <b>dikke darm</b> verteert zelf bijna niets; zijn belangrijkste taak is de rest van het water terugnemen: <b>waterresorptie</b>.</p>`,
films:[F.reis,F.bact]};

/* klik-animatie bij 'Laat zien waarom': gal emulgeert vet */
function GAL(stap){
  let s=`<rect x="0" y="0" width="560" height="230" fill="none"/>`;
  const vet=(cx,cy,r)=>`<circle cx="${cx}" cy="${cy}" r="${r}" fill="var(--goud-soft)" stroke="var(--goud)" stroke-width="2"/>`;
  const enz=(x,y)=>`<g transform="translate(${x},${y})"><path d="M-7,-6 a8,8 0 1,0 0,12 l6,-6 z" fill="var(--teal)"/></g>`;
  if(stap===0){s+=vet(280,115,80);[[188,115],[372,115],[280,23],[280,207]].forEach(([x,y])=>s+=enz(x,y));
    s+=`<text x="280" y="120" text-anchor="middle" class="lbl">één grote vetdruppel</text>`;}
  else if(stap===1){const d=[[120,60],[190,140],[260,70],[330,150],[400,65],[455,150],[150,190],[300,205],[420,205],[90,130],[360,100],[230,190]];
    d.forEach(([x,y])=>{s+=vet(x,y,20);s+=enz(x+24,y-6);});
    s+=`<text x="280" y="20" text-anchor="middle" class="lbl">dezelfde hoeveelheid vet in kleine druppeltjes</text>`;}
  else{const mol=(x,y)=>`<g transform="translate(${x},${y})"><rect x="-6" y="-26" width="12" height="52" rx="5" fill="var(--text2)"/><path d="M6,-20 h52 M6,0 h52 M6,20 h52" stroke="var(--goud)" stroke-width="4" stroke-linecap="round"/></g>`;
    s+=`<circle cx="140" cy="115" r="78" fill="var(--goud-soft)" stroke="var(--goud)" stroke-width="2"/>`+mol(110,115);
    s+=`<path d="M235,115 h80" stroke="var(--text2)" stroke-width="2" marker-end="url(#galp)"/><defs><marker id="galp" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--text2)"/></marker></defs>`;
    s+=`<circle cx="420" cy="115" r="40" fill="var(--goud-soft)" stroke="var(--goud)" stroke-width="2"/>`+mol(392,115);
    s+=`<text x="280" y="215" text-anchor="middle" class="lbl">het vetmolecuul zelf is na het emulgeren nog precies hetzelfde</text>`;}
  return svgWrap("0 0 560 230",s,"Gal verdeelt vet in kleine druppeltjes");}

const ids=[];
ids.push(vraag(2,"hoe gal helpt bij vet",(q,id)=>{
  pre(q,"<p>Gal is geen enzym, maar helpt wel bij de vertering van vet.</p>");
  const {think,ans,unlock}=start(q,B("a Leg uit hoe gal helpt.<br>b Is dat mechanische of chemische vertering? Leg je antwoord uit."));
  choiceStep(think,{q:"Wat is het verschil tussen mechanische en chemische vertering?",opts:["mechanisch: de stukjes worden kleiner, de moleculen blijven hetzelfde; chemisch: moleculen worden geknipt","mechanisch gebeurt in de mond, chemisch in de darm","mechanisch gebeurt met spieren, chemisch met zuur"],right:0,
    ok:"Goed. Daarmee kun je b beantwoorden. Nu a.",no:"Het verschil zit niet in de plek, maar in wat er met de moleculen gebeurt.",
    onDone:()=>choiceStep(think,{q:"Een blokje boter of dezelfde boter verdeeld over heel veel kleine druppeltjes: waarbij kan een enzym op meer plekken tegelijk werken?",opts:["bij het blokje","bij de kleine druppeltjes","het maakt niet uit"],right:1,
      ok:"Ja. Bedenk nu wat gal met het vet doet.",no:"Een enzym kan alleen aan de buitenkant van een druppel werken. Waar is meer buitenkant?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "a: gal verdeelt vet in <b>kleine druppeltjes</b> (emulgeren), waardoor de vetverterende enzymen er <b>beter bij kunnen</b> / een groter oppervlak hebben.",
    "b: <b>mechanisch</b>, want de vetmoleculen blijven heel (er wordt niets geknipt)."],
    model:"a Gal verdeelt het vet in heel veel kleine druppeltjes: emulgeren. Daardoor is er veel meer oppervlak, en kunnen de vetverterende enzymen er beter bij. b Dat is mechanische vertering: de druppels worden kleiner, maar de vetmoleculen blijven heel.",
    valkuil:"‘Mechanisch’ zonder uitleg levert voor b 0 punten op.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Eén grote vetdruppel: de vetverterende enzymen (blauw) kunnen alleen aan de buitenkant knippen."},
      {cap:"Gal verdeelt hetzelfde vet in kleine druppeltjes (emulgeren). Samen hebben die veel meer buitenkant: veel meer enzymen kunnen tegelijk knippen."},
      {cap:"De vetmoleculen zelf blijven heel: gal knipt niets en is geen enzym. Daarom is emulgeren <b>mechanische</b> vertering."}],
      (st,s,i)=>st.innerHTML=GAL(i)))});
  q.append(think,ans);
},STOF_VERT));

ids.push(vraag(2,"waterige ontlasting bij een darminfectie",(q,id)=>{
  pre(q,"<p>Bij een darminfectie wordt de ontlasting waterig.</p>");
  const {think,ans,unlock}=start(q,B("Geef twee oorzaken."));
  choiceStep(think,{q:"Wat is de belangrijkste taak van de dikke darm?",opts:["voedsel verteren","water terugnemen","vet opnemen"],right:1,
    ok:"Ja. Ontlasting wordt waterig als er meer water in de darm overblijft dan de darm terugneemt.",no:"De dikke darm verteert zelf bijna niets.",
    onDone:()=>choiceStep(think,{q:"Op welke twee manieren kan er meer water in de dikke darm overblijven?",opts:["de darm neemt minder water terug, of er komt extra vocht bij","je drinkt meer, of je eet minder","je maag maakt meer zuur, of je speeksel minder slijm"],right:0,
      ok:"Goed. Bedenk nu bij beide manieren wat een infectie in de dikke darm doet.",no:"Het gaat om wat er in de darm zelf gebeurt, niet om wat je eet of drinkt.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "De <b>peristaltiek</b> in de dikke darm is <b>sneller</b>, zodat er te weinig tijd is om water terug te nemen (waterresorptie).",
    "De aangetaste darmwand maakt (lekt) <b>extra vocht</b>."],
    model:"Bij een darminfectie gaat de peristaltiek in de dikke darm sneller. De inhoud zit er dan te kort in, en er is te weinig tijd om het water terug te nemen. Daarnaast maakt de aangetaste darmwand zelf extra vocht aan."});
  q.append(think,ans);
},STOF_DIKKE));

opgave("De reis door je buik","De reis door je buik","",ids);
}
