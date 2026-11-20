/* ===== Opgave 3: Een hoornloze stier (D01, D04, D05) ===== */
{
const STOF_TERUG={titel:"De terugkruising",html:`
<p>Een dier met het dominante fenotype kan homozygoot (AA) of heterozygoot (Aa) zijn. Van buiten zie je dat niet. Om het uit te zoeken, kruis je het met een dier dat <b>homozygoot recessief</b> is (aa). Zo'n kruising heet een <b>terugkruising</b>.</p>
<p>Het aa-dier geeft altijd a door. Welk fenotype een nakomeling krijgt, hangt dus alleen af van het allel dat het andere dier doorgaf. Zo kun je aan de nakomelingen ‘aflezen’ welke allelen dat dier heeft.</p>
<p>Een <b>kruisingsschema</b> maak je zo: genotypen van de ouders → de gameten van elke ouder (elk één allel) → de gameten combineren in de vakjes → de genotypen en fenotypen van de nakomelingen.</p>`,
films:[F.mono]};
const STOF_KANS={titel:"Kansen bij een kruising",html:`
<p>Een kruisingsschema geeft <b>kansen</b>, geen aantallen. Bij elke bevruchting wordt opnieuw ‘geloot’: het ene jong ‘weet’ niet wat het vorige kreeg.</p>
<p><b>Productregel:</b> moeten twee of meer dingen allemaal gebeuren, en hangen ze niet van elkaar af, dan vermenigvuldig je de kansen. Voorbeeld: twee keer achter elkaar kop gooien met een munt: ½ × ½ = ¼.</p>
`,
films:[F.mono,F.stam]};
const SCH=(hz,s)=>PUN(hz?["H","H"]:["H","h"],["h","h"],hz?[["Hh","Hh"],["Hh","Hh"]]:[["Hh","hh"],["Hh","hh"]],
  {kopT:hz?"stier HH":"stier Hh",kopL:"koe hh",toon:s>0,kleur:c=>s<2?"":c==="Hh"?"var(--teal-soft)":"var(--koraal-soft)"});

const q1=vraag(2,"terugkruising: kruisingsschema",(q,id)=>{
  pre(q,"<p>De veehouder laat de stier paren met koeien met hoorns.</p>");
  const {think,ans,unlock}=start(q,B("Maak voor elk van de twee mogelijke genotypen van de stier een kruisingsschema. Noteer bij elk schema welke kalveren je verwacht."));
  chipsStep(think,{q:"Welke genotypen kan de hoornloze stier hebben? Kies alles wat klopt.",items:[["HH",1],["Hh",1],["hh",0]],
    ok:"Ja: twee mogelijkheden, dus twee schema's. Welk genotype hebben de koeien met hoorns?",no:"hh heeft hoorns: dat kan de stier niet zijn.",
    onDone:()=>choiceStep(think,{q:"Welke gameten maakt een koe met hoorns?",opts:["alleen h","H en h","alleen H"],right:0,
      ok:"Goed. Maak nu beide schema's en noteer bij elk wat voor kalveren eruit komen.",no:"Een koe met hoorns is homozygoot recessief.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,placeholder:"Schrijf beide schema's op: ouders, gameten, nakomelingen en welke kalveren je verwacht.",checks:[
    "<b>HH × hh</b>: alle kalveren Hh, hoornloos.",
    "<b>Hh × hh</b>: kalveren Hh en hh in de verhouding 1 : 1, dus de helft hoornloos en de helft met hoorns."],
    model:"Stier HH × koe hh: gameten H en h, alle kalveren Hh: allemaal hoornloos. Stier Hh × koe hh: gameten H of h (stier) en h (koe), kalveren Hh en hh in de verhouding 1 : 1: de helft hoornloos, de helft met hoorns.",
    valkuil:"Alleen de genotypen noemen zonder de fenotypen (hoornloos of met hoorns), of een schema met een koe Hh: de koeien hebben hoorns, dus hh.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[
      {cap:"Stier HH: al zijn gameten hebben H. De koe (hh) geeft altijd h.",hz:1,t:0},
      {cap:"Alle kalveren Hh: <b>allemaal hoornloos</b>.",hz:1,t:2},
      {cap:"Stier Hh: de helft van zijn gameten heeft H, de helft h.",hz:0,t:0},
      {cap:"Hh en hh in de verhouding 1 : 1: <b>de helft hoornloos, de helft met hoorns</b>.",hz:0,t:2}],
      (st,s)=>st.innerHTML=SCH(s.hz,s.t)))});
  q.append(think,ans);
},STOF_TERUG);

const q2=vraag(2,"kans op zes hoornloze kalveren",(q,id)=>{
  pre(q,"<p>Stel dat de stier heterozygoot is.</p>");
  const {think,ans,unlock}=start(q,B("Bereken hoe groot dan de kans is dat zijn eerste zes kalveren bij koeien met hoorns allemaal hoornloos zijn. Geef je antwoord als breuk of in procenten."));
  choiceStep(think,{q:"Moeten de zes kalveren alle zes hoornloos zijn, of is één hoornloos kalf genoeg?",opts:["alle zes","één is genoeg"],right:0,
    ok:"Ja: zes dingen die allemaal moeten gebeuren. Wat doe je dan met de kansen?",no:"Lees de vraag nog eens: ‘allemaal hoornloos’.",
    onDone:()=>choiceStep(think,{q:"Zes kansen die allemaal moeten gebeuren:",opts:["tel je op","vermenigvuldig je met elkaar","is gewoon de kans voor één kalf"],right:1,
      ok:"Goed: de productregel. Wat is de kans voor één kalf?",no:"Zou de kans groter worden als je meer kalveren hoornloos wilt hebben?",onDone:unlock})});
  kansAnswer(ans,{id,fields:[
    ["kans dat één kalf hoornloos is",v=>BIJNA(v,.5),"per kalf is de kans op hoornloos 1/2 (Hh × hh)"],
    ["kans dat alle zes kalveren hoornloos zijn",v=>BIJNA(v,1/64),"zes keer achter elkaar: (1/2)⁶ = 1/64 (≈ 1,6%); 6 × 1/2 of ‘1/2, want elk kalf is onafhankelijk’ is fout"]],
    after:()=>waaromBtn(ans,b=>stepAnim(b,[1,2,3,4,5,6].map(n=>({cap:n<6?`${n} ${n===1?"kalf":"kalveren"} hoornloos: kans (½)<sup>${n}</sup> = 1/${2**n}`:"Alle zes hoornloos: (½)<sup>6</sup> = <b>1/64</b> ≈ 1,6%. Elk kalf halveert de kans opnieuw.",n})),
      (st,s)=>{let g="";for(let k=0;k<6;k++){const x=20+(k%3)*125,y=10+Math.floor(k/3)*95,on=k<s.n;
        g+=`<rect x="${x}" y="${y}" width="100" height="78" rx="12" fill="${on?"var(--teal-soft)":"none"}" stroke="${on?"var(--teal)":"var(--line2)"}"/><text x="${x+50}" y="${y+30}" text-anchor="middle" class="lblm" style="font-size:15px">kalf ${k+1}</text><text x="${x+50}" y="${y+60}" text-anchor="middle" class="lbl" style="font-size:20px">${on?"½":""}</text>`;
        if(k%3)g+=`<text x="${x-12}" y="${y+46}" text-anchor="middle" class="lbl" style="font-size:16px">×</text>`;}
        g+=`<text x="200" y="222" text-anchor="middle" class="lbl" style="font-size:20px;fill:var(--goud-text)">= 1/${2**s.n}</text>`;
        st.innerHTML=svgWrap("0 0 400 235",g,"Productregel: zes kalveren");}))});
  q.append(think,ans);
},STOF_KANS);

const q3=vraag(1,"conclusie van de veehouder",(q,id)=>{
  pre(q,"<p>De stier krijgt bij koeien met hoorns zes kalveren. Ze zijn allemaal hoornloos.</p>");
  const {think,ans,unlock}=start(q,B("Wat kan de veehouder hieruit concluderen?"));
  choiceStep(think,{q:"Kan een heterozygote stier zes hoornloze kalveren krijgen?",opts:["nee, dat is onmogelijk","ja, maar de kans is klein"],right:1,
    ok:"Ja: je rekende die kans in de vorige vraag uit. Bekijk nu elke keuze: welke conclusie past bij zo'n kleine kans?",no:"Elk kalf van een Hh-stier heeft kans ½ op hoornloos. Kan dat niet zes keer achter elkaar gebeuren?",onDone:unlock});
  mc(ans,{qid:id,pts:1,right:2,opts:["De stier is heterozygoot, want hoornloos is dominant.","Er is niets te concluderen, want zes kalveren zijn te weinig voor een verhouding.","De stier is waarschijnlijk homozygoot, maar zeker weten kan niet.","De stier is zeker homozygoot, want bij een heterozygote stier is de kans op zes hoornloze kalveren kleiner dan 5%."],
    onChecked:()=>waaromBtn(ans,textBox("Bij een heterozygote stier is de kans op zes hoornloze kalveren 1/64: <b>klein, maar niet nul</b>. Daarom is homozygoot waarschijnlijk, maar niet zeker (C). D gaat te ver: een kleine kans is geen onmogelijkheid. B klopt niet: je kunt wel iets zeggen, want bij een Hh-stier was dit onwaarschijnlijk. A klopt niet: hoornloos dominant zegt niets over homo- of heterozygoot. Eén kalf met hoorns zou wél bewijzen dat de stier Hh is."))});
  q.append(think,ans);
},STOF_KANS);

opgave("Stier","Een hoornloze stier",`
<p>Bij runderen bestaan dieren die van nature geen hoorns hebben: hoornloze runderen. Veehouders hebben liever runderen zonder hoorns. Het allel voor hoornloos (H) is dominant over het allel voor hoorns (h).</p>
<p>Een veehouder heeft een hoornloze stier gekocht. Ze wil weten of de stier homozygoot is, want dan krijgen al zijn nakomelingen geen hoorns.</p>`,[q1,q2,q3]);
}
