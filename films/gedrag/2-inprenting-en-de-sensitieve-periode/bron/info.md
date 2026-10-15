# Inprenting en de sensitieve periode — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/gedrag/2-inprenting-en-de-sensitieve-periode.html (audio in films/gedrag/2-inprenting-en-de-sensitieve-periode/audio/) |
| Reeks | Gedrag (hoofdstuk `gedrag`: havo eigen pakket Gedrag, vwo H1 + H19), film 2 van 9 |
| Niveau | havo + vwo; vwo-blok s08 (seksuele inprenting) |
| Versie / datum | 1.0 · 15 oktober 2026 |
| Stem / model | Roos (ElevenLabs eleven_v4, voice 7qdUFMklKPaaAVMsBTBt), één take per alinea, flow NWp5ePZDOxhRnEe7gm4G; respellings in `uitspraak_film.json` + 'er'/'el' met de hand in s09 (zie `uitspraak.md`) |
| Duur | spraak 4:45 (vwo) / 4:23 (havo); speeltijd met kaarten en vragen ± 6 min |
| Beeldstijl | Part C: Macro (cold open: weide met vijver), Schema (rest) |
| Personages | Noor (castboek) in H2; Lorenz als eenvoudige eigen figuur `man()` (geen castpersonage) |
| Audio-opslag | 8 losse mp3's in audio/ (s01, s04, s05, s07, s08, s09, s11, s12) |
| Herkomst | Hoofdengine, werkmap `hw/gd2`; gebouwd met Claude op verzoek van Kamiel (reeks Gedrag) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | Weide, man loopt met zeven gansjes in een rij, ook de vijver in; echte moeder verderop. q02 (antwoord in H1) |
| H1 Inprenting | s04, s05, q06, s07, s08 (vwo) | Eierproef van Lorenz (eieren splitsen, moedergans / broedmachine, kist, elk kuiken naar zijn 'moeder', ringetjes teal/goud); kenmerken van inprenting; grafiek van Hess met nep-eend; tijdvenster = sensitieve periode; vink; functie (moedergans met kuikens); kaarten oorzaak/ontwikkeling/functie. Vwo: zebravink bij meeuwtjes, baltst later naar een meeuwtje |
| H2 Mensen | s09, q10, s11 | Noor + foto als peuter met pleister; ogen → hersenen (dikte = gebruik), afplakken; grafiek 'afplakken helpt' tegen leeftijd; Japanse baby's 6 en 12 maanden, ra/la; deur die langzaam dichtgaat; uitspraak leren tegen beginleeftijd |
| Recap | s12 | Vier panelen: gansjes volgen Lorenz, inprenting, sensitieve periode, ook bij mensen |
| Eindkaart | s13 | drie regels |

## Vragen (allemaal antwoord b)
- q02: waarom volgen ze hem? a hij geeft eten · **b eerste bewegende wezen na het uitkomen** · c ganzen herkennen hun moeder niet
- q06: eendje na twee dagen? a volgt alsnog · **b volgt nauwelijks, vlucht eerder** · c wacht op echte moeder
- q10: wie hoort ra/la? a geen van beide · **b vooral de baby van zes maanden** · c vooral de baby van een jaar

## Begrippen
inprenting, sensitieve periode, lui oog, seksuele inprenting (vwo) — zie `film.json` → glossary.

## Docentdeel
In `sections.html`: 4 checkvragen (eendjes en een bal, proef van Hess, lui oog, vwo: kruisopvoeding), hoe de film het uitlegt, achtergrond (Lorenz 1935, Hess, omkeerbaarheid, Immelmann, amblyopie/Hubel en Wiesel, Kuhl 2006, hechting bewust weggelaten), leerdoelen, lessuggesties.

## Waar wat in de HTML zit (films/gedrag/2-inprenting-en-de-sensitieve-periode.html)
- regel 69: sitebalk (← Terug naar Gedrag)
- regel 100: checkvragen en docentdeel (uit `sections.html`)
- regel 147: `window.FILMDATA` (segmenten, woordtijden, vragen)
- regel 1251: `persoon()` uit lib_cast.js (Noor)
- regel 1444: `gans()`, daarna `kuiken()`, `ei()`, `man()` (Lorenz), `broedmachine()`, `kist()`
- regel 1472: `hessGrafiek()` (curve `HESS(u)`, venster 4–30 uur); daarna `zebravink()`, `meeuwtje()`, `hartje()`
- regel 1496: `oogSchema()` (dikte van de lijn = hoeveel de hersenen het oog gebruiken), `baby()`, `klank()`, `deur()`, `rij()`
- regel 1514: `const SCENES` (title, s01 … s12)
- regel 1639 e.v.: speler

## Hoe je de film aanpast
Werkmap opzetten: kopieer `bron/` naar `hw/gd2` (scenes.js uit `src/`, `words/` = `stem/woordtijden/`, `film/2-inprenting-en-de-sensitieve-periode/audio/` = `../audio/`), engine = `src/*.js` + `bouw/*`. Dan:
- tekst: `script_v2.md` aanpassen → `python3 engine/make_segments.py gd2 script_v2.md` (let op: in s09 staat in `segments.json` → voice 'een er en een el', met de hand) → alleen gewijzigde alinea's opnieuw inspreken (Roos, eleven_v4, één take) → Scribe (connect_from = de TTS-node) → `engine/align.py` → `python3 film.py` → `engine/build_data.py gd2` → `engine/build.py gd2` → `bash pack.sh gd2 2-inprenting-en-de-sensitieve-periode gedrag`.
- beeld: alleen `scenes.js` → `engine/build.py gd2` → pack. Cue-woorden zoeken op deelwoorden ('la' vindt ook 'plakte'); daarom staan ra/la in s09 op tijd na `q.at('klanken', 2)`.

## Aandachtspunten
- Uitspraakwachtlijst: ra/la (raa/laa), r en l (er/el), Konrad Lorenz, Japanse meeuwtje, zebravinkvrouwtjes.
- Hechting (Bowlby, Harlow) bewust weggelaten; mogelijk later in 'Beroemde psychologie-experimenten'.

## Wijzigingen
- 1.0 (15 okt 2026): eerste versie. Script na één gecombineerde review (zie `reviews/review_v1.md`).

## Wijziging 15 okt 2026

Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen. `label()` tekent geen lijntje en stip meer; de nieuwe `naamBij(ctx, naam, meta, x, y, alpha, align, kleur)` zet de naam (met donkere rand rond de letters) direct naast of op het onderdeel, en `label()` gebruikt de richting ax,ay → lx,ly alleen nog om te bepalen aan welke kant de naam staat (zelfde functies als Celorganellen; ook in `bron/src/lib.js`). De gedragsfilms gebruiken vooral `tag`/`regel`/`chip`; geen scène toont `label()`. Alleen de functie is vervangen; geen andere wijslijnen gevonden. In de gedeelde maag-bypass-tekening (`bypassSchema`, lib_voeding) staan 'alvleesklier' en 'dunne darm' nu met `naamBij` vast naast het orgaan.
