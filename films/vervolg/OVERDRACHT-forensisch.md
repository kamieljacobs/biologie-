# Overdracht — Wat word jij? · Forensisch onderzoek (gestart 25 okt 2026)

Stand: planning goedgekeurd door Kamiel (25 okt 2026), films in de maak. Wordt bijgewerkt na elke stap.

## Planning (akkoord Kamiel 25 okt 2026)
1. **Sporen op de plaats delict: is dit bloed?** — 'sperma' uit titel en film (Kamiel akkoord: trekt het naar zedenzaken, voegt biologisch weinig toe). Speeksel via de amylasetest (brug naar enzymen uit Voeding). Hoofdstukken: vinden (luminol, kleurtest), menselijk? (sneltest met antistoffen, amylase), bloedsporen lezen (inslaghoek, vwo), veiligstellen.
2. **Hoe zeker is een match? DNA-bewijs in de rechtszaal** — STR-profiel en toevallige match staan al in *Op lengte gesorteerd*; de basisrate-denkfout staat in *Verloskunde 3 (Screenen: een keuze)*: alleen kort aanhalen. Zwaartepunt: twee hypothesen, likelihood ratio en rapportage aan de rechter, overdracht, mengprofielen.
3. **Hoe lang al dood?** — beeldafspraak: géén lichaam in beeld; de klok via schema's (afkoelcurve, actine-myosine zonder ATP, levenscyclus van de vlieg, graaddagen).
4. **Stille getuigen: haren, stuifmeel en kiezelwieren** — staat op 'komt later' (`later: true` in `GEBIEDEN`, label 'komt later', telt niet mee in 'x van y klaar'). Kamiel: 'hoeft voor nu niet'.

Volgorde = volgorde van het echte werk: spoor vinden → DNA → tijdstip.

## Werkwijze
Volgens `films/vervolg/BOUWEN.md`, prompt v10 (`films/PROMPT_v10.md`), `films/BEELDAFSPRAKEN.md` en `films/WERKWIJZE-LESSEN.md`. Eerst scripts + feitencheck, dan inspreken (Roos, eleven_v4), bouwen, frisse beeldreview, in de repo.

## Stand per film (25 okt 2026, middag)
| Film | Script | Feitencheck | Storyboard | Audio | Gebouwd | Op de site |
|---|---|---|---|---|---|---|
| 1 Sporen | v2 (variant A won, blind) | frisse review verwerkt | 27 scènes | bezig | – | – |
| 2 DNA-match | v2 (variant A won, blind) | frisse review verwerkt | 24 scènes | bezig | – | – |
| 3 Hoe lang al dood? | v2 (variant B won, blind) | frisse review verwerkt | 24 scènes | bezig | – | – |

- Keuringsblad storyboards (account van ghallie880): https://claude.ai/artifact/NeETTynseM4HSocZMHoqW3 (db-collectie `keuring`, doc-id = scène-id zoals `f1s03`, film als geheel `film-foN`). Kamiel zei 'werk maar zelfstandig door': productie loopt door; opmerkingen op het blad worden daarna per scène verwerkt.
- Werkbestanden (scripts, varianten, blinde oordelen, reviews, getallen met bronnen, scènes) staan tijdens de productie in `/home/claude/hw/foN/` en komen bij oplevering in de bronmap van elke film.
- Cast: outfit `plaatsdelict` voor Bilal en Kim staat in `personages/lib_cast.js` (commit c6dfba5).
- Open voor Kamiel: film 3 heeft twee nieuwe figuranten (buurvrouw ± 72, forensisch entomoloog) alleen in `teken_fo3.js`, nog niet in de cast; film 2 tekent een handdruk met twee keer pose 'wijs' (cast heeft geen handdrukpose).
