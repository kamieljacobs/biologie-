/* ===== Opgave 9 (vwo 8): Een bloemrijke dijk (EI-milieu-I01–I04) ===== */
{
const TAB3=TABEL(3,["","oud beheer, april","nieuw beheer, april","oud beheer, juni","nieuw beheer, juni"],[
  ["honingbijen","1","2","6","18"],["hommels","0","9","1","12"],["andere wilde bijen en zweefvliegen","1","7","3","25"]],true);
const STOF_BEH={titel:"Natuur beheren",html:`
<p>In veel natuurgebieden grijpt de mens in om een bepaald soort natuur te houden: <b>natuurbeheer</b>. Zonder beheer groeit een heide langzaam dicht met gras, berken en dennen. Daarom laat men er schapen of runderen grazen. In graslanden wordt <b>gemaaid</b>; soms blijft het maaisel liggen, soms wordt het <b>afgevoerd</b>.</p>
<p>Beheer is vaak jarenlang werk: het effect van een andere manier van maaien zie je pas na een aantal jaren.</p>`,
films:[F.ingrijpen,F.aarde]};
const i1=vraag(1,"voedselarmer door het nieuwe beheer",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Leg uit waardoor de bodem van de dijk door het nieuwe beheer voedselarmer wordt."));
  choiceStep(think,{q:"Bij het oude beheer bleef het maaisel liggen. Wat gebeurt er dan met de stoffen in dat maaisel?",opts:["het wordt afgebroken en de mineralen komen terug in de bodem","het verdwijnt helemaal naar de lucht"],right:0,
    ok:"Ja. Wat gebeurt er dus met die mineralen als je het maaisel afvoert? En wat is er nog meer veranderd aan het beheer?",no:"Reducenten breken het maaisel af tot koolstofdioxide, water en mineralen.",onDone:unlock});
  openAnswer(ans,{id,pts:1,checks:[
    "Met het maaisel worden <b>voedingsstoffen (stikstof, fosfaat) afgevoerd</b> en er komt <b>geen mest</b> meer bij."],
    model:"In het gras zitten mineralen, zoals stikstof en fosfaat, die het uit de bodem heeft opgenomen. Door het maaisel af te voeren, haal je die mineralen weg van de dijk. En omdat er niet meer bemest wordt, komen er ook geen nieuwe bij. Zo wordt de bodem steeds armer.",
    valkuil:"Alleen ‘er wordt minder vaak gemaaid’ is geen uitleg. Het gaat om de mineralen die met het maaisel weggaan en de mest die niet meer komt.",
    after:()=>waaromBtn(ans,textBox("Oud beheer: het maaisel bleef liggen, werd afgebroken en de mineralen kwamen terug in de bodem. Daar kwam elk jaar mest bij. Nieuw beheer: het maaisel gaat weg, mét de mineralen die erin zitten, en er komt geen mest meer bij. Er gaat dus meer weg dan erbij komt."))});
  q.append(think,ans);
},STOF_BEH);

const STOF_BIO={titel:"Biodiversiteit en bestuivers",html:`
<p><b>Biodiversiteit</b> is de verscheidenheid aan leven. Je kunt die op drie niveaus bekijken: verschillen in genen binnen een soort, het aantal verschillende soorten, en de verschillende ecosystemen.</p>
<p>Bijen en hommels leven van <b>nectar en stuifmeel</b> uit bloemen. In Nederland leven ruim 350 soorten wilde bijen, plus zweefvliegen, vlinders en kevers. Een honingbij wordt gehouden door een imker.</p>`,
films:[F.grenzen,F.ingrijpen]};
const i2=vraag(2,"meer soorten wilde bijen",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Leg uit hoe het nieuwe beheer kan leiden tot meer soorten wilde bijen op de dijk."));
  choiceStep(think,{q:"Welke planten groeien hard op een voedselrijke, bemeste bodem?",opts:["grassen (en bijvoorbeeld brandnetels)","kleine planten van arme grond"],right:0,
    ok:"Ja. Die nemen dan het licht en de ruimte weg. Wat verandert er als de bodem armer wordt?",no:"Denk aan wat stikstofdepositie in de natuur doet.",
    onDone:()=>choiceStep(think,{q:"Waar leven bijen van?",opts:["van nectar en stuifmeel uit bloemen","van gras","van kleine insecten"],right:0,
      ok:"Goed. Bezoeken alle soorten wilde bijen dezelfde bloemen? Leg nu de hele keten uit, van de bodem tot de bijen.",no:"Bijen bezoeken bloemen.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Op voedselarme grond <b>groeien grassen minder hard</b>, zodat (meer soorten) <b>bloemen van arme grond ruimte</b> krijgen.",
    "Meer soorten bloemen geven <b>nectar en stuifmeel voor meer soorten bijen</b> (met elk hun eigen bloemen)."],
    model:"Op een voedselarme bodem groeien de grassen minder hard. Daardoor krijgen veel soorten bloemen van arme grond weer licht en ruimte. Meer soorten bloemen betekent meer verschillende nectar en stuifmeel, op verschillende momenten in het jaar. Veel soorten wilde bijen zijn op hun eigen bloemen aangewezen, dus kunnen er meer soorten bijen leven.",
    valkuil:"‘Er zijn meer bloemen, dus meer bijen’ gaat over het aantal bijen, niet over het aantal soorten. Noem dat meer soorten bloemen voedsel geven voor meer soorten bijen.",
    after:()=>waaromBtn(ans,textBox("De keten: <b>armere bodem</b> → grassen groeien minder hard → <b>meer soorten bloemen</b> krijgen ruimte → meer soorten nectar en stuifmeel → <b>meer soorten wilde bijen</b>, die elk hun eigen bloemen bezoeken."))});
  q.append(think,ans);
},STOF_BIO);

const STOF_DIENST={titel:"Ecosysteemdiensten",html:`
<p>Een <b>ecosysteemdienst</b> is iets wat de mens uit de natuur haalt, zonder ervoor te betalen. Er zijn drie soorten:</p>
<ul style="margin:0;padding-left:20px"><li><b>leveren</b>: de natuur levert spullen, zoals voedsel, hout en grondstoffen voor medicijnen;</li>
<li><b>regelen</b>: processen in de natuur regelen dingen voor ons, zoals de bodem die water zuivert, of een nevengeul die bij hoogwater water afvoert;</li>
<li><b>beleven</b>: de natuur als plek om te wandelen, te sporten en tot rust te komen.</li></ul>`,
films:[F.grenzen]};
const i3=vraag(2,"de fruitteler en de bestuivers",(q,id)=>{
  const {think,ans,unlock}=start(q,"De fruitteler naast de dijk is blij met het nieuwe beheer. <b>Leg met tabel 3 uit welke ecosysteemdienst de dijk voor hem levert, en waarom vooral de vele wilde bestuivers in april voor hem belangrijk zijn.</b>");
  choiceStep(think,{q:"Wat doen de bestuivers van de dijk voor de appelbomen van de fruitteler?",opts:["ze zorgen dat de bloesem bestoven wordt en vrucht zet","ze leveren hout","ze maken de grond rijker"],right:0,
    ok:"Ja. Is dat leveren, regelen of beleven?",no:"Bestuivers brengen stuifmeel van bloem naar bloem.",
    onDone:()=>numStep(think,{uid:"q"+id+"n",q:"Lees tabel 3. Hoeveel hommels en andere wilde bijen en zweefvliegen samen komen er in <b>april</b> bij het <b>nieuwe beheer</b> per uur langs?",right:16,
      ok:"Ja: 16, tegen 2 honingbijen. Wanneer bloeien appels, en hoe is het weer dan vaak?",no:"Tel in de kolom ‘nieuw beheer, april’ de hommels en de andere wilde bijen en zweefvliegen op.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "<b>Regelen</b>: bestuiving van de appelbloesem.",
    "Appels <b>bloeien in het voorjaar</b>; in april zijn er (bij het nieuwe beheer) veel meer hommels en andere wilde bestuivers dan honingbijen (9 + 7 tegen 2); vooral <b>hommels vliegen ook bij koud en bewolkt weer</b> (en sommige andere wilde bijen), dus wordt de bloesem betrouwbaarder bestoven."],
    model:"De dijk levert een regelende ecosysteemdienst: bestuiving van de appelbloesem. Appels bloeien in april. In april komen er bij het nieuwe beheer 9 hommels en 7 andere wilde bestuivers per uur langs, maar maar 2 honingbijen. Vooral hommels vliegen ook als het koud en bewolkt is, en dan blijft een honingbij thuis. Zo wordt de bloesem ook in een koud voorjaar bestoven.",
    valkuil:"‘Leveren, want hij krijgt appels’: de appels groeien aan zijn eigen bomen. Wat de dijk doet, is het proces bestuiving: regelen.",
    after:()=>waaromBtn(ans,textBox("Bestuiving is een proces in de natuur dat iets voor ons regelt: een <b>regelende</b> dienst. In juni zijn er ook veel honingbijen (18), maar dan bloeien de appels al lang niet meer. In april, als de bloesem er is, zijn er vooral <b>hommels en andere wilde bestuivers</b> (9 + 7 = 16 tegen 2 honingbijen). Vooral hommels vliegen ook bij koud en bewolkt weer, als een honingbij thuisblijft. Met veel soorten bestuivers is de oogst betrouwbaarder."))});
  q.append(think,ans);
},STOF_DIENST);

const STOF_STAB={titel:"Stabiliteit en veerkracht",html:`
<p>Een ecosysteem krijgt regelmatig een <b>verstoring</b>: een droge zomer, een overstroming, een ziekte. <b>Veerkracht</b> is hoe snel een ecosysteem na zo'n verstoring herstelt.</p>
<p>Een voedselweb met veel soorten heeft meer verbindingen. In de film: valt één prooi weg, dan kan een rover overstappen op een andere.</p>`,
films:[F.ingrijpen,F.soort]};
const i4=vraag(2,"na een droge zomer",(q,id)=>{
  pre(q,"<p>Na een heel droge zomer is het gras op het deel met oud beheer grotendeels bruin en dood. Op het deel met nieuw beheer is het na een paar weken weer groen.</p>");
  const {think,ans,unlock}=start(q,B("Verklaar dit verschil met de begrippen biodiversiteit en veerkracht."));
  choiceStep(think,{q:"Op welk deel van de dijk groeien de meeste soorten planten?",opts:["op het deel met oud beheer","op het deel met nieuw beheer"],right:1,
    ok:"Ja: daar is de biodiversiteit hoger. Reageren al die soorten hetzelfde op droogte?",no:"Lees de inleiding nog eens: waar groeien veel meer soorten bloemen?",
    onDone:()=>choiceStep(think,{q:"Welke zin past bij veerkracht?",opts:["hoe snel een ecosysteem herstelt na een verstoring","hoeveel soorten er in een ecosysteem leven","hoe groot een ecosysteem is"],right:0,
      ok:"Goed. Gebruik beide begrippen in je verklaring: wat doen de andere soorten als er één wegvalt?",no:"Lees de uitleg van de stof.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Op het nieuwe deel groeien veel meer soorten (<b>hogere biodiversiteit</b>); daaronder zijn soorten die <b>beter tegen droogte</b> kunnen.",
    "Valt de ene soort weg, dan <b>nemen andere het over</b>, zodat het ecosysteem sneller herstelt na de verstoring (<b>veerkracht</b>)."],
    model:"Op het deel met nieuw beheer groeien veel meer soorten planten: de biodiversiteit is hoger. Daaronder zitten soorten die beter tegen droogte kunnen. Gaan sommige soorten dood, dan nemen de andere hun plek in. Daardoor herstelt dat deel sneller na de droge zomer: het heeft meer veerkracht. Op het oude deel staan vooral een paar soorten gras, die allemaal tegelijk verdrogen.",
    valkuil:"‘Er groeien meer bloemen, dus het is groener’ gebruikt de begrippen niet. Leg uit dat meer soorten betekent dat er altijd soorten zijn die de droogte overleven en het overnemen.",
    after:()=>waaromBtn(ans,textBox("Op het oude deel groeien vooral een paar soorten gras met ongeveer dezelfde tolerantie: droogte raakt ze allemaal tegelijk. Op het nieuwe deel groeien veel meer soorten (<b>hogere biodiversiteit</b>), met verschillende toleranties. Een deel overleeft de droogte en groeit daarna snel weer uit. Zo herstelt het ecosysteem sneller: meer <b>veerkracht</b>."))});
  q.append(think,ans);
},STOF_STAB);

opgave("Bloemrijke dijk","Een bloemrijke dijk",`
<p>Een waterschap beheert een dijk langs een rivier. Vroeger werd het gras op de dijk bemest en elke paar weken gemaaid; het maaisel bleef liggen. Sinds tien jaar wordt de dijk niet meer bemest en twee keer per jaar gemaaid, en wordt het maaisel afgevoerd. Er groeien nu veel meer soorten bloemen. Naast de dijk ligt een appelboomgaard.</p>
<p>Onderzoekers tellen op beide delen van de dijk hoeveel bestuivers er per uur op een stuk van 10 meter langskomen (tabel 3).</p>
${TAB3}`,[i1,i2,i3,i4]);
}
