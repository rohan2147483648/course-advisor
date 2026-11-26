# CourseSignal — Elective Intelligence & Exam Resource Triage
*Product Problem Statement, Scope, Architecture, Prompts & Automated Evaluation Suite*

---

## 1. One-Page Problem & Solution Brief (~550 words)

### a. Our Take on the Problem Statement
Every semester across university engineering campuses, students encounter two high-stakes academic friction points that directly damage CGPAs, placement eligibility, and mental health:

1. **The Elective Selection Trap:** Elective course registration happens within a chaotic 48-hour window. Students scramble across unorganized WhatsApp group chats, disconnected Telegram folders, or informal hostel chatter. A glowing review claiming *"Chill grading, 9+ SGPA guaranteed, zero effort"* becomes catastrophic if the course instructor rotated from a lenient professor to a strict theory-heavy faculty member who tests closed-book handwritten derivations. Without professor-anchored temporal context, senior advice is actively misleading.
2. **The Night-Before Exam Triage Crisis:** At 1:00 AM before a Midsem or Endsem, students face a critical information-overload problem. Generic Google Drive folders and departmental repositories are disorganized dumping grounds containing 40-hour video playlists, 900-page foreign textbooks, and obsolete problem sets. What a student desperately needs under a 2-hour cram budget is *time-filtered, high-yield material*—such as the exact two tutorial sheets from which 80% of numericals are repeated, or a 1-page formula derivation card. Furthermore, existing drives rely on vanity upvotes or download counts rather than authentic post-exam verification.

### b. What is In Scope
- **Multi-Factor Elective Explorer:** Searchable catalog across Engineering, Science, and Humanities with factor-based sorting (Grading Rigor, Workload, Attendance Strictness, and Placement ROI).
- **Professor-Drift Warning Engine:** Every review is strictly anchored to `Professor + Semester Taken`. If a review was written under a previous faculty member, an amber alert badge (`Previous Prof — Verify Syllabus`) warns students of format and syllabus changes.
- **Time-Budgeted Exam Triage Mode:** Hard time budgets (`< 1 hr`, `2–4 hrs`, `Full Weekend`) that strictly isolate high-yield summaries and eliminate bulky material for short study windows.
- **10-Second Natural-Language AI Parser:** A zero-friction submission interface where students paste a single informal sentence; our deterministic parser extracts the course, instructor, exam type, time estimate, and context tags with duplicate collision prevention.
- **Grab-and-Leave Feedback Loop:** Non-intrusive post-visit verification prompting returning students (*"Did this resource actually help in your exam?"*) with 1-tap positive/negative attribution.
- **Live In-Browser Evaluation Suite:** 11 runnable automated test cases with diff verification.

### c. What is Out of Scope
- Full Learning Management System (LMS) hosting gradebooks, official enrollments, or attendance recording.
- Real-time chat/social feeds (messaging is already solved by WhatsApp/Telegram; CourseSignal is structured intelligence, not a chatroom).
- Authentication walls (external reviewers and campus students must access intelligence immediately with zero onboarding friction).
- Hosting copyrighted full-length textbook PDFs (we link to drive notes, curated PYQ sheets, and YouTube walkthroughs).

### d. What is Your Solution to this Problem and Why
**CourseSignal** solves these challenges through two deliberate product design pillars:
1. **Temporal Faculty Anchoring:** Syllabi rarely change every semester—professors do. By anchoring every review to the instructor and highlighting syllabus drift, CourseSignal eliminates obsolete advice.
2. **Strict Time-Budget Triage with Post-Exam Attribution:** Rather than generic social upvotes that reward popular 40-hour lecture series, CourseSignal strictly gates results by the student's available prep window and verifies outcomes post-exam (*"Did this actually save you?"*), ensuring only truly effective material surfaces.

---

## 2. Prompts Used to Create the Tool

### System Architecture & Specification Prompt
```text
Act as a Principal Product Designer & Staff Frontend Engineer. Build CourseSignal—a campus-specific Elective Intelligence & Exam Resource Triage web application for university students.

Design & Visual Standards:
- Polished consumer SaaS aesthetic (Linear/Notion/Raycast inspired, high-contrast light theme: #FAFAFA canvas, #FFFFFF cards, 1px solid #E5E7EB borders, Inter typography).
- Purposeful semantic badge colors: emerald for "Easy A / Verified", amber for "Night-Before Cram / Previous Prof Warning", indigo for "Direct Exam Match".
- Scannable in under 3 seconds, responsive across desktop and mobile.

Core Modules:
1. Elective Explorer: Multi-factor sorting (Grading 1-5, Workload Low/Med/High, Attendance Strict/Chill, Placement Value 1-5). Detail drawer with Professor + Semester review history and automatic [Previous Prof — Verify Syllabus] amber alert badge on older instructor reviews.
2. Exam Triage Mode: Strict time-budget control (< 1 hr, 2-4 hrs, Full Weekend) that isolates high-yield materials and never leaks weekend resources into cram sessions. Context-first cards with outcome verification counts and 1-tap dead link flagging.
3. 10-Second AI Submission & Auto-Tagger: Single natural-language input box with smart deterministic parser extracting Course Code, Professor, Category, Exam Type, Time Estimate, and Context Tags, plus duplicate detection.
4. Grab-and-Leave Feedback Loop: Save accessed resources to localStorage, prompt returning students with 1-tap verification ("Did this actually help?"), and live-update outcome counters.
5. Built-in Eval Runner: Runnable evaluation suite (11 test cases) testing parsing accuracy, strict time budgeting, professor drift warnings, duplicate detection, and dead link handling with live Pass/Fail badges.
```

---

## 3. Evaluation Suite Used to Test the Solution

CourseSignal includes an automated evaluation harness with 11 test cases executed both in-browser and headless:

| Test ID | Test Category | Scenario / Assertion Tested | Result |
|---|---|---|---|
| **eval-1** | NLP Parsing Accuracy | Standard student cram note: extracts `ME3100`, `Prof. Rao`, `Midsem`, `2–4 hrs`, `Direct Exam Match`. | **PASS** |
| **eval-2** | NLP Parsing Accuracy | Micro-cram note: normalizes 30-minute formula note to `< 1 hr` budget for `CS4061` Quiz 1. | **PASS** |
| **eval-3** | NLP Parsing Accuracy | Bulky material: tags Stanford CS231n 14-hour lecture archive as `Full Weekend` and `YouTube`. | **PASS** |
| **eval-4** | Strict Time-Budget Filtering | `< 1 hr` query strictly filters out all 800+ min weekend video lectures (0 leaked resources). | **PASS** |
| **eval-5** | Compound Isolation | Compound filter (`< 1 hr` + `Midsem`) returns only items matching both constraints strictly. | **PASS** |
| **eval-6** | Professor-Drift Warning | Correctly triggers amber alert on Prof. Raman review for `CS4061` (current: Prof. Sen). | **PASS** |
| **eval-7** | Syllabus Shift Coverage | Validates professor drift warning flags across all 6 seed courses with 100% accuracy. | **PASS** |
| **eval-8** | Duplicate Detection | Detects exact URL collision when re-submitting an existing Google Drive resource. | **PASS** |
| **eval-9** | Duplicate Detection | Detects high semantic similarity overlap on Tutorial Sheets 2–4 within the same course. | **PASS** |
| **eval-10** | Duplicate False Positives | Confirms that a novel resource note for a distinct topic produces zero false positive flags. | **PASS** |
| **eval-11** | Dead Link Handling | 1-tap flag broken link dims the target resource and excludes it from active triage views. | **PASS** |

**Evaluation Result: 11 / 11 Tests Passing (100% Pass Rate).**

---

## 4. How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev
# -> Local preview accessible at http://localhost:3000

# 3. Run production build
npm run build

# 4. Run automated headless test suite
node test-runner.js
```
