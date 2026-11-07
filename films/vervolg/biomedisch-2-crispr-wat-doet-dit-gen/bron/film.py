import json
film = {
 "slug": "biomedisch-2-crispr-wat-doet-dit-gen", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "CRISPR: wat doet dit gen?", "sub": "van verband naar oorzaak, en de grens bij mensen",
 "puzzle": "Een gen wijkt vaker af bij mensen met een ziekte. Hoe bewijs je dat het de oorzaak is, en mag je het repareren?",
 "meta": "biomedische wetenschappen · genetisch onderzoek", "alleen": "havo · vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Biomedische wetenschappen",
 "lead": "Bij Opa Henk en zijn dochter Linda is het cholesterol heel hoog, en in hun DNA zit dezelfde afwijking in één gen. Dat is een verband, nog geen oorzaak. Bij hen werkt het gen PCSK9 juist te hard. Om de functie van een gen te vinden, schakelen onderzoekers het uit — met CRISPR — en vergelijken ze met een controlegroep. Daarvoor kiezen ze een modelorganisme dat bij de vraag past: gist, de worm C. elegans, een doorzichtig zebravisembryo of een muis. Werkt het, dan komt de stap naar patiënten, en de vraag waar de grens ligt: een verandering in lichaamscellen blijft bij de patiënt zelf, een verandering in de kiembaan gaat naar alle generaties daarna — en die is in Nederland verboden.",
 "endHaak": "zou jij het DNA van een embryo laten veranderen om een ernstige ziekte te voorkomen?",
 "minis": {"Hoofdstuk 1": "Waarom is een verband nog geen oorzaak?", "Hoofdstuk 2": "Waarom kiest een onderzoeker juist dit dier?", "Hoofdstuk 3": "Wat meet je in een knock-outmuis?", "Hoofdstuk 4": "Wat mag wel en niet bij mensen?", "Recap": "Welke weg loopt elk genonderzoek?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Opa Henk, Linda, Teun en Dr. Kim (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Bij Henk en bij Linda zit dezelfde afwijking in één gen. Is dat gen daarmee de oorzaak van hun hoge cholesterol?", "correct": 1, "explain": "Er is nu een verband. De afwijking kan meeliften met het echte ziektegen, of in deze familie toevallig met de ziekte meegaan. Je hebt meer families nodig, en daarna een proef waarin je het gen zelf uitschakelt."},
  "q08": {"q": "Onderzoekers willen weten wat een gen doet in een kloppend hart in een embryo. Waarom kiezen ze daarvoor vaak de zebravis?", "correct": 0, "explain": "Een zebravisembryo groeit buiten de moeder en is glashelder, dus je kunt het hart zien kloppen terwijl het zich vormt. Ongeveer 70% van de menselijke genen heeft bij de zebravis een tegenhanger."},
  "q12": {"q": "Het eiwit PCSK9 laat LDL-receptoren op levercellen afbreken. Onderzoekers schakelen het gen voor PCSK9 uit in de lever van muizen. Wat meten ze?", "correct": 2, "explain": "Minder cholesterol in het bloed: zonder PCSK9 blijven er meer LDL-receptoren op de levercellen zitten, en die halen meer cholesterol uit het bloed."},
  "q16": {"q": "Bij een CRISPR-infuus is het DNA in de levercellen van een patiënt veranderd. Wat betekent dat voor zijn kinderen?", "correct": 1, "explain": "Zij erven de verandering niet. Alleen de levercellen zijn aangepast; de geslachtscellen zijn ongemoeid. Zo'n verandering in lichaamscellen heet somatisch."}
 },
 "glossary": [
  {"t": "verband en oorzaak", "d": "Een genvariant die vaker voorkomt bij patiënten hééft een verband met de ziekte; voor een oorzaak moet je zelf aan het gen draaien en zien wat er verandert."},
  {"t": "meeliften", "d": "Een variant die zelf niets doet maar dicht bij het echte ziektegen ligt en daardoor meegaat met de ziekte in een familie."},
  {"t": "PCSK9", "d": "Gen en eiwit; het eiwit laat LDL-receptoren op levercellen afbreken. Meer PCSK9 betekent minder receptoren en dus meer cholesterol in het bloed. Bij Henk en Linda werkt het gen te hard (meer PCSK9); bij mensen met een kapotte kopie juist minder."},
  {"t": "LDL-receptor", "d": "Eiwit in het membraan van een levercel dat LDL-cholesteroldeeltjes uit het bloed naar binnen haalt."},
  {"t": "modelorganisme", "d": "Soort die onderzoekers overal gebruiken omdat je hem goed kunt houden, kweken en veranderen: gist, C. elegans, zebravis, muis. Elk past bij een andere vraag."},
  {"t": "knock-out", "d": "Organisme of cel waarin één gen opzettelijk is uitgeschakeld, om te zien wat er dan niet meer werkt."},
  {"t": "gids-RNA", "d": "Kort stukje RNA met een volgorde die de onderzoeker kiest; het past via baseparing precies op één plek in het DNA en brengt het enzym Cas9 daarheen."},
  {"t": "controlegroep", "d": "Groep die alles krijgt behalve de ingreep zelf, zodat je weet dat het verschil door de ingreep komt en niet door de behandeling eromheen."},
  {"t": "somatische gentherapie", "d": "Het DNA van lichaamscellen van een patiënt veranderen; de verandering blijft bij die patiënt en gaat niet over op kinderen."},
  {"t": "kiembaanverandering", "d": "Het DNA van een eicel, zaadcel of embryo veranderen; de verandering zit dan in elke cel van het kind en in alle generaties daarna. In Nederland verboden door de Embryowet."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
