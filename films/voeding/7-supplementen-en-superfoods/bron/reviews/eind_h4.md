# Eindreview hoofdstuk 4 "Hypes op het bewijsbord" (s21–s27, q25)

Gecontroleerd tegen `reviews/supplementen_onderzoek.md`, `script_v2.md` r. 72–99, `scenes.js` r. 18–24, 50–64 en 168–197, `film.py` (q25), `segments.json` (opties q25), woordtijden `words/s2*.json` en alle stills `qa/s21_*` t/m `qa/s27_*` en `qa/q25_*`.

**Wat klopt.** De vakindeling volgt het dossier: creatine, niacine tegen pellagra en vitamine D in de adviesgroepen staan op vastgesteld; NMN en magnesium-threonaat op hypothese; veel niacine tegen hartinfarct en vitamine D bij gezonden op weerlegd. De getallen kloppen: AIM-HIGH + HPS2-THRIVE = 29 087 deelnemers ("bijna dertigduizend"), VITAL ruim 25 000 deelnemers en ~5 jaar, NMN-studies hooguit 12 weken. Ook de NMN-status in de EU klopt: nog geen novel-food-toelating, wel een positief EFSA-advies van mei 2026. q25 correct = 0 = a, en de stem zegt "Antwoord aa". Alle cue-woorden worden gevonden op het juiste moment (substring, hoofdletterongevoelig). Niets komt onder y = 900: het laagste punt is de pot in s27 op ±880 en de EU-tag in s26 op 876. De ondertitelband overlapt nergens.

## Punten, op ernst

1. **Eindkaart: "extra vitamine D: weerlegd" spreekt het bord tegen** (script_v2.md r. 99; de eindkaart heeft geen still). Op het bord staat vitamine D in de adviesgroepen op *vastgesteld*. Een leerling die alleen de eindkaart leest, concludeert dat vitamine D nooit zin heeft. Dat botst met hoofdstuk 1.
   *Fix:* "Hypes: creatine vastgesteld; NMN hypothese; veel niacine tegen hartinfarct en extra vitamine D bij gezonden: weerlegd."

2. **s27: de stem zegt een claim die niet mag** (still `s27_022.44`; script r. 85; scenes.js r. 196). In beeld staat de goedgekeurde EU-claim "draagt bij tot een normale werking van het zenuwstelsel". De stem zegt "goed voor een normale werking van het zenuwstelsel". Juist het punt van dit stukje (alleen de exacte goedgekeurde claim mag) gaat zo verloren, en beeld en stem lopen niet gelijk.
   *Fix:* laat de stem zeggen "…zoals: draagt bij tot een normale werking van het zenuwstelsel." Neem alleen s27 opnieuw op en zet het cue-woord in r. 196 op 'draagt'.

3. **s21: "bij duursport helpt het niet" is sterker dan het bewijs** (still `s21_026.24`; script r. 73; scenes.js r. 171, tag 'duursport: geen effect'). Het dossier (5a) zegt dat een effect bij duursport "niet aangetoond (hooguit een hypothese)" is. Dat is niet hetzelfde als weerlegd, en precies het onderscheid dat q25 even later toetst.
   *Fix:* stem "Maar alleen daarvoor: dat het bij duursport helpt, is niet aangetoond." Tag: 'duursport: effect niet aangetoond'. Cue 'duursport' blijft werken.

4. **Het vak WAARSCHIJNLIJK blijft het hele hoofdstuk leeg** (stills `s24_023.50`, `s27_022.44`; scenes.js r. 52–61 `hypeItems`). Het dossier stelt voor alle vier de vakken te vullen. Een leeg vak suggereert dat er alleen "werkt" of "werkt niet" bestaat. Het bord van s17 staat te ver terug om dat op te vangen.
   *Fix (goedkoop):* in s22 een item `add(2, 1, 'vitamine D: iets minder luchtweginfecties (klein)', …)`, met de zin "Wel kreeg je met dagelijks een beetje vitamine D iets minder vaak een luchtweginfectie: waarschijnlijk, maar klein." (Jolliffe 2021, OR 0,92). Daarvoor moet s22 opnieuw opgenomen worden.
   *Alternatief zonder nieuwe opname:* het item tonen in s26 met alpha 0,5. Dat is minder goed, want dan hoort er geen stem bij.

5. **s23: twee grijze staven zonder label of legenda** (still `s23_026.47`; scenes.js r. 180–181). Van 19,9 s tot 26,8 s staan er twee kale grijze staven in beeld. Ook daarna is niet te zien dat grijs = placebo en goud = niacine (in s22 staat die legenda er wel).
   *Fix:* laat de placebostaven pas op `q.on('bloedwaarden')` en `q.on('minder')` verschijnen, samen met hun label. Zet onder '± 30 000 hartpatiënten' de regel `'grijs: placebo · goud: niacine'` (420, 700, 24 px).

6. **s23: het label "HDL-cholesterol" ligt over de bovenkant van de gouden staaf** (still `s23_035.16`; scenes.js r. 180). Het label staat op y 740 en de staaf begint op y 730.
   *Fix:* zet het label op y 700, net als 'hartinfarcten' (710), of verlaag de staaf naar 110.

7. **Bord: de tekst staat gecentreerd terwijl de bolletjes links staan** (alle H4-stills, bv. `s24_023.50`, "●veel niacine tegen hartinfarct"; scenes.js r. 23, `wrapC` met `textAlign = 'center'`). Bij lange regels raakt het bolletje de tekst. Bij twee regels ("vitamine D in de / adviesgroepen") staat het bolletje los van de tekst.
   *Fix:* geef `wrapC` een optie `align` en teken de items links uitgelijnd vanaf `cx + 36` (bolletje op `cx + 20`). Dit geldt ook voor s17: controleer daar de still na de wijziging.

8. **s26: de weerlegging van afleider b heeft geen beeld** (still `s26_015.35`; scenes.js r. 188–192). Van 11,5 s tot 21 s legt de stem uit waarom b fout is, maar in beeld verandert niets. Voor c is er wel een tag.
   *Fix:* voeg toe `tag(ctx, 'b? ook bij niacine betere bloedwaarden, toch geen effect', 960, 860, C.koraal, q.on('Misschien', 1) * (1 - q.on('regels', 1)))` en laat de EU-tag op dezelfde plek invaden. Zo ontstaat ook geen botsing met het smalle gat (10 px) tussen 'antwoord a' (y 570) en de onderrand van het bord (y 560). Zet 'antwoord a' daarom ook op y 620.

9. **q25: afleiders eerlijk, formulering van a kan beter** (still `q25_007.00`; segments.json q25 / script r. 82). De afleiders zijn eerlijk. b (meer NAD+ = beter) en c (niet toegelaten) zijn echte misvattingen en worden in s26 elk weerlegd. Optie a is taalkundig scheef: "niacine is groot en lang getest" (de stof is niet groot). Bovendien bevat alleen a het woord "getest", vlak na "is nooit getest". Dat maakt a wat makkelijk te raden.
   *Fix:* a = "niacine is in grote, lange proeven getest; NMN bij mensen nog niet". c = "NMN is in de EU nog niet toegelaten, dus mag het niet op weerlegd staan". Optioneel b = "NMN maakt meer NAD+ aan, dus het werkt beter dan niacine". Zo zijn de drie opties ongeveer even lang.

10. **Kleine feitelijke aanscherpingen** (stills `s22_025.07`, `s24_010.07`; scenes.js r. 174 en 185).
    - (a) VITAL ging over 50-plussers. Tag: 'ruim 25 000 gezonde 50-plussers, ± 5 jaar, met placebo'. De stem mag "gezonde volwassenen" blijven zeggen.
    - (b) Bij Mills 2016 kregen muizen vanaf jonge leeftijd 12 maanden NMN: de achteruitgang bij het ouder worden werd geremd. "Oude muizen" is te sterk. Tag: 'muizen: minder achteruitgang bij het ouder worden'.
    - (c) "nog niet toegelaten" verjaart: de EU-toelating kan eind 2026 komen, en dan alleen voor één fabrikant. Zet in `bron/info.md` bij aandachtspunten "NMN-status EU per okt 2026: controleren bij elke herziening".
    - (d) "hartpatiënten" is beter als "hart- en vaatpatiënten" (HPS2-THRIVE nam ook patiënten met een herseninfarct en perifeer vaatlijden).
