# DNA kopiëren — script v2 (DNA 2 van 8, lichte remake, fase 1)

Lichte remake volgens prompt v10 B16 (25 okt 2026). **Gekeurd 25 okt 2026** (besluiten: films/verbeterbladen/remake-2026-10/besluiten.md): alle voorstellen, behalve T4 = alternatief; basen in de ringvorm van DNA 1. Geraamte: `bron/script.md` (versie 2.0, prompt v5, 12 okt 2026): leerdoelen, hoofdstukvolgorde, vier voorspelvragen en de puzzel blijven. Bouw in de FILMDATA-straat zoals Chromosomen 2.0 (segmenten via `make_segments.py`, één take per alinea, Roos, eleven_v4, stem-invoer met `films/uitspraak.json`). Niveau havo + vwo; hoofdstuk 4 is een vwo-blok (`[VWO-START]` … `[VWO-END]`). Puzzel: hoe krijgt elke nieuwe huidcel bij een wond een complete, bijna foutloze kopie van twee meter DNA, in een paar uur?

Tekens per alinea: `=` ongewijzigd · `~` aangepast (kort waarom) · `+` nieuw · `−` geschrapt. Het oude segment staat erachter (n0 … n20). Alle alinea's worden opnieuw ingesproken (nieuwe stem en nieuw model; de oude takes zijn eleven_multilingual_v2).

### Belangrijkste wijzigingen

| Plek (oud) | Wijziging | Waarom |
|---|---|---|
| n0 | knie → onderarm van Noor; 'honderdduizenden nieuwe cellen' → 'heel veel nieuwe cellen'; 'foutloos' → 'bijna zonder fouten' | onderarm staat gekeurd in de bibliotheek; het getal had geen bron (info.md: 'niet gecontroleerd'); foutloos klopt niet (1 op 10⁹–10¹⁰) en botst met de mutatiezin in H3 |
| n5, n9, n13, n17 | geen 'B.'/'C.'/'Antwoord C klopt niet' meer; elke alinea na een vraag zegt de inhoud opnieuw in eigen woorden | B9 Vragen uit, `kortantwoord.py` |
| q8 | 'A C G T' → 'A T G C'; opties T A C G / A T G C / U A C G | ACGT is zijn eigen omgekeerde complement: een vwo-leerling die (DNA 1) leerde '5' → 3' opschrijven' vindt dan optie a ook goed |
| n7 | 'Het enzym zoekt niets uit … maakt alleen de verbinding' → 'Het enzym kiest niet zelf een letter. Een nucleotide die past bij de base tegenover, past ook precies in het enzym. Alleen dan sluit het enzym en koppelt hem vast.' | bronnencheck `!`: polymerase toetst de vorm van het basenpaar in het actieve centrum (Ludmann & Marx 2016; Kunkel & Bebenek 2000) — beeld = keyframe 04 |
| n7 | nieuwe zin over de richting in basis ('Langs de ene streng groeit de nieuwe streng met de rits mee, langs de andere in korte stukjes terug') | het oude basisbeeld liet beide nieuwe strengen dezelfde kant op groeien: dat is fout (antiparallel). Twijfelscène T2 |
| n11 | 'duizenden plekken' → 'tienduizenden plekken' | 30 000–50 000 startpunten per celcyclus (BioNumbers 108756; Prioleau & MacAlpine 2016) |
| n15 | 'Voor vwo gaan we hier drie stappen verder.' − | BEELDAFSPRAKEN: niet 'Voor vwo' zeggen |
| n17 | opgeknipt in drie alinea's (Meselson-uitkomst · richting en primer · de vork) | één take per alinea; bij elke alinea één beeld; de vork krijgt eigen tijd |
| n18 | DNA- en RNA-polymerase naast elkaar; reverse transcriptase als één zin (keuring T4: alternatief); 'Dat waren de drie stappen voor vwo' − | BEELDAFSPRAKEN 'replicatie en transcriptie elk een eigen beeld' |
| n20 | recap noemt ook de bijna-foutloosheid en de startpunten | recap moet de hele puzzel beantwoorden (kandidaat WERKWIJZE 'recap apart nalezen') |

Geen verwijzingen naar tools of de site (B4): gecontroleerd met `grep -i -E "probeer|tool|op de site|zelf (proberen|uit)|onderzoekje"` — niets.

---

## Opening [Macro]
~ (n0) Noor heeft een schaafwond op haar arm. Na een week is hij dicht. Daarvoor heeft haar huid heel veel nieuwe cellen gemaakt. Elke nieuwe cel kreeg zijn eigen twee meter DNA. Gekopieerd in een paar uur, en bijna zonder fouten. Hoe doet een cel dat?
<!-- ~ 'je knie' → Noor (castpersonage, onderarm uit de bibliotheek); getal zonder bron weg; 'foutloos' → 'bijna zonder fouten' (zie H3). 43 woorden -->

## Titel
DNA kopiëren

## Hoofdstuk 1 — Wanneer en waarom [Micro]
~ (n3) Een cel die gaat delen, moet eerst haar DNA kopiëren. Anders zou elke dochtercel maar de helft krijgen. Kijk naar de klok van de cel: de celcyclus. Het kopiëren gebeurt in de S-fase. De S staat voor synthese: maken. Pas daarna, in de M-fase, deelt de cel. De kopieën worden verdeeld over twee dochtercellen. Het kopiëren zelf heet DNA-replicatie. In sommige boeken heet het DNA-verdubbeling.
<!-- ~ alleen 'noem je' → 'heet' (twee keer 'noem je' kort na elkaar). Celcyclusring = cycleRing uit Celdeling (zelfde kleuren), zodat de reeksen niet botsen -->

Wat denk je? In welke fase kopieert de cel haar DNA?
[VRAAG] (a) Tijdens de deling, in de M-fase · (b) Vóór de deling, in de S-fase · (c) Na de deling, in de nieuwe cel
<!-- ~ (q4) 'Wat denk je?' vooraan (B4). Juist: b -->

~ (n5) De cel kopieert haar DNA vóór de deling, in de S-fase. Als de cel begint te delen, is elk chromosoom al dubbel: twee identieke chromatiden.
<!-- ~ 'B.' weg (B9); 'DNA al dubbel' concreter gemaakt met chromatiden (zelfde begrip als Chromosomen) -->

## Hoofdstuk 2 — Eén streng is genoeg [Micro]
~ (n7a) We zoomen in, van de kern naar het molecuul: de dubbele ketting uit aflevering één. Tegenover A staat altijd T, tegenover C altijd G. Ken je één streng, dan ken je de andere. Precies dat gebruikt de cel.
<!-- ~ 'Terug naar het molecuul' wordt een doorlopende zoom (C8): kern → chromatine → DNA rond eiwitten → dubbele helix. 'Onthoud wat we daar zagen' weg (overbodig) -->

~ (n7b) Een enzym, helicase, trekt de twee strengen uit elkaar. Het lijkt op een rits die opengaat. Nu liggen de basen vrij. Elke oude streng is een voorbeeld voor een nieuwe.
<!-- ~ opgeknipt; 'Elke streng' → 'Elke oude streng' (oud/nieuw is vanaf hier de kleurbetekenis) -->

~ (n7c) In het kernplasma zweven vrije nucleotiden. Losse bouwstenen: A, T, C en G. Ze botsen steeds tegen de open streng. We volgen er één. Deze past niet en schiet weer weg. Deze wel: hij past tegenover de base op de oude streng.
<!-- ~ 'Past een base niet, dan stuitert hij weg' blijft, nu met één gevolgd molecuul (C8: één nucleotide volgen, gouden rand) -->

~ (n7d) Dan komt het enzym DNA-polymerase. Het kiest niet zelf een letter. Een nucleotide die past bij de base tegenover, past ook precies in het enzym. Alleen dan sluit het enzym zich en koppelt het hem vast aan de vorige. Zo schuift het langs de oude streng, en groeit er een nieuwe streng naast.
<!-- ~ bronnencheck '!': oud 'Het enzym zoekt niets uit. De basenparing bepaalt wat past. Het enzym maakt alleen de verbinding.' Te stellig: de polymerase toetst de vorm van het basenpaar in zijn actieve centrum (geometrische selectie). Nieuw rust op B12 (Ludmann & Marx 2016, A) en B13 (Kunkel & Bebenek 2000, A). De kern van de oude zin blijft: het enzym 'kiest' niet, de paring bepaalt wat past. Geen teleologie ('zoekt') -->

+ (n7e) Dat gebeurt langs allebei de oude strengen tegelijk. Maar ze lopen tegengesteld. Langs de ene streng groeit de nieuwe streng gewoon met de rits mee. Langs de andere bouwt het enzym steeds een stukje terug, in korte stukken die later aan elkaar worden geplakt.
<!-- + nieuw in de basislijn: het beeld van een echte vork laat dit toch zien, en de oude simulatie (beide strengen dezelfde kant op) was fout. Geen termen (leidend, Okazaki) in basis. Twijfelscène T2: wil Kamiel dit in de havolijn? Zonder deze alinea valt basis terug op beeld B (onderste streng gedimd) -->

Wat denk je? Op de oude streng staan de basen A T G C. Welke basen komen er op de nieuwe streng tegenover te staan?
[VRAAG] (a) A T G C · (b) T A C G · (c) U A C G
<!-- ~ (q8) volgorde ACGT → ATGC: ACGT is zijn eigen omgekeerde complement (5'→3' gelezen), dan is optie a voor een vwo-leerling ook verdedigbaar. 'Tegenover' maakt duidelijk dat het om de paren gaat, niet om leesrichting. Juist: b. Misvattingen: a (kopie = dezelfde letters), c (U = RNA) -->

~ (n9) Tegenover A komt T, tegenover T komt A, tegenover G komt C en tegenover C komt G. De nieuwe streng is dus geen kopie van dezelfde letters, maar het spiegelbeeld: de partner. U hoort er niet bij. Die base zit alleen in RNA. Daar gaat aflevering drie over.
<!-- ~ 'B.' en 'Antwoord C klopt niet' weg (B9); misvatting 'kopie = dezelfde letters' benoemd en ontkracht -->

## Hoofdstuk 3 — Twee uit één [Micro]
~ (n11a) Als de polymerasen klaar zijn, liggen er twee dubbele kettingen. Allebei precies gelijk aan het origineel. Elke oude streng heeft opnieuw zijn eigen partner gekregen. Twee identieke DNA-moleculen, klaar voor twee dochtercellen.
<!-- ~ 'de polymerase' → 'de polymerasen' (er werken er veel tegelijk, zie hieronder); 'Want' weg -->

~ (n11b) Hoe snel gaat dat? Eén polymerase koppelt ongeveer vijftig nucleotiden per seconde. Dat lijkt snel. Maar voor drie miljard basenparen zou één enzym bijna twee jaar nodig hebben.
<!-- = inhoud; opgeknipt. Getal ≈ (20–50 nt/s gemeten, zie bronnen.md) -->

Wat denk je? Vijftig nucleotiden per seconde, en toch is de cel klaar in een paar uur. Hoe kan dat?
[VRAAG] (a) De polymerase gaat sneller als het moet · (b) Het kopiëren begint op heel veel plekken tegelijk · (c) De cel kopieert alleen de genen die ze nodig heeft
<!-- ~ (q12) 'Wat denk je?' vooraan; opties gelijk. Juist: b -->

~ (n13a) Het kopiëren begint op tienduizenden plekken in het DNA tegelijk. Vanuit elk startpunt lopen twee vorken uit elkaar, tot ze de vork van het volgende startpunt tegenkomen. Zo is het in een paar uur klaar. En de cel kopieert alles, ook de stukken die ze niet gebruikt.
<!-- ~ 'B. Duizenden startpunten tegelijk.' → hele zin (B9); 'duizenden' → 'tienduizenden' (30 000–50 000, B6 + B7); bubbels die samenvloeien = simulatie keyframe 11; misvatting (c) ontkracht zonder 'En nee' -->

~ (n13b) Aan de uiteinden van elk chromosoom zit een stuk dat niet codeert: de telomeer. Het beschermt de uiteinden, een beetje zoals het plastic uiteinde van een veter.
<!-- ~ verplaatst van n11 naar na de startpunten (logischer: eerst het hele molecuul, dan de uiteinden). Inhoud gelijk. Twijfelscène T3: telomeer in deze film houden? -->

~ (n13c) Gaat het altijd goed? Bijna altijd. Van elke miljard gekopieerde basenparen gaat er hooguit één mis. Zo'n kopieerfout die blijft staan, heet een mutatie. Hoe dat verder gaat, zie je in aflevering vijf.
<!-- ~ foutkans uit het vwo-blok (n18) naar de basislijn: de puzzel ('bijna zonder fouten') moet ook voor havo beantwoord worden; repair-enzymen blijven vwo. ≈ 1 op 10⁹–10¹⁰ (B11, B12, B14) -->

## Hoofdstuk 4 — Richting en halfnieuw [Micro]
[VWO-START] ~ (n15) Wat zit er in de twee nieuwe moleculen? Elk nieuw molecuul bestaat uit één oude streng en één nieuwe. Half oud, half nieuw. Dat heet semiconservatief: de helft wordt bewaard. Hoe weten we dat? In het jaar 1958 lieten Meselson en Stahl bacteriën eerst groeien op zware stikstof. Al hun DNA werd zwaar. Daarna kregen de bacteriën lichte stikstof.
<!-- − 'Voor vwo gaan we hier drie stappen verder. Eerst:' (BEELDAFSPRAKEN); + jaartal (bron B9); 'Twee onderzoekers,' weg (namen staan in beeld). Stem-invoer: 'semi-conservatief', 'Messelson en Staal', 'het jaar 1958' (uitspraaklijst) -->

Wat denk je? Na één keer kopiëren op lichte stikstof sorteer je het DNA op gewicht. Wat zie je?
[VRAAG] (a) Alleen zwaar DNA · (b) Alleen licht DNA · (c) Alles even zwaar, precies tussen zwaar en licht in · (d) De helft zwaar, de helft licht
<!-- ~ (q16) 'Wat denk je?' vooraan. Juist: c. (d) = het conservatieve model, (a)/(b) = 'er gebeurt niets'/'alles nieuw' -->

~ (n17a) Na één ronde is al het DNA precies half zwaar: elk molecuul heeft één oude, zware streng en één nieuwe, lichte. Na een tweede ronde zie je twee banden: half zwaar en helemaal licht. Precies wat semiconservatief voorspelt.
<!-- ~ 'C. Alle moleculen zijn …' → zin zonder antwoordletter (B9); 'twee groepen' → 'twee banden' (zo ziet het er in de buis uit, B8) -->

~ (n17b) Dan de richting. De twee strengen lopen antiparallel: de ene van 5' naar 3', de andere andersom. DNA-polymerase plakt een nieuwe nucleotide altijd aan het 3'-uiteinde. De nieuwe streng groeit dus altijd van 5' naar 3'. En het enzym kan niet zelf beginnen. Het heeft een kort startstukje van RNA nodig: een primer. Die primer maakt een ander enzym, primase.
<!-- ~ 'In aflevering één zag je dat' weg (DNA 1 vwo legt antiparallel uit; korte verwijzing mag maar hoeft niet); 'van RNA' toegevoegd (primer is RNA, beeld teal). Stem-invoer: vijf-accent / drie-accent -->

~ (n17c) Kijk nu naar de vork, waar de strengen uit elkaar gaan. Langs de ene streng bouwt de polymerase met de vork mee, in één lange keten. Dat is de leidende streng. Langs de andere streng is dat de verkeerde kant op. Daar legt primase steeds een nieuwe primer, en bouwt de polymerase van de vork af, een stukje terug. Die korte stukken heten Okazaki-fragmenten. Later wordt elke primer vervangen door DNA, en plakt het enzym ligase de stukken aan elkaar. Dat is de volgende streng.
<!-- ~ 'loopt de richting van de vork af' (onduidelijk) → 'is dat de verkeerde kant op'; primer per fragment en vervangen van de primer toegevoegd (anders blijft er RNA in het DNA zitten — vraag die leerlingen stellen); 'Een derde enzym' → 'het enzym' (telling klopte niet meer). Bronnen B3, B4, B5. Term 'volgende streng' (Nectar) vs 'achterlopende streng': twijfelscène T5 -->

~ (n18) DNA-polymerase moet je niet verwarren met RNA-polymerase. DNA-polymerase kopieert al het DNA, één keer per celcyclus: dat is replicatie. RNA-polymerase schrijft één gen over naar RNA, zo vaak als de cel het nodig heeft: dat is transcriptie, in aflevering drie. Sommige virussen kunnen het omgekeerde: van RNA naar DNA. Dat enzym heet reverse transcriptase. En de fouten? DNA-repair-enzymen gaan langs het nieuwe DNA en vervangen verkeerd ingebouwde nucleotiden. Daardoor gaat er zo weinig mis. [VWO-END]
<!-- ~ keuring 25 okt (T4 alternatief): DNA- en RNA-polymerase uitgelegd, reverse transcriptase blijft als één zin met de oude checkvraag 5; − 'en ook PCR, in aflevering zeven'; − 'Dat waren de drie stappen voor vwo' (BEELDAFSPRAKEN). Stem-invoer: 'DNA-ripair-enzymen' -->

## Samenvatting — Terug naar de schaafwond [Macro]
~ (n20) Terug naar de schaafwond van Noor. Elke nieuwe huidcel kreeg een complete kopie, omdat de cel haar DNA kopieerde vóór de deling. Helicase trekt de strengen uit elkaar. Elke oude streng is een voorbeeld. DNA-polymerase koppelt alleen de nucleotiden die passen. Zo ontstaan twee moleculen die gelijk zijn aan het origineel, elk half oud en half nieuw. Op tienduizenden plekken tegelijk, dus in een paar uur. En die zeldzame fouten die blijven staan? Daar begint aflevering vijf. Maar eerst: hoe leest een cel haar DNA? Dat zie je in aflevering drie.
<!-- ~ recap beantwoordt nu alle drie delen van de puzzel (complete kopie · bijna foutloos · in een paar uur); 'half oud, half nieuw' staat ook in basis H3 impliciet ('elke oude streng opnieuw zijn partner') — zie T6 -->

## Eindkaart
Elke cel kopieert vóór de deling al haar DNA. · Elke oude streng is het voorbeeld voor een nieuwe; de basenparing bepaalt wat past. · Tienduizenden startpunten tegelijk: klaar in een paar uur.

---

## Duur en woorden (schatting, 2,4 woorden per seconde)

| | woorden | spraak |
|---|---|---|
| basis (zonder vwo-blok, met 3 vragen) | ± 760 | ± 5:15 |
| vwo-blok (n15–n18 + q16) | ± 350 | ± 2:25 |
| totaal vwo | ± 1110 | ± 7:40 |

Met hoofdstukkaarten en denktijd bij de vragen: speeltijd havo ± 6:00, vwo ± 8:45. 21 gesproken alinea's + 4 vraagzinnen = 25 takes.

Oude film: 5:35 spraak (havo 4:28 speeltijd, vwo 6:55). De extra tijd zit in n7e (basisvork), n13a (startpunten) en n17c (primer per fragment).

## Uitspraak (stem-invoer)

Uit `films/uitspraak.json` / UITSPRAAK.md: DNA (gewoon), RNA (gewoon bij eleven_v4; regel in uitspraak.json zet 'er-en-aa'), semi-conservatief, Messelson en Staal, DNA-ripair-enzymen, vijf-accent / drie-accent, het jaar 1958, S-fase/M-fase/DNA-polymerase/primer/Okazaki-fragmenten zoals geschreven, RNA-polymerase gewoon, chromatiden zoals geschreven. Nieuwe risicowoorden: zie `uitspraak.md`.

## Dekking leerdoel → niveau → hoofdstuk → vraag

| Leerdoel (de leerling kan …) | Niveau | Hoofdstuk | Vraag |
|---|---|---|---|
| uitleggen waarom en wanneer (S-fase) DNA wordt gekopieerd | basis | 1 | q4, checkvraag 3 |
| beschrijven hoe helicase en DNA-polymerase met vrije nucleotiden een complementaire streng maken | basis | 2 | q8, checkvraag 1, 2 |
| uitleggen hoe replicatie in een paar uur klaar is (vele startpunten) | basis | 3 | q12 |
| uitleggen wat semiconservatief betekent en hoe Meselson en Stahl het aantoonden | vwo | 4 | q16 |
| met 5'→3' en primer uitleggen waarom er een leidende en een volgende streng is | vwo | 4 | checkvraag 4 |
| DNA-polymerase onderscheiden van RNA-polymerase en reverse transcriptase | vwo | 4 | checkvraag 5 (oude virusvraag) |
