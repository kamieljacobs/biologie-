# Eindreview "De eerste verdediging" (fresh eyes, 14 okt 2026)

Basis: script_v2, segments.json, words/, scenes.js, film.py, sections.html, alle qa-stills. Cuecheck: 0 missende cues. Vraag/antwoord-consistentie (q02 a, q06 b, q10 b, q15 b tegenover "aa"/"bee" in de audio) klopt overal.

## Hoog

**1. s16: de grafiek laat de thermostaat ongeveer 11 s te vroeg dalen.**
`u = ramp(t, q.at('thermostaat'), 22)` loopt van 10,9 tot 32,9 s. De instelling daalt bij x = 12/16, dus u = 0,75, en dat valt op ongeveer 27,4 s. "Thermostaat weer omlaag" klinkt pas op 38,8 s. Tijdens "trager… afweer beter… koorts is een deel van de afweer" (still s16_028.66) zie je de koorts dus al zakken en de lichaamstemperatuur dalen.
Fix (scenes.js r.126): `const u = 0.72 * ramp(t, q.at('thermostaat'), 16) + 0.28 * ramp(t, q.at('omlaag'), 6);`. De stijging valt dan op ongeveer 13,7 s (vóór "koud"), het plateau loopt door tot "omlaag" en de daling begint ongeveer 0,6 s daarna.

**2. s13: de tags bovenin vallen over het mestcel-label.**
Alle zes tags staan op y = 130 (kader 90–146). Het label "mestcel" staat op (640, 160), met de tekst rond y 128–160. Daardoor staat "mestcel" half onder elke tag (stills s13_017/029/040/054).
Fix (r.110): zet het label onder de cel, links uitgelijnd: `label(ctx, 'mestcel', 'geeft histamine af', 470, 400, 160, 500, q.on('mestcellen', 1), HIST, 'left');`. Daar staat niets en het vat begint pas bij y ≈ 630.

**3. s12 (vwo): het antigeen-label staat half buiten beeld.**
`label(..., dx - 30, 360, dx - 260, 220, ...)` geeft bij dx = 560 een rechts uitgelijnde tekst die eindigt op x ≈ 292. "STUKJE VAN DE BACTERIE" begint daardoor links buiten het canvas (still s12_017.55: "AN DE BACTERIE"). Dat duurt van 16,1 s tot de cel gaat reizen (21,3 s).
Fix (r.102): `label(ctx, 'antigeen', 'stukje van de bacterie', dx + 10, 355, dx + 90, 210, q.on('antigeen', 1), '#F2C0A8', 'left');`.

## Middel

**4. s13: pus staat maar ongeveer 1,4 s in beeld en ligt over levende cellen.**
Pus verschijnt bij "pus." (40,2 s) en verdwijnt al bij "geen" (41,6 s) door `ps * (1 - q.on('geen', 1))`. Het pus-kader wordt bovendien over nog intacte bacteriën en neutrofielen getekend.
Fix (r.113–114):
- maak de alpha `ps * (1 - 0.5 * q.on('antwoord', 1))`;
- geef de bacteriën `kapot = q.on('pus', 1)` (6e argument van `bacterie`), en geef 2 van de 4 neutrofielen een lagere alpha bij pus (dode witte bloedcellen);
- teken het pus-kader vóór de fagocyt-lus.

**5. s13, tekst: "vooral neutrofielen, ook fagocyten" leest en klinkt als een opsomming.**
Zo lijkt het alsof neutrofielen géén fagocyten zijn. De woordenlijst zegt juist dat een neutrofiel een fagocyt is.
Fix: in script, display en voice "vooral neutrofielen. Ook dat zijn fagocyten." Neem alleen take s13 opnieuw op (woordtijden opnieuw aligneren; de cues 'kruipen', 'pus', 'geen' en 'antwoord' blijven bruikbaar).

**6. s16: de hersenen/hypothalamus komen nergens in beeld.**
Het juiste antwoord van q15 is letterlijk "je hersenen zetten je thermostaat hoger", en de look belooft "hersenen met hypothalamus als thermostaat". Je ziet alleen een grafiek en een tag.
Fix: teken in s16 rechtsonder (bijvoorbeeld rond (1640, 640), r ≈ 110, onder de legenda en boven y 900) een hoofdprofiel met een stip "hypothalamus" en een thermostaatwijzer. Laat die met `setp()` meedraaien en laat hem infaden op `q.on('Witte', 1)`.

**7. H1 (s04/s05/s07): de kleurcodes spreken elkaar tegen.**
De eigen darmflora is getekend in `BACT` (oranje), dezelfde kleur als de ziekteverwekkers in H2–H3, terwijl het label "eigen bacteriën" groen is. In s07 verschijnen bij "schadelijke bacteriën krijgen de ruimte" grijze rondjes (`#9AA3B2`). Dat is dezelfde kleur als de tag "schimmels", dus het lijkt alsof er schimmels groeien voordat schimmels genoemd zijn.
Fix:
- voeg `const FLORA = C.groen` toe en gebruik die in s04 (r.65), s05 (r.69) en s07 (r.73) voor de eigen bacteriën. `bacterie()` krijgt daarvoor een kleurparameter;
- teken in s07 bij `q.on('ruimte')` oranje `bacterie`-staafjes die zich vermeerderen;
- laat grijze ronde gistcellen pas verschijnen op `q.on('schimmels', 1)`.

**8. s04: het label "maagzuur" wijst naar de darm.**
Het ankerpunt (680, 470) ligt op de bovenste darmlus; `lichaam()` tekent geen maag.
Fix (r.63): teken een kleine maag (gebogen ellips rond (690, 395), vóór de labels) en zet het anker van 'maagzuur' daarop.

**9. s08: het blaasje met de bacterie ligt bovenop de kern, en de "macrofaag" heeft een neutrofielenkern.**
Het fagosoom (fx + 20, fy, r 48) overlapt de drie kernlobben (still s08_025.79: bacterie en lysosomen dwars door de kern). Daarnaast tekent `fagocyt()` altijd een drielobbige kern, het kenmerk van een neutrofiel, ook voor de macrofaag (s08/s09/s11) en de dendritische cel (s12).
Fix:
- zet het fagosoom in s08 op (fx + 55, fy + 55): in `bx/by`, de `arc`, het lysosoom-middelpunt en het label-anker;
- geef `fagocyt` een optie `kern: 'rond'` (één ovale kern) en gebruik die voor de macrofaag en de dendritische cel. Houd de lobben voor de neutrofielen in s13.

**10. Checkvraag 4b/4: de conclusie "versnellen" volgt niet uit de proef.**
Er is maar één meetmoment (na 24 uur), dus de data zeggen iets over hoeveel T-helpercellen geactiveerd worden, niet over hoe snel. Ook is onduidelijk of de T-helpercellen in conditie B óók bij 40 °C staan. Dan kan de temperatuur direct op de T-cellen werken, niet via de dendritische cellen.
Fix in sections.html:
- 4b: "…dat koorts de start van de specifieke afweer kan *versterken*";
- in de proefbeschrijving: "De T-helpercellen worden in alle condities bij 37 °C toegevoegd."

## Laag

**11. s13: de schaal klopt niet, en het haarvat zelf wordt wijder.**
Een bacterie (52 px) is groter getekend dan een rode bloedcel (r 15 → 30 px), terwijl een bacterie (ongeveer 2 µm) veel kleiner is dan een rode bloedcel (ongeveer 7,5 µm). Daarnaast verwijdt in beeld het haarvat zelf, terwijl histamine vooral de aanvoerende vaatjes (arteriolen) wijder maakt; haarvaten worden doorlaatbaarder.
Fix:
- `bacterie(..., 0.45, ...)` in s13 (r.113);
- `scaleBar(ctx)` onderaan s08/s11/s13;
- eventueel een tweede, dikker "aanvoervaatje" dat wijder wordt, en het haarvat alleen laten lekken.

**12. Titel (s03): de fagocyt overlapt "verdediging".**
De titeltekst loopt tot x ≈ 1420 en de fagocyt begint bij cx − r = 1320.
Fix (r.39): `cx = 1580` (de bacteriën schuiven automatisch mee).

**13. Docentdeel, pauzemoment na H3: "vijf kenmerken (rood, warm, dik, pijn, pus)".**
Het klassieke vijfde kenmerk is functieverlies (functio laesa), niet pus.
Fix: "de vier kenmerken (rood, warm, dik, pijn) plus pus" of "…en functieverlies".

**14. s17 (recap): "een paar dagen later is alles opgeruimd" krijgt geen beeld.**
Er is geen vinger of inzoom; Noor staat er hetzelfde bij als in de cold open (de look belooft "de vinger is weer normaal").
Fix: hergebruik de `zoomCircle` uit s01 met een normale vinger zonder rode gloed, infadend op `q.on('dagen', 1)` (23,7 s). Laat het donkere tag-paneel daarbij naar 0,3 dimmen.

**15. Kleinigheden in de leesbaarheid:**
- "HOORNLAAG" wordt overlapt door de hoornlijnen (s04/s08), want de lijnen met offset `(i % 2) * 30` steken tot x + w + 22 uit en het label staat op x + w + 16. Fix in `huidDoorsnede`: zet het label op `x + w + 46`.
- De HUD "HAVO · VWO · AFWEER 1/4" is in s01/s17 onleesbaar op de lichtblauwe lucht. Geef die macro-scènes bovenin een donkere strook of een donkere HUD-kleur.
- s12: de dendritische cel komt nooit bij de lymfeknoop aan; hij stopt op x 1120 en de knoop begint bij 1380. Laat hem eindigen op `lerp(560, 1360, …)` en verklein hem tijdens het reizen.
