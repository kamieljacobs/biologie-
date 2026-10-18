"""script.md bijwerken met havo/vwo (18 okt 2026). python3 script_md.py <script.md> <werkmap> <stem.json>
stem.json: {take: stem-invoer}"""
import json, re, sys, os
sys.path.insert(0, os.path.dirname(__file__))
import fl


def main(md, wd, stemf):
    STEM = json.load(open(stemf, encoding='utf-8'))
    L, li, F = fl.load(os.path.join(wd, 'film.src.html'))
    lines = open(md, encoding='utf-8').read().split('\n')
    out = []; ci = None; done = set()
    for ln in lines:
        m = re.match(r'^## (\d+)\. ', ln)
        if m: ci = int(m.group(1))
        c = F['chapters'][ci] if ci is not None else None
        if c is not None and ln.startswith('Niveau: 6 vwo'):
            if c.get('vwoAll'): ln = ln.replace('Niveau: 6 vwo', 'Niveau: **alleen vwo** (havo slaat dit hoofdstuk over)')
            elif c.get('blocks'): ln = ln.replace('Niveau: 6 vwo', 'Niveau: havo + vwo, met vwo-blok(ken) *(vwo)*' + (' en havo-alinea [havo]' if c.get('ins') else ''))
            else: ln = ln.replace('Niveau: 6 vwo', 'Niveau: havo + vwo (basis)')
            ln = ln.replace(' · bevat verdiepingszinnen', '')
        pm = re.match(r'^\[(\d+:\d\d\.\d)\] (.*?)(  )?$', ln)
        if c is not None and pm:
            txt = pm.group(2).replace(' *(verdieping)*', '')
            ph = next((p for p in c['phrases'] if p['text'] == txt and not p.get('havo')), None)
            if ph is not None:
                # havo-invoeging vóór deze frase?
                for h in c.get('ins', []):
                    if h['take'] in done: continue
                    if ph['t0'] >= h['Pn'] + h['D'] - 1e-6:
                        out.append(f'**Take {h["take"]} [havo]** · nieuw 18-10-2026 · hoofdstuk {h["Pn"]:.2f}–{h["Pn"] + h["D"]:.2f} s (stem {h["Pn"] + 0.15:.2f} s), alleen havo  ')
                        for s in c['sentences']:
                            if s.get('lvl') == 'havo' and s['take'] == h['take']:
                                out.append(f'[havo · {s["t0"]:.2f} s] {s["text"]}  ')
                        out.append(f'> Stem-invoer (Roos, eleven_multilingual_v2, 1 take): {STEM[str(ci) + ":" + h["take"]]}  ')
                        out.append('')
                        done.add(h['take'])
                end = pm.group(3) or ''
                if ph.get('vwo') or c.get('vwoAll'):
                    ln = f'[{pm.group(1)}] {txt} *(vwo)*{end}'
                else:
                    ln = f'[{pm.group(1)}] {txt}{end}'
        out.append(ln)
    open(md, 'w', encoding='utf-8').write('\n'.join(out))
    miss = [(ci, h['take']) for ci, c in enumerate(F['chapters']) for h in c.get('ins', []) if h['take'] not in done]
    if miss: raise SystemExit(f'niet geplaatst: {miss}')


if __name__ == '__main__':
    main(*sys.argv[1:4])
