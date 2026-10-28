Keuze 'gelijk': huidige versie blijft. Geen biologische fout gemeld; niets aangepast, geen DEF.js.
Let op (technisch, geen biologie): de huidige armModel roept pijl() aan, die niet in lib_bio.js staat (alleen in dieren/lib_dieren.js). Op het testvel zonder die lib geven de standen met trekV/trekA een ReferenceError (zie voor.png: drie standen tekenen niet). Varianten A/C losten dat op met een eigen _armPijl.
Vraag aan Kamiel/integrator: mag de eigen pijlhelper (_armPijl uit A) erin, zonder verder iets te veranderen?
