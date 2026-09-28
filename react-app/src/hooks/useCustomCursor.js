import { useEffect } from 'react';

/* Ports the original custom-cursor logic 1:1. Note the shared stylesheet
   hides #cursor-dot/#cursor-ring with `display:none !important` (see
   ScrollChrome.module.css), so this runs invisibly — kept for parity with
   the source site in case that CSS rule is intentionally relaxed later. */
export function useCustomCursor(dotRef, ringRef, labelRef, routeKey, hoverClass = 'hovering', hoverLabelClass = 'hovering-label') {
  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;

    let mx = 0, my = 0, rx = 0, ry = 0, raf;
    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = `${mx}px`; dot.style.top = `${my}px`;
    };
    const ringLoop = () => {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      ring.style.left = `${rx}px`; ring.style.top = `${ry}px`;
      raf = requestAnimationFrame(ringLoop);
    };
    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(ringLoop);

    const hoverables = document.querySelectorAll('a, button, [data-tilt]');
    const onEnter = () => ring.classList.add(hoverClass);
    const onLeave = () => ring.classList.remove(hoverClass);
    hoverables.forEach((el) => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave); });

    const panels = document.querySelectorAll('[data-hpanel]:not([data-hpanel-end])');
    const onPanelEnter = () => { ring.classList.add(hoverLabelClass); if (labelRef.current) labelRef.current.textContent = 'Xem dự án'; };
    const onPanelLeave = () => { ring.classList.remove(hoverLabelClass); if (labelRef.current) labelRef.current.textContent = ''; };
    panels.forEach((el) => { el.addEventListener('mouseenter', onPanelEnter); el.addEventListener('mouseleave', onPanelLeave); });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      hoverables.forEach((el) => { el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave); });
      panels.forEach((el) => { el.removeEventListener('mouseenter', onPanelEnter); el.removeEventListener('mouseleave', onPanelLeave); });
    };
  }, [dotRef, ringRef, labelRef, routeKey, hoverClass, hoverLabelClass]);
}
