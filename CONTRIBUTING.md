# Contributing

Thanks for your interest. This is a small personal site, but the template in
[`template/`](./template) is intended for reuse — PRs that improve either one
are welcome.

## Local preview

No build step. Serve the repo root with any static server:

```bash
python3 -m http.server 8000
# or
npx serve .
```

Then open http://localhost:8000 in your browser. GitHub API calls work over
`file://` too but CORS on `fetch` is stricter, so a local server is safer.

## Project layout

```
.
├── index.html            # Root page
├── config.js             # Root page config (edit to add projects)
├── template/             # Drop-in template for individual project sites
│   ├── index.html
│   ├── style.css
│   ├── config.js         # Template config (all fields optional)
│   ├── render.js         # Fetches API data, renders README
│   └── lightbox.js
└── .github/workflows/
    └── pages.yml         # Deploy workflow — triggers only on site file changes
```

## Guidelines

- **No hardcoded personal data** — everything a user might want to change goes
  in `config.js`. The only exceptions are fields GitHub does not expose to
  unauthenticated API requests (currently `TIMEZONE` and `EMAIL`).
- **Pull from API first** — if GitHub's API can provide a value (name, bio,
  description, language, stars, release, etc.), read it from there. Config
  fields should only exist for data the API cannot return.
- **Graceful degradation** — every optional config field must have sensible
  default behavior when missing (no icon → letter fallback, no screenshots →
  hide strip, no release → hide tag, etc.).
- **Template zero-config** — `template/` must work with `var CONFIG = {};` on
  any GitHub Pages project site. Regressions there block merge.

## Commit messages

Format: `type: short description`

| Prefix      | Use for                                 |
|-------------|-----------------------------------------|
| `feat:`     | New features / visible changes          |
| `fix:`      | Bug fixes                               |
| `refactor:` | Code improvements (no new behavior)     |
| `docs:`     | Documentation only                      |
| `ci:`       | CI/CD workflow changes                  |
| `chore:`    | Config, tooling, minor maintenance      |
| `style:`    | Formatting, whitespace only             |

Scope in parentheses when the change is localized (e.g. `feat(template):`,
`fix(config):`).

**Examples:**

```
feat(template): auto-detect owner/repo from GitHub Pages URL
fix(index): prevent card click from triggering on inner links
docs: document zero-config template usage
ci: narrow workflow triggers to site files only
```

## Pull Requests

1. Fork and create a feature branch
2. Commit with conventional prefixes
3. Preview locally before opening the PR
4. One logical change per PR
5. Fill in the PR template

## Security

See [SECURITY.md](./SECURITY.md) for reporting vulnerabilities.
