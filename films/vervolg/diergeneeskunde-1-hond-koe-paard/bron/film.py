import json
film = {
 "slug": "diergeneeskunde-1-hond-koe-paard", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Hond, koe, paard", "sub": "hetzelfde lichaam, anders gebouwd",
 "puzzle": "Waarom heeft een koe vier magen nodig, en een hond niet?",
 "meta": "diergeneeskunde · vergelijkende anatomie", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Diergeneeskunde",
 "lead": "Op één dag ziet Dierenarts Mila een koe die niet eet, een paard met koliek en een kat die paracetamol kreeg. Zoogdieren delen één bouwplan, maar wat normaal is, verschilt per soort. Een koe laat microben in haar pens de cellulose afbreken en herkauwt; een paard gist achteraan en kan bijna niet braken. En een kat breekt paracetamol slecht af: wat voor jou veilig is, kan een dier doden. Daarom doseert een dierenarts per soort, per ras en per dier.",
 "endHaak": "welk dier zou jij als dierenarts het moeilijkst vinden om te onderzoeken, en waarom?",
 "minis": {"Hoofdstuk 1": "Wat hebben mens, hond en paard gemeen?", "Hoofdstuk 2": "Hoe haalt een koe energie uit gras?", "Hoofdstuk 3": "Waarom is koliek een spoedgeval?", "Hoofdstuk 4": "Waarom mag een kat geen paracetamol?", "Recap": "Wat maakt een dierenarts tot vergelijkend bioloog?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Dierenarts Mila en Noor (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Mila behandelt koeien, paarden en katten, maar deed maar één studie. Hoe kan dat?", "correct": 0, "explain": "Zoogdieren delen één bouwplan (homologe botten en organen), met per soort andere aanpassingen en normaalwaarden."},
  "q07": {"q": "Een koe heeft geen enzymen voor cellulose. Hoe haalt ze toch energie uit gras?", "correct": 1, "explain": "Microben in de pens breken de cellulose af tot vetzuren, die de koe opneemt als belangrijkste brandstof."},
  "q14": {"q": "De kat van Noor kreeg een halve tablet paracetamol. Wat gebeurt er?", "correct": 2, "explain": "Een kat mist een groot deel van het enzym voor de gewone afbraak; al bij een kleine hoeveelheid ontstaat een giftig tussenproduct dat rode bloedcellen en lever beschadigt."}
 },
 "glossary": [
  {"t": "homologe organen", "d": "Organen of botten met dezelfde bouw en afkomst maar soms een andere functie, zoals de arm van een mens en het voorbeen van een paard."},
  {"t": "normaalwaarde", "d": "Wat bij een gezond dier normaal is, zoals hartslag of temperatuur; verschilt sterk per diersoort."},
  {"t": "herkauwer", "d": "Dier met een maag in vier delen dat zijn voedsel opnieuw kauwt, zoals koe, schaap en geit."},
  {"t": "pens", "d": "Grootste deel van de maag van een herkauwer: een gistingsvat waarin microben cellulose afbreken tot vetzuren."},
  {"t": "lebmaag", "d": "Het vierde deel van de maag van een herkauwer, met maagzuur en enzymen: de 'echte' maag."},
  {"t": "lebmaagverplaatsing", "d": "De lebmaag vult zich met gas en schuift omhoog; de dierenarts hoort een hoge ping als ze tegen de buik tikt."},
  {"t": "blinde darm", "d": "Bij een paard een grote zak aan het begin van de dikke darm, waarin microben plantenvezels vergisten."},
  {"t": "koliek", "d": "Buikpijn bij een paard, bijvoorbeeld door een verstopte of gedraaide darm; een spoedgeval omdat een paard bijna niet kan braken."},
  {"t": "MDR1-mutatie", "d": "Afwijking bij veel collies in het gen voor een pompje in de bloed-hersenbarrière; sommige middelen hopen zich dan op in de hersenen."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
