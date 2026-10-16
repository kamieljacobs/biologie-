import json
film = {
 "slug": "7-slaap", "hoofdstuk": "regeling", "hoofdstukNaam": "Regeling",
 "title": "Slaap", "sub": "Wat je hersenen 's nachts doen, en waarom je moe wordt",
 "puzzle": "Bilal en Sam halen een nacht door. Om vier uur zijn ze kapot, om acht uur voelen ze zich weer wakkerder, terwijl ze nog langer wakker zijn. Hoe kan dat?",
 "meta": "zenuwstelsel · slaap", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Zenuwstelsel · film 7",
 "lead": "Als je slaapt, staan je hersenen niet uit. Het EEG laat zien dat je in cycli van ongeveer anderhalf uur door lichte slaap, diepe slaap en REM-slaap gaat; in de REM-slaap droom je het meest en zijn je spieren slap. Wanneer je moe wordt, bepalen twee systemen samen: slaapdruk (adenosine stapelt op als je wakker bent, slaap ruimt het op) en de biologische klok in de hypothalamus, die door licht wordt gelijkgezet en 's avonds de pijnappelklier melatonine laat afgeven. Slaap is nodig voor je geheugen, opruimen en herstel, en je afweer; aan te weinig slaap went je niet.",
 "endHaak": "slaapdruk of klok: welk systeem maakt jou nu moe?",
 "minis": {"Hoofdstuk 1": "Wat doen je hersenen als je slaapt?", "Hoofdstuk 2": "Wat bepaalt wanneer je moe wordt?", "Hoofdstuk 3": "Waarom moet je eigenlijk slapen?", "Recap": "Waarom voelden Bilal en Sam zich om acht uur wakkerder?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Om vier uur 's nachts zijn Bilal en Sam kapot, om acht uur voelen ze zich wakkerder, terwijl ze nog langer wakker zijn. Hoe kan dat?", "correct": 2, "explain": "Onthoud je keuze. Het antwoord zie je in hoofdstuk 2."},
  "q06": {"q": "Je droomt dat je wegrent voor een hond. Waarom ren je niet echt je bed uit?", "correct": 0, "explain": "In de REM-slaap remt je hersenstam de motorische neuronen naar je spieren; alleen je ogen en ademhalingsspieren werken door."},
  "q17": {"q": "Je slaapt twee weken lang maar zes uur per nacht. Wat merk je daarvan?", "correct": 1, "explain": "Je voelt je maar een beetje slaperiger, maar je reactietijd blijft achteruitgaan. Je went er niet aan; uitslapen in het weekend haalt niet alles in."}
 },
 "glossary": [
  {"t": "EEG", "d": "Elektro-encefalogram: meting van de elektrische activiteit van miljoenen hersencellen met elektroden op het hoofd."},
  {"t": "lichte slaap", "d": "Begin van een slaapcyclus; de hersengolven worden trager."},
  {"t": "diepe slaap", "d": "Slaap met grote, trage hersengolven: veel zenuwcellen vuren tegelijk. Vooral in het begin van de nacht."},
  {"t": "REM-slaap", "d": "Slaap waarin het EEG op wakker zijn lijkt, de ogen snel bewegen en je het meest droomt; de hersenstam remt de spieren (slap)."},
  {"t": "slaapcyclus", "d": "Lichte slaap, diepe slaap en REM-slaap samen: ongeveer anderhalf uur; vier tot zes per nacht."},
  {"t": "slaapdruk", "d": "Hoe sterk je lichaam naar slaap vraagt; stijgt doordat adenosine zich opstapelt als je wakker bent en daalt als je slaapt (negatieve terugkoppeling)."},
  {"t": "adenosine", "d": "Stof die zich tijdens het wakker zijn tussen hersencellen opstapelt en via een receptor zenuwcellen remt."},
  {"t": "cafeïne", "d": "Past op de adenosinereceptor zonder te remmen (antagonist): je voelt je wakkerder, maar de adenosine blijft."},
  {"t": "biologische klok", "d": "Kerngebied in de hypothalamus, boven de kruising van de oogzenuwen, dat een ritme van ongeveer 24 uur aangeeft."},
  {"t": "circadiaans ritme", "d": "Ritme van ongeveer een etmaal (dag-en-nachtritme); licht via het netvlies zet het elke dag gelijk."},
  {"t": "melatonine", "d": "Hormoon uit de pijnappelklier dat 's avonds in het donker wordt afgegeven: 'het is nacht'. Fel licht remt de afgifte."},
  {"t": "pijnappelklier", "d": "Kleine klier diep in de hersenen die melatonine maakt (ook epifyse)."},
  {"t": "groeihormoon", "d": "Hormoon uit de hypofyse; de grootste afgifte is in de eerste diepe slaap."},
  {"t": "microslaap", "d": "Een paar seconden in slaap vallen zonder het te merken; gevaarlijk in het verkeer."},
  {"t": "klokgenen", "d": "Genen waarvan de eiwitten hun eigen aflezen remmen; de cyclus van aanmaak en afbraak duurt ongeveer een etmaal (negatieve terugkoppeling).", "vwo": True}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
