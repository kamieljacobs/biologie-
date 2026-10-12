# Leren en onthouden — script

Bron: gereconstrueerd uit de scriptdata in de gepubliceerde HTML (2026-10-12): `window.FILM.timing[<id>].phrases` (de ondertitelfrasen; identiek aan `segments[].text` en aan het transcript op de pagina). Stem-invoer met respellings (uitspraaklijst) staat niet in de HTML; de tekst hieronder is de ondertiteltekst.

Tijden in de kop van elk segment zijn filmtijd (mastertijd van de speler, zonder wachttijd bij de vragen); de tijden `[m:ss.s]` vóór elke regel zijn de begintijden van de frase **binnen het audiofragment** (zoals in `timing[<id>].phrases[].t0`).

## 1. s00 — cold open
Audio: blob 001.mp3 (sleutel `s00` in FILM_AUDIO) · 0:00–0:17 (17,7 s mp3; timing.duration 17,694 s)
Scène: `world` (sceneWorld())

[0:00.0] Je bent zes.
[0:00.8] De zijwieltjes gaan eraf.
[0:02.2] Iemand houdt je zadel vast,
[0:03.5] en jij zwabbert alle kanten op.
[0:05.2] Tien jaar later fiets je naar school en klets je ondertussen met een vriendin.
[0:09.1] Uit een open raam klinken twee tonen,
[0:11.2] en je weet meteen welk nummer het is.
[0:13.0] Niemand wordt geboren met fietsen,
[0:14.6] of met een lievelingsnummer.
[0:16.0] Wat is er in je hoofd veranderd?

> Beeld (cues uit `plan.cues`, op het woord): beat „zijwieltjes eraf” op ‘zijwieltjes’; beat „zadel” op ‘zadel’; beat „zwabbert” op ‘zwabbert’; beat „tien jaar later” op ‘Tien’; beat „kletsen” op ‘klets’; beat „open raam” op ‘raam’; beat „twee tonen” op ‘tonen’; beat „herkend” op ‘meteen’; beat „lens” op ‘hoofd’

*[titelkaart 5,0 s op 0:17]*

### Hoofdstuk 1 · Sterker door samen
*[hoofdstukkaart 3,0 s op 0:22]*

## 2. q1 — voorspelvraag 1
Audio: blob 002.mp3 (sleutel `q1` in FILM_AUDIO) · 0:25–0:36 (10,7 s mp3; timing.duration 10,635 s)
Scène: `question` (sceneQuestion())

[0:00.0] Wat denk je?
[0:00.9] Je leert iets nieuws.
[0:01.9] Wat verandert er dan in je hersenen?
[0:03.7] Er komen nieuwe zenuwcellen bij?
[0:05.4] Bestaande verbindingen worden sterker,
[0:07.4] en er groeien nieuwe?
[0:08.5] Of je hersenen worden groter en zwaarder?

> Vraag 1: Je leert iets nieuws. Wat verandert er dan in je hersenen?
> A. Er komen nieuwe zenuwcellen bij
> B. Bestaande verbindingen worden sterker, en er groeien nieuwe  ← juist
> C. Je hersenen worden groter en zwaarder

*[aftelling 8,0 s (`cd1`) — in Leerling-modus wacht de film hier op een antwoord]*

## 3. a1 — antwoord op vraag 1
Audio: blob 003.mp3 (sleutel `a1` in FILM_AUDIO) · 0:44–1:31 (47,4 s mp3; timing.duration 47,336 s)
Scène: `micro` (sceneMicro → microSterker())

[0:00.0] Het goede antwoord is B.
[0:01.9] Er komen hooguit een paar nieuwe zenuwcellen bij.
[0:04.8] Leren zit vooral in de verbindingen:
[0:06.8] de synapsen uit film 3.
[0:08.3] Kijk naar twee cellen die vaak tegelijk actief zijn.
[0:11.1] Het eindknopje geeft glutamaat af,
[0:13.2] terwijl de volgende cel al actief is.
[0:15.3] Dan doet een speciale receptor mee.
[0:17.4] Die werkt als een toevalsdetector:
[0:19.3] hij laat alleen calcium door als beide cellen tegelijk actief zijn.
[0:23.0] Calcium stroomt het dendrietvoetje in.
[0:24.9] Het voetje bouwt extra receptoren in.
[0:27.3] Hetzelfde signaal geeft nu een grotere reactie.
[0:30.1] Dat gaat snel,
[0:31.1] binnen minuten,
[0:32.0] maar het blijft niet vanzelf.
[0:33.4] Herhaal je het vaak genoeg,
[0:34.7] dan maakt de cel nieuwe eiwitten.
[0:36.3] Het voetje wordt groter,
[0:37.6] en er groeien nieuwe voetjes bij.
[0:39.3] Dat kan maanden blijven.
[0:40.7] Cellen die samen vuren,
[0:42.3] raken met elkaar verbonden.

> Beeld (cues uit `plan.cues`, op het woord): beat „verbindingen” op ‘verbindingen’; beat „synaps” op ‘synapsen’; beat „tegelijk actief” op ‘tegelijk’; term „eindknopje” op ‘eindknopje’; term „glutamaat” op ‘glutamaat’; beat „speciale receptor” op ‘receptor’; term „toevalsdetector” op ‘toevalsdetector’; term „calcium” op ‘calcium’; term „dendrietvoetje” op ‘dendrietvoetje’; beat „extra receptoren” op ‘receptoren’; beat „grotere reactie” op ‘grotere’; number „minuten” op ‘minuten’; term „nieuwe eiwitten” op ‘eiwitten’; beat „groter voetje” op ‘groter’; beat „nieuw voetje” op ‘voetjes’; number „maanden” op ‘maanden’; term „samen vuren → verbonden” op ‘samen’

### Hoofdstuk 2 · Patronen en koppelingen
*[hoofdstukkaart 3,0 s op 1:31]*

## 4. s21 — uitleg
Audio: blob 004.mp3 (sleutel `s21` in FILM_AUDIO) · 1:34–2:05 (30,9 s mp3; timing.duration 30,853 s)
Scène: `micro` (sceneMicro → microPatroon())

[0:00.0] Een nummer is geen losse herinnering.
[0:01.8] Het zijn duizenden cellen:
[0:03.1] voor de tonen,
[0:03.9] het ritme,
[0:04.6] de stem,
[0:05.3] en waar je was toen je het hoorde.
[0:06.8] Door vaak luisteren zijn de verbindingen tussen die cellen sterker geworden.
[0:10.5] Samen vormen ze een patroon.
[0:12.2] Hoor je twee tonen,
[0:13.4] dan worden een paar cellen van dat patroon actief.
[0:16.0] Via de sterke verbindingen zetten die de rest aan.
[0:18.6] Het hele nummer is er weer.
[0:20.0] Een deel van het patroon roept het geheel op.
[0:22.5] En omdat het patroon verspreid ligt over veel cellen,
[0:25.3] verdwijnt een herinnering niet als er één cel uitvalt.

> Beeld (cues uit `plan.cues`, op het woord): beat „duizenden cellen” op ‘duizenden’; beat „tonen” op ‘tonen’; beat „ritme” op ‘ritme’; beat „stem” op ‘stem’; beat „waar je was” op ‘waar’; beat „sterker” op ‘sterker’; term „patroon” op ‘patroon’; beat „twee tonen” op ‘twee’; beat „rest aan” op ‘rest’; beat „heel nummer” op ‘hele’; term „deel → geheel” op ‘deel’; beat „cel valt uit” op ‘uitvalt’

## 5. s22 — uitleg
Audio: blob 005.mp3 (sleutel `s22` in FILM_AUDIO) · 2:05–2:40 (34,6 s mp3; timing.duration 34,598 s)
Scène: `micro` (sceneMicro → microPavlov())

[0:00.0] Zo leer je ook koppelingen die je nooit hebt gekozen.
[0:03.0] Rond het jaar 1900 liet de Russische onderzoeker Pavlov een bel klinken,
[0:07.5] vlak voordat zijn honden eten kregen.
[0:09.3] Eten is een ongeconditioneerde prikkel:
[0:11.5] het geeft vanzelf speeksel,
[0:13.1] een reflex,
[0:13.9] zoals in film 1.
[0:15.1] De bel gaf eerst geen speeksel:
[0:16.9] een neutrale prikkel.
[0:18.0] Maar bel en eten kwamen steeds samen.
[0:20.1] Na een tijdje gaf de bel alleen al speeksel.
[0:22.2] De bel was een geconditioneerde prikkel geworden.
[0:24.6] Dat heet klassieke conditionering:
[0:26.5] een reflex raakt gekoppeld aan een nieuwe prikkel.
[0:29.0] Bij jou werkt het net zo.
[0:30.5] Ruik je friet als je honger hebt,
[0:31.8] dan loopt het water je al in de mond,
[0:33.5] nog voor de eerste hap.

> Beeld (cues uit `plan.cues`, op het woord): term „Ivan Pavlov, rond 1900” op ‘Pavlov’; beat „bel” op ‘bel’; beat „eten” op ‘eten’; term „ongeconditioneerde prikkel” op ‘ongeconditioneerde’; term „neutrale prikkel” op ‘neutrale’; beat „steeds samen” op ‘steeds’; beat „bel alleen” op ‘alleen’; term „geconditioneerde prikkel” op ‘geconditioneerde’; term „klassieke conditionering” op ‘klassieke’; beat „friet” op ‘friet’

## 6. q2 — voorspelvraag 2
Audio: blob 006.mp3 (sleutel `q2` in FILM_AUDIO) · 2:40–2:52 (12,9 s mp3; timing.duration 12,817 s)
Scène: `question` (sceneQuestion())

[0:00.0] Wat denk je?
[0:00.7] Pavlov laat daarna steeds weer de bel klinken,
[0:03.0] maar geeft geen eten meer.
[0:04.3] Wat gebeurt er met het speeksel bij de bel?
[0:06.2] De hond blijft net zoveel speeksel maken?
[0:08.2] Het speeksel wordt langzaam minder?
[0:09.9] Of de hond maakt juist meer speeksel,
[0:11.7] om het eten te lokken?

> Vraag 2: Pavlov laat daarna steeds weer de bel klinken, maar geeft geen eten meer. Wat gebeurt er met het speeksel bij de bel?
> A. De hond blijft net zoveel speeksel maken
> B. Het speeksel wordt langzaam minder  ← juist
> C. De hond maakt juist meer speeksel, om het eten te lokken

*[aftelling 8,0 s (`cd2`) — in Leerling-modus wacht de film hier op een antwoord]*

## 7. a2 — antwoord op vraag 2
Audio: blob 007.mp3 (sleutel `a2` in FILM_AUDIO) · 3:00–3:20 (20,1 s mp3; timing.duration 20,012 s)
Scène: `micro` (sceneMicro → microUitdoven())

[0:00.0] Het goede antwoord is B.
[0:01.6] Komt de bel steeds zonder eten,
[0:03.5] dan wordt de reactie zwakker.
[0:05.0] Dat heet uitdoven,
[0:06.4] of extinctie.
[0:07.4] De koppeling wordt daarbij niet gewist.
[0:09.5] De hond leert er iets bij:
[0:10.7] de bel betekent nu geen eten.
[0:12.5] Daarom kan de reactie na een pauze ineens even terugkomen,
[0:15.5] wat zwakker.
[0:16.3] Ook uitdoven is dus leren.

> Beeld (cues uit `plan.cues`, op het woord): beat „zwakker” op ‘zwakker’; term „uitdoven (extinctie)” op ‘uitdoven’; beat „niet gewist” op ‘gewist’; beat „erbij geleerd” op ‘betekent’; beat „pauze” op ‘pauze’; beat „ook leren” op ‘leren’

### Hoofdstuk 3 · Twee soorten geheugen
*[hoofdstukkaart 3,0 s op 3:20]*

## 8. s31 — uitleg
Audio: blob 008.mp3 (sleutel `s31` in FILM_AUDIO) · 3:23–3:54 (30,3 s mp3; timing.duration 30,279 s)
Scène: `micro` (sceneMicro → microHenry())

[0:00.0] In het jaar 1953 werd bij een man,
[0:02.8] Henry,
[0:03.4] aan beide kanten een stuk van de slaapkwab weggehaald,
[0:06.3] tegen zware epilepsie.
[0:07.9] Daarbij verdween ook een groot deel van zijn hippocampus,
[0:10.7] een gebied diep in de slaapkwab.
[0:12.6] De aanvallen werden minder.
[0:14.0] Maar Henry kon bijna geen nieuwe herinneringen aan gebeurtenissen en feiten meer vastleggen.
[0:19.4] Na een halve minuut was een gesprek weg.
[0:21.5] Zijn jeugd herinnerde hij zich nog wel.
[0:23.6] De hippocampus legt nieuwe herinneringen aan gebeurtenissen en feiten vast,
[0:28.0] en geeft ze later door aan de schors.

> Beeld (cues uit `plan.cues`, op het woord): term „Henry Molaison (H.M.)” op ‘Henry’; beat „weggehaald” op ‘weggehaald’; term „hippocampus” op ‘hippocampus’; beat „halve minuut” op ‘minuut’; beat „jeugd” op ‘jeugd’; beat „door aan de schors” op ‘schors’

## 9. q3 — voorspelvraag 3
Audio: blob 009.mp3 (sleutel `q3` in FILM_AUDIO) · 3:54–4:07 (13,8 s mp3; timing.duration 13,746 s)
Scène: `question` (sceneQuestion())

[0:00.0] Wat denk je?
[0:00.9] Henry oefent dagenlang een moeilijke tekentaak:
[0:03.3] een ster natekenen terwijl hij alleen in een spiegel kijkt.
[0:06.6] Wordt hij beter?
[0:07.5] Nee,
[0:08.0] hij onthoudt niets?
[0:09.1] Ja,
[0:09.4] maar hij weet niet dat hij geoefend heeft?
[0:11.3] Of alleen als hij het elke dag opschrijft?

> Vraag 3: Henry oefent dagenlang een moeilijke tekentaak: een ster natekenen terwijl hij alleen in een spiegel kijkt. Wordt hij beter?
> A. Nee, hij onthoudt niets
> B. Ja, maar hij weet niet dat hij geoefend heeft  ← juist
> C. Alleen als hij het elke dag opschrijft

*[aftelling 8,0 s (`cd3`) — in Leerling-modus wacht de film hier op een antwoord]*

## 10. a3 — antwoord op vraag 3
Audio: blob 010.mp3 (sleutel `a3` in FILM_AUDIO) · 4:15–4:41 (25,8 s mp3; timing.duration 25,733 s)
Scène: `micro` (sceneMicro → microTwee())

[0:00.0] Het goede antwoord is B.
[0:01.8] Henry werd elke dag beter in spiegeltekenen.
[0:04.4] Maar elke dag zei hij dat hij het nooit eerder had gedaan.
[0:07.4] Vaardigheden lopen niet via de hippocampus.
[0:10.0] Ze lopen via de kleine hersenen,
[0:11.8] de basale kernen diep in de grote hersenen,
[0:14.2] en de motorische schors.
[0:15.7] Weten wát er is of gebeurd is,
[0:17.6] en weten hoe iets moet:
[0:18.8] dat zijn twee soorten geheugen.
[0:20.4] Fietsen hoort bij de tweede soort.

> Beeld (cues uit `plan.cues`, op het woord): beat „beter” op ‘beter’; beat „nooit eerder” op ‘nooit’; beat „niet via hippocampus” op ‘Vaardigheden’; term „kleine hersenen” op ‘kleine’; term „basale kernen” op ‘basale’; term „motorische schors” op ‘motorische’; beat „weten wat” op ‘Weten’; term „twee soorten geheugen” op ‘twee’; beat „fietsen” op ‘Fietsen’

### Hoofdstuk 4 · Oefenen en vergeten
*[hoofdstukkaart 3,0 s op 4:41]*

## 11. q4 — voorspelvraag 4
Audio: blob 011.mp3 (sleutel `q4` in FILM_AUDIO) · 4:44–4:54 (9,8 s mp3; timing.duration 9,752 s)
Scène: `question` (sceneQuestion())

[0:00.0] Wat denk je?
[0:00.7] Je hebt drie uur om te leren voor een toets.
[0:02.9] Wat blijft het best hangen?
[0:04.1] Drie uur op de avond ervoor?
[0:05.6] Drie keer een uur,
[0:06.5] verspreid over drie dagen?
[0:07.9] Of het maakt niet uit,
[0:09.0] uur is uur?

> Vraag 4: Je hebt drie uur om te leren voor een toets. Wat blijft het best hangen?
> A. Drie uur op de avond ervoor
> B. Drie keer een uur, verspreid over drie dagen  ← juist
> C. Het maakt niet uit: uur is uur

*[aftelling 8,0 s (`cd4`) — in Leerling-modus wacht de film hier op een antwoord]*

## 12. a4 — antwoord op vraag 4
Audio: blob 012.mp3 (sleutel `a4` in FILM_AUDIO) · 5:02–5:31 (28,6 s mp3; timing.duration 28,580 s)
Scène: `micro` (sceneMicro → microOefenen())

[0:00.0] Het goede antwoord is B.
[0:01.5] Gespreid leren werkt beter,
[0:03.3] in bijna alle onderzoeken die het vergeleken.
[0:05.6] Elke keer dat je iets na een pauze weer ophaalt,
[0:08.0] gebruik je het patroon opnieuw,
[0:09.6] en wordt het steviger.
[0:10.8] Wat je niet gebruikt,
[0:11.9] wordt juist zwakker.
[0:13.0] Synapsen die weinig gebruikt worden,
[0:14.9] worden afgezwakt of opgeruimd.
[0:16.7] Dat heet snoeien.
[0:17.7] Tot ver na je puberteit snoeien je hersenen flink,
[0:20.4] ook in de voorhoofdskwab.
[0:21.6] Dat is geen verlies:
[0:22.6] het netwerk wordt er efficiënter van.
[0:24.4] Gebruik het,
[0:25.1] of raak het kwijt.

> Beeld (cues uit `plan.cues`, op het woord): term „gespreid” op ‘Gespreid’; beat „ophalen” op ‘ophaalt’; beat „zwakker” op ‘zwakker’; beat „opgeruimd” op ‘opgeruimd’; term „snoeien” op ‘snoeien’; beat „puberteit” op ‘puberteit’; beat „efficiënter” op ‘efficiënter’; beat „gebruik het” op ‘Gebruik’

### Hoofdstuk 5 · Zijwieltjes eraf
*[hoofdstukkaart 3,0 s op 5:31]*

## 13. q5 — voorspelvraag 5
Audio: blob 013.mp3 (sleutel `q5` in FILM_AUDIO) · 5:34–5:48 (14,2 s mp3; timing.duration 14,164 s)
Scène: `question` (sceneQuestion())

[0:00.0] Wat denk je?
[0:00.8] Een beginner kan niet praten tijdens het fietsen,
[0:03.2] iemand die al jaren fietst wel.
[0:04.8] Hoe komt dat?
[0:05.6] Ervaren fietsers zijn gewoon sterker?
[0:07.5] Bij ervaren fietsers regelen andere hersengebieden het fietsen,
[0:10.6] zodat je voorhoofdskwab vrij is?
[0:12.4] Of ervaren fietsers denken sneller?

> Vraag 5: Een beginner kan niet praten tijdens het fietsen, iemand die al jaren fietst wel. Hoe komt dat?
> A. Ervaren fietsers zijn gewoon sterker
> B. Andere hersengebieden regelen het fietsen, zodat de voorhoofdskwab vrij is  ← juist
> C. Ervaren fietsers denken sneller

*[aftelling 8,0 s (`cd5`) — in Leerling-modus wacht de film hier op een antwoord]*

## 14. a5 — antwoord op vraag 5
Audio: blob 014.mp3 (sleutel `a5` in FILM_AUDIO) · 5:56–6:27 (31,2 s mp3; timing.duration 31,114 s)
Scène: `micro` (sceneMicro → microAuto())

[0:00.0] Het goede antwoord is B.
[0:01.9] Een beginner moet over alles nadenken:
[0:04.1] sturen,
[0:05.0] trappen,
[0:05.6] evenwicht.
[0:06.4] Daar is de voorhoofdskwab druk mee.
[0:08.3] Na veel oefenen nemen de kleine hersenen en de basale kernen het over.
[0:12.2] Zij hebben het patroon vastgelegd,
[0:14.0] en sturen bij zonder dat jij erover nadenkt.
[0:16.6] Je voorhoofdskwab is weer vrij:
[0:18.3] om te praten,
[0:19.2] te kijken,
[0:19.9] de weg te zoeken.
[0:20.8] Dat heet automatiseren.
[0:22.2] Daarom verleer je fietsen ook bijna nooit.
[0:24.3] En een deel van dat vastleggen gebeurt niet tijdens het oefenen,
[0:27.3] maar daarna:
[0:28.1] als je slaapt.

> Beeld (cues uit `plan.cues`, op het woord): beat „nadenken” op ‘nadenken’; term „voorhoofdskwab” op ‘voorhoofdskwab’; term „kleine hersenen” op ‘kleine’; term „basale kernen” op ‘basale’; beat „vrij” op ‘vrij’; term „automatiseren” op ‘automatiseren’; beat „slaap” op ‘slaapt’

### Hoofdstuk 6 · Samenvatting
*[hoofdstukkaart 3,0 s op 6:27]*

## 15. s70 — samenvatting
Audio: blob 015.mp3 (sleutel `s70` in FILM_AUDIO) · 6:30–7:06 (36,4 s mp3; timing.duration 36,362 s)
Scène: `recap` (sceneRecap())

[0:00.0] Terug naar het fietspad.
[0:01.4] Elke keer dat je oefende,
[0:02.8] werden synapsen sterker:
[0:04.4] meer receptoren,
[0:05.4] grotere voetjes,
[0:06.5] nieuwe voetjes.
[0:07.5] Cellen die samen vuren,
[0:09.0] raken verbonden.
[0:10.1] Zo werd fietsen een patroon in je kleine hersenen en basale kernen.
[0:14.0] En je nummer werd een patroon in je schors,
[0:16.1] dat twee tonen weer aanzetten.
[0:17.8] Zelfs een reflex kun je koppelen aan iets nieuws,
[0:20.5] zoals de bel aan het eten.
[0:22.0] De hippocampus legt vast wat je meemaakt.
[0:24.2] Wat je gebruikt,
[0:25.0] wordt sterker,
[0:25.8] en wat je niet gebruikt,
[0:27.0] wordt gesnoeid.
[0:27.8] Je hersenen zijn dus nooit af.
[0:29.5] Ze veranderen door wat je doet,
[0:30.9] ook nu,
[0:31.4] terwijl je dit kijkt.
[0:32.4] Maar wat doen ze 's nachts,
[0:33.6] en als je gestrest bent?
[0:34.8] Dat zie je in de laatste film.

> Beeld (cues uit `plan.cues`, op het woord): recap „receptoren” op ‘synapsen’; recap „voetjes” op ‘voetjes’; recap „samen vuren” op ‘Cellen’; recap „fietsen” op ‘fietsen’; recap „nummer” op ‘nummer’; recap „conditionering” op ‘reflex’; recap „hippocampus” op ‘hippocampus’; recap „gesnoeid” op ‘gesnoeid’; recap „nooit af” op ‘nooit’; recap „film 7” op ‘nachts’

*[eindkaart 8,0 s op 7:06: “Volgende film: Slaap en stress — wat je hersenen nodig hebben (🌙 de avond voor een toets)”]*

---
Controle: 15 gesproken segmenten = 15 audiofragmenten in FILM_AUDIO = 15 mp3-blobs. Som audio (ffprobe) 6:04 (364,4 s); som timing.duration 363,7 s (per fragment ±0,05 s korter dan de mp3, encoderstilte). Filmduur in de speler incl. kaarten en aftellingen: 7:14 (434,7 s).
