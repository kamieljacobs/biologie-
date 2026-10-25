# Frisse beeldreview film 1 — Sporen op de plaats delict: is dit bloed? (prompt v10, C10.7)

Contactsheet 5 beelden per alinea + losse stills bij begrippen, vragen, antwoorden en twijfelplekken; Vragen uit afgespeeld rond elke vraag.

## MOET
1. **s13 · 8,7–15,9 s** — testpapier is een lege lichtblauwe balk; 'zetmeel met een blauwe kleurstof eraan' niet te zien, en het knippen start al op 'knipt.' (8,0 s) i.p.v. 'Knipt amylase' (12,4 s). Fix (scenes_fo1.js s13): crème papier met vaste blauwe kleurstofstipjes, blauwe vlek die pas na het tweede 'Knipt' uitloopt; `q.on/at('Knipt', 2)`. Labels amylase/zetmeel verschoven zodat ze niet tegen de cirkel staan.
2. **s14 · 0–2,4 s** — muur leeg op t = 0, spatjes verschijnen pas bij 'rond'/'ovaal' (en bij Vragen uit lijkt de muur leeg na de kaart). Fix: beide spatjes (met staartje) vanaf t = 0; namen blijven op het woord.
3. **s25 · ±3,4–4,9 s** — formulier verschijnt als lege grijze plaat (rijen pas 0,6 s na 'formulier', plaat half doorzichtig). Fix: rij Bilal start 0,1 s na 'formulier' en faadt in 0,6 s.
4. **s26 · 15,1–17,9 s** — label 'niet van de hond' en hondenmand onder het schuivende mes-doosje, doosje schuift over de deur/afzetlint. Fix: mand + label naar x 1150, doos schuift 1300 → 1390, 'DNA-lab →' mee.
5. **s08 · 24–32 s** — Bilal en Dr. Kim blijven als half-alpha (spookachtige) figuren achter de kaart 'licht = de reactie gaat sneller'. Fix: personen volledig weg zodra de kaart komt (`a: 1 - Mr`).
6. **s16 · 0–3 s** — beeld bijna leeg (alleen muurbalk) tot 'recht'. Fix: druppel in zijaanzicht vanaf t = 0 zichtbaar. Ook 'ovaal · schuin: glijdt door' en chip 'staartje wijst…' stonden <60 px van de rand / over het ovaal: spatjes naar x 1420, labels 1490–1520, chip naar (1620, 800).
7. **Vragen uit · s04, s07, s12, s16, s21, s24** — antwoordtags 'antwoord b: …' blijven in beeld. Fix: `scripts/antwoordtekst.py` draaien bij het in de repo zetten (getest op een kopie: tags worden 'Naar hemoglobine' enz.). Niet in fo1-code; zie Open.

## KAN
8. **s04 · 7,5–14 s** — label 'heem / elk met één ijzeratoom' bij x 1500 viel tegen de rechterrand (meta liep tot ±1910 px). Verplaatst naar (1430, 250). (Meegenomen.)
9. **s07 · 12,9 s** — druppelflesje stond onder het vinkje van 'Bilal'. Flesje naar rechtsonder, vinkje op dezelfde hoogte als de andere twee. (Meegenomen.)
10. **s10 · 13–18 s** — meta 'PAST OP ÉÉN VORM' valt over de wijslijn van de zoomcirkel; label iets lager of links zetten.
11. **s21 · 11–16 s** — 'een haar' staat ver van het vallende haartje (haar dun en klein); haar dikker of label dichterbij.
12. **s09 · 0–4,9 s** — alleen de tag 'voorproef' in beeld tot 'Mierikswortel'; een stilstaand staafje/vlek als anker zou helpen.
13. **s04 · 13–14 s** — chip 'versnelt de reactie, zoals een enzym' + 'VEREENVOUDIGD' heel klein en ver weg linksonder van de reactie; dichter bij het heem zetten.
14. **s27** — Bilal draagt hier `practicum` (witte jas, bril) i.p.v. `plaatsdelict`; is dat bewust (opleiding)? Kamiel laten beslissen.

Geen problemen gevonden met reeksgrenzen (geen lichaam/wond/geweld), paletkleuren of eenheden; s18 en s17 kloppen met de tekst (5 × 10 mm, 30°, 64–90° vs 27–33°).

## Verwerkt (25 okt 2026)
- MOET 1–6 en KAN 8–9 hersteld in `scenes_fo1.js` (s04, s07, s08, s13, s14, s16, s25, s26); niets in engine/, teken_fo1.js ongewijzigd.
- Opnieuw gebouwd met `fo1/bouw.sh` (345 s), `engine/cuecheck.py fo1 fo1/scenes_fo1.js` schoon.
- Elke fix gecontroleerd met een verse still (s04 13,9 · s07 13,5 · s08 30 · s13 3/10,9/15,3 · s14 0 · s16 0/12,8 · s25 4,0/4,8 · s26 17,6).
- Open: MOET 7 (antwoordtekst.py bij inbouw in de repo), KAN 10–14.
