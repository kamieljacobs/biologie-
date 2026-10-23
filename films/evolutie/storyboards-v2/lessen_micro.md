# Lessen tekenronde 2 · Micro (23 okt 2026)

Bestand: `src/micro_evo.js` (na teken_evo1..8 laden). Testvel: `src/tv_micro.js` (`TV_micro`: groot, cellen, dna, virus, chrom, bloed, zoom).
Oud: `out/teken_evo1,…,teken_evo8,tv_micro/` · nieuw: `out/teken_evo1,…,teken_evo8,micro_evo,tv_micro/`. Ook keyframes nagekeken: e4s03, e4s04, e4s12, e4s14, e4s16, e4s17, e1s16, e5s38, e6s07.

## Algemeen (voor de volgende prompt)
- **Valkuil in de bibliotheek:** `lib_cast.js` definieert `_mix` opnieuw en geeft dan `rgb(...)` terug. Daardoor zijn `_lt`/`_dk` (base.js) geen hex meer, en `rgba(_lt(x), a)` of `rgba(lighten(x), a)` wordt **zwart**. Gebruik `_mixHex` (hex) of eigen `_mvL`/`_mvD`. Dit gaf eerst zwarte stippen en lijnen in de bacterie.
- Bouw elke vorm uit een **profiel** (straal per positie langs de as) in plaats van roundRect: dan volgen wand, membraan, insnoering (deling, centromeer) en kromming vanzelf, en elke binnenlaag is dezelfde functie met een kleinere straal.
- **Echte lagen tellen** maakt het verschil tussen schema en 'echt': gramnegatief = buitenmembraan + wand, spleet, celmembraan; virus = envelop (dubbellaag) + M1-laag + RNP's; eicel = zona, spleet met poollichaampje, cel.
- **Eén herbruikbare draadfunctie** (`dnaDraad`) voor alle DNA: touw met rand + onderbroken donkere kern onder 6 px, echte dubbele helix (twee strengen voor/achter, ongelijke groeven, sporten) vanaf 6 px. Daarmee zien nucleoïde, plasmide en losse DNA-stukken er overal hetzelfde uit.
- Detail = **echte structuur op de juiste schaal**, niet versiering: fimbriae, polysomen, M1-stippen, G-banden, HbS-vezels. Bij kleine maten (kolonie 58 px) weglaten.
- Kloonbeelden vermijden zonder de aanroep te veranderen: draai of varieer op `hash(x, y)` (griepvirus).

## Per object
**bacterie (E. coli).** Opgezocht: K-12 2,6–4,0 × 0,68–1,04 µm (BioNumbers 104113); flagel 5–10 µm, spoed 2–2,5 µm (BioNumbers 100095); 4–6 flagellen, peritrich, gebundeld bij zwemmen; fimbriae honderden, kort; ribosomen tienduizenden. Verschil: breedte 0,28 × lengte (was 0,4: te dik, 'pil'); dubbele rand met donkere periplasmaspleet; lichte buiging per seed; ribosomen dicht maar klein en gedempt (eerst te druk: alpha 0,55 → 0,42, straal 0,03 → 0,024 r); polysomen; fimbriae als fijne haartjes loodrecht op de wand; plasmiden naar de polen zodat ze de nucleoïde niet raken. Flagellen: drie pogingen. (1) vanaf de wand recht naar de bundel → lussen dwars over de cel; (2) langs het lijf → 'vogelkooi' met hoeken; (3) werkte: oorsprong alleen in de achterste helft, korte haak naar buiten, ruime boog op 1,2–1,35 r, bundel begint 0,2 L achter de pool en de strengen hebben elk een eigen fase → gevlochten bundel. Lengte standaard 1,25 × cel (`o.flagel`), echt is 2,5–5×.
**nucleoide / dnaDraad.** Opgezocht: één ringchromosoom, ±400 superspiraal-domeinen van 10–20 kb (BioNumbers 103792). Verschil: één gesloten draad met lussen (rozet) in plaats van een losse krul; eerste versie was een regelmatige 'bloem' → onregelmatig gemaakt (hoek ±0,3 slot, lengte 0,38–0,93, kromming, schuine as, 1–3 kruisingen per lus = plectoneem, kernpunten op wisselende straal). Dikte len/110 (was len/130), in de cel geen helix (te druk), wel bij losse DNA-stukken en grote plasmiden.
**plasmideRing.** Golvende ring (niet perfect rond), dubbelstrengs; gen als oker stuk van dezelfde draad, iets dikker. Vanaf r ≈ 30 px is de helix zichtbaar: mooi in e4s16.
**pilus.** Buis van twee lichte lijnen met donkere binnenkant en schuine streepjes (pilinehelix). Ring onderweg is een vereenvoudiging (echt gaat één streng over); niet zeggen dat er een 'ring door de buis schuift' als feit.
**antibioticum.** Penicillinekern: vierring deelt de N–C-zijde met de vijfring, C=O aan de vierring, zijketen met ring, COOH, zwavel als okerstip. Verschil: gedeelde zijde (was twee losse vormen naast elkaar) en de zijgroepen; zonder atomen (Part C).
**griepVirus.** Opgezocht: 80–120 nm, HA (staafje met kop) en NA (steeltje met vierkante kop, in groepjes, ±1 op 7), M1-laag, 8 RNP's in 7+1 (Harris 2006 PNAS; Noda 2006 Nature). Verschil: twee soorten uitsteeksels, dubbellaag, RNP-bundel aan één pool (staafjes lopen naar de pool samen, ongelijke lengtes; gelijke lengtes leken een 'orgel').
**chromosoom1 / chromosoomPaar / chromosoom.** Verschil: profielvorm met ronde uiteinden, zachte centromeer-insnoering (60 %) en licht golvende rand; G-banden van ongelijke breedte, licht gebogen (rondheid); gen als band ín het chromosoom (was een los kader eromheen); goud kader alleen bij `nieuw`. Bandhoogte schaalt mee (h × 0,11, 10–24 px).
**geslachtscel.** Eicel: zona-band, spleet met poollichaampje, dooierkorrels, chromosoom vrij (metafase II, geen kernmembraan). Zaadcel: peddelkop (achter smaller), acrosoom teal (zoals zaadcelEcht), middenstuk met mitochondriënspiraal, dunner wordende golvende staart. Staart bewust ingekort (keyframes laten geen 10× toe).
**rodeBloedcel (overschrijft lib_bio).** Evans & Fung (1972) dikteprofiel voor het zijaanzicht: echte halter in plaats van ovaal; van boven deuk in twee tinten + lichte randboog; kantelen = vloeiende overgang ellips → halter.
**sikkelcel.** Eerste poging was een koepel met platte onderkant (dikte alleen in y opgeteld). Werkte: middenlijn als cirkelboog en dikte langs de straal (buitenrand 0,55, binnenrand 0,45 van de dikte) → echte halve maan met spitse punten; HbS-vezels als drie lijnen langs de boog; kleur iets donkerder (zuurstofarm).

## sb4: DNA-draden in e4s03 en e4s04
Geen inline DNA in sb4: alle DNA in e4s03 (regels 28–30) en e4s04 (regels 34–35, via `_kolonie` regel 6–7) komt uit `bacterie()` → `nucleoide()` → `dnaDraad()`; de nieuwe tekening werkt dus vanzelf.
Wel een **opmerking voor de keyframe** e4s03: met echte (langere) flagellen loopt de bundel van cel 2 over cel 1 en de pijl, en die van de onderste cellen langs het cijfer '2'. Advies: `flagel: 0.5` meegeven aan cel 2 en de twee rechtercellen, of de cellen verder uit elkaar zetten.

## Nog zwak
- Flagellen bij kleine cellen (≤ 120 px) zijn haarfijn; prima als context.
- Zaadcel-kop blijft een schema (vergroot); acrosoom-teal maakt de kop blauwig.
- Dode bacterie: lekken is subtiel; als de scène het verhaal vertelt, kan het blaasje uit `bacterieCel` (lib_bio) erbij.
