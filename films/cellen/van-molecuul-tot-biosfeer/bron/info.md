# Van molecuul tot biosfeer — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/cellen/van-molecuul-tot-biosfeer.html (audio in films/cellen/van-molecuul-tot-biosfeer/audio/) |
| Reeks / nummer | Cellen, korte losse film (aanvulling Cellen: "doe een korte van 5 min", met differentiatie, Kamiel 14 okt 2026). Sluit aan op Celorganellen (levenskenmerken) en Van cel tot lichaam (onderbouw) |
| Doelgroep / niveau | havo + vwo, begin bovenbouw; vwo-blok gelabeld: s13 (emergente eigenschappen van een populatie; leven als emergente eigenschap). Havo/Vwo-schakelaar, standaard Vwo |
| Versie / datum | **2.1 · 30 oktober 2026** — open punten uitgevoerd (s01 en s16 zonder castnaam ingesproken, docentdeel griepprik, vaten s08 rustiger), zie Wijzigingen; 2.0 · 30 okt 2026 beeld-remake (takes behouden), zie 'Versie 2.0' hieronder; versie 2.0 staat in `bron/oud/van-molecuul-tot-biosfeer-2.0.html`; oude versie `bron/oud/van-molecuul-tot-biosfeer-1.2.html`. 1.2 · 22 okt 2026 (wereldbol, eindbeeld); 1.1 · 15 okt 2026; 1.0 · 14 oktober 2026 |
| Prompt | v13 |
| Voldoet aan | prompt v13 (29–30 okt 2026, beeld-remake, takes behouden). Sinds 2.1 noemt de stem geen castnaam meer. Bewust niet: geen nieuwe caststijl met contourlijnen (nog niet goedgekeurd); geen B15-varianten (beeld-remake) |
| Stem / model | Roos (ElevenLabs, voice_id 7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea (flow 4gDMk8mMxONkvHlgf7ga "Cellen · Van molecuul tot biosfeer"; nodes in `stem/takes.json`); 2.1: twee deelzinnen in flow q7sKYLgnRym6q5WC5t8F (`stem/herinspreken_20261030.json`) |
| Duur | spraak 6:11 (vwo) / 5:42 (havo). Speeltijd met kaarten en vragen: vwo ≈ 7 min, havo ≈ 6,5 min |
| Beeldstijl | Part C, sinds 2.0 met de beeldbank. Rode draad: ladderbalk links + één doorlopende zoom naar buiten (eiwit → kern → hartspiercel → hartspierweefsel → hart → koolmees met hart en vaten → koolmees → bos → aarde). Macro (Noor (castboek) ziek in bed, deurklink, bos overdag met koolmezen, merels, eiken, Dr. Kim als onderzoeker), Micro (geen korrel; eiwitVouw, kernEnvelopPorie, hartspiercel, griepVirus, bacterieEcht, celRond, keelepitheel), Schema (bord, rupsencurve, recap, eindbeeld). Zie `storyboard-remake.md` |
| Audio-opslag | 13 losse mp3's in audio/ (s01 … s16), loudnorm −15 LUFS, piek −1,5 dBTP, mono 44,1 kHz 96 kb/s; niet in de HTML ingebed |
| Lettertypen | Fraunces 700, Source Sans 3 400/600/700, IBM Plex Mono 500 — ingebed als base64 |
| Herkomst | gebouwd op 14 oktober 2026 met de bouwstraat van de voedingsreeks (`bouw/`); beeld-remake 2.0 op 30 okt 2026 (brief `films/OPWAARDEREN-CELLEN.md`) met de beeldbank (`src/lib_bio_deel.js`, `src/lib_dieren_deel.js`, `src/lib_micro_deel.js`), het castboek (`src/lib_cast.js`) en eigen tekeningen (`src/teken_vmb.js`) |

## Versie 2.0 (30 okt 2026): beeld-remake op prompt v13, takes behouden

Brief `films/OPWAARDEREN-CELLEN.md`. Stem, script, takes, woordtijden, vragen, hoofdstukken, begrippen, oefeningen en docentdeel ongewijzigd; alle scènes opnieuw getekend op het niveau van de beeldbank. 0 credits. Per scène wat er veranderde, de twijfelscènes, de herinspreeklijst (castnaam in s01 en s16, ± 350 credits) en 'Voor de bibliotheek': `opwaardering-v13.md`. Storyboard: `storyboard-remake.md`. Bronnen: `bronnen.md` (20 beweringen, 15 ✓, 4 ≈, 1 ?).

- Schaal voelbaar (C8): ladderbalk met de elf niveaus links in beeld, huidig niveau goud met een maat (± 5 nm … 12 742 km); één doorlopende zoom naar buiten van eiwit tot aarde (`zoomUit`), geen wissels.
- Castpersonages: Noor (s01, s16; `persoon(ctx, 'noor', …)`) en Dr. Kim als onderzoeker (s09); geen `person()` meer. De castnaam staat niet meer in beeld: titelkaart (puzzelzin), vraag q02, oefening uitleg-virus en het docentdeel zijn neutraal gemaakt; in de stem van s01 en s16 zit hij nog (herinspreeklijst).
- Beeldbank: `eiwitVouw`, `kernEnvelopPorie`, `celRond`, `hartDoorsnede`, `bacterieEcht`, `gedifferentieerdeCellen` (genstrookje, huidcel), `zenuwcel`, `injectiespuit`, `mrnaSliert`, `griepVirus` (dierenbibliotheek micro), `koolmees` en `merel` (dierenbibliotheek, uitknippop), `rups` (Evolutie), `e2Eik` (Ecologie 2), de wereldbol uit 1.2.
- Nieuw getekend (recept in `src/teken_vmb.js`): hartspiercel en hartspierweefsel, keelepitheel met uitknoppende virussen, delende cel met insnoering, hart en vaten in de koolmees, ladderbalk, kleine voorwerpen.
- Geen korrel (`grain` uitgezet), minder paars, labels direct bij het onderdeel.
- Ingebouwd met `bouw/splice_vmb.py`: alleen het scèneblok in de site-HTML vervangen (FILMDATA, speler en nabewerkingen bleven), plus de twee schermteksten zonder castnaam. Daarna spelerfix, antwoordtekst, kortantwoord, antwoordletter (alle `--check` in orde), flipkaarten, licentie_noot, teller.
- Getest: contactvel van alle scènes (5 stills per alinea, havo en vwo) zelf bekeken en verbeterd; cuecheck (`bouw/cuecheck_vmb.py`: elk cuewoord raakt het bedoelde woord); afgespeeld via http met Vragen aan/uit en havo/vwo (zelfde knipplekken als 1.2, geen JS-fouten), `?review=1` laadt zonder fouten.

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `script_v2.md` | Definitief script met leerdoelen, misconcepties en wat de reviews veranderden. Lege regel = nieuwe alinea = nieuwe take. `script_v1.md` = vóór de reviews |
| `script.md` | Tekst per take met duur en audiobestand |
| `segments.json` | Uitvoer van `make_segments.py`: per alinea `display` (ondertitel), `voice` (stem-invoer met respellings) en `vmap` |
| `film.py` + `sections.html` → `film.json` | Titel, vraagteksten met juist antwoord, begrippen; checkvragen en docentdeel staan in `sections.html` |
| `checkpoint.html` | Zelfcheck: contactsheets uit de speler, wat de reviews veranderden, script |
| `uitspraak.md` | Risicowoorden met stem-invoer; wachtlijst voor Kamiel |
| `stem/woordtijden/sNN.json` | Woordtijden per take (Scribe, op de ondertitelwoorden) |
| `stem/takes.json`, `stem/gen.json` | ElevenLabs-flow en node per take; generatie-id en duur |
| `src/` | Sinds 2.0: `scenes_vmb.js` (scènes per alinea), `teken_vmb.js` (eigen tekeningen met recepten), `kop.js` (tag, regel, kruis, vink), `leen_vmb.js` (wereldbol uit 1.2, `rups` uit Evolutie, `e2Eik` uit Ecologie 2), `lib_cast.js` (castboek), beeldbank-uittreksels `lib_bio_deel.js`, `lib_dieren_deel.js` (koolmees, merel), `lib_micro_deel.js` (griepVirus); en de engine `lib.js`, `lib_voeding.js`, `lib_hormonen.js`, `player.js`, `page.html`, `fonts.css`. De scènes van 1.x: `oud/src-1.2/scenes.js` |
| `bouw/` | `make_segments.py`, `align.py`, `build_data.py`, `build.py`, `stills.py`, `fake_words.py`, `uitspraak_subs.json` (reeks) en **`uitspraak_film.json`** (alleen deze film: homeostase, emergente, abiotische); sinds 2.0 `bouw_vmb.py` (bouwt en zet het scèneblok in de site-HTML), `splice_vmb.py`, `cuecheck_vmb.py`, `bio_deel.py`, `dier_deel.py` |
| `reviews/` | Expert (cel, ecologie, virologie), didactiek + taal, curriculum (met checkvragen, ook los in `checkvragen.html`), eindreview `eind.md` |

**Bouwen (2.0):** vanuit de repo-root `python3 films/cellen/van-molecuul-tot-biosfeer/bron/bouw/bouw_vmb.py <werkmap buiten de repo> [--stills]`. Het script vult de werkmap (engine + film + woordtijden + audio), maakt `scenes.js`, draait film.py, build_data.py, build.py en de cuecheck, en vervangt alléén het scèneblok in `films/cellen/van-molecuul-tot-biosfeer.html`. Daarna in de repo: `scripts/spelerfix.py`, `antwoordtekst.py`, `kortantwoord.py`, `antwoordletter.py` (elk ook `--check`). Een volledige herbouw met `build.py` (zonder splice) is niet nodig en zou de nabewerkingen overschrijven.

## Opbouw

| Hoofdstuk | Type · look | Kernbeeld |
|---|---|---|
| Cold open (s01, q02) | C · Macro → Micro | Noor (castboek, naam niet genoemd) rechtop in bed met tissues; zoomcirkel naast het hoofd: keelepitheel waar griepvirussen uitknoppen; drie varianten; griepprik; deurklink met één virus in een zoomcirkel (eet niet, groeit niet); vraag q02 (antwoord in s15 en de recap) |
| Titel | Schema | Vier medaillons van klein naar groot: eiwit, hartspiercel, koolmees, aarde |
| H1 Wat is leven? (s04–s05) | C · Schema | Bord met zes levenskenmerken; kamerplant buigt naar het licht; koolmees (dierenbibliotheek) pikt een rups, ei barst, nestje, vliegt op en terug, sneeuw; los eiwit (kralenketen) uit de koolmees leeft niet; bacterie (`bacterieEcht`) = één cel met alle kenmerken; virus 'straks' |
| H2 De ladder (s06–s13) | B · Micro → Macro | Ladderbalk links en één doorlopende zoom naar buiten: eiwit vouwt → celkern → hartspiercel; differentiatie (eicel deelt, hartspier-, zenuw-, huidcel met elk een ander gen aan); hartspierweefsel → hart (doorsnede, klopt) → koolmees met hart en vaten → koolmees; bacterie = één cel = organisme; bos overdag: populatie koolmezen, merels, rupsen, eiken, paddenstoelen; Dr. Kim telt en meet (q10); abiotische factoren lichten op; rupsenpiek tegenover jonge koolmezen; zoom naar de wereldbol; hartspiercel tegenover het pompende hart. Vwo s13: populatie met dichtheid en nest; losse eiwitten tegenover een cel |
| H3 Leeft een virus? (s14–s15) | C · Micro | Virus naast de ladder ('geen cel'); griepvirus groot met RNA, eiwitmantel, vetlaagje; op schaal naast een bacterie; bord bacterie tegenover virus; virus dringt een keelcel binnen, de cel maakt RNA en nieuwe virussen knoppen af, mitochondrion bij 'energie'; antwoord a; varianten en grensgeval; RNA als los molecuul |
| Recap (s16) | Schema | Ladderbalk met per genoemd niveau het beeld in een medaillon; koolmees en Noor 'allebei een organisme'; virus naast de ladder |
| Eindbeeld (s17) | Schema | Overzicht van alle elf organisatieniveaus met een plaatje per niveau, twee rijen met pijlen (`eindNiveaus()`, 12 s) |

## Vragen

| Id | Niveau | Vraag | Juist |
|---|---|---|---|
| q02 | basis | Leeft een griepvirus? | a nee: het heeft geen eigen stofwisseling, het laat een cel werken (onthulling in s15 en de recap s16) |
| q10 | basis | Een onderzoeker telt rupsen en eiken, en meet temperatuur en bodemvocht. Welk niveau? | b een ecosysteem |

De antwoordopties worden niet ingesproken; ze staan alleen op het scherm (uit het script, `[VRAAG]`). De onthulling staat wél in de audio van s11, s15 en s16.

Checkvragen (statisch in de pagina): 1 Een sloot in de polder (niveaus ordenen, levensgemeenschap tegenover ecosysteem, populatie, eencellige) · 2 Leeft het of niet? (muildier, tarwezaad, griepvirus, prion) · 3 Reus of dwerg (griepvirus, mimivirus, Chlamydia, E. coli, tetracycline, emergentie; vwo).

Begrippen: levenskenmerken, homeostase, organisatieniveaus, weefsel, orgaanstelsel, differentiatie, populatie, levensgemeenschap, ecosysteem, biotische en abiotische factoren, biosfeer, emergente eigenschap, virus.

## Waar wat in de HTML zit (regelnummers in `van-molecuul-tot-biosfeer.html`, versie 2.0)

| Regel | Inhoud |
|---|---|
| 7–65 | Fonts (base64) en CSS |
| 74 | Sitebalk met '← Terug naar Cellen' |
| 101–168 | Hoofdstukken, begrippen, checkvragen (105), Voor de docent (137), transcript |
| 171 | `window.FILMDATA` (segmenten, woordtijden, vragen, titelkaart) |
| 172 | `lib.js` (Part C-tokens, `naamBij`, `zoomCircle`, `haak`) |
| 401 | `lib_voeding.js` + `lib_hormonen.js` (engine-hulpen; `person` wordt niet meer gebruikt) |
| 1225–5502 | Scèneblok 2.0 (één `<script>`, begint met '// Cellen · Van molecuul tot biosfeer 2.0'): castboek, beeldbank-uittreksels, leen (`aarde` r. 4827), kop, `teken_vmb.js` (`hartspierCel` r. 4914, `keelEpitheel` 4993, `ladderBalk` 5095, `zoomUit` 5111, `meesVaten` 5127, `niveauIcoon` 5138), scènes (`bosScene` 5173; title 5186 · s01 5197 · s04 5213 · s05 5238 · s06 5252 · s07 5271 · s08 5299 · s09 5329 · s11 5354 · s12 5393 · s13 5401 · s14 5419 · s15 5456 · s16 5471 · eind 5490) |
| 5503 | `GLOSSARY` en `player.js` (met spelerfix) |
| 5688 | antwoordtekst-wikkel (bij Vragen uit geen 'antwoord a' in beeld) |

## Hoe je de film aanpast

- **Tekst van een alinea:** wijzig `script_v2.md`, draai `make_segments.py` (met `uitspraak_film.json` in de werkmap), neem alleen die take opnieuw op (stem-invoer staat in `segments.json` → `voice`), haal woordtijden op met Scribe en `align.py`, zet de mp3 genormaliseerd in `audio/` en bouw opnieuw.
- **Een antwoordoptie of vraagtekst:** opties in `script_v2.md` bij `[VRAAG]`, vraagtekst en uitleg in `film.py`; geen nieuwe opname nodig (behalve als het juiste antwoord verschuift: dat noemt de audio).
- **Een beeld:** `src/scenes_vmb.js` (één functie per alinea, zie regelnummers hierboven); cues hangen aan woorden via `q.on('woord', n, duur)` / `q.at('woord', n)` (n = de hoeveelste keer dat een woord met dit stukje voorkomt; zoekt op deel van het woord). Controleer met `bouw/cuecheck_vmb.py src/scenes_vmb.js <werkmap>/c1/filmdata.json`, bouw met `bouw/bouw_vmb.py`.
- **Figuren (2.0):** `ladderBalk(ctx, cur, {lit, virus, breed})` (cur = huidig niveau, goud met maat uit `NIV_MAAT`), `zoomUit(ctx, u, P, A, k, binnen, buiten)` (doorlopende zoom naar buiten: punt P van het kleine niveau landt op punt A van het grote, k = schaalfactor), `hartspierCel(ctx, x, y, L, {c, rot})`, `hartspierWeefsel`, `keelEpitheel`, `delendeCel`, `meesVaten` (hart op `MEES_HART`), `bosScene(ctx, t, {mezen, ringen, merels, pad, nest, hlEik, nat, hlBodem})`, `niveauIcoon(ctx, i, x, y, maat, t)` (beeld per niveau, voor recap en eindbeeld). Beeldbankobjecten pas je aan in `bibliotheek/` en daarna het uittreksel opnieuw maken (zie `bouw/bouw_vmb.py`).
- **Checkvragen of docentdeel:** `sections.html` → `python3 film.py` → `build.py`.

## Aandachtspunten

- Uitspraak: zie `uitspraak.md` (homeo-staaze, ee-mer-gente, aa-biotische, biosfeer). Een blinde controle was in deze sessie niet mogelijk.
- De lijst levenskenmerken verschilt per methode; de film zegt dat ook. Controleer of de lijst past bij je eigen editie van Biologie voor jou en Nectar.
- Eindreview: 12 punten, alle verwerkt zonder nieuwe opname (zie `reviews/eind.md`).

## Wijzigingen

- 15 okt 2026 (versie 1.1): s11, s12, s13 en s16 opnieuw ingesproken na feedback van Kamiel: 'abiotische' zonder dubbele a (stem-invoer `abiotische`), 'emergente' met klemtoon op gen (`emergénte`); in s13 is "Voor vwo gaan we hier nog een stap verder." weggelaten (havo/vwo kies je in de speler). Let op: regelnummers en tijden hierboven kunnen enkele seconden verschoven zijn.

## Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen

`label()` tekent geen lijntje + stip meer naar de naam; de naam staat direct naast het onderdeel (nieuwe functie `naamBij()` uit Celorganellen, met donkere rand rond de letters). De oude aanroepen `label(ctx, naam, meta, ax, ay, lx, ly, …)` werken nog: de richting ax,ay → lx,ly bepaalt aan welke kant de naam komt. Opnieuw geplaatst (eigen `naamBij(...)` of andere richting): 'erfelijk materiaal (RNA)', 'eiwitmantel', 'vetlaagje'. Gecontroleerd op stills van alle scènes met namen. Ook doorgevoerd in `bron/src/lib.js` en `bron/src/scenes.js`.

## Wijziging 22 okt 2026: echte wereldbol, eindbeeld met alle niveaus, antwoordtekst bij Vragen uit

Feedback Kamiel: "dit mag een realistischere aarde worden met de continenten" en "een overzicht van alle organisatieniveaus, misschien helemaal op het einde als eindslide".
- **Aarde:** `aarde(ctx, x, y, r, a, t)` is nu een echte wereldbol. Landvormen uit Natural Earth 1:50m (publiek domein, via npm-pakket world-atlas), vereenvoudigd tot ±0,2° en delta-gecodeerd in `AARDE_LAND`; `aardeTextuur()` tekent één keer een textuur van 2048×1024 (oceaan, land met woestijn-, steppe-, oerwoud- en taigavlekken, Groenland en Antarctica wit, zee-ijs) en een wolkenlaag; `aardeBeeld()` projecteert die op een bol met belichting en dampkringrand (per straal gecachet). De bol draait langzaam; in s11 telt `t` vanaf het woord 'biosfeer', zodat Europa en Afrika in beeld zijn als hij verschijnt.
- **Eindbeeld:** `SCENES.eind` → `eindNiveaus(ctx, t)`: titel plus elf tegels (`EIND_ICOON`, namen uit `NIV`, examenniveaus vet met gouden rand) die één voor één verschijnen, met pijlen van molecuul tot biosfeer. In player.js roept `drawEnd` dit aan en is `END_DUR` 12 s. De drie kernzinnen van de oude eindkaart vervallen.
- **Vragen uit:** `scripts/antwoordtekst.py` (voor alle films) wikkelt `tag`/`regel`: bij Vragen uit verdwijnt 'antwoord a' en wordt 'antwoord a: geen eigen stofwisseling' alleen 'Geen eigen stofwisseling'.
- Geen nieuwe audio; scenes.js en player.js staan letterlijk in de HTML (vervangen, niet herbouwd).
- 30 okt 2026 (versie 2.1, brief `films/UITVOEREN-CELLEN.md`, Kamiel: 'je mag herinspreken'):
  - **s01 zin 1** 'Noor heeft griep. In haar neus en keel worden …' → 'Bij griep worden in je neus en keel miljoenen nieuwe griepvirussen gemaakt.' (het voorstel 'Wie griep heeft, maakt …' licht aangepast: niet de zieke maakt de virussen, de cellen in neus en keel). Roos, eleven_v4, één take, node `qggdNfpdYzCOOF0k3xeV`, generatie `G3Xav4Eyd2Am8S3pAcJX`, **75 credits**. Ingeplakt vóór 'En ze veranderen' (oud vanaf 5,55 s), s01 0,95 s korter. Titelkaart (puzzelzin) gelijkgetrokken: 'Bij griep worden in neus en keel miljoenen nieuwe griepvirussen gemaakt.'
  - **s16 laatste twee zinnen** '… net als Noor. Haar griepvirus staat ernaast …' → '… net als jij. Een griepvirus staat ernaast: een pakketje moleculen, dat pas in een cel iets doet.' Node `bUgl08wtlNgJOODpeZLT`, generatie `1qLFHnuI76eP8SxbV9aG`, **128 credits**. Ingeplakt na 'de biosfeer.' (oud tot 33,80 s).
  - Totaal **203 credits**, geen Scribe. Woordtijden van de nieuwe stukken met `silalign` (lokaal), de rest verschoven; cues (neus, miljoenen, griepvirussen, veranderen; koolmees, net, ladder, griepvirus 2, pakketje) nagelopen met `cuecheck_vmb.py`. Stem-invoer en plakpunten in `stem/herinspreken_20261030.json`, luisterfragmenten `stem/van-molecuul-tot-biosfeer-s01-luister.mp3` en `-s16-luister.mp3`; oude takes in `bron/oud/audio-2.0/`. Audio-URL's `?v=2`.
  - **Docentdeel**: zin dat de bescherming van de griepprik na ± een half jaar afneemt (RIVM B5 + Ferdinands e.a. 2017 B18), in `sections.html` en de site-HTML; bewering 2 in `bronnen.md` nu ✓.
  - **s08**: vaten in de koolmees rustiger (`MEES_VAT` in `teken_vmb.js`): slagaders stoppen in de romp (niet meer over vleugelpennen, staart en poten), armslagader tot de vleugelaanzet, alleen hals- en achterlijfader lopen ernaast, dunnere donkere rand.
  - Getest: cuecheck, contactvel van s01, s08 en s16, `?vragen=uit` (q02), spelerfix/antwoordtekst/kortantwoord/antwoordletter `--check`.
