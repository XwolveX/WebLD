/* Set VITE_SITE_URL at build time (e.g. in .env.production) to the real
   production origin — canonical URLs, hreflang, Open Graph and the sitemap
   are all built from it. */
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://lndceramics.com').replace(/\/+$/, '');
export const SITE_NAME = 'L&D Ceramics';
export const OG_IMAGE_PATH = '/og-image.png';
export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const CONTACT_EMAIL = 'hello@lndceramics.com';
