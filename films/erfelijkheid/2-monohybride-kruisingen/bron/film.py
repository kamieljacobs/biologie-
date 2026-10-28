import json
film = {
 "slug": "2-monohybride-kruisingen",
 "hoofdstuk": "erfelijkheid",
 "hoofdstukNaam": "Erfelijkheid",
 "title": "Monohybride kruisingen",
 "sub": "P, F1, F2 en het kruisingsschema",
 "puzzle": "Twee ouders met Aa: hoe groot is de kans op een kind met aa? En hoe zie je of een paarse plant een a draagt?",
 "meta": "erfelijkheid 2/6",
 "version": "2.0 · oktober 2026",
 "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Erfelijkheid · film 2 van 6 · vorige: <a href=\"1-chromosomen.html\">Chromosomen</a> · volgende: <a href=\"3-voorbij-dominant-en-recessief.html\">Voorbij dominant en recessief</a>",
 "lead": "Twee ouders zonder albinisme kunnen een kind met albinisme krijgen. Maar hoe groot is die kans? Met de erwtenproef van Gregor Mendel zie je wat P, F1 en F2 zijn, waarom de F1 met elkaar gekruist wordt en waarom er in de F2 drie op één uitkomt. Daarna het kruisingsschema, de productregel, een stappenplan en de terugkruising.",
 "endHaak": "Is het altijd drie op één? In de volgende film: voorbij dominant en recessief.",
 "minis": {
  "Hoofdstuk 1": "Hoe kruiste Mendel twee erwtenplanten, en wat is de F1?",
  "Hoofdstuk 2": "Hoe maak je de F2, en wat komt eruit?",
  "Hoofdstuk 3": "Waarom precies drie op één?",
  "Hoofdstuk 4": "Geeft het kruisingsschema aantallen of kansen?",
  "Hoofdstuk 5": "Hoe los je elke kruisingsvraag op?",
  "Hoofdstuk 6": "Hoe zie je of een paarse plant een a draagt?",
  "Recap": "Hoe groot is de kans op aa bij twee ouders met Aa?"
 },
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: gezin De Wit uit het castboek; Gregor Mendel als historische figuur. Stijl: Part C van de filmprompt (v13). Versie 2.0 · oktober 2026.",
 "questions": {
  "q13": {"q": "Twee F1-planten (Aa) worden met elkaar gekruist. Hoe zien hun nakomelingen eruit, de F2?", "correct": 2,
          "explain": "In de F2 komt wit terug: ongeveer drie paars op één wit (Mendel telde 705 paars en 224 wit). Het allel a zat verborgen in de F1."},
  "q24": {"q": "Je zaait vier zaden uit één F1-plant (Aa, zelfbestuiving). Hoeveel van die vier planten bloeien wit?", "correct": 1,
          "explain": "Elke bevruchting is toeval: de kans op wit is ¼ per zaad, maar bij vier zaden kan het nul, één, twee of meer zijn. Pas bij heel veel nakomelingen kom je dicht bij 3 : 1."},
  "q30": {"q": "Een paarse plant wordt gekruist met een witte (aa). De helft van de nakomelingen bloeit paars, de helft wit. Welk genotype had de paarse plant?", "correct": 0,
          "explain": "Aa. Was de paarse plant AA, dan kreeg elk kind een A en was alles paars. Eén witte nakomeling bewijst al dat de paarse ouder een a had."}
 },
 "glossary": [
  {"t": "P, F1 en F2", "d": "P: de ouders (oudergeneratie). F1: hun nakomelingen. F2: de nakomelingen van de F1, onderling gekruist (bij erwten door zelfbestuiving, bij dieren broer × zus)."},
  {"t": "raszuiver", "d": "Geeft generatie na generatie dezelfde eigenschap: homozygoot (AA of aa)."},
  {"t": "zelfbestuiving", "d": "Stuifmeel komt op de stamper van dezelfde bloem. Een erwtenbloem doet dat al voordat ze opengaat."},
  {"t": "monohybride kruising", "d": "Kruising waarbij je op één eigenschap (één gen) let."},
  {"t": "gameet", "d": "Geslachtscel: krijgt van elk chromosoompaar één chromosoom, dus van elk gen één allel."},
  {"t": "kruisingsschema", "d": "Tabel met de gameten van de ene ouder boven en van de andere links; elk vakje is één mogelijke, even waarschijnlijke bevruchting."},
  {"t": "productregel", "d": "Kansen die allebei moeten gebeuren, vermenigvuldig je: ½ × ½ = ¼."},
  {"t": "terugkruising", "d": "Kruising met een homozygoot recessief individu (aa) om het genotype van een individu met het dominante fenotype te achterhalen."}
 ]
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
