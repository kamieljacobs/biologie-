# Bouwt de film opnieuw uit deze bronmap (werkmap buiten de repo: kopieer src/, bouw/ en de .py/.json hierheen en zet audio in raw/ + audio/).
# Werkmap 26 okt 2026: /home/claude/werk/zen9/film (engine in ../eng = src/ + bouw/).
set -e; cd /home/claude/werk/zen9/film; E=../eng
{ cat $E/scenes_kop.js; echo 'const SCENES = {};'; cat $E/lib_anatomie.js $E/lib_bio.js ../kf/teken_z9.js teken_z9b.js scenes_z9.js; } > scenes.js
python3 film.py >/dev/null && python3 $E/build_data.py . >/dev/null && python3 $E/build.py .
# daarna: film/9-spieren-en-beweging.html → films/zenuwstelsel/ , themaregel na <meta charset> zetten, en de scripts uit CLAUDE.md draaien
