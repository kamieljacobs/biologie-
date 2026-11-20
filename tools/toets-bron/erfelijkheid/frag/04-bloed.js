/* ===== Opgave 4: Bloedgroepen (W01; W02 alleen havo) ===== */
{
/* geen definitie van 'multipele allelen' in de stof: dat vraagt vraag W02 (L05) */
const STOF={titel:"Het bloedgroepgen",html:`
<p>De bloedgroepen A, B, AB en O worden bepaald door één gen. Van dit gen bestaan de allelen I<sup>A</sup>, I<sup>B</sup> en i. I<sup>A</sup> zorgt voor antigeen A op de rode bloedcellen, I<sup>B</sup> voor antigeen B, en i voor geen van beide. I<sup>A</sup> en I<sup>B</sup> zijn allebei dominant over i.</p>
<div class="tablewrap"><table class="data"><tr><th>bloedgroep</th><th>mogelijke genotypen</th></tr><tr><td>A</td><td>I<sup>A</sup>I<sup>A</sup> of I<sup>A</sup>i</td></tr><tr><td>B</td><td>I<sup>B</sup>I<sup>B</sup> of I<sup>B</sup>i</td></tr><tr><td>AB</td><td>I<sup>A</sup>I<sup>B</sup></td></tr><tr><td>O</td><td>ii</td></tr></table></div>
<p>Werk bij een vraag over ouders en kinderen altijd terug: elk kind kreeg één allel van de vader en één van de moeder.</p>`,
films:[F.voorbij]};
const q1=vraag(2,"bloedgroep van de moeder",(q,id)=>{
  pre(q,"<p>Een vrouw met bloedgroep B en een man met bloedgroep AB krijgen een kind met bloedgroep A.</p>");
  const {think,ans,unlock}=start(q,B("Geef het genotype van de vrouw. Leg uit welke bloedgroepen hun andere kinderen kunnen hebben."));
  choiceStep(think,{q:"Het kind heeft bloedgroep A. Van wie kreeg het zijn I<sup>A</sup>?",opts:["van de vader (AB)","van de moeder (B)"],right:0,
    ok:"Ja: de moeder heeft bloedgroep B en dus geen I<sup>A</sup>. Welk allel kreeg het kind dan van de moeder, als het toch bloedgroep A heeft?",no:"Heeft iemand met bloedgroep B een I<sup>A</sup>?",
    onDone:()=>choiceStep(think,{q:"Het kind is I<sup>A</sup>… Welk tweede allel past bij bloedgroep A, als het van een moeder met bloedgroep B komt?",opts:["I<sup>B</sup>","i"],right:1,
      ok:"Goed. Nu weet je het genotype van de moeder. Maak daarna het kruisingsschema met de vader (I<sup>A</sup>I<sup>B</sup>).",no:"Met I<sup>A</sup> en I<sup>B</sup> heeft het kind bloedgroep AB, niet A.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Het kind met bloedgroep A kreeg I<sup>A</sup> van de vader en dus i van de moeder: de vrouw is <b>I<sup>B</sup>i</b>.",
    "I<sup>B</sup>i × I<sup>A</sup>I<sup>B</sup> geeft I<sup>A</sup>I<sup>B</sup> (AB), I<sup>A</sup>i (A), I<sup>B</sup>I<sup>B</sup> (B) en I<sup>B</sup>i (B): bloedgroep <b>A, B en AB, geen O</b>."],
    model:"De vrouw is I<sup>B</sup>i: het kind met bloedgroep A kreeg I<sup>A</sup> van de vader en i van de moeder. Kruising I<sup>B</sup>i × I<sup>A</sup>I<sup>B</sup>: I<sup>A</sup>I<sup>B</sup> (AB), I<sup>A</sup>i (A), I<sup>B</sup>I<sup>B</sup> en I<sup>B</sup>i (B). Hun andere kinderen kunnen bloedgroep A, B of AB hebben, maar geen O, want de vader heeft geen i.",
    valkuil:"De vrouw I<sup>B</sup>I<sup>B</sup> noemen (dan kan ze geen kind met bloedgroep A krijgen), of O noemen als mogelijke bloedgroep: de vader geeft altijd I<sup>A</sup> of I<sup>B</sup>.",
    after:()=>waaromBtn(ans,b=>stepAnim(b,[{cap:"Moeder I<sup>B</sup>i, vader I<sup>A</sup>I<sup>B</sup>: elk geeft één allel door.",t:0},{cap:"De vier vakjes: I<sup>A</sup>I<sup>B</sup>, I<sup>B</sup>I<sup>B</sup>, I<sup>A</sup>i en I<sup>B</sup>i.",t:1},{cap:"Bloedgroep <b>AB, B, A en B</b>. Geen O: de vader heeft geen i om door te geven.",t:2}],
      (st,s)=>st.innerHTML=PUN(["Iᴬ","Iᴮ"],["Iᴮ","i"],[["IᴬIᴮ","IᴮIᴮ"],["Iᴬi","Iᴮi"]],{toon:s.t>0,kopT:"vader (AB)",kopL:"moeder (B)",
        kleur:c=>s.t<2?"":c==="IᴬIᴮ"?"var(--paars-soft)":c==="Iᴬi"?"var(--teal-soft)":"var(--goud-soft)"})))});
  q.append(think,ans);
},STOF);
const ids=[q1];
if(!VWO)ids.push(vraag(1,"multipele allelen",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Wat betekent ‘multipele allelen’?"));
  selectsStep(think,{uid:"q"+id,q:"Drie keuzes beschrijven een ander begrip uit de film. Koppel eerst deze omschrijvingen aan het goede begrip.",rows:[
    ["Eén eigenschap wordt bepaald door veel genen tegelijk.",["codominant","polygene overerving","intermediair"],1],
    ["Beide allelen komen in de heterozygoot volledig tot uiting.",["codominant","polygene overerving","intermediair"],0]],
    ok:"Goed: die twee keuzes vallen dus af. Kies nu tussen A en B. Denk aan de bloedgroepen uit de film.",no:"Denk aan bloedgroep AB (beide antigenen) en aan lichaamslengte (een vloeiende reeks).",onDone:unlock});
  mc(ans,{qid:id,pts:1,right:1,opts:["Een persoon heeft van één gen meer dan twee allelen.","Van één gen bestaan in de bevolking meer dan twee allelen, maar elk persoon heeft er twee.","Eén eigenschap wordt bepaald door veel genen tegelijk.","Beide allelen komen in de heterozygoot volledig tot uiting."],
    onChecked:()=>waaromBtn(ans,textBox("Van het bloedgroepgen bestaan drie allelen (I<sup>A</sup>, I<sup>B</sup> en i): meer dan twee, dat is ‘multipel’. Maar iedereen heeft er maar twee, één van zijn vader en één van zijn moeder. Het antwoord is <b>B</b>. A kan niet: je hebt van elk chromosoom maar twee exemplaren. C is polygene overerving, D is codominant."))});
  q.append(think,ans);
}));
opgave("Bloedgroepen","Bloedgroepen","",ids);
}
