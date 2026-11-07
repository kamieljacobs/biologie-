import json
film = {
 "slug": "mbrt-1-in-het-lichaam-kijken", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "In het lichaam kijken", "sub": "röntgen, MRI, echo en CT",
 "puzzle": "Waarom zie je een botbreuk op een röntgenfoto, en een gescheurde kruisband niet?",
 "meta": "medische beeldvorming · hbo", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Medische beeldvorming (MBRT)",
 "lead": "Opa Henk valt van een ladder; Lotte scheurt haar kruisband. Op een röntgenfoto zie je wat straling tegenhoudt: bot wel, een band niet. Een MRI gebruikt geen röntgenstraling maar een sterke magneet, en meet het signaal van waterstof: zo zie je banden en vocht. Een echo meet teruggekaatst geluid: vocht is zwart, en achter lucht en bot zie je niets. Een CT maakt met röntgenstraling plakjes van je lichaam. Die lees je als een radioloog: vanaf de voeten, dus rechts van de patiënt staat links in beeld.",
 "endHaak": "welk apparaat zou jij kiezen voor een hersenschudding, een zwangerschap of een longontsteking?",
 "minis": {"Hoofdstuk 1 — Röntgen: wat houdt de straling tegen?": "Waarom is bot wit op een röntgenfoto?", "Hoofdstuk 2 — MRI: luisteren naar waterstof": "Wat meet een MRI eigenlijk?", "Hoofdstuk 3 — Echo: geluid dat terugkaatst": "Waarom is vocht zwart op een echo?", "Hoofdstuk 4 — CT: het lichaam in plakjes": "Waarom staat de lever links op het scherm?", "Recap": "Welk apparaat kies je waarvoor?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Dr. Kim, Opa Henk, Noor en Lotte (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Waarom zie je een botbreuk wel op een röntgenfoto, en een gescheurde kruisband niet?", "correct": 0, "explain": "Bot zit vol kalk en houdt veel straling tegen: het wordt wit. Een band houdt ongeveer even veel tegen als de spieren eromheen, dus hij valt weg in hetzelfde grijs."},
  "q06": {"q": "Op de MRI van Lottes knie zit een lichte vlek in de onderbroken kruisband. Waardoor is die licht?", "correct": 2, "explain": "Na een scheur loopt er vocht en bloed in het weefsel. Daarin zit veel vrij water met veel waterstof, en dat geeft veel signaal."},
  "q09": {"q": "Als er bloed in Henks buik zit, hoe ziet Dr. Kim dat op de echo?", "correct": 1, "explain": "Bloed is vocht. In vocht zitten bijna geen grenzen, dus er kaatst weinig geluid terug: vocht is zwart, ook tussen de grijze lever en de milt."},
  "q12": {"q": "De lever ligt rechts in je buik, maar staat links op het CT-scherm. Hoe kan dat?", "correct": 1, "explain": "Een plak bekijk je alsof je bij de voeten van de patiënt staat, met de buik boven. Zijn rechterkant staat dan links in beeld."}
 },
 "glossary": [
  {"t": "röntgenstraling", "d": "Straling die door je lichaam gaat; bot houdt veel tegen (wit), lucht bijna niets (zwart), spier, vet en banden zitten ertussen (grijs)."},
  {"t": "röntgenfoto", "d": "Eén opname waarop alles wat achter elkaar ligt over elkaar heen valt; goed voor bot en longen, niet voor banden."},
  {"t": "CT-scan", "d": "Röntgenbuis die rond de patiënt draait; een computer rekent uit duizenden metingen plakjes (doorsneden) uit. Meer straling dan een foto."},
  {"t": "MRI", "d": "Beeld uit het radiosignaal van waterstofkernen in een sterk magneetveld, na een korte radiogolf; zonder röntgenstraling. Goed voor banden, kraakbeen, hersenen en vocht."},
  {"t": "echo (echografie)", "d": "Hoog geluid dat bij grenzen tussen weefsels terugkaatst; de tijd tot de echo bepaalt de diepte. Vocht is zwart; achter lucht en bot zie je niets."},
  {"t": "stralingsdosis", "d": "Hoeveel straling je lichaam opneemt (in millisievert); een longfoto is ongeveer een week van de straling die altijd om je heen is."},
  {"t": "doorsnede (plak)", "d": "Beeld van één dun plakje van het lichaam; je kijkt vanaf de voeten, dus rechts van de patiënt staat links in beeld."},
  {"t": "radioloog", "d": "Medisch specialist die beelden beoordeelt en sommige ingrepen onder beeld doet; na geneeskunde vijf jaar opleiding."},
  {"t": "MBRT", "d": "Hbo-opleiding Medisch Beeldvormende en Radiotherapeutische Technieken (vier jaar): je maakt beelden en geeft bestralingen."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
