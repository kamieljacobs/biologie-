# Voorbij dominant en recessief — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/erfelijkheid/3-voorbij-dominant-en-recessief.html (audio in `3-voorbij-dominant-en-recessief/audio/`) |
| Reeks / nummer | Erfelijkheid · film 3 van 6 |
| Doelgroep / niveau | havo + vwo bovenbouw, één niveau (geen vwo-blok: intermediair, onvolledig dominant, multipele allelen en letale factor staan in beide syllabi, M7.1). Hoofdstuk 4 (polygeen) is gemarkeerd als **verdieping** (niet in de syllabus). |
| Versie / datum | 2.0 · 28 okt 2026 (lichte remake; oude versie in `oud/`) |
| Prompt | v13 |
| Voldoet aan | prompt v13 |
| Stem / model | Roos (`7qdUFMklKPaaAVMsBTBt`), ElevenLabs eleven_v4, één take per alinea; flow https://elevenlabs.io/app/flows/K5Sq7KlMGV6DjeL0eEPD |
| Duur | 7:57 met Vragen aan, ± 6:50 met Vragen uit (spraak 401 s) |
| Beeldstijl | Part C: Schema (kruisingsschema's, panelen), Micro (rode bloedcellen, embryo in zoomcirkel), Macro (bloembed, woonkamer van gezin De Wit); geen korrel; minder paars (alleen het chromosoomstuk) |
| Audio-opslag | 24 losse mp3's (loudnorm −16 LUFS / −1 dBTP), woordtijden lokaal met `bouw/silalign.py` |
| Herkomst | script: `remake-2026-10/script_v2.md` (fase 1, keuring Kamiel 28 okt 2026: alle voorstellen T1–T6 en het script goedgekeurd) |

## Opbouw
| Begin | Hoofdstuk | Type · look | Kernbeeld |
|---|---|---|---|
| 0:00 | Cold open | haak · Macro | rode × witte leeuwenbek → roze; 'rood + wit = roze?' als verf |
| 0:16 | Titel | | rood, roze, wit |
| 0:21 | 1 Intermediair | mechanisme · Schema | terugblik film 1 (AA/Aa/aa, één werkend allel genoeg); panelen RR · RW · WW met enzymen en kleurstofmeter (RW = model); haak 'ertussenin'; R/W uitgelegd; kruisingsschema roze × roze → 1 : 2 : 1; misvatting 'allelen mengen' |
| 2:15 | 2 Bloedgroepen | mechanisme · Micro → Schema | drie rode bloedcellen: Iᴬ zet een groene suiker op de keten, Iᴮ een teal suiker, i niets (kale keten = O); bevolking Iᴬ, Iᴮ, i vs. één persoon met twee allelen; A, B, O; AB naast roze bloem → **codominant**; gezin De Wit (moeder A, vader B); Iᴬi × Iᴮi met vakje ii goud, alle vier de bloedgroepen; misvatting 'O is een eigen stof' |
| 4:26 | 3 Een letale factor | raadsel · Schema | gele en grijze muis (G/g), verwacht 3 : 1, geteld 2 : 1; deletie neemt het buurgen mee; embryo stopt in de eerste dagen (blastocyste); vakje GG weg, termkaart letale factor |
| 5:48 | 4 Polygene overerving | model · Schema · verdieping | klas op volgorde van lengte (zes castleerlingen + silhouetten); model 1, 2, 3 genen (3, 5, 7 groepen) en veel genen + milieu (klokvorm); stapels gen 1–3 + milieu |
| 7:00 | Recap | samenvatting · Macro → Schema | roze × roze geeft weer rood en wit; vijf regels |
| 7:48 | Eindkaart | | drie kernzinnen |

(Tijden met Vragen aan; precieze tijden per alinea in `script.md`.)

## Vragen
| Id | Vraag | Opties | Juist |
|---|---|---|---|
| q07 | Je kruist twee roze leeuwenbekken (RW × RW). Wat verwacht je bij de nakomelingen? | alleen roze, want de allelen zijn gemengd · 3 rood : 1 wit · 1 rood : 2 roze : 1 wit | c |
| q15 | Moeder bloedgroep A, vader B: kan hun kind bloedgroep O hebben? | nee, dan moet een van de ouders bloedgroep O hebben · ja, als allebei de ouders ook een i hebben · alleen als een van de ouders AB heeft | b |
| q20 | Twee gele muizen geven 2 : 1 in plaats van 3 : 1. Waar is de rest? | muizen met GG ontwikkelen zich niet · de grijze jongen gaan vaker dood · bij muizen gelden de regels van Mendel niet | a |
| q26 | Geen duidelijke groepen: is lengte dan niet erfelijk? | nee, lengte komt vooral door voeding · ja, elk gen erft los en de effecten tellen op · ja, maar bij lengte mengen de allelen wel | b |

Bij Vragen uit vallen de vraagzinnen weg (s06 houdt 'Je kruist twee roze planten.', s14 houdt 'Een moeder heeft bloedgroep A, de vader bloedgroep B.', s19 valt helemaal weg, s25 houdt 'Bij lengte zie je geen duidelijke groepen.'). De alinea's na een vraag beginnen niet met een kort antwoord (B9). Gecontroleerd 28 okt 2026 met de spelertijdlijn (`?vragen=uit`).

Checkvragen (in het docentdeel): roze × wit; AB-kind en een O-ouder; waarom een gele muis altijd heterozygoot is; intermediair tegenover codominant.

## Begrippen
intermediair (onvolledig dominant) · codominant · multipele allelen · antigeen · letale factor · polygene overerving (verdieping) · normale verdeling. Tekst in `film.py` (`glossary`).

## Docentdeel
`sections.html`: checkvragen, 'Hoe de film het uitlegt', misvattingen, getallen en bronnen, keuzes en vereenvoudigingen (notatie R/W en G/g, O als letter, intermediair = onvolledig dominant, meter = model, suikers niet bij naam, 'grijs' = wildkleur, codominant/polygeen buiten de syllabus), plaats in de reeks, lessuggesties.

## Waar wat zit
Bouwvorm: FILMDATA-straat zoals Chromosomen 2.2. De film-HTML is gebouwd; pas de bronbestanden aan, niet de HTML.
- `script_bouw.md` → `segments.json` (`bouw/make_segments.py`; stem-invoer met `films/uitspraak.json` als `bouw/uitspraak_subs.json` + `uitspraak_film.json`). Hoofdstuk 4 heeft in `segments.json` `"verdieping": true` (meta 'verdieping' rechtsboven; `bouw/build_data.py` geeft de vlag door).
- `film.py` → `film.json`: titel, puzzel, hoofdstukvragen (`minis`), vraagkaarten (`questions`, sleutel = segment-id), begrippen, `alleen: 'havo · vwo'` (geen niveauknop), docentdeel uit `sections.html`.
- `src/teken_erf3.js`: tekeningen. Nieuw: `leeuwenbek` + `_lbBloem` (r. 41–79), `suikerKeten` + `bloedcelAntigeen` (r. 81–99), `muisKleur` (r. 101–107, paletvariant van de muizenpop), `kruisSchema` (r. 110–123), `kleurstofMeter`, `histModel`, `histVeel`, `deletie`; decor `kamer`, `bloembed`, `groeiPlant`, `tagKaart`, `verfKlodder`. Uit film 1 overgenomen: `enzym`, `allelChip` (nu ook met gekleurde rand), `termKaart`, `misvatting`, `kruis`, `vink_`.
- `src/scenes_erf3.js`: één functie per alinea (`s01` r. 62 … `s29` r. 203, `title` r. 59) plus gedeelde beelden `drieKleur`, `schemaRoze`, `vierCellen`, `schemaAB`, `muisSchema`, `klas` (r. 7–57). Cues via `q.on(woord, n, duur)` / `q.at(woord, n)`.
- `src/`: verder de engine (lib.js, lib_cast.js, lib_bio.js, lib_dieren.js, lib_voeding.js, lib_hormonen.js, player.js, page.html, fonts.css, scenes_kop.js = r. 1–32 van de engine-scenes). `bouw/`: build_data.py, build.py, make_segments.py, silalign.py, stills.py, sheet.py, pak.py, cuecheck.py.
- `stem/gen.json` (generation_id, duur, credits per alinea), `stem/sessions.json` (flow, sessie, node), `stem/woordtijden/` (woordtijden per alinea).
- `review_fris/`: contactvellen van de beeldreview (28 okt 2026).
- `remake-2026-10/`: fase 1 (script_v2, storyboard, keyframes, twijfelscènes, samenvatting); `oud/`: versie 1 (HTML, info, script).

## Zo pas je deze film aan
Werkmap buiten de repo, bv. `hw/erf3/w` met alles uit deze bronmap (script_bouw.md, segments.json, film.py, sections.html, uitspraak_film.json, `src/teken_erf3.js`, `src/scenes_erf3.js`, audio als `audio/` en `raw/`, woordtijden als `words/`) en een engine-map (bv. `hw/erf3/eng`) = `src/` + `bouw/` samen. Bouwen: `bash bouw.sh <werkmap> <engine>` (zet `scenes.js` = kop + lib_bio + lib_dieren + teken + scenes, draait film.py, build_data.py, build.py en zet het regeltje 'donker standaard' terug), stills met `bouw/stills.py <werkmap> qa contact`. Daarna in de repo de repo-brede scripts (spelerfix, antwoordtekst, kortantwoord, flipkaarten, teller, licentie_noot, oefenen, reviewlijst).
- Beeld: alleen `scenes_erf3.js`/`teken_erf3.js`. Nooit cuen op één letter of een genotype (q.at zoekt stukjes van woorden, leestekens en ᴬ/ᴮ vallen weg).
- Tekst: die alinea opnieuw inspreken (één take, stem-invoer uit `segments.json` na `make_segments.py`), loudnorm, `silalign.py <werkmap> <id>`.
- Segment-ids in de film wijken af van `remake-2026-10/script_v2.md` (q06→s06, s07→s08 … s25→s29; tabel in `uitspraak.md`).

## Beeldreview (frisse ronde, 28 okt 2026)
Contactvellen per hoofdstuk (`review_fris/1–5`, `kaarten`, `fix1`, `fix2`), één ronde. Let op: gedaan door de maker zelf, niet door een aparte reviewer (er was geen tweede agent beschikbaar).
- **MOET, hersteld:** eindkaart liep buiten beeld (ingekort) · titelbloemen over de titel · s11 gaf Noor ongemerkt een bloedgroep (nu een kaart 'één persoon · twee allelen' zonder personage) · s21 deletie was onleesbaar (nieuwe tekening `deletie`, labels los van elkaar) · s18/s19 muizen overlapten · s16 tags over de schemakoppen · s10 label over de schaaltekst · s12 cel A verscheen pas na de zin · s04 RW-paneel leeg bij 'niet genoeg' · s01 roze planten kwamen te laat, verfkaart onduidelijk · s09 allelchips over elkaar.
- **KAN, open:** de leeuwenbekjes in de vakjes van het kruisingsschema zijn klein (leest als 'plant met roze bloemetjes'); leiderlijnen van de zoomcirkel in s21 lopen lang over het beeld; silhouetten in de klas staan dicht op elkaar (bewust: menigte); de iconen in de samenvattingsrijen (s29) zijn klein.
- Vragen uit: geen vraagtekst of antwoord in beeld of geluid; s19 heeft dan duur 0 (hele alinea is de vraag).

## Kandidaten voor de bibliotheek
`leeuwenbek` (+ `_lbBloem`, `groeiPlant`), `suikerKeten` + `bloedcelAntigeen` (rode bloedcel met A/B/AB/O-ketens; O = kale keten), `muisKleur` (palet geel/grijs voor de muizenpop; beter: een `PAL`-optie in `muis()` zelf), `kruisSchema` (2×2 met gameten links en boven, vakje weg, goud kader), `histModel`/`histVeel`, `deletie`.

## Aandachtspunten
- Gezin De Wit heeft nu bloedgroepen: moeder (Marieke) A, vader (Dennis) B, in de uitleg Iᴬi en Iᴮi; de kinderen krijgen geen bloedgroep in beeld (keuring T3).
- De zes castleerlingen staan in s23 op volgorde van lengte (Yasmin 1,63 · Noor 1,68 · Daan 1,72 · Lotte 1,75 · Sam 1,79 · Bilal 1,86 m).
- Uitspraak: wachtlijst in `uitspraak.md` (R W, grote G kleine g, bloedgroep O, codominant, intermediair …).

## Wijzigingen
- 28 okt 2026 — Versie 2.0: lichte remake volgens prompt v13 (fase 1 + keuring Kamiel). Nieuw script (codominant expliciet gesproken en groot in beeld, O-cel met kale suikerketen, deletie bij de gele muis, vier vraagkaarten met drie opties), nieuwe stem (eleven_v4, 24 takes, 5477 credits), FILMDATA-straat met speler (snelheid, Vragen aan/uit), één niveau havo + vwo, bronnenlogboek. Kamiels opmerkingen k1–k8 verwerkt (zie `remake-2026-10/samenvatting.md`). Oude film in `oud/`.
