/* vp1_kop.js — Van bevruchting tot baby 3.0 (FILMDATA-straat, 29 okt 2026).
   De scènes van versie 2.6 draaien ongewijzigd op hun eigen engine (oud_engine.js: ENG, COMMON) en tekenen op hetzelfde canvas.
   lib_bio.js verwacht een paar kleurnamen van die engine (coral, gold, nucFill …): vul C uit lib.js aan, zonder iets te overschrijven. */
for (const k in ENG.C) if (!(k in C)) C[k] = ENG.C[k];
