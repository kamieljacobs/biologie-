# Anticonceptie, soa's en voortplantingstechniek — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/voortplanting/3-anticonceptie-soa-voortplantingstechniek.html (audio in films/voortplanting/3-anticonceptie-soa-voortplantingstechniek/audio/) |
| Reeks | Voortplanting (hoofdstuk `voortplanting`: vwo Nectar 4.1 H4, havo Biologie voor jou thema voortplanting), film 3 |
| Niveau | havo + vwo, voor beide niveaus dezelfde film (sinds 16 okt 2026 geen vwo-blokken meer; s10 en s14 zijn basis) |
| Versie / datum | 1.1 · 22 oktober 2026 (1.0 · 16 oktober 2026) |
| Voldoet aan | prompt v8 |
| Stem / model | Roos (ElevenLabs eleven_v4, voice 7qdUFMklKPaaAVMsBTBt), één take per alinea, flow XwPZNg4Ugc0gwL4LrtKa; respellings in `uitspraak_film.json` (soa → es-oo-aa, chlamydia → klamiedia, syfilis → siefilis, HPV → haa-pee-vee, PrEP → prep, ICSI → iksie, ivf → ie-vee-ef, PGT → pee-gee-tee, GGD → gee-gee-dee, FSH → ef-es-haa, Pearl-index → Perl-index, in-vietro-fertilisatie, hepatitis bee); zie `uitspraak.md` |
| Duur | spraak 7:08; speeltijd met kaarten en vragen ± 8:13; met Vragen uit ± 7:10 (havo en vwo gelijk) |
| Beeldstijl | Part C: Schema; schematische doorsnede (vooraanzicht) van baarmoeder, eileiders en eierstokken |
| Personages | Lotte en dokter Kim (cold open), Sam (H2), Fleur en Ruben (HPV-prik, s09), Erik als donor (s13) uit het castboek; alleen de telpoppetjes (zes stelletjes, s11) zijn nog `figuur()` |
| Audio-opslag | 11 losse mp3's in audio/ (s01, s04, s05, s06, s07, s09, s10, s11, s13, s14, s15) |
| Herkomst | Hoofdengine, werkmap `hw/vp3`; gebouwd met Claude in reeksmodus (geplande film 'Anticonceptie, soa's en voortplantingstechniek') |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | Lotte bij dokter Kim achter het bureau; lijst met methodes (pil, condoom, spiraaltje, staafje: '?'); raster van 100 stippen. q02 (antwoord in H1) |
| H1 Een schakel eruit | s04, s05, s06 | 7 van 100 stippen rood, strip met vergeten pil; de keten eisprong → bevruchting → innesteling, schakel breekt; doorsnede met per schakel de methodes (links pil/prikpil/staafje/ring, rechts condoom/pessarium/hormoonspiraaltje/sterilisatie), zaadcellen stoppen bij de baarmoederhals, slijmprop; koperspiraaltje (zaadcellen sterven, geen innesteling); morning-afterpil op een dagenas (eisprong schuift voorbij de 5 dagen dat zaadcellen leven); Pearl-index met vijf stippenrasters; condoom met schild, andere methodes doorgestreept |
| H2 Soa's: vaak zonder klachten | s07, q08, s09, s10 | Sam met telefoon ('je ex heeft chlamydia'); bacterie- en virus-paneel (antibiotica doden bacteriën; virus in een lichaamscel); 7 van 10 vrouwen / helft van de mannen zonder klachten; ontstoken eileiders met littekens; Sam met testbuisje (huisarts, GGD, gratis onder 25); HPV, baarmoederhals, twee kinderen met prik; grafiek virus in het bloed met hiv-remmers tot onder de meetgrens; PrEP-schild. Daarna (s10): populatie bacteriën, kuur, resistente mutanten vermenigvuldigen zich; vijf middelen doorgestreept, één werkt nog |
| H3 Een handje helpen | s11, q12, s13, s14 | Zes stelletjes (1 gemarkeerd); keten met haperende schakel; inseminatie (katheter, zaadcellen hoog in de baarmoeder); eileiders dicht → ivf; ivf-stappenbalk: één vs veel follikels (FSH), punctie met naald, schaaltje, ICSI met pipet, embryo dag 1–5, één embryo terug, vriezer (−196 °C), donor (niet anoniem). Daarna (s14): blastocyste, cellen uit de buitenlaag, DNA, drie embryo's (één gezond), Nederlandse regels en drie ethische vragen |
| Recap | s15 | Vier panelen: een schakel eruit, alleen condoom tegen soa's, bacterie of virus, een schakel erbij |
| Eindkaart | s16 | drie regels |

## Vragen (juist: b, c, a)
- q02: hoeveel van de 100 pilgebruiksters worden in een jaar zwanger? a geen enkele · **b ongeveer zeven** · c ongeveer dertig
- q08: welke soa kun je genezen met antibiotica? a hiv · b herpes · **c gonorroe**
- q12: waarom eerst tien dagen hormooninjecties bij ivf? **a zodat meerdere eicellen tegelijk rijpen** · b zodat de baarmoeder groter wordt · c zodat de eicellen sneller bevrucht worden

## Begrippen
anticonceptie, pil, spiraaltje, sterilisatie, morning-afterpil, Pearl-index, soa, antibiotica, HPV-vaccinatie, hiv-remmers / PrEP, kunstmatige inseminatie, ivf, ICSI, resistentie, embryoselectie/PGT — zie `film.json` → glossary.

## Docentdeel
In `sections.html`: 5 checkvragen (waar grijpt het in, betrouwbaarheid, soa zonder klachten + ivf-keuze, ivf, resistentie en embryoselectie), hoe de film het uitlegt, achtergrond met bronnen (Trussell/CDC-tabel, werking per methode, morning-afterpil, Soa Aids Nederland, RIVM HPV/Gardasil 9 sept 2026, U=U en PrEP, WHO/GRAS gonorroe, Wet donorgegevens 2004, Embryowet/PGT MUMC+), leerdoelen, lessuggesties.

## Waar wat in de HTML zit (films/voortplanting/3-anticonceptie-soa-voortplantingstechniek.html)
- regel 5: teller (GoatCounter); regel 70: sitebalk (← Terug naar Voortplanting)
- regel 101: checkvragen en docentdeel (uit `sections.html`); regel 155: footer met licentie
- regel 156: `window.FILMDATA`
- regel 1269: `persoon()` uit lib_cast.js (Lotte, dokter Kim, Sam)
- regel 1450: titel-aanpassing (lange titel wordt op de titelkaart automatisch kleiner; wrapper om `text()`)
- regel 1466: `figuur()`; 1475 `zaadcel()`; 1478 `eicel()`; 1482 `embryo()`
- regel 1495: `baarmoeder()` — schematische doorsnede met opties (slijmprop, spiraal koper/hormoon, pessarium, dicht/sterilisatie, litteken, slijmvlies, namen)
- regel 1537 e.v.: voorwerpen (`pilStrip`, `spuit`, `staafje`, `ringIcon`, `condoom`, `pessariumIcon`, `spiraalIcon`, `capsule`, `virus`, `schild`, `buisje`, `schaaltje`, `vriezer`, `pipet`, `dnaIcon`)
- regel 1562: `keten()` (eisprong → bevruchting → innesteling); 1579 `methode()`
- regel 1582: `const SCENES` (title, s01 … s15); s05 op 1609, s09 op 1683, s13 op 1754, s14 op 1787, s15 op 1799

## Hoe je de film aanpast
Werkmap opzetten: kopieer `bron/` naar `hw/vp3` (scenes.js uit `src/`, `words/` = `stem/woordtijden/`, `film/3-anticonceptie-soa-voortplantingstechniek/audio/` = `../audio/`, `uitspraak_film.json` in de werkmap), engine = `src/*.js` + `bouw/*`. Dan:
- tekst: `script_v2.md` aanpassen → `python3 engine/make_segments.py vp3 script_v2.md` → alleen gewijzigde alinea's opnieuw inspreken (Roos, eleven_v4, één take) → Scribe (connect_from = de TTS-node) → `engine/align.py` → `python3 film.py` → `engine/build_data.py vp3` → `engine/build.py vp3` → `bash pack.sh vp3 3-anticonceptie-soa-voortplantingstechniek voortplanting` → daarna opnieuw `scripts/licentie_noot.py` en `scripts/teller.py` (pack overschrijft de HTML).
- beeld: alleen `scenes.js` → `engine/build.py vp3` → pack. Let op deelwoord-cues: 'pil' zit ook in prikpil/abortuspil, 'meer' in 'meerdere' (daarom n = 2), 'hepatitis' en 'hiv' komen in s09 meermaals voor (n = 2), 'condoom' in s06 (n = 2 voor het schild).

## Aandachtspunten
- Uitspraakwachtlijst (zie `uitspraak.md`): soa als letters (es-oo-aa) of als woord, chlamydia, gonorroe, syfilis, HPV, hepatitis B, GGD, PrEP, hiv, Pearl-index, morning-afterpil, pessarium, ivf/in-vitrofertilisatie, FSH, ICSI, PGT.
- Getallen afgerond met 'ongeveer'; de echte waarden en bronnen staan in het docentdeel. 'Gratis testen onder 25 bij de GGD' kan per GGD voorwaarden hebben (docentdeel).
- Indeling: hormoonspiraaltje bij schakel 2 (slijmprop), koperspiraaltje bij schakel 2 én 3. De pilwerking via terugkoppeling staat in film 1 (Van bevruchting tot baby); hier alleen een verwijzing.
- Toon zakelijk; anatomie schematisch; geen beschrijving van seks.
- `data-duur` voor de kijkcijfers komt pas na het toevoegen aan `HOOFDSTUKKEN` in index.html (daarna `scripts/teller.py` opnieuw draaien).

## Wijzigingen
- 1.0 (16 okt 2026): eerste versie. Script na één gecombineerde review (zie `reviews/review_v1.md`); beeld-QA op contactbladen.


## Wijziging 16 okt 2026
Op verzoek van Kamiel: alle hoofdstukken zijn voor havo en vwo hetzelfde. s10 (resistentie bij gonorroe) en s14 (embryoselectie/PGT) staan nu op niveau `basis` in `FILMDATA`, `segments.json` en `script_v2.md` (markers `[VWO-START]/[VWO-END]` weg); de vwo-labels in de begrippenlijst (`film.py`/`film.json`) en checkvraag 5 (`vwo-only`) zijn weg. Audio ongewijzigd.


## Wijziging 19–20 okt 2026: alinea's opnieuw ingesproken na de uitspraaktest

Kamiel koos in de uitspraaktest (18–19 okt, 4 rondes) hoe de risicowoorden moeten klinken. Alleen de alinea's met die woorden zijn opnieuw ingesproken; de gesproken tekst is inhoudelijk gelijk gebleven.

| Woord | Nieuwe stem-invoer | Alinea's | Status |
|---|---|---|---|
| soa / soa's / Soa's | soa / soa's / Soa's (gewone spelling) | s06, s07, s09, s15 | goedgekeurd (uitspraaktest 18–19 okt 2026) |
| chlamydia | chlamydia (gewone spelling) | s07, s09, s11 | goedgekeurd (uitspraaktest 18–19 okt 2026) |
| GGD | GGD (gewone spelling) | s09 | goedgekeurd (uitspraaktest 18–19 okt 2026) |
| in-vitrofertilisatie | in vitro fertilisatie | s11 | goedgekeurd (uitspraaktest 18–19 okt 2026) |
| ivf | I-V-F | s11, s14, s15 | goedgekeurd (uitspraaktest 18–19 okt 2026) |

- Opnieuw ingesproken: s06, s07, s09, s11, s14, s15. Roos (7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea, ElevenLabs-flow `urmsa8zcNa5TFq8SVeBI` ("Herinspreken 19 okt · voeding, hormonen, voortplanting"). Stem-invoer = `voice` in `segments.json` (gemaakt met `make_segments.py` en de bijgewerkte vervangregels in `bouw/uitspraak_subs.json` en `uitspraak_film.json`).
- Woordtijden: Scribe (connect_from = de TTS-node) → `align.py` → `stem/woordtijden/`. Mastering: `loudnorm=I=-15:TP=-1.5`, mono 44,1 kHz 96 kb/s.
- Credits: TTS 3561, Scribe ≈ 1292 (≈ 235 s audio).
- In de HTML (`window.FILMDATA`) zijn alleen bij deze segmenten `words` en `dur` vervangen en heeft de audio-URL `?v=2` gekregen; speler en beelden zijn ongewijzigd. Getest met Playwright (vwo/havo, Vragen aan/uit): geen JS-fouten, nieuwe audio laadt.
- Niet aangepast: woorden die niet in de test zaten houden hun vorige stem-invoer, zodat ze in de hele film hetzelfde klinken (bijv. "receptor" zoals geschreven, terwijl de centrale lijst "reseptor" geeft).

| Segment | TTS-node | Generatie | Credits | Duur |
|---|---|---|---|---|
| s06 | KDhUbNtAXilDsGuRbz8O | duG1HiPpUUwtxtlwtEZ8 | 502 | 32.45 s |
| s07 | ppoxPk9QEW0s8Ozheupc | 2ivK5W9YsNxb3gavDV0m | 223 | 15.73 s |
| s09 | 6lXuuYtOGXmYcdmf4BZc | wE9iZj1LRC5LdamovhLc | 1400 | 93.01 s |
| s11 | Uq2gSBPK70lBHNJzZKpn | HPeUC9lYxMh5tlpMyIFw | 543 | 36.13 s |
| s14 | wcttaDotVSATWnNLu0sw | 0P61UlxW8OZ78oQuQ9zo | 501 | 32.61 s |
| s15 | LSPkquw3ogSjAQ8lKhtN | HPRsK5U51OVv32X1EXXV | 392 | 27.73 s |

## Opwaardering naar prompt v8 (1.1 · 22 okt 2026)

Werkwijze B14: verbeterblad met 18 voorstellen in de claude.ai-artifact 'Verbeterblad prompt v8' (db-collectie `keuring`, ids `vp3-1` … `vp3-18`); Kamiel koos 'alle 18 doen'. Alleen het beeld is veranderd: stem, script, vragen, cuewoorden en timing zijn gelijk, er is niets opnieuw ingesproken.

Hoe het in de pagina zit: `bron/src/scenes.js` is vervangen in de HTML; `bron/src/lib_cast.js` is de actuele castboekversie (met Fleur en Ruben) en `bron/src/lib_bio.js` (kopie van `bibliotheek/lib_bio.js`) staat erna, tot `/* einde lib_bio */`. `bouw/build.py` plakt lib_bio nu ook na lib_cast.

| Voorstel | Scène | Nu |
|---|---|---|
| 1 | s04, s11 (keten) | eierstok-doorsnede met Graafse follikel die openbarst; zaadcellen (lib_bio) rond een eicel met zona; blastocyste die in de baarmoederwand (klieren, spiraalslagaders) zakt |
| 2 | `baarmoeder()` (s05, s09, s11, s13) | eierstokken als doorsnede met follikels (`o.eierstok = {groei, eis}`); eileiders smal bij de baarmoeder, wijder naar de trechter, franjes naar de eierstok; slijmvlies als lichte laag |
| 3 | s05 pil | zoomcirkel op de eierstok: follikels groeien een stukje en stoppen, 'follikels rijpen niet door · geen eisprong'; kruisjes klein in de hoek |
| 4 | s05 hormoonspiraaltje | slijmprop als netwerk van taaie draden; pessarium verdwijnt als het hormoonspiraaltje komt |
| 5 | s05 koperspiraaltje | koperionen rond de draad, zaadcellen vallen stil; zoomcirkel met baarmoederwand waar een blastocyste niet kan innestelen (rechter methodes verborgen in deze fase) |
| 6 | s05 morning-afterpil | grotere zaadcellen die naar dag 5 vervagen; eisprong als follikel die openbarst en de eicel loslaat |
| 7 | s06 | eerst rasters en oude titel weg, dan 'beschermt ook tegen soa's?'; methodes in één rij met naam |
| 8 | s09, s10, s15 | gonorroe als diplokokken (`gonokok`), chlamydia in een lichaamscel, syfilis als spirocheet; vergrote bacterie met celwand, ribosomen, DNA-lus en plasmide, celwand breekt bij 'doden'; `bacterie()` tekent nu gonokokken |
| 9 | s09 virus | `celRond` met gebogen membraan; drie virussen binden, gaan naar binnen, de cel maakt kopieën die naar buiten knoppen |
| 10 | s09 'onbehandeld' (en littekens in `baarmoeder()` voor s11) | `eileiderDoorsnede`: geplooid slijmvlies met trilharen, ontsteking (rood, gezwollen), littekens die het lumen dichtknijpen, eicel blijft steken; stukje baarmoeder links, eierstok rechts |
| 11 | s09 HPV | Fleur en Ruben (nieuw in het castboek, ± 10 jaar), spuit gaat naar Fleurs bovenarm |
| 12 | s10 | gevoelige gonokokken zwellen op en vallen uiteen; resistente delen zich (`deel`) en vullen het veld weer vanuit hun plek |
| 13 | s11 inseminatie | dun slangetje via vagina en baarmoederhals, label 'dun slangetje', grotere zaadcellen |
| 14 | s13 FSH | twee eierstok-doorsneden: links één doorgroeiende follikel, rechts zes rijpende follikels |
| 15 | s13 punctie | naald via de vagina (echokop) door de vaginawand naar de eierstok; zoomcirkel waarin follikels één voor één leeggezogen worden en de eicel door de naald gaat |
| 16 | s13 ICSI | houdpipet links, injectienaald rechts met één zaadcel, poollichaampje boven; labels naast de onderdelen |
| 17 | s13 donor | Erik (figurant) in plaats van het grijze poppetje; label los van de zaadcellen |
| 18 | s14 | `blastocyste`: platte buitenlaag ('wordt placenta') en binnenste celmassa ('wordt het kind'); cellen gaan uit de buitenlaag tegenover de celmassa, met een gat |

Nieuw in de bibliotheek (`bibliotheek/lib_bio.js`, ook op het testvel, vel 3): `eileiderDoorsnede`, `gonokok`, `chlamydiaCel`, `spirocheet`, `bacterieGroot`, `blastocyste`. Nieuw in het castboek: Fleur en Ruben (± 10 jaar; castboekknop 'Fleur en Ruben'), nog te keuren door Kamiel.

Vragen uit (B9/B11) nagelopen met `?vragen=uit`: q02, q08 en q12 vallen weg, de spreekzin 'Wat denk je?' en het antwoord ('Antwoord bee/cee/aa') worden geknipt (s01 14,4 s, s04 23,3 s, s07 8,5 s, s09 91,7 s, s11 33,9 s, s13 57,6 s); laatste beelden vóór de knip en eerste erna bekeken: geen vraagkaart of antwoordtekst, de vertelling na de vraag leunt er niet op. Scripts `spelerfix`, `antwoordtekst`, `kortantwoord` geven OK.
