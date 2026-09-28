import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext.jsx';
import styles from './PageHero.module.css';

/* Shared subpage hero: breadcrumb + h1 + intro line, with a variant-based
   background photo (spaces / materials / story / contact). */
export default function PageHero({ variant, crumbLabel, title, sub, titleHtml }) {
  const { t, to } = useI18n();

  return (
    <section className={`${styles.pageHero} ${styles.photo} ${styles[variant]}`}>
      <div className={`wrap ${styles.inner}`}>
        <div className={`${styles.breadcrumb} reveal`}>
          <Link to={to('home')}>{t('common.breadcrumbHome')}</Link> / <span>{crumbLabel}</span>
        </div>
        {titleHtml ? (
          <h1 className="reveal r1" dangerouslySetInnerHTML={{ __html: titleHtml }} />
        ) : (
          <h1 className="reveal r1">{title}</h1>
        )}
        <p className={`${styles.sub} reveal r2`}>{sub}</p>
      </div>
    </section>
  );
}
