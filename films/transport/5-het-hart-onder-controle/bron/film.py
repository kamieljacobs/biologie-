import json
film = {
 "slug": "5-het-hart-onder-controle", "hoofdstuk": "transport", "hoofdstukNaam": "Transport",
 "title": "Het hart onder controle", "sub": "Harder pompen, en het bloed naar waar het nodig is",
 "puzzle": "In je sporthal hangt een AED. Een hart dat trilt, pompt niet. Hoe kan een stroomstoot zo'n hart weer laten kloppen?",
 "meta": "transport 5/6", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Transport · film 5 van 6",
 "lead": "Bij inspanning pompt je hart vier tot vijf keer zo veel bloed rond: het hartminuutvolume (hartfrequentie × slagvolume) stijgt doordat je hart sneller én krachtiger klopt en beter gevuld wordt. De sinusknoop is de eigen gangmaker; het orthosympathische zenuwstelsel en adrenaline zetten het tempo hoger, het parasympathische lager. Glad spierweefsel in de wand van kleine slagaders verdeelt het bloed: vaatverwijding in werkende spieren, vaatvernauwing in darmen en nieren. Daarna: wat er misgaat bij atherosclerose en een hartinfarct, en wat een AED doet bij kamerfibrilleren.",
 "endHaak": "de schok stopt het trillen, de sinusknoop neemt het weer over",
 "minis": {"Hoofdstuk 1": "Hoe pompt je hart vier keer zo veel bloed rond?", "Hoofdstuk 2": "Welke organen krijgen het extra bloed?", "Hoofdstuk 3": "Wat gebeurt er als een slagader dichtgaat?", "Hoofdstuk 4": "Wat doe je als een hart trilt in plaats van pompt?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Een AED geeft een stroomstoot door een hart dat trilt. Hoe kan dat helpen?", "correct": 1, "explain": "Onthoud je keuze. Het antwoord komt in hoofdstuk 4."},
  "q06": {"q": "Bij een sprint kan je hartminuutvolume vier tot vijf keer zo groot worden. Hoe doet je hart dat?", "correct": 1, "explain": "Van 70 naar 190 slagen per minuut is nog geen drie keer zo veel. Voor vier keer zo veel bloed moet er ook per slag meer uit: het slagvolume stijgt ook."},
  "q11": {"q": "Bij een sprint pompt je hart vier keer zo veel bloed rond. Krijgen al je organen dan vier keer zo veel?", "correct": 1, "explain": "Nee. Kleine slagaders in werkende spieren verwijden, die in je darmen en nieren vernauwen. De spieren krijgen het meeste, de darmen minder, de hersenen ongeveer even veel."}
 },
 "glossary": [
  {"t": "hartfrequentie", "d": "Aantal hartslagen per minuut; in rust ongeveer 70, bij een jongere maximaal rond 190."},
  {"t": "slagvolume", "d": "Hoeveelheid bloed die één kamer per slag wegpompt; in rust ongeveer 70 ml, bij inspanning tot ongeveer 110–120 ml."},
  {"t": "hartminuutvolume", "d": "Hoeveelheid bloed die het hart per minuut wegpompt: hartfrequentie × slagvolume. In rust ongeveer 5 liter, bij zware inspanning 20 liter of meer."},
  {"t": "sinusknoop", "d": "Groepje cellen in de wand van de rechterboezem dat uit zichzelf het startsein voor elke slag geeft: de eigen gangmaker (pacemaker) van het hart."},
  {"t": "autonoom zenuwstelsel", "d": "Deel van het zenuwstelsel dat organen regelt zonder dat je het wilt: het orthosympathische en het parasympathische deel."},
  {"t": "orthosympathisch zenuwstelsel", "d": "Deel van het autonome zenuwstelsel dat actief is bij inspanning en spanning: hart sneller en krachtiger, minder bloed naar darmen en nieren."},
  {"t": "parasympathisch zenuwstelsel", "d": "Deel van het autonome zenuwstelsel dat actief is in rust: het hart klopt rustiger."},
  {"t": "adrenaline", "d": "Hormoon uit de bijnieren (bijniermerg) bij spanning of inspanning; laat het hart sneller en krachtiger kloppen."},
  {"t": "glad spierweefsel", "d": "Spierweefsel dat je niet bewust aanstuurt; ligt als een ring in de wand van kleine slagaders."},
  {"t": "vaatvernauwing", "d": "Het glad spierweefsel in de vaatwand trekt samen: het vat wordt nauwer en er stroomt minder bloed door."},
  {"t": "vaatverwijding", "d": "Het glad spierweefsel in de vaatwand ontspant: het vat wordt wijder en er stroomt meer bloed door."},
  {"t": "kransslagaders", "d": "Slagaders die aan het begin van de aorta aftakken en de hartspier van zuurstof en voedingsstoffen voorzien."},
  {"t": "plaque", "d": "Bult in de wand van een slagader met vet, cholesterol en ontstekingscellen."},
  {"t": "atherosclerose (aderverkalking)", "d": "Slagaders worden nauwer en stugger door plaques in de wand. Ondanks de naam aderverkalking gaat het om slagaders."},
  {"t": "hartinfarct", "d": "Een stuk hartspier sterft af doordat een kransslagader is afgesloten, meestal door een stolsel op een gescheurde plaque."},
  {"t": "herseninfarct", "d": "Een stuk hersenweefsel sterft af doordat een bloedvat in de hersenen is afgesloten, bijvoorbeeld door een losgeraakt stolsel; een vorm van beroerte."},
  {"t": "kamerfibrilleren", "d": "De spiercellen van de kamers trekken ongecoördineerd samen: het hart trilt, maar pompt niet. Dat is een hartstilstand."},
  {"t": "reanimatie", "d": "Hartmassage (100–120 keer per minuut, 5–6 cm diep) en beademing, zodat er bloed blijft rondgaan tot de AED er is."},
  {"t": "AED", "d": "Automatische externe defibrillator: meet het ritme en geeft alleen een stroomstoot als die kan helpen. De schok prikkelt alle hartspiercellen tegelijk, zodat het trillen stopt."},
  {"t": "nervus vagus", "d": "De parasympathische zenuw naar het hart; remt de sinusknoop. In rust overheerst die rem.", "vwo": True},
  {"t": "AV-knoop", "d": "Geeft het startsein van de boezems met een kleine vertraging door aan de kamers.", "vwo": True},
  {"t": "drukreceptoren (baroreceptoren)", "d": "Zintuigcellen in de wand van de aortaboog en de halsslagaders die meten hoe ver de wand uitrekt.", "vwo": True},
  {"t": "verlengde merg", "d": "Deel van de hersenstam met het regelcentrum voor hartslag en bloeddruk.", "vwo": True},
  {"t": "negatieve terugkoppeling", "d": "Het gevolg remt de oorzaak; zo blijft een waarde zoals de bloeddruk vrij constant.", "vwo": True},
  {"t": "homeostase", "d": "Het constant houden van het inwendig milieu, zoals de bloeddruk.", "vwo": True}
 ],
 "sections": """
  <section><h2>Checkvragen</h2>
    <p class="meta">examenstijl · antwoorden ingeklapt</p>
    <div class="q"><b>1. Volleybaltraining</b> <span class="pts">2 punten</span><p>Bij Fenna (17) wordt in rust en tijdens een zware training het volgende gemeten:</p>
      <table><tr><th></th><th>Rust</th><th>Training</th></tr><tr><td>Hartfrequentie (slagen/min)</td><td>65</td><td>175</td></tr><tr><td>Slagvolume (ml)</td><td>75</td><td>115</td></tr></table>
      <p>Bereken met hoeveel procent het hartminuutvolume van Fenna tijdens de training is toegenomen ten opzichte van de rust.</p>
      <details><summary>Antwoord</summary><p>Rust: 65 × 75 = 4875 ml/min; training: 175 × 115 = 20 125 ml/min (1). Toename = (20 125 − 4875) / 4875 × 100 % ≈ 313 % (1).</p></details></div>
    <div class="q"><b>2. Zenuwstelsel en darmen</b> <span class="pts">2 punten</span><p>Welk deel van het autonome zenuwstelsel is tijdens de training het meest actief, en wat is het effect daarvan op de diameter van de kleine slagaders in de darmwand?</p>
      <table><tr><th></th><th>meest actief</th><th>kleine slagaders in de darmwand</th></tr><tr><td>A</td><td>orthosympathisch</td><td>worden nauwer</td></tr><tr><td>B</td><td>orthosympathisch</td><td>worden wijder</td></tr><tr><td>C</td><td>parasympathisch</td><td>worden nauwer</td></tr><tr><td>D</td><td>parasympathisch</td><td>worden wijder</td></tr></table>
      <details><summary>Antwoord</summary><p>A (2).</p></details></div>
    <div class="q"><b>3. AED</b> <span class="pts">2 punten</span><p>Bij kamerfibrilleren trekken de hartspiercellen van de kamers ongecoördineerd samen. Een AED geeft een stroomstoot door het hart. Een leerling zegt: "De AED geeft het stilstaande hart een zet, zodat het weer gaat kloppen." Leg uit waarom deze uitspraak niet juist is, en beschrijf wat de stroomstoot wél doet.</p>
      <details><summary>Antwoord</summary><p>Het hart staat niet stil maar trilt: de cellen trekken ongecoördineerd samen (1). De stroomstoot prikkelt alle hartspiercellen tegelijk, waardoor het trillen stopt en de sinusknoop het ritme weer kan bepalen (1).</p></details></div>
    <div class="q vwo-only"><b>4. Getransplanteerd hart</b> <span class="vwo-badge">vwo</span> <span class="pts">3 punten</span><p>Bij een harttransplantatie worden de zenuwen naar het hart doorgesneden. Na de transplantatie is de hartfrequentie in rust ongeveer 100 slagen per minuut, hoger dan vóór de operatie. Bij het begin van een inspanning stijgt de hartfrequentie pas na enkele minuten. Verklaar beide waarnemingen.</p>
      <details><summary>Antwoord</summary><p>In rust remt de parasympathische nervus vagus normaal de sinusknoop; die remming valt weg, waardoor de sinusknoop zijn eigen, hogere frequentie aanhoudt (1). Orthosympathische zenuwen kunnen de sinusknoop niet meer direct versnellen (1). De versnelling komt pas als het bijniermerg adrenaline afgeeft en die via het bloed het hart bereikt, en dat kost tijd (1).</p></details></div>
  </section>
  <section><h2>Voor de docent</h2>
    <h3>Hoe de film het uitlegt</h3>
    <table><tr><th>Hoofdstuk</th><th>Type · look</th><th>Kernbeeld</th></tr>
      <tr><td>Cold open</td><td>D · Macro</td><td>Sporthal met een leerling die basketbalt en het groene AED-kastje aan de muur; zoomcirkel op een hart dat trilt; vraag q02 (antwoord pas in H4)</td></tr>
      <tr><td>1 Harder pompen</td><td>D · Schema</td><td>Hart met hartslagmeter en een maatbeker die per minuut volloopt, rust en sprint naast elkaar; vraag q06 met rekensom (70 → 190 is minder dan ×3); slagvolume → bloeddruk; sinusknoop met het autonome zenuwstelsel (twee pijlen: + en −) en adrenaline. Vwo: nervus vagus als rem, getransplanteerd hart, AV-knoop</td></tr>
      <tr><td>2 Bloed naar waar het nodig is</td><td>D · Schema</td><td>Vraag q11; kleine slagader met een ring van glad spierweefsel die nauwer en wijder wordt; lichaam met de bloedstroom per orgaan als breedte van de stroom (rust en sprint). Vwo: drukreceptoren, verlengde merg, regelkring met negatieve terugkoppeling</td></tr>
      <tr><td>3 Een vat dat dichtgaat</td><td>I · Schema</td><td>Hart met kransslagaders; slagaderwand in doorsnede waarin een plaque groeit en scheurt; stolsel sluit de tak af en een stuk hartspier wordt grijs; risicofactoren</td></tr>
      <tr><td>4 Een hart dat trilt</td><td>I · Schema</td><td>Chaotische prikkels in de kamers en een vlak, rommelig ECG; persoon op de grond, 112, AED, handen op de borst in het tempo 100–120/min; de schok legt alles stil, de sinusknoop neemt het ritme weer over</td></tr>
      <tr><td>Recap</td><td>Macro</td><td>Terug in de sporthal; de leerling speelt verder</td></tr>
    </table>
    <h3>Vereenvoudigingen</h3>
    <ul>
      <li>Het hart is getekend als vooraanzicht in doorsnede, niet op schaal; de kransslagaders zijn op de doorsnede gelegd.</li>
      <li>"Vier tot vijf keer zo veel": bij een gezonde jongere ongeveer 190 × 110–120 ml ≈ 20–25 liter per minuut; topduursporters tot ongeveer 35 liter (niet genoemd).</li>
      <li>De bloedverdeling is schematisch: bij zware inspanning ongeveer 80 % naar de spieren; de hersenen houden ongeveer 0,75 liter per minuut. Dat de hersenvaten hun doorbloeding zelf constant houden heet autoregulatie (niet genoemd).</li>
      <li>Vaatverwijding in werkende spieren komt vooral door lokale stoffen (weinig zuurstof, veel CO₂ en zuur); de vernauwing in darmen en nieren door het orthosympathische zenuwstelsel en adrenaline. Dat adrenaline in spiervaten ook kan verwijden is weggelaten.</li>
      <li>Het ECG van kamerfibrilleren en het ECG-model zijn schematisch, geen metingen.</li>
      <li>Reanimatie volgens de richtlijnen van de NRR (2025): 100–120 compressies per minuut, 5–6 cm diep, 30:2, zo snel mogelijk een AED. De beademing wordt in de film niet uitgelegd.</li>
    </ul>
    <h3>Leerdoelen en waar ze zitten</h3>
    <table><tr><th>Leerdoel</th><th>Niveau</th><th>Waar</th></tr>
      <tr><td>Hartminuutvolume = hartfrequentie × slagvolume; rust en inspanning; slagvolume → bloeddruk</td><td>basis</td><td>H1, vraag q06, checkvraag 1</td></tr>
      <tr><td>Sinusknoop als eigen gangmaker; orthosympathisch, parasympathisch en adrenaline; betere vulling</td><td>basis</td><td>H1, checkvraag 2</td></tr>
      <tr><td>Bloedverdeling: glad spierweefsel, vaatverwijding en vaatvernauwing; hersenen houden even veel</td><td>basis</td><td>H2, vraag q11, checkvraag 2</td></tr>
      <tr><td>Atherosclerose, hartinfarct, herseninfarct, risicofactoren</td><td>basis</td><td>H3</td></tr>
      <tr><td>Kamerfibrilleren, herkennen, 112, reanimatie, AED</td><td>basis</td><td>Cold open, H4, vraag q02, checkvraag 3</td></tr>
      <tr><td>Nervus vagus, getransplanteerd hart, AV-knoop; drukreceptoren, verlengde merg, negatieve terugkoppeling, homeostase</td><td>vwo</td><td>vwo-blokken H1 en H2, checkvraag 4</td></tr>
    </table>
    <h3>Pauzemomenten in de klas</h3>
    <ul><li>Na H1: laat leerlingen checkvraag 1 uitrekenen.</li><li>Na H2: laat ze voorspellen wat er met de doorbloeding van de huid gebeurt als je het koud hebt.</li><li>Na H4: oefen het herkennen en de stappen (reageert niet, ademt niet normaal → 112, AED laten halen, drukken). Wijs het AED-kastje in de eigen sporthal aan.</li></ul>
  </section>
"""
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
