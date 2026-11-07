import json
film = {
 "slug": "gezondheidswetenschappen-2-screenen-of-niet", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Screenen of niet?", "sub": "het bevolkingsonderzoek darmkanker",
 "puzzle": "Waarom krijg je vanaf je 55e een ontlastingstest thuis, maar geen hersenscan?",
 "meta": "gezondheidswetenschappen · bevolkingsonderzoek", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Gezondheidswetenschappen",
 "lead": "Op de mat bij Opa Henk ligt een ontlastingstest. Yasmin, die snuffelstage loopt bij Epidemioloog Farid, vraagt zich af waarom je vanaf je 55e zo'n test krijgt, maar geen hersenscan. Langs één tijdlijn, van de criteria van Wilson en Jungner (1968) tot nu, zie je hoe een bevolkingsonderzoek gewogen wordt: de drie niveaus van preventie, wat een afkapwaarde is en waarom die in 2014 omhoog ging, waarom een ongunstige uitslag meestal geen kanker betekent, waarom een dalende sterfte nog niet bewijst dat het onderzoek werkt, en wie in Nederland beslist of er een bevolkingsonderzoek komt.",
 "endHaak": "voor welke ziekte zou jij een nieuw bevolkingsonderzoek willen laten wegen, en welk criterium zou het lastigst zijn?",
 "minis": {"Hoofdstuk 1": "Op welk niveau van preventie hoort een bevolkingsonderzoek?", "Hoofdstuk 2": "Van test op de mat tot kijkonderzoek: wat doet de afkapwaarde?", "Hoofdstuk 3": "Werkt het, en wat kost het?", "Hoofdstuk 4": "Wie beslist, en waarom geen hersenscan voor iedereen?", "Recap": "Waarom een ontlastingstest, en geen hersenscan?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Yasmin, Epidemioloog Farid en Opa Henk (castboek). Decor: ElevenLabs (hal en keuken van Opa Henk; kantoor uit film 1). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q05": {"q": "Op welk niveau van preventie hoort het bevolkingsonderzoek darmkanker?", "correct": 2, "explain": "Vooral vroeg vinden: het onderzoek vindt kanker vaak vóór er klachten zijn. Maar het vindt ook poliepen, die meteen worden weggehaald. Zo wordt vroeg vinden soms ook voorkómen."},
  "q10": {"q": "Honderd mensen krijgen na een ongunstige uitslag een kijkonderzoek. Bij hoeveel van hen vindt de arts darmkanker?", "correct": 1, "explain": "Bij ongeveer vier. Bij zo'n 25 zit een grote poliep, die meestal meteen wordt weggehaald; de rest heeft kleine poliepen of niets. Een ongunstige uitslag is geen diagnose."},
  "q13": {"q": "Wat gebeurt er als je de afkapwaarde hoger zet?", "correct": 0, "explain": "Minder mensen krijgen een ongunstige uitslag, dus minder kijkonderzoeken. Maar een kleine tumor die weinig bloedt, wordt vaker gemist. Het is een afweging."},
  "q16": {"q": "De sterfte aan darmkanker daalt na de start van het onderzoek. Is daarmee bewezen dat het onderzoek levens redt?", "correct": 2, "explain": "Nog niet: ook de behandeling kan in die jaren beter zijn geworden. Sterker bewijs komt uit gelote proeven: daar daalde de sterfte aan darmkanker met ongeveer 15 procent."},
  "q20": {"q": "Een MRI-scan van de hersenen ziet veel meer. Waarom krijgt niet iedereen er een?", "correct": 0, "explain": "De scan is niet gevaarlijk (geen röntgenstraling), maar vindt vaak iets waarvan niemand weet of het ooit kwaad kan. Dat geeft onrust en extra onderzoek, zonder bewezen winst."},
  "q23": {"q": "Wie beslist of er een bevolkingsonderzoek komt?", "correct": 1, "explain": "De minister van Volksgezondheid, na advies van de Gezondheidsraad. Bevolkingsonderzoek Nederland voert het uit, onder regie van het RIVM. Of je meedoet, beslis je zelf."}
 },
 "glossary": [
  {"t": "epidemiologie", "d": "Het vak dat onderzoekt hoe vaak een ziekte voorkomt in een bevolking, bij wie, en waardoor."},
  {"t": "preventie", "d": "Ziekte of de gevolgen ervan voorkómen. Drie niveaus: voorkómen dat een ziekte ontstaat, een ziekte vroeg vinden vóór er klachten zijn, en erger voorkomen bij wie al ziek is."},
  {"t": "bevolkingsonderzoek", "d": "Een onderzoek dat de overheid aanbiedt aan een hele groep mensen zonder klachten (bijvoorbeeld iedereen van 55 tot en met 75), om een ziekte of voorstadium vroeg te vinden. Meedoen is vrijwillig."},
  {"t": "poliep", "d": "Een bobbeltje aan de binnenkant van de darm. De meeste poliepen blijven onschuldig; in sommige groeit, vaak in meer dan tien jaar, darmkanker. Een poliep die is weggehaald, kan geen kanker meer worden."},
  {"t": "afkapwaarde", "d": "De grens in een test: zit er meer bloed in de ontlasting dan deze waarde, dan is de uitslag ongunstig. Een hogere afkapwaarde geeft minder kijkonderzoeken, maar mist iets vaker een kanker."},
  {"t": "ongunstige uitslag", "d": "Een testuitslag boven de afkapwaarde. Het is een reden om verder te kijken (meestal met een kijkonderzoek), geen diagnose: bij ongeveer vier van de honderd kijkonderzoeken blijkt het kanker."},
  {"t": "kijkonderzoek (coloscopie)", "d": "Onderzoek waarbij de arts met een slangetje met een camera de dikke darm van binnen bekijkt en poliepen meteen kan weghalen."},
  {"t": "gelote proef", "d": "Onderzoek waarin het lot bepaalt wie iets wel en niet krijgt (hier: een uitnodiging). Zo verschillen de groepen alleen daarin, en kun je een verschil in sterfte aan het onderzoek toeschrijven."},
  {"t": "toevalsvondst", "d": "Iets wat een scan of test bij toeval vindt terwijl je er niet naar zocht, bijvoorbeeld een verwijd bloedvat. Van veel toevalsvondsten weet niemand of ze ooit kwaad kunnen."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
