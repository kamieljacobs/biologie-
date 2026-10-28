import json
film = {
 "slug": "1-post-voor-iedereen", "hoofdstuk": "regeling", "hoofdstukNaam": "Regeling",
 "title": "Post voor iedereen", "sub": "Hoe hormonen berichten door je lichaam sturen",
 "puzzle": "Je schrikt van een knal. Waarom bonkt je hart nog minuten door, terwijl de schrik allang voorbij is?",
 "meta": "hormonen 1/5", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Hormonen · film 1 van 5",
 "lead": "Je lichaam heeft twee manieren om een bericht te sturen: zenuwen en hormonen. Een hormoon is een stof die een klier aan het bloed afgeeft. Het komt overal, maar alleen cellen met een passende receptor reageren. En hoe lang het werkt, hangt af van afgifte en afbraak: daarom bonkt je hart na een schrik nog minuten door.",
 "endHaak": "klier, bloed, receptor",
 "minis": {"Hoofdstuk 1": "Hoe verschilt een hormoon van een zenuwsignaal, en waar zitten de klieren?", "Hoofdstuk 2": "Waarom reageert niet elke cel op een hormoon?", "Hoofdstuk 3": "Waarom werkt een hormoon nog na als de klier stopt?", "Recap": "Waarom bonkt je hart nog minuten na de knal?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.1 · 28 oktober 2026 (prompt v13).",
 "questions": {
  "q02": {"q": "Na de knal blijft je hart nog minuten bonken, terwijl je allang weet dat er niets aan de hand is. Waarom stopt dat niet meteen?", "correct": 1, "explain": "Onthoud je keuze. Het antwoord zie je in hoofdstuk 3 en aan het eind."},
  "q11": {"q": "Het bijniermerg geeft adrenaline af en het bloed brengt die overal heen. Welke cellen reageren op de adrenaline?", "correct": 2, "explain": "Adrenaline komt echt overal, maar alleen cellen met een passende receptor reageren. Zo'n cel heet een doelcel."},
  "q17": {"q": "Schildklierhormoon is geen steroïd, maar gaat wel door het membraan. Het werkt pas na uren, en het effect duurt dagen. Waar zit de receptor?", "correct": 0, "explain": "Een effect dat uren op zich laat wachten en dagen duurt, past bij een receptor in de cel die genen aanzet. Het gaat om de werking, niet om de naam: ook schildklierhormoon werkt als transcriptiefactor."}
 },
 "glossary": [
  {"t": "hormoon", "d": "Stof die een hormoonklier aan het bloed afgeeft en die elders in het lichaam werkt op doelcellen."},
  {"t": "hormoonklier", "d": "Klier zonder afvoerbuis die zijn stof rechtstreeks aan het bloed afgeeft, bijvoorbeeld de schildklier of de bijnier."},
  {"t": "receptor", "d": "Eiwit waar een hormoon precies in past, zoals een sleutel in een slot. Alleen cellen met de passende receptor reageren op het hormoon."},
  {"t": "doelcel / doelorgaan", "d": "Cel met de passende receptor voor een hormoon; een doelorgaan is een orgaan met zulke cellen."},
  {"t": "bijniermerg", "d": "Binnenste deel van de bijnier; geeft adrenaline af als het zenuwstelsel het aanzet."},
  {"t": "adrenaline", "d": "Hormoon uit het bijniermerg: hart sneller en harder, lever geeft glucose af, vaten naar de spieren wijder, naar darm en huid nauwer."},
  {"t": "hypothalamus", "d": "Deel van de hersenen dat de hypofyse aanstuurt."},
  {"t": "hypofyse", "d": "Hormoonklier die onder de hersenen hangt en veel andere hormoonklieren aanstuurt."},
  {"t": "eilandjes van Langerhans", "d": "Groepjes cellen in de alvleesklier die hormonen aan het bloed afgeven (insuline en glucagon)."},
  {"t": "concentratie", "d": "Hoeveel van een stof er per liter bloed zit. Bij een hormoon bepalen afgifte en afbraak samen de concentratie."},
  {"t": "endocriene / exocriene klier", "d": "Endocrien: geeft zijn stof aan het bloed af (hormoonklier). Exocrien: brengt zijn stof via een afvoerbuis naar buiten of in de darm (speekselklier).", "vwo": True},
  {"t": "signaaltransductie", "d": "Kettingreactie in de cel nadat een hormoon aan een receptor op het membraan bindt: enzymen zetten steeds meer enzymen aan. Snel, versterkt, kort.", "vwo": True},
  {"t": "steroïdhormoon", "d": "Hormoon gemaakt van cholesterol dat oplost in vet (cortisol, testosteron, oestrogeen). Gaat door het membraan; de receptor zit in de cel en zet genen aan of uit.", "vwo": True}
 ],
 "sections": """
  <section><h2>Checkvragen</h2>
    <p class="meta">examenstijl · antwoorden ingeklapt</p>
    <div class="q"><b>1. Afvoerbuis en hormoonklier</b> <span class="pts">2 punten</span><p>Een hormoonklier heeft geen afvoerbuis. Toch heeft de alvleesklier een afvoerbuis naar de darm, en wordt hij ook een hormoonklier genoemd.</p><p>Leg uit hoe dat kan.</p>
      <details><summary>Antwoord</summary><p>Het alvleessap met verteringsenzymen gaat via de afvoerbuis naar de twaalfvingerige darm (1). De eilandjes van Langerhans geven hormonen (insuline en glucagon) rechtstreeks aan het bloed af (1).</p></details></div>
    <div class="q"><b>2. Zelfde hormoon, ander effect</b> <span class="pts">2 punten</span><p>Na een schrik komt adrenaline in alle organen terecht. De bloedvaten naar de skeletspieren worden wijder, de bloedvaten naar de darmen worden nauwer. Een leerling denkt: "Dan bevat het bloed naar de darm vast minder adrenaline."</p><p>Leg uit dat deze verklaring niet klopt, en geef de juiste verklaring.</p>
      <details><summary>Antwoord</summary><p>Het bloed brengt de adrenaline overal in (vrijwel) dezelfde concentratie (1). Het effect hangt af van de doelcel: een ander type receptor of een andere reactie in de cel (1).</p></details></div>
    <div class="q"><b>3. Halfwaardetijd</b> <span class="pts">3 punten</span><p>Bij een proefpersoon is de adrenalineconcentratie direct na een schrik 400 pg/mL. De halfwaardetijd van adrenaline in het bloed is 2 minuten. Het bijniermerg geeft na de schrik geen extra adrenaline meer af.</p><p>a. Bereken de concentratie 6 minuten na de schrik.<br>b. Leg uit waarom de hartslag na de schrik nog verhoogd blijft, terwijl de zenuwimpulsen naar het bijniermerg al gestopt zijn.</p>
      <details><summary>Antwoord</summary><p>a. 400 → 200 → 100 → 50 pg/mL (1). b. Er zit nog adrenaline in het bloed, die pas geleidelijk door afbraak verdwijnt (1); zolang de concentratie hoog genoeg is, blijven de receptoren van de hartspiercellen geactiveerd (1).</p></details></div>
    <div class="q vwo-only"><b>4. Transcriptieremmer</b> <span class="vwo-badge">vwo</span> <span class="pts">3 punten</span><p>Onderzoekers behandelen levercellen met een stof die de transcriptie remt. Daarna voegen ze adrenaline of cortisol toe. Het effect van adrenaline (afbraak van glycogeen binnen enkele seconden) blijft bestaan. Het effect van cortisol (na enkele uren meer enzymen voor de aanmaak van glucose) blijft uit.</p><p>Verklaar beide resultaten met de plaats van de receptor.</p>
      <details><summary>Antwoord</summary><p>Adrenaline bindt aan een receptor op het celmembraan; signaaltransductie zet bestaande enzymen aan, daarvoor is geen transcriptie nodig (1). Cortisol is een steroïdhormoon dat door het membraan gaat en aan een receptor in de cel bindt (1). Dat complex werkt als transcriptiefactor; het effect vraagt om nieuw mRNA en nieuwe eiwitten, en de transcriptie is geremd (1).</p></details></div>
  </section>
  <section><h2>Voor de docent</h2>
    <h3>Hoe de film het uitlegt</h3>
    <table><tr><th>Hoofdstuk</th><th>Type · look</th><th>Kernbeeld</th></tr>
      <tr><td>Cold open</td><td>D · Macro</td><td>Klaslokaal, een stoel valt; leerling schrikt; hartslagmeter blijft minuten hoog; vraag q02</td></tr>
      <tr><td>1 Twee manieren om een bericht te sturen</td><td>B · Schema</td><td>Zenuw als vaste lijn naar één plek (tot 100 m/s) tegenover hormoon in de bloedbaan (≈ 1 minuut rond); post: brief met één adres tegenover folder bij iedereen; vergelijkingstabel; voorbeelden (pan, groeien, slaap, bloedsuiker, water); speekselklier met buis tegenover hormoonklier; lichaamskaart met hypothalamus, hypofyse, schildklier, bijnieren, alvleesklier (zoom: buis én eilandje van Langerhans), eierstokken/zaadballen. Vwo: endocrien/exocrien, hypothalamus als schakel</td></tr>
      <tr><td>2 Wie leest de post?</td><td>B · Schema + Micro</td><td>Zenuwsignaal naar het bijniermerg (zoom: schors en merg); adrenaline stroomt overal; vraag q11; drie cellen in Micro, twee met receptoren lichten op; sleutel-slot; doelcel, doelorgaan; vier panelen (hart, lever glycogeen → glucose, vaten spieren wijder, darm en huid nauwer; koude tenen). Vwo: membraanreceptor met signaaltransductie (1 → 3 → 9 enzymen) tegenover steroïdhormoon (cortisol door het membraan, receptor in de cel, gen aan, nieuwe eiwitten, uren); schildklierhormoon (vraag q17)</td></tr>
      <tr><td>3 Hoe lang duurt een bericht?</td><td>D · Schema</td><td>Bak met kraan (klier) en afvoer (afbraak): peil = concentratie; bij de knal stijgt het peil, de kraan gaat dicht maar het peil zakt langzaam; grafiek met halveringen 100 → 50 → 25 → 12 (model, halfwaardetijd ≈ 2 min)</td></tr>
      <tr><td>Recap</td><td>Schema</td><td>Route knal → zenuw → bijniermerg → bloed → hart, lever, vaten; hartslag zakt mee met de adrenaline; antwoord b</td></tr>
    </table>
    <h3>Vereenvoudigingen</h3>
    <ul>
      <li>De grafiek in H3 toont de extra adrenaline boven het rustniveau (piek = 100). Het rustniveau zelf (ongeveer een tiende van de piek) blijft over. De film noemt de rustwaarde "ongeveer een tienmiljoenste gram per liter" (100 ng/L) als orde van grootte; gemeten waarden liggen rond 20–60 ng/L.</li>
      <li>De halfwaardetijd van adrenaline in het bloed is in de literatuur 1–3 minuten; de film rekent met 2 minuten en noemt de grafiek een model.</li>
      <li>Het hart blijft ook kort door sympathische zenuwen versneld; de film zegt dat de zenuwen snel kalmeren en dat het lange naijlen door de adrenaline komt.</li>
      <li>"Hormonen komen uit klieren": ook andere organen maken hormonen (maag- en darmwand, nieren met EPO). De film noemt de belangrijkste klieren.</li>
      <li>De receptor is getekend als een kommetje met een vaste vorm; in werkelijkheid zijn er meerdere typen adrenalinereceptoren, en dat verklaart mede waarom vaten in spieren wijder en in de darm nauwer worden.</li>
      <li>Signaaltransductie is getekend als 1 → 3 → 9 enzymen; de echte versterking is veel groter (second messenger cAMP is weggelaten).</li>
    </ul>
    <h3>Leerdoelen en waar ze zitten</h3>
    <table><tr><th>Leerdoel</th><th>Niveau</th><th>Waar</th></tr>
      <tr><td>Wat een hormoon is (klier zonder afvoerbuis → bloed → doelcel)</td><td>basis</td><td>H1, H2, eindkaart</td></tr>
      <tr><td>Hormoonstelsel en zenuwstelsel vergelijken (snelheid, duur, bereik)</td><td>basis</td><td>H1 (tabel), eindkaart</td></tr>
      <tr><td>Receptor, doelcel, doelorgaan; één hormoon, verschillende effecten</td><td>basis</td><td>H2, vraag q11, checkvraag 2</td></tr>
      <tr><td>Concentratie door afgifte en afbraak; duur van een effect</td><td>basis</td><td>H3, recap, checkvraag 3</td></tr>
      <tr><td>Plaats van de belangrijkste hormoonklieren</td><td>basis</td><td>H1 (lichaamskaart), checkvraag 1</td></tr>
      <tr><td>Membraanreceptor tegenover receptor in de cel; snelheid en duur</td><td>vwo</td><td>H2 vwo-blok, vraag q17, checkvraag 4</td></tr>
    </table>
    <h3>Pauzemomenten in de klas</h3>
    <ul><li>Na de cold open (q02): laat leerlingen hun keuze opschrijven.</li><li>Na q11: vraag waarom tenen koud worden bij schrik.</li><li>Bij de grafiek in H3: laat de halvering vooraf uitrekenen.</li></ul>
  </section>
"""
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
