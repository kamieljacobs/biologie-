> Lees ook `films/BEELDAFSPRAKEN.md`: algemene beeldfeedback van Kamiel gaat vóór wat hieronder staat.
> Kopie van de Claude doc 'Prompt uitlegfilms biologie' (https://claude.ai/artifact/RJxQpjyccupQC9KXUxmETA), stand 24 okt 2026 = v10. Dit bestand is de gedeelde bron voor al Kamiels Claude-accounts; pas je de prompt aan, werk dan ook dit bestand bij (of maak een nieuwe PROMPT_vN.md).

# Prompt uitlegfilms biologie — v10

24 okt 2026 · Kamiel · versiegeschiedenis: zie Wijzigingen

## How to use

This is the general prompt: it carries no series-specific content. The look of the films is Part C and is binding for every film. Filled-in series briefs live in a separate document ("Seriebriefs uitlegfilms biologie").

Fill in the film brief (only TOPIC and AUDIENCE are required) and paste it together with Part B and Part C into a new conversation. Leave LEERDOELEN empty and Claude first works out the topic specification with you.

For a series: fill in the series brief (Part A2) once. For each film, paste the series brief, a short film brief (Part A1 with only the fields that differ), Part B and Part C.

Onderbouw: when AUDIENCE is onderbouw (leerjaar 1–3), also paste Part D. Part D adapts level, language, length and the brief to the new kerndoelen and wins over Part B where they differ.

Autonomous mode: with a filled-in series brief and the bouwlijst ("Bouwlijst uitlegfilms biologie"), Claude builds the films of a series one after another without waiting for approval (B7). Kamiel reviews later, in batches, from the checkpoint pages and the films on the site.

Storage: every film lives in the site repository (kamieljacobs/biologie-) with a bron/ folder next to it (B12). To change an existing film, give its path under PREVIOUS VERSION and follow B13; no film brief is needed for a small fix.

## Part A1 — Film brief

| Field |  |
| --- | --- |
| TOPIC |  |
| AUDIENCE | e.g. 4 vwo, or "havo + vwo" |
| KERNDOEL | onderbouw only, replaces METHOD + CHAPTER: number and bullets of the SLO kerndoel, e.g. "32A, bullets 1–2" (see Part D) |
| NIVEAU | one level, or "havo + vwo, vwo-blokken gelabeld" (see B4 and B10) |
| LENGTH | target in minutes, or "content decides" |
| USE | zelfstandig / klassikaal / beide (default: beide) |
| METHOD + CHAPTER | optional, e.g. Nectar 4 vwo H6; for two levels name both methods |
| LEERDOELEN | optional, paste them; for two levels tag each leerdoel "basis" or "vwo" |
| TERMS & DEFINITIONS | optional, these override every other source |
| KNOWN MISCONCEPTIONS | optional |
| EXAM STOF / VERDIEPING | optional |
| EXAM QUESTIONS | optional: real CE questions to use, with year, tijdvak and number (see B4) |
| CENTRAL PUZZLE | optional, or "propose three" |
| DAILY-LIFE HOOK | optional: the everyday situation this film opens or closes with |
| LEAVE OUT | optional, e.g. "celdeling: separate film" |
| SERIES | optional, reuse its glossary, uitspraaklijst and player |
| LOOKS | optional: the look per scene level when the film deviates from the default in Part C (e.g. "orgaan als Macro-lichaam met Micro-zoom", "Macro-dag") |
| PREVIOUS VERSION | optional: the film's path in the site repo (films/\<hoofdstuk>/\<n>-\<slug>.html) or a link; Claude reads its bron/ folder first and reuses script, numbers and cue table; the look is always rebuilt by Part C |
| ATTACHMENTS | optional, e.g. chapter pages, begrippenlijst, previous film folder |
| VOICE | Roos (ElevenLabs); add the model if you know it |
| CHECKPOINT | optional: "wait" when Kamiel wants to approve this film before the build; default is autonomous (B7) |
| NOTES |  |

## Part A2 — Series brief

Filled in once per series; every film brief inherits it. Filled-in series briefs (DNA, Cel, Voeding) live in the separate document "Seriebriefs uitlegfilms biologie".

| Field |  |
| --- | --- |
| SERIES NAME |  |
| FILMS | numbered list with working titles |
| AUDIENCE + NIVEAU |  |
| METHODS | per level |
| SERIES COLOURS | which objects of this series get which of the six betekeniskleuren from Part C, fixed in film 1 and reused; a series never adds a seventh colour, it may add tints of one colour for a family of objects (e.g. the four basen as four tints of paars) |
| SERIES LIBRARY | the recurring objects of this series (molecules, organelles, organisms, lab objects) that must look identical in every film; the first film that draws one fixes it |
| NIVEAU LABEL | as in Part C (paarse balk + VWO); only note here if a series needs it announced differently in the narration |
| PLAYER | reuse the series player; list the switches it must have |
| GLOSSARY | shared; each film adds to it, never redefines |
| UITSPRAAKLIJST | the series copy of the list in B5, grows with every film |
| RECURRING CHARACTER / RODE DRAAD | optional |
| DAILY-LIFE HOOKS | per film |
| LENGTH | per film or "content decides" |
| VOICE |  |
| LEAVE OUT |  |
| SERIES PAGE | all films on one page with the shared glossary |
| PATROONRONDE | the last item of every series (B15): the OVERDRACHT of the series lists it as open until it is done |

## Part B — Production standard

Make an animated explainer film about the topic in the brief, in Dutch, as one web page. Work in this order: topic specification (only if needed) → diagnosis → script → pronunciation → storyboard and style frames → checkpoint → audio → build → QA → delivery.

### 1. The bar

A film that a Feynman-level domain expert, a pedagogy expert and a top science-animation studio would each sign off on. In practice, four tests:

- Why test: every claim about how something works follows from a mechanism the viewer has actually seen on screen. What can't be shown (names, measured values, history, or a mechanism that another film covers) is presented as a given fact ("dat is gemeten", "dat zie je in de film over celdeling"), never dressed up as an explanation.
- Learning test: a student from the audience who watches once can answer the opening puzzle and the check questions. With two levels: a havo student who watches without the vwo blocks passes the basis questions.
- Pause test: any paused frame could go into a textbook. One focal point, readable text, consistent colour meanings, nothing irrelevant. And it obeys Part C: a paused frame is recognisably one of the three looks with the UI layer in place.
- Accuracy test: every number, unit and scale is checked (µm vs mm, orders of magnitude) and listed with its source. Rounded values are said with "ongeveer". Simplifications are labelled "vereenvoudigd", "niet op schaal" or "model".

When rules conflict, this order decides: (1) scientific correctness, (2) clarity for the audience, (3) the pedagogy rules, (4) the look in Part C, (5) visual ambition such as continuous movement and real simulation, (6) the length target. Break the lower rule and note it in the QA report.

The brief binds: my definitions are used as given. Doubts about them are raised in the specification or at the checkpoint, never resolved by you.

### 2. Topic specification

Leerdoelen given: use them, and any terms and definitions, exactly as given. My definitions override the method, other sources and your own preferences. If something I gave is wrong or conflicts with the CE syllabus, flag it; never change it silently. Anything you add (terms, misconceptions, a puzzle) is marked and shown at the checkpoint.

No leerdoelen: before writing anything, propose a short specification and discuss it with me:

- 4–8 leerdoelen ("de leerling kan …") at the audience's level; with two levels, each tagged basis or vwo;
- the key terms, with the definitions you would use, in the wording of Dutch biology methods;
- the scope: what's in, what's out, and what is exam stof versus verdieping;
- the 3–5 most common misconceptions about this topic;
- three candidate central puzzles, each starting from something students have seen themselves;
- the chapter types from section 3.

Then wait for my answer. In autonomous mode (B7) with no leerdoelen given, Claude writes this specification as a series brief in "Seriebriefs uitlegfilms biologie" from the CE syllabus and the exams 2018–2026, marks it "niet gecontroleerd door Kamiel", and builds on; Kamiel's later changes to the brief are worked into the films (B13).

Central puzzle: if CENTRAL PUZZLE says "propose three" and leerdoelen are given, send only the three puzzles in one short message and wait for my pick. If it's empty, choose one and explain why at the checkpoint.

Sources you can't open: if you can't open something (the method, a previous film, an asset file, the web), say so in your first reply. Never attribute wording to a method you haven't seen, and mark unchecked items "niet gecontroleerd".

### 3. Diagnose the topic: how the film adapts

Give every chapter one primary type. The type sets the axis the film moves along, the simulation, the expert who reviews it and the extra checks. Most films mix two or three types. The look of each scene follows from its scale level by the rules in Part C, not from the type.

| Type and typical topics | Axis | Simulation and visuals | Expert | Extra checks |
| --- | --- | --- | --- | --- |
| A. Mechanism at a smaller scale: diffusie, osmose, enzymwerking, membraantransport, dissimilatie, fotosynthese, eiwitsynthese, DNA-replicatie, impulsgeleiding | Scale: one continuous zoom from the everyday to molecules and back, with a true scale bar | Particles that really move, collide and bind | Biochemist or biophysicist | Net effects are statistics of random motion, not intention; orders of magnitude |
| B. Structure and function: celorganellen, bladbouw, hart, nefron, longblaasjes, darmvlokken, bouw van DNA | Space: zoom, cutaway, exploded view, layer by layer | The 3D object before any cross-section; counterfactuals ("wat als dit oppervlak kleiner was?") | Cell biologist or anatomist | Function follows from structure, never just a list of parts |
| C. Process in time: celcyclus, mitose en meiose, bevruchting, embryonale ontwikkeling, menstruatiecyclus, spijsvertering | Time: a visible clock or timeline | The same objects transform (a chromosome stays that chromosome); graphs draw themselves in sync | Developmental or reproductive biologist | Order, durations and time scales |
| D. Regulation and feedback: homeostase, bloedglucose, temperatuurregeling, hormoonregulatie, genregulatie | A cause-and-effect loop | A live model with sensor, set point and effector; scripted disturbances the loop responds to; graphs computed by the model, not drawn | Physiologist | Negative vs positive feedback, delays; "het lichaam wil" never appears |
| E. Inheritance and chance: kruisingsschema's, stambomen, X-chromosomale overerving, koppeling, mutatie en toeval | Generations and probability | Real random draws (gametes from a bag), so ratios emerge and wobble in small families; worked examples that fade into "nu jij" | Geneticist | Ratios are probabilities, not guarantees; notation exactly as in the method |
| F. Populations, ecosystems and evolution: populatiegroei, draagkracht, voedselweb, energiestroom, kringlopen, natuurlijke selectie, soortvorming | Time (years, generations) and scale upwards: individual → population → ecosystem | Agent-based simulation; follow one hero individual or atom | Ecologist or evolutionary biologist | Energy flows, matter cycles; populations change, individuals don't adapt; evolution has no goal |
| G. Method and reasoning: onderzoek doen, variabelen, betrouwbaarheid en validiteit, grafieken, vergroting berekenen, DNA-technieken (PCR, gel, sequencing) | Reasoning steps, often along a historical experiment | Reconstructed experiments with realistic measurement noise; the viewer predicts each choice before the film shows it | Research methodologist | Conclusions never outrun the data; correlation is not causation |
| H. Frontier science: veroudering, epigenetica, microbioom | Evidence | Each claim carries its evidence level on screen (vastgesteld, waarschijnlijk, hypothese); models labelled as models | Researcher in the field | An evidence table per claim before writing, weighted by study quality and by how many independent studies agree; say what we don't know |
| I. Application and choice: DNA-testen, erfelijkheidsadvies, GM-voedsel, vaccins, leefstijl en gezondheid | A decision the viewer may face, from the everyday situation down to the mechanism and back to the decision | A case the viewer recognises, with the molecular zoom from the earlier films; a decision tree or balance that fills in as evidence appears | Clinical geneticist, physician or ethicist | Separate what is known from what is value-laden; never prescribe a personal choice; name who benefits and who bears the risk |

For every type:

- Start from something the audience has seen, move continuously along the axis to where the explanation lives, and come back to the everyday observation at the end.
- Within a chapter: no hard cuts, no empty frames, no pop-ins. Use camera moves, morphs and time-scrubs. The one exception is a change of look, which happens only by the zoomcirkel or by a cut to a Schema card (Part C, keuzeregels). Between chapters: a chapter card. For axes that aren't space or time, continuity means one persistent diagram, loop or evidence board that grows, never a new slide.
- Simulate, don't illustrate: wherever a process can be simulated, what happens on screen comes from the simulation.
- Two whys: say whether a chapter explains how something works or why it evolved, and never present a function as a cause. Molecules and cells don't "willen", "proberen", "weten" or "zoeken".
- A topic that fits none of the types: define a new type in the same five columns and show it at the checkpoint, or in the specification when there is one.

### 4. Script

- **No references to tools** (Kamiel 23 and 25 okt 2026): the film never points to a tool, opdracht, onderzoekje or other page of the site, and above all never says it out loud: no "Probeer het zelf", no "in de tool", no "op de site", no "zelf proberen". Not in the narration, and not on a title, end or vraagkaart either. Links to tools may only be added on the film page outside the player, and only when Kamiel asks.
- Chapters of short spoken lines: one idea per sentence, mostly under 15 words, active voice, je-vorm, numbers written the way they are said.
- Word budget: about 140 words per minute of narration (Roos speaks about 2,4 words per second).
- Structure: cold open with the puzzle (at most 20 s) → title → chapters → recap that answers the puzzle → end card. Every chapter has its own mini-question and payoff, so it also works when shown on its own.
- Daily-life hook: when the brief gives one, it is the cold open or the final beat, and the recap connects the mechanism back to it.
- At least one prediction question per chapter, with 2–4 options, one of which is a known misconception. Open prediction questions are phrased "Wat denk je?", never "Voorspel."
- Misconceptions: name the tempting idea, let the simulation show it failing, and end on the correct idea.
- Terms exactly as in the brief or the method, introduced one at a time, each tied to something visible.
- Mark verdieping clearly whenever the film goes beyond exam stof.

Two levels (NIVEAU "havo + vwo, vwo-blokken gelabeld")

- The basis line is complete and correct on its own: a viewer who skips every vwo block never misses a step that a later basis step needs.
- A vwo block is a contiguous segment that deepens a process the basis has just shown (mechanism, direction, enzyme, exception). It is not announced in the narration: the viewer picks havo or vwo in the player and the block is marked on screen. It starts with its content and ends with a one-line return to the basis.
- A vwo block is exam stof for vwo, so it is not "verdieping". Verdieping stays its own label and is rare.
- Each level has its own check questions. A basis question never needs a vwo block to answer; a vwo question may.
- The coverage table has a level column: leerdoel → level → chapter → question.
- Terms used only in vwo blocks are tagged vwo in the glossary.

**Drie niveaus (beginner, basis, gevorderd)** voor films die zowel onderbouw als bovenbouw bedienen: NIVEAU "beginner + basis + gevorderd". In het script krijgt een alinea `[M]` (basis) of `[G]` (gevorderd) vooraan; alinea's zonder teken zijn beginner en altijd te zien. Speler en segmentbouwer daarvoor staan in films/extra/bestaat-dit-echt/bron (src/player.js, src/page.html, bouw/make\_segments.py); de keuze staat in de speler en in een link met ?niveau=beginner|basis|gevorderd. Beginner is een complete korte film op zich (±5 min spraak bij 11 min totaal).

Real exam questions (EXAM QUESTIONS filled in)

- Paraphrase the question or quote it briefly with the source on screen (CvTE, examen biologie havo/vwo, jaar, tijdvak, vraagnummer). Redraw tables, gels, karyograms and diagrams in the Schema look of Part C; never paste the original.
- Keep the biology of the question intact: same data, same reasoning steps, same answer. The correctievoorschrift decides what counts as correct; say when the film's wording is simpler than the correctievoorschrift.
- Let the viewer work the question as a prediction moment before the film solves it.

**Varianten first (B15).** Before the review passes: draw the mutations with `scripts/dobbelsteen.py`, write three variants, run `scripts/scriptcheck.py` on each, then the blinde beoordelaar with the fixed brief `films/BLIND-BEOORDELAAR.md`. Straight after the verdict, in the same session: log every variant in `films/logboek/mutaties.jsonl` and the winner's weak spots in `films/logboek/fouten.jsonl`; a nipte winst goes to Kamiel (B15). The review passes below run on the winner.

Review passes. Each pass returns a numbered list of concrete problems and fixes, not a verdict. Revise after each pass.

- Expert (chosen per chapter type): run as a separate agent that sees only the brief and the script, when agents are available.
- Pedagogy: misconceptions, prediction questions, one new idea at a time, pacing. With two levels: the basis line read without the vwo blocks.
- Language: natural spoken Dutch at the audience's level, teleology, sentences the voice will stumble over.
- Curriculum: terms and definitions match the brief; a coverage table leerdoel → (level →) chapter → question. Each leerdoel is tested by at least one check question or prediction question; one check question may cover two leerdoelen.

### 5. Pronunciation

- List every risk word: biological and chemical terms, abbreviations, Latin and Greek words, species and person names, English loanwords, numbers with units.
- Check the central uitspraaklijst first (films/UITSPRAAK.md and films/uitspraak.json in the site repo); it always wins.
- For every biological term not on the list, cross-reference the correct Dutch pronunciation in at least two written sources where they exist (IPA on nl.wiktionary.org; syllables and stress in Van Dale, woorden.org or another Dutch dictionary). Note the syllables and the stressed syllable. If sources disagree or none exist, mark the word as doubtful.
- Decide what the voice receives: the word itself, a respelling ("ei-chromosoom"), or IPA if the model supports it. The captions always keep the correct spelling; keep both text versions in sync.
- No uitspraaktest before recording. For every risk word not on the list, look up the IPA and the stressed syllable first (nl.wiktionary.org, Van Dale, woorden.org; for medical and chemical terms also the Dutch pages of the term), decide the voice input from that, and record the paragraph once. Put the word on the uitspraakwachtlijst (a section of the bouwlijst): film, word, voice input, the paragraphs it occurs in. Kamiel listens later to many films in one batch; only the paragraphs with a wrong word are re-recorded.
- Record one take per paragraph; do not generate several variants per paragraph.
- After the final recording, transcribe the real takes blind (the audio uploaded as a file, not connected to the text node, because a transcript connected to the text echoes the text) for every paragraph with a risk word, and compare. A word that comes back wrong is re-recorded with a respelling before delivery; a word that comes back right stays on the wachtlijst for Kamiel's ear.
- Approved entries go into films/UITSPRAAK.md and films/uitspraak.json with the exact voice input and the model they were tested with.

### 6. Storyboard and style frames

- Film plan: per chapter its type, axis, central simulation and the misconceptions it tackles. With two levels: which segments are vwo blocks. Per scene: its scale level and therefore its look (Micro, Macro or Schema), and every change of look with the transition used.
- Storyboard: one row per narration line, with the line, its cue words, what's on screen, the on-screen text and the simulation state. A level column (basis / vwo). A look column.
- Cue table: built from the storyboard once the audio exists. One row per cue (a line can have several), with its kind (term, question, answer, action, hold, level-start, level-end, look-change), its anchor (a word in the narration, or an offset within a silent segment), its time and its duration. The player runs on it, and the computed checks in section 11 use it.
- Style frames: the keyframe stills of the storyboardblad (B7) are the style frames; one of them shows a phone held sideways, and for a two-level film one shows the level label. Every style frame is checked against Part C before the checkpoint: look, palette, typography, UI layer; deviations are listed, not hidden.

### 7. Checkpoint

Default (autonomous mode): the checkpoint is a self-check. Claude makes the checkpoint page as below, judges it against Part B and Part C as a demanding outsider would, writes down what it chose, added or flagged, saves the page in the film's bron/ folder (bron/checkpoint.html) and builds on. Claude stops only for a decision it cannot take alone: a contradiction in the brief, a CE question that decides the topic, a puzzle choice with no preference given; that question goes into the bouwlijst as an open item and Claude continues with the next film. Every finished film is published on the site and gets status "Gebouwd · wacht op review" in the bouwlijst; Kamiel's later review turns that into "Gereviewd" or "Aanpassen" with his points, and Claude works those through film by film (B13).

Storyboardkeuring (alleen twijfelscènes, Kamiel 25 okt 2026: 'laat vooral beoordelen waar je over twijfelt'): before any audio is recorded, Claude makes the storyboard of every film (one keyframe per scene, the narration line, one note on what moves) and judges it itself against Part B and Part C. Kamiel sees only the scenes where Claude genuinely doubts or where a choice is his: a new character or a new role for a cast member, a new drawing that will join the library, anything sensitive (death, illness, violence, a real person), a deviation from the brief or the approved plan, a fact Claude could not settle with a source, a pose or action the cast cannot draw well. Each such scene carries two short lines, shown apart from the narration: 'Twijfel' (what the doubt is) and 'Waarom' (why Claude cannot settle it alone: no source, no reference plate, a taste or classroom call, a role that needs Kamiel's OK, an earlier error at that spot), Kamiel 25 okt 2026. All other scenes go into production without waiting; the fresh visual review after the build (C10.7) and Kamiel's review of the finished film in the reviewstand are the checks for those. The storyboardblad shows the twijfelscènes first (or only), stores each ✓ and remark itself, and Claude reads the keuring back directly. If a film has no twijfelscène, there is no storyboardblad for it; say so in one line. In reeksmodus all twijfelscènes of the series go on one blad.

The checkpoint page holds, in one go:

- the reviewed script, with a short summary of each review pass;
- the film plan and the storyboard;
- the style frames;
- the uitspraakwachtlijst for this film (word, voice input, paragraphs);
- the coverage table;
- everything you added or flagged, including new chapter types and any object drawn for the first time that joins the series library;
- the numbers table with sources, plus the evidence table for type H;
- the expected running time; for two levels: with and without the vwo blocks.

Only when the brief says CHECKPOINT: wait, this is the moment I review: wait for my approval, then build the whole film without check-ins, and only stop for a problem you can't solve without me.

### 8. Audio

- ElevenLabs, with the voice and model from the brief, the same for the whole film and the whole series.
- Record continuous takes per paragraph, one take each.
- Word-level timestamps: from the voice's own timestamp output when available, otherwise by transcription or forced alignment. Order of choice: (1) request timestamps at generation when the tool offers them at no extra cost; (2) for existing audio, a local open-source forced aligner run on the exact voice input (respelled words such as "neguntig" and "deeënaa" included), which costs no credits; (3) ElevenLabs Forced Alignment only after Kamiel agrees, because it spends credits. Spot-check every cue that sits on a respelled word or after a long pause; a cue that is off by more than about 0.2 s is fixed by hand. A transcription connected to the recording's text node gives timings only; it is not a pronunciation check (B5).
- Never choose between variant takes: one take per paragraph (B5). A take with a wrong risk word, a wrong duration or clipping is re-recorded.
- The timeline is the narration takes plus fixed silent segments: title and chapter cards, holds and prediction countdowns. During narration the audio is the master clock, and every cue is tied to a word.
- Mastering: all takes at the same loudness (−16 LUFS, true peak at most −1 dBTP), consistent pauses between paragraphs, no clicks at the joins.
- No music under the narration. Sound effects only where they carry meaning; a short sting on the title and chapter cards is fine.

### 9. Build

Engine

- One web page that runs from a web server and by double-click: scripts, styles, fonts and caption data inline, audio as files next to the page. Fonts: the three typefaces of Part C, embedded.
- Deterministic: simulations run on a fixed time step with cached snapshots and seeded randomness, so every moment looks the same whether reached by playing or by seeking.
- Timed chance: choose seeds so key events land on their cue word, or script one hero particle among truly random ones. Statistical outcomes such as ratios and distributions always come from the actual simulation. Say so in the teacher section.
- MP4 on request: 1920×1080, 30 fps, H.264 (yuv420p) with AAC audio and faststart, plus the captions as a .vtt file. For two levels: a full MP4 and a basis-only MP4 that skips the vwo blocks at their level-start/level-end cues.
- Player: reuse and improve the reference player films/gedrag/5-emotieregulatie/bron/src/player.js, never rebuild it. It already has the keyboard (space, arrows, A/B/C, Enter, listed in the help box), snelheid, Leerling/Klas, Havo/Vwo and Vragen aan/uit.
- Site navigation: a slim bar above the title with "Biologie bij Kamiel" (link to ../../index.html#home) and, in gold, "← Terug naar \<hoofdstuk>" (link to ../../index.html#\<hoofdstuk>). The series line links to the sibling films by relative path (\<n>-\<slug>.html), never to Claude artifacts; a film that does not exist yet is "· volgt". Files live at films/\<hoofdstuk>/\<n>-\<slug>.html in the site repository. The new film is added to HOOFDSTUKKEN.\<hoofdstuk>.films and FILMKUNST in index.html and to pta-route.html (see CLAUDE.md in the repo).

Look

- Part C is binding; what stays here is what Part C doesn't say:
- Time and scale: any speed that isn't real time is labelled ("1 s = 1 dag", "1000× vertraagd"). The scale bar is true for the structures in view; anything drawn larger is tagged "vergroot", with the factor where useful. These labels are set in Meta-mono.
- Hold 1–2 s after a key insight.
- Colour-blind safe: koraal and groen never carry a contrast on their own; where both are on screen, shape, label or position also tells them apart. Check with a colour-blindness simulation.
- Readability on a phone held sideways rules every text size (Part C, Typografie).

Pedagogy in the player

- Each prediction moment is a fixed segment in the timeline: the question, the options and an 8-second countdown as thinking time. It is drawn as the vraagkaart of Part C.
- The reference player handles the rest: Leerling/Klas (USE sets the default; ?modus=klas; Leerling waits for a tap, Klas for "verder") and, with two levels, Havo/Vwo (?niveau=havo, default Vwo; Havo skips the vwo blocks, vwo check questions and vwo terms). Write the basis line so the audio joins cleanly at every level cue.
- MP4: the segment simply plays.
- No answer appears before it is asked or spoken, and terms stay on screen for at least 5 s. Both are checked on the cue table.

  **Vragen uit.** The player has a Vragen aan/uit switch (remembered across films as `bk-vragen`, also `?vragen=uit`). With Vragen uit nothing of a question or its answer may remain, in sound, captions or picture; the repo scripts spelerfix.py, antwoordtekst.py and kortantwoord.py remove the rest (run them with --check after every build, B11). Narration after a question never leans on it: it says the content again in its own words, so the film runs on cleanly when the question is gone. Settle this in the script, not only in the player.

Captions and phones

- Captions phrase by phrase, at most two lines, synced to the word timestamps, in the ondertitelkast of Part C. Word highlighting is optional and off by default.
- Captions never cover content: on narrow screens the kast sits in a band below the picture; otherwise it sits in a reserved caption zone at the bottom of the stage that no animation or label enters.
- Touch-friendly controls. On iPhone, fullscreen is a full-viewport mode with a hint to turn the phone sideways, because iPhone Safari can't make page elements fullscreen.
- Smooth playback on a mid-range phone, measured in QA. The texture inside a Micro cell is drawn once as a cached texture, never per frame.

### 10. The page

- Player with a chapter list (verdieping tagged, vwo blocks tagged), a glossary (terms and definitions exactly as in the brief, vwo-only terms tagged) and the full transcript.
- Teacher section: how the film explains it (per chapter: type, look and key visual), misconceptions addressed, pause and discussion moments, the numbers behind the film (value, unit, source, rounding), simplifications and why, suggested practicals, leerdoelen coverage per level, and the source list of any CE questions used.
- 3–5 check questions in exam style, with the answers folded away; with two levels, grouped per level.
- Credits and version: voice, sources, version number and date.
- If the brief names a series, add the film to the series page: all films on one page, with a shared glossary.

### 11. QA before delivery

Computed from the cue table and the rendered page:

- no reference to tools in the narration or on any card: `grep -i -E "probeer|tool|op de site|zelf (proberen|uit)|onderzoekje"` on bron/script.md and the voice input finds nothing spoken (B4);
- no text overlaps other text, the caption zone or the frame edge; the level label overlaps nothing;
- every term is on screen for at least 5 s, no answer appears before its question, and every cue falls inside its segment;

  Vragen uit (B9): play every question with the switch off, from 5 s before the cut to 5 s after it, including the short tail at the end of a chapter, and check sound, captions and stills: nothing of the question or its answer may remain. In the repo: `scripts/spelerfix.py --check`, `scripts/antwoordtekst.py --check` and `scripts/kortantwoord.py --check`, plus a search of the narration after each question for words that refer back to it (vraag, voorspel, antwoord, klopt, inderdaad, zoals je). Run this after every build and every change (B13, B14).
- every level-start has a level-end, no vwo block lies inside a basis prediction segment, and the Havo playback has no audio join that cuts a sentence;
- contrast is at least 4.5:1, every leerdoel is covered at its level, and every number is in the numbers table;
- Part C: every colour on the stage is in the Part C palette or a tint of it; no more than three betekeniskleuren plus goud in one frame; at most one annotatiehaak at a time; every look-change cue is a zoomcirkel or a cut to a Schema card;
- determinism: the frame at a given moment is identical whether reached by playing from the chapter start or by seeking;
- performance: frame times stay under 33 ms with the CPU throttled 4×.

Looked at:

- a contact sheet per chapter (one frame every 2 s) at desktop 16:9 and on a phone held sideways, plus full-size stills at every term, question and answer cue and wherever a computed check failed. Use one sub-agent per chapter. Check for hidden text, labels that contradict the narration, unreadable text, timing mismatches and science errors and look breaks (a scene drifting from its look, a cartoon face, a gradient, a glow);
- with two levels: the same contact sheet for the Havo playback, read by an agent that has not seen the vwo blocks, checking that the basis line still makes sense;
- a final fresh-eyes review by a separate agent: the science, and whether it makes sense to a student from the audience.

Fix everything you confirm. Deliver the film with a short QA report (what was checked, what was fixed, what is left, and the risk-word timestamps from section 5) and the updated uitspraaklijst and series library. In autonomous mode the QA report goes into bron/reviews/eindreview.md and the film's row in the bouwlijst gets its status.

### 12. Bronmap and storage

Every film is delivered into the site repository (kamieljacobs/biologie-, branch main) with a bron/ folder next to it, so a later session can change the film without decoding the HTML. Film at films/\<hoofdstuk>/\<n>-\<slug>.html → bron at films/\<hoofdstuk>/\<n>-\<slug>/bron/. The template and the existing build forms are in films/BRONMAPPEN.md.

- The bron files (brief.md, script.md with the voice input, info.md, storyboard.md, uitspraak.md, checkpoint.html) and the build forms are described in films/BRONMAPPEN.md; the site rules in CLAUDE.md of the repo.
- Audio: one take per paragraph with its word timestamps, so one paragraph can be re-recorded alone.
- Push film and bron together, in one commit. A published path never changes: the planner and the site link to it.

### 13. Changing an existing film

- Read bron/info.md and bron/script.md first (no bron folder yet: reconstruct it, films/BRONMAPPEN.md). Unpack and pack with scripts/filmbron.py, outside the repo.
- New narration: only the changed paragraphs, same voice, model and uitspraaklijst; update their word timings and every cue that hangs on them.
- Run the checks of B11 that the change touches, open the film in a browser, raise version and date, add one line to info.md, commit and push.

### 14. Opwaarderen naar een nieuwe promptversie

A new prompt version never means rebuilding a film. A film is improved layer on layer, so each version adds to what is there:

- **Promptstempel.** bron/info.md has a line "Voldoet aan: prompt vN" with the date, plus a short list of rules the film deliberately does not follow and why. A film without the line counts as the version of its build date.
- **Only the delta.** To bring a film from vN to vN+1, read only the Wijzigingen lines between those versions and check the film against those, not against the whole prompt again.
- **Verbeterblad first.** Per film, one still per scene that would change, what is there now and what Claude proposes, on a published page that stores Kamiel's Doen / Niet doen and remarks itself (like the storyboardblad, B7). Only approved scenes are changed.
- **What stays.** Narration, script, questions, timings and the player stay. A paragraph is re-recorded only for a factual error or a pronunciation Kamiel rejected (B13). Scenes change in place in scenes.js, on the same cue words.
- **Into the library.** Every object drawn anew (a zaadcel, a vetcel, a darmwand) goes into the shared library with its recipe (C7, C9; in the repo: bibliotheek/lib\_bio.js, with all objects side by side on bibliotheek/testvel.html), so the next film and the next version reuse it instead of drawing it again.
- **Afronden.** Raise the film's version (e.g. 1.0 → 1.1), set the promptstempel, add one line per changed scene to info.md, set the review status to "nog bekijken" and push.

### 15. Variatie en selectie

Make several versions where it is cheap, judge them hard, and keep the best. Judging a set of candidates is easier and more reliable than getting it right in one attempt, so this beats a single "write a good script". The weak point is selection: Claude judging its own work shares the blind spots it had while making it, so selection is done by a blind judge and, for the look, by Kamiel.

| Level | Variants | Who selects | Cost |
| --- | --- | --- | --- |
| Script + storyboard | 3 per film, one of them a grote mutatie (below) | Blinde beoordelaar; Kamiel sees the winner with one line why, and chooses himself when the win is nipt | Text only, no credits |
| A hard animation scene | 2–3 renders of that scene only | Kamiel, side by side | Renders, no voice |
| Voice-over | Never variants: one take per alinea (B8) | — | — |
| Whole films in multiple | Only when Kamiel approves the number beforehand | Kamiel | Many credits |

- **Kleine en grote mutaties.** Small mutations (a different opening, metaphor, order or example) polish a set-up. They never find a fundamentally better one, so a set of three always holds one grote mutatie: a different rode draad or vertelvorm (a casus, a raadsel, an experiment as kapstok). Usually it loses; sometimes it wins. When a film is upgraded to a new prompt version (B14), only small mutations, unless Kamiel asks for more.
- **Grote mutaties in het beeld.** The look is still far from its top, so there the jumps should be bigger than in the didactics. A big animation mutation is a different approach, not a different colour: diepte en licht (lighting, shadows, layers with depth instead of flat planes) · animatieprincipes pushed much further than C8 (anticipation, follow-through, secondary motion, squash and stretch) · rijkere illustratie (detail and texture closer to the scientific illustrations of Kamiel's brother) · een andere techniek (another way of drawing or rendering in code, when the current one has a ceiling).
- **Benchmarkscène.** Every big animation mutation is made first on one fixed scene of about 20 s, not on a whole film: a castpersonage takes a bite of the broodje kaas, one continuous zoom into the dunne darm, an enzyme cuts zetmeel into glucose (person, organ at its real place and scale, zoom, molecules). Shown side by side with the current version as nulmeting and, where possible, an extern ijkpunt Kamiel finds professional. A winning approach goes into Part C; after that, smaller mutations on it.
- **Blinde beoordelaar.** A separate agent that has not seen the making, preferably on another Claude model than the maker. It gets only the brief, the variants (neutral labels X/Y/Z in random order, key in werk/blind/sleutel.json) and the fitnesscheck, through the fixed brief `films/BLIND-BEOORDELAAR.md`. It first scores every variant per criterion, then names the weakest spot of each, and only then gives a winner plus what to take from the losers; it notes its model and says whether the win is duidelijk or nipt.
- **Nipte winst → Kamiel** (Kamiel 25 okt 2026). When the winner leads by 1 point or less, or the judge calls it nipt, the judge does not decide. Claude puts a keuzeblad on the film's twijfelblad (or `werk/blind/keuze.md`): the two candidates side by side, per candidate its strongest and weakest spot, the judge's advice and what would be taken over from the other. Kamiel chooses; the log gets `beslist_door: kamiel`. Until then Claude works on other films, not past the script of this one.
- **Fitnesscheck** (the criteria, from Kamiel's recurring feedback): one leerdoel per scene, clear · misconcepties tackled · biology correct, sizes realistic and organs at their real place · castpersonages, no grey poppetjes · uitspraakrisico's (B5) · Vragen uit works (B9) · human moments carry the concept · animation follows C8 and C9 · length fits the leerdoelen.
- **Recombineren.** The best parts of different variants may be combined (opening from A, metaphor from C). The combination goes past the blinde beoordelaar once more.
- **Bijhouden.** info.md gets one line on which variant won and why; every variant gets a row in `films/logboek/mutaties.jsonl` (fields in films/logboek/README.md), straight after the verdict.

**Erfelijk maken.** The prompt is the films' DNA: a mutation that wins must be inherited, or every film starts from zero again.

- **Proefregel first.** A mutation that wins once may be luck or fit only that film. It goes on the Proefregels list below, and the next films try it on purpose.
- **Vaste regel after repeated wins.** After winning in 2–3 films, or earlier when Kamiel says "dit wil ik altijd", it moves into Part B or C with its own line under Wijzigingen.
- **Uitsterven.** A rule that keeps losing or keeps drawing Kamiel's feedback goes out or back to proef, so the prompt doesn't only grow.
- **Kamiel decides what becomes erfelijk.** Claude proposes promotions and removals at the end of a film or reeks; nothing moves without his OK.
- **Animation goes faster.** A winner from the benchmarkscène may go straight into Part C after Kamiel picks it, because that scene is built to generalise (person, organ, zoom, molecules).

**Proefregels** (rule · since · films tried · won/lost):

- **P1 · de grote mutatie speelt het concept na.** A grote vertelvorm must be a form in which the viewer does or sees the concept itself (selecting = gerichte evolutie, a sealed envelope = testing a prediction, a judge = source versus activity), not a frame around it (backwards, a contest, a riddle, a checklist). Can the drawn form not do that for this topic, redraw once and note why. · 25 okt 2026 · from 10 films: concept forms won 3 of 4, frame forms 0 of 7 · tried in 0 new films.
- **P2 · elke misconceptie een vraag, de begeleider een eigen beurt.** Every misconception in the brief is tested by a prediction or check question, not only told; the begeleider has at least one scene with his or her own lines and the profession is spoken. · 25 okt 2026 · from 10 films: one of the two named among the weak spots in all 10 · tried in 0 new films.

**Welke mutaties.** If Claude picks the mutations, it picks what it already finds logical: inbreeding. So:

- **Mutatiepool + dobbelsteen.** A fixed pool of what can vary (opening, vertelvorm, metafoor, tempo, perspectief, camerabeweging, rol van het personage, and for the look the four families above). A script draws which mutations a film gets; Claude may only strike one that truly does not fit the topic.
- **Meestal klein, soms groot.** Per film one grote mutatie, the rest small.
- **Logboek.** Every mutation tried is logged with won or lost in `films/logboek/mutaties.jsonl`; the pool is `films/mutatiepool.json` and `scripts/dobbelsteen.py` draws from it. Kinds that win get a somewhat higher chance, kinds that lose a lower one, never 100% and never 0%.
- **Genen van buiten.** Now and then a mutation borrowed from elsewhere: a film by Kamiel's brother, a documentary, a question a student asked in class.
- **Leerlingdata als selectie.** The site already measures uitgekeken (GoatCounter) and scores on the oefeningen. After a few months, check which kinds of choices go with better watching and scores: noisy, but an independent selection next to the judge and Kamiel.

**Als we veel afkeuren.** Keep the win rate of mutations in the logboek. Almost everything wins → the judge is too mild. Almost nothing wins → ask three questions before changing anything:

1. **Zitten we bij een top?** Judge, Kamiel and students agree, but gains are small → bigger mutations, not new criteria.
2. **Is de pool slecht?** All three reject the variants → evolve the pool: drop kinds that keep losing, add new kinds.
3. **Kloppen de criteria?** The judge rejects what Kamiel or the students like, or rewards the wrong thing → evolve the fitnesscheck.

**Vaste meetlat.** Never change criteria to make mutations pass: that moves the ruler, not the films. Real progress is measured against what does not move: the nulmeting of the benchmarkscène, Kamiel's eye and the student data.

**Geleend van AlphaEvolve, FunSearch en Promptbreeder.**

- **Goedkope keuring eerst.** Every variant passes the cheap automatic checks first (`scripts/scriptcheck.py`: lengths, guessable options, answer positions; for the look Part C colours, Vragen uit scripts, uitspraak risk words, contact sheet), then the blinde beoordelaar; only nipte cases reach Kamiel. His time is the expensive test.
- **Een gevarieerd archief, niet één winnaar.** Keep the best variant per kind (best opening with a casus, with a raadsel, with an experiment …) in `films/variantenarchief/README.md`, so variation stays available and the search doesn't collapse onto one answer.
- **Winnaars en verliezers kijken mee.** When making new variants, the generator gets earlier winners from the archive and the reasons the losers lost, so every round builds on the last.
- **Snel model voor de breedte, sterkste model voor de diepte.** Many variants (openings, storyboards) with a faster model; the strongest model works out the winners.
- **Kleine gerichte ingrepen.** A mutation is preferably an edit to one scene, not a new film (as in B14).

**Patroonronde** (end of every series, and before every new prompt version). Run `scripts/dobbelsteen.py --toon` and `scripts/foutenpatronen.py`, update the archive, count the Proefregels (tried / won), and put the proposals (promote, drop, new proefregel, change in the pool) in films/WERKWIJZE-LESSEN.md for Kamiel. Tick it off in the OVERDRACHT of the series.

**Onderhoudsbeurt** (every \~3 prompt versions). A big prompt costs tokens at every step and lets rules compete or half-contradict. Blind removal is just as risky: many rules are scars of real errors. So every rule gets a label, and only Kamiel's OK changes anything:

- **Litteken** — born from Kamiel's feedback on a real error. Stays, unless he says the problem is gone.
- **Verhuisd** — already enforced by a library, list or script (uitspraak.json, lib\_bio.js, spelerfix.py …). The long text goes; one line points to where it lives.
- **Dubbel / achterhaald** — superseded by a later version or said twice. Merged or removed.
- **Twijfel** — unclear whether it does anything. Knock-out-test: leave it out in one trial (benchmarkscène or one storyboard), let the blinde beoordelaar compare. No loss → it may go.

Nothing really disappears: removed rules go to the appendix Uitgestorven regels with date and reason, so they can always come back.

## Part C — Beeldstijl

Every film has one look, built from three scene looks and one fixed UI layer. The look of a scene follows from its scale level, never from the topic or the chapter type. These rules are binding; Part B1 ranks them above visual ambition and length. Kamiel's general visual feedback is collected in films/BEELDAFSPRAKEN.md in the site repo: read it before every film; it is binding too and wins over Part C where they differ.

| Look | Scale level | Reference |
| --- | --- | --- |
| Micro | molecuul, cel, organel | the illustrator's cell style: dark, detailed |
| Macro | organisme, populatie, ecosysteem, aarde en tijd | Kamiel's ecology frames: flat, geometric, calm |
| Schema | all abstract image types; organ cross-sections; onderzoek doen; biologie en samenleving | neutral navy; the default |
| UI layer | always, over every look | the illustrator's typography and labels; Kamiel's ondertitelkast and annotatiehaak |

### C1. Shared foundation

Backgrounds: all looks are dark, never pure black, never white. The three backgrounds lie close together so a zoom from Macro to Micro is not a style break.

| Look | Background | Hex |
| --- | --- | --- |
| Micro | blauwzwart | #121A26 |
| Macro | nachtblauw lucht, donkergroen voorgrond | #1E2E4A lucht, #2F4A3A heuvels, #3A5540 voorgrond |
| Schema | neutraal navy | #1A2740 |

Betekeniskleuren: colour carries meaning, never decoration. Six colours, fixed for all films; a colour never changes meaning between films or series.

| Kleur | Hex | Betekenis |
| --- | --- | --- |
| Goud | #E0B64A | focus: the subject of the moment, zoomcirkel, leader lines, meta text |
| Koraal | #E07A5F | energie, warmte, bloed, mitochondriën, ATP |
| Groen | #7FC48F | leven, plant, fotosynthese, positief resultaat, conclusies |
| Teal | #5BA4C9 | water, zuurstof, informatie, koud, zenuwsignalen |
| Paars | #8C7BBF | kern, DNA, erfelijkheid, hormonen; the vwo marker |
| Oker | #C9A35C | voedsel, bodem, organismen, vesikels |

Vaste moleculekleuren: every recurring molecule or particle type gets one colour from this table, the same in every film of every series (DNA and RNA paars, ATP koraal, glucose and other food molecules oker, O₂ and water teal). The first film that draws a type records its colour in the shared library (C7); later films never change it.

Neutrals: text #F2F2EE, secondary text #9AA3B2, lines and borders #8FA0B5, dimmed context at 35% opacity.

Typografie: three roles, never more.

| Rol | Gebruik | Voorstel | Minimum size on the 1920×1080 stage |
| --- | --- | --- | --- |
| Titel | titelkaart, hoofdstuktitel, "Wat denk je?" | serif display, bold (Fraunces or Playfair Display) | 64 px |
| Tekst | labels, captions, questions, annotations | humanist sans (Source Sans 3 or Inter) | labels 36 px; key terms and questions 48 px; captions 44 px bold |
| Meta | small caps under labels (SCHEMATISCH, ÉÉN BÈTACEL), units, scale labels, series and level tag | mono, wide letterspacing (IBM Plex Mono or JetBrains Mono) | 28 px |

Graph axis values may go down to 28 px in Meta; nothing on the stage is smaller. Contrast at least 4.5:1 everywhere.

Vormregels for all looks:

- Muted fills; saturation is reserved for the betekeniskleuren.
- No gradients, no glow, no drop shadow. Depth comes from layers (with parallax and a slightly softened back layer, C8) and, in Micro, from a calm, sparse texture.
- People get a simple face (eyes, mouth) in a few lines, no eyes with white; they may have skin colour and rounded, soft shapes rather than angular silhouettes; animals get a real eye by C9. Silhouettes without a face only for crowds and small action figures. A person with a role is always a character from the castboek (personages/, roles in ROLLEN.md), never a generic grey figure; walking and running use the castboek gait engine.
- Never more than three betekeniskleuren on screen at once, plus goud for focus.
- Detail one step richer than plain schematic, by C9: the focus gets full detail, the context about half. Detail is always a real structure, never decoration.
- What the narration names moves or lights up; everything else stands still or keeps only the calm background motion of C8.

### C2. Look 1: Micro

The illustrator's cell world: blue-black cytoplasm with a calm, sparse texture inside the cell, organelles with muted fill and a thin light border, one fixed colour per organelle. For molecule, cell and organelle.

Tekenregels:

- Background #121A26. Inside a cell only a calm, sparse texture: few beige dots (#C9B896 at 10–15% opacity), just enough to show that the cytoplasm holds dissolved particles. No grain outside cells. Drawn once as a cached texture.
- Every shape has a border of 1–1.5 px in a lighter tone of its own fill, never black.
- Texture comes from repetition: dots for ribosomes, double lines for membranes, short dashes for cristae.
- Cytoskeleton as thin grey lines (#8FA0B5, 0.75 px).
- The state of something changes only its saturation, not its shape: an old mitochondrion is grey-brown and dull, not a different drawing.
- Detail level high in the focus, low outside it.
- Simulated particles (type A films) are drawn as small rounded shapes in their betekeniskleur with the same border rule; the texture stays behind them and does not move with them.

Organellenbibliotheek: every organelle looks in film 1 exactly as in film 12. Their colours are tokens in lib.js (C.mito, C.golgi, C.er, C.lyso, C.ves, C.kern …) and their drawings live in the shared library (bibliotheek/lib\_bio.js, testvel.html); reuse them, never redraw.

Moleculen: rounded shapes with the same border-and-fill rule, in the betekeniskleur of their function: ATP koraal, glucose oker, zuurstof teal, DNA paars, enzymes grey-blue (#7A8BA8) with the active site in goud. Atoms and bonds only in vwo blocks, as simple ball-and-stick in neutrals.

### C3. Look 2: Macro

Kamiel's ecology look: flat, geometric, calm. Night-blue sky, grey-blue mountains, pine-green hills in layers, schematic organisms in oker and earth tones. For organism, population, ecosystem and earth-and-time.

Tekenregels:

- Flat fills, no grain (unlike Micro). Depth comes from three to four layers that get lighter and greener towards the front.
- Sky as a flat plane #1E2E4A, no gradient. For a hint of horizon, two planes (dark above, slightly lighter below) with a hard edge.
- Landscape geometric: triangular mountains (#4B5878 with light top #B8C0D0), soft hill lines (#2F4A3A), foreground #3A5540, water #2E6FBF as a strip.
- Organisms by the Dieren recipe in C9: fairly realistic but flat-drawn, built from real proportions, with a real eye; not only in side view. Proportions correct between them (deer bigger than shrub, smaller than tree).
- Repeated elements (shrubs, trees, individuals of a population) in at least three variants, randomly scaled (80–120%) and mirrored, never evenly spaced.
- Empty space is functional: the sky holds labels, annotations and the ondertitelkast, not filler.
- Day variant allowed for an ecosystem "in werking": sky #6E8CA8, water #2A6E7E, sand #C9A86A, soil #3A2E24. Same shape rules; a film picks day or night and does not switch.

Organismenbibliotheek: no fixed colour per species, fixed colour groups.

| Groep | Kleur | Regel |
| --- | --- | --- |
| Zoogdieren en vogels | oker en bruin (#B08A5C, #8C5A3A), grijs voor wolven en roofvogels | volgens het recept Dieren in C9 (zij-, driekwart- of vooraanzicht), egale vlakken, lichtere buik |
| Planten en algen | groen (#7FC48F, #5FA86E) | silhouet met herkenbare bladvorm, geen individuele blaadjes buiten focus |
| Ongewervelden | oker en koraal | eenvoudig silhouet, segmenten als lichte lijnen |
| Bacteriën en schimmels | teal en grijs | stok of bol met lichte rand |
| Mens | castboekpersonages (C1); neutraal #9AA3B2 voor menigtes | zie C1 |

Populations and selection: individuals are small copies of the same silhouette. The trait at stake (coat, beak, size) gets a betekeniskleur; everything else stays neutral. A dimmed individual (35%) is gone: dead, emigrated, not selected.

### C4. Look 3: Schema

The default look: neutral navy without landscape, thin lines, betekeniskleuren, lots of air. Every film that shows no cell and no landscape lives here; that is more than half of all scenes.

When Schema:

- All abstract image types: flow diagrams, regelkringen, kringlopen, graphs, kruisingsschema's, stambomen, timelines, side-by-side comparisons, text and question cards.
- Organ and tissue as cross-section or schematic tube (darm, bloedvat, nefron, synaps). A film chooses between Schema and a Micro zoom and does not switch.
- Onderzoek doen: set-ups as a schema with variables and arrows.
- Biologie en samenleving: choices, chains and consequences with icons and human figures.

Tekenregels:

- Background #1A2740, flat. A faint grid (#FFFFFF at 3%) is allowed for graphs, nowhere else.
- Shapes: rounded rectangles and circles with a 1 px border in a lighter tone of the fill; fill in neutrals (#2A3A58) unless the shape has a meaning.
- Arrows: 1.5 px, #8FA0B5, open head. An arrow in a betekeniskleur means that substance or signal flows.
- Graphs: axes #8FA0B5, one line per betekeniskleur, axis values in Meta at 28 px or larger, units in Meta.
- Kruisingsschema's: alleles as letters in text colour, genotypes in rounded cells, phenotypes as a small organism silhouette from the Macro library in the matching colour.
- Comparisons: items on one baseline (#8FA0B5), equal height, label below, annotatiehaak from the UI layer.
- At most seven elements on screen at once; more is built up in steps or split.
- Lab library (onderzoek doen): test tube, erlenmeyer and beaker as line drawings #AFC0D0 with liquid as a flat plane in a betekeniskleur; petri dish as a circle from above with colonies as dots in oker or teal; microscope, pipette, thermometer and balance in side view, line drawing, no detail; test subject or animal as a silhouette from the Macro library; variables with fixed Meta labels ONAFHANKELIJK, AFHANKELIJK, CONTROLE.
- Mens-en-maatschappij library: people are castboek characters in their fixed roles (C1, personages/ROLLEN.md); a group or population as a grid of small silhouettes, share or distribution via colour and dimming; places (hospital, farm, factory, school, city) as one line icon in a rounded rectangle, fixed across films; products (medicine, food, crop, vaccine) as a simple shape in oker or teal with a light border; a choice as two or three columns on one baseline, arguments as short labels, conclusion with a green annotatiehaak.

### C5. UI layer

Identical in every film and every look. This is what makes three looks one channel, so no variation here.

- Labels: two lines, as the illustrator does it: name in Tekst white (#F2F2EE), below it a short note or status in Meta capitals in gold-grey (#C9B896). No leader lines (they were too often wrong): the name sits directly beside or on the part it names (naamBij), with a dark outline around the letters where needed. Labels never cover other labels or key parts of the drawing. On busy or light Macro-day backgrounds the name may sit in a dark pill (#121A26 at 85%, radius 6 px).
- Ondertitelkast: dark rounded box (#0D1420 at 90%, radius 12 px), centred at the bottom with a margin, Tekst bold white, at most two lines, 44 px. Present whenever there is narration; gone on question cards and the title card. On narrow screens it moves into a band below the picture (B9).
- Annotatiehaak: a bracket (1.5 px) under or beside the elements a conclusion is about, in the betekeniskleur of that conclusion (usually groen for "dit is de regel", koraal for "let op"), with one short sentence in the same colour. At most one at a time.
- Zoomcirkel: circle with a gold border (1.5 px #E0B64A), contents in the target look, two straight gold leader lines to the source, caption in Meta below the circle. The fixed transition from Macro to Micro and from organ to cell.
- Focus and dimming: the subject of the moment gets goud (border, leader, label) or its own betekeniskleur at full strength. Everything that does not matter now goes to 35% opacity. What the narration names is never dimmed; what it does not name does not move.
- Title card: title in Titel large top-left, the puzzle question below it in Tekst, main image right in the look of the film. Meta top-right for series and level (VWO · STOFWISSELING 3/4). End card: three key sentences with an annotatiehaak, no image.
- Chapter card: Schema background, chapter number in Meta, chapter title in Titel, the chapter's mini-question in Tekst. Same layout in every film.
- Vwo marker: a narrow purple bar (#8C7BBF, 6 px) on the left edge of the stage and VWO in Meta top-left for the whole block, from the level-start cue to the level-end cue. Nothing else changes. The chapter list shows the same tag.
- Vraagkaart: "Wat denk je?" in Titel, the question in Tekst, options as rounded cards in Schema style, background always Schema navy whatever the look of the film. The countdown is a thin gold line that shortens.
- Scale bar and speed label: Meta, bottom-left of the stage, outside the caption zone.

### C6. Keuzeregels and transitions

- Decide the scale level per scene: molecule or cell → Micro; organism, population, ecosystem or earth-and-time → Macro; everything else (schema, graph, cross, comparison, organ as tube or cross-section, research, society) → Schema.
- Doubt between Schema and another look → Schema. Schema is the default; Micro and Macro are the exceptions that need a landscape or a cell.
- Organ and tissue: per film choose between Schema (tube, cross-section) and a Macro body with a Micro zoom. Not both in one film. The brief's LOOKS field records the choice.
- A change of look happens only via the zoomcirkel (Macro → Micro, organ → cell) or via a cut to a Schema card (graph, question card, summary). Never a fade between two looks. One scene never changes look.
- Macro-day only for an ecosystem "in werking"; comparisons, selection and evolution over time always Macro-night or Schema.
- Vraagkaart, vwo marker, ondertitelkast, title and chapter cards look the same in every look.
- Betekeniskleuren hold across looks: a substance that is koraal in Micro is koraal in a Schema graph.

### C7. Libraries

- The series library (Part A2) lists every recurring object with the film that first drew it. An object in the library is reused, never redrawn. A new object is drawn by the rules above and reported at the checkpoint, then joins the library at delivery. The library is shared across all series, not kept per series: a ribosome, membrane, mRNA strand or antibody is drawn once, well, and reused in every film; an improvement to a library object is made once and carries over. Referentiemap: before Claude draws a new library object, it looks at the reference images Kamiel or his brother supplied for it, and looks up its real structure in text (subunits, proportions, how parts attach). Without a reference, Claude says so at the storyboardkeuring.
- Claude draws everything itself as SVG or canvas by the rules above; every frame must pass the Part C checks in B11.
- Raster images (photos, scans) never appear on the stage; a real-world opening is drawn in Macro or Schema.

### C8. Beweging en camera

Motion should feel alive, never busy. These rules hold in every look.

- Bewegingsprincipes: everything eases in and out, no constant-speed glides; paths run in arcs, not straight lines; actions get a small anticipation before and a follow-through after (an enzyme pulls back before it cuts, a vesicle wobbles once as it pinches off).
- Rustige celbeweging: inside a cell, molecules jitter slightly and the cytoplasm drifts very slowly; small proteins turn a little. It stays below attention: low amplitude, slow, sparse, and it pauses during a key insight.
- Vloeiende vormovergangen: a change of form is a morph, not a swap: a protein chain folds, a chromosome condenses, a cell pinches in at division.
- Schema lijn voor lijn: a schema (kruisingsschema, regelkring, voedselweb) may build up line by line as on the board, but only where the build-up itself adds understanding and costs no more than a few seconds; otherwise it appears whole.
- Diepte: two or three layers moving at different speeds (parallax) on camera moves; the back layer slightly softened, the focus sharp.
- Doorlopende zooms: a change of scale level (organism → organ → cell → molecule) is one continuous zoom, not a cut, with the scale bar updating in the corner.
- Eén molecuul volgen: in a busy scene, one particle is followed through the process, marked with a goud outline (not a glow).
- Schaal voelbaar maken: where a size or number matters, show it against something familiar (cells on a pinhead, DNA unrolled against a body length).
- Timing: every motion that belongs to a word starts on that word's timestamp (B8).

### C9. Tekenrecepten

The running animation showed it: a drawing looks right because of research, numbers and a check, not because of style rules alone. This holds for every object and every movement, in every look.

**Werkwijze** for every object or movement drawn for the first time:

- Opzoeken: the real structure and proportions, and for movement the measured phases, angles and durations, with a source. Use the referentiemap (C7) where it has an image.
- Recept: record in the shared library the numbers that make it right (proportions, angles, durations) and one or two known errors.
- Controle: a still next to a reference image with the proportions measured; for movement a contact sheet of stills per 1/30 s (a supporting foot does not slide, a phase that must exist is visible). Shown at the storyboardkeuring.
- Hergebruik: once approved, the object is only reused (C7).

**Geleerd bij *Bestaat dit echt?*** (22 okt 2026):

- Teken alle nieuwe bibliotheekobjecten eerst samen op één testvel en bekijk dat vóór ze in een scène gaan. Reken op een tweede ronde: van de tien dieren moesten er drie opnieuw.
- Dieren met segmenten (kreeften, garnalen, insecten): één doorlopende lijfvorm met de segmenten als banden erin, nooit losse blokjes naast elkaar.
- Controleer ook de rusthouding, niet alleen de opvallende pose (de liervogelstaart in rust sleept schuin omlaag, niet recht naar achter).
- Kijk op het testvel ook naar kleine onderdelen (tenen, antennes, losse lijnen): een tekenhulpfunctie kan ze ongemerkt weglaten.
- Laat het bronnenonderzoek per onderwerp ook een lijst 'niet zeggen' opleveren: overdreven beweringen van internet. Die werken goed als voorspelvraag (klopt, overdreven of verzonnen?).
- Een feit dat tijdens het schrijven uit het hoofd wordt toegevoegd, wordt apart nagelopen tegen het bronrapport voordat het in het script blijft.
- Aanhechting: elk aanhangsel (oog, steeloog, voelspriet, antenne, vin, poot, kieuw, staart) begint binnen de omtrek van het lijf of de kop, op de plek waar het in het echt vastzit. Na het hertekenen van een lijfvorm de aanhangsels opnieuw nalopen: bij de bidsprinkhaankreeft zweefden ogen en voelsprieten los vóór de kop toen het lijf korter was gemaakt. Controle op het testvel: zoom in op elke aanhechting.

**Detailniveau**: one step richer than plain schematic. The focus gets full detail, the context about half, a dimmed object (35%) loses its finest detail. Detail is always a real structure, never decoration. Test: the frame stays calm on a phone held sideways; if it gets busy, detail goes.

**Moleculen**

- DNA: right-handed double helix, one turn per about 10 base pairs, major and minor groove visibly unequal, bases as rungs perpendicular to the axis. Known errors: a flat ladder, a left-handed helix.
- mRNA: a thin, slack single strand, about half as thick as DNA, gently curved, never a straight bar; bases as short spikes on one side.
- Eiwit: a chain of beads that folds into helices and flat stretches; folding is a morph; sugar chains as small branched beads that attach. An enzyme has a pocket (active site, goud) that closes slightly around its substrate. Never a plain ball.
- Antistof: a Y of four chains (two long, two short), arms flexible at the hinge, binding at the tips.
- Antigenen and receptoren stand perpendicular on the surface, anchored in it, evenly spread. Known error: lying crooked on a bacterium.
- Membraan: always curved with the cell; two rows of phospholipids (head, two tails about twice the head's length); a protein that spans it sticks out on both sides.
- Sizes relative to each other: glucose about 1 nm, DNA 2 nm wide, hemoglobine about 5 nm, ribosoom about 25 nm; otherwise labelled "vergroot".

**Cellen**

- A free cell is round; in a tissue cells press into polygons with rounded corners. Never straight lines or boxes.
- Proportions: nucleus about a third of the cell diameter and not exactly centred; mitochondrion about 1 µm against a cell of 10–30 µm; a bacterium about as large as a mitochondrion; a red blood cell a dented disc, 7–8 µm across and about 2 µm thick; a plant cell with a vacuole that fills most of it and the cytoplasm as a thin rim.
- A cell is full: many organelles, detail only in the focus, the rest as calm texture.
- Detail: membrane with an occasional protein, ribosomes on the rough ER, real cristae folds, nucleolus and chromatin as faint patches, cytoskeleton as fine lines.
- Movement: organelles move in small jerks along the cytoskeleton; the membrane undulates slightly.
- Known errors: an empty cell with five loose organelles; a cell as a box; the nucleus dead centre.

**Weefsels**

- Cells close without gaps in an irregular pattern (80–120% size variation); never a honeycomb or a grid.
- Epitheel: plaveisel flat, kubisch 1:1, cilindrisch 2–4× taller than wide; the nucleus follows the cell shape; a basaalmembraan below; microvilli as a fringe, trilharen as a brush.
- Spier: skeletal muscle as long cross-striated fibres with many nuclei at the edge; smooth muscle spindle-shaped with one nucleus; heart muscle branched with intercalated discs.
- Zenuwcel: dendrites branch like a tree and get thinner; one axon, long and even in thickness; myelin as sausages with gaps (knopen van Ranvier).
- Detail: every cell its own nucleus at a slightly different angle, small differences in tint, capillaries with red blood cells between the cells.

**Organen**

- A cross-section shows the layers in their real order, each with its own texture (darmwand: slijmvlies with villi, ring and length muscle).
- Blood vessels branch and get thinner; folds and villi in their real places. Checked against an anatomical reference. Organs lie at their real place in the body (personages/lib\_anatomie.js), and every object has a realistic size next to the people and things around it (a broodje is about 15 cm next to a person of 1,65 m).

**Dieren**

- Fairly realistic, but flat-drawn in the Macro look: built from the skeleton, with the real proportions of trunk, legs and neck and the joints in the right places (in a dog or horse the backward "knee" is the heel; the real knee sits high against the belly).
- The two or three features that make a species recognisable get detail (the ears of a wolf, the beak of a finch, the gill slits of a shark); the rest stays calm.
- Real coat colour and pattern (lighter belly, spots, stripes) in muted tints, no gradients; scales or feathers as a pattern along the edges. A real eye with the right shape and place, and the right pupil where it matters (goat: horizontal); no cartoon eyes, no smiling mouth.
- Side view, three-quarter and front view are all allowed. Sizes between animals are correct, or a scale reference is shown.
- Known errors: legs as sticks without joints; every animal in the same pose; gliding instead of stepping; cute proportions (big head, big eyes).

**Beweging**

- Dieren: real gaits with the real footfall order (stap, draf, galop with a float phase); fish with a wave through the body, sharks mainly with the tail; birds a powerful downstroke and a folded upstroke. Mensen: the castboek gait engine (lopen, rennen, sprinten).
- Trilhaar: a stiff power stroke and a bent recovery stroke close to the surface; neighbours beat slightly later, so a wave runs over the surface.
- Motoreiwit: steps hand over hand along the cytoskeleton in fixed steps of 8 nm.
- Zaadcel: a wave runs from head to tail, the cell swims forward, the head rotates.
- Spier: the filaments slide past each other and keep their length; only the sarcomere gets shorter.
- Bloed: red blood cells pass a capillary one by one and deform.
- Hart: first the atria contract, then the ventricles.
- Breathing, ears and tail as calm background motion (C8).

### C10. Tekenkwaliteit (v10, 24 okt 2026)

Binding method for every drawn object; the full text with tables is `films/PROMPT_v10_C10_tekenkwaliteit.md` (copy of the doc 'Promptvoorstel tekenkwaliteit (v10, Part C)', https://claude.ai/artifact/S3P5sQcLVpbGufeScVyhoo), approved by Kamiel 24 okt 2026. Recipes per family live in the repo: bibliotheek/dieren/lessen/.

1. **Library first** (bibliotheek/: dieren, lib\_bio.js, castboek). Use an approved object only when it has the pose the scene needs; otherwise extend it, test and get it approved first. Never use it blind.
2. **Sizes and movement from text sources**, written down in the lessons; when plate and source disagree, the source wins. Never from memory.
3. **ElevenLabs reference to learn from, never in a film**: per animal one plate (realistic row in strict side view + flat row with stand, step, head); a head plate after any remark on a head or face; a phase plate only as a shape check per frame, the order comes from the literature; a cross-section/layer plate for micro and organs. One variant per plate (±190 credits). Check the plate's measurements against the source before tracing.
4. **Test sheet before the film**: overlay on the reference outline, in-between poses, zooms of joints and seams; Kamiel sees intermediate rounds too.
5. **Approval and registration** in the beeldbank, then into the library with status, call, poses and a lessons file.

Recipe cards (details in the doc): **Animals** = uitknippop (bones from standing pose, IK, support foot fixed in the world, soft skin at shoulder/hip/neck, one silhouette edge, per animal a head plate and head test sheet). A static outline is allowed only for an animal that does not move in its scene. **Micro** = the real layers in the real order, one DNA function everywhere, contents clipped inside the membrane, units written in full in meta labels. **Organs and body** = castpersonage with lib\_anatomie.js, place and size from an anatomical source, cross-sections in real layers, the process really happens. **Plants and invertebrates** = whole plant at true scale with parts attached, real perspective, three body parts and six legs, wing strokes in 8 phases.

General drawing rules: designed colours (3–4 calm tones per part, never from photo pixels); one silhouette edge per object; true size relative to the rest of the scene; big movements tested in 6 in-between poses, angles blended the shortest way.

**After every build a fresh reviewer** (not the maker) checks the contact sheet with a fixed checklist per still: does the image show exactly what the subtitle says at that moment · relative sizes · labels beside their part, not over drawings, labels or the edge · image already filled at t = 0 of the paragraph · animals move with a library gait without sliding · contents inside the membrane. Every error goes into films/logboek/fouten.jsonl.

## Part D — Doelgroepprofiel onderbouw

Paste Part D when AUDIENCE is onderbouw: leerjaar 1–3, in mixed groups of vmbo-t, havo and vwo working mostly on their own. Part D wins over Part B where they differ; Part C stays binding except for D5. The content comes from the SLO definitieve conceptkerndoelen mens en natuur (November 2025), kerndoel 32 (organismen en gezondheid) and 33C (ecosystemen).

### D1. Brief and levels

- KERNDOEL replaces METHOD + CHAPTER: number and bullets, e.g. "32A, bullets 1–2". The bullets are the leerdoelen; TERMS & DEFINITIONS still override them.
- EXAM QUESTIONS and EXAM STOF / VERDIEPING do not apply. The labels are basis (the kerndoel), uitdaging (the "aanvulling havo-vwo") and verdieping (rare).
- NIVEAU default: "basis + uitdaging-blokken". The basis line is written for vmbo-t and is complete on its own. An uitdaging block deepens what the basis just showed, by the rules for vwo blocks in B4, with the label Uitdaging instead of VWO and no spoken announcement. Onderbouw films never name havo, vwo or vmbo: not on screen, not in the voice, not in the teacher section.
- When a whole group of bullets is havo/vwo only (in 32B: mitose en meiose, DNA, overerving, stambomen, grote stappen in de evolutie), it becomes its own film with NIVEAU "uitdaging", not a block.
- Player: a Basis / Uitdaging switch instead of Havo / Vwo. Default Uitdaging; a link ending in ?niveau=basis skips the blocks.
- USE default: zelfstandig, so the player opens in Leerling mode.

### D2. Depth follows the verb of the kerndoel

| Verb in the kerndoel | What the film does |
| --- | --- |
| beschrijven, benoemen | show it and name it; mechanism only as far as needed to recognise it |
| verklaren | the cause–effect chain is visible on screen; the Why test applies |
| redeneren, analyseren, verbanden leggen | the viewer does the reasoning; prediction moments carry the chapter |
| onderzoeken, experimenteren, verkennen, reflecteren | the film sets up the question; the doing happens outside the film, and the film does not point to it (B4) |

The Why test stops at the depth the verb asks: no molecules where "beschrijven" is enough, and no chemical formulas in the basis line.

### D3. Language and length

- Dutch at B1 level: sentences mostly 12 words or fewer, one idea each, je-vorm, no chains of subordinate clauses.
- About 120 words per minute.
- At most 5–6 new terms per film. Each term comes as everyday words first, then the term, then on screen for at least 5 s.
- Numbers rounded and made concrete with comparisons students know (a classroom, a football field, a grain of sand).
- Length 4–6 minutes, at most 3 chapters, one central question, cold open at most 15 s.

### D4. Pedagogy

- A DAILY-LIFE HOOK is required, from the world of a 12–14-year-old: school, sport, food, phone, pets, garden, weather. Never assume anything about a student's body, family or home.
- A prediction moment every 60–90 s, with 2 or 3 options, one of them a known misconception.
- Typical misconceptions to choose from: plants take their food from the soil; all bacteria are harmful; you breathe in oxygen and breathe out only carbon dioxide; blood in veins is blue; an animal adapts because it needs to; the biggest animal is at the top of the food chain; a cell is flat.
- No "Probeer het zelf" end card or line: the film does not refer to an onderzoekje, opdracht or tool (B4). The end card holds the key sentences only.
- 3 check questions in onderbouw style (2 multiple choice, 1 short "leg uit"), answers folded away.
- The coverage table runs kerndoel bullet → level → chapter → question.

### D5. Look

Part C stays, with these adjustments:

- Schema: at most 5 elements on screen at once instead of 7.
- Micro: only the cell parts the kerndoel names (celkern, celmembraan, celwand, cytoplasma, bladgroenkorrel, vacuole, mitochondrium). The vacuole is not yet in the organellenbibliotheek: the first film that draws it fixes it and shows it at the checkpoint.
- Macro: recognisable everyday settings (school garden, ditch, park, kitchen) next to the landscapes.
- People: castboek characters as in C1, varied, never as a stereotype.

### D6. Page and site

- Teacher section: the kerndoel bullets covered and at which level, the suggested onderzoekje, and which segments are uitdaging.
- Files at films/onderbouw/\<kerndoel>/\<n>-\<slug>.html, e.g. films/onderbouw/32a/1-alles-is-cel.html. The navigation bar reads "← Terug naar \<kerndoel title>" and links to ../../../index.html#\<kerndoel>.

### D7. Not yet

Kerndoel 32D (relationele en seksuele gezondheid) gets no films for now. If it is added later, it needs its own rules first.

## Wijzigingen

❖ v9 (22 okt 2026): new B15 Variatie en selectie: 3 script/storyboard variants per film with one grote mutatie, a blinde beoordelaar (other model, blind labels, scores per criterion on a fitnesscheck), recombination, scene variants only for hard animations, whole-film variants only with Kamiel's approval; big animation mutations (diepte en licht, animatieprincipes, rijkere illustratie, andere techniek) tested first on a fixed benchmarkscène; erfelijk maken via a Proefregels list (promote after 2–3 wins or Kamiel's OK, drop rules that keep losing); onderhoudsbeurt every \~3 versions (litteken / verhuisd / dubbel / twijfel with knock-out-test, appendix Uitgestorven regels); mutatiepool with a dobbelsteen, logboek with win rate, genen van buiten, student data as selection; when many mutations lose, three questions (top, pool, criteria) against a vaste meetlat; borrowed from AlphaEvolve, FunSearch and Promptbreeder: cheap checks first, a varied archive, winners and losers in the generator's context, fast model for breadth and strongest model for depth, small targeted edits.

v9 onderhoudsbeurt (22 okt 2026, Kamiel akkoord rij 1–6 en 8–19): prompt follows the later agreements (no spoken vwo announcement, onderbouw Basis / Uitdaging, no leader lines, no grain, castboek for every person and role, animals not only in side view, no variant takes); realistic sizes and organ placement added to C9; Part C points to films/BEELDAFSPRAKEN.md as binding; uitspraaklijst, player spec, Vragen uit list, bronmap steps and organellen colours replaced by pointers to the repo; version markers and v3 notes removed; Drie niveaus moved to B4; style frames = storyboardblad stills; illustrator-asset rules and the open punten from the stijlkaart removed. Removed text: appendix Uitgestorven regels.

✦ v8 aanvulling (22 okt 2026): Vragen uit — nothing of a question or its answer stays in sound, captions or picture, and narration after a question doesn't lean on it (B9); checked by playing every question with the switch off (B11).

✦ v8 aanvulling (22 okt 2026): new B14 Opwaarderen naar een nieuwe promptversie (promptstempel per film, only the delta, verbeterblad first, narration stays, new objects into the library). First used for Geslachtsorganen en puberteit and Wat zit er in je eten?.

✦ v10 aanvulling (25 okt 2026): storyboardkeuring only for twijfelscènes (B7) — Kamiel approved nearly every full storyboard without remarks (Evolutie film 5–8: 141 scènes, 0 opmerkingen), while the errors were found by the fresh reviews; he now judges only the scenes Claude doubts about, and the finished film in the reviewstand.

✦ v10 aanvulling (25 okt 2026): no references to tools in the film, above all not spoken — no "Probeer het zelf" line or card, no "in de tool" / "op de site" (B4, D2, D4); grep check in QA (B11).

✦ v10 aanvulling (25 okt 2026): B15 wired into the steps — varianten first in B4 with `scripts/dobbelsteen.py`, `scripts/scriptcheck.py` and the fixed brief `films/BLIND-BEOORDELAAR.md`; mutatielogboek `films/logboek/mutaties.jsonl` (filled with the first 10 films), pool `films/mutatiepool.json`, archive `films/variantenarchief/`; the judge notes its model and says duidelijk or nipt; a nipte winst (≤ 1 point or called nipt) goes to Kamiel as a keuzeblad; patroonronde at the end of every series (A2); Proefregels P1 (grote mutatie speelt het concept na) and P2 (every misconception a question, begeleider his own scene).

✦ v10 (24 okt 2026): new C10 Tekenkwaliteit (library first, sources win, ElevenLabs plates only to learn from, test sheet and approval, recipe cards for animals, micro, organs and plants); fresh visual review after every build as a fixed step; static outline only for animals that do not move in their scene.

✦ v8 (22 okt 2026): new C9 Tekenrecepten (werkwijze opzoeken → recept → controle → hergebruik, detailniveau, recepten for moleculen, cellen, weefsels, organen, dieren and beweging); animals fairly realistic with a real eye (C1, C3); detail one step richer (C1); Micro texture much calmer and only inside cells (C2); people with a role always from the castboek (C1); uitspraaklijst: ER as "E-R", pH as "P-H".

▲ v7 (21 okt 2026): storyboardkeuring by Kamiel before production, in reeksmodus as one batch (B7); order of choice for word timestamps, local forced alignment first (B8); shared library across series and a referentiemap (C7); vaste moleculekleuren (C1); new C8 Beweging en camera (bewegingsprincipes, rustige celbeweging, morphs, schema lijn voor lijn, parallax, doorlopende zooms, één molecuul volgen, schaal voelbaar).

● v6 (13 okt 2026): autonomous mode as the default (B7: self-check instead of a waiting checkpoint, open questions go to the bouwlijst; CHECKPOINT field in A1 for the exceptions); no uitspraaktest before recording, IPA lookup first and an uitspraakwachtlijst per film that Kamiel listens to in batches (B5); blind transcription of the real takes as the pronunciation check (B5, B8); uitspraaklijst completed with the entries approved since v3 (DNA as "deeënaa", pH, ER, hCG, -lyse, -tonisch, semi-, haploïd, iks-vorm, amino acids, codons); people may have skin colour and soft shapes (C1, C3; choice of 12 okt); site rule for index.html and pta-route.html (B9); checkpoint.html in the bronmap (B12). The bouwlijst ("Bouwlijst uitlegfilms biologie") lists every film per PTA onderdeel with its content and status.

★ v5 (12 okt 2026): Part D Doelgroepprofiel onderbouw; KERNDOEL field in A1; PREVIOUS VERSION points to the site repo; new B12 (bronmap and storage) and B13 (changing an existing film). All films already on the site got a reconstructed bron/ folder on 12 Oct 2026.

◆ v4 (11 okt 2026): Part C replaced the STYLE field and the B9 design system; rule order in B1 has the look at position 4; new brief fields LOOKS, ASSETS, PREVIOUS VERSION (A1), SERIES COLOURS, SERIES LIBRARY (A2); cue kind look-change; Part C checks in QA; illustrator credit on the page; the DNA and Cel series briefs moved to "Seriebriefs uitlegfilms biologie"; keyboard rules and site-navigation bar in B9. Where v3 and the stijlkaart disagreed, v4 decided: three typefaces, one per role; labels 36 px, terms 48 px, captions 44 px, Meta 28 px minimum; level marker as a purple bar; a cut to a Schema card is the one allowed cut inside a chapter; koraal and groen both stay, with a second cue where both are on screen.

## Uitgestorven regels

- (25 okt 2026, vervangen door de twijfelscènes in B7) Storyboardkeuring (always, also in autonomous mode): before any audio is recorded or any animation is built, Claude makes a storyboardblad per film: one keyframe still per scene, the narration line under it and one short note on what moves. Kamiel marks each scene ✓ or writes a remark; only approved scenes go into production. The storyboardblad is a published page that stores each ✓ and remark itself (saved as soon as it is typed, without a separate save button), so Claude reads the keuring back directly. In reeksmodus Claude prepares the storyboardbladen of the whole series in one batch, so Kamiel has one approval round up front and the usual review at the end.

Rules taken out at an onderhoudsbeurt, with date and reason, so they can come back. The full old wording is in the doc's version history (v9 before 22 okt 2026, 22:45).

| Regel | Weg sinds | Reden | Staat nu in |
| --- | --- | --- | --- |
| Uitspraaklijst as a 33-row table in B5 | 22 okt 2026 | Verhuisd; the table lagged behind | films/UITSPRAAK.md, films/uitspraak.json |
| Keyboard spec and Leerling/Klas, Havo/Vwo details in B9 | 22 okt 2026 | Verhuisd | reference player films/gedrag/5-emotieregulatie/bron/src/player.js |
| Full list of what Vragen uit removes (B9) | 22 okt 2026 | Verhuisd | scripts spelerfix.py, antwoordtekst.py, kortantwoord.py |
| Step-by-step bronmap files (B12) and change steps (B13) | 22 okt 2026 | Verhuisd | films/BRONMAPPEN.md, CLAUDE.md |
| Organellen colour table (C2) | 22 okt 2026 | Verhuisd | lib.js tokens, bibliotheek/lib\_bio.js |
| Choose between takes and keep rejected takes (B8) | 22 okt 2026 | Tegenstrijdig met één take per alinea | B5 |
| Spoken vwo announcement; onderbouw label HAVO/VWO | 22 okt 2026 | Tegenstrijdig met afspraak 15–16 okt | BEELDAFSPRAKEN.md |
| Leader lines on labels | 22 okt 2026 | Tegenstrijdig met afspraak 15 okt | C5, naamBij |
| Micro grain | 22 okt 2026 | Tegenstrijdig met v8 en feedback | C2 |
| Human as flat figure with role colour (C4) | 22 okt 2026 | Tegenstrijdig met castboek | C1, ROLLEN.md |
| STYLE field note, SHARED COLOUR MEANINGS note, v3 design-system note, version markers | 22 okt 2026 | Dubbel met Wijzigingen | Wijzigingen |
| Illustrator assets: ASSETS field, SVG rules in C7, illustrator credit, geschatte hexcodes and typefaces | 22 okt 2026 | Rudimentair: from the v4 stijlkaart plan (11 okt); the illustrator delivers no files | Wijzigingen v4 |
| Open punten from the stijlkaart (9) | 22 okt 2026 | Predicted no effect on films; illustrator points lapsed, label style already decided | Version history |
