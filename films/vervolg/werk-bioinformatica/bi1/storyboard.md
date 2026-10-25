# Storyboard bi1 — Zoeken in DNA: databanken, BLAST en een beetje Python (fase A, 25 okt 2026)

Echte scènes op voorlopige woordtijden (`fakewords.py`, ± 8,4 min verteltijd zonder vragen). Code: `teken_bi1.js` (bovenaan het reeksobject 'scherm met code / sequenties': `codeScherm`, `sequentieRij`, `uitlijning`, `aaKralen`, `resultatenLijst`), `scenes_bi1.js`. Keyframes: `blad/img/<id>.webp`. Look Schema met cast; Micro alleen binnen de zoomcirkel in s13.

| id | hoofdstuk | look | wat in beeld / wat beweegt |
|---|---|---|---|
| title | Titel | Schema | Titelkaart: scherm `barcode_sushi.fasta` met vier rijen lettertegels; leeg sushibakje met etiket 'blauwvintonijn'. |
| s01 | Cold open | Schema met cast | Sam loopt van links binnen (zijaanzicht, gang 'loop') en blijft bij het bureau staan; Dr. Kim rechts. Paneel 'gisteren · lunch' met het etiket 'blauwvintonijn' (goud omlijnd op het woord); Kim wijst naar het bakje; een buisje springt van het bakje weg, tag 'stukje naar het lab'. |
| s02 | Cold open | Schema | Het grote scherm vult zich met lettertegels (rij voor rij); teller loopt op tot 'ongeveer 650 letters'; Meta 'loopt verder: 4 van ± 22 rijen'. |
| s03 | Cold open | Schema | Scherm gedimd; tonijnicoon en vraagteken onder het scherm. |
| s05 | H1 Databanken | Schema | Eén rij van 30 tegels; tag 'sequentie' en Meta 'volgorde van basen'; 'stuk van één gen in de mitochondriën'; vis, vogel en kever met elk een eigen streepjescode; tag 'DNA-barcode'; verwijzing in Meta naar *DNA lezen*; vraagtekens bij de streepjescodes op 'vergelijken'. |
| s06 | H1 Databanken | Schema met cast | Barcode op het scherm, vraagteken; Sam (denk, verbaasd) en Kim. |
| q07 | H1 | Schema | Vraagkaart. Juist: a |
| s08 | H1 Databanken | Schema | Antwoordregel; drie databankcilinders (Amerika · GenBank, Europa · ENA, Japan · DDBJ) die zich vullen terwijl kleine streepjescodes binnenstromen; teal bogen met pakketjes en klokje 'elke dag'; 'miljarden sequenties', 'meer dan een half miljoen soorten', groene tag 'iedereen mag erin zoeken · gratis'. |
| s09 | H1 Databanken | Schema | Scherm 'databank · één regel': soort (kabeljauw als neutraal voorbeeld), gen COI, 'gelezen door'; daaronder 'jouw sequentie' (de sushi); gouden rand op 'meest'. |
| s10 | H2 Uitlijnen | Schema met cast | Oefenvoorbeeld (label 'geen echte vis'): twee rijen van 16 en 17 tegels; letter voor letter verschijnen streepjes bij de eerste vier; daarna koraal randen bij bijna alle volgende. Kim wijst, daarna Sam. |
| s11 | H2 | Schema met cast | Zelfde rijen, vraagteken; Sam denkt. |
| q12 | H2 | Schema | Vraagkaart. Juist: b |
| s13 | H2 Uitlijnen | Schema → Micro (zoomcirkel) | Gouden streep na de vierde letter; zoomcirkel met twee aparte dubbele DNA-strengen (basisvormen uit de DNA-reeks): in stukje 1 verdwijnt één heel basenpaar (koraal) en de rest schuift op; tag 'echte deletie of leesfout'. Terug: in rij 1 schuift een leeg gestippeld gat open, streepjes worden groen; tag 'uitlijnen', groene haak, twee korte regels met de definitie. |
| s14 | H2 Uitlijnen | Schema | Legenda +1 / −1 / −1; scoreregel loopt kolom voor kolom mee; som 15 − 1 − 1 = 13 bouwt op per woord; klein ernaast hetzelfde paar zonder gat '= −4'. |
| s15 | H2 Uitlijnen | Schema | '13' groot met groene haak 'hoe hoger, hoe beter'; tag 'echte programma's: andere punten' (Meta BLAST +5 / −4); computericoon met snel wisselende scores. |
| s16 | H3 BLAST | Schema met cast | Barcode links; rechts een stapel databankregels die steeds sneller omhoog schuift ('databank · miljarden sequenties'); tag 'zoekprogramma BLAST'; Sam fronst. |
| s17 | H3 | Schema met cast | Zelfde, vraagteken. |
| q18 | H3 | Schema | Vraagkaart. Juist: c |
| s19 | H3 BLAST | Schema | Barcode valt uiteen in goud omlijnde woordjes van 28; in de stapel lichten drie regels op ('woordje past'), de rest dimt naar 35% ('bijna nooit toevallig'). Daarna één uitlijning: woordje van 28 goud omlijnd, het bereik groeit naar links en rechts (pijlen), score loopt mee en stopt waar de letters niet meer passen. |
| s20 | H3 BLAST | Schema met cast | Resultatenlijst (label 'voorbeeld'): geelvintonijn 100%, grootoogtonijn 99%, blauwvintonijn 98%, toeval steeds 'bijna 0'; eerst gouden kader om 'toeval', dan om 'gelijk'; groene haak bij de beste; tags 'zeker tonijn' en 'welke tonijn: procent gelijk'; Sam steekt zijn arm op, 'Geelvin!'. |
| s21 | H3 | Schema met cast | Lijst gedimd; Sam en Kim met de hand omhoog; vraagteken. |
| q22 | H3 | Schema | Vraagkaart. Juist: b |
| s23 | H3 BLAST | Schema met cast | Databankregel met soortnaam koraal omlijnd ('verkeerde naam?'); drie treffers uit drie labs met vinkjes; inzet 'tweede stukje DNA · soms, bij tonijn'; Kim wijst. |
| s24 | H4 Zelf programmeren | Schema | Leeg scherm `vertaal.py` met knipperende gouden cursor; label 'mRNA van insuline · zonder introns' met 18 RNA-tegels (teal); goud kader springt per drie letters ('met de hand'); kleine codontabel; tag 'Python: een programmeertaal'. |
| s25 | H4 | Schema | De code verschijnt regel voor regel; de beschreven regel licht goud op (woordenboek → stap van drie → opzoeken en plakken); kader loopt per drie over de tegels; eerste kraal M achter de keten. |
| s26 | H4 | Schema | Eerste run met `UGGCCC…` (koraal kader om het mRNA, koraal eerste tegel): koraal kralen W P C G C A. Na 'verbetering' wisselt het mRNA, zes okerkralen M A L W M R; namen methionine (start), alanine, leucine, tryptofaan op hun woord. |
| s27 | H4 | Schema | Code gedimd; het hele recept (333 letters) schuift als lange rij voorbij; teller 18 → 'ruim 300 letters (333)'. |
| s28 | H4 | Schema | Zelfde, vraagteken. |
| q29 | H4 | Schema | Vraagkaart. Juist: a |
| s30 | H4 | Schema | Code op volle sterkte, ongewijzigd; regel met de stap van drie licht op, goud kader om `len(mrna)`; kralenketting (insuline, 110 aminozuren) groeit razendsnel uit beeld; daarna 100 kleine recepten die tegelijk vertaald worden; goud kader om het begin van het mRNA, tag 'beginpunt: zet Sam zelf'. |
| s31 | Recap | Schema | Vier mini-schermen (barcode → databank → uitlijnen → resultaten) op hun woord; het bakje met 'blauwvintonijn' dat koraal wordt doorgestreept; tag 'in het bakje: geelvintonijn'; 'of het restaurant het wist, zegt het DNA niet'. |
| s32 | Recap | Schema met cast | Radar 2017: 21 kommen, 20 goud omlijnd; daarna computericoon 'razendsnel', drie vinkjes (bedachten wat te zoeken · controleerde de treffer · schreef de code) boven Kim en Sam aan het bureau; tag 'samen: bio-informatica'. |
| s33 | Recap | Schema met cast | Sam wijst; opleidingstags (hbo HAN; bachelor Radboud → master WUR), 'programmeren vanaf jaar 1'; drie werkplek-iconen ziekenhuis, onderzoeksinstituut, bedrijf. |
