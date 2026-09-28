import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext.jsx';
import styles from './Footer.module.css';

export default function Footer() {
  const { t, to } = useI18n();

  return (
    <footer className={styles.footer}>
      <div className={styles.watermark} aria-hidden="true">L&amp;D</div>
      <div className="wrap">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <span className={styles.logoText}>L&amp;D CERAMICS</span>
            <p>{t('common.footerBrandDesc')}</p>
          </div>
          <div className={styles.col}>
            <h4>{t('common.footerExploreTitle')}</h4>
            <Link to={to('spaces')}>{t('common.footerLinkSpaces')}</Link>
            <Link to={to('materials')}>{t('common.footerLinkMaterials')}</Link>
            <Link to={to('about')}>{t('common.footerLinkAbout')}</Link>
          </div>
          <div className={styles.col}>
            <h4>{t('common.footerCompanyTitle')}</h4>
            <Link to={to('about')}>{t('common.footerLinkStory')}</Link>
            <Link to={to('spaces')}>{t('common.footerLinkProjects')}</Link>
            <Link to={to('contact')}>{t('common.footerLinkCareers')}</Link>
          </div>
          <div className={styles.col}>
            <h4>{t('common.footerContactTitle')}</h4>
            <Link to={to('contact')}>{t('common.footerLinkWorkshop')}</Link>
            <a href="mailto:hello@lndceramics.com">hello@lndceramics.com</a>
            <a href="tel:+842838000000">028 3xxx xxxx</a>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>{t('common.footerCopyright')}</span>
          <span>{t('common.footerCredit')}</span>
        </div>
      </div>
    </footer>
  );
}
