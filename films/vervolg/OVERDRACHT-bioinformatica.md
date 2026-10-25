# Overdracht — Wat word jij? · Bio-informatica (gestart 25 okt 2026)

Stand: planning goedgekeurd door Kamiel (25 okt 2026), scripts in de maak. Wordt bijgewerkt na elke stap. Reeksbrief: `REEKS-bioinformatica.md`.

## Planning (akkoord Kamiel 25 okt 2026)
1. **Zoeken in DNA: databanken, BLAST en een beetje Python** — ongewijzigd: de kern van het vak, staat nergens anders. Brug naar *De genetische code lezen*: daar met de hand, hier laat je de computer het doen. Code in beeld, niet voorgelezen.
2. **Een miljoen varianten: welke maakt ziek?** — GWAS en risicoscores samen in één hoofdstuk; nieuw hoofdstuk 'variant met onbekende betekenis' (het eerlijke deel van het werk, nog nergens op de site). Casus: een kind met een zeldzame ziekte (exoomdiagnostiek, Radboudumc dicht bij huis).
3. **Stambomen uit DNA: een uitbraak volgen** (was: '…evolutie berekenen') — opnieuw gecentreerd, want *Hoe weten we dat?* (Evolutie 7) doet al verschillen tellen en de moleculaire klok, *Stambomen lezen* (Evolutie 8) het aflezen. Nieuw: zelf een boom bouwen uit een verschillentabel, hoe zeker is de boom, wie besmette wie. Verwijzingen naar de archieffilms vervangen door Evolutie 7 en 8.
4. **Van letters naar vorm: eiwitstructuur voorspellen** (AlphaFold) — nieuw, Kamiel: 'alphafold is wel cool'; nu meebouwen.
5. *Toeval of echt?* — gedeeld met Biomedisch, al af.

## Werkwijze
Zoals Forensisch: per film 3 scriptvarianten (A klassiek, B kleine mutatie, C grote mutatie) + `getallen.md` met bronnen → blinde beoordelaar (ander model) → combineren tot `script_v1.md` → frisse feitenreview → `script_v2.md` → storyboard, alleen twijfelscènes naar Kamiel (één blad voor de reeks) → inspreken (Roos, eleven_v4) → bouwen → frisse beeldreview → repo. Werkmap `/home/claude/hw/bi1..bi4` (buiten de repo; tussenstanden van scripts gaan als `werk/` mee in de bronmap).

## Stand (25 okt 2026, middag)
| Film | Winnaar (blind) | Stap |
|---|---|---|
| 1 Zoeken in DNA | A klassiek (sushi 'blauwvintonijn' blijkt geelvin), 46–42–39 | script_v2 na frisse review (6 `!` gecorrigeerd: BLAST-woordjes 28 i.p.v. 11, insuline-mRNA zonder introns, geen T→U, toevalsgetal = verwacht aantal); bouw fase A |
| 2 Welke variant maakt ziek? | A klassiek + ouderstemmen uit B, 48–46–42 (C viel af: raadsel met ziek kind) | script_v2 na frisse review (4 `!`: titel 'een miljoen' → voorstel 'Miljoenen varianten', 1 op 10 i.p.v. 1 op 50, de novo in zaadcel/eicel, VUS-zin los van het meisje); Sam niet bij uitslaggesprek; bouw fase A |
| 3 Een uitbraak volgen | A klassiek (Brabantse zorgmedewerkers 2020, Sikkema e.a.), 44–41–40 | frisse review klaar (3 `!`: richting, vraag 1, aantallen per ziekenhuis); script_v2 in de maak |
| 4 Eiwitstructuur voorspellen | C grote mutatie (verzegelde envelop, CASP-proef), 43–42–41 | script_v2 na frisse review (2 `!`: cryo-EM 'sinds 10 jaar scherp', AlphaFold 3 en binding); bouw fase A |

Werkbestanden staan nog in `/home/claude/hw/bi1..bi4` (sessie); ze gaan als `bron/werk/` mee in de bronmap zodra de film in de repo komt. Keuringsblad twijfelscènes: volgt na fase A (sjabloon = het Forensisch-blad https://claude.ai/artifact/NeETTynseM4HSocZMHoqW3).

## Open
- Rol van Sam (meeloopweek bio-informatica) en Dr. Kim: ter keuring bij de twijfelscènes.
- Filmmedaillons: later, na de bouw.
