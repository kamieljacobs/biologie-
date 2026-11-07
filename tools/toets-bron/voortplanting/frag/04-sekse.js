/* ===== Opgave 4: Een wangslijmvliestest voor de vrouwencategorie (nieuw; film 7 Sekse, gender en diversiteit) ===== */
{
/* de lagen van de sekse-ontwikkeling; hl = index van de laag die oplicht, x = lagen met een kruis */
function LAGEN({hl=-1,x=[],ok=[]}={}){
  const L=["chromosomen (XX of XY)","één gen: SRY","zaadbal of eierstok","hormonen en hun receptoren","geslachtsorganen","puberteit"];
  let s="";
  L.forEach((t,i)=>{const y=14+i*44,on=i===hl;
    s+=`<rect x="20" y="${y}" width="420" height="34" rx="10" fill="${on?"var(--goud-soft)":"var(--surface)"}" stroke="${on?"var(--goud)":"var(--line2)"}" stroke-width="${on?2.4:1.3}"/>`+
      `<text x="40" y="${y+22}" class="lbl">${i+1}</text><text x="66" y="${y+22}" class="lbl">${t}</text>`;
    if(x.includes(i))s+=`<path d="M400,${y+8} l18,18 M418,${y+8} l-18,18" stroke="var(--koraal)" stroke-width="3.4" stroke-linecap="round"/>`;
    if(ok.includes(i))s+=`<path d="M398,${y+18} l7,8 l14,-16" fill="none" stroke="var(--groen)" stroke-width="3.4" stroke-linecap="round"/>`;
    if(i<L.length-1)s+=`<path d="M230,${y+34} v10" stroke="var(--text3)" stroke-width="1.6"/>`;});
  return `<div class="vpfig" style="max-width:460px;margin:0 auto;width:100%;--min:400px">`+svgWrap("0 0 460 280",s,"Sekse-ontwikkeling in lagen")+`</div>`;}
const STOF_LAGEN={titel:"Sekse in lagen",html:`
<p>Tot ongeveer week zes ziet de aanleg van de geslachtsorganen er bij elk embryo hetzelfde uit. Welke kant het op gaat, wordt in lagen bepaald, de een na de ander:</p>
<ol style="margin:0;padding-left:22px"><li><b>Chromosomen</b>: van je moeder altijd een X, van je vader een X of een Y.</li>
<li><b>Eén gen</b>: op het Y-chromosoom ligt het <b>SRY-gen</b>. Gaat dat rond week zeven aan, dan wordt de aanleg een zaadbal; zonder SRY wordt het een eierstok.</li>
<li><b>Geslachtsklieren</b>: zaadbal of eierstok.</li>
<li><b>Hormonen</b>: zaadballen maken testosteron en een hormoon waardoor de aanleg van baarmoeder en eileiders verdwijnt. Een hormoon werkt alleen op cellen met een werkende <b>receptor</b>.</li>
<li><b>Geslachtsorganen</b> (primaire geslachtskenmerken).</li><li>Jaren later de <b>puberteit</b>: secundaire geslachtskenmerken.</li></ol>
<p>Meestal passen alle lagen bij elkaar. Maar bij elke laag kan het ook anders lopen.</p>`,
anim:b=>EXSTOF.stappen(b,[{cap:"Laag 1: XX of XY ligt vast bij de bevruchting."},{cap:"Laag 2: het SRY-gen op het Y-chromosoom zet de aanleg om tot zaadbal."},{cap:"Laag 4: hormonen werken alleen via een werkende receptor."}],(st,s,i)=>st.innerHTML=LAGEN({hl:[0,1,3][i]})),
films:[F.sekse]};
const STOF_VAR={titel:"Als een laag anders loopt",html:`
<p>Sekse ontstaat in lagen: chromosomen → het SRY-gen → zaadbal of eierstok → hormonen en hun receptoren → geslachtsorganen → puberteit. Elke laag bouwt voort op de vorige.</p>
<p>Bij elke laag kan het anders lopen. Wat een laag doet, hangt af van wat er in die laag aanwezig is én werkt: een gen dat er is maar niet werkt, of een hormoon zonder werkende receptor, heeft geen effect op de lagen erna.</p>`,
films:[F.sekse]};

const s1=vraag(1,"wat meet de test?",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Welk gen zoekt de test, en welke laag van de sekse-ontwikkeling onderzoekt hij dus?"));
  choiceStep(think,{q:"Welk gen op het Y-chromosoom bepaalt of de aanleg van de geslachtsklieren een zaadbal wordt?",opts:["het gen voor de receptor van testosteron","het SRY-gen","het gen voor testosteron"],right:1,
    ok:"Ja. Gaat de test dan over de chromosomen, één gen, de hormonen of de organen?",no:"Testosteron wordt pas gemaakt als er al een zaadbal is. Welk gen komt daarvóór?",onDone:unlock});
  mc(ans,{qid:id,pts:1,right:1,opts:["het SRY-gen: de laag van de chromosomen (XX of XY)","het SRY-gen: de laag van één gen","het gen voor de testosteronreceptor: de laag van de hormonen","het gen voor testosteron: de laag van de geslachtsklieren"],
    onChecked:()=>waaromBtn(ans,b=>{b.append(el("div",{class:"model"},"De test zoekt het <b>SRY-gen</b>: het gen op het Y-chromosoom dat de aanleg een zaadbal laat worden. Dat is laag 2, één gen. Hij telt geen chromosomen (A) en kijkt niet naar receptoren of hormonen (C, D). Precies dat is het punt van Sinclair: of het gen werkt, en wat de lagen erna doen, laat de test niet zien. Het antwoord is <b>B</b>."));b.insertAdjacentHTML("beforeend",LAGEN({hl:1}));})});
  q.append(think,ans);
},STOF_LAGEN);

const s2=vraag(2,"positief, maar geen effect van testosteron",(q,id)=>{
  pre(q,"<p>Zeven van de acht atleten die in 1996 positief testten, hadden androgeen-ongevoeligheid.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit dat een atlete met volledige androgeen-ongevoeligheid positief test, terwijl haar lichaam toch geen effect ondervindt van testosteron."));
  choiceStep(think,{q:"Welke geslachtschromosomen en welke geslachtsklieren heeft iemand met androgeen-ongevoeligheid?",opts:["XX en eierstokken","XY en zaadballen","XY en eierstokken"],right:1,
    ok:"Ja. Dus het SRY-gen is aanwezig en heeft gewerkt. Wat gaat er dan mis in de laag van de hormonen?",no:"Bij androgeen-ongevoeligheid maken de geslachtsklieren gewoon testosteron.",
    onDone:()=>choiceStep(think,{q:"Waarom heeft het testosteron geen effect op haar cellen?",opts:["er wordt geen testosteron gemaakt","de receptor voor testosteron werkt niet","het testosteron wordt meteen afgebroken in de lever"],right:1,
      ok:"Goed. Gebruik beide lagen in je uitleg: wat de test ziet, en wat de cellen doen.",no:"Er wordt testosteron gemaakt. Wat is er nodig om op een hormoon te reageren?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Ze is <b>XY</b> en heeft het <b>SRY-gen</b> (dat ook werkte: er zijn zaadballen), dus de test is positief.",
    "Haar <b>receptor voor testosteron werkt niet</b>, dus haar cellen reageren niet op het testosteron: haar lichaam heeft zich uitwendig vrouwelijk ontwikkeld, zonder effect van testosteron op bijvoorbeeld de spieren."],
    model:"Iemand met androgeen-ongevoeligheid is XY. Het SRY-gen is aanwezig, dus de test is positief, en er zijn zaadballen die testosteron maken. Maar de receptor voor testosteron werkt niet. Daardoor reageren de cellen niet op het hormoon, en heeft het lichaam zich uitwendig vrouwelijk ontwikkeld.",
    valkuil:"‘Ze maakt geen testosteron’ is fout: de zaadballen maken het wel. Het gaat mis in de receptor.",
    after:()=>waaromBtn(ans,b=>b.insertAdjacentHTML("beforeend",LAGEN({ok:[0,1,2],x:[3]})+`<p class="muted" style="font-size:14px;margin:4px 0 0">Laag 1–3 zoals bij een man (de test ziet laag 2), laag 4 stopt: de receptor werkt niet.</p>`))});
  q.append(think,ans);
},STOF_VAR);

const s3=vraag(2,"juist of onjuist: wie test positief?",(q,id)=>{
  pre(q,"<p>Over de uitslag van de SRY-test worden drie uitspraken gedaan:</p>");
  q.append(el("p",{class:"qtext"},"1 Iemand met het syndroom van Turner, met één X-chromosoom en geen tweede geslachtschromosoom, test negatief.<br>2 Iemand met het syndroom van Klinefelter test positief.<br>3 Een vrouw met AGS test positief, omdat haar bijnieren veel mannelijke hormonen maken.<br><br><b>Geef bij elke uitspraak aan of hij juist of onjuist is.</b>"));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  selectsStep(think,{uid:"q"+id,q:"Welke geslachtschromosomen horen erbij?",rows:[["syndroom van Turner",["X","XX","XY","XXY"],0],["syndroom van Klinefelter",["X","XX","XY","XXY"],3],["AGS bij een meisje",["X","XX","XY","XXY"],1]],
    ok:"Goed. Bij wie zit er dus een Y-chromosoom met het SRY-gen in de cellen?",no:"Turner: maar één geslachtschromosoom. Klinefelter: drie. Bij AGS gaat het mis in de bijnieren, niet in de chromosomen.",onDone:unlock});
  juistOnjuist(ans,{id,stm:["Turner: negatief","Klinefelter: positief","AGS: positief door de mannelijke hormonen"],key:[true,true,false],
    uitleg:textBox("1 <b>juist</b>: bij Turner is er één X en geen Y, dus geen SRY-gen.<br>2 <b>juist</b>: XXY heeft een Y met het SRY-gen.<br>3 <b>onjuist</b>: een vrouw met AGS is XX. De test zoekt een gen, geen hormonen, dus de uitslag is negatief.")});
  q.append(think,ans);
},STOF_VAR);

const STOF_GENDER={titel:"Sekse, gender en oriëntatie",html:`
<p>Vier begrippen die je goed uit elkaar houdt:</p>
<p><b>Sekse</b>, <b>genderidentiteit</b>, <b>genderexpressie</b> en <b>seksuele oriëntatie</b> zijn vier verschillende begrippen. In de film worden ze naast elkaar uitgelegd, samen met transgender, non-binair en intersekse.</p>`,
films:[F.sekse]};
const s4=vraag(2,"juist of onjuist: sekse en gender",(q,id)=>{
  pre(q,"<p>In een discussie over de test worden vier uitspraken gedaan:</p>");
  q.append(el("p",{class:"qtext"},"1 Sekse gaat over het lichaam: chromosomen, geslachtsklieren, hormonen en geslachtsorganen.<br>2 Iemand die non-binair is, heeft een lichaam dat niet in het standaardplaatje van man of vrouw past.<br>3 Een SRY-test zegt niets over iemands genderidentiteit.<br>4 Seksuele oriëntatie en genderidentiteit zijn twee woorden voor hetzelfde.<br><br><b>Geef bij elke uitspraak aan of hij juist of onjuist is.</b>"));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  selectsStep(think,{uid:"q"+id,q:"Waar gaat elk begrip over?",rows:[["intersekse",["het lichaam","hoe je jezelf ervaart","op wie je verliefd wordt"],0],["non-binair",["het lichaam","hoe je jezelf ervaart","op wie je verliefd wordt"],1],["seksuele oriëntatie",["het lichaam","hoe je jezelf ervaart","op wie je verliefd wordt"],2]],
    ok:"Goed. Bekijk nu elke uitspraak: over welk begrip gaat hij, en klopt de omschrijving?",no:"Intersekse gaat over het lichaam; gender over hoe je jezelf ervaart.",onDone:unlock});
  juistOnjuist(ans,{id,stm:["sekse gaat over het lichaam","non-binair = lichaam past niet in het standaardplaatje","een SRY-test zegt niets over genderidentiteit","seksuele oriëntatie = genderidentiteit"],key:[true,false,true,false],
    uitleg:textBox("1 <b>juist</b>.<br>2 <b>onjuist</b>: dat is intersekse. Non-binair gaat over hoe je jezelf ervaart.<br>3 <b>juist</b>: de test kijkt naar een gen, niet naar hoe iemand zichzelf ervaart.<br>4 <b>onjuist</b>: genderidentiteit is hoe je jezelf ervaart, seksuele oriëntatie op wie je verliefd wordt.<br>Vier goed: 2 punten, drie goed: 1 punt.")});
  q.append(think,ans);
},STOF_GENDER);

const ids=[s1,s2,s3,s4];
if(VWO){
const STOF_SRY={titel:"SRY: één schakelaar, een hele cascade",html:`
<p>Het SRY-gen codeert voor een eiwit dat andere genen aanzet.</p>`,
films:[F.sekse,F.cel]};
ids.push(vraag(2,"een man met XX",(q,id)=>{
  pre(q,"<p>Een SRY-test en een onderzoek van de chromosomen geven niet altijd dezelfde uitkomst. Bij ongeveer één op de twintigduizend mannen laat het chromosomenonderzoek XX zien. Ze hebben zaadballen en het SRY-gen ligt bij hen op een van de X-chromosomen.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit hoe het SRY-gen op een X-chromosoom terecht kan komen en waardoor zo'n kind met XX zaadballen krijgt."));
  choiceStep(think,{q:"Bij wie zit het SRY-gen normaal?",opts:["bij de moeder, op een X","bij de vader, op het Y-chromosoom"],right:1,
    ok:"Ja. In welke cellen van de vader kan het SRY-gen dan van plek wisselen?",no:"Het SRY-gen ligt op het Y-chromosoom. Wie heeft er een Y?",
    onDone:()=>choiceStep(think,{q:"Wat gebeurt er bij de meiose in de zaadbal met het X- en het Y-chromosoom van de vader?",opts:["ze wisselen een stukje uit, zoals bij crossing-over","ze versmelten tot één chromosoom","niets: X en Y raken elkaar nooit"],right:0,
      ok:"Goed. Gaat het SRY-gen mee naar de X, en bevrucht die zaadcel een eicel, wat krijg je dan? En wat doet SRY in het embryo?",no:"In meiose I liggen X en Y tegen elkaar, net als homologe chromosomen.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Bij de <b>meiose in de zaadbal van de vader</b> wisselen X en Y een stukje uit (crossing-over) en gaat het <b>SRY-gen mee naar het X-chromosoom</b>; een zaadcel met dat X bevrucht een eicel (X), zodat het kind XX is met SRY.",
    "Het <b>SRY-eiwit zet andere genen aan</b> (zoals SOX9, een cascade), waardoor de aanleg een <b>zaadbal</b> wordt."],
    model:"Bij de vorming van zaadcellen bij de vader wisselen X en Y aan het uiteinde een stukje uit. Heel soms loopt die uitwisseling net te ver door, en gaat het SRY-gen, dat vlak naast dat stukje ligt, mee naar het X-chromosoom. Een zaadcel met dat X bevrucht een eicel met een X: het kind is XX, maar heeft het SRY-gen. Het SRY-eiwit zet genen als SOX9 aan, die weer andere genen aanzetten, en zo wordt de aanleg een zaadbal.",
    valkuil:"‘Door een mutatie verandert een X in een Y’ is fout: het gaat om een stukje dat van de Y naar de X verhuist. Een antwoord dat alleen de verplaatsing noemt, zonder wat SRY in het embryo doet, levert 1 punt op."});
  q.append(think,ans);
},STOF_SRY));
}

opgave("Sekse-test","Een wangslijmvliestest voor de vrouwencategorie",`
<p>Sinds 1 september 2025 moet iedereen die bij wedstrijden van World Athletics, zoals het WK atletiek, in de vrouwencategorie wil uitkomen, eenmalig een DNA-test doen. Daarvoor wordt wangslijmvlies of bloed afgenomen. De test zoekt naar één gen op het Y-chromosoom: het gen dat ervoor zorgt dat de aanleg van de geslachtsklieren een zaadbal wordt. World Athletics noemt dat gen ‘een betrouwbare aanwijzing voor biologische sekse’.</p>
<p>De geneticus Andrew Sinclair, die dit gen in 1990 ontdekte, is het daar niet mee eens. Volgens hem laat de test alleen zien óf het gen aanwezig is. Hij laat niet zien of het gen werkt, of er zaadballen zijn ontstaan, of er testosteron wordt gemaakt en of het lichaam daarop kan reageren.</p>
<p>Een vergelijkbare test is al eens gebruikt. Bij de Olympische Spelen van 1996 in Atlanta testten 8 van de 3387 vrouwelijke atleten positief op het SRY-gen.</p>
<p class="muted" style="font-size:14px">Bronnen: persbericht World Athletics, 30 juli 2025; A. Sinclair in The Conversation / Daily Maverick, 25 augustus 2025.</p>`,ids);
}
