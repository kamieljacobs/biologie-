# Frisse beeldreview film 1 — Zoeken in DNA: databanken, BLAST en een beetje Python (prompt v10, C10.7)

Reviewer: Claude (niet de maker), 25 okt 2026, op de bouw van 18:38 (`film/standalone.html`, 27 alinea's, eleven_v4-takes).
Gedaan: contactsheet per alinea op 25/60/92 % (93 stills), een still op t = 0,05 s van elke alinea, losse stills op elke term, vraag, antwoord en twijfelplek (± 45 extra); Vragen uit afgespeeld rond alle vijf vragen (Playwright, `?vragen=uit`, 7 beelden van −4 s tot +4,5 s, plus de knippunten naast de stiltes in de takes gelegd); bronnen van de aangepaste beweringen zelf geopend.

## MOET

1. **s01 · 6–11,9 s** — het paneel 'gisteren · lunch' valt over de naamlabels: van Kim staat er 'NDERZOEKER BIO-INFORMATICA' (de O zit onder het paneel), Sams 'MEELOOPWEEK BIO-INFORMATICA' loopt tegen de paneelrand. Fix: paneel kleiner/hoger (y ± 60–200) of de meta-regels weg zodra het paneel komt (alleen 'Sam' / 'Dr. Kim' laten staan), of de figuren naar x 360 en 1560.
2. **s10 · 5,2–12,6 s** (en s11 bij Vragen aan) — Sam staat rechts van Kim en wijst naar het scherm; zijn arm loopt dwars over Kims bovenlijf, alsof hij haar port. Fix (scenes_bi1.js r. 122–123): Sam links van Kim zetten (Sam 1580, Kim 1790) of Sam laten kijken zonder `wijs`; Kim wijst tot 'Sam', daarna `staan`.
3. **s14 · 19,4–21,1 s** — 'Zonder gat was het min vier' klopt alleen als je de 17e letter van stukje 2 (die zonder partner uitsteekt; zichtbaar in het kleine plaatje) niet meetelt. Met de regel die de film net gaf (gat = −1) is het 6 − 10 − 1 = −5 (zelf nagerekend). Een leerling die meetelt, vindt dus een fout. Fix, goedkoopst: in beeld de uitstekende letter gestippeld met Meta 'LAATSTE LETTER NIET MEEGETELD'; netter: de laatste zin opnieuw inspreken als 'min vijf' en het label '= −5' (één zin, s14). Zet bewering 10/13 in `bronnen.md` op ≈ tot dit opgelost is.
4. **s21 · 0–2,6 s** (alleen bij Vragen aan) — Sam en Kim staan met de hand omhoog naar elkaar toe; dat leest als een high five, terwijl de vraag 'Is Sam nu klaar?' is en het script 'Kim met een vinger op' (= wacht even) vraagt. Het beeld stuurt zo naar het foute antwoord a. Fix (r. 243–244): Kim `staan` met `uit: 'denk'` en een opgestoken wijsvinger bij haar eigen schouder (of `wijs` naar de lijst), figuren verder uit elkaar.
5. **s25 · 6,1–8,9 s** — tijdens 'Dan loopt hij in stappen van drie door het mRNA' licht regel 6 (`eiwit = eiwit + code[…]`) goud op; de stap van drie staat in regel 5 (`for i in range(0, len(mrna), 3)`), die op 35 % blijft. Fix: op 'stappen' regel 5 oplichten, op 'Elk codon' (8,9 s) door naar regel 6.
6. **s23 · 13,5–16,9 s** — 'tweede stukje DNA · SOMS, BIJ TONIJN' en de tegels ervan staan gedimd (± 35–50 %) terwijl de stem er juist over gaat (C5: wat de stem noemt wordt nooit gedimd). Fix: op 'tweede stukje' naar volle sterkte, desnoods de drie treffers dimmen.
7. **s33 · 8,4–21,9 s** — het label 'bachelor Biology of Molecular Life Sciences' leest als één (Engelse) opleidingsnaam die niet bestaat; 'of' is hier Nederlands 'of'. Fix: twee pillen ('bachelor Biology' · 'bachelor Molecular Life Sciences') met daartussen in Meta 'OF', of Nederlands 'Biologie of Moleculaire levenswetenschappen' zoals de stem zegt.
8. **Vragen uit · s08, s13, s19, s23, s30 (0–± 20 s)** — de groene kop 'antwoord a: in openbare databanken' enz. blijft in beeld. Fix: `scripts/antwoordtekst.py` draaien bij het inbouwen in de repo. Getest op een kopie: de koppen worden 'In openbare databanken', 'Er mist één letter', 'Eerst korte stukjes', 'De databank kan een fout bevatten', 'Niets, dezelfde regels' (goed). Niet in bi1-code; zie Open.

## KAN

9. **s01 · 10,0–11,9 s** — tag 'stukje naar het lab' is pas aan het eind van de zin vol zichtbaar (op 10,98 s nog vaag). Op 'Kim liet' laten starten.
10. **s13 · 5,9–10 s** — de zoomcirkel valt over de laatste drie tegels van stukje 2; cirkel iets lager/rechts (onder het venster) of het venster iets naar links. In de cirkel is het ontbrekende basenpaar een koraal kader met een klein stompje in het midden: lijkt nog op één losse base. Het kader helemaal leeg maken en de rest zichtbaar één plek laten schuiven (nu nauwelijks te zien). De strengen zijn rechte ladders (C9 noemt de platte ladder een bekende fout; hier wel de basisvorm van de DNA-reeks, dus alleen melden).
11. **s19 · 5–14 s** — onder de vijf woordjes in het barcodescherm staat een los '_'-tekentje linksonder (restje cursor?); weghalen.
12. **s19 · 16,8–21,4 s** — label 'DATABANK' staat ± 20 px onder de tweede rij, 'SUSHI' wel op de eerste; uitlijnen op het midden van de rij.
13. **s20** — blauwvintonijn 98 % betekent ± 13 verschillen op 650; B11 geeft tussen geelvin en blauwvin K2P 0,0077 (± 99 %). Met label 'voorbeeld' mag het, maar 99 % en grootoog 99 % (of 99,5 / 99,2 %) sluit beter aan bij 'maar weinig letters verschil'.
14. **s24 · 8–15,8 s** — 'met de hand: De genetische code lezen' toont een 4×4-rooster tealvlakjes zonder letters; niet herkenbaar als codontabel en de hand uit het script ontbreekt. Kleine codontabel met U C A G langs de randen, of het rooster weglaten (het gouden kader per drie op de tegels doet het al).
15. **s24 · 0–3 s** — op t = 0 alleen een leeg editorvenster met cursor; het mRNA-label komt pas op 'mRNA' (± 3 s). Label + tegels mogen er vanaf t = 0 staan.
16. **s26 · 11,9–21 s** — in één beeld: paars (strings in de code), teal (RNA-tegels), oker (kralen), groen ('BEGINT BIJ AUG') en goud = vier betekeniskleuren plus goud (max. drie). 'BEGINT BIJ AUG' in tekstwit of goud zetten.
17. **s20 · 21–23,6 s** — Sams naam dimt weg terwijl hij 'Geelvin!' roept; naam laten staan of samen met de ballon weg.
18. **s30 · 3–6 s** — de kralenketen loopt links half uit beeld (eerste kraal afgesneden) terwijl de teller '33 AMINOZUREN' erboven staat; bewust 'uit beeld', maar een zachte vervaging links leest rustiger dan een halve kraal.

Gecontroleerd en in orde: titel- en hoofdstukkaarten, vijf vraagkaarten (opties, ondertitelkast weg); s02/s03 teller en tegels; s05 barcodes; s08 drie databanken met namen op hun woord; s09 databankregel; s13 gat en definitie op hun woord; s14 scoreregel (15 gelijk, 1 anders op plek 13, 1 gat = 13, zelf nagerekend); s15; s16; s19 woordjes en uitbreiding; s26 code in beeld = de geteste Python (WPCGCA, MALWMR); s27 teller 18 → 333; s30 keten = echte preproinsuline-volgorde (…PLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTP…, vergeleken); s31 recap op de woorden; s32 21 kommen, 20 goud; s33 werkplekken; eindkaart bouwt op. Geen grijze poppetjes, geen gezichten met oogwit, geen gloed of verloop, geen tekst over de ondertitel. Elke alinea is op t = 0 gevuld (s24 zie KAN 15).

## Vragen uit (alle vijf vragen, 5 s ervoor tot 5 s erna)

- Geluid: s06, s11, s17, s21, s28 (de vraagzinnen) vallen helemaal weg. 'Antwoord a/b/c.' wordt geknipt op 0,89 / 1,57 / 1,48 / 1,57 / 1,02 s; dat valt telkens in een echte stilte in de take (0,46–0,96, 1,09–1,64, 0,98–1,54, 1,07–1,63, 0,56–1,09 s). Er blijft niets over van vraag of antwoord.
- Ondertitels: beginnen meteen met de inhoud ('Onderzoekers…', 'In het bovenste stukje…', 'BLAST knipt…', 'Een databank is…', 'De stap van drie…'). `kortantwoord.py` vindt niets om te knippen (goed: geen kort antwoordwoord).
- Beeld: alleen de antwoordkoppen (MOET 8). Die verdwijnen met `antwoordtekst.py` (getest op een kopie). `spelerfix.py --check` op de kopie: OK.
- Vertelling na de vraag leunt nergens op de vraag (geen 'inderdaad', 'zoals je', 'klopt'). De overgangen s10 → s13, s16 → s19, s20 → s23 en s27 → s30 lopen logisch door. 'Welke vis is het?' (s03, cold open) blijft staan: dat is de puzzel, geen vraagkaart.

## Bronnen (aangepaste beweringen, zelf geopend 25 okt 2026)

De tabel in `bronnen.md` staat nog op de stand van script_v1; geen bewering kreeg daar na een aanpassing ✓, dus er hoefde niets terug. Mijn voorstel voor de nieuwe statussen (bij het omzetten naar `bron/bronnen.md`):

| Nr | Nu in film | Gecontroleerd | Voorstel |
|---|---|---|---|
| 6 | 'Ze delen elke dag wat er nieuw is' | B1: "Daily data exchange with the European Nucleotide Archive and the DNA Data Bank of Japan"; B3 | ✓ |
| 7 | miljarden sequenties, > half miljoen soorten | B1: "over 4.7 billion nucleotide sequences for 581 000 formally described species" | ≈ (blijft: één oorsprong, groeit) |
| 9 | uitlijnen 'twee of meer' | reeksdefinitie, B15 | ✓ |
| 10/13 | zonder gat −4 | eigen som: met de eigen gatregel −5 (uitstekende 17e letter) | ≈ tot MOET 3 is opgelost |
| 15/16 | woordjes van 28, 'bijna nooit toevallig', 'begint BLAST niet eens' | B6: "megablast 28", "blastn 11"; B4: BLAST scant de databank op woordtreffers, w = 12 voor DNA (1990); B5: "scans the database for word matches" | 15 ✓; 16 ≈: BLAST leest wel alle sequenties door op woordjes, het slaat alleen het uitlijnen over. 'begint niet eens' = niet eens aan uitlijnen; in de vertelling kan het als 'niet eens lezen' klinken. Kan zo blijven. |
| 17 | uitbreiden zolang de score goed blijft | B4: stopt "when we reach a word pair whose score falls a certain distance below" het beste; B6 X-dropoff | ✓ |
| 18 | 'vaak al na korte tijd' | geen A-bron voor de snelheid | ? → mag ≈ (geen getal meer genoemd) |
| 20/21 | toevalsgetal bij alle drie bijna nul → zeker tonijn; welke tonijn via procent gelijk | B5: "E = number of database hits you expect to find by chance"; B7 | ✓ |
| 22 + nieuw | databank kan fouten bevatten; 'soms een tweede stukje DNA bij tonijn' | B11: GenBank-referentie "either mislabeled, misidentified or" introgressie; BOLD "100% match for four species"; Paine e.a. combineerden cox1 met ITS (in B11); B12: twee markers (mitochondriaal + kern) "enables full discrimination between all eight tuna species" | ✓ (twee A-bronnen) |
| 24 | T → U-zin | weggelaten | n.v.t. |
| 26 | 'recept zonder introns', coderend deel ruim 300 (333) | B16: c.1–c.333, stop TAG c.331–333, intron tussen c.187 en c.188, eiwit 110 aminozuren; eerste 18 = ATGGCCCTGTGGATGCGC | ✓ |
| 27 | Radar 2017, 21 restaurants, 20× geelvin, ook als het restaurant blauwvin zei | B13: "in 20 gevallen … geelvintonijn"; restaurants zeiden o.a. blauwvin; "In al deze gevallen bleek het dus geelvintonijn" | ≈ (toegeschreven aan Radar, mag op die ene bron rusten) |

## Open (voor de hoofdsessie)
- Fixen: MOET 1–7 in `scenes_bi1.js` / `teken_bi1.js` (MOET 3 eventueel met één nieuwe take voor de slotzin van s14).
- MOET 8: `scripts/antwoordtekst.py`, `kortantwoord.py`, `spelerfix.py` bij inbouw in de repo.
- Alle MOET- en KAN-punten in `films/logboek/fouten.jsonl` zetten (de reviewer schreef niet in de repo).

## Verwerkt door de maker (25 okt 2026, bouw met echte woordtijden)

1. **s01** — paneel 'gisteren · lunch' kleiner en hoger (y 64–300, bakje 0,8): valt niet meer over de naamlabels van Sam en Kim. Gedaan.
2. **s10** — Sam wijst niet meer (houding `staan`); Kim wijst tot 'Sam'. Geen arm meer over Kims bovenlijf. Gedaan.
3. **s14** — opgelost in beeld, niet opnieuw ingesproken: in het kleine plaatje zonder gat staat de 17e letter van stukje 2 (zonder partner) op 30 % met een gestippeld kader en eronder Meta 'LAATSTE LETTER TELT NIET MEE'; dan klopt 6 − 10 = −4 met wat de stem zegt. Bewering 10 in `bronnen.md` met die toelichting op ✓.
4. **s21** — geen high five meer: Kim wijst naar de resultatenlijst met Meta 'WACHT EVEN' boven haar, Sam staat ernaast (`staan`, blij), figuren uit elkaar (x 1340 en 1720).
5. **s25** — de cue 'Elk' viel al op 'bij elk codon' (8,9 s eerder); nu `q.at('Elk', 2)`: op 'stappen' licht regel 5 (`for i in range(0, len(mrna), 3)`) op, op 'Elk codon' regel 6. Gecontroleerd op 8,5 s en 10,7 s.
6. **s23** — 'tweede stukje DNA' en de tegels staan op volle sterkte; de drie treffers dimmen tot 40 % op 'tweede'.
7. **s33** — twee aparte pillen 'bachelor Biology' · Meta 'OF' · 'bachelor Molecular Life Sciences' (de tweede verschijnt op 'moleculaire').
8. **Vragen uit (antwoordkoppen)** — niet in bi1-code: blijft voor de inbouw in de repo (`scripts/antwoordtekst.py`, `kortantwoord.py`, `spelerfix.py`).

KAN:
9. **s01** — tag 'stukje naar het lab' start op 'liet'. Gedaan.
10. **s13** — zoomcirkel naar x 1560, y 625 (r 225): valt niet meer over de tegels van stukje 2. Het weggenomen basenpaar verdwijnt nu helemaal (geen stompje meer) en de rest schuift zichtbaar op. Ladder blijft (basisvorm DNA-reeks), staat al als twijfelscène.
11. **s19** — los '…'-tekentje onder de woordjes weg.
12. **s19** — label 'DATABANK' uitgelijnd op het midden van de tweede rij.
13. **s20/s21** — percentages 100 / 99,4 / 99,2 % (was 99 / 98); label 'voorbeeld' blijft.
14. **s24** — mini-codontabel heeft nu U C A G langs beide randen (herkenbaar als codontabel). Geen hand getekend: het gouden kader per drie op de tegels doet dat.
15. **s24** — label 'mRNA van insuline · zonder introns' en de tegels staan er vanaf t = 0.
16. **s26** — 'BEGINT BIJ AUG' in goud in plaats van groen (nu drie betekeniskleuren + goud).
17. **s20** — Sams naam blijft staan; ballon 'Geelvin!' iets hoger en links, zodat hij de naam niet raakt.
18. **s30** — zachte vervaging aan de linkerrand van de kralenketen (geen halve kraal meer).

Bronnen (`bronnen.md`): statussen volgens de tabel hierboven bijgewerkt (6, 9, 15, 17, 20, 21, 22, 26 ✓; 7, 18, 27 ≈; 16 ≈ met de nuance 'leest wel alles door op woordjes, slaat alleen het uitlijnen over'; 24 n.v.t.; 10 ✓ na de beeldfix; 12 ✓ na het v2-beeld). Stand: 22 ✓ · 10 ≈ · 0 ! · 0 ?. Aanpassingentabel aangevuld met s14, s33 en de percentages.

Na de fixes: opnieuw gebouwd (verteltijd 382 s), `cuecheck.py` zonder meldingen, stills van alle gewijzigde scènes nagekeken; keyframes in `blad/img/` van de gewijzigde scènes vernieuwd. Nog open: `films/logboek/fouten.jsonl` (in de repo, hoofdsessie).
