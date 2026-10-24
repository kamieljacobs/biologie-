# Slaap — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/zenuwstelsel/7-slaap.html (audio in films/zenuwstelsel/7-slaap/audio/) |
| Reeks | Zenuwstelsel (hoofdstuk `regeling`, op de site 'Regeling'), film 7 |
| Niveau | havo + vwo; één vwo-blok s13 (klokgenen met negatieve terugkoppeling) |
| Versie / datum | 1.0 · 16 oktober 2026 |
| Prompt | onbekend · gemaakt 16 okt |
| Stem / model | Roos (ElevenLabs eleven_v4, voice 7qdUFMklKPaaAVMsBTBt), één take per alinea, flow GG2iFDV7c2CAFOv0JQWU (nodes in `stem/nodes.json`); respellings EEG → E-E-G (Kamiel 16 okt: Nederlandse letternamen, niet Engels), microslaap → mikroslaap; adenosine, melatonine, circadiaans en REM(-slaap) sinds 20 okt in gewone spelling (`uitspraak_film.json`, zie `uitspraak.md`) |
| Duur | spraak 6:59 (vwo) / 6:27 (havo); speeltijd met kaarten en vragen ± 8:04 (vwo) / 7:31 (havo) |
| Beeldstijl | Part C: Schema |
| Personages | Bilal en Sam (cold open, gevolgen), Noor (in bed met EEG, droom) uit het castboek; eigen `slaper()` legt een castpersonage in bed met `ogenDicht()` |
| Audio-opslag | 16 losse mp3's in audio/ (s01, s04, s05, s07–s16, s18–s20) |
| Herkomst | Hoofdengine, werkmap `hw/zs7`; gebouwd met Claude op verzoek van Kamiel (geplande film 'Slaap' in `HOOFDSTUKKEN.regeling.komt`) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | Bilal en Sam gamen op de bank; klok 04:00 → 08:00, raam wordt licht; meter 'hoe lang al wakker'. q02 (antwoord in H2) |
| H1 Een nacht in je hoofd | s04, s05, q06, s07, s08 | Noor in bed met elektroden; EEG wakker/licht/diep (cellen los of tegelijk); REM-spoor, oogbewegingen, droomwolk met hond; hoofdprofiel met hersenstam die de spieren remt; slaapgrafiek van één nacht met 5 cycli |
| H2 Twee systemen | s09, s10, s11, s12, s13 (vwo) | Gebogen membraan met receptoren, adenosine stapelt op, slaapdrukmeter, kringetje negatieve terugkoppeling, cafeïne blokkeert; hoofdprofiel met netvlies, kruising oogzenuwen en klok in de hypothalamus, 24-uurswijzer; pijnappelklier met melatonine en dagcurve (puberteit gestippeld); grafiek slaapdruk en wekker-signaal met 04:00/08:00 en meters (antwoord q02); vwo: klokcel met klokgen, mRNA, klokeiwitten die hun eigen gen remmen |
| H3 Waarom slapen? | s14, s15, s16, q17, s18, s19 | Hippocampus speelt de dag af naar de schors; panelen opruimen (muis), herstel (hypofyse, groeihormoon), afweer (antistoffen); 8–10 uur en kalender 14 × 6 uur; grafiek gevoel versus reactietijd; gevolgen, glazen 0,5 en 1 promille, auto met microslaap |
| Recap | s20 | Vier panelen: slaapcycli, slaapdruk, biologische klok, waarom slapen |
| Eindkaart | s21 | drie regels |

## Vragen
- q02: waarom om 8 uur wakkerder? a stof vanzelf opgeruimd · b daglicht geeft energie · **c tweede systeem geeft een wekker-signaal**
- q06: waarom ren je niet je bed uit? **a hersenstam blokkeert de signalen naar je spieren** · b hersenen staan bijna uit · c spieren te moe
- q17: twee weken 6 uur slaap? a je went eraan · **b je voelt je maar een beetje moe, maar presteert steeds slechter** · c niets als je in het weekend uitslaapt

## Begrippen
EEG, lichte slaap, diepe slaap, REM-slaap, slaapcyclus, slaapdruk, adenosine, cafeïne, biologische klok, circadiaans ritme, melatonine, pijnappelklier, groeihormoon, microslaap, klokgenen (vwo) — zie `film.json` → glossary.

## Docentdeel
In `sections.html`: 5 checkvragen (EEG/stadia, slaapdruk en terugkoppeling, klok bij een blinde, melatonine en schermlicht, vwo: klokgenen), hoe de film het uitlegt, achtergrond met bronnen (Borbély 1982, Czeisler e.a. 1999, Carskadon, Nobelprijs 2017, Xie e.a. 2013 en de discussie daarover, Spiegel e.a. 2002, Prather e.a. 2012/2015, Van Dongen e.a. 2003, Dawson & Reid 1997, Williamson & Feyer 2000, AASM), leerdoelen, lessuggesties.

## Waar wat in de HTML zit (films/zenuwstelsel/7-slaap.html)
- regel 70: sitebalk (← Terug naar Regeling)
- regel 101: checkvragen en docentdeel (uit `sections.html`)
- regel 152: `window.FILMDATA`
- regel 1265: `persoon()` uit lib_cast.js
- regel 1465: `slaper()` (personage in bed); 1490 `eegSpoor()`; 1496 `hypnogram()` (data in `NACHTDATA`); 1513 `adenosine()`; 1517 `kommetje()` (receptor)
- regel 1530: `hoofdZij()` (hoofdprofiel met oog, oogzenuw, klok, pijnappelklier, hypofyse, hersenstam, hippocampus); 1549 `circadiaan()` (wekker-signaal voor de grafiek in s12)
- regel 1554: `klokCel()` (vwo)
- regel 1578: `const SCENES` (title, s01 … s20); 1694 `s13` (vwo-blok)
- regel 1752 e.v.: speler

## Hoe je de film aanpast
Werkmap opzetten: kopieer `bron/` naar `hw/zs7` (scenes.js uit `src/`, `words/` = `stem/woordtijden/`, `film/7-slaap/audio/` = `../audio/`), engine = `src/*.js` + `bouw/*`, `uitspraak_film.json` in de werkmap. Dan:
- tekst: `script_v2.md` aanpassen → `python3 engine/make_segments.py zs7 script_v2.md` → alleen gewijzigde alinea's opnieuw inspreken (Roos, eleven_v4, één take) → Scribe (connect_from = de TTS-node, pas als de TTS klaar is) → `fetch_flow.py` → `engine/align.py` → `python3 film.py` → `engine/build_data.py zs7` → `engine/build.py zs7` → `bash pack.sh zs7 7-slaap zenuwstelsel`.
- beeld: alleen `scenes.js` → `engine/build.py zs7` → pack. Let op deelwoord-cues: in s10 is `licht` 2 (1 = daglicht), in s12 `acht` 3 (1 = nacht, 2 = nachts), in s15 `groei` 2 (1 = groeihormoon), in s04 `anders` 2.

## Aandachtspunten
- Uitspraakwachtlijst: mikroslaap (zie `uitspraak.md`); adenosine, melatonine, circadiaans en REM-slaap zijn goedgekeurd. EEG wordt E-E-G (ook in samenstellingen).
- De grafiek in s12 (slaapdruk en wekker-signaal) is schematisch (tweeprocessenmodel); de meters tonen het verschil slaapdruk − klok.
- Opruimen in de slaap (glymfatisch systeem) is voorzichtig geformuleerd: vooral bij muizen onderzocht en nog in discussie.
- Puberklok en sociale jetlag alleen kort; die horen in de geplande Nieuwsgierig?-film 'Slaap en je biologische klok'.

## Wijzigingen
- 1.0 (16 okt 2026): eerste versie. Script na een kritische eigen review (zie `reviews/review_v1.md`); beeld-QA via contactsheets (zie `checkpoint.html`).
- 1.0.1 (16 okt 2026): EEG → E-E-G (feedback Kamiel); s04 en s05 opnieuw ingesproken (Roos, eleven_v4, 1 take), woordtijden opnieuw uitgelijnd.
- 1.0.2 (16 okt 2026): film 4 heet voortaan 'Knoeien met de synaps'; verwijzing in s09 (tekst, stem-invoer, beeldlabel en docentdeel) aangepast, s09 opnieuw ingesproken (Roos, eleven_v4, 1 take), woordtijden opnieuw uitgelijnd.
- 1.0.3 (20 okt 2026): uitspraak na de uitspraaktest van 18 okt. Stem-invoer adenozinuh → adenosine, melatoninuh → melatonine, sirkadiaans → circadiaans, rem(-slaap/-periodes) → REM(-slaap/-periodes); de regels zijn uit `uitspraak_film.json` gehaald. Alinea's s05, s07, s08, s09, s10, s11, s12 en s20 opnieuw ingesproken (Roos, eleven_v4, 1 take per alinea, flow GG2iFDV7c2CAFOv0JQWU, nodes in `stem/nodes.json`; 3.134 credits TTS + Scribe voor de woordtijden). Alleen de audio en de woordtijden in `window.FILMDATA` (regel 153) zijn vervangen; beeld en speler ongewijzigd. Spraak 7:01 → 6:59 (vwo).
