import json
film = {
 "slug": "2-gas-op-reis", "hoofdstuk": "gaswisseling", "hoofdstukNaam": "Gaswisseling",
 "title": "Gas op reis", "sub": "Hoe zuurstof en koolstofdioxide door je bloed reizen",
 "puzzle": "Houd je adem in. Ergens komt er een moment dat je móét ademen. Wat dwingt je daartoe?",
 "meta": "gaswisseling 2/3", "version": "1.0 · oktober 2026", "titleLook": "micro",
 "seriesline": "Biologie bij Kamiel · reeks Gaswisseling en uitscheiding · film 2 van 3",
 "lead": "Bijna alle zuurstof reist gebonden aan hemoglobine in de rode bloedcellen: opladen in de longen waar de zuurstofspanning hoog is, afgeven in de weefsels waar die laag is. In rust komt het bloed nog voor ongeveer driekwart verzadigd terug. Koolstofdioxide reist vooral als waterstofcarbonaat in het plasma. Chemoreceptoren meten vooral koolstofdioxide; het ademcentrum in het verlengde merg laat je dan sneller en dieper ademen: negatieve terugkoppeling. Koolmonoxide bezet hemoglobine zonder dat je het merkt; op hoogte maken de nieren meer EPO en het beenmerg meer rode bloedcellen.",
 "endHaak": "zuurstof aan hemoglobine, koolstofdioxide als waterstofcarbonaat",
 "minis": {"Hoofdstuk 1": "Hoe reist zuurstof door je bloed, en hoeveel geeft het af?", "Hoofdstuk 2": "Hoe gaat koolstofdioxide terug naar je longen?", "Hoofdstuk 3": "Wat meet je lichaam om je ademhaling te regelen?", "Hoofdstuk 4": "Wat gebeurt er bij koolmonoxide en op grote hoogte?", "Recap": "Wat dwong je om te ademen?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Je houdt je adem in. Ergens moet je wel ademen. Wat dwingt je daartoe?", "correct": 1, "explain": "Onthoud je keuze. Het antwoord zie je in hoofdstuk 3 en aan het eind."},
  "q06": {"q": "Je zit stil, in rust. Hoeveel zuurstof zit er nog in het bloed dat uit je lichaam terugkomt naar je hart?", "correct": 1, "explain": "In rust geeft hemoglobine gemiddeld maar ongeveer een kwart van zijn zuurstof af. Het bloed in je aders is dus nog voor ongeveer driekwart verzadigd: donkerder rood, maar niet leeg en niet blauw."},
  "q10": {"q": "Hoe reist het meeste koolstofdioxide terug naar de longen?", "correct": 1, "explain": "Ongeveer 70 % reageert, vooral in de rode bloedcellen, met water tot waterstofcarbonaat, dat opgelost in het plasma meereist. Ongeveer een vijfde bindt aan het eiwitdeel van hemoglobine (niet aan het ijzer), de rest is opgelost."},
  "q13": {"q": "In een werkende spier zijn veel waterstofionen, en het is er warmer. Laat hemoglobine daar bij dezelfde zuurstofspanning meer of minder zuurstof los?", "correct": 0, "explain": "Meer: als waterstofionen aan hemoglobine binden, laat hemoglobine de zuurstof makkelijker los. De zuurstofbindingscurve schuift naar rechts (Bohr-effect)."},
  "q18": {"q": "Koolmonoxide bezet steeds meer hemoglobine. Wat merk je daarvan?", "correct": 1, "explain": "Bijna niets. Koolstofdioxide wordt gewoon afgevoerd, en de zuurstofsensoren meten de opgeloste zuurstof, die normaal blijft. Je krijgt pas vage klachten (hoofdpijn, misselijkheid, sufheid) en kunt daarna bewusteloos raken. Daarom een koolmonoxidemelder."}
 },
 "glossary": [
  {"t": "hemoglobine", "d": "Eiwit in rode bloedcellen met vier ijzerplekken (heemgroepen); elke plek kan één zuurstofmolecuul binden."},
  {"t": "oxyhemoglobine", "d": "Hemoglobine met gebonden zuurstof; helderrood."},
  {"t": "zuurstofspanning", "d": "Maat voor hoeveel zuurstof er ergens is (in kPa); hoog in de longen (ongeveer 13 kPa), laag in werkende weefsels."},
  {"t": "verzadiging", "d": "Het percentage hemoglobine dat zuurstof draagt."},
  {"t": "waterstofcarbonaat", "d": "HCO₃⁻: de vorm waarin het meeste koolstofdioxide (ongeveer 70 %) opgelost in het bloedplasma reist."},
  {"t": "ademcentrum", "d": "Gebied in het verlengde merg (hersenstam) dat via zenuwen het middenrif en de tussenribspieren aanstuurt."},
  {"t": "chemoreceptoren", "d": "Sensoren die de samenstelling van het bloed meten: bij het ademcentrum (vooral koolstofdioxide/zuurgraad) en in de wand van halsslagader en aorta (ook zuurstof)."},
  {"t": "negatieve terugkoppeling", "d": "Het gevolg remt zijn eigen oorzaak: meer CO₂ → sneller ademen → CO₂ daalt."},
  {"t": "hyperventileren", "d": "Sneller en dieper ademen dan nodig; blaast veel koolstofdioxide weg. Vóór onder water zwemmen levensgevaarlijk."},
  {"t": "koolmonoxide", "d": "CO: kleur- en geurloos gas uit onvolledige verbranding; bindt ongeveer 200 keer sterker aan de ijzerplek van hemoglobine dan zuurstof."},
  {"t": "EPO", "d": "Erytropoëtine: hormoon uit de nieren dat het rode beenmerg meer rode bloedcellen laat maken."},
  {"t": "zuurstofbindingscurve", "d": "S-vormige grafiek van de verzadiging tegen de zuurstofspanning (Binas); vlak in de longen, steil in de weefsels.", "vwo": True},
  {"t": "koolzuuranhydrase", "d": "Enzym in rode bloedcellen dat CO₂ + H₂O ⇌ H₂CO₃ meer dan een miljoen keer versnelt.", "vwo": True},
  {"t": "Bohr-effect", "d": "Bij meer H⁺ (en CO₂, warmte) laat hemoglobine makkelijker zuurstof los: de curve schuift naar rechts.", "vwo": True}
 ],
 "sections": """
  <section><h2>Checkvragen</h2>
    <p class="meta">examenstijl · antwoorden ingeklapt</p>
    <div class="q"><b>1. Bloedvaten en koolmonoxide</b> <span class="pts">4 punten</span><p>Bij een onderzoek wordt in rust op drie plaatsen bloed afgenomen: uit de longslagader, uit de longader en uit een ader in de arm.</p><p>a. In welk van deze drie bloedvaten is de verzadiging van hemoglobine met zuurstof het hoogst? (1p)<br>b. Een leerling zegt: "In de ader in de arm zit geen zuurstof meer, want de weefsels hebben het opgebruikt." Leg uit dat dit niet klopt. (1p)<br>c. In een huis met een slecht afgestelde cv-ketel ademt een gezin urenlang koolmonoxide in. Hun ademfrequentie stijgt niet. Leg uit hoe het komt dat koolmonoxide gevaarlijk is en dat de ademhaling niet versnelt. (2p)</p>
      <details><summary>Antwoord</summary><p>a. De longader (1). Niet goed: longslagader; die voert zuurstofarm bloed van het hart naar de longen. b. In rust geeft hemoglobine maar ongeveer een kwart van de zuurstof af; het bloed in de ader is nog ongeveer 75 % verzadigd (1). c. Koolmonoxide bindt veel sterker dan zuurstof aan hemoglobine, waardoor er minder zuurstof naar de weefsels gaat (1); het ademcentrum reageert vooral op koolstofdioxide, en dat blijft normaal, dus de ademhaling versnelt niet (1).</p></details></div>
    <div class="q"><b>2. Vrijduiken</b> <span class="pts">4 punten</span><p>Een vrijduiker ademt vlak voor een duik een minuut lang snel en diep (hyperventileren). Daarna duikt hij zonder adem te halen zo lang mogelijk onder water.</p><p>a. In welke vorm en in welk deel van het bloed wordt het grootste deel van het koolstofdioxide vervoerd? (1p)<br>b. Duikinstructeurs verbieden hyperventileren voor een duik, omdat duikers dan bewusteloos kunnen raken zonder dat ze eerst de drang voelen om te ademen. Leg dit uit. Gebruik de begrippen ademcentrum, koolstofdioxide en hemoglobine. (3p)</p>
      <details><summary>Antwoord</summary><p>a. Als waterstofcarbonaat in het bloedplasma (1; beide nodig). b. Door hyperventileren daalt het koolstofdioxidegehalte van het bloed sterk (1); de hemoglobine was al bijna volledig verzadigd, dus er wordt nauwelijks extra zuurstof opgeslagen (1); het ademcentrum krijgt pas laat een prikkel, terwijl het zuurstofgehalte intussen zo ver daalt dat de hersenen te weinig zuurstof krijgen (1).</p></details></div>
    <div class="q"><b>3. Hoogtestage</b> <span class="pts">6 + 2 punten</span><p>Een wielrenner gaat drie weken op hoogtestage op 2500 meter. Bij hem worden in rust deze waarden gemeten (fictief, realistisch). Het hemoglobinegehalte is opgegeven per heemgroep: elke eenheid kan één zuurstofmolecuul binden.</p>
      <table><tr><th>meting</th><th>zeeniveau (dag 0)</th><th>2500 m, dag 2</th><th>2500 m, dag 21</th></tr>
      <tr><td>zuurstofspanning slagaderbloed (kPa)</td><td>12,5</td><td>8,5</td><td>9,0</td></tr>
      <tr><td>verzadiging hemoglobine (%)</td><td>97</td><td>91</td><td>93</td></tr>
      <tr><td>hemoglobine (mmol/L)</td><td>9,3</td><td>9,3</td><td>10,0</td></tr>
      <tr><td>hematocriet (%)</td><td>44</td><td>44</td><td>47</td></tr>
      <tr><td>EPO in bloedplasma (IE/L)</td><td>10</td><td>25</td><td>13</td></tr>
      <tr><td>koolstofdioxidespanning slagaderbloed (kPa)</td><td>5,3</td><td>4,6</td><td>4,4</td></tr>
      <tr><td>ademfrequentie in rust (per min)</td><td>12</td><td>15</td><td>16</td></tr></table>
      <p>a. Verklaar waarom de verzadiging van hemoglobine op dag 2 lager is dan op zeeniveau. (1p)<br>b. Leg met de tabel uit hoe het lichaam ervoor zorgt dat het hemoglobinegehalte op dag 21 hoger is. Noem het orgaan dat EPO maakt en het orgaan waarop EPO werkt. (2p)<br>c. Bereken hoeveel mmol zuurstof per liter bloed aan hemoglobine gebonden is op dag 2 en op dag 21. Leg met je berekening uit waarom wielrenners op hoogte trainen. (2p)<br>d. Op dag 2 ademt de wielrenner sneller, terwijl de koolstofdioxidespanning lager is dan op zeeniveau. Welke sensoren zorgen hier voor de snellere ademhaling, en waar liggen ze? (1p)</p>
      <p class="vwo-only">e. (vwo) De zuurstofspanning daalt van 12,5 naar 8,5 kPa (32 % lager), maar de verzadiging daalt maar van 97 naar 91 %. Verklaar dit met de zuurstofbindingscurve (Binas). (2p)</p>
      <details><summary>Antwoord</summary><p>a. Op hoogte is de luchtdruk en dus de zuurstofspanning lager, waardoor hemoglobine minder vol raakt (1). Niet goed: "er zit minder procent zuurstof in de lucht". b. De nieren maken bij zuurstoftekort meer EPO (10 → 25 IE/L) (1); EPO laat het rode beenmerg meer rode bloedcellen maken: hematocriet en hemoglobine stijgen (1). c. Dag 2: 9,3 × 0,91 = 8,5 mmol/L; dag 21: 10,0 × 0,93 = 9,3 mmol/L (1; zeeniveau 9,3 × 0,97 = 9,0). Na drie weken vervoert het bloed meer zuurstof dan op zeeniveau, dus krijgen de spieren bij terugkeer meer zuurstof: beter uithoudingsvermogen (1). d. Chemoreceptoren (zuurstofsensoren) in de wand van de halsslagader en de aorta (1).</p><p class="vwo-only">e. De curve is S-vormig; tussen ongeveer 8 en 13 kPa ligt het vlakke deel (1); daar geeft een grote daling van de zuurstofspanning maar een kleine daling van de verzadiging (1).</p></details></div>
    <div class="q vwo-only"><b>4. Bohr-effect in een werkende spier</b> <span class="vwo-badge">vwo</span> <span class="pts">7 punten</span><p>Onderzoekers meten de verzadiging van hemoglobine bij pH 7,4 (bloed in rust) en pH 7,2 (bloed in een hard werkende spier). Fictieve, realistische waarden:</p>
      <table><tr><th>zuurstofspanning (kPa)</th><th>2,0</th><th>4,0</th><th>5,3</th><th>8,0</th><th>13,3</th></tr><tr><td>verzadiging bij pH 7,4 (%)</td><td>24</td><td>57</td><td>75</td><td>89</td><td>97</td></tr><tr><td>verzadiging bij pH 7,2 (%)</td><td>16</td><td>45</td><td>61</td><td>83</td><td>95</td></tr></table>
      <p>Het bloed verlaat de longen bij 13,3 kPa en pH 7,4. In de haarvaten van een hard werkende spier is de zuurstofspanning 4,0 kPa en de pH 7,2.</p>
      <p>a. Bereken hoeveel procentpunt extra zuurstof de hemoglobine in de werkende spier afgeeft dankzij het Bohr-effect. (2p)<br>b. Leg uit hoe het enzym koolzuuranhydrase bijdraagt aan de lagere pH in het bloed van een werkende spier. Geef de reactie in woorden of als formule. (2p)<br>c. Een geneesmiddel remt koolzuuranhydrase. Welk gevolg heeft dit voor de zuurstofafgifte in een werkende spier? (1p)<br>d. In spiercellen zit myoglobine. Bij 2,0 kPa is myoglobine nog ongeveer 80 % verzadigd. Leg uit dat zuurstof in een werkende spier van hemoglobine naar myoglobine overgaat, en geef aan waar de bindingscurve van myoglobine ligt ten opzichte van die van hemoglobine. (2p)</p>
      <details><summary>Antwoord</summary><p>a. Met Bohr-effect: 97 − 45 = 52 procentpunt; zonder: 97 − 57 = 40 procentpunt (1); extra 52 − 40 = 12 procentpunt (1). b. Koolzuuranhydrase versnelt CO₂ + H₂O → H₂CO₃ → H⁺ + HCO₃⁻ (1); in een werkende spier ontstaat veel CO₂, dus snel veel H⁺: de pH daalt (1). c. Er ontstaan minder snel H⁺-ionen, de pH daalt minder, het Bohr-effect is kleiner, dus geeft hemoglobine minder zuurstof af (1). d. Myoglobine heeft bij dezelfde lage zuurstofspanning een hogere verzadiging, dus gaat zuurstof van hemoglobine naar myoglobine (1); de curve van myoglobine ligt links van (boven) die van hemoglobine (1).</p></details></div>
  </section>
  <section><h2>Voor de docent</h2>
    <h3>Hoe de film het uitlegt</h3>
    <table><tr><th>Hoofdstuk</th><th>Type · look</th><th>Kernbeeld</th></tr>
      <tr><td>Cold open</td><td>I · Macro</td><td>Een leerling in de klas houdt zittend zijn adem in; klok; vraag q02</td></tr>
      <tr><td>1 Zuurstof aan boord</td><td>B · Micro</td><td>Longblaasje; 98 % aan hemoglobine; rode bloedcel; hemoglobine met vier ijzerplekken; rode bloedcel reist van longblaasje (hoge zuurstofspanning) naar spiercel (lage); vraag q06; longslagader en longader. Vwo: zuurstofbindingscurve, vlak en steil deel</td></tr>
      <tr><td>2 Koolstofdioxide terug</td><td>B · Micro</td><td>Spiercel geeft CO₂ af; vraag q10; reactie in de rode bloedcel, HCO₃⁻ naar het plasma; cirkeldiagram 70/20/10; in de longen andersom. Vwo: koolzuuranhydrase, H⁺ op hemoglobine, vraag q13 en Bohr-effect</td></tr>
      <tr><td>3 Wie bepaalt hoe snel je ademt?</td><td>D · Schema</td><td>Hoofd met ademcentrum en chemoreceptoren, zenuwen naar de ademspieren; regelkring sensor/regelcentrum/effector; grafiek sporten; grafiek adem inhouden; grafiek hyperventileren met de drempels voor ademdrang en flauwvallen</td></tr>
      <tr><td>4 Als het gas niet klopt</td><td>I · Schema</td><td>Huis met cv-ketel, geiser en kachel; hemoglobine met koolmonoxide; vraag q18; meters (CO₂ normaal, opgeloste O₂ normaal, Hb-zuurstof laag); melder met handelingsadvies; berg met wielrenner, lucht op zeeniveau en 4000 m; nieren → EPO → beenmerg → rode bloedcellen</td></tr>
      <tr><td>Recap</td><td>Macro</td><td>Terug in de klas; de antwoordketen</td></tr>
    </table>
    <h3>Vereenvoudigingen</h3>
    <ul>
      <li>"Ongeveer een kwart afgegeven" en "70 / 20 / 10 %" zijn gemiddelden in rust; bronnen variëren (60–70 % waterstofcarbonaat, 20–30 % carbamino, 7–10 % opgelost).</li>
      <li>De chemoreceptoren bij het ademcentrum meten de zuurgraad van het hersenvocht, die door koolstofdioxide bepaald wordt; de film zegt "vooral koolstofdioxide".</li>
      <li>Koolmonoxide verschuift ook de bindingscurve naar links (de overgebleven zuurstof wordt moeilijker afgegeven); dat noemt de film niet.</li>
      <li>De zuurstofbindingscurve in de film is een model (Hill-vergelijking, P50 ≈ 3,6 kPa); vergelijk met Binas.</li>
      <li>De grafieken van adem inhouden en hyperventileren zijn schematisch, zonder echte meetwaarden.</li>
      <li>Chloride-shift en de rol van 2,3-BPG laat de film weg.</li>
    </ul>
    <h3>Leerdoelen en waar ze zitten</h3>
    <table><tr><th>Leerdoel</th><th>Niveau</th><th>Waar</th></tr>
      <tr><td>Zuurstoftransport door hemoglobine; opladen en afgeven bij hoge/lage zuurstofspanning</td><td>basis</td><td>H1, vraag q06, checkvraag 1</td></tr>
      <tr><td>Koolstofdioxidetransport, vooral als waterstofcarbonaat in het plasma</td><td>basis</td><td>H2, vraag q10, checkvraag 2a</td></tr>
      <tr><td>Regeling van de ademhaling: chemoreceptoren, ademcentrum, ademspieren, negatieve terugkoppeling; adem inhouden en hyperventileren</td><td>basis</td><td>H3, vraag q02, checkvragen 2b en 3d</td></tr>
      <tr><td>Koolmonoxidevergiftiging; aanpassing op hoogte met EPO</td><td>basis</td><td>H4, vraag q18, checkvragen 1c en 3a–c</td></tr>
      <tr><td>Zuurstofbindingscurve, koolzuuranhydrase, Bohr-effect</td><td>vwo</td><td>vwo-blokken H1 en H2, vraag q13, checkvragen 3e en 4</td></tr>
    </table>
    <h3>Pauzemomenten in de klas</h3>
    <ul><li>Na de cold open: laat leerlingen hun adem inhouden (zittend, niet onder water) en noteren wat ze denken dat de oorzaak is.</li><li>Na H2: laat ze de drie vervoersvormen van CO₂ met percentages opschrijven.</li><li>Na H3: bespreek waarom hyperventileren voor het zwemmen levensgevaarlijk is.</li><li>Na H4: check thuis of er een koolmonoxidemelder hangt.</li></ul>
  </section>
"""
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
