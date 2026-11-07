# Personages (castboek)

Interne pagina, niet gelinkt vanaf de site en met `noindex` (zoekmachines nemen hem niet op). Let op: GitHub Pages is openbaar, dus wie het adres kent kan hem wel openen.

- `lib_cast.js` — de vaste personages (Noor, Sam, Lotte, Daan, Yasmin, Bilal, Dr. Kim, Opa Henk) en sinds 20 okt 2026 ook twee jonge: **Teun** (`'kind'`, ± 6 jaar, ± 20 kg, broertje van Noor; kinderverhoudingen via `kop`, `armK`, `schouderK`, `heupK` in `CAST`) en de **baby** (`'baby'`, ligt op de rug met het hoofd links; `persoon(ctx, 'baby', x, y, lengte, { uit: 'slaapt' | 'blij' | 'neutraal' | 'huilt', geel: 0..1, t })`). Jonge personages staan in `CAST_JONG`; in het castboek onder de knop 'Teun en baby' met uiterlijk, garderobe (`outfit`), uitdrukkingen en houdingen. Gebruik in een film: `persoon(ctx, 'noor', x, y, h, { uit: 'blij', pose: 'wijs', outfit: 'winter' })`.
- `index.html` — het castboek: overzicht, elk personage los en de garderobes. Opnieuw bouwen na een wijziging: `python3 scripts/castboek.py <testpagina.html>` (de testpagina staat in de werkmap, `hw/cast/test.html`).

- Regel (20 okt 2026): kale grijze poppetjes worden in films altijd een vast personage uit dit castboek, ook baby's en kinderen. Teken geen eigen gezichtjes of half-aangepaste varianten.
