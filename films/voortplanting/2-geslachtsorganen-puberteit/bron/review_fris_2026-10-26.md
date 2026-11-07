# Frisse beeldreview: Geslachtsorganen en puberteit 2.0 (Voortplanting 2), 26 okt 2026

Reviewer: frisse helper (heeft de film niet gemaakt). Getoetst aan prompt v10 Part C (C1, C5, C8, C9, C10, checklist C10.7), `films/BEELDAFSPRAKEN.md`, `bron/script_v2.md` en de besluiten in `films/verbeterbladen/remake-2026-10/besluiten.md` (vooral t2: gezichten heel, hersenen en bekken in een zoomcirkel náást het lichaam, t6: remlijn).

Werkwijze: alle 93 aangeleverde stills (`/home/claude/werk/geslacht/review_stills/`, 960 px) bekeken naast de zin die op dat moment klinkt (woordtijden in `review_woordtijden/`). Daarnaast 34 extra stills uit de gebouwde film (`window.__still(id, t)`), vooral op t = 0,1 s van elke alinea en op de vakinhoudelijke momenten (s05 'gehemelte', s07 'steeltje', s08 'receptoren', s17 'buikwand' en 'boog', s29 'remt'). Waar nodig de scènecode gelezen (`src/scenes_g2.js`, `src/teken_g2.js`) om een plek of kleur te verklaren. Niet gedaan: Vragen uit afspelen (B9/B11) en bewegingscontrole per 1/30 s.

Tijden: alinea-id + lokale tijd in die alinea (s). Coördinaten zijn op het 1920×1080-podium, tenzij '(960)' erbij staat.

**Totaal: 13 MOET, 26 KAN.**

## Wat goed is

- **t2 is uitgevoerd**: in s05, s08, s23 en s24 blijven de gezichten van Sam en Noor heel; hersenen en bekken staan in een zoomcirkel náást het lichaam; niets over gezicht of kleding. De buitenkant van de vrouw (s25) staat als zakelijk schema in een eigen paneel, zonder zoomlijnen naar Noor: passend voor de klas.
- **Hypofyse met poortaders** (s07): GnRH-axonen eindigen in het vaatnet onderaan de hypothalamus, twee vaatjes lopen door het steeltje naar de voorkwab (de kant van het gezicht, gelijk aan de kijkrichting in s05), uitgaande ader onderaan; achterkwab grijs, Turks zadel eronder. Erwt van 1 cm op dezelfde vergroting (590 px = 10 mm bij 59 px/mm) klopt met de schaalstreep.
- **Route van de zaadleider** (s15–s17): vanaf de staart van de bijbal (achterkant zaadbal) omhoog vóór het schaambeen langs, lieskanaal als gestippelde opening in de buikwand boven het schaambeen, boog over de blaas, langs de achterkant omlaag, ampulla, samen met het zaadblaasje de prostaat in, uit in de urinebuis. Zaadblaasje achter de blaas, prostaat onder de blaas om de urinebuis.
- **Maten man** (5-centimeterstreep = 196 px): zaadbal ±4,4 × 2,6 cm, penis in rust ±9 cm, prostaat ±3,5 cm, blaas ±6 cm. Klopt.
- **Zwellichamen** (s19): twee zwellichamen boven, kleiner zwellichaam met urinebuis onder, slagadertje in het midden; vullen zichtbaar met bloed bij 'vol met bloed'.
- **Maatglas** (s22): zaadblaasjes ±52 %, prostaat ±28 %, zaadcellen een paar procent: past bij 'ruim de helft' en 'kwart tot een derde'.
- **Remlijn** (s29, t6): er is een rem-pijl met dwarsstreep en de zin 'veel oestrogeen remt de hypofyse weer' (zie wel MOET 10).
- Groeigrafiek, puberteitsbalken (meisjes 8–13, jongens 9–14) en de menarchetrend (± 16–17 jaar in 1850, ± 13 jaar in Nederland) kloppen met de tekst.

## MOET

### MOET 1 · s33 (eindkaart) · middelste zin loopt links en rechts van het beeld af
- Zag: '…dcel: zaadbal → bijbal → zaadleider → urinebuis; het meeste vocht uit de zaadblaasjes, ook uit de prost…': begin en eind vallen buiten het podium.
- Moet: zin over twee regels breken of inkorten (bv. 'Zaadcel: zaadbal → bijbal → zaadleider → urinebuis.' en apart 'Vocht: vooral zaadblaasjes, ook prostaat.'), ≥ 60 px van de rand.
- Still: `review_stills/s33_004.50.webp`

### MOET 2 · s15–s20 · doorsnede van de man staat te hoog: zaadleider, lieskanaal en zaadcel lopen door de kopregel en tegen de bovenrand
- Zag: de boog van de zaadleider en de lichaamsomtrek reiken tot y ≈ 20–40 (960) en de kopregel 'HAVO · VWO · VOORTPLANTING · PUBERTEIT' loopt dwars door de gouden lijn (alle stills s15–s20). Het lieskanaal (s17, 'buikwand', 5,7–7,8 s) staat als gestippelde ellips tegen de bovenrand, deels achter de kopregel. In s17 rond 9–13 s ('naar de achterkant van de blaas', 'De wand … knijpt') zit de gevolgde zaadcel met zijn gouden ring bovenaan in de boog: de ring wordt door de rand afgesneden en valt over de kopregel.
- Moet: `manDoorsnede` lager en iets kleiner zetten (bv. y 170 → 260, schaal 2,8 → 2,5; de schaalstreep meeschalen), zodat de bovenkant van de boog en het lieskanaal ≥ 60 px onder de kopregel blijven.
- Stills: `review_stills/s17_012.79.webp`, extra still s17 t = 9,6

### MOET 3 · s15–s18, s20 · urineleider leest als een zijtak van de zaadleider; de kruising is niet te zien
- Zag: de urineleider is een dunne lijn in #D9C27A op 60 %, bijna dezelfde tint als de gouden zaadleider, zonder label. Hij komt linksboven uit de rand (x ≈ 180–230, y 0–100 (960)) en raakt de zaadleider bij het zaadblaasje. De kijker ziet een gouden lijn die 'het beeld uit loopt'. Dat de zaadleider in een boog óver de urineleider gaat, is niet te zien.
- Moet: urineleider in een eigen, neutrale of teal tint (urine = water; bv. de kleur van de urinebuis #C9CED6), duidelijk dunner. De zaadleider zichtbaar óver hem heen laten kruisen (met een donkere uitsparing of onderbreking in de urineleider). Bij 'in een boog naar de achterkant van de blaas' kort 'urineleider' met naamBij erbij, gedimd. Ook de bron (bronnen.md) voor de kruising noemen.
- Still: `review_stills/s15_006.77.webp`

### MOET 4 · s16 (2–10 s), s17 (0–7 s) · gevolgde zaadcel is ±4–5 cm lang en zijn staart steekt buiten de balzak
- Zag: de zaadcel (`zaadcelEcht`, schaal 1,6) heeft een staart van ±90 px (960). Op deze tekening (39 px per cm) is dat ±4,5 cm, bijna even lang als de zaadbal. In s16 t = 2,7 en s17 t = 6,2 hangt de staart onder de balzak uit, buiten het lichaam: het lijkt alsof de zaadcel er onderaan uit gaat.
- Moet: op orgaanschaal alleen de gouden ring met een kleine kop laten zien (geen staart), of de staart clippen binnen de buis waar de cel in zit. Bij het eerste beeld 'zaadcel · sterk vergroot' als meta, of de echte zaadcel in de zoomcirkel van s15 tonen.
- Stills: `review_stills/s16_002.67.webp`, extra still s17 t = 6,2

### MOET 5 · s22 (21,7–23,0 s) · label 'zaadbal' staat op de penis
- Zag: bij 'ze worden alleen in de zaadballen gemaakt' komt 'zaadbal' op x ≈ 260–320 (960). Dat is op het rode zwellichaam, rechts van de zaadbal (die ligt op x ≈ 205–245).
- Moet: label links of onder de zaadbal (bv. `M.naam.zaadbal[0] - 60`, align right, of onder de balzak).
- Still: `review_stills/s22_021.79.webp`

### MOET 6 · s08 (8,7–10 s) · label 'receptoren' staat boven de spiercel, die juist géén receptoren heeft
- Zag: bij 'alleen de zaadballen en de eierstokken hebben er receptoren voor' staat het groene woord 'receptoren' midden in beeld, recht boven de spiercel met 'geen receptoren: er gebeurt niets'. De groene ringen bij de zoomcirkels van zaadbal en eierstok hebben zelf geen label.
- Moet: 'receptoren' bij de groene ringen zetten (twee keer klein, of één keer bij de zaadbalcirkel met een tweede ring rechts). Liever nog de receptoren op de cellen in de zoomcirkels laten oplichten.
- Still: extra still s08 t = 9,6 (verwerkt in `sheet_0`; zelfde beeld als `review_stills/s08_005.53.webp` plus zoomcirkels)

### MOET 7 · s12 (8,6–14 s) · zwarte vlek op het axon van de kisspeptinecel
- Zag: bij 'Die stof zet de cellen aan die GnRH maken' en 'Werkt de receptor … niet' zweeft een zwarte, wazige vlek over het axon (x ≈ 315–335, y 203 (960)).
- Oorzaak (code): `zenuwcel(... pulsCol: lighten(C.paars, 0.4))`; `lighten` geeft geen hex terug, dus `rgba(pulsCol, 0.9)` in de radiale gradiënt wordt zwart. Dit is precies de valkuil uit C10.4 (`_mix` → gebruik `_mixHex`).
- Moet: `pulsCol` als hex doorgeven (bv. `_mixHex(C.paars, '#FFFFFF', 0.4)`). Teken de puls ook als een vaste stip in plaats van een gloed (Part C: geen gloed). Hetzelfde nalopen in `scenes.js` r. 3086.
- Stills: `review_stills/s12_008.92.webp`, `review_stills/s12_013.67.webp`

### MOET 8 · s13 (15–24 s, vwo) · 'bij heel weinig lichaamsvet' is niet te zien: vet en leptine blijven gelijk, maar de slagboom gaat dicht
- Zag: het vetweefsel en de stroom leptinebolletjes zien er hetzelfde uit als bij 'veel leptine'. Alleen de slagboom gaat dicht en er komt een koraal kader. Het beeld zegt dus: veel leptine en toch geen toestemming. Dat is precies het omgekeerde van de boodschap.
- Moet: bij 'weinig' de vetcellen zichtbaar kleiner/leger maken en de leptinestroom uitdunnen tot een paar bolletjes, dán gaat de slagboom dicht.
- Still: `review_stills/s13_022.49.webp`

### MOET 9 · s23 (10,7–19,6 s) · trechter met franjes niet in beeld, eierstokken half buiten de zoomcirkel, eicel buiten de cirkel
- Zag: op schaal 2,6 vallen beide eierstokken half buiten de zoomcirkel. Het uiteinde van de eileiders met de trechter en de franjes ligt helemaal buiten de cirkel, terwijl de stem zegt 'begint een eileider, met een trechter met franjes. Die vangt de eicel op'. Het label 'eileider · met trechter en franjes' staat buiten de cirkel op de rand. Bij 'eisprong' vliegt de eicel buiten de cirkel en landt op de labeltekst.
- Moet: `vrouwOrganenVoor` kleiner (bv. 2,6 → 1,9) zodat eierstokken, eileiders met trechter en franjes binnen de cirkel passen. Label binnen de cirkel bij de trechter. De eicel van de eierstok in de trechter laten gaan, binnen de cirkel.
- Stills: `review_stills/s23_012.22.webp`, `review_stills/s23_018.73.webp`

### MOET 10 · s29 (17,2–25 s) · remlijn eindigt bij de hypothalamus, niet bij de hypofyse
- Zag: de paarse rem-pijl gaat van de eierstok naar (316–346, 150): boven het blok van de hypothalamus. De hypofyse ligt eronder (y ≈ 420–500). Het label 'hypofyse' staat linksonder onder het Turkse zadel, ver van de klier. De hypothalamus heeft in deze scène geen label. Een leerling leest: 'oestrogeen remt de hypothalamus'.
- Moet: de dwarsstreep van de remlijn op de voorkwab van de hypofyse laten eindigen, zoals de stem en de zin zeggen. 'hypofyse' met naamBij direct naast de voorkwab zetten.
- Stills: `review_stills/s29_023.38.webp`, extra still s29 t = 18,6

### MOET 11 · s29 (21,7–25 s) · eicel landt op de baarmoederwand in plaats van in de eileider
- Zag: bij 'de eicel komt vrij en gaat de eileider in' schiet de eicel met de vochtstralen 110 px rechts de eierstok uit en komt over de spierlaag van de baarmoederwand te liggen (x ≈ 630, y 205 (960)). Er is geen eileider getekend.
- Moet: tussen eierstok en wand een kort stuk eileider met trechter (of het eileider-recept uit `lib_bio.js`) en de eicel daarin laten verdwijnen; anders lijkt het alsof de eicel de baarmoederwand in gaat.
- Still: `review_stills/s29_023.38.webp`

### MOET 12 · s29 (hele alinea) · cyclusklok staat in de ondertitelzone
- Zag: de klok (middelpunt 960, 800, straal 110) en het onderste merkteken 'dag 14' (y ≈ 946) lopen tot in de ondertitelkast. Bij een ondertitel van twee regels (0–7 s) valt de onderkant van de klok en 'dag 14' achter de kast (s29 t = 6,35).
- Moet: klok kleiner en hoger (bv. middelpunt y 720, straal 90), of rechts naast de eierstok; niets onder y ≈ 880.
- Still: `review_stills/s29_006.35.webp`

### MOET 13 · s31 en s32 (t = 0) · leeg beeld na de recapkaart
- Zag: s31 t = 0,1 is helemaal leeg (alleen kopregel en ondertitel 'Het startsein voor de puberteit komt uit je hersenen.'). s32 t = 0,1 toont alleen een vage, bijna doorzichtige doorsnede. Beide panelen faden pas in bij het eerste woord.
- Moet: op t = 0 al gevuld (C10.7): het paneel 'startsein' bij s31 meteen op volle sterkte (eventueel met de hersenen uit s05), het paneel 'zaadcel' bij s32 ook.
- Stills: extra stills s31 t = 0,1 en s32 t = 0,1

## KAN

1. **s01, s04, s32 · 'een kop groter'**: Sam is ±1,31× zo lang als Daan (s01: 246 tegen 188 px (960)), op de titelkaart zelfs ±1,4×. Een kop is ±13 % van de lengte; bij Daan op 1,55 m wordt Sam zo 2,0 m. Verhouding rond 1,12–1,15.
2. **s05 (0–1,4 s), s19 (0–0,9 s), s23 (0–5,4 s) · beeld deels leeg op t = 0**: s05 alleen Sam; s23 twee zinnen lang alleen Noor met twee derde lege navy. Zoomcirkel al op t = 0 tonen (op 35 %) en bij 'hypothalamus' en 'bekken' oplichten.
3. **Gloed en verloop (Part C)**: gele halo rond de hypothalamus (s05), rond eierstokken en baarmoeder (s23, s24), halo's achter de antwoordrondjes a/b/c (s20) en de `gl()`-cirkels in `manDoorsnede`. Focus met een gouden rand of volle kleur in plaats van een gloed.
4. **s15–s22, s29 · te veel betekeniskleuren tegelijk**: blaas teal, zaadblaasje groen, prostaat paars, bijbal oker, zwellichaam rood, zaadbal koraalroze, plus goud. Part C: hooguit drie plus goud. Voorstel: organen in gedempte neutrale tinten en alleen het genoemde orgaan in kleur (C5: wat niet genoemd wordt naar 35 %).
5. **s10, s11 · teal = jongens, koraal = meisjes**: betekeniskleuren als geslachtscode, terwijl teal 'water/informatie' en koraal 'bloed/energie' betekent. Twee neutrale tinten of één kleur met stippellijn.
6. **s10 · secundaire kenmerken alleen als tekst**: behalve 4 % groei verandert er niets aan Sam en Noor. Kort en zakelijk laten zien kan de lijst dragen: stoppels op de kin, bredere schouders, iets breder bekken, adamsappel (castboekvarianten, eerst laten keuren).
7. **s11 · groeisnelheid tegen 'meisjes even langer'**: op de stippellijn bij 12 jaar groeien de jongens juist sneller. Een leerling kan de snelheid voor de lengte aanzien. Een klein inzetje met lengtecurves erbij, of de lijn bij ±11 jaar met 'meisjes zijn al begonnen'. De piek van de jongens moet hoger zijn dan die van de meisjes (±9,5 tegen ±8,3 cm per jaar); nu is hij net lager.
8. **s07 · schaalstreep 1 millimeter met zenuwcellen van ±0,7 mm**: cellen zijn 10–30 micrometer. Meta 'cellen sterk vergroot' bij de neuronen en de cellen van de voorkwab.
9. **s08 · 'spiercel' is een rond bolletje**: een spiercel is een lange, dwarsgestreepte vezel (C9). Gebruik `spiervezel` uit `lib_bio.js` of kies een cel die rond mag zijn (bv. levercel).
10. **s08 (11–21 s) · schaalstreep eierstok**: 76 px = '1 millimeter' maakt de eierstok ±10 × 6,6 mm. Hij is ±3 cm lang (bij een puber ±2 cm). Streep '1 centimeter' van ±250 px, of de streep weglaten.
11. **s12, s13 · kleur van de GnRH-cel**: in s06, s07, s29 en s31 zijn de GnRH-neuronen lila met gouden stoten. In het vwo-blok is de GnRH-cel goud en de kisspeptinecel paars. Eén kleur aanhouden.
12. **s15 (23,5–25,1 s) · teller**: de teller loopt van '± 0 000 000' op, en midden in de zin staat '± 85 000 000 per dag' terwijl de stem 'honderd miljoen' zegt. Meteen '± 100 000 000 per dag' tonen.
13. **s16 · bijbal valt weg onder de zaadleider**: de dikke gouden zaadleider ligt over de okerkleurige bijbal; alleen de halo laat zien waar hij zit. Bijbal bovenop tekenen of de zaadleider daar dunner.
14. **s19 · labels ver van hun deel**: 'urinebuis' staat ±220 px onder de doorsnede, niet naast de urinebuis; 'zwellichamen' ±120 px erboven. Beide direct naast het onderdeel. De gestippelde lijn 'doorsnede hier' loopt ook over de balzak.
15. **s22 · 'zaadblaasje' tegen de linkerrand**: het label staat ±24 px van de rand en de lichaamsomtrek wordt door de rand afgesneden. Tekening ±80 px naar rechts.
16. **s23, s24 · kaders op de rand van de zoomcirkel**: '± zo groot als een amandel' en 'hier kan een embryo zich nestelen' staan op de gouden cirkellijn. Erboven of erbuiten zetten.
17. **s25 · labels op het schaamlipje**: 'clitoris', 'opening urinebuis' en 'vagina' beginnen op de rechter grote schaamlip. Een paar tientallen px naar rechts. De grijze ellips bovenaan (venusheuvel?) leest als een schaduw: weglaten of benoemen.
18. **s28 (5,7–22 s) · 300 000 stipjes lezen als korrel/ruis**: op het scherm ziet het vlak eruit als tv-ruis (BEELDAFSPRAKEN: geen korrel). Grotere stipjes in een groter vlak, of eerst inzoomen op een hoekje met echte eicellen. 'Elke maand begint een groepje te rijpen' is niet te zien: een groepje kort laten oplichten, één groeit door.
19. **s30, s22 · kruis over de tekst**: het koraal kruis valt over 'de eicel' ('de ✗cel') en over 'zaadcellen kom✗n uit de prostaat'; de tekst wordt onleesbaar. Kruis vóór de tekst of een doorhaallijn. In s30 wordt het losgelaten slijmvlies grijs; roze-rood houden (slijmvlies met wat bloed).
20. **s31 (10,4–13 s) · 'die zetten de zaadballen of eierstokken aan'**: de bloedbaan eindigt in het niets. Een kleine zaadbal en eierstok (zoals in het kader van s05) aan het eind.
21. **s32 · linkerpaneel**: de doorsnede wordt bovenaan hard afgesneden door de clip (rechte lijn door de zaadleider); kleiner zetten zodat alles past. Titel 'zaadcel' dekt de inhoud niet ('zaadcellen en sperma'). Het kader 'Daan: startsein komt gewoon wat later' valt over het woord 'Biologie' op het bord.
22. **Hele film · tekstgrootte**: veel kaders en regels zijn 22–26 px ('erwt van 1 centimeter · zelfde vergroting', 'doorsnede hier', 'per cyclus rijpt een groepje…', schaalstrepen in meta 22 px). Part C: labels ≥ 36 px, meta ≥ 28 px.
23. **s29 · hormoonkleuren**: hier FSH teal en LH groen; Les 2 Voortplanting (`HK()`) gebruikt FSH groen en LH goud. Eén vaste kleur per hormoon in de hele reeks (C1: vaste moleculekleuren in de bibliotheek vastleggen).
24. **s33 · 'per cyclus rijpt er meestal één'**: de stem zegt 'een groepje begint te rijpen, meestal haalt er maar één de eisprong'. Eindkaart: 'per cyclus haalt er meestal één de eisprong'.
25. **s06 (12 s) · 'GnRH · steeds vaker een stoot'**: de metaregel loopt over de y-as van de grafiek. Iets naar links of boven de grafiek.
26. **s05, s08 · zoomlijnen over het gezicht**: in s05 vertrekken de twee gouden lijnen bij het oog van Sam en lopen over zijn gezicht. In de geest van t2 vanaf de slaap/achterkant van het hoofd laten vertrekken, zodat het gezicht vrij blijft.

## Nog doen (voor de maker)

- MOET-punten (en de KAN-punten die worden overgenomen) in `films/logboek/fouten.jsonl` zetten en daarna `python3 scripts/foutenpatronen.py` draaien. De reviewer heeft niets aan de film, het logboek of git veranderd.
- MOET 3 (kruising zaadleider over urineleider) en KAN 10 (maat eierstok) in `bron/bronnen.md` met een niveau-A-bron onderbouwen.
- Vragen uit (q03, q21, q27) nog afspelen met `?vragen=uit` volgens B9/B11; dat zat niet in deze review.
- Kandidaat voor `films/WERKWIJZE-LESSEN.md`: 'organen op cm-schaal: de gevolgde cel als ring zonder staart' (MOET 4) en 'zoomcirkel: alles wat de stem noemt binnen de cirkel' (MOET 9).
