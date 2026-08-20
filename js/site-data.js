/*
 * Chỉnh sửa nội dung website tại đây.
 * Để thêm app mới: copy một object trong mảng `apps`, đổi nội dung và màu sắc.
 */
window.portfolioData = {
  profile: {
    name: "Tu Nguyen",
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
      name: "Học tốt THPT",
      description:
        "Mô tả ngắn về vấn đề ứng dụng giải quyết và giá trị nổi bật mà sản phẩm mang đến cho người dùng.",
      status: "Đang trên Store",
      statusColor: "#f59e42",
      tags: ["Flutter", "iOS & Android", "Coming soon"],
      icon: "spark",
      accent: "#655cf6",
      background: "#eceaff",
      screenBackground: "#f7f6ff",
      storeUrl: "https://play.google.com/store/apps/details?id=com.eduino.study.hha",
      screenshots: [
        { src: "assets/a1.png", alt: "Màn hình Học tốt THPT 1" },
        { src: "assets/a2.png", alt: "Màn hình Học tốt THPT 2" },
        { src: "assets/a3.png", alt: "Màn hình Học tốt THPT 3" },
        { src: "assets/a4.png", alt: "Màn hình Học tốt THPT 4" },
      ],
    },
    {
      name: "Sức khỏe",
      description:
        "Một sản phẩm mobile được xây dựng với trải nghiệm đơn giản, tốc độ nhanh và sự chỉn chu trong từng chi tiết.",
      status: "Đang trên Store",
      statusColor: "#34b987",
      tags: ["Mobile", "Productivity", "Beta"],
      icon: "layers",
      accent: "#18a5bd",
      background: "#e4f5f7",
      screenBackground: "#f1fbfc",
      storeUrl: "https://play.google.com/store/apps/details?id=com.eduino.health.firstaid",
      screenshots: [
        { src: "assets/h1.jpg", alt: "Màn hình Sức khỏe 1" },
        { src: "assets/h2.jpg", alt: "Màn hình Sức khỏe 2" },
        { src: "assets/h3.jpg", alt: "Màn hình Sức khỏe 3" },
        { src: "assets/h4.jpg", alt: "Màn hình Sức khỏe 4" },
      ],
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
