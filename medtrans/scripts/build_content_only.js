// ============================================================================
// CONTENT-ONLY build script (medtrans v1.5.0-beta)
//
// Token-efficient path: require the shared lib, fill content only.
// Do NOT rewrite helpers, page geometry, or section architecture.
//
// Copy this file + reviewer_lib.js + palettes.json into the working dir.
// Set COURSE_CODE, replace placeholders, run: node build_<module>.js
// ============================================================================

const path = require("path");
const PALETTES = require("./palettes.json");

// Set COURSE_CODE in your shell, or replace this placeholder before building.
// Example: COURSE_CODE=MD204 OUT_DIR=./output node build_content_only.js
const COURSE_CODE = process.env.COURSE_CODE || "REPLACE_WITH_MD201_TO_MD207";
if (!Object.prototype.hasOwnProperty.call(PALETTES, COURSE_CODE)) {
  throw new Error(`Set COURSE_CODE to one of: ${Object.keys(PALETTES).join(", ")}. Refusing to fall back to another course palette.`);
}
const OUT_DIR = path.resolve(process.env.OUT_DIR || process.cwd());
const { init } = require("./reviewer_lib");
const R = init(COURSE_CODE);
const {
  sectionBanner, subhead, bullets, keyConcepts, qItem, makeTable,
  diagramFigure, evenColumns, tableWidthBudget, COL_BUDGET, LANDSCAPE_COL_BUDGET,
  P, assemble, PAL,
} = R;

// ---------- CONTINUOUS BODY (no section breaks between topics) ----------
const continuousBody = [
  sectionBanner(`${COURSE_CODE} • ${PAL.name || "Medicine"}`, COL_BUDGET),
  P("MODULE TITLE HERE", { bold: true, size: 36, color: R.BANNER }),
  P("Subtitle — Full Content Reviewer", { italics: true, color: R.MUTED }),
  ...keyConcepts([
    "Key concept 1",
    "Key concept 2",
    "Key concept 3",
  ]),

  // Topic A — banner only, same section
  sectionBanner("TOPIC A — Title"),
  subhead("Subheading"),
  ...bullets([
    "Full slide content here.",
    { term: "Lead term", rest: " — explanation." },
  ]),
  // ...diagramFigure("/path/to/fig.png", { widthIn: 2.85, caption: "caption" }),

  // Topic B — still same section
  sectionBanner("TOPIC B — Title"),
  subhead("Subheading"),
  ...bullets(["…"]),
];

// ---------- EXAM (own section — break is applied by assemble) ----------
const exam = [
  sectionBanner("COMPREHENSIVE EXAMINATION (20 Items)"),
  P("PLE/USMLE-style. ~70% LOTS / 30% HOTS. Length-balanced choices. No parenthetical giveaways.", {
    italics: true, size: R.SIZE.caption,
  }),
  ...qItem(1, "Sample stem.", [
    "Long distractor A matching correct-answer length",
    "Long distractor B matching correct-answer length",
    "Long correct answer C matching distractor length",
    "Long distractor D matching correct-answer length",
  ]),
  subhead("Answer Key and Rationales"),
  makeTable(
    ["Q", "Ans", "Rationale"],
    [["1", "C", "One crisp rationale sentence."]],
    (() => {
      const b = tableWidthBudget(3);
      return [Math.floor(b * 0.1), Math.floor(b * 0.12), Math.floor(b * 0.78)];
    })()
  ),
];

// ---------- MASTER (landscape section — break by assemble) ----------
//
// PURPOSE
// Rapid-review landscape tables that condense the highest-yield facts
// from each major topic. Students should be able to scan these the night before an exam.
//
// HARD CONSTRAINTS
// - Always use LANDSCAPE_COL_BUDGET. Never use portrait COL_BUDGET.
// - Column count is free (typically 3–6). Call evenColumns(n, LANDSCAPE_COL_BUDGET).
// - One major topic = one table (or a short sequence of related tables).
// - Cells short and scannable. Prefer phrases over full sentences.
// - Do not invent facts.
//
// IMPORTANT
// The sample rows below are STYLE EXAMPLES only.
// Replace every cell with facts taken from the uploaded lecture.
// Do NOT keep sample organisms, drugs, or conditions that are absent from the source.
//
// ─────────────────────────────────────────────────────────────────────
// SUGGESTED COLUMNS + MULTIPLE SAMPLE ROWS BY MODULE
// ─────────────────────────────────────────────────────────────────────
//
// MD201 — Foundations
//   Principle | Key point | Clinical pearl | Common pitfall
//   ["Informed consent", "Capacity + disclosure + voluntariness", "Document the discussion", "Assuming family can consent for adult"]
//   ["Confidentiality", "Information shared only with permission or legal duty", "Discuss limits of confidentiality early", "Casual corridor talk about patients"]
//   ["Do-no-harm (non-maleficence)", "Weigh benefit vs risk before every intervention", "Stop when harm exceeds benefit", "Doing something just because it is possible"]
//
// MD202 — Community & Family Medicine
//   Program / Topic | Core elements | Target / Indicator | Notes
//   ["EPI / Immunization", "Cold chain, schedule, coverage", "Fully immunized child ≥ 80%", "Missed opportunity = preventable gap"]
//   ["IMCI", "Assess, classify, treat, counsel, follow-up", "Reduced under-5 mortality", "Color-coded triage (pink/yellow/green)"]
//   ["Family planning", "Informed choice, method mix, counseling", "CPR / unmet need indicators", "Post-partum and post-abortal windows critical"]
//
// MD203 — Microbiology & Parasitology
//   Organism | Transmission | Reservoir / Host | Virulence factors | Clinically relevant
//   ["S. aureus", "Contact, fomites", "Human nares / skin", "TSST-1, PVL, coagulase", "Abscess, osteo, toxic shock"]
//   ["E. coli (UPEC)", "Ascending periurethral", "Human gut flora", "P fimbriae, hemolysin", "Cystitis, pyelonephritis"]
//   ["M. tuberculosis", "Airborne droplet nuclei", "Human (active case)", "Cord factor, mycolic acids", "Cavitary TB, reactivation"]
//   Parasite variant:
//   ["S. japonicum", "Cercaria (skin)", "Oncomelania snail → human", "Egg granuloma", "Hepatosplenic disease"]
//   ["A. lumbricoides", "Egg ingestion", "Human only", "Mechanical obstruction", "Loeffler, biliary migration"]
//
// MD204 — Pediatrics
//   Condition | Age / Timing | Key features | Management pearl
//   ["Physiologic jaundice", "Day 2–4 of life", "Peaks < 15 mg/dL, resolves 1–2 wk", "Phototherapy if above threshold"]
//   ["Febrile seizure", "6 mo – 5 yr", "Brief, generalized, with fever", "No routine LP if well-appearing > 12 mo"]
//   ["Kawasaki disease", "Peak < 5 yr", "Fever ≥ 5 d + 4 of 5 criteria", "IVIG + aspirin within 10 d"]
//
// MD205 — Obstetrics
//   Topic | Definition / Criteria | Management | Complications
//   ["Preeclampsia", "HTN ≥ 140/90 after 20 wk + proteinuria", "MgSO4, anti-HTN, delivery", "Eclampsia, HELLP, abruption"]
//   ["Shoulder dystocia", "Turtle sign, failure of restitution", "HELPERR maneuvers", "Brachial plexus injury, hypoxia"]
//   ["Postpartum hemorrhage", "Blood loss ≥ 500 mL (vaginal) / ≥ 1000 mL (CS)", "Tone, Trauma, Tissue, Thrombin", "Hypovolemic shock, DIC"]
//
// MD206 — IM / Pathology
//   Disease / Lesion | Key pathology | Clinical correlate | High-yield fact
//   ["Rheumatic heart disease", "Aschoff bodies, Anitschkow cells", "Mitral stenosis most common", "Follows untreated strep pharyngitis"]
//   ["Atherosclerosis", "Fibrous cap + necrotic lipid core", "CAD, stroke, PAD", "Foam cells = hallmark early lesion"]
//   ["TB granuloma", "Caseating necrosis + Langhans giant cells", "Reactivation in apex", "Ghon complex = primary infection"]
//
// MD207 — Pharmacology
//   Drug / Class | Mechanism | Uses | Key adverse effects / Notes
//   ["Metformin", "↓ hepatic gluconeogenesis (AMPK)", "First-line T2DM", "Lactic acidosis (rare); hold in AKI / contrast"]
//   ["Warfarin", "Inhibits vit-K epoxide reductase", "AF, mechanical valve, VTE", "Bleeding; many drug/food interactions"]
//   ["Furosemide", "NKCC2 inhibitor (thick AL)", "Edema, acute pulmonary edema", "Hypokalemia, ototoxicity"]
//
// ─────────────────────────────────────────────────────────────────────
// RULES FOR FILLING
// ─────────────────────────────────────────────────────────────────────
// 1. Match columns to COURSE_CODE and actual lecture content.
// 2. Drop / add / rename 1–2 columns if needed; stay consistent inside one table.
// 3. Prefer multiple narrow tables over one very wide table.
// 4. Order rows by clinical importance or lecture order.
// 5. Never invent facts.
//
// Working skeleton (replace with real content for the active COURSE_CODE):

const master = [
  sectionBanner("MASTER REFERENCE", LANDSCAPE_COL_BUDGET),
  subhead("High-Yield Summary"),

  // Example — MD203 style (5 columns). REPLACE all cells with real lecture facts.
  makeTable(
    ["Organism", "Transmission", "Reservoir / Host", "Virulence factors", "Clinically relevant"],
    [
      ["S. aureus", "Contact, fomites", "Human nares / skin", "TSST-1, PVL, coagulase", "Abscess, osteo, toxic shock"],
      ["E. coli (UPEC)", "Ascending periurethral", "Human gut flora", "P fimbriae, hemolysin", "Cystitis, pyelonephritis"],
      ["M. tuberculosis", "Airborne droplet nuclei", "Human (active case)", "Cord factor, mycolic acids", "Cavitary TB, reactivation"],
    ],
    evenColumns(5, LANDSCAPE_COL_BUDGET)
  ),

  // Uncomment / adapt another module’s style as needed:
  // makeTable(
  //   ["Topic", "Definition / Criteria", "Management", "Complications"],
  //   [
  //     ["Preeclampsia", "HTN ≥ 140/90 after 20 wk + proteinuria", "MgSO4, anti-HTN, delivery", "Eclampsia, HELLP, abruption"],
  //     ["Shoulder dystocia", "Turtle sign, failure of restitution", "HELPERR maneuvers", "Brachial plexus injury, hypoxia"],
  //   ],
  //   evenColumns(4, LANDSCAPE_COL_BUDGET)
  // ),
];

// ---------- ASSEMBLE (section breaks only here) ----------
assemble({
  continuousBody,
  exam,
  master,
  title: `${COURSE_CODE} • Reviewer`,
  footerLeft: COURSE_CODE,
  outPath: path.join(OUT_DIR, `${COURSE_CODE}_Reviewer.docx`),
}).catch((e) => {
  console.error(e);
  process.exit(1);
});
