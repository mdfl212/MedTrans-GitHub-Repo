// ============================================================================
// MedTrans — build template (medtrans v1.5.0-beta)
//
// HARD ARCHITECTURE (do not change without user order):
//   Section 1  Portrait 2-col   → continuous content (NO section breaks between topics)
//   Section 2  Portrait 2-col   → Comprehensive Examination  [SECTION BREAK]
//   Section 3  Landscape 1-col  → Master Reference tables    [SECTION BREAK]
//
// Copy this file to the working directory, set COURSE_CODE, fill content,
// run: node build_<name>.js
// ============================================================================

const fs = require("fs");
const path = require("path");
const FONT = "Cambria";
const PALETTES = require("./palettes.json");

// Set COURSE_CODE in your shell or replace this placeholder before building.
const COURSE_CODE = process.env.COURSE_CODE || "REPLACE_WITH_MD201_TO_MD207";
if (!Object.prototype.hasOwnProperty.call(PALETTES, COURSE_CODE)) {
  throw new Error(`Set COURSE_CODE to one of: ${Object.keys(PALETTES).join(", ")}. Refusing to fall back to another course palette.`);
}
const PAL = PALETTES[COURSE_CODE];
const OUT_DIR = path.resolve(process.env.OUT_DIR || process.cwd());

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, ShadingType, BorderStyle, AlignmentType, VerticalAlign, ImageRun,
  Header, Footer, PageNumber, Tab,
} = require("docx");

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

// =====================================================================
// CONTENT — continuous body (NO section breaks between topics)
// =====================================================================

const continuousBody = [
  // --- Cover ---
  new Paragraph({ spacing: { before: 360 }, children: [] }),
  sectionBanner(`${COURSE_CODE} • ${PAL.name || "Medicine"}`, COL_BUDGET),
  new Paragraph({ spacing: { before: 160 }, children: [] }),
  P("MODULE TITLE HERE", { bold: true, size: 36, color: BANNER }),
  P("Subtitle — Full Content Reviewer", { italics: true, color: MUTED }),
  new Paragraph({ spacing: { before: 80 }, children: [] }),
  P("Module X  •  Instructor Name, Credentials", { size: SIZE.caption }),
  P("Caraga State University School of Medicine", { size: SIZE.caption, color: MUTED }),
  new Paragraph({ spacing: { before: 140 }, children: [] }),
  ...keyConcepts([
    "Key concept 1 — replace with real content",
    "Key concept 2 — replace with real content",
    "Key concept 3 — replace with real content",
  ]),

  // --- TOPIC A (banner only — no section break) ---
  sectionBanner("TOPIC A — Title"),
  subhead("Subheading 1"),
  ...bullets([
    "Bullet of full slide content (do not summarize away clinical meaning).",
    { term: "Lead term", rest: " — explanation from the slide." },
  ]),
  // ...diagramFigure("/path/to/slide.png", { widthIn: 2.85, caption: "Original slide caption" }),

  // --- TOPIC B (still same section) ---
  sectionBanner("TOPIC B — Title"),
  subhead("Subheading 1"),
  ...bullets([
    "More continuous content…",
  ]),

  // --- TOPIC C (still same section) ---
  sectionBanner("TOPIC C — Title"),
  subhead("Subheading 1"),
  ...bullets([
    "More continuous content…",
  ]),

  ...keyConcepts([
    "Closing key concept for the continuous body",
  ]),
];

// =====================================================================
// EXAM — its own section (SECTION BREAK)
// =====================================================================

const exam = [
  sectionBanner("COMPREHENSIVE EXAMINATION (20 Items)"),
  P("PLE/USMLE-style. ~70% LOTS / 30% HOTS, randomly ordered. Length-balanced choices. No parenthetical giveaways.", {
    italics: true,
    size: SIZE.caption,
  }),
  // Replace with 20 real qItem(...) calls
  ...qItem(1, "Sample stem — replace with case-based question.", [
    "Long distractor A that matches the length of the correct answer as closely as possible",
    "Long distractor B that matches the length of the correct answer as closely as possible",
    "Long correct answer C that matches the length of the other choices as closely as possible",
    "Long distractor D that matches the length of the correct answer as closely as possible",
  ]),
  subhead("Answer Key and Rationales"),
  makeTable(
    ["Q", "Ans", "Rationale"],
    [["1", "C", "One crisp sentence tied to the source concept."]],
    (() => {
      const b = tableWidthBudget(3);
      return [Math.floor(b * 0.1), Math.floor(b * 0.12), Math.floor(b * 0.78)];
    })()
  ),
];

// =====================================================================
// MASTER REFERENCE — landscape section (SECTION BREAK)
// =====================================================================

const master = [
  sectionBanner("MASTER REFERENCE", LANDSCAPE_COL_BUDGET),
  new Paragraph({
    spacing: { before: 60, after: 50 },
    children: [
      run("High-yield summary tables. Landscape orientation.", {
        italics: true,
        size: SIZE.caption,
        color: MUTED,
      }),
    ],
  }),
  subhead("Summary Table"),
  makeTable(
    ["Column A", "Column B", "Column C"],
    [["Row 1", "…", "…"]],
    evenColumns(3, LANDSCAPE_COL_BUDGET)
  ),
];

// =====================================================================
// ASSEMBLY — section breaks ONLY here
// =====================================================================

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

const header = buildHeader(`${COURSE_CODE} • Reviewer`);
const footer = buildFooter(COURSE_CODE);

const doc = new Document({
  sections: [
    // 1. Continuous content — NO internal section breaks
    { properties: pageProps, headers: { default: header }, footers: { default: footer }, children: continuousBody },
    // 2. Exam — SECTION BREAK
    { properties: pageProps, headers: { default: header }, footers: { default: footer }, children: exam },
    // 3. Master reference landscape — SECTION BREAK
    { properties: landscapeProps, headers: { default: header }, footers: { default: footer }, children: master },
  ],
});

const OUT = path.join(OUT_DIR, `${COURSE_CODE}_Reviewer.docx`);
fs.mkdirSync(OUT_DIR, { recursive: true });
Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(OUT, buf);
  console.log("done:", OUT);
}).catch((e) => {
  console.error(e);
  process.exit(1);
});
