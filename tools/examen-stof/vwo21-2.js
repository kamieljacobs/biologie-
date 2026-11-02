/* Uitleg van de stof · oefenexamen vwo 2021 tijdvak 2 (tool vwo21-2). Wordt door samenvoegen.py gekopieerd naar tools/examen-stof/vwo21-2.js. */
(function(){
"use strict";
const E=window.EXSTOF, T="vwo21-2";if(!E)return;
const caps=a=>a.map(c=>({cap:c}));
const anim=(steps,draw)=>box=>E.stappen(box,steps,(st,s,i)=>{st.innerHTML=draw(i,s);});
const doos=(x,y,w,t,kl,on)=>`<rect x="${x}" y="${y}" width="${w}" height="38" rx="10" fill="var(--surface)" stroke="${kl||"var(--line2)"}" stroke-width="${on?2.4:1.4}" opacity="${on===false?.35:1}"/><text class="lbl" x="${x+w/2}" y="${y+24}" text-anchor="middle" opacity="${on===false?.35:1}">${t}</text>`;
const pijl=(x1,y1,x2,y2,k,on)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${k||"var(--text2)"}" stroke-width="1.8" opacity="${on===false?.3:1}"/><circle cx="${x2}" cy="${y2}" r="3" fill="${k||"var(--text2)"}" opacity="${on===false?.3:1}"/>`;

/* ---------- opgave 1: de pil ---------- */
E.zet(T,[1],{titel:"Hormoonketens en terugkoppeling",
  html:`<p>Veel hormonen worden niet door één klier geregeld, maar door een <b>keten</b>: een deel van het zenuwstelsel stuurt een klier aan, die klier geeft een hormoon af dat een volgende klier stimuleert, en die maakt het hormoon dat uiteindelijk het effect heeft.</p>
  <p>Het eindhormoon werkt vaak terug op het begin van de keten: <b>negatieve terugkoppeling</b>. Veel eindhormoon remt de klieren hogerop, zodat er minder wordt aangemaakt (zoals een thermostaat). Een medicijn dat op zo’n eindhormoon lijkt, kan die rem dus ook geven.</p>`,
  films:[["Post voor iedereen","films/hormonen/1-post-voor-iedereen.html"],["De baas van de klieren","films/hormonen/3-de-baas-van-de-klieren.html"]]});

E.zet(T,[2],{titel:"Hormonen van de menstruatiecyclus",
  html:`<p>De cyclus wordt geregeld door een keten van hormonen. De <b>hypothalamus</b> (in de hersenen) geeft <b>GnRH</b> af. Dat stimuleert de <b>hypofyse</b> om <b>FSH</b> en <b>LH</b> af te geven. FSH laat follikels in de eierstok rijpen; de follikel maakt <b>oestrogeen</b>. Een LH-piek veroorzaakt de ovulatie; het gele lichaam maakt daarna <b>progesteron</b>.</p>
  <p>Oestrogeen laat het baarmoederslijmvlies groeien; progesteron houdt het in stand. Hoge concentraties oestrogeen en progesteron remmen via <b>negatieve terugkoppeling</b> de hypothalamus en de hypofyse.</p>`,
  anim:anim(caps(["De hypothalamus geeft GnRH af aan de hypofyse.","De hypofyse geeft FSH en LH af: follikels rijpen in de eierstok.","De eierstok maakt oestrogeen en progesteron. Die werken op het baarmoederslijmvlies.","Veel oestrogeen en progesteron remmen hypothalamus en hypofyse: negatieve terugkoppeling."]),
    i=>E.svg("0 0 560 220",doos(20,20,150,"hypothalamus","var(--teal)",i>=0)+doos(20,90,150,"hypofyse","var(--teal)",i>=0)+doos(220,90,150,"eierstok","var(--goud)",i>=1)+doos(410,90,140,"baarmoeder","var(--koraal)",i>=2)+
      pijl(95,58,95,88,"var(--teal)")+`<text class="lblm" x="104" y="78">GnRH</text>`+pijl(170,109,218,109,"var(--teal)",i>=1)+`<text class="lblm" x="172" y="102" opacity="${i>=1?1:.3}">FSH, LH</text>`+
      pijl(370,109,408,109,"var(--goud)",i>=2)+`<path d="M295,128 C295,190 95,190 95,130" fill="none" stroke="var(--koraal)" stroke-width="1.8" stroke-dasharray="5 4" opacity="${i>=3?1:.15}"/><text class="lblbad" x="200" y="200" text-anchor="middle" opacity="${i>=3?1:.15}">remt (−)</text>`,"Hormoonketen van hypothalamus via hypofyse naar eierstok en baarmoeder")),
  films:[["Geslachtsorganen en puberteit","films/voortplanting/2-geslachtsorganen-puberteit.html"],["Anticonceptie, soa's en voortplantingstechniek","films/voortplanting/3-anticonceptie-soa-voortplantingstechniek.html"]]});

E.zet(T,[3],{titel:"Meiose bij de vrouw: oögenese",
  html:`<p><b>Diploïd</b> (2n) = twee sets chromosomen, <b>haploïd</b> (n) = één set. Lichaamscellen ontstaan door mitose en blijven diploïd. Alleen bij de vorming van geslachtscellen halveert het aantal chromosomen, bij <b>meiose I</b> (de homologe chromosomen gaan uit elkaar). Bij meiose II gaan de chromatiden uit elkaar; het aantal chromosomen blijft dan gelijk.</p>
  <p>Bij de vrouw start de meiose al vóór de geboorte en <b>pauzeert</b> dan. Pas vlak voor een ovulatie gaat de deling verder; meiose II wordt pas afgemaakt als er een zaadcel binnendringt. Rond de eicel liggen voedende cellen van de follikel.</p>`,
  anim:anim(caps(["Een cel met 2n: van elk chromosoom twee exemplaren (hier één paar).","Meiose I: de twee homologe chromosomen gaan naar verschillende cellen. Elke cel heeft nu n.","Meiose II: de twee chromatiden van elk chromosoom gaan uit elkaar. Het aantal chromosomen blijft n."]),
    i=>{const chr=(x,y,k,dub)=>`<rect x="${x}" y="${y}" width="8" height="38" rx="4" fill="${k}"/>`+(dub?`<rect x="${x+10}" y="${y}" width="8" height="38" rx="4" fill="${k}"/>`:"");
      const cel=(cx,r,inh,lab)=>`<circle cx="${cx}" cy="95" r="${r}" fill="var(--surface)" stroke="var(--line2)" stroke-width="1.6"/>${inh}<text class="lbl" x="${cx}" y="${95+r+18}" text-anchor="middle">${lab}</text>`;
      if(i===0)return E.svg("0 0 560 190",cel(280,55,chr(258,76,"var(--teal)",1)+chr(286,76,"var(--goud)",1),"2n"),"Diploïde cel");
      if(i===1)return E.svg("0 0 560 190",cel(170,50,chr(160,76,"var(--teal)",1),"n")+cel(390,50,chr(380,76,"var(--goud)",1),"n"),"Twee haploïde cellen na meiose I");
      return E.svg("0 0 560 190",cel(90,40,chr(86,76,"var(--teal)",0),"n")+cel(210,40,chr(206,76,"var(--teal)",0),"n")+cel(350,40,chr(346,76,"var(--goud)",0),"n")+cel(470,40,chr(466,76,"var(--goud)",0),"n"),"Vier haploïde cellen na meiose II");}),
  films:[["Celdeling","films/voortplanting/celdeling/index.html"]]});

E.zet(T,[4],{titel:"Een virus als vector",
  html:`<p>Een virus heeft geen eigen stofwisseling. Het <b>hecht</b> zich aan een receptor op een gastheercel en brengt zijn erfelijk materiaal naar binnen. Daarna laat het de gastheercel nieuwe virusdeeltjes maken.</p>
  <p>Virussen verschillen in hun erfelijk materiaal: dubbelstrengs of enkelstrengs DNA, of RNA. Retrovirussen (zoals hiv) hebben RNA en maken met <b>reverse transcriptase</b> een DNA-kopie die in het DNA van de gastheer wordt ingebouwd. In de biotechnologie bouw je een gewenst gen in zo’n virus en gebruik je het als ‘pakketdienst’ (vector).</p>`,
  films:[["T-cellen en virussen","films/afweer/3-t-cellen-en-virussen.html"],["CRISPR: wat doet dit gen?","films/vervolg/biomedisch-2-crispr-wat-doet-dit-gen.html"]]});

E.zet(T,[5],{titel:"Vertering van eiwitten",
  html:`<p>Grote moleculen kunnen niet door de darmwand. In maag en dunne darm knippen <b>proteasen</b> (pepsine, trypsine, peptidasen) eiwitten in steeds kleinere stukken, tot losse <b>aminozuren</b> en kleine peptiden. Alleen die worden opgenomen in het bloed.</p>`,
  films:[["Knippen op maat","films/voeding/3-knippen-op-maat.html"],["Van darm naar bloed","films/voeding/4-van-darm-naar-bloed.html"]]});

E.zet(T,[6],{titel:"Hormonen die genen aan- en uitzetten",
  html:`<p>Sommige signaalstoffen gaan de cel in en binden aan een <b>receptor in de kern</b>. Die receptor zit vast aan een stuk DNA voor een gen. Bindt de signaalstof, dan verandert de receptor van vorm en kan hij andere eiwitten aantrekken. Het enzym dat het gen afschrijft tot mRNA (<b>RNA-polymerase</b>) gaat dan aan de slag: <b>genexpressie</b>.</p>
  <p>Een <b>agonist</b> bindt aan de receptor en zet hem aan, net als de natuurlijke stof. Een <b>antagonist</b> bindt aan dezelfde plek maar zet de receptor niet aan, en houdt de natuurlijke stof weg.</p>`,
  anim:anim(caps(["Een receptor op het DNA, nog zonder signaalstof.","Een agonist bindt: de receptor verandert van vorm, RNA-polymerase kan het gen afschrijven.","Een antagonist bindt op dezelfde plek: de receptor blijft ‘uit’, er volgt geen transcriptie."]),
    i=>E.svg("0 0 560 160",`<line x1="30" y1="120" x2="530" y2="120" stroke="var(--text2)" stroke-width="3"/><text class="lblm" x="30" y="145">DNA</text>`+
      `<rect x="150" y="80" width="70" height="40" rx="12" fill="var(--teal-soft)" stroke="var(--teal)" stroke-width="1.8"/><text class="lbl" x="185" y="105" text-anchor="middle">receptor</text>`+
      (i===1?`<circle cx="185" cy="62" r="14" fill="var(--goud)"/><text class="lbl" x="208" y="50">agonist</text><ellipse cx="330" cy="98" rx="62" ry="22" fill="var(--groen-soft)" stroke="var(--groen)" stroke-width="1.8"/><text class="lbl" x="330" y="103" text-anchor="middle">RNA-polymerase</text><text class="lbl" x="430" y="80" style="fill:var(--groen)">transcriptie</text>`:"")+
      (i===2?`<rect x="168" y="48" width="34" height="26" rx="6" fill="var(--koraal)"/><text class="lbl" x="208" y="50">antagonist</text><ellipse cx="400" cy="60" rx="62" ry="22" fill="var(--surface)" stroke="var(--line2)" stroke-width="1.4"/><text class="lblm" x="400" y="65" text-anchor="middle">RNA-polymerase</text><text class="lblbad" x="330" y="108">geen transcriptie</text>`:""),"Receptor op DNA met agonist of antagonist")),
  films:[["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"],["Post voor iedereen","films/hormonen/1-post-voor-iedereen.html"]]});

E.zet(T,[7],{titel:"Conclusies trekken uit een grafiek",
  html:`<p>Bij een bewering over een grafiek stel je drie vragen:</p><ul><li><b>Is het gemeten?</b> Een conclusie mag alleen gaan over variabelen die in het onderzoek echt zijn gevarieerd. Wat constant is gehouden, kun je niet vergelijken.</li><li><b>Klopt de richting?</b> Lees bij het genoemde tijdstip welke lijn hoger ligt.</li><li><b>Is er een vergelijking?</b> Woorden als ‘volledig hersteld’ of ‘normaal’ vragen om een <b>controlegroep</b> waarmee je vergelijkt.</li></ul>`,
  films:[["Onderzoek doen in de biologie","films/cellen/onderzoek-doen/index.html"],["Kun je onderzoek vertrouwen?","films/extra/kun-je-onderzoek-vertrouwen.html"]]});

/* ---------- opgave 2: trekganzen ---------- */
E.zet(T,[8],{titel:"Beperkende factoren voor plantengroei",
  html:`<p>De groei van planten hangt af van abiotische factoren: licht, temperatuur, water, CO<sub>2</sub> en mineralen. De factor die het meest tekortschiet, is de <b>beperkende factor</b>: verbeter je die, dan groeit de plant harder.</p>
  <p>In poolgebieden is de zomer kort en ligt er lang sneeuw. Daar bepaalt vooral de <b>temperatuur</b> hoeveel biomassa er per jaar bijkomt. Meer biomassa van planten betekent meer voedsel voor planteneters.</p>`,
  films:[["Waar past een soort?","films/ecologie/2-waar-past-een-soort.html"],["Hoeveel passen er?","films/ecologie/1-hoeveel-passen-er.html"]]});

E.zet(T,[9],{titel:"Trofische niveaus",
  html:`<p>Een voedselketen begint bij <b>producenten</b>: autotrofe organismen die met fotosynthese organische stof maken (planten, algen). Wie producenten eet, is <b>consument van de eerste orde</b>; wie die eet, consument van de tweede orde, enzovoort. <b>Reducenten</b> breken dode resten af.</p>
  <p>Let op het verschil tussen een <i>voedingswijze</i> (herbivoor, carnivoor, heterotroof) en een <i>trofisch niveau</i> (de plek in de keten).</p>`,
  anim:anim(caps(["Producent: maakt zelf organische stof.","Consument van de eerste orde: eet producenten.","Consument van de tweede orde: eet consumenten van de eerste orde."]),
    i=>E.svg("0 0 560 90",doos(20,26,150,"producent","var(--groen)",i>=0)+pijl(170,45,205,45,"var(--text2)",i>=1)+doos(205,26,160,"consument 1e orde","var(--goud)",i>=1)+pijl(365,45,395,45,"var(--text2)",i>=2)+doos(395,26,150,"consument 2e orde","var(--koraal)",i>=2),"Trofische niveaus")),
  films:[["Wie eet wie?","films/ecologie/3-wie-eet-wie.html"]]});

E.zet(T,[10,11],{titel:"Eutrofiering",
  html:`<p><b>Eutrofiering</b> = verrijking van water met voedingszouten, vooral <b>nitraat</b> en <b>fosfaat</b>. Reducenten breken organische stoffen af; uit stoffen met stikstof (N) of fosfor (P) komen dan zulke zouten vrij. </p>
  <p>Met veel voedingszouten kunnen algen snel groeien: <b>algenbloei</b>.</p>
  <p><b>Een experiment opzetten:</b> varieer één factor (de onafhankelijke variabele), meet het effect (de afhankelijke variabele) en houd alle andere omstandigheden gelijk en zo natuurlijk mogelijk. Zeg vooraf welke uitkomst bij je hypothese past.</p>`,
  films:[["Stikstof gaat rond","films/ecologie/7-stikstof-gaat-rond.html"],["Onderzoek doen in de biologie","films/cellen/onderzoek-doen/index.html"]]});

E.zet(T,[12,13],{titel:"Aangeboren en verworven afweer",
  html:`<p>De <b>aangeboren (aspecifieke) afweer</b> is er vanaf de geboorte, reageert meteen en op dezelfde manier op alles wat lichaamsvreemd is, en heeft geen geheugen. Denk aan huid en slijmvliezen en de ontstekingsreactie.</p>
  <p>De <b>verworven (specifieke) afweer</b> ontstaat pas na contact met een antigeen: lymfocyten met een receptor die precies op één antigeen past, worden geactiveerd en vermenigvuldigd. Er blijven geheugencellen over, zodat een tweede infectie sneller wordt bestreden.</p>
  <p>Een afweersysteem kost energie en grondstoffen; hoe actief het is, hangt mede af van hoeveel ziekteverwekkers er in de omgeving zijn.</p>`,
  films:[["De eerste verdediging","films/afweer/1-de-eerste-verdediging.html"],["Antistoffen op maat","films/afweer/2-antistoffen-op-maat.html"]]});

/* ---------- opgave 3: koolmonoxide ---------- */
E.zet(T,[14,16],{titel:"Zuurstofbinding aan hemoglobine",
  html:`<p>Hemoglobine heeft vier subeenheden met elk een ijzerhoudende heemgroep die één O<sub>2</sub> kan binden. In de longen (hoge pO<sub>2</sub>) wordt zuurstof gebonden. In de weefsels (lage pO<sub>2</sub>, lage pH, hoge pCO<sub>2</sub>) verandert hemoglobine van vorm en <b>laat het zuurstof los</b>.</p>
  <p>Het <b>hartminuutvolume</b> = slagvolume × hartslagfrequentie: de hoeveelheid bloed die het hart per minuut rondpompt.</p>`,
  anim:anim(caps(["In de longen: hoge pO₂, hemoglobine bindt zuurstof (‘relaxed’ vorm).","In de weefsels: lage pO₂, hemoglobine gaat over in de ‘tight’ vorm en geeft zuurstof af."]),
    i=>E.svg("0 0 560 150",doos(20,20,200,"longen: hoge pO₂","var(--teal)",i===0)+doos(340,20,200,"weefsel: lage pO₂","var(--koraal)",i===1)+
      `<circle cx="${i?440:120}" cy="105" r="26" fill="var(--surface)" stroke="var(--text2)" stroke-width="1.6"/><text class="lbl" x="${i?440:120}" y="110" text-anchor="middle">Hb</text>`+
      [0,1,2,3].map(k=>{const a=k*Math.PI/2+.7,cx=(i?440:120)+Math.cos(a)*(i?52:36),cy=105+Math.sin(a)*(i?40:32);return `<circle cx="${cx}" cy="${cy}" r="9" fill="var(--teal)"/><text class="lblm" x="${cx}" y="${cy+4}" text-anchor="middle" style="fill:var(--bg);font-size:9px">O₂</text>`;}).join(""),"Hemoglobine bindt O2 in de longen en geeft het af in de weefsels")),
  films:[["Gas op reis","films/gaswisseling/2-gas-op-reis.html"],["Het hart onder controle","films/transport/5-het-hart-onder-controle.html"]]});

E.zet(T,[15],{titel:"De wet van Fick",
  html:`<p>De snelheid van diffusie door een membraan of wand hangt af van vier factoren (Binas):</p><p style="text-align:center;font-size:18px"><i>v</i> ~ <i>D</i> · <i>A</i> · Δ<i>c</i> / Δ<i>x</i></p><ul><li><i>D</i>: de diffusieconstante (stof en medium)</li><li><i>A</i>: het oppervlak</li><li>Δ<i>c</i>: het concentratieverschil tussen de twee kanten</li><li>Δ<i>x</i>: de afstand (dikte van de wand)</li></ul>`,
  films:[["Diffusie en osmose","films/cellen/diffusie-osmose/index.html"],["Adem in, adem uit","films/gaswisseling/1-adem-in-adem-uit.html"]]});

E.zet(T,[17],{titel:"ATP in een neuron",
  html:`<p>Een neuron gebruikt veel ATP. Alle processen waarbij stoffen tegen een concentratiegradiënt in worden gepompt (actief transport), of waarbij iets binnen de cel wordt verplaatst, kosten ATP.</p>
  <p><b>Organisatieniveaus</b>: molecuul → organel → cel → weefsel → orgaan → organisme. In een oorzaak-gevolgschema zet je bij elk niveau een gevolg dat logisch volgt uit het vorige.</p>`,
  films:[["Het kabelnetwerk","films/zenuwstelsel/2-het-kabelnetwerk.html"],["De spleet","films/zenuwstelsel/3-de-spleet.html"],["Alles op adem","films/stofwisseling/2-alles-op-adem.html"]]});

E.zet(T,[18],{titel:"Van DNA-sequentie naar aminozuur",
  html:`<p>De <b>coderende streng</b> van een gen heeft dezelfde volgorde als het mRNA, met T in plaats van U. Elk aminozuur hoort bij drie basen (een triplet). Begin te tellen bij het startcodon (ATG): aminozuur <i>n</i> wordt gecodeerd door de basen 3<i>n</i> − 2 tot en met 3<i>n</i>.</p>
  <p>Bij een <b>puntmutatie</b> verandert één base. Of het aminozuur verandert, zoek je op in de codontabel (Binas): die staat in mRNA-codons, dus vertaal U ↔ T.</p>`,
  anim:anim(caps(["Een stukje coderende streng: ATG GCT TTC … (voorbeeld).","Tel per drie: aminozuur 1 = base 1–3, aminozuur 2 = base 4–6, aminozuur 3 = base 7–9.","Zet om naar mRNA (T wordt U) en zoek op: AUG = Met, GCU = Ala, UUC = Phe."]),
    i=>E.svg("0 0 560 120",["ATG","GCT","TTC"].map((t,k)=>`<rect x="${60+k*150}" y="20" width="120" height="40" rx="8" fill="${i>=1?"var(--goud-soft)":"var(--surface)"}" stroke="var(--line2)"/><text class="lbl" x="${120+k*150}" y="46" text-anchor="middle" style="font:600 18px var(--meta)">${t}</text>`+(i>=1?`<text class="lblm" x="${120+k*150}" y="78" text-anchor="middle">base ${k*3+1}–${k*3+3}</text>`:"")+(i>=2?`<text class="lbl" x="${120+k*150}" y="104" text-anchor="middle">${["AUG · Met","GCU · Ala","UUC · Phe"][k]}</text>`:"")).join(""),"Een DNA-sequentie per triplet lezen")),
  films:[["De genetische code lezen","films/dna/4-de-genetische-code-lezen.html"],["Mutaties","films/dna/5-mutaties.html"]]});

E.zet(T,[19],{titel:"Grafieken van een overdracht lezen",
  html:`<p>Gaat een stof over van A naar B, dan is de som altijd 100%: de ene lijn daalt evenveel als de andere stijgt. Twee dingen bepalen hoe de lijnen eruitzien:</p><ul><li><b>Het eindpunt</b>: hangt af van hoe sterk A en B de stof binden (de affiniteit).</li><li><b>De vorm</b>: de snelheid van de overdracht hangt af van hoeveel er nog over te dragen is. Kijk of een lijn recht loopt, steeds steiler wordt of juist afvlakt.</li></ul>`,
  films:[["Alles versneld","films/stofwisseling/1-alles-versneld.html"]]});

/* ---------- opgave 4: huidmondjes ---------- */
E.zet(T,[20],{titel:"Afbraak door reducenten",
  html:`<p><b>Reducenten</b> (bacteriën en schimmels) breken dode organische stof af tot CO<sub>2</sub>, water en mineralen. De meeste doen dat met <b>aerobe dissimilatie</b>.</p>`,
  films:[["Waar blijft het blad?","films/ecologie/4-waar-blijft-het-blad.html"],["Koolstof gaat rond","films/ecologie/6-koolstof-gaat-rond.html"]]});

E.zet(T,[21,22],{titel:"Genen, milieu en natuurlijke selectie",
  html:`<p>Het fenotype ontstaat uit het genotype én het milieu. Cellen regelen voortdurend welke genen aan- en uitstaan (<b>genregulatie</b>), onder meer via methylering van DNA en het oprollen van DNA rond histonen. Zulke veranderingen kunnen door de omgeving worden veroorzaakt.</p>
  <p><b>Natuurlijke selectie</b> werkt op een populatie, over generaties. Darwin noemde de voorwaarden: individuen verschillen erfelijk van elkaar, er worden meer nakomelingen geboren dan er overleven, en wie het best past bij de omstandigheden plant zich het meest voort.</p>`,
  films:[["Genen aan en uit","films/dna/6-genen-aan-en-uit.html"],["Natuurlijke selectie","films/evolutie/2-natuurlijke-selectie.html"]]});

E.zet(T,[23,24],{titel:"Turgor en plasmolyse",
  html:`<p>Een plantencel in water neemt water op door osmose. De inhoud drukt tegen de stevige celwand: <b>turgor</b>. Verliest de cel water, dan wordt de druk kleiner. Op het moment dat het celmembraan nét loskomt van de celwand, spreek je van <b>grensplasmolyse</b>. Daarna krimpt de protoplast verder: <b>plasmolyse</b>.</p>
  <p><b>Dichtheid uitdrukken</b>: een aantal per oppervlakte hangt af van hoe groot het oppervlak is. Een verhouding tussen twee aantallen hangt daar niet van af.</p>`,
  films:[["Diffusie en osmose","films/cellen/diffusie-osmose/index.html"]]});

E.zet(T,[25],{titel:"Wat gaat er door de huidmondjes?",
  html:`<p>Huidmondjes zijn openingen in de epidermis van het blad, met twee sluitcellen die ze open en dicht kunnen zetten. De sluitcellen gaan open als ze water opnemen (turgor) en sluiten als de plant water tekortkomt. Hoe groter de opening, hoe sneller stoffen erdoorheen kunnen diffunderen.</p>`,
  films:[["Transport in planten","films/transport/6-transport-in-planten.html"],["Alles in het groen","films/stofwisseling/3-alles-in-het-groen.html"]]});

E.zet(T,[26,27],{titel:"De koolstofkringloop en het broeikaseffect",
  html:`<p>Planten leggen met fotosynthese CO<sub>2</sub> vast in organische stof. Dissimilatie, afbraak en verbranding geven CO<sub>2</sub> weer af. Of een ecosysteem netto CO<sub>2</sub> vastlegt of afgeeft, hangt af van de balans tussen die processen.</p>
  <p>CO<sub>2</sub> is een <b>broeikasgas</b>: het neemt een deel van de warmtestraling op die de aarde uitstraalt.</p>`,
  films:[["Koolstof gaat rond","films/ecologie/6-koolstof-gaat-rond.html"],["Van zand tot bos","films/ecologie/8-van-zand-tot-bos.html"]]});

/* ---------- opgave 5: PKU ---------- */
E.zet(T,[28,29,30,31],{titel:"Aminozuren en hun stofwisseling",
  html:`<p>Je lichaam haalt aminozuren uit eiwitten in je voedsel en uit de afbraak van eigen eiwitten. Een aantal aminozuren kan het zelf maken uit andere stoffen; de rest moet uit voedsel komen: dat zijn de <b>essentiële aminozuren</b> (Binas). Of een aminozuur essentieel is, hangt dus af van welke omzettingen een lichaam kan uitvoeren.</p>
  
  <p>Een <b>co-enzym</b> is een klein molecuul dat een enzym nodig heeft om te werken. Ontbreekt het, dan stoppen alle omzettingen waarbij het betrokken is. <b>Dopamine</b> is een neurotransmitter, maar remt als hormoon ook de afgifte van prolactine door de hypofyse.</p>`,
  films:[["Wat zit er in je eten?","films/voeding/1-wat-zit-er-in-je-eten.html"],["De baas van de klieren","films/hormonen/3-de-baas-van-de-klieren.html"]]});

E.zet(T,[32,33],{titel:"Informatie doorgeven in het zenuwstelsel",
  html:`<p><b>Impulsgeleiding</b>: een actiepotentiaal loopt over het axon. Een <b>myelineschede</b> laat de impuls van insnoering naar insnoering springen, wat veel sneller gaat.</p>
  <p><b>Impulsoverdracht</b> in de synaps: komt de impuls aan, dan stroomt Ca<sup>2+</sup> de presynaptische cel in. Daardoor versmelten blaasjes met het membraan en komt <b>neurotransmitter</b> vrij, die aan receptoren op de volgende cel bindt.</p>
  <p>De <b>bloed-hersenbarrière</b> laat stoffen alleen via specifieke transporteiwitten door.</p>`,
  films:[["De spleet","films/zenuwstelsel/3-de-spleet.html"],["Het kabelnetwerk","films/zenuwstelsel/2-het-kabelnetwerk.html"]]});

E.zet(T,[34,35],{titel:"Kansen bij recessieve overerving en Hardy-Weinberg",
  html:`<p>Bij een <b>autosomaal recessieve</b> aandoening zijn zieken aa. Gezonde ouders van een ziek kind zijn allebei <b>Aa</b>.</p>
  <p><b>Hardy-Weinberg</b>: p + q = 1 en p<sup>2</sup> + 2pq + q<sup>2</sup> = 1. Hierin zijn p en q allelfrequenties, en p<sup>2</sup>, 2pq en q<sup>2</sup> de frequenties van de genotypen AA, Aa en aa. Begin bij het genotype dat je kunt herkennen: de zieken.</p>`,
  films:[["Stambomen en kansrekenen","films/erfelijkheid/6-stambomen-en-kansrekenen.html"],["Toeval en uitwisseling","films/evolutie/5-toeval-en-uitwisseling.html"]]});

/* ---------- opgave 6: veroudering ---------- */
E.zet(T,[36],{titel:"Betrouwbaarheid en validiteit",
  html:`<p><b>Betrouwbaarheid</b>: krijg je bij herhaling (ongeveer) dezelfde uitkomst? Toevallige fouten, zoals een kleine steekproef of onnauwkeurig meten, verlagen de betrouwbaarheid. Herhalen en grotere groepen helpen.</p>
  <p><b>Validiteit</b>: meet je wat je wilt meten? <b>Systematische fouten</b> (die steeds in dezelfde richting werken) verlagen de validiteit.</p>`,
  films:[["Onderzoek doen in de biologie","films/cellen/onderzoek-doen/index.html"],["Kun je onderzoek vertrouwen?","films/extra/kun-je-onderzoek-vertrouwen.html"]]});

E.zet(T,[37],{titel:"Kanker en de celcyclus",
  html:`<p>De celcyclus wordt geremd en gestimuleerd door genen: <b>proto-oncogenen</b> (stimuleren deling) en <b>tumorsuppressorgenen</b> (remmen deling, laten DNA herstellen of zetten apoptose in gang). Ontstaan er mutaties in zulke genen, dan kan een cel ongeremd gaan delen: een <b>tumor</b>.</p>
  <p><b>Telomeren</b> zijn de uiteinden van chromosomen. Bij elke deling worden ze iets korter. Zijn ze te kort, dan stopt de cel met delen.</p>`,
  films:[["Mutaties","films/dna/5-mutaties.html"],["Celdeling","films/voortplanting/celdeling/index.html"]]});

E.zet(T,[38],{titel:"Cellen van de specifieke afweer",
  html:`<p>Lymfocyten ontstaan uit stamcellen in het beenmerg. <b>B-cellen</b> rijpen in het beenmerg, <b>T-cellen</b> in de <b>thymus</b>. Er zijn twee soorten T-cellen: <b>T-helpercellen</b> en <b>cytotoxische T-cellen</b>.</p>
  <p>Bij een infectie nemen <b>antigeen-presenterende cellen</b> (APC’s) een ziekteverwekker op en zetten stukjes antigeen op hun membraan. Lymfocyten met een passende receptor herkennen dat antigeen. T-helpercellen geven daarna signaalstoffen af die andere afweercellen aanzetten. Ga bij elk proces na welke cellen eraan meedoen en welke signalen ze nodig hebben.</p>`,
  anim:anim(caps(["Een APC neemt een ziekteverwekker op.","De APC presenteert stukjes antigeen op zijn membraan.","Een lymfocyt met een passende receptor herkent het antigeen."]),
    i=>E.svg("0 0 560 120",doos(20,40,140,"APC","var(--goud)",true)+`<text class="lblm" x="90" y="100" text-anchor="middle" opacity="${i>=1?1:.3}">antigeen op membraan</text>`+pijl(160,59,215,59,"var(--text2)",i>=2)+doos(215,40,180,"lymfocyt (receptor)","var(--teal)",i>=2),"Antigeenpresentatie en herkenning")),
  films:[["T-cellen en virussen","films/afweer/3-t-cellen-en-virussen.html"],["Antistoffen op maat","films/afweer/2-antistoffen-op-maat.html"]]});

E.zet(T,[39],{titel:"Differentiatie en transcriptiefactoren",
  html:`<p>Alle cellen van een organisme hebben hetzelfde DNA. Ze verschillen doordat er <b>andere genen tot expressie</b> komen. Bij differentiatie spelen <b>transcriptiefactoren</b> een rol, die aan regulerende stukken DNA (promotor, enhancer) binden en zo bepalen of RNA-polymerase een gen afschrijft.</p>
  <p>Pluripotente stamcellen kunnen nog alle celtypen worden; door bepaalde transcriptiefactoren te activeren kun je een gedifferentieerde cel terugzetten.</p>`,
  films:[["Stamcellen","films/cellen/stamcellen.html"],["Hoe weet een cel wat hij moet worden?","films/extra/hoe-weet-een-cel.html"]]});
})();
