import { useRef } from 'react';
import { useI18n } from '../i18n/I18nContext.jsx';
import { useReveal } from '../hooks/useReveal.js';
import { useMagnetic } from '../hooks/useMagnetic.js';
import PageHero from '../components/PageHero.jsx';
import CtaSection from '../components/CtaSection.jsx';
import textures from '../styles/textures.module.css';
import styles from './Materials.module.css';

const ROWS = [
  { num: '01', tex: 'texWalnut', reverse: false, titleKey: 'materials.m1Title', p1: 'materials.m1P1', p2: 'materials.m1P2', tags: [{ static: 'Massif' }, { key: 'materials.m1Tag2' }, { key: 'materials.m1Tag3' }] },
  { num: '02', tex: 'texBronze', reverse: true, titleKey: 'materials.m2Title', p1: 'materials.m2P1', p2: 'materials.m2P2', tags: [{ key: 'materials.m2Tag1' }, { key: 'materials.m2Tag2' }, { key: 'materials.m2Tag3' }] },
  { num: '03', tex: 'texMarble', reverse: false, titleKey: 'materials.m3Title', p1: 'materials.m3P1', p2: 'materials.m3P2', tags: [{ key: 'materials.m3Tag1' }, { key: 'materials.m3Tag2' }, { key: 'materials.m3Tag3' }] },
  { num: '04', tex: 'texLeather', reverse: true, titleKey: 'materials.m4Title', p1: 'materials.m4P1', p2: 'materials.m4P2', tags: [{ static: 'Pieno fiore' }, { key: 'materials.m4Tag2' }, { key: 'materials.m4Tag3' }] },
  { num: '05', tex: 'texLinen', reverse: false, titleKey: 'materials.m5Title', p1: 'materials.m5P1', p2: 'materials.m5P2', tags: [{ key: 'materials.m5Tag1' }, { key: 'materials.m5Tag2' }, { key: 'materials.m5Tag3' }] },
];

export default function Materials() {
  const { t } = useI18n();
  const containerRef = useRef(null);
  useReveal(containerRef);
  useMagnetic(containerRef);

  return (
    <div ref={containerRef}>
      <PageHero
        variant="materials"
        crumbLabel={t('common.navMaterials')}
        title={t('materials.h1')}
        sub={t('materials.sub')}
      />

      <section className="section-tight">
        <div className="wrap">
          {ROWS.map((row) => (
            <div key={row.num} className={`${styles.row} ${row.reverse ? styles.reverse : ''} reveal`}>
              <div className={`${styles.visual} ${textures[row.tex]}`} />
              <div>
                <span className={styles.num}>{row.num}</span>
                <h3>{t(row.titleKey)}</h3>
                <p>{t(row.p1)}</p>
                <p>{t(row.p2)}</p>
                <div className={styles.tags}>
                  {row.tags.map((tag, i) => (
                    <span className={styles.tag} key={i}>{tag.static || t(tag.key)}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaSection eyebrow={t('materials.ctaEyebrow')} title={t('materials.ctaTitle')} />
    </div>
  );
}
