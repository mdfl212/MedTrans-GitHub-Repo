# MedTrans Cross-Platform Skill — MD201–MD207

**Canonical skill:** `SKILL.md` at the root of the `medtrans/` skill folder.  
**Version:** 1.5.0-beta  
**Purpose:** source-faithful, continuous two-column medical study reviewers in Word for MD201 through MD207.

## What's included

- `SKILL.md` — workflow authority and non-negotiable layout/content rules.
- `COURSE_MATRIX.md` — code-to-shell/palette mapping and honest validation status.
- `PROMPT_TEMPLATE.md` — universal prompt for any MD201–MD207 course.
- `CLASSROOM_QUICKSTART.md` — concise handoff for students using the shared kit.
- `scripts/palettes.json` — seven course-specific color configurations.
- `scripts/reviewer_lib.js`, `scripts/build_content_only.js`, `scripts/build_template.js` — optional document-generation helpers.
- `assets/shells/MD201_shell.docx` through `MD207_shell.docx` — matching visual references.
- `references/exam-quality.md` and `references/HOW_TO_USE.md` — exam and activation guidance.
- `MD205_STYLE_QA_ADDENDUM.md` and `visual_reference/` — MD205-specific approved corrections and visual comparison references.

## Cross-platform use

The skill instructions are plain Markdown so assistants can read them. Each platform has different ways of loading skill packages:

- **Skill-loader environments:** import/use the `medtrans` folder while keeping `SKILL.md`, `scripts/`, `assets/`, and `references/` together.
- **ChatGPT chat or Project:** attach the ZIP (or extract it and attach `SKILL.md`, the course matrix, matching shell, palette, and prompt). Explicitly ask the assistant to read and follow `SKILL.md`; an upload alone is not a permanent installation.
- **Other assistants:** provide the entire skill folder whenever possible. If ZIP inspection is unavailable, share `SKILL.md`, `COURSE_MATRIX.md`, `PROMPT_TEMPLATE.md`, matching course shell, `scripts/palettes.json`, and supporting helper files.

## Safety and fidelity rules

- Always identify the exact course code and matching shell/palette.
- The lecture attached for the current course is the authority for content; never import facts from other courses.
- Ask about figure inclusion before beginning document generation, unless already answered in the conversation.
- Use continuous two-column content; section breaks only before the examination and landscape master reference.
- Reconstruct structured source content as native tables whenever feasible.
- Include exactly 20 exam items and a separate answer/rationale table.
- Render and inspect every page if tools permit; state checks that were not possible.
- Do not silently fill source gaps, correct source statements, or claim institutional approval.
- Lecturer/mnemonic/source strips are beta/WIP and only visually validated for MD205.

## Optional local script execution

The helper scripts use Node.js and the `docx` package. They are optional; when unavailable, an assistant may use another Word workflow but must preserve the same requirements and report QA limitations honestly. The scripts are templates, not finished lecture-specific content. Fill only the content arrays from the current lecture. They refuse to run until `COURSE_CODE` is valid, preventing accidental use of the wrong palette.

Linux/macOS example:

```sh
COURSE_CODE=MD204 OUT_DIR=./output node build_content_only.js
```

PowerShell example:

```powershell
$env:COURSE_CODE = "MD204"
$env:OUT_DIR = ".\output"
node .\build_content_only.js
```

Alternatively, replace the course-code placeholder in your copy of the script. `OUT_DIR` is optional; if omitted, the current working directory is used. Node.js and the `docx` package are required. If the dependency/runtime is unavailable, use the same rules with supported document tools and disclose this limitation.
