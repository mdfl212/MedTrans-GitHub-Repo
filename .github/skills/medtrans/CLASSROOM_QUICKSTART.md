# MedTrans class-sharing quick start

MedTrans is a reusable workflow for turning a provided MD201–MD207 lecture into an editable medical study reviewer. This kit is a starting point; the student's lecture remains the authority.

## Student workflow

1. Keep the ZIP intact and extract it if the AI platform cannot inspect archives. The skill's main file is `medtrans/SKILL.md`.
2. Attach the lecture slides/PDF for the current module. Include the course code explicitly.
3. Attach or make available the complete skill folder, including `SKILL.md`, `COURSE_MATRIX.md`, `scripts/palettes.json`, and the matching course shell.
4. Paste the relevant section of `PROMPT_TEMPLATE.md` and tell the assistant to read `SKILL.md` before doing any extraction or formatting.
5. Answer the assistant's figure-inclusion question. Do not expect a complete figure-containing DOCX before that decision.
6. Review the produced Word file against the source. Pay special attention to doses, numbers, exceptions, table rows, figure captions, and exam answers.

## Important limits

- Uploading the package to an ordinary chat does not guarantee automatic installation or activation. Platform-specific Skill/Project/GPT import behavior may differ.
- A configured shell does not mean every course output has been validated. The current end-to-end sample is MD205 Module 12. Every new output still needs course-specific content and visual QA.
- The package does not contain or infer your lecturers' source files for all seven courses. Each user must attach the correct current lecture.
- The generated reviewer is a study aid, not an official institutional document or substitute for faculty instructions.
- The lecturer / SOURCE / MNEMONIC strips are an experimental feature, validated visually for MD205 only. They are off unless explicitly requested.

## Copy/paste activation line

`Use the MedTrans skill package. Read medtrans/SKILL.md and COURSE_MATRIX.md. COURSE_CODE=[MD201–MD207]. Use only the matching shell/palette and attached lecture as content authority. Ask about figures first, preserve all lecture details, build native tables, include a 20-item exam with separate rationales and a landscape master-reference section, then render and verify the output. State anything you could not verify.`
