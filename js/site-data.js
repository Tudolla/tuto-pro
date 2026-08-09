/*
 * Chỉnh sửa nội dung website tại đây.
 * Để thêm app mới: copy một object trong mảng `apps`, đổi nội dung và màu sắc.
 */
window.portfolioData = {
  profile: {
    name: "Tứ Nguyễn",
    initials: "TV",
    email: "eduino.info@gmail.com",
    intro:
      "Tôi xây dựng những ứng dụng mobile hữu ích, có thiết kế tinh gọn và trải nghiệm mượt mà — từ ý tưởng đầu tiên đến sản phẩm hoàn thiện.",
    about:
      "Từ một ý tưởng ban đầu đến sản phẩm hoàn thiện, tôi quan tâm đến cả logic bên trong lẫn cảm giác người dùng nhận được ở từng thao tác. Mục tiêu của tôi là tạo ra những sản phẩm dễ dùng, đáng tin cậy và có thể phát triển bền vững.",
    socials: [
      { label: "GitHub", shortLabel: "GH", url: "https://github.com/your-username" },
      { label: "LinkedIn", shortLabel: "IN", url: "https://linkedin.com/in/your-username" },
    ],
  },

  apps: [
    {
      name: "Mobile App 01",
      description:
        "Mô tả ngắn về vấn đề ứng dụng giải quyết và giá trị nổi bật mà sản phẩm mang đến cho người dùng.",
      status: "Đang phát triển",
      statusColor: "#f59e42",
      tags: ["Flutter", "iOS & Android", "Coming soon"],
      icon: "spark",
      accent: "#655cf6",
      background: "#eceaff",
      screenBackground: "#f7f6ff",
      // Thay giá trị `src` rỗng bằng đường dẫn ảnh thật, ví dụ:
      // src: "assets/screenshots/app-01/home.png"
      screenshots: [
        { src: "", alt: "Màn hình giới thiệu ứng dụng" },
        { src: "", alt: "Màn hình trang chủ" },
        { src: "", alt: "Màn hình tính năng chính" },
        { src: "", alt: "Màn hình chi tiết" },
        { src: "", alt: "Màn hình cài đặt" },
      ],
    },
    {
      name: "Mobile App 02",
      description:
        "Một sản phẩm mobile được xây dựng với trải nghiệm đơn giản, tốc độ nhanh và sự chỉn chu trong từng chi tiết.",
      status: "Đang phát triển",
      statusColor: "#34b987",
      tags: ["Mobile", "Productivity", "Beta"],
      icon: "layers",
      accent: "#18a5bd",
      background: "#e4f5f7",
      screenBackground: "#f1fbfc",
    },
    {
      name: "Mobile App 03",
      description:
        "Ý tưởng tiếp theo trong hệ sinh thái sản phẩm — tập trung vào việc biến một tác vụ phức tạp trở nên nhẹ nhàng và trực quan.",
      status: "Sắp ra mắt",
      statusColor: "#f05f76",
      tags: ["Mobile App", "UI / UX", "In progress"],
      icon: "orbit",
      accent: "#ed6281",
      background: "#fbe9ed",
      screenBackground: "#fff7f8",
    },
  ],
};
