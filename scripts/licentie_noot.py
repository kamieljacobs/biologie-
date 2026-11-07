"""Zet de licentievermelding (© Kamiel Jacobs · CC BY-NC-SA 4.0) op elke pagina van de site.
Gebruik: python3 scripts/licentie_noot.py  (idempotent; slaat bronmappen, oud.html, nieuw/ en gebruik.html over).
Pagina's met een <footer> krijgen de vermelding in de footer, de rest een regel onderaan de pagina."""
import os, re, subprocess
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
files = subprocess.check_output(['git', 'ls-files', '*.html'], cwd=R, text=True).split()
skip = lambda f: '/bron/' in f or '/storyboards-' in f or f in ('oud.html', 'gebruik.html') or f.startswith('nieuw/')
MARK = 'data-licentie'
n = 0
for f in files:
    if skip(f): continue
    p = os.path.join(R, f); s = open(p, encoding='utf-8').read()
    if MARK in s: continue
    rel = os.path.relpath(os.path.join(R, 'gebruik.html'), os.path.dirname(p))
    extra = ' · examenvragen en correctievoorschriften © CvTE (examenblad.nl)' if f == 'examenatlas.html' else ''
    tekst = f'© 2026 Kamiel Jacobs · Biologie bij Kamiel · <a href="{rel}" rel="license" style="color:inherit;text-decoration:underline;text-underline-offset:2px">CC BY-NC-SA 4.0</a>{extra}'
    scripts = [(m.start(), m.end()) for m in re.finditer(r'<script\b.*?</script>', s, re.S)]
    buiten = [m.start() for m in re.finditer('</footer>', s) if not any(a <= m.start() < b for a, b in scripts)]
    if buiten:
        i = buiten[-1]
        # binnen de laatste wrap-div van de footer, als die er is
        j = s.rfind('</div>', 0, i)
        k = s.rfind('<footer', 0, i)
        at = j if j > k else i
        s = s[:at] + f'<span {MARK} style="flex-basis:100%;width:100%;display:block;font-size:13px;opacity:.75;margin-top:6px">{tekst}</span>' + s[at:]
    elif '</body>' not in s:
        continue  # sjablonen zonder <body> (bv. films/verbeterbladen/sjabloon.html)
    else:
        i = s.rindex('</body>')
        s = s[:i] + f'<p {MARK} style="max-width:1080px;margin:28px auto 22px;padding:0 24px;font:13px/1.5 system-ui,-apple-system,\'Segoe UI\',sans-serif;opacity:.6;text-align:center">{tekst}</p>\n' + s[i:]
    open(p, 'w', encoding='utf-8').write(s); n += 1
print(n, 'pagina\'s bijgewerkt')
