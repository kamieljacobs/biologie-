# Overdracht · Wat word jij? · Mariene biologie

Stand 3 nov 2026 (avond). Lees ook `films/vervolg/BOUWEN.md`, `films/PROMPT_v13.md`, `films/logboek/regels.json` en `films/BEELDAFSPRAKEN.md`.

## Besloten

- Drie films (Kamiel 3 nov 2026), plan in `vervolg.html` (gebied `marien`):
  1. **Hoeveel vis mag eruit?** — onderzoeksschip, otolieten, groeicurve, draagkracht, maximale duurzame vangst bij ± de helft van K, overbevissing.
  2. **Zuurder water** — CO₂ lost op, pH daalt, kalkvorming bij schelpdieren en koraal, proef met oesterlarven bij verschillende pH met controlegroep, koolstofkringloop.
  3. **Een zee vol voedsel: de Waddenzee** — voedselweb van het wad (algen, kokkels, wadpieren, kanoet), filteraars, energiepiramide, draagkracht voor mosselkweek.
- Stagiair: **Sam** (outfit `practicum` in het lab; aan boord en op het wad nog een buitenoutfit kiezen: twijfelpunt voor het keuringsblad).
- Begeleider: **Mariene bioloog**, castvel goedgekeurd 3 nov 2026 (`personages/vellen/vel-nl-4-mariene-bioloog.webp`, flow `RVqu1vLFRgY3QXwS4WcU`, node `UjxkrUGvJcm2mma1c5WM`, gpt-image-2, ± 420 cr). **Geen naam** (Kamiel: alleen het vak, zoals de palynoloog), ook niet in ROLLEN/LEVENSLOOP. Garderobe `boord` (ook op het wad) en `lab`; zie ROLLEN.md.

## Volgende stappen

1. Mariene bioloog in code: `marien` in `personages/lib_cast.js` (garderobe `boord`, `lab`), naast de still op een testvel (C10.4), castboek opnieuw bouwen (`scripts/castboek.py`). Wijkt de code duidelijk af van het vel: eerst laten zien.
2. Reeksbrief + per film B15 (dobbelsteen, scriptcheck, blinde beoordelaar), `bronnen.md` per film (BRONNEN.md: ≥ 2 bronnen, ≥ 1 niveau A; bv. ICES/WMR voor vangst, NOAA/IPCC voor verzuring, NIOZ/Waddenacademie voor het wad).
3. Twijfels: alleen de scènes waar Claude twijfelt, elk met waarom (Kamiel keurt de rest niet apart).
4. Decors via ElevenLabs als edit met een bestaand decor als stijlreferentie: onderzoeksschip (dek met vangst), lab met aquaria, wad bij laag water.
5. Inspreken (Roos, eleven_v4, één take per alinea, geen namen in de stem, niets over tools van de site), bouwen volgens BOUWEN.md, frisse beeldreview, repo (films.json met datum, vervolg.html, nieuwste_films.py, controle.py), medaillons.
6. Na elke film één regel in LEVENSLOOP voor Sam en de Mariene bioloog.

## Stand (4 nov 2026, nacht): scripts v2 klaar, wacht op keuring

- **Cast in code** (3 nov): `marien` in `personages/lib_cast.js` (garderobe `boord`, `lab`; nieuwe accessoires `muts`, `reflectie`, `laarzen` voor vooraanzicht en zijaanzicht), in `CAST_VOLGORDE`, castboek opnieuw gebouwd, ROLLEN.md bijgewerkt. Testvel naast het castvel: `werk-marien/beeld/testvel-marien.png`.
- **Reeksbrief:** `REEKS-marien.md`. Vaste opleidingszin: `werk-marien/REEKSZIN.md` ('ook in Nijmegen' geschrapt: alleen de RUG-bachelor Biologie geeft directe toegang tot de master Marine Biology).
- **B15** (beoordelaar Claude Fable 5.1, logregels in `films/logboek/mutaties.jsonl`, rapport `films/logboek/rapporten/B15-2026-11-04.md`):

| Film | Bronmap | B15 | Feitenreview | v2 |
|---|---|---|---|---|
| 1 Hoeveel vis mag eruit? | `mariene-biologie-1-hoeveel-vis-mag-eruit/bron/` | ronde 1 B nipt 61–59–50 → combinatie duidelijk 63–59–57 | 5 MOET + 7 KAN verwerkt | 897 w · 5 vragen |
| 2 Zuurder water | `mariene-biologie-2-zuurder-water/bron/` | ronde 1 C (dossier) nipt 55–53–49 → combinatie nipt 51–49–47 → **keuze Kamiel** | 5 MOET + 8 KAN | 896 w · 6 vragen |
| 3 Een zee vol voedsel | `mariene-biologie-3-een-zee-vol-voedsel/bron/` | B (kanoetperspectief + emmerproef) duidelijk 54–50–49 | 5 MOET + 12 KAN | 898 w · 8 vragen |

- **Twijfelblad (24 punten):** https://claude.ai/artifact/1jnG9MLpBZgrEsEB67Wj5p (account ghallie880; db-collectie `keuring`, doc-id `mb-r1..r5` reeks, `mb<film>-t<n>` per film; velden `keuze` (0 = voorstel, 1 = anders), `opm`, `algemeen`). Bron: `werk-marien/bouw_blad.py` + `sjabloon.html`. Bij film 2 de keuze combinatie/variant A: log die als `beslist_door: kamiel`, `kamiel_keuze` in mutaties.jsonl.
- **Decors** gemaakt (flow RVqu1vLFRgY3QXwS4WcU, gpt-image-2.5-sunburst, stijlreferentie 'moestuin', ± 433 cr per stuk): schip `FesXpBsbhZpalx2snVnC`, lab `2O9SAy6vNuRpuJvNig4G`, wad `9zURzGfCfhvphkqqbXzS`. Volle resolutie (1280×720) in `werk-marien/beeld/decor-schip|lab|wad.webp` (7 nov 2026; domein toegevoegd, zie CLAUDE.md).
- **Castvoorstel Sam buiten:** A teal regenjas + gele laarzen, B winterjas + groene laarzen (`werk-marien/beeld/sam_outfit_s.png`); nog niet in lib_cast.js.
- `vervolg.html`: startvraag film 2 → 'ruim een kwart' (GCB 2025: 29 %).

**Volgende stap:** keuring teruglezen → keuzes verwerken in script_v2 (film 2 eventueel variant A met de MOET-punten), Sams outfit in lib_cast/ROLLEN → testvel nieuwe tekeningen (als gekozen) → decors downloaden → `script_opname.md` + segments.json → inspreken (Roos, eleven_v4, hooguit 2 takes tegelijk; uitspraakrisico's in de twijfelbestanden: otoliet, kanoet, Yerseke, Oregon, Newfoundland, Marine Sciences/Biology) → bouwen (engine = bronmap van milieukunde-2) → frisse beeldreview → repo → medaillons → LEVENSLOOP.

**Keuring (7 nov 2026):** op het blad koos Kamiel `mb-r1` = B (Sam buiten: zijn winterjas + groene laarzen) en `mb-r2` = decors zo gebruiken. Daarna in de chat: 'oke is goed' → de overige 22 punten volgens voorstel (dus film 2 = combinatie, `kamiel_keuze: combi` loggen). Lees het blad bij de start nog één keer na: een later gezette keuze gaat voor.
