/* ===== Opgave 1: Variatie en evolutie (EI-evolutie-P03, P06) ===== */
{
const STOF_ALLEL={titel:"Genenpool en allelfrequentie",html:`
<p>Van elk gen heeft een individu <b>twee allelen</b>: twee dezelfde (homozygoot) of twee verschillende (heterozygoot). Stop je in gedachten alle allelen van zo'n gen uit een hele populatie in één pot, dan heb je de <b>genenpool</b>.</p>
<p>De <b>allelfrequentie</b> is het aandeel van één allel in die pot: hoe vaak dat allel voorkomt, gedeeld door het totale aantal allelen. Let op: het percentage individuen met een kenmerk is iets anders dan de allelfrequentie, want een individu brengt twee allelen mee.</p>
<p><b>Evolutie</b> is een verandering van de allelfrequenties in een populatie, over generaties. Een individu evolueert niet, een populatie wel.</p>`,
films:[F.e1]};

const q1=vraag(1,"waarom zussen verschillen",(q,id)=>{
  pre(q,"<p>Twee zussen die geen eeneiige tweeling zijn, hebben allebei hun allelen van dezelfde ouders.</p>");
  const {think,ans,unlock}=start(q,B("Leg uit waarom ze toch niet precies dezelfde allelen hebben."));
  choiceStep(think,{q:"Hoeveel allelen heeft een mens van één gen?",opts:["één","twee: één van de vader en één van de moeder","vier"],right:1,
    ok:"Ja. Een ouder heeft van dat gen dus ook twee allelen.",no:"Je hebt elk chromosoom twee keer: één van je vader en één van je moeder.",
    onDone:()=>choiceStep(think,{q:"Hoeveel van zijn twee allelen geeft een ouder per gen door aan één kind?",opts:["allebei","één"],right:1,
      ok:"Goed. Bedenk nu: krijgt elk kind van die ouder hetzelfde allel?",no:"Een eicel of zaadcel is haploïd: van elk chromosoom één.",onDone:unlock})});
  openAnswer(ans,{id,pts:1,checks:[
    "elke ouder geeft per gen maar <b>één van zijn twee allelen</b> door, en <b>welke</b> dat is, is bij de meiose <b>toeval</b> / elk kind krijgt een andere greep uit de allelen van de ouders"],
    model:"Elke ouder heeft van elk gen twee allelen, maar geeft er per kind maar één door. Welk van de twee in de eicel of zaadcel terechtkomt, is bij de meiose toeval. Daardoor krijgt elk kind een andere combinatie van allelen.",
    valkuil:"Een antwoord als ‘door mutaties’ levert 0 punten op.",
    after:()=>waaromBtn(ans,textBox("Beide zussen krijgen hun allelen uit dezelfde twee ‘potten’: die van hun vader en die van hun moeder. Maar bij de meiose komt in elke eicel en zaadcel per gen <b>één van de twee allelen</b>, en welke, is <b>toeval</b>. Elke bevruchting is dus een nieuwe greep. Alleen een eeneiige tweeling komt uit één bevruchte eicel en heeft daardoor wel dezelfde allelen. Mutaties zijn zeldzaam: die verklaren het verschil tussen gewone zussen niet."))});
  q.append(think,ans);
},TERUG("Waar komt variatie vandaan?",F.e1,"Waar komt variatie vandaan?"));

const q2=vraag(2,"allelfrequentie bij slakken",(q,id)=>{
  pre(q,"<p>Bij een slakkensoort hangt de kleur van het huisje af van één gen. Het allel voor geel (G) is dominant over het allel voor bruin (g). In een populatie van 50 slakken hebben 18 slakken genotype GG, 24 genotype Gg en 8 genotype gg (fictieve gegevens).</p>");
  const {think,ans,unlock}=start(q,LIJST([B("Bereken de allelfrequentie van g. Noteer je berekening."),B("Twintig generaties later is de allelfrequentie van g in deze populatie 0,55. Leg uit of de populatie geëvolueerd is.")]));
  numStep(think,{uid:"q"+id+"n",q:"Hoeveel allelen van dit gen hebben de 50 slakken samen?",right:100,
    ok:"Ja: elke slak heeft er twee. Tel nu hoeveel daarvan g zijn. Let op: een slak met gg heeft er twee.",no:"Hoeveel allelen van één gen heeft één slak?",
    onDone:()=>choiceStep(think,{q:"Wanneer noem je een verandering in een populatie evolutie?",opts:["als de individuen zich in hun leven aanpassen","als de allelfrequenties over generaties veranderen","alleen als er een nieuwe soort ontstaat"],right:1,
      ok:"Goed. Vergelijk straks jouw uitkomst met 0,55.",no:"Een individu evolueert niet. Waar kijk je dan naar?",onDone:unlock})});
  combi(ans,{id,pts:2,parts:[
    {nums:[["allelfrequentie van g",""]],ok:v=>dicht(v[0],0.40,0.001),tekst:"50 slakken hebben samen 100 allelen; g: 24 + 2 × 8 = 40; 40 / 100 = <b>0,40</b> (dit punt telt alleen als je de berekening hebt opgeschreven)"},
    {open:true,tekst:"<b>ja</b>, met een uitleg dat de <b>allelfrequentie over generaties is veranderd</b> (van 0,40 naar 0,55), en dat is evolutie"}],
    placeholder:"Is de populatie geëvolueerd? Leg uit…",
    model:"g-allelen: 24 × 1 + 8 × 2 = 40 van de 100 allelen, dus 0,40. Twintig generaties later is het 0,55. De allelfrequentie is over generaties veranderd, dus de populatie is geëvolueerd.",
    valkuil:"0,16 (alleen de bruine slakken: 8/50) is fout. Alleen het antwoord 0,40 zonder berekening: 0 punten voor het eerste element.",
    after:()=>waaromBtn(ans,textBox("Tel allelen, geen slakken. De 24 slakken met Gg hebben elk één g, de 8 slakken met gg hebben er elk twee: 24 + 16 = <b>40</b> g-allelen van de 100. Dat is <b>0,40</b>. Wie 8/50 = 0,16 rekent, telt alleen de bruine slakken en vergeet dat ook gele slakken (Gg) een g dragen.<br><br>Van 0,40 naar 0,55 in twintig generaties: de inhoud van de genenpool is veranderd, en dat is precies wat evolutie is. Of het door selectie of door toeval kwam, maakt voor deze vraag niet uit."))});
  q.append(think,ans);
},STOF_ALLEL);

opgave("Variatie","Variatie en evolutie","",[q1,q2]);
}
