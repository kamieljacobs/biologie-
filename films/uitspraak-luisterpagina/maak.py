import json, re, subprocess, os, collections
d = json.load(open('open.json'))
print(collections.Counter(c['timing'] for w in d for c in w['clips']))
def kans(w):
    s = w['woord']
    if w.get('reden'): return 'hoog'
    if re.search(r'[A-Z]{2,}|\d', s): return 'hoog'          # afkortingen, B6
    if w.get('gewenst'): return 'hoog'
    if re.search(r'(th|ph|sh|ch[^t]|y|q|x|c[eiy]|ae|oe$|é|ï|ü|w[^aeiou]|ou?gh)', s.lower()) and not re.search(r'(isch|sch)', s.lower()): return 'hoog'
    if s[:1].isupper(): return 'hoog'                          # namen
    if len(w['plekken']) >= 4: return 'midden'
    return 'laag'
for w in d: w['kans'] = kans(w)
print(collections.Counter(w['kans'] for w in d))
order = {'hoog':0,'midden':1,'laag':2}
d.sort(key=lambda w: (order[w['kans']], -len(w['plekken']), w['woord'].lower()))
# sprites: ~250 clips per file
os.makedirs('pagina/audio', exist_ok=True)
clips = [(w, c) for w in d for c in w['clips']]
per = 260; nfile = 0
for i in range(0, len(clips), per):
    chunk = clips[i:i+per]; nfile += 1; lst = f'pagina/lst{nfile}.txt'; pos = 0.0
    with open(lst, 'w') as f:
        for w, c in chunk:
            dur = float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0', c['bestand']]).strip())
            c['spr'] = [nfile, round(pos, 3), round(dur, 3)]
            f.write(f"file '{os.path.abspath(c['bestand'])}'\nfile '{os.path.abspath('pagina/stil.mp3')}'\n")
            pos += dur + 0.4
    if not os.path.exists('pagina/stil.mp3'):
        subprocess.run(['ffmpeg','-v','error','-f','lavfi','-i','anullsrc=r=44100:cl=mono','-t','0.4','-b:a','64k','pagina/stil.mp3'], check=True)
    subprocess.run(['ffmpeg','-v','error','-y','-f','concat','-safe','0','-i',lst,'-ac','1','-ar','44100','-b:a','48k','-write_xing','0', f'pagina/audio/deel{nfile}.mp3'], check=True)
out = [{'id':w['id'],'w':w['woord'],'g':w['gewenst'],'s':w['stem'],'k':w['kans'],'r':w.get('reden',''),
        'p':[[p['film'],p['sid']] for p in w['plekken']],
        'c':[{'f':c['film'],'z':c['zin'],'x':c['spr'],'v':'verruimd' in c['timing']} for c in w['clips']]} for w in d]
json.dump(out, open('pagina/data.json','w'), ensure_ascii=False, separators=(',',':'))
print(nfile, 'delen', os.path.getsize('pagina/data.json')//1024, 'kB')
