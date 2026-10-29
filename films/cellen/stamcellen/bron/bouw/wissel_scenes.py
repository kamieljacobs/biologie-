"""wissel_scenes.py <oud.html> <src-map> <uit.html>
Stamcellen 2.0: zet de nieuwe scènes in de site-HTML zonder de rest te raken (speler, pagina, FILMDATA en de
latere fixes van spelerfix/antwoordtekst/... blijven zoals ze op de site stonden). Vervangt het scèneblok
(<script>// Cellen · Stamcellen — scènes per alinea. ... </script>) door lib_cast.js + lib_bio_deel.js + obj.js +
scenes_v2.js uit <src-map>, en zet de versie in de voettekst op 2.0. Idempotent: herkent ook een eerder gewisseld blok."""
import sys, os, re
oud, src, uit = sys.argv[1:4]
h = open(oud, encoding='utf-8').read()
merk_oud, merk_nieuw = '<script>// Cellen · Stamcellen — scènes per alinea.', '<script>/*STAMCELLEN_2_SCENES*/'
i = h.find(merk_nieuw)
if i < 0: i = h.index(merk_oud)
j = h.index('</script>', i) + len('</script>')
lees = lambda n: open(os.path.join(src, n), encoding='utf-8').read()
blok = merk_nieuw + '\n' + lees('lib_cast.js') + '\n' + lees('lib_bio_deel.js') + '\n' + lees('obj.js') + '\n' + lees('scenes_v2.js') + '\n</script>'
assert '</script>' not in blok[:-9], 'scriptsluiting in de bron'
h = h[:i] + blok + h[j:]
h = h.replace("  if(look==='micro') grain(ctx);\n", "  // korrel weg (Kamiel 15 okt 2026 / prompt v8): egale achtergrond; textuur alleen binnen een cel\n")
h = h.replace('"version": "1.0 · oktober 2026"', '"version": "2.0 · oktober 2026"')
h = h.replace('Versie 1.0 · oktober 2026.', 'Versie 2.0 · 29 oktober 2026 (beeld-remake op prompt v13).')
open(uit, 'w', encoding='utf-8').write(h); print('ok', len(h))
