// CourseSignal Seed Dataset
// Authentic campus electives and exam triage resources with realistic professors, semesters, and senior consensus

export const INITIAL_ELECTIVES = [
  {
    id: "cs4061",
    code: "CS4061",
    title: "Deep Learning & Visual Perception",
    department: "Computer Science & Engineering",
    credits: 4,
    currentProfessor: "Prof. Arindam Sen",
    currentProfSince: "Fall 2024",
    gradingScore: 4.2, // 1-5
    gradingLabel: "Lenient on Code, Strict on Viva",
    workload: "High", // Low, Med, High
    attendance: "Chill", // Chill, Strict
    attendanceDetails: "Bio-attendance rarely tracked; slides recorded and uploaded.",
    placementValue: 4.8, // 1-5
    tags: ["Project-Based", "Core Heavy", "Placement Booster"],
    seniorConsensus: "Heavy midsem coding viva, but the final project carries 40% and can convert into a paper. Must have solid PyTorch basics before week 3.",
    syllabusSnafuAlert: "Prof changed from Prof. Raman in 2023. Exam format shifted from theoretical pen-paper proofs to practical PyTorch model design.",
    stats: {
      enrolled: 142,
      recommendationPct: 88,
      avgGrade: "A-",
      cramDifficulty: "High"
    },
    reviews: [
      {
        id: "rev-cs1",
        author: "Devansh K. (Batch '24)",
        professor: "Prof. Arindam Sen",
        semester: "Fall 2024",
        grade: "A",
        verified: true,
        text: "Sen is fantastic if you want hands-on CV experience. No attendance taken, 2 Kaggle assignments, and the endsem was 50% open internet. Skip the recommended Goodfellow book; his slides are 100% self-sufficient.",
        tips: "Pick your project partner early who knows CUDA/PyTorch, otherwise you'll drown during midsem demo week."
      },
      {
        id: "rev-cs2",
        author: "Pooja M. (Batch '24)",
        professor: "Prof. Arindam Sen",
        semester: "Spring 2024",
        grade: "A-",
        verified: true,
        text: "Scored 9.2 without touching the textbook. Focus entirely on lecture slides 4-8 (CNN backprop derivation and ResNet bottlenecks) for Quiz 1.",
        tips: "Ask him doubts during office hours—he gives hints on what architecture will be on the exam."
      },
      {
        id: "rev-cs3",
        author: "Nikhil T. (Batch '23)",
        professor: "Prof. V. K. Raman",
        semester: "Fall 2022",
        grade: "B",
        verified: true,
        text: "Raman's era was purely theoretical matrix calculus and convex optimization proofs. Closed-book handwritten exams.",
        tips: "DO NOT rely on 2022 PYQs! Prof. Sen completely rewrote the exam pattern when he took over in 2023."
      }
    ]
  },
  {
    id: "hs3002",
    code: "HS3002",
    title: "Science, Technology & Modern Society",
    department: "Humanities & Social Sciences",
    credits: 3,
    currentProfessor: "Prof. Shalini Mukherjee",
    currentProfSince: "Spring 2023",
    gradingScore: 4.9,
    gradingLabel: "Guaranteed Easy A",
    workload: "Low",
    attendance: "Strict",
    attendanceDetails: "Strict roll call at first 5 minutes; requires 75% for grade preservation.",
    placementValue: 2.1,
    tags: ["Easy A", "No Endsem / Project-Based", "Chill Workload", "GPA Booster"],
    seniorConsensus: "The undisputed GPA rescue elective. Zero endsem written exam, just two 1,200-word reaction essays and an 8-page final paper on ethical AI.",
    syllabusSnafuAlert: "Prof Mukherjee took over from Prof. Swaminathan. Swaminathan used to conduct 3-hour subjective written endsems; Mukherjee does pure term papers.",
    stats: {
      enrolled: 210,
      recommendationPct: 96,
      avgGrade: "A",
      cramDifficulty: "Zero"
    },
    reviews: [
      {
        id: "rev-hs1",
        author: "Aakash G. (Batch '25)",
        professor: "Prof. Shalini Mukherjee",
        semester: "Fall 2024",
        grade: "A",
        verified: true,
        text: "Just don't skip classes! Sit in the first 4 rows, speak up once every other lecture, and you are basically guaranteed an EX or A grade. She values thoughtful perspective over technical citations.",
        tips: "Write your term paper on Generative AI copyright or Bioethics in India—she loves those topics."
      },
      {
        id: "rev-hs2",
        author: "Rhea S. (Batch '25)",
        professor: "Prof. Shalini Mukherjee",
        semester: "Spring 2024",
        grade: "A",
        verified: true,
        text: "Term paper submission is graded on critical depth, not page length. Follow Chicago/APA citation properly and you will get a perfect 10/10.",
        tips: "Submit drafts 3 days before deadline for her comments; she gives direct rubric guidance."
      },
      {
        id: "rev-hs3",
        author: "Siddharth B. (Batch '22)",
        professor: "Prof. K. Swaminathan",
        semester: "Spring 2021",
        grade: "B+",
        verified: true,
        text: "Swaminathan used to grade essays with a red pen like high school board exams. Memorizing sociology definitions was mandatory.",
        tips: "Obsolete format. Swaminathan has retired; ignore all old WhatsApp drives with his scanned question papers."
      }
    ]
  },
  {
    id: "ec3201",
    code: "EC3201",
    title: "Digital Signal Processing & Architectures",
    department: "Electronics & Communication",
    credits: 4,
    currentProfessor: "Prof. Rohit Narang",
    currentProfSince: "Fall 2023",
    gradingScore: 2.7,
    gradingLabel: "Harsh Curve & Heavy Math",
    workload: "High",
    attendance: "Chill",
    attendanceDetails: "Attendance optional on ERP, but you will get wrecked in surprise pop quizes if absent.",
    placementValue: 4.9,
    tags: ["Core Heavy", "Placement Booster", "Hardware Core"],
    seniorConsensus: "Crucial for Texas Instruments, Qualcomm, and Nvidia core hardware shortlist, but will drag down your SGPA if taken as a casual elective.",
    syllabusSnafuAlert: "Previous Prof Venkat allowed a double-sided formula cheat sheet. Prof. Narang strictly bans all formula sheets and tests closed-form Z-transform derivations.",
    stats: {
      enrolled: 115,
      recommendationPct: 71,
      avgGrade: "B-",
      cramDifficulty: "Brutal"
    },
    reviews: [
      {
        id: "rev-ec1",
        author: "Karan V. (Batch '24)",
        professor: "Prof. Rohit Narang",
        semester: "Fall 2024",
        grade: "B",
        verified: true,
        text: "Quiz 1 is pure FFT radix-2 proofs. Formula sheet is NOT permitted. You must practice Sanjit Mitra chapter 4 & 5 back exercises with pen and paper.",
        tips: "Don't try to cram 1 night before. Minimum 4 days required to grasp filter design coefficients."
      },
      {
        id: "rev-ec2",
        author: "Meera C. (Batch '24)",
        professor: "Prof. Rohit Narang",
        semester: "Spring 2024",
        grade: "A-",
        verified: true,
        text: "The FPGA lab implementation was 25% of grade and had relatively generous grading if your Verilog simulation wave is clean.",
        tips: "Focus on FIR vs IIR tradeoffs—guaranteed 15-mark question in both Midsem and Endsem."
      },
      {
        id: "rev-ec3",
        author: "Virendra N. (Batch '23)",
        professor: "Prof. K. Venkat",
        semester: "Spring 2023",
        grade: "A",
        verified: true,
        text: "Venkat gave straightforward numericals and allowed 1 A4 cheat sheet.",
        tips: "Narang's midsem is twice as hard as Venkat's old papers. Don't be misled by seniors who took it under Venkat."
      }
    ]
  },
  {
    id: "me3100",
    code: "ME3100",
    title: "Design for Manufacturing & Assembly",
    department: "Mechanical Engineering",
    credits: 3,
    currentProfessor: "Prof. Rajesh Rao",
    currentProfSince: "Spring 2024",
    gradingScore: 4.3,
    gradingLabel: "Predictable & Tutorial-Aligned",
    workload: "Med",
    attendance: "Chill",
    attendanceDetails: "Biometric machine was broken all semester; proxy works seamlessly.",
    placementValue: 3.8,
    tags: ["Chill Attendance", "Easy A", "Direct Exam Match"],
    seniorConsensus: "Midsem questions are 80% verbatim from Tutorial Sheets 2 through 4. CAD assembly submission requires SolidWorks / Fusion360.",
    syllabusSnafuAlert: "Prof. Rao replaced Prof. Gupta. Rao focuses heavily on Boothroyd-Dewhurst DFMA tables, while Gupta focused on sheet metal stamping tolerances.",
    stats: {
      enrolled: 88,
      recommendationPct: 91,
      avgGrade: "A-",
      cramDifficulty: "Low"
    },
    reviews: [
      {
        id: "rev-me1",
        author: "Tanmay P. (Batch '25)",
        professor: "Prof. Rajesh Rao",
        semester: "Fall 2024",
        grade: "A",
        verified: true,
        text: "Skip the heavy Shigley textbook. Rao's lecture PDF slides and tutorial sheets 2-4 cover 90% of the midsem. Takes 3-4 hours max to master the calculation formulas.",
        tips: "Memorize the assembly time estimation table for manual insertion—comes for 20 marks."
      },
      {
        id: "rev-me2",
        author: "Sneha R. (Batch '25)",
        professor: "Prof. Rajesh Rao",
        semester: "Spring 2024",
        grade: "A",
        verified: true,
        text: "His grading is super transparent. He releases the mark scheme on Google Classroom within 48 hours of exam completion.",
        tips: "CAD modeling project is evaluated on parametric constraints. Don't submit unconstrained sketches."
      },
      {
        id: "rev-me3",
        author: "Harish K. (Batch '23)",
        professor: "Prof. S. P. Gupta",
        semester: "Fall 2022",
        grade: "C+",
        verified: true,
        text: "Gupta gave surprise quizzes on random Tuesdays and cut marks for handwriting.",
        tips: "Rao is infinitely better and much fairer. Old batch horror stories no longer apply."
      }
    ]
  },
  {
    id: "mg4010",
    code: "MG4010",
    title: "Financial Engineering & Algorithmic Trading",
    department: "Management & Financial Studies",
    credits: 3,
    currentProfessor: "Prof. Devika Roy",
    currentProfSince: "Fall 2023",
    gradingScore: 4.6,
    gradingLabel: "High ROI & FinTech Relevant",
    workload: "Med",
    attendance: "Chill",
    attendanceDetails: "No mandatory attendance; all Jupyter notebooks committed to GitHub weekly.",
    placementValue: 5.0,
    tags: ["Chill Attendance", "Easy A", "Placement Booster", "FinTech / Quant"],
    seniorConsensus: "The #1 highest ROI elective for Quant, High-Frequency Trading, and Risk Analyst shortlists. 30% of grade is an algorithmic backtesting project.",
    syllabusSnafuAlert: "Prior to 2023, taught by Prof. Bansal with purely theoretical macroeconomics. Prof. Roy modernized it with Python, backtrader, and Black-Scholes Greeks.",
    stats: {
      enrolled: 160,
      recommendationPct: 95,
      avgGrade: "A",
      cramDifficulty: "Med"
    },
    reviews: [
      {
        id: "rev-mg1",
        author: "Arjun N. (Batch '24)",
        professor: "Prof. Devika Roy",
        semester: "Fall 2024",
        grade: "A",
        verified: true,
        text: "Goldmine for interview prep. Two questions in my Jane Street and Graviton interviews were straight out of Module 3 (Options delta hedging & order book dynamics).",
        tips: "Clone her GitHub repo before Midsem; the midterm questions are directly based on the notebook edge cases."
      },
      {
        id: "rev-mg2",
        author: "Ananya S. (Batch '25)",
        professor: "Prof. Devika Roy",
        semester: "Spring 2024",
        grade: "A-",
        verified: true,
        text: "Very accommodating professor. Allows groups of 3 for the backtesting engine. If Sharpe ratio > 1.2 on unseen test data, you get full bonus points.",
        tips: "Use yfinance or polygon API for historical tick data cleanups."
      },
      {
        id: "rev-mg3",
        author: "Rohan D. (Batch '22)",
        professor: "Prof. Alok Bansal",
        semester: "Spring 2022",
        grade: "B",
        verified: true,
        text: "Bansal taught out of 1990s Keynesian macroeconomics slides without a single line of code.",
        tips: "Completely revised course under Prof. Roy. Absolutely do not study Bansal's syllabus."
      }
    ]
  },
  {
    id: "cs3040",
    code: "CS3040",
    title: "Cloud Computing & Distributed Systems",
    department: "Computer Science & Engineering",
    credits: 3,
    currentProfessor: "Prof. Tanmay Joshi",
    currentProfSince: "Fall 2023",
    gradingScore: 4.0,
    gradingLabel: "Project-Centric & Generous",
    workload: "Med",
    attendance: "Chill",
    attendanceDetails: "Hybrid options available; labs checked asynchronously via GitHub PRs.",
    placementValue: 4.7,
    tags: ["Chill Attendance", "No Endsem / Project-Based", "Placement Booster"],
    seniorConsensus: "$100 AWS credit coupons given out for free. Lab viva is super chill if your Docker Compose cluster spins up smoothly without exit code 1.",
    syllabusSnafuAlert: "Switched from OpenStack private cloud lab in 2022 to native AWS/GCP and K8s orchestration under Prof. Joshi.",
    stats: {
      enrolled: 130,
      recommendationPct: 89,
      avgGrade: "A-",
      cramDifficulty: "Low"
    },
    reviews: [
      {
        id: "rev-cc1",
        author: "Prateek M. (Batch '25)",
        professor: "Prof. Tanmay Joshi",
        semester: "Fall 2024",
        grade: "A",
        verified: true,
        text: "The Docker + Raft consensus lab demo is 40% of the entire course. If your cluster survives node kill simulations in front of the TA, you walk away with an easy A.",
        tips: "Watch the Raft animated visualization website—guaranteed viva question on leader election splits."
      },
      {
        id: "rev-cc2",
        author: "Divya L. (Batch '24)",
        professor: "Prof. Tanmay Joshi",
        semester: "Spring 2024",
        grade: "A-",
        verified: true,
        text: "Midsem has 4 design problems on CAP theorem trade-offs and distributed lock managers. No rote memorization required.",
        tips: "Review AWS DynamoDB and Google Spanner paper summaries from week 6."
      }
    ]
  }
];

export const INITIAL_RESOURCES = [
  // --- CS4061 Resources ---
  {
    id: "res-cs-1",
    courseCode: "CS4061",
    courseTitle: "Deep Learning & Visual Perception",
    examType: "Quiz 1",
    timeBudget: "< 1 hr", // "< 1 hr", "2–4 hrs", "Full Weekend"
    timeEstimateMinutes: 35,
    title: "Backprop & CNN Tensor Dimensions 1-Pager Cheat Sheet",
    type: "Drive Notes",
    url: "https://drive.google.com/file/d/1cs4061-backprop-cheatsheet/view",
    contextTags: ["Night-Before Cram", "Direct Exam Match", "High Yield"],
    verifiedCount: 42,
    flaggedBroken: false,
    seniorNote: "Quiz 1 has a mandatory 15-mark question calculating Conv2D output feature map dimensions and receptive field. This 1-pager has the exact 3 formulas needed.",
    author: "Shubham (AIR 14 GATE)",
    createdAt: "2024-09-12"
  },
  {
    id: "res-cs-2",
    courseCode: "CS4061",
    courseTitle: "Deep Learning & Visual Perception",
    examType: "Midsem",
    timeBudget: "2–4 hrs",
    timeEstimateMinutes: 150,
    title: "Midsem Solved PYQ Compilation (2022-2024) with Prof. Sen's Marking Keys",
    type: "PYQ Sheet",
    url: "https://drive.google.com/file/d/1cs4061-pyq-2024-sen/view",
    contextTags: ["Direct Exam Match", "TA Verified", "High Yield"],
    verifiedCount: 68,
    flaggedBroken: false,
    seniorNote: "Question 3 (ResNet skip connection gradient flow) and Question 5 (Loss landscape of Adam vs SGD) appeared with almost identical wording last midsem.",
    author: "Aman T. (Batch '24)",
    createdAt: "2024-10-04"
  },
  {
    id: "res-cs-3",
    courseCode: "CS4061",
    courseTitle: "Deep Learning & Visual Perception",
    examType: "Endsem",
    timeBudget: "Full Weekend",
    timeEstimateMinutes: 840,
    title: "Stanford CS231n Complete Lecture Series & Assignment Walkthrough",
    type: "YouTube",
    url: "https://youtube.com/playlist?list=PL3FW7PR4DFirr6p1w9gGZ_5m2sP54321",
    contextTags: ["Deep Concept", "Placement Booster"],
    verifiedCount: 29,
    flaggedBroken: false,
    seniorNote: "Sen models his endsem vision transformer questions directly off Stanford CS231n 2023 update lectures. Watch at 1.5x speed over Saturday and Sunday.",
    author: "Vikram R. (Research Scholar)",
    createdAt: "2024-08-20"
  },
  {
    id: "res-cs-4",
    courseCode: "CS4061",
    courseTitle: "Deep Learning & Visual Perception",
    examType: "Endsem",
    timeBudget: "< 1 hr",
    timeEstimateMinutes: 45,
    title: "Vision Transformer (ViT) Patch Projection Formula Summary",
    type: "Drive Notes",
    url: "https://drive.google.com/file/d/1cs4061-vit-summary/view",
    contextTags: ["Night-Before Cram", "Direct Exam Match"],
    verifiedCount: 31,
    flaggedBroken: false,
    seniorNote: "Memorize Section 2 on multi-head self-attention computational complexity. 10 marks guaranteed in the endsem part B.",
    author: "Ritika P. (Batch '24)",
    createdAt: "2024-11-10"
  },

  // --- ME3100 Resources ---
  {
    id: "res-me-1",
    courseCode: "ME3100",
    courseTitle: "Design for Manufacturing & Assembly",
    examType: "Midsem",
    timeBudget: "2–4 hrs",
    timeEstimateMinutes: 120,
    title: "Tutorial Sheets 2 to 4 Step-by-Step Numerical Solutions (Prof. Rao)",
    type: "Drive Notes",
    url: "https://drive.google.com/file/d/1me3100-tut2-4-solutions-rao/view",
    contextTags: ["Direct Exam Match", "Night-Before Cram", "High Yield"],
    verifiedCount: 54,
    flaggedBroken: false,
    seniorNote: "Don't touch the textbook! Solve tut sheets 2-4 twice. 3 numericals came with the exact same numbers in last spring's midsem.",
    author: "Kunal S. (Mech Dept Rep)",
    createdAt: "2024-09-28"
  },
  {
    id: "res-me-2",
    courseCode: "ME3100",
    courseTitle: "Design for Manufacturing & Assembly",
    examType: "Midsem",
    timeBudget: "< 1 hr",
    timeEstimateMinutes: 25,
    title: "Boothroyd-Dewhurst DFMA Calculation Formula Card",
    type: "Drive Notes",
    url: "https://drive.google.com/file/d/1me3100-dfma-formula-card/view",
    contextTags: ["Night-Before Cram", "Direct Exam Match"],
    verifiedCount: 38,
    flaggedBroken: false,
    seniorNote: "Includes the design efficiency equation and insertion resistance constants that Prof. Rao never provides on the blackboard.",
    author: "Nishant B. (Batch '25)",
    createdAt: "2024-10-02"
  },
  {
    id: "res-me-3",
    courseCode: "ME3100",
    courseTitle: "Design for Manufacturing & Assembly",
    examType: "Endsem",
    timeBudget: "Full Weekend",
    timeEstimateMinutes: 600,
    title: "NPTEL Design for Quality & Reliability 12-Lecture Course Archive",
    type: "NPTEL",
    url: "https://nptel.ac.in/courses/112107208",
    contextTags: ["Deep Concept"],
    verifiedCount: 16,
    flaggedBroken: false,
    seniorNote: "Good if you want to understand injection molding draft angles and shrinkage calculations from ground up. Overkill for just passing.",
    author: "Prof. Subbaiah (NPTEL Rep)",
    createdAt: "2024-07-15"
  },

  // --- EC3201 Resources ---
  {
    id: "res-ec-1",
    courseCode: "EC3201",
    courseTitle: "Digital Signal Processing & Architectures",
    examType: "Quiz 1",
    timeBudget: "< 1 hr",
    timeEstimateMinutes: 40,
    title: "Radix-2 FFT Butterfly Diagram & Twiddle Factor Derivation",
    type: "Drive Notes",
    url: "https://drive.google.com/file/d/1ec3201-fft-butterfly-notes/view",
    contextTags: ["Night-Before Cram", "Direct Exam Match", "High Yield"],
    verifiedCount: 47,
    flaggedBroken: false,
    seniorNote: "Narang always gives an 8-point DIF or DIT FFT computation in Quiz 1. This 4-page handwritten guide breaks down bit reversal without confusion.",
    author: "Pranav M. (Batch '24)",
    createdAt: "2024-09-08"
  },
  {
    id: "res-ec-2",
    courseCode: "EC3201",
    courseTitle: "Digital Signal Processing & Architectures",
    examType: "Midsem",
    timeBudget: "2–4 hrs",
    timeEstimateMinutes: 180,
    title: "Bilinear Transformation & Butterworth Filter Design Solved Drill",
    type: "PYQ Sheet",
    url: "https://drive.google.com/file/d/1ec3201-butterworth-drill-solved/view",
    contextTags: ["Direct Exam Match", "TA Verified"],
    verifiedCount: 62,
    flaggedBroken: false,
    seniorNote: "Contains 6 worked examples on warping frequency correction and analog-to-digital mapping. Guaranteed 20 marks in midsem section B.",
    author: "Aniket J. (Batch '24)",
    createdAt: "2024-10-09"
  },
  {
    id: "res-ec-3",
    courseCode: "EC3201",
    courseTitle: "Digital Signal Processing & Architectures",
    examType: "Endsem",
    timeBudget: "Full Weekend",
    timeEstimateMinutes: 900,
    title: "Oppenheim & Schafer DSP Complete Problem Set & Solution Manual",
    type: "Drive Notes",
    url: "https://drive.google.com/file/d/1ec3201-oppenheim-solutions/view",
    contextTags: ["Deep Concept", "Placement Booster"],
    verifiedCount: 22,
    flaggedBroken: false,
    seniorNote: "Required if you are sitting for Texas Instruments or Analog Devices technical interviews. Do chapters 5, 7, and 9.",
    author: "Siddharth C. (Hardware Lead)",
    createdAt: "2024-08-11"
  },

  // --- HS3002 Resources ---
  {
    id: "res-hs-1",
    courseCode: "HS3002",
    courseTitle: "Science, Technology & Modern Society",
    examType: "Midsem",
    timeBudget: "< 1 hr",
    timeEstimateMinutes: 30,
    title: "Prof. Mukherjee Essay Rubric Breakdown & Sample 'A' Grade Submissions",
    type: "Drive Notes",
    url: "https://drive.google.com/file/d/1hs3002-mukherjee-essay-templates/view",
    contextTags: ["Night-Before Cram", "High Yield", "Easy A"],
    verifiedCount: 83,
    flaggedBroken: false,
    seniorNote: "Read this before writing your 1,200-word reaction paper. Follows her preferred 5-paragraph thesis structure with sociological counter-arguments.",
    author: "Tanvi S. (Batch '25)",
    createdAt: "2024-09-18"
  },
  {
    id: "res-hs-2",
    courseCode: "HS3002",
    courseTitle: "Science, Technology & Modern Society",
    examType: "Endsem",
    timeBudget: "2–4 hrs",
    timeEstimateMinutes: 120,
    title: "AI Ethics & Algorithmic Bias Synthesis Reading Pack",
    type: "Drive Notes",
    url: "https://drive.google.com/file/d/1hs3002-ai-ethics-pack/view",
    contextTags: ["Direct Exam Match", "Deep Concept"],
    verifiedCount: 39,
    flaggedBroken: false,
    seniorNote: "Curated 3 seminal papers on Facial Recognition bias and LLM hallucinations. Quote these in your term paper for instant 10/10.",
    author: "Kavya M. (Batch '24)",
    createdAt: "2024-11-02"
  },

  // --- MG4010 Resources ---
  {
    id: "res-mg-1",
    courseCode: "MG4010",
    courseTitle: "Financial Engineering & Algorithmic Trading",
    examType: "Midsem",
    timeBudget: "< 1 hr",
    timeEstimateMinutes: 40,
    title: "Black-Scholes Differential Equation & Greeks Cheat Sheet",
    type: "Drive Notes",
    url: "https://drive.google.com/file/d/1mg4010-black-scholes-greeks-cheatsheet/view",
    contextTags: ["Night-Before Cram", "Direct Exam Match", "High Yield"],
    verifiedCount: 51,
    flaggedBroken: false,
    seniorNote: "Delta, Gamma, Vega, Theta equations with sign conventions. Prof. Roy's midsem had 3 numericals directly testing delta-neutral hedging.",
    author: "Sameer V. (Quant Club Sec)",
    createdAt: "2024-10-01"
  },
  {
    id: "res-mg-2",
    courseCode: "MG4010",
    courseTitle: "Financial Engineering & Algorithmic Trading",
    examType: "Midsem",
    timeBudget: "2–4 hrs",
    timeEstimateMinutes: 160,
    title: "Python Backtesting Notebook Walkthrough (Mean Reversion & Momentum)",
    type: "YouTube",
    url: "https://youtube.com/watch?v=mg4010-backtesting-walkthrough",
    contextTags: ["Direct Exam Match", "Placement Booster"],
    verifiedCount: 44,
    flaggedBroken: false,
    seniorNote: "Step-by-step vectorised backtesting in pandas and backtrader. Matches the rubric for the 30% lab project.",
    author: "Gaurav K. (Batch '24)",
    createdAt: "2024-10-15"
  },
  {
    id: "res-mg-3",
    courseCode: "MG4010",
    courseTitle: "Financial Engineering & Algorithmic Trading",
    examType: "Endsem",
    timeBudget: "Full Weekend",
    timeEstimateMinutes: 720,
    title: "John C. Hull Options, Futures & Other Derivatives Case Studies",
    type: "Drive Notes",
    url: "https://drive.google.com/file/d/1mg4010-hull-derivatives-cases/view",
    contextTags: ["Deep Concept", "Placement Booster"],
    verifiedCount: 27,
    flaggedBroken: false,
    seniorNote: "The industry standard quant Bible. Study chapters 10-15 for the endsem and summer hedge fund placement tests.",
    author: "Prof. Devika Roy (Curated)",
    createdAt: "2024-08-30"
  },

  // --- CS3040 Resources ---
  {
    id: "res-cc-1",
    courseCode: "CS3040",
    courseTitle: "Cloud Computing & Distributed Systems",
    examType: "Quiz 1",
    timeBudget: "< 1 hr",
    timeEstimateMinutes: 30,
    title: "CAP Theorem, PACELC & Consensus (Paxos vs Raft) Summary",
    type: "Drive Notes",
    url: "https://drive.google.com/file/d/1cs3040-cap-raft-summary/view",
    contextTags: ["Night-Before Cram", "Direct Exam Match", "High Yield"],
    verifiedCount: 36,
    flaggedBroken: false,
    seniorNote: "Prof. Joshi gives 5 architectural scenarios (e.g., ticket booking vs DNS) and asks whether to pick CP or AP. This sheet maps all patterns.",
    author: "Aditya P. (Batch '25)",
    createdAt: "2024-09-14"
  },
  {
    id: "res-cc-2",
    courseCode: "CS3040",
    courseTitle: "Cloud Computing & Distributed Systems",
    examType: "Midsem",
    timeBudget: "2–4 hrs",
    timeEstimateMinutes: 140,
    title: "Docker Compose & Kubernetes Pod Lifecycle Lab Defense Guide",
    type: "Drive Notes",
    url: "https://drive.google.com/file/d/1cs3040-k8s-docker-defense-guide/view",
    contextTags: ["Direct Exam Match", "TA Verified"],
    verifiedCount: 59,
    flaggedBroken: false,
    seniorNote: "All 15 viva questions TAs ask during the cluster deployment check. Answers prepared by the TA themselves last year.",
    author: "Siddhant R. (Ex-TA CS3040)",
    createdAt: "2024-10-18"
  }
];
