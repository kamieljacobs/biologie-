import json
film = {
 "slug": "voedingsleer-4-de-dietist-in-het-ziekenhuis", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Eten als behandeling", "sub": "de diëtist in het ziekenhuis",
 "puzzle": "Iemand ligt een week in het ziekenhuis en eet bijna niets. Waarom is dat gevaarlijker dan het lijkt?",
 "meta": "voeding en diëtetiek · ondervoeding en nierfalen", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Voeding en diëtetiek",
 "lead": "Een dienblad komt drie dagen achter elkaar bijna vol terug uit kamer 12. Noor loopt een dag mee met Diëtist Hanneke, die nu in het ziekenhuis werkt. Een vrouw van 72 heeft haar heup gebroken en is niet mager, maar wel ondervoed. Je ziet hoe een diëtist ondervoeding herkent, waarom je lichaam spier afbreekt als het eten wegvalt, en waarom een zieke juist meer eiwit nodig heeft. Op een andere afdeling werken de nieren van een man van 38 bijna niet meer: zout, kalium, fosfaat en soms vocht moeten anders, en zijn eiwitadvies verandert als hij met dialyse begint. Tot slot maakt Hanneke met het team een plan, van verrijkt eten tot sondevoeding.",
 "endHaak": "wat zou jij als diëtist als eerste vragen aan iemand die bijna niets eet?",
 "minis": {"Hoofdstuk 1": "Kun je ondervoed zijn zonder mager te zijn?", "Hoofdstuk 2": "Waar komt glucose vandaan als je niet eet?", "Hoofdstuk 3": "Wat raken nieren niet meer kwijt?", "Hoofdstuk 4": "Wanneer komt er sondevoeding bij?", "Recap": "Waarom is een week bijna niets eten gevaarlijk?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Diëtist Hanneke, Noor, Mevrouw Jansen, Erik (als naamloze patiënt), Verpleegkundige Jesse en Fysiotherapeut Femke (castboek). Decor: ElevenLabs (ziekenhuiskamer). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q05": {"q": "De vrouw is helemaal niet mager. Kan zij toch ondervoed zijn?", "correct": 2, "explain": "Ja. Ondervoed ben je als je onbedoeld afvalt, vooral aan spieren, omdat je te weinig binnenkrijgt. Dat kan ook met een gewoon gewicht of met overgewicht."},
  "q08": {"q": "Na ongeveer een dag is het glycogeen in de lever bijna op. Waar haalt je lever dan een deel van de glucose vandaan?", "correct": 0, "explain": "Uit aminozuren, en die komen uit afgebroken spiereiwit: een eiwitvoorraad heb je niet. Vet levert de meeste energie, maar je hersenen draaien daar de eerste dagen niet op."},
  "q11": {"q": "De patiënt ligt de hele dag in bed. Heeft ze dan minder eiwit nodig dan een gezond mens?", "correct": 1, "explain": "Nee, meer: ongeveer anderhalf keer zoveel. Haar lichaam moet bot en wond herstellen, de afweer werkt met eiwitten, en in bed gaat er juist spier verloren."},
  "q15": {"q": "Het kalium van de nierpatiënt is te hoog. Elke dag eet hij een banaan, aardappelen en tomatensaus. Wat raadt de diëtist aan?", "correct": 0, "explain": "Minder vaak en andere soorten: groente en fruit mag, maar soorten met minder kalium. Aardappelen kookt hij in ruim water dat hij weggooit. Te veel kalium kan het hart onregelmatig laten kloppen."},
  "q18": {"q": "Vóór de dialyse eet hij niet meer eiwit dan nodig. Wat gebeurt er met zijn eiwitadvies als hij met dialyse begint?", "correct": 2, "explain": "Het gaat omhoog, boven dat van een gezond mens: bij elke hemodialyse verdwijnt zo'n twaalf gram aminozuren in de dialysevloeistof. Anders breekt zijn lichaam spier af."},
  "q22": {"q": "Na een week haalt de patiënt nog niet de helft van wat ze nodig heeft. Wat stelt de diëtist voor?", "correct": 1, "explain": "Sondevoeding erbij. Die komt niet pas aan het eind: een dun slangetje via de neus naar de maag vult aan wat ontbreekt, en ze mag gewoon blijven eten."}
 },
 "glossary": [
  {"t": "diëtist", "d": "Beschermde titel: alleen met een hbo-diploma Voeding en Diëtetiek. Een diëtist stelt een voedingsadvies of voedingsplan op, in een eigen praktijk of in het ziekenhuis, samen met arts, verpleegkundige en patiënt."},
  {"t": "ondervoeding", "d": "Onbedoeld afvallen, vooral aan spieren, omdat je te weinig binnenkrijgt of door ziekte. Kan ook bij een gewoon gewicht of overgewicht."},
  {"t": "screening", "d": "Een paar korte vragen bij opname (ben je onbedoeld afgevallen? had je minder trek? kreeg je al drink- of sondevoeding?). Bij een hoge score komt de diëtist."},
  {"t": "glycogeen", "d": "Voorraad glucose, als vertakte keten opgeslagen in lever en spieren. Het glycogeen in de lever is zonder eten na ongeveer een dag bijna op."},
  {"t": "spierafbraak", "d": "Zonder eten maakt de lever ook glucose uit aminozuren; die komen uit afgebroken spiereiwit, want een eiwitvoorraad heb je niet. In bed liggen en ziekte versnellen het spierverlies."},
  {"t": "nierfalen", "d": "De nieren werken bijna niet meer. Ureum, kalium, fosfaat en zout hopen op in het bloed, soms ook vocht. Het eten en drinken wordt aangepast op wat het bloed laat zien."},
  {"t": "kalium", "d": "Mineraal in onder andere aardappelen, banaan, tomaat en peulvruchten. Te veel kalium in het bloed kan het hart onregelmatig laten kloppen."},
  {"t": "fosfaatbinder", "d": "Tablet die je bij het eten slikt. Het bindt fosfaat in de darm, zodat er minder in het bloed komt; te veel fosfaat is slecht voor botten en bloedvaten."},
  {"t": "drinkvoeding en sondevoeding", "d": "Drinkvoeding: een flesje met veel eiwit en energie, naast het gewone eten. Sondevoeding: vloeibare voeding door een dun slangetje via de neus naar de maag, als iemand te weinig binnenkrijgt; vaak tijdelijk."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
