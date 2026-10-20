import json
film = {
 "slug": "geneeskunde-3-welk-antibioticum", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Welk antibioticum?", "sub": "kweek, antibiogram en de keuze van de arts",
 "puzzle": "Waarom kiest een arts liever een smal antibioticum dan een middel dat bijna alles doodt?",
 "meta": "geneeskunde · farmacie", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Geneeskunde en Farmacie",
 "lead": "Noor heeft een blaasontsteking, door een bacterie. Een antibioticum grijpt aan op iets wat alleen de bacterie heeft: de celwand, de ribosomen of het kopiëren van het DNA. Daarom spaart het jouw cellen, en helpt het niet tegen een virus. Werkt het eerste middel niet, dan kweekt het lab de bacterie en maakt een antibiogram: rond een schijfje zonder heldere ring is de bacterie resistent. De arts kiest zo smal en zo kort als het kan, want een breed middel selecteert resistente bacteriën in je darm. In het ziekenhuis werken arts, microbioloog en apotheker samen om resistente bacteriën zoals MRSA buiten de deur te houden.",
 "endHaak": "zou jij liever in de spreekkamer, in het lab of in de apotheek werken?",
 "minis": {"Hoofdstuk 1": "Waarom spaart een antibioticum jouw cellen?", "Hoofdstuk 2": "Wat betekent een schijfje zonder heldere ring?", "Hoofdstuk 3": "Waarom niet meteen het breedste middel?", "Hoofdstuk 4": "Waarom wordt iemand uit een buitenlands ziekenhuis eerst apart verpleegd?", "Recap": "Hoe werd Noor toch beter?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Noor (patiënt) en Dr. Kim (huisarts) (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Noor heeft een blaasontsteking door een bacterie. Welk middel kiest Dr. Kim het liefst?", "correct": 1,
          "explain": "Een smal middel tegen de bacteriën die blaasontsteking geven. Zo raak je zo min mogelijk andere bacteriën, en krijgen resistente bacteriën minder kans."},
  "q06": {"q": "Rond één schijfje op de voedingsbodem is geen heldere ring te zien. Wat betekent dat?", "correct": 2,
          "explain": "De bacteriën groeien tot tegen het schijfje aan: het middel remt ze niet. De bacterie is resistent tegen dat middel."},
  "q10": {"q": "Een patiënt uit een buitenlands ziekenhuis wordt eerst apart verpleegd en getest op MRSA. Wat is daarvan het belangrijkste doel?", "correct": 0,
          "explain": "Voorkomen dat de bacterie naar andere patiënten gaat. Wie MRSA bij zich draagt is vaak niet ziek, maar kan anderen via handen en materialen besmetten."}
 },
 "glossary": [
  {"t": "antibioticum", "d": "Middel dat bacteriën doodt of hun groei remt door aan te grijpen op iets wat alleen bacteriën hebben, zoals de celwand, de bacteriële ribosomen of het kopiëren van het DNA. Werkt niet tegen virussen."},
  {"t": "celwand (bacterie)", "d": "Stevige laag om het celmembraan van een bacterie. Penicilline verstoort de bouw ervan, waardoor de bacterie knapt. Menselijke cellen hebben geen celwand."},
  {"t": "breed en smal antibioticum", "d": "Een breed middel werkt tegen veel soorten bacteriën, ook nuttige in je darm; een smal middel tegen een beperkt aantal soorten. Artsen kiezen zo smal en zo kort als het kan."},
  {"t": "kweek", "d": "Bacteriën uit bijvoorbeeld urine laten groeien op een voedingsbodem, zodat het lab kan zien welke bacterie het is en waartegen die gevoelig is."},
  {"t": "kolonie", "d": "Zichtbaar hoopje bacteriën op een voedingsbodem, gegroeid uit één of een paar bacteriën."},
  {"t": "antibiogram", "d": "Overzicht van de middelen waartegen een gekweekte bacterie gevoelig of resistent is, bijvoorbeeld gemaakt met schijfjes met antibiotica en de heldere ringen eromheen."},
  {"t": "resistentie", "d": "Een bacterie is resistent als een antibioticum haar niet meer remt. De bacterie wordt resistent, niet de mens; een antibioticum selecteert resistente bacteriën die er toevallig al waren."},
  {"t": "MRSA", "d": "Staphylococcus aureus die resistent is tegen de gewone middelen uit de penicillinegroep. Dragers zijn vaak niet ziek, maar kunnen anderen besmetten; in Nederland wordt hij actief opgespoord."},
  {"t": "apotheker", "d": "Zorgverlener die controleert of een middel en de dosis passen bij de patiënt, bijvoorbeeld bij andere medicijnen en bij hoe goed de nieren werken."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
