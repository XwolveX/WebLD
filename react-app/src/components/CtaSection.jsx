import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext.jsx';
import styles from './CtaSection.module.css';

export default function CtaSection({ eyebrow, title, id }) {
  const { t, to } = useI18n();

  return (
    <section className={styles.cta} id={id}>
      <div className="wrap reveal">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <Link to={to('contact')} className="btn-primary magnetic">{t('common.ctaFooterBtn')}</Link>
      </div>
    </section>
  );
}
