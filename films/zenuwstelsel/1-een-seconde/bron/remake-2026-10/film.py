import json
film = {
 "slug": "1-een-seconde-nieuw", "audioslug": "1-een-seconde", "hoofdstuk": "zenuwstelsel", "hoofdstukNaam": "Regeling",
 "title": "Eén seconde", "sub": "het zenuwstelsel in vogelvlucht",
 "puzzle": "Een bal rolt de straat op. Je handen knijpen al in de remmen voordat je het kind ziet. Hoe kan je lichaam reageren voordat jij het weet?",
 "meta": "zenuwstelsel 1", "alleen": "vwo", "version": "2.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Zenuwstelsel · film 1 · volgende: <a href=\"2-het-kabelnetwerk.html\">Het kabelnetwerk</a>",
 "lead": "Eén seconde op de fiets: een bal rolt de straat op, je remt, en pas daarna zie je het kind. In die seconde komt het hele zenuwstelsel voorbij: centraal en perifeer, prikkel en impuls, de weg via de hersenen, de reflexboog door het ruggenmerg, het autonome zenuwstelsel als gas en rem, en waarom bewust worden tijd kost. Het overzicht van de reeks; 5 vwo.",
 "endHaak": "Volgende film: Het kabelnetwerk, hoe een zenuwcel een bericht verstuurt.",
 "minis": {"Hoofdstuk 1": "Wat hoort er bij je zenuwstelsel?", "Hoofdstuk 2": "Wat is het verschil tussen een prikkel en een impuls?", "Hoofdstuk 3": "Welke weg neemt het signaal als je remt?",
           "Hoofdstuk 4": "Waarom is een reflex zo snel?", "Hoofdstuk 5": "Wie regelt je hart?", "Hoofdstuk 6": "Wanneer weet je het echt?", "Samenvatting — Terug naar de seconde": "Wat gebeurde er in die ene seconde?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_multilingual_v2; zes vragen en het antwoord op vraag 3 opnieuw ingesproken op 29 okt 2026). Script, animatie en speler: Kamiel met Claude. Personages: Daan en Teun (castboek). Tekeningen: gedeelde bibliotheek (hoofd met hersenen, zenuwcel, arm, hart) en eigen tekeningen (fiets, oog, zenuw en ruggenmerg in doorsnede). Stijl: Part C. Versie 2.0 · 29 oktober 2026 (lichte remake, prompt v13); 1.2 · 28 oktober 2026; 1.1 · 4 oktober 2026.",
 "questions": {
  "v1": {"q": "Een zenuw in je arm is…", "correct": 1, "explain": "Een bundel: een zenuw zit vol lange uitlopers van heel veel zenuwcellen (neuronen)."},
  "v2": {"q": "Je drukt in het donker zachtjes op je gesloten oog en ziet een lichtvlek. Hoe kan dat?", "correct": 1, "explain": "De druk prikkelt de receptoren; hun impuls komt aan in het deel van je hersenen dat 'zien' maakt, dus ervaar je licht."},
  "v3": {"q": "Je hand knijpt al in de rem. Waar is het signaal geweest?", "correct": 1, "explain": "In de hersenen: daar wordt het beeld verwerkt, en vandaar gaat een nieuwe impuls via het ruggenmerg naar je handen."},
  "v4": {"q": "Je hand raakt iets scherps. Wat gebeurt er eerst?", "correct": 1, "explain": "Je hand trekt eerst weg (reflex via het ruggenmerg); pas daarna komt de impuls in je hersenen aan en voel je pijn."},
  "v5": {"q": "Het kind staat veilig op de stoep. Je hart komt tot rust. Hoe?", "correct": 1, "explain": "Het parasympathische deel (de rem) wordt actiever én het sympathische deel (het gas) minder actief."},
  "v6": {"q": "In het ruggenmerg zie je grijze stof en witte stof. Wat zit er in de grijze stof?", "correct": 0, "explain": "De cellichamen van neuronen. De witte stof bevat de uitlopers met hun vettige laag."}
 },
 "glossary": [
  {"t": "zenuwstelsel", "d": "Het orgaanstelsel dat informatie opneemt, verwerkt en doorgeeft: hersenen, ruggenmerg en zenuwen."},
  {"t": "centraal zenuwstelsel", "d": "Hersenen en ruggenmerg samen."},
  {"t": "perifeer zenuwstelsel", "d": "Alle zenuwen buiten het centrale zenuwstelsel."},
  {"t": "zenuw", "d": "Een bundel van lange uitlopers van veel zenuwcellen."},
  {"t": "neuron", "d": "Een zenuwcel; geleidt impulsen."},
  {"t": "impuls", "d": "Het signaal dat door een neuron loopt."},
  {"t": "prikkel", "d": "Een invloed van buiten (licht, geluid, druk) waarop een receptor reageert."},
  {"t": "receptor", "d": "Een cel die een prikkel omzet in een impuls."},
  {"t": "drempelwaarde", "d": "De minimale prikkelsterkte waarbij een receptor een impuls afgeeft."},
  {"t": "sensorisch neuron", "d": "Neuron dat impulsen van een receptor naar het centrale zenuwstelsel brengt."},
  {"t": "schakelneuron", "d": "Neuron in het centrale zenuwstelsel dat impulsen doorgeeft tussen andere neuronen."},
  {"t": "motorisch neuron", "d": "Neuron dat impulsen van het centrale zenuwstelsel naar een effector brengt."},
  {"t": "effector", "d": "Het orgaan dat reageert: een spier of een klier."},
  {"t": "reflex", "d": "Een snelle, aangeboren, altijd gelijke reactie die buiten de hersenen om via het ruggenmerg verloopt."},
  {"t": "reflexboog", "d": "De route receptor → sensorisch neuron → schakelneuron → motorisch neuron → effector."},
  {"t": "animaal zenuwstelsel", "d": "Het deel dat de skeletspieren aanstuurt, vaak bewust."},
  {"t": "autonoom zenuwstelsel", "d": "Het deel dat de organen regelt, onbewust."},
  {"t": "sympathisch deel", "d": "Deel van het autonome zenuwstelsel dat het lichaam klaarmaakt voor actie."},
  {"t": "parasympathisch deel", "d": "Deel van het autonome zenuwstelsel voor rust, vertering en herstel."},
  {"t": "grijze stof", "d": "Gebied in hersenen en ruggenmerg met vooral cellichamen van neuronen."},
  {"t": "witte stof", "d": "Gebied met vooral uitlopers van neuronen, wit door de vettige laag eromheen."}
 ]
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
