/* ===== Opgave 10 (vwo) / 8 (havo): Cactus of wolfsmelk? (EI-evolutie-J01–J04) ===== */
{
const STOF_TAK={titel:"Kenmerken op de takken",html:`
<p>Biologen bepalen waar een tak in een cladogram hoort aan de hand van <b>kenmerken</b>. Een kenmerk dat in een voorouder ontstond, erven alle soorten die van die voorouder afstammen. Soms raakt een lijn een kenmerk later weer kwijt.</p>
<p>Je tekent zo'n kenmerk als een <b>streepje op de tak</b> waar het verscheen. Hoe meer soorten het kenmerk delen, hoe dichter bij de wortel het streepje staat. Elk nieuw kenmerk maakt de groep kleiner.</p>`,
films:[F.e8]};
const STOF_KLOK={titel:"De moleculaire klok",html:`
<p>Na een splitsing stapelen zich in beide lijnen mutaties op. Hoe langer geleden twee soorten uit elkaar gingen, hoe meer hun DNA van elkaar verschilt.</p>
<p>Mutaties stapelen zich in een gen gemiddeld in een vrij vast tempo op. Dan kun je de verschillen gebruiken als klok: de <b>moleculaire klok</b>. Je stelt hem af met fossielen waarvan de leeftijd gemeten is. Ken je het tempo, dan reken je een verschil om in een tijd.</p>
<p>DNA, fossielen en de bouw van organen vertellen meestal hetzelfde verhaal over wie met wie verwant is.</p>`,
films:[F.e7,F.e8]};

const q1=vraag(1,"waar hoort het streepje?",(q,id)=>{
  pre(q,"<p>Het kenmerk ‘stekels die omgevormde bladeren zijn’ wil je als streepje in afbeelding 3 zetten.</p>");
  const {think,ans,unlock}=start(q,B("Waar hoort dat streepje?"));
  choiceStep(think,{q:"Welke planten in afbeelding 3 hebben stekels die omgevormde bladeren zijn?",opts:["alleen de cactus","de cactus en de wolfsmelk","alle vijf"],right:0,
    ok:"Ja: ‘geen van de andere planten in afbeelding 3 heeft zulke stekels’. Een streepje zet je op de tak waar het kenmerk ontstond; alle soorten na die tak erven het.",no:"Lees de tweede alinea van de inleiding nog eens. De wolfsmelk heeft wel stekels, maar zijn het omgevormde bladeren?",onDone:unlock});
  mc(ans,{qid:id,pts:1,right:2,opts:["bij de wortel van de boom","op de tak die naar cactus en anjer samen leidt","op de tak die alleen naar de cactus leidt","op een tak naar cactus en wolfsmelk"],
    onChecked:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"<b>A</b>, bij de wortel: dan zouden alle vijf planten het kenmerk hebben. Dat is niet zo.",o:{streep:{wortel:""},kruis:{lelie:"✗"}}},
      {cap:"<b>B</b>, op de tak naar cactus en anjer: dan zou ook de anjer zulke stekels hebben.",o:{streep:{kca:""},kruis:{anjer:"✗"}}},
      {cap:"<b>D</b>: cactus en wolfsmelk staan niet samen op één tak. Hun laatste gemeenschappelijke voorouder is ook die van anjer en wilg.",o:{hl:["kca","kww"],dots:["kvier"]}},
      {cap:"<b>C</b>: alleen de cactus heeft het kenmerk. Het ontstond dus ná de splitsing van cactus en anjer, in de lijn naar de cactus.",o:{streep:{cactus:"stekels"},hl:["cactus"],vet:["cactus"]}}],
      (st,s)=>st.innerHTML=PLANTEN(s.o)))});
  q.append(think,ans);
},STOF_TAK);

const q2=vraag(2,"buitengroep en een oud kenmerk",(q,id)=>{
  pre(q,"<p>In afbeelding 3 staat de lelie als buitengroep.</p>");
  const {think,ans,unlock}=start(q,LIJST([B("Leg uit waarom biologen een buitengroep in een cladogram zetten."),B("Alle vijf planten maken bloemen. Leg uit waarom het kenmerk ‘bloemen’ niets zegt over de vraag of de cactus nauwer verwant is aan de anjer of aan de wolfsmelk.")]));
  choiceStep(think,{q:"In welke voorouder is het kenmerk ‘bloemen’ waarschijnlijk ontstaan?",opts:["in de voorouder van alle vijf planten, de lelie ook","in de voorouder van cactus en anjer","in de lijn naar de wolfsmelk"],right:0,
    ok:"Ja: ook de lelie maakt bloemen. Wat vertelt een kenmerk dat ál die planten van hun voorouder kregen over wie dichter bij wie staat?",no:"Kijk welke planten bloemen maken: alleen de cactus en de anjer?",onDone:unlock});
  openAnswer(ans,{id,pts:2,checks:[
    "een buitengroep laat zien welke kenmerken al <b>oud</b> zijn (al aanwezig bij de voorouder van alle soorten in de boom)",
    "de lelie heeft ook bloemen, dus bloemen zijn een <b>oud kenmerk</b> dat de voorouder van alle vijf al had; alleen <b>gedeelde nieuwe kenmerken</b> zeggen iets over wie dichter bij elkaar staat"],
    model:"Een buitengroep is een soort die buiten de onderzochte groep valt. Wat de buitengroep ook heeft, was al aanwezig bij de voorouder van alle soorten: dat is een oud kenmerk. De lelie maakt ook bloemen, dus bloemen zijn zo'n oud kenmerk. Cactus, anjer en wolfsmelk kregen het allemaal van dezelfde oude voorouder. Alleen gedeelde nieuwe kenmerken laten zien wie dichter bij elkaar staat.",
    valkuil:"‘Omdat alle planten bloemen hebben’ zonder het begrip oud kenmerk of de rol van de buitengroep: 0 punten voor het tweede element.",
    after:()=>waaromBtn(ans,textBox("Vergelijk het met de film: alle dieren in de boom hadden een wervelkolom, ook de haai als buitengroep. De wervelkolom zegt dus niets over wie dichter bij wie staat. Zo werkt het hier met <b>bloemen</b>: de lelie heeft ze ook, dus het kenmerk ontstond al vóór de eerste splitsing in de boom. Wie wil weten of de cactus bij de anjer of bij de wolfsmelk hoort, moet kijken naar kenmerken die alleen een deel van de planten deelt: <b>gedeelde nieuwe kenmerken</b>."))});
  q.append(think,ans);
},TERUG("Buitengroep, oude en nieuwe kenmerken",F.e8,"Kenmerken op de takken"));

const q3=vraag(2,"DNA naast het cladogram",(q,id)=>{
  pre(q,"<p>Onderzoekers vergelijken hetzelfde gen bij vier plantensoorten (fictieve gegevens):</p>"+TABEL(0,["soorten","verschil in het gen"],[["cactus – anjer","5%"],["wolfsmelk – wilg","6%"],["cactus – wolfsmelk","18%"]])+"<p>In dit gen ontstaat gemiddeld 1% verschil per 7 miljoen jaar (fictief).</p>");
  const {think,ans,unlock}=start(q,LIJST([B("Leg uit of deze gegevens passen bij het cladogram van afbeelding 3."),B("Bereken hoe lang geleden de lijnen van de wolfsmelk en de wilg splitsten.")]));
  choiceStep(think,{q:"Wat verwacht je van het DNA van twee soorten met een jonge laatste gemeenschappelijke voorouder?",opts:["weinig verschil","veel verschil","dat zegt niets over het DNA"],right:0,
    ok:"Ja. Zoek in afbeelding 3 welke paren een jonge voorouder delen, en vergelijk met de tabel.",no:"Hoe korter geleden de splitsing, hoe minder tijd er was om mutaties op te stapelen.",onDone:unlock});
  combi(ans,{id,pts:2,parts:[
    {open:true,tekst:"<b>ja</b>: soorten die in het cladogram samen een tak delen (cactus en anjer, wolfsmelk en wilg) verschillen het minst; cactus en wolfsmelk, die alleen een oudere voorouder delen, verschillen veel meer"},
    {nums:[["splitsing wolfsmelk en wilg","miljoen jaar geleden"]],ok:v=>dicht(v[0],42,0.01),tekst:"6 × 7 = <b>42 miljoen jaar</b> geleden"}],
    placeholder:"Passen de gegevens bij het cladogram? Leg uit…",
    model:"Ja. In het cladogram delen cactus en anjer een jonge voorouder, net als wolfsmelk en wilg; zij verschillen maar 5% en 6%. Cactus en wolfsmelk delen alleen een oudere voorouder en verschillen 18%. Splitsing wolfsmelk en wilg: 6 × 7 = 42 miljoen jaar geleden.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Cactus en anjer delen een jonge voorouder: weinig tijd voor mutaties, <b>5%</b> verschil.",o:{hl:["cactus","anjer"],dots:["kca"],vet:["cactus","anjer"]}},
      {cap:"Wolfsmelk en wilg ook: <b>6%</b> verschil. 6 × 7 miljoen jaar = <b>42 miljoen jaar</b> geleden splitsten ze.",o:{hl:["wolfsmelk","wilg"],dots:["kww"],vet:["wolfsmelk","wilg"]}},
      {cap:"Cactus en wolfsmelk komen pas samen in een ouder knooppunt: veel meer tijd, <b>18%</b> verschil. Het DNA past dus bij het cladogram, ook al lijken cactus en wolfsmelk zo op elkaar.",o:{hl:["kca","kww","cactus","wolfsmelk"],dots:["kvier"],vet:["cactus","wolfsmelk"]}}],
      (st,s)=>st.innerHTML=PLANTEN(s.o)))});
  q.append(think,ans);
},STOF_KLOK);

const q4=vraag(2,"stekels en doornen",(q,id)=>{
  pre(q,"<p>Een roos heeft ook scherpe ‘doornen’. Die zijn uitgroeisels van de buitenste laag van de stengel. Zowel de stekels van een cactus als de doornen van een roos beschermen de plant tegen dieren die hem willen opeten.</p>");
  const {think,ans,unlock}=start(q,B("Zijn de stekels van een cactus en de doornen van een roos homologe of analoge organen? Leg je antwoord uit."));
  choiceStep(think,{q:"Waaruit zijn de stekels van een cactus ontstaan, en waaruit de doornen van een roos?",opts:["allebei uit bladeren","cactus: uit bladeren; roos: uit de buitenste laag van de stengel","allebei uit de stengel"],right:1,
    ok:"Ja. De functie is hetzelfde. Is de bouw (de oorsprong) ook hetzelfde?",no:"Lees de inleiding en de tekst bij deze vraag nog eens.",onDone:unlock});
  openAnswer(ans,{id,pts:2,checks:[
    "<b>analoge</b> organen",
    "met een uitleg dat ze <b>dezelfde functie</b> hebben (bescherming tegen vraat), maar een <b>andere bouw en oorsprong</b> (omgevormd blad tegenover uitgroeisel van de stengel)"],
    model:"Analoge organen. Ze hebben dezelfde functie, de plant beschermen tegen vraat, maar een andere bouw en oorsprong: de stekel is een omgevormd blad, de doorn een uitgroeisel van de stengel.",
    valkuil:"‘Analoog’ zonder uitleg levert in totaal één punt op. ‘Homoloog, want dezelfde functie’ levert 0 punten op.",
    after:()=>waaromBtn(ans,textBox("<b>Homoloog</b> = dezelfde bouw, geërfd van een gemeenschappelijke voorouder, ook bij een andere functie. <b>Analoog</b> = dezelfde functie, maar een andere bouw: los van elkaar ontstaan door dezelfde selectiedruk. Een cactusstekel is een omgevormd blad, een rozendoorn een uitgroeisel van de stengel: andere oorsprong, zelfde taak. Dus <b>analoog</b>. Net zo zijn de rugvinnen van haai en dolfijn analoog."))});
  q.append(think,ans);
},{titel:"Homologe en analoge organen",html:`
<p><b>Homologe organen</b> hebben dezelfde bouw, ook als ze een andere functie hebben. De arm van een mens, de vleugel van een vleermuis en de borstvin van een walvis bevatten dezelfde botten: die erfden ze van een gemeenschappelijke voorouder.</p>
<p><b>Analoge organen</b> hebben dezelfde functie, maar een andere bouw. De vleugel van een vlinder en de vleugel van een vogel dienen allebei om te vliegen, maar ze zijn heel anders gebouwd en los van elkaar ontstaan, door dezelfde selectiedruk. Dat heet convergente evolutie.</p>
<p>Om te bepalen welke van de twee het is, kijk je dus naar de bouw en de oorsprong, niet alleen naar de functie.</p>`,films:[F.e8,F.e7]});

opgave("Cactus","Cactus of wolfsmelk?",`
<p>In de woestijnen van Amerika groeien cactussen. In droge gebieden in Afrika groeien wolfsmelken die er bijna hetzelfde uitzien: een dikke, groene stam waarin water wordt opgeslagen, (bijna) geen bladeren en scherpe stekels. Beschadig je een wolfsmelk, dan loopt er wit melksap uit; bij de meeste cactussen gebeurt dat niet.</p>
<p>De stekels van een cactus zijn omgevormde bladeren; geen van de andere planten in afbeelding 3 heeft zulke stekels. Alle vijf planten in afbeelding 3 maken bloemen.</p>
<div class="eyebrow">afbeelding 3 (vereenvoudigd, takken niet op schaal)</div>${PLANTEN()}`,[q1,q2,q3,q4]);
}
