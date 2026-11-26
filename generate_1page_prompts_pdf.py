import sys
import shutil
import re
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.pdfgen import canvas
import fitz

class SinglePageCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.page_count = 0

    def showPage(self):
        self.page_count += 1
        super().showPage()

def build_pdf(filename="CourseAdvisor_Prompts_1Page.pdf"):
    # Target: Fully spread across the entire page (Top: ~36pt, Bottom: ~755pt of 792pt)
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=38,
        rightMargin=38,
        topMargin=34,
        bottomMargin=28
    )

    styles = getSampleStyleSheet()

    teal_dark = colors.HexColor("#007054")     # Deep readable teal
    teal_brand = colors.HexColor("#00D09C")    # Groww Teal
    dark_text = colors.HexColor("#1E222B")
    body_text = colors.HexColor("#2C303B")
    box_bg = colors.HexColor("#F8FAFB")
    box_border = colors.HexColor("#D8DEE9")
    line_accent = colors.HexColor("#00D09C")   # Groww teal border accent

    # Centered Header Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=21,
        leading=25,
        textColor=dark_text,
        alignment=1, # Centered
        spaceAfter=6
    )

    links_style = ParagraphStyle(
        'LinksSub',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14.5,
        textColor=colors.HexColor("#4B5563"),
        alignment=1, # Centered
        spaceAfter=14
    )

    prompt_title_style = ParagraphStyle(
        'PromptTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=teal_dark,
        spaceAfter=5
    )

    prompt_body_style = ParagraphStyle(
        'PromptBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.2,
        leading=13.5,
        textColor=body_text
    )

    footer_style = ParagraphStyle(
        'FooterNote',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.3,
        leading=12,
        textColor=colors.HexColor("#6B7280"),
        alignment=1 # Centered
    )

    story = []

    # 1. Centered Main Title
    story.append(Paragraph("<b>CourseAdvisor</b> — Prototype Build Prompts", title_style))

    # 2. Centered Links (Author completely removed)
    links_html = (
        "<b>Live Prototype:</b> <font color='#007054'><u>https://course-advisor.vercel.app</u></font>"
        " &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp; "
        "<b>GitHub:</b> <font color='#007054'><u>https://github.com/rohan2147483648/course-advisor</u></font>"
    )
    story.append(Paragraph(links_html, links_style))

    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#EAECF0"), spaceBefore=0, spaceAfter=13))

    # 5 Structured Prompts with natural wording
    prompts = [
        (
            "1. App Foundation & Groww Design System",
            "\"Build the frontend for CourseAdvisor—a clean web app helping college students pick electives and find exam resources without WhatsApp chaos. Use Groww's visual style: white cards, light canvas (#F8FAFB), signature teal (#00D09C) for primary buttons, and indigo (#5367FF) for accents. Give it a Linear/Raycast modern SaaS look with generous whitespace and centered tabs ('Elective Explorer' and 'Exam Resources'). Remove all artificial emojis from badges and dropdowns; use clean, simple student terminology.\""
        ),
        (
            "2. Elective Explorer & Syllabus-Drift Protection",
            "\"Build the Elective Explorer tab with multi-factor sorting (grading leniency 1-5, workload, attendance strictness, placement value) and filters ('Easy A', 'Chill Attendance', 'Project-Based', 'Core Heavy'). Add seed courses like CS4061 and ME3100. Most importantly, solve professor rotation: if historical reviews belong to a previous teacher (e.g. Prof. Raman vs current Prof. Sen), display an amber alert ('Prof Changed — Verify Syllabus') on the card and in the review drawer so juniors don't prep off obsolete advice.\""
        ),
        (
            "3. Exam Resources Triage & Strict Time Budgeting",
            "\"Create the Exam Resources triage view with a 3-part selector: Course, Exam Type (Quiz 1 / Midsem / Endsem), and Available Study Time ('< 1 hr', '2–4 hrs', 'Full Weekend'). Make the time filter strict: selecting '< 1 hr' must only show 1-pagers, formula sheets, and high-yield questions under 60 minutes, strictly hiding bulky multi-hour lecture series. On each card, display the title, senior tip quote, a 1-tap 'Verified by X students' counter, an 'Open Resource' button, and a 'Flag Dead Link' button.\""
        ),
        (
            "4. 10-Second Note Submission & Duplicate Detection",
            "\"Add a '+ Share a Tip' modal with a single text box where students can write in plain everyday language (e.g., 'For ME3100 Midsem under Prof Rao, skip the textbook—just solve Tut Sheets 2-4, takes 2 hours max and 3 questions came directly from it'). Automatically parse the course code, professor, exam phase, and study duration. Cross-check against existing entries to detect exact URL collisions or duplicate topics, and show a success confirmation card with a direct 'View in Exam Resources' button.\""
        ),
        (
            "5. Post-Exam Feedback Loop & 1-Vote Integrity",
            "\"Implement an outcome verification loop. When a student opens any study link, store it in localStorage. When they return (or when clicking 'Simulate Return Visit'), show a friendly top banner: 'Did [Resource Title] help for your exam?' with 1-tap 'Yes, Saved Me!' and 'Not Useful' buttons. In the resources list, make 'Verified by X students' clickable: clicking it must visibly increase the total count by exactly 1 and highlight the badge in teal, while clicking again toggles it off. Disallow repeated inflation.\""
        )
    ]

    for title, text in prompts:
        story.append(Paragraph(title, prompt_title_style))
        
        box_table = Table(
            [[Paragraph(text, prompt_body_style)]],
            colWidths=[536]
        )
        box_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), box_bg),
            ('BOX', (0,0), (-1,-1), 0.75, box_border),
            ('LINELEFT', (0,0), (0,0), 3.5, line_accent),
            ('TOPPADDING', (0,0), (-1,-1), 9.5),
            ('BOTTOMPADDING', (0,0), (-1,-1), 9.5),
            ('LEFTPADDING', (0,0), (-1,-1), 11),
            ('RIGHTPADDING', (0,0), (-1,-1), 11),
        ]))
        story.append(box_table)
        story.append(Spacer(1, 15))

    # Bottom footer rule and note
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=0.75, color=colors.HexColor("#EAECF0"), spaceBefore=2, spaceAfter=6))
    story.append(Paragraph(
        "<b>Verification Note:</b> All 5 prompt modules are live, fully functional, and pass all 11 automated test scenarios (node test-runner.js). Open the live prototype link above to interact directly without backend authentication.",
        footer_style
    ))

    # Build and check
    test_canvas = SinglePageCanvas
    doc.build(story, canvasmaker=test_canvas)
    print(f"Generated {filename}")

    # Copy to standard filename as well
    shutil.copyfile(filename, "CourseAdvisor_Prompts.pdf")
    print("Also updated CourseAdvisor_Prompts.pdf")

    # Verify fitz page count & bounds
    doc_fitz = fitz.open(filename)
    page_count = len(doc_fitz)
    page = doc_fitz[0]
    rects = page.get_text('blocks')
    top_y = min(b[1] for b in rects)
    bottom_y = max(b[3] for b in rects)
    print(f"Result: {page_count} page(s) | Top: {top_y:.1f}pt | Bottom: {bottom_y:.1f}pt (Page Height: {page.rect.height}pt)")

if __name__ == "__main__":
    build_pdf()
