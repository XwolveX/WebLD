import { useRef } from 'react';
import { useI18n } from '../i18n/I18nContext.jsx';
import { useReveal } from '../hooks/useReveal.js';
import { useMagnetic } from '../hooks/useMagnetic.js';
import { useContactForm } from '../hooks/useContactForm.js';
import PageHero from '../components/PageHero.jsx';
import styles from './Contact.module.css';

function cx(...parts) { return parts.filter(Boolean).join(' '); }

export default function Contact() {
  const { t } = useI18n();
  const containerRef = useRef(null);
  useReveal(containerRef);
  useMagnetic(containerRef);
  const { invalidFields, submitted, handleSubmit } = useContactForm();

  return (
    <div ref={containerRef}>
      <PageHero
        variant="contact"
        crumbLabel={t('common.navContact')}
        title={t('contact.h1')}
        sub={t('contact.sub')}
      />

      <section className="section-tight">
        <div className="wrap">
          <div className={styles.contactGrid}>

            <div className="reveal">
              <div className={styles.infoRow}>
                <span className={styles.ciLabel}>{t('contact.labelWorkshop')}</span>
                <span className={styles.ciValue}>
                  <span dangerouslySetInnerHTML={{ __html: t('contact.valueWorkshop') }} />
                  <small>{t('contact.valueWorkshopSmall')}</small>
                </span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.ciLabel}>{t('contact.labelPhone')}</span>
                <span className={styles.ciValue}>{t('contact.valuePhone')}<small>{t('contact.valuePhoneSmall')}</small></span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.ciLabel}>{t('contact.labelEmail')}</span>
                <span className={styles.ciValue}>{t('contact.valueEmail')}<small>{t('contact.valueEmailSmall')}</small></span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.ciLabel}>{t('contact.labelSocial')}</span>
                <span className={styles.ciValue}>{t('contact.valueSocial')}<small>{t('contact.valueSocialSmall')}</small></span>
              </div>

              <iframe
                className={`${styles.mapFrame} reveal`}
                loading="lazy"
                title="Bản đồ khu vực xưởng L&D Ceramics"
                src="https://www.openstreetmap.org/export/embed.html?bbox=106.7130585%2C10.7645616%2C106.7330585%2C10.7805616&layer=mapnik&marker=10.7725616%2C106.7230585"
              />
            </div>

            <div className="reveal r1">
              <form noValidate onSubmit={handleSubmit}>
                <div className={styles.formRow2}>
                  <div className={cx(styles.formField, invalidFields.name && styles.invalid)}>
                    <label htmlFor="fName">{t('contact.fieldName')}</label>
                    <input type="text" id="fName" name="name" required />
                    <span className={styles.formError}>{t('contact.errName')}</span>
                  </div>
                  <div className={cx(styles.formField, invalidFields.phone && styles.invalid)}>
                    <label htmlFor="fPhone">{t('contact.fieldPhone')}</label>
                    <input type="tel" id="fPhone" name="phone" required />
                    <span className={styles.formError}>{t('contact.errPhone')}</span>
                  </div>
                </div>
                <div className={cx(styles.formField, invalidFields.email && styles.invalid)}>
                  <label htmlFor="fEmail">{t('contact.fieldEmail')}</label>
                  <input type="email" id="fEmail" name="email" required />
                  <span className={styles.formError}>{t('contact.errEmail')}</span>
                </div>
                <div className={styles.formField}>
                  <label htmlFor="fInterest">{t('contact.fieldInterest')}</label>
                  <select id="fInterest" name="interest">
                    <option>{t('spaces.filterLiving')}</option>
                    <option>{t('spaces.filterBedroom')}</option>
                    <option>{t('spaces.filterDining')}</option>
                    <option>{t('spaces.filterWork')}</option>
                    <option>{t('spaces.filterOutdoor')}</option>
                    <option>{t('contact.interestUnsure')}</option>
                  </select>
                </div>
                <div className={cx(styles.formField, invalidFields.message && styles.invalid)}>
                  <label htmlFor="fMessage">{t('contact.fieldMessage')}</label>
                  <textarea id="fMessage" name="message" required placeholder={t('contact.messagePlaceholder')} />
                  <span className={styles.formError}>{t('contact.errMessage')}</span>
                </div>
                <button type="submit" className="btn-primary magnetic" style={{ cursor: 'pointer' }}>{t('contact.submitBtn')}</button>
                <div className={cx(styles.formSuccess, submitted && styles.show)}>{t('contact.successMessage')}</div>
                <div className={styles.formNote}>{t('contact.formNote')}</div>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
