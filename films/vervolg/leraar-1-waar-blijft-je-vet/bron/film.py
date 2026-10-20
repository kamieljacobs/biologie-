import json
film = {
 "slug": "leraar-1-waar-blijft-je-vet", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Waar blijft je vet?", "sub": "misvattingen en hoe je ze aanpakt",
 "puzzle": "Waarom denken zoveel mensen dat vet bij afvallen energie wordt?",
 "meta": "leraar biologie · didactiek", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Leraar biologie",
 "lead": "Waar blijft je vet als je afvalt? De meeste mensen zeggen: het wordt energie. Maar de atomen verdwijnen niet: je ademt het meeste uit als koolstofdioxide. Zulke misvattingen zijn hardnekkig, ook bij artsen en trainers. Een leraar maakt ze zichtbaar en laat ze wankelen: eerst voorspellen, dan waarnemen, dan verklaren. Ook over leren zelf bestaan misvattingen: ophalen werkt beter dan herlezen. En een leraar ziet de draden die door de hoofdstukken lopen, zoals oppervlaktevergroting.",
 "endHaak": "welk idee over biologie had jij lang verkeerd?",
 "minis": {"Hoofdstuk 1": "Waarom is 'het wordt energie' fout?", "Hoofdstuk 2": "Hoe laat je een misvatting wankelen?", "Hoofdstuk 3": "Waarom werkt ophalen beter dan herlezen?", "Hoofdstuk 4": "Wat verbindt darm, long en wortel?", "Recap": "Waar is het vet van Sam gebleven?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Mevrouw Visser, Sam, Noor, Daan en Yasmin (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Sam is tien kilo afgevallen. Waar is dat vet gebleven?", "correct": 1, "explain": "Het meeste is uitgeademd als koolstofdioxide; de rest verlaat je lichaam als water. De energie komt vrij, maar de atomen moeten ergens heen."},
  "q06": {"q": "Waarom verdwijnt een misvatting niet als iemand het goede antwoord hoort?", "correct": 0, "explain": "Nieuwe kennis wordt vastgeplakt aan wat je al dacht. Past het niet, dan blijft het oude idee vaak staan."},
  "q09": {"q": "Groep A las de tekst vier keer; groep B las één keer en haalde drie keer op. Wie wist na een week het meest?", "correct": 2, "explain": "De groep die ophaalde: ongeveer 61 tegen 40 procent, terwijl de leesgroep dacht het beter te kennen."},
  "q12": {"q": "Wat hebben darmvlokken, longblaasjes en wortelharen gemeen?", "correct": 0, "explain": "Ze vergroten het oppervlak voor uitwisseling: hoe groter het oppervlak, hoe meer stof er tegelijk overgaat."}
 },
 "glossary": [
  {"t": "misvatting", "d": "Een idee dat logisch voelt maar biologisch niet klopt, zoals 'vet wordt energie'; vaak hardnekkig, ook bij volwassenen."},
  {"t": "voorkennis", "d": "Wat een leerling al denkt en weet; nieuwe kennis wordt daaraan vastgemaakt."},
  {"t": "voorspellen, waarnemen, verklaren", "d": "Werkwijze om een misvatting te laten wankelen: eerst een voorspelling, dan de waarneming, dan zelf de verklaring geven."},
  {"t": "leren door ophalen", "d": "Jezelf overhoren of opschrijven wat je nog weet, zonder te kijken; werkt op lange termijn beter dan herlezen (testeffect)."},
  {"t": "gespreid oefenen", "d": "Oefenen verdeeld over meerdere momenten in plaats van alles in één keer; zie Leren en onthouden."},
  {"t": "oppervlaktevergroting", "d": "Bouw die het oppervlak voor uitwisseling groter maakt, zoals darmvlokken, longblaasjes en wortelharen; een rode draad door de biologie."},
  {"t": "groot idee", "d": "Een concept dat in veel hoofdstukken terugkomt, zoals structuur en functie of evenwicht; een leraar bouwt lessen eromheen."},
  {"t": "lerarenopleiding", "d": "Op het hbo voor de onderbouw en het vmbo (tweedegraads); met een master ook voor de bovenbouw van havo en vwo (eerstegraads)."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
