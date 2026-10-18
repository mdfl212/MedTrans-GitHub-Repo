# MedTrans — Universal reviewer prompt (MD201–MD207)

Copy this prompt into a new chat/session after providing the MedTrans skill package and current lecture file(s).

---

**Use the MedTrans workflow. Read `SKILL.md` first and follow its hard rules.** Select only the shell and palette for the specified course in `COURSE_MATRIX.md` and `scripts/palettes.json`.

**COURSE_CODE:** `[MD201 | MD202 | MD203 | MD204 | MD205 | MD206 | MD207]`  
**Module / lecture title:** `[INSERT TITLE OR USE THE SOURCE TITLE]`  
**Source file(s):** `[ATTACHED PDF / SLIDES / NOTES]`  
**Requested deliverables:** `[DOCX reviewer; PDF preview if useful; audit report if requested]`

## Requirements

1. Preserve the full source lecture content and its clinical/scientific meaning. Do not silently summarize, omit details, correct a claim, or fill source gaps from general knowledge. Flag unreadable or internally inconsistent material for review.
2. Keep this course's content isolated. Do not import facts from other MD courses unless the current source supports them or I explicitly request clearly labeled external context.
3. Reconstruct structured source material—tables, classification grids, comparison matrices, flow/decision tables, and structured lists—as native Word tables whenever feasible. Preserve every row and qualifier.
4. **Before content extraction/document generation, ask whether figures should be included**, unless I have already answered that question in this conversation. Ask one brief question and wait. If I request figures, extract the specified figures and place them in source-slide order. Do not move them based on a semantic guess.
5. Keep all teaching content in one continuous portrait two-column section. Section breaks are allowed only before the examination and before the landscape master-reference section, according to `SKILL.md`.
6. Include exactly 20 PLE/USMLE-style single-best-answer questions for the requested exam block, A–D, with plausible parallel options, balanced answer positions, approximately 70% LOTS / 30% HOTS, and case-based questions when supported by the lecture. Put the answer key and one-sentence rationales in a separate native `Q | Ans | Rationale` table. Do not create unsupported facts to make questions.
7. Create a landscape master-reference section using the current lecture's actual high-yield data. Preserve units, thresholds, definitions, exceptions, qualifiers, mechanisms, and source-specific terminology.
8. Use the exact shell and palette for `COURSE_CODE`. Do not use MD205's pink/black colors on another course. The MD205 caption-specific rule (`TABLE 37-1.` pink label + black caption title) applies only when `COURSE_CODE=MD205` and the matching caption exists.
9. Lecturer / source / mnemonic strips are **off by default**. If I explicitly request them, state that they are experimental (beta/WIP). Their pink/cream/green/blue-gray implementation is the MD205-only validated reference; do not claim it is validated for another course. For non-MD205 courses, follow the relevant shell and do not invent strip colors outside the palette/addendum.
10. Preserve table structures, figure anchoring/wrapping, and validated content during narrow formatting fixes. Make only the requested changes.
11. Render and inspect every page if tools permit. Check the title/shell match, colors, gutters, column flow, captions, table splitting/repeated headers, figure placement, answer/rationale consistency, landscape orientation, headers/footers, and page breaks. State all QA that could not be performed.
12. Produce an editable `.docx`. Include a PDF only if useful or requested. Do not describe the work as officially approved by the institution or lecturer unless the user supplied evidence of that status.

## Course-shell mapping

Use `COURSE_MATRIX.md` to map the course code to its matching `assets/shells/MD20X_shell.docx` and palette entry. Do not guess if the uploaded course code or official subject title conflicts with the package mapping; ask before generating.

## Final handoff

Return the file(s) and a short QA summary. Distinguish:
- checks actually completed,
- limitations (e.g. source scan unreadable, page not rendered), and
- any items needing instructor/student review.

---

## Example activation prompts

**MD201:** `Use MedTrans. COURSE_CODE=MD201. Create a full-content reviewer from the attached lecture. Ask about figures before starting. Follow SKILL.md and use MD201_shell.docx.`

**MD204:** `Use MedTrans. COURSE_CODE=MD204. Build the reviewer from this Pediatrics lecture. Use the MD204 shell and palette, not MD205 styling. Ask about figures first.`

**MD207:** `Use MedTrans. COURSE_CODE=MD207. Preserve all pharmacology tables, doses, and qualifiers from the source. Ask about figures first. Do not add drug facts not present in the lecture unless I request labeled verification.`

**Audit:** `Audit the existing reviewer against the source lecture before editing. Report missing structured tables, content gaps, caption/figure mismatches, and layout issues. Do not regenerate until I approve the audit findings.`
