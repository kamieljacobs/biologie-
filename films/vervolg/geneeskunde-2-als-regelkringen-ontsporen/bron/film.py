import json
film = {
 "slug": "geneeskunde-2-als-regelkringen-ontsporen", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Als regelkringen ontsporen", "sub": "van bloedverlies tot shock",
 "puzzle": "Waarom kan het na bloedverlies ineens heel snel misgaan, terwijl het eerst goed leek te gaan?",
 "meta": "geneeskunde · intensive care", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Geneeskunde",
 "lead": "Na bloedverlies houden hart, bloedvaten en nieren de bloeddruk eerst overeind: negatieve terugkoppeling. Na ongeveer een derde verlies lukt dat niet meer. Dan krijgt de hartspier zelf te weinig zuurstof, pompt slechter, en de druk zakt verder: positieve terugkoppeling, een vicieuze cirkel. Dat heet shock. Bij sepsis zetten afweerstoffen de vaten wijd open en vallen meerdere organen tegelijk uit. Op de intensive care nemen arts en apparaten tijdelijk de regelkringen over.",
 "endHaak": "welke regelkring in je lichaam zou jij als eerste willen kunnen overnemen, en waarom?",
 "minis": {"Hoofdstuk 1": "Hoe houdt je lichaam de bloeddruk overeind?", "Hoofdstuk 2": "Waarom gaat het na het kantelpunt zo snel?", "Hoofdstuk 3": "Wat gaat er mis bij sepsis?", "Hoofdstuk 4": "Wat doet een intensivist?", "Recap": "Wat zei Bilals bloeddruk eigenlijk?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Bilal en Dr. Kim (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Bilal verliest bloed, maar zijn bloeddruk blijft bijna normaal. Hoe kan dat?", "correct": 0, "explain": "Drukzintuigen zien de daling; het hart klopt sneller en de vaten in huid en darmen knijpen samen. Negatieve terugkoppeling."},
  "q06": {"q": "Na het kantelpunt zakt de bloeddruk steeds sneller. Waarom?", "correct": 1, "explain": "De hartspier krijgt zelf te weinig zuurstof en pompt slechter, waardoor de druk verder zakt: positieve terugkoppeling."},
  "q09": {"q": "Wat is bij sepsis het grootste gevaar?", "correct": 2, "explain": "Dat meerdere organen tegelijk te weinig bloed krijgen en uitvallen: meerdere regelkringen falen tegelijk."}
 },
 "glossary": [
  {"t": "drukzintuigen", "d": "Zintuigen in de wand van grote slagaders die de bloeddruk meten en het hart en de vaten bijsturen."},
  {"t": "compenseren", "d": "Het lichaam werkt een verandering tegen, zodat een waarde zoals de bloeddruk gelijk blijft."},
  {"t": "negatieve terugkoppeling", "d": "Regeling die een verandering tegenwerkt en zo het evenwicht herstelt."},
  {"t": "positieve terugkoppeling", "d": "Regeling die een verandering versterkt: een vicieuze cirkel, zoals bij shock."},
  {"t": "shock", "d": "Toestand waarin de organen te weinig bloed en zuurstof krijgen, door bloedverlies, een zwak hart of wijde, lekkende vaten."},
  {"t": "melkzuur (lactaat)", "d": "Ontstaat als cellen energie maken zonder zuurstof; een hoog lactaat in het bloed is een teken van shock."},
  {"t": "sepsis", "d": "Een infectie waarbij het afweersysteem zo heftig reageert dat het lichaam zelf schade oploopt; organen kunnen uitvallen."},
  {"t": "intensive care", "d": "Afdeling waar arts en apparaten tijdelijk lichaamsfuncties overnemen, zoals ademen, bloeddruk en nierfunctie."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
