# Overdracht — Wat word jij? · Ecologie en natuurbeheer (gestart 25 okt 2026)

Stand: alle drie de films op de site (25 okt 2026, avond), met bronmap, prompt v10, status 'nog bekijken'.

## Planning (akkoord Kamiel 25 okt 2026)
1. **Tellen in het veld: hoe ecologen populaties meten** — houden. Vangst-terugvangst, transecten met vrijwilligers, cameravallen en eDNA/DNA uit poep, van telling naar trend.
2. **Stikstof: hoe een voedingsstof een probleem werd** — houden, zwaartepunt naar het werk: depositie meten en rekenen, kritische depositiewaarde, van data naar besluit. Gedeeld met Milieukunde (id `stikstof`).
3. **Een plan voor de natuur: van doel tot herstel** — nieuw, samengevoegd uit *Natuur beheren* en *Waarom soorten verdwijnen* (overlap met *Alles gaat rond*, *Ingrijpen of laten gaan?*, *Binnen de grenzen* en *Evolutie 5*). Id `natuurplan`.

Cast: Daan stagiair, nieuwe begeleider Ecoloog (werknaam Bas) eerst als voorstel op het twijfelblad.

## Werkwijze
Zoals Forensisch en Bio-informatica: per film `getallen.md` met bronnen + 3 scriptvarianten (A klassiek, B kleine mutatie, C grote mutatie) → blinde beoordelaar → `script_v1.md` → frisse feitenreview → `script_v2.md` → storyboard, alleen twijfelscènes naar Kamiel (één blad voor de reeks) → inspreken (Roos, eleven_v4) → bouwen → frisse beeldreview → repo. Werkmap `/home/claude/hw/ec1..ec3` (buiten de repo; tussenstanden van scripts gaan als `werk/` mee in de bronmap).

Werk in het andere account niet tegelijk aan deze reeks.

## Stand (25 okt 2026, avond): wacht op keuring
| Film | Winnaar (blind) | Alinea's · vragen · woorden | Twijfelscènes |
|---|---|---|---|
| 1 Tellen in het veld | A klassiek (45–44–41, nipt; na combineren herbeoordeeld: 51–44) | 18 · 5 · 929 | 5 + castvoorstel |
| 2 Stikstof | A klassiek (51–50–48, nipt; na combineren herbeoordeeld: 54–47) | 22 · 6 · 950 | 7 |
| 3 Een plan voor de natuur | A klassiek (45–41–40) | 22 · 5 · 941 | 4 |

**Keuringsblad:** https://claude.ai/artifact/PaPdt1ZDCPYqdsA9P2AKMJ (dit account; db-collectie `keuring`, doc-id `c0bas` voor de cast, `e<film><scène>` voor scènes). Lees terug, verwerk, dan inspreken.

Zelf besloten (niet op het blad): wolf uit de goedgekeurde dierenbibliotheek (`bibliotheek/dieren/lib_dieren.js`) in plaats van de eigen tekening in film 1; koolmees uit dezelfde bibliotheek bij het ei in film 2; geen geschatte foutstreepjes in film 3; cold open film 3 'kijkt in een diepe kuil'; fout in `nederland()` (stippen) hersteld in `ec_reeks.js`.
Reekszin opleidingen: `werk-ecologie/REEKSZIN.md`. Gedeelde reeksbibliotheek: `werk-ecologie/ec_reeks.js` (gaat bij de bouw in elke bronmap).

## Keuring Kamiel (25 okt 2026, 20:45)
- Castvoorstel **Ecoloog Bas** en Daans outfit `veld` goedgekeurd (gaan bij de bouw in `personages/lib_cast.js`, ROLLEN.md, LEVENSLOOP.md).
- Film 1: alle twijfelscènes ✓.
- Film 2: boerderij blijft herkenbaar in beeld ('ze zijn nu eenmaal een bron van stikstof; of je het erg vindt dat soorten verdwijnen is een mening') → geen oordeel over soortverlies in beeld. Vraag 'is er een bufferzone rond heide?' → zin toegevoegd in s09 (geen vaste bufferzone; kabinetsplan zones van 500 m; nog een plan), bronnen in bronnen.md. Tormentil/braam: mag mooier. Rest ✓; s06 zonder reactie, voorstel geldt.
- Film 3: kleuren van de gebiedskaart passen niet bij de stijl → `gebiedKaart` hertekend in Schema-stijl (referentie `waalKaart`, Binnen de grenzen). Struikhei: Kamiel vond hem mooi, zo gelaten. Loopkevers ✓.
- Fase B (inspreken, bouwen) loopt; brief `werk-ecologie/HELPER-faseB.md`.

## Op de site (25 okt 2026, avond)
| Film | Bestand | Duur | Credits | Flow |
|---|---|---|---|---|
| 1 Tellen in het veld | `ecologie-1-tellen-in-het-veld.html` | 7:34 | 5.382 | e8Mni38AC96bGuExt92C |
| 2 Stikstof (ook Milieukunde) | `ecologie-2-stikstof.html` | ± 7,5 min | 6.086 | Z8eC6JKsLXK1fKRIjFG1 |
| 3 Een plan voor de natuur | `ecologie-3-een-plan-voor-de-natuur.html` | 7:49 | 5.513 | PkKdqCfaQlEfrioXJnPS |

Elke bronmap: script v2, varianten en blind oordeel in `bron/werk/`, getallen.md, bronnen.md, storyboard, reviews (feiten, beeld), bouwscript `bron/bouw.sh`, gedeelde reeksbibliotheek `bron/src/ec_reeks.js`. Ecoloog Bas en Daans outfit `veld` staan in `personages/lib_cast.js`, ROLLEN.md, LEVENSLOOP.md en het castboek. De tussenstand `werk-ecologie/` is opgeruimd.

## Open
- **Filmmedaillons:** nog niet gemaakt (vallen terug op de lijntekening in `FILMKUNST`).
- **Uitspraak:** wachtlijsten in `bron/uitspraak.md` (o.a. Reijerscamp → 'Reijerskamp', RIVM als er-ie-vee-em); nog niet beluisterd.
- **Steekproef** van de bronnenlogboeken nog niet gedaan. Film 2 s09 (± 3000 veehouderijen binnen 500 m) rust op één RIVM-publicatie, toegeschreven (≈).
- **Dierenbibliotheek in de FILMDATA-engine:** niet heel plakken (botst met `circ`, `_mix`, `pijl`, `muis`); film 1 knipt de wolf eruit (`bron/src/lib_wolf.sh`), film 2 koe en koolmees (`bron/src/dieren_ec2.sh`). Naden bij schouder en heup van de bibliotheekwolf zichtbaar in het grijze camerabeeld (punt voor de bibliotheek).
- **Player:** `drawEnd` past de opmaak aan bij een eindkaart van meer dan 5 regels (film 3); andere films ongewijzigd.
- KAN-punten die bewust open bleven staan in `bron/reviews/review_beeld.md` per film.
