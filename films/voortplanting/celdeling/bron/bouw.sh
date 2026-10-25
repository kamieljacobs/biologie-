# Bouwen (vanuit een werkmap buiten de repo): kopieer bron/ naar <werk>, dan
#   cd <werk>; mkdir -p b; cp film.py segments.json sections.html b/; cp -r stem/woordtijden b/words
#   { cat src/scenes_kop.js; echo 'const SCENES = {};'; cat src/lib_bio.js src/lib_micro_evo.js src/lib_anatomie.js src/chrom_lib.js src/scenes_lib.js src/oud_hulp.js src/teken_celdeling.js src/scenes_cd2.js; } > b/scenes.js
#   cd b && python3 film.py && python3 ../bouw/build_data.py . && E=../src python3 ../bouw/build.py .   (build.py leest page.html, lib.js, lib_voeding.js, lib_hormonen.js, lib_cast.js, player.js, fonts.css uit zijn eigen map: zet bouw/build.py dus naast src/ of kopieer die bestanden erbij)
#   resultaat b/film/index.html -> films/voortplanting/celdeling/index.html, daarna teller.py, flipkaarten.py, oefenen.py, licentie_noot.py, spelerfix.py, antwoordtekst.py, kortantwoord.py, tabel_mobiel.py
# Controle cues: python3 bouw/cuecheck2.py src/scenes_cd2.js (vanuit een map met film/words/)
