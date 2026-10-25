# Binnen de grenzen — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/ecologie/5-binnen-de-grenzen.html (audio in films/ecologie/5-binnen-de-grenzen/audio/) |
| Reeks | Mens en milieu (hoofdstuk `milieu`, vwo Nectar 4.1 H9 Systeem Aarde en de mens; havo Biologie voor jou thema 7, slot), film 3 · sluitstuk na *Eén aarde* en *Ingrijpen of laten gaan?* (die staan ook bij Ecologie) |
| Niveau | havo + vwo; vwo-blok s25–s28 (biosfeerintegriteit, uitsterftempo, plantengroei, Amazonegebied, positieve terugkoppeling) met vraag q27 |
| Versie / datum | 1.1 · 25 oktober 2026 (heropname s25; 1.0: 21 oktober 2026) |
| Prompt | onbekend · gemaakt 21 okt |
| Stem / model | Roos (ElevenLabs eleven_v4, voice 7qdUFMklKPaaAVMsBTBt), één take per alinea, flow nQm0dXnejpCCuUKbO6un; 23 generaties, samen 7.622 credits; geen herhalingen. Loudnorm −16 LUFS. Woordtijden lokaal met `silalign.py` (geen Scribe: uploaden naar ElevenLabs vanuit de werkplek werd geblokkeerd, dus ook geen blinde uitspraakcheck; risicowoorden staan op de wachtlijst) |
| Duur | spraak 8:45 (vwo) / 7:44 (havo); speeltijd met kaarten en vragen ± 10 min (vwo) / ± 9 min (havo) |
| Beeldstijl | Part C: Schema (Macro-elementen voor bos en rivier binnen Schema-panelen); eigen tekeningen in `src/teken_mm.js`, hergebruik uit Ecologie 3 en 4 in `src/teken_basis.js` |
| Personages | Lotte (castboek), rode draad: appel bij het ontbijt, fietst over de Waalbrug |
| Herkomst | Gebouwd met Claude op verzoek van Kamiel (20–21 okt 2026): 'koppelen plus één nieuwe film over biodiversiteit, ecosysteemdiensten en planetaire grenzen, als sluitstuk van H9'. Script v1 → review door aparte agent (`reviews/review_v1.md`) → v2 → bouw → contactsheets → frisse beeldreview (`reviews/review_beeld.md`) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | Lotte aan het ontbijt; zoomcirkel op appelbloesem met hommel, wilde bij en honingbij; de bestuivers verdwijnen. Vraag: wat gebeurt er met ons voedsel? |
| H1 Wie bestuift er? | s04–s06 | Graanaren (zelf/wind) tegenover appel, aardbei, amandel, koffie; balk wereldoogst −5–8 %; vitamines. Bijenkast met honingbijen tegenover een paneel wilde bijen en hommels, zweefvlieg, vlinder, kever; hommel vliegt bij kou, honingbij blijft thuis; bloemen die de honingbij overslaat. Staafjes vruchtzetting weinig/veel wilde bestuivers, '2×', haak 'meer soorten = betrouwbaardere oogst' |
| H2 Wat de natuur levert | s07–s11, q10 | Drie kolommen genen (appelrassen) · soorten · ecosystemen (bos, heide, rivier); drie kolommen leveren (productie) · regelen (regulatie) · beleven (cultureel); schematische kaart van de Waal bij Nijmegen met hoogwater 1995 (250.000 geëvacueerd), nevengeul, −30 cm, groen eiland; vraag welke dienst bij hoogwater |
| H3 Waar het misgaat | s12–s18, q13, q17 | Living Planet-lijn naar −73 % gemiddeld; vraag wat dat betekent; schematische populatielijntjes (sommige groeien); ± 1 miljoen soorten; raster wilde bijen met Rode Lijst; insectenval en balk −76 %; vraag grootste oorzaak; bos dat akker/stad/weg wordt, balk 3/4 van het land; genummerde balken van de vijf oorzaken, overbevissing in zee |
| H4 Negen grenzen | s19–s29, q23, q27 | De aarde in vier sferen; regenwoud kappen (minder verdamping, minder regen, CO₂); temperatuurlijn ijstijd → stabiel → landbouw/dorpen/steden; rad van de negen grenzen dat zich vult en op 2025 overschrijdt; samenhang bij ontbossing; ozonlaag binnen de grens (vraag), ozongat boven Antarctica, spuitbus en koelkast, stempel 1987 Montreal, herstel rond 2066. Vwo: kerngrenzen klimaat en biosfeer, uitsterftempo-balken, plantengroei met deel voor de mens; Amazonegebied (kap, brand, droogte) met CO₂-pijlen; vraag; terugkoppelingslus. Terug naar Lotte |
| Recap | s30 | Vier panelen: drie niveaus, diensten, grootste oorzaak, negen grenzen |
| Eindkaart | s31 | vier regels |

## Vragen
- q02 (cold open): zonder bestuivende insecten? a bijna al ons voedsel weg · **b graan blijft, fruit/groente/noten schaars** · c weinig verandering
- q10 (H2): welke dienst levert de nevengeul bij hoogwater? a leveren · b beleven · **c regelen**
- q13 (H3): wat betekent gemiddeld 73 % kleiner? a 3/4 van alle dieren weg · **b gemiddeld over de populaties** · c 3/4 van de soorten uitgestorven
- q17 (H3): grootste oorzaak? a klimaatverandering · b vervuiling · **c natuur die akker, stad of weg wordt**
- q23 (H4): waarom bleef de ozonlaag binnen de grens? **a landen spraken samen af de stoffen te verbieden** · b vanzelf dichtgegroeid · c geen gevolgen
- q27 (vwo): wat doet meer koolstofafgifte van het bos met de opwarming? a remt af · **b sterker, en het bos nog droger** · c niets

## Begrippen
biodiversiteit, bestuiving, ecosysteemdienst (leveren/regelen/beleven), Rode Lijst, directe oorzaken van biodiversiteitsverlies, atmosfeer · hydrosfeer · lithosfeer · biosfeer, planetaire grenzen, cfk's, biosfeerintegriteit (vwo), positieve terugkoppeling (vwo) — zie `film.json` → glossary.

## Docentdeel
In `sections.html`: 6 checkvragen (bestuiving, biodiversiteit en bestuivers, ecosysteemdiensten bij de nevengeul, oorzaken van verlies, planetaire grenzen en ozon; vwo: terugkoppeling), plaats in het thema, hoe de film het uitlegt, misvattingen, getallen met bronnen (IPBES 2016 en 2019, Klein et al. 2007, Garibaldi et al. 2013, Rode Lijst bijen 2018, NOS 2015, WWF/ZSL LPR 2024, Hallmann et al. 2017, Rockström et al. 2009, Planetary Health Check 2025, UNEP/WMO Ozone Assessment 2022, Gatti et al. 2021), vereenvoudigingen en lessuggesties.

## Waar wat in de HTML zit (films/ecologie/5-binnen-de-grenzen.html)
| Regel | Inhoud |
|---|---|
| 69 | sitebalk (← Terug naar Mens en milieu) |
| 98 | Begrippen |
| 101 | Checkvragen en docentdeel |
| 162 | `window.FILMDATA` (segmenten, woordtijden, vragen) |
| ? | `const SCENES = {}` + gedeelde tekenfuncties |
| 1914 | scènes per alinea (`src/scenes_mm.js`) |

## Hoe je de film aanpast
Werkmap opzetten: `bron/src/*` en `bron/bouw/*` naar `/home/claude/hw/engine/` (`src/scenes_engine_kop.js` terug als `engine/scenes.js`), de rest van `bron/` naar `/home/claude/hw/mm/` (`stem/woordtijden/*` → `words/`, `../audio/*` → `audio/` en `raw/`). Daarna:
- Beeld: bewerk `teken_mm.js` / `scenes_mm.js` (cues: `q.on('woord', n)`; controle `python3 ../engine/cuecheck.py . scenes_mm.js`), dan `./bouw.sh`, stills met `python3 ../engine/stills.py . qa/x s04:12`.
- Tekst: pas `script_v2.md` aan, `python3 ../engine/make_segments.py . script_v2.md`, spreek alleen de gewijzigde alinea in (Roos, eleven_v4, één take, prompt = veld `voice`), zet de take in `raw/` en (na loudnorm −16 LUFS) in `audio/`, `python3 ../engine/silalign.py . <sid>`, `./bouw.sh`.
- Vragen, begrippen, docentdeel: `film.py` en `sections.html`, dan `./bouw.sh`.
- Terugzetten: `python3 plaats.py`, daarna in de repo `scripts/spelerfix.py`, `flipkaarten.py`, `oefenen.py`, `teller.py`, `licentie_noot.py`, `tabel_mobiel.py`.

## Aandachtspunten
- Uitspraak niet blind gecontroleerd (zie `uitspraak.md`): risicowoorden staan op de wachtlijst voor de volgende luisterbatch.
- De film staat in `films/ecologie/` (naast Eén aarde en Ingrijpen of laten gaan?) en verschijnt zowel bij Ecologie (film 5) als bij Mens en milieu (film 3).
- Het rad van de planetaire grenzen is schematisch (lengtes niet op schaal); de status volgt de Planetary Health Check 2025.
