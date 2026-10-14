# Eindreview "Gas op reis": fresh eyes

Basis: alle stills in qa/ en de contactsheets, plus extra stills (s04 8/20/50/58 s, s07 31, s08 33, s11 25, s12 30/41, s14 15, s15 59, s16 30/65, s17 15/28,5, s19 14, s20 12/47, s05 7), scenes.js, script_v2.md, segments.json, de woordtijden en film.py.
Vraag/antwoord-consistentie is in orde: q02, q06, q10 en q18 hebben correct=1 en de stem zegt "bee"; q13 heeft correct=0 en de stem zegt "aa". De tag "antwoord b" in s16, s19 en s21 klopt ook. Er missen geen cues (cuecheck: 0 fouten). De bevindingen staan hieronder op volgorde van ernst.

## Hoog

**1. s20: de luchtvakjes spreken de tekst tegen.**
De zuurstofmoleculen worden willekeurig gekozen met `hash(i*3+s) < 0.21`. Zo komt er bij zeeniveau ongeveer 13 van de 40 deeltjes zuurstof uit (ongeveer 33 %) en bij 4000 m ongeveer 11 van de 24 (ongeveer 45 %). De voice-over zegt op dat moment "nog steeds 21 %" en "40 % minder zuurstofmoleculen per ademteug". In beeld heeft 4000 m relatief méér zuurstof, en bijna evenveel O₂-moleculen (11 tegen 13).
*Fix (r. 268):* maak de verdeling vast: `if (i < Math.round(n * 0.21)) o2Mol(...)`, met n = 48 bij zeeniveau en n = 29 bij 4000 m. Dat geeft 10 tegen 6 O₂, dus 21 % in beide vakjes en 40 % minder. Gebruik hash alleen voor de positie.

**2. s16: de twee grafieken (adem inhouden en hyperventileren) lokken de misconceptie uit.**
O₂ en CO₂ staan op één as zonder eenheid.
(a) Adem inhouden: beide lijnen eindigen op ongeveer 90 en raken elkaar rechts. Het label "koolstofdioxide" staat bij y=360, maar de CO₂-lijn eindigt bij y≈246 (zie s16_030).
(b) Hyperventileren: de rode O₂-lijn kruist rond 55 s de stippellijn "drang om te ademen". Wie dat leest, ziet dat dalende zuurstof de ademdrang geeft, precies wat de film wil weerleggen. "zuurstof daalt gewoon door" staat bij y≈320, terwijl de lijn eindigt bij y≈490. "CO₂ begint laag" staat rechtsonder, maar de CO₂-lijn begint links.
*Fix (r. 221-235):* noem de drempels per gas: `'CO₂-drempel: drang om te ademen'` en `'O₂-drempel: flauwvallen'`, en geef de stippellijnen de kleur van hun gas.
- Beter: twee kleine panelen boven elkaar (boven O₂ met de flauwvaldrempel, onder CO₂ met de drangdrempel).
- Leg in (a) de CO₂-lijn op `30 + 0.8*s` (eindigt op 78) en zet de labels op de eindpunten van de curves: `Y + Hg - f(60)/100*Hg`.
- Zet in (b) "CO₂ begint laag" links bij `X+20, Y+Hg-8/100*Hg-14`.
- Zet "zuurstof daalt gewoon door" bij `Y + Hg - 37/100*Hg`.

**3. s12: het beeld geeft het antwoord op vraag q13 weg.**
In `hbMol(ctx,1090,560,0.9,{ o2: 4 - 2*q.on('werkende',1), h: hb })` laat de hemoglobine al twee O₂ los zodra "werkende spier" valt (27,9 s). De vraag "meer of minder los?" komt pas op 37 s (zie s12_030 en s12_041).
*Fix (r. 181):* `o2: 4`. Laat de afgifte pas in s14 zien.

**4. s04: het label "verbruikt zuurstof" valt buiten beeld.**
`label(ctx,'spiercel','verbruikt zuurstof',1600,410,1600,210,…)` zet de tekst links uitgelijnd vanaf x=1600, en "VERBRUIKT ZUURST…" wordt rechts afgekapt (s04_050 en s04_058).
*Fix (r. 108):* zet het labelpunt op `1330, 230`, of geef `forceAlign` 'right' mee met lx ≈ 1880.

## Middel

**5. s04: de O₂-meter en de afgifte bij de spier lopen niet gelijk met de stem.**
(a) De meter bij de spier verschijnt op "spieren" (48,1 s) met waarde 0,95, dus zo vol als de longmeter. Pas op "laag" (50,4 s) zakt hij. Twee seconden lang lijkt de spier een hoge zuurstofspanning te hebben.
(b) `tL = q.at('los',3)` = 55,9 s, het allerlaatste woord (de take eindigt op 56,5 s). Kleurverandering en losgelaten O₂ vallen dus bijna buiten de alinea.
*Fix (r. 106 en 111):* geef de spiermeter vast `0.35` en laat alleen het label "laag" op `q.on('laag',1)` komen. Zet `tL = q.at('laat',1)` (53,6 s).

**6. s17: "steeds meer hemoglobine raakt bezet" gaat in één seconde naar 100 %.**
`k = clamp(bz*3 - i*0.3,…)` hangt aan de fade van 1 s, dus binnen ongeveer 1 s dragen alle 8 moleculen CO (s17_028.5). Dat is niet geleidelijk. 100 % bezet past ook slecht bij het antwoord "je merkt bijna niets".
Daarnaast staat het label "koolmonoxide op de ijzerplek" er al volledig vóór er CO gebonden is, en het overlapt de uitdovende tag "je ruikt het niet" (s17_015).
*Fix (r. 246-248):* `const g = ramp(t, q.at('bezet'), 4); … co: i < Math.round(g*5) ? 4 : 0, o2: … ? 0 : 4` (hooguit 5 van de 8). Geef het label alpha `ramp(t, q.at('ijzerplek') + 1.5, 1)`.

**7. s11: het koolstofdioxide aan het eiwit is rommelig en staat er te kort.**
Op "eiwit" wordt de hemoglobine bovenop de rode bloedcel én bovenop het reactieschema getekend. Het label "CO₂ op het eiwit" wijst naar het CO₂ van de reactie (RX-130), niet naar het CO₂ op hemoglobine (RX-125). Het beeld staat er maar 2,5 s (eiwit 23,6 s tot rest 26,1 s), terwijl dit het kernpunt "eiwit, niet ijzer" is (s11_025).
*Fix (r. 163-168):* vermenigvuldig de alpha van de reactie-elementen (co2Mol, '+', water, pijl, hco3, hIon) met `(1 - ew)`. Laat `ew` uitfaden op `q.on('longen',1)` in plaats van op 'rest'. Leg de co2Mol in hbMol duidelijk buiten de eiwitlobben, bijvoorbeeld op ±110.

**8. s15 (sporten): de CO₂-lijn heeft bijna de hele tijd geen naam.**
Het label "CO₂ in je bloed: bijna gelijk" komt op "gelijk" (59,4 s), terwijl de take op 60,1 s eindigt. Tot dan zie je twee lijnen en weet je maar van één wat hij is (s15_059).
*Fix (r. 214):* toon `'CO₂ in je bloed'` vanaf `q.on('sporten',1)` en voeg ": bijna gelijk" pas toe op 'gelijk', bijvoorbeeld met een tweede regel eronder.

**9. s07: de long-, hart- en vaatschets suggereert één vat per long.**
De longslagader gaat alleen naar de linkerlong en de longader komt alleen uit de rechterlong. Leerlingen kunnen denken dat de ene long het bloed "heen" krijgt en de andere het "terug" geeft. De pijlpunten zijn nauwelijks zichtbaar (s07_031).
*Fix (r. 135-138):* teken beide vaten naar beide longen (gespiegeld), of één long met beide vaten. Maak de pijlpunten groter (`arrow(...,10)`) en zet ze midden op het vat.

**10. s12: de reactie is moeilijk te lezen.**
Het CO₂-molecuul aan het begin van de vergelijking heeft geen tekstlabel ("● + H₂O → H₂CO₃"). Er staat niet bij dat de reactie in de rode bloedcel plaatsvindt. De H⁺-ionen staan ín de spiercel, terwijl de stem zegt dat koolzuuranhydrase en hemoglobine in de rode bloedcel zitten.
*Fix (r. 176-183):*
- `regel(ctx,'CO₂',260,y0+50,st[0],C.text2,26,'center')`
- `metaText(ctx,'IN DE RODE BLOEDCEL',760,y0-110,C.grain,'center',22)`
- de H⁺ van de spier in een bloedbaan naast de spiercel tekenen, of in de spleet tussen spier en bloed.

**11. s14 en q13 explain: de formulering is grammaticaal fout.**
"Waterstofionen die aan hemoglobine binden, laten de zuurstof makkelijker los" zegt dat de H⁺-ionen de zuurstof loslaten. Bedoeld is: hemoglobine laat de zuurstof makkelijker los.
*Fix:* in film.py (q13 explain) "Als waterstofionen aan hemoglobine binden, laat hemoglobine de zuurstof makkelijker los." In het script alleen aanpassen als s14 toch opnieuw wordt opgenomen. De tag in beeld ("H⁺ op hemoglobine → zuurstof laat makkelijker los") is goed.

## Laag

**12. Titel: de ondertitel loopt in de bloedsomloop.**
"…door je bloed reizen" eindigt op x≈1075 en raakt de ellips (linkerrand 1070) en een rode bloedcel (s03_002.50).
*Fix (r. 74):* `cx = 1480` of `rx = 290`.

**13. s01: de tag staat dwars over de leerling.**
"adem inhouden · stop zodra het niet meer gaat" staat op (760,560), precies over de romp (s01_005.49).
*Fix (r. 85):* zet hem op `960, 150`, boven het bord, of rechts op `1500, 560` onder de klok.

**14. s20 (EPO): de tag overlapt de grafiek en de stijging is overdreven.**
De tag "EPO inspuiten = doping…" (1300,800, ongeveer 950 px breed) loopt over het plotvlak (x 852-1180). De Hb-curve stijgt van 6 naar ongeveer 7,6, dus ongeveer +27 %. Checkvraag 3 rekent met +7,5 % (9,3 → 10,0).
*Fix (r. 280-282):* kort de tekst in (`'EPO-doping: dik bloed, verboden'`) en zet hem op `1500, 800`. Gebruik als curve `f: w => 7 + 0.6*(1-Math.exp(-w*0.8))`.

**15. Kleinigheden.**
(a) Hoofdstukkaart 3: de mini-tekst is gelijk aan de titel ("Wie bepaalt hoe snel je ademt?"). *Fix* in film.py, `minis["Hoofdstuk 3"]`: bijvoorbeeld "Wat meet je lichaam, en wie stuurt je ademspieren aan?"
(b) Checkvraag 3, tabel: op dag 21 is de CO₂-spanning lager (4,4 kPa) dan op dag 2, terwijl de ademfrequentie daalt (15 → 14). De ventilatie neemt bij acclimatisatie juist verder toe. Zet dag 21 op 16 per minuut.
(c) Script s20: "Na een paar dagen maken je nieren meer EPO". EPO stijgt al binnen een tot twee dagen, en de tabel heeft op dag 2 al 25 IE/L. Pas dit alleen aan bij een nieuwe opname: "Binnen een dag of twee…".
(d) s20: de fietser rijdt ongeveer 90 px ín de berg in plaats van op de helling (r. 270). Leg y op de helling: `y = 860 - (x-120)*660/640 - 30` tot de top.
(e) s16 en s17: tags die op dezelfde plek in- en uitfaden geven even dubbele, overlappende tekst ("antwoord b" met "sensoren in halsslagader", s16_030). Fade de oude tag uit vóórdat de nieuwe begint, bijvoorbeeld door de nieuwe 0,6 s later te laten starten met `ramp(t, q.at(w)+0.6, 0.6)`.
