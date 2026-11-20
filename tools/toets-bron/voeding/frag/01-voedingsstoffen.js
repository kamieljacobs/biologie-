/* ===== Opgave 1: Voedingsstoffen (havo K102 + K107, vwo K104 + K107; film 1) ===== */
{
const STOF_VS={titel:"Voedingsstoffen en hun taken",html:`
<p>Biologen sorteren de stoffen in je eten in <b>zes groepen voedingsstoffen</b>: koolhydraten, eiwitten, vetten, water, mineralen en vitaminen. Daarnaast zitten er <b>voedingsvezels</b> in plantaardig voedsel, die je zelf niet verteert.</p>
<p>Je lichaam gebruikt voedingsstoffen voor vier taken:</p>
<ul style="margin:0;padding-left:20px"><li><b>bouwstof</b>: om je lichaam te maken en te herstellen;</li><li><b>brandstof</b>: om energie uit te halen;</li><li><b>reservestof</b>: om energie te bewaren voor later;</li><li><b>regelstof</b>: om de stofwisseling goed te laten lopen.</li></ul>
<p>Eén stof kan meer dan één taak hebben. De energie in voedsel druk je uit in kilojoule (kJ).</p>`,
films:[F.eten]};
const STOF_AZ={titel:"Eiwit en aminozuren",html:`
<p>Een eiwit is een lange keten van bouwstenen: <b>aminozuren</b>. Er zijn twintig soorten. Het eiwit uit je eten knip je eerst in losse aminozuren; daarmee bouw je je eigen eiwitten, zoals enzymen, hormonen, antistoffen en spiereiwit.</p>
<p>De meeste aminozuren kan je lichaam zelf maken uit andere stoffen. Een paar niet: die moeten in je voeding zitten. Dat zijn de <b>essentiële aminozuren</b>.</p>`,
films:[F.eten,F.lever]};

const ids=[];
if(!VWO)ids.push(vraag(2,"juist of onjuist: voedingsstoffen",(q,id)=>{
  pre(q,"<p>Hieronder staan enkele uitspraken.</p>");
  q.append(el("p",{class:"qtext"},UITSPRAKEN(["Vitaminen zijn regelstoffen.","Water is geen bouwstof: het is alleen een oplosmiddel.","Calcium is bouwstof voor je botten.","Koolhydraten leveren het snelst energie.","Een gram vet levert ongeveer evenveel energie als een gram koolhydraat.","Glycogeen is een keten van glucose, die je vooral in je lever en spieren bewaart.","Je lichaam kan nieuw eiwit bouwen uit alleen koolhydraten en vetten."],"Geef bij elke uitspraak aan of hij juist of onjuist is.")));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  chipsStep(think,{q:"Voor welke taken gebruikt je lichaam voedingsstoffen? Kies alles wat klopt.",items:[["bouwstof",1],["brandstof",1],["reservestof",1],["regelstof",1],["afvalstof",0]],
    ok:"Goed: bouwen, branden, bewaren en regelen. Ga nu elke uitspraak langs: welke taak of welke stof wordt bedoeld?",no:"Eén keuze is geen taak van een voedingsstof: die stof wil je lichaam juist kwijt.",onDone:unlock});
  juistOnjuist(ans,{id,stm:["Vitaminen zijn regelstoffen.","Water is geen bouwstof: het is alleen een oplosmiddel.","Calcium is bouwstof voor je botten.","Koolhydraten leveren het snelst energie.","Een gram vet levert ongeveer evenveel energie als een gram koolhydraat.","Glycogeen is een keten van glucose, die je vooral in je lever en spieren bewaart.","Je lichaam kan nieuw eiwit bouwen uit alleen koolhydraten en vetten."],
    key:[true,false,true,true,false,true,false],
    uitleg:textBox("1 <b>juist</b> · 3 <b>juist</b> · 4 <b>juist</b> · 6 <b>juist</b>.<br>2 <b>onjuist</b>: water is ook bouwstof; meer dan de helft van je lichaam is water.<br>5 <b>onjuist</b>: een gram vet levert ongeveer 37 kJ, een gram koolhydraat ongeveer 17 kJ: ruim twee keer zoveel.<br>7 <b>onjuist</b>: alleen eiwit levert de aminozuren voor nieuw eiwit (koolhydraten en vetten bevatten geen stikstof).<br>Alles goed: 2 punten, één fout: 1 punt.")});
  q.append(think,ans);
},STOF_VS));

if(VWO)ids.push(vraag(2,"rekenen met het etiket van havermout",(q,id)=>{
  pre(q,"<p>Op een pak havermout staat per 100 gram: 13 g eiwit, 7 g vet, 59 g koolhydraten en 10 g voedingsvezel. Eiwit en koolhydraat leveren 17 kJ per gram, vet 37 kJ per gram. Reken de vezels niet mee.</p>");
  const {think,ans,unlock}=start(q,B("Bereken hoeveel kJ een portie van 40 gram havermout levert."));
  numStep(think,{uid:"q"+id+"n",q:"Hoeveel kJ leveren de 13 g eiwit in 100 g havermout?",right:221,
    ok:"Ja: 13 × 17 = 221 kJ. Reken zo ook het vet en de koolhydraten uit en tel alles op.",no:"Vermenigvuldig het aantal gram met het aantal kJ per gram.",
    onDone:()=>choiceStep(think,{q:"Je weet de energie in 100 g. Hoe reken je dat om naar een portie van 40 g?",opts:["× 0,40","÷ 40","× 40"],right:0,
      ok:"Goed. Vul nu beide uitkomsten in.",no:"40 g is minder dan 100 g. Welk deel van 100 g is 40 g?",onDone:unlock})});
  NUM(ans,{id,fields:[
    ["energie in 100 g havermout","kJ",v=>Math.abs(v-1483)<=3||(v>=590&&v<=595),"13 × 17 + 7 × 37 + 59 × 17 = 221 + 259 + 1003 = 1483 kJ per 100 g (meteen met de grammen per 40 g rekenen is ook goed)"],
    ["energie in een portie van 40 g","kJ",(v,a)=>(v>=590&&v<=595)||(a[0]>0&&!(a[0]>=590&&a[0]<=595)&&Math.abs(v-a[0]*0.4)<=Math.max(2,a[0]*0.004)),"1483 × 0,40 = 593 kJ (590–595 kJ is goed). Rekenfout in de eerste stap maar daarna goed doorgerekend: dit punt telt wel."]],
    after:()=>waaromBtn(ans,textBox("Per 100 g: eiwit 13 × 17 = 221 kJ, vet 7 × 37 = 259 kJ, koolhydraten 59 × 17 = 1003 kJ. Samen <b>1483 kJ</b>. Een portie van 40 g is 0,40 deel daarvan: 1483 × 0,40 ≈ <b>593 kJ</b>. De 10 g vezels tel je niet mee: die verteer je zelf niet."))});
  q.append(think,ans);
},STOF_VS));

ids.push(vraag(2,"Sanne eet bijna alleen graaneiwit",(q,id)=>{
  pre(q,"<p>Sanne is vegan. Ze eet genoeg eiwit, maar bijna alleen uit granen (brood, pasta, rijst).</p>");
  const {think,ans,unlock}=start(q,B("Leg in twee stappen uit waarom Sanne toch minder eigen eiwit kan bouwen dan je op grond van de hoeveelheid eiwit zou verwachten. Beschrijf ook wat er gebeurt met de aminozuren die zij over heeft."));
  choiceStep(think,{q:"Wat is een essentieel aminozuur?",opts:["een aminozuur dat je lichaam niet zelf kan maken","een aminozuur dat alleen in vlees zit","het aminozuur waarvan een eiwit het meest bevat"],right:0,
    ok:"Ja: dat moet in je voeding zitten. Wat gebeurt er als er van zo'n aminozuur te weinig is?",no:"Denk aan wat ‘essentieel’ betekent: je kunt niet zonder, en je lichaam kan het niet zelf …",
    onDone:()=>choiceStep(think,{q:"Kan je lichaam aminozuren die je over hebt bewaren als voorraad, zoals vet of glycogeen?",opts:["ja, in een eiwitvoorraad in de spieren","nee, een aparte eiwitvoorraad bestaat niet"],right:1,
      ok:"Klopt. Bedenk dus ook wat er met de overgebleven aminozuren gebeurt, en in welk orgaan.",no:"Spieren zijn geen voorraad: elk eiwit in je lichaam heeft een taak.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Granen bevatten van één <b>essentieel aminozuur weinig</b>; dat aminozuur is het eerst op en <b>bepaalt hoeveel eiwit</b> ze kan bouwen.",
    "De overige aminozuren worden in de <b>lever afgebroken</b>: het stikstofdeel wordt <b>ureum</b>, de rest brandstof of vet."],
    model:"In granen zit van één essentieel aminozuur weinig. Sanne kan dat aminozuur niet zelf maken, dus als het op is, kunnen eiwitten met die bouwsteen niet af. Dat aminozuur bepaalt hoeveel eiwit ze kan bouwen. De andere aminozuren die ze dan over heeft, worden in de lever afgebroken: het stikstofdeel wordt ureum, de rest wordt brandstof of vet.",
    valkuil:"Ook goed bij het eerste punt: ‘ze moet granen combineren met peulvruchten’, als je uitlegt dat die elkaar aanvullen. ‘Plantaardig eiwit mist aminozuren’ is 0 punten: plantaardig voedsel bevat alle negen essentiële aminozuren, alleen van sommige weinig."});
  q.append(think,ans);
},STOF_AZ));

opgave("Voedingsstoffen","Voedingsstoffen","",ids);
}
