# MỘC ĐỒNG — Website demo

Website tĩnh (HTML/CSS/JS thuần, không cần Node/PHP để chạy) cho concept
thương hiệu nội thất "MỘC ĐỒNG". Toàn bộ hình ảnh chất liệu (vân gỗ, đá,
đồng...) được dựng bằng SVG filter, không dùng ảnh chụp thật — xem mục
"Thay bằng ảnh thật" bên dưới trước khi đưa vào sử dụng chính thức.

## Cấu trúc thư mục

```
moc-dong-site/
├── index.html              Trang chủ (hero 3D, gallery ghim ngang, preloader)
├── khong-gian.html         Danh sách dự án, lọc theo hạng mục
├── du-an-chi-tiet.html     Trang chi tiết — render động theo ?id=
├── chat-lieu.html          Thư viện chất liệu
├── ve-chung-toi.html       Câu chuyện thương hiệu, timeline, đội ngũ
├── lien-he.html            Thông tin liên hệ + form
├── assets/
│   ├── css/style.css       Toàn bộ style dùng chung
│   └── js/
│       ├── main.js         Toàn bộ hành vi tương tác dùng chung
│       └── data.js         Dữ liệu 6 dự án cho trang chi tiết
└── README.md                File này
```

Mọi trang dùng chung `assets/css/style.css` và `assets/js/main.js` — sửa
một nơi, áp dụng cho toàn site. `main.js` tự kiểm tra phần tử có tồn tại
trên trang hay không trước khi chạy từng tính năng (preloader, 3D, gallery
ghim ngang...) nên không lỗi khi thiếu phần tử ở trang khác.

## Thêm một dự án mới (không cần tạo file HTML mới)

Mở `assets/js/data.js`, thêm một khoá mới vào `PROJECT_DATA`, ví dụ:

```js
myproject: {
  num: '07', title: 'BST Tên mới', category: 'Phòng khách',
  texture: 'tex-walnut',
  intro: '...',
  paragraphs: ['...', '...'],
  specs: [{k:'Diện tích đề xuất', v:'...'}],
  swatches: ['tex-walnut','tex-linen']
}
```

Sau đó trỏ link tới `du-an-chi-tiet.html?id=myproject`. Nếu muốn dự án này
xuất hiện trong danh sách ở `khong-gian.html`, thêm một thẻ `<a class="project-card">`
mới trong file đó (copy một thẻ có sẵn và đổi nội dung).

## Xem thử trên máy (local)

Vì các trang dùng đường dẫn tương đối (`assets/...`) và `fetch` các thư
viện từ CDN, nên mở trực tiếp bằng cách double-click file `index.html`
thường vẫn chạy được, nhưng để chắc chắn giống môi trường thật, nên chạy
qua một server tĩnh đơn giản:

```bash
cd moc-dong-site
python3 -m http.server 8080
# rồi mở http://localhost:8080
```

## Deploy lên VPS (Ubuntu + Nginx + HTTPS)

Đây là các bước cơ bản nhất cho một VPS Ubuntu mới:

```bash
# 1. Cài Nginx
sudo apt update && sudo apt install nginx -y

# 2. Copy toàn bộ thư mục moc-dong-site lên VPS, ví dụ bằng scp từ máy bạn:
scp -r moc-dong-site user@your-vps-ip:/var/www/mocdong

# 3. Tạo file cấu hình site
sudo nano /etc/nginx/sites-available/mocdong
```

Nội dung file cấu hình:

```nginx
server {
    listen 80;
    server_name mocdong.vn www.mocdong.vn;
    root /var/www/mocdong;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~* \.(css|js)$ {
        expires 30d;
        add_header Cache-Control "public";
    }
}
```

```bash
# 4. Kích hoạt site
sudo ln -s /etc/nginx/sites-available/mocdong /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# 5. Trỏ domain (bản ghi A) về IP của VPS, sau đó bật HTTPS miễn phí:
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d mocdong.vn -d www.mocdong.vn
```

Vì site hoàn toàn tĩnh, bạn cũng có thể deploy tương đương trên bất kỳ
static host nào khác (Netlify, Vercel, Cloudflare Pages) nếu sau này
muốn bỏ qua việc tự quản lý VPS.

## Kết nối form liên hệ (quan trọng, làm trước khi dùng thật)

Form ở `lien-he.html` hiện chỉ kiểm tra dữ liệu hợp lệ phía trình duyệt —
**chưa gửi đi đâu cả**. Trước khi đưa vào sử dụng thật, chọn một trong các
cách sau:

1. **Dịch vụ nhận form có sẵn** (nhanh nhất, không cần code backend):
   đăng ký tài khoản miễn phí ở Formspree hoặc Web3Forms, họ sẽ cho một
   endpoint — đổi `id="contactForm"` thành gửi `fetch()` tới endpoint đó
   trong `main.js`, hoặc dùng thẻ `<form action="...">` theo hướng dẫn
   của dịch vụ.
2. **Backend riêng trên VPS**: viết một endpoint nhỏ (Node/PHP/Python)
   nhận POST từ form và gửi email qua SMTP, rồi gọi endpoint đó bằng
   `fetch()` trong hàm xử lý submit ở `main.js`.

## Thay bằng ảnh thật

Toàn bộ "ảnh" chất liệu trong bản demo (vân gỗ, đá, đồng...) là SVG filter
mô phỏng — dùng để demo bố cục và không khí thương hiệu mà không phụ
thuộc ảnh có bản quyền. Khi có ảnh sản phẩm/công trình thật, thay các
`<div class="tex-xxx">` bằng `<img>` hoặc `background-image` trỏ tới ảnh
thật, độ sang trọng sẽ tăng thêm một bậc so với bản demo này.

## Thư viện bên thứ ba dùng trong site

- [GSAP + ScrollTrigger](https://gsap.com/) — animation, hiệu ứng cuộn
- [Three.js](https://threejs.org/) — khối 3D trong hero trang chủ
- [Lenis](https://github.com/darkroomengineering/lenis) — smooth scroll

Cả ba đều tải qua CDN công khai (cdnjs, jsDelivr) — cần kết nối internet
khi người dùng mở site. Nếu muốn tự host để không phụ thuộc CDN ngoài,
tải các file `.min.js` tương ứng về `assets/vendor/` và đổi lại đường dẫn
`<script src="...">` trong từng trang HTML.
