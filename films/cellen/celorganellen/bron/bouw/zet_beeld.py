"""zet_beeld.py — zet het beeld van Celorganellen 2.0 in index.html (30 okt 2026).
Vervangt alleen de twee scriptblokken met beeldcode (LIB = lib.js, SCENES = lib_cast + lib_anatomie + lib_bio_deel + celhulp +
scenes) en de titelkaart; filmdata, speler (met spelerfix, kortantwoord enz.), begrippen en pagina blijven staan.
Draaien vanuit de map van de film:  python3 bron/bouw/zet_beeld.py
lib_bio_deel.js opnieuw maken (na een wijziging in bibliotheek/lib_bio.js):
  python3 bron/bouw/bio_deel.py ../../../bibliotheek/lib_bio.js bron/src/lib_bio_deel.js bron/src/lib.js bron/src/lib_cast.js bron/src/lib_anatomie.js -- \
    celDier kernEnvelopPorie mitochondrionEcht golgiStapel ruwER blaasjeVersmelt eiwitVouw mrnaSliert ribosoomEcht chloroplastEcht plantencel \
    membraanBoog enzymKluwen rnaPolymerase dnaLadderHelix membraanReceptor bacterieEcht rodeBloedcel DNA_BASE RNA_BASE
"""
import re, sys
H = 'index.html'; src = 'bron/src/'
h = open(H, encoding='utf-8').read()
lees = lambda f: open(src + f, encoding='utf-8').read()
# 1. LIB-blok
a = h.index('<script>// ===== Part C tokens ====='); b = h.index('</script>', a)
h = h[:a] + '<script>' + lees('lib.js') + '\n' + h[b:]
# 2. SCENES-blok (begint met de castbibliotheek, eindigt met de scènes)
a = h.index('<script>// ===== Vaste personages'); b = h.index('</script>', a)
blok = '\n'.join(lees(f) for f in ['lib_cast.js', 'lib_anatomie.js', 'lib_bio_deel.js', 'celhulp.js', 'scenes.js'])
assert '</script' not in blok
h = h[:a] + '<script>' + blok + '\n' + h[b:]
# 3. titelkaart: de kliercel uit de beeldbank in plaats van de oude tekening
oud = re.search(r"  const L=cellLayout\(1420,540,400,250\);[^\n]*drawCell\(ctx,L,t,\{motion:0\.3\}\); ctx\.restore\(\); \}", h)
if oud: h = h.replace(oud.group(0), "  ctx.save(); ctx.globalAlpha=ramp(t,0.6,1); celDier(ctx,1420,520,0.62,{t,exo:true}); ctx.restore(); }")
# 4. versie op de eindkaart en in de footer
h = h.replace("versie 1.2 · oktober 2026", "versie 2.0 · oktober 2026")
h = re.sub(r"Versie 1\.5 · 22 oktober 2026\.", "Versie 2.0 · 30 oktober 2026 (beeld-remake op prompt v13; stem en script van versie 1.5).", h)
open(H, 'w', encoding='utf-8').write(h)
print('ok', len(h), 'titel vervangen' if oud else 'titel NIET gevonden')
