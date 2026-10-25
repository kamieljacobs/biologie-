import random,json,re,sys,os
d=sys.argv[1]; os.makedirs(f'{d}/werk/blind',exist_ok=True)
l=['X','Y','Z'];random.shuffle(l);k=dict(zip(l,['A','B','C']))
for lab,v in k.items():
    t=open(f'{d}/werk/script_{v}.md').read()
    i=t.find('## Cold open'); i = i if i>=0 else t.find('\n## ')
    body=t[i:]
    body=re.sub(r'(?i)\b(script|variant) [ABC]\b','\\1',body)
    open(f'{d}/werk/blind/variant_{lab}.md','w').write(f'# Variant {lab}\n\n'+body)
json.dump(k,open(f'{d}/werk/blind/sleutel.json','w'))
print(d,k)
