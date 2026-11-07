#!/usr/bin/env python3
"""Bouwt films/benchmark/index.html uit de gedeelde bibliotheken en bron/.
Gebruik: python3 films/benchmark/bouw.py   (vanuit de root van de repo)"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
HIER = Path(__file__).resolve().parent
VOED = ROOT / 'films/voeding/1-wat-zit-er-in-je-eten/bron/src'

libs = [
    VOED / 'lib.js',                       # Part C-tokens en hulpjes
    VOED / 'lib_voeding.js',               # moleculen, broodje
    ROOT / 'personages/lib_cast.js',       # castboek (actuele versie)
    VOED / 'cast_hulp.js',                 # rompMaat, rompPad
    ROOT / 'personages/lib_anatomie.js',   # lichaam met organen op hun echte plek
    ROOT / 'bibliotheek/lib_bio.js',       # tekenrecepten (darmwand, enzym, zetmeel)
    HIER / 'bron/scene.js',
    HIER / 'bron/render.js',
]
js = '\n;\n'.join(p.read_text(encoding='utf-8') for p in libs)
# circ staat in cast_hulp én lib_anatomie: dubbele function-declaraties zijn in een gewoon script geen fout
pagina = (HIER / 'bron/page.html').read_text(encoding='utf-8')
pagina = pagina.replace('/*FONTS*/', (VOED / 'fonts.css').read_text(encoding='utf-8'))
pagina = pagina.replace('/*LIBS*/', js)
(HIER / 'index.html').write_text(pagina, encoding='utf-8')
print('geschreven:', HIER / 'index.html', f'{len(pagina) // 1024} kB')
