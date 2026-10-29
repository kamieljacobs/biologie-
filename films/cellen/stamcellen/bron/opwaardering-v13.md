# Stamcellen 2.0 — beeld-remake op prompt v13: lijsten voor Kamiel

29 okt 2026, zelfstandig gebouwd volgens `films/OPWAARDEREN-CELLEN.md`. Niets ingesproken, geen ElevenLabs gebruikt. Stem, script, takes, woordtijden, vragen, begrippen, docentdeel en oefeningen zijn ongewijzigd.

## (a) Twijfelscènes

| Scène | Wat ik koos | Alternatief |
|---|---|---|
| s01 | De 'jij' die van de fiets valt is de leerling uit de familie van Noor (castpersonage, sportoutfit, geen naam). De schaafwond staat in een zoomcirkel náást haar knie. Het infarct is iemand anders: daar staat alleen het hart in doorsnede, zonder persoon. | Een volwassen castpersonage (bv. Opa Henk) met het hart in een zoomcirkel, zodat het hartinfarct een gezicht krijgt. Ik liet dat weg omdat Opa Henk volgens LEVENSLOOP 'niet overlijdt' en een infarct bij een vast familielid zwaar is. |
| s14 | De leukemiepatiënt is figurant Erik (ROLLEN: 'iemand uit een onderzoek', geen naam in beeld), eerst zittend met infuus, later staand met zoomcirkels naar bloed, huid en zaadcel. | Opa Henk als vaste patiënt (ROLLEN: 'patiënt = Opa Henk'). Gekozen voor Erik omdat 'de geslachtscellen van de patiënt' (zaadcel) bij een 71-jarige opa vreemd leest en leukemie een zwaar verhaal aan een familielid hangt. |
| s04–s21 | Het vaste motief is één chromosoom met vijf genen (zenuwgen, spiergen, insuline, huidgen, hemoglobine) dat bij elke cel exact hetzelfde is; alleen het gen dat aan staat is goud. | Het genstrookje van `gedifferentieerdeCellen` uit de beeldbank (vijf vakjes zonder chromosoomvorm). Ik koos een echt chromosoom zodat 'zelfde DNA' en 'zelfde chromosomen' samenvallen; het motief kan naar de bibliotheek als Kamiel het goed vindt. |
| s18 | Het signaal tussen de hartspiercellen is een gouden lijn die over het weefsel loopt, daarna kloppen alle cellen samen. | Gap junctions in een zoom laten oplichten (ionen die doorstromen). Dat is meer vwo-detail dan de tekst vraagt. |

## (b) Herinspreeklijst

Geen. Het script noemt geen castnamen (alleen Yamanaka en Gurdon, historische personen) en er is geen feitelijke fout gevonden die alleen met nieuwe audio te herstellen is. De openingszin 'Voor vwo gaan we hier nog een stap verder.' (s09, s20) knipt de speler al weg. De oude wachtlijst blijft staan (zie `info.md`, 'Wachtlijst opnieuw inspreken': s19 met biologisch versus ethisch argument, ± 15 s, ± 500 TTS-credits; niet opgenomen).

## (c) Vragen over inhoud

1. s11 zegt 'ongeveer één procent per jaar'. Bergmann e.a. (2009, via Karolinska Institutet) geven 1 % bij twintig jaar, dalend tot 0,5 % op 75. Klopt voor een jongere; laten zo, of in een volgende opname 'hooguit één procent'?
2. s19 zegt dat geïnduceerde stamcellen 'niet afgestoten' worden. De eindreview stelde 'in principe niet' voor (afweerreacties tegen iPS-cellen zijn in dieren beschreven). In beeld staat nu 'eigen cellen: geen afstoting'. Bij een volgende opname meenemen?
3. Mag het chromosoom-met-genen (`genChrom`) de bibliotheek in als vast motief voor genexpressie (ook voor de DNA-reeks en Erfelijkheid)?

## (d) Wat er veranderde per scène

Zie `storyboard-remake.md` (één regel per scène: was → wordt, met de beeldbankobjecten). Samengevat: geen grijs poppetje (`person()`) meer maar castpersonages, geen korrel buiten de cellen, geen paarse stamcellen (stamcellen zijn nu de neutrale `_scbCel` uit de beeldbank), DNA in palet B (grijs), eiwitten als kralenketen, mRNA als dunne sliert, cellen rond of veelhoekig in weefsel, hart en huid als anatomische doorsnede.

## Voor de bibliotheek

Nieuwe objecten in `src/obj.js` (recept als commentaar erboven, C9); nog niet in `bibliotheek/`:

- `genChrom` — één chromosoom in rust (palet B grijs) met vijf genen op vaste plekken; gen aan = goud, aanwezig maar uit = gestippelde koraalrand; leeg = gestippelde omtrek (rode bloedcel).
- `betacel` — insulinemakende cel uit een eilandje van Langerhans (veelhoekig, secretiekorrels, ER, kern).
- `hartspiercel`, `hartspierWeefsel` — vertakte, dwarsgestreepte hartspiercel met centrale kern en tussenschijven; weefsel waarin elke cel een eigen klopfase kan hebben.
- `klieving` — bevruchte eicel in de zona die deelt in 2, 4, 8 cellen zonder te groeien (insnoeren als morph).
- `infuus` — infuuszak aan standaard met slangetje en meestromende deeltjes.
- `hlaCel` — ronde cel (celRond) met HLA-herkenningseiwitten loodrecht in het membraan; vorm en kleur per weefseltype.
- In `src/scenes_v2.js`: `infarct` (afgestorven stuk linkerkamerwand dat littekenweefsel wordt, op `hartDoorsnede`), `beenmergVeld` (beenmerg met bloedcellen; leukemie, chemo, donorcellen), `bloedplaatje`.
