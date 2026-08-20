# Mobile App Portfolio

Portfolio tĩnh viết bằng HTML, CSS và JavaScript thuần. Website không cần cài dependency hoặc chạy bước build, phù hợp để deploy trực tiếp lên GitHub Pages.

## Chỉnh sửa nội dung

Toàn bộ tên, email, link mạng xã hội và danh sách ứng dụng nằm trong `js/site-data.js`.

Để thêm ứng dụng mới, copy một object trong mảng `apps` rồi thay đổi các trường:

```js
{
  name: "Tên ứng dụng",
  description: "Mô tả ứng dụng",
  status: "Đang phát triển",
  statusColor: "#f59e42",
  tags: ["Flutter", "iOS & Android"],
  icon: "spark", // spark | layers | orbit
  accent: "#655cf6",
  background: "#eceaff",
  screenBackground: "#f7f6ff",
  storeUrl: "https://play.google.com/store/apps/details?id=APP_ID",
}
```

### Thêm screenshot cho modal

App có trường `screenshots` sẽ tự động có thể click để mở gallery. Đặt ảnh vào thư mục `assets/screenshots/` và cập nhật đường dẫn:

```js
screenshots: [
  { src: "assets/screenshots/app-01/home.png", alt: "Màn hình trang chủ" },
  { src: "assets/screenshots/app-01/detail.png", alt: "Màn hình chi tiết" },
]
```

Để `src: ""` nếu muốn tiếp tục hiển thị khung mobile màu trắng.

Người xem có thể click từng screenshot trong gallery để mở ảnh lớn. Trường `storeUrl` sẽ tạo nút Google Play ở cả card ứng dụng và gallery.

## Xem website ở máy local

Có thể mở thẳng `index.html`, hoặc chạy một static server trong thư mục project:

```bash
python3 -m http.server 8080
```

Sau đó truy cập `http://localhost:8080`.

## Deploy GitHub Pages

GitHub Pages hỗ trợ đầy đủ nhiều file và thư mục. Project này đã có workflow `.github/workflows/deploy.yml` để tự động deploy toàn bộ static site.

1. Tạo repository mới trên GitHub.
2. Push source code lên branch `main`.
3. Vào **Settings → Pages**.
4. Tại **Build and deployment → Source**, chọn **GitHub Actions**.
5. Mỗi lần push lên `main`, workflow sẽ tự deploy phiên bản mới.

URL mặc định sẽ có dạng `https://USERNAME.github.io/REPOSITORY/`. Tất cả đường dẫn trong project đều là đường dẫn tương đối nên hoạt động đúng cả ở domain gốc lẫn sub-folder này.
