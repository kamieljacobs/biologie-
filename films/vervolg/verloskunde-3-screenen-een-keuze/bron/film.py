import json
film = {
 "slug": "verloskunde-3-screenen-een-keuze", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Screenen: een keuze", "sub": "NIPT, 20-wekenecho en een uitslag goed uitleggen",
 "puzzle": "De NIPT wijst op Patau. Is het kind dan ziek?",
 "meta": "verloskunde · prenatale screening", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Verloskunde",
 "lead": "Een afwijkende NIPT-uitslag klinkt als zekerheid, maar dat is hij niet. Hoe voert Verloskundige Mirjam het gesprek over screening zonder advies te geven, wat zoeken de NIPT en de 20-wekenecho, en waarom is een uitslag bij Patau maar in de helft van de gevallen terecht?",
 "endHaak": "zou jij het willen weten, en waarom wel of niet?",
 "minis": {"Hoofdstuk 1": "Wat betekent neutraal informeren?", "Hoofdstuk 2": "Waar zoeken de NIPT en de 20-wekenecho naar?", "Hoofdstuk 3": "Waarom is een afwijkende NIPT geen zekerheid?", "Hoofdstuk 4": "Welke test zegt iets over het kind zelf?", "Recap": "Wat is de moeilijkste taak in dit gesprek?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Verloskundige Mirjam en Esra (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "De NIPT wijst op Patau. Hoe groot is de kans dat het kind het echt heeft?", "correct": 1, "explain": "Ongeveer de helft: van de ongeveer tien afwijkende uitslagen per tienduizend zwangeren is er ongeveer de helft terecht."},
  "q12": {"q": "Waar komt een vals alarm bij de NIPT vaak vandaan?", "correct": 2, "explain": "Het DNA komt uit de placenta. Soms hebben alleen placentacellen het extra chromosoom en heeft het kind zelf gewone chromosomen."},
  "q16": {"q": "Welke test zegt het meest over het kind zelf?", "correct": 1, "explain": "De vruchtwaterpunctie: in het vruchtwater drijven cellen van het kind zelf. De vlokkentest kijkt naar de placenta."}
 },
 "glossary": [
  {"t": "screening", "d": "Een onderzoek dat aan alle zwangeren wordt aangeboden zonder dat er klachten zijn; meedoen is een eigen keuze."},
  {"t": "neutraal informeren", "d": "Uitleggen wat een test kan en wat een uitslag betekent, zonder advies te geven; de zwangere beslist zelf."},
  {"t": "NIPT", "d": "Niet-invasieve prenatale test: bloedtest vanaf tien weken die de vrije DNA-stukjes in het bloed van de moeder onderzoekt; ongeveer een tiende komt uit de placenta op trisomie 21, 18 en 13."},
  {"t": "trisomie", "d": "Een chromosoom drie keer in plaats van twee keer: 21 (Down), 18 (Edwards), 13 (Patau)."},
  {"t": "20-wekenecho", "d": "Structureel echoscopisch onderzoek rond twintig weken naar afwijkingen in de bouw, zoals van hart, ruggetje, lip en buikwand."},
  {"t": "voorspellende waarde", "d": "De kans dat een afwijkende uitslag terecht is; lager bij een zeldzame aandoening, omdat vals alarm dan zwaarder meeweegt."},
  {"t": "placentamozaïek", "d": "Een afwijking in het aantal chromosomen die alleen in (een deel van) de placenta zit, niet bij het kind."},
  {"t": "vlokkentest", "d": "Wegnemen van een klein stukje placenta, vanaf ongeveer elf weken; kleine kans op een miskraam."},
  {"t": "vruchtwaterpunctie", "d": "Opzuigen van wat vruchtwater met losse cellen van het kind, vanaf ongeveer vijftien weken; kleine kans op een miskraam."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
