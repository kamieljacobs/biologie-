// =====================================================================================
// SKELETSPIERVEZEL. Recept: lange cilindrische cel, 10–100 µm dik, centimeters lang; dwarsstrepen (A- en I-banden)
// om de ± 2,5 µm; veel kernen, plat, tegen de rand. Bron: Junqueira h. 10. Bekende fouten: gestreept blokje;
// kern in het midden; één kern.
// Inbouw 28 okt 2026 (Kamiel koos de huidige versie): alleen de bevestigde fout hersteld: er was geen stand samentrekken.
// o.c 0..1: de vezel wordt korter (± 15 %), de sarcomeren korter; de donkere A-band blijft even breed, de lichte I-band
// wordt smaller (Lumen Biology 'Sliding filament model'; OpenStax A&P fig. 10.10 via anatomytool.org). Dikker worden is
// niet toegevoegd (zelf maar één indirecte bron kunnen openen; vraag aan Kamiel). spierBundel geeft o.c door. Zonder o.c tekent alles precies als voorheen.
// =====================================================================================
function spierVezel(ctx, x, y, w, h, o = {}) {
  const { a = 1, seed = 1, c = 0 } = o; const kort = 1 - 0.15 * clamp(c, 0, 1); const streep = (o.streep || 12) * kort; w *= kort; // samentrekken: vezel en sarcomeren korter
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y - h / 2, w, h, h / 2); shape(ctx, rgba(BIO.spier, 0.8), BIO.spierL, 1.5);
  ctx.save(); roundRect(ctx, x, y - h / 2, w, h, h / 2); ctx.clip(); ctx.fillStyle = rgba('#5A2A26', 0.45);
  const band = (o.streep || 12) * 0.45; for (let xx = x + 6; xx < x + w; xx += streep) ctx.fillRect(xx, y - h / 2, band, h); // donkere A-band blijft even breed, lichte I-band wordt smaller
  for (let k = 0; k < Math.round(w / 90); k++) { const kx = x + 40 + k * 90 + hash(seed + k) * 30, top = hash(seed * 3 + k) > 0.5; ctx.beginPath(); ctx.ellipse(kx, top ? y - h / 2 + 5 : y + h / 2 - 5, 16, 3.5, 0, 0, 6.283); shape(ctx, rgba(BIO.kern, 0.95), BIO.kernL, 1); }
  ctx.restore(); ctx.restore();
}
function spierBundel(ctx, x, y, w, o = {}) { const { a = 1, n = 4, h = 26, c = 0 } = o; for (let i = 0; i < n; i++) spierVezel(ctx, x + (i % 2) * 14, y + i * (h + 6) - (n - 1) * (h + 6) / 2, w - (i % 2) * 14, h, { a, seed: i + 3, c }); }
