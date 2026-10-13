# Een rondleiding door je lichaam — bronmap

| Veld | Waarde |
|---|---|
| Bestand | `films/onderbouw/32a/2b-rondleiding-door-je-lichaam/index.html` (audio in `audio/`: 16 mp3's, niet ingebed) |
| Reeks / nummer | Kerndoelen onderbouw, film 2b (32A Organismen, tweede bullet): de "kaart" van ± 28 organen en de tien orgaanstelsels, plus de vier organen van de plant |
| Doelgroep / niveau | onderbouw leerjaar 1–3, gemengd vmbo-t / havo / vwo. Basislijn op vmbo-t-niveau; één extra blok voor havo/vwo (s16, paarse balk: organen bij twee stelsels). Schakelaar **Basis / Havo/vwo** (`?niveau=basis`) |
| Versie / datum | 1.0 · 13 oktober 2026 |
| Stem / model | Roos (ElevenLabs, voice_id `7qdUFMklKPaaAVMsBTBt`), model `eleven_v4`, één take per segment, flow `UokirpHtX0Vd05HmYwHA` (generatie-id's in `stem/generaties.json`) |
| Woordtijden | ElevenLabs Scribe (`eleven_scribe_v1`) op dezelfde takes; alle 16 takes woord voor woord gelijk aan het script ("'s ochtends" telt als één woord) |
| Duur | audio 343 s; speeltijd Havo/vwo ± 6:50, Basis ± 6:15 |
| Beeldstijl | Part C, vlak. Rode draad "een dag uit je leven": links in een inzetcirkel het moment van de dag met tijd-pil (nacht, wekker, ontbijt, fiets, wc, klas, koud, avond, slapen), in het midden het lichaam-schema uit film 2 (`bodyOrgans`, verschoven naar x = 1120) waarin organen oplichten met een label (`ORG`-tabel: aanwijspunt en labelplek per orgaan); de plant in de tuin-look van film 2. Beeldcheck `stijlframes/beeldcheck_v1.jpg` |
| Audio-opslag | losse mp3's per segment, gemasterd naar −16 LUFS (ffmpeg loudnorm, 128 kbps) |
| Herkomst | uitlegfilm-prompt v5 + Part D; script na drie reviews (`reviews/`); geen checkpoint (Kamiel: "doe maar tegelijkertijd", "kun je ook 1 en 2 doen?") |

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `script_v2.md` | het script (bron van alles); `script_v1.md` de versie vóór de reviews; `reviews/` de drie reviews |
| `stem/segmenten_stem-invoer.json` | per segment de schermtekst (`display`) en de letterlijke stem-invoer (`voice`) |
| `stem/woordtijden/sNN.json` · `stem/generaties.json` | woordtijden per take (Scribe) · generatie-id, duur en (tijdelijke) url per take |
| `filmdata.json` | de data zoals ingebed in de film |
| `src/lib.js`, `src/helpers1.js`, `src/helpers2.js` | Part C-bibliotheek; hulpjes uit film 1 (sla, cellen) en film 2 (lichaam, organen, plant, trap) |
| `src/scenes2b.js` | de `ORG`-tabel, extra organen (lever, alvleesklier, mond, schedel, huid, ogen, neus), de dag-inzetten (`vignette`) en één scènefunctie per segment; `build.py` plakt lib-hulpjes en scènes tot `src/scenes.js` |
| `src/player.js`, `src/page.html` | speler (meta "film 2b", hoofdstuk-subtitels in `mini`) en paginasjabloon met checkvragen, begrippen en docentdeel |
| `bouw/make_segments.py` | `script_v2.md` → `segments.json` (lege regel = nieuwe take; respellings in `subs`) |
| `bouw/build_data.py` | segments + woordtijden + vragen → `filmdata.json` (antwoorden, `HOLD`; voegt "'s" + volgend woord samen) |
| `bouw/build.py`, `bouw/cuecheck.py`, `bouw/shots.py` | bouwen · cue-controle · stills en contactsheet |

**Werkmap opzetten:** kopieer `src/`, `bouw/*.py` en `script_v2.md` naar een werkmap buiten de repo; zet `stem/segmenten_stem-invoer.json` daar als `segments.json` en `stem/woordtijden/` als `words/`; `python3 build_data.py && python3 build.py` geeft `film/index.html`; audio in `film/audio/`.

## Opbouw

| Segment | Hoofdstuk | Moment | Beeld |
|---|---|---|---|
| s01 | Cold open | 6:00 | slaapkamer bij nacht (maan, bed, zzz); "hoeveel van je organen zijn nu aan het werk?" |
| q02 | Cold open | vraag | hoeveel organen werken terwijl je slaapt? |
| s03 | Titel | — | titel met lichaam-schema |
| s04 | H1 Ochtend | nacht → 7:00 wekker | lichaam met alle organen zacht aan; dan zenuwstelsel: hersenen, ruggenmerg, zenuwen (signaalstippen), ogen |
| s05 | H1 | 7:30 ontbijt | spijsvertering: mond, slokdarm, maag, dunne en dikke darm (een hapje reist mee), alvleesklier, lever (ring); "bij welk stelsel hoort de lever?" |
| q06 | H1 | vraag | bij welk stelsel hoort de lever? |
| s07 | H2 Overdag | ontbijt → 8:15 fiets | lever bij spijsvertering; spieren, botten (skelet), schedel |
| s08 | H2 | 8:30 fiets | neus, luchtpijp, longen (zuurstof erin, CO₂ eruit), hart, bloedvaten; "100 000 keer per dag" |
| s09 | H2 | 10:00 wc | nieren, urineleiders, blaas; stippen van nier naar blaas |
| s10 | H2 | 11:00 les | afweer: inzet bloedvat met witte bloedcellen, lymfeklieren |
| s11 | H2 | 12:30 buiten | huid als omtrek; "is je huid een orgaan?" |
| q12 | H2 | vraag | is je huid een orgaan? |
| s13 | H3 Avond | buiten → 20:00 | huid in doorsnede (dekweefsel, bindweefsel, zenuwen, bloedvaten); avond; hormonen reizen als stippen door het bloed; "alleen in de puberteit?" |
| q14 | H3 | vraag | hormonen alleen in de puberteit? |
| s15 | H3 | 20:00 | hypofyse, schildklier (hormoonstelsel); eierstokken, baarmoeder, zaadballen (voortplantingsstelsel) |
| s16 | H3, havo/vwo | — | drie kaarten: alvleesklier, lever, huid, elk met twee stelsels; "geen losse hokjes" |
| s17 | H3 | 23:00 slapen | slapend lichaam: hersenen, hart, longen, nieren werken door; hond, muis en jij |
| s18 | H3 | de plant | sla in de tuin met zon die overtrekt: wortels (water), stengel, bladeren (licht), bloem; nacht met maan |
| s19 | Samenvatting | — | lichaam met alle tien stelsels; elk label licht op bij zijn naam; huid als omtrek |
| s20 | Eindkaart | — | Probeer het zelf: sorteer tien organen, jouw dag, strikvraag huid; blijft 12 s staan |

## Vragen

| Id | Vraag | Opties | Goed |
|---|---|---|---|
| q02 | Je slaapt. Hoeveel van je organen zijn nu aan het werk? | bijna geen · alleen hart en longen · bijna allemaal | c |
| q06 | Bij welk stelsel hoort de lever? | bloedvatenstelsel · spijsverteringsstelsel · uitscheidingsstelsel | b |
| q12 | Is je huid een orgaan? | nee, een laagje · ja: verschillende weefsels samen, eigen taak · nee, één weefsel | b |
| q14 | Hormonen: alleen in de puberteit? | ja · nee, je hele leven · nee, alleen als je slaapt | b |

## Begrippen

De tien orgaanstelsels met hun organen, huid · havo/vwo: orgaan bij twee stelsels. Staan in `GLOSSARY` (index.html regel 817).

## Docentdeel

Op de pagina: doelgroep ("de kaart, films 3–8 de wandeling"), tabel per dagdeel met organen en stelsels, zes misconcepties, pauzemomenten, getallen (206 botten, 100 000 hartslagen, huid grootste orgaan), vereenvoudigingen, leerdoelen met dekking. Checkvragen: 1 lever (mk), 2 slapend lichaam (mk), 3 zes organen bij hun stelsel, 4 urine is geen restje drinken, 5 alvleesklier bij twee stelsels (havo/vwo).

## Waar wat in de HTML zit (`index.html`, versie 1.0)

Geen blobs: `film.src.html` = `index.html`, regelnummers zijn gelijk.

- Pagina-tekst: regel 65–145; checkvragen vanaf 95, docentdeel vanaf 111.
- `window.FILMDATA`: regel 146.
- Tekenbibliotheek vanaf regel 148; hulpjes film 1 vanaf 342; film 2 (`bodyOrgans` 521, `SYS` 550) vanaf 487; film 2b: `ORG` 621, `orgLabel` 631, `vignette` 643.
- Scènes: `const SCENES` regel 660; `s01` 662, `s03` 670, `s04` 675, `s05` 687, `s07` 699, `s08` 708, `s09` 718, `s10` 727, `s11` 736, `s13` 739, `s15` 752, `s16` 763, `s17` 774, `s18` 788, `s19` 801, `s20` 809.
- Begrippen: `GLOSSARY` regel 817. Speler vanaf regel 832; `drawChapterCard()` 879 (subtitels in `mini`).

## Zo pas je deze film aan

1. **Een orgaan verplaatsen of anders labelen**: `ORG` (aanwijspunt in U-eenheden vanaf het midden/de bovenkant van het lichaam, labelplek in px) in `src/scenes2b.js`; de tekening zelf in `bodyOrgans` (helpers2.js) of de extra functies `liver`, `pancreas`, `mouth`, `skull`, `skin`, `eyes`, `nose`.
2. **Een dagmoment anders tekenen**: `vignette(kind,…)`; nieuwe soort = nieuwe `if(kind===…)`.
3. **Eén segment opnieuw inspreken**: Roos, eleven_v4, één take, stem-invoer uit `voice`; Scribe-woordtijden; `audio/sNN.mp3` (−16 LUFS) en `words`/`dur` vervangen; bij andere tekst `bouw/cuecheck.py` draaien.
4. **Vraag aanpassen**: `q`, `options`, `correct`, `explain` in het `q..`-segment (of `bouw/build_data.py`).
5. **Basis of havo/vwo**: `level` van een segment; checkvragen `class="q vwo-only"`, begrippen `vwo:true`.
6. **Eindkaart**: tekst in `s20`; duur via `HOLD` in `build_data.py`.

## Uitspraak

Geen uitspraaktest vooraf (afspraak 13-10-2026). IPA vooraf opgezocht (Wiktionary via kaikki.org): hypofyse /ˌɦipoːˈfizə/ → stem-invoer "hiepofyse" (naar analogie van "hiepotonisch"); urine /yˈrinə/, insuline /ɪnzyˈlinə/, hormoon /ɦɔrˈmoːn/, schildklier /ˈsxɪltkliːr/, alvleesklier /ˈɑlvleːsˌkliːr/, lymfeklier /ˈlɪmfəˌklir/, eierstok /ˈɛiərˌstɔk/ als geschreven. Andere respellings: "'s ochtends/avonds/nachts" → "sochtends/savonds/snachts", "wc" → "wee-cee", "honderdduizend" → "honderd-duizend", "koolstofdioxide" → "koolstofdie-oxide". **Wachtlijst voor de batchtest:** hiepofyse (s15), urine en urineleiders (s09), insuline (s16), lymfeklieren (s10), alvleesklier (s05, s16), ruggenmerg (s04), schildklier (s15), eierstokken/baarmoeder/zaadballen (s15), sochtends/savonds/snachts (s01, s13, s18), wee-cee (s05, s09).

## Aandachtspunten

- Het lichaam staat niet op schaal; de lever is als wedge links van de maag (rechterkant van het lichaam) getekend, de alvleesklier als gele ellips achter de maag, lymfeklieren als groene stippen.
- Geen Lichaamsbouwer-tool nog: de eindkaart geeft de sorteeropdracht als tekst. Tool later toevoegen en de eindkaart (s20) ernaar laten verwijzen.
- Voortplantingsorganen zijn neutraal benoemd ("eierstokken en een baarmoeder, of zaadballen"); beide getekend in hetzelfde lichaam.
