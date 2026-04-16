/* ═══════════════════════════════════════════════════════════
 *  Project site renderer.
 *
 *  - Auto-detects owner/repo from the page URL
 *  - Fetches repo metadata from GitHub API
 *  - Renders hero, screenshots (from CONFIG), README
 *  - Latest release drives the Download button
 * ═══════════════════════════════════════════════════════════ */
(function () {
  var cfg = (typeof CONFIG !== 'undefined') ? CONFIG : {};

  /* ── Resolve owner/repo ─────────────────────────────── */
  var owner = cfg.owner;
  var repo = cfg.repo;

  if (!owner || !repo) {
    /* GitHub Pages serves at either:
     *   https://{owner}.github.io/{repo}/...   ← project page
     *   https://{owner}.github.io/...          ← user/org page */
    var host = window.location.hostname.match(/^([^.]+)\.github\.io$/i);
    if (host) {
      owner = owner || host[1];
      var parts = window.location.pathname.split('/').filter(Boolean);
      if (parts.length > 0 && parts[0] !== 'index.html') {
        repo = repo || parts[0];
      }
    }
  }

  if (!owner || !repo) {
    document.getElementById('hero-title').textContent = 'Configuration required';
    document.getElementById('readme-content').innerHTML =
      '<p class="loading">Could not detect repository from URL. ' +
      'Set <code>owner</code> and <code>repo</code> in <code>config.js</code>.</p>';
    return;
  }

  var repoUrl = 'https://github.com/' + owner + '/' + repo;
  var rawBase = 'https://raw.githubusercontent.com/' + owner + '/' + repo + '/main/';

  /* ── Helpers ────────────────────────────────────────── */
  function esc(s) {
    var el = document.createElement('span');
    el.textContent = s;
    return el.innerHTML;
  }

  /* ── Main ───────────────────────────────────────────── */
  (async function () {
    var repoData = null;
    var release = null;

    try {
      var results = await Promise.all([
        fetch('https://api.github.com/repos/' + owner + '/' + repo),
        fetch('https://api.github.com/repos/' + owner + '/' + repo + '/releases/latest')
          .catch(function () { return null; }),
      ]);
      if (results[0].ok) repoData = await results[0].json();
      if (results[1] && results[1].ok) release = await results[1].json();
    } catch (e) { /* fall through */ }

    renderHero(repoData, release);
    renderScreenshots();
    renderReadme(repoData);
    renderFooter();
  })();

  /* ── Hero ───────────────────────────────────────────── */
  function renderHero(repoData, release) {
    var name = repoData ? repoData.name : repo;
    var tagline = cfg.tagline || (repoData && repoData.description) || '';

    /* Tab title */
    document.title = name + (tagline ? ' — ' + tagline : '');

    /* OG tags */
    setMeta('og:title', name);
    if (tagline) setMeta('og:description', tagline);
    setMeta('description', tagline);

    /* Title + logo */
    document.getElementById('hero-title').textContent = name;
    if (cfg.logo) {
      var logoEl = document.getElementById('hero-logo');
      logoEl.src = cfg.logo;
      logoEl.alt = name + ' logo';
      logoEl.style.display = '';
      /* Favicon */
      var fav = document.createElement('link');
      fav.rel = 'icon';
      fav.href = cfg.logo;
      document.head.appendChild(fav);
    }

    /* Tagline & subtitle */
    if (tagline) {
      var tl = document.getElementById('hero-tagline');
      tl.textContent = tagline;
      tl.style.display = '';
    }
    if (cfg.subtitle) {
      var st = document.getElementById('hero-subtitle');
      st.textContent = cfg.subtitle;
      st.style.display = '';
    }

    /* Badges */
    if (cfg.badges && cfg.badges.length > 0) {
      var badges = document.getElementById('hero-badges');
      badges.innerHTML = '<div class="badge-row">' + cfg.badges.map(function (b) {
        var img = '<img src="' + esc(b.img) + '" alt="' + esc(b.alt || '') + '">';
        return b.link
          ? '<a href="' + esc(b.link) + '" target="_blank" rel="noopener">' + img + '</a>'
          : img;
      }).join('') + '</div>';
      badges.style.display = '';
    }

    /* CTA buttons */
    var ctaHtml = '';
    if (release && release.html_url) {
      ctaHtml += '<a href="' + esc(release.html_url) + '" class="btn btn-primary">'
        + '<span class="icon">&darr;</span> Download</a>';
    }
    ctaHtml += '<a href="' + esc(repoUrl) + '" class="btn '
      + (release ? 'btn-secondary' : 'btn-primary') + '" target="_blank" rel="noopener">'
      + '<span class="icon">&#9881;</span> View on GitHub</a>';
    if (cfg.extraCta) {
      cfg.extraCta.forEach(function (c) {
        ctaHtml += '<a href="' + esc(c.url) + '" class="btn '
          + (c.primary ? 'btn-primary' : 'btn-secondary') + '" target="_blank" rel="noopener">'
          + esc(c.label) + '</a>';
      });
    }
    document.getElementById('hero-cta').innerHTML = ctaHtml;
  }

  /* ── Screenshots ─────────────────────────────────────── */
  function renderScreenshots() {
    var shots = cfg.screenshots || [];
    if (shots.length === 0) return;

    document.getElementById('screenshots-section').style.display = '';
    document.getElementById('screenshot-grid').innerHTML = shots.map(function (s) {
      return '<figure class="screenshot-clickable">'
        + '<img src="' + esc(s.src) + '" alt="' + esc(s.caption || 'Screenshot') + '">'
        + (s.caption ? '<figcaption>' + esc(s.caption) + '</figcaption>' : '')
        + '</figure>';
    }).join('');
  }

  /* ── README ──────────────────────────────────────────── */
  async function renderReadme(repoData) {
    var target = document.getElementById('readme-content');
    try {
      var res = await fetch(rawBase + 'README.md', { cache: 'no-cache' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      var md = await res.text();

      /* Strip the first H1 (repo name — already shown in hero) */
      md = md.replace(/^#\s+.+$/m, '');

      /* Strip leading badges/metadata block — everything before the first H2 */
      var h2Match = md.match(/^##\s+/m);
      if (h2Match) md = md.slice(h2Match.index);

      /* Strip screenshot images already shown in the screenshots section */
      if (cfg.screenshots && cfg.screenshots.length > 0) {
        md = md.replace(/^!\[.*?\]\(.*?\)\s*$/gim, '');
      }

      marked.setOptions({ gfm: true, breaks: false, headerIds: true, mangle: false });
      target.innerHTML = marked.parse(md);

      /* Rewrite relative links and images to absolute GitHub URLs */
      var blobBase = 'https://github.com/' + owner + '/' + repo + '/blob/main/';
      target.querySelectorAll('a[href]').forEach(function (a) {
        var href = a.getAttribute('href');
        if (!href) return;
        if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) return;
        a.setAttribute('href', blobBase + href);
      });
      target.querySelectorAll('img[src]').forEach(function (img) {
        var src = img.getAttribute('src');
        if (!src || src.startsWith('http') || src.startsWith('data:')) return;
        img.setAttribute('src', rawBase + src);
      });
      target.querySelectorAll('a[href^="http"]').forEach(function (a) {
        a.target = '_blank';
        a.rel = 'noopener';
      });
    } catch (e) {
      target.innerHTML = '<p class="loading">Failed to load README: ' + esc(e.message)
        + '.<br>See it on <a href="' + esc(repoUrl) + '#readme">GitHub</a>.</p>';
    }
  }

  /* ── Footer ──────────────────────────────────────────── */
  function renderFooter() {
    var userSite = 'https://' + owner.toLowerCase() + '.github.io';
    document.getElementById('footer-links').innerHTML =
      '<a href="' + esc(repoUrl) + '">GitHub</a>'
      + '<span class="sep">&middot;</span>'
      + '<a href="' + esc(repoUrl) + '/issues">Issues</a>'
      + '<span class="sep">&middot;</span>'
      + '<a href="' + esc(repoUrl) + '/releases">Releases</a>'
      + '<span class="sep">&middot;</span>'
      + '<a href="' + esc(userSite) + '">All Projects</a>';
  }

  function setMeta(name, content) {
    var attr = name.startsWith('og:') ? 'property' : 'name';
    var el = document.querySelector('meta[' + attr + '="' + name + '"]');
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  }
})();
