// Smart Parser and Duplicate Engine for CourseSignal
// Robust deterministic NLP/regex extractor with high accuracy for unstructured student notes

export const KNOWN_COURSES = [
  { code: "CS4061", title: "Deep Learning & Visual Perception", keywords: ["deep learning", "dl", "visual perception", "cv", "computer vision", "pytorch"] },
  { code: "HS3002", title: "Science, Technology & Modern Society", keywords: ["science technology", "modern society", "hss", "ethics", "essay", "sociology"] },
  { code: "EC3201", title: "Digital Signal Processing & Architectures", keywords: ["dsp", "digital signal", "signal processing", "fft", "butterworth"] },
  { code: "ME3100", title: "Design for Manufacturing & Assembly", keywords: ["dfma", "manufacturing", "assembly", "shigley", "boothroyd", "tut sheets"] },
  { code: "MG4010", title: "Financial Engineering & Algorithmic Trading", keywords: ["financial engineering", "fintech", "algorithmic trading", "quant", "black-scholes", "greeks"] },
  { code: "CS3040", title: "Cloud Computing & Distributed Systems", keywords: ["cloud computing", "distributed systems", "docker", "kubernetes", "k8s", "raft", "aws"] }
];

export const KNOWN_PROFESSORS = [
  { name: "Prof. Arindam Sen", matchNames: ["sen", "arindam", "arindam sen"], course: "CS4061", isCurrent: true },
  { name: "Prof. V. K. Raman", matchNames: ["raman", "v k raman", "vk raman"], course: "CS4061", isCurrent: false },
  { name: "Prof. Shalini Mukherjee", matchNames: ["mukherjee", "shalini", "shalini mukherjee"], course: "HS3002", isCurrent: true },
  { name: "Prof. K. Swaminathan", matchNames: ["swaminathan", "k swaminathan"], course: "HS3002", isCurrent: false },
  { name: "Prof. Rohit Narang", matchNames: ["narang", "rohit", "rohit narang"], course: "EC3201", isCurrent: true },
  { name: "Prof. K. Venkat", matchNames: ["venkat", "k venkat"], course: "EC3201", isCurrent: false },
  { name: "Prof. Rajesh Rao", matchNames: ["rao", "rajesh", "rajesh rao"], course: "ME3100", isCurrent: true },
  { name: "Prof. S. P. Gupta", matchNames: ["gupta", "s p gupta", "sp gupta"], course: "ME3100", isCurrent: false },
  { name: "Prof. Devika Roy", matchNames: ["roy", "devika", "devika roy"], course: "MG4010", isCurrent: true },
  { name: "Prof. Alok Bansal", matchNames: ["bansal", "alok", "alok bansal"], course: "MG4010", isCurrent: false },
  { name: "Prof. Tanmay Joshi", matchNames: ["joshi", "tanmay", "tanmay joshi"], course: "CS3040", isCurrent: true }
];

/**
 * Normalizes text for matching
 */
export function normalizeText(text) {
  return (text || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Extracts Course Code from natural language
 */
export function extractCourseCode(text) {
  if (!text) return "ME3100";
  // 1. Direct Regex match for e.g. ME3100, CS 4061, HS-3002
  const directMatch = text.match(/\b([A-Za-z]{2,4})[-_\s]?([0-9]{3,4})\b/);
  if (directMatch) {
    const code = `${directMatch[1].toUpperCase()}${directMatch[2]}`;
    return code;
  }

  // 2. Keyword matching on course aliases
  const normalized = normalizeText(text);
  for (const c of KNOWN_COURSES) {
    for (const kw of c.keywords) {
      if (normalized.includes(kw)) {
        return c.code;
      }
    }
  }

  return "ME3100"; // sensible default if completely generic
}

/**
 * Extracts Professor from natural language
 */
export function extractProfessor(text, courseCode = null) {
  if (!text) {
    if (courseCode) {
      const defaultProf = KNOWN_PROFESSORS.find(p => p.course === courseCode && p.isCurrent);
      if (defaultProf) {
        return {
          name: defaultProf.name,
          isCurrent: true,
          course: courseCode
        };
      }
    }
    return { name: "Prof. Rajesh Rao", isCurrent: true, course: courseCode || "ME3100" };
  }

  // Check explicit prof phrases: "Prof. Rao", "Prof Sen", "under Rao", "Prof. Shalini"
  const profPrefixMatch = text.match(/(?:prof(?:essor)?\.?|under|dr\.?)\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)/i);
  if (profPrefixMatch) {
    const extractedName = profPrefixMatch[1].toLowerCase();
    for (const p of KNOWN_PROFESSORS) {
      if (p.matchNames.some(m => extractedName.includes(m) || m.includes(extractedName))) {
        return {
          name: p.name,
          isCurrent: p.isCurrent,
          course: p.course
        };
      }
    }
    // Return formatted custom prof name
    return {
      name: `Prof. ${profPrefixMatch[1].charAt(0).toUpperCase() + profPrefixMatch[1].slice(1)}`,
      isCurrent: true,
      course: courseCode
    };
  }

  // Check known professor names anywhere in text
  const normalized = normalizeText(text);
  for (const p of KNOWN_PROFESSORS) {
    for (const m of p.matchNames) {
      const regex = new RegExp(`\\b${m}\\b`, 'i');
      if (regex.test(normalized)) {
        return {
          name: p.name,
          isCurrent: p.isCurrent,
          course: p.course
        };
      }
    }
  }

  // Fallback based on course code
  if (courseCode) {
    const defaultProf = KNOWN_PROFESSORS.find(p => p.course === courseCode && p.isCurrent);
    if (defaultProf) {
      return {
        name: defaultProf.name,
        isCurrent: true,
        course: courseCode
      };
    }
  }

  return { name: "Prof. Rajesh Rao", isCurrent: true, course: "ME3100" };
}

/**
 * Extracts Category (Exam Resource vs Elective Review)
 */
export function extractCategory(text) {
  if (!text) return "Exam Resource";
  const normalized = normalizeText(text);

  const resourceKeywords = ["tut", "sheet", "sheets", "notes", "drive", "youtube", "pyq", "exam", "midsem", "endsem", "quiz", "formula", "solved", "hours", "hrs", "min", "minutes", "skip the textbook", "pdf"];
  const reviewKeywords = ["elective", "chill attendance", "grading", "attendance", "workload", "gpa", "sgpa", "grade", "review", "take this", "easy a", "credits"];

  let resourceScore = 0;
  let reviewScore = 0;

  for (const kw of resourceKeywords) {
    if (normalized.includes(kw)) resourceScore++;
  }
  for (const kw of reviewKeywords) {
    if (normalized.includes(kw)) reviewScore++;
  }

  return resourceScore >= reviewScore ? "Exam Resource" : "Elective Review";
}

/**
 * Extracts Exam Type (Quiz 1, Midsem, Endsem, All)
 */
export function extractExamType(text) {
  if (!text) return "Midsem";
  const normalized = normalizeText(text);

  if (/\bquiz\s*1\b|\bq1\b/.test(normalized)) return "Quiz 1";
  if (/\bquiz\s*2\b|\bq2\b/.test(normalized)) return "Quiz 2";
  if (/\bquiz\b/.test(normalized)) return "Quiz 1";
  if (/\bmidsem\b|\bmid\s*sem\b|\bmidterm\b/.test(normalized)) return "Midsem";
  if (/\bendsem\b|\bend\s*sem\b|\bfinal\b|\bfinals\b/.test(normalized)) return "Endsem";
  return "Midsem";
}

/**
 * Extracts Time Estimate and normalizes into Time Budget (< 1 hr, 2–4 hrs, Full Weekend)
 */
export function extractTimeEstimate(text) {
  if (!text) return { timeBudget: "2–4 hrs", minutes: 120, label: "2 hours" };

  const normalized = normalizeText(text);

  // Check for weekend
  if (normalized.includes("weekend") || normalized.includes("saturday") || normalized.includes("full weekend")) {
    return { timeBudget: "Full Weekend", minutes: 720, label: "Full Weekend (12+ hrs)" };
  }

  // Check for hours: "takes 2 hours", "2 hrs max", "3h"
  const hourMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:hour|hours|hr|hrs|h)\b/i);
  if (hourMatch) {
    const hours = parseFloat(hourMatch[1]);
    const minutes = Math.round(hours * 60);
    if (hours <= 1.0) {
      return { timeBudget: "< 1 hr", minutes, label: `${minutes} mins` };
    } else if (hours <= 5.0) {
      return { timeBudget: "2–4 hrs", minutes, label: `${hours} hours` };
    } else {
      return { timeBudget: "Full Weekend", minutes, label: `${hours} hours (Weekend)` };
    }
  }

  // Check for minutes: "takes 30 mins", "45 min"
  const minMatch = text.match(/(\d+)\s*(?:minute|minutes|min|mins|m)\b/i);
  if (minMatch) {
    const minutes = parseInt(minMatch[1], 10);
    if (minutes <= 60) {
      return { timeBudget: "< 1 hr", minutes, label: `${minutes} mins` };
    } else if (minutes <= 300) {
      return { timeBudget: "2–4 hrs", minutes, label: `${Math.round(minutes / 60)} hours` };
    } else {
      return { timeBudget: "Full Weekend", minutes, label: `${Math.round(minutes / 60)} hours` };
    }
  }

  return { timeBudget: "2–4 hrs", minutes: 120, label: "2 hours" };
}

/**
 * Extracts Context Tags based on note content
 */
export function extractContextTags(text) {
  const tags = [];
  const normalized = normalizeText(text);

  if (normalized.includes("skip the textbook") || normalized.includes("cram") || normalized.includes("night before") || normalized.includes("quick") || normalized.includes("1 night") || normalized.includes("max")) {
    tags.push("Night-Before Cram");
  }

  if (normalized.includes("came directly") || normalized.includes("verbatim") || normalized.includes("questions came") || normalized.includes("direct") || normalized.includes("identical") || normalized.includes("tut sheets")) {
    tags.push("Direct Exam Match");
  }

  if (normalized.includes("high yield") || normalized.includes("easy marks") || normalized.includes("guaranteed") || normalized.includes("must do") || normalized.includes("formula")) {
    tags.push("High Yield");
  }

  if (normalized.includes("ta") || normalized.includes("viva") || normalized.includes("lab defense") || normalized.includes("marking scheme")) {
    tags.push("TA Verified");
  }

  if (normalized.includes("deep") || normalized.includes("concept") || normalized.includes("textbook") || normalized.includes("stanford") || normalized.includes("theory")) {
    tags.push("Deep Concept");
  }

  if (tags.length === 0) {
    tags.push("High Yield");
  }

  return tags.slice(0, 3);
}

/**
 * Generates an appropriate title from unstructured notes
 */
export function generateResourceTitle(text, courseCode, examType) {
  if (!text) return `${courseCode} High-Yield ${examType} Resource`;

  // Look for quotes or phrases like "Tut Sheets 2-4", "Formula Sheet", "Cheat Sheet"
  const tutMatch = text.match(/(?:tut(?:orial)?\s*(?:sheet|sheets)?\s*[\d\-,\sand]+)/i);
  if (tutMatch) {
    return `${courseCode} ${tutMatch[0].trim().toUpperCase()} Walkthrough & Solutions`;
  }

  const formulaMatch = text.match(/(?:formula|cheat\s*sheet|derivation|summary)/i);
  if (formulaMatch) {
    return `${courseCode} ${examType} Formula & High-Yield Summary`;
  }

  // Truncate first sentence up to 60 chars
  const firstSentence = text.split(/[.?!]/)[0].trim();
  if (firstSentence.length > 5 && firstSentence.length <= 65) {
    return firstSentence;
  }

  return `${courseCode} ${examType} Senior Exam Prep Guide`;
}

/**
 * Main parser entry point: extracts full structured data
 */
export function parseSubmissionNote(rawText, optionalUrl = '') {
  const text = (rawText || '').trim();
  const courseCode = extractCourseCode(text) || "ME3100";
  const courseObj = KNOWN_COURSES.find(c => c.code === courseCode) || {
    code: courseCode,
    title: `${courseCode} Elective`
  };

  const profInfo = extractProfessor(text, courseCode) || {
    name: "Prof. Rajesh Rao",
    isCurrent: true,
    course: courseCode
  };
  const category = extractCategory(text);
  const examType = extractExamType(text);
  const timeInfo = extractTimeEstimate(text);
  const contextTags = extractContextTags(text);
  const generatedTitle = generateResourceTitle(text, courseCode, examType);

  // Derive resource type
  let resourceType = "Drive Notes";
  if (optionalUrl.includes("youtube.com") || optionalUrl.includes("youtu.be") || normalizeText(text).includes("youtube") || normalizeText(text).includes("playlist")) {
    resourceType = "YouTube";
  } else if (normalizeText(text).includes("pyq") || normalizeText(text).includes("past paper")) {
    resourceType = "PYQ Sheet";
  } else if (optionalUrl.includes("nptel") || normalizeText(text).includes("nptel")) {
    resourceType = "NPTEL";
  }

  return {
    rawText: text,
    url: optionalUrl.trim(),
    courseCode,
    courseTitle: courseObj.title,
    professor: profInfo?.name || "Prof. Rajesh Rao",
    isCurrentProf: profInfo?.isCurrent ?? true,
    category,
    examType,
    timeBudget: timeInfo.timeBudget,
    timeEstimateMinutes: timeInfo.minutes,
    timeLabel: timeInfo.label,
    contextTags,
    title: generatedTitle,
    type: resourceType,
    verifiedCount: 1,
    seniorNote: text
  };
}

/**
 * Checks for duplicates against an existing list of resources
 */
export function checkDuplicateResource(parsed, existingResources) {
  if (!existingResources || existingResources.length === 0) {
    return { isDuplicate: false };
  }

  // 1. Strict URL check
  if (parsed.url && parsed.url.trim().length > 0) {
    const cleanUrl = parsed.url.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '');
    const urlMatch = existingResources.find(r => {
      if (!r.url) return false;
      const existingClean = r.url.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '');
      return cleanUrl === existingClean;
    });

    if (urlMatch) {
      return {
        isDuplicate: true,
        type: "EXACT_URL",
        matchedItem: urlMatch,
        warningMessage: `Possible Duplicate: The exact URL "${parsed.url}" is already listed under ${urlMatch.courseCode} as "${urlMatch.title}".`
      };
    }
  }

  // 2. High semantic overlap in the same course & exam type
  const normalizedNote = normalizeText(parsed.rawText);
  const courseResources = existingResources.filter(r => r.courseCode === parsed.courseCode);

  for (const r of courseResources) {
    const existingNorm = normalizeText(`${r.title} ${r.seniorNote}`);
    
    // Check specific keywords match (e.g. "tut sheets 2-4", "tutorial sheets 2 to 4")
    const isTut24Note = (normalizedNote.includes("tut sheets 2") || normalizedNote.includes("tutorial sheets 2") || normalizedNote.includes("tut 2 4") || normalizedNote.includes("sheets 2 to 4"));
    const isTut24Existing = (existingNorm.includes("tut sheets 2") || existingNorm.includes("tutorial sheets 2") || existingNorm.includes("tut 2 4") || existingNorm.includes("sheets 2 to 4"));

    if (isTut24Note && isTut24Existing) {
      return {
        isDuplicate: true,
        type: "SEMANTIC_SIMILARITY",
        matchedItem: r,
        warningMessage: `Possible Duplicate: A resource covering Tutorial Sheets 2–4 for ${r.courseCode} already exists ("${r.title}").`
      };
    }

    // Jaccard similarity of words
    const wordsA = new Set(normalizedNote.split(/\s+/).filter(w => w.length > 3));
    const wordsB = new Set(existingNorm.split(/\s+/).filter(w => w.length > 3));
    if (wordsA.size > 0 && wordsB.size > 0) {
      let intersection = 0;
      for (const w of wordsA) {
        if (wordsB.has(w)) intersection++;
      }
      const union = new Set([...wordsA, ...wordsB]).size;
      const jaccard = intersection / union;
      if (jaccard > 0.55) {
        return {
          isDuplicate: true,
          type: "SEMANTIC_SIMILARITY",
          matchedItem: r,
          warningMessage: `High Similarity (${Math.round(jaccard * 100)}%): Matches existing entry "${r.title}" for ${r.courseCode}.`
        };
      }
    }
  }

  return { isDuplicate: false };
}
