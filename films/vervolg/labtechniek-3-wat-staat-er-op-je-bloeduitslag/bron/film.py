import json
film = {
 "slug": "labtechniek-3-wat-staat-er-op-je-bloeduitslag", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Wat staat er op je bloeduitslag?", "sub": "buisjes, bloedbeeld, chemie en bloedbank",
 "puzzle": "Op een labformulier staan Hb, leukocyten en CRP. Wat vertelt elk getal?",
 "meta": "laboratoriumtechniek · bloedonderzoek", "alleen": "havo · vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Laboratoriumtechniek",
 "lead": "Opa Henk is moe en heeft koorts, en volgende maand krijgt hij een nieuwe heup. Yasmin, stagiair analist, volgt zijn vier buisjes door het ziekenhuislab. In het paarse buisje bindt EDTA het calcium, zodat de cellen los blijven voor de celteller. Uit het gele buisje komt serum voor de chemie: CRP, glucose en ALAT. Naast elk getal staat een referentiewaarde, het bereik waarbinnen 95 % van gezonde mensen valt. En in de bloedbank bepaalt Yasmin zijn bloedgroep, uit twee buisjes. Het lab meet; de arts legt de getallen naast de klachten.",
 "endHaak": "welke waarde zou jij op je eigen uitslag willen begrijpen?",
 "minis": {"Hoofdstuk 1 — Buisjes, stolling en centrifuge": "Waarom heeft elk buisje een andere dop?", "Hoofdstuk 2 — Het bloedbeeld": "Hoe telt een apparaat miljarden cellen?", "Hoofdstuk 3 — Klinische chemie": "Wat betekent een waarde net boven de grens?", "Hoofdstuk 4 — In de bloedbank": "Waarom moet een bloedgroep uit twee buisjes komen?", "Recap": "Wat vertelt het formulier van Opa Henk?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Yasmin, Dr. Kim en Opa Henk (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Opa Henks bloed zit in vier buisjes met verschillende doppen. Waarom niet alles uit één buisje?", "correct": 1, "explain": "Elk soort buisje bevat een andere stof die bij een meting past: EDTA (paars) voor het bloedbeeld, een stollingsversneller met gel (geel) voor serum, fluoride (grijs) voor glucose. Het tweede paarse buisje gaat apart naar de bloedbank."},
  "q09": {"q": "De bovengrens voor ALAT is 45 eenheden per liter. Opa Henk heeft 48. Wat betekent dat?", "correct": 2, "explain": "Nog weinig. Een referentiewaarde is het bereik van 95 % van gezonde mensen; 1 op de 20 gezonde mensen valt erbuiten. De arts kijkt hoe ver erbuiten en of het past bij de andere uitslagen en de klachten."},
  "q12": {"q": "Een bloedgroep is pas definitief als hij uit twee apart afgenomen buisjes komt. Waarom?", "correct": 0, "explain": "Zo valt een buisje met het verkeerde etiket op. Een verwisseling kan leiden tot een transfusie met de verkeerde bloedgroep. Een bloedgroep verandert normaal niet (alleen bijvoorbeeld na een stamceltransplantatie)."}
 },
 "glossary": [
  {"t": "EDTA-buis", "d": "Buisje met paarse dop; EDTA bindt calciumionen, zodat het bloed niet stolt en de cellen los blijven voor het bloedbeeld."},
  {"t": "serum", "d": "De vloeistof boven het stolsel na stollen en centrifugeren: plasma zonder fibrinogeen. Hierin meet de chemie stoffen als CRP en ALAT."},
  {"t": "bloedbeeld", "d": "Telling van rode en witte bloedcellen en bloedplaatjes plus het Hb, gemeten door een automatische celteller."},
  {"t": "Hb (hemoglobine)", "d": "De hoeveelheid hemoglobine in het bloed; in Nederland in millimol per liter (bij mannen ongeveer 8,5 tot 11)."},
  {"t": "leukocyten en trombocyten", "d": "Witte bloedcellen (ongeveer 4 tot 10 à 11 miljard per liter) en bloedplaatjes (ongeveer 150 tot 400 miljard per liter)."},
  {"t": "CRP", "d": "C-reactief proteïne: eiwit dat de lever extra maakt bij een ontsteking; stijgt binnen uren, het hoogst na ongeveer twee dagen. Zegt niet waar of waardoor."},
  {"t": "ALAT", "d": "Enzym dat vooral in levercellen zit; gaan levercellen kapot, dan stijgt het in het bloed."},
  {"t": "referentiewaarde", "d": "Het bereik waarbinnen 95 % van gezonde mensen valt (normaalwaarde); een waarde erbuiten is niet vanzelf ziek. Verschilt iets per lab."},
  {"t": "kruisproef", "d": "Plasma van de ontvanger mengen met rode bloedcellen uit het donorzakje; klontert er niets, dan past het zakje. Nodig als de ontvanger klinisch belangrijke irreguliere antistoffen heeft."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
