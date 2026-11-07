import json
film = {
 "slug": "cyclus", "hoofdstuk": "voortplanting", "hoofdstukNaam": "Voortplanting",
 "title": "De cyclus", "sub": "Hoe hormonen elkaar remmen en aanjagen",
 "puzzle": "De pil bevat hormonen die het lichaam van een vrouw ook zelf maakt. Toch komt er daardoor geen eisprong. Hoe kan meer van een eigen hormoon iets tegenhouden?",
 "meta": "voortplanting · hormonale regeling", "version": "1.0 · november 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Voortplanting · film 3",
 "lead": "Hormonen remmen hun eigen oorzaak: negatieve terugkoppeling. Bij de man houdt dat het testosteron gelijk, en daarom maakt een bodybuilder die testosteron spuit juist minder zaadcellen. Bij de vrouw zorgt dezelfde rem ervoor dat er van een groepje follikels één overblijft. Vlak voor de eisprong slaat de rem om in een gaspedaal: positieve terugkoppeling geeft de LH-piek. Het gele lichaam maakt progesteron; sterft het af, dan volgt de menstruatie en begint de cyclus opnieuw. De pil houdt de rem de hele maand aan.",
 "endHaak": "kun je nu uitleggen waarom drie dagen de pil vergeten toch een eisprong kan geven?",
 "minis": {"Hoofdstuk 1 — De rem": "Wat doet extra testosteron met de zaadcellen?", "Hoofdstuk 2 — Eén follikel wint": "Waarom rijpt er meestal maar één follikel?", "Hoofdstuk 3 — Van rem naar gaspedaal": "Hoe ontstaat de LH-piek?", "Hoofdstuk 4 — Het gele lichaam": "Waarom komt er een menstruatie?", "Hoofdstuk 5 — De pil": "Hoe houdt de pil de eisprong tegen?", "Recap": "Wat moet je onthouden?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · november 2026 (prompt v13, lichte remake van een deel van Van bevruchting tot baby).",
 "questions": {
  "q07": {"q": "Een bodybuilder spuit extra testosteron. Wat gebeurt er met zijn LH, zijn eigen testosteron en zijn zaadcellen?", "correct": 2, "explain": "Negatieve terugkoppeling: het extra testosteron remt hypothalamus en hypofyse. Er komt minder LH en FSH, de zaadballen maken zelf minder testosteron, en daardoor rijpen er minder zaadcellen."},
  "q14": {"q": "Bij ivf krijgt een vrouw elke dag een prik met veel FSH. Wat gebeurt er in haar eierstokken?", "correct": 1, "explain": "Normaal remt het oestrogeen het FSH, zodat alleen de follikel met de meeste FSH-receptoren overblijft. Blijft het FSH hoog, dan valt die wedstrijd weg en rijpen er meerdere follikels."},
  "q22": {"q": "Op welke dag was de eisprong, welke lijn verraadt dat, en hoe zie je aan het progesteron dat er geen zwangerschap is?", "correct": 0, "explain": "De eisprong valt vlak na de LH-piek. Het progesteron van het gele lichaam zakt aan het eind: het gele lichaam is afgestorven, dus er is geen embryo."},
  "q29": {"q": "Een vrouw vergeet drie dagen haar pil. Waarom kan ze dan toch een eisprong krijgen?", "correct": 1, "explain": "Zonder pil zakken de hormonen; de rem op de hypofyse valt weg, het FSH stijgt en een follikel kan rijpen. Maakt die genoeg oestrogeen, dan kan er toch een LH-piek komen."}
 },
 "glossary": [
  {"t": "negatieve terugkoppeling", "d": "Een signaal remt zijn eigen oorzaak, zodat een hoeveelheid ongeveer gelijk blijft. Voorbeeld: testosteron remt hypothalamus en hypofyse."},
  {"t": "positieve terugkoppeling", "d": "Een signaal versterkt zichzelf en loopt op tot iets de lus doorbreekt. Voorbeeld: lang hoog oestrogeen geeft de LH-piek."},
  {"t": "follikel", "d": "Blaasje van hulpcellen rond een eicel in de eierstok; maakt oestrogeen."},
  {"t": "LH-piek", "d": "Snelle, grote stijging van LH midden in de cyclus; laat de follikel openscheuren: de eisprong."},
  {"t": "geel lichaam", "d": "Wat er na de eisprong van de follikel overblijft; maakt vooral progesteron en sterft zonder embryo na ongeveer twaalf dagen af."},
  {"t": "progesteron", "d": "Hormoon van het gele lichaam: maakt het baarmoederslijmvlies klaar voor een embryo en remt samen met oestrogeen de hypofyse."},
  {"t": "menstruatiecyclus", "d": "De regelmatige cyclus van ongeveer vier weken waarin een follikel rijpt, de eisprong plaatsvindt en het slijmvlies opbouwt en loslaat. Dag 1 is de eerste dag van de menstruatie."},
  {"t": "de pil", "d": "Bevat een vorm van oestrogeen en een nagemaakt progesteron; houdt de hypofyse geremd, zodat geen follikel rijpt en de LH-piek uitblijft."},
  {"t": "eiwithormoon", "d": "vwo · Hormoon dat uit aminozuren bestaat (zoals FSH en LH); wordt in de darm verteerd en bindt aan een receptor op het celmembraan."},
  {"t": "steroïdhormoon", "d": "vwo · Hormoon gemaakt van cholesterol (zoals oestrogeen en progesteron); gaat door het celmembraan en bindt aan een receptor in de cel."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
