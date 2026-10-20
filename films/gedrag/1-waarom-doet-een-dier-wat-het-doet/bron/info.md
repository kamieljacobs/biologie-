# Waarom doet een dier wat het doet? — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/gedrag/1-waarom-doet-een-dier-wat-het-doet.html (audio in films/gedrag/1-waarom-doet-een-dier-wat-het-doet/audio/) |
| Reeks | Gedrag (hoofdstuk `gedrag`: havo eigen pakket Gedrag, vwo H1 + H19 Gedrag en beweging), film 1 van 9 |
| Niveau | havo + vwo; vwo-blok s13 (nabije en uiteindelijke oorzaken, Nobelprijs 1973) |
| Versie / datum | 1.0 · 15 oktober 2026 |
| Stem / model | Roos (ElevenLabs eleven_v4, voice 7qdUFMklKPaaAVMsBTBt), één take per alinea; respellings in `uitspraak_film.json` (zie `uitspraak.md`) |
| Duur | spraak 5:06 (vwo) / 4:31 (havo); speeltijd met kaarten en vragen ± 7 min |
| Beeldstijl | Part C: Macro (cold open: raam, vensterbank, aquarium, postauto), Schema (rest) |
| Personage | Sam (castboek `personages/lib_cast.js`), in H3 (q11 en gapen) |
| Audio-opslag | 10 losse mp3's in audio/ (s01, s04, s06, s07, s09, s10, s12, s13, s14, s15) |
| Herkomst | Hoofdengine (zoals hormonen, voeding, planten), werkmap `hw/gd1`; gebouwd met Claude op verzoek van Kamiel (nieuwe reeks Gedrag) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | Leiden ± 1935: aquarium op de vensterbank, rode postauto rijdt voorbij, mannetje schiet in dreighouding naar de ruit. q02 (antwoord in H1) |
| H1 De sleutelprikkel | s04, q05, s06 | Tinbergen; vorm/vinnen/kleur; echt model zonder rood naast drie ruwe modellen met rode onderkant; staafjes aantal aanvallen; sleutel en slot; prikkel → reactie |
| H2 Aangeboren of aangeleerd? | s07, q08, s09 | Apart opgegroeid mannetje; kaarten aangeboren/aangeleerd; Thorpe: vink in geluiddichte kooi; twee sonogrammen (zonder en met slotroffel); vooruitblik sensitieve periode |
| H3 Vier vragen | s10, q11, s12, s13 (vwo), s14 | Bord oorzaak/ontwikkeling/functie/evolutie ingevuld voor de stekelbaars; Sam: 'om zijn nest te beschermen'; denkwolk doorgestreept; vwo: nabij/uiteindelijk + Nobelprijs (Tinbergen, Lorenz, Von Frisch); Sam gaapt: vier vragen bij mensen |
| Recap | s15 | Vier panelen: postauto, sleutelprikkel, aangeboren + aangeleerd (vink), vier vragen |
| Eindkaart | s16 | drie regels |

## Vragen (allemaal antwoord b)
- q02: waarom naar de ruit? a bang voor de auto · **b reageert op de rode kleur** · c geleerd dat rode auto's gevaarlijk zijn
- q05: welk model het vaakst aangevallen? a echt zonder rood · **b ruwe klodder met rode onderkant** · c allebei even vaak
- q08: vink zonder voorbeeld? a niets · **b simpel, onvolledig liedje** · c het complete lied
- q11: Sams uitspraak? a oorzaak · **b functie** · c de evolutie

## Begrippen
gedrag, prikkel, sleutelprikkel, aangeboren gedrag, aangeleerd gedrag, vier vragen van Tinbergen, nabije en uiteindelijke oorzaken (vwo) — zie `film.json` → glossary.

## Docentdeel
In `sections.html`: 4 checkvragen (zilvermeeuwkuikens, merel en de vier vragen, vinkenzang, vwo: nabij/uiteindelijk), hoe de film het uitlegt, achtergrond en vereenvoudigingen (postauto-anekdote, Thorpe, Mayr, 11-ketotestosteron, gapen), leerdoelen, lessuggesties.

## Waar wat in de HTML zit (films/gedrag/1-waarom-doet-een-dier-wat-het-doet.html)
- regel 69: sitebalk (← Terug naar Gedrag)
- regel 100: checkvragen en docentdeel (uit `sections.html`)
- regel 146: `window.FILMDATA` (segmenten, woordtijden, vragen)
- regel 1250: `persoon()` uit lib_cast.js (Sam)
- regel 1441: `stekelbaars()`; daarna `model()`, `aquarium()`, `nest()`, `postauto()`, `vink()`, `sonogram()`
- regel 1475: `vierBord()` — de vier vragen (VIER = naam, vraag, kleur)
- regel 1483: `const SCENES` (title, s01 … s15)
- regel 1603 e.v.: speler (`buildTimeline`, `vwoCuts`, `antwCuts`, vragen- en snelheidsknop)

## Hoe je de film aanpast
Werkmap opzetten: kopieer `bron/` naar `hw/gd1` (scenes.js uit `src/`, `words/` = `stem/woordtijden/`, `film/1-waarom-doet-een-dier-wat-het-doet/audio/` = `../audio/`), engine = `src/*.js` + `bouw/*`. Dan:
- tekst: `script_v2.md` aanpassen → `python3 engine/make_segments.py gd1 script_v2.md` → alleen gewijzigde alinea's opnieuw inspreken (Roos, eleven_v4, één take) → Scribe (connect_from = de TTS-node) → `engine/align.py` → `python3 film.py` → `engine/build_data.py gd1` → `engine/build.py gd1` → `bash pack.sh gd1 1-waarom-doet-een-dier-wat-het-doet gedrag`.
- beeld: alleen `scenes.js` → `engine/build.py gd1` → pack. Cue-woorden: `q.at('woord', n)` zoekt op deelwoorden ('echt' vindt ook 'echte'), tel de n dus mee.
- uitspraak: `uitspraak_film.json` (von → fon, Frisch → Frisj, Thorpe → Torp).

## Aandachtspunten
- Uitspraakwachtlijst: Tinbergen, Thorpe, Konrad Lorenz, Karl von Frisch, testosteron, slotroffel — nog door Kamiel te beluisteren.
- De postauto-anekdote is historisch (Tinbergen, The Study of Instinct); het exacte jaar is afgerond ('rond 1935').
- Planner en PTA-route: film nog koppelen aan het gedrag-onderdeel als Kamiel dat wil.

## Wijzigingen
- 1.0 (15 okt 2026): eerste versie. Script na één gecombineerde review (zie `reviews/review_v1.md`).

## Wijziging 15 okt 2026

Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen. `label()` tekent geen lijntje en stip meer; de nieuwe `naamBij(ctx, naam, meta, x, y, alpha, align, kleur)` zet de naam (met donkere rand rond de letters) direct naast of op het onderdeel, en `label()` gebruikt de richting ax,ay → lx,ly alleen nog om te bepalen aan welke kant de naam staat (zelfde functies als Celorganellen; ook in `bron/src/lib.js`). De gedragsfilms gebruiken vooral `tag`/`regel`/`chip`; geen scène toont `label()`. Alleen de functie is vervangen; geen andere wijslijnen gevonden. In de gedeelde maag-bypass-tekening (`bypassSchema`, lib_voeding) staan 'alvleesklier' en 'dunne darm' nu met `naamBij` vast naast het orgaan.

## Wijziging 20 okt 2026

- **Slot genuanceerd** (Kamiel: "We weten niet of de vis angst voelt bij een sleutelprikkel of bij aangeleerd gedrag"). Recap s15: "Niet uit angst, en niet omdat hij iets geleerd had. Rood is voor hem een sleutelprikkel, en die zet een aangeboren reactie in gang." → "Of hij daarbij iets voelt, zoals angst, kunnen we niet weten. We zien wel dat rood voor hem een sleutelprikkel is. Die zet een aangeboren reactie in gang, die zonder leren al werkt." Alleen s15 opnieuw ingesproken (Roos, eleven_v4, één take, flow B6T2bDxsChWVXh8fuYNA, node cY498Ql72uBaWsIBexlm, generatie FdQc8OLl0hZftRpONall; 422 credits TTS + Scribe). Cue-woorden (postauto, sleutelprikkel, mix, vier) ongewijzigd; scène s15 niet aangepast. s15 duurt nu 28,9 s (was 25,5 s).
- **Ondertitel antwoordletters**: "Antwoord bee." toont nu "Antwoord B." (s06, s09, s12; alleen de ondertitel, de stem-invoer blijft "bee" via `^B([.,:]?)$` → `bee` in `uitspraak_film.json`).
- Rest van de film goedgekeurd door Kamiel: REVIEW 'ok'.
- Tekstbron: `script_v2.md` (regel Recap). Bouw zoals onder "Hoe je de film aanpast"; werkmap `hw/gd1`.
