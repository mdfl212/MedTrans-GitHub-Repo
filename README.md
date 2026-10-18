# MedTrans: Medical Lecture-to-Reviewer Toolkit (MD201–MD207)

**Turn lecture PDFs and slides into editable, source-faithful Word reviewers.** MedTrans is a reusable, cross-platform AI skill and document workflow for medical students. It includes the skill instructions, course shells, palettes, helper scripts, QA guidance, and a beginner tutorial.

> **Status: beta.** The workflow is configured for MD201–MD207. MD205 is the best-tested visual reference; the first reviewer generated for another course still needs its own source-content and page-layout audit. Lecturer and mnemonic strips are experimental (WIP).

## Start here

1. Read the beginner-friendly [MedTrans tutorial](docs/TUTORIAL.md).
2. Open [`medtrans/SKILL.md`](medtrans/SKILL.md) to understand the complete workflow.
3. Check [`medtrans/COURSE_MATRIX.md`](medtrans/COURSE_MATRIX.md) and select the correct course code, shell, and palette.
4. Copy the [universal prompt template](medtrans/PROMPT_TEMPLATE.md), fill in your course and lecture details, and attach your source lecture.
5. Inspect the final Word document against the original slides before sharing it.

## Course configuration

The package contains course shells and palette entries for:

- **MD201** — Foundations of a 5-Star Physician
- **MD202** — Community & Family Medicine
- **MD203** — Microbiology & Parasitology
- **MD204** — Pediatrics
- **MD205** — Obstetrics
- **MD206** — IM / Pathology
- **MD207** — Pharmacology

These are the configured labels in the package. Confirm the official course title against your syllabus before generating a reviewer.

## Repository contents

```text
.
├── README.md
├── docs/
│   └── TUTORIAL.md            # Beginner step-by-step guide
└── medtrans/
    ├── SKILL.md               # Main cross-platform skill instructions
    ├── COURSE_MATRIX.md
    ├── PROMPT_TEMPLATE.md
    ├── CLASSROOM_QUICKSTART.md
    ├── scripts/               # Palettes and optional DOCX builders
    ├── assets/shells/         # MD201–MD207 Word shells
    ├── references/            # Usage and exam-quality guidance
    └── visual_reference/      # MD205 layout comparisons
```

## Important rules

- The **current lecture is the content authority**. Do not silently omit, correct, or supplement its medical claims.
- OCR output can be wrong. Keep and consult the original slide PDF, especially for clinical numbers, tables, figures, abbreviations, and qualifiers.
- Use only the shell and palette matching the specified course code.
- Reconstruct source tables as native Word tables wherever feasible.
- Render and inspect the output, and disclose any QA steps that were not possible.
- Do not distribute lecture recordings, transcripts, or course materials unless permitted by your institution and instructor.

## Using MedTrans across AI tools

The skill is written in Markdown, but platforms handle skills differently. Supported skill-loader environments may import the `medtrans/` folder as a skill. If a platform has no skill installer, upload the ZIP into an ordinary chat is not the same as permanently installing a skill.

## Script requirements

The optional helper scripts require Node.js and the `docx` package. They are not required if the AI environment can create and edit DOCX files through other tools. The skill instructions take priority over assumptions about a particular platform or runtime.

## License and classroom use

No open-source license has been selected for this repository yet. Public visibility alone does not grant permission to redistribute or modify copyrighted materials. Before publishing broadly, the maintainer should choose a license and confirm that the Word shells, images, and other included assets are appropriate to share.
