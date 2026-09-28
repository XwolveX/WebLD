import { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { I18N } from './translations.js';
import { parseRoute, pathFor } from '../routes.js';

const I18nContext = createContext(null);

/* The active language is derived from the URL (/… = vi, /en/… = en), never
   from localStorage, so server-rendered HTML, canonical URLs and hreflang
   always match what the visitor sees. Switching language navigates to the
   equivalent page in the other language. */
export function I18nProvider({ children }) {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const route = parseRoute(pathname);
  const { lang } = route;

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  const setLang = useCallback((next) => {
    if (next === lang) return;
    const target = route.page ? pathFor(route.page, next, route.id) : pathFor('home', next);
    navigate(`${target}${hash}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, route.page, route.id, hash, navigate]);

  const toggleLang = useCallback(() => {
    setLang(lang === 'vi' ? 'en' : 'vi');
  }, [lang, setLang]);

  const t = useCallback((key) => {
    const entry = key.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), I18N);
    if (!entry) return key;
    if (typeof entry === 'string') return entry;
    return entry[lang] ?? entry.vi ?? key;
  }, [lang]);

  /* Localised internal URL: to('spaces'), to('project', 'meridian'). */
  const to = useCallback((page, id) => pathFor(page, lang, id), [lang]);

  const value = useMemo(() => ({ lang, setLang, toggleLang, t, to }), [lang, setLang, toggleLang, t, to]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
