# Opwaardering DNA 5 Mutaties 1.1 -> 1.2 (prompt v10). Leest orig.html, schrijft de film in de repo.
import json,sys,re
W='/tmp/claude-0/-home-claude/e75e0248-f5fb-529e-a3c8-e7a66e083834/scratchpad/dna_upgrade/dna5/'
REPO='/home/claude/biologie-/'
s=open(W+'orig.html',encoding='utf8').read()
n_ok=0
def rep(old,new,count=1):
    global s,n_ok
    c=s.count(old)
    if c!=count: sys.exit(f'FOUT: {c}x gevonden (verwacht {count}): {old[:90]!r}')
    s=s.replace(old,new); n_ok+=1
# --- FILMDATA met geknipte vwo-aankondigingen ---
L=s.split('\n'); i=[k for k,l in enumerate(L) if l.startswith('<script>window.FILMDATA=')][0]
D=json.load(open(W+'filmdata_nieuw.json',encoding='utf8'))
D['film']['footer']=D['film']['footer'].replace('versie 1.1','versie 1.2')
L[i]='<script>window.FILMDATA='+json.dumps(D,ensure_ascii=False)+';</script>'
s='\n'.join(L)
# --- geen korrel ---
rep("  if(look==='micro') grain(ctx);\n","  // geen korrel meer (BEELDAFSPRAKEN 15 okt 2026); cellen hebben hun eigen rustige cytoplasma-textuur\n")
# --- castboek als eigen script vlak voor het sceneblok ---
cast=open(REPO+'personages/lib_cast.js',encoding='utf8').read()
assert '</script' not in cast
rep("<script>// ===== DNA 5 · Mutaties — scenes (Part C) =====","<script>/* castboek (lib_cast.js, kopie 27 okt 2026) */\n"+cast+"\n</script>\n<script>// ===== DNA 5 · Mutaties — scenes (Part C) =====")
exec(open(W+'scenes_edits.py',encoding='utf8').read())
open(REPO+'films/dna/5-mutaties.html','w',encoding='utf8').write(s)
print('ok',n_ok,'vervangingen')
