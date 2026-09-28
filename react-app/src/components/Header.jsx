import { useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext.jsx';
import { useStickyHeader } from '../hooks/useStickyHeader.js';
import { useMobileNav } from '../hooks/useMobileNav.js';
import { useMagnetic } from '../hooks/useMagnetic.js';
import styles from './Header.module.css';

const NAV_ITEMS = [
  { page: 'home', key: 'common.navHome' },
  { page: 'spaces', key: 'common.navSpaces' },
  { page: 'materials', key: 'common.navMaterials' },
  { page: 'about', key: 'common.navAbout' },
  { page: 'contact', key: 'common.navContact' },
];

export default function Header() {
  const { t, lang, toggleLang, to } = useI18n();
  const scrolled = useStickyHeader(40);
  const { open, toggle, close } = useMobileNav();
  const navRef = useRef(null);
  useMagnetic(navRef);

  const navLinkClass = ({ isActive }) => [isActive ? styles.current : ''].filter(Boolean).join(' ');

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav} ref={navRef}>
        <Link to={to('home')} className={styles.logoMark} onClick={close}>
          <svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" strokeWidth="0.7" /><path d="M13,27 L13,13 L20,24 L27,13 L27,27" strokeWidth="1.1" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span><span className={styles.logoText}>L&amp;D CERAMICS</span><span className={styles.logoSub}>唯美陶瓷 · Life &amp; Design</span></span>
        </Link>

        <div className={`${styles.navLinks} ${open ? styles.navLinksOpen : ''}`}>
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.page} to={to(item.page)} end={item.page === 'home'} className={navLinkClass} onClick={close}>
              {t(item.key)}
            </NavLink>
          ))}
        </div>

        <div className={styles.navRight}>
          <button
            className={styles.langToggle}
            data-active={lang}
            type="button"
            aria-label="Switch language / Chuyển ngôn ngữ"
            onClick={toggleLang}
          >
            <span className={styles.langOpt} data-lang-opt="vi">VI</span>
            <span className={styles.langOpt} data-lang-opt="en">EN</span>
          </button>
          <NavLink to={to('contact')} className={`${styles.navCta} magnetic`}>{t('common.navCta')}</NavLink>
        </div>

        <button className={styles.burger} type="button" aria-label="Menu" onClick={toggle}>
          <span /><span /><span />
        </button>
      </nav>
    </header>
  );
}
