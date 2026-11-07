import json
film = {
 "slug": "forensisch-2-hoe-zeker-is-een-match", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Hoe zeker is een match?", "sub": "DNA-bewijs in de rechtszaal",
 "puzzle": "Het DNA op het mes past bij de verdachte. Is hij dan de dader?",
 "meta": "forensisch onderzoek · hbo en wo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Forensisch onderzoek",
 "lead": "Op het heft van het mes uit de inbraak zit DNA dat past bij Erik. 'Hij was het', schrijft de krant. Dr. Kim, DNA-deskundige, en stagiair Bilal laten zien hoe het lab zo'n spoor weegt: met twee hypothesen naast elkaar. De matchkans van één op honderdduizend is niet de kans dat Erik onschuldig is: van de negen miljoen mannen in Nederland passen er zo'n negentig. Wel is het spoor honderdduizend keer waarschijnlijker als het DNA van Erik is: de likelihood ratio, die het NFI met een vaste schaal in woorden zet. Daarna de vraag hoe het DNA op het mes kwam: na een handdruk kan het via overdracht op een mes komen dat iemand nooit aanraakte. En een mengprofiel van drie mensen vraagt om rekensoftware. Het lab zegt hoe sterk het spoor is; de rechter weegt alles samen.",
 "endHaak": "welke vraag zou jij als advocaat aan het lab stellen?",
 "minis": {"Hoofdstuk 1 — Twee hypothesen": "Wat vraagt een DNA-deskundige zich af bij een passend profiel?",
           "Hoofdstuk 2 — Bewijskracht": "Hoeveel mannen in Nederland passen bij dit spoor?",
           "Hoofdstuk 3 — Hoe kwam het daar?": "Kan je DNA op een mes zitten dat je nooit aanraakte?",
           "Hoofdstuk 4 — Drie mensen op één mes": "Wat zegt 'niet uitgesloten' in een mengsel?",
           "Recap": "Wat zegt het DNA wél, en wat niet?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Bilal (stagiair forensisch onderzoek), Dr. Kim (DNA-deskundige), Erik (verdachte) en Joost (de bewoner), uit het castboek. De zaak is verzonnen; het deelprofiel (1 op 100.000) en de uitkomst van het mengprofiel zijn voorbeeldgetallen. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Op het mes zit DNA dat past bij Erik. 'Hij was het', staat in de kop. Is Erik dan de dader?", "correct": 2,
          "explain": "Een passend profiel is nog geen oordeel. Eerst weeg je hoe sterk het spoor is, en ook een compleet profiel zegt niet hoe het DNA op het mes kwam."},
  "q07": {"q": "De matchkans is 1 op 100.000. De officier schrijft: 'dan is de kans dat Erik onschuldig is ook 1 op 100.000.' Klopt dat?", "correct": 0,
          "explain": "Nee. De matchkans zegt hoe vaak een onbekende man bij dit spoor past. Van de ± 9 miljoen mannen in Nederland passen er naar verwachting ± 90. Wie de matchkans omdraait, maakt de denkfout van de aanklager."},
  "q12": {"q": "Bilal vraagt of Dr. Kim in het rapport ook schrijft dat Erik schuldig is. Wat zegt ze?", "correct": 1,
          "explain": "Het lab zegt alleen hoe sterk het spoor is (de bewijskracht). Over schuld beslist de rechter, met al het andere bewijs."},
  "q16": {"q": "Twee mensen schudden twee minuten handen; daarna pakt één van hen een schoon mes. Wat vonden onderzoekers meestal op het heft?", "correct": 2,
          "explain": "Ook DNA van de ander: in een Amerikaanse proef op vijf van de zes messen, en ongeveer één keer op de vijf was die ander zelfs de grootste donor. Dat heet overdracht."},
  "q21": {"q": "In een mengprofiel van drie mensen staan bij elke STR Eriks twee allelen. Hoeveel zegt 'niet uitgesloten'?", "correct": 0,
          "explain": "Op zichzelf bijna niets: uit vijf allelen kun je veel paren maken, dus passen veel mensen in zo'n mengsel. Pas een berekening met de piekhoogtes (DNAStatistX) geeft een bewijskracht."}
 },
 "glossary": [
  {"t": "spoor", "d": "Alles wat iemand op een plaats achterlaat en wat iets kan zeggen over wat er gebeurde (bloed, speeksel, vingerafdruk, vezel, insect)."},
  {"t": "DNA-profiel", "d": "De lengtes van een reeks STR's (korte herhaalde stukjes DNA) op vaste plekken; elk mens heeft er per plek twee. Geven een paar STR's geen uitslag, dan heet het een deelprofiel."},
  {"t": "twee hypothesen", "d": "De deskundige weegt een spoor altijd tegen twee verklaringen tegelijk, bijvoorbeeld: het DNA is van de verdachte, of van een onbekende, niet-verwante persoon."},
  {"t": "matchkans (toevallige-matchkans)", "d": "De kans dat een willekeurige, niet-verwante persoon hetzelfde profiel heeft. Niet de kans dat de verdachte onschuldig is."},
  {"t": "likelihood ratio (bewijskracht)", "d": "Hoeveel keer waarschijnlijker het spoor is als de ene hypothese waar is dan als de andere waar is: kans op het spoor bij hypothese 1 gedeeld door de kans bij hypothese 2. Het NFI zet hem met een vaste schaal in woorden (bijvoorbeeld 'zeer veel waarschijnlijker')."},
  {"t": "denkfout van de aanklager", "d": "De matchkans omdraaien: 'de kans op dit profiel bij een onschuldige' lezen als 'de kans dat de verdachte onschuldig is'."},
  {"t": "bronvraag en activiteitvraag", "d": "De bronvraag is: van wie is het DNA? De activiteitvraag is: hoe kwam het daar? Elk heeft een eigen bewijskracht; een sterke bron zegt nog weinig over de handeling."},
  {"t": "overdracht", "d": "DNA dat via iemand of iets anders op een plek komt (secundaire overdracht), bijvoorbeeld via een handdruk op een mes dat iemand nooit aanraakte."},
  {"t": "mengprofiel", "d": "DNA-profiel met DNA van meer dan één persoon: bij een STR staan dan meer dan twee allelen. 'Niet uitgesloten' zegt in zo'n mengsel op zichzelf weinig; software als DNAStatistX rekent een bewijskracht uit met de piekhoogtes."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
