# Opwaardering naar prompt v13 · Zenuwstelsel 4 · Knoeien met de synaps

28 okt 2026, zonder keuring (Regeling-batch, `films/OPWAARDEREN-REGELING.md`). Versie 1.0 → 1.1. Getest: contactvel van de gewijzigde scènes (cold open, synaps a1/a2, gewenning a5, samenvatting), geen fouten in de console, alle vijf de vragen afgespeeld met `?vragen=uit`, de B11-scripts.

## (a) Herinspreeklijst (niets opgenomen)

| Alinea | Reden | Credits (schatting) |
|---|---|---|
| a4 (optioneel) | 'Binnen tien seconden na een trek' is aan de snelle kant; bronnen zeggen 'binnen seconden' (10–20 s gangbaar). Voorstel: 'Binnen een paar seconden'. Geen echte fout, dus alleen als je toch iets opneemt. | ±1.000 (hele alinea, ±950 tekens, eleven_multilingual_v2) |

Geen uitgesproken namen van castpersonages, geen 'Voorspel.', geen 'Voor vwo'.

## (b) Vragen over nieuwe aanpak of inhoud (niet gedaan)

1. **Hele reeks Zenuwstelsel 1–6 naar de Part C-look?** De films hebben nog hun eigen lichte ontwerp (lichte achtergrond, Inter, paars voor neurotransmitter en volgende cel). Omzetten naar donker navy met Fraunces/Source Sans en betekeniskleuren (teal voor zenuwsignalen, minder paars) is een nieuwe stijl en raakt elke scène; alleen samen met films 1–3 doen.
2. **Synaps uit de beeldbank (`synapsEcht`, met optie `ssri`)** in plaats van de eigen tekening? Raakt alle micro-scènes (receptoren, sleutels, badges, ingreepkaart); eigenlijk een lichte remake van het beeld.
3. **Beloningssysteem** (a5) is nu een wolk met een gele cirkel. Voorstel: hoofd in doorsnede (`hoofdHersenen`, in een zoomcirkel náást een personage) met VTA → nucleus accumbens als pijl. Nieuwe tekening, dus eerst jouw akkoord.
4. **Linda met een glas wijn** in de cold open: de stem zegt 'je', maar een 16-jarige (Noor) kan hier niet (alcohol). Ik koos Linda (volwassen, moeder van Noor). Goed zo, of liever een figurant (Erik/Joost)?

## (c) Wat ik veranderde

- Grijze poppetjes (cold open en de gedimde wereld onder de samenvatting) → castpersonage Linda, staand en zittend, met uitdrukkingen die de oude ogen/mond-wissels volgen.
- Kopje en wijnglas op ware grootte; glas op de armleuning in plaats van zwevend.
- Membraan van de volgende cel aan de spleetkant gebogen (synaps, gewenning, lens).
- Speler: bij Vragen uit stond na de sprong nog één beeldje de ondertitel 'Het goede antwoord is B.'; `renderCaption` slaat die zin (en 'Wat denk je?') nu over als de vragen uit staan.
- Dode link in de credits; versie 1.1.
- Bronnenlogboek `bronnen.md` (24 beweringen: 14 ✓, 10 ≈, 0 !).

Voor de bibliotheek: geen nieuw object. Wel een herbruikbaar hulpje: `window.CASTSVG` (lib_cast.js afgeschermd + `zet(parent, id, x, y, h, o)` dat een castpersonage als `<image>` in een SVG-laag zet), ook gebruikt in Zenuwstelsel 5.
