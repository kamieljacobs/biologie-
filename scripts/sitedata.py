"""Leest de site-inhoud (HOOFDSTUKKEN en NIVEAUS) uit index.html.
Gebruikt door scripts/teller.py en scripts/statistieken_ophalen.py."""
import json, os

R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def _object(tekst, naam):
    i = tekst.index('const ' + naam + ' = ') + len('const ' + naam + ' = ')
    diepte = 0
    in_str = False
    j = i
    while j < len(tekst):
        c = tekst[j]
        if in_str:
            if c == '\\':
                j += 1
            elif c == '"':
                in_str = False
        elif c == '"':
            in_str = True
        elif c == '{':
            diepte += 1
        elif c == '}':
            diepte -= 1
            if diepte == 0:
                return json.loads(tekst[i:j + 1])
        j += 1
    raise ValueError(naam + ' niet gevonden')


def lees():
    s = open(os.path.join(R, 'index.html'), encoding='utf-8').read()
    return _object(s, 'HOOFDSTUKKEN'), _object(s, 'NIVEAUS')


def filmduren():
    """href -> duur in minuten, voor alle films op de site."""
    h, _ = lees()
    return {f['href']: f.get('duur') for v in h.values() for f in v.get('films', []) if f.get('href')}
