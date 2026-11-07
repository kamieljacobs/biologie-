# Logboek beeldkeuzes (Kamiel 27 okt 2026: 'we moeten patronen leren herkennen over wat goede animaties zijn')

Eén regel per object per verbeterronde in `keuzes.jsonl`:
```
{"datum": "2026-10-27", "ronde": "beeldbank-1", "groep": "cel-nieuw", "obj": "celDier",
 "opties": {"oud": {kenmerken}, "A": {...}, "B": {...}, "C": {...}},     // kenmerken: zie hieronder
 "blind": {"winnaar": "A", "marge": "duidelijk|nipt", "scores": {"A": 21, "B": 17, "oud": 12}, "zwak": {"A": "..."}},
 "kamiel": {"keuze": "A", "reden": "...", "opmerking": "..."}}
```
Kenmerken (één waarde per as): detail weinig|midden|veel · vorm schematisch|semi|realistisch · vulling vlak|verloop|arcering ·
contour geen|dun|dik · kleur gedempt|accent|verzadigd · diepte plat|schaduw|doorsnede-3d · textuur geen|rustig|druk ·
context los|in-omgeving|met-schaal · beweging geen|idle|standen|proces · opbouw in-een-keer|in-stappen ·
referentie geen|elevenlabs|bron · plus vrij veld `vondst`.

Patronen: `python3 scripts/beeldpatronen.py` → `bibliotheek/BEELDPATRONEN.md`. Een kenmerkwaarde is een patroon als hij
in ≥ 3 vergelijkingen in ≥ 2 groepen zit (alleen vergelijkingen waarin de opties op die as verschillen) en ≥ 65 % wint
of ≤ 35 % (dan: vermijden). Kamiels keuze weegt zwaarder dan de blinde beoordelaar; waar die twee het oneens zijn,
staat dat apart (de beoordelaar moet dan bijgesteld worden). Draai na elke keuringsronde; een vast patroon gaat naar
`films/BEELDAFSPRAKEN.md` en bij de volgende promptversie naar Part C.
