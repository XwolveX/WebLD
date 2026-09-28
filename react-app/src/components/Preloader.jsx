import styles from './Preloader.module.css';

export default function Preloader({ pct, pathRef, done }) {
  return (
    <div className={`${styles.preloader} ${done ? styles.done : ''}`}>
      <div>
        <svg viewBox="0 0 120 120">
          <path
            ref={pathRef}
            d="M20,90 L20,30 L38,70 L56,30 L56,90 M74,30 C96,30 96,90 74,90 M74,30 L74,90"
            strokeDasharray="600"
            strokeDashoffset="600"
          />
        </svg>
        <div className={styles.pct}>{pct}%</div>
      </div>
    </div>
  );
}
