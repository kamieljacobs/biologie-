import json
film = {
 "slug": "biotechnologie-3-mag-dat", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Mag dat?", "sub": "regels en ethiek rond ggo's",
 "puzzle": "Waarom mag genetisch aangepaste maïs in Amerika wel en in Europa bijna niet op het veld?",
 "meta": "biotechnologie · mbo, hbo en wo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Biotechnologie en life sciences",
 "lead": "Sams ggo-bacteriën mogen in een afgesloten vat groeien, maar een Nederlandse boer mag geen ggo-maïs zaaien. Werken met ggo's binnen heet ingeperkt gebruik; een akker is introductie in het milieu en wordt anders beoordeeld. De wet kijkt naar de techniek: klassieke mutagenese is uitgezonderd, CRISPR-planten vallen er volgens het Europees Hof wel onder. EFSA beoordeelt de risico's per ggo, de Commissie en de lidstaten beslissen. Amerika kijkt vooral naar het product; in Europa is één ggo-gewas toegelaten voor teelt, en Nederland heeft die teelt uitgesloten. De nieuwe Europese wet voor CRISPR-planten geldt vanaf juli 2028. Of je ggo's wilt, hangt ook af van wat je belangrijk vindt.",
 "endHaak": "en wat vind jij belangrijk?",
 "minis": {"Hoofdstuk 1": "Waarom mag een ggo-bacterie in een vat wel?",
           "Hoofdstuk 2": "Wat is een ggo volgens de wet?",
           "Hoofdstuk 3": "Wie beslist of een ggo veilig is?",
           "Hoofdstuk 4": "Waarom doet Amerika het anders?",
           "Hoofdstuk 5": "Wat verandert er voor CRISPR-planten?",
           "Hoofdstuk 6": "Hoe weeg je feiten en waarden?",
           "Recap": "Waarom mag ggo-maïs in Europa bijna niet het veld op?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Sam en Procestechnoloog Merel (castboek). Stijl: Stijlkaart biologiefilms (Part C). Stand van de regels: oktober 2026. Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Sams ggo-bacteriën mogen in de fabriek groeien. Waarom mag dat wel, terwijl een Nederlandse boer geen ggo-maïs mag zaaien?", "correct": 1,
          "explain": "In het vat blijven de bacteriën binnen: dat heet ingeperkt gebruik. Een akker is open; stuifmeel en zaad komen in het milieu. Dat wordt anders beoordeeld."},
  "q07": {"q": "Veredelaars bestralen zaad, zodat er willekeurige mutaties ontstaan. Valt zo'n plant onder de ggo-regels?", "correct": 0,
          "explain": "Klassieke mutagenese met straling of chemicaliën wordt al lang gebruikt en is uitgezonderd. Planten uit nieuwe technieken zoals CRISPR vallen er volgens het Europees Hof (2018) wel onder."},
  "q11": {"q": "EFSA beoordeelt de risico's van een ggo. Wie neemt daarna het besluit?", "correct": 2,
          "explain": "EFSA adviseert. De Europese Commissie doet een voorstel en de lidstaten stemmen; komt er geen meerderheid, dan beslist de Commissie."},
  "q17": {"q": "In Spanje groeit ggo-maïs (MON810). Waarom niet in Nederland?", "correct": 1,
          "explain": "Sinds 2015 mag elk EU-land de teelt van ggo-gewassen verbieden. Nederland deed dat. Import van ggo-soja voor veevoer mag wel, na een toelating per ggo."},
  "q21": {"q": "Is een CRISPR-plant van categorie 1 nu, in oktober 2026, een ggo?", "correct": 2,
          "explain": "De nieuwe wet is van kracht sinds 16 juli 2026, maar de regels gelden pas vanaf 17 juli 2028. Tot dan zijn CRISPR-planten ggo's."},
  "q27": {"q": "Welke van deze uitspraken is een waarde, en geen feit?", "correct": 0,
          "explain": "Of een etiket belangrijker is dan een lage prijs, kun je niet meten: dat weeg je af. De andere twee kun je met onderzoek nagaan."}
 },
 "glossary": [
  {"t": "ggo", "d": "Genetisch gemodificeerd organisme: volgens de wet een organisme waarvan het DNA is veranderd op een manier die niet vanzelf gebeurt bij voortplanting of kruisen."},
  {"t": "ingeperkt gebruik", "d": "Werken met ggo's in een afgesloten ruimte (lab, kas, fabriek) waar ze niet uit kunnen; vier inperkingsniveaus, van melding tot vergunning vooraf."},
  {"t": "introductie in het milieu", "d": "Werken met ggo's buiten een afgesloten ruimte, zoals op een proefveld of bij teelt."},
  {"t": "klassieke mutagenese", "d": "Mutaties opwekken met straling of chemicaliën; al lang in gebruik en uitgezonderd van de ggo-regels."},
  {"t": "EFSA", "d": "Europese Autoriteit voor voedselveiligheid; beoordeelt de risico's van een ggo en adviseert. De Europese Commissie en de lidstaten beslissen."},
  {"t": "voorzorgsbeginsel", "d": "Bij twijfel over risico's ben je voorzichtig, ook voordat schade bewezen is (vereenvoudigd)."},
  {"t": "opt-out", "d": "Sinds 2015 mag elk EU-land de teelt van een toegelaten ggo-gewas op zijn grondgebied verbieden; Nederland deed dat voor MON810."},
  {"t": "nieuwe genomische technieken (NGT)", "d": "Technieken zoals CRISPR. Volgens de nieuwe EU-wet (geldt vanaf 17 juli 2028) is een categorie 1-plant een gewone plant (zaad met etiket), een categorie 2-plant blijft ggo."},
  {"t": "feit en waarde", "d": "Een feit kun je met onderzoek nagaan; een waarde is wat je belangrijk vindt en weeg je af."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
