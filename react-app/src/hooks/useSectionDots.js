import { useEffect, useState } from 'react';

/* Highlights the active dot in the homepage side nav as each section
   scrolls into view. `sections` is an ordered array of {id} objects. */
export function useSectionDots(sections) {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const targets = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!targets.length) return undefined;
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) {
        const idx = targets.indexOf(en.target);
        if (idx !== -1) setActiveIndex(idx);
      }
    }), { threshold: 0.5 });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return activeIndex;
}
