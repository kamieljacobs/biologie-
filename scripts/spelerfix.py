#!/usr/bin/env python3
"""Spelerfix (20 okt 2026): bij Vragen uit geen restje van de gesproken vraag meer, en kortere hoofdstukkaart.

Gebruik:
    python3 scripts/spelerfix.py [bestand ...]      # zonder argumenten: alle films + bronnen in de repo
    python3 scripts/spelerfix.py --check [bestand ...]

Werkt op film-HTML's én op spelerbronnen (player.js, player_block.html, page.html). Idempotent:
een bestand dat de fix al heeft (marker SPELERFIX_MARK) wordt niet nog eens aangepast.

FILMDATA-speler (hoofdengine, DNA-bouwstraat, onderbouw-Uitgelegd-engine; zie films/BRONMAPPEN.md):
  1. knipMarge(seg,cuts): een knip die op een zinsgrens begint, begint 0,25 s vóór het eerste
     woord (Scribe-starttijden liggen tot 0,12 s te laat; de pauze tussen zinnen is >= 0,26 s),
     maar nooit vóór (vorig woord.s + 0,1). Het hervatpunt na een knip ligt 0,1 s vóór het woord.
  2. knipCheck(it): demp de audio (muted) al iets vóór het knippunt (vooruitkijken 0,03 s x snelheid),
     spring dan; demping blijft tot 'seeked' + 40 ms. Loopt de knip tot het einde van de alinea,
     dan pauzeren en direct door naar het volgende item (geen seek naar het einde).
     Controle in requestAnimationFrame (tick) én in 'timeupdate' (achtergrondtabblad).
  3. Hoofdstukkaart: CARD_DUR 2,2 -> 1,3 s (haaienfilm 3,5 -> 1,8 s); de kaart loopt niet sneller
     dan 1x mee met de afspeelsnelheid (bij 1,5x blijft hij 1,3 s), fades 0,3 s.
De oudere bouwvormen (window.FILM, const TL, __TIMELINE__, TIMELINE, Onderzoek doen, DNA-technieken)
krijgen hun eigen variant; zie /home/claude/hw/SPELER_FIX.md.
"""
import re, sys, glob, os, json

MARK = 'SPELERFIX_MARK'
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ---------------------------------------------------------------- FILMDATA-speler
FD_HELPERS_V1 = (
    "/*SPELERFIX_MARK v1 20okt2026*/ "
    "function knipMarge(seg,cuts){ const w=seg.words||[]; "
    "for(const c of cuts){ const i=w.findIndex(x=>x.s>=c[0]-0.001); "
    "if(i>0&&/[.?!]$/.test(w[i-1].t)) c[0]=Math.max(Math.min(c[0],w[i].s-0.25),w[i-1].s+0.1); "
    "else if(i===0) c[0]=Math.min(c[0],Math.max(0,w[0].s-0.25)); "
    "const j=w.findIndex(x=>x.s>=c[1]-0.001); "
    "if(j>0&&w[j].s-c[1]<0.12&&/[.?!]$/.test(w[j-1].t)) c[1]=Math.max(Math.min(c[1],w[j].s-0.1),w[j-1].s+0.1,c[0]); } "
    "const m=knipSamen(cuts); cuts.length=0; m.forEach(x=>cuts.push(x)); return cuts; } "
)
# v2: knipgrenzen op de echte stilte in de audio (fetch + decodeAudioData, 10 ms-energie), anders een marge van 0,18 s
FD_HELPERS = (
    "/*SPELERFIX_MARK v2 20okt2026: knippen op de echte stilte*/ "
    "const KNIP_ENV={}; "
    "function knipEnv(seg){ const u=seg.audio; if(!u||KNIP_ENV[u]) return; KNIP_ENV[u]='bezig'; "
    "try{ const OAC=window.OfflineAudioContext||window.webkitOfflineAudioContext; "
    "fetch(u).then(r=>{ if(!r.ok) throw 0; return r.arrayBuffer(); }).then(b=>new OAC(1,16000,16000).decodeAudioData(b)).then(buf=>{ "
    "const x=buf.getChannelData(0), hop=Math.round(buf.sampleRate/100), n=Math.floor(x.length/hop), e=new Float32Array(n); "
    "for(let i=0;i<n;i++){ let q=0; for(let k=i*hop;k<(i+1)*hop;k++) q+=x[k]*x[k]; e[i]=Math.sqrt(q/hop); } "
    "const so=Array.from(e).sort((a,b)=>a-b); KNIP_ENV[u]={e,thr:Math.max(0.002,(so[Math.floor(n*0.9)]||0)*0.03)}; knipHerzie(u); "
    "}).catch(()=>{ KNIP_ENV[u]='mis'; }); }catch(err){ KNIP_ENV[u]='mis'; } } "
    "function knipRun(env,t0,t1){ const e=env.e, i0=Math.max(0,Math.floor(t0*100)), i1=Math.min(e.length-1,Math.floor(t1*100)); let end=-1,run=0; "
    "for(let i=i1;i>=i0;i--){ if(e[i]<env.thr){ if(end<0) end=i; run++; } else { if(run>=3) return [(i+1)/100,(end+1)/100]; end=-1; run=0; } } "
    "return run>=3?[i0/100,(end+1)/100]:null; } "
    "function knipMin(env,t0,t1){ let b=-1,v=1e9; for(let i=Math.max(0,Math.floor(t0*100));i<=Math.min(env.e.length-1,Math.floor(t1*100));i++) if(env.e[i]<v){ v=env.e[i]; b=i; } return b<0?null:(b+0.5)/100; } "
    "function knipMarge(seg,cuts){ const w=seg.words||[], env=KNIP_ENV[seg.audio]; if(!cuts._o) cuts._o=cuts.map(c=>c.slice()); if(!env) knipEnv(seg); "
    "const goed=env&&env.e, nw=cuts._o.map(c=>c.slice()); "
    "for(const c of nw){ const i=w.findIndex(x=>x.s>=c[0]-0.001); "
    "if(i>=0&&w[i].s-c[0]<0.12&&c[0]>0.05){ const q=w[i].s, p=w[i-1], bodem=p?p.s+0.08:0; "
    "if(goed){ const r=knipRun(env,q-0.45,q+0.02); let t; if(r){ const g=r[1]-r[0]; t=g>=0.17?r[1]-0.12:r[0]+Math.min(0.05,g/2); } else t=knipMin(env,q-0.3,q+0.02); if(t!==null) c[0]=Math.max(bodem,Math.min(t,q)); } "
    "else if(!p||/[.?!:]$/.test(p.t)) c[0]=Math.max(bodem,Math.min(c[0],q-0.18)); } "
    "const j=w.findIndex(x=>x.s>=c[1]-0.001); "
    "if(goed&&j>0&&w[j].s-c[1]<0.12){ const q=w[j].s, r=knipRun(env,q-0.45,q+0.02); let t=r?Math.max(r[0],r[1]-0.03):knipMin(env,q-0.3,q+0.02); if(t!==null) c[1]=Math.max(c[0]+0.01,w[j-1].s+0.08,Math.min(t,q)); } } "
    "const m=knipSamen(nw); cuts.length=0; m.forEach(x=>cuts.push(x)); return cuts; } "
    "function knipHerzie(u){ let raak=false; for(const it of (state.items||[])){ if(it.type==='speech'&&it.seg&&it.seg.audio===u&&it.cuts&&it.cuts._o){ knipMarge(it.seg,it.cuts); it.dur=it.seg.dur-it.cuts.reduce((a,c)=>a+c[1]-c[0],0); raak=true; } } "
    "if(raak){ let t=0; for(const it of state.items){ it.start=t; t+=it.dur; } state.total=t; } } "
)
FD_CHECK = (
    "/*SPELERFIX_MARK knip*/ let knipStil=false, knipTimer=0; "
    "function knipVrij(){ clearTimeout(knipTimer); if(knipStil){ knipStil=false; audio.muted=false; } } "
    "function knipCheck(it){ const t=state.local, vooruit=0.03*(state.snelheid||1); "
    "const cc=(it.cuts||[]).find(c=>t+vooruit>=c[0]&&t<c[1]-0.03); if(!cc) return; "
    "audio.muted=true; knipStil=true; clearTimeout(knipTimer); "
    "const eind=Math.min(it.seg.dur||1e9,isFinite(audio.duration)?audio.duration:1e9); "
    "if(cc[1]>=eind-0.05){ audio.pause(); state.local=cc[1]; return; } "
    "audio.currentTime=cc[1]; state.local=cc[1]; "
    "const vrij=()=>{ clearTimeout(knipTimer); knipTimer=setTimeout(()=>{ if(knipStil){ knipStil=false; audio.muted=false; } },40); }; "
    "audio.addEventListener('seeked',vrij,{once:true}); knipTimer=setTimeout(vrij,400); } "
    "audio.addEventListener('timeupdate',()=>{ const it=state.items[state.idx]; "
    "if(!state.playing||!it||it.type!=='speech'||audio.paused) return; state.local=audio.currentTime; knipCheck(it); "
    "if(state.items[state.idx]===it&&aud2it(it,state.local)>=it.dur-0.02) next(); });\n"
)
OLD_TICK = "const cc=(it.cuts||[]).find(c=>state.local>=c[0]&&state.local<c[1]-0.03); if(cc){ audio.currentTime=cc[1]; state.local=cc[1]; }"
OLD_CARDCLOCK = "else { state.local=clockBase+(performance.now()/1000-clockStart)*state.snelheid; if(state.local>=it.dur) next(); }"
NEW_CARDCLOCK = "else { state.local=clockBase+(performance.now()/1000-clockStart)*(it.type==='card'?Math.min(1,state.snelheid):state.snelheid); if(state.local>=it.dur) next(); }"
OLD_FADE = "const a=ramp(t,0.1,0.5)*(1-ramp(t,it.dur-0.5,0.5));"
NEW_FADE = "const a=ramp(t,0.05,0.3)*(1-ramp(t,it.dur-0.3,0.3));"


def paren_end(s, i):
    """i wijst naar '(' ; geef index na de bijbehorende ')'."""
    d = 0
    q = None
    while i < len(s):
        ch = s[i]
        if q:
            if ch == '\\':
                i += 2
                continue
            if ch == q:
                q = None
        elif ch in '\'"`':
            q = ch
        elif ch == '(':
            d += 1
        elif ch == ')':
            d -= 1
            if d == 0:
                return i + 1
        i += 1
    raise ValueError('geen sluithaakje')


def fix_filmdata(s):
    """Geeft (nieuwe tekst, lijst met wat gedaan/ontbrak)."""
    log = []
    if 'function knipSamen(' not in s or 'function vraagCuts(' not in s:
        return s, ['geen vraagCuts-speler']
    if 'SPELERFIX_MARK v2' in s:
        return s, ['al gefixt']
    if FD_HELPERS_V1 in s:
        return s.replace(FD_HELPERS_V1, FD_HELPERS), ['v1 -> v2']
    # 1. helpers vóór function knipSamen
    s = s.replace('function knipSamen(', FD_HELPERS + 'function knipSamen(', 1)
    # 2. knipMarge na elke 'const cuts=knipSamen(...)'
    out, pos, n = [], 0, 0
    for m in re.finditer(r'const cuts=knipSamen\(', s):
        if m.start() < pos:
            continue
        e = paren_end(s, m.end() - 1)
        semi = e + 1 if s[e:e + 1] == ';' else e
        out.append(s[pos:semi])
        out.append(' knipMarge(seg,cuts);')
        pos = semi
        n += 1
    out.append(s[pos:])
    s = ''.join(out)
    log.append(f'knipMarge x{n}')
    # 3. tick
    if OLD_TICK in s:
        s = s.replace(OLD_TICK, 'knipCheck(it);')
        log.append('tick')
    else:
        log.append('TICK-PATROON ONTBREEKT')
    # 4. knipCheck + timeupdate na 'function tick(){' (audio is dan al gedefinieerd)
    if 'function tick(){' in s:
        s = s.replace('function tick(){', FD_CHECK + 'function tick(){', 1)
    else:
        log.append('TICK-FUNCTIE ONTBREEKT')
    # 5. gotoItem: demping opheffen bij elk nieuw item
    m = re.search(r'function gotoItem\([^)]*\)\{', s)
    if m:
        s = s[:m.end()] + ' knipVrij();' + s[m.end():]
    else:
        log.append('GOTOITEM ONTBREEKT')
    # 6. hoofdstukkaart
    if 'CARD_DUR=2.2' in s:
        s = s.replace('CARD_DUR=2.2', 'CARD_DUR=1.3'); log.append('kaart 1.3')
    elif 'CARD_DUR=3.5' in s:
        s = s.replace('CARD_DUR=3.5', 'CARD_DUR=1.8'); log.append('kaart 1.8')
    else:
        log.append('CARD_DUR ONBEKEND')
    if OLD_CARDCLOCK in s:
        s = s.replace(OLD_CARDCLOCK, NEW_CARDCLOCK); log.append('kaartklok')
    else:
        log.append('KAARTKLOK ONTBREEKT')
    if OLD_FADE in s:
        s = s.replace(OLD_FADE, NEW_FADE); log.append('fade')
    return s, log


# ---------------------------------------------------------------- oude spelerbronnen zonder vraag-knippen
def fix_oud_filmdata_bron(s):
    """player.js van vóór bk-vragen: alleen de hoofdstukkaart (er wordt niets geknipt)."""
    if MARK in s:
        return s, ['al gefixt']
    log = []
    if 'CARD_DUR=3.5' in s:
        s = s.replace('CARD_DUR=3.5', 'CARD_DUR=1.3'); log.append('kaart 1.3')
    elif 'CARD_DUR=2.2' in s:
        s = s.replace('CARD_DUR=2.2', 'CARD_DUR=1.3'); log.append('kaart 1.3')
    else:
        return s, ['geen CARD_DUR']
    if OLD_CARDCLOCK in s:
        s = s.replace(OLD_CARDCLOCK, NEW_CARDCLOCK); log.append('kaartklok')
    if OLD_FADE in s:
        s = s.replace(OLD_FADE, NEW_FADE); log.append('fade')
    s = s.replace('const CARD_DUR=', '/*SPELERFIX_MARK kaart*/ const CARD_DUR=', 1)
    return s, log


FIXERS = []  # (naam, herken(s)->bool, fix(s)->(s,log)) ; oudere bouwvormen worden hieronder toegevoegd


# ---------------------------------------------------------------- bk-knip-laag (15 okt) van de oudere bouwvormen
# Evolutie (const TL), Erfelijkheid (__TIMELINE__), Zenuwstelsel 1-6 (window.FILM), Stofwisseling 1-3 en
# Voortplanting 1 (window.FILM, audio per hoofdstuk), Plek genoeg / Alles gaat rond (TIMELINE), DNA-technieken 1.
BK_OLD_IN = "function bkIn(x){for(var i=0;i<BK.k.length;i++){var c=BK.k[i];if(x>=c[0]-0.001&&x<c[1]-0.03)return c[1];}return null;}"
BK_NEW_IN = ("/*SPELERFIX_MARK bk 20okt2026: demp vóór de sprong, 0,045 s vooruitkijken*/"
    "var BK_VOOR=0.045,BK_MEDIA=[];(function(){try{var p=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){if(BK_MEDIA.indexOf(this)<0)BK_MEDIA.push(this);return p.apply(this,arguments);};}catch(e){}})();"
    "function bkDemp(){var l=BK_MEDIA.concat([].slice.call(document.querySelectorAll('audio,video')));l.forEach(function(a){if(a.paused||a.__bkd)return;a.__bkd={v:a.volume,m:a.muted};try{a.volume=0;}catch(e){}a.muted=true;"
    "var vrij=function(){clearTimeout(a.__bkt);a.__bkt=setTimeout(function(){var d=a.__bkd;if(!d)return;a.__bkd=null;try{a.volume=d.v;}catch(e){}a.muted=d.m;},60);};"
    "a.addEventListener('seeked',vrij,{once:true});a.addEventListener('pause',vrij,{once:true});a.__bkt=setTimeout(vrij,400);});}"
    "function bkIn(x){for(var i=0;i<BK.k.length;i++){var c=BK.k[i];if(x>=c[0]-BK_VOOR&&x<c[1]-0.03){bkDemp();return c[1];}}return null;}")
BK_OLD_VS = "return i<z.length?z[i].s:null;}"
BK_NEW_VS = "return i<z.length?(window.BK_DIPS?z[i].s:Math.max(0,i>0&&z[i-1].e!=null?Math.max(z[i].s-0.2,Math.min(z[i-1].e+0.03,z[i].s-0.06)):z[i].s-0.12)):null;}"
# hoofdstukkaart: de kaartknip houdt 0,8 s begin + 0,8 s eind (was 1,0/1,1 + 1,2/1,1) = 1,6 s bij 1x
BK_KAART = [
    ("s.end-s.start>2.3){ l.push([s.start+1.1,s.end-1.1]);", "s.end-s.start>1.7){ l.push([s.start+0.8,s.end-0.8]);"),
    ("c.t_first - c.t > 2.3) l.push([c.t + 1.0, c.t_first - 1.2]);", "c.t_first - c.t > 1.7) l.push([c.t + 0.8, c.t_first - 0.8]);"),
    ("ch.narrStart - ch.start > 2.3) l.push([ch.start + 1.0, ch.narrStart - 1.2]);", "ch.narrStart - ch.start > 1.7) l.push([ch.start + 0.8, ch.narrStart - 0.8]);"),
    ("g.t1 - g.t0 > 2.3) l.push([o + g.t0 + 1.0, o + g.t1 - 1.2]);", "g.t1 - g.t0 > 1.7) l.push([o + g.t0 + 0.8, o + g.t1 - 0.8]);"),
    # Zenuwstelsel 1-6: kaart is een eigen tijdlijnstuk (klok x snelheid) -> 1,3 s en niet sneller dan 1x
    ("if(s.kind==='card'&&s.dur>2.2) s.dur=2.2;", "if(s.kind==='card'&&s.dur>1.3) s.dur=1.3;"),
]
BK_ZENUW_KLOK = ("const dt=(S.lastRaf?Math.min(0.1,(now-S.lastRaf)/1000):0)*S.snelheid;",
                 "const dt=(S.lastRaf?Math.min(0.1,(now-S.lastRaf)/1000):0)*(segAt(S.T).kind==='card'?Math.min(1,S.snelheid):S.snelheid);")


def fix_bk(s):
    log = []
    if BK_OLD_IN not in s:
        return s, ['BKIN-PATROON ONTBREEKT']
    s = s.replace(BK_OLD_IN, BK_NEW_IN); log.append('bkIn+demp')
    if BK_OLD_VS in s:
        s = s.replace(BK_OLD_VS, BK_NEW_VS); log.append('vraagstart')
    n = 0
    for a, b in BK_KAART:
        if a in s:
            s = s.replace(a, b); n += 1
    log.append(f'kaart x{n}')
    if BK_ZENUW_KLOK[0] in s:
        s = s.replace(*BK_ZENUW_KLOK); log.append('kaartklok')
    return s, log


FIXERS.append(('bk-knip', lambda s: 'function bkIn(x)' in s and 'bk-knip' in s, fix_bk))


# ---- knippunten op de echte stilte (oudere bouwvormen): BK_DIPS = stiltes in filmtijd, offline uit de audio
BK_SNAP_JS = ("/*SPELERFIX_MARK bksnap*/function bkSnap(l){var D=window.BK_DIPS,D2=window.BK_DIPS2||[];if(!D||!D.length)return l;"
    "function rond(t){for(var i=0;i<D.length;i+=2){if(t>=D[i]&&t<=D[i+1])return [D[i],D[i+1]];}return null;}"
    "function naast(L,t,max){var b=null,bd=max;for(var i=0;i<L.length;i+=2){var d=t<L[i]?L[i]-t:(t>L[i+1]?t-L[i+1]:0);if(d<bd){bd=d;b=[L[i],L[i+1]];}}return b;}"
    "return l.map(function(x){var a=x[0],b=x[1],r=rond(a);"
    "if(!r||r[1]-a<0.06){var ref=a+0.08,n=naast(D,ref,0.4);if(n){var g=n[1]-n[0];a=g>=0.17?Math.max(n[0]+0.02,n[1]-0.12):(n[0]+n[1])/2;}else{n=naast(D2,ref,0.3);if(n)a=(n[0]+n[1])/2;}}"
    "var r2=rond(b);if(!r2){var n2=naast(D,b,0.3);if(n2&&n2[1]>a+0.05)b=Math.max(n2[0],n2[1]-0.03);}"
    "return [a,Math.max(b,a+0.02)];});}")
BK_ZET_OLD = "function bkZet(l){l=l.filter("
BK_ZET_NEW = "function bkZet(l){l=bkSnap(l);l=l.filter("


def _pcm_env(data=None, path=None):
    import subprocess
    import numpy as np
    cmd = ['ffmpeg', '-v', 'quiet', '-i', path or 'pipe:0', '-ac', '1', '-ar', '16000', '-f', 's16le', '-']
    x = np.frombuffer(subprocess.run(cmd, input=data, capture_output=True).stdout, np.int16).astype(float) / 32768
    n = len(x) // 160
    r = np.sqrt((x[:n * 160].reshape(n, 160) ** 2).mean(1))
    return r, max(0.002, float(np.percentile(r, 90)) * 0.03)


def _runs(r, thr, off=0.0, minlen=3):
    """stille stukken: >= minlen frames van 10 ms onder thr, als platte lijst [van, tot, ...] in s"""
    out, i, n = [], 0, len(r)
    while i < n:
        if r[i] < thr:
            j = i
            while j < n and r[j] < thr:
                j += 1
            if j - i >= minlen:
                out += [round(off + i / 100, 2), round(off + j / 100, 2)]
            i = j
        else:
            i += 1
    return out


def bk_dips(path, s):
    """Stiltes (>= 30 ms) in filmtijd voor films met de bk-knip-laag; None als de audio niet te vinden is."""
    import base64, json as _j
    d = os.path.dirname(path)
    m = re.search(r'window\.FILM\s*=\s*', s)
    if m and 'window.__AUDIO =' in s:
        F, _ = _j.JSONDecoder().raw_decode(s, m.end())
        if isinstance(F, str):
            F = _j.loads(F)
        ma = re.search(r'window\.__AUDIO\s*=\s*', s)
        A, _ = _j.JSONDecoder().raw_decode(s, ma.end())
        out, acc = [[], []], 0.0
        for c in F['chapters']:
            b = A.get(c['audio'])
            if b is None:
                return None
            r, thr = _pcm_env(base64.b64decode(b))
            out[0] += _runs(r, thr, acc); out[1] += _runs(r, thr * 4, acc, 2)
            acc += c['dur']
        return out
    if 'window.FILM_AUDIO' in s:
        return None  # Zenuwstelsel 1-6: knippen op segmentgrenzen, geen tabel nodig
    m = re.search(r'au\.src="data:audio/mpeg;base64,([^"]+)"', s) or re.search(r'__AUDIO_B64__\s*=\s*"([^"]+)"', s)
    if m:
        r, thr = _pcm_env(base64.b64decode(m.group(1)))
        return [_runs(r, thr), _runs(r, thr * 4, 0.0, 2)]
    p = os.path.join(d, 'narration.mp3')
    if os.path.exists(p):
        r, thr = _pcm_env(path=p)
        return [_runs(r, thr), _runs(r, thr * 4, 0.0, 2)]
    return None


def fix_bk_snap(path, s):
    """Zet/vernieuw BK_DIPS en bkSnap. Idempotent: de tabel wordt elke keer uit de audio herberekend."""
    if 'function bkIn(x)' not in s or 'bk-knip' not in s:
        return s, []
    dips = bk_dips(path, s)
    if dips is None:
        return s, ['geen stiltetabel']
    tab = ('/*BK_DIPS*/window.BK_DIPS=' + json.dumps(dips[0], separators=(',', ':')) + ';window.BK_DIPS2='
           + json.dumps(dips[1], separators=(',', ':')) + ';')
    if '/*BK_DIPS*/' in s:
        s = re.sub(r'/\*BK_DIPS\*/window\.BK_DIPS=\[[^\]]*\];(window\.BK_DIPS2=\[[^\]]*\];)?', lambda m: tab, s, count=1)
    else:
        s = s.replace(BK_ZET_OLD, tab + BK_SNAP_JS + BK_ZET_NEW, 1)
    return s, [f'stiltetabel {len(dips[0])//2}+{len(dips[1])//2}']


# ---------------------------------------------------------------- DNA-technieken 2 (eigen 'vensters') en Onderzoek doen
OMG_DEMP = ("/*SPELERFIX_MARK omg*/function omgDemp(){ if(audio.paused) return; audio.muted=true; clearTimeout(omgDemp.t); "
            "const v=()=>{ clearTimeout(omgDemp.t); omgDemp.t=setTimeout(()=>{ audio.muted=false; },60); }; "
            "audio.addEventListener('seeked',v,{once:true}); omgDemp.t=setTimeout(v,400); }\n  ")


def fix_omg2(s, path=None):
    log = []
    a = "const vensters = Qs.map("
    b = ": q.t + 0.1)]; });\n  function slaVraagOver"
    c = "if (now >= a && now < b - 0.05) { try { audio.currentTime = b; } catch (e) {}"
    if a not in s or b not in s or c not in s:
        return s, ['OMG2-PATROON ONTBREEKT']
    tab = ''
    if path:
        mp3 = os.path.join(os.path.dirname(path), 'gelfilm.mp3')
        if os.path.exists(mp3):
            r, thr = _pcm_env(path=mp3)
            tab = ('/*BK_DIPS*/window.BK_DIPS=' + json.dumps(_runs(r, thr), separators=(',', ':')) + ';window.BK_DIPS2='
                   + json.dumps(_runs(r, thr * 4, 0.0, 2), separators=(',', ':')) + ';')
            log.append('stiltetabel')
    s = s.replace(a, tab + BK_SNAP_JS + '\n  ' + OMG_DEMP + "const vensters = bkSnap(Qs.map(", 1)
    s = s.replace(b, ": q.t + 0.1)]; }));\n  function slaVraagOver", 1)
    s = s.replace(c, "if (now >= a - 0.045 && now < b - 0.05) { omgDemp(); try { audio.currentTime = b; } catch (e) {}", 1)
    log.append('vensters+demp')
    return s, log


def fix_onderzoek(s):
    a = "if (rw && rw.sents.length === 1 && /stil\\.$/.test(rw.sents[0].x) && ci < CHAPTERS.length - 1) { load(ci + 1, 0, true);"
    b = "slateTimer = setTimeout(go, 2200); }   // hoofdstukkaart 2,2 s (15 okt 2026; was 2,6 s)"
    if a not in s or b not in s:
        return s, ['ONDERZOEK-PATROON ONTBREEKT']
    s = s.replace(a, "if (rw && rw.sents.length === 1 && /stil\\.$/.test(rw.sents[0].x) && ci < CHAPTERS.length - 1) { /*SPELERFIX_MARK onderzoek*/ audio.muted = true; setTimeout(() => { audio.muted = false; }, 300); load(ci + 1, 0, true);", 1)
    s = s.replace(b, "slateTimer = setTimeout(go, 1300); }   // hoofdstukkaart 1,3 s (20 okt 2026; was 2,2 s)", 1)
    return s, ['stil-sprong gedempt', 'kaart 1.3']


FIXERS.append(('omg2', lambda s: 'const vensters = Qs.map(' in s and 'function slaVraagOver' in s, None))
FIXERS.append(('onderzoek', lambda s: 'slateTimer = setTimeout(go, 2200)' in s, fix_onderzoek))


def fix_text(s, path=None):
    if 'function vraagCuts(' in s and 'function knipSamen(' in s:
        return fix_filmdata(s)
    if MARK in s:
        return s, ['al gefixt']
    for naam, herken, fix in FIXERS:
        if herken(s):
            s2, log = (fix_omg2(s, path) if naam == 'omg2' else fix(s))
            return s2, [naam] + log
    if re.search(r'CARD_DUR=(2\.2|3\.5)', s) and 'drawChapterCard' in s:
        return fix_oud_filmdata_bron(s)
    return s, ['geen bekende speler']


# Antwoordletters (25 okt 2026): de stem-invoer zegt 'Antwoord bé' (uitspraak.json, b. -> bé.), dus de
# knipherkenning bij Vragen uit moet naast 'bee' ook 'bé' (en 'bè') kennen. Idempotent: na de vervanging
# komt het oude patroon niet meer voor.
ANTW_OUD = 'aa|bee|cee|a|b|c'
ANTW_NIEUW = 'aa|bee|bé|bè|cee|a|b|c'


def fix_antwletter(s):
    if ANTW_OUD not in s:
        return s, []
    return s.replace(ANTW_OUD, ANTW_NIEUW), ['antwoordletter bé']


def alle_bestanden():
    fs = [f for f in glob.glob(os.path.join(ROOT, 'films/**/*.html'), recursive=True)
          if '/bron/' not in f and not f.endswith('presentatie.html')]
    fs += glob.glob(os.path.join(ROOT, 'films/**/bron/src/player*.js'), recursive=True)
    fs += glob.glob(os.path.join(ROOT, 'films/dna/_bouw/src/player*.js'))
    return sorted(set(fs))


def main(argv):
    check = '--check' in argv
    args = [a for a in argv if a != '--check']
    fs = args or alle_bestanden()
    bad = 0
    for f in fs:
        s = open(f, encoding='utf-8').read()
        s2, log = fix_text(s, f)
        if 'bk-knip' in s2 and 'function bkIn(x)' in s2:
            s3, log2 = fix_bk_snap(f, s2)
            if s3 != s2 and '/*BK_DIPS*/' in s2 and s3.replace(' ', '') == s2.replace(' ', ''):
                pass
            s2 = s3; log += log2
        s2, log3 = fix_antwletter(s2); log += log3
        if check:
            ok = MARK in s
            if not ok:
                bad += 1
            noot = '  (antwoordletter bé nog niet: draai spelerfix.py)' if ok and ANTW_OUD in s else ''
            print(('OK   ' if ok else 'MIST ') + os.path.relpath(f, ROOT) + noot, '' if ok else ' '.join(log))
            continue
        if s2 != s:
            open(f, 'w', encoding='utf-8').write(s2)
            print('gefixt', os.path.relpath(f, ROOT), ' '.join(log))
        else:
            print('-     ', os.path.relpath(f, ROOT), ' '.join(log))
    return 1 if (check and bad) else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
