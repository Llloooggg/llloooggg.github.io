# llloooggg.github.io

Personal site listing open-source projects. Zero build step, OneDark theme,
everything configurable from a single file.

Live at [llloooggg.github.io](https://llloooggg.github.io/).

## What's inside

```
.
├── index.html      # Root page — project cards
├── config.js       # Edit this to add/remove projects
└── template/       # Drop-in template for individual project sites
```

## Root page (`index.html` + `config.js`)

A single-page grid of project cards. Everything except the project list is
pulled live from the GitHub API on page load:

- Avatar, name, login, bio, location, email, blog, Twitter, company — from
  [`/users/{user}`](https://docs.github.com/rest/users/users)
- Social accounts (Telegram, LinkedIn, etc.) — from
  [`/users/{user}/social_accounts`](https://docs.github.com/rest/users/social-accounts)
- Per-project description, language, stars, forks, topics — from
  [`/repos/{owner}/{repo}`](https://docs.github.com/rest/repos/repos)
- Latest release tag — from [`/repos/.../releases/latest`](https://docs.github.com/rest/releases/releases)

`config.js` is the only file to edit:

```js
var GITHUB_USER = 'Llloooggg';

// GitHub does not expose these to unauthenticated API requests.
// Set to null or remove to hide.
var TIMEZONE = 'UTC +03:00';
var EMAIL = 'you@example.com';

var PROJECTS = [
  {
    repo: 'https://github.com/Llloooggg/LetsFLUTssh',  // required
    icon: 'https://.../icon.png',                       // optional
    screenshots: ['https://...1.png', 'https://...2.png'], // optional
    has_site: true,  // optional — click opens Pages site instead of repo
  },
  // …
];
```

### Card behavior

- **Click** → opens the project's GitHub Pages site if `has_site: true`,
  otherwise the repo
- **Icon** → clickable link to the repo (via the title row)
- **Topics** → each links to `github.com/topics/{topic}`
- **Language / stars / forks** → clickable, go to the corresponding repo page
- **Release tag** (bottom-right) → opens the latest release
- **Screenshots** → click-to-zoom lightbox

All optional fields gracefully degrade — no icon falls back to a colored
letter, no screenshots hides the strip, no release hides the tag, single
project sits centered in the grid.

## Project-site template (`template/`)

Drop-in GitHub Pages template for individual repos. Copy `template/` into
your repo at `docs/site/`, enable Pages (branch `main`, folder `/docs/site`),
and the site auto-populates from the GitHub API and the project's `README.md`.

See [`template/README.md`](./template/README.md) for details.

### Zero-config example

```js
// docs/site/config.js
var CONFIG = {};
```

That's it. `render.js` auto-detects `owner/repo` from the Pages URL, pulls
metadata from the API, fetches `README.md`, and renders it.

### With screenshots and a custom logo

```js
var CONFIG = {
  logo: 'https://raw.githubusercontent.com/OWNER/REPO/main/assets/icons/icon.png',
  screenshots: [
    { src: '…shot1.png', caption: 'Main view' },
    { src: '…shot2.png', caption: 'Settings' },
  ],
};
```

## Deployment

No workflow, no build. For `{username}.github.io` user-sites, GitHub Pages
auto-serves from `main` root — pushing to `main` is all you need. For
project-site templates, enable Pages in the project's repo settings and point
it at `/docs/site`.

## License

MIT.
