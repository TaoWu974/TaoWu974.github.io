"""Render original PDF figures with traceable page and crop coordinates."""
import argparse
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "vendor/pdf-tools"))
import pymupdf as fitz

root = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument("--inspect", action="store_true")
parser.add_argument("--render", nargs=2, metavar=("PAPER", "PAGE"))
parser.add_argument("--extract", action="store_true")
args = parser.parse_args()
if args.inspect:
    for path in sorted((root / "tmp/pdfs").glob("*.pdf")):
        doc = fitz.open(path)
        print(f"\n{path.stem}: {len(doc)} pages")
        (path.with_suffix(".txt")).write_text("\n\f\n".join(page.get_text() for page in doc))
        for i, page in enumerate(doc):
            captions = []
            for block in page.get_text("blocks"):
                text = block[4].strip().replace("\n", " ")
                if re.search(r"\b(?:Fig\.|TABLE)\s*\d", text):
                    captions.append({"box": [round(x, 1) for x in block[:4]], "text": text[:280]})
            if captions:
                print(json.dumps({"page": i + 1, "size": list(page.rect), "captions": captions}, ensure_ascii=False))
if args.render:
    name, page_number = args.render
    doc = fitz.open(root / "tmp/pdfs" / f"{name}.pdf")
    doc[int(page_number)-1].get_pixmap(matrix=fitz.Matrix(1.6, 1.6)).save(root / "tmp/pdfs" / f"{name}-{page_number}.png")
if args.extract:
    manifest = json.loads((root / "_data/paper_figures.json").read_text())
    for item in manifest:
        doc = fitz.open(root / "tmp/pdfs" / f"{item['paper']}.pdf")
        page = doc[item['page'] - 1]
        page.get_pixmap(matrix=fitz.Matrix(2.4, 2.4), clip=fitz.Rect(item['crop']), alpha=False).save(root / item['asset'])
        print(item['asset'])
