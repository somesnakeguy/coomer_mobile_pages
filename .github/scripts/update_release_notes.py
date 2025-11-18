#!/usr/bin/env python3
import re
import os
import sys
import subprocess
from pathlib import Path


def main():
    repo_root = Path(__file__).resolve().parents[2]
    changelog = repo_root / "_includes" / "changelog.md"
    release_notes = repo_root / "_includes" / "release_notes.md"
    apks_dir = repo_root / "assets" / "apks"


    if not changelog.exists():
        print(f"Changelog not found at {changelog}", file=sys.stderr)
        sys.exit(1)

    text = changelog.read_text(encoding="utf-8")

    # Use regex to find the first version entry and all its content until next version
    pattern = r"-\s*\*([\d\.]+)\*\s*:(.*?)(?=\n-\s*\*[\d\.]+\*\s*:|\Z)"
    match = re.search(pattern, text, re.DOTALL)

    if not match:
        print("Could not find top changelog entry to derive version", file=sys.stderr)
        sys.exit(0)

    version = match.group(1).strip()
    content = match.group(2).strip()

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
        link = f"https://github.com/somesnakeguy/coomer_mobile_pages/raw/refs/heads/main/assets/apks/{apk_basename}"
    else:
        apk_basename = f"app-release-{version}.apk"
        header = f"### Release v{version}"
        link = f"https://github.com/somesnakeguy/coomer_mobile_pages/raw/refs/heads/main/assets/apks/{apk_basename}"

    # Extract the main summary (first line) and bullet points
    lines = content.split('\n')
    summary = None
    details = []

    for line in lines:
        line = line.strip()
        if not line:
            continue
        if line.startswith('-'):
            # This is a bullet point
            clean_line = line[1:].strip()
            details.append(clean_line)
        elif summary is None:
            # This is the main summary (first non-bullet, non-empty line)
            summary = line

    # Build release notes content
    parts = []
    if apk_candidates:
        parts.append(header)
        parts.append(f"Download the latest version: ([{apk_basename}]({link}))")
    if summary:
        parts.append("")
        parts.append(summary)
    if details:
        parts.append("")
        parts.extend(details)

    new_content = "\n".join(parts).strip() + "\n"

    old_content = release_notes.read_text(encoding="utf-8") if release_notes.exists() else ""
    if old_content == new_content:
        print("No change required for release notes.")
        return

    release_notes.write_text(new_content, encoding="utf-8")
    print(f"Wrote updated release notes to {release_notes}")

    # Configure git with the token
    github_token = os.environ.get("GITHUB_TOKEN")
    if not github_token:
        print("GITHUB_TOKEN not found in environment", file=sys.stderr)
        sys.exit(1)

    # Get the remote URL and add authentication
    remote_url = subprocess.run(
        ["git", "config", "remote.origin.url"],
        capture_output=True, text=True, check=True
    ).stdout.strip()

    # Add authentication to remote URL
    auth_remote_url = remote_url.replace(
        'https://github.com/',
        f'https://x-access-token:{github_token}@github.com/'
    )

    # Set up git configuration
    subprocess.run(["git", "config", "user.name", "github-actions[bot]"], check=True)
    subprocess.run(["git", "config", "user.email", "41898282+github-actions[bot]@users.noreply.github.com"], check=True)
    
    # Update remote URL with authentication
    subprocess.run(["git", "remote", "set-url", "origin", auth_remote_url], check=True)

    # Add, commit, and push
    subprocess.run(["git", "add", str(release_notes)], check=True)
    commit_msg = f"chore: update release notes to v{version}"
    subprocess.run(["git", "commit", "-m", commit_msg], check=True)

    # Get current branch
    ref = os.environ.get("GITHUB_REF", "refs/heads/main")
    if ref.startswith("refs/heads/"):
        branch = ref.replace("refs/heads/", "")
    else:
        branch = "main"

    # Push using the authenticated remote
    subprocess.run(["git", "push", "origin", f"HEAD:{branch}"], check=True)
    print("Committed and pushed updated release notes.")


if __name__ == "__main__":
    main()