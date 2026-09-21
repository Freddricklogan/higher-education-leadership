# Case Study — Higher Education Leadership & Governance

**Repository:** [higher-education-leadership](https://github.com/Freddricklogan/higher-education-leadership) · **Live demo:** [freddricklogan.github.io/higher-education-leadership](https://freddricklogan.github.io/higher-education-leadership/) · **Author:** Freddrick Logan

---

## 1. Who has this problem

Faculty stepping into a chair or deanship, student-affairs professionals moving toward a vice-presidency, doctoral students in higher-education administration, and trustees who join a board from industry and discover a university is not a company. I have worked inside one — at Illinois Tech, in educational technology and programme leadership — and consulted to others; the same surprise recurs: everyone knows their own unit and nobody has been shown the whole.

## 2. The problem, as a scenario

A new dean is told to close a low-enrollment department. She reads it structurally — the numbers do not support the programme — and announces a plan. The faculty senate objects that curriculum is its domain; the board asks why it was not consulted; alumni hold a vigil; the provost asks what the closure does to discount rate and yield next cycle; the accreditor wants a teach-out plan. Nothing in the plan was wrong; it was made from one seat at a table that has five.

## 3. What it costs to leave it alone

A closure that becomes a governance crisis, a president's credibility spent on a departmental decision, an enrollment cycle lost to the story it tells. I will not put a figure on it — institutions differ by orders of magnitude and reputation does not price cleanly. What is certain is that each perspective the dean missed is a known office with a known sphere of authority, and seeing the table before sitting at it is teachable.

## 4. The approach, and the alternative I rejected

I wrote a sixteen-section resource that shows the whole table. An institution explorer sets six institution types side by side — community college to for-profit — with mission, students, funding and governance, because advice that ignores type is wrong half the time. Shared governance is laid out role by role, each with its sphere. Bolman and Deal's four frames are applied to exactly the department closure above, with a quiz that asks the reader to classify new scenarios by frame. A budget allocator keeps every slice summing to 100% and judges the priorities the reader has implied. Around these sit leadership theory, enrollment management and net tuition, student development and student affairs, equity and climate, Kotter applied to a retention initiative, the legal domains, and assessment and accreditation with why the voluntary review is functionally mandatory. The resource then joined the shared Learning Resource Kit: Executive Shell, collapsible sections with saved progress, a five-question quiz written from this content that records xAPI statements locally, and a print layout.

The alternative I rejected was an organisation-chart primer — who reports to whom. Charts do not show spheres of authority, discounting or accreditation, which is where new leaders are surprised.

## 5. What the code does today

Real: the authored content across sixteen sections with an executive summary and glossary; four working widgets — institution explorer, four-frame tabs, the which-frame quiz with a running score, the budget allocator with proportional rescaling — moved from inline script to a module without rewriting; the kit layer with progress, quiz, xAPI 1.0.3 statements and print; a strict content-security policy with no inline script or style; tests that validate the quiz configuration and mount the kit against the real page.

Simulated: the budget allocator's categories and verdicts are illustrative, not a ledger; the closure scenario is a composite. The legal section is an orientation with sources, not advice, and says so.

Worth knowing: reading time is words at 230 per minute; progress counts a section as opened, not read; the frame quiz's scenarios are short by design.

## 6. Evidence

Measured locally with the commands CI runs: 7 tests passing across two files — quiz validity, page invariants, and the vendored kit mounted on this page; coverage 79.84% of all files with `src/config.js` at 100% and the vendored kit at 78.75% from this page's smoke test; ESLint and html-validate clean. The conversion audit records 52 inline style attributes replaced by 23 classes, 26 custom properties namespaced, 15 buttons typed, 3 tables given a body and a `<main>` landmark added. Headless Chrome on the converted page: zero console errors; the third institution tab activates the research university, the fourth frame tab activates the symbolic frame, moving the first budget slider to 60 keeps the total at 100% and returns an academic-centred verdict, the frame quiz scores a first answer; Expand all opens 16 of 16 sections and the KPI strip follows; no horizontal scroll at 1280 or 400 pixels.

## 7. What it would take to run this in production

As a public resource it is in production now. For a leadership-development programme it needs the kit's statements sent to the institution's learning record store — endpoint, credentials, consent notice, identified actor, one origin in the content-security policy — and a second reader for the questions if it counts toward a credential. Days of integration; the content does not change.

## 8. Limits and next steps

United States institutions only; one closure scenario; a budget model with fixed categories and no revenue side; federal law only. Next: a revenue-and-expense model that shows discounting explicitly, a second scenario from a community college, a state-system governance appendix, and per-section questions in place of one quiz at the end.

## 9. Who should look at this

**Hiring manager:** evidence that I understand how a university is actually governed and financed, and can teach it to people about to lead one.
**Consulting client:** a map of the seats at the table before a contested decision — governance, finance, enrollment, accreditation — that I use to structure an engagement.
**Engineer:** read `src/page.js` for the budget allocator's proportional rescaling and drift correction, and `tests/kit.test.js` for the kit mounted against this page's real markup.
