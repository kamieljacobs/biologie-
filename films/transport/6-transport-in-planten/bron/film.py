import json
film = {
 "slug": "6-transport-in-planten", "hoofdstuk": "transport", "hoofdstukNaam": "Transport",
 "title": "Transport in planten", "sub": "Hoe water omhoog komt en suiker rondgaat",
 "puzzle": "Waarom hangt een plant slap op een warme middag, terwijl de aarde nog vochtig is, en staat hij 's avonds weer recht?",
 "meta": "transport 6/6", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Transport · film 6 van 6",
 "lead": "Een plant heeft twee soorten vaten. Het xyleem (de houtvaten) is een rij dode, holle cellen die water met mineralen van de wortels naar de bladeren brengt, altijd één kant op. Het floëem (de bastvaten of zeefvaten) bestaat uit levende cellen met zeefplaten en verdeelt de suiker uit de bladeren over de plant, in twee richtingen. Water komt binnen via de wortelharen en wordt vooral van bovenaf omhoog getrokken: verdamping via de huidmondjes geeft de zuigkracht van de bladeren. Huidmondjes laten koolstofdioxide binnen, maar ook water ontsnappen; verdampt een plant meer dan hij opneemt, dan daalt de turgor en zakt hij in.",
 "endHaak": "meer verdamping dan opname: de turgor daalt en de plant zakt in",
 "minis": {"Hoofdstuk 1": "Welke vaten heeft een plant, en wat vervoeren ze?", "Hoofdstuk 2": "Hoe komt water van de wortel tot in het blad?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Je plant hangt op een warme middag slap, terwijl de aarde nog vochtig is. 's Avonds staat hij weer recht. Hoe komt dat?", "correct": 1, "explain": "Onthoud je keuze. Het antwoord komt aan het eind van hoofdstuk 2."},
  "q07": {"q": "Iemand snijdt rondom een boom een ring bast weg, maar laat het hout heel. Wat gebeurt er?", "correct": 1, "explain": "Het xyleem in het hout is nog heel, dus water komt nog omhoog. Het floëem in de bast is doorgesneden: suiker kan niet meer naar de wortels. De wortels sterven, en daarna de hele boom."},
  "q16": {"q": "Een bladluis prikt met zijn monddeel in één zeefvat. Moet hij hard zuigen om het sap eruit te krijgen?", "correct": 1, "explain": "Het sap in een zeefvat staat onder hoge druk (drukstroomtheorie). Het wordt vanzelf de bladluis in geperst."}
 },
 "glossary": [
  {"t": "vaatbundel", "d": "Bundeltje vaten in een stengel, blad (als nerf) of wortel; bevat xyleem en floëem."},
  {"t": "xyleem (houtvaten)", "d": "Rijen dode cellen zonder inhoud en tussenwanden, met een stevige wand van houtstof; vervoeren water met mineralen van de wortels naar de bladeren, altijd één kant op. Bij een boom is het hout xyleem."},
  {"t": "floëem (bastvaten, zeefvaten)", "d": "Levende cellen met zeefplaten; vervoeren opgeloste suiker van de bladeren naar plekken die suiker verbruiken of opslaan, in twee richtingen. Bij een boom zit het floëem in de bast."},
  {"t": "zeefplaat", "d": "Tussenwand vol gaatjes tussen twee cellen van een zeefvat."},
  {"t": "nerf", "d": "Vaatbundel in een blad."},
  {"t": "wortelhaar", "d": "Lange, dunne uitstulping van een cel in de opperhuid van de wortel; samen geven de wortelharen een groot oppervlak voor de opname van water en mineralen."},
  {"t": "mineralen", "d": "Opgeloste zouten uit de bodem (anorganische stoffen); de wortelcellen nemen ze vaak op met actief transport."},
  {"t": "osmose", "d": "Verplaatsing van water door een membraan naar de kant met meer opgeloste stoffen."},
  {"t": "worteldruk", "d": "Kleine druk waarmee de wortels water een stukje omhoog duwen."},
  {"t": "huidmondje", "d": "Gaatje in de opperhuid van een blad, vooral aan de onderkant, gevormd door twee sluitcellen."},
  {"t": "sluitcellen", "d": "Twee cellen rond een huidmondje met een dikkere wand aan de kant van de opening. Zwellen ze op, dan gaat de opening open; verliezen ze water, dan sluit ze."},
  {"t": "transpiratie (verdamping)", "d": "Het verdampen van water uit de bladeren en het ontsnappen van de waterdamp door de huidmondjes."},
  {"t": "zuigkracht van de bladeren", "d": "Verdampt er water, dan trekken de bladcellen nieuw water uit de houtvaten; zo schuift de hele waterkolom omhoog."},
  {"t": "turgor", "d": "De druk van de vacuole tegen de celwand. Daalt de turgor, dan wordt de plant slap (verwelken)."},
  {"t": "cohesie", "d": "Watermoleculen trekken sterk aan elkaar, door waterstofbruggen.", "vwo": True},
  {"t": "adhesie", "d": "Watermoleculen plakken aan de wand van de houtvaten.", "vwo": True},
  {"t": "spanning in de houtvaten", "d": "Het water in de houtvaten wordt omhoog getrokken en staat onder spanning: bovenin is de druk lager dan onderin.", "vwo": True},
  {"t": "begeleidende cel", "d": "Levende cel naast een zeefvat die suiker het zeefvat in pompt (bij de bron) of eruit haalt.", "vwo": True},
  {"t": "bron en put", "d": "Bron: plek waar suiker het floëem in gaat (meestal een blad). Put: plek waar suiker eruit gaat (groeipunt, vrucht, wortel). Bron en put kunnen wisselen.", "vwo": True},
  {"t": "drukstroomtheorie", "d": "Bij de bron wordt suiker het zeefvat in gepompt, water volgt door osmose en de druk wordt hoog; bij de put gaan suiker en water eruit en is de druk laag. Het sap stroomt van hoge naar lage druk.", "vwo": True}
 ],
 "sections": """
  <section><h2>Checkvragen</h2>
    <p class="meta">examenstijl · antwoorden ingeklapt</p>
    <div class="q"><b>1. Een ring bast bij de appelboom</b> <span class="pts">2 punten</span><p>Een fruitteler verwijdert in het voorjaar bij een appelboom rondom de stam een smalle ring van de bast. Het hout blijft onbeschadigd. Die zomer zijn de appels aan deze boom groter dan aan onbehandelde bomen. Na een paar jaar groeit de ring dicht.</p><p>Leg uit hoe het verwijderen van de ring bast leidt tot grotere appels.</p>
      <details><summary>Antwoord</summary><p>De bastvaten/het floëem zijn doorgesneden, waardoor suikers uit de bladeren niet meer naar de wortels kunnen (1). Daardoor blijven er meer suikers boven de ring beschikbaar voor de vruchten (1).</p></details></div>
    <div class="q"><b>2. Huidmondjes dicht in de kas</b> <span class="pts">2 punten</span><p>Op een hete, droge middag sluit een tomatenplant in een kas zijn huidmondjes.</p><p>Noem een voordeel en een nadeel van het sluiten van de huidmondjes voor de plant, en leg beide uit.</p>
      <details><summary>Antwoord</summary><p>Voordeel: minder verdamping/transpiratie, waardoor de cellen minder water verliezen en de turgor behouden blijft / de plant niet verwelkt (1). Nadeel: er komt minder koolstofdioxide het blad in, waardoor de fotosynthese afneemt (1).</p></details></div>
    <div class="q vwo-only"><b>3. Sap uit een bladluis</b> <span class="vwo-badge">vwo</span> <span class="pts">3 punten</span><p>Een bladluis steekt zijn monddelen (stilet) in één zeefvat in een stengel. Onderzoekers snijden de luis los van zijn stilet. Uit het afgesneden stilet blijft urenlang sap druppelen, zonder dat er gezogen wordt. Het sap bevat veel sacharose.</p><p>Verklaar met de drukstroomtheorie waarom het sap vanzelf uit het stilet druppelt.</p>
      <details><summary>Antwoord</summary><p>Bij de bron (blad) wordt sacharose actief in de zeefvaten opgenomen, waardoor de osmotische waarde stijgt (1). Daardoor stroomt water (uit de houtvaten) door osmose de zeefvaten in, waardoor de druk in de zeefvaten hoog wordt (1). Het sap staat onder (over)druk, zodat het door het stilet naar buiten wordt geperst, van hoge naar lage druk (1).</p></details></div>
  </section>
  <section><h2>Voor de docent</h2>
    <h3>Hoe de film het uitlegt</h3>
    <table><tr><th>Hoofdstuk</th><th>Type · look</th><th>Kernbeeld</th></tr>
      <tr><td>Cold open</td><td>A · Macro</td><td>Een plant in de vensterbank hangt slap op een warme middag en staat 's avonds weer recht; vraag q02 (afleiders: uitgedroogd/kapot en wortels pompen)</td></tr>
      <tr><td>1 Twee soorten vaten</td><td>B · Schema</td><td>Stengel in doorsnede met vaatbundels; een vaatbundel met xyleem en floëem; een houtvat waarvan inhoud en tussenwanden verdwijnen; suiker in twee richtingen (zomer, voorjaar); een zeefvat met zeefplaten; een boomstam in doorsnede en de ringvraag q07</td></tr>
      <tr><td>2 Water omhoog</td><td>A · Micro + Schema</td><td>Wortelharen in de bodem (actief transport van mineralen, osmose); worteldruk; een blad in doorsnede met luchtholtes, verdamping en een huidmondje; de zuigkracht van de bladeren; sluitcellen die open- en dichtgaan; turgor in plantencellen; terug naar de vensterbank (onthulling q02). Vwo: cohesie en adhesie, spanning in de houtvaten, hoogste boom, drukstroomtheorie met begeleidende cel, bron en put; vraag q16 (bladluis)</td></tr>
      <tr><td>Recap</td><td>Schema + Macro</td><td>Plant met beide vaten, een blad met huidmondje, de vensterbank 's avonds</td></tr>
    </table>
    <h3>Vereenvoudigingen</h3>
    <ul>
      <li>De plant is schematisch: per blad en per wortel één houtvat en één bastvat getekend; in werkelijkheid lopen er in elke vaatbundel veel vaten.</li>
      <li>In de stengeldoorsnede liggen de vaatbundels in een kring (tweezaadlobbige plant); het xyleem ligt aan de binnenkant, het floëem aan de buitenkant.</li>
      <li>Het houtvat is getekend als één rij cellen met houtstofringen; dat de cellen eerst leven en dan afsterven, is als animatie in een paar seconden getoond.</li>
      <li>De wortel is zonder endodermis getekend; de film zegt alleen dat water door osmose de wortel in gaat en de houtvaten bereikt.</li>
      <li>Bij het slap worden daalt de turgor; de cellen laten niet los van de celwand (geen plasmolyse).</li>
      <li>Getallen: een grote boom verdampt op een warme dag honderden liters; ongeveer 97–99 % van het opgenomen water verdampt. De hoogste boom (kustsequoia Hyperion) is ongeveer 116 m. Worteldruk is meestal minder dan 0,1–0,2 MPa.</li>
      <li>Vwo-blok: water stroomt van de houtvaten het zeefvat in; de terugstroom van water bij de put is als één pijl getekend.</li>
    </ul>
    <h3>Leerdoelen en waar ze zitten</h3>
    <table><tr><th>Leerdoel</th><th>Niveau</th><th>Waar</th></tr>
      <tr><td>Xyleem en floëem vergelijken (bouw, inhoud, richting); vaatbundels in stengel en nerven; hout = xyleem, floëem in de bast</td><td>basis</td><td>H1, vraag q07, checkvraag 1</td></tr>
      <tr><td>Wateropname en -transport: wortelharen, mineralen actief, water door osmose, worteldruk, transpiratie, zuigkracht van de bladeren</td><td>basis</td><td>H2, cold open, recap</td></tr>
      <tr><td>Huidmondjes en sluitcellen; de ruil koolstofdioxide tegen water; turgor en verwelken</td><td>basis</td><td>H2, vraag q02, checkvraag 2</td></tr>
      <tr><td>Cohesie en adhesie; spanning (onderdruk) in de houtvaten; worteldruk is klein</td><td>vwo</td><td>vwo-blok H2</td></tr>
      <tr><td>Drukstroomtheorie: begeleidende cel, bron en put, water uit de houtvaten</td><td>vwo</td><td>vwo-blok H2, vraag q16, checkvraag 3</td></tr>
    </table>
    <h3>Pauzemomenten in de klas</h3>
    <ul><li>Na H1: laat leerlingen een tabel maken: xyleem tegenover floëem (levend/dood, inhoud, richting, plek in een boom).</li><li>Na de ringvraag: laat ze uitleggen waarom de boom pas na een tijd doodgaat (checkvraag 1).</li><li>Na H2: laat ze de route van een watermolecuul van bodem tot buitenlucht opschrijven, en een voordeel en nadeel van dichte huidmondjes noemen (checkvraag 2).</li></ul>
  </section>
"""
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
