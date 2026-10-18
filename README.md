# MedTrans: Medical Lecture-to-Reviewer Toolkit (MD201–MD207)
DOWNLOAD HERE:➡️[![Latest release](https://img.shields.io/github/v/release/mdfl212/MedTrans-GitHub-Repo?label=latest%20release)](https://github.com/mdfl212/MedTrans-GitHub-Repo/releases/latest)

**Turn lecture PDFs and slides into editable, source-faithful Word reviewers.** MedTrans is a reusable, cross-platform AI skill and document workflow for medical students. It includes the skill instructions, course shells, palettes, helper scripts, QA guidance, and a beginner tutorial.

> **Status: beta.** The workflow is configured for MD201–MD207. MD205 is the best-tested visual reference; the first reviewer generated for another course still needs its own source-content and page-layout audit. Lecturer and mnemonic strips are experimental (WIP).

## Start here

1. Read the [MedTrans tutorial on GitHub Pages](https://mdfl212.github.io/MedTrans-GitHub-Repo/tutorial/) or view [its source](docs/TUTORIAL.md).
2. Open [`.github/skills/medtrans/SKILL.md`](.github/skills/medtrans/SKILL.md) to understand the complete workflow.
3. Check [`.github/skills/medtrans/COURSE_MATRIX.md`](.github/skills/medtrans/COURSE_MATRIX.md) and select the correct course code, shell, and palette.
4. Copy the [universal prompt template](.github/skills/medtrans/PROMPT_TEMPLATE.md), fill in your course and lecture details, and attach your source lecture.
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
│   ├── index.md               # GitHub Pages landing page and download link
│   ├── TUTORIAL.md            # Beginner step-by-step guide
│   ├── _config.yml            # GitHub Pages / Jekyll settings
│   └── assets/main.scss       # Site styling
└── .github/
    └── skills/
        └── medtrans/          # VS Code / GitHub Copilot skill package
            ├── SKILL.md       # Main skill instructions
            ├── COURSE_MATRIX.md
            ├── PROMPT_TEMPLATE.md
            ├── scripts/       # Palettes and optional DOCX builders
            ├── assets/        # MD201–MD207 Word shells
            └── references/
```

## Important rules

- The **current lecture is the content authority**. Do not silently omit, correct, or supplement its medical claims.
- OCR output can be wrong. Keep and consult the original slide PDF, especially for clinical numbers, tables, figures, abbreviations, and qualifiers.
- Use only the shell and palette matching the specified course code.
- Reconstruct source tables as native Word tables wherever feasible.
- Render and inspect the output, and disclose any QA steps that were not possible.
- Do not distribute lecture recordings, transcripts, or course materials unless permitted by your institution and instructor.

## Using MedTrans across AI tools

The skill is in VS Code's workspace skill location at `.github/skills/medtrans/`. Open this repository in VS Code to use it as a workspace skill. Other assistants may support different skill locations or import flows; follow their current documentation and keep the complete `medtrans/` folder together.

## Script requirements

The optional helper scripts require Node.js and the `docx` package. They are not required if the AI environment can create and edit DOCX files through other tools. The skill instructions take priority over assumptions about a particular platform or runtime.

## Download and release assets

Download the latest repository source as a [ZIP archive](https://github.com/mdfl212/MedTrans-GitHub-Repo/archive/refs/heads/main.zip), or browse packaged downloads on the [GitHub Releases page](https://github.com/mdfl212/MedTrans-GitHub-Repo/releases/latest). Tagged releases may also include a VS Code / GitHub Copilot skill ZIP.

### Install the skill in VS Code / GitHub Copilot

**Workspace install:** download the repository ZIP from GitHub, extract it, then open the extracted repository folder in VS Code. The skill is located at `.github/skills/medtrans/SKILL.md`.

**Personal install from the source ZIP:**

1. [Download the latest MedTrans source ZIP](https://github.com/mdfl212/MedTrans-GitHub-Repo/archive/refs/heads/main.zip) and extract it.
2. Copy `.github/skills/medtrans` from the extracted folder into `%USERPROFILE%\.copilot\skills\medtrans`, creating the `skills` directory if needed. The final path should be `%USERPROFILE%\.copilot\skills\medtrans\SKILL.md`.
3. Restart VS Code or start a new Copilot chat so it can discover the skill.

Keep `SKILL.md`, `scripts/`, `assets/`, and `references/` together inside the `medtrans` folder.

Example:

```bash
# Download the latest source ZIP
curl -L -o MedTrans-source.zip \
  https://github.com/mdfl212/MedTrans-GitHub-Repo/archive/refs/heads/main.zip
```

## Online tutorial

Read the published [MedTrans GitHub Pages tutorial](https://mdfl212.github.io/MedTrans-GitHub-Repo/tutorial/). The Pages site is built from the `docs/` folder on the `main` branch. In the repository's **Settings → Pages**, choose **Deploy from a branch**, then select `main` and `/docs`.

## License and classroom use

No open-source license has been selected for this repository yet. Public visibility alone does not grant permission to redistribute or modify copyrighted materials. Before publishing broadly, the maintainer should choose a license and confirm that the Word shells, images, and other included assets are appropriate to share.
