"""knip.py <niveau> <pdfmap> <uitmap> — knipt per examenvraag de bijbehorende stukken uit het opgavenboekje (info sinds de vorige vraag + de vraag zelf) als webp."""
import pymupdf, re, sys, os, json, glob
niv, src, out = sys.argv[1:4]
Z = 1.7; X0, X1 = 40, 560; TOP, BOT = 32, 772
res = {}
for f in sorted(glob.glob(f'{src}/*-o*.pdf')):
    m = re.search(r'-(\d\d)-(\d)-o', f); key = f'20{m[1]}-{"I" if m[2]=="1" else "II"}'
    d = pymupdf.open(f); marks = []  # (page, y, nr, punten)
    lines = []  # (page, y0, y1, x, size, bold, text)
    for pn in range(len(d)):
        for b in d[pn].get_text('dict')['blocks']:
            for l in b.get('lines', []):
                t = ''.join(s['text'] for s in l['spans']).strip()
                if not t: continue
                s0 = l['spans'][0]; y0, y1 = l['bbox'][1], l['bbox'][3]
                if y0 > BOT or y1 < TOP - 5: continue
                lines.append((pn, y0, y1, l['bbox'][0], s0['size'], 'Bold' in s0['font'], t))
    lines.sort(key=lambda r: (r[0], r[1]))
    for i, (pn, y0, y1, x, sz, bo, t) in enumerate(lines):
        mp = re.fullmatch(r'(\d+)p', t)
        if mp and x < 75 and sz <= 9:
            nr = next((int(r[6]) for r in lines if r[0] == pn and abs(r[1] - y0) < 8 and 70 < r[3] < 100 and r[6].isdigit()), None)
            if nr: marks.append((pn, y0, nr, int(mp[1])))
    # titels van opgaven: vet, groot (>=13), x ~ 82
    titels = [(pn, y0) for (pn, y0, y1, x, sz, bo, t) in lines if sz >= 13 and bo and x < 100]
    # einde van elke vraag: volgende regels zolang de tussenruimte klein blijft
    def einde(pn, y):
        last = y + 15
        for r in lines:
            if r[0] != pn or r[1] < y - 2: continue
            if r[1] - last > 8 and r[1] > y + 1: break
            last = max(last, r[2])
        return last
    os.makedirs(f'{out}/{key}', exist_ok=True)
    vorige = None; res[key] = {}
    for (pn, y, nr, p) in marks:
        e = einde(pn, y)
        # begin: einde vorige vraag, of een opgavetitel ertussen
        start = (vorige[0], vorige[1] + 4) if vorige else (0, TOP)
        tt = [t for t in titels if (t[0], t[1]) > start and (t[0], t[1]) < (pn, y)]
        if tt: start = (tt[-1][0], tt[-1][1] - 6)
        stukken = []
        for q in range(start[0], pn + 1):
            a = start[1] if q == start[0] else TOP
            b = e + 6 if q == pn else BOT
            if b - a < 12: continue
            pix = d[q].get_pixmap(matrix=pymupdf.Matrix(Z, Z), clip=pymupdf.Rect(X0, a, X1, b))
            fn = f'{key}/{nr}{"abcdefgh"[len(stukken)]}.webp'
            pix.pil_save(f'{out}/{fn}', format='WEBP', quality=62)
            stukken.append(fn)
        # vraagtekst (de vraag zelf)
        vt = ' '.join(r[6] for r in lines if r[0] == pn and y - 6 <= r[1] < e and r[3] > 95)
        res[key][nr] = {'p': p, 'img': stukken, 'tekst': vt}
        vorige = (pn, e)
    print(key, len(marks), 'vragen')
json.dump(res, open(f'{out}/{niv}_knip.json', 'w'), ensure_ascii=False, indent=0)
