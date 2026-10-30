"""splice_vmb.py <site.html> <gebouwde scenes.js> [versie] — vervangt alleen het scèneblok (en de versie in FILMDATA/voet) in de bestaande
site-HTML, zodat FILMDATA, speler en de nabewerkingen (spelerfix, antwoordtekst, kortantwoord, teller, licentie …) blijven staan.
Herkent het scèneblok aan de eerste regel '// Cellen · Van molecuul tot biosfeer'."""
import sys, re
html, scenes = sys.argv[1], sys.argv[2]; versie = sys.argv[3] if len(sys.argv) > 3 else None
h = open(html, encoding='utf-8').read(); s = open(scenes, encoding='utf-8').read()
m = re.search(r'<script>// Cellen · Van molecuul tot biosfeer.*?</script>', h, re.S); assert m, 'scèneblok niet gevonden'
assert '</script>' not in s
h = h[:m.start()] + '<script>' + s + '</script>' + h[m.end():]
if versie:
    h, n1 = re.subn(r'"version": "[^"]*"', f'"version": "{versie}"', h, count=1)
    h, n2 = re.subn(r'Versie [0-9.]+ · [a-z]+ 2026\.', f'Versie {versie}.', h, count=1)
    print('versie', n1, n2)
open(html, 'w', encoding='utf-8').write(h); print('ok', len(h))
