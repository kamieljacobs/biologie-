"""bio_deel.py <lib_bio.js> <uit.js> <reeds-gedefinieerd.js ...> -- naam1 naam2 ...
Haalt de gevraagde functies uit lib_bio.js met alles waar ze (recursief) van afhangen, behalve namen die de film zelf al definieert."""
import re, sys
args = sys.argv[1:]; i = args.index('--'); src, uit, film = args[0], args[1], args[2:i]; want = args[i + 1:]
txt = open(src, encoding='utf-8').read()
DECL = re.compile(r'^(?:async\s+)?(?:function\s+([A-Za-z_$][\w$]*)|(?:const|let|var)\s+([A-Za-z_$][\w$]*))', re.M)
starts = [(m.start(), m.group(1) or m.group(2)) for m in DECL.finditer(txt)]
blocks = {}
for k, (s, n) in enumerate(starts):
    e = starts[k + 1][0] if k + 1 < len(starts) else len(txt)
    # neem commentaarregels direct boven de volgende declaratie niet mee: knip af bij laatste niet-commentaarregel
    body = txt[s:e]
    lines = body.rstrip('\n').split('\n')
    while len(lines) > 1 and (lines[-1].startswith('//') or not lines[-1].strip()): lines.pop()
    blk = '\n'.join(lines); blocks.setdefault(n, []).append((s, blk))
    for extra in re.findall(r';\s*(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=', lines[0]):
        if extra != n: blocks.setdefault(extra, []).append((s, blk))
eigen = set()
for f in film:
    for m in DECL.finditer(open(f, encoding='utf-8').read()): eigen.add(m.group(1) or m.group(2))
IDENT = re.compile(r'[A-Za-z_$][\w$]*')
need, todo = set(), list(want)
while todo:
    n = todo.pop()
    if n in need or n not in blocks or (n in eigen and n not in want): continue
    need.add(n)
    for _, b in blocks[n]:
        for t in set(IDENT.findall(b)):
            if t in blocks and t not in need: todo.append(t)
parts = sorted(set((s, b) for n in need for s, b in blocks[n]))
out = '// Uittreksel uit bibliotheek/lib_bio.js (alleen wat deze film gebruikt), gemaakt met bio_deel.py\n// Gevraagd: ' + ', '.join(want) + '\n' + '\n'.join(b for _, b in parts) + '\n'
open(uit, 'w', encoding='utf-8').write(out)
botst = sorted(need & eigen)
print('functies', len(need), 'bytes', len(out), 'botst met film (overgenomen uit lib_bio):', botst)
