/* ===== Opgave 4: De mens als selectiefactor (EI-evolutie-M04) ===== */
{
const STOF_AB={titel:"Bacteriën en antibiotica",html:`
<p>Een antibioticum doodt bacteriën. In een grote groep bacteriën zitten soms een paar die door een toevallige mutatie een allel hebben waardoor het antibioticum hen niet doodt. Het antibioticum is dan een <b>selectiedruk</b>: de gevoelige bacteriën sterven, de resistente blijven over en delen zich.</p>
<p>Bacteriën delen zich soms al na twintig minuten. Door die korte <b>generatietijd</b> kan een populatie bacteriën in een paar dagen veranderen. Daarom is het belangrijk om antibiotica alleen te gebruiken als het echt nodig is.</p>`,
films:[F.e4]};
/* twee bacteriën, plasmide met resistentiegen; st 0 = E. coli met plasmide, 1 = buisje + kopie, 2 = Klebsiella resistent */
function M_bact(st){
  const bac=(x,naam,dna)=>`<rect x="${x}" y="60" width="200" height="110" rx="55" fill="var(--surface2)" stroke="var(--text)" stroke-width="2"/>`+
    `<path d="M${x+40},115 c10,-18 40,-18 50,0 s40,18 50,0" fill="none" stroke="var(--text2)" stroke-width="2.4"/>`+
    `<text x="${x+100}" y="196" text-anchor="middle" class="lbl"><tspan font-style="italic">${naam}</tspan></text>`+dna;
  const ring=(cx,cy,op=1)=>`<g opacity="${op}"><circle cx="${cx}" cy="${cy}" r="15" fill="none" stroke="var(--goud)" stroke-width="3.2"/><path d="M${cx+9},${cy-12} A15,15 0 0 1 ${cx+15},${cy}" stroke="var(--koraal)" stroke-width="6" fill="none"/></g>`;
  let s=bac(30,"E. coli",ring(190,146))+bac(330,"Klebsiella",st>=1?ring(490,146,st===1?.55:1):"");
  if(st>=1)s+=`<path d="M230,112 H330" stroke="var(--text)" stroke-width="5" stroke-linecap="round"/>`;
  s+=`<text x="${st===2?430:130}" y="36" text-anchor="middle" class="lbl" style="fill:var(--koraal)">${["plasmide met resistentiegen","kopie gaat door een buisje","nu ook resistent"][st]}</text>`;
  s+=`<path d="M40,232 h14" stroke="var(--text2)" stroke-width="2.4"/><text x="60" y="236" class="lblm">groot DNA-molecuul</text><circle cx="232" cy="232" r="7" fill="none" stroke="var(--goud)" stroke-width="3"/><text x="246" y="236" class="lblm">plasmide</text><rect x="342" y="226" width="14" height="10" fill="var(--koraal)"/><text x="362" y="236" class="lblm">resistentiegen</text>`;
  return `<div style="max-width:560px;margin:0 auto">`+svgWrap("0 0 560 250",s,"Een bacterie geeft een plasmide met een resistentiegen door aan een andere bacterie")+`</div>`;}

const q1=vraag(2,"resistent zonder mutatie",(q,id)=>{
  pre(q,"<p>Een bacterie van de soort <i>Klebsiella</i> wordt resistent tegen een antibioticum, terwijl er in haar eigen DNA geen mutatie is opgetreden.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit hoe dat kan."));
  choiceStep(think,{q:"Resistentie ligt vast in een gen. Als de bacterie het gen niet door een mutatie kreeg, waar kan het dan vandaan komen?",opts:["van een andere bacterie","het antibioticum maakt het gen aan","uit het voedsel van de bacterie"],right:0,
    ok:"Ja. Bij bacteriën kan DNA van de ene naar de andere bacterie gaan.",no:"Een antibioticum maakt geen genen. Waar zit nog meer DNA met resistentiegenen?",
    onDone:()=>choiceStep(think,{q:"Kan dat ook tussen twee bacteriën van verschillende soorten?",opts:["ja","nee, alleen binnen één soort"],right:0,
      ok:"Goed. Leg nu uit in welke vorm het gen wordt doorgegeven, en hoe.",no:"Denk aan de film: resistentie ‘springt over’ naar een andere soort.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "een andere bacterie (bv. <i>E. coli</i>) heeft een <b>plasmide</b> (klein ringetje DNA) met een <b>resistentiegen</b>",
    "die bacterie <b>geeft een kopie van het plasmide door</b> aan de <i>Klebsiella</i>-bacterie (via een dun buisje); dat kan ook tussen verschillende soorten"],
    model:"Een andere bacterie, bijvoorbeeld een <i>E. coli</i>, heeft een plasmide: een klein ringetje DNA met een resistentiegen. Via een dun buisje geeft die bacterie een kopie van het plasmide door aan de <i>Klebsiella</i>. Dat kan ook tussen bacteriën van verschillende soorten.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Naast hun grote DNA-molecuul hebben bacteriën vaak kleine ringetjes DNA: <b>plasmiden</b>. Op dit plasmide van een <i>E. coli</i> ligt een resistentiegen."},
      {cap:"De <i>E. coli</i> geeft via een dun buisje een <b>kopie</b> van het plasmide door aan de buurbacterie. Die hoeft niet dezelfde soort te zijn."},
      {cap:"Nu heeft de <i>Klebsiella</i> het resistentiegen ook, zonder dat er in haar eigen DNA iets is veranderd. Komt er antibioticum, dan overleeft zij."}],
      (st,s,i)=>st.innerHTML=M_bact(i)))});
  q.append(think,ans);
},STOF_AB);

opgave("Mens","De mens als selectiefactor","",[q1]);
}
