import json
film = {
 "slug": "sport-5-ook-nog-hardlopen", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Ook nog hardlopen?", "sub": "zwemmen en een tweede sport",
 "puzzle": "Is een andere sport naast het zwemmen goede extra training, of kost het je juist snelheid?",
 "meta": "sport en topsport · overdracht en interferentie", "version": "1.0 · november 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Sport en topsport",
 "lead": "Een zwemmer die acht keer per week traint, wil in de herfst ook drie keer per week gaan hardlopen met vrienden. De zwemtrainer moet ja of nee zeggen. Je ziet wat er van de ene sport naar de andere overdraagt (het hart deels, de mitochondriën vooral in de spieren die je traint, botten juist door stoten), wat er schuurt (herstel, blessures als je te snel opbouwt, explosieve kracht), wat onderzoek bij jonge sporters zegt over vroeg specialiseren, en hoe een trainer kiest: wat, hoeveel en wanneer.",
 "endHaak": "welke tweede sport zou jij een zwemmer aanraden, en in welke fase van het seizoen?",
 "minis": {"Hoofdstuk 1 — Wat overdraagt": "Wat neemt een hardloper mee naar het water, en wat niet?",
           "Hoofdstuk 2 — Wat schuurt": "Waarom is een tweede sport geen gratis extra training?",
           "Hoofdstuk 3 — Vroeg specialiseren of breed sporten": "Wordt wie vroeg kiest later vaker wereldtop?",
           "Hoofdstuk 4 — Aanvulling of concurrent: hoe een trainer kiest": "Wanneer is lopen een aanvulling, en wanneer een concurrent?",
           "Recap": "Goede extra training, of snelheid kwijt?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: de zwemmer, de zwemtrainer, vrienden, kinderen van de jongste groep en twee ouders (figuranten, castboek). Getallen uit o.a. Saltin e.a. 1976, Tanaka 1994, Gómez-Bruton e.a. 2013, Vlachopoulos e.a. 2018, Guevara e.a. 2024, Schumann e.a. 2021, Güllich e.a. 2021 en Jayanthi e.a. 2019 (zie Getallen en bronnen). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · november 2026.",
 "questions": {
  "q04": {"q": "Een hardloper met een goede conditie springt het water in. Hoe gaat het zwemmen?", "correct": 2, "explain": "Slechter: hij is niet getraind voor zwemmen. Zijn hart is door duurtraining sterker, en een deel daarvan werkt ook in het water door. Maar de mitochondriën komen er vooral bij in de spieren die je traint, en zwemmen vraagt andere spieren en techniek. Zware beenspieren van het lopen zijn niet de reden."},
  "q07": {"q": "Hebben zwemmers sterkere botten dan mensen die niet sporten?", "correct": 0, "explain": "Nee, even sterk. Botten worden sterker van stoten en sprongen, en in het water draagt het water je. Uit 64 onderzoeken blijkt dat zwemmers gemiddeld even sterke botten hebben als mensen die niet sporten (Gómez-Bruton e.a. 2013). Zwemmen breekt geen bot af."},
  "q10": {"q": "Drie keer lopen, bovenop acht keer zwemmen, meteen vanaf maandag. Wat is het risico?", "correct": 1, "explain": "Hij herstelt slechter en kan geblesseerd raken, vooral als hij te snel opbouwt: zijn benen zijn de stoten van het lopen niet gewend. Bij triatleten komt een groot deel van de blessures voor bij het lopen. En er is één emmer voor herstel, voor alles samen."},
  "q14": {"q": "Moet een kind van tien al alleen zwemmen, om later top te worden?", "correct": 2, "explain": "Bij de jeugd helpt het, later minder vaak. Bij de jeugd waren de besten vaak vroeg en veel met hun sport bezig, maar in de volwassen wereldtop zaten vaker sporters die als kind ook andere sporten deden (Güllich e.a. 2021). Heel jong specialiseren hangt samen met meer overbelastingsblessures en eerder stoppen; dat is samenhang, geen bewezen oorzaak."},
  "q17": {"q": "Kost lopen deze zwemmer dus snelheid?", "correct": 0, "explain": "Alleen als het zwemtraining of herstel opeet. Lopen is een aanvulling als het iets toevoegt wat zwemmen mist (stoten voor de botten, iets anders voor het hoofd), en een concurrent als het herstel opeet of de plaats inneemt van training in het water. Sneller in het water word je door zwemtraining."}
 },
 "glossary": [
  {"t": "aerobe basis", "d": "Hoe goed je lichaam langdurig energie met zuurstof kan leveren."},
  {"t": "overdracht", "d": "Wat je in de ene sport traint en ook in een andere sport helpt (transfer). Het hart draagt deels over; de mitochondriën komen er vooral bij in de spieren die je traint."},
  {"t": "mitochondriën", "d": "De delen van een cel die met zuurstof energie vrijmaken. Door duurtraining komen er meer, vooral in de spieren die je gebruikt."},
  {"t": "botsterkte", "d": "Hoe stevig een bot is (botmassa en bouw). Botten worden sterker van stoten en sprongen, zoals bij lopen en springen; in het water draagt het water je."},
  {"t": "overbelastingsblessure", "d": "Een blessure die ontstaat doordat een lichaamsdeel vaker of zwaarder belast wordt dan het gewend is, zonder één duidelijk ongeluk; bijvoorbeeld pijn aan de scheenbenen als je te snel meer gaat lopen."},
  {"t": "herstel", "d": "De tijd en rust die je lichaam na training nodig heeft om zich aan te passen. Alle trainingen samen trekken uit dezelfde 'emmer' herstel."},
  {"t": "interferentie-effect", "d": "Twee trainingsdoelen die elkaars aanpassing afremmen als je ze tegelijk traint; bij kracht en duur vooral voor explosieve kracht."},
  {"t": "specialiseren", "d": "Je vroeg op één sport richten en het hele jaar alleen die sport trainen."},
  {"t": "seizoensfase", "d": "Een deel van het trainingsjaar met een eigen doel, zoals opbouw, wedstrijden of rust. Een trainer kiest per fase wat er in het plan past."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
