import { useEffect } from 'react';
import { gsap } from '../lib/gsapSetup.js';

export function useStatCounters(containerRef) {
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return undefined;
    const els = root.querySelectorAll('[data-stat]');
    const observers = [];
    els.forEach((el) => {
      const target = parseInt(el.getAttribute('data-count'), 10);
      const obs = new IntersectionObserver((entries) => entries.forEach((en) => {
        if (en.isIntersecting) {
          gsap.to({ val: 0 }, {
            val: target, duration: 1.6, ease: 'power2.out',
            onUpdate() { el.textContent = Math.round(this.targets()[0].val); },
          });
          obs.unobserve(el);
        }
      }), { threshold: 0.4 });
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [containerRef]);
}
