import json
film = {
 "slug": "2-buizen-onder-druk", "hoofdstuk": "transport", "hoofdstukNaam": "Transport",
 "title": "Buizen onder druk", "sub": "Hoe je bloedvaten het bloed vervoeren",
 "puzzle": "Je staat een half uur stil op een warme dag, en een klasgenoot valt flauw. Wat ging er mis?",
 "meta": "transport 2/6", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Transport · film 2 van 6",
 "lead": "Een drukverschil laat je bloed stromen: van hoge druk bij de linkerkamer naar bijna nul bij de rechterboezem. Slagaders vangen met hun dikke, elastische wand de hoge druk van elke hartslag op; in de kleinste slagaders zakt de druk het sterkst. In de haarvaten, met een wand van één cellaag, stroomt het bloed het langzaamst, omdat de totale doorsnede daar het grootst is. Aders voeren het bloed bij lage druk terug, met kleppen en de spierpomp. Daarom kun je flauwvallen als je lang stilstaat in de warmte.",
 "endHaak": "flauwvallen: te weinig bloed terug naar het hart",
 "minis": {"Hoofdstuk 1": "Waarin verschillen slagaders, haarvaten en aders?", "Hoofdstuk 2": "Hoe hoog is de druk, en waar stroomt het bloed het langzaamst?", "Hoofdstuk 3": "Hoe komt het bloed bij lage druk terug naar je hart?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Een klasgenoot valt flauw na een half uur stilstaan op een warme dag. Wat ging er mis?", "correct": 1, "explain": "Onthoud je keuze. Het antwoord komt in hoofdstuk 3."},
  "q11": {"q": "Waar stroomt het bloed het langzaamst?", "correct": 1, "explain": "In de haarvaten. Eén haarvat is smal, maar alle haarvaten samen hebben een veel grotere doorsnede dan de aorta. Daardoor stroomt het bloed er langzaam."}
 },
 "glossary": [
  {"t": "slagader", "d": "Bloedvat dat bloed van het hart af voert. Dikke, stevige wand met elastische vezels en een spierlaag; hoge druk; hier voel je de polsslag."},
  {"t": "aorta", "d": "De grote slagader die uit de linkerkamer vertrekt; begin van de grote bloedsomloop."},
  {"t": "haarvat", "d": "Kleinste bloedvat (5–10 µm), met een wand van één laag dunne cellen. Hier worden stoffen uitgewisseld tussen het bloed en de cellen."},
  {"t": "ader", "d": "Bloedvat dat bloed naar het hart toe voert (ook als het zuurstofrijk is, zoals de longader). Dunne, slappe wand; lage druk; vaak kleppen."},
  {"t": "kleppen in aders", "d": "Zakjes in de aderwand die het bloed maar één kant op laten: naar het hart. Zakt het bloed terug, dan sluiten ze."},
  {"t": "spierpomp", "d": "Skeletspieren (zoals de kuitspieren) knijpen de aders samen; met de kleppen duwt dat het bloed naar het hart."},
  {"t": "poortader", "d": "Ader van de haarvaten in de darmen naar een tweede haarvatennet in de lever: darm → poortader → lever → leverader → onderste holle ader."},
  {"t": "systole", "d": "Het samentrekken van de kamers; de druk in de slagaders is dan het hoogst."},
  {"t": "diastole", "d": "Het ontspannen van de kamers; de druk in de slagaders zakt, maar niet tot nul."},
  {"t": "bovendruk", "d": "De hoogste druk in de slagaders, tijdens de systole (in rust ongeveer 120 mmHg)."},
  {"t": "onderdruk", "d": "De laagste druk in de slagaders, tijdens de diastole (in rust ongeveer 80 mmHg)."},
  {"t": "bloeddrukmeter", "d": "Band om de bovenarm die de slagader dichtknijpt en langzaam loslaat. Eerste bloed erdoor = bovendruk; weer vrij stromen = onderdruk."},
  {"t": "polsslag", "d": "Drukgolf in de wand van een slagader bij elke hartslag; geen bloed dat langs stroomt."},
  {"t": "totale doorsnede", "d": "De doorsneden van alle vaten van één soort bij elkaar opgeteld. Bij de haarvaten ongeveer 1000 × die van de aorta; daarom stroomt het bloed daar het langzaamst."},
  {"t": "flauwvallen (na lang staan)", "d": "Te weinig bloed terug naar het hart → minder bloed per slag → lagere druk naar het hoofd → te weinig zuurstof in de hersenen."},
  {"t": "volume per seconde", "d": "Doorsnede × snelheid; is overal in het traject even groot.", "vwo": True},
  {"t": "windketelwerking", "d": "De elastische slagaders rekken uit in de systole en veren terug in de diastole; zo wordt de stotende stroom uit het hart een bijna gelijkmatige stroom.", "vwo": True}
 ],
 "sections": """
  <section><h2>Checkvragen</h2>
    <p class="meta">examenstijl · antwoorden ingeklapt</p>
    <div class="q"><b>1. Flauwvallen bij de diploma-uitreiking</b> <span class="pts">2 punten</span><p>Bij een diploma-uitreiking staat Sanne een half uur stil in de zon. Ze wordt duizelig en valt flauw.</p><p>Leg uit hoe lang stilstaan ertoe leidt dat Sannes hersenen te weinig zuurstof krijgen.</p>
      <details><summary>Antwoord</summary><p>De spierpomp (de kuitspieren) werkt niet, waardoor bloed in de aders van de benen blijft en er minder bloed terugkomt naar het hart (1). Daardoor pompt het hart per slag minder bloed weg; de bloeddruk en de bloedtoevoer naar de hersenen dalen, dus komt er minder zuurstof naar de hersenen (1). Geen punt voor "er is te weinig zuurstof in de lucht".</p></details></div>
    <div class="q"><b>2. Langzaam in de haarvaten</b> <span class="pts">1 punt</span><p>In de haarvaten stroomt het bloed veel langzamer dan in de aorta. Toch is één haarvat veel smaller dan de aorta.</p><p>Verklaar de lage stroomsnelheid in de haarvaten.</p>
      <details><summary>Antwoord</summary><p>De totale doorsnede van alle haarvaten samen is veel groter dan die van de aorta (1). "Hetzelfde volume per tijd" hoeft niet vermeld te worden.</p></details></div>
    <div class="q"><b>3. De polsslag</b> <span class="pts">2 punten</span><p>Vier uitspraken over de polsslag:</p><ol><li>De polsslag ontstaat doordat bloed langs je vinger stroomt.</li><li>Bij een hartslag van 70 per minuut voel je ongeveer 70 polsslagen per minuut.</li><li>De polsslag is voelbaar in een ader in je pols.</li><li>De polsslag is een drukgolf in de wand van een slagader.</li></ol><p>Welke uitspraken zijn juist?<br>A alleen 2 en 4 · B alleen 1 en 2 · C alleen 2, 3 en 4 · D alleen 4</p>
      <details><summary>Antwoord</summary><p>A (2 punten; 1 punt bij D).</p></details></div>
    <div class="q vwo-only"><b>4. Stijve slagaders</b> <span class="vwo-badge">vwo</span> <span class="pts">3 punten</span><p>Bij ouderen worden de aorta en de grote slagaders stijver: het elastische weefsel neemt af.</p><p>Leg uit wat er gebeurt met de bovendruk en met de onderdruk als de aortawand stijver wordt.</p>
      <details><summary>Antwoord</summary><p>Tijdens de systole rekt de wand minder uit, dus kan er minder bloed worden opgeslagen; daardoor stijgt de bovendruk (1). Tijdens de diastole veert de wand minder terug en duwt hij minder bloed na; daardoor daalt de onderdruk (1). Gebruik van de begrippen elastisch / rek / terugveren (windketelwerking) in een causale redenering (1).</p></details></div>
  </section>
  <section><h2>Voor de docent</h2>
    <h3>Hoe de film het uitlegt</h3>
    <table><tr><th>Hoofdstuk</th><th>Type · look</th><th>Kernbeeld</th></tr>
      <tr><td>Cold open</td><td>B · Macro</td><td>Diploma-uitreiking op een warm schoolplein; een klasgenoot wordt bleek, zakt in elkaar en ligt met haar benen omhoog; vraag q02 zonder voorzegging</td></tr>
      <tr><td>1 Drie soorten buizen</td><td>B · Schema</td><td>Vertakkende slagaders vanuit het hart; slagader in doorsnede (elastische vezels, spierlaag) die meebeweegt met de hartslag; een kleine slagader die nauwer en wijder wordt; een haarvat met rode bloedcellen in een rij en uitwisseling; een weefsel met haarvatennet; ader in doorsnede naast de slagader; kleppen; de longader in de bloedsomloop; "blauwe" aders door de huid; de poortader als route darm → lever</td></tr>
      <tr><td>2 Druk en snelheid</td><td>C · Schema</td><td>Drukcurve in de aorta die meeloopt met het hart (systole, diastole, 120/80); bloeddrukmeter met dalende manchetdruk tegen de drukcurve; polsgolf tegen druppel (vertraagd); een druppel reist van aorta naar holle ader terwijl de drukgrafiek zich tekent; vraag q11; tuinslang, waaier van haarvaten, totale doorsnede, rivier en meer. Vwo: twee rechthoeken met gelijke oppervlakte (doorsnede × snelheid) en de windketel met twee stroomcurven</td></tr>
      <tr><td>3 Terug naar het hart</td><td>C · Schema</td><td>Been met ader, kleppen en kuitspier die knijpt (spierpomp); staande persoon met bloed dat in de benen blijft, warme huidvaten, een drukmeter bij het hoofd die zakt; liggen en benen omhoog; tenen bewegen</td></tr>
      <tr><td>Recap</td><td>Macro</td><td>Terug op het schoolplein; de klasgenoot zit met een flesje water</td></tr>
    </table>
    <h3>Vereenvoudigingen</h3>
    <ul>
      <li>Drukgrafiek langs de route: schematisch, met de getallen van een gezonde jongvolwassene in rust (aorta 120/80, kleinste slagaders ongeveer 85 → 35, haarvaten 35 → 15, holle ader 0–5 mmHg). De schommeling in de slagaders is getekend als een golf die uitdooft in de kleinste slagaders.</li>
      <li>"Ongeveer duizend keer zo groot": de totale doorsnede van de haarvaten is 600–1000 × die van de aorta. De rechthoeken in het vwo-blok zijn niet op schaal.</li>
      <li>De bloeddrukmeter is getoond als een drukcurve met een dalende manchetlijn; de geluiden (Korotkov) worden niet genoemd.</li>
      <li>Polsgolf en druppel zijn vertraagd getekend; de verhouding (golf veel sneller dan het bloed) klopt.</li>
      <li>Flauwvallen: alleen het "pooling"-mechanisme (spierpomp stil, warme huidvaten wijd) met de gewone opvang (hart sneller, kleine slagaders nauwer). De vasovagale reflex en het vochtverlies uit de haarvaten in de benen zijn weggelaten.</li>
      <li>Zuurstofrijk en zuurstofarm bloed zijn getekend in twee tinten rood, nooit in blauw. Alleen de ader door de huid heen is blauwgrijs getekend, om de misconceptie te weerleggen.</li>
    </ul>
    <h3>Leerdoelen en waar ze zitten</h3>
    <table><tr><th>Leerdoel</th><th>Niveau</th><th>Waar</th></tr>
      <tr><td>Slagaders, haarvaten en aders vergelijken in bouw en functie; kleine slagaders vernauwen en verwijden</td><td>basis</td><td>H1, recap</td></tr>
      <tr><td>Bloeddruk: systole/bovendruk, diastole/onderdruk, bloeddrukmeter, polsslag als drukgolf, drukdaling langs de route, lagere druk in de longen</td><td>basis</td><td>H2, checkvraag 3</td></tr>
      <tr><td>Waarom bloed in de haarvaten het langzaamst stroomt, en waarom dat de uitwisseling helpt</td><td>basis</td><td>H2, vraag q11, checkvraag 2</td></tr>
      <tr><td>Terugstroom bij lage druk: kleppen en spierpomp; flauwvallen bij lang staan in de warmte</td><td>basis</td><td>Cold open, H3, vraag q02, checkvraag 1</td></tr>
      <tr><td>De poortader: twee haarvatennetten na elkaar</td><td>basis</td><td>H1 (slot)</td></tr>
      <tr><td>Windketelwerking; snelheid omgekeerd evenredig met de totale doorsnede</td><td>vwo</td><td>vwo-blok H2, checkvraag 4</td></tr>
    </table>
    <h3>Pauzemomenten in de klas</h3>
    <ul><li>Na H1: laat leerlingen een tabel maken met wand, druk en functie van de drie vaten.</li><li>Na de bloeddrukmeter (H2): laat ze in tweetallen elkaars polsslag tellen en uitleggen waarom het geen stromend bloed is (checkvraag 3).</li><li>Na H2: laat ze in eigen woorden de tuinslang en de rivier uitleggen (checkvraag 2).</li><li>Na H3: laat ze de oorzaak-gevolgketen van het flauwvallen opschrijven (checkvraag 1).</li></ul>
  </section>
"""
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
