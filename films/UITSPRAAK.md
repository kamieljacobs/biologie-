# Uitspraaklijst (stem Roos, ElevenLabs)

Centrale lijst van uitspraken die Kamiel heeft goedgekeurd. Gebruik deze bij **elke** nieuwe of opnieuw ingesproken film, zodat een woord in alle films hetzelfde klinkt.

- `films/uitspraak.json` — vervangregels die de bouwstraat automatisch toepast op de stem-invoer (lijst van `[regex, vervanging]`, per woord; `/home/claude/hw/engine/uitspraak_subs.json` is een koppeling hiernaar). Nieuwe goedgekeurde uitspraak = regel erbij.
- Film-eigen uitzonderingen staan in `bron/uitspraak_film.json` en `bron/uitspraak.md` van de film.
- Nog niet getest = wachtlijst in `bron/uitspraak.md` van de film; getest wordt in batches via de luisterpagina *Uitspraaktest* (claude.ai-artifact, keuzes in de database, collectie `keuzes`). Na een testronde: goedgekeurde keuzes hier en in `uitspraak.json` zetten, status in de film op 'goedgekeurd'.

## Goedgekeurd (stem-invoer)

| Woord | Stem-invoer | Sinds |
|---|---|---|
| DNA | deeënaa | 12 okt |
| RNA / mRNA / tRNA | erenaa / em-erenaa; tRNA in een film steeds hetzelfde | 13 okt |
| PCR | pee cee er | 13 okt |
| template | klemtoon op laatste lettergreep | 13 okt |
| jaartallen | "het jaar 1977" (cijfers) | 13 okt |
| open voorspelvraag | "Wat denk je?" (niet "Voorspel.") | 13 okt |
| muilezel | muil-eezel | 13 okt |
| erwten | erten | |
| vetoplosbaar | korte e | |
| Y-chromosoom | ei-chromosoom | |
| oxytocine | niet eindigend op -nee | |
| Beagle | Engels | |
| gel | Engels (niet 'geld') | |
| acetyl-coA | acetyl ko aa | |
| hypothalamus | hiepo-taalamus (klemtoon op 'tha') | |
| ACTH, CRH | zoals geschreven | |
| negentig / 95 graden | neguntig / vijf en neguntig graden | |
| 5'/3'-uiteinde | vijf-accent-uiteinde / drie-accent-uiteinde | |
| ER | E-R (ook E-R-membraan) | 15 okt |
| vesikel | zeg "blaasje" | 15 okt |
| hCG | ha cee gee | 16 okt |
| EEG | E-E-G (Nederlands) | 16 okt |
| té (nadruk) | te | 16 okt |
| ACT (therapie) | Act (Engels woord) | 17 okt |
| semiconservatief | semi-conservatief | |
| Meselson en Stahl | Messelson en Staal | |
| DNA-repair-enzymen | DNA-ripair-enzymen | |
| S-fase, M-fase, DNA-polymerase, primer, Okazaki-fragmenten, reverse transcriptase | zoals geschreven | |
| plasmolyse / hemolyse | plasmolieze / heemolieze | |
| hypotonisch / hypertonisch | hiepotonisch / hiepertonisch | |
| koolstofdioxide | koolstofdie-oxide | |
| semipermeabel | semi-permeabel | |
| isotonisch, turgor, gefaciliteerde, osmotische waarde, concentratiegradiënt, natrium-kaliumpomp | zoals geschreven | |
| haploïd | haaploïd | |
| meiose, mitose, cytokinese, chromatiden, diploïd, crossing-over, non-disjunctie, trisomie, profase–telofase, centromeer, equatorvlak, spoelfiguur, chromatine, reductiedeling | zoals geschreven | |
| X-vorm | iks-vorm | |
| kinetochoor, cohesine | zoals geschreven | |
| leucine | leusine | |
| fenylalanine | klemtoon op 'fenyl' | |
| aminozuren op -ine | voluit, Nederlands (valine = valinuh) | |
| codons | met koppeltekens (C-A-U) | |
| abiotisch | zoals geschreven | |
| emergente | emergénte | |

## Uitspraaktest 18 okt 2026 (eleven_v4, 521 woorden)

Belangrijkste les: **eleven_v4 spreekt de gewone spelling meestal goed uit.** Respellings maken het vaak slechter. Kamiel koos bij bijna alle twijfelwoorden de gewone spelling. Gebruik bij v4 dus de gewone spelling, behalve waar hieronder iets anders staat. Uitgangen op *-ine* gewoon als *-ine* schrijven (niet *-inuh*): adenosine, auxine, dopamine, histamine, kisspeptine, leptine, melatonine, niacine, rodopsine, serotonine, creatine. Let op: dit geldt voor v4; de DNA-films (eleven_v3) hielden *valinuh* e.d.

Gekozen (stem-invoer = gewone spelling): adenosine, aids, amygdala, auxine, basilair, Bohr-effect, chiazaad, chlamydia, circadiaans, creatine, dialyse, diastole, systole, dopamine, Eustachius, fagocyten, floëem, Graves, histamine, Iter (ITER), Jones, kisspeptine, lysozym, melatonine, MHC-eiwitten, niacine, peritoneale, plaque, resusfactor, rodopsine, soa's, thorium, xyleem.

Gekozen met letters/koppeltekens: H-plus (H⁺), H-P-A-as, I-V-F, Q-R-S-complex, REM-slaap (hoofdletters), B-twaalf (vitamine B12), "negen en neguntig".

Zoals het al in de film klonk (goed): o.a. Thorizon, ITER-varianten niet nodig, Hoeksche Waard, hysterese, PFAS, CO₂, pcb's, Qatar, GLUT4 en 432 gewone woorden.

Ronde 2 (19 okt 2026), gekozen stem-invoer:
| Woord | Stem-invoer |
|---|---|
| A4'tjes | aa-víertjes |
| ADI | ADI (gewoon) |
| AGS | AGS (gewoon) |
| bloedgroep AB | A B (met spatie) |
| EPO | Epo |
| gelelektroforese (v3) | gel-elektroforese |
| GGD | GGD (gewoon) |
| IgE | IgE (gewoon) |
| in-vitrofertilisatie | in vitro fertilisatie |
| klonale, leptine, serotonine | gewoon |
| mRNA-vaccin | mRNA-vaccin (gewoon) |
| Niger | Nieger |
| operator (v3) | operaator |
| poetsvissen | gewoon (zoals in de film) |
| RNA (los woord) | er-en-aa |
| transcriptiefactor | transcriptsie-factor |

Ronde 4 (19 okt 2026): **E. coli** (eleven_v3) → stem-invoer "E. kóólie" (nadruk op kóólie); **gibberelline** → "giebereliene". Hiermee zijn alle woorden uit de test van 18 okt vastgelegd.

Let op: "E. coli" bestaat uit twee tokens; vervang in de tekst zelf "E. coli" door "E. kóólie" (geen regel in uitspraak.json).
