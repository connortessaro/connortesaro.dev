#!/usr/bin/env python3
"""Render resume.md -> resume.html -> Connor_Tessaro_Resume.pdf (headless Chrome)."""

from __future__ import annotations

import html
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "content" / "resume.txt"

# Typeface and body size are env-overridable so a font swap can be swept without
# editing CSS. A different face changes every advance width, so --fs-body has to
# be re-measured per font; RESUME_OUT keeps variants from clobbering the real PDF.
FONT = os.environ.get("RESUME_FONT", '"Helvetica Neue", Helvetica, Arial, sans-serif')
FS_BODY = os.environ.get("RESUME_FS_BODY", "9.9pt")
TRACK_NAME = os.environ.get("RESUME_TRACK_NAME", "-0.011em")
TEXTFIX = os.environ.get("RESUME_TEXTFIX", "")
_out = os.environ.get("RESUME_OUT")
HTML_OUT = ROOT / "artifacts" / "resume.html"
PDF_OUT = ROOT / "public" / "resume.pdf"

CHROME_CANDIDATES = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
]

CSS = """
:root {
  /* Type scale: 18 / 10.5 / 9.5 / 9. Body is the largest size that still holds
     the content to 53 lines -- at 9.6pt a bullet gains a line and the page
     overflows, so 9.5pt is the ceiling, not a guess. */
  --fs-name: 18pt;
  --fs-head: 10.9pt;
  --fs-body: __FS_BODY__;
  --fs-meta: 9pt;
  /* Leading tightens as type grows -- display sizes need less than body. */
  --lh-body: 1.24;
  --lh-head: 1.15;
  --lh-name: 1.1;

  /* Vertical rhythm. One unit, four steps: half / one / two / three.
     Every vertical gap on the page is one of these -- no loose values. */
  --u: 2.5pt;
  --sp-tight: calc(var(--u) * 0.5); /* binds a heading to what follows it */
  --sp-item: var(--u);              /* bullet to bullet */
  --sp-entry: calc(var(--u) * 2);   /* entry to entry inside a section */
  --sp-sect: calc(var(--u) * 3);    /* section to section */

  /* Horizontal + rule detail. Not block rhythm, so deliberately off the --u
     scale: these are optical measurements against a glyph, not gaps. */
  --indent: 10pt;      /* bullet hanging indent; marker hangs on the left edge */
  --gutter: 12pt;      /* min gap before a right-aligned date */
  --rule: 0.5pt;       /* section underline; hairline, type carries the hierarchy */
  --rule-offset: 1pt;  /* baseline of a section head to its rule */
  --marker: 7.5pt;     /* bullet glyph; smaller than body so it guides, not shouts */
  --track-head: 0.085em;  /* caps need tracking to stay readable */
  --track-name: __TRACK_NAME__; /* large bold Helvetica needs the opposite */
}
/* Uniform frame on all four sides. 0.36in is chosen so the measure grows in
   step with --fs-body -- wider type on a wider line keeps the line breaks
   identical, so the size increase costs no vertical space. */
@page { size: letter; margin: 0.36in; }
* { box-sizing: border-box; }
body {
  font-family: __FONT__;
  font-size: var(--fs-body); line-height: var(--lh-body); color: #000; margin: 0;
  -webkit-font-smoothing: antialiased;
  __TEXTFIX__
}

.name {
  font-size: var(--fs-name); line-height: var(--lh-name); font-weight: 700;
  text-align: center; letter-spacing: var(--track-name);
}
.contact { font-size: var(--fs-meta); text-align: center; margin-top: var(--sp-tight); }
/* Links carry a PDF annotation but stay visually plain, so the text an ATS
   extracts is byte-identical to the non-linked version. */
a { color: inherit; text-decoration: none; }

h2 {
  font-size: var(--fs-head); line-height: var(--lh-head); font-weight: 700;
  letter-spacing: var(--track-head);
  margin: var(--sp-sect) 0 var(--sp-tight);
  padding-bottom: var(--rule-offset); border-bottom: var(--rule) solid #000;
}

/* Two-column header rows. .row (Education/Experience) and .proj (Open Source/
   Projects) share one flex mechanism so both left and right edges align. */
.row, .proj { display: flex; justify-content: space-between; gap: var(--gutter); }
.row .r, .proj .r { white-space: nowrap; }
.row .l { font-weight: 700; }
.row.sub .l, .row.sub .r { font-weight: 400; font-style: italic; }
.proj { margin-top: var(--sp-entry); font-weight: 700; }
.proj .stack, .proj .r { font-weight: 400; }
.proj .stack { font-style: italic; }

.line { margin-top: var(--sp-tight); }
.tag { font-style: italic; margin-top: var(--sp-tight); }
.skills b { font-weight: 700; }

ul { margin: var(--sp-tight) 0 0; padding-left: var(--indent); }
li { text-align: left; }
li + li { margin-top: var(--sp-item); }
li::marker { font-size: var(--marker); }

/* A section head owns the block under it, so the first entry hugs the rule
   while sibling entries stay a full --sp-entry apart. */
h2 + .proj { margin-top: var(--sp-tight); }
ul + .row { margin-top: var(--sp-entry); }
"""


def esc(s: str) -> str:
    return html.escape(s, quote=False)


def linkify_contact(line: str) -> str:
    """Wrap email and profile URLs in anchors; visible text is unchanged."""
    parts = []
    for token in line.split(" | "):
        t = esc(token)
        if "@" in token and " " not in token:
            parts.append(f'<a href="mailto:{t}">{t}</a>')
        elif re.match(r"^[\w.-]+\.[a-z]{2,}/", token):
            parts.append(f'<a href="https://{t}">{t}</a>')
        else:
            parts.append(t)
    return " | ".join(parts)


def split_cols(line: str) -> tuple[str, str] | None:
    parts = re.split(r"\s{4,}", line.strip())
    return (parts[0], parts[1]) if len(parts) == 2 else None


def render_project_header(line: str) -> str:
    # "Name | url | stack" or "Name | stack", optionally + 4-space-separated date
    parts = re.split(r"\s{4,}", line.strip())
    bits = [b.strip() for b in parts[0].split(" | ")]
    date = parts[1] if len(parts) > 1 else ""
    name, rest = bits[0], bits[1:]
    if rest and re.match(r"^[\w.-]+\.[a-z]{2,}(?:/[\w.-]*)*$", rest[0]):
        link, stack_txt = rest[0], ", ".join(rest[1:])
        left = f'{esc(name)} | <a href="https://{esc(link)}">{esc(link)}</a>'
    else:
        stack_txt = ", ".join(rest)
        left = esc(name)
    tail = f' <span class="stack">| {esc(stack_txt)}</span>' if stack_txt else ""
    right = f'<span class="r">{esc(date)}</span>' if date else ""
    return f'<div class="proj"><span>{left}{tail}</span>{right}</div>'


def build_html(md: str) -> str:
    lines = [ln.rstrip() for ln in md.splitlines()]
    out: list[str] = []
    out.append(f'<div class="name">{esc(lines[0])}</div>')
    out.append(f'<div class="contact">{linkify_contact(lines[1])}</div>')

    section = ""
    bullets: list[str] = []

    def flush() -> None:
        nonlocal bullets
        if bullets:
            out.append("<ul>" + "".join(f"<li>{esc(b)}</li>" for b in bullets) + "</ul>")
            bullets = []

    for raw in lines[2:]:
        line = raw.strip()
        if not line:
            continue
        if line.isupper() and len(line.split()) <= 2:
            flush()
            section = line
            out.append(f"<h2>{esc(line)}</h2>")
            continue

        if section in ("PROJECTS", "OPEN SOURCE") and " | " in line and not line.endswith("."):
            flush()
            out.append(render_project_header(line))
            continue

        cols = split_cols(line)
        if cols:
            flush()
            # first col-row of a block is bold, the one right after it is italic
            prev_is_row = bool(out) and out[-1].startswith('<div class="row')
            cls = "row sub" if prev_is_row else "row"
            out.append(
                f'<div class="{cls}"><span class="l">{esc(cols[0])}</span>'
                f'<span class="r">{esc(cols[1])}</span></div>'
            )
            continue

        if section in ("SKILLS", "EDUCATION") and re.match(r"^[A-Z][\w &]+: ", line):
            label, _, rest = line.partition(": ")
            out.append(f'<div class="line skills"><b>{esc(label)}:</b> {esc(rest)}</div>')
            continue

        if " | " in line and not line.endswith("."):
            flush()
            out.append(f'<div class="tag">{esc(line)}</div>')
            continue

        bullets.append(line)

    flush()
    body = "\n".join(out)
    return (
        "<!doctype html><html><head><meta charset='utf-8'>"
        f"<title>Connor Tessaro — Resume</title>"
        f"<style>{CSS.replace('__FONT__', FONT).replace('__FS_BODY__', FS_BODY).replace('__TRACK_NAME__', TRACK_NAME).replace('__TEXTFIX__', TEXTFIX)}</style>"
        f"</head><body>{body}</body></html>"
    )


def find_chrome() -> str:
    for c in CHROME_CANDIDATES:
        if Path(c).exists():
            return c
    found = shutil.which("google-chrome") or shutil.which("chromium")
    if not found:
        raise SystemExit("No Chrome/Chromium found; cannot render PDF.")
    return found


def main() -> int:
    HTML_OUT.parent.mkdir(parents=True, exist_ok=True)
    md = SRC.read_text(encoding="utf-8")
    HTML_OUT.write_text(build_html(md), encoding="utf-8")
    subprocess.run(
        [
            find_chrome(),
            "--headless",
            "--disable-gpu",
            "--no-pdf-header-footer",
            f"--print-to-pdf={PDF_OUT}",
            HTML_OUT.as_uri(),
        ],
        check=True,
        capture_output=True,
    )
    print(f"wrote {HTML_OUT.name} and {PDF_OUT.name}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
