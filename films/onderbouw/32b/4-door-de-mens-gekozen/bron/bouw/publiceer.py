# publiceer.py <filmmap> <slug>: film + audio + volledige bron naar de worktree; index-entry; draait de site-scripts
import json,os,shutil,subprocess,sys,re
D=os.path.abspath(sys.argv[1]); slug=sys.argv[2]; R='/home/claude/wt-32b'; T=f'{R}/films/onderbouw/32b/{slug}'
B=os.path.dirname(os.path.abspath(__file__))
os.makedirs(f'{T}/audio',exist_ok=True); shutil.copy(f'{D}/film/index.html',f'{T}/index.html')
for f in os.listdir(f'{D}/film/audio'): shutil.copy(f'{D}/film/audio/{f}',f'{T}/audio/{f}')
b=f'{T}/bron'; shutil.rmtree(b,ignore_errors=True); os.makedirs(b)
for f in ['script_v1.md','script_v2.md','script.md','docentdeel.md','begrippen.json','index_entry.json','tts_schatting','filmdata.json','info.md','STATUS.md','uitspraak.md','brief.md','draaiboek.md']:
    if os.path.exists(f'{D}/{f}'): shutil.copy(f'{D}/{f}',f'{b}/{f}')
shutil.copytree(f'{D}/src',f'{b}/src'); shutil.copytree(f'{D}/reviews',f'{b}/reviews')
os.makedirs(f'{b}/stem',exist_ok=True); shutil.copytree(f'{D}/stem/woordtijden',f'{b}/stem/woordtijden')
shutil.copy(f'{D}/segmenten.json',f'{b}/stem/segmenten_stem-invoer.json')
for f in ['generaties.json','tts.json']:
    if os.path.exists(f'{D}/stem/{f}'): shutil.copy(f'{D}/stem/{f}',f'{b}/stem/{f}')
shutil.copytree(B,f'{b}/bouw',ignore=shutil.ignore_patterns('__pycache__'))
os.makedirs(f'{b}/src/_base',exist_ok=True)
for f in os.listdir(f'{B}/../_base'): shutil.copy(f'{B}/../_base/{f}',f'{b}/src/_base/{f}')
shutil.copy(f'{B}/../_engine/player_block.html',f'{b}/src/_base/player_block.html')
if os.path.isdir(f'{D}/stijlframes'): shutil.copytree(f'{D}/stijlframes',f'{b}/stijlframes')
subprocess.run(["python3",f"{B}/index_invoegen.py",D],check=True); subprocess.run(["python3",f"{B}/orden32b.py"],check=True)
os.chdir(R)
for s in ['flipkaarten.py','teller.py','licentie_noot.py','vervolg_films.py']:
    r=subprocess.run(['python3',f'scripts/{s}'],capture_output=True,text=True); print(s,r.returncode,(r.stdout+r.stderr).strip().splitlines()[-1:] )
r=subprocess.run(['python3','scripts/spelerfix.py','--check',f'films/onderbouw/32b/{slug}/index.html'],capture_output=True,text=True); print('spelerfix',(r.stdout+r.stderr).strip()[-200:])
print('bk-vragen ontbreekt in:',subprocess.run(f"grep -L bk-vragen films/onderbouw/32b/*/index.html",shell=True,capture_output=True,text=True).stdout.strip() or '-')
