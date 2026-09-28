import { useSectionDots } from '../hooks/useSectionDots.js';
import styles from './SectionDots.module.css';

export default function SectionDots({ sections }) {
  const activeIndex = useSectionDots(sections);

  return (
    <div className={styles.dots}>
      {sections.map((s, i) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          data-label={s.label}
          className={i === activeIndex ? styles.active : ''}
        />
      ))}
    </div>
  );
}
