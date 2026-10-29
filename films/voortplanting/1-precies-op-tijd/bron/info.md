# Van bevruchting tot baby (voorheen Precies op tijd) — bronmap

Versie 3.0 (29 okt 2026): omgezet naar de standaardspeler (FILMDATA-straat, zoals Geslachtsorganen 2.0 en Celdeling 2.0) en opgewaardeerd naar prompt v13 zonder keuring. De stem is dezelfde opname, per alinea geknipt; niets opnieuw ingesproken (0 credits). De oude versie 2.6 staat in `oud/` (`1-precies-op-tijd-v2.6.html`, `info-v2.6.md` met de hele geschiedenis tot 2.6, `script-v2.6.md`, broncode in `oud/src-v2.6/`). Lijsten voor Kamiel: `opwaardering-v13.md`. Bronnenlogboek: `bronnen.md`.

| Veld | Waarde |
|---|---|
| Bestand | films/voortplanting/1-precies-op-tijd.html (audio in `1-precies-op-tijd/audio/sNN.mp3`, oefeningen in `1-precies-op-tijd/oefenen.json`) |
| Reeks / nummer | Voortplanting, 'Film 3' in de filmlijst (`HOOFDSTUKKEN.voortplanting`); les 2 Voortplanting (`tools/docent/voortplanting-2/`) hoort erbij (`uitleg`-knop) |
| Niveau | vwo (`alleen: 'vwo'`, geen havo/vwo-knop; er zijn geen vwo-blokken) |
| Versie / datum | 3.0 · 29 oktober 2026 (standaardspeler + opwaardering) · eerder 2.6 · 22 okt 2026, 2.5 (prompt v8), 2.1 · 11 okt 2026. De datum in index.html blijft 2026-10-11 (opwaardering) |
| Prompt | v13 |
| Voldoet aan | prompt v13 (29 okt 2026, zonder keuring); bewust niet: zie 'Bewust niet' onderaan |
| Stem / model | Roos (ElevenLabs, eleven_multilingual_v2), opname van v1 (september 2026), zes zinnen uit v2.1 (hCG als 'ha cee gee'; vraag H8 met 'Wat denk je?') |
| Duur | 18:55 met vragen (43 alinea's spraak 16:49 + titel, 12 hoofdstukkaarten van 1,3 s, 7 vragen van 14 s, eindkaart); 16:07 met Vragen uit. `duur: 20` en 'bij … 19:45' in index.html zijn nog die van 2.6 |
| Beeldstijl | Part C: Schema als hoofdlook, Micro in zoomcirkels. De scènes zijn die van 2.6 (eigen engine `ENG`, nu `src/oud_engine.js`), getekend op het canvas van de standaardspeler |
| Personages | Linda (moeder, zwanger), Oma Ria (outfit 'vroeger', zwanger), Noor ('jij'), baby; geen namen in stem of beeld |
| Audio-opslag | 43 losse mp3's (96 kbps mono), geknipt uit de 12 hoofdstuk-takes van 2.6 op de stilte tussen zinnen (`bouw/plan.py`); woordtijden `stem/woordtijden/sNN.json` (de oude woordtijden, verschoven; voor de 7 gesproken vragen silalign) |

## Opbouw (segmenten in `segments.json`, tekst in `script.md`)

| Hoofdstuk | Segmenten | Vraag |
|---|---|---|
| Cold open | s01 | — |
| Titel | s02 | — |
| H1 Een eicel die wacht | s03–s06, gesproken vraag s07 | q08 (b) |
| H2 Signalen van boven | s09–s13, s14 | q15 (c) |
| H3 Een wedstrijd tussen follikels | s16–s17 | — |
| H4 Van rem naar gaspedaal | s18–s21, s22 | q23 (a, met cyclusgrafiek naast de keuzes) |
| H5 De ontmoeting | s24–s26, s27 | q28 (c) |
| H6 Een bericht aan het gele lichaam | s29–s32, s33 | q34 (b) |
| H7 Dichtbij, maar gescheiden | s35–s37 | — |
| H8 Man of vrouw? | s38–s40, s41 | q42 (a) |
| H9 Een lus die zichzelf versterkt | s43–s44 | — |
| H10 Ingrijpen in de signalen | s45–s49 | — |
| H11 Als het niet vanzelf gaat | s50–s54, s55 | q56 (c) |
| Eindkaart | s57 | — |

De inhoud per hoofdstuk, de getallen achter de film en het docentdeel staan in `oud/info-v2.6.md` en ongewijzigd in `sections.html` (docentdeel, checkvragen, bronnen en versie). Vragen, keuzes en uitleg zijn gelijk aan 2.6.

## Hoe het werkt (waar wat zit)

- `src/oud_engine.js` = de engine van 2.6 (`ENG`: tekenhulp `G`, kaarten, hormonen, cellen; `COMMON.makeTL`: `TL.W(zin, 'woord')`). `src/oudfilm.js` = de oude hoofdstuktijdlijn (`OUDFILM.chapters[k].sentences` met woordtijden) waar de scènes op draaien; H1 zonder de geknipte zin (lengte 0, staat er nog omdat de scène `W(10,'film')` gebruikt).
- `src/scenes_oud.js` = de hoofdstukscènes van 2.6 (`OSC['0']` … `OSC['11']`, was `SCENES[...]`), met de v13-wijzigingen (zoek op 'v3.0').
- `src/vp1_adapter.js` koppelt elke alinea aan zijn hoofdstukscène: `seg.oud = [hoofdstuk, begintijd in de oude take]`, scènetijd = begintijd + lokale tijd. De oude hoofdstukkaart, vraagkaart, titelkaart en onthulling worden niet meer getekend (die doet de speler); aan het begin van een hoofdstuk blijft het eerste beeld staan tot de scène gevuld is.
- `src/vp1_kop.js` vult de kleurnamen van `lib.js` aan met die van de oude engine (lib_bio verwacht o.a. `C.coral`, `C.nucFill`).
- `src/lib_bio_deel.js` = uittreksel uit `bibliotheek/lib_bio.js` van 29 okt (alleen wat de film gebruikt, `bouw/bio_deel.py`; namen op regel 2). `src/lib_bio.js` = de volledige kopie waaruit het komt.
- Speler: `src/player.js` = kopie van `films/gedrag/5-emotieregulatie/bron/src/player.js` (29 okt), met `src/player_vp1.js` erachter: (1) bij Vragen uit valt de alinea met de gesproken vraag (`vraagStem`) helemaal weg (H11 begint met 'Nog twee vragen om over na te denken.'); (2) vraagkaart met lange keuzes over twee regels en bij `fig: 'cycle'` de cyclusgrafiek ernaast; (3) ondertitelkast onderaan het beeld (de scènes van 2.6 rekenen met y = 950) en een eindkaart die lange zinnen afbreekt.
- Pagina: `src/page.html` + `film.py` (titel, lead, minis = de minivragen van de oude hoofdstukkaarten, begrippen uit `glossary.json`, docentdeel `sections.html`).

## Zo pas je deze film aan

1. Bouwen vanuit de repo-root: `bash films/voortplanting/1-precies-op-tijd/bron/bouw.sh` (werkmap `/tmp/vp1-bouw`, schrijft de film-HTML, `film.json` en `filmdata.json`). Daarna `scripts/spelerfix.py`, `antwoordtekst.py`, `kortantwoord.py`, `antwoordletter.py --check`, `flipkaarten.py`, `oefenen.py`, `licentie_noot.py`, `teller.py` (niet de bibliotheek-wijzigingen van die scripts meecommitten).
2. Beeld van een scène wijzigen: in `src/scenes_oud.js`, in het hoofdstuk `OSC['k']`; tijden blijven aan woorden hangen (`W(zin, 'woord')` in de oude hoofdstuktijd). Stills: `python3 bron/bouw/shots.py <url van de film> <map> s10@8 q23@3@reveal …`; Vragen uit afspelen: `bron/bouw/vragenuit.py <http-url>`; lege beelden aan het begin van een alinea: `bron/bouw/blank.py`.
3. Een alinea opnieuw inspreken: nieuwe mp3 als `audio/sNN.mp3`, woordtijden met `bouw/silalign.py` (alinea's die beginnen met een gesproken vraag bij de vragen staan in `segments.json` met `vraagStem: true`). Let op: de scène rekent in de oude hoofdstuktijd; is de nieuwe take langer of korter, zet dan in `src/oudfilm.js` de woordtijden van dat hoofdstuk bij (of herschrijf de scène als eigen `SCENES['sNN']`, zoals in de lichte remakes).
4. Alinea's opnieuw uit de oude takes knippen: `bouw/plan.py` (verwacht een werkmap met `FILM.json` en de blobs van `oud/1-precies-op-tijd-v2.6.html`, uitgepakt met `scripts/filmbron.py uitpakken`; extra knippen in `KNIP`).
5. Beeldbankobject vervangen: `bibliotheek/lib_bio.js` naar `src/lib_bio.js` kopiëren, `bouw/bio_deel.py` opnieuw draaien met de namen van regel 2 (+ het nieuwe object).

## Wijzigingen 3.0 (29 okt 2026)

Speler en bouwvorm (Kamiel 29 okt 2026: films naar de standaardspeler):
- Standaardspeler (snelheid, Vragen aan/uit met knippen op de stilte, Leerling/Klas, toetsen, `?vragen=`, `?snelheid=`, `?modus=klas`, reviewstand `?review=1`, `__still`/`__items` voor QA). De oude eigen speler (`vp1.*` in localStorage, schuifbalk met hoofdstukstreepjes, 'Nu'-regel, klikbare tijden in het transcript) is weg.
- Audio: 12 hoofdstuk-takes (base64, 14 MB in de HTML) → 43 alinea's naast de HTML (12 MB); de HTML is nu 1 MB.
- Hoofdstukkaarten, vraagkaart en eindkaart van de standaardspeler; de minivragen van de oude kaarten staan in `minis`.
- Begrippen als kaartjes (38, ongewijzigd), met flipkaarten en 'Zelf aan de slag' (zelfde `oefenen.json`).

Beeld (prompt v13, zonder keuring), één regel per gewijzigde scène:
- s04 (H1): de zin "Hoe de meiose zelf verloopt, zag je in de film 'Eén wordt twee'." uit de take geknipt (die film bestaat niet); in beeld 'meiose zelf: zie de film Celdeling'.
- s05 (H1): mRNA-slierten in de eicel in de RNA-kleur (teal, `D2.rna`) in plaats van paars, label 'bouwinstructies' mee.
- s10–s11 (H2): de receptor óp het membraan = `membraanReceptor` uit de beeldbank (kralenketen met zeven helices door het membraan, G-eiwit dat bij 'kettingreactie' actief wordt); het eiwithormoon dokt in de pasvorm. De receptor ín de cel = `enzymKluwen` (kralenketen) die het steroïd bindt, in plaats van het schoteltje. Het DNA in de kern grijs (palet B).
- H2 (zoom op de eicel), H4 (eicel stil in metafase II) en H5 (zygote): chromosomen grijs (`CD.std`) in plaats van paars.
- s35 (H7): navelstreng in de placentadoorsnede met de kleur naar zuurstof (`kleurO2: false`: slagaders blauw, ader rood).
- s43–s44 (H9): navelstreng `bioNavelstreng` (slagaders blauw, ader rood) in plaats van `castNavelstreng` (slagaders rood).
- s48–s49 (H10): hiv: RNA in de RNA-kleur, het ingebouwde DNA grijs (was koraal/paars).
- Vraagkaart H4 (q23): de cyclusgrafiek uit het model staat naast de keuzes (was een SVG in de oude HTML-kaart).
- Hoofdstukstarts (s03, s09, s16, s50): het eerste beeld staat er meteen (was ± 1 s leeg navy door de oude infade).

Getest (29 okt 2026): elk item op 5 tijdstippen gerenderd zonder fouten; elke vraag afgespeeld met `?vragen=uit` (5 s ervoor tot 5 s erna): geen vraagkaart, geen gesproken vraag, geen restje in de ondertitels, de vertelling gaat door in het volgende hoofdstuk; vraag 1 afgespeeld met vragen aan (vraagzin, bedenktijd, antwoord, onthulling); reviewstand (`?review=1`: klik pauzeert, typvak met de gesproken zin); op de site: `index.html#voortplanting` linkt naar hetzelfde pad, 'Les 2' opent `tools/docent/voortplanting-2/index.html#2` en de les linkt terug naar de film; telefoon 375 px zonder horizontaal scrollen, ondertitels onder het beeld. `spelerfix.py --check`, `antwoordtekst.py --check`, `kortantwoord.py --check`, `antwoordletter.py --check` in orde. Contactvel van de gewijzigde scènes bekeken.

## Bewust niet (zonder keuring niet gedaan; zie de vragen in `opwaardering-v13.md`)

- De scènes zijn niet herschreven naar de tekenstraat van de lichte remakes (`lib.js`, één scène per alinea); ze draaien op de engine van 2.6. Dat is een lichte remake.
- Hormoonkleuren van de film (eiwithormonen teal, steroïden paars) niet gelijkgetrokken met Les 2 (`HK()`) en de beeldbank (`HORM`: LH groen). De hormoondeeltjes blijven bolletjes en ruitjes uit de oude engine.
- Het vergrote zaadcelbeeld in H1 ('ZAADCEL · VERGROOT') houdt de schematische zaadcel (namen kern/mitochondriën/staart staan erop), zoals sinds 2.5.
- De telpoppetjes bij 'één op de zes stellen' (H11) blijven pictogrammen (toegestaan).
- Geen havo-stand (er zijn geen vwo-blokken), terwijl index en les 2 de film ook bij havo noemen.
