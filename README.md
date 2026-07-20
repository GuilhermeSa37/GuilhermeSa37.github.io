# Guilherme Sá — Portfolio Website

A restrained, technology-oriented portfolio for GitHub Pages.

## Version 4 changes

- Object-storage architecture is now the main featured project.
- Project order begins with object storage, Secure Chat and PulseFit.
- Fuller project descriptions and contribution explanations were restored.
- The text beneath the photograph is now a clean location and availability note.
- Light and dark themes are available from the navigation bar.
- The selected theme is saved in the browser.
- GitHub, LinkedIn and email actions now use one consistent button system.
- The Cozecare experience links to the official company website.
- Project repository links use consistent buttons.

## Redeploy

Replace the existing website files while preserving the hidden `.git` folder.

Then run:

```bash
git add -A
git commit -m "Improve portfolio hierarchy and add theme support"
git push origin main
```

GitHub Pages will deploy the new commit automatically.

## Root structure

```text
index.html
styles.css
script.js
favicon.svg
README.md
assets/
```


## Version 5 change

Email actions were removed. The visible contact options are now only LinkedIn
and GitHub, both in the opening section and in the final contact section.


## Version 6 change

The LinkedIn and GitHub buttons now include oversized monochrome logo
watermarks cropped into their backgrounds. The logos remain deliberately faint
in both light and dark mode and become only slightly more visible on hover.
