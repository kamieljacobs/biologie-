# Lessen · recepten DNA-reeks (basevorm)

Registratie volgens prompt v10 C10.1 stap 5. Gekeurd door Kamiel op 25 okt 2026 (remake DNA 1, twijfelscènes t2 en t3: 'de ringvorm wordt de basevorm van de hele DNA-reeks'). Stills: `films/dna/1-wat-is-dna/bron/remake-2026-10/keyframes/` (t3, k2, k3, k5). Testvel: `testvel.html#dna`.

| Object | Status | Aanroep | Standen | Bron |
|---|---|---|---|---|
| Base (ringvorm) | gekeurd 25 okt 2026 | `baseRing(ctx, x, y, b, dir, {s, a, rot, rand, bindA, plekA})` | b = A/T/C/G; dir +1 omlaag / −1 omhoog; (x, y) = aanhechting aan de suiker; lengte purine 112·s, pyrimidine 72·s, breedte 52·s; `plekA` toont de bindingsplekken, `bindA` > 0,5 = goud (verbonden); `rand` = focusrand | OpenStax Biology 2e § 14.2; NPTEL Mol. Cell Biology lec 26 |
| Waterstofbruggen | gekeurd | `baseBruggen(ctx, x, y1, y2, b, s, a)` | 2 bij A–T, 3 bij C–G, goud gestippeld tussen de paarranden | idem |
| Nucleotide | gekeurd | `nucleotideRing(ctx, x, y, b, {s, explode, nummers, hl, dir, plekA})` → `{p, su, b, c3, c5}` | `explode` 0..1 = fosfaat, suiker, base uit elkaar; `nummers` = 1'–5'; `hl` = "5'" of "3'" goud | Lodish 8e § 5.1 |
| Ladder ↔ helix | gekeurd | `dnaLadderHelix(ctx, x0, y, dx, seq, {draai, R, s, sep, hl, bruggenA, plekA, fase, toonBasen, a})` → `{klein(m), groot(m), top}` | `draai` 0 = ladder, 1 = rechtsdraaiende helix, 10 bp per winding, groeven ongelijk (tweede streng 140°); `sep` 0..1 = strengen los; `fase` = meedraaien | OpenStax Biology 2e § 14.2 |

Kleuren (`DNA_BASE`): A #C9BEEB · T #9F90D4 · C #6C5BA8 · G #4F3F86 (de bestaande paarse reekstinten), ruggengraat #3E3366 / #8C7BBF, bruggen goud.

## Lessen
- Een sport = purine + pyrimidine: kies de afstand tussen de ruggen als `(112 + 72) · s + 16 · s + speling`, dan klopt de breedte overal (`dnaLadderHelix` rekent de schaal zelf uit R).
- In de helix (draai > 0,5) worden de basen staafjes in dezelfde tinten: de ringen zijn bij die verkorting niet meer leesbaar.
- Bindingsplekken zijn een model (geen echte atoomposities): zet 'model' of 'vereenvoudigd' in beeld.
- Basen voor RNA (U, teal) zitten er nog niet in; voeg die toe in dezelfde vorm (U = pyrimidine) als DNA 3 ze nodig heeft.
