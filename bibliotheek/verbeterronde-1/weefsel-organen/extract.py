# extract.py naam [naam...] -> print functietekst incl. receptcommentaar erboven uit lib_bio.js
import sys,re
L=open('/home/claude/biologie-/bibliotheek/lib_bio.js').read().split('\n')
def find(n):
  for i,l in enumerate(L):
    if l.startswith('function '+n+'('): break
  else: raise SystemExit('niet: '+n)
  s=i
  while s>0 and (L[s-1].startswith('//')): s-=1
  depth=0; j=i; started=False
  while True:
    for ch in L[j]:
      if ch=='{': depth+=1; started=True
      elif ch=='}': depth-=1
    if started and depth==0: break
    j+=1
  return '\n'.join(L[s:j+1])
print('\n\n'.join(find(n) for n in sys.argv[1:]))
