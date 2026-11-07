# python3 ex.py naam1 [naam2..] -> drukt functies (met commentaar erboven) uit lib_bio.js af
import sys,re
L=open('/home/claude/biologie-/bibliotheek/lib_bio.js').read().split('\n')
def blok(n):
  s=next(i for i,l in enumerate(L) if re.match(r'function '+n+r'\(',l))
  c=s
  while c>0 and (L[c-1].startswith('//')): c-=1
  e=s+1
  while e<len(L) and not re.match(r'(function |const |let |var |// ====|// ----|// [A-Z]{4})',L[e]) : e+=1
  while L[e-1].strip()=='' : e-=1
  return '\n'.join(L[c:e])
print('\n\n'.join(blok(n) for n in sys.argv[1:]))
