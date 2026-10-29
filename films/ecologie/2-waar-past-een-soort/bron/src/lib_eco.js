// lib_eco.js — reeksbibliotheek Ecologie (v2), 29 okt 2026. Laad ná lib.js, base.js, lib_evo.js (hergebruikt hoofdstukKaart, ondertitel, vwoMarker, macroNacht).
// Seriekleuren (seriebrief): energie goud · koolstof donkergrijs · stikstof blauw · fosfor oranje · organische stof groen · anorganische stof grijs. Geen paars als betekeniskleur (paars alleen voor de vwo-marker uit Part C).
const ECOK = { energie: C.goud, koolstof: '#5E6675', stikstof: '#4F86C6', fosfor: '#E08A3C', organisch: C.groen, anorganisch: '#9AA3B2', water: C.teal, warmte: C.koraal };
const ECO_FILMS = 8;

// ---- Standaardkoppen voor storyboardstills ----
function ecoTag(ctx, film, hfst) { metaText(ctx, `ECOLOGIE ${film}/${ECO_FILMS} · ${hfst}`, 80, 78, C.text2, 'left', 26); }
function ecoTitelKaart(ctx, film, titel, vraag, beeld) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, `HAVO · VWO · ECOLOGIE ${film}/${ECO_FILMS}`, W - 80, 78, C.text2, 'right', 26);
  text(ctx, titel, 120, 330, fTitel(92), C.text, 'left'); if (vraag) (Array.isArray(vraag) ? vraag : [vraag]).forEach((r, i) => text(ctx, r, 120, 420 + i * 60, fTekst(48, 500), C.text2, 'left')); if (beeld) beeld(ctx); }
function ecoVraagKaart(ctx, vraag, opties, film) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); if (film) ecoTag(ctx, film, 'VRAAG');
  text(ctx, 'Wat denk je?', 140, 230, fTitel(76), C.text, 'left'); const regels = Array.isArray(vraag) ? vraag : [vraag]; regels.forEach((r, i) => text(ctx, r, 140, 320 + i * 58, fTekst(46, 500), C.text2, 'left'));
  const y0 = 320 + regels.length * 58 + 30; opties.forEach((t, i) => { roundRect(ctx, 140, y0 + i * 124, 1300, 100, 18); shape(ctx, rgba(C.fill, 0.7), C.line, 2); text(ctx, 'ABCD'[i], 184, y0 + i * 124 + 64, fTekst(44, 800), C.goud, 'left'); text(ctx, t, 244, y0 + i * 124 + 64, fTekst(40, 500), C.text, 'left'); });
  ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(140, y0 + opties.length * 124 + 20); ctx.lineTo(140 + 1300 * 0.6, y0 + opties.length * 124 + 20); ctx.stroke(); }
function ecoSchaal(ctx, tekst) { metaText(ctx, tekst, 80, 880, C.text2, 'left', 26); }
// Overige reeksobjecten (populatiegrafiek, optimumkromme, voedselweb, piramide, energiestroomschema, kringloopschema, successiebalk)
// worden per film in teken_eco<N>.js gemaakt met voorvoegsel; de hoofdredacteur haalt dubbelingen na de keuring samen in dit bestand.
