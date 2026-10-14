import json
film = {
 "slug": "3-uitscheiding-en-evenwicht", "hoofdstuk": "gaswisseling", "hoofdstukNaam": "Gaswisseling",
 "title": "Uitscheiding en evenwicht", "sub": "Hoe je lichaam afval kwijtraakt en alles in balans houdt",
 "puzzle": "Ruud zit drie keer per week vier uur aan een dialysemachine. In de dialysevloeistof zit wel glucose, maar geen ureum. Waarom?",
 "meta": "gaswisseling 3/3", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Gaswisseling en uitscheiding · film 3 van 3",
 "lead": "Uitscheiden is afval van je eigen stofwisseling en een overschot aan water en zouten kwijtraken: longen (koolstofdioxide), huid (zweet), lever (galkleurstof via de gal) en nieren (urine met ureum). De lever maakt ureum uit de stikstofgroep van aminozuren. Buffers, longen en nieren houden de pH van het bloed tussen 7,35 en 7,45. Bij nierfalen maakt dialyse het bloed schoon door diffusie door een vlies: geen ureum in de vloeistof, glucose en natrium ongeveer even veel als in gezond bloed.",
 "endHaak": "van hoog naar laag, door een dun vlies",
 "minis": {"Hoofdstuk 1": "Wat is uitscheiden, en wie maakt het ureum?", "Hoofdstuk 2": "Hoe blijft de pH van je bloed rond 7,4?", "Hoofdstuk 3": "Hoe maakt een machine je bloed schoon?", "Recap": "Waarom wel glucose, maar geen ureum?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "In de dialysevloeistof van Ruud zit wel glucose, maar geen ureum. Waarom?", "correct": 0, "explain": "Onthoud je keuze. Het antwoord zie je in hoofdstuk 3 en aan het eind."},
  "q05": {"q": "Je nieren maken urine met ureum. Welk orgaan maakt eigenlijk het ureum?", "correct": 1, "explain": "De lever. Overtollige aminozuren worden in de lever afgebroken; de stikstofgroep wordt ammoniak (giftig), en de lever zet die meteen om in ureum. De nieren scheiden het alleen uit."},
  "q09": {"q": "Bij een tekort aan insuline kan het bloed sterk verzuren. Hoe gaat zo iemand ademen?", "correct": 0, "explain": "Sneller en dieper. Zuurder bloed prikkelt de chemoreceptoren; het ademcentrum laat je meer koolstofdioxide uitademen, waardoor er ook zuur uit het bloed verdwijnt (negatieve terugkoppeling)."},
  "q16": {"q": "Wat werkt in een dialysefilter beter: bloed en vloeistof dezelfde kant op laten stromen, of tegen elkaar in?", "correct": 1, "explain": "Tegen elkaar in (tegenstroom). Dan is er over de hele lengte van de filter een concentratieverschil. Bij meestroom wordt het verschil onderweg steeds kleiner."},
  "q19": {"q": "Wie is meestal de beste levende donor voor een nier?", "correct": 1, "explain": "Een broer of zus. De eiwitten op de cellen (weefseleigenschappen) lijken bij familie vaker op die van jou, zodat de kans op afstoting kleiner is. Toch zijn levenslang afweerremmers nodig."}
 },
 "glossary": [
  {"t": "uitscheiding", "d": "Het lichaam raakt afvalstoffen van de eigen stofwisseling en een overschot aan water en zouten kwijt (longen, nieren, huid, lever via de gal). Ontlasting is vooral onverteerd voedsel en dus geen uitscheiding, behalve de galkleurstof erin."},
  {"t": "ureum", "d": "Afvalstof met stikstof; de lever maakt het uit ammoniak, de nieren scheiden het uit met de urine."},
  {"t": "ammoniak", "d": "Giftige stof die ontstaat als de lever de stikstofgroep van overtollige aminozuren afsplitst (deaminering)."},
  {"t": "galkleurstof (bilirubine)", "d": "Afbraakproduct van hemoglobine uit oude rode bloedcellen; de lever geeft het af met de gal; het kleurt de ontlasting bruin."},
  {"t": "inwendig milieu", "d": "De vloeistof rond je cellen (weefselvloeistof, met bloedplasma en lymfe) waarin water, zouten, glucose, temperatuur en pH binnen grenzen blijven."},
  {"t": "homeostase", "d": "Het binnen nauwe grenzen houden van het inwendig milieu, vaak met negatieve terugkoppeling."},
  {"t": "pH", "d": "Maat voor de zuurgraad: hoe zuurder, hoe lager. Bloed: 7,35 tot 7,45."},
  {"t": "buffer", "d": "Stof die waterstofionen opvangt (bijvoorbeeld waterstofcarbonaat en hemoglobine), zodat de pH bijna gelijk blijft."},
  {"t": "nierfalen", "d": "De nieren werken voor minder dan ongeveer 15 %; ureum, kalium, zuur en water hopen zich op."},
  {"t": "hemodialyse", "d": "Bloed stroomt door een filter met holle vezels; stoffen diffunderen door het vlies naar de dialysevloeistof. Bloed komt uit een shunt in de arm."},
  {"t": "ultrafiltratie", "d": "Water door een vlies persen met een drukverschil; zo haalt de dialyse het teveel aan water weg."},
  {"t": "afstoting", "d": "Het afweersysteem valt een donororgaan aan omdat de eiwitten op de cellen vreemd zijn; afweerremmers voorkomen dat."},
  {"t": "tegenstroom", "d": "Bloed en dialysevloeistof stromen in tegengestelde richting, zodat over de hele lengte een concentratieverschil blijft.", "vwo": True},
  {"t": "peritoneale dialyse", "d": "Dialyse met het eigen buikvlies als vlies; water gaat door osmose naar de vloeistof, dankzij veel glucose daarin.", "vwo": True}
 ],
 "sections": """
  <section><h2>Checkvragen</h2>
    <p class="meta">examenstijl · antwoorden ingeklapt</p>
    <div class="q"><b>1. Uitscheiding en ureum</b> <span class="pts">5 punten</span><p>Het lichaam raakt dagelijks onder andere de volgende stoffen kwijt: 1 cellulose (onverteerbare plantenvezel) · 2 bilirubine (galkleurstof) · 3 ureum · 4 koolstofdioxide.</p><p>a. Welke van deze stoffen worden in biologische zin uitgescheiden? Noem bij bilirubine ook het orgaan dat de stof afgeeft. (1p)</p>
      <p>Bij twee patiënten wordt bloed onderzocht. Patiënt P heeft een ernstige leverziekte, patiënt Q heeft nierfalen.</p>
      <table><tr><th>bloedwaarde</th><th>normaal</th><th>patiënt P (lever)</th><th>patiënt Q (nieren)</th></tr><tr><td>ureum (mmol/L)</td><td>2,5–7,5</td><td>1,8</td><td>28</td></tr><tr><td>ammoniak (µmol/L)</td><td>&lt; 50</td><td>120</td><td>35</td></tr></table>
      <p>b. Een bodybuilder eet elke dag veel extra eiwit en scheidt daardoor meer ureum uit. Beschrijf hoe uit de extra eiwitten ureum ontstaat, en in welk orgaan. (2p)<br>c. Verklaar de waarden van patiënt P. (1p)<br>d. Bij patiënt Q is het ureumgehalte afwijkend, maar het ammoniakgehalte normaal. Verklaar dit verschil met patiënt P. (1p)</p>
      <details><summary>Antwoord</summary><p>a. 2, 3 en 4; bilirubine via de lever (gal) (1). Niet goed: cellulose, die is nooit opgenomen. b. Overtollige aminozuren worden (omdat ze niet opgeslagen kunnen worden) in de lever gedeamineerd: de stikstofgroep wordt afgesplitst en er ontstaat ammoniak (1); de lever zet de giftige ammoniak om in ureum (1). c. De lever zet te weinig ammoniak om in ureum: ammoniak hoopt zich op en er wordt weinig ureum gevormd (1). d. Bij Q maakt de lever wel ureum, maar de nieren scheiden het niet uit; ureum hoopt zich op, ammoniak blijft normaal (1).</p></details></div>
    <div class="q"><b>2. Een dialysefilter</b> <span class="pts">8 punten</span><p>Ruud wordt gedialyseerd. Aan het begin van de behandeling worden de concentraties gemeten in het bloed dat de filter in en uit gaat, en in de dialysevloeistof die de filter in en uit gaat. Er stroomt 300 mL bloed en 500 mL dialysevloeistof per minuut door de filter. Neem aan dat er geen water uit het bloed wordt geperst.</p>
      <table><tr><th>stof (mmol/L)</th><th>normaal in bloed</th><th>bloed in</th><th>bloed uit</th><th>vloeistof in (vers)</th><th>vloeistof uit</th></tr>
      <tr><td>ureum</td><td>2,5–7,5</td><td>25,0</td><td>8,0</td><td>0</td><td>10,2</td></tr>
      <tr><td>glucose</td><td>4,0–7,8</td><td>7,0</td><td>6,1</td><td>5,5</td><td>6,0</td></tr>
      <tr><td>natrium</td><td>135–145</td><td>139</td><td>139</td><td>139</td><td>139</td></tr>
      <tr><td>kalium</td><td>3,5–5,0</td><td>6,0</td><td>3,6</td><td>2,0</td><td>3,4</td></tr>
      <tr><td>waterstofcarbonaat</td><td>22–26</td><td>18</td><td>28</td><td>34</td><td>28</td></tr></table>
      <p>a. Bereken hoeveel mmol ureum er per minuut uit het bloed van Ruud wordt verwijderd. (2p)<br>b. Een leerling vermenigvuldigt de uitkomst van a met 240 (vier uur) en zegt: "Zoveel ureum verliest Ruud per behandeling." Leg uit waarom de werkelijke hoeveelheid kleiner is. (1p)<br>c. De dialysevloeistof bevat evenveel natrium als het bloed, maar minder kalium dan normaal in bloed zit. Verklaar beide keuzes. (2p)<br>d. Verklaar waarom de glucoseconcentratie in het bloed in de filter iets daalt. (1p)<br>e. De concentratie waterstofcarbonaat in het bloed stijgt in de filter. Verklaar deze stijging en leg uit waarom die gunstig is voor Ruud. (2p)</p>
      <details><summary>Antwoord</summary><p>a. (25,0 − 8,0) × 0,300 (1) = 5,1 mmol per minuut (1). b. Tijdens de behandeling daalt de ureumconcentratie in het bloed, dus wordt het concentratieverschil kleiner en diffundeert er per minuut minder ureum (1). c. Natrium: Ruud heeft een normaal natriumgehalte; zonder concentratieverschil diffundeert er netto geen natrium en blijft het op peil (1). Kalium: Ruud heeft te veel kalium; door de lage concentratie in de vloeistof diffundeert kalium uit het bloed tot ongeveer een normale waarde (1). d. De glucoseconcentratie in het bloed (7,0) is hoger dan in de vloeistof (5,5), dus diffundeert er netto een beetje glucose naar de vloeistof (1). e. De concentratie waterstofcarbonaat in de vloeistof is hoger dan in het bloed, dus diffundeert het het bloed in (1); Ruuds bloed is te zuur; waterstofcarbonaat bindt H⁺ (buffer), zodat de pH stijgt (1).</p></details></div>
    <div class="q"><b>3. Twee keer zuur bloed</b> <span class="pts">4 + 3 punten</span><p>Op de spoedeisende hulp komen twee patiënten binnen. Patiënt A heeft diabetes type 1 en heeft dagenlang geen insuline gespoten. Zijn cellen breken veel vet af; daarbij ontstaan zure ketonen. Patiënt B heeft al jaren de longziekte COPD: hij ademt moeilijk uit. Van beiden wordt slagaderbloed onderzocht.</p>
      <table><tr><th>meting</th><th>gezond</th><th>patiënt A (diabetes)</th><th>patiënt B (COPD)</th></tr><tr><td>pH</td><td>7,35–7,45</td><td>7,16</td><td>7,34</td></tr><tr><td>koolstofdioxidespanning (kPa)</td><td>4,7–6,0</td><td>3,0</td><td>8,0</td></tr><tr><td>waterstofcarbonaat (mmol/L)</td><td>22–26</td><td>8</td><td>32</td></tr><tr><td>ademfrequentie (per minuut)</td><td>12–16</td><td>30 (diep)</td><td>22 (oppervlakkig)</td></tr></table>
      <p>a. Leg uit hoe het komt dat patiënt A snel en diep ademt, en dat daardoor zijn koolstofdioxidespanning lager is dan normaal. Gebruik de begrippen chemoreceptoren en ademcentrum. (2p)<br>b. Verklaar waarom de concentratie waterstofcarbonaat bij patiënt A zo laag is. (1p)<br>c. Is de urine van patiënt A zuurder of minder zuur dan normaal? Leg uit. (1p)</p>
      <p class="vwo-only">d. (vwo) Bij patiënt B is de koolstofdioxidespanning sterk verhoogd, maar de pH maar een klein beetje te laag. Leg met het evenwicht CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻ uit waarom een hoge koolstofdioxidespanning de pH verlaagt, en hoe de nieren de pH van patiënt B dicht bij normaal houden. (2p)<br>e. (vwo) Patiënt B krijgt een longontsteking. Binnen een paar uur stijgt zijn koolstofdioxidespanning naar 9,5 kPa en daalt zijn pH naar 7,28. Leg uit waarom zijn lichaam deze plotselinge daling niet opvangt. (1p)</p>
      <details><summary>Antwoord</summary><p>a. De vele H⁺ (lage pH) prikkelen chemoreceptoren, die het ademcentrum aanzetten tot sneller en dieper ademen (1); daardoor wordt meer koolstofdioxide uitgeademd en daalt de koolstofdioxidespanning (1). b. Waterstofcarbonaat bindt als buffer de H⁺ uit de ketonen en wordt daarbij verbruikt (1). c. Zuurder: de nieren scheiden extra H⁺ uit met de urine (1).</p><p class="vwo-only">d. Meer CO₂ verschuift het evenwicht naar rechts: meer H⁺, lagere pH (1); de nieren scheiden in de loop van dagen meer H⁺ uit en houden meer waterstofcarbonaat vast (daarom is HCO₃⁻ verhoogd), zodat H⁺ wordt weggevangen (1). e. De nieren passen zich pas na uren tot dagen aan, en de longen kunnen niet meer CO₂ uitademen omdat daar het probleem zit (1).</p></details></div>
    <div class="q vwo-only"><b>4. Tegenstroom en buikvliesdialyse</b> <span class="vwo-badge">vwo</span> <span class="pts">8 punten</span><p>Gebruik de ureumwaarden van checkvraag 2. Bloed (300 mL/min) en dialysevloeistof (500 mL/min) stromen in tegengestelde richting door de filter: aan kant 1 gaat het bloed erin (25,0 mmol/L) en de vloeistof eruit (10,2 mmol/L); aan kant 2 gaat het bloed eruit (8,0 mmol/L) en de verse vloeistof erin (0 mmol/L).</p>
      <p>a. Laat met een berekening zien dat het bloed per minuut evenveel ureum verliest als de vloeistof opneemt. (1p)<br>b. Leg met de gegevens uit dat deze uitkomsten bij meestroom onmogelijk zouden zijn. (2p)<br>c. Bereken de laagste ureumconcentratie die het bloed bij meestroom zou kunnen bereiken, met dezelfde stroomsnelheden en een oneindig lange filter. (2p)</p>
      <p>Bij peritoneale dialyse laat de patiënt 2 liter dialysevloeistof in zijn buikholte lopen en vervangt die na vier uur. De vloeistof bevat geen ureum, maar wel 75 mmol/L glucose (bloed ongeveer 5,5 mmol/L). Er wordt geen druk op de vloeistof gezet.</p>
      <p>d. Leg uit hoe bij peritoneale dialyse overtollig water uit het bloed wordt verwijderd, en waarom dat na een paar uur steeds minder wordt. (2p)<br>e. Leg uit waarom de vloeistof na vier uur moet worden vervangen. (1p)</p>
      <details><summary>Antwoord</summary><p>a. Bloed: 0,300 × (25,0 − 8,0) = 5,1 mmol/min; vloeistof: 0,500 × (10,2 − 0) = 5,1 mmol/min (1). b. Bij meestroom verlaten bloed en vloeistof de filter aan dezelfde kant en diffundeert ureum alleen van hoog naar laag, dus kan het bloed er nooit met een lagere concentratie uitkomen dan de vloeistof (1); hier komt het bloed eruit met 8,0 mmol/L, lager dan de vloeistof (10,2 mmol/L): dat kan alleen bij tegenstroom (1). c. Aan het eind zijn de concentraties gelijk (c): 0,300 × 25,0 = 0,300c + 0,500c (1); c = 7,5 / 0,800 = 9,4 mmol/L (1). d. Door de hoge glucoseconcentratie is de osmotische waarde van de vloeistof hoger dan die van het bloed, dus gaat er water door osmose uit het bloed naar de buikholte (1); glucose diffundeert langzaam het bloed in, waardoor het verschil kleiner wordt en er steeds minder water bij komt (1). e. De ureumconcentratie in de vloeistof stijgt tot bijna die van het bloed; het verschil verdwijnt en de diffusie stopt; verse vloeistof maakt het verschil weer groot (1).</p></details></div>
  </section>
  <section><h2>Voor de docent</h2>
    <h3>Hoe de film het uitlegt</h3>
    <table><tr><th>Hoofdstuk</th><th>Type · look</th><th>Kernbeeld</th></tr>
      <tr><td>Cold open</td><td>I · Macro</td><td>Ruud aan de dialysemachine; inzoom op het vlies met ureum en glucose; vraag q02</td></tr>
      <tr><td>1 Wat moet eruit?</td><td>B · Schema</td><td>Lichaam met darm (ontlasting), longen, huid, lever (galkleurstof) en nieren; vraag q05; levercel: aminozuur → stikstofgroep eraf → ammoniak → ureum → nieren</td></tr>
      <tr><td>2 Alles binnen grenzen</td><td>B + D · Schema</td><td>Cel in weefselvloeistof met vijf meters; pH-schaal met 7,35–7,45; zuurbronnen, H⁺ en buffers; vraag q09 (verzuring bij insulinetekort); regelkring pH; longen snel, nieren langzaam. Vwo: evenwicht CO₂/H₂CO₃/HCO₃⁻ en cel van een nierbuisje</td></tr>
      <tr><td>3 Als de nieren stoppen</td><td>I · Schema</td><td>Nierfalen; arm met shunt, filter, doorsnede met holle vezels, vlies met poriën; concentratiebalken bloed/vloeistof per stof met diffusierichting; drinkbeperking; ultrafiltratie. Vwo: vraag q16, concentratieprofielen tegenstroom/meestroom, peritoneale dialyse. Transplantatie: vraag q19, afstoting en afweerremmers</td></tr>
      <tr><td>Recap</td><td>Macro</td><td>Ruud aan de machine met de antwoordketen</td></tr>
    </table>
    <h3>Vereenvoudigingen</h3>
    <ul>
      <li>De ureumvorming (ornithinecyclus, vwo: Binas) is in de film één stap: ammoniak → ureum. Twee ammoniak en één CO₂ worden met energie omgezet in één ureum.</li>
      <li>De concentratiebalken in hoofdstuk 3 zijn schematisch; de echte waarden staan in checkvraag 2.</li>
      <li>"Even veel glucose als in gezond bloed": in de praktijk ongeveer 5,5 mmol/L; bij een hogere bloedglucose diffundeert er netto een beetje glucose weg (checkvraag 2d).</li>
      <li>Bij hemodialyse ontstaat het drukverschil voor ultrafiltratie in de praktijk meestal door onderdruk aan de kant van de vloeistof.</li>
      <li>Ketonen ontstaan bij insulinetekort in de lever uit de afbraak van vetzuren; de film zegt alleen dat cellen vet verbranden en dat er zure stoffen ontstaan.</li>
      <li>Vochtbeperking hangt af van de eigen urineproductie; "een halve tot een hele liter" is een gangbare richtlijn.</li>
    </ul>
    <h3>Leerdoelen en waar ze zitten</h3>
    <table><tr><th>Leerdoel</th><th>Niveau</th><th>Waar</th></tr>
      <tr><td>Uitscheiding tegenover ontlasting; uitscheidingsorganen</td><td>basis</td><td>H1, checkvraag 1a</td></tr>
      <tr><td>Ureumvorming in de lever</td><td>basis</td><td>H1, vraag q05, checkvraag 1b–d</td></tr>
      <tr><td>Homeostase, pH, buffers, longen en nieren</td><td>basis</td><td>H2, vraag q09, checkvraag 3a–c</td></tr>
      <tr><td>Nierfalen, hemodialyse, drinkbeperking, transplantatie</td><td>basis</td><td>H3, vragen q02 en q19, checkvraag 2</td></tr>
      <tr><td>Evenwicht CO₂/HCO₃⁻; tegenstroom; peritoneale dialyse</td><td>vwo</td><td>vwo-blokken H2 en H3, vraag q16, checkvragen 3d–e en 4</td></tr>
    </table>
    <h3>Pauzemomenten in de klas</h3>
    <ul><li>Na H1: laat leerlingen per orgaan opschrijven wat het uitscheidt, en waarom poep (bijna) geen uitscheiding is.</li><li>Na H2: laat ze de regelkring voor de pH tekenen, naast die voor CO₂ uit de vorige film.</li><li>Na H3: laat ze de concentratiebalken voor een "dialysevloeistof van gewoon water" voorspellen.</li></ul>
  </section>
"""
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
