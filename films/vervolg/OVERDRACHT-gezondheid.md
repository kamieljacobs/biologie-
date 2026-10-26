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

## Daarna
Keuring verwerken → Farid in `personages/lib_cast.js`, ROLLEN.md, LEVENSLOOP.md, castboek → decor (alleen na akkoord en credits) → script_opname.md + segments.json → inspreken (Roos, eleven_v4; uitspraak-wachtlijst: R-nul, epidemioloog, groepsimmuniteit, ic, RIVM, Enschede) → bouwen (FILMDATA-straat, de dossierlagen als eigen tekenfuncties) → frisse beeldreview → repo (vervolg.html: planobject → [titel, href]; films.json; FILMKUNST; medaillon) → als laatste, na `git pull`, `jaarplanner-dekking.json`.
