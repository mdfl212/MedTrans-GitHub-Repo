# HOW TO USE — MedTrans (MD201–MD207)

**Skill:** `medtrans` · **Version:** 1.5.0-beta · **Output:** editable `.docx` reviewer (PDF preview optional)

## Activation prompts

```text
Use the MedTrans skill. Read SKILL.md and COURSE_MATRIX.md first.
COURSE_CODE=MD201
Build a full-content reviewer from the attached lecture, preserving scientific meaning and native tables. Ask about figures before starting. Use the matching course shell/palette.
```

```text
Use MedTrans for MD204. The attached file is a Pediatrics lecture.
Do not apply MD205 pink styling. Use MD204_shell.docx and the MD204 palette.
Ask whether figures should be included before building the DOCX.
```

```text
Use MedTrans for MD207 Pharmacology. Preserve drug names, doses, units,
mechanisms, contraindications, and qualifications exactly as present in the source.
Do not add outside drug facts unless I request labeled verification.
```

```text
Audit the existing reviewer against the source. List missing tables,
content omissions, figure-caption mismatches, answer-key errors, and layout issues.
Do not regenerate until I approve the audit findings.
```

## Course selection

Use `COURSE_MATRIX.md` to map MD201–MD207 to its own `assets/shells/MD20X_shell.docx` and `scripts/palettes.json` entry. If missing or ambiguous, ask before building. Never let invalid course codes silently fall back to MD205.

## Figure check (mandatory first reply)

When a user supplies slides and asks for a reviewer, ask whether to include figures before content extraction or DOCX generation, unless already answered in the same conversation. Wait for the answer. Figure placement follows source slide order, not semantic guesswork.

## Core rules

- Full content from the current lecture; don't silently omit, summarize, or change clinical/scientific meaning.
- Keep all content topics in one continuous portrait two-column section.
- Section breaks only before the exam and landscape master reference.
- All structured source material should be reconstructed as native Word tables when feasible.
- Consolidate split multi-slide tables without losing source rows.
- Exactly 20 single-best-answer exam items (A–D), balanced positions, plausible parallel choices, approximately 70% LOTS / 30% HOTS, with separate `Q | Ans | Rationale` table.
- Use the matching course palette and shell only. Do not import content from another course.
- Render and inspect every page when possible; do not claim checks that were not performed.
- Lecturer/source/mnemonic strips are beta and off by default; the approved strip reference is MD205 only.

## Helper scripts

Optional JavaScript builders use Node.js and the `docx` package. Set a valid `COURSE_CODE` (MD201–MD207) and `OUT_DIR` (optional output folder) before running. See the README and prompt template; if the runtime or dependency is unavailable, use the platform's document tools without pretending the script ran.
