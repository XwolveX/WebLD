import styles from './ProcessList.module.css';

const REVEAL_DELAYS = ['', 'r1', 'r2', 'r3', 'r4'];

/* Shared numbered-row timeline: the homepage "four steps" process and the
   Về chúng tôi journey/milestones both reuse this same visual pattern. */
export default function ProcessList({ items }) {
  return (
    <div className={styles.list}>
      {items.map((item, i) => (
        <div key={item.num} className={`${styles.row} reveal ${REVEAL_DELAYS[i] || ''}`}>
          <span className={styles.num}>{item.num}</span>
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </div>
      ))}
    </div>
  );
}
