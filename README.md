# sasidhar.co.in

Personal website and portfolio for Sasidhar Chintapalli — hosted on GitHub Pages.

## Structure

```
├── index.html                        # Single-page site (Hero, Projects, Blog)
├── Sasidhar_Chintapalli_Resume.docx  # Resume source (edit this)
├── Sasidhar_Chintapalli_Resume.pdf   # Resume the site links to (generated)
├── scripts/build_resume_pdf.py       # Regenerates the PDF from the .docx
├── favicon.svg                       # Site icon
├── CNAME                             # Custom domain → sasidhar.co.in
├── .gitignore
└── README.md
```

## Sections

- **Hero** — Introduction with links to projects, blog, and resume
- **Projects** — Open-source work on GitHub (pocketsDB, simple_datagen)
- **Blog** — Articles published on [Medium](https://medium.com/@sasidharc)

## Links

- Website: [sasidhar.co.in](https://sasidhar.co.in)
- LinkedIn: [linkedin.com/in/sasich](https://www.linkedin.com/in/sasich)
- GitHub: [github.com/codersasi](https://github.com/codersasi)
- Medium: [medium.com/@sasidharc](https://medium.com/@sasidharc)

## Updating the resume

Edit `Sasidhar_Chintapalli_Resume.docx` in Word, then regenerate the PDF the site serves:

```bash
python3 scripts/build_resume_pdf.py
```

Requires Google Chrome (used headless to print the PDF). Avoid re-saving the .docx from TextEdit — it strips the fonts, section rules and indents.
