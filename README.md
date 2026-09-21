# Higher Education Leadership & Governance: a graduate-level guide to leading a college or university, with an institution explorer, a budget allocator and a four-frame quiz

[![CI/CD](https://github.com/Freddricklogan/higher-education-leadership/actions/workflows/deploy.yml/badge.svg)](https://github.com/Freddricklogan/higher-education-leadership/actions/workflows/deploy.yml)
[![Coverage](https://img.shields.io/badge/coverage-79.84%25-green)](#5-getting-started--verification)
[![Security (CodeQL)](https://github.com/Freddricklogan/higher-education-leadership/actions/workflows/codeql.yml/badge.svg)](https://github.com/Freddricklogan/higher-education-leadership/actions/workflows/codeql.yml)
[![License MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Live Demo](https://img.shields.io/badge/live%20resource-online-brightgreen)](https://freddricklogan.github.io/higher-education-leadership/)

## 1. Executive Summary & Business Impact

**Problem statement.** New deans, directors and aspiring presidents learn the university from inside one unit and are surprised by the rest: a board that will not manage, a faculty senate that will not be managed, a budget in which the largest line is a discount, an accreditor whose 'voluntary' review decides whether federal aid arrives. The vocabulary of shared governance and net tuition is heard in meetings long before it is understood.

**Solution & value delivered.** A sixteen-section resource that maps the landscape and six institution types, shared governance role by role, Bolman and Deal's frames applied to one department closure, four leadership theories, finance and enrollment management, student development theory and the functional areas of student affairs, equity and campus climate, change and crisis, the legal domains, assessment and accreditation — with an institution explorer, a budget allocator that keeps every slice summing to 100% and judges the result, and a which-frame-is-this quiz. The page is one of ten
resources built on the shared
[Learning Resource Kit](https://github.com/Freddricklogan/learning-resource-kit):
an Executive Shell with live counts, collapsible sections whose progress is
saved in the reader's browser, a five-question quiz written for this
resource that records xAPI 1.0.3 statements locally, and a print layout that
opens every section. Nothing leaves the page; the content-security policy
forbids network calls.

**[→ Read the full case study](docs/CASE_STUDY.md)**

| Outcome | How this repo delivers it |
| --- | --- |
| A resource, not a slide deck | 16 sections (19 minutes at 230 wpm) with an executive summary first: the landscape, institution explorer, governance, shared governance role by role, four frames, leadership theory, finance, enrollment management, student development, student affairs, equity and climate, change and crisis, legal aspects, assessment, accreditation, glossary |
| Interactive where it matters | 4 authored widgets (see §4) kept intact through the conversion and verified under a strict CSP |
| Evidence of learning | Quiz answers and completion recorded as xAPI statements with an anonymous actor; inspectable on the page |
| Reviewable by an institution | No inline script or style, typed buttons, table bodies, a `<main>` landmark; html-validate and ESLint in CI |
| Usable everywhere | Keyboard-operable sections, deep links that open their section, print stylesheet, no horizontal scroll at 400 px |

## 2. Demonstrated Competencies & Technical Skills

- **EdTech & Human-Centered Design** — one institution, many lenses: the explorer, budget and frame quiz all return to how a single campus decision looks from each seat at the table; the law and accreditation sections are orientations with sources, not advice; a glossary closes the loop.
- **Systems Architecture & CS** — authored content in `index.html`, its
  widgets in `src/page.js`, its styles in `src/page.css` under the `--lr-`
  namespace; the kit vendored as `src/lr-kit.js`; config and tests that
  fail CI if a quiz question is malformed.
- **Cybersecurity & Compliance** — `default-src 'none'; script-src 'self';
  connect-src 'none'`; no third-party script; Trivy, npm audit and CodeQL in
  CI.
- **Data Science & AI** — reading time and section counts computed from the
  content at load; scores recorded as scaled results, never claimed.

## 3. System Architecture & Data Flow

```mermaid
flowchart LR
  subgraph TB1["Trust Boundary: GitHub Pages (static)"]
    HTML["index.html<br/>authored content · 16 sections"]:::client
    PAGE["src/page.js + src/page.css<br/>4 widgets · --lr- tokens"]:::client
    KIT["src/lr-kit.js + lr-kit.css<br/>shell · progress · quiz · xAPI · print"]:::service
    CFG["src/config.js<br/>title · tagline · 5 questions"]:::data
  end
  subgraph TB2["Trust Boundary: the reader's browser"]
    LS["localStorage<br/>lr:higher-education-leadership:progress · :xapi · lr:actor"]:::data
  end
  HTML --> PAGE
  CFG --> KIT
  HTML --> KIT
  KIT -->|"CSP: connect-src 'none'"| LS
  classDef client fill:#1f2a44,stroke:#58A6FF,color:#e6edf3
  classDef service fill:#14213d,stroke:#3fb950,color:#e6edf3
  classDef data fill:#1b2a1f,stroke:#3fb950,color:#e6edf3
```

## 4. Technical Highlights & Engineering Decisions

### The authored widgets

| Widget | What it does |
| --- | --- |
| Institution explorer | Six tabs — community college, regional comprehensive, research university, liberal arts, minority-serving, for-profit — with mission, students, funding and governance |
| Four-frame tabs | Structural, human-resource, political and symbolic readings of one scenario: closing a low-enrollment department |
| Which frame is this? | Short scenarios to classify by frame, with an explanation and a running score |
| Budget allocator | Sliders for instruction, academic support, student services, administration and more; moving one rescales the others so the total stays at 100%, then a verdict describes the priorities implied |

### ADR-1 — Convert, do not rewrite

**Context.** The original was one hand-authored file: rich content and
bespoke widgets, but inline styles and scripts that no content-security
policy or validator accepts.

**Decision.** The kit's converter moved the stylesheet and scripts out of
the page, replaced 52 inline style attributes with
23 generated classes, namespaced 26 custom properties, typed
15 buttons, gave 3 tables a body and wrapped the content in a `<main>` landmark. The content and
widget code were not rewritten; `AUDIT.md` lists every change.

**Consequence.** The page passes html-validate under a strict CSP with its
original behaviour intact, and the change is auditable line by line.

### ADR-2 — One quiz, one attempt, standard statements

**Context.** The page's own self-checks vanish on reload and record nothing.

**Decision.** Five questions written from this resource's content live in
`src/config.js`; the kit accepts a single attempt per question, shows the
explanation, and records xAPI *answered* and *completed* statements with a
scaled score, kept in the browser and shown as JSON.

**Consequence.** The score reflects what the reader knew before the
explanation, and an institution can see the exact statements a learning
record store would receive.

### ADR-3 — Progress means opened

**Context.** Scroll depth is easy to measure and says little about reading.

**Decision.** A section counts as opened when its collapsed state is
removed — by click, keyboard, deep link or "Expand all" — and an
*experienced* statement is recorded once.

**Consequence.** The KPI strip is conservative: 16 sections, and the count
only rises when the reader opens one.

## 5. Getting Started & Verification

**Prerequisites.** Node 22 for the checks; the page itself needs only a
browser.

```bash
git clone https://github.com/Freddricklogan/higher-education-leadership.git
cd higher-education-leadership
npm ci
npm run check     # eslint → html-validate → vitest
npx serve .       # open http://localhost:3000
```

**Verification — the numbers this repository actually produced:**

```bash
npm run lint      # 0 problems
npm run validate  # html-validate index.html: clean
npm run coverage  # 7 passed; All files 79.84% (config.js 100%, vendored lr-kit.js 78.75%)
```

| Check | Result |
| --- | --- |
| Unit tests (Vitest, jsdom) | **7 passed / 7** across 2 files — quiz validity, page invariants, the kit mounted on this page |
| Coverage | All files **79.84%** statements: `src/config.js` 100%, vendored `src/lr-kit.js` 78.75% from this page's smoke test (the kit's own suite covers it at 99%) |
| ESLint, html-validate | clean |
| Conversion audit | 52 inline styles → 23 classes · 26 tokens namespaced · 15 buttons typed · 3 tables fixed |
| Headless Chrome smoke | **0 console errors**; all 4 widgets exercised; sections opened 16/16 on Expand all; no horizontal scroll at 1200 or 400 px |

## 6. Live Demo & Production Showcase

**<https://freddricklogan.github.io/higher-education-leadership/>**

**30-second guided walkthrough.** Press **Take the 30-second tour**.

1. **A graduate-level resource, not a slide deck** — 16 sections, about
   19 minutes of reading.
2. **Open a section** — the first section opens and the count rises.
3. **Check your understanding** — five questions on governance, net tuition, yield, accreditation and the four frames.
4. **Your statements, inspectable** — the xAPI JSON recorded in this browser.

The quiz covers:
- the board's fiduciary role under shared governance
- net tuition and discounting
- yield in the enrollment funnel
- why accreditation is functionally mandatory
- the symbolic frame

Part of the resource hub at <https://freddricklogan.github.io/resources/>.
