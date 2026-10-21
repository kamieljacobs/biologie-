import json
film = {
 "slug": "tandheelkunde-1-zuur-in-je-mond", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Zuur in je mond", "sub": "tandplak, zuurcurve en erosie",
 "puzzle": "Waarom is de hele dag door snoepen erger voor je tanden dan in één keer een zak leeg?",
 "meta": "tandheelkunde en mondzorg · preventie", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Tandheelkunde en mondzorg",
 "lead": "Bilal en Sam eten even veel snoep, maar Bilal neemt de hele middag om het kwartier een snoepje. Tandplak is een biofilm van bacteriën die van suiker melkzuur maken; onder een pH van ongeveer 5,5 lost glazuur op, en speeksel herstelt het weer. Daarom telt hoe vaak je eet zwaarder dan hoeveel. Zuur uit frisdrank tast het glazuur ook aan, zonder bacteriën: erosie. Mondhygiënist Ilse laat zien hoe fluoride, speeksel en goed poetsen het glazuur beschermen.",
 "endHaak": "hoeveel eet- en drinkmomenten had jij gisteren?",
 "minis": {"Hoofdstuk 1": "Wat is tandplak eigenlijk?", "Hoofdstuk 2": "Waarom telt hoe vaak je eet?", "Hoofdstuk 3": "Wat is erosie?", "Hoofdstuk 4": "Hoe helpt fluoride?", "Recap": "Waarom kreeg Bilal meer kans op gaatjes?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Mondhygiënist Ilse, Bilal en Sam (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Bilal en Sam eten even veel snoep. Bilal neemt om het kwartier een snoepje, Sam eet de zak in één keer leeg. Wie loopt de meeste kans op gaatjes?", "correct": 2, "explain": "Bilal: na elk snoepje daalt de pH in de plak opnieuw, zodat zijn glazuur de hele middag geen kans krijgt om te herstellen."},
  "q11": {"q": "Sam neemt na zijn snoep een suikervrije kauwgom. Helpt dat?", "correct": 0, "explain": "Ja: kauwen maakt veel speeksel aan, en dat brengt de pH sneller omhoog. Plak weghalen doet kauwgom niet."},
  "q15": {"q": "Bilal stapt over op light cola. Is dat goed voor zijn tanden?", "correct": 2, "explain": "Half: zonder suiker maken bacteriën geen zuur, dus minder kans op gaatjes. Maar de cola is zelf zuur en tast het glazuur aan (erosie)."}
 },
 "glossary": [
  {"t": "tandplak", "d": "Biofilm op je tanden: bacteriën in een kleverige laag die ze zelf maken; spoelen helpt niet, poetsen wel."},
  {"t": "biofilm", "d": "Laag van micro-organismen die samen vastzitten in een slijm dat ze zelf maken, en daardoor beter beschermd zijn."},
  {"t": "glazuur", "d": "Buitenste laag van de tand, van kristallen van calcium en fosfaat; het hardste materiaal in je lichaam."},
  {"t": "zuurcurve", "d": "Hoe de pH in de plak na een hap suiker binnen minuten daalt en na een half uur tot een uur weer herstelt (Stephan-curve)."},
  {"t": "kritische pH", "d": "pH waaronder glazuur oplost: ongeveer 5,5; glazuur met fluoride houdt het langer vol, tot ongeveer 4,5."},
  {"t": "cariës", "d": "Gaatjes: glazuur en tandbeen lossen op door zuur dat bacteriën in de plak van suiker maken."},
  {"t": "erosie", "d": "Glazuur dat slijt door zuur uit eten en drinken of maagzuur, zonder dat er bacteriën aan te pas komen."},
  {"t": "fluoride", "d": "Stof in tandpasta die het ontkalken remt en het herstel van glazuur versnelt; daarom na het poetsen niet naspoelen."},
  {"t": "mondhygiënist", "d": "Mondzorgverlener (hbo Mondzorgkunde) die plak en tandsteen verwijdert, het tandvlees controleert en preventie geeft."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
