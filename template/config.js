/* ═══════════════════════════════════════════════════════════
 *  Project site config — all fields optional.
 *
 *  Leave empty (var CONFIG = {};) for zero-config mode:
 *  everything will be pulled from the GitHub API + README.
 * ═══════════════════════════════════════════════════════════ */
var CONFIG = {
  /* Override auto-detection (by default parsed from the page URL).
   * Usually not needed. */
  // owner: 'YourName',
  // repo: 'YourRepo',

  /* Custom project logo (top of hero). If omitted, no logo is shown. */
  // logo: 'https://raw.githubusercontent.com/OWNER/REPO/main/assets/icons/icon.png',

  /* Override the tagline (default: repo description from API). */
  // tagline: 'Short description',

  /* Optional second line shown under the tagline. */
  // subtitle: 'Open-source alternative to X',

  /* Screenshots section — omit or leave empty to hide the section. */
  // screenshots: [
  //   { src: 'https://raw.githubusercontent.com/OWNER/REPO/main/docs/screenshots/shot1.png',
  //     caption: 'Main view' },
  //   { src: 'https://raw.githubusercontent.com/OWNER/REPO/main/docs/screenshots/shot2.png',
  //     caption: 'Settings' },
  // ],

  /* Extra CTA buttons (appended after the auto Download + View on GitHub). */
  // extraCta: [
  //   { label: 'Documentation', url: 'https://...', primary: false },
  // ],

  /* Shields.io badges. Accept either a flat array (one row) or an
   * array of arrays for grouping into multiple rows. */
  // badges: [
  //   { alt: 'CI', img: 'https://.../badge.svg', link: 'https://...' },
  // ],
  // badges: [
  //   [ { alt: 'Release', img: '...', link: '...' },
  //     { alt: 'License', img: '...', link: '...' } ],
  //   [ { alt: 'CI',      img: '...', link: '...' } ],
  // ],

  /* Footer "muted" line. Default: "{license} · OneDark theme"
   * when the repo has a recognized license, else "OneDark theme". */
  // footerMuted: 'GPL-3.0 · Built with Flutter · OneDark theme',
};
