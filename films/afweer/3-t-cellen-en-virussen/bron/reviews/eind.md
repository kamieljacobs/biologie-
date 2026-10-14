# Eindreview Afweer 3/4: T-cellen en virussen

Geordend op ernst. Cue-tijden komen uit `words/*.json` (via cuewhere.py).

## 1. s15: y-as zegt "PER ML" in plaats van per µL (ernstig, inhoud)
`ylab: 'T-helpercellen per µL'` wordt door de as-stijl in hoofdletters gezet. `µ` wordt dan `Μ` (Griekse hoofdletter), en dat leest als **"T-HELPERCELLEN PER ML"**. Dat is een factor 1000 fout, en het botst met de gesproken tekst ("per microliter") en met checkvraag 3. De viruscurve staat bovendien op dezelfde as, zonder eigen eenheid. Daardoor lijkt het alsof er na ongeveer 7 jaar "meer virus dan T-helpercellen" is.
**Voorstel:** `ylab: 'T-helpercellen per microliter'` (of de uppercase in `grafiek` uitzetten voor de ylab). Pas de legenda aan: `regel(ctx, '— hoeveelheid virus (relatief)', …)`.

## 2. s18 (vwo): reverse transcriptie gebeurt buiten de cel, en de cel valt deels in de ondertitelzone
- **Inhoud:** RNA, reverse transcriptase en het nieuwe DNA staan los in de ruimte (x 420–1000). Het DNA beweegt pas daarna een cel in. In werkelijkheid gebeurt dit in het cytoplasma van de T-helpercel, nadat hiv is binnengedrongen. Het "inbouwen in het DNA van de T-helpercel" is ook niet te zien: de kern bevat geen DNA van de cel zelf, en de virus-dubbelstreng steekt uit de kern.
- **Timing:** `bouwt` valt op 11,8 s, maar de T-helpercel verschijnt pas op `T-helpercel` (13,4 s). Het DNA schuift dus eerst naar een lege plek.
- **Layout:** `tCel(1380, 620, 230)` met stekels tot 1,3·r loopt door tot y ≈ 920, dus onder de 900. Het label "T-helpercel" op y 880 wordt door een stekel doorkruist. De tag "veel hiv-remmers remmen reverse transcriptase" (960, 820) overlapt de cel.

**Voorstel:** zet de T-helpercel vanaf het begin in beeld, op (1250, 450) met r 260 en zonder fade (of met `a: q.on('RNA',1)`). Laat hiv aan de rand fuseren en teken RNA, RT en DNA binnen de cel (bijvoorbeeld RNA op 1080–1200, y 380). Teken in de kern een streng eigen DNA (bijvoorbeeld grijsblauw) waarin het virus-DNA bij `bouwt` als gekleurd stuk wordt opgenomen. Zet het label op y ≈ 450 + 1,3·260 + 40 = 828 links naast de cel, of laat het weg en gebruik `label()`.

## 3. Ondertitels tonen de uitspraakspelling "Antwoord aa. / bee. / cee." (ernstig, leesbaarheid)
Te zien in sheet 1 (s06, s09) en sheet 3 (s17). De `display`-velden in `segments.json` (regels 246, 409 en 1017) nemen de stem-respelling over.
**Voorstel:** maak er `"Antwoord a."`, `"Antwoord c."` en `"Antwoord b."` van in display, en ook in de scriptregels 35, 43 en 65 als display daaruit wordt gegenereerd. Voice blijft "aa/cee/bee". Voor consistentie met s06 kan er ook een beeldtag bij: in s09 `tag(ctx, 'antwoord c: de hele cel wordt gedood', 960, 140, C.goud, q.on('cee',1) * (1 - q.on('Daarvoor',1)))`, in s17 zie bevinding 4.

## 4. s17: de verbetering staat in beeld terwijl de stem de misvatting uitspreekt
`tag('hiv zelf maakt je niet zo ziek', … q.on('Misschien',1))` verschijnt op 1,5 s, terwijl Roos zegt: "Misschien dacht je: hiv maakt je zelf zo ziek." De tag zegt dus het tegendeel van wat je op dat moment hoort, en "niet zo ziek" is ook nog vaag.
**Voorstel:** `tag('antwoord b: geen startsein meer', 960, 140, C.goud, q.on('bee',1) * (1 - q.on('Maar',1)))`, en daarna `tag('niet van hiv zelf, maar van andere ziekteverwekkers', 960, 140, C.koraal, q.on('Maar',1) * (1 - q.on('specifieke',1)))`. Daarmee vervallen de huidige tags op `Misschien` en `andere`.

## 5. s05: vrijkomende virussen in de ondertitelzone en door de tag, slottag nauwelijks zichtbaar
De vrijgekomen virussen krijgen `y = cy + sin(an)·d·0,8` met d tot 2r = 520. Die y komt tot ≈ 935 (still s05_018.87: virussen onder "cel van je luchtwegen" en tegen de ondertitel aan). Twee virussen liggen ook over de tag "ze infecteren de buurcellen" (y 140). De tag "je cel is gekaapt" start op `gekaapt` (19,0 s), het allerlaatste woord, en is dus vrijwel niet te zien.
**Voorstel:** `const vy = clamp(cy + Math.sin(an) * d * 0.8, 210, 800)` en d maximaal `r * 1.7`. Start de slottag eerder met `ramp(t, q.at('gekaapt') - 0.8, 0.4)`, en fade de buurcellen-tag daarop uit.

## 6. s10: de spreektekst noemt een passende receptor, maar die is niet te zien; de inset is krap
- "Een T-killercel heeft een receptor die precies past op zo'n stukje virus": `tCel` tekent alleen streepjes en geen receptor met de vorm van het virusstukje. Het sleutel-slotprincipe uit film 1 en 2 ontbreekt daardoor juist hier.
- De Let-op-inset (fillRect 1380–1900) raakt de MHC-houders van de geïnfecteerde cel (rechterrand ≈ 1370). De teksten erin zijn 24–26 px.

**Voorstel:** teken in p1 een receptor (`sleutel(ctx, tx + 95, 420, 3, 14, 1.571, 1, TK, q.on('past',1))`) tegenover een virusstukje van de cel. Schuif tijdens `let_` de hoofdscène naar links: `const sx = -250 * let_` bij `lCel` en `tCel`. Zet de insetfonts op 28 px.

## 7. s09: tag "T van thymus" en de pijl staan maar ongeveer 1 s in beeld
Beide verschijnen op `vandaan` (17,0 s), maar de crossfade naar p3 begint op `Weet` (18,0 s).
**Voorstel:** laat de tag en de pijl starten op `q.on('thymus',1)` (13,4 s). Of laat p3 pas beginnen op `q.on('oppervlak',1)` in plaats van op `Weet`.

## 8. s14 (vwo): "MHC verschilt per persoon" is niet te zien
De donorcellen krijgen dezelfde grijze houders (`MHCK`) als je eigen cellen in s09, s10 en s13. Het kernpunt (vreemde MHC) zit dus alleen in de tekst.
**Voorstel:** voeg een `mhcCol`-optie toe aan `lCel` (default `MHCK`) en geef de donorcellen bijvoorbeeld `mhcCol: '#5BA4C9'` met een andere houdervorm. Zet bij `verschillen` een eigen cel (`lCel(560, 470, 90, …)` met grijze houders) ernaast, met labels "jouw MHC" en "MHC van de donor".

## 9. s15: tags overlappen en blijven te lang staan
"jaren weinig klachten, gemiddeld ± 10 jaar" (links op X+200, breed tot x ≈ 1265) en "aids: onder de 200" (gecentreerd op 1200) overlappen tijdens de crossfade (still s15_024.17). De jaren-tag blijft ook 15 s staan, door de zin "Normaal heb je er…" heen.
**Voorstel:** `q.on('jaren',1) * (1 - q.on('Normaal',1))`. Zet de aids-tag bij de 200-lijn: `tag(ctx, 'aids: onder de 200', X + Wg - 10, ya - 24, C.koraal, ad2, 'right')`, of houd y 150 aan maar met `align 'right'` op X+Wg.

## 10. s19: "een condoom beschermt" leest als onderdeel van "niet via"
De tag staat in de rechterkolom onder "niet via · zoenen · knuffelen" (1360, 620).
**Voorstel:** zet hem los onder beide kolommen, bijvoorbeeld `tag(ctx, 'een condoom beschermt', 960, 760, C.goud, q.on('condoom',1))`.

## 11. Checkvraag 2: proefopzet en antwoord 2d kloppen niet helemaal
- T-killercellen herkennen virusstukjes alleen op MHC dat bij ze past. Met "lichaamscellen van muizen" van een andere stam doden de T-cellen ook niet-geïnfecteerde cellen (vreemde MHC, zie s14). Dan klopt buis 3 niet meer.
- In antwoord 2d is de eerste punt-reden ("antistoffen kunnen niet in de cel komen") te kort door de bocht. Geïnfecteerde cellen hebben ook virale eiwitten in hun membraan, en antistoffen kunnen daaraan binden. Het doorslaggevende punt is dat antistoffen zelf geen cellen doden.

**Voorstel:** schrijf in de stam: "lichaamscellen van muizen *van dezelfde stam*". Maak van het 2d-antwoord: "(1) antistoffen kunnen het virus binnen de cel niet bereiken / binden hooguit aan de buitenkant; (1) antistoffen doden zelf geen cellen: dat doen T-killercellen (cellulaire afweer)".

## 12. Kleinere tekstfouten in beeld, film.py en het docentdeel
- **s04:** de tag "eet niet · groeit niet · deelt niet zelf" suggereert celdeling. Maak er "… · vermenigvuldigt zich niet zelf" van, zoals in de spreektekst. Het label "virus ± 0,1 µm" (26 px) is op een telefoon nauwelijks leesbaar; maak het 30 px.
- **film.py** `minis["Hoofdstuk 3"]`: "onschuldige infecties" is misleidend (Pneumocystis is niet onschuldig voor wie aids heeft). Maak er "van infecties die anderen nauwelijks merken" van.
- **s11:** de MHC-houders op de fagocyt zijn grijs (`MHCK`), maar in s13 zijn MHC-II-houders goud. Gebruik in s11 ook `'#E0B64A'`, dan sluit de vwo-uitleg aan.
- **sections.html, docenttabel:** H1 heeft "B + D", het script heeft "Type D + I". Kies één. Vul de vereenvoudigingen aan: "het griepvirus wordt als geheel opgenomen (endocytose) en laat dan pas zijn RNA vrij; de film zegt 'brengt zijn erfelijk materiaal naar binnen'."

Gecontroleerd en in orde: de juist-index van q02 (0), q08 (2) en q16 (1); de antwoorden van checkvraag 1, 3 en 4 (de HLA-haplotypen kloppen onderling: de broer is identiek, de zus en moeder delen elk één blok, ¼ klopt); alle cues worden gevonden (cuecheck: 0 fout).
