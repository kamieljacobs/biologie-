# Eindreview (fresh eyes) — Uitscheiding en evenwicht

Bekeken: script_v2.md, segments.json (display/voice), words/*.json (cuewhere/cuecheck: geen missende cues), scenes.js, film.py, alle stills in qa/. Vakinhoud script, vragen en checkvragen gecontroleerd. De massabalansen in checkvraag 2/4 kloppen (ureum 5,1 = 5,1; kalium 0,72 ≈ 0,70; HCO₃⁻ 3,0 = 3,0; meestroom-evenwicht 9,4), de pH-waarden in checkvraag 3 kloppen met Henderson-Hasselbalch, en "correct" in film.py komt overeen met "Antwoord aa/bee" in de audio (q02=a, q05=b, q09=a, q16=b, q19=b). Hieronder alleen wat beter moet.

## Hoog

**1. s20 — het beeld spreekt de uitleg over familie tegen.** Op "familie" (8,9 s) krijgt cel 3 vier gelijke rondjes ("lijkt op jou"), maar juist die cel wordt op dat moment door de afweercel aangevallen (ax = 1180, pal naast cel 3 tot "medicijnen"). Bovendien wordt nergens getoond hoe "jouw" eiwitten eruitzien, dus het gele rondje betekent niets.
Fix: teken links een referentiecel `cel(ctx, 220, 480, 160, 120, {naam:'jouw cel'})` met vier gouden rondjes. Laat de afweercel terugwijken zodra familie komt: `ax = lerp(1500, 1180, ramp(t, q.at('valt'), 2) * (1 - q.on('familie', 1)) * (1 - q.on('medicijnen', 1)))`. Of: laat de afweercel cel 1 aanvallen (lerp naar ~640) en laat cel 3 met rust.

**2. s12 — bloed gaat aan dezelfde kant de filter in en uit.** Beide slangen (scenes.js r.149) eindigen bij x = 1080, links van de filter. De bovenste eindigt bovendien in het niets (y = 360, boven de filterrand op 380). De bloedpijlen boven de filter lopen van links naar rechts, dus het bloed moet rechts weer naar buiten. Nu suggereert het beeld een doodlopende zak in plaats van doorstroming.
Fix: aanvoer naar het linkeruiteinde (`bezierCurveTo(700,300, 950,380, 1095,460)`) en terugvoer vanaf het rechteruiteinde (`moveTo(1510,460); bezierCurveTo(1600,760, 800,780, 500,560)`). Zet op elke slang een pijlpunt (`arrow(...)`) voor de richting.

**3. s06 — bloedvat ín de levercel, en de stikstofgroep blijft aan het aminozuur.** De ellips van de levercel loopt van x 140 tot 1420. `bloedLijn(ctx, 1000, …)` begint dus midden in de cel, zodat het bloed zichtbaar door het cytoplasma loopt (still s06_030.55). Daarnaast staat in r.92 `0.7 * (1 - st[1] * 0.0)`: het blauwe N-bolletje blijft aan het aminozuur hangen terwijl er "stikstofgroep eraf" staat en NH₃ ernaast verschijnt.
Fix: ellips `ctx.ellipse(620, 470, 500, 270, …)` (x 120–1120, ureum op 930 blijft erin), `bloedLijn(ctx, 1180, 470, 1500, t)` en een ureumdeeltje dat met `st[4]` van 930 naar het bloed beweegt. Blauw bolletje: alpha `1 - st[1]` en laat het met `st[1]` naar (640, 470) schuiven.

**4. s07 — typefout op het scherm: "PH VAN JE BLD".** In `phSchaal` (r.222) staat `metaText(ctx, 'pH VAN JE BLD', …)`. "BLOED" mist letters, en metaText zet alles in hoofdletters, waardoor ook "pH" verkeerd geschreven wordt ("PH").
Fix: gebruik `regel(ctx, 'pH van je bloed', x, y - 80, 1, C.grain, 26, 'left', 700)` in plaats van metaText. Hetzelfde hoofdletterprobleem zit in s17 ("UREUM (MMOL/L)", zie punt 15).

## Middel

**5. Titel — de nier loopt door de titeltekst.** "evenwicht" valt over de linkernier (still s03_002.50). In `title()` staan de nieren op cx = 1440 met schaal 2.4.
Fix: zet `cx = 1600` en de schaal op 2.0 (de ureumdruppels en de weegschaal schuiven vanzelf mee).

**6. s04 — het hoofd van het lichaam overlapt de kopregel "HAVO · VWO · GASWISSELING 3/3".**
Fix: `const X = 620, Y = 590, S = 0.85;` (hoofd begint dan rond y 140, de romp eindigt rond y 845).

**7. s10 — de tag "niet minder ademen, maar meer" valt over het label "GEREGELDE WAARDE" en staat maar 1,8 s in beeld** ("minder" 3,0 s → "zuurder" 4,8 s).
Fix: zet de tag in het midden van de kring (`tag(ctx, …, 960, 600, …)`, daar staat pas vanaf 19,6 s het minteken) of op y = 560, en laat hem tot "chemoreceptoren" staan: `q.on('minder',1) * (1 - q.on('ademcentrum',1))`. Laat de minteken-tag dan pas na het wegvallen verschijnen.

**8. s12 (poriën, vanaf 35 s) — de kanten zijn niet benoemd, en glucose beweegt alleen het bloed uit.** Het vliespaneel heeft geen BLOED/DIALYSEVLOEISTOF-vlakken (still s12_040.00). Het enige glucosedeeltje loopt van links naar rechts. Dat is precies de misconceptie die s13 en de recap ontkrachten ("glucose blijft").
Fix: teken `membraan(ctx, 960, 470, 760, 640, { flow: 0 })` als achtergrond in plaats van losse streepjes. Laat glucose heen én terug gaan (een deeltje met `lerp(700,1220,u)` en een met `lerp(1220,700,u)`), met bijschrift "kan erdoor".

**9. s13 — het "="-teken bij glucose en natrium valt weg achter de gestippelde vlieslijn** (leest als "₸", still s13_042.68).
Fix: in `concRij` zet je het "=" niet op x, maar boven de lijn met een donker plaatje erachter: `roundRect(ctx, x-22, y-22, 44, 44, 10); ctx.fillStyle = C.bgSchema; ctx.fill();` vóór `regel(ctx,'=',…)`. Of schrijf "gelijk" rechts naast de vloeistofbalk.

**10. s07 — de pH-schaal suggereert dat 7,4 neutraal is.** De kleurverloop loopt van geel (zuur) via groen in het midden naar blauw, met groen precies op 7,4. De tekst zegt op dat moment juist "heel licht basisch". Een leerling leest groen-in-het-midden als neutraal.
Fix: in `phSchaal` een markering op 7,0: `ctx.fillRect(X(7.0)-2, y-10, 4, 80); regel(ctx, '7,0 = neutraal', X(7.0), y + 150, 1, C.text2, 24, 'center')`. Verschuif de groene stop naar 7,0 (`addColorStop(0.1, …)`) zodat het hele normale gebied aan de basische kant kleurt.

## Laag

**11. s04 — de darm licht pas op bij "bruin" (33,9 s), niet bij "Die gal komt in je darm" (~30 s).** Er is ook geen route van lever naar darm.
Fix: `darm: … + q.on('gal', 3) * (1 - q.on('nieren', 1))` (let op de deelstring: de tweede treffer is "galkleurstof", de derde is "Die gal" op 29,4 s). Teken eventueel een korte groenbruine lijn van de lever naar de darm met `q.on('gal',3)`.

**12. Lege frames.** s06 0–5,3 s heeft alleen een tag (still s06_003.29). s07 33,9–45,9 s heeft alleen twee pilletjes linksboven (still s07_043.15). s13 0–9,7 s toont een leeg membraanpaneel bij "dat is diffusie, van hoog naar laag".
Fix: laat in s06 de lever uit s04 (orgaanKaart met lit.lever) kort staan tot "Aminozuren". Laat in s07 de H⁺-deeltjes al vanaf "Toch" (in plaats van "waterstofionen") uit de pilletjes naar het midden stromen. Laat in s13 vanaf "diffusie" een paar ureumdeeltjes van links naar rechts bewegen (zoals in s01).

**13. s11 — de vergelijking en de nierbuiscel staan links in beeld; de rechterhelft blijft leeg.** De x-waarden lopen van 200 tot 1010.
Fix: tel 350 op bij alle x-waarden in `parts`, bij de pijlen (300→650, 960→1310), bij de bijschriften (630→980) en bij het nierbuisblok (+300).

**14. s01 en s21 — de verduistering is doorzichtig.** In s01 schijnt Ruud door het BLOED-paneel heen (alpha 0.9, still s01_024.23). Dat leest rommelig.
Fix: `rgba('#0B0F16', 1)` voor de overlay in s01, of geef het membraanpaneel een dekkende ondergrond. In s21 vallen de recaptags over het scherm van de machine. Schuif ze naar x = 1480, of zet ze in een donker paneel `roundRect(ctx, 1060, 500, 820, 360, 24)`.

**15. Kleinigheden.**
(a) In s17 staat "UREUM (MMOL/L)" door metaText-hoofdletters. Geef `grafiek` een gewoon label of schrijf "ureum in mmol/L" met `regel`.
(b) In s08 ontstaan de zure stoffen (ketonen) in werkelijkheid in de lever. Het beeld "cel zonder insuline → H⁺" is een vereenvoudiging. Voeg in film.py → Vereenvoudigingen toe: "Ketonen worden vooral in de lever gemaakt uit vetzuren; de film zegt 'je cellen'."
(c) Dode code in s17: `tag(ctx, 'thuis, ook ’s nachts', …, q.on('buiten', 1) * 0)`. Verwijderen.
