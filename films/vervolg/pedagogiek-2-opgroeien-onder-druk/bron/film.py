import json
film = {
 "slug": "pedagogiek-2-opgroeien-onder-druk", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Opgroeien onder druk", "sub": "tegenslag, veerkracht en wat een pedagoog doet",
 "puzzle": "Waarom groeien sommige kinderen uit een moeilijke thuissituatie toch goed op?",
 "meta": "pedagogiek · jeugdzorg", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Pedagogiek",
 "lead": "Op het eiland Kauai volgden onderzoekers bijna zevenhonderd kinderen tot hun veertigste. Een op de drie groeide op met veel tegenslag, en ook van hen werd een op de drie een stabiele, zorgzame volwassene. Ingrijpende jeugdervaringen vergroten het risico op problemen, maar bepalen de toekomst van één persoon niet. Veerkracht ontstaat vooral door minstens één vaste volwassene. Wie op school, in de zorg of in de jeugdhulp werkt, volgt bij zorgen de meldcode. En met videofeedback helpt een pedagoog ouders hun kind beter aan te voelen.",
 "endHaak": "wie kan voor jou zo iemand zijn, en voor wie ben jij dat?",
 "minis": {"Hoofdstuk 1": "Wat doet tegenslag in je jeugd?", "Hoofdstuk 2": "Wat beschermt een kind?", "Hoofdstuk 3": "Wat doe je als je je zorgen maakt?", "Hoofdstuk 4": "Hoe helpt een pedagoog ouders?", "Recap": "Wat maakte op Kauai het verschil?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Dr. Kim en de baby (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Kauai: een op de drie kinderen groeide op met veel tegenslag. Hoe ging het later met hen?", "correct": 1, "explain": "Twee op de drie kregen al jong problemen, maar een op de drie werd een stabiele, zorgzame volwassene, en met veel anderen ging het later alsnog beter."},
  "q06": {"q": "Iemand had als kind vier of meer ingrijpende ervaringen. Wat zegt dat over haar toekomst?", "correct": 2, "explain": "Haar kans op problemen is groter, maar niet zeker: het onderzoek gaat over groepen, en veel mensen met zo'n verleden doen het goed."},
  "q09": {"q": "Wat beschermde de kinderen op Kauai die het goed deden het vaakst?", "correct": 1, "explain": "Minstens één vaste volwassene die om ze gaf; dat hoefde geen ouder te zijn."},
  "q12": {"q": "Een leraar ziet blauwe plekken en een leerling die bang is om naar huis te gaan. Wat doet hij volgens de meldcode eerst?", "correct": 2, "explain": "Eerst vastleggen wat hij ziet. Daarna overleggen, een gesprek, afwegen en beslissen."},
  "q16": {"q": "Waarom laat de pedagoog bij videofeedback vooral de goede momenten zien?", "correct": 0, "explain": "Zodat de ouder ziet wat al werkt en dat vaker gaat doen; dat werkt beter dan een lijst met fouten."}
 },
 "glossary": [
  {"t": "Kauai-onderzoek", "d": "Onderzoek dat bijna 700 kinderen op het eiland Kauai (geboren in 1955) tot hun 40e volgde; ook veel kinderen met veel tegenslag groeiden goed op."},
  {"t": "ingrijpende jeugdervaringen", "d": "Ervaringen zoals mishandeling, verwaarlozing, geweld of verslaving in huis (ACE's); hoe meer, hoe groter in een groep de kans op problemen later."},
  {"t": "risicofactor", "d": "Iets wat de kans op problemen in een groep groter maakt, maar niets zeker voorspelt voor één persoon."},
  {"t": "veerkracht", "d": "Goed opgroeien ondanks tegenslag; ontstaat vooral in relaties, zoals met een vaste volwassene."},
  {"t": "beschermende factor", "d": "Iets wat helpt om ondanks tegenslag goed op te groeien, zoals een vaste volwassene of iets waar je goed in bent."},
  {"t": "meldcode", "d": "Stappenplan bij zorgen over huiselijk geweld of kindermishandeling: vastleggen, overleggen, gesprek, afwegen, beslissen over melden en hulp."},
  {"t": "Veilig Thuis", "d": "Advies- en meldpunt voor huiselijk geweld en kindermishandeling (0800-2000)."},
  {"t": "videofeedback", "d": "Methode waarbij een pedagoog ouder en kind filmt en samen met de ouder vooral de goede momenten terugkijkt."},
  {"t": "pedagoog", "d": "Deskundige in opvoeden en opgroeien; werkt bijvoorbeeld in de jeugdhulp, op scholen, bij Veilig Thuis of in onderzoek."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
