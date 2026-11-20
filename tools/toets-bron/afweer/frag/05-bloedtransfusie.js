/* ===== Opgave 8: Twee tests voor een bloedtransfusie (eigen vragen K01, havo K02 K03 / vwo K03 K04) ===== */
{
const STOF_BG={titel:"Bloedgroepen en samenklonteren",html:`
<p>Ook rode bloedcellen hebben vormpjes op hun oppervlak. Heb je <b>antigeen A</b>, dan heb je bloedgroep A; met <b>antigeen B</b> bloedgroep B; met allebei AB; met geen van beide O. Heb je het <b>antigeen D</b>, dan ben je <b>resuspositief</b>; zonder D resusnegatief.</p>
<p>Een <b>antiserum</b> bevat antistoffen tegen één antigeen, bijvoorbeeld anti-A. Een antistof heeft twee armen. Zit het antigeen op de rode bloedcellen, dan binden de antistoffen eraan en plakken de cellen aan elkaar vast: ze <b>klonteren samen</b> (agglutinatie).</p>
<p>Bij een transfusie gaat het erom of de antistoffen in het <b>plasma van de ontvanger</b> iets vinden om aan te binden op de <b>rode bloedcellen van de donor</b>.</p>`,
films:[F.vb]};
const PUTJES=(klont,kop)=>svgG("0 0 560 210",[0,1,2].map(k=>PUTJE(100+k*180,96,kop[k],klont[k])).join(""),"Putjes met rode bloedcellen",18);

const q1=vraag(2,"bloedgroep van patiënt 1",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Welke bloedgroep heeft patiënt 1? Leg met tabel 3 uit hoe je dat afleidt."));
  choiceStep(think,{q:"Het antiserum anti-A bevat antistoffen tegen antigeen A. Wanneer klonteren de rode bloedcellen van de patiënt dan samen?",opts:["als antigeen A op zijn rode bloedcellen zit","als hij antistoffen tegen A in zijn plasma heeft"],right:0,
    ok:"Ja. Lees zo elke kolom van tabel 3: welke antigenen zitten er wel en welke niet op zijn rode bloedcellen?",no:"Bij de bloedgroepbepaling worden de rode bloedcellen van de patiënt getest. Waar binden de antistoffen uit het antiserum aan?",onDone:unlock});
  bloedgroepAnswer(ans,{id,abo:0,resus:0,
    check:"Uitleg: <b>anti-A laat samenklonteren</b>, dus er zit antigeen A op de rode bloedcellen; <b>anti-B niet</b>, dus geen B; <b>anti-D wel</b>, dus antigeen D (resuspositief).",
    model:"Bloedgroep A, resuspositief. Met anti-A klonteren de rode bloedcellen samen, dus er zit antigeen A op. Met anti-B niet, dus er zit geen antigeen B op. Met anti-D wel, dus er zit antigeen D op: resuspositief.",
    valkuil:"Alleen de bloedgroep zonder uitleg: alleen het eerste punt.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Drie putjes met rode bloedcellen van patiënt 1, elk met een ander antiserum.",k:[0,0,0]},
      {cap:"Anti-A: de cellen klonteren samen. De antistoffen vinden antigeen A: <b>A is aanwezig</b>.",k:[1,0,0]},
      {cap:"Anti-B: geen samenklontering. Er is niets om aan te binden: <b>geen B</b>.",k:[1,0,0]},
      {cap:"Anti-D: samenklontering, dus <b>antigeen D</b> zit erop. Samen: bloedgroep <b>A, resuspositief</b>.",k:[1,0,1]}],
      (st,s)=>st.innerHTML=PUTJES(s.k,["anti-A","anti-B","anti-D"])))});
  q.append(think,ans);
},STOF_BG);

const ids=[q1];
if(!VWO){
ids.push(vraag(2,"kruisproef met de verkeerde zak",(q,id)=>{
  pre(q,"<p>Bij de kruisproef blijkt dat de zak voor patiënt 1 per ongeluk rode bloedcellen van bloedgroep B bevat.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit welk resultaat de kruisproef dan geeft, en waardoor."));
  choiceStep(think,{q:"Tegen welke antigenen heb je vanaf je eerste levensjaar antistoffen in je plasma?",opts:["tegen de antigenen A of B die je zelf níet hebt","tegen je eigen antigenen","tegen geen enkel antigeen, tot je bloed van een ander krijgt"],right:0,
    ok:"Ja. Pas dat toe op patiënt 1, met de bloedgroep die je in de vorige vraag vond.",no:"Je afweer valt je eigen cellen normaal niet aan.",
    onDone:()=>choiceStep(think,{q:"Wat zit er op rode bloedcellen van bloedgroep B?",opts:["antigeen B","antistoffen tegen A","niets"],right:0,
      ok:"Goed. Wat gebeurt er als het plasma van de patiënt en deze cellen samen in één buisje komen?",no:"De bloedgroep zegt welk antigeen er op de rode bloedcellen zit.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Het plasma van patiënt 1 (bloedgroep A) bevat <b>antistoffen tegen B</b>.",
    "Die <b>binden aan het antigeen B</b> op de rode bloedcellen uit de zak, zodat die <b>samenklonteren</b>; de patiënt krijgt de zak dus niet."],
    model:"Patiënt 1 heeft bloedgroep A, dus in zijn plasma zitten antistoffen tegen B. Die binden aan antigeen B op de rode bloedcellen uit de zak. Doordat een antistof twee armen heeft, plakken de cellen aan elkaar: ze klonteren samen. De patiënt krijgt deze zak dus niet.",
    valkuil:"‘De rode bloedcellen van de patiënt klonteren samen’ is fout: bij de kruisproef gaat het om de rode bloedcellen uit de zak.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Links: plasma van patiënt 1 (bloedgroep A) met rode bloedcellen van bloedgroep A. Er gebeurt niets.",k:[0,0,0]},
      {cap:"Rechts: hetzelfde plasma met de rode bloedcellen uit de zak (bloedgroep B). De anti-B in het plasma bindt aan antigeen B: <b>samenklontering</b>.",k:[0,0,1]}],
      (st,s)=>st.innerHTML=svgG("0 0 560 210",PUTJE(140,96,"plasma A + cellen A",s.k[0])+PUTJE(420,96,"plasma A + cellen B",s.k[2]),"Kruisproef",18)))});
  q.append(think,ans);
},STOF_BG));
}

ids.push(vraag(2,"resusnegatief, en toch samenklontering",(q,id)=>{
  pre(q,"<p>Patiënt 2 heeft bloedgroep O, resusnegatief: in de bloedgroepbepaling klontert zijn bloed met geen van de drie antisera. Vorig jaar kreeg hij na een ongeluk per ongeluk resuspositief bloed. Nu klonteren bij de kruisproef rode bloedcellen van O, resuspositief, wél samen met zijn plasma.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit waarom de kruisproef samenklontering geeft, terwijl de bloedgroepbepaling ‘resusnegatief’ gaf."));
  choiceStep(think,{q:"Wat wordt bij de bloedgroepbepaling van de patiënt getest?",opts:["zijn rode bloedcellen, met antistoffen uit een antiserum","zijn plasma, met rode bloedcellen van een donor"],right:0,
    ok:"Goed. En bij de kruisproef?",no:"Lees in de inleiding van de opgave wat er bij de bloedgroepbepaling in de druppels gaat.",
    onDone:()=>choiceStep(think,{q:"Wat test de kruisproef van de patiënt?",opts:["zijn plasma, dus zijn eigen antistoffen","zijn rode bloedcellen"],right:0,
      ok:"Goed. Bij de kruisproef zitten er dus antistoffen in zijn plasma die aan de donorcellen binden. Waar kunnen die vandaan komen? Denk aan vorig jaar.",no:"Bij de kruisproef wordt plasma van de patiënt gemengd met rode bloedcellen uit de zak.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Door het resuspositieve bloed van vorig jaar heeft hij <b>zelf antistoffen (en geheugencellen) tegen D</b> gemaakt; die zitten nu in zijn plasma en <b>binden aan D op de donorcellen</b>.",
    "De bloedgroepbepaling test met antisera welke <b>antigenen op zijn eigen rode bloedcellen</b> zitten (geen D); de kruisproef test <b>zijn eigen antistoffen</b> tegen de donorcellen."],
    model:"Vorig jaar kwam er antigeen D in zijn bloed. Zijn afweer zag D als vreemd en maakte antistoffen en geheugencellen tegen D. Die antistoffen zitten nu in zijn plasma en binden aan D op de rode bloedcellen van de donor, dus die klonteren samen. De bloedgroepbepaling kijkt alleen welke antigenen op zijn eigen rode bloedcellen zitten: daar zit geen D, dus resusnegatief. De kruisproef kijkt naar zijn antistoffen.",
    valkuil:"‘Antistoffen tegen D heeft iedereen met resusnegatief bloed’: 0 punten voor het eerste element. Anti-D maak je pas na contact met D.",
    after:()=>waaromBtn(ans,textBox("De twee tests kijken naar iets anders. De <b>bloedgroepbepaling</b> vraagt: welke antigenen zitten op de rode bloedcellen van de patiënt? Bij patiënt 2: A nee, B nee, D nee. De <b>kruisproef</b> vraagt: welke antistoffen zitten in zijn plasma, en binden die aan de donorcellen? Anti-A en anti-B heeft hij vanzelf, maar anti-D niet. Die heeft hij pas gemaakt na het resuspositieve bloed van vorig jaar. Daarom klonteren cellen van O, resuspositief, nu wél samen."))});
  q.append(think,ans);
},STOF_BG));

if(VWO){
ids.push(vraag(2,"de kruisproef bij een baby (vwo)",(q,id)=>{
  pre(q,"<p>Patiënt 3 is een baby van twee weken die een bloedtransfusie nodig heeft. Bij een baby doet het laboratorium de kruisproef niet met het plasma van de baby zelf, maar met het plasma van de moeder.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit waarom het plasma van de moeder hier een betrouwbaarder uitslag geeft."));
  choiceStep(think,{q:"Wat wil het laboratorium met de kruisproef weten?",opts:["of er in het bloed van de patiënt antistoffen zijn die aan de donorcellen kunnen binden","welke bloedgroep de donor heeft"],right:0,
    ok:"Ja. Welke antistoffen zitten er in het bloed van een baby van twee weken, en wie heeft die gemaakt?",no:"Bij de kruisproef gaat plasma van de patiënt bij rode bloedcellen uit de zak.",
    onDone:()=>choiceStep(think,{q:"Vanaf wanneer heb je zelf antistoffen tegen de antigenen A of B die je niet hebt?",opts:["vanaf je eerste levensjaar","al vanaf de bevruchting"],right:0,
      ok:"Goed. Combineer nu: wat heeft de baby zelf nog niet, en wat zit er wél in zijn bloed?",no:"Je hebt ze al voordat je ooit bloed van een ander krijgt, maar niet al bij de geboorte.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "De antistoffen in het bloed van de baby <b>komen (grotendeels) van de moeder, via de placenta</b>.",
    "De baby <b>maakt zelf nog (bijna) geen anti-A en anti-B</b> (die komen pas in het eerste levensjaar); het plasma van de moeder laat zien welke antistoffen in de baby aan de donorcellen kunnen binden."],
    model:"Een baby van twee weken maakt zelf nog bijna geen anti-A en anti-B; die komen pas in het eerste levensjaar. De antistoffen die wél in zijn bloed zitten, kreeg hij van zijn moeder via de placenta. Het plasma van de moeder bevat die antistoffen ook. Zo zie je welke antistoffen in de baby aan de rode bloedcellen van de donor kunnen binden.",
    valkuil:"‘De baby heeft nog geen bloedgroep’ is fout: de antigenen op zijn rode bloedcellen heeft hij al. Het gaat om de antistoffen."});
  q.append(think,ans);
},STOF_BG));
}

opgave("Bloedtransfusie","Twee tests voor een bloedtransfusie",`
<p>Voordat een patiënt in het ziekenhuis een bloedtransfusie krijgt, doet het laboratorium twee tests.</p>
<ul style="margin:0;padding-left:20px">
<li><b>Bloedgroepbepaling</b>: druppels bloed van de patiënt worden gemengd met antiserum met anti-A, met anti-B en met anti-D. Je kijkt of de rode bloedcellen samenklonteren.</li>
<li><b>Kruisproef</b>: plasma van de patiënt wordt gemengd met een beetje rode bloedcellen uit de zak die hij zou krijgen. Klonteren de rode bloedcellen samen, dan krijgt de patiënt die zak niet.</li></ul>
<p>Tabel 3 geeft de bloedgroepbepaling van patiënt 1.</p>
${TABEL(3,["antiserum","anti-A","anti-B","anti-D"],[["samenklontering?","ja","nee","ja"]])}`,ids);
}
