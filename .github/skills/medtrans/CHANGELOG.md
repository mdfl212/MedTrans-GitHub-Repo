# MedTrans changelog

## 1.5.0-beta — class-wide MD201–MD207 package

- Generalized the activation prompt from MD205-only to all seven configured courses.
- Added `COURSE_MATRIX.md` showing each course shell/palette and the actual validation status.
- Added a class-sharing quick start and stricter source-isolation rules to prevent cross-course fact leakage.
- Clarified that only the MD205 Module 12 reviewer is the end-to-end tested visual reference; other course shells are configurations, not automatically validated finished documents.
- Updated helpers to fail on missing/invalid course codes rather than default to the MD205 palette; made output directory configurable.
- Preserved MD205 caption/strip corrections as MD205-specific only; strip feature stays beta/WIP.

## 1.4.0-beta

- **Lecturer / external-source strips (beta / WIP)** — optional callout strips for spoken lecture pearls (`LECTURER`) and external handout lines (`SOURCE` / `MNEMONIC` / `GUIDELINE`).
- **Must call out beta** whenever strips are used; not part of the default “make a reviewer” path.
- **Validated visual + content reference: MD205 only** until the feature is promoted. Other modules may try strips only with the same WIP disclaimer.
- **Additive-only rule** — do not strip facts already present in body bullets/tables.
- Strips stay inside the continuous portrait body (no extra section breaks).
- Defaults, workflow, and verify checklist updated for opt-in strips.

## 1.3.1

- **Table extraction mandatory** — any table, comparison matrix, or structured list in the source must become a native `makeTable()`; do not leave as figure or bullets when a clean table can be rebuilt.
- **Multi-slide / jumbled table protocol** — reconstruct one coherent table from disordered or split slides; place it in the continuous body where the topic first appears; preserve every clinical/scientific row.
- **Figure caption accuracy** — verify every caption against the actual image before output; mislabels are high-priority errors.
- **Part splitting** — explicit multi-part uploads produce separate reviewer files with matching titles and short cross-reference notes; do not force-merge into one body.
- **Classification vs clinical** — structural classification grids (route, tropism, mechanism, class) stay as tables; do not flatten into symptom-only bullet lists.
- **Density / whitespace** — tighter spacing under banners; no large empty gaps before first content.
- **Audit mode** — on “audit” / “compare cleaned version”, list missing tables, mislabeled figures, and content gaps before regenerating.
- Defaults, workflow, and verify checklist updated to match the above.

## 1.2.0

- Renamed skill to **medtrans** (standalone; no dependency on other reviewer skills).
- Continuous body only; section breaks solely for exam and landscape master.
- Exam: exactly **20** items, separate section, ~70 % LOTS / 30 % HOTS, length-balanced choices, no parenthetical giveaways.
- Mandatory **figure check** before any `.docx` generation.
- Token-efficient path: `reviewer_lib.js` + `palettes.json` + content-only script; portability note for handoff.
- Master reference guidance with subject-specific high-yield column sets (MD201–MD207).
- Expanded exam-quality reference and HOW_TO_USE activation prompts.
- Universal wording (removed course-specific origin framing).

## 1.1.0

- Shared `reviewer_lib.js` + `assemble()` (section breaks locked in lib).
- Content-only build script preferred over monolithic template.
- Per-course shells (MD201–MD207) as optional structural references.
- Palette tokens in `scripts/palettes.json`.

## 1.0.0

- Initial continuous two-column MD201–MD207 reviewer architecture.
- Full slide dump, landscape master tables, PLE/USMLE-style exam block.
