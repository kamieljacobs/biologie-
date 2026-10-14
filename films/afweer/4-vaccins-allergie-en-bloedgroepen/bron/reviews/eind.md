# Eindreview — Afweer 4/4 "Vaccins, allergie en bloedgroepen"

Geordend op ernst. Regelnummers verwijzen naar `scenes.js`, tenzij anders vermeld.

## 1. s23 (vwo): anti-D zit met de steel op de rode bloedcel in plaats van met de armen. Biologisch onjuist (regel 337)
`antiY(..., j * 2.1 + 1.571, 'D', ...)` draait de armen naar buiten en de steel naar de cel (te zien in qa/s23_013.38). De ondertitel zegt op dat moment juist dat de antistoffen de cellen "markeren", en dat gebeurt met de bindplaatsen. Het is ook in tegenspraak met s13/s14/s16, waar de steel op de mestcel uitdrukkelijk "het constante deel" is.
**Fix:** hoek `j * 2.1 - 1.571` (armen naar de cel toe; positie 72/68 kan blijven, want de armtoppen komen dan op ±54 px, waar de D-antigenen zitten).

## 2. Eindkaart: "O resusnegatief geeft aan iedereen" bevestigt precies de misconceptie die H3 weerlegt
`script_v2.md` regel 85 en de eindkaart (s27). In H3 zegt de film dat het plasma van O wél anti-A en anti-B bevat, en dat O daarom alleen universele donor is voor rode bloedcellen. Ook het label in s21 (regel 322) laat "voor rode bloedcellen" weg.
**Fix:** eindkaart: "Anti-A en anti-B heb je al, anti-D pas na contact; O resusnegatief geeft rode bloedcellen aan iedereen." In s21: `'O resusnegatief: donor voor iedereen (rode bloedcellen)'`, of het label in twee regels.

## 3. s07: de baby's en de eerste zieke hebben een vaccinatieschild (regel 197)
`vac` hangt alleen af van `hash(i*3)`. Bij i=52 (0,32), i=85 (0,43) en i=50 (0,35) geeft dat in de 95%-situatie altijd "gevaccineerd". Daardoor staan de goud omcirkelde baby's met een blauw schild in beeld terwijl de stem zegt "die zelf geen vaccin kunnen krijgen" (qa/s07_017.68). De zieke patiënt nul is ook "gevaccineerd en ziek".
**Fix:** `const vac = !baby && !ziek0 && (hi > 0.5 ? hash(i*3) < 0.95 : hash(i*3) < 0.4);`

## 4. Kleuren van antigeen A/B/D zijn anders dan in het Bloedgroepenlab, en anti-A/anti-B zijn omgedraaid ten opzichte van echte testsera (regel 111)
In de film is A lichtgeel, B turquoise en D roze. In het Bloedgroepenlab (waar de film naar verwijst) is A blauw (`--ag-a #4a8fe6`), B oker (`--ag-b #c08400`) en D groen (`--ag-d #199e70`). Het lab zegt ook dat anti-A blauw en anti-B geel gekleurd is, net als echte testkaartjes. In de film is anti-A juist geel, dus leerlingen zien in de film het omgekeerde van wat ze daarna in het lab en in de klas zien.
**Fix:** neem de tinten van het lab over, iets lichter voor de donkere achtergrond, bijvoorbeeld `KA = '#5B9BEA', KB = '#D9A21E', KD = '#2DB585'`. Check daarna s18: het label `anti-A-serum` neemt automatisch de nieuwe KA-kleur over.

## 5. s15: eilandcellen vallen uit elkaar voordat de T-killercellen er zijn (regel 267–269)
`kapot` en de beweging van de T-cellen gebruiken dezelfde `at`-ramp. Daardoor zijn de cellen al kapot terwijl de T-killers nog buiten het eilandje zitten (qa/s15_017.90). Dat suggereert dat de cellen vanzelf doodgaan.
**Fix:** `kapot: i < 3 ? 0.8 * Math.max(0, (at - 0.7) / 0.3) : 0` (afbraak pas na aankomst), en eventueel een `vonk` bij contact.

## 6. s18 bloedgroepbepaling: geen antistoffen te zien bij "antiserum", de negatieve put lijkt ook geklonterd, en de kop verklapt het antwoord (regel 301–304)
- Het anti-A-serum (de Y's) verschijnt pas bij `samenklontert` (22,1 s). Bij "je druppelt er antiserum bij" zie je dus geen antistoffen, en tussen 22,1 en 24,6 s ('mag') blijft het klonteren maar ±2,5 s in beeld.
- De 9 cellen staan op willekeurige `hash`-posities en overlappen elkaar ook in de anti-B-put. Dat lijkt op klontering (qa/s18_015.66).
- De kop "een druppel bloed van bloedgroep A" geeft de uitkomst al weg voordat de test gedaan is.

**Fix:** antistoffen in beide putten laten verschijnen met `q.on('antiserum',1)`, in beide kleuren. Klonteren starten bij `q.at('kijkt')` in plaats van bij 'samenklontert'. In de niet-klonterende put een rooster zonder overlap gebruiken (`x + ((j%3)-1)*85 + jitter`, `y + (Math.floor(j/3)-1)*85`). Kop: `'een druppel bloed: welke bloedgroep?'`, en de tag onderaan geeft het antwoord.

## 7. s21: "heb je al vanaf het begin" is in tegenspraak met s17 "vanaf je eerste levensjaar"; AB resuspositief staat maar ±2 s in beeld (regel 320, 322)
"Vanaf het begin" suggereert dat je anti-A en anti-B al bij de geboorte hebt. De film (s17), het docentdeel en het lab zeggen allemaal: eerste levensmaanden of eerste levensjaar.
**Fix:** `'heb je al, ook zonder contact'`. De AB-cel komt nu op `q.on('iedereen', 2)` (30,8 s, het einde van de alinea is 32,7 s). Zet hem op `q.on('resuspositief', 3)` (28,9 s, "AB, resuspositief,").

## 8. Overlappende labels in s16 en s22
- **s16 (regel 280–282):** "allergeen verbindt twee IgE" (links uitgelijnd vanaf x≈977, y≈237) loopt door "IgE / STEEL VAST OP DE MESTCEL" (1200,200) heen (qa/s16_026.24). **Fix:** zet het allergeenlabel links van de korrel: `regel(ctx, 'allergeen verbindt twee IgE', mx - 60, ..., 'right', 700)`, of zet het IgE-label lager op (1250, 330).
- **s22 (regel 329):** het vinkje en "meestal gezond" (y 760/772) staan over "eerste kind: resuspositief" (y 750, uit `moederKind`) (qa/s22_023.72). **Fix:** `vink(ctx, 520, 800, 22, ...)` en de tekst op `(560, 810)`.

## 9. Leesbaarheid: tags over beeldelementen of tegen de rand (s14, s06, s10, s17)
- **s14 (regel 257–263):** de stuifmeelkorrels komen bij y≈20–126 binnen en liggen over de tags op y=120 (qa/s14_002.73). **Fix:** alle vijf tags naar `y = 860` (het haarvat eindigt op ≈789).
- **s06 (regel 190–191):** de tag "wel al geheugencellen ★" (y=220) ligt over de astitel "HOEVEELHEID ANTISTOFFEN" (y≈230) (qa/s06_022.77). **Fix:** `Y = 290` (de spuiten komen dan op 790 en blijven onder 900), of beide tags naast elkaar op y=130.
- **s10 (regel 218):** de tag "geen B-cel, dus geen geheugencel" begint op x=1360 links uitgelijnd en eindigt op ≈1915 px, tegen de rand (qa/s10_016.11). **Fix:** `tag(ctx, ..., 1880, 300, ..., 'right')`, of zet hem op 960,150 en laat hem overvloeien in de passieve-immunisatie-tag.
- **s17 (regel 289):** in het O-vak liggen de anti-B-Y's (y≈710) over het label "anti-A en anti-B" (y=750) (qa/s17_025.23). **Fix:** het vak hoger maken (`roundRect(..., 560, 340, 240, ...)`) en het label op `y = 788`.

## 10. sections.html, checkvraag 4c en 2c: de vraag vraagt kennis die niet in de film zit, en er staan te veel deelvragen per punt
- **4c (regel 20–21):** de tweede helft (anti-A/anti-B van een O-moeder bij een A-kind) is alleen te beantwoorden als je weet dat anti-A en anti-B IgM zijn. Dat staat niet in de film, alleen in het docentdeel en in de vwo-verdieping van het lab. **Fix:** geef de informatie in de stam ("Natuurlijke anti-A en anti-B zijn vooral IgM: grote antistoffen die bijna niet door de placenta gaan; anti-D is IgG en gaat er wel door.") en vraag "Leg met deze informatie uit …". Of laat de tweede helft weg en maak er 1p van; dan 4a of 4d op 2p/3p brengen om op 7 punten te blijven.
- **2c (regel 11):** twee opdrachten (verwachte uitkomst én waarom de test onbetrouwbaar is) voor 1p. **Fix:** 2p, en dan 2a naar 1p (één controle-uitleg per druppel is dan ½), of formuleer het als één opdracht: "Leg uit waarom de test dan niet betrouwbaar is. Gebruik druppel 2."

## 11. s10 tegenover checkvraag 1: de afbraak van serum-antistoffen klopt niet met elkaar (regel 139)
`serumCurve` daalt met e^(−0,75/week): na 3 weken is ±12 % over, na 6 weken ±1 %. In checkvraag 1 (tabel groep 2) is op dag 28 nog de helft over (20 van 40), op dag 90 nog 3. Daar hoort het antwoord "na ongeveer 90 dagen bijna niets" bij. Leerlingen zien zo twee verschillende tijdschalen voor hetzelfde begrip. De tabel is realistischer (halfwaardetijd van tetanus-immunoglobuline ±3–4 weken).
**Fix:** `serumCurve(s) = s < 0.15 ? 600*s : 90*Math.exp(-(s-0.15)*0.25)`, met `xmax: 12` en `xticks: [0,2,4,6,8,10,12]`. Het gesproken "na een paar weken afgebroken" kan dan blijven als "na een paar weken grotendeels afgebroken", of de vraagoptie (a) verandert in "een paar weken tot maanden".

## 12. Tagwissels op dezelfde plek lopen door elkaar (s07, s13, s06)
Bij `tag(A, a*(1-on(B)))` + `tag(B, on(B))` staan beide tags tijdens de fade half zichtbaar over elkaar. Dat levert onleesbare tekst op in de contactsheets: s07 "te weinig gevaccineerd / mazelen", s07 "ook baby's / groepsimmuniteit" (qa/s07_017.68) en s13 "vastzitten / splinter".
**Fix:** een helper die eerst laat uitfaden en dan pas laat infaden, bijvoorbeeld `const out = v => Math.max(0, 1 - 2*v), inn = v => Math.max(0, 2*v - 1);` en dan `tag(A, ..., a*out(q.on(B)))` + `tag(B, ..., inn(q.on(B)))`.
