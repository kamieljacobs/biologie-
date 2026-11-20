/* ===== Opgave 2 (alleen havo): Bloedvaten en bloeddruk (KV02, KV03, KV04 uit eigen/transport.json) ===== */
if(!VWO){
const STOF_DRUK={titel:"Bloeddruk en polsslag",html:`
<p>Bij elke hartslag trekt de linkerkamer samen (<b>systole</b>) en spuit het bloed de aorta in: de druk schiet omhoog. Dat is de <b>bovendruk</b>. Daarna ontspant de kamer (<b>diastole</b>) en zakt de druk weer: de <b>onderdruk</b>. Bij een jongvolwassene in rust is dat ongeveer 120 over 80 mm kwik.</p>
<p>Een <b>bloeddrukmeter</b> knijpt met een band om je bovenarm de slagader dicht en laat hem langzaam weer los. Je <b>polsslag</b> voel je bij elke slag in een slagader.</p>
<p>Vanaf het hart vertakken de slagaders in steeds kleinere vaten, tot de <b>haarvaten</b>; daarna komen ze samen in aders.</p>`,
films:[F.druk]};
const q1=vraag(2,"juist of onjuist: bloeddruk",(q,id)=>{
  q.append(el("div",{class:"qtext"},UITSPRAKEN(6,["De bovendruk is de druk in de slagaders tijdens de systole van de kamers.","Tijdens de diastole wordt de druk in de aorta nul.","Als je je polsslag voelt, voel je het bloed langs je vingers stromen.","Bij een bloeddrukmeting meet je de bovendruk op het moment dat het eerste bloed weer door de dichtgeknepen slagader komt.","De grootste daling van de bloeddruk zit in de kleinste slagaders.","Het bloed stroomt het snelst in de haarvaten, omdat die zo smal zijn."])));
  const think=phase("think","Eerst nadenken"),ans=phase("ans","Antwoord");helpButton(q,think);const unlock=lockAns(think,ans);
  selectsStep(think,{uid:"q"+id,q:"Wat gebeurt er met de kamers?",rows:[["systole",["de kamers trekken samen","de kamers ontspannen"],0],["diastole",["de kamers trekken samen","de kamers ontspannen"],1]],
    ok:"Goed. Bedenk bij uitspraak 1 en 2 wat er in die twee fasen met de druk in de slagaders gebeurt.",no:"Systole = samentrekken; diastole = de hartpauze.",
    onDone:()=>choiceStep(think,{q:"Waar is de totale doorsnede van alle bloedvaten samen het grootst?",opts:["bij de aorta","bij alle haarvaten samen","bij de holle aders"],right:1,
      ok:"Ja. Denk bij uitspraak 6 na: per seconde stroomt overal even veel bloed. Wat betekent een grote totale doorsnede dan voor de snelheid?",no:"Eén haarvat is smal, maar tel ze allemaal bij elkaar op.",onDone:unlock})});
  juistOnjuist(ans,{id,stm:["bovendruk = druk tijdens de systole","in de diastole wordt de druk in de aorta nul","polsslag = bloed dat langs je vingers stroomt","bovendruk = eerste bloed door de dichtgeknepen slagader","grootste daling in de kleinste slagaders","snelst in de haarvaten"],key:[true,false,false,true,true,false],
    uitleg:b=>{textBox("1 <b>juist</b>.<br>2 <b>onjuist</b>: de rekbare wand van de aorta duwt in de diastole nog bloed na, dus de druk blijft rond 80.<br>3 <b>onjuist</b>: je voelt een drukgolf in de wand van de slagader. Die is in een tiende seconde bij je pols; het bloed zelf doet er een paar seconden over.<br>4 <b>juist</b>; als het bloed weer vrij stroomt, lees je de onderdruk af.<br>5 <b>juist</b>: zie de grafiek hieronder.<br>6 <b>onjuist</b>: alle haarvaten samen hebben een veel grotere doorsnede, dus daar stroomt het bloed juist het <b>langzaamst</b>.")(b);
      b.append(el("div",{},DRUK({hl:2})));}});
  q.append(think,ans);
},STOF_DRUK);

const STOF_TERUG={titel:"Terug naar het hart",html:`
<p>Na de haarvaten is er nog maar weinig druk over: te weinig om het bloed uit je voeten omhoog te duwen. De aders in je benen liggen tussen je spieren. Loop je, dan knijpen je kuitspieren de aders steeds even samen. De <b>kleppen</b> in de aders laten het bloed maar één kant op: naar het hart. Samen werken spieren en kleppen als een pomp: de <b>spierpomp</b>.</p>
<p>Als er te weinig bloed naar het hoofd gaat, krijgen de hersenen te weinig zuurstof.</p>`,
films:[F.druk]};
const q2=vraag(2,"flauwvallen bij de diploma-uitreiking",(q,id)=>{
  const {think,ans,unlock}=start(q,"Tijdens een lange diploma-uitreiking in de zon valt een leerling flauw.<br>"+B("Leg uit hoe het stilstaan en de warmte samen leiden tot te weinig bloed in de hersenen. Gebruik het begrip spierpomp."));
  choiceStep(think,{q:"Wat doen je kuitspieren met de aders in je benen als je loopt?",opts:["ze knijpen de aders steeds even samen","ze maken de aders wijder","niets: aders liggen niet bij spieren"],right:0,
    ok:"Ja, samen met de kleppen is dat de spierpomp. Wat gebeurt er als je stilstaat?",no:"Lees ‘Uitleg van de stof’ nog eens: waar liggen de aders in je benen?",
    onDone:()=>choiceStep(think,{q:"Wat doen de bloedvaten in je huid als het warm is?",opts:["ze gaan wijd open","ze knijpen samen"],right:0,
      ok:"Goed. Bedenk nu wat die twee dingen samen betekenen voor het bloed dat terugkomt bij je hart, en wat het hart dan per slag wegpompt.",no:"Bij warmte word je rood: er stroomt meer bloed door je huid.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Bij stilstaan werkt de <b>spierpomp</b> niet en door de warmte staan de huidvaten wijd, waardoor er bloed in de benen/huid blijft hangen.",
    "Er komt minder bloed terug naar het hart, het slagvolume daalt, de druk naar het hoofd zakt (en het lichaam kan dat niet meer opvangen met een snellere hartslag en samenknijpende kleine slagaders)."],
    model:"Bij stilstaan doen de kuitspieren niets, dus de spierpomp werkt niet en er blijft bloed in de aders van de benen hangen. Door de warmte staan de bloedvaten in de huid wijd: ook daar blijft bloed. Er komt minder bloed terug naar het hart, dus pompt het hart per slag minder weg. De druk in de slagaders naar het hoofd zakt en de hersenen krijgen te weinig bloed.",
    valkuil:"Een antwoord dat het flauwvallen toeschrijft aan te weinig zuurstof in de lucht: 0 punten. Het probleem zit in het vervoer, niet in de lucht.",
    after:()=>waaromBtn(ans,textBox("Zie het als een keten: spierpomp stil + wijde huidvaten → bloed blijft hangen in benen en huid → minder bloed terug naar het hart → kleiner slagvolume → lagere druk naar het hoofd → te weinig bloed in de hersenen. Door het vallen ligt het hoofd op dezelfde hoogte als het hart, en komt er weer genoeg bloed. Moet je lang staan? Span je kuiten af en toe aan."))});
  q.append(think,ans);
},STOF_TERUG);

const q3=vraag(1,"waar is de bloeddruk het laagst?",(q,id)=>{
  const {think,ans,unlock}=start(q,B("In welk bloedvat van de grote bloedsomloop is de bloeddruk het laagst?"));
  choiceStep(think,{q:"Waardoor stroomt het bloed van de linkerkamer helemaal rond tot in de rechterboezem?",opts:["doordat de aders het bloed aanzuigen","door een drukverschil: bloed stroomt van een plek met hogere naar een plek met lagere druk","doordat de haarvaten het bloed verder pompen"],right:1,
    ok:"Ja. Volg nu de weg van het bloed vanaf de linkerkamer. Waar zal de druk het laagst zijn?",no:"Alleen het hart pompt. Hoe kan het bloed dan in één richting blijven stromen?",onDone:unlock});
  mc(ans,{qid:id,pts:1,right:3,opts:["in de aorta","in de kleinste slagaders","in de haarvaten","in de holle aders vlak bij het hart"],onChecked:()=>waaromBtn(ans,b=>stepAnim(b,[
    {cap:"In de <b>aorta</b> is de druk het hoogst en golft hij met elke hartslag mee.",hl:0},
    {cap:"In de <b>kleine slagaders</b> daalt de druk het sterkst: daar is de weerstand groot.",hl:2},
    {cap:"In de <b>haarvaten</b> is de druk al laag, maar nog niet het laagst. Veel leerlingen kiezen C omdat haarvaten het smalst zijn.",hl:3},
    {cap:"In de <b>holle aders</b> vlak bij het hart is de druk het laagst. Juist dat drukverschil, van linkerkamer naar rechterboezem, houdt het bloed in beweging. Antwoord <b>D</b>.",hl:5}],
    (st,s)=>st.innerHTML=DRUK({hl:s.hl})))});
  q.append(think,ans);
},STOF_DRUK);

opgave("Bloedvaten","Bloedvaten en bloeddruk","",[q1,q2,q3]);
}
