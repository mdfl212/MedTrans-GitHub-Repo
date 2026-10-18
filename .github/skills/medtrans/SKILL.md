---
name: medtrans
description: Build faithful continuous two-column MD201–MD207 medical study reviewers in Word from lecture slides or PDFs, including native tables, user-approved figures, a 20-item PLE/USMLE-style examination, and landscape master references. Use when a user requests an MD201–MD207 reviewer, full lecture dump, or continuous two-column DOCX. Cross-platform Markdown instructions with optional scripts and templates.
metadata:
  version: "1.5.0-beta"
  type: workflow
  courses: "MD201 MD202 MD203 MD204 MD205 MD206 MD207"
---

# MedTrans

## Cross-platform compatibility (read first)

This is a **plain-Markdown skill specification** intended to be understandable by Claude, ChatGPT, and other assistants that can read files. YAML front matter is metadata; the instructions below are the source of truth.

- **Claude / skill-loader environments:** place this entire folder in the supported skills location so `SKILL.md`, `scripts/`, `assets/`, and `references/` remain together.
- **ChatGPT / Project / ordinary chat:** upload the ZIP or provide `SKILL.md` plus the relevant shell, palette, script, and QA addendum; explicitly instruct the assistant to follow `SKILL.md`. Uploading does not permanently install or auto-activate a skill.
- **Tool adaptation:** do not assume a particular model's file-system path, code tool, API, or renderer exists. Use the supplied JavaScript build scripts if execution is supported and dependencies are available; otherwise use an available DOCX creation/editing workflow and keep the same content, layout, color, and QA rules.
- **Truthful QA:** if the environment cannot render and inspect every page, say which checks were not completed. Do not claim that a file is visually identical to the shell without an actual comparison.
- **Source fidelity:** the provided lecture is authoritative for lecture content. Do not silently correct, reconcile, or supplement its medical claims. Clearly label outside research or discrepancies when requested.


Portable skill for producing dense continuous two-column study reviewers (`.docx`) for modules **MD201–MD207**.

This package defines a repeatable, cross-platform workflow. Formatting fidelity depends on the assistant's ability to read the supplied lecture and shell, create/edit DOCX files, and render the result for quality assurance. Use the included scripts when a compatible Node.js runtime and the `docx` package are available. Otherwise use the platform's supported DOCX workflow while preserving the requirements below, and be explicit about any QA or execution step that could not be completed.

**Version:** 1.5.0-beta

> **Beta callout:** Lecturer / external-source **strips** are a **WIP beta** feature.  
> They may be tried when the user asks, but the AI **must** tell the user that strips are experimental.  
> The validated MD205 strip reference is **MD205 only** until the feature is promoted out of beta.
## Multi-course behavior and class-sharing rules

This package supports the configured course codes **MD201, MD202, MD203, MD204, MD205, MD206, and MD207**. Each course has a matching Word shell and a palette entry in `scripts/palettes.json`.

- **Never infer course identity from the code alone.** Use the provided lecture, the student's explicit course code, and `COURSE_MATRIX.md`. If the course code is missing or conflicting, ask one direct question before styling or generating files.
- **Always use the matching shell and palette.** For example, MD204 uses `MD204_shell.docx` and the `MD204` palette; do not reuse the MD205 shell/palette as a generic default.
- **Fail closed on invalid course codes.** The build helpers should stop with a clear error rather than silently falling back to MD205 or any other palette.
- **Keep subject content isolated.** Never carry a diagnosis, organism, drug, dosage, guideline, table row, or exam fact from another module into the current reviewer unless it is present in the supplied source or explicitly requested as labeled external context.
- **Class sharing does not lower source-fidelity standards.** Each student's reviewer must be grounded in the lecture file(s) provided for that course/module. Do not fabricate missing lecture material to fill a template.
- **Validation status is not universal.** The reusable architecture, seven shells, and seven palette configurations are included. The finished MD205 Module 12 reviewer is the currently tested end-to-end visual reference; do not claim every course has independently passed content/layout QA until an actual course-specific reviewer is rendered and checked.
- **Student-facing filenames** should identify course and module without claiming official status, e.g. `MD204_Module-Title_Reviewer.docx`. Keep the original source file unchanged.

## When to use

- User uploads lecture slides / PDF / notes for any MD201–MD207 subject and asks for a reviewer, continuous 2-col dump, full content dump, or a `.docx` study reviewer.
- User says "MD module reviewer", "docx reviewer", or simply "reviewer" in the context of an MD201–MD207 module.
- User names a course code in the MD201–MD207 range.

## Source authority and medical accuracy

For source-based reviewer creation, follow this priority order:

1. User's explicit task requirements.
2. The lecture/slides/handout supplied for the current course and module.
3. The matching course shell and palette for presentation only.
4. MedTrans defaults for organization and QA.
5. External references only when the user asks for research/verification, or when needed to clearly flag a safety-critical discrepancy; label those additions separately.

Do not silently “correct” a lecture, merge competing versions, add undocumented doses/thresholds, or import material from another MD course. If a source detail is unreadable or appears internally inconsistent, mark it for review rather than guessing. For shared class material, make the source file name/module visible in the document metadata or footer where supported.

## Hard rules (non-negotiable)

**Do not invent a different section-break policy.** The rules below are fixed.  
Follow them exactly. Do not "improve", simplify, or reinterpret them.

---

### 1. Continuous body — no section breaks in content

- All topic content (banners, subheads, bullets, key-concept blocks, figures, tables) must live inside **one single portrait section**.
- Never insert a Word section break (`sectPr`) between topics, after a banner, after a key-concept block, or inside any content block.
- A `sectPr` is the Word XML element that creates a section break. In `docx.js` it appears whenever you put more than one object in the Document `sections: [...]` array.
- **Do not** build the document yourself with multiple content sections. Always fill the `continuousBody` array and let `assemble()` create the only two allowed section breaks (exam + landscape master).
- The **only** allowed way to change topics is to call `sectionBanner("TOPIC TITLE")`. That is a visual banner only — it does **not** create a new section.
- If you are unsure whether something needs a section break → it does **not**. Put it in the continuous body.
- **Anti-patterns to avoid:**
  - One Word section per topic → illegal.
  - Section break after every banner → illegal.
  - `new Document({ sections: [ {children: topicA}, {children: topicB} ] })` for content → illegal.

---

### 2. Section breaks only for these two things

- Comprehensive Examination block(s)
- Master Reference tables (must be landscape)
- Nothing else. No extra section breaks "for cleanliness", "to start a new page", or "to reset the header".
- **Implementation note (docx.js):**
  ```js
  // GOOD — one portrait section for all content
  { properties: pageProps, children: [ ...cover, ...topicA, ...topicB, ...topicC ] }
  // GOOD — break only for exam
  { properties: pageProps, children: [ ...exam ] }
  // GOOD — break only for landscape master
  { properties: landscapeProps, children: [ ...masterTables ] }
  // BAD — break between topics
  { properties: pageProps, children: topicA }
  { properties: pageProps, children: topicB }  // ← never do this for content
  ```

---

### 3. Full content dump + figure check (mandatory first step)

- **Before generating any `.docx`**, the AI must pause and ask the user about figures.
- Use a short message such as:
  > "I can embed the original lecture slides for diagrams and figures.  
  > Do you want me to include figures?  
  > If yes, tell me which ones (or say 'all major diagrams') and I'll extract/crop them first.  
  > I will not start building the `.docx` until you reply."
- Only after the user answers may the AI proceed to content extraction and document generation.
- Include **every** slide's text. Do not summarize, shorten, or omit clinical or scientific detail.
- Preserve clinical/scientific meaning exactly. You may rephrase for clarity and flow, but never change facts, numbers, mechanisms, or recommendations.
- If a slide is purely text, convert it to bullets / lead-term format. Do not leave large blocks of unformatted paragraph text.

**Figure placement — slide-order rule (no semantic guessing):**
- Embed each requested figure at the point in the continuous body where that page's text was extracted.
- If page N contains both text and a figure, embed the figure immediately after that page's text block.
- If page N is figure-only (no extractable text), embed it immediately after the content extracted from page N−1.
- **Never** collect figures into a batch at the end of the body, a figures appendix, or a separate section.
- **Never** attempt to semantically match a figure to a topic banner. Slide order is the placement order — the lecturer's own sequencing determines where the figure belongs. No guessing.

---

### 4. Table extraction is mandatory

- Any content that appears as a **table**, **comparison matrix**, or **structured list** in the source slides **must** be converted into a native `makeTable()` call.
- Do **not** leave structured content as a figure image or plain bullets when a clean table can be reconstructed from the slide text and column logic.
- Prefer **one well-structured, consolidated table** over multiple fragmented per-slide representations.
- This rule applies to all subject areas — classification tables, comparison matrices, mechanism tables, drug tables, anatomical tables, etc.

**Multi-slide / jumbled table reconstruction protocol:**  
When source slides present classification or comparison data across several disordered or split pages (e.g., a two-page classification grid that wraps across slides):
1. **Reconstruct a single coherent table** spanning all the relevant slides.
2. Preserve every row of clinical or scientific content — no omissions.
3. Use clear column headers that reflect the lecture's own logic (e.g., the source's own column labels where visible; otherwise infer from context).
4. Place the reconstructed table in the **continuous body** (not only in the master section — it belongs where the topic first appears).
5. A copy may also appear in the master section if the content warrants it.

---

### 5. Lecturer, mnemonic, and source strips — beta, opt-in only

Three strip functions are available in `reviewer_lib.js` for rendering lecturer quotes, mnemonics, and source callouts as styled inline boxes:

| Function | Use for | Visual |
|---|---|---|
| `lecturerStrip(quote, attribution)` | Lecturer quotes ("Doc Jinx", etc.) | Warm cream, course accent left bar |
| `mnemonicStrip(content, attribution)` | Mnemonics, timing cues, memory aids | Soft green, dark green left bar |
| `sourceStrip(quote, attribution)` | Topnotch OB, OB Platinum, textbook refs | Blue-grey, steel blue left bar |

**These are beta — do not use them unless the user explicitly asks.**  
Default runs omit strips entirely. Lecturer quotes and mnemonics that are not stripped are acceptable in bullets or key-concept blocks.

**When the user calls them out** (e.g., "include lecturer strips", "add Doc Jinx notes", "include mnemonics as strips"):
- Inform the user strips are a beta feature and layout may evolve.
- Place each strip at its slide-order position — immediately after the content it annotates.
- Do **not** batch strips at the end of a topic.
- Multi-line mnemonics: pass an array of `{ text, bold? }` objects.
- Always include the attribution string (`"— Doc Jinx"`, `"— OB Platinum"`, etc.).
- Reference the shell `.docx` for each course to see the expected visual output.

---

### 6. Figure caption accuracy

- Before finalizing the document, **verify every embedded figure caption** against the actual image content.
- Mislabeled figures — e.g., captioning a table of RNA viruses as "DNA viruses", or attaching the wrong diagram label — are **high-priority errors** that must be corrected before output is shown to the user.
- If figure content is ambiguous from the slide text alone, flag the uncertainty in a comment inside the script (`// TODO: verify caption`) rather than silently guessing.
- When the user selects figures to embed, confirm the label matches what is visually present in the slide before writing the caption string.

---

### 7. Part splitting — multi-part lectures

- When the user uploads a lecture in explicitly named parts (e.g., "Part 1 – …", "Part 2 – …"), generate **separate reviewer files** with clear, matching titles.
- Filename and cover title must reflect the part label: e.g., `{COURSE_CODE}_Part1_Title.docx` and `{COURSE_CODE}_Part2_Title.docx`.
- Do **not** force multi-part content into a single continuous body if the source is explicitly split — this produces a document that is too long and obscures the lecture structure.
- After generating each part, include a **brief cross-reference note** in the key-concept block noting where related content appears in the other part(s) (one line is enough — e.g., "See Part 2 for mechanism / process details").
- If the user does not specify parts and the material is clearly divisible, ask before merging.

---

### 8. Classification vs. clinical distinction

- Distinguish **structural classification tables** (by mechanism, route of entry, organ tropism, symptomatology, etc.) from pure **clinical syndrome lists**.
- When the lecture presents a formal classification (e.g., a grid organizing pathogens by portal of entry, local symptoms, and organ disease), reproduce it as a classification table — **not** as a bulleted symptom list.
- Use the lecture's own categorical framing (route → virus group → local effect → systemic effect) rather than flattening it into prose.
- This applies across all subjects: anatomical region tables, drug class matrices, pathogen classification grids, and similar structured comparisons all get table treatment.

---

### 9. Density & whitespace

- Prefer slightly **tighter spacing** around tables and figures: do not leave large empty regions between a section banner and the first content block below it.
- In `docx.js`: keep `spacingBefore` / `spacingAfter` on paragraphs immediately following a banner to a minimum (≤ 80 twips unless content requires breathing room).
- Avoid inserting blank `Paragraph()` objects as spacers between a banner and the first bullet, table, or figure.
- The document should feel dense and print-efficient — every page should carry meaningful content, not whitespace.

---

### 10. Exam quality & placement

- Produce **exactly 20 items** per major topic block (or one single 20-item block at the end if the user prefers end-only).
- The exam is a **separate section** (one of the two allowed section breaks).
- Style: PLE / USMLE case-based vignettes preferred. Target ~70 % lower-order (LOTS) and ~30 % higher-order (HOTS). Mix them randomly — do not group all recall first.
- **Length balance is mandatory**: if the correct answer is long, every distractor must be roughly the same length. Users must not be able to guess by length.
- **No parenthetical giveaways**: never write choices such as `B. Obstetric conjugate (the shortest diameter)` when the other options lack parentheses.
- No "all of the above" / "none of the above" unless the source material forces it.
- Put the answer key + rationales in a **separate table** after the question list (columns: Q | Ans | Rationale). One crisp sentence per rationale.

---

### 11. Master reference

- Must be in its **own landscape section** (this is one of the two allowed section breaks).
- One table set (or sequential tables) per major topic.
- Always use `LANDSCAPE_COL_BUDGET` for any banner or table in the master section. Never use portrait `COL_BUDGET` here.

---

### 12. Palette

- Set `COURSE_CODE` to the correct module (MD201 … MD207).
- Load colors **only** from `scripts/palettes.json`. Do not invent, approximate, or hard-code any other colors.
- Confirm the configured course code exists in the palette JSON before building. Invalid or missing codes must produce a visible error, not silently inherit MD205 styling.
- Use `COURSE_MATRIX.md` for course-to-shell mapping; it records package metadata, not a substitute for the lecturer's source material.

---

### 13. Audit mode

When the user says **"audit"**, **"compare cleaned version"**, or equivalent:
1. **Do not regenerate the document immediately.**
2. First produce a structured audit report listing:
   - Missing tables (content that should have been `makeTable()` but was left as bullets or a figure)
   - Mislabeled figures (caption does not match image content)
   - Content gaps (slide content that was dropped or summarized instead of included)
   - Part-split issues (content merged that should have been separate, or vice versa)
3. Present the report clearly. Ask the user to confirm before regenerating.
4. On confirmation, regenerate using the corrected content.

---

## Beta features (WIP) — Lecturer & external-source strips

**Status:** Experimental. Available to try; **not** part of the default production path.

### Mandatory callout

Whenever strips are used (or the user asks for them), the AI **must** state clearly, before or with the output:

> “Lecturer / SOURCE strips are a **beta (WIP)** feature. Layout and rules may change.  
> The current validated visual/content reference is **MD205 only**.”

Do not present strips as a finished, universal medtrans capability.

### When the user may try them

- User explicitly asks for **lecturer excerpts**, **lecturer strips**, **Doc Jinx notes**, **SOURCE / MNEMONIC strips**, or **external reviewer notes** (e.g. Topnotch, Platinum).
- User provides **lecture audio/transcript** and/or **external handouts** and asks to weave high-value lines into the reviewer.
- User does **not** ask → **do not** insert strips. Default remains the standard continuous dump (Hard rules 1–12).

### Scope of the validated reference template

| Scope | Rule |
|-------|------|
| **Validated visual + content** | **MD205 only** (Obstetrics palette, cream/pink LECTURER strip, blue-gray SOURCE strip, green MNEMONIC strip). Reference the Module 12 puerperal-sepsis style the user locked. |
| **Other modules (MD201–MD204, MD206–MD207)** | Strips may be attempted if the user insists, but still labeled beta; do **not** claim a validated strip reference template for those courses yet. |
| **Production default** | No strips unless requested. |

### Strip types (beta)

| Label | MD205 color treatment | Use for |
|-------|---------------------|---------|
| **LECTURER** | Warm cream fill (`#F5F0E8`), pink accent (`#C2185B`) | Spoken emphasis from **this** lecture that is **not** already in the body bullets/tables |
| **SOURCE** | Blue-gray fill (`#EEF2F7`), steel-blue accent (`#5A7FA8`) | External handout / guideline fact that adds beyond body text |
| **MNEMONIC** | Soft green fill (`#EAF4EA`), green accent (`#2E7D32`) | Memory aids; timing cues are part of this green panel |
| **GUIDELINE** | Blue-gray fill (`#EEF2F7`), steel-blue accent (`#5A7FA8`) | Named guideline lines when cited |

Attribution examples (MD205): `— Doc Jinx` · `— Topnotch OB` · `— OB Platinum` · `— Topnotch OB / OB Platinum`.

### Hard constraints for strips (even in beta)

1. **Additive only** — Do **not** repeat a fact that is already in the continuous body as a LECTURER or SOURCE strip. If the body already says “route of delivery is the single most significant risk factor,” do not also strip that sentence.
2. **Placement** — Insert the strip **after** the related topic bullets/table, still inside the continuous portrait body. Never a new section break for a strip.
3. **Density** — Prefer a short shortlist (high-value lines only). Do not flood every subhead with a strip.
4. **Conflict handling** — If lecture and external source disagree (e.g. exteriorize uterus), keep the lecture as LECTURER and do **not** put the conflicting handout line as SOURCE without an explicit note — or omit the conflict from SOURCE.
5. **Implementation** — Prefer a single-cell table with a thick left border (accent color) and light fill; label 9–11 pt bold, quote 10–12 pt italic, attribution 8–10 pt muted. Match the approved MD205 shell and the pink/cream/green/blue-gray strip treatment in `MD205_STYLE_QA_ADDENDUM.md`; do not use gold typography for MD205 captions or ordinary text.
6. **Exam / master** — Strips belong only in the continuous body, not inside the exam section or landscape master tables.

### Activation phrases (examples)

- “Add lecturer strips from the audio / transcript”
- “Include Topnotch / Platinum SOURCE strips”
- “Beta strips on — MD205 style”
- “Weave Doc Jinx pearls but don’t duplicate body text”

If the user only says “make a reviewer,” **omit** strips.

---

## Defaults (when the user is brief)
If the user only says "make a reviewer" (or similar) + attaches slides:

| Setting              | Default                                                                  |
|----------------------|--------------------------------------------------------------------------|
| Layout               | Continuous two-column body                                               |
| Section breaks       | Only before exam and before landscape master tables                      |
| Content              | Full dump of all slide text (no clinical/scientific meaning changed)     |
| Tables               | Mandatory — all structured content extracted into `makeTable()`          |
| Strips               | Off unless explicitly requested; if enabled, add only non-duplicative strips and state the WIP note |
| Multi-slide tables   | Reconstructed into one consolidated table                                |
| Figure captions      | Verified against image content before output                             |
| Multi-part lectures  | Separate files per part, with cross-reference notes                      |
| Figures              | Ask first (mandatory) — do not embed or start `.docx` until user replies |
| Exam                 | 20 items per major topic, in its own section                             |
| Exam style           | PLE/USMLE case-based, ~70% LOTS / 30% HOTS, length-balanced choices      |
| Master tables        | Landscape, at end                                                        |
| Palette              | From COURSE_CODE in `scripts/palettes.json`                              |
| Whitespace           | Tight — no large gaps between banners and first content                  |
| Caption styling (MD205) | Caption label pink `#C2185B`, caption title black `#1A1A1A`; never gold |

---

## Token-efficient path (preferred)
**Do not rewrite infrastructure every time.** That wastes tokens and risks breaking section-break rules.

1. Copy into the working directory:
   - `scripts/reviewer_lib.js`
   - `scripts/palettes.json`
   - `scripts/build_content_only.js` (rename to `build_<module>.js`)
2. Set `COURSE_CODE` in the content script.
3. Fill **only** `continuousBody`, `exam`, and `master` arrays.
4. Call `assemble({ continuousBody, exam, master, outPath })` — section breaks are applied automatically.
5. Run `node build_<module>.js`.

**Portability note (show to user when relevant)**  
The core build inputs are `scripts/reviewer_lib.js`, `scripts/palettes.json`, and a filled `scripts/build_<module>.js`. When a compatible Node.js runtime and the `docx` dependency are available, run the build script to generate the Word file. In an assistant environment without script execution, follow the same document rules using the available DOCX tools. Do not promise identical output unless the same build path was actually executed and the result verified.

**Shells are optional**  
`assets/shells/<COURSE_CODE>_shell.docx` — one per course. Each shell demonstrates the correct palette, 3-section architecture, table placement, and (where applicable) strip callout examples. Use as a visual reference; do **not** hand-edit for production content. Always generate via the lib + content script.

---

## Workflow

1. **Identify COURSE_CODE** (MD201–MD207) from the user or filename; if ambiguous/conflicting, ask before styling. Confirm its shell and palette in `COURSE_MATRIX.md`.
2. **Check for multi-part upload.** If parts are explicitly named, plan separate output files. Ask if unclear.
3. **Ask about figures** (mandatory — see Hard rule 3). Pause and wait for the user's reply. Do not start `.docx` generation yet.
4. **Copy** `reviewer_lib.js` + `palettes.json` + `build_content_only.js` into the working directory.
5. **Extract** all slide text. Identify all tables, classification grids, and comparison matrices.
6. **Reconstruct tables** — consolidate multi-slide structured content into single coherent `makeTable()` calls. Verify every figure caption.
7. **Fill** `continuousBody` with topic banners (never section breaks), tables first where the lecture presents them, then supporting bullets and key-concept blocks.
8. **Strips (beta only):** If the user explicitly requested lecturer / SOURCE strips, insert **additive-only** strips after related topics; state the WIP callout; follow MD205 reference rules when COURSE_CODE is MD205. Otherwise skip.
9. **Fill** `exam` (20 items) and `master` arrays. `assemble()` owns the two allowed section breaks.
10. **Run** `node build_<module>.js`.
11. **Verify** against the checklist before showing the user.
12. If session is running low on credits or the user asks how to continue elsewhere, surface the portability note.
---

## Document architecture (copy this structure)

```
Section 1 — Portrait, 2-column
  cover
  TOPIC A content (banner + tables + body + figures)     ← continuous
  TOPIC B content (banner + tables + body + figures)     ← continuous
  TOPIC C content (banner + tables + body + figures)     ← continuous

Section 2 — Portrait, 2-column   [SECTION BREAK]
  Comprehensive Examination (20 items)
  Answer key + rationales table

Section 3 — Landscape, 1-column  [SECTION BREAK]
  Master Reference tables
```

If the user wants one exam per topic, use one section break before each exam, still
**never** inside the content body.

For multi-part lectures:
```
{COURSE_CODE}_Part1_Title.docx  →  same architecture above
{COURSE_CODE}_Part2_Title.docx  →  same architecture above
```

---

## Palette quick map

| Code  | Subject                           | Banner feel        |
|-------|-----------------------------------|---------------------|
| MD201 | Foundations of a 5-Star Physician | dark green + gold  |
| MD202 | Community & Family Medicine       | terracotta + gold  |
| MD203 | Microbiology & Parasitology       | monochrome green   |
| MD204 | Pediatrics                        | blue + orange      |
| MD205 | Obstetrics                        | rose / pink        |
| MD206 | IM / Pathology                    | violet + red       |
| MD207 | Pharmacology                      | teal + coral       |

---

## Verify before showing the user

- [ ] No section break between content topics (only banners)
- [ ] Section break present before exam and before landscape master
- [ ] Landscape tables use `LANDSCAPE_COL_BUDGET`
- [ ] Exactly 20 MCQs, length-balanced choices, no parenthetical giveaways
- [ ] Rationales in a separate table (Q | Ans | Rationale)
- [ ] Figure check was performed (Hard rule 3) and only requested figures are embedded
- [ ] **All structured source content converted to `makeTable()` — none left as bullets or figure images**
- [ ] **If strips were requested by the user:** beta callout stated; strips at slide-order position; no duplication of body content
- [ ] **Multi-slide tables consolidated into single coherent tables**
- [ ] **Every figure caption verified against image content**
- [ ] **Figures placed at slide-order position — not batched at end, not semantically relocated**
- [ ] **Multi-part lectures split into separate files with cross-reference notes**
- [ ] **Whitespace between banners and first content is tight (no blank paragraphs)**
- [ ] COURSE_CODE palette applied (banner color matches table above)
- [ ] Main title matches the user's request
- [ ] **If strips were used:** WIP/beta callout stated to the user; strips additive only (no duplicate of body text); MD205 reference style when COURSE_CODE is MD205; no section break created for a strip

---

## Files in this skill

| Path | Purpose |
|------|---------|
| `SKILL.md` | Canonical workflow specification — load first |
| `COURSE_MATRIX.md` | Course-to-shell/palette lookup and validation status |
| `PROMPT_TEMPLATE.md` | Universal activation prompt for MD201–MD207 |
| `CLASSROOM_QUICKSTART.md` | Short instructions for class sharing |
| `README.md` | Package overview and cross-platform use |
| `CHANGELOG.md` / `KIT_CHANGELOG.md` | Workflow and kit version history |
| `scripts/reviewer_lib.js` | Shared infrastructure — **require this, do not rewrite** |
| `scripts/build_content_only.js` | Thin content script (preferred, token-efficient) |
| `scripts/build_template.js` | Full monolithic template (fallback) |
| `scripts/palettes.json` | MD201–MD207 color tokens; only source for course palette values |
| `assets/shells/MD201_shell.docx`–`MD207_shell.docx` | Per-course visual shells, one matching file per course code |
| `references/exam-quality.md` | LOTS/HOTS, length balance, case stems |
| `references/HOW_TO_USE.md` | Activation examples, figure-check rule, script notes |
| `MD205_STYLE_QA_ADDENDUM.md` and `visual_reference/` | MD205-specific, approved visual corrections; not a universal strip template |
