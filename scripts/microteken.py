#!/usr/bin/env python3
"""Het micro-teken µ (U+00B5) blijft µ in hoofdletterlabels.

Op het canvas zetten tekenfuncties (metaText, naamBij, ...) tekst met
`.toUpperCase()` om in hoofdletters. JavaScript maakt van µ (U+00B5) dan een
Griekse hoofdletter Μ (U+039C), dus '± 2 µm' wordt '± 2 MM' in beeld.

Dit script maakt van elke `.toUpperCase()` in JavaScript
`.toUpperCase().replace(/\\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\\u00B5'+(u?u.toLowerCase():''))`:
Μ wordt weer µ en een eenheidsletter erachter (m, g, s) blijft klein, dus '± 2 µm'
wordt '± 2 µM' noch '± 2 MM' (µM zou micromolair zijn). Oudere beschermingen
(`.replace(/\\u039C/g,'µ')`) worden meteen naar deze vorm gezet. Idempotent. Overgeslagen: `charAt(0).toUpperCase()` en `[0].toUpperCase()`
(hoofdletter van één letter, nooit µ) en plekken die al beschermd zijn.

Zoekt in (niet in `bron/oud/`):
  films/**, tools/docent/**, bibliotheek/**, personages/**
  bestanden .html (alleen binnen inline <script>) en .js (ook bron/src en _bouw/src)

Gebruik:
  python3 scripts/microteken.py                     # herstel alles
  python3 scripts/microteken.py --check             # faalt bij een onbeschermde plek
  python3 scripts/microteken.py --zonder films/cellen/   # deze paden overslaan (herhaalbaar)
  python3 scripts/microteken.py --dry               # alleen tellen
"""
import argparse
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WORTELS = ['films', 'tools/docent', 'bibliotheek', 'personages']
EXT = ('.html', '.js')

BESCHERMING = (".replace(/\\u039C(?:([MGS])(?![A-Z]))?/g,"
               "(a,u)=>'\\u00B5'+(u?u.toLowerCase():''))")
# oudere vormen die we omzetten naar BESCHERMING
OUD = [".replace(/\\u039C/g,'\\u00B5')", ".replace(/\\u039C/g,'\u00b5')"]
# .toUpperCase() dat nog niet beschermd is en niet de hoofdletter van één teken maakt
TUC = re.compile(r"\.toUpperCase\(\)(?!\s*\.replace\(\s*/\\u039C)")
EEN_LETTER = re.compile(r"(?:charAt\(\s*0\s*\)|\[\s*0\s*\])\s*$")
SCRIPT = re.compile(r"(<script\b(?![^>]*\bsrc\s*=)[^>]*>)(.*?)(</script>)", re.S | re.I)
MU = re.compile('µ|&micro;')  # alleen de letterlijke tekens, niet onze eigen µ-escape


def beschermen(js):
    """Geeft (nieuwe tekst, aantal vervangingen)."""
    n = 0
    for oud in OUD:
        k = js.count(oud)
        if k:
            js = js.replace(oud, BESCHERMING)
            n += k

    def vervang(m):
        nonlocal n
        if EEN_LETTER.search(js[max(0, m.start() - 20):m.start()]):
            return m.group(0)
        n += 1
        return m.group(0) + BESCHERMING

    return TUC.sub(vervang, js), n


def verwerk(tekst, is_html):
    if not is_html:
        return beschermen(tekst)
    totaal = 0

    def sc(m):
        nonlocal totaal
        if re.search(r'type\s*=\s*["\'](?:application/(?:ld\+)?json|text/template)', m.group(1), re.I):
            return m.group(0)
        nieuw, n = beschermen(m.group(2))
        totaal += n
        return m.group(1) + nieuw + m.group(3)

    return SCRIPT.sub(sc, tekst), totaal


def bestanden(zonder):
    for w in WORTELS:
        basis = os.path.join(ROOT, w)
        for d, dirs, fs in os.walk(basis):
            rel_d = os.path.relpath(d, ROOT).replace(os.sep, '/') + '/'
            dirs[:] = [x for x in dirs if x not in ('node_modules', '.git') and
                       not (rel_d + x + '/').endswith('/bron/oud/')]
            for f in fs:
                if not f.endswith(EXT):
                    continue
                rel = rel_d + f
                if any(rel.startswith(z) for z in zonder):
                    continue
                yield rel


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--check', action='store_true', help='faal als er nog een onbeschermde plek is')
    ap.add_argument('--dry', action='store_true', help='niets schrijven')
    ap.add_argument('--zonder', action='append', default=[], metavar='PAD',
                    help='sla bestanden over waarvan het pad (vanaf de repo-root) hiermee begint')
    a = ap.parse_args()
    zonder = [z.lstrip('./') for z in a.zonder]

    plekken = 0
    gewijzigd = []
    films_mu = set()
    for rel in bestanden(zonder):
        pad = os.path.join(ROOT, rel)
        try:
            tekst = open(pad, encoding='utf-8').read()
        except (UnicodeDecodeError, OSError):
            continue
        if 'toUpperCase' not in tekst:
            continue
        nieuw, n = verwerk(tekst, rel.endswith('.html'))
        if not n:
            continue
        plekken += n
        gewijzigd.append((rel, n))
        # gebouwde films (geen bron/ of bibliotheek) waar µ ook echt in staat
        if rel.startswith('films/') and '/bron/' not in rel and MU.search(tekst):
            films_mu.add(rel)
        if not a.check and not a.dry:
            with open(pad, 'w', encoding='utf-8', newline='') as fh:
                fh.write(nieuw)

    if a.check:
        if plekken:
            print('microteken: %d onbeschermde .toUpperCase()-plek(ken) in %d bestand(en):' % (plekken, len(gewijzigd)))
            for rel, n in gewijzigd[:40]:
                print('  %s (%d)' % (rel, n))
            if len(gewijzigd) > 40:
                print('  ... en %d meer' % (len(gewijzigd) - 40))
            print('Draai: python3 scripts/microteken.py')
            sys.exit(1)
        print('microteken: ok, alle .toUpperCase()-plekken beschermd')
        return

    werkwoord = 'zou beschermen' if a.dry else 'beschermd'
    print('microteken: %d plek(ken) in %d bestand(en) %s' % (plekken, len(gewijzigd), werkwoord))
    gb = [r for r, _ in gewijzigd if r.startswith('films/') and '/bron/' not in r]
    print('  gebouwde films/pagina\'s geraakt: %d; waarvan met µ in de tekst: %d' % (len(gb), len(films_mu)))


if __name__ == '__main__':
    main()
