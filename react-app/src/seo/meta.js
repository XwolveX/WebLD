import { PROJECT_DATA } from '../data/projects.js';
import { I18N } from '../i18n/translations.js';
import { LANGS, DEFAULT_LANG, pathFor } from '../routes.js';
import { SITE_URL, SITE_NAME, OG_IMAGE_PATH, OG_IMAGE_SIZE, CONTACT_EMAIL } from './site.js';

const PAGE_META = {
  home: {
    title: {
      vi: 'L&D Ceramics — Nội thất may đo thủ công từ gỗ, đồng và đá',
      en: 'L&D Ceramics — Bespoke handcrafted furniture in wood, bronze and stone',
    },
    description: {
      vi: 'L&D Ceramics kiến tạo nội thất từ gỗ óc chó, đồng chải xước và đá tự nhiên — nội thất may đo cho không gian sống thượng lưu. Đặt lịch tư vấn miễn phí.',
      en: 'L&D Ceramics crafts bespoke furniture from walnut, brushed bronze and natural stone for refined living spaces. Book a free consultation.',
    },
  },
  spaces: {
    title: {
      vi: 'Không gian & dự án nội thất may đo | L&D Ceramics',
      en: 'Interior spaces & projects | L&D Ceramics',
    },
    description: {
      vi: 'Khám phá các bộ sưu tập nội thất của L&D Ceramics cho phòng khách, phòng ngủ, phòng ăn, không gian làm việc và ngoài trời.',
      en: 'Explore L&D Ceramics collections for living rooms, bedrooms, dining rooms, workspaces and outdoor living.',
    },
  },
  materials: {
    title: {
      vi: 'Thư viện chất liệu: gỗ óc chó, đồng, đá, da Ý | L&D Ceramics',
      en: 'Material library: walnut, bronze, stone, Italian leather | L&D Ceramics',
    },
    description: {
      vi: 'Gỗ óc chó, đồng chải xước, đá cẩm thạch xanh, da thuộc Ý và vải lanh tự nhiên — mỗi chất liệu được kiểm định thủ công trước khi sản xuất.',
      en: 'Walnut wood, brushed bronze, green marble, Italian leather and natural linen — every material is hand-inspected before production.',
    },
  },
  about: {
    title: {
      vi: 'Về chúng tôi — câu chuyện thương hiệu | L&D Ceramics',
      en: 'About us — our story | L&D Ceramics',
    },
    description: {
      vi: 'Hành trình, giá trị cốt lõi và đội ngũ đứng sau L&D Ceramics — thương hiệu nội thất chế tác thủ công, Life & Design.',
      en: 'The journey, core values and people behind L&D Ceramics — a handcrafted furniture house built on Life & Design.',
    },
  },
  contact: {
    title: {
      vi: 'Liên hệ & đặt lịch tư vấn | L&D Ceramics',
      en: 'Contact & book a consultation | L&D Ceramics',
    },
    description: {
      vi: 'Đặt lịch tư vấn miễn phí hoặc ghé xưởng L&D Ceramics tại An Khánh, TP.HCM để chạm vào từng mẫu chất liệu thật.',
      en: 'Book a free consultation or visit the L&D Ceramics workshop in An Khanh, Ho Chi Minh City to see the real material samples.',
    },
  },
};

const NAV_KEY = {
  spaces: 'navSpaces',
  materials: 'navMaterials',
  about: 'navAbout',
  contact: 'navContact',
};

const abs = (path) => `${SITE_URL}${path}`;

function organization(lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FurnitureStore',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: 'L&D Ceramics — Life & Design',
    url: abs(pathFor('home', DEFAULT_LANG)),
    image: abs(OG_IMAGE_PATH),
    description: PAGE_META.home.description[lang],
    email: CONTACT_EMAIL,
    areaServed: 'VN',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'An Khánh',
      addressLocality: 'Ho Chi Minh City',
      addressCountry: 'VN',
    },
  };
}

function breadcrumbs(lang, page, leafName) {
  const items = [{ name: I18N.common.breadcrumbHome[lang], path: pathFor('home', lang) }];
  if (page === 'project') {
    items.push({ name: I18N.common[NAV_KEY.spaces][lang], path: pathFor('spaces', lang) });
  }
  if (page !== 'home') items.push({ name: leafName, path: null });
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      ...(it.path ? { item: abs(it.path) } : {}),
    })),
  };
}

/* route = { lang, page, id }. Unknown pages / project ids get a noindex 404. */
export function getMeta({ lang, page, id }) {
  const project = page === 'project' ? PROJECT_DATA[id] : null;
  const known = page && (page !== 'project' || project);

  if (!known) {
    return {
      lang,
      page: null,
      title: lang === 'en' ? `Page not found | ${SITE_NAME}` : `Không tìm thấy trang | ${SITE_NAME}`,
      description: '',
      path: pathFor('home', lang),
      canonical: null,
      alternates: [],
      image: abs(OG_IMAGE_PATH),
      type: 'website',
      noindex: true,
      jsonLd: [],
    };
  }

  const path = pathFor(page, lang, id);
  const alternates = LANGS.map((l) => ({ hreflang: l, href: abs(pathFor(page, l, id)) }));
  alternates.push({ hreflang: 'x-default', href: abs(pathFor(page, DEFAULT_LANG, id)) });

  let title;
  let description;
  let leafName;
  const jsonLd = [];

  if (project) {
    title = `${project.title[lang]} — ${project.category[lang]} | ${SITE_NAME}`;
    description = project.intro[lang];
    leafName = project.title[lang];
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.title[lang],
      description: project.intro[lang],
      url: abs(path),
      image: abs(OG_IMAGE_PATH),
      inLanguage: lang,
      genre: project.category[lang],
      material: project.specs[1]?.v[lang],
      creator: { '@id': `${SITE_URL}/#organization` },
      publisher: { '@id': `${SITE_URL}/#organization` },
    });
  } else {
    title = PAGE_META[page].title[lang];
    description = PAGE_META[page].description[lang];
    leafName = NAV_KEY[page] ? I18N.common[NAV_KEY[page]][lang] : '';
  }

  if (page === 'home') {
    jsonLd.push(organization(lang), {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: abs(path),
      inLanguage: lang,
      publisher: { '@id': `${SITE_URL}/#organization` },
    });
  } else {
    jsonLd.push(breadcrumbs(lang, page, leafName));
  }

  return {
    lang,
    page,
    title,
    description,
    path,
    canonical: abs(path),
    alternates,
    image: abs(OG_IMAGE_PATH),
    type: 'website',
    noindex: false,
    jsonLd,
  };
}

export { OG_IMAGE_SIZE };
