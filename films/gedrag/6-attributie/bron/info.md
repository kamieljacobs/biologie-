# Wiens schuld is het? Interne en externe attributie — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/gedrag/6-attributie.html (audio in films/gedrag/6-attributie/audio/) |
| Reeks | Gedrag (hoofdstuk `gedrag`: havo eigen pakket Gedrag, vwo H1 + H19), film 6 van 12 |
| Niveau | havo + vwo; vwo-blok s09 (actor-observer-effect, meta-analyse) |
| Versie / datum | 1.1 · 25 oktober 2026 |
| Prompt | onbekend · gemaakt 15 okt |
| Stem / model | Roos (ElevenLabs eleven_v4, voice 7qdUFMklKPaaAVMsBTBt), één take per alinea, flow jo9SUZEeggaQUQWumcqN; respelling Weiner → Wainer; Jones sinds 20 okt in gewone spelling (zie `uitspraak.md`) |
| Duur | spraak 4:17 (vwo) / 3:49 (havo); speeltijd met kaarten en vragen ± 5,5 min |
| Beeldstijl | Part C: Schema |
| Personages | Noor en Sam (castboek) |
| Audio-opslag | 7 losse mp3's in audio/ (s01, s04, s05, s06, s08, s09, s10) |
| Herkomst | Hoofdengine, werkmap `hw/gd6`; gebouwd met Claude op verzoek van Kamiel (interne en externe attributie) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | Noor met een toets met een 4; drie gedachtewolken. q02 (antwoord in H2) |
| H1 Binnen of buiten | s04 | Kolommen intern/extern met voorbeelden; drie schuifjes van Weiner; Noors drie gedachten met schuifstand |
| H2 Wat je denkt, bepaalt wat je doet | s05 | Twee routes (machteloos → minder moeite; andere aanpak → hoop); 'geen trucje'; 10 → ik, 4 → de toets; zelfdienende vertekening |
| H3 En de ander? | s06, q07, s08, s09 (vwo) | Sam groet niet terug; Noors gedachte + alternatieven; opzet Jones & Harris (2×2); echte gemiddelden als stippen; weegschaal karakter/situatie; fundamentele attributiefout; vwo: verwacht vs gevonden effect |
| Recap | s10 | Vier panelen: drie vragen, invloed geeft hoop, zelfdienende vertekening, fundamentele attributiefout |
| Eindkaart | s11 | drie regels |

## Vragen (allemaal antwoord b)
- q02: welke gedachte helpt Noor? a slecht in biologie · **b verkeerde manier geleerd** · c toets oneerlijk
- q07: mening van de (opgelegde) pro-Castro-schrijver? a geen mening · **b waarschijnlijk een beetje voor** · c tegen

## Begrippen
attributie, intern/extern, blijvend/tijdelijk, beheersbaar, zelfdienende vertekening, fundamentele attributiefout, actor-observer-effect (vwo) — zie `film.json` → glossary.

## Docentdeel
In `sections.html`: 4 checkvragen (rijexamen indelen, twee leerlingen en motivatie, Jones & Harris, vwo: meta-analyse), hoe de film het uitlegt, achtergrond (Heider, Weiner, attributietraining, growth mindset, Dunlosky, Mezulis, Jones & Harris met echte cijfers, Ross, cultuur, Malle 2006), leerdoelen, lessuggesties.

## Waar wat in de HTML zit (films/gedrag/6-attributie.html)
- regel 69: sitebalk (← Terug naar Gedrag)
- regel 100: checkvragen en docentdeel (uit `sections.html`)
- regel 147: `window.FILMDATA`
- regel 1251: `persoon()` uit lib_cast.js (Noor, Sam)
- regel 1437: `wolk()` (gedachtewolk); `toets()` (blad met cijfer)
- regel 1443: `VRAGEN` en `schuifjes()` (drie vragen van Weiner)
- regel 1450: `const SCENES` (title, s01 … s10)
- regel 1545 e.v.: speler

## Hoe je de film aanpast
Werkmap opzetten: kopieer `bron/` naar `hw/gd6` (scenes.js uit `src/`, `words/` = `stem/woordtijden/`, `film/6-attributie/audio/` = `../audio/`), engine = `src/*.js` + `bouw/*`. Dan:
- tekst: `script_v2.md` aanpassen → `python3 engine/make_segments.py gd6 script_v2.md` → alleen gewijzigde alinea's opnieuw inspreken (Roos, eleven_v4, één take) → Scribe (connect_from = de TTS-node) → `engine/align.py` → `python3 film.py` → `engine/build_data.py gd6` → `engine/build.py gd6` → `bash pack.sh gd6 6-attributie gedrag`.
- beeld: alleen `scenes.js` → `engine/build.py gd6` → pack. Let op: 'Wat' vindt ook 'wat' (hoofdletterongevoelig).

## Aandachtspunten
- Uitspraakwachtlijst: Weiner (Wainer), Harris, Fidel Castro, self-serving bias, actor-observer-effect.
- Term 'zelfdienende vertekening' gekozen; controleer of de methode (Nectar / Biologie voor jou) een andere term gebruikt.

## Wijzigingen
- 1.0 (15 okt 2026): eerste versie. Script na één gecombineerde review (zie `reviews/review_v1.md`).

## Wijziging 15 okt 2026

Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen. `label()` tekent geen lijntje en stip meer; de nieuwe `naamBij(ctx, naam, meta, x, y, alpha, align, kleur)` zet de naam (met donkere rand rond de letters) direct naast of op het onderdeel, en `label()` gebruikt de richting ax,ay → lx,ly alleen nog om te bepalen aan welke kant de naam staat (zelfde functies als Celorganellen; ook in `bron/src/lib.js`). De gedragsfilms gebruiken vooral `tag`/`regel`/`chip`; geen scène toont `label()`. Alleen de functie is vervangen; geen andere wijslijnen gevonden. In de gedeelde maag-bypass-tekening (`bypassSchema`, lib_voeding) staan 'alvleesklier' en 'dunne darm' nu met `naamBij` vast naast het orgaan.

## Wijziging 20 okt 2026

Uitspraak na de uitspraaktest van 18 okt: stem-invoer Djoons → Jones (gewone spelling), regel uit `uitspraak_film.json` gehaald. Alinea's s06 en s09 opnieuw ingesproken (Roos, eleven_v4, 1 take per alinea, flow jo9SUZEeggaQUQWumcqN; 1.058 credits TTS + Scribe voor de woordtijden). Alleen de mp3's in `audio/` en de woordtijden van die alinea's in `window.FILMDATA` zijn vervangen; beeld, speler en de rest van de film ongewijzigd. Duur vrijwel gelijk.

## Wijziging 20 okt 2026

- **Ondertitel B in plaats van 'bee'** (Kamiel: "wie kiest voor 'bee'" moet "B" zijn). In `script_v2.md`: "Antwoord bee, dus." → "Antwoord B, dus." (s05), "niet voor bee." → "niet voor B." (s05), "Antwoord bee." → "Antwoord B." (s08). De stem-invoer blijft "bee" via de film-eigen regel `^B([.,:]?)$` → `bee` in `uitspraak_film.json`; de audio is ongewijzigd, alleen de woordtekst in `stem/woordtijden/s05.json` en `s08.json` is aangepast (tijden gelijk). Andere opties: in deze film komen geen gesproken 'aa'/'cee' voor; de vraagkaarten tonen a/b/c al als letters.
- Nog open (niet in deze ronde): "Jones" staat in `hw/herinspreken.json` als goedgekeurd in gewone spelling (was Djoons, s06 en s09); niet opnieuw ingesproken, want de opdracht was alleen tekst.
- Kamiel keurde de film goed: REVIEW 'ok'.

## Wijziging 25 okt 2026

Uitspraaktest 25 okt: alinea s06 (Jones) opnieuw ingesproken, zelfde invoer (gewone spelling), 1 take, 657 credits; alleen mp3 `audio/s06.mp3` en de woordtijden/dur van s06 in `window.FILMDATA` vervangen (dur 42,93 -> 43,89 s; film ~1 s langer). Regel Jones -> Djoons uit `bron/uitspraak_film.json` gehaald. Versie 1.1.
