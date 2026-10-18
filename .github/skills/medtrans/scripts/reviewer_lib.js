// reviewer_lib.js — shared infrastructure for MD module reviewers (v1.5.0-beta)
// Content scripts: const R = require("./reviewer_lib"); then R.sectionBanner(...)
"use strict";

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, ShadingType, BorderStyle, AlignmentType, VerticalAlign, ImageRun,
  Header, Footer, PageNumber, Tab,
} = require("docx");
const fs = require("fs");
const path = require("path");

const FONT = "Cambria";

function loadPalettes() {
  const candidates = [
    path.join(__dirname, "palettes.json"),
    path.join(process.cwd(), "palettes.json"),
    path.join(__dirname, "..", "scripts", "palettes.json"),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, "utf8"));
  }
  throw new Error("palettes.json not found");
}

const PALETTES = loadPalettes();

function init(courseCode) {
  if (!Object.prototype.hasOwnProperty.call(PALETTES, courseCode)) {
    throw new Error(`Unsupported course code "${courseCode}". Valid codes: ${Object.keys(PALETTES).join(", ")}.`);
  }
  const PAL = PALETTES[courseCode];
  const BANNER = PAL.banner;
  const BANNER_ACCENT = PAL.bannerAccent;
  const INK = "1A1A1A";
  const DARKBLUE = PAL.subhead;
  const HEADSHADE = PAL.headShade;
  const ALTROW = "F2F2F2";
  const TABLE_BORDER = "D8D2C8";
  const ACCENT_RED = PAL.accent2;
  const MUTED = "5A5A5A";
  const WHITE = "FFFFFF";
  const KEY_BG = PAL.headShade;

  const PAGE = { width: 12240, height: 15840 };
  const MARGIN_TB = 720;
  const MARGIN_LR = 576;
  const COLUMN_COUNT = 2;
  const COLUMN_GAP = 360;
  const COLUMN_SEPARATE = true;
  const COL_BUDGET = Math.floor(
    (PAGE.width - MARGIN_LR * 2 - COLUMN_GAP * (COLUMN_COUNT - 1)) / COLUMN_COUNT
  );
  const LANDSCAPE_PAGE = { width: PAGE.height, height: PAGE.width };
  const LANDSCAPE_COL_BUDGET = Math.floor(LANDSCAPE_PAGE.width - MARGIN_LR * 2);
  const CELL_SPACING_DXA = 72;
  const WIDTH_BUFFER = 20;

  function tableWidthBudget(nCols, budget = COL_BUDGET) {
    return budget - (nCols + 1) * CELL_SPACING_DXA - WIDTH_BUFFER;
  }
  function evenColumns(nCols, budget = COL_BUDGET) {
    const each = Math.floor(tableWidthBudget(nCols, budget) / nCols / 10) * 10;
    return Array(nCols).fill(each);
  }

  const SIZE = {
    banner: 22, subhead: 20, body: 17,
    tableHead: 13, tableBody: 14, caption: 13, qstem: 16,
  };

  function run(text, opts = {}) {
    return new TextRun({
      text: String(text ?? ""),
      bold: opts.bold,
      italics: opts.italics,
      color: opts.color ?? INK,
      size: opts.size ?? SIZE.body,
      font: FONT,
    });
  }

  function P(text, opts = {}) {
    return new Paragraph({
      spacing: { before: opts.before ?? 36, after: opts.after ?? 36, line: 240 },
      keepLines: true,
      children: [run(text, opts)],
    });
  }

  function leadBullet(term, rest) {
    return new Paragraph({
      spacing: { before: 26, after: 26, line: 240 },
      indent: { left: 100 },
      keepLines: true,
      children: [
        run("• ", { size: SIZE.body }),
        run(term, { bold: true, color: DARKBLUE, size: SIZE.body }),
        run(rest, { size: SIZE.body }),
      ],
    });
  }

  function bullets(items) {
    return items.map((it) => {
      if (typeof it === "string") {
        return new Paragraph({
          spacing: { before: 26, after: 26, line: 240 },
          indent: { left: 100 },
          keepLines: true,
          children: [run("• " + it, { size: SIZE.body })],
        });
      }
      return leadBullet(it.term, it.rest);
    });
  }

  function subhead(text) {
    return new Paragraph({
      spacing: { before: 100, after: 32, line: 240 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: HEADSHADE, space: 3 } },
      keepNext: true,
      keepLines: true,
      children: [run(text, { bold: true, color: DARKBLUE, size: SIZE.subhead })],
    });
  }

  function sectionBanner(text, width = COL_BUDGET) {
    return new Table({
      width: { size: width, type: WidthType.DXA },
      columnWidths: [width],
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: width, type: WidthType.DXA },
              shading: { type: ShadingType.CLEAR, fill: BANNER },
              borders: {
                top: { style: BorderStyle.NONE },
                left: { style: BorderStyle.NONE },
                right: { style: BorderStyle.NONE },
                bottom: { style: BorderStyle.SINGLE, size: 12, color: BANNER_ACCENT },
              },
              margins: { top: 50, bottom: 50, left: 70, right: 70 },
              children: [
                new Paragraph({
                  spacing: { before: 0, after: 0 },
                  children: [run(text, { bold: true, color: WHITE, size: SIZE.banner })],
                }),
              ],
            }),
          ],
        }),
      ],
    });
  }

  function cell(text, opts = {}) {
    const isHeader = opts.header;
    return new TableCell({
      width: { size: opts.width, type: WidthType.DXA },
      shading: isHeader
        ? { type: ShadingType.CLEAR, fill: HEADSHADE }
        : opts.alt
        ? { type: ShadingType.CLEAR, fill: ALTROW }
        : undefined,
      borders: {
        top: { style: BorderStyle.SINGLE, size: 4, color: TABLE_BORDER },
        bottom: { style: BorderStyle.SINGLE, size: 4, color: TABLE_BORDER },
        left: { style: BorderStyle.SINGLE, size: 4, color: TABLE_BORDER },
        right: { style: BorderStyle.SINGLE, size: 4, color: TABLE_BORDER },
      },
      margins: { top: 34, bottom: 34, left: 42, right: 42 },
      verticalAlign: VerticalAlign.CENTER,
      children: [
        new Paragraph({
          spacing: { before: 0, after: 0 },
          children: [
            run(String(text ?? ""), {
              bold: isHeader || opts.bold,
              color: isHeader ? DARKBLUE : INK,
              size: isHeader ? SIZE.tableHead : SIZE.tableBody,
            }),
          ],
        }),
      ],
    });
  }

  function makeTable(headers, rows, widths) {
    const w = widths || evenColumns(headers.length);
    const headerRow = new TableRow({
      tableHeader: true,
      cantSplit: true,
      children: headers.map((h, i) => cell(h, { header: true, width: w[i] })),
    });
    const bodyRows = rows.map((r, ri) =>
      new TableRow({
        cantSplit: true,
        children: r.map((c, ci) => cell(c, { width: w[ci], alt: ri % 2 === 1 })),
      })
    );
    return new Table({
      width: { size: w.reduce((a, b) => a + b, 0), type: WidthType.DXA },
      columnWidths: w,
      rows: [headerRow, ...bodyRows],
    });
  }

  function diagramFigure(pngPath, { widthIn = 2.85, caption = "" } = {}) {
    if (!fs.existsSync(pngPath)) {
      return [P("[Figure missing: " + (caption || pngPath) + "]", { italics: true, color: MUTED })];
    }
    const buf = fs.readFileSync(pngPath);
    return [
      new Paragraph({
        spacing: { before: 50, after: 12 },
        alignment: AlignmentType.CENTER,
        children: [
          new ImageRun({
            type: "png",
            data: buf,
            transformation: {
              width: Math.round(widthIn * 96),
              height: Math.round(widthIn * 68),
            },
            altText: { title: caption || "fig", description: caption || "slide", name: "fig" },
          }),
        ],
      }),
      caption
        ? new Paragraph({
            spacing: { before: 8, after: 40 },
            alignment: AlignmentType.CENTER,
            children: [run(caption, { italics: true, color: MUTED, size: SIZE.caption })],
          })
        : new Paragraph({ spacing: { after: 24 }, children: [] }),
    ];
  }

  function keyConcepts(items) {
    const out = [
      new Paragraph({
        spacing: { before: 110, after: 44 },
        shading: { type: ShadingType.CLEAR, fill: KEY_BG },
        border: { left: { style: BorderStyle.SINGLE, size: 14, color: BANNER_ACCENT, space: 5 } },
        keepNext: true,
        children: [run("★ KEY CONCEPTS", { bold: true, color: BANNER, size: SIZE.subhead })],
      }),
    ];
    items.forEach((it) => {
      out.push(
        new Paragraph({
          spacing: { before: 16, after: 16, line: 240 },
          indent: { left: 110 },
          children: [run("• " + it, { size: SIZE.body })],
        })
      );
    });
    return out;
  }

  function qItem(num, stem, choices) {
    const out = [
      new Paragraph({
        spacing: { before: 80, after: 26, line: 240 },
        keepNext: true,
        children: [
          run(`Q${num}. `, { bold: true, color: BANNER, size: SIZE.qstem }),
          run(stem, { size: SIZE.qstem }),
        ],
      }),
    ];
    ["A", "B", "C", "D"].forEach((letter, i) => {
      out.push(
        new Paragraph({
          spacing: { before: 16, after: 16, line: 230 },
          indent: { left: 130 },
          children: [
            run(`${letter}. `, { bold: true, color: DARKBLUE, size: SIZE.body }),
            run(choices[i], { size: SIZE.body }),
          ],
        })
      );
    });
    return out;
  }

  function buildHeader(titleText) {
    return new Header({
      children: [
        new Paragraph({
          spacing: { after: 28 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: BANNER_ACCENT, space: 3 } },
          children: [run(titleText, { bold: true, color: DARKBLUE, size: SIZE.caption })],
        }),
      ],
    });
  }

  function buildFooter(leftText) {
    return new Footer({
      children: [
        new Paragraph({
          spacing: { before: 28 },
          border: { top: { style: BorderStyle.SINGLE, size: 6, color: TABLE_BORDER, space: 4 } },
          tabStops: [{ type: "right", position: COL_BUDGET * COLUMN_COUNT + COLUMN_GAP }],
          children: [
            run(leftText, { color: MUTED, size: SIZE.caption }),
            new TextRun({ children: [new Tab()], size: SIZE.caption, font: FONT }),
            run("Page ", { color: DARKBLUE, size: SIZE.caption }),
            new TextRun({
              children: [PageNumber.CURRENT],
              bold: true,
              color: DARKBLUE,
              size: SIZE.caption,
              font: FONT,
            }),
          ],
        }),
      ],
    });
  }

  const pageProps = {
    page: {
      size: { width: PAGE.width, height: PAGE.height },
      margin: { top: MARGIN_TB, bottom: MARGIN_TB, left: MARGIN_LR, right: MARGIN_LR },
    },
    column: { count: COLUMN_COUNT, space: COLUMN_GAP, separate: COLUMN_SEPARATE },
  };

  const landscapeProps = {
    page: {
      size: { width: LANDSCAPE_PAGE.width, height: LANDSCAPE_PAGE.height },
      margin: { top: MARGIN_TB, bottom: MARGIN_TB, left: MARGIN_LR, right: MARGIN_LR },
    },
    column: { count: 1, space: 0, separate: false },
  };

  /**
   * Build the final document with standard section architecture:
   *   Section 1 continuous content | Section 2 exam | Section 3 landscape master
   */
  function assemble({ continuousBody, exam, master, title, footerLeft, outPath }) {
    const header = buildHeader(title || `${courseCode} • Reviewer`);
    const footer = buildFooter(footerLeft || courseCode);
    const sections = [
      { properties: pageProps, headers: { default: header }, footers: { default: footer }, children: continuousBody },
    ];
    if (exam && exam.length) {
      sections.push({ properties: pageProps, headers: { default: header }, footers: { default: footer }, children: exam });
    }
    if (master && master.length) {
      sections.push({ properties: landscapeProps, headers: { default: header }, footers: { default: footer }, children: master });
    }
    const doc = new Document({ sections });
    return Packer.toBuffer(doc).then((buf) => {
      fs.mkdirSync(path.dirname(path.resolve(outPath)), { recursive: true });
      fs.writeFileSync(outPath, buf);
      console.log("done:", outPath);
      return outPath;
    });
  }

  // ── Strip colors ──────────────────────────────────────────────────────────
  const STRIP_LECTURER_BG  = "F5F0E8";   // warm cream
  const STRIP_LECTURER_BAR = BANNER_ACCENT; // course accent
  const STRIP_MNEMONIC_BG  = "EAF4EA";   // soft green
  const STRIP_MNEMONIC_BAR = "2E7D32";   // dark green (universal — mnemonics are neutral)
  const STRIP_SOURCE_BG    = "EEF2F7";   // light blue-grey
  const STRIP_SOURCE_BAR   = "5A7FA8";   // steel blue
  const STRIP_LABEL_SIZE   = 13;
  const STRIP_TEXT_SIZE    = 13;
  const STRIP_ATTR_SIZE    = 12;

  /**
   * _strip(labelText, lines, bgColor, barColor)
   * Internal builder. lines = array of { text, bold?, italics?, attribution? }
   * attribution lines are rendered smaller and muted.
   */
  function _strip(labelText, lines, bgColor, barColor) {
    const children = [
      // Label row
      new Paragraph({
        spacing: { before: 0, after: 6 },
        children: [
          new TextRun({
            text: labelText,
            bold: true,
            size: STRIP_LABEL_SIZE,
            color: barColor,
            font: FONT,
          }),
        ],
      }),
    ];

    for (const ln of lines) {
      if (ln.attribution) {
        children.push(
          new Paragraph({
            spacing: { before: 4, after: 0 },
            children: [
              new TextRun({
                text: ln.attribution,
                italics: true,
                size: STRIP_ATTR_SIZE,
                color: MUTED,
                font: FONT,
              }),
            ],
          })
        );
      } else {
        children.push(
          new Paragraph({
            spacing: { before: 4, after: 0 },
            children: [
              new TextRun({
                text: ln.text || "",
                bold: ln.bold || false,
                italics: ln.italics !== false, // default italic for strip body
                size: STRIP_TEXT_SIZE,
                color: INK,
                font: FONT,
              }),
            ],
          })
        );
      }
    }

    return new Table({
      width: { size: COL_BUDGET, type: WidthType.DXA },
      columnWidths: [COL_BUDGET],
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: COL_BUDGET, type: WidthType.DXA },
              shading: { type: ShadingType.CLEAR, fill: bgColor },
              borders: {
                top:    { style: BorderStyle.NONE },
                right:  { style: BorderStyle.NONE },
                bottom: { style: BorderStyle.NONE },
                left:   { style: BorderStyle.SINGLE, size: 14, color: barColor },
              },
              margins: { top: 40, bottom: 40, left: 60, right: 40 },
              children,
            }),
          ],
        }),
      ],
    });
  }

  /**
   * lecturerStrip(quoteText, attribution)
   * Renders a warm-cream LECTURER callout box + trailing spacer.
   * Returns an ARRAY — always spread: ...R.lecturerStrip(...)
   * quoteText  — the lecturer's words (string or array of strings for multi-line)
   * attribution — e.g. "— Doc Jinx"
   *
   * Slide-order rule applies: place immediately after the slide content
   * where the lecturer quote appeared.
   */
  function lecturerStrip(quoteText, attribution) {
    const texts = Array.isArray(quoteText) ? quoteText : [quoteText];
    const lines = texts.map((t) => ({ text: t, italics: true }));
    if (attribution) lines.push({ attribution });
    return [
      _strip("LECTURER", lines, STRIP_LECTURER_BG, STRIP_LECTURER_BAR),
      new Paragraph({ spacing: { before: 0, after: 80 }, children: [] }),
    ];
  }

  /**
   * mnemonicStrip(content, attribution)
   * Renders a soft-green MNEMONIC callout box.
   * content — string, or array of strings/objects { text, bold? }
   * attribution — e.g. "— OB Platinum"
   *
   * Use for mnemonics, timing cues, and structured memory aids.
   * For two-column mnemonics (e.g. "5 W's | Timing"), pass content as a
   * single pre-formatted string with line breaks or call makeTable() separately
   * and follow it with a sourceStrip for attribution.
   */
  function mnemonicStrip(content, attribution) {
    const items = Array.isArray(content) ? content : [{ text: content }];
    const lines = items.map((it) =>
      typeof it === "string" ? { text: it, italics: false, bold: false } : it
    );
    if (attribution) lines.push({ attribution });
    return [
      _strip("MNEMONIC", lines, STRIP_MNEMONIC_BG, STRIP_MNEMONIC_BAR),
      new Paragraph({ spacing: { before: 0, after: 80 }, children: [] }),
    ];
  }

  /**
   * sourceStrip(quoteText, attribution)
   * Renders a blue-grey SOURCE callout box.
   * Use for quotes from Topnotch OB, OB Platinum, and similar review references.
   */
  function sourceStrip(quoteText, attribution) {
    const texts = Array.isArray(quoteText) ? quoteText : [quoteText];
    const lines = texts.map((t) => ({ text: t, italics: true }));
    if (attribution) lines.push({ attribution });
    return [
      _strip("SOURCE", lines, STRIP_SOURCE_BG, STRIP_SOURCE_BAR),
      new Paragraph({ spacing: { before: 0, after: 80 }, children: [] }),
    ];
  }

  return {
    COURSE_CODE: courseCode,
    PAL, BANNER, BANNER_ACCENT, INK, DARKBLUE, HEADSHADE, MUTED, WHITE, KEY_BG,
    COL_BUDGET, LANDSCAPE_COL_BUDGET, SIZE,
    tableWidthBudget, evenColumns,
    run, P, bullets, leadBullet, subhead, sectionBanner, cell, makeTable,
    diagramFigure, keyConcepts, qItem, buildHeader, buildFooter,
    lecturerStrip, mnemonicStrip, sourceStrip,
    pageProps, landscapeProps, assemble,
    Document, Packer,
  };
}

module.exports = { init, PALETTES };
