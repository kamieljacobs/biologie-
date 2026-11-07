import json
film = {
 "slug": "bioinformatica-3-een-uitbraak-volgen", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Stambomen uit DNA", "sub": "een uitbraak volgen",
 "puzzle": "Maart 2020: in drie Brabantse ziekenhuizen testen 96 medewerkers met klachten positief op corona. Kregen ze het virus op hun werk, of van buiten?",
 "meta": "bio-informatica · hbo en wo", "version": "1.0 · oktober 2026", "titleLook": "schema", "alleen": "havo · vwo",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Bio-informatica",
 "lead": "Sam loopt een week mee bij de bio-informatica van een ziekenhuislab; dit is dag drie. Dr. Kim ziet nooit wie wie besmette: ze heeft alleen monsters. Het lab schrijft het RNA van het coronavirus om naar DNA, kopieert het in stukjes en leest die; de computer legt ze langs een referentiegenoom tot één sequentie. Virussen van mensen die elkaar besmetten, verschillen meestal geen letter of maar een paar. Met een bedacht voorbeeld van vijf monsters bouwt Sam zelf een stamboom: steeds het paar met de minste verschillen samenvoegen, en herhalen. Herbemonsteren (bootstrappen) laat zien welke takken stevig staan en welke wankel. Een boom toont verwantschap, maar bij bijna gelijke virussen niet wie het aan wie gaf, en nooit schuld; daarvoor zijn gesprekken nodig. Zo bleek in 2020 dat de meeste zorgmedewerkers waarschijnlijk buiten het werk besmet raakten.",
 "endHaak": "hoe voorspel je uit een rij letters de vorm van een eiwit?",
 "minis": {"Hoofdstuk 1": "Hoe kom je van een wattenstaafje tot de letters van een virus?",
           "Hoofdstuk 2": "Hoe bouw je een stamboom uit een tabel met verschillen?",
           "Hoofdstuk 3": "Hoe weet je of een tak van de boom stevig staat?",
           "Hoofdstuk 4": "Wat zegt een stamboom wel, en wat niet?",
           "Recap": "Waar kwam het virus van de zorgmedewerkers vandaan?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Sam, Dr. Kim, Verpleegkundige Jesse en de figuranten Joost, Erik en Mevrouw Jansen (castboek), plus drie nieuwe figuranten zonder naam. Stijl: Stijlkaart biologiefilms (Part C). Het voorbeeld met de monsters A tot en met E is bedacht; de casus uit 2020 is echt (Sikkema e.a. 2020). Versie 1.0 · oktober 2026.",
 "questions": {
  "q08": {"q": "Een medewerker besmet een collega. Een week later laten ze allebei hun virus lezen. Hoeveel letters verschillen hun virussen?", "correct": 1,
          "explain": "In de virussen die rondgaan komen er gemiddeld ongeveer twee mutaties per maand bij. Een week is kort, dus twee mensen die elkaar besmetten hebben meestal geen letter verschil, of maar een paar."},
  "q14": {"q": "A en B hangen samen in de boom. Welk paar komt daarna?", "correct": 0,
          "explain": "Na A-B is het kleinste getal in de tabel twee: C en E. Waar iemand werkt of waar hij in de tabel staat, telt niet mee; alleen het aantal verschillen."},
  "q22": {"q": "Na het herbemonsteren komt het groepje A-B met C-E zes van de tien keer terug. Wat betekent dat?", "correct": 2,
          "explain": "Een tak die maar zes van de tien keer terugkomt, staat wankel: in veel trekkingen hangt hij anders. Het getal is geen kans dat de boom juist is, en het zijn geen kolommen."},
  "q26": {"q": "A en B hebben precies hetzelfde virus, en A testte twee dagen eerder positief dan B. Wat zegt dat?", "correct": 0,
          "explain": "Gelijke virussen zeggen: nauw verwant, niet wie het aan wie gaf. Wie eerder positief test, is niet per se eerder besmet, en ze kunnen het ook allebei via ongeteste mensen uit dezelfde bron hebben."},
  "q32": {"q": "Elke groep virussen kwam in meer dan één ziekenhuis voor, en dezelfde virussen zaten ook bij mensen daarbuiten; collega's van één afdeling hadden vaak verschillende virussen. Waar raakten de meesten dan besmet?", "correct": 1,
          "explain": "Als het virus op de afdeling werd doorgegeven, zouden collega's hetzelfde virus hebben. Dat was meestal niet zo, en dezelfde virussen zaten ook buiten de ziekenhuizen. Dus raakten de meesten waarschijnlijk buiten het werk besmet; besmetting in het ziekenhuis kon niet worden uitgesloten."}
 },
 "glossary": [
  {"t": "sequentie", "d": "De volgorde van basen in een stuk DNA of RNA (of van aminozuren in een eiwit)."},
  {"t": "referentiegenoom", "d": "Een afgesproken voorbeeldgenoom waarmee je een gelezen genoom vergelijkt; de computer legt de gelezen stukjes erlangs."},
  {"t": "uitlijnen", "d": "Twee of meer sequenties zo naast elkaar leggen dat zoveel mogelijk gelijke letters onder elkaar staan, met gaten waar een stukje ontbreekt of extra is."},
  {"t": "mutatie", "d": "Een verandering in het erfelijk materiaal, bijvoorbeeld een kopieerfout. In de coronavirussen die rondgingen kwamen er gemiddeld ongeveer twee per maand bij."},
  {"t": "algoritme", "d": "Een vast stappenplan dat een computer uitvoert, zoals 'voeg steeds het paar met de minste verschillen samen en herhaal'."},
  {"t": "stamboom (fylogenetische boom)", "d": "Schema van verwantschap, berekend uit verschillen in sequenties. Hoe dichter twee monsters bij elkaar hangen, hoe minder ze verschillen (Evolutie 8 noemt de getekende vorm een cladogram)."},
  {"t": "herbemonsteren (bootstrap)", "d": "De computer trekt kolommen uit de uitlijning, met terugleggen, evenveel als er zijn, bouwt daarmee een nieuwe boom en herhaalt dat honderden keren. Het steungetal zegt hoe vaak een groepje terugkomt: hoe consistent de data zijn, niet of de boom juist is."},
  {"t": "verwantschap en richting", "d": "Een stamboom laat zien welke virussen op elkaar lijken. Bij (bijna) gelijke virussen zie je niet wie het aan wie gaf; daarvoor zijn gegevens uit gesprekken nodig. Over schuld zegt een boom nooit iets."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
