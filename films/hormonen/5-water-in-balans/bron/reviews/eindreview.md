# Eindreview "Water in balans" (Hormonen 5/5)

1. **s05 — lege eerste seconden (middel/hoog).** De glomerulus en het kapsel hangen aan `q.on('glomerulus')` en `q.on('Bowman')`, maar dat zijn de laatste woorden van hun zin. Bij "Het bloed komt in een kluwen haarvaten" is het beeld daardoor helemaal leeg (still 10%). Fix: `glom: q.on('kluwen',1)` (ook bij het glomerulus-label) en `kapsel: q.on('kommetje',1)` (ook bij het label "kapsel van Bowman").

2. **s05 — deeltjes zweven zonder buis (middel).** `filtraat` en de legenda starten op 'perst', maar de buis pas op 'voorurine'/'filtratie'. Bij "Water gaat erdoor, en alles wat klein is" vliegen de deeltjes daardoor los door de ruimte (still 50%). Fix: `buis: q.on('perst',1)`.

3. **s15 — lis van Henle komt onder y=900 en buiten het merg (hoog).** Met L=1,35 komt de onderkant van de boog op 260+500·1,35·0,8+100 = 900, plus de lijndikte: dat is ≈902, tegen de ondertitel aan. Het label-anker ligt ook op y=900, en de lus steekt onder het mergvlak (dat eindigt op 860) uit. Fix: `lineTo(700, 260 + 350*L)` en de boog op `260 + 350*L`. Bij L=1,35 is de onderkant dan ≈832, en het langer worden blijft zichtbaar (+122 px). Zet het label-anker op `260 + 350*L + 100`.

4. **s04 + titel — urineleider komt onder y=900 (middel).** In s04 eindigt de leider op 470+340·1,25 = 895, met een ronde kop van 20 px breed: dat is ≈905. In de titel (`nierDoorsnede(1460,520,1.15)`) is het 520+391 = 911, dus ≈920. Fix in `nierDoorsnede`: zet het eindpunt op `(-120, 280)` en het controlepunt op `(-150, 170)`. De onderkant komt dan op ≈820 (s04) en ≈842 (titel).

5. **s11 — tags botsen met de ring (middel).** Alle vier de tags staan op y=640 (600–656). Daar staan ook het rol-kopje "SIGNAAL" boven het ADH-blok en het onderschrift "NEGATIEVE TERUGKOPPELING", dus "zweten → osmotische waarde omhoog" en "veel plassen ≠ betere nieren" liggen er half overheen (stills 30% en 93%). Daarnaast loopt de pijl van de ring dwars door "SENSOR + REGELCENTRUM" en "EFFECTOR" (ook in s14). Fix: zet de vier tags op y=330 (tussen het bovenste blok en het minteken). Zet de rol-kopjes in `kringSchema` voor de zijknopen 70 px naar buiten (links rechts uitgelijnd, rechts links uitgelijnd), of zet ze binnen in het blok.

6. **s14 — middentag overlapt twee blokken (middel).** "bloed geconcentreerd, maar ADH blijft geremd" is ≈800 px breed en staat op (960,430). Het verzamelbuisblok eindigt op x=655 en het hypothalamusblok begint op x=1265, dus de tag ligt over beide randen (still 70%). "terugkoppeling werkt niet goed → uitdroging" is nog breder. Fix: zet alle drie de tags op y=330, en kort ze in tot "ADH blijft geremd" en "terugkoppeling werkt niet → uitdroging".

7. **s10 — ADH-kader bedekt de verzamelbuis (middel).** `roundRect(300,620,1320,200)` ligt over de verticale verzamelbuis (x 1470–1530, tot y=840). Dat is net het onderdeel waar de zin over gaat (stills 30% en 50%). Fix: gebruik `roundRect(260,620,1140,200)` en zet de teksten op x=830. De hypothalamus-tag kan dan naar (830,560).

8. **s15 — rommelig in het lis-beeld (middel).**
   - De eerste blauwe waterpijl (1300→1200, y=400) loopt door "laat geen water door" (1060,380). Fix: laat de pijlen beginnen bij `y = 480 + i*80`.
   - De rechterpoot (x=900) loopt door de kop "NIERMERG: STEEDS ZOUTER NAAR BENEDEN" (y=240). Fix: laat beide poten op y=260 beginnen.
   - De tag "kangoeroerat: extra lange lis" (1300,840) bedekt de onderkant van de verzamelbuis. Fix: zet hem op (960,120).

9. **s15 — "het opstijgende deel" is niet te herkennen (middel, vak).** De voice-over noemt het opstijgende deel, maar er is geen stroomrichting getekend, dus een leerling ziet niet welke poot dat is. Fix: zet een kleine pijl omlaag in de linkerpoot (x=700, y≈450) en een pijl omhoog in de rechterpoot (x=900), op 'opstijgende'. Zet eventueel ook "dalend" en "opstijgend" in metaText boven de poten (y≈280).

10. **s18 — eerste ≈5 s bijna leeg (middel).** Bij "Hoe weet je lichaam…" en "Je nieren filteren elke dag 180 liter…" staat er alleen een vage tag onderaan (still 10%). Fix: toon tussen 'honderdtachtig' en 'sporten' midden in beeld een kop "180 L voorurine → 1–2 L urine" (`kop(ctx,…,960,450)`), of laat de mini-badkuip uit s06 terugkomen.

11. **s18 — antwoordtag raakt de zon (laag).** De tag (960,140) is ≈1090 px breed (x≈415–1505), en de zonnestralen (420,220; r=50) reiken tot y≈135 en x≈505 (still 70%). Fix: zet de zon op (420,270) en de ADH-schuif op y=360, of zet de tag op x=1060.

12. **s01 — de lichte urinebeker komt te laat (laag/middel).** De beker hangt aan 'kleurloos', het laatste woord van de zin. Bij "Nu plas je veel" staat er nog geen beker (still 70%). Fix: gebruik `q.on('veel',1)`; dat woord komt in s01 maar één keer voor. Daarnaast is de kopregel "HAVO · VWO · HORMONEN 5/5" linksboven op de lichtblauwe lucht vrijwel onleesbaar. Fix: maak de kop in s01 donker, of zet een donkere band van 0–50 px achter de kop.

13. **s04 — lever ontbreekt, blaas nooit te zien, en een lange labellijn (laag).**
   - "Ureum komt uit je lever" wordt alleen met een tag getoond. Fix: teken op 'lever' een leverlap in het lichaam, links van de kijker, ongeveer bij (520,470).
   - De urineleiders en de blaas in het lichaam hangen aan 'urineleider', maar dan is het lichaam al weg (bodyA=0). Ze zijn dus nooit te zien, terwijl de docenttabel ze noemt. Fix: cue ze op 'twee' of 'blaas', of haal ze uit de docenttabel.
   - De labellijn van "nierbekken" loopt van (1140,530) dwars over het hele merg naar rechts. Dat is acceptabel, maar het wordt rustiger met het anker op de rand van het bekken (1200,560).

14. **s09 — label "nierdrempel" ligt op de curve (laag).** De markering staat precies op x=10, waar de lijn begint te stijgen, en botst met de vervagende tag "tot ≈ 10 mmol/L" (still 93%). Fix: zet het mark-label 40 px hoger en 14 px rechts, of laat de groene tag eerder uitfaden (op 'lukt').

15. **Checkvraag 1b — het antwoordmodel gebruikt het gegeven niet (laag).** De stam geeft "geen glucose in de urine", maar het antwoord gebruikt dat niet om terugresorptie uit te sluiten. Fix: vul het tweede scorepunt aan met: "…of: er zit geen glucose in de urine, dus de terugresorptie in het nierbuisje werkt wel (1)."

Nagerekend en in orde: checkvraag 3c (54 g gefiltreerd, 30 g uitgescheiden, 24/54 ≈ 44 %), 3e (576 g en 5,25 g, ≈ 99,1 %), de nierdrempel 1,8 g/L = 10 mmol/L (consistent met s09), en de puntentellingen (3, 5, 7+2 en 6). De vier vragen hebben elk één eenduidig juist antwoord, met afleiders die passen bij echte misconcepties. De verwijzingen naar film 2 (nierdrempel), film 3 (ADH) en film 4 (cortisol) kloppen met de bronmappen.
