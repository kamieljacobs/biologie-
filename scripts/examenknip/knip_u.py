"""knip_u.py <niveau> <pdfmap> <uitmap> — knipt per vraag het deel van de uitwerkbijlage als webp (u<nr><a>.webp)."""
import pymupdf, re, sys, os, json, glob
niv, src, out = sys.argv[1:4]
Z = 1.7; X0, X1 = 40, 560
res = {}
for f in sorted(glob.glob(f'{src}/*-u.pdf')):
    m = re.search(r'-(\d\d)-(\d)-u', f); key = f'20{m[1]}-{"I" if m[2]=="1" else "II"}'
    d = pymupdf.open(f); res[key] = {}
    for pn in range(len(d)):
        lines = []
        for b in d[pn].get_text('dict')['blocks']:
            for l in b.get('lines', []):
                t = ''.join(s['text'] for s in l['spans']).strip()
                if t: lines.append((l['bbox'][1], l['bbox'][3], l['bbox'][0], l['spans'][0]['size'], 'Bold' in l['spans'][0]['font'], t))
        lines.sort()
        marks = [(y0, int(t)) for (y0, y1, x, sz, bo, t) in lines if 60 < x < 100 and t.isdigit() and 1 <= int(t) <= 60 and 9.5 <= sz <= 12.5]
        stops = [y0 for (y0, y1, x, sz, bo, t) in lines if re.match(r'Naam kandidaat|VW-1018|HA-1018|einde|VERGEET|lees verder', t)]
        # grafische inhoud ook meenemen: ondergrens = laagste tekst/tekening vóór een stop
        draw_bottom = max([r.y1 for r in [dr['rect'] for dr in d[pn].get_drawings()]] + [0])
        for i, (y, nr) in enumerate(marks):
            nxt = marks[i + 1][0] - 8 if i + 1 < len(marks) else min([s for s in stops if s > y] + [800]) - 6
            pix = d[pn].get_pixmap(matrix=pymupdf.Matrix(Z, Z), clip=pymupdf.Rect(X0, y - 8, X1, nxt))
            lst = res[key].setdefault(nr, []); fn = f'{key}/u{nr}{"abcdefgh"[len(lst)]}.webp'
            os.makedirs(f'{out}/{key}', exist_ok=True)
            from PIL import Image, ImageOps
            im = Image.frombytes('RGB', (pix.width, pix.height), pix.samples); bb = ImageOps.invert(im.convert('L')).point(lambda v: 255 if v > 20 else 0).getbbox()
            if bb: im = im.crop((0, 0, im.width, min(im.height, bb[3] + 16)))
            im.save(f'{out}/{fn}', 'WEBP', quality=62); lst.append(fn)
    print(niv, key, {k: len(v) for k, v in res[key].items()})
json.dump(res, open(f'{out}/{niv}_bijlage.json', 'w'), indent=0)
