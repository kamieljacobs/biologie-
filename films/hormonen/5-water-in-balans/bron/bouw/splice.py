"""splice.py <film.html> <bron/src> — zet lib.js, lib_voeding+lib_hormonen, castboek+anatomie+beeldbank-uittreksel en scenes.js
in de bestaande site-HTML, zonder FILMDATA, speler en de nabewerkingen (spelerfix, antwoordtekst, …) aan te raken. (1.1, 28 okt 2026)
Het beeldbank-uittreksel maak je eerst met: python3 bouw/bio_deel.py src/lib_bio.js src/lib_bio_deel.js src/lib.js src/lib_voeding.js src/lib_hormonen.js src/scenes.js src/lib_cast.js src/lib_anatomie.js -- <functies>"""
import sys, os, re
html, src = sys.argv[1], sys.argv[2]
h = open(html, encoding='utf-8').read()
R = lambda f: open(os.path.join(src, f), encoding='utf-8').read()
def zet(kop, inhoud):
    global h
    m = re.search(r'<script>' + re.escape(kop) + r'.*?</script>', h, re.S)
    assert m, kop
    h = h[:m.start()] + '<script>' + inhoud + '</script>' + h[m.end():]
zet('// ===== Part C tokens', R('lib.js'))
zet('// ===== Reeks Voeding', R('lib_voeding.js') + '\n' + R('lib_hormonen.js'))
CAST = '// ===== castboek, anatomie en beeldbank (1.1) =====\n'
blok = CAST + R('lib_cast.js') + '\n' + R('lib_anatomie.js') + '\n' + R('lib_bio_deel.js')
if CAST.strip() in h: zet(CAST.strip(), blok)
else:
    i = h.index('<script>' + R('scenes.js')[:30])
    h = h[:i] + '<script>' + blok + '</script>\n' + h[i:]
eerste = R('scenes.js').split('\n')[0]
zet(eerste, R('scenes.js'))
open(html, 'w', encoding='utf-8').write(h); print('ok', len(h))
