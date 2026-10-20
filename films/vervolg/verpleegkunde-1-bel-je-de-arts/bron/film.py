import json
film = {
 "slug": "verpleegkunde-1-bel-je-de-arts", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Bel je de arts?", "sub": "vitale functies meten en op tijd aan de bel trekken",
 "puzzle": "Geen enkele meting van Opa Henk is echt slecht. Waarom belt Verpleegkundige Jesse toch de arts?",
 "meta": "verpleegkunde · vitale functies", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Verpleegkunde",
 "lead": "Opa Henk ligt met een longontsteking in het ziekenhuis. 's Middags ademt hij sneller, zijn hart klopt sneller en hij is moe, maar geen enkele meting is echt alarmerend. Verpleegkundige Jesse meet zes vitale functies: pols, bloeddruk, ademfrequentie, saturatie, temperatuur en bewustzijn. De saturatiemeter laat zien welk deel van de hemoglobine zuurstof draagt. De ademfrequentie verandert vaak als eerste, maar wordt het vaakst overgeslagen. In een waarschuwingsscore tellen de kleine afwijkingen op: van één punt 's ochtends naar zeven 's middags. Met SBAR belt Jesse de arts kort en volledig.",
 "endHaak": "zou jij durven bellen als je score laag is, maar je het niet vertrouwt?",
 "minis": {"Hoofdstuk 1": "Wat betekent een saturatie van 93 procent?", "Hoofdstuk 2": "Waarom verandert de ademfrequentie vaak als eerste?", "Hoofdstuk 3": "Hoe komt Henk aan zeven punten?", "Hoofdstuk 4": "Waar staan de letters van SBAR voor?", "Recap": "Via welke opleidingen word je verpleegkundige?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Opa Henk, Verpleegkundige Jesse en Dr. Kim (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Henk ademt wat sneller, zijn hart klopt wat sneller en hij is moe, maar geen enkele meting is echt alarmerend. Belt Jesse de arts?", "correct": 1, "explain": "Ja. Losse, licht afwijkende metingen kunnen samen wijzen op achteruitgang. In een waarschuwingsscore tellen ze op: bij Henk van één naar zeven punten."},
  "q05": {"q": "De saturatiemeter op Henks vinger geeft 93 procent aan. Wat betekent dat?", "correct": 0, "explain": "93 procent van zijn hemoglobine draagt zuurstof. Het zegt niets over hoeveel zuurstof er in totaal in het bloed zit, en ook niet hoe goed de longen werken in procenten."},
  "q10": {"q": "Jesse belt Dr. Kim. Wat zegt hij als eerste?", "correct": 2, "explain": "Eerst de Situatie: wie hij is, over wie hij belt en wat het probleem is. Daarna Achtergrond, Beoordeling en Aanbeveling (SBAR)."}
 },
 "glossary": [
  {"t": "vitale functies", "d": "Metingen die laten zien hoe het met de basisfuncties van het lichaam gaat: pols, bloeddruk, ademfrequentie, saturatie, temperatuur en bewustzijn."},
  {"t": "ademfrequentie", "d": "Het aantal ademhalingen per minuut; in rust bij volwassenen ongeveer 12 tot 20. Verandert vaak als eerste bij achteruitgang, maar wordt het vaakst overgeslagen."},
  {"t": "saturatie", "d": "Het percentage van de hemoglobine dat zuurstof draagt; bij een gezond mens meestal 95 procent of meer."},
  {"t": "saturatiemeter (pulsoximeter)", "d": "Klemmetje op een vinger dat (infra)rood licht door de vingertop schijnt; hemoglobine met en zonder zuurstof neemt dat licht anders op."},
  {"t": "hemoglobine", "d": "Eiwit in de rode bloedcellen dat zuurstof bindt en vervoert; met zuurstof helderrood, zonder zuurstof donkerder."},
  {"t": "hersenstam", "d": "Deel van de hersenen dat onder andere het ademen regelt; laat je sneller ademen als er koolstofdioxide ophoopt of te weinig zuurstof is."},
  {"t": "waarschuwingsscore (early warning score)", "d": "Elke vitale functie krijgt 0 tot 3 punten; boven een afgesproken grens belt de verpleegkundige de arts. Voorbeelden: NEWS2, en in Nederland vaak MEWS."},
  {"t": "SBAR", "d": "Vaste volgorde voor een overdracht of belgesprek: Situatie, Achtergrond, Beoordeling, Aanbeveling."},
  {"t": "longontsteking (pneumonie)", "d": "Ontsteking van de longen waarbij longblaasjes deels vollopen met vocht en ontstekingscellen, zodat er minder zuurstof doorheen komt."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
