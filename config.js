/* ═══════════════════════════════════════════════════════════
 *  Site config — the only file you need to edit.
 *
 *  GITHUB_USER — GitHub username. Profile data (avatar, name,
 *                bio, contacts) is pulled from the API.
 *
 *  PROJECTS[]  — one object per card.
 *    repo         — full GitHub repo URL              (required)
 *    icon         — URL to project icon/logo          (optional)
 *    screenshots  — array of screenshot URLs          (optional)
 *    has_site     — true  = card click opens Pages    (optional)
 *                   false/omitted = opens the repo
 * ═══════════════════════════════════════════════════════════ */
var GITHUB_USER = 'Llloooggg';

/* Optional overrides — GitHub API does not expose these
 * to unauthenticated requests. Set to null or remove
 * any field to hide it. */
var TIMEZONE = 'UTC +03:00';
var EMAIL = 'poddeo3@gmail.com';

var PROJECTS = [
  {
    repo: 'https://github.com/Llloooggg/LetsFLUTssh',
    icon: 'https://raw.githubusercontent.com/Llloooggg/LetsFLUTssh/main/assets/icons/icon.png',
    screenshots: [
      'https://raw.githubusercontent.com/Llloooggg/LetsFLUTssh/main/docs/screenshots/LetsFLUTssh_terminal.png',
      'https://raw.githubusercontent.com/Llloooggg/LetsFLUTssh/main/docs/screenshots/LetsFLUTssh_files.png',
    ],
    has_site: true,
  },
  // {
  //   repo: 'https://github.com/Llloooggg/AnotherProject',
  //   icon: 'https://...icon.png',
  //   screenshots: ['https://...1.png', 'https://...2.png'],
  //   has_site: false,
  // },
];
