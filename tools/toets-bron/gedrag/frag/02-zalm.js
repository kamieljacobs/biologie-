/* ===== Opgave 2: Zalmen ruiken hun rivier (EI-gedrag-D01, D02 havo, D03, D04 vwo) ===== */
{
const STOF_PROEF={titel:"Aangeboren of aangeleerd?",html:`
<p><b>Aangeboren gedrag</b> hoeft een dier niet te leren; het verloopt bij alle soortgenoten op dezelfde manier. <b>Aangeleerd gedrag</b> ontstaat door ervaring.</p>
<p>Hoe weet je of iets aangeleerd is? Je vergelijkt dieren die een ervaring wel hebben gehad met dieren die hem niet hebben gehad. Zo liet William Thorpe jonge vinken opgroeien zonder ooit een andere vink te horen. Ze zongen wel, maar een kaal liedje: de aanleg is aangeboren, het complete lied wordt geleerd.</p>
<p>Een eerlijke proef test zo dat maar één ding verschilt tussen de groepen.</p>`,
films:[F.wdd,F.inp]};
const STOF_SP={titel:"Inprenting en de sensitieve periode",html:`
<p>Een gansje leert in de eerste uren na het uitkomen wie zijn moeder is: wat beweegt, geluid maakt en dichtbij is. Dat heet <b>inprenting</b>. Het gaat snel, het jong krijgt er geen beloning voor, en het effect blijft lang bestaan.</p>
<p>Zo'n tijdvenster, waarin een ervaring veel invloed heeft, heet een <b>sensitieve periode</b>. Daarvóór of daarna heeft dezelfde ervaring veel minder effect. Ook mensen hebben sensitieve periodes, bijvoorbeeld bij zien (een lui oog) en bij het horen van taalklanken.</p>
<p>In een grafiek zie je een sensitieve periode als een piek: alleen bij een bepaalde leeftijd heeft de ervaring een groot effect.</p>`,
films:[F.inp]};
const STOF_VIER={titel:"De vier vragen van Tinbergen",html:`
<p>Bij elk gedrag kun je vier vragen stellen:</p>
<ol style="margin:0;padding-left:22px"><li><b>Oorzaak</b>: hoe werkt het, nu, in het dier? Welke prikkel van buiten, welk hormoon van binnen?</li>
<li><b>Ontwikkeling</b>: hoe ontstaat dit gedrag in het leven van het dier? Aangeboren, aangeleerd of allebei?</li>
<li><b>Functie</b>: wat levert het gedrag op?</li>
<li><b>Evolutie</b>: waar komt het vandaan? Daarvoor vergelijk je verwante soorten.</li></ol>
<p>De vier antwoorden spreken elkaar niet tegen: het zijn antwoorden op verschillende vragen.</p>`+(VWO?`<p>Oorzaak en ontwikkeling gaan over dit ene dier, in zijn leven: <b>nabije</b> oorzaken. Functie en evolutie gaan over de soort, over vele generaties: <b>uiteindelijke</b> oorzaken.</p>`:""),
films:[F.wdd]};

const d1=vraag(2,"een controlegroep",(q,id)=>{
  const {think,ans,unlock}=start(q,"Een criticus zegt: ‘Misschien vinden zalmen morfoline gewoon van nature lekker, en heeft de week met morfoline niets te maken.’ "+B("Leg uit welke controlegroep de onderzoekers hadden moeten toevoegen om dit te weerleggen, en welk resultaat je dan bij die groep verwacht. Gebruik afbeelding 1."));
  choiceStep(think,{q:"De criticus denkt dat de voorkeur aangeboren is. Met welke groep kun je zien hoe zalmen kiezen zonder de ervaring met morfoline?",opts:["een groep die twee weken morfoline krijgt in plaats van één","een groep die nooit morfoline krijgt, maar verder hetzelfde wordt behandeld","een groep wilde zalmen uit een andere rivier"],right:1,
    ok:"Ja: dan verschilt maar één ding. Welk resultaat verwacht je bij die groep als de criticus ongelijk heeft?",no:"Bij een eerlijke vergelijking verschilt maar één ding tussen de groepen. Welk ding wil je hier weglaten?",
    onDone:()=>choiceStep(think,{q:"Kijk in afbeelding 1 naar de groepen die de week met morfoline kregen op 6 of op 24 maanden. Welk deel koos daar de tak met morfoline?",opts:["ongeveer 10 %","ongeveer 50 %","ongeveer 90 %"],right:1,
      ok:"Goed. Wat betekent ongeveer 50 % als een zalm uit twee takken moet kiezen? Gebruik dat voor je verwachting bij de controlegroep.",no:"Lees de punten bij 6 en 24 maanden af op de verticale as.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Een groep zalmen die <b>nooit morfoline</b> kreeg (verder hetzelfde behandeld).",
    "Als ze geen aangeboren voorkeur hebben, kiest <b>ongeveer 50 %</b> de tak met morfoline, net als de groepen van 6 en 24 maanden in afbeelding 1."],
    model:"Ze hadden een groep zalmen moeten toevoegen die nooit water met morfoline kreeg, maar verder precies hetzelfde werd behandeld. Hebben zalmen geen aangeboren voorkeur voor morfoline, dan kiest ongeveer 50 % van die groep de tak met morfoline: toeval tussen twee takken, net als bij de groepen van 6 en 24 maanden in afbeelding 1. De hoge waarde rond 18 maanden komt dan door de week met morfoline.",
    valkuil:"Wilde zalmen ‘uit een andere rivier’ verschillen op meer dan één punt van de proefzalmen. En alleen ‘geen morfoline geven’ zonder verwachte uitkomst is 1 punt.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Op 6 en op 24 maanden had de week met morfoline geen effect: ongeveer 50 % kiest de tak met morfoline. Bij twee takken is dat wat je door toeval verwacht.",o:{lijn50:true}},
      {cap:"De controlegroep krijgt nooit morfoline. Als zalmen morfoline niet van nature lekker vinden, verwacht je ook hier ongeveer 50 %.",o:{lijn50:true,controle:true,dimPunten:true}},
      {cap:"Kiest de controlegroep inderdaad ongeveer 50 %, dan komt de 90 % rond 18 maanden door de week met morfoline: de zalmen hebben de geur geleerd. Kiest de controlegroep veel vaker morfoline, dan heeft de criticus gelijk.",o:{band:[16.5,19.5,"var(--goud)","geleerd"],controle:true}}],
      (st,s)=>st.innerHTML=ZALM(s.o)))});
  q.append(think,ans);
},STOF_PROEF);

const ids=[d1];
if(!VWO){
ids.push(vraag(2,"de kwekerij in het voorjaar",(q,id)=>{
  const {think,ans,unlock}=start(q,"Een kwekerij kweekt jonge zalmen in water uit haar eigen put tot ze 24 maanden oud zijn, en laat ze dan pas los in de rivier. Volwassen zalmen die terugkomen, zwemmen niet de rivier op, maar zoeken de uitstroom van de kwekerij. "+B("Leg met afbeelding 1 uit hoe dat komt, en bedenk een maatregel."));
  choiceStep(think,{q:"Bij welke leeftijd had de week met morfoline het grootste effect?",opts:["rond 6–12 maanden","rond 15–21 maanden","rond 24 maanden"],right:1,
    ok:"Ja: alleen in die periode leren de zalmen een geur goed. Waar zaten de zalmen van de kwekerij in die periode?",no:"Zoek in afbeelding 1 de punten die ver boven de 50 % liggen.",
    onDone:()=>choiceStep(think,{q:"In welk water zwommen de kwekerijzalmen toen ze 15 tot 21 maanden oud waren?",opts:["in het water van de rivier","in het water van de kwekerij (uit de put)"],right:1,
      ok:"Goed. Leg uit wat ze dus hebben geleerd. Bedenk daarna een maatregel die ervoor zorgt dat ze in die periode de goede geur leren.",no:"Lees de vraag nog eens: tot welke leeftijd blijven ze in de kwekerij?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Tijdens de <b>sensitieve periode</b> (rond 15–21 maanden) zaten de zalmen in het <b>water van de kwekerij</b>, dus ze leerden die geur en niet die van de rivier.",
    "Maatregel: de zalmen <b>vóór of tijdens die periode</b> (rond 15–18 maanden) in de rivier loslaten / tijdens die periode <b>rivierwater door de kwekerij</b> laten stromen."],
    model:"Afbeelding 1 laat zien dat zalmen een geur vooral leren rond 15 tot 21 maanden: dat is hun sensitieve periode. In die tijd zaten de kwekerijzalmen nog in het water uit de put. Ze leerden dus de geur van de kwekerij en niet die van de rivier, en zoeken als volwassen zalm die geur op. Maatregel: laat de zalmen al rond 15 maanden los in de rivier, of laat in die periode rivierwater door de kwekerij stromen.",
    valkuil:"‘Ze zijn aan de kwekerij gewend geraakt’ is niet genoeg: noem dat ze tijdens de sensitieve periode (de piek in afbeelding 1) in het water van de kwekerij zaten. Een maatregel die pas ná die periode iets verandert, werkt niet.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Afbeelding 1: alleen rond 15–21 maanden heeft een week met een geur veel effect. Dat is de sensitieve periode.",o:{band:[15,21,"var(--goud)","sensitieve periode"]}},
      {cap:"De kwekerijzalmen zitten tot 24 maanden in het water uit de put. De hele sensitieve periode ruiken ze dus de kwekerij.",o:{band:[15,21,"var(--goud)","sensitieve periode"],kwek:[24,"in de kwekerij"]}},
      {cap:"Maatregel: zorg dat ze in die periode de rivier ruiken, door ze eerder los te laten of rivierwater door de kwekerij te laten stromen.",o:{band:[15,21,"var(--groen)","rivierwater nodig"],kwek:[15,"kwekerij"]}}],
      (st,s)=>st.innerHTML=ZALM(s.o)))});
  q.append(think,ans);
},STOF_SP));
}

ids.push(vraag(1,"welke vraag van Tinbergen?",(q,id)=>{
  const {think,ans,unlock}=start(q,"Zalmen die terugkeren naar hun eigen rivier, paaien op een plek waar hun eigen ouders ook succes hadden. "+B("Op welke van de vier vragen van Tinbergen geeft de zin ‘zo komen hun jongen in een geschikte rivier terecht’ antwoord?"));
  selectsStep(think,{uid:"q"+id,q:"Oefen eerst met de stekelbaars uit de film. Bij welke vraag hoort elk antwoord?",rows:[
    ["‘Hij ziet rood aan de onderkant, en in het voorjaar maakt hij veel testosteron.’",["oorzaak","ontwikkeling","functie","evolutie"],0],
    ["‘Het gedrag is aangeboren en wordt met ervaring wat bijgesteld.’",["oorzaak","ontwikkeling","functie","evolutie"],1],
    ["‘Hij houdt zijn territorium en zijn nest, en krijgt meer jongen.’",["oorzaak","ontwikkeling","functie","evolutie"],2],
    ["‘Verwante vissoorten met elkaar vergelijken.’",["oorzaak","ontwikkeling","functie","evolutie"],3]],
    ok:"Goed. Bekijk nu de zin over de zalmen: op welke van deze vier vragen lijkt hij?",no:"Oorzaak = hoe het nu werkt; ontwikkeling = hoe het in zijn leven ontstaat; functie = wat het oplevert; evolutie = waar het vandaan komt.",onDone:unlock});
  mc(ans,{qid:id,pts:1,right:2,opts:["oorzaak","ontwikkeling","functie","evolutie"],
    onChecked:()=>waaromBtn(ans,textBox("De zin zegt wat het gedrag <b>oplevert</b>: jongen in een geschikte rivier. Dat is de <b>functie</b>. De zalm denkt daarbij zelf niet ‘ik zoek een goede plek voor mijn jongen’; hij volgt de geur. Dat zou een antwoord op de oorzaak zijn. Het antwoord is <b>C</b>."))});
  q.append(think,ans);
},STOF_VIER));

if(VWO){
const STOF_NU={titel:"Nabij en uiteindelijk",html:`
<p>De vier vragen van Tinbergen kun je in twee groepen verdelen.</p>
<p><b>Nabije oorzaken</b> gaan over dit ene dier, in zijn leven: hoe werkt het gedrag nu (oorzaak), en hoe is het in zijn leven ontstaan (ontwikkeling)?</p>
<p><b>Uiteindelijke oorzaken</b> gaan over de soort, over vele generaties: wat levert het gedrag op (functie), en hoe is het in de loop van de evolutie ontstaan?</p>
<p>Een dier hoeft de functie van zijn gedrag niet te ‘weten’. De functie verklaart waarom het gedrag bij de soort is gebleven, niet wat het dier op dat moment denkt.</p>`,
films:[F.wdd]};
ids.push(vraag(2,"nabij en uiteindelijk",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Geef bij het terugzwemmen van de zalm naar zijn eigen rivier een nabije en een uiteindelijke verklaring."));
  chipsStep(think,{q:"Welke van de vier vragen van Tinbergen horen bij een <b>nabije</b> verklaring? Kies alles wat klopt.",items:[["oorzaak",1],["ontwikkeling",1],["functie",0],["evolutie",0]],
    ok:"Goed. Bedenk nu voor de zalm: wat gebeurt er in zijn eigen leven (wat leerde hij, wat neemt hij nu waar)? En waarom is dit gedrag over vele generaties bij de soort gebleven?",no:"Nabij gaat over dit ene dier, in zijn eigen leven. Welke vragen gaan over de soort?",onDone:unlock});
  openAnswer(ans,{id,pts:2,checks:[
    "Nabij: de zalm <b>ruikt de geur</b> van de rivier die hij als jonge zalm (in de sensitieve periode) heeft <b>geleerd</b>, en zwemt naar die geur toe.",
    "Uiteindelijk: zalmen die terugzwemmen naar een rivier waarin zij zelf goed opgroeiden, krijgen gemiddeld <b>meer nakomelingen die overleven</b>; daardoor is dit gedrag bij de soort gebleven."],
    model:"Nabij: de zalm heeft als jonge zalm, in de sensitieve periode, de geur van zijn rivier geleerd. Nu ruikt hij die geur en zwemt hij ernaartoe. Uiteindelijk: een rivier waarin een zalm zelf goed is opgegroeid, is waarschijnlijk ook geschikt voor zijn jongen. Zalmen die zo terugzwemmen, kregen gemiddeld meer nakomelingen die overleefden, en daarom is dit gedrag bij de soort gebleven.",
    valkuil:"‘Hij wil dat zijn jongen het goed hebben’ is geen uiteindelijke verklaring: de zalm denkt dat niet. Noem wat het gedrag oplevert in aantal nakomelingen, over generaties.",
    after:()=>waaromBtn(ans,textBox("Een nabije verklaring blijft binnen het leven van deze ene zalm: wat hij geleerd heeft en wat hij nu waarneemt. Een uiteindelijke verklaring gaat over vele generaties: zalmen met dit gedrag kregen meer jongen die overleefden, dus het gedrag bleef. Beide verklaringen zijn tegelijk waar: het zijn antwoorden op verschillende vragen."))});
  q.append(think,ans);
},STOF_NU));
}

opgave("Zalmen","Zalmen ruiken hun rivier",`
<p>Zalmen komen uit het ei in een rivier. Na een tot twee jaar trekken de jonge zalmen naar zee. Jaren later zwemmen ze terug, vaak naar precies de rivier waar ze opgroeiden, om daar eieren te leggen en te bevruchten (paaien). Onderzoekers denken dat jonge zalmen de geur van hun rivier leren in de periode dat ze naar zee gaan trekken.</p>
<p>In een proef kregen groepen jonge zalmen in een kwekerij één week lang water met een geurstof, morfoline. Elke groep kreeg die week op een andere leeftijd. Tijdens die week kregen ze niet meer voer dan anders. Daarna werden alle zalmen in een meer losgelaten. Toen ze jaren later terugkwamen, kwamen ze bij een splitsing van de rivier; in één tak werd morfoline gedruppeld. Afbeelding 1 laat zien welk deel van de teruggekeerde zalmen de tak met morfoline koos.</p>
<div class="eyebrow">afbeelding 1</div>${ZALM()}
<p class="muted" style="font-size:14px;margin:4px 0 0">Afbeelding 1 Teruggekeerde zalmen die de tak met morfoline kozen, per leeftijd tijdens de week met morfoline (fictieve gegevens)</p>`,ids);
}
