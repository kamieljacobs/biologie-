/* ===== Opgave 2: Een himalayakonijn in de kou (J02) ===== */
{
const STOF={titel:"Enzymen, temperatuur en het milieu",html:`
<p>Een allel bevat de instructie voor een eiwit. Is dat eiwit een <b>enzym</b>, dan werkt het alleen als het de juiste vorm heeft. Temperatuur kan die vorm veranderen: bij de ene temperatuur werkt een enzym goed, bij een andere minder of helemaal niet.</p>
<p>Zo kan het <b>milieu</b> (hier: de temperatuur) via een enzym het <b>fenotype</b> beïnvloeden, terwijl het genotype hetzelfde blijft. Alle lichaamscellen van een dier komen uit één bevruchte eicel en hebben dus dezelfde allelen.</p>`,
films:[F.chrom,F.voorbij]};
/* konijn van opzij; donker = welke delen pigment hebben; ijs = plek met ijszak */
function KONIJN({donker=false,warm=false,ijs=false,lab=""}={}){
  const pt=donker?"var(--text)":"var(--surface)",S="var(--surface)",T=warm?"var(--koraal-soft)":"none";
  const romp=`<ellipse cx="300" cy="135" rx="120" ry="58"/>`,kop=`<ellipse cx="180" cy="98" rx="46" ry="38"/>`;
  let s=`<g fill="${S}" stroke="var(--text2)" stroke-width="1.6">${romp}${kop}</g><g fill="${T}" stroke="none">${romp}${kop}</g>`;
  s+=`<circle cx="410" cy="150" r="20" fill="${pt}" stroke="var(--text2)" stroke-width="1.4"/>`;/* staart */
  s+=`<path d="M176,64 C164,18 176,4 188,8 C198,14 194,44 190,64 Z M196,64 C200,22 214,10 224,16 C232,24 216,50 206,68 Z" fill="${pt}" stroke="var(--text2)" stroke-width="1.4"/>`;/* oren */
  s+=`<ellipse cx="138" cy="106" rx="10" ry="8" fill="${pt}" stroke="var(--text2)" stroke-width="1.2"/><circle cx="168" cy="92" r="3.5" fill="${donker?"var(--surface)":"var(--text)"}"/>`;/* neus, oog */
  [[230,178],[268,182],[340,182],[378,178]].forEach(([x,y])=>s+=`<rect x="${x-10}" y="${y}" width="22" height="34" rx="9" fill="${pt}" stroke="var(--text2)" stroke-width="1.4"/>`);
  if(ijs)s+=`<rect x="276" y="86" width="64" height="30" rx="6" fill="var(--text)" stroke="var(--teal)" stroke-width="3"/>`;
  return svgWrap("110 0 340 262",s+(lab?`<text x="280" y="250" text-anchor="middle" class="lbl" style="font-size:17px">${lab}</text>`:""),"Himalayakonijn");}
const q1=vraag(2,"temperatuur en een enzym",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Leg met behulp van de proef met de ijszak uit waarom een himalayakonijn donkere oren, poten, staart en neus heeft en verder een witte vacht."));
  choiceStep(think,{q:"Op de rug groeit onder de ijszak zwart haar terug. Wat zegt dat over het enzym voor zwart pigment?",opts:["het werkt bij een lage temperatuur","het werkt alleen bij lichaamstemperatuur","het allel op die plek is veranderd"],right:0,
    ok:"Ja. En wat gebeurt er dan op de rest van de rug, zonder ijszak?",no:"De cellen op de rug hebben dezelfde allelen als vóór de proef. Alleen de temperatuur is veranderd.",
    onDone:()=>choiceStep(think,{q:"Welke delen van een konijn zijn kouder dan de romp?",opts:["oren, poten, staart en neus","de buik en de rug","geen enkel deel: het hele lichaam is even warm"],right:0,
      ok:"Goed. Zet nu de proef en de lichaamstemperatuur samen in je uitleg.",no:"Welke delen steken uit en geven veel warmte af?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Uit de proef blijkt dat het enzym bij een <b>lage temperatuur</b> werkt (pigment, zwart haar) en bij lichaamstemperatuur niet (wit haar).",
    "Oren, poten, staart en neus zijn <b>kouder</b> dan de romp, dus daar wordt wel pigment gemaakt."],
    model:"Onder de ijszak groeit zwart haar: het enzym werkt dus bij een lage temperatuur, maar niet bij de gewone lichaamstemperatuur van de romp. Oren, poten, staart en neus steken uit en zijn kouder dan de romp. Daar werkt het enzym wel en wordt zwart pigment gemaakt; op de warme romp niet, dus daar blijft de vacht wit.",
    valkuil:"‘De cellen in de oren hebben een ander allel’ levert 0 punten op: alle cellen hebben dezelfde allelen, alleen de temperatuur verschilt.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Alle cellen van het konijn hebben hetzelfde allel: overal dezelfde instructie voor het enzym.",k:0},
      {cap:"De romp is warm (lichaamstemperatuur): het enzym werkt niet, er komt geen pigment en het haar is wit.",k:1},
      {cap:"Oren, poten, staart en neus zijn kouder: daar werkt het enzym wel en wordt het haar donker.",k:2},
      {cap:"De proef: onder de ijszak wordt de huid koud. Het nieuwe haar groeit daar zwart terug. Zelfde genotype, ander milieu, ander fenotype.",k:3}],
      (st,s)=>{const lab=["zelfde allel in elke cel","romp warm: geen pigment, wit","koele uiteinden: pigment, donker","onder de ijszak koud: zwart haar"][s.k];
        st.innerHTML=KONIJN({donker:s.k>=2,warm:s.k>=1,ijs:s.k===3,lab});}))});
  q.append(think,ans);
},STOF);
opgave("Himalayakonijn","Een himalayakonijn in de kou",`
<p>Een himalayakonijn heeft een witte vacht met donkere oren, poten, staart en neus.</p>
<p>Bij een proef scheert men een stukje vacht op de rug van een himalayakonijn weg en legt men er een tijd een ijszak op. Het haar op die plek groeit zwart terug.</p>
<p>Voor het maken van zwart pigment in de haren is een enzym nodig. Het allel van het himalayakonijn codeert voor een vorm van dit enzym die gevoelig is voor temperatuur.</p>`,[q1]);
}
