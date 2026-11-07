import json
film = {
 "slug": "8-honingbij", "hoofdstuk": "gedrag", "hoofdstukNaam": "Gedrag",
 "title": "De dans van de honingbij", "sub": "Rondedans, kwispeldans en een klok in je hoofd",
 "puzzle": "Eén bij vindt een schaaltje suikerwater op bijna een kilometer van de kast. Een halfuur later zitten er tientallen. Hoe vonden ze het?",
 "meta": "gedrag · communicatie bij bijen", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Gedrag · film 8 van 12",
 "lead": "Een verkenster vertelt met een dans waar voedsel is. Rondedans: voedsel vlakbij, ga zoeken. Kwispeldans: de hoek van het rechte stuk ten opzichte van recht omhoog op de raat is de hoek tussen voedsel en zon; hoe langer het kwispelen, hoe verder weg. Omdat de zon opschuift, past de bij met haar inwendige klok de dans aan. De dans is grotendeels aangeboren.",
 "endHaak": "hoe zou jij zonder woorden de weg naar de kantine uitleggen?",
 "minis": {"Hoofdstuk 1": "Hoe vertelt een bij waar voedsel is?", "Hoofdstuk 2": "Hoe zit richting en afstand in de kwispeldans?", "Hoofdstuk 3": "Wat doet de bij als de zon opschuift?", "Recap": "Hoe vonden de bijen het schaaltje?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Opa Henk en Noor (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Hoe vonden al die bijen het schaaltje?", "correct": 1, "explain": "De eerste bij, een verkenster, vertelde het de anderen met een dans."},
  "q06": {"q": "Recht stuk recht omhoog, elke keer twee seconden kwispelen. Waar liggen de bloemen?", "correct": 1, "explain": "Recht omhoog = richting van de zon; 2 s kwispelen ≈ 2 km."},
  "q09": {"q": "Dezelfde bloemen, om tien uur en om twaalf uur. Wat gebeurt er met de dans?", "correct": 1, "explain": "De zon schuift op, dus de hoek tussen bloemen en zon verandert: het rechte stuk draait mee."}
 },
 "glossary": [
  {"t": "communicatie", "d": "Een zender geeft een signaal dat het gedrag van een ontvanger verandert."},
  {"t": "verkenster", "d": "Werkster die voedsel zoekt en de andere bijen vertelt waar het is."},
  {"t": "rondedans", "d": "Dans in kleine rondjes, afwisselend linksom en rechtsom: voedsel dichtbij, ga zoeken (geen duidelijke richting)."},
  {"t": "kwispeldans", "d": "Achtvormige dans met een recht stuk waarin de bij kwispelt: de hoek t.o.v. recht omhoog = de hoek t.o.v. de zon; de duur van het kwispelen = de afstand."},
  {"t": "inwendige klok", "d": "Biologische klok waarmee de bij rekening houdt met de opschuivende zon."},
  {"t": "dialect", "d": "Per ras verschilt hoeveel afstand een seconde kwispelen betekent; dat verschil is erfelijk."},
  {"t": "harmonische radar", "d": "vwo · Radar die een piepklein antennetje op een bij volgt; zo zie je hoe een bij na een dans vliegt."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
