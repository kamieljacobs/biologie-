"""Bouwt Van molecuul tot biosfeer (2.0) opnieuw en zet het scèneblok in de site-HTML.

Gebruik (vanuit de repo-root):
  python3 films/cellen/van-molecuul-tot-biosfeer/bron/bouw/bouw_vmb.py <werkmap buiten de repo> [--stills]

Stappen: werkmap vullen (engine = src/ + bouw/, film = segments.json, film.py, sections.html, woordtijden, audio), scenes.js =
lib_cast + beeldbank-uittreksels + leen + kop + SCENES + teken_vmb + scenes_vmb, dan film.py → build_data.py → build.py
(standalone in <werkmap>/c1/film/), cuecheck, en splice_vmb.py zet alléén het scèneblok in films/cellen/van-molecuul-tot-biosfeer.html
(FILMDATA, speler en nabewerkingen blijven staan). Met --stills ook een contactvel (5 per alinea) in <werkmap>/qa.
Daarna in de repo: scripts/spelerfix.py, antwoordtekst.py, kortantwoord.py, antwoordletter.py (elk ook --check).

Uittreksels opnieuw maken na een wijziging in de bibliotheek:
  python3 bouw/bio_deel.py <bibliotheek/lib_bio.js> src/lib_bio_deel.js src/lib.js src/lib_voeding.js src/lib_hormonen.js src/kop.js src/lib_cast.js -- \\
     eiwitVouw celRond kernEnvelopPorie mitochondrionEcht spierVezel spierBundel hartDoorsnede bloedvat rodeBloedcel bacterieEcht \\
     gedifferentieerdeCellen mrnaSliert schaalStreep membraanBoog enzymKluwen dnaDraad injectiespuit zenuwcel DNA_BASE RNA_BASE D2 BIO
  python3 bouw/dier_deel.py <bibliotheek/dieren/lib_dieren.js> src/lib_dieren_deel.js
  python3 bouw/bio_deel.py <bibliotheek/dieren/lib_micro_evo.js> src/lib_micro_deel.js src/lib.js ... src/lib_dieren_deel.js -- griepVirus _mvL
"""
import os, sys, shutil, subprocess
B = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))        # bron/
FILM = os.path.dirname(B)                                               # films/cellen/van-molecuul-tot-biosfeer
SITE = FILM + '.html'
werk = os.path.abspath(sys.argv[1]); E = os.path.join(werk, 'eng'); F = os.path.join(werk, 'c1')
for d in (E, F): os.makedirs(d, exist_ok=True)
for f in os.listdir(os.path.join(B, 'src')): shutil.copy(os.path.join(B, 'src', f), E)
for f in os.listdir(os.path.join(B, 'bouw')): shutil.copy(os.path.join(B, 'bouw', f), E)
for f in ['segments.json', 'film.py', 'sections.html']: shutil.copy(os.path.join(B, f), F)
shutil.copytree(os.path.join(B, 'stem', 'woordtijden'), os.path.join(F, 'words'), dirs_exist_ok=True)
shutil.copytree(os.path.join(FILM, 'audio'), os.path.join(F, 'film', 'van-molecuul-tot-biosfeer', 'audio'), dirs_exist_ok=True)
delen = ['lib_cast.js', 'lib_bio_deel.js', 'lib_dieren_deel.js', 'lib_micro_deel.js', 'leen_vmb.js', 'kop.js', '#SCENES', 'teken_vmb.js', 'scenes_vmb.js']
out = ['const SCENES = {};' if d == '#SCENES' else open(os.path.join(E, d), encoding='utf-8').read() for d in delen]
open(os.path.join(F, 'scenes.js'), 'w', encoding='utf-8').write('// Cellen · Van molecuul tot biosfeer 2.0 — scènes (bron: bron/src/, gebouwd met bron/bouw/bouw_vmb.py)\n' + '\n'.join(out))
run = lambda *a, cwd=F: subprocess.run(a, cwd=cwd, check=True)
run('python3', 'film.py'); run('python3', os.path.join(E, 'build_data.py'), '.'); run('python3', os.path.join(E, 'build.py'), '.')
run('python3', os.path.join(E, 'cuecheck_vmb.py'), os.path.join(E, 'scenes_vmb.js'), os.path.join(F, 'filmdata.json'))
run('python3', os.path.join(E, 'splice_vmb.py'), SITE, os.path.join(F, 'scenes.js'))
if '--stills' in sys.argv: subprocess.run(['python3', os.path.join(E, 'stills.py'), F, os.path.join(werk, 'qa'), 'contact'], env=dict(os.environ, FIVE='1'), check=True)
print('klaar: site-HTML bijgewerkt; draai nu de site-scripts (zie docstring)')
