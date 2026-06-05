#!/usr/bin/env python3
"""Convert a school's original.pdf into numbered PNG images.

This helper intentionally does not update JSON. After converting, run
`npm run sync:materials` and then `npm run sync:materials:write`.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Convert assets/archive/{city}/{school}/original.pdf to 01.png, 02.png, ..."
    )
    parser.add_argument("--city", required=True, help="City slug, e.g. atsugi")
    parser.add_argument("--school", required=True, help="School slug, e.g. echi-es")
    parser.add_argument("--dpi", type=int, default=180, help="Rendering DPI. Default: 180")
    parser.add_argument(
        "--overwrite",
        action="store_true",
        help="Overwrite existing numbered PNG files.",
    )
    return parser.parse_args()


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def validate_slug(value: str, label: str) -> None:
    allowed = set("abcdefghijklmnopqrstuvwxyz0123456789-")
    if not value or any(ch not in allowed for ch in value):
        raise SystemExit(f"ERROR: {label} must contain only lowercase letters, numbers, and hyphens: {value}")


def main() -> int:
    args = parse_args()
    validate_slug(args.city, "--city")
    validate_slug(args.school, "--school")
    if args.dpi <= 0:
        raise SystemExit("ERROR: --dpi must be a positive integer.")

    target_dir = repo_root() / "assets" / "archive" / args.city / args.school
    pdf_path = target_dir / "original.pdf"

    if not target_dir.exists():
        raise SystemExit(f"ERROR: target folder does not exist: {target_dir}")
    if not pdf_path.exists():
        raise SystemExit(f"ERROR: original.pdf was not found: {pdf_path}")

    try:
        import fitz  # PyMuPDF
    except ImportError as exc:
        raise SystemExit(
            "ERROR: PyMuPDF is required. Install it with `python -m pip install pymupdf`."
        ) from exc

    with fitz.open(pdf_path) as document:
        if document.page_count == 0:
            raise SystemExit(f"ERROR: PDF has no pages: {pdf_path}")

        output_paths = [
            target_dir / f"{index + 1:02d}.png"
            for index in range(document.page_count)
        ]
        existing = [path for path in output_paths if path.exists()]
        if existing and not args.overwrite:
            listed = "\n".join(f"  - {path}" for path in existing)
            raise SystemExit(
                "ERROR: output PNG already exists. Re-run with --overwrite to replace it.\n"
                f"{listed}"
            )

        zoom = args.dpi / 72
        matrix = fitz.Matrix(zoom, zoom)
        for index, page in enumerate(document):
            output_path = output_paths[index]
            pixmap = page.get_pixmap(matrix=matrix, alpha=False)
            pixmap.save(output_path)
            print(f"WROTE {output_path.relative_to(repo_root())}")

    print(f"Converted {pdf_path.relative_to(repo_root())} at {args.dpi} dpi.")
    print("Next: npm run sync:materials && npm run sync:materials:write && npm run generate:all")
    return 0


if __name__ == "__main__":
    sys.exit(main())
