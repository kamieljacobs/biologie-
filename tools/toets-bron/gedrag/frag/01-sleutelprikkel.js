/* ===== Opgave 1: Waarom doet een dier wat het doet? (EI-gedrag-KA01) ===== */
{
const STOF={titel:"Prikkel en reactie",html:`
<p>Een bioloog kijkt naar gedrag als een reactie op een <b>prikkel</b>: wat neemt het dier waar, en wat doet het dan? Een prikkel kan van buiten komen (iets wat het dier ziet, hoort of ruikt) en van binnen (bijvoorbeeld een hormoon).</p>
<p>Gedrag dat een dier niet hoeft te leren, en dat bij alle soortgenoten op dezelfde manier verloopt, heet <b>aangeboren gedrag</b>. <b>Aangeleerd gedrag</b> ontstaat door ervaring. Vaak is gedrag een mix van allebei, zoals de zang van een vink.</p>
<p>Wil je weten waar een dier precies op reageert, dan bied je het modellen aan die steeds op één punt verschillen, en kijk je welk model de reactie uitlokt.</p>`,
films:[F.wdd]};
const q1=vraag(2,"de sleutelprikkel van de stekelbaars",(q,id)=>{
  const {think,ans,unlock}=start(q,"Een stekelbaarsmannetje valt in het voorjaar een rode postauto aan. "+B("Beschrijf de proef van Tinbergen met nepvissen, en leg met die proef uit wat een sleutelprikkel is."));
  choiceStep(think,{q:"Wat wilde Tinbergen met de nepvissen te weten komen?",opts:["of stekelbaarzen kunnen leren","waar het mannetje precies op reageert","hoe snel een stekelbaars zwemt"],right:1,
    ok:"Ja. Hij hield daarom nepvissen in het water die er heel verschillend uitzagen.",no:"De vraag gaat over nepvissen die steeds ergens in verschilden. Wat kun je daarmee uitzoeken?",
    onDone:()=>choiceStep(think,{q:"Een postauto lijkt helemaal niet op een vis, en toch valt het mannetje hem aan. Wat zegt dat over waar het mannetje op reageert?",opts:["op het hele plaatje van een rivaal","op een deel van het plaatje","op iets wat hij over postauto's heeft geleerd"],right:1,
      ok:"Goed. Beschrijf nu welke nepvissen Tinbergen gebruikte en welke het mannetje aanviel. Leg daarna uit wat een sleutelprikkel is.",no:"Als het mannetje alleen een echte vis zou aanvallen, liet hij de postauto met rust.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Een <b>ruwe klodder met een rode onderkant</b> werd fel aangevallen, een <b>echt lijkende vis zonder rood</b> bijna niet.",
    "Dus <b>één kenmerk</b> (rood aan de onderkant) is genoeg om een <b>vaste reactie</b> (de aanval) uit te lokken: dat is een sleutelprikkel."],
    model:"Tinbergen hield nepvissen in het water: een heel echt lijkende stekelbaars zonder rode buik, en ruwe klodders die nauwelijks op een vis leken, maar wel een rode onderkant hadden. De klodders met rood werden fel aangevallen, de echte vorm zonder rood bijna niet. Eén kenmerk, rood aan de onderkant, is dus genoeg om een vaste reactie, de aanval, in gang te zetten. Zo'n kenmerk heet een sleutelprikkel. Daarom valt het mannetje ook de rode postauto aan.",
    valkuil:"Alleen ‘een prikkel die een reactie uitlokt’, zonder ‘één kenmerk’ of ‘vaste reactie’: 0 punten voor het tweede element.",
    after:()=>waaromBtn(ans,textBox("Het mannetje reageert niet op het hele plaatje van een rivaal, maar op één kenmerk: rood aan de onderkant. Dat kenmerk past als een sleutel op een slot en zet een vaste, aangeboren reactie in gang. De postauto heeft dat ene kenmerk ook, dus ook die wordt ‘aangevallen’. Het mannetje denkt daarbij niet na; hij ziet rood, en valt aan."))});
  q.append(think,ans);
},STOF);
opgave("Sleutelprikkel","Waarom doet een dier wat het doet?","",[q1]);
}
