import json
film = {
 "slug": "3-anticonceptie-soa-voortplantingstechniek", "hoofdstuk": "voortplanting", "hoofdstukNaam": "Voortplanting",
 "title": "Anticonceptie, soa's en voortplantingstechniek", "sub": "Een schakel eruit, een schakel erbij",
 "puzzle": "Van honderd vrouwen die een jaar de pil slikken: hoeveel worden er toch zwanger?",
 "meta": "voortplanting · anticonceptie en soa's", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Voortplanting · film 3",
 "lead": "Een zwangerschap is een keten: eisprong, bevruchting, innesteling. Anticonceptie haalt er een schakel uit; hoe betrouwbaar dat is, hangt ook af van hoe je een methode gebruikt (Pearl-index). Alleen het condoom beschermt ook tegen soa's. Soa's door bacteriën zijn met antibiotica te genezen, soa's door virussen niet; vaak merk je niets, dus testen is belangrijk. Voortplantingstechniek helpt juist een schakel: kunstmatige inseminatie, ivf, ICSI en donatie.",
 "endHaak": "welke schakel in de keten zou jij als eerste willen beschermen, en waarom?",
 "minis": {"Hoofdstuk 1": "Hoe voorkom je een zwangerschap?", "Hoofdstuk 2": "Wat is een soa, en wat kun je ertegen doen?", "Hoofdstuk 3": "Hoe help je een zwangerschap op weg?", "Recap": "Een schakel eruit, een schakel erbij"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Lotte, dokter Kim en Sam (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Van de honderd vrouwen die een jaar de pil slikken: hoeveel worden er gemiddeld toch zwanger?", "correct": 1, "explain": "Ongeveer zeven, bij normaal gebruik: vooral door vergeten pillen. Bij perfect gebruik minder dan één."},
  "q08": {"q": "Welke van deze soa's kun je genezen met een kuur antibiotica?", "correct": 2, "explain": "Gonorroe: die wordt veroorzaakt door een bacterie. Hiv en herpes zijn virussen; daar doen antibiotica niets tegen."},
  "q12": {"q": "Waarom krijgt de vrouw bij ivf eerst ongeveer tien dagen hormooninjecties?", "correct": 0, "explain": "Met extra FSH rijpen meerdere follikels tegelijk, dus krijg je meer eicellen."}
 },
 "glossary": [
  {"t": "anticonceptie", "d": "Een methode om een zwangerschap te voorkomen door een schakel uit de keten te halen: eisprong, bevruchting of innesteling."},
  {"t": "pil", "d": "Tablet met nagemaakte geslachtshormonen die de eisprong remt (ook prikpil, staafje en ring werken zo)."},
  {"t": "spiraaltje", "d": "T-vormig voorwerpje in de baarmoeder: het hormoonspiraaltje maakt de slijmprop taai, het koperspiraaltje is giftig voor zaadcellen en maakt het slijmvlies ongeschikt voor innesteling."},
  {"t": "sterilisatie", "d": "Afsluiten van de zaadleiders (man) of de eileiders (vrouw); blijvende anticonceptie."},
  {"t": "morning-afterpil", "d": "Noodpil die binnen drie tot vijf dagen na onbeschermde seks de eisprong uitstelt; geen abortuspil."},
  {"t": "Pearl-index", "d": "Maat voor betrouwbaarheid: het aantal zwangerschappen per honderd vrouwen die een jaar een methode gebruiken."},
  {"t": "soa", "d": "Seksueel overdraagbare aandoening, veroorzaakt door een bacterie (chlamydia, gonorroe, syfilis) of een virus (hiv, HPV, herpes, hepatitis B)."},
  {"t": "antibiotica", "d": "Medicijnen die bacteriën doden of remmen; werken niet tegen virussen."},
  {"t": "HPV-vaccinatie", "d": "Prik tegen het humaan papillomavirus, voor jongens en meisjes rond hun tiende (Rijksvaccinatieprogramma); beschermt tegen onder meer baarmoederhalskanker."},
  {"t": "hiv-remmers / PrEP", "d": "Medicijnen die het hiv-virus onderdrukken; PrEP is een pil die besmetting met hiv voorkomt."},
  {"t": "kunstmatige inseminatie", "d": "Zaadcellen worden rond de eisprong hoog in de baarmoeder gespoten."},
  {"t": "ivf", "d": "In-vitrofertilisatie: bevruchting buiten het lichaam, in een schaaltje; daarna wordt een embryo teruggeplaatst."},
  {"t": "ICSI", "d": "Bij ivf: één zaadcel rechtstreeks in de eicel spuiten."},
  {"t": "resistentie", "d": "Bacteriën die niet meer gevoelig zijn voor een antibioticum, door selectie van toevallige mutaties."},
  {"t": "embryoselectie (PGT)", "d": "Een paar cellen van een ivf-embryo testen op een ernstige erfelijke ziekte, en alleen een embryo zonder die ziekte terugplaatsen."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
