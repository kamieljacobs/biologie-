import json
film = {
 "slug": "neurowetenschappen-3-als-hersencellen-uitvallen", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Als hersencellen uitvallen", "sub": "Parkinson, Alzheimer en epilepsie",
 "puzzle": "Waarom helpt een medicijn tegen Parkinson eerst goed, en na jaren steeds korter?",
 "meta": "neurowetenschappen · neurologie", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Neurowetenschappen",
 "lead": "Bij Parkinson sterven de dopaminecellen in de zwarte stof af. Levodopa helpt, maar als er te weinig cellen over zijn om dopamine op te slaan, gaat de dopamine op en neer met elke pil. Bij Alzheimer klonteren eiwitten (amyloïd en tau) en verdwijnen synapsen, eerst rond de hippocampus. Bij epilepsie raakt het evenwicht tussen prikkelen en remmen zoek. Medicijnen voor de hersenen zijn moeilijk te maken: de bloed-hersenbarrière houdt de meeste stoffen tegen, muizen krijgen de ziekten niet vanzelf, en dode hersencellen komen meestal niet terug. Diepe hersenstimulatie is een behandeling zonder pil.",
 "endHaak": "welke van deze drie ziekten zou jij willen onderzoeken, en waarom?",
 "minis": {"Hoofdstuk 1": "Waarom werkt de pil steeds korter?", "Hoofdstuk 2": "Waarom verdwijnen nieuwe herinneringen het eerst?", "Hoofdstuk 3": "Wat gebeurt er bij een aanval?", "Hoofdstuk 4": "Waarom stoppen zo weinig medicijnen een hersenziekte?", "Recap": "Is Opa Henk gewend geraakt aan zijn pillen?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Opa Henk, Noor en Dr. Kim (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Opa Henks pil tegen Parkinson werkt na een paar jaar steeds korter. Hoe komt dat?", "correct": 1, "explain": "Er zijn steeds minder dopaminecellen over die de dopamine kunnen opslaan en rustig afgeven. Gewenning is niet de hoofdoorzaak."},
  "q07": {"q": "Een vrouw met beginnende Alzheimer weet haar trouwdag nog, maar niet wat ze vanochtend at. Hoe kan dat?", "correct": 1, "explain": "De schade begint meestal rond de hippocampus, die nodig is om nieuwe herinneringen vast te leggen. Oude herinneringen liggen al verspreid in de schors."},
  "q10": {"q": "Wat moet een medicijn tegen epilepsie doen?", "correct": 0, "explain": "Het prikkelen afremmen (moeilijker snel achter elkaar vuren) of de remming versterken."},
  "q14": {"q": "Een middel werkt bij muizen tegen Alzheimer, maar niet bij mensen. Wat is de meest waarschijnlijke reden?", "correct": 1, "explain": "Muizen krijgen vanzelf geen Alzheimer. Met menselijke genen krijgen ze klonten, maar dat is maar een deel van de ziekte."}
 },
 "glossary": [
  {"t": "ziekte van Parkinson", "d": "Ziekte waarbij de dopaminecellen in de zwarte stof langzaam afsterven; bewegen wordt trager en stijver, met trillen in rust."},
  {"t": "zwarte stof", "d": "Klein gebied diep in de hersenen met cellen die dopamine maken (substantia nigra)."},
  {"t": "basale kernen", "d": "Groep kernen diep in de hersenen die helpt bewegingen te starten en soepel te laten verlopen."},
  {"t": "levodopa", "d": "Medicijn tegen Parkinson; komt via een transporteiwit in de hersenen, waar cellen er dopamine van maken."},
  {"t": "halfwaardetijd", "d": "Tijd waarin de helft van een stof uit het bloed verdwenen is; voor levodopa ongeveer anderhalf uur."},
  {"t": "ziekte van Alzheimer", "d": "Meest voorkomende vorm van dementie; eiwitten klonteren, synapsen en later hele cellen verdwijnen."},
  {"t": "amyloïd", "d": "Eiwit dat bij Alzheimer plakkaten vormt tussen de hersencellen."},
  {"t": "tau", "d": "Eiwit dat bij Alzheimer in de hersencellen in de knoop raakt (kluwens)."},
  {"t": "hippocampus", "d": "Hersengebied dat nodig is om nieuwe herinneringen vast te leggen."},
  {"t": "epileptische aanval", "d": "Een groep hersencellen vuurt tegelijk doordat het evenwicht tussen prikkelen en remmen zoekraakt."},
  {"t": "glutamaat en GABA", "d": "Glutamaat is de belangrijkste prikkelende, GABA de belangrijkste remmende neurotransmitter in de hersenen."},
  {"t": "bloed-hersenbarrière", "d": "Strak aansluitende cellen in de wand van de haarvaten in de hersenen, waardoor de meeste stoffen uit het bloed er niet in komen."},
  {"t": "diepe hersenstimulatie", "d": "Behandeling met een elektrode diep in de hersenen en een kastje onder de huid dat stroompjes geeft; vermindert trillen en stijfheid bij Parkinson."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
