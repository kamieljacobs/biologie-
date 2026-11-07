"""Maakt de lichte versies van de preparaatfoto's voor de microscoop (echt.html).
De originelen (tot 2560 px, ±0,9 MB) blijven staan voor het fotoverzicht en films;
de tool laadt fotos/klein/<naam>.webp: 1152 px hoog (= 1,6 × het oculair van 720 px,
dus 1-op-1 met het canvas), webp kwaliteit 72, ±250 kB.
Draaien vanuit tools/virtuele-microscoop:  python3 fotos/klein_maken.py  (idempotent)."""
import json, os
from PIL import Image
H, Q = 1152, 72
cat = json.load(open('fotos/catalogus.json'))
nieuw = 0
for f in cat['fotos']:
    b = f.get('bestand')
    if not b or not f.get('vergroting'):
        continue
    uit = os.path.join('fotos/klein', os.path.splitext(os.path.basename(b))[0] + '.webp')
    if os.path.exists(uit):
        continue
    im = Image.open(os.path.join('fotos', b)).convert('RGB')
    if im.height > H:
        im = im.resize((round(im.width * H / im.height), H), Image.LANCZOS)
    im.save(uit, 'WEBP', quality=Q, method=6)
    nieuw += 1
print('nieuw:', nieuw, '· totaal kB:', sum(os.path.getsize('fotos/klein/' + x) for x in os.listdir('fotos/klein')) // 1024)
