# Overdracht — Wat word jij? · Landbouw en dierhouderij

Stand: film 2 op de site (25 okt 2026, avond). Film 3 (Fokken) in de maak.

## Planning
1. **Meer oogst** — af (24 okt 2026), `landbouw-1-meer-oogst.html`.
2. **Wat zit er in de bodem?** — af (25 okt 2026), `landbouw-2-wat-zit-er-in-de-bodem.html`, ook bij Tuin- en landschapsinrichting. Gedeelde film met *Tuin- en landschapsinrichting* (id `bodem` in vervolg.html).
3. **Fokken: selecteren, inteelt en de fokwaarde** — in de maak (werkmap `lb3`, bron in `landbouw-3-fokken/bron/`).

## Werkwijze
Zoals Biotechnologie: bronnen en getallen → 3 scriptvarianten + blinde beoordelaar → frisse feitenreview → storyboard, twijfelscènes op een blad voor Kamiel → inspreken (Roos, eleven_v4) → bouwen → frisse beeldreview → repo. Reeksbrief: `REEKS-landbouw.md` (nog niet gekeurd).

## Stand film 2
- 25 okt 2026: reeksbrief en filmbrief opgezet; bronnenonderzoek (`bron/getallen.md`, 47 beweringen, 69 bronnen) → 3 scriptvarianten (`bron/werk/`), blinde beoordelaar koos C (vier proefjes, `bron/werk/blind/oordeel.md`) → script v1 → frisse feitenreview (`bron/reviews/review_v1.md`, 5 MOET verwerkt) → **script v2** (± 1090 woorden, 6 vragen: b, c, a, c, b, c).
- Werkmappen staan alvast in `landbouw-2-wat-zit-er-in-de-bodem/bron/` (nog geen film-HTML). Nieuwe tekenfuncties: `bron/src/teken_lb2.js` (zandkorrel, kleideeltje met lading, humusvlok, ion, jampot, trechter, plantenbak, regenworm, bodemprofiel, dood blad, mycorrhiza, kruimel, teststrookje, druppelbak, veenprofiel); keyframes met `bron/werk/testvel/render.py` (werkmap `hw/lb2`, engine uit biotechnologie-2).
- Twijfelblad (8 scènes): https://claude.ai/artifact/MeUjiDgTLCFSvKTDfS31oD — alle 8 akkoord; bij scène 6 vroeg Kamiel naar waterstofbruggen bij oplossen → hydratatiemantel (watermoleculen rond nitraat, H naar het ion; rond kalium O naar het ion) alleen in beeld, geen extra zin.
- Decor 'moestuin' (ElevenLabs gpt-image-2.5-sunburst met 'Kas binnen' als stijlreferentie, flow cMT4epIEjMJi0sraRQzk, ±433 credits; `bron/decor/moestuin.webp`, ingebed in `bron/src/decor_lb2.js`).
- Stem: Roos, eleven_v4, 25 takes, 7:05 spraak, 6.345 credits, flow 1nLUHAQbhNlDGwtxEDNV.
- Gebouwd, frisse beeldreview (`bron/reviews/review_beeld.md`: 21 MOET, 20 verwerkt; nr 21 eindkaart bewust niet, zie info.md) → op de site (vervolg.html, films.json, FILMKUNST), REVIEW = nog bekijken. Bronnenlogboek `bron/bronnen.md`: 32 ✓ · 17 ≈ · 0 ! · 4 ?.
- Open: uitspraakwachtlijst (`bron/uitspraak.md`) nog niet beluisterd; filmmedaillon nog niet gemaakt (lijntekening in FILMKUNST); nieuwe tekeningen (zandkorrel, kleideeltje, ion, regenworm, mycorrhiza, kruimel, druppelbak) nog naar `bibliotheek/` en het testvel; MAG-punten uit review_beeld.md (o.a. eiwit-icoon, schimmeldraden door labels in s16); 4 '?' in bronnen.md (o.a. fotosynthese in het blad zonder geopende bron); steekproef bronnen door Kamiel; mbo-school dichtbij Nijmegen niet gevonden.

## Stand film 3
- 25 okt 2026: filmbrief (`bron/brief.md`), bronnenonderzoek in twee delen samengevoegd (`bron/getallen.md`, 81 beweringen, ±90 bronnen; 'twee keer zoveel melk sinds 1970' klopt: 4242 kg (1970) → ±9350 kg (2023)). Trekking: A klassiek, B tempo + rol personage, C kijker-speelt-mee. Blinde beoordelaar (fable): C 46, B 44, A 43, nipt → combinatie met C als geraamte (`bron/werk/script_combi.md`), tweede blinde ronde volgt. Daarna feitenreview, twijfelblad, bouwen. Laatste film van de reeks: daarna patroonronde (B15).
- 26 okt 2026: combinatie tweede blinde ronde 50 (duidelijk) → script v1 → frisse feitenreview (`bron/reviews/review_v1.md`, 7 MOET, alle verwerkt met A-bronnen, zie `verwerking_v1.md`) → **script v2** (958 woorden, 6 vragen: c, b, c, a, c, b). Tekenfuncties in `bron/src/teken_lb3.js` (runderen op basis van koe7-pop: holstein, dubbeldoel, blaarkop, stier, kalf; keuzebord, stamboom, DNA-chip, tablet …), keyframes `bron/werk/testvel/`.
- Twijfelblad (10 scènes): https://claude.ai/artifact/M8NUtQjKBGr6Ju64AcwhtR (db-collectie `keuring`, account van 25/26 okt). **Wacht op Kamiel.** Open vragen: veehouder = Veehouder Gerrit of nieuwe veehoudster (bij Gerrit: 'haar/ze' → 'zijn/hij' in s-tabletscène vóór inspreken), Bilal in beeld, echte stiernaam in beeld, tabletscène als scène of 7e vraag, tweede titelregel, staldecor (± 240–430 credits).
- Daarna: decor stal, inspreken (Roos, eleven_v4; risicowoorden in script_v2 'Keuzes en twijfels'), bouwen, frisse beeldreview, repo; en de **patroonronde** van de reeks (B15).

