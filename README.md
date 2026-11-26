# CourseAdvisor

A campus-specific Elective Intelligence & Exam Resource Triage platform built for engineering students to choose electives without outdated advice and find study resources under strict exam time budgets.

---

## Live Prototype & Links

- **GitHub Repository:** [https://github.com/rohan2147483648/course-advisor](https://github.com/rohan2147483648/course-advisor)
- **Vercel Deployment:** [https://course-advisor.vercel.app](https://course-advisor.vercel.app)
- **Submission Word Document:** `CourseAdvisor_Submission.docx` (in project root)

---

## Key Features

1. **Elective Explorer:**
   - Multi-factor sorting by grading leniency, workload (Low/Med/High), attendance (Chill/Strict), and placement value.
   - Every review is anchored to `Professor + Semester Taken`.
   - Automatic amber alert (`Previous Prof — Verify Syllabus`) warns students when an older review comes from a previous instructor.

2. **Exam Resources Triage:**
   - Strict time-budget filters (`< 1 hr`, `2–4 hrs`, `Weekend`).
   - Short study windows strictly hide bloated 40-hour video playlists and textbook problem sets.
   - Outcome verification counter with 1-vote toggle per student (`Verified by you + X others`).
   - 1-tap flag dead link feature.

3. **Share a Tip Modal & Success Flow:**
   - Single natural-language input box with automatic detection of course code, professor, exam type, and time required.
   - Duplicate collision detection for identical URLs or overlapping notes.
   - Celebratory confirmation screen with instant card preview and direct jump to the catalog.

4. **Automated Evaluation Suite (11/11 Passing):**
   - In-browser test runner + headless Node.js runner (`node test-runner.js`) testing parsing accuracy, time isolation, professor alerts, duplicate detection, and dead links.

---

## Local Setup & Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/rohan2147483648/course-advisor.git
cd course-advisor

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
# -> Opens http://localhost:3000

# 4. Build for production
npm run build

# 5. Run automated test suite
node test-runner.js
```
