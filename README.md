# Guilherme Sá — Portfolio Website

A responsive static portfolio prepared for GitHub Pages.

## Before publishing

Open `script.js` and replace:

```js
githubUsername: "YOUR_GITHUB_USERNAME"
```

with your real GitHub username.

The following are already configured:

- LinkedIn profile;
- Professional email;
- Current CV PDF;
- Profile photograph;
- Repository names used throughout the portfolio.

## Fastest browser-only publication method

1. Create a **public** GitHub repository named exactly:

   ```text
   YOUR_GITHUB_USERNAME.github.io
   ```

2. Open that repository on GitHub.

3. Select **Add file → Upload files**.

4. Upload the contents of this folder, not the outer folder itself.

   The repository root should contain:

   ```text
   index.html
   styles.css
   script.js
   favicon.svg
   assets/
   README.md
   ```

5. Commit the uploaded files.

6. Open **Settings → Pages**.

7. Set:

   ```text
   Source: Deploy from a branch
   Branch: main
   Folder: /(root)
   ```

8. Save and wait a few minutes.

Your website will be available at:

```text
https://YOUR_GITHUB_USERNAME.github.io
```

## Preview locally

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Included assets

- `assets/images/guilherme-sa-profile.png` — main website portrait;
- `assets/images/guilherme-sa-headshot.jpg` — alternative formal headshot;
- `assets/documents/Guilherme-Sa-CV.pdf` — current CV.

## Updating the CV later

Replace:

```text
assets/documents/Guilherme-Sa-CV.pdf
```

with the revised PDF using the same filename.

## Important note

Your current CV still describes you as a final-year student with completion
expected in July 2026. Update the PDF when your degree status or professional
experience changes.
