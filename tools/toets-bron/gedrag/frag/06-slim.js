/* ===== Opgave 6: Slimme dieren (EI-gedrag-KK02) ===== */
{
const STOF={titel:"Dieren eerlijk testen",html:`
<p>Het paard de slimme Hans leek rond het jaar 1904 te kunnen rekenen. Maar als de vraagsteller het antwoord zelf niet wist, of Hans hem niet kon zien, zat Hans er bijna altijd naast. Hans las de vraagsteller, die bij het goede aantal heel even rechtop ging staan.</p>
<p>Wie onderzoekt wat een dier kan, moet daarom <b>eerlijk testen, met controles</b>. En kun je gedrag verklaren met een eenvoudiger vermogen, kies dan niet voor een slimmer vermogen: dat heet de <b>regel van Morgan</b>.</p>
<p>Een uitkomst wordt pas betrouwbaar als andere onderzoekers hem bij herhaling ook vinden.</p>`,
films:[F.slim]};
const q1=vraag(2,"juist of onjuist: slimme dieren",(q,id)=>{
  const {think,ans,unlock}=uitspraken(q,"Over slimme dieren worden zes uitspraken gedaan:",[
    "Cognitie is hoe een dier informatie opneemt, onthoudt en gebruikt om problemen op te lossen.",
    "Bij inzichtelijk leren probeert een dier van alles uit, tot iets werkt.",
    "Nieuw-Caledonische kraaien kozen bij de buis met water vooral zinkende voorwerpen.",
    "Als een dier zakt voor de spiegeltest, weet je zeker dat het zichzelf niet herkent.",
    "Bij de spiegeltest zit een dier dat zichzelf lijkt te herkennen alleen met spiegel aan het vlekje.",
    "De proef met eksters werd bij herhaling door andere onderzoekers niet teruggevonden."]);
  selectsStep(think,{uid:"q"+id,q:"Proberen of inzicht? Kies bij elk voorbeeld de manier van leren.",rows:[
    ["Een rat drukt toevallig op een hendel, krijgt voer, en drukt daarna steeds vaker.",["proefondervindelijk leren","inzichtelijk leren"],0],
    ["Chimpansees stoppen met springen, kijken rond en schuiven ineens een kist onder de banaan.",["proefondervindelijk leren","inzichtelijk leren"],1]],
    ok:"Goed. Bekijk nu elke uitspraak. Let extra op woorden als ‘zeker’ en ‘alleen’: klopt dat met wat de film liet zien?",no:"Bij het ene voorbeeld gaat het met vallen en opstaan, bij het andere ineens.",onDone:unlock});
  juistOnjuist(ans,{id,stm:["cognitie: informatie opnemen, onthouden en gebruiken","inzichtelijk leren = proberen tot iets werkt","kraaien kozen vooral zinkende voorwerpen","zakken = zeker geen zelfherkenning","alleen met spiegel aan het vlekje","eksterproef niet teruggevonden"],key:[true,false,true,false,true,true],
    uitleg:textBox("1 <b>juist</b>.<br>2 <b>onjuist</b>: dat is proefondervindelijk leren (trial-and-error). Inzichtelijk leren is een plotselinge oplossing.<br>3 <b>juist</b>: daarmee stijgt het water.<br>4 <b>onjuist</b>: honden zakken, maar merken wel dat hun eigen geur veranderd is; de test moet passen bij het dier.<br>5 <b>juist</b>: zonder spiegel zit het dier niet aan die plek.<br>6 <b>juist</b>: daarom ben je voorzichtig met één proef.<br>Alles goed: 2 punten, één fout: 1 punt.")});
  q.append(think,ans);
},STOF);
opgave("Slimme dieren","Slimme dieren","",[q1]);
}
