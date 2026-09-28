import { useEffect } from 'react';

/* 3D pointer-tilt for cards/swatches — targets elements carrying the
   data-tilt attribute within the given container. */
export function useTilt(containerRef, selector = '[data-tilt]', deps = []) {
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return undefined;
    const cards = root.querySelectorAll(selector);
    const cleanups = [];
    cards.forEach((card) => {
      const onMove = (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg) scale(1.015)`;
      };
      const onLeave = () => { card.style.transform = 'perspective(900px) rotateY(0) rotateX(0) scale(1)'; };
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      cleanups.push([card, onMove, onLeave]);
    });
    return () => cleanups.forEach(([card, onMove, onLeave]) => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, selector, ...deps]);
}
