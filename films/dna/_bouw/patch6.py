#!/usr/bin/env python3
"""Afl. 6: bouw met build.py en zet de nieuwe inhoud (FILMDATA, scènes, begrippen, checkvragen, docentdeel, footertekst)
   in de GEPUBLICEERDE film, zodat latere site-brede aanpassingen (speler, naamBij, teller, licentie) behouden blijven.
   python3 patch6.py <gepubliceerde film.html> <uit.html>"""
import sys,re,subprocess
subprocess.run([sys.executable,'build.py','6'],check=True)
B=open('out/6-genen-aan-en-uit.html',encoding='utf-8').read(); P=open(sys.argv[1],encoding='utf-8').read()
def region(s,a,b,ia=0):
    i=s.index(a,ia); j=s.index(b,i+len(a)); return i,j
def swap(P,a,b):
    i,j=region(B,a,b); k,l=region(P,a,b); return P[:k]+B[i:j]+P[l:]
P=swap(P,'<script>window.FILMDATA=',';</script>')
P=swap(P,'const SCENES={};','\n</script>')
P=swap(P,'const GLOSSARY=',';\n')
P=swap(P,'<section><h2>Checkvragen</h2>','<footer>')
i,j=region(B,'<footer>','</footer>'); bf=B[i:j]; k=P.index('<footer>'); l=P.index('<span data-licentie',k); P=P[:k]+bf+P[l:]
open(sys.argv[2],'w',encoding='utf-8').write(P); print('ok',len(P)//1024,'kB')
