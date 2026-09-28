import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext.jsx';
import { useReveal } from '../hooks/useReveal.js';
import { useMagnetic } from '../hooks/useMagnetic.js';
import { useTilt } from '../hooks/useTilt.js';
import { useFilterChips } from '../hooks/useFilterChips.js';
import PageHero from '../components/PageHero.jsx';
import CtaSection from '../components/CtaSection.jsx';
import textures from '../styles/textures.module.css';
import styles from './Spaces.module.css';

const FILTERS = [
  { key: 'all', labelKey: 'spaces.filterAll' },
  { key: 'living-room', labelKey: 'spaces.filterLiving' },
  { key: 'bedroom', labelKey: 'spaces.filterBedroom' },
  { key: 'dining-room', labelKey: 'spaces.filterDining' },
  { key: 'workspace', labelKey: 'spaces.filterWork' },
  { key: 'outdoor', labelKey: 'spaces.filterOutdoor' },
];

const CARDS = [
  { id: 'meridian', tag: '01 — Meridian', scene: 'sceneMeridian', category: 'living-room', titleKey: 'spaces.card1Title', catKey: 'spaces.card1Cat' },
  { id: 'solstice', tag: '02 — Solstice', scene: 'sceneSolstice', category: 'bedroom', titleKey: 'spaces.card2Title', catKey: 'spaces.card2Cat' },
  { id: 'atelier', tag: '03 — Atelier', scene: 'sceneAtelier', category: 'workspace', titleKey: 'spaces.card3Title', catKey: 'spaces.card3Cat' },
  { id: 'riviera', tag: '04 — Riviera', scene: 'sceneRiviera', category: 'dining-room', titleKey: 'spaces.card4Title', catKey: 'spaces.card4Cat' },
  { id: 'terra', tag: '05 — Terra', scene: 'sceneTerra', category: 'outdoor', titleKey: 'spaces.card5Title', catKey: 'spaces.card5Cat' },
  { id: 'nocturne', tag: '06 — Nocturne', scene: 'sceneNocturne', category: 'bedroom', titleKey: 'spaces.card6Title', catKey: 'spaces.card6Cat' },
];

const REVEAL_DELAYS = ['', 'r1', 'r2', 'r1', 'r1', 'r2'];

export default function Spaces() {
  const { t, to } = useI18n();
  const containerRef = useRef(null);
  const { active, setActive } = useFilterChips('all');

  useReveal(containerRef, [active]);
  useMagnetic(containerRef, [active]);
  useTilt(containerRef, '[data-tilt]', [active]);

  const visibleCards = CARDS.filter((c) => active === 'all' || c.category === active);

  return (
    <div ref={containerRef}>
      <PageHero
        variant="spaces"
        crumbLabel={t('common.navSpaces')}
        title={t('spaces.h1')}
        sub={t('spaces.sub')}
      />

      <section className="section-tight">
        <div className="wrap">
          <div className={`${styles.filterRow} reveal`}>
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                className={`${styles.filterChip} ${active === f.key ? styles.active : ''}`}
                onClick={() => setActive(f.key)}
              >
                {t(f.labelKey)}
              </button>
            ))}
          </div>

          <div className={styles.grid}>
            {visibleCards.map((c, i) => (
              <Link
                key={c.id}
                to={to('project', c.id)}
                className={`${styles.card} reveal ${REVEAL_DELAYS[i] || ''}`}
                data-tilt
              >
                <div className={`${styles.cardBg} ${textures[c.scene]}`} />
                <div className={styles.cardBody}>
                  <span className={styles.cardTag}>{c.tag}</span>
                  <h3>{t(c.titleKey)}</h3>
                  <p className={styles.cardCat}>{t(c.catKey)}</p>
                  <span className={styles.cardLink}>{t('common.viewDetails')}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection eyebrow={t('spaces.ctaEyebrow')} title={t('spaces.ctaTitle')} />
    </div>
  );
}
