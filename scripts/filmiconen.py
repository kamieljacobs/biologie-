"""Filmmedaillons (gloedstijl) voor de filmlijsten op index.html en vervolg.html.
Knippen:  python3 scripts/iconen_knippen.py <vel.png> img/kunst/films <voorbeeld.png> --ids <slugs in volgorde>
Daarna:   python3 scripts/filmiconen.py   (zet FICOON in beide pagina's = alle slugs met een bestand in img/kunst/films/)
De onderwerpen per film staan in img/kunst/films/ONDERWERPEN.tsv (slug, titel, onderwerp in de prompt)."""
import os, re, json
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
d = os.path.join(R, 'img', 'kunst', 'films')
ids = sorted(f[:-5] for f in os.listdir(d) if f.endswith('.webp'))
blok = '/* FICOON:start */const FICOON=' + json.dumps(ids, ensure_ascii=False, separators=(',', ':')) + ';/* FICOON:end */'
for n in ('index.html', 'vervolg.html'):
    p = os.path.join(R, n); s = open(p, encoding='utf-8').read()
    s2 = re.sub(r'/\* FICOON:start \*/.*?/\* FICOON:end \*/', lambda m: blok, s, flags=re.S)
    assert s2.count('FICOON:start') == 1, n
    open(p, 'w', encoding='utf-8').write(s2)
print(len(ids), 'filmmedaillons')
