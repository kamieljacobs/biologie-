import json
film = {
 "slug": "psychologie-3-aanleg-of-opvoeding", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Aanleg of opvoeding?", "sub": "tweelingen, adoptie en wat erfelijkheidsgraad betekent",
 "puzzle": "Yasmin en Bilal zijn allebei goed in wiskunde, net als hun vader die elke avond sommen met ze maakte. Komt dat door hun genen of door al die avonden?",
 "meta": "psychologie · gedragsgenetica", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Psychologie",
 "lead": "In één gezin lopen genen en opvoeding door elkaar. Tweeling- en adoptieonderzoek scheidt ze als natuurlijk experiment: lijken eeneiige tweelingen veel meer op elkaar dan twee-eiige, dan maken genen verschil. Zo schat je een erfelijkheidsgraad: het deel van de verschillen tussen mensen in een groep dat samenhangt met verschillen in genen. Dat getal hangt af van de omgeving en zegt niets over je lot: erfelijk is niet hetzelfde als onveranderbaar.",
 "endHaak": "welke eigenschap van jezelf zou je willen onderzoeken met tweelingen, en wat zou je meten?",
 "minis": {"Hoofdstuk 1": "Hoe scheid je genen en opvoeding?", "Hoofdstuk 2": "Wat betekent een erfelijkheidsgraad?", "Hoofdstuk 3": "Waarom hangt het getal af van de omgeving?", "Hoofdstuk 4": "Hoe werken genen en omgeving samen?", "Hoofdstuk 5": "Wat weten we over depressie, ADHD en intelligentie?", "Recap": "Wat zeg je tegen Yasmin en Bilal?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Yasmin, Bilal, Dr. Kim en Teun (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Yasmin en Bilal zijn goed in wiskunde, net als hun vader die elke avond sommen met ze maakte. Kun je door naar dit gezin te kijken uitzoeken of het door hun genen komt?", "correct": 1, "explain": "Nee: ze delen met hun vader zowel genen als opvoeding, dus je kunt die twee niet uit elkaar halen."},
  "q06": {"q": "Eeneiige tweelingen lijken veel meer op elkaar dan twee-eiige. Wat zegt dat?", "correct": 0, "explain": "Dat genen waarschijnlijk verschil maken: het gezin is voor beide soorten hetzelfde, het gedeelde DNA niet."},
  "q11": {"q": "De erfelijkheidsgraad van lengte is 0,8. Wat betekent dat?", "correct": 1, "explain": "Tachtig procent van de verschillen in lengte tussen mensen in die groep hangt samen met verschillen in hun genen. Het zegt niets over hoeveel van jóuw lengte uit je genen komt."},
  "q17": {"q": "De erfelijkheidsgraad van intelligentie is bij kinderen ± 0,4 en bij volwassenen ± 0,8. Hoe kan dat?", "correct": 0, "explain": "Een belangrijke verklaring: volwassenen kiezen zelf een omgeving die bij hun aanleg past, zodat genen steeds zwaarder meetellen en het gezin van vroeger minder."}
 },
 "glossary": [
  {"t": "eeneiige tweeling", "d": "Tweeling uit één bevruchte eicel die zich splitst; deelt bijna al het DNA."},
  {"t": "twee-eiige tweeling", "d": "Tweeling uit twee eicellen, bevrucht door twee zaadcellen; deelt gemiddeld de helft van het variabele DNA, net als broers en zussen."},
  {"t": "natuurlijk experiment", "d": "Situatie die de natuur of het leven zelf maakt en die onderzoekers als vergelijking gebruiken, zoals tweelingen of adoptie."},
  {"t": "aanname van gelijke omgevingen", "d": "Tweelingonderzoek gaat ervan uit dat eeneiige tweelingen niet veel gelijker behandeld worden dan twee-eiige."},
  {"t": "erfelijkheidsgraad", "d": "Het deel van de verschillen tussen mensen in een groep dat samenhangt met verschillen in hun genen (0 tot 1). Gaat over een groep, niet over één persoon."},
  {"t": "gelijkenis (correlatie)", "d": "Hoe sterk twee metingen samengaan: 0 = geen verband, 1 = precies op een lijn."},
  {"t": "unieke omgeving", "d": "Ervaringen die ieder apart meemaakt; verklaart waarom ook eeneiige tweelingen niet helemaal gelijk zijn."},
  {"t": "polygeen", "d": "Afhankelijk van heel veel genvarianten, elk met een klein effect, zoals de meeste gedragskenmerken."},
  {"t": "gen-omgevingsinteractie", "d": "Genen en omgeving tellen niet los op: aanleg kan bepalen hoe sterk iemand op de omgeving reageert."},
  {"t": "Nederlands Tweelingen Register", "d": "Register aan de Vrije Universiteit Amsterdam, gestart in de jaren tachtig, met meer dan 200.000 deelnemers (tweelingen en familieleden)."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
