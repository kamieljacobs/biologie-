# Uitspraaklijst (stem Roos, ElevenLabs)

Centrale lijst van uitspraken die Kamiel heeft goedgekeurd. Gebruik deze bij **elke** nieuwe of opnieuw ingesproken film, zodat een woord in alle films hetzelfde klinkt.

- `films/uitspraak.json` — vervangregels die de bouwstraat automatisch toepast op de stem-invoer (lijst van `[regex, vervanging]`, per woord; `/home/claude/hw/engine/uitspraak_subs.json` is een koppeling hiernaar). Nieuwe goedgekeurde uitspraak = regel erbij.
- Film-eigen uitzonderingen staan in `bron/uitspraak_film.json` en `bron/uitspraak.md` van de film.
- Nog niet getest = wachtlijst in `bron/uitspraak.md` van de film; getest wordt in batches via de luisterpagina *Uitspraaktest* (claude.ai-artifact, keuzes in de database, collectie `keuzes`). Na een testronde: goedgekeurde keuzes hier en in `uitspraak.json` zetten, status in de film op 'goedgekeurd'.

- **Fout op één plek = overal testen** (Kamiel 24 okt 2026): klinkt een woord ergens verkeerd, zoek dan dezelfde woorden (ook verbogen en in samenstellingen) in de andere alinea's en films op, test ze daar ook, en zet de goedgekeurde stem-invoer daarna in deze lijst, in `uitspraak.json` én in de uitspraaklijst van de prompt (`films/PROMPT_v10.md`, deel B5).

## Goedgekeurd (stem-invoer)

| Woord | Stem-invoer | Sinds |
|---|---|---|
| DNA | DNA (gewone spelling, eleven_v4); 'deeënaa' gaf in Chromosomen de klemtoon verkeerd (uitspraaktest 24 okt). Oude film-eigen regels met 'deeënaa': bij herinspreken weghalen | 24 okt |
| RNA / mRNA / tRNA | erenaa / em-erenaa; tRNA in een film steeds hetzelfde | 13 okt |
| PCR | pee cee er | 13 okt |
| template | klemtoon op laatste lettergreep | 13 okt |
| jaartallen | "het jaar 1977" (cijfers) | 13 okt |
| open voorspelvraag | "Wat denk je?" (niet "Voorspel.") | 13 okt |
| muilezel | muil-eezel | 13 okt |
| erwt, erwten, erwtenbloem, erwtenplant (alle samenstellingen) | ert, erten, ertenbloem … (regel `^([Ee])rwt` in uitspraak.json, 28 okt 2026) | |
| vetoplosbaar | korte e | |
| Y-chromosoom | ei-chromosoom | |
| oxytocine | niet eindigend op -nee | |
| Beagle | Engels | |
| gel | Engels (niet 'geld') | |
| pH | P-H ("pee-haa" werd verkeerd uitgesproken) | 21 okt |
| wc | klemtoon op de tweede lettergreep (we-CÉÉ); "wee-cee" legde de klemtoon verkeerd, nog geen goedgekeurde invoer: op de wachtlijst | 22 okt |
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
| haploïd | haaploïd (bevestigd in de uitspraaktest van 24 okt; de gewone spelling gaf een korte a) | 24 okt |
| meiose, mitose, cytokinese, chromatiden, diploïd, crossing-over, non-disjunctie, trisomie, profase–telofase, centromeer, equatorvlak, spoelfiguur, chromatine, reductiedeling | zoals geschreven | |
| X-vorm | iks-vorm | |
| kinetochoor, cohesine | zoals geschreven | |
| leucine | leusine | |
| fenylalanine | klemtoon op 'fenyl' | |
| aminozuren op -ine | voluit, Nederlands (valine = valinuh) | |
| codons | met koppeltekens (C-A-U) | |
| abiotisch | zoals geschreven | |
| B (antwoordletter) | bé (Nederlandse B; "bee" klonk Engels) — staat in uitspraak.json; oudere films met "bee" in de stem-invoer: zie WACHTLIJST.md | 21 okt |
| emergente | zoals geschreven (25 okt; emergénte en ee-mer-gente afgewezen) | 25 okt |
| ethyleen, generatief, vegetatief, ledlampen, kilowattuur, larven, huidmondjes, zeefvaten, Westland | zoals geschreven (getest in Meer oogst) | 24 okt |
| rubisco | ru-biss-koo (korte i van vis; beste van 5 rondes, nog niet perfect: het model rekt de i soms) | 24 okt |

## Uitspraaktest 25 okt 2026 (alle open woorden, eleven_v4, Roos)

Ronde 1: alle 1138 open woorden van de wachtlijsten beluisterd met fragmenten uit de films zelf (luisterpagina https://claude.ai/artifact/JtqGqUPHcuA7Nf5yt1uPzC): 1116 goed zoals ingesproken, 16 fout, 6 twijfel. Ronde 2: per woord drie varianten (https://claude.ai/artifact/JrqYMWNtNuTZBNGi2eW44T, flow https://elevenlabs.io/app/flows/2wNTSsOrqsvWJuv4N9lv). Kamiel koos:

| Woord | Stem-invoer | Afgewezen |
|---|---|---|
| ADH | ADH (gewoon) | aa-dee-haa, A-D-H |
| AI-model | AI-model (gewoon) | aa-ie-model, aa-ie-mo-DEL, A-I-model |
| Charles Darwin | Charles Darwin (gewoon) | Tsjarls Darwin, Tsjaarlz Daarwin |
| collageen in een samenstelling | los: 'collageen draden' (echte Nederlandse g; aan elkaar werd het zj) | collageendraden, kollaazjeen-draden, kol-la-ZJEEN-draden, kolla-geen-draden, kollaageen-draden |
| DSD | DSD (gewoon) | dee-es-dee, D-S-D |
| emergente | emergente (gewoon) | ee-mer-gente, emergénte, emmer-gente |
| HAN (hogeschool) | Han (als één woord, niet H-A-N) | Haa-Aa-En |
| knock-outmuis | knock-outmuis (gewoon) | knok-outmuis, nok-aut-muis |
| RNA-polymerase | RNA-polymerase (gewoon) | erenaa-polymerase |
| uv-straling | UV-straling | uu-vee-straling (klemtoon fout) |
| vitamine B6 | vitamine B6 (gewoon) | vitamine bee-zes, vitamine bee-ZES |
| Sams (Nederlandse Sam) | nog geen goede variant (Sams, Sàms, Samms afgewezen) | |
| toa | nog geen goede variant (toa, too-waa, T-O-A afgewezen) | |

Wisselvallig (zelfde invoer, één take goed en één fout; alleen die alinea opnieuw): biosfeerintegriteit, fMRI, Jones, trombocyten.

Ronde 4 (na het naluisteren van de heropnames; https://claude.ai/artifact/YGbgi2CLUZ3gGjYo2yQFAt): **ALAT** → ALAT (gewoon; aa-lat bleef fout gaan), **PCR** → PCR (gewoon; pee-cee-er bleef fout gaan), **tyfoon** → tiefoon (regel in uitspraak.json), **Sam** → Sam (gewoon; de take was pech). Toa is uit de zin gehaald (leraar 2 s14).

Les (derde keer bevestigd): bij eleven_v4 is de gewone spelling bijna altijd het best; respellings als dee-es-dee, uu-vee of aa-ie maakten het juist fout. Uitzondering: een samenstelling met een leenwoord (collageen) kan beter los geschreven worden.

## Uitspraaktest 24 okt 2026 (eleven_v4, Roos; Chromosomen + Signalen in de cel)

Elk woord in drie schrijfwijzen, telkens in dezelfde zinnen uit verschillende films (luisterpagina https://claude.ai/artifact/8DaVBEuT7h7RqTC6KP6G1Y, collectie `keuzes`; ElevenLabs-flow https://elevenlabs.io/app/flows/Cqevc9qwDE1pCj7ltE6c). Kamiel koos:

| Woord | Stem-invoer | Afgewezen |
|---|---|---|
| zesenveertig | zesenveertig (gewoon) | zes-en-veertig, zes en veertig |
| haploïd | haaploïd | haploïd, haa-ploo-ied |
| DNA | DNA (gewoon) | deeënaa, dee-en-aa |
| ATP | ATP (gewoon) | aa-tee-pee, A-T-P |
| Post voor iedereen (filmtitel) | Post voor iedereen (gewoon) | post voor iedereen, Post-voor-iedereen |
| allel / allelen | allel (gewoon) | allél, al-lel |
| genotype / genotypen | genotype (gewoon) | genotíepe, geno-tiepe |

Les (opnieuw): bij eleven_v4 wint de gewone spelling bijna altijd; de fouten in de review zaten in oudere opnames (ander model) of in respellings. Een respelling alleen nog als de gewone spelling in een test aantoonbaar fout gaat.

## Uitspraaktest 18 okt 2026 (eleven_v4, 521 woorden)

Belangrijkste les: **eleven_v4 spreekt de gewone spelling meestal goed uit.** Respellings maken het vaak slechter. Kamiel koos bij bijna alle twijfelwoorden de gewone spelling. Gebruik bij v4 dus de gewone spelling, behalve waar hieronder iets anders staat. Uitgangen op *-ine* gewoon als *-ine* schrijven (niet *-inuh*): adenosine, auxine, dopamine, histamine, kisspeptine, leptine, melatonine, niacine, rodopsine, serotonine, creatine. Let op: dit geldt voor v4; de DNA-films (eleven_v3) hielden *valinuh* e.d.

Gekozen (stem-invoer = gewone spelling): adenosine, aids, amygdala, auxine, basilair, Bohr-effect, chiazaad, chlamydia, circadiaans, creatine, dialyse, diastole, systole, dopamine, Eustachius, fagocyten, floëem, Graves, histamine, Iter (ITER), Jones, kisspeptine, lysozym, melatonine, MHC-eiwitten, niacine, peritoneale, plaque, resusfactor, rodopsine, soa's, thorium, xyleem.

Gekozen met letters/koppeltekens: H-plus (H⁺), H-P-A-as, I-V-F, Q-R-S-complex, REM-slaap (hoofdletters), B-twaalf (vitamine B12), "negen en neguntig".

Zoals het al in de film klonk (goed): o.a. Thorizon, ITER-varianten niet nodig, Hoeksche Waard, hysterese, PFAS, CO₂, pcb's, Qatar, GLUT4 en 432 gewone woorden.

Ronde 2 (19 okt 2026), gekozen stem-invoer:
| Woord | Stem-invoer |
|---|---|
| A4'tjes | aa-víertjes |
| ADI | A-D-I (losse letters; "ADI" en "aa-dee-ie" gaven een dubbele AA, 22 okt 2026) |
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


## Uitspraaktest erfelijkheid (28 okt 2026, eleven_v4, Roos)

Luisterpagina https://claude.ai/artifact/K3YNurbu7mGVzPFfqt33Ra (collectie `keuzes`), flow https://elevenlabs.io/app/flows/aErfIyThMXUDp4fcy7At. Aanleiding: 'allel' klonk fout in de oude erfelijkheidsfilms 2–6 (oud model) en één keer in Chromosomen 2.1. Kamiel koos:

| Woord | Stem-invoer | Afgewezen |
|---|---|---|
| allel | allel (gewoon) | al-LEL, allèl, a-lel |
| allelen | allelen (gewoon) | al-LEE-len, alleelen |
| gameet / gameten | ga-MEET / ga-MEE-ten | gameet/gameten (klonk Engels), gaméét/gaméten |
| Iᴬ, Iᴮ, i (bloedgroep) | I-A, I-B, i (dus IᴬIᴮ = 'I-A I-B', Iᴬi = 'I-A i', ii = 'i i') | ie-aa ie-bee / kleine ie; grote I A / kleine i |

Les: bij eleven_v4 is 'allel' met de gewone spelling goed; een losse misser in één take = die alinea opnieuw (één take), geen respelling.
