import { useEffect } from 'react';

/* Fades/clips elements in as they enter the viewport. Targets the plain
   global `.reveal` / `.clip-reveal` marker classes from styles/global.css
   (see that file for why they stay plain instead of CSS Modules). */
export function useReveal(containerRef, deps = []) {
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return undefined;
    const els = root.querySelectorAll('.reveal, .clip-reveal');
    if (!els.length) return undefined;
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
    }), { threshold: 0.15 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, ...deps]);
}
