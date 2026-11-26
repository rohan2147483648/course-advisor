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
    # Target: Fully, evenly spread across the entire 1-page canvas (Top: ~36pt, Bottom: ~745-750pt of 792pt)
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=38,
        rightMargin=38,
        topMargin=36,
        bottomMargin=32
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
        fontSize=22,
        leading=26,
        textColor=dark_text,
        alignment=1, # Centered
        spaceAfter=7
    )

    links_style = ParagraphStyle(
        'LinksSub',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10.5,
        leading=15,
        textColor=colors.HexColor("#4B5563"),
        alignment=1, # Centered
        spaceAfter=16
    )

    prompt_title_style = ParagraphStyle(
        'PromptTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11.6,
        leading=16,
        textColor=teal_dark,
        spaceAfter=6
    )

    prompt_body_style = ParagraphStyle(
        'PromptBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.6,
        leading=14.4,
        textColor=body_text
    )

    story = []

    # 1. Centered Main Title
    story.append(Paragraph("<b>CourseAdvisor</b> — Prototype Build Prompts", title_style))

    # 2. Centered Links
    links_html = (
        "<b>Live Prototype:</b> <font color='#007054'><u>https://course-advisor.vercel.app</u></font>"
        " &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp; "
        "<b>GitHub:</b> <font color='#007054'><u>https://github.com/rohan2147483648/course-advisor</u></font>"
    )
    story.append(Paragraph(links_html, links_style))

    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#EAECF0"), spaceBefore=0, spaceAfter=18))

    # 5 Humanized, simple, understandable prompts explaining what's happening
    prompts = [
        (
            "1. Clean Campus UI & Navigation Setup",
            "\"Build a clean, high-contrast web app for CourseAdvisor using Groww's visual style (white cards, light canvas #F8FAFB, clean teal buttons, and subtle borders). Keep the navigation super simple with two main tabs: 'Elective Explorer' and 'Exam Resources', plus a prominent 'Share a Tip' button. Avoid clunky college portal designs and artificial emojis—make it feel like a polished modern app with generous breathing room.\""
        ),
        (
            "2. Elective Reviews & Professor-Change Alert",
            "\"Create the Elective Explorer tab so students can browse and sort courses by grading leniency, workload, attendance strictness, and placement value. Most importantly, add an automatic warning badge ('Prof Changed — Verify Syllabus') when a senior review comes from an older instructor who no longer teaches the course, so juniors don't get misled by outdated advice.\""
        ),
        (
            "3. Exam Prep Triage by Available Study Time",
            "\"Build an Exam Resources triage tool where students pick their course, exam type (Quiz 1, Midsem, Endsem), and how much time they actually have left to study ('< 1 hr', '2–4 hrs', 'Weekend'). If a student only has under an hour, strictly filter out long lecture playlists and show only quick formula sheets, 1-pagers, and high-yield questions.\""
        ),
        (
            "4. 10-Second Plain-Text Tip Submission",
            "\"Add a simple '+ Share a Tip' modal with just a single text box. Let students type naturally in their own words (e.g., 'For ME3100 Midsem under Prof Rao, skip the textbook and just solve Tutorial Sheets 2 to 4, takes 2 hours max'). Automatically detect the course, professor, and time needed, check if someone already shared that link, and confirm it's published live.\""
        ),
        (
            "5. Helpful-Check Feedback Loop & 1-Vote Counter",
            "\"When a student opens a study resource, remember it. The next time they visit, show a friendly check banner asking: 'Did this resource actually help for your exam?' with quick 'Yes, Saved Me!' and 'Not Useful' buttons. In the resource cards, let students click 'Verified by X students' to add their 1 vote, instantly increasing the count and highlighting the tile in teal.\""
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
            ('TOPPADDING', (0,0), (-1,-1), 12),
            ('BOTTOMPADDING', (0,0), (-1,-1), 12),
            ('LEFTPADDING', (0,0), (-1,-1), 13),
            ('RIGHTPADDING', (0,0), (-1,-1), 13),
        ]))
        story.append(box_table)
        story.append(Spacer(1, 19))

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
