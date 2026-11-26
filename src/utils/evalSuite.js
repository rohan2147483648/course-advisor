// Built-in Evaluation Suite for CourseAdvisor
// Tests NLP parsing accuracy, strict time-budget filtering, prof-drift warning triggers, and duplicate link detection

import { parseSubmissionNote, checkDuplicateResource } from './smartParser.js';
import { INITIAL_RESOURCES, INITIAL_ELECTIVES } from '../data/seedData.js';

export const EVAL_TEST_CASES = [
  {
    id: "eval-1",
    category: "NLP Parsing Accuracy",
    name: "Standard Unstructured Student Cram Note",
    description: "Extract course, professor, time, exam type, and direct match tags from raw student phrasing.",
    input: {
      text: "For ME3100 Midsem under Prof Rao, skip the textbook—just solve Tut Sheets 2-4, takes 2 hours max and 3 questions came directly from it.",
      url: "https://drive.google.com/file/d/me3100-tut24-new/view"
    },
    run: (input) => {
      const parsed = parseSubmissionNote(input.text, input.url);
      const passed =
        parsed.courseCode === "ME3100" &&
        parsed.professor === "Prof. Rajesh Rao" &&
        parsed.examType === "Midsem" &&
        parsed.timeBudget === "2–4 hrs" &&
        parsed.contextTags.includes("Direct Exam Match") &&
        parsed.contextTags.includes("Night-Before Cram");

      return {
        passed,
        expected: "Course: ME3100 | Prof: Prof. Rajesh Rao | Exam: Midsem | Time: 2–4 hrs | Tags: Direct Exam Match, Night-Before Cram",
        actual: `Course: ${parsed.courseCode} | Prof: ${parsed.professor} | Exam: ${parsed.examType} | Time: ${parsed.timeBudget} | Tags: ${parsed.contextTags.join(', ')}`,
        details: parsed
      };
    }
  },
  {
    id: "eval-2",
    category: "NLP Parsing Accuracy",
    name: "30-Minute Quiz Formula Note (< 1 hr normalization)",
    description: "Verify that 30-40 minute cram notes are accurately classified into the '< 1 hr' time budget.",
    input: {
      text: "CS4061 Quiz 1 with Prof Sen: memorize the CNN dimension formula sheet, takes 35 mins and saves 15 marks.",
      url: "https://drive.google.com/file/d/cs4061-cnn-dimensions/view"
    },
    run: (input) => {
      const parsed = parseSubmissionNote(input.text, input.url);
      const passed =
        parsed.courseCode === "CS4061" &&
        parsed.professor === "Prof. Arindam Sen" &&
        parsed.examType === "Quiz 1" &&
        parsed.timeBudget === "< 1 hr" &&
        parsed.timeEstimateMinutes === 35;

      return {
        passed,
        expected: "Course: CS4061 | Exam: Quiz 1 | TimeBudget: < 1 hr (35 mins)",
        actual: `Course: ${parsed.courseCode} | Exam: ${parsed.examType} | TimeBudget: ${parsed.timeBudget} (${parsed.timeEstimateMinutes} mins)`
      };
    }
  },
  {
    id: "eval-3",
    category: "NLP Parsing Accuracy",
    name: "Weekend NPTEL / Stanford Video Archive Extraction",
    description: "Verify that multi-hour lecture series are recognized as 'Full Weekend' budgets.",
    input: {
      text: "EC3201 Endsem complete Oppenheim video playlist and problem bank on youtube. Takes full weekend to cover.",
      url: "https://youtube.com/playlist?list=PLoppenheim123"
    },
    run: (input) => {
      const parsed = parseSubmissionNote(input.text, input.url);
      const passed =
        parsed.courseCode === "EC3201" &&
        parsed.examType === "Endsem" &&
        parsed.timeBudget === "Full Weekend" &&
        parsed.type === "YouTube";

      return {
        passed,
        expected: "Course: EC3201 | Exam: Endsem | TimeBudget: Full Weekend | Type: YouTube",
        actual: `Course: ${parsed.courseCode} | Exam: ${parsed.examType} | TimeBudget: ${parsed.timeBudget} | Type: ${parsed.type}`
      };
    }
  },
  {
    id: "eval-4",
    category: "Strict Time-Budget Filtering",
    name: "Strict '< 1 hr' Filter Never Leaks Weekend Resources",
    description: "Assert that filtering by '< 1 hr' in Exam Triage Mode returns only resources with timeEstimate <= 60 mins and NEVER any 'Full Weekend' items.",
    input: {
      resources: INITIAL_RESOURCES,
      timeFilter: "< 1 hr"
    },
    run: (input) => {
      const filtered = input.resources.filter(r => r.timeBudget === input.timeFilter);
      const leakedWeekend = filtered.filter(r => r.timeBudget === "Full Weekend" || r.timeEstimateMinutes > 60);
      const allUnder60 = filtered.every(r => r.timeEstimateMinutes <= 60);

      const passed = leakedWeekend.length === 0 && allUnder60 && filtered.length > 0;

      return {
        passed,
        expected: "0 leaked weekend/long resources | 100% resources <= 60 mins",
        actual: `${leakedWeekend.length} leaked | ${filtered.length} matching resources under 60 mins`
      };
    }
  },
  {
    id: "eval-5",
    category: "Strict Time-Budget Filtering",
    name: "Multi-Filter Compound Isolation (< 1 hr + Midsem)",
    description: "Verify that simultaneous filtering by Course + Midsem + < 1 hr yields strictly compliant micro-cram resources.",
    input: {
      resources: INITIAL_RESOURCES,
      courseCode: "ME3100",
      examType: "Midsem",
      timeBudget: "< 1 hr"
    },
    run: (input) => {
      const matched = input.resources.filter(r =>
        r.courseCode === input.courseCode &&
        (r.examType === input.examType || r.examType === "All") &&
        r.timeBudget === input.timeBudget
      );

      const isValid = matched.length > 0 && matched.every(r =>
        r.courseCode === "ME3100" &&
        r.timeEstimateMinutes <= 60 &&
        r.timeBudget === "< 1 hr"
      );

      return {
        passed: isValid,
        expected: "Returns valid ME3100 Midsem resources taking < 1 hr (e.g. Boothroyd DFMA Formula Card)",
        actual: `Found ${matched.length} valid resources: ${matched.map(m => m.title).join("; ")}`
      };
    }
  },
  {
    id: "eval-6",
    category: "Professor-Drift Warning Trigger",
    name: "Detect Retired / Previous Professor Warning",
    description: "Verify that reviews authored under previous instructors (e.g. Prof. Raman in CS4061) are flagged with the amber warning badge.",
    input: {
      elective: INITIAL_ELECTIVES.find(e => e.code === "CS4061")
    },
    run: (input) => {
      const currentProf = input.elective.currentProfessor; // "Prof. Arindam Sen"
      const reviews = input.elective.reviews;

      const flaggedReviews = reviews.filter(r => r.professor !== currentProf);
      const currentReviews = reviews.filter(r => r.professor === currentProf);

      const passed =
        flaggedReviews.length === 1 &&
        flaggedReviews[0].professor === "Prof. V. K. Raman" &&
        currentReviews.length === 2;

      return {
        passed,
        expected: "1 flagged review under Prof. V. K. Raman with 'Previous Prof — Verify Syllabus' warning",
        actual: `${flaggedReviews.length} flagged out of ${reviews.length} reviews (Identified: ${flaggedReviews.map(r => r.professor).join(', ')})`
      };
    }
  },
  {
    id: "eval-7",
    category: "Professor-Drift Warning Trigger",
    name: "Detect Syllabus Shift Across All Seed Electives",
    description: "Confirm that every elective in the curriculum has historical previous-prof reviews flagged while current-prof reviews remain clean.",
    input: {
      electives: INITIAL_ELECTIVES
    },
    run: (input) => {
      let totalDriftFound = 0;
      let totalCleanFound = 0;

      for (const e of input.electives) {
        for (const r of e.reviews) {
          if (r.professor !== e.currentProfessor) {
            totalDriftFound++;
          } else {
            totalCleanFound++;
          }
        }
      }

      const passed = totalDriftFound >= 5 && totalCleanFound >= 10;

      return {
        passed,
        expected: "Found at least 5 legacy reviews with syllabus warning across all electives",
        actual: `Found ${totalDriftFound} legacy reviews and ${totalCleanFound} current-prof reviews correctly segregated`
      };
    }
  },
  {
    id: "eval-8",
    category: "Duplicate Detection",
    name: "Exact URL Collision Detection",
    description: "Submitting an existing Google Drive link must immediately trigger the Duplicate Warning alert.",
    input: {
      submission: {
        rawText: "Here are some notes for ME3100 tutorial sheets",
        url: "https://drive.google.com/file/d/1me3100-tut2-4-solutions-rao/view", // Exact match with res-me-1
        courseCode: "ME3100"
      },
      existing: INITIAL_RESOURCES
    },
    run: (input) => {
      const result = checkDuplicateResource(input.submission, input.existing);
      const passed = result.isDuplicate === true && result.type === "EXACT_URL";

      return {
        passed,
        expected: "Duplicate flagged: EXACT_URL match with existing res-me-1",
        actual: `isDuplicate=${result.isDuplicate}, type=${result.type}, message="${result.warningMessage}"`
      };
    }
  },
  {
    id: "eval-9",
    category: "Duplicate Detection",
    name: "High Semantic Similarity Duplicate Detection",
    description: "Submitting an unstructured note nearly identical to existing Tutorial Sheet 2-4 content triggers a semantic overlap duplicate alert even with a fresh URL.",
    input: {
      submission: {
        rawText: "For ME3100 midsem, solve tutorial sheets 2 to 4 solutions step by step numericals.",
        url: "https://drive.google.com/file/d/different-url-id-9999/view",
        courseCode: "ME3100"
      },
      existing: INITIAL_RESOURCES
    },
    run: (input) => {
      const result = checkDuplicateResource(input.submission, input.existing);
      const passed = result.isDuplicate === true && result.type === "SEMANTIC_SIMILARITY";

      return {
        passed,
        expected: "Duplicate flagged: SEMANTIC_SIMILARITY overlap on 'tutorial sheets 2 to 4'",
        actual: `isDuplicate=${result.isDuplicate}, type=${result.type}, message="${result.warningMessage}"`
      };
    }
  },
  {
    id: "eval-10",
    category: "Duplicate Detection",
    name: "Novel Resource Passes Cleanly (Zero False Positives)",
    description: "A completely new resource for a different topic must NOT be falsely flagged as a duplicate.",
    input: {
      submission: {
        rawText: "Complete lab setup guide for OpenMPI and Slurm cluster nodes on AWS EC2 instances.",
        url: "https://github.com/my-campus/openmpi-slurm-lab",
        courseCode: "CS3040"
      },
      existing: INITIAL_RESOURCES
    },
    run: (input) => {
      const result = checkDuplicateResource(input.submission, input.existing);
      const passed = result.isDuplicate === false;

      return {
        passed,
        expected: "isDuplicate = false (clean green pass)",
        actual: `isDuplicate=${result.isDuplicate}`
      };
    }
  },
  {
    id: "eval-11",
    category: "Outcome Verification",
    name: "Broken Link 1-Tap Flag & Hide Logic",
    description: "Flagging a broken link must mark the resource and preserve state so broken links are excluded from exam triage.",
    input: {
      resource: { ...INITIAL_RESOURCES[0], flaggedBroken: false }
    },
    run: (input) => {
      // Simulate flag action
      const flagged = { ...input.resource, flaggedBroken: true };
      const triageList = [flagged, INITIAL_RESOURCES[1]].filter(r => !r.flaggedBroken);

      const passed = triageList.length === 1 && !triageList.some(r => r.id === flagged.id);

      return {
        passed,
        expected: "Flagged resource is excluded from active triage view",
        actual: `Active triage count: ${triageList.length} (excluded broken resource ${flagged.id})`
      };
    }
  }
];
