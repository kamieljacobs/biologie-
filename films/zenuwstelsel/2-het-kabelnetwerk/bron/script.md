# Het kabelnetwerk — script

Bron: gereconstrueerd uit de scriptdata in de gepubliceerde HTML (2026-10-12): `window.FILM.timing[<id>].phrases` (de ondertitelfrasen; identiek aan `segments[].text` en aan het transcript op de pagina). Stem-invoer met respellings (uitspraaklijst) staat niet in de HTML; de tekst hieronder is de ondertiteltekst.

Tijden in de kop van elk segment zijn filmtijd (mastertijd van de speler, zonder wachttijd bij de vragen); de tijden `[m:ss.s]` vóór elke regel zijn de begintijden van de frase **binnen het audiofragment** (zoals in `timing[<id>].phrases[].t0`).

## 1. s00 — cold open
Audio: blob 001.mp3 (sleutel `s00` in FILM_AUDIO) · 0:00–0:11 (11,5 s mp3; timing.duration 11,424 s)
Scène: `world` (sceneWorld())

[0:00.0] Midden in de nacht loop je naar de keuken.
[0:02.4] Bam.
[0:02.6] Je teen tegen de tafelpoot.
[0:04.1] Eerst voel je de stoot.
[0:05.3] Dan,
[0:05.8] bijna een seconde later,
[0:07.1] de pijn.
[0:07.7] Twee berichten van één klap.
[0:09.4] Hoe kan het dat ze niet tegelijk aankomen?

> Beeld (cues uit `plan.cues`, op het woord): beat „klap” op ‘Bam’; beat „stoot” op ‘stoot’; beat „pijn” op ‘pijn’; beat „vraag” op ‘aankomen’

*[titelkaart 5,0 s op 0:11]*

### Hoofdstuk 1 · De zenuwcel
*[hoofdstukkaart 3,0 s op 0:16]*

## 2. q1 — voorspelvraag 1
Audio: blob 002.mp3 (sleutel `q1` in FILM_AUDIO) · 0:19–0:30 (11,5 s mp3; timing.duration 11,517 s)
Scène: `question` (sceneQuestion())

[0:00.0] Voorspel.
[0:00.8] Een impuls loopt door een neuron.
[0:02.6] Waar begint hij,
[0:03.5] en welke kant gaat hij op?
[0:04.8] Bij de dendrieten,
[0:05.7] richting de eindknopjes?
[0:07.0] Bij de eindknopjes,
[0:08.0] richting het cellichaam?
[0:09.2] Of overal tegelijk,
[0:10.5] beide kanten op?

> Vraag 1: Waar begint een impuls in een neuron, en welke kant gaat hij op?
> A. Bij de dendrieten, richting de eindknopjes  ← juist
> B. Bij de eindknopjes, richting het cellichaam
> C. Overal tegelijk, beide kanten op

*[aftelling 8,0 s (`cd1`) — in Leerling-modus wacht de film hier op een antwoord]*

## 3. a1 — antwoord op vraag 1
Audio: blob 003.mp3 (sleutel `a1` in FILM_AUDIO) · 0:38–1:14 (35,6 s mp3; timing.duration 35,527 s)
Scène: `micro` (sceneMicro → microNeuron())

[0:00.0] Het goede antwoord is A.
[0:01.4] We zoomen in op je been.
[0:02.8] In een zenuw liggen duizenden uitlopers naast elkaar.
[0:05.2] We volgen er één,
[0:06.5] tot aan de cel waar hij bij hoort.
[0:07.8] Dit is een neuron.
[0:08.8] De korte uitlopers heten dendrieten.
[0:10.5] Daar komt informatie binnen.
[0:11.8] Het cellichaam heeft de kern.
[0:13.3] De lange uitloper is het axon.
[0:15.0] Die kan wel een meter lang zijn:
[0:17.0] van je teen tot in je ruggenmerg.
[0:19.1] Om het axon zit een vettige laag:
[0:21.0] de myelineschede.
[0:21.8] Die wordt gemaakt door cellen van Schwann.
[0:23.8] Tussen die cellen zitten smalle insnoeringen.
[0:25.8] Aan het eind:
[0:26.7] de eindknopjes.
[0:27.3] Een impuls begint bij de dendrieten en loopt naar de eindknopjes.
[0:30.4] Nooit andersom.
[0:31.6] Waarom dat zo is,
[0:32.5] zie je straks.

> Beeld (cues uit `plan.cues`, op het woord): beat „lens” op ‘zoomen’; term „zenuw” op ‘zenuw’; beat „volg” op ‘één’; term „neuron” op ‘neuron’; term „dendrieten” op ‘dendrieten’; term „cellichaam” op ‘cellichaam’; term „axon” op ‘axon’; number „1 m: teen → ruggenmerg” op ‘meter’; term „myelineschede” op ‘myelineschede’; term „cellen van Schwann” op ‘Schwann’; term „insnoeringen” op ‘insnoeringen’; term „eindknopjes” op ‘eindknopjes’; beat „impuls” op ‘begint’; beat „nooit” op ‘andersom’

### Hoofdstuk 2 · Rust
*[hoofdstukkaart 3,0 s op 1:14]*

## 4. s21 — uitleg
Audio: blob 004.mp3 (sleutel `s21` in FILM_AUDIO) · 1:17–1:49 (32,5 s mp3; timing.duration 32,508 s)
Scène: `micro` (sceneMicro → microRust())

[0:00.0] Eerst een neuron dat niets doet.
[0:01.8] Kijk naar het membraan.
[0:02.9] Buiten de cel zit veel natrium.
[0:04.7] Binnen zit veel kalium.
[0:06.0] Dat is geen toeval.
[0:07.1] In het membraan zit een pomp.
[0:08.6] Elke slag duwt hij drie natriumionen naar buiten en twee kaliumionen naar binnen.
[0:12.6] Daar gebruikt hij energie voor,
[0:14.4] uit ATP.
[0:15.1] Er zijn ook kanaaltjes die altijd openstaan voor kalium.
[0:17.8] Daardoor lekt kalium naar buiten.
[0:19.1] Positieve lading verlaat de cel.
[0:20.4] Zet er een voltmeter op.
[0:22.0] Binnen is het negatief ten opzichte van buiten:
[0:24.5] ongeveer min zeventig millivolt.
[0:25.7] Dit heet het rustpotentiaal.
[0:27.4] Het neuron is als een opgeladen batterij.
[0:29.2] Klaar om te vuren.

> Beeld (cues uit `plan.cues`, op het woord): beat „membraan” op ‘membraan’; term „Na⁺ buiten” op ‘natrium’; term „K⁺ binnen” op ‘kalium’; term „pomp: natrium-kaliumpomp” op ‘pomp’; number „3 Na⁺ uit, 2 K⁺ in” op ‘drie’; term „ATP” op ‘ATP’; term „kaliumlekkanaal” op ‘kanaaltjes’; beat „lek” op ‘lekt’; beat „meter” op ‘voltmeter’; number „−70 mV” op ‘zeventig’; term „rustpotentiaal” op ‘rustpotentiaal’

## 5. q2 — voorspelvraag 2
Audio: blob 005.mp3 (sleutel `q2` in FILM_AUDIO) · 1:49–2:02 (12,4 s mp3; timing.duration 12,399 s)
Scène: `question` (sceneQuestion())

[0:00.0] Voorspel.
[0:00.8] Een gif legt de natrium-kaliumpomp stil.
[0:03.2] Wat gebeurt er op den duur met het rustpotentiaal?
[0:05.9] Het verschil wordt langzaam kleiner?
[0:07.5] Het verschil wordt groter?
[0:08.8] Of er verandert niets,
[0:10.1] de pomp was alleen nodig om op te starten?

> Vraag 2: Een gif legt de natrium-kaliumpomp stil. Wat gebeurt er op den duur met het rustpotentiaal?
> A. Het verschil wordt langzaam kleiner  ← juist
> B. Het verschil wordt groter
> C. Er verandert niets

*[aftelling 8,0 s (`cd2`) — in Leerling-modus wacht de film hier op een antwoord]*

## 6. a2 — antwoord op vraag 2
Audio: blob 006.mp3 (sleutel `a2` in FILM_AUDIO) · 2:10–2:21 (11,3 s mp3; timing.duration 11,239 s)
Scène: `micro` (sceneMicro → microLeeg())

[0:00.1] Het goede antwoord is A.
[0:01.2] Zonder pomp lekt kalium naar buiten,
[0:02.6] en bij elke impuls komt natrium naar binnen.
[0:04.8] Niemand ruimt op.
[0:06.0] Het verschil tussen binnen en buiten wordt langzaam kleiner.
[0:09.3] De batterij loopt leeg.

> Beeld (cues uit `plan.cues`, op het woord): beat „pomp uit” op ‘lekt’; beat „vlak” op ‘kleiner’

### Hoofdstuk 3 · De impuls
*[hoofdstukkaart 3,0 s op 2:21]*

## 7. s31 — uitleg
Audio: blob 007.mp3 (sleutel `s31` in FILM_AUDIO) · 2:24–3:11 (46,8 s mp3; timing.duration 46,811 s)
Scène: `micro` (sceneMicro → microImpuls())

[0:00.0] Nu komt er een prikkel.
[0:00.9] Het membraan wordt een beetje minder negatief.
[0:03.4] Even niets.
[0:03.8] Maar bij ongeveer min vijfenvijftig millivolt gebeurt er iets.
[0:07.3] Dat is de drempelwaarde.
[0:08.2] Natriumkanalen schieten open.
[0:09.4] Natrium stroomt naar binnen.
[0:11.2] Binnen wordt het positief,
[0:12.6] tot boven nul.
[0:13.9] Dit heet depolarisatie.
[0:15.4] Dan sluiten de natriumkanalen.
[0:16.6] Kaliumkanalen gaan open.
[0:18.3] Kalium stroomt naar buiten.
[0:19.8] De binnenkant wordt weer negatief:
[0:21.3] repolarisatie.
[0:22.5] Even schiet het zelfs door,
[0:24.1] onder de min zeventig:
[0:25.3] hyperpolarisatie.
[0:26.6] Dan herstelt de pomp de rust.
[0:27.9] Dit hele golfje heet een actiepotentiaal.
[0:29.6] Het duurt maar een paar duizendste seconde.
[0:32.1] En dit stukje membraan prikkelt het volgende stukje.
[0:34.5] Zo rolt de actiepotentiaal over het axon.
[0:36.8] Terug kan hij niet:
[0:37.8] het stukje erachter is even niet prikkelbaar.
[0:40.3] Dat heet de refractaire periode.
[0:41.9] Daarom loopt een impuls maar één kant op.

> Beeld (cues uit `plan.cues`, op het woord): beat „prikkel” op ‘prikkel’; number „−55 mV” op ‘vijfenvijftig’; term „drempelwaarde” op ‘drempelwaarde’; beat „Na open” op ‘Natriumkanalen’; term „depolarisatie” op ‘depolarisatie’; beat „K open” op ‘Kaliumkanalen’; term „repolarisatie” op ‘repolarisatie’; term „hyperpolarisatie” op ‘hyperpolarisatie’; term „actiepotentiaal” op ‘actiepotentiaal’; number „≈ 1–2 ms” op ‘duizendste’; beat „golf” op ‘rolt’; term „refractaire periode” op ‘refractaire’

## 8. q3 — voorspelvraag 3
Audio: blob 008.mp3 (sleutel `q3` in FILM_AUDIO) · 3:11–3:19 (7,9 s mp3; timing.duration 7,895 s)
Scène: `question` (sceneQuestion())

[0:00.0] Voorspel.
[0:00.8] Je drukt harder op je huid.
[0:02.3] Wat verandert er aan de impulsen?
[0:04.1] Ze worden groter?
[0:05.1] Er komen er meer per seconde?
[0:06.8] Of ze worden langer?

> Vraag 3: Je drukt harder op je huid. Wat verandert er aan de impulsen?
> A. Ze worden groter
> B. Er komen er meer per seconde  ← juist
> C. Ze worden langer

*[aftelling 8,0 s (`cd3`) — in Leerling-modus wacht de film hier op een antwoord]*

## 9. a3 — antwoord op vraag 3
Audio: blob 009.mp3 (sleutel `a3` in FILM_AUDIO) · 3:27–3:45 (18,6 s mp3; timing.duration 18,522 s)
Scène: `micro` (sceneMicro → microAon())

[0:00.0] Het goede antwoord is B.
[0:01.9] Een actiepotentiaal is altijd even groot.
[0:04.1] Of hij komt helemaal,
[0:04.9] of hij komt niet.
[0:06.3] Dat heet alles-of-niets.
[0:08.1] Een sterkere prikkel geeft dus geen grotere impuls.
[0:11.1] Hij geeft meer impulsen per seconde.
[0:13.1] De sterkte zit in de frequentie.

> Beeld (cues uit `plan.cues`, op het woord): beat „traces” op ‘groot’; term „elke impuls even groot (alles-of-niets)” op ‘alles-of-niets’; term „frequentie” op ‘seconde’

### Hoofdstuk 4 · Snel en langzaam
*[hoofdstukkaart 3,0 s op 3:45]*

## 10. q4 — voorspelvraag 4
Audio: blob 010.mp3 (sleutel `q4` in FILM_AUDIO) · 3:48–4:01 (12,2 s mp3; timing.duration 12,167 s)
Scène: `question` (sceneQuestion())

[0:00.1] Voorspel.
[0:00.9] Twee axonen,
[0:01.9] even lang.
[0:02.8] Eén is dik en heeft myeline.
[0:04.4] Eén is dun en heeft geen myeline.
[0:06.4] Welke impuls komt het eerst aan?
[0:08.2] De dikke met myeline?
[0:09.3] De dunne zonder myeline?
[0:10.7] Of ze komen tegelijk aan?

> Vraag 4: Twee even lange axonen: dik met myeline, dun zonder myeline. Welke impuls komt het eerst aan?
> A. De dikke met myeline  ← juist
> B. De dunne zonder myeline
> C. Ze komen tegelijk aan

*[aftelling 8,0 s (`cd4`) — in Leerling-modus wacht de film hier op een antwoord]*

## 11. a4 — antwoord op vraag 4
Audio: blob 011.mp3 (sleutel `a4` in FILM_AUDIO) · 4:09–4:53 (44,7 s mp3; timing.duration 44,629 s)
Scène: `micro` (sceneMicro → microRace())

[0:00.1] Het goede antwoord is A.
[0:01.7] Kijk naar de race.
[0:02.7] In het dunne axon zonder myeline prikkelt elk stukje membraan het volgende.
[0:06.8] Stap voor stap.
[0:07.8] Ongeveer één meter per seconde.
[0:09.6] In het axon met myeline kan dat niet.
[0:11.8] De vettige laag laat geen ionen door.
[0:14.1] Alleen bij de insnoeringen kan een actiepotentiaal ontstaan.
[0:17.4] De impuls springt van insnoering naar insnoering.
[0:19.9] Dat heet sprongsgewijze geleiding.
[0:21.3] Tot wel honderdtwintig meter per seconde.
[0:23.7] En hoe dikker het axon,
[0:25.2] hoe sneller.
[0:26.0] Terug naar je teen.
[0:27.2] De aanraking reist over dikke vezels met myeline.
[0:29.7] Ongeveer vijftig meter per seconde.
[0:31.3] Eén meter naar je ruggenmerg:
[0:32.8] twintig milliseconden.
[0:34.2] De doffe pijn reist over dunne vezels zonder myeline.
[0:36.8] Ongeveer één meter per seconde.
[0:38.3] Dezelfde meter:
[0:39.5] een hele seconde.
[0:40.9] Dat is je puzzel.
[0:42.1] Twee kabels,
[0:42.9] twee snelheden.

> Beeld (cues uit `plan.cues`, op het woord): beat „start” op ‘race’; number „≈ 1 m/s” op ‘één’; beat „spring” op ‘insnoeringen’; term „sprongsgewijze geleiding” op ‘sprongsgewijze’; number „tot 120 m/s” op ‘honderdtwintig’; beat „dik” op ‘dikker’; beat „been” op ‘teen’; number „≈ 50 m/s” op ‘vijftig’; number „20 ms” op ‘twintig’; beat „pijn” op ‘pijn’; number „≈ 1 s” op ‘seconde’

### Hoofdstuk 5 · Van prikkel naar impuls
*[hoofdstukkaart 3,0 s op 4:53]*

## 12. q5 — voorspelvraag 5
Audio: blob 012.mp3 (sleutel `q5` in FILM_AUDIO) · 4:56–5:06 (9,4 s mp3; timing.duration 9,381 s)
Scène: `question` (sceneQuestion())

[0:00.0] Voorspel.
[0:00.8] Een drukreceptor in je huid.
[0:02.3] Waar reageert hij het makkelijkst op?
[0:04.3] Alleen op druk?
[0:05.3] Op druk en op licht?
[0:06.6] Of op elke prikkel,
[0:07.8] als die maar sterk genoeg is?

> Vraag 5: Een drukreceptor in je huid. Waar reageert hij het makkelijkst op?
> A. Alleen op druk  ← juist
> B. Op druk en op licht
> C. Op elke prikkel, als die maar sterk genoeg is

*[aftelling 8,0 s (`cd5`) — in Leerling-modus wacht de film hier op een antwoord]*

## 13. a5 — antwoord op vraag 5
Audio: blob 013.mp3 (sleutel `a5` in FILM_AUDIO) · 5:14–5:45 (31,3 s mp3; timing.duration 31,254 s)
Scène: `micro` (sceneMicro → microReceptor())

[0:00.1] Het goede antwoord is A.
[0:01.3] Nog één vraag.
[0:01.8] Hoe begint het eigenlijk?
[0:03.2] Een receptor in je huid is een cel met een gevoelig membraan.
[0:05.9] Druk vervormt dat membraan.
[0:07.0] Daardoor gaan kanaaltjes open.
[0:08.9] Het membraan wordt minder negatief.
[0:10.8] Zacht drukken:
[0:11.4] te weinig.
[0:12.2] Harder drukken:
[0:13.3] de drempel wordt gehaald,
[0:15.0] en er vertrekt een impuls.
[0:16.3] Harder nog:
[0:17.1] meer impulsen per seconde.
[0:18.7] Elke receptor heeft zijn eigen prikkel.
[0:21.0] Druk voor de huid,
[0:21.6] licht voor het oog.
[0:23.1] Dat heet de adequate prikkel.
[0:24.7] Een prikkel komt dus nooit zelf de zenuw in.
[0:26.8] De receptor vertaalt hem naar impulsen.

> Beeld (cues uit `plan.cues`, op het woord): term „receptor” op ‘receptor’; beat „druk” op ‘vervormt’; beat „zacht” op ‘Zacht’; beat „hard” op ‘Harder’; beat „harder” op ‘Harder’; term „adequate prikkel” op ‘adequate’; beat „vertaal” op ‘vertaalt’

### Hoofdstuk 6 · Samenvatting
*[hoofdstukkaart 3,0 s op 5:45]*

## 14. s70 — samenvatting
Audio: blob 014.mp3 (sleutel `s70` in FILM_AUDIO) · 5:48–6:12 (24,4 s mp3; timing.duration 24,334 s)
Scène: `recap` (sceneRecap())

[0:00.1] Terug naar je teen.
[0:01.1] De klap vervormt receptoren in je huid.
[0:03.3] Ze halen de drempel.
[0:04.5] Natriumkanalen open,
[0:05.5] kaliumkanalen open:
[0:07.0] een actiepotentiaal.
[0:07.7] Altijd even groot,
[0:08.8] en altijd één kant op.
[0:10.0] De aanraking neemt de snelle kabel:
[0:11.4] dik,
[0:11.8] met myeline,
[0:12.7] springend van insnoering naar insnoering.
[0:14.4] Twintig milliseconden.
[0:15.6] De pijn neemt de langzame kabel:
[0:17.6] dun,
[0:17.7] zonder myeline,
[0:18.2] stap voor stap.
[0:19.3] Een seconde.
[0:19.6] Eén klap,
[0:20.5] twee kabels,
[0:20.8] twee aankomsttijden.

> Beeld (cues uit `plan.cues`, op het woord): recap „receptor” op ‘receptoren’; recap „drempel” op ‘drempel’; recap „actiepotentiaal” op ‘actiepotentiaal’; recap „alles-of-niets” op ‘groot’; recap „één richting” op ‘kant’; recap „snel” op ‘snelle’; recap „20 ms” op ‘Twintig’; recap „langzaam” op ‘langzame’; recap „1 s” op ‘seconde’

*[eindkaart 8,0 s op 6:12: “Volgende film: De spleet — hoe het bericht van de ene cel naar de andere springt (🍞 het brood, ☕ de koffie, 🎧 het nummer, 🚲 de zijwieltjes)”]*

---
Controle: 14 gesproken segmenten = 14 audiofragmenten in FILM_AUDIO = 14 mp3-blobs. Som audio (ffprobe) 5:10 (310,2 s); som timing.duration 309,6 s (per fragment ±0,05 s korter dan de mp3, encoderstilte). Filmduur in de speler incl. kaarten en aftellingen: 6:20 (380,6 s).
