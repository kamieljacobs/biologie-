/* ===== Opgave 5: Energie (EI-ecologie-KE01) ===== */
{
const STOF_E={titel:"Energie in een ecosysteem",html:`
<p>Bijna alle energie in een ecosysteem komt binnen als <b>zonlicht</b>. Planten leggen daarvan met fotosynthese maar een klein deel vast, meestal één tot twee procent. Alle energie die de planten per jaar vastleggen, heet de <b>bruto primaire productie</b> (BPP).</p>
<p>Elke levende cel heeft energie nodig en haalt die uit <b>dissimilatie</b>: glucose afbreken, waarbij warmte vrijkomt. Stoffen gaan rond in een ecosysteem, energie niet: die gaat één kant op en verlaat het ecosysteem als warmte.</p>
<p>In de film: een rund neemt 200 MJ per dag op, 60 MJ gaat naar de feces en 135 MJ naar dissimilatie. Er blijft 5 MJ over voor groei.</p>`,
films:[F.energie]};
function BALK(k){const W=300,X=v=>10+v/20000*W;let g="";
  g+=T(10,28,"kJ per m² per jaar","lblm","start")+`<rect x="10" y="40" width="${W}" height="40" rx="6" fill="var(--groen)" opacity=".35" stroke="var(--groen)"/>`+T(160,66,"BPP: 20.000","lbl");
  if(k>=2){g+=`<rect x="10" y="110" width="${X(11000)-10}" height="40" rx="6" fill="var(--koraal)" opacity=".35" stroke="var(--koraal)"/>`+T((10+X(11000))/2,136,"dissimilatie: 11.000","lbl");}
  if(k>=3){g+=`<rect x="${X(11000)}" y="110" width="${X(20000)-X(11000)}" height="40" rx="6" fill="var(--goud)" opacity=".45" stroke="var(--goud)"/>`+T((X(11000)+X(20000))/2,136,"NPP: 9000","lbl");}
  return SVG("0 0 320 165",g,"Balk: bruto en netto primaire productie van het moeras",440);}
const ids=[vraag(2,"netto primaire productie",(q,id)=>{
  pre(q,"<p>Planten in een moeras leggen per jaar 20.000 kJ per m² vast. Ze gebruiken zelf 11.000 kJ per m² bij dissimilatie.</p>");
  const {think,ans,unlock}=start(q,B("Bereken de netto primaire productie. Leg ook uit waarom de netto primaire productie altijd kleiner is dan de bruto primaire productie."));
  choiceStep(think,{q:"Welk getal uit de vraag is de bruto primaire productie?",opts:["20.000 kJ per m² per jaar","11.000 kJ per m² per jaar"],right:0,
    ok:"Ja: alles wat de planten vastleggen. Gaat al die energie naar groei, of gebruiken de planten er zelf ook iets van?",no:"De BPP is alle energie die de planten met fotosynthese vastleggen.",
    onDone:()=>choiceStep(think,{q:"Wanneer dissimileert een plant?",opts:["alleen 's nachts","alleen als hij groeit","dag en nacht, zolang hij leeft"],right:2,
      ok:"Goed. Gebruik dat voor de berekening en voor je uitleg.",no:"Elke levende cel heeft steeds energie nodig.",onDone:unlock})});
  rekenOpen(ans,{id,pts:2,veld:["netto primaire productie","kJ per m² per jaar",v=>v===9000,"NPP = 20.000 − 11.000 = 9000 kJ per m² per jaar"],
    checks:["Uitleg: planten <b>dissimileren zelf</b> (dag en nacht) een deel van wat ze vastleggen."],
    model:"NPP = BPP − dissimilatie van de planten = 20.000 − 11.000 = 9000 kJ per m² per jaar. De NPP is altijd kleiner dan de BPP, omdat de planten zelf dag en nacht dissimileren: ze gebruiken een deel van de vastgelegde energie voor hun eigen leven.",
    valkuil:"‘Een deel van het licht wordt niet opgevangen’ verklaart niet het verschil tussen BPP en NPP: dat licht zit ook niet in de BPP.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"De planten leggen 20.000 kJ per m² per jaar vast: de bruto primaire productie.",k:1},
      {cap:"Een deel gebruiken ze zelf bij dissimilatie: 11.000 kJ. Dat komt vrij als warmte.",k:2},
      {cap:"Wat overblijft, is de netto primaire productie: 20.000 − 11.000 = <b>9000</b> kJ. Omdat planten altijd zelf dissimileren, is de NPP altijd kleiner dan de BPP.",k:3}],
      (st,s)=>st.innerHTML=BALK(s.k)))});
  q.append(think,ans);
},STOF_E)];
opgave("Energie","Energie","",ids);
}
