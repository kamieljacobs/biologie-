"""Zet een nieuwe scenes.js (en de bibliotheekuittreksels) in de bestaande site-HTML, zonder de film opnieuw te bouwen.
Zo blijven speler, audio, woordtijden en alle naverwerking (spelerfix, antwoordtekst, flipkaarten, teller …) staan.
python3 inbouw.py <film.html> <scenes.js> <scènes-kopregel> [uittreksel.js ...]
Het blok met de uittreksels krijgt de markering /*BIBLIOTHEEK-UITTREKSEL*/ en wordt bij een volgende run vervangen."""
import sys
html, scenes, kop, *libs = sys.argv[1:]
h = open(html, encoding='utf-8').read(); sc = open(scenes, encoding='utf-8').read()
i = h.index('<script>' + kop); j = h.index('</script>', i)
h = h[:i] + '<script>' + sc.rstrip() + '\n' + h[j:]
M = '<script>/*BIBLIOTHEEK-UITTREKSEL*/'
if M in h:
    a = h.index(M); b = h.index('</script>', a) + len('</script>\n'); h = h[:a] + h[b:]
if libs:
    i = h.index('<script>' + kop)
    blok = M + '\n' + '\n'.join(open(l, encoding='utf-8').read() for l in libs) + '\n</script>\n'
    h = h[:i] + blok + h[i:]
assert '</script>' not in sc
open(html, 'w', encoding='utf-8').write(h); print('ingebouwd', len(h))
