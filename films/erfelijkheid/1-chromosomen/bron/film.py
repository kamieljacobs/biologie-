import json
film = {
 "slug": "1-chromosomen",
 "hoofdstuk": "erfelijkheid",
 "hoofdstukNaam": "Erfelijkheid",
 "title": "Chromosomen",
 "sub": "en de taal van erfelijkheid",
 "puzzle": "Waarom is geen kind precies het midden van zijn ouders? En hoe krijgen twee ouders zonder albinisme een kind mét albinisme?",
 "meta": "erfelijkheid 1/6",
 "version": "2.2 · oktober 2026",
 "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Erfelijkheid · film 1 van 6 · volgende: <a href=\"2-monohybride-kruisingen.html\">Monohybride kruisingen</a>",
 "lead": "Een gezin: de kinderen lijken op hun vader en hun moeder, maar geen van hen is het midden. En één kind heeft albinisme, terwijl niemand in de familie het heeft. Om dat te begrijpen zoomen we in: van de huid naar de celkern, naar chromosomen, genen en allelen. Daarna zie je hoe één enzym, tyrosinase, het verschil maakt tussen pigment en geen pigment.",
 "endHaak": "Hoe groot is de kans dat twee ouders met Aa een kind met aa krijgen?",
 "minis": {
  "Hoofdstuk 1": "Waar in je huid zit de informatie voor je huidskleur?",
  "Hoofdstuk 2": "Hoeveel chromosomen heb je, en waarom in paren?",
  "Hoofdstuk 3": "Wat is het verschil tussen een gen en een allel?",
  "Hoofdstuk 4": "Hoe bepaalt een allel of je pigment maakt?",
  "Hoofdstuk 5": "Ligt je fenotype helemaal vast in je genen?",
  "Hoofdstuk 6": "Hoe krijgen ouders zonder albinisme een kind met albinisme?",
  "Recap": "Waarom is geen kind het midden van zijn ouders?"
 },
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: gezin De Wit uit het castboek. Tekeningen: gedeelde bibliotheek (huid, celkern, DNA rond eiwitten). Stijl: Part C van de filmprompt (v10). Versie 2.0 · oktober 2026.",
 "questions": {
  "q14": {"q": "Een eicel en een zaadcel smelten samen tot een cel met 46 chromosomen. Hoeveel chromosomen zitten er in één eicel?", "correct": 1,
          "explain": "Een eicel heeft 23 chromosomen: van elk paar precies één. Een zaadcel ook. Bij de bevruchting komen ze samen: 46. (De eicel maakt haar laatste deling pas af als de zaadcel is binnengedrongen.)"},
  "q28": {"q": "Een pigmentcel met Aa heeft maar één werkend allel. Hoeveel melanine maakt hij?", "correct": 0,
          "explain": "Met één werkend allel maakt de cel half zoveel enzym, en dat is ruim genoeg: er komt ongeveer evenveel melanine als bij AA. Daarom is A dominant."},
  "q37": {"q": "Kunnen twee ouders die allebei Aa zijn, een kind krijgen met albinisme?", "correct": 2,
          "explain": "Ja. Elk kind krijgt één allel van de vader en één van de moeder. Krijgt het van allebei het allel a, dan is het aa: geen werkend enzym, albinisme."}
 },
 "glossary": [
  {"t": "chromosoom", "d": "Eén lang DNA-molecuul, opgerold rond eiwitten. Vlak voor de deling gekopieerd tot twee zusterchromatiden, vast aan elkaar bij het centromeer."},
  {"t": "karyogram", "d": "Afbeelding van alle chromosomen van een cel, geordend in paren op lengte en plaats van het centromeer."},
  {"t": "homologe chromosomen", "d": "Een paar chromosomen: één van je vader, één van je moeder. Even lang, dezelfde bouw en op dezelfde plekken dezelfde soort informatie."},
  {"t": "haploïd (n) en diploïd (2n)", "d": "Haploïd: één set chromosomen (mens: 23, in eicel en zaadcel). Diploïd: twee sets (mens: 46)."},
  {"t": "autosomen en geslachtschromosomen", "d": "Autosomen: paren 1 tot en met 22. Geslachtschromosomen: X en Y (meestal vrouw XX, man XY)."},
  {"t": "gen", "d": "Stukje DNA met de instructie voor één eiwit."},
  {"t": "locus", "d": "De plek van een gen op een chromosoom."},
  {"t": "allel", "d": "Een versie van een gen."},
  {"t": "genotype", "d": "De combinatie van allelen die iemand heeft, bijvoorbeeld AA, Aa of aa."},
  {"t": "fenotype", "d": "De eigenschap die je kunt waarnemen; ontstaat uit genotype en milieu."},
  {"t": "dominant en recessief", "d": "Dominant: één exemplaar is genoeg om het fenotype te bepalen. Recessief: alleen zichtbaar als er geen dominant allel is (aa)."},
  {"t": "homozygoot en heterozygoot", "d": "Homozygoot: twee dezelfde allelen (AA of aa). Heterozygoot: twee verschillende (Aa)."},
  {"t": "milieu", "d": "Invloeden uit de omgeving, zoals zonlicht. Fenotype = genotype + milieu."}
 ]
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
