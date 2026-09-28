import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext.jsx';

const COPY = {
  vi: { title: 'Không tìm thấy trang', body: 'Đường dẫn này không tồn tại hoặc đã được chuyển đi nơi khác.', back: 'Về trang chủ' },
  en: { title: 'Page not found', body: 'This link does not exist or has moved elsewhere.', back: 'Back to home' },
};

export default function NotFound() {
  const { lang, to } = useI18n();
  const c = COPY[lang];

  return (
    <div className="wrap" style={{ padding: '200px 0 140px', textAlign: 'center' }}>
      <h1>{c.title}</h1>
      <p style={{ margin: '18px 0 32px' }}>{c.body}</p>
      <Link to={to('home')} className="btn-primary">{c.back}</Link>
    </div>
  );
}
