"""splice.py <live index.html> <uit>: vervangt in de live film alleen het scèneblok (lib_cast + beeldbank + scenes),
de titelwolk en de versieregels; nabewerkingen van de site (spelerfix, flipkaarten, oefenen, teller, licentie) blijven staan."""
import sys, re
live = open(sys.argv[1], encoding='utf-8').read()
blok = '\n'.join(open('src/' + f, encoding='utf-8').read() for f in ['lib_cast.js', 'voeding_deel.js', 'lib_bio_deel.js', 'scenes_lib.js', 'scenes_mol.js', 'scenes.js'])
start = live.index('<script>// ===== Vaste personages')
eind = live.index('</script>', live.index('\nconst SCENES = {', start))
live = live[:start] + '<script>' + blok + '\n' + live[eind:]
R = [("ctx.fillStyle=i%5? rgba(C.goud,0.85): C.koraal; ctx.beginPath(); ctx.arc(x,y,6,0,6.283); ctx.fill(); }",
      "if(i%2) kleurstof(ctx,x,y,0.9,hash(i)*6.283+t*0.3,0.9); else h2o(ctx,x,y,4.5,hash(i*5)*6.283+t*0.4,0.6); }"),
     ("versie 1.2 · 16 oktober 2026", "versie 2.0 · 29 oktober 2026"),
     ("Versie 1.2 · 16 oktober 2026.", "Versie 2.0 · 29 oktober 2026 (beeld opnieuw getekend; stem en script van versie 1.2).")]
for a, b in R:
    assert live.count(a) == 1, a
    live = live.replace(a, b)
open(sys.argv[2], 'w', encoding='utf-8').write(live)
print('ok', len(live))
