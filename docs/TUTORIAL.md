---
title: MedTrans Tutorial: Turn Lecture Slides into an Editable Reviewer
layout: page
permalink: /tutorial/
---

This guide is for students who are new to AI skills. It walks through the entire workflow: prepare the lecture, load MedTrans, generate the Word reviewer, and verify it before sharing.

<div class="medtrans-tutorial-download">
  <p><strong>Get MedTrans:</strong> download the latest source ZIP, or browse the classroom packages in GitHub Releases.</p>
  <p><a href="https://github.com/mdfl212/MedTrans-GitHub-Repo/archive/refs/heads/main.zip">Download MedTrans source ZIP</a> | <a href="https://github.com/mdfl212/MedTrans-GitHub-Repo/releases/latest">View all releases</a></p>
</div>

## What is MedTrans?

MedTrans is a reusable AI skill and workflow for turning medical lecture slides into structured, editable Word reviewers. Its instructions, Word shells, color palettes, examples, and QA checklist help an AI follow the same workflow across different lectures.

A **prompt** is an instruction you send in one conversation. A **skill** is a reusable set of instructions and supporting files that a compatible AI platform can load for repeated use. Some platforms have native skill installers; others require you to upload the files and ask the assistant to follow them each time.

## Step 1 — Prepare your lecture PDF

Start with your professor's lecture slides. They are often shared as a PDF or exported from PowerPoint.

### Check whether OCR is needed

OCR means **Optical Character Recognition**. It detects text inside page images and makes it selectable or searchable.

1. Open your PDF and try to select a sentence with your cursor.
2. If you can select and copy the text, the PDF may already contain searchable text; you can usually skip OCR.
3. If every page behaves like one big picture, or copied text is missing, run OCR.

OCR can reduce the time and AI usage spent extracting slide text, leaving more of the workflow for organizing the reviewer. It is not perfect: it can misread medical terms, abbreviations, numbers, superscripts, symbols, and tables.

### Suggested OCR tools

- [MaxAI PDF OCR](https://www.maxai.co/pdf-tools/pdf-ocr/)
- [PDF24 OCR](https://tools.pdf24.org/en/ocr)

These are third-party services. Check their current privacy terms and your school's rules before uploading any restricted or sensitive material. Download the OCR output, inspect several pages for obvious mistakes, and keep the original PDF for visual comparison.

**Remember:** an OCR PDF is useful for text extraction, but the original slides remain the visual reference for figures, tables, labels, and layout.

## Step 2 — Load or install the MedTrans skill

Download or clone this repository. The VS Code workspace skill is in [`.github/skills/medtrans/`](https://github.com/mdfl212/MedTrans-GitHub-Repo/tree/main/.github/skills/medtrans), and its main instruction file is [`SKILL.md`](https://github.com/mdfl212/MedTrans-GitHub-Repo/blob/main/.github/skills/medtrans/SKILL.md).

### VS Code / GitHub Copilot

To use MedTrans in this repository, open the extracted repository folder in VS Code; Copilot discovers the workspace skill at `.github/skills/medtrans/`.

To install it for your user account, [download the MedTrans source ZIP](https://github.com/mdfl212/MedTrans-GitHub-Repo/archive/refs/heads/main.zip), extract it, and copy the `.github/skills/medtrans` folder to `%USERPROFILE%\.copilot\skills\medtrans`. Create the `skills` folder if it does not exist. The final path should be `%USERPROFILE%\.copilot\skills\medtrans\SKILL.md`. Restart VS Code or start a new Copilot chat after installation.

### Grok

If your Grok interface provides a Skills or Plugins area:

1. Open the Skills/Plugins area.
2. Choose the option to add or upload a skill, if available.
3. Upload a ZIP containing the `medtrans/` skill folder, then enable it if required.
4. Start a chat and invoke `/medtrans` only if your interface supports that command.

The exact menus can change and may differ by product surface. If your version has no skill uploader, use the fallback below.

### Claude

Claude supports uploading custom skills on eligible accounts when its Skills feature and required capabilities are available:

1. Open Claude and go to **Customize → Skills**.
2. Choose **Create skill → Upload a skill**.
3. Upload a ZIP containing one top-level `medtrans/` folder with `SKILL.md` and its supporting folders inside.
4. Enable the skill in your Skills list.
5. In a chat, ask Claude to use MedTrans for the attached lecture.

See the [official Claude Skills guide](https://support.claude.com/en/articles/12512180-use-skills-in-claude) for the current interface and requirements.

### ChatGPT

ChatGPT's native Skills feature is available only to eligible plans/workspaces and may not appear in every account. If it is available:

1. Open **Plugins → Plugin Directory → Skills**.
2. Choose the option to create or upload a skill.
3. Upload the skill ZIP and confirm it appears in your Skills list.

See [OpenAI's current Skills documentation](https://help.openai.com/en/articles/20001066-skills-in-chatgpt) for eligibility and setup.

**If you do not see a Skills option:** you can still use MedTrans in a normal chat. Upload `SKILL.md`, `COURSE_MATRIX.md`, the correct course shell, the palette file, and the QA addendum if relevant. Then send this instruction:

> Read the attached MedTrans `SKILL.md` and relevant course references before starting. Follow the skill's rules. Do not claim the skill is permanently installed; use it for this task only.

### Gemini or another assistant

Use a native skill uploader if your platform provides one. Otherwise, upload the relevant MedTrans files and explicitly ask the assistant to follow them. Make sure the assistant can create/edit Word documents and inspect rendered pages; capabilities vary by plan and product.

For the exact current behavior of any platform, check its official help pages. An uploaded ZIP is not automatically a permanent installation in every AI app.

## Step 3 — Upload the lecture and prompt the AI

Attach your OCR-processed lecture PDF. Keep the original PDF available too, especially if it has clearer figures or tables.

### Simple prompt for beginners

Copy this prompt and replace the course code and subject:

> **Use the MedTrans skill** to create an editable Word reviewer from the attached lecture.
>
> **Course code:** MD205  
> **Subject:** Obstetrics
>
> Follow the matching course shell and color palette. Preserve the lecture's full content and scientific meaning. Reconstruct structured content as native, editable Word tables wherever feasible.
>
> Create one continuous two-column reviewer, include clinically important figures and tables, add a 20-item PLE/USMLE-style examination with answers and rationales, and finish with a landscape master-reference section.
>
> Before delivering the files, check the layout and content against the original lecture. Clearly report any checks you could not complete.

### If you want to choose specific figures or tables

Use this version instead:

> Use the MedTrans skill to create my reviewer from the attached lecture.
>
> **Course code:** [MD201–MD207]  
> **Subject:** [Your subject]
>
> Preserve the lecture's complete content and scientific meaning. Use the correct course shell and palette. Reconstruct tables as editable Word tables wherever feasible.
>
> **Figures and tables to include:** [List slide numbers or figure/table titles here.]
>
> If I do not specify figures, ask whether I want all clinically important figures, selected figures only, or a text-focused reviewer without embedded figures.
>
> Include exactly 20 board-style questions with answers and rationales, plus a landscape master-reference section. Inspect the rendered pages before delivering the reviewer and identify any unresolved problems.

The simple prompt is a good starting point. The second prompt gives you more control.

## Step 4 — Optional: Add mnemonics and lecturer comments

MedTrans includes an experimental option for separate strips containing teaching aids. These are **beta/WIP features**, so inspect them carefully.

- **Mnemonic strip:** concise memory aids or recall cues added by the AI.
- **Lecturer strip:** relevant professor comments supported by a transcript.

These strips are not automatically part of every reviewer. Ask for them explicitly if you want them.

### Adding lecturer comments from a transcript

If you have a recording, use an audio-transcription tool separately. Gemini may be an option if audio upload is available in your account; other tools may also work. You do not need to send the entire audio to the same AI that creates the document.

Prepare:

- A transcript with timestamps when possible.
- Slide numbers or topic labels matched to the transcript.
- The original PowerPoint or PDF for comparison.

Then send:

> Add a lecturer strip containing only relevant comments supported by the attached transcript. Match each comment to the correct slide/topic using timestamps, slide labels, and the original slides. Keep these comments separate from the original lecture content. Do not invent comments or attribute words to the lecturer unless supported by the transcript.

For mnemonics, send:

> Add concise, clinically useful mnemonics in the designated mnemonic strips. Keep them separate from the original lecture content and label them as added study aids, not lecturer-provided material.

Do not attribute AI-generated mnemonics to your professor. Follow your institution's rules before uploading recordings or transcripts to third-party services.

## Step 5 — Inspect the reviewer before sharing it

A professional-looking document can still contain omissions or formatting errors. Review it before sending it to classmates.

- [ ] The lecture's major sections, definitions, mechanisms, and qualifiers are present.
- [ ] Medical terminology, doses, numbers, abbreviations, and units match the source.
- [ ] Important figures and tables are present and labelled correctly.
- [ ] Tables are native Word tables when required, not just screenshots.
- [ ] The right course shell and palette are used.
- [ ] Two-column flow, gaps, page breaks, headers, and figure placement look correct.
- [ ] Lecturer comments and mnemonics, if included, are supported and clearly distinguished.
- [ ] There are exactly 20 exam questions with four choices each, plus a matching answer key and rationale table.
- [ ] The landscape master-reference section is readable and complete.
- [ ] The DOCX has been rendered to PDF or otherwise inspected page by page.

You can request a final audit with this prompt:

> Compare the reviewer with the original lecture and the matching course shell. Report missing or uncertain content, incorrect table reconstructions, missing figures, layout problems, and any questions or rationales that need review. Do not claim that a check was completed unless you actually performed it. Preserve existing correct content and make only requested fixes.

AI validation is helpful but is not a guarantee of medical accuracy. Check high-stakes clinical details against the lecture and approved course materials.

## Step 6 — Troubleshooting and usage limits

Sometimes an AI may run out of usage, lose a formatting instruction, split a table, misread a scan, or fail to export the DOCX. This does not automatically mean you did something wrong.

Try these steps:

1. **Fix one issue at a time.** Example: “Change the caption label to pink and bold, keep the caption title black, and do not change the table structure.”
2. **Save your work before switching tools.** Keep the original lecture, the generated DOCX, any PDF preview, and the QA notes.
3. **Try another assistant if necessary.** Grok, Claude, ChatGPT, Gemini, or another tool may be available, but document-creation, file upload, and skill support vary by plan and product.
4. **If you hit a usage limit, check the platform's current reset/limit information.** Reset windows vary; do not rely on a fixed timetable.
5. **When starting a new conversation, explain the status.** Say what is already correct, what remains to be fixed, and attach the latest files so the assistant does not needlessly regenerate everything.

Narrow corrections often preserve validated content better than asking the AI to regenerate an entire reviewer.

## Other reminders

1. **Always specify the course code.** MD201–MD207 use different course configurations.
2. **Keep the original source.** OCR is a text aid, not a replacement for the lecture's visual content.
3. **Protect course materials.** Follow your institution's and lecturer's rules before sharing lecture files, slides, recordings, or transcripts.
4. **Keep the skill updated.** Document recurring problems so the whole class can benefit from improvements.
5. **Be patient, but stay involved.** MedTrans can save formatting and organization time; it cannot replace reviewing the source.

## The whole workflow in one line

**Prepare the PDF → Run OCR if needed → Load MedTrans → Upload the lecture → Enter a prompt → Generate the DOCX → Inspect and correct → Share responsibly.**

The goal is not just a beautiful file. It is a readable, editable reviewer that stays faithful to the lecture and supports learning.
