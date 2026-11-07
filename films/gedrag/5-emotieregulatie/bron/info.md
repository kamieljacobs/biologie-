# Emotieregulatie — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/gedrag/5-emotieregulatie.html (audio in films/gedrag/5-emotieregulatie/audio/) |
| Reeks | Gedrag (hoofdstuk `gedrag`: havo eigen pakket Gedrag, vwo H1 + H19), film 5 van 12 |
| Niveau | havo + vwo; vwo-blokken s08 (orthosympathisch/parasympathisch, adrenaline, cortisol) en s27 (nervus vagus, hartritmevariabiliteit, baroreflex) |
| Versie / datum | 1.1 · 20 oktober 2026 (1.0 · 15 oktober 2026) |
| Prompt | onbekend · gemaakt 20 okt |
| Stem / model | Roos (ElevenLabs eleven_v4, voice 7qdUFMklKPaaAVMsBTBt), één take per alinea, flow 7hVkaiVHzsXLtRvQMaIA; respelling co-regulatie → ko-regulatie; amygdala sinds 20 okt in gewone spelling (zie `uitspraak.md`) |
| Duur | spraak 7:03 (vwo) / 6:00 (havo); speeltijd met kaarten en vragen ± 8 min (vwo 8:05, havo 7:02; Vragen uit 7:02 / 6:00) |
| Beeldstijl | Part C: Schema |
| Personages | Bilal (castboek); ouder en peuter als eigen figuurtjes (uit film 4) |
| Audio-opslag | 13 losse mp3's in audio/ (s01, s04, s05, s07, s08, s21–s24, s26, s27, s09, s10) |
| Herkomst | Hoofdengine, werkmap `hw/gd5`; gebouwd met Claude op verzoek van Kamiel (vervolg op Hechting) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | Bilal met controller, scherm telt af naar GAME OVER, bonkend hart, rood gezicht. q02 (antwoord in H2) |
| H1 Waarom we emoties hebben | s04 | Lichaam (hart, longen, spieren), angst/boosheid; brein met amygdala (alarm) en prefrontale cortex (rem); schematische curven tienerbrein |
| H2 Wat kun je doen? | s05, q06, s07, s08 (vwo) | Vier stappen met strategieën; proef groep A (onderdrukken) en B (herwaarderen); balkjes; benoemen in de hersenscanner; Bilal met gedachtewolk en 'kunnen kiezen'; vwo-schema autonoom zenuwstelsel en hormonen, ademcurve |
| H3 Eerst je adem (20 okt) | s21, s22, s23, s24, q25, s26, s27 (vwo) | Bilal met bonkend hart, brein onder stress (prefrontale cortex dimt), balkjes herwaarderen zonder/na stress; spanningsgolf die met langzaam ademen sneller zakt onder 'ruimte om te kiezen'; ademen bij de stap 'reactie' maakt ruimte voor de andere stappen; ademcirkel om mee te doen (in 4, uit 6, twee keer) en 'de zucht'; vraag q25 (400 volwassenen, langzaam vs gewoon tempo); balkjes stress voor/na; vwo: adem- en hartslaglijn (hartritmevariabiliteit), baroreflexketen |
| H4 Eerst samen, dan zelf | s09 | Ouder wiegt peuter (co-regulatie, veilige haven); samen → zelf; Bilal met appje van een vriend; volwassenen ook |
| Recap | s10 | Vijf panelen: alarm en rem, vier stappen, onderdrukken of herwaarderen, eerst de adem, eerst samen dan zelf |
| Eindkaart | s11 | vier regels |

## Vragen (allemaal antwoord b)
- q02: wat helpt Bilal? a wegdrukken · **b benoemen en anders bekijken** · c meteen een nieuw potje
- q06: groep die niets mocht laten merken? a rustiger · **b buitenkant minder, lichaam sterker** · c geen verschil
- q25: 400 volwassenen, een maand langzaam (6/min) of gewoon tempo ademen; welke groep minder stress? a langzaam · **b allebei ongeveer evenveel** · c geen van beide

## Begrippen
emotie, amygdala, prefrontale cortex, emotieregulatie, herwaarderen, onderdrukken, langzaam ademen, zucht (cyclisch zuchten), co-regulatie, orthosympathisch/parasympathisch (vwo), hartritmevariabiliteit (vwo), baroreflex (vwo) — zie `film.json` → glossary.

## Docentdeel
In `sections.html`: 6 checkvragen (alarm en rem, vier stappen bij Noors presentatie, proef van Gross met controlegroep, eerst ademen dan kiezen, vwo: adrenaline vs cortisol, vwo: adem en hartslag), hoe de film het uitlegt, achtergrond (vereenvoudiging amygdala/PFC, dual-systems model en kritiek, Gross 1998, Lieberman 2007, Gross & John 2003, Webb 2012, Bonanno, Coan 2006, ademhaling), leerdoelen, lessuggesties.

## Waar wat in de HTML zit (films/gedrag/5-emotieregulatie.html, stand 20 okt 2026)
- regel 71: sitebalk (← Terug naar Gedrag)
- regel 102: checkvragen en docentdeel (uit `sections.html`)
- regel 166: `window.FILMDATA`
- regel 1279: `persoon()` uit lib_cast.js (Bilal)
- regel 1499: `brein()` (amygdala-alarm, prefrontale cortex, rempijl, `dim` = PFC zwakker); daarna `lijf()`, `balk()`, `STAP` (regel 1516)
- regel 1521: hoofdstuk-3-tekeningen: `ademCirkel()` (v 0–1, fase in/uit, tel), `golf()` (spanningsgolf), `ademGolfje()`, `mensjes()`
- regel 1534: `const SCENES` (title, s01 … s08, s21 … s27, s09, s10); regel 1611 e.v. hoofdstuk 3; regel 1713 recap (vijf panelen)
- regel 1726 e.v.: speler (`buildTimeline`, `vwoCuts`, `antwCuts`, `knipMarge`/`knipCheck`, vragen- en snelheidsknop)

## Hoe je de film aanpast
Werkmap opzetten: kopieer `bron/` naar `hw/gd5` (scenes.js uit `src/`, `words/` = `stem/woordtijden/`, `film/5-emotieregulatie/audio/` = `../audio/`), engine = `src/*.js` + `bouw/*`. Dan:
- tekst: `script_v3.md` aanpassen (sinds 20 okt; v2 is de oude versie) → `python3 engine/make_segments.py gd5 script_v3.md` → **`cd gd5 && python3 bron/bouw/remap.py`** (staat in `bron/bouw/`; houdt s09/s10/s11 vast en geeft hoofdstuk 3 de id's s21–s27; pas de lijst aan als je segmenten toevoegt) → alleen gewijzigde alinea's opnieuw inspreken (Roos, eleven_v4, één take) → Scribe (connect_from = de TTS-node) → `engine/align.py` → `python3 film.py` → `engine/build_data.py gd5` → `engine/build.py gd5` → `bash pack.sh gd5 5-emotieregulatie gedrag`.
- beeld: alleen `scenes.js` → `engine/build.py gd5` → pack. Let op deelwoorden: 'andere' vindt ook 'veranderen', 'zelf' ook 'zichzelf', 'stap' ook 'stappen'.

## Aandachtspunten
- Uitspraakwachtlijst: co-regulatie (ko-regulatie), orthosympathische, parasympathische, cortisol, 'close'.
- De balkjes en curven zijn schematisch (geen echte meetwaarden).

## Wijzigingen
- 1.0 (15 okt 2026): eerste versie. Script na één gecombineerde review (zie `reviews/review_v1.md`).

## Wijziging 15 okt 2026

Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen. `label()` tekent geen lijntje en stip meer; de nieuwe `naamBij(ctx, naam, meta, x, y, alpha, align, kleur)` zet de naam (met donkere rand rond de letters) direct naast of op het onderdeel, en `label()` gebruikt de richting ax,ay → lx,ly alleen nog om te bepalen aan welke kant de naam staat (zelfde functies als Celorganellen; ook in `bron/src/lib.js`). De gedragsfilms gebruiken vooral `tag`/`regel`/`chip`; geen scène toont `label()`. Alleen de functie is vervangen; geen andere wijslijnen gevonden. In de gedeelde maag-bypass-tekening (`bypassSchema`, lib_voeding) staan 'alvleesklier' en 'dunne darm' nu met `naamBij` vast naast het orgaan.

## Wijziging 20 okt 2026

Uitspraak na de uitspraaktest van 18 okt: stem-invoer amígdala → amygdala (gewone spelling), regel uit `uitspraak_film.json` gehaald. Alinea's s04, s07 en s10 opnieuw ingesproken (Roos, eleven_v4, 1 take per alinea, flow 7hVkaiVHzsXLtRvQMaIA; 2.142 credits TTS + Scribe voor de woordtijden). Alleen de mp3's in `audio/` en de woordtijden van die alinea's in `window.FILMDATA` zijn vervangen; beeld, speler en de rest van de film ongewijzigd. Spraak 4:33 → 4:34.

## Wijziging 20 okt 2026 — nieuw hoofdstuk 3 'Eerst je adem' (v1.1)

Kamiel: "Ik wil dieper ingaan op technieken zoals ademhalingstechnieken. Zelf heb ik het gevoel dat je dan net de emotie kunt laten zakken, waardoor je ook meer tijd hebt voor andere strategieën. Laten we sowieso dieper de literatuur in duiken."

**Wat er nieuw is**
- Hoofdstuk 3 (± 2 min havo, ± 2,6 min vwo) tussen 'Wat kun je doen?' en 'Eerst samen, dan zelf' (nu H4). Segmenten s21 (stress maakt herwaarderen moeilijk; proef Raio), s22 (langzaam ademen ± 6/min, lange uitademing; golf zakt; ademen = stap reactie, maakt ruimte voor de andere stappen), s23 ('probeer het zelf': ademcirkel, in 4 / uit 6, twee keer, en de zucht), s24 + q25 (vraag: proef met 400 volwassenen, Fincham e.a. 2023), s26 (antwoord B + nuance: geen wondermiddel, wel een eerste stap), s27 vwo (nervus vagus, hartritmevariabiliteit, baroreflex; correlatie ≠ oorzaak).
- **s23 tempo**: de TTS telde ± 0,85 s per tel. `bron/bouw/adem_tempo.py` voegt stilte in de pauzes in zodat elke tel 1 s duurt (in ≈ 4 s, uit 6 s) en verschuift de woordtijden mee. Opnieuw maken: `python3 adem_tempo.py <tts.mp3> <scribe-words.json> <uit.wav> <uit-words.json>` en dan `redo_local.py` met die bestanden. De ademcirkel volgt de woorden ('in'/'uit' 1 en 2).
- **Recap s10** opnieuw ingesproken met een zin over ademen; vijf panelen. **Eindkaart** vierde regel. **s04 en s07** opnieuw ingesproken met amygdala in gewone spelling (goedgekeurd in de uitspraaktest van 18 okt; stond in `hw/herinspreken.json`). s07: ondertitel "Antwoord B." en "Daar was B het beste antwoord" (stem blijft "bee").
- Begrippen + flipkaarten: langzaam ademen, zucht (cyclisch zuchten), vwo: hartritmevariabiliteit, baroreflex. Geen `oefenen.json` bij deze film (dus niets aangepast).
- Docentdeel: checkvraag 4 (eerst ademen, dan kiezen) en 6 (vwo, adem en hartslag); tabel 'hoe de film het uitlegt'; achtergrond met bronnen (hieronder); leerdoelen; lessuggestie (klassikale ademoefening met hartslag tellen).
- Duur in index.html 6 → 8 min; teller.py gedraaid. REVIEW: nog bekijken.

**Stem**: Roos (eleven_v4), één take per alinea, flow B6T2bDxsChWVXh8fuYNA. Nodes/generaties staan in `stem/takes.json` en `stem/gen.json` (heropname-reden per alinea). TTS-credits: s04 911, s07 751, s10 594, s21 266, s22 372, s23 263, s24 235, s26 286, s27 499 (samen 4177); Scribe meldde 0 credits per transcript.
**Uitspraak**: gewone spelling (v4-les uit de uitspraaktest). Wachtlijst in `uitspraak.md`: nervus vagus, baroreflex, hartritmevariabiliteit, drukzintuigen, slagaders, gestrest, 'de zucht'.

**Literatuur (gecontroleerd 20 okt 2026)**
- Gross, J. J. (1998). The emerging field of emotion regulation: an integrative review. *Review of General Psychology*, 2, 271–299; Gross, J. J. (2015). Emotion regulation: current status and future prospects. *Psychological Inquiry*, 26(1), 1–26. Procesmodel: situatieselectie/-modificatie, aandachtsinzet, cognitieve verandering, responsmodulatie (ademregulatie = responsmodulatie).
- Raio, C. M., Orederu, T. A., Palazzolo, L., Shurick, A. A., & Phelps, E. A. (2013). Cognitive emotion regulation fails the stress test. *PNAS*, 110(37), 15139–15144. doi:10.1073/pnas.1305706110 — na acute stress geen vermindering van geconditioneerde angst door herwaarderen (s21).
- Arnsten, A. F. T. (2009). Stress signalling pathways that impair prefrontal cortex structure and function. *Nature Reviews Neuroscience*, 10, 410–422 — mechanisme: catecholaminen verzwakken PFC, versterken amygdala.
- Sheppes, G., Scheibe, S., Suri, G., & Gross, J. J. (2011). Emotion-regulation choice. *Psychological Science*, 22(11), 1391–1396 — bij hoge intensiteit kiezen mensen afleiding, bij lage herwaarderen.
- Zaccaro, A., Piarulli, A., Laurino, M., e.a. (2018). How breath-control can change your life: a systematic review on psycho-physiological correlates of slow breathing. *Frontiers in Human Neuroscience*, 12, 353. doi:10.3389/fnhum.2018.00353 — 15 studies, < 10/min: meer HRV/RSA, alfa-EEG, minder angst/arousal/boosheid; beperkingen: geen RCT's, kleine groepen, heterogeen.
- Laborde, S., Allen, M. S., Borges, U., e.a. (2022). Effects of voluntary slow breathing on heart rate and heart rate variability: a systematic review and a meta-analysis. *Neuroscience & Biobehavioral Reviews*, 138, 104711. doi:10.1016/j.neubiorev.2022.104711 — 223 studies: vagaal gemedieerde HRV omhoog tijdens, direct na en na meerdere sessies.
- Lehrer, P. M., & Gevirtz, R. (2014). Heart rate variability biofeedback: how and why does it work? *Frontiers in Psychology*, 5, 756. doi:10.3389/fpsyg.2014.00756 — resonantie bij ± 0,1 Hz (6/min), baroreflex, RSA (s27).
- Thayer, J. F., & Lane, R. D. (2009). Claude Bernard and the heart–brain connection: further elaboration of a model of neurovisceral integration. *Neuroscience & Biobehavioral Reviews*, 33(2), 81–88 — hoge HRV hangt samen met betere (prefrontale) regulatie; correlationeel.
- Balban, M. Y., Neri, E., Kogon, M. M., e.a. (2023). Brief structured respiration practices enhance mood and reduce physiological arousal. *Cell Reports Medicine*, 4(1), 100895. — RCT op afstand, n = 108, 5 min/dag, 28 dagen; cyclic sighing gaf meer positieve stemming dan mindfulness; angst daalde in alle groepen evenveel; verkennend, achteraf geregistreerd, geen niets-doen-groep, zelfrapportage (de 'zucht' in s23).
- Fincham, G. W., Strauss, C., Montero-Marin, J., & Cavanagh, K. (2023). Effect of breathwork on stress and mental health: a meta-analysis of randomised-controlled trials. *Scientific Reports*, 13, 432. — kleine tot middelgrote effecten, matig risico op bias.
- Fincham, G. W., Strauss, C., & Cavanagh, K. (2023). Effect of coherent breathing on mental health and wellbeing: a randomised placebo-controlled trial. *Scientific Reports*, 13, 22141. doi:10.1038/s41598-023-49279-8 — n = 400, 4 weken, 10 min/dag, 5,5/min vs nep-ademen 12/min: geen verschil (vraag q25).
- Xiong, S., Peng, M., Zhao, W., e.a. (2025). Slow-paced breathing enhancing emotional control accompanied with the change of the ~0.1 Hz heartbeat evoked EEG. *International Journal of Clinical and Health Psychology*, 25(2), 100571. doi:10.1016/j.ijchp.2025.100571 — 4 s in / 6 s uit verbeterde emotionele controle (approach-avoidance), n = 37 mannen.
- Lieberman, M. D., Eisenberger, N. I., Crockett, M. J., e.a. (2007). Putting feelings into words. *Psychological Science*, 18(5), 421–428 (affect labeling; al in H2).

**Klopt Kamiels idee ('eerst de emotie laten zakken, dan meer tijd voor andere strategieën')?** Plausibel en in lijn met de mechanismen: stress verzwakt juist de prefrontale functies die herwaarderen nodig heeft (Raio 2013, Arnsten 2009), bij hoge intensiteit lukt herwaarderen minder (Sheppes 2011), en langzaam ademen verlaagt de arousal en verhoogt vagale HRV (Laborde 2022, Zaccaro 2018). Genuanceerd: een direct experiment 'eerst ademen → beter herwaarderen' is er nauwelijks (alleen indirect, Xiong 2025); de effecten op ervaren stress zijn klein en in een goed gecontroleerde proef niet groter dan een nep-ademoefening (Fincham 2023), dus aandacht en verwachting spelen mee. Daarom zegt de film 'kan' en 'geen wondermiddel, wel een handige eerste stap'.

**Aandachtspunten**
- Kamiel kan de zin "Ademen hoort bij de stap reactie, maar het maakt ruimte voor de andere stappen" beoordelen: in Gross' model is ademen responsmodulatie, maar het helpt praktisch vooral als opstap.
- Balkjes en golven in H3 zijn schematisch (geen meetwaarden); de bronnen staan klein in beeld.
