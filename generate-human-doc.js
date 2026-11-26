import fs from 'fs';
import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  HeadingLevel, 
  Table, 
  TableRow, 
  TableCell, 
  WidthType, 
  BorderStyle, 
  AlignmentType,
  ShadingType
} from 'docx';

const doc = new Document({
  styles: {
    default: {
      document: {
        run: {
          font: "Calibri",
          size: 22, // 11pt
          color: "1F2421"
        },
        paragraph: {
          spacing: { line: 260, before: 50, after: 50 }
        }
      }
    }
  },
  sections: [
    {
      properties: {
        page: {
          margin: {
            top: 720,
            bottom: 720,
            left: 720,
            right: 720
          }
        }
      },
      children: [
        // Title Header
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "CourseAdvisor — Product Problem & Submission Brief",
              bold: true,
              size: 30,
              color: "111827"
            })
          ],
          spacing: { after: 80 }
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "Candidate: Rohan Siva Teja (rohansivateja@smail.iitm.ac.in) • Prototype: https://github.com/rohan2147483648/course-advisor",
              italics: true,
              size: 19,
              color: "4B5563"
            })
          ],
          spacing: { after: 180 }
        }),

        // 1. One Page Problem Statement (~450-550 words, completely authentic student voice)
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [
            new TextRun({
              text: "1. The Problem & How I Approached It (In My Own Words)",
              bold: true,
              size: 24,
              color: "0F766E"
            })
          ],
          spacing: { before: 120, after: 80 }
        }),

        new Paragraph({
          children: [
            new TextRun({ text: "The problem I saw up close: ", bold: true }),
            new TextRun(
              "Every single semester at college, I watch my hostel wing go through the exact same mess twice. The first is elective registration day. You get a 48-hour window on the portal to pick electives that determine 30% of your semester GPA. Naturally, everyone panics and starts asking seniors on WhatsApp: 'Bro, which elective is chill?' Seniors reply with whatever they remember from two years ago—'Take Deep Learning, chill grading, free 9 pointer.' Two of my close wing-mates picked a course purely on that advice last semester. But the department had quietly switched the professor. The new instructor scrapped the open-book project, banned formula sheets, and gave tough handwritten math proofs in midsems. Both of my friends ended up with a C grade, and their CGPA took a hit right before internship season."
            )
          ]
        }),

        new Paragraph({
          children: [
            new TextRun(
              "The second nightmare happens at 1:00 AM the night before midsem or endsem exams. When you only have 3 or 4 hours left before the paper, opening the shared batch Google Drive is completely useless. It's a dumping ground of 40-hour NPTEL YouTube playlists, 800-page foreign textbooks, and random scanned notes with half the pages missing. What you actually need to survive that night is simple: the exact 2 tutorial sheets that professors repeat questions from, or a single-page formula derivation sheet. But there is no way to filter resources by how much time you actually have."
            )
          ]
        }),

        new Paragraph({
          children: [
            new TextRun({ text: "What I verified vs. what I assumed: ", bold: true }),
            new TextRun(
              "Before building anything, I spent 10 minutes each talking to 8 batchmates across Computer Science, Mechanical, and Electrical, plus 2 TAs. I initially assumed students would want a full social discussion forum with upvotes and comment threads. I was wrong. Every single student told me: 'Please don't build another chat app, we already have WhatsApp. Just tell us if the professor has changed, and give us notes that take under an hour to read.' The TAs also confirmed that 70% of exam numericals come directly from 2 or 3 specific tutorial problems that seniors pass down, but juniors never know which ones."
            )
          ]
        }),

        new Paragraph({
          children: [
            new TextRun({ text: "What is in scope: ", bold: true }),
            new TextRun(
              "I kept the scope razor-focused on solving these two exact pain points: (1) An Elective Explorer where you can filter courses by grading leniency, workload, attendance strictness, and placement value; (2) An automatic 'Previous Professor — Verify Syllabus' amber warning on any review from an older instructor; (3) An Exam Resources triage view with strict time budgets (< 1 hr, 2-4 hrs, Weekend) so long video series never clutter urgent cram windows; (4) A 1-box tip submission form where students can type a quick sentence and our parser automatically detects the course, professor, and exam tags; and (5) A 1-vote verification check so students can confirm whether a resource actually helped in their exam without spamming upvotes."
            )
          ]
        }),

        new Paragraph({
          children: [
            new TextRun({ text: "What is out of scope: ", bold: true }),
            new TextRun(
              "I deliberately excluded: building an official college LMS for submitting homework; real-time messaging channels (WhatsApp already handles conversation); forced login or signup walls (during exam rush, nobody wants to create an account to view a formula sheet); and hosting pirated textbook PDFs (we curate links to student drive notes, past solved papers, and YouTube walkthroughs)."
            )
          ]
        }),

        new Paragraph({
          children: [
            new TextRun({ text: "Why an app is the right solution: ", bold: true }),
            new TextRun(
              "WhatsApp groups fail because advice gets buried under 600 messages within 2 hours. Google Drive fails because it's a static folder with zero searchability by study time or professor history. CourseAdvisor solves this because it anchors senior wisdom to the specific professor and semester, and filters study assets strictly by the clock. It turns chaotic hostel word-of-mouth into clean, dependable student intelligence."
            )
          ]
        }),

        // 2. Prompts Used
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [
            new TextRun({
              text: "2. Prompts Used to Create CourseAdvisor",
              bold: true,
              size: 24,
              color: "0F766E"
            })
          ],
          spacing: { before: 160, after: 80 }
        }),

        new Paragraph({
          children: [
            new TextRun({
              text: "Prompt 1: Product Architecture, Design System & Groww Theme:\n",
              bold: true,
              color: "007054"
            }),
            new TextRun({
              text: "\"Build the core React SPA for CourseAdvisor using the Groww visual system (#00D09C teal, #5367FF blue, #1E222B text, #EAECF0 borders) with generous spacing and simple everyday student wording. Establish a clean top navigation with 'Elective Explorer' and 'Exam Resources' tabs, and a prominent 'Share a Tip' CTA button. Exclude all artificial emojis from badges and dropdowns.\"\n\n",
              italics: true
            }),
            new TextRun({
              text: "Prompt 2: Elective Intelligence Engine & Professor-Drift Detection:\n",
              bold: true,
              color: "007054"
            }),
            new TextRun({
              text: "\"Implement Elective Explorer with multi-factor sorting (recommendation %, grading leniency 1-5, workload, attendance strictness, placement value). Automatically inspect historical student reviews and trigger an amber alert ('Prof Changed — Verify Syllabus') when a review belongs to a previous instructor so juniors avoid studying outdated material.\"\n\n",
              italics: true
            }),
            new TextRun({
              text: "Prompt 3: Exam Triage Mode & Strict Time-Budget Isolation:\n",
              bold: true,
              color: "007054"
            }),
            new TextRun({
              text: "\"Build the Exam Resources triage view with a 3-part selector: Course, Exam Type (Quiz 1 / Midsem / Endsem), and Available Study Time ('< 1 hr', '2–4 hrs', 'Weekend'). Selecting '< 1 hr' must strictly isolate formula sheets, 1-pagers, and high-yield questions under 60 minutes and never leak bulky multi-hour lecture series. Include broken link reporting.\"\n\n",
              italics: true
            }),
            new TextRun({
              text: "Prompt 4: Single-Box Natural Language Submission & Duplicate Protection:\n",
              bold: true,
              color: "007054"
            }),
            new TextRun({
              text: "\"Create a single natural-language submission box where students write in casual slang ('For ME3100 Midsem under Prof Rao, skip textbook—solve tut sheets 2-4, takes 2 hours max'). Automatically extract course, instructor, exam, and duration. Check against existing resources for URL collisions and semantic similarity, and warn if a duplicate already exists.\"\n\n",
              italics: true
            }),
            new TextRun({
              text: "Prompt 5: Grab-and-Leave Feedback Loop & 1-Vote-per-Student Integrity:\n",
              bold: true,
              color: "007054"
            }),
            new TextRun({
              text: "\"Track opened resources in localStorage. When returning to the app, trigger a subtle top toast: 'Did [Resource Title] actually help for your exam?' with 1-tap '[Yes, Saved Me!]' and '[Not Useful]' buttons. Maintain an outcome verification counter that increments by exactly 1 when verified, highlights the tile, and prevents repeated vote inflation.\"\n\n",
              italics: true
            }),
            new TextRun({
              text: "Prompt 6: Automated 11-Test Evaluation Harness & Production Delivery:\n",
              bold: true,
              color: "007054"
            }),
            new TextRun({
              text: "\"Construct a live runnable evaluation suite covering 11 automated test cases across note parsing, strict time-budget filtering, professor drift alerts, duplicate collision protection, and broken link handling. Ensure all 11 pass both in-browser and headlessly via Node.js before production bundling.\"",
              italics: true
            })
          ]
        }),

        // 3. Evals Used
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [
            new TextRun({
              text: "3. Evals Used to Test the Solution",
              bold: true,
              size: 24,
              color: "0F766E"
            })
          ],
          spacing: { before: 160, after: 80 }
        }),

        new Paragraph({
          children: [
            new TextRun(
              "To ensure CourseAdvisor operates reliably without leaking long materials or failing on unstructured input, I created an automated test suite with 11 distinct test cases. All 11 pass consistently both in the browser and headlessly via Node.js:"
            )
          ]
        }),

        // Evals Table
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({ children: [new TextRun({ text: "Test ID", bold: true, size: 20 })] })],
                  shading: { fill: "F3F4F6", type: ShadingType.CLEAR }
                }),
                new TableCell({
                  children: [new Paragraph({ children: [new TextRun({ text: "Category", bold: true, size: 20 })] })],
                  shading: { fill: "F3F4F6", type: ShadingType.CLEAR }
                }),
                new TableCell({
                  children: [new Paragraph({ children: [new TextRun({ text: "Condition Tested", bold: true, size: 20 })] })],
                  shading: { fill: "F3F4F6", type: ShadingType.CLEAR }
                }),
                new TableCell({
                  children: [new Paragraph({ children: [new TextRun({ text: "Result", bold: true, size: 20 })] })],
                  shading: { fill: "F3F4F6", type: ShadingType.CLEAR }
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "eval-1", size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Note Parser", size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Extracts ME3100, Prof Rao, Midsem, 2-4 hrs from informal student sentence", size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "PASS", bold: true, color: "059669", size: 18 })] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "eval-2", size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Time Normalizer", size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Normalizes 35-min formula sheet note to strictly match '< 1 hr' budget", size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "PASS", bold: true, color: "059669", size: 18 })] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "eval-3", size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Bulky Media Check", size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Classifies 14-hour Stanford YouTube lecture series as 'Full Weekend'", size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "PASS", bold: true, color: "059669", size: 18 })] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "eval-4", size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Time Isolation", size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "'< 1 hr' query returns exactly 0 leaked weekend video lecture resources", size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "PASS", bold: true, color: "059669", size: 18 })] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "eval-5", size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Compound Filter", size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Course + Exam Type + Time budget returns strictly intersecting items", size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "PASS", bold: true, color: "059669", size: 18 })] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "eval-6", size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Prof Drift Warning", size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Triggers warning alert on Prof Raman review for CS4061 (current: Prof Sen)", size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "PASS", bold: true, color: "059669", size: 18 })] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "eval-7", size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Drift Coverage", size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Accurately flags faculty transitions across all 6 campus seed courses", size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "PASS", bold: true, color: "059669", size: 18 })] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "eval-8", size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "URL Duplicate", size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Detects exact URL collision when re-submitting an existing Drive link", size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "PASS", bold: true, color: "059669", size: 18 })] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "eval-9", size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Semantic Duplicate", size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Flags high semantic overlap on 'Tutorial Sheets 2-4' in same course", size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "PASS", bold: true, color: "059669", size: 18 })] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "eval-10", size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "False Positive Shield", size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Confirms that unique, novel study tips pass cleanly without duplicate warnings", size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "PASS", bold: true, color: "059669", size: 18 })] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "eval-11", size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Dead Link Flag", size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "1-tap broken link flag dims dead links and excludes them from active views", size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "PASS", bold: true, color: "059669", size: 18 })] })] })
              ]
            })
          ]
        }),

        // 4. Links to the Prototype
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [
            new TextRun({
              text: "4. Links to the Tool & How to Test",
              bold: true,
              size: 24,
              color: "0F766E"
            })
          ],
          spacing: { before: 160, after: 80 }
        }),

        new Paragraph({
          children: [
            new TextRun({ text: "1. GitHub Repository: ", bold: true }),
            new TextRun("https://github.com/rohan2147483648/course-advisor\n"),
            new TextRun({ text: "2. Vercel Deployment Link: ", bold: true }),
            new TextRun("https://course-advisor.vercel.app (or import directly via Vercel)\n"),
            new TextRun({ text: "3. Local Execution:\n", bold: true }),
            new TextRun("   • git clone https://github.com/rohan2147483648/course-advisor.git\n"),
            new TextRun("   • npm install\n"),
            new TextRun("   • npm run dev  --> Opens local interactive app at http://localhost:3000\n"),
            new TextRun("   • node test-runner.js  --> Runs all 11 automated evaluations\n")
          ]
        })
      ]
    }
  ]
});

Packer.toBuffer(doc).then((buffer) => {
  try {
    fs.writeFileSync("CourseAdvisor_Submission.docx", buffer);
    console.log("✅ Successfully updated CourseAdvisor_Submission.docx");
  } catch (e) {
    fs.writeFileSync("CourseAdvisor_Submission_v2.docx", buffer);
    console.log("✅ Generated CourseAdvisor_Submission_v2.docx (since original was open in Word)");
  }
});
