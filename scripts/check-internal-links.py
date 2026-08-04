#!/usr/bin/env python3
"""Check migrated post links that should resolve inside the Hugo site."""

from __future__ import annotations

import re
import sys
import unicodedata
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
POSTS = ROOT / "content" / "posts"
LEGACY_HOSTS = {"coderjournal.com", "www.coderjournal.com", "nickberardi.com", "www.nickberardi.com"}
LINK_RE = re.compile(r"(?<!!)\[[^]]*]\(([^)\s]+)|href\s*=\s*[\"']([^\"']+)", re.IGNORECASE)


def heading_id(heading: str) -> str:
    """Approximate Hugo's default Goldmark auto-heading ID generation."""
    normalized = unicodedata.normalize("NFKD", heading).encode("ascii", "ignore").decode().lower()
    normalized = re.sub(r"[^a-z0-9\s-]", "", normalized)
    return re.sub(r"-+", "-", re.sub(r"\s+", "-", normalized)).strip("-")


def main() -> int:
    slugs = {path.parent.name for path in POSTS.glob("*/index.md")}
    errors: list[str] = []

    for post in sorted(POSTS.glob("*/index.md")):
        content = post.read_text(encoding="utf-8")
        headings = {
            heading_id(match.group(1))
            for match in re.finditer(r"^#{1,6}\s+(.+?)\s*#*\s*$", content, re.MULTILINE)
        }
        for match in LINK_RE.finditer(content):
            target = next(value for value in match.groups() if value).strip("<>")
            parsed = urlsplit(target)

            if not parsed.path and parsed.fragment and parsed.fragment not in headings:
                errors.append(f"{post.relative_to(ROOT)}: missing heading: {target}")
                continue

            if parsed.hostname and parsed.hostname.lower() in LEGACY_HOSTS:
                legacy_parts = set(parsed.path.strip("/").split("/"))
                if legacy_parts & slugs:
                    errors.append(f"{post.relative_to(ROOT)}: legacy internal post URL: {target}")
                continue

            if parsed.path.startswith("/posts/"):
                parts = parsed.path.strip("/").split("/")
                if len(parts) < 2 or parts[1] not in slugs:
                    errors.append(f"{post.relative_to(ROOT)}: missing post: {target}")

            if not parsed.hostname and parsed.path.startswith("/images/") and not (ROOT / "static" / parsed.path.lstrip("/")).is_file():
                errors.append(f"{post.relative_to(ROOT)}: missing image: {target}")

    if errors:
        print("\n".join(errors))
        return 1

    print(f"Checked internal links in {len(slugs)} posts; no broken targets found.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
