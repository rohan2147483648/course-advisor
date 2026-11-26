import React, { useState } from 'react';
import { X, FileText, CheckCircle2, ShieldAlert, Sparkles, BookOpen, Terminal, Copy, Check } from 'lucide-react';

export default function ProblemBriefModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('brief'); // brief, prompts, evals

  const handleCopy = () => {
    navigator.clipboard.writeText(BRIEF_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 bg-slate-50/80 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full mb-1.5">
              <FileText className="w-3.5 h-3.5" />
              Product Submission Artifacts
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              CourseAdvisor — 1-Page Problem Statement & Evaluation Brief
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Complete submission document covering problem breakdown, in/out of scope, solution architecture, prompts, and evals.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-6 py-2.5 bg-slate-100 border-b border-slate-200 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('brief')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'brief'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. 1-Page Problem & Solution Brief (~550 words)
          </button>

          <button
            onClick={() => setActiveTab('prompts')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'prompts'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. Prompts Used to Create the Tool
          </button>

          <button
            onClick={() => setActiveTab('evals')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'evals'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3. Evals & Testing Methodology
          </button>

          <button
            onClick={handleCopy}
            className="ml-auto flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-md transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Brief' : 'Copy Text'}</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 text-sm leading-relaxed flex-1">
          {activeTab === 'brief' && (
            <div className="space-y-6">
              {/* Problem Take */}
              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-bold">1</span>
                  Our Take on the Problem Statement
                </h3>
                <p>
                  Every semester across top engineering campuses, thousands of college students face two high-friction academic bottlenecks that directly hurt their CGPA and mental health:
                </p>
                <ol className="list-decimal pl-5 space-y-1.5 text-slate-700">
                  <li>
                    <strong>The Elective Selection Trap:</strong> Elective choices determine SGPA and placement eligibility, yet student decision-making relies on disorganized 500-message WhatsApp groups, outdated word-of-mouth, or guesswork. A review saying <em>"Chill grading, 9+ guaranteed"</em> is catastrophic if the course instructor rotated from Prof. Mukherjee to a strict theory-heavy professor like Prof. Narang.
                  </li>
                  <li>
                    <strong>The Night-Before Exam Triage Crisis:</strong> At 1:00 AM before a Midsem or Endsem, students do not have 15 hours to watch Stanford lecture series or read a 900-page textbook. They need <em>time-budgeted, verified high-yield assets</em>—such as the exact 2 tutorial sheets from which 80% of questions are repeated, or a 1-page formula derivation card. Existing student drives are bloated dumping grounds lacking time-estimates or outcome verification.
                  </li>
                </ol>
              </section>

              {/* Scope */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 space-y-2">
                  <h4 className="font-bold text-emerald-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    What is In Scope
                  </h4>
                  <ul className="text-xs text-emerald-950 space-y-1.5 list-disc pl-4">
                    <li>Multi-factor Elective Explorer with factor-based sorting (Grading, Workload, Attendance, Placement ROI).</li>
                    <li><strong>Professor-Drift Warning Engine:</strong> Anchoring all senior reviews to <code>Professor + Semester Taken</code>, automatically alerting students when an instructor changed.</li>
                    <li><strong>Time-Budgeted Exam Triage Mode:</strong> Hard filters for <code>&lt; 1 hr</code>, <code>2–4 hrs</code>, and <code>Full Weekend</code> that eliminate bloated materials under time pressure.</li>
                    <li><strong>10-Second Frictionless AI Parser:</strong> Single natural-language input box extracting structured course, professor, time, and exam tags with duplicate protection.</li>
                    <li><strong>Grab-and-Leave Feedback Loop:</strong> Tracking resource access and prompting students post-exam with a 1-tap outcome verification check.</li>
                    <li>Built-in live runnable Evaluation Suite (11 test cases).</li>
                  </ul>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-slate-500" />
                    What is Out of Scope
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                    <li>Full Learning Management System (LMS) hosting assignment submissions or official gradebooks.</li>
                    <li>Real-time chat channels (WhatsApp/Telegram already do messaging; CourseAdvisor is structured intelligence, not a chatroom).</li>
                    <li>Heavy user authentication walls (external reviewers and campus students must access intelligence immediately with zero onboarding friction).</li>
                    <li>Hosting pirated full-length textbook PDFs (we link to drive notes, PYQs, and YouTube walkthroughs).</li>
                  </ul>
                </div>
              </div>

              {/* Solution */}
              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-bold">2</span>
                  Our Solution and Why
                </h3>
                <p>
                  <strong>CourseAdvisor</strong> solves this through two deliberate product design pillars:
                </p>
                <p>
                  First, <strong>Temporal Faculty Anchoring</strong>. In colleges, syllabi don't change every year—professors do. By displaying the active instructor and placing amber alerts on legacy reviews, CourseAdvisor prevents students from making blind elective choices based on obsolete senior advice.
                </p>
                <p>
                  Second, <strong>Strict Time-Budget Triage with Grab-and-Leave Verification</strong>. Traditional platforms use generic upvote counters, which favor popular 40-hour video courses even when a student only has 90 minutes before an exam. CourseAdvisor strictly gates results by the student's available prep window and verifies outcomes post-exam (<em>"Did this actually save you?"</em>), generating authentic signal rather than social popularity.
                </p>
              </section>
            </div>
          )}

          {activeTab === 'prompts' && (
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-[#1E222B]">
                Prompts Used to Architect & Build CourseAdvisor
              </h3>
              <p className="text-xs text-[#5B6275]">
                The complete 6-stage structured prompt sequence used to design, code, style with Groww tokens, and evaluate the prototype:
              </p>

              <div className="space-y-3">
                <div className="bg-[#F8FAFB] border border-[#EAECF0] rounded-xl p-3.5 space-y-1">
                  <span className="text-xs font-bold text-[#007054] block">1. Product Architecture & Groww Theme:</span>
                  <p className="text-xs font-mono text-[#2D3139] leading-relaxed">
                    "Build the core React SPA for CourseAdvisor using the Groww visual system (#00D09C teal, #5367FF blue, #1E222B text, #EAECF0 borders) with generous spacing and simple everyday student wording. Establish a clean top navigation with 'Elective Explorer' and 'Exam Resources' tabs, and a prominent 'Share a Tip' CTA button. Exclude all artificial emojis from badges and dropdowns."
                  </p>
                </div>

                <div className="bg-[#F8FAFB] border border-[#EAECF0] rounded-xl p-3.5 space-y-1">
                  <span className="text-xs font-bold text-[#007054] block">2. Elective Intelligence Engine & Professor-Drift Detection:</span>
                  <p className="text-xs font-mono text-[#2D3139] leading-relaxed">
                    "Implement Elective Explorer with multi-factor sorting (recommendation %, grading leniency 1-5, workload, attendance strictness, placement value). Automatically inspect historical student reviews and trigger an amber alert ('Prof Changed — Verify Syllabus') when a review belongs to a previous instructor so juniors avoid studying outdated material."
                  </p>
                </div>

                <div className="bg-[#F8FAFB] border border-[#EAECF0] rounded-xl p-3.5 space-y-1">
                  <span className="text-xs font-bold text-[#007054] block">3. Exam Triage Mode & Strict Time-Budget Isolation:</span>
                  <p className="text-xs font-mono text-[#2D3139] leading-relaxed">
                    "Build the Exam Resources triage view with a 3-part selector: Course, Exam Type (Quiz 1 / Midsem / Endsem), and Available Study Time (&apos;&lt; 1 hr&apos;, &apos;2–4 hrs&apos;, &apos;Weekend&apos;). Selecting &apos;&lt; 1 hr&apos; must strictly isolate formula sheets, 1-pagers, and high-yield questions under 60 minutes and never leak bulky multi-hour lecture series. Include broken link reporting."
                  </p>
                </div>

                <div className="bg-[#F8FAFB] border border-[#EAECF0] rounded-xl p-3.5 space-y-1">
                  <span className="text-xs font-bold text-[#007054] block">4. Single-Box Natural Language Submission & Duplicate Protection:</span>
                  <p className="text-xs font-mono text-[#2D3139] leading-relaxed">
                    "Create a single natural-language submission box where students write in casual slang ('For ME3100 Midsem under Prof Rao, skip textbook—solve tut sheets 2-4, takes 2 hours max'). Automatically extract course, instructor, exam, and duration. Check against existing resources for URL collisions and semantic similarity, and warn if a duplicate already exists."
                  </p>
                </div>

                <div className="bg-[#F8FAFB] border border-[#EAECF0] rounded-xl p-3.5 space-y-1">
                  <span className="text-xs font-bold text-[#007054] block">5. Grab-and-Leave Feedback Loop & 1-Vote-per-Student Integrity:</span>
                  <p className="text-xs font-mono text-[#2D3139] leading-relaxed">
                    "Track opened resources in localStorage. When returning to the app, trigger a subtle top toast: 'Did [Resource Title] actually help for your exam?' with 1-tap '[Yes, Saved Me!]' and '[Not Useful]' buttons. Maintain an outcome verification counter that increments by exactly 1 when verified, highlights the tile, and prevents repeated vote inflation."
                  </p>
                </div>

                <div className="bg-[#F8FAFB] border border-[#EAECF0] rounded-xl p-3.5 space-y-1">
                  <span className="text-xs font-bold text-[#007054] block">6. Automated 11-Test Evaluation Harness & Production Delivery:</span>
                  <p className="text-xs font-mono text-[#2D3139] leading-relaxed">
                    "Construct a live runnable evaluation suite covering 11 automated test cases across note parsing, strict time-budget filtering, professor drift alerts, duplicate collision protection, and broken link handling. Ensure all 11 pass both in-browser and headlessly via Node.js before production bundling."
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'evals' && (
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-slate-900">
                Evaluation Suite Methodology & Live Metrics
              </h3>
              <p className="text-xs text-slate-600">
                CourseAdvisor ships with a live, in-browser evaluation harness consisting of 11 distinct automated unit and integration tests:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <strong className="text-slate-900 block mb-1">1. NLP Note Extraction (Tests 1–3)</strong>
                  Extracts course code, active professor, time budget, and semantic tags from messy unstructured student speech without hallucination.
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <strong className="text-slate-900 block mb-1">2. Strict Time-Budget Isolation (Tests 4–5)</strong>
                  Guarantees that <code>&lt; 1 hr</code> queries strictly yield resources taking &le; 60 minutes, ensuring 0 leaked weekend resources.
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <strong className="text-slate-900 block mb-1">3. Professor-Drift Warning System (Tests 6–7)</strong>
                  Validates that every review authored under a non-current faculty member triggers an amber <code>Previous Prof — Verify Syllabus</code> warning.
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <strong className="text-slate-900 block mb-1">4. Duplicate Detection & Flagging (Tests 8–11)</strong>
                  Detects exact URL collisions and high-frequency semantic text overlap before live insertion while preserving novel contributions.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>CourseAdvisor Product Brief • Production-Grade Prototype</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

const BRIEF_TEXT = `CourseAdvisor — 1-Page Problem Statement & Evaluation Brief

1. OUR TAKE ON THE PROBLEM STATEMENT
Every semester across engineering campuses, college students face two high-friction academic bottlenecks that directly hurt their CGPA and mental health:
- The Elective Selection Trap: Elective choices determine SGPA and placement eligibility, yet student decision-making relies on disorganized 500-message WhatsApp groups, outdated word-of-mouth, or guesswork. A review saying "Chill grading, 9+ guaranteed" is catastrophic if the course instructor rotated from Prof. Mukherjee to a strict theory-heavy professor like Prof. Narang.
- The Night-Before Exam Triage Crisis: At 1:00 AM before a Midsem or Endsem, students do not have 15 hours to watch Stanford lecture series or read a 900-page textbook. They need time-budgeted, verified high-yield assets—such as the exact 2 tutorial sheets from which 80% of questions are repeated, or a 1-page formula derivation card. Existing student drives are bloated dumping grounds lacking time-estimates or outcome verification.

2. WHAT IS IN SCOPE
- Multi-factor Elective Explorer with factor-based sorting (Grading, Workload, Attendance, Placement ROI).
- Professor-Drift Warning Engine: Anchoring all senior reviews to Professor + Semester Taken, automatically alerting students when an instructor changed.
- Time-Budgeted Exam Triage Mode: Hard filters for < 1 hr, 2–4 hrs, and Full Weekend that eliminate bloated materials under time pressure.
- 10-Second Frictionless AI Parser: Single natural-language input box extracting structured course, professor, time, and exam tags with duplicate protection.
- Grab-and-Leave Feedback Loop: Tracking resource access and prompting students post-exam with a 1-tap outcome verification check.
- Built-in live runnable Evaluation Suite (11 test cases).

3. WHAT IS OUT OF SCOPE
- Full Learning Management System (LMS) hosting assignment submissions or official gradebooks.
- Real-time chat channels (WhatsApp/Telegram already do messaging; CourseAdvisor is structured intelligence, not a chatroom).
- Heavy user authentication walls (external reviewers and campus students must access intelligence immediately with zero onboarding friction).
- Hosting pirated full-length textbook PDFs (we link to drive notes, PYQs, and YouTube walkthroughs).

4. OUR SOLUTION AND WHY
CourseAdvisor solves this through two deliberate product design pillars:
First, Temporal Faculty Anchoring. In colleges, syllabi don't change every year—professors do. By displaying the active instructor and placing amber alerts on legacy reviews, CourseAdvisor prevents students from making blind elective choices based on obsolete senior advice.
Second, Strict Time-Budget Triage with Grab-and-Leave Verification. Traditional platforms use generic upvote counters, which favor popular 40-hour video courses even when a student only has 90 minutes before an exam. CourseAdvisor strictly gates results by the student's available prep window and verifies outcomes post-exam ("Did this actually save you?"), generating authentic signal rather than social popularity.`;
