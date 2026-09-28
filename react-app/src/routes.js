/* Single source of truth for URLs. The language lives in the URL
   (Vietnamese at the root, English under /en) so every language version is a
   real, crawlable, prerenderable page instead of a client-side toggle. */
export const LANGS = ['vi', 'en'];
export const DEFAULT_LANG = 'vi';

export const PAGE_PATHS = {
  home: { vi: '/', en: '/en/' },
  spaces: { vi: '/khong-gian', en: '/en/spaces' },
  materials: { vi: '/chat-lieu', en: '/en/materials' },
  about: { vi: '/ve-chung-toi', en: '/en/about' },
  contact: { vi: '/lien-he', en: '/en/contact' },
  project: { vi: '/du-an', en: '/en/projects' },
};

const stripSlash = (p) => p.replace(/\/+$/, '') || '/';

export function pathFor(page, lang, id) {
  const base = PAGE_PATHS[page][lang];
  return page === 'project' ? `${base}/${id}` : base;
}

/* React Router patterns, one per page per language. */
export function routePattern(page, lang) {
  const base = stripSlash(PAGE_PATHS[page][lang]);
  return page === 'project' ? `${base}/:id` : base;
}

/* pathname -> { lang, page, id }. page is null for unknown URLs. */
export function parseRoute(pathname) {
  const clean = stripSlash(pathname);
  for (const lang of LANGS) {
    for (const [page, paths] of Object.entries(PAGE_PATHS)) {
      const base = stripSlash(paths[lang]);
      if (page === 'project') {
        if (clean.startsWith(`${base}/`)) {
          const id = clean.slice(base.length + 1);
          if (id && !id.includes('/')) return { lang, page, id };
        }
      } else if (clean === base) {
        return { lang, page, id: null };
      }
    }
  }
  const lang = clean === '/en' || clean.startsWith('/en/') ? 'en' : DEFAULT_LANG;
  return { lang, page: null, id: null };
}

/* Every indexable URL, for prerendering and the sitemap. */
export function listRoutes(projectIds) {
  const routes = [];
  for (const lang of LANGS) {
    for (const page of Object.keys(PAGE_PATHS)) {
      if (page === 'project') {
        projectIds.forEach((id) => routes.push({ lang, page, id, path: pathFor(page, lang, id) }));
      } else {
        routes.push({ lang, page, id: null, path: pathFor(page, lang) });
      }
    }
  }
  return routes;
}
