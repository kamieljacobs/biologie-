# Frisse beeldreview fo2 — Hoe zeker is een match? (C10.7, 25 okt 2026)

Contactblad: 5 beelden per alinea (102 stills) plus losse stills op volle grootte bij elk begrip, elke vraag, elk antwoord en de handdrukken. Vragen uit apart afgespeeld (cuts van q02/q07/q12/q16/q21 gecontroleerd). cuecheck schoon.

**Handdruk s14/s15 (nieuwe pose 'handdruk')**: klopt. De handen grijpen echt in elkaar (duim boven, vingers over de rug van de andere hand), de ellebogen buigen natuurlijk, het grijppunt ligt op heuphoogte, het schudden is drie keer rustig op en neer, en beide personages staan stil zonder te glijden. Ook bij de inval van paneel 2 (half-alpha tijdens de fade van 0,5 s) blijft niets half doorzichtig hangen. Geen punt.

## MOET

1. **s14 ± 20 s, paneel 3 'met dit mes'**: de ondertitel zegt 'sneed de bewoner brood', maar Joost hield het mes horizontaal onder het tafelblad, ver van het brood, en het brood lag op ooghoogte (de tafel was te hoog: 220 px bij een man van 330 px). Fix: `tafel` en `brood` in `s14` op aanrechthoogte (170) en dichter bij de hand, mes schuin omhoog naar het brood, met een kleine zaagbeweging na 'brood'.
2. **s15 ± 14–18 s, 'pakt daarna een schoon mes'**: Bilal hield het mes met de punt horizontaal naar Dr. Kim, op borsthoogte. Dat leest als dreigen, en in een reeks met een inbraak en een gewonde bewoner valt dat onder de reeksgrens 'geen geweld'. Fix: `hold` in `s15`, met `rot: 1.25` en het lemmet omlaag.
3. **Eindkaart (s25)**: de scheidingsregel `---` uit het script stond letterlijk in beeld, en de haak 'welke vraag zou jij als advocaat…' viel daardoor over de voetregel 'biologie bij kamiel · stem …'. Fix: `fo2/eindkaart.py` haalt `---` uit de regels (de haak komt dan onder regel 5, vrij van de voetregel).

## KAN

4. **s08 ± 17–20 s**: de chip 'denkfout van de aanklager' lag tegen de bovenrand van de kaart van Nederland. Verschoven naar het blok met de telpoppetjes (x 1420). Verwerkt, al was het geen MOET.
5. **s04 0–9 s**: in het eerste deel van de alinea staan Dr. Kim en Bilal er nog niet (die komen bij 'Dr. Kim' en 'stage'). Het beeld is wel gevuld (scherm met profiel), dus het mag zo blijven.
6. **s19 ± 12–17 s**: het label 'Joost · de bewoner · het is zijn mes' staat links buiten de as van het piekenpatroon, ver van piek 13/16 waar het bij hoort. Het is leesbaar, maar dichter bij de pieken zou het beter zijn (`s19`, `naamBij` x ± 330 → boven piek 13).
7. **s23 Recap**: de balansen 'heft · activiteit' en 'tweede spoor' hebben dezelfde kanteling (0,25). Dat klopt (beide 'iets waarschijnlijker'), maar ze hebben geen schaalnamen. Overweeg een mini-onderschrift 'iets' onder elk.
8. **s15 ± 12 s**: Dr. Kims schouder en bovenarm staan bij de handdruk wat hoog en stijf, met de arm bijna horizontaal. Dat is acceptabel. Als je de pose bijstelt, doe dat in `lib_cast.js` (engine), niet in de film.

Geen problemen gevonden met: labels in de ondertitelzone (alles boven y 880), lege beelden op t = 0, inhoud buiten het membraan (n.v.t.), lichaam/wond/bloed (geen), paletkleuren en telpoppetjes (alleen in H2). Bij Vragen uit blijft er niets van een vraag over: de 'antwoord x:'-labels worden bij het inzetten in de repo door `scripts/antwoordtekst.py` geschoond (in de standalone in hw/ zit die nog niet).

## Verwerkt (25 okt 2026)

- 1: `s14` paneel 3: tafel 170 hoog op x 1640, brood op y 568, mes `rot: -0.35` met zaagbeweging `Zg` na 'brood'. Gecontroleerd met een verse still op s14 20,8 s: het mes raakt het brood.
- 2: `s15`: Bilal houdt het mes met het lemmet omlaag (`rot: 1.25`). Gecontroleerd met een still op s15 16,0 s.
- 3: `fo2/eindkaart.py` filtert `---` weg; segments.json opnieuw gemaakt en film herbouwd. Gecontroleerd met een still op end 8 s: vijf regels, de haak staat onder regel 5 en de voetregel is vrij.
- 4: chip in `s08` naar x 1420. Gecontroleerd.
- Herbouwd met `fo2/bouw.sh`, cuecheck schoon.
- Open: KAN 6–8.
- Nog in het foutenlogboek zetten (repo, `films/logboek/fouten.jsonl`) bij het inzetten: punten 1–3.
