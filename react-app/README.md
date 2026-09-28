# L&D Ceramics — website (React)

Vite + React 18 + React Router. Mọi trang được **prerender thành HTML tĩnh** khi build
(để Google đọc được nội dung, có meta/hreflang/JSON-LD riêng từng trang), sau đó React
"hydrate" lên để chạy animation và tương tác.

## Lệnh

```bash
npm install
npm run dev       # dev server (không prerender)
npm run build     # build client + server bundle + prerender ra dist/
npm run preview   # chạy thử dist/ tại http://localhost:4173
npm run og        # dựng lại public/og-image.png (ảnh chia sẻ 1200x630)
```

## Trước khi lên production

1. Đặt domain thật khi build (canonical, hreflang, Open Graph, sitemap đều dùng nó):
   ```bash
   VITE_SITE_URL=https://ten-mien-that.vn npm run build
   ```
   Hoặc tạo file `.env.production` với `VITE_SITE_URL=...`. Mặc định là `https://lndceramics.com`.
2. Thay `public/og-image.png` bằng ảnh công trình thật khi có (1200×630).
3. Sau khi deploy: gửi `https://<domain>/sitemap.xml` vào Google Search Console.

## URL

| Trang | Tiếng Việt | English |
|---|---|---|
| Trang chủ | `/` | `/en/` |
| Không gian | `/khong-gian` | `/en/spaces` |
| Chất liệu | `/chat-lieu` | `/en/materials` |
| Về chúng tôi | `/ve-chung-toi` | `/en/about` |
| Liên hệ | `/lien-he` | `/en/contact` |
| Dự án | `/du-an/:id` | `/en/projects/:id` |

Ngôn ngữ nằm trong URL (không lưu localStorage), nên mỗi bản là một trang riêng có thể index.
Bảng URL nằm ở `src/routes.js`; meta từng trang ở `src/seo/meta.js`.

## Thêm dự án mới

1. Thêm một khoá vào `src/data/projects.js`.
2. Thêm thẻ tương ứng vào `CARDS` trong `src/pages/Spaces.jsx` (và bản dịch tiêu đề trong `translations.js`).
3. `npm run build` — trang, sitemap và meta SEO tự sinh.

## Deploy (Nginx, static)

Trỏ `root` vào thư mục `dist/`:

```nginx
server {
    listen 80;
    server_name ten-mien-that.vn;
    root /var/www/ld-ceramics/dist;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
    error_page 404 /404.html;

    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Dùng `=404` (không fallback về `index.html`) để URL sai trả đúng mã 404 thay vì "soft 404".
Cloudflare Pages / Netlify / Vercel: build command `npm run build`, output `dist`
(các host này tự dùng `404.html`).
