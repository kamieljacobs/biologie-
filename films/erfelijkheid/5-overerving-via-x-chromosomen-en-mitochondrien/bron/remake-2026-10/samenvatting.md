# Samenvatting fase 1 · Overerving via het X-chromosoom (lichte remake)

- **Beter voor de les:** de film draait nu om één sleutel: *een jongen krijgt zijn X altijd van zijn moeder* (nieuwe vraag q06). Daaruit volgen in beeld: waarom mannen vaker kleurenblind zijn, waarom een dochter van een kleurenblinde man zeker draagster is (nieuwe vraag q21) en hoe een eigenschap een generatie overslaat. De examenvalkuil 'kans voor een zoon (½) of voor een kind (¼)' wordt uitgelegd met de simulatie van 200 kinderen.
- **Nieuwe opening:** opa van gezin De Wit (film 1) sorteert aardbeien; rechts van een stippellijn zie je hoe hij het ziet (kleurmodel). Het gezin komt terug in de stamboom (s22), het vwo-blok (moederlijn in de fotolijstjes) en de recap. Twijfel T1.
- **Kleurzien met mechanisme:** zoomcirkel naast het hoofd naar het netvlies (kegeltjes en staafjes), gevoeligheidskrommen 420/530/560 nm waarvan de rode naar de groene schuift: 'twee soorten kegeltjes reageren bijna hetzelfde' in plaats van 'voor je hersenen'.
- **Niveau:** havo + vwo. Basis = X-chromosomaal (recessief én dominant). **Mitochondriaal DNA = één vwo-blok** (alleen vwo-syllabus); voorstel titel 'Overerving via het X-chromosoom' + vwo-ondertitel. Twijfel T2.
- **Vakfouten uit de oude film eruit** (`!`, al aangepast): X 'achthonderd' → 'zo'n duizend' genen; zaadcel 'paar tientallen' → 'hooguit zo'n honderd' mitochondriën; mitochondriale aandoening 'alle kinderen' → 'alle kinderen krijgen haar mitochondriën, hoe ziek verschilt'; '8 % × 8 % ≈ 0,6 %' → gemeten ± 0,4–0,5 %; 'van elk X-gen één allel' → 'van de meeste'; 'de zaadcel bepaalt het geslacht' → 'meestal' (syllabus).
- **Scènes:** 37 (26 gesproken alinea's, 4 vragen, titel, 5 hoofdstukkaarten waarvan 1 met vwo-balk, eindkaart).
- **Gesproken duur (schatting, 2,4 woord per seconde):** basis 867 woorden ± 6:00 spraak (speeltijd havo ± 6:45 met vragen en kaarten), vwo-blok 169 woorden ± 1:10 (vwo ± 8:00). Oud: 4:00, één niveau. `scriptcheck.py`: cold open 65 (incl. alinealabels; ± 55 gesproken, grens 48), hoofdstuk 3 258 (grens ± 230), totaal 1084 (grens ± 900): de film is langer doordat elk hoofdstuk nu een vraag heeft en X-dominant erbij kwam; geen raadbare opties (antwoorden b b c a).
- **Opnieuw ingesproken:** alles, 26 alinea's + 4 vraagzinnen = **30 takes** (eleven_v4; ± 7,2 min × 700 ≈ **5.000 credits**).
- **Nieuw te tekenen** (code in `tekeningen/nieuw_erf5.js`, keyframes met `tekeningen/kf.html` + `render.py`): `genoTekst`/`G` (genotype met superscripts in ouderkleur), `geslStaaf`, `aardbei`/`aardbeienBak`, `kleurModelDeutan`, `netvliesKegels`, `kegelKrommen`, `mtRingen`, plus de stamboomdata `STAMBOOM_WIT` en `STAMBOOM_VIC`. Hergebruikt: kamer, gezin, lijstje, chromX, allelChip (Chromosomen 2.1), `stamboomSymbolen`, `eicelEcht`, `zaadcelEcht`, `mitochondrionEcht`, castpersonages De Wit. Geen ElevenLabs-referentieplaat gebruikt (T4 stelt er één voor als alternatief, ± 190 credits).
- **Keyframes:** 9 (4 twijfelscènes, 5 kernscènes). **Twijfelscènes:** 4 (opa De Wit kleurenblind · mitochondriën alleen vwo + titel · echte kleuren en kleurmodel · nieuwe tekening netvlies).
- **Bronnen:** 31 beweringen, 25 bronnen zelf geopend: 22 ✓, 9 ≈; vier `!` met A-bronnen meteen aangepast. Niet kunnen openen: vwo-syllabus 2026 (wel 2025 v4), pmc.ncbi.nlm.nih.gov; de bron van het kleurmodel nog opzoeken vóór de bouw.

## Opmerkingen van Kamiel (sleutel erf5)
| Id | Opmerking | Verwerking |
|---|---|---|
| `-P534otRNyMH_D1dDAkO` (1:13) | 'allel weer niet goed uitgesproken' | Uitspraaktest 28 okt: allel/allelen = gewone spelling (eleven_v4), gameet/gameten = ga-MEET/ga-MEE-ten. De hele film wordt opnieuw ingesproken met nieuw model; alle alinea's met 'allel' (s11, s12, s19, s24) blind transcriberen en in de luisterbatch (uitspraak.md). |
| `-P535BjF1j0UD_CxJiZX` (2:40) | 'check alle allel-uitspraken' | Idem: alle voorkomens staan op de lijst in uitspraak.md (goedgekeurd 28 okt). |

## Afstemmen met de andere films van de reeks (helpers 2, 3, 4, 6)
- **Notatie:** Xᴬ/Xᵃ (oud Xᴺ/Xⁿ), dominant = hoofdletter, genotype als XᴬXᵃ en XᵃY; kleur van het chromosoom = ouder (moeder oker, vader teal). Film 6 gebruikte al Xᵃ.
- **Kruisingsschema:** gameten van de vader boven, van de moeder links (vooruitblik film 1). Oud film 2 had het andersom: graag gelijk trekken.
- **Symbolen:** aangedaan = paars gevuld, draager/draagster = paars stipje (zoals `stamboomSymbolen`); 'draagster' voor vrouwen met XᴬXᵃ, 'drager' blijft het algemene woord (film 6).
- **Gezin De Wit:** opa (moederskant) kleurenblind en Marieke draagster zijn nieuw (T1); Levi en Jens krijgen geen vaste status, dus film 6 kan ze vrij gebruiken.
- **Bouw:** `script_v2.md` heeft alinealabels en toelichting (`>`); voor `make_segments.py` een schone versie zonder labels maken, met `[VWO-START]` vóór v25 en `[VWO-END]` na v29, en `uitspraak_film.json` uit het script (regel 'Noten: stem-invoer').
