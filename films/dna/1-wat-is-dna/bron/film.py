import json
film = {
 "slug": "1-wat-is-dna", "hoofdstuk": "dna", "hoofdstukNaam": "DNA",
 "title": "Wat is DNA?", "sub": "de bouw van het molecuul van erfelijkheid",
 "puzzle": "Hoeveel DNA zit er in één cel, en hoe past dat? En hoe kan het DNA van Noor anders zijn dan het jouwe, met dezelfde bouwstenen?",
 "meta": "dna 1/8", "version": "3.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks DNA · film 1 van 8 · volgende: <a href=\"2-dna-kopieren.html\">DNA kopiëren</a>",
 "lead": "Noor haalt in een buisje haar eigen DNA uit wangcellen: witte draadjes. We zoomen in van haar wangcel tot op het molecuul: twee meter DNA per cel, om eiwitten gewikkeld; een ladder van nucleotiden die als helix draait; basen die alleen in vaste paren passen, en waarom. Daarna gen, genoom en coderend DNA. Het vwo-blok: antiparallel, waterstofbruggen en de verpakking in nucleosomen en chromatine.",
 "endHaak": "Hoe kopieert een cel die twee meter DNA voor elke nieuwe cel?",
 "minis": {
  "Hoofdstuk 1 — Van wang tot molecuul": "Hoeveel DNA zit er in één cel, en hoe past het?",
  "Hoofdstuk 2 — De bouwsteen en de ladder": "Waarom staat tegenover A altijd T?",
  "Hoofdstuk 3 — Van volgorde tot gen tot genoom": "Waarin verschilt jouw DNA van dat van een ander?",
  "Hoofdstuk 4 — Richting, bruggen en verpakking": "Hoe lopen de strengen, en wat houdt ze bij elkaar?",
  "Samenvatting — Terug naar het buisje": "Wat zijn die witte draadjes eigenlijk?"
 },
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personage: Noor uit het castboek. Tekeningen: gedeelde bibliotheek (basevorm van de DNA-reeks, celkern, DNA rond eiwitten). Stijl: Part C van de filmprompt (v10). Versie 3.0 · oktober 2026.",
 "questions": {
  "q06": {"q": "Als je alle 46 chromosomen van één cel achter elkaar legt, hoe lang is dat dan?", "correct": 2,
          "explain": "Ongeveer twee meter: ruim zes miljard basenparen van 0,34 nanometer. Chromosoom 1 alleen is al zo'n acht centimeter."},
  "q13": {"q": "Van één streng is de volgorde A T T G C. Welke basen staan daar tegenover?", "correct": 1,
          "explain": "Tegenover A staat T, tegenover T staat A, tegenover G staat C: T A A C G."},
  "q19": {"q": "Welk deel van jouw DNA codeert echt voor eiwitten?", "correct": 2,
          "explain": "Minder dan twee procent. De rest is niet-coderend DNA; een deel daarvan regelt wanneer genen aan of uit staan."},
  "q25": {"q": "Twee stukjes DNA zijn even lang. Het ene heeft veel C en G, het andere veel A en T. Welk stukje laat bij verwarmen het eerst los?", "correct": 1,
          "explain": "Het stuk met veel A en T: een A–T-paar houdt minder stevig vast dan een C–G-paar (twee bruggen in plaats van drie)."}
 },
 "glossary": [
  {"t": "DNA", "d": "Desoxyribonucleïnezuur; bevat de informatie voor alle erfelijke eigenschappen van een organisme."},
  {"t": "nucleotide", "d": "Bouwsteen van DNA: een fosfaatgroep, de suiker desoxyribose en een stikstofbase (A, T, C of G)."},
  {"t": "basenparing", "d": "Tegenover A staat altijd T, tegenover C altijd G: een grote base (A, G: twee ringen) past alleen bij de kleine base (T, C: één ring) waarvan de bindingsplekken tegenover de zijne liggen."},
  {"t": "dubbelstrengs DNA", "d": "Twee nucleotideketens die door basenparing aan elkaar vastzitten."},
  {"t": "helixstructuur", "d": "De twee ketens zijn in een rechtsdraaiende spiraal om elkaar heen gedraaid."},
  {"t": "chromosoom", "d": "Eén heel lang DNA-molecuul, opgerold rond eiwitten. De mens heeft er 46 per cel."},
  {"t": "nucleotidenvolgorde / DNA-sequentie", "d": "De volgorde van de nucleotiden in een DNA-molecuul; hierin zit de informatie."},
  {"t": "gen", "d": "Een stuk DNA met de informatie voor één eiwit."},
  {"t": "genoom", "d": "Alle DNA in een cel van een organisme."},
  {"t": "coderend en niet-coderend DNA", "d": "DNA dat wel, respectievelijk niet, codeert voor eiwitten. Bij de mens codeert minder dan 2 % voor eiwitten."},
  {"t": "plasmide", "d": "Een klein, los ringetje DNA in een bacterie, naast het ringvormige chromosoom."},
  {"t": "complementair", "d": "Elke base in de ene streng heeft een vaste partner in de andere; ken je de ene streng, dan ken je de andere.", "vwo": True},
  {"t": "antiparallel", "d": "De twee strengen lopen in tegengestelde richting: 5'→3' naast 3'→5'.", "vwo": True},
  {"t": "5'- en 3'-uiteinde", "d": "Aan het 5'-uiteinde een vrije fosfaatgroep aan koolstofatoom 5 van de suiker, aan het 3'-uiteinde een vrije OH-groep aan koolstofatoom 3.", "vwo": True},
  {"t": "waterstofbrug", "d": "Zwakke binding tussen de basen van een paar: twee bij A–T, drie bij C–G.", "vwo": True},
  {"t": "hybridisatie", "d": "Het weer paren van losse strengen met een passende volgorde, bijvoorbeeld na verhitten en afkoelen.", "vwo": True},
  {"t": "histonen, nucleosoom, chromatine", "d": "Histonen zijn eiwitten waar DNA omheen gewikkeld is; acht histonen met het DNA eromheen vormen een nucleosoom; de opgevouwen kralenketting van nucleosomen is chromatine.", "vwo": True}
 ]
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
