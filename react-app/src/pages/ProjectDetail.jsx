import { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext.jsx';
import { useReveal } from '../hooks/useReveal.js';
import { useMagnetic } from '../hooks/useMagnetic.js';
import CtaSection from '../components/CtaSection.jsx';
import NotFound from './NotFound.jsx';
import { PROJECT_DATA } from '../data/projects.js';
import textures from '../styles/textures.module.css';
import styles from './ProjectDetail.module.css';

export default function ProjectDetail() {
  const { t, lang, to } = useI18n();
  const { id } = useParams();
  const containerRef = useRef(null);
  useReveal(containerRef, [id]);
  useMagnetic(containerRef, [id]);

  const project = PROJECT_DATA[id];
  if (!project) return <NotFound />;

  return (
    <div ref={containerRef}>
      <section className={styles.detailHero}>
        <div className={`${styles.detailHeroBg} ${textures[project.texture]}`} />
        <div className={styles.detailHeroText}>
          <span className="eyebrow on-dark">{project.num}</span>
          <h1>{project.title[lang]}</h1>
          <p className={styles.category}>{project.category[lang]}</p>
        </div>
      </section>

      <div className="wrap">
        <div className={styles.detailGrid}>
          <div className={styles.detailBody}>
            <p className={styles.detailIntro}>{project.intro[lang]}</p>
            {project.paragraphs.map((para, i) => (
              <p key={i}>{para[lang]}</p>
            ))}
            <Link to={to('spaces')} className={styles.backLink}>{t('detail.backLink')}</Link>
          </div>
          <aside className={styles.detailSpecs}>
            {project.specs.map((spec, i) => (
              <div className={styles.specRow} key={i}>
                <span>{spec.k[lang]}</span>
                <span>{spec.v[lang]}</span>
              </div>
            ))}
          </aside>
        </div>
        <div className={styles.swatchRow}>
          {project.swatches.map((sw, i) => (
            <div key={i} className={`${styles.detailSwatch} ${textures[sw]}`} />
          ))}
        </div>
      </div>

      <CtaSection eyebrow={t('detail.ctaEyebrow')} title={t('detail.ctaTitle')} />
    </div>
  );
}
