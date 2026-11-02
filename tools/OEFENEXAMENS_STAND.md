# Oefenexamens: stand en vervolg

Bijgewerkt: 2 nov 2026. Werkwijze: `tools/OEFENEXAMEN_PROMPT.md` (v2). Briefs voor helpers: `scripts/oefenexamen/BRIEF.md` (bouwen) en `scripts/oefenexamen/CONTROLE.md` (frisse controle).

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

Kijk in `HOOFDSTUKKEN.examens.tools` in index.html welke er al staan.

## Nog te doen

havo 2024-II, vwo 2024-II, 2023-I/II, 2019-I/II, 2018-I/II (vwo 2018-II heeft al een bespreekfilm, mag ook als oefenexamen). Kamiel 2 nov 2026: per jaar (of per paar examens) een nieuwe chat.

## Prompt voor een nieuwe chat

> Bouw de oefenexamens biologie <jaar> (havo en vwo, tijdvak 1 en 2) voor de site. Lees `tools/OEFENEXAMENS_STAND.md` en `tools/OEFENEXAMEN_PROMPT.md` in kamieljacobs/biologie-; de examens staan in kamieljacobs/toetsen-biologie. Werk zelfstandig.

## Werkwijze voor de coördinerende chat

1. Clone beide repo's naar `/home/claude/`, kopieer de twee briefs naar `/home/claude/hw/`.
2. Per examen één helper met BRIEF.md (parallel, 4 tegelijk gaat goed). Helpers hebben zelf geen Agent-tool en controleren dus zelf.
3. Per klaar examen een frisse helper met CONTROLE.md.
4. Daarna in de hoofdchat: `python3 scripts/oefenexamen/kaart.py tools/examen-<niveau>-<jaar>-<tv>.html`, `scripts/licentie_noot.py` en `scripts/teller.py` (wijzigingen in `bibliotheek/` en `films/` niet meecommitten: `git checkout -- bibliotheek films`), commit + push per examen.
5. Onaf werk tussendoor veiligstellen op een eigen tak per chat, `wip-oefenexamens-<jaar>` (niet op main, en niet op de tak van een andere chat: die met `-f` overschrijven wist zijn werk; 2 nov 2026 gebeurd en hersteld), want de container kan herstarten; de werkmap `/home/claude/hw/` overleefde een herstart wel.
6. Werk dit bestand bij.
7. Lessen 2021 (2 nov 2026): helpers delen de scratchpad en overschreven elkaars tussenbestanden (een helper dacht daardoor dat een pdf van het verkeerde tijdvak was). Zeg in elke brief: tussenbestanden alleen in de eigen werkmap. `vragen.md` in toetsen-biologie kan antwoordmodellen bij de verkeerde vraag hebben (havo 2021-I rond 5–6 en 35–36): nakijken altijd op de CV-pdf. Tussendoor veiligstellen zonder de werkboom te raken kan met een eigen index (`GIT_INDEX_FILE`, `read-tree origin/main`, `add`, `commit-tree`, `push … :refs/heads/wip-oefenexamens`).
