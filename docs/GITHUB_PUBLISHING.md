# Publish MedTrans to GitHub

The easiest beginner workflow is to use GitHub Desktop. The repository-ready ZIP contains an initialized local Git repository, so after extracting it you can open that folder in GitHub Desktop and publish it to your GitHub account.

## Before publishing

- Review `README.md` and `docs/TUTORIAL.md` for accuracy and tone.
- Confirm that you have permission to share every included shell, image, script, and reference.
- Decide whether the repository should be public or private. A public repository is easier for classmates to access, but anyone can view it.
- Choose a license if you want to grant explicit reuse or modification rights. See `LICENSE_STATUS.md`; no license has been chosen in this draft.

## Publish with GitHub Desktop

1. Install and open [GitHub Desktop](https://desktop.github.com/) and sign in to your GitHub account.
2. Extract the **GitHub Desktop-ready** MedTrans ZIP to a permanent folder. Keep the hidden `.git` folder in place; it is what makes this an initialized local repository.
3. In GitHub Desktop, choose **File → Add Local Repository** and select the extracted MedTrans folder. If prompted, confirm the folder is a Git repository.
4. Review the files in the Changes tab. Enter a commit summary such as `Add MedTrans MD201–MD207 classroom toolkit`, then commit the files to `main`.
5. Select **Publish repository**.
6. Choose the repository name `medtrans-md201-207` (or another name you prefer), set the visibility, and publish.
7. Open the published repository in your browser. Check that the root `README.md` renders, the tutorial opens, and `.github/skills/medtrans/` contains `SKILL.md`, shells, scripts, and references.
8. Share the repository URL with classmates.

If GitHub Desktop says the folder is not a repository, you may have extracted the source-only ZIP instead of the GitHub Desktop-ready ZIP, or your unzip tool may have omitted the hidden `.git` directory.

## Enable the tutorial website

The `Deploy tutorial to GitHub Pages` workflow builds the Markdown files in `docs/` and deploys the site when changes are pushed to `main`.

1. On GitHub, open the repository's **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push a change to `docs/` on `main`, or run the workflow from the **Actions** tab using **Run workflow**.
4. Once the workflow succeeds, open `https://mdfl212.github.io/MedTrans-GitHub-Repo/`.

## Alternative: use the GitHub website

You can create an empty repository at [github.com/new](https://github.com/new), but uploading a multi-folder project through the website can be less convenient. GitHub Desktop or Git is recommended for preserving the directory structure. If creating the repository manually, do not initialize it with an extra README if you plan to push this existing project as-is; otherwise you may need to reconcile the two histories.
