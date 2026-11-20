/* ===== Opgave 3: De hoogste bomen (EI-planten-H01, H02, H03 uit toetsen-biologie) ===== */
{
const STOF_OMHOOG={titel:"Water omhoog",html:`
<p>In het blad verdampt water uit de cellen in luchtholtes; de waterdamp ontsnapt door de <b>huidmondjes</b>. Dat is <b>transpiratie</b>. Verdampt er water, dan trekken de bladcellen nieuw water uit de houtvaten: de <b>zuigkracht van de bladeren</b>. Worteldruk duwt maar een klein beetje mee.</p>
<p>Watermoleculen trekken sterk aan elkaar door waterstofbruggen: <b>cohesie</b>. Ze plakken ook aan de wand van de houtvaten: <b>adhesie</b>. Zo blijft het water in een houtvat één ononderbroken draad. Water stroomt van hoge naar lage druk.</p>`,
films:[F.trans]};
const STOF_TURGOR={titel:"Turgor en strekking",html:`
<p>Een plantencel neemt water op in zijn <b>vacuole</b>, door osmose. De vacuole duwt van binnen tegen de celwand. Die druk heet <b>turgor</b>.</p>
<p>In de strekkingszone maakt auxine de celwand soepeler. Dan geeft de wand mee en rekt de cel uit in de lengte: <b>strekking</b>. Een cel kan zo wel tien keer zo lang worden, vooral met water en weinig bouwstof.</p>`,
films:[F.groei,F.trans]};
const STOF_HUID={titel:"Huidmondjes",html:`
<p>Een <b>huidmondje</b> is een opening tussen twee <b>sluitcellen</b>. Hun wand is aan de kant van de opening dikker. Zwellen de sluitcellen op, dan buigen ze uit elkaar en gaat de opening open. Verliezen ze water, dan sluit de opening.</p>
<p>Door dezelfde opening gaat waterdamp naar buiten én koolstofdioxide naar binnen. Een plant moet dus steeds ‘kiezen’ tussen water sparen en gassen uitwisselen.</p>`,
films:[F.trans,F.groei]};

const q1=vraag(2,"spanning bovenin de boom",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Leg in twee stappen uit waardoor het water in de houtvaten bovenin de boom onder grotere spanning staat dan onderin. Gebruik de begrippen zuigkracht van de bladeren en cohesie."));
  choiceStep(think,{q:"Waardoor trekken de bladcellen water uit de houtvaten?",opts:["doordat er water uit het blad verdampt (transpiratie)","doordat de wortels het water omhoog duwen","doordat de bladeren suiker maken"],right:0,
    ok:"Ja: dat is de zuigkracht van de bladeren. Waarom breekt de waterkolom daarbij niet af?",no:"Worteldruk duwt maar een klein beetje. De trek komt van bovenaf.",
    onDone:()=>choiceStep(think,{q:"Een touw hangt aan een haak, met een zwaar gewicht aan het onderste eind. Waar staat het touw onder de grootste spanning?",opts:["vlak bij de haak, bovenaan","vlak bij het gewicht, onderaan","overal even veel"],right:0,
      ok:"Goed: het bovenste stuk draagt het hele touw eronder. Vergelijk de waterkolom in een houtvat met dat touw.",no:"Welk stuk van het touw moet het meeste gewicht dragen?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "door de transpiratie trekken de bladcellen water uit de houtvaten (<b>zuigkracht van de bladeren</b>); door <b>cohesie</b> hangt de hele waterkolom aan die trek",
    "bovenin moet de hele (zware) waterkolom eronder mee omhoog worden getrokken: daar is de <b>druk het laagst</b> en de <b>spanning het grootst</b>"],
    model:"Door transpiratie trekken de bladcellen water uit de houtvaten: de zuigkracht van de bladeren. Door cohesie trekken de watermoleculen aan elkaar, zodat de hele waterkolom aan die trek hangt. Bovenin moet de trek de hele zware kolom eronder omhoog trekken. Daar is de druk het laagst en de spanning het grootst.",
    valkuil:"Alleen de begrippen uitleggen (‘cohesie is dat watermoleculen aan elkaar trekken’) zonder de stap naar ‘bovenin moet de hele kolom eronder worden meegetrokken’ levert hooguit 1 punt op.",
    after:()=>waaromBtn(ans,textBox("De trek komt van bovenaf: water verdampt uit de bladeren en de bladcellen trekken nieuw water uit de houtvaten. Door <b>cohesie</b> is het water één draad, als een touw. Het bovenste stuk van dat touw draagt het hele gewicht eronder: bovenin is de druk dus het laagst en de spanning het grootst. Hoe hoger de boom, hoe groter die spanning, en daarom kan een kustmammoetboom niet onbeperkt hoger worden."))});
  q.append(think,ans);
},STOF_OMHOOG);

const q2=vraag(2,"kleine naalden bovenin",(q,id)=>{
  const {think,ans,unlock}=start(q,"In tabel 1 zie je dat de naalden bovenin de boom kleiner blijven dan onderin.<br><br>"+B("Leg uit hoe een grote spanning in de houtvaten ervoor kan zorgen dat de naalden bovenin kleiner blijven. Gebruik de begrippen turgor en strekking."));
  choiceStep(think,{q:"Hoe wordt een cel in een groeiende naald langer?",opts:["hij neemt water op in zijn vacuole en rekt uit tegen een soepele celwand","hij maakt steeds meer celwand bij","hij deelt zich steeds weer"],right:0,
    ok:"Ja: zo worden cellen langer. Wat heeft zo'n cel daarvoor dus nodig?",no:"De meeste lengte komt niet van delen of van bouwstof.",
    onDone:()=>choiceStep(think,{q:"Het water in de houtvaten bovenin staat onder grote spanning: het wordt hard naar boven getrokken. Wat betekent dat voor een cel in een groeiende naald daar?",opts:["die krijgt makkelijk extra water","die krijgt moeilijker water"],right:1,
      ok:"Goed. Maak nu de keten af met turgor en strekking.",no:"Als het water in de houtvaten zelf al hard wordt weggetrokken, kan een cel er dan makkelijk water uit halen?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "bij een grote spanning krijgen de cellen in de groeiende naalden <b>minder water</b>: de vacuole drukt minder hard tegen de celwand, de <b>turgor is lager</b>",
    "zonder genoeg turgor <b>strekken</b> de cellen minder; de naalden worden dus minder lang"],
    model:"Bij een grote spanning in de houtvaten krijgen de cellen van de groeiende naalden moeilijk water. Hun vacuole drukt dan minder hard tegen de celwand: de turgor is lager. Zonder genoeg turgor strekken de cellen minder, en blijven de naalden kort.",
    valkuil:"‘De naalden krijgen minder voedsel’ is niet de uitleg die gevraagd wordt: het gaat om water, turgor en strekking.",
    after:()=>waaromBtn(ans,textBox("Strekken gaat met water: de cel neemt water op in zijn vacuole, de <b>turgor</b> duwt tegen de soepele celwand en de cel rekt uit. Bovenin de boom wordt het water in de houtvaten hard weggetrokken, dus komt er minder water in de groeiende cellen. Lagere turgor betekent minder <b>strekking</b>, en dus kortere naalden: 5 mm op 100 meter tegen 20 mm op 20 meter."))});
  q.append(think,ans);
},STOF_TURGOR);

const q3=vraag(2,"huidmondjes bovenin dicht",(q,id)=>{
  const {think,ans,unlock}=start(q,"Op een warme middag sluiten de huidmondjes bovenin de boom eerder dan onderin.<br><br>"+B("Leg uit waarom, en leg uit wat het gevolg is voor de fotosynthese van de naalden bovenin."));
  choiceStep(think,{q:"Wanneer sluit een huidmondje?",opts:["als de sluitcellen water verliezen","als de sluitcellen opzwellen","als het licht wordt"],right:0,
    ok:"Ja. Waar in de boom krijgen de bladcellen het minst water?",no:"Zwellen de sluitcellen op, dan buigen ze uit elkaar en gaat de opening open.",
    onDone:()=>choiceStep(think,{q:"Wat komt er via de huidmondjes het blad in?",opts:["koolstofdioxide","glucose","mineralen"],right:0,
      ok:"Goed. Welke stof heeft de fotosynthese daarvan nodig?",no:"Glucose maakt het blad zelf, mineralen komen via de houtvaten. Wat komt er uit de lucht?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "bovenin krijgen de bladcellen het <b>minst water</b> (grootste spanning); de sluitcellen verliezen water (of: abscisinezuur) en de huidmondjes sluiten",
    "er komt <b>minder CO₂</b> binnen, dus <b>minder fotosynthese</b> (minder suiker) bovenin"],
    model:"Bovenin is de spanning in de houtvaten het grootst en krijgen de bladcellen het minste water. Op een warme middag verliezen de sluitcellen daar het eerst water, dus sluiten de huidmondjes daar eerder. Dan komt er minder CO₂ het blad in, en doen de naalden bovenin minder fotosynthese.",
    valkuil:"‘Bovenin is het warmer’ is geen biologische uitleg; het gaat om het water dat de sluitcellen krijgen. ‘Minder fotosynthese doordat er minder licht is’ is fout: het licht is er wel, CO₂ komt niet binnen.",
    after:()=>waaromBtn(ans,textBox("Hoe minder water de sluitcellen krijgen, hoe eerder ze slap worden en de opening sluiten. Bovenin, met de grootste spanning in de houtvaten, gebeurt dat het eerst. Dicht = water gespaard, maar ook <b>geen CO₂</b> naar binnen. Zonder CO₂ kan de calvincyclus geen glucose maken, dus doen de naalden bovenin minder fotosynthese. Dat sluit aan bij wat de onderzoekers zagen."))});
  q.append(think,ans);
},STOF_HUID);

opgave("Hoogste bomen","De hoogste bomen",`
<p>De hoogste levende boom die bekend is, is een kustmammoetboom (<i>Sequoia sempervirens</i>) in Californië van 112,7 meter. Onderzoekers die in deze bomen klommen, concludeerden dat het water bovenin onder zoveel spanning staat, dat de bladeren daar slechter uitgroeien en minder fotosynthese doen. Volgens hun berekening kan een kustmammoetboom niet veel hoger worden dan 122 tot 130 meter.</p>
${TABEL(1,["hoogte in de boom (m)","gemiddelde lengte van een naald (mm)"],[[20,20],[60,12],[100,5]],"(vereenvoudigd, fictieve getallen)")}`,[q1,q2,q3]);
}
