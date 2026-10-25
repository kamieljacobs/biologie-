import json
film = {
 "slug": "biotechnologie-1-bacterien-als-fabriek", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Bacteriën als fabriek", "sub": "van gen tot medicijn",
 "puzzle": "Eén bacterie maakt maar een beetje insuline. Hoe krijg je genoeg voor miljoenen mensen, en zuiver genoeg om te spuiten?",
 "meta": "biotechnologie · mbo, hbo en wo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Biotechnologie en life sciences",
 "lead": "Sam loopt stage bij een biotechbedrijf. Vroeger kwam insuline uit alvleesklieren van varkens en runderen; nu zet je het menselijke insulinegen in een bacterie of gist, die het afleest. Maar van één reageerbuisje naar genoeg voor miljoenen mensen is een heel proces. Opschalen: cellen verdubbelen, maar in een groot vat krijgen ze te weinig zuurstof, dus groeien ze in een bioreactor die belucht, roert en regelt, en schaal je in stappen op. Zuiveren: bij E. coli zit de voorloper als klont in de cel, die je oplost, laat vouwen en knipt; kolommen scheiden de insuline van de rest. Hetzelfde principe zit in je eten: stremsel voor kaas, gist in bier en schimmel als vleesvervanger.",
 "endHaak": "mag je zulke cellen zomaar gebruiken?",
 "minis": {"Hoofdstuk 1": "Hoe gaat een bacterie menselijke insuline maken?",
           "Hoofdstuk 2": "Waarom is een tien keer groter vat niet tien keer zoveel insuline?",
           "Hoofdstuk 3": "Hoe haal je de insuline uit een vat vol bacteriën?",
           "Hoofdstuk 4": "Wat hebben kaas, bier en een vleesvervanger met insuline te maken?",
           "Recap": "Van één reageerbuisje naar miljoenen mensen"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Sam en Procestechnoloog Merel (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Vroeger kwam insuline van het slachthuis. Hoe gaat een bacterie insuline maken, precies zoals die van jou?", "correct": 0,
          "explain": "Je zet het menselijke insulinegen in de bacterie (in een plasmide). De bacterie leest het af zoals haar eigen genen. Ze maakt het niet omdat het nuttig voor haar is: zelf heeft ze er niets aan."},
  "q08": {"q": "Sams bacteriën zijn genetisch gemodificeerd. Wat is dan de insuline die ze maken?", "correct": 1,
          "explain": "Insuline is een eiwit. Alleen een organisme kan genetisch gemodificeerd zijn. Het is menselijke insuline, gemaakt door een gemodificeerde cel."},
  "q11": {"q": "Sam zet een vat met tien keer zoveel inhoud in, met dezelfde voeding. De volgende ochtend zijn de cellen veel trager gegroeid. Waarom?", "correct": 2,
          "explain": "Zuurstof lost slecht op in water. In een groter vat neemt de inhoud sneller toe dan het oppervlak waardoor zuurstof binnenkomt, dus elke liter krijgt minder aanvoer (vereenvoudigd)."},
  "q15": {"q": "Je hebt één liter dichte kweek en wilt duizend liter even dicht. Hoe vaak moeten de cellen zich verdubbelen?", "correct": 1,
          "explain": "Elke verdubbeling geeft twee keer zoveel: na tien keer is het 2¹⁰ = 1024 keer zoveel. Bacteriën groeien dus niet in een rechte lijn."},
  "q18": {"q": "Sam wil de cellen uit het vat filteren en de heldere vloeistof houden. Waar zit de insuline bij E. coli?", "correct": 2,
          "explain": "Bij E. coli klontert de voorloper van insuline meestal samen in de cel. Je houdt dus juist de cellen, breekt ze open, lost de klonten op en laat het eiwit goed vouwen."},
  "q25": {"q": "Sommige vleesvervangers zijn gemaakt van een schimmel die groeit in een vat waar lucht doorheen stroomt. Is dat ook fermentatie?", "correct": 0,
          "explain": "In de industrie heet elk proces waarin micro-organismen in een vat een product maken fermentatie, met of zonder zuurstof. Gisting is smaller: suiker omzetten zonder dat er zuurstof aan te pas komt."}
 },
 "glossary": [
  {"t": "biotechnologie", "d": "Organismen of hun onderdelen (cellen, enzymen) laten werken om een product te maken."},
  {"t": "genetisch gemodificeerd organisme (ggo)", "d": "Organisme waarvan het DNA op een manier is veranderd die in de natuur niet vanzelf gebeurt. Een eiwit dat zo'n organisme maakt, zoals insuline, is zelf geen ggo."},
  {"t": "plasmide", "d": "Klein ringetje DNA in een bacterie. Je kunt er een gen in plakken, zoals het menselijke insulinegen (zie de film DNA lezen)."},
  {"t": "bioreactor", "d": "Afgesloten vat waarin cellen groeien onder geregelde omstandigheden: temperatuur, zuurgraad, zuurstof en voeding."},
  {"t": "opschalen", "d": "Een kweek in stappen groter maken: van reageerbuisje via kolf en voorkweektank naar een productietank."},
  {"t": "zuiveren", "d": "Het product scheiden van de cellen, de voeding en de andere eiwitten, bijvoorbeeld met een centrifuge en met kolommen die op lading of een andere eigenschap scheiden."},
  {"t": "voorloper", "d": "Eén lange eiwitketen waaruit enzymen een middenstuk knippen; wat overblijft zijn de twee ketens van insuline, met bruggen."},
  {"t": "fermentatie", "d": "In de industrie: elk proces waarin micro-organismen in een vat een product maken, met of zonder zuurstof."},
  {"t": "gisting", "d": "Suiker omzetten zonder dat er zuurstof aan te pas komt, bijvoorbeeld in alcohol en koolzuurgas (zie Alles op adem)."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
