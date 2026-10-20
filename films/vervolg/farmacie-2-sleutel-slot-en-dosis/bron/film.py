import json
film = {
 "slug": "farmacie-2-sleutel-slot-en-dosis", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Sleutel, slot en dosis", "sub": "waar een medicijn aangrijpt en waarom meer niet altijd beter is",
 "puzzle": "Helpen drie tabletten ibuprofen drie keer zo goed als één?",
 "meta": "farmacie · farmacologie", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Farmacie",
 "lead": "Sam heeft zijn enkel verzwikt en wil er nog twee ibuprofen bij nemen. Maar een medicijn grijpt aan op een eiwit: een receptor, een enzym, een transporteiwit of een ionkanaal. Zijn die bijna allemaal bezet, dan komt er weinig effect meer bij: de dosis-responscurve vlakt af. De kans op schade groeit wel door. De afstand tussen werkzaam en giftig heet de therapeutische breedte: groot bij penicilline, klein bij lithium. En omdat hetzelfde slot vaak ook op een andere plek zit, heeft een medicijn bijwerkingen.",
 "endHaak": "welk medicijn in jullie medicijnkast heeft een maximum per dag, en waarom juist dat getal?",
 "minis": {"Hoofdstuk 1": "Op welke vier soorten eiwitten kan een medicijn aangrijpen?", "Hoofdstuk 2": "Waarom vlakt de dosis-responscurve af?", "Hoofdstuk 3": "Waarom moet iemand die lithium gebruikt bloed laten prikken?", "Hoofdstuk 4": "Waarom kan ibuprofen je maagwand beschadigen?", "Recap": "Wat doet Sam in plaats van extra tabletten nemen?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Sam, Bilal en Yasmin (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Sam heeft één tablet ibuprofen van 400 mg genomen en wil er nog twee bij. Helpen drie tabletten drie keer zo goed?", "correct": 1, "explain": "Nee. Bij ongeveer 400 mg zijn de meeste enzymen al geremd; extra stof geeft nauwelijks meer pijnstilling, wel meer kans op bijwerkingen zoals maagschade."},
  "q06": {"q": "Een tweede pijnstiller bereikt hetzelfde maximale effect als ibuprofen, maar al bij een tien keer lagere dosis. Wat betekent dat?", "correct": 0, "explain": "Hij is krachtiger per milligram (de curve ligt verder naar links), maar het maximale effect is gelijk. Je hebt er alleen minder van nodig."},
  "q09": {"q": "Bij lithium liggen de werkzame en de schadelijke dosis dicht bij elkaar. Wat moet iemand die lithium gebruikt daarom doen?", "correct": 2, "explain": "Regelmatig bloed laten prikken. Het lab meet of de bloedspiegel tussen de twee grenzen ligt; zo nodig past de arts de dosis aan."}
 },
 "glossary": [
  {"t": "aangrijpingspunt", "d": "Het eiwit waarop een medicijn werkt: meestal een receptor, een enzym, een transporteiwit of een ionkanaal."},
  {"t": "agonist", "d": "Stof die op een receptor past en hem aanzet, zoals morfine op de opioïdreceptor; zie Knoeien met de spleet."},
  {"t": "antagonist", "d": "Stof die op een receptor past maar hem niet aanzet; hij blokkeert de plek voor de echte stof. Voorbeeld: naloxon bij een overdosis morfine."},
  {"t": "enzymremmer", "d": "Medicijn dat in een enzym gaat zitten en het stillegt, zoals ibuprofen in het enzym dat stoffen voor pijn en ontsteking maakt (COX)."},
  {"t": "dosis-responscurve", "d": "Grafiek van het effect tegen de dosis: eerst stijgt het effect snel, daarna vlakt het af omdat bijna alle doelwitten bezet zijn."},
  {"t": "maximaal effect", "d": "De hoogte waarop de dosis-responscurve afvlakt: meer effect valt er met dat middel niet te halen."},
  {"t": "potentie", "d": "Hoeveel stof je nodig hebt voor een bepaald effect. Een middel met een hoge potentie werkt al bij een lage dosis (curve verder naar links), maar is daarmee niet beter."},
  {"t": "therapeutische breedte", "d": "De afstand tussen de dosis die werkt en de dosis die schaadt. Groot bij penicilline, klein bij lithium; bij een kleine breedte wordt de bloedspiegel gecontroleerd."},
  {"t": "farmacodynamiek", "d": "Wat een medicijn met het lichaam doet: waar het aangrijpt, welk effect het geeft en bij welke dosis. Wat het lichaam met het medicijn doet, heet farmacokinetiek (zie Van pil tot plek en weer terug)."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
