/* ===== Opgave 9: Hoe weten we dat? (EI-evolutie-E03) ===== */
{
const q1=vraag(2,"homologe en rudimentaire organen",(q,id)=>{
  const {think,ans,unlock}=start(q,"Over bewijs voor evolutie."+LIJST([B("Leg uit wat homologe organen zijn en waarom ze wijzen op een gemeenschappelijke voorouder."),B("Noem een rudimentair orgaan van de mens.")]));
  choiceStep(think,{q:"In de borstvin van een walvis zitten dezelfde botten als in jouw arm. Wat is bij die twee hetzelfde?",opts:["de functie","de bouw"],right:1,
    ok:"Ja. Een vin werkt ook zonder vingers. Waarom zitten die botjes er dan toch?",no:"Met een vin zwem je, met een arm grijp je. Wat is er dan wél hetzelfde?",
    onDone:()=>choiceStep(think,{q:"Wat is een rudimentair orgaan?",opts:["een orgaan dat zijn oorspronkelijke functie (grotendeels) kwijt is","een orgaan dat net nieuw ontstaan is"],right:0,
      ok:"Goed. Bedenk een voorbeeld bij de mens.",no:"Denk aan de heupbotjes van een walvis.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "homologe organen hebben <b>dezelfde bouw</b> (vaak met een andere functie); die bouw <b>erfden</b> de soorten van een <b>gemeenschappelijke voorouder</b>",
    "het <b>staartbeen</b> (ook goed: een ander juist rudimentair orgaan van de mens, bv. de oorspieren of het plooitje in de binnenooghoek, rest van een knipvlies; de blindedarm/het wormvormig aanhangsel ook goed)"],
    model:"Homologe organen hebben dezelfde bouw, maar vaak een andere functie, zoals de arm van een mens en de borstvin van een walvis. Die gelijke bouw is alleen te verklaren doordat beide soorten hem erfden van een gemeenschappelijke voorouder. Een rudimentair orgaan van de mens is het staartbeen.",
    valkuil:"De blindedarm (wormvormig aanhangsel) ook goed rekenen: veel boeken noemen hem rudimentair, al speelt hij een rol in de afweer.",
    after:()=>waaromBtn(ans,textBox("Een vin hoeft geen vingerbotjes te hebben: een haaienvin heeft ze niet. Dat een walvis ze wél heeft, en in dezelfde volgorde als in jouw arm, verklaar je alleen met een <b>voorouder die die botten al had</b>. Dat zijn <b>homologe organen</b>: dezelfde bouw, geërfd van een gemeenschappelijke voorouder, ook als de functie veranderd is.<br><br>Een <b>rudimentair orgaan</b> is een overblijfsel dat zijn oorspronkelijke functie kwijt is. Bij de mens is het staartbeen de rest van een staart; ook de spiertjes waarmee sommige mensen hun oren kunnen bewegen, zijn zo'n overblijfsel."))});
  q.append(think,ans);
},TERUG("Bewijs voor evolutie",F.e7,"Hetzelfde skelet"));
opgave("Bewijs","Hoe weten we dat?","",[q1]);
}
