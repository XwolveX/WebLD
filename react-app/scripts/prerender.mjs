/* Static site generation: after `vite build` (client) and
   `vite build --ssr` (server bundle), render every route to real HTML and
   write dist/<route>/index.html, plus sitemap.xml, robots.txt and 404.html.
   Run through `npm run build`. */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render, routes, headFor, SITE_URL } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8');
if (!template.includes('<div id="root"></div>') || !template.includes('<!--seo-head-->')) {
  throw new Error('dist/index.html is missing the #root div or the <!--seo-head--> placeholder.');
}

function page(url, lang) {
  return template
    .replace('<html lang="vi">', `<html lang="${lang}">`)
    .replace('<!--seo-head-->', headFor(url))
    .replace('<div id="root"></div>', `<div id="root">${render(url)}</div>`);
}

async function write(file, content) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, content);
}

const all = routes();
for (const r of all) {
  const file = r.path === '/' ? 'index.html' : path.join(r.path, 'index.html');
  await write(path.join(dist, file), page(r.path, r.lang));
}

// Unknown URL -> the real NotFound page (noindex), served with a 404 status by the web server.
await write(path.join(dist, '404.html'), page('/__not-found', 'vi'));

// Sitemap with hreflang alternates for every language version of every page.
const key = (r) => `${r.page}:${r.id ?? ''}`;
const groups = new Map();
all.forEach((r) => groups.set(key(r), [...(groups.get(key(r)) ?? []), r]));
const lastmod = new Date().toISOString().slice(0, 10);
const alt = (rel, hreflang, p) => `    <xhtml:link rel="${rel}" hreflang="${hreflang}" href="${SITE_URL}${p}"/>`;

const urls = all.map((r) => {
  const versions = groups.get(key(r));
  const vi = versions.find((v) => v.lang === 'vi');
  const links = [...versions.map((v) => alt('alternate', v.lang, v.path)), alt('alternate', 'x-default', vi.path)];
  return `  <url>\n    <loc>${SITE_URL}${r.path}</loc>\n    <lastmod>${lastmod}</lastmod>\n${links.join('\n')}\n  </url>`;
});

await write(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`,
);
await write(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

await fs.rm(ssrDir, { recursive: true, force: true });
console.log(`Prerendered ${all.length} pages + 404.html, sitemap.xml, robots.txt (${SITE_URL})`);
