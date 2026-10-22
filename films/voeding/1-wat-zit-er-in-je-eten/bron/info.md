# Wat zit er in je eten? — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/voeding/1-wat-zit-er-in-je-eten.html (audio in films/voeding/1-wat-zit-er-in-je-eten/audio/) |
| Reeks / nummer | Voeding, film 1 van 6 |
| Doelgroep / niveau | havo + vwo bovenbouw; één vwo-blok (ADI) gelabeld; Havo/Vwo-schakelaar, standaard Vwo |
| Versie / datum | 1.1 · 22 oktober 2026 (opgewaardeerd naar prompt v8, zie onderaan) · eerder: 1.0 · 12 oktober 2026 |
| Stem / model | Roos (ElevenLabs, voice_id 7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea |
| Duur | spraak 9:18 (vwo) / 8:12 (havo). Speeltijd met kaarten en vragen: vwo ≈ 11:15, havo ≈ 9:55 |
| Voldoet aan | prompt uitlegfilms v8 (22 okt 2026); bewust anders: zie 'Opwaardering naar prompt v8' |
| Beeldstijl | Part C: Schema (navy #1A2740) met zoomcirkel naar Micro (#121A26, sinds 1.1 zonder korrel); UI-laag vast; canvas 1920×1080, ondertitels boven y = 900 of in een band onder het beeld op smalle schermen |
| Audio-opslag | 24 losse mp3's in audio/ (s01 … s31), −16 LUFS, piek < −1 dBTP; niet in de HTML ingebed |
| Lettertypen | Fraunces 700, Source Sans 3 400/600/700, IBM Plex Mono 500 — ingebed als base64 (geen Google Fonts nodig) |
| Herkomst | gebouwd op 12 oktober 2026 met de bouwstraat in `bouw/` (afgeleid van Celorganellen) |

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `script_v2.md` | Definitief script met leerdoelen, misconcepties, `[VWO-START]/[VWO-END]` en `[VRAAG]`. Lege regel = nieuwe alinea = nieuwe take. `script_v1.md` = vóór de reviews |
| `script.md` | Tekst per alinea met duur, audiobestand en stem-invoer waar die afwijkt |
| `segments.json` | Uitvoer van `make_segments.py`: per alinea `display` (ondertitel), `voice` (stem-invoer) en `vmap` (welk ondertitelwoord bij welk stemwoord hoort) |
| `film.json` | Titel, hoofdstukvragen, vraagteksten met juist antwoord en onthulling, begrippen, checkvragen en docentdeel (HTML) |
| `storyboard.md` | Per alinea: look, tekst, beeld |
| `uitspraak.md`, `bouw/uitspraak_subs.json` | Risicowoorden en de vervangingsregels voor de stem-invoer |
| `stem/woordtijden/sNN.json` | Woordtijden per take (Scribe), uitgelijnd op de ondertitelwoorden |
| `stem/takes.json`, `stem/uitspraaktest.mp3` | ElevenLabs-node en -sessie per take (flow "Voeding film 1"); uitspraaktest |
| `src/` | `scenes.js` (deze film), `lib.js` (Part C-tokens en UI-laag), `lib_voeding.js` (seriebibliotheek), `player.js`, `page.html` (sjabloon), `fonts.css` |
| `bouw/` | `make_segments.py`, `align.py`, `build_data.py`, `build.py`, `stills.py`, `phone.py`, `perf.py`, `fake_words.py` |
| `reviews/` | Expert, didactiek + taal, curriculum, en de eindreview |

**Werkmap opzetten:** maak een map `f1/` met `script_v2.md`, `film.json`, `scenes.js` (uit `src/`), `words/` (= `stem/woordtijden/`) en `film/1-wat-zit-er-in-je-eten/audio/` (= `../audio/`); zet `src/*.js`, `src/page.html`, `src/fonts.css` en `bouw/*` samen in `engine/`. Dan: `python3 engine/make_segments.py f1 script_v2.md && python3 engine/build_data.py f1 && python3 engine/build.py f1` → `f1/film/1-wat-zit-er-in-je-eten.html`.

## Opbouw

| Hoofdstuk | Type · look | Kernbeeld |
|---|---|---|
| Cold open | I · Schema | Vleeseter en vegan, allebei 60 g eiwit; advies aan de vegan; vraag q02 |
| Titel | Schema | Titel, puzzel, broodje kaas en glas melk |
| H1 Wat zit er in een broodje kaas? | B · Schema + zoomcirkel Micro | Moleculenmengsel; bord met zes groepen; rij met vier taken; vraag q08 |
| H2 Branden en bewaren | A/B · Micro + Schema | Zetmeel geknipt tot glucose; 17 tegen 37 kJ; atoomtelling (verdieping); glycogeen + water tegen vet (≈ 9×); melketiket; vraag q13 |
| H3 Eiwit: twintig bouwstenen | B/E · Micro + Schema | Kralensnoer, twintig soorten, negen essentieel; eiwit dat niet af kan; aminozuren in het bloed; graan + peulvrucht; vraag q19 |
| H4 Vezels en het etiket | A · Schema-buis + Schema | Peristaltiek met en zonder vezels; ingrediëntenlijst met E-nummers; vwo: ADI-rekensom en vraag q28 |
| Recap | Schema | Twee leerlingen met rijen essentiële aminozuren; maaltijd met vier taken; vooruitblik film 2 |

## Vragen

| Id | Niveau | Vraag | Juist |
|---|---|---|---|
| q02 | basis | Waarom moet de vegan extra op eiwit letten? | b (onthulling verwijst naar H3 en de recap) |
| q08 | basis | Uit welke voedingsstof haalt je lichaam de bouwstenen voor nieuw eiwit? | b eiwitten |
| q13 | basis | Trekvogel: brandstof als vet of als glycogeen? | b vet |
| q19 | basis | Eén essentieel aminozuur is op. Wat gebeurt er? | b eiwit kan niet af |
| q24 | basis | Een maand bijna geen vezels? | b trager |
| q28 | vwo | Kind van 20 kg: na hoeveel blikjes aan de ADI? | b vier |

Checkvragen (statisch in de pagina): 1 Volkoren en vezels · 2 Brood met hummus · 3 Beer in winterslaap · 4 Het beperkende aminozuur (vwo) · 5 Zoetstof in siroop (vwo).

## Techniek: waar zit wat in de HTML

Regelnummers in `1-wat-zit-er-in-je-eten.html` (er zijn geen blobs; de audio staat ernaast).

- Regel 101–154: checkvragen en docentdeel (statische HTML uit `film.json` → `sections`).
- Regel 156: `window.FILMDATA` met `segments` (speech: `words` {t,s,e}, `audio`, `dur`; question: `q`, `options`, `correct`, `explain`), `chapters` en `film` (titel, minis, meta, versie).
- Daarna `lib.js` (Part C-tokens `C`, `label`, `haak`, `zoomCircle`, …) en vanaf regel 377 `lib_voeding.js` (zeshoek/suikerketen, `bead`/`proteinChain`, `triglyceride`, `broodje`, `etiket`, `groepenBord`, `takenRij`, `darmBuis`).
- Regel 613–965: scènes. `SCENES.sNN(ctx, t, q)`; beeldwissels via `q.on('woord', n)` / `q.at('woord', n)` op woorden uit de take.
- Regel 966: `GLOSSARY`.
- Regel 968 e.v.: speler. `buildTimeline()` regel 981 (kaarten 3,5 s, titel 5 s, eindkaart 9 s, vraag 8 + 6 s), `render()` regel 1003, ondertitels `chunks()`/`drawCaption()` regel 1051–1056, toetsenbord in `init()`, testhaak `__still()` regel 1126.

## Zo pas je deze film aan

1. **Tekst in beeld:** zoek de string in `src/scenes.js` bij de juiste `sNN` en bouw opnieuw (`build.py`).
2. **Eén alinea opnieuw inspreken:** pas de alinea aan in `script_v2.md` → `make_segments.py` → neem alleen die alinea op (Roos, eleven_v4, één take, tekst = `voice` uit `segments.json`) → transcribeer met Scribe → `align.py f1 <status.json>` → mastering (zie hieronder) → `build_data.py` → `build.py`. Controleer daarna dat elk `q.on('…')`-woord in die scène nog voorkomt (het controlescript in de bouwsessie staat onder Aandachtspunten).
3. **Mastering per take:** `I=$(ffmpeg -i raw.mp3 -af ebur128 -f null - 2>&1 | grep -A1 "Integrated loudness" | tail -1 | awk '{print $2}')`, versterking = −15 − I dB, dan `-af "volume=…dB,alimiter=limit=0.84:level=false,afade=t=in:d=0.02" -ar 44100 -ac 1 -b:a 96k`.
4. **Vraag aanpassen:** `film.json` → `questions`; opties staan in `script_v2.md` op de `[VRAAG]`-regel.
5. **Havo/vwo:** zet de markeringen in `script_v2.md`; de speler, hoofdstuklijst en vwo-balk volgen vanzelf.

## Aandachtspunten

- Kamiel kon de uitspraaktest niet beluisteren; ADI ("aa-dee-ie"), quinoa ("kienwa") en E-nummer ("ee-nummer") zijn keuzes van Claude. Na beluisteren eventueel s22, s26, s27, s29 opnieuw.
- s21 (aminozuren in het bloed) is vereenvoudigd: het lichaam breekt ook eigen eiwit af; daarom "een stijging meteen na de maaltijd". Zo vraagt ook het examen het (havo 2025-I vr 24).
- ADI staat als vwo-blok, zoals in de specificatie; mogelijk ook havo-schoolexamenstof.
- Cue-controle: elk `q.on/q.at`-woord in `scenes.js` moet voorkomen in de woorden van zijn segment (op 12 okt: 0 problemen). Frametijd bij 4× CPU-vertraging: mediaan ≤ 3 ms, p95 ≤ 8 ms.
- Versiegeschiedenis: 1.0 (12 okt 2026) — na eindreview: s14 "bijna negen keer", s15 "Lichaamsvet wordt pas een probleem", s22 "Plantaardig voedsel bevat alle negen" en "vlees, zuivel, ei" opnieuw ingesproken; H4 hernoemd tot "Vezels en het etiket"; voorraadbakjes heten "vrije aminozuren in je cellen".

## Wachtlijst opnieuw inspreken

Aanvulling 15-10-2026 na de vergelijking met Gewoon Uitgelegd (tekst staat als [nieuw] in `script.md`).

- **H3 · s17** (`../audio/s17.mp3`, nu 35,8 s, wordt ≈ +5 s): de binding tussen twee aminozuren heet een peptidebinding. Zet de zin in `script_v2.md` achteraan in de alinea van s17 (geen lege regel ervoor, anders verschuiven alle latere id's). Opnemen volgens "Zo pas je deze film aan", punt 2–3; controleer de `q.on`-woorden van s17.
- **Beeld nodig**: in het kralensnoer van s17 één binding tussen twee kralen oplichten, label "peptidebinding".
- **Risicowoorden (uitspraaktest)**:
  - peptidebinding — geen IPA-bron gevonden voor de samenstelling (Wiktionary was niet bereikbaar, woorden.org/encyclo geven geen uitspraak voor "peptide"); verwacht [pɛpˈtidəˌbɪndɪŋ]. Stem-invoer: "peptide-binding" (koppelteken zodat de -e van peptide hoorbaar blijft).

## Wijziging 15 okt 2026

Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen. `label()` tekent geen lijntje en stip meer; de nieuwe `naamBij(ctx, naam, meta, x, y, alpha, align, kleur)` zet de naam (met donkere rand rond de letters) direct naast of op het onderdeel, en `label()` gebruikt de richting ax,ay → lx,ly alleen nog om te bepalen aan welke kant de naam staat (zelfde functies als Celorganellen; ook in `bron/src/lib.js`). Nu `naamBij`: 'al veel zuurstof', 'bijna alleen C en H' (rechts naast de rij atomen), glycogeen (erboven), cellulose, E-nummer, essentiële aminozuren (boven de piek).

## Wijziging 20 okt 2026

- **Personages i.p.v. kale poppetjes** (`human()` is weg): Sam (vleeseter, groene hoodie) en Noor (vegan) in de cold open en de recap (`twoStudents`, voeten op y = 880); Noor met 'ruim 50 % water' (s07, `persoonTint`: het onderste deel van Noor kleurt teal); Sam als proefpersoon (s21); Noor als volwassene van 60 kg en een jong kind van 20 kg (s27, s29, `kindFiguur`: Daans uiterlijk met kinderverhoudingen, er is geen kind in het castboek). Gesproken tekst ongewijzigd.
- **Koolhydraatclaim (s11) nagekeken.** "In glucose zitten al veel zuurstofatomen. Het is als het ware al half verbrand." klopt: in glucose (C₆H₁₂O₆, en ook zetmeel/glycogeen (C₆H₁₀O₅)ₙ) heeft koolstof gemiddeld oxidatiegetal 0, precies halverwege CH₄ (−4) en CO₂ (+4); in een vetzuur als palmitinezuur (C₁₆H₃₂O₂) is dat −1,75. Een vetzuur kan dus per koolstofatoom meer elektronen afstaan, en de zuurstofatomen in suiker wegen wel mee maar leveren niets. Daarom ±17 tegen ±37 kJ/g. Schermtekst nu precies: 'al veel zuurstof · AL DEELS GEOXIDEERD' en 'bijna alleen C en H · NOG VEEL TE OXIDEREN'. Gesproken tekst en ondertitel blijven ("als het ware" maakt het een beeld; ondertitel = wat je hoort). Geen nieuwe opname nodig.
- **s29**: de grafiek '100× lager' kwam te vroeg (cue `honderd` trof eerst 'achthonderd'); nu `q.on('honderd', 2)`.
- **Bouwen na deze wijziging**: de HTML op de site bevat latere aanpassingen die niet in `src/page.html`/`src/player.js` staan (speler: snelheid, Vragen aan/uit, spelerfix; flipkaarten, oefenen, teller, licentie, tabellen). Pas scènes aan in `src/scenes.js` en zet ze in de film met `python3 bron/bouw/vervang.py films/voeding/1-wat-zit-er-in-je-eten.html films/voeding/1-wat-zit-er-in-je-eten/bron` (vervangt alleen het blok tussen `/*@@SCENES*/` en `/*@@/SCENES*/` = `src/lib_cast.js` + `src/cast_hulp.js` + `src/scenes.js`; met `--filmdata <filmdata.json> [--nieuw sNN,…]` ook FILMDATA, met `?v=N+1` voor opnieuw ingesproken alinea's). `build.py` voegt lib_cast.js en cast_hulp.js nu ook in. `src/lib_cast.js` is een kopie van `personages/lib_cast.js`.
- **Waar in de HTML** (regelnummers 20 okt): scènesblok 621–1250 (lib_cast.js vanaf 621, `cast_hulp.js` vanaf 859, `const SCENES` op 937). Regelnummers hierboven onder 'Techniek' zijn daardoor ±275 regels opgeschoven.

## Wijziging 20 okt 2026 (tweede ronde)

- Het kind van 20 kg (s27, s29) is nu **Teun**, het kind uit het castboek (`persoon(ctx, 'kind', …)`), i.p.v. de eigen kinderversie van Daan (`kindFiguur` is weg).
- 'Ruim 50 % water' (s07): Noor gewoon zoals in de cast, met ernaast een meterstreep die tot ± 60 % volloopt (i.p.v. Noor overgekleurd; `persoonTint` is weg).
- `src/lib_cast.js` is de nieuwe versie van het castboek (met Teun en de baby).

## Opwaardering naar prompt v8 (1.1 · 22 okt 2026)

Werkwijze B14 (opwaarderen naar een nieuwe promptversie): Kamiel keurde per scène een verbeterblad goed (claude.ai-artifact 'Verbeterblad prompt v8', alle 8 voorstellen 'Doen'); alleen die scènes zijn veranderd. Stem, script, vragen en cuewoorden zijn gelijk gebleven; er is niets opnieuw ingesproken.

Gedeelde tekenbibliotheek: `bron/src/lib_bio.js` is een kopie van `bibliotheek/lib_bio.js` (recepten volgens prompt v8, C9). `bouw/build.py` plakt hem na lib_cast.js in de pagina; in de live HTML staat hij tussen de lib_bio-kop en `/* einde lib_bio */`.

| Scène | Was | Nu |
|---|---|---|
| alle Micro-scènes | stippenlaag (korrel) | egale Micro-achtergrond (`bg()` in lib.js); rustige textuur alleen binnen een cel |
| s04, s05 (soep) | kralen en zeshoekjes door elkaar | zetmeel als korte spiraal (`zetmeelSpiraal`), eiwit als klein gevouwen ketentje (`SOUP_EIWIT_PAD`) |
| s10 | rechte rij zeshoeken, cel als boog | zetmeel als spiraal die bij 'knipt' afwikkelt en in losse glucose uiteenvalt; de glucose gaat een ronde cel in (`celRond` met membraan) |
| s12 | grijs vogelsilhouet, vetcel als blob | `grutto` (rosse grutto, vliegt met echte vleugelslag) en `vetcel` met de triglyceriden in de druppel |
| s15 | rijtjes letters | gebogen stukje membraan (`membraanBoog`) met één eiwit |
| s17 | golvende kralenrij, gestreept blokje | eiwit van 44 kralen dat vouwt (`eiwitVouw`: helices en haarspeld), bij knippen ontvouwt en opnieuw vouwt; spieren als `spierBundel`, enzym als `enzymKluwen` |
| s20 | bruine vlek | `leverVoor` met galblaas |
| s23, s25 | buis van twee lijnen, groene bolletjes | darmwand met lagen (`darmwand` via `darmWandBuis`), kringspier knijpt zichtbaar; vezels als `celluloseBundel`; enzymen met een actieve plek die niet past |

Labels in de gewijzigde scènes staan met `naamBij` direct bij het onderdeel (geen wijslijnen).
