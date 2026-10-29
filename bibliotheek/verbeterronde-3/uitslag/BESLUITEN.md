# Ronde 3: Kamiels besluiten (28 okt 2026), ingebouwd dezelfde dag

1. **methylgroep**: de ronde-2-winnaar in palet B (`genregulatie/methylgroep/W.js`), met één aanpassing: de methylgroep (CH3) groen in plaats van koraal (koraal leek op de rode A). De transcriptiefactor was grijsgroen en is daarom grijs geworden. Nieuw in `lib_bio.js` (stond er nog niet in).
2. **polymeraseAchter / polymeraseVoor**: Kamiel koos op 29 okt 2026 (keuzeblad Regeling) versie 1 = **variant A** (kluwen als C-klem, DNA in het kanaal); ingebouwd in `lib_bio.js` en `dieren/lib_bio.js`. De beoordelaar koos W.
3. **Vijf eiwitten als kralenketen**: `eiwitten/<obj>/DEF.js` (rnaPolymerase, kopStand, kernEnvelopPorie, tHelperCel, hivVirus).
4. **zetmeelSpiraal** met optie `vertakt` (amylopectine), **bladDoorsnede** met waterdamp (optie `water`), **embryoEcht** na de bronnenronde: de DEF.js uit `<groep>/<obj>/`.
5. **Navelstreng: kleur volgt zuurstof.** Embryo: de ader (zuurstofrijk, van placenta naar kind) rood, de twee slagaders blauw (was andersom). Ook elders in lib_bio.js: `placentaDoorsnede` met `kleurO2: false` tekende de slagaders rood (via `castNavelstreng` uit een film) en tekent nu zuurstofarm blauw; `vrouwOrganenVoor` gebruikt de nieuwe `bioNavelstreng` (slagaders blauw, ader rood) in plaats van `castNavelstreng`. Met `kleurO2` aan (standaard) waren de slagaders al blauwpaars (`PLAC.arm`, zuurstofarm foetaal bloed) en de ader rood; dat blijft. `vlokVergroot` volgde de regel al.
6. **Replicatievork**: elke base één staafje van gelijke dikte (dx/2) met een duidelijke spleet. De 'dubbele' basen kwamen doordat `vorkTeken` vanaf dx ≥ 22 de puzzelvorm tekende, die breder is dan de afstand per bp, zodat buren in elkaar liepen. Nu altijd staafjes; letters (vork met `letters`) staan in het staafje via `d2Base` `o.staafLetter`. Andere aanroepen van `d2Base` zijn ongewijzigd.
7. **RNA-kleurafspraak** (ruggengraat teal `D2.rna`, basen palet B): virus-RNA in `hivVirus` en `tHelperCel` en het mRNA van `lipideNanodeeltje` (was lila/paars). Nieuwe hulp `_rnaTikjes`.
8. **lib_micro_evo.js**: `nucleoide` standaard grijs (palet B, zoals `dnaDraad`), was paars. Plasmiden volgden `dnaDraad` al; het oker resistentiegen (allelkleur) blijft. Verder niets veranderd.

Voor/na van de aangepaste objecten: `uitslag/<obj>/voor.png` en `na.png`, zie `VERANDERD.json`.
