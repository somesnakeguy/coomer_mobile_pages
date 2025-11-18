#!/usr/bin/env python3
import re
import os
import sys
import subprocess
from pathlib import Path


def main():
    repo_root = Path(__file__).resolve().parents[3]
    changelog = repo_root / "_includes" / "changelog.md"
    release_notes = repo_root / "_includes" / "release_notes.md"
    apks_dir = repo_root / "assets" / "apks"

    if not changelog.exists():
        print(f"Changelog not found at {changelog}", file=sys.stderr)
        sys.exit(1)

    text = changelog.read_text(encoding="utf-8")
    lines = text.splitlines()

    version = None
    summary = None
    idx = None
    for i, line in enumerate(lines):
        m = re.match(r"^- \*([^*]+)\*:\s*(.+)", line)
        if m:
            version = m.group(1).strip()
            summary = m.group(2).strip()
            idx = i
            break

    if not version:
        print("Could not find top changelog entry to derive version", file=sys.stderr)
        sys.exit(0)

    # gather subsequent detail lines for the top bullet
    details = []
    for j in range(idx + 1, len(lines)):
        if re.match(r"^- \*[^*]+\*:", lines[j]):
            break
        s = lines[j].strip()
        if not s:
            continue
        if s.startswith("-"):
            details.append(s.lstrip("-").strip())
        else:
            details.append(s)

    details_text = "\n".join(details).strip()

    # find apk file that matches this version
    apk_candidates = []
    if apks_dir.exists():
        for p in apks_dir.iterdir():
            if p.is_file() and p.name.startswith(f"app-release-{version}") and p.suffix == ".apk":
                apk_candidates.append(p)

    if apk_candidates:
        # pick the lexicographically last name (or you can change to mtime)
        apk = sorted(apk_candidates, key=lambda p: p.name)[-1]
        apk_basename = apk.name
        version_header = apk_basename.replace("app-release-", "").rsplit(".apk", 1)[0]
        header = f"### Release v{version_header}"
        link = f"/assets/apks/{apk_basename}"
    else:
        apk_basename = f"app-release-{version}.apk"
        header = f"### Release v{version}"
        link = f"/assets/apks/{apk_basename}"

    parts = [header, f"Download the latest version: ([{apk_basename}]({link}))", "", summary]
    if details_text:
        parts += ["", details_text]

    new_content = "\n".join(parts).strip() + "\n"

    old_content = release_notes.read_text(encoding="utf-8") if release_notes.exists() else ""
    if old_content == new_content:
        print("No change required for release notes.")
        return

    release_notes.write_text(new_content, encoding="utf-8")
    print(f"Wrote updated release notes to {release_notes}")

    # commit and push
    try:
        subprocess.run(["git", "config", "user.name", "github-actions[bot]"], check=True)
        subprocess.run(["git", "config", "user.email", "41898282+github-actions[bot]@users.noreply.github.com"], check=True)
        subprocess.run(["git", "add", str(release_notes)], check=True)
        commit_msg = f"chore: update release notes to v{version}"
        subprocess.run(["git", "commit", "-m", commit_msg], check=True)

        ref = os.environ.get("GITHUB_REF", "refs/heads/main")
        if ref.startswith("refs/heads/"):
            branch = ref.replace("refs/heads/", "")
        else:
            branch = "main"

        subprocess.run(["git", "push", "origin", f"HEAD:{branch}"], check=True)
        print("Committed and pushed updated release notes.")
    except subprocess.CalledProcessError as e:
        print("Git commit/push failed:", e, file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
