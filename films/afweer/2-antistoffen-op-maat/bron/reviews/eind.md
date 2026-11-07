# Eindreview "Antistoffen op maat" (Afweer 2/4)

Op volgorde van ernst. Gecontroleerd met de sheets, de qa-stills en extra renders (s17 bij t=16,5, s09 bij t=23,5, s10 bij t=31, s13 bij t=6,5).

1. **s11 + s13: de antistoffen zitten verkeerd om op de bacterie (inhoudelijke fout).** In beide scènes zit de voet (het constante deel) tegen de bacterie. De armen met de bindplaatsen wijzen naar buiten. Dat is precies wat leerlingen niet moeten onthouden, en het is in tegenspraak met s10 ("aan elke arm een bindplaats"). Ook zitten de onderste vier antistoffen op een kant zonder antigenen: `bacterie()` tekent alleen stekels aan de bovenkant.
   Voorstel:
   - s11: bovenste rij `antistof(ctx, 900-110+i*44, 470-75, 0.45, Math.PI)`, onderste rij `antistof(ctx, 900-70+i*48, 470+75, 0.45, 0)`.
   - s13: bovenste rij `by-62` met hoek `Math.PI`, onderste rij `by+50` met hoek `0`.
   - Geef `bacterie()` ook stekels aan de onderkant (zelfde lus met `-11` vervangen door `+11` en de punt naar `+17`).

2. **s17: twee tags liggen over elkaar (onleesbaar).** Van t≈14,0 tot 19,8 staan 'primaire afweerreactie' (links uitgelijnd op x=516) en 'secundaire afweerreactie: sneller, veel hoger' (gecentreerd op x=970) allebei op y=140. Op de render is dat één onleesbare brij.
   Voorstel: laat de primaire tag uitfaden op 'secundaire': alpha `(1 - q.on('secundaire',1))`. Of zet de secundaire tag links uitgelijnd op `x = GX+0.6*GW, y = 220`.

3. **s10: "losse kopie van de receptor" klopt niet met het beeld.** De receptor wordt overal getekend als een hol ruitje op een steeltje (`sleutel`). Die staat hier "=" een Y met ronde bolletjes. Leerlingen zien twee verschillende vormen en horen dat het een kopie is.
   Voorstel: vervang in s10 `sleutel(ctx,1180,470,3,30,0,1)` door een stukje B-celmembraan (boog of balk bij y≈560) met daarop `antistof(ctx,1180,500,1.2,0, 1, BCOL)`, met de voet in het membraan. Zet als label 'receptor (vast op de B-cel)' en voor de vrije Y 'antistof (losse kopie)'.

4. **s10 (neutraliseren): de antistoffen zijn veel te groot.** Met `ast` op schaal `r*0.014` (=1,54) is elke Y langer dan de diameter van het virus. In werkelijkheid is een antistof (≈10 nm) zo'n 15–20× kleiner dan een waterpokkenvirus. Het beeld suggereert dat een paar antistoffen het virus omklemmen.
   Voorstel: zet in `virus()` de schaal op `r*0.006` en de afstand op `r*1.6` (in plaats van `r*1.95`). Doe hetzelfde voor de titelscène.

5. **s15/s17: de grafiek laat te weinig verschil zien.** De secundaire piek (100) is maar ≈5,5× de primaire (18). Het script noemt 10–100×, en checkvraag 2 rekent met ≈33×.
   Voorstel: zet in `antiCurve` de amplitude van de primaire piek van `18` op `8` (≈12×). Laat na de primaire piek een restniveau staan, bijvoorbeeld `Math.max(p, s>2.1 && s<6 ? 2 : 0, …)`. Dat sluit aan bij checkvraag 2, waar het niveau op dag 35 nog 5 is.

6. **s09: de kloon springt naar een andere plek.** De passende B-cel staat op x≈1350 (index 4), daar komen de T-helpercel en de vonk. Bij 'delen' verschijnt de kloon ineens op x=720–1385, en alle andere B-cellen verdwijnen in één frame. Op t=23,5 staan de T-cel en de vonk nog rechts aan de rand en de kloon links.
   Voorstel:
   - Zet `const match = 0`. Bereken in het T-helperblok `mx = cx - 300 + match*150`, zodat de kloon vanaf de plek van de passende cel groeit.
   - Laat de niet-passende cellen uitfaden met `a: (1-0.5*pas)*(1-ramp(t,q.at('delen'),1.5))` in plaats van ze bij `deel>0.01` weg te laten.

7. **s17 (tabel): de begrippen specifiek en aspecifiek ontbreken.** Leerdoel 4 is "specifieke tegenover aspecifieke afweer", maar de vergelijkingstabel zegt alleen 'fagocyten' en 'B-cellen'.
   Voorstel: verander de kolomkoppen in 'fagocyten (aspecifiek)' en 'B-cellen (specifiek)', op lettergrootte 30.

8. **s15 en s17: de labels in de grafiek staan op onhandige plekken.**
   - De tag 'pas na ± een week antistoffen' staat op x=1500, ver rechts van het primaire bultje waar hij over gaat. Voorstel: `tag(..., GX+0.08*GW, 300, ..., 'left')`.
   - '1e besmetting' en '2e besmetting' staan op y=GY+GH−20, precies waar de curve loopt (de curve schrijft door de tekst heen). Voorstel: zet beide labels op `y = GY+40`, naast een stippellijn. Voor de 1e besmetting is dat een nieuwe stippellijn op `x = GX+0.02*GW`.

9. **sections.html, checkvraag 3: er ontbreekt een controlebuis voor vraag c.** "Antistoffen doden niet zelf" leid je af uit 97 % in buis 4. Maar er is geen buis zonder fagocyten en zonder antistoffen om die 97 % mee te vergelijken.
   Voorstel: voeg buis 5 toe: "bacteriën + serum N (geen fagocyten)", met 98 % en "losse bacteriën". Pas het antwoord van 3c aan: "buis 4 ≈ buis 5: antistoffen doden de bacteriën niet zelf, maar laten ze wel samenklonteren (1)".

10. **sections.html, docentdeel: de zin over gordelroos is onjuist.** Er staat "Het latente varicellavirus zit in zenuwknopen (ganglia); de film zegt 'in zenuwcellen'". Dat suggereert dat "zenuwcellen" een vereenvoudiging is, maar het virus zit juist ín zenuwcellen.
    Voorstel: verander in "Het virus blijft latent in de cellichamen van zenuwcellen in de zenuwknopen (ganglia) bij het ruggenmerg".
    Verander ook de interne vraagcodes in de leerdoelentabel en de hoofdstuktabel (q02, q06, q12, q16, q19) in leesbare verwijzingen, zoals "openingsvraag", "vraag H1", "vraag H2", "vraag H3 (grafiek)" en "vraag H3 (griep)".

11. **s14 (vwo): de stippelellips voor 'constant deel' snijdt de armen halverwege door.** Daardoor lijkt het bovenste deel van de armen niet constant. Dat is in strijd met "bijna de hele antistof … alleen de uiteinden".
    Voorstel: laat de ellips weg. Laat bij 'constante' de hele Y oplichten (H en L met `lighten(…,0.3)`) behalve de bovenste ≈80 px van elke arm. Die worden daarna bij 'variabele' blauw.

12. **Kleine punten in beeld.**
    - s21: door het recap-paneel (alpha 0,55) lopen de raamstijlen dwars door de tags. Voorstel: zet de alpha op 0,85, of teken het raam in `kamer()` niet als `panel>0`.
    - s01/s21: Noor (lengte 560 tegen 360 voor Sam) ziet eruit als een volwassene of als moeder, niet als grote zus. Voorstel: `person(ctx, 420, 900, 470, …)`.
