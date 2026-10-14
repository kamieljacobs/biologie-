import json
film = {
 "slug": "8-zintuigen", "hoofdstuk": "regeling", "hoofdstukNaam": "Regeling",
 "title": "Zintuigen", "sub": "Hoe je oog en je oor prikkels opvangen",
 "puzzle": "Noor loopt van een fel verlicht sportveld een donker fietspad op. Eerst ziet ze bijna niets, daarna weer wel, maar alles is grijs. Hoe komt dat?",
 "meta": "zenuwstelsel · zintuigen", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Zenuwstelsel · losse film Zintuigen",
 "lead": "Een zintuig vangt een prikkel op en richt of versterkt die, voordat receptoren er een impuls van maken. In het oog breken hoornvlies en lens het licht; voor dichtbij wordt de lens boller (accommodatie). Kegeltjes zien kleur en details bij veel licht, staafjes zijn gevoelig maar zien geen kleur; in het donker moet hun lichtgevoelige stof eerst weer worden aangemaakt. In het oor geven trommelvlies en gehoorbeentjes trillingen door aan haarcellen in het slakkenhuis; het evenwichtsorgaan voelt draaien en de stand van je hoofd.",
 "endHaak": "welke prikkel, welk zintuig, en welke receptor maakt er een impuls van?",
 "minis": {"Hoofdstuk 1": "Hoe maakt je oog een scherp beeld?", "Hoofdstuk 2": "Waarom zie je in het donker geen kleur?", "Hoofdstuk 3": "Hoe hoor je, en hoe houd je je evenwicht?", "Recap": "Waarom zag Noor eerst niets, en daarna alles grijs?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Noor ziet op het donkere fietspad eerst bijna niets, en na een tijdje alles in grijs. Hoe komt dat?", "correct": 1, "explain": "Onthoud je keuze. Het antwoord zie je in hoofdstuk 2."},
  "q06": {"q": "Je kijkt van je telefoon op naar een bord aan de overkant van de straat. Wat gebeurt er met je lens?", "correct": 0, "explain": "Voor de verte ontspant de kringspier; de lensbandjes trekken de lens platter, en die breekt het licht minder sterk."},
  "q09": {"q": "Iemand is bijziend: dichtbij ziet hij goed, ver weg wazig. Waar valt bij hem het scherpe beeld van iets in de verte?", "correct": 2, "explain": "Het oog is vaak te lang: het beeld valt vóór het netvlies. Een hol brillenglas helpt."},
  "q16": {"q": "Na een avond met heel harde muziek hoor je een hoge piep. Wat is er aan de hand?", "correct": 1, "explain": "De haarcellen in je slakkenhuis zijn overbelast. Meestal herstellen ze; een dode haarcel groeit niet terug."}
 },
 "glossary": [
  {"t": "zintuig", "d": "Orgaan met receptoren, plus onderdelen die de prikkel opvangen, richten of versterken (bijvoorbeeld oog en oor)."},
  {"t": "adequate prikkel", "d": "De prikkel waarvoor een receptor het gevoeligst is: licht voor staafjes en kegeltjes, trillingen voor haarcellen."},
  {"t": "hoornvlies", "d": "Doorzichtige voorkant van het oog; zorgt voor ongeveer tweederde van de lichtbreking."},
  {"t": "iris en pupil", "d": "De iris is het gekleurde deel met kringspieren en straalsgewijze spieren; de pupil is het gat in het midden."},
  {"t": "pupilreflex", "d": "Bij fel licht wordt de pupil binnen een seconde kleiner; een reflex."},
  {"t": "lens, straalvormig lichaam en lensbandjes", "d": "De lens hangt aan lensbandjes in het straalvormig lichaam, dat een kringspier bevat."},
  {"t": "accommodatie", "d": "De lens van vorm laten veranderen: voor dichtbij trekt de kringspier samen en wordt de lens boller."},
  {"t": "bijziend, verziend, oudziend", "d": "Bijziend: oog te lang, beeld vóór het netvlies, holle lens. Verziend: oog te kort, bolle lens. Oudziend: lens stugger, leesbril."},
  {"t": "netvlies, gele vlek, blinde vlek", "d": "Laag met lichtreceptoren; in de gele vlek liggen de kegeltjes het dichtst; in de blinde vlek (waar de oogzenuw vertrekt) liggen geen receptoren."},
  {"t": "staafjes en kegeltjes", "d": "Staafjes: zeer lichtgevoelig, geen kleur, vooral aan de rand. Kegeltjes: kleur en scherpte bij genoeg licht, drie soorten."},
  {"t": "adaptatie", "d": "Aanpassing aan de hoeveelheid licht; in het donker wordt de lichtgevoelige stof in de staafjes weer aangemaakt (20–30 minuten)."},
  {"t": "middenoor en gehoorbeentjes", "d": "Hamer, aambeeld en stijgbeugel geven de trilling van het trommelvlies door aan het ovale venster en vergroten de druk."},
  {"t": "buis van Eustachius", "d": "Verbinding tussen middenoor en keelholte; maakt de luchtdruk aan beide kanten van het trommelvlies gelijk."},
  {"t": "slakkenhuis en haarcellen", "d": "In het binnenoor; de haarcellen zijn de receptoren voor geluid en geven impulsen aan de gehoorzenuw."},
  {"t": "evenwichtsorgaan", "d": "Halfcirkelvormige kanalen (draaien) en evenwichtsblaasjes met kalkkorreltjes (stand van je hoofd, optrekken en remmen)."},
  {"t": "rodopsine en receptorpotentiaal", "d": "Lichtgevoelige stof in staafjes; door licht wordt het staafje negatiever (hyperpolarisatie) en geeft het minder signaalstof af.", "vwo": True},
  {"t": "convergentie", "d": "Veel staafjes op één zenuwcel: gevoelig, maar minder scherp.", "vwo": True},
  {"t": "basilair membraan", "d": "Vlies in het slakkenhuis; hoge tonen laten het begin trillen, lage tonen het eind.", "vwo": True}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
