"""knip_c.py <niveau> <pdfmap> <uitmap> — knipt per vraag het antwoord uit het correctievoorschrift (beoordelingsmodel) als webp."""
import pymupdf, re, sys, os, json, glob
niv, src, out = sys.argv[1:4]
Z = 1.7; X0, X1 = 40, 560; TOP, BOT = 32, 772
res = {}
for f in sorted(glob.glob(f'{src}/*-c.pdf')):
    m = re.search(r'-(\d\d)-(\d)-c', f); key = f'20{m[1]}-{"I" if m[2]=="1" else "II"}'
    d = pymupdf.open(f); lines = []
    start_pn = next(pn for pn in range(len(d)) if 'Beoordelingsmodel' in d[pn].get_text())
    for pn in range(start_pn, len(d)):
        for b in d[pn].get_text('dict')['blocks']:
            for l in b.get('lines', []):
                t = ''.join(s['text'] for s in l['spans']).strip()
                if not t: continue
                s0 = l['spans'][0]; y0, y1 = l['bbox'][1], l['bbox'][3]
                if y0 > BOT or y0 < TOP: continue
                lines.append((pn, y0, y1, l['bbox'][0], s0['size'], 'Bold' in s0['font'], t))
    lines.sort(key=lambda r: (r[0], r[1]))
    kopy = {}
    for r in lines:
        if r[6] == 'Vraag' and r[5] and r[4] <= 9.6 and r[3] < 80: kopy[r[0]] = r[2] + 3
    lines = [r for r in lines if r[1] >= kopy.get(r[0], 0) - 1 or r[4] >= 13]
    koppen = [r for r in lines if r[4] >= 13 and r[5]]
    marks = []
    for r in lines:
        if r[5] and 75 < r[3] < 95 and 9 <= r[4] <= 11.5 and r[6].isdigit():
            nr = int(r[6])
            if (not marks or nr == marks[-1][2] + 1) and nr <= 60: marks.append((r[0], r[1], nr))
    stop_kop = [k for k in koppen if re.search(r'Aanleveren|Bronvermelding|Uitwerkbijlage', k[6])]
    eind_all = (stop_kop[0][0], stop_kop[0][1] - 4) if stop_kop else (len(d) - 1, BOT)
    os.makedirs(f'{out}/{key}', exist_ok=True); res[key] = {}
    for i, (pn, y, nr) in enumerate(marks):
        nxt = (marks[i + 1][0], marks[i + 1][1] - 4) if i + 1 < len(marks) else eind_all
        tussen = [k for k in koppen if (pn, y) < (k[0], k[1]) < nxt]
        if tussen: nxt = (tussen[0][0], tussen[0][1] - 6)
        stukken = []
        for q in range(pn, nxt[0] + 1):
            a = y - 4 if q == pn else kopy.get(q, TOP)
            b = nxt[1] if q == nxt[0] else BOT
            # laatste regel met inhoud op deze pagina binnen [a,b]
            inh = [r[2] for r in lines if r[0] == q and a <= r[1] < b]
            if not inh: continue
            b = min(b, max(inh) + 6)
            pix = d[q].get_pixmap(matrix=pymupdf.Matrix(Z, Z), clip=pymupdf.Rect(X0, a, X1, b))
            fn = f'{key}/a{nr}{"abcdefgh"[len(stukken)]}.webp'; pix.pil_save(f'{out}/{fn}', format='WEBP', quality=62); stukken.append(fn)
        res[key][nr] = stukken
    print(key, len(marks), 'antwoorden', marks[-1][2] if marks else '')
json.dump(res, open(f'{out}/{niv}_antw.json', 'w'), indent=0)
