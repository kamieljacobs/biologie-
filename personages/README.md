# Personages (castboek)

Interne pagina, niet gelinkt vanaf de site en met `noindex` (zoekmachines nemen hem niet op). Let op: GitHub Pages is openbaar, dus wie het adres kent kan hem wel openen.

- `lib_cast.js` — de vaste personages (Noor, Sam, Daan, Yasmin, Dr. Kim, Opa Henk) met uiterlijk, garderobe (`outfit`), uitdrukkingen en houdingen. Gebruik in een film: `persoon(ctx, 'noor', x, y, h, { uit: 'blij', pose: 'wijs', outfit: 'winter' })`.
- `index.html` — het castboek: overzicht, elk personage los en de garderobes. Opnieuw bouwen na een wijziging: `python3 scripts/castboek.py <testpagina.html>` (de testpagina staat in de werkmap, `hw/cast/test.html`).
