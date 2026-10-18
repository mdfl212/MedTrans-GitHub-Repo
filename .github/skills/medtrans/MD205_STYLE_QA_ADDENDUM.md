# MD205 Style & Regression-Prevention Addendum

This addendum captures MD205-specific visual decisions made while matching the reviewer to the original shell. It supplements `SKILL.md`; it does not replace the main skill's content, section-break, exam, or native-table requirements.

## 1. MD205 palette: pink, pale pink, black, and neutral gray

Use the exact palette in `scripts/palettes.json`:

- Main section banner: `#AD1457` (deep magenta/rose), white text.
- Banner accent, topic subheads, and caption label: `#C2185B` (pink/rose).
- Pale-pink header/key-concept shade: `#FCE4EC`.
- Secondary pink accent: `#F06292`.
- Main body text: `#1A1A1A` (near black).
- Muted/attribution text: `#5A5A5A`.

**Do not apply gold font to MD205 title text, table-caption text, or ordinary body typography.** A source slide may contain gold-colored artwork, but when its textual caption is recreated in Word, use the MD205 caption convention below—not the color accidentally inherited from the source or a previous draft.

## 2. Table-caption convention (specific known regression)

For a caption such as:

`TABLE 37-1. Bacteria Commonly Responsible for Female Genital Infection`

format the two parts separately while preserving the caption's exact source wording:

- `TABLE 37-1.` — bold pink `#C2185B`.
- `Bacteria Commonly Responsible for Female Genital Infection` — black `#1A1A1A`, regular weight unless the original shell specifies otherwise.
- Keep the caption compact and aligned with the content/table it labels.
- Do not color the entire caption gold, pink, or another single accent color.
- Do not alter the table's data, row order, widths, header fill, borders, or body-cell shading just to correct caption typography.

## 3. Shell-aligned title hierarchy

Use `visual_reference/MD205_original_shell_page1.jpg` together with `assets/shells/MD205_shell.docx` as the primary visual target.

- Keep the original shell's compact, left-aligned title treatment and title-case typography.
- The main MD205 bar is deep magenta with white lettering.
- The module title/subtitle uses pink/rose rather than gold; the byline/attribution is muted gray and italic where shown in the shell.
- Key-concept bar uses pale pink and the pink accent rule.
- Topic banners use deep magenta; subheads use pink/rose; body copy is black.
- Maintain the shell's compact vertical rhythm and use the body area efficiently without collisions, clipping, or crowding.

## 4. Lecturer / mnemonic / source strips

These are a beta/WIP feature in the base MedTrans skill. If the user requests them, follow the strip treatments below and label them as experimental when appropriate.

- Lecturer strip: warm cream `#F5F0E8`; accent/label pink `#C2185B`; body `#1A1A1A`; attribution `#5A5A5A`.
- Mnemonic strip: soft green `#EAF4EA`; accent `#2E7D32`; body `#1A1A1A`; attribution `#5A5A5A`.
- Source strip: blue-gray `#EEF2F7`; accent `#5A7FA8`; body `#1A1A1A`; attribution `#5A5A5A`.
- **Timing cue is part of the mnemonic panel**, not a lecturer strip. Keep the timing-cue cell/background soft green (`#EAF4EA`) with green heading (`#2E7D32`).
- When adjacent strip/callout cells sit side by side, preserve a visible white gutter so their colored panels do not fuse visually. Use a real gap/white inner-facing spacing, not merely a change of border color. Maintain a small bottom gap before the next independent content block.
- Never recolor all strips with the deep-magenta banner color. The main banner palette must not override each strip's own palette.

## 5. Preserve validated tables and figures during visual fixes

- For a styling-only revision, make the narrowest possible edit. Do not rebuild the exam rationale table or landscape master-reference tables if they are already correct.
- Preserve native Word tables, column widths, row order, header fills, borders, cell fills, and text. Fix a caption by adjusting caption runs; do not restyle the table itself.
- Preserve existing figure positions and wrapping/anchoring unless the user explicitly requests a change. Do not convert floating figures to inline figures as an incidental fix.
- Preserve all source scientific content and captions. If a caption appears incorrect relative to the image, report the discrepancy and verify against the source before changing wording.
- Keep adjacent white strip gutters when editing other text in the same row/table.

## 6. Mandatory visual QA checklist

Before delivery, render the latest DOCX to page images and inspect **every page**, not only the first page. Re-render after any layout-sensitive change.

Specifically inspect:

1. First-page title hierarchy against the shell.
2. Pink/black typography, especially captions such as `TABLE 37-1` (no accidental gold).
3. Lecturer/mnemonic/source panels retain their distinct fills and visible white gaps.
4. Timing cue remains part of the green mnemonic panel.
5. Original figure placement and wrapping remain stable.
6. Exam questions, answer key, and rationale table are readable and retain their original table structure.
7. Landscape master-reference tables retain their original structure and column sizing.
8. No clipped text, fused strips, stray blank pages, overlapping figures, broken rows, or page-number/header/footer drift.
9. Content and all clinical numbers/claims remain faithful to the lecture.

Use the workflow in `SKILL.md` and an available DOCX rendering skill/tool when present; do not assume any platform-specific path. Do not claim visual QA succeeded unless every page of the latest output was actually inspected.
