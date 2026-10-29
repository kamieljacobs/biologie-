# Slaap — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/zenuwstelsel/7-slaap.html (audio in films/zenuwstelsel/7-slaap/audio/) |
| Reeks | Zenuwstelsel (hoofdstuk `regeling`, op de site 'Regeling'), film 7 |
| Niveau | havo + vwo; één vwo-blok s13 (klokgenen met negatieve terugkoppeling) |
| Versie / datum | **1.2 · 29 oktober 2026** — regeling, keuzes Kamiel: namen uit de stem (s01, s12, s19 opnieuw ingesproken), 'vooral opgeruimd' in s12, kleuren gelijkgetrokken (oude versie in `bron/oud/7-slaap-v1.1.html`, `oud/scenes-v1.1.js`, `oud/audio-v1.1/`); 1.1 · 28 oktober 2026 — opwaardering naar prompt v13 (B14) (`bron/oud/7-slaap-v1.0.3.html`); 1.0 · 16 oktober 2026 |
| Prompt | v13 |
| Voldoet aan | prompt v13 (28 okt 2026, zonder keuring). Sinds 1.2 (29 okt 2026) geen namen meer in de stem en REM-slaap in koraal (keuzes Kamiel). Bewust niet: het hoofd met hersenen blijft een losse doorsnede zonder castpersonage ernaast (geen nieuwe scène-aanpak zonder keuring); geen nieuwe caststijl met contourlijnen (nog niet goedgekeurd) |
| Stem / model | Roos (ElevenLabs eleven_v4, voice 7qdUFMklKPaaAVMsBTBt), één take per alinea, flow GG2iFDV7c2CAFOv0JQWU (nodes in `stem/nodes.json`); respellings EEG → E-E-G (Kamiel 16 okt: Nederlandse letternamen, niet Engels), microslaap → mikroslaap; adenosine, melatonine, circadiaans en REM(-slaap) sinds 20 okt in gewone spelling (`uitspraak_film.json`, zie `uitspraak.md`) |
| Duur | spraak 6:58 (vwo) / 6:26 (havo) sinds 1.2; speeltijd met kaarten en vragen ± 8:04 (vwo) / 7:31 (havo) |
| Beeldstijl | Part C: Schema; sinds 1.1 bibliotheekobjecten: `hoofdHersenen`, `membraanBoog`, `membraanReceptor`, `mrnaSliert` (uittreksel uit `bibliotheek/lib_bio.js` in `src/lib_bio_uittreksel.js`) en `hond`, `muis` (uittreksel uit `bibliotheek/dieren/lib_dieren.js` in `src/lib_dieren_uittreksel.js`) |
| Personages | twee vrienden (castboek-id's `bilal` en `sam`; cold open, gevolgen), Noor (castboek-id `noor`; in bed met EEG, droom), sinds 1.1 met de actuele `personages/lib_cast.js` (zijaanzicht en rennen); namen niet in beeld en sinds 1.2 ook niet in de stem; eigen `slaper()` legt een castpersonage in bed met `ogenDicht()` |
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

## Waar wat in de HTML zit (films/zenuwstelsel/7-slaap.html, versie 1.1)
- regel 74: sitebalk (← Terug naar Regeling)
- regel 105: checkvragen en docentdeel (uit `sections.html`)
- regel 156: `window.FILMDATA`
- regel 1210: `persoon()` uit lib_cast.js (actuele versie, 28 okt 2026)
- regel 2021: blok `/*BIBLIOTHEEK-UITTREKSEL*/` (lib_bio- en dierenuittreksel)
- regel 4424: `slaper()` (personage in bed); 4449 `eegSpoor()`; 4455 `hypnogram()` (data in `NACHTDATA`); 4472 `adenosine()`; 4479 `kommetje()` (receptor = `membraanReceptor`) en `boogMembraan()` (= `membraanBoog`)
- regel 4500: `hoofdZij()` (= `hoofdHersenen` + lagen van deze film: klok/SCN, oog met netvlies, oogzenuw en kruising, pijnappelklier, hersenstam, hippocampus, schors; ankers in `HZP`); 4517 `circadiaan()`
- regel 4522: `klokCel()` (vwo; DNA grijs, mRNA = `mrnaSliert`)
- regel 4548: `const SCENES` (title, s01 … s20); 4664 `s13` (vwo-blok)
- regel 4720 e.v.: speler

## Hoe je de film aanpast
- Sinds 1.1 (snelste weg, zonder de film opnieuw te bouwen): `src/scenes.js` aanpassen en `python3 bouw/inbouw.py ../../7-slaap.html src/scenes.js "// Zenuwstelsel 7 · Slaap — scènes" src/lib_bio_uittreksel.js src/lib_dieren_uittreksel.js` (vanuit `bron/`). Speler, audio, woordtijden en alle naverwerking blijven staan. Een ander bibliotheekobject nodig: `node bouw/uittreksel.js <bibliotheek> src/<uit>.js <namen> src/lib.js src/lib_voeding.js src/lib_hormonen.js src/lib_cast.js` (vereist het npm-pakket acorn) en het uittreksel meegeven aan inbouw.py. Let op: namen in scenes.js mogen niet botsen met de bibliotheek (daarom heet de grafieklijn `grafLijn`).
Werkmap opzetten: kopieer `bron/` naar `hw/zs7` (scenes.js uit `src/`, `words/` = `stem/woordtijden/`, `film/7-slaap/audio/` = `../audio/`), engine = `src/*.js` + `bouw/*`, `uitspraak_film.json` in de werkmap. Dan:
- tekst: `script_v2.md` aanpassen → `python3 engine/make_segments.py zs7 script_v2.md` → alleen gewijzigde alinea's opnieuw inspreken (Roos, eleven_v4, één take) → Scribe (connect_from = de TTS-node, pas als de TTS klaar is) → `fetch_flow.py` → `engine/align.py` → `python3 film.py` → `engine/build_data.py zs7` → `engine/build.py zs7` → `bash pack.sh zs7 7-slaap zenuwstelsel`.
- beeld: alleen `scenes.js` → `engine/build.py zs7` → pack. Let op deelwoord-cues: in s10 is `licht` 2 (1 = daglicht), in s12 `acht` 3 (1 = nacht, 2 = nachts), in s15 `groei` 2 (1 = groeihormoon), in s04 `anders` 2.

## Aandachtspunten
- Uitspraakwachtlijst: mikroslaap (zie `uitspraak.md`); adenosine, melatonine, circadiaans en REM-slaap zijn goedgekeurd. EEG wordt E-E-G (ook in samenstellingen).
- De grafiek in s12 (slaapdruk en wekker-signaal) is schematisch (tweeprocessenmodel); de meters tonen het verschil slaapdruk − klok.
- Opruimen in de slaap (glymfatisch systeem) is voorzichtig geformuleerd: vooral bij muizen onderzocht en nog in discussie.
- Puberklok en sociale jetlag alleen kort; die horen in de geplande Nieuwsgierig?-film 'Slaap en je biologische klok'.

## Wijzigingen
- 1.2 (29 okt 2026) — regeling, keuzes Kamiel op het keuzeblad 'Regeling' (`films/UITVOEREN-REGELING.md`). Speler, datum, vragen en de overige stem blijven.
  - s01: 'Bilal en Sam … Sam gaapt, en Bilal valt bijna in slaap met zijn controller' → 'Twee vrienden … De een gaapt, de ander valt bijna in slaap met de controller'. Opnieuw ingesproken (Roos, eleven_v4, 1 take, 320 credits).
  - s12: 'Terug naar Bilal en Sam.' → 'Terug naar de twee vrienden.'; 'Die wordt alleen opgeruimd' → 'Die wordt vooral opgeruimd als je slaapt' (bronnenlogboek bewering 18; ook in `oefenen.json`). Opnieuw ingesproken (470 credits). Cue van de kop 'wakker vanaf 08:00' nu op 'vrienden'.
  - s19: 'Bilal en Sam zaten' → 'De twee vrienden zaten'. Opnieuw ingesproken (411 credits). Cue van het blok '24 uur wakker' nu op 'vrienden'.
  - Stem: flow UaHCv2azK4E5fdqZAdJ1 (nodes in `stem/gen.json`, `stem/takes.json`), stem-invoer letterlijk in `stem/invoer-2026-10-29.json` (regels uit `films/uitspraak.json` + `uitspraak_film.json`: microslaap → mikroslaap). Woordtijden lokaal met `silalign.py` (geen Scribe); alleen audio, woorden en duur van deze drie alinea's in `window.FILMDATA` vervangen. Totaal 1.201 credits.
  - Kleuren volgens de tabel Zenuwstelsel/Hormonen (`src/scenes.js` regel 15–17): slaapstadia wakker goud / lichte slaap licht teal #9CCBE3 / diepe slaap teal / REM koraal (was paars; raakt s04, s05 (REM-spoor, oogpijlen, afkorting), s07, s08, s20); melatonine paars #8C7BBF (was lavendel #B6A6E6; s11, s20), naam 'pijnappelklier' iets lichter voor contrast op de hersenen; groeihormoon paars (was goud molecuul en oker tekst, s15 paneel 'herstel').
  - Ingebouwd met `bouw/inbouw.py`; nieuwe stills bekeken, Vragen uit gecontroleerd (knip q02 bij 18,32 s en 'Antwoord cee.' in s12 tot 1,72 s vallen in stilte).
- 29 okt 2026 — nacontrole 29 okt: s11 de melatonine komt nu zichtbaar uit de pijnappelklier (pulserende gloed om de klier, moleculen ontstaan daar en zakken achter de hersenstam naar beneden), niet meer vanaf hypothalamus/hypofyse; molecuul kleiner getekend (schaal 0,75). Alleen `s11` in `src/scenes.js`, ingebouwd met `bouw/inbouw.py`.
- 1.0 (16 okt 2026): eerste versie. Script na een kritische eigen review (zie `reviews/review_v1.md`); beeld-QA via contactsheets (zie `checkpoint.html`).
- 1.0.1 (16 okt 2026): EEG → E-E-G (feedback Kamiel); s04 en s05 opnieuw ingesproken (Roos, eleven_v4, 1 take), woordtijden opnieuw uitgelijnd.
- 1.0.2 (16 okt 2026): film 4 heet voortaan 'Knoeien met de synaps'; verwijzing in s09 (tekst, stem-invoer, beeldlabel en docentdeel) aangepast, s09 opnieuw ingesproken (Roos, eleven_v4, 1 take), woordtijden opnieuw uitgelijnd.
- 1.0.3 (20 okt 2026): uitspraak na de uitspraaktest van 18 okt. Stem-invoer adenozinuh → adenosine, melatoninuh → melatonine, sirkadiaans → circadiaans, rem(-slaap/-periodes) → REM(-slaap/-periodes); de regels zijn uit `uitspraak_film.json` gehaald. Alinea's s05, s07, s08, s09, s10, s11, s12 en s20 opnieuw ingesproken (Roos, eleven_v4, 1 take per alinea, flow GG2iFDV7c2CAFOv0JQWU, nodes in `stem/nodes.json`; 3.134 credits TTS + Scribe voor de woordtijden). Alleen de audio en de woordtijden in `window.FILMDATA` (regel 153) zijn vervangen; beeld en speler ongewijzigd. Spraak 7:01 → 6:59 (vwo).
- 1.1 (28 okt 2026): opwaardering naar prompt v13 (B14, zonder keuring). Stem, script, vragen, timing en speler ongewijzigd. Per scène:
  - title, q02, Recap: namen van castpersonages uit de schermtekst (puzzelvraag, vraagkaart q02, hoofdstukvraag Recap: 'twee vrienden').
  - s01: geen tv-gloed meer (Part C: geen gloed); bank blauwgrijs in plaats van paars (minder paars).
  - s05: de droom toont nu wat de stem zegt: je rent weg voor een hond (castboek-zijaanzicht 'ren', grond schuift mee met `gangSnelheid`; herder uit de dierenbibliotheek die meedraaft). Was: zwaaiende Noor en een getekende hond met stokpoten.
  - s07, s10, s11, s14, s15: hoofd met hersenen = `hoofdHersenen` uit de bibliotheek (grote en kleine hersenen, hersenbalk, thalamus, hersenstam, hypothalamus, hypofyse in het Turkse zadel); de lagen van de film liggen erop op hun echte plek; geen gloed; schors in teal in plaats van paars. Namen opnieuw geplaatst naast hun onderdeel (s10: netvlies boven het oog, hypothalamus en kruising onder; s14: hersenschors links naast de schors).
  - s09: membraan = `membraanBoog` (fosfolipiden langs de boog), receptor = `membraanReceptor` (zeven helices als kralenketen, G-eiwit binnen; adenosine geeft een signaal, cafeïne niet).
  - s12: schermtekst 'Bilal en Sam: wakker vanaf 08:00' → 'wakker vanaf 08:00'.
  - s13 (vwo): DNA grijs (palet B), mRNA als dunne teal sliert (`mrnaSliert`).
  - s15: muis uit de dierenbibliotheek; hersencellen neutraal in plaats van paars; groeihormoon in zijn eigen vorm (`'groei'`, was de vorm van insuline); antistoffen als Y van vier ketens.
  - Actuele `personages/lib_cast.js` in de film (nodig voor het zijaanzicht).

