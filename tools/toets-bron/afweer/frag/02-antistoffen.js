/* ===== Opgave 3: Antistoffen op maat (eigen vragen NB26, NB29, vwo + NB41) ===== */
{
const STOF_AS={titel:"Antigenen en antistoffen",html:`
<p>Een <b>antigeen</b> is een vormpje op een oppervlak, meestal een stukje eiwit. Ook je eigen cellen hebben antigenen; je afweer reageert alleen op antigenen die vreemd zijn.</p>
<p>De specifieke afweer werkt met <b>lymfocyten</b>. Op een <b>B-cel</b> zitten receptoren die op één vormpje passen, zoals een sleutel op één slot.</p>
<p><b>Plasmacellen</b> maken <b>antistoffen</b>: losse kopieën van de receptor van een B-cel, in de vorm van een Y. Antistoffen plakken op een ziekteverwekker, laten ziekteverwekkers samenklonteren en markeren ze, zodat fagocyten ze opruimen. Zelf doden ze niets.</p>`,
films:[F.as]};
const STOF_GEH={titel:"Primaire en secundaire reactie",html:`
<p>Bij het eerste contact met een ziekteverwekker duurt het ongeveer een week voordat er antistoffen verschijnen; de piek komt na één à twee weken. Dat is de <b>primaire afweerreactie</b>. Ondertussen ben je ziek.</p>
<p>Een deel van de nieuwe cellen wordt <b>geheugencel</b>. Die blijven jaren in je lichaam, soms je hele leven. Bij een volgend contact met <b>hetzelfde</b> antigeen worden ze snel plasmacellen: de <b>secundaire afweerreactie</b> is sneller en sterker. Dan ben je <b>immuun</b>.</p>`,
films:[F.as]};

const q1=vraag(2,"de passende B-cel was er al",(q,id)=>{
  pre(q,"<p>Het lijkt alsof je afweer ‘op maat’ een antistof maakt tegen een virus dat hij nog nooit heeft gezien.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit dat de passende B-cel er al was, en hoe je lichaam er toch genoeg van krijgt."));
  choiceStep(think,{q:"Kan een B-cel zijn receptor aanpassen aan een nieuw antigeen?",opts:["ja, tot hij past","nee, elke B-cel heeft één vaste receptor"],right:1,
    ok:"Goed. Hoe kan er dan toch een B-cel zijn die past? Denk aan wat je beenmerg de hele tijd doet.",no:"Denk aan sleutel en slot: verandert een sleutel van vorm als hij een nieuw slot tegenkomt?",
    onDone:()=>choiceStep(think,{q:"Eén passende B-cel is te weinig om een virus op te ruimen. Wat doet hij als hij het startsein krijgt?",opts:["hij deelt zich steeds opnieuw","hij maakt zijn receptor groter","hij roept fagocyten"],right:0,
      ok:"Ja. Hoe heet de groep cellen die zo ontstaat, en hoe heet het hele proces van kiezen en vermenigvuldigen?",no:"Je hebt veel cellen nodig die allemaal op hetzelfde antigeen passen. Hoe krijg je die uit één cel?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Je beenmerg maakt steeds nieuwe B-cellen, <b>elk met een andere receptor</b>: er zijn al <b>miljoenen soorten voordat het virus binnenkomt</b> (een B-cel kan zijn receptor niet aanpassen).",
    "De B-cel(len) met een <b>passende receptor worden gekozen en delen zich tot een kloon</b> (klonale selectie)."],
    model:"Je beenmerg maakt steeds nieuwe B-cellen, elk met een andere receptor. Zo heb je al miljoenen soorten voordat een virus binnenkomt; een B-cel past zijn receptor niet aan. Komt het virus binnen, dan wordt de B-cel die past gekozen. Hij deelt zich steeds opnieuw tot een kloon van precies dezelfde cellen: klonale selectie.",
    valkuil:"‘De B-cel past zijn receptor aan het virus aan’ is fout: dan lijkt het maatwerk, maar het is kiezen uit wat er al was.",
    after:()=>waaromBtn(ans,textBox("Het is <b>kiezen, niet maken</b>. Eerst zijn er miljoenen verschillende B-cellen, elk met een eigen receptor. Het virus ‘kiest’ daaruit de B-cel die past. Die vermenigvuldigt zich tot een kloon; de meeste cellen worden plasmacellen die antistoffen maken, een deel wordt geheugencel. Zo lijkt het achteraf alsof de antistof op maat gemaakt is."))});
  q.append(think,ans);
},STOF_AS);

const q2=vraag(1,"elk jaar griep, één keer waterpokken",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Waarom kun je griep elk jaar opnieuw krijgen, terwijl je waterpokken maar één keer krijgt?"));
  choiceStep(think,{q:"Waardoor word je na waterpokken niet nog eens ziek?",opts:["door geheugencellen, die jaren blijven","doordat het virus niet meer bestaat"],right:0,
    ok:"Ja. Na griep heb je dus ook geheugencellen. Waarom helpen ze dan het volgende jaar niet? Denk aan sleutel en slot.",no:"Het waterpokkenvirus bestaat nog: kinderen krijgen het elke dag.",onDone:unlock});
  mc(ans,{qid:id,pts:1,right:1,opts:[
    "Geheugencellen tegen griep leven veel korter dan geheugencellen tegen waterpokken.",
    "Het griepvirus verandert door mutaties steeds een beetje van vorm; het waterpokkenvirus bijna niet.",
    "Het griepvirus zit in cellen van de luchtwegen, waar antistoffen niet bij kunnen.",
    "Tegen griep maakt je lichaam alleen een primaire reactie."],
    onChecked:()=>waaromBtn(ans,textBox("Door <b>mutaties</b> veranderen de antigenen van het griepvirus steeds een beetje. Je oude geheugencellen passen dan minder goed, zoals een sleutel die net niet in een nieuw slot past. Het waterpokkenvirus verandert bijna niet. Het antwoord is <b>B</b>.<br>A klopt niet: geheugencellen blijven jaren; het probleem is dat ze niet meer passen. C klopt niet: griepvirussen tussen de cellen worden wél door antistoffen gevangen. D klopt niet: tegen hetzelfde griepvirus krijg je wel een secundaire reactie."))});
  q.append(think,ans);
},STOF_GEH);

const ids=[q1,q2];
if(VWO){
const STOF_Y={titel:"De bouw van een antistof (vwo)",html:`
<p>Een antistof (immunoglobuline) bestaat uit <b>vier eiwitketens</b>: twee zware en twee lichte, samen in de vorm van een Y.</p>
<p>Bijna de hele antistof is bij alle antistoffen van één klasse gelijk: het <b>constante deel</b>. Alleen de uiteinden van de armen verschillen per kloon: het <b>variabele deel</b>, met de twee bindplaatsen.</p>
<p>Een B-cel die past, gaat pas aan de slag als ook een <b>T-helpercel</b> het startsein geeft. Die hoort bij hetzelfde antigeen.</p>`,
films:[F.as,F.tc]};
ids.push(vraag(2,"een miljard receptoren (vwo)",(q,id)=>{
  pre(q,"<p>Er kunnen meer dan een miljard verschillende B-cel-receptoren ontstaan, terwijl je maar een beperkt aantal genen hebt.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit hoe dat kan, en beschrijf wat er gebeurt met B-cellen waarvan de receptor op je eigen stoffen past. Beschrijf ook wat een B-cel zelf laat zien om het startsein van een T-helpercel te krijgen."));
  choiceStep(think,{q:"Wanneer krijgt een B-cel zijn receptor?",opts:["bij het ontstaan van de B-cel, in het beenmerg","pas als hij een antigeen tegenkomt"],right:0,
    ok:"Ja. Met één gen per receptor zou je meer dan een miljard genen nodig hebben. Wat gebeurt er dus met de genstukjes bij het ontstaan van elke B-cel?",no:"Een B-cel kan zijn receptor later niet meer veranderen.",
    onDone:()=>choiceStep(think,{q:"Een willekeurig gemaakte receptor kan ook op je eigen stoffen passen. Wat zou er zonder controle dan gebeuren?",opts:["je afweer zou je eigen cellen aanvallen","er gebeurt niets, eigen stoffen zijn nooit een antigeen"],right:0,
      ok:"Goed. Waar en hoe wordt dat voorkomen?",no:"Denk aan een auto-immuunziekte.",
      onDone:()=>choiceStep(think,{q:"Een T-helpercel herkent nooit een los antigeen, alleen een stukje op een cel. Wat moet de B-cel dus doen?",opts:["stukjes van het antigeen op zijn eigen oppervlak laten zien","antistoffen naar de T-helpercel sturen","zich eerst delen"],right:0,
        ok:"Goed. Zet nu de drie delen in je antwoord.",no:"Een T-cel kijkt naar stukjes eiwit op het oppervlak van een cel.",onDone:unlock})})});
  openAnswer(ans,{id,pts:2,checks:[
    "Bij het ontstaan van elke B-cel worden <b>genstukjes willekeurig gecombineerd en onnauwkeurig aan elkaar geplakt</b>; B-cellen met een receptor tegen eigen stoffen worden <b>in het beenmerg (meestal) uitgeschakeld</b>.",
    "De B-cel laat <b>stukjes van het antigeen op zijn oppervlak</b> zien; een T-helpercel die daarop past, geeft het startsein."],
    model:"Bij het ontstaan van elke B-cel worden stukjes van een paar genen op een willekeurige manier gecombineerd en onnauwkeurig aan elkaar geplakt. Zo ontstaan meer dan een miljard verschillende receptoren. B-cellen waarvan de receptor op eigen stoffen past, worden in het beenmerg meestal uitgeschakeld. Een B-cel die een antigeen heeft gebonden, laat stukjes daarvan op zijn oppervlak zien; een passende T-helpercel geeft dan het startsein.",
    valkuil:"Ondergrens: ‘de receptor past zich aan het antigeen aan’ of ‘de B-cel muteert tot hij past’: 0 punten voor het eerste element. Alleen ‘genen worden gecombineerd’, zonder dat dit willekeurig of onnauwkeurig bij het ontstaan van elke B-cel gebeurt: ook 0 punten voor het eerste element."});
  q.append(think,ans);
},STOF_Y));
}

opgave("Antistoffen op maat","Antistoffen op maat",GEEN_INLEIDING,ids);
}
