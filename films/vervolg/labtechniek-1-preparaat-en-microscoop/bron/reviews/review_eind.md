# Frisse eindreview: lt1 "Preparaat en microscoop: kleuren, snijden, scherpstellen"

Reviewer: frisse Claude-agent, 24 okt 2026. Ik heb de film niet gemaakt.

**Gelezen:** `script_v2.md`, `brief.md`, `reviews/review_v1.md`, `sections.html`, `film.json`, `segments.json` (vraagopties en eindkaart), `scenes_lt1.js`, `teken_lt1.js` (o.a. `telRaster`, `kijkVeld`) en `words/` (alle 11 alinea's). Afspraken: `films/BEELDAFSPRAKEN.md`, `films/WERKWIJZE-LESSEN.md`, reeksbrief `hw/lab/REEKS.md` en `hw/BOUWEN.md`.

**Eigen stills** (gebouwde `film/standalone.html` van 20:38) staan in `/tmp/claude-0/-home-claude/032b72a0-a997-5d9a-b615-cb1860469233/scratchpad/rev_lt1/`:
- `c/`: contact op 10/30/50/70/93 %
- `s10/` en `s13/`: elk 23 tijden, dicht op de woordtijden
- `x/`: t = 0,1 van elke alinea plus de eindkaart
- `y/`, `w/`, `v/`: losse tijden op volle resolutie
- contactbladen in `sh/`

`cuecheck.py` gaf geen meldingen. Ik heb de cues ook met de hand tegen `words/` gelegd, ook op substring-valkuilen ('Stel' 2 = 46,5 s; 'cel' 2 = 21,4 s; 'objectief' 3 = 28,4 s). Ze kloppen.

## Nagerekend en nagecheckt

**Getallen:** alle getallen in stem, beeld en checkvragen kloppen.
- Vergroting 10 × 40 = 400× en 10 × 100 = 1000×.
- IJken: 100 µm / 40 = 2,5 µm per streepje, en 8 × 2,5 = 20 µm. In de tekening klopt het ook: 0–40 streepjes en 0–100 µm zijn even breed, en de cel beslaat 8,0 streepjes.
- Telkamer: 1 × 1 × 0,1 mm³ = 0,1 µL. 50 / 0,1 = 500 per µL, dus 500 000 per mL. In het gemarkeerde vierkant staan precies 50 cellen; in de andere vakken 40–60.
- Checkvraag 5: 10 µm per streepje → 220 µm; bij 40× ± 2,5 µm. Checkvraag 6: 800 per µL × 1000 × 2 = 1,6 miljoen per mL.

**Bronnen:**
- **Oplossend vermogen.** Leica, 'What is empty magnification': d = 0,24 µm bij 550 nm (0,17 bij violet), nuttige vergroting 500–1000 × NA. Dus ± 0,2 µm en "2000× = lege vergroting" kloppen (bij NA 1,4 is de grens ± 1400×). Bron: https://www.leica-microsystems.com/science-lab/microscopy-basics/what-is-empty-magnification/
- **Coupedikte en HE-kleuring.** 3–5 µm, hematoxyline (met beits) voor de kernen, eosine voor de eiwitten. Klopt (JoVE/Leeds, zie v1).
- **Levercel.** Hepatocyt 20–30 µm (Univ. Vigo, atlas). "Zo'n vijf keer dikker" ligt aan de onderkant: 25/4 ≈ 6.
- **Fluorescentie en EM.** Excitatie, emissie en filter; EM ± 1 nm in coupes; vacuüm; zware metalen; GFP. Klopt. Deze punten heb ik niet opnieuw opgezocht, maar ze komen overeen met de v1-bronnen en het leerboek.
- **mbo.** Biologisch-medisch analist: niveau 4, 4 jaar BOL, crebo 25953. De eerste 2,5 jaar zijn een basisdeel dat voor laboratoriumtechniek gelijk is. Werk in ziekenhuislab en bedrijven (Noorderpoort, https://noorderpoort.nl/voor-studenten/opleidingen/biologisch-medisch-analist-bol).
- **hbo.** Biologie en medisch laboratoriumonderzoek, 240 EC = 4 jaar. Te volgen bij o.a. Hanze, NHL Stenden, Avans, Saxion, Inholland, HU en Hogeschool Rotterdam (studiekeuze123.nl, opleiding 1483 e.v.). Klopt met de reeksbrief.

**Reeksgrenzen:** er zit geen bloedtelling, Gramkleuring of verdunningsreeks in de stem. Verdunning staat alleen in checkvraag 6 en het docentdeel. Goed.

**Stelligheid:**
- In orde: "bijna geen licht", "ongeveer 0,2", "alleen op dat eiwit past" (vereenvoudiging, acceptabel), "In een elektronenmicroscoop zijn de cellen dood".
- Niet overgenomen uit v1: "Het blijft wel licht, dus de grens van 0,2 micrometer blijft ook" (s10, 22,9–27,1 s). Volgens review_v1 punt 13 zou v2 hier "een gewone fluorescentiemicroscoop" zeggen, maar dat woord staat niet in het script. Het docentdeel vangt het op (superresolutie). Zie KAN 13. Geen nieuwe audio nodig.

**Vraagkaarten:**
- Antwoorden c, b, a, b, c: de letter wisselt, en het goede antwoord is niet steeds de langste optie.
- Opties zijn ongeveer even lang (q02 8/7/8 woorden, q05 7/7/6, q08 8/6/7, q11 6/6/5, q14 getallen).
- De vakterm staat niet alleen in het goede antwoord: 'lichtmicroscoop' staat in a en b, 'details' in a en b.
- **Vragen uit:** `vraagCuts` knipt de vraagzinnen weg. Daarna lopen alle overgangen door:
  - cold open "… verder alleen licht." → "De cellen zijn niet te klein."
  - s04 "Stel dat … groot maakt." → "Het beeld wordt groter …"
  - s07 "… vier micrometer dik." → "Een levercel is zo'n vijf keer dikker …"
  - s10 "Yasmin wil zien …" → "In een elektronenmicroscoop zijn de cellen dood …"
  - s13 "… vijftig cellen." → "Vijftig cellen in een tiende microliter …"
- De antwoordtags zijn geschreven als "antwoord x: inhoud". Het vraagteken en de chip "hoeveel per milliliter?" vallen binnen de knip.
- Kleine aantekening: zie KAN 16.

---

## Bevindingen

1. **MOET**: s10 0–8,8 s · beeld. De stem zegt "een antistof die alleen op **dat** eiwit past", maar de drie eiwitten in het membraan zijn **identiek** (zelfde vorm, zelfde paars). Dat 'alleen op dit eiwit' wordt dus niet zichtbaar. Bovendien staat het label "eiwit in het membraan" (1,5–4,0 s) bij het **rechter** eiwit (hoek −1,2), terwijl de antistof op het **middelste** bindt (hoek −1,57). Het label staat daarbij half óver de membraanlijn.
   **Voorstel:** maak het doeleiwit anders van vorm en kleur dan de twee andere (bv. teal met een eigen inkeping die precies in de armpjes van de antistof past). Zet `naamBij` 'eiwit in het membraan' naast dat middelste eiwit, boven de membraanlijn (bv. x ≈ 1010, y ≈ 400). Alleen beeld.

2. **MOET**: s10 4,0–8,8 s · beeld. Het label "antistof / PAST ALLEEN OP DIT EIWIT" blijft op (1560, 220) staan terwijl de antistof naar het midden (≈ 960, 420) schuift. Het staat daardoor ± 600 px los van het ding: dat strijdt met de afspraak 'naam direct bij het onderdeel'. De metaregel loopt bovendien tot ± 1895 px, dus vrijwel tegen de beeldrand (`v/`, `y/s10_004.20`).
   **Voorstel:** het label laten meeschuiven met de antistof (`naamBij` op `lerp(1500,px,b)+70`, y − 60), of na het binden vast rechts naast de antistof zetten (x ≈ 1040, y ≈ 330, links uitgelijnd). Daar komt dan "lichtgevend label" (nu op 1080, 200) ook vlakbij te staan. Laat 'lichtgevend label' boven de ster beginnen. Alleen beeld.

3. **MOET**: s10 50,4–52,2 s · beeld. De chip "zware metalen" (x 1060) valt **over de rand van het EM-beeld**: de cirkel begint bij ± 1064. Daardoor is hij half onleesbaar ("zware metale…", `y/s10_051.80.png`). Juist bij het woord "zware metalen zoals lood" valt dat op.
   **Voorstel:** de vier chips in één kolom links van het beeld (x ≈ 820, y 250/320/390/460), of de tweede kolom op x 1000 met een kleinere breedte. Houd ≥ 30 px vrij tot de ring. Alleen beeld.

4. **MOET**: s13 12,8–27,7 s · beeld, vakinhoudelijk. De objectmicrometer blijft in beeld terwijl Yasmin de cel meet (21,1–27,7 s). De kweekcellen zijn ook al zichtbaar achter de objectmicrometer (12,8–21 s). Zo lijkt het alsof je de cel direct langs de bekende schaal afleest. Dan is het ijken van het oculair overbodig, en dat is precies wat de scène moet uitleggen. In het echt ijk je met alleen de objectmicrometer onder het objectief; daarna haal je hem weg en leg je je eigen preparaat eronder. De stem zegt ook "legt Yasmin **eerst** een glaasje … eronder".
   **Voorstel:** in `oculairSchaal` de objectmicrometer laten wegfaden op 'cel' 2 (`obj: ob * (1 - cel)`). Laat de kweekcellen tijdens het ijken wegvallen (`k: 0.25 * (1 - ob) …`) en daarna terugkomen. Het label 'objectmicrometer' gaat dan ook weg op 'cel'; eventueel een chip "glaasje eruit, eigen cellen eronder". Alleen beeld.

5. **MOET**: s04 44,5–46,5 s · beeld. Het label "olie" (`M.objTip.x + 60`, `+ 30`) valt **over "objectief / 100×"**. Je leest "100×" en "olie" door elkaar (`v/crop_olie.png`).
   **Voorstel:** "olie" links van de objectieftip zetten (`M.objTip.x - 60`, align 'right'), of het objectief-label 50 px hoger. Alleen beeld.

6. **MOET**: eindkaart (s18, regel 5) · beeld. "**Ijk** het liniaaltje in het oculair opnieuw bij elk objectief." De Nederlandse spelling aan het begin van een zin is "**IJk**". Dit staat in `script_v2.md` (Eindkaart) en `segments.json` regel 1019, en is in de film te zien vanaf ± 8 s.
   **Voorstel:** in beide bestanden "IJk het liniaaltje …". De eindkaart wordt niet ingesproken, dus er is geen nieuwe audio nodig.

7. **KAN**: s01 0–6,6 s · beeld. Tweederde van het beeld is leeg; alleen de metaregel "onderzoekslab · eerste opdracht" staat er. De kweekfles verschijnt pas op 'kweekfles'.
   **Voorstel:** de kweekfles (of fles + glaasje) vanaf t = 0 rechts zetten, en het label op 'kweekfles' laten verschijnen. Alleen beeld.

8. **KAN**: s01 13,4–17,7 s · beeld. De chip "bijna niets" (y 200) valt binnen de bovenrand van het kijkveld en overlapt de ring (`y/s01_014.50.png`).
   **Voorstel:** y ≈ 110, onder de metaregel, of rechts naast de cirkel. Alleen beeld.

9. **KAN**: tags die op de ring van een kijkveld vallen · beeld. Het gaat om:
   - s04 29,4–32,5 s ("10 × 40 = 400×", y 140)
   - s04 45,2–51,3 s ("10 × 100 = 1000×", y 140)
   - s10 21,3–27,9 s ("fluorescentie", y 140)
   - s10 35,4–52 s ("details van ± 1 nanometer", y 120)

   Ze staan half op de donkere ring, die bij y ± 144 begint.
   **Voorstel:** deze tags op y ≈ 95, of het kijkveld 30 px lager. Alleen beeld.

10. **KAN**: s10 15,1–27,9 s · beeld. De metaregel "LAAT ALLEEN GROEN DOOR" onder 'filter' loopt door tot tegen de ring van het fluorescentiebeeld (`y/s10_025.50.png`).
    **Voorstel:** het filterlabel links uitlijnen onder het filter (x ≈ 420, y ≈ 420), of de cirkel 40 px naar rechts. Alleen beeld.

11. **KAN**: s10 27,9–35,4 s · beeld. Zeven seconden lang staat alleen de EM-kolom in beeld en is de rechterhelft leeg, terwijl de stem zegt "Die gebruikt elektronen in plaats van licht". Het EM-beeld komt pas op 'nanometer'.
    **Voorstel:** het EM-beeld al tonen op 'elektronen' (31,7 s), of de lege cirkel van het fluorescentiebeeld laten staan en pas op 'nanometer' laten overgaan in het EM-beeld (licht → elektronen). Alleen beeld.

12. **KAN**: s10 37–52 s · beeld. Drie labels vallen over de tekening: "ribosomen" ligt over de ring linksboven, "plooien (cristae)" (y 740) over de onderrand van het EM-beeld, en "vacuüm" (640, 520) over het pompkastje.
    **Voorstel:** 'ribosomen' links buiten de cirkel (x ≈ 1050, y ≈ 260, align 'right'), 'plooien (cristae)' onder de cirkel (y ≈ 830), en 'vacuüm' rechts naast het pompkastje (x ≈ 720). Alleen beeld.

13. **KAN**: overgangen met halfdoorzichtige figuren · beeld. In s10 52,2–52,8 s faden Yasmin en de EM-kolom door elkaar (Yasmin staat spookachtig in de kolom, `v/s10_052.50.png`). In s13 27,7–28,3 s ligt de telkamer over de vervagende Yasmin (`s13/s13_027.90.png`). BOUWEN zegt dat halfdoorzichtige personen er spookachtig uitzien, en BEELDAFSPRAKEN vraagt eerst oud weg, dan nieuw.
    **Voorstel:** `wissel()`-achtig: het oude in 0,3 s weg, daarna het nieuwe in 0,3 s erin. Alleen beeld.

14. **KAN**: s10 52,2–58,7 s · beeld. Het veld "mitochondriën in een levende cel" heeft dezelfde navy als de achtergrond en geen celomtrek. Je ziet losse oranje ovaaltjes in een donkere ring. Het donkere veld met gekleurde organellen lijkt ook al op een fluorescentiebeeld, wat licht voorzegt naar antwoord b.
    **Voorstel:** een lichte cel (celmembraan, kern) op het gewone lichtveld met bewegende mitochondriën als omtrek, zonder gloed, met een "?" erbij. Het fluorescentiebeeld komt dan pas in s12. Alleen beeld.

15. **KAN**: s13 21,8–27,7 s · beeld. Bij "Een cel van acht streepjes …" wijst Yasmin naar de chips, niet naar de cel. Haar hand raakt de chip "1 streepje = 2,5 µm" (`s13/s13_023.50.png`).
    **Voorstel:** de chips 80 px lager zetten, zodat de arm erboven langs naar het kijkveld wijst, of pose 'staan' laten. Alleen beeld.

16. **KAN**: s13 27,9–31,6 s · beeld. Na "Nu tellen" staat alleen een kale telkamer linksboven, tot 29,6 s zonder naam; de rest van het beeld is leeg (`y/s13_029.20.png`). Het raster komt pas op 'raster' (31,6 s).
    **Voorstel:** het kijkveld met het (nog lege) raster op 'Nu' laten verschijnen, en het label 'telkamer' meteen. Alleen beeld.

17. **KAN**: s13 35–45 s en s15 · beeld. De metaregel "1 × 1 MILLIMETER" staat onder het hele kijkveld. Daardoor leest hij als de maat van het hele beeld, terwijl je 3 × 3 vierkanten ziet.
    **Voorstel:** "het gele vierkant: 1 × 1 millimeter", of het label direct onder het gele vierkant binnen het veld. Alleen beeld.

18. **KAN**: s17 21,1–21,8 s · beeld. De metaregel "VOLGENDE FILM: HET ZIEKENHUISLAB" (gecentreerd op x 1640) eindigt ± 20 px van de rechterrand. De afspraak is ≥ 60 px.
    **Voorstel:** ziekenhuisje en label naar x ≈ 1560. Alleen beeld.

19. **KAN**: s09 1,7–9,7 s · beeld. De stem zegt "zo'n vijf keer dikker", maar het label zegt "levercel ± 25 micrometer" en "plakje 4 micrometer", en dat is ruim zes keer.
    **Voorstel:** metalabel "20–30 micrometer" (zoals in het docentdeel), dan past 'zo'n vijf keer' erbinnen. Alleen beeld.

20. **KAN**: stelligheid in de teksten rond de film · docentdeel. Drie zinnen zijn te stellig:
    - (a) `film.json` q05 explain: "Ribosomen … zie je met licht **nooit** los". Superresolutie (MINFLUX, expansiemicroscopie) komt in de buurt. **Voorstel:** "met een gewone lichtmicroscoop niet los".
    - (b) Glossary 'elektronenmicroscoop': "dus **alleen** met dode, gefixeerde en **ultradun gesneden** preparaten". Dat geldt voor de transmissie-EM. Een scanning-EM bekijkt hele oppervlakken, en cryo-EM werkt met bevroren in plaats van chemisch gefixeerde monsters. **Voorstel:** "werkt in vacuüm, dus met dode preparaten; voor de gewone (transmissie-)EM gefixeerd en ultradun gesneden".
    - (c) Bij Vereenvoudigingen expliciet de stemzin "het blijft wel licht, dus de grens van 0,2 micrometer blijft ook" noemen. Review_v1 beloofde 'gewone' in de stem, maar dat staat er niet.

    Geen nieuwe audio.

21. **KAN**: `sections.html` (en `film.json` sections), rij "Nuttige vergroting" · docentdeel. Er staat "Leica: 500–1000 × NA; bij NA 1,4 praktisch net onder 2000×". Dat klopt niet: de bovengrens is 1000 × 1,4 = **1400×** (bij wit licht; ook met violet licht 1400 × NA = 1960× haalt het de 2000× niet).
    **Voorstel:** "Leica: 500–1000 × NA; bij NA 1,4 tot ± 1400×, dus 2000× is lege vergroting". Alleen docentdeel.

22. **KAN**: s10 44,0–51,5 s · docentdeel. "Het preparaat is **dus** gefixeerd, ontwaterd, veel dunner gesneden …". Het 'dus' past bij fixeren en ontwateren (vacuüm), maar dunner snijden komt doordat elektronen nauwelijks door materiaal heen gaan.
    **Voorstel:** in Vereenvoudigingen één zin: "Veel dunner (50–100 nm) omdat elektronen maar door een heel dun laagje heen komen; dat volgt niet uit het vacuüm". De stem kan blijven.

23. **KAN**: q02 en `film.json` `lead` · beeld/docentdeel.
    - (a) De zin vóór de vraag eindigt op "verder alleen licht". Het woord 'licht' komt daarna alleen in optie c terug ("laten bijna al het licht door"). Dat is een lichte woordhint. Review_v1 vond hem acceptabel; ik laat hem staan, maar "de cellen houden bijna niets tegen" zou neutraler zijn.
    - (b) De `lead` boven de film verklapt het antwoord op de openingsvraag: "Niet omdat de cellen te klein zijn: ze laten bijna al het licht door".

    **Voorstel** voor (b): "Hoe kan dat? Je ontdekt het in de film, en leert …". Geen nieuwe audio.

---

**Telling:** 6 MOET en 17 KAN. Geen enkel punt vraagt nieuwe audio. De MOET-punten zitten alle zes in het beeld (één ervan, de eindkaart, ook in script/segments).

Kort over s10 en s13, die zonder nieuwe stills waren gewijzigd: beide draaien zonder fouten en de cues kloppen. In s10 zitten drie MOET-punten (1–3), in s13 één (4). Daarnaast zijn er KAN-punten over overgangen en lege stukken.

---

## Verwerkt (maker, 24 okt 2026)
Opnieuw gebouwd, `cuecheck` zonder meldingen. Verse stills van de gewijzigde scènes in `qa3/` en `qa4/`. Contactsheets: `/tmp/claude-0/-home-claude/032b72a0-a997-5d9a-b615-cb1860469233/scratchpad/sheet_lt1_rev.png`, `sheet_lt1_rev2.png` en `sheet_lt1_rev3.png`. Er is geen nieuwe audio gemaakt.

| # | Status | Wat |
|---|---|---|
| 1 MOET | gedaan | Het doeleiwit is nu teal met een inkeping. De twee andere eiwitten zijn paars en rond. Het label 'eiwit in het membraan · dit eiwit zoekt Yasmin' staat boven het middelste eiwit, vrij van de membraanlijn. |
| 2 MOET | gedaan | 'antistof · past alleen op dit eiwit' schuift mee met de antistof (links ervan). 'lichtgevend label' staat naast de ster. |
| 3 MOET | gedaan | De vier chips (gefixeerd … zware metalen) staan in één kolom op x 880, vrij van de ring. |
| 4 MOET | gedaan | Na het ijken verdwijnt de objectmicrometer op 'cel'. Tijdens het ijken vallen de kweekcellen weg; ze komen terug met het label 'eigen cellen eronder · objectmicrometer eruit'. |
| 5 MOET | gedaan | Het label 'olie' staat onder 'objectief 100×' bij de tafel. Er is geen overlap meer. |
| 6 MOET | gedaan | Op de eindkaart staat nu 'IJk' (in `script_v2.md` en `segments.json`). |
| 7 KAN | gedaan | De kweekfles staat er vanaf t = 0; het label verschijnt op 'kweekfles'. |
| 8 KAN | gedaan | De chip 'bijna niets' staat rechts naast het kijkveld. |
| 9 KAN | gedaan | De tags 400×, 1000×, 'fluorescentie' en '± 1 nanometer' staan op y 95, boven de ring. |
| 10 KAN | gedaan | Het fluorescentieveld staat 40 px verder naar rechts. |
| 11 KAN | gedaan | Het EM-beeld verschijnt al op 'elektronen' (31,7 s). |
| 12 KAN | gedaan | 'ribosomen' staat links buiten de cirkel, 'plooien (cristae)' onder de cirkel en 'vacuüm' naast het pompkastje. |
| 13 KAN | gedaan | Overgangen s10 → Yasmin en s13 → telkamer: eerst gaat het oude weg (0,3 s), daarna komt het nieuwe in beeld (0,3 s). |
| 14 KAN | gedaan | De levende cel staat op een licht veld, met celomtrek, kern en mitochondriën als omtrek, zonder gloed. Dit verklapt geen fluorescentie meer. |
| 15 KAN | gedaan | De chips staan 80 px lager. De arm wijst er nu boven langs. |
| 16 KAN | gedaan | De telkamer met label en het lege raster staan er direct op 'Nu'. |
| 17 KAN | gedaan | De metaregel luidt nu 'gele vierkant: 1 × 1 millimeter' (s13). s15 heeft geen metaregel en is niet aangepast. |
| 18 KAN | gedaan | Het ziekenhuisje en het label staan op x 1560. |
| 19 KAN | gedaan | Het metalabel van de levercel zegt nu '20–30 micrometer'. |
| 20 KAN | gedaan | (a) Uitleg bij q05 gewijzigd in 'met een gewone lichtmicroscoop niet los'. (b) Begrip elektronenmicroscoop: 'met dode preparaten; voor de gewone (transmissie-)EM gefixeerd en ultradun gesneden'. (c) De stemzin over de grens van 0,2 µm bij fluorescentie staat nu bij Vereenvoudigingen. |
| 21 KAN | gedaan | Rij nuttige vergroting: 'bij NA 1,4 tot ± 1400×, dus 2000× is lege vergroting'. |
| 22 KAN | gedaan | Bij Vereenvoudigingen staat nu waarom het preparaat veel dunner moet (elektronen komen maar door een heel dun laagje), en dat dit niet uit het vacuüm volgt. |
| 23 KAN | (a) bewust niet, (b) gedaan | (a) Aanpassen vraagt nieuwe audio, en de reviewer vond het ook acceptabel. (b) De `lead` verklapt het antwoord niet meer ('Hoe kan dat? Dat ontdek je in de film.'). |
