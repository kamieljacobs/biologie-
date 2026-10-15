# Beroemde psychologie-experimenten — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/gedrag/12-psychologie-experimenten.html (audio in films/gedrag/12-psychologie-experimenten/audio/) |
| Reeks | Gedrag (hoofdstuk `gedrag`: havo eigen pakket Gedrag, vwo H1 + H19), film 12 van 12 |
| Niveau | havo + vwo; vwo-blok s09 (replicatiecrisis, preregistratie, Stanford-gevangenisexperiment) |
| Versie / datum | 1.0 · 15 oktober 2026 |
| Stem / model | Roos (ElevenLabs eleven_v4, voice 7qdUFMklKPaaAVMsBTBt), één take per alinea, flow Am6McEzRhNurMuADVv5K; respellings Asch → Esj, Solomon → Solomen, Mischel → Misjél, Stanford → Stenford, pre-registratie, replicatie-crisis (zie `uitspraak.md`) |
| Duur | spraak 5:37 (vwo) / 4:51 (havo); speeltijd met kaarten en vragen ± 6,5 min |
| Beeldstijl | Part C: Schema |
| Personages | Yasmin (castboek); overige figuren generiek (`figuur()`) |
| Audio-opslag | 7 losse mp3's in audio/ (s01, s04, s05, s06, s08, s09, s10) |
| Herkomst | Hoofdengine, werkmap `hw/gd12`; gebouwd met Claude op verzoek van Kamiel (geplande film 'Beroemde psychologie-experimenten') |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | Lijnenkaart A/B/C; zes meespelers zeggen 'A'; Yasmin twijfelt; 12 keer. q02 (antwoord in H1) |
| H1 Mee met de groep | s04 | Balk 1 op 3; 15 van 20 minstens één keer; twee derde goed; één bondgenoot (1 op 20); opschrijven; herhalingen kleiner/groter |
| H2 Gehoorzaam | s05 | Leraar, onderzoeker, leerling achter wand; schakelpaneel tot 450 V; 26 van 40; archief van Milgram (Perry); telefoonvariant 8 van 40; herhaling 2009 tot 150 V (~70%); ethische regels |
| H3 Wachten op een snoepje | s06, q07, s08, s09 (vwo) | Kind met marshmallow en klok; schoolgrafiek; kleine groepen; 2018: ~900 kinderen, lijn wordt vlak; gebroken belofte (lege doos); 3 vs 12 minuten; 'herhalen!'-stempels; vwo: 100 studies (36 groen), oorzaken, preregistratie, Stanford-archief |
| Recap | s10 | Vier panelen: Asch, Milgram, marshmallowtest, 'herhaald?' |
| Eindkaart | s11 | drie regels |

## Vragen (allemaal antwoord b)
- q02: hoe vaak gingen proefpersonen mee? a bijna nooit · **b ongeveer een op de drie keer** · c bijna altijd
- q07: kinderen na een gebroken belofte? a even lang · **b veel korter** · c juist langer

## Begrippen
conformisme, gehoorzaamheid, uitstel van beloning, replicatie, ethiek van onderzoek, replicatiecrisis (vwo), preregistratie (vwo) — zie `film.json` → glossary.

## Docentdeel
In `sections.html`: 4 checkvragen (conformisme, Milgram en ethiek, marshmallowtest, vwo: replicatie), hoe de film het uitlegt, achtergrond met bronnen (Asch 1951/1956, Perrin & Spencer 1980, Bond & Smith 1996, Milgram 1963, Perry 2012, Burger 2009, Watts e.a. 2018, Kidd e.a. 2013, Open Science Collaboration 2015, Le Texier), leerdoelen, lessuggesties.

## Waar wat in de HTML zit (films/gedrag/12-psychologie-experimenten.html)
- regel 69: sitebalk (← Terug naar Gedrag)
- regel 100: checkvragen en docentdeel (uit `sections.html`)
- regel 146: `window.FILMDATA`
- regel 1250: `persoon()` uit lib_cast.js (Yasmin)
- regel 1443: `figuur()` (generiek personage); 1447 `lijnenKaart()`; 1450 `stippen()`; 1451 `balk()`; 1452 `schakelaars()`
- regel 1454: `bord()` (marshmallows); 1456 `stempel()`
- regel 1462: `const SCENES` (title, s01 … s10)
- regel 1549 e.v.: speler

## Hoe je de film aanpast
Werkmap opzetten: kopieer `bron/` naar `hw/gd12` (scenes.js uit `src/`, `words/` = `stem/woordtijden/`, `film/12-psychologie-experimenten/audio/` = `../audio/`), engine = `src/*.js` + `bouw/*`. Dan:
- tekst: `script_v2.md` aanpassen → `python3 engine/make_segments.py gd12 script_v2.md` → alleen gewijzigde alinea's opnieuw inspreken (Roos, eleven_v4, één take) → Scribe (connect_from = de TTS-node) → `engine/align.py` → `python3 film.py` → `engine/build_data.py gd12` → `engine/build.py gd12` → `bash pack.sh gd12 12-psychologie-experimenten gedrag`.
- beeld: alleen `scenes.js` → `engine/build.py gd12` → pack. Let op: 'honderd' komt in s09 ook voor in 'driehonderd' (daarom n = 2).

## Aandachtspunten
- Uitspraakwachtlijst: Asch (Esj), Mischel (Misjél), Stanford (Stenford), Solomon, Gina Perry, marshmallow, 450 volt.
- De stippen en balken zijn afgerond (bv. 15 van 20 voor 'driekwart'); de echte getallen staan in het docentdeel.
- Onderwerp met ethische lading (Milgram): in de film zakelijk gehouden, met de huidige regels erbij.

## Wijzigingen
- 1.0 (15 okt 2026): eerste versie. Script na één gecombineerde review (zie `reviews/review_v1.md`).
