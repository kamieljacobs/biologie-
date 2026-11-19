import re, json, sys, os
d = sys.argv[1]; src = open(sys.argv[2]).read()
for m in re.finditer(r"\n  (s\d\d)\(ctx, t, q\) \{(.*?)(?=\n  s\d\d\(ctx|\n\}\);)", src, re.S):
    sid, body = m.group(1), m.group(2); f = os.path.join(d, 'words', sid + '.json')
    if not os.path.exists(f): print(sid, 'geen woorden'); continue
    W = [w['text'].lower() for w in json.load(open(f))['words']]
    for c in re.finditer(r"q\.(?:on|at)\('([^']+)'(?:,\s*(\d+))?", body):
        w, n = c.group(1).lower(), int(c.group(2) or 1)
        hits = sum(1 for x in W if w in x)
        if hits < n: print(sid, 'MIST', repr(c.group(1)), n, 'hits', hits)
print('klaar')
