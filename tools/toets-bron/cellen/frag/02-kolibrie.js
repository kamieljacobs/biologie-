/* ===== Opgave 3: Kolibries: vliegen op volle kracht (EI-cellen-E01–E03; vwo ook E04) ===== */
{
const STOF_MITO={titel:"Het mitochondrium",html:`
<p>Een <b>mitochondrium</b> heeft twee membranen. Het binnenmembraan is geplooid tot <b>cristae</b>.</p>
<p>In het mitochondrium wordt de verbranding van glucose afgemaakt. Daarbij ontstaat <b>ATP</b>: de energiedrager van de cel. Alles wat een cel doet, kost ATP: eiwitten maken, stoffen vervoeren, en in een spiercel samentrekken.</p>
<p>Op plaatjes zijn mitochondriën boontjes. In een levende cel zijn het vaak buizen die splitsen en samensmelten.</p>`,
films:[F.org]};
const STOF_STW={titel:"Stofwisseling: opbouw en afbraak",html:`
<p>Stoffen omzetten in de cel heet <b>stofwisseling</b>. Er is een opbouwkant en een afbraakkant.</p>
<ul><li><b>Assimilatie</b> (opbouw): de cel maakt grote stoffen uit kleine, zoals eiwitten. Dat kost energie.</li>
<li><b>Dissimilatie</b> (afbraak): de cel breekt stoffen af om energie vrij te maken. De cel legt die energie vast in een energiedrager, die hij overal in de cel kan gebruiken.</li></ul>
<p>Hoe de verbranding precies verloopt, zie je in de film Alles op adem (thema Stofwisseling).</p>`,
films:[F.org,F.dis]};
const ids=[];
ids.push(vraag(2,"bouw past bij functie",(q,id)=>{
  pre(q,"<p>Een kip vliegt bijna nooit.</p>");
  const {think,ans,unlock}=start(q,B("Leg met tabel 1 uit hoe de bouw van de vliegspiercellen van de kolibrie past bij hun functie, en waarom de kip zoveel minder mitochondriën in zijn borstspier heeft."));
  choiceStep(think,{q:"Wat maken mitochondriën?",opts:["eiwitten","ATP","glucose"],right:1,
    ok:"Ja: de energiedrager van de cel.",no:"Eiwitten maken de ribosomen, glucose maakt een plant in de chloroplasten.",
    onDone:()=>choiceStep(think,{q:"Welke spier uit tabel 1 werkt het langst en het hardst?",opts:["de vliegspier van de kolibrie","de borstspier van de kip","de dijspier van de mens"],right:0,
      ok:"Goed. Leg nu het verband tussen hoe hard een spier werkt en het aandeel mitochondriën. Doe dat voor de kolibrie én voor de kip.",no:"Lees de inleiding nog eens: wie hangt lange tijd stil in de lucht?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "De vliegspier van de kolibrie werkt lang en hard en heeft <b>veel energie</b> nodig; veel mitochondriën maken <b>veel ATP</b> (uit glucose en zuurstof).",
    "De borstspier van de kip wordt bijna niet gebruikt om te vliegen, dus is er <b>weinig ATP nodig</b> en zijn weinig mitochondriën genoeg."],
    model:"De kolibrie slaat lang en heel snel met zijn vleugels. Daarvoor is veel energie nodig. Mitochondriën maken ATP, dus met 35% mitochondriën kan de vliegspier veel ATP maken. De kip vliegt bijna nooit: zijn borstspier heeft weinig ATP nodig, dus 5% mitochondriën is genoeg.",
    valkuil:"Alleen ‘de kolibrie heeft meer mitochondriën’ is aflezen, geen uitleg. Noem wát mitochondriën doen (ATP maken) en koppel dat aan het werk van de spier.",
    after:()=>waaromBtn(ans,textBox("Bouw en functie horen bij elkaar: een spier die lang en hard werkt, heeft veel ATP nodig en dus veel mitochondriën (kolibrie 35%, duif 20%). Een spier die weinig werkt, heeft er weinig (kip 5%). Zo zit ook een hartspiercel, die nooit stopt, voor ongeveer een derde vol mitochondriën."))});
  q.append(think,ans);
},STOF_MITO));

ids.push(vraag(2,"cyanide blokkeert het mitochondrium",(q,id)=>{
  pre(q,"<p>Cyanide is een gif dat een van de eiwitten op het binnenmembraan van mitochondriën blokkeert (vereenvoudigd).</p>");
  const {think,ans,unlock}=start(q,B("Voorspel wat er gebeurt met een kolibrie die een kleine hoeveelheid cyanide binnenkrijgt, en leg uit."));
  choiceStep(think,{q:"Wat gebeurt er in het mitochondrium op en rond het binnenmembraan?",opts:["de laatste stappen van de verbranding, waarbij ATP ontstaat","de afbraak van versleten organellen","het maken van werkkopieën van het DNA"],right:0,
    ok:"Ja. Wat betekent een geblokkeerd eiwit daar dan voor de hoeveelheid ATP?",no:"Afbraak van organellen doen de lysosomen, werkkopieën worden in de kern gemaakt.",
    onDone:()=>choiceStep(think,{q:"Waarvoor heeft de vliegspier ATP nodig?",opts:["om samen te trekken","om zuurstof op te nemen","om glucose op te slaan"],right:0,
      ok:"Goed. Maak nu de keten af: cyanide → mitochondrium → ATP → spier → wat merk je aan de kolibrie?",no:"Een spier doet maar één ding: samentrekken. Kost dat energie?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "De verbranding in de mitochondriën stopt (gedeeltelijk), dus wordt er <b>(veel) minder ATP</b> gemaakt.",
    "De vliegspier heeft <b>te weinig energie</b> om samen te trekken: de kolibrie kan niet (lang) vliegen / stilhangen."],
    model:"Cyanide blokkeert een eiwit op het binnenmembraan, dus de verbranding in de mitochondriën loopt (deels) vast en er wordt veel minder ATP gemaakt. De vliegspieren krijgen te weinig energie om snel samen te trekken: de kolibrie kan niet meer lang stilhangen of vliegen.",
    valkuil:"Een voorspelling zonder uitleg (‘hij gaat dood’, ‘hij valt’) levert 0 punten op. De punten zitten in de keten: minder ATP, dus te weinig energie voor de spier.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Normaal: op het binnenmembraan wordt de verbranding afgemaakt en ontstaat veel ATP.",n:6},
      {cap:"Cyanide blokkeert een van de eiwitten op het binnenmembraan: de verbranding loopt vast, er komt veel minder ATP.",n:1},
      {cap:"Te weinig ATP: de vliegspier kan niet snel genoeg samentrekken. Stilhangen bij een bloem lukt niet meer.",n:1}],
      (st,s,i)=>{let g=`<ellipse cx="150" cy="110" rx="125" ry="70" fill="none" stroke="var(--text2)" stroke-width="2.5"/>`;
        g+=`<path d="M45,110 q15,-45 30,0 q15,45 30,0 q15,-45 30,0 q15,45 30,0 q15,-45 30,0 q15,45 30,0 q15,-45 30,0" fill="none" stroke="var(--text)" stroke-width="2.5"/>`;
        if(i>=1)g+=`<path d="M120,90 l22,22 m0,-22 l-22,22" stroke="var(--koraal)" stroke-width="4"/><text x="104" y="160" class="lbl">cyanide</text>`;
        for(let k=0;k<s.n;k++)g+=`<circle cx="${320+(k%3)*30}" cy="${80+Math.floor(k/3)*34}" r="11" fill="var(--goud)"/><text x="${320+(k%3)*30}" y="${84+Math.floor(k/3)*34}" text-anchor="middle" style="font:700 9px var(--meta);fill:var(--bg)">ATP</text>`;
        g+=`<text x="345" y="170" text-anchor="middle" class="lblm">ATP per seconde</text>`;
        if(i===2)g+=`<text x="345" y="200" text-anchor="middle" class="lbl">spier: te weinig energie</text>`;
        st.innerHTML=svgWrap("0 0 440 215",g,"Mitochondrium met geplooid binnenmembraan en de hoeveelheid ATP");}))});
  q.append(think,ans);
},STOF_MITO));

ids.push(vraag(2,"stoffen bij de verbranding",(q,id)=>{
  pre(q,"<p>De glucose in de nectar wordt in de vliegspiercellen verbrand.</p>");
  const {think,ans,unlock}=start(q,B("Noem de twee stoffen die bij deze verbranding in het mitochondrium nodig zijn, en de stof die daarbij ontstaat en die de spiercel als energiedrager gebruikt."));
  choiceStep(think,{q:"Verbranden betekent: een stof reageert met een gas. Welk gas is daarvoor altijd nodig?",opts:["stikstof","zuurstof","koolstofdioxide"],right:1,
    ok:"Ja, zonder dat gas geen verbranding, ook niet in een cel.",no:"Een kaars gaat uit als je er een glas over zet. Welk gas raakt dan op?",
    onDone:()=>choiceStep(think,{q:"De spiercel gebruikt de vrijgekomen energie niet direct, maar via een energiedrager. Hoe heet de afkorting van die stof?",opts:["DNA","ATP","ER"],right:1,
      ok:"Goed. Je hebt nu alle drie de stoffen: twee die nodig zijn en één die ontstaat.",no:"DNA is de bouwtekening, ER is een organel.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Nodig: <b>glucose</b> (brokstukken van glucose) en <b>zuurstof</b>.",
    "Ontstaat: <b>ATP</b>."],
    model:"Nodig zijn glucose en zuurstof. Daarbij ontstaat ATP, de energiedrager van de spiercel.",
    valkuil:"Koolstofdioxide of water als extra stof is niet fout. Maar ‘energie’ is geen stof: de stof die de energie draagt, is ATP.",
    after:()=>waaromBtn(ans,textBox("In het mitochondrium wordt de verbranding van glucose afgemaakt, <b>met zuurstof</b>. De energie die vrijkomt, legt de cel vast in <b>ATP</b>. Die ATP gebruikt de spiercel om samen te trekken. Koolstofdioxide en water ontstaan ook, maar die zijn afvalstoffen, geen energiedrager."))});
  q.append(think,ans);
},STOF_STW));

if(VWO){
const STOF_E4={titel:"Bouw en functie in een cel",html:`
<p>De bouw van een organel past bij zijn taak. Dat zie je bij membranen: op een membraan zitten eiwitten die het werk doen, zoals in het mitochondrium en in de chloroplast.</p>
<p>Een mitochondrium heeft twee membranen; alleen het binnenmembraan is geplooid. Ook in een chloroplast liggen membranen in stapels schijfjes, de grana.</p>`,
films:[F.org]};
ids.push(vraag(2,"dichtere plooien in het binnenmembraan",(q,id)=>{
  pre(q,"<p>Bij geen enkel dier bestaat een spiercel voor meer dan ongeveer 35 tot 40 procent uit mitochondriën. In de mitochondriën van kolibries ligt het binnenmembraan wel dichter opeengepakt dan bij zoogdieren.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit hoe dat dichter opeengepakte binnenmembraan de kolibrie helpt, en waarom nog meer mitochondriën per cel geen oplossing is."));
  choiceStep(think,{q:"Een binnenmembraan met meer plooien in een even groot mitochondrium. Wat wordt er dan groter?",opts:["het volume van het mitochondrium","het oppervlak van het membraan","het aantal kernen"],right:1,
    ok:"Ja. En wat zit er op dat membraan?",no:"Het mitochondrium blijft even groot. Denk aan een gekreukt vel papier in een doosje.",
    onDone:()=>choiceStep(think,{q:"Wat moet een vliegspiercel naast ATP maken nog meer kunnen?",opts:["samentrekken, met de onderdelen die daarvoor zorgen","licht opvangen","zich zo vaak mogelijk delen"],right:0,
      ok:"Goed. Bedenk wat er met de ruimte daarvoor gebeurt als de cel nog voller met mitochondriën zit.",no:"Een spiercel heeft maar één taak. Welke?",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Meer cristae (plooien) per mitochondrium geven <b>meer membraanoppervlak</b> met ATP-makende eiwitten, dus <b>meer ATP</b> per mitochondrium.",
    "Nog meer mitochondriën laten <b>te weinig ruimte</b> over voor de onderdelen waarmee de spiercel samentrekt (de spierdraden)."],
    model:"Door de dichtere plooien heeft elk mitochondrium meer binnenmembraan, en dus meer van de eiwitten die ATP maken: meer ATP per mitochondrium. Nog meer mitochondriën kan niet, want dan blijft er te weinig plaats over voor de spierdraden die de beweging maken.",
    valkuil:"‘Meer plooien maken het mitochondrium groter’ klopt niet: het oppervlak wordt groter, niet het mitochondrium. Ook goed voor het tweede punt: er is dan minder plaats voor de eiwitten die de beweging maken.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[{cap:"Een glad binnenmembraan: weinig oppervlak, weinig plek voor ATP-makende eiwitten.",p:0},{cap:"Geplooid tot cristae: in hetzelfde mitochondrium veel meer membraan, dus meer eiwitten en meer ATP.",p:1},{cap:"Dichter opeengepakte cristae (kolibrie): nog meer oppervlak in dezelfde ruimte. Meer mitochondriën kan niet: de spierdraden hebben ook plaats nodig.",p:2}],
      (st,s)=>{let g=`<ellipse cx="160" cy="100" rx="140" ry="70" fill="none" stroke="var(--text2)" stroke-width="2.5"/><ellipse cx="160" cy="100" rx="126" ry="58" fill="none" stroke="var(--text)" stroke-width="2"/>`;
        const n=[0,5,10][s.p];for(let k=0;k<n;k++){const x=60+(k+0.5)*(200/n),dy=58*Math.sqrt(Math.max(0,1-((x-160)/126)**2)),boven=k%2===0,y0=boven?100-dy:100+dy,y1=boven?100+dy*0.35:100-dy*0.35,w=s.p===2?3:5;
          g+=`<path d="M${x-w},${y0} V${y1} Q${x},${y1+(boven?w*1.4:-w*1.4)} ${x+w},${y1} V${y0}" fill="none" stroke="var(--text)" stroke-width="2"/>`;}
        g+=`<text x="160" y="195" text-anchor="middle" class="lblm">${["glad","geplooid","dicht opeengepakt"][s.p]} binnenmembraan</text>`;
        st.innerHTML=`<div style="max-width:380px;margin:0 auto">`+svgWrap("0 0 320 205",g,"Mitochondrium met meer of minder plooien in het binnenmembraan")+`</div>`;}))});
  q.append(think,ans);
},STOF_E4));
}

opgave("Kolibries","Kolibries: vliegen op volle kracht",`
<p>Een kolibrie kan lange tijd stil voor een bloem hangen terwijl hij nectar drinkt. Daarvoor slaat hij heel snel met zijn vleugels. In tabel 1 staat welk deel van het volume van een spiercel uit mitochondriën bestaat, bij een paar soorten.</p>
${TABEL(1,["spiercel","mitochondriën (% van het celvolume)"],[["vliegspier kolibrie","35"],["vliegspier duif","20"],["borstspier kip","5"],["dijspier mens","5"]],"vereenvoudigd; de waarden voor duif, kip en mens zijn fictief")}`,ids);
}
