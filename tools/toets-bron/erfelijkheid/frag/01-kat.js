/* ===== Opgave: De Siamese kat (havo en vwo) ===== */
{
const STOF1={titel:"Chromosomen, genen en allelen",html:`
<p>In de kern van een lichaamscel liggen de chromosomen in <b>paren</b>: van elk paar komt er één van de vader en één van de moeder. Zo'n paar heet een paar <b>homologe chromosomen</b>. Een cel met paren is <b>diploïd</b> (2n). Een geslachtscel krijgt van elk paar maar één chromosoom: hij is <b>haploïd</b> (n).</p>
<p>Een <b>gen</b> is een stuk DNA met de informatie voor één eiwit. Het ligt op een vaste plek op een chromosoom, de <b>locus</b>. Een gen kan in verschillende varianten voorkomen: de <b>allelen</b>. Omdat chromosomen in paren liggen, heb je van elk gen (op de autosomen) twee allelen.</p>
<p>Je <b>genotype</b> is de combinatie van allelen; je <b>fenotype</b> is wat je kunt waarnemen. Het fenotype hangt af van het genotype én van het <b>milieu</b> (de omstandigheden). Bij een <b>dominant</b> allel is één exemplaar genoeg voor het kenmerk; een <b>recessief</b> allel zie je alleen als er geen dominant allel naast ligt.</p>`,
films:[F.chrom]};
const q1=vraag(1,"chromosomen in een eicel",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Hoeveel chromosomen zitten er in een eicel van een kat?"));
  choiceStep(think,{q:"Lichaamscellen zijn <b>diploïd</b>. Wat betekent dat?",
    opts:["de chromosomen liggen in paren","de cel heeft twee kernen","elk chromosoom bestaat uit twee chromatiden"],right:0,
    ok:"Ja: van elk chromosoom heeft de cel er twee, één van de vader en één van de moeder.",
    no:"Het gaat niet om kernen of chromatiden, maar om hoe vaak elk soort chromosoom voorkomt.",
    onDone:()=>choiceStep(think,{q:"Hoeveel chromosomen van elk paar krijgt een geslachtscel?",opts:["allebei","één van de twee","geen"],right:1,
      ok:"Goed. Een geslachtscel is <b>haploïd</b>. Reken nu uit hoeveel dat er bij een kat zijn.",no:"Bij de bevruchting komen een eicel en een zaadcel samen. Hoeveel moet elk dan meebrengen om weer paren te krijgen?",onDone:unlock})});
  mc(ans,{qid:id,pts:1,right:0,opts:["19","38","76"],onChecked:()=>waaromBtn(ans,textBox(
    "Een lichaamscel van een kat heeft 38 chromosomen: 19 paren. Een eicel krijgt van elk paar één chromosoom, dus 19. Bij de bevruchting komen 19 + 19 weer samen tot 38. Het antwoord is <b>A</b>."))});
  q.append(think,ans);
},STOF1);

const q2=vraag(2,"gen, allel en locus",(q,id)=>{
  pre(q,"<p>Over de katten in deze opgave worden vier uitspraken gedaan.</p>");
  q.append(el("p",{class:"qtext"},"1 In een huidcel van een Siamese kat liggen twee allelen voor tyrosinase, op twee homologe chromosomen.<br>2 Alle geslachtscellen van een Siamese kat bevatten het allel c<sup>s</sup>.<br>3 Een kat met het genotype Cc<sup>s</sup> heeft een Siamese tekening met wat minder donkere points.<br>4 De allelen C en c<sup>s</sup> liggen op dezelfde plaats (locus) van een chromosoom.<br><br><b>Geef bij elke uitspraak aan of hij juist of onjuist is.</b>"));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  selectsStep(think,{uid:"q"+id,q:"Koppel elk begrip aan de goede omschrijving.",rows:[
    ["gen",["stuk DNA met de informatie voor één eiwit","een variant van een gen","de plek op een chromosoom waar een gen ligt"],0],
    ["allel",["stuk DNA met de informatie voor één eiwit","een variant van een gen","de plek op een chromosoom waar een gen ligt"],1],
    ["locus",["stuk DNA met de informatie voor één eiwit","een variant van een gen","de plek op een chromosoom waar een gen ligt"],2]],
    ok:"Goed. Bedenk bij uitspraak 3 ook wat <b>dominant</b> betekent: is één allel C genoeg voor normaal werkend tyrosinase?",
    no:"Een gen is het ‘onderwerp’ (bijvoorbeeld tyrosinase), een allel is een uitvoering ervan.",onDone:unlock});
  juistOnjuist(ans,{id,stm:["twee allelen op homologe chromosomen","alle geslachtscellen bevatten c<sup>s</sup>","Cc<sup>s</sup> geeft een lichtere Siamese tekening","C en c<sup>s</sup> op dezelfde locus"],key:[true,true,false,true],
    uitleg:textBox("1 <b>juist</b>: van elk chromosoompaar komt er één van de vader en één van de moeder, dus twee allelen.<br>2 <b>juist</b>: een Siamese kat is c<sup>s</sup>c<sup>s</sup>, dus elke geslachtscel krijgt een c<sup>s</sup>.<br>3 <b>onjuist</b>: C is dominant. Eén allel C maakt genoeg werkend tyrosinase, dus de kat heeft een normale, egale kleur .<br>4 <b>juist</b>: allelen zijn varianten van hetzelfde gen en liggen dus op dezelfde locus van homologe chromosomen.")});
  q.append(think,ans);
},STOF1);

const q3=vraag(2,"genotype en milieu",(q,id)=>{
  pre(q,"<p>Siamese kittens worden helemaal wit geboren. Pas na een paar weken worden de poten, de staart, de oren en de snuit donker.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit hoe het komt dat bij een volwassen Siamese kat alleen de poten, staart, oren en snuit donker zijn, terwijl alle huidcellen hetzelfde genotype hebben. Leg ook uit waarom pasgeboren kittens helemaal wit zijn."));
  choiceStep(think,{q:"Hebben de huidcellen in de poot en in de rug van een Siamese kat hetzelfde genotype?",
    opts:["ja: alle lichaamscellen komen uit één bevruchte eicel","nee: in de poten zitten meer allelen c<sup>s</sup>"],right:0,
    ok:"Ja. Het verschil zit dus niet in de allelen, maar in de omstandigheden: het <b>milieu</b>.",no:"Bij elke celdeling wordt het DNA precies gekopieerd. Elke lichaamscel heeft dus dezelfde allelen.",
    onDone:()=>choiceStep(think,{q:"Waar is het lichaam van een kat het koelst?",opts:["in de romp","in de poten, staart, oren en snuit","overal even warm"],right:1,
      ok:"Juist: uitstekende delen geven veel warmte af en zijn verder van de warme romp. Wat betekent dat voor het tyrosinase van c<sup>s</sup>?",no:"Denk aan je eigen handen en oren als het koud is.",
      onDone:()=>choiceStep(think,{q:"Hoe warm is het voor een kitten in de baarmoeder?",opts:["overal ongeveer even warm als de romp van de moeder","koeler dan buiten"],right:0,
        ok:"Goed. Je hebt nu alles voor beide delen van de vraag.",no:"De baarmoeder ligt diep in de buik van de moeder.",onDone:unlock})})});
  openAnswer(ans,{id,pts:2,checks:[
    "In de <b>koelere</b> lichaamsdelen (poten, staart, oren, snuit) werkt het tyrosinase van c<sup>s</sup> wel, dus daar wordt <b>melanine</b> gemaakt; in de warme rest van het lichaam niet.",
    "In de <b>baarmoeder</b> is het overal warm (lichaamstemperatuur), dus werkt het tyrosinase nergens en wordt er geen pigment gemaakt: de kittens zijn wit."],
    model:"Het tyrosinase van c<sup>s</sup> werkt alleen onder ongeveer 33 °C. Poten, staart, oren en snuit zijn koeler dan de romp, dus alleen daar maken de pigmentcellen melanine. In de baarmoeder is het overal even warm, dus daar werkt het enzym nergens en zijn de kittens wit. Het milieu (de temperatuur) bepaalt hier mee het fenotype.",
    valkuil:"‘In de poten zitten andere allelen.’ Alle cellen hebben hetzelfde genotype; alleen de temperatuur verschilt.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Alle huidcellen: genotype c<sup>s</sup>c<sup>s</sup>. Overal ligt hetzelfde recept voor tyrosinase.",t:0},
      {cap:"In de warme romp (± 38 °C) verliest het enzym zijn vorm: geen melanine, lichte vacht.",t:1},
      {cap:"In de koele uiteinden (onder ± 33 °C) werkt het enzym wel: melanine, donkere points.",t:2},
      {cap:"In de baarmoeder is alles warm: nergens melanine, dus een wit kitten. Genotype + milieu = fenotype.",t:3}],(st,s)=>{
      const warm="var(--koraal)",koel="var(--teal)";const T=s.t;
      const kleur=d=>T===2&&d?"var(--text)":"var(--surface)";
      const lab=T===0?"":T===3?`<text x="320" y="200" text-anchor="middle" class="lbl" style="fill:${warm}">overal warm</text>`:
        `<text x="300" y="70" text-anchor="middle" class="lbl" style="fill:${warm}">romp: warm</text><text x="120" y="190" class="lbl" style="fill:${koel}">uiteinden: koel</text>`;
      st.innerHTML=svgWrap("0 0 560 220",`
        <ellipse cx="300" cy="120" rx="130" ry="48" fill="${T===1||T===2?"var(--koraal-soft)":"var(--surface)"}" stroke="var(--text2)" stroke-width="1.5"/>
        <circle cx="150" cy="95" r="34" fill="var(--surface)" stroke="var(--text2)" stroke-width="1.5"/>
        <path d="M128,68 l6,-26 l14,22 M160,64 l12,-22 l4,26" fill="${kleur(1)}" stroke="var(--text2)" stroke-width="1.5"/>
        <ellipse cx="128" cy="104" rx="14" ry="10" fill="${kleur(1)}" stroke="var(--text2)" stroke-width="1.2"/>
        ${[210,250,350,390].map(x=>`<rect x="${x-9}" y="150" width="18" height="44" rx="8" fill="${kleur(1)}" stroke="var(--text2)" stroke-width="1.4"/>`).join("")}
        <path d="M428,112 q70,-10 96,-70" fill="none" stroke="${T===2?"var(--text)":"var(--text2)"}" stroke-width="${T===2?12:3}" stroke-linecap="round"/>
        ${lab}<text x="540" y="212" text-anchor="end" class="lblm">c<tspan baseline-shift="super" font-size="9">s</tspan>c<tspan baseline-shift="super" font-size="9">s</tspan> in elke cel</text>`,"Siamese kat: koele delen donker");}))});
  q.append(think,ans);
},STOF1);

const q4=vraag(1,"genotype van de ouders",(q,id)=>{
  pre(q,"<p>Twee katten met een normale, egale vachtkleur krijgen samen een Siamees kitten.</p>");
  const {think,ans,unlock}=start(q,B("Wat is het genotype van deze twee ouders?"));
  choiceStep(think,{q:"Welk genotype heeft het Siamese kitten?",opts:["CC","Cc<sup>s</sup>","c<sup>s</sup>c<sup>s</sup>"],right:2,
    ok:"Ja. En van wie kreeg het kitten die twee allelen c<sup>s</sup>?",no:"Een Siamese tekening krijg je alleen als er geen dominant allel C is.",
    onDone:()=>choiceStep(think,{q:"Van wie kreeg het kitten een allel c<sup>s</sup>?",opts:["allebei van één ouder","één van de vader en één van de moeder"],right:1,
      ok:"Goed. Beide ouders hebben dus een c<sup>s</sup>. Maar ze hebben zelf een normale kleur…",no:"Elke ouder geeft van elk gen precies één allel door.",onDone:unlock})});
  mc(ans,{qid:id,pts:1,right:1,opts:["beide CC","beide Cc<sup>s</sup>","de een CC, de ander Cc<sup>s</sup>","dat is hieruit niet af te leiden"],onChecked:()=>waaromBtn(ans,textBox(
    "Het kitten is c<sup>s</sup>c<sup>s</sup> en kreeg van elke ouder één c<sup>s</sup>. De ouders hebben zelf een normale kleur, dus ook een dominant C. Beide ouders zijn dus <b>Cc<sup>s</sup></b>: het allel c<sup>s</sup> zat bij hen ‘verborgen’. Het antwoord is <b>B</b>."))});
  q.append(think,ans);
},STOF1);

opgave("Siamese kat","De Siamese kat",`
<p>Siamese katten hebben een lichte vacht met donkere poten, staart, oren en snuit: de ‘points’. De donkere kleur komt door het pigment melanine. Voor de aanmaak van melanine is het enzym <i>tyrosinase</i> nodig.</p>
<p>Het gen voor tyrosinase heeft bij katten een allel C, dat zorgt voor normaal werkend tyrosinase, en een allel c<sup>s</sup>. Het tyrosinase van c<sup>s</sup> werkt alleen als het koeler is dan ongeveer 33 °C; bij een hogere temperatuur verliest het enzym zijn vorm. Het allel C is dominant over c<sup>s</sup>. Siamese katten hebben het genotype c<sup>s</sup>c<sup>s</sup>.</p>
<p>Een lichaamscel van een kat bevat 38 chromosomen. Ga er in deze opgave van uit dat er van dit gen alleen de allelen C en c<sup>s</sup> voorkomen.</p>`,[q1,q2,q3,q4]);
}
