# De spleet — script

Bron: gereconstrueerd uit de scriptdata in de gepubliceerde HTML (2026-10-12): `window.FILM.timing[<id>].phrases` (de ondertitelfrasen; identiek aan `segments[].text` en aan het transcript op de pagina). Stem-invoer met respellings (uitspraaklijst) staat niet in de HTML; de tekst hieronder is de ondertiteltekst.

Tijden in de kop van elk segment zijn filmtijd (mastertijd van de speler, zonder wachttijd bij de vragen); de tijden `[m:ss.s]` vóór elke regel zijn de begintijden van de frase **binnen het audiofragment** (zoals in `timing[<id>].phrases[].t0`).

## 1. s00 — cold open
Audio: blob 001.mp3 (sleutel `s00` in FILM_AUDIO) · 0:00–0:15 (15,4 s mp3; timing.duration 15,372 s)
Scène: `world` (sceneWorld())

[0:00.0] Je loopt langs de bakker.
[0:01.3] Vers brood.
[0:02.0] Nog voor je het ziet,
[0:03.1] weet je het al.
[0:04.0] Die geur is een bericht:
[0:05.3] van je neus,
[0:06.2] via een paar zenuwcellen,
[0:07.5] naar je hersenen.
[0:08.5] Maar hier zit een probleem.
[0:10.2] Een impuls is elektrisch.
[0:11.8] En tussen twee zenuwcellen zit een spleet.
[0:13.8] Hoe komt het bericht daaroverheen?

> Beeld (cues uit `plan.cues`, op het woord): beat „straat” op ‘bakker’; beat „geur” op ‘geur’; beat „lens” op ‘bericht’; beat „gap” op ‘spleet’; beat „vraag” op ‘daaroverheen’

*[titelkaart 5,0 s op 0:15]*

### Hoofdstuk 1 · De aansluiting
*[hoofdstukkaart 3,0 s op 0:20]*

## 2. q1 — voorspelvraag 1
Audio: blob 002.mp3 (sleutel `q1` in FILM_AUDIO) · 0:23–0:35 (11,7 s mp3; timing.duration 11,656 s)
Scène: `question` (sceneQuestion())

[0:00.0] Wat denk je?
[0:00.9] Twee zenuwcellen geven een bericht aan elkaar door.
[0:03.3] Hoe zitten ze aan elkaar?
[0:04.5] Ze zijn aan elkaar vastgegroeid,
[0:06.1] als één lange draad?
[0:07.3] Ze raken elkaar aan,
[0:08.0] membraan tegen membraan?
[0:08.9] Of er zit een smalle spleet tussen?

> Vraag 1: Twee zenuwcellen geven een bericht door. Hoe zitten ze aan elkaar?
> A. Aan elkaar vastgegroeid, als één lange draad
> B. Ze raken elkaar aan, membraan tegen membraan
> C. Er zit een smalle spleet tussen  ← juist

*[aftelling 8,0 s (`cd1`) — in Leerling-modus wacht de film hier op een antwoord]*

## 3. a1 — antwoord op vraag 1
Audio: blob 003.mp3 (sleutel `a1` in FILM_AUDIO) · 0:43–1:21 (38,1 s mp3; timing.duration 38,081 s)
Scène: `micro` (sceneMicro → microBouw())

[0:00.1] Het goede antwoord is C.
[0:02.0] We zoomen in op het eindknopje van een zenuwcel.
[0:05.2] Daar tegenover ligt een dendriet van de volgende cel.
[0:08.2] Ze raken elkaar niet.
[0:09.4] Ertussen zit een spleet,
[0:11.0] zo smal dat er wel vijftigduizend naast elkaar in een millimeter passen.
[0:15.1] Dit geheel heet een synaps.
[0:16.9] Het eindknopje is de kant vóór de spleet.
[0:19.5] In het eindknopje liggen blaasjes.
[0:21.3] Elk blaasje zit vol met een stof:
[0:22.9] de neurotransmitter.
[0:24.2] Aan de andere kant,
[0:25.8] in het membraan van de volgende cel,
[0:27.6] zitten receptoren.
[0:28.8] Eiwitten met precies de vorm waar die stof in past.
[0:31.4] Onthoud deze drie:
[0:32.4] blaasjes,
[0:33.2] spleet,
[0:33.9] receptoren.
[0:34.3] Daar draait de hele film om.

> Beeld (cues uit `plan.cues`, op het woord): beat „zoom” op ‘zoomen’; term „eindknopje” op ‘eindknopje’; term „volgende cel (dendriet)” op ‘dendriet’; term „synapsspleet” op ‘spleet’; number „≈ 20 nm · 50.000 in 1 mm” op ‘vijftigduizend’; term „synaps” op ‘synaps’; term „blaasjes” op ‘blaasjes’; term „neurotransmitter” op ‘neurotransmitter’; term „receptoren” op ‘receptoren’; beat „drie” op ‘drie’

### Hoofdstuk 2 · Oversteken
*[hoofdstukkaart 3,0 s op 1:21]*

## 4. s21 — uitleg
Audio: blob 004.mp3 (sleutel `s21` in FILM_AUDIO) · 1:24–2:05 (41,9 s mp3; timing.duration 41,881 s)
Scène: `micro` (sceneMicro → microOver())

[0:00.1] Daar komt de impuls.
[0:00.9] Hij rolt over het axon tot in het eindknopje.
[0:03.2] En dan stopt hij.
[0:04.5] Verder kan hij niet.
[0:05.5] Maar de aankomst doet iets:
[0:07.4] er gaan kanaaltjes open voor calcium.
[0:09.1] Calcium stroomt het eindknopje in.
[0:11.3] Dat is het sein voor de blaasjes.
[0:12.8] Ze bewegen naar het membraan,
[0:14.2] versmelten ermee,
[0:15.1] en gooien hun inhoud in de spleet.
[0:17.0] Duizenden moleculen neurotransmitter steken over.
[0:19.1] Dat duurt minder dan een duizendste seconde.
[0:21.8] Aan de overkant passen ze in de receptoren.
[0:24.1] Zodra zo'n receptor bezet is,
[0:25.1] gaat er een kanaaltje open.
[0:26.6] Ionen stromen de volgende cel in.
[0:28.0] Het membraan verandert.
[0:29.4] En als dat genoeg is,
[0:30.4] ontstaat daar een nieuwe impuls.
[0:31.9] Het bericht is overgestoken.
[0:33.2] Niet als stroom.
[0:34.4] Als stof.

> Beeld (cues uit `plan.cues`, op het woord): beat „impuls aan” op ‘impuls’; beat „stop” op ‘stopt’; term „calcium Ca²⁺” op ‘calcium’; beat „sein” op ‘blaasjes’; beat „fusie” op ‘versmelten’; beat „over” op ‘steken’; number „< 1 ms” op ‘duizendste’; beat „bind” op ‘receptoren’; beat „open” op ‘kanaaltje’; beat „ionen” op ‘Ionen’; beat „impuls 2” op ‘impuls’; term „elektrisch · chemisch · elektrisch” op ‘stof’

## 5. q2 — voorspelvraag 2
Audio: blob 005.mp3 (sleutel `q2` in FILM_AUDIO) · 2:05–2:14 (8,2 s mp3; timing.duration 8,127 s)
Scène: `question` (sceneQuestion())

[0:00.0] Wat denk je?
[0:00.9] Wat gaat er precies door de spleet?
[0:02.5] De impuls zelf,
[0:03.6] als een vonkje?
[0:04.5] Natriumionen uit de eerste cel?
[0:06.5] Of moleculen neurotransmitter?

> Vraag 2: Wat gaat er precies door de spleet?
> A. De impuls zelf, als een vonkje
> B. Natriumionen uit de eerste cel
> C. Moleculen neurotransmitter  ← juist

*[aftelling 8,0 s (`cd2`) — in Leerling-modus wacht de film hier op een antwoord]*

## 6. a2 — antwoord op vraag 2
Audio: blob 006.mp3 (sleutel `a2` in FILM_AUDIO) · 2:22–2:36 (14,3 s mp3; timing.duration 14,296 s)
Scène: `micro` (sceneMicro → microA2())

[0:00.0] Het goede antwoord is C.
[0:01.9] De impuls stopt bij het eindknopje.
[0:03.7] Wat oversteekt,
[0:04.8] is de stof uit de blaasjes.
[0:06.4] Pas aan de overkant ontstaat er weer een impuls.
[0:08.9] Elektrisch,
[0:09.6] dan chemisch,
[0:10.6] dan weer elektrisch.

> Beeld (cues uit `plan.cues`, op het woord): beat „stop” op ‘stopt’; beat „over” op ‘oversteekt’; term „elektrisch · chemisch · elektrisch” op ‘Elektrisch’

### Hoofdstuk 3 · Gas en rem
*[hoofdstukkaart 3,0 s op 2:36]*

## 7. q3 — voorspelvraag 3
Audio: blob 007.mp3 (sleutel `q3` in FILM_AUDIO) · 2:39–2:50 (11,2 s mp3; timing.duration 11,146 s)
Scène: `question` (sceneQuestion())

[0:00.1] Wat denk je?
[0:00.8] Kan een synaps een zenuwcel ook stíller maken?
[0:03.3] Nee,
[0:03.8] een synaps geeft altijd een bericht door?
[0:05.8] Ja,
[0:06.2] het hangt af van de neurotransmitter en de receptor?
[0:08.9] Of alleen als er heel veel stof tegelijk komt?

> Vraag 3: Kan een synaps een zenuwcel ook stiller maken?
> A. Nee, een synaps geeft altijd een bericht door
> B. Ja, dat hangt af van neurotransmitter en receptor  ← juist
> C. Alleen als er heel veel stof tegelijk komt

*[aftelling 8,0 s (`cd3`) — in Leerling-modus wacht de film hier op een antwoord]*

## 8. a3 — antwoord op vraag 3
Audio: blob 008.mp3 (sleutel `a3` in FILM_AUDIO) · 2:58–3:45 (46,8 s mp3; timing.duration 46,719 s)
Scène: `micro` (sceneMicro → microSum())

[0:00.1] Het goede antwoord is B.
[0:01.3] Kijk naar deze zenuwcel.
[0:02.3] Er komen twee synapsen op uit.
[0:03.5] Bij de eerste gaan er na binding natriumkanalen open.
[0:05.8] Natrium stroomt naar binnen,
[0:07.2] het membraan wordt minder negatief.
[0:08.8] Dichter bij de drempel.
[0:09.6] Deze synaps is exciterend:
[0:11.4] hij zet aan.
[0:11.7] Bij de tweede gaan er chloridekanalen open.
[0:13.9] Chloride is negatief,
[0:15.2] en stroomt naar binnen.
[0:16.4] Het membraan wordt juist negatiever.
[0:18.5] Verder van de drempel.
[0:19.5] Deze synaps is remmend.
[0:21.1] Of een cel exciterend of remmend reageert,
[0:22.7] hangt af van de neurotransmitter én van de receptor.
[0:25.1] Een zenuwcel krijgt vaak duizenden van zulke aansluitingen.
[0:28.3] Al die plusjes en minnetjes worden bij elkaar opgeteld.
[0:30.8] Haalt de som de drempel bij het begin van het axon?
[0:33.0] Dan vertrekt er een impuls.
[0:34.5] Zo niet,
[0:35.3] dan blijft het stil.
[0:36.9] Daarom is er een spleet.
[0:38.0] Een vaste draad geeft alleen door.
[0:40.0] Een synaps kan versterken,
[0:41.1] remmen en optellen.

> Beeld (cues uit `plan.cues`, op het woord): beat „twee” op ‘twee’; beat „na” op ‘natriumkanalen’; beat „drempel” op ‘drempel’; term „exciterend +” op ‘exciterend’; beat „cl” op ‘chloridekanalen’; term „remmend −” op ‘remmend’; number „duizenden synapsen” op ‘duizenden’; term „optellen (sommatie)” op ‘opgeteld’; beat „vuur” op ‘vertrekt’; beat „stil” op ‘niet’; beat „why” op ‘spleet’

### Hoofdstuk 4 · Opruimen
*[hoofdstukkaart 3,0 s op 3:45]*

## 9. q4 — voorspelvraag 4
Audio: blob 009.mp3 (sleutel `q4` in FILM_AUDIO) · 3:48–4:00 (11,8 s mp3; timing.duration 11,796 s)
Scène: `question` (sceneQuestion())

[0:00.0] Wat denk je?
[0:00.9] De neurotransmitter blijft in de spleet hangen,
[0:03.2] aan de receptoren.
[0:04.3] Wat gebeurt er dan met de volgende cel?
[0:06.4] Die blijft impulsen afvuren?
[0:08.1] Die reageert één keer en dan is het klaar?
[0:10.4] Of die raakt beschadigd?

> Vraag 4: De neurotransmitter blijft in de spleet hangen, aan de receptoren. Wat gebeurt er met de volgende cel?
> A. Die blijft impulsen afvuren  ← juist
> B. Die reageert één keer en dan is het klaar
> C. Die raakt beschadigd

*[aftelling 8,0 s (`cd4`) — in Leerling-modus wacht de film hier op een antwoord]*

## 10. a4 — antwoord op vraag 4
Audio: blob 010.mp3 (sleutel `a4` in FILM_AUDIO) · 4:08–4:46 (38,3 s mp3; timing.duration 38,220 s)
Scène: `micro` (sceneMicro → microOpruim())

[0:00.0] Het goede antwoord is A.
[0:01.3] Zolang de receptoren bezet zijn,
[0:02.4] blijven de kanalen open.
[0:03.5] De cel blijft vuren.
[0:04.8] Een bericht moet dus ook weer uit kunnen.
[0:06.7] Daar zijn drie manieren voor.
[0:07.9] Eén:
[0:08.3] een enzym in de spleet knipt de stof kapot.
[0:10.8] Bij acetylcholine,
[0:11.3] de stof waarmee je spieren worden aangestuurd,
[0:13.5] is dat acetylcholinesterase.
[0:15.0] Twee:
[0:15.7] het eindknopje zuigt de stof weer terug naar binnen,
[0:18.2] om hem opnieuw te gebruiken.
[0:19.9] Dat heet heropname.
[0:20.8] Drie:
[0:21.3] de stof drijft gewoon weg uit de spleet.
[0:23.8] Zo is de synaps binnen een paar duizendste seconde weer schoon.
[0:27.3] Klaar voor het volgende bericht.
[0:29.0] Opruimen hoort bij het bericht.
[0:30.4] Precies op deze stappen grijpen medicijnen en drugs in.
[0:33.1] Daarover gaat de volgende film.

> Beeld (cues uit `plan.cues`, op het woord): beat „bezet” op ‘bezet’; beat „1” op ‘Eén’; term „acetylcholinesterase” op ‘acetylcholinesterase’; beat „2” op ‘Twee’; term „heropname” op ‘heropname’; beat „3” op ‘Drie’; beat „schoon” op ‘schoon’; beat „haak” op ‘medicijnen’

### Hoofdstuk 5 · Eenrichtingsverkeer
*[hoofdstukkaart 3,0 s op 4:46]*

## 11. q5 — voorspelvraag 5
Audio: blob 011.mp3 (sleutel `q5` in FILM_AUDIO) · 4:49–4:59 (10,3 s mp3; timing.duration 10,217 s)
Scène: `question` (sceneQuestion())

[0:00.1] Wat denk je?
[0:00.8] Kan een bericht via een synaps ook terug,
[0:02.3] van de tweede cel naar de eerste?
[0:04.4] Ja,
[0:04.6] een synaps werkt in twee richtingen?
[0:06.8] Nee,
[0:07.2] alleen als de spleet heel smal is?
[0:09.0] Of nee,
[0:09.6] nooit?

> Vraag 5: Kan een bericht via een synaps ook terug, van de tweede cel naar de eerste?
> A. Ja, een synaps werkt in twee richtingen
> B. Nee, alleen als de spleet heel smal is
> C. Nee, nooit  ← juist

*[aftelling 8,0 s (`cd5`) — in Leerling-modus wacht de film hier op een antwoord]*

## 12. a5 — antwoord op vraag 5
Audio: blob 012.mp3 (sleutel `a5` in FILM_AUDIO) · 5:07–5:38 (31,0 s mp3; timing.duration 30,975 s)
Scène: `micro` (sceneMicro → microRichting())

[0:00.0] Het goede antwoord is C.
[0:01.4] Kijk nog eens naar de twee kanten.
[0:02.9] Blaasjes met neurotransmitter zitten alleen in het eindknopje.
[0:06.2] Receptoren zitten alleen in het membraan van de volgende cel.
[0:09.7] De stof kan dus maar één kant op werken.
[0:11.7] Daarom loopt een bericht altijd van eindknopje naar dendriet.
[0:14.9] Nooit terug.
[0:16.0] Dit werkt niet alleen tussen zenuwcellen.
[0:18.0] Bij je spieren eindigt een motorisch neuron ook in een synaps.
[0:21.6] De neurotransmitter is daar acetylcholine,
[0:23.4] en de ontvanger is een spiervezel.
[0:25.0] Bezet genoeg receptoren,
[0:26.2] en de spier trekt samen.
[0:27.6] Zelfde principe,
[0:28.3] andere ontvanger.

> Beeld (cues uit `plan.cues`, op het woord): beat „links” op ‘Blaasjes’; beat „rechts” op ‘Receptoren’; beat „nooit” op ‘Nooit’; term „neuromusculaire synaps” op ‘spieren’; term „acetylcholine” op ‘acetylcholine’; beat „samen” op ‘samen’

### Hoofdstuk 6 · Samenvatting
*[hoofdstukkaart 3,0 s op 5:38]*

## 13. s70 — samenvatting
Audio: blob 013.mp3 (sleutel `s70` in FILM_AUDIO) · 5:41–6:07 (26,4 s mp3; timing.duration 26,378 s)
Scène: `recap` (sceneRecap())

[0:00.1] Terug naar het brood.
[0:01.4] De geurstof past in een receptor in je neus.
[0:04.2] Daar ontstaat een impuls,
[0:05.7] over het axon naar het eindknopje.
[0:07.9] Calcium erin,
[0:08.9] blaasjes leeg,
[0:09.8] neurotransmitter steekt de spleet over.
[0:12.1] Receptoren bezet,
[0:13.1] kanalen open,
[0:14.0] de volgende cel vuurt,
[0:15.3] of juist niet.
[0:16.3] Enzym,
[0:17.0] heropname,
[0:18.0] wegdrijven:
[0:18.9] de spleet is weer schoon.
[0:20.0] Een paar synapsen verder weten je hersenen het:
[0:22.4] brood.
[0:22.9] Elektrisch,
[0:23.7] chemisch,
[0:24.4] elektrisch.
[0:25.1] En altijd één kant op.

> Beeld (cues uit `plan.cues`, op het woord): recap „neus” op ‘receptor’; recap „impuls” op ‘impuls’; recap „calcium” op ‘Calcium’; recap „oversteken” op ‘spleet’; recap „receptoren” op ‘bezet’; recap „vuurt of niet” op ‘niet’; recap „opruimen” op ‘Enzym’; recap „hersenen” op ‘brood’; recap „e-c-e” op ‘Elektrisch’; recap „één kant” op ‘kant’

*[eindkaart 8,0 s op 6:07: “Volgende film: Knoeien met de synaps — koffie, wijn en wat er dan in de synaps gebeurt (☕ de koffie, 🍷 de wijn, 🎧 het nummer, 🚲 de zijwieltjes)”]*

---
Controle: 13 gesproken segmenten = 13 audiofragmenten in FILM_AUDIO = 13 mp3-blobs. Som audio (ffprobe) 5:05 (305,4 s); som timing.duration 304,9 s (per fragment ±0,05 s korter dan de mp3, encoderstilte). Filmduur in de speler incl. kaarten en aftellingen: 6:15 (375,9 s).
