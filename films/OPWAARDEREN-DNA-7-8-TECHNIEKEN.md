# DNA 7, DNA 8 en de twee DNA-technieken-films: beeld-remake (31 okt 2026)

Kamiel (30–31 okt 2026): DNA 7 en 8 staan nog op prompt v5 en de twee technieken-films zijn nog de oude 'Labjournaal'-artifacts. Eerst de scripts nagelopen (zie onder), daarna **beeld opnieuw, takes houden**, net als bij Cellen (`films/OPWAARDEREN-CELLEN.md`). Kamiel: 'akkoord. ja is goed doe pcr en gelfilms er maar bij'.

| Film | Wat | Waar |
|---|---|---|
| DNA lezen (DNA 7) | beeld-remake | `films/dna/7-dna-lezen.html` + `7-dna-lezen/bron/` |
| Wat heb jij aan DNA? (DNA 8) | beeld-remake | `films/dna/8-wat-heb-jij-aan-dna.html` + `8-wat-heb-jij-aan-dna/bron/` |
| Op maat gekopieerd (PCR) | beeld-remake | `films/dna-technieken/1-op-maat-gekopieerd/` (`index.html`, `narration.mp3`) |
| Op lengte gesorteerd (gel) | beeld-remake | `films/dna-technieken/2-op-lengte-gesorteerd/` (`index.html`, `gelfilm.mp3`) |

## Scriptcheck (31 okt 2026, vóór de remake)
- DNA 7 n19 (NL-wet stamboomsites), DNA 8 n3 (SNP-verwijzing naar een vwo-blok), DNA 8 n5 ('in het jaar 2025'): **al opnieuw ingesproken en ingeplakt** (versie 1.5, commit 4b2aa11c; `bron/stem/herinspreken_20261031.json`). Gebruik de takes zoals ze nu in de gepubliceerde HTML staan. Het kaartje 'Nederland' in n19 zegt nu 'alleen bij ernstige misdrijven / met toestemming van een rechter'; houd die inhoud.
- Verder zijn de scripts van alle vier inhoudelijk in orde; geen tekstwijzigingen. Vind je toch een feitelijke fout: niet opnieuw inspreken, wel op de vragenlijst.
- Op de uitspraak-wachtlijst (niet nu opnemen): DNA 7 n22v 'hemoglobienuh'.

## Werkwijze
Volg `films/OPWAARDEREN-CELLEN.md` § 'Lees eerst', § 'Beeld-remake' (punten 1–9) en § 'Afronden', met deze aanvullingen:

1. **Engine.** DNA 7 en 8 staan nog in de oude DNA-bouwstraat (`films/dna/_bouw/`, prompt v5, audio als base64 in FILMDATA). De DNA-reeks heeft nu de FILMDATA-straat met Part C-bibliotheek en de ringvormbasen: kijk hoe DNA 1 en 2 (versie 3.0) zijn opgebouwd (`films/dna/1-wat-is-dna/bron/info.md` § 'Zo pas je deze film aan', `bron/src/`, `bron/bouw/`) en zet 7 en 8 in diezelfde opbouw, zodat de reeks één look heeft. Haal de takes met hun woordtijden uit de gepubliceerde HTML (`films/dna/_bouw/haal_audio.py` of zelf uit `window.FILMDATA`); woordtijden, `bounds`, vragen, hoofdstukken, vwo-blokken, docentdeel, begrippen en oefeningen blijven. Losse mp3's naast de film (zoals `1-wat-is-dna/audio/`) mag; dan worden de films ook veel kleiner.
2. **Technieken-films.** Eén doorlopende take (`narration.mp3` / `gelfilm.mp3`) met een eigen tijdlijn (`OMG_TL` / `OLG_TL`). Kies zelf of je de take op de regelgrenzen in segmenten knipt en naar de FILMDATA-straat gaat (aanbevolen: dan krijgen ze dezelfde speler met snelheid, Vragen aan/uit, Havo/Vwo en review als de rest), of de eigen speler houdt; de take zelf verandert niet. Bij de PCR-film is hoofdstuk 3 verdieping (`verd: true`, knop 'Sla de verdieping over'): maak dat in de FILMDATA-straat een blok dat havo overslaat, of houd de knop. **Beeld moet blijven passen bij het practicum** `tools/dna-profielen/` (banen M50, Eig, Sp, A, B, C, PC, NC, AL; Sp 172 bp in de PCR-film, 140 bp / allel 13 op chromosoom 8 in de gelfilm; neem de getallen uit het practicum en de film, niet uit je hoofd). Zet het vaste regeltje 'donker is standaard' terug (CLAUDE.md, 'Licht/donker') en de sitebalk '← Terug naar DNA'.
3. **Beeldbank.** Basen, ladder, helix, polymerase, primers, buisjes, gel en elektroforese uit `bibliotheek/lib_bio.js` (testvel `#dna`) en de DNA-lessen (`tools/docent/dna-3/beeldbank.js` is gebouwd uit `bibliotheek/verbeterronde-1/`; kijk daar welke apparaten en moleculen er zijn). Mensen zijn castpersonages uit `personages/lib_cast.js` (rollen in `personages/ROLLEN.md`, levensloop in `personages/LEVENSLOOP.md`); castnamen niet in beeld (bovenbouw). Rechercheurs, verdachten, een tante, een patiënt: castpersonages of figuranten met gezicht, nooit grijze poppetjes.
4. **Rustig.** Kamiel 28 okt: 'DNA is al moeilijk genoeg' — één ding tegelijk, weinig tekst in beeld, namen direct bij het onderdeel. Getallen in beeld moeten met de stem en het docentdeel kloppen.
5. **Versie** wordt 2.0 met `| Prompt | v13 |` en 'Voldoet aan: prompt v13 (31 okt 2026, beeld-remake, takes behouden)'. Oude versie naar `bron/oud/` (DNA 7/8: `bron/oud/<film>-1.5.html`; technieken: `bron/oud/index-1.0.html` + de oude info.md). `bron/info.md` bijwerken (opbouw, waar wat in de HTML zit, hoe je hem aanpast), `bron/bronnen.md` maken volgens `films/BRONNEN.md`.
6. **Lijsten voor Kamiel** in `bron/opwaardering-v13.md`: twijfelscènes (gebouwd met jouw beste keuze), herinspreeklijst (alleen als het echt moet; niet opnemen), vragen over inhoud, voor de bibliotheek, en per scène één regel wat er veranderde.
7. **Kijk zelf (C10)** met contactvellen van alle scènes, havo en vwo, en speel elke vraag af met `?vragen=uit`. Daarna één ronde met verse ogen.

## Niet aanraken
`index.html` (datum, REVIEW, duur, nieuwste: doet de hoofdsessie), `films/logboek/b15_uitzonderingen.jsonl`, `bibliotheek/`, `personages/`, `tools/`, andere films. Geen ElevenLabs. Wijzigingen die `licentie_noot.py`/`teller.py` buiten jouw film maken niet meecommitten.

## Commit
Per film, alleen de bestanden van die film: 'DNA 7 2.0: beeld-remake op prompt v13 (takes behouden)' (enz.), eindigend met
  Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Dan `git fetch origin main && git rebase --autostash origin/main && git push origin HEAD:main`; bij weigering even wachten en opnieuw (andere sessies pushen tegelijk). Nooit force. `scripts/controle.py` mag alleen op de B15-poort falen (de datum zet de hoofdsessie); andere fouten eerst oplossen.
