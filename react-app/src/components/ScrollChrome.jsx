import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useScrollProgress } from '../hooks/useScrollProgress.js';
import { useCustomCursor } from '../hooks/useCustomCursor.js';
import styles from './ScrollChrome.module.css';

/* Global chrome shared by every page: scroll progress bar, film-grain
   overlay and the (currently CSS-hidden) custom cursor. */
export default function ScrollChrome() {
  const pct = useScrollProgress();
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const location = useLocation();

  useCustomCursor(dotRef, ringRef, labelRef, location.pathname, styles.hovering, styles['hovering-label']);

  return (
    <>
      <div className={styles.progress} style={{ width: `${pct}%` }} />
      <div className={styles.grain} />
      <div ref={dotRef} className={styles.cursorDot} />
      <div ref={ringRef} className={styles.cursorRing}><span ref={labelRef} /></div>
    </>
  );
}
