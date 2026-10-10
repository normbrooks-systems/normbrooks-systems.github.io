# Norm Brooks — portfolio site

Static site for GitHub Pages: plain HTML, no build step.

## Files

| File | Page |
| --- | --- |
| `index.html` | Homepage |
| `dashboard.html` | Case study 01: Production Dashboard |
| `flowmaster.html` | Case study 02: FlowMaster Process Optimization |
| `reslot.html` | Case study 03: Class 15 Reslot |
| `inventory.html` | Case study 04: Inventory Control & Root-Cause Analysis |
| `experience.html` | Experience in Context |
| `js/hero.js` | Homepage scroll effect (car-to-valley crossfade, tagline, pier) |
| `images/` | Photographs, metadata stripped |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is |

## Publishing on GitHub Pages

1. Create a new public repository on GitHub (for example `norm-brooks-site`, or `<your-username>.github.io` to serve it at that address).
2. Upload everything in this folder to the root of the repository, including the hidden `.nojekyll` file, the `images` folder and the `js` folder.
3. In the repository, open Settings → Pages. Under "Build and deployment," choose "Deploy from a branch," select `main` and `/ (root)`, and save.
4. After a minute or two, the site address appears at the top of that Pages settings screen.

To use a custom domain, enter it in the same Pages settings screen and follow GitHub's DNS instructions.

## Notes

- Visitors who have reduced motion turned on, or whose browser blocks JavaScript, see the settled hero (valley photo and tagline) without the scroll animation.
- Fonts load from Google Fonts (Archivo, Source Serif 4).
- The direct-mail employer is intentionally not named anywhere on the site, including file names and metadata.
