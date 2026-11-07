# Oefenexamens: stand en vervolg

Bijgewerkt: 3 nov 2026 (2018 af). Werkwijze: `tools/OEFENEXAMEN_PROMPT.md` (v2). Briefs voor helpers: `scripts/oefenexamen/BRIEF.md` (bouwen) en `scripts/oefenexamen/CONTROLE.md` (frisse controle).

## Op de site (gecontroleerd)

| examen | vragen | punten | N-term |
|---|---|---|---|
| havo 2026-I | 43 | 71 | |
| havo 2026-II | 46 | 74 | |
| vwo 2026-I | 41 | 65 | 1,2 |
| vwo 2026-II | 39 | 66 | 1,2 |
| havo 2025-I | 48 | 69 | 1,0 |
| vwo 2025-I | 40 | 67 | 1,3 |
| vwo 2025-II | 42 | 66 | 1,3 |
| havo 2025-II | 44 | 70 | 1,8 |
| havo 2024-I | 45 | 71 | 1,2 |
| vwo 2024-I | 42 | 68 | 1,5 (aanvulling CV vraag 32 verwerkt) |
| havo 2021-I | 43 | 70 | 1,0 |
| havo 2021-II | 42 | 69 | 1,0 |
| vwo 2021-I | 39 | 66 | 1,2 (aanvulling CV vraag 22, 25, 29 verwerkt) |
| vwo 2021-II | 39 | 71 | 1,1 (aanvulling CV vraag 30 verwerkt) |
| havo 2022-I | 44 | 71 | 1,2 (aanvulling CV vraag 39 verwerkt) |
| havo 2022-II | 44 | 74 | 1,4 |
| vwo 2022-I | 39 | 67 | 1,0 |
| vwo 2022-II | 43 | 71 | 1,3 (aanvulling CV vraag 22 verwerkt) |
| havo 2023-I | 48 | 70 | 1,0 |
| havo 2023-II | 46 | 70 | 1,0 |
| vwo 2023-I | 39 | 64 | 1,0 |
| vwo 2023-II | 39 | 70 | 1,3 |
| havo 2024-II | 48 | 73 | 1,2 |
| vwo 2024-II | 41 | 70 | 1,5 |
| havo 2019-I | 43 | 77 | 0,8 (aanvulling CV vraag 5 en 30 verwerkt) |
| havo 2019-II | 47 | 80 | 1,0 |
| vwo 2019-I | 39 | 71 | 0,9 (aanvulling CV vraag 6; vraag 22 vervalt, iedereen 2p) |
| vwo 2019-II | 38 | 71 | 1,1 (aanvulling CV vraag 26 verwerkt) |
| havo 2018-I | 46 | 79 | 0,9 |
| havo 2018-II | 46 | 76 | 0,9 (aanvulling CV vraag 21: iedereen 1p) |
| vwo 2018-I | 38 | 74 | 0,8 (aanvullingen CV vraag 6, 10, 19, 25, 28 verwerkt) |
| vwo 2018-II | 38 | 70 | 1,6 |

Kijk in `HOOFDSTUKKEN.examens.tools` in index.html welke er al staan.

## Nog te doen

Niets: alle examens 2018–2026 (havo en vwo, tijdvak I en II) staan op de site (3 nov 2026, 2018 als laatste).

## Prompt voor een nieuwe chat

> Bouw de oefenexamens biologie <jaar> (havo en vwo, tijdvak 1 en 2) voor de site. Lees `tools/OEFENEXAMENS_STAND.md` en `tools/OEFENEXAMEN_PROMPT.md` in kamieljacobs/biologie-; de examens staan in kamieljacobs/toetsen-biologie. Werk zelfstandig.

## Werkwijze voor de coördinerende chat

1. Clone beide repo's naar `/home/claude/`, kopieer de twee briefs naar `/home/claude/hw/`.
2. Per examen één helper met BRIEF.md (parallel, 4 tegelijk gaat goed). Helpers hebben zelf geen Agent-tool en controleren dus zelf.
3. Per klaar examen een frisse helper met CONTROLE.md.
4. Daarna in de hoofdchat: `python3 scripts/oefenexamen/kaart.py tools/examen-<niveau>-<jaar>-<tv>.html`, `scripts/licentie_noot.py` en `scripts/teller.py` (wijzigingen in `bibliotheek/` en `films/` niet meecommitten: `git checkout -- bibliotheek films`), commit + push per examen.
5. Onaf werk tussendoor veiligstellen op een eigen tak per chat, `wip-oefenexamens-<jaar>` (niet op main, en niet op de tak van een andere chat: die met `-f` overschrijven wist zijn werk; 2 nov 2026 gebeurd en hersteld), want de container kan herstarten; de werkmap `/home/claude/hw/` overleefde een herstart wel.
6. Werk dit bestand bij.

Lessen uit 2023 (2 nov 2026): twee bouwers zetten grafieken en schema's als pdf-uitsnede in de tool; de controleur moest ze natekenen. Vraag de controleur daar altijd naar. Een backup `frag/opg<N>.bak.js` breekt `samenvoegen.py` (pakt elk `opg*.js`): backups buiten `frag/`.
Twijfels voor Kamiel uit 2019 (3 nov 2026): havo 2019-II vraag 32 ('maximaal één fout in de volgorde' gelezen als: zes van de zeven op de goede plek); vwo 2019-I vraag 21 (alles wit = 0, eigen lezing) en afbeelding 2/3 van opgave 1 als afbeelding (anatomische tekeningen); vwo 2019-II vraag 12 afbeelding 3 als schema met vier cirkels nagetekend.

Lessen 2019 (3 nov 2026): de site-repo is te groot voor een gewone clone binnen 10 min (afgebroken). Werkt wel: `git clone --depth 1 --filter=blob:none --sparse …` en `git sparse-checkout set --no-cone '/*' '!/films/' '!/bibliotheek/' '!/audio/' '!/video/'`. In zo'n clone `git write-tree --missing-ok` gebruiken (anders haalt hij alle ontbrekende bestanden op en lijkt hij te hangen); committen met een eigen index (`GIT_INDEX_FILE`, `read-tree origin/main`, `update-index --cacheinfo`, `commit-tree`) en `git push origin <commit>:refs/heads/main`. Schrijven via de GitHub-API (`gh api … git/blobs`) wordt door de proxy geweigerd. `licentie_noot.py`/`teller.py` falen op ontbrekende bestanden in de sparse clone, maar het geraamte zet licentie en teller al in de tool. Helpers hadden geen Agent-tool en bouwden en controleerden zelf; de frisse controleur vond toch nog in elk examen iets (uitleg die het antwoord weggaf, twee nakijkregels bij vwo 2019-I).

7. Lessen 2021 (2 nov 2026): helpers delen de scratchpad en overschreven elkaars tussenbestanden (een helper dacht daardoor dat een pdf van het verkeerde tijdvak was). Zeg in elke brief: tussenbestanden alleen in de eigen werkmap. `vragen.md` in toetsen-biologie kan antwoordmodellen bij de verkeerde vraag hebben (havo 2021-I rond 5–6 en 35–36): nakijken altijd op de CV-pdf. Tussendoor veiligstellen zonder de werkboom te raken kan met een eigen index (`GIT_INDEX_FILE`, `read-tree origin/main`, `add`, `commit-tree`, `push … :refs/heads/wip-oefenexamens`).

Twijfels voor Kamiel uit 2018 (3 nov 2026): havo 2018-I vraag 11 (precies vier delen kiezen; 'eerste vier nakijken') en vraag 41 (pijlpunt los van de keten, zoals het CV); havo 2018-II soortenboom vraag 8 en grafiek vraag 30 op het oog afgelezen (antwoord verandert niet); vwo 2018-I vraag 2 als keuzelijsten (CV-varianten 'nierweefsel', 'bot' toegevoegd) en afbeelding 2 bruin vet als afbeelding (anatomische tekening); vwo 2018-II vraag 22 hooguit twee chromosomen kiezen (algemene regel 3.5), vraag 32 (schets) vinkt de leerling zelf af. Aanvulling bij havo 2018-I en vwo 2018-II niet gevonden, maar de aanvullingspagina's op examenblad.nl waren niet te openen.
Lessen 2018 (3 nov 2026): de gewone clone van de site-repo lukte deze keer wel binnen 10 min. Ook nu hadden de bouwers geen Agent-tool; de frisse controleur vond in elk examen nog iets (deelscores strenger of soepeler dan het CV in drie examens, uitleg die het antwoord weggaf, een te jonge soortenboom). Een `tools/_test-*.html` van een helper vóór de commit weghalen.
