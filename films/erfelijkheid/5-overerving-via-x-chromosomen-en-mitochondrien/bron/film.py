import json
film = {
 "slug": "5-overerving-via-x-chromosomen-en-mitochondrien",
 "hoofdstuk": "erfelijkheid",
 "hoofdstukNaam": "Erfelijkheid",
 "title": "Overerving via het X-chromosoom",
 "sub": "kleurenblind, draagster en (vwo) de moederlijn",
 "puzzle": "Waarom zijn vooral mannen kleurenblind? En hoe kan een eigenschap een generatie overslaan?",
 "meta": "erfelijkheid 5/6",
 "version": "2.0 · oktober 2026",
 "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Erfelijkheid · film 5 van 6 · vorige: <a href=\"4-dihybride-kruising-en-gekoppelde-overerving.html\">Dihybride kruising en gekoppelde overerving</a> · volgende: <a href=\"6-stambomen-en-kansrekenen.html\">Stambomen en kansrekenen</a>",
 "lead": "Een opa sorteert aardbeien en ziet rood en groen bijna hetzelfde. Zijn dochter ziet gewoon, maar haar zoons kunnen kleurenblind zijn, net als hij. Je ziet waarom: een jongen krijgt zijn X-chromosoom altijd van zijn moeder, en een man heeft van de meeste genen op zijn X maar één allel. Met de notatie Xᴬ en Xᵃ en een kruisingsschema reken je het na. In het vwo-blok: mitochondriaal DNA, dat je alleen van je moeder krijgt.",
 "endHaak": "Hoe groot is de kans dat een zoon van de dochter van opa kleurenblind is?",
 "minis": {
  "Hoofdstuk 1": "Van wie krijgt een jongen zijn X-chromosoom?",
  "Hoofdstuk 2": "Waarom maakt één allel bij een man het verschil?",
  "Hoofdstuk 3": "Hoe groot is de kans dat een zoon van een draagster kleurenblind is?",
  "Hoofdstuk 4": "Hoe slaat kleurenblindheid een generatie over?",
  "Hoofdstuk 5": "Waarom krijg je je mitochondriën alleen van je moeder?",
  "Recap": "Terug naar opa en zijn aardbeien."
 },
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: gezin De Wit uit het castboek. Kleurmodel: Viénot, Brettel & Mollon (1999). Stijl: Part C van de filmprompt (v13). Versie 2.0 · oktober 2026.",
 "questions": {
  "q07": {"q": "Van wie krijgt een jongen zijn X-chromosoom?", "correct": 1,
          "explain": "Van zijn moeder. Van zijn vader krijgt een jongen het Y-chromosoom."},
  "q17": {"q": "Een draagster (XᴬXᵃ) en een man die normaal ziet (XᴬY) krijgen een zoon. Hoe groot is de kans dat hij kleurenblind is?", "correct": 1,
          "explain": "Een zoon krijgt de Y van zijn vader en een X van zijn moeder: Xᴬ of Xᵃ, elk met een kans van ½. Een kwart is de kans dat een willekeurig kind een kleurenblinde zoon is."},
  "q24": {"q": "Opa is kleurenblind (XᵃY). Oma heeft geen allel a. Is hun dochter draagster?", "correct": 2,
          "explain": "Ja, zeker. Een vader geeft zijn enige X aan elke dochter, en bij opa is dat Xᵃ. Van oma krijgt ze Xᴬ: ze is XᴬXᵃ."},
  "q31": {"q": "Een man heeft een aandoening door een fout in zijn mitochondriaal DNA. Wie van zijn kinderen krijgt die aandoening?", "correct": 0,
          "explain": "Geen van zijn kinderen. Mitochondriën komen via de eicel; de mitochondriën van een zaadcel worden na de bevruchting afgebroken."}
 },
 "glossary": [
  {"t": "geslachtschromosomen", "d": "X en Y. Een vrouw heeft XX, een man XY. Welk geslachtschromosoom de zaadcel meebrengt, bepaalt meestal het geslacht."},
  {"t": "X-chromosomaal", "d": "Een gen dat op het X-chromosoom ligt. Je schrijft het allel als letter bij de X, bijvoorbeeld Xᴬ en Xᵃ; bij de Y staat geen letter."},
  {"t": "draagster", "d": "Een vrouw met één recessief allel op een X (XᴬXᵃ). Ze heeft het kenmerk zelf niet, maar kan het allel doorgeven."},
  {"t": "kegeltjes", "d": "Zintuigcellen in het netvlies voor kleur zien, met een lichtgevoelig eiwit voor blauw, groen of rood licht. De genen voor het groene en het rode eiwit liggen op de X."},
  {"t": "rood-groenkleurenblindheid", "d": "X-chromosomaal recessief: het gen voor het rode of het groene eiwit werkt niet goed, waardoor rood en groen op elkaar lijken. Bij ± 8 % van de mannen, ± 0,5 % van de vrouwen."},
  {"t": "hemofilie", "d": "X-chromosomaal recessieve stoornis in de bloedstolling."},
  {"t": "X-chromosomaal dominant", "d": "Het afwijkende allel op de X is dominant. Een aangedane vader geeft het aan al zijn dochters en aan geen van zijn zonen."},
  {"t": "mitochondriaal DNA", "d": "Klein, ringvormig DNA in de mitochondriën (37 genen). Wordt alleen via de eicel doorgegeven, dus van moeder op kind.", "vwo": True}
 ]
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
