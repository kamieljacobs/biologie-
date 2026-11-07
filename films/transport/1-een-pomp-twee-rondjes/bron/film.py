import json
film = {
 "slug": "1-een-pomp-twee-rondjes", "hoofdstuk": "transport", "hoofdstukNaam": "Transport",
 "title": "Eén pomp, twee rondjes", "sub": "Hoe je hart je bloed rondpompt",
 "puzzle": "Je hart heeft twee pompkamers. Waarom is de wand van de linkerkamer zo'n drie keer zo dik als die van de rechterkamer?",
 "meta": "transport 1/6", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Transport · film 1 van 6",
 "lead": "Je hart zijn twee pompen naast elkaar. De rechterhelft pompt zuurstofarm bloed in een kort rondje door je longen (kleine bloedsomloop), de linkerhelft zuurstofrijk bloed in een lang rondje door je lichaam (grote bloedsomloop). Hartkleppen en halvemaanvormige kleppen gaan open en dicht op drukverschillen; dat hoor je als boem-tak. De sinusknoop geeft het startsein, en het ECG laat de elektrische prikkels zien. De linkerkamer pompt niet meer bloed, maar maakt een veel hogere druk.",
 "endHaak": "evenveel bloed, maar links een veel hogere druk",
 "minis": {"Hoofdstuk 1": "Hoe ziet je hart er van binnen uit?", "Hoofdstuk 2": "Waar gaat het bloed naartoe, en waarom twee rondjes?", "Hoofdstuk 3": "Wat gebeurt er tijdens één hartslag?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Je hart heeft twee pompkamers. Waarom is de wand van de linkerkamer zo'n drie keer zo dik als die van de rechterkamer?", "correct": 1, "explain": "Onthoud je keuze. Het antwoord komt aan het eind van hoofdstuk 2."},
  "q07": {"q": "De longslagader is een slagader. Wat voor bloed stroomt erdoor?", "correct": 1, "explain": "Zuurstofarm bloed: de rechterkamer pompt het naar de longen. Een slagader voert bloed van het hart af, wat er ook in zit."},
  "q14": {"q": "Je hart klinkt als boem-tak. Wat hoor je bij de eerste toon, de boem?", "correct": 1, "explain": "De boem is het dichtklappen van de hartkleppen tussen boezems en kamers, aan het begin van de systole van de kamers. De tak is het dichtklappen van de halvemaanvormige kleppen."}
 },
 "glossary": [
  {"t": "boezem", "d": "Bovenste holte van het hart met een dunne spierwand; vangt het bloed op dat terugkomt."},
  {"t": "kamer", "d": "Onderste holte van het hart met een dikke spierwand; pompt het bloed weg. De linkerkamer heeft de dikste wand."},
  {"t": "tussenschot", "d": "Wand die de linker- en rechterharthelft scheidt."},
  {"t": "kleine bloedsomloop", "d": "Rechterkamer → longslagader → longen → longaders → linkerboezem."},
  {"t": "grote bloedsomloop", "d": "Linkerkamer → aorta → organen → holle aders → rechterboezem."},
  {"t": "slagader", "d": "Bloedvat dat bloed van het hart af voert (ook als het zuurstofarm is, zoals de longslagader)."},
  {"t": "ader", "d": "Bloedvat dat bloed naar het hart toe voert (ook als het zuurstofrijk is, zoals de longader)."},
  {"t": "kransslagaders", "d": "Slagaders die aan het begin van de aorta aftakken en over de buitenkant van het hart de hartspier van bloed voorzien."},
  {"t": "hartkleppen", "d": "Kleppen tussen boezem en kamer: links de tweeslippige, rechts de drieslippige klep; vastgehouden door peesdraden."},
  {"t": "halvemaanvormige kleppen", "d": "Kleppen aan het begin van de aorta en de longslagader."},
  {"t": "systole", "d": "Het samentrekken van een hartdeel (boezemsystole, kamersystole)."},
  {"t": "diastole (hartpauze)", "d": "De fase waarin het hart ontspannen is en zich vult."},
  {"t": "slagvolume", "d": "Hoeveelheid bloed die één kamer per slag wegpompt (in rust ongeveer 70 ml)."},
  {"t": "hartminuutvolume", "d": "Hoeveelheid bloed die het hart per minuut wegpompt: hartfrequentie × slagvolume (in rust ongeveer 5 liter)."},
  {"t": "sinusknoop", "d": "Groepje cellen in de wand van de rechterboezem dat uit zichzelf het startsein voor elke slag geeft: de gangmaker."},
  {"t": "ECG", "d": "Elektrocardiogram: meting van de elektrische prikkels van het hart op de huid. P-top = boezems, QRS-complex = kamers."},
  {"t": "AV-knoop", "d": "De enige doorgang voor de prikkel van boezems naar kamers; vertraagt de prikkel ongeveer 0,1 s.", "vwo": True},
  {"t": "bundel van His", "d": "Geleidingsbundel die de prikkel van de AV-knoop naar de punt van het hart brengt.", "vwo": True},
  {"t": "T-top", "d": "Deel van het ECG dat hoort bij het herstel van de kamers.", "vwo": True}
 ],
 "sections": """
  <section><h2>Checkvragen</h2>
    <p class="meta">examenstijl · antwoorden ingeklapt</p>
    <div class="q"><b>1. De dikke wand</b> <span class="pts">2 punten</span><p>Een leerling beweert: "De wand van de linkerkamer is dikker, omdat de linkerkamer per slag meer bloed rondpompt dan de rechterkamer." Leg uit dat deze bewering onjuist is, en geef de juiste verklaring voor de dikkere wand.</p>
      <details><summary>Antwoord</summary><p>Beide kamers pompen per slag (gemiddeld) even veel bloed; anders hoopt het bloed zich op in een van de twee bloedsomlopen (1). De linkerkamer moet een hogere bloeddruk maken, omdat de grote bloedsomloop langer is en meer weerstand heeft (1).</p></details></div>
    <div class="q"><b>2. Kleppen en druk</b> <span class="pts">2 punten</span><p>Tijdens een bepaalde fase van de hartcyclus is de druk in de linkerkamer 5 mmHg, in de linkerboezem 8 mmHg en in de aorta 80 mmHg. Geef aan of de tweeslippige klep en de halvemaanvormige klep van de aorta open of dicht staan. Leg je antwoord uit met de drukverschillen.</p>
      <details><summary>Antwoord</summary><p>Tweeslippige klep open: de druk in de boezem is hoger dan in de kamer (1). Halvemaanvormige klep dicht: de druk in de aorta is hoger dan in de kamer (1).</p></details></div>
    <div class="q"><b>3. Een stolsel uit het been</b> <span class="pts">2 punten</span><p>Een bloedstolsel ontstaat in een ader van het onderbeen. Het komt vast te zitten in het eerste netwerk van haarvaten dat het tegenkomt. Noem in de juiste volgorde de delen van het hart en de bloedvaten die het stolsel passeert, en het orgaan waar het vast komt te zitten.</p>
      <details><summary>Antwoord</summary><p>Onderste holle ader – rechterboezem – rechterkamer – longslagader (1); in de longen (1).</p></details></div>
    <div class="q vwo-only"><b>4. Een geblokkeerde AV-knoop</b> <span class="vwo-badge">vwo</span> <span class="pts">3 punten</span><p>Bij een patiënt geleidt de AV-knoop geen prikkels meer. Op het ECG zie je P-toppen in een regelmatig ritme van 75 per minuut, en losstaande QRS-complexen van 35 per minuut.</p><p>a. Leg uit waarom de prikkel van de sinusknoop de kamers niet op een andere manier bereikt. (1p)<br>b. Leg met het ECG uit of de boezems en de kamers nog samentrekken, en in welk tempo. (2p)</p>
      <details><summary>Antwoord</summary><p>a. Tussen boezems en kamers ligt een laag bindweefsel die prikkels niet geleidt; de AV-knoop is de enige verbinding (1). b. De boezems trekken 75 keer per minuut samen, want de P-top is de prikkel over de boezems (1); de kamers 35 keer per minuut, want elk QRS-complex is een prikkel door de kamers; de kamers hebben een eigen, trager ritme (1).</p></details></div>
  </section>
  <section><h2>Voor de docent</h2>
    <h3>Hoe de film het uitlegt</h3>
    <table><tr><th>Hoofdstuk</th><th>Type · look</th><th>Kernbeeld</th></tr>
      <tr><td>Cold open</td><td>B · Macro</td><td>Leerling na een sprint naar de bus, hand op de borst; vraag q02 (zonder voorzegging: "even veel" komt pas in de onthulling)</td></tr>
      <tr><td>1 Twee pompen naast elkaar</td><td>B · Schema</td><td>Borstkas met longen en het hart iets naar links; het hart in doorsnede met vier holtes, wanddiktes, grote vaten en kransslagaders</td></tr>
      <tr><td>2 Twee rondjes</td><td>B · Schema</td><td>Vraag q07 over de longslagader; lus-schema van de dubbele bloedsomloop met een druppel die meereist; de onthulling van de puzzel: even veel volume, vijf keer zo hoge druk</td></tr>
      <tr><td>3 Eén hartslag</td><td>C · Schema</td><td>Het hart in doorsnede dat samentrekt in slow motion, met kleppen die op drukverschil open- en dichtgaan; vraag q14 (boem-tak); sinusknoop en ECG. Vwo: bindweefsellaag, AV-knoop, bundel van His, T-top</td></tr>
      <tr><td>Recap</td><td>Macro</td><td>Terug bij de bushalte</td></tr>
    </table>
    <h3>Vereenvoudigingen</h3>
    <ul>
      <li>Het hart is getekend als vooraanzicht in doorsnede, niet op schaal; de longslagader en de aorta zijn naast elkaar getekend, in werkelijkheid draaien ze om elkaar heen.</li>
      <li>De hartcyclus in de animatie is schematisch (verhouding van de fasen bij rust); het ECG is een model, geen meting.</li>
      <li>"Ongeveer vijf keer zo hoge druk": systolische druk linkerkamer ongeveer 120 mmHg, rechterkamer ongeveer 25 mmHg.</li>
      <li>In de lus zijn de zuurstofrijke en zuurstofarme kanten in twee tinten rood getekend, nooit in blauw.</li>
    </ul>
    <h3>Leerdoelen en waar ze zitten</h3>
    <table><tr><th>Leerdoel</th><th>Niveau</th><th>Waar</th></tr>
      <tr><td>Bouw van het hart, grote vaten, kransslagaders, links/rechts</td><td>basis</td><td>H1, checkvraag 3</td></tr>
      <tr><td>Kleine en grote bloedsomloop; slagader en ader</td><td>basis</td><td>H2, vraag q07, checkvraag 3</td></tr>
      <tr><td>Waarom de linkerkamerwand dikker is</td><td>basis</td><td>Cold open, H2, vraag q02, checkvraag 1</td></tr>
      <tr><td>Hartcyclus, kleppen op drukverschil, sinusknoop, ECG, slagvolume, hartminuutvolume</td><td>basis</td><td>H3, vraag q14, checkvraag 2</td></tr>
      <tr><td>Prikkelgeleiding: bindweefsellaag, AV-knoop, bundel van His, T-top</td><td>vwo</td><td>vwo-blok H3, checkvraag 4</td></tr>
    </table>
    <h3>Pauzemomenten in de klas</h3>
    <ul><li>Na H1: laat leerlingen op een tekening van voren de linkerkamer aanwijzen.</li><li>Na H2: laat ze de route van een druppel uit het been opschrijven (checkvraag 3).</li><li>Na H3: laat ze per fase opschrijven welke kleppen open en dicht staan.</li></ul>
  </section>
"""
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
