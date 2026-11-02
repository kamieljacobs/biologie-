/* Uitleg van de stof · oefenexamen vwo 2023 tijdvak 2 (tool vwo23-2). Wordt door samenvoegen.py gekopieerd naar tools/examen-stof/vwo23-2.js. */
(function(){
"use strict";
const E=window.EXSTOF, T="vwo23-2";if(!E)return;
const caps=a=>a.map(c=>({cap:c}));
const anim=(steps,draw)=>box=>E.stappen(box,steps,(st,s,i)=>{st.innerHTML=draw(i,s);});
const doos=(x,y,w,t,kl)=>`<rect x="${x}" y="${y}" width="${w}" height="38" rx="10" fill="var(--surface)" stroke="${kl||"var(--line2)"}" stroke-width="1.6"/><text class="lbl" x="${x+w/2}" y="${y+24}" text-anchor="middle">${t}</text>`;
const pijl=(x1,y1,x2,y2,kl)=>`<path d="M${x1},${y1} L${x2},${y2}" stroke="${kl||"var(--text2)"}" stroke-width="2"/><circle cx="${x2}" cy="${y2}" r="3.5" fill="${kl||"var(--text2)"}"/>`;

/* ---------- opgave 1 ---------- */
E.zet(T,[1],{titel:"Genotype en fenotype aflezen",
  html:`<p>Wil je weten welk gen welk kenmerk bepaalt, zoek dan twee individuen die in <b>maar één gen</b> verschillen en kijk welk kenmerk dan anders is.</p>
  <p>Daarna bepaal je welk allel dominant is: kijk naar een <b>heterozygoot</b>. Het fenotype van de heterozygoot is het fenotype van het dominante allel. Een recessief fenotype zie je alleen bij een homozygoot recessief individu. Het fenotype ‘bepaald door’ een recessief allel is dus het fenotype van de homozygoot.</p>`,
  films:[["Monohybride kruisingen","films/erfelijkheid/2-monohybride-kruisingen.html"]]});
E.zet(T,[2,3],{titel:"Soort, ondersoort en soortvorming",
  html:`<p>Een <b>soort</b> is een groep organismen die zich onderling kunnen voortplanten en vruchtbare nakomelingen krijgen. De wetenschappelijke naam heeft twee delen: <i>Geslacht soort</i>. Een derde woord geeft een <b>ondersoort</b> aan: populaties van dezelfde soort die er door hun leefgebied anders uitzien.</p>
  <p><b>Reproductieve isolatie</b>: groepen planten zich niet meer met elkaar voort. Bij <b>allopatrische</b> soortvorming begint dat met een geografische scheiding (zee, gebergte); bij <b>sympatrische</b> soortvorming in hetzelfde gebied. <b>Gene flow</b> is de uitwisseling van allelen tussen populaties door voortplanting; gene flow gaat soortvorming juist tegen.</p>`,
  films:[["Hoe een soort er twee wordt","films/evolutie/6-hoe-een-soort-er-twee-wordt.html"],["Toeval en uitwisseling","films/evolutie/5-toeval-en-uitwisseling.html"]]});
E.zet(T,[4,5],{titel:"Gekoppelde genen en crossing-over",
  html:`<p>Genen op <b>verschillende chromosomen</b> erven onafhankelijk van elkaar over. Genen op <b>hetzelfde chromosoom</b> gaan meestal samen naar één gameet: ze zijn gekoppeld. Een ouder met twee gekoppelde genen maakt dan maar twee soorten gameten in plaats van vier.</p>
  <p>Bij een kans over meerdere genen: bereken per (groep) chromosoom de kans en <b>vermenigvuldig</b>. Let bij gekoppelde genen goed op welke allelen samen op één chromosoom liggen.</p>
  <p>Tijdens de profase van meiose I liggen homologe chromosomen tegen elkaar. Dan kunnen gekoppelde allelen toch van elkaar losraken: hoe verder twee genen uit elkaar liggen, hoe vaker.</p>`,
  anim:anim(caps(["Ouder met A en B op hetzelfde chromosoom, a en b op het homologe chromosoom.","Zonder uitwisseling: gameten <b>AB</b> en <b>ab</b>. Er zijn maar twee soorten.","Een stuk wordt tussen de homologe chromatiden uitgewisseld: nu ontstaan ook <b>Ab</b> en <b>aB</b>."]),
    i=>E.svg("0 0 520 170",`<rect x="40" y="40" width="160" height="18" rx="9" fill="var(--surface)" stroke="var(--teal)" stroke-width="2"/><rect x="40" y="80" width="160" height="18" rx="9" fill="var(--surface)" stroke="var(--goud)" stroke-width="2"/>`+
      `<text class="lbl" x="80" y="54" text-anchor="middle">A</text><text class="lbl" x="160" y="54" text-anchor="middle">${i===2?"b":"B"}</text><text class="lbl" x="80" y="94" text-anchor="middle">a</text><text class="lbl" x="160" y="94" text-anchor="middle">${i===2?"B":"b"}</text>`+
      (i===2?`<path d="M120,36 L120,104" stroke="var(--koraal)" stroke-width="2" stroke-dasharray="4 3"/>`:"")+
      (i>=1?doos(280,30,90,i===2?"A b":"A B","var(--teal)")+doos(280,80,90,i===2?"a B":"a b","var(--goud)")+(i===2?doos(400,30,90,"A B")+doos(400,80,90,"a b"):""):""),"Gekoppelde genen")),
  films:[["Dihybride kruising en gekoppelde overerving","films/erfelijkheid/4-dihybride-kruising-en-gekoppelde-overerving.html"]]});
E.zet(T,[6],{titel:"Geslachtschromosomen bij vogels en vlinders",
  html:`<p>Bij de mens bepaalt het X/Y-systeem het geslacht: XX vrouw, XY man. Bij vogels en vlinders is het omgekeerd: het <b>vrouwtje</b> heeft twee verschillende geslachtschromosomen (<b>WZ</b>), het mannetje twee gelijke (<b>ZZ</b>). De moeder bepaalt dus het geslacht van het kind: een eicel met W geeft een dochter, een eicel met Z een zoon.</p>
  <p>Zijn twee chromosomen aan elkaar vastgegroeid (fusie), dan gaan ze bij de meiose als één geheel naar dezelfde gameet. Het homologe chromosoom gaat dan naar de andere gameet.</p>
  <p>Organellen en bacteriën in het cytoplasma geeft alleen de moeder door, via de eicel, aan zonen én dochters.</p>`,
  films:[["Overerving via het X-chromosoom","films/erfelijkheid/5-overerving-via-x-chromosomen-en-mitochondrien.html"]]});

/* ---------- opgave 2 ---------- */
E.zet(T,[7],{titel:"Virussen en eiwitsynthese",
  html:`<p>Een virus heeft geen eigen stofwisseling: het laat de gastheercel zijn eiwitten maken. Alleen RNA met de <b>coderende</b> basenvolgorde kan als mRNA op een ribosoom worden vertaald.</p>
  <p><b>Translatie</b> gebeurt op ribosomen: vrije ribosomen maken eiwitten voor het cytoplasma, ribosomen op het <b>ruw ER</b> maken membraan- en exporteiwitten. Het <b>golgi-systeem</b> bewerkt en sorteert die eiwitten daarna en verpakt ze in blaasjes.</p>
  <p>Virussen met een envelop krijgen die envelop bij het afsnoeren van de cel: een stukje membraan van de gastheer, met virale eiwitten erin.</p>`,
  films:[["Van DNA naar eiwit","films/dna/3-van-dna-naar-eiwit.html"],["T-cellen en virussen","films/afweer/3-t-cellen-en-virussen.html"]]});
E.zet(T,[8,31],{titel:"Activatie van T-cellen",
  html:`<p>Een <b>antigeenpresenterende cel</b> (zoals een dendritische cel) presenteert stukjes antigeen in <b>MHC-II</b>. Een T-helpercel met een passende <b>T-cel-receptor</b> bindt daaraan. Voor activatie is nog een tweede signaal nodig: extra membraaneiwitten van beide cellen die aan elkaar koppelen.</p>
  <p>Een geactiveerde <b>T-helpercel</b> activeert B-cellen (humorale respons: antistoffen) en cytotoxische T-cellen (cellulaire respons).</p>
  <p>Elke lichaamscel draagt <b>MHC-I</b>. Een <b>cytotoxische T-cel</b> bindt met zijn T-cel-receptor aan MHC-I met een vreemd antigeen, of aan vreemd MHC-I, en doodt die cel (lek maken, apoptose).</p>`,
  anim:anim(caps(["Signaal 1: MHC-II met antigeen bindt aan de T-cel-receptor.","Signaal 2: extra membraaneiwitten van beide cellen koppelen aan elkaar. Pas met beide signalen wordt de T-helpercel actief."]),
    i=>E.svg("0 0 520 170",`<ellipse cx="140" cy="85" rx="100" ry="60" fill="var(--surface)" stroke="var(--line2)" stroke-width="1.6"/><text class="lbl" x="110" y="90" text-anchor="middle">APC</text><ellipse cx="400" cy="85" rx="90" ry="60" fill="var(--surface)" stroke="var(--teal)" stroke-width="1.6"/><text class="lbl" x="430" y="90" text-anchor="middle">T-helpercel</text>`+
      `<rect x="232" y="50" width="38" height="16" fill="var(--goud)"/><text class="lbl" x="250" y="44" text-anchor="middle">MHC-II</text><rect x="272" y="50" width="38" height="16" fill="var(--teal)"/><text class="lbl" x="300" y="44" text-anchor="start">receptor</text>`+
      (i?`<rect x="232" y="104" width="38" height="16" fill="var(--paars)"/><rect x="272" y="104" width="38" height="16" fill="var(--paars)"/><text class="lbl" x="270" y="140" text-anchor="middle">signaal 2</text>`:""),"Twee signalen bij T-celactivatie")),
  films:[["Antistoffen op maat","films/afweer/2-antistoffen-op-maat.html"],["T-cellen en virussen","films/afweer/3-t-cellen-en-virussen.html"]]});
E.zet(T,[9],{titel:"Bloedstolling",
  html:`<p>In het bloedplasma zitten altijd de stollingseiwitten <b>protrombine</b> en <b>fibrinogeen</b>. Bij een beschadiging komen stollingsfactoren vrij (uit bloedplaatjes en beschadigd weefsel): <b>tromboplastine</b> (trombokinase).</p>
  <p>Stollingsfactor → protrombine wordt trombine → trombine zet fibrinogeen om in fibrine → fibrinedraden vormen met bloedcellen een stolsel.</p>
  <p><b>Collageen</b> is een eiwit in bindweefsel, bijvoorbeeld in de vaatwand.</p>`,
  films:[["Wat er in je bloed zit","films/transport/3-wat-er-in-je-bloed-zit.html"]]});
E.zet(T,[10],{titel:"Nucleotiden en stikstofbasen",
  html:`<p>Een nucleotide bestaat uit een fosfaatgroep, een suiker (ribose in RNA, desoxyribose in DNA) en een stikstofbase. De basen zijn <b>purines</b> (twee ringen: adenine, guanine) of <b>pyrimidines</b> (één ring: cytosine, thymine, uracil). Ze verschillen ook in hun zijgroepen (NH<sub>2</sub>, C=O, CH<sub>3</sub>). De structuurformules staan in je informatieboek.</p>
  <p>Een nucleotide-analoog lijkt zo veel op een echte nucleotide dat een polymerase hem inbouwt.</p>`,
  films:[["Wat is DNA?","films/dna/1-wat-is-dna.html"]]});
E.zet(T,[11,12,13],{titel:"Antistoffen, vaccins en immunisatie",
  html:`<p><b>Actieve immunisatie</b>: je eigen afweer maakt antistoffen, bijvoorbeeld na een vaccin. Daarbij ontstaan geheugencellen, dus je bent lang beschermd. <b>Passieve immunisatie</b>: je krijgt kant-en-klare antistoffen. Dat werkt meteen, maar kort en zonder geheugen.</p>
  <p>Een vaccin bevat antigenen (of de genetische informatie ervan) van de ziekteverwekker.</p>
  <p><b>Monoklonale antistoffen</b> komen van één kloon B-cellen. Plasmacellen maken veel antistof, maar zijn eindgedifferentieerd. Voor productie fuseer je ze met een andere cel tot een <b>hybridomacel</b>.</p>`,
  films:[["Vaccins, allergie en bloedgroepen","films/afweer/4-vaccins-allergie-en-bloedgroepen.html"],["Antistoffen op maat","films/afweer/2-antistoffen-op-maat.html"]]});

/* ---------- opgave 3 ---------- */
E.zet(T,[14],{titel:"Pioniers en climaxsoorten",
  html:`<p>Tijdens een <b>successie</b> verandert een levensgemeenschap stap voor stap. <b>Pioniersoorten</b> vestigen zich als eerste op kale of verstoorde grond (r-strategen): ze groeien snel, maken veel kleine nakomelingen die zich ver verspreiden en zijn kort levend. <b>Climaxsoorten</b> horen bij het stabiele eindstadium (K-strategen): ze leven lang, groeien langzaam en investeren in weinig nakomelingen.</p>`,
  films:[["Van zand tot bos","films/ecologie/8-van-zand-tot-bos.html"]]});
E.zet(T,[15],{titel:"Evolutie door natuurlijke selectie",
  html:`<p>Een uitleg van evolutie door natuurlijke selectie heeft vaste stappen:</p><ul><li>er is <b>erfelijke variatie</b> in een eigenschap (door mutatie en recombinatie);</li><li>individuen met een bepaalde variant <b>overleven en planten zich beter voort</b> in die omgeving (hogere fitness);</li><li>zij <b>geven hun allelen door</b>, zodat die variant in volgende generaties vaker voorkomt.</li></ul><p>Vermijd ‘het organisme past zich aan omdat het moet’: de variatie is er eerst, de omgeving selecteert.</p>`,
  films:[["Natuurlijke selectie","films/evolutie/2-natuurlijke-selectie.html"]]});
E.zet(T,[16,22],{titel:"Symbiose, stikstof en mycorrhiza",
  html:`<p>Bij <b>mutualisme</b> hebben beide partners voordeel. <b>Autotroof</b> = zelf organische stoffen maken uit anorganische (fotosynthese); <b>heterotroof</b> = organische stoffen van anderen gebruiken.</p>
  <p><b>Mycorrhiza</b>: schimmeldraden om of in plantenwortels vergroten het opnameoppervlak. Planten hebben voor eiwitten en DNA ook <b>stikstof</b> nodig, als nitraat of ammonium uit de bodem. Zoek in de stikstofkringloop op hoe stikstof uit de lucht in de bodem kan komen. Reducenten maken van dode resten weer mineralen.</p>`,
  films:[["Stikstof gaat rond","films/ecologie/7-stikstof-gaat-rond.html"],["Waar blijft het blad?","films/ecologie/4-waar-blijft-het-blad.html"]]});
E.zet(T,[17],{titel:"Assimilatie en dissimilatie",
  html:`<p>Een organisme gebruikt opgenomen organische stoffen op twee manieren: als <b>bouwstof</b> (assimilatie: eigen stoffen opbouwen, groei) en als <b>brandstof</b> (dissimilatie: afbreken tot o.a. CO<sub>2</sub> en water om ATP te maken).</p>`,
  films:[["Alles op adem","films/stofwisseling/2-alles-op-adem.html"]]});
E.zet(T,[18,20],{titel:"Watertransport en huidmondjes",
  html:`<p>Water met mineralen gaat door vaatweefsel van de wortel naar het blad. De motor is de <b>verdamping</b> in de bladeren: hoe meer water verdampt, hoe groter de zuigkracht die het water omhoog trekt.</p>
  <p>Huidmondjes worden geopend en gesloten door twee <b>sluitcellen</b>. Nemen ze K<sup>+</sup>-ionen en water op, dan worden ze stevig gespannen (<b>turgescent</b>) en buigen ze uit elkaar: het huidmondje gaat open. Verliezen ze K<sup>+</sup> en water, dan worden ze slap en sluit het huidmondje. Bij droogte maakt een plant het hormoon ABA, dat het sluiten in gang zet.</p>`,
  anim:anim(caps(["Sluitcellen nemen K<sup>+</sup> op, water volgt door osmose: ze worden turgescent en het huidmondje gaat <b>open</b>.","Sluitcellen geven K<sup>+</sup> af, water volgt: ze worden slap en het huidmondje gaat <b>dicht</b>."]),
    i=>E.svg("0 0 520 160",`<ellipse cx="${i?235:220}" cy="80" rx="${i?42:46}" ry="60" fill="var(--surface)" stroke="var(--groen)" stroke-width="2"/><ellipse cx="${i?285:300}" cy="80" rx="${i?42:46}" ry="60" fill="var(--surface)" stroke="var(--groen)" stroke-width="2"/>`+
      `<ellipse cx="260" cy="80" rx="${i?3:18}" ry="40" fill="var(--text3)"/><text class="lbl" x="420" y="70">${i?"K⁺ en water uit":"K⁺ en water in"}</text><text class="lbl" x="420" y="92">${i?"dicht":"open"}</text>`,"Sluitcellen bij een huidmondje")),
  films:[["Transport in planten","films/transport/6-transport-in-planten.html"]]});
E.zet(T,[21,23,24],{titel:"Onderzoek opzetten en bestrijding plannen",
  html:`<p>Bij een <b>veldexperiment</b> vergelijk je een proefgroep met een controlegroep die maar in één factor verschilt. Neem per groep <b>meerdere</b> proefvlakken (herhalingen) en houd de rest zo gelijk mogelijk.</p>
  <p>De <b>netto primaire productie</b> is de hoeveelheid organische stof die producenten per oppervlakte per tijd vastleggen, na aftrek van hun eigen dissimilatie. Je meet hem als <b>droge biomassa</b>: vers gewicht bevat vooral water.</p>
  <p>Een bestrijding werkt pas goed als ze alle stadia van de levenscyclus van een plaag raakt, ook de stadia die je niet ziet.</p>`,
  films:[["Onderzoek doen","films/cellen/onderzoek-doen/index.html"],["Hoeveel passen er?","films/ecologie/1-hoeveel-passen-er.html"]]});

/* ---------- opgave 4 ---------- */
E.zet(T,[25,33],{titel:"Mutaties en genetische technieken",
  html:`<p>Een <b>puntmutatie</b> verandert één base. Bij een <b>substitutie</b> wordt een base vervangen: hooguit één triplet en dus één aminozuur verandert (of geen). Bij een <b>insertie of deletie</b> verschuift het leesraam en veranderen (bijna) alle aminozuren daarna.</p>
  <p><b>Introns</b> worden bij splicing uit het pre-mRNA geknipt. De eiwitstructuur kent vier niveaus: <b>primair</b> (aminozuurvolgorde), secundair (helix, vouwblad), tertiair (ruimtelijke vouwing van één keten), quaternair (meerdere ketens samen).</p>
  <p>Met CRISPR-Cas kun je DNA gericht knippen en zo genen veranderen of helemaal uitschakelen.</p>`,
  films:[["Mutaties","films/dna/5-mutaties.html"],["CRISPR: wat doet dit gen?","films/vervolg/biomedisch-2-crispr-wat-doet-dit-gen.html"]]});
E.zet(T,[26],{titel:"De kleine en de grote bloedsomloop",
  html:`<p>De <b>rechterkamer</b> pompt zuurstofarm bloed via de longslagader naar de longen (kleine bloedsomloop). In de longhaarvaten neemt het bloed zuurstof op; via de longaders gaat het zuurstofrijk terug naar de linkerboezem. De <b>linkerkamer</b> pompt het bloed door het hele lichaam (grote bloedsomloop).</p>
  <p>Slagaders voeren bloed van het hart af, aders naar het hart toe, ongeacht hoeveel zuurstof erin zit.</p>`,
  films:[["Een pomp, twee rondjes","films/transport/1-een-pomp-twee-rondjes.html"]]});
E.zet(T,[27],{titel:"Gal en vetvertering",
  html:`<p>De <b>lever</b> maakt gal; de galblaas slaat het op en geeft het via de galbuis af aan de twaalfvingerige darm. Gal bevat <b>geen enzymen</b>. De galzouten <b>emulgeren</b> vetten: grote vetdruppels worden kleine druppeltjes. Het enzym <b>lipase</b> (uit de alvleesklier) breekt vetten af tot vetzuren en glycerol, en werkt aan het oppervlak van de druppels.</p>`,
  films:[["Knippen op maat","films/voeding/3-knippen-op-maat.html"],["De lever als fabriek","films/voeding/5-de-lever-als-fabriek.html"]]});
E.zet(T,[28,29,30],{titel:"Rode bloedcellen en hemoglobine",
  html:`<p>Rode bloedcellen, witte bloedcellen en bloedplaatjes ontstaan uit stamcellen in het <b>rode beenmerg</b>. Een gezonde rode bloedcel leeft ongeveer 120 dagen en wordt dan in lever en milt afgebroken.</p>
  <p>Hemoglobine bindt zuurstof. De <b>zuurstofverzadigingscurve</b> laat zien hoeveel procent van het hemoglobine zuurstof heeft gebonden bij elke zuurstofspanning. In actieve weefsels is de zuurstofspanning laag en geeft hemoglobine zuurstof af. Hoe groter de <b>affiniteit</b>, hoe steviger hemoglobine de zuurstof vasthoudt: de curve verschuift dan. Foetaal hemoglobine heeft een grotere affiniteit dan volwassen hemoglobine, zodat de foetus zuurstof van de moeder kan overnemen.</p>`,
  films:[["Wat er in je bloed zit","films/transport/3-wat-er-in-je-bloed-zit.html"],["Gas op reis","films/gaswisseling/2-gas-op-reis.html"]]});
E.zet(T,[32],{titel:"Genregulatie: enhancers en transcriptiefactoren",
  html:`<p>Of een gen wordt afgelezen, regelt de cel met <b>regulerende DNA-volgordes</b> en <b>regulerende eiwitten</b>. De <b>promotor</b> is de plek waar RNA-polymerase bindt. Een <b>enhancer</b> is een stuk DNA, soms ver van het gen, dat de transcriptie versterkt; het DNA vormt dan een lus. <b>Transcriptiefactoren</b> (zoals activatoreiwitten en repressoren) zijn eiwitten die aan het DNA binden en de transcriptie aan- of afzetten. <b>RNA-polymerase</b> is het enzym dat het RNA maakt.</p>`,
  films:[["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"]]});

/* ---------- opgave 5 ---------- */
E.zet(T,[34,35],{titel:"Een controle kiezen en grafieken lezen",
  html:`<p>Een goede <b>controle</b> verschilt van de proefsituatie alleen in de factor die je onderzoekt; alle andere omstandigheden zijn zo gelijk mogelijk.</p>
  <p>Bij grafieken: lees de <b>eenheid</b> op de as (hier per 1000 inwoners, dus steden van verschillende grootte zijn te vergelijken), let op een <b>onderbroken as</b> (twee schaalverdelingen in één grafiek), en vraag je af wat een meting wél en niet kan zeggen: rioolwater zegt iets over een hele stad, niets over wie iets gebruikt.</p>`,
  films:[["Kun je onderzoek vertrouwen?","films/extra/kun-je-onderzoek-vertrouwen.html"]]});
E.zet(T,[36],{titel:"Adrenaline en het autonome zenuwstelsel",
  html:`<p>Bij spanning of inspanning wordt het <b>orthosympathische</b> zenuwstelsel actief en geeft het bijniermerg adrenaline af: het lichaam maakt zich klaar voor vechten of vluchten. Zoek in je informatieboek op welke organen het orthosympathische zenuwstelsel beïnvloedt en hoe. Stoffen die aan dezelfde receptoren binden, geven dezelfde effecten.</p>`,
  films:[["Stress","films/hormonen/4-stress.html"]]});
E.zet(T,[37,38],{titel:"Oxidatieve fosforylering",
  html:`<p>In de mitochondriën geeft de <b>elektronentransportketen</b> elektronen door. De energie die daarbij vrijkomt gebruikt de keten om <b>H<sup>+</sup>-ionen</b> van de matrix naar de intermembraanruimte te pompen. Zo ontstaat een concentratieverschil (gradiënt) over de binnenmembraan.</p>
  <p>H<sup>+</sup>-ionen kunnen alleen terug via <b>ATP-synthase</b>. De stroom H<sup>+</sup> door dit enzym levert de energie om ADP + P om te zetten in ATP. Hoe groter de gradiënt, hoe meer ATP. De brandstof voor de dissimilatie kan glucose zijn, maar ook vetzuren.</p>`,
  anim:anim(caps(["De elektronentransportketen pompt H<sup>+</sup> naar de intermembraanruimte.","Er ontstaat een hoge H<sup>+</sup>-concentratie buiten de matrix.","H<sup>+</sup> stroomt terug door ATP-synthase: daarbij wordt ATP gemaakt."]),
    i=>E.svg("0 0 520 170",`<rect x="20" y="70" width="480" height="30" fill="var(--surface)" stroke="var(--line2)"/><text class="lbl" x="30" y="30">intermembraanruimte</text><text class="lbl" x="30" y="150">matrix</text>`+
      `<rect x="90" y="62" width="40" height="46" rx="8" fill="var(--surface2)" stroke="var(--teal)" stroke-width="2"/><rect x="330" y="60" width="50" height="50" rx="10" fill="var(--surface2)" stroke="var(--goud)" stroke-width="2"/><text class="lbl" x="355" y="128" text-anchor="middle">ATP-synthase</text>`+
      pijl(110,100,110,62,"var(--teal)")+(i>=1?[0,1,2,3,4,5].map(k=>`<text class="lbl" x="${160+k*26}" y="${40+(k%2)*14}" style="fill:var(--koraal)">H⁺</text>`).join(""):"")+(i>=2?pijl(355,50,355,135,"var(--goud)")+`<text class="lbl" x="400" y="150" style="fill:var(--goud-text)">ATP</text>`:""),"H⁺-gradiënt en ATP-synthase")),
  films:[["Alles op adem","films/stofwisseling/2-alles-op-adem.html"]]});
E.zet(T,[39],{titel:"Eiwitten en temperatuur",
  html:`<p>De functie van een eiwit hangt af van zijn <b>ruimtelijke vorm</b>. Die wordt bijeengehouden door zwakke bindingen (waterstofbruggen en andere). Zoek op wat er met die bindingen gebeurt bij een te hoge temperatuur, en wat dat betekent voor een enzym en zijn actieve centrum.</p>`,
  films:[["Alles versneld","films/stofwisseling/1-alles-versneld.html"]]});
})();
