# Onderzoek doen in de biologie — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/cellen/onderzoek-doen/index.html (audio in films/cellen/onderzoek-doen/audio/) |
| Reeks / nummer | Losse film (onderzoeksvaardigheden); op de site-index in de rij Cellen als nummer 1 ("Film · onderzoeksvaardigheden") |
| Doelgroep / niveau | vwo bovenbouw (vwo 5–6; volgens het docentdeel werken H1, 2, 3, 5 en 6 ook los voor havo 4–5). Geen Havo/Vwo-schakelaar |
| Versie / datum | onbekend (niet in de HTML) |
| Stem / model | Roos (ElevenLabs); model onbekend (niet in de HTML) |
| Duur | 20:36 (som van de 10 mp3's: 1236,7 s). Pagina zegt "21 min"; daarbovenop 2,6 s titelkaart vóór H1–H8 en wachten bij zes pauzekaarten |
| Beeldstijl | Ouder eigen ontwerp "Labjournaal": donkere werkbank met ruitjespapier en rode kantlijn, krijtwitte lijnen, blauwe inkt (#8EC1F0) en amber markeerstift (#F2C46B); Instrument Serif / IBM Plex Sans / IBM Plex Mono. SVG-podium 1600×900, niet Part C |
| Audio-opslag | 10 losse mp3's in audio/, één per hoofdstuk (ch_open, ch_1 … ch_8, ch_slot); niet in de HTML ingebed |
| Reconstructie | 2026-10-12, uit de gepubliceerde HTML |

## Opbouw
Type-letters uit de prompt staan niet in de HTML; hieronder een indicatie op grond van de inhoud.

| Begin | Hoofdstuk | Type (indicatie) | Kernbeeld |
|---|---|---|---|
| 0:00 | Opening — Hoe weet je of iets waar is? | — | Drie raadsels (paard, wilg, erwten), de onderzoekscyclus, stempels Betrouwbaar? / Valide? |
| 0:51 | 1 Van vraag naar hypothese — Semmelweis · Wenen, 1847 | A/C | Twee klinieken, hypothesen verworpen, Kolletschka (inductie), deductie, sterftegrafiek; pauze |
| 3:00 | 2 Proefopzet — Pasteurs zwanenhalskolf en het paard Hans | A | Zwanenhalskolf en controle, variabelen, Clever Hans, blind/dubbelblind, stempels |
| 5:17 | 3 Meten en meetfouten — Van Helmonts wilg · 17e eeuw | A | Pot met wilg, toevallige vs systematische fout, de bladeren, één boom; pauze |
| 7:24 | 4 Statistiek en significantie — Mendel en Fisher · Brno, rond 1860 | A | Spreiding per plant, nulhypothese, simulatie, p-waarde, chi-kwadraat, Fisher en de munt; pauze |
| 11:13 | 5 Resultaten interpreteren — De vinken van de Grants · Galápagos, 1977 | A | Droogte, frequentieverdeling, conclusie en discussie |
| 13:24 | 6 Correlatie ≠ causaliteit — Roken en longkanker · Londen, 1950 | A | Patiënt-controle, Fisher's alternatieven, cohortonderzoek, Bradford Hill; pauze |
| 15:37 | 7 Wetenschap als systeem — De berkenspanner en de replicatiecrisis | A/I | Kettlewell, kritiek, Majerus, Amgen, publicatiebias, p-hacking; pauze |
| 17:48 | 8 Ethiek en integriteit — Henrietta Lacks, proefdieren en fraude | I | HeLa, informed consent, drie V's, te weinig dieren, Hwang, drie vormen van fraude; pauze |
| 20:04 | Afsluiting — Twee vragen die je altijd kunt stellen | — | Acht lessen, twee vragen, je eigen onderzoek |

Scènenamen per hoofdstuk staan als commentaar in `SCENES` en in script.md (bijv. 1.1 twee klinieken … 1.8 afgewezen).

## Vragen
Geen meerkeuze-voorspelvragen. Wel zes open pauzevragen: aan het eind van H1, H3, H4, H6, H7 en H8 zegt de stem "Zet de film even stil.", toont het podium een pauzekaart ("PAUZE · BESPREEK IN TWEETALLEN") en wacht de speler op **Verder**. Antwoorden staan in het docentdeel (ingeklapt).

| Na | Vraag | Antwoord (docentdeel) |
|---|---|---|
| H1 | Semmelweis vergeleek vóór en ná. Hoe had hij een gelijktijdige controlegroep kunnen maken, en waarom was dat ethisch lastig? | Bijvoorbeeld: de helft van de artsen laat wassen, de andere helft niet. Maar als je vermoedt dat wassen levens redt, laat je een groep bewust risico lopen. |
| H3 | Ontwerp de proef van Van Helmont opnieuw. Wat meet je allemaal, hoeveel bomen neem je, en welke controle? | Meerdere bomen, het water dat erin gaat, de gevallen bladeren, droge massa in plaats van versgewicht, een pot zonder boom, en een manier om de rol van lucht te testen. |
| H4 | Twee gele muizen krijgen samen 80 gele en 40 niet-gele jongen. Past dat bij 3 : 1? Doe de chi-kwadraattoets (grenswaarde 3,84). Past 2 : 1 beter? | χ² = 10²/90 + 10²/30 = 4,4 > 3,84, dus 3 : 1 wordt verworpen. Bij 2 : 1 is χ² = 0. Verklaring: homozygoot geel is letaal. |
| H6 | "Leerlingen die ontbijten halen hogere cijfers." Bedenk een verstorende variabele en een vorm van omgekeerde causaliteit. | Verstorend: meer structuur of regelmaat thuis. Omgekeerd: wie het goed doet op school, heeft meer rust en tijd om te ontbijten. |
| H7 | Waarom publiceert een tijdschrift liever een nieuwe ontdekking dan een herhaling? Wat zou je daaraan kunnen doen? | Nieuw is spannender en wordt vaker geciteerd. Oplossingen: preregistratie, en ook negatieve resultaten publiceren. |
| H8 | Een onderzoeker wil maar drie muizen per groep gebruiken „om dieren te sparen". Wat vind jij? | Met zo weinig dieren is het resultaat waarschijnlijk niet betrouwbaar, en zijn de dieren alsnog voor niets gebruikt. Vermindering betekent: zo min mogelijk, maar genoeg. |

Let op: de vraagtekst op de pauzekaart komt uit `CHAPTERS[].pause.q` en wijkt licht af van de tabel in het docentdeel (H4 zonder "bij 1 vrijheidsgraad", H6/H8 andere aanhalingstekens).

## Begrippen
Statische tabel onder "Begrippen" (begrip — betekenis — hoofdstuk). Geen vwo-markering (hele film is vwo).

- Onderzoekscyclus — De vaste denkroute: waarneming, onderzoeksvraag, hypothese, verwachting, experiment, resultaten, conclusie, en weer een nieuwe vraag. (0)
- Betrouwbaarheid — Krijg je bij herhaling (ongeveer) hetzelfde resultaat? Neemt toe met meer herhalingen en een grotere steekproef. (0, 3)
- Validiteit — Meet je echt wat je wilt meten, en kan je opzet de onderzoeksvraag beantwoorden? (0, 3)
- Hypothese — Een mogelijk antwoord op de onderzoeksvraag, dat je kunt toetsen. (1)
- Verwachting — Wat je in deze proef zult meten als de hypothese klopt; vaak in de vorm als… dan… (1)
- Falsifieerbaar — Weerlegbaar: er is een uitkomst denkbaar die de hypothese onderuit haalt. (1)
- Inductie · deductie — Inductie: van losse waarnemingen naar een algemene regel. Deductie: van een algemene hypothese naar een concrete voorspelling. (1)
- Onafhankelijke variabele — Wat de onderzoeker zelf verandert. (2)
- Afhankelijke variabele — Wat de onderzoeker meet. (2)
- Constante variabele — Alles wat de onderzoeker gelijk houdt, zodat alleen de onafhankelijke variabele verschilt. Sommige methodes zeggen: constante factoren. (2)
- Controle(groep) — Een vergelijkingsgroep die alles krijgt behalve de behandeling die je test. (2)
- Blind · dubbelblind — Blind: de proefpersoon weet niet welke behandeling hij krijgt. Dubbelblind: ook de onderzoeker weet het niet. (2)
- Placebo — Een nepbehandeling die de controlegroep krijgt, zodat verwachtingen geen verschil maken. (2)
- Randomiseren — Het toeval laten bepalen wie in welke groep komt. (2)
- Toevallige fout — Een meetfout die de ene keer te hoog, de andere keer te laag uitvalt; middelt uit bij herhalen. (3)
- Systematische fout — Een meetfout die steeds in dezelfde richting zit; middelt niet uit. (3)
- Spreiding — Hoe ver de metingen uit elkaar liggen. (4, 5)
- Nulhypothese — De aanname dat er niets bijzonders aan de hand is en een afwijking door toeval komt. (4)
- p-waarde — De kans op minstens deze afwijking, als de nulhypothese klopt. Onder 0,05 heet een resultaat meestal significant. (4)
- Simulatie — Een proef vaak nabootsen met toeval (bijvoorbeeld op de computer), om te zien welke uitkomsten je krijgt als de nulhypothese klopt. (4)
- Chi-kwadraattoets — Toets die waargenomen en verwachte aantallen vergelijkt: χ² = Σ (W − V)² / V. (4)
- Frequentieverdeling — Grafiek die laat zien hoe vaak elke waarde voorkomt. (5)
- Conclusie · discussie — Conclusie: het antwoord op de onderzoeksvraag. Discussie: de beperkingen en wat je er niet uit mag afleiden. (5)
- Observationeel onderzoek — Onderzoek waarin je niets verandert, maar waarneemt wat samengaat. (5, 6)
- Correlatie · causaliteit — Correlatie: twee dingen gaan samen. Causaliteit: het ene veroorzaakt het andere. (6)
- Omgekeerde causaliteit — Het vermeende gevolg is eigenlijk de oorzaak. (6)
- Verstorende variabele — Een derde factor die beide dingen veroorzaakt. (6)
- Patiënt-controleonderzoek · cohortonderzoek — Patiënt-controle: je vergelijkt zieken met niet-zieken en kijkt terug. Cohort: je meet eerst en volgt mensen daarna in de tijd. (6)
- Dosis-effectrelatie — Hoe meer van de oorzaak, hoe groter het effect. (6)
- Peer review — Beoordeling van een artikel door vakgenoten vóór publicatie. (7)
- Replicatiecrisis — Het probleem dat veel gepubliceerde resultaten bij herhaling niet standhouden. (7)
- Publicatiebias — Positieve resultaten worden vaker gepubliceerd dan resultaten waarin niets gevonden werd. (7)
- p-hacking — Net zolang analyses proberen tot er iets significants uitkomt, en alleen dat rapporteren. (7)
- Informed consent — Vooraf geïnformeerde toestemming van wie meedoet aan onderzoek. (8)
- De drie V's — Vervanging, vermindering en verfijning van dierproeven. (8)
- Wetenschappelijke fraude — Bewust data verzinnen, data vervalsen of werk van anderen overnemen (plagiaat). (8)

## Docentdeel
Sectie "Voor de docent": leerdoelen (negen, voor vwo 5–6; chi-kwadraat en p-waarde gaan verder dan de examenstof), pauzemomenten met antwoorden (zie Vragen), tabel met elf misvattingen (o.a. "een hypothese is een voorspelling", "betrouwbaar = valide", "p = 0,05 betekent 5 % kans dat de hypothese fout is", "falsifiëren en vervalsen is hetzelfde"), uitgebreide vereenvoudigingen per casus (Semmelweis, Pasteur, Clever Hans 89 %/6 %, Van Helmont, Mendel/Fisher p ≈ 0,00007, simulatie p ≈ 0,6, Grants 4 %, roken, berkenspanner, Amgen, Henrietta Lacks/WMO, dierproeven/CCD, Hwang) en zes practicum-/werkbladideeën (kiemproef, limonadetest, versleten liniaal, maïskolven tellen, onzincorrelaties, dobbelsteen-p-hacking). Geen aparte getallentabel; de getallen staan in de tekst van de vereenvoudigingen. Sectie "Bronnen": links per hoofdstuk (Wikipedia, Doll & Hill 1950, Begley & Ellis 2012, CCD e.a.).

## Techniek: waar zit wat in de HTML
Regelnummers verwijzen naar film.src.html (= index.html; geen blobs).

- **Hoofdstukken**: regel 223, `const CHAPTERS = [...]` met `key` (`open`, `1` … `8`, `slot`), `num`, `title`, `sub`, `audio` (pad naar mp3) en optioneel `pause: {q}`.
- **Ondertitels en scènetiming**: regel 224, `const TIMING = {key: {dur, rows:[{t0, speech, end, sents:[{t, x}]}]}}`. Elke `row` is één scène; `t0` = scènewissel, `speech`/`end` = begin/eind van de stem in die scène, `sents` = ondertitelzinnen met begintijd (s in het hoofdstuk-mp3). De laatste rij van een pauzehoofdstuk bevat alleen "Zet de film even stil." (de speler toont dan rechtsboven "pauze").
- **Tekenbibliotheek** `Art` regel 229–526 (o.a. `stamp`, `cycle`, `horse`, `willow`, `pause` (pauzekaart, regel 331), `slate` (hoofdstuktitelkaart, regel 344)).
- **Scènes**: regel 529–1828, `SCENES[key] = [ fn, fn, ... ]`, één functie per `row` in dezelfde volgorde; commentaar `// 1.3 hypothesen toetsen` geeft de naam. Een scène plant zijn elementen met cues `{ s: zinindex, d: vertraging }`: `S.T({s, d})` = begintijd van zin `s` in die rij + `d` seconden (`s: -1` = begin van de rij). De timing hangt dus aan de zinstijden in TIMING. Ontbreekt een functie, dan toont `Art.placeholder` het scènenummer.
- **Engine** `class Scene` regel 1842–1921 (cues, tweens, ticks; SVG-primitieven).
- **Speler** regel 1923–2069: één `Audio`-object; `load(i)` zet `audio.src = CHAPTERS[i].audio`; bij `ended` gaat hij naar het volgende hoofdstuk, of toont bij `c.pause` de knop "Verder: hoofdstuk n". Vóór H1–H8 eerst 2,6 s titelkaart (`slate`, `setTimeout(go, 2600)`). Tijdbalk = som van `TIMING[key].dur`. Geen Leerling/Klas of Havo/Vwo; CC-stand wordt in localStorage onthouden. `window.__film.show(key, i, frac)` is een screenshot-hulp.
- **Pagina-tekst** (over, begrippen, docent, bronnen) is statische HTML, regel 186–220.

## Zo pas je deze film aan
1. **Ondertitel of gesproken tekst wijzigen**: de stem is per hoofdstuk één take. Een tekstwijziging betekent: hoofdstuk-mp3 opnieuw genereren en voor dat hoofdstuk in TIMING alle `t0`/`speech`/`end`/`sents[].t` opnieuw zetten (alleen de zinstijden van dat ene hoofdstuk). Alleen een typfout in de ondertitel: pas `sents[].x` aan, tijden laten staan.
2. **Beeld van één scène aanpassen**: zoek de commentaarregel (bijv. `// 4.8 de chi-kwadraattoets`) en wijzig de functie. Cues verwijzen naar zinsnummers binnen de rij (`{ s: 2 }`); als je zinnen toevoegt of weghaalt, schuiven die nummers.
3. **Scène toevoegen of splitsen**: het aantal functies in `SCENES[key]` moet gelijk blijven aan het aantal `rows` in `TIMING[key]` (de speler koppelt op index).
4. **Pauzevraag wijzigen**: `CHAPTERS[i].pause.q` (kaart in de film) én de tabel "Pauzemomenten" in het docentdeel (staat los). Pauze weghalen: `pause` verwijderen; de gesproken zin "Zet de film even stil." blijft dan in de audio staan.
5. **Hoofdstuk opnieuw opnemen**: vervang `audio/ch_N.mp3`, zet `TIMING[key].dur` op de nieuwe duur en herbereken de rijen; de tijdbalk en hoofdstuklijst volgen vanzelf.

## Aandachtspunten
- Ouder ontwerp, wijkt af van de huidige prompt (v4/Part C): eigen "Labjournaal"-look in SVG i.p.v. canvas met Micro/Macro/Schema; geen voorspelvragen met opties en geen "Wat denk je?"-moment, wel open pauzevragen; geen Leerling/Klas, geen Havo/Vwo-blokken; geen typekolom (A–I) in het docentdeel; geen versie/datum en geen ElevenLabs-model vermeld.
- Er staat geen terugknop/navigatie naar de site-index op de pagina (andere films hebben "← Terug"). Lettertypen komen van Google Fonts (extern).
- In de bronnenlijst staat "Opzet van de handleiding geïnspireerd op: Alles op zijn plek (celorganellen)" met een link naar lab.julesjacobs.com/edu/celorganellen/ — een externe site, niet de celorganellen-film in deze repo.
- Hoort inhoudelijk niet bij de reeks Cel, maar staat in films/cellen/ en op de index als nummer 1 van die rij; de reeks Cel (Diffusie · Celorganellen · Celdeling) heeft daardoor geen film 1 op de plek.
- Pagina noemt "21 min"; de som van de audio is 20:36 (plus titelkaarten 8 × 2,6 s ≈ 21:00).

## Wachtlijst opnieuw inspreken

Aanvullingen 15-10-2026 na de vergelijking met Gewoon Uitgelegd (tekst staat als [nieuw] in `script.md`). De stem is per hoofdstuk één take: per gewijzigd hoofdstuk de hele `audio/ch_N.mp3` opnieuw genereren en alleen voor dat hoofdstuk `TIMING[key]` opnieuw zetten (`dur`, en per rij `t0`/`speech`/`end`/`sents[].t`); zie "Zo pas je deze film aan", punt 1 en 5. Andere hoofdstukken blijven ongemoeid; de tijdbalk volgt vanzelf. Nieuwe zinnen in een bestaande rij schuiven de zinsnummers (`{ s: n }`) in die scène op (punt 2): controleer de cues van de genoemde scènes.

- **H2 Proefopzet** (`audio/ch_2.mp3`, `TIMING['2']`, scène `// 2.7 blind en dubbelblind`): na de placebozin komt het verschil tussen constante (controle)variabelen en de controlegroep, met Pasteur en de placebogroep als voorbeeld (3 zinnen, ca. 13 s). In rij 2.7 schuiven de zinnen "Weet ook de onderzoeker het niet…" en "En het toeval bepaalt…" van index 2 en 3 naar 5 en 6.
- **H3 Meten en meetfouten** (`audio/ch_3.mp3`, `TIMING['3']`, scène `// 3.6 betrouwbaar?`): na "Maar één boom is één boom." één zin over nauwkeurigheid tegenover betrouwbaarheid (ca. 6 s). Laatste zin van de rij, dus geen cue-verschuiving binnen 3.6; alleen latere rijen (3.7–3.9) krijgen nieuwe `t0`.
- **H6 Correlatie ≠ causaliteit** (`audio/ch_6.mp3`, `TIMING['6']`, scène `// 6.7 betrouwbaar? valide? en Fisher`): na "Een correlatie alleen bewijst nog geen oorzaak." één zin: een grote steekproef beperkt het toeval, maar heft een scheve keuze van proefpersonen niet op (ca. 5 s). In rij 6.7 schuiven de zinnen vanaf "Maar door de andere verklaringen…" één index op.
- **Beeld nodig**: H2 (scène 2.7): twee naast elkaar geplakte kaartjes in het labjournaal: "constante variabelen = wat je gelijk houdt (bouillon, kooktijd)" en "controlegroep = groep zonder behandeling (placebo)", met een amber "≠" ertussen. H3 (scène 3.6): bij "Nauwkeurig gewogen" een weegschaal met veel decimalen (label "nauwkeurig: één meting precies") naast één boom met een herhaal-pijl (label "betrouwbaar: bij herhalen hetzelfde"). H6 (scène 6.7): grote menigte poppetjes die allemaal uit één hoek komen (bijv. alleen ziekenhuispatiënten), label "groot ≠ representatief".
- **Begrippenlijst** (statische HTML): "Nauwkeurigheid" (3) en "Controlevariabele" (2, als synoniem bij Constante variabele) toevoegen; eventueel bij Misvattingen "nauwkeurig = betrouwbaar" en "controlevariabele = controlegroep".
- **Risicowoorden (uitspraaktest)**:
  - *controlevariabelen* — IPA /kɔnˈtrɔː.lə.vaː.ri.jaː.bə.lə(n)/ (kon-TRO-luh-vaa-rie-jaa-bu-luh). Samenstelling uit woorden die al in de film staan (controle, variabelen); laag risico, wel meenemen omdat de TTS bij lange samenstellingen soms de klemtoon verlegt. Stem-invoer: "controle-variabelen".
  - *nauwkeurigheid* — IPA /nɑu̯ˈkøː.rəx.ɦɛi̯t/ (klemtoon op "KEU"). Laag risico. Stem-invoer: "nauwkeurigheid".
  - Online geen IPA-transcriptie van deze samenstellingen gevonden; afgeleid van de losse delen.

## Wijzigingen
- 15 okt 2026 — Speler: hoofdstukkaart (slate) 2,2 s in plaats van 2,6 s. Vragen uit werkte al (de pauzerij 'Zet de film even stil.' en de pauzekaart worden overgeslagen); niets aan veranderd.
- 15 okt 2026 — Audio-reparaties na feedback van Kamiel:
  - `audio/ch_2.mp3`: na "…kan er ook geen leven ontstaan." (einde scène 2.1, spontane generatie) zat een onverstaanbaar geluidje van ± 1,2 s (16,33–17,65 s). Dat stuk is stilgezet; duur en tijden ongewijzigd.
  - `audio/ch_4.mp3`: de zin "Het probleem is dus niet dat Mendel te ver van de verwachting zat, maar juist té dichtbij." (scène 4.10, 200,0–206,0 s) opnieuw ingesproken, want 'té' klonk als 'tee'. Nieuwe take: Roos (voice 7qdUFMklKPaaAVMsBTBt), eleven_v4, stem-invoer met gewoon "te" (zonder accent), -5,5 dB aangepast aan het hoofdstuk, ingevoegd op 200,15 s; hoofdstukduur gelijk gebleven. In `TIMING["4"]` van die rij `end` 204.54 → 205.3. Ondertitel houdt "té".
  - Let op bij opnieuw inspreken (wachtlijst): schrijf in de stem-invoer "te" in plaats van "té".

## Wijziging 16 okt 2026: begrippen als kaartjesraster
Het begrippenblok ziet er nu uit als in de hoofdengine (bv. `films/cellen/van-molecuul-tot-biosfeer.html`): onder de kop "Begrippen" een `<div id="glossary">` met per begrip een kaartje `<div class="term"><b>begrip</b><p>uitleg</p></div>` (raster `repeat(auto-fill,minmax(260px,1fr))`). Volgorde en tekst van de begrippen zijn ongewijzigd; extra kolommen (bron, hoofdstuknummer) staan klein onder de uitleg in `<p class="gl-meta">`. De opmaak staat in `<style id="glossary-stijl">` vlak voor `</head>` (kleuren via de variabelen van deze pagina). Nieuw begrip: voeg een kaartje toe in `#glossary`. Omgezet met een script; regelnummers verderop in dit bestand kunnen enkele regels verschoven zijn. De kop "Begrippen" is een `<h2 class="gl-kop">` met dezelfde opmaak als op de voorbeeldpagina (Fraunces 700, 30px, regelhoogte 1,5, marge 0 0 12px; het lettertype zit als `@font-face` 'Fraunces Begrippen' in `#glossary-stijl`, kleur = tekstkleur van deze pagina).
