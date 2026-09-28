import { useEffect, useState, useCallback, useRef } from 'react';

/* Lightweight horizontal carousel: native scroll + CSS scroll-snap do the
   heavy lifting (so touch/trackpad just work), this hook only adds
   mouse drag-to-scroll and tracks which card is active for the counter /
   arrow buttons. Deliberately does NOT hijack the wheel or pin the section —
   that's the GSAP ScrollTrigger approach this replaces, which could leave
   visitors "stuck" mid-section with the page scroll hijacked. */
export function useDragCarousel(viewportRef, draggingClass) {
  const [active, setActive] = useState(0);
  const [count, setCount] = useState(0);
  const panelsRef = useRef([]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = viewport?.firstElementChild;
    if (!viewport || !track) return undefined;

    const panels = Array.from(track.children);
    panelsRef.current = panels;
    setCount(panels.length);

    let raf = null;
    const updateActive = () => {
      raf = null;
      const viewportLeft = viewport.getBoundingClientRect().left;
      let closest = 0;
      let min = Infinity;
      panels.forEach((p, i) => {
        const d = Math.abs(p.getBoundingClientRect().left - viewportLeft);
        if (d < min) { min = d; closest = i; }
      });
      setActive(closest);
    };
    const onScroll = () => { if (raf === null) raf = requestAnimationFrame(updateActive); };
    updateActive();
    viewport.addEventListener('scroll', onScroll, { passive: true });

    // Mouse drag-to-scroll (touch already scrolls natively; pointerType
    // check lets touch/pen input pass through untouched).
    let dragging = false;
    let moved = false;
    let startX = 0;
    let startScroll = 0;

    const suppressNextClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      viewport.removeEventListener('click', suppressNextClick, true);
    };

    const onPointerDown = (e) => {
      if (e.pointerType === 'touch') return;
      dragging = true;
      moved = false;
      startX = e.clientX;
      startScroll = viewport.scrollLeft;
      viewport.setPointerCapture(e.pointerId);
      viewport.classList.add(draggingClass);
    };
    const onPointerMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 6) moved = true;
      viewport.scrollLeft = startScroll - dx;
    };
    const endDrag = () => {
      if (!dragging) return;
      dragging = false;
      viewport.classList.remove(draggingClass);
      if (moved) viewport.addEventListener('click', suppressNextClick, true);
    };

    viewport.addEventListener('pointerdown', onPointerDown);
    viewport.addEventListener('pointermove', onPointerMove);
    viewport.addEventListener('pointerup', endDrag);
    viewport.addEventListener('pointerleave', endDrag);

    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      viewport.removeEventListener('scroll', onScroll);
      viewport.removeEventListener('pointerdown', onPointerDown);
      viewport.removeEventListener('pointermove', onPointerMove);
      viewport.removeEventListener('pointerup', endDrag);
      viewport.removeEventListener('pointerleave', endDrag);
      viewport.removeEventListener('click', suppressNextClick, true);
    };
  }, [viewportRef, draggingClass]);

  const scrollToIndex = useCallback((i) => {
    const panel = panelsRef.current[Math.max(0, Math.min(i, panelsRef.current.length - 1))];
    if (!panel) return;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    panel.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', inline: 'start', block: 'nearest' });
  }, []);

  return {
    active,
    count,
    scrollToIndex,
    prev: () => scrollToIndex(active - 1),
    next: () => scrollToIndex(active + 1),
  };
}
