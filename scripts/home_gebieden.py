#!/usr/bin/env python3
"""Zet de gebieden per richting uit vervolg.html (GEBIEDEN) als VGEBIEDEN in index.html,
voor het paneel 'In het echt' op de schuifhoofdpagina. Draai na het toevoegen of hernoemen van een gebied. Idempotent."""
import json, re, subprocess, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
js = r"""const s=require('fs').readFileSync(process.argv[1],'utf8');const i=s.indexOf('const GEBIEDEN');const j=s.indexOf('\n];',i);
let G;eval(s.slice(i,j+3).replace('const GEBIEDEN','G'));const r={};for(const g of G){(r[g.cluster]=r[g.cluster]||[]).push([g.id,g.naam])}console.log(JSON.stringify(r));"""
data = subprocess.run(['node', '-e', js, str(root / 'vervolg.html')], capture_output=True, text=True, check=True).stdout.strip()
p = root / 'index.html'; s = p.read_text()
n = re.sub(r'(/\* VGEBIEDEN:start \(scripts/home_gebieden\.py\) \*/const VGEBIEDEN=).*?(;/\* VGEBIEDEN:eind \*/)', lambda m: m.group(1) + data + m.group(2), s, flags=re.S)
if n != s: p.write_text(n); print('VGEBIEDEN bijgewerkt')
else: print('VGEBIEDEN ongewijzigd')
