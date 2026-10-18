# MedTrans course matrix (MD201–MD207)

This matrix documents the seven course configurations shipped with this package. Course names and palettes reflect the current package configuration; verify the official course title against the student's syllabus or lecturer materials if the institution's naming changes.

**Course isolation rule:** use only the uploaded lecture as the content authority. This table selects the Word shell and color configuration; it does not authorize importing facts across subjects.

| Course code | Configured label | Banner | Banner accent | Subhead | Heading shade | Accent 2 | Matching shell |
|---|---|---:|---:|---:|---:|---:|---|
| MD201 | Foundations of a 5-Star Physician | `1B5E20` | `C9A227` | `2E7D32` | `E8F5E9` | `F9A825` | `assets/shells/MD201_shell.docx` |
| MD202 | Community & Family Medicine | `BF360C` | `C9A227` | `E64A19` | `FBE9E7` | `2E7D32` | `assets/shells/MD202_shell.docx` |
| MD203 | Microbiology & Parasitology | `1B5E20` | `33691E` | `33691E` | `E8F5E9` | `558B2F` | `assets/shells/MD203_shell.docx` |
| MD204 | Pediatrics | `1565C0` | `EF6C00` | `1976D2` | `E3F2FD` | `FB8C00` | `assets/shells/MD204_shell.docx` |
| MD205 | Obstetrics | `AD1457` | `C2185B` | `C2185B` | `FCE4EC` | `F06292` | `assets/shells/MD205_shell.docx` |
| MD206 | IM / Pathology | `4B2E6D` | `8B1C1C` | `3D5A80` | `E8E0F0` | `8B1C1C` | `assets/shells/MD206_shell.docx` |
| MD207 | Pharmacology | `0D7377` | `E07A5F` | `14919B` | `E0F7F7` | `F4A261` | `assets/shells/MD207_shell.docx` |

## Readiness and validation status

- **Configured:** all seven palette entries exist in `scripts/palettes.json`; all seven corresponding Word shells are included in `assets/shells/`.
- **End-to-end visual reference tested:** MD205 Module 12 (puerperal sepsis) reviewer workflow, including the user-approved pink/black caption treatment and MD205 strip spacing.
- **Not automatically certified:** MD201, MD202, MD203, MD204, MD206, and MD207 output documents have not each been independently content-audited and page-rendered by this release merely because their shells exist. Render and inspect each course's first actual output.
- **Strips:** lecturer/source/mnemonic strips remain beta/WIP. Their approved visual reference is MD205 only, not a universal standard for all seven courses.

## Palette safety checks

1. Set `COURSE_CODE` to exactly one of MD201–MD207.
2. Load the matching palette from `scripts/palettes.json`.
3. Use the identically coded shell.
4. If the course code is absent or invalid, stop and correct the configuration. Never fall back to MD205 styling.
5. Keep the shell and palette as visual references; do not copy sample clinical content from a shell into the student's reviewer.
