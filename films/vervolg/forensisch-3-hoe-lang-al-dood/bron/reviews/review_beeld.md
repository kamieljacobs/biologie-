# Frisse beeldreview film 3 — Hoe lang al dood? (25 okt 2026, C10.7)

Contactsheet 5 beelden per alinea (98 stills) + losse stills op volle grootte bij twijfel; Vragen uit afgespeeld rond alle 6 vragen.
Extra streng: overledene nergens in beeld (alleen lege leesstoel, kamer, schema's) ✓; vlieg, eitjes, larven en pop netjes schematisch, niet griezelig ✓; geen lichaam, wond of bloed op een mens ✓.

## MOET
1. **s23 16,6–17,6 s** ('Elke klok heeft een marge, dus Kim combineert ze'): Dr. Kim faadt half doorzichtig in óver de nog zichtbare vlieg, eitjes, thermometer en made (de vlieg staat op haar schouder; spookachtig). Fix `s23`: eerst de rekwisieten weg (`Kuit`, 0,4 s), dan Kim erin (`K`, start 0,25 s na 'Kim'); geen overlap meer.
2. **s07 24,8–26,0 s** ('nomogram van Henssge'): kern/huid-cirkel en nomogramkaart overlappen tijdens de wissel (tekst 'huid' door 'nomogram van Henssge'). Fix `s07`: kernHuid eerst uit (0,35 s), kaart daarna in.
3. **s07 18–34 s**: label 'kamer · 15 graden' staat op het eindpunt van de curve en over de stippellijn van de vuistregel. Fix `afkoelGrafiek` (teken_fo3.js): label links boven de kamerlijn.
4. **s07 33 s**: 'marge van uren' valt over de plateau-haak. Fix `afkoelGrafiek`: label onderin de margebalk.
5. **s09 6–19 s**: '2–4 uur: stijf' staat over de stijgende curve. Fix `s09`: label rechts van de band, onderin.
6. **s01 5–9 s**: 'laatst gezien / niet open' overlappen de naam 'Mevrouw Jansen · de buurvrouw'. Fix `s01`: labels onder de kalender.
7. **s12 15–22 s**: een enzymkluwen ligt op het label 'Z-schijf · houdt de vezel bij elkaar'. Fix `s12`: onderste enzymen 100 px naar rechts.

## KAN
1. s16 ±14 s: de made op de liniaal lijkt ±18 mm terwijl er '15 millimeter' staat (kop steekt voorbij 15). `made()`-lengte of liniaalpositie nalopen.
2. s08 na 'halve dag': het label 'lijkvlek · na ongeveer een halfuur' blijft staan als het al 'vast' is; eventueel dimmen.
3. Vragen uit: in deze hw-build staat het groene 'antwoord x: …' nog in beeld; `scripts/antwoordtekst.py` haalt het weg bij het in de repo zetten (getest op een kopie: `--check` 'alles in orde'). Verder blijft er bij Vragen uit niets van vraag of antwoord over in geluid of ondertitel.
4. Eindkaart s25: vijfde regel verschijnt pas na ±5 s en staat vlak boven de vervolgvraag; leesbaar, mag iets hoger.

## Verwerkt (25 okt 2026)
MOET 1–7 hersteld in `scenes_fo3.js` (s01, s07, s09, s12, s23) en `teken_fo3.js` (`afkoelGrafiek`); herbouwd met `bouw.sh`, cuecheck schoon, elke fix gecontroleerd met een verse still (s01 8,2; s07 3,6/24,5/25,3/26,5/33,5; s09 13,9; s12 15,9/22,3; s23 16,6/16,9/17,2/17,6/26,6). Kim in s23 is nu pas zichtbaar als de rekwisieten weg zijn en daarna volledig dekkend. KAN-punten open.

### Verwerkt, ronde 2 (KAN 1, 2, 4)
- KAN 1 `s16`: made precies 0–15 mm op de liniaal (midden op 7,5 mm, kruipen uit tijdens het meten); still s16 14,2 nagemeten: kop op ±15,1 mm.
- KAN 2 `s08`: bij 'halve' wisselt de ondertekst van 'na ongeveer een halfuur' naar 'vast: niet meer weg te drukken'; still s08 17,5.
- KAN 4 eindkaart: eigen `drawEnd` onderaan `scenes_fo3.js` (engine niet aangeraakt): bij 5 regels start op y 230 met 92 px tussenruimte, regels om de 0,9 s, vervolgvraag-haak 80 px onder de laatste regel; stills s25 2 en 12.
- Herbouwd met `bouw.sh`, cuecheck schoon. KAN 3 (antwoordtekst) blijft voor de stap naar de repo.
