# na bouw.sh: film in de repo zetten en de site-scripts draaien (alle idempotent)
set -e; R=/root/biologie-; F=films/zenuwstelsel/4-knoeien-met-de-spleet-nieuw.html
cp /home/claude/werk/zen4/film/film/4-knoeien-met-de-spleet-nieuw.html $R/$F; cd $R
for s in spelerfix antwoordtekst kortantwoord antwoordletter flipkaarten tabel_mobiel licentie_noot teller; do python3 scripts/$s.py >/dev/null; done
grep -c "data-licentie\|teller.js\|flipkaarten.js\|bk-vragen" $F
