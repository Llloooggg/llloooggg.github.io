# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this site or in the template, **please do not open a public issue**.

Instead, report it privately via **[GitHub Security Advisories](https://github.com/Llloooggg/llloooggg.github.io/security/advisories/new)**.

### What to include

- Description of the vulnerability
- Steps to reproduce
- Affected file(s)
- Potential impact

### What to expect

This is a personal open-source project, so there are no guaranteed response times. That said, I will do my best to:

- Acknowledge the report as soon as possible
- Push a fix to `main` once confirmed
- Credit the reporter (unless they prefer to stay anonymous)

### Scope

- XSS or injection via the GitHub API response handling
- XSS via `config.js` values (all user-provided strings must be HTML-escaped before rendering)
- Unsafe URL construction in the template's auto-detect logic
- Supply chain risks in the workflow (`.github/workflows/pages.yml`)

### Out of scope

- Vulnerabilities in GitHub Pages infrastructure — report to GitHub
- Vulnerabilities in `marked` (CDN-loaded in the template) — report upstream at [markedjs/marked](https://github.com/markedjs/marked)

### Automated Security Checks

- **Dependabot** — weekly updates for GitHub Actions (the only dependency surface)
- **Pinned Dependencies** — all GitHub Actions in the deploy workflow use versioned tags from official publishers
