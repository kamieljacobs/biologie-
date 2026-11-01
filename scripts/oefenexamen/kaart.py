#!/usr/bin/env python3
"""Zet (of werkt bij) de kaart van een oefenexamen in HOOFDSTUKKEN.examens.tools in index.html. Idempotent.
Gebruik: python3 scripts/oefenexamen/kaart.py tools/examen-vwo-2025-1.html [...]
Vragen en punten komen uit de tool zelf (Q.push ... pts). Ook: zet 'hulpstand en examenstand' in alle kaarten om naar 'vier hulpstanden'."""
import sys, os, re, json
R = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
p = f'{R}/index.html'; s = open(p).read()
s = s.replace('· hulpstand en examenstand"', '· vier hulpstanden"')
rom = {'1': 'I', '2': 'II'}
for f in sys.argv[1:]:
    href = 'tools/' + os.path.basename(f)
    m = re.match(r'tools/examen-(havo|vwo)-(\d{4})-(\d)\.html$', href); niv, jaar, tv = m.groups()
    t = open(os.path.join(R, href)).read()
    pts = [int(x) for x in re.findall(r'Q\.push\(\{\s*id:\s*\d+\s*,\s*pts:\s*(\d+)', t)]
    key = f'{niv}{jaar[2:]}-{tv}'
    k = {"href": href, "naam": f"Examen {niv} {jaar}-{rom[tv]} doorklikken", "titel": f"Oefenexamen {niv} {jaar}-{rom[tv]}",
         "opslag": f"examen-{key}", "punten": sum(pts), "vragen": len(pts),
         "vraag": "Haal jij dit examen? Denk eerst na, dan antwoorden.",
         "tekst": f"Maak het hele examen ({len(pts)} vragen, {sum(pts)} punten) stap voor stap: eerst hulpvragen, dan de echte examenvraag, nakijken met het correctievoorschrift, uitleg van de stof en animaties · vier hulpstanden",
         "bij": f"{niv} · centraal examen {jaar} tijdvak {tv}"}
    blok = json.dumps(k, ensure_ascii=False, indent=1).replace('\n', '\n   ')
    oud = re.search(r'\{\s*"href": "' + re.escape(href) + r'".*?\n   \}', s, re.S)
    if oud:
        s = s[:oud.start()] + blok + s[oud.end():]; print('bijgewerkt:', href, k['vragen'], 'vragen', k['punten'], 'punten')
    else:
        i = s.index('"opslag": "examen-')  # eerste oefenexamenkaart; voeg vóór dat blok in
        st = s.rindex('{', 0, i)
        s = s[:st] + blok + ',\n   ' + s[st:]; print('toegevoegd:', href, k['vragen'], 'vragen', k['punten'], 'punten')
open(p, 'w').write(s)
