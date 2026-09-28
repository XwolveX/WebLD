import { Fragment, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext.jsx';
import { useReveal } from '../hooks/useReveal.js';
import { useMagnetic } from '../hooks/useMagnetic.js';
import { useTilt } from '../hooks/useTilt.js';
import { useStatCounters } from '../hooks/useStatCounters.js';
import { useDragCarousel } from '../hooks/useDragCarousel.js';
import { useHero3D } from '../hooks/useHero3D.js';
import { usePreloader } from '../hooks/usePreloader.js';
import SectionDots from '../components/SectionDots.jsx';
import Preloader from '../components/Preloader.jsx';
import ProcessList from '../components/ProcessList.jsx';
import CtaSection from '../components/CtaSection.jsx';
import textures from '../styles/textures.module.css';
import styles from './Home.module.css';

const DOT_SECTIONS = [
  { id: 'heroSection', label: 'Trang chủ' },
  { id: 'collections', label: 'Không gian' },
  { id: 'materials', label: 'Chất liệu' },
  { id: 'process', label: 'Quy trình' },
  { id: 'cta-final', label: 'Kết nối' },
];

const HEADLINE = {
  vi: [
    { t: 'Cuộc' }, { t: 'sống' }, { t: 'được', br: true },
    { t: 'tạo', em: true }, { t: 'tác', em: true }, { t: 'từ' }, { t: 'chất' }, { t: 'liệu' },
  ],
  en: [
    { t: 'Life' }, { t: 'is', br: true },
    { t: 'crafted', em: true }, { t: 'from', em: true }, { t: 'materials' },
  ],
};

const PANELS = [
  { id: 'meridian', scene: 'sceneMeridian', numKey: 'index.panel1Num', titleKey: 'index.panel1Title', descKey: 'index.panel1Desc' },
  { id: 'solstice', scene: 'sceneSolstice', numKey: 'index.panel2Num', titleKey: 'index.panel2Title', descKey: 'index.panel2Desc' },
  { id: 'atelier', scene: 'sceneAtelier', numKey: 'index.panel3Num', titleKey: 'index.panel3Title', descKey: 'index.panel3Desc' },
];

const SWATCHES = [
  { cls: 'swA', tex: 'A' }, { cls: 'swB', tex: 'B' }, { cls: 'swC', tex: 'C' }, { cls: 'swD', tex: 'D' }, { cls: 'swE', tex: 'E' },
];

const PROCESS_KEYS = ['1', '2', '3', '4'];

export default function Home() {
  const { t, lang, to } = useI18n();
  const containerRef = useRef(null);
  const wordsRef = useRef(null);
  const fadeInRef = useRef(null);
  const ornamentRef = useRef(null);
  const galleryViewportRef = useRef(null);
  const statsRef = useRef(null);

  const { showPreloader, pct, pathRef } = usePreloader(wordsRef, fadeInRef);

  useReveal(containerRef);
  useMagnetic(containerRef);
  useTilt(containerRef);
  useStatCounters(statsRef);
  const gallery = useDragCarousel(galleryViewportRef, styles.dragging);
  useHero3D(ornamentRef);

  return (
    <div ref={containerRef}>
      {showPreloader && <Preloader pct={pct} pathRef={pathRef} done={!showPreloader} />}

      <SectionDots sections={DOT_SECTIONS} />

      <section className={styles.hero} id="heroSection">
        <div className={styles.glow} />
        <div className={styles.ornament} ref={ornamentRef}>
          <div className={styles.facet} data-facet />
          <div className={styles.facet} data-facet />
          <div className={styles.facet} data-facet />
        </div>
        <div className={styles.content}>
          <span className="eyebrow on-dark">{t('index.heroEyebrow')}</span>
          <h1 className={styles.headline} ref={wordsRef}>
            {HEADLINE[lang].map((w, i) => (
              <Fragment key={i}>
                <span className={styles.word}><span>{w.em ? <em>{w.t}</em> : w.t}</span></span>
                {w.br ? <br /> : ' '}
              </Fragment>
            ))}
          </h1>
          <div ref={fadeInRef}>
            <p className={styles.sub}>{t('index.heroSub')}</p>
            <div className={styles.ctaRow}>
              <Link to={to('contact')} className="btn-primary magnetic">{t('index.heroCtaPrimary')}</Link>
              <a href="#collections" className="btn-ghost magnetic">{t('index.heroCtaGhost')}</a>
            </div>
          </div>
        </div>
        <div className={styles.scrollCue}><span>{t('index.scrollCue')}</span><div className={styles.scrollLine} /></div>
      </section>

      <div className={styles.marqueeStrip}>
        <div className={styles.marqueeTrack}>
          {[0, 1].map((rep) => (
            <span key={rep}>
              <span>Gỗ óc chó</span><span>Đồng chải xước</span><span>Đá cẩm thạch xanh</span><span>Da thuộc Ý</span><span>Vải lanh tự nhiên</span>
            </span>
          ))}
        </div>
      </div>

      <section className={styles.philosophy}>
        <div className="wrap">
          <span className="eyebrow reveal" style={{ display: 'block', marginBottom: 22 }}>{t('index.philosophyEyebrow')}</span>
          <div className={`${styles.quoteMark} reveal`}>&quot;</div>
          <blockquote
            className={`${styles.quote} reveal`}
            dangerouslySetInnerHTML={{ __html: t('index.philosophyQuote') }}
          />
          <div className={`${styles.divider} reveal`} />
        </div>
      </section>

      <section className={styles.hgallery} id="collections">
        <div className="wrap">
          <div className={`${styles.hgalleryHead} reveal`}>
            <div>
              <span className="eyebrow on-dark">{t('index.collectionsEyebrow')}</span>
              <h2>{t('index.collectionsTitle')}</h2>
            </div>
            <div className={styles.hgalleryControls}>
              <span className={styles.hgalleryCount}>
                {String(gallery.active + 1).padStart(2, '0')} / {String(gallery.count).padStart(2, '0')}
              </span>
              <button type="button" className={styles.hgalleryArrow} aria-label={t('common.prev')} onClick={gallery.prev} disabled={gallery.active === 0}>
                <svg viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button type="button" className={styles.hgalleryArrow} aria-label={t('common.next')} onClick={gallery.next} disabled={gallery.active >= gallery.count - 1}>
                <svg viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.hgalleryViewport} ref={galleryViewportRef}>
          <div className={styles.hgalleryTrack}>
            {PANELS.map((p) => (
              <Link to={to('project', p.id)} className={styles.hpanel} key={p.id} data-hpanel>
                <div className={`${styles.hpanelBg} ${textures[p.scene]}`} />
                <div className={styles.hpanelText}>
                  <span className={styles.spaceNum}>{t(p.numKey)}</span>
                  <h3>{t(p.titleKey)}</h3>
                  <p>{t(p.descKey)}</p>
                  <span className={styles.spaceLink}>{t('common.viewDetails')}</span>
                </div>
              </Link>
            ))}
            <Link to={to('spaces')} className={`${styles.hpanel} ${styles.hpanelEnd}`} data-hpanel data-hpanel-end>
              <div className={styles.hpanelText}>
                <span className="eyebrow on-dark" style={{ marginBottom: 18 }}>{t('index.panelEndEyebrow')}</span>
                <h3>{t('index.panelEndTitle')}</h3>
                <span className="btn-primary" style={{ marginTop: 28, display: 'inline-block' }}>{t('index.panelEndBtn')}</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.stats} ref={statsRef}>
        <div className="wrap">
          <div className={styles.statsGrid}>
            <div className="reveal"><div className={styles.statNum} data-stat data-count="14">0</div><div className={styles.statLabel}>{t('index.statLabel1')}</div></div>
            <div className="reveal r1"><div className={styles.statNum} data-stat data-count="360">0</div><div className={styles.statLabel}>{t('index.statLabel2')}</div></div>
            <div className="reveal r2"><div className={styles.statNum} data-stat data-count="98">0</div><div className={styles.statLabel}>{t('index.statLabel3')}</div></div>
          </div>
        </div>
      </section>

      <section id="materials">
        <div className="wrap">
          <div className="section-head">
            <h2 className="reveal clip-reveal">{t('index.materialsTitle')}</h2>
            <p className={`section-note reveal ${styles.materialsNote}`}>
              {t('index.materialsNote')} <Link to={to('materials')}>{t('index.materialsNoteLink')}</Link>
            </p>
          </div>
          <div className={styles.swatchGrid}>
            {SWATCHES.map((s, i) => (
              <div className={`${styles.swatch} reveal ${i ? `r${i}` : ''}`} key={s.tex} data-tilt>
                <div className={`${styles.swatchFill} ${styles[s.cls]}`} />
                <div className={styles.swatchLabel}>
                  <span>{t(`index.swatch${s.tex}`)}</span>
                  <small>{t(`index.swatch${s.tex}Sub`)}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process">
        <div className="wrap">
          <div className="section-head">
            <h2 className="reveal clip-reveal">{t('index.processTitle')}</h2>
            <p className="section-note reveal">{t('index.processNote')}</p>
          </div>
          <ProcessList items={PROCESS_KEYS.map((n) => ({
            num: `0${n}`,
            title: t(`index.process${n}Title`),
            desc: t(`index.process${n}Desc`),
          }))} />
        </div>
      </section>

      <CtaSection id="cta-final" eyebrow={t('common.ctaFooterEyebrowGeneric')} title={t('index.ctaTitle')} />
    </div>
  );
}
