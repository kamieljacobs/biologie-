import json
film = {
 "slug": "van-molecuul-tot-biosfeer", "hoofdstuk": "cellen", "hoofdstukNaam": "Cellen",
 "title": "Van molecuul tot biosfeer", "sub": "Wat leeft er, en op welk niveau?",
 "puzzle": "Noor heeft griep. In haar neus worden miljoenen griepvirussen gemaakt, maar op een deurklink doet zo'n virus niets. Leeft een griepvirus?",
 "meta": "cellen · organisatieniveaus", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Cellen · korte film",
 "lead": "Levende wezens bestaan uit cellen, hebben een stofwisseling, groeien, planten zich voort, reageren op prikkels en houden hun binnenkant constant. De cel is het kleinste niveau dat leeft. Door differentiatie worden cellen met hetzelfde DNA verschillend, en vormen ze weefsels, organen, orgaanstelsels en een organisme. Daarboven: populatie, levensgemeenschap, ecosysteem en biosfeer. Een virus is geen cel en heeft geen eigen stofwisseling: meestal rekenen biologen het niet tot de levende wezens.",
 "endHaak": "op welk niveau kijk je, en leeft het?",
 "minis": {"Hoofdstuk 1": "Hoe weet je of iets leeft?", "Hoofdstuk 2": "Van molecuul tot biosfeer: welke niveaus zijn er?", "Hoofdstuk 3": "Leeft een virus?", "Recap": "Leeft een griepvirus?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "In Noors neus worden miljoenen griepvirussen gemaakt, maar op een deurklink doet een virus niets. Leeft een griepvirus?", "correct": 0, "explain": "Onthoud je keuze. Het antwoord zie je in hoofdstuk 3."},
  "q10": {"q": "Een onderzoeker telt rupsen en eiken, en meet ook de temperatuur en hoe nat de bodem is. Welk niveau onderzoekt ze?", "correct": 1, "explain": "Levensgemeenschap plus abiotische factoren (bodem, water, licht, temperatuur) = ecosysteem."}
 },
 "glossary": [
  {"t": "levenskenmerken", "d": "Kenmerken van levende wezens: bestaan uit cellen, stofwisseling, groei en ontwikkeling, voortplanting, reageren op prikkels en bewegen, homeostase. Elke methode heeft een iets andere lijst."},
  {"t": "homeostase", "d": "Het constant houden van het inwendig milieu (bijvoorbeeld de lichaamstemperatuur)."},
  {"t": "organisatieniveaus", "d": "Molecuul, organel, cel, weefsel, orgaan, orgaanstelsel, organisme, populatie, levensgemeenschap, ecosysteem, biosfeer."},
  {"t": "weefsel", "d": "Groep cellen met dezelfde bouw en functie."},
  {"t": "orgaanstelsel", "d": "Organen die samenwerken, bijvoorbeeld hart en bloedvaten: het bloedvatenstelsel (BvJ: organenstelsel)."},
  {"t": "differentiatie", "d": "Cellen met hetzelfde DNA worden verschillend doordat in elk celtype andere genen aan staan; zo krijgen ze een eigen bouw en taak."},
  {"t": "populatie", "d": "Alle individuen van één soort in één gebied, die zich onderling kunnen voortplanten."},
  {"t": "levensgemeenschap", "d": "Alle populaties (alle soorten) in één gebied samen."},
  {"t": "ecosysteem", "d": "Een levensgemeenschap samen met de abiotische factoren (bodem, water, licht, temperatuur), die elkaar beïnvloeden."},
  {"t": "biotische en abiotische factoren", "d": "Biotisch: invloeden van levende wezens. Abiotisch: invloeden van de levenloze omgeving."},
  {"t": "biosfeer", "d": "Alle ecosystemen op aarde samen (vwo: systeem Aarde)."},
  {"t": "emergente eigenschap", "d": "Een eigenschap die pas op een hoger niveau ontstaat doordat de delen samenwerken, zoals het rondpompen van bloed door het hart."},
  {"t": "virus", "d": "Pakketje erfelijk materiaal (DNA of RNA) in een eiwitmantel, soms met een vetlaagje; geen cel en geen eigen stofwisseling; vermenigvuldigt alleen in een gastheercel."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
