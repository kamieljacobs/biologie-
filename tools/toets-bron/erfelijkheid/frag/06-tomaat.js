/* ===== Opgave 8: Een tomaat voor op het balkon (U01, havo U02 / vwo U06, vwo U03, U04, vwo U05) ===== */
{
/* stof: algemene theorie over twee genen; niet 'vier soorten gameten, elk een kwart' (= antwoord U01) */
const STOF_TWEE={titel:"Twee genen tegelijk",html:`
<p>Bij twee genen tegelijk schrijf je het genotype met vier letters, bijvoorbeeld HhRr: van elk gen twee allelen. Een <b>gameet</b> krijgt van elk chromosoompaar één chromosoom, dus van elk gen <b>één</b> allel.</p>
<p>Liggen de twee genen op <b>verschillende chromosoomparen</b>, dan worden die paren bij de meiose los van elkaar over de gameten verdeeld. Hoe de paren in de cel liggen, is toeval.</p>
<p>Een kruisingsschema geeft <b>kansen</b>, geen aantallen. Kleine verschillen tussen wat je verwacht en wat je telt, komen door toeval.</p>`+(VWO?`
<p><b>Vwo:</b> maakt elke ouder meer soorten gameten, dan zet je ze allemaal langs de rand van het schema. Met de <b>productregel</b> kun je ook zonder schema rekenen: de kans op twee kenmerken tegelijk is de kans op het ene × de kans op het andere.</p>`:""),
films:[F.di]};
const STOF_KOP={titel:"Gekoppelde genen",html:`
<p>Op één chromosoom liggen heel veel genen achter elkaar. Twee genen die op <b>hetzelfde chromosoom</b> liggen, heten <b>gekoppelde genen</b>.</p>
<p>Om te zien wat dat betekent voor de gameten, moet je weten welke allelen samen op één chromosoom liggen. Dat volgt uit de ouders: een raszuivere ouder heeft op beide chromosomen van het paar dezelfde allelen.</p>`+(VWO?`
<p><b>Vwo:</b> bij de meiose kunnen homologe chromosomen in meiose I stukken uitwisselen: <b>crossing-over</b>. Nakomelingen met een nieuwe combinatie van allelen heten <b>recombinanten</b>.</p>`:""),
films:[F.di]};
/* meiose met twee chromosoomparen: ligging 0 = H naast R, 1 = H naast r */
function MEIOSE(lig,toonGameten){let s="";const kl=["var(--teal)","var(--oker)"];
  const paar=(x,boven,onder,c)=>`<rect x="${x-9}" y="40" width="18" height="60" rx="9" fill="var(--surface)" stroke="${c[0]}" stroke-width="2.4"/><text x="${x}" y="76" text-anchor="middle" class="lbl" style="font-size:17px">${boven}</text>`+
    `<rect x="${x-9}" y="120" width="18" height="60" rx="9" fill="var(--surface)" stroke="${c[1]}" stroke-width="2.4"/><text x="${x}" y="156" text-anchor="middle" class="lbl" style="font-size:17px">${onder}</text>`;
  s+=`<ellipse cx="150" cy="110" rx="110" ry="95" fill="none" stroke="var(--line2)" stroke-width="1.6"/>`;
  s+=paar(110,"H","h",kl)+paar(190,lig?"r":"R",lig?"R":"r",lig?[kl[1],kl[0]]:kl);
  s+=`<path d="M60,110 H240" stroke="var(--line2)" stroke-dasharray="4 4"/>`;
  if(toonGameten){const g=lig?["Hr","hR"]:["HR","hr"];
    s+=`<path d="M270,70 L330,60 M270,150 L330,160" stroke="var(--text2)" stroke-width="1.4" marker-end=""/>`;
    g.forEach((t,k)=>s+=`<circle cx="380" cy="${60+k*100}" r="30" fill="var(--goud-soft)" stroke="var(--goud)"/><text x="380" y="${66+k*100}" text-anchor="middle" class="lbl" style="font-size:18px">${t}</text>`);}
  return svgWrap("0 0 430 215",s,"Meiose met twee chromosoomparen");}

const ids=[];
ids.push(vraag(1,"gameten van de F1",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Welke gameten maakt een F1-plant (HhRr) als de twee genen op verschillende chromosomen liggen?"));
  choiceStep(think,{q:"Hoeveel allelen van het gen voor planthoogte (H of h) krijgt één gameet?",opts:["één","twee"],right:0,
    ok:"Ja, en ook één allel voor de kleur (R of r). Kijk nu naar de keuzes: welke vallen daardoor al af?",no:"Een gameet krijgt van elk chromosoompaar maar één chromosoom.",
    onDone:()=>choiceStep(think,{q:"De twee chromosoomparen liggen bij de meiose in het midden van de cel. Ligt het paar met H/h altijd op dezelfde manier ten opzichte van het paar met R/r?",opts:["ja, H gaat altijd met R mee","nee, dat is toeval: soms H met R, soms H met r"],right:1,
      ok:"Goed. Bedenk nu welke gameten er bij beide liggingen ontstaan.",no:"Het zijn twee losse chromosoomparen. Is er iets dat ze aan elkaar vastmaakt?",onDone:unlock})});
  mc(ans,{qid:id,pts:1,right:2,opts:["alleen gameten met H en r, en gameten met h en R","gameten met Hh en gameten met Rr","gameten met HR, Hr, hR en hr, elk ongeveer een kwart","alleen gameten met H en R, want H en R zijn dominant"],
    onChecked:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Ligging 1: H en R aan dezelfde kant. Gameten HR en hr.",l:0},{cap:"Ligging 2: H en r aan dezelfde kant. Gameten Hr en hR.",l:1},
      {cap:"Beide liggingen zijn even waarschijnlijk. Over heel veel cellen: <b>HR, Hr, hR en hr, elk ongeveer een kwart</b> (C). B kan niet (een gameet heeft één allel per gen), A en D vergeten een van de twee liggingen.",l:2}],
      (st,s)=>st.innerHTML=s.l<2?MEIOSE(s.l,true):`<div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center"><div style="flex:1 1 220px;max-width:330px">${MEIOSE(0,true)}</div><div style="flex:1 1 220px;max-width:330px">${MEIOSE(1,true)}</div></div>`))});
  q.append(think,ans);
},STOF_TWEE));

const F2=`<p>In de F2 telt de kweker 160 planten: 92 hoog met rode tomaten, 29 hoog met gele, 30 dwerg met rode en 9 dwerg met gele tomaten (fictieve gegevens).</p>`;
if(!VWO)ids.push(vraag(2,"F2-telling toetsen aan 1/16",(q,id)=>{
  pre(q,F2);
  const {think,ans,unlock}=start(q,B("Leg uit of deze uitkomst past bij twee genen op verschillende chromosomen. Gebruik in je uitleg welk deel van de F2 je dwerg-geel verwacht."));
  choiceStep(think,{q:"Welk genotype heeft een dwergplant met gele tomaten?",opts:["hhrr","Hhrr","hhRr"],right:0,
    ok:"Ja: van elk gen twee recessieve allelen. Welke gameet moet dan van elke F1-ouder komen?",no:"Dwerg en geel zijn allebei recessief.",
    onDone:()=>choiceStep(think,{q:"Kijk eerst naar één gen tegelijk. Hoe groot is bij Hh × Hh de kans op een dwergplant (hh)? En bij Rr × Rr de kans op gele tomaten (rr)?",opts:["allebei ½","allebei ¼","allebei ¾"],right:1,
      ok:"Goed. Een dwergplant met gele tomaten moet allebei hebben. Combineer de twee kansen, en reken daarna uit hoeveel van de 160 planten dat zijn.",no:"Maak voor één gen het schema Hh × Hh: welk deel is hh?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Bij onafhankelijke genen is de kans op dwerg-geel ¼ (hh) × ¼ (rr) = <b>1/16</b>, dus ongeveer <b>10 van de 160</b> (ook goed: een kwart van de gameten van elke F1-plant is hr, dus ¼ × ¼ = 1/16).",
    "De gevonden aantallen (9 dwerg-geel) liggen daar dicht bij, dus het <b>past</b>; kleine verschillen komen door toeval (kansen, geen aantallen)."],
    model:"Een dwergplant met gele tomaten is hhrr. Elke F1-plant maakt vier soorten gameten, elk een kwart, dus een kwart is hr. De kans op hhrr is ¼ × ¼ = 1/16: van 160 planten ongeveer 10. Er zijn er 9 gevonden. Dat ligt er dicht bij, dus de uitkomst past; het kleine verschil komt door toeval.",
    valkuil:"‘Het past niet, want 9 is geen 10’: een kruisingsschema geeft kansen, geen precieze aantallen.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Een kwart van de gameten van de ene F1-plant is hr…",t:0},{cap:"…en een kwart van de gameten van de andere F1-plant ook.",t:1},{cap:"Allebei: ¼ × ¼ = <b>1/16</b>. Van 160 planten verwacht je er 160 / 16 = <b>10</b>; gevonden 9. Dat past.",t:2}],
      (st,s)=>{const G=["HR","Hr","hR","hr"];let g="";const X0=110,Y0=60,w=80,h=34;
        G.forEach((t,k)=>{g+=`<text x="${X0+k*w+w/2}" y="${Y0-12}" text-anchor="middle" class="lbl" style="font-size:15px;${t==="hr"?"fill:var(--goud-text)":""}">${t}</text><text x="${X0-16}" y="${Y0+k*h+22}" text-anchor="end" class="lbl" style="font-size:15px;${t==="hr"&&s.t>=1?"fill:var(--goud-text)":""}">${t}</text>`;});
        for(let r=0;r<4;r++)for(let k=0;k<4;k++){const on=(s.t>=0&&k===3&&s.t<2)||(s.t>=1&&r===3&&s.t<2)||(s.t===2&&r===3&&k===3);
          g+=`<rect x="${X0+k*w}" y="${Y0+r*h}" width="${w}" height="${h}" fill="${on?(s.t===2?"var(--goud-soft)":"var(--teal-soft)"):"none"}" stroke="var(--line2)"/>`;}
        if(s.t===2)g+=`<text x="${X0+3*w+w/2}" y="${Y0+3*h+22}" text-anchor="middle" class="lbl" style="font-size:15px">hhrr</text>`;
        st.innerHTML=svgWrap("40 20 410 185",g,"Kans op hhrr");}))});
  q.append(think,ans);
},STOF_TWEE));

if(VWO){
ids.push(vraag(2,"F2-telling toetsen aan 3/16",(q,id)=>{
  pre(q,F2);
  const {think,ans,unlock}=start(q,B("Leg uit of deze uitkomst past bij twee genen op verschillende chromosomen. Bereken daarvoor met de productregel hoeveel hoge planten met gele tomaten je verwacht."));
  choiceStep(think,{q:"Hoe groot is in de F2 de kans op een hoge plant (Hh × Hh)?",opts:["¼","½","¾"],right:2,
    ok:"Ja: HH of Hh. En de kans op gele tomaten (Rr × Rr)?",no:"Hoog is dominant: HH, Hh en hH zijn hoog.",
    onDone:()=>choiceStep(think,{q:"De kans op gele tomaten (rr) uit Rr × Rr is:",opts:["¼","½","¾"],right:0,
      ok:"Goed. Vermenigvuldig de twee kansen en reken uit hoeveel van de 160 planten dat zijn.",no:"Geel is recessief: alleen rr.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Bij onafhankelijke genen is de kans op hoog-geel ¾ (H_) × ¼ (rr) = <b>3/16</b>, dus ongeveer <b>30 van de 160</b>.",
    "Er zijn er 29 gevonden (en ook de andere groepen passen bij 9 : 3 : 3 : 1), dus het <b>past</b>; kleine verschillen komen door toeval (kansen, geen aantallen)."],
    model:"Kans op hoog: ¾, kans op geel: ¼. Productregel: ¾ × ¼ = 3/16. Van 160 planten verwacht je 3/16 × 160 = 30 hoog-geel; er zijn er 29. Ook de andere groepen (92, 30, 9) liggen dicht bij 90 : 30 : 10. De uitkomst past dus; de kleine verschillen komen door toeval.",
    valkuil:"Optellen in plaats van vermenigvuldigen (¾ + ¼), of ‘het past niet, want 29 is geen 30’.",
    after:()=>waaromBtn(ans,textBox(`<div class="tablewrap"><table class="data"><tr><th></th><th>hoog-rood</th><th>hoog-geel</th><th>dwerg-rood</th><th>dwerg-geel</th></tr><tr><td>kans</td><td>¾ × ¾ = 9/16</td><td><b>¾ × ¼ = 3/16</b></td><td>¼ × ¾ = 3/16</td><td>¼ × ¼ = 1/16</td></tr><tr><td>verwacht (160)</td><td>90</td><td><b>30</b></td><td>30</td><td>10</td></tr><tr><td>gevonden</td><td>92</td><td><b>29</b></td><td>30</td><td>9</td></tr></table></div>Alle groepen liggen dicht bij 9 : 3 : 3 : 1. Een schema geeft kansen; bij 160 planten zijn kleine verschillen door toeval normaal.`))});
  q.append(think,ans);
},STOF_TWEE));

ids.push(vraag(2,"terugkruising met twee genen",(q,id)=>{
  pre(q,"<p>De kweker kruist een F1-plant (HhRr) met een dwergplant met gele tomaten (hhrr). Neem aan dat de genen op verschillende chromosomen liggen.</p>");
  const {think,ans,unlock}=start(q,B("Welke fenotypen verwacht je bij de nakomelingen, en in welke verhouding? Leg uit waarom deze kruising de gameten van de F1-plant direct zichtbaar maakt."));
  choiceStep(think,{q:"Welke gameten maakt de dwergplant met gele tomaten (hhrr)?",opts:["alleen hr","hr en HR","vier soorten"],right:0,
    ok:"Ja. Wat bepaalt dan het fenotype van een nakomeling?",no:"Hij heeft alleen recessieve allelen.",
    onDone:()=>choiceStep(think,{q:"Wat bepaalt het fenotype van een nakomeling van deze kruising?",opts:["alleen de gameet van de F1-plant","alleen de gameet van de hhrr-plant","allebei evenveel"],right:0,
      ok:"Goed: de hhrr-plant voegt alleen recessieve allelen toe. Welke gameten maakt de F1-plant, en hoe vaak?",no:"De hhrr-plant geeft h en r: die komen naast een dominant allel nooit tot uiting.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "hoog-rood : hoog-geel : dwerg-rood : dwerg-geel = <b>1 : 1 : 1 : 1</b>.",
    "De hhrr-plant geeft alleen h en r door, dus <b>elk fenotype laat zien welke gameet de F1-plant gaf</b> (HR, Hr, hR of hr)."],
    model:"De F1-plant maakt vier soorten gameten (HR, Hr, hR, hr), elk een kwart. De hhrr-plant maakt alleen hr. De nakomelingen zijn HhRr (hoog-rood), Hhrr (hoog-geel), hhRr (dwerg-rood) en hhrr (dwerg-geel) in de verhouding 1 : 1 : 1 : 1. Omdat de hhrr-plant alleen recessieve allelen geeft, zie je aan elk fenotype welke gameet de F1-plant gaf.",
    valkuil:"De verhouding 9 : 3 : 3 : 1 hoort bij F1 × F1, niet bij deze terugkruising.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[{cap:"De F1 (HhRr) maakt vier soorten gameten, de hhrr-plant alleen hr.",t:0},{cap:"Elk vakje: de gameet van de F1 plus hr.",t:1},{cap:"Vier fenotypen, elk een kwart: <b>1 : 1 : 1 : 1</b>. Het fenotype ‘verraadt’ de gameet van de F1.",t:2}],
      (st,s)=>st.innerHTML=PUN(["HR","Hr","hR","hr"],["hr"],[["HhRr","Hhrr","hhRr","hhrr"]],{toon:s.t>0,kopT:"F1 HhRr",kopL:"hhrr",w:96,
        kleur:(c,r,k)=>s.t<2?"":["var(--teal-soft)","var(--goud-soft)","var(--groen-soft)","var(--koraal-soft)"][k]})+(s.t===2?`<p class="muted" style="text-align:center;margin:4px 0 0;font-size:14px">hoog-rood · hoog-geel · dwerg-rood · dwerg-geel</p>`:"")))});
  q.append(think,ans);
},STOF_TWEE));
}

ids.push(vraag(2,"gekoppelde genen uit de F2 afleiden",(q,id)=>{
  pre(q,"<p>Een andere kweker volgt bij een andere plantensoort twee genen: A (dominant) / a en B (dominant) / b. Hij kruist raszuivere planten AABB met aabb en kruist daarna de F1-planten met elkaar. In de F2 vindt hij bijna alleen planten met het fenotype van één van de twee grootouders (A_B_ en aabb); de combinaties A_bb en aaB_ komen bijna niet voor (fictieve gegevens).</p>");
  const {think,ans,unlock}=start(q,B("Leg uit hoe dat kan. Gebruik de gameten van de F1."));
  choiceStep(think,{q:"Bij de tomaat (genen op verschillende chromosomen) kwamen in de F2 ook nieuwe combinaties voor, zoals hoog-geel en dwerg-rood. Hier komen A_bb en aaB_ bijna niet voor. Wat zegt dat?",opts:["de twee genen liggen waarschijnlijk niet op verschillende chromosomen","de allelen A en b mengen bijna nooit"],right:0,
    ok:"Ja. Waar zouden de genen dan kunnen liggen?",no:"Allelen mengen nooit. Wat moet er anders zijn dan bij de tomaat?",
    onDone:()=>choiceStep(think,{q:"Stel dat A en B op hetzelfde chromosoom liggen. De F1 kreeg één chromosoom van de AABB-ouder en één van de aabb-ouder. Welke allelen liggen dan samen op één chromosoom?",opts:["A met B, en a met b","A met b, en a met B"],right:0,
      ok:"Goed. Bedenk nu welke gameten de F1 dan maakt, en wat dat betekent voor de F2.",no:"De AABB-ouder heeft op beide chromosomen A en B.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "De genen liggen <b>gekoppeld</b> op hetzelfde chromosoom: de F1 heeft <b>A naast B</b> op het ene chromosoom en <b>a naast b</b> op het andere (van de raszuivere ouders).",
    "De F1 maakt dus (bijna) alleen gameten met <b>A en B</b>, of met <b>a en b</b>, en geen gameten met A en b of a en B; daardoor ontstaan (bijna) geen nieuwe combinaties."],
    model:"De twee genen liggen op hetzelfde chromosoom (gekoppeld). De F1 kreeg van de ene ouder een chromosoom met A en B en van de andere een chromosoom met a en b. Bij de meiose gaan A en B dus samen naar een gameet, en a en b ook: de F1 maakt (bijna) alleen AB- en ab-gameten. In de F2 ontstaan dan (bijna) alleen A_B_ en aabb, en bijna geen A_bb of aaB_.",
    valkuil:"Alleen ‘de genen zijn gekoppeld’ zonder de gameten van de F1 te noemen levert hooguit 1 punt op.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"De F1 kreeg een chromosoom met A en B (van de AABB-ouder) en een met a en b (van de aabb-ouder).",t:0},
      {cap:"Bij de meiose gaat elk chromosoom als geheel naar een gameet: gameten <b>AB</b> en <b>ab</b>, geen Ab of aB.",t:1},
      {cap:"F1 × F1 met alleen AB en ab: de F2 is AABB, AaBb of aabb, dus A_B_ of aabb. Nieuwe combinaties (A_bb, aaB_) ontstaan (bijna) niet.",t:2}],
      (st,s)=>{let g=`<ellipse cx="120" cy="105" rx="90" ry="90" fill="none" stroke="var(--line2)" stroke-width="1.6"/>`+CHROM(95,40,["A","B"],"var(--teal)")+CHROM(150,40,["a","b"],"var(--oker)")+`<text x="120" y="218" text-anchor="middle" class="lblm" style="font-size:15px">cel van de F1</text>`;
        if(s.t>=1)[["AB","var(--teal)"],["ab","var(--oker)"]].forEach(([t,c],k)=>{g+=`<path d="M220,${80+k*60} L290,${60+k*100}" stroke="var(--text2)" stroke-width="1.4"/><circle cx="330" cy="${60+k*100}" r="30" fill="var(--goud-soft)" stroke="${c}" stroke-width="2"/><text x="330" y="${66+k*100}" text-anchor="middle" class="lbl" style="font-size:18px">${t}</text>`;});
        if(s.t===2)g+=`<text x="300" y="218" text-anchor="middle" class="lbl" style="font-size:15px">F2: A_B_ of aabb</text>`;
        st.innerHTML=svgWrap("0 0 380 228",g,"Gekoppelde genen in de F1");}))});
  q.append(think,ans);
},STOF_KOP));

if(VWO)ids.push(vraag(1,"waarom weinig recombinanten",(q,id)=>{
  pre(q,"<p>Bij de kruising uit de vorige vraag vindt de kweker toch 12 van de 400 F2-planten met een nieuwe combinatie (fictieve gegevens).</p>");
  const {think,ans,unlock}=start(q,B("Waarom zijn dat er zo weinig?"));
  choiceStep(think,{q:"Waardoor kan een F1-plant met A naast B en a naast b tóch een gameet met A en b maken?",opts:["doordat de allelen mengen","doordat de homologe chromosomen in meiose I een stuk uitwisselen","doordat de plant een nieuw allel maakt"],right:1,
    ok:"Ja: crossing-over. Bekijk nu de keuzes: welke gaat over crossing-over, en welke gaan over iets anders?",no:"Allelen mengen nooit. Wat gebeurt er in meiose I tussen homologe chromosomen?",onDone:unlock});
  mc(ans,{qid:id,pts:1,right:1,opts:["Nieuwe combinaties ontstaan alleen door een mutatie, en die is zeldzaam.","Niet in elke cel valt bij de meiose een uitwisseling van chromatiden tussen de twee genen.","Planten met een nieuwe combinatie sterven meestal al als embryo.","De allelen A en b mengen maar af en toe."],
    onChecked:()=>waaromBtn(ans,textBox("Een nieuwe combinatie (recombinant) ontstaat door <b>crossing-over</b>: in meiose I wisselen homologe chromosomen een stuk uit. Alleen als die uitwisseling precies <b>tussen</b> de twee genen valt, krijgt een gameet A met b of a met B. Dat gebeurt maar in een deel van de cellen, dus er zijn weinig recombinanten. Het antwoord is <b>B</b>. Het gaat niet om mutaties (A), er sterft niets (C) en allelen mengen nooit (D)."))});
  q.append(think,ans);
},STOF_KOP));

opgave("Tomaat","Een tomaat voor op het balkon",`
<p>Bij tomaten is het allel voor een hoge plant (H) dominant over het allel voor een dwergplant (h). Het allel voor rode tomaten (R) is dominant over het allel voor gele tomaten (r).</p>
<p>Een kweker wil dwergplanten met gele tomaten, voor op het balkon. Hij heeft alleen raszuivere hoge planten met gele tomaten (HHrr) en raszuivere dwergplanten met rode tomaten (hhRR). Hij kruist die met elkaar, en kruist daarna de F1-planten met elkaar.</p>`,ids);
}
