# Stemtest Engelse films (25 okt 2026)

Zelfde alinea (`test.txt`), eleven_v4, één take per stem. Flow: https://elevenlabs.io/app/flows/EcvKAVpw4ASWuKQZ2EQd

| Bestand | Stem | voice_id | Duur |
|---|---|---|---|
| alice.mp3 | Alice – Clear, Engaging Educator (v) | Xb7hH8MSUJpSbSDYk0k2 | 39,8 s |
| philippa.mp3 | Philippa – Clear British Narrator (v) | IbXTsH7MlHi5GQco8zZH | 38,0 s |
| lily.mp3 | Lily – Velvety Actress (v) | pFZP5JQG7iQjIQuC4Bku | 40,3 s |
| benedict.mp3 | Benedict – Premium British (RP) Male (m) | 6q6UVsvekS0UjrUXFz79 | 36,2 s |
| nadia.mp3 | Nadia – Educational & Documentary (v) | eptbh5KQei9tCWyAUN37 | 37,0 s |
| isabella.mp3 | Isabella – jong, kalm, BBC-Engels (v) | 0sGQQaD2G2X1s87kHM5b | 40,5 s |
| shelley.mp3 | Shelley – Clear and confident, conversational (v) | 4CrZuIW9am7gYAxgo2Af | 39,7 s |
| alistair.mp3 | Alistair – Clear, Neutral & Informative (m) | l30f87tf05uxyknGdDw6 | 36,7 s |
| elliot.mp3 | Elliot – light, modern British Explainer (m) | 8gNL8wXI7PQOc82yBLOg | 36,7 s |
| julian.mp3 | Julian – Warm, articulate, engaging (m) | 9IzcwKmvwJcw58h3KnlH | 39,6 s |

Kamiel na ronde 1: Philippa en Benedict 'erg goed'.

## Ronde 3: beslissende test, leerlingen stemmen (25 okt 2026)

Kamiel twijfelt tussen Nadia, Philippa en Elliot en laat leerlingen beslissen. Fragment van een minuut in filmvorm (`ronde3/test.txt`: opening, uitleg, vraag met denkpauze, antwoord, verdieping), eleven_v4, één take per stem (±870 credits per take).

Blinde stempagina: `stemkeuze/index.html` (niet gelinkt, noindex; leerlingen stemmen op A/B/C met optioneel 'waarom' en klas; uitslag voor het bord met `stemkeuze/?uitslag=1`). Opslag Firebase `stemkeuze/<push-id>` = `{stem, waarom?, klas?, tijd}`, regels in `sessie/database.rules.json` (blok `stemkeuze`, iedereen mag één stem toevoegen, lezen openbaar). Claude leest de uitslag met WebFetch op `.../stemkeuze.json`.

Ontsleuteling (niet aan leerlingen laten zien): A = Elliot (55,1 s), B = Philippa (55,0 s), C = Nadia (51,7 s).
