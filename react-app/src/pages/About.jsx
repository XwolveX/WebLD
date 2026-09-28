import { useRef } from 'react';
import { useI18n } from '../i18n/I18nContext.jsx';
import { useReveal } from '../hooks/useReveal.js';
import { useMagnetic } from '../hooks/useMagnetic.js';
import PageHero from '../components/PageHero.jsx';
import CtaSection from '../components/CtaSection.jsx';
import ProcessList from '../components/ProcessList.jsx';
import styles from './About.module.css';

const MILESTONES = ['1', '2', '3', '4', '5'];
const MILESTONE_YEARS = { 1: '2011', 2: '2015', 3: '2019', 4: '2024', 5: '2025' };

const VALUES = [
  { num: '01', key: 'v1', reveal: '' },
  { num: '02', key: 'v2', reveal: 'r1' },
  { num: '03', key: 'v3', reveal: 'r2' },
  { num: '04', key: 'v4', reveal: 'r3' },
];

const TEAM = [
  { initials: 'NĐ', key: 'team1', reveal: '' },
  { initials: 'TK', key: 'team2', reveal: 'r1' },
  { initials: 'HL', key: 'team3', reveal: 'r2' },
];

export default function About() {
  const { t } = useI18n();
  const containerRef = useRef(null);
  useReveal(containerRef);
  useMagnetic(containerRef);

  return (
    <div ref={containerRef}>
      <PageHero
        variant="story"
        crumbLabel={t('common.navAbout')}
        sub={t('about.sub')}
        titleHtml={t('about.h1')}
      />

      <section className="section-tight">
        <div className={`wrap ${styles.introWrap}`}>
          <p className={`${styles.introP} reveal`}>{t('about.introP1')}</p>
          <p className={`${styles.introP} reveal r1`} style={{ marginBottom: 0 }}>{t('about.introP2')}</p>
        </div>
      </section>

      <div className="wrap">
        <div className={`${styles.storyVisual} reveal`}>
          <span>{t('about.storyCaption')}</span>
        </div>
      </div>

      <section className="section-tight">
        <div className="wrap">
          <div className="section-head">
            <h2 className="reveal clip-reveal">{t('about.journeyTitle')}</h2>
            <p className="section-note reveal">{t('about.journeyNote')}</p>
          </div>
          <ProcessList items={MILESTONES.map((n) => ({
            num: MILESTONE_YEARS[n],
            title: t(`about.mile${n}Title`),
            desc: t(`about.mile${n}Desc`),
          }))} />
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <div className="section-head">
            <h2 className="reveal clip-reveal">{t('about.valuesTitle')}</h2>
          </div>
          <div className={styles.valuesGrid}>
            {VALUES.map((v) => (
              <div key={v.num} className={`${styles.valueCard} reveal ${v.reveal}`}>
                <span className={styles.vNum}>{v.num}</span>
                <h3>{t(`about.${v.key}Title`)}</h3>
                <p>{t(`about.${v.key}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <div className="section-head">
            <h2 className="reveal clip-reveal">{t('about.teamTitle')}</h2>
            <p className="section-note reveal">{t('about.teamNote')}</p>
          </div>
          <div className={styles.teamGrid}>
            {TEAM.map((m) => (
              <div key={m.key} className={`${styles.teamCard} reveal ${m.reveal}`}>
                <div className={styles.teamAvatar}>{m.initials}</div>
                <h3>{t(`about.${m.key}Name`)}</h3>
                <span className={styles.role}>{t(`about.${m.key}Role`)}</span>
                <p>{t(`about.${m.key}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection eyebrow={t('about.ctaEyebrow')} title={t('about.ctaTitle')} />
    </div>
  );
}
