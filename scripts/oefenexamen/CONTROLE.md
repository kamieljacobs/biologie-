# Brief: frisse controle van een oefenexamen

Een andere helper bouwde dit oefenexamen; jij hebt het niet gemaakt en kijkt het kritisch na. Toon: Nederlands, kort.

Bronnen: correctievoorschrift-pdf en opgaven-pdf in `/home/claude/toetsen-biologie/examens/<niveau>/<jaar>-<tijdvak>/pdf/`, uitsneden van het CV per vraag `a<nr>a.webp` in `/home/claude/biologie-/examenatlas/img/<niveau>/<jaar>-<I|II>/`. Werkmap van het examen: `/home/claude/hw/<sleutel>/` (`frag/opg<N>.js`, `frag/opg<N>.md`, `stof.js`). Werkwijze: `/home/claude/biologie-/tools/OEFENEXAMEN_PROMPT.md`.

Controleer per vraag:
1. **Nakijken = correctievoorschrift**: punten, goede optie bij meerkeuze, juist/onjuist-sleutels en deelscores, rekenmarges, elk vinkje bij open vragen (trouw aan de beoordelingspunten, geen punt te veel of te weinig), opmerkingen in het CV (bv. 'alleen als…', 'per fout 1 punt aftrekken').
2. **Examentekst** letterlijk en volledig (geen ontbrekende informatie die nodig is om de vraag te beantwoorden), afbeeldingsnummers kloppen.
3. **Uitleg van de stof** (`stof.js`) verraadt het antwoord niet en klopt vakinhoudelijk; hulpvragen en 'Laat zien waarom' komen uit op het antwoord van het CV.
4. Nagetekende grafieken/tabellen: aflezen geeft hetzelfde als in de pdf (steekproef bij elke figuur).

Herstel wat fout is direct in de fragmenten/`stof.js`, draai `python3 <werkmap>/test.py` (geen consolefouten) en voeg samen: `cd /home/claude/biologie- && python3 <werkmap>/samenvoegen.py tools/examen-<niveau>-<jaar>-<tijdvak>.html`. Raak geen andere bestanden aan, geen git commit.

Verslag (max 15 regels): wat je controleerde, wat fout was en hoe je het herstelde, wat je niet zeker weet.
