/* ===== Opgave: Echte kaviaar? (eigen vragen G1, G2, G3, G4, G8, G9 (havo) / G1, G2, G10, G8, G7 (vwo)) ===== */
{
const STOF_PCR={titel:"PCR: op maat kopiëren",html:`
<p>Met een <b>PCR</b> kopieer je één stuk DNA heel vaak. <b>Primers</b> zijn korte stukjes DNA die alleen binden waar ze precies passen; ze bepalen welk stuk er gekopieerd wordt. De temperatuur werkt als schakelaar: heet = strengen los, iets koeler = primers binden, warm = polymerase bouwt.</p>
<p>Elke cyclus verdubbelt het aantal moleculen op maat (in het model: een perfecte verdubbeling). Steeds verdubbelen heet <b>exponentiële groei</b>.</p>
<p>Omdat een PCR zo gevoelig is, gebruik je controles: een <b>negatieve controle</b> (zonder DNA) en een <b>positieve controle</b> (met DNA waarvan je weet wat eruit moet komen).</p>`,films:[F.pcr,F.lees]};
const STOF_GEL={titel:"De gel lezen",html:`
<p>Een gel is een netwerk van agarose met kleine gaatjes. DNA is negatief geladen en beweegt naar de pluspool. <b>Korte stukken komen verder</b> dan lange.</p>
<p>De lengte lees je af met de <b>marker</b>: stukken DNA van bekende lengte. Kijk tussen welke twee markerbanden je band ligt. Hoger in de gel liggen de markerbanden dichter op elkaar.</p>
<p>Elke band is een groep stukken DNA van dezelfde lengte. Kijk eerst naar de controles, vergelijk dan de banen band voor band.</p>`,films:[F.gel]};
const STOF_PROF={titel:"Soort of individu?",html:`
<p>Sommige stukken DNA zijn bij alle dieren van een soort gelijk, maar verschillen tussen soorten. Andere stukken verschillen ook tussen individuen van één soort, zoals <b>STR's</b>: korte stukjes die vaak herhaald worden, met een verschillend aantal herhalingen.</p>
<p>Een <b>DNA-profiel</b> laat voor een aantal STR's zien welke twee allelen iemand heeft: één van de moeder en één van de vader.</p>`,films:[F.lees,F.gel]};
const ids=[];
ids.push(vraag(1,"primers die niet op mensen-DNA passen",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Leg uit waarom de primers zo gekozen zijn dat ze niet passen op het DNA van de mens."));
  choiceStep(think,{q:"Een PCR kopieert elk stuk DNA waar de primers op passen. Hoeveel DNA is er nodig om na de PCR een band te zien?",opts:["heel veel: een heel eitje","heel weinig: een paar cellen is al genoeg"],right:1,
    ok:"Ja. Bedenk welk ander DNA er, behalve van de steur, op of in een blik kaviaar terecht kan komen.",no:"Een PCR maakt van een paar moleculen er miljoenen.",onDone:unlock});
  openAnswer(ans,{id,pts:1,checks:["anders wordt ook <b>DNA van mensen</b> die de kaviaar hebben aangeraakt (bijvoorbeeld huidcellen) gekopieerd, en geeft dat banden die niets over de steur zeggen"],
    model:"Mensen die de kaviaar hebben verwerkt of het lab-materiaal aanraken, laten huidcellen achter. Als de primers ook op mensen-DNA passen, wordt dat DNA ook gekopieerd en krijg je banden die niets over de steur zeggen.",
    after:()=>waaromBtn(ans,textBox("PCR is extreem gevoelig: een paar huidcellen of een druppeltje is genoeg. Daarom kiest het lab primers die <b>alleen op steur-DNA</b> passen. Dan geeft verontreiniging met mensen-DNA geen band."))});
  q.append(think,ans);
},STOF_PCR));

ids.push(vraag(1,"welke steur zit in blik 1?",(q,id)=>{
  const O=["Siberische steur, want de band ligt hoger dan 150 bp.","Siberische steur, want blik 1 heeft net als de positieve controle één band.","Dat kun je niet zeggen, want er staat geen band in de negatieve controle.","Russische steur, want de band ligt tussen 175 en 200 bp."];
  const {think,ans,unlock}=startLos(q,"Bekijk afbeelding 1. "+B("Van welke soort steur komt de kaviaar in blik 1?")+"<br><br>"+L4(...O));
  choiceStep(think,{q:"Een band van 154 bp: waar ligt die ten opzichte van de marker?",opts:["net boven de markerband van 150 bp","tussen 175 en 200 bp","onder de markerband van 125 bp"],right:0,
    ok:"Ja: iets langer dan 150, dus iets hoger. Vergelijk dat met de band van blik 1.",no:"Langer = hoger in de gel. 154 is maar net langer dan 150.",
    onDone:()=>choiceStep(think,{q:"Wat zegt een lege negatieve controle?",opts:["dat de PCR mislukt is","dat er geen verontreiniging is: goed"],right:1,
      ok:"Goed. Kies nu het antwoord.",no:"In de negatieve controle zit geen DNA; daar hoort dus geen band.",onDone:unlock})});
  mc(ans,{qid:id,pts:1,right:3,opts:O,onChecked:()=>waaromBtn(ans,b=>stepAnim(b,[
    {cap:"De band van blik 1 ligt tussen de markerbanden van 175 en 200 bp: ongeveer 186 bp.",hl:{1:"var(--goud)"},m:[175,200]},
    {cap:"De Siberische steur (positieve controle) geeft 154 bp: net boven de markerband van 150. Die ligt veel lager.",hl:{6:"var(--teal)"},m:[150]},
    {cap:"Blik 1 = 186 bp = Russische steur. Antwoord <b>D</b>. B klopt niet: het gaat om de hoogte van de band, niet om het aantal. C: een lege negatieve controle is juist goed.",hl:{1:"var(--goud)",6:"var(--teal)"},m:[150,175,200]}],
    (st,s)=>st.innerHTML=GEL({hl:s.hl,mlijn:s.m})))});
  q.append(think,ans);
},STOF_GEL));

if(!VWO){
ids.push(vraag(1,"twee banden in blik 3",(q,id)=>{
  const {think,ans,unlock}=start(q,"In de baan van blik 3 staan twee banden. "+B("Leg uit hoe dat kan."));
  choiceStep(think,{q:"Wat betekent één band in een baan?",opts:["stukken DNA die allemaal even lang zijn","één enkel DNA-molecuul","dat er twee soorten DNA in zitten"],right:0,
    ok:"Ja. Hoe lang zijn de twee banden van blik 3, en bij welke soorten horen die lengtes?",no:"Een band bestaat uit heel veel moleculen van dezelfde lengte.",onDone:unlock});
  openAnswer(ans,{id,pts:1,checks:["in blik 3 zit kaviaar van <b>twee soorten</b> (Siberische en Russische steur) door elkaar: van elke soort een PCR-product met een eigen lengte (ook goed: de eitjes komen van een kruising tussen beide soorten)"],
    model:"De banden liggen op 154 en 186 bp. In blik 3 zit dus DNA van Siberische én Russische steur: de kaviaar is gemengd (of komt van een kruising van beide soorten).",
    after:()=>waaromBtn(ans,b=>b.innerHTML=GEL({hl:{3:"var(--goud)",2:"var(--teal)",1:"var(--teal)"},mlijn:[154,186]})+`<div class="model">De bovenste band van blik 3 ligt even hoog als blik 1 (Russisch, 186 bp), de onderste even hoog als blik 2 (Siberisch, 154 bp). Twee lengtes = DNA van twee soorten.</div>`)});
  q.append(think,ans);
},STOF_GEL));

ids.push(vraag(1,"500 moleculen, 20 cycli",(q,id)=>{
  const {think,ans,unlock}=start(q,"Uit een paar eitjes haalt het lab ongeveer 500 DNA-moleculen met het stuk dat de primers herkennen. Ga uit van een perfecte verdubbeling bij elke cyclus, en 2<sup>20</sup> ≈ 1 miljoen.<br><br>"+B("Bereken hoeveel moleculen op maat er ongeveer zijn na 20 cycli."));
  numStep(think,{uid:"q"+id+"a",q:"Je begint met 1 molecuul. Hoeveel zijn er na 3 cycli?",right:8,ok:"Ja: 1 → 2 → 4 → 8, dus 2<sup>3</sup>.",no:"Verdubbel drie keer: 1 → 2 → …",
    onDone:()=>numStep(think,{uid:"q"+id+"b",q:"En als je begint met 5 moleculen: hoeveel na 3 cycli?",right:40,ok:"Goed: 5 × 2<sup>3</sup>. Reken nu met 500 moleculen en 20 cycli.",no:"Elk van de 5 moleculen wordt er 8.",onDone:unlock})});
  numAnswer(ans,{id,fields:[["aantal moleculen na 20 cycli","miljoen",v=>(v>=490&&v<=530)||(v>=4.9e8&&v<=5.3e8),"500 × 1 miljoen = <b>500 miljoen</b> (5 × 10<sup>8</sup>); ook goed: 524 miljoen (500 × 2<sup>20</sup> precies)"]],
    after:()=>waaromBtn(ans,textBox("Elk molecuul wordt er na 20 cycli 2<sup>20</sup> ≈ 1 miljoen. Met 500 moleculen: 500 × 1 miljoen = <b>500 miljoen</b>. Fout is 500 × 20 of 500 × 2 × 20: dan reken je alsof er elke cyclus een vast aantal bij komt, maar bij een PCR verdubbelt het aantal elke keer (exponentiële groei)."))});
  q.append(think,ans);
},STOF_PCR));
}else{
ids.push(vraag(1,"hoeveel herhalingen meer?",(q,id)=>{
  const {think,ans,unlock}=start(q,"Het stuk DNA dat de primers kopiëren, bevat een stukje van vier basen dat steeds herhaald wordt. De soorten steur verschillen alleen in het aantal herhalingen.<br><br>"+B("Bereken hoeveel herhalingen de Russische steur meer heeft dan de Siberische steur."));
  numStep(think,{uid:"q"+id+"a",q:"Hoeveel basenparen is het PCR-product van de Russische steur langer dan dat van de Siberische steur?",right:32,ok:"Ja: 186 − 154 = 32 bp. Hoe lang is één herhaling?",no:"Gebruik de lengtes uit de inleiding: 186 en 154 bp.",onDone:unlock});
  numAnswer(ans,{id,fields:[["aantal herhalingen meer","",v=>v===8,"(186 − 154) : 4 = <b>8</b> herhalingen meer"]],
    after:()=>waaromBtn(ans,textBox("Het verschil in lengte komt alleen door de herhalingen: 186 − 154 = 32 bp, en één herhaling is 4 bp. 32 : 4 = <b>8</b>. Zo lees je bij STR's van een gel af hoeveel herhalingen een allel heeft."))});
  q.append(think,ans);
},STOF_GEL));
}

ids.push(vraag(2,"soort of individu: uit een kwekerij?",(q,id)=>{
  const {think,ans,unlock}=startLos(q,"Kaviaar van een wilde Siberische steur mag ook niet verkocht worden. De douane wil weten of de kaviaar in blik 2 echt uit een kwekerij komt. Neem aan dat een eitje haploïd is (vereenvoudigd).<br>• "+B("Leg uit waarom de PCR uit afbeelding 1 daar geen antwoord op kan geven.")+"<br>• "+B("Beschrijf welk DNA-onderzoek dat wel zou kunnen, als de kwekerij van al haar moedervissen DNA heeft bewaard."));
  choiceStep(think,{q:"Geven een wilde en een gekweekte Siberische steur met deze PCR een verschillende band?",opts:["ja, want het zijn andere dieren","nee: alle Siberische steuren geven hetzelfde PCR-product"],right:1,
    ok:"Ja. Deze PCR zegt dus iets over de soort. Wat heb je nodig om individuen te onderscheiden?",no:"De inleiding geeft één lengte per soort.",
    onDone:()=>choiceStep(think,{q:"Neem aan dat een eitje een haploïde geslachtscel van de moeder is. Wat heeft het dan van elk chromosoompaar van de moeder?",opts:["beide chromosomen","één van de twee"],right:1,
      ok:"Goed. Gebruik dat in je beschrijving van het DNA-onderzoek.",no:"Een geslachtscel is haploïd.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "alle Siberische steuren geven hetzelfde PCR-product (154 bp): deze PCR laat de <b>soort</b> zien, niet het <b>individu</b>",
    "maak een <b>DNA-profiel</b> (STR's) van de eitjes en vergelijk dat met de profielen van de <b>moedervissen</b>; elk eitje heeft van elke STR één allel van de moeder, dus de eitjes moeten bij elke STR <b>een allel delen</b> met één van de moedervissen"],
    model:"Alle Siberische steuren, wild of gekweekt, geven met deze primers hetzelfde product van 154 bp; de PCR zegt alleen welke soort het is. Maak daarom een DNA-profiel met STR's van de eitjes en vergelijk het met de bewaarde profielen van de moedervissen. Een eitje heeft van elke STR één allel van zijn moeder, dus bij een kweekvis moet er één moedervis zijn die bij elke STR een allel met de eitjes deelt.",
    valkuil:"‘Een DNA-profiel maken en vergelijken met de kwekerij’ zonder dat het om de moedervissen of om gedeelde allelen gaat: 0 punten voor het tweede punt.",
    after:()=>waaromBtn(ans,textBox("Twee vragen, twee soorten DNA-onderzoek. <b>Welke soort?</b> Een stuk DNA dat per soort verschilt (deze PCR). <b>Welk dier?</b> STR's, die ook binnen een soort verschillen. Neem aan dat een eitje haploïd is (vereenvoudigd: een eitje is vaak nog niet helemaal uitgerijpt en er zit ook DNA van moedercellen omheen), dus per STR één allel, en dat allel komt van de moeder. Past het bij geen enkele moedervis van de kwekerij, dan komt de kaviaar daar niet vandaan."))});
  q.append(think,ans);
},STOF_PROF));

if(!VWO){
ids.push(vraag(1,"beluga: 188 bp",(q,id)=>{
  const {think,ans,unlock}=start(q,"Het lab wil met dezelfde PCR ook kaviaar van de beluga herkennen. Het PCR-product van de beluga is 188 bp.<br><br>"+B("Leg uit waarom beluga en Russische steur op deze gel moeilijk van elkaar te onderscheiden zijn, en noem een manier om dat op te lossen."));
  choiceStep(think,{q:"Waardoor komen korte stukken DNA verder in de gel dan lange?",opts:["ze glippen makkelijker door de gaatjes van de gel","ze zijn zwaarder geladen","ze worden sneller gemaakt"],right:0,
    ok:"Ja. Hoeveel verschillen 186 en 188 bp, en wat betekent dat voor de plek van de banden?",no:"Denk aan het netwerk van agarose.",onDone:unlock});
  openAnswer(ans,{id,pts:1,checks:["de producten verschillen maar <b>2 bp</b> en komen dus bijna even ver (de banden liggen bijna op elkaar); oplossing: een gel met <b>meer agarose</b> (kleinere gaatjes) / primers kiezen die een groter lengteverschil geven"],
    model:"186 en 188 bp verschillen maar 2 basenparen; de banden komen bijna even ver en liggen bijna op elkaar. Oplossing: een gel met meer agarose (kleinere gaatjes), zodat kleine lengteverschillen beter zichtbaar worden, of andere primers die bij de twee soorten een groter lengteverschil geven.",
    valkuil:"Alleen een punt als de uitleg én een oplossing goed zijn.",
    after:()=>waaromBtn(ans,textBox("Hoe kleiner het verschil in lengte, hoe dichter de banden bij elkaar. Hoger in de gel (bij langere stukken) liggen banden bovendien al dichter op elkaar. Meer agarose maakt de gaatjes kleiner: dan scheidt de gel kleine verschillen beter. Of je kiest primers die het verschil groter maken."))});
  q.append(think,ans);
},STOF_GEL));
}else{
ids.push(vraag(2,"de strengen groeien naar elkaar toe",(q,id)=>{
  const {think,ans,unlock}=start(q,"Het stuk DNA dat het lab kopieert, ligt op een stuk dubbelstrengs DNA. Teken het in gedachten zo: de bovenste streng loopt van links naar rechts van 5' naar 3', de onderste van 3' naar 5'. Primer 1 bindt links op de onderste streng, primer 2 rechts op de bovenste streng.<br><br>"+B("Leg uit dat de nieuwe strengen vanaf de twee primers naar elkaar toe groeien, zodat het stuk ertussen wordt gekopieerd."));
  choiceStep(think,{q:"Aan welk uiteinde zet DNA-polymerase nieuwe nucleotiden?",opts:["aan het 5'-uiteinde","aan het 3'-uiteinde"],right:1,
    ok:"Ja. Wat betekent dat voor de richting waarin een nieuwe streng groeit? Teken de twee strengen met de primers en bepaal het per primer.",no:"Er moet een vrije OH-groep zijn om aan te koppelen.",onDone:unlock});
  openAnswer(ans,{id,pts:2,checks:[
    "het polymerase zet nieuwe nucleotiden alleen aan het <b>3'-uiteinde</b>: een nieuwe streng groeit van 5' naar 3' (antiparallel aan de streng waarop hij ligt)",
    "langs de onderste streng groeit de nieuwe streng vanaf primer 1 <b>naar rechts</b>; langs de bovenste streng groeit hij vanaf primer 2 <b>naar links</b>: naar elkaar toe"],
    model:"DNA-polymerase kan alleen nucleotiden aan het 3'-uiteinde koppelen, dus een nieuwe streng groeit van 5' naar 3', antiparallel aan de mal. Op de onderste streng (3' links) loopt de nieuwe streng links 5' → rechts 3': vanaf primer 1 groeit hij naar rechts. Op de bovenste streng (5' links) loopt de nieuwe streng rechts 5' → links 3': vanaf primer 2 naar links. Zo groeien ze naar elkaar toe en wordt het stuk tussen de primers gekopieerd.",
    after:()=>waaromBtn(ans,b=>{let h=`<text x="8" y="34" class="lblm">5'</text><path d="M30,30 H470" stroke="var(--text2)" stroke-width="4"/><text x="478" y="34" class="lblm">3'</text>
      <text x="8" y="134" class="lblm">3'</text><path d="M30,130 H470" stroke="var(--text2)" stroke-width="4"/><text x="478" y="134" class="lblm">5'</text>
      <rect x="70" y="108" width="60" height="10" fill="var(--goud)"/><text x="100" y="102" text-anchor="middle" class="lblm">primer 1</text>
      <path d="M130,113 H330" stroke="var(--teal)" stroke-width="3"/><path d="M322,107 L334,113 L322,119" fill="none" stroke="var(--teal)" stroke-width="3"/><text x="140" y="96" class="lblm">5' → 3'</text>
      <rect x="370" y="42" width="60" height="10" fill="var(--goud)"/><text x="400" y="68" text-anchor="middle" class="lblm">primer 2</text>
      <path d="M370,47 H170" stroke="var(--teal)" stroke-width="3"/><path d="M178,41 L166,47 L178,53" fill="none" stroke="var(--teal)" stroke-width="3"/><text x="300" y="72" class="lblm">3' ← 5'</text>`;
      b.innerHTML=svgWrap("0 0 500 150",h,"twee strengen met primers en groeirichting")+`<div class="model">Beide nieuwe strengen (blauw) groeien vanaf hun primer aan het 3'-uiteinde, dus naar het midden toe. Het stuk tussen de primers wordt zo van beide kanten gekopieerd.</div>`;})});
  q.append(think,ans);
},STOF_PCR));
}

opgave("Kaviaar","Echte kaviaar?",`
<p>Kaviaar is de kuit (de eitjes) van steuren. Veel soorten steur zijn zeldzaam. Kaviaar van de Siberische steur komt uit kwekerijen en mag verkocht worden. Kaviaar van de Russische steur mag alleen verkocht worden als die van een gekweekte steur komt.</p>
<p>De douane controleert vier blikken met het etiket ‘Siberische steur’. Een lab haalt DNA uit de eitjes en doet een PCR met primers die alleen op DNA van steuren passen. Het PCR-product is bij elke soort steur anders lang: bij de Siberische steur 154 basenparen (bp), bij de Russische steur 186 bp.</p>
<p>In afbeelding 1 zie je de gel: een marker (M), de vier blikken, een negatieve controle en een positieve controle met DNA van een Siberische steur.</p>
<div class="eyebrow">afbeelding 1 (fictieve gegevens)</div>${GEL()}`,ids);
}
