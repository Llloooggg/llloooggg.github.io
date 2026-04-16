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

  /* Badges — three forms, pick whichever is cleaner:
   *
   *   A. Use builders (recommended — no hardcoded URLs):
   *      badges: function (B) {
   *        return [
   *          [ B.release(), B.license(), B.bestPractices(12345) ],
   *          [ B.workflow('ci'), B.workflow('codeql') ],
   *          [ B.sonar('coverage'), B.scorecard() ],
   *        ];
   *      },
   *
   *      Available builders:
   *        B.release()                            Release tag from GitHub API
   *        B.license(spdx?)                       Auto from repo API
   *        B.shields(label, message, color?, link?)   Static shields badge
   *        B.workflow(name, {event?})             GHA workflow badge
   *        B.bestPractices(id)                    OpenSSF Best Practices
   *        B.sonar(metric, projectOverride?)      SonarCloud metric badge
   *        B.scorecard()                          OpenSSF Scorecard
   *        B.custom({alt, img, link?})            Full manual override
   *
   *   B. Raw data — flat array = one row:
   *      badges: [{ alt, img, link }, ...]
   *
   *   C. Raw data — array of arrays = grouped rows:
   *      badges: [[{...}, {...}], [{...}]]
   */
  // badges: function (B) {
  //   return [[ B.release(), B.license() ]];
  // },

  /* Footer "muted" line. Default: "{license} · OneDark theme"
   * when the repo has a recognized license, else "OneDark theme". */
  // footerMuted: 'GPL-3.0 · Built with Flutter · OneDark theme',
};
