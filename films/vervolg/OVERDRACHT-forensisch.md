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

## Stand (25 okt 2026, middag): alle drie op de site
| Film | Bestand | Spraak | Credits | Flow |
|---|---|---|---|---|
| 1 Sporen op de plaats delict | `forensisch-1-sporen.html` | 5:36 | 5.187 | dlm45f0RjwUpiKh0Pu9j |
| 2 Hoe zeker is een match? | `forensisch-2-hoe-zeker-is-een-match.html` | 5:56 | 5.344 | A5eaQwov0dxaWXpL9z99 |
| 3 Hoe lang al dood? | `forensisch-3-hoe-lang-al-dood.html` | 6:15 | 5.671 | fKpYiCwNbdylKKckScMk |

Elk met bronmap (script, varianten en blinde oordelen in `bron/werk/`, getallen met bronnen, storyboard, reviews, bouwscript `bron/bouw/bouw.sh`), prompt v10, status 'nog bekijken'. Werkwijze: 3 scriptvarianten + blinde beoordelaar → frisse feitenreview → twijfelscènes gekeurd door Kamiel (blad https://claude.ai/artifact/NeETTynseM4HSocZMHoqW3, 11 scènes; handdruk en twee nieuwe personages verwerkt) → inspreken → frisse beeldreview na de bouw → repo.

## Open
- **Uitspraak:** niet blind getranscribeerd (upload naar www.googleapis.com geblokkeerd; transcriberen van de TTS-node zelf geeft de invoertekst terug, dus geen echte check). Wachtlijsten in `bron/uitspraak.md`; extra risico: film 3 s12 'Actine' met hoofdletter, zonder respelling.
- **Filmmedaillons:** nog niet gemaakt (vallen terug op de lijntekening in `FILMKUNST`).
- **Film 4 Stille getuigen:** komt later (Kamiel).
- **Kleine KAN-punten** die bewust open bleven staan in `bron/reviews/review_beeld.md` per film.
- `scripts/teller.py` en `scripts/licentie_noot.py` breken op `films/verbeterbladen/sjabloon.html` (geen `<head>`/`</body>`; van het andere account). Voor deze films zijn ze met die uitzondering gedraaid.
