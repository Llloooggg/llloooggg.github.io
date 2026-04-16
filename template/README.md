# Project Site Template

Drop-in GitHub Pages template matching the root site at `llloooggg.github.io`.
OneDark theme, no build step.

## Usage

1. Copy the contents of this folder into your project's `docs/site/` directory
2. (Optional) Edit `config.js` to add screenshots, a logo, or override the tagline
3. Enable GitHub Pages:
   - Repo → Settings → Pages
   - Source: `Deploy from a branch`
   - Branch: `main`, folder: `/docs/site`
4. Push. Site will be live at `https://{owner}.github.io/{repo}/`

## How It Works

- `index.html` — empty skeleton, everything is populated by JS
- `style.css` — OneDark theme (identical to root site)
- `render.js` —
  - Auto-detects `owner/repo` from the page URL
  - Fetches repo metadata from GitHub API (name, description, stars, topics, etc.)
  - Fetches `README.md` from the `main` branch, strips the hero block, renders below
  - Pulls latest release for the download button
- `config.js` — **optional overrides** (all fields optional)
- `lightbox.js` — click-to-zoom for screenshots

## Config fields (all optional)

```js
var CONFIG = {
  // Override auto-detection (rarely needed)
  owner: 'YourName',
  repo: 'YourRepo',

  // Hero
  logo: 'https://raw.githubusercontent.com/.../icon.png',
  tagline: 'Override the short tagline',
  subtitle: 'Optional second line under the tagline',

  // Screenshots section (omit to hide)
  screenshots: [
    { src: 'https://.../shot1.png', caption: 'Description' },
    { src: 'https://.../shot2.png', caption: 'Description' },
  ],

  // Extra CTA buttons beside the auto "Download" / "View on GitHub"
  // extraCta: [{ label: 'Docs', url: '...' }],

  // Extra badges (shields.io URLs)
  // badges: [{ alt: 'CI', img: '...', link: '...' }],
};
```

If `CONFIG` is omitted entirely, the site still works — it just uses whatever
the GitHub API returns plus the README.

## Zero-config example

```js
// config.js
var CONFIG = {};
```

That's it. The site will show the repo name, description from the API,
a "Download" button pointing to the latest release, and the rendered README.
