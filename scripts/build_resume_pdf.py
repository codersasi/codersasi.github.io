#!/usr/bin/env python3
"""Build Sasidhar_Chintapalli_Resume.pdf from Sasidhar_Chintapalli_Resume.docx.

The .docx stays the editable source; the site links to the PDF. Run this after
every resume edit:

    python3 scripts/build_resume_pdf.py

It renders the docx's paragraphs (spacing, indents, borders, bold/italic,
colour, size, hyperlinks) to HTML, then prints that to PDF with headless
Google Chrome. Standard library only.
"""
import html
import os
import re
import subprocess
import sys
import tempfile
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCX = os.path.join(ROOT, "Sasidhar_Chintapalli_Resume.docx")
PDF = os.path.join(ROOT, "Sasidhar_Chintapalli_Resume.pdf")
CHROME_CANDIDATES = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "google-chrome",
    "chromium",
]

TWIP_PT = 1 / 20  # docx spacing/indent units are twentieths of a point


def attr(xml, tag, name):
    m = re.search(rf"<w:{tag}\b[^>]*\bw:{name}=\"([^\"]+)\"", xml)
    return m.group(1) if m else None


def render_run(run, default_pt):
    rpr = re.search(r"<w:rPr>(.*?)</w:rPr>", run, re.S)
    rpr = rpr.group(1) if rpr else ""
    text = "".join(re.findall(r"<w:t(?:\s[^>]*)?>([^<]*)</w:t>", run))
    if not text:
        return ""
    text = html.escape(html.unescape(text), quote=False).replace("  ", "&nbsp; ")
    style = []
    if re.search(r"<w:b/>", rpr):
        style.append("font-weight:700")
    if re.search(r"<w:i/>", rpr):
        style.append("font-style:italic")
    color = attr(rpr, "color", "val")
    if color and color != "auto":
        style.append(f"color:#{color}")
    size = attr(rpr, "sz", "val")
    if size and int(size) / 2 != default_pt:
        style.append(f"font-size:{int(size) / 2}pt")
    return f'<span style="{";".join(style)}">{text}</span>' if style else text


def render_paragraph(p, rels, default_pt):
    ppr = re.search(r"<w:pPr>(.*?)</w:pPr>", p, re.S)
    ppr = ppr.group(1) if ppr else ""
    style = []
    before, after = attr(ppr, "spacing", "before"), attr(ppr, "spacing", "after")
    style.append(f"margin-top:{int(before or 0) * TWIP_PT}pt")
    style.append(f"margin-bottom:{int(after or 0) * TWIP_PT}pt")
    left, hanging = attr(ppr, "ind", "left"), attr(ppr, "ind", "hanging")
    if left:
        style.append(f"padding-left:{int(left) * TWIP_PT}pt")
    if hanging:
        style.append(f"text-indent:-{int(hanging) * TWIP_PT}pt")
    jc = attr(ppr, "jc", "val")
    if jc in ("both", "center", "right"):
        style.append("text-align:" + {"both": "justify"}.get(jc, jc))
    border = re.search(r"<w:bottom\b[^>]*/>", ppr)
    if border:
        b = border.group(0)
        color = attr(b, "bottom", "color") or "000000"
        space = int(attr(b, "bottom", "space") or 0)
        style.append(f"border-bottom:1px solid #{color};padding-bottom:{space}pt")
        style.append("break-after:avoid")  # keep section headings with their content

    body = []
    # Walk runs and hyperlinks in document order.
    for m in re.finditer(r"<w:hyperlink\b([^>]*)>(.*?)</w:hyperlink>|<w:r\b[^>]*>.*?</w:r>", p, re.S):
        if m.group(1) is not None:
            rid = re.search(r'r:id="([^"]+)"', m.group(1))
            href = rels.get(rid.group(1), "#") if rid else "#"
            inner = "".join(render_run(r, default_pt) for r in re.findall(r"<w:r\b[^>]*>.*?</w:r>", m.group(2), re.S))
            body.append(f'<a href="{html.escape(href)}">{inner}</a>')
        else:
            body.append(render_run(m.group(0), default_pt))
    content = "".join(body) or "&nbsp;"
    return f'<p style="{";".join(style)}">{content}</p>'


def docx_to_html(path):
    with zipfile.ZipFile(path) as z:
        doc = z.read("word/document.xml").decode("utf8")
        styles = z.read("word/styles.xml").decode("utf8")
        rels_xml = z.read("word/_rels/document.xml.rels").decode("utf8")
    rels = dict(re.findall(r'Id="([^"]+)"[^>]*Target="([^"]+)"', rels_xml))
    default_sz = attr(re.search(r"<w:rPrDefault>.*?</w:rPrDefault>", styles, re.S).group(0), "sz", "val")
    default_pt = int(default_sz or 22) / 2

    sect = re.search(r"<w:sectPr\b.*?</w:sectPr>", doc, re.S).group(0)
    margins = {k: int(attr(sect, "pgMar", k)) * TWIP_PT for k in ("top", "right", "bottom", "left")}

    body = re.search(r"<w:body>(.*)</w:body>", doc, re.S).group(1)
    paras = re.findall(r"<w:p\b[^>]*>.*?</w:p>|<w:p\b[^>]*/>", body, re.S)
    rendered = "\n".join(render_paragraph(p, rels, default_pt) for p in paras)

    return f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<title>Sasidhar Chintapalli — Resume</title>
<style>
  @page {{ size: Letter; margin: {margins['top']}pt {margins['right']}pt {margins['bottom']}pt {margins['left']}pt; }}
  body {{ font-family: Arial, Helvetica, sans-serif; font-size: {default_pt}pt; line-height: 1.3; color: #333; margin: 0; }}
  p {{ margin: 0; break-inside: avoid; }}
  a {{ color: #2d6a8f; text-decoration: none; }}
</style></head><body>
{rendered}
</body></html>"""


def find_chrome():
    for c in CHROME_CANDIDATES:
        if os.path.isabs(c) and os.path.exists(c):
            return c
        if not os.path.isabs(c):
            from shutil import which
            if which(c):
                return which(c)
    sys.exit("Google Chrome not found; install it or add its path to CHROME_CANDIDATES.")


def main():
    with tempfile.TemporaryDirectory() as tmp:
        page = os.path.join(tmp, "resume.html")
        with open(page, "w", encoding="utf8") as f:
            f.write(docx_to_html(DOCX))
        subprocess.run(
            [find_chrome(), "--headless", "--disable-gpu", "--no-pdf-header-footer",
             f"--print-to-pdf={PDF}", "file://" + page],
            check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        )
    print(f"Wrote {os.path.relpath(PDF, ROOT)}")


if __name__ == "__main__":
    main()
