import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';
import Spaces from './pages/Spaces.jsx';
import Materials from './pages/Materials.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import NotFound from './pages/NotFound.jsx';
import { LANGS, routePattern } from './routes.js';

const PAGES = {
  home: Home,
  spaces: Spaces,
  materials: Materials,
  about: About,
  contact: Contact,
  project: ProjectDetail,
};

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {LANGS.flatMap((lang) =>
          Object.entries(PAGES).map(([page, Page]) => (
            <Route key={`${lang}-${page}`} path={routePattern(page, lang)} element={<Page />} />
          )),
        )}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
