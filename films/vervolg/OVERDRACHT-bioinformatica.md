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

## Stand (25 okt 2026, eind middag): wacht op Kamiels keuring van de twijfelscènes
Alle vier: script_v2 (definitief) na blind oordeel en frisse bronnenreview, bouw fase A klaar (scènes op voorlopige woordtijden, storyboard, keyframes). Nog niets ingesproken.

| Film | Winnaar (blind) | Alinea's · vragen · woorden | Twijfelscènes op het blad |
|---|---|---|---|
| 1 Zoeken in DNA | A klassiek (sushi 'blauwvintonijn' blijkt geelvin) | 27 · 5 · 944 | 9 (o.a. Sam of Daan, reeksobject codescherm, 2 `!`) |
| 2 Welke variant maakt ziek? | A klassiek + ouderstemmen uit B | 20 · 5 · 915 | 12 (+ alternatief: geen ouders in beeld; o.a. titel 'Miljoenen varianten', 3 `!`) |
| 3 Een uitbraak volgen | A klassiek (Brabantse zorgmedewerkers 2020) | 29 · 5 · 956 | 11 (o.a. verpleegkundige en patiënt, coronavirus-tekening, 3 `!`) |
| 4 Eiwitstructuur voorspellen | C grote mutatie (verzegelde envelop) | 16 · 4 · 941 | 7 (o.a. eiwitmodel, collega in het lab, 2 `!`) |

**Keuringsblad:** https://claude.ai/artifact/M7GDAcfnuHfbcPgV4GNoXp (dit account; db-collectie `keuring`, doc-id = `b<film><scène>`). Lees de keuring terug, verwerk, dan inspreken.

**Tussenstand van de werkmappen** (tekstbestanden, geen beeld/audio): `films/vervolg/werk-bioinformatica/` (zie LEESMIJ daar). Verdwijnt zodra de films met bronmap in de repo staan.

## Na de keuring (te doen)
- Reeksobject 'scherm met code / sequenties': de eigen versies in film 2, 3 en 4 vervangen door het blok bovenaan `bi1/teken_bi1.js`.
- Film 2 `endHaak` gaat nu over een bacterie; film 3 gaat over een virus → aanpassen.
- Sam/Daan in alle vier gelijk zetten (cast-id en tekst) vóór het inspreken; daarna ROLLEN.md en LEVENSLOOP.md.
- Film 1 komt op ± 7,5 min (iets boven de richtwaarde).

## Open
- Rol van de meeloper: Sam is sinds 25 okt (ander account) stagiair in Biotechnologie; voorstel op het blad: Daan (speelt al in *Toeval of echt?*).
- Filmmedaillons: later, na de bouw.
