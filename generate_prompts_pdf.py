import sys
import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#7C7E8C"))
        
        # Header (pages 2+)
        if self._pageNumber > 1:
            self.drawString(54, 750, "CourseAdvisor — Prototype Prompt Engineering Specification")
            self.drawRightString(558, 750, "Production Prototype Prompts")
            self.setStrokeColor(colors.HexColor("#EAECF0"))
            self.setLineWidth(0.5)
            self.line(54, 744, 558, 744)

        # Footer (all pages)
        self.setStrokeColor(colors.HexColor("#EAECF0"))
        self.setLineWidth(0.5)
        self.line(54, 45, 558, 45)
        
        self.drawString(54, 32, "CourseAdvisor • IIT Madras Case Study • Built with Groww Theme")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(558, 32, page_str)
        self.restoreState()

def build_pdf(filename="CourseAdvisor_Structured_Prompts.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()
    
    # Custom Styles
    brand_teal = colors.HexColor("#00D09C")
    dark_text = colors.HexColor("#1E222B")
    muted_text = colors.HexColor("#5B6275")
    bg_box = colors.HexColor("#F8FAFB")
    border_color = colors.HexColor("#EAECF0")
    accent_blue = colors.HexColor("#5367FF")

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=dark_text,
        spaceAfter=4
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=muted_text,
        spaceAfter=12
    )

    h1_style = ParagraphStyle(
        'Heading1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=colors.HexColor("#007054"),
        spaceBefore=12,
        spaceAfter=6
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=dark_text,
        spaceAfter=6
    )

    prompt_label_style = ParagraphStyle(
        'PromptLabel',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=accent_blue,
        spaceAfter=4
    )

    prompt_text_style = ParagraphStyle(
        'PromptText',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=12.5,
        textColor=colors.HexColor("#2D3139")
    )

    meta_label = ParagraphStyle(
        'MetaLabel',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11,
        textColor=dark_text
    )

    meta_val = ParagraphStyle(
        'MetaVal',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=muted_text
    )

    story = []

    # Title Block
    story.append(Paragraph("CourseAdvisor — Structured Prompt Engineering Playbook", title_style))
    story.append(Paragraph("Comprehensive prompt sequence, architectural constraints, and evaluation criteria used to create the interactive CourseAdvisor web prototype.", subtitle_style))

    # Meta Table
    meta_data = [
        [
            Paragraph("<b>Author:</b> Rohan Siva Teja (IIT Madras)", meta_label),
            Paragraph("<b>Target Stack:</b> React 18, Tailwind CSS, Vite, Lucide Icons", meta_label)
        ],
        [
            Paragraph("<b>Design System:</b> Groww Signature (#00D09C, #1E222B, #EAECF0)", meta_val),
            Paragraph("<b>Repo:</b> https://github.com/rohan2147483648/course-advisor", meta_val)
        ]
    ]
    t_meta = Table(meta_data, colWidths=[250, 254])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#E8FAF5")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#A7F0DC")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#D1F5EC")),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 12))

    # Introduction
    intro_p = ("The following 6-prompt structured progression represents the exact, reproducible prompt "
               "sequence formulated to build, refine, brand, and evaluate <b>CourseAdvisor</b>. Each prompt "
               "is scoped with explicit inputs, system constraints, behavioral rules, and verifiable acceptance criteria.")
    story.append(Paragraph(intro_p, body_style))
    story.append(Spacer(1, 8))

    prompts = [
        {
            "phase": "Prompt 1: Product Foundation, Design Tokens & Core Navigation",
            "goal": "Establish the single-page application foundation with high-contrast, modern consumer SaaS aesthetics using Groww brand guidelines.",
            "prompt": (
                "\"Act as a Principal Product Architect. Build the core React application for 'CourseAdvisor'—a campus-specific "
                "academic intelligence platform designed for university students choosing electives and searching for exam prep materials.\n\n"
                "Design Requirements:\n"
                "• Strict Groww Brand Palette: Canvas (#FAFAFA / #F8FAFB), Cards (#FFFFFF), Primary Action (#00D09C Teal), Accent (#5367FF Blue), Primary Text (#1E222B), Borders (#EAECF0), and Soft Tint (#E8FAF5).\n"
                "• Visual Standard: Linear/Raycast modern consumer SaaS aesthetic (NOT a generic academic portal).\n"
                "• Typography & Whitespace: Generous spacing, crisp contrast, scannable cards, and completely clean navigation.\n"
                "• Layout: Top header with CourseAdvisor brand and centered two-tab navigation: 'Elective Explorer' and 'Exam Resources', plus a primary '+ Share a Tip' button.\n"
                "• No artificial emojis in dropdowns or metric badges; use semantic icons from lucide-react.\""
            ),
            "output": "Clean single-page scaffold, Tailwind theme config, dynamic tabs, and Groww visual design system."
        },
        {
            "phase": "Prompt 2: Elective Intelligence Engine & Professor-Drift Detection",
            "goal": "Eliminate campus WhatsApp guesswork by sorting electives by multi-factor student criteria and alerting when instructors rotate.",
            "prompt": (
                "\"Develop the 'Elective Explorer' module for CourseAdvisor with rich pre-seeded campus courses.\n\n"
                "Functional Specifications:\n"
                "1. Multi-Factor Filtering & Sorting: Search bar by course code/title/instructor, sort dropdown ('Most Recommended', 'Easiest Grading', 'Lowest Workload', 'Highest Placement Value'), and quick filter pills ('Easy A', 'Chill Attendance', 'No Endsem / Project-Based', 'Core Heavy').\n"
                "2. Elective Cards: Display Course Code, Title, Current Instructor with tenure ('Since Fall 2024'), recommendation %, visual Grading Leniency bar (1-5), Workload badge (Low/Med/High), Attendance strictness, Placement value score, and a senior consensus quote.\n"
                "3. Faculty Drift Warning: Automatically detect if older reviews in the database belong to a previous instructor (e.g., Prof. Raman vs. current Prof. Sen). Render an amber warning pill ('Prof Changed — Verify Syllabus') on affected cards and in the detail review drawer.\""
            ),
            "output": "ElectiveExplorer.jsx and ElectiveDetailModal.jsx with 6 realistic courses and live syllabus-drift alerts."
        },
        {
            "phase": "Prompt 3: Exam Triage Mode & Strict Time-Budget Isolation",
            "goal": "Provide time-pressured students with high-yield cram resources strictly filtered by available study hours.",
            "prompt": (
                "\"Implement the 'Exam Resources' triage module. Students preparing the night before an exam have varying time windows and need high-yield notes, not 40-hour lecture dumps.\n\n"
                "Functional Specifications:\n"
                "1. 3-Part Control Bar: (1) Select Course -> (2) Select Exam Type (Quiz 1 / Midsem / Endsem / ALL) -> (3) Select Available Study Time ('< 1 hr', '2–4 hrs', 'Weekend / Comprehensive').\n"
                "2. Strict Time-Budget Filter: When '< 1 hr' is selected, strictly isolate formula sheets, 1-pagers, and high-yield questions under 60 minutes. Long video series and bulky archives must be strictly excluded.\n"
                "3. Resource Cards: Display Course Code, Exam Phase, Resource Format (Drive Notes / PYQ Sheet / YouTube), clean time badge ('35 mins', '2 hrs'), Title, Senior Tip Quote, 1-tap 'Verified by X students' toggle, and an external 'Open Resource' CTA.\n"
                "4. Broken Link Flagging: Subtle 'Flag Dead Link' button that marks broken URLs and excludes them from active views.\""
            ),
            "output": "ExamTriage.jsx with 17 curated resources and strict time-budget filtering."
        },
        {
            "phase": "Prompt 4: Single-Box Natural Language Submission & Duplicate Protection",
            "goal": "Allow students to contribute exam tips in under 10 seconds without filling cumbersome multi-field forms.",
            "prompt": (
                "\"Create the '+ Share a Tip' submission flow powered by a single natural-language input box.\n\n"
                "Requirements:\n"
                "1. Input: A single textarea with placeholder: 'e.g. For ME3100 Midsem under Prof Rao, skip the textbook—just solve Tut Sheets 2-4, takes 2 hours max and 3 questions came directly from it.' Optional link URL field.\n"
                "2. Smart NLP Parser: Extract Course Code (e.g., ME3100), Instructor (Prof. Rao), Exam Type (Midsem), Time Estimate (120 mins -> '2-4 hrs'), and Resource Format.\n"
                "3. Duplicate Collision Engine: Compare parsed data against existing resources. If an identical URL or highly similar title/notes exists, trigger an amber warning pill: 'Possible Duplicate Detected' showing the existing match.\n"
                "4. Success Celebration: Upon publishing, display a clean confirmation modal with a live preview card and 1-click button to 'View in Exam Resources'.\""
            ),
            "output": "SubmissionModal.jsx, smartParser.js, regex/NLP extraction, and instant duplication detection."
        },
        {
            "phase": "Prompt 5: Grab-and-Leave Feedback Loop & 1-Vote-per-Student Integrity",
            "goal": "Close the campus feedback loop by asking students if saved resources actually helped, while preventing vote spam.",
            "prompt": (
                "\"Build an unobtrusive post-exam verification feedback loop for CourseAdvisor.\n\n"
                "Specifications:\n"
                "1. Grab-and-Leave Tracker: When a student opens any resource link, save its ID to localStorage.\n"
                "2. Re-engagement Banner: On subsequent visits (or via a footer 'Simulate Return Visit' toggle for evaluators), render a high-contrast top toast in Groww Teal: 'Quick Check from your last study session — did [Resource Title] help for your exam?' with 1-tap buttons: '[Yes, Saved Me!]' and '[Not Useful]'.\n"
                "3. Outcome Verification Signal: Maintain an array of verified resource IDs in localStorage. Clicking 'Verified by X students' increments the count by exactly 1 and highlights the tile; clicking again removes the vote. Strictly disallow repeated clicking to artificially inflate numbers.\""
            ),
            "output": "FeedbackBanner.jsx, userVerifiedIds state sync, and 1-vote toggle persistence."
        },
        {
            "phase": "Prompt 6: Automated 11-Test Evaluation Harness & Production Delivery",
            "goal": "Verify all acceptance criteria through automated testing and package for zero-config cloud deployment.",
            "prompt": (
                "\"Construct a comprehensive automated test runner and interactive evaluation drawer covering 11 critical test scenarios:\n"
                "• Tests 1-3 (NLP Extraction): Verify parsing of informal student slang, time-normalization, and bulky media classification.\n"
                "• Tests 4-5 (Time-Budget Isolation): Assert '< 1 hr' query returns exactly 0 leaked weekend video resources.\n"
                "• Tests 6-7 (Drift Protection): Validate faculty transition alerts on older reviews across all seed courses.\n"
                "• Tests 8-11 (Duplicates & Broken Links): Verify exact URL collision, semantic duplicate matching, and dead link flags.\n\n"
                "Deliverable: Run via headless Node.js ('node test-runner.js') and via an in-browser modal. Compile clean production bundle with Vite and deploy to Vercel.\""
            ),
            "output": "evalSuite.js, test-runner.js (11/11 passing), and clean GitHub/Vercel production build."
        }
    ]

    for p in prompts:
        flowables = []
        flowables.append(Paragraph(p["phase"], h1_style))
        flowables.append(Paragraph(f"<b>Objective:</b> {p['goal']}", body_style))
        
        # Shaded Box for Prompt Text
        p_table = Table(
            [[Paragraph(f"<b>EXECUTED PROMPT SPECIFICATION:</b><br/>{p['prompt'].replace(chr(10), '<br/>')}", prompt_text_style)]],
            colWidths=[504]
        )
        p_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F8FAFB")),
            ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#CCD4FF")),
            ('LINELEFT', (0,0), (0,0), 3.5, accent_blue),
            ('PADDING', (0,0), (-1,-1), 8),
        ]))
        flowables.append(p_table)
        flowables.append(Spacer(1, 4))
        flowables.append(Paragraph(f"<b>Delivered Output & Artifact:</b> {p['output']}", meta_label))
        flowables.append(Spacer(1, 10))
        
        story.append(KeepTogether(flowables))

    # Summary Table of Results
    story.append(Spacer(1, 6))
    story.append(Paragraph("Prototype Verification & Test Summary", h1_style))
    summary_data = [
        [Paragraph("<b>Evaluation Dimension</b>", meta_label), Paragraph("<b>Target Criteria</b>", meta_label), Paragraph("<b>Verification Status</b>", meta_label)],
        [Paragraph("Design System", meta_val), Paragraph("Groww Teal (#00D09C), high-contrast, zero clutter", meta_val), Paragraph("<font color='#009E77'><b>100% Implemented</b></font>", meta_val)],
        [Paragraph("Time Isolation", meta_val), Paragraph("Zero leaked weekend lectures in '< 1 hr' filter", meta_val), Paragraph("<font color='#009E77'><b>PASS (Test 4 & 5)</b></font>", meta_val)],
        [Paragraph("Syllabus Drift", meta_val), Paragraph("Automatic warning when instructor has rotated", meta_val), Paragraph("<font color='#009E77'><b>PASS (Test 6 & 7)</b></font>", meta_val)],
        [Paragraph("Duplicate Check", meta_val), Paragraph("URL collision & semantic title matching", meta_val), Paragraph("<font color='#009E77'><b>PASS (Test 8 & 9)</b></font>", meta_val)],
        [Paragraph("Vote Integrity", meta_val), Paragraph("1 vote per student toggle (+1 increment)", meta_val), Paragraph("<font color='#009E77'><b>PASS (Verified)</b></font>", meta_val)],
        [Paragraph("Live Test Suite", meta_val), Paragraph("11 automated unit & integration tests", meta_val), Paragraph("<font color='#009E77'><b>11 / 11 PASSING</b></font>", meta_val)]
    ]
    t_summary = Table(summary_data, colWidths=[130, 250, 124])
    t_summary.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#E8FAF5")),
        ('BOX', (0,0), (-1,-1), 1, border_color),
        ('INNERGRID', (0,0), (-1,-1), 0.5, border_color),
        ('PADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t_summary)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated {filename}")

if __name__ == "__main__":
    build_pdf()
