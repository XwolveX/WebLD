import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsapSetup.js';

/* The original site only ships a preloader markup block on index.html —
   there it plays once per hard page load. In this single-page app the
   homepage can be revisited by client-side navigation, so replaying the
   full loader every time would be annoying; it now plays once per app
   session (tracked by this module-level flag) and is skipped on repeat
   visits to "/". */
let hasPlayedThisSession = false;

export function usePreloader(wordsRef, fadeInRef) {
  const [showPreloader, setShowPreloader] = useState(!hasPlayedThisSession);
  const [pct, setPct] = useState(0);
  const pathRef = useRef(null);

  useEffect(() => {
    const animateHeroWords = () => {
      const words = wordsRef.current?.querySelectorAll('span span') || [];
      if (words.length) {
        gsap.to(words, { y: 0, duration: 1, ease: 'power3.out', stagger: 0.045 });
      }
      if (fadeInRef.current) {
        gsap.fromTo(fadeInRef.current.children, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.4, stagger: 0.15, ease: 'power2.out' });
      }
    };

    if (!showPreloader) {
      animateHeroWords();
      return undefined;
    }

    document.body.style.overflow = 'hidden';
    const counter = { v: 0 };
    const finish = () => {
      hasPlayedThisSession = true;
      document.body.style.overflow = '';
      setShowPreloader(false);
      animateHeroWords();
      ScrollTrigger.refresh();
    };

    gsap.to(counter, {
      v: 100, duration: 1.5, delay: 0.2, ease: 'power2.inOut',
      onUpdate: () => setPct(Math.round(counter.v)),
    });

    let finished = false;
    const safeFinish = () => { if (!finished) { finished = true; finish(); } };

    if (pathRef.current) {
      gsap.to(pathRef.current, {
        strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut', delay: 0.2,
        onComplete: () => setTimeout(safeFinish, 350),
      });
    } else {
      setTimeout(safeFinish, 1900);
    }

    return () => { document.body.style.overflow = ''; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { showPreloader, pct, pathRef };
}
