import json
film = {
 "slug": "biotechnologie-2-enzymen-op-maat", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Enzymen op maat", "sub": "van wasmiddel tot medicijn",
 "puzzle": "Hoe maak je een enzym dat al bij 30 graden vlekken uit je kleren haalt?",
 "meta": "biotechnologie · mbo, hbo en wo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Biotechnologie en life sciences",
 "lead": "Sam krijgt een stageopdracht: een enzym dat een eivlek al bij 30 graden weghaalt. Een protease knipt de eiwitketens van de vlek in stukjes, en wassen op 30 in plaats van 40 graden bespaart ongeveer een derde energie. Maar het startenzym is traag in de kou en kan slecht tegen bleekmiddel. Met gerichte evolutie maakt Sam willekeurige veranderingen in het gen, test duizenden varianten op een melkplaat en in een putjesplaat, en laat de beste doorgaan, ronde na ronde. Gericht ontwerp kan ook: één aminozuur vervangen, maar het effect is moeilijk te voorspellen. Een productiecel maakt daarna het winnende enzym in een bioreactor; zo maakt de industrie ook medicijnen zoals sitagliptine.",
 "endHaak": "welke regels gelden er voor zulke cellen?",
 "minis": {"Hoofdstuk 1": "Waarop test je een nieuw enzym?",
           "Hoofdstuk 2": "Hoeveel van duizend varianten zijn beter?",
           "Hoofdstuk 3": "Welke variant mag door, en kan het ook gericht?",
           "Hoofdstuk 4": "Hoe wordt een winnende variant een product?",
           "Recap": "Hoe maak je een enzym voor 30 graden?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Sam en Procestechnoloog Merel (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Op Sams witte broek zit een eivlek. Wat doet een enzym met zo'n vlek?", "correct": 1,
          "explain": "Een protease knipt de lange eiwitketens in kleine stukjes, die oplossen en wegspoelen. Het enzym raakt niet op: na elke knip is het vrij voor de volgende keten."},
  "q08": {"q": "Sam maakt duizenden varianten van het enzym. Onder welke omstandigheden test hij ze?", "correct": 0,
          "explain": "Zoals in de wasmachine: dertig graden, basisch, met bleek. Je vindt alleen waar je op test; een variant die warm goed knipt, kan bij dertig graden traag zijn."},
  "q11": {"q": "Sam telt duizend kolonies op de melkplaat. Hoeveel zijn er beter dan het startenzym?", "correct": 1,
          "explain": "Maar een paar. Een willekeurige verandering verstoort vaak de vorm van het eiwit; soms werkt die net iets beter. Die paar zoek je."},
  "q15": {"q": "Variant één knipt het snelst maar overleeft bleek slecht, variant twee is op allebei iets beter, variant drie overleeft bleek het best maar knipt trager. Welke mag door?", "correct": 2,
          "explain": "In de wasmachine moet het enzym snel knippen én bleek overleven, tegelijk. Variant twee gaat door en wordt opnieuw veranderd."},
  "q18": {"q": "Sam vervangt methionine op plek 222 door alanine. Wat gebeurt er?", "correct": 0,
          "explain": "Bleek kan daar niets meer beschadigen, maar zulke varianten knippen vaak trager: één ander aminozuur verandert de vorm een beetje. Wat een verandering doet, is moeilijk te voorspellen."},
  "q23": {"q": "Het gen van de winnaar zit in een Bacillus-bacterie in een grote tank. Waar zit het enzym na de fermentatie?", "correct": 2,
          "explain": "Meestal geven de cellen het enzym af aan de vloeistof. Je filtert de cellen eruit en zuivert het enzym."}
 },
 "glossary": [
  {"t": "enzym", "d": "Eiwit dat een reactie versnelt en zelf niet verbruikt wordt (zie Alles versneld)."},
  {"t": "protease", "d": "Enzym dat eiwitten knipt. In wasmiddel knipt het eiwitvlekken, zoals ei en bloed, in stukjes die wegspoelen."},
  {"t": "amylase en lipase", "d": "Amylase knipt zetmeel, lipase vet. Wasmiddel bevat een mengsel van zulke enzymen."},
  {"t": "variant", "d": "Een versie van een enzym met één of meer andere aminozuren, doordat het gen veranderd is."},
  {"t": "gerichte evolutie", "d": "Willekeurige veranderingen in een gen maken, de varianten testen, de beste kiezen en dat herhalen, ronde na ronde."},
  {"t": "gericht ontwerp", "d": "Op basis van de bouw van het eiwit één bepaald aminozuur vervangen door het gen op die plek te veranderen."},
  {"t": "screenen", "d": "Heel veel varianten tegelijk testen, bijvoorbeeld op een melkplaat (heldere ring) of in een plaat met 96 putjes."},
  {"t": "octrooi", "d": "Recht dat een ander een uitvinding niet zomaar mag namaken; in Europa tot twintig jaar na de aanvraag."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
