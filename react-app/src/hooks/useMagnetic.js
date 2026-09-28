import { useEffect } from 'react';

export function useMagnetic(containerRef, deps = []) {
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return undefined;
    const els = root.querySelectorAll('.magnetic');
    const cleanups = [];
    els.forEach((el) => {
      const onMove = (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.28;
        const y = (e.clientY - r.top - r.height / 2) * 0.35;
        el.style.transform = `translate(${x}px, ${y}px)`;
      };
      const onLeave = () => { el.style.transform = 'translate(0,0)'; };
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      cleanups.push([el, onMove, onLeave]);
    });
    return () => cleanups.forEach(([el, onMove, onLeave]) => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, ...deps]);
}
