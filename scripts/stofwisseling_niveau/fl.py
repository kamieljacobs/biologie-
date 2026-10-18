import json,re,sys
def load(path):
    L=open(path,encoding='utf-8').read().split('\n')
    for i,l in enumerate(L):
        if l.startswith('window.FILM = '):
            s=l[len('window.FILM = '):].rstrip()
            if s.endswith(';'): s=s[:-1]
            return L,i,json.loads(s)
    raise SystemExit('no FILM')
def save(path,L,i,F):
    L[i]='window.FILM = '+json.dumps(F,ensure_ascii=False,separators=(',',':'))+';'
    open(path,'w',encoding='utf-8').write('\n'.join(L))
