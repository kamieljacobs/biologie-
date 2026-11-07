#!/usr/bin/env python3
"""Bouwt beeldbank.js voor les 3 DNA: de gedeelde bibliotheken + de gekozen tekeningen uit
bibliotheek/verbeterronde-1, afgeschermd in één functie zodat hun namen (C, circ, text …) niet botsen
met die van de les. De les roept ze aan als BB.<naam>(ctx, …) en zet het palet met BB.thema(licht).
Versie per object: VERSIE hieronder (nu overal C = ook de winnaar van ronde 3). Na Kamiels keuze uit
het keuringsblad alleen VERSIE aanpassen en dit script opnieuw draaien:
    python3 tools/docent/dna-3/bouw_beeldbank.py
"""
import pathlib, re

def top_var(js):
    # gedeelde hulpjes staan in meerdere bestanden: maak top-level const/let tot var, dan wint de laatste kopie
    return re.sub(r'^(const|let) ', 'var ', js, flags=re.M)

R = pathlib.Path(__file__).resolve().parents[3]
VR = R / 'bibliotheek/verbeterronde-1'
LIBS = ['films/voeding/1-wat-zit-er-in-je-eten/bron/src/lib.js',
        'films/voeding/1-wat-zit-er-in-je-eten/bron/src/lib_voeding.js',
        'bibliotheek/lib_bio.js', 'bibliotheek/dieren/lib_micro_evo.js']
VERSIE = {  # object: (groep, versie)
    'uvSchade': ('genregulatie', 'C'), 'transcriptiefactor': ('genregulatie', 'C'), 'lacOperon': ('genregulatie', 'C'),
    'methylgroep': ('genregulatie', 'C'), 'nucleosoomAcetyl': ('genregulatie', 'C'),
    'mrnaSliert': ('dna', 'C'), 'rnaPolymerase': ('dna', 'C'),
    'thermocycler': ('lab', 'C'), 'primerStuk': ('lab', 'C'), 'gelElektroforese': ('lab', 'C'), 'sequencer': ('lab', 'C'),
    'plasmideKnipPlak': ('lab', 'C'), 'crisprCas9': ('lab', 'C'), 'restrictieEnzym': ('lab', 'C'),
}
# vaste donkere kleuren in een tekening die in de lichte stand een lichte tint krijgen (bibliotheekbestand blijft gelijk)
LICHT_VAST = {'plasmideKnipPlak': [("shape(ctx, '#22314D',", "shape(ctx, (C.bgSchema === '#FFFFFF' ? '#EEF2F7' : '#22314D'),")]}
LICHT = dict(bgMicro='#F4F6FA', bgSchema='#FFFFFF', fill='#E9EDF3', kast='#DDE3EC', text='#121C2E', text2='#4E5A6C',
             line='#6B7687', grain='#8A7A5A', goud='#C9961F', koraal='#C0583A', groen='#2F8A47', teal='#25729C',
             paars='#6550AD', oker='#A8822E', mens='#6B7687')
delen = ['/* beeldbank.js: GEBOUWD met bouw_beeldbank.py, niet met de hand aanpassen */', '(function () {', '"use strict";'.replace('"use strict";', '')]
for l in LIBS:
    delen.append(f'// ---- {l}\n' + top_var((R / l).read_text()))
delen.append('function circ(ctx, x, y, r, fill, stroke, lw = 1.5) { ctx.beginPath(); ctx.arc(x, y, Math.max(0.1, r), 0, 6.2832); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }  // zoals in de proefvellen')
for obj, (g, v) in VERSIE.items():
    js = (VR / g / obj / f'{v}.js').read_text()
    for oud, nieuw in LICHT_VAST.get(obj, []):
        assert oud in js, (obj, oud); js = js.replace(oud, nieuw)
    delen.append(f'// ---- {g}/{obj}/{v}.js\n' + top_var(js))
namen = ', '.join(VERSIE)
delen.append(f'''
const _DONKER = Object.assign({{}}, C), _LICHT = Object.assign({{}}, C, {__import__('json').dumps(LICHT)});
window.BB = {{ {namen}, C,
  thema(licht) {{ Object.assign(C, licht ? _LICHT : _DONKER); }} }};
}})();''')
uit = pathlib.Path(__file__).with_name('beeldbank.js')
uit.write_text('\n'.join(delen))
print('geschreven', uit, round(uit.stat().st_size / 1024), 'kB')
