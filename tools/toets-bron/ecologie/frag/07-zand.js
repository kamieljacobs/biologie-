/* ===== Opgave 7: Van zand tot bos (EI-ecologie-KH01) ===== */
{
const STOF_SUC={titel:"Successie",html:`
<p>Op één plek volgen levensgemeenschappen elkaar op: dat heet <b>successie</b>. Begint het op kale grond zonder humus, zoals een zandvlakte of een nieuw eiland, dan is het <b>primaire successie</b>. Begint het op een plek waar al bodem en zaden zijn, zoals een verlaten akker of na een bosbrand, dan is het <b>secundaire successie</b>.</p>
<p>De soorten die als eerste op een kale plek groeien, heten <b>pioniersoorten</b>. Uiteindelijk ontstaat een stabiel eindstadium: het <b>climaxecosysteem</b>, in Nederland meestal een bos.</p>
<p>Bij successie veranderen de organismen zelf de abiotische factoren van de plek, zoals de bodem, de temperatuur en het licht.</p>`,
films:[F.zand]};
const ids=[vraag(2,"pioniersoorten",(q,id)=>{
  const {think,ans,unlock}=start(q,B("Noem twee kenmerken van pioniersoorten. Leg ook uit hoe pioniers er zelf voor zorgen dat ze later verdwijnen."));
  choiceStep(think,{q:"Hoe is het op een kale zandvlakte waar pioniers als eerste groeien?",opts:["heet, droog, arm en stuivend","schaduwrijk, vochtig en voedselrijk"],right:0,
    ok:"Ja. Welke eigenschappen heeft een soort nodig om daar te komen en daar te overleven?",no:"Denk aan kaal zand in de zon.",
    onDone:()=>choiceStep(think,{q:"Wat gebeurt er met de resten van pioniers als ze afsterven?",opts:["ze worden afgebroken tot humus","ze verdwijnen zonder iets na te laten","ze waaien allemaal weg"],right:0,
      ok:"Goed. Wat verandert humus aan de bodem? En welke planten kunnen daardoor groeien, en wat betekent dat voor de pioniers?",no:"Reducenten breken de resten af.",onDone:unlock})});
  openAnswer(ans,{id,pts:2,checks:[
    "Twee van: <b>brede tolerantie</b> (hitte, droogte, arme bodem), <b>veel kleine zaden of sporen die ver waaien</b>, lang kiemkrachtig.",
    "Hun resten worden <b>humus</b>: de bodem houdt meer water en voedingsstoffen vast, zodat andere (grotere) soorten kunnen groeien, die de pioniers <b>wegconcurreren</b> (om licht)."],
    model:"Pioniersoorten hebben een brede tolerantie: ze kunnen tegen hitte, droogte en een arme bodem. En ze maken veel kleine zaden of sporen die ver waaien. Als pioniers afsterven, worden hun resten humus. De bodem houdt dan meer water en voedingsstoffen vast. Daardoor kunnen grotere soorten groeien, zoals heide en dennen. Die nemen de pioniers het licht af: de pioniers verliezen de concurrentie.",
    valkuil:"‘De pioniers worden oud en gaan dood’ is geen uitleg: dan zouden er nieuwe pioniers komen. Ze verdwijnen doordat ze zelf de plek veranderen en daarna de concurrentie verliezen.",
    after:()=>waaromBtn(ans,textBox("Pioniers zijn er als eerste bij doordat ze veel kleine zaden of sporen maken die ver waaien, en doordat ze hitte, droogte en arme grond verdragen. Maar ze veranderen de plek: hun dode resten worden humus, de bodem houdt water en voedingsstoffen vast, en in hun schaduw is het koeler. Nu kunnen grotere planten groeien. Die groeien over de pioniers heen en nemen het licht weg. Zo zorgen de pioniers zelf voor hun opvolgers."))});
  q.append(think,ans);
},STOF_SUC)];
opgave("Van zand tot bos","Van zand tot bos","",ids);
}
