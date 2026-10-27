# Overdracht — Wat word jij? · Gezondheidswetenschappen (gestart 26 okt 2026)

## Planning (kritische check, akkoord Kamiel 26 okt 2026)
1. **Hoe een epidemie groeit en stopt** — houden, als eerste maken (`gezondheidswetenschappen-1-hoe-een-epidemie-groeit`, werkmap `hw/gz1`). H1 het reproductiegetal R · H2 exponentiële groei en de curve afvlakken · H3 groepsimmuniteit (drempel 1 − 1/R₀) · H4 maatregelen doorrekenen met een eenvoudig model.
2. **Screenen of niet?** — aangepast in `vervolg.html`: nieuwe kern het bevolkingsonderzoek darmkanker als beleidsvraag (startvraag 'Waarom krijg je op je 55e een ontlastingstest thuis, maar geen hersenscan?'). Reden: het rekenen met vals-positief zit al in *Screenen: een keuze* (Verloskunde 3). Nog niet in productie.
3. **Roken en longkanker: hoe onderzoek een risico vindt** — houden (observationeel onderzoek: cohort, patiënt-controle, relatief/absoluut risico, verstorende factoren). Nog niet in productie.

Reeksbrief: `REEKS-gezondheid.md`. Cast (voorstel, nog te keuren): Yasmin als stagiair bij de GGD, nieuw personage Epidemioloog Farid.

## Werkwijze
Zoals Voeding en Ecologie: `getallen.md` met bronnen → 3 scriptvarianten (dobbelsteen `--zaad gz1-epidemie`: A klassiek, B voorbeeld + camerabeweging, C dossier) → blinde beoordelaar → script v1 → frisse feitenreview → script v2 → twijfelblad (alleen twijfelscènes) → inspreken (Roos, eleven_v4) → bouwen → frisse beeldreview → repo → als laatste stap, na `git pull`, `jaarplanner-dekking.json`.

**ElevenLabs-credits waren op 26 okt 2026 's avonds op** (zie OVERDRACHT-voeding.md): alles tot en met het twijfelblad kan, inspreken wacht.

Werk in het andere account niet tegelijk aan deze reeks.

## Stand (26 okt 2026, avond): wacht op keuring
| Film | Winnaar (blind, fable) | Review | Woorden · vragen |
|---|---|---|---|
| 1 Hoe een epidemie groeit en stopt | C 'dossier' duidelijk (52–49–49), met 4 overnames uit A en B | 11 MOET verwerkt (script v2) | 981 · 6 (b c a c b a) |

Bronmap staat al in de repo (`gezondheidswetenschappen-1-hoe-een-epidemie-groeit/bron/`): brief, getallen (45 bronnen), script v1 en v2, review met verwerking, bronnenlogboek, varianten en blind oordeel in `werk/`. Reeksbibliotheek: `werk-gezondheid/` (castvoorstel `cast_gz.js` met Farid A/B/C, keyframe-renderer `render.py` (engine uit landbouw-3 in `hw/engine`), keyframes in `testvel/kf_gz.js`, twijfelblad-bron in `twijfelblad/`).

**Twijfelblad:** https://claude.ai/artifact/WymQuK4Q9EiLQY9zhQfT6J (dit account; db-collectie `keuring`, doc-id `c0` cast, `g1` herinnering maart 2020 met Yasmin en Bilal, `g2` oefendossier met ronde getallen, `g3` doorschieten (niveau), `g4` decor GGD-kantoor, `film-gz1` de film als geheel). Lees terug, verwerk, dan castvoorstel in lib_cast/ROLLEN/LEVENSLOOP, decor (na credits) en inspreken.

Belangrijke vondsten: RIVM zei op 10 maart 2020 zelf nog R 1,5–2 (later 2,3–2,5), dus 'ongeveer twee à drie'; ic: normaal ± 1150, opgeschaald naar 2400 (5 april), piek 1424 (7 april); de piek van nieuwe gevallen valt in het SIR-model níét op de drempel; Radboud heeft geen aparte master epidemiologie (richting binnen Biomedical Sciences); startmomenten VU en Maastricht nog nagaan vóór online.

## Keuring Kamiel (26 okt 2026, 22:23)
- c0 Farid: **B** (bordeauxrode trui, baard) → in `personages/lib_cast.js` (`farid`), ROLLEN.md, LEVENSLOOP.md, castboek.
- g1 herinnering maart 2020 (Yasmin en Bilal, sepia kader): ok. g2 oefendossier met ronde getallen: ok.
- g3 doorschieten: blijft. Kamiel: 'Wat word jij? is extra stof voor gemotiveerde leerlingen, dus het is ok' (mag verder gaan dan het boek).
- g4 decor: 'er zijn weer credits, dus doe maar' → gemaakt: `werk-gezondheid/decor-ggd.webp` (gpt-image-2.5-sunburst met moestuin-stijlreferentie, flow cMT4epIEjMJi0sraRQzk, generatie t9uBD1KXWZIb1UsORGBd, ± 433 credits).

## Inspreken en bouwen (26 okt 2026, avond)
- Stem-invoer: `script_opname.md` (script v2 zonder Keuzes/Twijfels) → `segments.json`; film-eigen respellings in `uitspraak_film.json`: R → 'èr', R-nul → 'èr-nul', ic → 'ie-cee' (op de wachtlijst, nog niet getest). Brieven: `werk-gezondheid/HELPER-inspreken.md`, `HELPER-bouwen.md`.

## Stand (27 okt 2026): film 1 op de site
- Ingesproken: flow oQbgMSfw8ZMWF5bd6VZn ('Gezondheid gz1 · stem'), 23 takes, 6:37, 5812 credits. Uitspraakcheck met eleven_scribe: èr, èr-nul en ie-cee kwamen herkenbaar uit (s04, s12, s19); Kamiel luistert in de reviewstand.
- Gebouwd (werkmap `hw/gz1`, engine uit landbouw-3), frisse beeldreview 17 MOET verwerkt (`bron/reviews/review_beeld.md`), daarna in de repo met pak.py: `films/vervolg/gezondheidswetenschappen-1-hoe-een-epidemie-groeit.html` + bronmap; in vervolg.html als [titel, href]; films.json; FILMKUNST; scripts gedraaid.
- Nog open: filmmedaillon (gloedstijl, volgend vel), `jaarplanner-dekking.json` (extra film bij Afweer § immuniteit, na git pull, als laatste), Kamiels review, startmomenten VU en Maastricht nagaan.
- Volgende films van dit gebied: 2 Screenen of niet? (nieuwe kern darmkanker) en 3 Roken en longkanker — nog niet begonnen.

## Daarna (film 1, oorspronkelijk plan)
Keuring verwerken → Farid in `personages/lib_cast.js`, ROLLEN.md, LEVENSLOOP.md, castboek → decor (alleen na akkoord en credits) → script_opname.md + segments.json → inspreken (Roos, eleven_v4; uitspraak-wachtlijst: R-nul, epidemioloog, groepsimmuniteit, ic, RIVM, Enschede) → bouwen (FILMDATA-straat, de dossierlagen als eigen tekenfuncties) → frisse beeldreview → repo (vervolg.html: planobject → [titel, href]; films.json; FILMKUNST; medaillon) → als laatste, na `git pull`, `jaarplanner-dekking.json`.
