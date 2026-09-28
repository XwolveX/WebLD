import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App.jsx';
import { I18nProvider } from './i18n/I18nContext.jsx';
import { PROJECT_DATA } from './data/projects.js';
import { listRoutes, parseRoute } from './routes.js';
import { getMeta } from './seo/meta.js';
import { serializeHead } from './seo/head.js';
import { SITE_URL } from './seo/site.js';

export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <I18nProvider>
        <App />
      </I18nProvider>
    </StaticRouter>,
  );
}

export function routes() {
  return listRoutes(Object.keys(PROJECT_DATA));
}

export function headFor(url) {
  return serializeHead(getMeta(parseRoute(url)));
}

export { SITE_URL };
