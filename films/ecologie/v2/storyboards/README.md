# Ecologie v2 — storyboards (29 okt 2026)
Acht kernfilms in reeksmodus (prompt v13): per film B15 (loting met scripts/dobbelsteen.py, drie behandelingen, blinde beoordelaar op Sonnet), volledig script van de winnaar, keyframe van elke scène. Frisse review van de hele reeks (`review_reeks.md`, 29 MOET-punten) is verwerkt.
Keuringsblad: https://claude.ai/artifact/VfUqhJjVKAY3WSq8sj25TZ — alleen B15-blokken en twijfelscènes (regel V1). db-collectie `keuring`: doc-id = scène-id (status 'ok'|'opm', tekst, algemeen), `film-e<N>` voor opmerkingen over een hele film, `b15-e<N>` voor Kamiels B15-keuze (keuze 'winnaar'|'A'|'B'|'C').
- `films/f<N>.json` script per scène (twijfel/waarom bij twijfelscènes), checkvragen, begrippen, getallen met bron, uitspraakwachtlijst, b15-blok.
- `src/` keyframe-tekeningen (lib_eco.js, teken_eco<N>.js, sb<N>.js, tv<N>.js); dieren uit `../pop/src/`.
- Renderen: werkmap met render.py/render.html van `films/evolutie/storyboards-v2/` plus src/ van beide mappen, dan `python3 render.py dieren_zoog,dieren_overig,wolf_pop,pop_honden,pop_katten,pop_hoef,pop_vogels,pop_darwin,pop_eco_rovers,pop_eco_hoef,pop_eco_klein,pop_eco_klein2,lib_eco,teken_eco<N>,sb<N> SB<N>` (film 2: ook teken_eco1; film 6: ook e11_aarde).
- Volgende stap na de keuring: inspreken (Roos, eleven_v4, één take per alinea) en bouwen in `films/ecologie/<n>-<slug>.html` met bron/.
