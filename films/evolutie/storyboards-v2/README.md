# Evolutie v2 — storyboards (22–23 okt 2026)

Storyboards van de acht kernfilms (seriebrief "Evolutie (v2)", prompt v8), nog niet ingesproken of gebouwd.
Keuringsblad: https://claude.ai/artifact/CZgCfj5Ad86TQ5ugddtL8s (db-collectie `keuring`: doc-id = scène-id, of `film-e<N>` voor opmerkingen over een hele film; velden `status` 'ok'|'opm'|'', `tekst`).

- `films/f<N>.json` — script per scène (tekst, laag basis/vwo, look, beweging, vraagkaarten), checkvragen, begrippen, getallen met bron, uitspraakwachtlijst, keuzes en twijfels. Leidend (de `maak_*.py`-scripts niet opnieuw draaien).
- `src/` — keyframe-tekeningen: `lib_evo.js` (reeksbibliotheek: genenpool-pot + allelbalk, histogram, cladogram, Aziatisch lieveheersbeestje, kaarten), `teken_evo<N>.js` (dieren en objecten per film, C9), `sb<N>.js` (één keyframe per scène), `tv<N>.js` (testvellen). Ook kopieën van lib.js, lib_cast.js, lib_bio.js.
- Renderen: kopieer `films/extra/bestaat-dit-echt/bron/src/fonts.css` naar `src/`, dan bv. `python3 render.py teken_evo4,sb4 SB4 [ids]` (film 2/3: `teken_evo2,teken_evo3,vragen23,sb2`; film 8: `teken_evo7,teken_evo8,sb8`).
- `review_reeks.md` — frisse review (60 punten), verwerkt op 22 okt.
- Na de keuring: per goedgekeurde film bouwen in `films/evolutie/<n>-<slug>.html` met bron/ (CLAUDE.md), dubbele tekenfuncties (viervoeters film 4/6, knikker) samenvoegen in lib_evo.js.
