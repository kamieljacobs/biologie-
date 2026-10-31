import json
film = {
 "slug": "7-dna-lezen",
 "hoofdstuk": "dna",
 "hoofdstukNaam": "DNA",
 "title": "DNA lezen",
 "sub": "kopiëren, sorteren, lezen, vinden",
 "puzzle": "Een onopgeloste zaak. Op een kapotte ruit een paar druppels bloed van de dader, maar het profiel komt met niemand in de databank overeen. Jaren later komt er een nieuwe aanwijzing, niet van de dader zelf. Hoe lees je DNA uit een paar druppels bloed, en hoe vind je iemand die nergens geregistreerd staat?",
 "meta": "dna 7/8",
 "version": "2.0 · oktober 2026",
 "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks DNA · film 7 van 8 · havo + vwo · vorige: <a href=\"6-genen-aan-en-uit.html\">Genen aan en uit</a> · volgende: <a href=\"8-wat-heb-jij-aan-dna.html\">Wat heb jij aan DNA?</a>",
 "lead": "Een paar druppels bloed op een kapotte ruit. Hoe lees je daar DNA uit, en hoe vind je een dader die nergens geregistreerd staat? Over PCR, gelelektroforese en het DNA-profiel, sequencen en de NIPT, zoeken via verre familie, en DNA veranderen: genetische modificatie en CRISPR. Onderdelen met <span class=\"tag\">vwo</span> zijn alleen vwo-stof; in de havo-stand worden ze overgeslagen.",
 "endHaak": "kopiëren, sorteren, lezen, vinden",
 "minis": {
  "Hoofdstuk 1": "PCR: kopiëren met de temperatuur als schakelaar",
  "Hoofdstuk 2": "Gelelektroforese en het DNA-profiel",
  "Hoofdstuk 3": "Sequencen: letter voor letter",
  "Hoofdstuk 4": "Zoeken via verre familie, en DNA veranderen",
  "Samenvatting — Terug naar de zaak": "Kopiëren, sorteren, lezen, vinden",
  "Hoofdstuk 1 — Vermeerderen": "PCR: kopiëren met de temperatuur als schakelaar",
  "Hoofdstuk 2 — Sorteren": "Gelelektroforese en het DNA-profiel",
  "Hoofdstuk 3 — Lezen": "Sequencen: letter voor letter",
  "Hoofdstuk 4 — Vinden": "Zoeken via verre familie, en DNA veranderen"
 },
 "footer": "Stem: Roos (ElevenLabs, eleven_v3; n19 deels eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages uit het castboek. Tekeningen: gedeelde bibliotheek (PCR-buisje, thermocycler, gelelektroforese, micropipet, sequencer, basen als staafje met puzzelrand, polymerase, restrictie-enzym, plasmide, CRISPR-Cas9, stamboom). Stijl: Part C van de filmprompt (v13). Bronnen: Biologie voor Jou havo thema 9, Nectar vwo H17, OpenStax Biology 2e § 17.1, Alberts <em>Molecular Biology of the Cell</em>, CvTE havo 2019-II en 2025-II (geparafraseerd), RIVM over de NIPT, OM over stamboomonderzoek (28 okt 2026). Versie 2.0 · oktober 2026.",
 "questions": {
  "q4": {"explain": "PCR kopieert erfelijk materiaal: de primers passen alleen op een bepaalde nucleotidenvolgorde van het virus. Eiwitten en aminozuurvolgordes kun je niet kopiëren."},
  "q10": {"explain": "Alleen in de dichte wond blijven zeehondcellen beschermd zitten; een open wond spoelt uit in zee en op gewone huid liet de zeehond niets achter."},
  "q15": {"explain": "Elk stukje wordt gesequencet; de nucleotidenvolgorde laat zien op welk chromosoom het thuishoort."},
  "q20": {"explain": "Achterneven hebben dezelfde overgrootouders en delen zo'n drie procent van hun DNA: een klein deel, in een paar lange gelijke stukken."}
 },
 "glossary": json.load(open('oud/glossary.json', encoding='utf-8'))
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
