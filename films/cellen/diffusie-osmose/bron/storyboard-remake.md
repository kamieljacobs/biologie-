# Storyboard beeld-remake 2.0 — Diffusie en osmose (29 okt 2026)

Stem, script, takes, cue-woorden, vragen en speler blijven. Per scène: nu → wordt · beeldbank · twijfel?

Vaste moleculen voor de hele film (nieuw, in `src/scenes_mol.js`, recept erboven): **water** = geknikt H₂O (O teal, twee lichte H, 104,5°); **kleurstof** = klein molecuul van twee gekoppelde zeshoeken in goud; **Na⁺** oker bolletje met +, **Cl⁻** grijsblauw en groter (ionstraal ± 1,8×) met −, in water met een **watermantel** van kleine H₂O-moleculen (O naar Na⁺, H naar Cl⁻); **glucose** oker zeshoek met O in de ring; O₂ en CO₂ als voorheen (teal, grijs). Membranen overal `membraanBoog` (dubbellaag van fosfolipiden langs een boog); kanaal = kanaaleiwit uit `membraanBoog` (kralen, porie); drager en pomp = nieuwe kralen-eiwitten `dragerEiwit` en `pompEiwit` (twee helften helices die om en om open klappen; pomp met een gevouwen ATP-domein binnen).

| Scène | Nu | Wordt | Beeldbank | Twijfel |
|---|---|---|---|---|
| s01 cold open | glas, gouden stipjes, zoomcirkel met stipjes | zelfde glas en wolk; in de zoomcirkel echte water- en kleurstofmoleculen | — | nee |
| s04 alles beweegt | gouden stipjes in teal stipjesveld; koud/warm | zelfde simulatie, deeltjes zijn kleurstofmoleculen, water als kleine H₂O; botsende watermoleculen bij het gevolgde deeltje | — | nee |
| s05–s08 van veel naar weinig | `sim()` met 150 stipjes, tellers, pijlen, grafiek | zelfde `sim()`, zelfde tellers en grafiek; deeltjes = kleurstofmoleculen, water rustiger; bak met afgeronde rand | — | nee |
| s09 vier factoren | vier panelen met stippen; recht 'membraan'; blob-cellen | panelen rustiger; oppervlak met gebogen membraanstukje; cellen als `celRond` zonder organellen-drukte | `celRond`, `membraanBoog` | nee |
| s11 afstand, longblaasjes | zigzag; blob-longen, zoomcirkel met blob | zigzag blijft; links `longblaasje` (trosje met haarvatennet), zoomcirkel op één blaasjeswand met haarvat (rode bloedcellen één voor één), O₂ in, CO₂ uit | `longblaasje`, `bloedvat` (haarvat), `rodeBloedcel` | nee |
| s12 bouw membraan | blob-cel; eigen streepjesmembraan; eigen dubbellaag | `celRond` → doorlopende zoom naar de rand; `membraanBoog` groot; één fosfolipide groot in dezelfde kleuren als de laag; O₂ gaat erdoor, Na⁺ met mantel kaatst terug | `celRond`, `membraanBoog` | nee |
| s14 wat komt erdoor | streepjesmembraan, pil-kanaal, blob-drager | `membraanBoog` met kanaaleiwit (waterkanaal) en kralen-drager voor glucose; O₂/CO₂ erdoor; Na⁺ met watermantel en glucose kaatsen terug; conclusiekaarten | `membraanBoog` | nee |
| s15/s17 vwo kanaal en drager | pillen als eiwitten | kanaaleiwit met water in één rij; `dragerEiwit` klapt om (open buiten → glucose bindt → open binnen); vwo-pil goud i.p.v. paars | `membraanBoog` | nee |
| s18/s20 osmose-opstelling | bak met rechte stippellijn als membraan | zelfde bak; membraan = smalle gebogen `membraanBoog`; water als H₂O dat zichtbaar oversteekt; zout als Na⁺/Cl⁻ | `membraanBoog` | nee |
| s21 het gaatje (kern) | streepjesmembraan, twee blokjes, gouden 'zout' met stippen | `membraanBoog` verticaal met een **kanaaleiwit** als het gaatje; gehydrateerde Na⁺/Cl⁻ botsen en kaatsen terug en duwen H₂O weg; drukmeters en kaarten als 1.2; water in één rij door het kanaal | `membraanBoog` (kanaal) | **ja**: het 'gaatje' is nu een waterkanaal (aquaporine) in plaats van een abstracte opening; de stem zegt 'gaatje' |
| s22 U-buis + deeltjes tellen | buis met stippellijn | zelfde buis; membraan als klein gebogen stukje `membraanBoog`; zout als Na⁺/Cl⁻ | `membraanBoog` | nee |
| s23 plantencel | eigen rechthoekige cel | `plantencel` met `plasmolyse` 0 → 1 → 0 en de buitenoplossing in de ruimte; turgor met pijlen tegen de wand; komkommer blijft (schema) | `plantencel` | nee |
| s25 komkommercellen, bloedcel | eigen rechthoeken; rode schijf | vier `plantencel`-en in plasmolyse; `rodeBloedcel` (ingedeukte schijf) in een beker | `plantencel`, `rodeBloedcel` | nee |
| s27/s28 hemolyse, iso/hypo/hyper, infuus | eigen bol, zwellen/krimpen/barsten | zelfde proces met de beeldbankkleuren; normaal = `rodeBloedcel`, zwellen = bolle cel, krimpen = gekarteld (nieuw recept `bloedcelOsmose`) | `rodeBloedcel` | nee |
| s29 wortelhaarcel | beige balk en buis | `wortelHaren` (wortelstelsel met zoom op een wortelhaarcel), mineralen als oker vierkantjes: veel in de haarcel, weinig in de bodem | `wortelHaren` | nee |
| s31/s32 pomp, Na/K-pomp | pillen | `pompEiwit` (kralen, ATP-domein binnen) in `membraanBoog`; ATP-molecuul; K⁺ groen i.p.v. paars (zelfde kleur als in de zenuwfilms) | `membraanBoog`, `eiwitVouw` | nee |
| s33 recap + bootje | panelen met lijntjes; zon met gloed | panelen met mini-`membraanBoog` en de nieuwe moleculen; zon vlak (geen gloed) | `membraanBoog` | nee |
| s35 zeewater | balken, nier, rode bloedcel | zelfde; bloedcel krimpt met het nieuwe recept | — | nee |
| titel/eind | stipjeswolk | wolk van kleurstofmoleculen | — | nee |
