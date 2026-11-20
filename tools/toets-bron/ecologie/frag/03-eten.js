/* ===== Opgave 3: Eten en samenleven (EI-ecologie-KI03) ===== */
{
const STOF_RP={titel:"Rover en prooi",html:`
<p>Een <b>rover</b> (predator) leeft van een <b>prooi</b>. De aantallen van de twee hangen van elkaar af: hoeveel rovers er zijn, heeft invloed op de prooien, en hoeveel prooien er zijn, heeft invloed op de rovers. Daardoor schommelen hun aantallen vaak in golven.</p>
<p>In de film: de sneeuwschoenhaas en de lynx in Canada, met golven van ongeveer tien jaar. Zo'n grafiek lees je zo: zoek de pieken van beide lijnen, en kijk welke lijn eerst piekt.</p>`,
films:[F.eet]};
/* golven van muizen en torenvalken (schets; muizen pieken 2018, 2021, 2024) */
function GOLF({valk=false,pijl=false}={}){
  const X=j=>40+(j-2016)*35,muis=j=>95-62*Math.cos(2*Math.PI*(j-2018)/3),valkY=j=>140-38*Math.cos(2*Math.PI*(j-2019.3)/3);
  let g=`<path d="M40,20 V200 H400" fill="none" stroke="var(--text2)" stroke-width="1.4"/>`;
  for(let j=2016;j<=2026;j+=2)g+=T(X(j),218,j);
  g+=T(14,110,"aantal (schets)","lblm","middle",'transform="rotate(-90 14 110)"');
  const pad=f=>{let d="";for(let k=0;k<=100;k++){const j=2016+k/10;d+=(k?"L":"M")+X(j).toFixed(1)+","+f(j).toFixed(1);}return d;};
  g+=`<path d="${pad(muis)}" fill="none" stroke="var(--goud)" stroke-width="2.6"/>`+T(X(2016.3),28,"veldmuizen","lbl","start");
  [2018,2021,2024].forEach(j=>g+=`<circle cx="${X(j)}" cy="${muis(j)}" r="5" fill="var(--goud)"/>`);
  if(valk){g+=`<path d="${pad(valkY)}" fill="none" stroke="var(--teal)" stroke-width="2.6" stroke-dasharray="8 5"/>`+T(X(2016.3),48,"torenvalken","lbl","start");
    [2019.3,2022.3,2025.3].forEach(j=>g+=`<circle cx="${X(j)}" cy="${valkY(j)}" r="5" fill="var(--teal)"/>`);}
  if(pijl)[2018,2021,2024].forEach(j=>g+=`<path d="M${X(j)+6},${muis(j)-10} H${X(j+1.3)-6}" stroke="var(--text)" stroke-width="1.6" marker-end="url(#pk)"/>`);
  return SVG("0 0 410 230",`<defs><marker id="pk" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--text)"/></marker></defs>`+g,"Schets: aantallen veldmuizen en torenvalken door de jaren");}
const ids=[vraag(2,"veldmuizen en torenvalken",(q,id)=>{
  pre(q,"<p>Van een populatie veldmuizen en de torenvalken die er vooral van leven, worden elk jaar de aantallen geteld. De muizen pieken in 2018, 2021 en 2024.</p>");
  const {think,ans,unlock}=start(q,B("Geef aan wanneer de torenvalken waarschijnlijk pieken. Leg ook uit waarom de torenvalken de muizen niet uitroeien."));
  choiceStep(think,{q:"Er zijn heel veel muizen. Wat gebeurt er met de jongen van de torenvalken?",opts:["er overleven er meer","er overleven er minder","dat maakt niet uit"],right:0,
    ok:"Ja. Maar jonge torenvalken groeien op en krijgen pas later zelf jongen. Kan het aantal torenvalken dus al in hetzelfde jaar pieken als de muizen?",no:"Met veel voedsel kunnen ouders meer jongen grootbrengen.",
    onDone:()=>choiceStep(think,{q:"Er zijn nog maar weinig muizen. Kost het een torenvalk dan meer of minder tijd om er één te vangen?",opts:["meer tijd","minder tijd"],right:0,
      ok:"Goed. Wat betekent dat voor de torenvalken zelf, en dus voor de muizen die overblijven?",no:"Hoe minder muizen er rondlopen, hoe langer hij moet zoeken.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "De torenvalken pieken <b>een jaar of één à twee na de muizen</b> (2019–2020, 2022–2023, 2025–2026).",
    "Bij weinig muizen <b>kost jagen meer tijd</b>, vangen torenvalken minder, eten ze iets anders en krijgen ze minder jongen, zodat er muizen overblijven."],
    model:"De torenvalken pieken een jaar of twee na de muizen, dus rond 2019–2020, 2022–2023 en 2025–2026. Bij veel muizen overleven meer jonge torenvalken; als er weinig muizen zijn, kost jagen veel tijd. De torenvalken vangen er dan minder, eten iets anders en krijgen minder jongen. Daardoor blijft er altijd een deel van de muizen over.",
    valkuil:"‘De torenvalken pieken tegelijk met de muizen’ is fout: de rover volgt de prooi. En ‘de muizen verstoppen zich’ verklaart niet waarom de rovers zelf afnemen.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"De muizen pieken in 2018, 2021 en 2024.",o:{}},
      {cap:"Na een muizenpiek overleven meer jonge torenvalken. Het aantal torenvalken piekt dus later: een jaar of twee na de muizen. De prooi gaat voorop, de rover volgt.",o:{valk:true,pijl:true}},
      {cap:"Bij weinig muizen vangen de torenvalken er minder, eten ze iets anders en krijgen ze minder jongen. Dan kunnen de overgebleven muizen weer groeien.",o:{valk:true}}],
      (st,s)=>st.innerHTML=GOLF(s.o)))});
  q.append(think,ans);
},STOF_RP)];
opgave("Eten en samenleven","Eten en samenleven","",ids);
}
