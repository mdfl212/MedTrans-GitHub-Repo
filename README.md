# MedTrans — Medical Lecture-to-Reviewer Toolkit

[![Latest release](https://img.shields.io/github/v/release/mdfl212/MedTrans-GitHub-Repo?label=download)](https://github.com/mdfl212/MedTrans-GitHub-Repo/releases/latest)
![Courses](https://img.shields.io/badge/courses-MD201%E2%80%93MD207-176b72)
![Status](https://img.shields.io/badge/status-beta-f59e0b)

**Turn medical lecture slides into structured, editable Word reviewers.**

MedTrans is a reusable AI skill and document workflow for medical students. It provides course-matched Word shells, palettes, prompt templates, quality-check guidance, and a beginner tutorial.

> **Beta status:** MD201–MD207 are configured. MD205 is the best-tested visual reference; the first reviewer for another course still needs its own source-content and page-layout audit. Lecturer and mnemonic strips are experimental.

## Start here

<div align="center">

### New to MedTrans? Follow these three steps.

**1. Read the tutorial** → **2. Download the skill** → **3. Attach your lecture and prompt the AI**

[**Open the beginner tutorial**](https://mdfl212.github.io/MedTrans-GitHub-Repo/tutorial/) · [**Get the latest release**](https://github.com/mdfl212/MedTrans-GitHub-Repo/releases/latest) · [Browse the source files](https://github.com/mdfl212/MedTrans-GitHub-Repo/tree/main/.github/skills/medtrans)

</div>

### Quick start

1. **Prepare your lecture.** Use a searchable/OCR-processed PDF when appropriate, but keep the original PDF for checking figures, tables, and OCR errors.
2. **Load MedTrans.** On a compatible platform, install the skill; otherwise, upload the relevant skill files and ask the AI to read `SKILL.md`.
3. **Generate the reviewer.** Attach your lecture, specify the course code, use the prompt template, and ask the AI to follow the matching shell and palette.
4. **Check before sharing.** Verify clinical details, figures, table reconstructions, answer rationales, layout, and page breaks against the original lecture.

## Courses

| Code | Configured subject | Palette |
|---|---|---|
| MD201 | Foundations of a 5-Star Physician | Dark green + gold |
| MD202 | Community & Family Medicine | Terracotta + gold |
| MD203 | Microbiology & Parasitology | Green |
| MD204 | Pediatrics | Blue + orange |
| MD205 | Obstetrics | Pink |
| MD206 | IM / Pathology | Violet + red |
| MD207 | Pharmacology | Teal + coral |

These are the labels configured in the package. Confirm the official course title against your syllabus.

## What the toolkit includes

- Cross-platform `SKILL.md` and course-selection guidance
- Seven matching Word shells and a centralized palette file
- Reusable prompt templates and classroom quick-start notes
- Optional JavaScript helpers for building DOCX files in compatible Node.js environments
- MD205 visual references and QA addendum
- A beginner-friendly tutorial and GitHub Pages site

## Key rules

- **The lecture is the content authority.** Preserve its terminology, clinical qualifiers, numerical values, and scientific meaning.
- **OCR is not infallible.** Check clinical numbers, abbreviations, tables, and figures against the original slides.
- **Use the correct course configuration.** Select the matching course code, Word shell, and palette.
- **Keep structured content structured.** Reconstruct tables as native editable Word tables wherever feasible.
- **Inspect the output.** Render and review the finished DOCX page by page; disclose any QA steps that could not be completed.
- **Share responsibly.** Follow your institution’s rules and confirm redistribution permission for lecture materials, shells, and visual references.

## Repository map

```text
.
├── README.md
├── SKILL.md                         # Convenient top-level copy
├── .github/
│   ├── skills/medtrans/             # Complete VS Code / Copilot skill
│   │   ├── SKILL.md
│   │   ├── COURSE_MATRIX.md
│   │   ├── PROMPT_TEMPLATE.md
│   │   ├── scripts/
│   │   ├── assets/shells/            # MD201–MD207 Word shells
│   │   ├── references/
│   │   └── visual_reference/
│   └── workflows/                   # Pages and release workflows
├── docs/
│   ├── index.md                     # Website landing page
│   ├── TUTORIAL.md                  # Step-by-step guide
│   └── assets/main.scss             # Site styling
└── Releases/                        # Packaged classroom downloads
```

## Download and install

**Recommended:** open the [latest GitHub Release](https://github.com/mdfl212/MedTrans-GitHub-Repo/releases/latest) and download the MedTrans skill ZIP.

For VS Code, you can also open this repository as a workspace. The full skill lives at [`.github/skills/medtrans/`](https://github.com/mdfl212/MedTrans-GitHub-Repo/tree/main/.github/skills/medtrans). To install it for your user account on Windows, copy that folder to:

```text
%USERPROFILE%\.copilot\skills\medtrans
```

Keep `SKILL.md`, `scripts/`, `assets/`, and `references/` together inside the `medtrans` folder. Restart VS Code or begin a new Copilot chat after installing it.

Other AI platforms have different skill uploaders and file-generation capabilities. See the [beginner tutorial](https://mdfl212.github.io/MedTrans-GitHub-Repo/tutorial/) for platform-specific guidance and fallback instructions. Uploading a ZIP to an ordinary chat does not automatically install a persistent skill.

## Optional build scripts

The JavaScript helper scripts require Node.js and the `docx` package. They are optional: an assistant with other suitable Word-document tools may follow the same skill rules without running the scripts. Do not claim the script-based build ran unless it actually did.

## Validation status

The workflow is configured for MD201–MD207, but that does not mean every course has undergone full end-to-end validation. MD205 is the primary tested reference. Validate each new course’s content and rendered layout before distributing the output. Lecturer and mnemonic strips remain beta/WIP.

## License and permissions

No open-source license has been selected. Until a license is added, do not assume that public visibility grants permission to reuse or redistribute the repository’s assets. Confirm that you have permission to share the Word shells, visual references, and any included teaching materials before public distribution.

---

**Useful links:** [Tutorial](https://mdfl212.github.io/MedTrans-GitHub-Repo/tutorial/) · [Latest release](https://github.com/mdfl212/MedTrans-GitHub-Repo/releases/latest) · [Skill files](https://github.com/mdfl212/MedTrans-GitHub-Repo/tree/main/.github/skills/medtrans) · [Report a problem](https://github.com/mdfl212/MedTrans-GitHub-Repo/issues/new)
