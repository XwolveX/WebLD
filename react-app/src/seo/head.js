import { SITE_NAME, OG_IMAGE_SIZE } from './site.js';

const OG_LOCALE = { vi: 'vi_VN', en: 'en_US' };

const metaName = (name, content) => ({ tag: 'meta', attrs: { name, content } });
const metaProp = (property, content) => ({ tag: 'meta', attrs: { property, content } });

/* Pure description of everything SEO-related that belongs in <head>. Used by
   the prerender script (serialised to a string) and by the client on route
   changes (applied to the live document), so both always agree. */
export function headTags(meta) {
  const tags = [{ tag: 'title', text: meta.title }];

  if (meta.noindex) {
    tags.push(metaName('robots', 'noindex, follow'));
    return tags;
  }

  const otherLang = meta.lang === 'vi' ? 'en' : 'vi';

  tags.push(metaName('description', meta.description));
  tags.push({ tag: 'link', attrs: { rel: 'canonical', href: meta.canonical } });
  meta.alternates.forEach((a) => {
    tags.push({ tag: 'link', attrs: { rel: 'alternate', hreflang: a.hreflang, href: a.href } });
  });

  tags.push(
    metaProp('og:type', meta.type),
    metaProp('og:site_name', SITE_NAME),
    metaProp('og:title', meta.title),
    metaProp('og:description', meta.description),
    metaProp('og:url', meta.canonical),
    metaProp('og:locale', OG_LOCALE[meta.lang]),
    metaProp('og:locale:alternate', OG_LOCALE[otherLang]),
    metaProp('og:image', meta.image),
    metaProp('og:image:width', String(OG_IMAGE_SIZE.width)),
    metaProp('og:image:height', String(OG_IMAGE_SIZE.height)),
    metaProp('og:image:alt', meta.title),
    metaName('twitter:card', 'summary_large_image'),
    metaName('twitter:title', meta.title),
    metaName('twitter:description', meta.description),
    metaName('twitter:image', meta.image),
  );

  meta.jsonLd.forEach((data) => {
    tags.push({ tag: 'script', attrs: { type: 'application/ld+json' }, text: JSON.stringify(data) });
  });

  return tags;
}

const escAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escText = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* Server side: tags -> HTML string. Every tag carries data-seo so the client
   can find and replace exactly what we generated. */
export function serializeHead(meta) {
  return headTags(meta)
    .map(({ tag, attrs = {}, text }) => {
      const attrStr = Object.entries({ ...attrs, 'data-seo': '' })
        .map(([k, v]) => (v === '' ? k : `${k}="${escAttr(v)}"`))
        .join(' ');
      if (tag === 'meta' || tag === 'link') return `<${tag} ${attrStr}>`;
      // JSON-LD lives in a script: only "<" needs neutralising to stay inside it.
      const body = tag === 'script' ? text.replace(/</g, '\\u003c') : escText(text);
      return `<${tag} ${attrStr}>${body}</${tag}>`;
    })
    .join('\n');
}

/* Client side: swap the previous route's SEO tags for the new ones. */
export function applyHead(meta) {
  document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove());
  document.documentElement.setAttribute('lang', meta.lang);

  headTags(meta).forEach(({ tag, attrs = {}, text }) => {
    if (tag === 'title') {
      document.title = text;
      const el = document.head.querySelector('title');
      if (el) el.setAttribute('data-seo', '');
      return;
    }
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    el.setAttribute('data-seo', '');
    if (text) el.textContent = text;
    document.head.appendChild(el);
  });
}
