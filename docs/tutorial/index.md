---
title: "MedTrans Tutorial: Turn Lecture Slides into an Editable Reviewer"
layout: page
---

This guide is for **absolute beginners**. You do not need to know how to code. Just follow the steps in order.

## The whole process

**Prepare your lecture PDF → Load MedTrans → Copy the prompt → Answer the figure question → Check your reviewer.**

## Step 1 — Prepare your lecture PDF

Start with your professor's lecture slides, usually saved as a PDF.

### Do I need OCR?

OCR turns text in slide images into selectable, searchable text. It can save time and reduce the AI usage spent on reading slides.

1. Open your PDF and try to select and copy a sentence.
2. If you can select the text, you may skip OCR.
3. If each page acts like one big picture, or the text cannot be copied properly, run OCR first.

Recommended tools:

- [MaxAI PDF OCR](https://www.maxai.co/pdf-tools/pdf-ocr/)
- [PDF24 OCR](https://tools.pdf24.org/en/ocr)

Download the OCR-processed PDF and quickly check a few pages. OCR can misread medical terms, numbers, abbreviations, and tables, so **keep the original PDF** too. Use the original slides to check figures, diagrams, and table layout.

Only upload lecture materials to third-party services if your school and instructor allow it.

## Step 2 — Load the MedTrans skill

A **skill** is a reusable set of instructions that helps an AI follow the same workflow. You do not have to understand all the files inside it.

**[Download the MedTrans skill package](https://github.com/mdfl212/MedTrans-GitHub-Repo/releases/download/init/MedTrans_v1.5.0.zip)**

Prefer watching a video? [Watch my earlier MedTrans skill tutorial on YouTube](https://youtu.be/8d1QEsNEGH4).

Choose the AI assistant you want to use. Menus can look a little different depending on your account.

### Grok

1. Open **Plugins** or **Skills**.
2. Choose **Add skills** or the upload option.
3. Upload the MedTrans ZIP you downloaded and enable it.
4. In the chat, type `/medtrans` if the skill command is available.

<figure class="medtrans-demo-figure">
  <video class="medtrans-demo-video" controls playsinline preload="metadata" aria-label="Screen recording showing how to add and enable the MedTrans skill in Grok.">
    <source src="{{ '/tutorial/tutorial-media/videos/grok-setup.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support embedded video. You can <a href="{{ '/tutorial/tutorial-media/videos/grok-setup.mp4' | relative_url }}">open the video directly</a>.
  </video>
  <figcaption>Screen recording showing how to add and enable the MedTrans skill in Grok. Your menu may look a little different.</figcaption>
</figure>

### Claude

1. Open **Settings** or **Customize**, then find **Skills**.
2. Choose the option to add or upload a skill.
3. Upload the MedTrans ZIP and enable it.
4. In the chat, type `/medtrans` if available. Otherwise, simply tell Claude to use the MedTrans skill.

<figure class="medtrans-demo-figure">
  <video class="medtrans-demo-video" controls playsinline preload="metadata" aria-label="Screen recording showing how to add and enable the MedTrans skill in Claude.">
    <source src="{{ '/tutorial/tutorial-media/videos/claude-setup.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support embedded video. You can <a href="{{ '/tutorial/tutorial-media/videos/claude-setup.mp4' | relative_url }}">open the video directly</a>.
  </video>
  <figcaption>Screen recording showing how to add and enable the MedTrans skill in Claude. Available options can vary by account.</figcaption>
</figure>

### ChatGPT

If your ChatGPT account has a **Skills** feature, open it and use the option to add or upload a skill.

If you are using a regular chat without that feature, attach the MedTrans package and ask ChatGPT to follow it. If it cannot read the ZIP, extract it and attach `SKILL.md` plus the shell and palette for your course. Uploading files into a regular chat does not permanently install a skill.

<figure class="medtrans-demo-figure">
  <video class="medtrans-demo-video" controls playsinline preload="metadata" aria-label="Screen recording showing the MedTrans setup process in ChatGPT.">
    <source src="{{ '/tutorial/tutorial-media/videos/chatgpt-setup.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support embedded video. You can <a href="{{ '/tutorial/tutorial-media/videos/chatgpt-setup.mp4' | relative_url }}">open the video directly</a>.
  </video>
  <figcaption>Screen recording showing the MedTrans setup process in ChatGPT. The exact interface depends on which features your account has.</figcaption>
</figure>

### Another AI assistant?

You can try another assistant if it can read your files and create Word documents. If it has no skill installer, attach the MedTrans instructions and the matching course files, then ask it to follow them.

## Step 3 — Attach your lecture and copy this prompt

Attach your **OCR-processed PDF** to the AI chat. Keep the original PDF available too, especially if it has clearer diagrams or tables.

### ⭐ COPY THIS PROMPT

<div class="medtrans-prompt">
  <p class="medtrans-prompt-label">Copy this, change the course, and send it to your AI:</p>
  <pre><code>Make a DOCX of this lecture using the MedTrans skill.
Subject: MD205 OB.</code></pre>
</div>

**That's all you need to type to get started.** Change `MD205 OB` to your own course. The skill contains the detailed instructions, so you do not need to write a long prompt.

The AI should ask which figures you want before it starts making the document. You can answer in plain language, such as “include all important figures,” “include slides 3 and 5,” or “no figures.”

### When the AI asks about figures

Reply with whichever option you prefer. For example:

- **Specific figures:** “Include figures from slides 3, 5, and 9.”
- **All important figures:** “Include all clinically important figures and diagrams.”
- **No figures:** “Do not embed figures; keep the reviewer text-focused.”

If you already know which figures you want, you can put that choice directly in the prompt. The skill should ask before generating the document if your preference is unclear.

## Step 4 — Wait for the reviewer

After you send the prompt and answer the figure question, let the AI work. It may take a while because the reviewer can include tables, figures, exam questions, rationales, and a landscape reference section.

<figure class="medtrans-demo-figure">
  <img src="{{ '/tutorial/tutorial-media/easy-to-use/finished-reviewer-demo-original.gif' | relative_url }}" alt="Animated preview of a finished MedTrans reviewer made with Grok" loading="lazy">
  <figcaption>Example of a finished reviewer. Your own document will depend on the lecture and AI platform you use.</figcaption>
</figure>

The expected MedTrans reviewer includes:

- A continuous two-column Word reviewer
- Reconstructed, editable tables wherever feasible
- A 20-question board-style exam with answers and rationales
- A landscape master-reference section

The finished file should be an editable **.docx**. Some AI assistants may also provide a PDF preview.

## Step 5 — Optional: Add mnemonics or lecturer comments

These are extras. You can skip this step and still create a reviewer.

**Mnemonic strips** contain memory aids. **Lecturer strips** contain relevant professor comments from a transcript. These strips are experimental (beta/WIP), so inspect their accuracy and spacing carefully.

### What do the strips look like?

Here are two examples from a MedTrans reviewer: one shows lecturer/source strips, and the other shows a lecturer strip beside a mnemonic and timing cue.

<figure class="medtrans-demo-figure">
  <img src="{{ '/tutorial/tutorial-media/easy-to-use/strip-examples-side-by-side-original.webp' | relative_url }}" alt="Example of the separate lecturer and source strips in a reviewer" loading="lazy">
  <figcaption>Example 1: lecturer and source notes are visually separated from the main lecture text.</figcaption>
</figure>

<figure class="medtrans-demo-figure">
  <img src="{{ '/tutorial/tutorial-media/easy-to-use/lecturer-mnemonic-strip-example-original.webp' | relative_url }}" alt="Example of lecturer notes and green mnemonic and timing-cue panels" loading="lazy">
  <figcaption>Example 2: lecturer notes above a green mnemonic panel, with the timing cue included inside the green panel.</figcaption>
</figure>

**Your output may not look exactly like these screenshots.** Think of action figures made by different manufacturers: the general design may be similar, but the colors and finish can vary. Different AI tools may also change colors, fonts, borders, spacing, and table layout. The goal is to keep the content clear and the notes distinct—not to make every document look pixel-for-pixel identical.

To add mnemonics, send:

> Please add a few useful mnemonics in the designated mnemonic strips. Keep them separate from the original lecture content.

To add lecturer comments, first make a text transcript of the lecture audio. A timestamped transcript or one marked with slide numbers is easiest to match to the slides. You can use a transcription tool such as Gemini if audio transcription is available to you. Attach the transcript and the original slides, then send:

> Please add relevant lecturer comments from the attached transcript. Match them to the correct slide or topic. Do not invent comments or attribute statements to the lecturer unless they appear in the transcript.

You do not need to upload audio to the same AI that makes the reviewer. Follow your school's rules before uploading recordings or transcripts to an outside service.

## Step 6 — Check the reviewer before sharing it

A document can look professional and still contain errors. Before sending it to classmates, open the Word file and compare it with the original slides.

- [ ] Important lecture topics and details are present.
- [ ] Medical terms, numbers, doses, abbreviations, and units match the source.
- [ ] Figures and table labels are correct.
- [ ] Tables are readable and editable where expected.
- [ ] The correct course colors and template are used.
- [ ] There are no awkward gaps, overlapping elements, or broken page/column layouts.
- [ ] The 20 exam questions, answer key, and rationales agree with one another.
- [ ] The landscape master-reference section is readable.
- [ ] The file has been checked page by page, preferably using the PDF preview too.

You can ask the AI to help with the final check:

> Check this reviewer against the original lecture. Tell me what is missing, uncertain, mislabeled, or poorly formatted. Only claim to have checked something if you actually checked it.

**For medical content, always verify clinical details against the original lecture and your approved course materials.** AI checking helps, but does not guarantee accuracy.

## What if the AI makes a mistake or runs out of usage?

This happens, especially on free or trial plans. Different assistants have different usage limits and reset schedules.

- If only one thing is wrong, ask for that specific correction instead of regenerating the whole document.
- Save the original PDF, latest Word file, and any PDF preview before switching tools.
- If you reach a usage limit, try another available assistant or wait until your limit resets.
- When starting a new chat, attach the latest files and explain what is already correct and what still needs fixing.

For example: “Fix only the spacing between these two strips. Do not change the table content or other formatting.”

## Final reminder

**Prepare the PDF → Load MedTrans → Attach the lecture → Copy the prompt → Choose figures → Generate → Check → Share responsibly.**

MedTrans is here to save time on organization and formatting. The original lecture remains the authority for what the reviewer says.
