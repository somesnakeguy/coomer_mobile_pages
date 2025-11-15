<header>

<!--
  <<< Author notes: Course header >>>
  Include a 1280×640 image, course title in sentence case, and a concise description in emphasis.
  In your repository settings: enable template repository, add your 1280×640 social image, auto delete head branches.
  Add your open source license, GitHub uses MIT license.
-->

# GitHub Pages

_Create a site or blog from your GitHub repositories with GitHub Pages._

</header>

<!--
  <<< Author notes: Step 2 >>>
  Start this step by acknowledging the previous step.
  Define terms and link to docs.github.com.
  Historic note: previous version checked for empty pull request, changed to the correct theme `minima`.
-->

## Step 2: Configure your site

_You turned on GitHub Pages! :tada:_

We'll work in a branch, `my-pages`, that I created for you to get this site looking great. :sparkle:

Jekyll uses a file titled `_config.yml` to store settings for your site, your theme, and reusable content like your site title and GitHub handle. You can check out the `_config.yml` file on the **Code** tab of your repository.

We need to use a blog-ready theme. For this activity, we will use a theme named "minima".

### :keyboard: Activity: Configure your site

1. Browse to the `_config.yml` file in the `my-pages` branch.
1. In the upper right corner, open the file editor.
1. Add a `theme:` set to **minima** so it shows in the `_config.yml` file as below:
   ```yml
   theme: minima
   ```
1. (optional) You can modify the other configuration variables such as `title:`, `author:`, and `description:` to further customize your site.
1. Commit your changes.
1. (optional) Create a pull request to view all the changes you'll make throughout this course. Click the **Pull Requests** tab, click **New pull request**, set `base: main` and `compare:my-pages`.
1. Wait about 20 seconds then refresh this page (the one you're following instructions from). [GitHub Actions](https://docs.github.com/en/actions) will automatically update to the next step.

<footer>

<!--
  <<< Author notes: Footer >>>
  Add a link to get support, GitHub status page, code of conduct, license link.
-->

---

Get help: [Post in our discussion board](https://github.com/orgs/skills/discussions/categories/github-pages) &bull; [Review the GitHub status page](https://www.githubstatus.com/)

&copy; 2023 GitHub &bull; [Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md) &bull; [MIT License](https://gh.io/mit)

</footer>

## APK push workflow

- **What it does:** This repository accepts APKs and release notes pushed by your build pipeline in the private source repository. The source repo's workflow should push the `.apk` file into `assets/apks/` and write `_includes/release_notes.md` in this repo (or push both files in a single commit). When that push occurs, the `Process pushed APK and release notes` workflow runs to validate the files and normalize the APK filename to `assets/apks/app-latest.apk` for the site.

- **How to push from the source repo:** On the build completion in your private repo, run a job that checks out this repository (or uses the GitHub API) and creates a commit containing `assets/apks/<your-file>.apk` and `_includes/release_notes.md`. Typical options:
  - Use a personal access token (PAT) with repo access to push directly using git from the source workflow.
  - Or use the GitHub REST API to create/update files in this repo (`PUT /repos/{owner}/{repo}/contents/{path}`) from the source workflow.

- **Where the workflow lives:** `.github/workflows/fetch_apk.yml` — it now runs on pushes to `assets/apks/**` and `_includes/release_notes.md` and can also be run manually for testing.

- **Notes:**
  - The workflow no longer fetches releases from the source repo; instead the source repo should push the built APK and release notes to this repository on build success.
  - If you prefer the source repo to open a pull request instead of pushing directly, update the source workflow to create a branch and open a PR; this repo can then use branch protection and review flows before merging.

### Example: push from the source repository (recommended)

Below is a ready-to-use snippet you can add to your private/source repository's workflow after the APK build step. It clones this site repository (the destination), copies the built APK and release notes into the appropriate paths, commits, and pushes the changes back to the destination repo.

Important: create a repository secret in the source repo named `DEST_REPO_TOKEN` containing a Personal Access Token (PAT) that has `repo` scope for the destination repository (or a token scoped to allow file updates). Also set `DEST_REPO` to the destination repo path `owner/destination-repo` and `DEST_BRANCH` to the branch you want to push to (e.g., `main`).

```yaml
# Example job to push APK + release notes to this site repo
push-apk-to-site:
  runs-on: ubuntu-latest
  needs: build # run after your build job
  steps:
    - name: Checkout source repo (optional)
      uses: actions/checkout@v4

    - name: Prepare destination repo
      env:
        DEST_REPO: your-org/coomer_mobile_pages
        DEST_BRANCH: main
        DEST_TOKEN: ${{ secrets.DEST_REPO_TOKEN }}
      run: |
        set -eux
        git config --global user.email "actions@github.com"
        git config --global user.name "GitHub Actions"
        rm -rf tmprepo || true
        git clone --depth 1 "https://x-access-token:${DEST_TOKEN}@github.com/${DEST_REPO}.git" tmprepo

    - name: Copy APK and release notes
      run: |
        set -eux
        # adjust paths below to where your build outputs the APK and release notes
        BUILT_APK=path/to/output/app-release.apk
        RELEASE_NOTES=path/to/output/release_notes.md
        cp "$BUILT_APK" tmprepo/assets/apks/$(basename "$BUILT_APK")
        cp "$RELEASE_NOTES" tmprepo/_includes/release_notes.md

    - name: Commit & push to destination repo
      env:
        DEST_BRANCH: main
        DEST_TOKEN: ${{ secrets.DEST_REPO_TOKEN }}
      run: |
        set -eux
        cd tmprepo
        git add assets/apks/* _includes/release_notes.md || true
        git commit -m "ci: publish APK build $GITHUB_RUN_NUMBER" || echo "No changes to commit"
        git push "https://x-access-token:${DEST_TOKEN}@github.com/${DEST_REPO}.git" HEAD:${DEST_BRANCH}
```

If you prefer to avoid cloning via git you can use the GitHub REST API `PUT /repos/{owner}/{repo}/contents/{path}` to create/update files directly from the source workflow — this may be preferable if you want finer control or smaller token scopes.
