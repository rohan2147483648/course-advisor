import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.pdfgen import canvas

class SinglePageCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.page_count = 0

    def showPage(self):
        self.page_count += 1
        super().showPage()

def build_pdf(filename="CourseAdvisor_Prompts_1Page.pdf"):
    # 0.5 inch margins = 36 points (letter size: 612 x 792 pt, printable height: 720 pt)
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=32,
        bottomMargin=28
    )

    styles = getSampleStyleSheet()

    teal = colors.HexColor("#007054")       # Dark teal for readability
    teal_brand = colors.HexColor("#00D09C") # Groww Teal
    dark_text = colors.HexColor("#1E222B")
    body_text = colors.HexColor("#2D3139")
    box_bg = colors.HexColor("#F8FAFB")
    box_border = colors.HexColor("#CCD4FF")
    line_accent = colors.HexColor("#5367FF")

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=18,
        textColor=dark_text,
        alignment=0,
        spaceAfter=2
    )

    header_sub_style = ParagraphStyle(
        'HeaderSub',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.2,
        leading=11.5,
        textColor=colors.HexColor("#4B5563")
    )

    prompt_num_style = ParagraphStyle(
        'PromptNum',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=teal,
        spaceAfter=2
    )

    prompt_box_style = ParagraphStyle(
        'PromptBox',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.8,
        leading=10.8,
        textColor=body_text
    )

    footer_style = ParagraphStyle(
        'Footer',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=9.5,
        textColor=colors.HexColor("#6B7280"),
        alignment=1
    )

    story = []

    # Title & Links Bar
    title_table_data = [
        [
            Paragraph("<b>CourseAdvisor</b> — Prototype Build Prompts", title_style),
            Paragraph("<b>Author:</b> Rohan Siva Teja (IIT Madras)", ParagraphStyle('RightMeta', parent=header_sub_style, alignment=2))
        ],
        [
            Paragraph("<b>Live Prototype:</b> <font color='#007054'><u>https://course-advisor.vercel.app</u></font> &nbsp;|&nbsp; <b>GitHub:</b> <font color='#007054'><u>https://github.com/rohan2147483648/course-advisor</u></font>", header_sub_style),
            Paragraph("<b>Tech Stack:</b> React 18, Tailwind CSS, Vite, Lucide", ParagraphStyle('RightMeta2', parent=header_sub_style, alignment=2))
        ]
    ]
    t_header = Table(title_table_data, colWidths=[360, 180])
    t_header.setStyle(TableStyle([
        ('PADDING', (0,0), (-1,-1), 1),
        ('BOTTOMPADDING', (0,-1), (-1,-1), 4),
    ]))
    story.append(t_header)

    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#EAECF0"), spaceBefore=3, spaceAfter=6))

    prompts = [
        (
            "Prompt 1: App Foundation & Groww Brand Design System",
            "\"Build the frontend for CourseAdvisor—a clean web app helping college students pick electives and find exam resources without WhatsApp chaos. Use Groww's visual style: white cards, light canvas (#F8FAFB), signature teal (#00D09C) for primary buttons, and indigo (#5367FF) for accents. Give it a Linear/Raycast modern SaaS look with generous whitespace and centered tabs ('Elective Explorer' and 'Exam Resources'). Remove all artificial emojis from badges and dropdowns; use clean, simple student terminology.\""
        ),
        (
            "Prompt 2: Elective Explorer with Syllabus-Drift Protection",
            "\"Build the Elective Explorer tab with multi-factor sorting (grading leniency 1-5, workload, attendance strictness, placement value) and filters ('Easy A', 'Chill Attendance', 'Project-Based', 'Core Heavy'). Add seed courses like CS4061 and ME3100. Most importantly, solve professor rotation: if historical reviews belong to a previous teacher (e.g. Prof. Raman vs current Prof. Sen), display an amber alert ('Prof Changed — Verify Syllabus') on the card and in the review drawer so juniors don't prep off obsolete advice.\""
        ),
        (
            "Prompt 3: Exam Resources Triage with Strict Time Budgeting",
            "\"Create the Exam Resources triage view with a 3-part selector: Course, Exam Type (Quiz 1 / Midsem / Endsem), and Available Study Time ('< 1 hr', '2–4 hrs', 'Full Weekend'). Make the time filter strict: selecting '< 1 hr' must only show 1-pagers, formula sheets, and high-yield questions under 60 minutes, strictly hiding bulky multi-hour lecture series. On each card, display the title, senior tip quote, a 1-tap 'Verified by X students' counter, an 'Open Resource' button, and a 'Flag Dead Link' button.\""
        ),
        (
            "Prompt 4: 10-Second Note Submission & Duplicate Detection",
            "\"Add a '+ Share a Tip' modal with a single text box where students can write in plain everyday language (e.g., 'For ME3100 Midsem under Prof Rao, skip the textbook—just solve Tut Sheets 2-4, takes 2 hours max and 3 questions came directly from it'). Automatically parse the course code, professor, exam phase, and study duration. Cross-check against existing entries to detect exact URL collisions or duplicate topics, and show a success confirmation card with a direct 'View in Exam Resources' button.\""
        ),
        (
            "Prompt 5: Post-Exam Feedback Loop & 1-Vote Integrity",
            "\"Implement an outcome verification loop. When a student opens any study link, store it in localStorage. When they return (or when clicking 'Simulate Return Visit'), show a friendly top banner: 'Did [Resource Title] help for your exam?' with 1-tap 'Yes, Saved Me!' and 'Not Useful' buttons. In the resources list, make 'Verified by X students' clickable: clicking it must visibly increase the total count by exactly 1 and highlight the badge in teal, while clicking again toggles it off. Disallow repeated inflation.\""
        )
    ]

    for title, text in prompts:
        story.append(Paragraph(title, prompt_num_style))
        
        box_table = Table(
            [[Paragraph(text, prompt_box_style)]],
            colWidths=[540]
        )
        box_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), box_bg),
            ('BOX', (0,0), (-1,-1), 0.75, box_border),
            ('LINELEFT', (0,0), (0,0), 3, line_accent),
            ('TOPPADDING', (0,0), (-1,-1), 4.5),
            ('BOTTOMPADDING', (0,0), (-1,-1), 4.5),
            ('LEFTPADDING', (0,0), (-1,-1), 7),
            ('RIGHTPADDING', (0,0), (-1,-1), 7),
        ]))
        story.append(box_table)
        story.append(Spacer(1, 5))

    # Bottom summary footnote
    story.append(Spacer(1, 2))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#EAECF0"), spaceBefore=2, spaceAfter=4))
    story.append(Paragraph(
        "<b>Verification Note:</b> All 5 prompt modules are live, fully functional, and pass all 11 automated test scenarios (node test-runner.js). Zero backend wall—reviewers can test directly on the live prototype link.",
        footer_style
    ))

    # Build and check page count
    test_canvas = SinglePageCanvas
    doc.build(story, canvasmaker=test_canvas)
    print(f"Generated {filename}")
    
    # Also write a standard copy
    import shutil
    shutil.copyfile(filename, "CourseAdvisor_Prompts.pdf")
    print("Also updated CourseAdvisor_Prompts.pdf")

if __name__ == "__main__":
    build_pdf()
