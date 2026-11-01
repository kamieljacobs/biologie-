# Brief: één oefenexamen (doorklik-examen) bouwen

Je bouwt een compleet oefenexamen voor de site van Kamiel (docent biologie). Toon in alle teksten: Nederlands, kort, vriendelijk, 'je', geen lange gedachtestreepjes (—).

## Lees eerst
- `/home/claude/biologie-/tools/OEFENEXAMEN_PROMPT.md` — de werkwijze, leidend. Volg hem, met de afwijkingen hieronder.
- Voorbeelden van vragen: `grep -n 'Q.push({id:' /home/claude/biologie-/tools/examen-vwo-2026-1.html` en lees een paar vragen van elke soort. Lees nooit een hele tool.
- Uitleg van de stof: de API bovenin `/home/claude/biologie-/tools/examen-stof.js` (eerste 60 regels) en een voorbeeldblok (grep op `EXSTOF.zet("vwo26-1"`).

## Bronnen
- Pdf's: `/home/claude/toetsen-biologie/examens/<niveau>/<jaar>-<tijdvak>/pdf/` (opgaven + correctievoorschrift), doorzoekbare tekst in `vragen.md` daarnaast.
- Uitsneden per vraag (vraag + correctievoorschrift als beeld): `/home/claude/biologie-/examenatlas/img/<niveau>/<jaar>-<I|II>/`.
- N-term en een eventuele aanvulling op het correctievoorschrift: zoek op examenblad.nl (WebSearch, bv. 'N-term biologie vwo 2025 tijdvak 1', 'aanvulling correctievoorschrift biologie vwo 2025'). Vind je een aanvulling, verwerk hem in het nakijken. Vind je de N-term niet zeker, meld dat in je verslag en gebruik je beste vondst.

## Afwijkingen van de prompt (sinds 1 nov 2026)
1. **Werkmap** `/home/claude/hw/<sleutel>/` (sleutel = bv. `vwo25-1`). Geraamte: `python3 /home/claude/biologie-/scripts/oefenexamen/geraamte.py /home/claude/hw/<sleutel> <niveau> <jaar> <tijdvak> <N-term> <max-punten>`.
2. **Uitleg van de stof** komt niet in het gedeelde `examen-stof.js`, maar in `<werkmap>/stof.js` (alleen `EXSTOF.zet(...)` en `EXSTOF.waarom(...)` aanroepen voor dit examen, `tool` = de sleutel). `samenvoegen.py` kopieert hem naar `tools/examen-stof/<sleutel>.js` en zet de `?v=`. Raak `tools/examen-stof.js` niet aan.
3. **Hulpstanden**: de tool heeft vier standen (zie bovenin `tools/examen-standen.js`). In 'Echt examen' zijn de knop 'Hulp nodig?', de uitleg en de knop 'Laat zien waarom' verborgen. Maak dus geen nieuwe knop 'Laat zien waarom' met de hand: gebruik `waaromBtn`. Elke vraag moet zonder hulpvragen te maken zijn (de antwoordvakken staan in examenstanden meteen open).
4. **Raak geen gedeelde bestanden aan**: niet `index.html`, `CLAUDE.md`, de prompt, `examen-stof.js`, `examen-standen.js`, het geraamte-script of de andere tools. Je schrijft alleen: je werkmap, `tools/examen-<niveau>-<jaar>-<tijdvak>.html`, `tools/examen-img/<niveau>-<jaar>-<tijdvak>/` en `tools/examen-stof/<sleutel>.js`. **Geen git commit, geen push** (de coördinator doet dat). Er werken tegelijk andere helpers aan andere examens in dezelfde repo.

## Werkwijze
- Werk zoals de prompt zegt: geraamte → foto's → per opgave een fragment `frag/opg<N>.js` + `frag/opg<N>.md` → `stof.js` → controle → samenvoegen.
- Heb je een Agent-tool: zet per opgave een helper in (parallel), daarna minstens één frisse controleur die elke sleutel, deelscore en elk vinkje naast het correctievoorschrift legt en de uitleg op 'geeft het antwoord niet weg' controleert. Geef helpers een korte brief met verwijzingen naar deze brief en de prompt. Heb je geen Agent-tool, doe het zelf, opgave voor opgave, en controleer daarna zelf elke vraag opnieuw naast het correctievoorschrift.
- Puntentotaal van de tool = maximum van het examen; aantal vragen = examen.
- Test: `python3 <werkmap>/test.py` (alle vragen openen, geen consolefouten). Samenvoegen: `cd /home/claude/biologie- && python3 <werkmap>/samenvoegen.py tools/examen-<niveau>-<jaar>-<tijdvak>.html`. Daarna een snelle Playwright-check: elke stand (`#standen button[data-k=…]`) aan, geen pagefouten, op 375 px `scrollWidth` ≤ 375.

## Verslag (je laatste bericht, kort, max 25 regels)
- Bestand, aantal opgaven / vragen / punten, N-term (met bron), aanvulling ja/nee.
- Een kaart voor index.html als JSON-regel: `{"href":"tools/examen-…html","naam":"…","titel":"Oefenexamen <niveau> <jaar>-<I|II>","opslag":"examen-<sleutel>","punten":N,"vragen":N,"vraag":"…","tekst":"…","bij":"…"}` — kijk voor de stijl naar de bestaande kaarten (grep `examen-vwo26-1` in index.html).
- Twijfels die Kamiel moet zien (hooguit 5), en wat de controleurs vonden en hersteld is.
