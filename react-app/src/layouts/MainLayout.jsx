import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import SvgFilters from '../components/SvgFilters.jsx';
import ScrollChrome from '../components/ScrollChrome.jsx';
import { useLenis } from '../hooks/useLenis.js';
import { useSmoothAnchors } from '../hooks/useSmoothAnchors.js';
import { parseRoute } from '../routes.js';
import { getMeta } from '../seo/meta.js';
import { applyHead } from '../seo/head.js';

export default function MainLayout() {
  const location = useLocation();

  useLenis();
  useSmoothAnchors([location.pathname]);

  useEffect(() => {
    applyHead(getMeta(parseRoute(location.pathname)));
  }, [location.pathname]);

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
      window.__lenis?.scrollTo(0, { immediate: true });
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <SvgFilters />
      <ScrollChrome />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
