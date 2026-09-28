import { useEffect } from 'react';

/* Smooth-scrolls same-page hash links (e.g. href="#collections") through
   Lenis, falling back to native scrollIntoView. Runs against the whole
   document since anchors and their targets can be far apart in the tree. */
export function useSmoothAnchors(deps = []) {
  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');
    const cleanups = [];
    links.forEach((a) => {
      const onClick = (e) => {
        const id = a.getAttribute('href');
        if (id.length > 1) {
          const target = document.querySelector(id);
          if (target) {
            e.preventDefault();
            if (window.__lenis) window.__lenis.scrollTo(target, { duration: 1.2 });
            else target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      };
      a.addEventListener('click', onClick);
      cleanups.push([a, onClick]);
    });
    return () => cleanups.forEach(([a, onClick]) => a.removeEventListener('click', onClick));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
