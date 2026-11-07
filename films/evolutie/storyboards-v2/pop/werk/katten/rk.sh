#!/bin/bash
# render testvel katten -> out/pop/katten/testvel/  (vanuit /home/claude/evo2)
cd /home/claude/evo2
F=teken_evo1,teken_evo2,teken_evo3,teken_evo4,teken_evo5,teken_evo6,teken_evo7,teken_evo8,dieren_zoog,dieren_overig,micro_evo,sb5,sb8,pop_katten,tv_pop_katten
python3 render.py $F TV_pop_katten "$@" 2>&1 | grep -v "^klaar" 
mkdir -p out/pop/katten/testvel; mv out/$F/*.webp out/pop/katten/testvel/ 2>/dev/null; rmdir out/$F 2>/dev/null
