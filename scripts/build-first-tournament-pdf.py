#!/usr/bin/env python3
"""Build the six-page, text-only CourtsideView scorekeeper companion.

Usage: python3 build-first-tournament-pdf.py [--output FILE] [--font-dir DIR]
Requires the bundled runtime's reportlab and pypdf. No network or images.
"""
from pathlib import Path
import argparse
import json
from xml.sax.saxutils import escape

from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfdoc import PDFString
from pypdf import PdfReader


TASK_DIR = Path(__file__).resolve().parent
DEFAULT_FONTS = Path('assets/fonts')
PAGE_W, PAGE_H = 960, 540
MARGIN = 64
INK = HexColor('#f3f4ee')
MUTED = HexColor('#aeb7c2')
GREEN = HexColor('#20a66b')
BG = HexColor('#070b10')
GUIDE_URL = 'https://www.courtsideviewapp.com/volleyball-score-keeper#first-tournament'
GUIDE_LABEL = 'www.courtsideviewapp.com/volleyball-score-keeper#first-tournament'
FOOTER = 'CourtsideView • Reviewed October 26, 2026 • Event instructions govern official scoring.'

SLIDES = [
    ('Your first tournament as a volleyball scorekeeper', [
        'A practical family match-day guide.',
        "Official scorer duties follow the event's approved system and training.",
    ]),
    ('Agree on the job', [
        'Family score, player stats or official record? Confirm the role.',
        'Practise point entry, correction, timeout and end-set controls.',
    ]),
    ('Check before first serve', [
        'Correct teams. Event match format. Charged phone.',
        'Visible scoreboard. Tested connection if sharing.',
    ]),
    ('Keep up with the match', [
        'Enter each awarded point. Check the score at pauses.',
        'Wrong team on your latest point? Tap Undo, enter the point for the correct team, then check both scores.',
        'Confirm missed action, timeouts and set endings.',
    ]),
    ('Test the shared view', [
        'Open FanView on a second device.',
        'Browser viewing needs no app installation; viewing and broadcasting require registration.',
        'Live sharing needs internet. Video needs a broadcaster.',
    ]),
    ('Finish carefully', [
        'Confirm the result, conclude the game and update supporters.',
        'FanView links expire 15 minutes after game conclusion.',
        'Full guide:',
    ]),
]


def build(output: Path, font_dir: Path):
    for name, filename in [
        ('Jakarta', 'PlusJakartaSans-Regular.ttf'),
        ('JakartaMedium', 'PlusJakartaSans-Medium.ttf'),
        ('JakartaSemiBold', 'PlusJakartaSans-SemiBold.ttf'),
    ]:
        pdfmetrics.registerFont(TTFont(name, str(font_dir / filename)))

    output.parent.mkdir(parents=True, exist_ok=True)
    doc = canvas.Canvas(str(output), pagesize=(PAGE_W, PAGE_H), pageCompression=1)
    doc.setTitle('Your first tournament as a volleyball scorekeeper')
    doc.setAuthor('CourtsideView')
    doc.setSubject('Six-page companion to the readable CourtsideView family scorekeeper guide')
    doc.setCreator('CourtsideView / ReportLab')
    doc.setKeywords('volleyball, scorekeeper, tournament, family, CourtsideView')
    doc._doc.Catalog.Lang = PDFString('en-US')
    measurements = []

    def paragraph(text, x, top, width, font='Jakarta', size=25, leading=37, color=INK):
        style = ParagraphStyle('copy', fontName=font, fontSize=size, leading=leading,
                               textColor=color, spaceAfter=0, splitLongWords=False)
        p = Paragraph(escape(text), style)
        _, height = p.wrap(width, PAGE_H)
        bottom = top - height
        assert bottom >= 78, f'Content exceeds safe bottom: {text}'
        assert x >= MARGIN and x + width <= PAGE_W - MARGIN
        p.drawOn(doc, x, bottom)
        return bottom, height

    for i, (title, body) in enumerate(SLIDES, start=1):
        doc.setFillColor(BG)
        doc.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
        doc.setFillColor(GREEN)
        doc.setFont('JakartaSemiBold', 15)
        doc.drawString(MARGIN, PAGE_H - 48, 'CourtsideView')
        doc.setFillColor(MUTED)
        doc.setFont('JakartaMedium', 12)
        doc.drawRightString(PAGE_W - MARGIN, PAGE_H - 48, f'{i:02} / 06')

        bookmark = f'slide-{i}'
        doc.bookmarkPage(bookmark)
        doc.addOutlineEntry(title, bookmark, level=0)

        if i == 1:
            title_bottom, title_h = paragraph(title, MARGIN, 422, 810,
                                              font='JakartaSemiBold', size=53, leading=65)
            y = title_bottom - 28
            for line in body:
                y, _ = paragraph(line, MARGIN, y, 810, size=21, leading=30)
                y -= 10
        else:
            title_bottom, title_h = paragraph(title, MARGIN, 422, 832,
                                              font='JakartaSemiBold', size=38, leading=49)
            y = title_bottom - 46
            for line in body:
                y, _ = paragraph(line, MARGIN, y, 800, size=25, leading=37)
                y -= 19

            if i == 6:
                doc.setFillColor(GREEN)
                doc.setFont('JakartaMedium', 16)
                width = pdfmetrics.stringWidth(GUIDE_LABEL, 'JakartaMedium', 16)
                assert width <= 832
                assert y >= 78
                doc.drawString(MARGIN, y, GUIDE_LABEL)
                doc.linkURL(GUIDE_URL, (MARGIN, y - 4, MARGIN + width, y + 20),
                            relative=0, thickness=0)

        doc.setFillColor(MUTED)
        doc.setFont('Jakarta', 10.5)
        assert pdfmetrics.stringWidth(FOOTER, 'Jakarta', 10.5) <= 832
        doc.drawString(MARGIN, 29, FOOTER)
        measurements.append({'page': i, 'title_height': title_h,
                             'content_bottom': y, 'safe_bottom': 78})
        doc.showPage()

    doc.save()
    reader = PdfReader(output)
    assert len(reader.pages) == 6
    extracted = '\n'.join(page.extract_text() or '' for page in reader.pages)
    extracted = ' '.join(extracted.split())
    for title, body in SLIDES:
        assert title in extracted
        for line in body:
            assert line in extracted, f'Missing extracted text: {line}'
    assert GUIDE_LABEL in extracted
    assert len(reader.outline) == 6
    annotations = reader.pages[5].get('/Annots', [])
    assert len(annotations) == 1
    assert annotations[0].get_object()['/A']['/URI'] == GUIDE_URL
    assert output.stat().st_size < 1_000_000
    print(json.dumps({'output': str(output), 'bytes': output.stat().st_size,
                      'pages': 6, 'fonts': 'Plus Jakarta Sans Regular/Medium/Semibold',
                      'selectable_text_checked': True, 'linked_guide_checked': True,
                      'outline_checked': True, 'geometry': measurements}, indent=2))


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--output', type=Path,
                        default=TASK_DIR.parent / 'resources' / 'first-tournament-scorekeeper.pdf')
    parser.add_argument('--font-dir', type=Path, default=DEFAULT_FONTS)
    args = parser.parse_args()
    build(args.output, args.font_dir)
