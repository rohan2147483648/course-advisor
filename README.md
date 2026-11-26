# CourseSignal — Campus Elective Intelligence & Exam Resource Triage

CourseSignal is a high-contrast, consumer SaaS web application prototype designed for engineering students to choose electives with professor-anchored intelligence and triage exam resources under strict time constraints.

---

## Key Features

- **Module A: Elective Explorer:** Multi-factor sorting across Grading (1–5), Workload (Low/Med/High), Attendance (Chill/Strict), and Placement Value. Detailed drawer showing all senior reviews with an automatic amber warning badge (`Previous Prof — Verify Syllabus`) when reviews are from previous instructors.
- **Module B: Exam Triage Mode:** Strict time-budget control (`< 1 hr`, `2–4 hrs`, `Full Weekend`). Zero long video lectures leak into `< 1 hr` night-before cram sessions. Includes context tags (`Direct Exam Match`, `Night-Before Cram`, `High Yield`), outcome verification counters, and 1-tap broken link flagging.
- **Module C: 10-Second AI Submission & Auto-Tagger:** Single natural-language input box powered by a deterministic NLP parser. Extracts Course Code, Professor, Exam Type, Time Estimate, and Context Tags, checks for exact URL or semantic duplicates, and renders live structured chips for 1-click confirmation.
- **Module D: Grab-and-Leave Feedback Loop:** Automatically records accessed resources in `localStorage` and provides an authentic 1-tap verification banner on return visits asking *"Did [Resource] actually help for your exam?"*.
- **Module E: Built-in Eval Runner Drawer:** An in-browser evaluation suite executing 11 automated test cases across parsing, time-budgets, professor-drift warnings, and duplicate detection with live pass/fail badges.

---

## Quick Start

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Run production build
npm run build

# Run automated evaluation suite
node test-runner.js
```
