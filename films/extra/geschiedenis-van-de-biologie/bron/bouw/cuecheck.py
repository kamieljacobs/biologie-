import json,re,sys,glob
F=sys.argv[1]; src=open(f'{F}/scenes.js').read()
norm=lambda s:re.sub(r'[^a-zà-ÿ0-9]','',s.lower())
parts=re.split(r'\n  (s\d\d)\(ctx', src)
for i in range(1,len(parts),2):
  sid=parts[i]; body=parts[i+1]; W=json.load(open(f'{F}/words/{sid}.json'))['words']
  for m in re.finditer(r"q\.(?:on|at)\('([^']+)'(?:,\s*(\d+))?",body):
    w,n=m.group(1),int(m.group(2) or 1); hits=[x for x in W if norm(w) in norm(x['text'])]
    if len(hits)<n: print(sid,'MIST',w,n)
    elif norm(hits[n-1]['text'])!=norm(w): print(sid,f"{w}/{n} -> {hits[n-1]['text']}@{hits[n-1]['start']:.1f}")
