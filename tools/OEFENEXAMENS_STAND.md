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

In controle (2 nov 2026): havo 2025-II (N 1,8), vwo 2024-I (N 1,5, aanvulling vraag 32), havo 2024-I (N 1,2). Kijk in `HOOFDSTUKKEN.examens.tools` in index.html welke er al staan.

## Nog te doen

havo en vwo 2024-II, 2023-I/II, 2022-I/II, 2021-I/II, 2019-I/II, 2018-I/II (vwo 2018-II heeft al een bespreekfilm, mag ook als oefenexamen). Kamiel 2 nov 2026: per jaar (of per paar examens) een nieuwe chat.

## Prompt voor een nieuwe chat

> Bouw de oefenexamens biologie <jaar> (havo en vwo, tijdvak 1 en 2) voor de site. Lees `tools/OEFENEXAMENS_STAND.md` en `tools/OEFENEXAMEN_PROMPT.md` in kamieljacobs/biologie-; de examens staan in kamieljacobs/toetsen-biologie. Werk zelfstandig.

## Werkwijze voor de coördinerende chat

1. Clone beide repo's naar `/home/claude/`, kopieer de twee briefs naar `/home/claude/hw/`.
2. Per examen één helper met BRIEF.md (parallel, 4 tegelijk gaat goed). Helpers hebben zelf geen Agent-tool en controleren dus zelf.
3. Per klaar examen een frisse helper met CONTROLE.md.
4. Daarna in de hoofdchat: `python3 scripts/oefenexamen/kaart.py tools/examen-<niveau>-<jaar>-<tv>.html`, `scripts/licentie_noot.py` en `scripts/teller.py` (wijzigingen in `bibliotheek/` en `films/` niet meecommitten: `git checkout -- bibliotheek films`), commit + push per examen.
5. Onaf werk tussendoor veiligstellen op de tak `wip-oefenexamens` (niet op main), want de container kan herstarten; de werkmap `/home/claude/hw/` overleefde een herstart wel.
6. Werk dit bestand bij.
