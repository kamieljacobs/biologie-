# Wat is DNA? — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/dna/1-wat-is-dna.html (oude artifact-versie: https://claude.ai/code/artifact/2ba4db31-c528-497f-9d29-1110a15695ea) |
| Reeks / nummer | DNA, aflevering 1 (pagina: “DNA · aflevering 1 · havo en vwo”; eindkaart: “volgende aflevering: DNA kopiëren”) |
| Doelgroep / niveau | havo + vwo, met vwo-blok (hoofdstuk 4 “Richting, bruggen en verpakking”, `level:'v'`); Havo/Vwo-schakelaar slaat dat hoofdstuk over |
| Versie / datum | 1.0 · 8 oktober 2026 (footer op de pagina) |
| Stem / model | Roos (ElevenLabs); model onbekend (niet in de HTML) |
| Duur | 5:30 gesproken (som van 16 mp3’s, 330,2 s); speler-totaal incl. kaarten, 0,6 s naloop per vertelsegment en 10,5 s denktijd per vraag: vwo 6:41, havo 4:50 (zonder wachttijd bij de vragen) |
| Beeldstijl | Stijl C “Papier en inkt” (reeksstijl DNA, van vóór de Part C-stijlkaart): warm gebroken wit (#F6F1E7) met stippelkorrel, serif (Liberation Serif/Times) voor titels en kernbegrippen, sans voor labels; vaste basenkleuren A geel, T blauw (#3F7FD6), C groen, G oranje; alles op één 1920×1080-canvas getekend; geen ingebedde fonts |
| Audio-opslag | 16 fragmenten, één per vertel- of vraagsegment, als base64-data-URI in `window.AUDIO` (blobs 001–016) |
| Reconstructie | 2026-10-12, uit de artifact-versie, verhuisd naar de site |

## Opbouw

| Begin (vwo) | Begin (havo) | Hoofdstuk | Segmenten | Type (docentdeel) | Kernbeeld (docentdeel) |
|---|---|---|---|---|---|
| 0:00 | 0:00 | Opening | n0 | — | wattenstaafje, cirkel met wangcellen, kop “Twee meter DNA in elke cel. Hoe past dat?” |
| 0:22 | 0:22 | 1 Van wang tot molecuul | n3, q4, n5 | B structuur, schaal | continue zoom cel → kern; 46 uitgerolde draden; één draad recht getrokken naast een lineaal |
| 1:15 | 1:15 | 2 De bouwsteen en de ladder | n7, n8, q9, n10 | B + A | uitvergrote nucleotide; simulatie waarin losse nucleotiden alleen op hun partner blijven plakken |
| 2:51 | 2:51 | 3 Van volgorde tot gen tot genoom | n12, q13, n14 | B organisatieniveaus | één groeiend schema base → genoom; 2 % coderend |
| 4:15 | — | 4 Richting, bruggen en verpakking (vwo) | n16, n17, q18, n19 | B + A | genummerde suiker; waterstofbruggen; smelt-vergelijking AT-rijk vs GC-rijk; wikkelen om histonen |
| 6:07 | 4:15 | 5 Samenvatting (“Terug naar het wattenstaafje”) | n21 | — | samenvatting met het wattenstaafje |

Begintijden = begin van de hoofdstukkaart in de speler. De type-letters komen uit de tabel “Hoe de film het uitlegt” in het docentdeel (A–I-codes alleen als letter + woord).

## Vragen

### Voorspelvragen in de film (`kind:'q'` in `window.SCRIPT`)

| Nr | Plek | Vraag | Opties | Juist | Misconceptie-optie | Niveau |
|---|---|---|---|---|---|---|
| V1 | H1, 0:48 | Als je alle 46 chromosomen van één cel achter elkaar legt, hoe lang is dat dan? | A. ongeveer twee millimeter / B. ongeveer twee centimeter / C. ongeveer twee meter | C | A | basis |
| V2 | H2, 2:13 | Je kent van één streng de volgorde: A T T G C. Wat is dan de andere streng? | A. A T T G C / B. T A A C G / C. C G T T A | B | A | basis |
| V3 | H3, 3:31 | Welk deel van jouw DNA bestaat uit genen die voor eiwitten coderen? | A. bijna alles / B. ongeveer de helft / C. ongeveer twee procent | C | A | basis |
| V4 | H4, 5:11 | Twee stukjes DNA, even lang. Het ene heeft veel C en G, het andere veel A en T. Welk stukje laat bij verwarmen het eerst los? | A. het stuk met veel C en G / B. het stuk met veel A en T / C. ze laten tegelijk los | B | C | vwo |

Gesproken vragen eindigen op “Wat denk je?” (op de vraagkaart wordt dat weggelaten). Het antwoord wordt aan het begin van het volgende vertelsegment gegeven (“Twee meter. Dat is C.”, “B. …”, “C. …”, “B. …”).

### Checkvragen op de pagina (`window.CHECKS`)

Basis (havo en vwo):
1. Een plant neemt uit de bodem fosfaat en nitraat op. Welke van beide heeft hij nodig voor de fosfaatgroep van een nucleotide, en welke voor de stikstofbase?
   *Antwoord:* Fosfaat voor de fosfaatgroep; nitraat (stikstof) voor de stikstofbase.
2. Een stukje DNA bevat 30% adenine. Hoeveel procent guanine bevat het? Leg uit.
   *Antwoord:* 20%. A paart met T, dus ook 30% T; samen 60%. De overige 40% is C en G, die paren, dus 20% G.
3. Zet in volgorde van klein naar groot: chromosoom, gen, genoom, nucleotide.
   *Antwoord:* nucleotide → gen → chromosoom → genoom

Vwo:
4. Van een DNA-streng is de volgorde 5'-ATGCCA-3'. Noteer de complementaire streng met de juiste uiteinden.
   *Antwoord:* 3'-TACGGT-5', wat je van 5' naar 3' schrijft als 5'-TGGCAT-3'.
5. Vóór een celdeling worden chromosomen zichtbaar als staafjes. Leg uit met de begrippen nucleosoom en chromatine waardoor dat komt.
   *Antwoord:* Het DNA is om histonen gewikkeld tot nucleosomen; die kralenketting (chromatine) wordt vóór de deling verder opgevouwen en gecondenseerd tot een compact staafje.

## Begrippen

Uit `window.GLOSSARY` (derde veld `'v'` = vwo, in havo-weergave verborgen). Boven de lijst een kleurlegenda: adenine, thymine, cytosine, guanine, fosfaat, desoxyribose.

- **DNA** — Desoxyribonucleïnezuur; bevat de informatie voor alle erfelijke eigenschappen van een organisme.
- **nucleotide** — Bouwsteen van DNA: een fosfaatgroep, de suiker desoxyribose en een stikstofbase (A, T, C of G).
- **basenparing** — Stikstofbasen verbinden twee nucleotideketens met een vaste partner: A met T, C met G.
- **dubbelstrengs DNA** — Twee nucleotideketens die door basenparing bij elkaar worden gehouden.
- **helixstructuur** — De twee ketens zijn in een spiraal om elkaar heen gedraaid.
- **chromosoom** — Een zeer lang dubbelstrengs DNA-molecuul.
- **nucleotidenvolgorde / DNA-sequentie** — De volgorde waarin de nucleotiden in een DNA-molecuul staan.
- **gen** — Een stuk DNA dat de informatie bevat voor één eiwit.
- **genoom** — Alle DNA-moleculen in een cel van een organisme.
- **coderend / niet-coderend DNA** — DNA dat wel, respectievelijk niet, codeert voor eiwitten.
- **plasmiden** — Korte stukjes circulair DNA in het cytoplasma van sommige prokaryoten.
- **complementair** *(vwo)* — Elke base in de ene streng heeft een vaste partner in de andere; ken je één streng, dan ken je de andere.
- **antiparallel** *(vwo)* — De twee strengen lopen in tegengestelde richting: 5'→3' naast 3'→5'.
- **5'- en 3'-uiteinde** *(vwo)* — Uiteinden van een streng: aan het 5'-uiteinde een vrije fosfaatgroep, aan het 3'-uiteinde een vrije OH-groep.
- **waterstofbrug** *(vwo)* — Zwakke binding tussen de basen: twee bij A–T, drie bij C–G.
- **hybridisatie** *(vwo)* — Het weer paren van losse strengen met een passende volgorde na verhitten en afkoelen.
- **histonen / nucleosoom / chromatine** *(vwo)* — Eiwitten waar DNA omheen windt; één wikkeling om acht histonen is een nucleosoom; de verder opgevouwen kralenketting is chromatine.

## Docentdeel

Vijf uitklapblokken onder “Voor de docent”:

- **Hoe de film het uitlegt**: tabel per hoofdstuk met type, sleutelbeeld en misconceptie (zie Opbouw). Misconcepties: 1 chromosomen zijn altijd staafjes; 2 beide strengen bevatten dezelfde volgorde; 3 niet-coderend DNA is nutteloos, DNA zit alleen in de kern; 4 strengen lopen in dezelfde richting.
- **Pauze- en bespreekmomenten**: na V1 schatten hoe vaak 2 m in 6 µm moet worden opgevouwen (≈ 300 000×); na V2 eigen streng van 6 basen voor de buurman; na H3 “wat zou een lab vergelijken om twee mensen uit elkaar te houden?”; (vwo) na V4 koppelen aan PCR in aflevering 7.
- **Getallen achter de film** (`window.NUMBERS`):

| Getal | In de film | Bron / berekening |
|---|---|---|
| DNA-lengte per cel | ≈ 2 m | 6,4·10⁹ basenparen (diploïd) × 0,34 nm ≈ 2,2 m (Alberts, Molecular Biology of the Cell) |
| Kerndiameter | ≈ 6 µm | typische zoogdiercel 5–10 µm (Alberts) |
| Chromosoom 1 uitgerold | ≈ 8 cm | 248,9·10⁶ bp × 0,34 nm ≈ 8,5 cm (Ensembl GRCh38) |
| Basenparen per set | 3,2 miljard | GRCh38 ≈ 3,1·10⁹; methodes noemen 3,2 miljard |
| Coderend DNA | ≈ 2 % | 1–2 % exonisch (Alberts; Nectar H17) |
| Waterstofbruggen | 2 (A–T), 3 (C–G) | Alberts |
| Strengen laten los | ≈ 95 °C | denaturatiestap PCR (Nectar H17) |
| Histonen per nucleosoom | 8 | histon-octameer (Alberts) |
| Cellen aan een wattenstaaf | enkele duizenden | niet gecontroleerd in een primaire bron |

- **Vereenvoudigingen**: “een gen bevat de informatie voor één eiwit” is de methode-definitie (RNA-genen, alternatieve splicing buiten beeld); de nucleotidesimulatie toont alleen basenparing, niet het enzym; nucleosoom als acht histonen zonder H1, verdere vouwing schematisch; “ongeveer 95 graden” is de PCR-denaturatiestap, echte smelttemperatuur hangt af van lengte en GC-gehalte.
- **Leerdoelen en dekking**: tabel leerdoel / niveau / hoofdstuk / vraag (nucleotide; basenparing en helix; gen-chromosoom-genoom; coderend/niet-coderend, mtDNA, plasmiden; N en P; vwo: complementair/antiparallel/5'-3'/waterstofbruggen, hybridisatie, histonen-nucleosoom-chromatine).

Bronnen (footer): Biologie voor Jou havo thema 9, Nectar vwo H17, Alberts *Molecular Biology of the Cell*, Ensembl GRCh38.

## Techniek: waar zit wat in de HTML

Regelnummers gelden voor `film.src.html` (uitgepakt met `scripts/filmbron.py`; 699 regels, zelfde regelnummers als de film-HTML).

- **Omhulsel**: r. 1 is de site-wrapper (`<!doctype html><html><head>…<body>`), r. 2 de navigatiebalk (`<nav class="sitenav">`, links naar `../../index.html#home` en `#dna`), en vanaf r. 3 staat het oorspronkelijke artifact-document ín die body (eigen `<!doctype>`, `<html>`, `<head>`, `<style>`). Het bestand eindigt op `</html>` + `</body></html>`.
- **Pagina** (r. 76–148): kop, speler (`#stage` canvas 1920×1080, `#qlayer` vraaglaag met aftelring en knop Verder, `#caption` ondertitels), bediening (afspelen, zoekbalk met hoofdstukmarkeringen, Leerling/Klas, Havo/Vwo, Ondertitels). Docentdeel r. 118–146 (statische HTML, behalve de getallentabel), footer met versie r. 147.
- **`window.SCRIPT`** (r. 153–270): de film als lijst segmenten. `kind:'narr'` (`ch`, `level` 'b'/'v', `scene`, `lines[]` = ondertitelregels, `terms[]` = niet gebruikt), `kind:'card'` (`title`, `sub`, vaste `dur`), `kind:'q'` (`text`, `opts`, `correct`, `misconception` = niet gebruikt door de speler), `kind:'end'`. Daarna `window.CHAPTERS` r. 271, `GLOSSARY` r. 279, `CHECKS` r. 298, `NUMBERS` r. 309.
- **Scènes** (script r. 321–593): tekenhulpjes (`base`, `ladder`, `helix`, `nucleotideExploded`, `cell`, `nucleusThreads`, `schema`, `thermometer`, …) en de scènes als `S.<naam>=(li,lf,t,seg)=>…` vanaf r. 414: `S.open` 415, `S.h1a` 424, `S.h1q` 437, `S.h1b` 438, `S.h2a` 443, `S.h2b` 463 (basenparing-simulatie), `S.h2q` 489, `S.h2c` 490, `S.h3a` 498, `S.h3q` 510, `S.h3b` 511, `S.h4a` 523, `S.h4b` 537, `S.h4q` 550, `S.h4c` 551, `S.recap` 577. `li` = index van de lopende regel in `lines[]`, `lf` = fractie binnen die regel; beelden wisselen dus per **zin** (`li===3`, `li>=5`), niet per woord. Vraagscènes (`h1q` enz.) tonen het eindbeeld van de vorige scène. Kaarten: `renderCard` r. 588, eindkaart `renderEnd` r. 591.
- **`window.AUDIO`** (r. 594, één regel): `{id: {dur, bounds[], src}}`. Sleutel = `'n'` (vertelling) of `'q'` (vraag) + index in `SCRIPT`. `bounds` = begintijden (s) van regel 2, 3, … binnen het fragment. Koppeling: n0=001, n3=002, q4=003, n5=004, n7=005, n8=006, q9=007, n10=008, n12=009, q13=010, n14=011, n16=012, n17=013, q18=014, n19=015, n21=016.
- **Speler** (r. 595–695): `SCRIPT.forEach` (vanaf r. 602) rekent de duur uit: vertelling = `AUDIO.dur + 0,6 s`, regelduur uit `bounds`; vraag = `dur + 0,4 s` voorlezen + 8 s denktijd + 2,5 s; zonder audio een terugval op 140 woorden/min. Eén `Audio`-element (`syncAudio`, r. 611) krijgt per segment de juiste `src`; tijdens een vertelsegment volgt de klok `audioEl.currentTime`. `render()` r. 630: ondertitel = `seg.lines[li]`; bij een vraag na het voorlezen de vraaglaag met opties en aftelring. Leerling-modus wacht op een antwoord, Klas-modus (`?modus=klas`) op de knop Verder; `?niveau=havo` start in havo. Pijltjes ±5 s (Shift ±30 s), spatie = afspelen/pauze.
- **Transcript, begrippen, checkvragen en getallen** worden door de speler uit de data gebouwd (r. 689–692); vwo-delen krijgen class `vonly` en verdwijnen in havo.

## Zo pas je deze film aan

1. **Tekst in beeld**: labels staan als `text('…',x,y,…)` in de scènefuncties (`S.h2a` enz.); titels van hoofdstukkaarten in `SCRIPT` (`kind:'card'`), het hoofdstuklabel linksboven in `chapterLabel('…')` per scène, de eindkaart in `renderEnd`.
2. **Eén segment opnieuw inspreken**: vervang het blob van dat segment (tabel hierboven, zelfde naam) en pas in `window.AUDIO[<id>]` `dur` en `bounds` aan (begintijden van regel 2 t/m n, bijv. uit ElevenLabs-timestamps). Het aantal `bounds` moet `lines.length − 1` zijn. De rest van de film schuift vanzelf mee.
3. **Ondertitel/zin wijzigen**: pas `lines[]` in `SCRIPT` aan én neem dat segment opnieuw op; ondertitels en audio horen per segment bij elkaar. Een regel toevoegen of weghalen verschuift `li`, en de scène gebruikt `li===k` voor beeldwissels: controleer die functie.
4. **Vraag aanpassen**: `SCRIPT[i].text/opts/correct`; het q-fragment en het begin van het volgende vertelsegment (dat het antwoord noemt) opnieuw inspreken als de tekst verandert. Meer dan drie opties kan niet zonder de letters `'ABC'` in de speler (r. 644 en 690) uit te breiden; aflevering 2 doet dat al met `'ABCD'`.
5. **Havo/vwo**: een segment wordt vwo-only met `level:'v'`; het label “vwo” verschijnt op de hoofdstukkaart (`levelTag`) en in de scène als je daar `levelTag()` aanroept.
6. **Inpakken**: werk in een tijdelijke map met `python3 scripts/filmbron.py uitpakken|inpakken|controleer`; zet geen uitgepakte mappen in de repo.

## Aandachtspunten

- Dubbel documentskelet: de site-wrapper (r. 1–2) staat vóór het complete artifact-document (`<!doctype>`/`<html>`/`<head>` op r. 3–74). Browsers vergeven het, maar het is geen geldige HTML; het eerste `<title>` (op r. 8) is wel het juiste.
- Ouder datamodel dan de latere reeksen: geen woordtijden, alleen zinsgrenzen (`bounds`); geen ingebedde fonts (Liberation/Times/Arial uit het systeem, dus het beeld verschilt per apparaat); de denktijd (8 s) zit vast in de speler.
- In de havo-weergave noemt de hint onder de speler alleen “hoofdstuk 4 wordt overgeslagen”; het vwo-pauzemoment en vwo-leerdoelen worden netjes verborgen. Velden die de speler niet gebruikt: `terms[]`, `misconception`. Stemmodel (bijv. eleven_multilingual_v2) staat niet in de HTML.
